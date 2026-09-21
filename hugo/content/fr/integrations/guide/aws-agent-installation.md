---
description: Installez et gérez Datadog Agent sur vos instances Amazon EC2 directement
  depuis l'intégration AWS, sans avoir à vous connecter à chaque hôte ni à exécuter
  de scripts par hôte.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: Documentation
  text: Fonctionnement de l'installation de l'Agent via l'intégration AWS
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
private: true
title: Installer Datadog Agent via l'intégration AWS
---
## Présentation {#overview}

L'[intégration AWS][1] collecte des métriques, des événements et des logs depuis Amazon CloudWatch sans rien installer sur vos hôtes. L'installation de Datadog Agent ajoute une télémétrie depuis l'intérieur de vos workloads AWS que CloudWatch seul ne peut pas fournir, notamment des métriques au niveau de l'hôte, des traces distribuées (APM), des processus en temps réel et des logs détaillés.

Vous pouvez déployer l'Agent Datadog sur vos instances Amazon EC2 directement depuis Datadog, sans avoir à vous connecter à chaque hôte ni à exécuter de scripts par hôte. Activez l'installation de l'Agent lors de la configuration de l'intégration AWS, ou à tout moment par la suite.

Amazon EKS n'est pas pris en charge.

## Prérequis {#prerequisites}

Avant de commencer, confirmez les points suivants :

- **Accès CloudFormation** : vous pouvez approuver une stack CloudFormation dans le compte AWS cible. L'installation déploie une stack dans votre compte ; vous (ou un membre de votre équipe) devez donc disposer des autorisations nécessaires pour l'examiner et la créer. Pour connaître les autorisations requises et les raisons pour lesquelles elles sont nécessaires, consultez la section [Autorisations AWS requises](#required-aws-permissions).
- **Agent SSM** : l'[Agent AWS Systems Manager (SSM)][2] doit déjà être présent sur les instances cibles. Datadog installe l'Agent via SSM et ne peut pas installer l'Agent SSM pour vous ; les instances créées à partir d'AMI personnalisées sans l'Agent SSM ne sont donc pas éligibles. Datadog signale ces instances afin que vous puissiez y remédier.
- **Plateformes prises en charge** : Linux (x86_64 et arm64) et Windows (x86_64). macOS et Windows sur arm64 ne sont pas pris en charge.

## Autorisations AWS requises {#required-aws-permissions}

{{% aws-agent-installation %}}

Datadog utilise chacune de ces autorisations pour une tâche spécifique :

| Autorisation | Pourquoi Datadog en a besoin |
|---|---|
| `ec2:DescribeInstances` | Trouver vos instances et vérifier lesquelles correspondent à votre règle (état, étiquettes, système d'exploitation, architecture) |
| `ssm:DescribeInstanceInformation` | Confirmer que le SSM Agent est en cours d'exécution avant que Datadog ne tente quoi que ce soit |
| `ssm:GetDocument`, `ssm:CreateDocument`, `ssm:UpdateDocument`, `ssm:UpdateDocumentDefaultVersion` | Publier le script d'installation dans votre compte et le maintenir à jour |
| `ssm:SendCommand`, `ssm:ListCommandInvocations` | Exécutez l'installation et confirmez lorsqu'elle se termine |
| `secretsmanager:DescribeSecret`, `secretsmanager:CreateSecret` | Stockez la clé d'API afin qu'elle ne soit jamais transmise dans une commande |
| `iam:CreateRole`, `iam:CreateInstanceProfile`, `iam:AddRoleToInstanceProfile`, `iam:AttachRolePolicy`, `iam:PutRolePolicy`, `iam:PassRole`, `ec2:AssociateIamInstanceProfile`, et les autorisations de lecture correspondantes `Get` et `List` | Donnez à une instance l'accès minimal dont elle a besoin au cas où elle n'aurait pas de rôle IAM : accessible par Systems Manager, et capable de lire son propre secret de clé d'API |
| `iam:Detach*`, `iam:Delete*`, `iam:RemoveRoleFromInstanceProfile`, `ec2:Disassociate*`, `ec2:DescribeIamInstanceProfileAssociations` | Annulez proprement les ressources ci-dessus lors de la désinstallation |
| `ecs:ListClusters`, `ecs:ListContainerInstances` | Reconnaître les instances de conteneur Amazon Elastic Container Service (ECS) afin que Datadog les ignore (elles sont gérées au niveau du cluster) |
| `events:PutRule`, `events:PutTargets`, `events:RemoveTargets`, `events:DeleteRule` | Configurer les notifications de changement qui permettent à Datadog de réagir aux modifications des instances |

`iam:CreateRole` et `iam:PassRole` sont les autorisations les plus sensibles. `iam:CreateRole` est restreint aux noms de rôle correspondant à `datadog-ec2-instrumenter/datadog-ssm-*` dans votre compte, et `iam:PassRole` est en outre restreint au service Amazon EC2.

## Fonctionnement {#how-it-works}

L'installation de l'Agent est basée sur une **règle d'installation** : un compte AWS associé à une requête qui décrit les instances EC2 à couvrir. Datadog vérifie régulièrement la règle et installe l'Agent sur chaque instance correspondante dans votre compte AWS :

1. Vous sélectionnez les instances EC2 à couvrir, ou vous choisissez d'inclure toutes les instances éligibles.
1. Datadog identifie les instances couvertes par votre sélection.
1. Datadog installe l'Agent sur chaque instance couverte via AWS Systems Manager, en ajoutant automatiquement toute configuration IAM manquante.
1. Datadog vérifie régulièrement la règle. Les instances qui correspondent ultérieurement, qu'elles soient nouvellement lancées ou nouvellement étiquetées, sont instrumentées automatiquement.

Vous approuvez une pile CloudFormation, une seule fois, lors de la configuration initiale. Par la suite, les installations s'exécutent automatiquement depuis Datadog, sans nouveau modèle CloudFormation à lancer pour chaque installation.

Pour obtenir tous les détails techniques et de sécurité, y compris les ressources AWS créées par Datadog, le mécanisme d'installation et la manière dont Datadog assure la couverture des instances, consultez [Comment fonctionne l'installation de l'Agent via l'intégration AWS][6].

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="Organigramme du processus d'installation de l'Agent AWS, montrant quelles étapes se déroulent dans Datadog et lesquelles s'exécutent au sein de votre compte AWS." style="width:70%;" >}}

### Choisissez comment votre règle correspond aux instances {#choose-how-your-rule-matches-instances}

Comme Datadog revérifie la règle au fil du temps, la requête que vous rédigez détermine comment la couverture se comporte à mesure que votre infrastructure évolue.

**Pour couvrir les instances au fur et à mesure de leur apparition**, faites correspondre les tags et les attributs déjà présents dans votre infrastructure, tels que `env:prod`. Toute instance correspondante est instrumentée, y compris les instances lancées ou dont les tags ont été modifiés après l'enregistrement de la règle. Utilisez cette option lorsque vous souhaitez que les nouvelles instances correspondantes soient surveillées automatiquement sans mettre à jour la règle.

**Pour couvrir un ensemble fixe**, sélectionnez les instances individuellement dans la liste des ressources. La règle ne correspond qu'aux instances que vous avez sélectionnées, ainsi les instances qui apparaissent ultérieurement ne sont pas ajoutées.

**Lorsqu'un ensemble fixe est trop volumineux pour être sélectionné individuellement**, faites correspondre un tag que vous contrôlez, tel que `datadog:true`. Appliquez ce tag uniquement aux instances que vous souhaitez instrumenter. La couverture ne change alors que lorsque vous modifiez les tags ; votre infrastructure-as-code détermine donc quelles instances sont couvertes.

<div class="alert alert-warning">
La couverture fonctionne dans les deux sens. Lorsqu'une instance ne correspond plus à la règle, Datadog désinstalle l'Agent de celle-ci. Un changement de tag effectué dans AWS peut donc supprimer la surveillance d'une instance sans que personne ne modifie la règle dans Datadog.
</div>

### Bonnes pratiques pour les règles et les tags {#best-practices-for-rules-and-tags}

**Faites correspondre les tags que votre équipe possède.** Lorsqu'une règle correspond à un tag qu'une autre équipe contrôle, cette équipe peut ajouter ou supprimer la surveillance en changeant les tags, sans ouvrir Datadog. Conserver le tag et la règle sous le même contrôle permet de laisser la décision aux personnes qui en sont responsables.

