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

## Automatic migrations

Every in-app feature will be automatically migrated, including queries created in Datadog explorers, dashboards, notification rules, and automation pipelines. No further action is needed for automatic migrations.

## Required action

API and Terraform resources are not part of automatic migrations. If you are using these resources, you must migrate them to the new version by April 1 to avoid interruptions in your existing workflows.

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
|--------|----------------------|
| **Misconfigurations:** `@workflow.triage.status:open status:critical`<br>**Library vulnerabilities:** `status:open severity:Critical` | `@status:open @severity:critical` |
| **Misconfigurations:** `@dd_computed_attributes.is_publicly_accessible:true`<br>**Host Vulnerabilities:** `is_publicly_accessible:Accessible` | `@risk.is_publicly_accessible:true` |
| **Library Vulnerabilities:** `library_name:org.apache.logging.log4j`<br>**Host Vulnerabilities:** `package:org.apache.logging.log4j` | `@package.name:org.apache.logging.log4j` |

View the full specification here: {insert link}

### New features

Starting January 2026, the following features are rolled out using the new data model:

- A new unified findings public API
- [Dashboard](/dashboards) support for Code Security
- Graphing security findings in [Datadog Sheets](/sheets)
- Datadog [Workflow Automation](/actions/workflows) support for all finding types
- Using SQL to query security findings and join them with other Datadog telemetry using [DDSQL Editor](/ddsql_editor)

With more coming soon:

- [Data Access Controls](/account_management/rbac/data_access)
- Security Findings & tools in the [Datadog MCP Server](/bits_ai/mcp_server)
- API & Terraform support for [automation pipelines](security/automation_pipelines)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
