---
title: Serveur de métriques custom
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: Blog
    text: Présentation de l'Agent de cluster Datadog
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: Blog
    text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique Datadog
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: /agent/kubernetes/daemonset_setup/
    tag: Documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: /agent/cluster_agent/troubleshooting/
    tag: Documentation
    text: Dépanner l'Agent de cluster Datadog
---
## Introduction

La fonction d'autoscaling de pods horizontaux a été introduite dans la [version 1.2 de Kubernetes][1] pour permettre aux utilisateurs de procéder à une mise à l'échelle automatique en fonction d'une métrique standard telle que `CPU`. Elle nécessite toutefois d'exécuter une ressource appelée `metrics-server` en même temps que votre application. Depuis la version 1.6 de Kubernetes, l'autoscaling peut être effectué en fonction d'une [métrique custom][2].
Les métriques custom sont définies par l'utilisateur et sont collectées à partir du cluster. Les métriques externes sont prises en charge depuis la version 1.10 de Kubernetes, permettant ainsi aux utilisateurs de réaliser l'autoscaling en fonction de n'importe quelle métrique extérieure au cluster et collectée par Datadog.

Contrairement au serveur de métriques, les fournisseurs de métriques externes et custom sont des ressources qui doivent être implémentées et enregistrées par l'utilisateur.

À partir de la version 1.0.0, le serveur de métriques custom inclus dans l'Agent de cluster Datadog implémente l'interface du fournisseur de métriques externes destinée aux métriques externes. Cette page de documentation vous expliquera comment configurer le serveur de métriques afin de procéder à l'autoscaling de votre charge de travail Kubernetes en fonction de vos métriques Datadog.

## Prérequis

1. Vous devez exécuter la version 1.10 (ou ultérieure) de Kubernetes afin de pouvoir enregistrer la ressource du fournisseur de métriques externes auprès du serveur API.
2. La couche d'agrégation doit être activée. Reportez-vous à la [documentation relative à la configuration de la couche d'agrégation de Kubernetes][3].

## Configurer le serveur de métriques externes de l'Agent de cluster

### Serveur de métriques custom

Pour activer le serveur de métriques custom, suivez les instructions relatives à la [configuration de l'Agent de cluster Datadog][4]. Toutefois, au moment de modifier le manifeste de déploiement de l'Agent de cluster Datadog à l'[Étape 3 : Créer l'Agent de cluster et son service][5], suivez ces étapes supplémentaires :

1. Définissez `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` sur `true` dans le déploiement de l'Agent de cluster Datadog.
2. Configurez la `<CLÉ_APP_DD>` ainsi que la `<CLÉ_API_DD>` dans le déploiement de l'Agent de cluster Datadog à l'aide des [clés d'API et d'application de votre compte Datadog][6].
3. Définissez `DATADOG_HOST` sur `https://{{< region-param key="dd_full_site" >}}` (valeur par défaut : `https://app.datadoghq.com`).

### Enregistrer le fournisseur de métriques externes

Une fois l'Agent de cluster Datadog opérationnel :

1. Créez le service `datadog-custom-metrics-server` en exposant le port `443` à l'aide du manifeste `custom-metric-server.yaml` suivant :

    ```yaml
      kind: Service
      apiVersion: v1
      metadata:
        name: datadog-custom-metrics-server
      spec:
        selector:
          app: datadog-cluster-agent
        ports:
        - protocol: TCP
          port: 443
          targetPort: 443
    ```

    Appliquez cette modification en exécutant `kubectl apply -f custom-metric-server.yaml`

2. Téléchargez le [fichier des règles RBAC `rbac-hpa.yaml`][7].
3. Enregistrez l'Agent de cluster Datadog en tant que fournisseur de métriques externes via le service, en exposant le port `443`. Pour ce faire, appliquez les règles RBAC mentionnées ci-dessus :
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

## Lancer l'Autoscaler de pods horizontaux

Une fois l'Agent de cluster Datadog lancé et le service enregistré, créez un manifeste pour [l'Autoscaler de pods horizontaux][8] et spécifiez `type: External` pour vos métriques. L'Agent de cluster Datadog commencera alors à récupérer les métriques auprès de Datadog :

```yaml
spec:
  metrics:
    - type: External
      external:
      metricName: "<NOM_MÉTRIQUE>"
      metricSelector:
        matchLabels:
          <CLÉ_TAG>: <VALEUR_TAG>
```

**Exemple **: le manifeste d'Autoscaler de pods horizontaux ci-dessous permet de procéder à l'autoscaling d'un déploiement NGINX en fonction de la métrique `nginx.net.request_per_s` de Datadog.

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: nginx.net.request_per_s
      metricSelector:
        matchLabels:
            kube_container_name: nginx
      targetAverageValue: 9
```

Notez que dans ce manifeste :

- L'Autoscaler de pods horizontaux est configuré de façon à effectuer l'autoscaling du déploiement `nginx`.
- Le nombre maximum de réplicas créés est de `3`, et le minimum est de `1`.
- La métrique utilisée est `nginx.net.request_per_s` et le contexte est `kube_container_name: nginx`. Ce format de métrique correspond à celui de Datadog.

Toutes les 30 secondes, Kubernetes interroge l'Agent de cluster Datadog pour obtenir la valeur de cette métrique et effectue l'autoscaling en fonction, si cela est nécessaire. Pour les cas d'utilisation avancés, il est possible de configurer plusieurs métriques dans le même Autoscaler de pods horizontaux, comme le décrit [la documentation sur l'autoscaling de pods horizontaux Kubernetes][9]. La plus grande des valeurs proposées est celle choisie.

**Remarque** : L'exécution de plusieurs Agents de cluster augmente l'utilisation de l'API. L'Agent de cluster Datadog effectue 120 appels par heure pour environ 45 objets d'Autoscaler de pods horizontaux dans Kubernetes. L'exécution de plus de 45 objets d'Autoscaler de pods horizontaux augmente le nombre d'appels lors de la récupération de métriques au sein d'une même organisation.

## Autoscaling avec des requêtes personnalisées à l'aide du CRD DataMetric (Agent de cluster >= v1.7.0)

Procédez à un autoscaling en fonction d'une requête Datadog en utilisant le CRD `DatadogMetric` et l'Agent de cluster Datadog >= 1.7.0.

### Exigences relatives aux requêtes personnalisées

Pour que l'autoscaling fonctionne correctement, la requête doit respecter les règles suivantes :

- La requête **doit** être correcte d'un point de vue syntaxique, sous peine qu'**AUCUNE** métrique utilisée dans le cadre de l'autoscaling ne puisse être actualisée (l'autoscaling sera alors complètement interrompu).
- Le résultat de la requête **doit** renvoyer au moins une série (dans le cas contraire, les résultats seront considérés comme non valides).
- La requête **doit** renvoyer au moins deux points horodatés (il est possible d'utiliser une requête renvoyant un seul point, mais l'autoscaling risque alors d'utiliser des points incomplets).

**Remarque** : bien que la requête soit arbitraire, les heures de début et de fin sont toujours définies sur `Now() - 5 minutes` et `Now()`

### Configurer l'Agent de cluster Datadog pour l'utiliser avec DatadogMetric

Pour tirer parti du CRD `DatadogMetric`, suivez les étapes ci-dessous :

1. Installez le CRD `DatadogMetric` dans votre cluster.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Mettez à jour le manifeste RBAC de l'Agent de cluster Datadog. La mise à jour permet d'utiliser le CRD `DatadogMetric`.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Définissez la variable `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` sur `true` dans le déploiement de l'Agent de cluster Datadog.

### Configurer un Autoscaler de pods horizontaux pour utiliser un objet DatadogMetric

Une fois l'étape de configuration terminée, vous pouvez commencer à créer des ressources `DatadogMetric`. `DatadogMetric` est une ressource qui se trouve dans un espace de nommage. Bien que n'importe quel Autoscaler de pods horizontaux puisse appeler une ressource `DatadogMetric`, nous vous conseillons de créer ces ressources dans le même espace de nommage que votre Autoscaler de pods horizontaux.

**Remarque** : plusieurs Autoscalers de pods horizontaux peuvent utiliser une même ressource `DatadogMetric`.

Vous pouvez créer un objet `DatadogMetric` à l'aide du manifeste suivant :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <nom_métrique_datadog>
spec:
  query: <votre_requête_personnalisée>
```

**Exemple** : un objet `DatadogMetric` pour procéder à l'autoscaling d'un déploiement NGINX en fonction de la métrique Datadog `nginx.net.request_per_s` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

Une fois votre objet `DatadogMetric` créé, vous devez configurer votre Autoscaler de pods horizontaux de façon à ce qu'il utilise cet objet `DatadogMetric` :

```yaml
spec:
  metrics:
    - type: External
      external:
        metricName: "datadogmetric@<espace_de_nommage>:<nom_métrique_datadog>"
```

**Exemple** : un Autoscaler de pods horizontaux utilisant l'objet `DatadogMetric` nommé `nginx-requests`, en partant du principe que les deux objets se trouvent dans l'espace de nommage `nginx-demo` :

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: datadogmetric@nginx-demo:nginx-requests
      targetAverageValue: 9
```

Une fois votre Autoscaler de pods horizontaux associé à un objet `DatadogMetric`, l'Agent de cluster Datadog utilisera votre requête personnalisée pour transmettre des valeurs à votre Autoscaler de pods horizontaux.

### Migration automatique des Autoscalers de pods horizontaux existants au moyen de métriques externes

Si vous définissez la variable `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` sur `true`, mais possédez encore des Autoscalers de pods horizontaux qui ne font **pas** appel à un objet `DatadogMetric`, la syntaxe normale (sans appeler un objet `DatadogMetric` via `datadogmetric@...`) est encore prise en charge.

L'Agent de cluster Datadog s'adapte en créant automatiquement des ressources `DatadogMetric` dans son propre espace de nommage (leur nom commence par `dcaautogen-`) afin de permettre une transition en douceur vers `DatadogMetric`.

Si vous choisissez de migrer un Autoscaler de pods horizontaux ultérieurement pour appeler un objet `DatadogMetric`, la ressource créée automatiquement sera nettoyée par l'Agent de cluster Datadog quelques heures plus tard.

### Dépannage

L'Agent de cluster Datadog se charge de mettre à jour la sous-ressource `status` de toutes les ressources `DatadogMetric` afin de refléter les résultats des requêtes envoyées à Datadog. Ces informations sont à examiner en priorité afin de comprendre ce qui se passe en cas de dysfonctionnement.

**Exemple** : partie `status` d'une ressource `DatadogMetric` :

```yaml
status:
  conditions:
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Active
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Valid
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Updated
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "False"
    type: Error
  currentValue: "1977.2"
```

Les quatre conditions vous permettent d'en savoir plus sur l'état actuel de votre ressource `DatadogMetric` :

- `Active` : Datadog considère une ressource `DatadogMetric` comme active si au moins un Autoscaler y fait appel. Les ressources `DatadogMetrics` inactives ne seront pas mises à jour pour limiter l'utilisation de l'API.
- `Valid` : Datadog considère une ressource `DatadogMetric` comme valide si la réponse à la requête associée est valide. Un statut non valide indique probablement que votre requête personnalisée n'est pas correcte sur le plan sémantique. Consultez le champ `Error` pour en savoir plus.
- `Updated` : cette condition est **systématiquement** mise à jour lorsque l'Agent de cluster Datadog modifie une `DatadogMetric`.
- `Error` : si le traitement de cette ressource `DatadogMetric` entraîne une erreur, cette condition affichera la valeur true et contiendra les détails de l'erreur.

`currentValue` correspond à la valeur récupérée depuis Datadog, et est donc celle renvoyée aux Autoscalers de pods horizontaux.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /fr/agent/cluster_agent/setup/
[5]: /fr/agent/cluster_agent/setup/#step-3-create-the-cluster-agent-and-its-service
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[9]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics