---
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
- mobile
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud Firestore.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_firestore/
draft: false
git_integration_title: google_cloud_firestore
has_logo: true
integration_id: google-cloud-firestore
integration_title: Google Cloud Firestore
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_firestore
public_title: Integración de Datadog y Google Cloud Firestore
short_description: Realiza el seguimiento de las métricas clave de Google Cloud Firestore.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Google Cloud Firestore es una base de datos flexible y escalable para el desarrollo móvil, web y de servidor de Firebase y Google Cloud Platform.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Firestore.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### APM

Los logs de Google Cloud Firestore se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Firestore de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Firestore.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-firestore" >}}


### Eventos

La integración Google Cloud Firestore no incluye eventos.

### Checks de servicio

La integración Google Cloud Firestore no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firestore/google_cloud_firestore_metadata.csv
[5]: https://docs.datadoghq.com/es/help/