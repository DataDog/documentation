---
aliases:
- /es/service_catalog/software_templates
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cdn-performance-with-synthetic-testing/
  tag: Blog
  text: Solucionar las incidencias más rápidamente con App Builder
- link: /service_management/app_builder/
  tag: Documentación
  text: Más información sobre App Builder
- link: /service_management/workflows/
  tag: Documentación
  text: Más información sobre Workflows
title: Autoservicio
---

## Automatizar los flujos de trabajo de los desarrolladores
Utiliza [App Builder][2] para crear formularios dinámicos y fáciles de usar que recopilen las entradas de los desarrolladores. Llama a [Acciones][7] de Datadog desde tu aplicación para iniciar llamadas a API externas, realizar lógica personalizada o transformaciones de datos. Organiza los procesos de extremo a extremo de múltiples acciones utilizando [Workflow Automation][1]. Intégralas con el catálogo de software de Datadog para habilitar flujos de trabajo dinámicos y de autoservicio.

{{< img src="tracing/service_catalog/self-service-ui.png" alt="Publicar en autoservicio" style="width:100%;" >}}

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Las plantillas de software están en vista previa. Rellena el formulario para solicitar acceso.
{{< /callout >}} 

### Crear flujos de trabajo de plantillas de software
Para utilizar plantillas de software en Datadog, crea un repositorio de Git con la plantilla deseada. Puedes empezar desde cero o utilizar nuestros planos de inicio rápido para aprender a partir de un ejemplo.

#### A partir de un ejemplo
Ve a [planos de App Builder][9] y selecciona uno de los siguientes planos. Estos son ejemplos de cómo configurar una aplicación o flujo de trabajo para empezar. Puedes realizar actualizaciones en los ejemplos para adaptarlos a tus necesidades, como configurar entradas, configurar integraciones con gestión de código fuente o proveedores de nube y configurar permisos.

##### Nuevo servicio de andamiaje

El [plano Nuevo servicio de andamiaje][11] muestra un ejemplo de andamiaje de una nueva función de Lambda a partir de una plantilla. El formulario captura las entradas de un desarrollador que se pasarán al repositorio de Git correspondiente.

1. Desde la aplicación, personaliza el formulario para incluir los parámetros que deseas capturar de tus desarrolladores.
2. Haz clic en **Save as New App** (Guardar como nueva aplicación) para guardar la aplicación. Esto también creará un flujo de trabajo de plantillas correspondiente.

##### Crear un bucket de S3 con Terraform

El [plano Crear bucket de S3][10] muestra un ejemplo de cómo generar código de Terraform para un bucket de S3 usando un formulario en GitHub.

##### Aprovisionar clúster de Kubernetes

El [plano Aprovisionar clúster de EKS][12] muestra un ejemplo de cómo generar código de Terraform para un clúster de Kubernetes en GitHub.

##### Aprovisionar instancia de RDS

El [plano Aprovisionar instancias de RDS][13] muestra un ejemplo de cómo aprovisionar una instancia de RDS a través de la integración directa con AWS.


#### Empezar desde cero
Ve a la página [Workflow Automation][3] para configurar la plantilla en Datadog.

1. Crea un formulario para el frontend del desarrollador utilizando App Builder:
   - Ve a **Actions** > **App Builder** (Acciones > App Builder) y selecciona **New App** (Nueva aplicación.
   - Introduce un nombre y una descripción y utiliza el editor de arrastrar y soltar para crear un formulario que recopile los parámetros obligatorios de tu plantilla.
   - Puedes aprovechar el componente `Form` o crear una interfaz de usuario personalizada.
   - Una vez terminada la interfaz de usuario, selecciona **New Query** (Nueva consulta) y utiliza la acción **Trigger workflow** (Activar flujo de trabajo) para llamar a tu flujo de trabajo de plantillas e introducir los parámetros pertinentes. También puedes explorar las integraciones disponibles en el [Catálogo de acciones][7] o aprovechar la acción `HTTP` para interactuar con cualquier integración no predefinida.
   - Crea un **Botón** que envíe el formulario, active tu flujo de trabajo y pase los parámetros de la plantilla.
   - Guarda y publica la aplicación.

2. [Crea un flujo de trabajo][6] para tu plantilla:
   - En la página [Workflow Automation][3], haz clic en **New Workflow** (Nuevo flujo de trabajo).
   - Introduce un nombre, añade etiquetas (tags) pertinentes y define los parámetros de entrada que desees recopilar de los usuarios.

3. Configura el flujo de trabajo de las plantillas:
   - Utiliza [acciones][7] de GitHub, Gitlab o HTTP para recuperar tus archivos de plantilla.
   - Utiliza la [acción][7] Apply Template (Aplicar plantilla) para manipular tu repositorio de plantillas y pasar tus parámetros de entrada.
   - Utiliza [acciones][7] de GitHub, Gitlab o HTTP para cargar los archivos del proyecto al repositorio.
   - Guarda el flujo de trabajo.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Flujo de trabajo para crear automatizaciones de plantillas de software" style="width:100%;" >}}

4. Testear tu aplicación y flujo de trabajo:
   - Haz clic en **View App** (Ver aplicación) para ver la aplicación en una página independiente en una vista previa.
   - Realiza un seguimiento del éxito del proceso de plantillas de flujo de trabajo en [Workflow Automation][3].

### Publicación de la aplicación
Cuando hayas terminado de configurar y testear tu aplicación, puedes publicarla para que la utilicen los miembros de tu equipo. El flujo de publicación te pedirá que definas los permisos y, a continuación, te permitirá añadir tu aplicación a un dashboard o al portal de autoservicio. 

  {{< img src="tracing/service_catalog/self-servicio-publish.png" alt="Publicar en autoservicio" style="width:100%;" >}}

### Acciones disponibles en el catálogo de software

A continuación, se muestra una lista de acciones disponibles para el Catálogo de software en Datadog App Builder y Workflow Automation. Puedes ver una lista completo en el [Catálogo de acciones][7].

- **Templating** (Creación de plantillas)
  - "Apply template" (Aplicar plantilla) para pasar parámetros a un conjunto de archivos
- **Github**
  - "Create or update file" (Crear o actualizar archivo) para crear nuevos archivos
  - "Edit configuration file" (Editar archivo de configuración) para manipular archivos YAML o JSON
  - "Trigger GitHub Actions workflow run" (Activar la ejecución del flujo de trabajo de las acciones de GitHub) para iniciar una acción de GitHub
  - "Search repositories" (Buscar repositorios) para devolver un lista de repositorios
  - "Create pull request" (Crear solicitud pull) para abrir un solicitud pull
- **Retrieve Service Information** (Recuperar información de servicio)
  - "Get service definition" (Obtener definición de servicio) para un solo servicio
  - "List service definitions" (Enumerar definiciones de servicio) para obtener todas las definiciones del catálogo de software de Datadog 
  - "Get service dependencies" (Obtener las dependencias de servicio) para consultar los servicios ascendentes y descendentes
- **Incident Triage** (Triaje de incidencias)
  - "Get service PagerDuty on call" (Llamar al servicio PagerDuty de guardia)
  - Cuando se integra con otras acciones, puedes desencadenar flujos de trabajo basados en eventos críticos (por ejemplo, ejecutar runbooks).
- **Private Actions** (Acciones privadas)
  - Para interactuar con recursos privados, utiliza el [Ejecutar de acciones privadas][12].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/workflows/
[2]: /es/service_management/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /es/service_management/workflows/build/#create-a-custom-workflow
[7]: /es/actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /es/actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action