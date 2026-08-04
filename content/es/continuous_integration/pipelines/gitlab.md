---
aliases:
- /es/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explorar los resultados y el rendimiento de la ejecución de pipelines
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Ampliar la visibilidad de los pipelines añadiendo medidas y etiquetas (tags)
    personalizadas
title: Configuración de GitLab para CI Visibility
---

## Información general

[GitLab][18] es una plataforma DevOps que automatiza el ciclo de vida del desarrollo de software con funciones CI/CD integradas, lo que permite el despliegue automatizado y continuo de aplicaciones con controles de seguridad incorporados.

Configura CI Visibility para que GitLab recopile datos de tus ejecuciones de pipelines, analice cuellos de botella de rendimiento, solucione problemas operativos y optimice tus flujos de despliegues.

### Compatibilidad

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Pipelines en ejecución][24] | Pipelines en ejecución | Observa las ejecuciones de los pipelines que se están ejecutando. Los pipelines en cola o en espera se muestran con el estado "En ejecución" en Datadog. |
| [Análisis de fallos de trabajos CI][28] | Análisis de fallos de trabajos CI | Utiliza modelos LLM en logs relevantes para analizar la causa raíz de trabajos CI fallidos. |
| [Filtrar trabajos CI en la ruta crítica][29] | Filtrar trabajos CI en la ruta crítica | Filtra por trabajos en la ruta crítica. |
| [Reintentos parciales][19] | Pipelines parciales | Observa los reintentos parciales de ejecuciones de pipelines. |
| [Pasos manuales][20] | Pasos manuales | Visualiza los pipelines activados manualmente. |
| [Tiempo de cola][21] | Tiempo de cola | Observa la cantidad de tiempo que los trabajos de pipelines permanecen en la cola antes de ser procesados. |
| Correlación de logs | Correlación de logs | Correlaciona tramos (spans) de pipelines con logs y activa la [recopilación de logs de trabajos][12]. |
| Correlación de métricas de infraestructura  | Correlación de métricas de infraestructura  | Correlaciona los trabajos con [métricas de host de infraestructura][14] para ejecutores GitLab autoalojados. |
| Etiquetas predefinidas personalizadas | Etiquetas predefinidas personalizadas | Configura [etiquetas personalizadas][10] en todos los pipelines, etapas y tramos de trabajos generados. |
| [Etiquetas][15] y [medidas][16] personalizadas en tiempo de ejecución | Etiquetas y medidas personalizadas en tiempo de ejecución | Configura [etiquetas y medidas personalizadas][13] en tiempo de ejecución. |
| Parámetros | Parámetros | Define parámetros personalizados `env` o `service` cuando se active un pipeline. |
| [Razones de fallos de pipelines][11] | Razones de fallos de pipelines | Identifica los motivos de fallos en pipelines a través de los [mensajes de error][15]. |
| [Tiempo de espera para la aprobación][22] | Tiempo de espera para la aprobación  | Visualiza la cantidad de tiempo que esperan los trabajos y pipelines para las aprobaciones manuales. |
| [Tiempo de ejecución][23] | Tiempo de ejecución  | Consulta la cantidad de tiempo que los pipelines han estado ejecutando trabajos. Gitlab se refiere a esta métrica como `duration`. La duración en Gitlab y el tiempo de ejecución pueden mostrar valores diferentes. Gitlab no tiene en cuenta los trabajos que han fallado debido a ciertos tipos de fallos (como fallos del sistema del ejecutor). |
| [Tramos personalizados][25] | Tramos personalizados | Configura tramos personalizados para tus pipelines. |

Se admiten las siguientes versiones de GitLab:

- GitLab.com (SaaS)
- GitLab >= v14.1 (autoalojado)
- GitLab >= v13.7.0 (autoalojado) con la opción `datadog_ci_integration` activada.

### Terminología

Esta tabla muestra la correspondencia de conceptos entre Datadog CI Visibility y GitLab:

| Datadog                    | GitLab   |
|----------------------------|----------|
| Tuberías                   | Tuberías |
| Etapa                      | Etapa    |
| Trabajo                        | Trabajo      |
| _No disponible en Datadog_ | Script   |

## Configurar la integración Datadog

{{< tabs >}}
{{% tab "GitLab.com" %}}

Configura la integración en un [proyecto][101] o [grupo][102] en **Settings > Integrations > Datadog** (Configuración > Integraciones > Datadog) para cada proyecto o grupo que quieras instrumentar.


Rellena los parámetros de configuración de la integración:

**Active** (Activo)
: Activa la integración.

**Datadog site** (Sitio Datadog)
: Especifica a qué [sitio Datadog][103] se enviarán los datos.<br/>
**Por defecto**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (URL de la API) (opcional)
: Permite anular la URL de la API utilizada para enviar datos directamente. Solo se utiliza en escenarios avanzados.<br/>
**Por defecto**: (vacío, sin anulación)

**API key** (Clave de API)
: Especifica qué [clave de API de Datadog][104] se utilizará al enviar datos.

**Enable CI Visibility** (Activar CI Visibility)
: Controla la activación de las funciones de CI Visibility, incluyendo el rastreo de pipelines, el cálculo de rutas críticas y la monitorización del rendimiento. Asegúrate de que esta casilla está marcada para activar estas funciones.

**Service** (Servicio) (opcional)
: Especifica qué nombre de servicio se adjuntará a cada tramo generado por la integración. Utilízalo para diferenciar entre instancias GitLab.<br/>
**Por defecto**: `gitlab-ci`

**Env** (Entorno) (opcional)
: Especifica qué entorno (etiqueta `env`) se adjuntará a cada tramo generado por la integración. Utilízalo para diferenciar entre grupos de instancias GitLab (por ejemplo, staging o producción).<br/>
**Por defecto**: `none`

**Tags** (Etiquetas) (opcional)
: Especifica qué etiquetas personalizadas se adjuntarán a cada tramo generado por la integración. Proporciona una etiqueta por línea con el formato: `key:value`.<br/>
**Por defecto**: (vacío, sin etiquetas adicionales)<br/>
**Nota**: Disponible solo en GitLab.com y GitLab >= v14.8 (autoalojado).

Puedes probar la integración presionando el botón **Test Settings** (Probar parámetros) (solo disponible al configurar la integración en un proyecto). Si la prueba funciona correctamente, haz clic en **Save changes** (Guardar cambios) para finalizar la configuración de la integración. Si el botón falla, haz clic en **Save changes** y comprueba que los primeros webhooks enviados hayan tenido éxito consultando el historial en la sección "Recent events" (Eventos recientes) más abajo.

[101]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: /es/getting_started/site/
[104]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

Configura la integración en un [proyecto][101] o [grupo][102] en **Settings > Integrations > Datadog** (Configuración > Integraciones > Datadog) para cada proyecto o grupo que quieras instrumentar. También puedes activar la integración a nivel de la [instancia][103] GitLab en **Admin > Settings > Integrations > Datadog** (Administrador > Configuración > Integraciones > Datadog).

Rellena los parámetros de configuración de la integración:

**Active** (Activo)
: Activa la integración.

**Datadog site** (Sitio Datadog)
: Especifica a qué [sitio Datadog][104] se enviarán los datos.<br/>
**Por defecto**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (URL de la API) (opcional)
: Permite anular la URL de la API utilizada para enviar datos directamente. Solo se utiliza en escenarios avanzados.<br/>
**Por defecto**: (vacío, sin anulación)

**API key** (Clave de API)
: Especifica qué [clave de API de Datadog][105] se utilizará al enviar datos.

**Enable CI Visibility** (Activar CI Visibility)
: Controla la activación de las funciones de CI Visibility, incluyendo el rastreo de pipelines, el cálculo de rutas críticas y la monitorización del rendimiento. Asegúrate de que esta casilla está marcada para activar estas funciones. Solo está disponible a partir de GitLab v17.7, y no es necesario en versiones anteriores.

**Service** (Servicio) (opcional)
: Especifica qué nombre de servicio se adjuntará a cada tramo generado por la integración. Utilízalo para diferenciar entre instancias GitLab.<br/>
**Por defecto**: `gitlab-ci`

**Env** (Entorno) (opcional)
: Especifica qué entorno (etiqueta `env`) se adjuntará a cada tramo generado por la integración. Utilízalo para diferenciar entre grupos de instancias GitLab (por ejemplo, staging o producción).<br/>
**Por defecto**: `none`

**Tags** (Etiquetas) (opcional)
: Especifica qué etiquetas personalizadas se adjuntarán a cada tramo generado por la integración. Proporciona una etiqueta por línea con el formato: `key:value`.<br/>
**Por defecto**: (vacío, sin etiquetas adicionales)<br/>
**Nota**: Disponible solo en GitLab.com y GitLab >= v14.8 (autoalojado).

Puedes probar la integración presionando el botón **Test Settings** (Probar parámetros) (solo disponible al configurar la integración en un proyecto). Si la prueba funciona correctamente, haz clic en **Save changes** (Guardar cambios) para finalizar la configuración de la integración. Si el botón falla, haz clic en **Save changes** y comprueba que los primeros webhooks enviados hayan tenido éxito consultando el historial en la sección "Recent events" (Eventos recientes) más abajo.

[101]: https://docs.gitlab.com/ee/administration/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
[104]: /es/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

Activa el [indicador de función][101] `datadog_ci_integration`para activar la integración.

Ejecuta uno de los siguientes comandos, que utilizan [Rails Runner][102] de GitLab, dependiendo de tu tipo de instalación:

De **Instalaciones Omnibus**:

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Desde **Instalaciones fuente**:

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Desde **Instalaciones Kubernetes**:

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

A continuación, configura la integración en un [proyecto][103] en **Settings > Integrations > Datadog** (Configuración > Integraciones > Datadog) para cada proyecto que quieras instrumentar.

<div class="alert alert-warning">Debido a un <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">error</a> en versiones anteriores de GitLab, la integración de Datadog no puede activarse a nivel de <strong>grupo o instancia</strong> en <strong>versiones de GitLab < 14.1</strong>, aunque la opción esté disponible en la interfaz de usuario de GitLab.</div>


Rellena los parámetros de configuración de la integración:

**Active** (Activo)
: Activa la integración.

**Datadog site** (Sitio Datadog)
: Especifica a qué [sitio Datadog][104] se enviarán los datos.<br/>
**Por defecto**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (URL de la API) (opcional)
: Permite anular la URL de la API utilizada para enviar datos directamente. Solo se utiliza en escenarios avanzados.<br/>
**Por defecto**: (vacío, sin anulación)

**API key** (Clave de API)
: Especifica qué [clave de API de Datadog][105] se utilizará al enviar datos.

**Service** (Servicio) (opcional)
: Especifica qué nombre de servicio se adjuntará a cada tramo generado por la integración. Utilízalo para diferenciar entre instancias GitLab.<br/>
**Por defecto**: `gitlab-ci`

**Env** (Entorno) (opcional)
: Especifica qué entorno (etiqueta `env`) se adjuntará a cada tramo generado por la integración. Utilízalo para diferenciar entre grupos de instancias GitLab (por ejemplo, staging o producción).<br/>
**Por defecto**: `none`

**Tags** (Etiquetas) (opcional)
: Especifica qué etiquetas personalizadas se adjuntarán a cada tramo generado por la integración. Proporciona una etiqueta por línea con el formato: `key:value`.<br/>
**Por defecto**: (vacío, sin etiquetas adicionales)<br/>
**Nota**: Disponible solo en GitLab.com y GitLab >= v14.8 (autoalojado).

Puedes probar la integración presionando el botón **Test Settings** (Probar parámetros) (solo disponible al configurar la integración en un proyecto). Si la prueba funciona correctamente, haz clic en **Save changes** (Guardar cambios) para finalizar la configuración de la integración. Si el botón falla, haz clic en **Save changes** y comprueba que los primeros webhooks enviados hayan tenido éxito consultando el historial en la sección "Recent events" (Eventos recientes) más abajo.

