export class BaseDto {
    id: number = 0;
    name: string = '';
}

export abstract class ListResponseDto<T> {
    list: T[] = [];
    total: number = 0;
    page: number = 0;
    size: number = 20;
}

export abstract class CrudGetResponse<T> {
    value: T = {} as T;
    code?: string;
    message?: string;
}
