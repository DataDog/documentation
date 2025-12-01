---
aliases:
- /es/integrations/akeyless_gateway
app_id: akeyless-gateway
categories:
- seguridad
- kubernetes
custom_kind: integración
description: Realiza un seguimiento de tus métricas clave de Akeyless Gateway.
integration_version: 1.0.0
media:
- caption: Dashboard de métricas de Akeyless Gateway
  image_url: images/AKs-Graphs-Light.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Akeyless Gateway
---
## Información general

La plataforma de Akeyless es un sistema de gestión de secretos unificado que te permite almacenar, proteger, rotar y crear de forma dinámica credenciales, certificados y claves de cifrado. Nuestra plataforma admite varios casos de uso, entre ellos, la gestión de credenciales estáticas y dinámicas, la automatización de certificados, el cifrado y la firma digital, y el acceso a aplicaciones de confianza cero que protege el acceso remoto a tus recursos internos.

Esta integración te permite visualizar y monitorizar el rendimiento de tu [Akeyless Gateway](https://docs.akeyless.io/docs/api-gw). Las métricas de telemetría proceden de la aplicación y del entorno de ejecución.

## Configuración

Akeyless ofrece una gateway única que añade un nivel adicional de protección entre tu red privada y la nube. Al actuar como una extensión SaaS de nuestros servicios principales, nuestra gateway sin estado permite una operación interna transparente con un mecanismo sólido listo para usar que garantiza la continuidad y recuperación del servicio sin tener que cambiar infraestructura de red a fin de trabajar con tus recursos internos.

Para configurar la integración con Datadog a fin de ver métricas importantes de Akeyless Gateway, sigue las siguientes instrucciones para el método que uses (o hayas usado) para el despliegue de tu gateway.

### Requisitos previos

- Una Akeyless Gateway que se ejecuta o despliega por primera vez

### Configurar

Esta integración funciona con una gateway o con varias instancias que usan la misma clave de API. Las métricas se pueden mostrar por `host` o `instance` en el dashboard **Akeyless GW** (Gateway de Akeyless).

#### Para una gateway que se ejecuta en Kubernetes

Para configurar la integración de Akeyless Gateway en una [pasarela que se ejecuta en K8s](https://docs.akeyless.io/docs/gateway-k8s):

1. En el archivo `values.yaml` que utilizas para desplegar tu pasarela en Kubernetes, en la sección `metrics`, añade la siguiente configuración. Define la clave de API correspondiente de tu servidor Datadog y el [sitio Datadog](https://docs.datadoghq.com/getting_started/site/) correspondiente, como: `app.datadoghq.com`.

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

Para configurar la integración de Akeyless Gateway en una [pasarela independiente](https://docs.akeyless.io/docs/install-and-configure-the-gateway):

1. Crea un archivo local llamado  con la siguiente configuración. Define la clave de API correspondiente de tu servidor Datadog y el [sitio Datadog](https://docs.datadoghq.com/getting_started/site/) correspondiente, como `app.datadoghq.com`.

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

2. Si aún no has desplegado la gateway, ejecuta el siguiente comando para activar tu Akeyless Gateway con la variable `ENABLE_METRICS=true` y montar el archivo `otel-config.yaml`:

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```

3. Si actualizas una gateway existente, usa el mismo `Admin Access ID` (ID de acceso de administrador) y `Cluster Name` (Nombre del clúster) para la gateway actualizada a fin de recuperar las últimas configuraciones y datos de la instancia de Docker que se eliminó anteriormente:

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ADMIN_ACCESS_ID="p-xxxxxx" -e ADMIN_ACCESS_KEY="62Hu...xxx....qlg=" -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```

### Validación

Una vez configurada correctamente la pasarela, ve al [Explorador de métricas](https://app.datadoghq.com/metric/explorer) en el sitio Datadog y filtra las métricas de Akeyless en la página de resumen.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **akeyless.gw.system.cpu** <br>(gauge) | Métricas de uso de CPU.|
| **akeyless.gw.system.disk** <br>(gauge) | Métricas de E/S de disco.|
| **akeyless.gw.system.load** <br>(gauge) | Métricas de carga de CPU.|
| **akeyless.gw.system.memory** <br>(gauge) | Métricas de uso de memoria.|
| **akeyless.gw.system.network** <br>(gauge) | Métricas de E/S de la interfaz de red y métricas de conexión TCP.|
| **akeyless.gw.quota.current_transactions_number** <br>(gauge) | Número de transacción actual.|
| **akeyless.gw.quota.gw_admin_client_transactions** <br>(gauge) | Total de transacciones de un cliente administrador.|
| **akeyless.gw.quota.total_transactions_limit** <br>(gauge) | Límite total de transacciones por hora.|
| **akeyless.gw.system.http_response_status_code** <br>(gauge) | Estado de la respuesta HTTP.|
| **akeyless.gw.system.request_count** <br>(gauge) | Número total de solicitudes.|
| **akeyless.gw.system.healthcheck.status** <br>(gauge) | Monitoriza el estado del check de salud del contenedor.|

### Checks de servicio

La integración de Akeyless Gateway no incluye checks de servicio.

### Eventos

La integración de Akeyless Gateway no incluye eventos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Akeyless](mailto:support@akeyless.io).