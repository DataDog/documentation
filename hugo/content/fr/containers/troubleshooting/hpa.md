---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: /containers/guide/cluster_agent_autoscaling_metrics
  tag: Documentation
  text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique
    Datadog
title: Dépannage de métriques custom Server et HPA
---

## Commandes status et flare de l'Agent de cluster

Si vous rencontrez des difficultés avec votre serveur de métriques custom :

* Vérifiez que la couche agrégation et les certificats sont bien configurés.
* Assurez-vous que les métriques utilisées pour l'autoscaling sont disponibles. Lorsque vous créez le HPA (Horizontal Pod Autoscaler), l'Agent de cluster Datadog analyse le manifeste et envoie une requête à Datadog pour tenter de récupérer la métrique. Si le nom de  la métrique n'est pas correct ou que la métrique n'existe pas dans votre compte Datadog, l'erreur suivante est générée :

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

Exécutez la commande `agent status` pour afficher le statut du fournisseur de métriques externes :

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

Les erreurs liées au fournisseur de métriques externes s'affichent lorsque vous exécutez cette commande. Si vous souhaitez obtenir des informations plus détaillées, exécutez la commande flare : `agent flare`.

La commande flare génère un fichier zip contenant le fichier `custom-metrics-provider.log`. Son contenu ressemble à ceci :

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - cluster: eks
    metricName: redis.key
    ts: 1532042322
    valid: false
    value: 0

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - dcos_version: 1.9.4
    metricName: docker.mem.limit
    ts: 1.532042322
    valid: true
    value: 268435456
```

Si le flag de la métrique `Valid` est défini sur `false`, la métrique n'est pas prise en compte dans le pipeline de l'Autoscaler de pods horizontaux.

## Description du manifeste du HPA

Si le message suivant apparaît lors de la description du manifeste du HPA :

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

Alors la configuration RBAC ou la connectivité du service pour le fournisseur de métriques n'est probablement pas correcte. Assurez-vous que `kubectl api-versions` renvoie ceci :

```text
% kubectl get apiservices
NAME                                   SERVICE                                     AVAILABLE   AGE
...
v1beta1.external.metrics.k8s.io        default/datadog-cluster-agent-metrics-api   True        57s
```

Les métriques externes du service dʼAPI s'affiche avec `true` si le service dʼAPI, le service et le mappage de port dans le pod correspondent tous. De même, l'adresse de lʼAgent de cluster doit avoir les autorisations RBAC appropriées. Assurez-vous d'avoir créé les ressources à l'étape [Enregistrer le fournisseur de métriques externes][1].

Si l'erreur suivante s'affiche lorsque vous inspectez le manifeste du HPA :

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Assurez-vous que l'Agent de cluster Datadog est en cours d'exécution et que le service qui expose le port `8443` (dont le nom est enregistré dans APIService) est disponible.

## Différences de valeurs dans Datadog et dans Kubernetes

Comme Kubernetes développe automatiquement vos ressources, le HPA prend une décision de mise à l'échelle basée sur la valeur de la métrique fournie par lʼAgent de cluster. LʼAgent de cluster demandera et stockera la valeur exacte de la métrique renvoyée par l'API Datadog. Si votre HPA utilise une cible avec `type: Value`, cette valeur de métrique exacte est fournie au HPA. Si votre HPA utilise `type: AverageValue`, cette valeur de métrique est divisée par le nombre actuel de répliques.

C'est pourquoi vous pouvez voir des valeurs renvoyées ainsi :

```text
% kubectl get datadogmetric
NAME             ACTIVE   VALID   VALUE   REFERENCES                UPDATE TIME
example-metric   True     True    7       hpa:default/example-hpa   21s

% kubectl get hpa
NAME          REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
example-hpa   Deployment/nginx   3500m/5 (avg)   1         3         2          24
```

La valeur de `7` a été divisée par les répliques `2` pour obtenir la moyenne de `3.5`. Les deux types sont pris en charge par le HPA, il suffit de prendre en compte le type lors de la configuration de votre requête et de la valeur cible. Consultez le guide relatif à l[Agent de cluster pour obtenir des exemples de configuration][2].

*Remarque* : par défaut, l'Agent de cluster Datadog traite les métriques définies dans les différents manifestes du HPA et récupère les valeurs auprès de Datadog toutes les 30 secondes. De même, Kubernetes interroge l'Agent de cluster Datadog toutes les 30 secondes par défaut. Ce processus étant effectué de manière asynchrone, la règle ci-dessus ne s'applique pas systématiquement, en particulier si la métrique varie. Les deux fréquences sont toutefois paramétrables afin de limiter les problèmes éventuels.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/guide/cluster_agent_autoscaling_metrics
[2]: /fr/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm#value-vs-averagevalue-for-the-target-metric