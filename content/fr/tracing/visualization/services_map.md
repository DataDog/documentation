---
title: Service Map
kind: documentation
description: "La Service\_Map permet de visualiser les données recueillies par l'APM Datadog."
aliases:
  - /fr/tracing/servicemap
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: 'https://www.datadoghq.com/blog/service-map/'
    tag: Blog
    text: "Présentation de la Service\_Map dans Datadog"
  - link: 'https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/'
    tag: Blog
    text: "Création d'un contexte avec la Service\_Map (Datadog + Airbnb)"
---
La Service Map déconstruit votre application pour afficher tous les services qui la composent et dessiner les dépendances observées entre ces services en temps réel, ce qui vous permet d'identifier les goulots d'étranglement et de comprendre la circulation des données dans votre architecture.

{{< img src="tracing/visualization/services_map/service_map_overview.png" alt="Présentation de Service Map" responsive="true">}}

## Implémentation

La Service Map permet de visualiser les données recueillies par l'APM Datadog. Aucune configuration n'est requise pour afficher les services.

## Comment l'utiliser

La Service Map a été conçue pour fournir un aperçu de vos services et de leur état, vous permettant ainsi de réduire le bruit et d'isoler les zones à problèmes. En outre, vous pouvez accéder à d'autres données de télémétrie recueillies par Datadog directement à partir de cette vue.

## Filtrage et modification de contextes

La Service Map peut être filtrée en fonction du type de service (webserver, database, cache, etc.) ou d'une correspondance de chaîne approximative. Cette fonctionnalité est particulièrement utile dans un environnement de micro-services composé de centaines de milliers de nœuds.

Il est possible d'ajouter des services à un contexte via l'option `env` et une [dimension de première classe][1] (facultative). Lorsque vous utilisez les menus déroulants pour sélectionner un contexte différent, une Service Map composée des services correspondants à ce contexte apparaît alors. Ces services ne peuvent pas appeler ni être appelés par d'autres services dans d'autres environnements.

## Inspection

Lorsque vous survolez un service avec la souris, cela le met en évidence et affiche le trafic de requêtes correspondant s'affiche sous forme de lignes animées afin de mieux identifier le sens de transfert des données.

{{< img src="tracing/visualization/services_map/servicemap-anim.gif" alt="Service Map" responsive="true" style="width:90%;">}}

Lorsque vous cliquez sur un service, une option vous permettant de l'inspecter apparaît. Il est ainsi possible d'isoler le service, d'afficher la source des requêtes provenant d'autres services, et de visualiser les requêtes pour les données envoyées par ce service vers d'autres services. Généralement, les services sur la gauche sont plus proches de vos clients, tandis que ceux sur la droite sont plus susceptibles de correspondre à l'origine d'un problème.

La page d'inspection vous permet d'inspecter chaque nœud séparément et d'effectuer des pivotements dans la Service Map en fonction d'une dépendance à la fois.

{{< img src="tracing/visualization/services_map/servicemap.png" alt="Service Map" responsive="true" style="width:90%;">}}

## Le tag « service »

Lorsque vous cliquez sur un service, des options vous permettant de l'examiner plus en détail s'affichent :

{{< img src="tracing/visualization/services_map/servicetag.png" alt="Tag Service Map" responsive="true" style="width:40%;">}}

Le tag service a une signification bien particulière dans Datadog : il est utilisé à la fois pour identifier les services APM et pour les associer à d'autres éléments du produit.

La capture d'écran suivante illustre une requête de dashboard pour `service:fse-auto-process`. Cet élément est automatiquement tagué par l'APM.

{{< img src="tracing/visualization/services_map/servicedash.png" alt="Dashboard Service Map" responsive="true" style="width:90%;">}}

Lorsque vous utilisez ce tag sur votre Hostmap ou des logs avec la même clé, Datadog est alors en mesure d'associer des applications à des logs, à une infrastructure ou à des métriques custom. Dans le menu contextuel ci-dessus, chaque option pivote vers la vue appropriée des données recueillies dans le contexte de votre `service`.

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="Tags Service Map" responsive="true" style="width:80%;">}}

En outre, les monitors peuvent être tagués par service dans la section « Say what's happening ». Vous pouvez ainsi associer les monitors de n'importe quelle métrique, y compris d'une métrique custom, à vos services. L'état des monitors s'affiche directement sur la Service Map.

{{< img src="tracing/visualization/services_map/servicemon.png" alt="Monitor Service Map" responsive="true" style="width:90%;">}}

## Pertinence et signification des données

### Nœuds et arêtes

Les nœuds représentent les services tels qu'ils sont instrumentés dans l'APM. Ils sont identiques à ceux de votre page [Services][3]. Les arêtes représentent les appels agrégés d'un service à l'autre. Ces interactions sont illustrées sur le graphique de performances pour chaque trace individuelle.

Les nouveaux services ou les nouvelles connexions s'affichent peu de temps après leur instrumentation et deviennent obsolètes si aucune trace correspondante n'est détectée pendant deux semaines. Ce système prend en compte les services qui ne fonctionnent que rarement, mais qui jouent un rôle essentiel dans un système opérationnel.

{{< img src="tracing/visualization/services_map/servicenodes.gif" alt="Nœuds Service Map" responsive="true" style="width:90%;">}}

### Couleur

Si un monitor est activé pour un service, la circonférence présente une bordure pondérée verte, jaune, rouge ou grise, en fonction de l'état de ce monitor. Si plusieurs monitors sont définis, le monitor présentant l'état le plus critique est utilisé.

Les monitors ne se limitent pas aux monitors d'APM. Le tag service décrit ci-dessus peut être utilisé pour associer n'importe quel type de monitor à un service.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/setup/first_class_dimensions
[2]: https://app.datadoghq.com/apm/services