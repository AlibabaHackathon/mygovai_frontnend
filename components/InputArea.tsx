import React from 'react';
import { Button } from './ui/button';
import { Mic, Send } from 'lucide-react';

interface InputAreaProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => void;
  setInputValue: (value: string) => void;
  inputValue: string;
}

const InputArea: React.FC<InputAreaProps> = ({ handleSubmit, setInputValue, inputValue }) => {
  return (
    <div className="border-t border-gray-200 sticky bottom-0 p-4">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="rounded-lg border border-gray-300 bg-white overflow-hidden shadow-sm">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything..."
              className="w-full p-3 outline-none resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex justify-between items-center px-3 py-2 bg-gray-50">
              <p className="text-xs text-gray-500">
                Press Enter to send, Shift+Enter for new line
              </p>
              <div className="flex space-x-2">
                <Button type="button" size="icon" variant="ghost">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button type="submit" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputArea;
