import React from 'react';
import { X } from 'lucide-react';

interface GalleryModalProps {
  onClose: () => void;
  onSelectImage?: (url: string) => void;
}

const images = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=400',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=400',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=400',
  'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?w=400',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=400',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400',
];

export function GalleryModal({ onClose, onSelectImage }: GalleryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 rounded-2xl border border-[#FEFAD4]/30 w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors duration-300 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#FEFAD4] mb-6 text-center">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                className="rounded-lg overflow-hidden border border-[#FEFAD4]/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#FEFAD4]"
                style={{ padding: 0 }}
                onClick={() => onSelectImage ? onSelectImage(img) : undefined}
                tabIndex={0}
                type="button"
                title="Insert image"
              >
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-40 object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 