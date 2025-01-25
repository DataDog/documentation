---
app_id: docontrol
app_uuid: 7622c46e-bade-44ce-99e1-a3529bf4fc04
assets: {}
author:
  homepage: https://www.docontrol.io/
  name: DoControl
  sales_email: sales@docontrol.io
  support_email: support@docontrol.io
categories:
- automatización
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/docontrol/README.md
display_on_public_website: true
draft: false
git_integration_title: docontrol
integration_id: docontrol
integration_title: DoControl
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: docontrol
public_title: DoControl
short_description: 'Seguridad de datos SaaS: modernización de DLP y CASB para proteger
  los datos SaaS'
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 'Seguridad de datos SaaS: modernización de DLP y CASB para proteger
    los datos SaaS'
  media:
  - caption: Utiliza los flujos de trabajo automatizados de seguridad de DoControl
      para crear una lógica de negocio sofisticada, flexible y detallada con las capacidades
      de incidencias y logs de Datadog.
    image_url: images/dc-dd-01.png
    media_type: imagen
  - caption: DoControl consolida los eventos de actividad del usuario final y los
      metadatos de activos en todas tus aplicaciones SaaS para proporcionar una vista
      centralizada de toda la actividad SaaS y la exposición de activos.
    image_url: images/dc-dd-02.png
    media_type: imagen
  - caption: DoControl proporciona información práctica y visibilidad de todo tu ecosistema
      de aplicaciones SaaS.
    image_url: images/dc-dd-03.png
    media_type: imagen
  - caption: DoControl se integra con las aplicaciones SaaS más populares en múltiples
      segmentos, incluyendo aplicaciones que entran en las categorías de Colaboración,
      CRM, Comunicación, Herramientas de desarrollo, RRHH, IdP, EDR y más.
    image_url: images/dc-dd-04.png
    media_type: image
  - caption: DoControl proporciona un amplio catálogo de manuales preestablecidos
      y listos para usar, que representan modelos de amenazas comunes y casos de uso
      críticos para el funcionamiento que proteger.
    image_url: images/dc-dd-05.png
    media_type: imagen
  - caption: El mecanismo de detección de anomalías en todo SaaS de DoControl activa
      alertas contextuales para reducir el tiempo de respuesta a incidencias y proporcionar
      medidas de corrección automática.
    image_url: images/dc-dd-06.png
    media_type: imagen
  - caption: DoControl proporciona visibilidad y permite remediar los inventarios
      de todas tus aplicaciones SaaS, incluidas las aplicaciones de terceros (aplicaciones
      OAuth), un importante vector de amenazas.
    image_url: images/dc-dd-07.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: DoControl
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Esta integración permite a los clientes de [DoControl][1] reenviar sus logs y eventos relacionados con DoControl a Datadog a través de flujos de trabajo de seguridad automatizados.

## Configuración

Para configurar esta integración, debes tener una cuenta activa de [DoControl][2]. También debes tener [permisos de administrador][3] adecuados en Datadog.

### Instalación

No es necesaria ninguna instalación en tu host.

### Utilizar las acciones de Datadog en los flujos de trabajo de DoControl

Debes crear una clave de API de Datadog y una clave de aplicación para utilizarlas como parámetros de entrada para las acciones de Datadog en DoControl.

#### Crear una clave de API en Datadog

1. Utiliza la documentación [Añadir una clave de API][4] de Datadog para crear una clave de API. Asigna a la clave un nombre significativo, como `DoControl`.
2. Copia la página `Key` y guárdala.


#### Crear una clave de aplicación en Datadog

1. Utiliza la documentación [Añadir claves de aplicación][5] de Datadog para crear una clave de aplicación.
2. Copia y guarda tu clave de aplicación.

![Get_DD_Application_Key][6]


#### Crear una integración de Datadog en DoControl

1. En DoControl, navega a [Dashboard->Settings->Workflows->Secrets][7] (Dashboard -> Configuración -> Flujos de trabajo -> Secretos) y añade tu clave de API de Datadog como un nuevo secreto.

   ![DC_Secrets][8]

2. Crea un nuevo flujo de trabajo a partir de un [**manual**][9] preestablecido o [**desde cero**][10].

   ![DC_WF_Create][11]

3. Diseña y edita tu lógica de negocio arrastrando y soltando acciones en el lienzo, configurando los pasos y conectándolos.

4. Desde la barra de acciones, en **Utilities** (Utilidades), puedes arrastrar y soltar acciones de Datadog en tu flujo de trabajo, como **Send logs** (Enviar logs) o **Create incident** (Crear incidencia).

   ![DC_Utils][12]

5. Configura las acciones para hacer referencia a la DD-API-KEY almacenada como secreto en el paso 1 anterior, y la DD-APPLICATION-KEY obtenida en [Crear una clave de aplicación en Datadog](#create-an-application-key-in-datadog). 

   ![DC_DD_conf][13]

Más información sobre DoControl en la [documentación de DoControl][14].




## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][15] o el [soporte de DoControl][16].


[1]: https://www.docontrol.io/
[2]: https://www.docontrol.io/demo
[3]: https://docs.datadoghq.com/es/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-application-keys
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/Get_DD_Application_Key.png
[7]: https://app.docontrol.io/settings/workflows?tab=Secrets
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Secrets.png
[9]: https://app.docontrol.io/workflowV2/playbooks?filter=by_use_case&use_case=all
[10]: https://app.docontrol.io/workflowV2/workflow/new/workflow-editor
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_WF_Create.png
[12]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Utils.png
[13]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_DD_conf.png
[14]: https://docs.docontrol.io/docontrol-user-guide/the-docontrol-console/workflows-beta/designing-and-editing-workflows/defining-workflow-and-action-settings#action-categories
[15]: https://docs.datadoghq.com/es/help/
[16]: mailto:support@docontrol.io