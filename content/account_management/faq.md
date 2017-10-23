---
title: Account management FAQ
kind: documentation
autotocdepth: 2
customnav: accountmanagementnav
---

### How do I setup my team in Datadog?

The admin of the account should enter the email addresses of team members
[here][1]. Some team best practices are as follows:

* When the team member receives the confirmation email, they will be provided with a link to log in directly. The user should not click ‘sign up’ during this process.
* If multiple users from the same organization sign up separately, it will create multiple organizations which do not share data. If your team has created multiple organizations and would like to merge them, support can assist in doing so. However, please note that only users are transferred. Data such as metrics or monitors created in the account being merged will not be transferred.
* Users can be placed in one of three permissions categories which include Read Only, Standard, and Administrator. Learn more about those roles [here](/account_management/team/#datadog-user-roles)

* To disable a team member's access to an organization, an admin user must click the “disable” button by a given user's avatar on the team page. Disabled users will remain visible on the [team page](https://app.datadoghq.com/account/team), but in the disabled state. Disabled users/team members will disappear from the admin's team page UI automatically after one month.


### Are my data and credentials safe?

* Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
* All traffic is sent over SSL.
* All communication to Datadog is via HTTPS.
* The full license agreement can be found [here][2].
* The Datadog Agent source code is available [here][3] under an open source software license.
* The installation process for the Datadog Agent and other components may prompt you for your administrative or root credentials. The password is only used to complete the installation process, Datadog does not retain these credentials. If you prefer to see the installation process step-by-step instructions can be found on the [agent installation page](https://app.datadoghq.com/account/settings#agent).

### What is the difference between an Admin and a User in Datadog?

Admins have just a few extra capabilities that standard users do not have. This includes access to billing info, the ability to revoke API keys, removing users, and can configure read-only dashboards. They can also promote standard users to Admins.

### How do I add new users to sub-organizations?

Datadog offers 3 ways to quickly provision users to their respective organizations:

* Batches of users can be added via UI within the [Team tab](/account_management/team)
* [API user creation](/api/#user)
* Use an authentication service like [SAML](/account_management/saml). [Just-In-Time (JIT) provisioning](/account_management/saml/#just-in-time-provisioning-jit-provisioning) can be enabled allowing users with valid single sign-on credentials to have their Datadog organization automatically created when they attempt to log in.

[1]: https://app.datadoghq.com/account/team
[2]: https://github.com/DataDog/datadog-agent/blob/master/LICENSE
[3]: https://github.com/DataDog/datadog-agent