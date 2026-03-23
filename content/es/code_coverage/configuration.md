---
description: Configura el comportamiento de cobertura de código con un archivo de
  configuración en tu repositorio.
further_reading:
- link: /code_coverage
  tag: Documentation
  text: Cobertura de Código
- link: /code_coverage/setup
  tag: Documentation
  text: Configura la Cobertura de Código
- link: /code_coverage/flags
  tag: Documentation
  text: Organiza los datos de cobertura con banderas
title: Configuración de Cobertura de Código
---
## Resumen

Puedes configurar el comportamiento de la Cobertura de Código creando un archivo de configuración llamado `code-coverage.datadog.yml` o `code-coverage.datadog.yaml` en la raíz de tu repositorio.

Ejemplo de archivo de configuración:

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
```

## Configuración de servicios

<div class="alert alert-info"> Usar <a href="/code_coverage/monorepo_support#software-catalog-integration"> Integración del Catálogo de Software </a> es el enfoque recomendado para definir servicios, ya que las ubicaciones de código configuradas en el Catálogo de Software pueden ser utilizadas por múltiples productos de Datadog. Usa la configuración manual solo cuando la integración del Catálogo de Software no esté disponible.</div>

Puedes definir servicios en tu archivo de configuración para dividir los datos de cobertura por servicio en monorepos. Esto es útil cuando múltiples proyectos o equipos comparten un solo repositorio y deseas ver las métricas de cobertura para cada servicio de manera independiente.

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

- `schema-version` (requerido): Debe ser `v1`
- `services`: Lista de definiciones de servicio
  - `id` (requerido): Identificador único para el servicio
  - `paths` (requerido): Lista de patrones de ruta que pertenecen a este servicio (ver [ Sintaxis de patrones ](#pattern-syntax))

Para detalles completos sobre el soporte de monorepo, incluyendo la integración del Catálogo de Software y la división basada en propietarios de código, consulta [Soporte de Monorepo][1].

### Ejemplos

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

{{% collapse-content title="Monorepo multilenguaje" level="h4" %}}
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

## Ignorando rutas

Puedes excluir archivos o directorios específicos del informe de cobertura de código utilizando el campo `ignore`. Esto es útil para excluir archivos de prueba, código generado, dependencias de proveedores y otros archivos que no deberían incluirse en las métricas de cobertura. Los patrones de ruta soportan glob, regex y coincidencias de prefijo (ver [Sintaxis de patrones](#pattern-syntax)).

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

### Excepciones

Agrega `!` antes de un patrón para crear una excepción a tus reglas de ignorar. Esto te permite incluir archivos o carpetas específicos que de otro modo serían excluidos.

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**Importante**: Los patrones negativos tienen prioridad sobre los patrones positivos. Si algún patrón negativo coincide con una ruta de archivo, esa ruta _no_ es ignorada.

### Ejemplos

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

## Puertas de PR

Puedes definir [Puertas de PR][2] en el archivo de configuración para hacer cumplir los umbrales de cobertura de código en las solicitudes de extracción. Si las puertas también están configuradas en la [interfaz de usuario de Datadog][2], Datadog evalúa tanto las reglas del archivo de configuración como las reglas de la interfaz de usuario cuando se abre o actualiza una PR.

<div class="alert alert-info">Si tanto el archivo de configuración como la interfaz de usuario de Datadog definen puertas para el mismo alcance, la solicitud de extracción debe cumplir con cada umbral definido.</div>

```yaml
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85

  - type: patch_coverage_percentage
    config:
      threshold: 95
```

Cada puerta tiene los siguientes campos:

- `type` (requerido): El tipo de puerta de cobertura. Valores soportados:
  - `total_coverage_percentage`: El porcentaje mínimo de cobertura general para el repositorio (o para los servicios o propietarios de código específicos).
  - `patch_coverage_percentage`: El porcentaje mínimo de cobertura en el código cambiado en la solicitud de extracción.
- `config` (requerido): Opciones de configuración de la puerta. Valores soportados:
  - `threshold` (requerido): El porcentaje mínimo de cobertura (0-100).
  - `services`: (opcional) Una lista de patrones de nombres de servicio para limitar la puerta. Utiliza `*` como un comodín. Prefija un valor con `!` para excluir servicios coincidentes. Cuando se establece, la cobertura se evalúa por separado para cada servicio coincidente.
  - `codeowners`: (opcional) Una lista de patrones de propietarios de código para limitar la puerta. Utiliza `*` como un comodín. Prefija un valor con `!` para excluir propietarios de código coincidentes. Cuando se establece, la cobertura se evalúa por separado para cada propietario de código coincidente.
  - `flags`: (opcional) Una lista de patrones de nombres de [flag][3] para limitar la puerta. Utiliza `*` como un comodín. Prefija un valor con `!` para excluir banderas coincidentes. Cuando se establece, la cobertura se evalúa por separado para cada bandera coincidente.

### Ejemplos

{{% collapse-content title="Puertas de cobertura total y parches sin alcance" level="h4" %}}
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

{{% collapse-content title="Puertas limitadas a servicios" level="h4" %}}
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

{{% collapse-content title="Puertas limitadas a propietarios de código" level="h4" %}}
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

{{% collapse-content title="Puertas limitadas a banderas" level="h4" %}}
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

{{% collapse-content title="Excluyendo con negación" level="h4" %}}
Utiliza el prefijo `!` para excluir servicios específicos, propietarios de código o banderas de una puerta. Por ejemplo, para hacer cumplir la cobertura en todos los servicios excepto los experimentales, y en todas las banderas excepto las pruebas nocturnas:
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

## Sintaxis de patrones

Las opciones de configuración que aceptan rutas de archivo admiten tres tipos de patrones:

- `regex`
- `glob`
- `path_prefix`

El tipo de patrón se detecta automáticamente según la sintaxis que utilices.

### Patrones de expresiones regulares

Los patrones que contienen caracteres específicos de regex (`+`, `{`, `}`, `|`, `(`, `)`, `^`, `$`, `\`) se tratan como expresiones regulares:

- `".*\\.pb\\.go$"` - Coincide con archivos que terminan en `.pb.go`
- `"^generated/.*"` - Coincide con archivos en el directorio generado
- `".*_test\\.go$"` - Coincide con archivos de prueba

**Nota**: Los patrones de regex se anclan automáticamente con `^...$` para coincidencias de ruta completa. Utiliza barras diagonales (`/`) como separadores de ruta en patrones regex.

### Patrones glob

Los patrones que contienen caracteres específicos de glob (`*`, `?`, `[`, `]`) se tratan como patrones glob:

- `"**/*.java"` - Coincide con todos los archivos Java
- `"src/test/**/*"` - Coincide con todos los archivos en src/test
- `"*.pb.go"` - Coincide con archivos protobuf en cualquier directorio

**Nota**: Usa `**` para coincidir directorios recursivamente. El patrón `folder/*` coincide solo con los hijos directos, mientras que `folder/**/*` coincide con todos los descendientes.

### Patrones de prefijo

Los prefijos de ruta simples sin caracteres especiales se tratan como coincidencias de prefijo:

- `"vendor/"` - Coincide con todos los archivos en el directorio vendor
- `"third_party/"` - Coincide con código de terceros
- `"generated/"` - Coincide con código generado

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/code_coverage/monorepo_support
[2]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[3]: /es/code_coverage/flags