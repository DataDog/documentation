---
aliases:
- /fr/agent/faq/kubernetes-cluster-name-detection
- /fr/agent/guide/kubernetes-cluster-name-detection
description: Détection automatique du nom de cluster pour les clusters Kubernetes
  sur GKE, AKS et EKS afin d'améliorer l'identification des nœuds
further_reading:
- link: /agent/autodiscovery/
  tag: documentation
  text: Autodiscovery avec l'Agent Docker
- link: /agent/kubernetes/host_setup/
  tag: documentation
  text: Exécuter l'Agent sur un host avec Kubernetes
- link: /agent/kubernetes/integrations/
  tag: documentation
  text: Intégrations personnalisées
title: Détection automatique du nom de cluster Kubernetes
---

À partir de la version 6.11+ de l'Agent, l'Agent Datadog peut détecter automatiquement le nom de cluster Kubernetes sur Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS) et Amazon Elastic Kubernetes Service (EKS). Le nom de cluster peut également être fourni directement ou découvert à partir des étiquettes de nœud Kubernetes. S'il est détecté, le nom de cluster est ajouté en tant que suffixe au nom de nœud pour toutes les données collectées. Cela facilite l'identification des nœuds dans les clusters Kubernetes. 

<div class="alert alert-info">
Ce nom de cluster doit être un nom unique et respecter les restrictions suivantes :
<ul>
  <li/>Ne doit contenir que des lettres minuscules, des chiffres et des traits d'union
  <li/>Doit commencer par une lettre
  <li/>Doit se terminer par un chiffre ou une lettre
  <li/>Doit contenir au maximum 80 caractères
</ul>
</div>

## Configuration

Vous pouvez fournir un nom de cluster directement dans votre configuration Datadog. Lorsqu'il est fourni, celui-ci est prioritaire sur toutes les autres options.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans l'opérateur Datadog, définissez la valeur sous `global.clusterName`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
```
{{% /tab %}}
{{% tab "Helm" %}}

Dans votre chart Helm, définissez la valeur sous `datadog.clusterName`.

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
```

{{% /tab %}}
{{< /tabs >}}


## Fournisseurs de cloud
Si un nom de cluster n'est pas fourni dans la configuration, l'Agent et l'Agent de cluster contactent les services de métadonnées du fournisseur de cloud pour le récupérer.

### GKE
Sur GKE, le nom de cluster est récupéré à partir du [serveur de métadonnées de VM][1]. L'Agent effectue une requête pour récupérer les attributs de l'instance et utilise la valeur renvoyée en cas de réussite.

Vous pouvez tester cette requête en utilisant `kubectl exec` dans le pod de l'Agent et en exécutant une requête `curl` comme suit.

```shell
curl -v "http://169.254.169.254/computeMetadata/v1/instance/attributes/cluster-name" -H "Metadata-Flavor: Google"
```

Une requête réussie renvoie une réponse 200 et le nom de cluster Kubernetes tel qu'il apparaît dans la console GKE. L'activation de certaines fonctionnalités GKE telles que Workload Identity peut restreindre cet accès.

### AKS
Sur AKS, le nom de cluster est récupéré à partir d'[Azure Instance Metadata Service][2]. L'Agent demande le nom de groupe de ressources de la VM, puis analyse cette valeur pour déterminer le nom de cluster Kubernetes.

Vous pouvez tester cette requête en utilisant `kubectl exec` dans le pod de l'Agent et en exécutant une requête `curl` comme suit.

```shell
curl -v "http://169.254.169.254/metadata/instance/compute/resourceGroupName?api-version=2017-08-01&format=text" -H "Metadata: true"
```
Une requête réussie renvoie une réponse 200 et le nom de groupe de ressources AKS qui doit être analysé. Par exemple, l'Agent analyse `example-cluster-name` à partir du `MC_MyResourceGroup_example-cluster-name_eastus` renvoyé.

### EKS
Sur l'EKS, le site Agent récupère le nom du cluster en récupérant les balises de l'instance EC2 et en identifiant la balise `kubernetes.io/cluster/<CLUSTER_NAME>: owned` préremplie pour déterminer le nom du cluster.

Par défaut, l'Agent utilise l'[Instance Metadata Service (IMDS)][3] pour obtenir l'identité de l'instance, qui est utilisée par l'Agent et le SDK AWS pour décrire les tags sur l'instance. Sur l'Agent `7.64.0` et versions ultérieures, il utilise IMDSv2 par défaut pour récupérer cette identité. Cela nécessite que l'instance EC2 et son rôle IAM disposent de l'autorisation `ec2:DescribeTags`. L'Agent ne prend pas en charge [EKS Pod Identity][4] pour les autorisations IAM.

L'Agent peut également récupérer les tags EC2 directement depuis IMDS lorsque la variable d'environnement suivante est fournie.
```yaml
- name: DD_COLLECT_EC2_TAGS_USE_IMDS
  value: "true"
```
*Toutefois*, IMDS n'accorde pas l'accès aux tags EC2 par défaut. Vous devez [activer l'accès aux tags][5] et définir votre limite de sauts sur 2 (ou plus).

## Étiquettes de nœud

La dernière méthode de détection utilise les étiquettes de nœud Kubernetes. L'Agent inspecte son nœud Kubernetes actuel et recherche les étiquettes suivantes :

- `alpha.eksctl.io/cluster-name`
- `kubernetes.azure.com/cluster`
- `ad.datadoghq.com/cluster-name`

Des étiquettes supplémentaires peuvent être ajoutées avec la variable d'environnement :

```yaml
- name: DD_KUBERNETES_NODE_LABEL_AS_CLUSTER_NAME
  value: "<NODE_LABEL_KEY>"
```

Si l'étiquette de nœud est trouvée, la valeur est utilisée comme nom de cluster.

[1]: https://cloud.google.com/compute/docs/metadata/querying-metadata
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/instance-metadata-service?tabs=linux
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html
[4]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/work-with-tags-in-IMDS.html#allow-access-to-tags-in-IMDS