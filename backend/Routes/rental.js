import express from "express";

import { db } from "../util/db.js";

import mysql2 from "mysql2";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";
const router = express.Router();

router.get("/getRentedBicycleUser", verifyJwtToken, async (req, res) => {
  const userId = req.id;

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const [rentals] = await connection
        .promise()
        .query(
          `
          SELECT
            rentals.*,
            bicycles.bicycle_name,
            bicycles.cost_per_hour
          FROM
            rentals
            JOIN bicycles ON rentals.bicycle_id = bicycles.bicycle_id
            JOIN rent_requests ON rentals.request_id = rent_requests.request_id
          WHERE
            rentals.user_id='${userId}'
            AND rentals.status='rented'
            AND rentals.rental_id NOT IN (
              SELECT rental_id FROM return_requests WHERE return_status='Pending'
            )
            ORDER BY rent_requests.request_approved_time DESC
        `
        );

      return res
        .status(200)
        .json({ message: "Rented bicycles fetched successfully", data: rentals });
    } 
    catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    } 
    finally {
      connection.close();
    }
  } 
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/getCompletedRentsInfo", verifyJwtToken, async (req, res) => {
  const userId = req.id;

  try {
    const connection = await mysql2.createConnection(db);
    try {
        const [completedRentals] = await connection
        .promise()
        .query(`
        SELECT rentals.*, bicycles.bicycle_name , bicycles.cost_per_hour
        FROM rentals
        JOIN bicycles ON rentals.bicycle_id = bicycles.bicycle_id
        LEFT JOIN return_requests ON rentals.rental_id = return_requests.rental_id
        WHERE rentals.user_id='${userId}' AND rentals.status='completed'
        ORDER BY return_requests.request_approved_time DESC
      `);

      return res
        .status(200)
        .json({ message: "Completed rentals fetched successfully", data: completedRentals });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
