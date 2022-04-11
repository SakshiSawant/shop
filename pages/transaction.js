/* This example requires Tailwind CSS v2.0+ */
const transactions = [
    {
        transactionID: '4',
        date: '23:55 on 2/19/2022',
        from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        amount: '0.025 ETH',
        //message: 'Buy Books',
        status: 'Completed'
    },
    {
        transactionID: '3',
        date: '23:55 on 2/19/2022',
        from: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        to: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        amount: '0.5 ETH',
        //message: 'Create Market Item',
        status: 'Pending'
    },
    {
        transactionID: '2',
        date: '23:55 on 2/19/2022',
        from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        amount: '3 ETH',
        //message: 'Donation for Treatment of Ajay Sardar',
        status: 'Completed'
    },
    // More people...
  ]
  
  export default function Example() {
    return (
        
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-4">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>

                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>

                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>

                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>

                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To
                    </th>

                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>

                    {/* <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th> */}

                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((t) => (
                    <tr key={t.transactionID}>
                      
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.transactionID}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.from}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.to}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.amount}</td>
                      {/* <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.message}</td> */}
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.status}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  