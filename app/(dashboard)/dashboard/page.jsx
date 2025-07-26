"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { db, auth } from "@/firebase/config";
import ProjectCard from "@/components/ProjectCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// "12tjCpvrCkZPhlWGqYBx1L4BeZ63"

function Page() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // console.log("firebaseUser", firebaseUser.uid);
      try {
        if (firebaseUser) {
          const q = query(
            collection(db, "projects"),
            where("userId", "==", firebaseUser?.uid)
          );
          const querySnapshot = await getDocs(q);
          const projects = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((doc) => doc.deployUrl);
          setData(projects);
        }
      } catch (error) {
        // console.error("Error fetching projects:", error);
        setData([]);
      } finally {
        setIsLoaded(false);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="md:grid md:grid-cols-3 gap-5 md:py-20 md:px-10 ">
        {isLoaded ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-40 md:h-60 rounded-md mt-10 sm:mt-0 "
            />
          ))
        ) : data?.length != 0 ? (
          data?.map((ProjecData) => (
            <ProjectCard key={ProjecData.id} data={ProjecData} />
          ))
        ) : (
          <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
            <Image
              src="/not-found.svg"
              height={44}
              width={44}
              className="w-44 h-44 object-contain"
              alt=""
            />

            <h2 className="text-lg font-semibold text-muted-foreground">
              No Data Found
            </h2>

            <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
              There is no available data to show. Please add some new mock
              interviews
            </p>

            <Link href={"/deploy"} className="mt-4">
              <Button size={"sm"}>
                <Plus className="min-w-5 min-h-5 mr-1" />
                Add New
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
