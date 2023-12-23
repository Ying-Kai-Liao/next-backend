"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const session = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  useEffect (() => {
    if (session?.status === 'authenticated') {
      console.log("Authenticated")
      router.push('/admin')
    }
  }, [session?.status, router])

  

  const socialAction = async (action: string) => {
    setIsLoading(true);

      signIn(action, { redirect: false })
      .then((callback) => {
        console.log(callback)
        if (callback?.error) {
          toast({
            title: "Error ❌",
            description: "登入資訊錯誤",
          })
        }
        if (callback?.ok || !callback?.error) {
          toast({
            title: "Success ✅",
            description: "成功登入",
          })
          
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="login" variant="outline" className="bg-pink-800">登入</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>登入或註冊以繼續使用...</DialogTitle>
        </DialogHeader>
        <div className="min-h-[100px] flex justify-center items-center">
          <Button className="w-full mx-5 border py-2 rounded-lg" onClick={() => socialAction('google')}>
            <BsGoogle className="h-4 w-4  inline "/> <span className="pl-3">以 Google 繼續登入 </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
