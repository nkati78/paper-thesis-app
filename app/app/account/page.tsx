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
import settings from "../../lib/settings";
import { Order } from "../../types/api_types";

// TODO: Look at potential live updates for open orders
// TODO: Make sure orders is properly updating with the right data and reflecting changes properly
// TODO: Componentize the page

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

    const user = useSelector(selectUser);

    const [ editInfo, setEditInfo ] = useState<boolean>(false);
    const [ userFormInfo, setUserFormInfo ] = useState<UserFormInfo>({
        fn: '',
        ln: '',
        email: '',
        username: ''
    });
    const [ contactUsForm, setContactUsForm ] = useState<ContactForm>({
        name: '',
        email: '',
        message: ''
    });
    const [ transactionState, setTransactionState ] = useState<Array<PTTransaction>>([]);

    const dispatch = useAppDispatch();

    //User Info Hook
    useEffect(() => {

        if (user && !userFormInfo.fn) {

            setUserFormInfo({
                fn: user.fn,
                ln: user.ln,
                email: user.email,
                username: user.username,
            });

        }

    }, [user]);

    //Orders Hook
    useEffect(() => {

        (async () => {
            
            if (transactionState.length <= 0) {

                try {

                    let transactions: PTTransaction[] | null = [];

                    const orders: Order[] = await fetch(settings.local_api.orders, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then((res) => res.json());

                    if (orders.length > 0) {
                        
                        transactions = orders.map((order) => ({
                            id: orders.findIndex((order) => order.OrderID),
                            transaction_id: order.OrderID,
                            date: new Date(order.Timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            }),
                            type: order.Side,
                            status: order.Status, // TODO: Need to hash out possibilities of what is returned here. "Pending, Complete, Failed" are what the order history currently takes
                            ticker: order.Symbol,
                            price: (order.Price / 100),
                            amount: order.Quantity
                        }));

                        if (transactions && transactions.length > 0) {

                            setTransactionState(transactions);

                        }

                    }

                } catch (err) {

                    console.error(err);

                }

            }
            
        })();

    }, []);

    const saveAccInfo = async (accInfo: UserFormInfo) => {

        try {

            //TODO: ADD API CALL HERE TO UPDATE ACC INFO
            dispatch(updateUser({
                ...user,
                fn: accInfo.fn,
                ln: accInfo.ln,
                email: accInfo.email,
                username: accInfo.username,
            }));

            setEditInfo(false);

        } catch (err) {

            console.log(err);

        }

    };

    const cancelEdit: MouseEventHandler = async () => {

        setUserFormInfo({
            fn: user.fn,
            ln: user.ln,
            email: user.email,
            username: user.username,
        });

        setEditInfo(false);

    };

    const handleInputChange: ChangeEventHandler = async (e) => {

        //TODO: Add Validation for various input elements

        const input = e.target as HTMLInputElement;
        const id = input.id;

        if (input.value && id === 'email') {

            setUserFormInfo({
                ...userFormInfo,
                email: input.value,
            });

        } else if (input.value && id === 'firstName') {

            setUserFormInfo({
                ...userFormInfo,
                fn: input.value,
            });

        } else if (input.value && id === 'lastName') {

            setUserFormInfo({
                ...userFormInfo,
                ln: input.value,
            });


        } else if (input.value && id === 'username') {

            setUserFormInfo({
                ...userFormInfo,
                username: input.value,
            });

        } else if (input.value && id === 'name') {

            setContactUsForm({
                ...contactUsForm,
                name: input.value
            });

        } else if (input.value && id === 'message') {

            setContactUsForm({
                ...contactUsForm,
                message: input.value
            });

        } else if (input.value && id === 'email_contact') {

            setContactUsForm({
                ...contactUsForm,
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

                // console.log(contact);
                //TODO: ADD API CALL TO SUBMIT CONTACT FORM

            } catch (err) {

                // TODO: ADD ERROR HANDLING
                console.log(err);
                
            }

        }

    };

    return (
        <div className="flex min-h-screen">
            <div className="container mx-auto max-w-lg py-12 px-4 md:px-6">
                <div className="">
                    <section>
                        <div className="">
                            <h2 className="text-2xl font-bold">Account Information</h2>
                        </div>
                        {user ? (
                            <>
                                <div>
                                    <div className="mt-8">
                                        <div className="space-y-2 max-w-md">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                type={"text"}
                                                disabled={!editInfo}
                                                value={userFormInfo.fn}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2 max-w-md">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                type={"text"}
                                                disabled={!editInfo}
                                                value={userFormInfo.ln}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2 max-w-md">
                                            <Label htmlFor="email">Username</Label>
                                            <Input
                                                id="username"
                                                type="text"
                                                disabled={!editInfo}
                                                value={userFormInfo.username}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2 max-w-md">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                disabled={!editInfo}
                                                value={userFormInfo.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col mt-10 items-center">
                                        {editInfo ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    className={classes(['w-64 md:mb-5'])}
                                                    onClick={() => saveAccInfo(userFormInfo)}
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
                                                onClick={() => setEditInfo(true)}
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
                        <div className={classes(['w-full mt-10'])}>
                            <h2 className="text-2xl font-bold mb-8">Wallet</h2>
                            <div className="w-100 flex justify-between">
                                <div className="text-muted-foreground">Current Balance</div>
                                <div className="text-lg self-end">
                                    {Intl.NumberFormat('en-US',
                                        {
                                            style: "currency",
                                            currency: "USD"
                                        }).format(user.wallet)
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full mt-10">
                        <Transactions
                            transactions={transactionState}
                        />
                    </section>
                    <section className={"mt-10"}>
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <form
                            className="mt-8 space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div className="">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={user.fn + ' ' + user.ln}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email_contact"
                                        type="email"
                                        value={user.email}
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