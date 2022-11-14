---
aliases:
- 0m6-trv-wyi
- /security_monitoring/default_rules/0m6-trv-wyi
- /security_monitoring/default_rules/azure-app-service-enable-always-on
disable_edit: true
integration_id: azure.app_service
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.app_service
title: Azure App Service is set to always on
type: security_rules
---

## Description

Azure App Services has 'always on' **enabled** for web apps.

## Rationale

Enabling 'always on' will enhance your Azure Apps web apps' availability.

## Remediation

### Azure CLI

1. Get a list of your App Services by running the following in Azure Powershell:

    {{< code-block lang="powershell">}}
    az webapp list
	--query '[*].id'
    {{< /code-block >}}
2. Check the config of your web apps with the command:
   
    {{< code-block lang="powershell">}}
    az webapp config show
	--ids "<INSERT_ID>"
	--query 'alwaysOn'
    {{< /code-block >}}
3. Enable the web app's 'always on' capability with the command:

    {{< code-block lang="powershell">}}
    az webapp config set
	--ids "<INSERT_ID>"
	--always-on true
    {{< /code-block >}}
4. Repeat steps one through three for each server that is not configured correctly.
