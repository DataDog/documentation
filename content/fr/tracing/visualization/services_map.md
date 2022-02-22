---
title: Service Map
kind: documentation
description: "La Service\_Map permet de visualiser les données recueillies par l'APM Datadog."
aliases:
  - /fr/tracing/servicemap
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Configurer le tracing d'APM avec votre application
  - link: https://www.datadoghq.com/blog/service-map/
    tag: Blog
    text: "Présentation de la Service\_Map dans Datadog"
  - link: https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/
    tag: Blog
    text: "Création d'un contexte avec la Service\_Map (Datadog + Airbnb)"
---
La Service Map affiche l'ensemble des [services][1] qui composent votre application et fait apparaître en temps réel les dépendances observées entre ces services, vous permettant ainsi d'identifier les goulots d'étranglement et de visualiser les flux de données au sein de votre architecture.

{{< img src="tracing/visualization/services_map/service_map_overview-2.png" alt="Vue d'ensemble de la Service Map" >}}

## Implémentation

La Service Map permet de visualiser les données recueillies par les fonctions APM et RUM de Datadog. Aucune configuration n'est requise pour afficher les [services][1].

## Comment l'utiliser

La Service Map fournit une vue d'ensemble de vos services et de leur état. Elle vous permet de réduire le bruit et d'isoler les zones à problèmes. En outre, vous pouvez accéder à d'autres données de télémétrie recueillies par Datadog directement à partir de cette vue.

## Filtrage et modification de contextes

Vous pouvez filtrer la Service Map en ajoutant des [facettes][2] ou en recherchant des noms de service via une correspondance de chaîne approximative. Les facettes sont des tags que Datadog appliquent automatiquement aux données des services. Elles incluent le type de service (serveur Web, base de données, cache ou encore cache), la date du dernier déploiement ou le statut du monitor. Les filtres sont particulièrement utiles dans un environnement composé de microservices, avec des centaines ou des milliers de nœuds. Vous pouvez également restreindre l'intervalle de la Service Map, afin de surveiller l'évolution de votre architecture.

Les services sont également filtrés en fonction de leur `env` et d'un [deuxième tag primaire][3] (facultatif). Lorsque vous utilisez les menus déroulants pour sélectionner un contexte différent, une nouvelle carte illustrant les services correspondants à ce contexte est alors générée. Ces services ne peuvent pas appeler ni être appelés par des services dans d'autres environnements.

## Inspection

Lorsque vous survolez un service avec la souris, cela le met en évidence et affiche le trafic de requêtes correspondant s'affiche sous forme de lignes animées afin de mieux identifier le sens de transfert des données.

{{< img src="tracing/visualization/services_map/servicemap-anim.mp4" alt="Service Map" video="true" width="90%" >}}

Lorsque vous cliquez sur un service, une option vous permettant de l'inspecter apparaît. Il est ainsi possible d'isoler le service, d'afficher la source des requêtes provenant d'autres services, et de visualiser les requêtes pour les données envoyées par ce service vers d'autres services. Généralement, les services sur la gauche sont plus proches de vos clients, tandis que ceux sur la droite sont plus susceptibles de correspondre à l'origine d'un problème.

La page d'inspection vous permet d'inspecter chaque nœud séparément et d'effectuer des pivotements dans la Service Map en fonction d'une dépendance à la fois.

{{< img src="tracing/visualization/services_map/servicemap.png" alt="Service Map" style="width:90%;">}}

## Le tag « service »

Lorsque vous cliquez sur un service, des options de filtrage supplémentaires s'affichent :

{{< img src="tracing/visualization/services_map/servicetag-2.png" alt="Tag de la Service Map" style="width:40%;">}}

Le tag service a une signification bien particulière dans Datadog : il est utilisé à la fois pour identifier les services APM et pour les associer à d'autres éléments du produit.

La capture d'écran suivante illustre une requête de dashboard pour `service:fse-auto-process`. Cet élément est automatiquement tagué par l'APM.

{{< img src="tracing/visualization/services_map/servicedash.png" alt="Dashboard de la Service Map" style="width:90%;">}}

Lorsque vous utilisez ce tag sur votre hostmap ou des logs avec la même clé, Datadog est alors en mesure d'associer des applications à des logs, à une infrastructure ou à des métriques custom. Dans le menu de la visualisation ci-dessus, chaque option pivote vers la vue appropriée des données recueillies dans le contexte de votre `service`.

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="Tags de la Service Map" style="width:80%;">}}

En outre, les monitors peuvent être tagués par service dans la section « Say what's happening ». Vous pouvez ainsi associer les monitors de n'importe quelle métrique, y compris d'une métrique custom, à vos services. L'état des monitors s'affiche directement sur la Service Map.

{{< img src="tracing/visualization/services_map/servicemon.png" alt="Monitors de la Service Map" style="width:90%;">}}

## Pertinence et signification des données

### Nœuds et arêtes

Les nœuds représentent les services tels qu'ils sont instrumentés dans l'APM et correspondent à ceux qui apparaissent sur votre page [Services][4]. Les arêtes représentent les appels agrégés d'un service à l'autre. Ces interactions sont illustrées dans le flamegraph pour chaque [trace][5] individuelle.

Les nouveaux services ou les nouvelles connexions s'affichent peu de temps après leur instrumentation et disparaissent si aucune trace correspondante n'est détectée pendant 30 jours. Ce système prend en compte les services qui ne fonctionnent que rarement, mais qui jouent un rôle essentiel dans un système opérationnel.

{{< img src="tracing/visualization/services_map/servicenodes.mp4" alt="Nœuds de la Service Map" video="true" width="90%">}}

### Couleur

Si un monitor est activé pour un service, la circonférence présente une bordure pondérée verte, jaune, rouge ou grise, en fonction de l'état de ce monitor. Si plusieurs monitors sont définis, le monitor présentant l'état le plus critique est utilisé.

Les monitors ne se limitent pas aux monitors d'APM. Le tag service décrit ci-dessus peut être utilisé pour associer n'importe quel type de monitor à un service.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#services
[2]: /fr/tracing/visualization/services_list/#facets
[3]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: https://app.datadoghq.com/apm/services
[5]: /fr/tracing/visualization/#trace