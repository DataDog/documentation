---
aliases:
- /fr/agent/cluster_agent/troubleshooting
- /fr/containers/cluster_agent/troubleshooting
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: /containers/kubernetes/installation/
  tag: Documentation
  text: Installation sur Kubernetes
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Intégrations personnalisées
title: Dépannage de l'Agent de cluster
---

Ce document contient des informations de dépannage pour les composants suivants :

- [Agent de cluster Datadog](#agent-de-cluster-datadog)
- [Agent de nœud](#agent-de-nœud)

## Agent de cluster Datadog

Afin d'exécuter les commandes de dépannage pour l'Agent de cluster, vous devez d'abord vous trouver au sein du pod de l'Agent de cluster ou d'un Agent basé sur des nœuds. Pour ce faire, utilisez la commande suivante :

```text
kubectl exec -it <NOM_POD_AGENT_CLUSTER_DATADOG> bash
```

Pour afficher les métadonnées de cluster envoyées par l'Agent de cluster Datadog, exécutez ce qui suit :

```text
agent metamap
```

Le résultat suivant devrait s'afficher :

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

Pour vérifier que l'Agent de cluster Datadog est interrogé, recherchez :

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# tail -f /var/log/datadog/cluster-agent.log
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
```

Si la collecte d'événements ne fonctionne pas correctement, vérifiez que `DD_LEADER_ELECTION` et `DD_COLLECT_KUBERNETES_EVENTS` sont définis sur `true`, et que les verbes adéquats sont répertoriés dans le RBAC (notamment `watch events`).

Si vous les avez activés, vérifiez le statut d'élection du leader et le check `kube_apiserver` à l'aide de la commande suivante :

```text
agent status
```

On obtient alors le résultat suivant :

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

## Agent de nœud

Vous pouvez vérifier le statut de l'Agent de cluster Datadog en exécutant la commande status de l'Agent : `datadog-agent status`.

Si l'Agent de cluster Datadog est activé et correctement configuré, vous devriez voir ce qui suit :

```text
[...]
 =====================
 Datadog Cluster Agent
 =====================
   - Datadog Cluster Agent endpoint detected: https://XXX.XXX.XXX.XXX:5005
   Successfully Connected to the Datadog Cluster Agent.
   - Running: {Major:1 Minor:0 Pre:xxx Meta:xxx Commit:xxxxx}
```

Veillez à ce que le service de l'Agent de cluster soit créé avant les pods de l'Agent, de manière à ce que le DNS soit disponible dans les variables d'environnement :

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}