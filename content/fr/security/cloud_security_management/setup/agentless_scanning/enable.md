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
  text: Configurer Cloud Security
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Agentless Scanning Cloud Security
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentation
  text: Mise à jour d'Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentation
  text: Dépannage d'Agentless Scanning
title: Activer Agentless Scanning
---

Agentless Scanning offre une visibilité sur les vulnérabilités présentes dans votre infrastructure cloud, sans installer l'Agent Datadog. Agentless Scanning s'exécute entièrement dans votre infrastructure, envoie un minimum de données à Datadog et laisse vos données sensibles dans votre environnement. Le scanner s'exécutant dans votre compte cloud, les [coûts standard du fournisseur cloud][20] s'appliquent. Pour en savoir plus, consultez la section [Présentation d'Agentless Scanning][12].

La configuration prend environ 30 minutes par compte cloud :

1. Vérifiez les prérequis ci-dessous.
1. Choisissez votre fournisseur cloud et votre méthode de déploiement.
1. Lancez un modèle dans votre compte cloud.
1. Vérifiez les résultats du scan dans Datadog.

## Prérequis

Avant de configurer Agentless Scanning, vérifiez que les prérequis suivants sont satisfaits :

- **Configuration à distance** : la [configuration à distance][3] doit être activée sur votre organisation Datadog pour envoyer des instructions de scan aux scanners Agentless.
- **[Clés d'API et d'application][1]** :
  - Une **clé d'API** avec la configuration à distance activée est requise pour que les scanners puissent transmettre les résultats des scans à Datadog.
  - Une **clé d'application** avec les autorisations **Integrations Manage** ou **Org Management** est requise pour activer les fonctionnalités de scan via l'API Datadog.
- **Autorisations cloud** : l'instance Agentless Scanning nécessite des autorisations spécifiques pour scanner les hosts, les images de host, les registres de conteneur et les fonctions. Datadog applique automatiquement ces autorisations, listées ci-dessous à titre informatif, lors de l'installation.<br><br>
  {{< collapse-content title="Autorisations de scanning AWS" level="h5" >}}
  <p>Autorisations de scanning :</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ecr:BatchGetImage</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>kms:CreateGrant</code></li>
    <li><code>kms:Décryptage</code></li>
    <li><code>kms:DescribeKey</code></li>
    <li><code>lambda:GetFunction</code></li>
    <li><code>lambda:GetLayerVersion</code></li>
  </ul>
  <p>Uniquement lorsque le Sensitive Data Scanner (DSPM) est activé :</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Autorisations de scanning Azure" level="h5" >}}
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
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li> 
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Autorisations de scanning GCP" level="h5" >}}
  <ul>
    <li><code>compute.disks.create</code></li>
    <li><code>compute.disks.createSnapshot</code></li>
    <li><code>compute.disks.delete</code></li>
    <li><code>compute.disks.get</code></li>
    <li><code>compute.disks.setLabels</code></li>
    <li><code>compute.disks.use</code></li>
    <li><code>compute.globalOperations.get</code></li>
    <li><code>calculer.images.obtenir</code></li>
    <li><code>compute.instances.attachDisk</code></li>
    <li><code>compute.instances.detachDisk</code></li>
    <li><code>compute.snapshots.create</code></li>
    <li><code>compute.snapshots.get</code></li>
    <li><code>compute.snapshots.list</code></li>
    <li><code>compute.snapshots.delete</code></li>
    <li><code>compute.snapshots.setLabels</code></li>
  </ul>
  {{< /collapse-content >}}

## Configuration

Consultez la section [Déployer Agentless Scanning][2] pour obtenir des informations sur la structure de votre déploiement, notamment le nombre de comptes et de régions dans lesquels déployer des scanners.

Sélectionnez votre fournisseur cloud pour afficher les méthodes de configuration disponibles. Si vous configurez Agentless Scanning pour plusieurs fournisseurs cloud, effectuez la configuration de chaque fournisseur séparément.

{{< tabs >}}
{{% tab "AWS" %}}

### Choisir votre configuration

- **Nouvel utilisateur Datadog** : sur la page [Intro to Cloud Security][2], cliquez sur **Get Started with Cloud Security**, puis sur **Quick Start**. Quick Start est un flux de configuration guidée qui utilise AWS CloudFormation pour déployer Agentless Scanning avec toutes les fonctionnalités Cloud Security préactivées. Cette option est uniquement disponible pour les organisations n'ayant pas encore configuré Cloud Security Management.
- **Compte AWS unique dans Datadog** : utilisez [CloudFormation](#configuration-aws-cloudformation) ou [Terraform](#configuration-aws-terraform). Terraform est recommandé pour les déploiements multi-régions.
- **Organisation AWS avec plusieurs comptes** : utilisez [CloudFormation StackSet](#configuration-aws-cloudformation-stackset) pour déployer les capacités de scan dans tous les comptes membres.
- **Plusieurs comptes sans AWS Organizations** : répétez la configuration [CloudFormation](#configuration-aws-cloudformation) ou [Terraform](#configuration-aws-terraform) pour chaque compte individuellement.

{{% collapse-content title="CloudFormation" level="h3" id="aws-cloudformation-setup" %}}
Utilisez CloudFormation si vous disposez déjà d'un compte AWS intégré à Datadog et souhaitez activer Agentless Scanning, ou si vous souhaitez ajouter un nouveau compte AWS.

#### Nouveau compte AWS 

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations** > **AWS**.
1. En bas de la section AWS, cliquez sur **Add AWS accounts by following these steps**. La boîte de dialogue **Add New AWS Account(s)** s'affiche.
1. Sélectionnez la région AWS où vous souhaitez créer la stack CloudFormation.
1. Sélectionnez une clé d'API pour laquelle la [configuration à distance][3] est activée.
1. Choisissez d'activer ou non le **Sensitive Data Scanner** pour le stockage cloud. Cela catalogue et classifie automatiquement les données sensibles dans les ressources Amazon S3.
1. Cliquez sur **Launch CloudFormation Template**. Une nouvelle fenêtre s'ouvre, affichant l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une stack. Le modèle inclut les autorisations IAM requises pour déployer et gérer les scanners sans Agent.

#### Compte AWS existant

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations** > **AWS**.
1. Cliquez sur le compte AWS dans lequel vous souhaitez déployer le scanner Agentless, ce qui ouvre le volet latéral.
1. Sur l'onglet **Features**, cliquez sur **Configure Agentless Scanning** ou **Manage** pour ouvrir la fenêtre de configuration d'Agentless Scanning.
1. Dans la section **How would you like to set up Agentless Scanning?**, sélectionnez **CloudFormation**.
1. Sélectionnez une clé d'API pour laquelle la [configuration à distance][3] est activée.
1. Activez les fonctionnalités souhaitées, telles que **Vulnerability Management** ou **Sensitive Data Scanner**.
1. Cliquez sur **Launch CloudFormation Template**. Une nouvelle fenêtre s'ouvre, affichant l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une stack.
1. Cliquez sur **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /fr/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet (Multi-Account)" level="h3" id="aws-cloudformation-stackset-setup" %}}

Pour les organisations AWS avec plusieurs comptes, utilisez un CloudFormation StackSet pour déployer le rôle délégué Agentless Scanning dans tous les comptes membres. Cette approche automatise l'intégration et configure les nouveaux comptes ajoutés à votre organisation AWS.

Cette configuration déploie le rôle délégué requis pour le [scan inter-comptes](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) dans votre organisation AWS ou des unités organisationnelles (OU) spécifiques. Commencez par configurer Agentless Scanning dans votre compte de scan central à l'aide de [CloudFormation](#configuration-aws-cloudformation) ou de [Terraform](#configuration-aws-terraform), puis déployez le StackSet pour configurer les comptes restants.

#### Prérequis

1. Accès au compte de gestion AWS.
1. [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) doit être activé pour les CloudFormation StackSets.
1. Agentless Scanning est déjà configuré dans votre compte de scan central (voir ci-dessus).

#### Déployer le StackSet

1. Connectez-vous à votre compte de gestion AWS et accédez à **CloudFormation > StackSets**.
1. Cliquez sur **Create StackSet**.
1. Sélectionnez **Service-managed permissions**.
1. Sous **Specify template**, sélectionnez **Amazon S3 URL** et saisissez l'URL suivante :
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.3.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. Saisissez un **StackSet name** (par exemple, `DatadogAgentlessScanningStackSet`).
1. Configurez le paramètre **ScannerInstanceRoleARN**, qui correspond à l'ARN du rôle IAM associé à vos instances de scanner Agentless.
      <div class="alert alert-danger">Le <code>ScannerInstanceRoleARN</code> doit être l'ARN exact du rôle d'instance de scanner (par exemple, <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>). L'utilisation d'un ARN racine tel que <code>arn:aws:iam::123456789012:root</code> ne fonctionne pas.</div> 
      <p>Le <code>ScannerInstanceRoleARN</code> établit une relation d'approbation entre le rôle délégué (créé dans les comptes cibles) et vos instances de scanner (déjà en cours d'exécution dans le compte central). Cela permet le scan inter-comptes dans lequel :</p> 
      <ul>
        <li>The scanner runs in Account 4.</li>
        <li>The delegate role exists in Accounts 1, 2, 3 (deployed through the StackSet).</li>
        <li>The scanner assumes the delegate roles to scan resources in those accounts.</li>
      </ul>
1. Définissez les **Deployment targets** pour un déploiement dans votre organisation AWS ou des OU spécifiques.
1. Activez **Automatic deployment** pour configurer les nouveaux comptes ajoutés à votre organisation AWS.
1. Sélectionnez une **seule région** pour le déploiement (le rôle IAM est global et ne doit être déployé qu'une seule fois par compte).
1. Vérifiez et soumettez le StackSet.

Une fois le StackSet déployé, les comptes membres sont configurés pour autoriser le scan inter-comptes depuis votre compte de scanner central. 
{{% /collapse-content %}}
{{% collapse-content title= "Terraform" level="h3" id="aws-terraform-setup" %}}

Le [module Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) fournit une configuration réutilisable pour l'installation du scanner Agentless Datadog. Terraform est la méthode de déploiement recommandée pour les environnements multi-régions. Il déploie un scanner par région, ce qui évite les coûts réseau inter-régions. Pour obtenir des conseils sur le choix de votre topologie de déploiement, consultez la section [Déployer Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Pour des exemples d'utilisation incluant des configurations multi-régions, consultez le [répertoire examples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) dans le référentiel GitHub.

#### Nouveau compte AWS 

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations** > **AWS**.
1. En bas de la section AWS, cliquez sur **Add AWS accounts by following these steps**. La boîte de dialogue **Add New AWS Account(s)** s'affiche.
1. Sous **Choose a method for adding your AWS account**, sélectionnez **Manually**.
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cochez la case **I confirm that the Datadog IAM Role has been added to the AWS Account**.
1. Saisissez l'**AWS Account ID** et l'**AWS Role Name**.
1. Cliquez sur **Save**.

#### Compte AWS existant

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations** > **AWS**.
1. Cliquez sur le compte AWS dans lequel vous souhaitez déployer le scanner Agentless pour ouvrir le volet latéral.
1. Sur l'onglet **Features**, cliquez sur **Configure Agentless Scanning** ou **Manage** pour ouvrir la fenêtre de configuration d'Agentless Scanning.
1. Dans la section **How would you like to set up Agentless Scanning?**, sélectionnez **Terraform**. 
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cochez la case **I confirm the Terraform module is installed**.
1. Cliquez sur **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

Après avoir suivi l'une des méthodes de configuration ci-dessus, [vérifiez votre configuration](#verifier-votre-configuration).

[2]: https://app.datadoghq.com/security/csm/
[3]: /fr/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### Choisir votre configuration
- **Nouvel abonnement Azure** : utilisez [Azure Resource Manager](#configuration-azure-resource-manager) (recommandé) ou [Terraform](#configuration-azure-terraform).
- **Abonnement Azure existant** : utilisez [Azure Resource Manager](#configuration-azure-resource-manager) ou [Terraform](#configuration-azure-terraform).
- **Plusieurs abonnements** : utilisez [Terraform](#configuration-azure-terraform) pour des déploiements reproductibles sur plusieurs abonnements.

{{% collapse-content title="Azure Resource Manager" level="h3" id="azure-resource-manager-setup" %}}
Utilisez le modèle Azure Resource Manager pour déployer le scanner Agentless. Le modèle inclut les définitions de rôles requises pour déployer et gérer les scanners Agentless.

#### Nouvel abonnement Azure

<div class="alert alert-info">Vérifiez que vous avez configuré l'<a href="/integrations/guide/azure-manual-setup/?tab=azurecli">intégration Azure Datadog</a>.</div>

{{% csm-agentless-azure-resource-manager %}}

#### Abonnement Azure existant

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="azure-terraform-setup" %}}

Le [module Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) fournit une configuration réutilisable pour l'installation du scanner Agentless Datadog. Pour obtenir des conseils sur le choix de votre topologie de déploiement, consultez la section [Déployer Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Pour des exemples d'utilisation, consultez le [répertoire examples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) dans le référentiel GitHub.

1. Sur la page [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), cliquez sur **Cloud Integrations** > **Azure**.
1. Développez le locataire contenant l'abonnement où vous souhaitez déployer le scanner sans Agent.
1. Cliquez sur le bouton **Enable** correspondant à l'abonnement Azure dans lequel vous souhaitez déployer le scanner Agentless.
1. Activez **Vulnerability Scanning**.
1. Dans la section **How would you like to set up Agentless Scanning?**, sélectionnez **Terraform**. 
1. Suivez les instructions d'installation du [module Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme).
1. Cliquez sur **Done**.

{{% /collapse-content %}}

Après avoir suivi l'une des méthodes de configuration ci-dessus, [vérifiez votre configuration](#verifier-votre-configuration).

{{% /tab %}}

{{% tab "GCP" %}}

### Choisir votre configuration

- **Nouveau client GCP** : [configurez l'intégration GCP][25] en premier, puis activez Agentless Scanning.
- **Projet GCP intégré existant** : utilisez [Cloud Shell](#configuration-gcp-cloud-shell) (recommandé) ou [Terraform](#configuration-gcp-terraform).

<div class="alert alert-info">Si vous n'avez pas encore connecté votre projet GCP à Datadog, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">configurez l'intégration GCP</a> en premier.</div>

{{% collapse-content title="Cloud Shell" level="h3" id="gcp-cloud-shell-setup" %}}
Utilisez Google Cloud Shell pour configurer Agentless Scanning pour vos projets GCP. Cette méthode télécharge un [script de configuration](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) qui encapsule le [module Terraform Datadog Agentless Scanner pour GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme), de sorte que vous n'avez pas besoin de gérer Terraform directement. Vous pouvez examiner le script avant de l'exécuter.

**Autorisations GCP requises :** l'identité que vous utilisez dans Cloud Shell doit disposer du rôle **Owner** ou équivalent sur le projet de scanner. Le script crée un bucket GCS pour l'état Terraform ; vous devez donc également disposer d'autorisations **Storage** sur ce projet (par exemple, `roles/storage.admin` ou `storage.buckets.create` / `storage.buckets.get` / `storage.buckets.update`). Vous pouvez également **réutiliser un bucket existant** pour l'état Terraform en définissant la variable d'environnement `TF_STATE_BUCKET` sur le nom d'un bucket existant ; dans ce cas, le script ne crée pas de bucket. Si vous obtenez une erreur 403 lors de l'étape "Setting up Terraform state storage", consultez la section [GCP : Échec de la création du bucket d'état][26] dans le guide de dépannage.

1. Sur la page [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), cliquez sur **Cloud Integrations** > **GCP**.
1. Développez le compte contenant le projet où vous souhaitez déployer le scanner sans Agent.
1. Cliquez sur le bouton **Enable** correspondant au projet GCP dans lequel vous souhaitez déployer le scanner Agentless. La fenêtre modale **Vulnerability Scanning** s'ouvre.
1. Dans la section **How would you like to set up Agentless Scanning?**, sélectionnez **Cloud Shell**.
1. Sélectionnez une **clé d'API** pour laquelle la [configuration à distance](/remote_configuration) est activée. Une clé d'application est générée automatiquement.
1. Sélectionnez les **projets GCP** à scanner.
1. Configurez le scanner :
   - Si des scanners sont déjà déployés, vous pouvez choisir d'**utiliser un scanner existant** (recommandé) ou de **déployer un nouveau scanner**.
   - Si vous déployez un nouveau scanner, sélectionnez le projet de scanner (qui doit faire partie des projets sélectionnés). Nous recommandons d'installer des scanners dans chaque région où vous avez plus de 150 hosts.
1. Cliquez sur **Copy command** pour copier la commande générée, puis sur **Open Google Cloud Shell** pour ouvrir [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell). Examinez et exécutez la commande. Le script applique le [module Terraform Datadog Agentless Scanner pour GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) pour déployer et configurer le scanner dans le projet et la ou les régions sélectionnés.
1. Une fois la commande terminée, revenez à la page de configuration Datadog et cliquez sur **Done**.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="gcp-terraform-setup" %}}
Le [module Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) fournit une configuration réutilisable pour l'installation du scanner Agentless Datadog. Pour obtenir des conseils sur le choix de votre topologie de déploiement, consultez la section [Déployer Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Pour des exemples d'utilisation, consultez le [répertoire examples](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) dans le référentiel GitHub. 

1. Sur la page [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), cliquez sur **Cloud Integrations** > **GCP**.
1. Développez le compte contenant le projet où vous souhaitez déployer le scanner sans Agent.
1. Cliquez sur le bouton **Enable** pour le projet GCP où vous souhaitez déployer le scanner sans Agent.
1. Activez **Vulnerability Scanning**.
1. Suivez les instructions d'installation du [module Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme).
1. Cliquez sur **Done**.
{{% /collapse-content %}}

Après avoir suivi l'une des méthodes de configuration ci-dessus, [vérifiez votre configuration](#verifier-votre-configuration).

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp
[26]: /fr/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403

{{% /tab %}}
{{< /tabs >}}

## Vérifier votre configuration

Après la configuration, Agentless Scanning prend un certain temps pour produire les premiers résultats. Le premier cycle de scan prend environ 30 minutes.

<div class="alert alert-info">Si aucun résultat n'apparaît après deux heures, consultez le <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">guide de dépannage d'Agentless Scanning</a>.</div>

Consultez les résultats de scan aux emplacements suivants :

- **Pour les vulnérabilités des hosts et des conteneurs** : [Cloud Security Vulnerabilities Explorer][15]. Pour afficher uniquement les vulnérabilités détectées par Agentless Scanning, utilisez le filtre `origin:"Agentless scanner"` dans la barre de recherche.
- **Pour les vulnérabilités Lambda** : [Code Security (SCA) Explorer][16].
- **Pour les résultats relatifs aux données sensibles** : [Sensitive Data Scanner][17].

## Exclure des ressources des scans

Pour exclure des hosts, conteneurs ou fonctions spécifiques des scans, consultez la section [Filtres d'évaluation des ressources](/security/cloud_security_management/guide/resource_evaluation_filters).

## Désactiver Agentless Scanning

{{< tabs >}}
{{% tab "AWS" %}}
1. Sur la page [Configuration de Cloud Security][10], cliquez sur **Cloud Integrations** > **AWS**.
1. Si nécessaire, utilisez des filtres pour trouver le compte pour lequel vous souhaitez arrêter Agentless Scanning. Cliquez sur le compte pour ouvrir le volet latéral contenant ses paramètres.
1. Sur l'onglet **Features**, cliquez sur **Configure Agentless Scanning** ou **Manage** pour ouvrir la fenêtre de configuration d'Agentless Scanning.
1. Sous **How would you like to set up Agentless Scanning?**, cliquez sur **Terraform**.
1. Sous **Enable Features**, à côté de **Enable Agentless Vulnerability management**, désactivez le bouton.
1. Cliquez sur **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. Sur la page [Configuration de Cloud Security][10], cliquez sur **Cloud Integrations** > **Azure**.
1. Localisez le locataire de votre abonnement, développez la liste des abonnements et identifiez l'abonnement pour lequel vous souhaitez désactiver Agentless Scanning.
1. À côté du libellé **Enabled**, cliquez sur le bouton **Edit** ({{< img src="security/csm/setup/edit-button.png" alt="Modifier" inline="true" style="width:24px;">}}) pour ouvrir la fenêtre modale Vulnerability Scanning.
1. À côté de **Vulnerability Scanning**, désactivez le bouton.
1. Cliquez sur **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. Sur la page [Configuration de Cloud Security][10], cliquez sur **Cloud Integrations** > **GCP**.
1. Développez le compte contenant le projet pour lequel vous souhaitez désactiver Agentless Scanning.
1. À côté du libellé **Enabled**, cliquez sur le bouton **Edit** ({{< img src="security/csm/setup/edit-button.png" alt="Modifier" inline="true" style="width:24px;">}}) pour ouvrir la fenêtre modale Vulnerability Scanning.
1. À côté de **Vulnerability Scanning**, désactivez le bouton.
1. Cliquez sur **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Désinstaller Agentless Scanning

Sélectionnez la méthode de déploiement utilisée pour installer Agentless Scanning :

{{< tabs >}}
{{% onglet "Terraform" %}}
Pour désinstaller Agentless Scanning, supprimez le module scanner de votre code Terraform. Pour plus d'informations, consultez la documentation du [module Terraform][9].

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% onglet "AWS CloudFormation" %}}
Pour désinstaller Agentless Scanning, connectez-vous à votre console AWS et supprimez la stack CloudFormation créée pour Agentless Scanning (le nom de la sous-stack suit le modèle `DatadogIntegration-DatadogAgentlessScanning-...`).
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Pour désinstaller Agentless Scanning configuré à l'aide de Google Cloud Shell, exécutez la même commande de configuration que celle utilisée lors de l'installation, en remplaçant `deploy` par `destroy` à la fin. Par exemple :

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

Vous pouvez consulter le [code source du script de configuration][21] avant d'exécuter la commande.

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Pour désinstaller Agentless Scanning, connectez-vous à votre abonnement Azure. Si vous avez créé un groupe de ressources dédié pour le scanner Agentless, supprimez ce groupe de ressources ainsi que les définitions de rôles Azure suivantes :
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

Si vous n'avez pas utilisé de groupe de ressources dédié, vous devez supprimer manuellement les ressources du scanner, qui peuvent être identifiées par les tags `Datadog:true` et `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/
[2]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /fr/remote_configuration
[12]: /fr/security/cloud_security_management/agentless_scanning
[20]: /fr/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage