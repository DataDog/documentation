---
title: Exécuteur de checks de cluster
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
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: Intégrations personnalisées
  - link: 'https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting'
    tag: Github
    text: Dépanner l'Agent de cluster Datadog
---
Tandis que l'Agent Datadog standard exécute les [checks d'endpoint][1] pour votre nœud et vos pods d'application, le Cluster Checks Runner est spécialement consacré à l'exécution des [**checks de cluster**][2], qui surveillent des services Kubernetes internes ainsi que des services externes comme des bases de données gérées et des périphériques réseau. L'utilisation de checks d'endpoint et de checks de cluster vous permet de surveiller à la fois les services de votre cluster et tout service externe sur lequel repose votre application.

**Remarque** : lorsque vous utilisez l'exécuteur de checks de cluster, il n'est pas nécessaire d'activer les checks de cluster pour l'Agent Datadog standard.

## Configuration

Tout d'abord, [déployez l'Agent de cluster][3].

Ensuite, déployez l'exécuteur de checks de cluster en utilisant l'[Operator Datadog][4] ou [Helm][5].

{{< tabs >}}
{{% tab "Operator" %}}

L'Operator vous permet de lancer et gérer toutes ces ressources via un seul manifeste, comme celui présenté dans [cet exemple][1].

Déployez ces ressources dans votre cluster :

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

La ligne suivante s'affiche pour confirmer que la configuration a bien été appliquée :

```
datadogagent.datadoghq.com/datadog created
```

Consultez le [référentiel de l'Operator Datadog][2] pour en savoir plus à son sujet.


[1]: https://github.com/DataDog/datadog-operator/blob/master/examples/datadog-agent-with-dca-clusterchecksrunner.yaml
[2]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

Vous pouvez mettre à jour les sections pertinentes du chart, comme indiqué ci-dessous, pour activer les checks de cluster, l'Agent de cluster et les exécuteurs de checks de cluster en même temps :

```
[...]
  clusterChecks:
    enabled: true
[...]
 clusterAgent:
  enabled: true
[...]
 clusterChecksRunner:
  enabled: true
  replicas: 2
```


{{% /tab %}}
{{< /tabs >}}

Utilisez `podAntiAffinity` pour éviter d'avoir plusieurs exécuteurs de checks de cluster sur le même nœud.

**Remarque** : l'Operator Datadog et le chart Helm utilisent `podAntiAffinity` pour éviter d'avoir plusieurs exécuteurs de checks de cluster sur le même nœud. Cet aspect est très important, car l'Agent de cluster identifie les exécuteurs de checks de cluster en fonction des noms de leurs nœuds ; l'utilisation de `podAntiAffinity` permet d'éviter les conflits de noms.


[1]: https://docs.datadoghq.com/fr/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/fr/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/fr/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml