---
aliases:
- /es/security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
- /es/security/code_security/iac_security/exclusions/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evite que las configuraciones erróneas de la nube lleguen a producción con
    Datadog IaC Security
- link: /security/code_security/iac_security
  tag: Documentación
  text: IaC Security
- link: /security/code_security/iac_security/setup
  tag: Documentación
  text: Configure IaC Security para Code Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentación
  text: Reglas de IaC Security
title: Configuración de Infrastructure as Code (IaC)
---
Infrastructure as Code (IaC) Security detecta configuraciones erróneas de IaC. De forma predeterminada, IaC Security escanea repositorios con [todas las reglas compatibles][3]. Puede personalizar qué reglas se ejecutan y en qué rutas, así como sus severidades y tipos de reglas. Configure estos ajustes bajo la clave `iac` en la configuración de Code Security, ya sea en Datadog o en un archivo `code-security.datadog.yaml`.

Para obtener información sobre las ubicaciones de configuración, la precedencia y la combinación, consulte [Referencia de configuración de Code Security][1].

## Métodos de configuración {#configuration-methods}

Puede configurar IaC Security utilizando:

- Datadog o un archivo `code-security.datadog.yaml` para configuraciones de reglas, severidad, tipos de reglas y rutas en todo el repositorio. Utilice este método cuando desee que la misma configuración se aplique en todo un repositorio u organización.
- Comentarios en línea para exclusiones locales específicas de archivos que deben permanecer con el archivo IaC. Utilice este método cuando una excepción se aplique a una línea, bloque o archivo específico.

## Formato de configuración {#configuration-format}

El siguiente formato de configuración se aplica a todas las ubicaciones de configuración: nivel de organización, nivel de repositorio y nivel de repositorio (archivo).

El archivo de configuración debe comenzar con `schema-version: v1.4`, seguido de una clave `iac` que contenga la configuración de análisis.

La estructura completa es la siguiente:

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  # Do not run these rules.
  ignore-rules:
    - A
    - B
  # Run only these rules. If this field is set, all other rules are ignored.
  use-rules:
    - A
  global-config:
    # Only analyze the following paths/files.
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files.
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    # Do not report findings with these severities.
    ignore-severities:
      - low
      - info
    # Report only findings with these severities.
    only-severities:
      - high
      - critical
    # Do not report findings with these rule types.
    ignore-categories:
      - "Best Practices"
    # Report only findings with these rule types.
    only-categories:
      - "Encryption"
    # Do not run rules from these platforms.
    ignore-platforms:
      - Dockerfile
    # Only run rules from these platforms.
    only-platforms:
      - Terraform
      - Kubernetes
      - CICD
  # Per-rule configurations.
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      ignore-paths:
        - "test/"
      severity: low
    kubernetes-deployment-without-resource-limits:
      only-paths:
        - "k8s/production/"
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

La clave `iac` admite los siguientes campos:

| **Propiedad** | **Tipo** | **Descripción** |
| --- | --- | --- |
| `ignore-rules` | Matriz | Una lista de IDs de reglas para ignorar. |
| `use-rules` | Matriz | Una lista de IDs de reglas para ejecutar. Si se especifica, _solo_ se ejecutan estas reglas. `ignore-rules` tiene prioridad sobre `use-rules`: una regla en ambas matrices es ignorada. |
| `global-config` | Objeto | Configuración global para el escáner de IaC. |
| `rule-configs` | Objeto | Configuraciones por regla. Las claves son IDs de regla. |

## Configuración de regla {#rule-configuration}

Para modificar qué reglas se ejecutan:

- **Ejecutar solo reglas específicas**: liste bajo `use-rules`
- **Deshabilitar reglas específicas**: liste bajo `ignore-rules`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  ignore-rules:
    - A
    - B
{{< /code-block >}}

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  use-rules:
    - A
{{< /code-block >}}

Reemplace marcadores de posición como `A` y `B` con IDs de regla de Code Security. Los IDs de regla heredados también son compatibles para compatibilidad con versiones anteriores.

## Configuración global {#global-configuration}

El objeto `global-config` controla la configuración de todo el repositorio:

| **Propiedad** | **Tipo** | **Descripción** |
| --- | --- | --- |
| `only-paths` | Matriz | Rutas de archivo o patrones glob. Solo se analizan los archivos que coinciden. |
| `ignore-paths` | Matriz | Rutas de archivo o patrones glob para excluir. Los archivos que coinciden no se analizan. |
| `only-severities` | Matriz | Niveles de severidad a reportar. Los hallazgos con otras severidades no son reportados. |
| `ignore-severities` | Matriz | Niveles de severidad a ignorar. |
| `only-categories` | Array | Tipos de regla a reportar. Los hallazgos con otros tipos de regla no se reportan. |
| `ignore-categories` | Array | Tipos de regla a ignorar. |
| `ignore-platforms` | Array | Plataformas a omitir. Las reglas de estas plataformas no se aplican. |
| `only-platforms` | Array | Plataformas a escanear. Las reglas de otras plataformas no se aplican. |

### Niveles de gravedad {#severities}

Use `ignore-severities` para ignorar hallazgos basados en el nivel de gravedad. Use `only-severities` para reportar solo niveles de gravedad específicos.

**Valores posibles:**

- `critical`
- `high`
- `medium`
- `low`
- `info`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-severities:
      - info
      - low
{{< /code-block >}}

### Rutas {#paths}

Use `ignore-paths` para excluir archivos o directorios específicos del escaneo. Use `only-paths` para escanear solo archivos o directorios específicos. Estas opciones admiten patrones glob.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
{{< /code-block >}}

### Tipos de regla {#rule-types}

Use `ignore-categories` para ignorar hallazgos con tipos de regla específicos. Use `only-categories` para reportar solo tipos de regla específicos.

**Valores posibles:**

- `Access Control`
- `Availability`
- `Backup`
- `Best Practices`
- `Bill Of Materials`
- `Build Process`
- `Encryption`
- `Insecure Configurations`
- `Insecure Defaults`
- `Least Privilege`
- `Networking and Firewall`
- `Observability`
- `Resource Management`
- `Secret Management`
- `Structure and Semantics`
- `Supply-Chain`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-categories:
      - "Access Control"
      - "Best Practices"
{{< /code-block >}}

### Plataformas {#platforms}

Use `ignore-platforms` para omitir plataformas específicas. Use `only-platforms` para restringir el escaneo a plataformas específicas.

**Valores posibles:**

- `Ansible`
- `CICD`
- `CloudFormation`
- `Dockerfile`
- `Kubernetes`
- `Terraform`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    only-platforms:
      - Terraform
      - Kubernetes
{{< /code-block >}}

## Configuración por regla {#per-rule-configuration}

Use `rule-configs` para configurar reglas individuales.

Cada clave bajo `rule-configs` es un ID de regla. Se admiten las siguientes propiedades por regla:

| **Propiedad** | **Tipo** | **Descripción** |
| --- | --- | --- |
| `only-paths` | Matriz | Rutas de archivo o patrones glob. La regla se aplica solo a los archivos que coinciden con estos patrones. |
| `ignore-paths` | Matriz | Rutas de archivo o patrones glob para excluir. La regla no se aplica a los archivos que coinciden con estos patrones. |
| `arguments` | Objeto | Parámetros específicos de la regla que ajustan el comportamiento de la misma. Los nombres de los argumentos y los tipos de valor admitidos dependen de la regla. |
| `severity` | Cadena | Anula la gravedad de los hallazgos generados por esta regla. Valores aceptados: `critical`, `high`, `medium`, `low`, `info`. |

### Alcance de ruta por regla {#per-rule-path-scoping}

Excluya una regla de ciertas rutas, o limítela a rutas específicas:

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      # Do not apply this rule in test directories.
      ignore-paths:
        - "test/"
        - "**/testdata/"
    kubernetes-deployment-without-resource-limits:
      # Apply this rule only in production manifests.
      only-paths:
        - "k8s/production/"
{{< /code-block >}}

Los patrones de ruta admiten sintaxis glob (`*`, `**`, `?`). Las rutas son relativas a la raíz del repositorio.

### Anulación de gravedad por regla {#per-rule-severity-override}

Cambie la gravedad de los hallazgos generados por una regla específica:

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      severity: low
{{< /code-block >}}

Esta gravedad se aplica a todos los hallazgos generados por esa regla.

### Argumentos por regla {#per-rule-arguments}

Use `arguments` para establecer parámetros para una regla específica. Los nombres de los argumentos y los tipos de valor admitidos dependen de la regla. Defina los argumentos bajo el ID de la regla en `rule-configs`.

El siguiente ejemplo configura la regla `cicd-github-unpinned-actions-full-length-commit-sha` y permite la acción `libbpf/ci/run-qemu`:

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

## Configuración heredada {#legacy-configuration}

IaC Security utilizaba anteriormente un archivo de configuración (`dd-iac-scan.config`) y un esquema diferentes. Este esquema está obsoleto y no recibe nuevas actualizaciones, pero está [documentado][2] en el repositorio `datadog-iac-scanner`.

Un archivo `code-security.datadog.yaml` con una sección `iac` tiene prioridad sobre `dd-iac-scan.config` si ambos están presentes.

## Configure exclusiones con un comentario en línea {#configure-exclusions-with-an-inline-comment}

Para controlar qué partes de un archivo se escanean, agregue un comentario que contenga `dd-iac-scan`, seguido de un comando y cualquier valor requerido. Anteponga `dd-iac-scan` con la sintaxis de comentario para el formato de archivo. Las exclusiones en línea se aplican solo dentro del archivo donde se utilizan.

### Comandos admitidos {#supported-commands}

| **Comentario**                      | **Descripción**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | Ignora el archivo completo.        |
| `dd-iac-scan disable=<rule_id>`  | Ignora reglas específicas.         |
| `dd-iac-scan enable=<rule_id>`   | Incluye solo reglas específicas.   |
| `dd-iac-scan ignore-line`        | Ignora una sola línea.          |
| `dd-iac-scan ignore-block`       | Ignora un bloque completo.        |

#### dd-iac-scan ignore {#dd-iac-scan-ignore}

Excluye el archivo completo del escaneo. Este comentario debe colocarse al principio del archivo para que surta efecto.

{{< code-block lang="yaml" >}}
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

#### dd-iac-scan disable=rule_id {#dd-iac-scan-disablerule-id}

Excluye los resultados del escaneo para las reglas especificadas en este archivo. Este comentario debe colocarse al principio del archivo para que surta efecto.

{{< code-block lang="yaml" >}}
# dd-iac-scan disable=A,B

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

Los hallazgos de las reglas especificadas se ignoran para este archivo. Los IDs de regla heredados también son compatibles para compatibilidad con versiones anteriores.

#### dd-iac-scan enable=rule_id {#dd-iac-scan-enablerule-id}

Limita los resultados del escaneo en este archivo solo a las reglas especificadas. Este comentario debe colocarse al principio del archivo para que surta efecto.

{{< code-block lang="yaml" >}}
# dd-iac-scan enable=A

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

Solo se incluyen los hallazgos de las reglas especificadas en los resultados del escaneo para este archivo. Los IDs de regla heredados también son compatibles para compatibilidad con versiones anteriores.

#### dd-iac-scan ignore-line {#dd-iac-scan-ignore-line}

Evita que los resultados del escaneo marquen la línea inmediatamente después de este comentario. Este comentario puede colocarse en cualquier parte del archivo.

{{< highlight yaml "hl_lines=3" >}}
resource "google_storage_bucket" "example" {
  # dd-iac-scan ignore-line
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

En el ejemplo anterior, los hallazgos en la línea resaltada se ignoran.

#### dd-iac-scan ignore-block {#dd-iac-scan-ignore-block}

Evita que los resultados del escaneo marquen un bloque de recursos completo y todos sus pares clave-valor. Este comentario puede colocarse en cualquier parte del archivo.

{{< highlight yaml "hl_lines=2-6" >}}
# dd-iac-scan ignore-block
resource "google_storage_bucket" "example" {
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

En el ejemplo anterior, los hallazgos en el bloque resaltado se ignoran.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/guides/configuration/
[2]: https://github.com/DataDog/datadog-iac-scanner/blob/main/legacy_config.md
[3]: /es/security/code_security/iac_security/iac_rules/