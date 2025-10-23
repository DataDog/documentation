---
aliases:
- /es/continuous_integration/dora_metrics/setup/deployments
- /es/dora_metrics/deployments/apm
- /es/dora_metrics/deployments/deployment_api
- /es/dora_metrics/deployments
description: Aprende a enviar eventos de despliegue para métricas de DORA.
further_reading:
- link: /dora_metrics/setup/failures
  tag: Documentación
  text: Más información sobre la configuración de datos sobre fallas en métricas de
    DORA
- link: /tracing/service_catalog
  tag: Documentación
  text: Más información sobre el catálogo de servicios
- link: https://github.com/DataDog/datadog-ci
  tag: Código fuente
  text: Más información sobre la herramienta Datadog-ci CLI
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Más información sobre la visibilidad del despliegue
is_beta: true
title: Cómo configurar datos de despliegue para métricas de DORA
---

<div class="alert alert-danger">Las métricas de DORA están en vista previa.</div>

## Información general

Se utilizan eventos de despliegue para calcular la [frecuencia de despliegue](#calculating-deployment-frequency), el [tiempo de espera de cambio](#calculating-change-lead-time) y la [tasa de fallas de cambio](#calculating-change-failure-rate).

## Selección y configuración de una fuente de datos de despliegue

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

El [Rastreo del despliegue de APM][15] puede configurarse como fuente de datos para despliegues en métricas de DORA.

Para garantizar que los despliegues de servicios rastreados por APM contribuyan a las métricas de DORA, deben cumplirse los siguientes requisitos:

- Tu servicio tiene [metadatos][16] definidos en el Catálogo de servicios.
- Tu servicio tiene el [etiquetado unificado de servicios][17] activado. Los despliegues se identifican utilizando la etiqueta (tag) `version`.

Para obtener más información sobre cómo garantizar que los despliegues de servicios que se rastrean en APM contribuyan al tiempo de espera de cambio, consulta [Fuentes de datos del despliegue][18].

[15]: /es/tracing/services/deployment_tracking
[16]: /es/service_catalog/adding_metadata
[17]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[18]: /es/dora_metrics/setup/deployments/?tab=apmdeploymenttracking#selecting-a-deployment-data-source

{{% /tab %}}
{{% tab "API or CLI" %}}

Para enviar tus propios eventos de despliegue, utiliza la [API Métricas de DORA][21] o el comando [`datadog-ci dora deployment`][22].

Se requieren los siguientes atributos:
- `started_at`: Hora de inicio del despliegue.
- `finished_at`: Hora de finalización del despliegue.
- `service`: El servicio que se ha desplegado. Si el servicio provisto está registrado en el [Catálogo de servicios][23] con metadatos configurados (consulta [Añadir metadatos][24]), el `team` del servicio se recupera automáticamente y se asocia con todas las métricas.

Los atributos `repository_url` y `commit_sha` también son necesarios para calcular la métrica del tiempo de espera de cambio. Opcionalmente, puedes especificar un atributo `team` para asociar un despliegue con un `team` diferente al que se encuentra automáticamente para el servicio. También puedes especificar el atributo `env` para filtrar tus métricas de DORA por entorno en la [página **Métricas de DORA**][25].

### Ejemplo de API (cURL)

Consulta la [Documentación de referencia de la API de métricas de DORA][26] para ver la especificación completa y ejemplos de códigos adicionales.

Para el siguiente ejemplo, sustituye `<DD_SITE>` en la URL por {{< region-param key="dd_site" code="true" >}} y `${DD_API_KEY}` por tu [Clave de la API Datadog][27]:
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
        "team": "backend"
      }
    }
  }
EOF
```

### Ejemplo de CLI

La herramienta CLI [`datadog-ci`][22] proporciona un acceso directo para enviar eventos del despliegue en tu entorno de integración continua.

Para el siguiente ejemplo, configura la variable de entorno `DD_SITE` en {{< region-param key="dd_site" code="true" >}} y configura la variable de entorno `DD_API_KEY` en tu [Clave de la API Datadog][27]:
```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

La hora de finalización del despliegue se configura automáticamente en ahora si no se proporciona `--finished-at`.

Si el trabajo de CI de despliegue se está ejecutando exactamente en la misma revisión de Git que se está desplegando, `git-repository-url` y `git-commit-sha` pueden omitirse y se deducen automáticamente del contexto de CI.

Se puede proporcionar la opción `--skip-git` para desactivar el envío de la URL del repositorio y el SHA de la confirmación. Cuando se añade esta opción, la métrica del tiempo de espera de cambio deja de estar disponible.

[21]: /es/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[22]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[23]: /es/tracing/service_catalog
[24]: /es/tracing/service_catalog/adding_metadata
[25]: https://app.datadoghq.com/ci/dora
[26]: /es/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[27]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

## Cálculo de la frecuencia de despliegue

La frecuencia de despliegue se calcula en función de la métrica `dora.deployments.count` que se genera y aumenta con cada despliegue detectado desde tu fuente de datos de despliegue seleccionada. La frecuencia se calcula dividiendo `dora.deployments.count` entre un periodo de tiempo específico.

## Cálculo del tiempo de espera de cambio

Para una única confirmación de Git, el tiempo de espera de cambio (CLT) se calcula como el tiempo transcurrido desde la creación de la confirmación hasta el momento en que se ejecutó el despliegue que incluía dicha confirmación.

Para calcular el tiempo de espera de cambio de un despliegue, Datadog ejecuta [`git log`][6] entre el SHA del confirmación de despliegue y el SHA de confirmación de despliegue anterior para encontrar todas las confirmaciones que se están desplegando. A continuación, calcula la media de los valores de tiempo de espera de cambio relacionados para todas estas confirmaciones. Datadog no almacena el contenido real de los archivos de tu repositorio, sólo los objetos de árbol y confirmación de Git.

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

Para los despliegues identificados a través del Rastreo de despliegue de APM, el tiempo de espera de cambio de una confirmación se calcula desde el momento de la creación de la confirmación hasta que esa confirmación se ve por primera vez en una nueva versión. Esto significa que la métrica `dora.deploy_time` no está disponible.

Para que los despliegues de servicios rastreadas por APM contribuyan al tiempo de espera de cambio, asegúrate de lo siguiente:

- Que la telemetría de tu aplicación esté etiquetada con información de Git. Puedes habilitarlo [en APM][101] o consultar la [documentación de integración de código fuente][102].
- Los metadatos de tu repositorio se sincronizan con Datadog a través de la [integración de GitHub][103] o mediante el comando `datadog-ci git-metadata upload`.

[101]: https://app.datadoghq.com/source-code/setup/apm
[102]: /es/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information
[103]: /es/integrations/github/

{{% /tab %}}
{{% tab "API or CLI" %}}

Para que los despliegues de servicios rastreados por la API de métricas de DORA o el comando `datadog-ci dora deployment` contribuyan al tiempo de espera de cambio, asegúrate de lo siguiente:

- Que los metadatos de tu repositorio se sincronicen con Datadog a través de la [integración de GitHub][101] o mediante el comando `datadog-ci git-metadata upload`.

[101]: /es/integrations/github/

{{% /tab %}}
{{< /tabs >}}

Para obtener más información sobre el desglose de la métrica del tiempo de espera de cambio, consulta [Datos recopilados][7].

### Sincronizar los metadatos del repositorio con Datadog

<!--
Las siguientes pestañas se copiaron principalmente desde los documentos de la integración del código fuente hasta que encontremos una manera de comprobar esto en una página compartida
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Los flujos de trabajo de GitHub que se ejecutan con <a href="https://docs.github.com/en/actions/using-workflows/eventos-that-trigger-workflows#pull_request"> el activador <code>pull_request</code> </a> no son compatibles actualmente con la integración de GitHub.
Si utilizas el activador <code>pull_request</code>, utiliza el método alternativo.
</div>

Si la [integración de GitHub][1] no está ya instalada, puedes instalarla en el [ícono de integración de GitHub][2].

