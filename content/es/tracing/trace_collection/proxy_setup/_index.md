---
algolia:
  tags:
  - proxies
  - rastreo de proxies
  - proxy
aliases:
- /es/tracing/proxies/envoy
- /es/tracing/envoy/
- /es/tracing/proxies/nginx
- /es/tracing/nginx/
- /es/tracing/istio/
- /es/tracing/setup/envoy/
- /es/tracing/setup/nginx/
- /es/tracing/setup/istio/
- /es/tracing/proxies
- /es/tracing/setup_overview/envoy/
- /es/tracing/setup_overview/nginx/
- /es/tracing/setup_overview/istio/
- /es/tracing/setup_overview/httpd/
- /es/tracing/setup_overview/proxy_setup/
further_reading:
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas
- link: https://www.envoyproxy.io/
  tag: Sitio externo
  text: Página web de Envoy
- link: https://www.envoyproxy.io/docs/envoy/latest/
  tag: Sitio externo
  text: Documentación de Envoy
- link: https://www.nginx.com/
  tag: Sitio externo
  text: Sitio web de NGINX
- link: https://istio.io/
  tag: Sitio externo
  text: Sitio web de Istio
- link: https://istio.io/docs/
  tag: Sitio externo
  text: Documentación de Istio
- link: https://docs.konghq.com/gateway/latest/
  tag: Sitio externo
  text: Sitio web de Kong
- link: https://github.com/DataDog/dd-trace-cpp
  tag: Código fuente
  text: Cliente Datadog C++
- link: https://github.com/DataDog/kong-plugin-ddtrace/
  tag: Código fuente
  text: Complemento Datadog APM para Kong
- link: https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/
  tag: Sitio externo
  text: OpenTelemetry para el controlador Ingress-NGINX
- link: https://github.com/DataDog/httpd-datadog
  tag: Código fuente
  text: Módulo Datadog para el servidor HTTP Apache
title: Rastreo de un proxy
---

Puedes configurar el rastreo para que incluya la recopilación de información de trazas de proxies.

{{< tabs >}}
{{% tab "Envoy" %}}

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

   ```yaml
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
   ```
   El valor `collector_cluster` debe coincidir con el nombre proporcionado para el clúster del Datadog Agent. Para utilizar Envoy, puedes cambiar `service_name` por un valor significativo.

Con esta configuración, las solicitudes HTTP a Envoy se inician y propagan trazas de Datadog y aparecen en la interfaz de usuario APM.

## Ejemplo de configuración de Envoy v1.19

El siguiente ejemplo de configuración demuestra la colocación de los elementos necesarios para habilitar el rastreo utilizando Datadog APM.

```yaml
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
          # Utiliza el rastreador Datadog
            provider:
              name: envoy.tracers.datadog
              typed_config:
                "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
                collector_cluster: datadog_agent   # coincide con el clúster nombrado
                service_name: envoy-v1.19          # nombre de servicio definido por el usuario
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
          # No se deben muestrear las trazas de solicitudes de estado.
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
  # Configura este clúster con la dirección del Datadog Agent
  # para el envío de trazas.
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
```

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

También puedes definir una frecuencia de muestreo explícita entre `0.0` (0%) y `1.0` (100%), por servicio. Por ejemplo, para configurar la frecuencia de muestreo al 10% para el servicio `envoy-proxy` :

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
Es posible encontrar la versión del rastreador C++ en logs, indicada por la línea que empieza por "DATADOG TRACER CONFIGURATION".

[1]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[2]: /es/tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "NGINX" %}}

Datadog APM es compatible con NGINX en dos configuraciones:
- NGINX funcionaba como proxy con el rastreo proporcionado por el módulo de Datadog.
- NGINX como controlador Ingress para Kubernetes.

## NGINX con el módulo de Datadog
Datadog proporciona un módulo NGINX para el rastreo distribuido.

### Instalación del módulo
Para instalar el módulo NGINX de Datadog, sigue las siguientes instrucciones:
1. Descarga la versión adecuada del [último lanzamiento de Nginx-Datadog en GitHub][1]
2. Elige el archivo .tar correspondiente a la versión de NGINX y a la arquitectura de CPU específicas.

Cada versión incluye dos archivos .tar por combinación de la versión de NGINX y la arquitectura de CPU.
El archivo .tar principal contiene un único archivo, `ngx_http_datadog_module.so`, que es el módulo NGINX de Datadog. El segundo contiene símbolos de depuración y es opcional.

Para simplificar el proceso, el siguiente script descarga sólo el módulo de la última versión:

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64)
      echo "arm64"
      ;;
    arm64)
      echo "arm64"
      ;;
    x86_64)
      echo "amd64"
      ;;
    amd64)
      echo "amd64"
      ;;
    *)
      echo ""
      ;;
  esac
}

ARCH=$(get_architecture)

if [ -z "$ARCH" ]; then
    echo 1>&2 "ERROR: Architecture $(uname -m) is not supported."
    exit 1
fi

NGINX_VERSION="1.26.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

Extrae el archivo `ngx_http_datadog_module.so` del archivo .tar descargado mediante `tar` y colócalo en el directorio de módulos de NGINX, generalmente ubicado en `/usr/lib/nginx/modules`.

### Configuración de NGINX con el módulo de Datadog
En la sección superior de configuración de NGINX, carga el módulo de Datadog.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

La configuración por defecto se conecta a un Datadog Agent local y produce trazas
para todas las localizaciones de NGINX. Especifica una configuración personalizada utilizando las directivas exclusivas
`datadog_*` descritas en la [documentación de la API][4] del módulo de Datadog.

Por ejemplo, la siguiente configuración de NGINX define el nombre del servicio como
`usage-internal-nginx` y la frecuencia de muestreo al 10%.

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # servidores, localizaciones...
}
```

## Controlador Ingress-NGINX para Kubernetes

### Controlador v1.10.0 o posterior

<div class="alert alert-danger">
 <strong>Nota importante:</strong> Con el lanzamiento de <b>v1.10.0</b>, la integración OpenTracing y Datadog del controlador Ingress ha quedado obsoleta. Como alternativa, se recomienda la integración OpenTelemetry.<br><br>
  Para versiones anteriores, consulta las <a href="#controller-v190-and-older">instrucciones basadas en OpenTracing</a>.
</div>

**1. Prepara el Datadog Agent:** Asegúrate de que tu Datadog Agent tiene [habilitado el consumo OTLP gRPC][5] para actuar como recopilador de OpenTelemetry.

**2. Configura el controlador Ingress:** Para empezar, comprueba que la especificación del pod de tu controlador Ingress tiene definida la variable de entorno `HOST_IP`. Si no es así, añade la siguiente entrada al bloque `env` dentro de la especificación del pod:
```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4318"
```

A continuación, habilita la instrumentación de OpenTelemetry para el controlador. Crea o edita un ConfigMap con los siguientes detalles:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Por defecto
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
```

### Controlador v1.9.0 y anteriores
Para habilitar el rastreo en Datadog, crea o edita un ConfigMap para configurar`enable-opentracing: "true"` y el `datadog-collector-host` al que se deben enviar trazas.
El nombre del ConfigMap lo cita explícitamente el argumento de línea de comandos del contenedor del controlador Ingress-NGINX; por defecto es `--configmap=<POD_NAMESPACE>/nginx-configuration`.
Si `ingress-nginx` se instaló a través del chart Helm, el nombre del ConfigMap seguirá el patrón `<RELEASE_NAME>-nginx-ingress-controller`.

El controlador Ingress gestiona los archivos `nginx.conf` y `/etc/nginx/opentracing.json`. El rastreo está habilitado para todos los bloques de `location`.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Por defecto
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
```

Además, asegúrate de que la especificación del pod de tu controlador tiene definida la variable de entorno `HOST_IP`. Añade esta entrada al bloque `env:` que contiene las variables de entorno `POD_NAME` y `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

Para definir un nombre de servicio diferente por Ingress utilizando anotaciones:

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
Lo anterior anula el nombre de servicio `nginx-ingress-controller.ingress-nginx` por defecto.

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[5]: /es/opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}

{{% tab "Istio" %}}

Datadog monitoriza todos los aspectos de tu entorno Istio, para que puedas:
- Visualizar cada una de las trazas distribuidas para las aplicaciones que realizan transacciones a través de la malla con APM (consulta más abajo).
- Evaluar el estado de Envoy y el plano de control de Istio mediante [logs][1].
- Desglosar el rendimiento de tu malla de servicio mediante [métricas][1] de solicitudes, ancho de banda y consumo de recursos.
- Asignar comunicaciones de red entre contenedores, pods y servicios sobre la malla con [Network Performance Monitoring][2].

Para obtener más información sobre la monitorización de tu entorno Istio con Datadog, [consulta el blog de Istio][3].

Datadog APM está disponible para [versiones de Istio compatibles][13].

## Instalación del Datadog Agent

1. [Instala el Agent][4].
2. [Asegúrate de que APM está habilitado para tu Agent][5].
3. Descomenta el parámetro `hostPort` para que los sidecars de Istio puedan conectarse al Agent y enviar trazas.


## Configuración e instalación de Istio

La habilitación de Datadog APM requiere una [instalación personalizada de Istio][6] para configurar dos opciones adicionales al instalar Istio.

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

Las trazas se generan cuando el espacio de nombres para el pod tiene activada la inyección de sidecars. Esto se hace añadiendo la etiqueta
la etiqueta `istio-injection=enabled`.

```shell
kubectl label namespace example-ns istio-injection=enabled
```

Las trazas se generan cuando Istio es capaz de determinar que el tráfico está utilizando un protocolo basado en HTTP.
Por defecto, Istio intenta detectar esto automáticamente. Puede ser configurado manualmente, nombrando los puertos en el
despliegue de tu aplicación y en tu servicio. Puedes encontrar más información en la documentación de Istio para la [selección de protocolos][7].

Por defecto, el nombre del servicio utilizado al crear trazas se genera a partir del nombre del despliegue y el espacio de nombres. Se puede
configurar manualmente añadiendo una etiqueta (label) `app` a la plantilla del pod de despliegue:

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

Para [CronJobs][8], la etiqueta `app` debe añadirse a la plantilla de trabajo, ya que el nombre generado procede del `Job`, y no
del `CronJob` de nivel superior.

## Muestreo en Istio

Para controlar el volumen de trazas de Istio que se envían a Datadog, configura una
regla de muestreo cuya `"sample_rate"` es un valor comprendido entre `0.0` (0%) y `1.0`
(100%). Configura reglas de muestreo con la variable de entorno `DD_TRACE_SAMPLING_RULES`.
Si no se especifica `DD_TRACE_SAMPLING_RULES`, el 100%
de trazas de Istio se envían a Datadog.

**Nota**: Estas variables de entorno sólo se aplican al subconjunto de trazas indicadas por el parámetro `values.pilot.traceSampling`, de ahí que se requiera red `--set values.pilot.traceSampling=100.0` durante la configuración de Istio.

Para utilizar las [frecuencias de muestreo calculadas del Datadog Agent][9] (10 trazas por segundo por Agent) e ignorar la regla de muestreo predeterminada, definida en 100%, configura el parámetro `DD_TRACE_SAMPLING_RULES` en una matriz vacía:

```bash
DD_TRACE_SAMPLING_RULES='[]'
```

Especificar una matriz vacía de reglas explícitamente no es lo mismo que no especificar reglas.

Para configurar `DD_TRACE_SAMPLING_RULES` en cada despliegue cuyo espacio de nombres está etiquetado como `istio-injection=enabled`, define la variable entorno como parte de la anotación `apm.datadoghq.com/env` de la plantilla de especificaciones del despliegue:
```
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{"DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1", "DD_TRACE_SAMPLING_RULES": "[]"}'
```
`apm.datadoghq.com/env` es una cadena cuyo contenido es un objeto JSON que asigna
nombres de variables de entorno a valores. Los valores de las variables de entorno son
cadenas y, en el caso de `DD_TRACE_SAMPLING_RULES`, el valor de la cadena
es una matriz de objetos JSON.

## Variables de entorno

Las variables de entorno de los sidecars de Istio pueden definirse por cada despliegue, utilizando la anotación `apm.datadoghq.com/env`. Esto es único para los despliegues que emplean sidecars Istio y se define junto con las [etiquetas para el etiquetado unificado de servicios][10].
```yaml
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1"}'
```

## Despliegue y servicio

Si los Agents en tu clúster se están ejecutando como despliegue y servicio, en lugar del DaemonSet por defecto, se requiere una opción adicional para especificar la dirección DNS y el puerto del Agent.
Para un servicio llamado `datadog-agent` en el espacio de nombres `default`, esa dirección sería `datadog-agent.default.svc.cluster.local:8126`.

- `--set values.global.tracer.datadog.address=datadog-agent.default:8126`

Si Mutual TLS está habilitado para el clúster, el despliegue del Agent debe deshabilitar la inyección de sidecars, y debes agregar una política de tráfico que deshabilite TLS.

Esta anotación se añade a la plantilla de despliegue del Agent.
```
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
```

Para Istio v1.4.x, la política de tráfico puede configurarse utilizando una DestinationRule. Istio v1.5.x y posteriores no necesitan una política de tráfico adicional.
```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: datadog-agent
  namespace: istio-system
spec:
  host: datadog-agent.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: DISABLE
```

La selección automática de protocolos puede determinar que el tráfico entre el sidecar y el Agent es HTTP, y habilitar el rastreo.
Esto se puede deshabilitar a través de la [selección manual de protocolos][12] para este servicio específico. El nombre de puerto del servicio `datadog-agent` puede cambiarse a `tcp-traceport`.
Si utilizas Kubernetes v1.18 o posterior, puedes añadir `appProtocol: tcp` a la especificación del puerto.

[1]: /es/integrations/istio/
[2]: /es/network_monitoring/performance/setup/#istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: /es/agent/kubernetes/
[5]: /es/agent/kubernetes/apm/
[6]: https://istio.io/docs/setup/install/istioctl/
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[8]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[9]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[10]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[12]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
[13]: https://istio.io/latest/docs/releases/supported-releases/#support-status-of-istio-releases
{{% /tab %}}
{{% tab "Kong" %}}

Datadog APM está disponible para [Kong Gateway][1] utilizando el complemento [kong-plugin-ddtrace][2].

## Instalación

El complemento se instala mediante `luarocks`.
```
luarocks install kong-plugin-ddtrace
```

Kong Gateway no es un complemento incluido, por lo que debe configurarse antes de habilitarlo.
Para hacerlo, incluye `bundled` y `ddtrace` en la variable de entorno `KONG_PLUGINS`, o
define `plugins=bundled,ddtrace` en `/etc/kong/kong.conf`. A continuación, reinicia Kong Gateway para aplicar el cambio.

```
# Configura la variable de entorno KONG_PLUGINS o edita /etc/kong/kong.conf para habilitar el complemento ddtrace
export KONG_PLUGINS=bundled,ddtrace
kong restart
```

## Configuración

El complemento puede habilitarse globalmente o en determinados servicios de Kong Gateway.

```
# Habilitado globalmente
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace'
# Habilitado sólo para servicios específicos
curl -i -X POST --url http://localhost:8001/services/example-service/plugins/ --data 'name=ddtrace'
```

Existen opciones para configurar el nombre de servicio, el entorno, y otras funciones del complemento.
El ejemplo siguiente define el nombre del servicio como `mycorp-internal-api` en el entorno `prod`.
```
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace' --data 'config.service_name=mycorp-internal-api' --data 'config.environment=prod'
```

Puedes encontrar más opciones de configuración en la documentación del complemento [kong-plugin-ddtrace][3].


[1]: https://docs.konghq.com/gateway/latest/
[2]: https://github.com/DataDog/kong-plugin-ddtrace
[3]: https://github.com/DataDog/kong-plugin-ddtrace#configuration

{{% /tab %}}

{{% tab "Servidor HTTP Apache" %}}

Datadog proporciona un [módulo][1] HTTPd para mejorar las capacidades del [servidor HTTP Apache][2] y del [servidor HTTP IHS][3] con el rastreo APM.

### Compatibilidad

Dado que el servidor HTTP IHS es esencialmente una envoltura del servidor HTTP Apache, el módulo también puede utilizarse con IHS sin ninguna modificación.

### Instalación

<div class="alert alert-danger">
 <strong>Nota</strong>: Sólo se admite el servidor HTTP Apache v2.4.x para la arquitectura x86_64.
</div>

El módulo se proporciona como una biblioteca compartido para la carga dinámica mediante HTTPd. Cada plataforma y arquitectura
compatible tiene su propio artefacto alojado en el [repositorio httpd de Datadog][1].

Para instalar el módulo:

1. Ejecuta el siguiente script para descargar la última versión del módulo:

   ```bash
   curl -s https://api.github.com/repos/DataDog/httpd-datadog/releases/latest \
   | grep "mod_datadog-linux-x86_64.tar.gz" \
   | cut -d : -f 2,3 \
   | tr -d \" \
   | wget -qi -
   ```

   Al descomprimir el archivo .tar, el archivo resultante es `mod_datadog.so`, la librería compartida que debe
   ser cargada por el servidor.

1. Coloca el archivo en el directorio donde HTTPd busca los módulos, normalmente `/usr/local/apache2/modules`.

1. Carga el módulo añadiendo la siguiente línea en el archivo de configuración:

   ```nginx
   LoadModule datadog_module modules/mod_datadog.so
   ```

1. Para habilitar el módulo, asegúrate de reiniciar o recargar HTTPd.

### Configuración

Por defecto, todas las solicitudes se rastrean y se envían al Datadog Agent.

Para cambiar el comportamiento predeterminado del módulo, utiliza las directivas `Datadog*` descritas en la [documentación de la API][3] del módulo de Datadog.

Por ejemplo, la siguiente configuración define el nombre del servicio en `my-service` y la frecuencia de muestreo en 10%:

```nginx
LoadModule datadog_module modules/mod_datadog.so

DatadogServiceName my-app
DatadogSamplingRate 0.1
```

[1]: https://github.com/DataDog/httpd-datadog
[2]: https://httpd.apache.org/
[3]: https://github.com/DataDog/httpd-datadog/blob/main/doc/configuration.md
{{% /tab %}}

{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}
