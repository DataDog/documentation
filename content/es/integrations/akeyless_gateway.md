---
app_id: akeyless-gateway
app_uuid: a71a3b29-5921-4bc9-8a7e-38de5a940ad8
assets:
  dashboards:
    akeyless_gateway_dashboard: assets/dashboards/akeyless_gateway_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - akeyless.gw.system.cpu
      - akeyless.gw.system.disk
      - akeyless.gw.system.load
      - akeyless.gw.system.memory
      - akeyless.gw.system.network
      - akeyless.gw.quota.current_transactions_number
      - akeyless.gw.quota.gw_admin_client_transactions
      - akeyless.gw.quota.total_transactions_limit
      - akeyless.gw.system.http_response_status_code
      - akeyless.gw.system.request_count
      - akeyless.gw.system.healthcheck.status
      metadata_path: metadata.csv
      prefix: akeyless
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10426
    source_type_name: Gateway de Akeyless
author:
  homepage: https://www.akeyless.io
  name: Seguridad de Akeyless
  sales_email: sales@akeyless.io
  support_email: support@akeyless.io
categories:
- seguridad
- kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/README.md
display_on_public_website: true
draft: false
git_integration_title: akeyless_gateway
integration_id: akeyless-gateway
integration_title: Gateway de Akeyless
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akeyless_gateway
public_title: Gateway de Akeyless
short_description: Rastrea tus métricas clave de la gateway de Akeyless.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Security
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Rastrea tus métricas clave de la gateway de Akeyless.
  media:
  - caption: Dashboard de métricas de la gateway de Akeyless
    image_url: images/AKs-Graphs-Light.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Gateway de Akeyless
---

<!--  FUENTE https://github.com/DataDog/integrations-extras -->


## Información general

La plataforma de Akeyless es un sistema de gestión de secretos unificado que te permite almacenar, proteger, rotar y crear de forma dinámica credenciales, certificados y claves de cifrado. Nuestra plataforma admite varios casos de uso, entre ellos, la gestión de credenciales estáticas y dinámicas, la automatización de certificados, el cifrado y la firma digital, y el acceso a aplicaciones de confianza cero que protege el acceso remoto a tus recursos internos.

Esta integración te permite visualizar y monitorizar el rendimiento de tu [gateway de Akeyless][1]. Las métricas de telemetría se obtienen de la aplicación y del entorno de tiempo de ejecución.

## Configuración

Akeyless ofrece una gateway única que añade un nivel adicional de protección entre tu red privada y la nube. Al actuar como una extensión SaaS de nuestros servicios principales, nuestra gateway sin estado permite una operación interna transparente con un mecanismo sólido listo para usar que garantiza la continuidad y recuperación del servicio sin tener que cambiar infraestructura de red a fin de trabajar con tus recursos internos.

Para configurar la integración con Datadog a fin de ver métricas importantes de la gateway de Akeyless, sigue las siguientes instrucciones para el método que uses (o hayas usado) para el despliegue de tu gateway.

### Requisitos previos
- Una gateway de Akeyless que se ejecuta o despliega por primera vez

### Configurar

Esta integración funciona con una gateway o con varias instancias que usan la misma clave de API. Las métricas se pueden mostrar por `host` o `instance` en el dashboard **Akeyless GW** (Gateway de Akeyless).

#### Para una gateway que se ejecuta en Kubernetes

Para configurar la integración de la gateway de Akeyless en una [gateway que se ejecuta en K8s][2]:

1. En el archivo `values.yaml` que usas para desplegar tu gateway en Kubernetes, en la sección `metrics` (Métricas), añade la siguiente configuración. Establece la clave de API correspondiente de tu servidor de Datadog, y el [sitio de Datadog][3] correspondiente, como por ejemplo: `app.datadoghq.com`.

```
metrics:
  enabled: true  
  config: |
    exporters:    
      datadog:
        api:
          key: "<Your Datadog API key>"
          site: <Your Datadog server site>         
    service:
      pipelines:
        metrics:
          exporters: [datadog]
```

2. Si aún no has desplegado la gateway, continúa con la instalación como de costumbre y ejecuta el siguiente comando cuando estés listo para desplegarlo:

```
helm install <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

3. Si actualizas una gateway existente en Kubernetes, ejecuta los siguientes comandos:

```
helm upgrade <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

#### Para una gateway independiente que se ejecuta en Docker

Para configurar la integración de la gateway de Akeyless en una [gateway independiente][4]:

1. Crea un archivo local llamado `otel-config.yaml` con la siguiente configuración. Establece la clave de API correspondiente de tu servidor de Datadog, y el [sitio de Datadog][3] correspondiente, como `app.datadoghq.com`.

```
exporters:
  datadog:
    api:
      key: "<Your Datadog API key>"
      site: <Your Datadog server site>
service:
  pipelines:
    metrics:
      exporters: [datadog]
```

2. Si aún no has desplegado la gateway, ejecuta el siguiente comando para activar tu gateway de Akeyless con la variable `ENABLE_METRICS=true` y montar el archivo `otel-config.yaml`:

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```
3. Si actualizas una gateway existente, usa el mismo `Admin Access ID` (ID de acceso de administrador) y `Cluster Name` (Nombre del clúster) para la gateway actualizada a fin de recuperar las últimas configuraciones y datos de la instancia de Docker que se eliminó anteriormente:

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ADMIN_ACCESS_ID="p-xxxxxx" -e ADMIN_ACCESS_KEY="62Hu...xxx....qlg=" -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```

### Validación

Una vez que se haya configurado correctamente la gateway, dirígete al [explorador de métricas][5] en el sitio de Datadog y filtra las métricas de Akeyless en la página de resumen.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "akeyless-gateway" >}}


### Checks de servicio

La integración de la gateway de Akeyless no incluye checks de servicio.

### Eventos

La integración de la gateway de Akeyless no incluye eventos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Akeyless][7].


[1]: https://docs.akeyless.io/docs/api-gw
[2]: https://docs.akeyless.io/docs/gateway-k8s
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://docs.akeyless.io/docs/install-and-configure-the-gateway
[5]: https://app.datadoghq.com/metric/explorer
[6]: https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/metadata.csv
[7]: mailto:support@akeyless.io