import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

class CowinDashboard extends Component {
  state = {vaccineData: null, isLoading: true, hasError: false}

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

    try {
      const response = await fetch(api)

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()
      this.setState({vaccineData: data, isLoading: false, hasError: false})
    } catch (error) {
      console.error(error)
      this.setState({isLoading: false, hasError: true})
    }
  }

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
    const {hasError} = this.state
    if (hasError) {
      return this.renderFailureView()
    }
    return this.renderSuccessView()
  }

  render() {
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
