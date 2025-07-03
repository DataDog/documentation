---
categories:
- nube
- orquestación
- google cloud
- recopilación de logs
custom_kind: integración
dependencies: []
description: Recopila métricas y logs de clústeres de Cloud Run para Anthos y analízalos
  en Datadog.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_run/
  tag: Documentación
  text: Integración Google Cloud Run
git_integration_title: google_cloud_run_for_anthos
has_logo: true
integration_id: google-cloud-run-for-anthos
integration_title: Google Cloud Run para Anthos
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_run_for_anthos
public_title: Integración de Datadog y Google Cloud Run para Anthos
short_description: Recopila métricas y logs de tus clústeres de Cloud Run para Anthos
  y analízalos en Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Google Cloud Run para Anthos es una plataforma de desarrollo serverless flexible para entornos híbridos y multinube. Cloud Run para Anthos es la oferta [Knative][1] gestionada y totalmente soportada de Google. Si utilizas Google Cloud totalmente gestionado, consulta la [documentación de Google Cloud Run][2].

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Run para Anthos.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura la [integración de Google Cloud Platform][3].

Si ya autenticas tus servicios Cloud Run para Anthos utilizando Workload Identity, entonces no es necesario realizar más pasos.

Si no has habilitado Workload Identity, debes migrar para utilizar Workload Identity y empezar a recopilar métricas de Knative. Esto implica vincular una cuenta de servicio de Kubernetes a una cuenta de servicio de Google y configurar cada servicio del que quieres recopilar métricas para que utilice Workload Identity.

Para obtener instrucciones detalladas de configuración, consulta [Google Cloud Workload Identity][4].

### APM

Google Cloud Run para Anthos expone [logs de servicios][5].
Los logs de Google Cloud Run pueden recopilarse con Google Cloud Logging y enviarse a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][6].

Una vez hecho esto, exporta tus logs de Google Cloud Run de Google Cloud Logging al tema Pub/Sub:

1. Ve a [Cloud Run for Anthos]][7], haz clic en los servicios elegidos y ve a la pestaña **Logs**.
2. Haz clic en **View in Logs Explorer** (Ver en el Explorador de logs) para ir a la **Página de generación de logs de Google Cloud**.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

### Rastreo y métricas personalizadas
Utiliza el [Controlador de admisión de Datadog][8] para configurar rastreadores APM y clientes DogStatsD automáticamente. Inyecta las variables de entorno `DD_AGENT_HOST` y `DD_ENTITY_ID` utilizando uno de los siguientes métodos:

- Añade la etiqueta (label) `admission.datadoghq.com/enabled: "true"` a tu pod.
- Configura el Controlador de admisión del Cluster Agent definiendo `mutateUnlabelled: true`.

Para evitar que los pods reciban variables de entorno, añade la etiqueta `admission.datadoghq.com/enabled: "false"`. Esto funciona incluso si defines `mutateUnlabelled: true`. Para obtener más información, consulta la documentación del [Controlador de admisión de Datadog][8].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-run-for-anthos" >}}


### Eventos

La integración Google Cloud Run para Anthos no incluye eventos.

### Checks de servicio

La integración Google Cloud Run para Anthos no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_run/
[3]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[5]: https://cloud.google.com/anthos/run/docs/logging
[6]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[7]: https://console.cloud.google.com/anthos/run
[8]: https://docs.datadoghq.com/es/containers/cluster_agent/admission_controller/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[10]: https://docs.datadoghq.com/es/help/
