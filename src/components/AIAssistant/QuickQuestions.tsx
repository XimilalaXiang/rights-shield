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
    <div className="w-full max-w-xs">
      <p className="text-xs text-white/40 mb-3 text-center">快速提问</p>
      <div className="grid grid-cols-1 gap-2">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question.text)}
            disabled={disabled}
            className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-primary/30 rounded-xl text-sm text-white/60 hover:text-white/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <question.icon size={16} className="text-accent/60 group-hover:text-accent transition-colors" />
            <span className="text-left">{question.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;
