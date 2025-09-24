import { type User, type InsertUser, type Contact, type InsertContact, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createReview(review: InsertReview): Promise<Review>;
  getReviews(): Promise<Review[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.reviews = new Map();
    
    // Add some initial reviews for demonstration
    this.addInitialReviews();
  }

  private addInitialReviews() {
    const initialReviews: Review[] = [
      {
        id: randomUUID(),
        name: "김영희",
        rating: 5,
        content: "정말 최고의 나이프입니다! 10년 넘게 사용해도 날카로움이 그대로이고, 균형감이 완벽해서 요리하는 즐거움이 배가됩니다.",
        createdAt: new Date("2024-01-15"),
      },
      {
        id: randomUUID(),
        name: "박성진 셰프",
        rating: 5,
        content: "레스토랑에서 매일 사용하는데도 품질이 변함없습니다. 특히 올리브 우드 도마는 자연 항균 효과까지 있어 위생적이에요.",
        createdAt: new Date("2024-02-20"),
      },
      {
        id: randomUUID(),
        name: "이미정",
        rating: 5,
        content: "결혼 선물로 받았는데 너무 만족해요! 디자인도 우아하고 사용할 때마다 이탈리아 장인의 정성이 느껴집니다.",
        createdAt: new Date("2024-03-10"),
      }
    ];

    initialReviews.forEach(review => {
      this.reviews.set(review.id, review);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      phone: insertContact.phone ?? null,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
