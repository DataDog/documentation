---
aliases:
- /es/software_catalog/actions
- /es/software_catalog/self-service
- /es/service_catalog/self-service
- /es/software_catalog/self-service_actions
- /es/software_catalog/self_service_actions
cascade:
  site_support_id: idp
description: Los equipos de plataforma pueden definir y compartir plantillas que permiten
  a los desarrolladores aprovisionar infraestructura, crear estructuras de servicios,
  gestionar implementaciones y automatizar tareas con un solo clic.
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
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions/
  tag: Blog
  text: Empodere a sus equipos de ingeniería con Self-Service Actions en Catalog de
    Datadog
title: Self-Service Actions
---
[Self-Service Actions][17] ayudan a los equipos de plataforma a definir y compartir plantillas para agilizar las tareas a lo largo del ciclo de vida del desarrollo de software. Los desarrolladores pueden usar estas acciones predefinidas para:

- crear microservicios e infraestructura con las configuraciones adecuadas
- inicializar entornos de desarrollo
- gestionar implementaciones en todos los entornos
- hacer un seguimiento activo y optimizar los servicios en ejecución

Cada mosaico representa una aplicación, la cual proporciona una interfaz estructurada para ejecutar acciones predefinidas. Las aplicaciones se crean a través de [App Builder][2], impulsadas por [Action Catalog][7] y [Workflow Automation][1], y se muestran en Catalog para agilizar los flujos de trabajo de los desarrolladores.

## Automatice los flujos de trabajo de los desarrolladores {#automate-developer-workflows}

Para crear una nueva aplicación en Catalog, puede comenzar con un ejemplo o crearla desde cero. A un alto nivel, la creación de una nueva aplicación implica los siguientes pasos:

1. Utilice [App Builder][2] para crear formularios dinámicos y fáciles de usar que recopilen datos de entrada de los desarrolladores.
1. Llame a las [Actions][7] de Datadog desde su aplicación para iniciar llamadas a la API a servicios externos, realizar lógica personalizada o transformar datos. 
1. Utilice [Workflow Automation][1] para orquestar procesos de extremo a extremo con múltiples acciones.
1. Integre su aplicación con el Catalog de Datadog para habilitar flujos de trabajo dinámicos y Self-Service

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Publicar en Self-Service" style="width:100%;" >}}

### Comience con un ejemplo {#start-from-an-example}

Para comenzar rápidamente, explore [App Builder Blueprints][9] y [Workflow Automation Blueprints][15] para ver ejemplos de cómo configurar aplicaciones y flujos de trabajo, respectivamente. Puede configurar entradas, establecer integraciones, configurar permisos y realizar otros ajustes en los Blueprints para satisfacer sus necesidades. 

Por ejemplo, puede usar App Builder Blueprints para:

- **Crear nuevos servicios a partir de plantillas:**Configure un formulario para recopilar datos de entrada de un desarrollador, intégrelo con una plantilla en la gestión de código fuente (por ejemplo, GitHub o GitLab) y genere un nuevo repositorio, pull request o merge request para un desarrollador. Lea la [documentación de Software Templates][16] para obtener más información.
- **Aprovisionar infraestructura:** Permita que los desarrolladores pongan en marcha nueva infraestructura (por ejemplo, un bucket de S3) con unos pocos datos de entrada y un solo clic. Recopile aprobaciones de un equipo de SRE o de ingeniería de plataforma a través del control de versiones o acciones de Aprobación dentro de Workflow Automation.
- **Remediar problemas:** Consolide datos de la infraestructura en la nube o Kubernetes y permita que los desarrolladores realicen acciones de remediación sencillas y seguras. Active acciones manualmente, en respuesta a un seguimiento o desde una llamada a una API externa.
- **Gestionar cambios de código y despliegues:** Gestione despliegues, cambios en indicadores de funciones y más. Inicie cambios directamente desde Datadog y realice un seguimiento de su estado y aprobaciones.
- **Aprovisionar entornos de desarrollo:** Cree entornos efímeros para desarrolladores bajo demanda. Utilice Workflow Automation para desaprovisionar automáticamente cualquier infraestructura no utilizada y controlar los costos.

### Comience desde cero {#start-from-scratch}

Si prefiere crear una aplicación desde cero:

1. Cree un formulario usando App Builder:

    1. Navegue a **Actions** > **App Builder** desde el menú de la izquierda y seleccione **New App**.
    1. Ingrese un nombre y una descripción, y use el editor de arrastrar y soltar para crear un formulario que recopile los parámetros requeridos.
       - Puede usar el componente `Form` o crear una interfaz de usuario personalizada.
    1. Seleccione **New Query** y use la acción **Trigger workflow** para llamar a su flujo de trabajo y pasar parámetros. 
       - Explore [Action Catalog][7] para ver las integraciones integradas o use la acción `HTTP` para interactuar con cualquier integración no disponible.
    1. Cree un **Button** que envíe el formulario y active su flujo de trabajo.
    1. Guarde y publique la aplicación.

1. Empareje su aplicación con [Actions][7] o con un [Workflow][6] para automatizar procesos.

   {{< img src="tracing/software_catalog/templating-workflow.png" alt="Flujo de trabajo para crear la automatización de plantillas de software" style="width:100%;" >}}

1. Pruebe su aplicación y flujo de trabajo:
   
   1. Haga clic en **View App** para obtener una vista previa de la aplicación en una página independiente.
   1. Haga un seguimiento de la ejecución del flujo de trabajo en [Workflow Automation][3].

### Publique su aplicación {#publish-your-app}

Una vez que su Software Template esté configurado y probado, publíquelo para que su equipo pueda usarlo. El flujo de publicación le permite:

- Defina permisos para controlar el acceso.
- Agregue la aplicación a un Dashboard o a Self-Service Actions para facilitar su descubrimiento.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publicar en Self-Service" style="width:100%;" >}}
    

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
[15]: https://app.datadoghq.com/workflow/blueprints
[16]: /es/internal_developer_portal/self_service_actions/software_templates/
[17]: https://app.datadoghq.com/software/self-service