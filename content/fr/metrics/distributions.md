---
aliases:
- /fr/developers/faq/characteristics-of-datadog-histograms/
- /fr/graphing/metrics/distributions/
description: Calculez les centiles globaux de l'intégralité de votre ensemble de données.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: Documentation
  text: Utilisation des distributions dans DogStatsD
- link: /metrics/open_telemetry/otlp_metric_types/
  tag: Documentation
  text: Types de métriques OTLP
title: Distributions
---
## Aperçu {#overview}

Les métriques Distribution agrègent les valeurs envoyées par plusieurs hosts lors d'un intervalle de transmission afin de mesurer les distributions statistiques dans l'ensemble de votre infrastructure.

Les distributions globales instrumentent des objets logiques, comme des services, indépendamment des hôtes sous-jacents. Contrairement aux [histogrammes][1] qui s'agrègent du côté de l'Agent, les distributions globales envoient toutes les données brutes collectées pendant l'intervalle de vidage et l'agrégation se produit côté serveur en utilisant la [structure de données DDSketch de Datadog][2].

Si vous utilisez OpenTelemetry, les métriques d'histogramme OTLP sont mappées par défaut aux distributions Datadog. Voir [Types de métriques OTLP][5] pour des détails sur ce mappage et les options de configuration disponibles.

Les distributions disposent de fonctionnalités de requête et d'options de configuration avancées qui ne sont pas disponibles pour les autres types de métriques (count, rate, gauge, histogram) :
* **Calcul des agrégations de percentiles** : Les distributions sont stockées sous forme de structures de données DDSketch qui représentent des données brutes non agrégées de sorte que des agrégations de percentiles globalement précises (p50, p75, p90, p95, p99 ou tout percentile de votre choix avec jusqu'à deux décimales) peuvent être calculées à partir des données brutes de tous vos hôtes. L'activation des agrégations de percentile peut débloquer des fonctionnalités de requête avancées telles que : 

  * **Valeur de percentile unique sur n'importe quelle période** :
  
     _« Quel a été le temps de chargement au 99,9e percentile pour mon application au cours de la semaine dernière ? »_

  * **Écart type sur n'importe quelle période** :
  
     _« Quel est l'écart type (stddev) de la consommation CPU de mon application au cours du mois dernier ? »_

  * **Seuils de percentiles sur les moniteurs de métriques** :
  
    _« Alertez-moi lorsque le p95 de la latence des requêtes de mon application est supérieur à 200 ms pour les 5 dernières minutes. »_

  * **Requêtes de seuil** :
  
    _« Je voudrais définir un SLO de 30 jours où 95 % des requêtes à mon service sont complétées en moins de 5 secondes. »_


* **Personnalisation des balises** : Cette fonctionnalité vous permet de contrôler le schéma de balisage pour les métriques personnalisées pour lesquelles la granularité au niveau de l'hôte n'est pas nécessaire (par exemple, les transactions par seconde pour un service de paiement).

**Remarque :** Étant donné que les données métriques de distribution sont stockées différemment des autres types, tout nom de métrique utilisé pour un `distribution` ne doit pas être utilisé pour d'autres types de métriques.

## Activation de la fonctionnalité de requête avancée {#enabling-advanced-query-functionality}

Comme d'autres types de métriques, tels que `gauges` ou `histograms`, les distributions ont les agrégations suivantes disponibles : `count`, `min`, `max`, `sum` et `avg`. Les distributions sont initialement balisées de la même manière que les autres métriques, avec des balises personnalisées définies dans le code. Elles sont ensuite associées à des balises d'hôte en fonction de l'hôte qui a signalé la métrique. 

Cependant, vous pouvez activer des fonctionnalités de requête avancées telles que le calcul d'agrégations de percentiles globalement précises pour toutes les balises interrogeables sur votre distribution sur la page Résumé des métriques. Cela fournit des agrégations pour `p50`, `p75`, `p90`, `p95` et `p99` ou tout percentile défini par l'utilisateur de votre choix (avec jusqu'à deux décimales comme 99.99). L'activation des requêtes avancées débloque également les requêtes de seuil et l'écart type.

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="Un utilisateur activant des percentiles avancés et des fonctionnalités de requête de seuil en cliquant sur configurer sous la section avancée d'un panneau de détails de métrique." video=true width=80% >}}

Après avoir choisi d'appliquer des agrégations par centile sur une métrique de distribution, ces agrégations sont automatiquement disponibles dans l'interface graphique :

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="Agrégations de métriques de distribution" video=true" >}}

Les agrégations par centile peuvent être ajoutées à différents widgets et générer des alertes : 
* **Valeur de percentile unique sur n'importe quelle période**

   _« Quelle a été la durée de requête au 99,9e percentile pour mon application au cours de la semaine dernière ? »_ 

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="Un widget de valeur de requête affichant une seule valeur (7,33 s) pour l'agrégation au 99,99e percentile d'une seule métrique." style="width:80%;">}}

* **Seuils de percentile sur les moniteurs de métriques**
  _« Alertez-moi lorsque le p95 de la latence de requête de mon application est supérieur à 200 ms pour les 5 dernières minutes. »_ 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="Seuil de percentile étant défini avec un menu déroulant pour les conditions d'alerte dans un moniteur. " style="width:80%;">}}

### Configuration en masse pour plusieurs métriques {#bulk-configuration-for-multiple-metrics}

Vous pouvez activer ou désactiver les agrégations de percentiles pour plusieurs métriques à la fois, plutôt que de devoir configurer chacune individuellement.

1. Accédez à la [page Résumé des métriques][4] et cliquez sur le menu déroulant **Configurer les métriques**.
1. Sélectionnez **Activer les percentiles**.
1. Spécifiez un préfixe d'espace de noms de métrique pour sélectionner toutes les métriques qui correspondent à cet espace de noms.
1. (Optionnel) Pour désactiver les percentiles pour toutes les métriques dans l'espace de noms, cliquez sur le bouton **Agrégations de percentiles**.

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="Basculer pour gérer les agrégations de percentiles" style="width:100%;" >}}

### Requêtes de seuil {#threshold-queries}

Activer les percentiles calculés par DDSketch sur vos métriques de distribution débloque des requêtes de seuil où vous pouvez compter le nombre de valeurs de métriques de distribution brutes si elles dépassent ou tombent en dessous d'un seuil numérique. Vous pouvez utiliser cette fonctionnalité pour compter le nombre d'erreurs ou de violations par rapport à un seuil numérique anormal sur les tableaux de bord. Ou vous pouvez également utiliser des requêtes de seuil pour définir des SLO comme « 95 % des requêtes ont été complétées en moins de 10 secondes au cours des 30 derniers jours ». 

Lorsque vous définissez des requêtes avec seuil pour des distributions en centiles, vous n'avez pas besoin de définir la valeur de votre seuil avant l'envoi des métriques. Vous êtes donc libre d'ajuster librement votre seuil dans Datadog.

Pour utiliser les requêtes avec seuil, procédez comme suit : 

1. Activez les percentiles sur votre métrique de distribution sur la page Résumé des métriques.
2. Représentez graphiquement votre métrique de distribution choisie en utilisant l'agrégateur « compter les valeurs… ».
3. Spécifiez une valeur de seuil et un opérateur de comparaison.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="Un graphique de séries temporelles visualisé à l'aide de l'agrégateur de comptage des valeurs, avec un seuil supérieur à 8 secondes." style="width:80%;" >}}

De la même façon, vous pouvez créer un SLO basé sur des métriques à l'aide des requêtes avec seuil : 
1. Activez les percentiles sur votre métrique de distribution sur la page Résumé des métriques.
2. Créez un nouveau SLO basé sur une métrique et définissez le numérateur comme le nombre d’événements « bons » avec une requête sur votre métrique de distribution choisie en utilisant l'agrégateur « compter les valeurs… ».
3. Spécifiez une valeur de seuil et un opérateur de comparaison.
{{< img src="metrics/distributions/threshold_SLO.png" alt="Requêtes de seuil pour les SLO" style="width:80%;">}}

## Personnalisez le balisage {#customize-tagging}

Les distributions offrent une fonctionnalité qui vous permet de contrôler le balisage pour des métriques personnalisées où la granularité au niveau de l'hôte n'a pas de sens. Les configurations de balisage sont des _listes d'autorisation_ des balises que vous souhaitez conserver. 

Pour personnaliser le tagging :

1. Cliquez sur le nom de votre métrique de distribution personnalisée dans le tableau Résumé des métriques pour ouvrir le panneau latéral des détails des métriques.
2. Cliquez sur le bouton **Gérer les balises** pour ouvrir la fenêtre de configuration des balises.
3. Cliquez sur le **Personnalisé...** onglet pour personnaliser les balises que vous souhaitez garder disponibles pour la requête. 

**Remarque** : L'exclusion de balises n'est pas prise en charge dans la personnalisation des balises basée sur la liste d'autorisation. L'ajout de balises commençant par `!` n'est pas accepté.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Configurer des balises sur une distribution avec le bouton Gérer les balises" style="width:80%;">}}

## Événements d'audit {#audit-events}
Toute configuration de balise ou modification d'agrégation de percentiles crée un événement dans l'[explorateur d'événements][3]. Cet événement explique le changement et affiche l'utilisateur qui a effectué le changement.

Si vous avez créé, modifié ou supprimé une configuration de tag sur une métrique de distribution, vous pouvez consulter des exemples des événements associés à l'aide de la recherche suivante :

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

Si vous avez ajouté des agrégations par centile à une métrique de distribution ou que vous en avez supprimé de celle-ci, vous pouvez consulter des exemples des événements associés avec la recherche suivante :

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /fr/metrics/open_telemetry/otlp_metric_types/