---
title: Domain Allowlist
private: true
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/organization-settings/domain-allowlist"
  tag: "In the app"
  text: "Domain Allowlist"
- link: "/account_management/org_settings/domain_allowlist_api"
  tag: "Documentation"
  text: "Domain Allowlist API"
---

{{< callout url="https://www.datadoghq.com/private-beta/domain-allowlist/" >}}
  Domain Allowlist is available in <strong>private beta</strong> for customers with Enterprise plans. If you're interested in this feature, complete the form to request access.
{{< /callout >}} 

With [Domain Allowlist][1], you can restrict the email domains that can receive notifications.

When Domain Allowlist is enabled, only email domains in your allowlist can receive monitor notifications. If you try to send a monitor notification to an email domain that is not in your allowlist, a warning appears. 

{{< img src="account_management/org_settings/domain_allowlist/verification.png" alt="Screenshot of monitor settings in the UI, the 'Notify your team' dialog. The notification mentions a Gmail address, but gmail.com is not in the allowlist. A warning appears, reading 'In message: The email domain @gmail.com is not part of the allowed domain list and will not receive this notification.'" >}}

This document describes how to access and modify your allowlist by using the UI. To use the API instead, see [Domain Allowlist API][2].

## Usage

Access your [**Domain Allowlist**][1] under **Organization Settings**. To read or edit your Domain Allowlist, you need the **Org Management** permission.

{{< img src="account_management/org_settings/domain_allowlist/enabled.png" alt="Screenshot showing the Domain Allowlist UI, with the allowlist containing one email domain." >}}

The **Domains Currently In Use** section displays the email domains of all emails mentioned in your monitor notifications. You can configure monitors to send notifications to email domains that are not in your allowlist, but if Domain Allowlist is enabled, email domains that are not in your allowlist do not receive these notifications.


### Enable or disable Domain Allowlist

Use the **Enable** or **Disable** button.

To enable Domain Allowlist, you must add one or more domains to the allowlist. If you remove all domains from the allowlist, Domain Allowlist is automatically disabled.

When Domain Allowlist is disabled, all email domains can receive notifications, even if the allowlist contains domains.

### Add or remove a domain

To add an email domain to the allowlist, enter the domain in the form `@<DOMAIN NAME>.<TOP-LEVEL DOMAIN>`. For example, `@gmail.com`.

To remove a domain from the allowlist, select the delete icon.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/domain-allowlist
[2]: /account_management/org_settings/domain_allowlist_api

