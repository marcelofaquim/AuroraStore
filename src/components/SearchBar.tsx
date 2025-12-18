import { useState } from "react";

type Props = {
  onSearch?: (term: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder = "Buscar produtos..." }: Props) {
  const [term, setTerm] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
        <span>🔍</span>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch?.(term)}
          className="flex-1 outline-none"
          placeholder={placeholder}
        />
        <button
          onClick={() => onSearch?.(term)}
          className="bg-aurora.purple text-white px-4 py-2 rounded-md hover:bg-aurora.blue transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
