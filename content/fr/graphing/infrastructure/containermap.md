---
title: Présentation de la Container Map
kind: documentation
aliases:
  - /fr/infrastructure/hostmap/
  - /fr/guides/hostmap
further_reading:
  - link: graphing/infrastructure/livecontainers
    tag: Graphiques
    text: Consulter en temps réel tous les conteneurs de votre environnement
  - link: graphing/infrastructure/process
    tag: Graphiques
    text: Découvrir ce qui se passe à tous les niveaux de votre système
---
## Présentation

Tout comme les [Hostmaps][1], les [Container Maps][2] vous permettent d'obtenir une vue d'ensemble de la santé de vos conteneurs. Datadog s'intègre à ECS, Docker, Kubernetes et bien d'autres solutions. Vous pouvez visualiser conjointement tous vos conteneurs depuis un seul écran en utilisant des regroupements et des filtres personnalisés. En outre, vous pouvez ajouter des couleurs et des formes aux métriques pour améliorer leur lisibilité.

Grâce aux Container Maps, vous pouvez détecter les singularités, identifier les modèles d'utilisation, éviter les problèmes de ressources et prendre des décisions avisées pour gérer au mieux vos conteneurs, le tout depuis une vue unique. Que vous ayez 10, 100 ou 10 000 conteneurs, [Autodiscovery][3] détecte automatiquement les nouveaux conteneurs et les inclut dans les analyses.

{{< img src="graphing/infrastructure/containermap/containermap.png" alt="container map partie 1"  style="width:80%;">}}

## Installation
Une fois l'[Agent][4] déployé, aucune autre configuration n'est requise. Pour recueillir des informations sur les conteneurs Docker avec l'installation standard plutôt qu'avec l'[Agent Docker][5], l'Agent `dd-agentuser` doit être autorisé à accéder à `docker.sock`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/infrastructure/hostmap
[2]: https://app.datadoghq.com/infrastructure/map?node_type=container
[3]: /fr/agent/autodiscovery
[4]: /fr/agent
[5]: /fr/agent/docker