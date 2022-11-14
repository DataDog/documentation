---
aliases:
- 9xq-bpn-wo5
- /security_monitoring/default_rules/9xq-bpn-wo5
- /security_monitoring/default_rules/azure-app-service-remote-debugging-enabled
disable_edit: true
integration_id: azure.appservice
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.appservice
title: Azure App Service has remote debugging disabled
type: security_rules
---

## Description

Azure App Services has 'remote debugging' **disabled** to enhance security and protect applications.

## Rationale

If remote debugging is enabled, this can allow an attacker access to your applications.

## Remediation

### Azure CLI

1. Get a list of your App Services web apps by running the following in Azure Powershell:

    {{< code-block lang="powershell">}}
    az webapp list
	--query '[*].id'
    {{< /code-block >}}
2.  Check the config of your web apps with the command:

    az webapp config show
	--ids "<INSERT_ID_HERE>"
	--query 'remoteDebuggingEnabled'
3. Disable the web app's remote debugging capability with the command:

    {{< code-block lang="powershell">}}
    az webapp config set
	--ids "<INSERT_ID_HERE>"
	--remote-debugging-enabled false
    {{< /code-block >}}
4. Repeat steps one through three for each server that is not configured correctly.
