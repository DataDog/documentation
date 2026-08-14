---
title: Custom IaC Rules
description: Create, test, and publish custom Infrastructure as Code Security rules with Rego.
algolia:
  tags: ['iac security', 'infrastructure as code', 'custom rule', 'rego']
further_reading:
  - link: "/security/code_security/iac_security/custom_rules/tutorial/"
    tag: "Documentation"
    text: "Create your first custom IaC rule"
  - link: "/security/code_security/iac_security/custom_rules/guide/"
    tag: "Documentation"
    text: "Custom IaC rule reference"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "Explore IaC Security rules"
---

## Overview

You can create custom Infrastructure as Code (IaC) Security rules to enforce requirements specific to your organization. Custom rules use [Rego][1], the policy language from Open Policy Agent (OPA), and run alongside Datadog's default rules during IaC scans.

Custom rules support the following platforms:

- Ansible
- CI/CD (GitHub Actions)
- AWS CloudFormation
- Dockerfile
- Kubernetes
- Terraform

## Choose how to start

Create a rule from scratch when you need a focused check and understand the parsed structure for the selected platform. The editor provides a starter policy and sample file.

Clone a default rule when you want to:

- Modify an existing check.
- Evaluate the same resource type as an existing rule.
- Use Datadog's shared Rego libraries for platform-specific parsing, resource naming, or source-code locations.

For a guided example, see [Create Your First Custom IaC Rule][2]. For the rule contract, platform input patterns, shared libraries, and finding locations, see the [Custom IaC Rule Reference][3].

## Clone a rule

1. On the [IaC Rules][4] page, find a default or custom rule for the same platform and resource type.
2. Select {{< ui >}}Clone{{< /ui >}} from the rule's actions menu.
3. Update the copied metadata, policy, sample file, and description.
4. Save the rule as a draft or publish it.

## Drafts, published rules, and revisions

For a rule to run in IaC scans, it must be published. You can save a rule as a draft and publish it later from the rule's details panel.

Updating a rule creates a revision. You can review previous revisions and restore an earlier version from the rule's details panel.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/latest/policy-language/
[2]: /security/code_security/iac_security/custom_rules/tutorial/
[3]: /security/code_security/iac_security/custom_rules/guide/
[4]: https://app.datadoghq.com/security/code-security/detection-coverage/iac
