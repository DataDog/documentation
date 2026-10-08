---
description: Aprenda a enviar registros a New Relic usando el Observability Pipelines
  Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de New Relic
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de New Relic de Observability Pipelines para enviar registros a New Relic.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Ingrese únicamente los identificadores para el ID de cuenta y la licencia. <b>No</b> ingrese los valores reales.</div>

Configure el destino de New Relic cuando [configure un pipeline][3]. Puede configurar un pipeline en la [UI][1], utilizando la [API][4] o con [Terraform][5]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de New Relic en la UI del pipeline:

1.  Ingrese el identificador para su ID de cuenta. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1.  Ingrese el identificador para su licencia. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione la región del centro de datos ({{< ui >}}US{{< /ui >}} o {{< ui >}}EU{{< /ui >}}) de su cuenta de New Relic.

{{% observability_pipelines/secrets_env_var_note %}}

### Almacenamiento en búfer opcional {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de su ID de cuenta de New Relic:
	- El identificador predeterminado es `DESTINATION_NEW_RELIC_ACCOUNT_ID`.
- Identificador de su licencia de New Relic:
	- El identificador predeterminado es `DESTINATION_NEW_RELIC_LICENSE_KEY`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 100            | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline