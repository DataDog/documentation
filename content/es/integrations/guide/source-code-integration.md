---
description: Configura la integración del código fuente que se integra con APM para
  vincular tu telemetría con tus repositorios, incorporar información git en artefactos
  de tu pipeline CI y utilizar la integración GitHub para generar fragmentos de código
  en línea.
further_reading:
- link: /integrations/github/
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: /tracing/error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores para servicios de backend
- link: /profiler/
  tag: Documentación
  text: Más información sobre el Continuous Profiler
- link: /serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
  tag: Documentación
  text: Más información sobre la monitorización serverless
- link: /tests/developer_workflows/
  tag: Documentación
  text: Más información sobre la visibilidad de los tests
- link: /code_analysis/
  tag: Documentación
  text: Más información sobre el análisis de código
- link: /security/application_security/
  tag: Documentación
  text: Más información sobre Application Security Monitoring
- link: /logs/error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores para logs
- link: https://www.datadoghq.com/blog/live-debugging/
  tag: Blog
  text: Solucionar eficazmente los errores de producción con la depuración en directo
    de Datadog
title: Integración del código fuente de Datadog
---

## Información general

La integración del código fuente de Datadog te permite conectar tu telemetría con tus repositorios Git. Permite depurar la trazas (traces) de stack tecnológico, perfiles lentos y otros problemas accediendo a las líneas pertinentes de tu código fuente.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Fragmento de código en línea de una clase RuntimeException de Java, con un botón para visualizar el código en GitHub" style="width:100%;">}}


## Configuración

Se requiere el Datadog Agent v7.35.0 o posterior.

Si ya tienes [APM][6] configurado, ve a [**Integraciones** > **Vincular código fuente**][7] y configura la integración del código fuente para tus servicios de backend.

## Etiquetado de tu telemetría con información Git

Tu telemetría debe estar etiquetada con información Git que vincule la versión de la aplicación en ejecución con un repositorio y una confirmación concretos.

