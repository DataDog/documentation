---
aliases:
- /fr/agent/autodiscovery/endpointchecks
- /fr/agent/autodiscovery/endpointschecks
- /fr/agent/cluster_agent/endpointschecks
further_reading:
- link: /agent/kubernetes/cluster/
  tag: Documentation
  text: Agent de cluster
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentation
  text: Checks de cluster
- link: /containers/cluster_agent/troubleshooting#checks-d-endpoint
  tag: Documentation
  text: Dépannage des checks d'endpoint
title: Checks d'endpoint avec Autodiscovery
---

## Présentation

La fonction de check de cluster permet de [découvrir automatiquement][1] des services de cluster à charge équilibrée (p. ex., les services Kubernetes) et d'effectuer des checks sur ces derniers. Les _checks d'endpoint_ reposent sur le même principe et permettent de surveiller chaque endpoint géré par un service Kubernetes.

L'[Agent de cluster][2] commence par identifier les configurations des checks d'endpoint en fonction des annotations d'[Autodiscovery][1] sur les services Kubernetes. Il distribue ensuite ces configurations aux Agents basés sur les nœuds pour les exécuter individuellement. Les checks d'endpoint sont distribués aux Agents qui s'exécutent sur le même nœud que le ou les pods qui exposent les endpoints du service Kubernetes surveillé. Grâce à cette approche, l'Agent peut ajouter les tags de pod et de conteneur qu'il a déjà recueillis pour chaque pod concerné.

Les Agents se connectent à l'Agent de cluster toutes les 10 secondes et récupèrent les configurations de check à exécuter. Les métriques provenant des checks d'endpoint sont envoyées avec des tags de service, des [tags Kubernetes][3], des tags de host et le tag `kube_endpoint_ip` basé sur l'adresse IP évaluée.

**Contrôle de versions**:
Cette fonctionnalité est prise en charge par Kubernetes pour les versions 6.12.0 et ultérieures de l'Agent Datadog et les versions 1.3.0 et ultérieures de l'Agent de cluster Datadog. À partir de la version 1.4.0 de l'Agent de cluster, ce dernier convertit chaque check d'endpoint d'un endpoint non exposé par un pod en un check de cluster classique. Activez la fonction de [check de cluster][4] (en plus de la fonction de check d'endpoint) pour tirer partir de cette fonctionnalité.

**Remarque** : si les pods soutenant votre service sont statiques, vous devez ajouter l'annotation `ad.datadoghq.com/endpoints.resolve`. L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint, et les distribue aux [exécuteurs de checks de cluster][5]. Consultez [cet exemple][6] pour découvrir comment utiliser l'annotation avec le serveur de l'API Kubernetes.

### Exemple : service avec des endpoints
Dans l'exemple ci-dessous, un déploiement Kubernetes pour NGINC a été créé avec trois pods.

```shell
kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

Un service a également été créé. Il se connecte aux pods via ces trois endpoints.

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

Alors qu'un check de cluster basé sur un service teste l'adresse IP unique du service, les checks d'endpoint sont programmés pour **chacun** des trois endpoints associés à ce service.

Les checks d'endpoint ont été conçus pour être distribués aux Agents qui s'exécutent sur le même nœud que les pods qui exposent les endpoints de ce service `nginx`. Dans cet exemple, les Agents exécutés sur les nœuds `gke-cluster-default-pool-4658d5d4-k2sn` et `gke-cluster-default-pool-4658d5d4-p39c` exécutent les checks sur ces pods `nginx`.

## Configurer la distribution des checks d'endpoint

{{< tabs >}}
{{% tab "Operator" %}}

Pour activer la distribution des checks de d'endpoint dans le déploiement de l'Operator de l'Agent de cluster, utilisez la clé de configuration `features.clusterChecks.enabled` :
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

Cette configuration permet à l'Agent de cluster de distribuer les checks de cluster et les checks d'endpoint aux Agents.

{{% /tab %}}
{{% tab "Helm" %}}

La distribution des checks d'endpoint est activée par défaut dans le déploiement Helm de l'Agent de cluster, via la clé de configuration `datadog.clusterChecks.enabled` :
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

Cette configuration permet à l'Agent de cluster de distribuer les checks de cluster et les checks d'endpoint aux Agents.

{{% /tab %}}

{{% tab "DaemonSet" %}}
### Configuration de l'Agent de cluster

Activez le fournisseur de configuration et le service d'écoute `kube_endpoints` dans l'Agent de cluster Datadog en définissant les variables d'environnement `DD_EXTRA_CONFIG_PROVIDERS` et `DD_EXTRA_LISTENERS` :

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**Remarque** : si les endpoints surveillés ne sont pas exposés par des pods, vous devez [activer les checks de cluster][1]. Pour ce faire, ajoutez le fournisseur de configuration et le service d'écoute `kube_services` :

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Redémarrez l'Agent][2] pour prendre en compte le changement de configuration.

### Configuration de l'Agent

Activez les fournisseurs de configuration `endpointschecks` dans l'Agent de nœud. Pour ce faire, deux solutions s'offrent à vous :

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

**Remarque** : si les endpoints surveillés ne sont pas exposés par des pods, vous devez [activer les checks de cluster][1]. Pour ce faire, ajoutez le fournisseur de configuration `clusterchecks` :

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Redémarrez l'Agent][2] pour prendre en compte le changement de configuration.

[1]: /fr/agent/cluster_agent/clusterchecks/
[2]: /fr/agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## Configuration des checks

### Configuration à partir de fichiers de configuration statiques

À partir de la version 1.18.0 de l'Agent de cluster, vous pouvez utiliser le paramètre `advanced_ad_identifiers` et les [template variables Autodiscovery][7] dans votre configuration de check pour cibler les endpoints Kubernetes ([voir cet exemple][8]).

#### Exemple : check HTTP sur des endpoints Kubernetes

Pour exécuter un [check HTTP][9] sur les endpoints d'un service Kubernetes, procédez comme suit :

{{< tabs >}}
{{% tab "Helm" %}}
Utilisez le champ `clusterAgent.confd` pour définir votre configuration de check :

```yaml
#(...)
clusterAgent:
  confd:
    <NOM_INTÉGRATION>.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "<NOM_ENDPOINTS>"
            namespace: "<ESPACENOMMAGE_ENDPOINTS>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<NOM_EXAMPLE>"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Montez un fichier `/conf.d/http_check.yaml` avec le contenu suivant dans le conteneur de l'Agent de cluster :

```yaml
advanced_ad_identifiers:
  - kube_endpoints:
      name: "<NOM_ENDPOINTS>"
      namespace: "<ESPACENOMMAGE_ENDPOINTS>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<NOM_EXEMPLE>"
```

{{% /tab %}}
{{< /tabs >}}

### Configuration à partir d'annotations de service Kubernetes

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Remarque :** les annotations AD v2 ont été ajoutées dans l'Agent Datadog 7.36 afin de simplifier la configuration de l'intégration. Pour les versions précédentes de l'Agent Datadog, utilisez les annotations AD v1.

La syntaxe des services annotés est similaire à celle des [pods Kubernetes annotés][1] :

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "<NOM_INTÉGRATION>": {
      "init_config": <CONFIG_INIT>,
      "instances": [<CONFIG_INSTANCE>]
    }
  }
ad.datadoghq.com/endpoints.logs: '[<CONFIG_LOGS>]'
```

Cette syntaxe prend en charge la [template variable][11] `%%host%%`, qui est remplacée par l'IP de chaque endpoint. Les tags `kube_namespace`, `kube_service` et `kube_endpoint_ip` sont automatiquement ajoutés aux instances.

**Remarque** : la configuration des logs des endpoints personnalisés est prise en charge lors de la collecte des logs du socket Docker, et non lors de celle des fichiers de log Kubernetes.

#### Exemple : check HTTP sur un service basé sur NGINX avec un check NGINX sur les endpoints du service

Ce service est associé aux pods du déploiement `nginx` et utilise cette configuration :

- Un check d'endpoint basé sur [`nginx`][12] est distribué pour chaque pod NGINX exposant ce service. Ce check est exécuté par les Agents se trouvant sur les mêmes nœuds respectifs que les pods NGINX (en utilisant l'adresse IP du pod avec `%%host%%`).
- Un check de cluster basé sur [`http_check`][9] est distribué à un seul Agent du cluster. Ce check utilise l'IP du service avec `%%host%%`, ce qui permet de répartir automatiquement la charge sur les endpoints concernés.
- Les checks sont distribués avec les tags `env:prod`, `service:my-nginx` et `version:1.19.0`, qui correspondent aux étiquettes du [tagging de service unifié][13].

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

[1]: /fr/containers/kubernetes/integrations/?tab=kubernetesadv2
[9]: /fr/integrations/http_check/
[11]: /fr/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /fr/integrations/nginx/
[13]: /fr/getting_started/tagging/unified_service_tagging

{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

La syntaxe des services annotés est similaire à celle des [pods Kubernetes annotés][10] :

```yaml
ad.datadoghq.com/endpoints.check_names: '[<NOM_INTÉGRATION>]'
ad.datadoghq.com/endpoints.init_configs: '[<CONFIG_INIT>]'
ad.datadoghq.com/endpoints.instances: '[<CONFIG_INSTANCE>]'
ad.datadoghq.com/endpoints.logs: '[<CONFIG_LOGS>]'
```

Cette syntaxe prend en charge la [template variable][11] `%%host%%`, qui est remplacée par l'IP de chaque endpoint. Les tags `kube_namespace`, `kube_service` et `kube_endpoint_ip` sont automatiquement ajoutés aux instances.

**Remarque** : la configuration des logs des endpoints personnalisés est prise en charge lors de la collecte des logs du socket Docker, et non lors de celle des fichiers de log Kubernetes.

#### Exemple : check HTTP sur un service basé sur NGINX avec un check NGINX sur les endpoints du service

Ce service est associé aux pods du déploiement `nginx` et utilise cette configuration :

- Un check d'endpoint basé sur [`nginx`][12] est distribué pour chaque pod NGINX exposant ce service. Ce check est exécuté par les Agents se trouvant sur les mêmes nœuds respectifs que les pods NGINX (en utilisant l'adresse IP du pod avec `%%host%%`).
- Un check de cluster basé sur [`http_check`][9] est distribué à un seul Agent du cluster. Ce check utilise l'IP du service avec `%%host%%`, ce qui permet de répartir automatiquement la charge sur les endpoints concernés.
- Les checks sont distribués avec les tags `env:prod`, `service:my-nginx` et `version:1.19.0`, qui correspondent aux étiquettes du [tagging de service unifié][13].

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

[9]: /fr/integrations/http_check/
[10]: /fr/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /fr/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /fr/integrations/nginx/
[13]: /fr/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/kubernetes/integrations/?tab=kubernetesadv2
[2]: /fr/agent/cluster_agent
[3]: /fr/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[4]: /fr/agent/cluster_agent/clusterchecks/
[5]: /fr/containers/guide/clustercheckrunners
[6]: /fr/containers/kubernetes/control_plane/?tab=helm#api-server-2
[7]: /fr/agent/guide/template_variables/
[8]: /fr/agent/cluster_agent/endpointschecks/#example-http_check-on-kubernetes-endpoints
[9]: /fr/integrations/http_check/
[10]: /fr/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /fr/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /fr/integrations/nginx/
[13]: /fr/getting_started/tagging/unified_service_tagging