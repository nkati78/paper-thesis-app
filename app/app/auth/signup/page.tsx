'use client';

import { Input } from "@/shadcn/input";
import { classes } from "../../../lib/std";
import { Button } from "@/shadcn/button";
import { ChangeEventHandler, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import TransparentLogo from "../../components/svg/transparent_logo";
import TransparentLogoDark from "../../components/svg/transparent_logo_dark";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Label } from "@/shadcn/label";
import { ptRegister } from "../../../types/pt_types";

//TODO: Add logic to check and make sure the username isn't taken when the user tries to create the account. This may not matter if we don't prompt for username on sign up in the future.
// TODO: Refactor

export default function Login () {

    const [ darkMode, setDarkMode ] = useState<boolean>(true);
    const [ error, setError ] = useState<string>();
    const [ createInfo, setCreateInfo ] = useState<ptRegister>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        type: 'register'
    });

    const handleSignIn = async (acc: ptRegister, error: string) => {

        if ((acc.username!.length > 0) && (acc.email!.length > 0) && (acc.firstName!.length > 0) && (acc.lastName!.length > 0) && (acc.password!.length > 0) && (error.length === 0)) {

            setError('');

            try {

                const signUp = await signIn('credentials', {
                    email: acc.email ,
                    password: acc.password ,
                    username: acc.username,
                    firstName: acc.firstName ,
                    lastName: acc.lastName,
                    type: 'register',
                    redirect: false
                });

                if (signUp?.error) {

                    setError('Account with that email already exists!');

                } else if (signUp?.ok) {

                    window.location.href = "/dashboard";

                }

            } catch (err) {

                setError(err);

            }

        } else {

            setError('One or more fields is incomplete.');

        }

    };

    const handleInputChange: ChangeEventHandler = async (e) => {

        const input = e.target as HTMLInputElement;
        const id = input.id;
        const new_state = { ...createInfo };

        if (input.value && id === 'password') {

            if (input.value.length < 8) {

                setError('Password too short. Must be 8 characters minimum.');

            } else {

                if (error) {

                    setError('');

                }

                new_state.password = input.value;

            }

        }

        if (input.value && id === 'email') {

            if (!input.value.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")) {

                setError('Please enter a valid email address.');

                new_state.password = input.value;

            } else {

                if (error) {

                    setError('');

                }

                new_state.email = input.value;

            }

        }

        if (input.value && id === 'username') {

            new_state.username = input.value;

        }

        if (input.value && id === 'firstName') {

            new_state.firstName = input.value;

        }

        if (input.value && id === 'lastName') {

            new_state.lastName = input.value;

        }

        setCreateInfo(new_state);

    };

    return (
        <div className={classes([darkMode ? 'dark' : ''])}>
            <div className={classes(['flex flex-col justify-self-center bg-white dark:bg-black min-h-screen'])}>
                <div className={classes(['flex flex-column justify-center md:mb-32 lg:mb-40'])}>
                    {
                        darkMode ? <TransparentLogo/> : <TransparentLogoDark/>
                    }
                </div>
                <div className={classes(['flex flex-col max-w-md self-center w-full'])}>
                    <div className={classes(['text-black dark:text-white text-2xl mb-5 font-thin'])}>
                        Create an Account
                    </div>
                    {error ?
                        (<div className={classes(['text-red-500'])}>{error}</div>)
                        : ''}
                    <div className={classes([''])}>
                        <Label>Username</Label>
                        <Input
                            type={'text'}
                            placeholder={createInfo.username}
                            id={'username'}
                            onChange={handleInputChange}
                            className={classes(['mb-4 text-black dark:text-white placeholder:italic text-base sm:text-lg'])}
                        />
                    </div>
                    <div>
                        <Label>Email Address</Label>
                        <Input
                            type={'email'}
                            placeholder={createInfo.email}
                            onChange={handleInputChange}
                            id={'email'}
                            className={classes(['mb-4 text-black dark:text-white placeholder:italic text-base sm:text-lg'])}
                        />
                    </div>
                    <div className={classes([''])}>
                        <Label>First Name</Label>
                        <Input
                            type={'text'}
                            placeholder={createInfo.firstName}
                            onChange={handleInputChange}
                            id={'firstName'}
                            className={classes(['mb-4 text-black dark:text-white placeholder:italic text-base sm:text-lg'])}
                        />
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <Input
                            type={'text'}
                            placeholder={createInfo.lastName}
                            onChange={handleInputChange}
                            id={'lastName'}
                            className={classes(['mb-4 text-black dark:text-white placeholder:italic text-base sm:text-lg'])}
                        />
                    </div>
                    <div className={classes([''])}>
                        <Label>Password</Label>
                        <Input
                            type={'password'}
                            placeholder={''}
                            onChange={handleInputChange}
                            id={'password'}
                            className={classes(['mb-4 text-black dark:text-white placeholder:italic text-base sm:text-lg'])}
                        />
                    </div>
                    <div className={classes(['flex justify-center'])}>
                        <Button
                            className={classes(['w-full bg-black dark:bg-white text-white dark:text-black'])}
                            onClick={() => handleSignIn(createInfo, error ? error : '')}
                        >
                            Create
                        </Button>
                    </div>
                </div>
                <div className={classes(['flex flex-row justify-center align-middle h-10 m-5'])}>
                    <div className={classes(['h-0.5 w-40 self-center bg-black dark:bg-white'])}/>
                    <div className={classes(['flex self-center text-black dark:text-white m-4'])}>OR</div>
                    <div className={classes(['h-0.5 w-40 self-center bg-black dark:bg-white'])}/>
                </div>
                <div className={classes(['grid justify-items-center max-w-md self-center w-full'])}>
                    <Button
                        onClick={() => signIn('google', {
                            redirectTo: "/account"
                        })}
                        className={classes(['w-96 bg-black dark:bg-white text-white dark:text-black mb-5 w-full'])}
                    >
                        <FontAwesomeIcon icon={faGoogle} className={classes(['mr-4'])}/> Sign up with Google
                    </Button>
                    {/*<Button className={classes(['w-64 bg-black dark:bg-white text-white dark:text-black'])}>*/}
                    {/*    <FontAwesomeIcon icon={faFacebook} className={classes(['mr-4'])}/> Sign up with Facebook*/}
                    {/*</Button>*/}
                    {/*<Button className={classes(['w-64 bg-black dark:bg-white text-white dark:text-black'])}>*/}
                    {/*    <FontAwesomeIcon icon={faApple} className={classes(['mr-4'])}/> Sign up with Apple*/}
                    {/*</Button>*/}
                    <div className={classes(['w-full text-black dark:text-white text-center self-end mb-4'])}>
                        Already have an account?
                        <Link
                            href={'/auth/login'}
                            className={classes(['text-green-600 ml-1'])}
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}