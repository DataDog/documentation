---
categories:
  - containers
ddtype: check
dependencies: []
description: Surveiller les métriques de Docker avec Datadog
doc_link: https://docs.datadoghq.com/integrations/docker/
draft: false
further_reading:
  - link: https://www.datadoghq.com/blog/monitor-kubernetes-docker/
    tag: Blog
    text: Comment surveiller Kubernetes et Docker avec Datadog
  - link: https://www.datadoghq.com/blog/docker-logging/
    tag: Blog
    text: Meilleures pratiques de journalisation pour Docker
git_integration_title: docker
has_logo: true
integration_id: docker
integration_title: Docker
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: docker
public_title: Intégration Datadog/Docker
short_description: Surveiller les métriques de Docker avec Datadog
version: '1.0'
---
## Présentation

Docker est un projet open source qui permet d'automatiser le déploiement d'applications au sein de conteneurs logiciels.

Recueillez des métriques de Docker en temps réel pour :

- Visualiser les performances de vos conteneurs
- Corréler les performances de vos conteneurs avec les applications qui s'exécutent dans ces conteneurs

## Configuration

Pour Docker, il est recommandé d'exécuter l'Agent dans un conteneur. Consultez la documentation relative à l'[Agent Docker][1].

## Données collectées

Consultez la documentation relatives aux [données Docker recueillies][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/fr/agent/docker/
[2]: https://docs.datadoghq.com/fr/agent/docker/data_collected/