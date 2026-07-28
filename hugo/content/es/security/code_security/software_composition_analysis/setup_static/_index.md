---
aliases:
- /es/code_analysis/software_composition_analysis/generic_ci_providers/
- /es/code_analysis/software_composition_analysis/github_actions/
- /es/code_analysis/software_composition_analysis/setup/
description: Obtén información sobre Datadog Software Composition Analysis para escanear
  tus bibliotecas de código abierto importadas en busca de vulnerabilidades de seguridad
  conocidas antes de enviarlas a producción.
disable_toc: false
title: Configurar SCA en tus repositorios
---
## Información general
SCA puede analizar archivos de gestión de dependencias en tus repositorios para detectar de forma estática bibliotecas de código abierto utilizadas en tu código base. SCA admite el análisis de librerías en los siguientes lenguajes y archivos de bloqueo:

| Gestor de paquetes | Archivo de bloqueo                                 |
|-----------------|------------------------------------------|
| C# (.NET)       | `packages.lock.json`                     |
| Go (mod)        | `go.mod`                                 |
| JVM (Gradle)    | `gradle.lockfile`                        |
| JVM (Maven)     | `pom.xml`                                |
| Node.js (npm)   | `package-lock.json`                      |
| Node.js (pnpm)  | `pnpm-lock.yaml`                         |
| Node.js (hilo)  | `yarn.lock`                              |
| PHP (compositor)  | `composer.lock`                          |
| Python (pip)    | `requirements.txt`, `Pipfile.lock`       |
| Python (poetry) | `poetry.lock`                            |
| Ruby (bundler)  | `Gemfile.lock`                           |

Para configurar Datadog Static Code Analysis en la aplicación, ve a [**Seguridad** > **Code Security**][1].

## Seleccionar dónde realizar análisis estáticos de SCA

### Analizar utilizando el análisis alojado en Datadog
Para los repositorios de GitHub, puedes ejecutar análisis de SCA en Datadog directamente en la infraestructura de Datadog'. Para empezar, ve a la página [**Code Security**][1].

### Analizar en pipelines CI
En primer lugar, configura tus claves de API y aplicación Datadog añadiendo `DD_APP_KEY` y `DD_API_KEY` como secretos. Asegúrate de que tu clave de aplicación Datadog tiene el contexto `code_analysis_read`.

A continuación, ejecuta SCA siguiendo las instrucciones del proveedor de CI que hayas elegido.

## GitHub Actions
SCA puede ejecutarse como una tarea en tus flujos de trabajo de GitHub Actions. La acción que se proporciona a continuación invoca [Datadog osv-scanner][10], nuestro generador de SBOM recomendado, en tu código base, y carga los resultados en Datadog.

Añade el siguiente fragmento de código en `.github/workflows/datadog-sca.yml`. Asegúrate de sustituir
el atributo `dd_site` por el [sitio Datadog][12] que estés utilizando.

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: "datadoghq.com"
```

<!-- ### Generación de inventarios de librería

La acción de GitHub genera un inventario de librerías automáticamente, basándose en las bibliotecas declaradas en tu repositorio.

La acción de GitHub funciona para los siguientes lenguajes y archivos:

 - JavaScript/TypeScript: `package-lock.json` y `yarn.lock`
 - Python: `requirements.txt` (con versión definida) y `poetry.lock`
 - Java: `pom.xml`
 - C#
 - Ruby
 - ... y más lenguajes -->

### Acciones de GitHub relacionadas
[Datadog Static Code Analysis (SAST)][5] analiza tu código de origen. Static Code Analysis puede configurarse mediante la acción [`datadog-static-analyzer-github-action`][13] de GitHub.


## Proveedores de CI genéricos
Si no utilizas GitHub Actions, puedes ejecutar la CLI [datadog-ci][14] directamente en tu plataforma de pipelines CI  y cargar tu SBOM en Datadog.

Requisitos previos:

- descomprimir
- Node.js v14 o posterior

Configura las siguientes variables de entorno:

| Nombre         | Descripción                                                                                                                | Obligatorio | Valor predeterminado         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Tu clave de API Datadog. Esta clave la crea tu [organización Datadog][6] y debe guardarse como secreto.            | Sí      |                 |
| `DD_APP_KEY` | Tu clave de aplicación Datadog. Esta clave, creada por tu [organización Datadog][6], debe incluir el contexto `code_analysis_read` y almacenarse como secreto.    | Sí      |                 |
| `DD_SITE`    | El [sitio Datadog][12] al que enviar la información. Tu sitio Datadog es {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

Proporciona las siguientes entradas:

| Nombre           | Descripción                                                                                                                | Obligatorio | Valor predeterminado         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | El nombre del servicio utilizado para etiquetar los resultados.                                                                           | Sí      |                 |
| `env`          | El entorno utilizado para etiquetar los resultados. `ci` es un valor útil para esta entrada.                                           | No       | `none`          |
| `subdirectory` | La ruta del subdirectorio al que debe limitarse el análisis. La ruta es relativa al directorio raíz del repositorio.                  | No       |                 |

```bash
# Set the Datadog site to send information to
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog OSV Scanner:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# Install OSV Scanner
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
unzip /osv-scanner/osv-scanner.zip -d /osv-scanner
chmod 755 /osv-scanner/osv-scanner

# Run OSV Scanner and scan your dependencies
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Upload results to Datadog
datadog-ci sbom upload /tmp/sbom.json
```

## Seleccionar tu proveedor de gestión de código fuente
Datadog SCA admite todos los proveedores de gestión de código fuente, con compatibilidad nativa con GitHub.
### Configurar la integración de GitHub
Si GitHub es tu proveedor de gestión de código fuente, debes configurar la aplicación GitHub utilizando el [cuadro de la integración GitHub][7] y debes configurar la [integración del código fuente][8] para ver fragmentos de código en línea y habilitar [comentarios en las solicitudes de extracción][9].

Al instalar una aplicación GitHub, se requieren los siguientes permisos para habilitar determinadas funciones:

- `Content: Read`que permite ver fragmentos de código en Datadog.
- `Pull Request: Read & Write`que permite a Datadog añadir comentarios sobre infracciones directamente en tus solicitudes de extracción mediante [comentarios en las solicitudes de extracción][9].

### Otros proveedores de gestión de código fuente
Si estás utilizando otro proveedor de gestión de código fuente, configura SCA para que se ejecute en tus pipelines CI utilizando la herramienta CLI `datadog-ci` y [carga los resultados][8] en Datadog.
**Debes** ejecutar un análisis de tu repositorio en la rama por defecto antes de que los resultados puedan empezar a aparecer en la página **Code Security**.

## Vincular resultados a servicios y equipos de Datadog
### Vincular resultados a servicios
Datadog asocia el código estático y los resultados del análisis de la librería con los de servicios mediante los siguientes mecanismos:

1. [Identificación de la localización del código asociado a un servicio mediante el Catálogo de software](#identifying-the-code-location-in-the-software-catalog)
2. [Detección de patrones de uso de archivos en productos adicionales de Datadog.](#detecting-file-usage-patterns)
3. [Búsqueda del nombre del servicio en la ruta del archivo o el repositorio](#detecting-service-name-in-paths-and-repository-names)

Si un método tiene éxito, no se realizan más intentos de asignación. A continuación se detalla cada método de asignación.

#### Identificación de la localización del código en el Catálogo de software

La [versión del esquema `v3`][15] y posteriores del Catálogo de software te permiten añadir la asignación del código de localización de tu servicio. La sección `codeLocations` especifica la localización del repositorio que contiene el código y sus rutas asociadas.

El atributo `paths` es una lista de globs que deben coincidir con las rutas del repositorio.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}


#### Detección de patrones de uso de archivos

Datadog detecta el uso de archivos en productos adicionales como Error Tracking y asocia
archivos al servicio de tiempo de ejecución. Por ejemplo, si un servicio llamado `foo` tiene
una entrada de log o una traza (trace) de stack tecnológico que contiene un archivo con una ruta `/modules/foo/bar.py`,
se asocian los archivos `/modules/foo/bar.py` al servicio `foo`.

#### Detección de nombres de servicios en rutas y nombres de repositorios

Datadog detecta nombres de servicios en rutas y nombres de repositorios y asocia el archivo al servicio, si se encuentra una coincidencia.

Para una coincidencia de repositorios, si existe un servicio llamado `myservice` y
la URL del repositorio es `https://github.com/myorganization/myservice.git`,
se asocia `myservice` a todos los archivos del repositorio.

Si no se encuentra ninguna coincidencia en el repositorio, Datadog intenta encontrar una coincidencia en la
`path` del archivo. Si hay un servicio llamado `myservice` y la ruta es `/path/to/myservice/foo.py`, el archivo se asocia a `myservice` porque el nombre servicio forma parte de la ruta. Si hay dos servicios
en la ruta, se selecciona el nombre de servicio más cercano al nombre del archivo.


### Vincular resultados a equipos

Datadog asocia automáticamente el equipo adjunto a un servicio cuando se detecta una infracción o vulnerabilidad. Por ejemplo, si el archivo `domains/ecommerce/apps/myservice/foo.py`
está asociado a `myservice`, entonces el equipo `myservice` se asociará a cualquier infracción
detectada en este archivo.

Si no se encuentran servicios o equipos, Datadog utiliza el archivo `CODEOWNERS` de tu repositorio. El archivo `CODEOWNERS` determina a qué equipo pertenece un archivo en tu proveedor Git.

**Nota**: Para que esta característica funcione correctamente, debes asignar con precisión tus equipos de proveedores Git a tus [equipos de Datadog][16].

[1]: /es/security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: /es/security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /es/getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /es/account_management/api-app-keys/
[7]: /es/integrations/github
[8]: /es/integrations/guide/source-code-integration
[9]: /es/security/code_security/dev_tool_int/github_pull_requests/
[10]: https://github.com/DataDog/osv-scanner
[11]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[12]: /es/getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action
[14]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sbom
[15]: https://docs.datadoghq.com/es/software_catalog/service_definitions/v3-0/
[16]: https://docs.datadoghq.com/es/account_management/teams/
