import type { NextApiRequest, NextApiResponse } from "next";
import { Error } from "../../../types";
import {User} from "@prisma/client";
import prisma from "../../../lib/prisma";

/*
 ** Implement logic to 'get all users' and 'create a user' using "prisma"
 ** 1. GET: return all users
 ** 2. POST: create a user (NOT for Web3 developer)
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | Error>
) {
  // TODO
  res.status(500).end();
}
