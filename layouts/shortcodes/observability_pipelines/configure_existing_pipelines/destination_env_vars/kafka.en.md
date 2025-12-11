#### Kafka bootstrap servers
- The host and port of the Kafka bootstrap servers.
- This is the bootstrap server that the client uses to connect to the Kafka cluster and discover all the other hosts in the cluster. The host and port must be entered in the format of `host:port`, such as `10.14.22.123:9092`. If there is more than one server, use commas to separate them.
- Stored in the environment: `DD_OP_DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.

#### TLS (when enabled)

- If TLS is enabled, the Kafka TLS passphrase is needed.
- Stored in the environment: `DD_OP_DESTINATION_KAFKA_KEY_PASS`.

#### SASL (when enabled)

- Kafka SASL username
	- Stored in the environment: `DD_OP_DESTINATION_KAFKA_SASL_USERNAME`.
- Kafka SASL password
	- Stored in the environment: `DD_OP_DESTINATION_KAFKA_SASL_PASSWORD`.