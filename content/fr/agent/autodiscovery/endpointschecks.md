---
title: Exécuter des checks d'endpoints avec Autodiscovery
kind: documentation
further_reading:
  - link: /agent/autodiscovery
    tag: Documentation
    text: Documentation principale sur Autodiscovery
  - link: /agent/autodiscovery/clusterchecks/
    tag: Documentation
    text: Documentation sur les checks de cluster
  - link: /agent/kubernetes/cluster/
    tag: Documentation
    text: Documentation sur l'Agent de cluster
---
## Fonctionnement

La fonction [Check de cluster][1] permet de découvrir automatiquement des services de cluster à charge équilibrée (p. ex. les services Kubernetes) et d'effectuer des checks sur ces derniers. La fonction Checks d'endpoints repose sur le même principe et permet de surveiller l'ensemble des endpoints derrière des services de cluster.

L'[Agent de cluster][2] conserve les configurations et les expose aux Agents basés sur des nœuds afin qu'ils puissent les lire et les convertir en checks d'endpoints.

Les checks d'endpoints sont planifiés par des Agents qui s'exécutent sur le même nœud que le ou les pods renforçant le ou les endpoints du service surveillé.

Les Agents se connectent à l'Agent de Cluster toutes les 10 secondes et récupèrent les configurations de check à exécuter. Les métriques provenant des checks d'endpoints seront envoyées avec des tags de service, de pod et de host.

Cette fonction est actuellement prise en charge par Kubernetes pour les versions 6.12.0 et ultérieures de l'Agent et les versions 1.3.0 et ultérieures de l'Agent de cluster.

#### Exemple : trois pods NGINX exposés par le service `nginx`
```
# kubectl get svc nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```
```
# kubectl get pods --selector app=nginx
NAME                     READY   STATUS    RESTARTS   AGE
nginx-758655469f-59q9z   1/1     Running   0          20h
nginx-758655469f-k8zrc   1/1     Running   0          20h
nginx-758655469f-lk9p6   1/1     Running   0          20h
```
```
# kubectl get ep nginx -o yaml
...
- addresses:
  - ip: 10.0.0.117
    nodeName: gke-cluster-default-pool-4658d5d4-k2sn
    targetRef:
      kind: Pod
      name: nginx-758655469f-lk9p6
      ...
  - ip: 10.0.1.209
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-758655469f-59q9z
      ...
  - ip: 10.0.1.210
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-758655469f-k8zrc
      ...
```
De par leur nature, les checks d'endpoints sont planifiés par des Agents qui s'exécutent sur le même nœud que les pods qui renforcent les endpoints du service `nginx`. Ainsi, seuls les Agents s'exécutant sur les nœuds `gke-cluster-default-pool-4658d5d4-k2sn` et `gke-cluster-default-pool-4658d5d4-p39c` planifient les checks sur les pods `nginx`.

Ce fonctionnement permet d'exploiter [Autodiscovery] [3] et de joindre des tags de pod et de conteneur aux métriques envoyées par ces pods.

## Configuration

### Configuration de l'Agent de cluster

Cette fonction requiert un [Agent de cluster en cours d'exécution avec la fonction Checks de cluster activée][4].

### Configuration de l'Agent

Activez les fournisseurs de configuration `endpointschecks` dans l'Agent **de nœud** Datadog. Pour ce faire, deux solutions s'offrent à vous :

- Vous pouvez définir la variable d'environnement `DD_EXTRA_CONFIG_PROVIDERS` :

```
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
```

- Ou vous pouvez l'ajouter dans le fichier de configuration `datadog.yaml` :

```yaml
config_providers:
  - name: endpointschecks
    polling: true
```

[Redémarrez l'Agent][5] pour prendre en compte le changement de configuration.

**Remarque** : pour activer les checks de cluster et les checks d'endpoints, les fournisseurs de configuration `clusterchecks` et `endpointschecks` doivent tous deux être activés dans l'Agent **de nœud** Datadog.

## Implémentation des configurations de check via les annotations de services Kubernetes

De même qu'avec [l'annotation de pods Kubernetes][6], les services peuvent être annotés avec la syntaxe suivante :

```yaml
  ad.datadoghq.com/service.check_names: '[<NOM_CHECK>]'
  ad.datadoghq.com/service.init_configs: '[<CONFIG_INIT>]'
  ad.datadoghq.com/service.instances: '[<CONFIG_INSTANCE>]'
  ad.datadoghq.com/endpoints.check_names: '[<NOM_CHECK>]'
  ad.datadoghq.com/endpoints.init_configs: '[<CONFIG_INIT>]'
  ad.datadoghq.com/endpoints.instances: '[<CONFIG_INSTANCE>]'
```

La [template variable][7] `%%host%%` est prise en charge et remplacée par les fournisseurs d'identité du service et des endpoints. Les tags `kube_namespace` et `kube_service` sont automatiquement ajoutés aux instances.

**Remarque** : pour l'instant, il est nécessaire de définir les annotations `ad.datadoghq.com/service.*` et `ad.datadoghq.com/endpoints.*` pour activer les checks d'endpoints sur les endpoints du service.

#### Exemple : check HTTP sur un service basé sur NGINX avec le check NGINX sur les endpoints du service

La définition de service suivante expose les pods d'un déploiement `my-nginx`. Elle exécute ensuite un [check HTTP][8] afin de mesurer la latence du service à charge équilibrée, ainsi qu'un [check NGINX][9] sur les pods qui renforcent le ou les endpoints du service dans le but de recueillir des métriques `NGINX` et des checks de service au niveau des pods :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
  annotations:
    ad.datadoghq.com/service.check_names: '["http_check"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "name": "My Nginx Service",
          "url": "http://%%host%%",
          "timeout": 1
        }
      ]
    ad.datadoghq.com/endpoints.check_names: '["nginx"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "name": "My Nginx Service Endpoints",
          "nginx_status_url": "http://%%host%%:%%port%%/nginx_status"
        }
      ]
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    run: my-nginx
```

## Dépannage

Le dépannage de checks d'endpoints est semblable au [dépannage de checks de cluster][10]. La seule différence se situe au niveau des Agents basés sur le nœud, où les checks d'endpoints planifiés apparaissent à côté du check de cluster.

**Remarque** : les checks d'endpoints sont planifiés par des Agents qui s'exécutent sur le même nœud que le ou les pods renforçant le ou les endpoints du service.

### Autodiscovery dans l'Agent basé sur les nœuds

La commande `configcheck` de l'Agent doit afficher l'instance, avec la source `endpoints-checks` :

```
# kubectl exec <NOM_POD_AGENT_NŒUD> agent configcheck
...
=== nginx check ===
Source: endpoints-checks
Instance ID: nginx:My Nginx Service Endpoints:96eff84ce7d742b9
name: My Nginx Service Endpoints
nginx_status_url: http://10.0.0.116/nginx_status/
tags:
- kube_deployment:nginx
- kube_namespace:default
- kube_service:nginx
- pod_phase:running
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint://default/nginx
* kubernetes_pod://e8667db4-5f8e-11e9-ae71-42010af0016b
* kube_service://6c964fcf-5d35-11e9-ae71-42010af0016b
===
```

### Statut de l'Agent

La commande `status` de l'Agent doit indiquer que l'instance de check est en cours d'exécution et envoie correctement des informations.

```
# kubectl exec <NOM_POD_AGENT_NŒUD> agent status
...
    nginx (3.1.0)
    -------------
      Instance ID: nginx:My Nginx Service Endpoints:96eff84ce7d742b9 [OK]
      Total Runs: 2
      Metric Samples: Last Run: 7, Total: 14
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 2
      Average Execution Time : 86ms
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/autodiscovery/clusterchecks
[2]: /fr/agent/kubernetes/cluster
[3]: /fr/agent/autodiscovery
[4]: /fr/agent/kubernetes/cluster/#cluster-checks-autodiscovery
[5]: /fr/agent/guide/agent-commands
[6]: /fr/agent/autodiscovery/?tab=kubernetes#template-source-kubernetes-pod-annotations
[7]: /fr/agent/autodiscovery/?tab=kubernetes#supported-template-variables
[8]: /fr/integrations/http_check
[9]: /fr/integrations/nginx
[10]: /fr/agent/autodiscovery/clusterchecks/#troubleshooting