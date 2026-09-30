---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
- link: /infrastructure/list/
  tag: Documentación
  text: Lista de infraestructura
- link: /infrastructure/resource_catalog/
  tag: Documentación
  text: Resource Catalog
title: Extensión de Datadog
---
## Descripción general {#overview}

A partir de OpenTelemetry Collector Contrib [modules v0.129.0][4] y versiones posteriores, la extensión de Datadog se incluye en las [distribuciones Contrib][5] de OpenTelemetry Collector. También está disponible para [compilación personalizada][6] de OpenTelemetry Collector. En el [DDOT Collector][8], la extensión se habilita automáticamente.

La extensión de Datadog le permite visualizar la configuración y la información de compilación del OpenTelemetry Collector directamente en Datadog mediante [Fleet Automation][7], la [Lista de infraestructura][2] y [Resource Catalog][3]. La extensión funciona con la configuración recomendada del exportador OTLP HTTP y con el exportador de Datadog.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="Visualice las configuraciones del OTel Collector con la visualización de pipelines en Fleet Automation" style="width:100%;" >}}

## Características clave {#key-features}

- **Visibilidad de la configuración del Collector**: visualice la configuración completa de cualquier OTel Collector en su infraestructura.
- **Información de compilación**: vea la versión del Collector, los detalles de compilación y la información de los componentes.
- **Punto de conexión de inspección local**: utilice un punto de conexión HTTP para la depuración local y la verificación de la configuración.
- **Gestión de flotas**: haga un seguimiento y gestione su flota de OpenTelemetry Collector desde la interfaz de usuario de Datadog.

## Configuración {#setup}

<div class="alert alert-danger">Si utiliza el <a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a>, <strong>no</strong> configure manualmente la extensión de Datadog. Está habilitada automáticamente en todas las versiones del DDOT Collector.</div>

### 1. Agregue la extensión de Datadog a su configuración del Collector {#1-add-the-datadog-extension-to-your-collector-configuration}

Configure la extensión de Datadog en su archivo de configuración de OpenTelemetry Collector:

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match the hostname in exported telemetry

service:
  extensions: [datadog]
```

### 2. Configure un pipeline de telemetría activo {#2-configure-an-active-telemetry-pipeline}

Configure al menos un pipeline de telemetría activo y exporte sus datos a Datadog. Para la configuración recomendada, utilice la [configuración del exportador OTLP HTTP][9].

La extensión utiliza metadatos del Collector y del servidor para asociar la configuración reportada con el servidor correspondiente en Datadog.

### 3. (Opcional) Agregue atributos de recurso personalizados {#3-optional-add-custom-resource-attributes}

La extensión de Datadog recopila automáticamente los atributos de recurso de la telemetría interna del colector y los incluye en la carga útil de metadatos que envía a Datadog. Para adjuntar atributos personalizados como el entorno de despliegue, el equipo o el nombre del clúster de Kubernetes, establézcalos bajo `service.telemetry.resource`:

```yaml
service:
  telemetry:
    resource:
      deployment.environment.name: production
      team.name: platform
      k8s.cluster.name: prod-us-east1-cluster-a
```

El Collector adjunta automáticamente `service.name`, `service.version` y `service.instance.id` (un UUID generado aleatoriamente) a su telemetría interna. No necesita configurarlos manualmente.

### 4. (Opcional) Configure la topología de puerta de enlace (vista previa) {#4-optional-configure-gateway-topology-preview}

Cuando tiene una configuración de puerta de enlace de OpenTelemetry Collector que reenvía telemetría a través de uno o más colectores de puerta de enlace antes de llegar a Datadog, la extensión de Datadog puede publicar la topología para que aparezca como un gráfico de canalización conectado en [Fleet Automation][7]:

{{< img src="opentelemetry/integrations/datadog_extension_gateway_topology.png" alt="Vista de topología de puerta de enlace en Fleet Automation que muestra los colectores DaemonSet reenviando a través de dos capas de colectores de puerta de enlace a Datadog" style="width:100%;" >}}

Para habilitar esta vista, configure cada Collector en la canalización:

- Establezca `deployment_type` en `daemonset` para los Collectors de agente o DaemonSet y en `gateway` para los Collectors de puerta de enlace.
- Establezca `gateway_destination` en los Collectors que reenvían a una puerta de enlace descendente. El valor es el servicio de Kubernetes de la puerta de enlace receptora, en forma de `<namespace>/<service>`.
- Establezca `gateway_service` en los colectores de puerta de enlace. El valor es el servicio de Kubernetes que está frente a los pods de la puerta de enlace.
- Una **puerta de enlace intermedia** en una canalización de varias capas establece **ambos** `gateway_service` (su propio servicio) y `gateway_destination` (la siguiente puerta de enlace).
- Establezca `k8s.cluster.name` bajo `service.telemetry.resource` en cada Collector de la canalización. Esto es **obligatorio**: junto con `gateway_service` y `gateway_destination`, forma la clave de unión que Fleet Automation utiliza para reconstruir el gráfico de la canalización.
- Habilite las métricas internas del Collector para que la extensión pueda atribuir los datos de volumen de registros, métricas o trazas a cada borde en el gráfico con el interruptor **Mostrar tráfico**. Consulte [Métricas de estado del OpenTelemetry Collector][10].

El ejemplo a continuación cubre el caso común de dos capas: un DaemonSet local al nodo reenvía a un Deployment de puerta de enlace, el cual envía a Datadog con el Datadog Exporter.

Cada Collector expone sus propias métricas de estado en un punto de conexión de extracción de Prometheus a través de `service.telemetry.metrics`, extrae ese punto de conexión con un receptor `prometheus/internal` y enruta el resultado a través de la misma canalización de métricas que la telemetría de la aplicación. Esto es lo que completa cada nodo y borde en la visualización de topología.

#### DaemonSet Collector {#daemonset-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  otlp:
    endpoint: otelcol-gateway.monitoring.svc.cluster.local:4317
    tls:
      insecure: true

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: daemonset
    gateway_destination: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      exporters: [otlp]
```

