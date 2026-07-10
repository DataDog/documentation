---
aliases:
- /es/software_catalog/actions
- /es/software_catalog/self-service
- /es/service_catalog/self-service
- /es/software_catalog/self-service_actions
- /es/software_catalog/self_service_actions
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Solucionar las incidencias más rápidamente con App Builder
- link: /service_management/app_builder/
  tag: Documentación
  text: Más información sobre App Builder
- link: /service_management/workflows/
  tag: Documentación
  text: Más información sobre Workflows
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions/
  tag: Blog
  text: Potencie tus equipos de ingeniería con acciones de Self-Service en Software
    Catalog de Datadog
title: Acciones de Self-Service
---

[Acciones de Self-Service][17] ayudan a los equipos de la plataforma a definir y compartir plantillas para agilizar las tareas a lo largo del ciclo de vida de desarrollo de software. Los desarrolladores pueden utilizar estas acciones predefinidas para:

- crear microservicios e infraestructura con las configuraciones adecuadas
- iniciar entornos de desarrollo
- gestionar los despliegues en entornos
- activamente monitorizar y optimizar los servicios en funcionamiento

Cada ícono representa una aplicación, que proporciona una interfaz estructurada para ejecutar acciones predefinidas. Las aplicaciones se crean a través de [App Builder][2], con la ayuda de [Actions Catalog][7] y [Workflow Automation][1] y se muestran en Software Catalog para agilizar los flujos de trabajo de los desarrolladores.

## Automatizar los flujos de trabajo de los desarrolladores

Para crear una nueva aplicación en Software Catalog, puedes empezar con un ejemplo o crearla desde cero. A grandes rasgos, la creación de una nueva aplicación implica los siguientes pasos:

1. Utiliza [App Builder][2] para crear formularios dinámicos y fáciles de usar para recopilar entradas de los desarrolladores.
1. Llama a las [Acciones][7] de Datadog desde tu aplicación para iniciar llamadas a la API a servicios externos, ejecutar lógica personalizada o transformar datos. 
1. Utiliza [Workflow Automation][1] para orquestar de extremo a extremo procesos con múltiples acciones.
1. Integra tu aplicación con el catálogo de software de Datadog para habilitar flujos de trabajo dinámicos y autónomos.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Publicar en Autoservicio" style="width:100%;" >}}

### A partir de un ejemplo

Para empezar rápidamente, explora los [planos de App Builder][9] y [planos de Workflow Automation][15] para ver ejemplos de cómo configurar aplicaciones y flujos de trabajo, respectivamente. Puedes configurar entradas, configurar integraciones, configurar permisos y hacer otros ajustes a los planos para satisfacer tus necesidades. 

Por ejemplo, puedes utilizar planos de App Builder para:

- **Nuevos servicios de andamiaje desde plantillas:** configura un formulario para recopilar entradas de un desarrollador, integrar con una plantilla en la gestión de código fuente (por ejemplo, Github), y generar un nuevo repositorio o solicitud pull para un desarrollador. Lee la [Documentación de plantillas de software][16] para saber más.
- **Aprovisionar infraestructura:** permite a los desarrolladores crear una nueva infraestructura (por ejemplo, un bucket de S3) con unas pocas entradas y un solo clic. Recopila aprobaciones de un equipo de SRE o de ingeniería de plataforma a través del control de fuente o de acciones de aprobación dentro de Workflow Automation.
- **Solucionar problemas:** consolida los datos de la infraestructura en la nube o Kubernetes y permite a los desarrolladores tomar medidas de corrección sencillas y seguras. Activa acciones manualmente, en respuesta a un monitor o desde una llamada a una API externa.
- **Gestionar los cambios de código y despliegues:** gestiona despliegues, cambios de indicadores de característica y más. Inicia cambios directamente desde Datadog y realiza un seguimiento de su estado y aprobaciones.
- **Aprovisionamiento de entornos de desarrolladores:** aprovisiona entornos efímeros para desarrolladores bajo demanda. Utiliza Workflow Automation para desaprovisionar automáticamente cualquier infraestructura no utilizada y controlar los costes.

### Empezar desde cero

Si prefieres crear una aplicación desde cero:

1. Crea un formulario utilizando App Builder:

    1. Ve a **Actions** > **App Builder** (Acciones > App Builder) en el menú de la izquierda y selecciona **New App** (Nueva aplicación).
    1. Introduce un nombre y una descripción y utiliza el editor de arrastrar y soltar para crear un formulario que recopile los parámetros obligatorios.
       - Puedes utilizar el componente `Form` o crear una interfaz de usuario personalizada.
    1. Selecciona **New Query** (Nueva consulta) y utiliza la acción **Trigger workflow** (Activar flujo de trabajo) para llamar a tu flujo de trabajo e introducir parámetros. 
       - Explora el [Catálogo de acciones][7] para ver las integraciones incorporadas o utiliza la acción `HTTP` para interactuar con cualquier integración que no esté disponible.
    1. Crea un **Botón** que envíe el formulario y active tu flujo de trabajo.
    1. Guarda y publica la aplicación.

1. Combina tu aplicación con [Acciones][7] o un [Flujo de trabajo][6] para automatizar procesos.

   {{< img src="tracing/software_catalog/templating-workflow.png" alt="Flujo de trabajo para crear automatizaciones de plantillas de software" style="width:100%;" >}}

1. Testear tu aplicación y flujo de trabajo:

   1. Haz clic en **View App** (Ver aplicación) para obtener una vista previa de la aplicación en una página independiente.
   1. Monitoriza la ejecución del flujo de trabajo en [Workflow Automation][3].

### Publicar tu aplicación 

Una vez configurada y probada tu plantilla de software, publícala para que tu equipo pueda utilizarla. El flujo de publicación te permite:

- Definir permisos para controlar el acceso.
- Añade la aplicación a un dashboard o a acciones de Self-Service para descubrirla fácilmente.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publicar en Autoservicio" style="width:100%;" >}}


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
[15]: https://app.datadoghq.com/workflow/blueprints
[16]: /es/software_catalog/self-service/software_templates
[17]: https://app.datadoghq.com/software/self-service