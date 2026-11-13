---
description: Mettez automatiquement vos clusters à l'échelle avec Kubernetes Cluster
  Autoscaling.
site_support_id: containers_autoscaling_cluster
title: Kubernetes Cluster Autoscaling
---
<div class="alert alert-warning">Pendant la période de disponibilité limitée, Datadog recommande une <strong>utilisation hors production uniquement</strong> de Datadog Kubernetes Cluster Autoscaling. Envoyez un e-mail à <a href="mailto:kubernetes-beta@datadoghq.com">kubernetes-beta@datadoghq.com</a> pour plus d'informations et pour obtenir de l'aide.</div>

## Prérequis {#requirements}
- Datadog Agent v7.75+
- Datadog Operator v1.23.0+ **ou** Datadog Helm chart v3.155.1+
- [Remote Configuration][1] doit être activé à la fois au niveau de l'organisation et sur les Agents de votre cluster cible. Consultez [Activation de Remote Configuration][2] pour obtenir des instructions de configuration.
- Autorisations utilisateur Datadog :
  - Org Management
  - API Keys Write
  - Autoscaling Manage

  Par défaut, tous les utilisateurs administrateurs Datadog disposent de l'autorisation Autoscaling Manage, et tous les utilisateurs Datadog disposent d'un accès en lecture pour consulter les recommandations et les rapports.

  Pour accorder l'autorisation Autoscaling Manage à un autre utilisateur disposant d'un rôle standard ou personnalisé, consultez [Datadog Role Permissions][3] pour obtenir des instructions.

## Configuration {#setup}

1. Activez le Cluster Autoscaling.

   {{< tabs >}}
{{% tab "Datadog Operator" %}}

Définissez `features.autoscaling.cluster.enabled` sur `true` dans votre spécification `DatadogAgent`.

```yaml
spec:
  features:
    autoscaling:
      cluster:
        enabled: true
```
{{% /tab %}}

{{% tab "Helm" %}}

Définissez `datadog.autoscaling.cluster.enabled` sur `true` dans votre fichier `datadog-values.yaml`.

```yaml
datadog:
  autoscaling:
    cluster:
      enabled: true
```

Exécutez ensuite `helm upgrade`.
{{% /tab %}}
{{< /tabs >}}
2. Si vous ne disposez pas d'une installation existante de Karpenter, installez le [plugin Datadog `kubectl`][4]. Ce plugin aide à installer Karpenter ou à se connecter à votre configuration Karpenter existante.
   ```shell
   kubectl krew install datadog
   ```
3. Exécutez le plugin `kubectl` et transmettez les identifiants AWS pour le projet AWS sur lequel le cluster est exécuté :
   ```shell
   AWS_PROFILE=<foo> AWS_REGION=<bar> kubectl datadog autoscaling cluster install
   ```

   Cette commande crée :
   - Deux piles CloudFormation nommées `dd-karpenter-$CLUSTER_NAME`
   - Une release Helm nommée `karpenter` dans l'espace de noms Kubernetes `dd-karpenter`
   - Les objets `EC2NodeClass` et `NodePool` de Karpenter

   Pour des options de commande plus détaillées, exécutez [`kubectl datadog autoscaling cluster install --help`][4].

## Mise à l'échelle automatique d'un cluster {#autoscale-a-cluster}

Dans Datadog, accédez à [Kubernetes Autoscaling][5]. Vous pouvez examiner tous vos clusters disponibles pour la mise à l'échelle automatique sur la page [Autoscaling Settings][7]. Activez l'option dans la colonne {{< ui >}}Enabled{{< /ui >}} pour le cluster de votre choix.

{{< img src="containers/autoscaling/settings.png" alt=" La page Autoscaling Settings affichant la section Enable Clusters for Autoscaling. Affiche un tableau filtrable de clusters Kubernetes avec des colonnes pour le nom du cluster, les nœuds, la capacité CPU, la capacité mémoire, le pourcentage d'utilisation CPU avec des barres visuelles, le pourcentage d'utilisation mémoire avec des barres visuelles, le nombre de charges de travail mises à l'échelle automatiquement, la disponibilité de la mise à l'échelle du cluster, la disponibilité de la mise à l'échelle des charges de travail et un commutateur indiquant si la fonctionnalité est activée. Les commutateurs sur la droite indiquent les clusters pour lesquels la mise à l'échelle automatique est activée." style="width:100%;" >}}

Utilisez la page [Cluster Scaling][6] et sélectionnez un cluster pour examiner ses recommandations. Identifiez un cluster que vous souhaitez commencer à optimiser. Pendant la période de disponibilité limitée, Datadog recommande de sélectionner un **cluster hors production**.

{{< img src="containers/autoscaling/cluster-view.png" alt="La page de détails Cluster Scaling pour le cluster dev-eks-shopist-a-us-east-1. La section Cost Summary affiche quatre métriques : un coût du cluster de $140.7k avec une variation mensuelle de -$3.1k, un coût d'inactivité de $93.66k avec une variation de -$2.29k, une efficacité d'utilisation par rapport aux requêtes CPU de 27.24% et une efficacité d'utilisation par rapport aux requêtes mémoire de 35.15%. La section Scaling Events affiche deux graphiques chronologiques suivant les métriques CPU et mémoire au cours du mois dernier, avec des fluctuations de l'utilisation, ainsi qu'une chronologie des événements de mise à l'échelle récents, y compris les activités des pods et de DatadogPodAutoscaler. La section Scaling Recommendations affiche un tableau des charges de travail avec leur CPU et leur mémoire inutilisés, indiquant que la mise à l'échelle automatique est activée pour 8.7% d'entre elles." style="width:100%;" >}}

Cliquez sur {{< ui >}}Start Autoscaling{{< /ui >}} pour appliquer les recommandations.

[1]: /fr/agent/remote_config
[2]: /fr/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /fr/account_management/rbac/permissions/#overview
[4]: /fr/containers/kubernetes/kubectl_plugin/
[5]: https://app.datadoghq.com/orchestration/scaling/summary
[6]: https://app.datadoghq.com/orchestration/scaling/cluster
[7]: https://app.datadoghq.com/orchestration/scaling/settings