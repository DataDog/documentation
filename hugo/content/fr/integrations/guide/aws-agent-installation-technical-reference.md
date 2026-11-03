---
description: 'Comprenez comment Datadog instrumente les instances Amazon EC2 et les
  fonctions AWS Lambda via l''intégration AWS : les ressources AWS créées, le mécanisme
  d''instrumentation, le modèle de sécurité et la manière dont Datadog maintient l''instrumentation
  en place.'
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: Documentation
  text: Installez l'instrumentation Datadog via l'intégration AWS
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentation
  text: Intégration AWS
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: Documentation
  text: Fédération d'identités de charges de travail
private: true
title: Comment fonctionne l'instrumentation Datadog via l'intégration AWS
---
Cette page explique comment Datadog instrumente et maintient vos charges de travail AWS via l'intégration AWS. Pour les instructions de configuration et les autorisations requises par Datadog, consultez [Installer l'instrumentation Datadog via l'intégration AWS][1].

Cette page couvre les instances Amazon EC2 et les fonctions AWS Lambda. Amazon EKS n'est pas pris en charge.

Datadog propose également une [instrumentation à distance][4] pour les fonctions Lambda. L'instrumentation à distance déploie une fonction d'instrumentation dans votre propre compte plutôt que d'effectuer les changements depuis Datadog. Pour une comparaison des deux, consultez [Choisir entre l'intégration AWS et l'instrumentation à distance][6] dans le guide de configuration.

## Ressources AWS créées par Datadog {#aws-resources-that-datadog-creates}

### Créé une fois, par la pile CloudFormation {#created-once-by-the-cloudformation-stack}

Le modèle CloudFormation que vous lancez crée les ressources suivantes une seule fois, dans une pile unique :

| Ressource | Nom | Objectif |
|---|---|---|
| Connexion EventBridge | `datadog-agent-resource-update-intake-connection` | Contient vos clés Datadog API et d'application afin que les événements puissent être envoyés à Datadog |
| Destination d'API EventBridge | `datadog-agent-resource-update-intake-destination` | Envoie les événements de changement de ressource à Datadog |
| Règle EventBridge | `datadog-agent-resource-update-rule-ec2` | Notifie Datadog lorsqu'une instance couverte change. Créé lorsque vous sélectionnez la charge de travail EC2 |
| Règle EventBridge | `datadog-agent-resource-update-rule-lambda` | Notifie Datadog lorsqu'une fonction couverte change. Créé lorsque vous sélectionnez la charge de travail Lambda |
| Rôle IAM | nommé automatiquement | Permet à EventBridge d'envoyer des événements à la destination d'API `datadog-agent-resource-update-intake-destination` |
| Rôle IAM | `datadog-eventbridge-cross-region-role` | Permet à d'autres régions de transférer des événements vers votre région principale |

La pile attache également les autorisations IAM pour les charges de travail que vous avez sélectionnées à votre rôle d'intégration AWS. Si vous sélectionnez uniquement la charge de travail Lambda, la pile n'accorde aucune autorisation EC2.

### Créé selon les besoins, pour les instances EC2 {#created-as-needed-for-ec2-instances}

| Ressource | Nom | Objectif |
|---|---|---|
| Document Systems Manager | `datadog-ec2-instrumenter` | Le script d'installation et de désinstallation. Un document par compte. |
| Secrets Manager secret | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Contient la clé d'API Datadog afin que l'instance puisse la récupérer elle-même. Chiffré avec la clé gérée par AWS par défaut. |
| Rôle IAM et profil d'instance | `datadog-ssm-<INSTANCE_ID>` et `datadog-ssm-profile-<INSTANCE_ID>` | Créés uniquement lorsque l'instance n'a pas de profil d'instance, sous le chemin IAM `/datadog-ec2-instrumenter/` afin qu'ils soient identifiables. Reçoit la `AmazonSSMManagedInstanceCore` politique gérée par AWS afin que Systems Manager puisse atteindre l'instance. |
| Politique IAM en ligne | `datadog-ec2-instrumenter-secrets` | Ajoutée au rôle de l'instance. Accorde un accès en lecture uniquement aux secrets sous `/datadog/ec2-instrumenter/`. |
| Règles EventBridge dans vos autres régions | Mêmes noms que les ressources de la région principale | Transfèrent les événements de changement vers votre région principale. |

Datadog ne crée pas de compartiments S3, de bus d'événements, de groupes de logs ou de paramètres SSM, et ne tague pas vos instances.

### Aucune ressource supplémentaire créée pour les fonctions Lambda {#no-additional-resources-created-for-lambda-functions}

En dehors de la règle EventBridge Lambda que la pile CloudFormation crée, Datadog ne crée aucune ressource AWS pour l'instrumentation Lambda. Le seul autre changement concerne la configuration des fonctions couvertes par votre règle. Datadog ne crée pas de secrets, de rôles IAM ou de documents SSM pour Lambda, et ne tague pas vos fonctions.

## Fonctionnement de l'instrumentation {#how-instrumentation-works}

Après avoir enregistré une règle d'instrumentation, Datadog évalue la requête que vous avez définie par rapport à votre compte pour déterminer les ressources couvertes, puis exécute la séquence suivante pour chacune d'elles. Pour les prérequis, y compris les plateformes et runtimes pris en charge, consultez [Prérequis][2] dans le guide de configuration.

### Sur Amazon EC2 {#on-amazon-ec2}

1. Datadog vérifie que chaque instance couverte est en cours d'exécution, sur une plateforme prise en charge et accessible par AWS Systems Manager.
2. Lorsqu'une instance n'a pas de profil d'instance IAM, Datadog en crée un afin que Systems Manager puisse l'atteindre. Lorsqu'une instance en possède déjà un, Datadog ajoute la politique SSM ainsi que la politique de lecture de secrets à périmètre restreint au rôle existant.
3. Datadog vérifie si un Agent est déjà présent. Lorsqu'un Agent est présent et que Datadog ne l'a pas installé, Datadog s'arrête et laisse l'instance telle quelle.
4. Datadog appelle `ssm:SendCommand`, une instance à la fois, en exécutant le document `datadog-ec2-instrumenter`.
5. Sur l'instance, le document récupère la clé d'API depuis Secrets Manager en utilisant le propre rôle IAM de l'instance. Il exécute ensuite l'installateur d'Agent standard de Datadog (`install_script_agent7.sh` sur Linux, ou le MSI standard sur Windows) avec la collecte de logs et l'instrumentation de host APM activées.

Datadog ne redémarre pas vos instances. Le seul service que Datadog touche est Datadog Agent lui-même, qui est démarré lors de l'installation et arrêté lors de la désinstallation. Vos applications et autres services ne sont pas touchés.

### Sur AWS Lambda {#on-aws-lambda}

L'instrumentation Lambda s'exécute entièrement depuis Datadog. Datadog ne déploie aucune ressource de calcul, telle qu'une fonction d'instrumentation, dans votre compte pour instrumenter vos fonctions.

1. Datadog lit la configuration et les tags actuels de la fonction, et vérifie qu'elle répond aux [prérequis Lambda][3].
2. Datadog vérifie si la fonction est déjà instrumentée. Datadog ignore une fonction qui contient des couches Datadog, un gestionnaire Datadog ou des variables d'environnement Datadog que Datadog n'a pas appliqués. Datadog ignore également une fonction gérée par [l'instrumentation à distance][4], et indique laquelle des deux raisons s'applique.
3. Datadog résout les versions de couches Datadog pour le runtime, l'architecture, la région et la partition AWS de la fonction. Datadog applique les versions de couche qu'il a validées plutôt que la version la plus récente à ce moment-là, afin qu'une installation soit reproductible.
4. Datadog calcule la configuration souhaitée complète et enregistre exactement ce qu'il est sur le point de modifier, avant d'effectuer le moindre changement.
5. Datadog autorise le rôle d'exécution de la fonction à envoyer des données de télémétrie à votre organisation Datadog. Consultez la section [Comment la télémétrie Lambda est authentifiée](#how-lambda-telemetry-is-authenticated).
6. Datadog appelle `lambda:UpdateFunctionConfiguration` une fois, en soumettant la liste complète des couches et la carte d'environnement. Datadog marque le changement comme appliqué uniquement après qu'AWS a signalé le succès.

Une mise à jour Lambda est une opération de type remplacement : la liste des couches et la carte d'environnement soumises deviennent la nouvelle configuration. Datadog calcule donc l'état souhaité complet plutôt que d'y ajouter des éléments, ce qui préserve vos couches et variables d'environnement existantes. La mise à jour comporte l'ID de révision de la fonction, de sorte qu'un changement effectué dans votre compte entre la lecture et l'écriture de Datadog entraîne l'échec de la mise à jour au lieu d'écraser le changement.

### Ce que Datadog modifie sur une fonction {#what-datadog-changes-on-a-function}

| Changement | S'applique à |
|---|---|
| Ajoute la couche d'extension Datadog (`Datadog-Extension` ou `Datadog-Extension-ARM`) | Tous les runtimes pris en charge |
| Ajoute la couche de traçage Datadog correspondante | Node.js, Python, Ruby, Java et .NET |
| Définit `DD_SITE` et `DD_ORG_UUID` | Tous les runtimes pris en charge |
| Redirige le gestionnaire vers le gestionnaire Datadog et déplace l'original dans `DD_LAMBDA_HANDLER` | Node.js et Python |
| Définit `AWS_LAMBDA_EXEC_WRAPPER` sur `/opt/datadog_wrapper` | Java et .NET |

Datadog ne modifie pas le code de la fonction, la taille de la mémoire, le délai d'expiration, la configuration VPC, la concurrence ou tout autre paramètre de fonction.

### Ressources exclues par Datadog {#resources-that-datadog-excludes}

Sur EC2, Datadog exclut :

- Instances qui ne sont pas en cours d'exécution
- Nœuds de travail EKS
- Instances de conteneur ECS
- Instances qui ont déjà un Agent non installé par Datadog

Sur Lambda, Datadog exclut :

- Fonctions d'image de conteneur et fonctions sur un runtime ou une architecture non pris en charge
- Fonctions en dehors de la partition commerciale `aws`
- Réplicas Lambda@Edge et les fonctions qu'ils répliquent
- Fonctions déjà instrumentées par vous ou par instrumentation à distance
- Fonctions qui définissent déjà `AWS_LAMBDA_EXEC_WRAPPER` sur un wrapper autre que Datadog
- Fonctions pour lesquelles l'ajout des couches Datadog dépasserait la limite de cinq couches AWS

## Sécurité, audit et contrôle des changements {#security-auditing-and-change-control}

### Comment Datadog obtient l'accès {#how-datadog-gets-access}

Datadog utilise le même rôle IAM inter-comptes que l'intégration AWS, authentifié avec un ID externe. Datadog reçoit des identifiants temporaires à courte durée de vie, et chaque type de tâche (lecture d'EC2, gestion IAM, envoi de commandes, mise à jour de fonctions) utilise une session d'identifiants à périmètre limité plutôt qu'une session unique étendue. Datadog ne stocke aucune clé AWS à longue durée de vie.

### Audit des actions de Datadog {#auditing-datadogs-actions}

Chaque action effectuée par Datadog est un appel d'API AWS standard, donc toutes les actions apparaissent dans AWS CloudTrail. Tout ce que Datadog crée est identifiable par son nom : les ressources sont préfixées par `datadog-`, les secrets sont stockés sous `/datadog/ec2-instrumenter/`, et les rôles IAM utilisent le chemin immuable `/datadog-ec2-instrumenter/`. Comme un chemin IAM ne peut pas être modifié après sa création, le chemin ne peut pas être changé silencieusement. Les résultats des commandes sur l'instance apparaissent dans l'historique de Systems Manager Run Command. Les modifications de configuration Lambda apparaissent comme des événements `UpdateFunctionConfiguration` attribués à votre rôle d'intégration AWS.

### Comment la clé d'API est gérée sur EC2 {#how-the-api-key-is-handled-on-ec2}

La clé d'API est stockée dans votre propre Secrets Manager, chiffrée au repos. Seul l'Amazon Resource Name (ARN) du secret est transmis dans la commande SSM ; la clé elle-même n'apparaît jamais dans les paramètres de commande ou dans CloudTrail. L'instance lit le secret avec son propre rôle IAM, limité à un seul chemin. Datadog stocke uniquement une référence à la clé en interne, et non la clé elle-même.

### Comment la télémétrie Lambda est authentifiée {#how-lambda-telemetry-is-authenticated}

L'instrumentation Lambda ne stocke aucun identifiant Datadog dans votre compte. L'extension Datadog s'authentifie auprès de l'identité d'exécution AWS de la fonction via [Workload Identity Federation][5], en utilisant les valeurs `DD_ORG_UUID` et `DD_SITE` que Datadog définit sur la fonction. Aucune clé d'API Datadog, aucun ARN de secret ni aucune clé chiffrée par KMS n'est écrit dans la configuration de la fonction.

Pour que cette authentification réussisse, Datadog autorise le rôle d'exécution de la fonction à envoyer de la télémétrie à votre organisation Datadog. Datadog configure cette autorisation avant de mettre à jour une fonction et correspond exactement au rôle d'exécution, plutôt que par un modèle plus large.

Comme un rôle d'exécution unique est souvent partagé entre plusieurs fonctions, Datadog crée ces autorisations mais ne les supprime pas lors de la désinstallation. La suppression de l'autorisation pour un rôle partagé pourrait interrompre une autre fonction qui en dépend toujours.

### Qui peut modifier l'instrumentation {#who-can-change-instrumentation}

- **Dans AWS** : L'accès est régi par vos propres politiques IAM. La suppression des autorisations inter-comptes arrête immédiatement Datadog.
- **Dans Datadog** : La consultation des règles d'instrumentation nécessite l'autorisation **Hosts Read**. La création, la modification ou la suppression de règles nécessite l'autorisation **Agent Install**. Les modifications de règles sont limitées en débit.

### Garde-fous {#guardrails}

- Datadog ne supprime jamais l'instrumentation qu'il n'a pas installée.
- Datadog suit les ressources qu'il a instrumentées, afin de ne nettoyer que son propre travail.
- Sur EC2, lorsque certaines régions ne peuvent pas être listées, Datadog ignore le nettoyage plutôt que de risquer de supprimer l'instrumentation en masse.
- Sur Lambda, Datadog restaure une fonction à partir de la configuration qu'il a enregistrée avant de l'instrumenter, de sorte qu'une désinstallation annule exactement la modification effectuée par Datadog.
- Une défaillance est limitée à la ressource individuelle. Une ressource qui échoue n'affecte pas les ressources déjà instrumentées.

## Comment Datadog maintient l'instrumentation {#how-datadog-maintains-instrumentation}

### Réconciliation continue {#continuous-reconciliation}

Datadog maintient en continu l'état que vous définissez sur les ressources couvertes :

- Datadog revérifie les ressources couvertes selon un planning régulier, en restaurant l'instrumentation manquante, en retentant toute opération ayant échoué et en nettoyant les ressources qui n'existent plus.
- Les événements de changement transmis depuis votre compte permettent à Datadog de réagir en quelques minutes, plutôt que d'attendre le check planifié suivant. Datadog réagit à la fois à une ressource couverte qui a été modifiée et à une ressource nouvellement créée qui correspond à une règle basée sur une requête :
  - **EC2** : Les événements proviennent de la règle EventBridge de la pile CloudFormation.
  - **Lambda** : La règle `datadog-agent-resource-update-rule-lambda` transmet les événements de création de fonction, de mise à jour de configuration, d'ajout de tag et de suppression de tag.
- Sur EC2, les instances qui possèdent déjà l'Agent sont revérifiées moins fréquemment, afin d'éviter toute activité inutile.
- Sur Lambda, Datadog appelle l'API Lambda dans votre compte uniquement pour les fonctions qui nécessitent un changement. Un parc déjà doté des versions de couche actuelles ne génère aucune activité par fonction.

### Comment les fonctions Lambda adoptent les nouvelles versions de couche {#how-lambda-functions-pick-up-new-layer-versions}

Datadog compare les couches d'une fonction couverte aux versions que Datadog déploie, plutôt qu'aux versions appliquées lors de l'instrumentation initiale. Lorsque Datadog publie de nouvelles versions de couche, les fonctions couvertes sont mises à jour vers celles-ci. Vos fonctions évoluent donc avec les versions de couche de Datadog sans aucune intervention de votre part.

Une mise à jour de configuration Lambda encore en cours est laissée telle quelle et retentée peu après, afin que Datadog n'entre pas en conflit avec un changement déjà en cours d'application.

### Comment une règle détermine la couverture {#how-a-rule-determines-coverage}

Une règle n'est pas une sélection ponctuelle. Datadog réévalue sa requête au fil du temps et réagit aux événements de changement transmis depuis votre compte. Datadog instrumente une ressource dès qu'il détecte une correspondance, dans l'un des cas suivants :

