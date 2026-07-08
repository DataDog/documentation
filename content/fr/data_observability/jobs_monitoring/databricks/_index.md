---
aliases:
- /fr/data_jobs/databricks
description: 'Activer l''observabilité des données : Surveillance des travaux pour
  les espaces de travail Databricks avec authentification OAuth ou jeton d''accès
  personnel et installation de l''agent Datadog.'
further_reading:
- link: /data_jobs
  tag: Documentation
  text: 'Observabilité des données : Surveillance des travaux'
- link: https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/
  tag: Blog
  text: Détecter les problèmes et optimiser les dépenses avec la surveillance des
    travaux sans serveur de Databricks
title: 'Activer l''observabilité des données : Surveillance des travaux pour Databricks'
---
[Observabilité des données : Surveillance des travaux][7] offre une visibilité sur la performance et la fiabilité de vos travaux et flux de travail Databricks s'exécutant sur des clusters ou des calculs sans serveur.

## Configurer {#setup}

<div class="alert alert-info">Si votre espace de travail Databricks a <a href="https://docs.databricks.com/en/security/network/front-end/index.html">des restrictions réseau</a> activées, {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} ajoutez Datadog à votre liste d'autorisation. Si votre espace de travail utilise Private Link, consultez l'onglet <strong>Connectivité Private Link</strong> ci-dessous.</div>

Suivez ces étapes pour activer l'observabilité des données : Surveillance des travaux pour Databricks.

1. [Configurer l'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration) pour un espace de travail Databricks.
1. [Installer l'agent Datadog](#install-the-datadog-agent) sur vos clusters Databricks dans l'espace de travail.


### Configurer l'intégration Datadog-Databricks {#configure-the-datadog-databricks-integration}

{{< tabs >}}

{{% tab "Utiliser un principal de service pour OAuth" %}}

<div class="alert alert-danger">Les nouvelles intégrations d'espace de travail doivent s'authentifier en utilisant OAuth. Les espaces de travail déjà intégrés avec un jeton d'accès personnel continuent de fonctionner et peuvent passer à OAuth à tout moment. Après qu'un espace de travail commence à utiliser OAuth, il ne peut pas revenir à un jeton d'accès personnel.</div>

#### Créer et configurer le principal de service dans Databricks {#create-and-configure-the-service-principal-in-databricks}

1. En tant qu'**administrateur d'espace de travail Databricks**, allez à {{< ui >}}Settings{{< /ui >}} en cliquant sur votre profil dans le coin supérieur droit de l'espace de travail.
1. Dans l'onglet {{< ui >}}Identity and access{{< /ui >}}, cliquez sur {{< ui >}}Manage{{< /ui >}} à côté de {{< ui >}}Service principals{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add service principal{{< /ui >}}, puis cliquez sur {{< ui >}}Add new{{< /ui >}}.
1. Entrez un nom, puis cliquez sur **Ajouter**.

   <div class="alert alert-warning">Pour Azure Databricks, sélectionnez le type de gestion "Databricks managed". Datadog ne prend PAS en charge les principaux de service "Microsoft Entra ID managed".</div>

1. Cliquez sur le nom de votre nouveau principal de service. Sous l'onglet {{< ui >}}Secrets{{< /ui >}}, cliquez sur {{< ui >}}Generate secret{{< /ui >}}.
   1. Définissez {{< ui >}}Lifetime (days){{< /ui >}} sur la valeur maximale autorisée (730).

   1. Cliquez sur {{< ui >}}Generate{{< /ui >}}.

   1. Prenez note de votre ID client et de votre secret client.

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="Dans Databricks, une fenêtre modale affichant l'ID client et le secret associés à un nouveau secret OAuth est affichée." style="width:70%;" >}}

1. Dans l'onglet {{< ui >}}Permissions{{< /ui >}}, cliquez sur {{< ui >}}Grant access{{< /ui >}}. Recherchez le nouveau principal de service, accordez-lui la permission {{< ui >}}Manage{{< /ui >}}, puis cliquez sur {{< ui >}}Save{{< /ui >}}.
1. Retournez à l'onglet {{< ui >}}Identity and access{{< /ui >}} et cliquez sur {{< ui >}}Manage{{< /ui >}} à côté de {{< ui >}}Groups{{< /ui >}}.
1. Cliquez sur le groupe {{< ui >}}admins{{< /ui >}}, puis cliquez sur {{< ui >}}Add members{{< /ui >}} pour ajouter le nouveau principal de service.

