---
categories:
- nube
- contenedores
- nube de Google
- colección de logs
- orquestación
custom_kind: integration
dependencies: []
description: Recopila métricas, trazas (traces) y logs de todo tus clústeres y analízalos
  en Datadog.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-google-cloud-run-with-datadog/
  tag: Blog
  text: Monitoriza Google Cloud Run con Datadog
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: Documentación
  text: Google Cloud Run para Anthos
git_integration_title: google_cloud_run
has_logo: true
integration_id: google-cloud-run
integration_title: Google Cloud Run
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_run
public_title: Integración de Datadog y Google Cloud Run
short_description: Recopila métricas, trazas (traces) y logs de todos tus clústeres
  y analízalos en Datadog.
version: '1.0'
---

<!--  CON ORIGEN EN https://github.com/DataDog/dogweb -->
## Información general

Cloud Run es una plataforma de computación administrada que permite ejecutar contenedores sin estado invocables mediante solicitudes HTTP.

Habilita esta integración e instrumenta tu contenedor para ver todas tus métricas, trazas (traces) y logs de Cloud Run en Datadog.

Para más información sobre Cloud Run para Anthos, consulta la [documentación de Google Cloud Run para Anthos][1].

## Configuración

### Recopilación de métricas

#### Instalación

Configura la [integración de Google Cloud Platform][2] para empezar a recopilar métricas de forma predefinida. Para configurar métricas personalizadas consulta la [documentación serverless ][3]. 

### APM

#### integración
Google Cloud Run también expone [logs de auditoría][4].
Los logs de Google Cloud Run se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si todavía no lo has hecho, [configura el registro con la plantilla Datadog Dataflow][5].

Una vez hecho esto, exporta tus logs de Google Cloud Run logs desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][6] y filtra los logs de Google Cloud Run.
2. Haz clic en **Crear receptor** y asigna el nombre correspondiente al receptor.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede estar ubicado en un proyecto diferente.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub Logs a Pub Sub" >}}

4. Haz clic en **Crear** y espera a que aparezca el mensaje de confirmación.

#### Registro directo
Para más información sobre el registro directo de aplicaciones en Datadog desde tus servicios de Cloud Run, consulta la [documentación serverless ][3].

### Rastreo

Para obtener más información sobre las instrucciones de configuración especializadas del Agent para Google Cloud Run totalmente administrado, consulta la [documentación serverless][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_run" >}}


### Eventos

La integración de las funciones de Google Cloud no incluye ningún evento.

### Checks de servicios

La integración de las funciones de Google Cloud no incluye ningún check de servicios.


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_run_for_anthos/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[3]: https://docs.datadoghq.com/es/serverless/google_cloud_run
[4]: https://cloud.google.com/run/docs/audit-logging
[5]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/logs/viewer
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run/google_cloud_run_metadata.csv
[8]: https://docs.datadoghq.com/es/help/