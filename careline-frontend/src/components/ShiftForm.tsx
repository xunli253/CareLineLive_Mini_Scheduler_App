import { Form, Select, DatePicker, Button, message } from 'antd';
import { createShift } from '../services/api';
import type { Carer, Client } from '../types';
import { handleFormError } from '../utils/formErrorHandler';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function ShiftForm({
    carers,
    clients,
    onSuccess,
}: {
    carers: Carer[];
    clients: Client[];
    onSuccess?: () => void;
}) {

    const [form] = Form.useForm();


    const onFinish = async (values: any) => {
        const [start, end] = values.timeRange;
        try {
            await createShift({
                carerId: values.carerId,
                clientId: values.clientId,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
            });
            message.success('Shift created successfully!');
            form.resetFields();
            if (onSuccess) onSuccess();
        } catch (err: any) {
            handleFormError(err, form, "timeRange");
            console.log(err);
        }
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}
        >
            <h2 style={{ marginBottom: 20 }}>Create Shift</h2>

            <Form.Item label="Carer" name="carerId" rules={[{ required: true, message: 'Please enter carer name' }]}>
                <Select placeholder="Select a carer">
                    {carers.map(c => (
                        <Option key={c.id} value={c.id}>{c.name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Client" name="clientId" rules={[{ required: true, message: 'Please enter client name' }]}>
                <Select placeholder="Select a client">
                    {clients.map(c => (
                        <Option key={c.id} value={c.id}>{c.name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Shift Time Range" name="timeRange" rules={[{ required: true }]}>
                <RangePicker
                    showTime={{
                        format: 'HH:mm',
                        minuteStep: 10,
                    }}
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={(current) => {
                        // 禁用今天之前的日期
                        return current && current < dayjs().startOf('day');
                    }}
                    disabledTime={(current) => {
                        if (!current) return {};

                        const now = dayjs();
                        const isToday = current.isSame(now, 'day');

                        const disabledHours = () => {
                            if (!isToday) return []; // 如果不是今天，允许 0–23 小时

                            // 禁用当前时间前的小时（今天）
                            return Array.from({ length: now.hour() }, (_, i) => i);
                        };

                        const disabledMinutes = (selectedHour: number) => {
                            const minutes: number[] = [];

                            // 分钟仅支持 10 分钟间隔
                            for (let i = 0; i < 60; i++) {
                                if (i % 10 !== 0) minutes.push(i);
                            }

                            if (isToday && selectedHour === now.hour()) {
                                // 禁用当前小时内已经过去的 10 分钟块
                                for (let i = 0; i < now.minute(); i += 1) {
                                    if (!minutes.includes(i)) minutes.push(i);
                                }
                            }

                            return minutes;
                        };

                        return {
                            disabledHours,
                            disabledMinutes,
                        };
                    }}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Create Shift</Button>
            </Form.Item>
        </Form>
    );
}