**Évitez les tags qui changent au cours des opérations normales.** Les tags qui changent avec une promotion d'environnement, un déploiement ou un modèle d'autoscaling peuvent faire entrer et sortir des instances de la couverture. Faites correspondre les attributs qui restent stables pendant toute la durée de vie de l'instance.

**Traitez la règle comme la configuration complète du compte.** Chaque compte AWS possède une règle par type de ressource. Chaque modification redéfinit la portée de toute la couverture pour ce type de ressource au lieu de s'ajouter à la couverture existante. Examinez les instances correspondantes avant d'enregistrer.

**Définissez des exceptions avec des exclusions.** Lorsqu'une règle générale couvre des instances que vous souhaitez ignorer, excluez-les de la même règle au lieu de passer à une liste sélectionnée individuellement. Les exclusions permettent de garder la règle lisible et de préserver la couverture automatique pour tout le reste.

## Installer l'Agent {#install-the-agent}

Vous pouvez démarrer l'installation de l'Agent à partir de deux points d'entrée, selon le degré de contrôle que vous souhaitez avoir sur les instances instrumentées :

- **Configuration de l'intégration AWS (installation sur toutes les instances éligibles)** : lors de la [configuration de l'intégration AWS][5], activez l'option d'installation de l'Agent sur la [page d'intégration AWS][7], affichée à côté de la collecte des logs et des ressources. L'Agent s'installe sur toutes les instances EC2 éligibles.
- **Fleet Automation (installation sur des instances spécifiques)** : ouvrez la [page d'installation des agents AWS][8] à tout moment pour sélectionner les instances EC2 spécifiques que vous souhaitez.

<!-- TODO(DOCS-14545): per AWS team, surfacing the Agent install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

Le bouton d'installation de l'Agent apparaît lors de la configuration :

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="L'étape d'installation de Datadog Agent dans la configuration AWS, avec l'option d'installation activée et l'option de charge de travail Hosts (EC2) activée." style="width:80%;" >}}

Pour installer à partir de la page d'installation des agents AWS :

1. Optez pour toutes les instances éligibles ou sélectionnez des instances EC2 spécifiques dans la liste des ressources.
1. Examinez la pile CloudFormation générée, puis continuez vers AWS et créez-la. Datadog ne vous le demande qu'une seule fois.
1. Retournez à Datadog. L'installation se poursuit automatiquement et Datadog signale la progression à mesure que les Agents se connectent.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## Vérifiez l'installation {#verify-the-installation}

Une fois l'installation terminée :

- Les Agents nouvellement installés apparaissent dans la [Infrastructure List][3] et sur la hostmap.
- Fleet Automation répertorie les mêmes Agents dans la Fleet View.

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## Gérez les Agents installés {#manage-installed-agents}

Utilisez la [AWS Install Agents page][8] dans Fleet Automation pour gérer les Agents que vous avez installés via l'intégration AWS.

Depuis cette page, vous pouvez :

- Consultez les Agents installés et leur statut.
- Installez l'Agent sur de nouvelles instances dans votre environnement AWS.
- Désinstallez les Agents des instances que vous ne souhaitez plus surveiller.

Pour arrêter la couverture, mettez à jour la règle afin que les instances ne correspondent plus à celle-ci. Si vous supprimez manuellement l'Agent d'une instance couverte, Datadog le réinstalle. Gérez la configuration de l'Agent et les mises à niveau de version via [Fleet Automation][4].

## Dépannage {#troubleshooting}

### L'Agent SSM n'est pas présent sur une instance EC2 {#the-ssm-agent-is-not-present-on-an-ec2-instance}

L'installation de l'Agent sur EC2 repose sur l'Agent AWS Systems Manager (SSM), que Datadog ne peut pas installer pour vous. Datadog signale toute instance qui en est dépourvue comme inéligible, y compris celles créées à partir d'AMI personnalisées. Installez l'Agent SSM sur l'instance, puis réessayez. Consultez [Working with SSM Agent][2] dans la documentation AWS.

### Une erreur de permission ou IAM se produit {#a-permission-or-iam-error-occurs}

Si l'installation ne peut pas se terminer en raison d'autorisations manquantes, Datadog affiche une notification renvoyant à la ressource CloudFormation qui nécessite la nouvelle autorisation. Mettez à jour votre stack existante pour accorder les [autorisations requises](#required-aws-permissions). Vous n'avez pas besoin de créer une nouvelle stack.

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