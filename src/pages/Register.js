import React, { PureComponent } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

class Register extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      redirectToLogin: false
    }
  }

  handleSubmit = (values) => {
    axios.post('/api/auth/register', {
      username: values.username,
      email: values.email,
      password: values.password
    })
      .then(res => {
        message.success('Sign up success.')
        this.setState({ redirectToLogin: true })
      })
      .catch(err => {
        if (err.response.status === 406) {
          message.error('Sign up failed: user already exist.')
        } else {
          message.error('Sign up failed')
        }
      })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  validateToNextPassword = ({ getFieldValue }) => ({
    validator (rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject('The two passwords that you entered do not match!')
    }
  })

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  render () {
    if (this.state.redirectToLogin) {
      return <Redirect to={'/login'}/>
    }

    return (
      <Form
        onFinish={this.handleSubmit}
        onFinishFailed={this.onFinishFailed}
        className="login-form"
        layout={'vertical'}
      >
        <h1>Sign up</h1>
        <Form.Item
          name={'username'}
          label="Username"
          rules={[
            { required: true, message: 'Please input your username!' }
          ]}
        >
          <Input
            prefix={<UserOutlined/>}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name={'email'}
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' }
          ]}
        >
          <Input
            prefix={<MailOutlined/>}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name={'password'}
          rules={[
            { required: true, message: 'Please input your Password!' }
          ]}
        >
          <Input
            prefix={<LockOutlined/>}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name={'confirm'}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            this.validateToNextPassword
          ]}
        >
          <Input
            prefix={<LockOutlined/>}
            type="password"
            placeholder="Confirm password"
            onBlur={this.handleConfirmBlur}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign up!
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Register
