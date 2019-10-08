---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_VPN."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_vpn/'
git_integration_title: amazon_vpn
has_logo: true
integration_title: "Amazon\_VPN"
is_public: true
kind: integration
manifest_version: 1
name: amazon_vpn
public_title: "Intégration Datadog/Amazon\_VPN"
short_description: "Surveillez des métriques clés d'Amazon\_VPN."
version: 1
---
## Présentation
Amazon Virtual Private Network (VPN) vous permet d'établir un tunnel privé et sécurisé depuis votre réseau ou appareil vers un réseau global AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de VPN.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `VPN` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon VPN][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_vpn" >}}


### Événements
L'intégration Amazon VPN n'inclut aucun événement.

### Checks de service
L'intégration Amazon VPN n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-vpn
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpn/amazon_vpn_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}