[101]: https://docs.gitlab.com/ee/administration/feature_flags.html
[102]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[104]: /es/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "GitLab &lt; 13.7" %}}

<div class="alert alert-danger">El soporte directo con webhooks no está en desarrollo. Podrían producirse problemas inesperados. Por esta razón Datadog recomienda actualizar GitLab.</div>

Para versiones anteriores de GitLab, puedes utilizar [webhooks][101] para enviar datos de pipelines a Datadog.

Ve a **Settings > Webhooks** (Configuración > Webhooks) en tu repositorio (o parámetros de la instancia GitLab), y añade un nuevo webhook:

- **URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> donde `<API_KEY>` es tu [clave de API de Datadog][102].
- **Secret Token** (Token secreto): Deja este campo vacío.
- **Trigger** (Activador): Selecciona `Job events` y `Pipeline events`.

Para definir parámetros `env` o `service` personalizados, añade más parámetros de consulta en la URL de los webhooks. Por ejemplo, `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`.

### Establecer etiquetas personalizadas

Para definir etiquetas personalizadas en todos los tramos de pipelines y trabajos generados por la integración, añade `tags` de parámetro de consulta codificadas URL, con pares `key:value` separados por comas.

Si un par clave:valor contiene comas, enciérralo entre comillas. Por ejemplo, para añadir `key1:value1,"key2: value with , comma",key3:value3`, habría que añadir la siguiente cadena a la **URL del webhook**: `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`.

[101]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[102]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Configuración avanzada

### Establecer etiquetas personalizadas

Puedes definir etiquetas personalizadas para todos los tramos de pipelines y trabajos de tus proyectos de GitLab para mejorar la trazabilidad. Para obtener más información, consulta [Etiquetas y medidas personalizadas][13].

#### Integrar con los equipos de Datadog

Para mostrar y filtrar los equipos asociados a tus pipelines, añade `team:<your-team>` como una etiqueta personalizada. El nombre de etiqueta personalizada debe coincidir exactamente con el identificador de tu equipo en [Equipos de Datadog][16].

### Correlacionar métricas de infraestructura con trabajos

Si utilizas ejecutores GitLab autoalojados, puedes correlacionar los trabajos con la infraestructura que los ejecuta.

La correlación con infraestructuras Datadog es posible utilizando diferentes métodos:

{{< tabs >}}
{{% tab "Ejecutores sin autoescalado" %}}
El ejecutor GitLab debe tener una etiqueta con el formato `host:<hostname>`. Las etiquetas se pueden añadir mientras [se registra un nuevo ejecutor][1]. Como resultado, este método solo está disponible cuando el ejecutor está ejecutando el trabajo directamente.

Esto excluye los ejecutores que están autoescalando la infraestructura para ejecutar el trabajo (como los ejecutores Kubernetes, Docker Autoscaler o Instance), ya que no es posible añadir etiquetas dinámicamente para esos ejecutores.

Para ejecutores existentes:

- GitLab >= v15.8: Añade etiquetas a través de la interfaz de usuario yendo a **Settings > CI/CD > Runners** (Configuración > CI/CD > Ejecutores) y editando el ejecutor apropiado.

- GitLab < v15.8: Añade etiquetas actualizando el `config.toml` del ejecutor. Si no, añade etiquetas a través de la interfaz de usuario yendo a **Settings > CI/CD > Runners** (Configuración > CI/CD > Ejecutores) y editando el ejecutor apropiado.

Luego de estos pasos, CI Visibility añade el nombre de host a cada trabajo. Para ver las métricas, haz clic en el tramo de un trabajo en la vista de las trazas (traces). En el cajón, aparece una nueva pestaña llamada **Infrastructure** (Infraestructura) que contiene las métricas de host.

[1]: https://docs.gitlab.com/runner/register/
{{% /tab %}}

{{% tab "Docker Autoscaler" %}}
CI Visibility admite métricas de infraestructura para ejecutores "Docker Autoscaler" a través de una correlación basada en logs. Para activarlo, asegúrate de que los logs de trabajos de GitLab están indexados para que Datadog pueda vincular trabajos con hosts, y que los logs incluyan mensajes con el formato `Instance <hostname> connected`. Los logs de trabajos de GitLab incluyen las etiquetas `datadog.product:cipipeline` y `source:gitlab`, que puedes utilizar en los filtros de [índices de logs][2]. Los usuarios también necesitan [acceso de lectura a los logs][3] para ver los datos de infraestructura en este escenario. Para obtener más información, consulta la [guía sobre la correlación de métricas de infraestructura con trabajos de GitLab][1].

[1]: /es/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /es/logs/indexes/
[3]: /es/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Instancia" %}}
CI Visibility admite métricas de infraestructura para ejecutores de "instancias" a través de una correlación basada en logs. Para activarlo, asegúrate de que los logs de trabajos de GitLab están indexados para que Datadog pueda vincular trabajos con hosts, y que los logs incluyan mensajes con el formato `Instance <hostname> connected`. Los logs de trabajos de GitLab incluyen las etiquetas `datadog.product:cipipeline` y `source:gitlab`, que puedes utilizar en los filtros de [índices de logs][2]. Los usuarios también necesitan [acceso de lectura a los logs][3] para ver los datos de infraestructura en este escenario. Para obtener más información, consulta la [guía sobre la correlación de métricas de infraestructura con trabajos de GitLab][1].

[1]: /es/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /es/logs/indexes/
[3]: /es/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Kubernetes" %}}
CI Visibility admite métricas de infraestructura para el ejecutor de Kubernetes. Para ello, es necesario que el Datadog Agent monitorice la infraestructura de Gitlab Kubernetes. Consulta [Instalar el Datadog Agent en Kubernetes][1] para instalar el Datadog Agent en un clúster Kubernetes.

Debido a las limitaciones del Datadog Agent, los trabajos que no llegan al intervalo mínimo de recopilación del Datadog Agent podrían no mostrar siempre las métricas de correlación de infraestructuras. Para ajustar este valor, consulta la [plantilla de configuración del Datadog Agent][2] y ajusta la variable `min_collection_interval` para que sea inferior a 15 segundos.

[1]: /es/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
{{% /tab %}}

{{% tab "Otros ejecutores" %}}
CI Visibility no admite métricas de infraestructura de otros ejecutores.
{{% /tab %}}

{{< /tabs >}}

### Visualizar mensajes de error de fallos de pipelines

En las ejecuciones fallidas de pipelines deGitLab, cada error en la pestaña `Errors` (Errores) de una ejecución específica de pipeline muestra un mensaje asociado con el tipo de error de GitLab.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="Motivo del fallo en GitLab" style="width:100%;">}}

#### Análisis de fallos en trabajos de CI

Si la recopilación de logs de trabajos está activada, CI Visibility utiliza modelos LLM para analizar los trabajos de CI fallidos basándose en logs relevantes procedentes de GitLab.

También puedes añadir el análisis de fallos en trabajos a un comentario de solicitud pull. Consulta la guía sobre [uso de comentarios de solicitud pull][30].

Para una explicación completa, consulta la guía sobre [el uso del análisis de fallos de trabajos de CI][28].

#### Errores proporcionados por GitLab

Los mensajes de error son compatibles con las versiones 15.2.0 y posteriores de GitLab.

La información sobre errores que proporciona GitLab se almacena en las etiquetas `error.provider_message` y `error.provider_domain`.

En la siguiente tabla se describen el mensaje y el dominio correlacionados con cada tipo de error. Cualquier tipo de error no incluido en la lista da lugar a un mensaje de error `Job failed` y a un dominio de error `unknown`.

