---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev MaxDB Dashboard": assets/dashboards/rapdev_maxdb_dashboard.json
  "metrics_metadata": metadata.csv
  "monitors":
    "RapDev MaxDB Data Volume Usage": assets/monitors/rapdev_maxdb_data_volume_usage.json
    "RapDev MaxDB Database Connection Check": assets/monitors/rapdev_maxdb_connection_check.json
    "RapDev MaxDB Database State": assets/monitors/rapdev_maxdb_state.json
    "RapDev MaxDB Lock Utilization": assets/monitors/rapdev_maxdb_lock_utilization.json
    "RapDev MaxDB Log Area Usage": assets/monitors/rapdev_maxdb_log_area_usage.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- marketplace
- data store
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "MaxDB par RapDev"
"draft": false
"git_integration_title": "rapdev_maxdb"
"guid": "b002557b-f27c-47ad-8db7-a93c75b81707"
"integration_id": "rapdev-maxdb"
"integration_title": "MaxDB"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.maxdb."
"metric_to_check": "rapdev.maxdb.db_state"
"name": "rapdev_maxdb"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.maxdb
  "tag": db
  "unit_label": Base de données
  "unit_price": !!float "50.0"
"public_title": "Intégration MaxDB"
"short_description": "Surveillez des métriques liées aux volumes, aux caches, aux schémas et aux tables ainsi que d'autres métriques depuis vos bases de données MaxDB"
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

L'intégration MaxDB permet de surveiller des métriques liées aux données, aux logs, aux volumes, aux caches, aux sessions et aux locks ainsi que d'autres métriques à partir de vos instances MaxDB afin de s'assurer que vos bases de données fonctionnent de façon optimale. L'intégration offre un dashboard dont les informations peuvent être filtrées par base de données ou par host de base de données. Elle propose également des monitors pour surveiller des métriques courantes liées à la santé globale de la base de données.

### Statut de la base de données et métriques de données/logs
{{< img src="marketplace/rapdev_maxdb/images/1.png" alt="Screenshot1" >}}

### Métriques de cache de base de données
{{< img src="marketplace/rapdev_maxdb/images/2.png" alt="Screenshot2" >}}

### Métriques de session, d'OMS et de schéma
{{< img src="marketplace/rapdev_maxdb/images/3.png" alt="Screenshot3" >}}

### Monitors
1. Check de connexion MaxDB
2. Statut MaxDB
3. Utilisation des volumes de données MaxDB
4. Utilisation des locks MaxDB
5. Utilisation des volumes de logs MaxDB

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : integrations@rapdev.io 
 - Chat : [RapDev.io/products](https://rapdev.io/products)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️  à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:integrations@rapdev.io) et nous l'ajouterons !*

---
 Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/rapdev-maxdb/pricing) pour l'acheter.

