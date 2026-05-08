"use client";

import { useState } from 'react';
import { Plus, Trash2, Printer, FileText, User, Hash, Calendar, Eye, Zap } from 'lucide-react';

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
    { id: 2, description: "Data Recovery", quantity: 1, price: 80 },
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
    <div className="app-wrapper">

      {/* ── Top Navbar ── */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">
            <Zap size={18} />
          </div>
          <div className="header-brand-text">
            <span className="header-brand-name">MOZUMDER PHONE CENTER</span>
            <span className="header-brand-sub">Invoice Generator</span>
          </div>
        </div>
        <div className="header-badge">
          <span className="header-badge-dot" />
          Live Preview
        </div>
      </header>

      {/* ── Two-column Layout ── */}
      <main className="container">

        {/* ════ LEFT: FORM PANEL ════ */}
        <div className="glass-panel">

          {/* Client Details */}
          <div className="section-title">
            <User size={14} /> Client Details
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Client Name</label>
              <input
                type="text"
                name="clientName"
                value={invoice.clientName}
                onChange={handleInvoiceChange}
                placeholder="Full name"
              />
            </div>
            <div className="form-group">
              <label>Client Email</label>
              <input
                type="email"
                name="clientEmail"
                value={invoice.clientEmail}
                onChange={handleInvoiceChange}
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Client Address</label>
            <textarea
              name="clientAddress"
              rows={2}
              value={invoice.clientAddress}
              onChange={handleInvoiceChange}
              placeholder="Street, City, ZIP"
            />
          </div>

          <div className="section-divider" />

          {/* Invoice Details */}
          <div className="section-title">
            <FileText size={14} /> Invoice Details
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleInvoiceChange}
                placeholder="INV-2026-001"
              />
            </div>
            <div className="form-group">
              <label>IVA (%)</label>
              <input
                type="number"
                name="taxRate"
                value={invoice.taxRate}
                onChange={handleInvoiceChange}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={invoice.date}
                onChange={handleInvoiceChange}
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={invoice.dueDate}
                onChange={handleInvoiceChange}
              />
            </div>
          </div>

          <div className="section-divider" />

          {/* Line Items */}
          <div className="section-title">
            <Hash size={14} /> Line Items
          </div>

          <div className="items-list">
            {items.map(item => (
              <div key={item.id} className="item-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Descrizione</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Service or product..."
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Prezzo (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <button className="btn btn-danger" onClick={() => removeItem(item.id)} title="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button className="btn btn-add" onClick={addItem}>
            <Plus size={16} /> Add Item
          </button>

          {/* Totals Summary Preview */}
          <div className="totals-preview">
            <div className="totals-preview-row">
              <span>Subtotale</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="totals-preview-row">
              <span>IVA ({invoice.taxRate}%)</span>
              <span>€{tax.toFixed(2)}</span>
            </div>
            <div className="totals-preview-row grand">
              <span>Totale</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ════ RIGHT: INVOICE PREVIEW PANEL ════ */}
        <div className="glass-panel invoice-preview-container">

          <div className="preview-label">
            <Eye size={14} /> Live Invoice Preview
          </div>

          {/* White Invoice Document */}
          <div className="invoice-preview" id="invoice-preview">

            {/* Dark Banner Header */}
            <div className="invoice-banner">
              <div className="store-brand">
                <h2 className="brand-name">
                  <span className="brand-silver">MOZUMDER</span>
                  <span className="brand-gold"> PHONE CENTER</span>
                </h2>
                <div className="brand-divider" />
                <p className="brand-address">
                  VIALE BRENTA 08, 20139, MILANO<br />
                  PIVA: 12655180961 &nbsp;·&nbsp; Tel: 0264137265
                </p>
              </div>

              <div className="invoice-id-block">
                <div className="invoice-title">
                  <span>INVOICE</span>
                </div>
                <div className="invoice-meta-row">
                  <span>N°</span>
                  <strong>{invoice.invoiceNumber}</strong>
                </div>
                <div className="invoice-meta-row">
                  <Calendar size={11} />
                  <strong>{invoice.date}</strong>
                </div>
                <div className="invoice-meta-row">
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Scadenza</span>
                  <strong>{invoice.dueDate}</strong>
                </div>
              </div>
            </div>

            {/* Invoice Body */}
            <div className="invoice-body">

              {/* Bill To Section */}
              <div className="invoice-bill-section">
                <div>
                  <div className="bill-label">Fatturato a</div>
                  <div className="bill-name">{invoice.clientName || '—'}</div>
                  <div className="bill-detail" style={{ whiteSpace: 'pre-line' }}>
                    {invoice.clientAddress}
                  </div>
                  {invoice.clientEmail && (
                    <div className="bill-detail">{invoice.clientEmail}</div>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <table>
                <thead>
                  <tr>
                    <th>Descrizione</th>
                    <th className="text-right">Qtà</th>
                    <th className="text-right">Prezzo</th>
                    <th className="text-right">Totale</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.description || 'Descrizione articolo'}</td>
                      <td className="text-right">{item.quantity}</td>
                      <td className="text-right td-amount">€{item.price.toFixed(2)}</td>
                      <td className="text-right td-amount">€{(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="summary-box">
                <div className="summary-row">
                  <span>Subtotale</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>IVA ({invoice.taxRate}%)</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Totale</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="invoice-footer">
                <div className="invoice-footer-left">
                  <div>Grazie per aver scelto MOZUMDER PHONE CENTER.</div>
                  <div style={{ marginTop: '0.25rem', fontSize: '0.68rem', color: '#94a3b8' }}>
                    Per domande: Tel 0264137265 · VIALE BRENTA 08, 20139, MILANO
                  </div>
                </div>
                <div className="invoice-footer-right">
                  <div>Generato da</div>
                  <div className="footer-tagline">MOZUMDER BILLING</div>
                </div>
              </div>

              {/* Firma e Timbro — bottom right with space for signature/seal */}
              <div className="firma-section">
                <div className="firma-box">
                  <div className="firma-spacer" />
                  <div className="firma-line" />
                  <div className="firma-label">FIRMA E TIMBRO</div>
                </div>
              </div>

            </div>{/* /invoice-body */}
          </div>{/* /invoice-preview */}

          {/* Print Button */}
          <div className="print-btn-container">
            <button className="btn btn-primary" onClick={handlePrint} id="print-btn">
              <Printer size={18} /> Stampa / Scarica PDF
            </button>
          </div>

        </div>{/* /right panel */}
      </main>
    </div>
  );
}
