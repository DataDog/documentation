---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducción al Datadog Cluster Agent
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentación
  text: Ejecutar checks de clústeres con Autodiscovery
- link: /containers/cluster_agent/endpointschecks/
  tag: Documentación
  text: Ejecutar checks de endpoints con Autodiscovery
kind: Documentación
title: Solucionar problemas de checks de clústeres y endpoints
---

## Checks de clústeres

### Kubernetes: encontrar el Cluster Agent principal

Cuando la opción principal está activada, sólo esta proporciona configuraciones de check de clúster a los Agents basados en nodos. Si sólo se está ejecutando una réplica del pod del Cluster Agent, esta será la opción principal. En caso contrario, puedes identificar el nombre de la opción principal en el ConfigMap `datadog-leader-election`:

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

Para asegurarte de que el Cluster Agent selecciona una configuración (estática o de Autodiscovery), utiliza el comando `configcheck` en el Cluster Agent principal:

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

- Los Agents basados en nodos que envían información activamente al Cluster Agent.
- Los checks que se distribuyen a cada nodo.

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

**Nota:** El ID de instancia es diferente del comando `configcheck`, ya que la instancia se modifica para añadir etiquetas (tags) y opciones.

En este caso, esta configuración se distribuye al nodo `default-pool-bce5cd34-ttw6`. En cuanto al pod del Agent, la solución de problemas continúa en ese nodo en particular.

### Autodiscovery en el Agent basado en nodos

El comando `configcheck` del Agent debería mostrar la instancia, con el origen `cluster-checks`:

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

## Checks de endpoints

Solucionar problemas en los checks de endpoints es similar a [solucionar problemas en los checks de clústeres](#cluster-checks). Las diferencias se producen en los Agents de nodo, donde los checks de endpoints programados aparecen junto a los checks de clústeres.

**Nota**: Los checks de endpoints los programan los Agents que se ejecutan en el mismo nodo que el/los pod(s) que respalda el endpoint (o endpoints) del servicio. Si un endpoint no está respaldado por un pod, el Cluster Agent convierte el check en un check de clúster. Este check de clúster lo puede ejecutar cualquier Agent de nodo.

### Autodiscovery en el Agent de nodo

El comando `configcheck` del Agent muestra la instancia con el origen `endpoints-checks`:

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

El comando `clusterchecks` del Cluster Agent muestra la(s) instancia(s) con el origen `kubernetes-endpoints`:

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