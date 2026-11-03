---
aliases:
- /es/observability_pipelines/set_up_pipelines/
description: Aprenda a configurar la fuente, los procesadores y los destinos de una
  pipeline de Observability Pipelines.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/pipeline_simulation/
  tag: Documentación
  text: Utilice Pipeline Simulation para agregar, actualizar y validar sus procesadores
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentación
  text: Actualizar una pipeline existente
- link: observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: Documentación
  text: Configuraciones avanzadas de Worker para Observability Pipelines
- link: observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
  tag: Documentación
  text: Ejecute múltiples pipelines en un servidor
- link: observability_pipelines/monitoring_and_troubleshooting/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Observability Pipelines
title: Configurar Pipelines
---
## Descripción general {#overview}

<div class="alert alert-info">Las pipelines y los procesadores descritos en esta documentación son específicos para entornos de registro locales. Para agregar, procesar y enrutar registros basados en la nube, consulte <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Log Management Pipelines</a>.</div>

En Observability Pipelines, una pipeline es una ruta secuencial con tres tipos de componentes:
- [Fuente][1]: Recibe datos de su fuente de datos (por ejemplo, el Datadog Agent).
- [Procesadores][2]: Enriquecen y transforman sus datos.
- [Destinos][3]: Donde se envían sus datos procesados.

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="Pipeline con una fuente conectada a dos grupos de procesadores y dos destinos" style="width:100%;" >}}

Puede crear una pipeline con uno de los siguientes métodos:

- [Pipeline UI](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

Consulte [Exportar una configuración de pipeline a JSON o Terraform][14] si desea implementar mediante programación una pipeline creada en la UI.

## Configure una pipeline en la UI {#set-up-a-pipeline-in-the-ui}

### Configurar componentes de la pipeline {#set-up-pipeline-components}

{{< tabs >}}
{{% tab "Registros" %}}

1. Navegue a [Observability Pipelines][1].
1. Seleccione una [plantilla][2] según su caso de uso, o haga clic en {{< ui >}}New Pipeline{{< /ui >}} y seleccione {{< ui >}}Logs Pipeline{{< /ui >}}.
1. Seleccione y configure una [fuente de registro][3].
1. Seleccione y configure [destinos][5] para sus registros procesados.
1. Haga clic en {{< ui >}}Edit{{< /ui >}} en un grupo de procesadores para agregar, actualizar y validar sus [procesadores][4] mediante [Pipeline Simulation][6].
    - **Notas**:
      - Para un lienzo de pipeline, existe un límite de 25 grupos de procesadores y un total de 150 procesadores.
      - Si desea copiar un procesador, haga clic en el icono de copiar de ese procesador y luego use `command-v` para pegarlo.

#### Agregue otro grupo de procesadores {#add-another-processor-group}

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="La página de Pipelines que muestra dos grupos de procesadores enviando registros al mismo destino" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### Agregue otro conjunto de procesadores y destinos {#add-another-set-of-processors-and-destinations}

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="La página Pipelines que muestra dos grupos de procesadores enviando registros a dos destinos diferentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### Agregue otro destino a un grupo de procesadores {#add-another-destination-to-a-processor-group}

{{< img src="observability_pipelines/setup/another_destination.png" alt="La página Pipelines que muestra un grupo de procesadores enviando registros a dos destinos diferentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/explore_templates/
[3]: /es/observability_pipelines/sources/?tab=logs#sources
[4]: /es/observability_pipelines/processors/
[5]: /es/observability_pipelines/destinations/?tab=logs#destinations
[6]: /es/observability_pipelines/configuration/pipeline_simulation/
[11]: /es/observability_pipelines/search_syntax/logs/

{{% /tab %}}
{{% tab "Métricas" %}}

1. Navegue a [Observability Pipelines][1].
1. Seleccione la plantilla de [Gobernanza de etiquetas de métricas][2], o haga clic en {{< ui >}}New Pipeline{{< /ui >}} y seleccione {{< ui >}}Metrics Pipeline{{< /ui >}}.
1. Seleccione y configure una [fuente de métricas][3].
1. Seleccione y configure [destinos][5] para sus métricas procesadas.
1. Haga clic en {{< ui >}}Edit{{< /ui >}} en un grupo de procesadores para agregar, actualizar y validar sus [procesadores][4] mediante [Pipeline Simulation][6].
    - **Notas**:
      - Para un lienzo de pipeline, existe un límite de 25 grupos de procesadores y un total de 150 procesadores.
      - Si desea copiar un procesador, haga clic en el icono de copiar de ese procesador y luego péguelo (`Cmd+V` en Mac, `Ctrl+V` en Windows/Linux).

#### Agregue otro grupo de procesadores {#add-another-processor-group-1}

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="La página Pipelines que muestra dos grupos de procesadores enviando métricas al mismo destino" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### Agregue otro conjunto de procesadores y destinos {#add-another-set-of-processors-and-destinations-1}

{{< img src="observability_pipelines/setup/another_set_processor_destination_metrics.png" alt="La página Pipelines que muestra dos grupos de procesadores enviando métricas a dos destinos diferentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### Agregue otro destino a un grupo de procesadores {#add-another-destination-to-a-processor-group-1}

{{< img src="observability_pipelines/setup/another_destination_metrics.png" alt="La página Pipelines que muestra un grupo de procesadores enviando métricas a dos destinos diferentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /es/observability_pipelines/sources/?tab=metrics#sources
[4]: /es/observability_pipelines/processors/?tab=metrics#processors
[5]: /es/observability_pipelines/destinations/?tab=metrics#destinations
[6]: /es/observability_pipelines/configuration/pipeline_simulation/
[11]: /es/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### Instale el Worker y despliegue el pipeline {#install-the-worker-and-deploy-the-pipeline}

Después de haber configurado su fuente, procesadores y destinos, haga clic en {{< ui >}}Next: Install{{< /ui >}}. Consulte [Install the Worker][12] para obtener instrucciones sobre cómo instalar el Worker para su plataforma. Consulte [Advanced Worker Configurations][5] para ver las opciones de arranque.

Si desea realizar cambios en su pipeline después de haberlo implementado, consulte [Update Existing Pipelines][11].

### Habilite los monitores integrados para su pipeline {#enable-out-of-the-box-monitors-for-your-pipeline}

1. Navegue a la página [Pipelines][4] y busque su pipeline.
1. Haga clic en {{< ui >}}Enable monitors{{< /ui >}} en la columna {{< ui >}}Monitors{{< /ui >}} para su pipeline.
1. Haga clic en {{< ui >}}Start{{< /ui >}} para configurar un monitor para uno de los casos de uso sugeridos.<br>
    - El monitor de métricas se configura según el caso de uso seleccionado. Puede actualizar la configuración para personalizarla aún más. Consulte la [documentación del monitor de métricas][13] para obtener más información.

## Configure un pipeline con la API {#set-up-a-pipeline-with-the-api}

1. Utilice la API de Observability Pipelines para [crear un pipeline][6]. Consulte la referencia de la API para ver ejemplos de cargas útiles de solicitud.

1. Después de crear el pipeline, [instale el Worker][7] para enviar datos a través del pipeline.
    - Consulte [Environment Variables][9] para obtener la lista de variables de entorno que necesita para los diferentes orígenes, procesadores y destinos al instalar el Worker.

Utilice el punto de conexión [update a pipeline][8] para realizar cualquier cambio en un pipeline existente.

Consulte [Advanced Worker Configurations][5] para ver las opciones de arranque.

## Configure un pipeline con Terraform {#set-up-a-pipeline-with-terraform}

<div class="alert alert-warning"><a href="https://github.com/DataDog/terraform-provider-datadog/releases/tag/v3.84.0">Terraform 3.84.0</a> reemplaza los procesadores independientes con <a href="/observability_pipelines/processors/#processor-groups">grupos de procesadores</a> y es un cambio importante. Si desea actualizar a Terraform 3.84.0, consulte la <a href="https://github.com/DataDog/terraform-provider-datadog/pull/3346">descripción del PR</a> para obtener instrucciones sobre cómo migrar sus recursos existentes.</div>

1. Puede utilizar el módulo [datadog_observability_pipeline][10] para crear un pipeline mediante Terraform.

1. Después de crear el pipeline, [instale el Worker][16] para enviar datos a través del pipeline.
    - Consulte [Environment Variables][9] para obtener la lista de variables de entorno que necesita para los diferentes orígenes, procesadores y destinos al instalar el Worker.

Utilice el módulo [datadog_observability_pipeline][10] para realizar cualquier cambio en un pipeline existente.

Consulte [Advanced Worker Configurations][5] para ver las opciones de arranque.

## Clonar un pipeline {#clone-a-pipeline}

Para clonar un pipeline en la interfaz de usuario:

1. Navegue a [Observability Pipelines][4].
1. Seleccione el pipeline que desea clonar.
1. Haga clic en el engranaje en la parte superior derecha de la página y luego seleccione {{< ui >}}Clone{{< /ui >}}.

## Eliminar un pipeline {#delete-a-pipeline}

Para eliminar un pipeline en la interfaz de usuario:

1. Navegue a [Observability Pipelines][4].
1. Seleccione el pipeline que desea eliminar.
1. Haga clic en el engranaje en la parte superior derecha de la página y luego seleccione {{< ui >}}Delete{{< /ui >}}.

**Nota**: No puede eliminar una pipeline activa. Debe detener todos los Workers de un pipeline antes de poder eliminarlo.

## Requisitos y límites del pipeline {#pipeline-requirements-and-limits}

- Un pipeline debe tener al menos un destino. Si un grupo de procesadores solo tiene un destino, ese destino no se puede eliminar.
- Para pipelines de registro:
  - Puede agregar un total de 20 destinos para un pipeline de registro.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/sources/
[2]: /es/observability_pipelines/processors/
[3]: /es/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /es/observability_pipelines/configuration/install_the_worker/?interface=api&platform=docker&secrets_source=secrets_management
[8]: /es/api/latest/observability-pipelines/#update-a-pipeline
[9]: /es/observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /es/observability_pipelines/configuration/update_existing_pipelines/?
[12]: /es/observability_pipelines/configuration/install_the_worker/
[13]: /es/monitors/types/metric/
[14]: /es/observability_pipelines/configuration/export_pipeline_configuration/
[16]: /es/observability_pipelines/configuration/install_the_worker/?interface=terraform&platform=docker&secrets_source=secrets_management