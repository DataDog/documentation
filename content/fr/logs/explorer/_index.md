---
title: Log Explorer
kind: documentation
description: Effectuez des recherches et des analyses sur l'ensemble de vos logs
aliases:
  - /fr/logs/explore
  - /fr/logs/patterns
  - /fr/logs/graph
  - /fr/logs/analytics
  - /fr/logs/explorer/list
  - /fr/logs/explorer/patterns
  - /fr/logs/explorer/analytics
  - /fr/logs/explorer/transactions/
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/explorer/live_tail
    tag: Documentation
    text: Live Tailing de logs
  - link: logs/explorer/side_panel
    tag: Documentation
    text: Volet latéral des logs
  - link: logs/explorer/saved_views
    tag: Documentation
    text: Configurer automatiquement votre vue Log Explorer
  - link: 'https://www.datadoghq.com/blog/datadog-clipboard/'
    tag: Blog
    text: "Ajouter une URL Log\_Explorer à votre presse-papiers"
---
Le **Log Explorer** est votre point de départ pour effectuer des dépannages et plonger au cœur de vos logs. Que vous partiez de zéro, d'une [vue enregistrée][1] ou des données de contexte associées à une notification de monitor ou un widget de dashboard, le Log Explorer vous permet d'effectuer les actions suivantes :

