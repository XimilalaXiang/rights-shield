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
    <div className="space-y-2">
      {quickQuestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question.text)}
          disabled={disabled}
          className="w-full flex items-center gap-3 px-4 py-3 border border-[#1C1C1C]/10 hover:border-[#1C1C1C] text-sm text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          <question.icon size={14} className="text-[#1C1C1C]/30 group-hover:text-[#1C1C1C]/60 transition-colors flex-shrink-0" />
          <span className="text-left">{question.text}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickQuestions;
