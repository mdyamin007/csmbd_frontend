import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Link, useNavigate } from "react-router";
import { LoginSchema } from "~/validations/login.validation";
import { usePost } from "~/api/hooks";
import Endpoints from "~/api/endpoints";
import type { LoginReqType } from "~/types/request.type";
import { errorResponseHandler, storeTokens } from "~/lib/utils";
import type { LoginResType } from "~/types/response.type";
import { useAppDispatch } from "~/lib/redux/hook";
import { setUser } from "~/lib/redux/slices/userSlice";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | CSMBD Content Management" },
    {
      name: "description",
      content: "Welcome to CSMBD Content Management System",
    },
  ];
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: login, isPending } = usePost<LoginReqType, LoginResType>({
    url: Endpoints.login(),
    options: {
      onSuccess: (data) => {
        storeTokens({
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        });
        dispatch(setUser(data?.user));
        toast.success("Login successful");
        navigate("/dashboard");
      },
      onError: errorResponseHandler,
    },
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      login({
        email: values.email,
        password: values.password,
      });
    } catch (error: any) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    className={
                      errors.email && touched.email ? "border-destructive" : ""
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-destructive"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    className={
                      errors.password && touched.password
                        ? "border-destructive"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-destructive"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || isPending}
                >
                  {isLoading || isPending ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Register
                  </Link>
                </div>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
