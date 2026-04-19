import React, { useState, useRef } from 'react';
import { Upload, FileCheck, CircleAlert, Loader2 } from 'lucide-react';
import { useApplyForLoanMutation } from '../services/loan';
import LoanApplications from '../components/LoanApplications';
import './Loans.css';

const Loans: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [installments, setInstallments] = useState<number>(3);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [applyForLoan, { isLoading: isSubmitting }] = useApplyForLoanMutation();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      simulateUpload(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      simulateUpload(selectedFile);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF document');
      return false;
    }

    if (file.size > maxSize) {
      alert('File size exceeds 5MB');
      return false;
    }

    return true;
  };

  const simulateUpload = (file: File) => {
    setFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Optimistic UI simulation for the UX of selecting a file
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        setUploadProgress(100);
        setIsUploading(false);
        clearInterval(interval);
      } else {
        setUploadProgress(progress);
      }
    }, 300);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove everything except numbers and decimal point
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');

    // Format with commas
    if (rawValue === '') {
      setAmount('');
      return;
    }

    const parts = rawValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setAmount(parts.join('.'));
  };

  const isFormValid = amount !== '' && parseFloat(amount.replace(/,/g, '')) > 0 && file !== null && !isUploading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    const principal = parseFloat(amount.replace(/,/g, ''));
    const amountPerInstallment = Math.round((principal * 1.05) / installments);

    const formData = new FormData();
    formData.append('amount', principal.toString());
    formData.append('installments', installments.toString());
    formData.append('amountPerInstallment', amountPerInstallment.toString());
    formData.append('bankStatement', file!);

    try {
      await applyForLoan(formData).unwrap();
      alert('Loan application submitted successfully!');

      // Reset form
      setAmount('');
      setInstallments(3);
      setFile(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      alert(err.data?.message || 'Failed to submit loan application. Please try again.');
    }
  };

  return (
    <div className="loans-container">
      <header className="loans-header">
        <h1 className="loans-title">Personalized Credit Solutions</h1>
        <p className="loans-subtitle">You're eligible to apply for a bridge loan up to ₦10,000,000</p>
      </header>

      <div className="loan-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Requested Amount</label>
            <div className="input-wrapper">
              <span className="currency-symbol">₦</span>
              <input
                type="text"
                className="requested-amount-input"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="label">Repayment Duration (Months)</label>
            <select
              className="requested-amount-input"
              style={{ paddingLeft: '1rem' }}
              value={installments}
              onChange={(e) => setInstallments(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 9, 12, 18, 24].map(n => (
                <option key={n} value={n}>{n} Month{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {parseFloat(amount.replace(/,/g, '')) > 0 && (
            <div className="repayment-preview">
              <div className="repayment-header">
                <span className="repayment-total-label">Total Repayment (5% Interest)</span>
                <span className="repayment-total-value">
                  ₦{((parseFloat(amount.replace(/,/g, '')) * 1.05)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="installments-list">
                {Array.from({ length: Math.min(installments, 6) }).map((_, i) => (
                  <div key={i} className="installment-item">
                    <span className="installment-number">Month {i + 1}</span>
                    <span className="installment-amount">
                      ₦{((parseFloat(amount.replace(/,/g, '')) * 1.05) / installments).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
                {installments > 6 && (
                  <div className="installment-item" style={{ justifyContent: 'center', opacity: 0.6 }}>
                    <span>... {installments - 6} more installments ...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="label">Bank Statement</label>
            <div
              className={`dropzone ${isDragActive ? 'active' : ''}`}
              onDragEnter={handleDragEnter}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="application/pdf"
                style={{ display: 'none' }}
              />

              <div className="dropzone-icon">
                {file && !isUploading ? (
                  <FileCheck size={48} className="icon-success" />
                ) : (
                  <Upload size={48} />
                )}
              </div>

              <div className="dropzone-text">
                {file ? (
                  <p><b>{file.name}</b> selected</p>
                ) : (
                  <p><b>Click to upload</b> or drag and drop<br />PDF only (max 5MB)</p>
                )}
              </div>
            </div>

            <div className="validation-note">
              <CircleAlert size={18} />
              <span>Statement must be from at least one month ago to verify current income.</span>
            </div>

            {(isUploading || file) && (
              <div className="upload-progress">
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="file-info">
                  <span>{isUploading ? 'Uploading...' : 'Ready to submit'}</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid}
          >
            {isUploading ? (
              <span className="btn-content-loading">
                <Loader2 className="spinner" size={20} />
                Processing...
              </span>
            ) : (
              'Apply for Loan'
            )}
          </button>
        </form>
      </div>

      <LoanApplications />

      {isSubmitting && (
        <div className="fullscreen-overlay">
          <div className="overlay-content">
            <Loader2 className="spinner" size={48} />
            <p>Processing Application...</p>
            <span>Our AI is analyzing your bank statement to ensure the best terms.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;