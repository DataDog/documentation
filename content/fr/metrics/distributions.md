---
aliases:
- /fr/developers/faq/characteristics-of-datadog-histograms/
- /fr/graphing/metrics/distributions/
description: Calculez les centiles globaux de l'intégralité de votre ensemble de données.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: Documentation
  text: Utilisation des distributions dans DogStatsD
title: Distributions
---
## Présentation

Les métriques Distribution agrègent les valeurs envoyées par plusieurs hosts lors d'un intervalle de transmission afin de mesurer les distributions statistiques dans l'ensemble de votre infrastructure.

Les distributions globales instrumentent des objets logiques, comme des services, indépendamment des hosts sous-jacents. Contrairement aux [histogrammes][1], qui effectuent l'agrégation au niveau de l'Agent, les distributions globales envoient toutes les données brutes recueillies durant un intervalle de transmission. L'agrégation se fait côté serveur à l'aide de la [structure de données DDSketch][2] de Datadog.

Les distributions proposent des fonctionnalités de requête et des options de configuration avancées qui ne sont pas disponibles pour les autres types de métriques (count, rate, gauge, histogram) :
* **Calcul des agrégations par centile** : les distributions sont stockées sous la forme de structures de données DDSketch représentant des données brutes sans agrégation. Ainsi, il est possible de calculer des agrégations par centile (p50, p75, p90, p95, p99, ou tout autre centile de votre choix avec jusqu'à deux décimales) sur l'ensemble des données brutes provenant de tous vos hosts. Ces agrégations vous permettent d'obtenir des informations inédites grâce aux requêtes. Exemples :

  * **Centile unique sur un intervalle donné** :

     _« Calculer le 99,9e centile du temps de chargement de mon application au cours de la semaine précédente. »_

  * **Seuils en centile pour les monitors de métrique** :

    _« Recevoir une alerte lorsque le p99 de la latence des requêtes de mon application dépasse 200 ms lors des 5 dernières minutes. »_

  * **Requêtes avec seuil** :

    _« Définir un SLO de 30 jours avec un objectif de traitement de 95 % des requêtes de mon service en moins de cinq secondes. »_


* **Personnalisation du tagging** : cette fonctionnalité vous permet de contrôler le schéma de tagging pour les métriques custom pour lesquelles une granularité au niveau des hosts n'est pas nécessaire (p. ex., les transactions par seconde pour un service de paiement).

Consultez la [section Outils de développement][1] pour découvrir les détails d'implémentation.

**Remarque** : étant donné que les distributions sont un nouveau type de métrique, elles doivent être instrumentées avec de nouveaux noms de métrique lors de leur envoi à Datadog.

## Activer les requêtes avancées

Comme d'autres types de métriques, `gauges` ou `histograms` par exemple, les métriques de distribution disposent des agrégations suivantes : `count`, `min`, `max`, `sum` et `avg`. Les distributions sont initialement taguées de la même manière que d'autres métriques, avec des tags personnalisés définis dans le code. Elles sont ensuite résolues avec des tags de host, en fonction du host qui a transmis la métrique.

Vous pouvez toutefois activer, depuis la page Metrics Summary, les requêtes avancées afin de calculer par exemple des agrégations par centile globales et précises pour tous les tags interrogeables sur votre distribution. Vous bénéficiez ainsi des agrégations `p50`, `p75`, `p90`, `p95` et `p99` et des centiles définis de votre choix (avec jusqu'à deux décimales, par exemple 99,99). L'activation des requêtes avancées vous permet également d'utiliser des requêtes avec seuil.

{{< img src="metrics/distributions/advancedquery.mp4" alt="Un utilisateur activant les requêtes avancées en cliquant sur Edit sous la section Advanced" video=true width=65% >}}

Après avoir choisi d'appliquer des agrégations par centile sur une métrique de distribution, ces agrégations sont automatiquement disponibles dans l'interface de création de graphique :

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="Agrégations des métriques de distribution" video=true" >}}

Les agrégations par centile peuvent être ajoutées à différents widgets et générer des alertes :
* **Centile unique sur un intervalle donné**

   _« Calculer le 99,9e centile du temps de requête de mon application au cours de la semaine précédente. »_

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="Un widget Valeur de requête affichant une seule valeur (7,33 s) pour l'agrégation par centile 99,99 d'une seule métrique" style="width:80%;">}}

