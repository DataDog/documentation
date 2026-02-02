---
aliases:
- /es/continuous_integration/setup_pipelines/custom_commands
further_reading:
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Añadir comandos personalizados a traces (trazas) de pipelines
---

Los comandos personalizados proporcionan una forma de rastrear comandos individuales en tus pipelines de CI, lo que te permite medir el tiempo que tarda tu comando sin tener en cuenta las acciones de configuración o desmontaje que podría tener el job (generic) (por ejemplo, la descarga de imágenes de Docker o la espera de un nodo disponible en una infraestructura basada en Kubernetes). Estos spans (tramos) aparecen como parte de la trace (traza) del pipeline:

{{< img src="ci/ci-custom-spans.png" alt="Detalles de un único pipeline con comandos personalizados" style="width:100%;">}}

## Compatibilidad

Los comandos personalizados funcionan con los siguientes proveedores de CI:

- GitHub.com (SaaS) con datadog-ci CLI >= 2.40. Para enviar comandos personalizados en GitHub Actions, consulta [Problema conocido con Github Actions](#known-issue-with-github-actions).
- GitLab (SaaS o autoalojado >= 14.1) con datadog-ci CLI >= 2.40.
- Jenkins con el complemento de Datadog >= v3.2.0
- CircleCI
- Azure DevOps Pipelines con datadog-ci CLI >= 2.40.
- AWS Codepipeline con datadog-ci CLI >= 2.40. Sigue [Añadir comandos personalizados][6] para configurar comandos personalizados en AWS Codepipeline.
- Buildkite con datadog-ci CLI >= 2.40.

## Instalar CI CLI de Datadog

Instala la [`datadog-ci`][1] (>=v0.17.0) CLI globalmente con `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

<div class="alert alert-info">Consulta <a href="https://github.com/DataDog/datadog-ci?tab=readme-ov-file#more-ways-to-install-the-cli">Más formas de instalar la CLI</a> en el repositorio de datadog-ci para obtener otras opciones de instalación.</div>

## Rastrear una línea de comandos

Para rastrear una línea de comandos, ejecuta:

{{< code-block lang="shell" >}}
datadog-ci trace [--name <name>] -- <command>
{{< /code-block >}}

Especifica una [clave de API de Datadog][2] válida en la variable de entorno `DATADOG_API_KEY`. Por ejemplo:

{{< site-region region="us,us3,eu,ap1,ap2" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace \
--name "Greet" \
-- \
echo "Hello World"
</code>
</pre>
{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">CI Visibility no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Ajustes de configuración

Estas opciones están disponibles para el comando `datadog-ci trace (traza)`:

`--name`
: Muestra el nombre del comando personalizado.<br/>
**Predeterminado**: el mismo valor que `<command>`<br/>
**Ejemplo**: `Wait for DB to be reachable`

`--tags`
: Pares clave-valor con el formato `key:value` que se adjuntarán al comando personalizado (el parámetro `--tags` puede especificarse varias veces). Al especificar tags (etiquetas) con `DD_TAGS`, sepáralas con comas (por ejemplo, `team:backend,priority:high`).<br/>
**Variable de entorno `DD_TAGS`<br/>
**Predeterminada**: (ninguna)<br/>
**Ejemplo**: `team:backend`<br/>
**Nota**: Las tags (etiquetas) especificadas con `--tags` y con la variable de entorno `DD_TAGS` se fusionan. Si la misma clave aparece en `--tags` y en `DD_TAGS`, el valor de la variable de entorno `DD_TAGS` tiene prioridad.

`--measures`
: Pares clave-valor con el formato `key:value` que se adjuntarán al comando personalizado como valores numéricos (el parámetro `--measures` puede especificarse varias veces).<br/>
(Requiere datadog-ci >=v2.35.0) <br/>
**Predeterminado**: (ninguno)<br/>
**Ejemplo**: `size:1024`<br/>

`--no-fail`
: Evita que datadog-ci falle incluso si se ejecuta en un proveedor CI no admitido. En este case (incidencia), el comando se ejecuta y no se informa de nada a Datadog.<br/>
**Predeterminado**: `false`

`--dry-run`
: Evita que datadog-ci envíe el span (tramo) personalizado a Datadog. Se realizan todos los demás checks.<br/>
**Predeterminado**: `false`

Argumentos posicionales
: El comando que se lanza y se rastrea.

Se admiten las siguientes variables de entorno:

`DATADOG_API_KEY` (Obligatorio)
: [Clave de API de Datadog][2] utilizada para autenticar las solicitudes.<br/>
**Predeterminada**: (ninguna)

{{< site-region region="us3,us5,eu,ap1,ap2" >}}
Además, configura el sitio Datadog para que utilice el seleccionado ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE`
: El sitio Datadog al que cargar los resultados.<br/>
**Predeterminado**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Rastrear un bloque de comandos

Es posible rastrear varias líneas de comandos a la vez especificando manualmente las marcas de tiempo de inicio y fin (o la duración).

{{< code-block lang="shell" >}}
el span (tramo) de la trace (traza) de datadog-ci [--name <name>] [--start-time <timestamp-ms>] [--end-time <timestamp-ms>] # [--duration <duration-ms>] puede utilizarse en lugar de la hora de inicio/fin
{{< /code-block >}}

Especifica una [clave de API de Datadog][2] válida en la variable de entorno `DATADOG_API_KEY`. Por ejemplo:

{{< site-region region="us,us3,eu,ap1,ap2" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace span \
--name "Build Step" \
--duration 10000
</code>
</pre>
{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">CI Visibility no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Ajustes de configuración

Estas opciones están disponibles para el comando `datadog-ci trace (traza) span (tramo)`:

`--name`
: Muestra el nombre del span (tramo) personalizado.<br/>
**Ejemplo**: `Build step (UI) / paso (generic)`

`--start-time`
: Marca de tiempo en milisegundos desde la época UNIX que representa la hora de inicio del span (tramo).<br/>
**Nota**: Hay dos formas de especificar la hora de inicio y fin, con `--start-time` y `--end-time` o con `--duration`.

`--end-time`
: Marca de tiempo en milisegundos desde la época UNIX que representa la hora de finalización del span (tramo).<br/>
**Nota**: Hay dos formas de especificar la hora de inicio y fin, con `--start-time` y `--end-time` o con `--duration`.

`--duration`
: Duración en milisegundos. Usando esto, la hora de finalización es la hora actual en que se ejecuta este comando.<br/>
**Nota**: Hay dos formas de especificar la hora de inicio y fin, con `--start-time` y `--end-time` o con `--duration`.

`--tags`
: Pares clave-valor con el formato `key:value` que se adjuntarán al span (tramo) personalizado (el parámetro `--tags` puede especificarse varias veces). Al especificar tags (etiquetas) con `DD_TAGS`, sepáralas con comas (por ejemplo, `team:backend,priority:high`).<br/>
**Variable de entorno `DD_TAGS`<br/>
**Predeterminada (ninguna)<br/>
**Ejemplo**: `team:backend`<br/>
**Nota**: Las etiquetas especificadas con `--tags` y con la variable de entorno `DD_TAGS` se fusionan. Si la misma clave aparece en `--tags` y en `DD_TAGS`, el valor de la variable de entorno `DD_TAGS` tiene prioridad.

`--measures`
: Pares clave-valor con el formato `key:value` que se adjuntarán al span (tramo) personalizado como valores numéricos (el parámetro `--measures` puede especificarse varias veces).<br/>
_(Requiere datadog-ci >=v2.35.0)_ <br/>
**Predeterminado**: (ninguno)<br/>
**Ejemplo**: `size:1024`<br/>

`--dry-run`
: Evita que datadog-ci envíe el span (tramo) personalizado a Datadog. Se realizan todos los demás checks.<br/>
**Predeterminado**: `false`

Se admiten las siguientes variables de entorno:

`DATADOG_API_KEY` (Obligatorio)
: [clave de API de Datadog][2] utilizada para autenticar las solicitudes.<br/>
**Predeterminada**: (ninguna)

{{< site-region region="us3,us5,eu,ap1,ap2" >}}
Además, configura el sitio Datadog para que utilice el seleccionado ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE`
: El sitio Datadog al que cargar los resultados.<br/>
**Predeterminado**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Problema conocido con las GitHub Actions


A partir de la versión `datadog-ci` `4.1.1` , no se requiere acción adicional, incluso cuando se utilizan nombres personalizados o estrategias de matriz.

<details>
<summary><strong>Para versiones de datadog-ci anteriores a la 4.1.1</strong></summary>

Si estás utilizando `datadog-ci` versión `2.29.0` a `4.1.0` y el nombre de job (generic) no coincide con la entrada definida en el archivo de configuración de workflow (UI) / proceso (generic) (el [ID de job (generic)][3] de GitHub), es necesario exponer la variable de entorno `DD_GITHUB_JOB_NAME`, apuntando al nombre de job (generic). Por ejemplo:

1. Si se cambia el nombre de job (generic) con la [propiedad de nombre][4]:
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci trace ...
    ```
2. Si se utiliza la [estrategia de matriz][5], GitHub genera varios nombres de job (generic) añadiendo los valores de matriz al final del nombre de job (generic), entre paréntesis. La variable de entorno `DD_GITHUB_JOB_NAME` debe entonces condicionarse a los valores de la matriz:

    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            version: [1, 2]
            os: [Linux, macos]
        env:
          DD_GITHUB_JOB_NAME: build (${{ matrix.version }}, ${{ matrix.os }})
        steps:
        - run: datadog-ci trace ...
    ```
</details>

## Solucionar problemas

### Carga útil demasiado grande
El límite de tamaño es aproximadamente `4MB`. La causa más común de este error son las tags (etiquetas) demasiado grandes.
Utiliza la opción `--dry-run` para ver el contenido del comando rastreado antes de enviarlo a Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[4]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[5]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[6]: /es/continuous_integration/pipelines/awscodepipeline/#add-the-pipeline-execution-id-as-an-environment-variable