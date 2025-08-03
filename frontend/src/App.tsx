// src/App.tsx
import { useEffect, useState } from 'react';
import type { Commit } from './types/types';

function App() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchCommits = async () => {
      const res = await fetch(`http://localhost:4000/commits`);
      const data = await res.json();
      setCommits(data);
    };
    fetchCommits();
  }, []);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const filteredCommits = commits.filter(commit =>
    isSameDay(new Date(commit.commit.author.date), selectedDate)
  );

  const addDays = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const formattedDate = selectedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-extrabold mb-10">UnionLabs Observer</h1>

      <div className="w-full flex justify-center items-center mb-6">
        <div className="flex items-center justify-between w-[720px] border border-white px-6 py-3 rounded">
          <button onClick={() => addDays(-1)} className="text-2xl">◀</button>
          <span className="text-lg font-semibold">{formattedDate}</span>
          <button onClick={() => addDays(1)} className="text-2xl">▶</button>
        </div>
      </div>

      <div className="w-full max-w-5xl border border-white rounded overflow-hidden">
        <table className="w-full text-sm text-left border-separate border-spacing-0">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-t border-b border-white">Message</th>
              <th className="py-3 px-4 border-t border-b border-white">Author</th>
              <th className="py-3 px-4 border-t border-b border-white">Date</th>
              <th className="py-3 px-4 border-t border-b border-white">Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommits.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center italic text-gray-500 border-t border-white">
                  No commits found for this date.
                </td>
              </tr>
            ) : (
              filteredCommits.map(commit => (
                <tr key={commit.sha} className="border-t border-white">
                  <td className="py-2 px-4 border-b border-white">{commit.commit.message}</td>
                  <td className="py-2 px-4 border-b border-white">{commit.commit.author.name}</td>
                  <td className="py-2 px-4 border-b border-white">{new Date(commit.commit.author.date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b border-white">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {commit.sha.slice(0, 7)}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;