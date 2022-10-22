import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { matchupActionName } from './createActionName'

interface MatchupStore {
	searchValue: string;
	changeSearchValue: (value: string) => void;

	pinnedTemTems: string[];
	togglePinnedTemTem: (value: string) => void;
}

export const useMatchupStore = create<MatchupStore>()(devtools((set, get) => ({
	searchValue: '',
	changeSearchValue: value => {
		set({ searchValue: value }, ...matchupActionName('changeSearchValue'))
	},

	pinnedTemTems: [],
	togglePinnedTemTem: value => {
		const { pinnedTemTems } = get()
		if (pinnedTemTems.includes(value)) {
			set(state => ({
				pinnedTemTems: state.pinnedTemTems.filter(temtem => temtem !== value)
			}))
		} else {
			set(state => ({
				pinnedTemTems: [...state.pinnedTemTems, value]
			}))
		}
	}
}), { name: 'Matchup' }))