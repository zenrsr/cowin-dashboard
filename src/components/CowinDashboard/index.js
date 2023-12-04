import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

class CowinDashboard extends Component {
  state = {vaccineData: '', isLoading: true}

  componentDidMount() {
    this.getData()
  }

  dataFormatter = n => {
    if (n > 1000) {
      return `${(n / 100).toString()}k`
    }
    return n.toString()
  }

  getData = async () => {
    const api = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(api)
    const data = await response.json()
    this.setState({vaccineData: data, isLoading: false})
  }

  //   renderBarCharts = () => {
  //     const {vaccineData} = this.state
  //     return (
  //       <div className="mini-container">
  //         <h1 className="chart-title">CoWIN Vaccination in India</h1>
  //         <div className="chart-container">
  //           <h1 className="chart-title">Vaccination Coverage</h1>
  //           <ResponsiveContainer width="100%" height={500}>
  //             <BarChart
  //               data={vaccineData.last_7_days_vaccination}
  //               margin={{top: 5}}
  //             >
  //               <XAxis
  //                 dataKey="vaccine_date"
  //                 tick={{stroke: '#6c757d', strokewidth: 2}}
  //               />
  //               <YAxis
  //                 tickFormatter={this.dataFormatter}
  //                 tick={{stroke: '#6c757d', strokewidth: 0}}
  //               />
  //               <Legend wrapperStyle={{padding: 25}} />
  //               <Bar
  //                 dataKey="dose_1"
  //                 name="Dose 1"
  //                 barSize="20%"
  //                 fill="#5a8dee"
  //               />
  //               <Bar
  //                 dataKey="dose_2"
  //                 name="Dose 2"
  //                 barSize="20%"
  //                 fill="#f54394"
  //               />
  //             </BarChart>
  //           </ResponsiveContainer>
  //         </div>
  //       </div>
  //     )
  //   }

  //   renderHalfPieChart = () => {
  //     const {vaccineData} = this.state
  //     return (
  //       <div className="mini-container">
  //         <div className="chart-container">
  //           <h1 className="chart-title">Vaccination by Gender</h1>
  //           <ResponsiveContainer width="100%" height={300}>
  //             <PieChart>
  //               <Pie
  //                 cx="50%"
  //                 cy="60%"
  //                 data={vaccineData.vaccination_by_gender}
  //                 startAngle={180}
  //                 endAngle={0}
  //                 innerRadius="40%"
  //                 outerRadius="80%"
  //                 dataKey="count"
  //               >
  //                 <Cell name="Male" fill="#f54394" />
  //                 <Cell name="Female" fill="#5a8dee" />
  //                 <Cell name="Others" fill="#2cc6c6" />
  //               </Pie>
  //               <Legend
  //                 iconType="square"
  //                 layout="horizontal"
  //                 HorizontalAlign="end"
  //                 align="center"
  //                 wrapperStyle={{'margin-bottom': 25, padding: 25}}
  //               />
  //             </PieChart>
  //           </ResponsiveContainer>
  //         </div>
  //       </div>
  //     )
  //   }

  renderSuccessView = () => {
    const {vaccineData, isLoading} = this.state
    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <>
        {vaccineData.last_7_days_vaccination && (
          <VaccinationCoverage vaccineData={vaccineData} />
        )}
        {vaccineData.vaccination_by_gender && (
          <VaccinationByGender vaccineData={vaccineData} />
        )}
        {vaccineData.vaccination_by_age && (
          <VaccinationByAge vaccineData={vaccineData} />
        )}
      </>
    )
  }

  renderFailureView = () => {
    const {isLoading} = this.state
    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <div className="mini-container">
        <h1 className="chart-title">CoWIN Vaccination in India</h1>
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            className="fail-img"
            alt="failure view"
          />
          <h1 className="failure-title">Something went wrong</h1>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Rings" height={100} width={100} color="#ffffff" />
    </div>
  )

  renderTheResult = () => {
    const {vaccineData} = this.state
    if (vaccineData) {
      return this.renderSuccessView()
    }
    return this.renderFailureView()
  }

  render() {
    const {vaccineData} = this.state
    console.log(vaccineData.last_7_days_vaccination)
    console.log(vaccineData.vaccination_by_age)
    console.log(vaccineData.vaccination_by_gender)

    return (
      <div className="container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="title-img"
            alt="website logo"
          />
          <h1 className="title">Co-Win</h1>
        </div>
        <h1 className="chart-title">CoWIN Vaccination in India</h1>
        {this.renderTheResult()}
      </div>
    )
  }
}

export default CowinDashboard
