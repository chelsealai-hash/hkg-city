import { useEffect, useRef } from 'react';

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
  style?: React.CSSProperties;
}

// Ad size configurations
const adSizes = {
  top: {
    width: '100%',
    minHeight: '90px',
    maxWidth: '728px',
  },
  middle: {
    width: '100%',
    minHeight: '250px',
    maxWidth: '970px',
  },
  bottom: {
    width: '100%',
    minHeight: '90px',
    maxWidth: '728px',
  },
  sidebar: {
    width: '100%',
    minHeight: '600px',
    maxWidth: '300px',
  },
};

export function AdBanner({ position, className = '', style = {} }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const sizes = adSizes[position];

  useEffect(() => {
    // In a real implementation, this would initialize Google AdSense
    // For now, we'll just show a placeholder
    
    // Example AdSense initialization (commented out):
    // if (window.adsbygoogle && adRef.current) {
    //   try {
    //     (window.adsbygoogle = window.adsbygoogle || []).push({});
    //   } catch (e) {
    //     console.error('AdSense error:', e);
    //   }
    // }
  }, [position]);

  return (
    <div 
      className={`flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden ${className}`}
      style={{
        ...sizes,
        ...style,
      }}
    >
      {/* Ad Container */}
      <div 
        ref={adRef}
        className="w-full h-full flex items-center justify-center"
      >
        {/* Placeholder for AdSense */}
        <div className="text-center p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Advertisement
          </div>
          <div className="text-sm text-gray-500">
            Google AdSense - {position}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {sizes.maxWidth} x {sizes.minHeight}
          </div>
        </div>
        
        {/* Actual AdSense code would go here */}
        {/* <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        /> */}
      </div>
    </div>
  );
}

// Admin-managed banner component
interface ManagedBannerProps {
  bannerCode: string;
  className?: string;
}

export function ManagedBanner({ bannerCode, className = '' }: ManagedBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && bannerCode) {
      // Inject the banner code (for Google AdSense or other ad networks)
      bannerRef.current.innerHTML = bannerCode;
      
      // Execute any scripts in the banner code
      const scripts = bannerRef.current.querySelectorAll('script');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        script.parentNode?.replaceChild(newScript, script);
      });
    }
  }, [bannerCode]);

  return (
    <div 
      ref={bannerRef}
      className={`overflow-hidden ${className}`}
    />
  );
}
