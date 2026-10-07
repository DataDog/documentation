---
description: 'Comprenez comment Datadog installe et maintient Datadog Agent sur Amazon
  EC2 via l''intégration AWS : les ressources AWS créées, le mécanisme d''installation,
  le modèle de sécurité et le cycle de vie de l''Agent.'
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: Documentation
  text: Installer Datadog Agent via l'intégration AWS
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentation
  text: Intégration AWS
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
private: true
title: Fonctionnement de l'installation de l'Agent via l'intégration AWS
---
Cette page explique comment Datadog installe et maintient l'Agent sur Amazon EC2 via l'intégration AWS. Pour les instructions de configuration et les autorisations requises par Datadog, consultez [Installer Datadog Agent via l'intégration AWS][1].

<div class="alert alert-info">Cette page couvre uniquement l'expérience Amazon EC2.</div>

## Ressources AWS créées par Datadog {#aws-resources-that-datadog-creates}

Le modèle CloudFormation que vous lancez crée les ressources suivantes une seule fois, dans une pile unique :

| Ressource | Nom | Objectif |
|---|---|---|
| Connexion EventBridge | `datadog-agent-resource-update-intake-connection` | Contient vos clés Datadog API et d'application afin que les événements puissent être envoyés à Datadog |
| Destination d'API EventBridge | `datadog-agent-resource-update-intake-destination` | Envoie des événements à `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events` (limité à 10 événements par seconde) |
| Règle EventBridge | `datadog-agent-resource-update-rule-ec2` | Notifie Datadog lorsqu'une instance couverte change |
| Rôle IAM | nommé automatiquement | Permet à EventBridge d'envoyer des événements à la destination d'API `datadog-agent-resource-update-intake-destination` |
| Rôle IAM | `datadog-eventbridge-cross-region-role` | Permet à d'autres régions de transférer des événements vers votre région principale |

Datadog crée les ressources suivantes selon les besoins, au moment de l'installation :

| Ressource | Nom | Objectif |
|---|---|---|
| Document Systems Manager | `datadog-ec2-instrumenter` | Le script d'installation et de désinstallation. Un document par compte. |
| Secrets Manager secret | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Contient la clé Datadog API afin que l'instance puisse la récupérer elle-même. Chiffré avec la clé gérée par AWS par défaut. |
| Rôle IAM et profil d'instance | `datadog-ssm-<INSTANCE_ID>` et `datadog-ssm-profile-<INSTANCE_ID>` | Créés uniquement lorsque l'instance n'a pas de profil d'instance, sous le chemin IAM `/datadog-ec2-instrumenter/` afin qu'ils soient identifiables. Reçoit la `AmazonSSMManagedInstanceCore` politique gérée par AWS afin que Systems Manager puisse atteindre l'instance. |
| Politique IAM en ligne | `datadog-ec2-instrumenter-secrets` | Ajoutée au rôle de l'instance. Accorde un accès en lecture uniquement aux secrets sous `/datadog/ec2-instrumenter/`. |
| Règles EventBridge dans vos autres régions | Mêmes noms que les ressources de la région principale | Transfèrent les événements de changement vers votre région principale. |

Datadog ne crée pas de compartiments S3, de bus d'événements, de groupes de logs ou de paramètres SSM, et ne marque pas vos instances.

## Comment fonctionne l'installation de l'Agent {#how-agent-installation-works}

Après avoir enregistré une règle d'installation, Datadog trouve les instances qui y correspondent et continue de vérifier les nouvelles correspondances au fil du temps. Datadog exécute la séquence suivante sur chaque instance couverte. Pour les prérequis, y compris les plateformes prises en charge, consultez [Prerequisites][2] dans le guide de configuration.

1. Datadog vérifie que chaque instance couverte est en cours d'exécution, sur une plateforme prise en charge et accessible par AWS Systems Manager.
2. Lorsqu'une instance n'a pas de profil d'instance IAM, Datadog en crée un afin que Systems Manager puisse l'atteindre. Lorsqu'une instance en possède déjà un, Datadog ajoute la politique SSM ainsi que la politique de lecture de secrets à portée restreinte au rôle existant.
3. Datadog vérifie si un Agent est déjà présent. Lorsqu'un Agent est présent et que Datadog ne l'a pas installé, Datadog s'arrête et laisse l'instance telle quelle.
4. Datadog appelle `ssm:SendCommand`, une instance à la fois, en exécutant le document `datadog-ec2-instrumenter`.
5. Sur l'instance, le document récupère la clé d'API depuis Secrets Manager en utilisant le propre rôle IAM de l'instance. Il exécute ensuite l'installateur d'Agent standard de Datadog (`install_script_agent7.sh` sur Linux, ou le MSI standard sur Windows) avec la collecte de logs et l'instrumentation d'hôte APM activées. La commande expire après 6 minutes.

Datadog ne redémarre pas vos instances. Le seul service que Datadog touche est Datadog Agent lui-même, qui est démarré lors de l'installation et arrêté lors de la désinstallation. Vos applications et autres services ne sont pas touchés.

### Instances que Datadog exclut {#instances-that-datadog-excludes}

Datadog exclut automatiquement :

- Instances qui ne sont pas en cours d'exécution
- Nœuds de travail EKS
- Instances de conteneur ECS
- Instances qui ont déjà un Agent non installé par Datadog

## Sécurité, audit et contrôle des changements {#security-auditing-and-change-control}

### Comment Datadog obtient l'accès {#how-datadog-gets-access}

Datadog utilise le même rôle IAM inter-comptes que l'intégration AWS, authentifié avec un ID externe. Datadog reçoit des identifiants temporaires à courte durée de vie, et chaque type de travail (lecture d'EC2, gestion IAM, envoi de commandes) utilise une session d'identifiants à portée distincte plutôt qu'une session large. Datadog ne stocke aucune clé AWS à longue durée de vie.

### Audit des actions de Datadog {#auditing-datadogs-actions}

Chaque action effectuée par Datadog est un appel d'API AWS standard, donc toutes les actions apparaissent dans AWS CloudTrail. Tout ce que Datadog crée est identifiable par son nom : les ressources sont préfixées par `datadog-`, les secrets sont stockés sous `/datadog/ec2-instrumenter/`, et les rôles IAM utilisent le chemin immuable `/datadog-ec2-instrumenter/`. Comme un chemin IAM ne peut pas être modifié après sa création, le chemin ne peut pas être changé silencieusement. Les résultats des commandes sur l'instance apparaissent dans l'historique de Systems Manager Run Command.

### Comment la clé d'API est gérée {#how-the-api-key-is-handled}

La clé d'API est stockée dans votre propre Secrets Manager, chiffrée au repos. Seul l'Amazon Resource Name (ARN) du secret est transmis dans la commande SSM ; la clé elle-même n'apparaît jamais dans les paramètres de commande ou dans CloudTrail. L'instance lit le secret avec son propre rôle IAM, limité à un seul chemin. Datadog stocke uniquement une référence à la clé en interne, et non la clé elle-même.

### Qui peut modifier les installations {#who-can-change-installations}

- **Dans AWS** : L'accès est régi par vos propres politiques IAM. La suppression des autorisations inter-comptes arrête immédiatement Datadog.
- **Dans Datadog** : La consultation des règles d'installation nécessite l'autorisation **Hosts Read**. La création, la modification ou la suppression de règles nécessite l'autorisation **Agent Install**. Les modifications de règles sont limitées en débit.

### Garde-fous {#guardrails}

- Datadog ne supprime jamais un Agent qu'il n'a pas installé.
- Datadog suit les instances sur lesquelles il a installé un Agent, afin de ne nettoyer que son propre travail.
- Lorsque certaines régions ne peuvent pas être listées, Datadog ignore le nettoyage pour ce passage plutôt que de risquer une désinstallation en masse.

## Cycle de vie et couverture de l'Agent {#agent-life-cycle-and-coverage}

### La couverture des règles est évaluée au fil du temps {#rule-coverage-is-evaluated-over-time}

Une règle couvre les instances qui lui correspondent, et Datadog recherche de nouvelles correspondances au fil du temps. Si une instance commence à correspondre plus tard parce qu'elle a été lancée après que vous avez enregistré la règle ou parce que ses tags ont changé, Datadog l'instrumente automatiquement. Datadog n'instrumente pas les instances auxquelles la règle ne correspond pas.

Pour fixer la couverture à un ensemble défini d'instances, sélectionnez ces instances individuellement. La règle ne correspond alors qu'aux instances que vous avez sélectionnées, de sorte que les vérifications ultérieures n'ajoutent pas de nouvelles instances.

Lorsqu'un ensemble fixe est trop volumineux pour être sélectionné individuellement, utilisez un tag que vous contrôlez, tel que `datadog:true`. Appliquez ce tag uniquement aux instances que vous souhaitez instrumenter. La couverture ne change alors que lorsque vous modifiez les tags.

### Comment Datadog maintient la synchronisation des instances couvertes {#how-datadog-keeps-covered-instances-in-sync}

Datadog maintient en continu l'état que vous définissez sur les instances couvertes :

- Datadog vérifie régulièrement vos règles et instrumente les instances correspondantes.
- Datadog réinstalle l'Agent s'il est manquant, réessaie les installations ayant échoué et nettoie les instances qui n'existent plus.
- Les nouvelles correspondances sont généralement instrumentées en moins d'une heure, et souvent en quelques minutes.
- Les instances qui possèdent déjà l'Agent sont vérifiées moins souvent.

### Que se passe-t-il lorsque la couverture change {#what-happens-when-coverage-changes}

Lorsque la couverture change, Datadog détermine quelles instances ont été ajoutées à la couverture de la règle ou en ont été supprimées. La couverture change lorsque vous modifiez la règle ou lorsque vos instances changent. Datadog installe l'Agent sur les instances nouvellement couvertes et le désinstalle des instances qui ne sont plus couvertes. La suppression d'une règle désinstalle l'Agent de toutes les instances couvertes par cette règle.

<div class="alert alert-warning">
Datadog désinstalle l'Agent lorsqu'une instance ne correspond plus à la règle, que le changement provienne d'une modification dans Datadog ou d'un changement de tag ou de configuration de l'instance dans AWS. Gardez ce comportement à l'esprit lorsque vous rédigez une règle basée sur des tags que d'autres équipes peuvent modifier :
</div>

### Instances terminées ou arrêtées {#terminated-or-stopped-instances}

Datadog détecte les instances terminées et nettoie les ressources IAM qu'il a créées pour elles. Datadog ne touche pas aux instances arrêtées jusqu'à ce qu'elles reviennent.

### En cas d'échec de l'installation {#when-an-install-fails}

Datadog effectue de nouvelles tentatives avec un délai croissant (1 heure, puis 2 heures, jusqu'à une fois par jour) et continue de réessayer. Les problèmes d'autorisation manquante apparaissent comme un problème sur la **tuile d'intégration AWS** et sur la page d'installation de Fleet.

<div class="alert alert-warning">
Lorsqu'une personne supprime manuellement l'Agent d'une instance couverte, Datadog le réinstalle. La règle est la source de vérité. Pour arrêter la couverture, modifiez la règle afin que l'instance ne corresponde plus à celle-ci.
</div>

## Désinstalle l'Agent {#uninstall-the-agent}

La désinstallation supprime Datadog Agent, les répertoires `/etc/datadog-agent` et `/opt/datadog-agent` sous Linux (ou effectue une désinstallation MSI sous Windows), ainsi que tout rôle IAM ou profil d'instance créé par Datadog pour cette instance. Pour désinstaller, modifiez la requête de la règle afin que les instances ne correspondent plus, supprimez les instances d'une règle ou supprimez la règle.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/fr/integrations/guide/aws-agent-installation/#prerequisites