La canalización `metrics` del DaemonSet incluye `prometheus/internal` para que las propias métricas de estado del Collector viajen a través de OTLP a la puerta de enlace junto con la telemetría de la aplicación, llegando a Datadog a través del Datadog Exporter de la puerta de enlace.

#### Gateway Collector {#gateway-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    metrics:
      resource_attributes_as_tags: true
    sending_queue:
      batch:
        flush_timeout: 10s

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

La canalización `metrics` de la puerta de enlace acepta tanto la telemetría reenviada (desde el DaemonSet a través de OTLP) como sus propias métricas internas desde `prometheus/internal`, luego exporta todo a Datadog.

#### Canalizaciones de puerta de enlace de múltiples capas {#multi-layer-gateway-pipelines}

Para canalizaciones con más de una capa de puerta de enlace, configure `gateway_service` y `gateway_destination` juntos en la capa intermedia. Por ejemplo, en una topología de tres capas con una puerta de enlace de Capa 2 entre el DaemonSet y una puerta de enlace de Capa 1, la extensión de la puerta de enlace de Capa 2 se configura de la siguiente manera:

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway-l2
    gateway_destination: monitoring/otelcol-gateway-l1
```

El DaemonSet reenvía a `monitoring/otelcol-gateway-l2`, la puerta de enlace de Capa 2 reenvía a `monitoring/otelcol-gateway-l1`, y la puerta de enlace de Capa 1 envía a Datadog. Cada Collector informa el mismo `k8s.cluster.name`.

## Opciones de configuración {#configuration-options}

| Parámetro | Descripción | Predeterminado |
|-----------|-------------|---------|
| `api.key` | Clave de Datadog API (obligatorio). | - |
| `api.site` | Sitio de Datadog (por ejemplo, `us5.datadoghq.com`). | `datadoghq.com` |
| `api.fail_on_invalid_key` | Salir al inicio si la clave de API no es válida. | `true` |
| `hostname` | Nombre de host personalizado para el Collector. | Detectado automáticamente |
| `http.endpoint` | Punto de conexión del servidor HTTP local. | `localhost:9875` |
| `http.path` | Ruta del servidor HTTP para metadatos. | `/metadata` |
| `deployment_type` | Identifica cómo se implementa el Collector. Este valor aparece en [Fleet Automation][7] y es necesario para la [topología de puerta de enlace](#4-optional-configure-gateway-topology-preview). Uno de los siguientes: `gateway`, `daemonset` o `unknown`. El valor predeterminado `unknown` significa que el tipo de implementación no se estableció. | `unknown` |
| `installation_method` | Cómo se instaló el Collector. Uno de los siguientes: `kubernetes`, `bare-metal`, `docker`, `ecs-fargate`, `eks-fargate` o sin establecer. Disponible en Collector v0.148.0 y versiones posteriores. | sin establecer |
| `gateway_service` | Se establece solo en Collectors de **gateway**. El servicio de Kubernetes que respalda los pods del Collector gateway. Formato: `service` o `namespace/service`. Disponible en Collector v0.150.0 y versiones posteriores. | - |
| `gateway_destination` | Establezca en cualquier Collector que reenvíe telemetría a una puerta de enlace descendente. El servicio de Kubernetes al que este Collector reenvía la telemetría. Debe coincidir con `gateway_service` en el gateway Collector receptor. Formato: `service` o `namespace/service`. Disponible en Collector v0.150.0 y versiones posteriores. | - |
| `proxy_url` | URL del proxy HTTP para solicitudes salientes. | - |
| `timeout` | Tiempo de espera para solicitudes HTTP. | `30s` |
| `tls.insecure_skip_verify` | Omitir la verificación del certificado TLS. | `false` |

<div class="alert alert-danger">
<strong>Coincidencia de nombre de host</strong>: Si especifica un nombre de host personalizado <code>hostname</code> en la extensión de Datadog, debe coincidir con el nombre de servidor en la telemetría exportada. La extensión no infiere un nombre de servidor a partir de la telemetría de la aplicación en sus canalizaciones; obtiene su nombre de servidor de las API del sistema o del proveedor de la nube, o de la configuración manual. Si utiliza el exportador de Datadog, su <code>hostname</code> valor también debe coincidir. De lo contrario, es posible que Datadog no correlacione la telemetría con el servidor correcto y que aparezcan servidores duplicados.
</div>

### Ejemplo de configuración completa con el exportador de Datadog {#complete-configuration-example-with-the-datadog-exporter}

El siguiente ejemplo utiliza el exportador de Datadog. La extensión en sí no lo requiere; para la canalización recomendada, utilice la configuración del exportador HTTP de OTLP de [Configurar OpenTelemetry Collector][9].

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    http:
      endpoint: "localhost:9875"
      path: "/metadata"
    proxy_url: "http://proxy.example.com:8080"
    timeout: 30s
    tls:
      insecure_skip_verify: false

exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    sending_queue:
      batch:
        flush_timeout: 10s

service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      exporters: [datadog/exporter]
```

