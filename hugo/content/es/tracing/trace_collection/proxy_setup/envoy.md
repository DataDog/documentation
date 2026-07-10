---
aliases:
- /es/tracing/proxies/envoy
- /es/tracing/envoy/
- /es/tracing/setup/envoy/
- /es/tracing/setup_overview/envoy/
- /es/tracing/setup_overview/proxy_setup/
code_lang: envoy
code_lang_weight: 20
further_reading:
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: https://www.envoyproxy.io/
  tag: Sitio externo
  text: Página web de Envoy
- link: https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/trace/v3/datadog.proto
  text: Configuración del rastreador de Datadog para Envoy
- link: https://www.envoyproxy.io/docs/envoy/latest/
  tag: Sitio externo
  text: Documentación de Envoy
title: Instrumentación de Envoy
type: lenguaje de código múltiple
---

Datadog APM se incluye en Envoy v1.9.0 y posteriores.

## Habilitación de Datadog APM

**Nota**: El siguiente ejemplo de configuración corresponde a Envoy v1.19.

Los siguientes parámetros son necesarios para habilitar Datadog APM en Envoy:

- un clúster para enviar trazas al Datadog Agent
- la configuración `http_connection_manager` para activar el rastreo

1. Añade un clúster para enviar trazas al Datadog Agent:

   ```yaml
    clusters:
    ... existing cluster configs ...
    - name: datadog_agent
      connect_timeout: 1s
      type: strict_dns
      lb_policy: round_robin
      load_assignment:
        cluster_name: datadog_agent
        endpoints:
        - lb_endpoints:
          - endpoint:
              address:
                socket_address:
                  address: localhost
                  port_value: 8126
   ```

   Cambia el valor de `address`, si Envoy se está ejecutando en un contenedor o en un entorno orquestado.

2. Incluye la siguiente configuración adicional en las secciones `http_connection_manager` para habilitar el rastreo:

{{< highlight yaml "hl_lines=9-15" >}}
    - name: envoy.filters.network.http_connection_manager
      typed_config:
        "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
        generate_request_id: true
        request_id_extension:
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
            use_request_id_for_trace_sampling: false
        tracing:
          provider:
            name: envoy.tracers.datadog
            typed_config:
              "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
              collector_cluster: datadog_agent
              service_name: envoy-v1.19
{{< /highlight >}}

   El valor `collector_cluster` debe coincidir con el nombre proporcionado para el clúster del Datadog Agent. `service_name` puede cambiarse por un valor significativo para tu uso de Envoy.

Con esta configuración, las solicitudes HTTP a Envoy se inician y propagan trazas de Datadog y aparecen en la interfaz de usuario APM.

## Ejemplo de configuración de Envoy v1.19

El siguiente ejemplo de configuración demuestra la localización de los elementos necesarios para habilitar el rastreo utilizando Datadog APM.

{{< highlight yaml "hl_lines=18-24 66-78" >}}
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    traffic_direction: OUTBOUND
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          generate_request_id: true
          request_id_extension:
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
              use_request_id_for_trace_sampling: false
          tracing:
            provider:
              name: envoy.tracers.datadog
              typed_config:
                "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
                collector_cluster: datadog_agent   # matched against the named cluster
                service_name: envoy-v1.19          # user-defined service name
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains:
              - "*"
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: service1
          # Traces for healthcheck requests should not be sampled.
          http_filters:
          - name: envoy.filters.http.health_check
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.health_check.v3.HealthCheck
              pass_through_mode: false
              headers:
                - exact_match: /healthcheck
                  name: :path
          - name: envoy.filters.http.router
            typed_config: {}
          use_remote_address: true
  clusters:
  - name: service1
    connect_timeout: 0.250s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: service1
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: service1
                port_value: 80
  # Configurar este clúster con la dirección del Datadog Agent
  # para enviar trazas (traces).
  - name: datadog_agent
    connect_timeout: 1s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: datadog_agent
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_value: 8126

admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
{{< /highlight >}}

## Exclusión de métricas

Si utilizas la configuración de Envoy `dog_statsd` para informar métricas, puedes excluir la actividad del clúster `datadog_agent` con esta configuración adicional.

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## Muestreo de Envoy

Para controlar el volumen de trazas de Envoy que se envían a Datadog, especifica una frecuencia de muestreo configurando el parámetro `DD_TRACE_SAMPLING_RULES` con un valor comprendido entre `0.0` (0%) y `1.0` (100%). Si no se especifica ningún valor, se enviarán el 100% de las trazas provenientes de Envoy.

Para utilizar las [frecuencias de muestreo calculadas del Datadog Agent][1] (10 trazas por segundo por Agent) e ignorar la regla de muestreo predeterminada, definida en 100%, configura el parámetro `DD_TRACE_SAMPLING_RULES` en una matriz vacía:

```
DD_TRACE_SAMPLING_RULES=[]
```

También puedes definir una frecuencia de muestreo explícita entre `0.0` (0%) y `1.0` (100%), por servicio. Por ejemplo, para configurar la frecuencia de muestreo en 10% para el servicio `envoy-proxy` :

```
DD_TRACE_SAMPLING_RULES=[{"service": "envoy-proxy","sample_rate": 0.1}]
```


Para configurar tu frecuencia de muestreo con `DD_TRACE_SAMPLING_RULES`, utiliza uno de los siguientes métodos, dependiendo de cómo ejecutes Envoy:

- **Por script de shell**: Define la variable de entorno inmediatamente antes de ejecutar `envoy` en el script:

  ```
  #!/bin/sh
  export DD_TRACE_SAMPLING_RULES=[]
  envoy -c envoy-config.yaml
  ```

- **En una configuración Docker Compose**: define la variable de entorno en la sección `environment` de la definición del servicio:

  ```
  services:
    envoy:
      image: envoyproxy/envoy:v1.19-latest
      entrypoint: []
      command:
          - envoy
          - -c
          - /etc/envoy/envoy.yaml
      volumes:
          - './envoy.yaml:/etc/envoy/envoy.yaml:ro'
      environment:
          - DD_TRACE_SAMPLING_RULES=[]
  ```

- **Como contenedor dentro de un pod Kubernetes**: Especifica la variable de entorno en la sección `env` de la entrada `containers` correspondiente de la especificación del pod:

  ```
  apiVersion: v1
  kind: Pod
  metadata:
    name: envoy
  spec:
    containers:
    - name: envoy
      image: envoyproxy/envoy:v1.20-latest
      env:
      - name: DD_TRACE_SAMPLING_RULES
        value: "[]"
  ```

## Variables de entorno

<div class="alert alert-danger">
 <strong>Nota:</strong> Las variables <code>DD_AGENT_HOST</code>, <code>DD_TRACE_AGENT_PORT</code> y <code>DD_TRACE_AGENT_URL</code> no se aplican a Envoy, ya que la dirección del Datadog Agent se configura utilizando los parámetros del <code>clúster</code>.
</div>

Las [variables de entorno][2] disponibles dependen de la versión del rastreador C++ incorporado en Envoy.
Es posible encontrar la versión del rastreador C++ en logs, indicada por la línea que empieza con "DATADOG TRACER CONFIGURATION".

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[2]: /es/tracing/setup/cpp/#environment-variables