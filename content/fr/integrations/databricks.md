---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - collaboration
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/databricks/README.md'
display_name: Databricks
draft: false
git_integration_title: databricks
guid: 3e1c7918-f224-46c6-836f-1169857e2564
integration_id: databricks
integration_title: Databricks
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: databricks.
metric_to_check: ''
name: databricks
public_title: Databricks
short_description: Surveillez Apache Spark dans vos clusters Databricks.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Surveillez vos clusters [Databricks][1] avec l'[intégration Spark/Datadog][2].

## Configuration

### Installation

Surveillez vos applications Spark Databricks avec l'[intégration Spark/Datadog][3]. Installez l'Agent Datadog sur vos clusters en suivant les instructions de [configuration](#configuration) correspondant à votre type de cluster.

### Configuration

Suivez le [guide][3] Databricks/Datadog pour configurer l'intégration Spark de façon à surveiller votre cluster Apache Spark.

#### Cluster standard

Utilisez le notebook Databricks du [script init Datadog][4] pour installer l'Agent Datadog et recueillir les métriques système et Spark.

```yaml
init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_standalone_mode
      cluster_name: \$current" > /etc/datadog-agent/conf.d/spark.yaml
```

#### Cluster de tâches

Pour les clusters de tâches, utilisez le script suivant pour configurer l'intégration Spark.

**Remarque** : les clusters de tâches sont surveillés en `spark_driver_mode` avec le port de l'interface Spark.


```shell script
#!/bin/bash

echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF >> /tmp/start_datadog.sh
#!/bin/bash

if [ \$DB_IS_DRIVER ]; then
  echo "On the driver. Installing Datadog ..."

  # Installer l'Agent Datadog
  DD_API_KEY=<CLÉ_API> bash -c "\$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  current=\$(hostname -I | xargs)

  # Écriture du fichier de configuration Spark pour la diffusion des métriques Spark
  echo "init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_driver_mode
      cluster_name: \$current" > /etc/datadog-agent/conf.d/spark.yaml

  # Redémarrage de l'Agent
  sudo service datadog-agent restart

fi
EOF

# Nettoyage
if [ \$DB_IS_DRIVER ]; then
  chmod a+x /tmp/start_datadog.sh
  /tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
fi

```


### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `spark` dans la section Checks.

## Données collectées

### Métriques

Consultez la [documentation sur l'intégration Spark][6] pour découvrir la liste des métriques recueillies.


### Checks de service

Consultez la [documentation sur l'intégration Spark][6] pour découvrir la liste des checks de service recueillis.

### Événements

L'intégration Databricks n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://databricks.com/
[2]: https://docs.datadoghq.com/fr/integrations/spark/?tab=host
[3]: https://databricks.com/blog/2017/06/01/apache-spark-cluster-monitoring-with-databricks-and-datadog.html
[4]: https://docs.databricks.com/_static/notebooks/datadog-init-script.html
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/integrations/spark/#metrics
[7]: https://docs.datadoghq.com/fr/integrations/spark/#service-checks
[8]: https://docs.datadoghq.com/fr/help/