---
categories:
  - cloud
  - network
  - google cloud
ddtype: crawler
dependencies: []
description: 'Surveillez le statut du tunnel VPN, le débit, le nombre de sessions, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_vpn/'
git_integration_title: google_cloud_vpn
has_logo: true
integration_title: "Google\_VPN"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_vpn
public_title: "Intégration Datadog/Google\_VPN"
short_description: 'Surveillez le statut du tunnel VPN, le débit, le nombre de sessions, et plus encore.'
version: '1.0'
---
## Présentation
Google Cloud VPN connecte de manière sécurisée votre réseau existant à votre réseau Google Cloud Platform.

Recueillez des métriques de Google VPN pour :

* Visualiser les performances de vos VPN
* Corréler les performances de vos VPN avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_vpn" >}}


### Événements
L'intégration Google Cloud VPN n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud VPN n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_vpn/google_cloud_vpn_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}