---
title: Configuring Teams & Organizations with Multiple Accounts
kind: documentation
autotocdepth: 2
aliases:
  - /guides/multiaccountorg
customnav: accountmanagementnav
---

There are two ways to have multiple accounts have access to the same data. First, you can simply add multiple users to the same team from the [Team Page][1]. The second is through the use of organizations. Organizations are typically used by Managed Service Providers which have multiple large scale customers which should not have access to each others' data. When a user is added to multiple organizations, they will be able to quickly switch between orgs from the avatar menu in the main menu.

{{< img src="account_management/multi_account/guides-multacct-switchaccts.png" alt="Switch Accounts" responsive="true" >}}

## Organizations

The Multi-Account Organizations feature must be enabled by support. If this is a feature you need, please contact support at [support@datadoghq.com][2].

### Create a New Organization

1. After the feature has been enabled, visit the [New Account Page][3].

2. Enter the name of the organization you wish to create and click the **Create** button. **The organization name cannot exceed 32 characters.**

{{< img src="account_management/multi_account/guides-multacct-createorg.png" alt="Create Org" responsive="true" >}}

A new trial account will be created. If you wish to add this account to your existing billing settings, please contact your sales representative.

### Leave an Organization

1. Go to your [Account Profile page][4].
2. Scroll down to Organizations and click **Leave** next to the org you want to leave.


{{< img src="account_management/multi_account/guides-multacct-leaveorg.png" alt="Leave Org" responsive="true" >}}

To add, disable, and promote members, see the instructions for [Teams](/account_management/team).

## Switch between Organization

For users that belong to more than one Datadog organization, it's possible to switch to another organization from any page by hovering over your avatar in the lower left hand corner.

Once the menu appears, you can transition to the other Datadog accounts you're associated to:
{{< img src="account_management/multi_account/Switch_Accounts.jpg" alt="Switch Accounts" responsive="true" >}}

## Custom domains for each sub-organizations


Please email [the Datadog support team](/help) to enable custom subdomains.

Custom sub-domains allows for easy differentiation of the source of notifications and easy switching between organizations when logged in as a member of multiple Datadog organizations.

Custom sub-domains can be especially helpful as when an alert link is generated, (https://account-a.datadoghq.com/event/event?id=<id>) it will always point to a particular Datadog account, whereas the regular alert link (https://app.datadoghq.com/event/event?id=<id>) will only look for the event in the account the user is currently logged into and can cause an unexpected 404 error.


[1]: https://app.datadoghq.com/account/team
[2]: mailto:support@datadoghq.com
[3]: https://app.datadoghq.com/account/new_org
[4]: https://app.datadoghq.com/account/profile