- **Elle a été créée après que vous avez enregistré la règle.** Les événements `RunInstances` et `CreateFunction` sont transmis, de sorte qu'une nouvelle ressource est prise en charge en quelques minutes.
- **Elle existait déjà et a commencé à répondre aux critères.** Taguer une ressource pour l'inclure dans le périmètre est le cas courant, les événements de tag sont donc également transmis : `CreateTags` et `DeleteTags` sur EC2, `TagResource` et `UntagResource` sur Lambda. Cela permet d'écrire une règle telle que `@Tags:datadog:true` d'abord, puis d'y ajouter des ressources au fur et à mesure.

Une règle que vous avez créée en sélectionnant des ressources spécifiques contient une requête nommant ces ressources, de sorte que rien d'autre ne lui correspond jamais.

Pour obtenir des conseils sur la rédaction d'une requête, y compris sur le moment où faire correspondre un tag fixe, consultez [Choisir comment votre règle fait correspondre les ressources][7] dans le guide de configuration.

### Que se passe-t-il lorsque la couverture change {#what-happens-when-coverage-changes}

Datadog réévalue la règle et compare les ressources couvertes à l'ensemble précédent. L'instrumentation est supprimée des ressources qui ne sont plus couvertes. Les ressources nouvellement couvertes sont instrumentées. La suppression d'une règle retire l'instrumentation de tout ce que la règle couvrait.

<div class="alert alert-warning">
Datadog supprime l'instrumentation lorsqu'une ressource ne correspond plus à la règle, que le changement provienne d'une modification dans Datadog ou d'un changement de tag ou de configuration de la ressource dans AWS. Gardez ce comportement à l'esprit lorsque vous rédigez une règle basée sur des tags que d'autres équipes peuvent modifier :
</div>

### Ressources terminées, arrêtées ou supprimées {#terminated-stopped-or-deleted-resources}

Sur EC2, Datadog détecte les instances terminées et nettoie les ressources IAM qu'il a créées pour elles. Datadog ne touche pas aux instances arrêtées jusqu'à ce qu'elles reviennent. Sur Lambda, une fonction supprimée n'est plus couverte.

### En cas d'échec de l'instrumentation {#when-instrumentation-fails}

Datadog réessaie automatiquement, avec un délai croissant entre chaque essai. Les problèmes nécessitant votre intervention, tels qu'une autorisation manquante ou une fonction à la limite de couche, sont signalés et ne font plus l'objet de nouvelles tentatives tant que vous ne les avez pas résolus. Les problèmes d'autorisation manquante apparaissent comme un problème sur la **tuile d'intégration AWS** et sur la page d'installation de Fleet.

<div class="alert alert-warning">
Lorsqu'une personne supprime manuellement l'instrumentation d'une ressource couverte, Datadog la restaure. La règle est la source de vérité. Pour arrêter la couverture, modifiez la règle.
</div>

## Supprimer l'instrumentation Datadog {#remove-datadog-instrumentation}

Pour supprimer l'instrumentation, retirez les ressources d'une règle, modifiez la requête de la règle ou supprimez la règle.

- **EC2** : Datadog supprime le Datadog Agent, les répertoires `/etc/datadog-agent` et `/opt/datadog-agent` sous Linux (ou effectue une désinstallation MSI sous Windows), ainsi que tout rôle IAM ou profil d'instance créé par Datadog pour chaque instance.
- **Lambda** : Datadog supprime les couches qu'il a ajoutées et restaure les variables d'environnement et le gestionnaire dont la fonction disposait auparavant. Datadog compare d'abord son enregistrement de la configuration d'origine avec la configuration actuelle de la fonction, afin de ne pas supprimer une couche ou une variable qu'il n'a pas ajoutée. L'autorisation de télémétrie pour le rôle d'exécution est maintenue, car le rôle peut être partagé avec d'autres fonctions.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation/#prerequisites
[3]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation/#aws-lambda-functions
[4]: https://docs.datadoghq.com/fr/serverless/aws_lambda/remote_instrumentation/
[5]: https://docs.datadoghq.com/fr/account_management/workload_identity_federation/
[6]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation/#choose-between-the-aws-integration-and-remote-instrumentation
[7]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation/#choose-how-your-rule-matches-resources