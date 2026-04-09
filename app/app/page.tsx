'use client';

import { classes } from "../lib/std";
import ButtonSm from "./components/buttons/button_small";
import Image from "next/image";
import { useState } from "react";

// TODO: REFACTOR FOR V1

export default function Landing () {

    const [ darkMode, setDarkMode ] = useState<boolean>(true);

    return (
        <div className={darkMode ? 'dark' : ''}>
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
                <button className={'text-white dark:text-black'} onClick={() => setDarkMode(!darkMode)}>.</button>
            </div>
        </div>
    );

}