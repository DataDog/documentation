---
aliases:
- t2a-639-7r3
- /security_monitoring/default_rules/t2a-639-7r3
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.8
disable_edit: true
integration_id: google_service_account
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_service_account
title: Separation of duties is enforced while assigning service account related roles
  to users
type: security_rules
---

## Description

Security best practices recommend that the principle of 'Separation of Duties' is enforced while assigning service-account related roles to users. This is achieved by ensuring that no user has the Service Account Admin and Service Account User roles assigned at the same time.

## Rationale

The predefined IAM role ``Service Account admin`` allows the user/identity to
create, delete, and manage service account(s). The predefined IAM role ``Service Account User`` allows the user/identity (with adequate privileges on Compute and App Engine) to assign service account(s) to Apps/Compute instances.

Separation of duties is the concept of ensuring that one individual does not have all
necessary permissions to be able to complete a malicious action. Using Cloud IAM service
accounts, a malicious user could assume the identity of a service account to access resources that
they otherwise cannot access.

Separation of duties is a business control typically used in larger organizations, meant to
help avoid security or privacy incidents and errors. It is considered a best practice.

No user should have ``Service Account Admin`` and ``Service Account User`` roles assigned
at the same time.

## Remediation

1. Go to ``IAM & Admin/IAM`` using [https://console.cloud.google.com/iam-admin/iam][1]
2. For any member having both ``Service Account Admin`` and ``Service Account User`` roles granted/assigned, click the ``Delete Bin`` icon to remove either role from the member.

Removal of a role should be done based on the business requirements.

## Impact

The removed role should be assigned to a different user based on business needs.

## References

1. [https://cloud.google.com/iam/docs/service-accounts][2]
2. [https://cloud.google.com/iam/docs/understanding-roles][3]
3. [https://cloud.google.com/iam/docs/granting-roles-to-service-accounts][4]

## Additional information 

Users granted the Owner (roles/owner) and Editor (roles/editor) roles have privileges
equivalent to Service Account Admin and Service Account User. To avoid misuse,
Owner and Editor roles should be granted to a very limited number of users. Use of these primitive
privileges should be minimal. These requirements are addressed in separate
recommendations.

## CIS controls

Version 8 3.3 - Configure Data Access Control Lists: Configure data access control lists based on a user’s need to know. Apply data
access control lists, also known as access permissions, to local and remote file systems, databases, and applications.

Version 7 14.6 - Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

[1]: https://console.cloud.google.com/iam-admin/iam
[2]: https://cloud.google.com/iam/docs/service-accounts
[3]: https://cloud.google.com/iam/docs/understanding-roles
[4]: https://cloud.google.com/iam/docs/granting-roles-to-service-accounts
