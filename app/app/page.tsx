'use client';
import { classes } from "../lib/std";
import ButtonSm from "./components/buttons/button_small";
import Image from "next/image";
import { useState } from "react";
import { Label } from "./components/shadecn_components/ui/label";
import { Input } from "./components/shadecn_components/ui/input";
import { Textarea } from "./components/shadecn_components/ui/textarea";
import { Button } from "./components/shadecn_components/ui/button";
import {
    PaperclipIcon,
    PenToolIcon,
    PowerIcon,
    ShieldIcon,
    TestTubeIcon,
    TrendingUpIcon,
    WebhookIcon
} from "lucide-react";

export default function Landing () {

    const [dark_mode, set_dark_mode] = useState<boolean>(true);
    // TODO: Base dark mode off user state value

    return (
        <div className={dark_mode ? 'dark' : ''}>
            <div className={classes(['flex xl:grid min-h-screen w-full flex-col bg-white dark:bg-black xl:content-center'])}>
                <div className={classes(['flex flex-column md:flex-row md:justify-center p-20 mb-20'])}>
                    <Image
                        src={'/assets/img.png'}
                        width={150}
                        height={150}
                        alt={"Paper Thesis Logo"}
                    />
                    <div className={classes(['font-thin md:h-max text-black dark:text-white text-7xl md:text-8xl text-center'])}>
                        Paper Thesis
                    </div>
                </div>
                <div className={classes(['flex flex-col'])}>
                    <div
                        className={classes(['font-thin text-black dark:text-white flex flex-row justify-center text-4xl md:text-5xl mb-8'])}>
                        <span className={classes(['font-thin mr-2'])}>Trade</span>
                        <span className={classes(['font-normal xl:font-bold'])}>Simply</span>.
                    </div>
                    <div className={classes(['w-full flex flex-row justify-center space-x-8'])}>
                        <ButtonSm
                            text={'Sign In'}
                            customStyles={'bg-black dark:bg-white text-white dark:text-black'}
                            link={'/auth/login'}
                        />
                        <ButtonSm
                            text={'Sign Up'}
                            customStyles={'bg-green-500 text-black'}
                            link={'/auth/signup'}
                        />
                    </div>
                </div>
                <button className={'text-white dark:text-black'} onClick={() => set_dark_mode(!dark_mode)}>.</button>
            </div>
            <div className={classes(['bg-orange-500'])}>
                <section className={classes(['flex col-span-6'])}>
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <div className="mt-8 space-y-4">
                        <p>
                            At Paper Thesis, we aim to democratize stock market education and trading tools. We offer a
                            safe,
                            engaging environment to learn, practice, and perfect trading skills without real-world
                            financial stakes.
                        </p>
                    </div>
                </section>
                <section className={classes(['col-span-6'])}>
                    <h2 className="text-2xl font-bold">About Us</h2>
                    <div className="mt-8 space-y-4">
                        <p>
                            Welcome to Paper Thesis, your go-to platform for mastering stock trading without financial
                            risk. Whether
                            you're a beginner learning the ropes or an experienced trader refining your strategies,
                            Paper Thesis
                            provides a user-friendly web app to succeed in the stock market.
                        </p>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold">What We Offer</h2>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <PaperclipIcon className="h-8 w-8 text-primary"/>
                            <h3 className="text-xl font-semibold">Paper Trading</h3>
                            <p>
                                Experience the stock market with virtual money, track your progress, and learn without
                                financial risk.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <TestTubeIcon className="h-8 w-8 text-primary"/>
                            <h3 className="text-xl font-semibold">Strategy Testing</h3>
                            <p>Develop and test trading strategies using advanced simulation tools to optimize your
                                approaches.</p>
                        </div>
                        <div className="space-y-2">
                            <WebhookIcon className="h-8 w-8 text-primary"/>
                            <h3 className="text-xl font-semibold">User-Friendly Web App</h3>
                            <p>Enjoy a seamless experience on the web.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold">Why choose Paper Thesis?</h2>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <ShieldIcon className="h-8 w-8 text-primary"/>
                            <h3 className="text-xl font-semibold">Risk-Free Learning</h3>
                            <p>Practice without the fear of losing real money.</p>
                        </div>
                        <div className="space-y-2">
                            <PenToolIcon className="h-8 w-8 text-primary"/>
                            <h3 className="text-xl font-semibold">Comprehensive Tools</h3>
                            <p>Access a wide range of tools to develop and test trading strategies.</p>
                        </div>
                        <div className="space-y-2">
                            <TrendingUpIcon className="h-8 w-8 text-primary"/>
                            <h3 className="text-xl font-semibold">Continuous Improvement</h3>
                            <p>Stay updated with the latest market trends and strategies.</p>
                        </div>
                        <div className="space-y-2">
                            <PowerIcon className="h-8 w-8 text-primary"/>
                            <h3 className="text-xl font-semibold">Supportive Environment</h3>
                            <p>Benefit from a dedicated support team ready to assist you.</p>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <p>
                            Join Paper Thesis and take your first step toward becoming a confident and successful
                            trader. We're here
                            to support your journey every step of the way.
                        </p>
                        <p>For any questions or assistance, reach out to our support team. Happy trading!</p>
                    </div>
                </section>
            </div>
        </div>
    );

}