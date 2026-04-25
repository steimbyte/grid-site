declare namespace Lucide {
  interface LucideIcon {
    createIcons(): void;
  }
}

declare const lucide: Lucide.LucideIcon;

interface Window {
  lucide?: Lucide.LucideIcon;
}
