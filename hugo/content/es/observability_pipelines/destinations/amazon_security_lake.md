---
description: Aprenda a enviar registros a Amazon Security Lake utilizando Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Amazon Security Lake
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Amazon Security Lake de Observability Pipelines para enviar registros a Amazon Security Lake.

## Requisitos previos {#prerequisites}

Debe hacer lo siguiente antes de configurar el destino de Amazon Security Lake:

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

## Configuración {#setup}

Configure el destino de Amazon Security Lake cuando [configure un pipeline][6]. Puede configurar un pipeline en la [UI][1], utilizando la [API][7] o con [Terraform][8]. Los pasos en esta sección se configuran en la interfaz de usuario.

**Notas**:
- Cuando agrega el destino de Amazon Security Lake, el procesador OCSF se agrega automáticamente para que pueda convertir sus registros a Parquet antes de que se envíen a Amazon Security Lake. Consulte la [documentación de Remap to OCSF][3] para obtener instrucciones de configuración.
- Solo los registros formateados por el procesador OCSF se convierten a Parquet.

Después de seleccionar el destino de Amazon Security Lake en la interfaz de usuario del pipeline:

1. Ingrese el nombre de su bucket de S3.
1. Ingrese la región de AWS.
1. Ingrese el nombre de fuente personalizado.

#### Configuración opcional {#optional-settings}

##### Autenticación de AWS {#aws-authentication}

1. Seleccione una opción de [autenticación de AWS][5].
1. Ingrese el ARN del rol de IAM que desea asumir.
1. Opcionalmente, ingrese el nombre de la sesión del rol asumido y el ID externo.

##### Habilitar TLS {#enable-tls}

<div class="alert alert-danger">Para la administración de secretos: solo ingrese el identificador de la frase de contraseña de la clave TLS. <b>No</b> ingrese el valor real.</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

##### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de la frase de contraseña TLS de Amazon Security Lake (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_AWS_SECURITY_LAKE_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino {#how-the-destination-works}

### Autenticación de AWS {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permisos {#permissions}

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 256               | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/processors/remap_ocsf
[5]: /es/observability_pipelines/destinations/amazon_security_lake/#aws-authentication
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: /es/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline