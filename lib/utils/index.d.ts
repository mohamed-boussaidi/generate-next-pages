import { IValueField } from "../interfaces";
export declare const createPage: (pageName: string, resource: string, methode: string, content: string) => Promise<void>;
export declare const renderTypes: (value: IValueField, name: string) => string | undefined;
export declare const selectDataElement: (value: IValueField, name: string) => string;
