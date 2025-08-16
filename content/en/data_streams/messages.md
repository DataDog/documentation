---
title: Messages
---

Use the Messages feature to view Kafka messages directly and troubleshoot your data streams efficiently. You can view messages at specific offsets within Kafka. Inspecting these messages can be crucial when troubleshooting issues related to specific services or data streams.

## Setup
Before diving into detailed configuration steps, here's an overview of what's involved in setting up the Messages feature:

| Step               | Description                                                                                                                                       | Setup Guide              |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| Agent setup        | An agent needs Kafka consumer integration enabled, be on at least version 7.69.0, and have remote configuration enabled                           | [Agent Setup][1]          |
| Verify permissions | You need a few log access permissions, which usually come standard as well as `Data Streams Monitoring Capture Messages` enabled in Datadog     | [Required Permissions][2] |


### Agent setup

#### Selecting an agent
Any Datadog agent having access to Kafka can be used for setup.

If you self-host Kafka, Datadog recommends setting up Messages on one of your Kafka brokers' agents. Otherwise, choose any one agent your producer or consumer services communicate with that has access to your Kafka cluster.

#### Step-by-step guide

Complete the following steps on the same Datadog agent:

##### 1. Verify agent version

Ensure your agent is running version `7.69.0` or later.

To check your agent version, run `datadog-agent version` on your host.

##### 2. Enable [remote configuration][3]

Confirm that Remote Configuration is enabled for your agent (it is typically enabled by default). Verify this setting on the [Fleet Automation page][4] and also confirm it at the organizational level from the [Remote Configuration settings page][5].

##### 3. Configure Kafka consumer integration

Follow the steps detailed at [Kafka consumer integration documentation][6] to configure a Datadog agent for the Kafka consumer integration.

##### 4. Verify setup

* Review agent logs for `kafka_consumer` entries to confirm successful configuration.
* Verify data ingestion by inspecting the `kafka.broker_offset` metric in Datadog's Metrics Explorer, filtering by the relevant Kafka topics.


### Required permissions

You must have the following permissions enabled:

* `Data Streams Monitoring Capture Messages`
* `Logs Read Index Data`
* `Logs Read Data`
* `Logs Live Tail`

You can verify your current permissions on your [Profile page][7].

The logs related permissions should be part of the "Datadog Standard Role".

To enable permissions, edit an existing role or create a new one on the [Roles page][8]. If you don't have adequate access to modify roles, contact your organization's administrator.

#### Creating a new role with permissions
Follow these steps to create a new role with the required permissions and assign it to users who need access to the Messages feature.

##### Step 1: Create a new role

1. Navigate to the [Roles page][8] in Datadog.
2. Click **+ New Role** in the top-right corner.
   {{< callout url="#" >}}
   If you see "Read Only" instead of the **+ New Role** button, you don't have permission to create roles. Contact your Datadog administrator for assistance.
   {{< /callout >}}
3. Enter a descriptive name for your new role (for example, "Data Streams Messages Access").
4. In the **Search Permissions** field, type `Data Streams Monitoring Capture Messages`.
5. Select the permission from the search results to enable it for this role.
6. Click **Save**.
7. Confirm your role was created successfully by searching for it in the roles list.

##### Step 2: Assign the role to users

1. Go to the [Users page][9] in Datadog.
2. Find and click on the user you want to assign the role to.
3. In the user details panel, click **Edit** next to their name.
   {{< callout url="#" >}}
   If you don't see an **Edit** button, you need administrator privileges to modify user roles. Contact your Datadog administrator.
   {{< /callout >}}
4. In the modal that opens, locate the **Roles** section.
5. Add your newly created role to the user.
6. Click **Save**.
7. Look for a "User updated" confirmation message to verify the change was successful.

[1]: #agent-setup
[2]: #required-permissions
[3]: /agent/remote_config
[4]: https://app.datadoghq.com/fleet
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /integrations/kafka-consumer/?tab=host#setup
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
