---
title: Manage Datadog with Terraform
further_reading:
- link: "/account_management/plan_and_usage/"
  tag: "Documentation"
  text: "Plan and Usage Settings"
- link: "https://www.datadoghq.com/blog/datadog-teams/"
  tag: "Blog"
  text: "Streamline collaboration throughout your organization with Datadog Teams"
---

## Overview

You can use [Terraform][28] to interact with the Datadog API and manage your Datadog organization, child organizations, users, credentials, permissions, and more. This guide provides example use cases for managing Datadog with Terraform, with links to commonly used Datadog resources and data sources in the Terraform registry.

You can also [import][29] your existing resources into your Terraform configuration for future management through Terraform, and reference existing resources as Terraform [data sources][30].

## Setup

If you haven't already, configure the [Datadog Terraform provider][8] to interact with Datadog APIs on your behalf.

## Users, roles, teams, and service accounts

The following resources and data sources enable you to follow the security principle of least privilege, providing only the privileges needed for essential activities to the users, teams, and service accounts operating in your Datadog organizations.

### Users

Create your account's [users][10] and assign them any of the default or [custom roles][9] available. You can also use the [AuthN mapping][20] resource to automatically assign roles to users based on their SAML attributes. You can also import your existing users, roles, and AuthN mappings into your Terraform configuration.

The [user data source][21] can be used to retrieve information about existing users in your Terraform configuration for use in other resources, such as the Datadog team membership resource.

### Roles

Datadog provides three out-of-the-box roles for user permissions, but you can also use the [role resource][18] to create and manage custom roles.

The [role data source][22] can be used to retrieve information about existing roles for use in other resources, such as the Datadog user resource.

### Teams

Use the [Datadog Team][11] resource to associate specific resources with a group of users and filter their Datadog experience to prioritize those resources. Manage team membership with the [team membership][12] resource, and control who can manage the team with the [team permission setting][17] resource.

The [team data source][23] and [team memberships data source][24]can be used to retrieve information about existing teams and team memberships, respectively, for use in other resources.

See the [Teams page][13] for more information.

### Service accounts

The [service account][14] resource provides a non-interactive account that can be used to own [service account application keys][15] and other resources that are shared across your teams. 

The [service account data source][25] can be used to retrieve information about existing service accounts for use in other resources.

See [Service Accounts][16] for more information.

## Credentials

### API and app keys

[API keys][6] allow for the submission of data to your Datadog account, and [Application keys][7] allow resources to be created in your Datadog account. You can also import your existing credentials.

The [API key data source][26] and [application key data source][27] can be used to retrieve information about existing credentials already being managed with Terraform.

## Organizations

Organization-level resources provide the ability to manage organization settings for both single-account and multi-account environments.

### Organization settings

Configure account access and widget sharing capabilities for any of your accounts with the [organization settings][4] resource. For example, you can manage the IdP endpoints, login URLs, and whether or not SAML strict mode is enabled. See [Single Sign On With SAML][5] for more information.

You can also import your existing organization settings into your Terraform configuration.

### Child organizations

<div class="alert alert-info">The Multi-organization Account feature is not enabled by default. Contact <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog support</a> to have it enabled.</div>

If you need to maintain separate, isolated environments, you can create [child orgs][1] under a main parent org. From the parent account, you can track the usage of any associated sub-accounts, and users with access to multiple orgs can switch between them with a single click.

See [Managing Multiple-Organization Accounts][3] for more information.

**Note**: Child orgs do not inherit the SAML configurations of the parent org.

## Restriction policies

Restriction policies are associated to a specific **resource**, and define the level of access provided to roles, teams, or users. Use the [restriction policy][19] resource to create and manage your restriction policies, or import your existing restriction policies into your Terraform configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/child_organization
[2]: /help/
[3]: /account_management/multi_organization/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/organization_settings
[5]: /account_management/saml/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/api_key
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/application_key
[8]: /integrations/terraform/
[9]: /account_management/rbac/?tab=datadogapplication#custom-roles
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/user
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_membership
[13]: /account_management/teams/
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account_application_key
[16]: /account_management/org_settings/service_accounts
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_permission_setting
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[20]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/authn_mapping
[21]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/user
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/role
[23]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team_memberships
[25]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/service_account
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/api_key
[27]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/application_key
[28]: https://www.terraform.io/
[29]: https://developer.hashicorp.com/terraform/cli/import
[30]: https://developer.hashicorp.com/terraform/language/data-sources