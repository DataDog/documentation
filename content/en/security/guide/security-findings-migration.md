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

To make it easier to search for security findings throughout Datadog, the syntax for search queries is changing:
- **Standardized naming conventions** for security finding data fields
- **A new schema** to consistently organize those fields across security products

This change comes with a set of [new features](#new-features) that use the new schema, and may also impact your existing workflows. This page details what is changing, the workflows that Datadog automatically updates, and the changes you need to make to avoid interruptions in your existing workflows.

<div class="alert alert-warning">Datadog will start rolling out changes January 28, 2026. You should plan to update any affected workflows in the first half of 2026 to avoid any interruptions as Datadog deprecates the old syntax.
</div>

{{< learning-center-callout header="" btn_title="View the schema" btn_url="/security/guide/findings-schema/" hide_image="true" >}}
  View the new security findings schema so you can understand how finding details will be stored.
{{< /learning-center-callout >}}

### Required action

- If you use certain API endpoints or Terraform resources, **changes will be required**:
  - For [List findings][15] and [Get a finding][16] API endpoints, update your API calls to use the new unified [Search security findings][18] endpoint.
  - For [`datadog_security_notification_rule`][17] Terraform resources with `trigger_source: "security_findings"`, update `query` values to use the new search syntax, starting January 28, 2026.
- If you do not use public APIs or the security findings notification rules terraform resource, **no changes are required**. The following queries are updated automatically in the UI:
  - Explorers
  - Dashboards
  - Notification rules
  - Automation pipelines
  - Workflows

If you need assistance with your migration, contact [Datadog support][14].

## What is changing

### New querying syntax

Following this change, you can use the same query syntax for all security findings, using attributes organized around namespaces. Here are some practical examples:

| Before | After (all findings) |
|--------|----------------------|
| **Misconfigurations:** `@workflow.triage.status:open status:critical`<br>**Library vulnerabilities:** `status:open severity:Critical` | `@status:open @severity:critical` |
| **Misconfigurations:** `@dd_computed_attributes.is_publicly_accessible:true`<br>**Host Vulnerabilities:** `is_publicly_accessible:Accessible` | `@risk.is_publicly_accessible:true` |
| **Library Vulnerabilities:** `library_name:org.apache.logging.log4j`<br>**Host Vulnerabilities:** `package:org.apache.logging.log4j` | `@package.name:org.apache.logging.log4j` |

View the full specification at [Security Findings Schema Reference][1].

### New features

Starting January 28, 2026, the following features will be made available and use the new data model:
- Unified search queries for Cloud Security [Misconfigurations][9], [Identity Risks][10], [Attack Paths][11], [IaC][12], and [API][13] findings
- A new unified [public findings API][18]
- [Dashboard][2] support for Code Security
- Graphing security findings in [Datadog Sheets][3]
- Datadog [Workflow Automation][4] support for all finding types
- Using SQL to query security findings and join them with other Datadog telemetry using [DDSQL Editor][5]

The following additional features will be released later:

- Support for Cloud Security Vulnerabilities and Code Security findings (SCA, SAST, IAST, Secrets) in the unified search experience
- [Data Access Controls][6]
- Security findings & tools in the [Datadog MCP Server][7]
- API & Terraform support for [automation pipelines][8]

### Security findings

Security findings encompass misconfigurations, vulnerabilities, and security risks identified across your infrastructure and applications. This table shows the scope of security findings across Datadog and which findings are supported in the new data model.

<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Finding Type</th>
      <th>Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4"><a href="/security/cloud_security_management/"><strong>Cloud Security</strong></a></td>
      <td>Misconfigurations (CSPM)</td>
      <td>Supported</td>
    </tr>
    <tr>
      <td>Identity risks (CIEM)</td>
      <td>Supported</td>
    </tr>
    <tr>
      <td>Attack paths</td>
      <td>Supported</td>
    </tr>
    <tr>
      <td>Host & container vulnerabilities</td>
      <td>Support coming later</td>
    </tr>
    <tr>
      <td><a href="/security/application_security/"><strong>App & API Protection</strong></a> (Preview)</td>
      <td>API security findings</td>
      <td>Supported</td>
    </tr>
    <tr>
      <td rowspan="5"><a href="/security/code_security/"><strong>Code Security</strong></a></td>
      <td>Infrastructure as code (IaC)</td>
      <td>Supported</td>
    </tr>
    <tr>
      <td>Library vulnerabilities (SCA)</td>
      <td rowspan="4">Support coming later</td>
    </tr>
    <tr>
      <td>Static code vulnerabilities (SAST)</td>
    </tr>
    <tr>
      <td>Runtime code vulnerabilities (IAST)</td>
    </tr>
    <tr>
      <td>Secrets</td>
    </tr>
  </tbody>
</table>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/guide/findings-schema/
[2]: /dashboards
[3]: /sheets
[4]: /actions/workflows
[5]: /ddsql_editor
[6]: /account_management/rbac/data_access
[7]: /bits_ai/mcp_server
[8]: /security/automation_pipelines
[9]: /security/cloud_security_management/misconfigurations/
[10]: /security/cloud_security_management/identity_risks/
[11]: /security/security_inbox/?s=attack%20path#types-of-findings-in-security-inbox
[12]: /security/code_security/iac_security/
[13]: /security/application_security/api-inventory/#api-findings
[14]: /help
[15]: /api/latest/security-monitoring/#list-findings
[16]: /api/latest/security-monitoring/#get-a-finding
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_notification_rule
[18]: https://docs.datadoghq.com/api/latest/security-monitoring/#search-security-findings