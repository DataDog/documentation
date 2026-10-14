---
description: Instrumentez vos instances Amazon EC2 et vos fonctions AWS Lambda directement
  depuis l'intégration AWS, sans vous connecter à chaque host ni redéployer chaque
  fonction.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: Documentation
  text: Fonctionnement de l'instrumentation Datadog via l'intégration AWS
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentation
  text: Intégration AWS
- link: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/
  tag: Documentation
  text: Guide de configuration manuelle AWS
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: Pourquoi installer Datadog Agent sur vos instances cloud ?
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: https://docs.datadoghq.com/agent/configuration/
  tag: Documentation
  text: Configuration de l'Agent
- link: https://docs.datadoghq.com/serverless/aws_lambda/
  tag: Documentation
  text: Serverless Monitoring pour AWS Lambda
- link: https://docs.datadoghq.com/serverless/aws_lambda/configuration/
  tag: Documentation
  text: Configurer Serverless Monitoring pour AWS Lambda
- link: https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/
  tag: Documentation
  text: Instrumentation d'AWS Lambda
- link: https://docs.datadoghq.com/serverless/aws_lambda/troubleshooting/
  tag: Documentation
  text: Dépannage de la surveillance AWS Lambda
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: Documentation
  text: Fédération d'identités de charges de travail
private: true
title: Installez l'instrumentation Datadog via l'intégration AWS
---
## Présentation {#overview}

L'[intégration AWS][1] collecte des métriques, des événements et des logs depuis Amazon CloudWatch sans rien installer sur vos ressources. L'instrumentation Datadog collecte des données de télémétrie depuis l'intérieur de vos workloads AWS que CloudWatch seul ne peut pas fournir, notamment des métriques au niveau du host, des traces distribuées (APM), des processus en direct et des logs détaillés.

Vous pouvez instrumenter vos workloads AWS directement depuis Datadog, sans vous connecter à chaque host ni redéployer chaque fonction. Activez l'instrumentation lors de la configuration de l'intégration AWS, ou à tout moment par la suite.

## Workloads pris en charge {#supported-workloads}

| Workload | Ce que Datadog installe |
|---|---|
| Instances Amazon EC2 | Le Datadog Agent |
| Fonctions AWS Lambda | L'extension Lambda Datadog et, pour les runtimes pris en charge, la couche de tracing Datadog correspondant au runtime de la fonction |

Amazon EKS n'est pas pris en charge. Pour les fonctions Lambda, Datadog propose également l'instrumentation à distance, un produit distinct. Pour décider laquelle utiliser, consultez la section suivante.

<div class="alert alert-warning">Une fonction Lambda ne peut être gérée que par un seul produit d'instrumentation Datadog. Datadog ignore toute fonction déjà gérée par l'instrumentation à distance, ainsi que toute fonction que vous avez instrumentée vous-même.</div>

## Choisissez entre l'intégration AWS et l'instrumentation à distance {#choose-between-the-aws-integration-and-remote-instrumentation}

Datadog propose deux moyens d'ajouter l'instrumentation aux fonctions Lambda sans avoir à les redéployer vous-même :

- **L'instrumentation via l'intégration AWS**, couverte par ce guide, est entièrement gérée depuis Datadog. Datadog met à jour vos fonctions avec le rôle IAM de l'intégration AWS créé par la stack CloudFormation, et ne déploie aucune ressource de calcul dans votre compte.
- **[Instrumentation à distance][9]** déploie une fonction d'instrumentation Datadog, `datadog-remote-instrumenter`, dans votre propre compte. Cette fonction applique l'instrumentation et la maintient en place.

Les deux ajoutent la même extension Datadog Lambda et les mêmes couches de traçage, et les deux restaurent l'instrumentation qui est modifiée en dehors de Datadog. Ils diffèrent par l'endroit où le travail s'exécute, la manière dont les fonctions sont sélectionnées et ce que vous installez.

| Aspect | Instrumentation via l'intégration AWS | Instrumentation à distance |
|---|---|---|
| Charges de travail | Instances Amazon EC2 et fonctions AWS Lambda | Fonctions AWS Lambda |
| Ce qui s'exécute dans votre compte | Aucune ressource de calcul Datadog en cours d'exécution. Datadog appelle les API AWS avec le rôle IAM d'intégration AWS créé par la pile CloudFormation | La fonction Lambda d'instrumentation |
| Périmètre de la configuration | Une pile CloudFormation par compte AWS | Une pile CloudFormation par compte et par région |
| Sélection des fonctions | Vous rédigez une requête sur les attributs des fonctions, sélectionnez des fonctions spécifiques ou ajoutez toutes les fonctions éligibles. Datadog affiche l'ensemble correspondant avant que vous n'enregistriez | Vous rédigez des règles de ciblage sur les noms et les tags des fonctions, avec des opérateurs logiques |
| Fonctions correspondant ultérieurement | Instrumentées automatiquement, qu'elles aient été créées après l'enregistrement de la règle ou qu'elles aient commencé à correspondre après un changement de tag | Instrumentées automatiquement lorsqu'elles correspondent à vos règles de ciblage |
| Versions de couche | Datadog les sélectionne et les met à jour | Vous les définissez, et elles restent fixes jusqu'à ce que vous les modifiiez |
| Comment les fonctions instrumentées s'authentifient | [Fédération d'identité de charge de travail][16], sans clé d'API Datadog sur la fonction | Une clé d'API Datadog avec Remote Configuration activé |
| Autorisations Datadog | Lecture des hosts et installation de l'Agent | Lecture et écriture de l'instrumentation AWS Serverless |
| Suppression de l'instrumentation | Supprimer de Datadog | Supprimer la pile CloudFormation dans cette région |

Les deux produits déploient une pile CloudFormation dans votre compte. La pile pour l'instrumentation à distance crée également un journal CloudTrail et des ressources de support. Pour ce que la pile de ce guide crée, y compris les ressources EventBridge qui envoient des événements de changement à Datadog, consultez [Comment fonctionne l'instrumentation Datadog via l'intégration AWS][6].

Utilisez l'instrumentation via l'intégration AWS lorsque vous souhaitez instrumenter à la fois des instances EC2 et des fonctions Lambda à partir d'un seul endroit, ou lorsque vous souhaitez restreindre la liste des fonctions par région, environnement d'exécution et taille de mémoire.

Utilisez l'instrumentation à distance lorsque vous souhaitez effectuer une correspondance sur les tags dans `DD_TAGS`, ou lorsque vous souhaitez définir les versions de couche appliquées à vos fonctions et les maintenir fixes. Les deux produits peuvent correspondre aux tags de ressources AWS.

## Prérequis {#prerequisites}

Pour toutes les charges de travail, confirmez ce qui suit :

- **Accès CloudFormation** : vous pouvez approuver une stack CloudFormation dans le compte AWS cible. L'instrumentation déploie une pile dans votre compte, vous (ou un membre de votre équipe) avez donc besoin d'une autorisation pour l'examiner et la créer. Pour connaître les autorisations requises et les raisons pour lesquelles elles sont nécessaires, consultez la section [Autorisations AWS requises](#required-aws-permissions).
- **Autorisations Datadog** : L'affichage des règles d'instrumentation nécessite l'autorisation **Hosts Read**. La création, la modification ou la suppression de règles nécessite l'autorisation **Agent Install**.

### Instances Amazon EC2 {#amazon-ec2-instances}

- **Agent SSM** : l'[Agent AWS Systems Manager (SSM)][2] doit déjà être présent sur les instances cibles. Datadog installe l'Agent via SSM et ne peut pas installer l'Agent SSM pour vous ; les instances créées à partir d'AMI personnalisées sans l'Agent SSM ne sont donc pas éligibles. Datadog signale ces instances afin que vous puissiez y remédier.
- **Plateformes prises en charge** : Linux (x86_64 et arm64) et Windows (x86_64). macOS et Windows sur arm64 ne sont pas pris en charge.

### Fonctions AWS Lambda {#aws-lambda-functions}

- **Collecte de ressources** : [Resource collection][10] doit être activée sur l'intégration AWS. Datadog l'utilise pour lister vos fonctions et prévisualiser celles auxquelles une règle correspond.
- **Partition AWS** : La fonction doit se trouver dans la partition `aws` commerciale. Les fonctions dans les partitions AWS GovCloud ou AWS Chine ne sont pas prises en charge, car l'instrumentation Lambda s'authentifie via [Workload Identity Federation][16], qui ne prend pas en charge ces partitions.
- **Type de package** : La fonction doit utiliser le type de package Zip. Les fonctions d'image de conteneur ne sont pas prises en charge, car l'instrumentation Datadog est distribuée sous forme de couches Lambda, que les fonctions d'image de conteneur ne peuvent pas utiliser.
- **Architecture** : La fonction doit utiliser une architecture unique, soit `x86_64` ou `arm64`.
- **Lambda@Edge** : La fonction ne doit pas être une fonction Lambda@Edge. Datadog exclut à la fois les réplicas et les fonctions qu'ils répliquent.
- **Nombre de couches** : AWS limite une fonction à cinq couches. Datadog ajoute deux couches, ou une pour les runtimes OS uniquement, la fonction doit donc disposer de l'espace nécessaire pour les accueillir après ses couches existantes.
- **Runtimes pris en charge** :

  | Runtime | Versions |
  |---|---|
  | Node.js | 16.x, 18.x, 20.x, 22.x, 24.x, 26.x |
  | Python | 3.8, 3.9, 3.10, 3.11, 3.12, 3.13, 3.14 |
  | Ruby | 3.2, 3.3, 3.4, 4.0 |
  | Java | 8 (`java8` et `java8.al2`), 11, 17, 21, 25 |
  | .NET | 6, 8, 10 |
  | OS uniquement | `provided.al2` et `provided.al2023` (couche d'extension uniquement, pas de couche de traçage) |

Datadog marque toute fonction qui ne remplit pas ces conditions comme inéligible dans l'aperçu de la règle, afin que vous puissiez voir ce qui est exclu avant d'appliquer une règle.

## Autorisations AWS requises {#required-aws-permissions}

{{% aws-agent-installation %}}

Les sections suivantes listent les autorisations que toutes les charges de travail partagent, suivies des autorisations spécifiques à chaque charge de travail.

### Modifier les autorisations de notification {#change-notification-permissions}

Ces autorisations permettent à Datadog de réagir aux changements apportés à vos ressources AWS. Elles s'appliquent à toutes les charges de travail :

| Autorisation | Pourquoi Datadog en a besoin |
|---|---|
| `events:PutRule`, `events:PutTargets`, `events:DescribeRule`, `events:ListTargetsByRule`, `events:RemoveTargets`, `events:DeleteRule` | Configurez les notifications de changement qui permettent à Datadog de réagir aux changements de ressources |
| `iam:GetRole`, `iam:PassRole` | Lire et transmettre le rôle inter-région EventBridge. Les deux sont limités au rôle `datadog-eventbridge-cross-region-role`, et `iam:PassRole` est en outre limité au service EventBridge |

### Autorisations Amazon EC2 {#amazon-ec2-permissions}

| Autorisation | Pourquoi Datadog en a besoin |
|---|---|
| `ec2:DescribeInstances` | Trouver vos instances et vérifier lesquelles correspondent à votre règle (état, tags, système d'exploitation, architecture) |
| `ssm:DescribeInstanceInformation` | Confirmer que le SSM Agent est en cours d'exécution avant que Datadog ne tente quoi que ce soit |
| `ssm:GetDocument`, `ssm:CreateDocument`, `ssm:UpdateDocument`, `ssm:UpdateDocumentDefaultVersion` | Publier le script d'installation dans votre compte et le maintenir à jour |
| `ssm:SendCommand`, `ssm:ListCommandInvocations` | Exécutez l'installation et confirmez lorsqu'elle se termine |
| `secretsmanager:DescribeSecret`, `secretsmanager:CreateSecret` | Stockez la clé d'API afin qu'elle ne soit jamais transmise dans une commande |
| `iam:CreateRole`, `iam:CreateInstanceProfile`, `iam:AddRoleToInstanceProfile`, `iam:AttachRolePolicy`, `iam:PutRolePolicy`, `iam:PassRole`, `ec2:AssociateIamInstanceProfile`, et les autorisations de lecture correspondantes `Get` et `List` | Donnez à une instance l'accès minimal dont elle a besoin au cas où elle n'aurait pas de rôle IAM : accessible par Systems Manager, et capable de lire son propre secret de clé d'API |
| `iam:Detach*`, `iam:Delete*`, `iam:RemoveRoleFromInstanceProfile`, `ec2:Disassociate*`, `ec2:DescribeIamInstanceProfileAssociations` | Annulez proprement les ressources ci-dessus lors de la désinstallation |
| `ecs:ListClusters`, `ecs:ListContainerInstances` | Reconnaître les instances de conteneur Amazon Elastic Container Service (ECS) afin que Datadog les ignore (elles sont gérées au niveau du cluster) |

`iam:CreateRole` et `iam:PassRole` sont les autorisations les plus sensibles. `iam:CreateRole` est restreint aux noms de rôle correspondant à `datadog-ec2-instrumenter/datadog-ssm-*` dans votre compte, et `iam:PassRole` est en outre restreint au service Amazon EC2.

### Autorisations AWS Lambda {#aws-lambda-permissions}

| Autorisation | Pourquoi Datadog en a besoin |
|---|---|
| `lambda:ListFunctions` | Trouvez les fonctions dans votre compte et votre région |
| `cloudfront:ListDistributions` | Identifier les fonctions Lambda@Edge afin que Datadog les ignore |
| `lambda:GetFunctionConfiguration`, `lambda:ListTags` | Lire la configuration et les tags d'une fonction pour vérifier quelles fonctions correspondent à votre règle |
| `lambda:UpdateFunctionConfiguration` | Ajouter les couches et les variables d'environnement Datadog, et les supprimer lors de la désinstallation |
| `lambda:GetLayerVersion` | Satisfaire à l'exigence AWS selon laquelle chaque couche soumise lors d'une mise à jour de fonction doit être autorisée, y compris vos propres couches inchangées |

L'instrumentation Lambda ne nécessite ni Secrets Manager, ni Systems Manager, ni autorisations d'écriture IAM. Les lectures et mises à jour des fonctions sont limitées aux fonctions Lambda de votre propre compte.

## Fonctionnement {#how-it-works}

L'instrumentation est basée sur une **règle d'instrumentation** : un compte AWS associé à une requête qui décrit les ressources à couvrir. Datadog évalue la requête, instrumente chaque ressource couverte au sein de votre propre compte et la maintient instrumentée :

1. Vous rédigez une requête décrivant les ressources à couvrir, sélectionnez des ressources spécifiques ou ajoutez toutes les ressources éligibles.
1. Datadog évalue la règle par rapport à votre compte et enregistre les ressources qu'elle couvre.
1. Datadog instrumente chaque ressource couverte : sur EC2, en installant l'Agent via AWS Systems Manager ; sur Lambda, en ajoutant les couches Datadog et les variables d'environnement à la fonction.
1. Datadog maintient les ressources couvertes instrumentées, en réinstallant l'instrumentation manquante et en réessayant toute opération ayant échoué.

Vous approuvez une pile CloudFormation, une seule fois, lors de la configuration initiale. Après cela, l'instrumentation s'exécute automatiquement depuis Datadog, sans nouveau modèle CloudFormation à lancer.

Pour obtenir tous les détails techniques et de sécurité, y compris les ressources AWS créées par Datadog, le mécanisme d'instrumentation et la manière dont Datadog maintient l'instrumentation en place, consultez [Fonctionnement de l'instrumentation Datadog via l'intégration AWS][6].

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Organigramme du processus d'installation de l'Agent AWS, montrant quelles étapes se déroulent dans Datadog et lesquelles s'exécutent au sein de votre compte AWS." style="width:70%;" >}}

<!-- TODO(DOCS-14545): the "How it works" diagram shows the EC2 flow only. Add a Lambda equivalent (or a workload-agnostic version) before publish. -->

### Choisissez la manière dont votre règle fait correspondre les ressources {#choose-how-your-rule-matches-resources}

Comme Datadog réévalue la règle au fil du temps, la requête que vous rédigez détermine comment la couverture se comporte à mesure que votre infrastructure évolue.

**Pour couvrir les ressources au fur et à mesure de leur apparition**, faites correspondre les tags et les attributs déjà présents dans votre infrastructure, tels que `env:prod`. Toute ressource correspondante est instrumentée, y compris les ressources créées ou dont les tags ont été modifiés après l'enregistrement de la règle. Utilisez cette option lorsque vous souhaitez que les nouvelles ressources correspondantes soient surveillées automatiquement sans mettre à jour la règle.

**Pour couvrir un ensemble fixe**, sélectionnez les ressources individuellement dans la liste des ressources. La règle ne correspond qu'aux ressources que vous avez sélectionnées, de sorte que les ressources qui apparaissent ultérieurement ne sont pas ajoutées.

**Lorsqu'un ensemble fixe est trop volumineux pour être sélectionné individuellement**, faites correspondre un tag que vous contrôlez, tel que `datadog:true`. Appliquez ce tag uniquement aux ressources que vous souhaitez instrumenter. La couverture ne change alors que lorsque vous modifiez les tags, de sorte que votre infrastructure en tant que code détermine quelles ressources sont couvertes.

<div class="alert alert-warning">
La couverture fonctionne dans les deux sens. Lorsqu'une ressource cesse de correspondre à la règle, Datadog en supprime l'instrumentation. Un changement de tag effectué dans AWS peut donc supprimer la surveillance d'une ressource sans que personne ne modifie la règle dans Datadog.
</div>

### Bonnes pratiques pour les règles et les tags {#best-practices-for-rules-and-tags}

**Faites correspondre les tags que votre équipe possède.** Lorsqu'une règle correspond à un tag qu'une autre équipe contrôle, cette équipe peut ajouter ou supprimer la surveillance en changeant les tags, sans ouvrir Datadog. Conserver le tag et la règle sous le même contrôle permet de laisser la décision aux personnes qui en sont responsables.

**Évitez les tags qui changent au cours des opérations normales.** Les tags qui changent lors d'une promotion d'environnement, d'un déploiement ou d'un modèle d'autoscaling peuvent faire entrer et sortir des ressources de la couverture. Faites correspondre les attributs qui restent stables pendant toute la durée de vie de la ressource.

**Traitez la règle comme la configuration complète du compte.** Chaque compte AWS possède une règle par type de ressource. Chaque modification redéfinit le périmètre de toute la couverture pour ce type de ressource au lieu de s'ajouter à la couverture existante. Examinez les ressources correspondantes avant d'enregistrer.

**Définissez des exceptions avec des exclusions.** Lorsqu'une règle générale couvre des ressources que vous souhaitez ignorer, excluez-les de la même règle au lieu de passer à une liste sélectionnée individuellement. Les exclusions permettent de garder la règle lisible et de préserver la couverture automatique pour tout le reste.

## Ce que Datadog modifie sur une fonction Lambda {#what-datadog-changes-on-a-lambda-function}

Datadog préserve vos couches et variables d'environnement existantes. Pour les fonctions Node.js et Python, Datadog redirige le gestionnaire vers le gestionnaire Datadog et conserve votre gestionnaire d'origine dans une variable d'environnement. Datadog enregistre exactement ce qu'il a modifié, de sorte que la désinstallation restaure votre configuration d'origine. Pour connaître les couches, variables d'environnement et modifications de gestionnaire spécifiques effectuées par Datadog, consultez [What Datadog changes on a function][17] dans la documentation technique.

**Aucune clé d'API Datadog n'est écrite dans votre fonction.** L'extension s'authentifie avec le rôle d'exécution de la fonction via [Workload Identity Federation][16], de sorte qu'aucune information d'identification Datadog n'est stockée dans votre compte pour l'instrumentation Lambda. Datadog configure cette authentification pour vous, il n'y a donc rien à configurer.

Pour ajuster ce que l'extension collecte, définissez les variables d'environnement Datadog standard sur la fonction. Pour la liste complète, consultez [Configure Serverless Monitoring for AWS Lambda][14]. Pour savoir ce que l'instrumentation collecte et les fonctionnalités de surveillance Lambda qu'elle active, consultez [Serverless Monitoring for AWS Lambda][13].

## Installer l'instrumentation Datadog {#install-datadog-instrumentation}

Vous pouvez démarrer l'instrumentation à partir de deux points d'entrée, selon le degré de contrôle que vous souhaitez avoir sur les ressources instrumentées :

- **Configuration de l'intégration AWS (instrumenter toutes les ressources éligibles)** : lorsque vous [configurez l'intégration AWS][5], activez le bouton d'instrumentation sur la [page d'intégration AWS][7], à côté de la collecte des logs et des ressources. Sélectionnez ensuite les charges de travail que vous souhaitez. Datadog instrumente toutes les ressources éligibles pour ces charges de travail et continue d'instrumenter les ressources éligibles à mesure qu'elles apparaissent.
- **Fleet Automation (instrumenter des ressources spécifiques)** : Ouvrez la [AWS Install Agents page][8] à tout moment pour sélectionner les ressources spécifiques que vous souhaitez.

<!-- TODO(DOCS-14545): per AWS team, surfacing the install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

Le bouton d'instrumentation apparaît lors de la configuration, avec un sélecteur de charge de travail répertoriant **les instances EC2**, **les fonctions Lambda** et **les clusters EKS**. Seules **les instances EC2** et **les fonctions Lambda** peuvent être sélectionnées :

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="L'étape d'installation de Datadog Agent dans la configuration AWS, avec l'option d'installation activée et l'option de charge de travail Hosts (EC2) activée." style="width:80%;" >}}

<!-- TODO(DOCS-14545): the setup-toggle screenshot predates the Lambda workload. Recapture it showing EC2 Instances, Lambda Functions, and EKS Clusters (Coming Soon) before publish. -->

Pour installer à partir de la page d'installation des agents AWS :

1. Sélectionnez la charge de travail que vous souhaitez instrumenter : **instances EC2** ou **fonctions Lambda**.
1. Rédigez une requête décrivant les ressources à couvrir, sélectionnez des ressources spécifiques dans la liste ou ajoutez toutes les ressources éligibles. Pour Lambda, vous pouvez restreindre la liste par région, environnement d'exécution et taille de mémoire.
1. Examinez l'aperçu des ressources correspondantes. Les ressources que Datadog ne peut pas instrumenter apparaissent comme inéligibles, avec le motif.
1. Examinez la pile CloudFormation générée, puis continuez vers AWS et créez-la. Datadog ne vous le demande qu'une seule fois.
1. Retournez à Datadog. L'instrumentation se déroule automatiquement et Datadog signale la progression à mesure que les ressources sont instrumentées.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## Vérifier l'instrumentation {#verify-instrumentation}

Une fois l'instrumentation terminée :

- **EC2** : Les agents nouvellement installés apparaissent dans la [Liste d'infrastructure][3] et sur la Hostmap. Fleet Automation répertorie les mêmes agents dans la Fleet View.
- **Lambda** : Les fonctions instrumentées apparaissent sur la page [Serverless][11] et leurs traces apparaissent dans [APM][12]. Si une fonction est instrumentée mais que sa télémétrie n'arrive pas, consultez [Dépannage de la surveillance AWS Lambda][15].

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## Gérer les ressources instrumentées {#manage-instrumented-resources}

Utilisez la [AWS Install Agents page][8] dans Fleet Automation pour gérer les ressources que vous avez instrumentées via l'intégration AWS.

Depuis cette page, vous pouvez :

- Afficher les ressources instrumentées et leur état.
- Instrumenter de nouvelles ressources dans votre environnement AWS.
- Supprimez l'instrumentation des ressources que vous ne souhaitez plus surveiller.

La règle est la source de vérité. Pour arrêter la couverture, mettez à jour la règle. Si vous supprimez vous-même l'instrumentation d'une ressource couverte, Datadog la restaure. Pour EC2, gérez la configuration de l'Agent et les mises à niveau de version via [Fleet Automation][4]. Pour Lambda, Datadog met à jour les versions des couches automatiquement.

## Supprimer l'instrumentation Datadog {#remove-datadog-instrumentation}

Pour supprimer l'instrumentation, retirez les ressources d'une règle, modifiez la requête de la règle ou supprimez la règle. La suppression d'une règle retire l'instrumentation de tout ce que la règle couvrait.

- **EC2** : Datadog supprime le Datadog Agent ainsi que tout rôle IAM ou profil d'instance qu'il a créé pour chaque instance.
- **Lambda** : Datadog supprime les couches qu'il a ajoutées et restaure les variables d'environnement et le gestionnaire dont la fonction disposait auparavant. Les couches et les variables d'environnement que vous avez ajoutées vous-même sont laissées en place.

## Dépannage {#troubleshooting}

### L'Agent SSM n'est pas présent sur une instance EC2 {#the-ssm-agent-is-not-present-on-an-ec2-instance}

L'installation de l'Agent sur EC2 repose sur l'Agent AWS Systems Manager (SSM), que Datadog ne peut pas installer pour vous. Datadog signale toute instance qui en est dépourvue comme inéligible, y compris celles créées à partir d'AMI personnalisées. Installez l'Agent SSM sur l'instance, puis réessayez. Consultez [Travailler avec SSM Agent][2] dans la documentation AWS.

### Une erreur de permission ou IAM se produit {#a-permission-or-iam-error-occurs}

Si l'instrumentation ne peut pas se terminer en raison d'autorisations manquantes, Datadog affiche une notification renvoyant à la ressource CloudFormation qui nécessite la nouvelle autorisation. Mettez à jour votre stack existante pour accorder les [autorisations requises](#required-aws-permissions). Vous n'avez pas besoin de créer une nouvelle stack.

### Une fonction Lambda est ignorée car déjà instrumentée {#a-lambda-function-is-skipped-as-already-instrumented}

Datadog ignore toute fonction qui comporte des couches Datadog, un gestionnaire Datadog ou des variables d'environnement Datadog que Datadog n'a pas appliquées. Ignorer ces fonctions permet d'éviter les conflits de couches et de configuration. Pour gérer la fonction depuis l'intégration AWS à la place, supprimez l'instrumentation Datadog existante. Datadog instrumente alors la fonction automatiquement.

Les fonctions gérées par [instrumentation à distance][9] sont également ignorées, et Datadog vous indique laquelle des deux situations s'applique. Une fonction ne peut être gérée que par un seul produit d'instrumentation Datadog.

### Une fonction Lambda dépasse la limite de couches {#a-lambda-function-exceeds-the-layer-limit}

AWS limite une fonction à cinq couches, et Datadog ajoute deux couches, ou une seule pour les runtimes OS uniquement. Lorsqu'une fonction comporte déjà suffisamment de couches pour que l'instrumentation dépasse la limite, Datadog le signale et s'arrête au lieu de réessayer. Supprimez une couche de la fonction pour libérer de l'espace. Datadog instrumente alors la fonction automatiquement.

### Une fonction Lambda utilise un wrapper d'exécution non-Datadog {#a-lambda-function-uses-a-non-datadog-execution-wrapper}

Ensembles d'instrumentation Java et .NET `AWS_LAMBDA_EXEC_WRAPPER`. Lorsqu'une fonction définit déjà cette variable sur une valeur autre que le wrapper Datadog, Datadog ignore la fonction plutôt que d'écraser votre wrapper. Pour instrumenter la fonction via l'intégration AWS, supprimez le wrapper personnalisé de la fonction. Si la fonction a besoin de son propre wrapper, instrumentez-la vous-même ; consultez [Instrumenting AWS Lambda][18].

### Une fonction Lambda apparaît comme inéligible {#a-lambda-function-appears-as-ineligible}

Datadog marque une fonction comme inéligible lorsqu'elle ne répond pas aux [prérequis Lambda](#aws-lambda-functions). Les raisons les plus courantes sont un type de package d'image de conteneur, un runtime ou une architecture non pris en charge, une fonction en dehors de `aws` la partition commerciale, et les fonctions Lambda@Edge. Les réplicas Lambda@Edge et les fonctions qu'ils répliquent sont tous deux exclus.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: https://docs.datadoghq.com/fr/agent/fleet_automation/
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/aws/
[6]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation-technical-reference/
[7]: https://app.datadoghq.com/integrations/amazon-web-services
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aws
[9]: https://docs.datadoghq.com/fr/serverless/aws_lambda/remote_instrumentation/
[10]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#resource-collection
[11]: https://app.datadoghq.com/functions
[12]: https://app.datadoghq.com/apm/traces
[13]: https://docs.datadoghq.com/fr/serverless/aws_lambda/
[14]: https://docs.datadoghq.com/fr/serverless/aws_lambda/configuration/
[15]: https://docs.datadoghq.com/fr/serverless/aws_lambda/troubleshooting/
[16]: https://docs.datadoghq.com/fr/account_management/workload_identity_federation/
[17]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation-technical-reference/#what-datadog-changes-on-a-function
[18]: https://docs.datadoghq.com/fr/serverless/aws_lambda/instrumentation/