| Tipo de error                       | Dominio de error | Mensaje de error                                              |
|---------------------------------|--------------|------------------------------------------------------------|
| `unknown_failure`                | desconocido      | Fallo debido a una causa desconocida.                             |
| `config_error`                   | usuario         | Fallo debido a un error en el archivo de configuración CI/CD.           |
| `external_validation_failure`    | desconocido      | Fallo debido a la validación externa del pipeline.                |
| `user_not_verified`              | usuario         | El pipeline ha fallado debido a que el usuario no ha sido verificado.    |
| `activity_limit_exceeded`        | proveedor     | Se ha superado el límite de actividad del pipeline.                  |
| `size_limit_exceeded`            | proveedor     | Se ha superado el límite de tamaño del pipeline.                      |
| `job_activity_limit_exceeded`    | proveedor     | Se ha superado el límite de actividad del pipeline.              |
| `deployments_limit_exceeded`     | proveedor     | Se ha superado el límite de despliegues de pipeline.               |
| `project_deleted`                | proveedor     | Se ha eliminado el proyecto asociado a este pipeline.     |
| `api_failure`                    | proveedor     | Fallo de la API.                                               |
| `stuck_or_timeout_failure`       | desconocido      | El pipeline está bloqueado o se ha superado el tiempo de espera.                            |
| `runner_system_failure`          | proveedor     | Ha fallado debido a un fallo del sistema del ejecutor.                       |
| `missing_dependency_failure`     | desconocido      | Ha fallado debido a que falta una dependencia.                          |
| `runner_unsupported`             | proveedor     | Ha fallado debido a un ejecutor no compatible.                          |
| `stale_schedule`                 | proveedor     | Ha fallado debido a un horario obsoleto.                              |
| `job_execution_timeout`          | desconocido      | Ha fallado debido a que se ha superado el tiempo de espera de un trabajo.                                |
| `archived_failure`               | proveedor     | Fallo archivado.                                         |
| `unmet_prerequisites`            | desconocido      | Ha fallado por no cumplirse un requisito previo.                          |
| `scheduler_failure`              | proveedor     | Ha fallado debido a un fallo en el horario.                            |
| `data_integrity_failure`         | proveedor     | Ha fallado debido a la integridad de los datos.                              |
| `forward_deployment_failure`     | desconocido      | Fallo de despliegue.                                        |
| `user_blocked`                   | usuario         | Bloqueado por el usuario.                                           |
| `ci_quota_exceeded`              | proveedor     | Cuota CI superada.                                         |
| `pipeline_loop_detected`         | usuario         | Bucle de pipeline detectado.                                    |
| `builds_disabled`                | usuario         | Compilación desactivada.                                            |
| `deployment_rejected`            | usuario         | Despliegue rechazado.                                      |
| `protected_environment_failure`  | proveedor     | Fallo medioambiental.                                       |
| `secrets_provider_not_found`     | usuario         | Proveedor secreto no encontrado.                                 |
| `reached_max_descendant_pipelines_depth` | usuario   | Alcanzado el máximo de pipelines descendientes.                        |
| `ip_restriction_failure`          | proveedor     | Fallo de restricción de IP.                                    |

### Recopilar logs de trabajos

Las siguientes versiones de GitLab admiten la recopilación de logs de trabajos:

* GitLab.com (SaaS)
* GitLab >= v15.3 (autoalojado) solo si utilizas el [almacenamiento de objetos para almacenar logs de trabajos][7]
* GitLab >= v14.8 (autoalojado) activando la opción `datadog_integration_logs_collection`.

Los logs de trabajos se recopilan en [Log Management][9] y se correlacionan automáticamente con el pipeline de GitLab en CI Visibility. Los archivos de logs de más de 1 GiB se truncan.

Para permitir la recopilación de logs de trabajos:

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. Haz clic en la casilla **Enable job logs collection** (Activar la recopilación de logs de trabajos) en **Settings > Integrations > Datadog** (Configuración > Integraciones > Datadog) de la integración de GitLab.
2. Haz clic en **Guardar cambios**.
{{% /tab %}}

