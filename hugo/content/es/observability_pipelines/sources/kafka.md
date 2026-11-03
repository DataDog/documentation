---
description: Aprenda a recopilar registros de temas de Kafka mediante el Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Kafka fuente
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente de Kafka de Observability Pipelines para recibir registros de sus temas de Kafka. La fuente de Kafka utiliza [librdkafka][2].

También puede [enviar registros de Azure Event Hub a Observability Pipelines utilizando la fuente de Kafka][6].

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/kafka %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para los servidores de Kafka, el nombre de usuario, la contraseña y, si corresponde, la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [UI][7], utilizando la [API][8] o con [Terraform][9]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente de Kafka en la interfaz de usuario de la canalización:

1. Ingrese el identificador para sus servidores de Kafka. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador para su nombre de usuario de Kafka. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador para su contraseña de Kafka. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el ID de grupo.
1. Ingrese el nombre del tema. Si hay más de uno, haga clic en {{< ui >}}Add Field{{< /ui >}} para agregar temas adicionales.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilite la autenticación SASL {#enable-sasl-authentication}

1. Cambie el interruptor para habilitar {{< ui >}}SASL Authentication{{< /ui >}}
1. Seleccione el mecanismo ({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}} o {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) en el menú desplegable.

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Agregue opciones adicionales de librdkafka {#add-additional-librdkafka-options}

1. Haga clic en {{< ui >}}Advanced{{< /ui >}} y luego en {{< ui >}}Add Option{{< /ui >}}.
1. Seleccione una opción en el menú desplegable.
1. Ingrese un valor para esa opción.
1. Verifique sus valores con la [documentación de librdkafka][4] para asegurarse de que tengan el tipo correcto y estén dentro del rango establecido.
1. Haga clic en {{< ui >}}Add Option{{< /ui >}} para agregar otra opción de librdkafka.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de servidores de arranque de Kafka:
	- Hace referencia al servidor de arranque que el cliente utiliza para conectarse al clúster de Kafka y descubrir todos los demás servidores en el clúster.
	- En su administrador de secretos, el servidor y el puerto deben ingresarse en el formato de `host:port`, como `10.14.22.123:9092`. Si hay más de un servidor, utilice comas para separarlos.
	- El identificador predeterminado es `SOURCE_KAFKA_BOOTSTRAP_SERVERS`.
- Identificador de nombre de usuario SASL de Kafka:
	- El identificador predeterminado es `SOURCE_KAFKA_SASL_USERNAME`.
- Identificador de contraseña SASL de Kafka:
	- El identificador predeterminado es `SOURCE_KAFKA_SASL_PASSWORD`.
- Identificador de frase de contraseña TLS de Kafka (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_KAFKA_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## Opciones de librdkafka {#librdkafka-options}

Estas son las opciones de librdkafka disponibles:

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

Consulte la [documentación de librdkafka][3] para obtener más información y asegurarse de que sus valores tengan el tipo correcto y estén dentro del rango.

## Métricas de salud {#health-metrics}

Para [métricas de componente][10] y [métricas de búfer de fuente][11] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][12].

### Métricas de Kafka {#kafka-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `kafka` para estas métricas.

`pipelines.kafka_consumer_lag`
: **Descripción**: Retraso del consumidor de Kafka por tema y partición. Los valores altos indican que la fuente se está quedando atrás con respecto a la tasa de mensajes entrantes.
: **Tipo de métrica**: gauge

`pipelines.kafka_consumed_messages_total`
: **Descripción**: La cantidad de mensajes que el Worker consumió de los brokers de Kafka.
: **Tipo de métrica**: conteo

`pipelines.kafka_consumed_messages_bytes_total`
: **Descripción**: La cantidad de bytes de mensaje que el Worker consumió de los brokers de Kafka.
: **Tipo de métrica**: conteo

`pipelines.kafka_requests_total`
: **Descripción**: La cantidad de solicitudes que el Worker envió a los brokers de Kafka.
: **Tipo de métrica**: count

`pipelines.kafka_requests_bytes_total`
: **Descripción**: La cantidad de bytes que el Worker envió a los brokers de Kafka.
: **Tipo de métrica**: count

`pipelines.kafka_responses_total`
: **Descripción**: La cantidad de respuestas que el Worker recibió de los brokers de Kafka después de escribir en ellos.
: **Tipo de métrica**: count

`pipelines.kafka_responses_bytes_total`
: **Descripción**: La cantidad de bytes que el Worker recibió de los brokers de Kafka después de escribir en ellos.
: **Tipo de métrica**: count

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[6]: /es/observability_pipelines/sources/azure_event_hubs/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /es/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[12]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/