---
algolia:
  tags:
  - análisis estático
  - reglas de static analysis
  - tests de seguridad de aplicaciones estáticas
  - SAST
aliases:
- /es/continuous_integration/static_analysis
- /es/static_analysis
description: Obtén información acerca de Datadog Static Code Analysis para analizar
  el código en busca de problemas de calidad y vulnerabilidades de seguridad antes
  de que tu código llegue a producción.
is_beta: false
title: Configurar Static Code Analysis (SAST)
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Seguridad del código no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Información general
Para configurar Datadog SCA en la aplicación, navega a [**Security** > **Code Security**][1] (Seguridad > Seguridad del código).

## Selecciona dónde deseas ejecutar los escaneos de Static Code Analysis

### Análisis con escaneos alojados por Datadog

Para repositorios de GitHub, puedes ejecutar escaneos de Datadog Static Code Analysis directamente en la infraestructura de Datadog. Para comenzar, navega a la [página **Code Security** (Seguridad del código)][1].

### Escaneo en pipelines de CI
Datadog Static Code Analysis se ejecuta en tus pipelines mediante la [CLI de `datadog-ci`][8].

Primero, configura tu API de Datadog y claves de aplicación. Añade `DD_APP_KEY` y `DD_API_KEY` como secretos. Asegúrate que tu clave de aplicación de Datadog tiene el alcance `code_analysis_read`.

A continuación, ejecuta Static Code Analysis siguiendo las instrucciones para tu proveedor de CI elegido a continuación.

