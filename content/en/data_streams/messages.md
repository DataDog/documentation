---
title: Messages
---

The Messages feature allows you to view Kafka messages at specific partitions or offsets, debug poison payload problems, and better understand your data streams.

<div class="alert alert-info">
   Messages is in Preview. Contact your Customer Success Manager for access.
</div>

## Supported data formats

Avro, Protobuf, and JSON are supported.

## Prerequisites

### Kafka Consumer integration

[Kafka Consumer][6] integration needs to be set up on the topic you want to retrieve messages from.

#### Validation

1. [Run the Agent's status subcommand][10] and look for `kafka_consumer` under the Checks section.
2. Ensure the metric `kafka.consumer_lag` is generated for the appropriate `topic`.

### Agent version

Ensure the agent version you are running is 7.70 or later.

#### Validation

1. [Run the Agent's status subcommand][10] and check the agent version.
2. In Datadog, under `integrations`, `View agents`, find the agent running the Kafka Consumer integration, and check its version.

### Remote configuration

Ensure [remote configuration][3] is set up for the agent running the Kafka Consumer integration.

#### Validation

1. In the Datadog app, under `organization-settings/remote-config`, check that remote configuration is enabled at the organization level
2. In Datadog, under `organization-settings/remote-config`, check that the agent running the Kafka Consumer integration has remote configuration enabled, and is using an API key with remote configuration enabled.

## Required permissions

You must have the following permissions:

* `Data Streams Monitoring Capture Messages`
* `Logs Read Index Data`
* `Logs Read Data`
* `Logs Live Tail`

You can verify your current permissions on your [Profile page][7].
To enable permissions, edit an existing role or create a new one on the [Roles page][8]. If you don't have adequate access to modify roles, contact your organization's administrator.

### 1. Create a new role

1. Navigate to the [Roles page][8] in Datadog.
2. Click **+ New Role** in the top-right corner.
   <div class="alert alert-info">
   If you see "Read Only" instead of the "+ New Role button", you don't have permission to create roles. Contact your Datadog administrator for assistance.
   </div>
3. Enter a descriptive name for your new role (for example, "Data Streams Messages Access").
4. In the **Search Permissions** field, type `Data Streams Monitoring Capture Messages`.
5. Select the permission from the search results to enable it for this role.
6. Click **Save**.
7. Confirm your role was created successfully by searching for it in the roles list.

### 2. Assign the role to users

1. Go to the [Users page][9] in Datadog.
2. Find and click on the user you want to assign the role to.
3. In the user details panel, click **Edit** next to their name.
   <div class="alert alert-info">
   If you don't see an "Edit" button, you need administrator privileges to modify user roles. Contact your Datadog administrator.
   </div>
4. In the modal that opens, locate the **Roles** section.
5. Add your newly created role to the user.
6. Click **Save**.
7. Look for a "User updated" confirmation message to verify the change was successful.

[1]: #agent-setup
[2]: #required-permissions
[3]: /agent/remote_config
[4]: https://app.datadoghq.com/fleet
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /integrations/kafka-consumer
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
[10]: /agent/guide/agent-commands/#agent-status-and-information
