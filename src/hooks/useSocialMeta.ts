import { useEffect } from 'react';

export interface SocialMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const updateMetaTag = (attribute: 'name' | 'property', key: string, content: string): void => {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export const useSocialMeta = (meta: SocialMetaProps): void => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const baseTitle = 'MM ELECTROLAB - Precision Electronics & Display Lab';
    const finalTitle = meta.title ? `${meta.title} | MM ELECTROLAB` : baseTitle;
    document.title = finalTitle;

    const finalDesc = meta.description || 'Enterprise-grade e-commerce and precision electronics servicing platform for MM ELECTROLAB, Sundarganj, Gaibandha. LED TV Display bonding, genuine components, and expert appliance repair.';
    const finalImage = meta.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=630&q=80';
    const currentUrl = meta.url || (typeof window !== 'undefined' ? window.location.href : '');

    // Title
    updateMetaTag('property', 'og:title', finalTitle);
    updateMetaTag('name', 'twitter:title', finalTitle);

    // Description
    updateMetaTag('name', 'description', finalDesc);
    updateMetaTag('property', 'og:description', finalDesc);
    updateMetaTag('name', 'twitter:description', finalDesc);

    // Image
    updateMetaTag('property', 'og:image', finalImage);
    updateMetaTag('property', 'og:image:secure_url', finalImage);
    updateMetaTag('name', 'twitter:image', finalImage);

    // URL
    if (currentUrl) {
      updateMetaTag('property', 'og:url', currentUrl);
    }
  }, [meta.title, meta.description, meta.image, meta.url]);
};
