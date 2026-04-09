import { Button } from "@/shadcn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shadcn/form";
import { Input } from "@/shadcn/input";
import { classes } from "../../../lib/std";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
    current_password: z.string()
        .min(8, {
            message: "Password must be a minimum of 8 characters",
        }),
    new_password: z.string()
        .min(8, {
            message: "Password must be a minimum of 8 characters",
        }),
    confirm_new_password: z.string()
        .min(8, {
            message: "Password must be a minimum of 8 characters",
        }),
}).superRefine(({ new_password, confirm_new_password }, ctx) => {
    if (confirm_new_password !== new_password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ['confirm_new_password']
        });
    }
});


export function PasswordReset() {

    const [open, set_open] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_new_password: "",
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        try {

            // TODO: HOOK UP API ENDPOINT FOR PASSWORD CHANGE
            set_open(false);

        } catch (err) {

            // TODO: ERROR HANDLING FOR SERVER SIDE REJECTION
            console.error(err);

        }

    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={classes(['w-64'])}
                    onClick={() => set_open(true)}
                >
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Please enter your current password followed by your new password.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Current Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="new_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_new_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );

}
