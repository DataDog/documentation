---
aliases:
- /es/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Amplíe Pipeline Visibility añadiendo etiquetas y métricas personalizadas
title: Configuración de GitLab para CI Visibility
---
## Descripción general {#overview}

[GitLab][18] es una plataforma DevOps que automatiza el ciclo de vida de desarrollo de software con funciones integradas de CI/CD, lo que permite el despliegue automatizado y continuo de aplicaciones con controles de seguridad integrados.

Configure CI Visibility para GitLab a fin de recopilar datos sobre las ejecuciones de sus pipelines, analizar cuellos de botella en el rendimiento, solucionar problemas operativos y optimizar sus flujos de trabajo de despliegue.

### Compatibilidad {#compatibility}

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Pipelines en ejecución][24] | Pipelines en ejecución | Consulte las ejecuciones de pipelines que se están ejecutando. Los pipelines en cola o en espera se muestran con el estado "Running" en Datadog. |
| [Trabajos en ejecución][32] | Trabajos en ejecución | Consulte las ejecuciones de trabajos que se están ejecutando actualmente. |
| [Análisis de fallos de trabajos de CI][28] | Análisis de fallos de trabajos de CI | Utiliza modelos LLM en los registros relevantes para analizar la causa raíz de los trabajos de CI fallidos. |
| [Filtrar trabajos de CI en la ruta crítica][29] | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica. |
| [Reintentos parciales][19] | Pipelines parciales | Consulte las ejecuciones de pipelines reintentadas parcialmente. |
| [Reintentos automáticos de trabajos][31] | Reintentos automáticos de trabajos | Datadog reintenta los trabajos fallidos clasificados como transitorios por su modelo de error de IA. |
| [Pasos manuales][20] | Pasos manuales | Consulte los pipelines activados manualmente. |
| [Tiempo de cola][21] | Tiempo de cola | Consulte la cantidad de tiempo que los trabajos de pipeline permanecen en la cola antes de procesarse. |
| Correlación de registros | Correlación de registros | Correlacione los tramos de pipeline con los registros y habilite la [recopilación de registros de trabajos][12]. |
| Correlación de métricas de infraestructura | Correlación de métricas de infraestructura | Correlacione los trabajos con las [métricas de servidor de infraestructura][14] para los ejecutores de GitLab autohospedados. |
| Etiquetas personalizadas predefinidas | Etiquetas personalizadas predefinidas | Establezca [etiquetas personalizadas][10] para todos los tramos de pipeline, etapas y trabajos generados. |
| [Etiquetas personalizadas][15] [y medidas en tiempo de ejecución][16] | Etiquetas y medidas personalizadas en tiempo de ejecución | Configure [etiquetas y medidas personalizadas][13] en tiempo de ejecución. |
| Parámetros | Parámetros | Configure parámetros personalizados `env` cuando se active un pipeline.`service` |
| [Motivos de falla de la canalización][11] | Motivos de falla de la canalización | Identifique los motivos de falla del pipeline a partir de los [mensajes de error][15]. |
| [Tiempo de espera de aprobación][22] | Tiempo de espera de aprobación  | Consulte la cantidad de tiempo que los trabajos y los pipelines esperan para aprobaciones manuales. |
| [Tiempo de ejecución][23] | Tiempo de ejecución  | Consulte la cantidad de tiempo que los pipelines han estado ejecutando trabajos. Gitlab se refiere a esta métrica como `duration`. La duración en Gitlab y el tiempo de ejecución pueden mostrar valores diferentes. Gitlab no toma en consideración los trabajos que fallaron debido a ciertos tipos de fallas (como fallas del sistema del ejecutor). |
| [Rangos personalizados][25] | Rangos personalizados | Configure rangos personalizados para sus canalizaciones. |

Se admiten las siguientes versiones de GitLab:

- GitLab.com (SaaS)
- GitLab >= 14.1 (autohospedado)
- GitLab >= 13.7.0 (autohospedado) con la `datadog_ci_integration` marca de función habilitada

### Terminología {#terminology}

Esta tabla muestra el mapeo de conceptos entre Datadog CI Visibility y GitLab:

| Datadog                    | GitLab   |
|----------------------------|----------|
| Pipeline                   | Pipeline |
| Etapa                      | Etapa    |
| Trabajo                        | Trabajo      |
| _No disponible en Datadog_ | Script   |

## Configurar la integración de Datadog {#configure-the-datadog-integration}

{{< tabs >}}
{{% tab "GitLab.com" %}}

Configure la integración en un [proyecto][101] o [grupo][102] yendo a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} para cada proyecto o grupo que desee instrumentar.


Complete los ajustes de configuración de la integración:

{{< ui >}}Active{{< /ui >}}
: Habilita la integración.

{{< ui >}}Datadog site{{< /ui >}}
: Especifique a qué [sitio de Datadog][103] enviar los datos.<br/>
**Predeterminado**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (opcional)
: Permite anular la URL de la API utilizada para enviar datos directamente; solo se usa en escenarios avanzados.<br/>
**Predeterminado**: (vacío, sin anulación)

{{< ui >}}API key{{< /ui >}}
: Especifique qué [clave de Datadog API][104] usar al enviar datos.

{{< ui >}}Enable CI Visibility{{< /ui >}}
: Controle la habilitación de las funciones de CI Visibility, incluyendo el seguimiento de pipelines, el cálculo de rutas críticas y el monitoreo del rendimiento. Asegúrese de que esta casilla esté marcada para activar estas capacidades.

{{< ui >}}Service{{< /ui >}} (opcional)
: Especifique qué nombre de servicio adjuntar a cada tramo generado por la integración. Úselo para diferenciar entre instancias de GitLab.<br/>
**Predeterminado**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (opcional)
: Especifique qué entorno (etiqueta `env`) adjuntar a cada tramo generado por la integración. Úselo para diferenciar entre grupos de instancias de GitLab (por ejemplo, staging o producción).<br/>
**Predeterminado**: `none`

{{< ui >}}Tags{{< /ui >}} (opcional)
: Especifique cualquier etiqueta personalizada para adjuntar a cada tramo generado por la integración. Proporcione una etiqueta por línea en el formato: `key:value`.<br/>
**Predeterminado**: (vacío, sin etiquetas adicionales)<br/>
**Nota**: Disponible solo en GitLab.com y GitLab >= 14.8 autogestionado.

Pruebe la integración con el botón {{< ui >}}Test settings{{< /ui >}} (solo disponible al configurar la integración en un proyecto). Después de que sea exitoso, haga clic en {{< ui >}}Save changes{{< /ui >}} para finalizar la configuración de la integración. Si el botón falla, haga clic en {{< ui >}}Save changes{{< /ui >}} y verifique que los primeros webhooks enviados sean exitosos consultando el historial en la sección \"Eventos recientes\" a continuación.

[101]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: /es/getting_started/site/
[104]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

Configure la integración en un [proyecto][101] o [grupo][102] yendo a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} para cada proyecto o grupo que desee instrumentar. Active la integración a nivel de [instancia][103] de GitLab yendo a {{< ui >}}Admin{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.

Complete los ajustes de configuración de la integración:

{{< ui >}}Active{{< /ui >}}
: Habilita la integración.

{{< ui >}}Datadog site{{< /ui >}}
: Especifique a qué [sitio de Datadog][104] enviar los datos.<br/>
**Predeterminado**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (opcional)
: Permite anular la URL de la API utilizada para enviar datos directamente; solo se usa en escenarios avanzados.<br/>
**Predeterminado**: (vacío, sin anulación)

{{< ui >}}API key{{< /ui >}}
: Especifique qué [clave de Datadog API][105] usar al enviar datos.

{{< ui >}}Enable CI Visibility{{< /ui >}}
: Controle la habilitación de las funciones de CI Visibility, incluyendo el seguimiento de pipelines, el cálculo de rutas críticas y el monitoreo del rendimiento. Asegúrese de que esta casilla esté marcada para activar estas capacidades. Solo está presente a partir de GitLab 17.7 y no es necesario en versiones anteriores.

{{< ui >}}Service{{< /ui >}} (opcional)
: Especifique qué nombre de servicio adjuntar a cada tramo generado por la integración. Úselo para diferenciar entre instancias de GitLab.<br/>
**Predeterminado**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (opcional)
: Especifique qué entorno (etiqueta `env`) adjuntar a cada tramo generado por la integración. Úselo para diferenciar entre grupos de instancias de GitLab (por ejemplo, staging o producción).<br/>
**Predeterminado**: `none`

{{< ui >}}Tags{{< /ui >}} (opcional)
: Especifique cualquier etiqueta personalizada para adjuntar a cada tramo generado por la integración. Proporcione una etiqueta por línea en el formato: `key:value`.<br/>
**Predeterminado**: (vacío, sin etiquetas adicionales)<br/>
**Nota**: Disponible solo en GitLab.com y GitLab >= 14.8 autogestionado.

Pruebe la integración con el botón {{< ui >}}Test settings{{< /ui >}} (solo disponible al configurar la integración en un proyecto). Después de que sea exitoso, haga clic en {{< ui >}}Save changes{{< /ui >}} para finalizar la configuración de la integración. Si el botón falla, haga clic en {{< ui >}}Save changes{{< /ui >}} y verifique que los primeros webhooks enviados sean exitosos consultando el historial en la sección \"Eventos recientes\" a continuación.

[101]: https://docs.gitlab.com/ee/administration/settings/project_integration_management.html#view-projects-that-use-custom-settings
[102]: https://docs.gitlab.com/ee/user/project/integrations/index.html#manage-group-default-settings-for-a-project-integration
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
[104]: /es/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

Habilite el `datadog_ci_integration` [feature flag][101] para activar la integración.

Ejecute uno de los siguientes comandos, que utilizan el [Rails Runner][102] de GitLab, dependiendo de su tipo de instalación:

Desde **Instalaciones Omnibus**:

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Desde **Instalaciones desde código fuente**:

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Desde **Instalaciones de Kubernetes**:

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Luego, configure la integración en un [proyecto][103] yendo a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} para cada proyecto que quiera instrumentar.

<div class="alert alert-warning">Debido a un <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">error</a> en las primeras versiones de GitLab, la integración de Datadog no se puede habilitar a nivel de <strong>grupo o instancia</strong> en <strong>versiones de GitLab < 14.1</strong>, incluso si la opción está disponible en la interfaz de usuario de GitLab.</div>


Complete los ajustes de configuración de la integración:

{{< ui >}}Active{{< /ui >}}
: Habilita la integración.

{{< ui >}}Datadog site{{< /ui >}}
: Especifique a qué [sitio de Datadog][104] enviar los datos.<br/>
**Predeterminado**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}<br/>

{{< ui >}}API URL{{< /ui >}} (opcional)
: Permite anular la URL de la API utilizada para enviar datos directamente; solo se usa en escenarios avanzados.<br/>
**Predeterminado**: (vacío, sin anulación)

{{< ui >}}API key{{< /ui >}}
: Especifique qué [clave de Datadog API][105] usar al enviar datos.

{{< ui >}}Service{{< /ui >}} (opcional)
: Especifique qué nombre de servicio adjuntar a cada tramo generado por la integración. Úselo para diferenciar entre instancias de GitLab.<br/>
**Predeterminado**: `gitlab-ci`

{{< ui >}}Env{{< /ui >}} (opcional)
: Especifique qué entorno (etiqueta `env`) adjuntar a cada tramo generado por la integración. Úselo para diferenciar entre grupos de instancias de GitLab (por ejemplo, staging o producción).<br/>
**Predeterminado**: `none`

{{< ui >}}Tags{{< /ui >}} (opcional)
: Especifique cualquier etiqueta personalizada para adjuntar a cada tramo generado por la integración. Proporcione una etiqueta por línea en el formato: `key:value`.<br/>
**Predeterminado**: (vacío, sin etiquetas adicionales)<br/>
**Nota**: Disponible solo en GitLab.com y GitLab >= 14.8 autogestionado.

Pruebe la integración con el botón {{< ui >}}Test settings{{< /ui >}} (solo disponible al configurar la integración en un proyecto). Después de que sea exitoso, haga clic en {{< ui >}}Save changes{{< /ui >}} para finalizar la configuración de la integración. Si el botón falla, haga clic en {{< ui >}}Save changes{{< /ui >}} y verifique que los primeros webhooks enviados sean exitosos consultando el historial en la sección \"Eventos recientes\" a continuación.

[101]: https://docs.gitlab.com/ee/administration/feature_flags.html
[102]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[103]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[104]: /es/getting_started/site/
[105]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "GitLab &lt; 13.7" %}}

