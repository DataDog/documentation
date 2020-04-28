---
title: Update a Slack integration channel
type: apicontent
order: 20.8
external_redirect: /api/#update-a-slack-integration-channel
---

## Update a Slack integration channel

Update a channel used in your Datadog-Slack integration.

**ARGUMENTS**:

* **`name`** [*optional*]:
    Your channel name, e.g: `#general`, `#private`

* **`display`** [*optional*]:
    Configuration options for what is shown in an alert event message:

    * **`message`** [*optional*]:
        Show the main body of the alert event.

    * **`snapshot`** [*optional*]:
        Show the alert event's snapshot image.

    * **`tags`** [*optional*]:
        Show the scopes on which the monitor alerted.

    * **`notified`** [*optional*]:
        Show the list of @-handles in the alert event.

**NOTE**: Prepending **`#`** to the channel name is optional
