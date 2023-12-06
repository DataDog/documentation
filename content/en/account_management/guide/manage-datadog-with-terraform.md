---
title: Manage Datadog with Terraform
kind: guide
further_reading:
- link: "/account_management/plan_and_usage/"
  tag: "Documentation"
  text: "Plan and Usage Settings"
- link: "https://www.datadoghq.com/blog/datadog-teams/"
  tag: "Blog"
  text: "Streamline collaboration throughout your organization with Datadog Teams"
---

## Overview

You can use Terraform to interact with the Datadog API and manage your Datadog organization, child organizations, credentials, users, permissions, and more. This guide provides example use cases for managing Datadog with Terraform, with links to commonly used Datadog resources in the Terraform registry.

## Setup

If you haven't already, configure the [Datadog Terraform provider][8] to interact with Datadog APIs on your behalf.

## Organizations

### Organization settings

Configure account access and widget sharing capabilities for any of your accounts with the [organization settings][4] resource. For example, you can manage the IdP endpoints, login URLs, and whether or not SAML strict mode is enabled. See [Single Sign On With SAML][5] for more information.

### Child organizations

<div class="alert alert-info">The Multi-organization Account feature is not enabled by default. Contact <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog support</a> to have it enabled.</div>

If you need to maintain separate, isolated environments, you can create [child orgs][1] under a main parent org. From the parent account, you can track the usage of any associated accounts, and users with access to multiple orgs can switch between them.

See [Managing Multiple-Organization Accounts][3] for more information.

**Note**: Child orgs do not inherit the SAML configurations of the parent org.

## Users, roles, teams, and service accounts

### Users

Create your account's [users][10] and assign them any of the default or [custom roles][9] available. You can also use the [AuthN mapping][20] resource to automatically assign roles to users based on their SAML attributes.

### Roles

Datadog provides three out-of-the-box roles for user permissions, but you can also use the [Role resource][18] to create and manage custom roles.

### Teams

Use the [Datadog Team][11] resource to associate specific resources with a group of users and filter their Datadog experience to prioritize those resources. Manage team membership with the [Team membership][12] resource, and control who can manage the team with the [Team permission setting][17] resource.

See the [Teams page][13] for more information.

### Service accounts

The [Service account][14] resource provides a non-interactive account that can be used to own [Service account application keys][15] and other resources that are shared across your teams.   

See [Service Accounts][16] for more information.

## Credentials

### API and App keys

[API keys][6] allow for the submission of data to your Datadog account, and [Application keys][7] allow resources to be created in your Datadog account.

## Restriction Policies

Restriction policies are associated to a specific **resource**, and define the level of access provided to roles, teams, or users. Use the [restriction policy][19] resource to create and manage your restriction policies.

### Further Reading

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