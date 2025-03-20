---
aliases:
- /es/service_catalog/software_templates
- /es/software_catalog/software_templates
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Soluciona las incidencias más rápidamente con App Builder
- link: /service_management/app_builder/
  tag: Documentación
  text: Más información sobre App Builder
- link: /service_management/workflows/
  tag: Documentación
  text: Más información sobre flujos de trabajo
title: Plantillas de software
---

Utiliza plantillas de software en Self-Service para que los desarrolladores de ayuda aprovisionen rápidamente la infraestructura y creen microservicios que se ajusten a tus mejores prácticas. 

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Las plantillas de software están en vista previa. Completa el formulario para solicitar acceso.
{{< /callout >}} 

## Crea una plantilla de software

Una plantilla de software se almacena en un repositorio de Git y sirve como marco reutilizable. [Crea aplicaciones][2] para recopilar entradas y pasarlas al repositorio de plantillas para generar configuraciones personalizadas.

Para crear una Plantilla de software, puedes:
- Partir de un ejemplo con planos preconstruidos.
- Empezar desde cero definiendo tu propia plantilla y flujos de trabajo.

### Partir de un ejemplo

Utiliza [Planos de App Builder][9] para configurar rápidamente una aplicación o un flujo de trabajo. Estos planos proporcionan ejemplos prácticos que puedes personalizar modificando las entradas, integrando el control de origen o los proveedores de la nube y ajustando los permisos.

Ejemplos de planos:

- **[Apuntalar plano de nuevos servicios][11]**: Crea un formulario que recopile las entradas de los desarrolladores, se integre con GitHub y genere un nuevo repositorio o una solicitud de incorporación de cambios.
- **[Crear plano de Bucket S3][10]**: Genera un código de Terraform para un bucket S3 con un formulario en GitHub.
- **[Aprovisionar plano de clúster EKS][13]**: Genera un código de Terraform para un clúster de Kubernetes en GitHub.
- **Aprovisionar un plano de instancias de RDS][14]**: Aprovisiona una instancia de RDS en AWS a través de una llamada a la API.

Para utilizar un plano:

1. Selecciona un plano en [**Planos de App Builder**][9].
1. Personaliza los campos del formulario para capturar las entradas obligatorias.
1. Haz clic en **Guardar como nueva aplicación** para crear una aplicación vinculada a un flujo de trabajo de creación de plantillas.

### Empezar de cero

Para construir una plantilla de software desde cero:

1. Crea un formulario con App Builder:

    1. Ve a **Acciones** > **App Builder** en el menú de la izquierda y selecciona **Nueva aplicación**.
    1. Introduce un nombre y una descripción y utiliza el editor de arrastrar y soltar para crear un formulario que recopile los parámetros obligatorios.
       - Puedes utilizar el componente `Form` o crear una interfaz de usuario personalizada.
    1. Selecciona **Nueva consulta** y utiliza la acción **Activar flujo de trabajo** para llamar a tu flujo de trabajo e introducir parámetros. 
       - Explora el [Catálogo de acciones][7] para ver las acciones incorporadas en integraciones o utiliza la acción `HTTP` para interactuar con cualquier integración que no esté disponible.
    1. Crea un **Botón** que envíe el formulario y active tu flujo de trabajo.
    1. Guarda y publica la aplicación.

2. [Crea un flujo de trabajo][6] para tu plantilla:

   1. Ve a [Automatización del flujo de trabajo][3] y haz clic en **Nuevo flujo de trabajo**. 
   1. Introduce un nombre, añade etiquetas (tags) pertinentes y define los parámetros de entrada que desees recopilar de los usuarios.

3. Configura el flujo de trabajo de las plantillas:

   1. Utiliza [acciones][7] de GitHub, Gitlab o HTTP para recuperar tus archivos de plantilla.
   1. Utiliza la [acción] [7] Aplicar plantilla para manipular su repositorio de plantillas y pasar tus parámetros de entrada.
   1. Utiliza [acciones][7] de GitHub, Gitlab o HTTP para cargar los archivos del proyecto al repositorio.
   1. Guarda el flujo de trabajo.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Flujo de trabajo para crear automatizaciones de plantillas de software" style="width:100%;" >}}

4. Haz un test de tu aplicación y tu flujo de trabajo:

   1. Haz clic en **Ver aplicación** para previsualizar la aplicación como una página independiente.
   1. Monitoriza el proceso de la plantilla en [Automatización del flujo de trabajo][3].

## Publica tu aplicación 

Una vez configurada y hecho el test de tu plantilla de software, publícala para que tu equipo pueda utilizarla. El flujo de publicación te permite:

- Definir permisos para controlar el acceso.
- Añadir la aplicación a un dashboard o al portal de Self-Service para descubrirla fácilmente.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publicar en Self-Service" style="width:100%;" >}}

## Acciones de creación de plantillas disponibles

Las siguientes acciones están disponibles para el catálogo de software en Datadog App Builder y Workflow Automation. Para ver una lista completa, consulta el [Catálogo de acciones][7].

- **Creación de plantillas**
  - "Aplicar plantilla": Pasa parámetros de entrada a un conjunto de archivos.
- **GitHub**
  - "Crear o actualizar archivo": Crea o modifica archivos en un repositorio de GitHub.
  - "Editar configuración de archivo": Modifica los archivos de configuración de YAML o JSON.
  - "Activar flujo de trabajo de acciones de GitHub": Inicia una acción de GitHub.
  - "Buscar repositorios": Recupera un lista de repositorios.
  - "Crear solicitud de incorporación de cambios": Abre una solicitud de incorporación de cambios.
- **GitLab**
  - "Crear archivo": Crea un archivo en un repositorio de GitLab.
  - "Crear proyecto": Crea un proyecto de GitLab.
- **Azure DevOps**
  - "Ejecutar pipeline": Activa la ejecución de un pipeline en Azure DevOps.
- **Recuperar información de servicios** 
  - "Enumerar definiciones de entidades": Recupera todas las definiciones de servicios del catálogo de software de Datadog (v3.0 y anteriores).
  - "Obtener dependencias del servicio": Recupera las dependencias ascendentes y descendentes de un servicio.
- **Aprobaciones**
  - "Tomar una decisión": Utiliza Slack o Microsoft Teams para solicitar una aprobación.
    - Utiliza integraciones con ServiceNow, Jira o llamadas HTTP si ya dispones de un proceso de gestión de cambios.
- **HTTP**
  - "Hacer solicitud": Realiza una solicitud HTTP para interactuar con cualquier API externa.
- **Transformación de datos**
  - "Expresión", "función": Realiza transformaciones de datos con JavaScript.
    - Utiliza Bits AI como ayuda para escribir un código personalizado en JavaScript.
- **Acciones privadas**
  - Para interactuar con recursos privados, utiliza el [Ejecutor de acciones privadas][12].


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