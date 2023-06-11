interface IPagination {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
interface IFilters {
  searchTerm: string;
}

export { IPagination, IFilters };
