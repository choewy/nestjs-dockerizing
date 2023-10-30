export class ResponseDto<T> {
  constructor(public data?: T) {}
}

export class ListResponseDto<R, Q> {
  constructor(public total: number, public count: number, public rows: R, public query: Q) {}
}
