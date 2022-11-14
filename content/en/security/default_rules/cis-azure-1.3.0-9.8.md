---
aliases:
- hqz-t76-yub
- /security_monitoring/default_rules/hqz-t76-yub
- /security_monitoring/default_rules/cis-azure-1.3.0-9.8
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Azure is using the latest version of Java to run Web Apps
type: security_rules
---

## Description

Periodically, newer versions are released for Java software either due to security flaws or to include additional functionality. Using the latest Java version for web apps is recommended in order to take advantage of security fixes, if any, and new functionalities of the newer version.

## Rationale

Newer versions may contain security enhancements and additional functionality. Using the latest software version is recommended in order to take advantage of enhancements and new capabilities. With each software installation, your organization needs to determine if a given update meets your requirements and also verify the compatibility and support provided for any additional software against the update version.

## References

1. https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-7-rapidly-and-automatically-remediate-software-vulnerabilities
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-3-establish-secure-configurations-for-compute-resources

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to App Services
3. Click on each app
4. Under Settings, click on Application Settings
5. Under General Settings, set Java version to latest version available
6. Set Java minor version to latest version available
7. Set Java web container to the latest version of web container available 

**NOTE**: No action is required if Java version is set to off as Java is not used by your web app.

### From the command line

To see the list of supported runtimes, run the following command: `timesaz webapp list-runtimes | grep java`

To set latest Java version for an existing app, run the following command:

```azurecli
az webapp config set --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --java-version ''
1.8'' --java-container ''Tomcat'' --java-container-version ''<VERSION>'''
```

## CIS Controls

Version 7 2.2 - Ensure Software is Supported by Vendor: Ensure that only software applications or operating systems currently supported by the software's vendor are added to the organization's authorized software inventory. Unsupported software should be tagged as unsupported in the inventory system.
