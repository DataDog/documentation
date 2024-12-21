---
description: Aprende a solucionar problemas comunes de Code Analysis y a interactuar
  con el servicio de asistencia.
further_reading:
- link: /code_analysis/
  tag: Documentación
  text: Más información sobre Code Analysis
- link: /code_analysis/static_analysis/
  tag: Documentación
  text: Más información sobre el análisis estático
- link: /code_analysis/software_composition_analysis/
  tag: Documentación
  text: Más información sobre Software Composition Analysis
title: Solución de problemas de Code Analysis
---

## Información general

Si tienes problemas para instalar o configurar Datadog Code Analysis, esta página te ayudará a solucionarlos. Si sigues teniendo problemas, [ponte en contacto con el servicio de asistencia de Datadog][1].

## Análisis estático

Si tienes problemas con el analizador estático de Datadog, incluye la siguiente información en un informe de errores para el servicio de asistencia y tu asesor de clientes.

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

**Si ejecutas Code Analysis en un repositorio que no es de GitHub**, asegúrate de que el primer análisis se ejecute en tu rama predeterminada (por ejemplo, un nombre de rama como 
`master`, `main`, `prod` o `production`). Después de confirmar en tu rama predeterminada, se analizan las ramas que no son predeterminadas. Siempre puedes configurar tu rama predeterminada en la aplicación en [Configuración del repositorio][4].

Si usas el analizador de Datadog, el [escaneo con reconocimiento de diferencias][6] se encuentra habilitado de manera predeterminada. Si ejecutas la herramienta en tu pipeline de CI, asegúrate de que `datadog-ci` se ejecute **en la raíz** del repositorio que se está analizando.


## Software Composition Analysis

Si tienes problemas con Datadog Software Composition Analysis, incluye la siguiente información en un informe de errores para el servicio de asistencia y tu asesor de clientes.

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

**Si ejecutas Code Analysis en un repositorio que no es de GitHub**, asegúrate de que el primer análisis se ejecute en tu rama predeterminada (por ejemplo, un nombre de rama como 
`master`, `main`, `prod` o `production`). Después de confirmar en tu rama predeterminada, se analizan las ramas que no son predeterminadas.

Siempre puedes configurar tu rama predeterminada en la aplicación en [Configuración del repositorio][4].

### No se han detectado paquetes para los proyectos de C#

Nuestro generador de SBOM, ([`osv-scanner`][7]), extrae dependencias de un archivo `packages.lock.json`. Si no tienes
este archivo, puedes actualizar la definición de tu proyecto para generarlo. Sigue estas [instrucciones para actualizar la definición de tu proyecto][9] a fin de generar un archivo `packages.lock.json`.

[`osv-scanner`][7] usa el archivo de bloqueo generado para extraer dependencias y generar un SBOM.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/code_analysis/static_analysis/github_actions
[3]: /es/code_analysis/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/ci/settings/repository
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: https://docs.datadoghq.com/es/code_analysis/static_analysis/setup/#diff-aware-scanning
[7]: https://github.com/DataDog/osv-scanner
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file