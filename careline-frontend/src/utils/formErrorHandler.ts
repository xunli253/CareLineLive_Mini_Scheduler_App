import { type FormInstance, message } from 'antd';

export function handleFormError(
    error: any,
    form: FormInstance,
    fieldName: string = 'name',
    showGlobalMessage = true
) {
    const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong, please try again.';


    form.setFields([
        {
            name: fieldName,
            errors: [msg],
        },
    ]);


    if (showGlobalMessage) {
        message.error(msg);
    }
}