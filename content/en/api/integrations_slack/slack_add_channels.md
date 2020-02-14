---
title: Add channels to Slack integration
type: apicontent
order: 20.3
external_redirect: /api/#add-channels-to-slack-integration
---

## Add channels to Slack integration

Add channels to your Datadog-Slack integration.

**ARGUMENTS**:

* **`channels`** [*required*]:
    The array of slack channel objects to post to. A slack channel object is composed by:

    * **`channel_name`** [*required*]:
        Your channel name e.g: `#general`, `#private`

    * **`transfer_all_user_comments`** [*optional*, *default*=**False**]:
        To be notified for every comment on a graph, set it to `true`. If set to `False` use the `@slack-channel_name` syntax [for comments to be posted to slack][1].

    * **`account`** [*required*]:
        Account to which the channel belongs to.

[1]: /monitors/notifications/#slack-integration
