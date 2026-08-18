---
algolia:
  subcategory: Intégrations du Marketplace
app_id: rapdev-snmp-trap-logs
app_uuid: 754df420-1cf8-4742-b98c-9d3a76f83c41
assets:
  dashboards:
    RapDev SNMP Trap Logs: assets/dashboards/rapdev_snmp_trap_logs_dashboard.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- network
- snmp
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snmp_trap_logs
integration_id: rapdev-snmp-trap-logs
integration_title: SNMP Trap Logs
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snmp_trap_logs
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: snmp-trap-logs
  short_description: Coût unique pour cette intégration
  unit_price: 1000
public_title: SNMP Trap Logs
short_description: Convertir des messages sur les traps SNMP en logs Datadog
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Network
  - Category::SNMP
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Convertir des messages sur les traps SNMP en logs Datadog
  media:
  - caption: RapDev SNMP Trap Logs
    image_url: images/1.png
    media_type: image
  - caption: Messages de log sur les traps SNMP
    image_url: images/2.png
    media_type: image
  - caption: Trap SNMP parsé
    image_url: images/3.png
    media_type: image
  - caption: Dashboard représentant des logs sur les traps SNMP
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SNMP Trap Logs
  uninstallation: README.md#Uninstallation
---

## Présentation
Le package RapDev SNMP Trap Logs vous permet de convertir des messages sur les traps SNMP en des logs Datadog, et ce pour des milliers d'appareils SNMP différents. Nous avons recueilli autant de fichiers MIB que possible et les avons convertis en un format permettant d'obtenir des messages de log lisibles sur les traps SNMP.

Ce package contient un script d'installation permettant de configurer Logstash en tant que récepteur de traps SNMP. Vous disposez ainsi des configurations et des fichiers MIB nécessaires pour convertir vos messages. Cela vous permet de générer des alertes sur des événements réseau dans la plateforme Datadog.

Pour obtenir la liste complète des MIB inclus avec ce package, consultez le [fichier mib_yamls.txt][4].

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- E-mail : [support@rapdev.io][7]
- Chat : [rapdev.io][3]
- Téléphone : 855-857-0222

### Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller et résoudre des problèmes de performance réseau avec des traps SNMP][8]

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

[1]: https://docs.datadoghq.com/fr/logs/guide/enrichment-tables
[2]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#log-message-remapper
[3]: https://www.rapdev.io/#Get-in-touch
[4]: https://files.rapdev.io/datadog/configs/mib_yamls.txt
[5]: mailto:sales@rapdev.io
[6]: https://mibs.observium.org
[7]: mailto:support@rapdev.io
[8]: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-trap-logs" target="_blank">Cliquez ici</a> pour l'acheter.