<div class="alert alert-danger">El soporte directo con webhooks no está en desarrollo. Podrían ocurrir problemas inesperados. Datadog recomienda que actualice GitLab en su lugar.</div>

Para versiones anteriores de GitLab, puede usar [webhooks][101] para enviar datos de pipeline a Datadog.

Vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Webhooks{{< /ui >}} en su repositorio (o configuración de instancia de GitLab) y agregue un nuevo webhook:

- {{< ui >}}URL{{< /ui >}}: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> donde `<API_KEY>` es su [clave de Datadog API][102].
- {{< ui >}}Secret Token{{< /ui >}}: Deje este campo vacío.
- {{< ui >}}Trigger{{< /ui >}}: Seleccione `Job events` y `Pipeline events`.

Para establecer parámetros personalizados de `env` o `service`, agregue más parámetros de consulta en la URL de los webhooks. Por ejemplo, `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`.

### Establezca etiquetas personalizadas {#set-custom-tags}

Para establecer etiquetas personalizadas en todos los tramos de pipeline y trabajo generados por la integración, agregue un parámetro de consulta codificado en URL `tags` con pares `key:value` separados por comas a la URL.

Si un par clave:valor contiene comas, rodéelo con comillas. Por ejemplo, para agregar `key1:value1,"key2: value with , comma",key3:value3`, se tendría que añadir la siguiente cadena a la {{< ui >}}Webhook URL{{< /ui >}}: `?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`.

[101]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[102]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Configuración avanzada {#advanced-configuration}

### Establezca un nombre de pipeline {#set-a-pipeline-name}

De forma predeterminada, Datadog utiliza la ruta de su proyecto de GitLab como nombre del pipeline. Como resultado, cada pipeline descendente (secundaria) activada con la palabra clave [`trigger`][33] desde el mismo proyecto aparece con el mismo nombre en Datadog.

Para darle a un pipeline un nombre más significativo, utilice la palabra clave [`workflow:name`][34] de GitLab en su `.gitlab-ci.yml`. Por ejemplo, para nombrar un pipeline descendente según el trabajo que lo activó:

```yaml
trigger-job:
  trigger:
    include:
      - local: path/to/child-pipeline.yml
  variables:
    CHILD_PIPELINE_NAME: $CI_JOB_NAME
```

En el `.gitlab-ci.yml` del pipeline secundario (o un archivo que incluya), utilice la variable reenviada para establecer el nombre del pipeline:

```yaml
workflow:
  name: '$CHILD_PIPELINE_NAME'
```

**Nota**: El ejemplo anterior utiliza la expansión de variables en el nombre del pipeline, lo cual requiere GitLab 16.3 o posterior. `workflow:name` en sí está disponible a partir de GitLab 15.11 para nombres de cadena simples. El nombre del pipeline solo es visible en Datadog a partir de GitLab 16.1, cuando se agregó a la carga útil del webhook del pipeline.

### Establezca etiquetas personalizadas {#set-custom-tags-1}

Puede establecer etiquetas personalizadas para todos los tramos de pipeline y trabajo de sus proyectos de GitLab para mejorar la trazabilidad. Para obtener más información, consulte [Custom Tags and Measures][13].

#### Integre con Datadog Teams {#integrate-with-datadog-teams}

Para mostrar y filtrar los equipos asociados con sus canalizaciones, agregue `team:<your-team>` como una etiqueta personalizada. El nombre de la etiqueta personalizada debe coincidir exactamente con el identificador de equipo de [Datadog Teams][16].

### Correlacione métricas de infraestructura con trabajos {#correlate-infrastructure-metrics-to-jobs}

Si utiliza ejecutores de GitLab autohospedados, puede correlacionar los trabajos con la infraestructura que los ejecuta.

La correlación de infraestructura de Datadog es posible utilizando diferentes métodos:

{{< tabs >}}
{{% tab "Ejecutores sin escalado automático" %}}
El ejecutor de GitLab debe tener una etiqueta con el formato `host:<hostname>`. Las etiquetas se pueden agregar al [registrar un nuevo ejecutor][1]. Como resultado, este método solo está disponible cuando el ejecutor está ejecutando el trabajo directamente.

Esto excluye a los ejecutores que escalan automáticamente la infraestructura para ejecutar el trabajo (como los ejecutores de Kubernetes, Docker Autoscaler o Instancia), ya que no es posible agregar etiquetas dinámicamente para esos ejecutores.

Para ejecutores existentes:

- GitLab >= 15.8: Agregue etiquetas a través de la interfaz de usuario yendo a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}CI/CD{{< /ui >}} > {{< ui >}}Runners{{< /ui >}} y editando el ejecutor correspondiente.

