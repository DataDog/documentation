---
aliases:
- /es/service_catalog/software_templates
- /es/software_catalog/software_templates
- /es/software_catalog/self-service/software_templates
- /es/software_catalog/self_service_actions/software_templates
- /es/software_catalog/self-service_actions/software_templates
description: Cree Plantillas de Software reutilizables en el Catálogo para ayudar
  a los desarrolladores a aprovisionar infraestructura y crear microservicios que
  se alineen con las mejores prácticas de su organización.
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Solucione incidentes más rápido con App Builder
- link: /actions/app_builder/
  tag: Documentación
  text: Obtenga más información sobre App Builder
- link: /actions/workflows/
  tag: Documentación
  text: Obtenga más información sobre Workflows
title: Plantillas de Software
---
Cree Plantillas de Software dentro del Catálogo para ayudar a los desarrolladores a aprovisionar infraestructura rápidamente y crear microservicios que se alineen con sus mejores prácticas. 

## Crear una Plantilla de Software {#create-a-software-template}

Una Plantilla de Software se almacena en un repositorio Git y sirve como un marco de trabajo reutilizable. [Cree aplicaciones][2] para recopilar entradas y pasarlas al repositorio de la plantilla para generar configuraciones personalizadas.

Para crear una Plantilla de Software, usted puede:
- Comience desde un ejemplo utilizando Blueprints preconstruidos.
- Comience desde cero definiendo su propia plantilla y flujos de trabajo.

### Comience con un ejemplo {#start-from-an-example}

Utilice [App Builder Blueprints][9] para configurar rápidamente una aplicación o flujo de trabajo. Estos Blueprints proporcionan ejemplos funcionales que usted puede personalizar modificando entradas, integrándose con el control de versiones o proveedores de nube, y ajustando permisos.

Ejemplos de Blueprints:

- **[Blueprint de Estructura de Nuevo Servicio][11]**: Cree un formulario que recopile las entradas del desarrollador, se integre con GitHub y genere un nuevo repositorio o solicitud de extracción.
- **[Blueprint de Creación de Bucket S3][10]**: Genere código de Terraform para un bucket de S3 utilizando un formulario en GitHub.
- **[Blueprint de Aprovisionamiento de Clúster EKS][13]**: Genere código de Terraform para un clúster de Kubernetes en GitHub.
- **[Blueprint de Aprovisionamiento de Instancia RDS][14]**: Aprovisione una instancia de RDS en AWS a través de una llamada a la API.

Para usar un Blueprint:

1. Seleccione un Blueprint en [**App Builder Blueprints**][9].
1. Personalice los campos del formulario para capturar las entradas requeridas.
1. Haga clic en **Guardar como nueva aplicación** para crear una aplicación vinculada a un flujo de trabajo de plantillas.

### Comience desde cero {#start-from-scratch}

Para crear una Plantilla de Software desde cero:

1. Cree un formulario usando App Builder:

    1. Navegue a **Actions** > **App Builder** desde el menú de la izquierda y seleccione **New App**.
    1. Ingrese un nombre y una descripción, y use el editor de arrastrar y soltar para crear un formulario que recopile los parámetros requeridos.
       - Puede usar el componente `Form` o crear una interfaz de usuario personalizada.
    1. Seleccione **New Query** y use la acción **Trigger workflow** para llamar a su flujo de trabajo y pasar parámetros. 
       - Explore [Action Catalog][7] para ver las integraciones integradas o use la acción `HTTP` para interactuar con cualquier integración no disponible.
    1. Cree un **Button** que envíe el formulario y active su flujo de trabajo.
    1. Guarde y publique la aplicación.

2. [Cree un flujo de trabajo][6] para su plantilla:
   
   1. Vaya a [Workflow Automation][3] y haga clic en **New Workflow**. 
   1. Ingrese un nombre, agregue etiquetas relevantes y defina los parámetros de entrada que desea recopilar de los usuarios.
  
3. Configure el flujo de trabajo de plantillas:

   1. Use [actions][7] de GitHub, GitLab o HTTP para recuperar sus archivos de plantilla.
   1. Use la [action][7] Apply Template para manipular su repositorio de plantillas y pasar sus parámetros de entrada.
   1. Utilice GitHub, GitLab o HTTP [actions][7] para cargar los archivos del proyecto al repositorio.
   1. Guarde el flujo de trabajo.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Flujo de trabajo para crear automatizaciones de Plantillas de Software" style="width:100%;" >}}

4. Pruebe su aplicación y flujo de trabajo:

   1. Haga clic en **View App** para obtener una vista previa de la aplicación como una página independiente.
   1. Haga un seguimiento del proceso de creación de plantillas en [Workflow Automation][3].

## Publique su aplicación {#publish-your-app}

Una vez que su Software Template esté configurado y probado, publíquelo para que su equipo pueda usarlo. El flujo de publicación le permite:

- Defina permisos para controlar el acceso.
- Agregue la aplicación a un Dashboard o a Self-Service Actions para facilitar su descubrimiento.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publicar en Self-Service" style="width:100%;" >}}

## Acciones de plantillas disponibles {#available-templating-actions}

Las siguientes acciones están disponibles para Catalog en Datadog App Builder y Workflow Automation. Para obtener una lista completa, consulte [Action Catalog][7].

- **Plantillas**
  - "Apply template": Pase parámetros de entrada a un conjunto de archivos.
- **GitHub**
  - "Create or update file": Cree o modifique archivos en un repositorio de GitHub.
  - "Edit configuration file": Modifique archivos de configuración YAML o JSON.
  - "Trigger GitHub Actions workflow": Inicie un flujo de trabajo de GitHub Actions.
  - "Search repositories": Recupere una lista de repositorios.
  - "Create pull request": Abra una solicitud de extracción.
- **GitLab**
  - "Create file": Cree un archivo en un repositorio de GitLab.
  - "Create project": Cree un proyecto en GitLab.
- **Azure DevOps**
  - "Run pipeline": Inicie una ejecución de pipeline en Azure DevOps.
- **Recuperar información del servicio**
  - "List entity definitions": Recupere todas las definiciones de servicio del Catalog de Datadog (v3.0 y anteriores).
  - "Get service dependencies": Recupere las dependencias ascendentes y descendentes de un servicio.
- **Aprobaciones**
  - "Make a decision": Utilice Slack o Microsoft Teams para solicitar una aprobación.
    - Utilice integraciones con ServiceNow, Jira o llamadas HTTP si tiene un proceso de gestión de cambios existente.
- **HTTP**
  - "Make request": Realice una solicitud HTTP para interactuar con cualquier API externa.
- **Transformación de datos**
  - "Expression", "Function": Realice transformaciones de datos con JavaScript.
    - Utilice Bits AI para obtener ayuda al escribir código JavaScript personalizado.
- **Private Actions**
  - Para interactuar con recursos privados, utilice el [Private Action Runner][12].
    

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/workflows/
[2]: /es/actions/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /es/actions/workflows/build/#create-a-custom-workflow
[7]: /es/actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /es/actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action