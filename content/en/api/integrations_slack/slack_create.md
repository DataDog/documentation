---
title: Create a Slack integration
type: apicontent
order: 20.2
external_redirect: /api/#create-a-slack-integration
---

## Create a Slack integration

Create a Datadog-Slack integration. Once created, add a channel to it with the [Add channels to Slack integration endpoint](#add-channels-to-slack-integration).

**Note**:

* Using the `POST` method updates your integration configuration by **adding** your new configuration to the existing one in your Datadog organization.
* Using the `PUT` method updates your integration configuration by **replacing** your current configuration with the new one sent to your Datadog organization. All arguments are required when creating (`PUT`) a new Slack configuration.

**ARGUMENTS**:

* **`service_hooks`** [*required*]:
    Array of service hook objects (the service hook is generated for your slack account in your Slack account administration page). A service hook object is composed by:

    * **`account`** [*required*]:
        Your Slack account name.

    * **`url`** [*required*]:
        Your Slack Service Hook URL.

**Note**: **`service_hooks`** are not required in the payload when adding (POST) or updating (PUT) an existing Slack configuration.
