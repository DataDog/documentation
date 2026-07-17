---
app_id: shoreline-software-license
app_uuid: d1da5605-5ef5-47bc-af8d-16005945e21e
assets: {}
author:
  homepage: https://shoreline.io/
  name: Shoreline.io
  sales_email: sales@shoreline.io
  support_email: support@shoreline.io
  vendor_id: shoreline
categories:
- automation
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: shoreline_license
integration_id: shoreline-software-license
integration_title: Shoreline.io
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/terms_of_service_shoreline.pdf
manifest_version: 2.0.0
name: shoreline_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.shoreline.shoreline
  product_id: software-license
  short_description: Par host/mois. Aucun coût supplémentaire pour les pods ou les
    conteneurs.
  tag: host
  unit_label: Host
  unit_price: 25
public_title: Shoreline.io
short_description: Automatiser le rétablissement des monitors déclenchés
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Automation
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Automatiser le rétablissement des monitors déclenchés
  media:
  - caption: Dashboard de remédiation
    image_url: images/remediation_dashboard.png
    media_type: image
  - caption: Exemple de configuration d'automatisation de la remédiation
    image_url: images/automate_remediation.png
    media_type: image
  - caption: Exemple de debugging et de rétablissement interactifs pour tout un parc
    image_url: images/fleetwide_interactive_debugging_and_repair.png
    media_type: image
  - caption: Exemple de détails des commandes Linux pour tout un parc
    image_url: images/fleetwide_linux_command_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Shoreline.io
---



## Présentation

L'outil d'automatisation des incidents Shoreline permet à vos ingénieurs de fiabilité de site (SRE) et DevOps d'effectuer des opérations interactives de **debugging à grande échelle** et de concevoir rapidement des **processus de remédiation** afin de ne plus avoir à gérer manuellement les étapes répétitives.

La fonctionnalité de debugging et de rétablissement vous permet d'exécuter en temps réel des commandes sur l'ensemble de vos serveurs, sans avoir à accéder à chaque serveur par SSH. Vous pouvez exécuter tous les éléments saisissables dans l'invite de commande Linux, notamment des commandes Linux, des scripts shell et des appels vers des API de fournisseur de cloud, puis automatiser vos étapes de debugging liées aux monitors Datadog.

L'application Shoreline lance l'automatisation lorsque le monitor se déclenche, ce qui réduit considérablement le temps moyen de rétablissement (MTTR) ainsi que les tâches manuelles.

Avec Shoreline, vos ingénieurs SRE se soutiennent tous mutuellement. Votre équipe d'astreinte dispose d'outils de debugging et d'actions de remédiation approuvées, ce qui lui permet de corriger plus rapidement les incidents, de limiter le nombre de réaffectations et de résoudre efficacement les nouveaux problèmes en commettant moins d'erreurs.

Pour commencer, créez un compte [Shoreline][3] et commencez votre offre d'essai.
## Assistance

Si vous avez besoin d'aide ou si vous avez des questions, contactez Shoreline par e-mail.

E-mail : [support@shoreline.io][2]
Pour en savoir plus, consultez la [documentation Shoreline][9] (en anglais).

[1]: images/integrate_shoreline_and_datadog.png
[2]: mailto:support@shoreline.io
[3]: https://shoreline.io/datadog?source=DatadogMarketplace
[4]: https://docs.shoreline.io/integrations/datadog
[5]: https://docs.shoreline.io/installation/kubernetes
[6]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[7]: https://docs.shoreline.io/installation/virtual-machines
[8]: images/link_icon.svg
[9]: https://docs.shoreline.io/
[10]: https://app.datadoghq.com/account/settings#integrations/shoreline-integration
---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/shoreline-software-license" target="_blank">Cliquez ici</a> pour l'acheter.