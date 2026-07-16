---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- network
creates_events: false
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vns3/README.md
display_name: VNS3
draft: false
git_integration_title: vns3
guid: 1a7a2c46-37a8-4660-8d71-aaad733d987a
integration_id: vns3
integration_title: VNS3
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vns3.
metric_to_check: vns3.peering
name: vns3
public_title: Intégration Datadog/VNS3
short_description: Dispositif virtuel cloud pour la sécurité et la connectivité des
  applications.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Obtenez des informations sur le statut des endpoints/tunnels IPSec de votre topologie VNS3, des pairs VNS3 et des clients en overlay.

- Check de statut des liens de peering :

  ![peering][1]

- Check de statut des clients en overlay :

  ![clients][2]

- Check de statut des tunnels IPSec :

  ![ipsec][3]

## Configuration

### Configuration

Pour capturer des métriques, déployez le conteneur Datadog de Cohesive Networks, configurez le pare-feu VNS3, puis configurez le conteneur. Pour en savoir plus, consultez le [guide de Cohesive Networks][4] (en anglais) ou regardez [cette vidéo][5] (en anglais).

## Données collectées

### Métriques
{{< get-metrics-from-git "vns3" >}}


### Événements

Le check VNS3 n'inclut aucun événement.

### Checks de service

Le check VNS3 n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/peering.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/clients.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/ipsec.png
[4]: https://docs.cohesive.net/docs/network-edge-plugins/datadog/
[5]: https://youtu.be/sTCgCG3m4vk
[6]: https://github.com/DataDog/integrations-extras/blob/master/vns3/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/