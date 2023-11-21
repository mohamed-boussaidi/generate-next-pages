export interface IRoute {
    route: string;
    data: any;
    methode: "GET" | "DELETE" | "POST" | "PUT" | "GETONE";
    resource: string;
}
export interface IValueField {
    "owl:maxCardinality": number;
    type: string | string[];
    description?: string;
    format?: "iri-reference" | "date-time";
    items?: { type: 'string', format: 'iri-reference' }
}