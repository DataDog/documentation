#### Servidores de arranque de Kafka
- El host y el puerto de los servidores de arranque de Kafka.
- Este es el servidor de arranque que el cliente utiliza para conectarse al clúster Kafka y detectar todos los demás hosts del clúster. El host y el puerto deben introducirse en el formato `host:port`, como `10.14.22.123:9092`. Si hay más de un servidor, utiliza comas para separarlos.
- La variable de entorno por defecto es `DD_OP_DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.

#### TLS (si está activado)

- Si TLS está activado, se necesita la frase de contraseña TLS de Kafka.
- La variable de entorno por defecto es `DD_OP_DESTINATION_KAFKA_KEY_PASS`.

#### SASL (si está activado)

- Nombre de usuario SASL de Kafka
    - La variable de entorno por defecto es `DD_OP_DESTINATION_KAFKA_SASL_USERNAME`.
- Contraseña SASL de Kafka
    - La variable de entorno por defecto es `DD_OP_DESTINATION_KAFKA_SASL_PASSWORD`.