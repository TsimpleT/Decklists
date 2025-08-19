export const IS_DEV: boolean = (process.env.NODE_ENV === "development");
export const DEV_STRING_PRE: string = IS_DEV ? "*" : "";

let verStr: string|undefined = process.env.REACT_APP_VERSION;
export const VERSION_STRING: string =
    (!verStr)
        ? ""
        : (verStr.length > 2 && verStr[0] === "0")
            ? `beta v${verStr.substring(2)}`
            : `v${verStr}`;
