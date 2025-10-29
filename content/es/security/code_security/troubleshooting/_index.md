---
aliases:
- /es/code_analysis/troubleshooting/
disable_toc: false
title: Resolución de problemas
---

Si tienes problemas para instalar o configurar Datadog Code Security, esta página te ayudará a solucionarlos. Si sigues teniendo problemas, [ponte en contacto con el servicio de asistencia de Datadog][1].

## Static Code Analysis (SAST)

En caso de problemas con el analizador estático de Datadog, incluye la siguiente información en un informe de errores dirigido al servicio de asistencia de Datadog.

- Tu archivo `static-analysis.datadog.yml`
- La salida de tu herramienta de análisis estático (como una CLI) que se ejecuta de manera local o en un pipeline de CI/CD
- El archivo SARIF producido (si hay alguno disponible)
- La URL de tu repositorio (público o privado)
- El nombre de la rama en la que ejecutaste el análisis
- La línea de comandos exacta que se usó para ejecutar el analizador estático de Datadog

### Problemas de rendimiento

Si tienes problemas de rendimiento, puedes habilitar la marca `--performance-statistics` al ejecutar la herramienta de análisis estático desde la línea de comandos.

En caso de problemas de rendimiento, incluye la siguiente información:

- Tu archivo `static-analysis.datadog.yml`
- La salida de tu herramienta de análisis estático (como una CLI) que se ejecuta de manera local o en un pipeline de CI/CD
- La URL de tu repositorio (público o privado)

**Nota:** Si usas el [análisis estático y GitHub Actions][2], establece el parámetro [`enable_performance_statistics`][3] en verdadero.

### Problemas de bloqueo

Si experimentas problemas que no tienen que ver con el rendimiento o si no se puede salir del analizador estático de Datadog, ejecútalo con la marca `--debug true --performance-statistics`.

### Aparece el error 403 al ejecutar el analizador

Asegúrate de que las siguientes variables se hayan especificado de manera correcta: `DD_APP_KEY`, `DD_API_KEY` y `DD_SITE` al ejecutar el analizador y `datadog-ci`.

### Problemas con las cargas de SARIF

<div class="alert alert-info">
  Se ha realizado un test de la importación de SARIF para Snyk, CodeQL, Semgrep, Checkov, Gitleaks y Sysdig. Ponte en contacto con el <a href="/help">servicio de asistencia de Datadog</a> si tienes algún problema con otras herramientas compatibles con SARIF.
</div>

Al cargar resultados de herramientas de análisis estático de terceros a Datadog, asegúrate de que estén en el formato interoperable [Static Analysis Results Interchange Format (SARIF)][5]. Se requiere la versión 14 o posterior de Node.js.

Para cargar un informe SARIF, sigue los pasos que se indican a continuación:

1. Asegúrate de que [se hayan definido las variables `DD_API_KEY` y `DD_APP_KEY`][4].
2. De manera opcional, establece una [variable `DD_SITE`][7] (el valor predeterminado es `datadoghq.com`).
3. Instala la utilidad `datadog-ci`:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Ejecuta la herramienta de análisis estático de terceros en tu código y genera los resultados en formato SARIF.
5. Carga los resultados en Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

Si faltan informes en Datadog, define las siguientes variables de entorno antes de invocar datadog-ci:
- `DD_GIT_REPOSITORY_URL`: URL del repositorio
- `DD_GIT_BRANCH`: rama comprometida
- `DD_GIT_COMMIT_SHA`: hash de commit

### Archivo SARIF demasiado grande

Estamos filtrando los archivos SARIF demasiado grandes. Si tu código no se analiza porque tu archivo SARIF
es demasiado grande, considera las siguientes opciones:

 - Actualiza tu configuración para analizar sólo directorios específicos.
 - Configura el analizador para que ejecute sólo los conjuntos de reglas necesarios para tu código base.

La actualización de la configuración se realiza en la aplicación Datadog o mediante el archivo `static-analysis.datadog.yml`.

### Mensaje de error `GLIBC_X.YY not found`

Si ejecutas el analizador estático en tu pipeline de CI y recibes un mensaje de error similar a la siguiente línea:

```
version `GLIBC_X.YY' not found
```

Significa que:

- Estás ejecutando tu pipeline de CI con una distribución de Linux que contiene una versión antigua de glibc. En este caso, Datadog recomienda actualizar a la última versión. El analizador siempre se ejecuta con la última versión de los sistemas basados ​​en Ubuntu/Debian.
- Estás ejecutando tu pipeline de CI con una distribución de Linux que no depende de glibc (como Alpine Linux).
  En su lugar, ejecuta tu pipeline de CI con una distribución que admita la última versión de glibc (como la versión estable de Ubuntu).

### Los resultados no aparecen en la interfaz de usuario de Datadog

**Si estás ejecutando Code Security en un repositorio que no es de GitHub**, asegúrate de que el primer análisis se ejecuta en tu rama predeterminada. Si tu rama predeterminada no es una de las siguientes: `master`, `main`, `default`, `stable`, `source (fuente)`, `prod` o `develop`, debes intentar una carga de SARIF para tu repositorio y luego anular manualmente la rama por defecto en la aplicación en [Configuración del repositorio][4]. Luego, las cargas desde tus ramas no predeterminadas tendrán éxito.

Si usas el analizador de Datadog, el [escaneo con reconocimiento de diferencias][6] se encuentra habilitado de manera predeterminada. Si ejecutas la herramienta en tu pipeline de CI, asegúrate de que `datadog-ci` se ejecute **en la raíz** del repositorio que se está analizando.

### La diferenciación no funciona

Si la diferenciación no funciona con Static Analyzer, asegúrate de que:
 1. La rama predeterminada es específica de tu repositorio.
 2. Al menos una revisión con la misma configuración (por ejemplo, los mismos conjuntos de reglas, los mismos argumentos, o los marcadores sólo/ignorar) fue enviada a la rama predeterminada del repositorio.
 3. El usuario actual puede leer los metadatos del repositorio. Si no tienes los permisos adecuados, ejecuta este comando: `git config --global --add safe.directory <repo-path>`.

También puedes ejecutar datadog-static-analyzer con la opción `--debug` para obtener más información.

**Nota**: El diferenciado sólo funciona en ramas de funciones. Para obtener más información, consulta los [detalles de implementación del diferenciado][13].

## Software Composition Analysis

En caso de problemas con Datadog Software Composition Analysis (SCA), incluye la siguiente información en un informe de errores para el servicio de asistencia de Datadog.

- La salida de tu herramienta de SCA (como una CLI) que se ejecuta de manera local o en un pipeline de CI/CD
- El archivo SBOM producido (si hay alguno disponible)
- La URL de tu repositorio (público o privado)
- El nombre de la rama en la que ejecutaste el análisis
- La lista de los archivos de dependencia en tu repositorio (como `package-lock.json`, `requirements.txt` o `pom.xml`)

### Problemas con las cargas de SBOM
Si bien se recomienda el [generador de SBOM de Datadog][7], Datadog admite la ingesta de cualquier archivo SBOM. Asegúrate de que tus archivos cumplan con los formatos Cyclone-DX 1.4 o Cyclone-DX 1.5.

La ingesta de archivos SBOM se verifica mediante las siguientes herramientas de terceros:
- [trivy][8]

Para ingerir tu archivo SBOM en Datadog, sigue los siguientes pasos:

1. Instala la CLI `datadog-ci` (requiere que Node.js esté instalado).
2. Asegúrate de que se hayan establecido las variables de entorno `DD_SITE`, `DD_API_KEY` y `DD_APP_KEY`.
3. Invoca la herramienta para cargar el archivo a Datadog.
La instalación e invocación de la herramienta se pueden realizar mediante estos dos comandos:
```bash
# Instala datadog-ci
npm install -g @datadog/datadog-ci

# Carga el archivo SBOM
datadog-ci sbom upload /path/to/sbom-file.json
```

### Los servicios o equipos de las bibliotecas de SCA no se actualizan

Los resultados de los servicios y equipos en SCA se basan en los archivos `entity.datadog.yml` o `CODEOWNERS` de la rama predeterminada de tu repositorio.
Si realizaste cambios en estos archivos en una rama de funciones, esas actualizaciones no se reflejan en los datos de vulnerabilidades o de librerías de esa rama.

Después de actualizar cualquiera de estos archivos en tu rama predeterminada, los cambios pueden tardar hasta seis horas en aparecer en los resultados de los análisis posteriores.

### Los resultados no aparecen en la interfaz de usuario de Datadog

**Si estás ejecutando Code Security en un repositorio que no es de GitHub**, asegúrate de que el primer análisis se ejecuta en tu rama predeterminada. Si tu rama predeterminada no es una de las siguientes: `master`, `main`, `default`, `stable`, `source`, `prod` o `develop`, debes intentar una carga de SARIF para tu repositorio y luego anular manualmente la rama por defecto en la aplicación en [Configuración del repositorio][4]. Luego, las cargas desde tus ramas no predeterminadas tendrán éxito.

### No se detectó ningún paquete de proyectos de C#

El generador de SBOM Datadog, ([`datadog-sbom-generator`][7]), extrae las dependencias de un archivo `packages.lock.json`. Si no dispones de
este archivo, puedes actualizar tu definición de proyecto para generarlo. Sigue estas [instrucciones para actualizar su definición de proyecto][9] para generar un archivo `packages.lock.json`.

El archivo de bloqueo generado es utilizado por [`datadog-sbom-generator`][7] para extraer dependencias y generar un SBOM.

### No hay resultados de los análisis alojados en Datadog

Los análisis SCA alojados en Datadog **no** admiten repositorios que:

- Utilizan el [almacenamiento de archivos grandes de Git][18] (`git-lfs`)
- Contienen rutas de archivo no válidas o reservadas (como `/` o `\\`)
- Contienen rutas de archivos con transversal de directorio principal (`..`)
- Contienen nombres de archivo de más de 255 caracteres

Si alguna de estas condiciones se aplica a tu repositorio y no puedes actualizar tu repositorio para tener en cuenta estas restricciones, [configura el análisis en un pipeline CI][19] para ejecutar SCA y cargar los resultados en Datadog.

### Bibliotecas faltantes

Para garantizar la calidad de los datos, Datadog aplica reglas de validación durante el procesamiento de SBOM. Se excluyen las bibliotecas que cumplen alguno de los siguientes criterios:

- **Versión faltante**: La librería no especifica una versión.
- **Nombre no ASCII**: El nombre de la librería contiene caracteres fuera del conjunto de caracteres ASCII.
- **pURL vacía**: El campo URL del paquete (purl) falta o está en blanco.
- **URL no válida**: La URL del paquete está presente pero no en un formato purl válido.
- **Lenguaje no compatible**: La librería está asociada a un lenguaje de programación que Datadog no admite.

## El Análisis de composición del software no ha detectado vulnerabilidades

Hay una serie de pasos que debes ejecutar correctamente para que la información sobre las vulnerabilidades aparezca en la vista de **Seguridad** del [Catálogo de software][16] o en el [Explorador de vulnerabilidades][12]. Al investigar este problema, es importante comprobar cada paso.

### Confirmación de que la detección en tiempo de ejecución está activada

Si has activado la detección de vulnerabilidades en tiempo de ejecución en tus servicios, puedes utilizar la métrica `datadog.apm.appsec_host` para comprobar si SCA se está ejecutando.

1. Ve a **Métricas > Resumen** en Datadog.
2. Busca la métrica `datadog.apm.appsec_host` . Si la métrica no existe, entonces no hay servicios ejecutando AAP. Si la métrica existe, los servicios se informan mediante las etiquetas de métricas `host` y `service`.
3. Selecciona la métrica y busca `service` en la sección **Etiquetas** para ver qué servicios están ejecutando AAP.

Si no ves `datadog.apm.appsec_host`, comprueba las [instrucciones en la aplicación][3] para confirmar que se han completado todos los pasos de la configuración inicial.

Los datos de seguridad de aplicaciones de tiempo de ejecución se envían con trazas de APM. Consulta [Solucionar problemas de APM][4] para [confirmar la configuración de APM][5] y comprobar si hay [errores de conexión][6].

### Confirmar que las versiones del rastreador están actualizadas

Consulte la documentación de configuración del producto Application Security para validar que está utilizando la versión correcta del rastreador. Estas versiones mínimas son necesarias para comenzar a enviar datos de telemetría que incluyan información de librería.

### Garantizar la comunicación de los datos de telemetría

Asegúrate de que la variable de entorno `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` para Node.js) está configurada como `true` o que la propiedad del sistema correspondiente a tu lenguaje está habilitada. Por ejemplo, en Java: `-Ddd.instrumentation.telemetry.enabled=true`

## Runtime Code Analysis (IAST)

### Confirmar que IAST está habilidado
Asegúrate de que la variable de entorno `DD_IAST_ENABLED` está configurada como `true` o que la propiedad del sistema correspondiente a tu lenguaje está habilitada.

### Problemas con la instrumentación de Python y Flask
Si estás ejecutando una aplicación Flask, asegúrate de que estás llamando a la función `ddtrace_iast_flask_patch()` en el nivel superior del módulo, antes de llamar a `app.run()`. Para obtener más información, consulta la [documentación de la integración de Flask][17].

## Desactivación de las funciones de Code Security
### Desactivación del escaneo estático de repositorios
Para desactivar Static Code Analysis (SAST) o el análisis estático de composición de software:
- Si estás analizando repositorios de GitHub a través del análisis alojado en Datadog, ve a [**Code Security > Configuración**][17], haz clic en **Enable scanning for your repositories** (Activar análisis para tus repositorios) y desactiva los conmutadores activados anteriormente para analizar todos los repositorios conectados o cada repositorio.
- Si estás analizando repositorios de código fuente a través de tus pipelines CI, elimina los trabajos relevantes de tus pipelines CI.

### Desactivación de SCA en tiempo de ejecución en tus servicios

SCA puede habilitarse en tus servicios en ejecución utilizando uno de los dos métodos siguientes:
- En la interfaz de usuario Datadog.
- Manualmente, utilizando la variable de entorno `DD_APPSEC_SCA_ENABLED`.

Para desactivar SCA, debes utilizar el *mismo método* que utilizaste para activarlo.

**Nota**: Si activaste SCA manualmente, debes desactivarlo manualmente. No se puede desactivar mediante la interfaz de usuario.

Para desactivar SCA a través de la interfaz de usuario, puedes:

* Ve a la [página de Code Security][17] y selecciona **Activar detección en tiempo de ejecución de vulnerabilidades de librerías**. En esta tabla, puedes desactivar los servicios previamente activados.

o

* Ve a [Services][15] (Servicios), selecciona **Software Composition Analysis (SCA)**. En **Coverage** (Cobertura), pasa el ratón sobre el icono de SCA del servicio y, luego, haz clic en **Deactivate** (Desactivar).
* Para deshabilitar Software Composition Analysis en tus servicios masivos, haz clic en la casilla de verificación del encabezado de la lista y, a continuación, en **Bulk Actions** (Acciones en bloque), selecciona **Deactivate Software Composition Analysis (SCA) on x services** (Desactivar Software Composition Analysis (SCA) x servicios).

Para desactivar SCA manualmente:

* Elimina la variable de entorno `DD_APPSEC_SCA_ENABLED=true` de tu configuración de aplicación y reinicia tu servicio. Esto no se aplica a las aplicaciones PHP.

### Desactivación de Runtime Code Analysis (IAST)

Para desactivar IAST, elimina la variable de entorno `DD_IAST_ENABLED=true` de tu configuración de aplicación o configúrala en `false` como `DD_IAST_ENABLED=false`, y reinicia tu servicio.

[1]: /es/help/
[2]: /es/security/code_security/static_analysis/github_actions
[3]: /es/security/code_security/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/source-code/repositories
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: https://docs.datadoghq.com/es/security/code_security/static_analysis/setup/#diff-aware-scanning
[7]: https://github.com/DataDog/datadog-sbom-generator
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file
[12]: https://app.datadoghq.com/security/appsec/vm/library
[13]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/diff-aware.md
[15]: https://app.datadoghq.com/security/code-security/inventory/services
[16]: https://app.datadoghq.com/services?&lens=Security
[17]: https://app.datadoghq.com/security/configuration/code-security/setup
[18]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[19]: https://docs.datadoghq.com/es/security/code_security/software_composition_analysis/setup_static/?tab=datadog#running-options
