---
app_id: gitlab
app_uuid: 3d165411-7734-4f72-b39a-f222add296b2
assets:
  dashboards:
    Gitlab Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - gitlab.process_max_fds
      - gitlab.ruby.process_start_time_seconds
      metadata_path: metadata.csv
      prefix: gitlab.
    process_signatures:
    - gitlab-kas
    - gitlab-workhorse
    - gitlab-ctl
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 10026
    source_type_name: Gitlab
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- developer tools
- issue tracking
- log collection
- source control
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gitlab/README.md
display_on_public_website: true
draft: false
git_integration_title: gitlab
integration_id: gitlab
integration_title: GitLab
integration_version: 9.0.0
is_public: true
manifest_version: 2.0.0
name: gitlab
public_title: GitLab
short_description: Track all your GitLab metrics with Datadog.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Developer Tools
  - Category::Issue Tracking
  - Category::Log Collection
  - Category::Source Control
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Track all your GitLab metrics with Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: GitLab
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Una integración que te permite:

- visualizar y monitorizar las métricas recopiladas con GitLab y Gitaly a través de Prometheus.

Consulta [Monitorización de GitLab con Prometheus][1] para obtener más información.

Para lograr una monitorización más profunda de tus pipelines de GitLab, echa un vistazo a [CI Pipeline Visibility][2]. CI Pipeline Visibility brinda información minuciosa sobre el flujo de trabajo del usuario, permite acceder a metadatos detallados de Git y facilita el seguimiento del rendimiento de los pipelines a lo largo del tiempo.

## Configuración

Esta integración basada en OpenMetrics tiene un modo más reciente (que se habilita al configurar `openmetrics_endpoint` de modo que apunte hacia el endpoint de destino) y un modo heredado (que se habilita al configurar `prometheus_url` en su lugar). Para obtener todas las características más actualizadas, Datadog recomienda habilitar el modo más reciente. Para obtener más información, consulta [Control de versiones más reciente y heredado para las integraciones basadas en OpenMetrics][3].

Las métricas marcadas como `[OpenMetricsV1]` u `[OpenMetricsV2]` solo están disponibles con el uso del modo correspondiente de la integración de GitLab. Todas las demás métricas se recopilan en ambos modos. 

### Instalación

El check de GitLab está incluido en el paquete del [Datadog Agent][4], por lo que no necesitas instalar nada más en tus servidores de GitLab.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host, haz lo siguiente:

##### Recopilación de métricas

1. Edita el archivo `gitlab.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1], de modo que apunte hacia el [endpoint][2] de las métricas de GitLab.
Revisa el [archivo de ejemplo gitlab.d/conf.yaml][3] para ver todas las opciones de configuración disponibles. Si ya tienes esta integración implementada, consulta el [ejemplo del modo heredado][4].

2. En la página de parámetros de GitLab, asegúrate de que la opción `Enable Prometheus Metrics` esté habilitada (se requiere acceso de administrador). Para obtener más información sobre cómo habilitar la recopilación de métricas, consulta [Métricas de GitLab con Prometheus][5].

3. Permite el acceso a los endpoints de monitorización al actualizar `/etc/gitlab/gitlab.rb` con la siguiente línea:

    ```
    gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
    ```
    **Nota:** Guarda el progreso y reinicia GitLab para ver los cambios.

4. [Reinicia el Agent][6].

##### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; habilítala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Luego, edita `gitlab.d/conf.yaml` y quita los comentarios de las líneas `logs` de la parte inferior. Actualiza `path` con la ruta correcta a tus archivos de logs de GitLab.

   ```yaml
     logs:
       - type: file
         path: /var/log/gitlab/gitlab-rails/production_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/production.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/api_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
   ```

3. [Reinicia el Agent][6].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics
[3]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/7.43.x/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[5]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican abajo.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                         |
| -------------------- |-----------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `gitlab`                                                                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"gitlab_url":"http://%%host%%/", "openmetrics_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `gitlab` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "gitlab" >}}


### Eventos

El check de GitLab no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "gitlab" >}}
 Puedes obtener más información sobre los checks de servicios `gitlab.readiness.*` en la [documentación oficial de GitLab][6].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Integración del GitLab Runner

## Información general

Una integración que te permite:

- visualizar y monitorizar las métricas recopiladas con los ejecutores de GitLab a través de Prometheus;
- comprobar que el GitLab Runner puede conectarse a GitLab.

Para obtener más información sobre el GitLab Runner y su integración con Prometheus, consulta la [documentación del GitLab Runner][8].

## Configuración

Sigue las instrucciones de abajo para instalar y configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery][9] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check del GitLab Runner está incluido en el paquete del [Datadog Agent][4], por lo que no necesitas instalar nada más en tus servidores de GitLab.

### Configuración

Edita el archivo `gitlab_runner.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][10], de modo que apunte hacia el endpoint de las métricas de Prometheus del Runner y hacia el master de GitLab para tener un check de servicios. Consulta el [archivo de ejemplo gitlab_runner.d/conf.yaml][11] para conocer todas las opciones de configuración disponibles.

El elemento `allowed_metrics` de la sección `init_config` permite especificar las métricas que deben extraerse. Algunas métricas deben informarse como `rate`, por ejemplo: `ci_runner_errors`.

### Validación

[Ejecuta el subcomando `status` del Agent][5] y busca `gitlab_runner` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "gitlab-runner" >}}


### Recopilación de logs


1. En el [archivo de configuración][12] `gitlab_runner`, cambia el formato de logs por `json` (_Disponible para las versiones del GitLab Runner a partir de la 11.4.0_):
   ```toml
   log_format = "json"
   ```

2. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

3. Añade el usuario `dd-agent` al grupo `systemd-journal` ejecutando lo siguiente:
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

4. Añade este bloque de configuración al archivo `gitlab_runner.d/conf.yaml` para empezar a recopilar logs del GitLab Runner:

   ```yaml
   logs:
     - type: journald
       source: gitlab-runner
   ```

    Consulta el [archivo de ejemplo gitlab_runner.d/conf.yaml][11] para ver todas las opciones de configuración disponibles.

5. [Reinicia el Agent][13].

### Eventos

El check del GitLab Runner no incluye eventos.

### Checks de servicio

El check del GitLab Runner brinda un check de servicios para confirmar que el Runner puede comunicarse con el master de GitLab y otro para comprobar que el endpoint local de Prometheus está disponible.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].


[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://app.datadoghq.com/ci/getting-started
[3]: https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.gitlab.com/ee/user/admin_area/monitoring/health_check.html#readiness
[7]: https://docs.datadoghq.com/help/
[8]: https://docs.gitlab.com/runner/monitoring/
[9]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[10]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[11]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
[12]: https://docs.gitlab.com/runner/configuration/advanced-configuration.html
[13]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
