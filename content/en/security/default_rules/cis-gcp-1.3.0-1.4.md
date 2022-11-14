---
aliases:
- a3b-iz2-p1e
- /security_monitoring/default_rules/a3b-iz2-p1e
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.4
disable_edit: true
integration_id: google_service_account
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_service_account
title: Only GCP-managed service account keys are used for service account
type: security_rules
---

## Description: 
User managed service accounts should not have user-managed keys.

## Rationale: 
Anyone who has access to the keys can access resources through the service account. GCP-managed keys are used by Cloud Platform services such as App Engine and Compute Engine. These keys cannot be downloaded. Google will keep the keys and automatically rotate them on an approximately weekly basis. User-managed keys are created, downloadable, and managed by users. They expire 10 years from creation.
For user-managed keys, you are responsible for key management activities including:
- Key storage
- Key distribution
- Key revocation
- Key rotation
- Protecting the keys from unauthorized users
- Key recovery
Even with key owner precautions, it's easy to leak keys through common development accidents such as checking keys into the source code, leaving them in the Downloads directory, or posting them on support blogs.
For these reasons, it is recommended that you don't use user-managed service account keys.

## Impact: 
Deleting user-managed service account keys may break communication with the applications using the keys.

## Remediation: 

### From the console
1. Go to the IAM page in the GCP Console at [https://console.cloud.google.com/iam-admin/iam][1].
2. In the left navigation pane, click `Service accounts`. All service accounts and their
corresponding keys are listed.
3. Click the service account.
4. Click `Edit` and delete the keys.

### From the command line
To delete a user-managed service account key run:
```
gcloud iam service-accounts keys delete --iam-account=<user-managed-service-account-EMAIL> <KEY-ID>
```
## Prevention:
You can disable service account key creation through the `Disable service account key creation` Organization policy by visiting [https://console.cloud.google.com/iam-admin/orgpolicies/iam-disableServiceAccountKeyCreation][2]. Learn more at: [https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts][3].

In addition, if you do not need service accounts in your project, you can prevent the creation of service accounts through the `Disable service account creation` Organization policy: [https://console.cloud.google.com/iam-admin/orgpolicies/iam-disableServiceAccountCreation][4].

## Default value:
By default, there are no user-managed keys created for user-managed service accounts.

## References:
1. [https://cloud.google.com/iam/docs/understanding-service-accounts#managing_service_account_keys][5]
2. [https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts][6]

## Additional information:
A user-managed key cannot be created on GCP-Managed Service Accounts.

[1]: https://console.cloud.google.com/iam-admin/iam
[2]: https://console.cloud.google.com/iam-admin/orgpolicies/iam-disableServiceAccountKeyCreation
[3]: https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts
[4]: https://console.cloud.google.com/iam-admin/orgpolicies/iam-disableServiceAccountCreation
[5]: https://cloud.google.com/iam/docs/understanding-service-accounts#managing_service_account_keys
[6]: https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts
