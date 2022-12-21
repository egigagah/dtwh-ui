export function generateDataPie(data: any[]): any[] {
    return data.map((item: any) => {
        const obj = { ...item };
        obj.color = "hsl(247, 70%, 50%)";
        return obj;
    });
}
