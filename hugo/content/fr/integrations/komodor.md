---
app_id: komodor
app_uuid: 995fe904-e761-4f2f-8dbf-148baf3f080a
assets: {}
author:
  homepage: https://komodor.com/
  name: Komodor
  sales_email: sales@komodor.com
  support_email: support@komodor.com
categories:
- containers
- kubernetes
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/komodor/README.md
display_on_public_website: true
draft: false
git_integration_title: komodor
integration_id: komodor
integration_title: Komodor Automation
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: Komodor Terms of use.pdf
manifest_version: 2.0.0
name: komodor
public_title: Komodor Automation
short_description: Effectuer le suivi des changements relatifs à l'ensemble de votre
  pile et environnement Kubernetes
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Notification
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Effectuer le suivi des changements relatifs à l'ensemble de votre pile
    et environnement Kubernetes
  media:
  - caption: Écran principal des services
    image_url: images/Komodor_screen_01.png
    media_type: image
  - caption: Chronologie des événements et services connexes de la vue des services
    image_url: images/Komodor_screen_02.png
    media_type: image
  - caption: Examen d'un déploiement et des changements associés dans la vue des services
    image_url: images/Komodor_screen_03.png
    media_type: image
  - caption: Examen du replicaset d'un déploiement ainsi que de ses pods et logs
    image_url: images/Komodor_screen_04.png
    media_type: image
  - caption: Chronologie des événements de plusieurs clusters et déploiements
    image_url: images/Komodor_screen_05.png
    media_type: image
  - caption: Alerte de surveillance Datadog dans la vue des services
    image_url: images/Komodor_screen_06.png
    media_type: image
  - caption: Lien menant vers Komodor dans la vue des métriques Datadog
    image_url: images/Komodor_screen_07.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Komodor Automation
---



## Présentation

Komodor vous permet de surveiller les modifications effectuées sur l'ensemble de votre pile Kubernetes, d'analyser leurs répercussions et d'obtenir le contexte dont vous avez besoin pour résoudre les problèmes de manière efficace et autonome. Ce service vous offre la possibilité de visualiser l'historique de vos déploiements Kubernetes avec des informations utiles comme les modifications effectuées, le code déployé et l'auteur de ce code. Vous pouvez également visualiser les données issues de Git, des config maps, de votre infrastructure, des alertes et d'autres outils tels que Datadog depuis une interface facile à comprendre.

Grâce à cette intégration, vous pouvez associer des métriques Datadog à des liens de déploiement dynamiques et ainsi accéder directement aux dashboards pertinents. Résultat : vous pouvez résoudre les problèmes liés à vos microservices en tenant compte du contexte, des connexions et des dépendances de service que Datadog considère comme pertinents. 

## Configuration

1. Connectez-vous à la [plateforme Komodor][1].
2. À l'aide d'un chart Helm ou de Kustomize, installez l'Agent de pod sur chaque cluster Kubernetes. Pour en savoir plus sur l'installation de l'Agent, consultez la [documentation Komodor][2] (en anglais).

3. Une fois l'Agent installé, suivez les étapes ci-dessous pour configurer l'intégration Datadog :
    - Installez l'[intégration de la plateforme Komodor][3]. Durant cette première étape, Komodor accède à votre compte Datadog via une clé d'API et une clé de token, et vous suggère des services connexes en fonction des dépendances de service détectées dans Datadog.
    - Installez l'[intégration Webhook Datadog][4]. Komodor recevra ainsi les alertes des monitors Datadog. Vous pouvez afficher toutes les alertes dans la vue des services de Komodor.
    - Configurez une notification de monitor Datadog. L'ajout d'un [lien dynamique][5] Komodor dans vos [notifications de monitor][6] Datadog permet de générer un lien direct vers le service concerné dans Komodor. Accédez au lien de l'alerte depuis la solution d'alerte qui est associée à Datadog.

4. Utilisez les [annotations][7] Kubernetes pour ajouter des liens vers les dashboards APM Datadog pertinents dans les écrans de vos déploiements et services Komodor. Vous pouvez également inclure des liens dynamiques vers des métriques de service et des intervalles spécifiques dans Datadog.

## Assistance

Pour plus d'informations, veuillez [consulter notre site Web][8] ou [nous contacter][9].

[1]: https://app.komodor.com/
[2]: https://docs.komodor.com/Learn/Komodor-Agent.html
[3]: https://docs.komodor.com/Integrations/Datadog.html
[4]: https://docs.komodor.com/Integrations/datadog-webhook.html
[5]: https://docs.komodor.com/Integrations/Datadog-Monitor-Notification.html
[6]: https://docs.datadoghq.com/fr/monitors/notify/
[7]: https://docs.komodor.com/Learn/Annotations.html
[8]: https://komodor.com/sign-up/
[9]: https://komodor.com/contact-us/