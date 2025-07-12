import React, { useState } from 'react';
import { X, Bold, Italic, Link, Image, List, Hash, Send } from 'lucide-react';
import type { User } from '../App';
import { addUserPostedQuestion } from '../services/dummyData';
import { GalleryModal } from './GalleryModal';
import { AnimatePresence, motion } from 'framer-motion';

interface CreatePostProps {
  onClose: () => void;
  currentUser: User;
}

const availableTags = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C#', 'PHP',
  'SQL', 'MongoDB', 'AWS', 'Docker', 'HTML', 'CSS', 'Vue.js', 'Angular'
];

export function CreatePost({ onClose, currentUser }: CreatePostProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [showStep1Error, setShowStep1Error] = useState(false);

  React.useEffect(() => {
    console.log('CreatePost modal mounted');
  }, []);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new question object
    const newQuestion = {
      id: `user-${Date.now()}`,
      title,
      description,
      author: currentUser,
      tags: selectedTags.length > 0 ? selectedTags : ['General'],
      upvotes: 0,
      downvotes: 0,
      answers: [],
      createdAt: 'Just now',
      userVote: undefined
    };
    addUserPostedQuestion(newQuestion);
    onClose();
  };

  const formatText = (format: string) => {
    const textarea = document.querySelector('#description') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newDescription = description.substring(0, start) + formattedText + description.substring(end);
    setDescription(newDescription);
  };

  // Insert image markdown at cursor position
  const insertImageAtCursor = (url: string) => {
    const textarea = document.querySelector('#description') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = description.substring(0, start);
    const after = description.substring(end);
    const markdown = `![image](${url})`;
    setDescription(before + markdown + after);
    // Move cursor after inserted markdown
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = before.length + markdown.length;
    }, 0);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          insertImageAtCursor(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 backdrop-blur-2xl rounded-3xl border border-blue-400/20 shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in relative p-0"
      >
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-800/60">
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="p-8">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Title & Tags</h2>
                <input
                  className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white border border-blue-400/20 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter a clear, descriptive title..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                {/* Tag selection UI here */}
                <div className="mb-4">
                  <div className="font-semibold text-gray-300 mb-2">Tags (max 5)</div>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        className={`px-3 py-1 rounded-full border text-xs font-medium transition-all duration-200 ${selectedTags.includes(tag) ? 'bg-blue-500/30 border-blue-400 text-blue-300' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-blue-500/10 hover:text-blue-300'}`}
                        onClick={() => handleTagToggle(tag)}
                        disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={() => {
                      if (!title.trim() || selectedTags.length === 0) {
                        setShowStep1Error(true);
                      } else {
                        setShowStep1Error(false);
                        setStep(2);
                      }
                    }}
                    disabled={!title.trim() || selectedTags.length === 0}
                  >
                    Next
                  </button>
                </div>
                {showStep1Error && (
                  <div className="text-red-400 text-sm mt-2">Please enter a title and select at least 1 tag to continue.</div>
                )}
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Detailed Description</h2>
                <div className="mb-4">
                  <textarea
                    id="description"
                    className="w-full min-h-[120px] p-3 rounded-lg bg-gray-800 text-white border border-blue-400/20 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="Describe your question in detail... (Markdown supported)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                {/* Gallery and drag-and-drop image upload */}
                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span>Gallery</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        insertImageAtCursor(ev.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <span className="text-gray-400 text-xs">or drag & drop image below</span>
                </div>
                <div
                  className="w-full min-h-[60px] bg-gray-800/60 border-2 border-dashed border-blue-400/30 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-4 transition-all duration-300 hover:border-blue-400"
                  onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      insertImageAtCursor(ev.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                >
                  Drag & drop an image here
                </div>
                {/* Live Markdown Preview */}
                <div className="bg-gray-900/70 border border-blue-400/10 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-blue-300 mb-2">Live Preview</div>
                  <div className="prose prose-invert max-w-none text-white animate-fade-in">
                    {/* Use a markdown renderer if available, else just show description */}
                    {description || <span className="text-gray-500">Nothing to preview yet.</span>}
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-600 transition-all duration-300"
                    onClick={() => { console.log('Back clicked, step:', step); setStep(1); }}
                  >
                    Back
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={() => { console.log('Next clicked, step:', step); setStep(3); }}
                    disabled={!description.trim()}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Review & Submit</h2>
                <div className="mb-4">
                  <div className="font-semibold text-gray-300 mb-2">Title</div>
                  <div className="bg-gray-800 rounded-lg p-3 text-white mb-2">{title}</div>
                  <div className="font-semibold text-gray-300 mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs font-medium border border-blue-400/20">{tag}</span>
                    ))}
                  </div>
                  <div className="font-semibold text-gray-300 mb-2">Description</div>
                  <div className="bg-gray-800 rounded-lg p-3 text-white prose prose-invert max-w-none animate-fade-in">{description}</div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-600 transition-all duration-300"
                    onClick={() => { console.log('Back clicked, step:', step); setStep(2); }}
                  >
                    Back
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={handleSubmit}
                    disabled={!title.trim() || !description.trim()}
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-blue-400/40 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          title="Close"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
}