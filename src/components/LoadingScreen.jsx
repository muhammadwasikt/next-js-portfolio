"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LoadingScreen = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return isLoading ? (
    <div className="h-screen flex justify-center items-center p-2 bg-white">
      <div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      />
    </div>
  ) : (
    children
  );
};

export default LoadingScreen;
