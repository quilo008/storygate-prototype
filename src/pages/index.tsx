import * as React from 'react'
import { css } from '@emotion/core'
import { Link, navigate } from 'gatsby'
import { State } from 'src/state'

import { Background, LoginTitleLine, Heading, Logo } from 'src/components/Auth/top'
import { AuthService } from 'src/services/AuthService'
import { LoginUser } from 'src/services/interfaces/Auth'
import { connect } from 'react-redux'
import { publishLogin } from 'src/state/app'

interface HeaderStates {
  loginUser: LoginUser
}
interface HeaderDispatch {
  login: (logingUser: LoginUser) => void
}

const MailAddress = ({ emailAddress, setEmailAddress }) => {
  return (
    <>
      <div className="text-white text-xs">メールアドレス</div>
      <div className="border-b border-white">
        <input
          type="email"
          placeholder="abc@example.com"
          className="border-none bg-transparent text-white h-8 px-3 w-full rounded-lg text-lg focus:outline-none"
          value={emailAddress}
          onChange={e => setEmailAddress(e.target.value)}
        />
      </div>
    </>
  )
}

const Password = ({ password, setPassword }) => {
  return (
    <>
      <div className="text-white text-xs mt-2">パスワード</div>
      <div className="border-b border-white">
        <input
          type="password"
          placeholder="********"
          className="border-none bg-transparent text-white h-8 px-3 w-full rounded-lg text-lg focus:outline-none"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
    </>
  )
}

const MailLoginButton = ({ emailAddress, password }) => {
  const loginByEmail = () => {
    console.log('emailAddress: ', emailAddress)
  }
  return (
    <button type="button" className="rounded-full text-purple-c1 bg-white py-2 px-10 m-2 w-full" onClick={loginByEmail}>
      ログイン
    </button>
  )
}

const onClickLogin = async (login: (loginUser: LoginUser) => void) => {
  const loginUser = await AuthService.login()
  if (!loginUser) {
    return
  }
  login(loginUser)
  console.log('loginUser', loginUser)
  // TODO:
  // navigate(`/persons/${loginUser.uid}`)
  navigate('/persons/owner')
}

const FacebookLoginButton = ({ login }) => {
  return (
    <button type="button" className="rounded-full text-white bg-blue-800 py-2 px-10 m-2 w-full" onClick={() => onClickLogin(login)}>
      Facebookでログイン
    </button>
  )
}

const IndexPage = ({ login }) => {
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  return (
    <Background>
      <div className="absolute w-full h-full">
        <LoginTitleLine />
        <div className="mt-10 mx-6">
          <Heading>世界初のオンラインコミュニティ</Heading>
          <Heading>特化型ソーシャルメディア</Heading>
          <Logo>StoryGate</Logo>
        </div>
        <div className="mx-6 mt-10">
          <MailAddress emailAddress={emailAddress} setEmailAddress={setEmailAddress} />
          <Password password={password} setPassword={setPassword} />
        </div>
        <div className="flex justify-center flex-col">
          <div className="flex justify-center">
            <MailLoginButton emailAddress={emailAddress} password={password} />
          </div>
          <div className="flex justify-center text-white">または</div>
          <div className="flex justify-center">
            <FacebookLoginButton login={login} />
          </div>
        </div>
        <div className="border-white border-solid border-2 mx-4 mt-4 opacity-50 lg:max-w-3xl lg:mx-auto" />
        <div className="flex justify-center mt-10">
          <span className="text-white">アカウントをお持ちでないですか？</span>
          <Link to="/register" className="text-white underline">
            新規登録
          </Link>
        </div>
      </div>
    </Background>
  )
}

export default connect<HeaderStates, HeaderDispatch, {}, State>(
  state => ({
    loginUser: state.app.loginUser
  }),
  dispatch => ({
    login: (loginUser: LoginUser) => dispatch(publishLogin(loginUser))
  })
)(IndexPage)
