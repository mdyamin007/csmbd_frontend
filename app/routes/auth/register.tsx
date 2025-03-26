"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
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
import { toast } from "sonner";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      // Register the user
    } catch (error: any) {
      toast("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className={
                      errors.name && touched.name ? "border-destructive" : ""
                    }
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-destructive"
                  />
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-destructive"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-sm text-destructive"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Login
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
