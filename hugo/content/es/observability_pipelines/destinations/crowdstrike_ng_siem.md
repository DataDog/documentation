---
description: Aprenda a enviar registros a CrowdStrike Next-Gen SIEM utilizando Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de CrowdStrike Next-Gen SIEM
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino CrowdStrike Next-Gen SIEM de Observability Pipelines para enviar registros a CrowdStrike Next-Gen SIEM.

## Requisitos previos {#prerequisites}

Para utilizar el destino CrowdStrike NG-SIEM, necesita configurar un conector de datos de CrowdStrike utilizando el HEC/HTTP Event Connector. Consulte [Paso 1: Configurar el conector de datos de eventos HEC/HTTP][3] para obtener instrucciones. Cuando configura el conector de datos, se le proporciona una clave de API HEC y una URL, las cuales utiliza al configurar Observability Pipelines Worker.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese los identificadores para la URL de punto de conexión, el token y, si corresponde, la clave de paso TLS de CrowdStrike NG-SIEM. <b>No</b> ingrese los valores reales.</div>

Configure el destino CrowdStrike NG-SIEM cuando [configure una canalización][4]. Puede configurar una canalización en la [interfaz de usuario][1], utilizando la [API][5] o con [Terraform][6]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino CrowdStrike NG-SIEM en la interfaz de usuario de la canalización:

1. Ingrese el identificador para su URL de punto de conexión de CrowdStrike NG-SIEM. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador para su token de CrowdStrike NG-SIEM. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione la codificación {{< ui >}}JSON{{< /ui >}} o {{< ui >}}Raw{{< /ui >}} en el menú desplegable.

{{% observability_pipelines/secrets_env_var_note %}}

#### Configuración opcional {#optional-settings}

##### Habilite la compresión {#enable-compressions}

1. Cambie el interruptor a {{< ui >}}Enable compressions{{< /ui >}}.
1. Seleccione un algoritmo ({{< ui >}}gzip{{< /ui >}} o {{< ui >}}zlib{{< /ui >}}) en el menú desplegable.

##### Habilite TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

##### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de URL de punto de conexión de CrowdStrike NG-SIEM:
	- En su administrador de secretos, **no** incluya el sufijo `/services/collector` en la URL. La URL debe seguir este formato: `https://<your_instance_id>.ingest.us-1.crowdstrike.com`.
	- El identificador predeterminado es `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_ENDPOINT_URL`.
- Identificador de token de CrowdStrike NG-SIEM:
	- El identificador predeterminado es `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_TOKEN`.
- Identificador de frase de contraseña TLS de CrowdStrike NG-SIEM (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: https://falcon.us-2.crowdstrike.com/documentation/page/bdded008/hec-http-event-connector-guide
[4]: /es/observability_pipelines/configuration/set_up_pipelines/
[5]: /es/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline