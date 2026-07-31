---
title: Manage Your Support Tickets
description: Learn how to create and manage Datadog support tickets, including on the GovCloud support portal.
aliases:
  - /developers/faq/access-your-support-ticket
  - /account_management/faq/access-your-support-ticket
  - /account_management/guide/access-your-support-ticket
further_reading:
- link: "/getting_started/support/"
  tag: "Documentation"
  text: "Getting Started with Datadog Support"
---

<div class="alert alert-info">Select your Datadog site to see instructions for your support portal.</div>

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

## Create a support ticket

To create a new support ticket, navigate to the [Datadog support site][1]. At the bottom of the page, click **Create a New Ticket** to fill out a ticket form.

You can also access this form through Datadog. From the left navigation, hover over **Help** and click **Support**. Alternatively, navigate to the [Datadog help page][2] and click **New Support Ticket**.

## Access existing tickets

If you have opened at least one Datadog support ticket, follow this process to access all your Datadog support tickets:

1. From the [Support page][1], click **Sign in** on the top right.
1. If this is your first time signing into your Datadog Zendesk account, click **New to your Datadog Zendesk account? Sign up**.
1. If you have previously emailed Datadog support, click **Emailed us for support? Get a password** and enter the email address you used to contact Datadog support.
1. After you receive the password in your email, log in and click **Manage your tickets** to see your requests.
1. If you don't see the **My Activities** page after logging in, click on your name in the upper right corner, and then click **My Activities**.
1. To view your entire organization's tickets, submit a request to Datadog support.

## Password requirements

To help ensure the security of your account, any password used to sign in to Datadog's Zendesk support portal must meet the following requirements:

- Password complexity
   - Must include at least **12 characters**.
   - Must contain **uppercase and lowercase letters (A-Z)**.
   - Must include at least **one number (0-9)**.
   - Must include at least **one special character** (for example, `!`, `@`, `#`, or `%`).
   - Must **not resemble an email address**.
   - Must **not include the word "Zendesk"**.
- Prohibited sequences
   - Passwords cannot include more than a specified number of consecutive letters or numbers. For instance, if the limit is set to 4, the system rejects passwords like `admin12345`.
- Previous passwords
   - Users cannot reuse a certain number of their previously used passwords.
- Expiration policy
   - Passwords must be updated at least **every 90 days**, or whenever prompted by the system.
- Failed attempts and lockout
   - Users are allowed a maximum of **5 attempts** before the account is locked out temporarily.

## Troubleshooting

### Error: Refused to connect

**Refused to connect** errors come from privacy settings that block third-party cookies. To solve this issue, make sure the browser allows third-party cookies from Zendesk. Find instructions on how to [Clear, enable, and manage cookies in Chrome][3] in Google Chrome Help.

If your browser has ad-blockers, turn them off to see if this allows you to sign in. Some ad-blockers have their own list of exceptions. In this case, add **datadog.zendesk.com** to the allow list.

### Ticket is no longer available

Datadog deletes closed tickets, including their attachments, 15 months after their last update.

If you need help with a related issue, you can open a new ticket or search the Datadog documentation.

{{% /site-region %}}

{{% site-region region="gov,gov2" %}}

## Prerequisites

To receive registration verification codes, password reset emails, and case notification emails, add the `ddog-gov.com` domain to your email allowlist. This includes `help@ddog-gov.com` and `support@ddog-gov.com`.

## Register on the portal

If you are a first-time user, follow these steps to register an account:

1. Navigate to [the Datadog GovCloud support portal][4].
1. Click **Sign Up**.
1. Complete the registration form using the email address associated with your existing GovCloud Datadog account. Keep this page open.
1. In a separate browser tab, access your email account. Open the verification email from `help@ddog-gov.com` and copy the verification code.
1. In the Datadog GovCloud support portal, enter the verification code.
1. Click **Verify**.

**Note**: After registration, your login username is your email with `.ddgov.support` appended (for example, `[name]@[domain].ddgov.support`). Use this full username when logging in.

## Create a case

To create a case:

1. Navigate to [the Datadog GovCloud support portal](https://govsupport.ddog-gov.com).
1. Log in with the username format `[name]@[domain].ddgov.support`.
1. Click **Create a New Case**.
1. Complete the form.
1. Click **Submit & Upload Files**.
1. Optionally, upload supporting files. Accepted file types include `.txt`, `.csv`, `.xls`, `.xlsx`, `.doc`, `.otf`, `.yaml`, `.log`, `.conf`, `.tf`, `.zip`, `.pcap`, `.png`, and `.jpeg`.
1. Click **Submit**.

## Access existing cases

If you have opened at least one Datadog case, follow this process to access your cases:

1. Log in at [the Datadog GovCloud support portal][4].
1. Change the filter from **Recently Viewed** to **Cases** to view all cases.
1. Click **Case Number** or **Subject** to view details.

**Note**: Historical Zendesk cases are not migrated; legacy Zendesk is read-only.

## Troubleshooting

### Cannot see new cases

Change the filter from **Recently Viewed** to **Cases**.

### Login issues

Make sure your full username includes the `.ddgov.support` suffix.

### Password reset not received

Click **Forgot Password** and follow the process with your full username (with the `.ddgov.support` suffix). If you still do not receive the email, add `ddog-gov.com` to your email allowlist.

### Registration error

Your account may already exist. Click **Forgot Password** and enter your full username, including the `.ddgov.support` suffix (for example, `[name]@[domain].ddgov.support`). If you are still unable to access your account, contact `support@ddog-gov.com`.

{{% /site-region %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.datadoghq.com/
[2]: https://app.datadoghq.com/help
[3]: https://support.google.com/chrome/answer/95647
[4]: https://govsupport.ddog-gov.com
