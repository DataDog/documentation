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
  - link: /agent/autodiscovery/clusterchecks
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: agent/kubernetes/daemonset_setup
    tag: Documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: /agent/cluster_agent/troubleshooting
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
3. Facultatif : configurez `DATADOG_HOST` sur `https://app.datadoghq.eu` si vous utilisez un compte européen.

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

3. Téléchargez le [fichier des règles RBAC `rbac-hpa.yaml`][7].
2. Enregistrez l'Agent de cluster Datadog en tant que fournisseur de métriques externes via le service, en exposant le port `443`. Pour ce faire, appliquez les règles RBAC mentionnées ci-dessus :
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

## Lancer l'Autoscaler de pods horizontaux

Une fois l'Agent de cluster Datadog lancé et le service enregistré, créez un manifeste pour [l'Autoscaler de pods horizontaux][8] et spécifiez `type: External` pour vos métriques. L'Agent de cluster Datadog commencera alors à récupérer les métriques auprès de Datadog :

```
spec:
  metric:
    - type: External
      external:
      metricName: <NOM_MÉTRIQUE>
      metricSelector:
        matchLabels:
          <CLÉ_TAG>:<VALEUR_TAG>
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
* L'Autoscaler de pods horizontaux est configuré de façon à effectuer l'autoscaling du déploiement `nginx`.
* Le nombre maximum de réplicas créés est de `5`, et le minimum est de `1`.
* La métrique utilisée est `nginx.net.request_per_s` et le contexte est `kube_container_name: nginx`. Ce format de métrique correspond à celui de Datadog.

Toutes les 30 secondes, Kubernetes interroge l'Agent de cluster Datadog pour obtenir la valeur de cette métrique et effectue l'autoscaling en fonction, si cela est nécessaire. Pour les cas d'utilisation avancés, il est possible de configurer plusieurs métriques dans le même Autoscaler de pods horizontaux, comme le décrit [la documentation sur l'autoscaling de pods horizontaux Kubernetes][9]. La plus grande des valeurs proposées est celle choisie.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /fr/agent/cluster_agent/setup
[5]: /fr/agent/cluster_agent/setup/#step-3-create-the-cluster-agent-and-its-service
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/rbac-hpa.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[9]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics