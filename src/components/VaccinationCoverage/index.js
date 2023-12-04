import './index.css'
import {Bar, BarChart, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {vaccineData} = props

  const dataFormatter = n => {
    if (n > 1000) {
      return `${(n / 100).toString()}k`
    }
    return n.toString()
  }

  return (
    <div className="mini-container">
      <div className="chart-container">
        <h1 className="chart-title">Vaccination Coverage</h1>
        <BarChart
          data={vaccineData.last_7_days_vaccination}
          margin={{top: 5}}
          width={1000}
          height={300}
        >
          <XAxis
            dataKey="vaccine_date"
            tick={{stroke: '#6c757d', strokewidth: 2}}
          />
          <YAxis
            tickFormatter={dataFormatter}
            tick={{stroke: '#6c757d', strokewidth: 0}}
          />
          <Legend wrapperStyle={{padding: 25}} />
          <Bar dataKey="dose_1" name="Dose 1" barSize="20%" fill="#5a8dee" />
          <Bar dataKey="dose_2" name="Dose 2" barSize="20%" fill="#f54394" />
        </BarChart>
      </div>
    </div>
  )
}

export default VaccinationCoverage
