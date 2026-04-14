---
disable_toc: false
products:
- icon: logs
  name: Logs
title: Sumo Logic Hosted Collector
---

{{< product-availability >}}

Utiliza la fuente Sumo Logic Hosted Collector de Observability Pipelines para recibir logs enviados a tu Sumo Logic Hosted Collector. Selecciona y configura esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información corresponde a la configuración de la fuente en la interfaz de usuario del pipeline.

En el menú desplegable **Decodificación**, también puedes seleccionar si el formato de entrada es **Bytes** sin procesar, **JSON**, Graylog Extended Log Format (**Gelf**) o **Syslog**. Si no se selecciona ninguna decodificación, ésta será JSON por defecto.

## Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/