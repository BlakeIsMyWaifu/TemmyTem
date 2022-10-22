import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { matchupActionName } from './createActionName'

interface MatchupStore {
	searchValue: string;
	changeSearchValue: (value: string) => void;
}

export const useMatchupStore = create<MatchupStore>()(devtools(set => ({
	searchValue: '',
	changeSearchValue: value => {
		set({ searchValue: value }, ...matchupActionName('changeSearchValue'))
	}
}), { name: 'Matchup' }))