---
description: 'Configurer Data Observability : Jobs Monitoring pour les espaces de
  travail Databricks déployés avec Private Link Connectivity en utilisant un Private
  Action Runner.'
further_reading:
- link: /data_observability/jobs_monitoring/databricks
  tag: Documentation
  text: 'Data Observability : Jobs Monitoring pour Databricks'
- link: /actions/private_actions
  tag: Documentation
  text: Private Action Runners
title: Connectivité Private Link
---
<div class="alert alert-info">La surveillance de Databricks via la connectivité Private Link est en préversion.</div>

Les espaces de travail Databricks déployés à l'aide de [Private Link Connectivity][1] sont isolés de l'internet public, ce qui empêche Datadog d'accéder directement aux API Databricks. Pour surveiller ces espaces de travail, déployez un [Private Action Runner][2] (PAR) dans votre environnement. Le runner interroge Datadog pour obtenir des requêtes, les exécute localement sur l'API Databricks et renvoie les résultats via votre [endpoint VPC Datadog][3] existant.

## Architecture {#architecture}

La surveillance Private Link repose sur l'[architecture d'interrogation][4] du Private Action Runner. Datadog fournit une version personnalisée de l'image du Private Action Runner qui inclut un [script][5] pour interroger l'API Databricks.

{{< img src="data_jobs/databricks/privatelink-architecture-2.png" alt="Schéma d'architecture montrant le Private Action Runner interrogeant Datadog pour obtenir des requêtes, les exécutant sur l'API Databricks et renvoyant les résultats via l'endpoint VPC." style="width:100%;" >}}

Le flux de requêtes fonctionne comme suit :

1. Le [Private Action Runner][2] contacte le backend Datadog (via l'internet public ou via [Private Link][3]) pour interroger et obtenir les requêtes en attente. Si une requête est trouvée, les détails sont renvoyés au runner.
1. Les identifiants Databricks (ID client et secret) sont récupérés depuis le stockage de secrets. Un jeton est généré pour la session en appelant l'API Databricks depuis le runner à l'aide de ces identifiants.
1. Le runner exécute la requête récupérée sur l'API Databricks. Les résultats sont renvoyés au runner.
1. Le runner transmet les résultats au backend Datadog pour traitement.

Toute l'authentification auprès de Datadog est gérée par le Private Action Runner sous-jacent. Une liste d'autorisation configurée localement est définie sur le runner lors de l'installation pour limiter les actions pouvant être effectuées à celles qui sont nécessaires uniquement. Vous pouvez également configurer les contrôles d'accès dans Datadog pour gérer quels utilisateurs et équipes peuvent utiliser le runner. Consultez [Gérer l'accès aux Private Action Runners][16] pour plus d'informations.

## Installation {#installation}

### Étape 1 : Prérequis Datadog {#step-1-datadog-prerequisites}

1. Établissez la connectivité vers les endpoints de Datadog API depuis le VPC, en utilisant **l'une** des méthodes suivantes :
   - Sortie vers l'internet public (via une passerelle NAT ou autre)
   - Sortie vers Datadog via des endpoints VPC Private Link ou services :
     - **AWS** : [Configurer les endpoints VPC][3] (disponible dans US1, AP1 et AP2)
     - **Azure** : [Configuration du service Private Link][6] (disponible uniquement dans US3). Cela nécessite une approbation dans le compte Azure Datadog. Contactez le support Datadog comme indiqué dans les instructions.
     - **GCP** : [Configurer les endpoints Private Service Connect][7] (disponible dans US5 et EU1)
1. Créez un compte de service Datadog :
   1. Accédez à la page [Comptes de service][8].
   1. Cliquez sur **Nouveau compte de service**.
   1. Saisissez un nom et une adresse e-mail pour votre compte de service.
   1. Sous **Attribuer des rôles**, sélectionnez le **Rôle standard Datadog**. Alternativement, sélectionnez un rôle personnalisé disposant de l'autorisation `Connections Resolve`.
   1. Cliquez sur **Créer un compte de service**.
1. Assurez-vous que la [Remote Configuration][17] est activée pour votre compte Datadog.

### Étape 2 : Prérequis Databricks {#step-2-databricks-prerequisites}

{{< tabs >}}

{{% tab "Principal de service géré par Databricks" %}}

1. Créez un principal de service Databricks ([documentation Databricks][9]) :
   1. En tant qu'administrateur d'espace de travail, connectez-vous à l'espace de travail Databricks.
   1. Cliquez sur votre nom d'utilisateur dans la barre supérieure et sélectionnez **Paramètres**.
   1. Cliquez sur l'onglet **Identité et accès**.
   1. À côté de **Principaux de service**, cliquez sur **Gérer**.
   1. Cliquez sur **Ajouter un principal de service**, puis cliquez sur **Ajouter un nouveau** et saisissez un nom.
      - Alternativement, pour réutiliser un principal de service provenant d'un autre espace de travail, sélectionnez un principal de service existant et ignorez l'étape suivante.
   1. Cliquez sur **Add**.
1. Générez des secrets pour le principal de service Databricks ([documentation Databricks][10]) :
   1. Sélectionnez le principal de service créé ci-dessus.
   1. Cliquez sur l'onglet **Secrets**, puis cliquez sur **Générer un secret**.
   1. Définissez la durée de vie du secret en jours (maximum 730 jours).
   1. Cliquez sur **Générer**.
   1. Rendez les informations d'identification Databricks disponibles pour l'exécuteur en utilisant **l'une** des méthodes suivantes :
      - **Stockage de secrets dans le cloud** (AWS Secrets Manager, AWS Parameter Store, Azure Key Vault ou Google Cloud Secret Manager) : stockez les informations d'identification sous forme d'objet blob JSON :
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>"}
        ```
        Make note of the secret path (AWS ARN, AKV URL, or Google Cloud resource name). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. Provisionnez l'accès à l'espace de travail et les droits pour le principal de service. Consultez [Autorisations][11] pour plus de détails.
   1. Accordez au principal de service les privilèges **Administrateur d'espace de travail**. Cela permet à Datadog de gérer automatiquement les installations et les mises à jour des scripts d'initialisation. Alternativement, attribuez des [autorisations plus granulaires][11] pour la surveillance des tâches, des clusters et des requêtes.
      1. Cliquez sur l'onglet **Identité et accès**.
      1. À côté de **Groupes**, cliquez sur **Gérer**.
      1. Sélectionnez le groupe **admins**.
      1. Cliquez sur **Ajouter des membres** et sélectionnez le principal de service ajouté ci-dessus.
      1. Cliquez sur **Add**.
   1. Pour accéder aux données de coût Databricks ou surveiller les tâches serverless, accordez au principal de service `CAN USE` sur l'entrepôt SQL et un accès en lecture aux [tables système][20] dans Unity Catalog. Consultez [Autorisations][11] pour plus de détails.
   1. Pour surveiller les tâches serverless, ou pour utiliser la surveillance des entrepôts SQL et des requêtes, ajoutez le principal de service au groupe `databricks_pii_access` au niveau du compte. Databricks masque le texte des requêtes SQL pour les principaux en dehors de ce groupe. Consultez [Accès au texte des requêtes][21] pour plus de détails.

[9]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals?language=Workspace%C2%A0admin%C2%A0settings#-add-service-principals-to-your-account
[10]: https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m#-step-1-create-an-oauth-secret
[11]: /fr/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /fr/data_observability/jobs_monitoring/databricks/#query-text-access

{{% /tab %}}

{{% tab "Principal de service géré par Microsoft Entra ID" %}}

1. Enregistrez une application Microsoft Entra ID pour le principal de service ([documentation Microsoft Entra][22]) :
   1. Connectez-vous au [centre d'administration Microsoft Entra][23] en tant qu'administrateur d'applications cloud au minimum.
   1. Accédez à **Entra ID > Inscriptions d'applications**, puis cliquez sur **Nouvelle inscription**.
   1. Saisissez un nom et cliquez sur **Enregistrer**.
   1. Sur la page **Vue d'ensemble** de l'application, notez l'**ID d'application (client)** et l'**ID de répertoire (locataire)**.
1. Générez un secret client pour l'application ([documentation Microsoft Entra][22]) :
   1. Sur la page de l'application, cliquez sur **Certificats et secrets**.
   1. Cliquez sur l'onglet **Secrets client**, puis cliquez sur **Nouveau secret client**.
   1. Saisissez une description et une durée de vie, puis cliquez sur **Ajouter**.
   1. Copiez la valeur du secret généré. Il ne s'affiche qu'une seule fois.
   1. Rendez les informations d'identification Databricks disponibles pour l'exécuteur en utilisant **l'une** des méthodes suivantes :
      - **Stockage de secrets cloud** (AWS Secrets Manager, AWS Parameter Store ou Azure Key Vault) : stockez les informations d'identification sous forme de blob JSON :
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>", "tenant_id": "<TENANT_ID>"}
        ```
        Make note of the secret path (AWS ARN or AKV URL). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID`, `DATABRICKS_CLIENT_SECRET`, and `DATABRICKS_AZURE_TENANT_ID` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. Ajoutez l'application à Databricks en tant que principal de service géré par Microsoft Entra ID ([documentation Databricks][24]) :
   1. En tant qu'administrateur d'espace de travail, connectez-vous à l'espace de travail Databricks.
   1. Cliquez sur votre nom d'utilisateur dans la barre supérieure et sélectionnez **Paramètres**.
   1. Cliquez sur l'onglet **Identité et accès**.
   1. À côté de **Principaux de service**, cliquez sur **Gérer**.
   1. Cliquez sur **Ajouter un principal de service**, puis cliquez sur **Ajouter un nouveau**.
   1. Sélectionnez **Géré par Microsoft Entra ID**, puis collez l'**ID d'application (client)** noté ci-dessus.
   1. Saisissez un nom et cliquez sur **Ajouter**.
1. Provisionnez l'accès à l'espace de travail et les droits pour le principal de service. Consultez [Autorisations][11] pour plus de détails.
   1. Accordez au principal de service les privilèges **Administrateur d'espace de travail**. Cela permet à Datadog de gérer automatiquement les installations et les mises à jour des scripts d'initialisation. Alternativement, attribuez des [autorisations plus granulaires][11] pour la surveillance des tâches, des clusters et des requêtes.
      1. Cliquez sur l'onglet **Identité et accès**.
      1. À côté de **Groupes**, cliquez sur **Gérer**.
      1. Sélectionnez le groupe **admins**.
      1. Cliquez sur **Ajouter des membres** et sélectionnez le principal de service ajouté ci-dessus.
      1. Cliquez sur **Add**.
   1. Pour accéder aux données de coût Databricks ou surveiller les tâches serverless, accordez au principal de service `CAN USE` sur l'entrepôt SQL et un accès en lecture aux [tables système][20] dans Unity Catalog. Consultez [Autorisations][11] pour plus de détails.
   1. Pour surveiller les tâches serverless, ou pour utiliser la surveillance des entrepôts SQL et des requêtes, ajoutez le principal de service au groupe `databricks_pii_access` au niveau du compte. Databricks masque le texte des requêtes SQL pour les principaux en dehors de ce groupe. Consultez [Accès au texte des requêtes][21] pour plus de détails.

[11]: /fr/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /fr/data_observability/jobs_monitoring/databricks/#query-text-access
[22]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal
[23]: https://entra.microsoft.com
[24]: https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/manage-service-principals#add-service-principals-to-your-account

{{% /tab %}}

{{< /tabs >}}

### Étape 3 : Configurer le Private Action Runner {#step-3-set-up-the-private-action-runner}

Configurez votre Private Action Runner en utilisant **l'une** des options suivantes.

{{< tabs >}}

{{% tab "Helm (Kubernetes)" %}}

1. Installez le Private Action Runner dans votre cluster Kubernetes ([documentation supplémentaire][1], [Helm chart][2]) :
   1. Accédez à la page [Private Action Runner setup][3].
   1. Sélectionnez l'option **Script**, puis cliquez sur **Next**.
   1. Suivez les instructions sous **Kubernetes**.
   1. Le Private Action Runner devrait apparaître en bas comme "successfully installed".
1. Mettez à jour le `values.yaml` existant (en vous référant aux [Helm chart values][4]) :
   1. Définissez `image.repository` sur `gcr.io/datadoghq/dd-data-observability-par`.
   1. Définissez `image.tag` sur `1.21.0-3`.
1. Configurez les identifiants sur le Private Action Runner en utilisant l'une des méthodes suivantes :
    - Définissez les variables d'environnement `DATABRICKS_CLIENT_ID` et `DATABRICKS_CLIENT_SECRET` directement sur le runner. Si vous utilisez un principal de service géré par Microsoft Entra ID, définissez également `DATABRICKS_AZURE_TENANT_ID`. Laissez le champ « Secret Path » vide dans la tuile d'intégration.
    - Utilisez le stockage de secrets cloud. Assurez-vous qu'une identité est attribuée au pod ([Azure Workload Identity][5], [AWS IAM Role][6] ou [GKE Workload Identity][7]) avec les autorisations nécessaires pour lire le secret créé à l'[étape 2](#step-2-databrick-prerequisites), et fournissez le chemin d'accès au secret soit via la variable d'environnement `DATABRICKS_SECRET_PATH`, soit en le saisissant dans le champ « Secret Path » de la tuile d'intégration.
1. Redémarrez le déploiement pour que ces modifications prennent effet.

[1]: https://docs.datadoghq.com/fr/actions/private_actions/set_up_standalone/?tab=kuberneteshelm#install-the-runner
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[3]: https://app.datadoghq.com/actions/private-action-runners/new
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml
[5]: https://learn.microsoft.com/en-us/azure/aks/workload-identity-deploy-cluster?tabs=new-cluster
[6]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-association.html
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity

{{% /tab %}}

{{% tab "Docker (VM/EC2)" %}}

1. Installez le Private Action Runner à l'aide de Docker ([documentation supplémentaire][1]) :
   1. Accédez à la page [Private Action Runner setup][2].
   1. Sélectionnez l'option **Script**, puis cliquez sur **Next**.
   1. Suivez les instructions sous **Docker**.

      **Important** : Remplacez `gcr.io/datadoghq/private-action-runner:v1.21.0-large` par `gcr.io/datadoghq/dd-data-observability-par:1.21.0-3`.

   1. Le Private Action Runner devrait apparaître en bas comme "successfully installed".
1. Configurez les identifiants sur le Private Action Runner en utilisant l'une des méthodes suivantes :
    - Définissez les variables d'environnement `DATABRICKS_CLIENT_ID` et `DATABRICKS_CLIENT_SECRET` directement sur le runner. Si vous utilisez un principal de service géré par Microsoft Entra ID, définissez également `DATABRICKS_AZURE_TENANT_ID`. Laissez le champ « Secret Path » vide dans la tuile d'intégration.
    - Utilisez le stockage de secrets cloud. Assurez-vous qu'une identité est attribuée à l'instance ([Azure Managed Identity][5], [AWS IAM Role][6] ou [GCE Service Account][7]) avec les autorisations de lecture du secret créé à l'[étape 2](#step-2-databricks-prerequisites), et fournissez le chemin d'accès au secret soit via la variable d'environnement `DATABRICKS_SECRET_PATH`, soit en le saisissant dans le champ « Secret Path » de la tuile d'intégration.

1. Redémarrez le conteneur Docker pour que les modifications prennent effet.

[1]: https://docs.datadoghq.com/fr/actions/private_actions/set_up_standalone/?tab=docker#install-the-runner
[2]: https://app.datadoghq.com/actions/private-action-runners/new
[3]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[5]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[7]: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances

{{% /tab %}}

{{< /tabs >}}

**Remarque :** D'autres miroirs sont disponibles si `gcr.io` est inaccessible :
- `docker.io/datadog/dd-data-observability-par`
- `public.ecr.aws/datadog/dd-data-observability-par`
- `datadoghq.azurecr.io/dd-data-observability-par`
- `asia-docker.pkg.dev/datadoghq/asia.gcr.io/dd-data-observability-par`

### Étape 4 : Configurer Datadog {#step-4-configure-datadog}

1. Attachez une connexion au Private Action Runner :
   1. Accédez à la page [Private Action Runners][12].
   1. Sélectionnez l'exécuteur installé.
   1. Sélectionnez **Finish Setup**.
   1. Sélectionnez **Script**.
   1. Définissez **Path to File** sur `/etc/data-observability/config/script.yaml`.
   1. Sélectionnez **Next, Confirm Access**.
   1. Ajoutez le compte de service créé dans [Étape 1](#step-1-datadog-prerequisites) avec un accès **Resolver**. Cette étape est requise — l'exécuteur utilise ce compte de service pour authentifier les requêtes Datadog, et l'intégration ne peut pas fonctionner sans lui.
   1. Sélectionnez **Create and Test**. Vérifiez que les résultats du test ne renvoient aucune erreur.
1. Configurez l'intégration Databricks :
   1. Accédez à la tuile [Databricks integration][13].
   1. Sous **Credentials**, sélectionnez **Private Action Runner**.
      1. Sous **Connection**, sélectionnez la connexion créée à l'étape précédente.
      1. Sous **Service Account**, sélectionnez le compte de service créé à l'[étape 1](#step-1-datadog-prerequisites).
      1. Sous **Secret Path**, saisissez le Secret Path issu de [Étape 2](#step-2-databricks-prerequisites). Laissez ce champ vide si vous avez défini les identifiants à l'aide des variables d'environnement `DATABRICKS_CLIENT_ID` et `DATABRICKS_CLIENT_SECRET`, ou si vous avez défini le chemin à l'aide de la variable d'environnement `DATABRICKS_SECRET_PATH` sur le runner.
   1. Terminez le reste de la configuration de l'intégration comme décrit dans [Configure the Datadog-Databricks integration][14] :
      1. Saisissez le **Workspace Name**, le **Workspace URL** et l'**System Tables SQL Warehouse ID**.
      1. Activez les produits qui vous intéressent.
         **Remarque :** Model Serving derrière Private Link n'est pas pris en charge pour le moment.
      1. Si vous avez activé **Jobs Monitoring**, déployez le script d'initialisation du Datadog Agent pour surveiller les jobs et les clusters sur le calcul classique. Suivez les instructions de [Install the Datadog Agent][19] pour configurer le script d'initialisation, puis redémarrez les clusters en cours d'exécution pour que les modifications prennent effet.
   1. Cliquez sur **Save Databricks Workspace**.
   1. Vérifiez qu'aucune erreur ne s'affiche lors de l'enregistrement.

## Validation {#validation}

Une fois la configuration terminée, les informations sur les jobs et les clusters devraient apparaître rapidement dans [Data Observability: Jobs Monitoring][15].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[2]: https://docs.datadoghq.com/fr/actions/private_actions/
[3]: https://docs.datadoghq.com/fr/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us
[4]: https://docs.datadoghq.com/fr/actions/private_actions/#private-action-runner
[5]: https://docs.datadoghq.com/fr/actions/private_actions/run_script/
[6]: https://docs.datadoghq.com/fr/agent/guide/azure-private-link/?site=us3
[7]: https://docs.datadoghq.com/fr/agent/guide/gcp-private-service-connect/?site=us5
[8]: https://app.datadoghq.com/organization-settings/service-accounts
[12]: https://app.datadoghq.com/actions/private-action-runners/
[13]: https://app.datadoghq.com/integrations?search=databr&configPage=new&integrationId=databricks
[14]: /fr/data_observability/jobs_monitoring/databricks/#configure-the-datadog-databricks-integration
[15]: https://app.datadoghq.com/data-jobs/
[16]: https://docs.datadoghq.com/fr/actions/private_actions/enroll_runner/#manage-access-to-owned-runners
[17]: https://app.datadoghq.com/organization-settings/remote-config
[19]: /fr/data_observability/jobs_monitoring/databricks/#install-the-datadog-agent