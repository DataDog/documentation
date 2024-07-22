---
assets:
  dashboards:
    Databricks Spark Overview: assets/dashboards/databricks_overview.json
  logs:
    source: spark
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- collaboration
- processing
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/databricks/README.md
display_name: Databricks
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
  tag: Blog
  text: Surveiller Databricks avec Datadog
git_integration_title: databricks
guid: 3e1c7918-f224-46c6-836f-1169857e2564
integration_id: databricks
integration_title: Databricks
integration_version: ''
is_public: true
custom_kind: integration
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

Surveillez vos applications Spark Databricks avec l'[intégration Datadog/Spark][3]. Installez l'[Agent Datadog][4] sur vos clusters en suivant les instructions de [configuration](#configuration) correspondant à votre type de cluster.

### Configuration

Configurez l'intégration Spark de façon à surveiller votre cluster Apache Spark sur Databricks et à recueillir les métriques système et métriques Spark.

1. Identifiez parmi les scripts init ci-dessous celui qui convient le mieux à l'environnement de votre cluster Databricks.

2. Copiez et exécutez le contenu dans un notebook. Ce dernier crée un script init afin d'installer un Agent Datadog sur vos clusters.
    Il suffit d'exécuter le notebook une seule fois pour enregistrer le script comme configuration globale. Pour en savoir plus sur les scripts init Datadog Databricks, consultez la section [Surveillance des clusters Apache Spark avec Databricks et Datadog][3] (en anglais).
    - Définissez le chemin `<init-script-folder>` sur l'emplacement où vous souhaitez enregistrer les scripts init.

3. Configurez un nouveau cluster Databricks avec le nouveau chemin du script init. Pour ce faire, vous pouvez utiliser l'IU ou l'interface de ligne de commande Datadog, ou encore transmettre des appels à l'API Clusters.
    - Dans les options avancées du cluster, définissez la variable d'environnement `DD_API_KEY` sur votre clé d'API Datadog.
    - Ajoutez la variable d'environnement `DD_ENV` sous les options avancées afin d'inclure un tag d'environnement global facilitant l'identification de vos clusters.


#### Cluster standard

{{< tabs >}}
{{% tab "Driver uniquement" %}}
##### Installez l'Agent Datadog sur le driver
Installez l'Agent Datadog sur le nœud driver du cluster. Il s'agit d'une version mise à jour de l'exemple de notebook Databricks avec le [script init Datadog][1].

Une fois le script `datadog-install-driver-only.sh` créé, ajoutez le chemin du script init sur la [page de configuration du cluster][2].

```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-driver-only.sh","""
#!/bin/bash

echo "Exécution sur le driver ? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF >> /tmp/start_datadog.sh
#!/bin/bash

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Sur le driver. Installation de Datadog ..."

  # CONFIGURER LES TAGS DE HOST POUR LE CLUSTER
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # INSTALLER LA DERNIÈRE VERSION DE L'AGENT DATADOG 7
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=DD_TAGS bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"

  # ATTENDRE QUE L'AGENT DATADOG SOIT INSTALLÉ
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done

  echo "Agent Datadog installé"

  # ACTIVER LES LOGS DANS datadog.yaml POUR RECUEILLIR LES LOGS DU DRIVER
  echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml

  # ATTENDRE LE CHARGEMENT DES PARAMÈTRES DU MASTER, PUIS RÉCUPÉRER L'IP ET LE PORT
  while [ -z \$gotparams ]; do
    if [ -e "/tmp/master-params" ]; then
      DB_DRIVER_PORT=\$(cat /tmp/master-params | cut -d' ' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  hostip=\$(hostname -I | xargs)  

  # ÉCRIRE LE FICHIER DE CONFIGURATION POUR L'INTÉGRATION SPARK AVEC LES MÉTRIQUES STRUCTURED STREAMING ACTIVÉES ET LA CONFIGURATION DES LOGS
  # MODIFIER CE QUI SUIT POUR INCLURE D'AUTRES OPTIONS DE spark.d/conf.yaml.example
  echo "init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_standalone_mode
      cluster_name: \${hostip}
      streaming_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.yaml

  # REDÉMARRER L'AGENT
  sudo service datadog-agent restart

fi
EOF

# PROCÉDER AU NETTOYAGE
if [ \$DB_IS_DRIVER ]; then
  chmod a+x /tmp/start_datadog.sh
  /tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
fi
""", True)
```

[1]: https://docs.databricks.com/_static/notebooks/datadog-init-script.html
[2]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
{{% /tab %}}
{{% tab "Tous les nœuds" %}}
##### Installer l'Agent Datadog sur les nœuds worker et driver 

Une fois le script `datadog-install-driver-workers.sh` créé, ajoutez le chemin du script init sur la [page de configuration du cluster][1].

```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-driver-workers.sh","""
#!/bin/bash
cat <<EOF >> /tmp/start_datadog.sh

#!/bin/bash

  hostip=$(hostname -I | xargs)

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then

  echo "Installation de l'Agent Datadog sur le driver (nœud master)..."
  # CONFIGURER LES TAGS DE HOST POUR LE CLUSTER
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # INSTALLER LA DERNIÈRE VERSION DE L'AGENT DATADOG 7 POUR LES NŒUDS DRIVER ET WORKER 
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"

  # ATTENDRE QUE L'AGENT DATADOG SOIT INSTALLÉ
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done
  echo "Agent Datadog installé"

  # ACTIVER LES LOGS DANS datadog.yaml POUR RECUEILLIR LES LOGS DU DRIVER
  echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  # ÉCRIRE LE FICHIER DE CONFIGURATION POUR L'INTÉGRATION SPARK AVEC LES MÉTRIQUES STRUCTURED STREAMING ACTIVÉES
  # MODIFIER CE QUI SUIT POUR INCLURE D'AUTRES OPTIONS DE spark.d/conf.yaml.example
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${hostip}
      streaming_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.yaml
else

  # CONFIGURER LES TAGS DE HOST POUR LES WORKERS
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker"

  # INSTALLER LA DERNIÈRE VERSION DE L'AGENT DATADOG 7 SUR LES NŒUDS DRIVER ET WORKER 
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"

fi

  # REDÉMARRER L'AGENT
  sudo service datadog-agent restart
EOF

# PROCÉDER AU NETTOYAGE
chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
""", True)
```
[1]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
{{% /tab %}}
{{< /tabs >}}

#### Cluster de tâches
Une fois le script `datadog-install-job-driver-mode.sh` créé, ajoutez le chemin du script init sur la [page de configuration du cluster][5].

**Remarque** : les clusters de tâches sont surveillés en mode `spark_driver_mode` avec le port de l'interface Spark.


```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-job-driver-mode.sh","""
#!/bin/bash

echo "Exécution sur le driver ? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF >> /tmp/start_datadog.sh
#!/bin/bash

if [ \$DB_IS_DRIVER ]; then
  echo "Sur le driver. Installation de Datadog..."

  # CONFIGURER LES TAGS DE HOST POUR LE DRIVER
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # INSTALLER LA DERNIÈRE VERSION DE L'AGENT DATADOG 7 SUR LES NŒUDS DRIVER ET WORKER
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"

  # ATTENDRE QUE L'AGENT DATADOG SOIT INSTALLÉ
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done
  echo "Agent Datadog installé"  

  # ACTIVER LES LOGS DANS datadog.yaml POUR RECUEILLIR LES LOGS DU DRIVER
  echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  current=\$(hostname -I | xargs)

  # ÉCRIRE LE FICHIER DE CONFIGURATION SPARK
  echo "init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_driver_mode
      cluster_name: \$current
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.yaml

  # REDÉMARRER L'AGENT
  sudo service datadog-agent restart

fi
EOF

# PROCÉDER AU NETTOYAGE
if [ \$DB_IS_DRIVER ]; then
  chmod a+x /tmp/start_datadog.sh
  /tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
fi
""", True)

```


### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `spark` dans la section Checks.

## Données collectées

### Métriques

Consultez la [documentation sur l'intégration Spark][7] pour découvrir la liste des métriques recueillies.


### Checks de service

Consultez la [documentation sur l'intégration Spark][8] pour découvrir la liste des checks de service recueillis.

### Événements

L'intégration Databricks n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://databricks.com/
[2]: https://docs.datadoghq.com/fr/integrations/spark/?tab=host
[3]: https://databricks.com/blog/2017/06/01/apache-spark-cluster-monitoring-with-databricks-and-datadog.html
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/integrations/spark/#metrics
[8]: https://docs.datadoghq.com/fr/integrations/spark/#service-checks
[9]: https://docs.datadoghq.com/fr/help/