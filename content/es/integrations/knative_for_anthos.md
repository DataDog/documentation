---
categories:
- nube
- configuración y despliegue
- contenedores
- google cloud
- kubernetes
- recopilación de logs
- orquestación
custom_kind: integration
dependencies: []
description: Recopila métricas y logs de clústeres de Knative para Anthos y analízalos
  en Datadog.
doc_link: https://docs.datadoghq.com/integrations/knative_for_anthos/
draft: false
git_integration_title: knative_for_anthos
has_logo: true
integration_id: knative-for-anthos
integration_title: Knative para Anthos
integration_version: ''
is_public: true
manifest_version: '1.0'
name: knative_for_anthos
public_title: Integración de Datadog y Knative para Anthos
short_description: Recopila métricas y logs de clústeres de Knative para Anthos y
  analízalos en Datadog.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Knative para Anthos es una plataforma de desarrollo serverless flexible para entornos híbridos y multinube. Knative para Anthos es la oferta de [Knative][1] gestionada y totalmente compatible con Google.

Utiliza la integración de Datadog Google Cloud Platform para recopilar métricas de Knative para Anthos.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura la [integración de Google Cloud Platform][2].

Si ya estás autenticando tus servicios de Knative para Anthos con Workload Identity, entonces no se necesitan más pasos.

Si no has habilitado Workload Identity, debes migrar para utilizar Workload Identity y empezar a recopilar métricas de Knative. Esto implica vincular una cuenta de servicio de Kubernetes a una cuenta de servicio de Google y configurar cada servicio del que desees recopilar métricas para utilizar Workload Identity.

Para obtener instrucciones detalladas de configuración, consulta [Google Cloud Workload Identity][3].

### APM

Knative para Anthos expone [logs de servicio][4].
Los logs de Knative pueden recopilarse con Google Cloud Logging y enviarse a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow][5].

Una vez hecho esto, exporta tus logs de Google Cloud Run desde Google Cloud Logging a Pub/Sub:

1. Ve a [Knative para Anthos][6], haz clic en los servicios deseados y navega hasta la pestaña **Logs**.
2. Haz clic en **View in Logs Explorer** (Ver en Logs Explorer) para ir a la **Google Cloud Logging Page** (Página de registro de Google Cloud).
2. Haz clic en **Create sink** (Crear sink) y asigna al sink el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el Pub/Sub creado a tal efecto. **Nota**: El Pub/Sub puede estar ubicado en un proyecto diferente.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "knative_for_anthos" >}}


### Eventos

La integración de Knative para Anthos no incluye ningún evento.

### Checks de servicio

La integración de Knative para Anthos no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[3]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[4]: https://cloud.google.com/anthos/run/docs/logging
[5]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/anthos/run
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[8]: https://docs.datadoghq.com/es/help/
