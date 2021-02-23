---
title: Liste des logs
kind: documentation
description: Effectuez des recherches dans l'ensemble de vos logs.
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/explorer/patterns
    tag: Documentation
    text: Détecter les patterns dans vos logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/explorer/saved_views
    tag: Documentation
    text: Configurer automatiquement votre vue Log Explorer
---
## Présentation

La liste des logs affiche les logs indexés et propose des outils efficaces pour parcourir les **résultats individuels**.

Filtrez vos logs en définissant une requête de recherche (consultez les sections [Recherche à facettes][1] et [Syntaxe des requêtes de recherche][2] pour les cas d'utilisation avancés) et en choisissant un intervalle de temps. Explorez les logs filtrés dans le tableau, et visualisez n'importe quel log plus en détail depuis le [volet latéral des logs][3].

## Tableau des logs

Les logs correspondant à votre recherche sont affichés dans le tableau des logs.

Les colonnes du tableau peuvent être personnalisées de deux façons :

- _Directement depuis le tableau_, grâce aux interactions proposées dans la première rangée. Il s'agit de la façon la plus simple de **trier**, **réorganiser** ou **supprimer** des colonnes.
- Depuis le _volet des facettes_ sur la gauche, ou le _volet des logs_ sur la droite. Il s'agit de la façon la plus simple d'**ajouter** une colonne pour un champ.

Le bouton _Options_ vous permet de modifier le **nombre de lignes** affichées sur le tableau pour chaque événement de log.

{{< img src="logs/explorer/table_controls.gif" alt="configurer le tableau d'affichage"  style="width:80%;">}}

La configuration du tableau des logs est enregistrée avec les autres paramètres de votre contexte de dépannage dans les [Vues enregistrées][4].

## Exporter une vue

- **Export to Monitor** : exportez la requête appliquée à votre flux de logs pour créer la requête de votre nouveau [log monitor][5].
- **Download as CSV** : exportez votre vue du flux de logs actuelle avec les colonnes sélectionnées vers un fichier CSV. Vous pouvez exporter jusqu'à 5 000 logs à la fois.
- **Share view** : partagez un lien vers la vue actuelle à vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][6] disponibles.

[1]: /fr/logs/explorer/facets/
[2]: /fr/logs/search-syntax/
[3]: /fr/logs/explorer/?tab=logsearch#the-log-side-panel
[4]: /fr/logs/explorer/saved_views/
[5]: /fr/monitors/monitor_types/log/
[6]: /fr/integrations/#cat-notification
