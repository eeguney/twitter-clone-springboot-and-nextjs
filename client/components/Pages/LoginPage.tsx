import { useRouter } from 'next/router'
import React from 'react'
import { useCookies } from 'react-cookie'
import { login } from '../api'

type Props = {}

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement,
    password: HTMLInputElement
}

interface LoginFormELement extends HTMLFormElement {
   readonly elements: FormElements
}

const LoginPage = (props: Props) => {


    const [cookie, setCookie] = useCookies(["user"])

    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<LoginFormELement>) => {
        event.preventDefault();
        const eventForm = event.currentTarget.elements;
        let form = new FormData();
        form.append("username",eventForm.username.value);
        form.append("password", eventForm.password.value)

        const response = await login(form);

        setCookie("user", response.data.access_token, {
            path: "/",
            maxAge: 345600, // Expires after 2 days
            sameSite: true,
          })

        router.push({ pathname: '/'})
    }

  return (
    <div>
    <form onSubmit={handleLogin}>
        <div>
            <label  htmlFor="username">Username:</label>
            <input id="username" type="text" name="username" required />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" required />
        </div>
        <div>
            <input type="submit" value="SEND" />
        </div>
    </form>
</div>
  )
}

export default LoginPage