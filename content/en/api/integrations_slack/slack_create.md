---
title: Create a Slack integration
type: apicontent
order: 19.2
external_redirect: /api/#create-a-slack-integration
---

## Create a Slack integration

Create a Datadog-Slack integration.

**Note**:

* Using the `POST` method updates your integration configuration by **adding** your new configuration to the existing one in your Datadog organization.
* Using the `PUT` method updates your integration configuration by **replacing** your current configuration with the new one sent to your Datadog organization.

##### ARGUMENTS

* **`service_hooks`** [*required*]:
    Array of service hook objects (the service hook is generated for your slack account in your Slack account administration page). A service hook object is composed by:

    * **`account`** [*required*]:
        Your Slack account name.

    * **`url`** [*required*]:
        Your Slack Service Hook URL.

**Note**: **`service_hooks`** are not required in the payload when adding (POST) or updating (PUT) an existing Slack configuration.

* **`channels`** [*required*]:
    Array of slack channel objects to post to. A slack channel object is composed by:

    * **`channel_name`** [*required*]:
        Your channel name e.g: `#general`, `#private`

    * **`transfer_all_user_comments`** [*optional*, *default*=**False**]:
        To be notified for every comment on a graph, set it to `true`. If set to `False` use the `@slack-channel_name` syntax [for comments to be posted to slack][1].

    * **`account`** [*required*]:
        Account to which the channel belongs to.

[1]: /monitors/notifications/#slack-integration