Al configurar la aplicación GitHub:
1. Selecciona al menos permisos de **Lectura** del repositorio para **Contenido** y **Solicitudes de extracción**.
2. Suscríbete al menos a los eventos **Push**, **PullRequest** y **PullRequestReview**.

Para confirmar que la configuración es válida, selecciona tu aplicación GitHub en el [ícono de integración de GitHub][2] y comprueba que, en la pestaña **Features** (Funciones), esté activada la función **Métricas de DORA: Recopilar la métrica del tiempo de espera de cambio**.

[1]: https://docs.datadoghq.com/es/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "Other Git Providers" %}}

Puedes cargar los metadatos de tu repositorio de Git con el comando [`datadog-ci git-metadata upload`][1].
Cuando se ejecuta este comando, Datadog recibe la URL del repositorio, el SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecuta este comando en CI para cada nueva confirmación. Si se ejecuta un despliegue para un SHA de confirmación específico, asegúrate de que el comando `datadog-ci git-metadata upload` se ejecute para esa confirmación **antes** de que se envíe el evento del despliegue.

<div class="alert alert-danger">
No proporciones la opción <code>--no-gitsync</code> al comando de <code>metadatos de Datadog-ci git</code>.
Cuando se incluye esa opción, la información de la confirmación no se envía a Datadog ni se calcula la métrica del tiempo de espera de cambio.
</div>

Puedes validar la configuración correcta del comando comprobando la salida del comando. Un ejemplo de una salida correcta es el siguiente:
```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}


### Manejo de varios servicios en el mismo repositorio

Si el código fuente de varios servicios está presente en el mismo repositorio, se necesitan acciones adicionales para asegurar que el tiempo de espera de cambio se calcule teniendo en cuenta sólo las confirmaciones que afectan al servicio específico que se está desplegando.

Para filtrar las confirmaciones medidas a sólo las que afectan al servicio, especifica los patrones de las rutas de archivos glob del código fuente en la [definición de servicios][5].

Si la definición de servicios contiene una URL **completa** de GitHub a la carpeta de la aplicación, se utilizará automáticamente un único patrón de ruta.

**Ejemplo (versión del esquema v2.2):**

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```

Las métricas de DORA para el servicio `shopist` sólo consideran las confirmaciones de Git que incluyen cambios en `src/apps/shopist/**`. Puedes configurar un control más granular del filtrado con `extensions[datadoghq.com/dora-metrics]`.

**Ejemplo (versión del esquema v2.2):**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

Las métricas de DORA para el servicio `shopist` sólo tienen en cuenta las confirmaciones de Git que incluyen cambios en `src/apps/shopist/**` o `src/libs/utils/**`.

Si se definen las dos entradas de metadatos para un servicio, sólo se tiene en cuenta `extensions[datadoghq.com/dora-metrics]` para filtrar los confirmaciones.

### Limitaciones

- Las métricas del desglose por etapas del tiempo de espera de cambio sólo están disponibles para GitHub.
- El tiempo de espera de cambio no está disponible para el primer despliegue de un servicio que incluya información de Git.
- El cálculo del tiempo de espera de cambio incluye un máximo de 5000 confirmaciones por despliegue.
- Para las ramas recalculadas, los cálculos del *tiempo de espera de cambio* consideran las nuevas confirmaciones creadas durante el recálculo, no las confirmaciones originales.
- Cuando se utiliza "Squash" para fusionar solicitudes de extracción:
  - Para GitHub: se emiten métricas para las confirmaciones originales.
  - Para otros proveedores de git: se emiten métricas para la nueva confirmación añadida a la rama de destino.

## Cálculo de la tasa de fallas de cambio

La tasa de fallas de cambio se calcula dividiendo `dora.incidents.count` entre `dora.deployments.count` para los mismos servicios y/o equipos asociados con un incidente y con un evento de despliegue.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: /es/tracing/service_catalog
[4]: /es/tracing/service_catalog/setup
[5]: /es/tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /es/dora_metrics/data_collected