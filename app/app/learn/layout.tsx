import React from "react";
import {classes} from "../../lib/std";

export default function LearnLayout ({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className={classes(['flex justify-center md:mt-20 p-10 md:p-0'])}>

            {children}

        </div>
    );

}