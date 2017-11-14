---
title: What data from my sub-organizations can I see in my parent account?
kind: faq
customnav: accountmanagementnav
---

Datadog provides options to access system metrics, monitor alerts & multiple cloud accounts across multiple sub-organizations in the parent account as described below.

Cross-Org viewer: Allows a Parent account to be associated with any number of child organizations. These child organizations will automatically forward all system metrics to their Parent account. To enable the cross-org viewer, simply email the [Datadog support team](/help).
Monitor alerts can also be forwarded to the Parent account through the configuration of the [Webhooks integration](/integrations/webhooks) in the child organization combined with the [Datadog Events API](/api). For e.g.: One such webhook configuration would reach out to:
*  `https://app.datadoghq.com/api/v1/events?api_key=<API_KEY>` (the API_KEY associated with the parent account to which the event will be posted)

Access to multiple cloud accounts: Parent accounts can also access the AWS, Azure, and Google Cloud accounts for each of their child organizations through their respective cloud providers’ integrations. Combined with the above Cross-Org viewer this will allow for a more federated setup across multiple teams, users, and groups within Datadog.