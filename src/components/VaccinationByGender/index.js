import './index.css'
import {PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByGender = props => {
  const {vaccineData} = props

  return (
    <div className="mini-container">
      {/* <h1 className="chart-title">CoWIN Vaccination in India</h1> */}
      <div className="chart-container">
        <h1 className="chart-title">Vaccination by Gender</h1>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="60%"
            data={vaccineData.vaccination_by_gender}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="80%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="square"
            layout="horizontal"
            HorizontalAlign="end"
            align="center"
            wrapperStyle={{'margin-bottom': 25, padding: 25}}
          />
        </PieChart>
      </div>
    </div>
  )
}

export default VaccinationByGender
