import { ButtonSm as buttonsmtype } from "../../../types/button_types";
import { classes } from "../../../lib/std";
import button_small from "../../assets/styles/components/buttons.module.css";
import Link from "next/link";

export default function ButtonSm (props: buttonsmtype) {

    return (
        <Link href={props.link} className={classes([props?.customStyles ?? '', button_small.button_small])}>
            {props.text}
        </Link>
    );

}