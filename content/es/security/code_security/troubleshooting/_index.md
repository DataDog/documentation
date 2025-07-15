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

**Si ejecutas Code Security en un repositorio que no es de GitHub**, asegúrate de que el primer análisis se ejecute en tu rama predeterminada (por ejemplo, un nombre de rama como 
`master`, `main`, `prod` o `production`). Después de confirmar en tu rama predeterminada, se analizan las ramas que no son predeterminadas. Siempre puedes configurar tu rama predeterminada en la aplicación en [Configuración del repositorio][4].

Si usas el analizador de Datadog, el [escaneo con reconocimiento de diferencias][6] se encuentra habilitado de manera predeterminada. Si ejecutas la herramienta en tu pipeline de CI, asegúrate de que `datadog-ci` se ejecute **en la raíz** del repositorio que se está analizando.


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
- [osv-scanner][7]
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

### Los resultados no aparecen en la interfaz de usuario de Datadog

**Si ejecutas un escaneo estático en un repositorio que no es de GitHub**, asegúrate de que el primer análisis se ejecute en tu rama predeterminada (por ejemplo, un nombre de rama como 
`master`, `main`, `prod` o `production`). Después de confirmar en tu rama predeterminada, se analizan las ramas que no son predeterminadas.

Siempre puedes configurar tu rama predeterminada en la aplicación en [Configuración del repositorio][4].

### No se han detectado paquetes para los proyectos de C#

Nuestro generador de SBOM, ([`osv-scanner`][7]), extrae dependencias de un archivo `packages.lock.json`. Si no tienes
este archivo, puedes actualizar la definición de tu proyecto para generarlo. Sigue estas [instrucciones para actualizar la definición de tu proyecto][9] a fin de generar un archivo `packages.lock.json`.

[`osv-scanner`][7] usa el archivo de bloqueo generado para extraer dependencias y generar un SBOM.

## El Análisis de composición del software no ha detectado vulnerabilidades

Hay una serie de pasos que debes ejecutar correctamente para que la información sobre las vulnerabilidades aparezca en la [vista de seguridad del catálogo de software][16] o en el [Vulnerability Explorer][12]. Al investigar este problema, es importante comprobar cada paso.

### Confirmación de que la detección en tiempo de ejecución está activada

Si has activado la detección de vulnerabilidades en tiempo de ejecución en tus servicios, puedes utilizar la métrica `datadog.apm.appsec_host` para comprobar si SCA se está ejecutando.

1. Ve a **Métricas > Resumen** en Datadog.
2. Busca la métrica `datadog.apm.appsec_host` . Si la métrica no existe, entonces no hay servicios ejecutando ASM. Si la métrica existe, los servicios se informan mediante las etiquetas (tags) de métricas `host` y `service`.
3. Selecciona la métrica y busca `service` en la sección **Etiquetas** para ver qué servicios están ejecutando ASM.

Si no ves `datadog.apm.appsec_host`, comprueba las [instrucciones en la aplicación][3] para confirmar que se han completado todos los pasos de la configuración inicial.

Los datos de seguridad de aplicaciones de tiempo de ejecución se envían con trazas de APM. Consulta [Solucionar problemas de APM][4] para [confirmar la configuración de APM][5] y comprobar si hay [errores de conexión][6].

### Confirmar que las versiones del rastreador están actualizadas

Consulte la documentación de configuración del producto Application Security para validar que está utilizando la versión correcta del rastreador. Estas versiones mínimas son necesarias para comenzar a enviar datos de telemetría que incluyan información de biblioteca.

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
- Si estás analizando repositorios de GitHub a través del análisis alojado en Datadog, ve a [**Code Security > Setup**][17] (Code Security > Configuración), haz clic en **Enable scanning for your repositories** (Activar análisis para tus repositorios) y desactiva los conmutadores activados anteriormente para analizar todos los repositorios conectados o cada repositorio.
- Si estás escaneando repositorios de código fuente a través de tus pipelines de CI, elimina los trabajos relevantes de tus pipelines de CI. 

### Desactivación de Software Composition Analysis (SCA) en tus servicios

SCA puede habilitarse en tus servicios en ejecución utilizando dos métodos: la interfaz de usuario o manualmente utilizando la variable de entorno `DD_APPSEC_SCA_ENABLED`. Cuando deshabilites SCA, debes utilizar el *mismo método* que utilizaste para habilitar SCA. 

**Nota**: Si activaste SCA manualmente, debes desactivarlo manualmente. No se puede desactivar mediante la interfaz de usuario.

Para desactivar SCA a través de la interfaz de usuario:

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
[7]: https://github.com/DataDog/osv-scanner
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file
[12]: https://app.datadoghq.com/security/appsec/vm/library
[15]: https://app.datadoghq.com/security/code-security/inventory/services
[16]: https://app.datadoghq.com/services?&lens=Security
[17]: https://app.datadoghq.com/security/configuration/code-security/setup