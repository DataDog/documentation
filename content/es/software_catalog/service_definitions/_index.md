---
aliases:
- /es/software_catalog/adding_metadata
- /es/tracing/software_catalog/service_metadata_structure
- /es/tracing/software_catalog/adding_metadata
- /es/software_catalog/add_metadata
- /es/service_catalog/adding_metadata
- /es/tracing/service_catalog/service_metadata_structure
- /es/tracing/service_catalog/adding_metadata
- /es/service_catalog/add_metadata
- /es/service_catalog/service_definitions
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
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: Blog
  text: Mejorar la experiencia y la colaboración de los desarrolladores con el Catálogo
    de software
title: Definiciones y versiones compatibles
---

## Estructura de metadatos y versiones compatibles

El Catálogo de software utiliza esquemas de definición para almacenar y mostrar metadatos relevantes sobre tus servicios. Los esquemas tienen reglas de validación integradas para garantizar que sólo se aceptan valores válidos. Puedes ver las advertencias en la pestaña **Definición**, en el panel lateral del Catálogo de software, para cualquier servicio seleccionado.

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Opción de previsualización de la versión más reciente del Catálogo de software." >}}
{{< /callout >}}

## Versiones compatibles

Datadog admite cuatro versiones del esquema de definición:

- [v3.0][1]: Versión más reciente con modelo de datos ampliado, compatibilidad con múltiples propietarios, declaración manual de dependencias y funciones mejoradas para infraestructuras complejas.
- [v2.2][2]: Admite anotaciones de usuario para metadatos personalizados y asociaciones de pipeline de CI para vincular servicios con sus procesos de compilación.
- [v2.1][3]: Admite agrupaciones de servicio para mejorar la organización e introduce campos adicionales para descripciones más completas de servicio.
- [v2][4]: Versión compatible más antigua, que proporciona campos esenciales para la documentación y los metadatos básicos de servicio.

Cada versión se basa en la anterior, añadiendo nuevas funciones y manteniendo la compatibilidad con versiones anteriores. Elige la versión que mejor se adapte a tus necesidades y a la complejidad de infraestructura.

## Comparación de versiones

Cada versión admite las siguientes funciones:

| Función                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Metadatos básicos                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Agrupaciones de servicio             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| Anotaciones del usuario              | {{< X >}}   | {{< X >}} |           |           |
| Asociaciones de CI Pipeline      | {{< X >}}   | {{< X >}} |           |           |
| Modelo de datos ampliado           | {{< X >}}   |           |           |           |
| Multipropiedad               | {{< X >}}   |           |           |           |
| Declaración manual de dependencia | {{< X >}}   |           |           |           |

Para obtener información detallada sobre cada versión, incluidos esquemas completos y archivos YAML de ejemplo, consulta las páginas de cada versión en [Versiones compatibles](#supported-versions).

## Añadir metadatos al Catálogo de software

### Añadir metadatos desde la interfaz de usuario de Datadog 

1. En la página del [Catálogo de software][5], haz clic en **Setup & Config** (Configurar).
2. Haz clic en **Create New Entry** (Crear nueva entrada).
3. Especifica el servicio al que deseas añadir metadatos.
4. Introduce los detalles de los enlaces Equipo, De guardia, Contactos, Documentación, Repositorio de código y Otros.
5. Cambia a **YAML** o **JSON** para ver el código generado y el comando cURL.
6. Si dispones del permiso [de escritura del Catálogo de software][12], puedes enviar los metadatos haciendo clic en **Save Entry** (Guardar entrada) o ejecutando el comando cURL proporcionado.

### Añadir metadatos con automatización

#### Almacenar y editar definiciones en GitHub

Configurar la [integración GitHub][6] para enlazar directamente desde dónde ves la definición del servicio en el Catálogo de software hasta donde se almacena y se puede editar en GitHub. Datadog analiza los archivos `service.datadog.yaml` y `entity.datadog.yaml` en cada repositorio con permisos de lectura.

Para instalar la integración GitHub:
1. Navega hasta [el cuadro de la integración][7].
2. Haz clic en **Link GitHub Account** (Cuenta de enlace de GitHub) en la pestaña **Repo Configuration** (Configuración del repositorio).

Cuando la integración GitHub está configurado para tus definiciones, aparece un botón **Edit in GitHub** (Editar en GitHb) en la pestaña **Definition** (Definición) y te enlaza con GitHub para confirmar los cambios.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Un botón Editar en GitHub aparece en la pestaña Definición de un servicio en el Catálogo de software" style="width:90%;" >}}

Una vez actualizados los archivos YAML de tus repositorios, los cambios se propagan al Catálogo de software. Puedes registrar varios servicios en un archivo YAML creando varios documentos YAML. Separa cada documento con tres guiones (`---`).

Para evitar sobrescrituras accidentales, crea y modifica tus archivos de definición con la integración GitHub o con los [endpoints de la API de definición][11]. Actualizar el mismo servicio utilizando tanto GitHub como la API puede dar lugar a eliminaciones involuntarias.  

#### Automatizar las actualizaciones de definiciones con Terraform

El Catálogo de software proporciona una definición como [recurso Terraform][8]. La creación y la gestión de servicios en el Catálogo de software a través de pipelines automatizados requieren [Datadog Provider][9] v3.16.0 o posterior.

#### Proveedor de metadatos de código abierto

Como alternativa a la integración GitHub y Terraform, puedes utilizar una solución GitHub Action de código abierto llamada [proveedor de metadatos del Catálogo de software de Datadog][10].

### Añadir metadatos a endpoints

Puedes añadir metadatos a las API a través de la interfaz de usuario o la [API][16] de Datadog, o utilizar pipelines automatizados a través de la [integración GitHub](#store-and-edit-definitions-in-github) o [Terraform][17].

Combina el [esquema de metadatos v3.0][1] con definiciones OpenAPI configurando `kind: api` y especificando el campo `owner`:

```yaml
apiVersion: v3
kind: api
metadata:
  name: API Name
  description: API Description 
  displayName: API Name
  owner: dd-team
spec:
  type: openapi
  interface:
    definition:
      info:
        title: API Name
      openapi: 3.0.2
      paths:
        /api/v2/customers/{id}:
          get:
            summary: get customer information
            operationId: getCustomerInfo
            tags:
              - public
              - important
            parameters:
              - in: path
                name: id
            responses:
              '200':
                description: Successful operation
                content:
                  application/vnd.api+json:
                    schema:
                      type: object
                      properties:
                        data:
                          type: array
                          description: Contains customer information
              '400':
                description: Invalid arguments
              '401':
                description: Unauthorized operation
              '500':
                description: Internal server error
```

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

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode reconoce un problema que necesita resolución" style="width:100%;" >}}

El [Esquema JSON para definiciones de Datadog][15] está registrado en el [Almacén de esquemas][14] de código abierto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/software_catalog/service_definitions/v3-0
[2]: /es/software_catalog/service_definitions/v2-2
[3]: /es/software_catalog/service_definitions/v2-1
[4]: /es/software_catalog/service_definitions/v2-0
[5]: https://app.datadoghq.com/services
[6]: /es/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /es/tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /es/api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog