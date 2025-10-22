---
description: Configura la integración del código fuente que se integra con APM para
  vincular tu telemetría con tus repositorios, incorporar información Git en artefactos
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
  text: Más información sobre Continuous Profiler
- link: /serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
  tag: Documentación
  text: Más información sobre Serverless Monitoring
- link: /tests/developer_workflows/
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /security/code_security/
  tag: Documentación
  text: Más información sobre Code Security
- link: /security/application_security/
  tag: Documentación
  text: Más información sobre Application Security Monitoring
- link: /logs/error_tracking/
  tag: Documentación
  text: Más información sobre Error Tracking para logs
- link: https://www.datadoghq.com/blog/live-debugging/
  tag: Blog
  text: Solucionar eficazmente los errores de producción con la depuración en directo
    de Datadog
title: Integración del código fuente de Datadog
---

## Información general

La integración del código fuente en Datadog te permite conectar tus repositorios Git con Datadog para habilitar diferentes funciones relacionadas con el código fuente en toda la plataforma Datadog. Permite depurar trazas (traces) de stack tecnológico, perfiles lentos y otros problemas accediendo a las líneas relevantes de tu código fuente.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Fragmento de código en línea de una clase RuntimeException de Java, con un botón para visualizar el código en GitHub" style="width:100%;">}}

## Conectar tus repositorios Git con Datadog

Para utilizar la mayoría de las funciones relacionadas con el código fuente, debes conectar tus repositorios Git con Datadog. Por defecto, al sincronizar tus repositorios, Datadog no almacena el contenido real de los archivos de tu repositorio, solo los objetos Git commit y tree.

### Proveedores de gestión de código fuente

Datadog admite las siguientes funciones para los siguientes proveedores de gestión de código fuente (SCM). Para ver más detalles sobre cada función, consulta [Uso](#usage):

| Función | GitHub | GitLab | Azure DevOps | Bitbucket |
|---|---|---|---|---|
| **Conectar instancia SaaS** | Sí <br />(GitHub.com y GitHub Enterprise Cloud) | Sí <br />(GitLab.com) | Sí <br />(Azure DevOps Services) | No <br />(Bitbucket.org) |
| **Conectar instancia On-Prem** | Sí <br />(GitHub Enterprise Server) | Sí <br />(GitLab autogestionado o exclusivo) | No <br />(Azure DevOps Server) | No <br />(Centro de datos o servidor Bitbucket)|
| **Enlaces de contexto** | Sí | Sí | Sí | Sí |
| **Fragmentos de código** | Sí | Sí | Sí | No |
| **Comentarios en solicitudes pull** | Sí | Sí | Sí | No |

{{< tabs >}}
{{% tab "GitHub (SaaS y On-Prem)" %}}

<div class="alert alert-info">
Los repositorios de las instancias de GitHub son compatibles con GitHub.com, GitHub Enterprise Cloud (SaaS) y GitHub Enterprise Server (On-Prem). Para GitHub Enterprise Server, tu instancia debe ser accesible desde Internet. Si es necesario, puedes permitir <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">direcciones IP de <code>webhooks</code> de Datadog</a> para que Datadog pueda conectarse a tu instancia.
</div>

Instala la [integración GitHub][101] de Datadog utilizando el [cuadro de la integración][102] o mientras accedes a otros productos de Datadog para conectarte a tus repositorios de GitHub.

[101]: https://docs.datadoghq.com/es/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/

{{% /tab %}}
{{% tab "GitLab (SaaS y On-Prem)" %}}

<div class="alert alert-danger">
Los repositorios de las instancias de GitLab son compatibles con la vista previa cerrada. Los repositorios de las instancias de GitLab son compatibles tanto con GitLab.com (SaaS) como con GitLab Self-Managed/Dedicated (On-Prem). Para GitLab Self-Managed, tu instancia debe ser accesible desde Internet. Si es necesario, puedes permitir <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">direcciones IP de <code>webhooks</code> de Datadog</a> para permitir que Datadog se conecte a tu instancia. <a href="https://www.datadoghq.com/product-preview/gitlab-source-code-integration/">Únete a la vista previa</a>.
</div>

Instala la [integración del código fuente de GitHub][101] de Datadog utilizando el [cuadro de la integración][102] o mientras accedes a otros productos de Datadog para conectarte a tus repositorios de GitHub.

[101]: https://www.datadoghq.com/product-preview/gitlab-source-code-integration/
[102]: https://app.datadoghq.com/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps (solo SaaS)" %}}

<div class="alert alert-danger">
Los repositorios de Azure DevOps son compatibles con la vista previa cerrada. <a href="https://www.datadoghq.com/product-preview/azure-devops-integration-code-security/">Únete a la vista previa</a>.
</div>

Instala la integración de código fuente de Azure DevOps de Datadog utilizando el [cuadro de integración][102] o mientras se incorpora a [Datadog Code Security][101].

[101]: https://app.datadoghq.com/security/configuration/code-security/setup?provider=azure-devops&steps=static
[102]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{% tab "Otros proveedores de SCM" %}}

