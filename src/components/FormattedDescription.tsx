import { formatProductDescription, type FormattedProductData } from "@/lib/formatProductDescription";
import { Package, Sparkles, Info } from "lucide-react";

interface FormattedDescriptionProps {
  description: string;
  title?: string;
  showFeatures?: boolean;
  showSpecs?: boolean;
  showIncluded?: boolean;
}

export function FormattedDescription({ 
  description, 
  title = '',
  showFeatures = true,
  showSpecs = true,
  showIncluded = true,
}: FormattedDescriptionProps) {
  const formatted = formatProductDescription(description, title);
  
  const hasSpecs = formatted.specifications.length > 0;
  const hasFeatures = formatted.features.length > 0;
  const hasIncluded = formatted.includedItems.length > 0;

  return (
    <div className="space-y-6">
      {/* Clean Description */}
      <p className="text-muted-foreground text-lg leading-relaxed">
        {formatted.cleanDescription}
      </p>
      
      {/* Specifications */}
      {showSpecs && hasSpecs && (
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-foreground">Specifications</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {formatted.specifications.map((spec, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {spec.key}
                </span>
                <span className="text-sm text-foreground font-medium">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Features */}
      {showFeatures && hasFeatures && (
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-foreground">Key Features</h3>
          </div>
          <ul className="space-y-2">
            {formatted.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Included Items */}
      {showIncluded && hasIncluded && (
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-foreground">What's Included</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {formatted.includedItems.map((item, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormattedDescription;
