---
title: Add a Slack integration channel
type: apicontent
order: 20.4
external_redirect: /api/#add-a-slack-integration-channel
---

## Add Slack integration channel

Add a channel to your Datadog-Slack integration.

**ARGUMENTS**:

* **`name`** [*required*]:
    Your channel name, e.g: `#general`, `private`

* **`display`** [*optional*]:
    Configuration options for what is shown in an alert event message:

    * **`message`** [*optional*, *default*=**True**]:
        Show the main body of the alert event.

    * **`snapshot`** [*optional*, *default*=**True**]:
        Show the alert event's snapshot image.

    * **`tags`** [*optional*, *default*=**True**]:
        Show the scopes on which the monitor alerted.

    * **`notified`** [*optional*, *default*=**True**]:
        Show the list of @-handles in the alert event.

**NOTE**: Prepending **`#`** to the channel name is optional
