---
description: Aprenda a recopilar registros enviados a un Sumo Logic Hosted Collector
  utilizando el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sumo Logic Hosted Collector
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente Sumo Logic Hosted Collector de Observability Pipelines para recibir registros enviados a su Sumo Logic Hosted Collector.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la administración de secretos: solo ingrese el identificador para la dirección de Sumo Logic. <b>No</b> ingrese el valor real.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][2], utilizando la [API][3] o con [Terraform][4]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente Sumo Logic en la interfaz de usuario de la canalización, ingrese el identificador para su dirección de Sumo Logic. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

En el menú desplegable {{< ui >}}Decoding{{< /ui >}}, seleccione si su formato de entrada es raw {{< ui >}}Bytes{{< /ui >}}, {{< ui >}}JSON{{< /ui >}}, Graylog Extended Log Format ({{< ui >}}Gelf{{< /ui >}}) o {{< ui >}}Syslog{{< /ui >}}. Si no se selecciona ninguna decodificación, la decodificación predeterminada es JSON.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de la dirección de Sumo Logic:
	- Hace referencia a la dirección de enlace, como `0.0.0.0:80.`, en la que su Observability Pipelines Worker escucha para recibir registros destinados originalmente a la fuente HTTP de Sumo Logic.
	- El identificador predeterminado es `SOURCE_SUMO_LOGIC_ADDRESS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline