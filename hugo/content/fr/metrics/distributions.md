---
aliases:
- /fr/developers/faq/characteristics-of-datadog-histograms/
- /fr/graphing/metrics/distributions/
description: Calculez des centiles globaux sur l'ensemble de votre jeu de données.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: Documentation
  text: Utilisation des distributions dans DogStatsD
- link: /metrics/open_telemetry/otlp_metric_types/
  tag: Documentation
  text: Types de métriques OTLP
title: Distributions
---
## Présentation {#overview}

Les distributions sont un type de métrique qui agrègent les valeurs envoyées depuis plusieurs hosts pendant un intervalle de flush pour mesurer des distributions statistiques sur l'ensemble de votre infrastructure.

Les distributions globales instrumentent des objets logiques, comme des services, indépendamment des hosts sous-jacents. Contrairement aux [histogrammes][1], dont l'agrégation s'effectue côté Agent, les distributions globales envoient toutes les données brutes collectées pendant l'intervalle de flush et l'agrégation se produit côté serveur en utilisant la [structure de données DDSketch][2] de Datadog.

Si vous utilisez OpenTelemetry, les métriques d'histogramme OTLP sont mappées par défaut aux distributions Datadog. Consultez [OTLP Metric Types][5] pour plus de détails sur ce mappage et les options de configuration disponibles.

Les distributions offrent des fonctionnalités de requête et des options de configuration améliorées qui ne sont pas proposées avec d'autres types de métriques (compteur, taux, jauge, histogramme) :
* **Calcul des agrégations de centiles** : Les distributions sont stockées sous forme de structures de données DDSketch qui représentent des données brutes non agrégées, de sorte que des agrégations de centiles globalement précises (p50, p75, p90, p95, p99 ou tout centile de votre choix avec jusqu'à deux décimales) peuvent être calculées sur les données brutes de tous vos hosts. L'activation des agrégations de centiles peut débloquer des fonctionnalités de requête avancées telles que : 

  * **Valeur de centile unique sur n'importe quelle période** :
  
     _« Quel a été le temps de chargement au 99.9e centile pour mon application au cours de la semaine dernière ? »_

  * **Écart-type sur n'importe quelle période** :
  
     _« Quel est l'écart-type (stddev) de la consommation CPU de mon application au cours du mois dernier ? »_

  * **Seuils de centile sur les moniteurs de métriques** :
  
    _« Alertez-moi lorsque le p95 de la latence des requêtes de mon application est supérieur à 200 ms au cours des 5 dernières minutes. »_

  * **Requêtes de seuil** :
  
    _« Je souhaite définir un SLO de 30 jours où 95 % des requêtes vers mon service sont terminées en moins de 5 secondes. »_


* **Personnalisation des tags** : Cette fonctionnalité vous permet de contrôler la façon dont les métriques personnalisées sont taguées lorsque la granularité au niveau du host n'est pas nécessaire (par exemple, les transactions par seconde pour un service de paiement).

**Remarque :** Étant donné que les données de métriques de distribution sont stockées différemment des autres types, tout nom de métrique utilisé pour une `distribution` ne doit pas être utilisé pour d'autres types de métriques. Consultez [Conflits de noms de métriques et occultation](#metric-name-conflicts-and-overshadowing) pour plus d'informations.

## Activation de la fonctionnalité de requête avancée {#enabling-advanced-query-functionality}

Comme pour les autres types de métriques, tels que `gauges` ou `histograms`, les distributions disposent des agrégations suivantes : `count`, `min`, `max`, `sum` et `avg`. Les distributions sont initialement taguées de la même manière que les autres métriques, avec des tags personnalisés définis dans le code. Elles sont ensuite associées aux tags du host en fonction du host qui a transmis la métrique. 

Cependant, sur la page Metrics Catalog, vous pouvez activer la fonctionnalité de requête avancée pour votre distribution, telle que le calcul d'agrégations de centiles globalement précises pour tous les tags interrogeables. Cela fournit des agrégations pour `p50`, `p75`, `p90`, `p95` et `p99` ou tout centile défini par l'utilisateur de votre choix (avec jusqu'à deux décimales, comme 99.99). L'activation des requêtes avancées ajoute également la prise en charge des requêtes de seuil et des requêtes d'écart-type.

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="Un utilisateur activant les fonctionnalités de centiles avancés et de requêtes de seuil en cliquant sur configure dans la section advanced du panneau de détails d'une métrique" video=true width=80% >}}

Après avoir choisi d'appliquer des agrégations de centiles sur une métrique de distribution, ces agrégations sont automatiquement disponibles dans l'interface de création de graphiques :

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="Agrégations de métriques de distribution" video=true" >}}

Vous pouvez utiliser les agrégations de centiles dans divers autres widgets et pour les alertes : 
* **Valeur de centile unique sur n'importe quelle période**

   _« Quelle a été la durée de requête au 99.9e centile pour mon application au cours de la semaine dernière ? »_ 

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="Un widget de valeur de requête affichant une valeur unique (7.33s) pour l'agrégation au 99.99e centile d'une métrique unique" style="width:80%;">}}

* **Seuils de centile sur les moniteurs de métriques**
  _« Alertez-moi lorsque le p95 de la latence des requêtes de mon application dépasse 200 ms au cours des 5 dernières minutes. »_ 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="Seuil de centile défini avec un menu déroulant pour les conditions d'alerte dans un moniteur " style="width:80%;">}}

### Configuration en masse pour plusieurs métriques {#bulk-configuration-for-multiple-metrics}

Vous pouvez activer ou désactiver les agrégations de centiles pour plusieurs métriques à la fois, plutôt que de devoir configurer chacune d'elles individuellement.

1. Accédez à la [Metrics Catalog page][4] et cliquez sur le {{< ui >}}Actions{{< /ui >}}menu déroulant.
1. Sélectionnez {{< ui >}}Manage Percentile Aggregations{{< /ui >}}.
1. Spécifiez un préfixe d'espace de nom de métrique pour sélectionner toutes les métriques qui correspondent à cet espace de nom.
1. (Facultatif) Pour désactiver les centiles pour toutes les métriques de l'espace de nom, cliquez sur le bouton bascule {{< ui >}}Percentile aggregations{{< /ui >}}.

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="Basculer pour gérer les agrégations de centiles" style="width:100%;" >}}

### Requêtes de seuil {#threshold-queries}

L'activation des centiles globalement précis calculés par DDSketch sur vos métriques de distribution débloque les requêtes de seuil, qui permettent de compter les valeurs brutes des métriques de distribution dépassant ou n'atteignant pas un seuil numérique. Vous pouvez utiliser cette fonctionnalité pour compter le nombre d'erreurs ou de violations par rapport à un seuil numérique anormal sur les dashboards. Ou vous pouvez également utiliser les requêtes de seuil pour définir des SLO tels que « 95 % des requêtes ont été effectuées en moins de 10 secondes au cours des 30 derniers jours ». 

Avec les requêtes de seuil pour les distributions avec centiles, vous n'avez pas besoin de prédéfinir une valeur de seuil avant la soumission de la métrique, et vous disposez d'une flexibilité totale pour ajuster la valeur de seuil dans Datadog.

Pour utiliser les requêtes de seuil : 

1. Activez les centiles sur votre métrique de distribution sur la page Metrics Catalog.
2. Tracez la métrique de distribution choisie à l'aide de l'agrégateur {{< ui >}}count values...{{< /ui >}}.
3. Spécifiez une valeur de seuil et un opérateur de comparaison.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="Un graphique de série temporelle affiché à l'aide de l'agrégateur de comptage des valeurs, avec un seuil supérieur à 8 secondes" style="width:80%;" >}}

Vous pouvez de la même manière créer un SLO basé sur des métriques en utilisant des requêtes de seuil : 
1. Activez les centiles sur votre métrique de distribution sur la page Metrics Catalog.
2. Créez un nouveau SLO basé sur des métriques et définissez le numérateur comme le nombre d'événements « conformes » avec une requête sur la métrique de distribution choisie à l'aide de l'agrégateur {{< ui >}}count values...{{< /ui >}}.
3. Spécifiez une valeur de seuil et un opérateur de comparaison.
{{< img src="metrics/distributions/threshold_SLO.png" alt="Requêtes de seuil pour les SLO" style="width:80%;">}}

## Personnalisez les tags {#customize-tagging}

