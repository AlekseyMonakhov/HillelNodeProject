export interface IGeneralError {
    message: string;
    status: number;
}

export interface IBadRequestError {
    path: (string | number)[];
    message: string;
}
