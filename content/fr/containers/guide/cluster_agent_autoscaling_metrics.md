---
aliases:
- /fr/agent/guide/cluster-agent-custom-metrics-server
- /fr/agent/cluster_agent/external_metrics
- /fr/containers/cluster_agent/external_metrics
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique
    Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentation
  text: Exécuter des checks de cluster avec Autodiscovery
- link: /agent/kubernetes/daemonset_setup/
  tag: Documentation
  text: Exécuter l'Agent avec un DaemonSet Kubernetes
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépanner l'Agent de cluster Datadog
title: Autoscaling avec les métriques externes et custom de l'Agent de cluster
---

## Présentation

L'autoscaling de pods horizontaux, une fonctionnalité lancée avec la [version 1.2 de Kubernetes][1], permet d'effectuer une mise à l'échelle automatique à partir de métriques de base, comme `CPU`. Cela nécessite toutefois l'utilisation de la ressource `metrics-server`, qui doit s'exécuter en parallèle de votre application. Depuis la version 1.6 de Kubernetes, il est désormais possible d'effectuer un autoscaling à partir de [métriques custom][2].

Les métriques custom sont définies par les utilisateurs et recueillies au sein du cluster. La version 1.10 a rendu possible l'autoscaling à partir de métriques externes en dehors du cluster (par exemple, les métriques recueillies par Datadog).

Vous devez commencer par inscrire l'Agent de cluster en tant que fournisseur de métriques externes. Modifiez ensuite vos Autoscalers de pods horizontaux afin qu'ils reposent sur les métriques fournies par l'Agent de cluster.

Depuis la version 1.0.0, le serveur de métriques custom de l'Agent de cluster Datadog implémente l'interface du fournisseur de métriques externes. Cette page décrit comment configurer cette fonctionnalité et comment effectuer l'autoscaling d'un workload Kubernetes en fonction de vos métriques Datadog.

## Configuration

### Prérequis

1. Kubernetes v1.10+ : vous devez inscrire la ressource du fournisseur de métriques externes auprès du serveur de l'API.
2. Activez la [couche d'agrégation][3] de Kubernetes.
3. Vous devez disposer d'une [clé d'API **et** d'une clé d'application Datadog][4] valides.

### Installation

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Pour activer le serveur de métriques externes pour votre Agent de cluster géré par l'Operator Datadog, commencez par [configurer l'Operator Datadog][1]. Fournissez ensuite une clé d'API et une clé d'application Datadog valides, puis définissez `features.externalMetricsServer.enabled` sur `true` dans la ressource personnalisée `DatadogAgent` :

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <CLÉ_API_DATADOG>
        appKey: <CLÉ_APPLICATION_DATADOG>

    features:
      externalMetricsServer:
        enabled: true
  ```

L'Operator met automatiquement à jour les configurations RBAC nécessaires et configure également le `Service` et le `APIService` correspondants afin que Kubernetes puisse les utiliser.

Pour définir les clés, il est également possible de faire référence aux noms de `Secrets` créés au préalable ainsi qu'aux clés de données stockant vos clés d'API et d'application Datadog.
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiSecret:
          secretName: <NOM_SECRET>
          keyName: <CLÉ_POUR_CLÉ_API_DATADOG>
        appSecret:
          secretName: <NOM_SECRET>
          keyName: <CLÉ_POUR_CLÉ_APPLICATION_DATADOG>

    features:
      externalMetricsServer:
        enabled: true
  ```

[1]: /fr/agent/guide/operator-advanced
{{% /tab %}}
{{% tab "Helm" %}}

Pour activer le serveur de métriques externes avec votre Agent de cluster dans Helm, modifiez votre fichier [datadog-values.yaml][1] en ajoutant la configuration suivante. Spécifiez une clé d'API et une clé d'application Datadog valides, puis définissez `clusterAgent.metricsProvider.enabled` sur `true`. Redéployez votre chart Helm Datadog :

  ```yaml
  datadog:
    apiKey: <CLÉ_API_DATADOG>
    appKey: <CLÉ_APPLICATION_DATADOG>
    #(...)

  clusterAgent:
    enabled: true
    # Activer le metricsProvider pour pouvoir effectuer un autoscaling en fonction des métriques Datadog
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # Définir sur true pour activer le fournisseur de métriques
      enabled: true
  ```

Cela met automatiquement à jour les configurations RBAC requises et configure le `Service` et l'`APIService` correspondants afin que Kubernetes puisse les utiliser.

Pour définir les clés, il est également possible de faire référence aux noms de `Secrets` créés au préalable qui contiennent les clés de données `api-key` et `app-key`, grâce aux options `datadog.apiKeyExistingSecret` et `datadog.appKeyExistingSecret`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}

{{% tab "Configuration manuelle (DaemonSet)" %}}

#### Serveur de métriques custom

Pour activer le serveur de métriques custom, commencez par suivre les instructions de [configuration de l'Agent de cluster Datadog][1] dans votre cluster. Après avoir vérifié que votre déploiement de base est fonctionnel, modifiez votre manifeste `Deployment` pour l'Agent de cluster Datadog en procédant comme suit :

1. Définissez la variable d'environnement `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` sur `true`.
2. Vérifiez que les **deux** variables d'environnement `DD_APP_KEY` et `DD_API_KEY` sont définies.
3. Vérifiez que la variable d'environnement `DD_SITE` est définie sur votre site Datadog : {{< region-param key="dd_site" code="true" >}}. Par défaut, cette variable est définie sur le site `US` : `datadoghq.com`.

#### Enregistrer le service du fournisseur de métriques externes

Dès lors que l'Agent de cluster Datadog est fonctionnel, appliquez des politiques RBAC supplémentaires, puis configurez le `Service` de façon à ce qu'il achemine les requêtes correspondantes.

1. Créez un `Service` intitulé `datadog-custom-metrics-server` en exposant le port `8443` à l'aide du manifeste `custom-metric-server.yaml` suivant :

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
        port: 8443
        targetPort: 8443
    ```
    **Remarque** : par défaut, l'Agent de cluster s'attend à recevoir ces requêtes via le port `8443`. Toutefois, si la variable d'environnement `DD_EXTERNAL_METRICS_PROVIDER_PORT` a été définie sur une autre valeur de port dans le `Deployment` de votre Agent de cluster, modifiez le `targetPort` de ce `Service` en conséquence.

    Appliquez ce `Service` en exécutant `kubectl apply -f custom-metric-server.yaml`.
2. Téléchargez le [fichier de règles RBAC `rbac-hpa.yaml`][2].
3. Enregistrez l'Agent de cluster en tant que fournisseur de métriques externes en appliquant ce fichier :
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

[1]: /fr/agent/cluster_agent/setup/?tab=daemonset
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
{{% /tab %}}
{{< /tabs >}}

Une fois activé, l'Agent de cluster est prêt à récupérer des métriques pour l'Autoscaler de pods horizontaux. Deux solutions s'offrent à vous :
- [Autoscaling avec des requêtes DatadogMetric](#autoscaling-avec-des-requetes-datadogmetric)
- [Autoscaling sans requête DatadogMetric](#autoscaling-sans-requete-datadogmetric)

Datadog vous conseille d'utiliser les requêtes `DatadogMetric`. Bien que cette approche nécessite une étape supplémentaire, pour le déploiement de la CustomResourceDefinition (CRD) `DatadogMetric`, elle vous permet d'interroger vos métriques avec une bien plus grande flexibilité. Si vous n'utilisez pas de requête `DatadogMetric`, vos Autoscalers de pods horizontaux reposent sur le format natif de métriques externes Kubernetes, que l'Agent de cluster convertit en requêtes de métrique Datadog.

Si vous effectuez une transmission multiple de vos métriques à plusieurs organisations Datadog, vous pouvez configurer l'Agent de cluster de sorte qu'il récupèrent les données à partir de ces différents endpoints, afin de garantir une disponibilité élevée. Pour en savoir plus, consultez la section [Transmission multiple][5].

## Autoscaling avec des requêtes DatadogMetric

Vous pouvez effectuer un autoscaling sur une requête Datadog en utilisant la [définition de ressource personnalisée (ou CRD)][6] `DatadogMetric` et les versions `1.7.0` ou ultérieures de l'Agent de cluster Datadog. Cette approche est plus flexible et vous permet d'effectuer l'autoscaling avec la même requête Datadog que celle que vous utiliseriez dans l'application.

### Prérequis

Pour que l'autoscaling fonctionne correctement, les requêtes personnalisées doivent respecter les règles suivantes :

- Les requêtes **doivent** être correctes d'un point de vue syntaxique, sous peine qu'**AUCUNE** métrique utilisée dans le cadre de l'autoscaling ne puisse être actualisée (l'autoscaling sera alors complètement interrompu).
- Le résultat des requêtes **doit** renvoyer au moins une série (dans le cas contraire, les résultats seront considérés comme non valides).
- Les requêtes **doivent** renvoyer au moins deux points horodatés différents de null (il est possible d'utiliser une requête renvoyant un seul point, mais l'autoscaling risque alors d'utiliser des points incomplets).

**Remarque** : bien que les requêtes soient arbitraires, les heures de début et de fin sont toujours définies, par défaut, sur `Now() - 5 minutes` et `Now()`.

### Configurer la CRD DatadogMetric

La définition de ressource personnalisée (CRD) pour l'objet `DatadogMetric` peut être ajoutée à votre cluster Kubernetes avec Helm, l'Operator Datadog ou un DaemonSet :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Pour activer l'utilisation de la CRD `DatadogMetric`, mettez à jour la ressource personnalisée `DatadogAgent` et définissez `features.externalMetricsServer.useDatadogMetrics` sur `true`.

  ```yaml
  kind: DatadogAgent
  apiVersion: datadoghq.com/v2alpha1
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <CLÉ_API_DATADOG>
        appKey: <CLÉ_APPLICATION_DATADOG>
    features:
      externalMetricsServer:
        enabled: true
        useDatadogMetrics: true
  ```

L'Operator met automatiquement à jour les configurations RBAC requises et indique à l'Agent de cluster qu'il doit gérer ces requêtes d'Autoscaler de pods horizontaux par l'intermédiaire de ces ressources `DatadogMetric`.

{{% /tab %}}
{{% tab "Helm" %}}

Pour activer l'utilisation de la CRD `DatadogMetric`, modifiez votre configuration Helm [values.yaml][1] en définissant `clusterAgent.metricsProvider.useDatadogMetrics` sur `true`. Redéployez ensuite votre chart Helm Datadog : 

  ```yaml
  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
      # clusterAgent.metricsProvider.useDatadogMetrics
      # Activer l'utilisation de la CRD DatadogMetric afin d'effectuer l'autoscaling sur des requêtes Datadog arbitraires
      useDatadogMetrics: true
  ```

**Remarque** : cette configuration vise à installer automatiquement la CRD `DatadogMetric`. Si cette CRD existait déjà avant l'installation initiale de Helm, cela peut engendrer un conflit.

Cette configuration entraîne la mise à jour automatique des fichiers RBAC requis et indique à l'Agent de cluster qu'il doit gérer ces requêtes d'Autoscaler de pods horizontaux par l'intermédiaire de ces ressources `DatadogMetric`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Configuration manuelle (DaemonSet)" %}}
Pour activer l'utilisation de la CRD `DatadogMetric`, suivez les étapes supplémentaires ci-dessous :

1. Installez la CRD `DatadogMetric` dans votre cluster.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Mettez à jour le manifeste RBAC de l'Agent de cluster Datadog. La mise à jour permet d'utiliser la CRD `DatadogMetric`.

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Définissez la variable `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` sur `true` dans le déploiement de l'Agent de cluster Datadog.
{{% /tab %}}
{{< /tabs >}}

### Créer l'objet DatadogMetric
Une fois la ressource personnalisée `DatadogMetric` ajoutée à votre cluster, vous pouvez créer des objets `DatadogMetric` afin que vos Autoscalers de pods horizontaux puissent s'y référer. Bien que n'importe quel Autoscaler de pods horizontaux puisse se référer à n'importe quelle ressource `DatadogMetric`, Datadog vous conseille de créer ces objets dans le même espace de nommage que vos Autoscalers.

**Remarque** : plusieurs Autoscalers de pods horizontaux peuvent utiliser une même ressource `DatadogMetric`.

Vous pouvez créer un objet `DatadogMetric` à l'aide du manifeste suivant :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <NOM_MÉTRIQUE_DATADOG>
spec:
  query: <REQUÊTE_PERSONNALISÉE>
```

#### Exemple d'objet DatadogMetric
Prenons l'exemple d'un objet `DatadogMetric` servant à procéder à l'autoscaling d'un déploiement NGINX en fonction de la métrique Datadog `nginx.net.request_per_s` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

### Utiliser DatadogMetric dans un Autoscaler de pods horizontaux
Une fois votre Agent de cluster configuré et la ressource `DatadogMetric` créée, mettez à jour votre Autoscaler de pods horizontaux afin de faire référence à la ressource `DatadogMetric` avec son espace de nommage et son nom. Le format standard permet de spécifier la métrique pour l'Autoscaler de pods horizontaux en tant que `type: External` et de fournir le nom de la métrique en respectant le format `datadogmetric@<ESPACE_NOMMAGE>:<NOM_MÉTRIQUE_DATADOG>`.

#### Exemple d'Autoscalers de pods horizontaux avec DatadogMetric
L'Autoscaler de pods horizontaux ci-dessous utilise l'objet `DatadogMetric` intitulé `nginx-requests`, en partant du principe que les deux objets se trouvent dans l'espace de nommage `nginx-demo` :

Avec `apiVersion: autoscaling/v2` :

```yaml
apiVersion: autoscaling/v2
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
      metric:
        name: datadogmetric@nginx-demo:nginx-requests
      target:
        type: Value
        value: 9
```

Avec `apiVersion: autoscaling/v2beta1` :

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
      targetValue: 9
```

Dans ces manifestes :
- L'Autoscaler de pods horizontaux est configuré de façon à effectuer l'autoscaling du déploiement `nginx`.
- Le nombre maximum de réplicas créés est de `3`, et le minimum est de `1`.
- L'Autoscaler de pods horizontaux repose sur les `nginx-requests` de `DatadogMetric` dans l'espace de nommage `nginx-demo`.

Une fois la ressource `DatadogMetric` associée à un Autoscaler de pods horizontaux, l'Agent de cluster Datadog la considère comme active. L'Agent de cluster demande alors à Datadog la requête, stocke les résultats dans l'objet `DatadogMetric` et fournit les valeurs à l'Autoscaler de pods horizontaux.

## Autoscaling sans requête DatadogMetric
Si vous ne souhaitez pas effectuer l'autoscaling avec la ressource `DatadogMetric`, vous pouvez tout de même créer vos Autoscalers de pods horizontaux avec le format natif Kubernetes. L'Agent de cluster convertit le format de l'Autoscaler de pods horizontaux en une requête de métrique Datadog.

Une fois l'Agent de cluster Datadog fonctionnel et le service enregistré, créez un manifeste pour [l'Autoscaler de pods horizontaux][7] et spécifiez `type: External` pour vos métriques. Cela indique à l'Autoscaler qu'il doit récupérer les métriques auprès du service de l'Agent de cluster Datadog :

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

### Exemple d'Autoscalers de pods horizontaux sans DatadogMetric
Le manifeste d'Autoscaler de pods horizontaux ci-dessous permet de procéder à l'autoscaling d'un déploiement NGINX en fonction de la métrique `nginx.net.request_per_s` de Datadog à l'aide de `apiVersion: autoscaling/v2` :

```yaml
apiVersion: autoscaling/v2
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
      metric:
        name: nginx.net.request_per_s
      target:
        type: Value
        value: 9
```

L'exemple suivant reprend le manifeste ci-dessus, mais cette fois avec `apiVersion: autoscaling/v2beta1` :
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
      targetValue: 9
```

Dans ces manifestes :

- L'Autoscaler de pods horizontaux est configuré de façon à effectuer l'autoscaling du déploiement `nginx`.
- Le nombre maximum de réplicas créés est de `3`, et le minimum est de `1`.
- La métrique utilisée est `nginx.net.request_per_s` et le contexte est `kube_container_name: nginx`. Ce format correspond à celui des métriques de Datadog.

Toutes les 30 secondes, Kubernetes interroge l'Agent de cluster Datadog pour obtenir la valeur de cette métrique et effectue l'autoscaling en conséquence, si cela est nécessaire. Pour les cas d'utilisation avancés, il est possible de configurer plusieurs métriques dans le même Autoscaler de pods horizontaux. Comme le décrit [la documentation sur l'autoscaling de pods horizontaux Kubernetes][8], la plus grande des valeurs proposées est celle choisie.

### Migration

Les Autoscalers de pods horizontaux existants sont automatiquement migrés à l'aide de métriques externes.

Si vous définissez la variable `DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` sur `true`, mais disposez encore d'Autoscalers de pods horizontaux qui ne font **pas** appel à un objet `DatadogMetric`, la syntaxe normale (sans appeler un objet `DatadogMetric` via `datadogmetric@...`) est encore prise en charge.

L'Agent de cluster Datadog crée automatiquement des ressources `DatadogMetric` dans son propre espace de nommage (leur nom commence par `dcaautogen-`) afin de permettre une transition en douceur vers `DatadogMetric`.

Si vous choisissez de migrer un Autoscaler de pods horizontaux ultérieurement pour appeler un objet `DatadogMetric`, la ressource créée automatiquement sera nettoyée par l'Agent de cluster Datadog quelques heures plus tard.

## Interroger l'Agent de cluster
L'Agent de cluster transmet les requêtes pour les objets `DatadogMetric` toutes les 30 secondes. Il regroupe également les requêtes de métrique au sein de lots comprenant 35 requêtes. Ainsi, 35 requêtes `DatadogMetric` sont incluses dans une seule requête transmise à l'API de métriques Datadog.

Le regroupement de ces requêtes améliore leur efficacité et évite tout problème de limite de débit.

L'Agent de cluster envoie donc environ 120 requêtes d'API par heure pour 35 objets `DatadogMetric`. Si vous ajoutez des objets `DatadogMetric` ou déployez la fonction d'autoscaling sur d'autres clusters Kubernetes, cela augmente le nombre d'appels permettant de récupérer des métriques pour votre organisation.

L'Agent de cluster interroge également les données des cinq dernières minutes de ces requêtes de métrique. Cela permet de s'assurer que l'Agent de cluster se base sur des données *récentes* pour son scaling. Néanmoins, si vos requêtes de métrique reposent sur des données d'une intégration cloud (AWS, Azure, GCP, etc.), un [léger délai][9] s'applique à la récupération des données, ce qui fait que l'intervalle de cinq minutes n'est pas respecté. Si c'est le cas, fournissez les variables d'environnement suivantes à l'Agent de cluster afin d'augmenter la plage et l'intervalle des données autorisés pour les requêtes de métrique.

```yaml
- name: DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE
  value: "900"
- name: DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE
  value: "900"
```

## Dépannage

### Statut de DatadogMetric
L'Agent de cluster Datadog se charge de mettre à jour la sous-ressource `status` de toutes les ressources `DatadogMetric` afin de refléter les résultats des requêtes envoyées à Datadog. Ces informations sont à examiner en priorité afin de comprendre ce qui se passe en cas de dysfonctionnement. Vous pouvez exécuter la commande suivante pour récupérer ces informations générées pour vous :

