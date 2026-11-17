---
description: Referencia detallada de todas las herramientas disponibles en el servidor
  MCP de Datadog Code Security, incluidos parámetros, binarios requeridos y formatos
  de salida.
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: Documentación
  text: Descripción general y configuración del Datadog Code Security MCP Server
- link: /security/code_security/dev_tool_int/mcp_server/troubleshooting/
  tag: Documentación
  text: Solución de problemas del Datadog Code Security MCP Server
is_beta: true
title: Referencia de herramientas
---
El [Datadog Code Security MCP Server][1] expone las siguientes herramientas para asistentes de codificación de IA y uso de CLI. Las herramientas de escaneo envuelven uno o más binarios de seguridad de Datadog y aceptan rutas de archivo o directorios para escanear. `datadog_library_vulnerability_scan` consulta a Datadog por URL de paquete y no escanea un árbol local.

<div class="alert alert-info">Este servidor MCP es independiente del <a href="/mcp_server">Datadog MCP Server</a>, que proporciona acceso basado en la nube a las funciones y datos de Datadog. El Datadog Code Security MCP Server se ejecuta localmente y se centra en el escaneo de seguridad a nivel de código. Para consultar los hallazgos ya almacenados en Datadog, consulte <a href="/security/code_security/dev_tool_int/mcp_server/#query-findings-already-in-datadog">Consultar hallazgos ya existentes en Datadog</a>.</div>

## `datadog_code_security_scan` {#datadog-code-security-scan}

Ejecute escaneos de SAST, detección de secretos, SCA e IaC en paralelo.

`min_sast_severity` se aplica solo a la parte de SAST del escaneo. El valor predeterminado es `LOW`. Los hallazgos suprimidos en el código fuente se excluyen. Cuando algunos escáneres no están instalados, la herramienta devuelve resultados de los escáneres que tuvieron éxito y un error por cada escáner que falló.

### Parámetros {#parameters}

| Parámetro            | Tipo            | Requerido | Descripción                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   Sí    | Rutas de archivo o directorios para escanear                                                                    |
| `working_dir`        | `string`        |    No    | Directorio base para resolver rutas relativas (se establece de forma predeterminada en el directorio actual)                      |
| `min_sast_severity`  | `string`        |    No    | Gravedad mínima de SAST a devolver: `LOW`, `MEDIUM`, `HIGH` o `CRITICAL`. Predeterminado: `LOW`. Solo SAST. |

### Binarios requeridos {#required-binaries}

`datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-security-cli`, `datadog-iac-scanner`

## `datadog_sast_scan` {#datadog-sast-scan}

Ejecute Static Application Security Testing (SAST) para detectar vulnerabilidades de seguridad en el código de primera parte.

`min_sast_severity` se establece de forma predeterminada en `LOW`. Los hallazgos suprimidos en el código fuente se excluyen.

### Parámetros {#parameters-1}

| Parámetro            | Tipo            | Requerido | Descripción                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   Sí    | Rutas de archivo o directorios para escanear                                                                    |
| `working_dir`        | `string`        |    No    | Directorio base para resolver rutas relativas                                                          |
| `min_sast_severity`  | `string`        |    No    | Gravedad mínima de SAST a devolver: `LOW`, `MEDIUM`, `HIGH` o `CRITICAL`. Predeterminado: `LOW`.             |

### Binario requerido {#required-binary}

`datadog-static-analyzer`

## `datadog_secrets_scan` {#datadog-secrets-scan}

Detecta credenciales, clave de API, contraseñas y tokens codificados de forma rígida en el código fuente y en los archivos de configuración.

### Parámetros {#parameters-2}

| Parámetro     | Tipo            | Requerido | Descripción                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Sí    | Rutas de archivo o directorios para escanear           |
| `working_dir` | `string`        |    No    | Directorio base para resolver rutas relativas |

### Binario requerido {#required-binary-1}

`datadog-static-analyzer`

## `datadog_sca_scan` {#datadog-sca-scan}

Ejecute SCA para detectar vulnerabilidades conocidas (CVE) en las dependencias de su proyecto. Esta herramienta realiza un proceso de dos pasos:

1. Genera una lista de materiales de software (SBOM) a partir de los directorios especificados.
2. Analiza la SBOM en busca de vulnerabilidades conocidas utilizando la base de datos de vulnerabilidades de Datadog.

### Parámetros {#parameters-3}

| Parámetro     | Tipo            | Requerido | Descripción                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Sí    | Directorios a escanear en busca de dependencias        |
| `working_dir` | `string`        |    No    | Directorio base para resolver rutas relativas |

### Salida {#output}

Vulnerabilidades con ID de CVE, gravedad, componente afectado, versión y descripción.

### Binarios requeridos {#required-binaries-1}

`datadog-sbom-generator`, `datadog-security-cli`

## `datadog_iac_scan` {#datadog-iac-scan}

Detecte errores de configuración, problemas de cumplimiento y vulnerabilidades de seguridad en archivos de IaC.

### Parámetros {#parameters-4}

| Parámetro     | Tipo            | Requerido | Descripción                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Sí    | Directorios que contienen archivos de IaC para escanear    |
| `working_dir` | `string`        |    No    | Directorio base para resolver rutas relativas |

### Salida {#output-1}

Hallazgos de Security con gravedad, regla, ubicación del archivo y guía de remediación.

### Binario requerido {#required-binary-2}

`datadog-iac-scanner`

### Formatos de IaC compatibles {#supported-iac-formats}

- Terraform
- CloudFormation
- Manifiestos de Kubernetes
- Dockerfiles
- GitHub Actions

## `datadog_generate_sbom` {#datadog-generate-sbom}

Genere una SBOM integral que liste todos los componentes de software, dependencias, versiones y licencias en un repositorio.

### Parámetros {#parameters-5}

| Parámetro     | Tipo     | Requerido | Descripción                                                                |
| ------------- | -------- | :------: | -------------------------------------------------------------------------- |
| `path`        | `string` |    No    | Ruta al repositorio o directorio a analizar (el valor predeterminado es el directorio actual) |
| `working_dir` | `string` |    No    | Directorio base para el escaneo (el valor predeterminado es el directorio actual)                |

### Salida {#output-2}

JSON que contiene un resumen (total de componentes, desglose por lenguaje/gestor de paquetes, estadísticas de licencias) y una lista detallada de componentes (nombre, versión, tipo, licencia, URL del paquete).

### Gestores de paquetes compatibles {#supported-package-managers}

| Lenguaje   | Gestores de paquetes                          |
| ---------- | ----------------------------------------- |
| .NET       | NuGet                                     |
| C++        | Conan                                     |
| Go         | Módulos de Go                                |
| Java       | Gradle, Maven                             |
| JavaScript | npm, pnpm, Yarn                            |
| PHP        | Composer                                  |
| Python     | pdm, pipenv, poetry, requirements.txt, uv |
| Ruby       | Bundler                                   |
| Rust       | Cargo                                     |

<div class="alert alert-info">Si el repositorio utiliza un gestor de paquetes no listado anteriormente, o si la herramienta devuelve cero componentes, el asistente de IA puede generar un SBOM leyendo archivos de bloqueo (lock files)<code>package.json</code>, <code>requirements.txt</code>, <code>go.mod</code>, <code>pom.xml</code>, <code>Gemfile.lock</code>, <code>Cargo.lock</code>, <code>composer.lock</code>, y archivos similares) y extrayendo las dependencias directamente.</div>

## `datadog_library_vulnerability_scan` {#datadog-library-vulnerability-scan}

Busque vulnerabilidades conocidas para bibliotecas específicas mediante la URL del paquete (PURL). Esta herramienta llama a la Datadog API y no escanea una base de código local. Utilice [`datadog_sca_scan`](#datadog_sca_scan) cuando desee escanear un árbol de proyecto.

Requiere `DD_API_KEY` y `DD_APP_KEY`.

### Parámetros {#parameters-6}

| Parámetro     | Tipo            | Requerido | Descripción                                                                 |
| ------------- | --------------- | :------: | --------------------------------------------------------------------------- |
| `libraries`   | `array[object]` |   Sí    | Bibliotecas a escanear. Cada objeto utiliza los campos de la siguiente tabla.         |
| `working_dir` | `string`        |    No    | Directorio de trabajo para la detección del contexto de Git (el valor predeterminado es el directorio actual) |

Cada entrada en `libraries`:

| Campo             | Tipo      | Requerido | Descripción                                                      |
| ----------------- | --------- | :------: | ---------------------------------------------------------------- |
| `purl`            | `string`  |   Sí    | URL del paquete, por ejemplo `pkg:maven/com.cronutils/cron-utils@9.1.2` |
| `is_direct`       | `boolean` |    No    | Si se trata de una dependencia directa                              |
| `is_dev`          | `boolean` |    No    | Si se trata de una dependencia solo para desarrollo                    |
| `package_manager` | `string`  |    No    | Gestor de paquetes, por ejemplo `MAVEN`, `NPM` o `GOLANG`         |

### Salida {#output-3}

Vulnerabilidades con ID de CVE, ID de GHSA, gravedad, puntuación CVSS, biblioteca afectada, solución, versiones de corrección y existencia de exploits.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/dev_tool_int/mcp_server/