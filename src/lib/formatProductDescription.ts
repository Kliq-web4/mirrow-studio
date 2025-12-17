/**
 * Smart Product Description Formatter
 * Automatically parses messy Shopify/dropshipping descriptions into clean, structured data
 */

export interface FormattedProductData {
  cleanDescription: string;
  specifications: { key: string; value: string }[];
  features: string[];
  includedItems: string[];
}

// Common specification patterns to extract
const SPEC_PATTERNS = [
  /material[:\s]+([^<\n]+)/i,
  /metal\s*material[:\s]+([^<\n]+)/i,
  /frame\s*material[:\s]+([^<\n]+)/i,
  /color[:\s]+([^<\n]+)/i,
  /size[:\s]+([^<\n]+)/i,
  /weight[:\s]+([^<\n]+)/i,
  /dimension[s]?[:\s]+([^<\n]+)/i,
  /power[:\s]+([^<\n]+)/i,
  /voltage[:\s]+([^<\n]+)/i,
  /battery[:\s]+([^<\n]+)/i,
  /type[:\s]+([^<\n]+)/i,
  /style[:\s]+([^<\n]+)/i,
];

// Words to clean from spec values
const NOISE_WORDS = [
  'extra large',
  'upgraded',
  'plugin',
  'new arrival',
  'hot sale',
  'best seller',
  '2024',
  '2025',
];

// Packing list patterns
const PACKING_PATTERNS = [
  /packing\s*list[:\s]+([^<\n]+)/i,
  /package\s*includes?[:\s]+([^<\n]+)/i,
  /what's\s*included[:\s]+([^<\n]+)/i,
  /in\s*the\s*box[:\s]+([^<\n]+)/i,
];

/**
 * Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Clean specification value by removing noise words
 */
function cleanSpecValue(value: string): string {
  let cleaned = value.trim();
  
  // Remove noise words
  NOISE_WORDS.forEach(word => {
    cleaned = cleaned.replace(new RegExp(word, 'gi'), '').trim();
  });
  
  // Clean up multiple spaces and dashes
  cleaned = cleaned
    .replace(/\s*-\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  
  return cleaned;
}

/**
 * Format specification key to be more readable
 */
function formatSpecKey(key: string): string {
  const keyMap: Record<string, string> = {
    'material': 'Material',
    'metal material': 'Material',
    'frame material': 'Frame',
    'color': 'Color',
    'size': 'Size',
    'weight': 'Weight',
    'dimension': 'Dimensions',
    'dimensions': 'Dimensions',
    'power': 'Power',
    'voltage': 'Voltage',
    'battery': 'Battery',
    'type': 'Type',
    'style': 'Style',
  };
  
  const lowerKey = key.toLowerCase().trim();
  return keyMap[lowerKey] || key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Extract specifications from description text
 */
function extractSpecifications(text: string): { key: string; value: string }[] {
  const specs: { key: string; value: string }[] = [];
  const seenKeys = new Set<string>();
  
  // Pattern: Key: Value format
  const keyValuePattern = /([A-Za-z\s]+)[:\s]+([^<\n:]+?)(?=\s*[A-Z][a-z]+:|$|\n|<)/g;
  let match;
  
  while ((match = keyValuePattern.exec(text)) !== null) {
    const rawKey = match[1].trim().toLowerCase();
    const rawValue = match[2].trim();
    
    // Skip if it's a packing list or already seen
    if (rawKey.includes('packing') || rawKey.includes('package')) continue;
    if (seenKeys.has(rawKey)) continue;
    
    // Only include known specification keys
    const knownKeys = ['material', 'metal material', 'frame material', 'color', 'size', 'weight', 'dimension', 'dimensions', 'power', 'voltage', 'battery', 'type', 'style'];
    if (!knownKeys.some(k => rawKey.includes(k))) continue;
    
    const cleanedValue = cleanSpecValue(rawValue);
    if (cleanedValue && cleanedValue.length > 1 && cleanedValue.length < 100) {
      seenKeys.add(rawKey);
      specs.push({
        key: formatSpecKey(rawKey),
        value: cleanedValue
      });
    }
  }
  
  return specs;
}

/**
 * Extract included items from packing list
 */
function extractIncludedItems(text: string): string[] {
  const items: string[] = [];
  
  for (const pattern of PACKING_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const listText = match[1];
      // Parse items separated by common delimiters
      const rawItems = listText.split(/[,;*•]/);
      
      for (const item of rawItems) {
        const cleaned = item
          .replace(/\*?\d+/g, '') // Remove quantity numbers
          .replace(/x\d+/gi, '')  // Remove "x1" patterns
          .trim();
        
        if (cleaned && cleaned.length > 2 && cleaned.length < 50) {
          // Capitalize and format
          const formatted = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
          if (!items.includes(formatted)) {
            items.push(formatted);
          }
        }
      }
      break;
    }
  }
  
  return items;
}

/**
 * Extract feature bullet points
 */
function extractFeatures(text: string): string[] {
  const features: string[] = [];
  
  // Look for bullet-style patterns
  const bulletPatterns = [
    /[•★✓✔]\s*([^•★✓✔<\n]+)/g,
    /[-]\s+([A-Z][^-<\n]+)/g,
  ];
  
  for (const pattern of bulletPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const feature = match[1].trim();
      if (feature && feature.length > 10 && feature.length < 150 && !features.includes(feature)) {
        features.push(feature);
      }
    }
  }
  
  return features.slice(0, 6); // Max 6 features
}

/**
 * Generate a clean marketing description
 */
function generateCleanDescription(text: string, title: string): string {
  // Remove specs and packing list sections
  let cleaned = text
    .replace(/material[:\s]+[^<\n]+/gi, '')
    .replace(/color[:\s]+[^<\n]+/gi, '')
    .replace(/size[:\s]+[^<\n]+/gi, '')
    .replace(/packing\s*list[:\s]+[^<\n]+/gi, '')
    .replace(/package\s*includes?[:\s]+[^<\n]+/gi, '')
    .trim();
  
  // If the description is too short or just specs, generate a default
  if (cleaned.length < 20) {
    return `Elevate your daily ritual with the ${title}. Premium craftsmanship meets modern design in this essential piece for your space.`;
  }
  
  // Take first meaningful sentence
  const sentences = cleaned.split(/[.!?]+/).filter(s => s.trim().length > 20);
  if (sentences.length > 0) {
    const firstSentence = sentences[0].trim();
    // Ensure it ends with period
    return firstSentence + (firstSentence.endsWith('.') ? '' : '.');
  }
  
  return cleaned.slice(0, 200) + (cleaned.length > 200 ? '...' : '');
}

/**
 * Main formatting function - takes raw description and returns structured data
 */
export function formatProductDescription(rawDescription: string, title: string = ''): FormattedProductData {
  const plainText = stripHtml(rawDescription);
  
  return {
    cleanDescription: generateCleanDescription(plainText, title),
    specifications: extractSpecifications(plainText),
    features: extractFeatures(plainText),
    includedItems: extractIncludedItems(plainText),
  };
}

/**
 * Get a short, clean description for product cards
 */
export function getShortDescription(rawDescription: string, title: string = '', maxLength: number = 80): string {
  const formatted = formatProductDescription(rawDescription, title);
  const desc = formatted.cleanDescription;
  
  if (desc.length <= maxLength) return desc;
  
  // Truncate at word boundary
  const truncated = desc.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.slice(0, lastSpace) + '...';
}