- GitLab < 15.8: Agregue etiquetas actualizando el `config.toml` del ejecutor. O agregue etiquetas a través de la interfaz de usuario yendo a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}CI/CD{{< /ui >}} > {{< ui >}}Runners{{< /ui >}} y editando el ejecutor correspondiente.

Después de estos pasos, CI Visibility agrega el nombre de host a cada trabajo. Para ver las métricas, haga clic en un tramo de trabajo en la vista de traza. En el panel, aparece una nueva pestaña llamada {{< ui >}}Infrastructure{{< /ui >}} que contiene las métricas del servidor.

[1]: https://docs.gitlab.com/runner/register/
{{% /tab %}}

{{% tab "Docker Autoscaler" %}}
CI Visibility admite métricas de infraestructura para ejecutores de "Docker Autoscaler" mediante correlación basada en registros. Para habilitar esto, asegúrese de que los registros de trabajo de GitLab estén indexados para que Datadog pueda vincular los trabajos a los hosts, y que los registros incluyan mensajes en el formato `Instance <hostname> connected`. Los registros de trabajo de GitLab incluyen las etiquetas `datadog.product:cipipeline` y `source:gitlab`, que puede usar en los filtros de [Log Indexes][2]. Los usuarios también necesitan [acceso de lectura a registros][3] para ver los datos de infraestructura en este escenario. Para obtener más información, consulte la [guía de correlación de métricas de infraestructura con trabajos de GitLab][1].

[1]: /es/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /es/logs/indexes/
[3]: /es/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Instance" %}}
CI Visibility admite métricas de infraestructura para ejecutores de "Instance" mediante correlación basada en registros. Para habilitar esto, asegúrese de que los registros de trabajo de GitLab estén indexados para que Datadog pueda vincular los trabajos a los hosts, y que los registros incluyan mensajes en el formato `Instance <hostname> connected`. Los registros de trabajo de GitLab incluyen las etiquetas `datadog.product:cipipeline` y `source:gitlab`, que puede usar en los filtros de [Log Indexes][2]. Los usuarios también necesitan [acceso de lectura a registros][3] para ver la información de infraestructura en este escenario. Para obtener más información, consulte la [guía de correlación de métricas de infraestructura con trabajos de GitLab][1].

[1]: /es/continuous_integration/guides/infrastructure_metrics_with_gitlab
[2]: /es/logs/indexes/
[3]: /es/logs/guide/logs-rbac/
{{% /tab %}}

{{% tab "Kubernetes" %}}
CI Visibility admite métricas de infraestructura para el ejecutor de Kubernetes. Para esto, es necesario que el Datadog Agent monitoree la infraestructura de GitLab en Kubernetes. Consulte [Instalar el Datadog Agent en Kubernetes][1] para instalar el Datadog Agent en un clúster de Kubernetes.

Debido a limitaciones en el Datadog Agent, es posible que los trabajos más cortos que el intervalo mínimo de recopilación del Agente de Datadog no siempre muestren métricas de correlación de infraestructura. Para ajustar este valor, establezca `min_collection_interval` en menos de 15 segundos en su [archivo de configuración del Datadog Agent][2].

[1]: /es/containers/kubernetes/installation/?tab=datadogoperator
[2]: /es/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "Otros ejecutores" %}}
CI Visibility no admite métricas de infraestructura para otros ejecutores.
{{% /tab %}}

{{< /tabs >}}

### Visualizar mensajes de error para fallas de canalización {#view-error-messages-for-pipeline-failures}

Para las ejecuciones fallidas de canalizaciones de GitLab, cada error en la pestaña {{< ui >}}Errors{{< /ui >}} dentro de una ejecución de canalización específica muestra un mensaje asociado con el tipo de error de GitLab.

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="Motivo de falla de GitLab" style="width:100%;">}}

#### Análisis de fallas de trabajos de CI {#ci-jobs-failure-analysis}

Si la recopilación de registros de trabajos está habilitada, CI Visibility utiliza modelos LLM para analizar los trabajos de CI fallidos basándose en los registros relevantes provenientes de GitLab.

