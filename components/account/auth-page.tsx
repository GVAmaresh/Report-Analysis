import * as React from "react";
import { Icons } from "@/public/icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AuthPage() {
  return (
      <Card className="bg-black text-white border-zinc-400 border-2 border-r-4">
        <CardHeader className="">
          <CardTitle className="text-2xl">Get an Account</CardTitle>
          <CardDescription>
            Enter your email below to Get an Account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-center text-slate-800 ">
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-1/2" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs font-semibold uppercase">
              <span className="bg-background px-2 text-muted-foreground text-slate-800">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get an Account</Button>
        </CardFooter>
      </Card>
  );
}
