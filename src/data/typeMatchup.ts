export type Types =
	| 'neutral'
	| 'fire'
	| 'water'
	| 'nature'
	| 'electric'
	| 'earth'
	| 'mental'
	| 'wind'
	| 'digital'
	| 'melee'
	| 'crystal'
	| 'toxic'

type TypeMatchup = Record<Types, Partial<Record<Types, 0.5 | 2>>>;

export const typeMatchupData: TypeMatchup = {
	neutral: {
		mental: 0.5
	},
	fire: {
		fire: 0.5,
		water: 0.5,
		nature: 2,
		earth: 0.5,
		crystal: 2
	},
	water: {
		fire: 2,
		water: 0.5,
		nature: 0.5,
		earth: 2,
		digital: 2,
		toxic: 0.5
	},
	nature: {
		fire: 0.5,
		water: 2,
		nature: 0.5,
		earth: 2,
		toxic: 0.5
	},
	electric: {
		water: 2,
		nature: 0.5,
		electric: 0.5,
		earth: 0.5,
		mental: 2,
		wind: 2,
		digital: 2,
		crystal: 0.5
	},
	earth: {
		fire: 2,
		water: 0.5,
		nature: 0.5,
		electric: 2,
		wind: 0.5,
		crystal: 2
	},
	mental: {
		neutral: 2,
		melee: 2,
		crystal: 0.5
	},
	wind: {
		electric: 0.5,
		wind: 0.5,
		toxic: 2
	},
	digital: {
		mental: 2,
		digital: 2,
		melee: 2
	},
	melee: {
		earth: 2,
		mental: 0.5,
		melee: 0.5,
		crystal: 2
	},
	crystal: {
		fire: 0.5,
		electric: 2,
		earth: 0.5,
		mental: 2
	},
	toxic: {
		water: 2,
		nature: 2,
		earth: 0.5,
		digital: 0.5,
		crystal: 0.5,
		toxic: 0.5
	}
}