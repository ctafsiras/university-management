interface IPagination {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
interface IFilters {
  searchTerm?: string;
  code?: string;
  title?: string;
  year?: string;
}

export { IFilters, IPagination };
