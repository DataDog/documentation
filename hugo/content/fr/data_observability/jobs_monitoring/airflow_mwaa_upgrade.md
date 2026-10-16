---
description: Résolvez les conflits de dépendances lors de l'installation d'apache-airflow-providers-openlineage
  sur Amazon MWAA Airflow 2.7.2, 2.8.1 ou 2.9.2.
further_reading:
- link: /data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
  tag: Documentation
  text: 'Activez Data Observability : Jobs Monitoring pour Apache Airflow'
title: Mettez à niveau le fournisseur OpenLineage sur Amazon MWAA pour Airflow 2.7.2,
  2.8.1 ou 2.9.2.
---
## Présentation {#overview}

Utilisez ce guide si votre environnement Amazon MWAA exécute Airflow `2.7.2`, `2.8.1` ou `2.9.2`.

Pour ces versions d'Airflow, les contraintes par défaut de MWAA épinglent des versions plus anciennes de `apache-airflow-providers-openlineage` et des packages OpenLineage. Ces versions peuvent entraîner des problèmes connus de fiabilité et de compatibilité, ce qui peut dégrader l'expérience d'utilisation de Data Observability.

Pour utiliser des versions de fournisseur incluant ces correctifs, mettez à jour les contraintes et les exigences ensemble. Amazon MWAA applique des contraintes de package pour chaque version d'Airflow et de Python, donc la mise à niveau des packages OpenLineage peut entrer en conflit avec les valeurs par défaut de MWAA, sauf si vous fournissez des contraintes personnalisées.

Pour plus de détails sur le comportement des dépendances et des contraintes MWAA, consultez la documentation AWS sur les [dépendances Python][3]. Pour consulter la compatibilité et les exigences du fournisseur, consultez la [documentation du fournisseur OpenLineage][4].

Pour les étapes de configuration de base, consultez [Activez Data Observability : Jobs Monitoring pour Apache Airflow][1].

## Pour les autres versions de MWAA {#for-other-mwaa-versions}

Si votre environnement MWAA exécute une version d'Airflow qui n'est pas répertoriée dans ce guide, Datadog recommande d'utiliser la version `apache-airflow-providers-openlineage` la plus récente compatible avec votre version d'Airflow. Utilisez le [tableau de compatibilité du fournisseur Airflow OpenLineage][8] pour choisir cette version, puis suivez le même modèle de contraintes :

1. Téléchargez le fichier de contraintes MWAA pour vos versions d'Airflow et de Python.
2. Mettez à jour l'épinglage du fournisseur OpenLineage et tous les épinglages de dépendances OpenLineage requis dans `constraints.txt`.
3. Épinglez les mêmes versions dans `requirements.txt`.
4. Téléchargez les deux fichiers dans votre bucket S3 MWAA et mettez à jour l'environnement MWAA.

Datadog recommande d'utiliser la version de fournisseur compatible la plus récente disponible pour votre version d'Airflow. Consultez le [log des modifications du fournisseur OpenLineage][9] avant la mise à jour, car les versions du fournisseur peuvent modifier la version minimale d'Airflow prise en charge ou les versions de dépendances requises.

## Prérequis {#requirements}

- Accès au compartiment Amazon S3 configuré pour votre environnement MWAA
- Autorisation de mettre à jour `requirements.txt` et la configuration de l'environnement MWAA

## Versions recommandées {#recommended-versions}

Le tableau suivant présente les versions par défaut épinglées par les contraintes MWAA et les versions de mise à niveau recommandées pour chaque version d'Airflow :

| Package | Airflow 2.7.2 | Airflow 2.8.1 | Airflow 2.9.2 |
|---|---|---|---|
| `apache-airflow-providers-openlineage` | Par défaut : 1.1.0 <br/> Mise à niveau : **1.14.0** - [Roue corrigée Datadog][6] | Par défaut : 1.4.0 <br/> Mise à niveau : **1.14.0** | Par défaut : 1.8.0 <br/> Mise à niveau : **2.2.0** |
| `apache-airflow-providers-common-sql` | Par défaut : 1.7.2 <br/> Mise à niveau : aucun changement | Par défaut : 1.10.0 <br/> Mise à niveau : **1.20.0** | Par défaut : 1.14.0 <br/> Mise à niveau : **1.21.0** |
| `apache-airflow-providers-common-compat` | Par défaut : n/a <br/> Mise à niveau : **1.2.2** - [Roue corrigée Datadog][7] | Par défaut : n/a <br/> Mise à niveau : **1.2.1** | Par défaut : n/a <br/> Mise à niveau : **1.4.0** |
| `openlineage-integration-common` | Par défaut : 1.3.1 <br/> Mise à niveau : **1.24.2** | Par défaut : 1.7.0 <br/> Mise à niveau : **1.24.2** | Par défaut : 1.16.0 <br/> Mise à niveau : **1.31.0** |
| `openlineage-python` | Par défaut : 1.3.1 <br/> Mise à niveau : **1.24.2** | Par défaut : 1.7.0 <br/> Mise à niveau : **1.24.2** | Par défaut : 1.16.0 <br/> Mise à niveau : **1.31.0** |
| `openlineage-sql` | Par défaut : 1.3.1 <br/> Mise à niveau : **1.24.2** | Par défaut : 1.7.0 <br/> Mise à niveau : **1.24.2** | Par défaut : 1.16.0 <br/> Mise à niveau : **1.31.0** |

## Mettez à jour les contraintes et les exigences {#update-constraints-and-requirements}

{{< tabs >}}
{{% tab "Airflow 2.7.2" %}}

Airflow 2.7.2 n'est pas compatible avec le package `apache-airflow-providers-openlineage` 1.14.0 en amont. Datadog fournit des versions corrigées des packages de fournisseur et `common-compat` avec des contraintes de version Airflow assouplies pour une utilisation sur MWAA 2.7.2.

1. Téléchargez les fichiers wheel corrigés et téléversez-les dans votre compartiment S3 MWAA :

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   curl -Lo apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl"
   curl -Lo apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl"
   aws s3 cp apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   aws s3 cp apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   ```

2. Téléchargez le fichier de contraintes Airflow :

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.7.2/constraints-3.11.txt"
   ```

   **Remarque** : Vérifiez la version de Python pour votre environnement MWAA. Si votre environnement utilise une version de Python différente, remplacez `3.11` dans l'URL.

3. Modifiez `constraints.txt` et mettez à jour ces épinglages de package :

   ```text
   apache-airflow-providers-openlineage==1.14.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   Ajoutez également la ligne suivante, car elle n'est pas présente dans le fichier de contraintes par défaut :

   ```text
   apache-airflow-providers-common-compat==1.2.2
   ```

   Aucun changement n'est nécessaire pour `apache-airflow-providers-common-sql` (le `1.7.2` par défaut est compatible).

4. Téléversez le fichier de contraintes mis à jour dans votre compartiment S3 MWAA :

   ```shell
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

5. Mettez à jour `requirements.txt` pour référencer les roues corrigées et les contraintes :

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   /usr/local/airflow/dags/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
   /usr/local/airflow/dags/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

6. Téléversez le fichier `requirements.txt` mis à jour :

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.8.1" %}}

1. Téléchargez le fichier de contraintes Airflow :

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.8.1/constraints-3.11.txt"
   ```

   **Remarque** : Vérifiez la version de Python pour votre environnement MWAA. Si votre environnement utilise une version de Python différente, remplacez `3.11` dans l'URL.

2. Modifiez `constraints.txt` et mettez à jour ces épinglages de package :

   ```text
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   Ajoutez également la ligne suivante, car elle n'est pas présente dans le fichier de contraintes par défaut :

   ```text
   apache-airflow-providers-common-compat==1.2.1
   ```

3. Téléversez le fichier de contraintes mis à jour dans votre compartiment S3 MWAA :

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. Mettez à jour `requirements.txt` pour référencer le fichier de contraintes et épingler les versions des paquets mis à niveau :

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   apache-airflow-providers-common-compat==1.2.1
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

5. Téléversez le fichier `requirements.txt` mis à jour :

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.9.2" %}}

1. Téléchargez le fichier de contraintes Airflow :

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.9.2/constraints-3.11.txt"
   ```

   **Remarque** : Vérifiez la version de Python pour votre environnement MWAA. Si votre environnement utilise une version de Python différente, remplacez `3.11` dans l'URL.

2. Modifiez `constraints.txt` et mettez à jour ces épinglages de package :

   ```text
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

   Ajoutez également la ligne suivante, car elle n'est pas présente dans le fichier de contraintes par défaut :

   ```text
   apache-airflow-providers-common-compat==1.4.0
   ```

3. Téléversez le fichier de contraintes mis à jour dans votre compartiment S3 MWAA :

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. Mettez à jour `requirements.txt` pour référencer le fichier de contraintes et épingler les versions des paquets mis à niveau :

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   apache-airflow-providers-common-compat==1.4.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

5. Téléversez le fichier `requirements.txt` mis à jour :

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{< /tabs >}}

## Déployez et validez {#deploy-and-validate}

1. Dans la console MWAA, mettez à jour l'environnement afin qu'il prenne en compte le nouveau `requirements.txt`.
2. Attendez que la mise à jour de l'environnement soit terminée.
3. Examinez les logs d'installation et de démarrage de MWAA. Confirmez qu'il n'y a aucune erreur de résolution de dépendances.
4. Déclenchez une exécution de DAG qui émet des événements OpenLineage.
5. Dans Datadog, vérifiez que les exécutions apparaissent sur la page [Data Observability: Jobs Monitoring][2].

## Dépannage {#troubleshooting}

- Si la résolution des dépendances échoue toujours, vérifiez que les mêmes versions de paquets sont épinglées dans `constraints.txt` et `requirements.txt`.
- Si MWAA installe des versions plus anciennes, vérifiez que `requirements.txt` pointe vers `--constraint /usr/local/airflow/dags/constraints.txt` et que le fichier existe dans votre chemin S3 `dags/`.
- Si les chargements ou les lectures échouent, vérifiez que le rôle d'exécution MWAA a accès aux objets S3 requis. Pour plus de détails, consultez [Rôle d'exécution Amazon MWAA][5].

## Si vous gérez une image personnalisée {#if-you-manage-a-custom-image}

Si votre équipe gère les versions des paquets via une image Airflow personnalisée, mettez d'abord à jour les versions des paquets dans la définition de l'image, puis régénérez `requirements.txt` à partir de l'image construite afin que les contraintes et les exigences restent alignées.

[1]: /fr/data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/connections-packages.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[5]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[6]: /fr/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
[7]: /fr/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
[8]: /fr/data_observability/jobs_monitoring/airflow/#openlineage-provider-compatibility
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html