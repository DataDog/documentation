---
title: Kafka Source
disable_toc: false
---

Use Observability Pipelines' Kafka source to receive logs from your Kafka topics. Select and set up this source when you [set up a pipeline][1]. The Kafka source uses [librdkafka][2].

You can also [send Azure Event Hub logs to Observability Pipelines using the Kafka source](/observability_pipelines/sources/azure_event_hub/#send-azure-event-hub-logs-to-observability-pipelines-using-the-kafka-source).

## Prerequisites

{{% observability_pipelines/prerequisites/kafka %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

<div class="alert alert-danger">Only enter the identifiers for the Kafka servers, username, password, and if applicable, the key pass. Do <b>not</b> enter the actual values.</a></div>

1. Enter the identifier for your Kafka servers. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your Kafka username. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your Kafka password. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the group ID.
1. Enter the topic name. If there is more than one, click **Add Field** to add additional topics.

### Optional settings

#### Enable SASL Authentication

1. Toggle the switch to enable **SASL Authentication** 
1. Select the mechanism (**PLAIN**, **SCHRAM-SHA-256**, or **SCHRAM-SHA-512**) in the dropdown menu.

#### Enable TLS

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][5] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your Kafka key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

#### Add additional librdkafka options

1. Click **Advanced** and then **Add Option**.
1. Select an option in the dropdown menu.
1. Enter a value for that option.
1. Check your values against the [librdkafka documentation][4] to make sure they have the correct type and are within the set range.
1. Click **Add Option** to add another librdkafka option.

## Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Kafka bootstrap servers identifier:
	- The default identifier is `SOURCE_KAFKA_BOOTSTRAP_SERVERS`.
- Kafka SASL username identifier:
	- The default identifier is `SOURCE_KAFKA_SASL_USERNAME`.
- Kafka SASL password identifier:
	- The default identifier is `SOURCE_KAFKA_SASL_PASSWORD`.
- Kafka TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_KAFKA_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## librdkafka options

These are the available librdkafka options:

- auto.offset.reset
- auto.commit.interval.ms
- client.id
- coordinator.query.interval.ms
- enable.auto.commit
- enable.auto.offset.store
- fetch.max.bytes
- fetch.message.max.bytes
- fetch.min.bytes
- fetch.wait.max.ms
- group.instance.id
- heartbeat.interval.ms
- queued.min.messages
- session.timeout.ms
- socket.timeout.ms

See the [librdkafka documentation][3] for more information and to ensure your values have the correct type and are within range.

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/