Les distributions offrent une fonctionnalité qui vous permet de contrôler les tags des métriques personnalisées lorsque la granularité au niveau du host n'est pas pertinente. Les configurations de tags sont des _listes d'autorisation_ des tags que vous souhaitez conserver. 

Pour personnaliser les tags :

1. Cliquez sur le nom de votre métrique de distribution personnalisée dans le tableau des métriques de la page Metrics Catalog pour ouvrir le panneau latéral des détails de la métrique.
2. Cliquez sur le bouton {{< ui >}}Manage Tags{{< /ui >}} pour ouvrir la modale de configuration des tags.
3. Cliquez sur l'onglet {{< ui >}}Custom...{{< /ui >}} pour personnaliser les tags que vous souhaitez garder disponibles pour les requêtes. 

**Remarque** : L'exclusion de tags n'est pas prise en charge dans la personnalisation des tags basée sur une liste d'autorisation. L'ajout de tags commençant par `!` n'est pas accepté.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Configuration des tags sur une distribution avec le bouton Manage Tags" style="width:80%;">}}

## Conflits de noms de métriques et masquage {#metric-name-conflicts-and-overshadowing}

Les métriques de distribution stockent les données différemment des types non-distribution (compteur, taux, jauge, histogramme). Si le même nom de métrique reçoit à la fois des données de distribution et des données non-distribution, le système de requête de Datadog donne la priorité aux données de distribution. Ce comportement est appelé **masquage**.

Aucune donnée n'est perdue, car les deux séries temporelles sont stockées. Cependant, les requêtes ne renvoient que les données de distribution, de sorte que la série temporelle non-distribution est invisible. Le masquage prend effet dès l'arrivée du premier point de données de distribution.

### Symptômes du masquage {#symptoms-of-overshadowing}

Le masquage se manifeste généralement de l'une des manières suivantes :

* Les tags ou les données d'une métrique semblent changer soudainement, sans que vous ayez effectué de modifications de configuration.
* Vous recevez cette erreur lors de la mise à jour d'une configuration de tag via l'API de métriques :

    ```text
    New tag-configuration conflicts with existing configuration for <METRIC_NAME>
    ```
* Une métrique est signalée comme étant d'un type différent de celui attendu (par exemple, vous attendez `count` mais voyez `distribution`).

Pour confirmer le type actuel d'une métrique, consultez la [page Metrics Catalog][4].

### Éviter le masquage {#avoid-overshadowing}

Les noms de métriques doivent être uniques quel que soit le type, dans les deux sens. Deux cas sont souvent négligés :

* **Métriques basées sur les logs** : Comme les métriques basées sur les logs sont toujours soumises en tant que distributions, vérifiez que le nom de métrique que vous choisissez n'existe pas déjà pour une métrique de type compteur, jauge, taux ou histogramme.
* **Noms retirés** : Un nom qui ne reçoit plus de données reste réservé à son type d'origine. Ne le réutilisez pas pour un type différent.

### Résoudre le masquage {#resolve-overshadowing}

Si votre métrique est déjà masquée, vous devez choisir de conserver soit les données de **distribution**, soit les données **non-distribution**. Vous ne pouvez pas conserver les deux sous le même nom de métrique.

Contactez [Datadog Support][6] en précisant :

* Les noms de métriques concernés
* Le type de données que vous souhaitez conserver

Une fois le conflit résolu, renommez la métrique dans toutes les soumissions futures pour contribuer à faire en sorte que chaque nom de métrique ne soit utilisé que pour un seul type.

## Événements d'audit {#audit-events}
Toute modification de la configuration des tags ou de l'agrégation des centiles crée un événement dans l'[event explorer][3]. Cet événement explique la modification et affiche l'utilisateur qui l'a effectuée.

Si vous avez créé, mis à jour ou supprimé une configuration de tag sur une métrique de distribution, vous pouvez voir des exemples avec la recherche d'événement suivante :

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

Si vous avez ajouté ou supprimé des agrégations de centiles sur une métrique de distribution, vous pouvez voir des exemples avec la recherche d'événement suivante :

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/catalog
[5]: /fr/metrics/open_telemetry/otlp_metric_types/
[6]: https://www.datadoghq.com/support/