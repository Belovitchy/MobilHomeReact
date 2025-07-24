import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class OwnerRepository {
  async login(email: string, password: string) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from owner where email = ? and password = ?",
      [email, password],
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }
}
export default new OwnerRepository();
