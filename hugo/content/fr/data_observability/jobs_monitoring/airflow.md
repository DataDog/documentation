---
aliases:
- /fr/data_jobs/airflow
description: 'Surveillez les workflows DAG Apache Airflow avec Data Observability:
  Jobs Monitoring à l''aide du provider OpenLineage sur Kubernetes, Amazon MWAA et
  d''autres plateformes.'
further_reading:
- link: https://www.datadoghq.com/blog/data-jobs-monitoring/
  tag: blog
  text: Dépannez et optimisez les charges de travail de traitement des données avec
    Data Jobs Monitoring
- link: https://www.datadoghq.com/blog/data-observability-monitoring
  tag: blog
  text: Observation du cycle de vie des données avec Datadog
- link: /data_jobs
  tag: Documentation
  text: 'Data Observability : Jobs Monitoring'
title: 'Activez Data Observability : Jobs Monitoring pour Apache Airflow'
---
[Data Observability: Jobs Monitoring][1] offre une visibilité sur les performances et la fiabilité des workflows exécutés par les DAG Apache Airflow.

## Configuration {#setup}

Choisissez votre plateforme Airflow et suivez les étapes de configuration.

{{< tabs >}}
{{% tab "Kubernetes" %}}
### Prérequis {#requirements}

* [Apache Airflow 2.7][1] ou version ultérieure, y compris Airflow 3
* [apache-airflow-providers-openlineage][2]

### Configuration {#setup-1}

Pour commencer, suivez les instructions ci-dessous.

1. Identifiez la version d'Airflow utilisée par votre déploiement. Par exemple, vérifiez le tag de l'image Airflow, les valeurs Helm, le manifeste de déploiement ou la version indiquée dans votre interface utilisateur Airflow.

2. Utilisez la [référence des versions du fournisseur OpenLineage](#openlineage-provider-version-reference) et le [log des modifications du fournisseur OpenLineage](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html) pour identifier la version la plus récente du fournisseur qui prend en charge votre version d'Airflow.

3. Installez le fournisseur `openlineage` pour **les planificateurs Airflow et les workers Airflow** en fixant la version du fournisseur dans votre fichier `requirements.txt` ou là où vos dépendances Airflow sont gérées :

    ```text
    apache-airflow-providers-openlineage==<PROVIDER_VERSION>
    ```

   Si votre déploiement utilise des contraintes, définissez `apache-airflow-providers-openlineage` dans le fichier de contraintes Airflow sur la même version. Mettez également à jour chaque dépendance OpenLineage requise par cette version du fournisseur vers les versions minimales répertoriées dans la [référence des versions du fournisseur OpenLineage](#openlineage-provider-version-reference).

4. Configurez le fournisseur `openlineage`. Choisissez l'une des options de configuration suivantes et définissez les variables d'environnement, en les rendant disponibles pour les pods où vous exécutez les planificateurs Airflow et les workers Airflow :

   **Option 1 : Datadog Transport (recommandé)**

   **Prérequis** : nécessite la version 2.7.3 ou ultérieure de `apache-airflow-providers-openlineage` et la version 1.37.0 ou ultérieure de `openlineage-python`.

   ```shell
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Remplacez `<DD_API_KEY>` par votre [clé d'API Datadog][4] valide.
   * Remplacez `<DD_SITE>` par votre site Datadog (par exemple, {{< region-param key="dd_site" code="true" >}}). 

   **Option 2 : Composite Transport**

   **Prérequis** : nécessite la version 1.11.0 ou ultérieure de `apache-airflow-providers-openlineage` et la version 1.37.0 ou ultérieure de `openlineage-python`.

   Utilisez cette option si vous utilisez déjà OpenLineage avec un autre système et souhaitez ajouter Datadog comme destination supplémentaire. Le transport composite envoie des événements à tous les transports configurés.

   Par exemple, si vous utilisez un transport HTTP pour envoyer des événements à un autre système :

   ```shell
   # Your existing HTTP transport configuration
   export OPENLINEAGE__TRANSPORT__TYPE=composite
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__TYPE=http
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__URL=<YOUR_EXISTING_URL>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__TYPE=api_key
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__API_KEY=<YOUR_EXISTING_API_KEY>

   # Add Datadog as an additional transport
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Remplacez `<DD_API_KEY>` par votre [clé d'API Datadog][4] valide.
   * Remplacez `<DD_SITE>` par votre site Datadog (par exemple, {{< region-param key="dd_site" code="true" >}}).
   * Remplacez `<YOUR_EXISTING_URL>` et `<YOUR_EXISTING_API_KEY>` par votre configuration de transport OpenLineage existante.

   Dans cet exemple, les événements OpenLineage sont envoyés à la fois à votre système existant et à Datadog. Vous pouvez configurer plusieurs transports en donnant à chacun un nom unique (comme `EXISTING` et `DATADOG` dans l'exemple ci-dessus).

   **Option 3 : Configuration simple**

   Cette option utilise la configuration basée sur l'URL et fonctionne avec toutes les versions du fournisseur OpenLineage :

   ```shell
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Remplacez `<DD_DATA_OBSERVABILITY_INTAKE>` par `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Remplacez `<DD_API_KEY>` par votre [clé d'API Datadog][4] valide.

   * Si vous utilisez **Airflow v2.7 ou v2.8**, ajoutez également ces deux variables d'environnement avec les précédentes. Cela corrige un problème de configuration OpenLineage résolu dans `apache-airflow-providers-openlineage` v1.7, alors qu'Airflow v2.7 et v2.8 utilisent des versions antérieures.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Vérifiez la documentation officielle [configuration-openlineage][3] pour d'autres configurations prises en charge du fournisseur `openlineage`.

5. Déclenchez une mise à jour de vos pods Airflow et attendez qu'elle se termine.

6. Si vous le souhaitez, configurez la collecte des logs pour corréler les logs de tâches aux exécutions de DAG dans Data Observability : Jobs Monitoring. La corrélation nécessite que le répertoire des logs suive le [format de nom de fichier log par défaut][5].

   **Remarque :** Pour que la corrélation des logs fonctionne, injectez les attributs de contexte de tâche Airflow (ID de DAG, ID d'exécution, ID de tâche, numéro de tentative) dans les logs de tâches en tant que facettes structurées dans Datadog. Consultez [Injecter le contexte des tâches Airflow dans les logs][11].

   La valeur `PATH_TO_AIRFLOW_LOGS` est `$AIRFLOW_HOME/logs` dans les déploiements standard, mais peut différer en cas de personnalisation. Ajoutez l'annotation suivante à votre pod :
   ```yaml
   ad.datadoghq.com/base.logs: '[{"type": "file", "path": "PATH_TO_AIRFLOW_LOGS/*/*/*/*.log", "source": "airflow"}]'
   ```

   L'ajout de `"source": "airflow"` permet l'extraction des attributs requis pour la corrélation par le pipeline de logs de l'[intégration Airflow][7].

   Ces chemins de fichiers sont relatifs au conteneur de l'Agent. Montez le répertoire contenant le fichier log dans les conteneurs de l'application et de l'Agent afin que l'Agent puisse y accéder. Pour plus de détails, consultez [Collecter les logs à partir d'un fichier log local d'un conteneur][9].

   **Remarque** : la collecte des logs nécessite que le Datadog Agent soit déjà installé sur votre cluster Kubernetes. Si vous ne l'avez pas encore installé, consultez la [documentation d'installation Kubernetes][8].

   Pour découvrir d'autres méthodes de configuration de la collecte des logs sur Kubernetes, consultez la [section de configuration Kubernetes et intégrations][6].


[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[5]: https://airflow.apache.org/docs/apache-airflow/2.9.3/configurations-ref.html#log-filename-template
[6]: /fr/containers/kubernetes/integrations/?tab=annotations#configuration
[7]: /fr/integrations/airflow/?tab=containerized
[8]: /fr/containers/kubernetes/installation/?tab=datadogoperator#installation
[9]: /fr/containers/kubernetes/log/?tab=datadogoperator#from-a-container-local-log-file
[11]: /fr/data_observability/jobs_monitoring/airflow_log_context/

### Validation {#validation}

Dans Datadog, consultez la page [Data Observability: Jobs Monitoring][2] pour voir la liste de vos exécutions de jobs Airflow après la configuration.

### Dépannage {#troubleshooting}

Définissez `OPENLINEAGE_CLIENT_LOGGING` sur `DEBUG` avec les autres variables d'environnement définies précédemment pour le client OpenLineage et ses modules enfants. Cela peut être utile pour le dépannage lors de la configuration du fournisseur `openlineage`.

Pour exécuter un check automatisé de votre configuration OpenLineage, consultez [Dépanner la configuration d'Airflow avec le DAG de validation OpenLineage][10].

[10]: /fr/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
### Prérequis {#requirements-1}

* [Apache Airflow 2.7.0][1] ou version ultérieure, y compris Airflow 3
* [apache-airflow-providers-openlineage][2]

### Configuration {#setup-2}

<div class="alert alert-info"><strong>Si vous utilisez Airflow 2.7.2, 2.8.1 ou 2.9.2</strong> : les contraintes par défaut de MWAA imposent d'anciennes <code>apache-airflow-providers-openlineage</code> versions. Ces versions incluent des problèmes connus qui peuvent dégrader l'expérience de Data Observability. Pour passer à des versions corrigées du fournisseur, consultez <a href="/data_observability/jobs_monitoring/airflow_mwaa_upgrade/">Mettre à niveau le fournisseur OpenLineage sur Amazon MWAA pour Airflow 2.7.2, 2.8.1 et 2.9.2</a>.</div>

Pour commencer, suivez les instructions ci-dessous.

1. Vérifiez votre version d'Airflow sur Amazon MWAA et choisissez la version la plus récente du fournisseur OpenLineage compatible avec celle-ci.

   Si votre environnement exécute Airflow 2.7.2, 2.8.1 ou 2.9.2, suivez le [guide de mise à niveau MWAA][11] pour mettre à jour le fournisseur OpenLineage et les contraintes de dépendance associées avant de configurer le transport. Pour les autres versions d'Amazon MWAA, consultez la [référence des versions du fournisseur OpenLineage](#openlineage-provider-version-reference).

1. Ajoutez le fournisseur à votre fichier `requirements.txt` :

    ```text
    apache-airflow-providers-openlineage
    ```

1. Configurez le fournisseur `openlineage`. L'option la plus simple consiste à définir les variables d'environnement suivantes dans votre [script de démarrage Amazon MWAA][3] :

   ```shell
   #!/bin/sh
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # AIRFLOW__OPENLINEAGE__NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```

   * Remplacez entièrement `<DD_DATA_OBSERVABILITY_INTAKE>` par `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Remplacez entièrement `<DD_API_KEY>` par votre [clé d'API Datadog][5] valide.
   * Si vous utilisez **Airflow v2.7 ou v2.8**, ajoutez également ces deux variables d'environnement au script de démarrage. Cela corrige un problème de configuration OpenLineage résolu dans `apache-airflow-providers-openlineage` v1.7, alors qu'Airflow v2.7 et v2.8 utilisent des versions antérieures.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Vérifiez la documentation officielle [configuration-openlineage][4] pour les autres configurations prises en charge du fournisseur `openlineage`.

   La résolution des dépendances d'Amazon MWAA est contrôlée par les contraintes MWAA. Si le fournisseur compatible le plus récent est en conflit avec les valeurs par défaut de MWAA, suivez le modèle de contraintes personnalisées dans le [guide de mise à niveau MWAA][11].

1. Déployez votre fichier `requirements.txt` mis à jour et le [script de démarrage Amazon MWAA][3] dans le dossier Amazon S3 configuré pour votre environnement Amazon MWAA.

1. En option, configurez Log Collection pour corréler les logs de tâches aux exécutions de DAG dans Jobs Monitoring :
   1. Configurez Amazon MWAA pour [envoyer les logs vers CloudWatch][9].
   2. [Envoyez les logs vers Datadog][10].

[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[7]: https://app.datadoghq.com/data-jobs/
[8]: https://openlineage.io/docs/integrations/airflow/
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[10]: /fr/integrations/amazon_web_services/?tab=roledelegation#log-collection
[11]: /fr/data_observability/jobs_monitoring/airflow_mwaa_upgrade/

### Validation {#validation-1}

Dans Datadog, consultez la page [Data Observability: Jobs Monitoring][7] pour voir une liste de vos exécutions de jobs Airflow après la configuration.

### Dépannage {#troubleshooting-1}

Assurez-vous que votre rôle d'exécution configuré pour votre environnement Amazon MWAA dispose des autorisations appropriées pour le `requirements.txt` et le [script de démarrage Amazon MWAA][3]. Ceci est requis si vous gérez votre propre rôle d'exécution et qu'il s'agit de la première fois que vous ajoutez ces fichiers complémentaires. Consultez le guide officiel [Rôle d'exécution Amazon MWAA][6] pour plus de détails si nécessaire.

Définissez `OPENLINEAGE_CLIENT_LOGGING` sur `DEBUG` dans le [script de démarrage Amazon MWAA][3] pour le client OpenLineage et ses sous-modules. Cela peut être utile pour le dépannage lors de la configuration du fournisseur `openlineage`.

Pour exécuter un check automatisé de votre configuration OpenLineage, consultez [Dépanner la configuration d'Airflow avec le DAG de validation OpenLineage][12].

[12]: /fr/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-danger">
Pour les clients Astronomer utilisant Astro, <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro propose des fonctionnalités de lignage qui reposent sur le fournisseur Airflow OpenLineage</a>. Data Observability: Jobs Monitoring dépend du même fournisseur OpenLineage et utilise le transport <a href=https://openlineage.io/docs/client/python#composite>Composite</a> pour ajouter un transport supplémentaire.
</div>

### Prérequis {#requirements-2}

* [Astro Runtime 12.1.0+][1]
* [`apache-airflow-providers-openlineage` 1.11.0+][2]
* [`openlineage-python` 1.23.0+][8]

### Configuration {#setup-3}

1. Vérifiez que votre version d'Astro Runtime inclut `apache-airflow-providers-openlineage` 1.11.0 ou une version ultérieure et `openlineage-python` 1.23.0 ou une version ultérieure. Si vous gérez les dépendances Airflow dans votre image de déploiement, fixez les versions compatibles dans votre Dockerfile avant de configurer le transport.

2. Pour configurer le fournisseur OpenLineage, définissez les variables d'environnement suivantes.

    ```shell
    OPENLINEAGE__TRANSPORT__TYPE=composite
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=http
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__URL=<DD_DATA_OBSERVABILITY_INTAKE>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__TYPE=api_key
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__API_KEY=<DD_API_KEY>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__COMPRESSION=gzip
    ```

    * Replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
    * Remplacez `<DD_API_KEY>` par votre [clé d'API Datadog][7] valide.

    **Optional:**
    * Set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for the `env` tag on all DAGs in the Airflow deployment. This allows Datadog to logically separate this deployment's jobs from those of other Airflow deployments.
    * Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` for the OpenLineage client and its child modules to log at a `DEBUG` logging level. This can be useful for troubleshooting during the configuration of an OpenLineage provider.

    You can configure these variables in your Astronomer deployment using either of the following methods:

    - [From the Astro UI][5]: Navigate to your deployment settings and add the environment variables directly.
    - [In the Dockerfile][11]: Define the environment variables in your `Dockerfile` to ensure they are included during the build process.

    See the [Astronomer official guide][10] for managing environment variables for a deployment. See Apache Airflow's [OpenLineage Configuration Reference][6] for other supported configurations of the OpenLineage provider.

3. Déclenchez une mise à jour de votre déploiement et attendez qu'elle se termine.

[1]: https://www.astronomer.io/docs/astro/runtime-release-notes#astro-runtime-1210
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[4]: https://www.astronomer.io/docs/astro/cli/develop-project
[5]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[6]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[8]: https://github.com/OpenLineage/OpenLineage/releases/tag/1.23.0
[9]: https://www.astronomer.io/docs/astro/runtime-provider-reference#astro-runtime-1210
[10]: https://www.astronomer.io/docs/astro/environment-variables/#management-options
[11]: https://www.astronomer.io/docs/astro/manage-env-vars#using-your-dockerfile

### Validation {#validation-2}

Dans Datadog, consultez la page [Data Observability: Jobs Monitoring][2] pour voir la liste de vos exécutions de jobs Airflow après la configuration.


### Dépannage {#troubleshooting-2}
Vérifiez que les variables d'environnement OpenLineage sont correctement définies sur le déploiement Astronomer.

**Remarque** : L'utilisation du fichier `.env` pour ajouter les variables d'environnement ne fonctionne pas, car les variables ne sont appliquées qu'à l'environnement Airflow local.

Pour exécuter un check automatisé de votre configuration OpenLineage, consultez [Dépanner la configuration d'Airflow avec le DAG de validation OpenLineage][12].

[12]: /fr/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{% tab "Google Cloud Composer" %}}
<div class="alert alert-danger">
Data Observability: Jobs Monitoring pour Airflow n'est pas encore compatible avec le lignage des données <a href=https://cloud.google.com/composer/docs/composer-2/lineage-integration>Dataplex</a>. La configuration d'OpenLineage pour Data Observability: Jobs Monitoring remplace votre configuration de transport Dataplex existante.
</div>

### Prérequis {#requirements-3}

* [Cloud Composer 2][1] ou version ultérieure
* [apache-airflow-providers-openlineage][2]

### Configuration {#setup-4}

Pour commencer, suivez les instructions ci-dessous.

1. Vérifiez la version d'Airflow et la version du fournisseur OpenLineage pour votre environnement Cloud Composer. Si vous devez modifier la version du fournisseur, consultez les conseils de gestion des packages Google Cloud Composer et la [référence de version du fournisseur OpenLineage](#openlineage-provider-version-reference) avant de modifier les packages d'environnement.

2. Dans l'onglet {{< ui >}}Advanced Configuration{{< /ui >}}, sous {{< ui >}}Airflow configuration override{{< /ui >}}, cliquez sur {{< ui >}}Add Airflow configuration override{{< /ui >}} et configurez ces paramètres :

   - Dans Section 1, saisissez `openlineage`.
   - Dans Key 1, saisissez `disabled`.
   - Dans Value 1, saisissez `False` pour vous assurer qu'OpenLineage est activé.

   - Dans Section 2, saisissez `openlineage`.
   - Dans Key 2, saisissez `transport`.
   - Dans Value 2, saisissez ce qui suit :

     ```text
     {
      "type": "http",
      "url": "<DD_DATA_OBSERVABILITY_INTAKE>",
      "auth": {
         "type": "api_key",
         "api_key": "<DD_API_KEY>"
      }
     }
     ```

   * Remplacez entièrement `<DD_DATA_OBSERVABILITY_INTAKE>` par `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Remplacez entièrement `<DD_API_KEY>` par votre [clé d'API Datadog][5] valide.

**Facultatif :** Configurez l'espace de noms OpenLineage pour définir la valeur du tag `env` dans Datadog :
   - Dans Section 3, saisissez `openlineage`.
   - Dans Key 3, saisissez `namespace`.
   - Dans Value 3, saisissez la valeur de votre environnement Composer (par exemple, prod, dev, staging ou test).
   
**Remarque :** Si [Dataplex][6] est activé, l'espace de noms est déjà défini par défaut sur le nom de l'environnement Composer. La définition manuelle de l'espace de noms OpenLineage ici vous permet de remplacer cette valeur par défaut si vous le souhaitez.

Vérifiez les pages de documentation officielles [Airflow][4] et [Composer][3] pour connaître les autres configurations prises en charge du fournisseur `openlineage` dans Google Cloud Composer.

[1]: https://cloud.google.com/composer/docs/composer-versioning-overview
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://cloud.google.com/composer/docs/airflow-configurations
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[6]: https://cloud.google.com/composer/docs/composer-2/lineage-integration
[7]: https://app.datadoghq.com/data-jobs/

### Validation {#validation-3}

Dans Datadog, consultez la page [Data Observability: Jobs Monitoring][7] pour voir une liste de vos exécutions de jobs Airflow après la configuration.

### Dépannage {#troubleshooting-3}

Définissez `OPENLINEAGE_CLIENT_LOGGING` sur `DEBUG` dans l'onglet {{< ui >}}Environment variables{{< /ui >}} de la page Composer pour le client OpenLineage et ses modules enfants. Cela peut être utile pour le dépannage lors de la configuration du fournisseur `openlineage`.

Pour exécuter un check automatisé de votre configuration OpenLineage, consultez [Dépanner la configuration d'Airflow avec le DAG de validation OpenLineage][8].

[8]: /fr/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{< /tabs >}}

## Problèmes connus {#known-issues}

Dans Airflow 2.x, marquer manuellement une exécution de DAG ou une tâche comme échouée ne met pas à jour son statut dans Data Observability: Jobs Monitoring. Pour les exécutions concernées, les durées des spans et les métriques de durée peuvent être inexactes.

## Référence de version du fournisseur OpenLineage {#openlineage-provider-version-reference}

Data Observability: Jobs Monitoring utilise le fournisseur Apache Airflow OpenLineage pour émettre des événements de DAG et de tâches Airflow. Pour une expérience optimale, Datadog recommande d'utiliser la version la plus récente du fournisseur OpenLineage compatible avec votre version d'Airflow.

**Airflow 2.11 ou version ultérieure, y compris Airflow 3**
: **Version recommandée du fournisseur**: `2.20.3`
: **Versions minimales requises des dépendances** :
: - `apache-airflow-providers-common-sql>=1.32.0`
: - `apache-airflow-providers-common-compat>=1.15.0`
: - `openlineage-integration-common>=1.47.0`
: - `openlineage-python>=1.47.0`
: - `openlineage-integration-common>=1.52.0`
: - `openlineage-python>=1.52.0`
: **Notes**: Il s'agit de la version la plus récente du fournisseur. Le fournisseur `2.20.3` nécessite Python 3.11 ou une version ultérieure. La version `2.9.0` du fournisseur et les versions ultérieures nécessitent Airflow 2.11 ou une version ultérieure.

**Airflow 2.10.x**
: **Version recommandée du fournisseur**: `2.8.0`
: **Versions minimales requises des dépendances** :
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.8.0`
: - `openlineage-integration-common>=1.38.0`
: - `openlineage-python>=1.38.0`
: **Notes**: Il s'agit de la version la plus récente du fournisseur compatible avec Airflow 2.10. La version `2.9.0` du fournisseur et les versions ultérieures nécessitent Airflow 2.11 ou une version ultérieure.

**Airflow 2.9.x**
: **Version recommandée du fournisseur**: `2.2.0`
: **Versions minimales requises des dépendances** :
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.4.0`
: - `openlineage-integration-common>=1.31.0`
: - `openlineage-python>=1.31.0`
: **Notes**: Il s'agit de la version la plus récente du fournisseur compatible avec Airflow 2.9. La version `2.3.0` du fournisseur et les versions ultérieures nécessitent Airflow 2.10 ou une version ultérieure.

**Airflow 2.8.x**
: **Version recommandée du fournisseur**: `1.14.0`
: **Versions minimales requises des dépendances** :
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.2.1`
: - `openlineage-integration-common>=1.24.2`
: - `openlineage-python>=1.24.2`
: **Notes** : Il s'agit de la version la plus récente du fournisseur compatible avec Airflow 2.8. La version `2.0.0` du fournisseur et les versions ultérieures nécessitent Airflow 2.9 ou une version ultérieure.

**Airflow 2.7.x**
: **Version recommandée du fournisseur** : `1.10.0`
: **Versions minimales requises des dépendances** :
: - `apache-airflow-providers-common-sql>=1.6.0`
: - `openlineage-integration-common>=1.16.0`
: - `openlineage-python>=1.16.0`
: **Notes** : Il s'agit de la version la plus récente du fournisseur compatible avec Airflow 2.7. La version `1.11.0` du fournisseur et les versions ultérieures nécessitent Airflow 2.8 ou une version ultérieure. Pour Airflow 2.7 et 2.8, ajoutez les variables de configuration supplémentaires indiquées dans les étapes de configuration. Si vous utilisez Amazon MWAA 2.7.2, consultez le guide de mise à niveau MWAA pour les wheels corrigés par Datadog.

Examinez le [log des modifications du fournisseur OpenLineage](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html) avant la mise à niveau, car les versions du fournisseur peuvent modifier la version minimale d'Airflow prise en charge ou ajouter des contraintes de dépendance requises.

## Configuration avancée{#advanced-configuration}

### Liez vos jobs dbt aux tâches Airflow {#link-your-dbt-jobs-with-airflow-tasks}

<div class="alert alert-info">Le <code>lineage_root_*</code> les macros utilisées ci-dessous nécessitent <code>apache-airflow-providers-openlineage</code> 2.3.0 ou ultérieure. Avec les anciennes versions du fournisseur (par exemple, Airflow 2.9.2 avec le fournisseur 2.2.0), consultez <a href="#backport-openlineage-lineage-macros-for-older-provider-versions">Rétroportez les macros de lignage OpenLineage pour les anciennes versions du fournisseur</a>.</div>

Vous pouvez surveiller vos jobs dbt qui s'exécutent dans Airflow en connectant la télémétrie dbt aux tâches Airflow respectives, en utilisant [l'intégration OpenLineage dbt][6].

Pour voir le lien entre les tâches Airflow et les jobs dbt, suivez ces étapes :

1. Installez `openlineage-dbt`. Consultez [Utiliser dbt avec Amazon MWAA][7] pour configurer dbt dans l'environnement virtuel.

```shell
pip3 install openlineage-dbt>=1.39.0
```

2. Modifiez l'appel dbt en `dbt-ol` (wrapper OpenLineage pour dbt).

Ajoutez également l'indicateur --consume-structured-logs pour voir les jobs dbt pendant que la commande est toujours en cours d'exécution.

```bash
dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR
```

3. Dans votre fichier DAG, définissez les variables d'environnement parent et root-parent OpenLineage sur la tâche Airflow qui exécute le processus dbt afin que les jobs dbt soient liés à la fois à la tâche parente immédiate et à l'exécution du DAG la plus externe dans Datadog :

```python
dbt_run = BashOperator(
    task_id="dbt_run",
    dag=dag,
    bash_command=f"dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR",
    append_env=True,
    env={
        "OPENLINEAGE_PARENT_JOB_NAMESPACE": "{{ lineage_job_namespace() }}",
        "OPENLINEAGE_PARENT_JOB_NAME": "{{ lineage_job_name(task_instance) }}",
        "OPENLINEAGE_PARENT_RUN_ID": "{{ lineage_run_id(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAMESPACE": "{{ lineage_root_job_namespace(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAME": "{{ lineage_root_job_name(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_RUN_ID": "{{ lineage_root_run_id(task_instance) }}",
    },
)
```

### Liez vos jobs Spark aux tâches Airflow {#link-your-spark-jobs-with-airflow-tasks}

<div class="alert alert-info">Le <code>lineage_root_*</code> les macros nécessitent <code>apache-airflow-providers-openlineage</code> 2.3.0 ou ultérieure. Avec les anciennes versions du fournisseur (par exemple, Airflow 2.9.2 avec le fournisseur 2.2.0), consultez <a href="#backport-openlineage-lineage-macros-for-older-provider-versions">Rétroportez les macros de lignage OpenLineage pour les anciennes versions du fournisseur</a>.</div>

L'intégration OpenLineage peut injecter automatiquement les informations du job parent d'Airflow (espace de noms, nom du job, ID d'exécution) dans les propriétés de l'application Spark. Cela crée une relation parent-enfant entre les tâches Airflow et les jobs Spark, vous permettant de dépanner les deux systèmes au même endroit.

**Note** : Cette fonctionnalité nécessite la version `apache-airflow-providers-openlineage` 2.1.0 ou ultérieure (prise en charge à partir d'Airflow 2.9+).

1. **Vérifiez la compatibilité de l'opérateur** : Consultez la [documentation Apache Airflow OpenLineage][8] pour confirmer que vos opérateurs Spark sont pris en charge. Cette fonctionnalité ne fonctionne qu'avec des opérateurs spécifiques tels que SparkSubmitOperator et LivyOperator.

2. Assurez-vous que vos jobs Spark sont activement surveillés via [Data Observability: Jobs Monitoring][2].

3. Activez l'injection automatique des informations du job parent en définissant la configuration suivante :

```shell
AIRFLOW__OPENLINEAGE__SPARK_INJECT_PARENT_JOB_INFO=true
```

Ceci injecte automatiquement les propriétés du job parent pour tous les opérateurs Spark pris en charge. Pour désactiver cette option pour des opérateurs spécifiques, définissez `openlineage_inject_parent_job_info=False` sur l'opérateur.

#### Injectez manuellement les informations du job parent pour les opérateurs non pris en charge {#manually-inject-parent-job-information-for-unsupported-operators}

Pour les opérateurs qui ne prennent pas en charge l'injection automatique (par exemple, un `BashOperator` exécutant la CLI AWS pour démarrer un job Amazon EMR Serverless), utilisez les [macros de lignage OpenLineage Airflow][4] pour transmettre les identifiants du parent et du parent racine en tant que propriétés de configuration Spark :

```python
from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator

with DAG(
    dag_id="emr_serverless_with_openlineage_parent",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
) as dag:

    submit = BashOperator(
        task_id="start_emr_serverless_job",
        bash_command=r"""
set -euo pipefail

aws emr-serverless start-job-run \
  --application-id <APPLICATION_ID> \
  --execution-role-arn <EXECUTION_ROLE_ARN> \
  --name <JOB_NAME> \
  --region <AWS_REGION> \
  --mode STREAMING \
  --job-driver '{"sparkSubmit": {
    "entryPoint": "<JAR_URL>",
    "entryPointArguments": ["--config-key", "<CONFIG_KEY>", "--stage", "<STAGE>"],
    "sparkSubmitParameters": "\
--conf spark.app.name=<APP_NAME> \
--conf spark.openlineage.parentJobNamespace={{ lineage_job_namespace() }} \
--conf spark.openlineage.parentJobName={{ lineage_job_name(task_instance) }} \
--conf spark.openlineage.parentRunId={{ lineage_run_id(task_instance) }} \
--conf spark.openlineage.rootParentJobNamespace={{ lineage_root_job_namespace(task_instance) }} \
--conf spark.openlineage.rootParentJobName={{ lineage_root_job_name(task_instance) }} \
--conf spark.openlineage.rootParentRunId={{ lineage_root_run_id(task_instance) }}\
"
  }}'
""",
    )
```

### Rétroportez les macros de lignage OpenLineage pour les anciennes versions du fournisseur {#backport-openlineage-lineage-macros-for-older-provider-versions}

Les macros `lineage_root_job_namespace`, `lineage_root_job_name` et `lineage_root_run_id` qui émettent les identifiants du DAG le plus externe pour la liaison au parent racine ont été ajoutées dans `apache-airflow-providers-openlineage` 2.3.0. Si vous ne pouvez pas mettre à niveau le fournisseur (par exemple, Amazon MWAA sur Airflow 2.9.2 impose la version 2.2.0 du fournisseur), définissez les macros manquantes comme `user_defined_macros` sur le DAG :

```python
from __future__ import annotations

from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.openlineage import conf as ol_conf
from airflow.providers.openlineage.plugins.adapter import OpenLineageAdapter


def _logical_date(ti):
    return getattr(ti, "logical_date", None) or ti.execution_date


def _clear_number(ti) -> int:
    return ti.get_dagrun().clear_number


def _root_from_conf(ti, key):
    ol = (ti.get_dagrun().conf or {}).get("openlineage") or {}
    return ol.get(key) or None


def lineage_job_namespace():
    return ol_conf.namespace()


def lineage_job_name(ti):
    return f"{ti.dag_id}.{ti.task_id}"


def lineage_run_id(ti):
    return OpenLineageAdapter.build_task_instance_run_id(
        dag_id=ti.dag_id,
        task_id=ti.task_id,
        try_number=ti.try_number,
        logical_date=_logical_date(ti),
        map_index=ti.map_index,
    )


def lineage_root_job_namespace(ti):
    return _root_from_conf(ti, "rootParentJobNamespace") or ol_conf.namespace()


def lineage_root_job_name(ti):
    return _root_from_conf(ti, "rootParentJobName") or ti.dag_id


def lineage_root_run_id(ti):
    forwarded = _root_from_conf(ti, "rootParentRunId")
    if forwarded:
        return forwarded
    return OpenLineageAdapter.build_dag_run_id(
        dag_id=ti.dag_id,
        logical_date=_logical_date(ti),
        clear_number=_clear_number(ti),
    )


OL_MACROS = {
    "lineage_job_namespace": lineage_job_namespace,
    "lineage_job_name": lineage_job_name,
    "lineage_run_id": lineage_run_id,
    "lineage_root_job_namespace": lineage_root_job_namespace,
    "lineage_root_job_name": lineage_root_job_name,
    "lineage_root_run_id": lineage_root_run_id,
}


with DAG(
    dag_id="<YOUR_DAG_ID>",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
    user_defined_macros=OL_MACROS,
) as dag:
    submit = BashOperator(
        task_id="<YOUR_TASK_ID>",
        bash_command="...",
    )
```

Avec `user_defined_macros` défini sur le DAG, le `{{ lineage_*() }}` and `Les appels à {{ lineage_root_*() }}` dans vos modèles de tâches sont résolus en valeurs correspondant aux macros intégrées fournies avec le provider 2.3.0+, afin que les jobs Spark ou dbt en aval puissent être liés au parent racine Airflow dans Datadog.

### Exclure des DAG spécifiques de Jobs Monitoring {#exclude-specific-dags-from-jobs-monitoring}

<div class="alert alert-info">Le <code>emission_policy</code> la configuration nécessite <code>apache-airflow-providers-openlineage</code> 2.19.0 ou version ultérieure, ce qui nécessite Airflow 2.11 ou version ultérieure.</div>

Pour empêcher des DAG spécifiques d'envoyer des événements OpenLineage à Datadog, ajoutez une règle `emission_policy` pour chaque DAG dans la section `[openlineage]` de votre configuration Airflow :

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "<YOUR_DAG_ID>"}, "controls": {"emit": false}}]
```

Remplacez `<YOUR_DAG_ID>` par l'ID du DAG que vous souhaitez exclure.

Pour exclure plusieurs DAG partageant un modèle de nommage, définissez `match_mode` sur `regex` :

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "^staging_.*"}, "match_mode": "regex", "controls": {"emit": false}}]
```

Définissez `emission_policy` de la même manière que les autres options du provider OpenLineage pour votre plateforme, par exemple au moyen d'une surcharge de la configuration Airflow ou de la variable d'environnement `AIRFLOW__OPENLINEAGE__EMISSION_POLICY`. Redémarrez vos schedulers et workers Airflow pour appliquer la modification.

Pour découvrir d'autres périmètres et contrôles, consultez la [documentation sur la politique d'émission OpenLineage][9].


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator
[6]: https://openlineage.io/docs/integrations/dbt/
[7]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[8]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/spark.html#automatic-injection
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/emission_policy.html