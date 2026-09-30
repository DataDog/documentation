---
description: Aprenda a recopilar registros de un Splunk HTTP Event Collector (HEC)
  utilizando el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente Splunk HTTP Event Collector (HEC)
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente Splunk HTTP Event Collector (HEC) de Observability Pipelines para recibir registros de su Splunk HEC. Puede optar por almacenar el token HEC como metadatos del evento y:

- Enviar registros desde Observability Pipelines a Splunk HEC con el token original enviado con el evento.
- Utilice el procesador de tabla de enriquecimiento para agregar un campo de registro de su archivo de búsqueda basado en el token en los metadatos, y luego procese y dirija sus registros según el valor de ese campo.

**Notas**:
- El Worker reenvía el token HEC almacenado que se recibe al siguiente componente.
- Los tokens Splunk HEC almacenados no se muestran en [Live Capture][9].
- Utilice la fuente Splunk HEC si desea [enviar registros desde la distribución de Splunk del OpenTelemetry Collector a Observability Pipelines](#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines).

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección de Splunk HEC y, si corresponde, las claves de la contraseña de la clave TLS y del token de autenticación. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar un pipeline en la [UI][6], utilizando la [API][7] o con [Terraform][8]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente Splunk HEC en el pipeline UI:

1. Ingrese el identificador para su dirección de Splunk HEC. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Solo habilite {{< ui >}}Store HEC token{{< /ui >}} si desea realizar una de las siguientes acciones:
    - Utilice un destino Splunk HEC con la estrategia de token {{< ui >}}From Source{{< /ui >}}.
    - Utilice un procesador de tabla de enriquecimiento para asignar tokens de Splunk HEC desde un archivo local.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### Configurar tokens de autenticación {#configure-authentication-tokens}

Si almacena tokens de Splunk HEC en el encabezado de autorización de su solicitud HTTP, puede configurar Observability Pipelines para verificar si las solicitudes HTTP entrantes tienen un token válido. Los eventos de solicitud que no tienen un token válido se descartan.

Para configurar tokens de autenticación, habilite el interruptor {{< ui >}}Configure authentication tokens{{< /ui >}}:

1. Haga clic en {{< ui >}}Manage Tokens{{< /ui >}} y luego en {{< ui >}}Add Token{{< /ui >}}.
1. Ingrese el identificador para su clave de token.<br>**Nota**: Si está utilizando variables de entorno, la variable de entorno para este token es el identificador que ingresó precedido por `DD_OP_`.
1. (Opcional) Ingrese un campo y un valor si desea agregar información adicional a los registros autenticados correctamente con este token específico.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección de Splunk HEC:
	- Hace referencia a la dirección de enlace, como `0.0.0.0:8088`, en la que su Observability Pipelines Worker escucha para recibir registros destinados originalmente al indexador de Splunk.
	- El identificador predeterminado es `SOURCE_SPLUNK_HEC_ADDRESS`.
- Identificador de frase de contraseña de TLS de Splunk HEC (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_SPLUNK_HEC_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

## Enviar registros desde la distribución de Splunk del OpenTelemetry Collector a Observability Pipelines {#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines}

Para enviar registros desde la distribución de Splunk del OpenTelemetry Collector:

1. Instale el Splunk OpenTelemetry Collector según su entorno:
    - [Kubernetes][2]
    - [Linux][3]
1. [Configure una pipeline][4] con la [fuente Splunk HEC](#set-up-the-source-in-the-pipeline-ui).
1. Configure el Splunk OpenTelemetry Collector:
    ```bash
    cp /etc/otel/collector/splunk-otel-collector.conf.example etc/otel/collector/splunk-otel-collector.conf
    ```
    ```bash
    # Splunk HEC endpoint URL, if forwarding to Splunk Observability Cloud
    # SPLUNK_HEC_URL=https://ingest.us0.signalfx.com/v1/log
    # If you're forwarding to a Splunk Enterprise instance running on example.com, with HEC at port 8088:
    SPLUNK_HEC_URL=http://<OPW_HOST>:8088/services/collector
    ```
   -  `<OPW_HOST>` es la IP o URL del servidor (o balanceador de carga) asociado con el Observability Pipelines Worker.
        - Para instalaciones de CloudFormation, la `LoadBalancerDNS` salida de CloudFormation tiene la URL correcta que debe usar.
        - Para instalaciones de Kubernetes, se puede usar el registro DNS interno del servicio de Observability Pipelines Worker, por ejemplo `opw-observability-pipelines-worker.default.svc.cluster.local`.

**Nota**: Si utiliza un firewall, asegúrese de que permita el tráfico desde el Splunk OpenTelemetry Collector hacia el Worker.

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-kubernetes
[3]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-linux
[4]: /es/observability_pipelines/configuration/set_up_pipelines
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /es/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /es/observability_pipelines/configuration/live_capture/