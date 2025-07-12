import React, { useState } from 'react';
import { Check, ArrowRight, Code, Database, Cloud, Smartphone } from 'lucide-react';

interface CategorySelectionProps {
  onCategoriesSelected: (categories: string[]) => void;
  selectedCategories: string[];
}

const availableCategories = [
  { 
    id: 'react', 
    name: 'React', 
    icon: Code,
    color: 'from-blue-500 to-cyan-500', 
    description: 'Modern JavaScript library for building user interfaces' 
  },
  { 
    id: 'javascript', 
    name: 'JavaScript', 
    icon: Code,
    color: 'from-yellow-500 to-orange-500', 
    description: 'Programming language of the web' 
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    icon: Code,
    color: 'from-blue-600 to-blue-700', 
    description: 'Typed superset of JavaScript' 
  },
  { 
    id: 'nodejs', 
    name: 'Node.js', 
    icon: Database,
    color: 'from-green-500 to-green-600', 
    description: 'JavaScript runtime built on Chrome\'s V8 engine' 
  },
  { 
    id: 'python', 
    name: 'Python', 
    icon: Code,
    color: 'from-blue-500 to-yellow-500', 
    description: 'High-level programming language' 
  },
  { 
    id: 'java', 
    name: 'Java', 
    icon: Code,
    color: 'from-red-500 to-orange-600', 
    description: 'Object-oriented programming language' 
  },
  { 
    id: 'csharp', 
    name: 'C#', 
    icon: Code,
    color: 'from-purple-500 to-purple-600', 
    description: 'Modern, object-oriented programming language' 
  },
  { 
    id: 'php', 
    name: 'PHP', 
    icon: Code,
    color: 'from-indigo-500 to-purple-600', 
    description: 'Server-side scripting language' 
  },
  { 
    id: 'sql', 
    name: 'SQL', 
    icon: Database,
    color: 'from-blue-600 to-indigo-600', 
    description: 'Language for managing relational databases' 
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    icon: Database,
    color: 'from-green-600 to-green-700', 
    description: 'NoSQL document database' 
  },
  { 
    id: 'aws', 
    name: 'AWS', 
    icon: Cloud,
    color: 'from-orange-500 to-yellow-500', 
    description: 'Amazon Web Services cloud platform' 
  },
  { 
    id: 'mobile', 
    name: 'Mobile Dev', 
    icon: Smartphone,
    color: 'from-pink-500 to-rose-500', 
    description: 'iOS and Android app development' 
  }
];

export function CategorySelection({ onCategoriesSelected, selectedCategories }: CategorySelectionProps) {
  const [selected, setSelected] = useState<string[]>(selectedCategories);

  const toggleCategory = (categoryId: string) => {
    if (selected.includes(categoryId)) {
      setSelected(selected.filter(id => id !== categoryId));
    } else if (selected.length < 3) {
      setSelected([...selected, categoryId]);
    }
  };

  const handleContinue = () => {
    onCategoriesSelected(selected);
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Choose Your Tech Stack
        </h1>
        <p className="text-xl text-gray-300 mb-2">
          Select up to 3 technologies to personalize your feed
        </p>
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
          <span className="text-blue-400 font-medium">
            Selected: {selected.length}/3
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {availableCategories.map(category => {
          const isSelected = selected.includes(category.id);
          const isDisabled = !isSelected && selected.length >= 3;
          const IconComponent = category.icon;

          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              disabled={isDisabled}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 transform scale-105 shadow-lg shadow-blue-500/20'
                  : isDisabled
                  ? 'border-gray-700 bg-gray-800/30 opacity-50 cursor-not-allowed'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70 hover:transform hover:scale-105'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {category.description}
              </p>

              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
            selected.length > 0
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Feed</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}