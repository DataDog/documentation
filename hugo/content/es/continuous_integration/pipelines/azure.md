---
aliases:
- /es/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Haga un seguimiento de Azure Pipelines con Datadog CI Visibility
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Amplíe Pipeline Visibility añadiendo etiquetas y métricas personalizadas
title: Configuración de Azure Pipelines para CI Visibility
---
<div class="alert alert-danger">
Azure DevOps Server no cuenta con soporte oficial.
</div>

## Descripción general {#overview}

[Azure Pipelines][1] es un servicio de integración y entrega continua que admite cualquier lenguaje, plataforma o nube.

Configure CI Visibility para Azure Pipelines para obtener información en tiempo real sobre sus flujos de trabajo de CI/CD, realizar un seguimiento del rendimiento de los pipelines, analizar ineficiencias y gestionar sus operaciones de despliegue.

### Compatibilidad {#compatibility}

| Pipeline Visibility                             | Plataforma                            | Definición                                                |
|-------------------------------------------------|-------------------------------------|-----------------------------------------------------------|
| [Logs Analysis][21] | Logs Analysis | Utilice modelos LLM en los registros relevantes para analizar la causa raíz de los trabajos de CI fallidos. |
| Correlación de registros                                | Correlación de registros                    | Correlacione los rangos de pipeline y trabajo con los registros. Requiere [almacenamiento de logs](#logs-storage). |
| [Etiquetas personalizadas][10] [y medidas en tiempo de ejecución][11] | Etiquetas y medidas personalizadas en tiempo de ejecución | Configure [etiquetas y medidas personalizadas][6] en tiempo de ejecución.       |
| [Custom spans][15]                              | Custom spans                        | Configure custom spans for your pipelines.                |
| [Filtrar trabajos de CI en la ruta crítica][19]       | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica.                      |
| [Tiempo de ejecución][20]                            | Tiempo de ejecución                      | Consulte la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |

### Terminología {#terminology}

Esta tabla muestra el mapeo de conceptos entre Datadog CI Visibility y Azure Pipelines:

| Datadog                    | Azure Pipelines |
|----------------------------|-----------------|
| Pipeline                   | Pipeline        |
| Etapa                      | Etapa           |
| Trabajo                        | Trabajo             |
| _No disponible en Datadog_ | Paso            |

## Configurar la integración de Datadog {#configure-the-datadog-integration}
{{< tabs >}} {{% tab "Integración de Datadog (recomendado)" %}}

### Habilite CI Visibility en Datadog {#enable-ci-visibility-in-datadog}

Una vez creada e instalada la aplicación de Azure, habilite CI Visibility para las organizaciones y proyectos que desea que Datadog haga un seguimiento.

1. Verifique que su organización de Azure DevOps esté vinculada a un **inquilino de Microsoft Entra**. Consulte las [instrucciones de configuración del código fuente de Azure][1] para obtener orientación sobre cómo conectar proyectos de Azure DevOps a Datadog.

2. En Datadog, navegue a [**Software Delivery → CI Visibility → Add a Pipeline Provider → Azure Pipelines**][2].

3. Haga clic en {{< ui >}}Configure{{< /ui >}} junto a la organización de Azure DevOps que desea habilitar.

4. Para habilitar la CI Visibility para toda la organización, active {{< ui >}}Enable CI Visibility{{< /ui >}}. Los proyectos futuros detectados por la aplicación de Azure se habilitarán automáticamente.

5. Para habilitar la CI Visibility para proyectos individuales:
   - Desplácese por la lista de proyectos.
   - Active {{< ui >}}Enable CI Visibility{{< /ui >}} para cada proyecto que desee hacer un seguimiento.

Los pipelines aparecen en Datadog inmediatamente después de habilitar la CI Visibility para una organización o proyecto.

<div class="alert alert-danger">Si configuró previamente Azure Pipelines mediante suscripciones de Service Hook, deshabilite esa integración antes de habilitar la CI Visibility para los mismos proyectos. Ejecutar ambas integraciones simultáneamente no genera costos adicionales, pero crea datos duplicados.</div>

[1]: /es/integrations/azure-devops-source-code/#setup
[2]: https://app.datadoghq.com/ci/setup/pipeline?provider=azurepipelines

{{% /tab %}}
{{% tab "Suscripciones de Service Hook" %}}

La integración de Datadog para [Azure Pipelines][16] funciona mediante el uso de [service hooks][2] para enviar datos a Datadog.

1. Instale la extensión [Datadog CI Visibility][8] desde Azure Marketplace. Hay varias extensiones que comienzan con **Datadog**, asegúrese de instalar la extensión [Datadog CI Visibility][8].

2. Para cada proyecto, vaya a {{< ui >}}Project settings{{< /ui >}} > {{< ui >}}Service hooks{{< /ui >}} en Azure DevOps y seleccione el icono de más (+) verde para crear una suscripción.

3. Cree una suscripción al servicio `Datadog CI Visibility` para cada uno de los siguientes tipos de webhook. Estos tipos de evento son obligatorios y deben habilitarse individualmente.

    - {{< ui >}}Run state changed{{< /ui >}}
    - {{< ui >}}Run stage state changed{{< /ui >}}
    - {{< ui >}}Run job state changed{{< /ui >}}
    - {{< ui >}}Run stage approval completed{{< /ui >}}
    - {{< ui >}}Run stage waiting for approval{{< /ui >}}
    - {{< ui >}}Build completed{{< /ui >}}

4. Haga clic en {{< ui >}}Next{{< /ui >}} para continuar al siguiente paso y configurar lo siguiente:

    - {{< ui >}}Datadog Site{{< /ui >}}: `{{< region-param key="dd_site" >}}`
    - {{< ui >}}Datadog API Key{{< /ui >}}: Su [clave de Datadog API][3].

5. Haga clic en {{< ui >}}Finish{{< /ui >}}.

### Configuración de varios proyectos de forma masiva {#configuring-multiple-projects-in-bulk}

Datadog ofrece un [script][12] para ayudarle a habilitar los service hooks en varios o todos sus proyectos de Azure mediante la API de Azure. El script requiere Python 3 y el paquete `requests`.

Para ejecutar el script, necesita:

- Un nombre de usuario de Azure DevOps
- Un [token de API][13] de Azure DevOps
- Un nombre de organización de Azure DevOps


El script admite las variables de entorno `DD_API_KEY` y `DD_SITE`, y los parámetros de flags `--dd-api-key` y `--dd-site`.

Para obtener más información, puede ejecutar el siguiente comando:

```shell
./service_hooks.py --help
```

#### Todos los proyectos de Azure {#all-azure-projects}

Ejemplo para habilitar los hooks en todos los proyectos:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

#### Proyectos de Azure específicos {#specific-azure-projects}

Ejemplo para habilitar los hooks en proyectos especificados:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[16]: /es/integrations/azure_devops/

{{% /tab %}}
{{< /tabs >}}


## Configuración avanzada {#advanced-configuration}

### Establezca etiquetas personalizadas {#set-custom-tags}

Puede establecer custom tags para todos los pipeline y job spans de sus proyectos de Azure para mejorar la trazabilidad. Para obtener más información, consulte [Custom Tags and Measures][6].

### Administrar registros de trabajo {#manage-job-logs}

#### Análisis de registros {#logs-analysis}

Logs Analysis utiliza modelos LLM para clasificar las fallas de los trabajos por causa raíz, basándose en los registros relevantes provenientes de Azure Pipelines.

Para obtener una explicación completa, consulte la guía sobre [using Logs Analysis][21].

El Análisis de registros está habilitado de forma predeterminada en Datadog. Para recibir registros de trabajos de Azure Pipelines para su análisis, configure la integración de Datadog Azure DevOps siguiendo los pasos en el [Azure integration tile][14]. Para administrar la configuración de Logs Analysis, vaya a [CI/CD Repository settings][23] y configure Logs Analysis a nivel de la organización de Datadog o para los repositorios deseados.

También puede agregar el Análisis de registros a un comentario de PR. Consulte la guía sobre [cómo usar comentarios de PR][22].

#### Almacenamiento de registros {#logs-storage}

Para habilitar el almacenamiento de registros, vaya a [Configuración del repositorio de CI/CD][23] y habilite el almacenamiento de registros a nivel de la organización de Datadog o para los repositorios deseados.

El Almacenamiento de registros se factura por separado de CI Visibility. La retención, exclusión e índices de registros se configuran en [Log Management][18]. Los registros de los trabajos de Azure se pueden identificar mediante las etiquetas `datadog.product:cipipeline` y `source:azurepipelines`.

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Las páginas de [**CI Pipeline List**][4] y [**Executions**][5] se completan con datos una vez que finalizan los flujos de trabajo.

La página {{< ui >}}CI Pipeline List{{< /ui >}} muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Search and Manage CI Pipelines][17].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /es/glossary/#custom-tag
[11]: /es/glossary/#custom-measure
[14]: https://app.datadoghq.com/integrations/azure
[15]: /es/glossary/#custom-span
[17]: /es/continuous_integration/search/#search-for-pipelines
[18]: /es/logs/guide/best-practices-for-log-management/
[19]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /es/glossary/#pipeline-execution-time
[21]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[23]: https://app.datadoghq.com/ci/settings/ci-cd/repositories