import React from "react";
import Head from "next/head";
import { Metadata } from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// const generateImage = async (data: CompanyDetails) => {
//   return new Promise(async (resolve) => {
//     const canvas = createCanvas(800, 415); // Set the canvas size as needed
//     const ctx = canvas.getContext("2d");
//     function drawRoundedImage(
//       image: any,
//       x: any,
//       y: any,
//       width: any,
//       height: any
//     ) {
//       ctx.save();
//       ctx.beginPath();
//       ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2, true);
//       ctx.closePath();
//       ctx.clip();
//       ctx.drawImage(image, x, y, width, height);
//       ctx.restore();
//     }
//     const profileImageURL = "your_image_url_here";
//     const userName = data?.name ?? "";
//     const userTitle = data?.industry ?? "";
//     // Draw on the canvas using the data
//     ctx.fillStyle = "lightblue";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "black";
//     // ctx.font = "20px Arial";
//     // ctx.fillText(data?.data?.user?.username, 20, 50);
//     // ctx.fillText(data.description, 20, 100);

//     // Resolve the promise with the canvas

//     try {
//       const profileImage = await loadImage(data?.logo?.url ?? ""); // Draw rounded profile image
//       drawRoundedImage(profileImage, 50, 50, 200, 200);

//       // Draw user name
//       ctx.font = "600 56px Inter, Arial";
//       ctx.font;
//       ctx.fillStyle = "#333";
//       ctx.fillText(userName, 300, 160);

//       // Draw user title
//       ctx.font = "600 30px Inter, Arial";
//       ctx.fillStyle = "#666";
//       ctx.fillText(userTitle, 300, 200);

//       // Draw VISIT button
//       ctx.fillStyle = "#3498db";
//       ctx.fillRect(300, 220, 120, 40);

//       // Draw VISIT button with borderRadius
//       ctx.fillStyle = "#3498db";
//       const buttonX = 300;
//       const buttonY = 220;
//       const buttonWidth = 60;
//       const buttonHeight = 40;
//       const borderRadius = 5;

//       ctx.beginPath();
//       ctx.moveTo(buttonX + borderRadius, buttonY);
//       ctx.lineTo(buttonX + buttonWidth - borderRadius, buttonY);
//       ctx.quadraticCurveTo(
//         buttonX + buttonWidth,
//         buttonY,
//         buttonX + buttonWidth,
//         buttonY + borderRadius
//       );
//       ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - borderRadius);
//       ctx.quadraticCurveTo(
//         buttonX + buttonWidth,
//         buttonY + buttonHeight,
//         buttonX + buttonWidth - borderRadius,
//         buttonY + buttonHeight
//       );
//       ctx.lineTo(buttonX + borderRadius, buttonY + buttonHeight);
//       ctx.quadraticCurveTo(
//         buttonX,
//         buttonY + buttonHeight,
//         buttonX,
//         buttonY + buttonHeight - borderRadius
//       );
//       ctx.lineTo(buttonX, buttonY + borderRadius);
//       ctx.quadraticCurveTo(buttonX, buttonY, buttonX + borderRadius, buttonY);
//       ctx.closePath();

//       ctx.fill();

//       ctx.font = "600 20px Inter, Arial";
//       ctx.fillStyle = "#fff";
//       ctx.fillText("View", 320, 248);
//     } catch (error) {
//       console.error("Error loading profile image:", error);
//     }

//     console.log("Exiting generateImage function");
//     resolve(canvas.toDataURL());
//   });
// };
// Promise.any([Promise.reject(new Error("some error"))]).catch((e) => {
//   console.log(e instanceof AggregateError); // true
//   console.log(e.message); // "All Promises rejected"
//   console.log(e.name); // "AggregateError"
//   console.log(e.errors); // [ Error: "some error" ]
// });
// or Dynamic metadata

// export function middleware(request: NextRequest) {
//   request.headers.set("pathname", request.nextUrl.pathname);

