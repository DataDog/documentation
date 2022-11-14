---
aliases:
- a4b-i32-c46
- /security_monitoring/default_rules/a4b-i32-c46
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.6
disable_edit: true
integration_id: google_service_account
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_service_account
title: IAM users are not assigned the Service Account User or Service Account Token
  Creator roles at project level
type: security_rules
---

## Description
Verify that users have the Service Account User (`iam.serviceAccountUser`) and Service Account Token Creator (`iam.serviceAccountTokenCreator`) roles for a specific service account rather than at the project level.

## Rationale
A service account is a special Google account that belongs to an application or a virtual machine (VM), instead of to an individual end user. Application/VM-Instance uses the service account to call the service's Google API so that users aren't directly involved. In addition to being an identity, a service account is a resource that has IAM policies attached to it. These policies determine who can use the service account.
Users with IAM roles to update the App Engine and Compute Engine instances (such as App Engine Deployer or Compute Instance Admin) can effectively run code as the service accounts used to run these instances, and indirectly gain access to all the resources for which the service accounts have access. Similarly, SSH access to a Compute Engine instance may also provide the ability to execute code as that instance/service account.
Based on business needs, there can be multiple user-managed service accounts configured for a project. Granting the `iam.serviceAccountUser` or `iam.serviceAccountTokenCreator` roles to a user for a project gives the user access to all service accounts in the project, including service accounts that may be created in the future. These roles can result in an elevation of privileges when someone uses a service account and corresponding Compute Engine instances.
In order to implement least privileges best practices, IAM users should not be assigned the Service Account User or Service Account Token Creator roles at the project level. Instead, these roles should be assigned to a user for a specific service account, giving that user access to the service account. The Service Account User role allows a user to bind a service account to a long-running job service, whereas the Service Account Token Creator role allows a user to directly impersonate (or assert) the identity of a service account.

## Impact
After revoking Service Account User or Service Account Token Creator roles at the project level from all impacted user accounts, these roles should be assigned to users for specific service accounts according to business needs.

## Remediation

### From the console
1. Go to the [IAM page][1] in the GCP Console.
2. In the filter table text bar, enter the text `Role: Service Account User`.
3. Click the delete bin icon in front of the role `Service Account User` for every user
listed as a result of the filter.
4. In the filter table text bar, enter the text `Role: Service Account Token Creator`.
5. Click the delete bin icon in front of the role `Service Account Token Creator` for
every user listed as a result of the filter.

### From the command line
1. Using a text editor, remove the bindings with the `roles/iam.serviceAccountUser` or `roles/iam.serviceAccountTokenCreator`.
   For example, you can use the iam.json file shown below as follows:
   ```
   {
    "bindings": [
    {
    "members": [ "serviceAccount:our-project-123@appspot.gserviceaccount.com",
    ],
    "role": "roles/appengine.appViewer" },
    {
        "members": [
        "user:email1@gmail.com"
        ],
    "role": "roles/owner"
    },
    {
        "members": [
    "serviceAccount:our-project-123@appspot.gserviceaccount.com",
    "serviceAccount:123456789012-compute@developer.gserviceaccount.com" ],
        "role": "roles/editor"
    }
    ],
    "etag": "BwUjMhCsNvY="
    }
    ```
2. Update the project's IAM policy:
   ```
   gcloud projects set-iam-policy PROJECT_ID iam.json
   ```
## Default value
By default, users do not have the Service Account User or Service Account Token Creator role assigned at the project level.

## References
1. [https://cloud.google.com/iam/docs/service-accounts][2]
2. [https://cloud.google.com/iam/docs/granting-roles-to-service-accounts][3]
3. [https://cloud.google.com/iam/docs/understanding-roles][4]
4. [https://cloud.google.com/iam/docs/granting-changing-revoking-access][5]
5. [https://console.cloud.google.com/iam-admin/iam][6]


## Additional Information
A user-managed key cannot be created on GCP-Managed Service Accounts.

[1]: https://console.cloud.google.com/iam-admin/iam
[2]: https://cloud.google.com/iam/docs/service-accounts
[3]: https://cloud.google.com/iam/docs/granting-roles-to-service-accounts 
[4]: https://cloud.google.com/iam/docs/understanding-roles
[5]: https://cloud.google.com/iam/docs/granting-changing-revoking-access 
[6]: https://console.cloud.google.com/iam-admin/iam
