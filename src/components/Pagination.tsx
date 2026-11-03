import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  pageCourante: number;
  totalPages: number;
}

export default function Pagination({
  pageCourante,
  totalPages,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function changerPage(nouvellePage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(nouvellePage));
    setSearchParams(params);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="Pagination">
      <button
        onClick={() => changerPage(pageCourante - 1)}
        disabled={pageCourante === 1}
      >
        Précédent
      </button>

      <span>
        Page {pageCourante} / {totalPages}
      </span>

      <button
        onClick={() => changerPage(pageCourante + 1)}
        disabled={pageCourante === totalPages}
      >
        Suivant
      </button>
    </nav>
  );
}