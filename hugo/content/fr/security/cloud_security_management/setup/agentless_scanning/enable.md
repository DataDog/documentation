---
aliases:
- /fr/security/cloud_security_management/setup/agentless_scanning/quick_start
- /fr/security/cloud_security_management/setup/agentless_scanning/cloudformation
- /fr/security/cloud_security_management/setup/agentless_scanning/terraform
- /fr/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
- /fr/security/cloud_security_management/guide/agentless_aws_integration
- /fr/security/cloud_security_management/guide/agentless_terraform
further_reading:
- link: /security/cloud_security_management/setup
  tag: Documentation
  text: Configuration de Cloud Security
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Cloud Security Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentation
  text: Mise à jour de Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentation
  text: Dépannage de l'analyse Agentless
title: Activation de Agentless Scanning
---
Agentless Scanning offre une visibilité sur les vulnérabilités qui existent au sein de votre infrastructure cloud, sans installer Datadog Agent. Agentless Scanning s'exécute entièrement au sein de votre infrastructure, en envoyant un minimum de données à Datadog et en laissant vos données sensibles dans votre environnement. Comme le scanner s'exécute dans votre compte cloud, les [coûts standard du fournisseur cloud][20] s'appliquent. Pour en savoir plus, consultez la [présentation d'Agentless Scanning][12].

La configuration prend environ 30 minutes par compte cloud :

1. Vérifiez les prérequis ci-dessous.
1. Choisissez votre fournisseur cloud et votre méthode de déploiement.
1. Lancez un modèle dans votre compte cloud.
1. Vérifiez les résultats de l'analyse dans Datadog.

## Prérequis {#prerequisites}

Avant de configurer Agentless Scanning, vérifiez que les prérequis suivants sont remplis :

- **Remote Configuration** : [Remote Configuration][3] doit être activée sur votre organisation Datadog pour envoyer des instructions d'analyse aux scanners Agentless.
- **[Clés d'API et d'application][1]** :
  - Une {{< ui >}}API key{{< /ui >}} avec Remote Configuration activée est requise pour que les scanners puissent envoyer les résultats d'analyse à Datadog.
  - Une {{< ui >}}Application key{{< /ui >}} avec des autorisations `Integrations Manage` ou `Org Management` est requise pour vous permettre d'activer les fonctionnalités d'analyse via la Datadog API.
- **Autorisations cloud** : L'instance Agentless Scanning nécessite des autorisations spécifiques pour analyser les hosts, les images de hosts, les registres de conteneurs et les fonctions. Datadog applique automatiquement ces autorisations, listées ci-dessous par souci de transparence, lors de l'installation.<br><br>
  {{< collapse-content title="Autorisations d'analyse AWS" level="h3" >}}
  <p>Autorisations d'analyse :</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeImages</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ecr:BatchGetImage</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>kms:CreateGrant</code></li>
    <li><code>kms:Decrypt</code></li>
    <li><code>kms:DescribeKey</code></li>
    <li><code>lambda:GetFunction</code></li>
    <li><code>lambda:GetLayerVersion</code></li>
  </ul>
  <p>Uniquement lorsque Sensitive Data Scanning (DSPM) est activée : </p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Autorisations d'analyse Azure" level="h3" >}}
  <ul>
    <li><code>Microsoft.Compute/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/disks/read</code></li>
    <li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
    <li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
    <li><code>Microsoft.Compute/galleries/images/versions/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/repositories/content/read</code> (action sur les données)</li>
    <li><code>Microsoft.Web/sites/read</code></li>
    <li><code>Microsoft.Web/sites/publish/Action</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Autorisations d'analyse GCP" level="h3" >}}
  <ul>
    <li><code>compute.disks.create</code></li>
    <li><code>compute.disks.createSnapshot</code></li>
    <li><code>compute.disks.delete</code></li>
    <li><code>compute.disks.get</code></li>
    <li><code>compute.disks.setLabels</code></li>
    <li><code>compute.disks.use</code></li>
    <li><code>compute.globalOperations.get</code></li>
    <li><code>compute.images.get</code></li>
    <li><code>compute.instances.attachDisk</code></li>
    <li><code>compute.instances.detachDisk</code></li>
    <li><code>compute.snapshots.create</code></li>
    <li><code>compute.snapshots.get</code></li>
    <li><code>compute.snapshots.list</code></li>
    <li><code>compute.snapshots.delete</code></li>
    <li><code>compute.snapshots.setLabels</code></li>
  </ul>
  {{< /collapse-content >}}

## Configuration {#setup}

Consultez [Déploiement d'Agentless Scanning][2] pour savoir comment structurer votre déploiement, notamment sur combien de comptes et de régions déployer les scanners.

Sélectionnez votre fournisseur cloud pour voir les méthodes de configuration disponibles. Si vous configurez Agentless Scanning auprès de plusieurs fournisseurs cloud, effectuez la configuration séparément pour chaque fournisseur.

{{< tabs >}}
{{% tab "AWS" %}}

### Choisissez votre méthode de configuration {#choose-your-setup}

- **Premiers pas avec Datadog** : sur la page [Introduction à Cloud Security][2], cliquez sur {{< ui >}}Get Started with Cloud Security{{< /ui >}}, puis sur {{< ui >}}Quick Start{{< /ui >}}. Quick Start est un flux de configuration guidé qui utilise AWS CloudFormation pour déployer Agentless Scanning avec toutes les fonctionnalités de Cloud Security préactivées. Cette option est uniquement disponible pour les organisations qui n'ont pas encore configuré Cloud Security Management.
- **Compte AWS unique dans Datadog** : utilisez [CloudFormation](#aws-cloudformation-setup) ou [Terraform](#aws-terraform-setup). Terraform est recommandé pour les déploiements multi-régions.
- **Organisation AWS avec plusieurs comptes** : utilisez [CloudFormation StackSet](#aws-cloudformation-stackset-setup) pour déployer les capacités d'analyse sur tous les comptes membres.
- **Comptes multiples sans AWS Organizations** : répétez la configuration [CloudFormation](#aws-cloudformation-setup) ou [Terraform](#aws-terraform-setup) pour chaque compte individuellement.

{{% collapse-content title="CloudFormation" level="h4" id="aws-cloudformation-setup" %}}
Utilisez CloudFormation si vous disposez déjà d'un compte AWS intégré à Datadog et souhaitez activer Agentless Scanning, ou si vous souhaitez ajouter un nouveau compte AWS.

#### Nouveau compte AWS {#new-aws-account}

1. Sur la page [Cloud Security Setup][1], cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. En bas de la section AWS, cliquez sur {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}. La boîte de dialogue {{< ui >}}Add New AWS Account(s){{< /ui >}} s'affiche.
1. Sélectionnez les options {{< ui >}}Add a Single AWS Account{{< /ui >}} et {{< ui >}}CloudFormation{{< /ui >}}.
1. Sélectionnez la région AWS dans laquelle vous souhaitez créer la pile CloudFormation.
1. Sélectionnez une clé d'API pour laquelle [Remote Configuration][3] est activée.
1. Choisissez si vous souhaitez activer {{< ui >}}Sensitive Data Scanner{{< /ui >}} pour le stockage cloud. Cela permet de cataloguer et de classer automatiquement les données sensibles dans les ressources Amazon S3.
1. Cliquez sur {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Une nouvelle fenêtre s'ouvre, affichant l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une pile. Le modèle inclut les autorisations IAM requises pour déployer et gérer les scanners Agentless.

#### Compte AWS existant {#existing-aws-account}

1. Sur la page [Cloud Security Setup][1], cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Cliquez sur le compte AWS sur lequel vous souhaitez déployer le scanner Agentless, ce qui ouvre le panneau latéral.
1. Dans l'onglet {{< ui >}}Features{{< /ui >}}, cliquez sur {{< ui >}}Configure Agentless Scanning{{< /ui >}} ou {{< ui >}}Manage{{< /ui >}} pour ouvrir la fenêtre modale de configuration d'Agentless Scanning.
1. Dans la section {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, sélectionnez {{< ui >}}CloudFormation{{< /ui >}}.
1. Sélectionnez la région AWS qui correspond à la pile CloudFormation.
1. Sélectionnez une clé d'API pour laquelle [Remote Configuration][3] est activée.
1. Copiez la nouvelle clé d'application générée par Datadog.
1. Choisissez l'une des options suivantes :
   - Utilisez un scanner existant, puis sélectionnez le scanner que vous souhaitez utiliser.
   - Déployez un nouveau scanner.
1. Activez les fonctionnalités que vous souhaitez utiliser, telles que {{< ui >}}Agentless Vulnerability Management{{< /ui >}} ou {{< ui >}}Sensitive Data Scanning for Cloud Storage{{< /ui >}}.
1. Cliquez sur {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Une nouvelle fenêtre s'ouvre, affichant l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une pile.
1. Cliquez sur {{< ui >}}Done{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /fr/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet (Multi-compte)" level="h4" id="aws-cloudformation-stackset-setup" %}}

Pour les organisations AWS avec plusieurs comptes, utilisez un CloudFormation StackSet pour déployer le rôle de délégué de l'analyse Agentless sur tous les comptes membres. Cette approche automatise l'intégration et configure les nouveaux comptes ajoutés à votre organisation AWS.

Cette configuration déploie le rôle de délégué requis pour [l'analyse inter-comptes](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) dans votre organisation AWS ou des unités d'organisation (UO) spécifiques. Tout d'abord, configurez l'analyse Agentless dans votre compte d'analyse central à l'aide de [CloudFormation](#aws-cloudformation-setup) ou [Terraform](#aws-terraform-setup), puis déployez le StackSet pour configurer les comptes restants.

#### Prérequis {#prerequisites-1}

- Accès au compte de gestion AWS
- [Trusted Access avec AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) doit être activé pour les CloudFormation StackSets
- Analyse Agentless déjà configurée dans votre compte d'analyse central ([voir ci-dessus](#aws-cloudformation-setup))

#### Déployez le StackSet {#deploy-the-stackset}

1. Connectez-vous à votre compte de gestion AWS et accédez à {{< ui >}}CloudFormation{{< /ui >}} > {{< ui >}}StackSets{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create StackSet{{< /ui >}}.
1. Sélectionnez {{< ui >}}Service-managed permissions{{< /ui >}}.
1. Sous {{< ui >}}Specify template{{< /ui >}}, sélectionnez {{< ui >}}Amazon S3 URL{{< /ui >}} et saisissez l'URL suivante :
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.22.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. Saisissez un {{< ui >}}StackSet name{{< /ui >}} (par exemple, `DatadogAgentlessScanningStackSet`).
1. Configurez le paramètre {{< ui >}}ScannerInstanceRoleARN{{< /ui >}}, qui est l'ARN du rôle IAM attaché à vos instances de scanner Agentless.
      <div class="alert alert-danger">La <code>ScannerInstanceRoleARN</code> doit être l'ARN exact du rôle de l'instance de scanner (par exemple, <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>). L'utilisation d'un ARN racine tel que <code>arn:aws:iam::123456789012:root</code> ne fonctionne pas.</div>
      <p>Le <code>ScannerInstanceRoleARN</code> établit une relation d'approbation entre le rôle délégué (créé dans les comptes cibles) et vos instances de scanner (déjà en cours d'exécution dans le compte central). Cela permet une analyse inter-comptes où :</p>
      <ul>
        <li>Le scanner s'exécute dans le compte 4.</li>
        <li>Le rôle délégué existe dans les comptes 1, 2, 3 (déployé via le StackSet).</li>
        <li>Le scanner assume les rôles délégués pour analyser les ressources dans ces comptes.</li>
      </ul>
1. Définissez {{< ui >}}Deployment targets{{< /ui >}} pour déployer sur l'ensemble de votre organisation AWS ou sur des unités d'organisation spécifiques.
1. Activez {{< ui >}}Automatic deployment{{< /ui >}} pour configurer les nouveaux comptes ajoutés à votre organisation AWS.
1. Sélectionnez une seule région pour le déploiement (le rôle IAM est global et ne doit être déployé qu'une seule fois par compte).
1. Examinez et soumettez le StackSet.

Une fois le StackSet déployé, les comptes membres sont configurés pour autoriser l'analyse inter-comptes depuis votre compte de scanner central.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="aws-terraform-setup" %}}

Le [module Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) fournit une configuration réutilisable pour installer le scanner Datadog Agentless. Terraform est la méthode de déploiement recommandée pour les environnements multi-régions. Il déploie un scanner par région, ce qui évite les coûts de mise en réseau inter-régions. Pour obtenir des conseils sur le choix de votre topologie de déploiement, consultez [Déploiement de l'analyse Agentless](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Pour des exemples d'utilisation incluant des configurations multi-régions, consultez le [répertoire d'exemples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) dans le dépôt GitHub.

#### Nouveau compte AWS {#new-aws-account-1}

1. Sur la page [Cloud Security Setup][1], cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. En bas de la section AWS, cliquez sur {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}. La boîte de dialogue {{< ui >}}Add New AWS Account(s){{< /ui >}} s'affiche.
1. Sélectionnez les options {{< ui >}}Add a Single AWS Account{{< /ui >}} et {{< ui >}}Manually{{< /ui >}}.
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cochez la case {{< ui >}}I confirm that the Datadog IAM Role has been added to the AWS Account{{< /ui >}}.
1. Saisissez {{< ui >}}AWS Account ID{{< /ui >}} et {{< ui >}}AWS Role Name{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

#### Compte AWS existant {#existing-aws-account-1}

1. Sur la page [Cloud Security Setup][1], cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Cliquez sur le compte AWS sur lequel vous souhaitez déployer le scanner Agentless pour ouvrir le panneau latéral.
1. Dans l'onglet {{< ui >}}Features{{< /ui >}}, cliquez sur {{< ui >}}Configure Agentless Scanning{{< /ui >}} ou {{< ui >}}Manage{{< /ui >}} pour ouvrir la fenêtre modale de configuration de l'analyse Agentless.
1. Dans la section {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, sélectionnez {{< ui >}}Terraform{{< /ui >}}.
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cochez la case {{< ui >}}I confirm the Datadog Agentless Scanner was installed using Terraform{{< /ui >}}.
1. Cliquez sur {{< ui >}}Done{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

Une fois l'une des méthodes de configuration ci-dessus terminée, [vérifiez votre configuration](#verify-your-setup).

[2]: https://app.datadoghq.com/security/csm/
[3]: /fr/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### Choisissez votre configuration {#choose-your-setup-1}

- **Nouveau client Azure** : Configurez d'abord l'[intégration Datadog Azure](https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure), puis activez l'analyse Agentless.
- **Abonnement Azure intégré existant** : Utilisez [Cloud Shell](#azure-cloud-shell-setup) (recommandé), [Azure Resource Manager](#azure-resource-manager-setup) ou [Terraform](#azure-terraform-setup).
- **Abonnements multiples** : Utilisez [Cloud Shell](#azure-cloud-shell-setup) pour des déploiements répétables sur plusieurs abonnements. [Terraform](#azure-terraform-setup) est également disponible si vous préférez gérer votre propre infrastructure en tant que code.

<div class="alert alert-info">Si vous n'avez pas encore connecté votre abonnement Azure à Datadog, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure">configurez d'abord l'intégration Azure</a>.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="azure-cloud-shell-setup" %}}
Utilisez Azure Cloud Shell pour configurer l'analyse Agentless pour vos abonnements Azure. Cette méthode télécharge un [script de configuration](https://github.com/DataDog/integrations-management/tree/main/azure/agentless) qui enveloppe le [module Terraform Datadog Agentless Scanner pour Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme), vous n'avez donc pas besoin de gérer Terraform directement. Vous pouvez examiner le script avant de l'exécuter.

1. Assurez-vous que l'identité que vous utilisez dans Cloud Shell dispose des autorisations Azure requises :

   - Sur l'**abonnement du scanner**, l'identité doit disposer d'un rôle autorisant l'écriture des attributions de rôles et la création de ressources, tel que **Owner**.
   - Sur **chaque abonnement analysé**, l'identité doit disposer d'un rôle accordant l'autorisation `Microsoft.Authorization/roleAssignments/write`, afin que l'identité gérée du scanner puisse recevoir les autorisations nécessaires pour créer des instantanés et lire les disques, tel que **User Access Administrator** ou **Owner**.

   Avant d'exécuter la commande générée, notez ce que fait le script de configuration dans Azure :

   - **État Terraform** : Par défaut, il crée un compte de stockage Azure dans l'abonnement **scanner**. Pour réutiliser un compte de stockage existant dans le groupe de ressources du scanner à la place, définissez `TF_STATE_STORAGE_ACCOUNT` avant d'exécuter la commande ; le script ne crée pas de nouveau compte lorsque cette variable est définie.
   - **Fournisseurs de ressources** : Lorsque cela est possible, il enregistre ces fournisseurs de ressources dans l'abonnement du scanner : `Microsoft.Compute`, `Microsoft.Network`, `Microsoft.ManagedIdentity`, `Microsoft.Storage`, `Microsoft.KeyVault`, `Microsoft.Authorization`.
1. Sur la page [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Cliquez sur l'abonnement Azure où vous souhaitez déployer le scanner Agentless, ce qui ouvre le panneau latéral.
1. Sur l'onglet {{< ui >}}Features{{< /ui >}}, cliquez sur {{< ui >}}Configure Agentless Scanning{{< /ui >}} ou {{< ui >}}Manage{{< /ui >}} pour ouvrir la fenêtre modale Agentless Scanning Setup.
1. Dans la section {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, sélectionnez {{< ui >}}Cloud Shell{{< /ui >}}.
1. Sélectionnez un {{< ui >}}API key{{< /ui >}} pour lequel [Remote Configuration](/remote_configuration) est activé. Une clé d'application est générée automatiquement.
1. Sélectionnez le {{< ui >}}Azure subscriptions{{< /ui >}} que vous souhaitez analyser.
1. Configurez le scanner :
   - Si vous avez déjà des scanners déployés, vous pouvez choisir de {{< ui >}}use an existing scanner{{< /ui >}} (recommandé) ou {{< ui >}}deploy a new scanner{{< /ui >}}.
   - Si vous choisissez {{< ui >}}deploy a new scanner{{< /ui >}}, sélectionnez l'{{< ui >}}scanner subscription{{< /ui >}} (qui doit être l'un des abonnements sélectionnés) et la {{< ui >}}scanner locations{{< /ui >}} (régions Azure, jusqu'à quatre). Datadog recommande de déployer des scanners dans chaque région où vous avez plus de 150 hôtes.
1. Cliquez sur {{< ui >}}Copy command{{< /ui >}} pour copier la commande générée, puis cliquez sur {{< ui >}}Open Azure Cloud Shell{{< /ui >}} pour ouvrir [Azure Cloud Shell](https://shell.azure.com). Examinez et exécutez la commande. Le script applique le [Terraform Datadog Agentless Scanner module for Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme) afin de déployer et de configurer le scanner dans l'abonnement et les emplacements sélectionnés.
1. Une fois la commande terminée, revenez à la page de configuration Datadog et cliquez sur {{< ui >}}Done{{< /ui >}}.
{{% /collapse-content %}}
{{% collapse-content title="Azure Resource Manager" level="h4" id="azure-resource-manager-setup" %}}
Utilisez le modèle Azure Resource Manager pour déployer Agentless Scanner. Le modèle inclut les définitions de rôle requises pour déployer et gérer les scanners Agentless.

#### Nouvel abonnement Azure {#new-azure-subscription}

<div class="alert alert-info">Assurez-vous que <a href="/integrations/guide/azure-manual-setup/?tab=azurecli">l'intégration Datadog Azure</a> est configurée.</div>

{{% csm-agentless-azure-resource-manager %}}

#### Abonnement Azure existant {#existing-azure-subscription}

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="azure-terraform-setup" %}}

Le [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) fournit une configuration réutilisable pour installer le scanner Agentless de Datadog. Pour obtenir des conseils sur le choix de votre topologie de déploiement, consultez [Déploiement d'Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Pour des exemples d'utilisation, consultez le [répertoire d'exemples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) dans le dépôt GitHub.

1. Sur la page [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Cliquez sur l'abonnement Azure où vous souhaitez déployer le scanner Agentless, ce qui ouvre le panneau latéral.
1. Sous l'onglet {{< ui >}}Features{{< /ui >}}, cliquez sur {{< ui >}}Configure Agentless Scanning{{< /ui >}} ou {{< ui >}}Manage{{< /ui >}} pour ouvrir la fenêtre modale Agentless Scanning Setup.
1. Dans la section {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, sélectionnez {{< ui >}}Terraform{{< /ui >}}.
1. Suivez les instructions pour installer le [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme).
1. Cliquez sur {{< ui >}}Done{{< /ui >}}.

{{% /collapse-content %}}

Une fois l'une des méthodes de configuration ci-dessus terminée, [vérifiez votre configuration](#verify-your-setup).

{{% /tab %}}

{{% tab "GCP" %}}

### Choisissez votre configuration {#choose-your-setup-2}

- **Nouveau client GCP** : [Configurez l'intégration GCP][25] d'abord, puis activez Agentless Scanning.
- **Projet GCP intégré existant** : Utilisez [Cloud Shell](#gcp-cloud-shell-setup) (recommandé) ou [Terraform](#gcp-terraform-setup).

<div class="alert alert-info">Si vous n'avez pas encore connecté votre projet GCP à Datadog, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">configurez d'abord l'intégration GCP</a>.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="gcp-cloud-shell-setup" %}}
Utilisez Google Cloud Shell pour configurer Agentless Scanning pour vos projets GCP. Cette méthode télécharge un [script d'installation](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) qui encapsule le [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) ; vous n'avez donc pas besoin de gérer Terraform directement. Vous pouvez examiner le script avant de l'exécuter.

1. Assurez-vous de disposer des autorisations GCP requises :

   - Sur le **projet de scanner**, l'identité que vous utilisez dans Cloud Shell doit disposer du rôle **Owner** ou d'un rôle équivalent.
   - **Stockage** : Incluez l'autorisation de créer un stockage d'état Terraform dans le projet de scanner, ou d'utiliser un bucket existant que vous référencez avec `TF_STATE_BUCKET` (par exemple, `roles/storage.admin`, ou les autorisations `storage.buckets.create`, `storage.buckets.get` et `storage.buckets.update`).

   Avant d'exécuter la commande générée, notez ce que le script d'installation effectue dans GCP :

   - **État Terraform** : Par défaut, il crée un bucket GCS dans le projet **scanner**. Pour réutiliser un bucket existant, définissez `TF_STATE_BUCKET` avant d'exécuter la commande ; le script ne crée pas de bucket lorsque cette variable est définie.
   - Si vous voyez une erreur 403 sur {{< ui >}}Setting up Terraform state storage{{< /ui >}}, consultez [GCP : Échec de la création du bucket d'état][26] dans le guide de dépannage.

1. Sur la page [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Cliquez sur le projet GCP où vous souhaitez déployer le scanner Agentless, ce qui ouvre le panneau latéral.
1. Sous l'onglet {{< ui >}}Features{{< /ui >}}, cliquez sur {{< ui >}}Configure Agentless Scanning{{< /ui >}} ou {{< ui >}}Manage{{< /ui >}} pour ouvrir la fenêtre modale Agentless Scanning Setup.
1. Dans la section {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, sélectionnez {{< ui >}}Cloud Shell{{< /ui >}}.
1. Sélectionnez un {{< ui >}}API key{{< /ui >}} pour lequel [Remote Configuration](/remote_configuration) est activé. Une clé d'application est générée automatiquement.
1. Sélectionnez le {{< ui >}}GCP projects{{< /ui >}} que vous souhaitez analyser.
1. Configurez le scanner :
   - Si vous avez déjà des scanners déployés, vous pouvez choisir de {{< ui >}}use an existing scanner{{< /ui >}} (recommandé) ou {{< ui >}}deploy a new scanner{{< /ui >}}.
   - Si vous choisissez {{< ui >}}deploy a new scanner{{< /ui >}}, sélectionnez le {{< ui >}}scanner project{{< /ui >}} (qui doit être l'un des projets sélectionnés) et le {{< ui >}}scanner regions{{< /ui >}}. Datadog recommande d'installer des scanners dans chaque région où vous avez plus de 150 hôtes.
1. Cliquez sur {{< ui >}}Copy command{{< /ui >}} pour copier la commande générée, puis cliquez sur {{< ui >}}Open Google Cloud Shell{{< /ui >}} pour ouvrir [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell). Examinez et exécutez la commande. Le script applique le [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) afin de déployer et de configurer le scanner dans le projet et la ou les régions sélectionnés.
1. Une fois la commande terminée, revenez à la page de configuration de Datadog et cliquez sur {{< ui >}}Done{{< /ui >}}.

[26]: /fr/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="gcp-terraform-setup" %}}
Le [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) fournit une configuration réutilisable pour installer le scanner Agentless de Datadog. Pour obtenir des conseils sur le choix de votre topologie de déploiement, consultez [Déploiement d'Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Pour des exemples d'utilisation, consultez le [répertoire d'exemples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) dans le dépôt GitHub.

1. Sur la page [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Cliquez sur le projet GCP où vous souhaitez déployer le scanner Agentless, ce qui ouvre le panneau latéral.
1. Sous l'onglet {{< ui >}}Features{{< /ui >}}, cliquez sur {{< ui >}}Configure Agentless Scanning{{< /ui >}} ou {{< ui >}}Manage{{< /ui >}} pour ouvrir la fenêtre modale Agentless Scanning Setup.
1. Dans la section {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}}, sélectionnez {{< ui >}}Terraform{{< /ui >}}.
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme).
1. Cliquez sur {{< ui >}}Done{{< /ui >}}.
{{% /collapse-content %}}

Une fois l'une des méthodes de configuration ci-dessus terminée, [vérifiez votre configuration](#verify-your-setup).

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp

{{% /tab %}}
{{< /tabs >}}

## Vérifiez votre configuration {#verify-your-setup}

Une fois la configuration terminée, Agentless Scanning met du temps à produire les premiers résultats. Le premier cycle d'analyse prend environ 30 minutes.

<div class="alert alert-info">Si aucun résultat n'apparaît après deux heures, consultez le <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">guide de dépannage d'Agentless Scanning</a>.</div>

Consultez les résultats de l'analyse aux emplacements suivants :

- **Pour les vulnérabilités des hosts et des conteneurs** : [Cloud Security Vulnerabilities Explorer][15]. Pour afficher uniquement les vulnérabilités détectées par Agentless Scanning, utilisez le filtre `origin:"Agentless scanner"` dans la barre de recherche.
- **Pour les vulnérabilités Lambda** : [Code Security (SCA) Explorer][16].
- **Pour les résultats concernant les données sensibles** : [Sensitive Data Scanner][17].

## Exclure des ressources des analyses {#exclude-resources-from-scans}

Pour exclure des hosts, conteneurs ou fonctions spécifiques des analyses, consultez [Resource Evaluation Filters](/security/cloud_security_management/guide/resource_evaluation_filters).

## Désactiver Agentless Scanning {#disable-agentless-scanning}

{{< tabs >}}
{{% tab "AWS" %}}
1. Sur la page [Cloud Security Setup][10], cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Si nécessaire, utilisez des filtres pour trouver le compte pour lequel vous souhaitez arrêter Agentless Scanning. Cliquez sur le compte pour ouvrir le panneau latéral contenant ses paramètres.
1. Sous l'onglet {{< ui >}}Features{{< /ui >}}, dans {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}}, basculez les commutateurs sur la position désactivée.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. Sur la page [Cloud Security Setup][10], cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Développez le locataire contenant l'abonnement pour lequel vous souhaitez désactiver Agentless Scanning. Cliquez sur l'abonnement pour ouvrir le panneau latéral contenant ses paramètres.
1. Sous l'onglet {{< ui >}}Features{{< /ui >}}, dans {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}}, basculez les commutateurs sur la position désactivée.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. Sur la page [Cloud Security Setup][10], cliquez sur {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Développez le compte contenant le projet pour lequel vous souhaitez désactiver Agentless Scanning. Cliquez sur le projet pour ouvrir le panneau latéral contenant ses paramètres.
1. Sous l'onglet {{< ui >}}Features{{< /ui >}}, dans {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}}, basculez les commutateurs sur la position désactivée.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Désinstaller Agentless Scanning {#uninstall-agentless-scanning}

Sélectionnez la méthode de déploiement que vous avez utilisée pour installer Agentless Scanning :

{{< tabs >}}
{{% tab "Terraform" %}}
Pour désinstaller Agentless Scanning, supprimez le module de scanner de votre code Terraform. Pour plus d'informations, consultez la documentation du [module Terraform][9].

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Pour désinstaller Agentless Scanning, connectez-vous à votre console AWS et supprimez la pile CloudFormation créée pour Agentless Scanning (le nom de la sous-pile suit le modèle `DatadogIntegration-DatadogAgentlessScanning-...`).
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Pour désinstaller Agentless Scanning configuré à l'aide de Google Cloud Shell, exécutez la même commande de configuration que celle utilisée lors de l'installation, en remplaçant `deploy` par `destroy` à la fin. Par exemple :

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o gcp_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_PROJECT="<SCANNER_PROJECT>" \
SCANNER_REGIONS="<SCANNER_REGIONS>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

Vous pouvez examiner le [code source du script d'installation][21] avant d'exécuter la commande.

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Cloud Shell" %}}
Pour désinstaller Agentless Scanning configuré à l'aide d'Azure Cloud Shell, exécutez la même commande de configuration que celle utilisée lors de l'installation, en remplaçant `deploy` par `destroy` à la fin. Par exemple :

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o azure_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_SUBSCRIPTION="<SCANNER_SUBSCRIPTION>" \
python3 azure_agentless_setup.pyz destroy
```

La commande de destruction exécute `terraform destroy`, désactive les options de scan d'Agentless Scanning dans Datadog pour chaque abonnement précédemment configuré et demande confirmation avant de supprimer le Key Vault qui contient la clé d'API. Le groupe de ressources et le compte de stockage d'état Terraform sont conservés par défaut ; le script affiche les instructions de suppression manuelle pour ceux-ci.

Vous pouvez examiner le [code source du script d'installation][22] avant d'exécuter la commande.

[22]: https://github.com/DataDog/integrations-management/tree/main/azure/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Pour désinstaller Agentless Scanning, connectez-vous à votre abonnement Azure. Si vous avez créé un groupe de ressources dédié pour le scanner Agentless, supprimez ce groupe de ressources ainsi que les définitions de rôle Azure suivantes :
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

Si vous n'avez pas utilisé de groupe de ressources dédié, vous devez supprimer manuellement les ressources du scanner, qui peuvent être identifiées par les balises `Datadog:true` et `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/
[2]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /fr/remote_configuration
[12]: /fr/security/cloud_security_management/agentless_scanning
[20]: /fr/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage