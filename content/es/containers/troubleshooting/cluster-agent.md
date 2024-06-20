---
aliases:
- /es/agent/cluster_agent/troubleshooting
- /es/containers/cluster_agent/troubleshooting
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducción al Datadog Cluster Agent
- link: /containers/kubernetes/installation/
  tag: Documentación
  text: Instalación de Kubernetes
- link: /containers/kubernetes/integrations/
  tag: Documentación
  text: Integraciones personalizadas
kind: Documentación
title: Solucionar problemas del Cluster Agent
---

Este documento contiene información sobre cómo solucionar los problemas de los siguientes componentes:

- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Agent de nodo](#node-agent)

## Datadog Cluster Agent

Para ejecutar los comandos de resolución de problemas del Cluster Agent, primero debes estar dentro del Cluster Agent o del pod Agent basado en nodos. Para ello, utiliza:

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_POD_NAME> bash
```

Para ver qué metadatos de clúster proporciona el Datadog Cluster Agent, ejecuta lo siguiente:

```text
agent metamap
```

Deberías ver el siguiente resultado:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# agent metamap

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

Si los eventos no se recopilan correctamente, asegúrate de que `DD_LEADER_ELECTION` y `DD_COLLECT_KUBERNETES_EVENTS` están configurados como `true`. Comprueba también que aparezcan los verbos apropiados en la configuración del control de acceso basado en roles (RBAC) (en particular, `watch events`).

Si los has habilitado, comprueba el estado de la opción principal y el check `kube_apiserver` con el siguiente comando:

```text
agent status
```

Deberías ver el siguiente resultado:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# agent status
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

Puedes consultar el estado del Datadog Cluster Agent ejecutando el comando de estado del Agent:
`agent status`

Si el Datadog Cluster Agent está habilitado y configurado correctamente, deberías ver lo siguiente:

```text
[...]
 =====================
 Datadog Cluster Agent
 =====================
   - Datadog Cluster Agent endpoint detected: https://XXX.XXX.XXX.XXX:5005
   Successfully Connected to the Datadog Cluster Agent.
   - Running: {Major:1 Minor:0 Pre:xxx Meta:xxx Commit:xxxxx}
```

Asegúrate de que el servicio del Cluster Agent se ha creado antes que los pods del Agent, para que el DNS esté disponible en las variables de entorno:

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

## Leer más

{{< partial name="whats-next/whats-next.html" >}}