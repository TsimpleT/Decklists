export const IS_DEV: boolean = (process.env.NODE_ENV === "development");
export const DEV_STRING_PRE: string = IS_DEV ? "*" : "";

let verStr: string|undefined = process.env.REACT_APP_VERSION;
export const VERSION_STRING: string = (verStr) ? `v${verStr}` : "";