<div class="alert alert-danger">
Los repositorios en instancias autoalojadas o URL privadas no son compatibles de forma predeterminada. Para activar esta función, <a href="/help">ponte en contacto con el servicio de asistencia</a>.
</div>

Si estás utilizando cualquier otro proveedor SCM, aún puedes vincular manualmente la telemetría con tu código fuente. Para ello, carga los metadatos de tu repositorio con el comando [`datadog-ci git-metadata upload`][1]. Se requiere `datadog-ci v2.10.0` o posterior.

Cuando se ejecuta `datadog-ci git-metadata upload` dentro de un repositorio Git, Datadog recibe la URL del repositorio, la función SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecuta este comando para cada confirmación que necesites sincronizar con Datadog.

### Validación

Para asegurarte de que los datos se están recopilando, ejecuta `datadog-ci git-metadata upload` en tu pipeline CI.

Puedes esperar ver el siguiente resultado:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Etiquetar tu telemetría APM con información Git

Se requiere el Datadog Agent v7.35.0 o posterior.

Si ya tienes [APM][6] configurado, ve a [**Integrations** > **Link Source Code** (Integraciones > Vincular código fuente)][7] y configura la integración del código fuente para tus servicios de backend.

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

Si utilizas la opción serverless, tienes tres opciones en función de la configuración de tu aplicación serverless.

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

Si utilizas la opción serverless, tienes tres opciones en función de la configuración de tu aplicación serverless.

##### Opción 1: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 2: Herramientas de configuración o archivo de parámetros unificados del proyecto Python

{{% sci-dd-setuptools-unified-python %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Si utilizas un host, tienes dos opciones.

##### Opción 1: Herramientas de configuración o archivo de parámetros unificados del proyecto Python

{{% sci-dd-setuptools-unified-python %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab ".NET" %}}

<div class="alert alert-info">Se requiere la biblioteca del cliente .NET versión 2.24.1 o posterior.</div>

Como primer paso, asegúrate de que tus archivos `.pdb` se despliegan junto con tus ensamblados .NET (`.dll` o `.exe`) en la misma carpeta.
A continuación, sigue el resto de las instrucciones en función de tu modelo de despliegue específico:

#### Contenedores

Si utilizas contenedores Docker, tienes tres opciones: utilizar Docker, utilizar la biblioteca de rastreo de Datadog o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Serverless

Si utilizas la opción serverless, tienes tres opciones en función de la configuración de tu aplicación serverless.

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
{{% tab "Node.js" %}}

<div class="alert alert-info">
  Se requiere la biblioteca de cliente de Node.js versión 3.21.0 o posterior.
  </br>
  </br>
  Para aplicaciones de Node.js transpiladas (por ejemplo, TypeScript), asegúrate de generar y publicar mapas de fuentes con la aplicación desplegada, y de ejecutar Node.js con la opción <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a>. De lo contrario, los enlaces de código y fragmentos no funcionarán.
</div>

#### Contenedores

Si utilizas contenedores de Docker, tienes varias opciones: utilizar un complemento si tu aplicación está empaquetada, utilizar Docker, o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Complemento empaquetador

{{% sci-dd-tags-bundled-node-js %}}

##### Opción 2: Docker

{{% sci-docker %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Serverless

Si estás utilizando Serverless, tienes varias opciones dependiendo de la configuración de tu aplicación serverless.

##### Opción 1: Complemento empaquetador

{{% sci-dd-tags-bundled-node-js %}}

##### Opción 2: Herramientas de Datadog

{{% sci-dd-serverless %}}

##### Opción 3: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Host

Para entornos basados en host, tienes dos opciones basadas en tu configuración de compilación y despliegue.

##### Opción 1: Complemento empaquetador

{{% sci-dd-tags-bundled-node-js %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

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

Si utilizas la opción serverless, tienes dos opciones en función de la configuración de tu aplicación serverless.

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

#### Contenedores

Si utilizas contenedores Docker, tienes dos opciones: utilizar Docker o configurar tu aplicación con variables de entorno `DD_GIT_*`.

##### Opción 1: Docker

{{% sci-docker %}}

##### Opción 2: Variables de entorno `DD_GIT_*`

{{% sci-dd-git-env-variables %}}

#### Serverless

Si utilizas la opción serverless, tienes dos opciones en función de la configuración de tu aplicación serverless.

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

#### Contenedores

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

## Utilización

### Enlaces a proveedores Git y fragmentos de código

{{< tabs >}}
{{% tab "Error Tracking" %}}
En [Error Tracking][1], puedes ver los enlaces de los marcos de stack tecnológico hasta su repositorio de origen.

1. Ve a [**APM** > **Error Tracking**][2].
2. Haz clic en un problema. El panel **Issue Details** (información del incidente) aparece a la derecha.
3. En **Latest Event** (Último evento), si utilizas las integraciones GitHub o GitLab, haz clic en **Connect to preview** (Conectar para previsualizar) en los marcos de stack tecnológico. Puedes ver fragmentos de código en línea directamente en la traza de stack tecnológico. De lo contrario, puedes hacer clic en el botón **View** (Ver) a la derecha de un marco o seleccionar **View file** (Ver archivo), **View Git blame* (Ver Git blame) o **View commit** (Ver commit) para ser redirigido a tu herramienta de gestión de código fuente.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="Botón de visualización de repositorio con tres opciones (ver archivo, ver blame y ver confirmación) disponibles a la derecha de una stack trace de error en Error Tracking, junto con fragmentos de código en línea en la stack trace" style="width:100%;">}}

[1]: /es/tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

Puedes ver vistas previas del código fuente directamente en gráficas de llamas de [Continuous Profiler][1].

1. Ve a [**APM** > **Profiles** > **Explorer**][2] (APM > Perfiles > Explorador).
2. Selecciona el servicio que deseas investigar.
3. Pasa el cursor sobre un método en el gráfico de llamas.
4. Pulsa `Opt` (en macOS) o `Ctrl` (en otros sistemas operativos) para bloquear la información sobre herramientas y poder interactuar con su contenido.
5. Si se te solicita, haz clic en **Connect to preview** (Conectar para previsualizar). La primera vez que hagas esto para un repositorio, serás redirigido a GitHub para **Authorize** (Autorizar) la aplicación de Datadog.
6. Después de autorizar, la vista previa del código fuente aparece en el tooltip.
7. Haz clic en el enlace de archivo en el tooltip para abrir el archivo de código fuente completo en tu repositorio.

{{< img src="integrations/guide/source_code_integration/profiler-source-code-preview-2.png" alt="Vista previa de código fuente en el Continuous Profiler" style="width:100%;">}}

[1]: /es/profiler/
[2]: https://app.datadoghq.com/profiling/explorer
{{% /tab %}}
{{% tab "Serverless Monitoring" %}}

En **Serverless Monitoring**, puedes ver los enlaces de los errores en tus stack traces, asociadas a funciones Lambda, hasta su repositorio de origen.

1. Ve a [**Infrastructure** > **Serverless** (Infraestructura > Serverless)][101] y haz clic en la pestaña **AWS**.
2. Haz clic en una función Lambda y luego en el botón **Open Trace** (Abrir traza) para una invocación con una stack trace asociada.
3. Si utilizas las integraciones GitHub o GitLab, haz clic en **Connect to preview** (Conectar para previsualizar) en los marcos de stack tecnológico. Puedes ver fragmentos de código en línea directamente en la traza de stack tecnológico. De lo contrario, puedes hacer clic en el botón **View** (Ver) a la derecha de un marco o seleccionar **View file** (Ver archivo), **View Git blame* (Ver Git blame) o **View commit** (Ver commit) para ser redirigido a tu herramienta de gestión de código fuente.

{{< img src="integrations/guide/source_code_integration/serverless-aws-function-errors.mp4" alt="Enlace a GitHub desde Serverless Monitoring" video="true" >}}

[101]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions

{{% /tab %}}
{{% tab "Test Optimization" %}}

Puedes ver los enlaces de los tests fallidos a tu repositorio fuente en **Test Optimization**.

1. Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de test) y selecciona un test fallido.
2. Si utilizas las integraciones GitHub o GitLab, haz clic en **Connect to preview** (Conectar para previsualizar) en los marcos de stack tecnológico. Puedes ver fragmentos de código en línea directamente en la traza de stack tecnológico. De lo contrario, puedes hacer clic en el botón **View** (Ver) a la derecha de un marco o seleccionar **View file** (Ver archivo), **View Git blame* (Ver Git blame) o **View commit** (Ver commit) para ser redirigido a tu herramienta de gestión de código fuente.

{{< img src="integrations/guide/source_code_integration/test_run_blurred.png" alt="Enlace a GitHub desde CI Visibility Explorer" style="width:100%;">}}

Para obtener más información, consulta [Mejora de los flujos de trabajo de los desarrolladores con Datadog][102].

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /es/tests/developer_workflows/#open-tests-in-github-and-your-ide

{{% /tab %}}
{{% tab "Code Security" %}}

Puedes ver los enlaces de los escaneos fallidos de Static Analysis y Software Composition Analysis a tu repositorio de fuentes en **Code Security**.

1. Ve a [**Software Delivery** > **Code Security** (Entrega de software > Code Security)][101] y selecciona un repositorio.
2. En la vista **Code Vulnerabilities** (Vulnerabilidades de código) o **Code Quality** (Callidad del còdigo), haz clic en una vulnerabilidad o infracción de código. En la sección **Detalles**, si utilizas las integraciones GitHub, GitLab o Azure DevOps, haga clic en **Connect to preview** (Conectar para previsualizar). Puedes ver fragmentos de código en línea que resaltan las líneas exactas de código que desencadenaron la vulnerabilidad o infracción. De lo contrario, puedes hacer clic en el botón **View** (Ver) a la derecha de un marco o seleccionar **View file** (Ver archivo), **View Git blame* (Ver Git blame) o **View commit** (Ver commit) para ser redirigido a tu herramienta de gestión de código fuente.

{{< img src="integrations/guide/source_code_integration/code-analysis-scan.png" alt="Enlace a GitHub desde la vista Code Security Code Vulnerabilities" style="width:100%;">}}

Para más información, consulta la [Documentación sobre Code Security][102].

[101]: https://app.datadoghq.com/ci/code-analysis
[102]: /es/security/code_security/

{{% /tab %}}
{{% tab "App and API Protection Monitoring" %}}

Puedes ver los enlaces de los errores en los stack traces asociados de tus señales de seguridad a tu repositorio fuente en **App and API Protection Monitoring**.

1. Ve a [**Security** > **App and API Protection** (Seguridad > Protección de aplicaciones y API)][101] y selecciona una señal de seguridad.
2. Desplázate hasta la sección **Traces**, en la pestaña **Señales relacionadas**, y haz clic en una stack trace asociada.
3. Si utilizas las integraciones GitHub o GitLab, haz clic en **Connect to preview** (Conectar para previsualizar) en los marcos de stack tecnológico. Puedes ver fragmentos de código en línea directamente en la traza de stack tecnológico. De lo contrario, puedes hacer clic en el botón **View** (Ver) a la derecha de un marco o seleccionar **View file** (Ver archivo), **View Git blame* (Ver Git blame) o **View commit** (Ver commit) para ser redirigido a tu herramienta de gestión de código fuente.

{{< img src="integrations/guide/source_code_integration/asm-signal-trace-blur.png" alt="Enlace a GitHub desde Monitorización de la protección de aplicaciones y API" style="width:100%;">}}

[101]: https://app.datadoghq.com/security/appsec

{{% /tab %}}
{{% tab "Dynamic Instrumentation" %}}

Puedes ver los archivos de código fuente completos en [**Dynamic Instrumentation**][102] (Instrumentación dinámica) al crear o editar una instrumentación (log dinámico, métrica, tramo o etiquetas de tramo).

#### Crear nueva instrumentación

1. Ve a [**APM** > **Dynamic Instrumentation** (APM > Instrumentación dinámica)][101].
2. Selecciona **Create New Instrumentation** (Crear nueva instrumentación) y elige un servicio a instrumentar.
3. Busca y selecciona un nombre de archivo o método de código fuente.

#### Ver o editar instrumentación

1. Ve a [**APM** > **Dynamic Instrumentation** (APM > Instrumentación dinámica)][101].
2. Selecciona una instrumentación existente en la lista y haz clic en **View Events** (Ver eventos).
3. Selecciona la tarjeta de instrumentación para ver su localización en el código fuente.

{{< img src="integrations/guide/source_code_integration/dynamic-instrumentation-create-new.png" alt="Archivo de código fuente en Dynamic Instrumentation" style="width:100%;">}}

Para más información, consulta la [documentación de Dynamic Instrumentation][102].

[101]: https://app.datadoghq.com/dynamic-instrumentation/events
[102]: /es/dynamic_instrumentation/

{{% /tab %}}
{{< /tabs >}}

### Comentarios en solicitudes pull

{{< tabs >}}
{{% tab "CI Visibility" %}}
Los comentarios de solicitud pull están habilitados por defecto cuando se accede por primera vez a CI Visibility si la integración con GitHub o GitLab está instalada correctamente. Estas integraciones publican un comentario resumiendo los trabajos fallidos detectados en tu solicitud pull.

{{< img src="integrations/guide/source_code_integration/ci-visibility-pr-comment.png" alt="Comentario en solicitud pull que resume los trabajos fallidos detectados por CI Visibility" style="width:100%;">}} 

Para desactivar los comentarios en solicitudes pull para CI Visibility, ve a los [parámetros de repositorios de CI Visibility][101].

[101]: https://app.datadoghq.com/ci/settings/ci-visibility

{{% /tab %}}
{{% tab "Code Security" %}}

Los comentarios de solicitud pull están habilitados por defecto al acceder por primera vez a Code Security si la integración con GitHub, GitLab o Azure DevOps está instalada correctamente. Estas integraciones publican dos tipos de comentarios en tus solicitudes pull:

1. Un único comentario que resuma las nuevas infracciones detectadas en tu solicitud pull.

{{< img src="integrations/guide/source_code_integration/code-security-summary-pr-comment.png" alt="Comentario en solicitud pull que resume las nuevas infracciones detectadas por Code Security" style="width:100%;">}}

2. Comentarios en línea para cada infracción detectada en tu solicitud pull, colocados directamente en las líneas de código que generaron la infracción en el diff de la solicitud pull.

{{< img src="integrations/guide/source_code_integration/code-security-inline-pr-comment.png" alt="Comentario en línea de una infracción específica detectada por Code Security" style="width:100%;">}}

Para desactivar los comentarios en solicitudes pull para Code Security, ve a los [parámetros de repositorios de Code Security][101].

[101]: https://app.datadoghq.com/security/configuration/code-security/settings

{{% /tab %}}
{{% tab "Test Optimization" %}}

Los comentarios de solicitud pull están habilitados por defecto cuando se accede por primera vez a Test Optimization (optimización de tests) si la integración con GitHub o GitLab está instalada correctamente. La integración publica un comentario en el que se resumen los tests fallidos y defectuosos detectados en tu solicitud pull.

{{< img src="integrations/guide/source_code_integration/test-optimization-pr-comment.png" alt="Comentario en solicitud pull que resume los tests fallidos y defectuosos detectados por Test Optimization" style="width:100%;">}}

Para desactivar los comentarios en solicitudes pull para Test Optimization, ve a los [parámetros avanzados de repositorios de Test Optimization][101].

[101]: https://app.datadoghq.com/ci/settings/test-optimization/advanced-features

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