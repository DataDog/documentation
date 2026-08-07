---
"app_id": "google-compute-engine"
"app_uuid": "4062cbf3-d1fc-4422-9c36-f145543c0142"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "metrics":
      "check": "gcp.gce.instance.is_running"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.gce."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "187"
    "source_type_name": "Google Compute Engine"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "configuration & deployment"
- "google cloud"
- "log collection"
- "network"
- "os & system"
"custom_kind": "integración"
"dependencies": []
"description": "Realiza un seguimiento de las instancias ocupadas y compara las métricas de uso de cuenta con los límites de cuota"
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/google_compute_engine/"
"draft": falso
"git_integration_title": "google_compute_engine"
"has_logo": verdadero
"integration_id": "google-compute-engine"
"integration_title": "Google Compute Engine"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_compute_engine"
"public_title": "Google Compute Engine"
"short_description": "Google Compute Engine ofrece máquinas virtuales que se ejecutan en los innovadores centros de datos de Google y en la red de fibra óptica mundial."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Configuración y despliegue"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Category::Network"
  - "Category::Sistema operativo y sistema"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Google Compute Engine ofrece máquinas virtuales que se ejecutan en los innovadores centros de datos de Google y en la red de fibra óptica mundial."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google Compute Engine"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Compute Engine ofrece máquinas virtuales que se ejecutan en los innovadores centros de datos de Google y en la red mundial de fibra red.

Obtén métricas de Google Compute Engine para:

- Visualizar el rendimiento de tus motores informáticos.
- Correlacionar el rendimiento de tus motores informáticos con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

#### Configuración

Para recopilar etiquetas (labels) Compute Engine personalizadas como etiquetas (tags), activa el permiso de inventario de recursos en la nube.

### Recopilación de logs

Los logs de Google Compute Engine se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google App Engine desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra los logs de Google Compute Engine.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

### Configuración

#### Limitar la recopilación de los hosts 

Si quieres monitorizar un subconjunto de tus instancias de GCE con Datadog, asigna una etiqueta (label) GCE, como `datadog:true`, a esas instancias de GCE. Luego, especifica esa etiqueta (tag) en el cuadro de texto **Limitar opcionalmente la recopilación de métricas** del [cuadro de la integración GCP en Datadog][4]. Para obtener más información sobre el filtrado de máquinas virtuales por etiqueta (tag), consulta la [documentación de la integración Google Cloud Platform][5].

#### Silenciado automático de GCE

Datadog puede silenciar de forma proactiva monitores relacionados con el apagado manual de instancias de Google Compute Engine (GCE) y el cierre de instancias desencadenado por el autoescalado de GCE, en función de los estados de hosts de la API GCE. Las instancias de GCE silenciadas se enumeran en la página [Tiempo de inactividad del monitor][6] seleccionando **Mostrar hosts silenciados automáticamente**.

Para silenciar monitores durante cierres esperados de instancias de GCE, marca la casilla **Silenciado automático de GCE** en el [cuadro de la integración Google Cloud Platform][1].

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="Silenciado automático de GCE" >}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_compute_engine" >}}


### Eventos

La integración Google Cloud Compute Engine no incluye eventos.

### Checks de servicios

La integración Google Cloud Compute Engine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

-   [Monitorización de métricas de Google Compute Engine][9]
-   [Recopilación de métricas de Google Compute Engine][10]
-   [Monitorización de Google Compute Engine con Datadog][11]

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://app.datadoghq.com/integrations/google_cloud_platform
[5]: https://docs.datadoghq.com/integrations/google_cloud_platform/#configuration
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_compute_engine/google_compute_engine_metadata.csv
[8]: https://docs.datadoghq.com/help/
[9]: https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance
[10]: https://www.datadoghq.com/blog/how-to-collect-gce-metrics
[11]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog

