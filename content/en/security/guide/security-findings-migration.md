---
title: Migrating to the New Security Findings Data Model
description: Learn how to migrate to the unified Security Findings query syntax and data model, which consolidates querying across Cloud Security and Code Security findings.
private: true
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Cloud Security"
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Code Security"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Application Security"
---

## Overview

The way Security Findings are queried is changing and it may impact your workflows. You notice changes to how queries are constructed in Datadog. A set of [new features](#new-features) exposing that new schema is also released as a part of the upgrade.

## Required action

If you are using {insert relevant APIs / Terraform resource}, plan to migrate to the new version by {deprecation date}.

Configuration in Datadog is updated automatically, so no action is needed there.

## What are Security Findings

Security Findings encompass vulnerabilities, misconfigurations, and security risks identified across your infrastructure and applications.

### Code Security Findings

- Library Vulnerabilities (SCA)
- Static Code Vulnerabilities (SAST)
- Secrets
- Runtime Code Vulnerabilities (IAST)
- Infrastructure as Code

### Cloud Security Findings

- Misconfigurations (CSPM)
- Host & Container Vulnerabilities
- Identity Risks (CIEM)
- Attack Paths

API security findings are also produced by App & API Protection (in preview).

## What is changing

### New querying syntax

Following this change, all Security Findings start being queried the same way, using shared syntax and attributes organized around namespaces. Here are some practical examples:

| Before | After |
|--------|-------|
| **Misconfigurations:** `@workflow.triage.status:open status:critical`<br>**Library vulnerabilities:** `status:open severity:Critical` | **All findings:** `@status:open @severity:critical` |
| **Misconfigurations:** `@dd_computed_attributes.is_publicly_accessible:true`<br>**Host Vulnerabilities:** `is_publicly_accessible:Accessible` | **All findings:** `@risk.is_publicly_accessible:true` |
| **Library Vulnerabilities:** `library_name:org.apache.logging.log4j`<br>**Host Vulnerabilities:** `package:org.apache.logging.log4j` | **All findings:** `@package.name:org.apache.logging.log4j` |

View the full specification here: {insert link}

Every interface that allows querying security findings data gradually starts using the new data model:

- Explorers, dashboards, notification rules and automation pipelines will use the new syntax
- Workflow Automation
- API & Terraform resources

### New features

Starting January 2026, the following features are rolled out using the new data model:

- A new unified findings public API
- Dashboard support for Code Security
- Graphing Security Findings in Datadog Sheets
- Datadog Workflow Automation support for all finding types
- Using SQL to query Security Findings and join them with other Datadog Telemetry via DDSQL

With more coming soon:

- Data Access Controls
- Datadog Security MCP
- API & Terraform support for automation pipelines

## When is it changing

Products will gradually be onboarded to the new data model:

{{< img src="security/schema-milestones.png" alt="Security Findings migration timeline showing Milestone 1 in January 2026 and Milestone 2 in April 2026" width="100%">}}

### Milestone 1: January 2026

**Migrated Findings** (use new schema):
- Misconfigurations
- Identity Risks
- Attack Paths
- IaC & API Security Findings

**Platform Updates:**
- Dashboards
- DDSQL
- Sheets
- Findings Public API

### Milestone 2: April 2026

**Remaining Findings** (use new schema):
- Cloud Security Vulnerabilities
- Code Security Findings (SCA, SAST, IAST, Secrets)

## How to prepare

- Every in-app feature will be automatically migrated.
- Legacy API endpoints and Terraform resources will eventually be deprecated.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
