export class DebugContext {
    private static values = new Map<string, any>();

    public static set(key: string, value: any) {
        this.values.set(key, value);
    }

    public static log() {
        console.log(this.values);
    }
}
