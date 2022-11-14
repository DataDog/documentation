---
aliases:
- d81-ykz-x3h
- /security_monitoring/default_rules/d81-ykz-x3h
- /security_monitoring/default_rules/cis-azure-1.3.0-2.13
disable_edit: true
integration_id: azure.security
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.security
title: Azure Security Center is configured with a security contact email
type: security_rules
---

## Description

Security Center emails the subscription owners whenever a high-severity alert is triggered for their subscription. You should provide a security contact email address as an additional email address.

## Rationale

Azure Security Center emails the Subscription Owner to notify them about security alerts. Adding your Security Contact's email address to the "Additional email addresses" field ensures that your organization's security team is included in these alerts. This ensures that the proper people are aware of any potential compromise to mitigate the risk in a timely fashion.

## Remediation

### From the console

1. Go to Security Center
2. Click on Pricing and Settings
3. Click on the appropriate Management Group, Subscription, or Workspace
4. Click on Email Notifications
5. Enter a valid security contact email address (or multiple addresses separated by commas) in the additional email addresses field
6. Click Save using the Azure Command Line Interface
7. Use the below command to set security contact emails:

  ``` bash
  get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c ''curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/securityContacts/default1?api-version=2017-08-01-preview -d@"input.json"
  ```

  Where `input.json` contains the request body JSON data, as mentioned below. Replace `validEmailAddress` with email IDs, CSV for multiple.

  ```bash
  { "id""/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/securityContacts/default", "name""default", "type""Microsoft.Security/securityContacts", "properties"{ "email""<validEmailAddress>", "alertNotifications""On", "alertsToAdmins""On" } }
  ```

## References

1. https://docs.microsoft.com/en-us/azure/security-center/security-center-provide-security-contact-details 
2. https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/list 
3. https://docs.microsoft.com/en-us/rest/api/securitycenter/securitycontacts/update 
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-incident-response#ir-2-preparation--setup-incident-notification

**Note**: Excluding any of the entries in the recommendations block in `input.json` disables the specific setting by default.

## CIS Controls

Version 7 3 Continuous Vulnerability Management
