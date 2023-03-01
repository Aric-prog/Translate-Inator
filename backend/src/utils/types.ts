export type DTOClass = {
    from: (requestBody: LooseObject) => LooseObject;
};

export interface LooseObject {
    [key: string]: any;
}
