---
title: Dépannage de l'Agent de cluster
kind: documentation
further_reading:
  - link: https://www.datadoghq.com/blog/datadog-cluster-agent/
    tag: Blog
    text: Présentation de l'Agent de cluster Datadog
  - link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
    tag: Blog
    text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique Datadog
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: /agent/kubernetes/daemonset_setup/
    tag: Documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: Intégrations personnalisées
  - link: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting
    tag: Github
    text: Dépannage de l'Agent de cluster Datadog
---
Afin d'exécuter les commandes de dépannage pour l'Agent de cluster, vous devez d'abord accéder au pod de l'Agent de cluster ou de l'Agent de nœud. Pour ce faire, utilisez la commande suivante :

```text
kubectl exec -it <NOM_POD_AGENT_CLUSTER_DATADOG> bash
```

## Agent de cluster Datadog

Pour afficher les métadonnées de cluster envoyées par l'Agent de cluster Datadog, accédez au pod via la commande `exec` puis exécutez :

```text
datadog-cluster-agent metamap
```

Le résultat suivant devrait s'afficher :

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent metamap

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

Si vous ne recueillez pas correctement les événements, assurez-vous de définir les variables d'environnement suivantes sur `true` :

- Élection de leader : `DD_LEADER_ELECTION`
- Collecte d'événements : `DD_COLLECT_KUBERNETES_EVENTS`

Ainsi que les verbes adéquats spécifiés dans les règles RBAC (en particulier, `watch events`).

Si vous les avez activés, vérifiez le statut d'élection du leader et le check `kube_apiserver` à l'aide de la commande suivante :

```text
datadog-cluster-agent status
```

On obtient alors le résultat suivant :

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent status
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

Vous pouvez vérifier le statut de l'Agent de cluster Datadog en exécutant la commande status de l'Agent :
`datadog-agent status`

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

Veillez à ce que le service de l'Agent de cluster soit créé avant les pods de l'Agent de manière à ce que le DNS soit disponible dans les variables d'environnement :

```text
root@datadog-agent-9d5bl:/# env | grep DATADOG_CLUSTER_AGENT | sort
DATADOG_CLUSTER_AGENT_SERVICE_PORT=5005
DATADOG_CLUSTER_AGENT_SERVICE_HOST=10.100.202.234
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PORT=5005
DATADOG_CLUSTER_AGENT_PORT=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENTPORT_5005_TCP_PROTO=tcp
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_ADDR=10.100.202.234

root@datadog-agent-9d5bl:/# echo ${DD_CLUSTER_AGENT_AUTH_TOKEN}
DD_CLUSTER_AGENT_AUTH_TOKEN=1234****9
```

Vérifiez que l'Agent de nœud utilise l'Agent de cluster Datadog comme fournisseur de tags :

```text
root@datadog-agent-9d5bl:/# cat /var/log/datadog/agent.log | grep "metadata-collector"
2018-06-11 06:59:02 UTC | INFO | (tagger.go:151 in tryCollectors) | kube-metadata-collector tag collector successfully started
```

Ou recherchez des logs d'erreur, par exemple :

```shell
2018-06-10 08:03:02 UTC | ERROR | Could not initialize the communication with the Datadog Cluster Agent, falling back to local service mapping: [...]
```

## Serveur de métriques custom

### Commandes status et flare de l'Agent de cluster

Si vous rencontrez des difficultés avec votre serveur de métriques custom :

* Vérifiez que la couche agrégation et les certificats sont bien configurés.
* Assurez-vous que les métriques utilisées pour l'autoscaling sont disponibles. Lorsque vous créez le HPA (Horizontal Pod Autoscaler), l'Agent de cluster Datadog analyse le manifeste et envoie une requête à Datadog pour tenter de récupérer la métrique. Si le nom de  la métrique n'est pas correct ou que la métrique n'existe pas dans votre application Datadog, l'erreur suivante est générée :

    ```shell
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

Exécutez la commande `datadog-cluster-agent status` pour afficher le statut du fournisseur de métriques externes :

```shell
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

Les erreurs liées au fournisseur de métriques externes s'affichent lorsque vous exécutez cette commande. Si vous souhaitez obtenir des informations plus détaillées, exécutez la commande flare : `datadog-cluster-agent flare`.

La commande flare génère un fichier zip contenant le fichier `custom-metrics-provider.log`. Son contenu ressemble à ceci :

```
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

### Description du manifeste du HPA

Si le message suivant apparaît lors de la description du manifeste du HPA :

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

Alors la configuration RBAC pour le HPA n'est probablement pas correcte. Assurez-vous que `kubectl api-versions` renvoie ceci :

```text
autoscaling/v2beta1
[...]
external.metrics.k8s.io/v1beta1
```

Cette dernière ligne s'affiche si l'Agent de cluster Datadog est bien identifié en tant que fournisseur de métriques externes, et si le nom de service spécifié dans APIService pour le fournisseur de métriques externes est identique à celui du service qui expose l'Agent de cluster Datadog sur le port `443`. Assurez-vous également que vous avez créé les règles RBAC à l'étape [Enregistrer le fournisseur de métriques externes][1].

Si l'erreur suivante s'affiche lorsque vous inspectez le manifeste du HPA :

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Assurez-vous que l'Agent de cluster Datadog est en cours d'exécution et que le service qui expose le port `443` (dont le nom est enregistré dans APIService) est disponible.

### Différences de valeurs dans Datadog et dans Kubernetes

Lorsque Kubernetes procède à l'autoscaling de vos ressources, la cible actuelle est pondérée en fonction du nombre de réplicas du déploiement mis à l'échelle.
La valeur renvoyée par l'Agent de cluster Datadog est récupérée auprès de Datadog et doit être proportionnellement égale à la cible actuelle multipliée par le nombre de réplicas.

Exemple :

```text
    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - app: puppet
    - env: demo
    metricName: nginx.net.request_per_s
    ts: 1532042322
    valid: true
    value: 2472
```

L'Agent de cluster a récupéré la valeur `2472`, mais le HPA indique :

```text
NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   824/9 (avg)   1         3         3          41m
```

En effet, `824 * 3 réplicas = 2472`.

*Remarque* : par défaut, l'Agent de cluster Datadog traite les métriques définies dans les différents manifestes du HPA et récupère les valeurs auprès de Datadog toutes les 30 secondes. De même, Kubernetes interroge l'Agent de cluster Datadog toutes les 30 secondes par défaut. Ce processus étant effectué de manière asynchrone, la règle ci-dessus ne s'applique pas systématiquement, en particulier si la métrique varie. Les deux fréquences sont toutefois paramétrables afin de limiter les problèmes éventuels.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/cluster_agent/external_metrics/#register-the-external-metrics-provider