#### Ajoutez l'espace de travail Databricks à Datadog {#add-the-databricks-workspace-to-datadog}

1. Dans Datadog, ouvrez la tuile d'intégration Databricks.
1. Dans l'onglet {{< ui >}}Configure{{< /ui >}}, cliquez sur {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Entrez un nom d'espace de travail, l'URL de votre espace de travail Databricks, ainsi que l'ID client et le secret que vous avez générés.
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="Dans la tuile d'intégration Datadog-Databricks, un espace de travail Databricks est affiché. Cet espace de travail a un nom, une URL, un ID client et un secret client." style="width:100%;" >}}
1. Pour obtenir une visibilité sur vos coûts Databricks dans l'observabilité des données : Surveillance des travaux ou [Gestion des Coûts Cloud][18], fournissez l'ID d'un [Entrepôt SQL Databricks][19] que Datadog peut utiliser pour interroger vos [tables système][20].
   - Le principal de service doit avoir accès à l'Entrepôt SQL. Dans la page de configuration de l'Entrepôt, allez à {{< ui >}}Permissions{{< /ui >}} (en haut à droite) et accordez-lui la permission `CAN USE`.
   - Accordez au principal de service un accès en lecture aux [tables système][20] du Catalogue Unity en exécutant les commandes suivantes :
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   L'utilisateur qui accorde ces droits doit avoir le privilège `MANAGE` sur `CATALOG system`.

   -  L'Entrepôt SQL Databricks doit être Pro ou Serverless. Les Entrepôts Classiques ne sont **PAS** pris en charge. Un entrepôt 2XS est recommandé, avec l'Arrêt Automatique réglé sur 5-10 minutes pour réduire les coûts.
1. Dans la section **Sélectionnez les produits pour configurer l'intégration**, assurez-vous que l'observabilité des données : Surveillance des travaux est {{< ui >}}Enabled{{< /ui >}}.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, choisissez soit
    - [Géré par Datadog (recommandé)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent) : Datadog installe et gère l'Agent avec un script d'initialisation global dans l'espace de travail.
    - [Manuellement](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) : Suivez les [instructions ci-dessous](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) pour installer et gérer le script d'initialisation pour installer l'Agent globalement ou sur des clusters Databricks spécifiques.

[18]: https://docs.datadoghq.com/fr/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/

{{% /tab %}}

{{% tab "Connectivité par Lien Privé" %}}

