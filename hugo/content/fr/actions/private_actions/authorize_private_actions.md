---
description: Découvrez comment Datadog autorise les Private Actions à l'aide de politiques
  d'exécution et de connexions.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: Documentation
  text: Présentation des Private Actions
- link: actions/private_actions/enroll_runner/
  tag: Documentation
  text: Inscription et propriété
- link: actions/private_actions/set_up_agent_based/
  tag: Documentation
  text: Configurez un exécuteur d'actions privé
- link: actions/private_actions/execution_policies/
  tag: Documentation
  text: Politiques d'exécution
- link: actions/connections/
  tag: Documentation
  text: Connexions
title: Autoriser les Private Actions
---
## Présentation {#overview}

Lorsque vos workflows et applications utilisent des Private Actions, Datadog décide si l'action est autorisée, puis votre **runner d'action privée** l'exécute. Avant qu'une tâche ne soit envoyée à un runner, Datadog vérifie si l'utilisateur demandeur est autorisé à agir sur ce runner. Si elle n'est pas autorisée, la tâche n'est jamais envoyée.

Cette page explique comment cette décision d'autorisation est prise. Elle couvre les modèles que Datadog utilise pour autoriser ou refuser une action, et le modèle qui s'applique à votre runner.

## Trouvez votre modèle d'autorisation {#find-your-authorization-model}

Un runner est autorisé à l'aide de l'un des deux modèles : [**politiques d'exécution**](#execution-policies) ou [**connexions**](#connections). Le modèle est déterminé par la propriété du runner, définie une fois lors de l'inscription du runner. Un runner donné utilise exactement l'un de ces modèles pendant toute sa durée de vie ; vous ne pouvez pas combiner les deux sur le même runner. Comme la propriété est définie pour chaque runner, un seul parc basé sur l'Agent peut inclure à la fois des runners sans propriétaire et des runners avec propriétaire, chacun étant autorisé selon son propre modèle.

- **Le runner dans le Datadog Agent** dépend de la manière dont il a été inscrit. Un runner d'Agent sans propriétaire utilise des [politiques d'exécution](#execution-policies) ; un runner d'Agent avec propriétaire utilise des [connexions](#connections).
- **Le runner autonome** est toujours avec propriétaire, il utilise donc toujours [Connections](#connections).

Pour savoir comment l'inscription définit la propriété d'un runner, consultez [Inscription et propriété][1].

## Comparez les deux modèles {#compare-the-two-models}

|   | Politiques d'exécution | Connexions |
|---|---|---|
| **Fonctionne avec** | Runners dans le Datadog Agent uniquement | Runners autonomes et runners dans le Datadog Agent |
| **Comment l'accès est accordé** | Les tags de l'Agent ciblent un ou plusieurs ensembles de runners, de sorte qu'une politique gère l'accès à l'ensemble d'un parc au lieu d'une connexion distincte par intégration et par runner | Une connexion stocke des identifiants et les associe à un seul runner |
| **Credentials** | Les politiques d'exécution ne stockent aucun identifiant ; l'accès est accordé par les tags de l'Agent. Les actions nécessitant des identifiants (par exemple HTTP, GitLab et MongoDB) ne sont pas prises en charge. | La connexion contient les identifiants utilisés pour exécuter l'action |
| **Control** | Granulaire : autorisez ou refusez des actions spécifiques ou des ensembles d'actions, de même que des périmètres spécifiques à l'intégration, tels que les espaces de noms Kubernetes cibles pour une action Kubernetes | Par runner : une connexion cible un runner spécifique |

## Politiques d'exécution {#execution-policies}

Les **politiques d'exécution** sont un modèle d'autorisation pour les runners dans le Datadog Agent. Chaque politique gère l'accès à un ou plusieurs ensembles de runners à la fois. Au lieu d'une connexion distincte par intégration et par runner, vous utilisez des **tags de l'Agent** pour définir les Agents cibles. Vous leur associez ensuite une règle d'autorisation ou de refus.

Les politiques d'exécution offrent également un contrôle granulaire. Une politique peut autoriser ou refuser des actions spécifiques ou des ensembles d'actions. Elle peut également appliquer des périmètres spécifiques à l'intégration, tels que les espaces de noms Kubernetes cibles pour une action Kubernetes. L'accès est accordé via des tags de l'Agent plutôt que par des identifiants stockés ; ainsi, les politiques d'exécution ne stockent aucun identifiant et sont utilisées par des runners sans propriétaire dans l'Agent.

Pour en savoir plus sur les politiques d'exécution et leur configuration (cibles, règles, contrôle d'accès et utilisation de politiques d'exécution dans les workflows), consultez [Politiques d'exécution][2].

## Connexions {#connections}

Les connexions fonctionnent à la fois pour les runners autonomes et les runners dans le Datadog Agent, et constituent le modèle utilisé par les runners avec propriétaire.

Une connexion remplit deux fonctions :

- **Elle fait référence aux identifiants** nécessaires pour exécuter une action sur votre service. Les identifiants eux-mêmes (par exemple un API token, ou un nom d'utilisateur et un mot de passe) sont stockés localement avec le runner, dans un fichier d'identifiants sur son host ou conteneur ; la connexion y fait référence.
- **Elle associe ces identifiants à un seul runner.** Une connexion cible un seul runner, de sorte que les identifiants ne sont utilisés que par le runner que vous avez prévu.

Pour utiliser une connexion dans un workflow ou une application, vous devez disposer de l'autorisation appropriée pour cette connexion. L'accès à une connexion peut être restreint afin que seules les personnes qui en ont besoin puissent l'utiliser dans leurs workflows et leurs applications.

Pour obtenir les instructions de configuration complètes (création, modification et restriction des connexions, tags d'identifiant de connexion et groupes de connexion), consultez [Connexions][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/enroll_runner/
[2]: /fr/actions/private_actions/execution_policies/
[3]: /fr/actions/connections/