import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './admin.css';

interface EnrollmentItem {
  id: string;
  player_name: string;
  parent_name?: string | null;
  age_group?: string | null;
  phone: string;
  email?: string | null;
  message?: string | null;
  created_at?: string;
}

const Enrollments = () => {
  const token = Cookies.get('adminToken');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [items, setItems] = useState<EnrollmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEnrollments = useCallback(async () => {
    if (!token) {
      setError('You must be logged in to view submissions.');
      setLoading(false);
      return;
    }

    if (!API_URL) {
      setError('API URL is not configured.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.get<EnrollmentItem[]>(`${API_URL}/enrollments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Failed to load enrollments.');
      } else {
        setError('Failed to load enrollments.');
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL, token]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return (
    <div className="container">
      <div className="list-container">
        <div className="list-header">
          <h2>Enrollment Submissions</h2>
          <button type="button" className="secondary-btn" onClick={fetchEnrollments}>
            Refresh
          </button>
        </div>

        {error ? <div className="error-message">{error}</div> : null}
        {loading ? <p>Loading submissions...</p> : null}

        {!loading && !error && items.length === 0 ? (
          <div className="info-message">No enrollment submissions yet.</div>
        ) : null}

        {!loading && items.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f7f7f7' }}>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Player</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Parent</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Age Group</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Phone</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Message</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.player_name}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.parent_name || '-'}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.age_group || '-'}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.phone}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.email || '-'}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', maxWidth: '260px' }}>{item.message || '-'}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Enrollments;
