import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { renderIf } from '../utils/commonUtils'
import { Layout, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

const SubMenu = Menu.SubMenu
const { Header } = Layout

class PageHeader extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectedKeys: []
    }
  }

  correctSelectedMenu = () => {
    const path = this.props.location.pathname
    if (path === '/') {
      this.setState({ selectedKeys: ['/'] })
    } else {
      try {
        this.setState({ selectedKeys: ['/' + path.split('/')[1]] })
      } catch (e) {
        console.error(e)
      }
    }
  }

  componentDidMount = () => {
    this.correctSelectedMenu()
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const prePath = prevProps.location.pathname
    const path = this.props.location.pathname
    if (prePath !== path) {
      this.correctSelectedMenu()
    }
  }

  onLogout = () => {
    axios.post('/api/auth/logout')
      .then(res => {
        window.location.href = '/'
      })
  }

  render () {
    const user = this.props.user.get('user')
    const username = this.props.user.getIn(['user', 'username'], '')

    return (
      <Header>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" selectedKeys={this.state.selectedKeys}
              style={{ lineHeight: '64px' }}>
          <Menu.Item key="/">
            <Link to={'/'}>Home</Link>
          </Menu.Item>
          {
            renderIf(user)(
              <SubMenu
                style={{ float: 'right' }}
                title={(
                  <span>
                      <span>Welcome, {username}&nbsp;</span>
                      <CaretDownOutlined/>
                    </span>
                )}
              >
                <Menu.Item key="/logout" onClick={this.onLogout}>
                  Logout
                </Menu.Item>
              </SubMenu>
            )
          }
          {
            renderIf(!user)(
              <Menu.Item key="/login" style={{ float: 'right' }}>
                <Link to={'/login'}>Login</Link>
              </Menu.Item>
            )
          }
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default withRouter(connect(mapStateToProps)(PageHeader))
