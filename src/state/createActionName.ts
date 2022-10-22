const createActionName = (storeName: string) => (actionName: string): [false, string] => [false, `${storeName}/${actionName}`]

export const gameActionName = createActionName('game')

export const matchupActionName = createActionName('matchup')
export const settingsActionName = createActionName('settings')