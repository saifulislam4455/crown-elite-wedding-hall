
import { useState } from "react";
import { Download, Banknote } from "lucide-react";
import "../../styles/Payouts.css";

const payoutData = [
  {
    id: "PO-1182",
    period: "7 – 8 Nov · 4 events",
    gross: "Rs 31,40,000",
    deductions: "Rs 2,91,000",
    net: "Rs 28,49,000",
    status: "Paid 10 Nov",
    type: "paid",
  },
  {
    id: "PO-1171",
    period: "31 Oct – 1 Nov · 3 events",
    gross: "Rs 22,10,000",
    deductions: "Rs 2,04,700",
    net: "Rs 20,05,300",
    status: "Paid 3 Nov",
    type: "paid",
  },
  {
    id: "PO-1165",
    period: "24 – 25 Oct · 2 events",
    gross: "Rs 14,60,000",
    deductions: "Rs 1,35,200",
    net: "Rs 13,24,800",
    status: "Paid 27 Oct",
    type: "paid",
  },
  {
    id: "PO-1190",
    period: "14 Nov · 2 events",
    gross: "Rs 19,92,000",
    deductions: "Rs 2,27,800",
    net: "Rs 17,64,200",
    status: "Scheduled 16 Nov",
    type: "scheduled",
  },
];

function Payouts() {
  const [payouts] = useState(payoutData);
  const [account, setAccount] = useState({
    name: "Rana Properties",
    bank: "Meezan Bank",
    account: "PK36 MEZN •••• 0123",
    verified: true,
  });

  function downloadStatement(payout) {
    const rows = [
      ["Payout ID", "Period / events", "Gross", "Deductions", "Net paid", "Status"],
      [
        payout.id,
        payout.period,
        payout.gross,
        payout.deductions,
        payout.net,
        payout.status,
      ],
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${payout.id}-statement.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  function downloadAllStatements() {
    const rows = [
      ["Payout", "Period / events", "Gross", "Deductions", "Net paid", "Status"],
      ...payouts.map((payout) => [
        payout.id,
        payout.period,
        payout.gross,
        payout.deductions,
        payout.net,
        payout.status,
      ]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "payout-statements.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function changeAccount() {
    const bank = prompt("Enter bank name:", account.bank);
    if (!bank) return;

    const accountName = prompt("Enter account name:", account.name);
    if (!accountName) return;

    setAccount({
      ...account,
      bank,
      name: accountName,
      verified: false,
    });
  }

  return (
    <div className="payouts-page">
      {/* Page heading */}

      <div className="payouts-heading">
        <div>
          <h1>Payouts</h1>
          <p>
            Money collected online is sent to your bank 2 days after each
            event, minus commission.
          </p>
        </div>

        <button
          className="download-statement-button"
          onClick={downloadAllStatements}
        >
          <Download size={17} />
          Download statement
        </button>
      </div>

      {/* Main payout card */}

      <section className="next-payout-card">
        <div className="next-payout-details">
          <span className="next-payout-label">
            Next payout · Mon 16 Nov
          </span>

          <h2>Rs 17,64,200</h2>

          <p>
            To Meezan Bank ••• 0123 · for 2 events on 14 Nov
          </p>
        </div>

        <div className="payout-breakdown">
          <div>
            <span>Collected online</span>
            <strong>Rs 19,92,000</strong>
          </div>

          <div>
            <span>Commission (8%)</span>
            <strong>− Rs 1,59,360</strong>
          </div>

          <div>
            <span>Tax on commission</span>
            <strong>− Rs 25,500</strong>
          </div>

          <div>
            <span>Refund adjustments</span>
            <strong>− Rs 42,940</strong>
          </div>

          <div className="payout-receive-total">
            <span>You receive</span>
            <strong>Rs 17,64,200</strong>
          </div>
        </div>
      </section>

      {/* Payout history */}

      <div className="payout-table-wrapper">
        <table className="payout-table">
          <thead>
            <tr>
              <th>Payout</th>
              <th>Period / events</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net paid</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id}>
                <td>
                  <strong>{payout.id}</strong>
                </td>

                <td>{payout.period}</td>

                <td>{payout.gross}</td>

                <td className="payout-deductions">
                  {payout.deductions}
                </td>

                <td>
                  <strong>{payout.net}</strong>
                </td>

                <td>
                  <span className={`payout-status ${payout.type}`}>
                    <span className="payout-status-dot" />
                    {payout.status}
                  </span>
                </td>

                <td>
                  <button
                    className="payout-statement-link"
                    onClick={() => downloadStatement(payout)}
                  >
                    Statement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bank account */}

      <section className="payout-account-card">
        <div className="payout-account-icon">
          <Banknote size={20} />
        </div>

        <div className="payout-account-info">
          <strong>Payout account</strong>

          <p>
            {account.name} · {account.bank} · {account.account}
            {account.verified ? " · Verified" : " · Verification pending"}
          </p>
        </div>

        <button
          className="payout-account-change"
          onClick={changeAccount}
        >
          Change
        </button>
      </section>
    </div>
  );
}

export default Payouts;
