---
aliases:
- /fr/data_jobs/databricks
description: 'Activez Data Observability : Jobs Monitoring pour les espaces de travail
  Databricks avec authentification OAuth ou par jeton d''accès personnel et installation
  du Datadog Agent.'
further_reading:
- link: /data_jobs
  tag: Documentation
  text: 'Data Observability : Jobs Monitoring'
- link: https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/
  tag: Blog
  text: Détectez les problèmes et optimisez les dépenses avec la surveillance des
    jobs serverless Databricks
title: 'Activez Data Observability : Jobs Monitoring'
---
Data Observability : Jobs Monitoring][7] offre une visibilité sur les performances et la fiabilité de vos jobs et workflows Databricks s'exécutant sur des clusters ou des ressources de calcul serverless.

## Configuration {#setup}

<div class="alert alert-info">Si votre espace de travail Databricks a des <a href="https://docs.databricks.com/en/security/network/front-end/index.html">restrictions réseau</a> activées, ajoutez Datadog à votre liste d'autorisation. {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} à votre liste d'autorisation. Si votre espace de travail utilise Private Link, consultez l'onglet <strong>Connectivité Private Link</strong> ci-dessous.</div>

Suivez ces étapes pour activer Data Observability : Jobs Monitoring pour Databricks.

1. [Configurez l'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration) pour un espace de travail Databricks.
1. [Installez le Datadog Agent](#install-the-datadog-agent) sur votre ou vos clusters Databricks dans l'espace de travail.


### Configurez l'intégration Datadog-Databricks {#configure-the-datadog-databricks-integration}

{{< tabs >}}

{{% tab "Utilisez un principal de service pour OAuth" %}}

<div class="alert alert-danger">Les nouvelles intégrations d'espace de travail doivent s'authentifier à l'aide d'OAuth. Les espaces de travail déjà intégrés avec un jeton d'accès personnel continuent de fonctionner et peuvent passer à OAuth à tout moment. Une fois qu'un espace de travail commence à utiliser OAuth, il ne peut pas revenir à un jeton d'accès personnel.</div>

#### Créez et configurez le principal de service dans Databricks {#create-and-configure-the-service-principal-in-databricks}

1. En tant qu'**administrateur de l'espace de travail Databricks**, accédez à {{< ui >}}Settings{{< /ui >}} en cliquant sur votre profil dans le coin supérieur droit de l'espace de travail.
1. Sous l'onglet {{< ui >}}Identity and access{{< /ui >}}, cliquez sur {{< ui >}}Manage{{< /ui >}} à côté de {{< ui >}}Service principals{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add service principal{{< /ui >}}, puis cliquez sur {{< ui >}}Add new{{< /ui >}}.

   <div class="alert alert-warning">Pour Azure Databricks, sélectionnez le type de gestion « Databricks managed ». Datadog ne prend PAS en charge les principaux de service « Microsoft Entra ID managed ».</div>
1. Saisissez un nom et activez les droits d'accès à l'espace de travail suivants pour le principal de service :
   - {{< ui >}}Workspace access{{< /ui >}}
   - {{< ui >}}Databricks SQL access{{< /ui >}}
   - {{< ui >}}Admin access{{< /ui >}} : Accorde l'accès administrateur de l'espace de travail requis par Datadog. Cela équivaut à ajouter le principal de service au groupe `admins`.

   <div class="alert alert-info">Si vous ne pouvez pas accorder le droit d'accès <strong>Admin access</strong>, provisionnez un accès granulaire à la place, comme décrit dans la section <a href="#permissions">Permissions</a> sous Configuration avancée.</div>
1. Cliquez sur **Add**.

1. Cliquez sur le nom de votre nouveau principal de service. Sous l'onglet {{< ui >}}Secrets{{< /ui >}}, cliquez sur {{< ui >}}Generate secret{{< /ui >}}.
   1. Définissez {{< ui >}}Lifetime (days){{< /ui >}} sur la valeur maximale autorisée (730).

   1. Cliquez sur {{< ui >}}Generate{{< /ui >}}.

   1. Notez votre ID client et votre secret client.

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="Dans Databricks, une fenêtre modale affichant l'ID client et le secret associés à un nouveau secret OAuth s'affiche." style="width:70%;" >}}

1. Sur l'onglet {{< ui >}}Permissions{{< /ui >}}, cliquez sur {{< ui >}}Grant access{{< /ui >}}. Recherchez le nouveau principal de service, accordez-lui l'autorisation {{< ui >}}Manage{{< /ui >}}, et cliquez sur {{< ui >}}Save{{< /ui >}}.

#### Ajoutez l'espace de travail Databricks à Datadog {#add-the-databricks-workspace-to-datadog}

1. Dans Datadog, ouvrez la tuile d'intégration Databricks.
1. Sous l'onglet {{< ui >}}Configure{{< /ui >}}, cliquez sur {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Saisissez un nom d'espace de travail, l'URL de votre espace de travail Databricks, ainsi que l'ID client et le secret que vous avez générés.
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="Dans la tuile d'intégration Datadog-Databricks, un espace de travail Databricks s'affiche. Cet espace de travail possède un nom, une URL, un ID client et un secret client." style="width:100%;" >}}
1. Indiquez l'ID d'un [Databricks SQL Warehouse][19] que Datadog doit interroger. Cela vous donne une visibilité sur vos coûts Databricks dans Jobs Monitoring ou [Cloud Cost Management][18] et alimente [Quality Monitoring][21].
   1. Dans Databricks, accédez à {{< ui >}}SQL Warehouses{{< /ui >}} et sélectionnez l'entrepôt que Datadog doit utiliser. Il doit s'agir d'un entrepôt Pro ou Serverless. Les entrepôts classiques ne sont pas pris en charge. Pour réduire les coûts, utilisez un entrepôt 2XS dédié, avec l'arrêt automatique configuré sur 5 à 10 minutes.
   1. Copiez l'ID depuis la page de présentation de l'entrepôt (il s'agit également du dernier segment de l'URL de l'entrepôt) et saisissez-le dans la tuile d'intégration.
   1. Sous l'onglet {{< ui >}}Permissions{{< /ui >}} de l'entrepôt (en haut à droite), accordez `CAN USE` au principal de service.
   1. Accordez au principal de service un accès en lecture aux [tables système][20] du catalogue Unity. Dans {{< ui >}}SQL Editor{{< /ui >}}, exécutez les commandes suivantes en utilisant l'ID client du principal de service (et non son nom d'affichage) :

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">L'utilisateur qui exécute ces commandes doit disposer du <code>MANAGE</code> privilège sur <code>CATALOG system</code>.</div>
1. Dans la section **Sélectionnez les produits pour configurer l'intégration**, assurez-vous que Data Observability: Jobs Monitoring est {{< ui >}}Enabled{{< /ui >}}.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, choisissez soit
    - [Géré par Datadog (recommandé)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent) : Datadog installe et gère l'Agent avec un script d'initialisation global dans l'espace de travail.
    - [Manuellement](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) : Suivez les [instructions ci-dessous](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) pour installer et gérer le script d'initialisation afin d'installer l'Agent globalement ou sur des clusters Databricks spécifiques.

[18]: https://docs.datadoghq.com/fr/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /fr/data_observability/quality_monitoring/data_warehouses/databricks/

{{% /tab %}}

{{% tab "Connectivité Private Link" %}}

Si votre espace de travail Databricks est déployé à l'aide de [Private Link Connectivity][25], Datadog ne peut pas accéder directement aux API Databricks. Cela nécessite l'utilisation d'un [Private Action Runner][26] déployé dans votre environnement.

Consultez [Private Link Connectivity (Preview)][15] pour obtenir les instructions de configuration complètes.

[15]: /fr/data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/fr/actions/private_actions/

{{% /tab %}}

{{% tab "Utiliser un jeton d'accès personnel (hérité)" %}}

<div class="alert alert-danger">Cette option est uniquement disponible pour les intégrations d'espace de travail créées avant le 7 juillet 2025. Les nouvelles intégrations d'espace de travail doivent s'authentifier à l'aide d'OAuth.</div>

1. Dans votre espace de travail Databricks, cliquez sur votre profil dans le coin supérieur droit et accédez à {{< ui >}}Settings{{< /ui >}}. Sélectionnez {{< ui >}}Developer{{< /ui >}} dans la barre latérale gauche. À côté de {{< ui >}}Access tokens{{< /ui >}}, cliquez sur {{< ui >}}Manage{{< /ui >}}.
1. Cliquez sur {{< ui >}}Generate new token{{< /ui >}}, saisissez « Datadog Integration » dans le champ {{< ui >}}Comment{{< /ui >}}, définissez la valeur {{< ui >}}Lifetime (days){{< /ui >}} au maximum autorisé (730 jours) et créez un rappel pour mettre à jour le jeton avant qu'il n'expire. Cliquez ensuite sur {{< ui >}}Generate{{< /ui >}}. Prenez note de votre jeton.

   **Important :**
   * Pour l'installation du script d'initialisation géré par [Datadog (recommandé)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent), assurez-vous que le Principal du jeton est un <strong>Workspace Admin</strong>.
   * Pour une installation manuelle du script d'initialisation, assurez-vous que le Principal du jeton dispose de l'[accès CAN VIEW][9] pour les jobs et clusters Databricks que vous souhaitez surveiller.

   Sinon, suivez la [documentation officielle de Databricks][10] pour générer un jeton d'accès pour un [principal de service][11]. Le principal de service doit avoir le [droit <strong>Accès à l'espace de travail</strong>][17] activé et les autorisations <strong>Workspace Admin</strong> ou [CAN VIEW access][9] comme décrit ci-dessus.
1. Dans Datadog, ouvrez la tuile d'intégration Databricks.
1. Sous l'onglet {{< ui >}}Configure{{< /ui >}}, cliquez sur {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Saisissez un nom d'espace de travail, l'URL de votre espace de travail Databricks et le jeton Databricks que vous avez généré.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="Dans la tuile d'intégration Datadog-Databricks, un espace de travail Databricks s'affiche. Cet espace de travail possède un nom, une URL et un jeton d'API." style="width:100%;" >}}
1. Indiquez l'ID d'un [Databricks SQL Warehouse][19] que Datadog doit interroger. Cela vous donne une visibilité sur vos coûts Databricks dans Jobs Monitoring ou [Cloud Cost Management][18] et alimente [Quality Monitoring][21].
   1. Dans Databricks, accédez à {{< ui >}}SQL Warehouses{{< /ui >}} et sélectionnez l'entrepôt que Datadog doit utiliser. Il doit s'agir d'un entrepôt Pro ou Serverless. Les entrepôts classiques ne sont pas pris en charge. Pour réduire les coûts, utilisez un entrepôt 2XS dédié, avec l'arrêt automatique configuré sur 5 à 10 minutes.
   1. Copiez l'ID depuis la page de présentation de l'entrepôt (il s'agit également du dernier segment de l'URL de l'entrepôt) et saisissez-le dans la tuile d'intégration.
   1. Dans l'onglet {{< ui >}}Permissions{{< /ui >}} de l'entrepôt (en haut à droite), accordez `CAN USE` au principal du jeton.
   1. Accordez au principal du jeton un accès en lecture aux [tables système][20] du catalogue Unity. Dans le {{< ui >}}SQL Editor{{< /ui >}}, exécutez les commandes suivantes en utilisant l'ID client du principal (et non son nom d'affichage) :

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">L'utilisateur qui exécute ces commandes doit disposer du <code>MANAGE</code> privilège sur <code>CATALOG system</code>.</div>
1. Dans la section **Select products to set up integration**, assurez-vous que le produit Data Observability: Jobs Monitoring est **Activé**.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, choisissez soit
    - [Géré par Datadog (recommandé)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent) : Datadog installe et gère l'Agent avec un script d'initialisation global dans l'espace de travail.
    - [Manuellement](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) : Suivez les [instructions ci-dessous](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) pour installer et gérer le script d'initialisation afin d'installer l'Agent globalement ou sur des clusters Databricks spécifiques.

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/fr/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /fr/data_observability/quality_monitoring/data_warehouses/databricks/


{{% /tab %}}

{{< /tabs >}}

### Installez le Datadog Agent {#install-the-datadog-agent}

Le Datadog Agent doit être installé sur les clusters Databricks pour surveiller les jobs Databricks qui s'exécutent sur des clusters polyvalents ou des clusters de jobs. Cette étape n'est pas requise pour surveiller les jobs sur [serverless compute][4].

{{< tabs >}}
{{% tab "Script d'initialisation global géré par Datadog (recommandé)" %}}

Datadog peut installer et gérer un script d'initialisation global dans l'espace de travail Databricks. Le Datadog Agent est installé sur tous les clusters de l'espace de travail, au moment de leur démarrage.

<div class="alert alert-danger">
<ul>
<li>Cette configuration ne fonctionne pas sur les clusters Databricks en mode d'accès <strong>Standard</strong>, car les scripts d'initialisation globaux ne peuvent pas être installés sur ces clusters. Si vous utilisez des clusters avec le mode d'accès <strong>Standard</strong>, Datadog recommande de <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">configurer manuellement une stratégie de cluster</a> sur plusieurs clusters ou de <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">l'installer manuellement sur un cluster spécifique</a>.</li>
<li>Cette option d'installation, dans laquelle Datadog installe et gère votre script d'initialisation global Datadog, nécessite un jeton d'accès Databricks avec des autorisations <strong>Administrateur d'espace de travail</strong>. Un jeton avec un accès CAN VIEW ne permet pas à Datadog de gérer le script d'initialisation global de votre compte Databricks.</li>
</ul>
</div>

#### Lors de l'intégration d'un espace de travail avec Datadog {#when-integrating-a-workspace-with-datadog}

1. Dans la section **Select products to set up integration**, assurez-vous que le produit Data Observability: Jobs Monitoring est **Activé**.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, sélectionnez le bouton bascule {{< ui >}}Managed by Datadog{{< /ui >}}.
1. Cliquez sur {{< ui >}}Select API Key{{< /ui >}} pour sélectionner une clé d'API Datadog existante ou pour en créer une nouvelle.
1. (Facultatif) Désactivez {{< ui >}}Enable Log Collection{{< /ui >}} si vous ne souhaitez pas collecter les logs du driver et des workers pour les corréler avec les jobs.
1. Cliquez sur {{< ui >}}Save Databricks Workspace{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="Dans la tuile d'intégration Datadog-Databricks, configuration du Datadog Agent lors de l'ajout d'un espace de travail Databricks. Datadog peut installer et gérer un script d'initialisation global." style="width:100%;" >}}

#### Lors de l'ajout du script d'initialisation à un espace de travail Databricks déjà intégré à Datadog {#when-adding-the-init-script-to-a-databricks-workspace-already-integrated-with-datadog}

1. Sur l'onglet **Configure**, cliquez sur l'espace de travail dans la liste des espaces de travail.
1. Cliquez sur l'onglet {{< ui >}}Configured Products{{< /ui >}}
1. Assurez-vous que le produit Data Observability: Jobs Monitoring est **Activé**.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, sélectionnez le bouton bascule {{< ui >}}Managed by Datadog{{< /ui >}}.
1. Cliquez sur {{< ui >}}Select API Key{{< /ui >}} pour sélectionner une clé d'API Datadog existante ou pour en créer une nouvelle.
1. (Facultatif) Désactivez {{< ui >}}Enable Log Collection{{< /ui >}} si vous ne souhaitez pas collecter les logs du driver et des workers pour les corréler avec les jobs.
1. Cliquez sur **Save Databricks Workspace** en bas de la fenêtre du navigateur.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="Dans la tuile d'intégration Datadog-Databricks, Datadog Agent Setup pour un espace de travail Databricks déjà ajouté à l'intégration. Datadog peut installer et gérer un script d'initialisation global." style="width:100%;" >}}

Vous pouvez éventuellement ajouter des tags à vos métriques de performance de cluster Databricks et Spark en configurant la variable d'environnement suivante dans la section {{< ui >}}Advanced Configuration{{< /ui >}} de votre cluster dans l'interface utilisateur Databricks ou en tant que [variables d'environnement Spark][2] avec l'API Databricks :

| Variable                 | Description                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Ajoutez des tags aux métriques de performance de cluster Databricks et Spark. Paires clé:valeur séparées par des virgules ou des espaces : Suivez les [conventions de tags Datadog][1]. Par exemple : `env:staging,team:data_engineering` |
| DD_ENV | Remplacez le tag d'environnement `env` sur les métriques, les traces et les logs de ce cluster. Par défaut, le nom de l'espace de travail Databricks est utilisé comme env.|
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtrez les logs collectés avec des règles de traitement. Consultez [Collecte avancée de logs][3] pour plus de détails. |


[1]: /fr/getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /fr/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "Configurez manuellement une politique de cluster" %}}

Cette approche est recommandée pour les clusters en mode d'accès **Standard**.

**Créez le script d'initialisation**

1. Dans Databricks, créez un fichier de script d'initialisation dans un [volume Unity Catalog][26] avec le contenu suivant. Assurez-vous de noter le chemin du volume (par exemple, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. Accordez des autorisations en lecture seule au script d'initialisation :
    1. Au niveau du volume, accordez l'autorisation `READ VOLUME` à tous les utilisateurs du compte.
    1. Au niveau du catalogue, accordez l'autorisation `USE CATALOG` à tous les utilisateurs du compte.

   <div class="alert alert-info">Databricks évalue les autorisations de volume Unity Catalog par rapport au <strong>propriétaire du cluster</strong>, et non par rapport au principal exécutant le cluster.</div>

1. **Ajoutez le script d'initialisation à la liste d'autorisation** : Pour les clusters en mode d'accès **Standard**, vous devez ajouter le chemin du script d'initialisation à la liste d'autorisation du Unity Catalog. Suivez les instructions de la [documentation Databricks][27] pour ajouter le chemin de votre script d'initialisation à la liste d'autorisation.

**Configurez la politique de calcul**

1. Dans {{< ui >}}Compute{{< /ui >}}, accédez à l'onglet {{< ui >}}Policies{{< /ui >}}. Si vous avez déjà une politique de cluster appliquée à vos clusters, accédez à cette politique existante pour la modifier. Il s'agit de l'approche la plus simple, car la politique s'applique automatiquement à tous les clusters qui l'utilisent. Sinon, cliquez sur {{< ui >}}Create Policy{{< /ui >}} pour créer une nouvelle politique.
1. Pour ajouter le script d'initialisation à la politique de cluster, dans la section {{< ui >}}Definition{{< /ui >}}, cliquez sur {{< ui >}}Add Definition{{< /ui >}}. Dans la fenêtre modale qui s'ouvre, remplissez les champs :
   1. Dans la liste déroulante {{< ui >}}Field{{< /ui >}}, sélectionnez {{< ui >}}init_scripts{{< /ui >}}.
   1. Dans la liste déroulante {{< ui >}}Source{{< /ui >}}, sélectionnez {{< ui >}}Volume{{< /ui >}}.
   1. Sous {{< ui >}}Destination{{< /ui >}}, saisissez le chemin du volume vers votre script d'initialisation.
   1. Cliquez sur {{< ui >}}Add{{< /ui >}}.
1. Configurez les variables d'environnement. Vous devez ajouter chacune des variables d'environnement suivantes à la politique de cluster que vous avez créée :

   | Clé                  | Description                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | Votre [clé d'API Datadog][1].   |
   | DD_SITE              | Votre [site Datadog][2].      |
   | DATABRICKS_WORKSPACE | Nom de votre espace de travail Databricks. Il doit correspondre au nom fourni à l'étape [d'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration). |

   1. Pour chacune des variables ci-dessus, dans la section {{< ui >}}Definition{{< /ui >}}, cliquez sur {{< ui >}}Add Definition{{< /ui >}}. Dans la fenêtre modale qui s'ouvre, remplissez les champs :
       1. Dans la liste déroulante {{< ui >}}Field{{< /ui >}}, sélectionnez {{< ui >}}spark_env_vars{{< /ui >}}.
       1. Dans le champ {{< ui >}}Key{{< /ui >}}, saisissez la clé de la variable d'environnement.
       1. Dans le champ {{< ui >}}Value{{< /ui >}}, saisissez la valeur de la variable d'environnement.
       1. Sous la liste déroulante {{< ui >}}Type{{< /ui >}}, sélectionnez {{< ui >}}Fixed{{< /ui >}}.
       1. Cochez la case {{< ui >}}Hidden{{< /ui >}} pour réduire l'exposition des valeurs sensibles.
   1. Optionnellement, définissez d'autres paramètres de script d'initialisation et variables d'environnement Datadog, tels que `DD_ENV` et `DD_SERVICE`. Vous pouvez configurer le script en utilisant les paramètres suivants :

      | Variable |  Description |  Par défaut |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED | Collectez les logs du driver Spark dans Datadog.                                                                                                                          | false |
      | WORKER_LOGS_ENABLED | Collectez les logs des workers Spark dans Datadog.                                                                                                                            | false |
      | DD_TAGS                  | Ajoutez des tags aux métriques de performance de cluster Databricks et Spark. Paires clé:valeur séparées par des virgules ou des espaces : Suivez les [conventions de tags Datadog][4]. Par exemple : `env:staging,team:data_engineering` |         |
      | DD_ENV | Remplacez le tag d'environnement `env` sur les métriques, les traces et les logs de ce cluster. Par défaut, le nom de l'espace de travail Databricks est utilisé comme env.                                                                                         |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | Filtrez les logs collectés avec des règles de traitement. Consultez [Collecte avancée de logs][5] pour plus de détails. |         |

