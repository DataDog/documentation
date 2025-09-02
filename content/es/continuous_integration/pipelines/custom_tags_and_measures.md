---
aliases:
- /es/continuous_integration/pipelines/custom_tags_and_metrics
- /es/continuous_integration/setup_pipelines/custom_tags_and_metrics
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurar alertas de pipeline con los monitores de CI de Datadog
title: Añadir medidas y etiquetas personalizadas a trazas de pipeline
---

## Información general

Utiliza las etiquetas (tags) y medidas personalizadas para añadir texto definido por el usuario y etiquetas numéricas a tus trazas (traces) de pipeline en [CI Pipeline Visibility][11]. Puedes utilizar el [paquete `datadog-ci` NPM][1] para añadir etiquetas personalizadas a una traza de pipeline o a un tramo (span) de trabajo, además de añadir medidas a una traza de pipeline o a un tramo de trabajo. A partir de estas etiquetas y medidas personalizadas, puedes crear facetas (etiquetas de valor de cadena) o medidas (etiquetas de valor numérico). 

Puedes utilizar facetas y medidas para filtrar, crear visualizaciones o crear monitores para tus pipelines en el [CI Visibility Explorer][10].

### Compatibilidad

Las etiquetas y las medidas personalizadas funcionan con los siguientes proveedores de CI:

- Buildkite
- CircleCI
- GitLab (SaaS o autoalojado >= 14.1)
- GitHub.com (SaaS): para añadir etiquetas y medidas a los trabajos de GitHub, consulta la [sección siguiente](#add-tags-and-measures-to-github-jobs).
- Jenkins: para Jenkins, sigue [estas instrucciones][5] para configurar etiquetas personalizadas en tus pipelines.
- Pipelines Azure DevOps

## Instalar la CLI de Datadog CI

Instala la CLI de [`datadog-ci`][1] (>=v1.15.0) globalmente usando `npm`:

```shell
npm install -g @datadog/datadog-ci
```

Alternativamente, puedes probar y usar el [archivo binario independiente][2] beta si no quieres usar `npm`.

{{< tabs >}}
{{% tab "Linux" %}}
Para instalar el archivo binario independiente en Linux, ejecuta:

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "MacOS" %}}
Para instalar el archivo binario independiente en MacOS, ejecuta:

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "Windows" %}}
Para instalar el archivo binario independiente en Windows, ejecuta:

```shell
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
```
{{% /tab %}}
{{< /tabs >}}

## Añadir etiquetas a las trazas de pipeline

Las etiquetas pueden añadirse al tramo de pipeline o al tramo de trabajo.

Para ello, ejecuta el comando `tag`:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag [--level <pipeline|job>] [--tags <tag1>] [--tags <tag2>] ...
```

Debes especificar una [clave de API de Datadog][3] válida utilizando la variable de entorno `DATADOG_API_KEY` y el [sitio de Datadog][12] utilizando la variable de entorno `DATADOG_SITE`.

El siguiente ejemplo añade las etiquetas `team` y `service` al tramo de pipeline.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level pipeline --tags team:backend --tags service:processor
```

El siguiente ejemplo añade la etiqueta `go.version` al tramo para el trabajo actual:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level job --tags "go.version:`go version`"
```

Para crear una faceta a partir de una etiqueta, haz clic en el icono de engranaje situado junto al nombre de la etiqueta en la [página Ejecuciones de pipeline][4] y haz clic en **Create Facet** (Crear faceta).

{{< img src="ci/custom-tags-create-facet.mp4" alt="Creación de faceta para una etiqueta personalizada" style="width:100%;" video="true">}}

## Añadir medidas a las trazas de pipeline

Para añadir etiquetas numéricas al tramo de pipeline o al tramo de trabajo, ejecuta el comando `measure`:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure [--level <pipeline|job>] [--measures <measure1>] [--measures <measure2>]...
```

Debes especificar una [clave de API de Datadog][3] válida utilizando la variable de entorno `DATADOG_API_KEY` y el [sitio de Datadog][12] utilizando la variable de entorno `DATADOG_SITE`.

El siguiente ejemplo añade las medidas `error_rate` y `size` al tramo de pipeline:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level pipeline --measures "error_rate:0.56" --measures "size:2327"
```

El siguiente ejemplo añade una medida `binary.size` al tramo para el trabajo que se está ejecutando actualmente:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level job --measures "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
```

Para crear una medida, haz clic en el icono de engranaje situado junto al nombre de una medida en la [página Ejecuciones de pipeline][4] y haz clic en **Create measure** (Crear medida).

## Añadir etiquetas y medidas a los trabajos de GitHub

Para añadir etiquetas y medidas a los trabajos de GitHub, se requiere `datadog-ci CLI` versión `2.29.0` o posterior.
Si el nombre del trabajo no coincide con la entrada definida en el archivo de configuración del flujo de trabajo (el [ID del trabajo][7] de GitHub),
la variable de entorno `DD_GITHUB_JOB_NAME` debe ser expuesta, apuntando al nombre del trabajo. Por ejemplo:
1. Si se cambia el nombre del trabajo utilizando la [propiedad name][8]:
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci tag ...
    ```
2. Si se utiliza la [estrategia de matriz][9], GitHub genera varios nombres de trabajo añadiendo los valores de matriz al final del nombre del trabajo, entre paréntesis. La variable de entorno `DD_GITHUB_JOB_NAME` debe entonces ser condicional a los valores de la matriz:

    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            version: [1, 2]
            os: [linux, macos]
        env:
          DD_GITHUB_JOB_NAME: build (${{ matrix.version }}, ${{ matrix.os }})
        steps:
        - run: datadog-ci tag ...
    ```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/datadog/datadog-ci#standalone-binary-beta
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /es/continuous_integration/pipelines/jenkins?tab=usingui#setting-custom-tags-for-your-pipelines
[6]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux#add-tags-and-measures-to-github-jobs
[7]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[8]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[9]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[10]: /es/continuous_integration/explorer
[11]: /es/continuous_integration/pipelines/
[12]: /es/getting_started/site/