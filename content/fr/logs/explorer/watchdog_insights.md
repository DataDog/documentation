---
title: Watchdog Insights pour les logs
kind: documentation
description: Sachez précisément où regarder pour commencer ou poursuivre vos enquêtes
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/'
    tag: Blog
    text: Analyser vos logs plus rapidement avec Watchdog Insights
  - link: logs/explorer/side_panel
    tag: Documentation
    text: Volet latéral des logs
  - link: 'logs/explorer/#list-of-logs'
    tag: Documentation
    text: Liste des logs
---
## Présentation

Grâce à Watchdog Insights, remontez plus rapidement jusqu'à l'origine de votre problème à l'aide d'informations contextuelles reçues à mesure que vous explorez les logs. Watchdog Insights vient appuyer votre instinct et votre expertise pour vous offrir le coup de pouce dont vous avez besoin pour identifier les éléments qui nécessitent réellement votre attention et ainsi procéder au dépannage.

<div class="alert alert-warning">
Watchdog Insights pour Log Explorer est une fonctionnalité en version bêta, déployée auprès des clients par le biais de Log Management. Si vous souhaitez nous faire part de vos remarques, contactez <a href="https://docs.datadoghq.com/help">l'assistance Datadog</a>.
</div>

Dans l'exemple suivant, Watchdog Insights indique que la `version:2.9.7` d'une application Ruby conteneurisée est la cause de la plupart des erreurs observées dans un intervalle spécifique.

{{< img src="logs/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navigation

La bannière Watchdog Insights apparaît dans la page des résultats du Log Explorer et met en évidence les insights pertinents pour la requête actuelle :

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="Bannière Watchdog Insights (réduite)" style="width:100%;" >}}

Pour afficher un aperçu rapide des insights, développez la bannière Watchdog Insights :

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="Bannière Watchdog Insights (développée)" style="width:100%;" >}}

Pour afficher plus de causes possibles lors du dépannage, cliquez sur **View all** pour ouvrir le volet latéral Watchdog Insights :

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="Volet latéral Watchdog Insights" style="width:100%;" >}}

Chaque insight offre des interactions spécifiques et un volet latéral affichant des informations de dépannage plus détaillées. Les interactions et le volet latéral varient en fonction du [type d'insight](#collections-watchdog-insights).

## Collections

### Singularités indiquant une erreur

Les insights de type « error outlier » affichent les champs (c'est-à-dire, [les tags ou attributs à facettes][1]) susceptibles d'être indicatifs d'une erreur pour la requête actuelle. Leur rôle est d'identifier les paires `key:value` qui sont statistiquement sur-représentées parmi les erreurs, de façon à mettre en lumière les causes possibles d'un problème.

Voici quelques exemples de singularités habituelles :`env:staging`, `docker_image:acme:3.1` `http.useragent_details.browser.family:curl`.

* La **bannière** de l'insight indique :

  * Le nom du champ
  * La proportion du nombre total d'erreurs et de logs pouvant être attribuée à ce champ

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="carte Error Outlier (S)" style="width:40%;" >}}

* Le **volet latéral** de l'insight indique également :

  * Le [log pattern][2] principal pour les logs d'erreur associés à ce champ

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="carte Error Outlier (L)" style="width:60%;" >}}

* Le **volet latéral complet** de la carte indique également :

  * Les séries temporelles pour les logs d'erreur associés à ce champ
  * Les autres champs qui sont souvent associés à ces logs
  * Une liste exhaustive des [log patterns][2] pour ces logs

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="volet latéral Error Outlier" style="width:60%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/facets/
[2]: https://docs.datadoghq.com/fr/logs/explorer/#patterns