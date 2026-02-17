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
- /es/security/code_security/static_analysis/circleci_orbs/
description: Obtén información acerca de Datadog Static Code Analysis para analizar
  el código en busca de problemas de calidad y vulnerabilidades de seguridad antes
  de que tu código llegue a producción.
is_beta: false
title: Configurar Static Code Analysis (SAST)
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security no está disponible en el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Información general
Para configurar Datadog SAST en la aplicación, ve a [**Seguridad** > **Code Security**][1].

## Seleccionar dónde realizar análisis de Static Code Analysis

### Analizar utilizando análisis alojados en Datadog

En repositorios GitHub, puedes ejecutar análisis de Datadog Static Code Analysis directamente en la infraestructura de Datadog. Para empezar, ve a la [página de **Code Security**][1].

### Analizar en pipelines CI
Datadog Static Code Analysis se ejecuta en tus pipelines CI utilizando la [CLI `datadog-ci`][8].

Primero, configura tu API y tus claves de aplicación Datadog. Añade `DD_APP_KEY` y `DD_API_KEY` como secretos. Asegúrate de que tu clave de aplicación Datadog tiene el contexto `code_analysis_read`.

Luego, ejecuta Static Code Analysis siguiendo las instrucciones de tu proveedor de CI elegido a continuación.

{{< whatsnext desc="Consulta las instrucciones en función de tu proveedor de CI:">}}
    {{< nextlink href="security/code_security/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/generic_ci_providers" >}}Proveedores de CI genéricos{{< /nextlink >}}
{{< /whatsnext >}}

## Seleccionar tu proveedor de gestión de código fuente
Datadog Static Code Analysis admite todos los proveedores de gestión de código fuente, con compatibilidad nativa para GitHub, GitLab y Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

Si GitHub es tu proveedor de gestión de código fuente, debes configurar una aplicación GitHub utilizando el [cuadro de la integración GitHub][1] y la [integración del código fuente][2] para ver fragmentos de código en línea y habilitar los [comentarios en las solicitudes pull][3].

Al instalar una aplicación GitHub, se requieren los siguientes permisos para habilitar ciertas funciones:

- `Content: Read`, que te permite ver fragmentos de código en Datadog
- `Pull Request: Read & Write`, que permite a Datadog añadir información sobre infracciones directamente en tus solicitudes pull utilizando [comentarios en las solicitudes pull][3], así como abrir solicitudes pull para [corregir vulnerabilidades][4]
- `Checks: Read & Write`, que te permite crear checks de infracciones SAST para bloquear las solicitudes pull

[1]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /es/integrations/guide/source-code-integration
[3]: /es/security/code_security/dev_tool_int/github_pull_requests
[4]: /es/security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

<div class="alert alert-danger">
Los repositorios de instancias GitLab son compatibles en Vista previa cerrada. <a href="https://www.datadoghq.com/product-preview/gitlab-source-code-integration/">Únete a la Vista previa</a>.
</div>

Si GitLab es tu proveedor de gestión de código fuente, antes de comenzar la instalación, debes solicitar acceso a la Vista previa cerrada utilizando el formulario anterior. Una vez concedido el acceso, sigue [estas instrucciones][1] para completar el proceso de instalación.

[1]: https://github.com/DataDog/gitlab-integration-setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

<div class="alert alert-danger">
Los repositorios de Azure DevOps son compatibles con la Vista previa cerrada. Tus organizaciones Azure DevOps deben estar conectadas a un inquilino de Microsoft Entra. <a href="https://www.datadoghq.com/product-preview/azure-devops-integration-code-security/">Únete a la Vista previa</a>.
</div>

Si Azure DevOps es tu proveedor de gestión de código fuente, antes de comenzar la instalación, debes solicitar acceso a la vista previa cerrada utilizando el formulario anterior. Una vez concedido el acceso, sigue las siguientes instrucciones para completar el proceso de configuración.

**Nota:** Azure DevOps Server no es compatible.

### Crear y registrar una aplicación Microsoft Entra
Si eres administrador en tu portal de Azure, puedes configurar aplicaciones Entra para conectar tu inquilino a Datadog.

