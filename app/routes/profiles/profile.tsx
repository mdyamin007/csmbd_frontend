import { useEffect, useState } from "react";
import { ArrowLeft, Globe } from "lucide-react";
import type { Route } from "./+types/profile";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import ContentList from "~/components/dashboard/content-list.component";
import { useGet } from "~/api/hooks";
import type { User } from "~/types/data.type";
import Endpoints from "~/api/endpoints";
import { QueryKeys } from "~/constants/query-keys";
import dayjs from "dayjs";

export default function ProfilePage({ params }: Route.ComponentProps) {
  const userId = params.id as string;

  const { data: profile, isLoading } = useGet<User>({
    url: Endpoints.userById(userId),
    options: {
      enabled: !!userId,
      queryKey: [QueryKeys.getUserInfo],
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">
                  {profile.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{profile.username}</CardTitle>
              <CardDescription>
                Joined {dayjs(profile.createdAt).fromNow()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.bio && (
                <div>
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
              )}

              {profile.website && (
                <div>
                  <h3 className="font-medium mb-2">Website</h3>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {profile.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{profile.username}'s Content</CardTitle>
              <CardDescription>
                Videos shared by {profile.username}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentList userId={userId} isOwner={false} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
