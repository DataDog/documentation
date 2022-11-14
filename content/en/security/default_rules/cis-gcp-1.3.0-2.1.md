---
aliases:
- 3p1-trc-o1j
- /security_monitoring/default_rules/3p1-trc-o1j
- /security_monitoring/default_rules/cis-gcp-1.3.0-2.1
disable_edit: true
integration_id: google_iam_policy
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_iam_policy
title: Audit logging is properly configured across all services and users in a project
type: security_rules
---

## Description
It is recommended that Cloud Audit Logging is configured to track all admin activities and
read or write access to user data.

### Default value
Admin Activity logs are always enabled. They cannot be disabled. Data Access audit logs are
disabled by default because they can be quite large.

## Rationale
Cloud Audit Logging maintains two audit logs for each project, folder, and organization:
**Admin Activity** and **Data Access**.

Admin Activity logs contain log entries for API calls or other administrative actions
that modify the configuration or metadata of resources. Admin Activity audit logs
are enabled for all services and cannot be configured.

Data Access audit logs record API calls that create, modify, or read user-provided
data. These are disabled by default and should be enabled.

There are three kinds of Data Access audit log information:
* Admin read: Records operations that read metadata or configuration
information. Admin Activity audit logs record writes of metadata and
configuration information. This cannot be disabled.
* Data read: Records operations that read user-provided data.
* Data write: Records operations that write user-provided data.

It is recommended to configure audit logging such that:

* Log type is set to `DATA_READ` (to log user activity tracking) and `DATA_WRITES` (to
log changes/tampering to user data).
* Audit config is enabled for all the services supported by the Data Access audit logs
feature.
* Logs are captured for all users—that is, there are no exempted users in any of the
audit config sections. This ensures overriding the audit config does not contradict
the requirement.

### Impact
There is no charge for Admin Activity audit logs. Enabling the Data Access audit logs might
result in your project being charged for the additional logs usage.
- Note: Admin Activity Logs are not listed here, as they are enabled by default and cannot be disabled.
  `exemptedMembers` is not set, as audit logging should be enabled for all users.

## Remediation

### From the console 
1. Go to the [Audit Logs page][1] in Google Cloud Console.
2. Follow the steps in Google's [Configure Data Access audit logs][2] documentation to enable audit logs for all Google Cloud services. Ensure that no exemptions are allowed.

### From the command line
1. To read the project's IAM policy and store it in a file, run the following command:
   ```
   gcloud projects get-iam-policy PROJECT_ID > /tmp/project_policy.yaml
   ```
Alternatively, the policy can be set at the organization or folder level. If you are setting the policy at
the organization level, it is not necessary to also set it for each folder or project.
   ```
   gcloud organizations get-iam-policy ORGANIZATION_ID > /tmp/org_policy.yaml
   gcloud resource-manager folders get-iam-policy FOLDER_ID >
   /tmp/folder_policy.yaml
   ```
2. Edit the policy in `/tmp/policy.yaml`. Adding or change only the audit logs
configuration to:
   ```
   auditConfigs:
    - auditLogConfigs:
     - logType: DATA_WRITE
     - logType: DATA_READ
    - service: allServices
   ```

3. To write new IAM policy, run the following commands:
   ```
   gcloud organizations set-iam-policy ORGANIZATION_ID /tmp/org_policy.yaml
   gcloud resource-manager folders set-iam-policy FOLDER_ID
   /tmp/folder_policy.yaml
   gcloud projects set-iam-policy PROJECT_ID /tmp/project_policy.yaml
   ```
If the preceding command reports a conflict with another change, then repeat these steps,
starting with the first step.

## Additional information
* To track detailed user activities, the log type `DATA_READ` is as important as the log type `DATA_WRITE`.
* BigQuery Data Access logs are handled differently than other data access logs.
  BigQuery logs are enabled by default and cannot be disabled. They do not count against logs allotment and do not result in extra logs charges.

## References
1. [https://cloud.google.com/logging/docs/audit/][1]
2. [https://cloud.google.com/logging/docs/audit/configure-data-access][2]

[1]: https://cloud.google.com/logging/docs/audit/
[2]: https://cloud.google.com/logging/docs/audit/configure-data-access
