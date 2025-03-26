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

interface User {
  id: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
}

const mockUserData = [
  {
    id: "1",
    name: "John Doe",
    avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
    created_at: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar_url: "https://randomuser.me/api/portraits/women/1.jpg",
    created_at: "2024-02-10T09:00:00Z",
  },
  {
    id: "3",
    name: "Michael Johnson",
    avatar_url: null,
    created_at: "2024-03-05T10:30:00Z",
  },
  {
    id: "4",
    name: "Sarah Williams",
    avatar_url: "https://randomuser.me/api/portraits/women/2.jpg",
    created_at: "2024-03-10T11:00:00Z",
  },
];

export default function UsersList() {
  const [users, setUsers] = useState<User[]>(mockUserData); // Set mock data here
  const [loading, setLoading] = useState(false);

  if (loading) {
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
      {users.length > 0 ? (
        users.map((user) => (
          <Link to={`/profile/${user.id}`} key={user.id}>
            <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage src={user.avatar_url || ""} alt={user.name} />
                  <AvatarFallback>
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription>
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to view {user.name}'s profile and content
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
