import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class OwnerRepository {
  async login(email: string) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from owner where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async checkId(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from owner where id = ?",
      [id],
    );
    return rows[0];
  }

  async updateEmail(id: string, email: string) {
    const [result] = await databaseClient.query<Result>(
      "update owner set email = ? where id = ?",
      [email, id],
    );

    if (result.affectedRows === 0) {
      throw new Error("Owner not found or email not updated");
    }

    return this.checkId(Number(id));
  }

  async getOwners() {
    const [rows] = await databaseClient.query<Rows>(
      "select id, name, email, isAdmin from owner",
    );
    return rows;
  }

  async addOwner(
    email: string,
    password: string,
    name: string,
    isAdmin: boolean,
  ) {
    const [result] = await databaseClient.query<Result>(
      "insert into owner (email, password, name, isAdmin) values (?, ?, ?, ?)",
      [email, password, name, isAdmin],
    );
    return result.insertId;
  }
}
export default new OwnerRepository();
