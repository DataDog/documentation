---
aliases:
- /fr/integrations/awsbilling/
- /fr/cloud_cost_management/aws/
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/azure
  tag: Documentation
  text: Obtenez des informations sur votre facture Azure
- link: /cloud_cost_management/google_cloud
  tag: Documentation
  text: Obtenez des informations sur votre facture Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentation
  text: Obtenez des informations sur votre facture Oracle
title: AWS
---
## Présentation {#overview}

Pour configurer Cloud Cost Management dans Datadog, vous avez besoin de :
1. Un compte AWS avec accès à la facturation
2. L'intégration AWS installée dans Datadog
3. Un rapport de coûts et d'utilisation (suivez les étapes ci-dessous pour en créer un)

## Configuration {#setup}

Vous pouvez effectuer la configuration en utilisant l'[API][21], [Terraform][22], le flux guidé **Configurer avec l'agent IA**, ou directement dans Datadog en suivant les instructions ci-dessous.

### Configurer l'intégration AWS {#configure-the-aws-integration}

Accédez à [Configuration et installation][7], ajoutez un compte AWS et suivez les étapes pour configurer l'intégration AWS.

**Remarque** : Datadog recommande de configurer un rapport de coûts et d'utilisation à partir d'un [compte de gestion **AWS**][2], et non d'un compte administrateur délégué, pour une visibilité des coûts dans les **comptes membres** associés. Un compte administrateur délégué ne peut pas découvrir d'autres comptes membres.

Si vous envoyez un rapport de coûts et d'utilisation depuis un **compte membre** AWS, assurez-vous d'avoir sélectionné les options suivantes dans les [préférences][3] de votre **compte de gestion** :
- {{< ui >}}Linked Account Access{{< /ui >}}
- {{< ui >}}Linked Account Refunds and Credits{{< /ui >}}
- {{< ui >}}Linked Account Discounts{{< /ui >}}

Ces paramètres garantissent une précision totale des coûts en permettant des calculs de coûts périodiques par rapport à AWS Cost Explorer.

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.png" alt="Formulaire de configuration de Cloud Cost Management en mode CloudFormation" style="width:100%" >}}

### Sélectionnez les ressources à créer {#select-the-resources-to-create}

La pile CloudFormation peut être configurée de trois manières en fonction de vos ressources AWS existantes :

* **Nouvelle configuration** : sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} pour créer à la fois le rapport et son bucket S3
* **Bucket existant** : sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} et désélectionnez {{< ui >}}Create S3 Bucket{{< /ui >}} pour utiliser un bucket S3 existant
* **Rapport existant** : désélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} pour importer un rapport de coûts et d'utilisation existant

### Configurez les paramètres du rapport de coûts et d'utilisation {#configure-the-cost-and-usage-report-settings}

Si vous utilisez un rapport de coûts et d'utilisation 2.0 et un bucket existants, sélectionnez votre rapport dans le champ {{< ui >}}Data Export{{< /ui >}} et passez à l'étape suivante.

{{< img src="cloud_cost/setup/aws_data_export_selector.png" alt="Page de configuration CCM avec « Créer un rapport de coûts et d'utilisation » et « Créer un bucket S3 » non sélectionnés, montrant le sélecteur d'exportation de données utilisé pour sélectionner une exportation existante" style="width:100%" >}}

Sinon, saisissez les détails suivants pour votre rapport de coûts et d'utilisation :

* {{< ui >}}Report Content{{< /ui >}} : La version de votre rapport de coûts et d'utilisation (CUR hérité ou CUR 2.0).
* {{< ui >}}Bucket Name{{< /ui >}} : Le nom du bucket S3 où les fichiers de rapport sont stockés.
* {{< ui >}}Bucket Region{{< /ui >}} : Le [code de région][100] AWS de la région contenant votre bucket S3. Par exemple, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}} : Le préfixe de chemin S3 où les fichiers de rapport sont stockés.
  * **Remarque :** Les formats de préfixe suivants ne sont pas pris en charge : vide, commençant par `/` (tel que `/` ou `/cost`), ou se terminant par `/` (tel que `cost/`). Les préfixes contenant `/` au milieu sont pris en charge (tel que `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}} : Le nom de votre rapport de coûts et d'utilisation.

**Note** :
- Ces valeurs permettent soit de localiser votre rapport de coûts et d'utilisation existant, soit de définir les paramètres des ressources nouvellement créées.
- Il peut s'écouler entre 48 et 72 heures pour que toutes les données disponibles soient renseignées dans votre organisation Datadog après la génération d'un rapport de coûts et d'utilisation complet. Si 72 heures se sont écoulées et que les données ne sont toujours pas renseignées, contactez le [support Datadog][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /fr/help/

{{% /tab %}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/aws_terraform_setup.png" alt="Page de configuration CCM avec l'option Terraform sélectionnée, montrant l'étape 1 développée pour configurer les paramètres du rapport de coûts et d'utilisation, y compris le nom du bucket, la région et les détails de l'exportation" style="width:100%" >}}

### Sélectionnez les ressources à créer {#select-the-resources-to-create-1}

La configuration Terraform prend en charge trois configurations en fonction de vos ressources AWS existantes :

* **Nouvelle configuration** : sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} pour créer à la fois le rapport et son bucket S3
* **Bucket existant** : sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} et désélectionnez {{< ui >}}Create S3 Bucket{{< /ui >}} pour utiliser un bucket S3 existant
* **Bucket et rapport existants** : désélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} et {{< ui >}}Create S3 Bucket{{< /ui >}} pour utiliser un rapport et un bucket S3 existants

**Remarque** : Si vous utilisez un bucket existant, vérifiez qu'AWS a l'autorisation d'y écrire des CUR. Si ce n'est pas le cas, vous devrez peut-être mettre à jour la politique de votre bucket.

### Configurez les paramètres du rapport de coûts et d'utilisation {#configure-the-cost-and-usage-report-settings-1}

Si vous utilisez un rapport de coûts et d'utilisation 2.0 et un bucket existants, sélectionnez votre rapport dans le champ {{< ui >}}Data Export{{< /ui >}} et passez à l'étape suivante.

{{< img src="cloud_cost/setup/aws_data_export_selector.png" alt="Page de configuration CCM avec « Créer un rapport de coûts et d'utilisation » et « Créer un bucket S3 » non sélectionnés, montrant le sélecteur d'exportation de données utilisé pour sélectionner une exportation existante" style="width:100%" >}}

Sinon, saisissez les détails suivants pour votre rapport de coûts et d'utilisation :

* {{< ui >}}Report Content{{< /ui >}} : La version de votre rapport de coûts et d'utilisation (CUR hérité ou CUR 2.0).
* {{< ui >}}Bucket Name{{< /ui >}} : Le nom du bucket S3 où les fichiers de rapport sont stockés.
* {{< ui >}}Bucket Region{{< /ui >}} : Le [code de région][100] AWS de la région contenant votre bucket S3. Par exemple, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}} : Le préfixe de chemin S3 où les fichiers de rapport sont stockés.
  * **Remarque :** Les formats de préfixe suivants ne sont pas pris en charge : vide, commençant par `/` (tel que `/` ou `/cost`), ou se terminant par `/` (tel que `cost/`). Les préfixes contenant `/` au milieu sont pris en charge (tel que `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}} : Le nom de votre rapport de coûts et d'utilisation.

**Note** :
- Ces valeurs permettent soit de localiser votre rapport de coûts et d'utilisation existant, soit de définir les paramètres des ressources nouvellement créées.
- Il peut s'écouler entre 48 et 72 heures pour que toutes les données disponibles soient renseignées dans votre organisation Datadog après la génération d'un rapport de coûts et d'utilisation complet. Si 72 heures se sont écoulées et que les données ne sont toujours pas renseignées, contactez le [support Datadog][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /fr/help/

### Copiez le code HCL Terraform généré et appliquez les modifications {#copy-generated-terraform-hcl-and-apply-changes}

Dans l'interface de configuration CCM Terraform, suivez les instructions de l'étape {{< ui >}}Apply Terraform Configuration{{< /ui >}}. Résolvez tous les problèmes qui apparaissent lors de l'exécution de `terraform plan` ou `terraform apply` avant de revenir à CCM pour confirmer la création du compte.

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.png" alt="Formulaire de configuration de Cloud Cost Management en mode manuel" style="width:100%" >}}

### Prérequis : générez un Cost and Usage Report {#prerequisite-generate-a-cost-and-usage-report}

Créez soit un [Cost and Usage Report 2.0][202], soit un [Legacy Cost and Usage Report][201] dans AWS sous la section {{< ui >}}Data Exports{{< /ui >}}.

Sélectionnez les options suivantes dans la section Content :

* Type d'exportation : {{< ui >}}CUR 2.0 export{{< /ui >}} ou {{< ui >}}Legacy CUR export{{< /ui >}}
* {{< ui >}}Include resource IDs{{< /ui >}}
* {{< ui >}}Split cost allocation data{{< /ui >}} (Active l'allocation des coûts ECS. Vous devez également choisir d'activer [AWS Split Cost Allocation][210] dans les préférences de Cost Explorer).
* {{< ui >}}Refresh automatically{{< /ui >}}
* Facultatif : activez {{< ui >}}IAM Principal Allocation Data{{< /ui >}} pour une répartition granulaire des coûts IAM Principal Bedrock au niveau de l'utilisateur.

Sélectionnez les options de livraison suivantes :

* Granularité temporelle : {{< ui >}}Hourly{{< /ui >}}
* Version du rapport : {{< ui >}}Create new report version{{< /ui >}}
* Type de compression : {{< ui >}}GZIP{{< /ui >}} ou {{< ui >}}Parquet{{< /ui >}}

**Remarque** : Datadog ne prend en charge qu'un seul Cost and Usage Report par compte membre.

### Localisez le Cost and Usage Report {#locate-the-cost-and-usage-report}

Si vous avez quitté le rapport que vous avez créé dans la section des prérequis, suivez la documentation AWS pour [afficher vos exportations de données][204]. Sélectionnez l'exportation CUR que vous avez créée, puis sélectionnez {{< ui >}}Edit{{< /ui >}} pour voir les détails de l'exportation.

Pour permettre à Datadog d'accéder au rapport de coûts et d'utilisation, remplissez les champs avec les informations pertinentes :

* {{< ui >}}Bucket Name{{< /ui >}} : Il s'agit du nom du bucket S3 dans la section des paramètres de stockage de l'exportation de données.
* {{< ui >}}Bucket Region{{< /ui >}} : Il s'agit de la région où se trouve votre bucket. Par exemple, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}} : Il s'agit du préfixe de chemin S3 dans la section des paramètres de stockage de l'exportation de données.
  * **Remarque :** Les formats de préfixe suivants ne sont pas pris en charge : vide, commençant par `/` (tel que `/` ou `/cost`), ou se terminant par `/` (tel que `cost/`). Les préfixes contenant `/` au milieu sont pris en charge (tel que `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}} : Il s'agit du nom de l'exportation dans la section Nom de l'exportation.

**Remarque** : Datadog prend uniquement en charge les rapports de coûts et d'utilisation (CUR) générés par AWS. Ne modifiez pas et ne déplacez pas les fichiers générés par AWS, et n'essayez pas de fournir un accès à des fichiers générés par un tiers.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le endpoint des rapports de coûts et d'utilisation AWS est utilisé pour valider les champs ci-dessus par rapport à l'exportation CUR dans votre bucket S3. Cet endpoint n'est pas validé FIPS.</div>
{{< /site-region >}}

### Configurez l'accès au rapport de coûts et d'utilisation {#configure-access-to-the-cost-and-usage-report}

[Créez une politique][205] dans AWS pour vous assurer que Datadog dispose des autorisations nécessaires pour accéder au CUR et au bucket S3 dans lequel il est stocké. Utilisez le JSON suivant :

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCloudCostReadBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME"
      },
      {
          "Sid": "DDCloudCostGetBill",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME/REPORT_PREFIX/REPORT_NAME/*"
      },
      {
          "Sid": "DDCloudCostCheckAccuracy",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListCURs",
          "Action": [
              "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListOrganizations",
          "Action": [
              "organizations:Describe*",
              "organizations:List*"
          ],
          "Effect": "Allow",
          "Resource": "*"
      }
  ]
}
{{< /code-block >}}

**Remarque** : Notez le nom que vous avez créé pour cette politique pour les étapes suivantes.

### Attachez la politique au rôle d'intégration Datadog {#attach-the-policy-to-the-datadog-integration-role}

Associez la nouvelle stratégie S3 au rôle de l'intégration Datadog.

1. Accédez à {{< ui >}}Roles{{< /ui >}} dans la console IAM d'AWS.
2. Localisez le rôle utilisé par l'intégration Datadog. Par défaut, il est nommé **DatadogIntegrationRole**, mais le nom peut varier si votre organisation l'a renommé. Cliquez sur le nom du rôle pour ouvrir la page de résumé du rôle.
3. Cliquez sur {{< ui >}}Attach policies{{< /ui >}}.
4. Saisissez le nom de la politique de bucket S3 créée ci-dessus.
5. Cliquez sur {{< ui >}}Attach policy{{< /ui >}}.

**Remarque** : Il peut s'écouler entre 48 et 72 heures pour que toutes les données disponibles soient renseignées dans votre organisation Datadog après la génération complète d'un rapport de coût et d'utilisation (Cost and Usage Report). Si 72 heures se sont écoulées et que les données ne sont toujours pas renseignées, contactez [Datadog Support][18].

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[202]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-standard.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{% tab "AI Agent" %}}

Le flux **Set up with AI Agent** crée ou importe un rapport de coût et d'utilisation et génère du Terraform que vous pouvez examiner avant de l'appliquer. Datadog fournit une invite de configuration que vous exécutez dans votre propre agent de codage, tel que Claude Code ou Cursor.

### Prérequis {#prerequisites}

- Un compte AWS déjà connecté à Datadog via une intégration basée sur les rôles. Les comptes qui s'authentifient avec une paire de clés d'accès ne sont pas pris en charge, car la politique de lecture du rapport doit être attachée à un rôle IAM.
- L'autorisation **AWS Configurations Manage**.
- Un agent de codage installé localement. Datadog fournit des instructions pour Claude Code et Cursor.

### Démarrez le flux dans Datadog {#start-the-flow-in-datadog}

1. Accédez à [Setup & Configuration][300], recherchez {{< ui >}}Amazon Web Services{{< /ui >}} et cliquez sur {{< ui >}}Add Account{{< /ui >}}.
2. Sélectionnez {{< ui >}}Set up with AI agent{{< /ui >}}. Datadog génère une clé d'API gérée et une clé d'application pour la session.
3. Démarrez votre agent :
    - **Claude Code** : Copiez la commande générée et exécutez-la dans votre terminal.
    - **Cursor** : Cliquez sur {{< ui >}}Open in Cursor{{< /ui >}} pour télécharger vos identifiants et ouvrir Cursor avec l'invite préremplie.
4. Laissez la page de configuration Datadog ouverte pendant que l'agent travaille. Une fois que Datadog détecte votre nouvelle configuration, le bouton {{< ui >}}Waiting for agent{{< /ui >}} devient {{< ui >}}Setup complete{{< /ui >}}. Cliquez dessus pour terminer.

### Terminez la configuration avec l'agent {#complete-the-setup-with-the-agent}

1. Choisissez un format de rapport de coûts et d'utilisation :
    - **CUR 2.0** : Recommandé et sélectionné par défaut pour les nouveaux rapports.
    - **CUR hérité** : Disponible pour un rapport hérité existant ou en tant que solution de secours.
2. Sélectionnez les ressources à créer. Le flux vérifie l'existence d'un rapport de coûts et d'utilisation avant d'en créer un nouveau. Vous pouvez effectuer les opérations suivantes :
    - Créez un rapport de coûts et d'utilisation et son bucket S3
    - Utilisez un rapport et un bucket S3 existants
3. Examinez la configuration Terraform générée, puis appliquez-la pour terminer la configuration du compte.

[300]: https://app.datadoghq.com/cost/setup

{{% /tab %}}

{{< /tabs >}}

#### Autorisations pour les recommandations du Hub d'optimisation des coûts AWS {#permissions-for-aws-cost-optimization-hub-recommendations}

Cloud Cost Management génère certaines [recommandations][30] à partir de données provenant du [Hub d'optimisation des coûts AWS][31]. Pour que Datadog reçoive ces recommandations, le rôle IAM de l'intégration AWS de Datadog doit inclure les autorisations suivantes :

- `cost-optimization-hub:GetRecommendation`
- `cost-optimization-hub:ListRecommendations`

Ces autorisations font partie de la politique IAM par défaut de l'intégration AWS. Si vous avez configuré l'intégration AWS récemment avec les [modèles CloudFormation ou Terraform][32], vous disposez déjà de ces autorisations.

Si vous avez configuré l'intégration AWS avant que ces autorisations ne soient ajoutées à la politique par défaut, mettez à jour votre politique IAM pour les inclure. Pour la politique actuelle, consultez la documentation sur l'[intégration Amazon Web Services][32].

### Filtrage de compte {#account-filtering}

Utilisez le filtrage de compte pour contrôler les comptes membres AWS à intégrer dans Cloud Cost Management. Le filtrage des comptes n'entraîne pas de coûts Datadog supplémentaires.

L'utilisation du filtrage de compte nécessite un compte de gestion AWS. Vous pouvez configurer des filtres de compte une fois qu'un compte a été configuré dans Cloud Cost Management.

**Remarque :** Les filtres de compte ne sont pas pris en charge pour la recherche par tag.

#### Configurer des filtres de compte pour un compte existant {#configure-account-filters-for-an-existing-account}

Accédez à [**Cloud Cost** > **Paramètres**, sélectionnez **Comptes**][17], puis cliquez sur {{< ui >}}Manage Account{{< /ui >}} pour le compte de gestion que vous souhaitez filtrer.

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="Bouton Gérer le compte sur la carte de compte" style="width:100%;" >}}

Cliquez sur {{< ui >}}Billing dataset{{< /ui >}} pour accéder à l'interface utilisateur de filtrage de compte.

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="Interface de filtrage des comptes pour filtrer les comptes membres AWS" style="width:100%;" >}}

### Obtention des données historiques {#getting-historical-data}

Si vous configurez un rapport de coûts et d'utilisation qui dispose déjà de données historiques disponibles dans S3, Datadog ingère automatiquement jusqu'à 15 mois de données de coût historiques.

Si votre rapport nouvellement configuré ne dispose pas de données historiques, vous pouvez demander un rétro-remplissage auprès d'AWS :

Pour demander un rétro-remplissage des données de coût AWS historiques :

1. [Ouvrez un dossier de support AWS][20] et demandez un rétro-remplissage de vos données de coût.
2. Incluez le **nom du rapport** et la **période de facturation souhaitée** dans votre demande.
3. Attendez qu'AWS traite la demande de rétro-remplissage.

Une fois les données rétro-remplies par AWS, Datadog ingère automatiquement les données dans les 24 heures.

AWS ne peut pas rétro-remplir les données de coût antérieures à votre compte AWS ou reflétant une structure AWS Organizations précédente.

Pour plus d'informations, consultez le [guide de dépannage des rapports de coûts et d'utilisation AWS][20].

## Types de coûts {#cost-types}

Visualisez vos données ingérées en utilisant des types de coûts prêts à l'emploi. Les types de coûts diffèrent principalement dans la manière dont ils rendent compte des taux de remise, des plans d'épargne et des réservations.

### À la demande {#on-demand}
Les coûts **à la demande** représentent le coût d'utilisation au tarif public à la demande publié par AWS. Cela exclut tous les plans d'épargne, réservations, remises, taxes et frais.

**Remarque** : Dans la plupart des cas, les coûts à la demande ne constituent pas une source fiable pour estimer les coûts réels.

### Coûts amortis et non combinés {#amortized-and-unblended-costs}
Les mesures de coût **amorti** répartissent les économies d'engagement sur toute la durée de la remise. Ceci est également appelé _base de comptabilité d'exercice_. Les réservations et les plans d'épargne sont déduits d'un engagement mensuel et appliqués directement à l'utilisation couverte, au moment de l'utilisation. Tout reliquat inutilisé apparaît sous forme de frais.

En revanche, les métriques de coût **non combinées** affichent tous les frais à la date à laquelle ils sont engagés. Ceci est également appelé _base de coût_. Les frais de réservation et de plan d'épargne apparaissent à la date à laquelle ils ont été facturés et ne sont pas appliqués directement à l'utilisation couverte. Une fois les données de facturation d'un mois finalisées, les métriques non combinées correspondent exactement à la facture AWS.

### Coûts nets {#net-costs}
Les coûts **nets** appliquent directement les remises privées à l'utilisation. Le coût d'utilisation d'une ressource spécifique représente le coût effectif une fois toutes les économies réalisées.

En revanche, d'autres métriques présentent les remises privées sous forme de postes distincts à valeur négative sans tags d'attribution de ressources. Plutôt que d'attribuer les remises directement à l'utilisation, ces métriques soustraient les remises du coût total.

Les coûts **nets amortis** fournissent la représentation la plus précise pour l'allocation des coûts, avec toutes les économies appliquées directement à l'utilisation. Les métriques de coût net sont disponibles si votre compte AWS bénéficie de remises d'entreprise négociées en privé. Si votre compte ne bénéficie pas de remises d'entreprise, alors le coût **net amorti** et le coût **amorti** sont équivalents.

### Allocation des conteneurs {#container-allocation}
**Les métriques d'allocation des conteneurs** contiennent tous les mêmes coûts que les métriques AWS, mais avec des ventilations et des informations supplémentaires pour les charges de travail de conteneurs. Voir [allocation des coûts des conteneurs][11] pour plus de détails.

### Exemple {#example}
Le scénario suivant démontre comment les différents types de coûts se comportent. Imaginez que vous ayez :
- Une instance EC2 fonctionnant pendant une heure avec un coût de 3 $ par heure de calcul.
- Un programme de remise qui fait que ce type d'instance ne vous coûte que 2 $ par heure de calcul.
- Une remise EDP négociée de 10 % en plus de toutes les autres remises.

Voici comment le coût de l'instance, l'engagement horaire du programme de remise et les réductions sont représentés pour chaque type de coût :

|Type de coût |Utilisation |Savings Plan |Remise | Explication |
|:---------|-|-|-|:------------------------------------------------|
|À la demande |3,00 $|||Il s'agit du tarif public à la demande.|
|Non mélangé |3,00 $|2,00 $|-0,20 $|Les frais récurrents du Savings Plan et la remise EDP sont des postes distincts, non associés à une ressource spécifique. (**Remarque&nbsp;:** le coût de la ressource de 3&nbsp;$ est compensé par `SavingsPlanNegation`.) |
|Net non mélangé||1,80 $||Les frais récurrents du Savings Plan apparaissent comme un poste avec la remise appliquée ; le coût n'est pas associé à une ressource spécifique.|
|Amorti |2,00 $||-0,20 $|La remise du Savings Plan est appliquée directement au coût de la ressource. La remise EDP est un poste distinct. |
|Net amorti |1,80 $|||Les remises du Savings Plan et de l'EDP sont appliquées directement au coût de la ressource. |
|Net amorti - Ressources partagées allouées |1,80 $|||Le même coût que le Net amorti, mais ce coût peut être ventilé davantage par dimensions Kubernetes et par tags de pod. |

### Résumé des métriques de coût {#cost-metrics-summary}

En règle générale :
- `aws.cost.net.amortized.shared.resources.allocated` fournit l'allocation de coûts la plus complète pour des charges de travail et des équipes spécifiques.
- Si vous ne disposez pas de l'allocation des coûts des conteneurs, utilisez `aws.cost.net.amortized`.
- Si vous n'avez pas de coûts nets amortis, utilisez `aws.cost.amortized.shared.resources.allocated` ou `aws.cost.amortized`.

| Métrique               | Description           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | Tous vos coûts nets amortis AWS, avec des ventilations et des informations supplémentaires pour les charges de travail de conteneurs. Nécessite [l'allocation des coûts des conteneurs][11].|
| `aws.cost.net.amortized` | Coûts nets amortis, sans ventilation des coûts des conteneurs. |
| `aws.cost.net.unblended` | Coûts nets non mélangés, sans ventilation des coûts des conteneurs. Correspond à la facture AWS, avec des remises spécialisées précalculées dans les coûts d'utilisation. |
| `aws.cost.amortized.shared.resources.allocated` | Tous vos coûts amortis AWS, avec des ventilations et des informations supplémentaires pour les charges de travail de conteneurs. Nécessite [l'allocation des coûts des conteneurs][11].|
| `aws.cost.amortized` | Coûts amortis, sans ventilation des coûts des conteneurs. |
| `aws.cost.unblended` | Coûts non mélangés, sans ventilation des coûts des conteneurs. Correspond à la facture AWS. |
| `aws.cost.ondemand`  | Coûts basés sur le tarif catalogue fourni par AWS, excluant tous les plans d'épargne, réservations, remises, taxes et frais. |

## Comment Datadog enrichit vos données de coûts AWS avec des tags {#how-datadog-enriches-your-aws-cost-data-with-tags}

Datadog enrichit automatiquement vos données de coûts AWS avec des tags provenant de sources multiples. Pour un aperçu complet de la façon dont les tags sont appliqués aux données de coûts, consultez [Tags][19].

Les sources de tags suivantes sont disponibles pour AWS :

- Colonnes du rapport sur les coûts et l'utilisation (Cost and Usage Report)
- Tags de ressource AWS
- Tags de compte AWS
- Tags d'intégration AWS
- Tags prêts à l'emploi
- Tags de charges de travail de conteneurs
- Tags de pipelines

### Colonnes du rapport sur les coûts et l'utilisation {#cost-and-usage-report-columns}

Toutes les colonnes contenant des chaînes du [Rapport de coût et d'utilisation AWS][6] sont ajoutées en tant que tags aux métriques de coûts.

Pour garantir la cohérence, Datadog normalise les clés de tag en utilisant des traits de soulignement et des minuscules. Par exemple, la colonne CUR `lineItem/ResourceId` correspond à la clé de tag `line_item/resource_id`. Les valeurs de tag sont généralement non modifiées, conservant la casse exacte et la plupart des caractères spéciaux.

**Exemples :**

|Colonne CUR|Valeur CUR|Tag Cloud Cost|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

Consultez la [documentation AWS CUR 2.0][33] pour en savoir plus sur les colonnes supplémentaires dans l'exportation CUR 2.0.

### Tags de ressource AWS {#aws-resource-tags}

Les [tags de ressource AWS][12] sont des tags définis par l'utilisateur qui apparaissent dans la console AWS lors de la consultation d'une ressource particulière, telle qu'une instance EC2 ou un bucket S3.

Lorsque vous activez l'intégration AWS de Datadog, Datadog collecte automatiquement les tags de ressource pour la plupart des ressources AWS. Ces tags sont appliqués à tous les coûts trouvés dans le CUR pour une ressource donnée. Les tags de ressource sont récupérés régulièrement et sont appliqués aux données de coût à partir du jour où ils sont créés ou modifiés. Les valeurs de tag historiques ne sont pas écrasées lorsque les tags changent.

Si l'intégration AWS n'est pas activée, vous pouvez activer l'enrichissement par tag de ressource en activant les [tags d'allocation des coûts][13] dans la facturation AWS. Cela vous permet de sélectionner un sous-ensemble de clés de tags de ressource à inclure en tant que colonnes dans l'AWS CUR. Datadog inclut automatiquement ces colonnes en tant que balises lors du traitement du CUR.

### Tags d'organisation et de compte AWS {#aws-organization-and-account-tags}
AWS Organizations prend en charge les [balises définies par l'utilisateur][14] sur les unités organisationnelles et les comptes. Datadog récupère et applique automatiquement ces balises aux données de coûts. Les balises de compte sont appliquées à toute utilisation associée à ces comptes. Les balises d'organisation sont appliquées à toutes les données de facturation pour le compte payeur correspondant.

_Nécessite l'intégration AWS Datadog sur le compte de l'organisation._

### Balises d'intégration AWS {#aws-integration-tags}

Les balises d'intégration AWS sont des balises définies sur la tuile d'intégration AWS dans la page des intégrations Datadog. Elles sont appliquées à tous les coûts trouvés dans le CUR pour le compte AWS associé.

### Tags prêts à l'emploi {#out-of-the-box-tags}
Datadog ajoute des balises prêtes à l'emploi aux données de coûts ingérées pour vous aider à ventiler et à allouer davantage vos coûts. Ces balises sont dérivées de votre [Cost and Usage Report (CUR)][6] et facilitent la découverte et la compréhension des données de coûts.

Les tags par défaut suivants peuvent être utilisés pour filtrer et regrouper vos données :

| Tag                          | Description       |
| ---------------------------- | ----------------- |
| `aws_product`                | Le service AWS facturé.|
| `aws_product_family`         | La catégorie du service AWS facturé (par exemple, Compute ou Storage).|
| `aws_management_account_name`| Le nom du compte de gestion AWS associé à l'élément.|
| `aws_management_account_id`  | L'ID du compte de gestion AWS associé à l'élément.|
| `aws_member_account_name`    | Le nom du compte membre AWS associé à l'élément.|
| `aws_member_account_id`      | L'ID du compte membre AWS associé à l'élément.|
| `aws_cost_type`              | Le type de frais couvert par cet élément (par exemple, Utilisation ou Taxe).|
| `aws_pricing_term`           | Si l'utilisation est réservée, Spot ou à la demande.|
| `aws_reservation_arn`        | L'ARN de l'instance réservée dont l'élément a bénéficié.|
| `aws_savings_plan_arn`       | L'ARN du Savings Plan dont l'élément a bénéficié.|
| `aws_usage_type`             | Les détails d'utilisation de l'élément (par exemple, BoxUsage:i3.8xlarge).|
| `aws_operation`              | L'opération associée à l'élément (par exemple, RunInstances).|
| `aws_region`                 | La région associée à l'élément (par exemple, us-east-1).|
| `aws_availability_zone`      | La zone de disponibilité associée à l'élément.|
| `aws_resource_id`            | L'ID de ressource associé à l'élément.|
| `aws_instance_type`          | Le type d'instance de l'élément.|
| `aws_instance_family`        | La famille d'instances associée à votre élément (par exemple, Stockage optimisé).|
| `aws_datatransfer_type`      | Le type de transfert de données associé à l'élément (par exemple, inter-zone ou inter-région).|
| `aws_datatransfer_direction` | La direction du transfert de données associé à l'élément : (par exemple, entrant ou sortant).|
| `is_aws_ec2_compute`         | Si l'utilisation est liée au calcul EC2.|
| `is_aws_ec2_compute_on_demand`| Si l'utilisation est à la demande.|
| `is_aws_ec2_compute_reservation`| Si l'utilisation est associée à une instance réservée.|
| `is_aws_ec2_capacity_reservation`| Si l'utilisation est associée à une réservation de capacité.|
| `is_aws_ec2_spot_instance`   | Si l'utilisation est associée à une instance Spot.|
| `is_aws_ec2_savings_plan`    | Si l'utilisation est associée à un Savings Plan.|
| `aws_bill_entity` | Le vendeur AWS auprès duquel votre compte est enregistré. Les transactions peuvent être un achat AWS Marketplace (`AWS Marketplace`) ou un achat d'autres services AWS (`AWS`). |
| `aws_bill_type` | Le type de facture couvert par ce rapport : (tel que `Purchase`). |
| `aws_cost_type` | Le type de frais couvrant le poste : (tel que `SavingsPlanCoveredUsage`). |
| `aws_discount_lease_term` | La durée pendant laquelle une instance réservée est réservée. |
| `aws_discount_purchase_option` | La façon dont vous avez choisi de payer une réservation : (telle que `All Upfront`). |
| `aws_ec2_compute_product_family` | Le type d'utilisation pour un poste EC2 Compute : (tel que `BoxUsage` ou `SpotUsage`). |
| `aws_pricing_usage_unit` | L'unité de tarification qu'AWS a utilisée pour calculer le coût d'utilisation : (telle que `Hours`). |
| `aws_reservation_modification_status` | Indique si le bail d'instance réservée a été modifié ou est resté inchangé : (tel que `Manual`). |
| `bill/billing_entity` | Le vendeur AWS avec lequel votre compte est associé. Les transactions peuvent être un achat AWS Marketplace (`AWS Marketplace`) ou un achat d'autres services AWS (`AWS`). |
| `bill/bill_type` | Le type de facture couvert par ce rapport (tel que `Purchase`). |
| `bill/invoicing_entity` | L'entité AWS qui émet la facture. |
| `bill/payer_account_id` | L'ID de compte du compte payeur. Pour une organisation dans AWS Organizations, il s'agit de l'ID de compte du compte de gestion. |
| `is_aws_ec2_compute_savings_plan` | `true` pour les postes qui représentent l'utilisation d'EC2 Compute, payés à l'aide d'un Savings Plan. |
| `line_item/currency_code` | La devise dans laquelle ce poste est affiché (`USD` par défaut). |
| `line_item/legal_entity` | Le fournisseur de vos services AWS. |
| `line_item/line_item_type` | Le type de frais couvert par le poste (tel que `Credit`). |
| `line_item/operation` | L'opération AWS spécifique couverte par le poste (telle que `RunInstances`). |
| `line_item/product_code` | Le code du produit mesuré (tel que `Amazon EC2` pour Amazon Elastic Cloud Compute). |
| `line_item/resource_id` | L'ID de ressource individuel associé au poste (Facultatif). |
| `line_item/tax_type` | Le type de taxe qu'AWS a appliqué au poste. |
| `line_item/usage_account_id` | L'ID du compte qui a utilisé le poste. |
| `line_item/usage_type` | Les détails d'utilisation du poste (tels que `USW2-BoxUsage:m2.2xlarge`). |
| `pricing/lease_contract_length` | La durée pendant laquelle la RI est réservée. |
| `pricing/purchase_option` | La façon dont vous avez choisi de payer le poste (telle que `All Upfront`). |
| `pricing/term` | Si votre utilisation AWS est `Reserved` ou `On-Demand`. |
| `pricing/unit` | L'unité de tarification qu'AWS a utilisée pour calculer le coût d'utilisation (telle que `Hours`). |
| `reservation/availability_zone` | La zone de disponibilité de la ressource associée au poste (telle que `us-east-1`). |
| `reservation/modification_status` | Indique si le bail RI a été modifié ou est resté inchangé (tel que `Manual`). |
| `reservation/reservation_arn` | L'ARN de la RI dont le poste a bénéficié. |
| `reservation/subscription_id` | L'ID unique qui associe le poste à l'offre correspondante. |
| `savings_plan/instance_type_family` | La famille d'instances associée à l'utilisation spécifiée (telle que `m4`). |
| `savings_plan/offering_type` | Le type de Savings Plan acheté (tel que `ComputeSavingsPlans`). |
| `savings_plan/payment_option` | Les options de paiement disponibles pour le Savings Plan (telles que `All Upfront`). |
| `savings_plan/purchase_term` | Décrit la durée ou le terme du Savings Plan (tel que `1yr`). |
| `savings_plan/region` | La région AWS qui héberge les services AWS (telle que `US East (N. Virginia)`). |
| `savings_plan/savings_plan_arn` | L'identifiant unique du Savings Plan. |

#### Corrélation entre coûts et observabilité : {#cost-and-observability-correlation}

Visualiser les coûts dans le contexte des données d'observabilité est important pour comprendre comment les changements d'infrastructure impactent les coûts, identifier pourquoi les coûts changent et optimiser l'infrastructure à la fois pour les coûts et les performances. Datadog met à jour les tags d'identification des ressources sur les données de coût pour les principaux produits AWS afin de simplifier la corrélation entre l'observabilité et les métriques de coût.

Par exemple, pour afficher le coût et l'utilisation de chaque base de données RDS, vous pouvez créer un tableau avec `aws.cost.amortized`, `aws.rds.cpuutilization` et `aws.rds.freeable_memory` (ou toute autre métrique RDS) et effectuer un regroupement par `dbinstanceidentifier`. Pour visualiser l'utilisation et les coûts de Lambda côte à côte, vous pouvez représenter graphiquement `aws.lambda.concurrent_executions` et `aws.cost.amortized` regroupés par `functionname`.

Les balises prêtes à l'emploi suivantes sont disponibles :

| Produit AWS                  | Tag       |
| ---------------------------- | ----------------- |
| ec2                | `instance_id`|
| s3         | `bucketname`|
| rds         | `dbinstanceidentifier`|
| lambda         | `functionname`|
| dynamodb         | `tablename`|
| elasticache      | `cacheclusterid`|
| cloudfront (distribution)  | `distributionid`|
| cloudfront (fonction)  | `functionname`|
| ec2 natgateway | `natgatewayid`|
| redshift         | `clusteridentifier`|
| kinesis         | `streamname`|
| queue         | `queuename`|
| sns         | `topicname`|
| elb (application, passerelle, réseau) | `loadbalancer`|
| elb (tous les autres coûts) | `loadbalancername` |

### Orchestrateurs de conteneurs {#container-orchestrators}

L'allocation des coûts des conteneurs ajoute des tags provenant des charges de travail qui génèrent des coûts. Les exemples incluent des tags provenant de pods et de nœuds Kubernetes ainsi que de tâches et de conteneurs ECS.

_Nécessite [l'allocation des coûts des conteneurs][11] et s'applique uniquement aux métriques `shared.resources.allocated`._

### Pipelines de tags {#tag-pipelines}

Enfin, tous les ensembles de règles de votre [pipeline de tags][15] sont appliqués, ce qui permet une décomposition complète des coûts lorsque l'ajout des tags d'infrastructure n'est pas possible. Les pipelines de tags constituent la couche d'enrichissement finale et ajoutent de nouveaux tags à vos données de coûts.

## Billing Conductor {#billing-conductor}
[AWS Billing Conductor][16] est un service de facturation personnalisé destiné aux partenaires de distribution AWS Marketplace et aux organisations ayant des exigences de refacturation.
Billing Conductor permet aux clients de créer une seconde version pro forma de leurs coûts afin de la partager avec leurs clients ou les propriétaires de comptes.
Les tarifs de facturation, les crédits et frais, ainsi que les frais généraux peuvent être personnalisés à votre discrétion. Vous pouvez également sélectionner les comptes à inclure dans le CUR.

**Limitations importantes** :
- Les rapports de coûts et d'utilisation pro forma n'incluent pas les remises et les taxes, ce qui rend difficile la comparaison des coûts dans Datadog avec AWS Cost Explorer.
- L'ajout de comptes à un groupe de facturation a une incidence sur la manière dont les réservations et les Savings Plans sont partagés entre les comptes AWS.

Pour créer un CUR Billing Conductor, suivez le [guide de l'utilisateur AWS Cost and Usage Reports][8]. Assurez-vous que le CUR répond aux [exigences de Datadog][9].
Une fois le CUR Billing Conductor créé, suivez les instructions de Cloud Cost Management ci-dessus pour le configurer dans Datadog.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: /fr/cloud_cost_management/setup/aws/#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: /fr/cloud_cost_management/container_cost_allocation/#applying-tags
[12]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[13]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
[14]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
[15]: /fr/cloud_cost_management/allocation/tag_pipelines
[16]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[17]: https://app.datadoghq.com/cost/settings/accounts
[18]: /fr/help/
[19]: /fr/cloud_cost_management/tags
[20]: https://docs.aws.amazon.com/cur/latest/userguide/troubleshooting.html#backfill-data
[21]: /fr/api/latest/cloud-cost-management/#create-cloud-cost-management-aws-cur-config
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/aws_cur_config
[30]: /fr/cloud_cost_management/recommendations/
[31]: https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html
[32]: /fr/integrations/amazon_web_services/
[33]: https://docs.aws.amazon.com/cur/latest/userguide/table-dictionary-cur2.html