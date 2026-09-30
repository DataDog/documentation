---
description: Configurez une surveillance complète pour votre environnement Google
  Cloud. Configurez des comptes de service, activez la collecte de métriques et explorez
  le transfert de logs et l'installation d'Agent.
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
  tag: Documentation
  text: Intégration Google Cloud
- link: https://docs.datadoghq.com/account_management/billing/google_cloud/
  tag: Guide
  text: Facturation de l'intégration Google Cloud
- link: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
  tag: Guide
  text: Délai de réception des métriques cloud
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guide
  text: Pourquoi installer le Datadog Agent sur mes instances dans le cloud ?
- link: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
  tag: Blog
  text: Les nouveaux dashboards et métriques GKE offrent une meilleure visibilité
    sur votre environnement
- link: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
  tag: Blog
  text: Accédez à Datadog de manière privée et surveillez votre utilisation de Google
    Cloud Private Service Connect
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: Blog
  text: Surveillez BigQuery avec Datadog
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Permettez aux ingénieurs de prendre en charge les coûts Google Cloud avec
    Datadog
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Collectez des traces, des logs et des Custom Metrics à partir de vos services
    Google Cloud Run avec Datadog
- link: https://learn.datadoghq.com/courses/getting-started-gcp
  tag: Centre d'apprentissage
  text: Bien démarrer avec l'observabilité dans Google Cloud avec Datadog
title: Bien démarrer avec Google Cloud
---
## Présentation {#overview}

Utilisez ce guide pour commencer à surveiller votre environnement Google Cloud. Cette approche simplifie la configuration pour les environnements Google Cloud avec plusieurs projets, vous permettant de maximiser votre couverture de surveillance.

## Comment les données Google Cloud atteignent Datadog {#how-google-cloud-data-reaches-datadog}

{{% google-cloud-data-collection-paths %}}

## Configuration {#setup}

### Prérequis {#prerequisites}
1) Créez un [compte Datadog][1]
2) Configurez un [compte de service][2] dans l'un de vos projets Google Cloud
3) Examinez ces prérequis Google Cloud :

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● Si votre organisation restreint les identités par domaine, vous devez ajouter l'identité client de Datadog `C0147pk0i` comme valeur autorisée dans votre politique.
{{% /site-region %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● L'intégration Google Cloud nécessite que les API ci-dessous soient activées **pour chacun des projets** que vous souhaitez surveiller :

<div class="alert alert-danger">Assurez-vous que les projets surveillés ne sont pas configurés comme <a href="https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.">projets de périmètre</a> qui extraient des métriques de plusieurs autres projets.</div>

[Cloud Monitoring API][3]
: Permet à Datadog d'interroger vos données de métriques Google Cloud.

[Compute Engine API][4]
: Permet à Datadog de découvrir les données des instances de calcul.

[Cloud Asset API][5]
: Permet à Datadog de demander des ressources Google Cloud et de lier les étiquettes pertinentes aux métriques en tant que tags.

[Cloud Resource Manager API][6]
: Permet à Datadog d'ajouter les ressources et les tags corrects aux métriques.

[IAM API][7]
: Permet à Datadog de s'authentifier auprès de Google Cloud.

[Cloud Billing API][8]
: Permet aux développeurs de gérer la facturation de leurs projets Google Cloud Platform par programmation. Consultez la section [Cloud Cost Management (CCM)](#cloud-cost-management-ccm) pour plus d'informations.

<div class="alert alert-info">Vous pouvez confirmer si ces API sont activées en accédant à <a href="https://console.cloud.google.com/apis/dashboard">API et services activés</a>.</div>

### Collecte de métriques {#metric-collection}

{{% google-cloud-collection-scope %}}

<div class="alert alert-info">Si votre organisation Google Cloud utilise <a href="https://cloud.google.com/vpc-service-controls/docs/overview">VPC Service Controls</a>, vous devez explicitement autoriser les comptes de service Datadog à accéder aux ressources protégées. Si ces comptes de service ne sont pas autorisés au sein de votre périmètre de service, la collecte des métriques, des ressources et des métadonnées peut échouer. Contactez le <a href="/help/">support Datadog</a> pour obtenir les identifiants de compte de service pour votre site ou votre région.</div>

{{< tabs >}}

{{% tab "Niveau organisation" %}}

La surveillance au niveau de l'organisation est recommandée pour une couverture complète de tous les projets, y compris les futurs projets qui pourraient être créés dans une organisation.

**Remarque** : Votre compte utilisateur [Google Cloud Identity][408] doit disposer du rôle `Admin` attribué au périmètre souhaitée pour terminer la configuration dans Google Cloud (par exemple, `Organization Admin`).

{{% collapse-content title="1. Créez un compte de service Google Cloud dans le projet par défaut" level="h4" %}}
1. Ouvrez votre [console Google Cloud][401].
2. Accédez à {{< ui >}}IAM & Admin{{< /ui >}} > {{< ui >}}Service Accounts{{< /ui >}}.
3. Cliquez sur {{< ui >}}Create service account{{< /ui >}} en haut.
4. Donnez un nom unique au compte de service.
5. Cliquez sur {{< ui >}}Done{{< /ui >}} pour terminer la création du compte de service.

[401]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="2. Ajoutez le compte de service au niveau de l'organisation ou du dossier" level="h4" %}}
1. Dans la console Google Cloud, accédez à la page {{< ui >}}IAM{{< /ui >}}.
2. Sélectionnez un dossier ou une organisation.
3. Pour accorder un rôle à un principal qui ne possède pas déjà d'autres rôles sur la ressource, cliquez sur {{< ui >}}Grant Access{{< /ui >}}, puis saisissez l'adresse e-mail du compte de service que vous avez créé précédemment.
4. Saisissez l'adresse e-mail du compte de service.
5. Attribuez les rôles suivants :
   - [Compute Viewer][402] fournit un accès **en lecture seule** pour obtenir et lister les ressources Compute Engine
   - [Monitoring Viewer][403] fournit un accès **en lecture seule** aux données de surveillance disponibles dans votre environnement Google Cloud
   - [Cloud Asset Viewer][404] fournit un accès **en lecture seule** aux métadonnées des ressources cloud
   - [Browser][405] fournit un accès **en lecture seule** pour parcourir la hiérarchie d'un projet
   - [Service Usage Consumer][406] (**facultatif**, pour les environnements multi-projets) fournit une [attribution des coûts et des quotas d'API par projet](#enable-per-project-cost-and-api-quota-attribution)
6. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque** : Le rôle `Browser` n'est requis que dans le projet par défaut du compte de service. Les autres projets ne nécessitent que les autres rôles listés.

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. Ajoutez le principal Datadog à votre compte de service" level="h4" %}}
**Remarque** : Si vous avez précédemment configuré l'accès à l'aide d'un principal Datadog partagé, vous pouvez révoquer l'autorisation pour ce principal une fois ces étapes terminées.

1. Dans Datadog, accédez à {{< ui >}}Integrations{{< /ui >}} > [{{< ui >}}Google Cloud Platform{{< /ui >}}][407].
2. Cliquez sur {{< ui >}}Add Google Cloud Account{{< /ui >}}.
Si aucun projet n'est encore configuré, vous serez automatiquement redirigé vers cette page.
3. Copiez votre principal Datadog et conservez-le pour la section suivante.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="La page d'ajout d'un nouveau compte Google Cloud dans la tuile d'intégration Google Cloud de Datadog" style="width:70%;">}}

**Remarque** : Laissez cette fenêtre ouverte pour la section 4.

4. Dans la [console Google Cloud][409], sous le menu {{< ui >}}Service Accounts{{< /ui >}}, recherchez le compte de service que vous avez créé dans la section 1.
5. Accédez à l'onglet {{< ui >}}Permissions{{< /ui >}} et cliquez sur {{< ui >}}Grant Access{{< /ui >}}.

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interface de la console Google Cloud, montrant l'onglet Autorisations sous Comptes de service." style="width:70%;">}}

6. Collez votre principal Datadog dans la zone de texte {{< ui >}}New principals{{< /ui >}}.
7. Attribuez le rôle de {{< ui >}}Service Account Token Creator{{< /ui >}}.
8. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Terminez la configuration de l'intégration dans Datadog" level="h4" %}}
1. Dans votre console Google Cloud, accédez à l'onglet {{< ui >}}Service Account{{< /ui >}} > {{< ui >}}Details{{< /ui >}}. Sur cette page, recherchez l'adresse e-mail associée à ce compte de service Google. Elle suit le format `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`.
2. Copiez cette adresse e-mail.
3. Retournez sur la tuile de configuration de l'intégration dans Datadog (où vous avez copié votre principal Datadog dans la section précédente).
4. Collez l'adresse e-mail que vous avez copiée dans {{< ui >}}Add Service Account Email{{< /ui >}}.
5. Cliquez sur {{< ui >}}Verify and Save Account{{< /ui >}}.
{{% /collapse-content %}}

