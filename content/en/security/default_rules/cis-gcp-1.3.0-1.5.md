---
aliases:
- t6a-10c-1n8
- /security_monitoring/default_rules/t6a-10c-1n8
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.5
disable_edit: true
integration_id: google_service_account
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_service_account
title: Service Accounts are not bound to built-in Administrative roles
type: security_rules
---

## Description

A service account is a special Google account that belongs to an application or a VM, instead
of to an individual end-user. The application uses the service account to call the service's
Google API so that users aren't directly involved. It's recommended not to use admin roles for ServiceAccount.

## Rationale

Service accounts represent service-level security of the Resources (application or a VM)
which can be determined by the roles assigned to it. Enrolling ServiceAccount with Admin
rights gives full access to an assigned application or a VM. A ServiceAccount Access holder
can perform critical actions like delete, update, and change settings, etc. without user
intervention. For this reason, Datadog recommends that service accounts not have an Admin role.

## Remediation

## From Console:
1. Go to `IAM & admin/IAM` using [https://console.cloud.google.com/iam-admin/iam][1]
2. Go to the `Members`
3. Identify `User-Managed user created service account(s)` with roles containing `*Admin or *admin`
4. Click the `Delete bin` icon to remove the role from the member (service account in this case)


## From Command Line: 

```bash
gcloud projects get-iam-policy PROJECT_ID --format json > iam.json
```

1. Using a text editor, Remove `Role` which contains `roles/ *Admin` or `roles/ *admin`. Add a role to the bindings array that defines the group members and the role for those members.
2. Update the project's IAM policy:

```bash
gcloud projects set-iam-policy PROJECT_ID iam.json
```


## References

1. [https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/][2]
2. [https://cloud.google.com/iam/docs/understanding-roles][3]
3. [https://cloud.google.com/iam/docs/understanding-service-accounts][4] 

## CIS Controls

Version 8 5.4 Restrict Administrator Privileges to Dedicated - Administrator Accounts Restrict administrator privileges to dedicated administrator accounts on enterprise assets. Conduct general computing activities, such as internet browsing, email, and productivity suite use, from the user’s primary, non-privileged account.

Version 7 4.3 - Ensure the Use of Dedicated Administrative Accounts - Ensure that all users with administrative account access use a dedicated or secondary account for elevated activities. This account should only be used for administrative activities and not internet browsing, email, or similar activities.

[1]: https://console.cloud.google.com/iam-admin/iam
[2]: https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/
[3]: https://cloud.google.com/iam/docs/understanding-roles
[4]: https://cloud.google.com/iam/docs/understanding-service-accounts
