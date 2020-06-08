---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/vns3/README.md'
display_name: VNS3
git_integration_title: vns3
guid: 1a7a2c46-37a8-4660-8d71-aaad733d987a
integration_id: vns3
integration_title: VNS3
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.2
metric_prefix: vns3.
metric_to_check: vns3.peering
name: vns3
public_title: Intégration Datadog/VNS3
short_description: Dispositif virtuel cloud pour la sécurité et la connectivité des applications.
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

## Implémentation

### Configuration

Pour capturer des métriques, vous devez déployer le conteneur Datadog de Cohesive Networks, configurer le firewall VNS3 et configurer le conteneur.

Lisez le guide à ce sujet [ici][4].

Regardez la vidéo à ce sujet [ici][5].

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
[4]: https://cohesive.net/dnld/Cohesive-Networks_VNS3-DataDog-Container-Guide.pdf
[5]: https://youtu.be/sTCgCG3m4vk
[6]: https://github.com/DataDog/integrations-extras/blob/master/vns3/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/