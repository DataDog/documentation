---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentation
  text: Exécuter des checks de cluster avec Autodiscovery
- link: /containers/cluster_agent/endpointschecks/
  tag: Documentation
  text: Exécuter des checks d'endpoint avec Autodiscovery
title: Dépannage des checks de cluster et d'endpoint
---

## Checks de cluster

### Kubernetes : trouver l'Agent de cluster leader

Lorsque l'élection de leader est activée, seul le leader distribue les configurations de check de cluster aux Agents de nœud. Si un seul réplica du pod de l'Agent de cluster est exécuté, il s'agit du leader. Si vous exécutez plusieurs réplicas, vous pouvez identifier le nom du leader dans la ConfigMap de `datadog-leader-election` :

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ... }'
```

Ici, le pod leader est `cluster-agent-rhttz`. S'il est supprimé ou ne répond pas, un autre pod le remplace automatiquement.

### Autodiscovery dans l'Agent de cluster

Pour garantir la récupération d'une configuration (statique ou identifiée avec Autodiscovery) par l'Agent de cluster, utilisez la commande `configcheck` dans l'Agent de cluster leader :

```text
# kubectl exec <NOM_POD_AGENT_CLUSTER> agent configcheck
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

### Logique de distribution dans l'Agent de cluster

La commande `clusterchecks` vous permet d'inspecter l'état de la logique de distribution, notamment :

- les Agents de nœud qui communiquent activement avec l'Agent de cluster ; et
- les checks qui sont distribués sur chaque nœud.

```text
# kubectl exec <NOM_POD_CLUSTER_AGENT> agent clusterchecks

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

**Remarque** : l'ID d'instance est différent de celui de la commande `configcheck`, car l'instance est modifiée pour ajouter des tags et des options.

Dans le cas présent, cette configuration est distribuée au nœud `default-pool-bce5cd34-ttw6`. Le dépannage du pod de l'Agent se poursuit sur le nœud correspondant.

### Autodiscovery dans l'Agent de nœud

La commande `configcheck` de l'Agent doit afficher l'instance, avec la source `cluster-checks` :

```text
# kubectl exec <NOM_POD_AGENT_NŒUD> agent configcheck
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

L'ID d'instance correspond à l'ID précédent.

### Agent status

La commande `status` de l'Agent devrait indiquer que l'instance de check est en cours d'exécution et qu'elle envoie correctement des informations.

```text
# kubectl exec <NOM_POD_AGENT_NOEUD> agent status
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

## Checks d'endpoint

Le dépannage de checks d'endpoint est semblable au [dépannage de checks de cluster](#checks-de-cluster). Les principales différences se situent au niveau des Agents de nœud. Pour ces Agents, les checks d'endpoint planifiés apparaissent aux côtés des checks de cluster.

**Remarque** : les checks d'endpoint sont planifiés par des Agents qui s'exécutent sur le même nœud que le ou les pods qui exposent le ou les endpoints du service. Si un endpoint n'est pas exposé par un pod, l'Agent de cluster convertit le check en check de cluster. Le check de cluster peut être exécuté par n'importe quel Agent de nœud.

### Autodiscovery dans l'Agent de nœud

La commande `configcheck` de l'Agent permet d'afficher l'instance, avec la source de `endpoints-checks` :

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

### Agent status

La commande `status` de l'Agent devrait indiquer que l'instance de check est en cours d'exécution et qu'elle envoie correctement des informations.

```shell
# kubectl exec <NOM_POD_AGENT_NOEUD> agent status
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

### Autodiscovery dans l'Agent de cluster

La commande `clusterchecks` de l'Agent de cluster permet d'afficher le ou les instances, avec la source de `kubernetes-endpoints` :

```shell
# kubectl exec <NOM_POD_AGENT_CLUSTER> agent clusterchecks
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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}