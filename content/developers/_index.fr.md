---
title: Outils de développement
kind: documentation
description: Collecter des métriques custom et créer une nouvelle intégration
---

Les outils de surveillance se doivent d'être flexibles, c'est pourquoi nous offrons plusieurs façons d'interagir avec Datadog. Cette section vous donne un aperçu rapide des différentes méthodes disponibles.

## API
Datadog dispose d'une API puissante pour accéder à son service. Vous pouvez soumettre des métriques custom, gérer les dashboards et les monitors; planifier les temps d'arrêt; et effectuer des actions administratives.
Les endpoints disponibles peuvent être trouvés sur [notre page dédiée à la documentation de l'API][1].

De plus, [de nombreuses bibliothèques][2] sont disponibles pour interagir directement avec l'API.

## Envoie de métriques custom
Bien que vous puissiez soumettre des métriques directement via [notre API][1], vous pouvez également soumettre des métriques via l'agent Datadog en utilisant [DogStatsD][3] et des checks custom.

L'Agent Datadog inclut DogStatsD, un puissant démon statsd avec des fonctionnalités supplémentaires qui offrent un meilleur contrôle sur vos métadonnées et l'agrégation de métriques.
[Plusieurs bibliothèques][4] sont disponibles pour envoyer facilement des métriques depuis votre application à Datadog en utilisant [DogStatsD][3].

L'API et [DogStatsD][3] sont pratiques pour _push_  des metriques à Datadog depuis l'une de vos applications.
Si vous souhaitez régulièrement _pull_ des métriques issues d'un système particulier, similaire à ce qui est fait par l'agent pour les systèmes que nous supportons, vous pouvez [ajouter votre propre intégration][5]. Nous avons fourni des étapes détaillées et des ressources pour [le développement][6] et [le testing][7] de nouvelles intégrations.
Ces intégrations peuvent ensuite être facilement partagées avec la communauté Datadog, par exemple via notre repository github [Datadog / integrations-extras ][8]

Lorsque vous envoyez des métriques via [DogStatsD][3] ou une via une intégration personnalisée, il est utile d'avoir une meilleure compréhension des métriques. Voici quelques ressources techniques concernant les métriques:

* [En savoir plus sur le comportement de métriques][9]

* [En savoir plus sur les différents types de métriques][9]

## APM
Consultez nos [bibliothèque de tracing pour l'APM][10], afin de les utiliser ou d'y contribuer. Un soutien sur de nouveaux languages peut être proposé par la communauté, ainsi que des intégrations pour l'APM.

## Intégrations de la communauté
De nombreux utilisateurs de notre communauté ont déjà créé [des intégrations][11] avec un grand nombre d'applications couramment utilisées.
Ces ressources sont utiles comme références lors de la création d'une nouvelle intégration d'agent.


[1]: /api
[2]: /developers/libraries/#api-and-dogstatsd-client-libraries
[3]: /developers/dogstatsd
[4]: /developers/libraries
[5]: /developers/integrations/
[6]: /developers/integrations/integration_sdk
[7]: /developers/integrations/testing/
[8]: https://github.com/DataDog/integrations-extras
[9]: /developers/metrics
[10]: /developers/libraries/#apm-tracing-client-libraries
[11]: /developers/libraries/#community-integrations
