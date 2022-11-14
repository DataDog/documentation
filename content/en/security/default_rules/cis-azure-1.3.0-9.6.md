---
aliases:
- hqe-t74-yub
- /security_monitoring/default_rules/hqe-t74-yub
- /security_monitoring/default_rules/cis-azure-1.3.0-9.6
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Azure is using the latest version of PHP to run Web Apps
type: security_rules
---

## Description

Periodically, a new version of PHP is released to address security issues and/or to include additional functionality. Using the latest PHP version for web apps is recommended in order to take advantage of security fixes and additional functionalities.

## Rationale

New versions may contain security enhancements and additional functionality. Using the latest software version is recommended in order to take advantage of enhancements and new capabilities. With each software update, organizations need to determine if the update meets their requirements and also verify the new version's compatibility with other software.

## Remediation

### From the console

1. Log into Azure Portal using https://portal.azure.com.
2. Go to **App Services**.
3. Click on each app.
4. Under **Settings**, click **Configuration**.
5. Set PHP version to latest version available under **General Settings**.

**Note**: No action is required if PHP version is set to off because PHP is not used by your web app.

### From the command line
To see the list of supported runtimes, run the following command:

```azurecli
az webapp list-runtimes | grep php To set latest PHP version for an existing app, run the following commandaz webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --php-version <VERSION>
```

## References

1. https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-7-rapidly-and-automatically-remediate-software-vulnerabilities
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-3-establish-secure-configurations-for-compute-resources

# CIS Controls

Version 7 2.2 - Ensure Software is Supported by Vendor: Ensure that only software applications or operating systems currently supported by the software's vendor are added to the organization's authorized software inventory. Unsupported software should be tagged as unsupported in the inventory system.
