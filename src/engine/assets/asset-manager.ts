export class AssetManager {
    private static readonly ASSET_PATH = 'assets';

    private static cache: { [key: string]: any } = {};

    public static load<T>(file: string, transform: { (r: Response): T }): Promise<T> {
        return fetch(`${this.ASSET_PATH}/${file}`)
            .then(transform)
            .then(data => {
                AssetManager.cache[file] = data;
                return data;
            });
    }

    public static loadString(file: string): Promise<string> {
        return AssetManager.load(file, r => r.text()).then(x => x);
    }

    public static get(file: string): any {
        if (!AssetManager.cache[file]) {
            throw new Error(`Asset [${file}] is not available in cache. Use load() methods first.`);
        }
        return AssetManager.cache[file];
    }

    public static getString(file: string): string {
        return AssetManager.get(file) as string;
    }
}
