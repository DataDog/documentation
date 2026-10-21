---
aliases:
- /es/continuous_integration/setup_pipelines/github
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Amplíe Pipeline Visibility añadiendo etiquetas y métricas personalizadas
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: blog
  text: Haga un seguimiento de sus flujos de trabajo de GitHub Actions con Datadog
    CI Visibility
title: Configuración de GitHub Actions para CI Visibility
---
## Descripción general {#overview}

[GitHub Actions][1] es una herramienta de automatización que le permite compilar, probar e implementar su código en GitHub. Cree flujos de trabajo que automaticen cada paso de su proceso de desarrollo, optimizando las actualizaciones de software y mejorando la calidad del código con funciones de CI/CD integradas en sus repositorios.

Configure CI Visibility para GitHub Actions para realizar un seguimiento de la ejecución de sus flujos de trabajo, identificar cuellos de botella en el rendimiento, solucionar problemas operativos y optimizar sus procesos de implementación.

### Compatibilidad {#compatibility}

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Pipelines en ejecución][2] | Pipelines en ejecución | Visualice las ejecuciones de pipelines que se están ejecutando. Los pipelines en cola o en espera se muestran con el estado "Running" en Datadog. |
| [Trabajos en ejecución][28] | Trabajos en ejecución | Visualice las ejecuciones de trabajos que se están ejecutando actualmente. |
| [Análisis de registros][23] | Análisis de registros | Utiliza modelos LLM en los registros relevantes para analizar la causa raíz de los trabajos de CI fallidos. |
| Correlación de registros | Correlación de registros | Correlacione los tramos de pipeline y de trabajo con los registros. Requiere [almacenamiento de logs](#logs-storage). |
| [Reintentos parciales][3] | Pipelines parciales | Visualice las ejecuciones de pipelines reintentadas parcialmente. |
| [Reintentos automáticos de trabajos][27] | Reintentos automáticos de trabajos | Datadog reintenta los trabajos fallidos clasificados como transitorios por su modelo de error de IA. |
| Correlación de métricas de infraestructura | Correlación de métricas de infraestructura | Correlacione los trabajos con las [métricas de servidor de infraestructura][4] para los trabajos de GitHub. |
| [Etiquetas personalizadas][5] [y medidas en tiempo de ejecución][6] | Etiquetas y medidas personalizadas en tiempo de ejecución | Configure [etiquetas y medidas personalizadas][7] en tiempo de ejecución. |
| [Tiempo de cola][8] | Tiempo de cola | Visualice la cantidad de tiempo que los trabajos de pipeline permanecen en la cola antes de procesarse. |
| [Tiempo de espera de aprobación][9] | Tiempo de espera de aprobación | Visualice la cantidad de tiempo que las ejecuciones de flujo de trabajo y los trabajos de flujo de trabajo esperan para aprobaciones manuales. |
| [Rangos personalizados][10] | Rangos personalizados | Configure rangos personalizados para sus pipelines. |
| [Filtrar trabajos de CI en la ruta crítica][24] | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica. |
| [Tiempo de ejecución][25] | Tiempo de ejecución  | Visualice la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |


Se admiten las siguientes versiones de GitHub:

- GitHub.com (SaaS)
- GitHub Enterprise Server (GHES) 3.5.0 o posterior

### Terminología {#terminology}

Esta tabla muestra el mapeo de conceptos entre Datadog CI Visibility y GitHub Actions:

| Datadog  | GitHub Actions |
|----------|----------------|
| Pipeline | flujo de trabajo       |
| Trabajo      | Trabajo            |
| Paso     | Paso           |

## Configurar la integración de Datadog {#configure-the-datadog-integration}

### Configure una GitHub App {#configure-a-github-app}

La integración de [GitHub Actions][1] utiliza una [GitHub App][11] privada para recopilar información sobre los flujos de trabajo. Si ya tiene una aplicación, puede saltar a la siguiente sección.

1. Vaya al [GitHub integration tile][12].
2. Haga clic en {{< ui >}}\+ Create GitHub App{{< /ui >}}.
3. Configure la integración para una cuenta personal o de organización e introduzca el nombre de la organización de GitHub.
3. Seleccione las funciones de Datadog que desea habilitar para la GitHub App.
4. En la sección {{< ui >}}Edit Permissions{{< /ui >}}, otorgue acceso a `Actions: Read Only`.
5. Haga clic en {{< ui >}}Create App in GitHub{{< /ui >}} para finalizar el proceso de creación de la aplicación en GitHub.
6. Asigne un nombre a la aplicación, por ejemplo, `Datadog CI Visibility`.
7. Haga clic en {{< ui >}}Install GitHub App{{< /ui >}} y siga las instrucciones en GitHub.

### Configure CI Visibility para GitHub Actions {#configure-ci-visibility-for-github-actions}

Después de crear e instalar la GitHub App, habilite CI Visibility en las cuentas y/o repositorios de los que desea obtener visibilidad.

1. En Datadog, navegue a [**Software Delivery** > **CI Visibility** > **Add a Pipeline Provider**][13] y seleccione **GitHub**.
2. Haga clic en {{< ui >}}Enable Account{{< /ui >}} para la cuenta que desea habilitar.
3. Habilite CI Visibility para toda la cuenta haciendo clic en el interruptor junto a {{< ui >}}Enable CI Visibility{{< /ui >}}.
4. Alternativamente, puede habilitar repositorios individuales desplazándose por la lista de repositorios y haciendo clic en el interruptor {{< ui >}}Enable CI Visibility{{< /ui >}}.

Pipelines aparecen inmediatamente después de habilitar CI Visibility para cualquier cuenta o repositorio.

### Deshabilitar CI Visibility para GitHub Actions {#disable-ci-visibility-for-github-actions}

Para deshabilitar la integración de GitHub Actions de CI Visibility:

1. Abra [**CI/CD Optimization** > **Settings** > **GitHub Actions**][14].
2. Elija la cuenta de GitHub para la que desea deshabilitar CI Visibility y haga clic en {{< ui >}}Account Enabled{{< /ui >}}.
3. Desactive {{< ui >}}Enable CI Visibility{{< /ui >}}, o elija para qué repositorio desea desactivarlo individualmente.

### Administrar registros de trabajo {#manage-job-logs}

#### Análisis de registros {#logs-analysis}

El Análisis de registros utiliza modelos de LLM para clasificar las fallas de los trabajos por causa raíz basándose en los registros relevantes provenientes de GitHub Actions.

Para obtener una explicación completa, consulte la guía sobre [cómo usar el Análisis de registros][23].

El Análisis de registros está habilitado de forma predeterminada en Datadog. Para administrar la configuración del Análisis de registros, vaya a [Configuración del repositorio de CI/CD][29] y configure el Análisis de registros a nivel de la organización de Datadog o para los repositorios deseados.

También puede agregar el Análisis de registros a un comentario de PR. Consulte la guía sobre [cómo usar comentarios de PR][26].

Tener habilitado el Análisis de registros también es un requisito previo para los [reintentos automáticos de trabajos][27].

#### Almacenamiento de registros {#logs-storage}

Para habilitar el almacenamiento de registros, vaya a [CI/CD Repository settings][29] y habilite el almacenamiento de registros a nivel de la organización de Datadog o para los repositorios deseados.

El Almacenamiento de registros se factura por separado de CI Visibility. La retención, exclusión e índices de registros se configuran en [Log Management][16]. Los registros de los trabajos de GitHub se pueden identificar mediante las etiquetas `datadog.product:cipipeline` y `source:github`.

Los registros de trabajo se recopilan en [Log Management][15] y, una vez almacenados, se correlacionan automáticamente con los flujos de trabajo de GitHub Actions en CI Visibility. Los archivos de registro mayores a un GiB se truncan.

### Correlacione métricas de infraestructura con trabajos {#correlate-infrastructure-metrics-to-jobs}

La integración de CI Visibility para GitHub Actions permite la correlación entre la infraestructura y los trabajos. Para lograr esto, asegúrese de que el [Datadog Agent][20] se esté ejecutando en el servidor donde se ejecutan los trabajos. Dependiendo de la configuración, es posible que se requieran pasos adicionales:

- Para [Actions Runner Controller][21]: No se requiere configuración adicional. Debido a limitaciones en el Datadog Agent, es posible que los trabajos más cortos que el intervalo mínimo de recopilación del Agente de Datadog no siempre muestren métricas de correlación de infraestructura. Para ajustar este valor, establezca `min_collection_interval` en menos de 15 segundos en su [archivo de configuración del Datadog Agent][22].

- Para otras configuraciones: para correlacionar los trabajos con los servidores que los ejecutan, asegúrese de que el nombre del ejecutor de GitHub coincida con el nombre de servidor de la máquina.

Para ver las métricas, haga clic en un tramo de trabajo en la vista de traza. Se abre una ventana con una pestaña {{< ui >}}Infrastructure{{< /ui >}} que muestra las métricas del servidor.

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Las páginas [**Lista de Pipelines de CI**][17] y [**Ejecuciones**][18] se completan con datos una vez que finalizan los Pipelines.

La página {{< ui >}}CI Pipeline List{{< /ui >}} muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Buscar y administrar Pipelines de CI][19].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: /es/glossary/#running-pipeline
[3]: /es/glossary/#partial-retry
[4]: /es/continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs
[5]: /es/glossary/#custom-tag
[6]: /es/glossary/#measure
[7]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /es/glossary/#queue-time
[9]: /es/glossary/#approval-wait-time
[10]: /es/glossary/#custom-span
[11]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[12]: https://app.datadoghq.com/integrations/github/
[13]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[14]: https://app.datadoghq.com/ci/settings/ci-cd/github
[15]: /es/logs/
[16]: /es/logs/guide/best-practices-for-log-management/
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/ci/pipeline-executions
[19]: /es/continuous_integration/search/#search-for-pipelines
[20]: /es/agent
[21]: https://github.com/actions/actions-runner-controller
[22]: /es/agent/configuration/agent-configuration-files/
[23]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/
[24]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[25]: /es/glossary/#pipeline-execution-time
[26]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[27]: /es/continuous_integration/pipelines/automatic_retries/
[28]: /es/glossary/#running-job
[29]: https://app.datadoghq.com/ci/settings/ci-cd/repositories