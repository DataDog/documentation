---
description: Documentación de referencia para la configuración de Datadog Static Code
  Analysis (SAST), que abarca la selección de conjuntos de reglas, la personalización
  de reglas, los niveles de gravedad y las rutas.
title: Static Code Analysis (SAST) Configuration
---
De forma predeterminada, Static Code Analysis (SAST) de Datadog escanea sus repositorios con los [conjuntos de reglas predeterminados de Datadog][6] para cada lenguaje de programación. Puede personalizar qué conjuntos de reglas y reglas se ejecutan, junto con los niveles de gravedad, las rutas y otros parámetros. Configure estos ajustes bajo la clave `sast` en la configuración de Code Security, ya sea en Datadog o en un archivo `code-security.datadog.yaml`.

Para obtener información sobre las ubicaciones de configuración, la precedencia y la combinación, consulte [Referencia de configuración de Code Security][26].

## Conjuntos de reglas predeterminados {#default-rulesets}

De forma predeterminada, Datadog habilita los conjuntos de reglas predeterminados para los lenguajes de programación de su repositorio (`use-default-rulesets: true`). Para modificar los conjuntos de reglas habilitados:

- **Agregar conjuntos de reglas**: listar debajo de `use-rulesets`
- **Deshabilitar conjuntos de reglas específicos**: listar debajo de `ignore-rulesets`
- **Deshabilitar todos los conjuntos de reglas predeterminados**: establezca `use-default-rulesets: false`, luego listar los conjuntos de reglas deseados bajo `use-rulesets`

Para obtener la lista completa de conjuntos de reglas predeterminados, consulte [Reglas de Análisis de código estático (SAST)][6].

## Configure AI-native SAST {#configure-ai-native-sast}

AI-native SAST utiliza la misma configuración de `sast` que otras reglas de Static Code Analysis y solo está disponible para escaneos alojados en Datadog. La configuración de `sast` controla qué conjuntos de reglas de AI-native SAST se ejecutan; no habilita el escaneo alojado en Datadog ni otorga acceso a AI-native SAST.

Cuando se habilita AI-native SAST, sus conjuntos de reglas predeterminados se ejecutan para los lenguajes compatibles detectados en el repositorio. Los nombres de los conjuntos de reglas de AI-native SAST utilizan el formato `<language>-ai_sast`:

| Lenguaje | Conjunto de reglas |
| --- | --- |
| C# | `csharp-ai_sast` |
| Dart | `dart-ai_sast` |
| Elixir | `elixir-ai_sast` |
| Go | `go-ai_sast` |
| Java | `java-ai_sast` |
| JavaScript | `javascript-ai_sast` |
| Kotlin | `kotlin-ai_sast` |
| PHP | `php-ai_sast` |
| Python | `python-ai_sast` |
| Ruby | `ruby-ai_sast` |
| Rust | `rust-ai_sast` |
| Swift | `swift-ai_sast` |
| TypeScript | `typescript-ai_sast` |

La configuración `use-default-rulesets` se aplica tanto a los conjuntos de reglas tradicionales de SAST como a los de AI-native SAST. Si establece `use-default-rulesets: false`, incluya todos los conjuntos de reglas tradicionales de SAST y de AI-native SAST que desee ejecutar. Por ejemplo, la siguiente configuración ejecuta los conjuntos de reglas Security de Ruby y los de AI-native SAST:

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - ruby-security
    - ruby-ai_sast
{{< /code-block >}}

Para deshabilitar un conjunto de reglas de AI-native SAST específico mientras conserva los otros conjuntos de reglas predeterminados, agréguelo a `ignore-rulesets`:

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  ignore-rulesets:
    - ruby-ai_sast
{{< /code-block >}}

## Formato de configuración {#configuration-format}

El siguiente formato de configuración se aplica a todas las ubicaciones de configuración: a nivel de organización, a nivel de repositorio y a nivel de repositorio (archivo).

El archivo de configuración debe comenzar con un `schema-version` compatible (`v1.0`, `v1.1`, `v1.2`, `v1.3` o `v1.4`), seguido de una clave `sast` que contenga la configuración de análisis. Use `v1.4` para todas las configuraciones nuevas. La configuración está estructurada como se muestra a continuación:

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  use-rulesets:
    - ruleset-name
  ignore-rulesets:
    # Always ignore these rulesets (even if it is a default ruleset or listed in `use-rulesets`)
    - ignored-ruleset-name
  ruleset-configs:
    ruleset-name:
      # Only apply this ruleset to the following paths/files
      only-paths:
        - "path/example"
        - "**/*.file"
      # Do not apply this ruleset in the following paths/files
      ignore-paths:
        - "path/example/directory"
        - "**/config.file"
      rule-configs:
        rule-name:
          # Only apply this rule to the following paths/files
          only-paths:
            - "path/example"
            - "**/*.file"
          # Do not apply this rule to the following paths/files
          ignore-paths:
            - "path/example/directory"
            - "**/config.file"
          arguments:
            # Set the rule's argument to value.
            argument-name: value
          severity: ERROR
          category: CODE_STYLE
        rule-name:
          arguments:
            # Set different argument values in different subtrees
            argument-name:
              # Set the rule's argument to value_1 by default (root path of the repo)
              /: value_1
              # Set the rule's argument to value_2 for specific paths
              path/example: value_2
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 200
{{< /code-block >}}

