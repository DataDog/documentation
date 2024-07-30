---
aliases:
- /es/agent/autodiscovery/endpointchecks
- /es/agent/autodiscovery/endpointschecks
- /es/agent/cluster_agent/endpointschecks
further_reading:
- link: /agent/kubernetes/cluster/
  tag: Documentación
  text: Cluster Agent
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentación
  text: Checks de clúster
- link: /containers/troubleshooting/cluster-and-endpoint-checks
  tag: Documentación
  text: Solucionar problemas en los checks de endpoint
title: Checks de endpoint con Autodiscovery
---

## Información general

La función de los checks de clúster ofrece la posibilidad de utilizar [Autodiscovery][1] y de realizar checks en servicios de clúster con equilibrio de carga, tales como los servicios de Kubernetes. Los _checks de endpoint_ amplían este mecanismo para monitorizar todos los endpoints gestionados por un servicio de Kubernetes.

El [Cluster Agent][2] detecta las configuraciones de checks de endpoint basadas en anotaciones de [Autodiscovery][1] en los servicios de Kubernetes. A continuación, el Cluster Agent distribuye estas configuraciones a los Agents basados en nodos para que las ejecuten individualmente. Los checks de endpoint se distribuyen a los Agents que se ejecutan en el mismo nodo que el pod (o pods) que respalda el endpoint (o endpoints) del servicio monitorizado de Kubernetes. Gracias a esta lógica de distribución, el Agent puede añadir las etiquetas (tags) de pod y contenedor que ya ha recopilado para cada pod.

Los Agents conectan con el Cluster Agent cada diez segundos y obtienen las configuraciones de los checks que deben ejecutar. Las métricas procedentes de los checks de endpoint se envían con etiquetas de servicio, [etiquetas de Kubernetes][3], etiquetas de host y la etiqueta `kube_endpoint_ip`, que se basa en la dirección IP evaluada.

**Control de versiones**:
Kubernetes admite esta función en el caso del Datadog Agent v6.12.0 y del Datadog Cluster Agent v1.3.0 (y sus respectivas versiones posteriores). A partir del Cluster Agent v1.4.0, el Cluster Agent convierte todos los checks de endpoint de un endpoint no respaldado por un pod en checks de clúster normales. Por tanto, debes activar la función de los [checks de clúster][4] (además de la función de los checks de endpoint) para aprovechar esta funcionalidad.

**Nota:** Si los pods que respaldan tu servicio son estáticos, tienes que añadir la anotación `ad.datadoghq.com/endpoints.resolve`. El Cluster Agent programa los checks como checks de endpoint y los distribuye a [ejecutores de checks de clúster][5]. Para saber cómo usar la anotación con el servidor de la API de Kubernetes, [consulta este ejemplo][6].

### Ejemplo: servicio con endpoints
En el siguiente ejemplo, se ha creado un despliegue de Kubernetes para NGINX con tres pods.

```shell
kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

También se ha creado un servicio que se enlaza con los pods a través de estos tres endpoints.

```shell
kubectl get service nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
kubectl get endpoints nginx -o yaml
...
- addresses:
  - ip: 10.0.0.117
    nodeName: gke-cluster-default-pool-4658d5d4-k2sn
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-m4c7t
      ...
  - ip: 10.0.1.209
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-smsxv
      ...
  - ip: 10.0.1.210
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-x2wzq
      ...
```

Mientras que los checks de clúster basados en un servicio comprueban la dirección IP única del servicio, los checks de endpoint están programados para comprobar **cada uno** de los tres endpoints asociados a este servicio.

Por diseño, los checks de endpoint se distribuyen hacia los Agents que se ejecutan en el mismo nodo que los pods que respaldan los endpoints del servicio `nginx`. En este ejemplo, los Agents que se ejecutan en los nodos `gke-cluster-default-pool-4658d5d4-k2sn` y `gke-cluster-default-pool-4658d5d4-p39c` lanzan los checks en estos pods `nginx`.

## Configurar la distribución de checks de endpoint

{{< tabs >}}
{{% tab "Operator" %}}

La distribución de checks de endpoint se habilita en el despliegue del Operator del Cluster Agent a través de la clave de configuración de `features.clusterChecks.enabled`:
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

Esta configuración habilita la distribución de los checks de clúster y de los checks de endpoint entre el Cluster Agent y los Agents.

{{% /tab %}}
{{% tab "Helm" %}}

La distribución de checks de endpoint se habilita por defecto en el despliegue de Helm del Cluster Agent a través de la clave de configuración de `datadog.clusterChecks.enabled`:
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

Esta configuración habilita la distribución de los checks de clúster y de los checks de endpoint entre el Cluster Agent y los Agents.

{{% /tab %}}

{{% tab "DaemonSet" %}}
### Configuración del Cluster Agent

Habilita el proveedor de configuración y el proceso de escucha `kube_endpoints` en el Datadog Cluster Agent. Establece las variables de entorno `DD_EXTRA_CONFIG_PROVIDERS` y `DD_EXTRA_LISTENERS`:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**Nota**: Si los endpoints monitorizados no están respaldados por pods, debes [habilitar los checks de clúster][1]. Añade el proveedor de configuración y el proceso de escucha `kube_services`:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Reinicia el Agent][2] para aplicar el cambio de configuración.

### Configuración del Agent

Habilita los proveedores de configuración `endpointschecks` en el Agent basado en nodos. Esto puede hacerse de dos formas:

- Estableciendo la variable de entorno `DD_EXTRA_CONFIG_PROVIDERS`. Si tienes varios valores, se necesita una cadena en la que los valores estén separados entre sí por espacios:

    ```shell
    DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
    ```

- O añadiéndolo al archivo de configuración `datadog.yaml`:

    ```yaml
    config_providers:
        - name: endpointschecks
          polling: true
    ```

**Nota**: Si los endpoints monitorizados no están respaldados por pods, debes [habilitar los checks de clúster][1]. Esto se puede hacer añadiendo el proveedor de configuración `clusterchecks`:

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Reinicia el Agent][2] para aplicar el cambio de configuración.

[1]: /es/agent/cluster_agent/clusterchecks/
[2]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## Cómo configurar los checks

### Configuración a partir de archivos de configuración estática

En la versión 1.18.0 (y posteriores) del Cluster Agent, puedes utilizar `advanced_ad_identifiers` y las [variables de plantilla de Autodiscovery][7] en la configuración de tu check para dirigirte a los endpoints de Kubernetes ([ver ejemplo][8]).

#### Ejemplo: check HTTP en endpoints de Kubernetes

Para realizar un [check HTTP][9] en los endpoints de un servicio de Kubernetes:

{{< tabs >}}
{{% tab "Helm" %}}
Utiliza el campo `clusterAgent.confd` para definir la configuración del check:

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "<ENDPOINTS_NAME>"
            namespace: "<ENDPOINTS_NAMESPACE>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Integra un archivo `/conf.d/http_check.yaml` en el contenedor del Cluster Agent con el siguiente contenido:

```yaml
advanced_ad_identifiers:
  - kube_endpoints:
      name: "<ENDPOINTS_NAME>"
      namespace: "<ENDPOINTS_NAMESPACE>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{< /tabs >}}

### Configuración a partir de anotaciones en los servicios de Kubernetes

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Nota:** AD Annotations v2 se introdujo en el Datadog Agent v7.36 para simplificar la configuración de la integración. Si tu versión del Datadog Agent es anterior, usa AD Annotations v1.

La sintaxis para anotar servicios es similar a la utilizada para [anotar pods de Kubernetes][1]:

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

Esta sintaxis admite una [variable de plantilla][11] `%%host%%` que se sustituye por la IP de cada endpoint. Las etiquetas `kube_namespace`, `kube_service` y `kube_endpoint_ip` se añaden automáticamente a las instancias.

**Nota**: La configuración personalizada de logs de los endpoints solo se admite durante la recopilación de logs con el socket de Docker, y no durante la recopilación de archivos de logs de Kubernetes.

#### Ejemplo: check de HTTP en un servicio respaldado por NGINX con un check de NGINX en los endpoints del servicio

