


export const getManhattan = (x:number,y:number,xd:number,yd:number): number => {
    return Math.abs(x-xd) + Math.abs(y-yd)
}