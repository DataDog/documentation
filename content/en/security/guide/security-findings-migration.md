---
title: Migrate to the New Security Findings Data Model
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

The syntax for creating queries to search for Security Findings in Datadog is changing. While this change comes with a set of [new features](#new-features) exposing that new schema, it may also impact your existing workflows.

This change affects all interfaces where you can query security findings data:
- Explorers, dashboards, notification rules, and automation pipelines
- Workflow Automation and Sheets
- API and Terraform resources

## Required action

If you are using any of the above features, plan to migrate to the new version by April 1 so you can avoid interruptions in your existing workflows.

Queries created in Datadog explorers, dashboards, notification rules, and automation pipelines are updated automatically, so no action is needed there.

## Security findings

Security findings encompass vulnerabilities, misconfigurations, and security risks identified across your infrastructure and applications.

<table>
  <thead>
    <tr>
      <th><a href="/security/code_security/">Code Security</a></th>
      <th><a href="/security/cloud_security_management/">Cloud Security</a></th>
      <th><a href="/security/application_security/">App & API Protection</a> (Preview)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>Library vulnerabilities (SCA)</li>
          <li>Static code vulnerabilities (SAST)</li>
          <li>Secrets</li>
          <li>Runtime code vulnerabilities (IAST)</li>
          <li>Infrastructure as code (IaC)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Misconfigurations (CSPM)</li>
          <li>Host & container vulnerabilities</li>
          <li>Identity risks (CIEM)</li>
          <li>Attack paths</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>API security findings</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## What is changing

### New querying syntax

Following this change, you can use the same query syntax for all security findings, using attributes organized around namespaces. Here are some practical examples:

| Before | After (all findings) |
|--------|-------|
| **Misconfigurations:** `@workflow.triage.status:open status:critical`<br>**Library vulnerabilities:** `status:open severity:Critical` | `@status:open @severity:critical` |
| **Misconfigurations:** `@dd_computed_attributes.is_publicly_accessible:true`<br>**Host Vulnerabilities:** `is_publicly_accessible:Accessible` | `@risk.is_publicly_accessible:true` |
| **Library Vulnerabilities:** `library_name:org.apache.logging.log4j`<br>**Host Vulnerabilities:** `package:org.apache.logging.log4j` | `@package.name:org.apache.logging.log4j` |

View the full specification here: {insert link}

### New features

Starting January 2026, the following features are rolled out using the new data model:

- A new unified findings public API
- [Dashboard](/dashboards) support for Code Security
- Graphing Security Findings in [Datadog Sheets](/sheets)
- Datadog [Workflow Automation](/actions/workflows) support for all finding types
- Using SQL to query Security Findings and join them with other Datadog Telemetry via [DDSQL Editor](/ddsql_editor)

With more coming soon:

- [Data Access Controls](/account_management/rbac/data_access)
- Security Findings & tools in the [Datadog MCP Server](/bits_ai/mcp_server)
- API & Terraform support for [automation pipelines](security/automation_pipelines)

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
