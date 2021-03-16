---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev Nutanix Cluster Overview": assets/dashboards/rapdev_nutanix_overview_dashboard.json
    "RapDev Nutanix Clusters Dashboard": assets/dashboards/rapdev_nutanix_clusters_dashboard.json
    "RapDev Nutanix Hosts and Disks Dashboard": assets/dashboards/rapdev_nutanix_hosts_and_disks_dashboard.json
    "RapDev Nutanix VMs Dashboard": assets/dashboards/rapdev_nutanix_vms_dashboard.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors":
    "Nutanix Cluster CPU": assets/monitors/nutanix_cpu_monitor.json
    "Nutanix Compression Saving": assets/monitors/nutanix_compression_saving_monitor.json
    "Nutanix Deduplication": assets/monitors/nutanix_deduplication_monitor.json
    "Nutanix Storage Usage": assets/monitors/nutanix_storage_monitor.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- marketplace
- cloud
- data store
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "Nutanix par RapDev"
"draft": false
"git_integration_title": "rapdev_nutanix"
"guid": "4ae15fc5-ff5b-4cc4-a3cf-a7b5d164c538"
"integration_id": "rapdev-nutanix"
"integration_title": "Nutanix par RapDev"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.nutanix."
"metric_to_check": "rapdev.nutanix.clusters.count"
"name": "rapdev_nutanix"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.nutanix
  "tag": core
  "unit_label": Cores de host Nutanix
  "unit_price": !!float "5.0"
"public_title": "Nutanix par RapDev"
"short_description": "Surveillez l'utilisation de vos ressources Nutanix pour mieux comprendre votre environnement."
"support": "partner"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---



## Présentation
L'intégration Nutanix est conçue pour surveiller le stockage, la charge CPU, l'IOPS en lecture/écriture ainsi que d'autres métriques liées à vos clusters Nutanix, vous permettant ainsi de vérifier que votre environnement fonctionne de façon optimale en permanence. L'intégration intègre quatre dashboards qui offrent une vue d'ensemble de vos clusters Nutanix ainsi que des données granulaires pour identifier avec précision les problèmes de performance potentiels.  Elle comprend également des monitors pour les métriques clés telles que l'utilisation du stockage et les économies associées à la déduplication, qui font partie des principaux indicateurs de la performance globale de l'environnement Nutanix.

### Dashboard Vue d'ensemble Nutanix
{{< img src="marketplace/rapdev_nutanix/images/4.png" alt="Screenshot1" >}}

### Dashboard Machines virtuelles Nutanix
{{< img src="marketplace/rapdev_nutanix/images/5.png" alt="Screenshot2" >}}

### Dashboard Clusters Nutanix
{{< img src="marketplace/rapdev_nutanix/images/6.png" alt="Screenshot3" >}}

### Dashboard Hosts et disques Nutanix
{{< img src="marketplace/rapdev_nutanix/images/7.png" alt="Screenshot3" >}}

### Monitors

1. Utilisation du stockage pour les clusters Nutanix
2. Charge CPU pour les clusters Nutanix
3. Économies issues de la déduplication pour les clusters Nutanix
4. Économies issues de la compression pour les clusters Nutanix

### Dashboards

Vue d'ensemble de Nutanix par RapDev
Clusters Nutanix par RapDev
Hosts et disques Nutanix par RapDev
Machines virtuelles Nutanix par RapDev
## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- E-mail : integrations@rapdev.io
- Chat : RapDev.io/products
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:integrations@rapdev.io) et nous l'ajouterons !*

---
 Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/rapdev-nutanix/pricing) pour l'acheter.

