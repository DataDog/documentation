---
aliases:
- sqa-ez2-ojw
- /security_monitoring/default_rules/sqa-ez2-ojw
- /security_monitoring/default_rules/azure-ad-user-assigned-builtin-admin-role
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
title: Azure AD member assigned built-in Administrator role
type: security_rules
---

## Goal
Detect an Azure Active Directory (Azure AD) member being added to a [built-in Administrative role][1].

## Strategy
Monitor Azure AD Audit logs for the following operations:

* `@evt.name:"Add member to role"` 
* `@properties.targetResources.modifiedProperties.newValue:*Administrator*`

Azure AD uses roles to assign privileges to users. There are over 80 roles available, the list below details some of the highest privileged roles that adversaries could target:

* [Application Administrator][2]
* [Cloud Application Administrator][3]
* [Exchange Administrator][4]
* [Privileged Role Administrator][5]
* [User Administrator][6]
* [Sharepoint Administrator][7]
* [Hybrid Identity Administrator][8]

This [whitepaper][9] from Mandiant describes the abuse of Azure AD privileged roles.

## Triage and response
1. Determine if `{{@usr.id}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Begin your organization's incident response (IR) process and investigate.
3. If the API call was made legitimately by the user:
  * Determine if `{{@usr.id}}` was authorized to make the change.
  * Follow Microsoft's [best practices][10] where possible to ensure the user was assigned the correct level of privileges for their function.


[1]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference
[2]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#application-administrator
[3]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#cloud-application-administrator
[4]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#exchange-administrator
[5]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#privileged-role-administrator
[6]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#user-administrator
[7]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#sharepoint-administrator
[8]: https://docs.microsoft.com/en-us/azure/active-directory/roles/permissions-reference#hybrid-identity-administrator
[9]: https://www.fireeye.com/content/dam/fireeye-www/blog/pdfs/wp-m-unc2452-2021-000343-01.pdf
[10]: https://docs.microsoft.com/en-us/azure/active-directory/roles/best-practices
