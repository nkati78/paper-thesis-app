import { classes } from "../../../lib/std";
import button_small from "../../assets/styles/components/buttons.module.css";
import Link from "next/link";

type ButtonSm = {
    text: string,
    link: string,
    customStyles?: string
}

export default function ButtonSm (props: ButtonSm) {

    return (
        <Link href={props.link} className={classes([props?.customStyles ?? '', button_small.button_small])}>
            {props.text}
        </Link>
    );

}