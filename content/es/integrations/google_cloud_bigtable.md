---
categories:
- nube
- google cloud
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas de Google Bigtable.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_bigtable/
draft: false
git_integration_title: google_cloud_bigtable
has_logo: true
integration_id: google-cloud-bigtable
integration_title: Google Bigtable
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_bigtable
public_title: Integración de Datadog y Google Bigtable
short_description: Realiza el seguimiento de las métricas de Google Bigtable.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Bigtable es el servicio de base de datos de grandes datos NoSQL de Google. Es la misma base de datos que alimenta muchos de los principales servicios de Google como Buscadores, Analytics, Maps y Gmail.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Bigtable.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### APM

Los logs de Google Bigtable se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Bigtable desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Bigtable.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_bigtable" >}}


### Eventos

La integración Google Bigtable no incluye eventos.

### Checks de servicio

La integración Google Bigtable no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_bigtable/google_cloud_bigtable_metadata.csv
[5]: https://docs.datadoghq.com/es/help/