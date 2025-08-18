export const DEV_STRING_PRE: string = (process.env.NODE_ENV === "development") ? "*" : "";

let verStr: string|undefined = process.env.REACT_APP_VERSION;
export const VERSION_STRING: string =
    (!verStr)
        ? ""
        : (verStr.length > 2 && verStr[0] === "0")
            ? `beta v${verStr.substring(2)}`
            : `v${verStr}`;
