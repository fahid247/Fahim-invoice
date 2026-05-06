"use client";

import { useState } from 'react';
import { Plus, Trash2, Printer, FileText, User } from 'lucide-react';

export default function Home() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV-2026-001",
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: "John Doe",
    clientAddress: "123 Main St\nCityville, ST 12345",
    clientEmail: "john@example.com",
    taxRate: 22,
  });

  const [items, setItems] = useState([
    { id: 1, description: "Smartphone Screen Repair", quantity: 1, price: 150 },
    { id: 2, description: "Data Recovery", quantity: 1, price: 80 }
  ]);

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const tax = subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax;

  return (
    <>
      <header>
        <h1><FileText className="inline w-10 h-10 mb-2 mr-2" /> MOZUMDER Billing</h1>
        <p>Premium automatic invoice generator</p>
      </header>

      <main className="container">
        {/* FORM SECTION */}
        <div className="glass-panel">
          <div className="section-title">
            <User size={20} /> Client Details
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Client Name</label>
              <input type="text" name="clientName" value={invoice.clientName} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Client Email</label>
              <input type="email" name="clientEmail" value={invoice.clientEmail} onChange={handleInvoiceChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Client Address</label>
            <textarea name="clientAddress" rows={2} value={invoice.clientAddress} onChange={handleInvoiceChange}></textarea>
          </div>

          <div className="section-title" style={{ marginTop: '2rem' }}>
            <FileText size={20} /> Invoice Details
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Invoice Number</label>
              <input type="text" name="invoiceNumber" value={invoice.invoiceNumber} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>iva</label>
              <input type="number" name="taxRate" value={invoice.taxRate} onChange={handleInvoiceChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={invoice.date} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" name="dueDate" value={invoice.dueDate} onChange={handleInvoiceChange} />
            </div>
          </div>

          <div className="section-title" style={{ marginTop: '2rem' }}>
            Items
          </div>
          {items.map(item => (
            <div key={item.id} className="item-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Descrizione</label>
                <input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Qty</label>
                <input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Prezzo</label>
                <input type="number" min="0" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} />
              </div>
              <button className="btn btn-danger" onClick={() => removeItem(item.id)} title="Remove Item">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button className="btn" onClick={addItem} style={{ marginTop: '1rem' }}>
            <Plus size={20} /> Add Item
          </button>
        </div>

        {/* PREVIEW SECTION */}
        <div className="glass-panel invoice-preview-container" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-title">
            Live Preview
          </div>
          
          <div className="invoice-preview" id="invoice-preview">
            <div className="invoice-header">
              <div className="store-brand">
                <h2 className="brand-name">
                  <span className="brand-silver">MOZUMDER</span>
                  <span className="brand-gold"> PHONE CENTER</span>
                </h2>
                <div className="brand-divider"></div>
                <p className="brand-address">
                  VIALE BRENTA 08, 20139, MILANO.<br/>
                  PIVA: 12655180961<br/>
                  Tel: 0264137265
                </p>
              </div>
              <div className="invoice-meta">
                <div className="invoice-title">INVOICE</div>
                <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
                <p><strong>Date:</strong> {invoice.date}</p>
                <p><strong>Due Date:</strong> {invoice.dueDate}</p>
              </div>
            </div>

            <div className="invoice-grid">
              <div className="bill-box">
                <h3>Bill To</h3>
                <p><strong>{invoice.clientName}</strong></p>
                <p style={{ whiteSpace: 'pre-line' }}>{invoice.clientAddress}</p>
                <p>{invoice.clientEmail}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Descrizione</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Prezzo</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description || 'Item description'}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">€{item.price.toFixed(2)}</td>
                    <td className="text-right">€{(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>iva ({invoice.taxRate}%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="invoice-footer">
              <p>Thank you for choosing MOZUMDER PHONE CENTER.</p>
              <p>Premium Quality • Trusted Service • Expert Support</p>
            </div>
          </div>

          <div className="print-btn-container" style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <button className="btn btn-primary" onClick={handlePrint}>
              <Printer size={20} /> Print / Download PDF
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