1. [**Filtrer**](#filtrer-les-logs) les logs pour retrouver des logs précis ou généraux, ou pour se concentrer sur un groupe spécifique de logs pertinents.
2. [**Agréger**](#agregations-et-mesures) les logs recherchés sous forme d'entités de plus haut niveau pour déduire ou consolider des informations.
3. [**Visualiser**](#visualisations) les résultats des filtres et des agrégations pour voir vos logs sous le bon angle et faire émerger des informations clés.

À tout moment, vous avez la possibilité d'[**Exporter**](#exporter) votre vue Log Explorer pour la réutiliser plus tard ou dans un autre contexte.

## Filtrer les logs

Le filtre de recherche fonctionne en définissant un intervalle de temps ainsi qu'une requête de recherche basée sur des paires `key:value` et du texte libre. Consultez notre documentation sur la [syntaxe de recherche de logs][2] et les [intervalles][3] pour en savoir plus sur les cas d'utilisation avancés. Par exemple, vous pouvez définir la requête `service:payment status:error rejected` avec un intervalle de `Past 5 minutes` :

{{< img src="logs/explorer/search_filter.png" alt="Filtre de recherche" style="width:100%;" >}}

Les [logs indexés][4] prennent en charge les recherches en texte libre ainsi que les recherches de paires `key:value`.

**Remarque** : pour effectuer une recherche `key:value`, vous devez d'abord [déclarer une facette][5].

## Agréger et mesurer

Si certains logs peuvent s'avérer intéressants lorsqu'ils sont pris individuellement, il est parfois nécessaire de consulter un groupe entier d'événements pour faire émerger des informations utiles. Afin d'exposer ces informations, vous avez la possibilité d'agréger vos logs.

{{< img src="logs/explorer/aggregations.png" alt="Live Tailing de logs" style="width:100%;" >}}

**Remarque** : les agrégations sont uniquement prises en charge pour les **logs indexés**. Si vous souhaitez agréger des logs qui n'ont pas été indexés, vous pouvez [désactiver temporairement vos filtres d'exclusion][3], [générer des métriques à partir de vos logs][6] ou procéder à une [réintégration][7] de logs à partir de vos archives.

### Champs

Avec l'agrégation en fonction du champ, tous les logs correspondant à votre filtre sont agrégés sous forme de groupes en fonction de la valeur d'une facette de logs. Ces agrégations vous permettent d'extraire les mesures suivantes :

- Le **nombre de logs** par groupe
- Le **nombre de valeurs uniques** pour une facette par groupe
- Les **opérations statistiques** (`min`, `max`, `avg` et `percentiles`) effectuées sur les valeurs numériques d'une facette par groupe

**Remarque** : si un log individuel présente plusieurs valeurs différentes pour une facette unique, il appartiendra à autant de groupes qu'il existe de valeurs. Par exemple, si un log présente à la fois les tags `team:sre` et `team:marketplace`, il sera comptabilisé une fois dans le groupe `team:sre` et une fois dans le groupe `team:marketplace`.

Les groupes prennent en charge les visualisations sous forme de [Série temporelle](#serie-temporelle), de [Top List](#top-list) et de [Tableau](#tableau).

### Patterns

Avec l'agrégation en fonction du pattern, les logs ayant un `message` de structure similaire, appartenant au même `service` et partageant le même `status` sont regroupés ensemble. Cette vue est idéale pour détecter et filtrer les patterns d'erreurs parasites qui pourraient masquer d'autres problèmes plus importants :

{{< img src="logs/explorer/aggregations_patterns.png" alt="Live Tailing de logs" style="width:80%;" >}}

**Remarque** : les patterns présentés sont ceux détectés au sein d'un volume de 10 000 logs. Affinez la recherche pour afficher les modèles correspondants à un sous-ensemble de logs spécifiques.

Les patterns prennent en charge les visualisations sous forme de [Liste](#liste-de-groupes-de-logs). Cliquez sur un pattern dans la liste pour ouvrir le volet latéral dédié et effectuer les actions suivantes :

- Accéder à un échantillon de logs associés à ce pattern
- Renseigner le filtre de recherche pour affiner le contexte et afficher uniquement les logs associés à ce pattern
- Créer facilement une [règle de parsing grok][7] pour extraire des informations structurées à partir des logs associés à ce pattern

{{< img src="logs/explorer/patterns_side_panel.png" alt="Live Tailing de logs" style="width:80%;" >}}

### Transactions

Les transactions agrègent les logs indexés en fonction d'instances d'une **séquence** d'événements, telle qu'une session utilisateur ou une requête traitée par plusieurs micro-services. Par exemple, un site d'e-commerce pourra regrouper les événements de log en fonction de différentes actions utilisateur (recherche dans le catalogue, ajout d'un article au panier ou paiement) afin de générer une vue de transaction basée sur un attribut commun, tel que `requestId` ou `orderId`.

{{< img src="logs/explorer/aggregations_transactions.png" alt="Live Tailing de logs" style="width:80%;" >}}

**Remarque** : les agrégations sous forme de transactions diffèrent des agrégations sous forme de groupes classiques, dans la mesure où les groupes obtenus comprennent non seulement les logs correspondant à la requête, mais aussi les logs appartenant aux transactions associées.

- **Durée :** l'écart entre le timestamp du premier log et celui du dernier log dans la transaction. _Cette mesure est automatiquement ajoutée_.
- **Gravité maximale** identifiée dans les logs de la transaction. _Cette mesure est automatiquement ajoutée_.
- **Recherche d'éléments clés :** pour chaque `facet` ayant comme valeurs des chaînes, vous pouvez calculer des informations sur des événements de log spécifiques à l'aide des opérations `count unique`, `latest`, `earliest` and `most frequent`.
- **Consultation de statistiques :** pour chaque `measure`, vous pouvez calculer des statistiques à l'aide des opérations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95` et `pc99`.

Les transactions prennent en charge les visualisations sous forme de [Liste](#liste-de-groupes-de-logs). Cliquez sur une transaction dans la liste pour ouvrir le volet latéral dédié et effectuer les actions suivantes :

- Accéder à tous les logs associés à cette transaction
- Rechercher des logs spécifiques associés à cette transaction

{{< img src="logs/explorer/transactions_side_panel.png" alt="Live Tailing de logs" style="width:80%;" >}}

## Visualiser les données

Les visualisations vous permettent de définir comment les données filtrées et agrégées sont affichées.

### Listes

Les listes énumèrent les logs ou les groupes de logs sous forme **paginée**. Elles sont utiles lorsque les résultats individuels vous intéressent, mais que vous ne savez pas encore très bien ce qui constitue un résultat pertinent. Les listes permettent d'examiner un groupe de résultats.

Les fonctionnalités diffèrent légèrement en fonction du type de liste dont il s'agit (liste de logs ou liste de groupes de logs).

#### Liste de logs

Lorsque vous consultez une liste de logs individuels, choisissez les informations pertinentes à afficher sous forme de colonnes. Vous pouvez **gérer les colonnes** du tableau de deux façons différentes :

- Depuis le **tableau**, grâce aux interactions proposées dans la première rangée. Il s'agit de la façon la plus simple de **trier**, **réorganiser** ou **supprimer** des colonnes.
- Depuis le **volet des facettes** sur la gauche, ou le _volet des logs_ sur la droite. Il s'agit de la façon la plus simple d'**ajouter** une colonne pour un champ.

Le bouton **Options** vous permet de modifier le **nombre de lignes** affichées sur le tableau pour chaque événement de log.

{{< img src="logs/explorer/table_controls.gif" alt="configurer le tableau d'affichage"  style="width:80%;">}}

Par défaut, les logs affichés sous forme de liste sont **triés** par timestamp, les logs les plus récents étant affichés en premier. Cette méthode de tri est la plus rapide et donc la plus recommandée dans la plupart des cas. Vous pouvez afficher les logs présentant les valeurs les plus faibles ou les plus élevées pour une mesure en premier, ou trier vos logs par ordre lexicographique en fonction de la valeur unique d'une facette, en cliquant sur la colonne correspondant à cette facette. Notez que pour trier votre tableau en fonction d'un champ spécifique, vous devez d'abord [déclarer une facette][5].

La configuration du tableau de logs est stockée avec d'autres éléments de votre contexte de dépannage dans les [vues enregistrées][1].

#### Liste de groupes de logs

Les colonnes affichées dans les listes de groupes sont les colonnes **dérivées de l'agrégation**.

Les résultats sont triés comme suit :

- Selon le nombre d'événements correspondants par groupe pour une agrégation en fonction du **pattern** (ordre décroissant par défaut)
- Par ordre lexicographique de l'ID de transaction pour une agrégation en fonction de la **transaction** (ordre alphabétique croissant par défaut)

### Série temporelle

Visualisez l'évolution d'une seule [mesure][2] (ou du nombre de valeurs uniques pour une [facette][2]) sur un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][2] disponible.

L'analyse de logs sous forme de série temporelle suivante illustre l'évolution des **5 principaux chemins URL** selon le nombre d'adresses **IP client uniques** au cours du dernier mois.

{{< img src="logs/explorer/timeseries.png" alt="Exemple de série temporelle"  style="width:90%;">}}

Les séries temporelles vous permettent de choisir des options d'affichage supplémentaires : l'**intervalle de cumul**, si les résultats doivent être **affichés** sous forme de **barres** (recommandé pour les nombres et les nombres uniques), de **lignes** (recommandé pour les agrégations statistiques) ou de **zones**, et le **jeu de couleurs**.

### Top Lists

Visualisez les valeurs les plus élevées d'une [facette][2] en fonction de la [mesure][2] choisie.

Par exemple, la Top List suivante affiche les **15 principaux clients** sur un site de e-commerce en fonction du nombre de **sessions uniques** au cours des dernières 24 heures.

{{< img src="logs/explorer/toplists.png" alt="Exemple de Top List"  style="width:90%;">}}

### Tableaux imbriqués

Visualisez la liste des valeurs les plus élevées d'une [facette][2] en fonction de la [mesure][2] choisie (la première mesure que vous choisissez dans la liste), et affichez la valeur des autres mesures dans la liste. Mettez à jour la requête de recherche ou explorez les logs correspondant à l'une des dimensions.

- Lorsque plusieurs dimensions sont définies, les valeurs les plus élevées sont déterminées en fonction de la première dimension, puis de la seconde dans la fourchette des valeurs les plus élevées de la première dimension, puis de la troisième dans la fourchette des valeurs les plus élevées de la seconde dimension.
- Lorsque plusieurs mesures sont définies, les valeurs les plus élevées ou faibles sont déterminées en fonction de la première mesure.
- Le sous-total peut différer de la somme réelle des valeurs au sein d'un groupe, étant donné qu'un seul sous-ensemble (celui des valeurs les plus élevées ou des valeurs les plus faibles) s'affiche. Les événements associés à une valeur nulle ou vide pour cette dimension ne s'affichent pas en tant que sous-groupe.

**Remarque** : la visualisation d'une seule mesure et d'une seule dimension sous forme de tableau est identique à celle d'une Top List. Seule la présentation diffère.

L'analyse de logs sous forme de tableau suivante illustre l'évolution des **10 principales zones de disponibilité**. Pour chaque zone de disponibilité, elle affiche également les **10 principales versions** en fonction du **nombre de logs d'erreur** ainsi que le nombre de **hosts** et d'**ID de conteneur** uniques.

{{< img src="logs/explorer/nested_tables.png" alt="Exemple de tableau"  style="width:90%;">}}

## Exporter

En fonction de l'agrégation que vous consultez, vous pouvez **exporter** votre exploration à tout moment sous forme de :

- [**Vue enregistrée**][1] pour qu'elle puisse être réutilisée plus tard par vous-même ou par un collègue comme point de départ lors d'une prochaine enquête.
- [**Widget de dashboard**][8] pour surveiller ou consolider des données
- [**Monitor**][9] pour recevoir des alertes en fonction de seuils prédéfinis
- [**Métrique**][6] pour générer des KPI à long terme à partir de vos logs à mesure qu'ils sont ingérés par Datadog
- **CSV** (pour les logs individuels et les transactions). Vous pouvez exporter jusqu'à 5 000 logs individuels ou jusqu'à 500 logs de transaction à la fois.
- **Vue partagée** : partagez un lien vers la vue actuelle à vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][10] disponibles pour cette fonctionnalité.

{{< img src="logs/explorer/export.png" alt="Filtre de recherche" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/saved_views/
[2]: /fr/logs/search-syntax
[3]: /fr/dashboards/guide/custom_time_frames
[4]: /fr/logs/indexes
[5]: /fr/logs/explorer/facets/
[6]: /fr/logs/logs_to_metrics
[7]: /fr/logs/processing/processors/#grok-parser
[8]: /fr/dashboards/
[9]: /fr/monitors/monitor_types/log/
[10]: /fr/integrations/#cat-notification
[11]: /fr/logs/explorer/watchdog-insights