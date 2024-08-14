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
import { Label } from "../../components/shadecn_components/ui/label";
import { pt_register } from "../../../types/pt_api";

export default function Login () {

    // TODO: Base dark mode off user state value

    const [dark_mode, set_dark_mode] = useState<boolean>(true);
    const [error, set_error] = useState<string>();
    const [create_info, set_create_info] = useState<pt_register>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        type: 'register'
    });

    const handleSignIn = async (acc: pt_register, error: string) => {

        if ((acc.username?.length > 0) && (acc.email?.length > 0) && (acc.firstName?.length > 0) && (acc.lastName?.length > 0) && (acc.password?.length > 0) && (error.length === 0)) {

            set_error('');

            try {

                await signIn('credentials', acc);

            } catch (err) {

                set_error(err);

            }

        } else {

            set_error('One or more fields is incomplete.');

        }

    }

    const handleInputChange: ChangeEventHandler = async (e) => {

        const input = e.target as HTMLInputElement;
        const id = input.id;
        const new_state = {...create_info};

        if (input.value && id === 'password') {

            if (input.value.length < 8) {

                set_error('Password too short. Must be 8 characters minimum.');

            } else {

                if (error) {

                    set_error('');

                }

                new_state.password = input.value;

            }

        }

        if (input.value && id === 'email') {

            if (!input.value.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")) {

                set_error('Please enter a valid email address.');

                new_state.password = input.value;

            } else {

                if (error) {

                    set_error('');

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

        //TODO: Add logic to check and make sure the username isn't taken when the user tries to create the account. This may not matter if we don't prompt for username on sign up in the future.

        set_create_info(new_state);

    }


    return (
        <div className={classes([dark_mode ? 'dark' : ''])}>
            <div className={classes(['flex flex-col justify-self-center bg-white dark:bg-black min-h-screen'])}>
                <div className={classes(['flex flex-column md:flex-row md:justify-center md:mb-32 lg:mb-40'])}>
                    {
                        dark_mode ? <TransparentLogo/> : <TransparentLogoDark/>
                    }
                </div>
                <div className={classes(['grid justify-items-center'])}>
                    <div className={classes(['text-black dark:text-white self-end text-2xl mb-5 font-thin'])}>
                        Create an Account
                    </div>

                    {error ?
                        (<div className={classes(['text-red-500'])}>{error}</div>)
                        : ''}

                    <div className={classes['flex flex-row']}>
                        <div className={classes(['flex flex-col md:flex-row md:justify-between'])}>
                            <div className={classes(['md:mr-4'])}>
                                <Label>Username</Label>
                                <Input
                                    type={'text'}
                                    placeholder={create_info.username}
                                    id={'username'}
                                    onChange={handleInputChange}
                                    className={classes(['mb-4 text-black dark:text-white placeholder:italic'])}
                                />
                            </div>
                            <div>
                                <Label>Email Address</Label>
                                <Input
                                    type={'email'}
                                    placeholder={create_info.email}
                                    onChange={handleInputChange}
                                    id={'email'}
                                    className={classes(['mb-4 text-black dark:text-white placeholder:italic'])}
                                />
                            </div>
                        </div>
                        <div className={classes(['flex flex-col md:flex-row md:justify-between'])}>
                            <div className={classes(['md:mr-4'])}>
                                <Label>First Name</Label>
                                <Input
                                    type={'text'}
                                    placeholder={create_info.firstName}
                                    onChange={handleInputChange}
                                    id={'firstName'}
                                    className={classes(['mb-4 text-black dark:text-white placeholder:italic'])}
                                />
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <Input
                                    type={'text'}
                                    placeholder={create_info.lastName}
                                    onChange={handleInputChange}
                                    id={'lastName'}
                                    className={classes(['mb-4 text-black dark:text-white placeholder:italic'])}
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input
                                type={'password'}
                                placeholder={''}
                                onChange={handleInputChange}
                                id={'password'}
                                className={classes(['mb-4 text-black dark:text-white placeholder:italic'])}
                            />
                        </div>
                        <div className={classes(['flex justify-center'])}>
                            <Button
                                className={classes(['w-full bg-black dark:bg-white text-white dark:text-black'])}
                                onClick={() => handleSignIn(create_info, error ? error : '')}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes(['flex flex-row justify-center align-middle h-10 m-5'])}>
                    <div className={classes(['h-0.5 w-40 self-center bg-black dark:bg-white'])}/>
                    <div className={classes(['flex self-center text-black dark:text-white m-4'])}>OR</div>
                    <div className={classes(['h-0.5 w-40 self-center bg-black dark:bg-white'])}/>
                </div>
                <div className={classes(['grid justify-items-center'])}>
                    <Button
                        onClick={() => signIn('google', {
                            redirectTo: "/account/settings"
                        })}
                        className={classes(['w-96 bg-black dark:bg-white text-white dark:text-black mb-5'])}
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
                <button className={'text-white dark:text-black'} onClick={() => set_dark_mode(!dark_mode)}>.
                {/*    TODO: Remove this button once dark mode is moved into state */}
                </button>
            </div>
        </div>
    );

}