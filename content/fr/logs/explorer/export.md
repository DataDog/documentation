---
aliases:
- /fr/logs/export
description: Exportez votre vue Log Explorer pour la réutiliser plus tard ou dans
  un autre contexte.
further_reading:
- link: logs/explorer/search
  tag: Documentation
  text: Apprendre à filtrer les logs
- link: logs/explorer/analytics
  tag: Documentation
  text: Apprendre à regrouper les logs
- link: logs/explorer/visualize
  tag: Documentation
  text: Créer des visualisations à partir de logs
title: Exporter des logs
---

## Présentation

En fonction de l'agrégation définie, vous pouvez **exporter** ou **enregistrer** à tout moment votre exploration de logs sous différentes formes.

- [**Vue enregistrée**][1] : vos collègues ou vous-même pouvez réutiliser votre exploration comme point de départ lors d'une prochaine enquête.
- [**Widget de dashboard**][8] ou [**widget de notebooks**][8] pour surveiller ou consolider des données
- [**Monitor**][3] : recevez des alertes en fonction de seuils prédéfinis.
- [**Métrique**][4] : générez des KPI à long terme à partir de vos logs à mesure qu'ils sont ingérés par Datadog.
- **Commande cURL** : testez vos requêtes dans le Log Explorer, puis créez des rapports personnalisés à l'aide des [API Datadog][5].
- **CSV** (pour les logs et les transactions individuels). Vous pouvez exporter jusqu'à 100 000 logs en une seule fois pour les logs individuels, 300 pour les patterns et 500 pour les transactions. Vous pouvez également télécharger une série chronologique, une top list ou un tableau sous la forme d'un fichier CSV.
- **Vue partagée** : partagez un lien vers la vue actuelle avec vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][6] disponibles pour cette fonctionnalité.

{{< img src="logs/explorer/export2.png" alt="Filtre de recherche" style="width:100%;" >}}

Vous pouvez également enregistrer des logs individuels dans un notebook en sélectionnant `Save to notebook` dans le volet latéral dʼévénement de log. Les logs enregistrés dans des notebooks sont affichés dans un format facile à lire, et cet affichage est sauvegardé dans le notebook même après que lʼévénement de log lui-même a cessé d'être conservé.

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="Enregistrer des logs dans des notebooks" style="width:80%;" >}}

Pour récupérer une liste de logs contenant plus de 1 000 logs (soit la limite maximale) avec l'API Logs, vous devez utiliser [la fonctionnalité Pagination][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/saved_views/
[2]: /fr/dashboards/
[3]: /fr/monitors/types/log/
[4]: /fr/logs/logs_to_metrics
[5]: /fr/api/latest/logs/
[6]: /fr/integrations/#cat-notification
[7]: /fr/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /fr/notebooks/