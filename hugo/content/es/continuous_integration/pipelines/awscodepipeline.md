---
aliases:
- /es/continuous_integration/setup_pipelines/codepipeline
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explorar los resultados y el rendimiento de la ejecución de pipelines
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
- link: /continuous_integration/search/
  tag: Documentation
  text: Buscar y gestionar CI Pipelines
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: Blog
  text: Monitorizar y mejorar tu CI/CD en AWS CodePipeline con Datadog CI Visibility
title: Configurar el rastreo en un pipeline de AWS CodePipeline
---

## Información general

[AWS CodePipeline][1] es un servicio de entrega continua totalmente gestionado que te ayuda a automatizar tus pipelines de entrega para obtener actualizaciones rápidas y fiables de las aplicaciones y la infraestructura.

Configura el rastreo en AWS CodePipeline para recopilar datos sobre ejecuciones de pipelines, analizar cuellos de botella de rendimiento o problemas operativos y monitorizar los flujos de trabajo de tus despliegues.

### Compatibilidad

| Visibilidad de pipelines | Plataforma | Definición
|---|---|---|
| [Reintentos parciales][14] | Pipelines parciales | Ver ejecuciones de pipelines parcialmente reintentadas. |
| *[Pipelines en ejecución][15] | Pipelines en ejecución | Observa las ejecuciones de pipelines que se están ejecutando. Los pipelines en cola o en espera se muestran con el estado "En ejecución" en Datadog. |
| **Correlación de logs | Correlación de logs | Correlaciona tramos (spans) de pipelines y trabajos con logs y habilita la [correlación de logs de trabajos](#collect-job-logs). |
| [Tiempo de espera de aprobaciones][17] | Tiempo de espera de aprobaciones | Visualiza la cantidad de tiempo que los trabajos y pipelines esperan las aprobaciones manuales. |
| [Tramos personalizados][18] | Tramos personalizados | Configura tramos personalizados para tus pipelines. |

*Los pipelines que se ejecutan en AWS CodePipeline no tienen información Git hasta que finalizan.|
**La correlación de logs de AWS CodePipeline sólo está disponible para acciones de AWS CodeBuild.

## Configurar la integración en Datadog

Para configurar la integración entre [AWS CodePipeline][1] y Pipeline Visibility, crea dos recursos AWS.

[Destino API][2]
: Endpoint HTTP que apunta a la ingesta de Datadog.

[Regla AWS EventBridge][3]
: Regla que reenvía eventos de CodePipeline al destino API.

Puedes crear estos recursos por separado, o al mismo tiempo, durante la creación del proceso de la Regla EventBridge.
Para obtener más información sobre eventos de pipelines de monitorización, consulta la [guía oficial de AWS][4].

## Crear el destino API

1. En la consola de AWS, ve a a **EventBridge > Destinos API** y haz clic en **Create API destination** (Crear destino API).
2. Elige un nombre para el destino API (por ejemplo, `datadog-ci-visibility-api`) y, opcionalmente, añade una descripción.
3. En **Endpoint del destino API**, introduce <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>.
4. En **Método HTTP**, selecciona **POST**.
5. En **Tipo de conexión**, selecciona **Crear una nueva conexión**:
   a. Elige un nombre para la conexión (por ejemplo, `datadog-ci-visibility-connection`) y, opcionalmente, añade una descripción.
   b. En **Tipo de destino**, selecciona **Otros**.
   c. En **Tipo de autorización**, selecciona **Clave de API**. Introduce `DD-API-KEY` como **nombre de la clave API** y añade tu [clave de API Datadog][5] en el campo **Valor**.
6. Haz clic en **Create** (Crear).

## Crear la regla EventBridge

1. En la consola AWS, ve a **EventBridge > Reglas** y haz clic en **Create Rule** (Crear regla).
2. Elige un nombre para la regla (por ejemplo, `datadog-ci-visibility-integration`) y, opcionalmente, añade una descripción.
3. Deja el bus de evento como **por defecto** y, en **Tipo de regla**, selecciona **Regla con un patrón de eventos**. Haz clic en **Next** (Siguiente).
4. En **Fuente de eventos**, selecciona **Eventos AWS o eventos de socios EventBridge**.
5. En **Método de creación**, selecciona **Patrón personalizado (editor JSON)**. A continuación, en **Patrón de eventos**, introduce lo siguiente:

   ```json
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```

   El JSON anterior configura la integración para todos tus pipelines. Para restringir el conjunto de pipelines,
   sigue la sección [Sólo monitorizar pipelines específicos](#only-Monitor-specific-pipelines) a continuación.

6. Haz clic en **Next** (Siguiente).
7. En **Tipos de destino**, selecciona **Destino API EventBridge**. A continuación, selecciona **Utilizar un destino API existente** y selecciona el destino API que creaste en el paso anterior. También puedes crear el destino API siguiendo los pasos descritos en la sección [Crear el destino API](#create-the-api-destination).
8. En **Parámetros de cabecera**, haz clic en **Add header parameter** (Añadir parámetro de cabecera). Introduce `DD-CI-PROVIDER-AWSCODEPIPELINE` como clave y `true` como valor.
9. Selecciona **Crear un nuevo rol para este recurso específico** (o utilizar uno existente).
10. Comprueba que la información es correcta y crea la regla.

Una vez creada la regla, podrás monitorizar tus pipelines en Datadog.

## Configuración avanzada

### Sólo monitorizar pipelines específicos

También puedes restringir los pipelines monitorizados por Pipeline Visibility.
Para ello, añade el filtro `detail.pipeline` en el patrón de evento de regla definido al crear la regla EventBridge. Por ejemplo

```json
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
```

El patrón evento configura la integración sólo para los pipelines `first-pipeline` y `second-pipeline`.

### Correlacionar pipelines con tests

Si estás utilizando [Test Optimization][8] y tu pipeline contiene una o más acciones [AWS CodeBuild][9] para ejecutar tests, puedes correlacionar tus tests con el pipeline relacionado dentro de Datadog Pipeline Visibility. Para obtener instrucciones, consulta [Añadir el ID de ejecución del pipeline](#add-the-pipeline-execution-id-as-an-environment-variable).

### Recopilar logs de trabajos

La integración AWS CodePipeline admite la correlación de acciones **CodeBuild** con sus respectivos tramos de trabajos y pipelines. Para habilitar la recopilación de logs para tus acciones CodeBuild, consulta la [guía de reenvío de logs de AWS][16].

<div class="alert alert-danger"><strong>Nota</strong>: La correlación de logs para acciones CodeBuild requiere que el proyecto CodeBuild tenga los nombres del grupo de logs y del flujo (stream) de logs CloudWatch predeterminados.</div>

Los logs se facturan por separado de CI Visibility. La conservación de logs, la exclusión y los índices se configuran en Parámetros de logs. Los logs de AWS CodeBuild se pueden identificar por las etiquetas (tags) `source:codebuild` y `sourcecategory:aws`.

### Añadir el ID de ejecución del pipeline como variable de entorno

El ID de ejecución del pipeline es un identificador que Datadog necesita para identificar de forma exclusiva una ejecución de pipeline. Realiza los siguientes pasos para asignar un ID de ejecución de pipeline a fin de correlacionar pipelines con tests y comandos personalizados:

1. En la consola de AWS, ve a la configuración de tu pipeline y haz clic en **Edit** (Editar).
2. Ve a la etapa que contiene la acción AWS CodeBuild, haz clic en **Edit Stage** (Editar etapa) y, a continuación, edita la acción correspondiente.
3. En **Variables de entorno**, añade una variable de entorno.
Da un nombre a la variable `DD_PIPELINE_EXECUTION_ID` y al valor `#{codepipeline.PipelineExecutionId}`. Deja el tipo como _Plaintext_.
4. Haz clic en **Done** (Listo) para guardar los cambios.

Los pasos anteriores te permiten añadir el ID de ejecución de pipeline a las variables de entorno de tu acción CodeBuild. Para obtener más información sobre cómo trabajar con variables, consulta la [guía oficial de AWS][10].

## Visualizar datos de pipelines en Datadog

Una vez que finalicen tus pipelines, visualiza tus datos en las páginas [**Lista de pipelines CI**][11] y [**Ejecuciones**][12].

La página **Lista de pipelines CI** muestra datos sólo para la rama por defecto de cada repositorio. Para obtener más información, consulta [Buscar y gestionar pipelines CI][13].

## Referencias adicionales

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
