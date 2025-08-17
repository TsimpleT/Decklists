class ImageUtil {
    private imageMap: {[key: string]: string};

    constructor() {
        this.imageMap = {};
    }

    public getImage(name: string): string {
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
