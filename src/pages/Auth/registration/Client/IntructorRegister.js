import React from 'react'

const IntructorRegister = () => {
  return (
    <Card title="Registration">
    <Form form={form} name="horizontal_login" onFinish={onFinish} size='large'>
        <Row gutter={8}>
            <Col span={12}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your User Name!',
                        }

                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter user Name" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={8}>
            <Col span={12}>
                <Form.Item name="country_code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        }
                    ]}>
                    <Select placeholder="Select Country">
                        {countries && countries.map(data => {
                            return <Select.Option value={data.id} key={data.id}>{data.title}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name='website_id'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        }
                    ]}>
                    <Select placeholder="Select Website">
                        {websites && websites.map(data => {
                            return <Select.Option value={data.id} key={data.id}>{data.title}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
        </Row>

        <Form.Item
            name="email"
            rules={[
                {
                    required: true,
                    message: 'Please input your Email!',
                },
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                }
            ]}
        >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type='email' />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                {
                    min: 8,
                    message: "Password Lenght must be morethan 8 character"
                }
            ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Create Password"
            />
        </Form.Item>
        <Form.Item
            name="cpassword"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                    },
                })
            ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
            />
        </Form.Item>
        <Form.Item shouldUpdate>
            {() => (
                <Button
                    className={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length ? null : 'btn-6'}
                    type="primary"
                    htmlType="submit"
                    disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                    block
                >
                    Submit <span className='btn-6-span'></span>
                </Button>
            )}
        </Form.Item>
    </Form>
    <Link to='/auth/login'>Already have an account?</Link>
</Card>
  )
}

export default IntructorRegister