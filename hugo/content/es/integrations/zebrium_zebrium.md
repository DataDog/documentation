---
algolia:
  subcategory: Integraciones de marketplace
app_id: zebrium-zebrium
app_uuid: 3e2a6d39-2057-4cb5-bc0e-5610a43afaf7
assets: {}
author:
  homepage: https://www.zebrium.com
  name: Zebrium
  sales_email: hello@zebrium.com
  support_email: support@zebrium.com
  vendor_id: zebrium
categories:
- notificaciones
- automatización
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zebrium_zebrium
integration_id: zebrium-zebrium
integration_title: Causa raíz de Zebrium como servicio
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: zebrium_zebrium
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.zebrium.zebrium
  product_id: zebrium
  short_description: Los precios de Zebrium se basan en el volumen de eventos de logs
  tag: núcleo
  unit_label: Millones de eventos de logs ingeridos
  unit_price: 0.3
public_title: Causa raíz de Zebrium como servicio
short_description: Zebrium muestra la causa raíz de los problemas directamente en
  tus dashboards
supported_os:
- linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Notifications
  - Category::Automation
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Zebrium muestra la causa raíz de los problemas directamente en tus
    dashboards
  media:
  - caption: 'Vídeo: Buscador de las causas raíz para Datadog.'
    image_url: images/Zebrium_Root_Cause_as_a_Service_thumb.png
    media_type: vídeo
    vimeo_id: 703040365
  - caption: Widget de Zebrium en el cual se muestran dos detecciones de causas raíz
      (punto rojo sobre líneas verticales).
    image_url: images/Zebrium_Root_Cause_Finder_Widget.png
    media_type: imagen
  - caption: Resumen de la causa raíz de Zebrium mostrado en un panel lateral.
    image_url: images/Zebrium_Root_Cause_Finder_With_Side_Panel.png
    media_type: imagen
  - caption: Detalles del informe de la causa raíz de Zebrium (interfaz de usuario
      de Zebrium).
    image_url: images/Zebrium_Root_Cause_Report_Details.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/
  support: README.md#Support
  title: Causa raíz de Zebrium como servicio
  uninstallation: README.md#Uninstallation
---

<!--  CON ORIGEN EN https://github.com/DataDog/marketplace -->


## Información general

**Contrata una licencia SaaS de Zebrium en Datadog Marketplace.

Cuando sabes que hay un problema y no estás seguro de cuál es la causa, [Zebrium][1] trabaja para mostrarte automáticamente la causa raíz directamente en tus dashboards de Datadog. La solución de Zebrium aplica el aprendizaje automático a los logs, pero no es necesario entrenar manualmente los datos ni configurar ninguna regla y alcanza la precisión en menos de 24 horas.

Utilizar Zebrium es muy sencillo. Cuando estés solucionando un problema, en lugar de investigar minuciosamente, sólo tienes que desplazarte hasta la aplicación Zebrium en tu dashboard de Datadog y buscar la detección correspondiente.

Una vez que seas cliente de Zebrium, podrás empezar a utilizar los dos puntos de integración entre Zebrium y Datadog: 1) una aplicación Zebrium Datadog con un widget de dashboard personalizado y 2) una integración de Datadog que envía eventos y métricas desde Zebrium. Para la instalación, visita la [página de integraciones][4] y busca Zebrium.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Zebrium a través del siguiente canal:

- Correo electrónico: [support@zebrium.com][2]

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Encuentra la causa raíz más rápidamente con Datadog y Zebrium][5]

[1]: https://www.zebrium.com
[2]: mailto:support@zebrium.com
[3]: https://cloud.zebrium.com
[4]: https://app.datadoghq.com/integrations
[5]: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un asociado tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/zebrium-zebrium" target="_blank">Haz clic aquí</a> para comprar esta aplicación.