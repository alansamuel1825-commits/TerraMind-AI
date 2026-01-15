"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessRedirector() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <p className="mt-6 text-sm text-muted-foreground">
      Redirecting to the login page in {countdown} seconds...
    </p>
  );
}
