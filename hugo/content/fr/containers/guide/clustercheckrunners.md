---
aliases:
- /fr/agent/cluster_agent/clusterchecksrunner
- /fr/containers/cluster_agent/clusterchecksrunner
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique
    Datadog
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentation
  text: Checks de cluster
title: Exécuteurs de checks de cluster
---

L'Agent de cluster peut distribuer deux types de checks : des [checks d'endpoint][1] et des [checks de cluster][2]. Ces deux types de checks sont légèrement différents l'un de l'autre.

Les checks d'endpoint sont distribués spécifiquement à l'Agent Datadog sur le même nœud que les endpoints des pods d'application. Cela permet de taguer correctement les métriques.

Les checks de cluster surveillent des services Kubernetes internes, ainsi que des services externes, comme des périphériques réseau et des bases de données gérées. Leur distribution est beaucoup plus libre. Il n'est pas obligatoire d'utiliser des exécuteurs de checks de cluster. Lorsque vous utilisez un exécuteur de checks de cluster, un petit groupe d'Agents dédiés exécutent les checks de cluster. Les checks d'endpoint sont alors gérés par l'Agent normal. Cette approche permet de contrôler plus facilement la distribution des checks de cluster, notamment lorsque leur nombre et complexité augmentent. 

## Configuration

Tout d'abord, [déployez l'Agent de cluster][3].

Déployez ensuite l'exécuteur de checks de cluster à l'aide de l'[Operator Datadog][4] ou de [Helm][5] :

{{< tabs >}}
{{% tab "Operator" %}}

Grâce à l'Operator, vous pouvez lancer et gérer toutes ces ressources avec un seul manifeste. Exemple :

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
    clusterAgentToken: <TOKEN_AGENT_CLUSTER_DATADOG>
  features:
    clusterChecks:
      enabled: true
      useClusterChecksRunners: true
  override:
    clusterAgent:
      replicas: 2
```

Déployez ces ressources dans votre cluster :

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

Si la ligne suivante s'affiche, la configuration a bien été appliquée :

```
datadogagent.datadoghq.com/datadog created
```

Consultez le [référentiel de l'Operator Datadog][1] pour en savoir plus sur l'Operator Datadog.


[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

Vous pouvez modifier les sections pertinentes du chart, afin d'activer simultanément les checks de cluster, l'Agent de cluster et l'exécuteur de checks de cluster. Exemple :

```yaml
datadog:
  clusterChecks:
    enabled: true
  #(...)

clusterAgent:
  enabled: true
  #(...)

clusterChecksRunner:
  enabled: true
  replicas: 2
```


{{% /tab %}}
{{< /tabs >}}

**Remarque** : l'Operator Datadog et le chart Helm utilisent tous les deux `podAntiAffinity` afin d'éviter l'utilisation de plusieurs exécuteurs de checks de cluster sur un même nœud. Cette étape est importante, car l'Agent de cluster identifie les exécuteurs de checks de cluster en fonction du nom de leur nœud. `podAntiAffinity` permet d'éviter tout conflit de nom.


[1]: https://docs.datadoghq.com/fr/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/fr/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/fr/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml