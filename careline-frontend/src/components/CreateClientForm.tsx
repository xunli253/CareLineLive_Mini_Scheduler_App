import { Form, Input, Button, message } from 'antd';
import { createClient } from '../services/api';
import { handleFormError } from '../utils/formErrorHandler';

export default function CreateClientForm({ onSuccess }: { onSuccess?: () => void }) {
    const [form] = Form.useForm();

    const onFinish = async (values: { name: string }) => {
        try {
            await createClient(values)
            message.success('Client created');
            form.resetFields();
            onSuccess?.();
        } catch (err: any) {
            handleFormError(err, form);
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="Client Name" name="name" rules={[{ required: true, message: 'Please enter client name' }]}>
                <Input placeholder="Enter client name" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Client</Button>
            </Form.Item>
        </Form>
    );
}