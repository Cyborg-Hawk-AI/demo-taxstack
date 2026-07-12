export type DocStatus = "Requested" | "Received" | "In Review" | "Filed";

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  entityType: string;
  dependents: number;
  priorYearCarryover: number;
  status: "Active" | "Onboarding" | "Filed";
  assignedTo: string;
  lastActivity: string;
  revenue: number;
}

export interface Document {
  id: string;
  clientId: string;
  clientName: string;
  name: string;
  status: DocStatus;
  requestedDate: string;
  receivedDate?: string;
  daysPending: number;
  category: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmed" | "Pending" | "Completed";
  remindersSent: string[];
  preparer: string;
}

export interface ActivityItem {
  id: string;
  type: "signature" | "document" | "appointment" | "email" | "onboarding";
  message: string;
  client: string;
  timestamp: string;
}

export interface OnboardingEmail {
  id: string;
  clientName: string;
  step: number;
  subject: string;
  status: "Sent" | "Scheduled" | "Opened" | "Clicked";
  sentAt: string;
}

export interface SignatureRequest {
  id: string;
  clientName: string;
  document: string;
  status: "Pending" | "Signed" | "Viewed";
  sentDate: string;
  signedDate?: string;
}

export const clients: Client[] = [
  {
    id: "c1",
    name: "Maria Gonzalez",
    email: "maria.g@sunrisebakery.com",
    company: "Sunrise Bakery LLC",
    phone: "(512) 555-0142",
    entityType: "S-Corp",
    dependents: 2,
    priorYearCarryover: 4200,
    status: "Active",
    assignedTo: "Jamie Chen",
    lastActivity: "2 hours ago",
    revenue: 185000,
  },
  {
    id: "c2",
    name: "Robert & Linda Park",
    email: "rlpark@email.com",
    company: "Park Family Trust",
    phone: "(503) 555-0198",
    entityType: "Individual + Trust",
    dependents: 0,
    priorYearCarryover: 12500,
    status: "Onboarding",
    assignedTo: "Jamie Chen",
    lastActivity: "45 min ago",
    revenue: 0,
  },
  {
    id: "c3",
    name: "David Okonkwo",
    email: "david@techflow.io",
    company: "TechFlow Consulting",
    phone: "(415) 555-0231",
    entityType: "Schedule C",
    dependents: 1,
    priorYearCarryover: 0,
    status: "Active",
    assignedTo: "Alex Rivera",
    lastActivity: "Yesterday",
    revenue: 92000,
  },
  {
    id: "c4",
    name: "Elena Vasquez",
    email: "elena@vasquezcpa.com",
    company: "Vasquez Properties",
    phone: "(305) 555-0167",
    entityType: "Partnership",
    dependents: 3,
    priorYearCarryover: 8750,
    status: "Filed",
    assignedTo: "Alex Rivera",
    lastActivity: "3 days ago",
    revenue: 240000,
  },
  {
    id: "c5",
    name: "James & Sarah Mitchell",
    email: "mitchells@home.net",
    company: "Mitchell Household",
    phone: "(617) 555-0289",
    entityType: "Individual (MFJ)",
    dependents: 4,
    priorYearCarryover: 2100,
    status: "Active",
    assignedTo: "Jamie Chen",
    lastActivity: "5 hours ago",
    revenue: 0,
  },
  {
    id: "c6",
    name: "Northwind Dental Group",
    email: "admin@northwinddental.com",
    company: "Northwind Dental PLLC",
    phone: "(206) 555-0312",
    entityType: "Professional Corp",
    dependents: 0,
    priorYearCarryover: 15600,
    status: "Onboarding",
    assignedTo: "Alex Rivera",
    lastActivity: "1 hour ago",
    revenue: 480000,
  },
];

export const documents: Document[] = [
  {
    id: "d1",
    clientId: "c1",
    clientName: "Maria Gonzalez",
    name: "2025 W-2 (Sunrise Bakery)",
    status: "Filed",
    requestedDate: "Jan 8, 2026",
    receivedDate: "Jan 12, 2026",
    daysPending: 0,
    category: "Income",
  },
  {
    id: "d2",
    clientId: "c2",
    clientName: "Robert & Linda Park",
    name: "Trust Distribution Statements",
    status: "Requested",
    requestedDate: "Jul 5, 2026",
    daysPending: 7,
    category: "Trust",
  },
  {
    id: "d3",
    clientId: "c3",
    clientName: "David Okonkwo",
    name: "1099-NEC from clients",
    status: "Received",
    requestedDate: "Jun 28, 2026",
    receivedDate: "Jul 9, 2026",
    daysPending: 0,
    category: "Income",
  },
  {
    id: "d4",
    clientId: "c4",
    clientName: "Elena Vasquez",
    name: "K-1 Partnership Income",
    status: "Filed",
    requestedDate: "Feb 1, 2026",
    receivedDate: "Feb 14, 2026",
    daysPending: 0,
    category: "Partnership",
  },
  {
    id: "d5",
    clientId: "c5",
    clientName: "James & Sarah Mitchell",
    name: "Childcare expense receipts",
    status: "In Review",
    requestedDate: "Jul 1, 2026",
    receivedDate: "Jul 10, 2026",
    daysPending: 0,
    category: "Deductions",
  },
  {
    id: "d6",
    clientId: "c6",
    clientName: "Northwind Dental Group",
    name: "Equipment purchase invoices",
    status: "Requested",
    requestedDate: "Jul 3, 2026",
    daysPending: 9,
    category: "Depreciation",
  },
  {
    id: "d7",
    clientId: "c1",
    clientName: "Maria Gonzalez",
    name: "Q4 estimated tax payments",
    status: "In Review",
    requestedDate: "Jun 20, 2026",
    receivedDate: "Jul 8, 2026",
    daysPending: 0,
    category: "Payments",
  },
  {
    id: "d8",
    clientId: "c3",
    clientName: "David Okonkwo",
    name: "Home office expense log",
    status: "Requested",
    requestedDate: "Jul 6, 2026",
    daysPending: 6,
    category: "Deductions",
  },
];

export const appointments: Appointment[] = [
  {
    id: "a1",
    clientName: "Maria Gonzalez",
    clientEmail: "maria.g@sunrisebakery.com",
    date: "Jul 14, 2026",
    time: "10:00 AM",
    type: "Year-end review",
    status: "Confirmed",
    remindersSent: ["24h SMS", "1h SMS"],
    preparer: "Jamie Chen",
  },
  {
    id: "a2",
    clientName: "Robert & Linda Park",
    clientEmail: "rlpark@email.com",
    date: "Jul 15, 2026",
    time: "2:30 PM",
    type: "Onboarding intake",
    status: "Confirmed",
    remindersSent: ["24h email"],
    preparer: "Jamie Chen",
  },
  {
    id: "a3",
    clientName: "David Okonkwo",
    clientEmail: "david@techflow.io",
    date: "Jul 16, 2026",
    time: "9:00 AM",
    type: "Quarterly check-in",
    status: "Pending",
    remindersSent: [],
    preparer: "Alex Rivera",
  },
  {
    id: "a4",
    clientName: "James & Sarah Mitchell",
    clientEmail: "mitchells@home.net",
    date: "Jul 17, 2026",
    time: "11:30 AM",
    type: "Document review",
    status: "Confirmed",
    remindersSent: ["24h SMS"],
    preparer: "Jamie Chen",
  },
  {
    id: "a5",
    clientName: "Northwind Dental Group",
    clientEmail: "admin@northwinddental.com",
    date: "Jul 18, 2026",
    time: "3:00 PM",
    type: "Entity structure review",
    status: "Confirmed",
    remindersSent: [],
    preparer: "Alex Rivera",
  },
];

