---
algolia:
  tags:
  - iac security
  - infrastructure as code
  - custom rule
  - rego
description: Cree, pruebe y publique reglas personalizadas de Infrastructure as Code
  Security con Rego.
further_reading:
- link: https://www.datadoghq.com/blog/custom-iac-security-rules/
  tag: Blog
  text: Aplique reglas personalizadas en el escaneo de Datadog IaC Security
- link: /security/mcp_server/
  tag: Documentación
  text: Herramientas de Security del Datadog MCP Server
title: IaC Custom Rules
---
Cree reglas de seguridad personalizadas para aplicar requisitos específicos de su organización.

Las reglas personalizadas utilizan [Rego][1], el lenguaje de políticas de Open Policy Agent (OPA), y se ejecutan junto con las reglas predeterminadas de Datadog durante los escaneos de IaC. La *regla* es el objeto guardado (metadatos, muestra, descripción), mientras que la *política* es el bloque de Rego evaluado en el editor.

Las reglas personalizadas están disponibles para estas plataformas:

- Ansible
- CI/CD (GitHub Actions)
- AWS CloudFormation
- Dockerfile
- Kubernetes
- Terraform

La creación, edición o publicación de reglas personalizadas requiere el permiso `appsec_vm_write`. Para obtener más información, consulte [Role Based Access Control][6]. Para obtener detalles sobre el contrato de reglas, las entradas de parseo y los patrones específicos de la plataforma, consulte la [Referencia de reglas personalizadas de IaC][2].

Existen dos opciones para crear reglas personalizadas: clonar una regla existente o crear una regla desde cero. También puede utilizar un Agent de IA conectado al Datadog MCP Server. Consulte [Create and manage rules with MCP](#create-and-manage-rules-with-mcp).

## Clonar una regla existente {#clone-an-existing-rule}

Clone una regla predeterminada cuando desee modificar una verificación existente, evaluar el mismo tipo de recurso que una regla existente o utilizar bibliotecas de Rego de Datadog compartidas para el parseo específico de la plataforma, la nomenclatura de recursos o las ubicaciones del código fuente.

1. En la página de reglas de IaC, busque una regla predeterminada o personalizada para la misma plataforma y tipo de recurso, y seleccione {{< ui >}}Clone{{< /ui >}} en el menú de acciones de la regla.
1. Actualice los metadatos, la política, el archivo de muestra y la descripción copiados.
1. Haga clic en {{< ui >}}Save as draft{{< /ui >}} para guardar la regla sin publicarla, o haga clic en {{< ui >}}Save and publish{{< /ui >}} para publicar la regla de inmediato.

   Las reglas en borrador no se ejecutan en los escaneos. Para publicar un borrador más tarde, ábralo desde la página de Reglas de IaC y publíquelo.

De forma predeterminada, las reglas publicadas se ejecutan en los escaneos de IaC posteriores donde se aplica la plataforma especificada. Para refinar cómo se aplican las reglas, consulte [Configuración de IaC Security][5].

## Crear una regla desde cero {#create-a-rule-from-scratch}

Cree una regla desde cero cuando necesite una verificación enfocada y comprenda la estructura de parseo para su plataforma. El editor proporciona una política inicial y un archivo de muestra.

Este ejemplo crea una regla de Terraform que detecta un recurso `aws_s3_bucket_versioning` cuyo estado está configurado explícitamente como `Suspended`. La regla informa el atributo inseguro y proporciona una corrección sugerida.

Los pasos se aplican a cualquier plataforma. Solo cambian el archivo de muestra y la política Rego.

### Nombre y configure la regla {#name-and-configure-the-rule}

1. En la página de Reglas de IaC, haga clic en {{< ui >}}Create rule{{< /ui >}}.
1. Ingrese un nombre de regla, luego seleccione la plataforma, la categoría y la gravedad.

   Opcionalmente, puede establecer **AWS** como proveedor y especificar un identificador de Common Weakness Enumeration (CWE).

### Agregue un archivo de muestra {#add-a-sample-file}

El archivo de muestra es la entrada contra la que se ejecuta su política, por lo que debe contener la configuración incorrecta que desea detectar. Para esta regla, reemplace la muestra inicial en {{< ui >}}Test your policy{{< /ui >}} con:

```hcl
resource "aws_s3_bucket" "reports" {
  bucket = "example-reports-bucket"
}

resource "aws_s3_bucket_versioning" "reports" {
  bucket = aws_s3_bucket.reports.id

  versioning_configuration {
    status = "Suspended"
  }
}
```

Datadog realiza el parseo de los recursos de Terraform en `input.document[i].resource`, agrupados por tipo de recurso y etiqueta de recurso. La regla puede seleccionar el recurso de versionado con:

```rego
some i, name
versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
```

En esta expresión, `i` identifica el documento parseado y `name` es la etiqueta del recurso de Terraform, `reports`.

### Escriba la condición de detección {#write-the-detection-condition}

La condición de detección es la expresión que debe ser verdadera para que la regla reporte un hallazgo. Esta regla produce un hallazgo cuando el estado de versionado es `Suspended`:

```rego
versioning.versioning_configuration.status == "Suspended"
```

Si el campo de estado falta, la regla no reporta un hallazgo. Consulte [Entrada analizada][3] para obtener detalles.

### Construya el hallazgo {#build-the-finding}

El hallazgo es lo que Datadog reporta cuando la condición de detección coincide. Identifica qué recurso está afectado, dónde se encuentra en la fuente y cómo corregirlo. Ensamble las piezas en una política completa.

Esta política de ejemplo tiene cuatro partes:

- Envuelve la condición de detección en una regla `DatadogPolicy`.
- Selecciona cada recurso `aws_s3_bucket_versioning`.
- Reporta un hallazgo solo cuando el estado es `Suspended`.
- Agrega un objeto `result` con los cuatro campos requeridos, incluida una remediación sugerida.

Esta política también sigue tres prácticas generales: una biblioteca compartida para nombres de recursos, un `searchKey` preciso y una remediación `replacement`.

En {{< ui >}}Rego policy{{< /ui >}}, reemplace la política inicial con:

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
	versioning.versioning_configuration.status == "Suspended"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket_versioning",
		"resourceName": tf_lib.resolve_s3_bucket_name(versioning, name),
		"searchKey": sprintf("aws_s3_bucket_versioning[%s].versioning_configuration.status", [name]),
		"remediation": json.marshal({
			"before": "Suspended",
			"after": "Enabled",
		}),
		"remediationType": "replacement",
	}
}
```

### Pruebe la regla {#test-the-rule}

1. Haga clic en {{< ui >}}Run{{< /ui >}}.
1. Confirme que el editor reporte un hallazgo en el atributo `status`.
1. Cambie `status` en el ejemplo de `Suspended` a `Enabled`.
1. Haga clic en {{< ui >}}Run{{< /ui >}} y confirme que la política no informe hallazgos.
1. Restaure `status` a `Suspended` y ejecute la política nuevamente antes de guardar el ejemplo.

Si el editor informa un error en lugar de un resultado de evaluación, consulte [Validación][4].

### Describa la regla {#describe-the-rule}

Utilice el campo {{< ui >}}Say what's happening{{< /ui >}} para proporcionar una descripción y consejos de corrección, por ejemplo:

```markdown
## Description

Suspending S3 bucket versioning prevents new object versions from being created and reduces protection against accidental deletion or overwrite.

## Remediation

Set `versioning_configuration.status` to `Enabled`.
```

### Guarde la regla {#save-the-rule}

- Haga clic en {{< ui >}}Save as draft{{< /ui >}} para guardar la regla sin publicarla. Las reglas en borrador no se ejecutan en los escaneos. Para publicar un borrador más tarde, ábralo desde la página de Reglas de IaC y publíquelo.
- Haga clic en {{< ui >}}Save and publish{{< /ui >}} para publicar la regla inmediatamente.

De forma predeterminada, las reglas publicadas se ejecutan en los escaneos de IaC posteriores donde se aplica la plataforma especificada. Para refinar cómo se aplican las reglas, consulte [Configuración de IaC Security][5].

## Crear y administrar reglas con MCP {#create-and-manage-rules-with-mcp}

Conecte un Agent de IA al [Datadog MCP Server][7] para generar, validar, crear, actualizar, publicar y eliminar reglas personalizadas de IaC a partir de una descripción en lenguaje natural o su propio Rego. Habilite el conjunto de herramientas `security` cuando se [conecte al MCP Server][8]. Para obtener una lista de las herramientas disponibles y sus permisos requeridos, consulte [Reglas personalizadas de IaC][9] en la referencia de herramientas de Security del Datadog MCP Server.

## Revisiones de la regla {#rule-revisions}

Editar una regla crea una nueva revisión. Desde el panel de detalles de la regla, puede:

- Revisar el historial de revisiones de la regla.
- Comparar dos revisiones cualesquiera para ver qué cambió.
- Restaurar una revisión anterior para convertirla en el estado actual de la regla.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /es/security/code_security/iac_security/custom_rules/guide/
[3]: /es/security/code_security/iac_security/custom_rules/guide/#parsed-input
[4]: /es/security/code_security/iac_security/custom_rules/guide/#validation
[5]: /es/security/code_security/iac_security/configuration/#rule-configuration
[6]: /es/account_management/rbac/permissions/#cloud-security-platform
[7]: /es/mcp_server/
[8]: /es/security/mcp_server/#quickstart
[9]: /es/security/mcp_server/#infrastructure-as-code-custom-rules