Para los lenguajes compatibles, Datadog recomienda [integrar información Git](#embed-git-information-in-your-build-artifacts) en los artefactos desplegados, que luego es extraída por las [bibliotecas de rastreo de Datadog][9] automáticamente.

Para otros lenguajes y configuraciones, puedes [configurar el etiquetado de la telemetría](#configure-telemetry-tagging) tú mismo.

### Integrar información Git en tus artefactos de compilación

Puedes integrar la URL del repositorio y el hash de confirmación en tu artefacto de compilación. Las [bibliotecas de rastreo de Datadog][9] utilizan esta información para añadir automáticamente las etiquetas (tags) correctas a la telemetría de tu servicio APM.

Selecciona uno de los siguientes lenguajes que sea compatible con la integración de información Git:

{{< tabs >}}
{{% tab "Go" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente Go versión 1.48.0 o posterior.</div>

#### Contenedores

Si utilizas contenedores Docker, tienes tres opciones: utilizar Docker, utilizar la biblioteca de rastreo de Datadog o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Biblioteca de rastreo de Datadog

{{% sci-dd-tracing-library %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Serverless

Si utilizas la opción serverless, tiene tres opciones en función de la configuración de tu aplicación serverless.

##### Opción 1: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 2: Biblioteca de rastreo de Datadog

{{% sci-dd-tracing-library %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Si utilizas un host, tienes dos opciones.

##### Opción 1: Biblioteca de rastreo de Datadog

{{% sci-dd-tracing-library %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

[101]: https://tip.golang.org/doc/go1.18
[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: https://docs.datadoghq.com/es/serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs

{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente Python versión 1.12.0 o posterior.</div>

#### Contenedores

Si utilizas contenedores Docker, tienes tres opciones: utilizar Docker, utilizar la biblioteca de rastreo de Datadog o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Herramientas de configuración o archivo de parámetros unificados del proyecto Python

{{% sci-dd-setuptools-unified-python %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

[101]: https://github.com/DataDog/dd-trace-go
[102]: https://github.com/DataDog/hatch-datadog-build-metadata#readme

#### Serverless

Si utilizas la opción serverless, tiene tres opciones en función de la configuración de tu aplicación serverless.

##### Opción 1: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 2: Herramientas de configuración o archivo de parámetros unificados del proyecto Python

{{% sci-dd-setuptools-unified-python %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Si utilizas un host, tienes dos opciones.

##### Opción 2: Herramientas de configuración o archivo de parámetros unificados del proyecto Python

{{% sci-dd-setuptools-unified-python %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab ".NET" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente .NET versión 2.24.1 o posterior.</div>

#### Contenedores

Si utilizas contenedores Docker, tienes tres opciones: utilizar Docker, utilizar la biblioteca de rastreo de Datadog o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Serverless

Si utilizas la opción serverless, tiene tres opciones en función de la configuración de tu aplicación serverless.

##### Opción 1: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Si utilizas un host, tienes dos opciones: utilizar Microsoft SourceLink o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "NodeJS" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente NodeJS versión 3.21.0 o posterior.</div>

#### Contenedores

Si utilizas contenedores Docker, tienes dos opciones: utilizar Docker o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Serverless

Si utilizas la opción serverless, tiene dos opciones en función de la configuración de tu aplicación serverless.

##### Opción 1: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Si utilizas un host, configura tu aplicación con variables de entorno `DD_GIT_*`.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente Ruby versión 1.6.0 o posterior.</div>

#### Contenedores

Si utilizas contenedores Docker, tienes dos opciones: utilizar Docker o configurar tu aplicación con la variable de entorno `DD_TAGS`.

##### Opción 1: Docker

{{% sci-docker-ddtags %}}

##### Opción 2: Variable de entorno `DD_TAGS`

{{% sci-dd-tags-env-variable %}}

#### Serverless

Si utilizas la opción serverless, tiene dos opciones en función de la configuración de tu aplicación serverless.

##### Opción 1: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 2: Variable de entorno `DD_TAGS`

{{% sci-dd-tags-env-variable %}}

#### Host

Si utilizas un host, configura tu aplicación con la variable de entorno `DD_TAGS`.

{{% sci-dd-tags-env-variable %}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente Java versión 1.12.0 o posterior.</div>

Si utilizas contenedores Docker, tienes dos opciones: utilizar Docker o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Serverless

Si utilizas la opción serverless, tiene dos opciones en función de la configuración de tu aplicación serverless.

##### Opción 1: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Si utilizas un host, configura tu aplicación con variables de entorno `DD_GIT_*`.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente PHP versión 1.2.0 o posterior.</div>

Si utilizas contenedores Docker, tienes dos opciones: utilizar Docker o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Si utilizas un host, configura tu aplicación con variables de entorno `DD_GIT_*`.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{< /tabs >}}

### Compilación dentro de un contenedor Docker

Si tu proceso de compilación se ejecuta en CI dentro de un contenedor Docker, realiza los siguientes pasos para asegurarte de que la compilación puede acceder a la información Git:

1. Añade el siguiente texto a tu archivo `.dockerignore`. Esto te asegura que el proceso de compilación pueda acceder a un subconjunto de la carpeta `.git`, lo que le permite determinar el hash de confirmación Git y la URL del repositorio.

   ```
   !.git/HEAD
   !.git/config
   !.git/refs
   ```

2. Añade la siguiente línea de código a tu `Dockerfile`. Asegúrate de colocarla antes de que se ejecute la compilación real.

   ```
   COPY .git ./.git
   ```

### Configuración del etiquetado de telemetría

Para los lenguajes no compatibles, utiliza las etiquetas `git.commit.sha` y `git.repository_url` para vincular los datos a una confirmación específica. Asegúrate de que la etiqueta `git.repository_url` no contiene protocolos. Por ejemplo, si la URL de tu repositorio es `https://github.com/example/repo`, el valor de la etiqueta `git.repository_url` debe ser `github.com/example/repo`.

## Sincronización de los metadatos de tu repositorio

Para vincular tu telemetría con el código fuente, los metadatos de tu repositorio deben estar sincronizados con Datadog. Datadog no almacena el contenido real de los archivos de tu repositorio, sólo los objetos Git commit y tree.

### Proveedores Git

La integración del código fuente admite los siguientes proveedores Git:

| Proveedor | Compatibilidad con enlaces contextuales | Compatibilidad con fragmentos de código |
|---|---|---|
| SaaS GitHub (github.com) | Sí | Sí |
| GitHub Enterprise Server | Sí | Sí |
| SaaS GitLab (gitlab.com) | Sí | Sí |
| GitLab autogestionado | Sí | No |
| Bitbucket | Sí | No |
| Servicios Azure DevOps | Sí | No |
| Azure DevOps Server | Sí | No |

{{< tabs >}}
{{% tab "GitHub" %}}

Instala la [integración GitHub][101] de Datadog en el [cuadro de integración GitHub][102] para permitir que Datadog sincronice los metadatos de tu repositorio automáticamente. Cuando especifiques los permisos en el cuadro de integración, selecciona al menos permisos de **Lectura** para **Contenidos**.

Configurar la integración GitHub también te permite ver fragmentos de código en línea en [**Seguimiento de errores**][103], [**Continuous Profiler**][104], [**Monitorización serverless**][105], [**CI Visibility**][106] y [**Application Security Monitoring**][107].

[101]: https://docs.datadoghq.com/es/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/
[103]: /es/logs/error_tracking/backend/?tab=serilog#setup
[104]: /es/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[105]: /es/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[106]: /es/tests/developer_workflows/#open-tests-in-github-and-your-ide
[107]: /es/security/application_security/

{{% /tab %}}
{{% tab "GitLab" %}}

<div class="alert alert-warning">
Los repositorios de las instancias autogestionadas de GitLab no son compatibles con la integración del código fuente. Para habilitar esta función, <a href="/help">ponte en contacto con el servicio de asistencia</a>.
</div>

Para vincular la telemetría con tu código fuente, carga los metadatos de tu repositorio con el comando [`datadog-ci git-metadata upload`][2].

Cuando se ejecuta `datadog-ci git-metadata upload` dentro de un repositorio Git, Datadog recibe la URL del repositorio, la función SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecuta este comando para cada confirmación que necesites sincronizar con Datadog.

Si utilizas [gitlab.com][1], esto también te permite ver fragmentos de código en línea en [**Seguimiento de errores**][3], [**Continuous Profiler**][4], [**Monitorización serverless**][5], [**CI Visibility**][6] y [**Application Security Monitoring**][7].

### Validación

Para asegurarte de que los datos se están recopilando, ejecuta `datadog-ci git-metadata upload` en tu pipeline CI.

Puedes esperar ver el siguiente resultado:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://gitlab.com
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[3]: /es/logs/error_tracking/backend/?tab=serilog#setup
[4]: /es/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[5]: /es/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[6]: /es/tests/developer_workflows/#open-tests-in-github-and-your-ide
[7]: /es/security/application_security/

{{% /tab %}}
{{% tab "Otros proveedores Git" %}}

<div class="alert alert-warning">
Los repositorios en instancias autoalojadas o URL privadas no son compatibles con la integración del código fuente. Para habilitar esta función, <a href="/help">ponte en contacto con el servicio de asistencia</a>.
</div>

Para vincular la telemetría con tu código fuente, carga los metadatos de tu repositorio con el comando [`datadog-ci git-metadata upload`][2].

Cuando se ejecuta `datadog-ci git-metadata upload` dentro de un repositorio Git, Datadog recibe la URL del repositorio, la función SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecuta este comando para cada confirmación que necesites sincronizar con Datadog.

### Validación

Para asegurarte de que los datos se están recopilando, ejecuta `datadog-ci git-metadata upload` en tu pipeline CI.

Puedes esperar ver el siguiente resultado:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Uso

### Enlaces a proveedores Git

{{< tabs >}}
{{% tab "Seguimiento de errores" %}}
En [Seguimiento de errores][1], puedes ver los enlaces desde los marcos de stack tecnológico hasta su repositorio de origen.

1. Ve a [**APM** > **Seguimiento de errores**][2].
2. Haz clic en un problema. El panel **Detalles de problemas** aparece a la derecha.
3. En **Último evento**, haz clic en el botón **View** (Ver) a la derecha de un marco o selecciona **Ver archivo**, **VerGit blame** o **Ver confirmación** para regresar a tu herramienta de gestión de código fuente.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="Botón de visualización de un repositorio con tres opciones (ver archivo, ver blame y ver confirmación) disponibles a la derecha de una traza de stack tecnológico de error en Seguimiento de errores, junto con fragmentos de código en línea en la traza del stack tecnológico" style="width:100%;">}}

Si utilizas la integración GitHub o si alojas tus repositorios en la instancia SaaS de GitLab (gitlab.com), haz clic en **Connect to preview** (Conectar para previsualizar), en los marcos de stack tecnológico. Puedes ver fragmentos de código en línea directamente en la traza de stack tecnológico.

[1]: /es/tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

En el [Continuous Profiler][1], puedes ver una vista previa del código fuente de los marcos de perfiles.

1. Ve a [**APM** > **Búsqueda de perfiles**][2].
2. Pasa el cursor sobre un método en el gráfico de llamas.
3. Si es necesario, pulsa `Opt` o `Alt` para habilitar la vista previa.

{{< img src="integrations/guide/source_code_integration/profiler-source-code-preview.png" alt="Vista previa del código fuente en el Continuous Profiler" style="width:100%;">}}

También puedes ver los enlaces desde los marcos de perfiles hasta su repositorio de origen. Esto es compatible con los perfiles desglosados por línea, método o archivo.

1. Ve a [**APM** > **Búsqueda de perfiles**][2].
2. Pasa el cursor sobre un método en el gráfico de llamas. A la derecha aparece un icono con tres puntos con la etiqueta **Más acciones**.
3. Haz clic en **More actions** > **View in repo** (Más acciones > Ver en repositorio) para abrir la traza en su repositorio de código fuente.

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="Enlace a GitHub desde el Continuous Profiler" style="width:100%;">}}

[1]: /es/profiler/
[2]: https://app.datadoghq.com/profiling/search
{{% /tab %}}
{{% tab "Monitorización serverless" %}}

Puedes ver los enlaces de los errores en tus trazas de stack tecnológico, asociadas a funciones Lambda, hasta su repositorio de origen en **Monitorización serverless**.

1. Ve a [**Infraestructura** > **Serverless**][101] y haz clic en la pestaña **AWS**.
2. Haz clic en una función Lambda y luego en el botón **Open Trace** (Abrir traza) para una invocación con una traza de stack tecnológico asociada.
3. Haz clic en **View Code** (Ver código) para abrir el error en su repositorio de código fuente.

Si utilizas la integración GitHub, haz clic en **Connect to preview** (Conectar para previsualizar) en los cuadros de error. Puedes ver fragmentos de código en línea directamente en la traza de stack tecnológico de la función Lambda.

{{< img src="integrations/guide/source_code_integration/serverless-aws-function-errors.mp4" alt="Enlace a GitHub desde Monitorización serverless" video="true" >}}

[101]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions

{{% /tab %}}
{{% tab "Visibilidad de los tests" %}}

En **Visibilidad de los tests**, puedes ver los enlaces de ejecuciones de tests fallidas hasta su repositorio de origen.

1. Ve a [**Entrega de software** > **Visibilidad de los tests** > **Ejecuciones de tests**][101] y selecciona un test fallido.
2. Haz clic en el botón **View on GitHub** (Ver en GitHub) para abrir el test en su repositorio de código fuente.

{{< img src="integrations/guide/source_code_integration/test_run_blurred.png" alt="Enlace a GitHub desde el Explorador de CI Visibility" style="width:100%;">}}

Para obtener más información, consulta [Mejora de los flujos de trabajo de los desarrolladores con Datadog][102].

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /es/tests/developer_workflows/#open-tests-in-github-and-your-ide

{{% /tab %}}
{{% tab "Análisis de código" %}}

En **Análisis de código**, puedes ver los enlaces desde los Análisis estáticos y los Análisis de composición del software fallidos hasta su repositorio de fuentes.

1. Ve a [**Entrega de software** > **Visibilidad de los tests** > **Análisis de código**][101] y selecciona un repositorio.
2. En **Vulnerabilidades del código** o **Calidad del código**, haz clic en una vulnerabilidad o violación del código. En la sección **Detalles**, haz clic en el botón **View Code** (Ver código) para abrir el código marcado en su repositorio de código fuente.

{{< img src="integrations/guide/source_code_integration/code-analysis-scan.png" alt="Enlace a GitHub desde la vista de Vulnerabilidades del código en Análisis del código" style="width:100%;">}}

Para obtener más información, consulta la [documentación de Análisis del código][102].

[101]: https://app.datadoghq.com/ci/code-analysis
[102]: /es/code_analysis/

{{% /tab %}}
{{% tab "Application Security Monitoring" %}}

En **Application Security Monitoring**, puedes ver los enlaces de errores en tus trazas de stack tecnológico asociadas a señales de seguridad, hasta su repositorio fuente.

1. Ve a [**Seguridad** > **Seguridad de la aplicación**][101] y selecciona una señal de seguridad.
2. Desplázate hasta la sección **Trazas**, en la pestaña **Señales relacionadas**, y haz clic en una traza de stack tecnológico asociada.
3. Haz clic en **View Code** (Ver código) para abrir el error en su repositorio de código fuente.

Si utilizas la integración GitHub, haz clic en **Connect to preview** (Conectar para previsualizar) en los cuadros de error. Puedes ver fragmentos de código en línea directamente en la traza de stack tecnológico de la señal de seguridad.

{{< img src="integrations/guide/source_code_integration/asm-signal-trace-blur.png" alt="Enlace a GitHub desde Application Security Monitoring" style="width:100%;">}}

[101]: https://app.datadoghq.com/security/appsec

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[5]: /es/integrations/github/
[6]: /es/tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[8]: /es/tracing/error_tracking/
[9]: /es/tracing/trace_collection/dd_libraries/