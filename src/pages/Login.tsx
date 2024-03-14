import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

export default function Login() {
  const loginSchema = z.object({
    email: z
      .string()
      .email({ message: "Provide a valid email address." })
      .min(2, { message: "Email must be at least 2 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Your e-mail</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>Your Password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                Doesn't have an account? <Link to={"/register"}>Register</Link>
              </FormItem>
              <FormItem>
                <Button type="submit">Login</Button>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
