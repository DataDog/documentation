---
title: Access Your Support Ticket
description: Learn how to create new support tickets and access your existing Datadog support tickets through the Zendesk portal.
aliases:
  - /developers/faq/access-your-support-ticket
  - /account_management/faq/access-your-support-ticket
further_reading:
- link: "/getting_started/support/"
  tag: "Documentation"
  text: "Getting Started with Datadog Support"
---

## Creating a support ticket

To create a new support ticket, click on the appropriate Site link and click **Submit a request** to fill out a ticket form.

{{< whatsnext desc="Support page by Datadog site:">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1, US3, US5, EU, AP1, AP2 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

{{< img src="/account_management/guide/access_your_support_ticket/support_page.png" alt="Datadog Support landing page" style="width:100%;" >}}

You can also access this form through Datadog from the [help page][2], from the left navgiation click on **?** -> **Resources**. Under *Support Tickets & Billing Questions* click on **New Support Ticket**.

## Accessing existing tickets

If you have opened at least one Datadog support ticket, follow this process to access all your Datadog support tickets:
1. From the Support page click **Sign in** on the top right.

2. If this is your first time signing into your Datadog Zendesk account, click the link by **New to your Datadog Zendesk account? Sign up**.

3. If you have previously emailed Datadog support, click **Emailed us for support? Get a password** and enter the same email address you used to contact Datadog support.

4. After you receive the password in your email, log in and click **Manage your tickets** to see your requests:

5. If you don't see the **My Activities** page after logging in, click on your name in the upper right corner, and then click **My Activities**.

6. If you would like to view your entire organization's tickets, submit a request to Datadog support.

{{< whatsnext desc="Support Page by Datadog Site:">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1, US3, US5, EU, AP1, AP2 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

## Password requirements

To ensure the security of your account, any password used to sign in to Datadog's Zendesk support portal must meet the following requirements:

1. Password complexity:
    - Must include at least **12 characters**.
    - Must contain **uppercase and lowercase letters (A-Z)**.
    - Must include at least **one number (0-9)**.
    - Must include at least **one special character** (for example, `!`, `@`, `#`, or `%`).
    - Must **not resemble an email address**.
    - Must **not include the word "Zendesk"**.
1. Failed attempts and lockout:
    - Users are allowed a maximum of **5 attempts** before the account is locked out temporarily.
1. Prohibited sequences:
    - Passwords cannot include more than a specified number of consecutive letters or numbers. For instance, if the limit is set to 4, the system rejects passwords like `admin12345`.
1. Previous passwords:
    - Users cannot reuse a certain number of their previously used passwords.
1. Expiration Policy:
    - Passwords must be updated at least **every 90 days**, or whenever prompted by the system.

## Troubleshooting
### Error: Refused to connect
**Refused to connect** errors come from privacy settings that block third-party cookies. To solve this issue, make sure the browser allows third-party cookies from Zendesk. Find instructions on how to [Clear, enable, and manage cookies in Chrome][1] in Google Chrome Help.

If your browser has ad-blockers, turn them off to see if this allows you to sign in. Some ad-blockers have their own list of exceptions. In this case, add **datadog.zendesk.com** to the allow list.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/chrome/answer/95647
[2]: https://app.datadoghq.com/help
