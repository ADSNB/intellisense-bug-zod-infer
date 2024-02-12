# intellisense-bug-zod-infer

Created app using NextJS 14.1 create-app

## Packages installed

*NextUI
*prisma
*prisma-trpc-generator
*react-hook-form
*zod
*hookform/resolvers

## Installation

execute "npm install"
execute "npx prisma generate" - this will generate the objects and schemas based on prisma schema db

## Description of the error

Basically when using zod.infer the intellisense of visual studio code will stop working. Even when you try to restart the TS server, the intellisense will stop seconds later.

## Steps to reproduce the error

Open the "src\app\comp1\constructionCompany\component\test.tsx" file.

Hover any function, object or try to use the intellisense in this page... you will notice a "Loading..." message instead of the function, object, method description... You will notice as well a message on the bottom right corner of the screen saying "Loading Intellisense Status..." forever.

If you open any other file in this project after acessing this page where contains zod.infer the intellisense will not work anymore.
