import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "유효하지 않은 입력 데이터입니다.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "문의 등록 중 오류가 발생했습니다." 
        });
      }
    }
  });

  // Get all contacts (admin functionality)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "문의 목록을 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  // Review submission
  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.json({ success: true, review });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "유효하지 않은 입력 데이터입니다.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "리뷰 등록 중 오류가 발생했습니다." 
        });
      }
    }
  });

  // Get all reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "리뷰 목록을 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
