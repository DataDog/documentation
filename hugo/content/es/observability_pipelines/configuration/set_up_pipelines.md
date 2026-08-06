---
aliases:
- /es/observability_pipelines/set_up_pipelines/
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentación
  text: Actualizar una canalización existente
- link: observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: Documentación
  text: Configuraciones avanzadas de Worker para Pipelines de Observabilidad
- link: observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
  tag: Documentación
  text: Ejecutar múltiples canalizaciones en un host
- link: observability_pipelines/monitoring_and_troubleshooting/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Pipelines de Observabilidad
title: Configurar Pipelines
---
## Descripción general {#overview}

<div class="alert alert-info">Los pipelines y procesadores descritos en esta documentación son específicos para entornos de registro locales. Para agregar, procesar y enrutar registros basados en la nube, consulte <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Canalizaciones de Gestión de Registros</a>.</div>

En los Pipelines de Observabilidad, una canalización es un camino secuencial con tres tipos de componentes:
- [Fuente][1]: Recibe datos de su fuente de datos (por ejemplo, el Agente de Datadog).
- [Procesadores][2]: Enriquecen y transforman sus datos.
- [Destinos][3]: Donde se envían sus datos procesados.

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="Pipeline con una fuente conectada a dos grupos de procesadores y dos destinos" style="width:100%;" >}}

Puede crear una canalización con uno de los siguientes métodos:

