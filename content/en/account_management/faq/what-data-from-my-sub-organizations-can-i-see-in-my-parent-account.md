---
title: What data from my sub-organizations can I see in my parent account?
kind: faq
draft: true
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

Datadog provides options to access system metrics, monitor alerts, and multiple cloud accounts across multiple sub-organizations in the parent account as described below.

**Cross-organization viewer**: Allows a parent account to be associated with any number of child organizations. These child organizations automatically forward all system metrics to their parent account. To enable the cross-organization viewer, email the [Datadog support team][1].

Monitor alerts can also be forwarded to the parent account through the configuration of the [webhooks integration][2] in the child organization, combined with the [Datadog Events API][3]. For example, one such webhooks configuration could reach out to `https://api.datadoghq.com/api/v1/events?api_key=<API_KEY>`, where `<API_KEY>` is the API key associated with the parent account to which the event is posted.

**Access to multiple cloud accounts**: Parent accounts can also access the AWS, Azure, and Google Cloud accounts for each of their child organizations through their respective cloud providers' integrations. Combined with the above cross-organization viewer, this allows for a more federated setup across multiple teams, users, and groups within Datadog.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /integrations/webhooks
[3]: /api
