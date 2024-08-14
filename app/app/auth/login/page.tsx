'use client';

import { Input } from "../../components/shadecn_components/ui/input";
import { classes } from "../../../lib/std";
import { Button } from "../../components/shadecn_components/ui/button";
import { ChangeEventHandler, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import TransparentLogo from "../../components/svg/transparent_logo";
import TransparentLogoDark from "../../components/svg/transparent_logo_dark";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { pt_login } from "../../../types/pt_api";

export default function Login () {

    const [email, set_email] = useState<string>();
    const [password, set_password] = useState<string>();
    const [error, set_error] = useState<string>('');

    const [dark_mode, set_dark_mode] = useState<boolean>(true);
    // TODO: Base dark mode off user state value

    const handleSignIn = async (cred: pt_login, error: string) => {

        if ((cred.email?.length > 0) && (cred.password?.length > 0) && (error.length === 0)) {

            try {

                await signIn('credentials', cred);

                // console.log(res)
                //
                // if (res.ok) {
                //
                //     redirect('/dashboard');
                //
                // } else {
                //
                //     console.log(res.error)
                //
                //     // set_error('Error logging in.')
                //
                // }



            } catch (err) {

                console.log(err);
                set_error('Test')

            }

        }

    }

    const handleInputChange: ChangeEventHandler = async (e) => {

        const input = e.target as HTMLInputElement;
        const id = input.id

        if (input.value && id === 'password') {

            set_password(input.value);

        }

        if (input.value && id === 'email') {

            set_email(input.value);

        }


    }

    return (
        <div className={classes([dark_mode ? 'dark' : ''])}>
            <div className={classes(['flex flex-col justify-self-center bg-white dark:bg-black min-h-screen'])}>
                <div className={classes(['flex flex-column md:flex-row md:justify-center mb-5 md:mb-32 lg:mb-40'])}>
                    {
                        dark_mode ? <TransparentLogo/> : <TransparentLogoDark/>
                    }
                </div>
                <div className={classes(['grid justify-items-center'])}>
                    <div className={classes(['text-black dark:text-white self-end text-2xl mb-5 font-thin'])}>
                        Log in
                    </div>
                    {error ?
                        (<div className={classes(['text-red-500'])}>{error}</div>)
                        : ''}
                    <div className={classes['flex flex-row']}>
                        <Input
                            type={'text'} //TODO: Change this once we switch to actual email login
                            placeholder={'Enter your email'}
                            id={'email'}
                            className={classes(['mb-4 text-black dark:text-white email'])}
                            onChange={handleInputChange}
                            name={'email'}
                        />
                        <Input
                            type={'password'}
                            placeholder={'Enter your password'}
                            id={'password'}
                            className={classes(['mb-4 text-black dark:text-white'])}
                            onChange={handleInputChange}
                            name={'password'}
                        />
                        <Button
                            onClick={() => handleSignIn({
                                email: email,
                                password: password,
                                type: 'login',
                                // redirect: false
                            },
                                error
                            )}
                            className={classes(['w-64 bg-black dark:bg-white text-white dark:text-black'])}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
                <div className={classes(['flex flex-row justify-center align-middle h-10 m-5'])}>
                    <div className={classes(['h-0.5 w-40 self-center bg-black dark:bg-white'])}/>
                    <div className={classes(['flex self-center text-black dark:text-white m-4'])}>
                        OR
                    </div>
                    <div className={classes(['h-0.5 w-40 self-center bg-black dark:bg-white'])}/>
                </div>
                <div className={classes(['grid justify-items-center h-52'])}>
                    <Button
                        onClick={() => signIn('google', {
                            callbackUrl: "/account/settings"
                        })}
                        className={classes(['w-64 bg-black dark:bg-white text-white dark:text-black'])}
                    >
                        <FontAwesomeIcon icon={faGoogle} className={classes(['mr-4'])}/> Sign in with Google
                    </Button>
                    {/*<Button className={classes(['w-64 bg-black dark:bg-white text-white dark:text-black'])}>*/}
                    {/*    <FontAwesomeIcon icon={faFacebook} className={classes(['mr-4'])}/> Sign in with Facebook*/}
                    {/*</Button>*/}
                    {/*<Button className={classes(['w-64 bg-black dark:bg-white text-white dark:text-black'])}>*/}
                    {/*    <FontAwesomeIcon icon={faApple} className={classes(['mr-4'])}/> Sign in with Apple*/}
                    {/*</Button>*/}
                    <div className={classes(['w-full text-black dark:text-white text-center self-end mb-4'])}>
                        Don't have an account?
                        <Link
                            href={'/auth/signup'}
                            className={classes(['text-green-600'])}
                        >Create
                        one</Link>
                    </div>
                </div>
                <button className={'text-white dark:text-black'} onClick={() => set_dark_mode(!dark_mode)}>.
                {/*    TODO: Remove this button once dark mode gets moved to state */}
                </button>
            </div>
        </div>
    );

}