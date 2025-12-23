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
  text: Scanning sans Agent Cloud Security
title: Activer le scanning sans Agent
---

Le scanning sans Agent offre une visibilité sur les vulnérabilités qui existent dans votre infrastructure cloud, sans nécessiter l'installation de l'Agent Datadog. Pour en savoir plus sur les capacités du scanning sans Agent et son fonctionnement, consultez la documentation sur le [scanning sans Agent][12].

## Prérequis

Avant de configurer le scanning sans Agent, assurez-vous que les prérequis suivants sont remplis :

- **Configuration à distance** : la [Configuration à distance][3] est requise pour permettre à Datadog d'envoyer des informations aux scanners sans Agent, telles que les ressources cloud à scanner.
- **Clés d'API et d'application** :
  - Une clé d'API avec la Configuration à distance activée est requise pour que les scanners signalent les résultats de scan à Datadog.
  - Une clé d'application avec les autorisations **Integrations Manage** ou **Org Management** est requise pour activer les fonctionnalités de scanning via l'API Datadog.
- **Autorisations cloud** : l'instance de scanning sans Agent nécessite des autorisations spécifiques pour scanner les hosts, les images de host, les registres de conteneurs et les fonctions. Ces autorisations sont automatiquement appliquées dans le cadre du processus d'installation et sont strictement limitées aux autorisations minimales requises pour effectuer les scans nécessaires, conformément au principe du moindre privilège.<br><br>
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

<div class="alert alert-danger">L'exécution des scanners sans Agent entraîne des coûts supplémentaires. Pour optimiser ces coûts tout en garantissant des scans fiables toutes les 12 heures, Datadog recommande de configurer le <a href="#terraform-setup">scanning sans Agent avec Terraform</a> comme modèle par défaut.</div>

Pour activer le scanning sans Agent, utilisez l'un des workflows suivants :

### Prise en main rapide

Conçu pour les nouveaux utilisateurs, le workflow de démarrage rapide offre un processus de configuration efficace pour Cloud Security, permettant une surveillance immédiate des ressources AWS. Il utilise AWS CloudFormation pour automatiser la configuration.

{{% collapse-content title="Guide de configuration du démarrage rapide" level="h4" id="quick-start-setup" %}} 
Conçu pour les nouveaux utilisateurs, le workflow de démarrage rapide offre un processus de configuration efficace pour Cloud Security, permettant une surveillance immédiate des ressources AWS. Il utilise AWS CloudFormation pour automatiser la configuration et inclut les fonctionnalités Cloud Security : Misconfigurations, Identity Risks (CIEM) et Vulnerability Management.

<div class="alert alert-info">Cet article fournit des instructions pour le workflow de démarrage rapide pour nouveaux utilisateurs qui utilise AWS CloudFormation pour configurer le scanning sans Agent.
Pour les utilisateurs existants qui souhaitent ajouter un nouveau compte AWS ou activer le scanning sans Agent sur un compte AWS intégré existant, consultez les instructions pour
<a href="#terraform-setup">Terraform</a> ou <a href="#aws-cloudformation-setup">AWS CloudFormation</a>.</div>

<div class="alert alert-danger">L'exécution des scanners sans Agent entraîne des coûts supplémentaires. Pour optimiser ces coûts tout en garantissant des scans fiables toutes les 12 heures, Datadog recommande de configurer le <a href="#terraform-setup">scanning sans Agent avec Terraform</a> comme modèle par défaut.</div>

<div class="alert alert-danger">Le Scanner de données sensibles pour le stockage cloud est en disponibilité limitée. <a href="https://www.datadoghq.com/private-beta/data-security">Demandez l'accès</a> pour vous inscrire.</div>

##### Installation

1. Sur la page [Introduction à Cloud Security][4], cliquez sur **Get Started with Cloud Security**.
1. Cliquez sur **Quick Start**. La page **Features** s'affiche, montrant les fonctionnalités incluses avec le démarrage rapide du scanning sans Agent.
1. Cliquez sur **Start Using Cloud Security** pour continuer.
1. Sélectionnez la région AWS où vous souhaitez créer la stack CloudFormation.
1. Sélectionnez une clé API déjà configurée pour la Configuration à distance. Si la clé API que vous sélectionnez n'a pas la Configuration à distance activée, la Configuration à distance est automatiquement activée pour cette clé lors de la sélection.
1. Choisissez d'activer ou non le **Sensitive Data Scanner** pour le stockage cloud. Cela catalogue et classifie automatiquement les données sensibles dans les ressources Amazon S3.
1. Cliquez sur **Launch CloudFormation Template**. Une nouvelle fenêtre s'ouvre, affichant l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une stack. Le modèle inclut les autorisations IAM requises pour déployer et gérer les scanners sans Agent.

##### Mettre à jour la stack CloudFormation

Datadog recommande de mettre à jour régulièrement la stack CloudFormation, afin d'avoir accès aux nouvelles fonctionnalités et corrections de bugs au fur et à mesure de leur publication. Pour ce faire, suivez ces étapes :
1. Connectez-vous à votre console AWS et accédez à la page CloudFormation Stacks.
2. Sélectionnez la sous-stack CloudFormation **DatadogIntegration-DatadogAgentlessScanning-...**, cliquez sur **Update**, puis cliquez sur **Update nested stack**.
3. Cliquez sur **Replace existing template**.
4. Dans l'URL S3 suivante : `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, remplacez `<VERSION>` par la version trouvée dans [aws_quickstart/version.txt][14]. Collez cette URL dans le champ **Amazon S3 URL**.
5. Cliquez sur **Next** pour avancer sur les pages suivantes sans les modifier, puis soumettez le formulaire.

{{% /collapse-content %}}

<br />

### Terraform

Le [module Terraform Datadog Agentless Scanner][6] fournit une configuration simple et réutilisable pour installer le scanner sans Agent Datadog pour AWS, Azure et GCP.

{{% collapse-content title="Guide de configuration Terraform" level="h4" id="terraform-setup" %}}
Si vous avez déjà [configuré Cloud Security][10] et souhaitez ajouter un nouveau compte cloud ou activer le [scanning sans Agent][1] sur un compte cloud intégré existant, vous pouvez utiliser Terraform, [AWS CloudFormation][2] ou [Azure Resource Manager][5]. Cet article fournit des instructions détaillées pour l'approche Terraform.

<div class="alert alert-info">Si vous configurez Cloud Security pour la première fois, vous pouvez suivre le <a href="#quick-start-setup">workflow de démarrage rapide</a>, qui utilise AWS CloudFormation pour activer le scanning sans Agent.</div>

{{< tabs >}}
{{% tab "New AWS account" %}}

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations > AWS**.
1. En bas de la section AWS, cliquez sur **Add AWS accounts by following these steps**. La boîte de dialogue **Add New AWS Account(s)** s'affiche.
1. Sous **Choose a method for adding your AWS account**, sélectionnez **Manually**.
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cochez la case **I confirm that the Datadog IAM Role has been added to the AWS Account**.
1. Saisissez l'**AWS Account ID** et l'**AWS Role Name**.
1. Cliquez sur **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations > AWS**.
1. Cliquez sur le bouton **Edit scanning** ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) pour le compte AWS où vous souhaitez déployer le scanner sans Agent.
1. **Enable Resource Scanning** devrait déjà être activé. Si ce n'est pas le cas, activez **Enable Resource Scanning**.
1. Dans la section **How would you like to set up Agentless Scanning?**, sélectionnez **Terraform**.
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cochez la case **I confirm the Terraform module is installed**.
1. Cliquez sur **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing Azure account" %}}

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations > Azure**.
1. Développez le locataire contenant l'abonnement où vous souhaitez déployer le scanner sans Agent.
1. Cliquez sur le bouton **Enable** pour le compte Azure où vous souhaitez déployer le scanner sans Agent.
1. Activez **Vulnerability Scanning**.
1. Dans la section **How would you like to set up Agentless Scanning?**, sélectionnez **Terraform**. 
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cliquez sur **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme

{{% /tab %}}

{{% tab "Existing GCP project" %}}

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations > GCP**.
1. Développez le compte contenant le projet où vous souhaitez déployer le scanner sans Agent.
1. Cliquez sur le bouton **Enable** pour le projet GCP où vous souhaitez déployer le scanner sans Agent.
1. Activez **Vulnerability Scanning**.
1. Suivez les instructions pour installer le [module Datadog Agentless Scanner][2].
1. Cliquez sur **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme

{{% /tab %}}
{{< /tabs >}}

##### Mettre à jour la version des modules Terraform

Mettez à jour la référence `source` pour les modules Agentless Scanner vers la dernière version. Vous pouvez trouver la dernière version sur [GitHub Releases](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases).

Pour des exemples d'utilisation, consultez notre [référentiel Github](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples).

[1]: /fr/security/cloud_security_management/agentless_scanning
[2]: #aws-cloudformation-setup
[5]: #azure-resource-manager-setup

{{% /collapse-content %}}

<br />

### AWS Cloudformation

Utilisez le modèle AWS CloudFormation pour créer une stack CloudFormation. Le modèle inclut les autorisations IAM requises pour déployer et gérer les scanners sans Agent.

{{% collapse-content title="Guide de configuration AWS CloudFormation" level="h4" id="aws-cloudformation-setup" %}}
Si vous avez déjà [configuré Cloud Security][10] et souhaitez ajouter un nouveau compte cloud ou activer le [scanning sans Agent][1] sur un compte AWS intégré existant, vous pouvez utiliser [Terraform][7] ou AWS CloudFormation. Cet article fournit des instructions détaillées pour l'approche AWS CloudFormation.

<div class="alert alert-info">Si vous configurez Cloud Security pour la première fois, vous pouvez suivre le <a href="#quick-start-setup">workflow de démarrage rapide</a>, qui utilise également AWS CloudFormation pour activer le scanning sans Agent.</div>

<div class="alert alert-danger">L'exécution des scanners sans Agent entraîne des coûts supplémentaires. Pour optimiser ces coûts tout en garantissant des scans fiables toutes les 12 heures, Datadog recommande de configurer le <a href="#terraform-setup">scanning sans Agent avec Terraform</a> comme modèle par défaut.</div>

<div class="alert alert-danger">Le Scanner de données sensibles pour le stockage cloud est en disponibilité limitée. <a href="https://www.datadoghq.com/private-beta/data-security">Demandez l'accès</a> pour vous inscrire.</div>

##### Configurer AWS CloudFormation

{{< tabs >}}
{{% tab "New AWS account" %}}

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations** > **AWS**.
1. En bas de la section AWS, cliquez sur **Add AWS accounts by following these steps**. La boîte de dialogue **Add New AWS Account(s)** s'affiche.
1. Sélectionnez la région AWS où vous souhaitez créer la stack CloudFormation.
1. Sélectionnez une clé API déjà configurée pour la Configuration à distance. Si la clé API que vous sélectionnez n'a pas la Configuration à distance activée, la Configuration à distance est automatiquement activée pour cette clé lors de la sélection.
1. Choisissez d'activer ou non le **Sensitive Data Scanner** pour le stockage cloud. Cela catalogue et classifie automatiquement les données sensibles dans les ressources Amazon S3.
1. Cliquez sur **Launch CloudFormation Template**. Une nouvelle fenêtre s'ouvre, affichant l'écran AWS CloudFormation. Utilisez le modèle CloudFormation fourni pour créer une stack. Le modèle inclut les autorisations IAM requises pour déployer et gérer les scanners sans Agent.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. Sur la page [Configuration de Cloud Security][1], cliquez sur **Cloud Integrations** > **AWS**.
1. Cliquez sur le bouton **Edit** ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) pour le compte AWS où vous souhaitez déployer le scanner sans Agent.
1. Vérifiez que **Enable Resource Scanning** est activé. Si ce n'est pas le cas, activez **Enable Resource Scanning** et suivez les étapes 3 à 7 dans [Nouveau compte AWS][2].
1. Dans la section **Agentless Scanning**, activez **Enable Vulnerability Management (Host, Container and Lambda)**.
1. Choisissez d'activer ou non **Enable Sensitive Data Scanner for Cloud Storage**. Cela catalogue et classifie automatiquement les données sensibles dans les ressources Amazon S3.
1. Cliquez sur **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: /fr/security/cloud_security_management/setup/agentless_scanning/enable?tab=newawsaccount#set-up-aws-cloudformation

{{% /tab %}}
{{< /tabs >}}

##### Mettre à jour la stack CloudFormation

Datadog recommande de mettre à jour régulièrement la stack CloudFormation, afin d'avoir accès aux nouvelles fonctionnalités et corrections de bugs au fur et à mesure de leur publication. Pour ce faire, suivez ces étapes :
1. Connectez-vous à votre console AWS et accédez à la page CloudFormation Stacks.
2. Sélectionnez la sous-stack CloudFormation **DatadogIntegration-DatadogAgentlessScanning-...**, cliquez sur **Update**, puis cliquez sur **Update nested stack**.
3. Cliquez sur **Replace existing template**.
4. Dans l'URL S3 suivante : `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, remplacez `<VERSION>` par la version trouvée dans [aws_quickstart/version.txt][14]. Collez cette URL dans le champ **Amazon S3 URL**.
5. Cliquez sur **Next** pour avancer sur les pages suivantes sans les modifier, puis soumettez le formulaire.
{{% /collapse-content %}}

<br />

### Azure Resource Manager

Utilisez le modèle Azure Resource Manager pour déployer le scanner sans Agent. Le modèle inclut les définitions de rôles requises pour déployer et gérer les scanners sans Agent.

{{% collapse-content title="Guide de configuration Azure Resource Manager" level="h4" id="azure-resource-manager-setup" %}}
Si vous avez déjà [configuré Cloud Security][10] et souhaitez ajouter un nouveau compte Azure ou activer le [scanning sans Agent][1] sur un compte Azure intégré existant, vous pouvez utiliser [Terraform][7] ou Azure Resource Manager. Cet article fournit des instructions détaillées pour l'approche Azure Resource Manager.

<div class="alert alert-danger">L'exécution des scanners sans Agent entraîne des coûts supplémentaires. Pour optimiser ces coûts tout en garantissant des scans fiables toutes les 12 heures, Datadog recommande de configurer le <a href="#terraform-setup">scanning sans Agent avec Terraform</a> comme modèle par défaut.</div>

{{< tabs >}}
{{% tab "New Azure account" %}}

###### Configurer l'intégration Datadog/Azure

Suivez les instructions pour configurer l'[intégration Azure Datadog][1].

{{% csm-agentless-azure-resource-manager %}}

[1]: /fr/integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "Existing Azure account" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Configuration

### Vérifier votre configuration

Après avoir terminé la configuration, vous pouvez vérifier que le scanning sans Agent fonctionne correctement en recherchant les résultats de scan dans Datadog. Les résultats apparaissent généralement après la fin du premier cycle de scan.

Consultez les résultats de scan aux emplacements suivants :

- **Pour les vulnérabilités de host et de conteneur** : [Explorateur de vulnérabilités CSM][15]. Pour afficher uniquement les vulnérabilités détectées par le scanning sans Agent, utilisez le filtre `origin:"Agentless scanner"` dans la barre de recherche.
- **Pour les vulnérabilités Lambda** : [Explorateur Code Security (SCA)][16]
- **Pour les résultats de données sensibles** : [Scanner de données sensibles][17]

### Exclure des ressources des scans

{{% csm-agentless-exclude-resources %}}

## Désactiver le scanning sans Agent

{{< tabs >}}
{{% tab "AWS" %}}
1. Sur la page [Configuration de Cloud Security][10], cliquez sur **Cloud Integrations** > **AWS**.
1. Si nécessaire, utilisez les filtres pour trouver le compte pour lequel vous souhaitez arrêter le scanning sans Agent. Cliquez sur le compte pour ouvrir le panneau latéral qui contient ses paramètres.
1. Sur l'onglet **Features**, cliquez sur **Configure Agentless Scanning** ou **Manage** pour ouvrir la fenêtre de configuration du scanning sans Agent.
1. Sous **How would you like to set up Agentless scanning?**, cliquez sur **Terraform**.
1. Sous **Enable Features**, à côté de **Enable Agentless Vulnerability management**, désactivez le bouton.
1. Cliquez sur **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. Sur la page [Configuration de Cloud Security][10], cliquez sur **Cloud Integrations** > **Azure**.
1. Localisez le locataire de votre abonnement, développez la liste des abonnements et identifiez l'abonnement pour lequel vous souhaitez désactiver le scanning sans Agent.
1. À côté de l'étiquette **Enabled**, cliquez sur le bouton **Edit** ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) pour ouvrir la fenêtre Vulnerability Scanning.
1. À côté de **Vulnerability Scanning**, désactivez le bouton.
1. Cliquez sur **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. Sur la page [Configuration de Cloud Security][10], cliquez sur **Cloud Integrations** > **GCP**.
1. Développez le compte contenant le projet où vous souhaitez désactiver le scanning sans Agent.
1. À côté de l'étiquette **Enabled**, cliquez sur le bouton **Edit** ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) pour ouvrir la fenêtre Vulnerability Scanning.
1. À côté de **Vulnerability Scanning**, désactivez le bouton.
1. Cliquez sur **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Désinstaller le scanning sans Agent

{{< tabs >}}
{{% onglet "Terraform" %}}
Pour désinstaller le scanning sans Agent, supprimez le module scanner de votre code Terraform. Pour plus d'informations, consultez la documentation du [module Terraform][9].

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Pour désinstaller le scanning sans Agent, connectez-vous à votre console AWS et supprimez la stack CloudFormation créée pour le scanning sans Agent.
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Pour désinstaller le scanning sans Agent, connectez-vous à votre compte Azure. Si vous avez créé un groupe de ressources dédié pour le scanner sans Agent, supprimez ce groupe de ressources ainsi que les définitions de rôles Azure suivantes :
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

Si vous n'avez pas utilisé de groupe de ressources dédié, vous devez supprimer manuellement les ressources du scanner, qui peuvent être identifiées par les tags `Datadog:true` et `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/agentless_scanning
[2]: /fr/integrations/amazon_web_services/
[3]: /fr/remote_configuration
[4]: https://app.datadoghq.com/security/csm/
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: #terraform-setup
[8]: mailto:success@datadoghq.com
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: #aws-cloudformation-setup
[12]: /fr/security/cloud_security_management/agentless_scanning
[13]: #azure-resource-manager-setup
[14]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage