---
aliases:
- 7hk-tff-0fv
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: IAM
security: compliance
source: IAM
title: IAM role uses trusted principals
type: security_rules
---

## Description

Set a principal within your Amazon IAM policy.

## Rationale

A trust policy reduces the risks associated with privilege escalation. Setting a principal within your policy reduces the risk of unauthorized access to a resource.

## Remediation

### Console

Follow the [Editing IAM policies][1] docs to learn how to grant permissions to a specific IAM user or account.

### CLI

Follow the [Editing managed policies (AWS CLI)][2] docs to learn how to grant permissions to a specific IAM or account using the CLI.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html#edit-policies-cli-api
