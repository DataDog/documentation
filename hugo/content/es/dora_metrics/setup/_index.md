---
aliases:
- /es/continuous_integration/dora_metrics/setup/
- /es/continuous_integration/dora_metrics/setup/deployments
- /es/continuous_integration/dora_metrics/setup/incidents
- /es/dora_metrics/setup/incidents
- /es/dora_metrics/setup/deployments
- /es/dora_metrics/setup/failures/
- /es/dora_metrics/deployments/apm
- /es/dora_metrics/deployments/deployment_api
- /es/dora_metrics/deployments
- /es/dora_metrics/failures/incident_api
- /es/dora_metrics/failures/pagerduty
- /es/dora_metrics/failures/
description: Configura las fuentes de datos de eventos de implementación y fallas
  para DORA Metrics, incluyendo el seguimiento de implementaciones de APM, API, CLI
  y la gestión de incidentes.
further_reading:
- link: /dora_metrics/
  tag: Documentación
  text: Aprende sobre DORA Metrics
- link: /dora_metrics/calculation
  tag: Documentación
  text: Aprende cómo se calculan DORA Metrics
- link: /dora_metrics/change-failure-detection
  tag: Documentación
  text: Aprende sobre la detección de fallas en cambios
- link: /tracing/software_catalog
  tag: Documentación
  text: Aprende sobre Software Catalog
- link: https://github.com/DataDog/datadog-ci
  tag: Código fuente
  text: Aprende sobre la herramienta CLI datadog-ci
title: Configura DORA Metrics
---
## Descripción general {#overview}

DORA Metrics rastrea y mide el rendimiento de la entrega de software utilizando eventos de implementación. Estos eventos impulsan las cuatro métricas clave de DORA Metrics: frecuencia de implementación, tiempo de entrega de cambios, tasa de fallas en cambios y tiempo para restaurar.

Para comenzar a usar DORA Metrics, sigue estos pasos:

1. **[Configura una fuente de datos de implementación](#configure-a-deployment-data-source)**: Elige cómo deseas enviar eventos de implementación a Datadog: a través de APM Deployment Tracking o la API/CLI de DORA Metrics.

2. **[Enriquece las implementaciones con información de commits](#enrich-deployments-with-commit-information)**: Agrega metadatos de Git (URL del repositorio y SHA del commit) a tus eventos de implementación y sincroniza tu repositorio con Datadog para habilitar los cálculos del tiempo de entrega de cambios.

3. **[Personaliza la detección de fallas en cambios](#customize-change-failure-detection)**: DORA Metrics detecta automáticamente implementaciones fallidas a través de retrocesos (volver a implementar una versión anterior) e incluye reglas predeterminadas para patrones comunes de avance como PRs de reversión y etiquetas de corrección rápida. Puedes personalizar estas reglas para que coincidan con los flujos de trabajo específicos de tu equipo y los patrones de remediación.

4. **[(Opcional) Configura el seguimiento de incidentes](#optional-set-up-incidents-tracking)**: Integra datos de incidentes para correlacionar fallas de cambios detectadas con incidentes en producción, proporcionando una vista completa de cómo tus implementaciones afectan la salud del servicio.

Cuando se configura, los eventos de implementación llenan automáticamente tu [tablero de DORA Metrics][1] con datos de rendimiento filtrados por equipo, servicio, entorno y [etiquetas personalizadas](#custom-tags).

### Limitaciones {#limitations}

- Cuando seleccionas por primera vez una opción de fuente de datos (como APM Deployment Tracking), DORA Metrics comienza a poblar datos desde ese momento en adelante. Si cambias de la fuente A a la fuente B, y luego regresas a la fuente A, los datos históricos de la fuente A solo están disponibles desde el momento en que fue seleccionada por primera vez.
- Las implementaciones del mismo servicio no pueden ocurrir en el mismo segundo.

## Configura una fuente de datos de implementación {#configure-a-deployment-data-source}

DORA Metrics admite las siguientes fuentes de datos para eventos de implementación:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

[APM Deployment Tracking][1] puede configurarse como una fuente de datos para despliegues en DORA Metrics.

### Requisitos {#requirements}

- {{< ui >}}APM Deployment Tracking{{< /ui >}} está habilitado como una fuente de datos de eventos {{< ui >}}Deployments{{< /ui >}} en [DORA settings][2].
- Tu servicio tiene [metadatos][3] definidos en Software Catalog.
- Tu servicio tiene [unified service tagging][4] habilitado. Las implementaciones se identifican utilizando la etiqueta `version`.

Para más información sobre cómo asegurar que las implementaciones de servicio rastreadas por APM contribuyan al tiempo de entrega de cambios, consulta [Enriquece las implementaciones con información de commits](#enrich-deployments-with-commit-information).

[1]: /es/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /es/software_catalog/adding_metadata
[4]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API o CLI" %}}

Para enviar tus propios eventos de implementación, utiliza la [DORA Metrics API][1] o el comando [`datadog-ci dora deployment`][2].

### Requisitos {#requirements-1}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} está habilitado como una fuente de datos de eventos {{< ui >}}Deployments{{< /ui >}} en [DORA settings][3].
- Los siguientes atributos son requeridos:
  - `started_at`: El momento en que comenzó el despliegue.
  - `finished_at`: El momento en que finalizó el despliegue.
  - `service`: El servicio que fue desplegado. Si el servicio proporcionado está registrado en [Software Catalog][4] con los metadatos configurados (ver [Adding Metadata][5]), el `team` del servicio se recupera automáticamente y se asocia con todas las métricas.

Opcionalmente, puedes agregar los siguientes atributos a los eventos de despliegue:

- `repository_url`: El repositorio de código fuente del servicio. Requerido para calcular el tiempo de entrega de cambios.
- `commit_sha`: El SHA del commit HEAD asociado con el despliegue. Requerido para calcular el tiempo de entrega de cambios.
- `team`: Asociar un despliegue con un `team` diferente al que se encontró automáticamente para el servicio.
- `env`: Filtra tus métricas de DORA Metrics por entorno en la página de [DORA Metrics][6].
- `id`: Identificar un despliegue. Este atributo es generado por el usuario; cuando no se proporciona, el endpoint devuelve un UUID generado por Datadog.
- `version`: La versión del despliegue.
- `custom_tags`: Etiquetas en la forma `key:value` que pueden ser utilizadas para filtrar eventos en la página de [DORA Metrics][6].


### Ejemplo de API (cURL) {#api-curl-example}

Consulte la [DORA Metrics API reference documentation][1] para la especificación completa y ejemplos de código adicionales.

Para el siguiente ejemplo, reemplace `<DD_SITE>` en la URL con {{< region-param key="dd_site" code="true" >}} y `${DD_API_KEY}` con tu [Datadog API Key][7]:

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

La herramienta CLI [`datadog-ci`][2] proporciona un acceso directo para enviar eventos de despliegue dentro de tu entorno de Continuous Integration.

Para el siguiente ejemplo, establece la variable de entorno `DD_SITE` en {{< region-param key="dd_site" code="true" >}} y establece la variable de entorno `DD_API_KEY` en tu [Datadog API Key][7]:

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

El tiempo de finalización del despliegue se establece automáticamente al momento actual si no se proporciona `--finished-at`.

Si el trabajo de CI de despliegue se está ejecutando en la misma revisión de Git que se está desplegando, `git-repository-url` y `git-commit-sha` se pueden omitir y se infieren automáticamente del contexto de CI.

La opción `--skip-git` se puede proporcionar para deshabilitar el envío de la URL del repositorio y el SHA del commit. Cuando se agrega esta opción, la métrica de Lead Time de cambio no estará disponible.

[1]: /es/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: https://app.datadoghq.com/ci/settings/dora
[4]: /es/tracing/software_catalog
[5]: /es/tracing/software_catalog/adding_metadata
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

### Etiquetas personalizadas {#custom-tags}

Si el servicio asociado con el despliegue está registrado en el [Software Catalog][2] con metadatos configurados (ver [Adding Metadata][3]), el `languages` del servicio y cualquier `tags` se recuperan automáticamente y se asocian con el evento.

## Enriquece las implementaciones con información de commits {#enrich-deployments-with-commit-information}

Para habilitar el cálculo del Lead Time de cambio, configura la información de Git para tus implementaciones y sincroniza los metadatos de tu repositorio con Datadog. Esto permite que DORA Metrics rastree cuánto tiempo tardan los commits desde su creación hasta el despliegue.

### Adjunta información de Git a los despliegues {#attach-git-information-to-deployments}

Datadog necesita acceso a la información de Git (URL del repositorio y SHA del commit) del SHA del commit principal de tu despliegue. Los requisitos difieren según la fuente de datos de tu despliegue:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

Para las implementaciones identificadas a través de APM Deployment Tracking, asegúrate de que la telemetría de tu aplicación esté etiquetada con información de Git:

- Habilita Git tagging [en APM][1] o consulta la [Source Code Integration documentation][2]

**Nota**: Para las implementaciones rastreadas por APM, el Lead Time de cambio se calcula desde la creación del commit hasta que el commit se observa por primera vez en una nueva versión. La métrica `Deploy Time` no está disponible.

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /es/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API o CLI" %}}

Para las implementaciones rastreadas por la DORA Metrics API o el comando `datadog-ci dora deployment`, asegúrate de lo siguiente:

- Los atributos `repository_url` y `commit_sha` se incluyen en la carga útil de eventos de implementación

{{% /tab %}}
{{< /tabs >}}

### Sincroniza los metadatos del repositorio con Datadog {#synchronize-repository-metadata-to-datadog}

Datadog necesita acceso a los metadatos de tu repositorio (commits, rutas de archivos) para recuperar todos los commits desplegados entre un despliegue y el anterior. Elige el método de sincronización según tu proveedor de Git:

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Los flujos de trabajo de GitHub que se ejecutan en <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> el desencadenador </a> no es compatible actualmente con la integración de GitHub.
Si está utilizando el <code>pull_request</code> desencadenador, utilice el método alternativo.
</div>

Si la [integración de GitHub][1] no está instalada, instálela en el [GitHub integration tile][2].

Al configurar la aplicación de GitHub:
1. Seleccione al menos {{< ui >}}Read{{< /ui >}} permisos de repositorio para {{< ui >}}Contents{{< /ui >}} y {{< ui >}}Pull Requests{{< /ui >}}.
2. Suscríbete al menos a {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} y {{< ui >}}PullRequestReview{{< /ui >}} eventos.

Para confirmar que la configuración es válida, selecciona tu aplicación de GitHub en el [GitHub integration tile][2] y verifica que la tabla {{< ui >}}Datadog Features{{< /ui >}} muestre que {{< ui >}}Pull Request Information{{< /ui >}} cumple con todos los requisitos.

[1]: /es/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
Si la [integración de código fuente de GitLab][1] no está instalada, instálela en el [panel de integración de código fuente de GitLab][2].

**Nota**: El contexto del token de acceso personal de la cuenta de servicio debe ser al menos `read_api`.

### Manejo de grupos y subgrupos de GitLab {#handling-gitlab-groups-and-subgroups}

Si sus repositorios están organizados bajo [**grupos o subgrupos de GitLab**][3] (por ejemplo,
`https://gitlab.com/my-org/group(/subgroup)/repo`),
la detección automática de la ruta del servicio puede no resolverse correctamente debido a la estructura de grupos anidados de GitLab.

Para asegurar que las métricas de DORA manejen correctamente las rutas del código fuente de su servicio,
puede usar la siguiente configuración en la definición de su servicio:

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
Si la integración se instaló antes del 10 de marzo de 2026, ejecuta el <a href="https://github.com/DataDog/azdevops-sci-hooks">script de instalación del webhook</a> nuevamente para ayudar a asegurar que todas las métricas de DORA se calculen correctamente. Si encuentras errores, vuelve a ejecutar el script antes de contactar al soporte.
</div>

Si la [integración de código fuente de Azure DevOps][1] no está instalada, instálela en el [Azure DevOps Source Code integration tile][2].

Para configurar la integración:

1. Abra el [Azure DevOps Source Code integration tile][2] en Datadog.

2. Seleccione la pestaña {{< ui >}}Configuration{{< /ui >}} y haga clic en {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.

3. Siga las instrucciones de configuración.

4. Haga clic en {{< ui >}}Add Organizations{{< /ui >}}.

5. Siga los pasos de instalación del repositorio y [**ejecute el script de configuración**][3]. Si no se ejecuta el script, los commits realizados antes de que se cree una solicitud de extracción no estarán asociados con esa solicitud.

6. Después de que el script se complete, verifique el estado de integración en el panel. Los repositorios y proyectos conectados aparecen en la lista.

[1]: https://docs.datadoghq.com/es/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

{{% /tab %}}

{{% tab "Otros proveedores de Git" %}}

Puede cargar los metadatos de su repositorio de Git con el comando [`datadog-ci git-metadata upload`][1].
Cuando se ejecuta este comando, Datadog recibe la URL del repositorio, el SHA del commit de la rama actual y una lista de rutas de archivos rastreados.

Ejecute este comando en CI para cada nuevo commit. Si se ejecuta un despliegue para un SHA de commit específico, asegúrese de que se ejecute el comando `datadog-ci git-metadata upload` para ese commit **antes** de que se envíe el evento de despliegue.

<div class="alert alert-danger">
No proporcione el <code>--no-gitsync</code> opción al <code>datadog-ci git-metadata upload</code> comando.
Cuando se incluye esa opción, la información del commit no se envía a Datadog y la métrica de tiempo de entrega de cambios no se calcula.
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

Si el código fuente de múltiples servicios está presente en el mismo repositorio, se necesitan acciones adicionales para garantizar que el tiempo de entrega de cambios se calcule teniendo en cuenta solo los commits que afectan al servicio específico que se está desplegando.

Para filtrar los commits medidos solo a aquellos que afectan al servicio, especifica las rutas de los patrones de archivos glob del código fuente en la [definición del servicio][4].

Si la definición del servicio contiene una URL **completa** de GitHub o GitLab a la carpeta de la aplicación, se utiliza automáticamente un único patrón de ruta. El tipo de enlace debe ser **repo** y el nombre del enlace debe ser ya sea 'Source' o el nombre del servicio (`shopist` en los ejemplos a continuación).

**Ejemplo (versión del esquema v2.2):**
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

Las métricas DORA para el `shopist` servicio solo consideran los commits de Git que incluyen cambios dentro de `src/apps/shopist/**`. Puede configurar un control más granular del filtrado con `extensions[datadoghq.com/dora-metrics]`.**Ejemplo (versión del esquema v2.2):**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

Las métricas DORA para el servicio `shopist` solo consideran los commits de Git que incluyen cambios dentro de `src/apps/shopist/**` o `src/libs/utils/**`.

Si se definen dos entradas de metadatos para un servicio, solo se considera `extensions[datadoghq.com/dora-metrics]` para filtrar los commits.

## Personalizar la detección de fallos en cambios {#customize-change-failure-detection}

Las métricas DORA identifican automáticamente los despliegues fallidos para calcular la tasa de fallos en cambios y el tiempo de recuperación de despliegues fallidos.

### Cómo funciona {#how-it-works}

[La detección de fallos en cambios][5] opera de manera inmediata al identificar los despliegues de remediación y enlazarlos de nuevo al despliegue específico que están remediando.

**Detección automática (sin necesidad de configuración)**:
- **Reversiones**: Detectadas automáticamente cuando se vuelve a desplegar una versión previamente desplegada.

**Reglas personalizadas (personalizables)**:
- **Rollforwards**: Detectados a través de reglas predeterminadas que coinciden con patrones comunes como revert PRs y etiquetas de hotfix. Puedes personalizar estas reglas en la [configuración de DORA][6] para que coincidan con los flujos de trabajo y patrones de remediación específicos de tu equipo.

Para obtener información detallada sobre cómo funciona la detección y cómo personalizar reglas, consulta la [documentación de detección de fallos en cambios][5].

## (Opcional) Configurar el seguimiento de incidentes {#optional-set-up-incidents-tracking}

Integrar los datos de incidentes proporciona una visión integral de cómo la actividad de despliegue impacta la salud del servicio. Al rastrear incidentes junto con fallas de cambio detectadas automáticamente, se puede correlacionar el rendimiento de entrega con el impacto operativo en el mundo real y entender la historia completa del efecto de la entrega de software en la confiabilidad del servicio.

DORA Metrics admite las siguientes opciones para rastrear incidentes:

{{< tabs >}}
{{% tab "Incidentes de Datadog" %}}
DORA Metrics puede identificar y rastrear automáticamente fallas a través de [Incidentes de Datadog][1]. Después de que se declaran los incidentes, DORA los utiliza para medir la tasa de fallas de cambio y el tiempo de restauración.

**Nota**: El tiempo de restauración se mide como la duración total que un incidente pasa en el estado `active`. Para casos como `active` → `stable` → `active` → `stable`, incluye todos los períodos `active`. El tiempo de restauración se muestra solo cuando un incidente está en un estado `stable` o `resolved`. Si un incidente `resolved` se reactiva, la métrica se oculta hasta que esté `resolved` nuevamente.


### Requisitos {#requirements-2}

- {{< ui >}}Incidents{{< /ui >}} está habilitado como una fuente de datos de eventos {{< ui >}}Failures{{< /ui >}} en [DORA settings][2].

Para evitar tener fallas sin etiquetar, Datadog recomienda encarecidamente agregar los siguientes atributos a los incidentes:
  - {{< ui >}}Teams{{< /ui >}}
  - {{< ui >}}Services{{< /ui >}}
  - {{< ui >}}Envs{{< /ui >}}: El atributo {{< ui >}}Envs{{< /ui >}} se puede agregar en la [Configuración de Incidentes][3] si no existe ya.

Si se proporciona con incidentes, se agrega la etiqueta `Severity` a los eventos de falla.

**Recomendado**: En la [Configuración de Incidentes][3], establezca el campo de atributos {{< ui >}}Prompted{{< /ui >}} en {{< ui >}}At Resolution{{< /ui >}} para asegurarse de que nunca olvide agregar estos atributos a sus incidentes.

### Incluir incidentes históricos {#include-historical-incidents}

Puede incluir retroactivamente incidentes de los últimos dos años seleccionando {{< ui >}}Backfill Data{{< /ui >}} en [DORA settings][2], lo que crea fallas a partir de esos incidentes. El llenado de datos puede tardar hasta una hora en completarse.

[1]: /es/incident_response/incident_management/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/incidents/settings?section=property-fields


{{% /tab %}}
{{% tab "PagerDuty" %}}
[PagerDuty][1] es una plataforma de gestión de incidentes que proporciona a los equipos de TI visibilidad inmediata de los incidentes, permitiendo respuestas proactivas y efectivas para mantener la estabilidad y resiliencia operativa.

Para integrar tu cuenta de PagerDuty con DORA Metrics:

1. Habilita {{< ui >}}PagerDuty{{< /ui >}} como una {{< ui >}}Failures{{< /ui >}} fuente de datos de eventos en [DORA settings][2].

1. Navega a {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Developer Tools{{< /ui >}} en PagerDuty y haz clic en {{< ui >}}Generic Webhooks (v3){{< /ui >}}.

1. Haz clic en {{< ui >}}+ New Webhook{{< /ui >}} e ingresa los siguientes detalles:

     <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>URL del Webhook</td>
          <td>Agregar <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>Tipo de Contexto</td>
          <td>Selecciona el contexto de los incidentes que deseas enviar. Puedes enviar incidentes para un {{< ui >}}Service{{< /ui >}} específico o {{< ui >}}Team{{< /ui >}}, o todos los servicios de PagerDuty en tu {{< ui >}}Account{{< /ui >}}. Dependiendo de tu entorno y nivel de acceso, algunos tipos de contexto pueden no estar disponibles.</td>
        </tr>
        <tr>
          <td>Descripción</td>
          <td>Una descripción ayuda a distinguir el webhook. Agrega algo como <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>Suscripción de Eventos</td>
          <td>Selecciona los siguientes eventos:<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>Encabezados Personalizados</td>
          <td>Haz clic en {{< ui >}}Add custom header{{< /ui >}}, ingresa <code>DD-API-KEY</code> como el nombre, e ingresa tu <a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">clave de API de Datadog</a> como el valor.<br><br>Opcionalmente, puedes agregar un entorno a todos los incidentes de PagerDuty enviados desde el webhook creando un encabezado personalizado adicional con el nombre <code>dd_env</code> y el entorno deseado como el valor.</td>
        </tr>
      </tbody>
    </table>

1. Para guardar el webhook, haz clic en {{< ui >}}Add Webhook{{< /ui >}}.

La severidad de la falla en el producto DORA Metrics se basa en la [prioridad del incidente][3] en PagerDuty.

**Nota:** Al crear el webhook, se crea un nuevo secreto que se utiliza para firmar todos los payloads del webhook. Ese secreto no es necesario para que la integración funcione, ya que la autenticación se realiza utilizando la clave de API en su lugar.

### Mapeo de servicios de PagerDuty a servicios de Datadog {#mapping-pagerduty-services-to-datadog-services}

Cuando se recibe un evento de incidente para un [servicio de PagerDuty][4] específico, Datadog intenta recuperar el servicio y el equipo de Datadog relacionados de cualquier [monitor de Datadog][5] que lo haya activado y del [Software Catalog][6].

El algoritmo de coincidencia funciona en los siguientes pasos:

1. Si el evento de incidente de PagerDuty fue [activado desde un monitor de Datadog][5]:
   - Si el monitor está en [modo de Alerta Múltiple][7], las métricas y eventos del incidente se emiten con el `env`, `service` y `team` del grupo alertado.
   - Si el monitor tiene [etiquetas][8] para `env`, `service` o `team`:
     - `env`: Si el monitor tiene una sola etiqueta `env`, las métricas y eventos del incidente se emiten con el entorno.
     - `service`: Si el monitor tiene una o más etiquetas `service`, las métricas y eventos del incidente se emiten con los servicios proporcionados.
     - `team`: Si el monitor tiene una sola etiqueta `team`, las métricas y eventos del incidente se emiten con el equipo.

2. Si la URL del servicio del incidente coincide con la URL del servicio de PagerDuty para cualquiera de los servicios en el Software Catalog:
   - Si un solo servicio de Datadog coincide, las métricas y eventos del incidente se emiten con el servicio y el equipo.
   - Si múltiples servicios de Datadog coinciden, las métricas y eventos del incidente se emiten con el equipo.

   Para más información sobre cómo establecer la URL del servicio de PagerDuty para un servicio de Datadog, consulte [Use Integrations with Software Catalog][9].

3. Si el nombre del servicio de PagerDuty del incidente coincide con un nombre de servicio en el Software Catalog, las métricas y eventos del incidente se emiten con el servicio y el equipo.
4. Si el nombre del equipo de PagerDuty del incidente coincide con un nombre de equipo en el Software Catalog, las métricas y eventos del incidente se emiten con el equipo.
5. Si el nombre del servicio de PagerDuty del incidente coincide con un nombre de equipo en el Software Catalog, las métricas y eventos del incidente se emiten con el equipo.
6. Si no ha habido coincidencias hasta este punto, las métricas y eventos del incidente se emiten con el servicio de PagerDuty y el equipo de PagerDuty proporcionados en el incidente.

<div class="alert alert-danger">
Si un incidente se resuelve manualmente en PagerDuty en lugar de a partir de una notificación del monitor, el evento de resolución del incidente no contiene información del monitor y se omite el primer paso del algoritmo de coincidencia.
</div>

[1]: /es/integrations/pagerduty/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://support.pagerduty.com/main/docs/incident-priority
[4]: https://support.pagerduty.com/docs/services-and-integrations
[5]: /es/integrations/pagerduty/#troubleshooting
[6]: /es/software_catalog/
[7]: /es/monitors/configuration/#multi-alert
[8]: /es/monitors/manage/#monitor-tags
[9]: /es/software_catalog/integrations/#pagerduty-integration


{{% /tab %}}
{{% tab "API" %}}

Para enviar sus propios eventos de falla, use la [API de Métricas DORA][1]. Los eventos de falla se utilizan para calcular la tasa de fallas en cambios y el tiempo para restaurar.

Incluya el atributo `finished_at` en un evento de falla para marcar que la falla está resuelta. Puede enviar eventos al inicio de la falla y después de que se haya resuelto. Los eventos de falla se emparejan por los atributos `env`, `service` y `started_at`.

### Requisitos {#requirements-3}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} está habilitado como una fuente de datos de eventos {{< ui >}}Failures{{< /ui >}} en [DORA settings][2].
- Los siguientes atributos son requeridos:
  - `services` o `team` (al menos uno debe estar presente)
  - `started_at`

Puede agregar opcionalmente los siguientes atributos a los eventos de falla:
- `finished_at` para * fallas resueltas*. *** Requerido para calcular el tiempo de restauración***
- `id` para identificar fallas. Este atributo es generado por el usuario; cuando no se proporciona, el endpoint devuelve un UUID generado por Datadog.
- `name` para describir la falla.
- `severity`
- `env` para filtrar sus DORA Metrics por entorno en la página [{{< ui >}}DORA Metrics{{< /ui >}}][3].
- `repository_url`
- `commit_sha`
- `version`
- `custom_tags`: Etiquetas en la forma `key:value` que se pueden usar para filtrar eventos en la página [{{< ui >}}DORA Metrics{{< /ui >}}][3].

Consulte la [DORA Metrics API reference documentation][1] para la especificación completa y ejemplos de código adicionales.

###  Ejemplo de API (cURL) {#api-curl-example-1}

Para la siguiente configuración, reemplace `<DD_SITE>` con {{< region-param key="dd_site" >}}:

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/failure" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

[1]: /es/api/latest/dora-metrics/#send-a-failure-event-for-dora-metrics
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/ci/dora


{{% /tab %}}
{{< /tabs >}}

##  Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /es/tracing/software_catalog
[3]: /es/tracing/software_catalog/adding_metadata
[4]: /es/tracing/software_catalog/adding_metadata
[5]: /es/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora