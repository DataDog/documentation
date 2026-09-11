---
app_id: supabase
app_uuid: f22fec2a-ff0a-4380-8ddf-3348f1e7ff15
assets:
  dashboards:
    Supabase Overview: assets/dashboards/supabase_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: supabase.pg.up
      metadata_path: metadata.csv
      prefix: supabase.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 34976974
    source_type_name: Supabase
  monitors:
    High RAM Usage: assets/monitors/ram_usage.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- Kubernetes
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/supabase/README.md
display_on_public_website: true
draft: false
git_integration_title: supabase
integration_id: supabase
integration_title: Supabase
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: supabase
public_title: Supabase
short_description: Monitorizar la salud y el rendimiento de Supabase
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::Kubernetes
  - Category::Security
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar la salud y el rendimiento de Supabase
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Supabase
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Supabase][1] a través del Datadog Agent. 

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir de la versión 7.62.0 del Agent, el check de Supabase se incluye en el paquete del Datadog Agent. No es necesaria ninguna instalación adicional en tu entorno.

Este check utiliza OpenMetrics para recopilar métricas del endpoint de OpenMetrics expuesto por Supabase, que requiere Python v3.

### Configuración

La plataforma Supabase viene con un endpoint de métricas compatible con Prometheus, fácilmente accesible en el endpoint de `metrics` de tu proyecto: `https://<project-ref>.supabase.co/customer/v1/privileged/metrics`. El acceso al endpoint está asegurado mediante HTTP Basic Auth. El `username` es `service_role`, mientras que el `password` es el token web JSON (JWT) del rol del servicio disponible en el dashboard de Supabase.

```yaml
## All options defined here are available to all instances.
#
init_config:

instances:

    # The endpoint exposing Supabase customer metrics
    #
  - privileged_metrics_endpoint:  https://<project-ref>.supabase.co/customer/v1/privileged/metrics

    ## @param username - string - optional
    ## The username to use if services are behind basic or digest auth.
    #
    username: service_role

    ## @param password - string - optional
    ## The password to use if services are behind basic or NTLM auth.
    #
    password: <JWT>
```

También viene con una base de datos Postgres alojada. Para una integración con el Agent, es necesario [preparar Postgres][3] y luego proporcionar la configuración de la base de datos a la configuración de la integración.
```yaml
## All options defined here are available to all instances.
#
init_config:

instances:

    ## @param host - string - required
    ## The hostname to connect to.
    #
  - host: <HOST>

    ## @param port - integer - optional - default: 5432
    ## The port to use when connecting to PostgreSQL.
    #
    port: 6543

    ## @param username - string - required
    ## The Datadog username created to connect to PostgreSQL.
    #
    username: datadog.<PROJECT-REF>

    ## @param password - string - optional
    ## The password associated with the Datadog user.
    #
    password: <UNIQUEPASSWORD>

    ## @param dbname - string - optional - default: postgres
    ## The name of the PostgreSQL database to monitor.
    ## Note: If omitted, the default system Postgres database is queried.
    #
    dbname: <DATABASE>
```

[Supabase Storage][4] viene con un endpoint de métricas compatible con Prometheus, fácilmente accesible en `/metrics` en el puerto `5000`. Para que el Agent comience a recopilar métricas, el contenedor Supabase Storage necesita ser anotado. Para obtener más información sobre las anotaciones, consulta las [plantillas de integración de Autodiscovery][2] como guía. Puedes encontrar opciones adicionales de configuración consultando el [supabase.d/conf.yaml de ejemplo][5].

Nota: La integración con Supabase Storage solo está disponible en la arquitectura autoalojada. `storage_api_endpoint` debe configurarse en la localización donde se exponen las métricas con formato Prometheus. El puerto por defecto es `5000`. En entornos contenedorizados, se debe utilizar `%%host%%` para la [detección automática de hosts][2].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `supabase` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "supabase" >}}


### Eventos

La integración Supabase no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "supabase" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://supabase.com/docs
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/es/integrations/postgres/?tab=host#prepare-postgres
[4]: https://github.com/supabase/storage/tree/master
[5]: https://github.com/DataDog/integrations-core/blob/master/supabase/datadog_checks/supabase/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/supabase/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/supabase/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/