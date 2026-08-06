---
title: Creating Access Policies
description: Choose the right access control mechanism for your enterprise and combine them effectively.
further_reading:
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Access Control (RBAC)"
- link: "/account_management/rbac/granular_access"
  tag: "Documentation"
  text: "Granular Access Control"
- link: "/account_management/rbac/data_access"
  tag: "Documentation"
  text: "Data Access Control"
- link: "/account_management/api-app-keys/#scopes"
  tag: "Documentation"
  text: "Application Key Scopes"
- link: "/account_management/org_settings/ip_allowlist/"
  tag: "Documentation"
  text: "IP Allowlist"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Audit Trail"
---

## Overview

The previous sections covered the building blocks of your access strategy: permissions, roles, teams, resource protections, data restrictions, and key management. This section ties them together as a reference for choosing the right enforcement mechanism for a given access need.

## Choosing the right mechanism

Use this decision table to determine which access control mechanism to use:

| What you want to control | Example | Mechanism | How it works |
| :---- | :---- | :---- | :---- |
| Whether a user can use a feature at all | Contractors cannot see any Logs | [Permissions and RBAC][1] | Remove the relevant read or write permission from the user's role. This is an all-or-nothing control per feature. |
| Who can edit or view a specific resource | Only Team A can edit this Dashboard | [Granular Access Control][2] | Set Edit, View, or No Access per resource, targeted at Roles, Teams, or individual users. Applied per resource with UI, API, or Terraform. |
| Which telemetry data a user can see | Only the Payments team can see data from `service:payment-processor` | [Data Access Control][3] | Create a restricted dataset defined by tag values and telemetry type. Assign access to specific Roles or Teams. Enforced across the platform wherever that data appears. |
| What an application key can do | This key should only manage monitors, not read logs | [Application Key Scoping][4] | Scope the application key to specific API endpoints. The key cannot exceed its creator's permissions, but can be restricted further. |
| Which networks can access your Datadog org | Only corporate network IPs | [IP Allowlist][5] | Restrict access to your Datadog org to specific IP ranges, for both the API and UI. Useful for organizations that require network-level access controls as part of their security posture. |

## How the mechanisms layer together

These mechanisms are complementary, not mutually exclusive. A typical enterprise uses several in combination:

1. **Permissions (RBAC)** set the outermost boundary: what features and data types a user can access at all.
2. **Granular Access Control** restricts *specific resources*: a user may be able to view a Dashboard, but only the owning team can edit it.
3. **Data Access Control** restricts *within* an allowed data type: a user may have permission to see Logs, but only Logs tagged with their team's services.
4. **Application Key Scoping** restricts *programmatic access*: even if a user has broad permissions, their automation key may be scoped to a narrow set of API operations.
5. **IP Allowlist** restricts *where* access can come from, regardless of who the user is.

Think of these as concentric rings: each layer narrows the access surface further.

## Governance and auditing

After your access policies are in place, you need visibility into how they are being used and whether they are working as intended.

### Governance Console

The [Governance Console][7] provides a centralized view of your organization's access posture. Use it to identify misconfigurations, track policy coverage, and monitor compliance with your access strategy.

### Audit Trail

The [Audit Trail][6] records changes to your organization's configuration, including role assignments, permission changes, resource access modifications, and key management events. Use it to:

- Investigate who changed an access policy and when
- Verify compliance with internal access reviews
- Detect unexpected changes to sensitive configurations

For organizations with external compliance requirements (SOC 2, ISO 27001, HIPAA), Audit Trail provides the evidence trail needed for access reviews and audit processes.

## Recommendations

- **Use Permissions (RBAC) for broad, feature-level controls.** Don't use RBAC to solve problems that are better handled by Granular Access Control or Data Access Control.
- **Use Granular Access Control for resource-level restrictions.** If the question is "who can *edit* this Dashboard?", granular access is the answer.
- **Use Data Access Control for data-level restrictions.** If the question is "which *data* can this user see?", Data Access Control is the answer.
- **Layer mechanisms.** A user's effective access is the intersection of all applicable controls. Design your policies with this in mind.
- **Enable Audit Trail** and review it periodically, particularly around access-sensitive configurations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/granular_access
[3]: /account_management/rbac/data_access
[4]: /account_management/api-app-keys/#scopes
[5]: /account_management/org_settings/ip_allowlist/
[6]: /account_management/audit_trail/
[7]: /account_management/governance_console/
