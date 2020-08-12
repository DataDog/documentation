---
title: Live Search
kind: documentation
aliases:
  - /fr/tracing/livetail
description: Visualisez tous vos spans de trace en temps réel.
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: /tracing/visualization/service/
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
  - link: /tracing/app_analytics/analytics/
    tag: Documentation
    text: Analyse des données de votre APM avec une cardinalité infinie
---
{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

## Présentation

La fonctionnalité [Live Search][1] de l'APM vous donne la possibilité d'effectuer des recherches en temps réel parmi toutes les spans ingérées au cours des 15 dernières minutes. Les spans sont affichées dès leur envoi par l'Agent Datadog et avant leur indexation par Datadog. Toutes les spans ingérées par Datadog sont affichées sans aucun échantillonnage (Tracing without Limits™). La page Live Search vous permet d'effectuer les actions suivantes :

- Rédiger des requêtes de recherche pour affiner le flux de traces à l'aide de n'importe quel tag sur n'importe quelle span. Par exemple, vous pouvez surveiller le bon déroulement d'un nouveau déploiement en recherchant l'attribut `version_id` de tous les tags.
- Visualiser la totalité des spans de trace au fur et à mesure de leur ingestion. Par exemple, vous pouvez visualiser en temps réel les informations sur les pannes pour un `org_id` ou `customer_id` spécifique associé à une span enfant. Notez qu'aucun échantillonnage n'est effectué sur les spans ingérées au cours des 15 dernières minutes.
- Créer des requêtes de recherche avec autocomplétion en temps réel. Par exemple, pour vérifier si un processus a correctement démarré, saisissez l'attribut `process_id` d'un tag de span enfant : l'ID apparaît alors automatiquement.
- Visualiser des métriques RED clés sous forme de séries temporelles mises à jour en temps réel : requêtes par seconde, erreurs et latence. Par exemple, surveillez l'impact des tests de charge sur vos endpoints en filtrant les métriques en fonction de la durée d'une ressource enfant.
- Appliquer des requêtes de recherche en un seul clic sur n'importe quel tag ou span directement à partir du volet des traces.
- Ajouter, supprimer et trier des colonnes à partir des tags de span pour obtenir un affichage personnalisé.

## Mode Live Search
{{< img src="tracing/live_search/livesearch_mode.gif" alt="Mode Live Search" >}}

Le mode `Live Search` est l'expérience par défaut sur la page Traces. Pour le définir manuellement, sélectionnez l'option `LIVE` dans le sélecteur d'intervalle pour passer du mode `HISTORICAL` au mode Live Search sur les 15 dernières minutes. Le nombre de spans reçues par seconde est affiché en haut du tableau des traces, ainsi que la fréquence d'échantillonnage. Étant donné qu'un flux de milliers de spans par seconde est difficilement lisible, les flux de spans à haut volume sont échantillonnés, mais il est tout de même possible d'y effectuer des recherches. Utilisez les fonctions de filtrage de la barre de requête Live Search pour filtrer le flux de spans et le bouton **Pause/Play** en haut à droite pour interrompre ou relancer le flux.

**Remarque** : lorsque vous sélectionnez une span, le flux s'interrompt et les détails de la span sélectionnée s'affichent dans le volet latéral de la trace.

## Filtrer le flux de traces avec une requête de recherche
{{< img src="tracing/live_search/toplevespan.gif" alt="Requête Live Search" >}}

Définissez une requête valide dans la barre de recherche pour afficher les traces qui correspondent à vos critères de recherche pour **toutes les spans**. La syntaxe de recherche de la vue Live Search est la même que celle des autres vues de trace. Toutefois, avec la vue Live Search, la recherche se fait dans toutes les traces ingérées, pour n'importe quel tag et span, et non pas uniquement dans celles qui ont été indexées.

**Remarque** : vous avez la possibilité de sélectionner uniquement les spans de premier niveau du service en cochant la case `top-level spans of the service` située au-dessus du tableau des traces. Utilisez cette fonction sur les applications à trafic élevé pour réduire le nombre de spans affichées et ne visualiser que les spans de point d'entrée des services. Lorsque vous cochez cette case, les spans affichées ne sont filtrées que visuellement.

Vous pouvez également rechercher des attributs qui ne sont pas définis en tant que facettes. Par exemple, pour rechercher l'attribut `customer.id`, deux options sont possibles :

- Cliquez sur l'attribut dans le volet des traces et ajoutez-le à la requête de recherche `@customer.id:584959`.
{{< img src="tracing/live_search/livesearch_query2.png" alt="Filtre Live Search" >}}

- Recherchez toutes les spans avec un attribut `customer.id` en saisissant « customer.id » dans la barre de requête de recherche : `@customer.id:584959`
{{< img src="tracing/live_search/livesearch_query1.png" alt="Filtre Live Search" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces