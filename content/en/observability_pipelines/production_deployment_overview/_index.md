---
title: Production Deployment Overview
kind: Documentation
---

## Overview

This article walks you through architectural best practices for deploying Observability Pipelines Worker into production environments. It goes through [guidelines](#guidelines) for common deployment mistakes, the different Observability Pipelines Worker [deployment roles](#deployment-roles), and an overview of the three [reference architectures](#reference-architectures). 

## Guidelines

### Start with one aggregator

Most users of Observability Pipelines Worker have complex production environments with many clusters, services, and observability tools. A common mistake is to plan multiple Observability Pipelines Worker deployments instead of starting with one. Datadog recommends to start by deploying a single Observability Pipelines Worker aggregator and onboarding one service at a time. This allows you to get set up quickly and gain experience operating Observability Pipelines Worker before adopting more complex deployment strategies. 

 ## Deployment roles

 The Observability Pipelines Worker can be deployed anywhere in your infrastructure as an agent or an aggregator.

 ### Agent role

 As an agent, the Observability Pipelines Worker is deployed on each individual node, shifting data collection and processing to the edge.

 Data can be received from other agents on the same node (for example, from the Datadog Agent) or collected directly from the node itself (for example, tailing log files). The goal is to centralize egress on the node through the Observability Pipelines Worker and take advantage of underutilized edge resources. Most users can deploy Observability Pipelines Worker as an agent without increasing their provisioned resources.

### Aggregator role

As an aggregator, the Observability Pipelines Worker is deployed as a standalone service on dedicated nodes, shifting data processing and routing to the dedicated nodes.

Agents are configured to forward data to your Observability Pipelines Worker aggregators. Datadog recommends this role for users looking to get started with Observability Pipelines Worker because it is easy to set up and integrate into any infrastructure.

 ## Reference architectures

 There are three common reference architectures that demonstrate how the two deployment roles can work in your infrastructure:

 - **Aggregator architecture (recommended)**: Datadog recommends this architecture for new users of Observability Pipelines Worker. It deploys Observability Pipelines Worker on its own dedicated nodes for easy setup and centralized processing.
 - **Agent architecture**: This architecture deploys Observability Pipelines Worker along the edge as an agent for local data processing, taking advantage of underutilized edge resources.
 - **Unified architecture**: This architecture combines the agent and aggregator architectures. Datadog recommends evolving towards this architecture after starting with the aggregator architecture.