## Visualización de la configuración del Collector {#viewing-collector-configuration}

Una vez configurado, puede visualizar la configuración de su OpenTelemetry Collector y la información de compilación en varias ubicaciones:

### Fleet Automation {#fleet-automation}
1. Navegue a [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}}][7].
2. Filtre los servidores del OTel Collector usando las facetas del Collector y luego haga clic en un servidor.
3. En el panel lateral, seleccione la pestaña {{< ui >}}Info{{< /ui >}} para visualizar la información de compilación.
4. Seleccione la pestaña {{< ui >}}Configurations{{< /ui >}} para visualizar el archivo YAML completo o una visualización de la canalización de las configuraciones de su OTel Collector.

{{< img src="/agent/fleet_automation/fleet-automation-yaml-view.png" alt="Visualizar los YAML de configuración del OTel Collector en Fleet Automation" style="width:100%;" >}}

### Lista de infraestructura (Lista de servidores) {#infrastructure-list-host-list}

1. Navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][2] en su cuenta de Datadog.
2. Haga clic en cualquier servidor que ejecute el OpenTelemetry Collector (**Nota**: filtre por `field:apps:otel` para mostrar solo las instancias del Collector).
3. En el panel de detalles del servidor, seleccione la pestaña {{< ui >}}OTel Collector{{< /ui >}} para ver la información de compilación y la configuración completa del Collector.

### Resource Catalog {#resource-catalog}

1. Navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Resource Catalog{{< /ui >}}][3] en su cuenta de Datadog
2. Filtre por servidores o busque sus instancias del Collector.
3. Haga clic en cualquier servidor que ejecute el OpenTelemetry Collector.
4. Desplácese hacia abajo hasta {{< ui >}}Collector{{< /ui >}} para ver la información de compilación y la configuración completa del Collector.

## Servidor HTTP local {#local-http-server}

La extensión de Datadog incluye un servidor HTTP local para depuración e inspección:

```bash
# Access collector metadata locally
curl http://localhost:9875/metadata
```

Este punto de conexión proporciona:
- Configuración del Collector (sin información confidencial)
- Información de compilación y detalles de la versión
- Lista de componentes activos
- Estado de la extensión

## Solución de problemas {#troubleshooting}

### Configuración que no aparece en Datadog {#configuration-not-appearing-in-datadog}

1. **Verificar la coincidencia del nombre de servidor**: Confirme que el nombre de servidor de la extensión de Datadog coincida con el nombre de servidor en la telemetría exportada. Si utiliza el Datadog Exporter, confirme que su nombre de servidor también coincida.
2. **Verificar la clave de API**: Confirme que la clave de API sea válida y tenga los permisos adecuados.
3. **Verificar los registros del Collector**: Busque los registros de inicialización de la extensión y de envío de datos.
4. **Confirmar que la extensión esté habilitada**: Verifique que la extensión aparezca en la configuración del servicio.

### Problemas del servidor HTTP {#http-server-issues}

1. **Conflictos de puerto**: Asegúrese de que el puerto 9875 esté disponible o configure un puerto diferente.
2. **Acceso a la red**: Verifique que el servidor HTTP sea accesible desde su ubicación de depuración.
3. **Verificar los registros**: Revise los registros de la extensión para detectar problemas de inicio del servidor HTTP.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/catalog
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.129.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.129.1
[6]: https://opentelemetry.io/docs/collector/custom-collector/
[7]: https://app.datadoghq.com/fleet
[8]: /es/opentelemetry/setup/ddot_collector/
[9]: /es/opentelemetry/setup/collector_exporter/
[10]: /es/opentelemetry/integrations/collector_health_metrics/