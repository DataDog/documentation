---
title: Safety Center
is_beta: true
further_reading:
    - link: "/account_management/api-app-keys/"
      tag: "Documentation"
      text: "API and application keys"
    - link: "/account_management/users/"
      tag: "Documentation"
      text: "User management"
    - link: "/account_management/org_settings/oauth_apps"
      tag: "Documentation"
      text: "OAuth Apps"
---

{{< callout url="#" header="false" btn_hidden="true" >}}
  Datadog Safety Center is in public beta.
{{< /callout >}}

## Overview
Datadog's Safety Center in **Organization Settings** is a centralized location for security alerts and best practices. [Administrators][1] of an organization can open this page to review recommendations and take action on high priority security warnings and alerts.

{{< img src="account_management/safety_center/overview.png" alt="Safety Center Overview page" style="width:80%;" >}}

## Security Alerts
If your organization has a high priority security alert, it appears in the **Security Alerts** section of **Safety Center**. Safety Center supports two types of alerts: leaked [application keys][2] and leaked [API keys][3].

A leaked key alert means that one or more private keys (application or API) have been compromised or publicly exposed on the internet. Exposed keys have to be [revoked][4] as soon as possible to minimize security risks to your organization. Removing the file containing the key from a public site such as GitHub **does not** guarantee it was not already accessed by another party.

{{< img src="account_management/safety_center/revoke-leaked-api-key.png" alt="Revoking leaked API key" style="width:70%;" >}}

## Configuration
The **Configuration** tab in **Safety Center** allows setting **Security Contacts** - primary and secondary email addresses to receive security notifications for your Datadog organization. Upon detecting security issues, like publicly exposed Datadog keys needing [rotation][4], your assigned **Security Contacts** gets notified.

{{< img src="account_management/safety_center/set-security-contacts.png" alt="Setting Security Contacts" style="width:70%;" >}}

It is important to keep **Security Contacts** up to date to ensure that potential security risks are promptly addressed and mitigated. The **Safety Center** page reminds you to review assigned **Security Contacts** every 6 months.

## Access & Sharing
The **Access & Sharing** section in **Safety Center** lists entities that allow external access to your Datadog organization. It highlights:

- [**OAuth applications**][5] that have been inactive for 60+ days or have write access and have been inactive for 30+ days.
- [**API keys**][3] that have been unused for 30+ days.

### OAuth Apps
Inactive **OAuth applications** can pose a potential security risk to your organization if compromised. They should be reviewed regularly and those applications that are no longer in use should be disabled.

{{< img src="account_management/safety_center/disable-unused-oauth-app.png" alt="Disabling unused OAuth app" style="width:70%;" >}}

### API Keys
Unused **API keys** can facilitate unauthorized access to your organization if they become exposed on the internet. Unused keys need to be reviewed and revoked if your organization's infrastructure does not rely on them.

{{< img src="account_management/safety_center/revoke-unused-api-key.png" alt="Revoking unused API key" style="width:70%;" >}}

## Users
In order to keep your organization safe it is important to follow best practices for user management. The **Users** page in **Safety Center** surfaces user-related security recommendations:

- [User invites][7] that have not been accepted for 30+ days.
- [Admin users][1] in the event their number exceeds 10% of all users within an organization.

### Pending Invites
Having inactive user accounts or **stale pending user invites** increases the surface for a potential account takeover attack. That can be especially dangerous if inactive user accounts have high-privilege access. To keep the number of inactive users to a minimum consider either resending **old pending invites** or deleting them if those users do not need access to the Datadog platform.

{{< img src="account_management/safety_center/resend-pending-invite.png" alt="Resending pending invite" style="width:70%;" >}}

{{< img src="account_management/safety_center/delete-pending-invite.png" alt="Deleting pending invite" style="width:70%;" >}}

### Admins
Giving **admin access** to users without careful consideration increases potential security risks in the event where a user account with elevated privileges gets compromised. To keep the number of users with **admin access** low, review your admin users regularly and revoke admin privileges if users do not require them.

{{< img src="account_management/safety_center/edit-admin-user.png" alt="Editing admin user" style="width:70%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/#datadog-default-roles
[2]: /account_management/api-app-keys/#application-keys
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#what-to-do-if-an-api-or-application-key-was-exposed
[5]: /account_management/org_settings/oauth_apps
[7]: /account_management/users/#add-new-members-and-manage-invites
