---
app_id: superwise-license
app_uuid: f15082a6-d0ed-4f6f-a315-f7cbcaae6823
assets: {}
author:
  homepage: https://www.superwise.ai
  name: Superwise
  sales_email: sales@superwise.ai
  support_email: support@superwise.ai
  vendor_id: superwise
categories:
- marketplace
- automation
- notification
- monitoring
classifier_tags:
- Supported OS::Linux
- Supported OS::Mac OS
- Supported OS::Windows
- Category::Marketplace
- Category::Automation
- Category::Notification
- Category::Monitoring
- Offering::Software License
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: superwise_license
integration_id: superwise-license
integration_title: Superwise Model Observability
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: superwise_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.superwise
  product_id: license
  short_description: Tarif par modèle et par mois (régressif en fonction du nombre
    de modèles)
  tag: models
  unit_label: Modèle surveillé
  unit_price: 199.0
public_title: Superwise Model Observability
short_description: Plateforme SaaS de surveillance et d'observabilité ML en libre
  service
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Plateforme SaaS de surveillance et d'observabilité ML en libre service
  media:
  - caption: La plateforme Superwise permet aux ingénieurs ML de surveiller la santé
      de modèles en production et de réduire les délais de détection et de résolution.
    image_url: images/1_4.png
    media_type: image
  - caption: Le dashboard Superwise Model Observability vous permet de gagner instantanément
      en visibilité sur l'activité des modèles, leur désynchronisation et les incidents
      non résolus.
    image_url: images/2_4.png
    media_type: image
  - caption: Les incidents Superwise vous permettent d'étudier en détail les violations
      de stratégie de surveillance et d'identifier rapidement la cause à l'origine
      des problèmes.
    image_url: images/3_4.png
    media_type: image
  - caption: Grâce à l'outil de création de stratégie de surveillance, vous pouvez
      facilement configurer des stratégies pour l'ensemble de vos métriques, fonctionnalités
      et sous-catégories de population, puis les envoyer à Datadog.
    image_url: images/4_4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Superwise Model Observability
---



## Présentation
Superwise offre une solution professionnelle de surveillance de la santé des modèles de machine learning (ML) en production, afin de détecter rapidement les problèmes de performance et d'intégrité de modèles pour l'ensemble du flux d'inférence. Superwise configure les métriques des modèles, analyse les événements et effectue la mise en corrélation des anomalies à la place des ingénieurs ML et des techniciens. Vos équipes peuvent ainsi consulter facilement l'emplacement des modèles défectueux, ainsi que la date d'apparition et l'origine des problèmes connexes. Elles peuvent donc agir plus rapidement, avant que les problèmes n'affectent les résultats de l'entreprise.


Grâce à la plateforme d'observabilité de modèles Superwise, vous pouvez surveiller vos processus ML en production, et faire évoluer vos capacités en cas de besoin. Lorsque vous souscrivez un abonnement à Superwise via le Marketplace Datadog, vous bénéficiez d'une période d'essai de 14 jours, pour autant de modèles que vous le souhaitez. Une fois cette période terminée, la surveillance de vos trois premiers modèles est gratuite, sans limite de temps. La tarification de Superwise étant basée sur l'utilisation, vous pouvez augmenter ou réduire vos capacités de surveillance à tout moment. Pour en savoir plus, contactez Superwise à l'adresse sales@superwise.ai.

Vous pouvez souscrire un abonnement à Superwise depuis le carré dédié. Si vous possédez déjà un compte Superwise, cliquez sur le [carré d'intégration Superwise](https://app.datadoghq.com/account/settings#integrations/superwise) afin de configurer l'intégration Datadog/Superwise.

À l'aide de cette intégration, les utilisateurs Datadog peuvent étudier au sein de leurs workflows Datadog la santé globale de leurs modèles ML. Pour améliorer leur visibilité, il est possible d'inclure des métriques et incidents Superwise provenant d'autres modèles défectueux. Les utilisateurs Superwise peuvent configurer la surveillance de leurs principales métriques custom dans Superwise, puis transmettre les insights obtenus à Datadog afin de gagner en visibilité, peu importe le scénario.
## Assistance

Besoin d'aide ? Consultez le [Centre de connaissances Superwise](https://docs.superwise.ai) (en anglais) ou contactez l'équipe d'assistance Superwise.