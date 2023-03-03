export type PgErrorMap = Map<string, string>; 
export interface PgErrorCallback {
    throwError(err : Error) : void;
}