---
aliases:
- psm-gpc-pgy
- /security_monitoring/default_rules/psm-gpc-pgy
- /security_monitoring/default_rules/azure-ad-user-assigned-global-admin-role
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure
security: attack
source: azure
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: Azure AD member assigned Global Administrator role
type: security_rules
---

## Goal
Detect an Azure Active Directory (Azure AD) member being added to the [Global Administrator][1] role.

## Strategy
Monitor Azure AD Audit logs for the following operations:

* `@evt.name:"Add member to role"` 
* `@properties.targetResources.modifiedProperties.newValue:"\"Global Administrator\""`

The Global Administrator role can manage all aspects of Azure AD and Microsoft services that use Azure AD identities. An adversary can add users as Global Administrators in order to maintain access to Azure AD.

## Triage and response
1. Determine if `{{@usr.id}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Begin your organization's incident response (IR) process and investigate.
3. If the API call was made legitimately by the user:
  * Determine if `{{@usr.id}}` was authorized to make the change.
  * Follow Microsoft's [best practices][2] where possible to ensure the user was assigned the correct level of privileges for their function.


[1]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#global-administrator
[2]: https://docs.microsoft.com/en-us/azure/active-directory/roles/best-practices
