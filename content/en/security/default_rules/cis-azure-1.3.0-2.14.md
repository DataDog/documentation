---
aliases:
- mqv-bcv-0kp
- /security_monitoring/default_rules/mqv-bcv-0kp
- /security_monitoring/default_rules/cis-azure-1.3.0-2.14
disable_edit: true
integration_id: azure.security
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.security
title: Azure Security Center is configured to send email notifications about security
  alerts with High severity
type: security_rules
---

## Description

This rule enables emailing security alerts to the email subscription owner or other designated security contact.

## Rationale

Enabling security alert emails ensures that security alert emails are received from Microsoft. This ensures that the right people are aware of any potential security issues and are able to mitigate the risk.

## Remediation

### From the console

1. Go to Security Center
2. Click on Pricing and Settings
3. Click on the appropriate Management Group, Subscription, or Workspace
4. Click on Email notifications
5. Under Notification types, check the check box next to Notify about alerts with the following severity (or higher) and select High from the drop-down menu
6. Click save using the Azure Command Line Interface
7. Use the below command to set Send email notification for high severity alerts:

  ```bash
  get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c ''curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts/default1?api-version=2017-08-01-preview -d@"input.json"
  ```

  Where `input.json` contains the request body JSON data as mentioned below. And replace `validEmailAddress` with email IDs, CSV for multiple.

  ```bash
  { "id""/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/securityContacts/default1", "name""default1", "type""Microsoft.Security/securityContacts", "properties"{ "email""<validEmailAddress>", "alertNotifications""On", "alertsToAdmins""On" } }
  ```

## References

1. https://docs.microsoft.com/en-us/azure/security-center/security-center-provide-security-contact-details
2. https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/list
3. https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/update
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-incident-response#ir-2-preparation--setup-incident-notification

**Note**: Excluding any of the entries in the recommendations block in `input.json` disables the specific setting by default. Microsoft has recently changed their REST APIs to get and update security contact information. This recommendation is updated accordingly.

## CIS Controls

Version 7 3 Continuous Vulnerability Management