Les métriques apparaissent dans Datadog environ **15 minutes** après la configuration.

[408]: https://cloud.google.com/identity/docs/overview

{{% /tab %}}

{{% tab "Niveau Projet et Dossier" %}}

{{% collapse-content title="Démarrage rapide (recommandé)" level="h4" expanded=false id="quickstart-setup" %}}

### Prérequis {#prerequisites-1}

Pour utiliser la méthode de démarrage rapide, votre rôle utilisateur Datadog doit être en mesure de créer des clés d'API et d'application. Si vous utilisez un [rôle géré par Datadog][202], vous devez disposer du {{< ui >}}Datadog Admin role{{< /ui >}}. Si vous utilisez un [rôle personnalisé][203], votre rôle doit disposer au moins des autorisations `api_keys_write` et `user_app_keys`.

### Choisissez la configuration de démarrage rapide si... {#choose-quick-start-setup-if}

- Vous configurez l'intégration Google Cloud pour la première fois.
- Vous préférez un workflow basé sur l'interface utilisateur et souhaitez minimiser le temps nécessaire pour créer un compte de service avec les autorisations de surveillance requises.
- Vous souhaitez automatiser les étapes de configuration dans des scripts ou des pipelines CI/CD.

### Instructions{#instructions}

1. Sur la [page d'intégration Google Cloud][200], sélectionnez {{< ui >}}+ Add GCP Account{{< /ui >}}.
2. Cliquez sur {{< ui >}}Quick Start{{< /ui >}}.
3. Cliquez sur {{< ui >}}Copy{{< /ui >}} dans la section du script de configuration.<br>
   **Remarque** : Datadog recommande d'exécuter ce script localement via la [CLI gcloud][201], car cela peut être plus rapide. Cela nécessite que vos identifiants Google Cloud soient disponibles localement et que la CLI gcloud soit installée sur votre machine.
4. Cliquez sur {{< ui >}}Open Google Cloud Shell{{< /ui >}}, ou accédez à [Google Cloud Shell][204].
5. Collez le script dans l'invite de commande et exécutez-le.
6. Sélectionnez les dossiers et projets à surveiller. Vous ne pouvez voir que les projets et dossiers pour lesquels vous disposez de l'accès et des autorisations requis.
7. Sous {{< ui >}}Provide Service Account Details{{< /ui >}} :
   1. Donnez un nom au compte de service.
   2. Sélectionnez le projet qui contiendra le compte de service.
8. Configurez {{< ui >}}Metric Collection{{< /ui >}} (facultatif).
   1. Choisissez si vous souhaitez désactiver l'option de mise en sourdine des monitors pour les arrêts d'instances GCE et les événements de mise à l'échelle automatique attendus.
   2. Choisissez si vous souhaitez appliquer des tags aux métriques associées au compte de service créé.
   3. Choisissez si vous souhaitez désactiver la collecte de métriques pour des services Google Cloud spécifiques afin de mieux contrôler les coûts de Google Cloud Monitoring.
   4. Choisissez si vous souhaitez appliquer des filtres de métriques granulaires pour tous les services Google Cloud activés pour la collecte de métriques.
   5. Choisissez si vous souhaitez filtrer les métriques par tags pour les types de ressources GCP `Cloud Run Revision`, `VM Instance` ou `Cloud Function` afin de mieux contrôler les coûts Datadog.
   **Remarque** : le filtrage `VM Instance` n'a pas d'impact sur les métriques `gcp.logging.*` associées et n'entraîne aucune incidence sur la facturation pour ces métriques.
9. Configurez {{< ui >}}Resource Collection{{< /ui >}} (attributs et informations de configuration des ressources dans votre environnement Google Cloud, facultatif).
10. Un résumé des modifications à effectuer s'affiche. Si vous confirmez, le script :
    - Active les API requises
    - Attribue les autorisations nécessaires pour surveiller chaque projet et dossier sélectionné
    - Termine la configuration de l'intégration dans Datadog

[200]: https://app.datadoghq.com/integrations/google-cloud-platform
[201]: https://cloud.google.com/sdk/docs/install
[202]: /fr/account_management/rbac/permissions/#managed-roles
[203]: /fr/account_management/rbac/permissions/#custom-roles
[204]: https://ssh.cloud.google.com/cloudshell
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}

### Choisissez la configuration Terraform si... {#choose-terraform-setup-if}

- Vous gérez l'infrastructure sous forme de code et souhaitez conserver l'intégration Google Cloud de Datadog sous contrôle de version.
- Vous devez configurer plusieurs dossiers ou projets de manière cohérente avec des blocs de fournisseur réutilisables.
- Vous souhaitez un processus de déploiement reproductible et auditable qui s'intègre dans votre environnement géré par Terraform.

### Instructions {#instructions-1}

1. Sur la [page d'intégration Google Cloud][500], sélectionnez {{< ui >}}+ Add GCP Account{{< /ui >}}.
2. Sélectionnez {{< ui >}}Terraform{{< /ui >}}.
3. Sous {{< ui >}}Provide GCP Resources{{< /ui >}}, ajoutez les ID de projet et les ID de dossier à surveiller.
4. Sélectionnez les dossiers et projets à surveiller.
5. Sous {{< ui >}}Provide Service Account Details{{< /ui >}} :
   1. Donnez un nom au compte de service.
   2. Sélectionnez le projet qui contiendra le compte de service.
6. Configurez {{< ui >}}Metric Collection{{< /ui >}} (facultatif).
   1. Choisissez si vous souhaitez désactiver l'option de mise en sourdine des monitors pour les arrêts d'instances GCE et les événements de mise à l'échelle automatique attendus.
   2. Choisissez si vous souhaitez appliquer des tags aux métriques associées au compte de service créé.
   3. Choisissez si vous souhaitez désactiver la collecte de métriques pour des services Google Cloud spécifiques afin de mieux contrôler les coûts de Google Cloud Monitoring.
   4. Choisissez si vous souhaitez appliquer des filtres de métriques granulaires pour tous les services Google Cloud activés pour la collecte de métriques.
   5. Choisissez si vous souhaitez filtrer les métriques par tags pour les types de ressources GCP `Cloud Run Revision`, `VM Instance` ou `Cloud Function` afin de mieux contrôler les coûts Datadog.
7. Configurez {{< ui >}}Resource Collection{{< /ui >}} (attributs et informations de configuration des ressources dans votre environnement Google Cloud).
8. Copiez le {{< ui >}}Terraform Code{{< /ui >}} fourni.
9. Collez le code dans un fichier `.tf` et exécutez la commande {{< ui >}}Initialize and apply the Terraform{{< /ui >}}. En cas de succès, la commande :
   - Active les API requises
   - Attribue les autorisations nécessaires pour surveiller chaque projet et dossier sélectionné
   - Termine la configuration de l'intégration dans Datadog

[500]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% collapse-content title="Méthode manuelle" level="h4" expanded=false id="manual-setup" %}}

### Choisissez la configuration manuelle si... {#choose-manual-setup-if}

- Vous devez configurer l'accès manuellement pour un petit nombre de projets ou de dossiers.
- Vous souhaitez un contrôle étape par étape plus précis sur l'attribution des autorisations et des identifiants dans l'interface utilisateur GCP.

### Instructions {#instructions-2}

1. Sur la [page d'intégration Google Cloud][600], sélectionnez {{< ui >}}+ Add GCP Account{{< /ui >}}.
2. Cliquez sur {{< ui >}}Manual{{< /ui >}}.
3. Copiez la valeur {{< ui >}}Datadog Principal{{< /ui >}}, puis cliquez sur {{< ui >}}Open the Google Console{{< /ui >}}.
4. Créez un compte de service :
   1. Donnez un nom descriptif au compte de service, puis cliquez sur {{< ui >}}Create and continue{{< /ui >}}.
   2. Sous {{< ui >}}Permissions{{< /ui >}}, recherchez et ajoutez le rôle {{< ui >}}Service Account Token Creator{{< /ui >}} depuis le menu déroulant, puis cliquez sur {{< ui >}}Continue{{< /ui >}}.
   3. Sous {{< ui >}}Principals with access{{< /ui >}}, collez la valeur {{< ui >}}Datadog Principal{{< /ui >}} dans le champ {{< ui >}}Service account users role{{< /ui >}}, puis cliquez sur {{< ui >}}Done{{< /ui >}}.
5. Cliquez sur le lien du compte de service dans la colonne {{< ui >}}Email{{< /ui >}}.
6. Copiez la valeur {{< ui >}}Email{{< /ui >}}.
7. Dans Datadog, collez l'adresse e-mail du compte de service dans la section {{< ui >}}Add Service Account Email{{< /ui >}}.
8. Configurez {{< ui >}}Metric Collection{{< /ui >}} (facultatif).
   1. Choisissez si vous souhaitez désactiver l'option de mise en sourdine des monitors pour les arrêts d'instances GCE et les événements de mise à l'échelle automatique attendus.
   2. Choisissez si vous souhaitez appliquer des tags aux métriques associées au compte de service créé.
   3. Choisissez si vous souhaitez désactiver la collecte de métriques pour des services Google Cloud spécifiques afin de mieux contrôler les coûts de Google Cloud Monitoring.
   4. Choisissez si vous souhaitez appliquer des filtres de métriques granulaires pour tous les services Google Cloud activés pour la collecte de métriques.
   5. Choisissez si vous souhaitez filtrer les métriques par tags pour les types de ressources GCP `Cloud Run Revision`, `VM Instance` ou `Cloud Function` afin de mieux contrôler les coûts Datadog.
9. Configurez {{< ui >}}Resource Collection{{< /ui >}} (attributs et informations de configuration des ressources dans votre environnement Google Cloud, facultatif).
10. Cliquez sur {{< ui >}}Verify and Save Account{{< /ui >}}.

[600]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### Validation {#validation}

Pour afficher vos métriques, utilisez le menu de gauche pour accéder à {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} et recherchez `gcp` :

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="La page Résumé des métriques dans Datadog filtrée sur les métriques commençant par GCP" style="width:100%;" >}}

### Intégrations Google Cloud {#google-cloud-integrations}

L'intégration Google Cloud collecte toutes les [métriques Google Cloud][12] disponibles à partir de vos projets via Google Cloud Monitoring API. Les intégrations sont installées automatiquement lorsque Datadog reconnaît des données ingérées depuis votre compte Google Cloud, comme BigQuery.

{{% collapse-content title="Voir les intégrations Google Cloud à partir desquelles Datadog collecte des métriques" level="h4" %}}
{{% google-cloud-integrations %}}
{{% /collapse-content %}}

Pour approfondir la surveillance de nombreux services populaires, consultez les blogs liés ci-dessous.

{{% collapse-content title="Blogs sur les intégrations" level="h4" %}}
[Cloud Armor][20]
: Google Cloud Armor est un service de sécurité réseau qui protège contre les attaques DDoS et les attaques applicatives.

[BigQuery][21]
: BigQuery est un entrepôt de données serverless et multi-cloud qui peut vous fournir des informations précieuses à partir de vos données métier.

[Cloud Run][22]
: Cloud Run est une plateforme entièrement gérée qui vous permet d'exécuter votre code directement sur une infrastructure évolutive dans Google Cloud.

[Cloud SQL][23]
: Cloud SQL est un service de base de données relationnelle entièrement géré qui fonctionne avec MySQL, PostgreSQL et SQL Server.

[Compute Engine][24]
: Compute Engine est un service de calcul et d'hébergement qui vous offre la possibilité de créer et d'exécuter des machines virtuelles dans Google Cloud.

[Dataflow][25]
: Dataflow est un service d'analyse de flux entièrement géré qui utilise la mise à l'échelle automatique et le traitement de données en temps réel.

[Eventarc][26]
: Eventarc est un service entièrement géré vous permettant de créer des architectures basées sur les événements.

[Google Kubernetes Engine (GKE)][27]
: GKE est un service Kubernetes entièrement géré.

[Private Service Connect][28]
: Private Service Connect vous permet d'accéder aux services Google gérés de manière privée depuis votre réseau VPC.

[Security Command Center][29]
: Security Command Center assure la gestion de la posture et la détection des menaces pour le code, les identités et les données.

[Vertex AI][30]
: Vertex AI est une plateforme de développement d'IA générative entièrement gérée.
{{% /collapse-content %}}

### Limiter les filtres de collecte de métriques {#limit-metric-collection-filters}

Vous pouvez choisir les services et les ressources dont vous souhaitez collecter les métriques. Cela peut aider à contrôler les coûts en réduisant le nombre d'appels API effectués en votre nom.

{{% collapse-content title="Limiter la collecte de métriques par service Google Cloud et par filtres de métriques granulaires" level="h4" %}}

Sous l'onglet {{< ui >}}Metric Collection{{< /ui >}} de la [page d'intégration Google Cloud][11] de Datadog, désélectionnez les espaces de noms de métriques à exclure.

Pour appliquer un filtrage granulaire des métriques pour les services activés, cliquez sur le service en question et appliquez vos filtres dans le champ `Add filters for gcp.<service>`.

{{< img src="integrations/google_cloud_platform/limit_metric_collection_2025-11-11.png" alt="L'onglet de collecte de métriques dans la page d'intégration Google Cloud de Datadog, avec le service AI Platform déplié pour afficher le champ « Add filters for gcp.ml »" style="width:80%;">}}

**Exemples de filtres** :

`subscription.*` `topic.*`
: Limiter la collecte aux métriques **correspondant soit à** `gcp.<service>.subscription.*`**, soit à** `gcp.<service>.topic.*`

`!*_cost` `!*_count`
: Limiter la collecte aux métriques **qui ne correspondent ni à** `gcp.<service>.*_cost` **ni à** `gcp.<service>.*_count`

`snapshot.*` `!*_by_region`
: Limiter la collecte aux métriques **correspondant à** `gcp.<service>.snapshot.*`**, mais ne correspondant pas à** `gcp.<service>.*_by_region`

{{% /collapse-content %}}

{{% collapse-content title="Limiter la collecte des métriques par région Google Cloud et par ressources globales" level="h4" %}}

Sous l'onglet {{< ui >}}Metric Collection{{< /ui >}} de la [page d'intégration Google Cloud][11] de Datadog, désélectionnez les régions à exclure de la collecte des métriques.

Si une valeur de région ou d'emplacement n'apparaît pas dans les cases à cocher, ajoutez-la dans le champ {{< ui >}}Additional Locations{{< /ui >}}. Le filtre effectue une correspondance exacte avec la valeur de libellé rapportée par Google Cloud, saisissez donc les valeurs exactement telles qu'elles apparaissent sur vos ressources (par exemple, `us-central`).

Vous pouvez également désactiver toutes les métriques globales non associées à une région.

{{< img src="integrations/google_cloud_platform/metric_region_filtering.png" alt="L'onglet de collecte des métriques dans la page d'intégration Google Cloud de Datadog, avec l'option Activer les métriques globales en surbrillance et un sous-ensemble de régions sélectionné. L'option Emplacements supplémentaires est également mise en surbrillance avec un filtre multi-région défini" style="width:80%;">}}

{{% /collapse-content %}}

{{% collapse-content title="Limiter la collecte des métriques par host ou par instance Cloud Run" level="h4" %}}
1. Attribuez un tag (telle que `datadog:true`) aux hosts ou aux instances Cloud Run que vous souhaitez surveiller avec Datadog.
2. Sous l'onglet {{< ui >}}Metric Collection{{< /ui >}} de la [page d'intégration Google Cloud][11] de Datadog, saisissez les tags dans la zone de texte {{< ui >}}Limit Metric Collection Filters{{< /ui >}}. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog. Vous pouvez utiliser des caractères génériques (`?` pour un seul caractère, `*` pour plusieurs caractères) pour faire correspondre de nombreux hosts, ou `!` pour exclure certains hosts. Cet exemple inclut toutes les instances de taille `c1*`, mais exclut les hosts de type staging :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consultez la documentation de Google sur la [création et la gestion des libellés][44] pour plus de détails.
{{% /collapse-content %}}

Dans l'exemple ci-dessous, seuls les hosts Google Cloud avec le libellé `datadog:true` sont surveillés par Datadog :

{{< img src="integrations/google_cloud_platform/limit_metric_collection.png" alt="Les champs permettant de limiter la collecte de métriques dans la tuile d'intégration Google Cloud" style="width:100%;" >}}

#### Activer l'attribution des coûts et des quotas d'API par projet {#enable-per-project-cost-and-api-quota-attribution}

Par défaut, Google Cloud attribue le coût de surveillance des appels d'API, ainsi que l'utilisation des quotas d'API, au projet contenant le compte de service pour cette intégration. En guise de bonne pratique pour les environnements Google Cloud comportant plusieurs projets, activez l'attribution des coûts par projet pour la surveillance des appels d'API et l'utilisation des quotas d'API. Une fois cette option activée, les coûts et l'utilisation des quotas sont attribués au projet *interrogé*, plutôt qu'au projet contenant le compte de service. Cela permet de visualiser les coûts de surveillance encourus par chaque projet et aide également à éviter d'atteindre les limites de débit de l'API.

Pour activer cette fonctionnalité :
1. Assurez-vous que le compte de service Datadog dispose du rôle [Service Usage Consumer][410] avec le périmètre souhaité (dossier ou organisation).
2. Cliquez sur le bouton {{< ui >}}Enable Per Project Quota{{< /ui >}} dans l'onglet {{< ui >}}Projects{{< /ui >}} de la [page d'intégration Google Cloud][411].

[410]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[411]: https://app.datadoghq.com/integrations/google-cloud-platform/

## Collecte de logs {#log-collection}

Le transfert des logs depuis votre environnement Google Cloud permet une surveillance en temps quasi réel des ressources et des activités se déroulant dans votre organisation ou votre dossier. Vous pouvez configurer des [monitors de logs][37] pour être averti des problèmes, utiliser [Cloud SIEM][38] pour détecter les menaces, ou tirer parti de [Watchdog][39] pour identifier des problèmes inconnus ou des comportements anormaux.

Utilisez le [modèle Datadog Dataflow][14] pour traiter par lots et compresser vos événements de log avant de les transférer vers Datadog via [Google Cloud Dataflow][15]. Il s'agit du moyen le plus efficace en termes de réseau pour transférer vos logs. Pour spécifier quels logs sont transférés, configurez le [collecteur de logs Google Cloud][40] avec des requêtes d'inclusion ou d'exclusion en utilisant le [langage de requête de journalisation][56] de Google Cloud. Consultez la [page de configuration du transfert de logs Google Cloud][67] pour connaître les options de configuration du transfert de logs (y compris Terraform) et les instructions.

<div class="alert alert-danger">L'<b>API Dataflow</b> doit être activée pour utiliser Google Cloud Dataflow. Consultez <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>l'activation des API</b></a> dans la documentation Google Cloud pour plus d'informations.</div>

## Tirer parti du Datadog Agent {#leveraging-the-datadog-agent}

Une fois l'intégration Google Cloud configurée, Datadog commence automatiquement à collecter les métriques Google Cloud. Cependant, vous pouvez utiliser le Datadog Agent pour obtenir des informations plus approfondies sur votre infrastructure.

Le [Datadog Agent][31] fournit les [métriques les plus granulaires et à faible latence][32] de votre infrastructure, offrant des informations en temps réel sur le processeur, la mémoire, l'utilisation du disque et plus encore pour vos hosts Google Cloud.
L'Agent peut être installé sur n'importe quel host, y compris [GKE][33].

L'Agent prend également en charge un large éventail d'[intégrations][34], vous permettant d'étendre la visibilité sur des services et bases de données spécifiques exécutés sur vos hosts.

Les [traces][35] collectées via l'Agent permettent une surveillance complète des performances des applications (Application Performance Monitoring, ou APM), vous aidant à comprendre les performances des services de bout en bout.

Les [logs][57] collectés via l'Agent offrent une visibilité sur vos ressources Google Cloud et sur les activités se déroulant dans votre environnement Google Cloud.

Pour obtenir la liste complète des avantages de l'installation de l'Agent sur vos instances cloud, consultez [Pourquoi devrais-je installer le Datadog Agent sur mes instances cloud&nbsp;?][36]

## Collecte des changements de ressources {#resource-changes-collection}

La collecte des changements de ressources vous permet de surveiller les changements d'infrastructure dans votre environnement Google Cloud. Lorsque Cloud Asset Inventory de Google détecte des changements dans vos ressources cloud, un événement est transmis à Datadog [Event Management][62] via un sujet et un abonnement Cloud Pub/Sub. Utilisez ces événements pour être informé de manière proactive des changements risqués dans votre infrastructure et pour faciliter le dépannage.

Pour des instructions de configuration détaillées, consultez la [section sur la collecte des changements de ressources][18] de la documentation de l'intégration Google Cloud.

## Explorer les services associés {#explore-related-services}

### Private Service Connect {#private-service-connect}

<div class="alert alert-info">Private Service Connect est uniquement disponible pour les sites Datadog US5 et EU.</div>

Utilisez l'[intégration Google Cloud Private Service Connect][58] pour visualiser les connexions, les données transférées et les paquets abandonnés via Private Service Connect. Cela vous donne une visibilité sur les métriques importantes de vos connexions Private Service Connect, aussi bien pour les producteurs que pour les consommateurs.
[Private Service Connect (PSC)][59] est un produit réseau de Google Cloud qui vous permet d'accéder directement à des [services Google Cloud][60], à des [services de partenaires tiers][61] et à des applications appartenant à l'entreprise depuis votre Virtual Private Cloud (VPC).

Consultez [Accéder à Datadog de manière privée et surveiller votre utilisation de Google Cloud Private Service Connect][28] sur le blog Datadog pour plus d'informations.

### Google Cloud Run {#google-cloud-run}

Utilisez l'[intégration Google Cloud Run][42] pour obtenir des informations détaillées sur vos conteneurs Cloud Run, telles que des métriques et des logs d'audit.

### Cloud Cost Management (CCM) {#cloud-cost-management-ccm}

[Google Cloud Cost Management][45] de Datadog fournit aux équipes d'ingénierie et de finance des informations pour comprendre comment les changements d'infrastructure affectent les coûts, répartir les dépenses dans votre organisation et identifier les améliorations potentielles.

### Cloud SIEM {#cloud-siem}

Cloud SIEM fournit une analyse en temps réel des logs opérationnels et de sécurité, tout en utilisant des intégrations et des règles prêtes à l'emploi pour détecter et enquêter sur les menaces.
Pour utiliser cette fonctionnalité, consultez [Prise en main de Cloud SIEM][46].

Pour afficher les résultats de sécurité de [Google Cloud Security Command Center][47] dans Cloud SIEM, activez l'option {{< ui >}}Enable collection of security findings{{< /ui >}} sous l'onglet {{< ui >}}Security Findings{{< /ui >}} et suivez les instructions de configuration sur le [guide Google Cloud Security Command Center][48].

{{< img src="integrations/google_cloud_platform/security_findings.png" alt="L'onglet des résultats de sécurité dans la tuile d'intégration Google Cloud" style="width:90%;" >}}

### Cloud Security {#cloud-security}

Datadog Cloud Security offre une détection des menaces en temps réel et des audits de configuration continus sur l'ensemble de votre infrastructure cloud.
Consultez le [guide de configuration de Cloud Security][49] pour commencer.

Après avoir configuré Cloud Security, activez l'option {{< ui >}}Enable Resource Collection{{< /ui >}} sous l'onglet {{< ui >}}Resource Collection{{< /ui >}} pour commencer à collecter des données de configuration pour le [Resource Catalog][50] et Cloud Security. Ensuite, suivez ces instructions pour activer [les erreurs de configuration et les risques liés aux identités (CIEM)][51] sur Google Cloud.

{{< img src="integrations/google_cloud_platform/resource_collection.png" alt="L'onglet de collecte des ressources dans la tuile d'intégration Google Cloud" style="width:100%;" >}}

### Surveillance BigQuery étendue {#expanded-bigquery-monitoring}

La surveillance étendue de BigQuery offre une visibilité granulaire sur vos environnements BigQuery. Consultez la documentation sur [BigQuery Data Observability][68] pour plus d'informations.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://cloud.google.com/iam/docs/service-accounts-create
[3]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[4]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[5]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[6]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[7]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[8]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[10]: https://console.cloud.google.com/
[11]: https://app.datadoghq.com/integrations/google-cloud-platform
[12]: https://cloud.google.com/monitoring/api/metrics_gcp
[13]: https://cloud.google.com/compute/docs/labeling-resources
[14]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[15]: https://cloud.google.com/dataflow
[18]: /fr/integrations/google_cloud_platform/#resource-changes-collection
[19]: /fr/help/
[20]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
[21]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[22]: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
[23]: https://www.datadoghq.com/blog/monitor-google-cloud-sql/
[24]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog/
[25]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[26]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
[27]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[28]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[29]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[30]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[31]: /fr/agent/
[32]: /fr/extend/guide/data-collection-resolution-retention/#pagetitle:~:text=n/a-,Infrastructure,-Agent%20integrations
[33]: /fr/integrations/gke/?tab=standard
[34]: /fr/integrations/
[35]: /fr/tracing/
[36]: /fr/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[37]: /fr/monitors/types/log/
[38]: /fr/security/cloud_siem/
[39]: /fr/watchdog/
[40]: https://cloud.google.com/logging/docs/routing/overview#sinks
[41]: /fr/integrations/google_cloud_platform/#setup
[42]: /fr/integrations/google_cloud_run/
[43]: /fr/integrations/google_cloud_run/#log-collection
[44]: /fr/cloud_cost_management/
[45]: /fr/cloud_cost_management/setup/google_cloud/
[46]: /fr/getting_started/cloud_siem/
[47]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[48]: /fr/integrations/google_cloud_security_command_center/#installation
[49]: /fr/security/cloud_security_management/setup/
[50]: /fr/infrastructure/resource_catalog/
[51]: /fr/security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[52]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[53]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[54]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[55]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[56]: https://cloud.google.com/logging/docs/view/logging-query-language
[57]: /fr/logs/
[58]: /fr/integrations/google_cloud_private_service_connect/
[59]: https://cloud.google.com/vpc/docs/private-service-connect
[60]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[61]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[62]: https://app.datadoghq.com/event/overview
[63]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[66]: https://cloud.google.com/identity/docs/overview
[67]: https://docs.datadoghq.com/fr/logs/guide/google-cloud-log-forwarding
[68]: https://docs.datadoghq.com/fr/data_observability/quality_monitoring/data_warehouses/bigquery/