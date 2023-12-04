import './index.css'
import {ResponsiveContainer, Pie, Legend, PieChart, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccineData} = props
  return (
    <div className="mini-container">
      <div className="chart-container">
        <h1 className="chart-title">Vaccination by age</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="50%"
              cy="40%"
              data={vaccineData.vaccination_by_age}
              startAngle={0}
              endAngle={360}
              innerRadius="0"
              outerRadius="80%"
              dataKey="count"
            >
              <Cell name="18-44" fill=" #5a8dee" />
              <Cell name="44-60" fill="#a3df9f" />
              <Cell name="above 60" fill="#64c2a6" />
            </Pie>
            <Legend
              iconType="square"
              layout="horizontal"
              HorizontalAlign="end"
              align="center"
              wrapperStyle={{'margin-bottom': 25, padding: 25}}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VaccinationByAge
