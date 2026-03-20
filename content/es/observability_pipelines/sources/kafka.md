---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente Kafka
---

{{< product-availability >}}

Utilice Observability Pipelines' Kafka source (fuente) para recibir registros de sus temas Kafka. Selecciona y configura este source (fuente) cuando [configures un pipeline][1]. Kafka source (fuente) utiliza [librdkafka][2].

También puede [enviar registros de Azure Event Hub a Observability Pipelines utilizando Kafka source (fuente)][6].

## Requisitos previos

{{% observability_pipelines/prerequisites/kafka %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información corresponde a la configuración de la fuente en la interfaz de usuario del pipeline.

<div class="alert alert-danger">Introduzca únicamente los identificadores de los servidores Kafka, el nombre de usuario, la contraseña y, si procede, el pase de clave TLS. <b>No</b> introduzca los valores reales.</div>

1. Introduzca el identificador de sus servidores Kafka. Si lo deja en blanco, se utilizará el [predeterminado](#set-secrets).
1. Introduzca el identificador de su nombre de usuario de Kafka. Si lo deja en blanco, se utilizará el [por defecto](#set-secrets).
1. Introduzca el identificador de su contraseña de Kafka. Si lo deja en blanco, se utilizará la [por defecto](#set-secrets).
1. Introduzca el ID del grupo.
1. Introduzca el nombre del tema. Si hay más de uno, haga clic en **Añadir campo** para añadir temas adicionales.

### Ajustes opcionales

#### Activar autenticación SASL

1. Active el interruptor para activar la **Autenticación SASL**. 
1. Seleccione el mecanismo (**PLAIN**, **SCHRAM-SHA-256** o **SCHRAM-SHA-512**) en el menú desplegable.

#### Activar TLS

Cambie el interruptor a **Habilitar TLS**. Si activa TLS, se requieren los siguientes archivos de certificados y claves.<br>**Nota**: Todas las rutas de archivos son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulte [Configuraciones avanzadas del trabajador][5] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker`, o al menos legible por el grupo o usuario.
- Introduzca el identificador de su pase de clave Kafka. Si lo deja en blanco, se utilizará [por defecto](#set-secrets).
- `Server Certificate Path`: La ruta al archivo del certificado que ha sido firmado por el archivo raíz de su Autoridad de Certificación (CA) en DER o PEM (X.509).
- `CA Certificate Path`: La ruta al archivo de certificado que es el archivo raíz de su Autoridad de Certificación (CA) en DER o PEM (X.509).
- `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

#### Añadir opciones librdkafka adicionales

1. Haga clic en **Avanzado** y luego en **Añadir opción**.
1. Seleccione una opción en el menú desplegable.
1. Introduzca un valor para esa opción.
1. Comprueba tus valores en la [documentación de librdkafka][4] para asegurarte de que tienen el tipo correcto y están dentro del rango establecido.
1. Haga clic en **Añadir opción** para añadir otra opción librdkafka.

## Establecer secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% pestaña "Gestión de secretos" %}}

- Identificador de los servidores de arranque de Kafka:
    - Hace referencia al servidor de arranque que el cliente utiliza para conectarse al clúster Kafka y descubrir todos los demás hosts del clúster.
    - En tu gestor de secretos, el host y el puerto deben introducirse en el formato `host:port`, como `10.14.22.123:9092`. Si hay más de un servidor, utiliza comas para separarlos.
    - El identificador por defecto es `SOURCE_KAFKA_BOOTSTRAP_SERVERS`.
- Identificador del nombre de usuario SASL de Kafka:
    - El identificador por defecto es `SOURCE_KAFKA_SASL_USERNAME`.
- Identificador de contraseña SASL de Kafka:
    - El identificador por defecto es `SOURCE_KAFKA_SASL_PASSWORD`.
- Identificador de frase de contraseña TLS de Kafka (cuando TLS está activado):
    - El identificador por defecto es `SOURCE_KAFKA_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## opciones de librdkafka

Estas son las opciones disponibles de librdkafka:

- auto.offset.reset
- auto.commit.interval.ms
- id.cliente
- intervalo.ms.de.consulta.del.coordinador
- habilitar.auto.commit
- habilitar.auto.offset.store
- fetch.max.bytes
- fetch.message.max.bytes
- fetch.min.bytes
- fetch.wait.max.ms
- id.instancia.grupo
- intervalo.ms.latido
- cola.min.mensajes
- session.timeout.ms
- socket.timeout.ms

Consulte la [documentación de librdkafka][3] para obtener más información y asegurarse de que sus valores tienen el tipo correcto y están dentro del rango.

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[5]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /es/observability_pipelines/sources/azure_event_hubs/