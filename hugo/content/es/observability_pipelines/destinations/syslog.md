---
description: Aprenda a enviar registros a rsyslog o syslog-ng utilizando Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destinos de Syslog
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice los destinos de syslog de Observability Pipelines para enviar registros a rsyslog o syslog-ng.

**Nota**: Los destinos rsyslog y syslog-ng admiten el formato [RFC5424][5].

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese el identificador para la URL del punto de conexión de syslog y, si corresponde, la contraseña de la clave. <b>No</b> ingrese los valores reales.</div>

Configure el destino rsyslog o syslog-ng cuando [configure una canalización][2]. Puede configurar una canalización en la [UI][1], utilizando la [API][3] o con [Terraform][4]. Los pasos en esta sección se configuran en la UI.

Después de seleccionar el destino rsyslog o syslog-ng en la UI de la canalización, ingrese el identificador de la URL de su punto de conexión. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

Consulte [Cómo hacer coincidir los campos de registro con los campos de syslog](#matching-log-fields-to-syslog-fields) para obtener información sobre cómo se hacen coincidir los campos.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Tiempo de espera para las sondas de mantenimiento de conexión TCP {#wait-time-for-tcp-keepalive-probes}

Ingrese la cantidad de segundos que se debe esperar antes de enviar sondas de mantenimiento de conexión TCP en una conexión inactiva.

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Cómo hacer coincidir los campos de registro con los campos de syslog {#matching-log-fields-to-syslog-fields}

Los destinos rsyslog y syslog-ng hacen coincidir estos campos de registro con los siguientes campos de syslog:

| Evento de registro       | CAMPO SYSLOG | Predeterminado                    |
|-----------------|--------------|----------------------------|
| log[\"message\"]  | MENSAJE      | `NIL`                      |
| log[\"procid\"]   | PROCID       | El ID de proceso del Worker en ejecución. |
| log[\"appname\"]  | APP-NAME     | `observability_pipelines`  |
| log[\"facility\"] | FACILITY     | `8 (log_user)`             |
| log[\"msgid\"]    | MSGID        | `NIL`                      |
| log[\"severity\"] | SEVERITY     | `info`                     |
| log[\"host\"]     | HOSTNAME     | `NIL`                      |
| log[\"timestamp\"]| TIMESTAMP    | Hora UTC actual.          |

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de URL del punto de conexión de rsyslog o syslog-ng:
	- Hace referencia a la dirección y el puerto a los que el Observability Pipelines Worker envía los registros. Por ejemplo, `127.0.0.1:9997`.
	- El identificador predeterminado es `DESTINATION_SYSLOG_ENDPOINT_URL`.
- Identificador de frase de contraseña TLS de rsyslog o syslog-ng (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_SYSLOG_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Los destinos rsyslog y syslog-ng no agrupan eventos en lotes.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: /es/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://datatracker.ietf.org/doc/html/rfc5424