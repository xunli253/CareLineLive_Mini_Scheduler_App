import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import CreateCarerForm from './components/CreateCarerForm';
import CreateClientForm from './components/CreateClientForm';
import ShiftForm from './components/ShiftForm';
import ShiftList from './components/ShiftList';
import { fetchCarers, fetchClients, fetchShifts } from './services/api';
import type { Carer, Client, Shift } from './types';

export default function App() {
  const [carers, setCarers] = useState<Carer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const loadCarers = async () => {
    const res = await fetchCarers();
    setCarers(res.data);
  };

  const loadClients = async () => {
    const res = await fetchClients();
    setClients(res.data);
  };

  const loadShifts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetchShifts(pageNum, limit);
      const result = res.data;
      setShifts(result.data);
      setTotal(result.total);
      setPage(result.page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCarers();
    loadClients();
    loadShifts();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center' }}>CareLineLive Scheduler</h1>

      <Tabs
        defaultActiveKey="shift"
        items={[
          {
            key: 'carer',
            label: 'Create Carer',
            children: <CreateCarerForm onSuccess={loadCarers} />,
          },
          {
            key: 'client',
            label: 'Create Client',
            children: <CreateClientForm onSuccess={loadClients} />,
          },
          {
            key: 'shift',
            label: 'Create Shift',
            children: (
              <ShiftForm
                carers={carers}
                clients={clients}
                onSuccess={() => loadShifts(page)}
              />
            ),
          },
        ]}
      />

      <div style={{ marginTop: 40 }}>
        <ShiftList
          data={shifts}
          page={page}
          total={total}
          limit={limit}
          loading={loading}
          onPageChange={loadShifts}
        />
      </div>
    </div>
  );
}