{{< whatsnext desc="Consulta las instrucciones según tu proveedor de CI:">}}
    {{< nextlink href="security/code_security/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/github_actions" >}}Acciones de GitHub{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/generic_ci_providers" >}}Proveedores de CI genéricos{{< /nextlink >}}
{{< /whatsnext >}}

## Selecciona tu proveedor de gestión de código fuente
Datadog Static Code Analysis admite todos los proveedores de gestión del código fuente, con compatibilidad nativa con GitHub.
### Configura la integración de GitHub 
Si GitHub es tu proveedor de gestión de código fuente, debes configurar una aplicación de GitHub mediante el [cuadro de integración de GitHub][9], configurar la [integración de código fuente][10] para ver los fragmentos de código en línea y habilitar los [comentarios de solicitud pull][11].

Al instalar una aplicación de GitHub, se requieren los siguientes permisos para habilitar ciertas características:

- `Content: Read`, te permite ver fragmentos de código que se muestran en Datadog
- `Pull Request: Read & Write`, permite que Datadog añada comentarios sobre las violaciones directamente en tus solicitudes pull mediante [comentarios en solicitudes pull][11], además de solicitudes pull abiertas para [corregir vulnerabilidades][12]

### Otros proveedores de gestión de código fuente
Si estás utilizando otro proveedor de gestión de código fuente, configura Static Code Analysis para ejecutarse en tus pipelines de CI mediante la herramienta de la CLI de `datadog-ci` y [carga los resultados](#upload-third-party-static-analysis-results-to-datadog) en Datadog.
**Debes** ejecutar un análisis de tu repositorio en la rama predeterminada antes de que los resultados puedan aparecer en la página **Code Security** (Seguridad del código).

## Personaliza tu configuración
Por defecto, Datadog Static Code Analysis analiza tus repositorios con los [conjuntos de reglas de Datadog][6] para tus lenguajes de programación. Para personalizar qué conjuntos de reglas deseas aplicar y dónde, añade un archivo `static-analysis.datadog.yml` al **directorio raíz** de tu repositorio.

Puedes incluir las siguientes opciones **globales** en el archivo `static-analysis.datadog.yml`:

| Nombre               | Descripción                                                                                | Obligatorio | Predeterminado |
|--------------------|--------------------------------------------------------------------------------------------|----------|---------|
| `rulesets`         | Una lista de nombres y configuraciones de conjuntos de reglas. [Ver todos los conjuntos de reglas disponibles][6].              | `true`   |         |
| `ignore`           | Una lista de prefijos de ruta y patrones glob a ignorar. Los archivos coincidentes no se analizarán.  | `false`  |         |
| `only`             | Una lista de prefijos de ruta y patrones glob a analizar. Solo los archivos coindentes se analizarán.| `false`  |         |
| `ignore-gitignore` | No utilices rutas mencionadas en el archivo `.gitignore` para omitir el análisis en ciertos archivos.        | `false`  | `false` |
| `max-file-size-kb` | Ignora archivos más grandes que el tamaño especificado (en unidades kB).                                    | `false`  | `200`   |

Puedes incluir las siguientes opciones del **conjunto de reglas** en el archivo `static-analysis.datadog.yml`:

| Nombre               | Descripción                                                                                                          | Obligatorio |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `rules`            | Una lista de configuraciones de regla para las reglas que pertenecen al conjunto de reglas.                                                        | `false`  |
| `ignore`           | Una lista de prefijos de ruta y patrones glob a ignorar en este conjunto de reglas específico. Los archivos coincidentes no se analizarán  | `false`  |
| `only`             | Una lista de prefijos de ruta y patrones glob a analizar en este conjunto de reglas específico. Solo los archivos coincidentes se analizarán.| `false`  |

Puedes incluir las siguientes opciones del **conjunto de reglas** en el archivo `static-analysis.datadog.yml`:

| Nombre               | Descripción                                                                                                          | Obligatorio |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `ignore`           | Una lista de prefijos de ruta y patrones glob a ignorar para esta regla específica. Los archivos coincidentes no se analizarán.     | `false`  |
| `only`             | Una lista de prefijos de ruta y patrones glob a analizar para esta regla específica. Solo se analizarán los archivos coincidentes.   | `false`  |
| `arguments`        | Un mapa de los valores para las reglas que admiten argumentos personalizables.                                                       | `false`  |

El mapa en el campo `arguments` utiliza un nombre de argumento como su clave, y los valores son cadenas o mapas:

* Para establecer un valor para todo el repositorio, puedes especificarlo como una cadena.
* Para establecer diferentes valores para diferentes subárboles en el repositorio, puedes especificarlos como un para desde un prefijo de subárbol hasta el valor que tendrá el argumento dentro de ese subárbol.

La estructura completa del archivo `static-analysis.datadog.yml` es la siguiente:

```yaml
rulesets:
  - ruleset-name
  - ruleset-name:
    # Only apply this ruleset to the following paths/files
    only:
      - "path/example"
      - "**/*.file"
    # Do not apply this ruleset in the following paths/files
    ignore:
      - "path/example"
      - "**/*.file"
  - ruleset-name:
    rules:
      rule-name:
        # Only apply this rule to the following paths/files
        only:
          - "path/example"
          - "**/*.file"
        # Do not apply this rule to the following paths/files
        ignore:
          - "path/example"
          - "**/*.file"
        arguments:
          # Set the rule's argument to value.
          argument-name: value
      rule-name:
        arguments:
          # Set different argument values in different subtrees
          argument-name:
            # Set the rule's argument to value_1 by default (root path of the repo)
            /: value_1
            # Set the rule's argument to value_2 for specific paths
            path/example: value_2
# Only analyze any ruleset in the following paths/files
only:
  - "path/example"
  - "**/*.file"
# Do not analyze any ruleset in the following paths/files
ignore:
  - "path/example"
  - "**/*.file"
```

Ejemplo de archivo de configuración:

```yaml
rulesets:
  - python-best-practices
  - python-security
  - python-code-style:
    rules:
      max-function-lines:
        # Do not apply the rule max-function-lines to the following files
        ignore:
          - "src/main/util/process.py"
          - "src/main/util/datetime.py"
        arguments:
          # Set the max-function-lines rule's threshold to 150 lines
          max-lines: 150
      max-class-lines:
        arguments:
          # Set different thresholds for the max-class-lines rule in different subtrees
          max-lines:
            # Set the rule's threshold to 200 lines by default (root path of the repo)
            /: 200
            # Set the rule's threshold to 100 lines in src/main/backend
            src/main/backend: 100
  - python-inclusive
  - python-django:
    # Only apply the python-django ruleset to the following paths
    only:
      - "src/main/backend"
      - "src/main/django"
    # Do not apply the python-django ruleset in files matching the following pattern
    ignore:
      - "src/main/backend/util/*.py"
# Only analyze source files
only:
  - "src/main"
  - "src/tests"
  - "**/*.py"
# Do not analyze third-party or generated files
ignore:
  - "lib/third_party"
  - "**/*.generated.py"
  - "**/*.pb.py"
```

### Ignorar violaciones
#### Ignorar un repositorio
Añade una regla ignore (ignorar) en tu archivo `static-analysis.datadog.yml`. El ejemplo a continuación ignora la regla `javascript-express/reduce-server-fingerprinting` de todos los directorios.

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "**"
```

#### Ignorar un archivo o directorio
Añade una regla ignore (ignorar) en tu archivo `static-analysis.datadog.yml`. El ejemplo a continuación ignora la regla `javascript-express/reduce-server-fingerprinting` para este archivo. Para obtener más información sobre cómo ignorar por ruta, consulta la sección [Personalizar tu configuración](#customize-your-configuration).

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "ad-server/src/app.js"
```

#### Ignorar una instancia específica 

Para ignorar una instancia de violación específica, comenta `no-dd-sa` sobre la línea de código a ignorar. Esto impide que la línea genere una violación. Por ejemplo, en el fragmento de código de Python, la línea `foo = 1` será ignorada por los análisis de Static Code Analysis.

```python
#no-dd-sa
foo = 1
bar = 2
```

También puedes usar `no-dd-sa` para ignorar solo una regla específica en lugar de ignorar todas las reglas. Para hacerlo, especifica el nombre de la regla que deseas ignorar en el lugar de `<rule-name>` usando esta plantilla: 

`no-dd-sa:<rule-name>`

Por ejemplo, en el siguiente fragmento de código de JavaScript, la línea `my_foo = 1` es analizada por todas las reglas excepto por la regla `javascript-code-style/assignment-name`, que indica al desarrollador usar [camelCase][6] en lugar de [snake_case][7].

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

## Vincular resultados a los servicios y equipos de Datadog
### Vincular resultados a servicios
Datadog asocia el código estático y los resultados de escaneo de biblioteca con los servicios pertinentes mediante los siguientes mecanismos:

1. [Identificación de la localización del código asociado con un servicio mediante el Catálogo de software.](#identifying-the-code-location-in-the-software-catalog)
2. [Detección de patrones de uso de archivos en los productos adicionales de Datadog.](#detecting-file-usage-patterns)
3. [Búsqueda del nombre de servicio en la ruta del archivo o el repositorio.](#detecting-service-name-in-paths-and-repository-names)

Si un método es exitoso, no se realizan otros intentos de asignación. Cada método de asignación se detalla a continuación.

#### Identificación de la localización del código en el Catálogo de software

El [esquema versión `v3`][14] y posteriores del Catálogo de software te permite añadir la asignación de tu localización de código para tu servicio. La sección `codeLocations` especifica la localización del repositorio que contiene el código y sus rutas asociadas.

El atributo `paths` es una lista de globs que deben unir rutas en el repositorio.

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

Datadog detecta el uso de archivos en productos adicionales como Error Tracking y archivos asociados
con el servicio de tiempo de ejecución. Por ejemplo, si un servicio llamado `foo` tiene
una entrada de log o un stack trace que contiene un archivo con una ruta `/modules/foo/bar.py`,
asocia los archivos `/modules/foo/bar.py` al servicio `foo`.

#### Detección de nombres de servicio en rutas y nombres de repositorio

Datadog detecta nombres de servicio en rutas y nombres de repositorio y asocia el archivo con el servicio si se obtiene una coincidencia.

Para una coincidencia de repositorio, si hay un servicio llamado `myservice` y
la URL del repositorio es `https://github.com/myorganization/myservice.git`, entonces,
asocia `myservice` a todos los archivos en el repositorio.

Si no hay una coincidencia de repositorio, Datadog intenta encontrar una coincidencia en la
`path` del archivo. Si hay un servicio llamado `myservice` y la ruta es `/path/to/myservice/foo.py`, el archivo está asociado con `myservice` porque el nombre de servicio es parte de la ruta. Si hay dos servicios presentes
en la ruta, se selecciona el nombre de servicio más cercano al nombre de archivo.


### Vincular resultados a equipos

Datadog asocia automáticamente el equipo adjunto a un servicio cuando se detecta una violación o una vulnerabilidad. Por ejemplo, si el archivo `domains/ecommerce/apps/myservice/foo.py`
está asociado con `myservice`, entonces el equipo `myservice` se asociará a cualquier violación
detectada en este archivo.

Si no se encuentran otros servicios o equipos, Datadog utiliza el archivo `CODEOWNERS` en tu repositorio. El archivo `CODEOWNERS` determina qué equipo posee un archivo en tu proveedor de Git. 

**Nota**: Debes asignar correctamente tus equipos de proveedor de Git a tus [equipos de Datadog][10] para que esta característica funcione de forma adecuada.

## Escaneo consciente de las diferencias

El escaneo consciente de las diferencias permite que el analizador estático de Datadog solo escanee los archivos modificados por una confirmación en una rama de características. Acelera ampliamente el tiempo de escaneo porque no ejecuta el análisis en cada archivo del repositorio en cada escaneo. Para habilitar el escaneo consciente de las diferencias en tu pipeline de CI, sigue estos pasos:

1. Asegúrate de que las variables `DD_APP_KEY`, `DD_SITE` y `DD_API_KEY` estén configuradas en tu pipeline de CI.
2. Añade una llamada a `datadog-ci git-metadata upload` antes de invocar al analizador estático. Este comando asegura que los metadatos de Git estén disponibles para el backend de Datadog. Los metadatos de Git son necesarios para calcular el número de archivos a analizar.
3. Asegúrate de que se invoque a datadog-static-analyzer con el indicador `--diff-aware`.

Ejemplo de una secuencia de comandos (estos comandos deben invocarse en tu repositorio de Git):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Nota:** Cuando un escaneo consciente de las diferencias no puede completarse, se escanea el directorio completo.

## Carga los resultados de análisis estático de terceros en Datadog

<div class="alert alert-info">
  La importación de SARIF ha sido probada para Snyk, CodeQL, Semgrep, Checkov, Gitleaks y Sysdig. Contacta con el <a href="/help">servicio de asistencia de Datadog</a> si tienes algún problema con otras herramientas compatibles con SARIF.
</div>

Puedes enviar resultados de herramientas de análisis estático de terceros a Datadog, siempre que estén en el formato interoperable [Static Analysis Results Interchange Format (SARIF)][2]. Se requiere Node.js versión 14 o posterior.

Para cargar un informe en SARIF:

1. Asegúrate de que [se hayan definido las variables `DD_API_KEY` y `DD_APP_KEY`][4].
2. Opcionalmente, establece una [variable `DD_SITE`][7] (por defecto es `datadoghq.com`).
3. Instala la utilidad `datadog-ci`:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Ejecuta la herramienta de análisis estático de terceros en tu código y genera los resultados en formato SARIF.
5. Carga los resultados en Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

<!-- ## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /es/developers/ide_plugins/idea/#static-analysis
[4]: /es/account_management/api-app-keys/
[6]: /es/security/code_security/static_analysis/static_analysis_rules
[7]: /es/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /es/integrations/guide/source-code-integration
[11]: /es/security/code_security/dev_tool_int/github_pull_requests
[12]: /es/security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[14]: https://docs.datadoghq.com/es/software_catalog/service_definitions/v3-0/