Si votre espace de travail Databricks est déployé en utilisant [Connectivité par Lien Privé][25], Datadog ne peut pas accéder directement aux API Databricks. Cela nécessite l'utilisation d'un [Exécuteur d'Action Privé][26] déployé dans votre environnement.

Voir [Connectivité par Lien Privé (Aperçu)][15] pour des instructions complètes de configuration.

[15]: /fr/data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/fr/actions/private_actions/

{{% /tab %}}

{{% tab "Utiliser un Jeton d'Accès Personnel (Héritage)" %}}

<div class="alert alert-danger">Cette option n'est disponible que pour les intégrations d'espace de travail créées avant le 7 juillet 2025. Les nouvelles intégrations d'espace de travail doivent s'authentifier en utilisant OAuth.</div>

1. Dans votre espace de travail Databricks, cliquez sur votre profil dans le coin supérieur droit et allez à {{< ui >}}Settings{{< /ui >}}. Sélectionnez {{< ui >}}Developer{{< /ui >}} dans la barre latérale gauche. À côté de {{< ui >}}Access tokens{{< /ui >}}, cliquez sur {{< ui >}}Manage{{< /ui >}}.
1. Cliquez sur {{< ui >}}Generate new token{{< /ui >}}, entrez "Intégration Datadog" dans le champ {{< ui >}}Comment{{< /ui >}}, définissez la valeur {{< ui >}}Lifetime (days){{< /ui >}} au maximum autorisé (730 jours) et créez un rappel pour mettre à jour le jeton avant son expiration. Ensuite, cliquez sur {{< ui >}}Generate{{< /ui >}}. Prenez note de votre jeton.

   **Important**
   * Pour l'installation du script d'initialisation géré par Datadog (recommandé)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent), assurez-vous que le Principal du jeton est un <strong>Administrateur de l'espace de travail</strong>.
   * Pour l'installation manuelle du script d'initialisation, assurez-vous que le Principal du jeton a un accès CAN VIEW [9] pour les travaux et clusters Databricks que vous souhaitez surveiller.

   Alternativement, suivez la [documentation officielle de Databricks][10] pour générer un jeton d'accès pour un [principal de service][11]. Le principal de service doit avoir le droit d'accès [<strong>Accès à l'espace de travail</strong>][17] activé et les permissions <strong>Administrateur de l'espace de travail</strong> ou CAN VIEW [9] comme décrit ci-dessus.
1. Dans Datadog, ouvrez la tuile d'intégration Databricks.
1. Dans l'onglet {{< ui >}}Configure{{< /ui >}}, cliquez sur {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Entrez un nom d'espace de travail, l'URL de votre espace de travail Databricks et le jeton Databricks que vous avez généré.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="Dans la tuile d'intégration Datadog-Databricks, un espace de travail Databricks est affiché. Cet espace de travail a un nom, une URL et un jeton API." style="width:100%;" >}}
1. Pour obtenir une visibilité sur vos coûts Databricks dans l'observabilité des données : Surveillance des travaux ou [Gestion des Coûts Cloud][18], fournissez l'ID d'un [Entrepôt SQL Databricks][19] que Datadog peut utiliser pour interroger vos [tables système][20].

   - Le principal du jeton doit avoir accès à l'Entrepôt SQL Databricks. Donnez-lui `CAN USE` permission depuis **Permissions** en haut à droite de la page de configuration de l'entrepôt.
   - Accordez au principal de service un accès en lecture aux [tables système][20] du Catalogue Unity en exécutant les commandes suivantes :
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <token_principal>;
   GRANT SELECT ON CATALOG system TO <token_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <token_principal>;
   ```
   L'utilisateur qui accorde ces droits doit avoir le privilège `MANAGE` sur `CATALOG system`.
   -  L'Entrepôt SQL doit être Pro ou Serverless. Les Entrepôts Classiques ne sont **PAS** pris en charge. Un entrepôt de taille 2XS est recommandé, avec un arrêt automatique configuré pour 5 à 10 minutes afin de minimiser les coûts.
1. Dans la section **Sélectionnez les produits pour configurer l'intégration**, assurez-vous que le produit Data Observability : Surveillance des travaux est **Activé**.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, choisissez soit
    - [Géré par Datadog (recommandé)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent) : Datadog installe et gère l'Agent avec un script d'initialisation global dans l'espace de travail.
    - [Manuellement](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) : Suivez les [instructions ci-dessous](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) pour installer et gérer le script d'initialisation afin d'installer l'Agent globalement ou sur des clusters Databricks spécifiques.

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/fr/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/


{{% /tab %}}

{{< /tabs >}}

### Installez l'Agent Datadog {#install-the-datadog-agent}

L'Agent Datadog doit être installé sur les clusters Databricks pour surveiller les travaux Databricks qui s'exécutent sur des clusters à usage général ou des clusters de travaux. Cette étape n'est pas nécessaire pour surveiller les travaux sur [calcul sans serveur][4].

{{< tabs >}}
{{% tab "Script global d'initialisation géré par Datadog (Recommandé)" %}}

Datadog peut installer et gérer un script d'initialisation global dans l'espace de travail Databricks. L'Agent Datadog est installé sur tous les clusters de l'espace de travail, lorsqu'ils démarrent.

<div class="alert alert-danger">
<ul>
<li>Cette configuration ne fonctionne pas sur les clusters Databricks en <strong>mode d'accès Standard</strong>, car les scripts d'initialisation globaux ne peuvent pas être installés sur ces clusters. Si vous utilisez des clusters avec le <strong>mode d'accès Standard</strong>, Datadog recommande de <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">Configurer manuellement une politique de cluster</a> sur plusieurs clusters ou de <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">Installer manuellement sur un cluster spécifique</a>.</li>
<li>Cette option d'installation, dans laquelle Datadog installe et gère votre script d'initialisation global Datadog, nécessite un jeton d'accès Databricks avec des permissions <strong>Administrateur de l'espace de travail</strong>. Un jeton avec un accès CAN VIEW ne permet pas à Datadog de gérer le script d'initialisation global de votre compte Databricks.</li>
</ul>
</div>

#### Lors de l'intégration d'un espace de travail avec Datadog {#when-integrating-a-workspace-with-datadog}

1. Dans la section **Sélectionner les produits pour configurer l'intégration**, assurez-vous que le produit Data Observability : Surveillance des travaux est **Activé**.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, sélectionnez le {{< ui >}}Managed by Datadog{{< /ui >}} bouton bascule.
1. Cliquez {{< ui >}}Select API Key{{< /ui >}} pour soit sélectionner une clé API Datadog existante, soit créer une nouvelle clé API Datadog.
1. (Optionnel) Désactivez {{< ui >}}Enable Log Collection{{< /ui >}} si vous ne souhaitez pas collecter les journaux du pilote et des travailleurs pour les corréler avec les travaux.
1. Cliquez {{< ui >}}Save Databricks Workspace{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="Dans la tuile d'intégration Datadog-Databricks, configuration de l'Agent Datadog lors de l'ajout d'un espace de travail Databricks. Datadog peut installer et gérer un script d'initialisation global." style="width:100%;" >}}

#### Lors de l'ajout du script d'initialisation à un espace de travail Databricks déjà intégré avec Datadog {#when-adding-the-init-script-to-a-databricks-workspace-already-integrated-with-datadog}

1. Dans l'onglet **Configurer**, cliquez sur l'espace de travail dans la liste des espaces de travail
1. Cliquez sur l'onglet {{< ui >}}Configured Products{{< /ui >}}
1. Assurez-vous que le produit Data Observability : Surveillance des travaux est **Activé**.
1. Dans la section {{< ui >}}Datadog Agent Setup{{< /ui >}}, sélectionnez le bouton bascule {{< ui >}}Managed by Datadog{{< /ui >}}.
1. Cliquez {{< ui >}}Select API Key{{< /ui >}} pour sélectionner une clé API Datadog existante ou créer une nouvelle clé API Datadog.
1. (Optionnel) Désactivez {{< ui >}}Enable Log Collection{{< /ui >}} si vous ne souhaitez pas collecter les journaux du pilote et des travailleurs pour les corréler avec les travaux.
1. Cliquez sur **Enregistrer l'espace de travail Databricks** en bas de la fenêtre du navigateur.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="Dans la tuile d'intégration Datadog-Databricks, la configuration de l'agent Datadog pour un espace de travail Databricks déjà ajouté à l'intégration. Datadog peut installer et gérer un script d'initialisation global." style="width:100%;" >}}

En option, vous pouvez ajouter des balises à votre cluster Databricks et aux métriques de performance Spark en configurant la variable d'environnement suivante dans la section {{< ui >}}Advanced Configuration{{< /ui >}} de votre cluster dans l'interface utilisateur Databricks ou en tant que [variables d'environnement Spark][2] avec l'API Databricks :

| Variable                 | Description                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Ajoutez des balises au cluster Databricks et aux métriques de performance Spark. Paires clé:valeur séparées par des virgules ou des espaces. Suivez [les conventions de balisage Datadog][1]. Exemple : `env:staging,team:data_engineering` |
| DD_ENV                   | Définissez la balise d'environnement `env` sur les métriques, les traces et les journaux de ce cluster. |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtrez les journaux collectés avec des règles de traitement. Consultez [Collecte avancée de journaux][3] pour plus de détails. |


[1]: /fr/getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /fr/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "Configurez manuellement une politique de cluster" %}}

Cette approche est recommandée pour les clusters en mode d'accès **Standard**.

**Créez le script d'initialisation**

1. Dans Databricks, créez un fichier de script d'initialisation dans un [volume du catalogue d'unité][26] avec le contenu suivant. Assurez-vous de noter le chemin du volume (par exemple, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. Accordez des permissions en lecture seule au script d'initialisation :
    1. Au niveau du volume, accordez la permission `READ VOLUME` à tous les utilisateurs du compte.
    1. Au niveau du catalogue, accordez la permission `USE CATALOG` à tous les utilisateurs du compte.

1. **Ajoutez le script d'initialisation à la liste blanche** : Pour les clusters en mode d'accès **Standard**, vous devez ajouter le chemin du script d'initialisation à la liste blanche du catalogue d'unité. Suivez les instructions dans la [documentation de Databricks][27] pour ajouter le chemin de votre script d'initialisation à la liste blanche.

**Configurez la politique de calcul**

1. Dans {{< ui >}}Compute{{< /ui >}}, accédez à l'onglet {{< ui >}}Policies{{< /ui >}}. Si vous avez déjà une politique de cluster appliquée à vos clusters, accédez à cette politique existante pour la modifier. C'est l'approche la plus simple car la politique s'applique automatiquement à tous les clusters qui l'utilisent. Sinon, cliquez sur {{< ui >}}Create Policy{{< /ui >}} pour créer une nouvelle politique.
1. Pour ajouter le script d'initialisation à la politique de cluster, dans la section {{< ui >}}Definition{{< /ui >}}, cliquez sur {{< ui >}}Add Definition{{< /ui >}}. Dans la fenêtre modale qui s'ouvre, remplissez les champs :
   1. Dans le menu déroulant {{< ui >}}Field{{< /ui >}}, sélectionnez {{< ui >}}init_scripts{{< /ui >}}.
   1. Dans le menu déroulant {{< ui >}}Source{{< /ui >}}, sélectionnez {{< ui >}}Volume{{< /ui >}}.
   1. Sous {{< ui >}}Destination{{< /ui >}}, entrez le chemin du volume vers votre script d'initialisation.
   1. Cliquez sur {{< ui >}}Add{{< /ui >}}.
1. Configurez les variables d'environnement. Vous devez ajouter chacune des variables d'environnement suivantes à la politique de cluster que vous avez créée :

   | Clé                  | Description                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | Votre [clé API Datadog][1].   |
   | DD_SITE              | Votre [site Datadog][2].      |
   | DATABRICKS_WORKSPACE | Nom de votre espace de travail Databricks. Il doit correspondre au nom fourni dans l'[étape d'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration). Entourez le nom de guillemets doubles s'il contient des espaces. |

   1. Pour chacune des variables ci-dessus, dans la {{< ui >}}Definition{{< /ui >}} section, cliquez sur {{< ui >}}Add Definition{{< /ui >}}. Dans la fenêtre modale qui s'ouvre, remplissez les champs :
       1. Dans le menu déroulant {{< ui >}}Field{{< /ui >}}, sélectionnez {{< ui >}}spark_env_vars{{< /ui >}}.
       1. Dans le champ {{< ui >}}Key{{< /ui >}}, entrez la clé de la variable d'environnement.
       1. Dans le champ {{< ui >}}Value{{< /ui >}}, entrez la valeur de la variable d'environnement.
       1. Sous le menu déroulant {{< ui >}}Type{{< /ui >}}, sélectionnez {{< ui >}}Fixed{{< /ui >}}.
       1. Cochez la case {{< ui >}}Hidden{{< /ui >}} pour réduire l'exposition des valeurs sensibles.
   1. Optionnellement, définissez d'autres paramètres de script d'initialisation et variables d'environnement Datadog, tels que `DD_ENV` et `DD_SERVICE`. Vous pouvez configurer le script en utilisant les paramètres suivants :

      | Variable                 |  Description                                                                                                                                                      |  Par défaut |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED      | Collecter les journaux du pilote spark dans Datadog.                                                                                                                          | faux   |
      | WORKER_LOGS_ENABLED      | Collecter les journaux des travailleurs spark dans Datadog.                                                                                                                            | faux   |
      | DD_TAGS                  | Ajouter des balises au cluster Databricks et aux métriques de performance Spark, en utilisant des paires clé:valeur séparées par des virgules ou des espaces. Suivez les [conventions de balisage Datadog][4]. Exemple : `env:staging,team:data_engineering` |         |
      | DD_ENV                   | Définissez la balise d'environnement `env` sur les métriques, les traces et les journaux de ce cluster.                                                                                          |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | Filtrez les journaux collectés avec des règles de traitement. Consultez [Collection avancée de journaux][5] pour plus de détails. |         |

1. Cliquez {{< ui >}}Create{{< /ui >}} si vous créez une nouvelle politique ou {{< ui >}}Save{{< /ui >}} si vous mettez à jour une politique existante. Si vous mettez à jour une politique existante, tous les clusters utilisant cette politique appliquent automatiquement les modifications lors de leur prochain redémarrage. Si vous créez une nouvelle politique, suivez les étapes ci-dessous pour l'appliquer à vos clusters.

**Appliquez la politique de cluster aux clusters**

1. Dans {{< ui >}}Compute{{< /ui >}}, sélectionnez le cluster que vous souhaitez mettre à jour ou cliquez sur {{< ui >}}Create Compute{{< /ui >}} pour un nouveau cluster.
1. Dans le menu déroulant {{< ui >}}Policy{{< /ui >}} en haut, sélectionnez la politique que vous avez créée.
1. Cliquez {{< ui >}}Confirm{{< /ui >}} pour enregistrer les modifications. Le cluster doit être redémarré pour que la politique prenne effet.

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
Cette configuration ne fonctionne pas sur les clusters Databricks en mode d'accès <strong>Standard</strong>, car les scripts d'initialisation globaux ne peuvent pas être installés sur ces clusters. Si vous utilisez des clusters avec le mode d'accès <strong>Standard</strong>, Datadog recommande de <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">Configurer manuellement une politique de cluster</a> ou <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">Installer manuellement sur un cluster spécifique</a>.
</div>

1. Dans Databricks, cliquez sur votre nom d'affichage (adresse e-mail) dans le coin supérieur droit de la page.
1. Sélectionnez {{< ui >}}Settings{{< /ui >}} et cliquez sur l'onglet {{< ui >}}Compute{{< /ui >}}.
1. Dans la section {{< ui >}}All purpose clusters{{< /ui >}}, à côté de {{< ui >}}Global init scripts{{< /ui >}}, cliquez sur {{< ui >}}Manage{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}. Nommez votre script. Ensuite, dans le champ {{< ui >}}Script{{< /ui >}}, copiez et collez le script suivant, en n'oubliant pas de remplacer les espaces réservés par vos valeurs de paramètres.

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

   Le script ci-dessus définit les paramètres requis, télécharge et exécute le dernier init script for Data Observability: Jobs Monitoring in Databricks. Si vous souhaitez épingler votre script à une version spécifique, vous pouvez remplacer le nom de fichier dans l'URL par `install-databricks-0.14.0.sh` pour utiliser la version `0.14.0`, par exemple. Le code source utilisé pour générer ce script, ainsi que les modifications entre les versions du script, peuvent être trouvés dans le [dépôt de l'Agent Datadog][3].

1. Pour activer le script pour tous les nouveaux clusters et ceux redémarrés, activez {{< ui >}}Enabled{{< /ui >}}.
   {{< img src="data_jobs/databricks/toggle.png" alt="Interface utilisateur Databricks, paramètres administratifs, scripts d'initialisation globaux. Un script appelé 'install-datadog-agent' figure dans une liste avec un bouton d'activation activé." style="width:100%;" >}}
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.

#### Définissez les paramètres requis du script d'initialisation {#set-the-required-init-script-parameters}

Fournissez les valeurs pour les paramètres du script d'initialisation au début du script d'initialisation global.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

En option, vous pouvez également définir d'autres paramètres de script d'initialisation et des variables d'environnement Datadog ici, telles que `DD_ENV` et `DD_SERVICE`. Le script peut être configuré à l'aide des paramètres suivants :

| Variable                 | Description                                                                                                                                                      | Par défaut |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Votre [clé API Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Votre [site Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nom de votre espace de travail Databricks. Il doit correspondre au nom fourni dans l'étape [d'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration). Entourez le nom de guillemets doubles s'il contient des espaces. |         |
| DRIVER_LOGS_ENABLED      | Collecter les journaux du pilote Spark dans Datadog.                                                                                                                          | faux   |
| WORKER_LOGS_ENABLED      | Collecter les journaux des travailleurs Spark dans Datadog.                                                                                                                         | faux   |
| DD_TAGS                  | Ajoutez des étiquettes au cluster Databricks et aux métriques de performance Spark. Paires clé:valeur séparées par des virgules ou des espaces. Suivez les [conventions de balisage Datadog][4]. Exemple: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Définissez l'étiquette d'environnement `env` sur les métriques, les traces et les journaux de ce cluster.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtrer les journaux collectés avec des règles de traitement. Voir [Advanced Log Collection][5] pour plus de détails. |         |

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

   Le script ci-dessus télécharge et exécute le dernier init script for Data Observability: Jobs Monitoring in Databricks. Si vous souhaitez épingler votre script à une version spécifique, vous pouvez remplacer le nom de fichier dans l'URL (par exemple, `install-databricks-0.14.0.sh` pour utiliser la version `0.14.0`). Vous pouvez trouver le code source utilisé pour générer ce script, ainsi que les changements entre les versions du script, sur le [Datadog Agent repository][3].

1. **Ajoutez le script d'initialisation à la liste blanche** (nécessaire pour les clusters en mode d'accès **Standard**) : Si votre cluster utilise le mode d'accès **Standard**, vous devez ajouter le chemin du script d'initialisation à la liste blanche de Unity Catalog. Suivez les instructions dans la [Databricks documentation][27] pour ajouter le chemin de votre script d'initialisation à la liste blanche.

1. Sur la page de configuration du cluster, cliquez sur le {{< ui >}}Advanced options{{< /ui >}} toggle.
1. En bas de la page, allez à l'onglet {{< ui >}}Init Scripts{{< /ui >}}.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Interface Databricks, options avancées de configuration du cluster, onglet Scripts d'initialisation. Un menu déroulant 'Destination' et un sélecteur de fichier 'Chemin du script d'initialisation'." style="width:80%;" >}}

   - Sous le menu déroulant {{< ui >}}Destination{{< /ui >}}, sélectionnez {{< ui >}}Volume{{< /ui >}}.
   - Sous {{< ui >}}Init script path{{< /ui >}}, entrez le chemin du volume vers votre script d'initialisation.
   - Cliquez sur {{< ui >}}Add{{< /ui >}}.

#### Définissez les paramètres requis du script d'initialisation {#set-the-required-init-script-parameters-1}

1. Dans Databricks, sur la page de configuration du cluster, cliquez sur le {{< ui >}}Advanced options{{< /ui >}} toggle.
2. En bas de la page, allez à l'onglet {{< ui >}}Spark{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script-quoted.png" alt="Interface Databricks, options avancées de configuration du cluster, onglet Spark. Une zone de texte intitulée 'Variables d'environnement' contient les valeurs pour DD_API_KEY et DD_SITE." style="width:100%;" >}}

   Dans la zone de texte {{< ui >}}Environment variables{{< /ui >}}, fournissez les valeurs pour les paramètres du script d'initialisation.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
   ```

   En option, vous pouvez également définir d'autres paramètres de script d'initialisation et des variables d'environnement Datadog ici, telles que `DD_ENV` et `DD_SERVICE`. Le script peut être configuré à l'aide des paramètres suivants :

| Variable                 | Description                                                                                                                                                      | Par défaut |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Votre [clé API Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Votre [site Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nom de votre espace de travail Databricks. Il doit correspondre au nom fourni dans l'étape [d'intégration Datadog-Databricks](#configure-the-datadog-databricks-integration). Entourez le nom de guillemets doubles s'il contient des espaces. |         |
| DRIVER_LOGS_ENABLED      | Collecter les journaux du pilote Spark dans Datadog.                                                                                                                          | faux   |
| WORKER_LOGS_ENABLED      | Collecter les journaux des travailleurs Spark dans Datadog.                                                                                                                         | faux   |
| ÉTIQUETTES_DD                  | Ajoutez des étiquettes au cluster Databricks et aux métriques de performance Spark. Paires clé:valeur séparées par des virgules ou des espaces. Suivez les [conventions de balisage Datadog][4]. Exemplea: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Définissez l'étiquette d'environnement `env` sur les métriques, les traces et les journaux de ce cluster.                                                                                          |         |
| RÈGLES_DE_TRAITEMENT_DES_JOURNAUX_DD | Filtrez les journaux collectés avec des règles de traitement. Consultez [Collection avancée de journaux][5] pour plus de détails. |         |


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

Le script d'initialisation installe l'Agent lorsque les clusters démarrent.

Les clusters polyvalents déjà en cours d'exécution ou les clusters de tâches à long terme doivent être redémarrés manuellement pour que le script d'initialisation installe l'Agent Datadog.

Pour les tâches planifiées qui s'exécutent sur des clusters de tâches, le script d'initialisation installe automatiquement l'Agent Datadog lors de la prochaine exécution.

## Validation {#validation}

Dans Datadog, consultez la page [Data Observability: Jobs Monitoring][6] pour voir la liste de tous vos travaux Databricks.

Si certains travaux ne sont pas visibles, accédez à la page [Configuration][9] pour comprendre pourquoi. Cette page répertorie tous vos travaux Databricks qui ne sont pas encore configurés avec l'Agent sur leurs clusters, ainsi que des conseils pour compléter la configuration.

## Dépannage {#troubleshooting}

Si vous ne voyez aucune donnée dans DJM après l'installation du produit, suivez ces étapes.

1. **Validation de la clé API :** Si le script d'initialisation a été installé manuellement, mais que les données du cluster n'apparaissent toujours pas dans le produit DJM, utilisez le [point de terminaison de validation de la clé API][25] pour vous assurer que la clé API Datadog spécifiée dans le script est valide.
1. **Validation de l'Agent :** Le script d'initialisation installe l'Agent Datadog. Pour s'assurer qu'il est correctement installé, connectez-vous au cluster avec SSH et exécutez la commande d'état de l'Agent :
  ```shell
  sudo datadog-agent status
  ```

## Configuration avancée {#advanced-configuration}

### Filtrer la collecte des journaux sur les clusters {#filter-log-collection-on-clusters}

#### Exclure toute collecte de journaux d'un cluster individuel {#exclude-all-log-collection-from-an-individual-cluster}
Configurez la variable d'environnement suivante dans la section {{< ui >}}Advanced Configuration{{< /ui >}} de votre cluster dans l'interface utilisateur de Databricks ou en tant que [variable d'environnement Spark][18] dans l'API Databricks.

```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### Permissions {#permissions}
Accordez {{< ui >}}Workspace Admin{{< /ui >}} privilèges à l'utilisateur ou au principal de service qui se connecte à votre espace de travail Databricks. Cela permet à Datadog de gérer automatiquement les installations et mises à jour des scripts d'initialisation, réduisant ainsi le risque de mauvaise configuration.

Si vous avez besoin d'un contrôle plus granulaire, accordez ces permissions minimales aux [objets de niveau espace de travail][19] pour pouvoir toujours surveiller tous les travaux, clusters et requêtes au sein d'un espace de travail :

| Objet                 | Permission                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Travail                           | [PEUT VOIR][20]
| Compute | [PEUT S'ATTACHER À][21]
| Lakeflow Declarative Pipelines | [PEUT VOIR][22]
| Requête                           | [PEUT VOIR][23]
| SQL Warehouse | [PEUT SURVEILLER][24]

De plus, pour que Datadog puisse accéder à vos données de coût Databricks dans l'Observabilité des données : Surveillance des travaux ou [Gestion des coûts dans le cloud][26], l'utilisateur ou le principal de service utilisé pour interroger [les tables système][27] doit avoir les permissions suivantes :
   - `CAN USE` permission sur l'entrepôt SQL.
   - Accès en lecture aux [tables système][27] dans Unity Catalog. Cela peut être accordé avec :
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   L'utilisateur qui accorde ces droits doit avoir le privilège `MANAGE` sur `CATALOG system`.


### Tag spans at runtime {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

### Agrégation des métriques du cluster à partir d'exécutions de travail ponctuelles {#aggregate-cluster-metrics-from-one-time-job-runs}
   Cette configuration est applicable si vous souhaitez des données d'utilisation des ressources du cluster concernant vos travaux et créer un nouveau travail et un cluster pour chaque exécution via le [point de terminaison de l'API d'exécution ponctuelle][8] (commun lors de l'utilisation d'outils d'orchestration en dehors de Databricks tels qu'Airflow ou Azure Data Factory).

   Si vous soumettez des travaux Databricks via le [point de terminaison de l'API d'exécution ponctuelle][8], chaque exécution de travail a un identifiant de travail unique. Cela peut rendre difficile le regroupement et l'analyse des métriques de cluster pour les travaux qui utilisent des clusters éphémères. Pour agréger l'utilisation du cluster à partir du même travail et évaluer les performances sur plusieurs exécutions, vous devez définir la variable `DD_JOB_NAME` à l'intérieur de `spark_env_vars` de chaque `new_cluster` sur la même valeur que celle du corps de votre requête `run_name`.

   Voici un exemple de corps de requête pour une exécution de travail ponctuel :

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

### Configurer l'observabilité des données : Surveillance des travaux avec Databricks Networking Restrictions {#set-up-data-observability-jobs-monitoring-with-databricks-networking-restrictions}
Avec [Databricks Networking Restrictions][12], Datadog peut ne pas avoir accès à vos API Databricks, ce qui est nécessaire pour collecter des traces des exécutions de travaux Databricks ainsi que des tags et d'autres métadonnées.

Si vous contrôlez l'accès à l'API Databricks avec des [listes d'accès IP][13], l'ajout de Datadog à la liste blanche spécifique permet à Datadog de se connecter aux API Databricks dans votre espace de travail. {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} permet à Datadog de se connecter aux API Databricks dans votre espace de travail. Consultez la documentation de Databricks pour configurer les listes d'accès IP pour [les espaces de travail individuels][16] afin de donner accès à l'API Datadog.

Pour surveiller les espaces de travail qui utilisent la connectivité [Databricks Private Link][14], consultez [Connectivité Private Link (Aperçu)][15].

[15]: /fr/data_observability/jobs_monitoring/databricks/private_link

## Lectures complémentaires {#further-reading}

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