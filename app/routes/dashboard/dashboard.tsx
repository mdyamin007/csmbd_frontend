import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AddContentForm from "~/components/dashboard/add-content-form.component";
import ContentList from "~/components/dashboard/content-list.component";
import ProfileForm from "~/components/dashboard/profile-form.component";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { removeLogInInfo } from "~/lib/utils";
import type { Route } from "./+types/dashboard";
import { useAppDispatch } from "~/lib/redux/hook";
import { resetUser } from "~/lib/redux/slices/userSlice";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | CSMBD Content Management" },
    {
      name: "description",
      content: "Welcome to CSMBD Content Management System",
    },
  ];
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    removeLogInInfo();
    dispatch(resetUser());
    navigate("/");
  };

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="content">My Content</TabsTrigger>
          <TabsTrigger value="add-content">Add Content</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Content</CardTitle>
              <CardDescription>Manage your content</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentList isOwner={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Content</CardTitle>
              <CardDescription>
                Add a new YouTube video to your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddContentForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