Este servicio está asociado a los pods del despliegue de `nginx`. En función de esta configuración:

- Se distribuye un check de endpoint basado en [`nginx`][12] para cada pod de NGINX que respalde este servicio. Este check lo ejecutan los Agents en los mismos nodos que los pods de NGINX (utilizando la IP del pod como `%%host%%`).
- Se distribuye un check de clúster basado en [`http_check`][9] hacia un único Agent del clúster. Este check utiliza la IP del servicio como `%%host%%`, lo que equilibra automáticamente la carga en los respectivos endpoints.
- Los checks se distribuyen con las etiquetas (tags) `env:prod`, `service:my-nginx` y `version:1.19.0`, correspondientes a las etiquetas (labels) del [etiquetado de servicios unificado][13].

```yaml
apiVersion: v1
kind: Service
metadata:
    name: nginx
    labels:
        app: nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
      ad.datadoghq.com/service.checks: |
        {
          "http_check": {
            "init_config": {},
            "instances": [
              {
                "url": "http://%%host%%",
                "name": "My Nginx",
                "timeout": 1
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.checks: |
        {
          "nginx": {
            "init_config": {},
            "instances": [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/status/"
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        app: nginx
```

[1]: /es/containers/kubernetes/integrations/?tab=kubernetesadv2
[9]: /es/integrations/http_check/
[11]: /es/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /es/integrations/nginx/
[13]: /es/getting_started/tagging/unified_service_tagging

{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

La sintaxis para anotar servicios es similar a la utilizada para [anotar pods de Kubernetes][10]:

```yaml
ad.datadoghq.com/endpoints.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

Esta sintaxis admite una [variable de plantilla][11] `%%host%%` que se sustituye por la IP de cada endpoint. Las etiquetas `kube_namespace`, `kube_service` y `kube_endpoint_ip` se añaden automáticamente a las instancias.

**Nota**: La configuración personalizada de logs de los endpoints solo se admite durante la recopilación de logs con el socket de Docker, y no durante la recopilación de archivos de logs de Kubernetes.

#### Ejemplo: check de HTTP en un servicio respaldado por NGINX con un check de NGINX en los endpoints del servicio

Este servicio está asociado a los pods del despliegue de `nginx`. En función de esta configuración:

- Se distribuye un check de endpoint basado en [`nginx`][12] para cada pod de NGINX que respalde este servicio. Este check lo ejecutan los Agents en los mismos nodos que los pods de NGINX (utilizando la IP del pod como `%%host%%`).
- Se distribuye un check de clúster basado en [`http_check`][9] hacia un único Agent del clúster. Este check utiliza la IP del servicio como `%%host%%`, lo que equilibra automáticamente la carga en los respectivos endpoints.
- Los checks se distribuyen con las etiquetas (tags) `env:prod`, `service:my-nginx` y `version:1.19.0`, correspondientes a las etiquetas (labels) del [etiquetado de servicios unificado][13].

```yaml
apiVersion: v1
kind: Service
metadata:
    name: nginx
    labels:
        app: nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/endpoints.check_names: '["nginx"]'
        ad.datadoghq.com/endpoints.init_configs: '[{}]'
        ad.datadoghq.com/endpoints.instances: |
            [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/nginx_status"
              }
            ]
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx Service",
                "url": "http://%%host%%"
              }
            ]
        ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        app: nginx
```

[9]: /es/integrations/http_check/
[10]: /es/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /es/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /es/integrations/nginx/
[13]: /es/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/integrations/?tab=kubernetesadv2
[2]: /es/agent/cluster_agent
[3]: /es/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[4]: /es/agent/cluster_agent/clusterchecks/
[5]: /es/containers/guide/clustercheckrunners
[6]: /es/containers/kubernetes/control_plane/?tab=helm#api-server-2
[7]: /es/agent/guide/template_variables/
[8]: /es/agent/cluster_agent/endpointschecks/#example-http_check-on-kubernetes-endpoints
[9]: /es/integrations/http_check/
[10]: /es/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /es/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /es/integrations/nginx/
[13]: /es/getting_started/tagging/unified_service_tagging