import { Table } from 'antd';
import type { Shift } from '../types';

export default function ShiftList({
    data,
    page,
    total,
    limit,
    loading,
    onPageChange,
}: {
    data: Shift[];
    page: number;
    total: number;
    limit: number;
    loading: boolean;
    onPageChange: (newPage: number) => void;
}) {
    const columns = [
        {
            title: 'Carer',
            dataIndex: ['carer', 'name'],
            key: 'carer',
        },
        {
            title: 'Client',
            dataIndex: ['client', 'name'],
            key: 'client',
        },
        {
            title: 'Start',
            dataIndex: 'startTime',
            render: (v: string) => new Date(v).toLocaleString(),
        },
        {
            title: 'End',
            dataIndex: 'endTime',
            render: (v: string) => new Date(v).toLocaleString(),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={{
                current: page,
                pageSize: limit,
                total,
                onChange: (newPage) => onPageChange(newPage),
            }}
            bordered
        />
    );
}