{{% tab "GitLab &gt;&amp;equals; 15.3" %}}
<div class="alert alert-danger">Datadog descarga archivos de logs directamente desde tu <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">almacenamiento de objetos</a> de logs de GitLab con URL temporales previamente firmadas.
Esto significa que para que los servidores Datadog puedan acceder al almacenamiento, este no debe tener restricciones de red.
El <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, si se configura, debe resolverse a una URL de acceso público.</div>

1. Haz clic en la casilla **Enable job logs collection** (Activar la recopilación de logs de trabajos) en **Settings > Integrations > Datadog** (Configuración > Integraciones > Datadog) de la integración de GitLab.
2. Haz clic en **Guardar cambios**.

{{% /tab %}}

{{% tab "GitLab &gt;&amp;equals; 14.8" %}}
<div class="alert alert-danger">Datadog descarga archivos de logs directamente desde tu <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">almacenamiento de objetos</a> de logs de GitLab con URL temporales previamente firmadas.
Esto significa que para que los servidores Datadog puedan acceder al almacenamiento, este no debe tener restricciones de red.
El <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">endpoint</a>, si se configura, debe resolverse a una URL de acceso público.</div>

1. Activa el [indicador de función][1] `datadog_integration_logs_collection` en tu GitLab. Esto te permite ver la casilla (Activar la recopilación de logs de trabajos) en **Settings > Integrations > Datadog** (Configuración > Integraciones > Datadog) de la integración GitLab.
2. Haz clic en **Enable job logs collection** (Activar la recopilación de logs de trabajos).
3. Haz clic en **Guardar cambios**.

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

Los logs se facturan aparte de CI Visibility. La retención, exclusión e índices de logs se configuran en [Log Management][6]. Los logs de trabajos de GitLab pueden identificarse por las etiquetas `datadog.product:cipipeline` y `source (fuente):gitlab`.

Para obtener más información sobre el procesamiento de logs de trabajos recopilados de la integración de GitLab, consulta la [documentación sobre procesadores][17].

## Ver los pipelines parciales y descendentes

Puedes utilizar los siguientes filtros para personalizar tu consulta de búsqueda en el [CI Visibility Explorer][26].

{{< img src="ci/partial_retries_search_tags.png" alt="La página de ejecuciones del pipeline con la expresión Partial Pipeline:retry ingresada en la consulta de búsqueda." style="width:100%;">}}

| Nombre de la faceta | ID de la faceta | Valores posibles |
|---|---|---|
| Pipeline descendente | `@ci.pipeline.downstream` | `true`, `false` |
| Activación manual | `@ci.is_manual` | `true`, `false` |
| Pipeline parcial | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

También puedes aplicar estos filtros mediante el panel de facetas situado en la parte izquierda de la página.

{{< img src="ci/partial_retries_facet_panel.png" alt="El panel de facetas con la faceta Partial Pipeline expandida y el valor Retry seleccionado, la faceta Partial Retry expandida y el valor true seleccionado." style="width:20%;">}}

## Visualizar los datos de los pipelines en Datadog

Una vez que la integración se ha configurado correctamente, las páginas [**Lista de pipelines CI**][4] y [**Ejecuciones**][5] se rellenan con datos, una vez finalizados los pipelines.

La página **Lista de pipelines CI** muestra datos solo de la rama por defecto de cada repositorio. Para obtener más información, consulta [Buscar y gestionar pipelines CI][27].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /es/logs/guide/best-practices-for-log-management/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /es/logs/
[10]: /es/continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: /es/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: /es/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[13]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[14]: /es/continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /es/continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures
[16]: /es/account_management/teams/
[17]: /es/logs/log_configuration/processors/
[18]: https://about.gitlab.com/
[19]: /es/glossary/#partial-retry
[20]: /es/glossary/#manual-step
[21]: /es/glossary/#queue-time
[22]: /es/glossary/#approval-wait-time
[23]: /es/glossary/#pipeline-execution-time
[24]: /es/glossary/#running-pipeline
[25]: /es/glossary/#custom-span
[26]: /es/continuous_integration/explorer
[27]: /es/continuous_integration/search/#search-for-pipelines
[28]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/
[29]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[30]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments