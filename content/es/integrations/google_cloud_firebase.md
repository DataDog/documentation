---
categories:
- cloud
- google cloud
- log collection
- mobile
custom_kind: integración
dependencies: []
description: Realiza un seguimiento del uso de la red y del almacén de datos atribuible
  a tus servicios Firebase.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_firebase/
draft: false
git_integration_title: google_cloud_firebase
has_logo: true
integration_id: google-cloud-firebase
integration_title: Google Cloud Firebase
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_firebase
public_title: Integración de Datadog y Google Cloud Firebase
short_description: Realiza un seguimiento del uso de la red y del almacén de datos
  atribuible a tus servicios Firebase.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Firebase es una plataforma móvil que te ayuda a desarrollar rápidamente aplicaciones de alta calidad, a hacer crecer tu base de usuarios y a ganar más dinero.

Obtén métricas de Google Firebase para:

- Visualizar el rendimiento de tus bases de datos y tus servicios de alojamiento Firebase.
- Correlacionar el rendimiento de tus herramientas Firebase con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### APM

Los logs de Google Firebase se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Firebase desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Firebase.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-firebase" >}}


### Eventos

La integración Google Firebase no incluye eventos.

### Checks de servicio

La integración Google Firebase no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[5]: https://docs.datadoghq.com/es/help/