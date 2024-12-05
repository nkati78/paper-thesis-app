'use client';

import { Button } from "@/shadcn/button";
import { Input } from "@/shadcn/input";
import { Label } from "@/shadcn/label";
import { Textarea } from "@/shadcn/textarea";
import { useSelector } from "react-redux";
import { updateUser } from "@/redux/user/userSlice";
import { selectUser } from "@/redux/user/userSlice";
import { Skeleton } from "@/shadcn/skeleton";
import { ChangeEventHandler, FormEvent, MouseEventHandler, useEffect, useState } from "react";
import Transactions from "../components/transactions/transactions";
import { classes } from "../../lib/std";
import { useAppDispatch } from "../../lib/redux/hooks";
import { PTTransaction } from "../../types/pt_types";
import { PasswordReset } from "../components/modals/password_reset";

// TODO: Get rid of "Stock Chart" on the chart title
// TODO: When you press "Trade" on the dashboard, the trading modal will pop up

interface ContactForm {
    name: string,
    email: string,
    message: string
}

interface UserFormInfo {
    fn: string,
    ln: string,
    email: string,
    username: string
}

export default function Account() {

    const user_info = useSelector(selectUser);
    const dispatch = useAppDispatch();

    const [edit_info, set_edit_info] = useState<boolean>(false);
    const [user_form_info, set_user_form_info] = useState<UserFormInfo>({
        fn: '',
        ln: '',
        email: '',
        username: ''
    });
    const [contact_us_form, set_contact_us_form] = useState<ContactForm>({
        name: '',
        email: '',
        message: ''
    });
    const [transactions_state, set_transactions_state] = useState<Array<PTTransaction>>([]);

    useEffect(() => {

        if (user_info && !user_form_info.fn) {

            set_user_form_info({
                fn: user_info.fn,
                ln: user_info.ln,
                email: user_info.email,
                username: user_info.username,
            });

        }

    }, [user_info]);

    useEffect(() => {

        if (transactions_state.length <= 0) {

            try {

                // TODO: ADD API CALL TO GET TRANSACTIONS
                const transactionsDummy = [
                    {
                        id: 1,
                        transaction_id: '1a',
                        date: "2024-05-01",
                        type: "Buy",
                        status: "Complete",
                        ticker: "AAPL",
                        price: 120.5,
                        amount: 100,
                    },
                    {
                        id: 2,
                        transaction_id: '1b',
                        date: "2024-05-05",
                        type: "Sell",
                        status: "Pending",
                        ticker: "AAPL",
                        price: 125.75,
                        amount: 50,
                    },
                    {
                        id: 3,
                        transaction_id: '1c',
                        date: "2024-01-10",
                        type: "Buy",
                        status: "Failed",
                        ticker: "GOOGL",
                        price: 2500.0,
                        amount: 75,
                    },
                    {
                        id: 4,
                        transaction_id: '1d',
                        date: "2024-04-15",
                        type: "Sell",
                        status: "Complete",
                        ticker: "GOOGL",
                        price: 2550.0,
                        amount: 25,
                    },
                    {
                        id: 5,
                        transaction_id: '1e',
                        date: "2024-07-20",
                        type: "Buy",
                        status: "Pending",
                        ticker: "TSLA",
                        price: 300.75,
                        amount: 150,
                    },
                    {
                        id: 6,
                        transaction_id: '1f',
                        date: "2024-07-25",
                        type: "Sell",
                        status: "Complete",
                        ticker: "TSLA",
                        price: 325.5,
                        amount: 100,
                    },
                    {
                        id: 7,
                        transaction_id: '1g',
                        date: "2024-08-26",
                        type: "Buy",
                        status: "Complete",
                        ticker: "AAPL",
                        price: 120.5,
                        amount: 100,
                    },
                ];

                set_transactions_state(transactionsDummy);

            } catch (err) {

                // TODO: ERROR HANDLING
                console.error(err);
            }

        }

    }, [transactions_state]);

    const saveAccInfo = async (acc_info: UserFormInfo) => {

        //TODO: ADD PROGRESS LOADER ON SUBMIT

        try {

            //TODO: ADD API CALL HERE TO UPDATE ACC INFO
            dispatch(updateUser({
                ...user_info,
                fn: acc_info.fn,
                ln: acc_info.ln,
                email: acc_info.email,
                username: acc_info.username,
            }));

            set_edit_info(false);

        } catch (err) {

            // TODO: ADD ERROR HANDLING
            // TODO: POTENTIALLY AUTO CANCEL DEPENDING ON ERROR
            console.log(err);

        }

    };

    const cancelEdit: MouseEventHandler = async () => {

        set_user_form_info({
            fn: user_info.fn,
            ln: user_info.ln,
            email: user_info.email,
            username: user_info.username,
        });

        set_edit_info(false);

    };

    const handleInputChange: ChangeEventHandler = async (e) => {

        //TODO: Add Validation for various input elements

        const input = e.target as HTMLInputElement;
        const id = input.id;

        if (input.value && id === 'email') {

            set_user_form_info({
                ...user_form_info,
                email: input.value,
            });

        } else if (input.value && id === 'firstName') {

            set_user_form_info({
                ...user_form_info,
                fn: input.value,
            });

        } else if (input.value && id === 'lastName') {

            set_user_form_info({
                ...user_form_info,
                ln: input.value,
            });


        } else if (input.value && id === 'username') {

            set_user_form_info({
                ...user_form_info,
                username: input.value,
            });

        } else if (input.value && id === 'name') {

            set_contact_us_form({
                ...contact_us_form,
                name: input.value
            });

        } else if (input.value && id === 'message') {

            set_contact_us_form({
                ...contact_us_form,
                message: input.value
            });

        } else if (input.value && id === 'email_contact') {

            set_contact_us_form({
                ...contact_us_form,
                email: input.value
            });

        }

    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (e.target[0].value && e.target[1].value && e.target[1].value) {

            const contact = {
                name: e.target[0].value,
                email: e.target[1].value,
                message: e.target[2].value
            };

            try {

                console.log(contact);
                //TODO: ADD API CALL TO SUBMIT CONTACT FORM

            } catch (err) {

                // TODO: ADD ERROR HANDLING
                console.log(err);
                
            }

        }

    };

    return (
        <div className="flex min-h-screen">
            <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
                <div className="grid gap-16">
                    <section>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Account Information</h2>
                        </div>
                        {user_info ? (
                            <>
                                <div>
                                    <div className="mt-8 grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Username</Label>
                                            <Input
                                                id="username"
                                                type="text"
                                                disabled={!edit_info}
                                                value={user_form_info.username}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                disabled={!edit_info}
                                                value={user_form_info.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                type={"text"}
                                                disabled={!edit_info}
                                                value={user_form_info.fn}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                type={"text"}
                                                disabled={!edit_info}
                                                value={user_form_info.ln}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col mt-10 items-center">
                                        {edit_info ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    className={classes(['w-64 md:mb-5'])}
                                                    onClick={() => saveAccInfo(user_form_info)}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className={classes(['w-64 md:mb-5'])}
                                                    onClick={cancelEdit}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                className={classes(['w-64 md:mb-5'])}
                                                onClick={() => set_edit_info(true)}
                                            >
                                                Edit Account Information
                                            </Button>
                                        )}
                                        <PasswordReset/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full"/>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]"/>
                                    <Skeleton className="h-4 w-[200px]"/>
                                </div>
                            </div>
                        )}
                    </section>
                    <section>
                        <div className={classes(['w-full'])}>
                            <h2 className="text-2xl font-bold mb-8">Wallet</h2>
                            <div className="w-100 flex justify-between">
                                <div className="text-muted-foreground">Current Balance</div>
                                <div className="text-lg self-end">
                                    {Intl.NumberFormat('en-US',
                                        {
                                            style: "currency",
                                            currency: "USD"
                                        }).format(user_info.wallet)
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full">
                        <Transactions
                            transactions={transactions_state}
                        />
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <form
                            className="mt-8 space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={user_info.fn + ' ' + user_info.ln}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email_contact"
                                        type="email"
                                        value={user_info.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Enter your message"
                                    className="min-h-[120px]"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <Button variant={"outline"} type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );

}