---
description: Examinez les recommandations automatisées pour optimiser les volumes
  de logs en excluant, en échantillonnant ou en convertissant les modèles de logs
  à haut volume en métriques.
further_reading:
- link: logs/log_configuration/indexes/#exclusion-filters
  tag: Documentation
  text: Filtres d'exclusion
- link: logs/log_configuration/logs_to_metrics/
  tag: Documentation
  text: Métriques à partir de logs
title: Log Optimizer
---
## Présentation {#overview}

Log Optimizer vous aide à identifier les modèles de logs qui génèrent des volumes élevés de données répétitives ou bruyantes. Datadog analyse vos logs indexés et recommande des actions, telles que l'exclusion, l'échantillonnage ou la conversion de logs en métriques, afin que vous puissiez optimiser les volumes de logs et vous concentrer sur les informations les plus pertinentes pour le dépannage et l'analyse.

Cette fonctionnalité s'appuie sur [Logging without Limits™][1] et complète des outils tels que [Exclusion Filters][2] et [Logs to Metrics][3].

{{< img src="/logs/log_configuration/log_optimizer/log_optimizer_main.png" alt="Page de destination de Log Optimizer dans Datadog, affichez les recommandations pour réduire le volume et le bruit des logs" style="width:100%;" >}}

## Fonctionnement {#how-it-works}

Datadog examine en continu vos **logs indexés** pour trouver les modèles qui génèrent des volumes de données importants ou répétitifs. Une fois par jour, Log Optimizer évalue ces modèles par rapport aux meilleures pratiques de Datadog et identifie les logs qui pourraient bénéficier d'une optimisation.

Le Log Optimizer suggère ensuite des actions (telles que l'exclusion des messages de niveau debug, l'échantillonnage des logs de routine ou la conversion de messages statiques en métriques) afin que vous puissiez réduire le bruit sans perdre la visibilité sur les événements importants.

<div class="alert alert-danger">Le Log Optimizer ne prend pas en compte les filtres d'exclusion ou les conversions de logs en métriques existants. Examinez vos paramètres avant d'appliquer de nouvelles actions pour éviter les doublons.</div>

### Ce que Datadog analyse {#what-datadog-analyzes}

* **Logs indexés :** L'analyse cible les logs stockés dans vos index Standard et Flex.
* **Modèles à haut volume :** Datadog détecte les modèles qui constituent une part importante de votre volume total de logs.
* **Cohérence et contenu des messages :** Les logs avec des messages répétitifs ou à faible variabilité sont évalués comme des candidats potentiels à l'optimisation. Par exemple, si les messages de log indiquent des opérations réussies (telles que « process executed successfully »), le Log Optimizer peut recommander d'exclure ces logs pour réduire le bruit.
* **Surveillez l'utilisation sur la plateforme :** Datadog vérifie les modèles recommandés par rapport à votre liste de monitors actifs pour vous montrer où vos logs sont utilisés. 

### Actions recommandées {#recommended-actions}

Chaque recommandation inclut une explication et une action suggérée.

| Recommandation | Description | Exemple type |
| :---- | :---- | :---- |
| {{< ui >}}Exclude{{< /ui >}} | Arrêtez l'indexation des logs qui ajoutent du bruit et rendent plus difficile la concentration sur les signaux critiques. | Messages de niveau debug ou sortie système détaillée. |
| {{< ui >}}Sample{{< /ui >}} | Réduisez le pourcentage de logs répétitifs pour diminuer le bruit sans perdre en visibilité. | Logs avec très peu de variabilité (où des champs comme les horodatages ou les ID pourraient être les seuls changements) |
| {{< ui >}}Convert to metric{{< /ui >}} | Remplacez les logs répétés par une métrique pour suivre les nombres ou les tendances au fil du temps. | Logs qui affichent toujours le même message ou statut. |

## Examinez et appliquez les recommandations {#review-and-apply-recommendations}

Accédez à la page [{{< ui >}}Log Optimizer{{< /ui >}}][4] pour consulter les modèles de logs, les exemples de messages, les données de volume et les explications en langage clair pour chaque recommandation.

Pour appliquer une recommandation :

1. Cliquez sur une recommandation pour ouvrir le panneau latéral.
2. Cliquez sur un bouton d'action ({{< ui >}}Exclude Logs{{< /ui >}}, {{< ui >}}Sample Logs{{< /ui >}} ou {{< ui >}}Create Metric{{< /ui >}}).

La modification prend effet immédiatement dans votre configuration. Cependant, la page Log Optimizer ne s'actualise pas avant la prochaine analyse quotidienne, la recommandation peut donc encore apparaître temporairement.

De plus, créez un ticket pour entamer une revue avec d'autres équipes de votre organisation. Ouvrez un ticket Jira ou créez un élément de travail avec Datadog Work Management. Pour les recommandations que vous avez traitées, marquez-les comme résolues pour les masquer du flux de recommandations.

{{% collapse-content title="Étude de cas : Exclure les données de logs répétitives à l'aide du Log Optimizer" level="h3" expanded=false %}}

{{< img src="/logs/log_configuration/log_optimizer/log_recommendation_side_panel.png" alt="Panneau latéral de recommandation du Log Optimizer affichant les actions et les détails des modèles" style="width:100%;" >}}

Lorsque vous examinez la {{< ui >}}Log Optimizer{{< /ui >}}page, vous remarquez un modèle à haut volume provenant du service `shopist-support`. Le message « Verifying ticket » apparaît plus de 1,3 million de fois chaque jour sur plusieurs hosts.

Datadog détecte cela comme un modèle répétitif qui ne change pas et recommande de le convertir en métrique et d'exclure le log de l'indexation. Vous examinez la recommandation, confirmez que ces logs sont répétitifs et appliquez l'exclusion directement depuis le {{< ui >}}Recommendation{{< /ui >}} panneau latéral.

Les logs d'erreur critiques du même service restent visibles, vous permettant de vous concentrer sur des signaux significatifs sans perdre en observabilité. Après la prochaine analyse quotidienne, votre configuration mise à jour montrerait une réduction du volume indexé.
{{% /collapse-content %}}

## Suivez les modifications appliquées {#track-applied-changes}

L'application d'une recommandation crée un filtre d'exclusion ou une métrique à partir du log. Pour voir cette définition de filtre ou de métrique, la modifier ou la supprimer, accédez à la page correspondante :

* **Filtres d'exclusion** : page [{{< ui >}}Logs Indexes{{< /ui >}}][5]
* **Conversions de logs en métriques** : page [{{< ui >}}Metrics Configuration{{< /ui >}}][6]

Vous pouvez modifier ou supprimer ces configurations à tout moment depuis leurs pages respectives.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/logging_without_limits/
[2]: /fr/logs/indexes/#exclusion-filters
[3]: /fr/logs/logs_to_metrics/
[4]: https://app.datadoghq.com/logs/optimizer
[5]: https://app.datadoghq.com/logs/pipelines/indexes
[6]: https://app.datadoghq.com/logs/pipelines/generate-metrics