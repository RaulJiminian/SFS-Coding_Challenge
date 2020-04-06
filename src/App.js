import React from 'react';
import './App.css';
import { getAllBankAccounts } from './services/api-helper';
import BankAccounts from './components/BankAccounts';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bankAccounts: "",
    }
  }

  async componentDidMount() {
    const bankAccounts = await getAllBankAccounts();
    this.setState({
      bankAccounts: bankAccounts
    })
  }

  addBankAccount = (account) => {

    const bankAccount = this.state.bankAccounts
    const lastIdCreated = bankAccount[bankAccount.length - 1].id
    const id = lastIdCreated + 1

    this.setState(prevState => ({
      bankAccounts: [...prevState.bankAccounts, { ...account, id }]
    }))
  }

  deleteBankAccount = (id) => {

    this.setState(prevState => ({
      bankAccounts: prevState.bankAccounts.filter((account) => {
        return account.id !== id
      })
    }))

  }

  getTotalBalance = () => {
    const sumArray = this.state.bankAccounts.map((account) => {
      return account.balance
    })

    const totalBalance = sumArray.reduce((sum, balance) => {
      return sum = sum + balance
    })

    return totalBalance
  }

  render() {
    return (
      <div className="App">
        {this.state.bankAccounts &&
          <BankAccounts
            bankAccounts={this.state.bankAccounts}
            getTotalBalance={this.getTotalBalance}
            addBankAccount={this.addBankAccount}
            deleteBankAccount={this.deleteBankAccount}
          />
        }
      </div>
    );
  }
}

export default App;