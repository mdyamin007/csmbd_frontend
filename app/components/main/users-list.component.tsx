"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { User } from "~/types/data.type";
import { useGet } from "~/api/hooks";
import Endpoints from "~/api/endpoints";
import { QueryKeys } from "~/constants/query-keys";
import dayjs from "dayjs";

export default function UsersList() {
  const { data: users, isLoading } = useGet<User[]>({
    url: Endpoints.users(),
    options: {
      queryKey: [QueryKeys.getUsers],
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="grid gap-1">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users && users?.length > 0 ? (
        users.map((user) => (
          <Link to={`/profile/${user.id}`} key={user.id}>
            <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarFallback>
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{user.username}</CardTitle>
                  <CardDescription>
                    Joined {dayjs(user.createdAt).format("MMM DD, YYYY")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to view {user.username}'s profile and content
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <div className="col-span-2 text-center py-10">
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
    </div>
  );
}
