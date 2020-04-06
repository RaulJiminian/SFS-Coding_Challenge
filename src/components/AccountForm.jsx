import React from 'react';

export default class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: {
        id: '',
        creditorName: '',
        firstName: '',
        lastName: '',
        minPaymentPercentage: '',
        balance: ''
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevstate => ({
      accountData: {
        ...prevstate.accountData,
        [name]: value
      }
    }))
  }

  render() {
    return (
      <div className="main-form-div">
        <form className="form-div" onSubmit={(event) => {
          event.preventDefault();
          this.props.addBankAccount(this.state.accountData)
        }}>
          <div className="sub-form-div">

            <div className="creditor-div">
              <label htmlFor="creditorName">Creditor</label>
              <input
                type="text"
                name="creditorName"
                placeholder="Creditor"
                value={this.state.creditorName}
                onChange={this.handleChange}
              />
            </div>

            <div className="first-name-div">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>

            <div className="last-name-div">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>

            <div className="min-payment-div">
              <label htmlFor="minPaymentPercentage">Min payment</label>
              <input
                type="text"
                name="minPaymentPercentage"
                placeholder="Min payment"
                value={this.state.minPaymentPercentage}
                onChange={this.handleChange}
              />
            </div>

            <div className="balance-div">
              <label htmlFor="balance">Balance</label>
              <input
                type="text"
                name="balance"
                placeholder="Balance"
                value={this.state.balance}
                onChange={this.handleChange}
              />
            </div>

            <div className="">
              <button id='create-account-button'>Add Account</button>
            </div>

          </div>
        </form>
      </div>
    )
  }
}