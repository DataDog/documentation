---
description: Aprenda a recopilar métricas enviadas por clientes de Prometheus utilizando
  Observability Pipelines Worker.
disable_toc: false
products:
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Fuente de Prometheus
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente de Prometheus de Observability Pipelines para recibir métricas enviadas por sus clientes de Prometheus.

## Configuración {#setup}

<div class="alert alert-danger">Para Secrets Management: Solo ingrese los identificadores de la dirección de Prometheus y, si corresponde, del nombre de usuario y la contraseña para la autorización simple (también conocida como básica). <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][2], utilizando la [API][3] o con [Terraform][4]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente de Prometheus en la interfaz de usuario del pipeline:

1. Ingrese el identificador para su dirección de Prometheus. Un ejemplo de la dirección de socket a la que hace referencia el identificador: `0.0.0.0:9091`. Si deja el campo de identificador en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese la ruta de la URL en la que se aceptan las solicitudes POST de métricas, como `/api/v1/write`.
1. Seleccione su estrategia de autorización. Si seleccionó {{< ui >}}Plain{{< /ui >}}:
    - Ingrese los identificadores para su nombre de usuario y contraseña de Prometheus. Si los deja en blanco, se utilizan los [predeterminados](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Configurar tokens de autenticación {#configure-authentication-tokens}

Si almacena tokens como credenciales en el encabezado de autorización de su cliente de Prometheus, puede configurar el Worker para verificar si las solicitudes entrantes tienen un token válido. Los eventos de solicitud que no tienen un token válido se descartan. El Worker también puede buscar una ruta de un punto de conexión o una dirección IP en lugar de un encabezado. Solo puede configurar tokens de autenticación cuando la estrategia de autorización está establecida en **None**.

{{% observability_pipelines/configure_authentication_tokens %}}

#### Configure keepalive {#configure-keepalive}

Para configurar los ajustes de keepalive para las conexiones a la fuente, habilite el interruptor {{< ui >}}Configure keepalive{{< /ui >}}:

- {{< ui >}}Max connection age{{< /ui >}}: El número máximo de segundos después del cual se cierra una conexión. El valor predeterminado es `300` segundos.
- {{< ui >}}Max connection age jitter factor{{< /ui >}}: El factor utilizado para aleatorizar la duración máxima de la conexión, de modo que las conexiones no se cierren todas simultáneamente. El valor predeterminado es `0.1`.

#### Habilitar TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección de Prometheus:
	- Hace referencia a la dirección del socket en la que Observability Pipelines Worker escucha las métricas de Prometheus. Un ejemplo de la dirección del socket a la que hace referencia el identificador: `0.0.0.0:9091`.
	- El identificador predeterminado es `SOURCE_PROMETHEUS_REMOTE_WRITE_ADDRESS`.
- Si utiliza autenticación simple:
	- Identificador de nombre de usuario de Prometheus:
		- El identificador predeterminado es `SOURCE_PROMETHEUS_REMOTE_WRITE_USERNAME`.
	- Identificador de contraseña de Prometheus:
		- El identificador predeterminado es `SOURCE_PROMETHEUS_REMOTE_WRITE_PASSWORD`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline