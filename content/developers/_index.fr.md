---
title: Outils de développement
kind: documentation
description: Collecter des métriques custom et créer une nouvelle intégration
---

Les outils de surveillance se doivent d'être flexibles, c'est pourquoi nous offrons plusieurs façons d'interagir avec Datadog. Cette section vous donne un aperçu rapide des différentes méthodes disponibles.

## API
Datadog dispose d'une API puissante pour accéder à son service. Vous pouvez soumettre des métriques custom, gérer les dashboards et les monitors; planifier les temps d'arrêt; et effectuer des actions administratives.
Les endpoints disponibles peuvent être trouvés sur [notre page dédiée à la documentation de l'API](/api).

De plus, [de nombreuses bibliothèques](/developers/libraries/#api-and-dogstatsd-client-libraries) sont disponibles pour interagir directement avec l'API.

## Envoie de métriques custom
Bien que vous puissiez soumettre des métriques directement via [notre API](/api), vous pouvez également soumettre des métriques via l'agent Datadog en utilisant [DogStatsD](/developers/dogstatsd) et des checks custom.

L'Agent Datadog inclut DogStatsD, un puissant démon statsd avec des fonctionnalités supplémentaires qui offrent un meilleur contrôle sur vos métadonnées et l'agrégation de métriques.
[Plusieurs bibliothèques](/developers/libraries) sont disponibles pour envoyer facilement des métriques depuis votre application à Datadog en utilisant [DogStatsD](/developers/dogstatsd).

L'API et [DogStatsD](/developers/dogstatsd) sont pratiques pour _push_  des metriques à Datadog depuis l'une de vos applications.
Si vous souhaitez régulièrement _pull_ des métriques issues d'un système particulier, similaire à ce qui est fait par l'agent pour les systèmes que nous supportons, vous pouvez [ajouter votre propre intégration](/developers/integrations/). Nous avons fourni des étapes détaillées et des ressources pour [le développement](/developers/integrations/integration_sdk) et [le testing](/developers/integrations/testing/) de nouvelles intégrations.
Ces intégrations peuvent ensuite être facilement partagées avec la communauté Datadog, par exemple via notre repository github [Datadog / integrations-extras ](https://github.com/DataDog/integrations-extras)

Lorsque vous envoyez des métriques via [DogStatsD](/developers/dogstatsd) ou une via une intégration personnalisée, il est utile d'avoir une meilleure compréhension des métriques. Voici quelques ressources techniques concernant les métriques:

* [En savoir plus sur le comportement de métriques](/developers/metrics)

* [En savoir plus sur les différents types de métriques](/developers/metrics)

## APM
Consultez nos [bibliothèque de tracing pour l'APM](/developers/libraries/#apm-tracing-client-libraries), afin de les utiliser ou d'y contribuer. Un soutien sur de nouveaux languages peut être proposé par la communauté, ainsi que des intégrations pour l'APM.

## Intégrations de la communauté
De nombreux utilisateurs de notre communauté ont déjà créé [des intégrations](/developers/libraries/#community-integrations) avec un grand nombre d'applications couramment utilisées.
Ces ressources sont utiles comme références lors de la création d'une nouvelle intégration d'agent.
