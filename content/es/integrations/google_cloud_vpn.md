---
"app_id": "google-cloud-vpn"
"app_uuid": "5297234c-9d4c-4619-b340-9bc020c4a17a"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "metrics":
      "check": "gcp.vpn.network.sent_bytes_count"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.vpn."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "191"
    "source_type_name": "Google Cloud VPN"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "network"
- "google cloud"
- "log collection"
"custom_kind": "integración"
"dependencies": []
"description": "Monitoriza el estado, el rendimiento, el recuento de sesiones del túnel VPN y más"
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_vpn/"
"draft": falso
"git_integration_title": "google_cloud_vpn"
"has_logo": verdadero
"integration_id": "google-cloud-vpn"
"integration_title": "Google Cloud VPN"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_cloud_vpn"
"public_title": "Google Cloud VPN"
"short_description": "Google Cloud VPN conecta de forma segura tu actual red a tu red de Google Cloud Platform (GCP)"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Network"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Google Cloud VPN conecta de forma segura tu actual red a tu red de Google Cloud Platform (GCP)"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google Cloud VPN"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

La VPN de Google Cloud conecta de forma segura tu red actual a tu red Google Cloud Platform.

Obtén métricas de la VPN de Google para:

- Visualizar el rendimiento de tus VPN.
- Correlacionar el rendimiento de tus VPN con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de la VPN de Google Cloud se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de la VPN de Google Cloud de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de la VPN de Google Cloud.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_vpn" >}}


### Eventos

La integración de la VPN de Google Cloud no incluye eventos.

### Checks de servicios

La integración de la VPN de Google Cloud no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_vpn/google_cloud_vpn_metadata.csv
[5]: https://docs.datadoghq.com/help/

