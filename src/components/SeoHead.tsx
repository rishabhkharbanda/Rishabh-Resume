import { useEffect } from 'react';
import { ViewTab } from '../types';
import { applyPageSeo } from '../config/seo';

interface SeoHeadProps {
  activeTab: ViewTab;
}

export default function SeoHead({ activeTab }: SeoHeadProps) {
  useEffect(() => {
    applyPageSeo(activeTab);
  }, [activeTab]);

  return null;
}
