import MatchupTable from 'components/MatchupTable'
import TemTemInput from 'components/TemTemInput'
import { type NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<>
			<TemTemInput />
			<MatchupTable />
		</>
	)
}

export default Home
