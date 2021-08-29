import { SortDirection } from '@angular/material/sort';

export interface PageInfo {
  sort?: string
  order?: SortDirection;
  offset?: number;
  limit?: number;
}

export interface SearchReponsePayload<M> {
  totalCount: number;
  data: M;
}
