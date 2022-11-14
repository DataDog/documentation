---
aliases:
- 8vn-hqx-oi8
- /security_monitoring/default_rules/8vn-hqx-oi8
- /security_monitoring/default_rules/cis-azure-1.3.0-2.11
disable_edit: true
integration_id: azure.policy
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.policy
title: '''Automatic provisioning of monitoring agent'' is set to ''On'''
type: security_rules
---

## Description

Enable automatic provisioning of the monitoring agent to collect security data.

## Rationale

When automatic provisioning of monitoring agent is turned on, Azure Security Center provisions the Microsoft Monitoring Agent on all existing supported Azure virtual machines and any new ones that are created. The Microsoft Monitoring Agent scans for various security-related configurations and events such as system updates, OS vulnerabilities, endpoint protection, and provides alerts.

## Remediation

### From the console

1. Go to Security Center
2. Click on Pricing & Settings
3. Click on a subscription
4. Click on Data Collection
5. Set Automatic provisioning to On
6. Click save Repeat the above for any additional subscriptions.

### From the command line

Use the below command to set automatic provisioning of monitoring agent:

```bash
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c ''curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/providers/Microsoft.Security/autoProvisioningSettings/default?api-version=2017-08-01-preview -d@"input.json"''
```

Where input.json contains the Request body json data as mentioned below. 

```bash
{ "id""/subscriptions/<Your_Subscription_Id>/providers/Microsoft.Security/autoProvisioningSettings/default", "name""default", "type""Microsoft.Security/autoProvisioningSettings", "properties"{ "autoProvision""On" } }
```

## References

1. https://docs.microsoft.com/en-us/azure/security-center/security-center-data-security 
2. https://docs.microsoft.com/en-us/azure/security-center/security-center-enable-data-collection 
3. https://msdn.microsoft.com/en-us/library/mt704062.aspx
4. https://msdn.microsoft.com/en-us/library/mt704063.aspx
5. https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/list 
6. https://docs.microsoft.com/en-us/rest/api/securitycenter/autoprovisioningsettings/create 
7. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-incident-response#ir-2-preparation--setup-incident-notification

Additional Information: Excluding any of the entries in `input.json` may disable the specific setting by default Microsoft has recently changed APIs to get and Update Automatic Provisioning setting. This recommendation is updated accordingly.

## CIS Controls

Version 7 3.1 - Run Automated Vulnerability Scanning Tools: Utilize an up-to-date SCAP-compliant vulnerability scanning tool to automatically scan all systems on the network on a weekly or more frequent basis to identify all potential vulnerabilities on the organization's systems.
