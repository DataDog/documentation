---
aliases:
- bnj-v0c-ufb
- /security_monitoring/default_rules/bnj-v0c-ufb
- /security_monitoring/default_rules/cis-azure-1.3.0-9.3
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Web app is using the latest version of TLS encryption
type: security_rules
---

## Description

The TLS (Transport Layer Security) protocol secures transmission of data over the internet using standard encryption technology. Encryption should be set with the latest version of TLS. App Service uses TLS 1.2 by default, which is the recommended TLS level by industry standards, such as PCI DSS.

## Rationale

App Service currently allows web apps to set TLS versions 1.0, 1.1 and 1.2. It is highly recommended to use the latest TLS 1.2 version for a secure connection.

## Remediation

### From the console

  1. Login to Azure Portal using https://portal.azure.com
  2. Go to App Services
  3. Click on each app
  4. Under the Settings section, click on SSL settings
  5. Under Protocol Settings, set Minimum TLS Version to 1.2

### From the command line

To set TLS Version for an existing app, run the following command: `az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --min-tls-version 1.2'`

## References

1. https://docs.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-ssl#enforce-tls-versions
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-4-encrypt-sensitive-information-in-transit
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic

## CIS Controls

Version 7 7 - Email and Web Browser Protections
