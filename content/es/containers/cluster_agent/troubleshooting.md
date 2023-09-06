---
aliases:
- /es/agent/cluster_agent/troubleshooting
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Presentación del Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Escala automáticamente tus cargas de trabajo de Kubernetes con cualquier métrica
    de Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentación
  text: Ejecutar checks de clúster con Autodiscovery
- link: /agent/kubernetes/daemonset_setup/
  tag: Documentación
  text: Configuración de DaemonSet de Kubernetes
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Integraciones personalizadas
- link: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting
  tag: GitHub
  text: Solucionar problemas del Datadog Cluster Agent
kind: documentación
title: Solucionar problemas del Cluster Agent
---

Este documento contiene información sobre cómo solucionar los problemas de los siguientes componentes:

- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Agent de nodo](#node-agent)
- [Custom Metrics Server](#custom-metrics-server)
  - [Estado y flare del Cluster Agent](#cluster-agent-status-and-flare)
  - [Descripción del manifiesto HPA](#describing-the-hpa-manifest)
  - [Diferencias de valor entre Datadog y Kubernetes](#differences-of-value-between-datadog-and-kubernetes)
- [Checks de clúster](#cluster-checks)
  - [Kubernetes: encontrar el Cluster Agent principal](#kubernetes-find-the-leader-cluster-agent)
  - [Autodiscovery en el Cluster Agent](#autodiscovery-in-the-cluster-agent)
  - [Lógica de distribución en el Cluster Agent](#dispatching-logic-in-the-cluster-agent)
  - [Autodiscovery en el Agent basado en nodos](#autodiscovery-in-the-node-based-agent)
  - [Estado del Agent](#agent-status)
- [Checks de endpoint](#endpoint-checks)
  - [Autodiscovery en el Agent de nodo](#autodiscovery-in-the-node-agent)
  - [Estado del Agent](#agent-status-1)
  - [Autodiscovery en el Cluster Agent](#autodiscovery-in-the-cluster-agent-1)
- [Leer más](#further-reading)

## Datadog Cluster Agent

Si quieres ejecutar los comandos para solucionar problemas en el Cluster Agent, primero debes entrar en el pod del Cluster Agent o en el Agent basado en nodos. Para ello, utiliza lo siguiente:

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_POD_NAME> bash
```

Para ver qué metadatos del clúster proporciona el Datadog Cluster Agent, ejecuta lo siguiente:

```text
datadog-cluster-agent metamap
```

Lo normal sería que obtuvieses el siguiente resultado:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent metamap

===============
Metadata Mapper
===============

Node detected: gke-test-default-pool-068cb9c0-sf1w

  - Namespace: kube-system
      - Pod: kube-dns-788979dc8f-hzbj5
        Services: [kube-dns]
      - Pod: kube-state-metrics-5587867c9f-xllnm
        Services: [kube-state-metrics]
      - Pod: kubernetes-dashboard-598d75cb96-5khmj
        Services: [kubernetes-dashboard]

Node detected: gke-test-default-pool-068cb9c0-wntj

  - Namespace: default
      - Pod: datadog-cluster-agent-8568545574-x9tc9
        Services: [datadog-custom-metrics-server dca]

  - Namespace: kube-system
      - Pod: heapster-v1.5.2-6d59ff54cf-g7q4h
        Services: [heapster]
      - Pod: kube-dns-788979dc8f-q9qkt
        Services: [kube-dns]
      - Pod: l7-default-backend-5d5b9874d5-b2lts
        Services: [default-http-backend]
      - Pod: metrics-server-v0.2.1-7486f5bd67-v827f
        Services: [metrics-server]
```

Para verificar que se está consultando el Datadog Cluster Agent, busca lo siguiente:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# tail -f /var/log/datadog/cluster-agent.log
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
```

Si los eventos no se recopilan correctamente, asegúrate de que los parámetros `DD_LEADER_ELECTION` y `DD_COLLECT_KUBERNETES_EVENTS` están configurados como `true`. Comprueba también que aparezcan los verbos apropiados en la configuración del control de acceso basado en roles (en particular, `watch events`).

Si los has habilitado, comprueba el estado de la opción principal y el check `kube_apiserver` con el siguiente comando:

```text
datadog-cluster-agent status
```

Lo normal sería que el resultado fuese el siguiente:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent status
[...]
  Leader Election
  ===============
    Leader Election Status:  Running
    Leader Name is: datadog-cluster-agent-8568545574-x9tc9
    Last Acquisition of the lease: Mon, 11 Jun 2018 06:38:53 UTC
    Renewed leadership: Mon, 11 Jun 2018 09:41:34 UTC
    Number of leader transitions: 2 transitions
[...]
  Running Checks
  ==============
    kubernetes_apiserver
    --------------------
      Total Runs: 736
      Metrics: 0, Total Metrics: 0
      Events: 0, Total Events: 100
      Service Checks: 3, Total Service Checks: 2193
[...]
```

## Agent de nodo

Puedes comprobar el estado del Datadog Cluster Agent ejecutando el comando de estado del Agent:
`datadog-agent status`

Si el Datadog Cluster Agent está habilitado y configurado correctamente, deberías ver esto:

```text
[...]
 =====================
 Datadog Cluster Agent
 =====================
   - Datadog Cluster Agent endpoint detected: https://XXX.XXX.XXX.XXX:5005
   Successfully Connected to the Datadog Cluster Agent.
   - Running: {Major:1 Minor:0 Pre:xxx Meta:xxx Commit:xxxxx}
```

Asegúrate de que el servicio del Cluster Agent se ha creado antes que los pods del Agent para que el DNS esté disponible en las variables de entorno:

```text
root@datadog-agent-9d5bl:/# env | grep DATADOG_CLUSTER_AGENT | sort
DATADOG_CLUSTER_AGENT_PORT=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_ADDR=10.100.202.234
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PORT=5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PROTO=tcp
DATADOG_CLUSTER_AGENT_SERVICE_HOST=10.100.202.234
DATADOG_CLUSTER_AGENT_SERVICE_PORT=5005
DATADOG_CLUSTER_AGENT_SERVICE_PORT_AGENTPORT=5005

root@datadog-agent-9d5bl:/# echo ${DD_CLUSTER_AGENT_AUTH_TOKEN}
DD_CLUSTER_AGENT_AUTH_TOKEN=1234****9
```

## Custom Metrics Server

### Estado y flare del Cluster Agent

Si tienes problemas con el Custom Metrics Server:

* Asegúrate de que tienes la capa de agregación y los certificados configurados.
* Asegúrate de que las métricas que quieres escalar automáticamente están disponibles. Al crear el HPA, el Datadog Cluster Agent parsea el manifiesto y consulta a Datadog para intentar obtener la métrica. Si hay algún problema tipográfico en el nombre de tu métrica o si tu aplicación Datadog no dispone de esa métrica, aparecerá el siguiente error:

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

Ejecuta el comando `datadog-cluster-agent status` para ver el estado del proceso del proveedor de métricas externo:

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

Con este comando, se muestran los errores presentes en el proceso del proveedor de métricas externo. Si quieres un resultado más detallado, ejecuta el comando flare: `datadog-cluster-agent flare`.

El comando flare genera un archivo zip que contiene el `custom-metrics-provider.log`, donde se puede ver el resultado de la siguiente manera:

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - cluster: eks
    metricName: redis.key
    ts: 1532042322
    valid: false
    value: 0

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - dcos_version: 1.9.4
    metricName: docker.mem.limit
    ts: 1.532042322
    valid: true
    value: 268435456
```

Si el indicador `Valid` de la métrica se establece como `false`, la métrica no se tendrá en cuenta en el pipeline de HPA.

### Descripción del manifiesto HPA

Si aparece el siguiente mensaje al describir el manifiesto HPA:

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

Es probable que no tengas la configuración del control de acceso basado en roles (RBAC) adecuada para el HPA. Asegúrate que `kubectl api-versions` muestra lo siguiente:

```text
autoscaling/v2beta1
[...]
external.metrics.k8s.io/v1beta1
```

Esto último aparece si el Datadog Cluster Agent se registra correctamente como proveedor de métricas externo (y si has referenciado el mismo nombre de servicio en el APIService del proveedor de métricas externo, así como el del Datadog Cluster Agent en el puerto `8443`). Asegúrate también de haber configurado el control de acceso basado en roles (RBAC) al [registrar el proveedor de métricas externo][1].

Si aparece el siguiente error al describir el manifiesto HPA:

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Asegúrate de que el Datadog Cluster Agent se está ejecutando y de que el servicio que expone el puerto `8443`, cuyo nombre está registrado en el APIService, está activo.

### Diiferencias de valor entre Datadog y Kubernetes

A medida que Kubernetes escala automáticamente tus recursos, el objetivo actual se pondera en función del número de réplicas del despliegue escalado.
El valor devuelto por el Datadog Cluster Agent se obtiene de Datadog y debe ser proporcionalmente igual al objetivo actual multiplicado por el número de réplicas.

Ejemplo:

```text
    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - app: puppet
    - env: demo
    metricName: nginx.net.request_per_s
    ts: 1532042322
    valid: true
    value: 2472
```

El Cluster Agent ha obtenido `2472`, pero el HPA indica esto:

```text
NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   824/9 (avg)   1         3         3          41m
```

Y, efectivamente, `824 * 3 réplicas = 2472`.

*Advertencia*: El Datadog Cluster Agent procesa las métricas establecidas en los diferentes manifiestos HPA y consulta a Datadog para obtener valores cada 30 segundos de forma predeterminada. Kubernetes consulta al Datadog Cluster Agent cada 30 segundos de forma predeterminada. Como este proceso se realiza de forma asíncrona, no se debe esperar que la regla anterior se verifique en todo momento, especialmente si la métrica varía, pero se pueden configurar ambas frecuencias para mitigar cualquier problema.

## Checks de clúster

### Kubernetes: encontrar el Cluster Agent líder

Cuando la opción principal está activada, solo esta proporciona configuraciones de check de clúster a los Agents basados en nodos. Si solo se está ejecutando una réplica del pod del Cluster Agent, esta será la opción principal. En caso contrario, puedes identificar el nombre de la opción principal en el ConfigMap `datadog-leader-election`:

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ... }'
```

En este caso, el pod principal es `cluster-agent-rhttz`. Si el pod se borra o no responde, otro pod toma el relevo automáticamente.

### Autodiscovery en el Cluster Agent

Para asegurarse de que el Cluster Agent seleccione una configuración (estática o de Autodiscovery), utiliza el comando `configcheck` en el Cluster Agent principal:

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Lógica de distribución en el Cluster Agent

El comando `clusterchecks` te permite inspeccionar el estado de la lógica de distribución, que abarca aspectos como:

- Qué Agents basados en nodos envía información activamente al Cluster Agent.
- Qué checks se distribuyen a cada nodo.

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**Nota:** El ID de instancia es diferente al comando `configcheck`, ya que la instancia se modifica para añadir etiquetas (tags) y opciones.

En este caso, esta configuración se distribuye al nodo `default-pool-bce5cd34-ttw6`. En cuando al pod del Agent, la solución de problemas continúa en ese nodo en particular.

### Autodiscovery en el Agent basado en nodos

El comando `configcheck` del Agent debería mostrar la instancia con la fuente `cluster-checks`:

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

El ID de instancia coincide con el que tenías antes.

### Estado del Agent

El comando `status` del Agent debería mostrar la instancia del check ejecutándose e informando correctamente.

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## Checks de endpoint

Solucionar problemas en los checks de endpoint es similar a [solucionar problemas en los checks de clúster](#cluster-checks). Las diferencias se producen en los Agents de nodo, donde los checks de endpoint programados aparecen junto con los checks de clúster.

**Nota**: Los checks de endpoint los programan los Agents que se ejecutan en el mismo nodo que el pod (o pods) que respalda el endpoint (o endpoints) del servicio. Si un endpoint no está respaldado por un pod, el Cluster Agent convierte el check en un check de clúster. Este check de clúster lo puede ejecutar cualquier Agent de nodo.

### Autodiscovery en el Agent de nodo

El comando `configcheck` del Agent muestra la instancia con la fuente `endpoints-checks`:

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:956741d8796d940c
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- pod_phase:running
- kube_deployment:nginx
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
```

### Estado del Agent

El comando `status` del Agent debería mostrar la instancia del check ejecutándose e informando correctamente.

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    nginx (4.0.0)
    -------------
      Instance ID: nginx:956741d8796d940c [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Autodiscovery en el Cluster Agent

El comando `clusterchecks` del Cluster Agent muestra la(s) instancia(s) con la fuente `kubernetes-endpoints`:

```shell
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
...
===== 3 Pod-backed Endpoints-Checks scheduled =====

=== nginx check ===
Configuration provider: kubernetes-endpoints
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:f139adc46c81828e
name: My Nginx Endpoints
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
...
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/cluster_agent/external_metrics/#register-the-external-metrics-provider