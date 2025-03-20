import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaMoneyCheckAlt, FaFileInvoiceDollar, FaReceipt, FaPlus } from "react-icons/fa";
import profilecomptable from "../assets/profilecompatible.webp";
import { useNavigate } from "react-router-dom";
import "../Style/accounting.css";

const AccountingDashboard = () => {
  const [activeSection, setActiveSection] = useState("payments");
  const navigate = useNavigate();

  const [payments, setPayments] = useState([
    { id: 1, client: "Client A", amount: 200, date: "2023-10-01", paymentMethod: "Carte bancaire" },
    { id: 2, client: "Client B", amount: 300, date: "2023-10-02", paymentMethod: "Virement bancaire" },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 1, client: "Client A", amount: 200, date: "2023-10-01", status: "payé" },
    { id: 2, client: "Client B", amount: 300, date: "2023-10-02", status: "en attente" },
  ]);

  const [taxPayments, setTaxPayments] = useState([
    { id: 1, type: "TVA", amount: 1000, date: "2023-10-01", status: "payé" },
    { id: 2, type: "Impôt sur les sociétés", amount: 5000, date: "2023-10-02", status: "en attente" },
  ]);

  const [newPayment, setNewPayment] = useState({ client: "", amount: "", paymentMethod: "" });
  const [newInvoice, setNewInvoice] = useState({ client: "", amount: "" });
  const [newTax, setNewTax] = useState({ type: "", amount: "" });

  const addPayment = () => {
    if (newPayment.client && newPayment.amount && newPayment.paymentMethod) {
      const newPaymentEntry = {
        id: payments.length + 1,
        client: newPayment.client,
        amount: parseFloat(newPayment.amount),
        date: new Date().toISOString().split('T')[0],
        paymentMethod: newPayment.paymentMethod,
      };
      setPayments([...payments, newPaymentEntry]);
      setNewPayment({ client: "", amount: "", paymentMethod: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addInvoice = () => {
    if (newInvoice.client && newInvoice.amount) {
      const newInvoiceEntry = {
        id: invoices.length + 1,
        client: newInvoice.client,
        amount: parseFloat(newInvoice.amount),
        date: new Date().toISOString().split('T')[0],
        status: "en attente",
      };
      setInvoices([...invoices, newInvoiceEntry]);
      setNewInvoice({ client: "", amount: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addTax = () => {
    if (newTax.type && newTax.amount) {
      const newTaxEntry = {
        id: taxPayments.length + 1,
        type: newTax.type,
        amount: parseFloat(newTax.amount),
        date: new Date().toISOString().split('T')[0],
        status: "en attente",
      };
      setTaxPayments([...taxPayments, newTaxEntry]);
      setNewTax({ type: "", amount: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleLogout = () => {
    alert("Déconnexion réussie");
    navigate("/"); // Rediriger vers la page d'accueil
  };

  return (
    <div className="comptableService">
      <Sidebar
        buttons={[
          { name: "Payments", icon: <FaMoneyCheckAlt /> },
          { name: "Invoices", icon: <FaFileInvoiceDollar /> },
          { name: "Taxes", icon: <FaReceipt /> },
        ]}
        onButtonClick={(buttonName) => setActiveSection(buttonName.toLowerCase().replace(/ /g, "_"))}
        activeButton={activeSection}
        onLogout={handleLogout}
        dashboardName="Tableau de Bord Comptable"
        profileImage={profilecomptable}
      />

      <div className="main-content">
        {activeSection === "payments" && (
          <section className="section">
            <h2 className="heading">Paiements</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom du client</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Mode de paiement</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.client}</td>
                    <td>{payment.amount} €</td>
                    <td>{payment.date}</td>
                    <td>{payment.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Nom du client"
                value={newPayment.client}
                onChange={(e) => setNewPayment({ ...newPayment, client: e.target.value })}
                className="input"
              />
              <input
                type="number"
                placeholder="Montant"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                className="input"
              />
              <select
                value={newPayment.paymentMethod}
                onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
                className="input"
              >
                <option value="">Choisir un mode de paiement</option>
                <option value="Espèce">Espèce</option>
                <option value="Carte bancaire">Carte bancaire</option>
                <option value="Virement bancaire">Virement bancaire</option>
                <option value="Portefeuille électronique">Portefeuille électronique</option>
                <option value="Chèque">Chèque</option>
                <option value="Paiement à l'arrivée">Paiement à l'arrivée</option>
                <option value="Paiement en ligne">Paiement en ligne</option>
              </select>
              <button className="button" onClick={addPayment}>
                <FaPlus /> Ajouter un paiement
              </button>
            </div>
          </section>
        )}

        {activeSection === "invoices" && (
          <section className="section">
            <h2 className="heading">Factures</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom du client</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.client}</td>
                    <td>{invoice.amount} €</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Nom du client"
                value={newInvoice.client}
                onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
                className="input"
              />
              <input
                type="number"
                placeholder="Montant"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                className="input"
              />
              <button className="button" onClick={addInvoice}>
                <FaPlus /> Ajouter une facture
              </button>
            </div>
          </section>
        )}

        {activeSection === "taxes" && (
          <section className="section">
            <h2 className="heading">Taxes</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {taxPayments.map((tax) => (
                  <tr key={tax.id}>
                    <td>{tax.type}</td>
                    <td>{tax.amount} €</td>
                    <td>{tax.date}</td>
                    <td>{tax.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Type de taxe"
                value={newTax.type}
                onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
                className="input"
              />
              <input
                type="number"
                placeholder="Montant"
                value={newTax.amount}
                onChange={(e) => setNewTax({ ...newTax, amount: e.target.value })}
                className="input"
              />
              <button className="button" onClick={addTax}>
                <FaPlus /> Ajouter une taxe
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AccountingDashboard;