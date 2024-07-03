---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
title: Exporter des événements RUM
---

## Présentation

Vous pouvez utiliser des requêtes RUM dans des dashboards, des monitors et l'API RUM Datadog. Copiez, exportez et téléchargez votre requête de recherche agrégée dans le [RUM Explorer][1].

{{< img src="real_user_monitoring/explorer/export/rum_explorer_export.png" alt="Bouton Export en haut à droite du RUM Explorer" width="80%" >}}

Cliquez sur le bouton **Export** en haut à droite et sélectionnez l'une des options proposées pour accomplir ce qui suit :

- Créez une [vue enregistrée][2] de votre recherche RUM afin de l'utiliser comme point de départ pour explorer vos données RUM et collaborer avec vos collègues.
- Exportez vos résultats de recherche dans un [widget de dashboard][3] pour surveiller ou consolider vos données.
- Exportez vos résultats de recherche dans un [monitor][4] pour déclencher des alertes en fonction de seuils prédéfinis.
- Copiez votre requête en tant que commande cURL pour la tester dans le [RUM Explorer][5] et créer des rapports personnalisés à l'aide des [API Datadog][6].
- Téléchargez vos résultats de recherche au sein d'un fichier CSV pour obtenir des événements RUM individuels et des agrégations spécifiques. Vous pouvez exporter jusqu'à 5 000 événements RUM sous forme de listes et jusqu'à 500 agrégations pour des séries temporelles, des top lists et des graphiques de tableau.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /fr/real_user_monitoring/explorer/saved_views/
[3]: /fr/dashboards/
[4]: /fr/monitors/create/types/real_user_monitoring/
[5]: /fr/real_user_monitoring/explorer/
[6]: https://docs.datadoghq.com/fr/api/latest/rum/