---
app_id: shoreline-integration
app_uuid: 90e1b0ed-0907-4973-929c-7e7f1be0c4f4
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://shoreline.io/
  name: Shoreline.io
  sales_email: sales@shoreline.io
  support_email: support@shoreline.io
categories:
- automatización
- rum
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/shoreline/README.md
display_on_public_website: true
draft: false
git_integration_title: shoreline
integration_id: shoreline-integration
integration_title: Shoreline.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: shoreline
public_title: Shoreline.io
short_description: Crear automatizaciones para reparar los monitores activados
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Incidents
  - Offering::UI Extension
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Crear automatizaciones para reparar los monitores activados
  media:
  - caption: Dashboard de corrección
    image_url: images/remediation_dashboard.png
    media_type: imagen
  - caption: Ejemplo de configuración de la automatización de la corrección
    image_url: images/automate_remediation.png
    media_type: imagen
  - caption: Ejemplo de depuración y reparación interactivas en toda la flota
    image_url: images/fleetwide_interactive_debugging_and_repair.png
    media_type: imagen
  - caption: Ejemplo de detalles de comandos de linux en toda la flota
    image_url: images/fleetwide_linux_command_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Shoreline.io
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

La automatización de incidencias de Shoreline permite a los ingenieros de DevOps y de fiabilidad del sitio (SRE) **depurar a escala** interactivamente y **crear corrección** rápidamente para eliminar el trabajo repetitivo.

La función de depuración y reparación te permite ejecutar comandos en tiempo real en toda tu granja de servidores sin necesidad de SSH en los servidores de forma individual. Ejecuta todo lo que pueda escribirse en el símbolo del sistema de Linux, como comandos de Linux, scripts shell y llamadas a la API de proveedores de la nube, y convierte estas sesiones de depuración en automatizaciones conectadas a monitores de Datadog.

La aplicación de Shoreline ejecuta automáticamente la automatización cuando se activa el monitor, lo que reduce significativamente el tiempo medio de reparación (MTTR) y el trabajo manual.

Shoreline ayuda a todos los empleados que están de guardia a ser tan buenos como tu mejor SRE. Shoreline ofrece a tu equipo de guardia las herramientas de depuración y acciones de corrección aprobadas, lo que te ayuda a solucionar incidencias más rápidamente con menos escalaciones y de forma correcta la primera vez, con menos errores.

Para empezar, crea una cuenta de prueba en [Shoreline][1].
## Ajuste

### Instalación

Sigue los pasos a continuación para configurar la integración:

1. Descarga el Agent de Shoreline.
2. Instala la integración de Datadog desde este cuadro para acceder a la aplicación.
2. Configura la aplicación de Datadog y Shoreline.


#### Agent de Shoreline

Un Agent es un proceso eficiente y no intrusivo que se ejecuta en segundo plano en tus hosts monitorizados. Los Agents recopilan, agregan y envían datos desde el host y todos los pods y contenedores conectados al backend de Shoreline, que utiliza los datos para crear métricas.

Los Agents actúan como un enlace seguro entre Shoreline y los recursos del entorno. Los Agents pueden ejecutar acciones en tu nombre, desde simples comandos de Linux hasta manuales de corrección. Las declaraciones de lenguaje operativo pasan una solicitud de API a través del backend de Shoreline y a los Agents correspondientes, que ejecutan el comando en los recursos seleccionados.

Los Agents reciben comandos del backend de Shoreline y toman medidas correctivas automáticas en función de las alarmas, acciones y bots que configures. Estos objetos trabajan en tándem para monitorizar tu flota y enviar la respuesta adecuada si algo funciona mal.

Instala Agents de Shoreline en cada host que desees que Shoreline monitorice y actúe en consecuencia. 

Para instalar el Agent de Shoreline, sigue uno de estos tres métodos:

1. [Kubernetes][2]
2. [Kubernetes con Helm][3]
3. [Máquinas virtuales][4]


#### Configuración de la aplicación

Para configurar la aplicación de Datadog y Shoreline en Shoreline, necesitas tus claves de API y aplicación de Datadog, y definir el nombre de dashboard y el nombre de webhook.

Por ejemplo:
![ejemplo_de_integracion][5]

Para obtener instrucciones detalladas sobre la configuración de la aplicación, consulta la [documentación de Datadog y Shoreline][6].

## Agent

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

## Leer más

Para más información, consulta la [documentación de Shoreline][8].


[1]: https://shoreline.io/datadog?source=DatadogIntTile
[2]: https://docs.shoreline.io/installation/kubernetes
[3]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[4]: https://docs.shoreline.io/installation/virtual-machines
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/shoreline/images/integrate_shoreline_and_datadog.png
[6]: https://docs.shoreline.io/integrations/datadog
[7]: https://docs.datadoghq.com/es/help/
[8]: https://docs.shoreline.io/