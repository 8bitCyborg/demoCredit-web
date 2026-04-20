import React from 'react';
import { useGetLoanApplicationsQuery } from '../services/loan';
import {
  Calendar,
  Clock,
  Banknote,
  ShieldAlert,
  Loader2,
} from 'lucide-react';
import './LoanApplications.css';

const LoanApplications: React.FC = () => {
  const { data: applications, isLoading, error } = useGetLoanApplicationsQuery();

  if (isLoading) {
    return (
      <div className="loading-state">
        <Loader2 className="spinner" size={32} />
      </div>
    );
  }

  if (error) {
    return <div className="error-msg">Failed to load applications.</div>;
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="loan-apps-container">
        <h2 className="loan-apps-title">Your Applications</h2>
        <div className="empty-state">
          <p>No loan applications found. Start by applying for one above.</p>
        </div>
      </div>
    );
  }

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className="loan-apps-container">
      <h2 className="loan-apps-title">Your Applications</h2>

      <div className="loan-list">
        {applications.map((app) => (
          <div key={app.id} className="loan-item">
            <div className="loan-item-header">
              <div className="loan-main-info">
                <span className="loan-amount">₦{parseFloat(app.amount).toLocaleString()}</span>
                <span className="loan-date">
                  <Calendar size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {new Date(app.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <span className={`status-badge ${getStatusClass(app.status)}`}>
                {app.status}
              </span>
            </div>

            <div className="loan-details-grid">
              <div className="detail-col">
                <span className="detail-label">Duration</span>
                <div className="detail-value">
                  <Clock size={16} />
                  <span>{app.installments} Months</span>
                </div>
              </div>
              <div className="detail-col">
                <span className="detail-label">Monthly Repayment</span>
                <div className="detail-value">
                  <Banknote size={16} />
                  <span>₦{parseFloat(app.amountPerInstallment || 0).toLocaleString()}</span>
                </div>
              </div>
              <div className="detail-col">
                <span className="detail-label">Interest</span>
                <div className="detail-value">
                  <span>{app.interest_rate}%</span>
                </div>
              </div>
            </div>

            {(app.reason || app.risk_score) && (
              <div className="ai-evaluation">
                <div className="ai-header">
                  <ShieldAlert size={16} color="#2563eb" />
                  <span>Risk Assessment Score</span>
                  <div className="risk-tag">
                    {app.risk_score}/100
                  </div>
                </div>
                <p className="ai-reasoning">{app.reason}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanApplications;