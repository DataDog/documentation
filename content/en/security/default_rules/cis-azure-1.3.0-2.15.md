---
aliases:
- 4kh-mvl-dpq
- /security_monitoring/default_rules/4kh-mvl-dpq
- /security_monitoring/default_rules/cis-azure-1.3.0-2.15
disable_edit: true
integration_id: azure.security
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.security
title: Azure Security Center is configured to send email notifications about security
  alerts to subscription owners
type: security_rules
---

## Description

Enable security alert emails to subscription owners.

## Rationale

Enabling security alert emails to subscription owners ensures that they receive security alert emails from Microsoft. This ensures that they are aware of any potential security issues and can quickly mitigate security risks.

## Remediation

### From the console

1. Go to Security Center
2. Click on Pricing and Settings
3. Click on the appropriate Management Group, Subscription, or Workspace
4. Click on Email notifications
5. In the drop down of the All users with the following roles field, select Owner
6. Click Save using the Azure Command Line Interface
7. Use the below command to set Send email also to subscription owners:

  ```bash
    get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c ''curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts/default1?api-version=2017-08-01-preview -d@"input.json"
  ```

  Where `input.json` contains the request body JSON data as mentioned below. Replace `validEmailAddress` with email IDs, CSV for multiple.

  ```bash
  { "id""/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/securityContacts/default1", "name""default1", "type""Microsoft.Security/securityContacts", "properties"{ "email""<validEmailAddress>", "alertNotifications""On", "alertsToAdmins""On" } }
  ```

## References

1. https://docs.microsoft.com/en-us/azure/security-center/security-center-provide-security-contact-details
2. https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/list
3. https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/update
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-incident-response#ir-2-preparation--setup-incident-notification

**Note**: Excluding any of the entries in the recommendations block in `input.json` disables the specific setting by default.

## CIS Controls

Version 7 3 Continuous Vulnerability Management Storage Accounts: This section covers security recommendations to follow to set storage account policies on an Azure subscription. An Azure storage account provides a unique namespace to store and access Azure Storage data objects.
