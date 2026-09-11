---
app_id: apptrail
app_uuid: 302b6db7-d1d6-445c-ae20-00743775cb6b
assets: {}
author:
  homepage: https://apptrail.com
  name: Apptrail
  sales_email: sales@apptrail.com
  support_email: support@apptrail.com
categories:
- recopilación de logs
- seguridad
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apptrail/README.md
display_on_public_website: true
draft: false
git_integration_title: apptrail
integration_id: apptrail
integration_title: Apptrail
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: apptrail
public_title: Apptrail
short_description: Monitorización, análisis y creación de alertas de todos tus logs
  de auditoría de SaaS con Apptrail
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Monitorización, análisis y creación de alertas de todos tus logs de
    auditoría de SaaS con Apptrail
  media:
  - caption: Apptrail aloja un portal de logs de auditoría en nombre de los proveedores
      de SaaS, donde los clientes pueden ver, buscar, configurar y exportar sus logs
      de auditoría.
    image_url: images/1-at-portal.png
    media_type: imagen
  - caption: Visualiza un historial completo de los eventos de auditoría en el Portal
      Apptrail y también busca y filtra por tiempo y por propiedades de eventos.
    image_url: images/2-at-events-history.png
    media_type: imagen
  - caption: Los eventos de auditoría de Apptrail contienen información detallada
      sobre el quién, el qué, el dónde, el cuándo y el cómo de una actividad registrada,
      junto con información contextual como direcciones IP y datos personalizados
      de los eventos.
    image_url: images/3-at-log-detail.png
    media_type: imagen
  - caption: Crea rutas para transmitir continuamente logs de auditoría en tiempo
      real a decenas de destinos, como por ejemplo Datadog, para su archivado, monitorización
      y análisis.
    image_url: images/4-at-create-trail-sel.png
    media_type: imagen
  - caption: Utiliza reglas para filtrar y seleccionar un subconjunto de eventos y
      enviarlos desde una ruta.
    image_url: images/5-at-trail-detail.png
    media_type: imagen
  - caption: Los logs de auditoría de Apptrail se exportan continuamente a Datadog
      Logs en tiempo real, donde puedes analizarlos, consultarlos y monitorizarlos.
    image_url: images/6-datadog-preview.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Apptrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[Apptrail][1] es la plataforma integral de logs de auditoría SaaS. Las empresas de SaaS utilizan Apptrail para añadir a sus productos logs de auditoría con todas las funciones, dirigidos al cliente. Los clientes pueden ver, consultar, analizar y exportar logs de auditoría de todos sus proveedores de SaaS utilizando Apptrail.

La función de ([rutas][2]) para la transmisión de eventos de auditoría de Apptrail te permite enviar logs de auditoría a decenas de destinos populares.

La integración de Apptrail en Datadog te permite exportar continuamente tus logs de auditoría de SaaS desde Apptrail a Datadog en tiempo real. Puedes utilizar Datadog para analizar, archivar, monitorizar y generar alertas de tus logs de auditoría de SaaS.

## Configuración

Como requisito previo, tu proveedor de SaaS debe haberte registrado en Apptrail.

Para empezar, crea una ruta de entrega en el Portal Apptrail y elige Datadog como destino configurado.

### Pasos

Para obtener información general sobre la creación de rutas, consulta la documentación [Creación de una ruta][3].

1. Ve a la página [**Rutas**][4] del Portal Apptrail.
2. Haz clic en el botón **Create a new trail** (Crear una nueva ruta) en la parte superior derecha.
3. Introduce un **nombre de ruta** y configura todas las **reglas**.
4. Haz clic en **Next** (Siguiente) y selecciona **Datadog** en la lista de destinos.
5. Indica qué [**Región/Sitio** Datadog][5] quieres utilizar. Por ejemplo, `EU` para app.datadoghq.eu o `US1` para app.datadoghq.com.
6. Introduce tu [clave de API Datadog][6].
7. Haga clic en **Create trail** (Crear ruta) para crear la ruta.

### Validación

Para ver logs de auditoría de Apptrail en Datadog:

1. Ve a **Logs** > **Live Tail**.
2. Consulta los logs de auditoría de Apptrail configurando `source:apptrail`.

Para ver más detalles, consulta la [documentación sobre el envío de Apptrail a Datadog][7].

## Datos recopilados

### APM

Cualquier [ruta][2] de Apptrail con un destino en Datadog enviará continuamente a Datadog todos los logs coincidentes con las [reglas de ruta][8] configuradas. Para conocer el formato de los logs de auditoría de Apptrail, consulta [Formato de eventos][9].

## Agent

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][10] o con el [servicio de asistencia de Apptrail][11].

## Leer más

- [Documentación del cliente de Apptrail][12]
- [Documentación sobre el envío de logs de Apptrail a Datadog][7]
- [Formato de logs de auditoría de Apptrail][9]
- [Rutas de envío de eventos de Apptrail][2]

[1]: https://apptrail.com
[2]: https://apptrail.com/docs/consumers/guide/event-delivery/#trails
[3]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#creating-a-trail
[4]: https://portal.apptrail.com/trails
[5]: https://docs.datadoghq.com/es/getting_started/site/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://apptrail.com/docs/consumers/guide/event-delivery/integrations/datadog
[8]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#selecting-events-using-trail-rules
[9]: https://apptrail.com/docs/consumers/guide/event-format
[10]: https://docs.datadoghq.com/es/help/
[11]: mailto:support@apptrail.com
[12]: https://apptrail.com/docs/consumers/guide