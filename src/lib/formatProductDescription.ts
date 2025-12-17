/**
 * Optimized Smart Product Description Formatter
 * Parses Shopify product descriptions into clean, structured data
 */

export interface FormattedProductData {
  cleanDescription: string;
  specifications: { key: string; value: string }[];
  features: string[];
  includedItems: string[];
  dimensions: { label: string; value: string }[] | null;
}

// Specification keys mapping
const SPEC_KEY_MAP: Record<string, string> = {
  'material': 'Material',
  'materials': 'Material',
  'metal material': 'Material',
  'frame material': 'Frame',
  'color': 'Color',
  'colour': 'Color',
  'size': 'Size',
  'weight': 'Weight',
  'net weight': 'Weight',
  'dimensions': 'Dimensions',
  'dimension': 'Dimensions',
  'product size': 'Dimensions',
  'mirror size': 'Mirror Size',
  'lens size': 'Lens Size',
  'power': 'Power',
  'wattage': 'Power',
  'voltage': 'Voltage',
  'battery': 'Battery',
  'type': 'Type',
  'style': 'Style',
  'shape': 'Shape',
  'finish': 'Finish',
  'magnification': 'Magnification',
  'light source': 'Light Source',
  'bulb type': 'Bulb Type',
  'switch type': 'Switch',
  'suitable locations': 'Suitable For',
  'application': 'Use',
  'occasion': 'Occasion',
};

// Words to filter out
const NOISE_WORDS = /\b(extra large|upgraded|plugin|new arrival|hot sale|best seller|2024|2025|high quality|premium quality|free shipping)\b/gi;

/**
 * Strip all HTML tags and decode entities
 */
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|ul|ol|h[1-6])[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize unit strings
 */
function normalizeUnit(unit: string): string {
  const map: Record<string, string> = {
    'cm': 'cm', 'mm': 'mm', 'in': 'in', 'inch': 'in', 'inches': 'in', '"': 'in', 'm': 'm'
  };
  return map[unit.toLowerCase()] || unit;
}

/**
 * Clean and format a value string
 */
function cleanValue(value: string): string {
  return value
    .replace(NOISE_WORDS, '')
    .replace(/\s*[-–—]\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[,;:\s]+|[,;:\s]+$/g, '')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Parse dimension strings like "30 x 25 cm"
 */
function parseDimensions(text: string): { label: string; value: string }[] {
  const dims: { label: string; value: string }[] = [];
  const seen = new Set<string>();
  
  // Match patterns like "9 lights – 30 x 25 cm" or just "30x40cm"
  const sizePattern = /(\d+\s*lights?\s*[-–—]\s*)?(\d+(?:\.\d+)?)\s*[x×X]\s*(\d+(?:\.\d+)?)\s*(cm|mm|in|inch|inches|")?/gi;
  let match;
  
  while ((match = sizePattern.exec(text)) !== null) {
    const prefix = match[1] ? match[1].replace(/[-–—]\s*$/, '').trim() : null;
    const w = match[2];
    const h = match[3];
    const unit = normalizeUnit(match[4] || 'cm');
    
    const label = prefix || 'Size';
    const value = `${w} × ${h} ${unit}`;
    
    if (!seen.has(label.toLowerCase())) {
      dims.push({ label: cleanValue(label), value });
      seen.add(label.toLowerCase());
    }
  }
  
  return dims;
}

/**
 * Extract specifications using key:value pattern recognition
 */
function extractSpecifications(text: string): { key: string; value: string }[] {
  const specs: { key: string; value: string }[] = [];
  const seen = new Set<string>();
  
  // Split on common spec separators - look for "Key: Value" or "Key – Value" patterns
  // Handle concatenated specs like "Material: Metal Color: White"
  const specPattern = /\b(material|color|colour|style|shape|type|finish|weight|power|voltage|battery|magnification|frame material|metal material|suitable locations|light source|bulb type|switch type)\s*[:\-–—]\s*([^:]+?)(?=\s*(?:material|color|colour|style|shape|type|finish|weight|power|voltage|battery|magnification|frame|metal|suitable|light|bulb|switch|packing|package|$))/gi;
  
  let match;
  while ((match = specPattern.exec(text)) !== null) {
    const rawKey = match[1].toLowerCase().trim();
    const rawValue = match[2].trim();
    
    const normalizedKey = SPEC_KEY_MAP[rawKey];
    if (normalizedKey && !seen.has(normalizedKey)) {
      // Clean the value - remove trailing dimension data or packing info
      let cleanedValue = rawValue
        .replace(/\d+\s*lights?\s*[-–—]\s*\d+\s*[x×X]\s*\d+\s*(?:cm|mm|in)?/gi, '')
        .replace(/packing\s*list.*/i, '')
        .replace(/package\s*includes?.*/i, '')
        .trim();
      
      cleanedValue = cleanValue(cleanedValue);
      
      if (cleanedValue && cleanedValue.length > 0 && cleanedValue.length < 80) {
        specs.push({ key: normalizedKey, value: cleanedValue });
        seen.add(normalizedKey);
      }
    }
  }
  
  return specs;
}

/**
 * Extract packing list / included items
 */
function extractIncludedItems(text: string): string[] {
  const items: string[] = [];
  const seen = new Set<string>();
  
  // Look for packing list section
  const packingMatch = text.match(/(?:packing\s*list|package\s*includes?|what'?s?\s*included|in\s*the\s*box)\s*[:\-–—]\s*([^<]+?)(?=\s*(?:product\s*image|note|warning|attention|$))/i);
  
  if (packingMatch) {
    const listText = packingMatch[1];
    
    // Split by common separators and quantity patterns
    const parts = listText.split(/[,;•*]+|\s+\d+\s*[xX×]\s*|\s*\*\s*\d+\s*/);
    
    for (const part of parts) {
      let item = part
        .replace(/^\d+\s*/, '')  // Remove leading numbers
        .replace(/\s*[xX×]\s*\d+\s*$/, '')  // Remove trailing quantity
        .replace(/\s+/g, ' ')
        .trim();
      
      // Skip empty or too short items, and image references
      if (item && item.length > 2 && item.length < 50 && !/image/i.test(item)) {
        item = cleanValue(item);
        const normalized = item.toLowerCase();
        
        if (!seen.has(normalized) && item.length > 2) {
          items.push(item);
          seen.add(normalized);
        }
      }
    }
  }
  
  return items.slice(0, 6);
}

/**
 * Extract feature bullet points
 */
function extractFeatures(text: string): string[] {
  const features: string[] = [];
  const seen = new Set<string>();
  
  // Look for bullet-style content
  const bulletPattern = /[•★✓✔►▸]\s*([^•★✓✔►▸\n]+)/g;
  let match;
  
  while ((match = bulletPattern.exec(text)) !== null) {
    const feature = match[1].trim().replace(/\s+/g, ' ');
    
    if (feature.length > 15 && feature.length < 150) {
      // Skip spec-like content
      if (!/^(material|color|size|weight|dimension)[:\-]/i.test(feature)) {
        const normalized = feature.toLowerCase();
        if (!seen.has(normalized)) {
          features.push(feature);
          seen.add(normalized);
        }
      }
    }
  }
  
  return features.slice(0, 6);
}

/**
 * Generate clean marketing description
 */
function generateCleanDescription(text: string, title: string): string {
  // Remove all spec-like content
  let cleaned = text
    // Remove spec patterns
    .replace(/\b(product\s*information|specifications?|dimensions?)[:\s]*[^.!?]*/gi, '')
    .replace(/\b(material|color|colour|style|type|weight|power|voltage|frame|metal|suitable)[:\-–—]\s*[^.!?]*/gi, '')
    .replace(/\d+\s*lights?\s*[-–—]\s*\d+\s*[x×X]\s*\d+\s*(?:cm|mm|in)?;?\s*/gi, '')
    .replace(/packing\s*list[:\-–—]?.*/i, '')
    .replace(/package\s*includes?[:\-–—]?.*/i, '')
    .replace(/product\s*image[:\-–—]?.*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Find clean sentences
  const sentences = cleaned.split(/[.!?]+/).filter(s => {
    const t = s.trim();
    return t.length > 25 &&
           !/^(note|warning|attention|please|product)/i.test(t) &&
           !/^\d+/.test(t) &&
           !/:/.test(t);
  });
  
  if (sentences.length > 0) {
    let desc = sentences[0].trim();
    if (!desc.endsWith('.')) desc += '.';
    
    // Limit length
    if (desc.length > 200) {
      const truncated = desc.slice(0, 200);
      const lastSpace = truncated.lastIndexOf(' ');
      desc = truncated.slice(0, lastSpace > 0 ? lastSpace : 200) + '...';
    }
    
    return desc;
  }
  
  // Generate fallback
  const productType = title.toLowerCase().includes('mirror') ? 'LED mirror' : 'product';
  return `Elevate your daily ritual with the ${title}. Premium craftsmanship meets modern design in this exceptional ${productType}.`;
}

/**
 * Main formatting function
 */
export function formatProductDescription(rawDescription: string, title: string = ''): FormattedProductData {
  const plainText = stripHtml(rawDescription);
  
  const dimensions = parseDimensions(plainText);
  const specifications = extractSpecifications(plainText);
  
  // Add dimensions as a spec if found and not already present
  if (dimensions.length > 0 && !specifications.some(s => s.key === 'Dimensions' || s.key === 'Size')) {
    const dimStr = dimensions.map(d => `${d.label}: ${d.value}`).join(' | ');
    specifications.unshift({ key: 'Available Sizes', value: dimStr });
  }
  
  return {
    cleanDescription: generateCleanDescription(plainText, title),
    specifications,
    features: extractFeatures(plainText),
    includedItems: extractIncludedItems(plainText),
    dimensions: dimensions.length > 0 ? dimensions : null,
  };
}

/**
 * Get short description for product cards
 */
export function getShortDescription(rawDescription: string, title: string = '', maxLength: number = 100): string {
  const formatted = formatProductDescription(rawDescription, title);
  let desc = formatted.cleanDescription.replace(/[\[\]{}]/g, '').trim();
  
  if (desc.length <= maxLength) return desc;
  
  const truncated = desc.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
}
