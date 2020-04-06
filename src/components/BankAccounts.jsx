import React from 'react';
import Checkbox from '../components/CheckBox';
import AccountForm from '../components/AccountForm';

class BankAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedTotal: 0,
      checkedItems: {},
      checkedSize: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const id = e.target.id;
    const isChecked = e.target.checked;

    this.setState(prevState => ({
      checkedItems: { ...prevState.checkedItems, [id]: isChecked }
    }));
  }

  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.checkedItems !== prevState.checkedItems) {
      const checkedTotal = this.getCheckedTotals()
      const checkedSize = this.getCheckedSize()
      this.setState({
        checkedTotal,
        checkedSize
      })
    }
  }

  getCheckedTotals() {
    return Object.entries(this.state.checkedItems).filter((pair) => {
      return pair[1]
    }).reduce((sum, pair) => {
      const checkedAccount = this.props.bankAccounts.find((account) => {
        return account.id === parseInt(pair[0])
      })

      return sum + Number(checkedAccount.balance)
    }, 0)
  }

  getCheckedSize() {
    return Object.entries(this.state.checkedItems).filter((pair) => {
      return pair[1]
    }).length
  }

  render() {

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Checked</th>
              <th>Creditor</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Min Pay %</th>
              <th>Balance</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.bankAccounts.map((account) => (
                <React.Fragment key={account.id}>
                  <tr>
                    <td>
                      <Checkbox id={account.id} checked={this.state.checkedItems[account.id] || false} onChange={this.handleChange} />
                    </td>
                    <td>{account.creditorName}</td>
                    <td>{account.firstName}</td>
                    <td>{account.lastName}</td>
                    <td>{Number(account.minPaymentPercentage).toFixed(2)} %</td>
                    <td className="td-balance">${this.numberWithCommas(Number(account.balance).toFixed(2))}</td>
                    <td className="delete-hover" onClick={() => {
                      this.props.deleteBankAccount(account.id)
                    }}>X</td>
                  </tr>
                </React.Fragment>
              ))
            }
          </tbody>
          <tfoot>
            <tr className="tr-row-size">
              <td className="td-left" colSpan="5">Rows-checked:</td>
              <td className="td-right">{this.state.checkedSize}</td>
            </tr>
            <tr className="tr-sub-total">
              <td className="td-left" colSpan="5">Checked-total:</td>
              <td className="td-right">$ {this.numberWithCommas(Number(this.state.checkedTotal).toFixed(2))}</td>
            </tr>
          </tfoot>
        </table>
        <AccountForm bankAccounts={this.props.bankAccounts} addBankAccount={this.props.addBankAccount} />
      </div >
    )
  }
}

export default BankAccounts;