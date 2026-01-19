---
title: "Platform Performance Overhaul"
description: "Rearchitected a legacy monolith into a performant microservices platform serving 10M+ requests daily."
outcomeSummary: "Reduced API latency by 60% and cut infrastructure costs by 40%"
pubDate: 2024-06-15
status: featured
role: "Lead Engineer"
company: "Acme Corp"
duration: "4 months"
teamSize: "Team of 3"
tech:
  - TypeScript
  - Node.js
  - PostgreSQL
  - Redis
  - Docker
  - Kubernetes
category: "Backend Infrastructure"
problem: "Legacy monolith couldn't scale. P99 latency exceeded 3 seconds during peak traffic, causing user churn and lost revenue."
constraints:
  - Zero downtime migration
  - Limited engineering bandwidth
  - Must maintain backward compatibility
approach: "Strangler fig pattern to incrementally decompose the monolith, starting with highest-impact endpoints."
metrics:
  - label: "API Latency (P99)"
    value: "180ms"
    change: "-60%"
  - label: "Infrastructure Cost"
    value: "$12k/mo"
    change: "-40%"
  - label: "Deployment Frequency"
    value: "Daily"
    change: "+10x"
  - label: "Error Rate"
    value: "0.01%"
    change: "-95%"
relatedDecisions: []
relatedPosts: []
---

## The Problem

Our legacy Ruby on Rails monolith had served us well for 5 years, but growth exposed fundamental scaling issues. During Black Friday 2023, we hit 500 errors across 15% of requests.

## Key Decisions

### Database Strategy

We chose to keep PostgreSQL as our primary store but introduced Redis for session management and caching. This avoided a risky full migration while addressing the immediate bottleneck.

### Service Boundaries

Rather than diving into microservices ideology, we identified 3 bounded contexts based on actual traffic patterns and team expertise:

1. **User Authentication** - Highest RPS, simplest domain
2. **Order Processing** - Most complex, revenue-critical
3. **Inventory Sync** - Background jobs, tolerable latency

## What I Learned

The strangler fig pattern worked beautifully because it let us prove value incrementally. After migrating auth (2 weeks), stakeholders were sold on the approach, which bought time for the harder problems.
