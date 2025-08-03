import type { Commit } from '../types/types';

interface CommitListProps {
  commits: Commit[];
}

export default function CommitList({ commits }: CommitListProps) {
  return (
    <ul className="space-y-4">
      {commits.map((commit) => (
        <li key={commit.sha} className="border-b pb-2">
          <p className="text-lg font-semibold">{commit.commit.message}</p>
          <p className="text-sm text-gray-600">
            {commit.commit.author.name} —{' '}
            {new Date(commit.commit.author.date).toLocaleString()}
          </p>
          <a
            href={commit.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm"
          >
            View on GitHub ({commit.sha.slice(0, 7)})
          </a>
        </li>
      ))}
    </ul>
  );
}
