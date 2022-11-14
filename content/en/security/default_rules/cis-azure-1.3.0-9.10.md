---
aliases:
- uxp-ida-8mi
- /security_monitoring/default_rules/uxp-ida-8mi
- /security_monitoring/default_rules/cis-azure-1.3.0-9.10
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: FTP deployments are disabled
type: security_rules
---

## Description

By default, Azure functions, web, and API services can be deployed over FTP. If FTP is required for an essential deployment workflow, FTPs should be required for FTP login for all App Service apps and functions.

## Rationale

Azure FTP deployment endpoints are public. An attacker listening to traffic on a Wi-Fi network used by a remote employee or a corporate network could see login traffic in clear-text which would then grant them full control of the code base of the app or service. This finding is more severe if user credentials for deployment are set at the subscription level rather than using the default application credentials which are unique per app.

## Remediation

### From the console

1. Go to the Azure Portal
2. Select App Services
3. Click on an app
4. Select Settings > Configuration
5. Under Platform Settings, set FTP state to Disabled or FTPS Only

## Impact

Deployment workflows that rely on FTP or FTPs rather than the WebDeploy or HTTPs endpoints may be affected.

## References

1. Azure Web Service Deploy via FTP - https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp
2. Azure Web Service Deployment - https://docs.microsoft.com/en-us/azure/app-service/overview-security
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-4-encrypt-sensitive-information-in-transit
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-7-rapidly-and-automatically-remediate-software-vulnerabilities

## CIS Controls

Version 7

14.4 Encrypt All Sensitive Information in Transit
16.5 Encrypt Transmittal of Username and Authentication Credentials - Ensure that all account usernames and authentication credentials are transmitted across networks using encrypted channels.