1. Ve a la [configuración de Code Security][1].
2. En **Activar el análisis de tus repositorios**, haz clic en **Manage Repositories** (Gestionar repositorios).
3. Selecciona **Pipelines CI**.
4. Selecciona los tipos de análisis que quieres utilizar.
5. Selecciona **Azure DevOps** como tu proveedor de gestión de código fuente.
6. Si es la primera vez que conectas una organización Azure DevOps a Datadog, haz clic en **Connect Azure DevOps Account** (Conectar cuenta de Azure DevOps).
7. Al conectar un inquilino Microsoft Entra por primera vez, tendrás que ir a tu [portal Azure][2] para registrar una nueva aplicación. Durante este proceso de creación, asegúrate de:
   1. Seleccionar **Cuentas sólo en este directorio organizativo (Datadog, Inc. solo - Inquilino único)** como tipo de cuenta.
   2. Definir el URI de redirección como **Web** y pegar el URI que se le indica en las instrucciones.
8. Copiar los valores de **ID de aplicación (cliente)** y **ID de directorio (inquilino)** y pegarlos en Datadog.
9. En el portal Azure para el registro de tu aplicación, ve a **Gestión > Certificados y secretos** y cambia a **Secretos de cliente**.
10. Haz clic en **New client secret** (Nuevo secreto de cliente) y crea un secreto con la descripción y los valores de caducidad que quieres utilizar.
11. Copia y pega la cadena en la columna **Valor** de tu nuevo secreto.
12. Pega el secreto en Datadog y haz clic en **Create Configuration** (Crear Configuración) para completar la conexión entre tu inquilino Entra y Datadog.
13. Añade una o más organizaciones Azure DevOps pegando el slug de la organización en Datadog y luego añadiendo tu servicio principal como usuario yendo a **Parámetros de organización > Usuarios > Añadir usuarios**.
    1.  Tu servicio principal necesitará el nivel de acceso **Básico** y al menos el grupo de seguridad **Colaborador del proyecto**.
14. Haz clic en **Submit Organization** (Enviar organización).

### Configurar hooks de servicio en proyectos

Para activar todas las funciones de Code Security en Azure DevOps, deberás utilizar una [clave de API Datadog][3] para configurar hooks de servicio para tus proyectos.

En primer lugar, configura las variables de entorno (nota: la interfaz de usuario de Datadog rellena estos valores):
```shell
export AZURE_DEVOPS_TOKEN="..."                 # Client Secret Value
export DD_API_KEY="..."                         # Datadog API Key
```

A continuación, sustituye los parámetros del script siguiente por tu [sitio Datadog][5] y el nombre de la organización Azure DevOps para configurar los hooks de servicio necesarios en los proyectos de tu organización:
```shell
curl https://raw.githubusercontent.com/DataDog/azdevops-sci-hooks/refs/heads/main/setup-hooks.py > setup-hooks.py && chmod a+x ./setup-hooks.py
./setup-hooks.py --dd-site="<dd-site>" --az-devops-org="<org-name>"
```

Haz clic [aquí][4] para ver nuestra CLI que automatiza este proceso.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/azdevops-sci-hooks
[5]: /es/getting_started/site/

{{% /tab %}}
{{% tab "Other" %}}

Si estás utilizando otro proveedor de gestión de código fuente, configura Static Code Analysis para que se ejecute en tus pipelines CI utilizando la herramienta CLI `datadog-ci` y [carga los resultados](#upload-third-party-static-analysis-results-to-datadog) en Datadog.
**Debes** ejecutar un análisis de tu repositorio en la rama por defecto antes de que los resultados puedan empezar a aparecer en la página **Code Security**.

{{% /tab %}}
{{< /tabs >}}

## Personalizar tu configuración

Por defecto, Datadog Static Code Analysis analiza tus repositorios utilizando [conjuntos de reglas predeterminadas de Datadog][6] para tu(s) lenguaje(s) de programación. Puedes personalizar qué reglas o conjuntos de reglas ejecutar o ignorar, además de otros parámetros. Puedes personalizar estos ajustes de forma local en tu repositorio o dentro de la aplicación Datadog.

### Localizaciones de configuración

Datadog Static Code Analysis puede configurarse dentro de Datadog o utilizando un archivo dentro del **directorio raíz** de tu repositorio.

Existen tres niveles de configuración:

* Configuración a nivel de organización (Datadog)
* Configuración a nivel de repositorio (Datadog)
* Configuración a nivel de repositorio (archivo de repositorio)

Las tres localizaciones utilizan el mismo formato YAML para la configuración. Estas configuraciones se fusionan **en orden** utilizando un método de fusión por superposición/parche. Por ejemplo, veamos estos dos archivos YAML de ejemplo:

```yaml
rulesets:
 - A
   rules:
      foo:
        ignore: ["**"]
        args: ["my_arg1", "my_arg2"]
```

```yaml
rulesets:
 - A
    rules:
        foo:
            ignore: ["my_ignored_file.file"]
        bar:
            only: ["the_only_file.file"]
 - B

```

Si estos archivos YAML se fusionaran en orden, el primer archivo con el segundo, la fusión de estos archivos YAML con un método de superposición/parche sería la siguiente:

```yaml
rulesets:
 - A
    rules:
        foo:
            ignore: ["my_ignored_file.file"]
            args: ["my_arg1", "my_arg2"]
        bar:
            only: ["the_only_file.file"]
 - B


```

Como puedes ver, al campo `ignore: ["**"]` del primer archivo se le superpuso el campo `ignore: ["my_ignored_file.file"]`. Esto sucedió porque hubo un conflicto y el valor del segundo archivo tuvo la prioridad debido al orden de fusión. El campo `args` del primer archivo se mantiene porque no hay ningún valor conflictivo en el segundo archivo.

#### Configuración a nivel de organización

{{< img src="/security/code_security/org-wide-configuration2.png" alt="Regla creada" style="width:100%;" >}}

Las configuraciones a nivel de organización se aplican a todos los repositorios que se están analizando y es un buen lugar para definir las reglas que deben ejecutarse o rutas/archivos globales que deben ignorarse.

#### Configuración a nivel de repositorio

{{< img src="/security/code_security/org-wide-configuration2.png" alt="Regla creada" style="width:100%;" >}}

Las configuraciones a nivel de repositorio sólo se aplican al repositorio seleccionado. Estas configuraciones se fusionan con la configuración de la organización y la configuración del repositorio tiene prioridad. Las configuraciones a nivel de repositorio son un buen lugar para definir anulaciones de detalles específicos del repositorio o para añadir reglas que sean específicas sólo para ese repositorio, por ejemplo.

#### Configuración a nivel de repositorio (archivo)

Además de las configuraciones proporcionadas para el nivel de organización y de repositorio, también puedes definir una configuración en la raíz de tu repositorio en la forma de ``static-analysis.datadog.yml``. Este archivo tiene prioridad sobre la configuración a nivel de repositorio definida en Datadog. Las configuraciones de archivos a nivel de repositorio son un método útil para cambiar configuraciones de reglas e iterar en la configuración y los tests.

### Formato de configuración

El siguiente formato de configuración se aplica a todas las localizaciones de configuración: Nivel de organización, Nivel de repositorio y Nivel de repositorio (archivo).

La estructura completa de una configuración es la siguiente:

```yaml
rulesets:
  - ruleset-name # A ruleset we want to run with default configurations
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




El archivo de configuración YAML admite las siguientes claves de nivel superior:

| **Propiedad** | **Tipo** | **Descripción**                                                                                                              | **Por defecto** |
| ------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `rulesets`       | Matriz          | Lista de conjuntos de reglas para analizar. Cada elemento puede ser un nombre de conjunto de reglas (cadena) o un objeto con una configuración detallada. | *Obligatorio*      |
| `only`           | Matriz          | Lista de rutas de archivos o patrones glob. Si se proporcionan, sólo se analizan los archivos coincidentes en todos los conjuntos de reglas.                      | Ninguno              |
| `ignore`         | Matriz          | Lista de rutas de archivos o patrones glob para excluir del análisis en todos los conjuntos de reglas.                                                | Ninguno              |

*Nota:* Las claves `only` y `ignore` actúan aquí como filtros de archivo que se aplican a todo el archivo de configuración.

---

## Configuración de conjuntos de reglas

Cada entrada de la matriz `rulesets` puede definirse de dos maneras:

1. **Declaración simple del conjunto de reglas:** Una cadena simple (por ejemplo, `ruleset-name`) indica que el conjunto de reglas debe ejecutarse con su configuración predeterminada.
2. **Objeto de conjunto de reglas detallado:** Un objeto cuya clave es el nombre del conjunto de reglas y cuyo valor es un objeto que contiene una configuración adicional. Las propiedades disponibles para un conjunto de reglas detallado son:

| **Propiedad** | **Tipo** | **Descripción**                                                                               | **Por defecto** |
| ------------------ | -------------- | --------------------------------------------------------------------------------------------------- | ----------------- |
| `only`           | Matriz          | Rutas de archivos o patrones glob. Sólo los archivos que coinciden con estos patrones son procesados por este conjunto de reglas. | Ninguno              |
| `ignore`         | Matriz          | Rutas de archivos o patrones glob a excluir del análisis para este conjunto de reglas.                              | Ninguno              |
| `rules`          | Objeto         | Asignación de nombres de reglas individuales a sus objetos de configuración.                                  | Ninguno              |

---

## Configuración de una regla

Dentro de la propiedad `rules` de un conjunto de reglas, cada regla se define por su nombre y configuración. Las propiedades disponibles para cada regla son:

| **Propiedad** | **Tipo** | **Descripción**                                                                              | **Por defecto** |
| ------------------ | -------------- | -------------------------------------------------------------------------------------------------- | ----------------- |
| `only`           | Matriz          | Rutas de archivos o patrones glob. La regla sólo se aplica a los archivos que coinciden con estos patrones.       | Ninguno              |
| `ignore`         | Matriz          | Rutas de archivos o patrones glob para excluir de la aplicación de la regla.                               | Ninguno              |
| `arguments`      | Objeto         | Parámetros y valores de la regla. Los valores pueden ser escalares o especificarse por ruta. | Ninguno              |

---

## Configuración de un argumento

Los argumentos de las reglas pueden definirse en uno de estos dos formatos:

1. **Valor estático:** Asigna directamente un valor a un argumento.

   ```yaml
   arguments:
     argument-name: value
   ```
2. **Asignación de rutas específicas:**
   Define diferentes valores en función de las rutas de los archivos. Utiliza la clave especial `/` para denotar el valor por defecto (aplicable en la raíz del repositorio).

   ```yaml
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   ```

| **Clave**     | **Tipo** | **Descripción**                                                     | **Por defecto** |
| ----------------- | -------------- | ------------------------------------------------------------------------- | ----------------- |
| `/`             | Cualquiera            | El valor por defecto del argumento cuando no se encuentra ninguna ruta específica.              | Ninguno              |
| `specific path` | Cualquiera            | El valor del argumento de los archivos que coinciden con la ruta especificada o el patrón glob. | Ninguno              |

---



Ejemplo de configuración:

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


| Nombre                 | Descripción                                                                                 | Obligatorio  | Valor predeterminado   |
| -------------------- | ------------------------------------------------------------------------------------------- | --------- | --------- |
| `rulesets`         | Lista de nombres de conjuntos de reglas y configuraciones. [Consultar todos los conjuntos de reglas disponibles][6].                | `true`  |           |
| `ignore`           | Lista de prefijos de ruta y patrones glob para ignorar. Los archivos que coinciden no se analizan.   | `false` |           |
| `only`             | Lista de prefijos de ruta y patrones glob para analizar. Sólo se analizan los archivos que coinciden. | `false` |           |
| `ignore-gitignore` | No utilices las rutas que figuran en el archivo `.gitignore` para omitir el análisis de determinados archivos.       | `false` | `false` |
| `max-file-size-kb` | Ignora los archivos de tamaño superior al especificado (en unidades kB).                                  | `false` | `200`   |

Puedes incluir las siguientes opciones de **conjunto de reglas** en el archivo `static-analysis.datadog.yml`:

| Nombre       | Descripción                                                                                                           | Obligatorio  |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| `rules`  | Lista de configuraciones de reglas para las reglas pertenecientes al conjunto de reglas.                                                         | `false` |
| `ignore` | Lista de prefijos de ruta y patrones glob para ignorar en este conjunto de reglas específico. No se analizan los archivos que coinciden.   | `false` |
| `only`   | Lista de prefijos de ruta y patrones glob para analizar en este conjunto de reglas específico. Sólo se analizan los archivos que coinciden. | `false` |

Puedes incluir las siguientes opciones de **regla** en el archivo `static-analysis.datadog.yml`:

| Nombre          | Descripción                                                                                                        | Obligatorio  |
| ------------- | ------------------------------------------------------------------------------------------------------------------ | --------- |
| `ignore`    | Lista de prefijos de ruta y patrones glob para ignorar en esta regla específica. Los archivos que coinciden no se analizan.   | `false` |
| `only`      | Lista de prefijos de ruta y patrones glob para analizar en esta regla específica. Sólo se analizan los archivos que coinciden. | `false` |
| `arguments` | Mapa de valores de las reglas que admiten argumentos personalizables.                                                     | `false` |

El mapa del campo `arguments` utiliza el nombre de un argumento como su clave, y los valores son cadenas o mapas:

* Para definir un valor para todo el repositorio, puedes especificarlo como una cadena.
* Para definir diferentes valores para diferentes subárboles en el repositorio, puedes especificarlos como un mapa desde un prefijo de subárbol con el valor que tendrá el argumento dentro de ese subárbol.

### Ignorar las infracciones

#### Ignorar un repositorio
Añade una regla de ignorar en tu archivo `static-analysis.Datadog.yml`. El siguiente ejemplo ignora la regla `javascript-express/reduce-server-fingerprinting` para todos los directorios.

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore:
          - "**"
```

#### Ignorar un archivo o directorio
Añade una regla de ignorar en tu archivo `static-analysis.datadog.yml`. El siguiente ejemplo ignora la regla `javascript-express/reduce-server-fingerprinting` para este archivo. Para obtener más información sobre cómo ignorar por ruta, consulta la sección [Personalizar tu configuración](#customize-your-configuration).

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore:
          - "ad-server/src/app.js"
```

#### Ignorar una instancia específica

Para ignorar una instancia específica de infracción, comenta `no-dd-sa` encima de la línea de código que quieres ignorar. Esto evita que esa línea genere una infracción. Por ejemplo, en el siguiente fragmento de código Python, la línea `foo = 1` sería ignorada por los análisis de Static Code Analysis.

```python
#no-dd-sa
foo = 1
bar = 2
```

También puedes utilizar `no-dd-sa` para ignorar sólo una regla concreta en lugar de ignorar todas las reglas. Para ello, especifica el nombre de la regla que quieres ignorar en lugar de `<rule-name>` utilizando esta plantilla:

`no-dd-sa:<rule-name>`

Por ejemplo, en el siguiente fragmento de código JavaScript, la línea `my_foo = 1` es analizado por todas las reglas, excepto por la regla `javascript-code-style/assignment-name`, que indica al desarrollador que utilice [camelCase][6] en lugar de [snake_case][7].

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

## Vincular resultados a servicios y equipos de Datadog
### Vincular resultados a servicios
Datadog asocia el código estático y los resultados del análisis de la librería con los de servicios mediante los siguientes mecanismos:

1. [Identificación de la localización del código asociado a un servicio mediante el Catálogo de software](#identifying-the-code-location-in-the-software-catalog)
2. [Detección de patrones de uso de archivos en productos adicionales de Datadog.](#detecting-file-usage-patterns)
3. [Búsqueda del nombre del servicio en la ruta del archivo o el repositorio](#detecting-service-name-in-paths-and-repository-names)

Si un método tiene éxito, no se realizan más intentos de asignación. A continuación se detalla cada método de asignación.

#### Identificación de la localización del código en el Catálogo de software

La [versión del esquema `v3`][14] y posteriores del Catálogo de software te permiten añadir la asignación de la localización de tu código para tu servicio. La sección `codeLocations` especifica la localización del repositorio que contiene el código y sus rutas asociadas.

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


Si quieres que todos los archivos de un repositorio estén asociados a un servicio, puedes utilizar el glob `**` de la siguiente manera:

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - "**"
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

Si no se encuentra ningún servicio o equipo, Datadog utiliza el archivo `CODEOWNERS` de tu repositorio. El archivo `CODEOWNERS` determina a qué equipo pertenece un archivo en tu proveedor Git.

**Nota**: Para que esta característica funcione correctamente, debes asignar con precisión tus equipos de proveedores Git a tus [equipos de Datadog][10].

## Análisis diferenciado

El análisis diferenciado permite al analizador estático de Datadog analizar únicamente los archivos modificados por un commit en una rama de características. Acelera significativamente el tiempo de análisis al no tener que ejecutar el análisis en cada archivo del repositorio durante cada análisis. Para habilitar el análisis diferenciado en tu pipeline CI, sigue estos pasos:

1. Asegúrate de que las variables `DD_APP_KEY`, `DD_SITE` y `DD_API_KEY` están configuradas en tu pipeline CI.
2. Añade una llamada a `datadog-ci git-metadata upload` antes de invocar al analizador estático. Este comando asegura que los metadatos Git están disponibles para el backend Datadog. Los metadatos Git son necesarios para calcular el número de archivos a analizar.
3. Asegúrate de que el analizador estático de Datadog se invoca con la marca `--diff-aware`.

Ejemplo de secuencia de comandos (estos comandos deben invocarse en tu repositorio Git):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Nota:** Cuando no se puede completar un análisis diferenciado, se analiza todo el directorio.

## Cargar resultados de análisis estáticos de terceros en Datadog

<div class="alert alert-info">
  La importación de SARIF ha sido probada para Snyk, CodeQL, Semgrep, Checkov, Gitleaks y Sysdig. Si tienes algún problema con otras herramientas compatibles con SARIF, ponte en contacto con el <a href="/help">servicio de asistencia de Datadog</a>.
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

## Directrices de compatibilidad de SARIF

Datadog admite la ingestión de archivos SARIF de terceros que cumplan [el esquema SARIF 2.1.0][15]. El esquema SARIF
es utilizado de forma diferente por las herramientas del analizador estático. Si quieres enviar archivos SARIF de terceros a Datadog,
asegúrate de que cumplen los siguientes detalles:

 - La localización de la infracción se especifica a través del objeto `physicalLocation` de un resultado.
    - La `artifactLocation` y su `uri` **deben ser relativos** a la raíz del repositorio.
    - El objeto `region` es la parte del código resaltada en la interfaz de usuario Datadog.
 - `partialFingerprints` se utiliza para identificar de forma única un hallazgo en un repositorio.
 - `properties` y `tags` añaden más información:
    - La etiqueta (tag) `DATADOG_CATEGORY` especifica la categoría del hallazgo. Los valores aceptables son `SECURITY`, `PERFORMANCE`, `CODE_STYLE`, `BEST_PRACTICES`, `ERROR_PRONE`.
    - Las infracciones anotadas con la categoría `SECURITY` aparecen en el Explorador de vulnerabilidades y en la pestaña Seguridad de la vista del repositorio.
 - La sección `tool` debe tener una sección `driver` válida con atributos `name` y `version`.

Por ejemplo, he aquí un ejemplo de archivo SARIF procesado por Datadog:


```json

{
    "runs": [
        {
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "missing_timeout.py"
                                },
                                "region": {
                                    "endColumn": 76,
                                    "endLine": 6,
                                    "startColumn": 25,
                                    "startLine": 6
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "timeout not defined"
                    },
                    "partialFingerprints": {
                        "DATADOG_FINGERPRINT": "b45eb11285f5e2ae08598cb8e5903c0ad2b3d68eaa864f3a6f17eb4a3b4a25da"
                    },
                    "properties": {
                        "tags": [
                            "DATADOG_CATEGORY:SECURITY",
                            "CWE:1088"
                        ]
                    },
                    "ruleId": "python-security/requests-timeout",
                    "ruleIndex": 0
                }
            ],
            "tool": {
                "driver": {
                    "informationUri": "https://www.datadoghq.com",
                    "name": "<tool-name>",
                    "rules": [
                        {
                            "fullDescription": {
                                "text": "Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.\n\n#### Learn More\n\n - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)\n - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)"
                            },
                            "helpUri": "https://link/to/documentation",
                            "id": "python-security/requests-timeout",
                            "properties": {
                                "tags": [
                                    "CWE:1088"
                                ]
                            },
                            "shortDescription": {
                                "text": "no timeout was given on call to external resource"
                            }
                        }
                    ],
                    "version": "<tool-version>"
                }
            }
        }
    ],
    "version": "2.1.0"
}
```

## Asignación de gravedad de SARIF a CVSS

El [formato SARIF][15] define cuatro gravedades: ninguna, nota, advertencia y error.
Sin embargo, Datadog informa de la gravedad de las infracciones y vulnerabilidades utilizando el [Common Vulnerability Scoring System][16] (CVSS),
que define cinco gravedades: crítica, alta, media, baja y ninguna.

Cuando se ingieren archivos SARIF, Datadog asigna las gravedades SARIF como gravedades CVSS utilizando las reglas de asignación que se indican a continuación.


| Gravedad SARIF | Gravedad CVSS |
|----------------|---------------|
| Error          | Imprescindible      |
| Advertencia        | Alto          |
| Nota           | Medio        |
| Ninguno           | Bajo           |


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
[15]: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
[16]: https://www.first.org/cvss/
