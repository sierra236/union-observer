import React from 'react';

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  const addDays = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    setDate(newDate);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={() => addDays(-1)}
        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
      >
        ◀
      </button>
      <span className="text-lg font-medium">
        {date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
      </span>
      <button
        onClick={() => addDays(1)}
        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
      >
        ▶
      </button>
    </div>
  );
};

export default DatePicker;
