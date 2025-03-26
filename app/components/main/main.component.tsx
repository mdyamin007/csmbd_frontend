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
import UsersList from "./users-list.component";

const Main = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Content Management Platform
        </h1>
        <p className="text-muted-foreground max-w-[700px]">
          A platform where users can create and manage their own publicly
          viewable content.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Browse Users</CardTitle>
          <CardDescription>
            Click on a user to view their profile and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersList />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Want to share your own content?{" "}
            <Link
              to="/register"
              className="font-medium underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Main;
