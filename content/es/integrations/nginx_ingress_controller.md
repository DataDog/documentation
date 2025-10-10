---
app_id: nginx-ingress-controller
app_uuid: f84e3ebf-848b-4894-a5b0-9abbd21d4189
assets:
  dashboards:
    nginx_ingress_controller: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nginx_ingress.nginx.process.count
      metadata_path: metadata.csv
      prefix: nginx_ingress.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10050
    source_type_name: nginx-ingress-controller
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- Kubernetes
- recopilación de logs
- network
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: nginx_ingress_controller
integration_id: nginx-ingress-controller
integration_title: nginx-ingress-controller
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: nginx_ingress_controller
public_title: nginx-ingress-controller
short_description: Monitoriza métricas del controlador de entrada de NGINX y el NGINX
  integrado.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza métricas del controlador de entrada de NGINX y el NGINX
    integrado.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: nginx-ingress-controller
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el [controlador de entrada NGINX][1] de Kubernetes. Para monitorizar el controlador de entrada F5 NGINX, configura la [integración de Datadog Prometheus][2] para monitorizar las métricas deseadas desde la lista proporcionada por el [NGINX Prometheus Exporter][3].


## Configuración

### Instalación

El check `nginx-ingress-controller` está incluido en el paquete del [Datadog Agent][4], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Si tu Agent se está ejecutando en un host, edita el archivo `nginx_ingress_controller.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent. Consulta el [nginx_ingress_controller.d/conf.yaml de ejemplo][1] para ver todas las opciones disponibles de configuración. A continuación, [reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Recopilación de métricas

Por defecto, a las métricas de NGINX las recopila el check de `nginx-ingress-controller`, pero por conveniencia puede que quieras ejecutar el check de `nginx` en el controlador de entrada.

Puedes conseguirlo haciendo que se pueda acceder a la página de estado de NGINX desde el Agent. Para ello, utiliza la configuración `nginx-status-ipv4-whitelist` en el controlador y añade anotaciones de Autodiscovery al pod del controlador.

Por ejemplo, estas anotaciones habilitan tanto los checks `nginx` y `nginx-ingress-controller` como la recopilación de logs:

| Parámetro            | Valor                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `["nginx","nginx_ingress_controller"]`                                                                             |
| `<INIT_CONFIG>`      | `[{},{}]`                                                                                                          |
| `<INSTANCE_CONFIG>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]` |

Consulta el [nginx_ingress_controller.d/conf.yaml de ejemplo][5] para ver todas las opciones disponibles de configuración.

**Nota**: Para las versiones `nginx-ingress-controller` 0.23.0+, el servidor `nginx` que escucha en el puerto `18080` fue eliminado, puede ser restaurado añadiendo el siguiente `http-snippet` al configmap de configuración:

```text
  http-snippet: |
    server {
      listen 18080;

      location /nginx_status {
        allow all;
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][6].

| Parámetro      | Valor                                                              |
| -------------- | ------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `[{"service": "controller", "source": "nginx-ingress-controller"}]` |

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `nginx_ingress_controller` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nginx-ingress-controller" >}}


### Eventos

El controlador de entrada de NGINX no incluye ningún evento.

### Checks de servicios

El controlador de entrada de NGINX no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://docs.datadoghq.com/es/agent/kubernetes/prometheus/
[3]: https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/help/