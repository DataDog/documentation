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
## Présentation {#overview}

À tout moment, et selon votre agrégation actuelle, **exportez** ou **enregistrez** votre exploration de logs en tant que :

- [{{< ui >}}Saved View{{< /ui >}}][1] à utiliser comme point de départ pour de futures investigations, que ce soit par vous ou par vos collaborateurs.
- [{{< ui >}}Dashboard widget{{< /ui >}}][2] ou [{{< ui >}}Notebooks widget{{< /ui >}}][8] à des fins de reporting ou de consolidation.
- [{{< ui >}}Monitor{{< /ui >}}][3] pour déclencher des alertes sur des seuils prédéfinis.
- [{{< ui >}}Metric{{< /ui >}}][4] pour agréger vos logs en KPI à long terme, au fur et à mesure de leur ingestion dans Datadog.
- {{< ui >}}cURL command{{< /ui >}} pour tester vos requêtes dans le Log Explorer, puis créer des rapports personnalisés à l'aide des [API Datadog][5].
- {{< ui >}}CSV{{< /ui >}} (pour les logs individuels et les transactions individuelles). Vous pouvez exporter jusqu'à 100 000 logs à la fois pour les logs individuels, 300 pour les Patterns et 500 pour les Transactions. Vous pouvez également télécharger une vue série temporelle, top list ou tableau sous forme de fichier CSV.
- {{< ui >}}Share{{< /ui >}} Vue : Partagez un lien vers la vue actuelle avec vos collaborateurs par e-mail, Slack et plus encore. Consultez toutes les [intégrations de notification Datadog][6] disponibles pour cette fonctionnalité.

{{< img src="logs/explorer/export3.png" alt="Filtre de recherche" style="width:100%;" >}}

Vous pouvez également enregistrer des logs individuels dans un notebook en sélectionnant {{< ui >}}Save to notebook{{< /ui >}} dans le panneau latéral de l'événement de log. Les logs enregistrés dans des notebooks sont affichés dans un format facile à lire, et cet affichage est conservé dans le Notebook même après que l'événement de log a dépassé la période de rétention.

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="Enregistrer des logs dans des notebooks" style="width:80%;" >}}

Pour récupérer une liste de logs contenant plus de 1 000 logs (soit la limite maximale) avec l'API Logs, vous devez utiliser [la fonctionnalité Pagination][7].

## Formatage de l'export CSV {#csv-export-formatting}

Pour rendre les logs exportés compatibles avec les applications de tableur, Datadog nettoie les exports CSV. Les valeurs exportées et les noms de colonnes peuvent donc différer des logs originaux. Datadog effectue les modifications suivantes :

- **Supprime les sauts de ligne** (`\n`, `\r\n`, `\r`) sans insérer d'espaces. Par exemple, `foo\nbar` devient `foobar`.
- **Remplace les espaces consécutifs** par un espace unique.
- **Ajoute un préfixe aux caractères de formule** commençant par `=`, `+`, `-`, `@`, une tabulation ou un retour chariot avec une apostrophe (`'`) pour empêcher les applications de tableur de les interpréter comme des formules.
- **Ajoute des suffixes numériques aux noms de colonnes en double**, tels que `message(1)`.

Datadog entoure également les valeurs de guillemets doubles et échappe les guillemets doubles à l'intérieur des valeurs par `""`, conformément aux règles CSV standard.

Pour récupérer les logs sans ces modifications de formatage CSV, utilisez l'[API de recherche de logs][5] ou les [Archives de logs][9].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/saved_views/
[2]: /fr/dashboards/
[3]: /fr/monitors/types/log/
[4]: /fr/logs/logs_to_metrics
[5]: /fr/api/latest/logs/
[6]: /fr/integrations/#cat-notification
[7]: /fr/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /fr/notebooks/
[9]: /fr/logs/log_configuration/archives/