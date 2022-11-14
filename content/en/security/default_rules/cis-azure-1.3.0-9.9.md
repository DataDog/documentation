---
aliases:
- uzp-ida-8mt
- /security_monitoring/default_rules/uzp-ida-8mt
- /security_monitoring/default_rules/cis-azure-1.3.0-9.9
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Azure HTTP version is the latest available
type: security_rules
---

## Description

New versions of HTTP are released periodically to address security issues and/or to include additional functionality. Using the latest version of HTTP for web apps takes advantage of security fixes and new functionality.

## Rationale

Using the latest version is recommended in order to take advantage of enhancements and new capabilities. With each software update, your organization needs to determine if the latest update meets your requirements.

For example, HTTP 2.0 has performance improvements for the head-of-line blocking problem, header compression, and prioritization of requests. HTTP 2.0 no longer supports HTTP 1.1's chunked transfer encoding mechanism because it provides its own, more efficient mechanism for data streaming.

## References

1. https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-7-rapidly-and-automatically-remediate-software-vulnerabilities
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-3-establish-secure-configurations-for-compute-resources

## Remediation

### From the console

1. Log into Azure Portal using https://portal.azure.com.
2. Go to **App Services**.
3. Click on each app.
4. Under **Settings**, click *Configuration**.
5. Set HTTP version to 2.0 under **General settings**.

**Note**: Most modern browsers support HTTP 2.0 protocol over TLS, while non-encrypted traffic continues to use HTTP 1.1. To ensure that client browsers connect to your app with HTTP/2, either buy an App Service Certificate for your app's custom domain or bind a third party certificate.

### From the command line

To set the HTTP version to 2.0 for an existing app, run the following command:

`az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --http20-enabled true'`

## CIS Controls

Version 7 2.2 - Ensure Software is Supported by Vendor: Ensure that only software applications or operating systems currently supported by the software's vendor are added to the organization's authorized software inventory. Unsupported software should be tagged as unsupported in the inventory system.
