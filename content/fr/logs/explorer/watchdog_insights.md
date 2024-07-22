---
aliases:
- /fr/logs/explorer/insights
description: Sachez précisément où regarder pour commencer ou poursuivre vos enquêtes
further_reading:
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: Blog
  text: Analyser vos logs plus rapidement avec Watchdog Insights
- link: logs/explorer/side_panel
  tag: Documentation
  text: En savoir plus sur le volet latéral des logs
- link: logs/explorer/#list-of-logs
  tag: Documentation
  text: En savoir plus sur la vue Log Explorer
title: Watchdog Insights pour les logs
---

## Présentation

Grâce à la fonctionnalité Watchdog Insights de la solution Log Management de Datadog, vous pouvez résoudre plus facilement vos incidents en visualisation des informations contextuelles dans le Log Explorer. Les Watchdog Insights renforcent vos connaissances et confirment vos intuitions en mettant en avant des anomalies et des goulots d'étranglement nuisant potentiellement à un sous-ensemble d'utilisateurs.

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="Le Log Explorer affichant la bannière Watchdog Insights avec cinq anomalies dans les logs" style="width:100%;" >}}

## Navigation

La bannière Watchdog Insights est affichée dans le [Log Explorer][1]. Elle présente des insights à propos de la requête actuelle :

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="La bannière Watchdog Insights dans la vue développée" style="width:100%;" >}}

Pour afficher un aperçu de tous les insights, développez la bannière Watchdog Insights :

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="La bannière Watchdog Insights présentant trois singularités" style="width:100%;" >}}

Pour ouvrir entièrement le volet latéral Watchdog Insights, cliquez sur **View all** :

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="Le volet latéral Watchdog Insights affichant plus de détails sur les singularités" style="width:100%;" >}}

Chaque insight propose des interactions ainsi qu'un volet latéral affichant des informations de dépannage. Les interactions et le volet latéral varient en fonction du type d'insight Watchdog.

## Types d'insights

### Détection des anomalies dans les logs

Les logs ingérés sont analysés au niveau de l'admission. Watchdog agrège les logs en fonction de certains patterns détectés ainsi que des tags `environment`, `service`, `source` et `status`. Ces logs agrégés sont ensuite analysés afin d'identifier différents comportements anormaux, notamment :

- Une augmentation du nombre de logs possédant un statut d'avertissement ou d'erreur
- Une hausse soudaine du nombre de logs possédant un statut d'avertissement ou d'erreur


Les logs sont présentés sous la forme d'insights dans le Log Explorer. Ils tiennent compte du contexte de recherche ainsi que des restrictions appliquées au rôle de l'utilisateur.

{{< img src="logs/explorer/watchdog_insights/log-anomalies-light.mp4" alt="Un utilisateur parcourant les détails d'un insight spécifique" video="true">}}

Cliquez sur un insight précis pour afficher la description complète de l'anomalie détectée, ainsi que la liste des patterns ayant permis l'identification de l'anomalie.

Pour en savoir plus sur la recherche de logs dans le Log Explorer, consultez les sections [Syntaxe de recherche de logs][2] et [Intervalles personnalisés][3].

### Singularités

Les singularités (ou « error outliers ») affichent des champs, comme des [tags ou attributs à facettes][4], susceptibles d'indiquer une erreur pour la requête actuelle. Les paires `key:value` qui sont statistiquement surreprésentées parmi les erreurs mettent en lumière les causes possibles d'un problème.

Voici quelques exemples de singularités habituelles : `env:staging`, `docker_image:acme:3.1` et `http.useragent_details.browser.family:curl`.

Les informations suivantes sont accessibles depuis la **fiche de la bannière** :

  * Le nom du champ
  * La proportion du nombre total d'erreurs et de logs globaux associés au champ en question

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="La fiche « error outlier » affichant une barre rouge représentant 73,3 % des erreurs totales ainsi qu'une barre bleue représentant 8,31 % des erreurs totales" style="width:50%;" >}}

La **fiche du volet latéral** présente le principal [pattern][5] des logs d'erreur comportant le champ.

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Fiche Error Outlier (grande)" style="width:100%;" >}}

Les informations suivantes sont accessibles depuis le **volet latéral développé** :

  * Les séries temporelles pour les logs d'erreur associés au champ
  * Les tags généralement associés aux logs d'erreur
  * La liste complète des [patterns de log][5]

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Volet latéral Error Outlier" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/logs
[2]: /fr/logs/search-syntax
[3]: /fr/dashboards/guide/custom_time_frames
[4]: /fr/logs/explorer/facets/
[5]: /fr/logs/explorer/group/#patterns