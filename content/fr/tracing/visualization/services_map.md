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
  - link: 'https://www.datadoghq.com/blog/service-map/'
    tag: Blog
    text: "Présentation de la Service\_Map dans Datadog"
  - link: 'https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/'
    tag: Blog
    text: "Création d'un contexte avec la Service\_Map (Datadog + Airbnb)"
---
La Service Map affiche l'ensemble des [services][1] qui composent votre application et fait apparaître en temps réel les dépendances observées entre ces services, vous permettant ainsi d'identifier les goulots d'étranglement et de visualiser les flux de données au sein de votre architecture.

{{< img src="tracing/visualization/services_map/service_map_overview.png" alt="Présentation de Service Map" >}}

## Implémentation

La Service Map permet de visualiser les données recueillies par les fonctions APM et RUM de Datadog. Aucune configuration n'est requise pour afficher les [services][1].

## Comment l'utiliser

La Service Map a été conçue pour fournir un aperçu de vos services et de leur état, vous permettant ainsi de réduire le bruit et d'isoler les zones à problèmes. En outre, vous pouvez accéder à d'autres données de télémétrie recueillies par Datadog directement à partir de cette vue.

## Filtrage et modification de contextes

La Service Map peut être filtrée en fonction du type de service (webserver, database, cache, etc.) ou d'une correspondance de chaîne approximative. Cette fonctionnalité est particulièrement utile dans un environnement de micro-services composé de centaines de milliers de nœuds. En outre, les données d'un service peuvent être filtrées en fonction d'un intervalle spécifique, ce qui est idéal pour surveiller votre architecture à mesure qu'elle évolue.

Les services sont également filtrés en fonction de leur `env` et d'un [deuxième tag primaire][2] (facultatif). Lorsque vous utilisez les menus déroulants pour sélectionner un contexte différent, une nouvelle carte illustrant les services correspondants à ce contexte est alors générée. Ces services ne peuvent pas appeler ni être appelés par des services dans d'autres environnements.

## Inspection

Lorsque vous survolez un service avec la souris, cela le met en évidence et affiche le trafic de requêtes correspondant s'affiche sous forme de lignes animées afin de mieux identifier le sens de transfert des données.

{{< img src="tracing/visualization/services_map/servicemap-anim.mp4" alt="Service Map" video="true"  width="90%" >}}

Lorsque vous cliquez sur un service, une option vous permettant de l'inspecter apparaît. Il est ainsi possible d'isoler le service, d'afficher la source des requêtes provenant d'autres services, et de visualiser les requêtes pour les données envoyées par ce service vers d'autres services. Généralement, les services sur la gauche sont plus proches de vos clients, tandis que ceux sur la droite sont plus susceptibles de correspondre à l'origine d'un problème.

La page d'inspection vous permet d'inspecter chaque nœud séparément et d'effectuer des pivotements dans la Service Map en fonction d'une dépendance à la fois.

{{< img src="tracing/visualization/services_map/servicemap.png" alt="Service Map"  style="width:90%;">}}

## Le tag « service »

Lorsque vous cliquez sur un service, des options vous permettant de l'examiner plus en détail s'affichent :

{{< img src="tracing/visualization/services_map/servicetag.png" alt="Tag Service Map"  style="width:40%;">}}

Le tag service a une signification bien particulière dans Datadog : il est utilisé à la fois pour identifier les services APM et pour les associer à d'autres éléments du produit.

La capture d'écran suivante illustre une requête de dashboard pour `service:fse-auto-process`. Cet élément est automatiquement tagué par l'APM.

{{< img src="tracing/visualization/services_map/servicedash.png" alt="Dashboard Service Map" style="width:90%;">}}

Lorsque vous utilisez ce tag sur votre Hostmap ou des logs avec la même clé, Datadog est alors en mesure d'associer des applications à des logs, à une infrastructure ou à des métriques custom. Dans le menu contextuel ci-dessus, chaque option pivote vers la vue appropriée des données recueillies dans le contexte de votre `service`.

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="Tags Service Map" style="width:80%;">}}

En outre, les monitors peuvent être tagués par service dans la section « Say what's happening ». Vous pouvez ainsi associer les monitors de n'importe quelle métrique, y compris d'une métrique custom, à vos services. L'état des monitors s'affiche directement sur la Service Map.

{{< img src="tracing/visualization/services_map/servicemon.png" alt="Monitor Service Map" style="width:90%;">}}

## Pertinence et signification des données

### Nœuds et arêtes

Les nœuds représentent les services tels qu'ils sont instrumentés dans l'APM et correspondent à ceux qui apparaissent sur votre page [Services][3]. Les arêtes représentent les appels agrégés d'un service à l'autre. Ces interactions sont illustrées dans le graphique de performances pour chaque [trace][4] individuelle.

Les nouveaux services ou les nouvelles connexions s'affichent peu de temps après leur instrumentation et deviennent obsolètes si aucune trace correspondante n'est détectée pendant 30 jours. Ce système prend en compte les services qui ne fonctionnent que rarement, mais qui jouent un rôle essentiel dans un système opérationnel.

{{< img src="tracing/visualization/services_map/servicenodes.mp4" alt="nœuds Service Map" video="true" width="90%">}}

### Couleur

Si un monitor est activé pour un service, la circonférence présente une bordure pondérée verte, jaune, rouge ou grise, en fonction de l'état de ce monitor. Si plusieurs monitors sont définis, le monitor présentant l'état le plus critique est utilisé.

Les monitors ne se limitent pas aux monitors d'APM. Le tag service décrit ci-dessus peut être utilisé pour associer n'importe quel type de monitor à un service.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#services
[2]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[3]: https://app.datadoghq.com/apm/services
[4]: /fr/tracing/visualization/#trace