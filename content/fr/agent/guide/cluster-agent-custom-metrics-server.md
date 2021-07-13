---
title: Serveur de métriques custom pour l'Agent de cluster
kind: guide
further_reading:
  - link: /agent/kubernetes/cluster/
    tag: Documentation
    text: Agent de cluster Datadog
---
## Introduction

La version 1.2 de Kubernetes a introduit la fonction d'[autoscaling des pods horizontaux][1]. Depuis la version 1.6 de Kubernetes, l'autoscaling peut être effectué en fonction de métriques custom définies par l'utilisateur et collectées au sein du cluster. La version 1.10 de Kubernetes a introduit la prise en charge des métriques externes, permettant ainsi de réaliser l'autoscaling en fonction de n'importe quelle métrique extérieure au cluster et collectée par Datadog. Contrairement au serveur de métriques, les fournisseurs de métriques externes et custom sont des ressources qui doivent être implémentées et enregistrées par l'utilisateur. À partir de la version 1.0.0, le serveur de métriques custom inclus dans [l'Agent de cluster Datadog][2] implémente l'interface du fournisseur de métriques externes.

Ce guide explique comment configurer et activer l'autoscaling de votre charge de travail Kubernetes en fonction de vos métriques Datadog.

## Prérequis

1. Vous devez exécuter la version 1.10 (ou ultérieure) de Kubernetes afin de pouvoir enregistrer la ressource du fournisseur de métriques externes auprès du serveur API.
2. La couche d'agrégation doit être activée. Reportez-vous à la [documentation relative à la configuration de la couche d'agrégation de Kubernetes][3] pour découvrir comment l'activer.

## Procédure

### Remarque préalable

Il n'est pas nécessaire d'exécuter l'Agent de nœud pour activer l'autoscaling en fonction de métriques externes : il suffit que les métriques soient disponibles sur votre compte Datadog. Néanmoins, ce guide décrit l'autoscaling d'un déploiement NGINX en fonction de métriques NGINX collectées par un Agent de nœud.

On considère le scénario suivant :

1. Vous exécutez des Agents de nœud (idéalement à partir d'un DaemonSet) et le processus [Autodiscovery][4] est activé et fonctionnel.
2. [Facultatif] Configurez vos Agents de façon à ce qu'ils communiquent de façon sécurisée avec l'Agent de cluster Datadog afin d'enrichir les métadonnées collectées par les Agents de nœud. Pour en savoir plus, consultez la [section relative à la sécurité][5].

### Lancer l'Agent de cluster Datadog

Pour lancer [l'Agent de cluster Datadog][6], effectuez les étapes suivantes :

1. Créez les règles RBAC appropriées. L'Agent de cluster Datadog agit en tant que proxy entre le serveur API et l'Agent de nœud : il doit par conséquent avoir accès à certaines ressources au niveau du cluster.

    `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-rbac.yaml"`

    On obtient alors le résultat suivant :

    ```
    clusterrole.rbac.authorization.k8s.io "datadog-cluster-agent" created
    clusterrolebinding.rbac.authorization.k8s.io "datadog-cluster-agent" created
    serviceaccount "datadog-cluster-agent" created
    ```

2. Créez l'Agent de cluster Datadog et ses services. Ajoutez votre `<CLÉ_API>` et votre `<CLÉ_APP>` dans le manifeste de déploiement de l'Agent de cluster Datadog.

3. Activez le processing de l'Autoscaler de pods horizontaux en configurant la variable `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` sur `true`.

4. Lancez les ressources :
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml"`
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/cluster-agent-hpa-svc.yaml"`
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml"`

**Remarque** : le premier service est utilisé pour la communication entre les Agents de nœud et l'Agent de cluster Datadog, mais le second est utilisé par Kubernetes pour enregistrer le fournisseur de métriques externes.

À ce stade, vous devriez voir ce qui suit :

```text
PODS:

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          28m

SVCS:

NAMESPACE     NAME                            TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)         AGE
default       datadog-custom-metrics-server   ClusterIP   192.168.254.87    <none>        443/TCP         28m
default       datadog-cluster-agent           ClusterIP   192.168.254.197   <none>        5005/TCP        28m

```

### Fournisseur de métriques externes

Une fois l'Agent de cluster Datadog opérationnel, enregistrez-le en tant que fournisseur de métriques externes via le service, en exposant le port `443`. Pour ce faire, appliquez les règles RBAC suivantes :

`kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml"`

On obtient alors le résultat suivant :

```text
clusterrolebinding.rbac.authorization.k8s.io "system:auth-delegator" created
rolebinding.rbac.authorization.k8s.io "dca" created
apiservice.apiregistration.k8s.io "v1beta1.external.metrics.k8s.io" created
clusterrole.rbac.authorization.k8s.io "external-metrics-reader" created
clusterrolebinding.rbac.authorization.k8s.io "external-metrics-reader" created
```

Une fois l'Agent de cluster Datadog lancé et le service enregistré, créez un manifeste pour l'Autoscaler de pods horizontaux et laissez l'Agent de cluster Datadog extraire les métriques de Datadog.

## Lancer l'Autoscaler de pods horizontaux

À ce stade, vous devriez voir ce qui suit :

```text
PODS

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-agent-4c5pp                      1/1       Running   0          14m
default       datadog-agent-ww2da                      1/1       Running   0          14m
default       datadog-agent-2qqd3                      1/1       Running   0          14m
[...]
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          16m
```

À présent, créez un manifeste pour l'Autoscaler de pods horizontaux. Si vous regardez le [fichier hpa-manifest.yaml][7], vous verrez ce qui suit :

* L'Autoscaler de pods horizontaux est configuré de façon à effectuer l'autoscaling du déploiement `nginx`.
* Le nombre maximum de réplicas créés est de `5` et le minimum est de `1`.
* La métrique utilisée est `nginx.net.request_per_s` et le contexte est `kube_container_name: nginx`. Ce format de métrique correspond à celui de Datadog.

Toutes les 30 secondes, Kubernetes interroge l'Agent de cluster Datadog pour obtenir la valeur de cette métrique et effectue l'autoscaling en fonction, si cela est nécessaire.
Pour les cas d'utilisation avancés, il est possible de configurer plusieurs métriques dans le même Autoscaler de pods horizontaux, comme le décrit [la documentation sur l'autoscaling de pods horizontaux Kubernetes][8]. La plus grande des valeurs proposées est celle choisie.

1. Créez le déploiement NGINX :
  `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/nginx.yaml"`

2. Appliquez ensuite le manifeste de l'Autoscaler de pods horizontaux.
  `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/hpa-manifest.yaml"`

Votre pod NGINX devrait maintenant être exécuté avec le service correspondant :

```text
POD:

default       nginx-6757dd8769-5xzp2                   1/1       Running   0          3m

SVC:

NAMESPACE     NAME                  TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)         AGE
default       nginx                 ClusterIP   192.168.251.36    none          8090/TCP        3m

HPAS:

NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   0/9 (avg)       1         3         1        3m

```

### Tester la réponse à une montée en charge du service

Votre configuration est maintenant prête à être testée.
Kubernetes doit répondre à la montée en charge en effectuant l'autoscaling des pods NGINX.

Effectuez un cURL sur l'adresse IP du service NGINX, comme suit :

`curl <nginx_svc>:8090/nginx_status`

La réponse devrait ressembler à ce qui suit :

```shell
$ curl 192.168.254.216:8090/nginx_status

Active connections: 1
server accepts handled requests
 1 1 1
Reading: 0 Writing: 1 Waiting: 0
```

Le nombre de requêtes par seconde augmente dans le même temps. Cette métrique est collectée par l'Agent de nœud, en utilisant Autodiscovery pour détecter automatiquement le pod NGINX via ses annotations. Pour en savoir plus sur le fonctionnement d'Autodiscovery, consultez la [documentation sur Autodiscovery][9]. Votre test devrait entraîner une augmentation de l'activité de la métrique dans Datadog. Cette métrique étant définie dans le manifeste de l'Autoscaler de pods horizontaux, l'Agent de cluster Datadog récupère également sa dernière valeur de façon régulière. Ensuite, lorsque Kubernetes interroge l'Agent de cluster Datadog pour obtenir cette valeur, il constate que le nombre a dépassé le seuil et effectue l'autoscaling en conséquence.

Ainsi, exécutez la ligne suivante : `while true; do curl <nginx_svc>:8090/nginx_status; sleep 0.1; done`

Le nombre de requêtes par seconde devrait rapidement augmenter et dépasser 9, ce qui correspond au seuil d'autoscaling des pods NGINX.
Vous pouvez alors constater que de nouveaux pods NGINX sont en train d'être créés :

```text
PODS:

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          9m
default       nginx-6757dd8769-5xzp2                   1/1       Running   0          2m
default       nginx-6757dd8769-k6h6x                   1/1       Running   0          2m
default       nginx-6757dd8769-vzd5b                   1/1       Running   0          29m

HPAS:

NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   30/9 (avg)     1         3         3         29m

```

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: /fr/agent/cluster_agent/
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /fr/agent/kubernetes/integrations/
[5]: /fr/agent/cluster_agent/setup/
[6]: /fr/agent/kubernetes/cluster/
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/hpa-manifest.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[9]: /fr/agent/kubernetes/#template-source-kubernetes-pod-annotations