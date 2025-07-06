import { Form, Input, Button, message } from 'antd';
import { createCarers } from '../services/api';
import { handleFormError } from '../utils/formErrorHandler';

export default function CreateCarerForm({ onSuccess }: { onSuccess?: () => void }) {
    const [form] = Form.useForm();

    const onFinish = async (values: { name: string }) => {
        try {
            await createCarers(values);
            message.success('Carer created');
            form.resetFields();
            onSuccess?.();
        } catch (err: any) {
            handleFormError(err, form);
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="Carer Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Enter carer name" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Carer</Button>
            </Form.Item>
        </Form>
    );
}