import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-screen flex-col">
      <Image
        src="/not-found.svg"
        height={44}
        width={44}
        className="w-44 h-44 object-contain"
        alt=""
      />

      <h2 className="text-lg font-semibold text-muted-foreground">
        Page Not Found
      </h2>

      <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
        There is no available page to show. Please check the URL or return to
        the homepage.
      </p>
    </div>
  );
}

export default page;
