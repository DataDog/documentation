---
app_id: "google-cloudsql"
app_uuid: "78424ece-59a2-4965-87a9-ab3dd5eb0ddf"
assets:
  dashboards:
    gcp_sql_screen: "assets/dashboards/gcp_sql_screen.json"
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: "gcp.cloudsql.database.uptime"
      metadata_path: "metadata.csv"
      prefix: "gcp.cloudsql."
    service_checks:
      metadata_path: "assets/service_checks.json"
    source_type_id: 185
    source_type_name: "Google CloudSQL"
author:
  homepage: "https://www.datadoghq.com"
  name: "Datadog"
  sales_email: "info@datadoghq.com"
  support_email: "help@datadoghq.com"
categories:
- "cloud"
- "data stores"
- "google cloud"
- "log collection"
custom_kind: "integration"
dependencies: []
description: "Realiza el seguimiento de las métricas de rendimiento, estado y replicación de la base de datos"
display_on_public_website: true
doc_link: "https://docs.datadoghq.com/integrations/google_cloudsql/"
draft: false
git_integration_title: "google_cloudsql"
has_logo: true
integration_id: "google-cloudsql"
integration_title: "Google CloudSQL"
integration_version: ""
is_public: true
manifest_version: "2.0.0"
name: "google_cloudsql"
public_title: "Google CloudSQL"
short_description: "Sencillo servicio de base de datos relacional totalmente gestionada Postges, MySQL y SQL Server"
supported_os: []
tile:
  changelog: "CHANGELOG.md"
  classifier_tags:
  - "Category::Cloud"
  - "Category::Almacenes de datos"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Offering::Integration"
  configuration: "README.md#Setup"
  description: "Sencillo servicio de base de datos relacional totalmente gestionada Postges, MySQL y SQL Server"
  media: []
  overview: "README.md#Overview"
  support: "README.md#Support"
  title: "Google CloudSQL"
version: "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud SQL es un servicio de base de datos totalmente gestionado que facilita la configuración, el mantenimiento, la gestión y la administración de tus bases de datos SQL en la nube.

Obtén métricas de Google Cloud SQL para:

- Visualizar el rendimiento de tus bases de datos Cloud SQL.
- Correlacionar el rendimiento de tus bases de datos Cloud SQL con tus aplicaciones.

## Configuración

### Instalación

#### Recopilación de métricas

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

#### Configuración

Para recopilar etiquetas (labels) Cloud SQL personalizadas como etiquetas (tags), activa el permiso de inventario de recursos en la nube.

#### Recopilación de logs


{{< site-region region="us3" >}}

La recopilación de logs no es compatible con este sitio.

{{< /site-region >}}



{{< site-region region="us,eu,gov" >}}

Los logs de Google Cloud SQL se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud SQL de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra los logs de Google Cloud SQL.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer

{{< /site-region >}}


## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloudsql" >}}


### Eventos

La integración Google Cloud SQL no incluye eventos.

### Checks de servicios

**gcp.cloudsql.database.state**
Estado de servicio actual de la instancia de Cloud SQL.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[3]: https://docs.datadoghq.com/help/

