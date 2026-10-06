---
description: Enregistrez une requête de métrique en tant que nouvelle métrique que
  vous pouvez réutiliser dans vos dashboards, monitors, SLOs et notebooks.
further_reading:
- link: https://www.datadoghq.com/blog/auto-smoother-asap/
  tag: Blog
  text: Lissez automatiquement les métriques bruitées pour révéler les tendances
title: Métriques dérivées
---
## Présentation {#overview}

Les métriques dérivées vous permettent d'enregistrer n'importe quelle requête de métrique en tant que nouvelle métrique, afin de simplifier et d'optimiser votre travail avec les métriques dans Datadog. Au lieu de créer à plusieurs reprises des requêtes complexes dans vos dashboards, monitors, SLOs et notebooks, vous pouvez créer une métrique dérivée une seule fois et la réutiliser dans toutes vos ressources. Utilisez les métriques dérivées pour :

- **Simplifier l'interrogation** : définissez une requête une seule fois, enregistrez-la en tant que métrique dérivée et réutilisez-la partout.
- **Réduire les erreurs et accroître la cohérence** : gérez les formules de manière centralisée pour éviter les erreurs et assurer l'uniformité entre les équipes.
- **Accélérer les flux de travail** : aucun changement de code ni soumission de nouvelle métrique n'est nécessaire — créez de nouvelles métriques directement à partir de métriques existantes dans Datadog.
- **Gagnez en contrôle et en auditabilité** : gérez et améliorez les formules dérivées à un seul endroit.

**Remarque** : les métriques dérivées **ne sont pas** facturées en tant que Custom Metrics, car elles sont calculées dynamiquement au moment de la requête et ne sont ni stockées ni indexées.

## Créer une métrique dérivée {#create-a-derived-metric}

Pour créer une métrique dérivée, accédez à [{{< ui >}}Metrics > Generate Metrics{{< /ui >}}][1] et cliquez sur {{< ui >}}\+ New Metric{{< /ui >}}.

{{< img src="metrics/derived_metrics/generate_metrics_tab.png" alt="L'onglet de génération de métriques dans Datadog" style="width:90%;" >}}

1. Donnez à votre métrique dérivée un nom qui **ne** commence pas par `datadog.estimated_usage`. Utilisez le format décrit dans [nommage des Custom Metrics][2].

2. Définissez les requêtes de métriques sous-jacentes et utilisez éventuellement la zone de formule pour définir les opérations mathématiques à effectuer sur les valeurs des métriques. 

   Par exemple, pour surveiller la stabilité globale des connecteurs Kafka, vous pourriez créer des requêtes individuelles `a` et `b` en utilisant les métriques `kafka.connect.connector.status.running` et `kafka.connect.connector.status.failed`. Ensuite, dans la zone de formule, saisissez la formule `(a / (a + b)) * 100`.

   Pour plus d'informations sur la façon de définir des requêtes de métriques, consultez [interrogation des métriques][3].

{{< img src="metrics/derived_metrics/derived_metric_query.png" alt="Une requête de métrique Datadog pour générer une métrique dérivée" style="width:90%;" >}}

3. Cliquez sur {{< ui >}}Create Metric{{< /ui >}}.

## Mettre à jour une métrique dérivée {#update-a-derived-metric}

Pour mettre à jour une métrique dérivée, survolez la métrique et cliquez sur l'icône {{< ui >}}Edit{{< /ui >}} qui apparaît à droite. 

**Remarque** : Vous ne pouvez pas renommer une métrique existante. Créez une nouvelle métrique.

## Supprimer une métrique dérivée {#delete-a-derived-metric}

Pour supprimer une métrique dérivée, survolez la métrique dérivée et cliquez sur l'icône {{< ui >}}Delete{{< /ui >}} qui apparaît à droite. 

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/metric/generate-metrics
[2]: /fr/metrics/custom_metrics/#naming-custom-metrics
[3]: /fr/metrics/#querying-metrics