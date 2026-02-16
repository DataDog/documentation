---
algolia:
  tags:
  - code analysis
  - datadog code analysis
  - pipeline ci code analysis
  - pipelines ci code analysis
aliases:
- /es/code_analysis/faq
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-analysis/
  tag: Blog
  text: Enviar código seguro y de alta calidad más rápidamente con Datadog Code Analysis
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: Blog
  text: Mitigar las vulnerabilidades de las bibliotecas de terceros con Datadog Software
    Composition Analysis
- link: /code_analysis/
  tag: Documentación
  text: Más información sobre Code Analysis
- link: /security/application_security/software_composition_analysis
  tag: Documentación
  text: Más información sobre Software Composition Analysis
title: Empezando con Code Analysis
---

## Información general

[Datadog Code Analysis][1] te permite identificar y solucionar problemas de calidad del código y vulnerabilidades de seguridad antes de desplegarlo en producción, garantizando un código seguro y limpio durante todo el ciclo de vida de desarrollo del software.

{{< img src="/code_analysis/repositories.png" alt="Botón de disponibilidad de Session Replay y opciones de visualización" style="width:100%" >}}

Code Analysis ofrece un completo conjunto de herramientas, entre ellas [Static Analysis][2] y [Software Composition Analysis][3], para mejorar la entrega global de software.

* Static Analysis (SAST) analiza tus repositorios en busca de problemas de calidad y seguridad en el código de origen y sugiere correcciones para evitar que estos problemas afecten a la producción.
* Software Composition Analysis (SCA) analiza tu código base en busca de librerías de código abierto importadas, ayudándote a gestionar tus dependencias y a proteger tus aplicaciones frente a amenazas externas.

Al utilizar [`datadog-ci`][5], puedes integrar los análisis de otros proveedores en tu flujo de trabajo de desarrollo, lo que te permite enviar resultados de Static Analysis y SCA directamente a Datadog. Puedes acceder a los últimos resultados de análisis de cada repositorio en la página [**Repositorios**][6] para monitorizar de forma efectiva y mejorar el estado del código en todas las ramas.

## Configurar Code Analysis

Puedes configurar Code Analysis para ejecutar análisis de código directamente en Datadog o de códigos que se ejecutan en tus pipelines CI. Para empezar, ve a [**Entrega de software** > **Code Analysis** > **Repositorios**][6] y haz clic en **+ Add a Repository** (Añadir un repositorio).

{{< tabs >}}
{{% tab "Datadog alojado" %}}

Con los análisis alojados en Datadog, tu código se analiza en la infraestructura de Datadog, en lugar de en tu pipeline CI. Datadog lee tu código, ejecuta el analizador estático para realizar análisis de Static Analysis o Software Composition Analysis, y carga los resultados.

El uso de análisis alojados en Datadog elimina la necesidad de configurar un pipeline CI para poder utilizar Code Analysis.

Habilita Code Analysis en tus repositorios de GitHub para cada cuenta de GitHub que hayas añadido, configurando la [integración GitHub][101].

{{< img src="/code_analysis/setup/enable_account.png" alt="Botón de disponibilidad de Session Replay y opciones de visualización" style="width:100%" >}}

Puedes activar Software Composition Analysis (SCA) para buscar vulnerabilidades, problemas de licencias y riesgos de la cadena de suministro en tus bibliotecas de código abierto en todos los repositorios o puedes activar SCA para repositorios individuales, en el panel lateral **Repositorios**.

{{< img src="/code_analysis/setup/enable_repository.png" alt="Botón de disponibilidad de Session Replay y opciones de visualización" style="width:100%" >}}

[101]: /es/integrations/github/

{{% /tab %}}
{{% tab "In Pipelines CI" %}}

Selecciona entre los siguientes tipos de análisis que quieres ejecutar en tu repositorio.

* [Static Analysis][101]: Examina tu código en busca de malas prácticas y vulnerabilidades.
* [Software Composition Analysis][102]: Analiza tus bibliotecas de terceros en busca de vulnerabilidades.

Selecciona un proveedor de gestión de código fuente (SCM) como [GitHub](#github) u [otro proveedor](#other-providers).

### GitHub

Si utilizas un repositorio de GitHub, puedes configurar la [integración GitHub][103] y conectar tu repositorio para habilitar los análisis de Static Analysis y Software Composition Analysis.

{{< img src="/getting_started/code_analysis/github_accounts.png" alt="Haz clic en el botón Connect Repositories (Conectar repositorios) de tu cuenta de GitHub." style="width:100%" >}}

Los comentarios en las [solicitudes pull de GitHub][105] están habilitados por defecto. Haz clic en **Connect Repositories** (Conectar repositorios) en la página de configuración de Code Analysis y pasa el cursor sobre el marcador "Falta", en la columna Permisos de solicitudes pull, para ver qué permisos necesitas actualizar para tu cuenta.

{{< img src="/getting_started/code_analysis/missing_permissions.png" alt="Pasa el cursor sobre la píldora faltante para ver qué permisos necesitas actualizar en cada repositorio." style="width:100%" >}}

Para desactivar esta función, ve a la página [**Configuración de Code Analysis**][106] y haz clic en el conmutador de la columna Comentarios de GitHub.

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="Haz clic en el conmutador de la columna Comentarios de GitHub para activar o desactivar Code Analysis en el repositorio de GitHub conectado." style="width:100%" >}}

### Otros proveedores

Para otros proveedores, puedes ejecutar la CLI de Datadog directamente en la plataforma de tu pipeline CI. Para obtener más información, consulta [Proveedores de CI genéricos para Static Analysis][107] y [Proveedores de CI genéricos para Software Composition Analysis][108].

Debes [ejecutar un análisis de tu repositorio](#run-code-analysis-in-your-ci-provider) en la rama por defecto para que los resultados empiecen a aparecer en la página [**Repositorios**][109].

## Ejecutar Code Analysis en tu proveedor de CI

Para cargar resultados en Datadog, asegúrate de que dispones de [una clave de API y una clave de aplicación Datadog][110].

### Acción de GitHub

Puedes configurar una acción de GitHub para ejecutar un análisis de Static Analysis y Software Composition Analysis como parte de tus flujos de trabajo CI.

Crea un archivo `.github/workflows/datadog-static-analysis.yml` en tu repositorio con el siguiente contenido:

```yaml
on: [push]

name: Datadog Static Analysis

jobs:
  static-analysis:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
    - name: Checkout
      uses: actions/checkout@v6
    - name: Check code meets quality and security standards
      id: datadog-static-analysis
      uses: DataDog/datadog-static-analyzer-github-action@v3
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: datadoghq.com
        cpu_count: 2
```

A continuación, crea un archivo `.github/workflows/datadog-sca.yml` en tu repositorio con el siguiente contenido:

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v6
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: datadoghq.com
```

### Script personalizable

Puedes cargar un informe SARIF con los resultados de Static Analysis o un informe SBOM con los resultados de Software Composition Analysis en Datadog utilizando el [paquete NPM datadog-ci][111].

#### Análisis estático

Para cargar informes de Static Analysis en Datadog, debes instalar Unzip y Node.js versión 14 o posterior.

Añade el siguiente contenido a la configuración de tu pipeline CI:

```shell
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip

curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# Upload results
datadog-ci sarif upload /tmp/report.sarif
```

#### Software Composition Analysis

Para cargar informes de Static Analysis en Datadog, debes instalar Trivy y Node.js versión 14 o posterior.

Añade el siguiente contenido a la configuración de tu pipeline CI:

```shell
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog OSV Scanner:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# Install OSV Scanner
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
cd /osv-scanner && unzip osv-scanner.zip
chmod 755 /osv-scanner/osv-scanner

# Output OSC Scanner results
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Upload results
datadog-ci sbom upload /tmp/sbom.json
```

Una vez que hayas configurado estos scripts, ejecuta un análisis de tu repositorio en la rama por defecto. Los resultados empezarán a aparecer en la página **Repositorios**.

[101]: /es/code_analysis/static_analysis
[102]: /es/code_analysis/software_composition_analysis
[103]: /es/integrations/github
[104]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
[105]: /es/code_analysis/github_pull_requests
[106]: https://app.datadoghq.com/ci/settings/code-analysis
[107]: /es/code_analysis/static_analysis/generic_ci_providers
[108]: /es/code_analysis/software_composition_analysis/generic_ci_providers
[109]: https://app.datadoghq.com/ci/code-analysis
[110]: /es/account_management/api-app-keys/
[111]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{< /tabs >}}

## Ejecutar Static Analysis en un IDE

Instala los [complementos IDE Datadog][7] para ejecutar análisis de Static Analysis localmente y ver los resultados directamente en su editor de código. Puedes detectar y solucionar problemas como problemas de mantenimiento, errores o vulnerabilidades de seguridad en el código antes de confirmar los cambios.

Para empezar a ejecutar análisis de Static Analysis en tu IDE, consulta la documentación correspondiente al editor de código elegido.

{{< partial name="code_analysis/ide-plugins.html" >}}

</br>


## Habilitar los comentarios de Code Analysis en solicitudes pull de GitHub

Puedes integrar Code Analysis con las solicitudes pull de GitHub para señalar automáticamente las infracciones del código y mejorar la calidad del código en el proceso de revisión.

{{< img src="/getting_started/code_analysis/github_suggestion.png" alt="Sugerencia de Code Analysis en una solicitud pull de GitHub" style="width:100%" >}}

Una vez configurado, Code Analysis comenta directamente la solicitud pull, indicando las infracciones con detalles como el nombre, el ID, la gravedad y las correcciones sugeridas, que puedes aplicar directamente desde la interfaz de usuario de GitHub.

Después de añadir los [archivos de configuración apropiados][10] a tu repositorio, crea una [aplicación GitHub][11] en Datadog (una nueva aplicación o la actualización de una existente). Asegúrate de que tienes acceso de lectura y escritura a las solicitudes pull.

Una vez que hayas configurado tu aplicación, ve a la página **Configuración de Code Analysis** y haz clic en el conmutador de la columna **Comentarios de GitHub** de cada repositorio.

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="Conmutadores en cada repositorio para habilitar o deshabilitar comentarios de Code Analysis en solicitudes pull de GitHub" style="width:100%" >}}

Para obtener más información, consulta [Solicitudes pull de GitHub][12].

## Buscar y gestionar repositorios

Haz clic en un repositorio en la página [**Repositorios**][6] para acceder a una vista más detallada, donde puedes personalizar la consulta de búsqueda por rama (aparece primero la rama por defecto) y por confirmación (empieza por la más reciente).

{{< img src="/getting_started/code_analysis/sca_vulnerabilities.png" alt="Vista de Vulnerabilidades de librerías en los resultados de Code Analysis de la rama por defecto del repositorio y la confirmación más reciente" style="width:100%" >}}

{{< tabs >}}
{{% tab "Static Analysis" %}}

Puedes utilizar las siguientes facetas predefinidas para crear una consulta de búsqueda a fin de identificar y solucionar malas prácticas de codificación, en la pestaña **Calidad del código**, o riesgos de seguridad, en la pestaña **Vulnerabilidades de código**.

| Nombre de la faceta                        | Descripción                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Estado del resultado                     | Filtra los resultados en función del estado de finalización del análisis.         |
| ID de regla                           | Normas específicas que activaron los hallazgos.                             |
| Nombre de la herramienta                         | Determina qué herramientas contribuyeron al análisis.                     |
| CWE (Common Weakness Enumeration) | Filtra los resultados por categorías de vulnerabilidad reconocidas.                |
| Tiene correcciones                         | Filtra los problemas para los que existen correcciones sugeridas.                 |
| Mensaje de resultado                    | Contiene descripciones concisas o mensajes asociados a los resultados. |
| Descripción de la regla                  | Contiene la justificación de cada regla.                                |
| Fuente de origen                       | Contiene los archivos en los que se detectaron problemas.                          |
| Versión de la herramienta                      | Filtra los resultados por la versión de las herramientas utilizadas.                       |

Puedes acceder a las correcciones sugeridas directamente desde los resultados para mejorar las prácticas de calidad del código y tratar las vulnerabilidades de seguridad.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="Corrección de código sugerida en la pestaña Correcciones de un resultado de Code Analysis" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

Puedes utilizar las siguientes facetas predefinidas para crear una consulta de búsqueda a fin de identificar y tratar los riesgos de seguridad en bibliotecas de terceros en la pestaña **Vulnerabilidades de librerías** o revisar tu inventario de librerías en la pestaña **Catálogo de librerías**.

| Nombre de la faceta         | Descripción                                                    |
|--------------------|----------------------------------------------------------------|
| Nombre de la dependencia    | Identifica las bibliotecas por sus nombres.                              |
| Versión de la dependencia | Filtros por versiones específicas de librerías.                     |
| Lenguaje           | Ordena bibliotecas por el lenguaje de programación.                   |
| Puntuación              | Ordena la puntuación de riesgo o calidad de las dependencias.           |
| Gravedad           | Filtra las vulnerabilidades en función de su gravedad.        |
| Plataforma           | Distingue bibliotecas por la plataforma a la que van destinadas. |

Puedes acceder a los informes sobre vulnerabilidades y localizar los archivos fuente en los que se detectó la vulnerabilidad en tus proyectos, junto con información sobre los propietarios de código del archivo.

{{< img src="/getting_started/code_analysis/sci_vulnerabilities.png" alt="Enlace al código fuente en GitHub desde una vulnerabilidad detectada en una biblioteca" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Explorar resultados en el Catálogo de servicios

Investiga las infracciones de código asociadas a tus servicios y las infracciones de código identificadas en Static Analysis para solucionar ralentizaciones y fallos. Ve a [**Gestión de servicios** > **Servicios** > **Catálogo de servicios**][13] y haz clic en la vista **Delivery** (Entrega) para analizar el estado de preproducción de tus servicios.

{{< img src="/getting_started/code_analysis/catalog_view.png" alt="Enlace al código fuente en GitHub desde una vulnerabilidad detectada en una biblioteca" style="width:100%" >}}

Haz clic en el servicio para acceder a la información de los pipelines CI desde Pipeline Visibility y también a las vulnerabilidades de seguridad y los problemas de calidad del código desde Code Analysis en la pestaña **Delivery** (Entrega) del panel lateral.

{{< img src="/getting_started/code_analysis/catalog_service.png" alt="Enlace al código fuente en GitHub desde una vulnerabilidad detectada en una biblioteca" style="width:100%" >}}

### Vinculación de servicios con infracciones del código y bibliotecas

Datadog asocia las infracciones del código o las bibliotecas a servicios pertinentes mediante los siguientes mecanismos:

1. [Identificación de la localización del código asociado a un servicio mediante el Catálogo de servicios.](#identifying-the-code-location-in-the-service-catalog)
2. [Detección de patrones de uso de archivos en productos adicionales de Datadog.](#detecting-file-usage-patterns)
3. [Búsqueda del nombre del servicio en la ruta del archivo o el repositorio](#detecting-service-name-in-paths-and-repository-names)

Si un método tiene éxito, no se realizan más intentos de asignación. A continuación se detalla cada método de asignación.

#### Identificación de la localización del código en el Catálogo de servicios

La versión del esquema `v3` y posteriores del Catálogo de servicios te permiten añadir la asignación de la localización de tu código a tu servicio. La sección `codeLocations` especifica la localización del repositorio que contiene el código y sus rutas asociadas.

El atributo `paths` es una lista de [globs][14]
que debe coincidir con las rutas del repositorio.

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

Si no se encuentra ninguna coincidencia de repositorios, Datadog intenta encontrar una coincidencia en la
`path` del archivo. Si existe un servicio llamado `myservice` y la ruta es `/path/to/myservice/foo.py`, el archivo se asocia a `myservice` ya que el nombre del servicio forma parte de la ruta. Si hay dos servicios presentes
en la ruta, se selecciona el nombre del servicio más cercano al nombre del archivo.


### Vinculación de los equipos a las infracciones del código y las bibliotecas

Datadog asocia automáticamente el equipo adjunto a un servicio cuando se detecta una infracción del código o un problema en una biblioteca. Por ejemplo, si el archivo `domains/ecommerce/apps/myservice/foo.py`
está asociado a `myservice`, entonces el equipo `myservice` se asociará a cualquier infracción
detectada en este archivo.

Si no se encuentra ningún servicio o equipo, Datadog utiliza el [archivo][15] `CODEOWNERS`
de tu repositorio. El archivo `CODEOWNERS` determina a qué equipo pertenece un archivo en tu proveedor Git.

**Nota**: Para que esta característica funcione correctamente, debes asignar con precisión tus equipos de proveedores Git a tus [equipos de Datadog][16].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/code_analysis/
[2]: /es/code_analysis/static_analysis
[3]: /es/code_analysis/software_composition_analysis
[4]: /es/security/application_security/software_composition_analysis
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /es/code_analysis/ide_plugins
[9]: https://app.datadoghq.com/dash/integration/31166/software-delivery---static-analysis-overview
[10]: /es/code_analysis/static_analysis/github_actions/
[11]: /es/code_analysis/github_pull_requests/#update-an-existing-github-app
[12]: /es/code_analysis/github_pull_requests
[13]: https://app.datadoghq.com/services
[14]: https://en.wikipedia.org/wiki/Glob_(programming)
[15]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[16]: /es/account_management/teams/
