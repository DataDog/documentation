---
aliases:
- /es/service_catalog/adding_metadata
- /es/tracing/service_catalog/service_metadata_structure
- /es/tracing/service_catalog/adding_metadata
- /es/service_catalog/add_metadata
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Crear y gestionar definiciones con Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Más información sobre la API de definición
- link: /integrations/github
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: Blog
  text: Importar archivos YAML de Backstage a Datadog
title: Definiciones y versiones compatibles
---

## Estructura de metadatos y versiones compatibles

El Catálogo de servicios utiliza esquemas de definición para almacenar y mostrar metadatos relevantes sobre tus servicios. Los esquemas tienen reglas de validación integradas para garantizar que sólo se aceptan valores válidos. Puedes ver las advertencias en la pestaña **Definition** (Definición), en el panel lateral del Catálogo de servicios, para cualquier servicio seleccionado. 

## Versiones compatibles

Datadog admite cuatro versiones del esquema de definición:

- [v3.0 (en vista previa)][1]: última versión con modelo de datos ampliado, soporte multipropietario, declaración manual de dependencias y funciones mejoradas para infraestructura complejas.
- [v2.2][2]: admite anotaciones de usuario para metadatos personalizados y asociaciones de pipeline de CI para vincular servicios con sus procesos de compilación.
- [v2.1][3]: admite agrupaciones de servicio para mejorar la organización e introduce campos adicionales para descripciones más completas de servicio.
- [v2][4]: versión compatible más antigua, que proporciona campos esenciales para la documentación y los metadatos básicos de servicio.

Cada versión se basa en la anterior, añadiendo nuevas funciones y manteniendo la compatibilidad con versiones anteriores. Elige la versión que mejor se adapte a tus necesidades y a la complejidad de infraestructura.

## Comparación de versiones

Cada versión admite las siguientes funciones:

| Función                       | v3.0 (en vista previa) | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Metadatos básicos                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Agrupaciones de servicio             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| Anotaciones del usuario              | {{< X >}}   | {{< X >}} |           |           |
| Asociaciones de CI Pipeline      | {{< X >}}   | {{< X >}} |           |           |
| Modelo de datos ampliado           | {{< X >}}   |           |           |           |
| Multipropiedad               | {{< X >}}   |           |           |           |
| Declaración manual de dependencia | {{< X >}}   |           |           |           |

Para obtener información detallada sobre cada versión, incluidos esquemas completos y archivos YAML de ejemplo, consulta las páginas de cada versión en [Versiones compatibles](#supported-versions).

## Añadir metadatos al catálogo de servicios

### Añadir metadatos desde la interfaz de usuario de Datadog 

1. En la página [Service Catalog][5] (Catálogo de servicios), haz clic en **Setup & Config** (Ajustes y configuración).
2. Haz clic en **Create New Entry** (Crear nueva entrada).
3. Especifica el servicio al que deseas añadir metadatos.
4. Introduce los detalles de los enlaces Equipo, De guardia, Contactos, Documentación, Repositorio de código y Otros.
5. Cambia a **YAML** o **JSON** para ver el código generado y el comando cURL.
6. Si dispones del permiso [de escritura del Catálogo de servicios][12], puedes enviar los metadatos haciendo clic en **Save Entry** (Guardar entrada) o ejecutando el comando cURL proporcionado.

### Añadir metadatos con automatización

#### Almacenar y editar definiciones en GitHub

Configurar la [integración de GitHub][6] para enlazar directamente desde donde se ve la definición de servicio en el Catálogo de servicios a donde se almacena y edita en GitHub. Datadog explora el archivo `service.datadog.yaml` en la raíz de cada repositorio con permisos de lectura.

Para instalar la integración de GitHub:
1. Navega hasta [el cuadro de integración][7].
2. Haz clic en **Link GitHub Account** (Cuenta de enlace de GitHub) en la pestaña **Repo Configuration** (Configuración del repositorio).

Cuando la integración de GitHub está configurado para tus definiciones, aparece un botón **Edit in GitHub** (Editar en GitHb) en la pestaña **Definition** (Definición) y te enlaza con GitHub para confirmar los cambios.

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="Botón Edición en GitHub aparece en la pestaña de definición de un servicio en el Catálogo de servicios" style="width:90%;" >}}

Una vez actualizados los archivos YAML de tus repositorios, los cambios se propagan al catálogo de servicios. Puedes registrar varios servicios en un archivo YAML creando varios documentos YAML. Separa cada documento con tres guiones (`---`).

Para evitar sobrescrituras accidentales, crea y modifica tus archivos de definición con la integración de GitHub o con los [endpoints de la API de definición][11]. Actualizar el mismo servicio utilizando tanto GitHub como la API puede dar lugar a sobrescrituras involuntarias.  

#### Automatizar las actualizaciones de definiciones con Terraform

El catálogo de servicios proporciona una definición como [recurso de Terraform][8]. Para crear y gestionar servicios en el Catálogo de servicios a través de pipelines automatizados requiere [el proveedor de Datadog][9] v3.16.0 o posterior.

#### Proveedor de metadatos de código abierto

Como alternativa a la integración de GitHub y Terraform, puedes utilizar una solución de código abierto de acción de GitHub llamada [proveedor de metadatos de catálogo de servicios de Datadog][10].

## Crear extensiones personalizadas

<div class="alert alert-info">La disponibilidad de las extensiones personalizadas es limitada.</div>

El campo `extensions` es compatible con todas las versiones, incluida la v2.0. Puedes incorporar este campo personalizado en el proceso de despliegue para estandarizar y codificar las prácticas recomendadas.

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: web-store
team: shopist
...
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "//domains/examples/apps/hello-joe/config/k8s:release-staging"
          branch: "hello-joe/staging"
          schedule: "* * * * 1"
{{< /code-block >}}

## Complementos de IDE

Datadog proporciona un [Esquema JSON][13] para las definiciones, de modo que cuando se edita una definición en un [IDE compatible][14], se proporcionan funciones como autocompletar y validación.

{{< img src="tracing/service_catalog/ide_plugin.png" alt="VSCode reconoce el problema a resolver" style="width:100%;" >}}

El [Esquema JSON para definiciones de Datadog][15] está registrado en el [Almacén de esquemas][14] de código abierto.

## {{< img src="synthetics/browser_test.mp4" alt="Browser tests" video=true style="width:100%;">}}

Grabar pruebas de aplicaciones móviles

[1]: /es/service_catalog/service_definitions/v3-0
[2]: /es/service_catalog/service_definitions/v2-2
[3]: /es/service_catalog/service_definitions/v2-1
[4]: /es/service_catalog/service_definitions/v2-0
[5]: https://app.datadoghq.com/services
[6]: /es/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /es/tracing/service_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json