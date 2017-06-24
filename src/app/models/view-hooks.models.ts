
export interface iViewHooks {
    context: any,
    initHooks: Array<{action: Function, arguments?: any[]}>,
    destroyHooks: Array<{action: Function, arguments?: any[]}>
}
