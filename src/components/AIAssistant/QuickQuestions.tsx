import React from 'react';
import { Car, Scale, AlertTriangle, FileText } from 'lucide-react';

interface QuickQuestionsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const quickQuestions = [
  { icon: Car, text: '分析这段购车合同条款是否合规' },
  { icon: Scale, text: '定金不可退是否合法？' },
  { icon: AlertTriangle, text: '商家拒绝交车怎么办？' },
  { icon: FileText, text: '预售合同有哪些常见陷阱？' },
];

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onSelect, disabled = false }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {quickQuestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question.text)}
          disabled={disabled}
          className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl text-sm text-gray-600 hover:text-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <question.icon size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
          <span className="text-left">{question.text}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickQuestions;