```shell
kubectl describe datadogmetric <NOM_RESSOURCE>
```

#### Exemple

La section `status` d'une ressource `DatadogMetric` :

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

- `Active` : Datadog considère une ressource `DatadogMetric` comme active si au moins un Autoscaler y fait appel. Les ressources `DatadogMetrics` inactives ne seront pas mises à jour, dans le but de limiter l'utilisation de l'API.
- `Valid` : Datadog considère une ressource `DatadogMetric` comme valide si la réponse à la requête associée est valide. Un statut non valide indique probablement que votre requête personnalisée n'est pas correcte sur le plan sémantique. Consultez le champ `Error` pour en savoir plus.
- `Updated` : cette condition est **systématiquement** mise à jour lorsque l'Agent de cluster Datadog modifie une `DatadogMetric`.
- `Error` : si le traitement de cette ressource `DatadogMetric` entraîne une erreur, cette condition prend pour valeur true et contient les détails de l'erreur.

`currentValue` correspond à la valeur récupérée depuis Datadog. Elle est renvoyée aux Autoscalers de pods horizontaux.

### Différence entre les types Value et AverageValue pour la métrique cible
Les Autoscalers de pods horizontaux utilisés dans les exemples ci-dessus reposent sur le type de cible `Value`, et non `AverageValue`. Ces deux types sont acceptés. Modifiez vos requêtes de métrique Datadog en fonction du type choisi.

Lorsque vous utilisez le type `Value`, l'Autoscaler prend une décision basée sur la valeur de la métrique renvoyée telle quelle par la requête de métrique Datadog. Avec `AverageValue`, la valeur de métrique renvoyée est divisée par le nombre actuel de pods. Définissez donc votre `<VALEUR_MÉTRIQUE>` en fonction du comportement à adopter vis-à-vis de la requête et de la valeur renvoyée.

Voici un exemple de configuration du type `Value` avec `apiVersion: autoscaling/v2` :
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<ESPACE_NOMMAGE>:<NOM_MÉTRIQUE_DATADOG>
      target:
        type: Value
        value: <VALEUR_MÉTRIQUE>
```

Un autre exemple de configuration, avec le type `AverageValue` :
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<ESPACE_NOMMAGE>:<NOM_MÉTRIQUE_DATADOG>
      target:
        type: AverageValue
        averageValue: <VALEUR_MÉTRIQUE>
```

Pour `apiVersion: autoscaling/v2beta1`, les options correspondantes sont `targetValue` et `targetAverageValue`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /fr/account_management/api-app-keys/
[5]: /fr/agent/configuration/dual-shipping/?tab=helm#cluster-agent-metrics-provider
[6]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions
[7]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[9]: /fr/integrations/guide/cloud-metric-delay