- [Interfaz de usuario de Pipeline](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

Consulte [Exportar una Configuración de Canalización a JSON o Terraform][14] si desea implementar programáticamente una canalización creada en la interfaz de usuario.

## Configurar una canalización en la interfaz de usuario {#set-up-a-pipeline-in-the-ui}

### Configura los componentes de la canalización {#set-up-pipeline-components}

{{< tabs >}}
{{% tab "Registros" %}}

1. Navega a [Pipelines de Observabilidad][1].
1. Selecciona una [plantilla][2] basada en tu caso de uso.
1. Selecciona y configura tu [fuente][3].
1. Agrega [procesadores][4] para transformar, redactar y enriquecer tus datos de registro. **Nota**: Para un lienzo de canalización, hay un límite de 25 grupos de procesadores y un total de 150 procesadores.
    - Si deseas copiar un procesador, haz clic en el ícono de copiar para ese procesador y luego usa `command-v` para pegarlo.
1. Selecciona y configura [destinos][5] para tus registros procesados.

#### Agrega o elimina componentes {#add-or-remove-components}

##### Agrega otro grupo de procesadores {#add-another-processor-group}

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="La página de Pipelines mostrando dos grupos de procesadores enviando registros al mismo destino" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

##### Agrega otro conjunto de procesadores y destinos {#add-another-set-of-processors-and-destinations}

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="La página de Pipelines mostrando dos grupos de procesadores enviando registros a dos destinos diferentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

##### Agrega otro destino a un grupo de procesadores {#add-another-destination-to-a-processor-group}

{{< img src="observability_pipelines/setup/another_destination.png" alt="La página de Pipelines mostrando un grupo de procesadores enviando registros a dos destinos diferentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/explore_templates/
[3]: /es/observability_pipelines/sources/
[4]: /es/observability_pipelines/processors/
[5]: /es/observability_pipelines/destinations/
[11]: /es/observability_pipelines/search_syntax/logs/

{{% /tab %}}
{{% tab "Métricas" %}}

<div class="alert alert-info">
La gobernanza de etiquetas métricas está en vista previa. Complete el <a href="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/">formulario</a> para solicitar acceso.</div>

1. Navega a [Observability Pipelines][1].
1. Seleccione la plantilla de [Gobernanza de Etiquetas Métricas][2].
1. Configure la fuente de [Agente de Datadog][3].
1. Agregue [procesadores][4] para filtrar y transformar sus métricas. **Nota**: Para un lienzo de pipeline, hay un límite de 25 grupos de procesadores y un total de 150 procesadores.
    - Si desea copiar un procesador, haga clic en el ícono de copiar para ese procesador y luego péguelo (`Cmd+V` en Mac, `Ctrl+V` en Windows/Linux).
1. Configure el destino de [Métricas de Datadog][5].

#### Agregue otro grupo de procesadores {#add-another-processor-group-1}

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="La página de Pipelines mostrando dos grupos de procesadores enviando registros al mismo destino" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /es/observability_pipelines/sources/datadog_agent/?tab=metrics
[4]: /es/observability_pipelines/processors/
[5]: /es/observability_pipelines/destinations/datadog_metrics/
[11]: /es/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### Instale el Worker y despliegue la canalización {#install-the-worker-and-deploy-the-pipeline}

Después de haber configurado su fuente, procesadores y destinos, haga clic en **Siguiente: Instalar**. Consulte [Instalar el Worker][12] para obtener instrucciones sobre cómo instalar el Worker para su plataforma. Consulte [Configuraciones Avanzadas del Worker][5] para opciones de arranque.

Si desea realizar cambios en su canalización después de haberla desplegado, consulte [Actualizar Canalizaciones Existentes][11].

### Habilite monitores listos para usar para su canalización {#enable-out-of-the-box-monitors-for-your-pipeline}

1. Navegue a la página de [Canalizaciones][4] y encuentre su canalización.
1. Haga clic en **Habilitar monitores** en la columna **Monitores** para su canalización.
1. Haga clic en **Iniciar** para configurar un monitor para uno de los casos de uso sugeridos.<br>
    - El monitor métrico está configurado según el caso de uso seleccionado. Puede actualizar la configuración para personalizarla aún más. Consulte la [documentación del monitor métrico][13] para más información.

## Configure una canalización con la API {#set-up-a-pipeline-with-the-api}

1. Utilice la API de Observability Pipelines para [crear una canalización][6]. Consulte la referencia de la API para ejemplos de cargas útiles de solicitudes.

1. Después de crear la canalización, [instale el Worker][7] para enviar datos a través de la canalización.
    - Consulte [Variables de Entorno][9] para la lista de variables de entorno que necesita para las diferentes fuentes, procesadores y destinos al instalar el Worker.

Utilice el endpoint de [actualizar una canalización][8] para realizar cualquier cambio en una canalización existente.

Consulte [Configuraciones Avanzadas del Worker][5] para opciones de arranque.

## Configure un pipeline con Terraform {#set-up-a-pipeline-with-terraform}

<div class="alert alert-warning"><a href="https://github.com/DataDog/terraform-provider-datadog/releases/tag/v3.84.0">Terraform 3.84.0</a> reemplaza procesadores independientes con <a href="/observability_pipelines/processors/#processor-groups">grupos de procesadores</a> y es un cambio disruptivo. Si desea actualizar a Terraform 3.84.0, consulte la <a href="https://github.com/DataDog/terraform-provider-datadog/pull/3346">descripción del PR</a> para obtener instrucciones sobre cómo migrar sus recursos existentes.</div>

1. Puede utilizar el módulo [datadog_observability_pipeline][10] para crear un pipeline utilizando Terraform.

1. Después de crear el pipeline, [instale el Worker][7] para enviar datos a través del pipeline.
    - Consulte [Variables de Entorno][9] para la lista de variables de entorno que necesita para las diferentes fuentes, procesadores y destinos al instalar el Worker.

Utilice el módulo [datadog_observability_pipeline][10] para realizar cualquier cambio en un pipeline existente.

Consulte [Configuraciones Avanzadas del Worker][5] para opciones de arranque.

## Clone un pipeline {#clone-a-pipeline}

Para clonar un pipeline en la interfaz de usuario:

1. Navegue a [Observability Pipelines][4].
1. Seleccione el pipeline que desea clonar.
1. Haga clic en el engranaje en la parte superior derecha de la página, luego seleccione **Clonar**.

## Eliminar un pipeline{#delete-a-pipeline}

Para eliminar un pipeline en la interfaz de usuario:

1. Navegue a [Pipelines de Observabilidad][4].
1. Seleccione el pipeline que desea eliminar.
1. Haga clic en el engranaje en la parte superior derecha de la página, luego seleccione **Eliminar**.

**Nota**: No puede eliminar un pipeline activo. Debe detener todos los Workers de un pipeline antes de poder eliminarlo.

## Requisitos y límites del pipeline {#pipeline-requirements-and-limits}

- Un pipeline debe tener al menos un destino. Si un grupo de procesadores solo tiene un destino, ese destino no puede ser eliminado.
- Para pipelines de logs:
  - Puede agregar un total de tres destinos para un pipeline de logs.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/sources/
[2]: /es/observability_pipelines/processors/
[3]: /es/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /es/observability_pipelines/configuration/install_the_worker/?tab=docker#api-or-terraform-pipeline-setup
[8]: /es/api/latest/observability-pipelines/#update-a-pipeline
[9]: /es/observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /es/observability_pipelines/configuration/update_existing_pipelines/?
[12]: /es/observability_pipelines/configuration/install_the_worker/
[13]: /es/monitors/types/metric/
[14]: /es/observability_pipelines/configuration/export_pipeline_configuration/