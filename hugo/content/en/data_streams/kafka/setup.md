---
title: Kafka Console Setup
description: Set up Kafka Console, including prerequisites, Agent configuration, and the additional steps required to read messages, create topics, and delete topics.
aliases:
- /data_streams/kafka/data_collection
further_reading:
- link: "https://www.datadoghq.com/blog/kafka-console/"
  tag: "Blog"
  text: "Troubleshoot Kafka issues across every layer of your stack with Kafka Console"
---

This page covers the prerequisites and setup steps for Kafka Console.

## Prerequisites

### Datadog Agent version

Datadog Agent version 7.78 or later is required.

### ACL permissions

If your Kafka cluster uses ACLs, the Datadog Agent user requires the following minimum permissions:

| Resource Name | Resource Type | Operation        |
|---------------|---------------|------------------|
| `kafka-cluster` | `CLUSTER`   | `Describe`       |
| `kafka-cluster` | `CLUSTER`   | `DescribeConfigs` |
| `*`           | `TOPIC`       | `Describe`       |
| `*`           | `TOPIC`       | `DescribeConfigs` |
| `*`           | `GROUP`       | `Describe`       |

## Setup

Enable Kafka Console by setting `enable_cluster_monitoring: true` in the [Kafka Consumer][12] integration.

For additional environment-specific guidance on configuring the integration, go to the [Kafka Console setup page][1] and click {{< ui >}}Get Started{{< / ui >}}. Then choose your environment and follow the instructions.

{{< img src="data_streams/kafka_setup-2.png" alt="The Kafka Console setup dialog showing environment selection, security protocol, schema registry options, and Kubernetes configuration instructions" >}}

You can copy the setup instructions directly to an AI agent with {{< ui >}}Copy for AI{{< /ui >}}.

## Enable Kafka actions

Kafka actions let you read messages, create topics, and delete topics from Kafka Console. This section applies only if you want to use these actions. Skip it if you only need monitoring.

### Remote configuration

[Remote configuration][3] must be enabled at three levels:

1. At the [organization level][5].
2. At the [Agent level][10].
3. At the [API key level][11].

### Additional ACL permissions

The Datadog Agent runs each action on your Kafka cluster. In addition to the ACL permissions listed in [Prerequisites](#acl-permissions), grant the Agent user the ACLs for each action you plan to use:

| Action         | Resource Name | Resource Type | Operation |
|----------------|---------------|---------------|-----------|
| Read messages  | `*`           | `TOPIC`       | `Read`    |
| Create a topic | `*`           | `TOPIC`       | `Create`  |
| Delete a topic | `*`           | `TOPIC`       | `Delete`  |

The `*` resource name applies the operation to all topics. To restrict an action to specific topics, replace `*` with those topic names.

### User permissions

Each action requires a user permission:

| Action         | Permission                                   |
|----------------|----------------------------------------------|
| Read messages  | `Data Streams Monitoring Capture Messages`   |
| Create a topic | `Data Streams Monitoring Kafka Create Topic` |
| Delete a topic | `Data Streams Monitoring Kafka Delete Topic` |

Datadog records each Kafka action in [Audit Trail][13] under the Data Streams Monitoring category. Each entry includes the user, topic, and cluster.

<div class="alert alert-warning">Deleting a topic permanently removes the topic and all of its messages. Grant the <code>Data Streams Monitoring Kafka Delete Topic</code> permission only to users who manage your Kafka topics.</div>

You can verify your current permissions on your [{{< ui >}}Profile{{< /ui >}} page][7]. To enable permissions, edit an existing role or create a role on the [{{< ui >}}Roles{{< /ui >}} page][8]. If you do not have permission to modify roles, contact your organization's administrator.

{{% collapse-content title="Create a role and assign it to users" level="h4" expanded=false %}}

#### 1. Create a role

1. Navigate to the [{{< ui >}}Roles{{< /ui >}} page][8] in Datadog.
2. Click {{< ui >}}\+ New Role{{< /ui >}} in the top-right corner.
   <div class="alert alert-info">
   If you see "Read Only" instead of the "+ New Role button", you don't have permission to create roles. Contact your Datadog administrator for assistance.
   </div>
3. Enter a descriptive name for your role (for example, "Kafka Actions Access").
4. In the {{< ui >}}Search Permissions{{< /ui >}} field, enter the name of a permission from the [User permissions](#user-permissions) table (for example, `Data Streams Monitoring Capture Messages`).
5. Select the permission from the search results to enable it for this role. Repeat for each permission you want to grant the role.
6. Click {{< ui >}}Save{{< /ui >}}.
7. Confirm your role was created successfully by searching for it in the roles list.

#### 2. Assign the role to users

1. Go to the [{{< ui >}}Users{{< /ui >}} page][9] in Datadog.
2. Find and click on the user you want to assign the role to.
3. In the user details panel, click {{< ui >}}Edit{{< /ui >}} next to their name.
   <div class="alert alert-info">
   If you don't see an {{< ui >}}Edit{{< /ui >}} button, you need administrator privileges to modify user roles. Contact your Datadog administrator.
   </div>
4. In the modal that opens, locate the {{< ui >}}Roles{{< /ui >}} section.
5. Add your newly created role to the user.
6. Click {{< ui >}}Save{{< /ui >}}.
7. Look for a {{< ui >}}User updated{{< /ui >}} confirmation message to verify the change was successful.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[3]: /remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
[10]: /remote_configuration/#enable-remote-configuration
[11]: /account_management/api-app-keys/
[12]: /integrations/kafka-consumer/?tab=containerized
[13]: /account_management/audit_trail/