* **Seuils en centile pour les monitors de métrique**
  _« Recevoir une alerte lorsque le p99 de la latence des requêtes de mon application dépasse 200 ms lors des 5 dernières minutes. »_

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="Définition d'un seuil en centile avec la liste déroulante des conditions d'alerte pour un monitor" style="width:80%;">}}

### Requêtes avec seuil

<div class="alert alert-warning">
Les requêtes avec seuil sont disponibles en version bêta publique.
</div>

Lorsque vous activez le calcul précis de centiles globaux avec DDSketch sur vos métriques de distribution, vous accédez à une nouvelle fonctionnalité : les requêtes avec seuil. Cette nouveauté vous permet de compter le nombre de valeurs brutes des métriques de distribution lorsqu'elles dépassent un seuil numérique. Vous pouvez ainsi compter le nombre d'erreurs ou de violations en fonction d'un seuil numérique anormal sur des dashboards, ou encore définir des SLO visant à ce que 95 % des requêtes soient traitées en moins de 10 secondes au cours des 30 derniers jours.

Lorsque vous définissez des requêtes avec seuil pour des distributions en centiles, vous n'avez pas besoin de définir la valeur de votre seuil avant l'envoi des métriques. Vous êtes donc libre d'ajuster librement votre seuil dans Datadog.

Pour utiliser les requêtes avec seuil, procédez comme suit :

1. Activez les centiles sur votre métrique de distribution depuis la page Metrics Summary.
2. Représentez la métrique de distribution de votre choix à l'aide de l'agrégateur « count values… ».
3. Définissez la valeur de votre seuil ainsi qu'un opérateur de comparaison.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="Un graphique représentant une série temporelle avec l'agrégateur count values et un seuil de plus de 8 secondes" style="width:80%;" >}}

De la même façon, vous pouvez créer un SLO basé sur des métriques à l'aide des requêtes avec seuil :
1. Activez les centiles sur votre métrique de distribution depuis la page Metrics Summary.
2. Créez un SLO basé sur des métriques et définissez le numérateur afin qu'il compte le nombre d'événements positifs, avec une requête sur la métrique de distribution de votre choix et l'agrégateur « count values… ».
3. Définissez la valeur de votre seuil ainsi qu'un opérateur de comparaison.
{{< img src="metrics/distributions/threshold_SLO.jpg" alt="Requêtes avec seuil pour les SLO" style="width:80%;">}}

## Personnaliser le tagging

Les distributions vous permettent de contrôler le tagging pour les métriques custom pour lesquelles une granularité au niveau des hosts est inutile. Les configurations de tag correspondent à des _listes_ de tags que vous souhaitez conserver.

Pour personnaliser le tagging :

1. Cliquez sur le nom de la métrique de distribution custom dans le tableau Metrics Summary afin d'ouvrir le volet latéral comportant des détails sur la métrique.
2. Cliquez sur le bouton **Manage Tags** pour ouvrir une fenêtre de configuration des tags.
3. Cliquez sur l'onglet **Custom…** pour personnaliser les tags que vous souhaitez pouvoir utiliser pour la requête.

**Remarque** : la personnalisation de tags via cette liste ne permet pas d'exclure de tags. L'ajout de tags débutant par `!` n'est pas accepté.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Configuration des tags sur une distribution avec le bouton Manage Tags" style="width:80%;">}}

## Événements d'audit
Toute modification apportée à une configuration de tag ou à une agrégation par centile entraîne la création dans l'[Events Explorer][3] d'un événement qui décrit la modification et indique l'utilisateur à son origine.

Si vous avez créé, modifié ou supprimé une configuration de tag sur une métrique de distribution, vous pouvez consulter des exemples des événements associés à l'aide de la recherche suivante :
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

Si vous avez ajouté des agrégations par centile à une métrique de distribution ou que vous en avez supprimé de celle-ci, vous pouvez consulter des exemples des événements associés avec la recherche suivante :
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer