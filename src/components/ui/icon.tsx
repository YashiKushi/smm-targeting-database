import { LucideIcon, icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  fallback?: keyof typeof icons;
  size?: number;
  className?: string;
}

const Icon = ({
  name,
  fallback = "CircleAlert",
  size = 24,
  className,
}: IconProps) => {
  const IconComponent = icons[name] as LucideIcon;
  const FallbackComponent = icons[fallback] as LucideIcon;

  const Component = IconComponent || FallbackComponent;

  return <Component size={size} className={className} />;
};

export default Icon;
