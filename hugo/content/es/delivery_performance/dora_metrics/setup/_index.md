---
aliases:
- /es/continuous_integration/dora_metrics/setup/
- /es/continuous_integration/dora_metrics/setup/deployments
- /es/dora_metrics/setup/deployments
- /es/dora_metrics/deployments/apm
- /es/dora_metrics/deployments/deployment_api
- /es/dora_metrics/deployments
- /es/dora_metrics/setup/
description: Configure fuentes de datos de eventos de despliegue para DORA Metrics,
  incluyendo APM Deployment Tracking, API y CLI.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: Documentación
  text: Obtenga información sobre DORA Metrics
- link: /delivery_performance/dora_metrics/calculation/
  tag: Documentación
  text: Aprenda cómo se calculan las métricas DORA.
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: Documentación
  text: Conozca la detección de fallos en cambios.
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Aprenda sobre el catálogo
- link: https://github.com/DataDog/datadog-ci
  tag: Código fuente
  text: Conozca la herramienta CLI datadog-ci.
title: Configure DORA Metrics.
---
## Descripción general {#overview}

DORA Metrics rastrea y mide el rendimiento de su entrega de software utilizando eventos de despliegue. Estos eventos impulsan las cuatro métricas clave de DORA Metrics: frecuencia de despliegue, tiempo de entrega de cambios, tasa de fallos en cambios y tiempo de restauración.

Para comenzar a usar DORA Metrics, siga estos pasos:

1. **[Configure una fuente de datos de despliegue](#configure-a-deployment-data-source)**: Elija cómo desea enviar los eventos de despliegue a Datadog: a través de APM Deployment Tracking o la API/CLI de DORA Metrics.

2. **[Enriquezca los despliegues con información de confirmación](#enrich-deployments-with-commit-information)**: Agregue metadatos de Git (URL del repositorio y SHA de confirmación) a sus eventos de despliegue y sincronice su repositorio con Datadog para habilitar los cálculos del tiempo de entrega de cambios.

3. **[Personalice la Detección de Fallos en Cambios](#customize-change-failure-detection)**: DORA Metrics detecta automáticamente los despliegues fallidos mediante reversiones (desplegar una versión anterior) e incluye reglas predeterminadas para patrones comunes de avance como revertir PRs y etiquetas de hotfix. Puede personalizar estas reglas para que coincidan con los flujos de trabajo y patrones de remediación específicos de su equipo.

Una vez configurados, los eventos de despliegue completan automáticamente su [panel de DORA Metrics][1] con datos de rendimiento filtrados por equipo, servicio, entorno y [etiquetas personalizadas](#custom-tags).

### Limitaciones {#limitations}

- Cuando seleccione por primera vez una opción de fuente de datos (como APM Deployment Tracking), DORA Metrics comienza a completar los datos a partir de ese momento. Si cambia de la fuente A a la fuente B, y luego vuelve a la fuente A, los datos históricos de la fuente A solo estarán disponibles desde el momento en que se seleccionó por primera vez.
- Los despliegues del mismo servicio no pueden ocurrir en el mismo segundo.

## Configure una fuente de datos de despliegue {#configure-a-deployment-data-source}

DORA Metrics admite las siguientes fuentes de datos para eventos de despliegue:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

[APM Deployment Tracking][1] puede configurarse como una fuente de datos para despliegues en DORA Metrics.

### Requisitos {#requirements}

- {{< ui >}}APM Deployment Tracking{{< /ui >}} está habilitado como una fuente de datos de eventos {{< ui >}}Deployments{{< /ui >}} en [configuración de DORA][2].
- Su servicio tiene [metadatos][3] definidos en el Catálogo.
- Su servicio tiene [unified service tagging][4] habilitado. Los despliegues se identifican mediante la etiqueta `version`.

Para obtener más información sobre cómo garantizar que los despliegues de servicio rastreados por APM contribuyan al tiempo de entrega de cambios, consulte [Enriquezca despliegues con información de confirmación](#enrich-deployments-with-commit-information).

[1]: /es/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /es/internal_developer_portal/catalog/entity_model/
[4]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API o CLI" %}}

Para enviar sus propios eventos de despliegue, utilice la [DORA Metrics API][1] o el comando [`datadog-ci dora deployment`][2].

### Requisitos {#requirements-1}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} está habilitado como una fuente de datos de eventos {{< ui >}}Deployments{{< /ui >}} en [configuración de DORA][3].
- Los siguientes atributos son obligatorios:
  - `started_at`: La hora en que comenzó el despliegue.
  - `finished_at`: La hora en que finalizó el despliegue.
  - `service`: El servicio que se desplegó. Si el servicio proporcionado está registrado en el [Catálogo][4] con metadatos configurados (consulte [Agregar metadatos][5]), el `team` del servicio se recupera automáticamente y se asocia con todas las métricas.

Opcionalmente, puede agregar los siguientes atributos a los eventos de despliegue:

- `repository_url`: El repositorio de código fuente del servicio. Obligatorio para calcular el tiempo de entrega de cambios.
- `commit_sha`: El SHA del confirmación HEAD asociado con el despliegue. Obligatorio para calcular el tiempo de entrega de cambios.
- `team`: Asocie un despliegue con un `team` diferente al que se encontró automáticamente para el servicio.
- `env`: Filtre sus DORA metrics por entorno en la página de [DORA Metrics][6].
- `id`: Identifique un despliegue. Este atributo es generado por el usuario; cuando no se proporciona, el punto de conexión devuelve un UUID generado por Datadog.
- `version`: La versión del despliegue.
- `custom_tags`: Etiquetas en el formato `key:value` que se pueden usar para filtrar eventos en la página de [DORA Metrics][6].


### Ejemplo de API (cURL) {#api-curl-example}

Consulte la [documentación de referencia de la DORA Metrics API][1] para obtener la especificación completa y ejemplos de código adicionales.

Para el siguiente ejemplo, reemplace `<DD_SITE>` en la URL con {{< region-param key="dd_site" code="true" >}} y `${DD_API_KEY}` con su [clave de Datadog API][7]:

```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "team": "backend",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

### Ejemplo de CLI {#cli-example}

La herramienta de CLI [`datadog-ci`][2] proporciona un acceso directo para enviar eventos de despliegue dentro de su entorno de Continuous Integration.

Para el siguiente ejemplo, establezca la variable de entorno `DD_SITE` en {{< region-param key="dd_site" code="true" >}} y establezca la variable de entorno `DD_API_KEY` en su [clave de Datadog API][7]:

```shell
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --version v1.12.07 --custom-tags department:engineering \
    --custom-tags app_type:backend \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

La hora de finalización del despliegue se establece automáticamente en ahora si no se proporciona `--finished-at`.

Si el trabajo de CI del despliegue se está ejecutando en la misma revisión de Git que se está desplegando, `git-repository-url` y `git-commit-sha` pueden omitirse y se infieren automáticamente del contexto de CI.

La opción `--skip-git` puede proporcionarse para deshabilitar el envío de la URL del repositorio y el SHA de la confirmación. Cuando se agrega esta opción, la métrica de tiempo de entrega de cambios no estará disponible.

[1]: /es/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: https://app.datadoghq.com/ci/settings/dora
[4]: /es/internal_developer_portal/catalog/
[5]: /es/internal_developer_portal/catalog/entity_model/
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

### Etiquetas personalizadas {#custom-tags}

Si el servicio asociado con el despliegue está registrado en el [Catálogo][2] con metadatos configurados (consulte [Agregar metadatos][3]), el `languages` del servicio y cualquier `tags` se recuperan automáticamente y se asocian con el evento.

## Enriquezca los despliegues con información de confirmación {#enrich-deployments-with-commit-information}

Para habilitar el cálculo del tiempo de entrega de cambios, configure la información de Git para sus despliegues y sincronice los metadatos de su repositorio con Datadog. Esto permite que DORA Metrics realice un seguimiento de cuánto tiempo tardan las confirmaciones desde su creación hasta su despliegue.

### Adjunte información de Git a los despliegues {#attach-git-information-to-deployments}

Datadog necesita acceso a la información de Git (URL del repositorio y SHA de confirmación) de confirmación HEAD asociado con su despliegue. Los requisitos difieren según su fuente de datos de despliegue:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

Para los despliegues identificados a través de APM Deployment Tracking, asegúrese de que la telemetría de su aplicación, en forma de trazas, esté etiquetada con información de Git:

- Habilite el etiquetado de Git [en APM][1] o consulte la [documentación de integración de código fuente][2]

**Nota**: Para los despliegues rastreados por APM, el tiempo de entrega de cambios se calcula desde la creación de la confirmación hasta que la confirmación se observa por primera vez en una nueva versión. La métrica `Deploy Time` no está disponible.

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /es/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API o CLI" %}}

Para los despliegues rastreados por la DORA Metrics API o el comando `datadog-ci dora deployment`, asegúrese de que:

- Los atributos `repository_url` y `commit_sha` se incluyan en la carga útil de los eventos de despliegue

{{% /tab %}}
{{< /tabs >}}

### Sincronice los metadatos del repositorio con Datadog {#synchronize-repository-metadata-to-datadog}

Datadog necesita acceso a los metadatos de su repositorio (confirmaciones, rutas de archivo) para recuperar todas las confirmaciones desplegadas entre un despliegue y el anterior. Elija el método de sincronización según su proveedor de Git:

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Flujos de trabajo de GitHub que se ejecutan en <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> el activador </a> no es compatible actualmente con la integración de GitHub.
Si está utilizando el <code>pull_request</code> activador, utilice el método alternativo.
</div>

Si la [integración de GitHub][1] aún no está instalada, instálelo en el [mosaico de integración de GitHub][2].

Al configurar la aplicación de GitHub:
1. Seleccione al menos {{< ui >}}Read{{< /ui >}} permisos de repositorio para {{< ui >}}Contents{{< /ui >}} y {{< ui >}}Pull Requests{{< /ui >}}.
2. Suscríbase al menos a los eventos {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} y {{< ui >}}PullRequestReview{{< /ui >}}.

Para confirmar que la configuración es válida, seleccione su aplicación de GitHub en el [mosaico de integración de GitHub][2] y verifique que la tabla {{< ui >}}Datadog Features{{< /ui >}} muestre que {{< ui >}}Pull Request Information{{< /ui >}} cumple con todos los requisitos.

[1]: /es/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
Si la [integración de código fuente de GitLab][1] aún no está instalada, instálela en el [mosaico de integración de código fuente de GitLab][2].

**Nota**: El contexto del token de acceso personal de la cuenta de servicio debe ser al menos `read_api`.

### Manejo de grupos y subgrupos de GitLab {#handling-gitlab-groups-and-subgroups}

Si sus repositorios están organizados bajo [**grupos o subgrupos de GitLab**][3] (por ejemplo,
`https://gitlab.com/my-org/group(/subgroup)/repo`),
es posible que la detección automática de la ruta del servicio no se resuelva correctamente debido a la estructura de grupos anidados de GitLab.

Para asegurarse de que las métricas DORA manejen correctamente las rutas del código fuente de su servicio,
puede utilizar la siguiente configuración en la definición de su servicio:

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      # All paths relative to the repository URL provided with the deployment
      - **
      # or specific paths related to this service (for monorepos)
      - src/apps/shopist/**
      - src/libs/utils/**
```

[1]: /es/integrations/gitlab-source-code/
[2]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
[3]: https://docs.gitlab.com/user/group/

{{% /tab %}}

{{% tab "Azure DevOps" %}}

<div class="alert alert-danger">
Si la integración se instaló antes del 10 de marzo de 2026, vuelva a ejecutar el <a href="https://github.com/DataDog/azdevops-sci-hooks">script de configuración de instalación de webhook</a> para ayudar a garantizar que todas las métricas DORA se calculen correctamente. Si encuentra errores, vuelva a ejecutar el script antes de ponerse en contacto con el soporte técnico.
</div>

Si la [integración de código fuente de Azure DevOps][1] aún no está instalada, instálela en el [mosaico de integración de código fuente de Azure DevOps][2].

Para configurar la integración:

1. Abra el [mosaico de integración de código fuente de Azure DevOps][2] en Datadog.

2. Seleccione la pestaña {{< ui >}}Configuration{{< /ui >}} y haga clic en {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.

3. Siga las instrucciones de configuración.

4. Haga clic en {{< ui >}}Add Organizations{{< /ui >}}.

5. Siga los pasos de instalación del repositorio y [**ejecute el script de configuración**][3]. Si no se ejecuta el script, las confirmaciones realizadas antes de crear una solicitud de extracción no se asociarán con dicha solicitud.

6. Una vez que el script finalice, verifique el estado de la integración en el mosaico. Los repositorios y proyectos conectados aparecen en la lista.

[1]: https://docs.datadoghq.com/es/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

{{% /tab %}}

{{% tab "Bitbucket" %}}

<div class="alert alert-warning">
Solo se admite Bitbucket Cloud Premium. Bitbucket Data Center y Bitbucket Server <strong>no</strong> están soportados.
</div>

Si la [integración de código fuente de Bitbucket Cloud][1] aún no está instalada, instálela en el [mosaico de integración de código fuente de Bitbucket Cloud][2].

Cuando cree el token de acceso al espacio de trabajo durante la [configuración][3], otorgue al menos los siguientes contextos:

- {{< ui >}}Repositories{{< /ui >}}: {{< ui >}}Read{{< /ui >}}, {{< ui >}}Write{{< /ui >}}
- {{< ui >}}Pull requests{{< /ui >}}: {{< ui >}}Read{{< /ui >}}, {{< ui >}}Write{{< /ui >}}
- {{< ui >}}Webhooks{{< /ui >}}: {{< ui >}}Read and write{{< /ui >}}

[1]: /es/integrations/bitbucket-source-code/
[2]: https://app.datadoghq.com/integrations/bitbucket-source-code/
[3]: /es/integrations/bitbucket-source-code/#setup

{{% /tab %}}

{{% tab "Otros proveedores de Git" %}}

Puede cargar los metadatos de su repositorio de Git con el comando [`datadog-ci git-metadata upload`][1].
Cuando se ejecuta este comando, Datadog recibe la URL del repositorio, el SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecute este comando en CI para cada nueva confirmación. Si se ejecuta una implementación para un SHA de confirmación específico, asegúrese de que el comando `datadog-ci git-metadata upload` se ejecute para esa confirmación **antes** de que se envíe el evento de implementación.

<div class="alert alert-danger">
No proporcione la <code>--no-gitsync</code> opción a la <code>datadog-ci git-metadata upload</code> comando.
Cuando se incluye esa opción, la información de confirmación no se envía a Datadog y la métrica de tiempo de entrega de cambios no se calcula.
</div>

Puede validar la configuración correcta del comando verificando la salida del comando. Un ejemplo de una salida correcta es:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Manejo de múltiples servicios en el mismo repositorio {#handling-multiple-services-in-the-same-repository}

Si el código fuente de múltiples servicios está presente en el mismo repositorio, se necesitan acciones adicionales para garantizar que el tiempo de entrega de cambios se calcule teniendo en cuenta solo las confirmaciones que afectan al servicio específico que se está implementando.

Para filtrar las confirmaciones medidas solo a aquellas que afectan al servicio, especifique los patrones de ruta de archivo glob del código fuente en la [definición de servicio][4].

Si la definición del servicio contiene una URL **completa** de GitHub o GitLab a la carpeta de la aplicación, se utiliza automáticamente un único patrón de ruta. El tipo de enlace debe ser **repo** y el nombre del enlace debe ser "Source" o el nombre del servicio (`shopist` en los ejemplos a continuación).

**Ejemplo (versión de esquema v2.2):**
{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```
{{% /tab %}}
{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```
{{% /tab %}}
{{% tab "Azure DevOps" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: azure
    url: https://dev.azure.com/organization/project/_git/example-repository?path=/src/apps/shopist
```
{{% /tab %}}
{{< /tabs >}}

Las DORA Metrics para el servicio `shopist` solo consideran las confirmaciones de Git que incluyen cambios dentro de `src/apps/shopist/**`. Puede configurar un control más granular del filtrado con `extensions[datadoghq.com/dora-metrics]`.**Ejemplo (versión de esquema v2.2):**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

Las DORA Metrics para el servicio `shopist` solo consideran las confirmaciones de Git que incluyen cambios dentro de `src/apps/shopist/**` o `src/libs/utils/**`.

Si las dos entradas de metadatos están definidas para un servicio, solo se considera `extensions[datadoghq.com/dora-metrics]` para filtrar las confirmaciones.

## Personalizar la Detección de fallos en cambios{#customize-change-failure-detection}

Las DORA Metrics identifican automáticamente las implementaciones fallidas para calcular la tasa de fallos en cambios y el tiempo de recuperación de implementaciones fallidas.

### Cómo funciona {#how-it-works}

[Change Failure Detection][5] funciona de forma inmediata al identificar las implementaciones de corrección y vincularlas con la implementación específica que están corrigiendo.

**Detección automática (no se necesita configuración)**:
- **Rollbacks**: Se detectan automáticamente cuando se vuelve a implementar una versión previamente desplegada.

**Reglas personalizadas (personalizables)**:
- **Rollforwards**: Se detectan mediante reglas predeterminadas que coinciden con patrones comunes como revert PRs y etiquetas de hotfix. Puede personalizar estas reglas en la [DORA settings][6] para que coincidan con los flujos de trabajo y los patrones de corrección específicos de su equipo.

Para obtener información detallada sobre cómo funciona la detección y cómo personalizar las reglas, consulte la [Change Failure Detection documentation][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /es/internal_developer_portal/catalog/
[3]: /es/internal_developer_portal/catalog/entity_model/
[4]: /es/internal_developer_portal/catalog/entity_model/
[5]: /es/delivery_performance/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora