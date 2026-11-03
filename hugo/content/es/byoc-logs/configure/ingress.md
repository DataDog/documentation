---
aliases:
- /es/cloudprem/configure/ingress/
description: Aprenda a configurar y administrar controladores de ingreso para su implementación
  de BYOC Logs.
further_reading:
- link: /byoc-logs/ingest/
  tag: Documentación
  text: Configure la ingesta de registros de BYOC Logs.
- link: /byoc-logs/operate/monitoring/
  tag: Documentación
  text: Hacer un seguimiento de BYOC Logs
title: Configuración de ingreso de BYOC Logs
---
## Descripción general {#overview}

El ingreso es un componente crítico de su implementación de BYOC Logs (Bring Your Own Cloud). El gráfico de Helm crea automáticamente dos configuraciones de ingreso llamadas ingreso público e ingreso interno. Si el controlador del balanceador de carga de AWS está instalado en el clúster, este aprovisiona un ALB por configuración de ingreso. Cada balanceador de carga puede configurarse aún más mediante anotaciones de ingreso.

## Ingreso público {#public-ingress}

<div class="alert alert-danger">Solo los puntos de conexión de la API gRPC de BYOC Logs (rutas que comienzan con <code>/cloudprem</code>) realizan autenticación TLS mutua. Exponer cualquier otro punto de conexión a través del ingreso público introduce un riesgo de seguridad, ya que dichos puntos de conexión serían accesibles a través de internet sin autenticación. Restrinja siempre los puntos de conexión que no sean gRPC al ingreso interno. </div>

El ingreso público es esencial para permitir que Datadog administre y consulte los clústeres de BYOC Logs a través de la internet pública. Proporciona acceso seguro a la API gRPC de BYOC Logs a través de los siguientes mecanismos:
- Crea un Application Load Balancer (ALB) de AWS orientado a internet que acepta tráfico de los servicios de Datadog
- Implementa cifrado TLS con terminación en el nivel del balanceador de carga
- Utiliza HTTP/2 (gRPC) para la comunicación entre el ALB y el clúster de BYOC Logs
- Requiere autenticación TLS mutua (mTLS) donde los servicios de Datadog deben presentar certificados de cliente válidos
- Configura el ALB en modo de transferencia TLS para reenviar certificados de cliente a los pods de BYOC Logs con el encabezado `X-Amzn-Mtls-Clientcert`
- Rechaza las solicitudes a las que les falten certificados de cliente válidos o el encabezado de certificado

Esta configuración garantiza que solo los servicios de Datadog autenticados puedan acceder al clúster de BYOC Logs mientras se mantiene una comunicación cifrada segura de extremo a extremo.

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="Diagrama que muestra la arquitectura de ingreso público de BYOC Logs con servicios de Datadog conectándose a través de un AWS ALB orientado a internet mediante autenticación mTLS para acceder a la API gRPC de BYOC Logs" style="width:100%;" >}}

### Lista de permitidos de IP {#ip-allowlisting}

Datadog se conecta a los clústeres de BYOC Logs utilizando un conjunto de rangos de IP fijos, los cuales se pueden recuperar para cada sitio de Datadog desde la [API de rangos de IP][1] de Datadog, específicamente en la sección \"webhooks\". Por ejemplo, para obtener los rangos de IP para el sitio datadoghq.eu, puede ejecutar:

```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## Ingreso interno {#internal-ingress}

El ingreso interno permite la ingesta de registros desde agentes de Datadog y otros recolectores de registros dentro de su entorno a través de HTTP.

{{< img src="/cloudprem/ingress/internal_ingress.png" alt=" Ingreso interno con ALB aprovisionado por el gráfico de Helm" style="width:100%;" >}}

De forma predeterminada, el gráfico crea un Application Load Balancer (ALB) de AWS interno para enrutar el tráfico HTTP a los servicios de BYOC Logs apropiados según la ruta del punto de conexión de la API solicitada. Sin embargo, si prefiere utilizar su propio controlador de ingreso (como HAProxy, NGINX o Traefik), puede deshabilitar el ALB interno predeterminado y configurar su controlador con las siguientes reglas de enrutamiento:

```
rules:
- http:
    paths:
      # Ingest (Quickwit, ES, Datadog) endpoints to indexers
      - path: /api/v1/*/ingest
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/bulk
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/*/_bulk
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v2/logs
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      # Index management API endpoints to metastores
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-metastore
            port:
              name: rest
      # Everything else to searchers
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-searcher
            port:
              name: rest

```

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="Configuración de ingreso interno de BYOC Logs usando el controlador de ingreso NGINX que muestra el enrutamiento de rutas a los servicios de indexador, metastore y buscador" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/ip-ranges/