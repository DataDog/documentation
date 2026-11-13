---
description: Aprenda a recopilar registros enviados a rsyslog o syslog-ng utilizando
  Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente Syslog
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice rsyslog o syslog-ng de Observability Pipelines para recibir registros enviados a rsyslog o syslog-ng.

También puede [reenviar registros de terceros a syslog](#forward-third-party-logs-to-syslog) y luego enviarlos a Observability Pipelines Worker.

Si sus registros utilizan un formato que la fuente Syslog no admite, consulte [Parseo](#parsing).

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/syslog %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección de syslog y, si corresponde, la contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [UI][7], utilizando la [API][8] o con [Terraform][9]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente Syslog en la interfaz de usuario de la canalización:

1. Ingrese el identificador para su dirección de syslog. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. En el menú desplegable {{< ui >}}Socket Type{{< /ui >}}, seleccione el protocolo de comunicación que desea utilizar: {{< ui >}}TCP{{< /ui >}} o {{< ui >}}UDP{{< /ui >}}.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración de TLS opcional {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Parseo {#parsing}

Observability Pipelines Worker hace todo lo posible por realizar el parseo de los siguientes formatos de syslog:

- [RFC 6587][10]
- [RFC 5424][11]
- [RFC 3164][12]
- Otras variaciones comunes, como el estilo syslog de NGINX

Si el Worker no puede realizar el parseo de un registro, se registra un error.

### Realice el parseo de los formatos de syslog no admitidos {#parse-unsupported-syslog-formats}

Si sus registros utilizan un formato que la fuente Syslog no admite, o si el parseo falla con frecuencia:

1. Utilice la [fuente Socket][13] en lugar de la fuente Syslog para recibir los registros.
1. Agregue un [Procesador personalizado][14] a la canalización para realizar el parseo de los registros con VRL. Por ejemplo:
    - Utilice `parse_regex` para escribir sus propias reglas de parseo.
    - Utilice `parse_syslog` y gestione usted mismo los errores de parseo.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección de rsyslog o syslog-ng:
	- Hace referencia a la dirección de enlace, como `0.0.0.0:9997`, en la que Observability Pipelines Worker escucha para recibir registros del reenviador de Syslog.
	- El identificador predeterminado es `SOURCE_SYSLOG_ADDRESS`.
- Identificador de frase de contraseña TLS de rsyslog o syslog-ng (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_SYSLOG_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## Envíe registros al Observability Pipelines Worker a través de syslog {#send-logs-to-the-observability-pipelines-worker-over-syslog}

{{% observability_pipelines/log_source_configuration/syslog %}}

## Reenvíe registros de terceros al Observability Pipelines Worker {#forward-third-party-logs-to-the-observability-pipelines-worker}

Syslog es un protocolo de registro ampliamente utilizado para enviar registros de red a un servidor central. Muchos dispositivos de red admiten la salida syslog, por lo que puede reenviar registros de terceros a la fuente de syslog de Observability Pipelines para su procesamiento y enrutamiento. Ejemplos de estos servicios de terceros incluyen:

### Fortinet {#fortinet}
- [Configurar el reenvío de registros][2]
- [Configuración de los ajustes de syslog][3]

### Palo Alto Networks {#palo-alto-networks}
- [Configurar el reenvío de registros][4]
- [Reenviar registros de tráfico a un servidor syslog][5]

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /es/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: https://datatracker.ietf.org/doc/html/rfc6587
[11]: https://datatracker.ietf.org/doc/html/rfc5424
[12]: https://datatracker.ietf.org/doc/html/rfc3164
[13]: /es/observability_pipelines/sources/socket/
[14]: /es/observability_pipelines/processors/custom_processor/