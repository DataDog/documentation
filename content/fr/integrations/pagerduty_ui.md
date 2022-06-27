---
app_id: pagerduty-ui
app_uuid: fbbb4a11-4a8f-4911-bdf7-bd867d9bdfb2
assets:
  dashboards:
    PagerDuty for Datadog: assets/dashboards/pagerduty_overview.json
author:
  homepage: https://pagerduty.com
  name: PagerDuty
  sales_email: sales@pagerduty.com
  support_email: support@pagerduty.com
categories:
  - alerting
  - collaboration
  - issue tracking
  - notification
classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Alerting
  - Category::Collaboration
  - Category::Issue Tracking
  - Category::Notification
  - Offering::UI Extension
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/pagerduty/README.md
display_on_public_website: true
draft: false
git_integration_title: pagerduty_ui
integration_id: pagerduty-ui
integration_title: Interface PagerDuty
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: pagerduty_ui
oauth: {}
public_title: Interface PagerDuty
short_description: Surveiller vos incidents PagerDuty depuis votre dashboard Datadog
supported_os:
  - linux
  - mac os
  - windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Surveiller vos incidents PagerDuty depuis votre dashboard Datadog
  media:
    - caption: Page d'accueil
      image_url: images/landing_page.png
      media_type: image
    - caption: Status Dashboard de PagerDuty
      image_url: images/status_dashboard.jpg
      media_type: image
    - caption: Status Dashboard de PagerDuty
      image_url: images/status_dashboard2.jpg
      media_type: image
    - caption: Incidents de PagerDuty
      image_url: images/incidents.jpg
      media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Interface PagerDuty
---
## Présentation

PagerDuty est une plateforme de gestion des opérations en temps réel qui traite, analyse et achemine en continu des données. Ce système agit en tant que centre d'agrégation pour les données provenant de différents outils de surveillance. PagerDuty vous offre une vue d'ensemble de l'état de vos opérations. Grâce à PagerDuty, les utilisateurs Datadog peuvent gérer plus efficacement les incidents, tout en bénéficiant d'une visibilité et d'une responsabilisation accrues tout au long du cycle de vie des incidents. PagerDuty propose deux nouvelles applications afin que vous puissiez tirer pleinement profit de sa plateforme de gestion des opérations en temps réel où que vous soyez, sans avoir à changer d'outil. Ajoutez directement à vos dashboards les nouveaux widgets, à savoir Status Dashboard de PagerDuty et Incidents de PagerDuty. Vous pourrez ainsi consulter en temps réel le statut de vos services et réagir rapidement en cas d'incident urgent en prenant des mesures en temps réel, directement depuis Datadog.

### Status Dashboard de PagerDuty

Le widget Status Dashboard de PagerDuty fournit une vue partagée qui représente en temps réel la santé du système. Il offre aux équipes techniques et commerciales chargées de répondre aux incidents, ainsi qu'aux responsables techniques et commerciaux, une meilleure compréhension des problèmes opérationnels. Ce widget présente le statut actuel des services et envoie des notifications aux utilisateurs afin de les prévenir lorsque des services métier sont touchés. Il fluidifie les communications lors des incidents entre les équipes de gestion des incidents et les parties prenantes.

#### Principales fonctionnalités

- Les équipes peuvent consulter le dashboard des statuts de service directement dans Datadog, afin de visualiser rapidement et en temps réel la santé de leur système.
- Lorsque des utilisateurs identifient un problème qui nécessite une intervention rapide de l'équipe d'ingénierie, ils peuvent déclencher manuellement un incident depuis l'application Datadog PagerDuty.
- Le widget affiche le statut actuel des principaux services métier, ainsi que des services sous-jacents. Vos équipes bénéficient ainsi de tout le contexte dont elles ont besoin pour gérer les incidents.
- Les communications lors des incidents entre les équipes de gestion des incidents et les parties prenantes sont plus fluides.


#### Prérequis
- Tous les clients PagerDuty peuvent utiliser cette intégration. Toutefois, la fonctionnalité suivante est uniquement réservée aux clients qui bénéficient de l'offre Business Plan PagerDuty ou d'une offre supérieure.

### Incidents de PagerDuty

Le widget Incidents de PagerDuty vous permet de prendre des mesures directement depuis l'interface Datadog. Vous bénéficiez d'informations détaillées sur tous les incidents en cours dans PagerDuty. De plus, grâce à la navigation fluide vers PagerDuty, vous pouvez consulter les incidents et les résoudre sans perdre la moindre information de contexte.

#### Principales fonctionnalités
- Vos équipes peuvent consulter jusqu'à 20 incidents actifs et urgents.
- Vous pouvez consulter des incidents et les résoudre.
- Vous pouvez accéder à PagerDuty pour visualiser les incidents spécifiques et les services concernés, ou encore pour parcourir votre liste d'incidents.


## Configuration

1. Depuis votre compte Datadog, accédez à Dashboards. Sélectionnez le dashboard auquel vous souhaitez ajouter le widget Status Dashboard ou [créez un dashboard][1].

2. Depuis le dashboard, cliquez sur **+ Add Widgets** à droite du titre. Faites défiler vers la droite afin de parcourir les widgets, puis faites glisser le ou les widgets **PagerDuty** à l'emplacement souhaité sur votre dashboard.

3. Cliquez sur **Connect** dans la fenêtre de l'éditeur de widget personnalisé. Sélectionnez **la région de votre service**, puis **connectez-vous** à votre compte PagerDuty. Vous êtes alors redirigé vers l'éditeur de widget personnalisé et un aperçu du widget s'affiche. Sous l'aperçu, dans la section **Widget options**, sélectionnez, si vous le souhaitez, des paramètres supplémentaires par défaut du dashboard. Il est également possible de modifier le **titre du widget**. Cliquez enfin sur **Done** pour ajouter le widget au dashboard.

## Assistance

Pour bénéficier des services PagerDuty, [contactez l'équipe commerciale de PagerDuty][2]. Si vous rencontrez un problème technique, contactez l'[assistance Datadog][3].

Si vous souhaitez passer à une offre PagerDuty comprenant les widgets Status Dashboards et Incidents de PagerDuty, [contactez l'équipe commerciale de PagerDuty][2].

[1]: https://docs.datadoghq.com/fr/dashboards/#new-dashboard
[2]: https://www.pagerduty.com/contact-sales/
[3]: https://www.datadoghq.com/support/