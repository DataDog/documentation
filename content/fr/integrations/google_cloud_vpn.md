---
categories:
- cloud
- network
- google cloud
- log collection
ddtype: crawler
dependencies: []
description: Surveillez le statut du tunnel VPN, le débit, le nombre de sessions,
  et plus encore.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_vpn/
draft: false
git_integration_title: google_cloud_vpn
has_logo: true
integration_id: google-cloud-vpn
integration_title: Google VPN
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_vpn
public_title: Intégration Datadog/Google VPN
short_description: Surveillez le statut du tunnel VPN, le débit, le nombre de sessions,
  et plus encore.
version: '1.0'
---

## Présentation

Google Cloud VPN connecte de manière sécurisée votre réseau existant à votre réseau Google Cloud Platform.

Recueillez des métriques de Google VPN pour :

- Visualiser les performances de vos VPN
- Corréler les performances de vos VPN avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud VPN sont recueillis avec Google Cloud Logging et envoyés à un Cloud Pub/Sub via un forwarder Push HTTP. Si vous ne l'avez pas déjà fait, configurez un [Cloud Pub/Sub à l'aide d'un forwarder Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud VPN depuis Google Cloud Logging vers le Pub/Sub :

1. Accédez à la [page Google Cloud Logging][3] et filtrez les logs Google Cloud VPN.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_vpn" >}}


### Événements

L'intégration Google Cloud VPN n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud VPN n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_vpn/google_cloud_vpn_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/