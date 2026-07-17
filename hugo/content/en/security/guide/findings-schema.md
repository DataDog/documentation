---
title: Security Findings Schema Reference
description: "Complete reference for the Security Findings schema, including all attributes, namespaces, and data model for querying vulnerabilities, misconfigurations, and security risks."
disable_toc: true
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

Security findings in Datadog represent vulnerabilities, misconfigurations, and security risks identified across your infrastructure and applications. Each finding contains structured data organized into namespaces that describe the nature, impact, status, and context of the security issue.

All findings share a common schema that enables unified querying and analysis across different security products.

## Examples

There are eleven different categories for security findings. Click on a category to view a sample security finding belonging to that category.

{{< include-markdown "security/guide/findings-schema/generated/examples" >}}

## Linking to findings

The direct URL for a finding in Datadog varies by finding type. Use `/security/finding/[finding_id]`, where `[finding_id]` is the root-level `finding_id` value, to open the finding in the appropriate explorer. Use this format when linking to findings from AI agents or automations.

## Schema Reference

The following sections describe all available attributes in the Security Findings schema, organized by namespace.

{{< include-markdown "security/guide/findings-schema/generated/schema-reference" >}}

## Tags

Key-value metadata in the format `name:value`. Enables flexible filtering and grouping of findings. Must include at least `source` and `origin`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
