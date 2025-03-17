import Layout from "@/components/kokonutui/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserManualPage() {
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Manual</h1>
          <p className="text-muted-foreground">Learn how to use the Financial Dashboard</p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="goals">Financial Goals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to the Financial Dashboard</CardTitle>
                <CardDescription>Your personal finance management solution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Introduction</h2>
                  <p>
                    The Financial Dashboard is a comprehensive tool designed to help you manage your personal finances,
                    track expenses, monitor investments, and set financial goals. This user manual will guide you
                    through all the features and functionalities of the application.
                  </p>

                  <h2>Logging In</h2>
                  <p>
                    To access the Financial Dashboard, you need to log in with your credentials. If you don't have an
                    account yet, you can register for a new one.
                  </p>
                  <ul>
                    <li>
                      <strong>Login:</strong> Enter your email and password on the login page.
                    </li>
                    <li>
                      <strong>Registration:</strong> Click on the "Register" link on the login page and fill in your
                      details.
                    </li>
                  </ul>

                  <h2>Navigation</h2>
                  <p>
                    The Financial Dashboard has a sidebar navigation menu that allows you to access different sections
                    of the application:
                  </p>
                  <ul>
                    <li>
                      <strong>Dashboard:</strong> Overview of your financial status
                    </li>
                    <li>
                      <strong>Transactions:</strong> View and manage all your financial transactions
                    </li>
                    <li>
                      <strong>Savings Calculator:</strong> Plan your savings goals
                    </li>
                    <li>
                      <strong>Accounts:</strong> Manage your financial accounts
                    </li>
                    <li>
                      <strong>Investments:</strong> Track your investment portfolio
                    </li>
                    <li>
                      <strong>Settings:</strong> Configure your profile and preferences
                    </li>
                  </ul>

                  <h2>Sample Data</h2>
                  <p>
                    The application comes pre-loaded with sample data to help you understand how it works. You can use
                    this data to explore the features or delete it and start fresh with your own information.
                  </p>
                  <p>
                    <strong>Note:</strong> All data is stored locally in your browser. No information is sent to any
                    server.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>Understanding your financial summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Dashboard Components</h2>
                  <p>
                    The Dashboard provides a comprehensive overview of your financial status. It is divided into several
                    sections:
                  </p>

                  <h3>Financial Summary Cards</h3>
                  <p>At the top of the Dashboard, you'll find four cards showing key financial metrics:</p>
                  <ul>
                    <li>
                      <strong>Total Balance:</strong> The sum of all your account balances (minus debts)
                    </li>
                    <li>
                      <strong>Income:</strong> Your total income for the current period
                    </li>
                    <li>
                      <strong>Expenses:</strong> Your total expenses for the current period
                    </li>
                    <li>
                      <strong>Accounts:</strong> The number of financial accounts you have
                    </li>
                  </ul>

                  <h3>Income vs Expenses Chart</h3>
                  <p>
                    This chart visualizes the relationship between your income and expenses, helping you understand your
                    spending patterns and savings rate.
                  </p>

                  <h3>Recent Transactions</h3>
                  <p>
                    This section displays your most recent financial activities, allowing you to quickly review your
                    latest transactions.
                  </p>

                  <h3>Dashboard Tabs</h3>
                  <p>The Dashboard has several tabs that allow you to view different aspects of your finances:</p>
                  <ul>
                    <li>
                      <strong>Overview:</strong> General financial summary
                    </li>
                    <li>
                      <strong>Payment Analytics:</strong> Detailed analysis of your spending by category
                    </li>
                    <li>
                      <strong>Accounts:</strong> Summary of your financial accounts
                    </li>
                    <li>
                      <strong>Goals:</strong> Progress towards your financial goals
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Managing Accounts</CardTitle>
                <CardDescription>Track all your financial accounts in one place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Account Types</h2>
                  <p>The Financial Dashboard supports four types of accounts:</p>
                  <ul>
                    <li>
                      <strong>Savings:</strong> For money set aside for future use
                    </li>
                    <li>
                      <strong>Checking:</strong> For day-to-day expenses
                    </li>
                    <li>
                      <strong>Investment:</strong> For stocks, bonds, and other investments
                    </li>
                    <li>
                      <strong>Debt:</strong> For credit cards, loans, and other liabilities
                    </li>
                  </ul>

                  <h2>Adding a New Account</h2>
                  <p>To add a new account:</p>
                  <ol>
                    <li>Navigate to the Accounts page</li>
                    <li>Click the "Add Account" button</li>
                    <li>
                      Fill in the account details:
                      <ul>
                        <li>Account Name</li>
                        <li>Description (optional)</li>
                        <li>Initial Balance</li>
                        <li>Account Type</li>
                      </ul>
                    </li>
                    <li>Click "Add Account" to save</li>
                  </ol>

                  <h2>Viewing Account Details</h2>
                  <p>
                    Click on any account card to view its details, including recent transactions associated with that
                    account.
                  </p>

                  <h2>Editing or Deleting Accounts</h2>
                  <p>To edit or delete an account:</p>
                  <ol>
                    <li>Click the three-dot menu on the account card</li>
                    <li>Select "Edit" to modify the account details or "Delete" to remove the account</li>
                  </ol>
                  <p>
                    <strong>Note:</strong> Deleting an account will also delete all transactions associated with that
                    account.
                  </p>

                  <h2>Filtering Accounts</h2>
                  <p>Use the tabs at the top of the Accounts page to filter accounts by type:</p>
                  <ul>
                    <li>All Accounts</li>
                    <li>Savings</li>
                    <li>Checking</li>
                    <li>Investments</li>
                    <li>Debt</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transactions Management</CardTitle>
                <CardDescription>Record and track your financial activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Transaction Types</h2>
                  <p>The Financial Dashboard supports two main types of transactions:</p>
                  <ul>
                    <li>
                      <strong>Incoming:</strong> Money received (income, deposits, transfers in)
                    </li>
                    <li>
                      <strong>Outgoing:</strong> Money spent (expenses, withdrawals, transfers out)
                    </li>
                  </ul>

                  <h2>Adding a New Transaction</h2>
                  <p>To add a new transaction:</p>
                  <ol>
                    <li>Navigate to the Transactions page</li>
                    <li>Click the "Add Transaction" button</li>
                    <li>
                      Fill in the transaction details:
                      <ul>
                        <li>Transaction Name</li>
                        <li>Amount</li>
                        <li>Transaction Type (Incoming or Outgoing)</li>
                        <li>Category</li>
                        <li>Account</li>
                        <li>Status (Completed, Pending, or Failed)</li>
                      </ul>
                    </li>
                    <li>Click "Add Transaction" to save</li>
                  </ol>

                  <h2>Searching and Filtering Transactions</h2>
                  <p>The Transactions page provides several ways to find specific transactions:</p>
                  <ul>
                    <li>
                      <strong>Search:</strong> Use the search box to find transactions by name
                    </li>
                    <li>
                      <strong>Filter by Type:</strong> Filter transactions by incoming or outgoing
                    </li>
                    <li>
                      <strong>Filter by Account:</strong> Filter transactions by the associated account
                    </li>
                  </ul>

                  <h2>Editing or Deleting Transactions</h2>
                  <p>To edit or delete a transaction:</p>
                  <ol>
                    <li>Find the transaction in the list</li>
                    <li>Click the three-dot menu at the end of the row</li>
                    <li>Select "Edit" to modify the transaction details or "Delete" to remove it</li>
                  </ol>

                  <h2>Transaction Impact</h2>
                  <p>
                    When you add, edit, or delete a transaction, the associated account balance is automatically
                    updated:
                  </p>
                  <ul>
                    <li>Incoming transactions increase the account balance</li>
                    <li>Outgoing transactions decrease the account balance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Tracking</CardTitle>
                <CardDescription>Monitor and manage your investment portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Investment Overview</h2>
                  <p>The Investments page provides a comprehensive view of your investment portfolio, including:</p>
                  <ul>
                    <li>Total investment value</li>
                    <li>Investment returns</li>
                    <li>Portfolio allocation</li>
                    <li>Investment transactions</li>
                  </ul>

                  <h2>Investment Accounts</h2>
                  <p>To track investments, you need to create investment accounts:</p>
                  <ol>
                    <li>Navigate to the Accounts page</li>
                    <li>Click "Add Account"</li>
                    <li>Select "Investment" as the account type</li>
                    <li>Fill in the account details</li>
                  </ol>

                  <h2>Recording Investment Transactions</h2>
                  <p>To record investment activities:</p>
                  <ol>
                    <li>Navigate to the Investments page</li>
                    <li>Click "Add Investment Transaction"</li>
                    <li>
                      Fill in the transaction details:
                      <ul>
                        <li>Transaction Name (e.g., "Stock Purchase - AAPL")</li>
                        <li>Amount</li>
                        <li>Transaction Type (Deposit/Gain or Withdrawal/Loss)</li>
                        <li>Category (Stocks, Bonds, Crypto, etc.)</li>
                        <li>Investment Account</li>
                      </ul>
                    </li>
                  </ol>

                  <h2>Portfolio Allocation</h2>
                  <p>
                    The Portfolio Allocation chart shows how your investments are distributed across different accounts.
                    This helps you visualize your investment diversification.
                  </p>

                  <h2>Investment Performance</h2>
                  <p>The Investment page calculates and displays your investment performance:</p>
                  <ul>
                    <li>
                      <strong>Total Return:</strong> The difference between your current investment value and your net
                      deposits
                    </li>
                    <li>
                      <strong>Return Percentage:</strong> Your return as a percentage of your deposits
                    </li>
                  </ul>
                  <p>
                    <strong>Note:</strong> In this version, investment performance is simplified and does not account
                    for the timing of cash flows.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Goals</CardTitle>
                <CardDescription>Set and track your financial objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Creating Financial Goals</h2>
                  <p>Financial goals help you track progress toward specific financial objectives:</p>
                  <ol>
                    <li>Navigate to the Dashboard and select the "Goals" tab</li>
                    <li>Click "Add Goal"</li>
                    <li>
                      Fill in the goal details:
                      <ul>
                        <li>Goal Title</li>
                        <li>Description</li>
                        <li>Icon</li>
                        <li>Target Date</li>
                        <li>Target Amount</li>
                        <li>Status (Pending, In Progress, Completed)</li>
                        <li>Progress Percentage</li>
                      </ul>
                    </li>
                  </ol>

                  <h2>Tracking Goal Progress</h2>
                  <p>
                    Each goal displays a progress bar showing how close you are to achieving it. You can manually update
                    the progress percentage as you make progress toward your goal.
                  </p>

                  <h2>Editing or Deleting Goals</h2>
                  <p>To edit or delete a goal:</p>
                  <ol>
                    <li>Find the goal card</li>
                    <li>Click "View Details" or the edit button</li>
                    <li>Update the goal details or click "Delete" to remove it</li>
                  </ol>

                  <h2>Goal Categories</h2>
                  <p>Goals can be categorized by type:</p>
                  <ul>
                    <li>
                      <strong>Savings:</strong> For saving money (e.g., emergency fund, vacation)
                    </li>
                    <li>
                      <strong>Investment:</strong> For investment targets (e.g., retirement, stock portfolio)
                    </li>
                    <li>
                      <strong>Debt:</strong> For debt repayment goals (e.g., student loans, mortgage)
                    </li>
                  </ul>

                  <h2>Savings Calculator</h2>
                  <p>
                    The Financial Dashboard includes a Savings Calculator that can help you plan how to reach your
                    savings goals:
                  </p>
                  <ol>
                    <li>Navigate to the Savings Calculator page</li>
                    <li>Add your expenses</li>
                    <li>Adjust the saving percentage for each expense</li>
                    <li>View the potential savings and projected timeline</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings and Profile Management</CardTitle>
                <CardDescription>Customize your account and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Profile Settings</h2>
                  <p>The Settings page allows you to manage your account information:</p>
                  <ul>
                    <li>
                      <strong>Profile Information:</strong> Update your name, email, and role
                    </li>
                    <li>
                      <strong>Avatar:</strong> Change your profile picture
                    </li>
                    <li>
                      <strong>Password:</strong> Update your account password
                    </li>
                    <li>
                      <strong>Notification Preferences:</strong> Manage how you receive notifications
                    </li>
                  </ul>

                  <h2>Subscription Management</h2>
                  <p>The Subscription page allows you to view and manage your subscription plan:</p>
                  <ul>
                    <li>View available plans and their features</li>
                    <li>Upgrade to a higher tier</li>
                    <li>View billing history</li>
                  </ul>

                  <h2>Terms and Policies</h2>
                  <p>The Terms & Policies page provides information about:</p>
                  <ul>
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                    <li>Data Usage</li>
                  </ul>

                  <h2>Theme Switching</h2>
                  <p>
                    The Financial Dashboard supports both light and dark themes. You can switch between themes using the
                    theme toggle button in the top navigation bar.
                  </p>

                  <h2>Logging Out</h2>
                  <p>To log out of your account:</p>
                  <ol>
                    <li>Click on your profile picture in the top right corner</li>
                    <li>Select "Logout" from the dropdown menu</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Sample Data Guide</CardTitle>
            <CardDescription>Understanding the pre-loaded sample data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h2>Sample Accounts</h2>
              <p>The application comes with several pre-loaded accounts to demonstrate different account types:</p>
              <ul>
                <li>
                  <strong>Main Savings:</strong> A savings account for emergency funds
                </li>
                <li>
                  <strong>Checking Account:</strong> A checking account for daily expenses
                </li>
                <li>
                  <strong>Investment Portfolio:</strong> An investment account for stocks and ETFs
                </li>
                <li>
                  <strong>Credit Card:</strong> A debt account for credit card expenses
                </li>
                <li>
                  <strong>Retirement Fund:</strong> An investment account for retirement savings
                </li>
                <li>
                  <strong>High-Yield Savings:</strong> A savings account for a house down payment
                </li>
                <li>
                  <strong>Student Loan:</strong> A debt account for education loans
                </li>
                <li>
                  <strong>Tech Stocks:</strong> An investment account focused on technology stocks
                </li>
              </ul>

              <h2>Sample Transactions</h2>
              <p>
                The application includes various transaction types to demonstrate the transaction tracking features:
              </p>
              <ul>
                <li>
                  <strong>Income:</strong> Salary deposits, freelance payments, tax refunds
                </li>
                <li>
                  <strong>Expenses:</strong> Groceries, bills, dining, entertainment
                </li>
                <li>
                  <strong>Investments:</strong> Stock purchases, ETF purchases, dividend payments
                </li>
                <li>
                  <strong>Transfers:</strong> Moving money between accounts
                </li>
                <li>
                  <strong>Debt Payments:</strong> Credit card and loan payments
                </li>
              </ul>

              <h2>Sample Goals</h2>
              <p>The application includes several financial goals to demonstrate the goal tracking features:</p>
              <ul>
                <li>
                  <strong>Emergency Fund:</strong> Saving for unexpected expenses
                </li>
                <li>
                  <strong>Stock Portfolio:</strong> Building an investment portfolio
                </li>
                <li>
                  <strong>Debt Repayment:</strong> Paying off student loans
                </li>
                <li>
                  <strong>Home Down Payment:</strong> Saving for a house
                </li>
                <li>
                  <strong>Vacation Fund:</strong> Saving for a trip
                </li>
                <li>
                  <strong>Retirement Milestone:</strong> Reaching a retirement savings goal
                </li>
              </ul>

              <h2>Using Sample Data</h2>
              <p>You can use the sample data to:</p>
              <ul>
                <li>Explore the features of the Financial Dashboard</li>
                <li>Understand how different components work together</li>
                <li>Test adding, editing, and deleting financial information</li>
              </ul>
              <p>
                When you're ready to use the application with your own data, you can delete the sample accounts,
                transactions, and goals and start fresh.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

