---
aliases:
- /es/code_analysis/troubleshooting/
disable_toc: false
title: Solución de problemas
---
Si tiene problemas al instalar o configurar Datadog Code Security, utilice esta página para comenzar a solucionar problemas. Si sigue teniendo problemas, [comuníquese con el soporte de Datadog][1].

## Análisis estático de código (SAST) {#static-code-analysis-sast}

Para problemas con el analizador estático de Datadog, incluya la siguiente información en un informe de errores a Datadog Support.

- Su archivo `code-security.datadog.yaml` (o el `static-analysis.datadog.yml` heredado)
- La salida de su herramienta de análisis estático (como una CLI) que se ejecuta localmente o en una canalización de CI/CD
- El archivo SARIF producido (si hay alguno disponible)
- La URL de su repositorio (público o privado)
- El nombre de la rama en la que ejecutó el análisis
- La línea de comandos exacta utilizada para ejecutar el analizador estático de Datadog

### Problemas de rendimiento {#performance-issues}

Si tiene problemas de rendimiento, puede habilitar la opción `--performance-statistics` al ejecutar la herramienta de análisis estático desde la línea de comandos.

Para problemas de rendimiento, incluya la siguiente información:

- Su archivo `code-security.datadog.yaml` (o el `static-analysis.datadog.yml` heredado)
- La salida de su herramienta de análisis estático (como una CLI) que se ejecuta localmente o en una canalización de CI/CD
- La URL de su repositorio (público o privado)

**Nota:** Si está utilizando [Static Analysis and GitHub Actions][2], establezca el parámetro [`enable_performance_statistics`][3] en true.

### Problemas de bloqueo {#blocking-issues}

Si tiene problemas no relacionados con el rendimiento o si el Analizador Estático de Datadog no finaliza, ejecute el Analizador Estático de Datadog con la opción `--debug true --performance-statistics`.

### Obtención de un error 403 al ejecutar el analizador {#getting-a-403-error-when-running-the-analyzer}

Asegúrese de que las siguientes variables estén especificadas correctamente: `DD_APP_KEY`, `DD_API_KEY` y `DD_SITE` al ejecutar el analizador y `datadog-ci`.

### Problemas con las cargas de SARIF {#issues-with-sarif-uploads}

<div class="alert alert-info">
  La importación de SARIF ha sido probada para Snyk, CodeQL, Semgrep, Checkov, Gitleaks y Sysdig. Comuníquese con <a href="/help">Datadog Support</a> si experimenta algún problema con otras herramientas compatibles con SARIF.
</div>

Al cargar resultados de herramientas de análisis estático de terceros a Datadog, asegúrese de que estén en el [Formato de intercambio de resultados de análisis estático (SARIF)][5] interoperable. Se requiere Node.js versión 14 o posterior.

Para cargar un informe SARIF, siga los pasos a continuación:

1. Asegúrese de que las variables [`DD_API_KEY` y `DD_APP_KEY` estén definidas][4].
2. Opcionalmente, establezca una [`DD_SITE` variable][24] (el valor predeterminado es `datadoghq.com`).
3. Instale la utilidad `datadog-ci`:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Ejecute la herramienta de análisis estático de terceros en su código y genere los resultados en formato SARIF.
5. Cargue los resultados en Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

Si los informes no aparecen en Datadog, defina las siguientes variables de entorno antes de invocar datadog-ci:
- `DD_GIT_REPOSITORY_URL`: URL del repositorio
- `DD_GIT_BRANCH`: rama en la que se realiza la confirmación
- `DD_GIT_COMMIT_SHA`: sha de confirmación

### Archivo SARIF demasiado grande {#sarif-file-too-large}

Estamos filtrando los archivos SARIF que son demasiado grandes. Si su código no se está analizando porque su archivo SARIF
es demasiado grande, considere las siguientes opciones:

 - Actualice su configuración para analizar solo directorios específicos.
 - Configure el analizador para ejecutar solo los conjuntos de reglas necesarios para su base de código.

Actualice la configuración a través de la aplicación de Datadog o modificando el archivo `code-security.datadog.yaml`.

### No hay comentarios de PR ni puertas de PR para cargas de SARIF de terceros {#no-pr-comments-or-pr-gates-for-third-party-sarif-uploads}

[Los comentarios de PR][25] y [las puertas de PR][26] solo son compatibles con los resultados producidos por las herramientas oficiales de análisis estático de Datadog:

- [`datadog-static-analyzer`](https://github.com/DataDog/datadog-static-analyzer)
- [`datadog-saist`](https://github.com/DataDog/datadog-saist)

Si carga resultados SARIF desde una herramienta de terceros, los hallazgos aparecen en la interfaz de usuario de Datadog pero no activan comentarios de PR ni evaluaciones de puertas de PR.

### `GLIBC_X.YY not found` mensaje de error {#glibc-xyy-not-found-error-message}

Si ejecuta el analizador estático en su canalización de CI y obtiene un mensaje de error similar a la siguiente línea:

```
version `GLIBC_X.YY' not found
```

Significa que usted está:

- ejecutando su canalización de CI con una distribución de Linux que contiene una versión antigua de glibc. En este caso, Datadog recomienda actualizar a la versión más reciente. El analizador siempre se ejecuta con la versión más reciente de sistemas basados en Ubuntu/Debian.
- ejecutando su canalización de CI con una distribución de Linux que no depende de glibc (como Alpine Linux). En su lugar,
  ejecute su canalización de CI con una distribución que admita la versión más reciente de glibc (como la versión estable de Ubuntu).

### Los servicios o equipos en el explorador de SAST o en la vista de repositorios no se están actualizando {#services-or-teams-in-the-sast-explorer-or-repositories-view-are-not-updating}

Los resultados para servicios y equipos en Análisis de código estático (SAST) se basan en los archivos `entity.datadog.yml` o `CODEOWNERS` de la rama predeterminada de su repositorio.
Si ha realizado cambios en estos archivos en una feature branch, esas actualizaciones no se reflejan en la vulnerabilidad para esa rama.

Después de actualizar cualquiera de los archivos en su rama predeterminada, pueden pasar hasta seis horas para que los cambios aparezcan en los resultados de escaneo posteriores.

### Los resultados no se muestran en la interfaz de usuario de Datadog {#results-are-not-being-surfaced-in-the-datadog-ui}

**Si está ejecutando Code Security en un repositorio que no es de GitHub**, asegúrese de que el primer análisis se ejecute en su rama predeterminada. Si su rama predeterminada no es una de `master`, `main`, `default`, `stable`, `source`, `prod` o `develop`, debe intentar una carga de SARIF para su repositorio y luego anular manualmente la rama predeterminada en la aplicación en [{{< ui >}}Repository Settings{{< /ui >}}][4]. Después, las cargas desde sus ramas que no son predeterminadas tendrán éxito.

Si está utilizando el analizador de Datadog, el [análisis con reconocimiento de diferencias (diff-aware scanning)][21] está habilitado de forma predeterminada. Si está ejecutando la herramienta dentro de su canalización de CI, asegúrese de que `datadog-ci` se ejecute **en la raíz** del repositorio que se está analizando.

### Diff-aware no funciona {#diff-aware-is-not-working}

Si diff-aware no funciona con el analizador estático (Static Analyzer), asegúrese de que:
 1. La rama predeterminada sea específica de su repositorio.
 2. Al menos una revisión con la misma configuración (por ejemplo, mismos conjuntos de reglas, mismos argumentos o indicadores de only/ignore) se haya enviado a la rama predeterminada del repositorio.
 3. El usuario actual puede leer los metadatos del repositorio. Si no tienen los permisos correctos, ejecute este comando: `git config --global --add safe.directory <repo-path>`.

También puede ejecutar datadog-static-analyzer con la opción `--debug` para obtener más información.

**Nota**: Diff-aware solo funciona en feature branches. Para obtener más información, conozca los [detalles de implementación de diff-aware][13].

## Software Composition Analysis (SCA) {#software-composition-analysis-sca}

Para problemas con Datadog Software Composition Analysis (SCA), incluya la siguiente información en un informe de error a Datadog Support.

- La salida de su herramienta SCA (como la CLI) que se ejecuta localmente o en una canalización de CI/CD
- El archivo SBOM generado (si hay alguno disponible)
- La URL de su repositorio (público o privado)
- El nombre de la rama en la que ejecutó el análisis
- La lista de archivos de dependencia en su repositorio (como `package-lock.json`, `requirements.txt` o `pom.xml`)

### Escanear directorios de JAR de Java {#scan-java-jar-directories}

Algunos proyectos de Java dependen de archivos JAR de terceros registrados en el repositorio (por ejemplo, en un directorio `lib/`) en lugar de un manifiesto completo de Maven o Gradle. Cuando su compilación extrae dependencias directamente de esos JAR, o cuando sus manifiestos de dependencia están incompletos o no están sincronizados con lo que su compilación realmente utiliza, puede escanear los archivos JAR directamente y tratarlos como la fuente.

El generador de SBOM de Datadog incluye un analizador opcional que extrae los metadatos de Maven integrados en cada JAR e informa cada artefacto detectado como un componente de Maven en el SBOM resultante. Utilice este enfoque cuando los JAR en el disco sean el registro más confiable de lo que depende su compilación. Para proyectos con manifiestos estándar de Maven o Gradle, escanee los manifiestos compatibles en su lugar; estos le brindan dependencias transitivas y coincidencias de archivos fuente que el analizador de JAR no puede proporcionar.

#### Requisitos {#requirements}

- `datadog-sbom-generator` versión `1.10.2` o posterior. Consulte la [página de versiones en GitHub][27].
- Cada JAR debe incluir metadatos de Maven en `META-INF/maven/<groupId>/<artifactId>/pom.properties`. Los JAR sin estos metadatos se omiten con una advertencia y el escaneo continúa.

Para confirmar que el analizador de JAR está disponible en su versión instalada, ejecute:

```shell
datadog-sbom-generator parsers list
```

Busque `jar` en la salida.

#### Habilite el analizador de JAR {#enable-the-jar-parser}

El analizador de JAR no forma parte del conjunto de analizadores predeterminado. Habilítelo explícitamente con `--enable-parsers jar`:

```shell
datadog-sbom-generator scan --enable-parsers jar /path/to/lib
```

Reemplace `/path/to/lib` con el directorio que contiene sus archivos JAR. El escáner recorre el directorio y lee los metadatos de cada archivo con una extensión `.jar`.

<div class="alert alert-warning"><code>--enable-parsers</code> reemplaza el conjunto de analizadores predeterminado. Para escanear JAR y manifiestos estándar en la misma ejecución, liste todos los analizadores que necesite. De lo contrario, ejecute escaneos separados.</div>

Para escanear archivos JAR y manifiestos de Maven juntos:

```shell
datadog-sbom-generator scan --enable-parsers jar,maven /path/to/repository
```

#### Suba el SBOM a Datadog {#upload-the-sbom-to-datadog}

Guarde el SBOM en un archivo y luego súbalo con `datadog-ci`:

```shell
datadog-sbom-generator scan \
    --enable-parsers jar \
    --output sbom.json \
    /path/to/lib

datadog-ci sbom upload sbom.json
```

Configure `DD_API_KEY`, `DD_APP_KEY` y `DD_SITE` en su entorno de CI antes de ejecutar la carga.

#### Cómo identifica el analizador de JAR los componentes {#how-the-jar-parser-identifies-components}

Cuando Maven empaqueta un JAR, incorpora un archivo `pom.properties` en:

```text
META-INF/maven/<groupId>/<artifactId>/pom.properties
```

El analizador lee el `groupId`, `artifactId` y `version` de ese archivo y emite un componente Maven por cada entrada detectada. Un solo JAR puede contener más de una entrada `pom.properties`; el analizador emite un componente por cada una.

Los componentes detectados de esta manera llevan dos propiedades de SBOM:

| Propiedad | Valor | Significado |
|---|---|---|
| `datadog:opaque` | `true` | El componente fue detectado a partir de un binario, no de un manifiesto de fuente. |
| `datadog:is-direct` | `true` | Cada JAR presente en el disco se trata como una dependencia directa. |

#### Limitaciones {#limitations}

El analizador de JAR es intencionalmente limitado. Úselo teniendo en cuenta estas restricciones:

- Solo se escanean los archivos con extensión `.jar`. Otros archivos basados en ZIP, incluidos `.war` y `.ear`, no se escanean.
- Los JAR sin `META-INF/maven/.../pom.properties` se omiten. Los componentes sin metadatos de Maven integrados no se reportan.
- Las dependencias transitivas no se resuelven. Cada JAR detectado se reporta como una dependencia directa.
- La coincidencia de archivos fuente no está disponible para los componentes detectados a través del analizador de JAR.

Si necesita resolución transitiva, coincidencia de fuente o un contexto de dependencia más completo, escanee los manifiestos estándar de Maven o Gradle en su lugar. El analizador de JAR es la herramienta adecuada cuando su compilación no tiene un manifiesto confiable para escanear.

### Problemas con las cargas de SBOM {#issues-with-sbom-uploads}
Aunque se recomienda el [generador de SBOM de Datadog][7], Datadog admite la ingesta de cualquier archivo SBOM. Asegúrese de que sus archivos cumplan con los formatos Cyclone-DX 1.4 o Cyclone-DX 1.5.

La ingesta de archivos SBOM está verificada para las siguientes herramientas de terceros:
- [trivy][8]

Para ingerir su archivo SBOM en Datadog, siga los pasos a continuación:

1. Instale la CLI de `datadog-ci` (requiere que Node.js esté instalado).
2. Asegúrese de que sus variables de entorno `DD_SITE`, `DD_API_KEY` y `DD_APP_KEY` estén configuradas.
3. Invoque la herramienta para cargar el archivo a Datadog.
La instalación y la invocación de la herramienta se pueden realizar usando estos dos comandos:

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SBOM file
datadog-ci sbom upload /path/to/sbom-file.json
```

### Los servicios o equipos en las bibliotecas de Software Composition Analysis no se están actualizando {#services-or-teams-in-sca-libraries-are-not-updating}

Los resultados para los servicios y equipos en Software Composition Analysis se basan en los archivos `entity.datadog.yml` o `CODEOWNERS` de la rama predeterminada de su repositorio.
Si ha realizado cambios en estos archivos en una rama de funciones, esas actualizaciones no se reflejan en los datos de vulnerabilidad o biblioteca para esa rama.

Después de actualizar cualquiera de los archivos en su rama predeterminada, pueden pasar hasta seis horas para que los cambios aparezcan en los resultados de escaneo posteriores.

### Los resultados no se muestran en la interfaz de usuario de Datadog {#results-are-not-being-surfaced-in-the-datadog-ui-1}

**Si está ejecutando Code Security en un repositorio que no es de GitHub**, asegúrese de que el primer análisis se ejecute en su rama predeterminada. Si su rama predeterminada no es una de `master`, `main`, `default`, `stable`, `source`, `prod` o `develop`, debe intentar una carga de SBOM para su repositorio y luego anular manualmente la rama predeterminada en la aplicación en [{{< ui >}}Repository Settings{{< /ui >}}][4]. Después, las cargas desde sus ramas que no son predeterminadas tendrán éxito.

### No se detectó ningún paquete para proyectos de C# {#no-package-detected-for-c-projects}

El generador de SBOM de Datadog, ([`datadog-sbom-generator`][7]), extrae las dependencias de un archivo `packages.lock.json`. Si no tiene
este archivo, puede actualizar la definición de su proyecto para generarlo. Siga estas [instrucciones para actualizar la definición de su proyecto][9] para generar un archivo `packages.lock.json`.

El archivo de bloqueo generado es utilizado por [`datadog-sbom-generator`][7] para extraer dependencias y generar un SBOM.

### No hay resultados de los análisis alojados en Datadog {#no-results-from-datadog-hosted-scans}

Los análisis de SCA alojados en Datadog **no** admiten repositorios que:

- Utilice [Git Large File Storage][18] (`git-lfs`)
- Contengan rutas de archivo no válidas o reservadas (como `/` o `\\`)
- Contengan rutas de archivo con recorrido de directorio principal (`..`)
- Contengan nombres de archivo de más de 255 caracteres

Si alguna de estas condiciones se aplica a su repositorio y no puede actualizarlo para tener en cuenta estas restricciones, [configure el análisis en una canalización de CI][19] para ejecutar SCA y cargar los resultados en Datadog.

### Bibliotecas faltantes {#missing-libraries}

Para garantizar la calidad de los datos, Datadog aplica reglas de validación durante el procesamiento de SBOM. Las bibliotecas que cumplen con cualquiera de los siguientes criterios se excluyen:

- **Versión faltante**: La biblioteca no especifica una versión.
- **Nombre no ASCII**: El nombre de la biblioteca contiene caracteres fuera del conjunto de caracteres ASCII.
- **Purl vacío**: El campo de URL del paquete (purl) falta o está en blanco.
- **Purl no válido**: La URL del paquete está presente pero no tiene un formato de purl válido.
- **Lenguaje no compatible**: La biblioteca está asociada con un lenguaje de programación que Datadog no admite.

### No se detectaron vulnerabilidades mediante Software Composition Analysis {#no-vulnerabilities-detected-by-software-composition-analysis}

Hay una serie de pasos que deben ejecutarse correctamente para que la información de vulnerabilidad aparezca en la vista [Catalog][16] {{< ui >}}Security{{< /ui >}} o en el [Vulnerabilities explorer][12]. Es importante verificar cada paso al investigar este problema.

#### Confirmar que la detección en tiempo de ejecución esté habilitada {#confirming-runtime-detection-is-enabled}

Si ha habilitado el Software Composition Analysis (SCA) en tiempo de ejecución en sus servicios, puede usar la métrica `datadog.appsec.risk_management.sca.host_instance` para verificar si se está ejecutando.

1. Vaya a {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} en Datadog.
2. Busque la métrica `datadog.appsec.risk_management.sca.host_instance`. Si la métrica no existe, entonces no hay servicios que ejecuten Runtime Software Composition Analysis (SCA). Si la métrica existe, los servicios se reportan con las etiquetas de métrica `host` y `service`.
3. Seleccione la métrica y, en la sección {{< ui >}}Tags{{< /ui >}}, busque `service` para ver qué servicios están ejecutando AAP.

Si no ve `datadog.appsec.risk_management.sca.host_instance`, consulte las [instrucciones en la aplicación][3] para confirmar que todos los pasos de la configuración inicial estén completos.

Los datos de seguridad de aplicaciones en tiempo de ejecución se envían con trazas de APM. Consulte [solución de problemas de APM][22] para [confirmar la configuración de APM][23] y verificar si hay [errores de conexión][6].

#### Confirmar que las versiones del trazador estén actualizadas {#confirm-tracer-versions-are-updated}

Consulte la documentación de configuración del producto de Seguridad de Aplicaciones para validar que está utilizando la versión correcta del SDK. Estas versiones mínimas son necesarias para comenzar a enviar datos de telemetría que incluyan información de la biblioteca.

#### Asegurar la comunicación de los datos de telemetría {#ensure-the-communication-of-telemetry-data}

Asegúrese de que la variable de entorno `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` para Node.js) esté establecida en `true`, o que la propiedad del sistema correspondiente para su lenguaje esté habilitada. Por ejemplo, en Java: `-Ddd.instrumentation.telemetry.enabled=true`.

### La remediación de Bits Code falla o produce correcciones incompletas {#bits-code-remediation-fails-or-produces-incomplete-fixes}

Bits Code requiere acceso a internet para aplicar actualizaciones de bibliotecas al corregir hallazgos de SCA. Si Bits Code no logra generar una corrección o produce un parche incompleto, confirme que su política de acceso a internet permita que Bits Code llegue a los registros de paquetes requeridos para su lenguaje (por ejemplo, `registry.npmjs.org` para JavaScript o `pypi.org` para Python). Consulte [Configurar acceso a internet][30] para obtener más información.

## Análisis de código en tiempo de ejecución (IAST) {#runtime-code-analysis-iast}

### Confirme que IAST esté habilitado {#confirm-iast-is-enabled}
Asegúrese de que la variable de entorno `DD_IAST_ENABLED` esté establecida en `true` o que la propiedad del sistema correspondiente para su lenguaje esté habilitada.

Si ha habilitado el Análisis de código en tiempo de ejecución (IAST) en sus servicios, puede usar la métrica `datadog.appsec.risk_management.iast.host_instance` para verificar si se está ejecutando.

1. Vaya a {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} en Datadog.
2. Busque la métrica `datadog.appsec.risk_management.iast.host_instance`. Si la métrica no existe, entonces no hay servicios ejecutando el Análisis de código en tiempo de ejecución (IAST). Si la métrica existe, los servicios se reportan con las etiquetas de métrica `host` y `service`.
3. Seleccione la métrica y, en la sección {{< ui >}}Tags{{< /ui >}}, busque `service` para ver qué servicios están ejecutando AAP.

Si no ve `datadog.appsec.risk_management.iast.host_instance`, consulte las [instrucciones en la aplicación][20] para confirmar que todos los pasos de la configuración inicial estén completos.

Los datos de seguridad de aplicaciones en tiempo de ejecución se envían con trazas de APM. Consulte [solución de problemas de APM][22] para [confirmar la configuración de APM][23] y verificar si hay [errores de conexión][6].

### Problemas con la instrumentación de Python y Flask {#issues-with-python-and-flask-instrumentation}
Si está ejecutando una aplicación Flask, asegúrese de llamar a la función `ddtrace_iast_flask_patch()` en el nivel superior del módulo y antes de llamar a `app.run()`. Para obtener más información, consulte la documentación de [integración de Flask][19].

## Secret Scanning {#secret-scanning}

### Un hallazgo del historial de Git sigue abierto después de que eliminé el secreto {#a-git-history-finding-is-still-open-after-i-removed-the-secret}

Después del escaneo inicial del historial de Git, los escaneos analizan solo la confirmación más reciente y no cierran los hallazgos que solo están en el historial. Reescribir el historial de Git tampoco cierra estos hallazgos. Rote o revoque la credencial expuesta con su proveedor y, luego, [silencie el hallazgo][31].

## Cómo se calculan los autores de confirmación para Code Security {#how-committers-are-calculated-for-code-security}
Un **autor de confirmación** es un colaborador activo de Git identificado por el campo `author_email` en los metadatos de la confirmación de Git.

Un autor de confirmación se cuenta para la facturación si realiza **al menos tres confirmaciones en un mes calendario** en repositorios donde Code Security está habilitado.

Varias confirmaciones con el mismo `author_email` cuentan como un solo autor de confirmación. De forma predeterminada, las confirmaciones con diferentes direcciones de correo electrónico se cuentan por separado. Para los repositorios de GitHub que cumplen con los requisitos en [Deduplicación de autores de confirmaciones en diferentes direcciones de correo electrónico](#deduplicating-committers-across-email-addresses), varios correos electrónicos que pertenecen al mismo usuario de GitHub se cuentan como un solo autor de confirmación.

### Cómo se cuentan las direcciones de correo electrónico como autores de confirmaciones {#how-email-addresses-are-counted-as-committers}
Los autores de confirmaciones se identifican según el valor normalizado de `author_email` en los metadatos de la confirmación de Git.

Las confirmaciones finalizadas por cuentas de sistema conocidas de GitHub, como `noreply@github.com` y `actions@github.com`, no se cuentan.

Las confirmaciones que usan `@users.noreply.github.com` no se excluyen automáticamente. Estas direcciones son utilizadas comúnmente por desarrolladores que eligen ocultar su correo electrónico público en GitHub. Si la confirmación puede atribuirse a un desarrollador individual, se cuenta.

Para obtener una aclaración sobre cómo se cuentan los autores de confirmaciones en su entorno, [contacte al Soporte de Datadog][1].

### Deduplicación de autores de confirmaciones en diferentes direcciones de correo electrónico {#deduplicating-committers-across-email-addresses}
En algunos casos, las confirmaciones de un solo desarrollador pueden dividirse en varios correos electrónicos de autor de Git. Por ejemplo, un desarrollador podría configurar un correo electrónico diferente con `git config user.email` en diferentes repositorios. Si más de uno de esos correos electrónicos supera el umbral de facturación de tres confirmaciones, cada uno cuenta como un autor de confirmación separado.

Para los repositorios alojados en GitHub, Datadog puede asignar cada correo electrónico de autor de Git al usuario de GitHub subyacente para que el desarrollador se cuente una vez, incluso cuando envíe cambios bajo diferentes correos electrónicos. Esto requiere una [aplicación de GitHub][28] de Datadog instalada en los repositorios afectados con el permiso `Contents: Read`.

Esta asignación está disponible solo para repositorios de GitHub. Los repositorios alojados en GitLab, Azure DevOps o Bitbucket no se desduplican.

Si su recuento de autores de confirmaciones parece más alto de lo esperado para los repositorios de GitHub, verifique que la aplicación de GitHub de Datadog esté instalada en esos repositorios con el permiso `Contents: Read`. Puede revisar su instalación desde el [mosaico de integración de GitHub][29].

## Deshabilitar las capacidades de Code Security {#disabling-code-security-capabilities}
### Deshabilitar el escaneo estático de repositorios {#disabling-static-repository-scanning}
Para deshabilitar el escaneo de Análisis de Código Estático (SAST) o Software Composition Analysis estático:
- Si está escaneando sus repositorios a través del escaneo alojado en Datadog, navegue a Code Security [{{< ui >}}Setup{{< /ui >}}][17], haga clic en {{< ui >}}Enable scanning for your repositories{{< /ui >}} y desactive los interruptores habilitados previamente para escanear todos los repositorios conectados o cada repositorio.
- Si está escaneando repositorios de código fuente a través de sus canalizaciones de CI, elimine el trabajo o los trabajos relevantes de sus canalizaciones de CI.

### Deshabilitar SCA en tiempo de ejecución en sus servicios {#disabling-runtime-sca-on-your-services}

SCA se puede habilitar en sus servicios en ejecución utilizando uno de los siguientes dos métodos:
- Desde la interfaz de usuario de Datadog.
- Manualmente, utilizando la variable de entorno `DD_APPSEC_SCA_ENABLED`.

Para deshabilitar SCA, debe utilizar el *mismo método* que utilizó para habilitar SCA.

{{< tabs >}}
{{% tab "Habilitado en la interfaz de usuario" %}}
<div class="alert alert-danger">
Si habilitó SCA a través de la <code>DD_APPSEC_SCA_ENABLED</code> variable de entorno, no puede deshabilitarlo utilizando la interfaz de usuario.
</div>

Para deshabilitar SCA a través de la interfaz de usuario, puede:

* Vaya a la [Code Security Setup page][1] y seleccione {{< ui >}}Activate runtime detection of library vulnerabilities{{< /ui >}}. En esta tabla, puede deshabilitar servicios que fueron activados previamente.

o

* Vaya a [Services][2], seleccione {{< ui >}}Software Composition Analysis (SCA){{< /ui >}}. En {{< ui >}}Coverage{{< /ui >}}, coloque el cursor sobre el icono de SCA de un servicio y luego haga clic en {{< ui >}}Deactivate{{< /ui >}}.
* Para deshabilitar Software Composition Analysis en sus servicios de forma masiva, haga clic en la casilla de verificación en el encabezado de la lista y luego, en {{< ui >}}Bulk Actions{{< /ui >}}, seleccione {{< ui >}}Deactivate Software Composition Analysis (SCA) on x services{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://app.datadoghq.com/security/code-security/inventory/services
{{% /tab %}}
{{% tab "Habilitado mediante variable de entorno" %}}
<div class="alert alert-danger">
Si habilitó SCA a través de la interfaz de usuario, no puede deshabilitarlo eliminando la <code>DD_APPSEC_SCA_ENABLED</code> variable de entorno.
</div>

* Elimine la variable de entorno `DD_APPSEC_SCA_ENABLED=true` de la configuración de su aplicación y reinicie su servicio. Esto no aplica a aplicaciones PHP.

{{% /tab %}}

{{< /tabs >}}

### Deshabilitar Análisis de código en tiempo de ejecución (IAST) {#disabling-runtime-code-analysis-iast}

Para deshabilitar IAST, elimine la variable de entorno `DD_IAST_ENABLED=true` de la configuración de su aplicación o establézcala en `false` como `DD_IAST_ENABLED=false`, y reinicie su servicio.

[1]: /es/help/
[2]: /es/security/code_security/static_analysis/github_actions
[3]: /es/security/code_security/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/source-code/repositories
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: /es/tracing/troubleshooting/connection_errors/
[7]: https://github.com/DataDog/datadog-sbom-generator
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file
[12]: https://app.datadoghq.com/security/appsec/vm/library
[13]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/diff-aware.md
[17]: https://app.datadoghq.com/security/configuration/code-security/setup
[16]: https://app.datadoghq.com/services?&lens=Security
[18]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[19]: /es/tracing/trace_collection/dd_libraries/python/
[20]: /es/security/configuration/code-security/setup?steps=iast
[21]: /es/security/code_security/static_analysis/setup/#diff-aware-scanning
[22]: /es/tracing/troubleshooting/
[23]: /es/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[24]: /es/getting_started/site/
[25]: /es/security/code_security/dev_tool_int/pull_request_comments/
[26]: /es/pr_gates/
[27]: https://github.com/DataDog/datadog-sbom-generator/releases
[28]: /es/integrations/github/
[29]: https://app.datadoghq.com/integrations/github/
[30]: /es/bits_ai/bits_code/setup/#configure-internet-access
[31]: /es/security/code_security/secret_scanning/#mute-findings