export const activities: ActivityItem[] = [
  {
    id: "act1",
    type: "signature",
    message: "Signed Engagement Letter 2026",
    client: "Maria Gonzalez",
    timestamp: "12 min ago",
  },
  {
    id: "act2",
    type: "document",
    message: "Uploaded childcare expense receipts",
    client: "James & Sarah Mitchell",
    timestamp: "45 min ago",
  },
  {
    id: "act3",
    type: "email",
    message: "Onboarding checklist email #2 opened",
    client: "Robert & Linda Park",
    timestamp: "1 hour ago",
  },
  {
    id: "act4",
    type: "appointment",
    message: "Booked year-end review for Jul 14",
    client: "Maria Gonzalez",
    timestamp: "2 hours ago",
  },
  {
    id: "act5",
    type: "onboarding",
    message: "New client created — welcome sequence triggered",
    client: "Northwind Dental Group",
    timestamp: "3 hours ago",
  },
  {
    id: "act6",
    type: "document",
    message: "SMS reminder sent for overdue W-2 request",
    client: "David Okonkwo",
    timestamp: "Yesterday",
  },
];

export const onboardingEmails: OnboardingEmail[] = [
  {
    id: "e1",
    clientName: "Robert & Linda Park",
    step: 1,
    subject: "Welcome to Chen Tax Services — let's get started",
    status: "Opened",
    sentAt: "Jul 8, 2026 9:00 AM",
  },
  {
    id: "e2",
    clientName: "Robert & Linda Park",
    step: 2,
    subject: "Your document checklist for 2025 filing",
    status: "Clicked",
    sentAt: "Jul 9, 2026 9:00 AM",
  },
  {
    id: "e3",
    clientName: "Robert & Linda Park",
    step: 3,
    subject: "Schedule your onboarding call",
    status: "Sent",
    sentAt: "Jul 10, 2026 9:00 AM",
  },
  {
    id: "e4",
    clientName: "Northwind Dental Group",
    step: 1,
    subject: "Welcome to Chen Tax Services — let's get started",
    status: "Opened",
    sentAt: "Jul 12, 2026 2:15 PM",
  },
  {
    id: "e5",
    clientName: "Northwind Dental Group",
    step: 2,
    subject: "Your document checklist for 2025 filing",
    status: "Scheduled",
    sentAt: "Jul 13, 2026 2:15 PM",
  },
];

export const signatureRequests: SignatureRequest[] = [
  {
    id: "s1",
    clientName: "Maria Gonzalez",
    document: "Engagement Letter 2026",
    status: "Signed",
    sentDate: "Jan 5, 2026",
    signedDate: "Jan 6, 2026",
  },
  {
    id: "s2",
    clientName: "Robert & Linda Park",
    document: "IRS Form 8879 Authorization",
    status: "Viewed",
    sentDate: "Jul 9, 2026",
  },
  {
    id: "s3",
    clientName: "David Okonkwo",
    document: "Engagement Letter 2026",
    status: "Pending",
    sentDate: "Jul 7, 2026",
  },
  {
    id: "s4",
    clientName: "James & Sarah Mitchell",
    document: "Form 8879 Authorization",
    status: "Signed",
    sentDate: "Jun 15, 2026",
    signedDate: "Jun 16, 2026",
  },
  {
    id: "s5",
    clientName: "Northwind Dental Group",
    document: "Corporate Engagement Agreement",
    status: "Pending",
    sentDate: "Jul 12, 2026",
  },
];

export const pipelineStats = {
  requested: 3,
  received: 1,
  inReview: 2,
  filed: 2,
};

export const monthlyRevenue = [
  { month: "Feb", amount: 8200 },
  { month: "Mar", amount: 12400 },
  { month: "Apr", amount: 15800 },
  { month: "May", amount: 11200 },
  { month: "Jun", amount: 18600 },
  { month: "Jul", amount: 14200 },
];

export const customFieldTemplates = [
  { id: "f1", name: "Dependents", type: "Number", required: true },
  { id: "f2", name: "Prior-year NOL carryover", type: "Currency", required: false },
  { id: "f3", name: "Entity type", type: "Select", required: true },
  { id: "f4", name: "QBI eligible", type: "Boolean", required: false },
  { id: "f5", name: "Foreign account (FBAR)", type: "Boolean", required: false },
  { id: "f6", name: "Estimated tax payments YTD", type: "Currency", required: false },
];

export const entityOptions = [
  "Individual",
  "Individual (MFJ)",
  "Schedule C",
  "S-Corp",
  "C-Corp",
  "Partnership",
  "Trust",
  "Professional Corp",
];