También puede agregar un análisis de falla de trabajo a un comentario de PR. Consulte la guía sobre [cómo usar comentarios de PR][30].

Para obtener una explicación completa, consulte la guía sobre [cómo usar el análisis de fallas de trabajos de CI][28].

#### Errores proporcionados por GitLab {#errors-provided-by-gitlab}

Los mensajes de error son compatibles con las versiones 15.2.0 y superiores de GitLab.

La información de error proporcionada por GitLab se almacena en las etiquetas `error.provider_message` y `error.provider_domain`.

La siguiente tabla describe el mensaje y el dominio correlacionado con cada tipo de error. Cualquier tipo de error no listado resulta en un mensaje de error `Job failed` y un dominio de error `unknown`.

| Tipo de error                       | Dominio de error | Mensaje de error                                              |.
|---------------------------------|--------------|------------------------------------------------------------|
| `unknown_failure`                | desconocido      | Falló debido a una razón desconocida.                             |
| `config_error`                   | usuario         | Falló debido a un error en el archivo de configuración de CI/CD.           |
| `external_validation_failure`    | desconocido      | Falló debido a la validación de canalización externa.                |
| `user_not_verified`              | usuario         | La canalización falló debido a que el usuario no está verificado.    |
| `activity_limit_exceeded`        | proveedor     | Se excedió el límite de actividad de la canalización.                  |
| `size_limit_exceeded`            | proveedor     | Se excedió el límite de tamaño de la canalización.                      |
| `job_activity_limit_exceeded`    | proveedor     | Se excedió el límite de actividad de trabajos de la canalización.              |
| `deployments_limit_exceeded`     | proveedor     | Se excedió el límite de implementaciones de la canalización.               |
| `project_deleted`                | proveedor     | El proyecto asociado con esta canalización fue eliminado.     |
| `api_failure`                    | proveedor     | Falla de API.                                               |
| `stuck_or_timeout_failure`       | desconocido      | La canalización está bloqueada o agotó el tiempo de espera.                            |
| `runner_system_failure`          | provider     | Falló debido a una falla del sistema del runner.                       |
| `missing_dependency_failure`     | desconocido      | Falló debido a una dependencia faltante.                          |
| `runner_unsupported`             | provider     | Falló debido a un runner no compatible.                          |
| `stale_schedule`                 | provider     | Falló debido a un horario obsoleto.                              |
| `job_execution_timeout`          | desconocido      | Falló debido al tiempo de espera del trabajo.                                |
| `archived_failure`               | proveedor     | Falla archivada.                                         |
| `unmet_prerequisites`            | desconocido      | Falló debido a un prerrequisito no cumplido.                          |
| `scheduler_failure`              | provider     | Falló debido a un fallo en el horario.                            |
| `data_integrity_failure`         | provider     | Falló debido a problemas de integridad de los datos.                              |
| `forward_deployment_failure`     | desconocido      | Falla de implementación.                                        |
| `user_blocked`                   | usuario         | Bloqueado por el usuario.                                           |
| `ci_quota_exceeded`              | proveedor     | Se excedió la cuota de CI.                                         |
| `pipeline_loop_detected`         | usuario         | Se detectó un bucle en la canalización.                                    |
| `builds_disabled`                | usuario         | Compilación deshabilitada.                                            |
| `deployment_rejected`            | usuario         | Implementación rechazada.                                      |
| `protected_environment_failure`  | proveedor     | Falla del entorno.                                       |
| `secrets_provider_not_found`     | usuario         | Proveedor de secretos no encontrado.                                 |
| `reached_max_descendant_pipelines_depth` | usuario   | Se alcanzó el máximo de canalizaciones descendientes.                        |
| `ip_restriction_failure`          | proveedor     | Falla por restricción de IP.                                    |

### Recopilar registros de trabajo {#collect-job-logs}

Las siguientes versiones de GitLab admiten la recopilación de registros de trabajo:

* GitLab.com (SaaS)
* GitLab >= 15.3 (autohospedado) solo si utiliza [almacenamiento de objetos para guardar registros de trabajo][7]
* GitLab >= 14.8 (autohospedado) al habilitar la bandera de función `datadog_integration_logs_collection`

Los registros de trabajo se recopilan en [Log Management][9] y se correlacionan automáticamente con la canalización de GitLab en CI Visibility. Los archivos de registro mayores a un GiB se truncan.

Para habilitar la recopilación de registros de trabajo:

{{< tabs >}}
{{% tab "GitLab.com" %}}
1. Haga clic en la casilla de verificación {{< ui >}}Enable job logs collection{{< /ui >}} en la integración de GitLab {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. Haga clic en {{< ui >}}Save changes{{< /ui >}}.
{{% /tab %}}

{{% tab "GitLab &gt;&equals; 15.3" %}}
<div class="alert alert-danger">Datadog descarga archivos de registro directamente desde el <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">almacenamiento de objetos</a> de sus registros de GitLab con URL temporales prefirmadas.
Esto significa que para que los servidores de Datadog accedan al almacenamiento, el almacenamiento no debe tener restricciones de red
El <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">punto de conexión</a>, si está configurado, debe resolverse en una URL accesible públicamente.</div>

1. Haga clic en la casilla de verificación {{< ui >}}Enable job logs collection{{< /ui >}} en la integración de GitLab en {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. Haga clic en {{< ui >}}Save changes{{< /ui >}}.

{{% /tab %}}

{{% tab "GitLab &gt;&equals; 14.8" %}}
<div class="alert alert-danger">Datadog descarga archivos de registro directamente desde el <a href="https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage">almacenamiento de objetos</a> de sus registros de GitLab con URL temporales prefirmadas.
Esto significa que para que los servidores de Datadog accedan al almacenamiento, el almacenamiento no debe tener restricciones de red
El <a href="https://docs.gitlab.com/ee/administration/object_storage.html#amazon-s3">punto de conexión</a>, si está configurado, debe resolverse en una URL accesible públicamente.</div>

1. Habilite el `datadog_integration_logs_collection` [feature flag][1] en su GitLab. Esto le permite ver la casilla de verificación {{< ui >}}Enable job logs collection{{< /ui >}} en la integración de GitLab en {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. Haga clic en {{< ui >}}Enable job logs collection{{< /ui >}}.
3. Haga clic en {{< ui >}}Save changes{{< /ui >}}.

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
{{% /tab %}}
{{< /tabs >}}

Los registros se facturan por separado de CI Visibility. La retención, exclusión e índices de registros se configuran en [Log Management][6]. Los registros de los trabajos de GitLab se pueden identificar mediante las etiquetas `datadog.product:cipipeline` y `source:gitlab`.

Para obtener más información sobre el procesamiento de registros de trabajos recopilados de la integración de GitLab, consulte la [documentación de procesadores][17].

## Visualizar Pipelines parciales y descendentes {#view-partial-and-downstream-pipelines}

Puede utilizar los siguientes filtros para personalizar su consulta de búsqueda en el [CI Visibility explorador][26].

{{< img src="ci/partial_retries_search_tags.png" alt="La página de ejecuciones de Pipeline con Partial Pipeline:retry ingresado en la consulta de búsqueda" style="width:100%;">}}

| Nombre de faceta | ID de faceta | Valores posibles |
|---|---|---|
| Pipelines descendentes | `@ci.pipeline.downstream` | `true`, `false` |
| Activado manualmente | `@ci.is_manual` | `true`, `false` |
| Pipelines parciales | `@ci.partial_pipeline` | `retry`, `paused`, `resumed` |

También puede aplicar estos filtros usando el panel de faceta en el lado izquierdo de la página.

{{< img src="ci/partial_retries_facet_panel.png" alt="El panel de faceta con la faceta Pipelines parciales expandida y el valor Retry seleccionado, la faceta Partial Retry expandida y el valor true seleccionado" style="width:20%;">}}

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Una vez que la integración se configure correctamente, las páginas [**Lista de Pipelines de CI**][4] y [**Ejecuciones**][5] se completarán con datos después de que los Pipelines finalicen.

La página {{< ui >}}CI Pipeline List{{< /ui >}} muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Buscar y administrar Pipelines de CI][27].

## Lecturas adicionales {#further-reading}

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
[31]: /es/continuous_integration/pipelines/automatic_retries/
[32]: /es/glossary/#running-job
[33]: https://docs.gitlab.com/ee/ci/yaml/#trigger
[34]: https://docs.gitlab.com/ee/ci/yaml/#workflowname