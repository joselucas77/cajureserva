"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch {
        // Mesmo se falhar, a gente redireciona.
      } finally {
        if (!cancelled) {
          router.replace("/");
          router.refresh();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return <Loading />;
}