1. Cliquez sur {{< ui >}}Create{{< /ui >}} si vous créez une nouvelle politique ou sur {{< ui >}}Save{{< /ui >}} si vous mettez à jour une politique existante. Si vous mettez à jour une politique existante, tous les clusters utilisant cette politique appliquent automatiquement les modifications lors de leur prochain redémarrage. Si vous créez une nouvelle politique, suivez les étapes ci-dessous pour l'appliquer à vos clusters.

**Appliquez la politique de cluster aux clusters**

1. Dans {{< ui >}}Compute{{< /ui >}}, sélectionnez le cluster que vous souhaitez mettre à jour ou cliquez sur {{< ui >}}Create Compute{{< /ui >}} pour un nouveau cluster.
1. Dans la liste déroulante {{< ui >}}Policy{{< /ui >}} en haut, sélectionnez la politique que vous avez créée.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}} pour enregistrer les modifications. Le cluster doit être redémarré pour que la politique prenne effet.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /fr/getting_started/tagging/
[5]: /fr/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

{{% /tab %}}

{{% tab "Installez manuellement un script d'initialisation global" %}}

<div class="alert alert-danger">
Cette configuration ne fonctionne pas sur les clusters Databricks en mode d'accès <strong>Standard</strong>, car les scripts d'initialisation globaux ne peuvent pas être installés sur ces clusters. Si vous utilisez des clusters avec le mode d'accès <strong>Standard</strong>, Datadog recommande de <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">configurer manuellement une politique de cluster</a> ou de <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">l'installer manuellement sur un cluster spécifique</a>.
</div>

1. Dans Databricks, cliquez sur votre nom d'affichage (adresse e-mail) dans le coin supérieur droit de la page.
1. Sélectionnez {{< ui >}}Settings{{< /ui >}} et cliquez sur l'onglet {{< ui >}}Compute{{< /ui >}}.
1. Dans la section {{< ui >}}All purpose clusters{{< /ui >}}, à côté de {{< ui >}}Global init scripts{{< /ui >}}, cliquez sur {{< ui >}}Manage{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}. Nommez votre script. Ensuite, dans le champ {{< ui >}}Script{{< /ui >}}, copiez et collez le script suivant en remplaçant les espaces réservés par les valeurs de vos paramètres.

   ```shell
   #!/bin/bash

   # Required parameters
   export DD_API_KEY=<YOUR API KEY>
   export DD_SITE=<YOUR DATADOG SITE>
   export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   Le script ci-dessus définit les paramètres requis, puis télécharge et exécute le dernier script d'initialisation pour Data Observability : Jobs Monitoring dans Databricks. Si vous souhaitez épingler votre script à une version spécifique, vous pouvez remplacer le nom de fichier dans l'URL par `install-databricks-0.14.0.sh` pour utiliser la version `0.14.0`, par exemple. Le code source utilisé pour générer ce script, ainsi que les modifications entre les versions du script, sont disponibles sur le [dépôt Datadog Agent][3].

1. Pour activer le script pour tous les clusters nouveaux et redémarrés, activez {{< ui >}}Enabled{{< /ui >}}.
   {{< img src="data_jobs/databricks/toggle.png" alt="Interface utilisateur Databricks, paramètres d'administration, scripts d'initialisation globaux. Un script appelé 'install-datadog-agent' figure dans une liste avec un commutateur activé." style="width:100%;" >}}
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.

#### Définissez les paramètres de script d'initialisation requis {#set-the-required-init-script-parameters}

Fournissez les valeurs des paramètres du script d'initialisation au début du script d'initialisation global.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

En option, vous pouvez également définir d'autres paramètres de script d'initialisation et variables d'environnement Datadog ici, tels que `DD_ENV` et `DD_SERVICE`. Le script peut être configuré à l'aide des paramètres suivants :

| Variable                 | Description                                                                                                                                                      | Par défaut |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Votre [clé d'API Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Votre [site Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nom de votre espace de travail Databricks. Il doit correspondre au nom fourni à l'étape [d'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration). Mettez le nom entre guillemets s'il contient des espaces. |         |
| DRIVER_LOGS_ENABLED | Collectez les logs du driver Spark dans Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED | Collectez les logs des workers Spark dans Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Ajoutez des tags aux métriques de performance de cluster Databricks et Spark. Paires clé:valeur séparées par des virgules ou des espaces : Suivez les [conventions de tags Datadog][4]. Par exemple : `env:staging,team:data_engineering` |         |
| DD_ENV | Remplacez le tag d'environnement `env` sur les métriques, les traces et les logs de ce cluster. Par défaut, le nom de l'espace de travail Databricks est utilisé comme env.                                                                                         |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtrez les logs collectés avec des règles de traitement. Consultez [Collecte avancée de logs][5] pour plus de détails. |         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /fr/getting_started/tagging/
[5]: /fr/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "Installez manuellement sur un cluster spécifique" %}}

1. Dans Databricks, créez un fichier de script d'initialisation dans un [volume Unity Catalog][26] avec le contenu suivant. Assurez-vous de noter le chemin du volume (par exemple, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   Le script ci-dessus télécharge et exécute le dernier script d'initialisation pour Data Observability: Jobs Monitoring dans Databricks. Si vous souhaitez fixer votre script à une version spécifique, vous pouvez remplacer le nom de fichier dans l'URL (par exemple, `install-databricks-0.14.0.sh` pour utiliser la version `0.14.0`). Vous pouvez trouver le code source utilisé pour générer ce script, ainsi que les modifications entre les versions du script, sur le [dépôt Datadog Agent][3].

1. Accordez des autorisations en lecture seule au script d'initialisation :
    1. Au niveau du volume, accordez l'autorisation `READ VOLUME` à tous les utilisateurs du compte.
    1. Au niveau du catalogue, accordez l'autorisation `USE CATALOG` à tous les utilisateurs du compte.

   <div class="alert alert-info">Databricks évalue les autorisations de volume Unity Catalog par rapport au <strong>propriétaire du cluster</strong>, et non par rapport au principal exécutant le cluster.</div>

1. **Ajoutez le script d'initialisation à la liste d'autorisation Unity Catalog** (requis pour les clusters en mode d'accès **Standard**) : Si votre cluster utilise le mode d'accès **Standard**, vous devez ajouter le chemin du script d'initialisation à la liste d'autorisation Unity Catalog. Suivez les instructions de la [documentation Databricks][27] pour ajouter le chemin de votre script d'initialisation à la liste d'autorisation.

1. Sur la page de configuration du cluster, cliquez sur le bouton {{< ui >}}Advanced options{{< /ui >}}.
1. En bas de la page, accédez à l'onglet {{< ui >}}Init Scripts{{< /ui >}}.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Interface utilisateur Databricks, options avancées de configuration du cluster, onglet Scripts d'initialisation. Un menu déroulant « Destination » et un sélecteur de fichier « Chemin du script d'initialisation »." style="width:80%;" >}}

   - Dans le menu déroulant {{< ui >}}Destination{{< /ui >}}, sélectionnez {{< ui >}}Volume{{< /ui >}}.
   - Sous {{< ui >}}Init script path{{< /ui >}}, saisissez le chemin du volume vers votre script d'initialisation.
   - Cliquez sur {{< ui >}}Add{{< /ui >}}.

#### Définissez les paramètres requis du script d'initialisation {#set-the-required-init-script-parameters-1}

1. Dans Databricks, sur la page de configuration du cluster, cliquez sur le bouton {{< ui >}}Advanced options{{< /ui >}}.
2. En bas de la page, accédez à l'onglet {{< ui >}}Spark{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script.png" alt="Interface utilisateur Databricks, options avancées de configuration du cluster, onglet Spark. Une zone de texte intitulée « Variables d'environnement » contient les valeurs pour DD_API_KEY et DD_SITE." style="width:100%;" >}}

   {{< ui >}}Environment variables{{< /ui >}}Dans la zone de texte, fournissez les valeurs pour les paramètres du script d'initialisation.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME>
   ```

   En option, vous pouvez également définir d'autres paramètres de script d'initialisation et variables d'environnement Datadog ici, tels que `DD_ENV` et `DD_SERVICE`. Le script peut être configuré à l'aide des paramètres suivants :

| Variable                 | Description                                                                                                                                                      | Par défaut |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Votre [clé d'API Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Votre [site Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nom de votre espace de travail Databricks. Il doit correspondre au nom fourni à l'étape [d'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration). |         |
| DRIVER_LOGS_ENABLED | Collectez les logs du driver Spark dans Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED | Collectez les logs des workers Spark dans Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Ajoutez des tags aux métriques de performance de cluster Databricks et Spark. Paires clé:valeur séparées par des virgules ou des espaces : Suivez les [conventions de tags Datadog][4]. Par exemple : `env:staging,team:data_engineering` |         |
| DD_ENV | Remplacez le tag d'environnement `env` sur les métriques, les traces et les logs de ce cluster. Par défaut, le nom de l'espace de travail Databricks est utilisé comme env.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtrez les logs collectés avec des règles de traitement. Consultez [Collecte avancée de logs][5] pour plus de détails. |         |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /fr/getting_started/tagging/
[5]: /fr/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

3. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

{{% /tab %}}

{{< /tabs >}}

### Redémarrez les clusters déjà en cours d'exécution {#restart-already-running-clusters}

Le script d'initialisation installe l'Agent au démarrage des clusters.

Les clusters polyvalents ou les clusters de jobs à longue durée de vie déjà en cours d'exécution doivent être redémarrés manuellement pour que le script d'initialisation installe le Datadog Agent.

Pour les jobs planifiés qui s'exécutent sur des clusters de jobs, le script d'initialisation installe automatiquement le Datadog Agent lors de la prochaine exécution.

## Validation {#validation}

Dans Datadog, consultez la page [Data Observability: Jobs Monitoring][6] pour voir la liste de tous vos jobs Databricks.

Si certains jobs ne sont pas visibles, accédez à la page [Configuration][9] pour en comprendre la raison. Cette page répertorie tous vos jobs Databricks qui ne sont pas encore configurés avec l'Agent sur leurs clusters, ainsi que des conseils pour terminer la configuration.

## Dépannage {#troubleshooting}

Si vous ne voyez aucune donnée dans Jobs Monitoring après avoir installé le produit, suivez ces étapes.

### Le script d'initialisation ne s'exécute pas ou échoue {#init-script-not-running-or-failing}

1. **Redémarrez le cluster** : Le script d'initialisation ne s'exécute qu'au démarrage du cluster. Assurez-vous que le cluster a été redémarré depuis l'ajout du script d'initialisation.
1. **Confirmez l'exécution du script d'initialisation** : Dans Databricks, cliquez sur le cluster et accédez à l'onglet {{< ui >}}Event log{{< /ui >}}. Si `INIT_SCRIPTS_STARTED` n'est pas présent, le script d'initialisation n'a pas été pris en compte par ce cluster. Revenez aux [étapes d'installation](#install-the-datadog-agent) pour vous assurer que le script d'initialisation a bien été ajouté au cluster.
1. **Confirmez la réussite du script d'initialisation** : Recherchez l'action `INIT_SCRIPTS_FINISHED` dans le log des événements et cliquez dessus pour inspecter le JSON, qui indique si le script d'initialisation s'est terminé par une erreur.
1. **Recherchez les causes des échecs du script d'initialisation** : Si `INIT_SCRIPTS_FINISHED` indique un échec, activez la [diffusion des logs de cluster][29] pour envoyer les logs du script d'initialisation vers la destination de votre choix. L'envoi des logs vers un volume Unity Catalog est recommandé.
   {{< img src="data_jobs/databricks/compute_logging_config.png" alt="La page de configuration du cluster Databricks affichant l'onglet Journalisation avec des options pour configurer une destination de livraison des logs." style="width:100%;" >}}
   Après avoir redémarré le cluster avec la livraison des logs activée, accédez à la destination des logs. Les logs stdout et stderr se trouvent sous le chemin suivant :
   ```
   <cluster-log-path>/<cluster-id>/init_scripts/<cluster-id>_<script-hash>/
   ```

### Données n'apparaissant pas après l'exécution réussie d'un script d'initialisation{#data-not-appearing-after-a-successful-init-script-run}

1. **Validation de la clé d'API :** Si le script d'initialisation a été installé manuellement, utilisez l'[endpoint de validation de clé d'API][25] pour vous assurer que la clé d'API Datadog spécifiée dans le script est valide.
1. **Validation de l'agent :** Le script d'initialisation installe le Datadog Agent. Pour vous assurer qu'il est correctement installé, connectez-vous au cluster via SSH et exécutez la commande d'état de l'Agent :
  ```shell
  sudo datadog-agent status
  ```

## Configuration avancée{#advanced-configuration}

### Filtrer la collecte de logs sur les clusters{#filter-log-collection-on-clusters}

#### Exclure toute collecte de logs d'un cluster individuel{#exclude-all-log-collection-from-an-individual-cluster}
Configurez la variable d'environnement suivante dans la section {{< ui >}}Advanced Configuration{{< /ui >}} de votre cluster dans l'interface utilisateur Databricks ou en tant que [variable d'environnement Spark][18] dans l'API Databricks.

```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### Autorisations{#permissions}
L'utilisateur ou le principal de service qui se connecte à votre espace de travail Databricks doit disposer des droits d'accès à l'espace de travail suivants, en plus des autorisations décrites ci-dessous :

- {{< ui >}}Workspace access{{< /ui >}}
- {{< ui >}}Databricks SQL access{{< /ui >}}

#### Autorisations de l'espace de travail{#workspace-permissions}

Choisissez l'une des approches suivantes pour l'utilisateur ou le principal de service :

- **Privilèges d'administrateur de l'espace de travail** (recommandé) : Accordez les privilèges {{< ui >}}Workspace Admin{{< /ui >}}. Cela permet à Datadog de gérer automatiquement les installations et les mises à jour des scripts d'initialisation, réduisant ainsi le risque de mauvaise configuration.
- **Autorisations granulaires** : Si vous avez besoin d'un contrôle plus granulaire, accordez ces autorisations minimales aux [objets au niveau de l'espace de travail][19] suivants pour pouvoir toujours surveiller tous les jobs, clusters et requêtes au sein d'un espace de travail :

  | Objet                 | Autorisation                                                                                                                                                      |
  |--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | [Job][20]                              | PEUT AFFICHER
  | [Compute][21]                          | PEUT ATTACHER À
  | [Lakeflow Declarative Pipelines][22]   | PEUT AFFICHER
  | [Query][23]                            | PEUT AFFICHER
  | [SQL warehouse][24]                    | PEUT SURVEILLER

#### Autorisations des données de coût {#cost-data-permissions}

De plus, pour que Datadog puisse accéder à vos données de coût Databricks dans Data Observability : Jobs Monitoring ou [Cloud Cost Management][26], l'utilisateur ou le principal de service utilisé pour interroger les [tables système][27] doit disposer des autorisations suivantes :
   - `CAN USE` autorisation sur le SQL Warehouse.
   - Accès en lecture aux [tables système][27] au sein d'Unity Catalog. Dans Databricks, ouvrez le {{< ui >}}SQL Editor{{< /ui >}} et exécutez les commandes suivantes, en utilisant l'ID client du principal de service (et non son nom d'affichage) :
   ```sql
   GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
   GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
   GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
   ```
   L'utilisateur qui accorde ces droits doit disposer du privilège `MANAGE` sur `CATALOG system`.


### Taguer les étendues au moment de l'exécution {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

### Configurer les balises de cluster {#configure-cluster-tags}

Les balises de cluster personnalisées Databricks sont automatiquement capturées et disponibles dans Data Observability : Jobs Monitoring et la plateforme Datadog. La seule exception concerne les balises provenant des groupes de ressources Azure, qui ne sont pas automatiquement capturées.

Pour ajouter des balises manuellement, définissez la variable d'environnement `DD_TAGS` dans les variables d'environnement Spark de votre cluster. Cela a le même effet que les balises de cluster personnalisées Databricks, mais nécessite une configuration manuelle. Utilisez des paires clé:valeur séparées par des virgules ou des espaces en suivant les [conventions de tags Datadog][28] :

```text
DD_TAGS=env:staging,team:data_engineering
```

### Agréger les métriques de cluster à partir d'exécutions de jobs ponctuelles {#aggregate-cluster-metrics-from-one-time-job-runs}
   Cette configuration est applicable si vous souhaitez obtenir des données sur l'utilisation des ressources de cluster pour vos jobs et créer un nouveau job et un nouveau cluster pour chaque exécution via le [endpoint d'API d'exécution unique][8] (courant lors de l'utilisation d'outils d'orchestration en dehors de Databricks tels qu'Airflow ou Azure Data Factory).

   Si vous soumettez des jobs Databricks via le [endpoint d'API d'exécution unique][8], chaque exécution de job possède un ID de job unique. Cela peut rendre difficile le regroupement et l'analyse des métriques de cluster pour les jobs qui utilisent des clusters éphémères. Pour agréger l'utilisation du cluster à partir du même job et évaluer les performances sur plusieurs exécutions, vous devez définir la variable `DD_JOB_NAME` dans le `spark_env_vars` de chaque `new_cluster` sur la même valeur que le `run_name` de la charge utile de votre requête.

   Voici un exemple de corps de requête pour une exécution de job unique :

   {{< highlight json "hl_lines=2 18" >}}
   {
      "run_name": "Example Job",
      "idempotency_token": "8f018174-4792-40d5-bcbc-3e6a527352c8",
      "tasks": [
         {
            "task_key": "Example Task",
            "description": "Description of task",
            "depends_on": [],
            "notebook_task": {
               "notebook_path": "/Path/to/example/task/notebook",
               "source": "WORKSPACE"
            },
            "new_cluster": {
               "num_workers": 1,
               "spark_version": "13.3.x-scala2.12",
               "node_type_id": "i3.xlarge",
               "spark_env_vars": {
                  "DD_JOB_NAME": "Example Job"
               }
            }
         }
      ]
   }
   {{< /highlight >}}

### Configurer Data Observability: Jobs Monitoring avec les restrictions réseau Databricks {#set-up-data-observability-jobs-monitoring-with-databricks-networking-restrictions}
Avec les [restrictions réseau Databricks][12], Datadog peut ne pas avoir accès à vos API Databricks, ce qui est nécessaire pour collecter les traces des exécutions de jobs Databricks ainsi que les balises et autres métadonnées.

Si vous contrôlez l'accès à l'API Databricks avec des [listes d'accès IP][13], autorisez les adresses spécifiques de Datadog {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} permet à Datadog de se connecter aux API Databricks dans votre espace de travail. Consultez la documentation de Databricks pour configurer les listes d'accès IP pour les [espaces de travail individuels][16] afin de donner à Datadog l'accès à l'API.

Pour surveiller les espaces de travail qui utilisent la connectivité [Databricks Private Link][14], consultez [Connectivité Private Link (aperçu)][15].

[15]: /fr/data_observability/jobs_monitoring/databricks/private_link

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[4]: https://docs.databricks.com/en/security/secrets/index.html
[6]: https://app.datadoghq.com/data-jobs/
[7]: /fr/data_jobs
[8]: https://docs.databricks.com/api/workspace/jobs/submit
[9]: https://app.datadoghq.com/data-jobs/configuration
[12]: https://docs.databricks.com/en/security/network/front-end/index.html
[13]: https://docs.databricks.com/en/security/network/front-end/ip-access-list.html
[14]: https://www.databricks.com/trust/security-features/secure-your-data-with-private-networking
[16]: https://docs.databricks.com/en/security/network/front-end/ip-access-list-workspace
[18]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[19]: https://docs.databricks.com/aws/en/security/auth/access-control#access-control-lists-overview
[20]: https://docs.databricks.com/aws/en/security/auth/access-control#job-acls
[21]: https://docs.databricks.com/aws/en/security/auth/access-control#compute-acls
[22]: https://docs.databricks.com/aws/en/security/auth/access-control#lakeflow-declarative-pipelines-acls
[23]: https://docs.databricks.com/aws/en/security/auth/access-control#query-acls
[24]: https://docs.databricks.com/aws/en/security/auth/access-control#sql-warehouse-acls
[25]: https://docs.datadoghq.com/fr/api/latest/authentication/?code-lang=curl#validate-api-key
[26]: https://docs.datadoghq.com/fr/cloud_cost_management
[27]: https://docs.databricks.com/aws/en/admin/system-tables/
[28]: /fr/getting_started/tagging/
[29]: https://docs.databricks.com/aws/en/compute/configure#compute-log-delivery