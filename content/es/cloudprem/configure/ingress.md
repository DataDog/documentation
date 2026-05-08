---
description: Aprende a configurar y gestionar los controladores de entrada para tu
  despliegue de CloudPrem.
further_reading:
- link: /cloudprem/ingest/
  tag: Documentación
  text: Configurar la ingesta de logs
- link: /cloudprem/operate/monitoring/
  tag: Documentación
  text: Monitorización de CloudPrem
title: Configuración de entrada de CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojados.
{{< /callout >}}

## Información general

El ingreso es un componente crítico de tu despliegue de CloudPrem. El Helm chart crea automáticamente dos configuraciones de entrada llamadas entrada pública e interna. Si el AWS Load Balancer Controller está instalado en el clúster, se aprovisiona un ALB por configuración de entrada. Cada equilibrador de carga puede configurarse aún más utilizando anotaciones de entrada.

## Entrada pública

<div class="alert alert-danger">Solo los endpoints de la API gRPC de CloudPrem (rutas que empiezan por <code>/cloudprem</code>) realizan autenticación TLS mutua. Exponer cualquier otro endpoint a través de la entrada pública introduce un riesgo de seguridad, ya que esos endpoints serían accesibles a través de Internet sin autenticación. Restringe siempre los endpoints que no sean RPC a la entrada interna. </div>

La entrada pública es esencial para permitir que el plano de control y el servicio de consulta de Datadog gestionen y consulten los clústeres de CloudPrem a través de la Internet pública. Proporciona acceso seguro a la API gRPC de CloudPrem a través de los siguientes mecanismos:
- Crea un AWS Application Load Balancer (ALB) orientado a Internet que acepta tráfico de los servicios de Datadog
- Implementa el cifrado TLS con terminación en el nivel del equilibrador de carga.
- Utiliza HTTP/2 (gRPC) para la comunicación entre el ALB y el clúster de CloudPrem.
- Requiere autenticación TLS mutua (mTLS), en la que los servicios de Datadog deben presentar certificados de cliente válidos.
- Configura el ALB en modo TLS passthrough para reenviar certificados de cliente a pods de CloudPrem con el encabezado `X-Amzn-Mtls-Clientcert` 
- Rechaza las solicitudes en las que falten certificados de cliente válidos o el encabezado del certificado.

Esta configuración garantiza que solo los servicios autenticados de Datadog puedan acceder al clúster de CloudPrem, al tiempo que mantiene una comunicación cifrada segura de extremo a extremo.

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="Diagrama que muestra la arquitectura de entrada pública de CloudPrem con los servicios de Datadog conectados mediante un AWS ALB orientado a Internet usando la autenticación mTLS para acceder a la API gRPC de CloudPrem" style="width:100%;" >}}

### Lista de IP permitidas

El plano de control de Datadog y los servicios de consulta se conectan a los clústeres de CloudPrem utilizando un conjunto de rangos de IP fijos, que se pueden recuperar para cada sitio de Datadog desde la [API de rangos de IP][1] de Datadog, concretamente en la sección "webhooks". Por ejemplo, para obtener los rangos de IP para el sitio datadoghq.eu, puedes ejecutar:
```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## Entrada interna

La entrada interna permite la ingesta de logs desde los Datadog Agents y otros recopiladores de logs dentro de tu entorno a través de HTTP.

{{< img src="/cloudprem/ingress/internal_ingress.png" alt=" Entrada interna con ALB aprovisionado por Helm chart" style="width:100%;" >}}

De forma predeterminada, el gráfico crea un Application Load Balancer (ALB) interno de AWS para enrutar el tráfico HTTP a los servicios de CloudPrem adecuados en función de la ruta del endpoint de API solicitada. Sin embargo, si prefieres utilizar tu propio controlador de entrada (como HAProxy, NGINX, o Traefik), puedes desactivar el ALB interno predeterminado y configurar tu controlador con las siguientes reglas de enrutamiento:

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

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="Configuración de entrada interna de CloudPrem mediante el controlador de entrada de NGINX que muestra la ruta hacia el indexador, el metaalmacén y los servicios de buscador" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/ip-ranges/