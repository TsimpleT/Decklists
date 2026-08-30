import { CardType, Domain } from "./Cards";

export type ImageType = Domain|`${Domain}BW`|LinkType|CardType|"ChampionUnit"|OtherType;
type LinkType = "Challonge"|"Start"|"Sheets"|"Battlefy"|"UVS";
type OtherType = "Riftbound"|"RainbowRune"|"Export"|"Import"|"Info"|"Edit"|"Settings"|"Trash"|"Incomplete"|"";

class ImageUtil {
    private imageMap: {[key: string]: string};

    constructor() {
        this.imageMap = {};
    }

    public getImage(name: ImageType): string {
        if(name in this.imageMap) {
            return this.imageMap[name];
        }
        const loadImage = require(`../Assets/${name}.png`);
        this.imageMap[name] = loadImage;
        return loadImage;
    }
}

const _instance = new ImageUtil();
export { _instance as ImageUtil };
