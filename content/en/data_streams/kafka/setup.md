---
title: Kafka Monitoring Setup
description: Set up Data Streams Monitoring's Kafka Monitoring, including prerequisites, Agent configuration, and the additional steps required to inspect Kafka messages.
aliases:
  - /data_streams/kafka/setup
---

This page covers the prerequisites and setup steps for Data Streams Monitoring's Kafka Monitoring.

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

Go to the [Kafka Monitoring setup page][1] and click {{< ui >}}Get Started{{< / ui >}}. Then choose your environment and follow the instructions. To request assistance, choose {{< ui >}}Request a pairing session{{< /ui >}}.

{{< img src="data_streams/kafka_setup-2.png" alt="The Kafka Monitoring setup dialog showing environment selection, security protocol, schema registry options, and Kubernetes configuration instructions" >}}

The setup page provides environment-specific configuration instructions. You can copy the instructions directly to an AI agent with {{< ui >}}Copy for AI{{< /ui >}}.

## Enable message inspection

This section applies only if you want to view Kafka message payloads in the {{< ui >}}Messages{{< /ui >}} section. Skip it if you do not plan to use message inspection.

### Additional ACL permission

In addition to the ACL permissions listed in [Prerequisites](#acl-permissions), the Datadog Agent user requires:

| Resource Name | Resource Type | Operation |
|---------------|---------------|-----------|
| `*`           | `TOPIC`       | `Read`    |

### Remote configuration

[Remote configuration][3] must be enabled at three levels:

1. At the [organization level][5].
2. At the [Agent level][10].
3. At the [API key level][11].

### User permission

To view Kafka messages, a user must have the `Data Streams Monitoring Capture Messages` permission.

You can verify your current permissions on your [{{< ui >}}Profile{{< /ui >}} page][7]. To enable permissions, edit an existing role or create a role on the [{{< ui >}}Roles{{< /ui >}} page][8]. If you do not have permission to modify roles, contact your organization's administrator.

<details>
<summary><strong>Create a role and assign it to users</strong></summary>

#### 1. Create a role

1. Navigate to the [{{< ui >}}Roles{{< /ui >}} page][8] in Datadog.
2. Click {{< ui >}}+ New Role{{< /ui >}} in the top-right corner.
   <div class="alert alert-info">
   If you see "Read Only" instead of the "+ New Role button", you don't have permission to create roles. Contact your Datadog administrator for assistance.
   </div>
3. Enter a descriptive name for your role (for example, "Data Streams Messages Access").
4. In the {{< ui >}}Search Permissions{{< /ui >}} field, type `Data Streams Monitoring Capture Messages`.
5. Select the permission from the search results to enable it for this role.
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

</details>

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[3]: /remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
[10]: /remote_configuration/#enable-remote-configuration
[11]: /account_management/api-app-keys/
