---
cascade:
  algolia:
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
further_reading:
- link: /cloud_cost_management/aws/
  tag: Documentation
  text: Cloud Cost Management pour AWS
- link: /monitors/types/cloud_cost/
  tag: Documentation
  text: Créez un monitor Cloud Cost
- link: /cloud_cost_management/tags/
  tag: Documentation
  text: En savoir plus sur les tags dans Cloud Cost Management
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: Blog
  text: Gagnez en visibilité et en contrôle sur vos dépenses cloud avec Datadog Cloud
    Cost Management
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analysez rapidement et de manière exhaustive les coûts cloud et SaaS liés
    à vos services
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Principaux enseignements de l'étude sur l'état des coûts cloud
title: AWS Cloud Cost pour les partenaires MSP
---
## Présentation {#overview}

Ce guide explique comment les fournisseurs de services gérés (MSP) AWS configurent AWS Billing Conductor et génèrent des rapports de coûts et d'utilisation (CUR) pro forma afin que le compte membre d'un client puisse être connecté à Datadog CCM sans exposer le compte de gestion du MSP.

Les étapes sur cette page sont divisées entre ce que **vous (le partenaire MSP)** configurez et ce que **votre client** configure dans son compte membre.

Pour les instructions générales de configuration de CCM (non-MSP), consultez le [guide de configuration Datadog CCM AWS][1].

## À propos d'AWS Billing Conductor {#about-aws-billing-conductor}
[AWS Billing Conductor][2] est un service de facturation personnalisé pour les partenaires de distribution AWS Marketplace et les organisations ayant des exigences de refacturation.
Billing Conductor permet aux clients de créer une seconde version pro forma de leurs coûts afin de la partager avec leurs clients ou les propriétaires de comptes.
Les tarifs de facturation, les crédits et frais, ainsi que les frais généraux peuvent être personnalisés à votre discrétion. Vous pouvez également sélectionner les comptes à inclure dans le CUR.

<div class="alert alert-warning">
- Les rapports de coûts et d'utilisation pro forma n'incluent pas les remises et les taxes, ce qui rend difficile la comparaison des coûts dans Datadog avec AWS Cost Explorer.<br>
- L'ajout de comptes à un groupe de facturation modifie la façon dont les Reservations et les Savings Plans sont partagés, ce qui peut entraîner des différences de coûts au niveau du compte.<br>
- Datadog Cloud Cost Management est particulièrement adapté au suivi des tendances des coûts, à la détection des anomalies, aux recommandations d'optimisation et aux processus FinOps, plutôt qu'au remplacement des factures AWS.
</div>

Pour créer un rapport de coûts et d'utilisation (CUR) avec Billing Conductor, suivez le [guide utilisateur AWS Cost and Usage Reports][3]. Assurez-vous que le CUR répond aux [exigences de Datadog][4].  

## Prérequis {#prerequisites}

Avant de commencer, vérifiez les points suivants :

**Accès MSP**  
Accès au **compte de gestion** pour configurer Billing Conductor ({{< ui >}}Pricing Rules{{< /ui >}}, {{< ui >}}Pricing Plans{{< /ui >}}, {{< ui >}}Billing Groups{{< /ui >}}).

**Autorisations client**  
Le client doit avoir l'autorisation de :
- déployer des piles CloudFormation  
- créer et gérer des rapports de coûts et d'utilisation (CUR)  
- accorder à Datadog l'accès au bucket S3 contenant le CUR  

**Intégration Datadog**  
L'intégration AWS doit être installée pour le **compte membre** dans Datadog.  
Pour plus d'informations, consultez la [configuration de l'intégration AWS][5].

## Configurer AWS Billing Conductor {#configure-aws-billing-conductor}

Ces étapes **doivent être effectuées dans le compte de gestion du MSP**.

### Étape 1 – Créer une règle de tarification {#step-1-create-a-pricing-rule}

Billing Conductor calcule les coûts pro forma en ajustant les **tarifs publics à la demande AWS** à l'aide d'une {{< ui >}}Discount{{< /ui >}} ou d'une {{< ui >}}Markup{{< /ui >}}.

Vous devez choisir explicitement entre ces options :
- {{< ui >}}Discount{{< /ui >}} : applique une remise en pourcentage aux tarifs publics à la demande  
- {{< ui >}}Markup{{< /ui >}} : applique une augmentation en pourcentage aux tarifs publics à la demande  

<div class="alert alert-info">
Saisir 0% (qu'il s'agisse de {{< ui >}}Discount{{< /ui >}} ou de {{< ui >}}Markup{{< /ui >}}) donne lieu à une tarification publique à la demande. La plage autorisée est de 0-100%.
</div>

Par exemple :

| Type | Calcul |
|------|-------------|
| {{< ui >}}Discount{{< /ui >}} (20%) | tarif public à la demande × 0.8 |
| {{< ui >}}Markup{{< /ui >}} (30%) | tarif public à la demande × 1.3 |

### Étape 2 - Créer un plan tarifaire {#step-2-create-a-pricing-plan}

Créez un plan tarifaire et joignez-y la règle de tarification créée à l'étape précédente.  
Un plan tarifaire peut contenir **une seule** règle globale Discount ou Markup.

### Étape 3 - Créer un groupe de facturation {#step-3-create-a-billing-group}

Créez un groupe de facturation et désignez **le compte membre d'un client** comme compte **principal**.
Vous pouvez ajouter un ou plusieurs comptes membres au groupe de facturation, mais seul le compte membre principal génère le CUR pro forma que Datadog ingère.

### Étape 4 - Confirmer les exigences côté client {#step-4-confirm-customer-side-requirements}

Si le client gère son compte membre de manière indépendante, confirmez qu'il comprend qu'il doit :
- déployer le modèle CloudFormation
- créer le CUR dans son compte
- accorder à Datadog l'accès au bucket CUR

## Configurer Datadog Cloud Cost Management {#configure-datadog-cloud-cost-management}

Ces étapes doivent être effectuées par le client dans son **compte membre**.

### Étape 1 - Télécharger le modèle CloudFormation Datadog CCM {#step-1-download-the-datadog-ccm-cloudformation-template}

Les CUR pro forma ne prennent pas en charge l'option `SPLIT_COST_ALLOCATION_DATA`.
En raison de cette limitation, le client doit modifier le modèle avant le déploiement :
1. Téléchargez le [modèle CloudFormation Datadog CCM][6].
2. Supprimez le champ `SPLIT_COST_ALLOCATION_DATA` du modèle.
3. Enregistrez le modèle modifié pour l'utiliser à l'étape suivante.


### Étape 2 - Déployer la pile CloudFormation dans AWS {#step-2-deploy-the-cloudformation-stack-in-aws}

1. Utilisez le modèle ci-dessus et déployez une pile dans le compte membre du client.
2. Pour déployer la pile, suivez la documentation AWS : [Créer une pile à partir de CloudFormation][7]. Lors de la création de la pile, choisissez : {{< ui >}}With new resources (standard){{< /ui >}}.

### Étape 3 - Configurer les paramètres du rapport de coûts et d'utilisation dans AWS {#step-3-configure-the-cost-and-usage-report-settings-in-aws}

Saisissez les informations suivantes lors du déploiement :
- {{< ui >}}Bucket Name{{< /ui >}} : bucket S3 où les fichiers CUR sont stockés  
- {{< ui >}}Bucket Region{{< /ui >}} : région AWS de ce bucket (par exemple, `us-east-1`)  
- {{< ui >}}Export Path Prefix{{< /ui >}} : préfixe de chemin S3 pour les fichiers CUR  
- {{< ui >}}Export Name{{< /ui >}} : nom du rapport de coûts et d'utilisation  

Ces valeurs définissent où AWS écrit le CUR et où Datadog le lit.

### Étape 4 - Saisir les paramètres CUR du compte membre dans Datadog {#step-4-enter-the-member-accounts-cur-parameters-in-datadog}

1. Après avoir déployé la pile CloudFormation, accédez à {{< ui >}}Datadog{{< /ui >}} → {{< ui >}}Cloud Cost{{< /ui >}} → {{< ui >}}Settings{{< /ui >}} → [{{< ui >}}Accounts{{< /ui >}}][8].


   {{< img src="partners/cloud_cost/select_aws_account_ccm.png" alt="Sélectionner le compte AWS pour CCM" style="width:100%;" >}}

2. Sélectionnez le compte membre et saisissez les champs suivants en utilisant les valeurs exactes de **l'étape 3** :
   - {{< ui >}}Bucket Name{{< /ui >}}  
   - {{< ui >}}Bucket Region{{< /ui >}}
   - {{< ui >}}Export Path Prefix{{< /ui >}}
   - {{< ui >}}Export Name{{< /ui >}}

3. Ignorez {{< ui >}}Create CloudFormation stack step{{< /ui >}} (la pile a déjà été déployée à **l'étape 3**).


4. Cliquez sur {{< ui >}}Activate now{{< /ui >}} pour activer CCM pour le compte membre.


{{< img src="partners/cloud_cost/configure_aws_ccm.png" alt="Configurer AWS Cloud Cost Management" style="width:100%;" >}}

Une fois la configuration terminée, le statut du compte est mis à jour comme indiqué ci-dessous.

{{< img src="partners/cloud_cost/complete_aws_ccm.png" alt="Configuration d'AWS Cloud Cost Management terminée" style="width:100%;" >}}

## Validation {#validation}

Après l'activation, vérifiez que les données de coût sont transmises à Datadog :
1. Accédez à [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Cost Explorer{{< /ui >}}][9] dans Datadog.
2. Sélectionnez {{< ui >}}AWS{{< /ui >}} comme fournisseur, puis utilisez des filtres tels que {{< ui >}}Product{{< /ui >}}, {{< ui >}}Member Accoun Id{{< /ui >}} ou d'autres dimensions pour regrouper et valider les données.
3. Confirmez que les données de coût apparaissent pour la plage temporelle attendue.


**Remarque :**  
Il peut s'écouler **48–72 heures** après la génération d'un rapport de coûts et d'utilisation (CUR) avant que les données apparaissent dans Datadog.  
Les CUR utilisent une **granularité horaire** ; la livraison des CUR par AWS et leur traitement par Datadog peuvent donc ne pas être parfaitement synchronisés en temps réel.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/setup/aws/
[2]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[3]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[4]: /fr/cloud_cost_management/setup/aws/?tab=manual#prerequisite-generate-a-cost-and-usage-report
[5]: /fr/getting_started/integrations/aws/#setup
[6]: https://datadog-cloudformation-template.s3.amazonaws.com/aws_cloud_cost/v0.0.5/main.yaml
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html
[8]: https://app.datadoghq.com/cost/setup
[9]: https://app.datadoghq.com/cost/explorer