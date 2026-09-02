---
description: Consulte el contrato de Rego, las entradas analizadas, las bibliotecas
  compartidas, los campos de hallazgos y las prácticas de prueba para reglas de IaC
  personalizadas.
title: Referencia de reglas personalizadas de IaC
---
Esta referencia para reglas personalizadas de IaC describe el contrato de la regla, las entradas analizadas y los patrones específicos de la plataforma.

Para obtener orientación sobre la creación de reglas personalizadas y un ejemplo de cómo crear una regla desde cero, consulte [Reglas personalizadas de IaC][2].

## Contrato de la regla {#rule-contract}

Datadog evalúa las reglas personalizadas como [Rego][1] v1. Cada regla personalizada debe:

- Declarar `package datadog`.
- Definir al menos una regla de conjunto parcial llamada `DatadogPolicy`.

   Puede definir múltiples `DatadogPolicy` reglas en la misma política. Cada evaluación exitosa produce un hallazgo independiente.

- Agregue un `result` objeto a `DatadogPolicy` por cada infracción.
- Establezca cada [campo de resultado requerido](#result-fields).

Esta regla de Terraform cumple con el contrato:

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	resource := input.document[i].resource.aws_s3_bucket[name]
	resource.acl == "public-read"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket",
		"resourceName": tf_lib.resolve_s3_bucket_name(resource, name),
		"searchKey": sprintf("aws_s3_bucket[%s].acl", [name]),
	}
}
```

## Entrada analizada {#parsed-input}

Datadog analiza el archivo de muestra y lo expone a Rego bajo `input.document`. Cada elemento contiene un `id` y campos específicos de la plataforma. Por ejemplo:

```rego
some i, document in input.document
```

Para cada plataforma, establezca `documentId` en el `id` del documento analizado que produjo el hallazgo. La plataforma determina cómo recorrer el resto del documento, no cómo derivar `documentId`.

Rego trata una referencia a un campo faltante como indefinida. Una expresión de igualdad en un campo indefinido no produce un hallazgo. Use `object.get`, `not`, o ayudantes como `data.generic.common.valid_key` cuando una regla deba distinguir los atributos faltantes de los valores explícitos.

## Campos de resultado {#result-fields}

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `documentId` | Sí | La `id` del documento analizado que contiene la infracción. |
| `resourceType` | Sí | El tipo real de recurso que se está reportando, como `aws_s3_bucket`, `Pod`, o `AWS::S3::Bucket`. |
| `resourceName` | Sí | Un nombre útil para el recurso, como una etiqueta de recurso de Terraform, un nombre de metadatos de Kubernetes o un ID lógico de CloudFormation. |
| `searchKey` | Sí | Un localizador específico de la plataforma para resaltar el contenido de la fuente. |
| `remediation` | No | Un cambio de la fuente aplicable por máquina. Establézcalo junto con `remediationType`. |
| `remediationType` | No | La operación aplicada por la corrección. Establézcalo junto con `remediation`. |

La sección `## Remediation` en la descripción de la regla es una guía legible para humanos. Los campos de resultado opcionales `remediation` y `remediationType` describen un cambio de la fuente automatizado.

### Formatos de corrección {#remediation-formats}

Use `addition` para insertar un atributo o bloque faltante. Establezca `remediation` en el texto de la fuente a insertar:

```rego
"remediation": "versioning {\n\tenabled = true\n}",
"remediationType": "addition",
```

Use `replacement` para cambiar un valor existente. Codifique el valor actual aceptado y su reemplazo:

```rego
"remediation": json.marshal({
	"before": "Suspended",
	"after": "Enabled",
}),
"remediationType": "replacement",
```

Use `removal` para eliminar el contenido identificado por la ubicación del hallazgo. Establezca `remediation` en una breve explicación de lo que se elimina:

```rego
"remediation": "Remove the insecure resource.",
"remediationType": "removal",
```

Si una regla no puede proporcionar una edición automatizada confiable, omita ambos campos de remediación y explique la corrección manual en la descripción de la regla.

### Ubicaciones de hallazgo {#finding-locations}

`searchKey` es un localizador de la fuente específico del escáner, no una ruta de Rego. Su formato depende de la plataforma.

En varias plataformas, las reglas predeterminadas envuelven los valores insertados en llaves dobles dentro de la cadena de formato, por ejemplo <code>sprintf("run=&#123;&#123;%s&#125;&#125;", [run])</code>. Eso produce localizadores como `run={{checkout}}`. The platform input patterns include equivalent `concat` or nested `sprintf` construcciones que puede pegar en el editor.

Utilice la ubicación estable más precisa disponible:

- Apunte al atributo inseguro exacto cuando exista.
- Para un atributo faltante, apunte al recurso o bloque de propiedades que lo contiene.
- Incluya valores de identificación con `={{...}}` cuando un archivo pueda contener claves repetidas.
- Incluya la identidad de la carga de trabajo, tarea, etapa, trabajo o contenedor al informar sobre un objeto anidado.

Los localizadores imprecisos como `"tasks"` o `"metadata.name"` pueden resaltar la línea incorrecta cuando un archivo contiene múltiples recursos o contenedores. Utilice el marcador del editor para verificar la ubicación con una muestra representativa.

## Bibliotecas compartidas {#shared-libraries}

Las reglas personalizadas pueden importar bibliotecas comunes y de plataforma de Datadog:

```rego
import data.generic.common as common_lib
import data.generic.terraform as tf_lib
```

Estos paquetes de plataforma están disponibles:

- `data.generic.ansible`
- `data.generic.cicd`
- `data.generic.cloudformation`
- `data.generic.dockerfile`
- `data.generic.k8s`
- `data.generic.terraform`

Las bibliotecas compartidas manejan comportamientos que son difíciles de reproducir con acceso directo a campos. Los ejemplos incluyen alias de módulos de Ansible, formularios de activación de GitHub Actions, especificaciones de pods de carga de trabajo de Kubernetes, nombres de recursos de Terraform y referencias de CloudFormation.

## Patrones de entrada de plataforma {#platform-input-patterns}

Los ejemplos en esta sección muestran patrones orientados a la producción a partir de reglas predeterminadas. Las políticas iniciales en el editor son intencionalmente más pequeñas y es posible que solo manejen la muestra proporcionada. Cuando una regla predeterminada evalúa un recurso similar, clónela para preservar sus ayudantes de plataforma, la ubicación de la fuente y las restricciones de correlación de recursos.

### Ansible {#ansible}

Los módulos de Ansible pueden aparecer bajo nombres cortos, nombres de colección totalmente calificados y otros alias. Utilice la biblioteca de Ansible para iterar sobre tareas y variantes de módulos:

```rego
import data.generic.ansible as ans_lib

canonical := "uri"

some id, task_index
task := ans_lib.tasks[id][task_index]
some variant in ans_lib.variants_for(canonical)
module := task[variant]
ans_lib.checkState(module)
```

Utilice el nombre canónico del módulo como `resourceType`, `ans_lib.resource_name` para el nombre del recurso, e incluya la tarea y la variante del módulo en `searchKey`. Las reglas predeterminadas a menudo utilizan una sola cadena de formato como <code>sprintf("name=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;.url", [task.name, variant])</code>. La construcción equivalente es:

```rego
"searchKey": sprintf("name=%s.%s.url", [
	concat("", ["{{", task.name, "}}"]),
	concat("", ["{{", variant, "}}"]),
])
```

### CI/CD {#cicd}

Las reglas personalizadas de CI/CD evalúan los flujos de trabajo de GitHub Actions. Los disparadores de flujo de trabajo pueden ser cadenas, matrices u objetos, así que utilice la biblioteca de CI/CD en lugar de asumir una forma YAML:

```rego
import data.generic.cicd as cicd_lib

some document in input.document
cicd_lib.check_provider(document) == "github"
cicd_lib.has_dangerous_trigger(document)
```

Las reglas predeterminadas utilizan tipos de recursos como `github_action`, `github_workflow`, `github_job` y `github_step`. Para valores de paso, un localizador literal como <code>sprintf("uses=&#123;&#123;%s&#125;&#125;", [uses])</code> identifica la línea exacta de la fuente.

### AWS CloudFormation {#aws-cloudformation}

Los recursos de CloudFormation se identifican por ID lógico bajo `Resources`:

```rego
import data.generic.cloudformation as cf_lib

some document in input.document
some logical_id, resource in document.Resources
resource.Type == "AWS::S3::Bucket"
```

Utilice `resource.Type` como tipo de recurso y `cf_lib.resource_name(resource, logical_id)` para el nombre. Una propiedad faltante puede anclarse a su bloque contenedor:

```rego
"searchKey": sprintf("Resources.%s.Properties", [logical_id])
```

### Dockerfile {#dockerfile}

Las instrucciones de Dockerfile se agrupan bajo `document.command` por etapa de compilación:

```rego
import data.generic.dockerfile as dockerfile_lib

some i, stage
instruction := input.document[i].command[stage][_]
instruction.Cmd == "add"
not dockerfile_lib.arrayContains(instruction.Value, {".tar", ".tar."})
```

Incluya la etapa de compilación y la instrucción original en el localizador. Las reglas predeterminadas a menudo utilizan <code>sprintf("FROM=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;", [stage, instruction.Original])</code>:

```rego
"searchKey": sprintf("FROM=%s.%s", [
	concat("", ["{{", stage, "}}"]),
	concat("", ["{{", instruction.Original, "}}"]),
])
```

### Kubernetes {#kubernetes}

Las comprobaciones de Kubernetes a menudo se aplican a Pods y a especificaciones de pod anidadas en cargas de trabajo como Deployments. Utilice `spec_info` para localizar la especificación de pod efectiva:

```rego
import data.generic.k8s as k8s_lib

some document in input.document
spec_info := k8s_lib.spec_info(document)
some container in spec_info.spec.containers
container.securityContext.privileged == true
```

Incluya el nombre de la carga de trabajo, la ruta de la especificación de pod, el nombre del contenedor y el campo inseguro en `searchKey`. Las reglas predeterminadas a menudo utilizan <code>sprintf("metadata.name=&#123;&#123;%s&#125;&#125;.%s.containers.name=&#123;&#123;%s&#125;&#125;.securityContext.privileged", [document.metadata.name, spec_info.path, container.name])</code>:

```rego
"searchKey": sprintf(
	"metadata.name=%s.%s.containers.name=%s.securityContext.privileged",
	[
		concat("", ["{{", document.metadata.name, "}}"]),
		spec_info.path,
		concat("", ["{{", container.name, "}}"]),
	],
)
```

Verifique `initContainers` por separado cuando el mismo requisito se aplique a los contenedores de inicialización.

### Terraform {#terraform}

Los recursos de Terraform se agrupan por tipo de recurso y etiqueta:

```rego
some i, name
resource := input.document[i].resource.aws_s3_bucket[name]
```

Utilice el tipo de recurso del proveedor como `resourceType`. Los ayudantes de la plataforma pueden resolver nombres para recursos que utilizan campos como `bucket`, `cluster_id` o `name`:

```rego
import data.generic.terraform as tf_lib

"resourceName": tf_lib.resolve_s3_bucket_name(resource, name)
```

Los valores de Terraform `searchKey` generalmente comienzan con el tipo de recurso y la etiqueta:

```rego
"searchKey": sprintf("aws_s3_bucket[%s].acl", [name])
```

Las versiones del proveedor pueden mover la configuración a recursos separados. Utilice una regla predeterminada equivalente como punto de partida cuando la verificación deba cubrir múltiples versiones de proveedores, módulos, recursos relacionados o JSON de plan de Terraform. Una regla que verifica solo un valor de atributo explícito, como el estado de control de versiones de `Suspended`, no detecta recursos faltantes.

## Correlación de recursos {#resource-correlation}

Algunas verificaciones comparan múltiples recursos, módulos, trabajos o cargas de trabajo. Evite uniones sin restricciones en todo `input.document`, ya que pueden asociar recursos no relacionados y producir hallazgos duplicados.

Conserve las restricciones de documento, espacio de nombres, flujo de trabajo, etapa de compilación y referencia de recursos al adaptar una regla existente.

## Cobertura de pruebas {#test-coverage}

Pruebe al menos lo siguiente:

- Una configuración que debe producir un hallazgo.
- Una configuración compatible que no debe producir un hallazgo.
- Valores faltantes y explícitos cuando los valores predeterminados son importantes.
- Múltiples recursos en un archivo.
- Sintaxis alternativa admitida por la plataforma, como alias de módulos de Ansible o formularios de activación de GitHub Actions.
- Recursos relacionados en ámbitos separados cuando la regla realiza una correlación.

## Validación {#validation}

El editor verifica más que la sintaxis de Rego. Antes de evaluar una muestra, Datadog verifica que la política cumpla con los requisitos en la sección [Contrato de regla](#rule-contract) y, además, que:

- Utiliza el número correcto de argumentos en las llamadas a `sprintf`.
- Se compila con las bibliotecas comunes y las de la plataforma seleccionada.
- No llama a built-ins restringidos como `http.send` o `opa.runtime`.

Corrija todos los errores reportados antes de interpretar una evaluación sin hallazgos. Los errores de validación significan que la política no se ejecutó correctamente.

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /es/security/code_security/iac_security/custom_rules/