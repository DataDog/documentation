---
description: Configure el comportamiento de Code Coverage con un archivo de configuración
  en su repositorio.
further_reading:
- link: /code_coverage
  tag: Documentación
  text: Code Coverage
- link: /code_coverage/setup
  tag: Documentación
  text: Configure Code Coverage
- link: /code_coverage/flags
  tag: Documentación
  text: Organice los datos de cobertura con indicadores
- link: /code_coverage/carryforward
  tag: Documentación
  text: Mantenga la cobertura total precisa con carryforward
title: Configuración de Code Coverage
---
## Descripción general {#overview}

Puede configurar el comportamiento de Code Coverage creando un archivo de configuración llamado `code-coverage.datadog.yml` o `code-coverage.datadog.yaml` en la raíz de su repositorio.

Archivo de configuración de ejemplo:

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
      - backend/.*\.go
ignore:
  - "test/**/*"
  - "**/*.pb.go"
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85
  - type: patch_coverage_percentage
    config:
      threshold: 95
comments:
  enabled: true
  file_breakdown: true
```

## Configuración de servicios {#services-configuration}

<div class="alert alert-info">Usar la <a href="/code_coverage/monorepo_support#software-catalog-integration">integración con el Catálogo</a> es el enfoque recomendado para definir servicios, ya que las ubicaciones de código configuradas en el Catálogo pueden ser utilizadas por múltiples productos de Datadog. Utilice la configuración manual solo cuando la integración con el Catálogo no esté disponible.</div>

Puede definir servicios en su archivo de configuración para dividir los datos de Code Coverage por servicio en monorepos. Esto es útil cuando varios proyectos o equipos comparten un mismo repositorio y desea ver las métricas de Code Coverage para cada servicio de forma independiente.

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/**
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
```

- `schema-version` (obligatorio): Debe ser `v1`
- `services`: Lista de definiciones de servicio
  - `id` (obligatorio): Identificador único para el servicio
  - `paths` (obligatorio): Lista de patrones de ruta que pertenecen a este servicio (consulte [Sintaxis de patrones](#pattern-syntax))

Para obtener detalles completos sobre la compatibilidad con monorepos, incluida la integración con el Catálogo y la división basada en propietarios de código, consulte [Monorepo Support][1].

### Ejemplos {#examples}

{{% collapse-content title="Monorepo de JavaScript/TypeScript" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: web-app
    paths:
      - packages/web/**
      - packages/shared/ui/**
  - id: mobile-app
    paths:
      - packages/mobile/**
      - packages/shared/core/**
  - id: admin-dashboard
    paths:
      - packages/admin/**
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Monorepo multilingüe" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-service
    paths:
      - services/backend/**
      - services/backend/.*\.go
  - id: frontend-web
    paths:
      - services/frontend/**
      - services/frontend/.*\.(ts|tsx)
  - id: data-processing
    paths:
      - services/data/**
      - scripts/.*\.py
{{< /code-block >}}
{{% /collapse-content %}}

## Ignorar rutas {#ignoring-paths}

Puede excluir archivos o directorios específicos de los informes de Code Coverage utilizando el campo `ignore`. Esto es útil para excluir archivos de prueba, código generado, dependencias de proveedores y otros archivos que no deben incluirse en las métricas de Code Coverage. Los patrones de ruta admiten coincidencias de glob, regex y prefijos (consulte [Sintaxis de patrones](#pattern-syntax)).

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

### Excepciones {#exceptions}

Agregue `!` antes de un patrón para crear una excepción a sus reglas de exclusión. Esto le permite incluir archivos o carpetas específicos que de otro modo estarían excluidos.

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**Importante**: Los patrones negativos tienen prioridad sobre los patrones positivos. Si algún patrón negativo coincide con una ruta de archivo, esa ruta _no_ se ignora.

### Ejemplos {#examples-1}

{{% collapse-content title="Excluir archivos de prueba y código generado" level="h4" %}}

```yaml
ignore:
  - "**/*_test.go"        # Exclude Go test files
  - "**/*.pb.go"          # Exclude protobuf files
  - "vendor/"             # Exclude vendor directory
  - "mocks/"              # Exclude mock files
```
{{% /collapse-content %}}

{{% collapse-content title="Excluir con excepciones" level="h4" %}}

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
  - "test/"               # Ignore test directory
  - "!test/integration/"  # Except integration tests
```
{{% /collapse-content %}}

{{% collapse-content title="Tipos de patrones mixtos" level="h4" %}}

```yaml
ignore:
  - "^vendor/.*"          # Regex: exclude vendor (anchored)
  - "**/*.min.js"         # Glob: exclude minified JS files
  - "dist/"               # Prefix: exclude dist directory
  - ".*\\.pb\\.go$"       # Regex: exclude protobuf files
```
{{% /collapse-content %}}

## PR Gates {#pr-gates}

Puede definir [PR Gates][2] en el archivo de configuración para aplicar umbrales de Code Coverage en las solicitudes de extracción. Si [PR Gates] también están configuradas en la [Datadog UI][2], Datadog evalúa tanto las reglas del archivo de configuración como las reglas de la UI cuando se abre o actualiza una PR.

<div class="alert alert-info">Si tanto el archivo de configuración como la Datadog UI definen [PR Gates] para el mismo contexto, la solicitud de extracción debe cumplir con todos los umbrales definidos.</div>

```yaml
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85

  - type: patch_coverage_percentage
    config:
      threshold: 95
```

Cada gate tiene los siguientes campos:

- `type` (obligatorio): El tipo de coverage gate. Valores admitidos:
  - `total_coverage_percentage`: El porcentaje mínimo de cobertura general para el repositorio (o para los servicios o propietarios de código con contexto).
  - `patch_coverage_percentage`: El porcentaje mínimo de cobertura en el código modificado en la solicitud de extracción.
- `config` (obligatorio): Opciones de configuración del coverage gate. Valores admitidos:
  - `threshold` (obligatorio): El porcentaje mínimo de cobertura (0-100).
  - `services`: (opcional) Una lista de patrones de nombre de servicio para limitar el contexto del coverage gate. Utilice `*` como comodín. Anteponga `!` a un valor para excluir los servicios coincidentes. Cuando se establece, la cobertura se evalúa por separado para cada servicio coincidente.
  - `codeowners`: (opcional) Una lista de patrones de propietario de código para limitar el contexto del coverage gate. Utilice `*` como comodín. Anteponga `!` a un valor para excluir a los propietarios de código coincidentes. Cuando se establece, la cobertura se evalúa por separado para cada propietario de código coincidente.
  - `flags`: (opcional) Una lista de patrones de nombre de [flag][3] para limitar el contexto de la puerta. Utilice `*` como comodín. Anteponga `!` a un valor para excluir los flags coincidentes. Cuando se establece, la cobertura se evalúa por separado para cada flag coincidente.

### Ejemplos {#examples-2}

{{% collapse-content title="Coverage gates de cobertura total y de parche sin contexto definido" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80

  - type: patch_coverage_percentage
    config:
      threshold: 90
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Coverage gates con contexto limitado a servicios" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-api
    paths:
      - backend/api/**
  - id: frontend-web
    paths:
      - frontend/**
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 90
      services:
        - "*"

  - type: total_coverage_percentage
    config:
      threshold: 85
      services:
        - "backend-api"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Coverage gates con contexto limitado a propietarios de código" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 95
      codeowners:
        - "@DataDog/backend-team"
        - "@DataDog/api-*"

  - type: total_coverage_percentage
    config:
      threshold: 80
      codeowners:
        - "@DataDog/frontend-team"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Coverage gates con contexto limitado a flags" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      flags:
        - "unit-tests"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "integration-tests"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Exclusión con negación" level="h4" %}}
Utilice el prefijo `!` para excluir servicios, propietarios de código o flags específicos de un coverage gate. Por ejemplo, para aplicar la cobertura en todos los servicios excepto en los experimentales, y en todos los flags excepto en las pruebas nocturnas:
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      services:
        - "*"
        - "!experimental-*"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "*"
        - "!nightly-*"
{{< /code-block >}}
{{% /collapse-content %}}

## Comentarios de PR {#pr-comments}

De forma predeterminada, Datadog publica un comentario de resumen de cobertura de código en cada PR. El resumen informa la cobertura total y de parche para la PR y enlaza a la página de Code Coverage en Datadog.

El bloque `comments` acepta los siguientes campos:

| Campo | Tipo | Predeterminado | Descripción |
|---|---|---|---|
| `enabled` | Booleano | `true` | Si Datadog publica un comentario de cobertura de código en las PR. |
| `file_breakdown` | Booleano | `false` | Si el comentario incluye una tabla de la cobertura total y de parche por archivo. |

Las verificaciones de PR Gates no se ven afectadas por esta configuración.

### Deshabilitar comentarios de PR {#disabling-pr-comments}

Puede suprimir el comentario por repositorio con el campo `comments.enabled`:

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
comments:
  enabled: false
{{< /code-block >}}

### Desglose por archivo {#per-file-breakdown}

Establezca `comments.file_breakdown` en `true` para agregar una tabla al comentario que enumere los archivos cambiados en la PR, junto con su cobertura total y cobertura de parche:

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
comments:
  enabled: true
  file_breakdown: true
{{< /code-block >}}

El desglose no tiene efecto cuando `comments.enabled` es `false`.

## Carryforward {#carryforward}

{{< callout url="#" btn_hidden="true" header="¡Únase a la vista previa!">}}Carryforward está en vista previa y está sujeto a cambios.{{< /callout >}}

Puede habilitar [carryforward][4] en el archivo de configuración para reutilizar los datos de cobertura de las confirmaciones anteriores cuando no se ejecutan todos los trabajos de CI para una confirmación. Carryforward opera sobre [flags][3], por lo que cada informe involucrado debe estar etiquetado con `--flags`.

Para habilitar carryforward para cada flag en el repositorio:

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
carryforward: true
{{< /code-block >}}

Para habilitar carryforward solo para flags específicos:

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
flags:
  unit-tests:
    carryforward: true
  integration-tests:
    carryforward: true
{{< /code-block >}}

El campo `carryforward` de nivel superior acepta los siguientes valores:

- `true`: Carryforward está habilitado para cada flag, a menos que un flag lo anule con `carryforward: false` en el mapa `flags`.
- `false` (predeterminado): Carryforward está deshabilitado, a menos que un flag opte por habilitarlo con `carryforward: true` en el mapa `flags`.

El mapa `flags` acepta un bloque de configuración por flag. Los campos admitidos son:

- `carryforward`: Un valor booleano que habilita o deshabilita carryforward para el flag especificado. Anula el valor `carryforward` de nivel superior.

Para obtener detalles completos, consulte [Code Coverage Carryforward][4].

## Sintaxis de patrones {#pattern-syntax}

Las opciones de configuración que aceptan rutas de archivo admiten tres tipos de patrones:

- `regex`
- `glob`
- `path_prefix`

El tipo de patrón se detecta automáticamente según la sintaxis que utilice.

### Patrones de expresiones regulares {#regex-patterns}

Los patrones que contienen caracteres específicos de regex (`+`, `{`, `}`, `|`, `(`, `)`, `^`, `$`, `\`) se tratan como expresiones regulares:

- `".*\\.pb\\.go$"` - Coincide con archivos que terminan en `.pb.go`
- `"^generated/.*"` - Coincide con archivos en el directorio generado
- `".*_test\\.go$"` - Coincide con archivos de prueba

**Nota**: Los patrones de regex se anclan automáticamente con `^...$` para la coincidencia de ruta completa. Utilice barras diagonales (`/`) como separadores de ruta en los patrones de regex.

### Patrones glob{#glob-patterns}

Los patrones que contienen caracteres específicos de glob (`*`, `?`, `[`, `]`) se tratan como patrones glob:

- `"**/*.java"` - Coincide con todos los archivos Java
- `"src/test/**/*"` - Coincide con todos los archivos en src/test
- `"*.pb.go"` - Coincide con archivos protobuf en cualquier directorio

**Nota**: Utilice `**` para coincidir con directorios de forma recursiva. El patrón `folder/*` coincide solo con los hijos directos, mientras que `folder/**/*` coincide con todos los descendientes.

### Patrones de prefijo{#prefix-patterns}

Los prefijos de ruta simples sin caracteres especiales se tratan como coincidencias de prefijo:

- `"vendor/"` - Coincide con todos los archivos en el directorio de proveedor
- `"third_party/"` - Coincide con código de terceros
- `"generated/"` - Coincide con código generado

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/code_coverage/monorepo_support
[2]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[3]: /es/code_coverage/flags
[4]: /es/code_coverage/carryforward