//   if (request.nextUrl.pathname.startsWith("/@")) {
//     return NextResponse.rewrite(new URL("/profile", request.nextUrl), {
//       headers: request.headers,
//     });
//   }
// }
export async function generateMetadata() {
  // const host = getServerSideProps();
  const headersList = headers();
  const currentUrl = headersList.get("x-invoke-path");
  const nexturl = headersList.get("x-forwarded-host");
  // console.log("url>>", currentUrl);
  const header_url = headersList.get("host");
  const referer = headersList.get("referer");
  const connection = headersList.get("connection");
  const link = headersList.get("link");
  const forwardedHost = headersList.get("x-forwarded-host");
  console.log({ connection, link, currentUrl, nexturl, forwardedHost });
  return {
    title:
      "header_url:" +
      header_url +
      ",referer:" +
      referer +
      ",nexturl:" +
      nexturl +
      "forwardedHost:" +
      forwardedHost,
    description: "Test description",
    openGraph: {
      images: [
        {
          url: "https://assets.turbologo.com/blog/en/2019/10/19084952/ferrari-logo-illustration.jpg",
        },
      ],
    },
  };
}
//   // Split the host URL by "."
//   const parts = header_url?.split(".");
//   // Get the first part (subdomain)
//   if (parts && parts.length > 0) {
//     const username = parts[0];

//     if (
//       username &&
//       // username !== "localhost:3000" &&
//       username !== "app" &&
//       username !== "test2"
//     ) {
//       try {
//         // Now you can use Ax ios to call your API
//         const apiUrl = `${
//           process.env.NEXT_PUBLIC_BACKEND_URI
//         }/api/recruitment/company/all/jobad/get/${
//           username === "localhost:3000" ? "meetmax" : username
//         }`;

//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         };
//         const response = await axios.get(apiUrl, config);
//         const { data }: { data: CompanyDetails } = response.data;
//         // Generate the image using the utility function
//         // const image = await generateImage(data);
//         // const image = await generateImage(data?.companyDetails); // Note the 'await' here

//         // Pass data and image to the page component
//         const returndata: Metadata = {
//           title: data?.companyDetails?.name ?? "",
//           description: data?.companyDetails.about ?? "",
//           openGraph: {
//             images: {
//               url: data?.companyDetails?.logo?.url ?? "",
//               width: 400,
//               height: 400,
//             },
//           },
//         };
//         // console.log(returndata);
//         return returndata;
//       } catch (err) {
//         console.log({ err });
//         return {};
//       }
//     }
//   }
// }

//
// export async function getprops() {
//   console.log("server side works");
//   // Fetch data from the API
//   // const subdomain = req.headers.host.split('.')[0];

//   const subdomain: string = "abdulrehman6954";
//   // Now you can use Axios to call your API
//   const apiUrl = `https://api2.meetmax.io/api/recruitment/company/jobad/get/meetmax`;
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   try {
// Generate the image using the utility function
// const image = await generateImage(data);
// const image = await generateImage(data); // Note the 'await' here
// console.log({ data, image });
// Pass data and image to the page component
//     return { data };
//   } catch (error) {
//     console.error("Error fetching data from the API:", error);
//     return {
//       notFound: true,
//     };
//   }
// }
// console.log(process.env.NEXT_PUBLIC_BACKEND_URI);
// console.log("wprlomg");

async function CompaniesLayout() {
  // Fetch data from the API
  // const subdomain = req.headers.host.split('.')[0];

  const subdomain: string = "abdulrehman6954";
  // Now you can use Axios to call your API
  // const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/recruitment/company/jobad/get/meetmax`;
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // const response = await axios
  //   .get(apiUrl, config)
  //   .then((data) => data)
  //   .catch((err) => console.log({ err }));
  // const data = response?.data;

  const headersList = headers();
  const currentUrl = headersList.get("x-invoke-path");
  const nexturl = headersList.get("x-forwarded-host");
  // console.log("url>>", currentUrl);
  const header_url = headersList.get("host");
  const referer = headersList.get("referer");
  const connection = headersList.get("connection");
  const link = headersList.get("link");
  const forwardedHost = headersList.get("x-forwarded-host");
  return (
    <div style={{ color: "white" }}>
      TEST
      {currentUrl}
      {nexturl}
      {header_url}
      {referer}
      {connection}
      {link}
      {forwardedHost}
      {/* HELLO THIS IS DYNAMIC METADATA */}
    </div>
  );
}

export default CompaniesLayout;
