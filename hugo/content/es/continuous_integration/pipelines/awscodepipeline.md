---
aliases:
- /es/continuous_integration/setup_pipelines/codepipeline
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
- link: /continuous_integration/search/
  tag: Documentación
  text: Busque y administre pipelines de CI.
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: Blog
  text: Haga un seguimiento y mejore su CI/CD en AWS CodePipeline con Datadog CI Visibility
title: Configuración de AWS CodePipeline para CI Visibility
---
## Descripción general {#overview}

[AWS CodePipeline][1] es un servicio de entrega continua totalmente administrado que le ayuda a automatizar sus pipelines de lanzamiento para obtener actualizaciones rápidas y confiables de aplicaciones e infraestructura.

Configure CI Visibility para AWS CodePipeline para recopilar datos sobre las ejecuciones de pipelines, analizar cuellos de botella de rendimiento o problemas operativos, y hacer un seguimiento de sus flujos de trabajo de implementación.

### Compatibilidad {#compatibility}

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Reintentos parciales][14] | Pipelines parciales | Visualizar las ejecuciones de pipelines reintentadas parcialmente. |
| *[Pipelines en ejecución][15] | Pipelines en ejecución | Visualizar las ejecuciones de pipelines que se están ejecutando. Los pipelines en cola o en espera se muestran con el estado "Running" en Datadog. |
| **Correlación de registros | Correlación de registros	| Correlacione los rangos de pipelines y trabajos con los registros. Requiere [almacenamiento de logs](#logs-storage). |
| [Tiempo de espera de aprobación][17] | Tiempo de espera de aprobación  | Visualizar la cantidad de tiempo que los trabajos y los pipelines esperan para aprobaciones manuales. |
| [Rangos personalizados][18] | Rangos personalizados | Configure rangos personalizados para sus pipelines. |
| [Filtrar trabajos de CI en la ruta crítica][19] | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica. |
| [Tiempo de ejecución][20] | Tiempo de ejecución  | Visualizar la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |

*Los pipelines en ejecución de AWS CodePipeline no tienen información de Git hasta que finalizan.\
**La correlación de registros de AWS CodePipeline solo está disponible para acciones de AWS CodeBuild.

### Terminología {#terminology}

Esta tabla muestra el mapeo de conceptos entre Datadog CI Visibility y AWS CodePipeline:

| Datadog  | AWS CodePipeline |
|----------|------------------|
| Pipeline | Pipeline         |
| Etapa    | Etapa            |
| Trabajo      | Acción           |

## Configurar la integración de Datadog {#configure-the-datadog-integration}

Para configurar la integración entre [AWS CodePipeline][1] y Pipeline Visibility, cree dos recursos de AWS.

[Destino de API][2]
: Un punto de conexión HTTP que apunta a la ingesta de Datadog.

[Regla de AWS EventBridge][3]
: Una regla que reenvía los eventos de CodePipeline al destino de API.

Puede crear estos recursos por separado, o al mismo tiempo, durante el proceso de creación de la regla de EventBridge.
Para obtener más información sobre la supervisión de eventos de canalización, consulte la [guía oficial de AWS][4].

## Cree el destino de API {#create-the-api-destination}

1. En la consola de AWS, navegue a {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}API destinations{{< /ui >}} y haga clic en {{< ui >}}Create API destination{{< /ui >}}.
2. Elija un nombre para el destino de API (por ejemplo, `datadog-ci-visibility-api`) y, opcionalmente, añada una descripción.
3. En {{< ui >}}API destination endpoint{{< /ui >}}, introduzca <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. En {{< ui >}}HTTP method{{< /ui >}}, seleccione {{< ui >}}POST{{< /ui >}}.
5. En Tipo de conexión, seleccione {{< ui >}}Create a new connection{{< /ui >}}:
   1. Elija un nombre para la conexión (por ejemplo, `datadog-ci-visibility-connection`) y, opcionalmente, añada una descripción.
   2. En {{< ui >}}Destination type{{< /ui >}}, seleccione {{< ui >}}Other{{< /ui >}}.
   3. En {{< ui >}}Authorization type{{< /ui >}}, seleccione {{< ui >}}API key{{< /ui >}}. Introduzca `DD-API-KEY` como {{< ui >}}API key name{{< /ui >}} y añada su [clave de Datadog API][5] en el campo {{< ui >}}Value{{< /ui >}}.
6. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Cree la regla de EventBridge {#create-the-eventbridge-rule}

1. En la consola de AWS, navegue a {{< ui >}}EventBridge{{< /ui >}} > {{< ui >}}Rules{{< /ui >}} y haga clic en {{< ui >}}Create Rule{{< /ui >}}.
2. Elija un nombre para la regla (por ejemplo, `datadog-ci-visibility-integration`) y, opcionalmente, agregue una descripción.
3. Deje el bus de eventos como {{< ui >}}default{{< /ui >}} y, en {{< ui >}}Rule Type{{< /ui >}}, seleccione {{< ui >}}Rule with an event pattern{{< /ui >}}. Haga clic en {{< ui >}}Next{{< /ui >}}.
4. En {{< ui >}}Event Source{{< /ui >}}, seleccione {{< ui >}}AWS events or EventBridge partner events{{< /ui >}}.
5. En {{< ui >}}Creation Method{{< /ui >}}, seleccione {{< ui >}}Custom pattern (JSON editor){{< /ui >}}. Luego, en {{< ui >}}Event Pattern{{< /ui >}}, ingrese lo siguiente:

   ```json
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```

   El JSON anterior configura la integración para todos sus pipelines. Para restringir el conjunto de pipelines,
   siga la sección [Only monitor specific pipelines](#only-monitor-specific-pipelines) a continuación.

6. Haga clic en {{< ui >}}Next{{< /ui >}}.
7. En {{< ui >}}Target Types{{< /ui >}}, seleccione {{< ui >}}EventBridge API destination{{< /ui >}}. Luego, elija {{< ui >}}Use an existing API Destination{{< /ui >}} y seleccione el destino de API que creó en el paso anterior. Alternativamente, también puede crear el destino de API siguiendo los pasos descritos en la sección [Create the API Destination](#create-the-api-destination).
8. En {{< ui >}}Headers Parameters{{< /ui >}}, haga clic en {{< ui >}}Add header parameter{{< /ui >}}. Ingrese `DD-CI-PROVIDER-AWSCODEPIPELINE` como clave y `true` como valor.
9. Elija {{< ui >}}Create a new role for this specific resource{{< /ui >}} (o utilice una existente).
10. Revise que la información sea correcta y cree la regla.

Una vez que haya creado la regla, puede hacer un seguimiento de sus pipelines en Datadog.

## Configuración avanzada {#advanced-configuration}

### Hacer un seguimiento solo de pipelines específicas {#only-monitor-specific-pipelines}

Opcionalmente, puede restringir los pipelines que son monitoreados por Pipeline Visibility.
Para hacer esto, agregue el filtro `detail.pipeline` en el patrón de evento de la regla definido al crear la regla de EventBridge. Por ejemplo:

```json
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

El patrón de evento configura la integración solo para los pipelines `first-pipeline` y `second-pipeline`.

### Correlacionar pipelines con pruebas {#correlate-pipelines-with-tests}

Si utiliza [Test Optimization][8] y su pipeline contiene una o más acciones de [AWS CodeBuild][9] para ejecutar pruebas, puede correlacionar sus pruebas con el pipeline relacionado dentro de Datadog Pipeline Visibility. Para obtener instrucciones, consulte [Agregar el ID de ejecución de pipeline](#add-the-pipeline-execution-id-as-an-environment-variable).

### Almacenamiento de logs {#logs-storage}

La integración de AWS CodePipeline permite correlacionar las acciones de **CodeBuild** con sus respectivos trabajos y pipelines. Para habilitar el almacenamiento de logs para sus acciones de CodeBuild, consulte la [guía de reenvío de logs de AWS][16].

<div class="alert alert-warning">Si utiliza nombres personalizados de grupos de registro o flujos de registro de CloudWatch para sus acciones de CodeBuild, habilite <a href="/integrations/amazon_web_services/#resource-collection">Recopilación de recursos en la nube</a> en la integración de AWS para que Datadog pueda resolver la configuración personalizada del grupo y flujo de registro.</div>

El Almacenamiento de registros se factura por separado de CI Visibility. La retención, exclusión e índices de registros se configuran en [Log Management][21]. Los registros de AWS CodeBuild se pueden identificar mediante las etiquetas `source:codebuild` y `sourcecategory:aws`.

### Agregar el ID de ejecución de pipeline como variable de entorno {#add-the-pipeline-execution-id-as-an-environment-variable}

El ID de ejecución de pipeline es un identificador que Datadog necesita para identificar de forma única una ejecución de pipeline. Realice los siguientes pasos para asignar un ID de ejecución de pipeline para correlacionar pipelines con pruebas y comandos personalizados:

1. En la consola de AWS, vaya a la configuración de su pipeline y haga clic en {{< ui >}}Edit{{< /ui >}}
2. Vaya a la etapa que contiene la acción de AWS CodeBuild, haga clic en {{< ui >}}Edit Stage{{< /ui >}} y, a continuación, edite la acción correspondiente.
3. En {{< ui >}}Environment variables{{< /ui >}}, agregue una variable de entorno.
Asigne a la variable el nombre `DD_PIPELINE_EXECUTION_ID` y el valor `#{codepipeline.PipelineExecutionId}`. Deje el tipo como _Texto sin formato_.
4. Haga clic en {{< ui >}}Done{{< /ui >}} para guardar los cambios.

Los pasos anteriores le permiten agregar el ID de ejecución de pipeline a las variables de entorno de su acción de CodeBuild. Para obtener más información sobre cómo trabajar con variables, consulte la [guía oficial de AWS][10].

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Vea sus datos en las páginas [**Lista**][11] y [**Ejecuciones**][12] una vez que los pipelines finalicen.

La página {{< ui >}}CI Pipeline List{{< /ui >}} muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Buscar y administrar CI Pipelines][13].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /es/tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: /es/continuous_integration/search/#search-for-pipelines
[14]: /es/glossary/#partial-retry
[15]: /es/glossary/#running-pipeline
[16]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[17]: /es/glossary/#approval-wait-time
[18]: /es/glossary/#custom-span
[19]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /es/glossary/#pipeline-execution-time
[21]: /es/logs/guide/best-practices-for-log-management/