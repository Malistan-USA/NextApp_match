'use client';

import { Button, Card, CardHeader, FieldError, Input, TextField, toast } from "@heroui/react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";





export default function LoginForm() {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        await authClient.signIn.email({
            email: data.email,
            password: data.password
        }, {
            onSuccess: () => {
                router.push('/members');
                router.refresh()
            },
            onError: (ctx) => {
                toast.danger(ctx.error.message)
            }
        })
    }

    return (
        <Card className="w-md shadow-xl">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Login</h1>
                    </div>
                    <p className="text-foreground/60">Welcome back to nextMatch</p>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-6 py-4">

                <TextField
                    aria-label="email"
                    isInvalid={!!errors.email}
                >
                    <Input
                        type="email"
                        placeholder="Enter Your Email"
                        {...register('email')}
                    />

                    <FieldError>{errors.email?.message}</FieldError>
                </TextField>

                <TextField
                    aria-label="password"
                    isInvalid={!!errors.password}
                >
                    <Input
                        type="password"
                        placeholder="Enter Your Password"
                        {...register('password')}
                    />

                    <FieldError>{errors.password?.message}</FieldError>
                </TextField>

                <Button isPending={isSubmitting} type="submit" className="w-full">Sign in</Button>
            </form>
        </Card>
    )
}