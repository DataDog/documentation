---
"assets":
  "dashboards":
    "TriggerMesh OCI Autonomous Database": assets/dashboards/ociscreenboard.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://triggermesh.com"
  "name": TriggerMesh
"categories":
- monitoring
- marketplace
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "triggermesh"
"draft": false
"git_integration_title": "triggermesh"
"guid": "1107b2a5-31e9-4247-b159-fb929f79f607"
"integration_id": "triggermesh-oci"
"integration_title": "TriggerMesh"
"integration_version": ""
"is_public": true
"custom_kind": "integration"
"maintainer": "support@triggermesh.com"
"manifest_version": "1.0.0"
"metric_prefix": "triggermesh.oci."
"metric_to_check": "datadog.marketplace.triggermesh.oci.bridge"
"name": "triggermesh"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.triggermesh.oci.bridge
  "tag": bridge
  "unit_label": Pont pour Oracle Cloud Infrastructure
  "unit_price": !!float "49.0"
"public_title": "TriggerMesh"
"short_description": "Recueillez des métriques à partir d'Oracle Cloud et envoyez-les à Datadog."
"support": "partner"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": sales@triggermesh.com
---



## Présentation

[TriggerMesh](https://www.triggermesh.com) fournit un mécanisme permettant de transmettre toutes les [métriques Oracle Cloud](https://docs.oracle.com/fr-fr/iaas/Content/Monitoring/Concepts/monitoringoverview.htm) à Datadog. Pour ce faire, TriggerMesh crée un pont et configure la source OCI ainsi que la [cible](https://docs.triggermesh.io/targets/datadog/) Datadog.

{{< img src="marketplace/triggermesh/images/ocidatadogtm.png" alt="Pont entre OCI et Datadog" >}}

## Données collectées

Tous les services Oracle Cloud répertoriés sur [cette page](https://docs.oracle.com/fr-fr/iaas/Content/Monitoring/Concepts/monitoringoverview.htm#SupportedServices) sont pris en charge. Les métriques indiquées dans cette liste correspondent aux métriques d'une base de données autonome Oracle. Toutefois, vous pouvez également recueillir toutes les métriques OCI, y compris les [métriques d'instance Compute](https://docs.oracle.com/fr-fr/iaas/Content/Compute/References/computemetrics.htm#Compute_Instance_Metrics).

### Métriques

Cliquez sur le lien ci-dessous pour accéder à la liste complète des métriques pouvant être recueillies pour une base de données autonome.

* [Métriques de base de données autonome](https://docs.oracle.com/en-us/iaas/Content/Database/References/databasemetrics_topic-Overview_of_the_Database_Service_Autonomous_Database_Metrics.htm#overview)


## Assistance

Si vous avez des questions concernant l'intégration Datadog/TriggerMesh pour OCI, veuillez envoyer un e-mail à l'adresse [info@triggermesh.com](mailto:info@triggermesh.com).

Si vous souhaitez planifier une démonstration pour un déploiement sur site, veuillez envoyer un e-mail à l'adresse [sales@triggermesh.com](mailto:sales@triggermesh.com).

