import React from 'react';
import { Car, Scale, AlertTriangle, FileText } from 'lucide-react';

interface QuickQuestionsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const quickQuestions = [
  { icon: Car, text: '分析这段购车合同条款是否合规', color: '#ff6b6b' },
  { icon: Scale, text: '定金不可退是否合法？', color: '#feca57' },
  { icon: AlertTriangle, text: '商家拒绝交车怎么办？', color: '#48dbfb' },
  { icon: FileText, text: '预售合同有哪些常见陷阱？', color: '#1dd1a1' },
];

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onSelect, disabled = false }) => {
  return (
    <div className="space-y-2">
      {quickQuestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question.text)}
          disabled={disabled}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div
            className="w-8 h-8 flex items-center justify-center border-2 border-black flex-shrink-0"
            style={{ background: question.color }}
          >
            <question.icon size={14} />
          </div>
          <span className="font-sans text-sm text-left">{question.text}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickQuestions;
