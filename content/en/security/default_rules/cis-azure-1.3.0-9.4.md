---
aliases:
- snc-a7f-mi4
- /security_monitoring/default_rules/snc-a7f-mi4
- /security_monitoring/default_rules/cis-azure-1.3.0-9.4
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Web app has 'Client Certificates (Incoming client certificates)' set to 'On'
type: security_rules
---

## Description

Client certificates allow for an app to request a certificate for incoming requests. Only clients that have a valid certificate can reach the app.

## Rationale

The TLS mutual authentication technique in enterprise environments ensures the authenticity of clients to the server. If incoming client certificates are enabled, only an authenticated client who has valid certificates can access the app.

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to App Services
3. Click on each app
4. Under the Settings section, click on Configuration
5. Under Incoming client certificates, set the Client Certificate Mode option to Require.


### From the command line

To set incoming client certificates value for an existing app, run the following command: `az webapp update --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --set clientCertEnabled=true'`

## Impact

Using and maintaining client certificates requires additional work to obtain and manage key replacement and rotation.

## References

1. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-4-encrypt-sensitive-information-in-transit

## CIS Controls

Version 7 14 - Controlled Access Based on the Need to Know
