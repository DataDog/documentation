---
title: Exécuter des checks d'endpoint avec Autodiscovery
kind: documentation
aliases:
  - /fr/agent/autodiscovery/endpointchecks
  - /fr/agent/autodiscovery/endpointschecks
further_reading:
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Documentation sur les checks de cluster
  - link: /agent/kubernetes/cluster/
    tag: Documentation
    text: Documentation sur l'Agent de cluster
---
## Fonctionnement

La fonction Check de cluster permet de découvrir automatiquement des services de cluster à charge équilibrée (p. ex., les services Kubernetes) et d'effectuer des checks sur ces derniers.

La fonction Checks d'endpoint repose sur le même principe et permet de surveiller l'ensemble des endpoints derrière des services de cluster.

L'[Agent de cluster][1] conserve les configurations et les expose aux Agents de nœud afin qu'ils puissent les lire et les convertir en checks d'endpoint.

Les checks d'endpoint sont planifiés par des Agents qui s'exécutent sur le même nœud que le ou les pods qui exposent le ou les endpoints du service surveillé.

Les Agents se connectent à l'Agent de cluster toutes les 10 secondes et récupèrent les configurations de check à exécuter. Les métriques provenant des checks d'endpoint seront envoyées avec des tags de service, de pod et de host.

Cette fonction est prise en charge par Kubernetes pour les versions 6.12.0 et ultérieures de l'Agent et les versions 1.3.0 et ultérieures de l'Agent de cluster.

À partir de la version 1.4.0 de l'Agent de cluster, chaque check pour un endpoint non exposé par un pod est converti en check de cluster classique. Pour tirer parti de cette fonctionnalité, assurez-vous d'activer les [checks de cluster][2] ainsi que les checks d'endpoint.

#### Exemple : trois pods NGINX exposés par le service `nginx`

```shell
# kubectl get svc nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
# kubectl get pods --selector app=nginx
NAME                     READY   STATUS    RESTARTS   AGE
nginx-758655469f-59q9z   1/1     Running   0          20h
nginx-758655469f-k8zrc   1/1     Running   0          20h
nginx-758655469f-lk9p6   1/1     Running   0          20h
```

```shell
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

De par leur nature, les checks d'endpoint sont planifiés par des Agents qui s'exécutent sur le même nœud que les pods qui exposent les endpoints du service `nginx`. Ainsi, seuls les Agents s'exécutant sur les nœuds `gke-cluster-default-pool-4658d5d4-k2sn` et `gke-cluster-default-pool-4658d5d4-p39c` planifient les checks sur les pods `nginx`.

Ce fonctionnement permet d'exploiter [Autodiscovery][3] et de joindre des tags de pod et de conteneur aux métriques envoyées par ces pods.

## Configuration

### Configuration de l'Agent de cluster

Activez le fournisseur de configuration et le service d'écoute `kube_endpoints` dans l'Agent de **cluster** Datadog. Pour ce faire, définissez les variables d'environnement `DD_EXTRA_CONFIG_PROVIDERS` et `DD_EXTRA_LISTENERS` :

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**Remarque** : si les endpoints surveillés ne sont pas exposés par des pods, vous devez [activer les checks de cluster][4]. Pour ce faire, ajoutez le fournisseur de configuration et le service d'écoute `kube_services` :

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Redémarrez l'Agent][5] pour prendre en compte le changement de configuration.

### Configuration de l'Agent

Activez les fournisseurs de configuration `endpointschecks` dans l'Agent **de nœud** Datadog. Pour ce faire, deux solutions s'offrent à vous :

- Vous pouvez définir la variable d'environnement `DD_EXTRA_CONFIG_PROVIDERS`. Si plusieurs valeurs doivent être définies, séparez-les par des espaces dans la chaîne :

    ```shell
    DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
    ```

- Vous pouvez également l'ajouter dans le fichier de configuration `datadog.yaml` :

    ```yaml
    config_providers:
        - name: endpointschecks
          polling: true
    ```

**Remarque** : si les endpoints surveillés ne sont pas exposés par des pods, vous devez [activer les checks de cluster][2]. Pour ce faire, ajoutez le fournisseur de configuration `clusterchecks` :

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Redémarrez l'Agent][5] pour prendre en compte le changement de configuration.

## Implémentation des configurations de check via les annotations de services Kubernetes

De même qu'avec [l'annotation de pods Kubernetes][6], les services peuvent être annotés avec la syntaxe suivante :

```yaml
ad.datadoghq.com/endpoints.check_names: '[<NOM_INTÉGRATION>]'
ad.datadoghq.com/endpoints.init_configs: '[<CONFIG_INIT>]'
ad.datadoghq.com/endpoints.instances: '[<CONFIG_INSTANCE>]'
ad.datadoghq.com/endpoints.logs: '[<CONFIG_LOGS>]'
```

La [template variable][7] `%%host%%` est prise en charge et remplacée par les IP des endpoints. Les tags `kube_namespace`, `kube_service` et `kube_endpoint_ip` sont automatiquement ajoutés aux instances.

### Source du modèle : Étiquettes standard

```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

Les étiquettes `tags.datadoghq.com` définissent  `env`, `service` et même `version` en tant que tags sur les données générées par le check.
Ces étiquettes standard font partie du [tagging de service unifié][8].

#### Exemple : check HTTP sur un service basé sur NGINX avec le check NGINX sur les endpoints du service

La définition de service suivante expose les pods d'un déploiement `my-nginx`. Elle exécute ensuite un [check HTTP][9] afin de mesurer la latence du service à charge équilibrée, ainsi qu'un [check NGINX][10] sur les pods qui exposent le ou les endpoints du service dans le but de recueillir des métriques `NGINX` et des checks de service au niveau des pods :

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
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
        ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

## Dépannage

Le dépannage de checks d'endpoint est semblable au [dépannage de checks de cluster][11]. La seule différence se situe au niveau des Agents de nœud. Pour ces Agents, les checks d'endpoint planifiés apparaissent à côté du check de cluster.

**Remarque** : les checks d'endpoint sont planifiés par des Agents qui s'exécutent sur le même nœud que le ou les pods qui exposent le ou les endpoints du service. Si un endpoint n'est pas exposé par un pod, l'Agent de cluster convertit le check en check de cluster. Le check de cluster peut être exécuté par n'importe quel Agent de nœud.

### Autodiscovery dans l'Agent de nœud

La commande `configcheck` de l'Agent devrait renvoyer l'instance, avec la source de `endpoints-checks` :

```shell
# kubectl exec <NOM_POD_AGENT_NŒUD> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:2f7fd6b090782d6b
name: My Nginx Endpoints
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

### Commande status de l'Agent

La commande `status` de l'Agent devrait indiquer que l'instance de check est en cours d'exécution et qu'elle envoie correctement des informations.

```shell
# kubectl exec <NOM_POD_AGENT_NŒUD> agent status
...
    nginx (3.4.0)
    -------------
      Instance ID: nginx:My Nginx Service Endpoints:2f7fd6b090782d6b [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Autodiscovery dans l'Agent de cluster

La commande `clusterchecks` de l'Agent devrait renvoyer l'instance, avec la source de `kubernetes-endpoints` :

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

[1]: /fr/agent/kubernetes/cluster/
[2]: /fr/agent/cluster_agent/clusterchecks/
[3]: /fr/agent/kubernetes/integrations/
[4]: /fr/agent/kubernetes/cluster/#cluster-checks-autodiscovery
[5]: /fr/agent/guide/agent-commands/
[6]: /fr/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[7]: /fr/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/integrations/http_check/
[10]: /fr/integrations/nginx/
[11]: /fr/agent/cluster_agent/troubleshooting/