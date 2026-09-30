---
aliases:
- /es/security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evita que los errores de configuración de la nube lleguen a la producción
    con la seguridad de IaC de Datadog
- link: /security/code_security/iac_security
  tag: Documentación
  text: Seguridad de IaC
- link: /security/code_security/iac_security/setup
  tag: Documentación
  text: Configurar la seguridad de IaC para Code Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentación
  text: Reglas de seguridad de IaC
title: Configurar exclusiones de seguridad de IaC
---

La seguridad de Infrastructure as Code (IaC) detecta errores de configuración de seguridad en los archivos de Terraform. Las exclusiones permiten controlar qué hallazgos aparecen en los resultados del análisis ignorando reglas, archivos o categorías de problemas específicos.

## Métodos de exclusión

Puedes configurar las exclusiones mediante:

- Un archivo de configuración para definir exclusiones para niveles de gravedad, rutas de archivos, ID de consulta y categorías.
- Comentarios en línea para ignorar resultados específicos dentro de los archivos de Terraform.

<div class="alert alert-info">Si se define una exclusión tanto en el archivo de configuración como en un comentario en línea, el archivo de configuración tiene prioridad.</div>

## Configurar exclusiones con un archivo de configuración

1. Crea un archivo llamado `dd-iac-scan.config` en el directorio raíz de tu repositorio del proyecto.
1. Añade las exclusiones necesarias en formato YAML, JSON, TOML o HCL.
1. Confirma el archivo `dd-iac-scan.config` en tu repositorio.

### Exclusiones admitidas

#### Excluir gravedades

Utiliza `exclude-severities` para excluir resultados en función del nivel de gravedad. Para proporcionar varios valores a esta opción, puedes configurarla varias veces o introducir una lista.

**Valores posibles:**
- `critical`
- `high`
- `medium`
- `low`
- `info`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-severities:
  - "info"
  - "low"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-severities": [
     "info",
     "low"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-severities = [ "info", "low" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-severities" = ["info", "low"]
```

{{% /tab %}}
{{< /tabs >}}

#### Excluir rutas

Utiliza `exclude-paths` para excluir archivos o directorios específicos del análisis. Esta opción admite patrones glob. Para proporcionar varios valores a esta opción, puedes configurarla varias veces o introducir una lista.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-paths:
  - "./shouldNotScan/*"
  - "dir/somefile.txt"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-paths": [
     "./shouldNotScan/*",
     "dir/somefile.txt"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-paths = [ "./shouldNotScan/*", "dir/somefile.txt" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-paths" = ["./shouldNotScan/*", "dir/somefile.txt"]
```

{{% /tab %}}
{{< /tabs >}}

#### Excluir consultas

Utiliza `exclude-queries` para excluir consultas específicas por su ID de consulta. Para proporcionar varios valores a esta opción, puedes establecer la opción varias veces o pasar una lista.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-queries:
  - "e69890e6-fce5-461d-98ad-cb98318dfc96"
  - "4728cd65-a20c-49da-8b31-9c08b423e4db"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-queries": [
     "e69890e6-fce5-461d-98ad-cb98318dfc96",
     "4728cd65-a20c-49da-8b31-9c08b423e4db"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-queries = [ "e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-queries" = ["e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db"]
```

{{% /tab %}}
{{< /tabs >}}

#### Excluir categorías

Utiliza `exclude-categories` para excluir categorías específicas. Esta opción puede utilizarse varias veces o como representación de cadena de una lista.

**Valores posibles**:  
- `Access Control`  
- `Availability`  
- `Backup`  
- `Best Practices`  
- `Build Process`  
- `Encryption`  
- `Insecure Configurations`  
- `Insecure Defaults`  
- `Networking and Firewall`  
- `Observability`  
- `Resource Management`  
- `Secret Management`  
- `Supply-Chain`  
- `Structure and Semantics`  
- `Bill Of Materials`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-categories:
  - "Access Control"
  - "Best Practices"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-categories": [
     "Access Control",
     "Best Practices"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-categories = [ "Access Control", "Best Practices" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-categories" = ["Access Control", "Best Practices"]
```

{{% /tab %}}
{{< /tabs >}}

## Configurar exclusiones con un comentario en línea

Para controlar qué partes de un archivo se analizan, añade un comentario que empiece por `# dd-iac-scan`, seguido de un comando y los valores necesarios. Las exclusiones en línea solo se aplican dentro del archivo en el que se utilizan.

<div class="alert alert-info">Si se define una exclusión tanto en el archivo de configuración como en un comentario en línea, el archivo de configuración tiene prioridad.</div>

### Comandos compatibles

| **Comentario**                      | **Descripción**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | Ignora todo el archivo.        |
| `dd-iac-scan disable=<query_id>` | Ignora consultas específicas.       |
| `dd-iac-scan enable=<query_id>`  | Incluye solo consultas específicas. |
| `dd-iac-scan ignore-line`        | Ignora una sola línea.          |
| `dd-iac-scan ignore-block`       | Ignora un bloque entero.        |

#### dd-iac-scan ignore

Excluye todo el archivo del análisis. Este comentario debe colocarse al principio del archivo para que surta efecto.

```
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

#### dd-iac-scan disable=query_id

Excluye los resultados del análisis de las consultas especificadas en este archivo. Este comentario debe colocarse al principio del archivo para que surta efecto.

```
# dd-iac-scan disable=e592a0c5-5bdb-414c-9066-5dba7cdea370,e69890e6-fce5-461d-98ad-cb98318dfc96

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

Los resultados de las consultas especificadas se ignoran para este archivo.

#### dd-iac-scan enable=query_id

Limita los resultados del escaneo en este archivo solo a las consultas especificadas. Este comentario debe colocarse al principio del archivo para que surta efecto.  


```
# dd-iac-scan enable=e592a0c5-5bdb-414c-9066-5dba7cdea370

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

Solo los resultados de las consultas especificadas se incluyen en los resultados del análisis de este archivo.

#### dd-iac-scan ignore-line

Evita que los resultados del análisis marquen la línea inmediatamente posterior a este comentario. Este comentario puede colocarse en cualquier parte del archivo.

```
1: resource "google_storage_bucket" "example" {
2:  # dd-iac-scan ignore-line
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

Se ignoran los resultados de la línea 3.

#### dd-iac-scan ignore-block

Evita que los resultados del análisis marquen un bloque de recursos completo y todos sus pares clave-valor. Este comentario puede colocarse en cualquier parte del archivo.

```
1: # dd-iac-scan ignore-block
2: resource "google_storage_bucket" "example" {
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

Se ignoran los resultados relacionados con todo el bloque (líneas 2-6 en este ejemplo).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}