La clave `sast` admite los siguientes campos:

| **Propiedad** | **Tipo** | **Descripción** | **Predeterminado** |
| --- | --- | --- | --- |
| `use-default-rulesets` | Booleano | Si se deben habilitar los conjuntos de reglas predeterminados de Datadog. | `true` |
| `use-rulesets` | Matriz | Una lista de nombres de conjuntos de reglas para habilitar. | Ninguno |
| `ignore-rulesets` | Matriz | Una lista de nombres de conjuntos de reglas para deshabilitar. Tiene prioridad sobre `use-rulesets` y `use-default-rulesets`. | Ninguno |
| `ruleset-configs` | Objeto | Un mapa del nombre del conjunto de reglas a su configuración. | Ninguno |
| `global-config` | Objeto | Configuración global para el repositorio. | Ninguno |

## Configuración del conjunto de reglas {#ruleset-configuration}

Cada entrada en el mapa `ruleset-configs` configura un conjunto de reglas específico. No es necesario que un conjunto de reglas aparezca en `use-rulesets` para que se aplique su configuración; la configuración se utiliza siempre que el conjunto de reglas esté habilitado, incluso a través de `use-default-rulesets`.

| **Propiedad** | **Tipo** | **Descripción** | **Predeterminado** |
| --- | --- | --- | --- |
| `only-paths` | Matriz | Rutas de archivo o patrones glob. Solo los archivos que coinciden con estos patrones se procesan para este conjunto de reglas. | Ninguno |
| `ignore-paths` | Matriz | Rutas de archivo o patrones glob para excluir del análisis para este conjunto de reglas. | Ninguno |
| `rule-configs` | Objeto | Un mapa del nombre de la regla a su configuración. | Ninguno |

## Configuración de regla {#rule-configuration}

Cada entrada en el mapa `rule-configs` de un conjunto de reglas configura una regla específica:

| **Propiedad** | **Tipo** | **Descripción** | **Predeterminado** |
| --- | --- | --- | --- |
| `only-paths` | Matriz | Rutas de archivo o patrones glob. La regla se aplica solo a los archivos que coinciden con estos patrones. | Ninguno |
| `ignore-paths` | Matriz | Rutas de archivo o patrones glob para excluir. La regla no se aplica a los archivos que coinciden con estos patrones. | Ninguno |
| `arguments` | Objeto | Parámetros y valores para la regla. Los valores pueden ser escalares o definirse por ruta. | Ninguno |
| `severity` | Cadena u objeto | La gravedad de la regla. Valores válidos: `ERROR`, `WARNING`, `NOTICE`, `NONE`. Puede ser un valor único o definido por ruta. | Ninguno |
| `category` | Cadena | La categoría de la regla. Valores válidos: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE`, `SECURITY`. | Ninguno |

## Configuración de argumento y gravedad {#argument-and-severity-configuration}

Los argumentos y la gravedad se pueden definir en uno de dos formatos:

1. **Valor único:** Se aplica a todo el repositorio.

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name: value
   severity: ERROR
   {{< /code-block >}}

2. **Asignación por ruta:** Valores diferentes para diferentes subárboles. Se aplica el prefijo de ruta coincidente más largo. Use `/` como valor predeterminado general.

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   severity:
     /: WARNING
     path/example: ERROR
   {{< /code-block >}}

   | **Clave** | **Tipo** | **Descripción** | **Predeterminado** |
   | --- | --- | --- | --- |
   | `/` | Cualquiera | El valor predeterminado cuando no se encuentra ninguna ruta específica. | Ninguno |
   | `specific path` | Cualquiera | El valor para los archivos que coinciden con la ruta o el patrón glob especificado. | Ninguno |

El campo `category` acepta un único valor de cadena para todo el repositorio.

## Configuración global {#global-configuration}

El objeto `global-config` controla la configuración de todo el repositorio:

| **Propiedad** | **Tipo** | **Descripción** | **Predeterminado** |
| --- | --- | --- | --- |
| `only-paths` | Matriz | Rutas de archivo o patrones glob. Solo se analizan los archivos que coinciden. | Ninguno |
| `ignore-paths` | Matriz | Rutas de archivo o patrones glob a excluir. Los archivos que coinciden no se analizan. | Ninguno |
| `use-gitignore` | Booleano | Indica si se deben incluir entradas del archivo `.gitignore` en `ignore-paths`. | `true` |
| `ignore-generated-files` | Booleano | Indica si se deben incluir patrones de archivos generados comunes en `ignore-paths`. | `true` |
| `max-file-size-kb` | Número | Tamaño máximo de archivo (en kB) a analizar. Los archivos más grandes se ignoran. | `200` |

Ejemplo de configuración:

Debido a que este ejemplo deshabilita los conjuntos de reglas predeterminados, el ejemplo incluye explícitamente `python-ai_sast` para conservar AI-native SAST para Python:

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - python-best-practices
    - python-security
    - python-code-style
    - python-inclusive
    - python-django
    - python-ai_sast
    - custom-python-ruleset
  ruleset-configs:
    python-code-style:
      rule-configs:
        max-function-lines:
          # Do not apply the rule max-function-lines to the following files
          ignore-paths:
            - "src/main/util/process.py"
            - "src/main/util/datetime.py"
          arguments:
            # Set the max-function-lines rule's threshold to 150 lines
            max-lines: 150
          # Override this rule's severity
          severity: NOTICE
        max-class-lines:
          arguments:
            # Set different thresholds for the max-class-lines rule in different subtrees
            max-lines:
              # Set the rule's threshold to 200 lines by default (root path of the repo)
              /: 200
              # Set the rule's threshold to 100 lines in src/main/backend
              src/main/backend: 100
          # Override this rule's severity with different values in different subtrees
          severity:
            # Set the rule's severity to NOTICE by default
            /: NOTICE
            # Set the rule's severity to NONE in tests/
            tests: NONE
    python-django:
      # Only apply the python-django ruleset to the following paths
      only-paths:
        - "src/main/backend"
        - "src/main/django"
      # Do not apply the python-django ruleset in files matching the following pattern
      ignore-paths:
        - "src/main/backend/util/*.py"
  global-config:
    # Only analyze source files
    only-paths:
      - "src/main"
      - "src/tests"
      - "**/*.py"
    # Do not analyze third-party files
    ignore-paths:
      - "lib/third_party"
{{< /code-block >}}

## Configuración heredada {#legacy-configuration}

Datadog Static Code Analysis (SAST) utilizaba anteriormente un archivo de configuración (`static-analysis.datadog.yml`) y un esquema diferentes. Este esquema está obsoleto y no recibe nuevas actualizaciones, pero está [documentado][25] en el repositorio `datadog-static-analyzer`.

Si ambos archivos están presentes, `code-security.datadog.yaml` tiene prioridad sobre `static-analysis.datadog.yml`.

### Ignorando infracciones {#ignoring-violations}

#### Ignorar para un repositorio {#ignore-for-a-repository}

Agregue una configuración de regla en su archivo `code-security.datadog.yaml`. El siguiente ejemplo ignora la regla `javascript-express/reduce-server-fingerprinting` para todos los directorios.

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "**"
{{< /code-block >}}

#### Ignorar para un archivo o directorio {#ignore-for-a-file-or-directory}

Agregue una configuración de regla en su archivo `code-security.datadog.yaml`. El siguiente ejemplo ignora la regla `javascript-express/reduce-server-fingerprinting` para un archivo específico. Para obtener más información sobre cómo ignorar por ruta, consulte [Personalice su configuración](#customize-your-configuration).

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "ad-server/src/app.js"
{{< /code-block >}}

#### Ignorar para una instancia específica {#ignore-for-a-specific-instance}

Para ignorar una instancia específica de una infracción, comente `no-dd-sa` sobre la línea de código. Las infracciones suprimidas con `no-dd-sa` se muestran como **suprimidas**, en lugar de omitirse por completo, para que pueda buscarlas y auditarlas.

En la [página de repositorios][1], las infracciones suprimidas aparecen con `is_suppressed: true`. En el [explorador de vulnerabilidades][2], aparecen con `status: muted` y `workflow.mute.reason: muted_in_code`.

Por ejemplo, en el siguiente fragmento de código Python, la línea `foo = 1` se suprimiría en los análisis de código estático.

{{< code-block lang="python" >}}
#no-dd-sa
foo = 1
bar = 2
{{< /code-block >}}

También puede usar `no-dd-sa` para suprimir solo una regla en particular, en lugar de suprimir todas las reglas. Para hacerlo, especifique el nombre de la regla que desea suprimir en lugar de `<rule-name>` usando esta plantilla:

`no-dd-sa:<rule-name>`

Por ejemplo, en el siguiente fragmento de código JavaScript, la línea `my_foo = 1` se suprime solo para la regla `javascript-code-style/assignment-name`, pero todas las demás reglas aún la analizan.

{{< code-block lang="javascript" >}}
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
{{< /code-block >}}

[1]: https://app.datadoghq.com/security/code-security/repositories
[2]: https://app.datadoghq.com/security/code-security/sca
[6]: /es/security/code_security/static_analysis/static_analysis_rules
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[26]: /es/security/code_security/guides/configuration/