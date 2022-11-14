---
aliases:
- ef6-b9h-pg2
- /security_monitoring/default_rules/ef6-b9h-pg2
- /security_monitoring/default_rules/cis-azure-1.3.0-9.2
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Web app redirects all HTTP traffic to HTTPS in Azure App Service
type: security_rules
---

## Description

Azure Web Apps allow sites to use both HTTP and HTTPS by default. Web apps can be accessed by anyone using non-secure HTTP links by default. Non-secure HTTP requests can be restricted and all HTTP requests redirected to the secure HTTPS port. It is recommended to enforce HTTPS-only traffic.

## Rationale

Enabling HTTPS-only traffic redirects all non-secure HTTP request to HTTPS ports. HTTPS uses the SSL/TLS protocol to provide a secure connection, which is both encrypted and authenticated, so it is important to support HTTPS for the security benefits.

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to App Services
3. Click on each app
4. Under the Settings section, click on SSL settings
5. Under Protocol Settings, set HTTPS Only to On.

### From the command line

To set the HTTPS-only traffic value for an existing app, run the following command: `az webapp update --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --set httpsOnly=true'`

## Impact

When enabled, every incoming HTTP request is redirected to the HTTPS port. This adds an extra level of security to the HTTP requests made to the app.

## References

1. https://docs.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-ssl#enforce-https
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-4-encrypt-sensitive-information-in-transit
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic

## CIS Controls

Version 7 7 - Email and Web Browser Protections
