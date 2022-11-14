---
aliases:
- hqe-s7l-yub
- /security_monitoring/default_rules/hqe-s7l-yub
- /security_monitoring/default_rules/cis-azure-1.3.0-9.5
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Register with Azure Active Directory is enabled on App Service
type: security_rules
---

## Description

Managed service identity in App Service makes an app more secure by eliminating secrets from the app, such as credentials in the connection strings. When registering with Azure Active Directory in the app service, the app connects to other Azure services securely without the need for a username and password.

## Rationale

App Service provides a highly scalable, self-patching web hosting service in Azure. It also provides a managed identity for apps, which is a turn-key solution for securing access to Azure SQL Database and other Azure services.

## References

1. https://docs.microsoft.com/en-gb/azure/app-service/app-service-web-tutorial-connect-msi
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-identity-management#im-1-standardize-azure-active-directory-as-the-central-identity-and-authentication-system

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to App Services
3. Click on each app
4. Under the Settings section, click on Identity
5. Set Status to On

### From the command line

To set Register with Azure Active Directory for an existing app, run the following command: `az webapp identity assign --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME>'`

## CIS Controls

Version 7 16.2 - Configure Centralized Point of Authentication - Configure access for all accounts through as few centralized points of authentication as possible, including network, security, and cloud systems.
