---
aliases:
- /fr/service_management/workflows/private_actions/
- /fr/service_management/app_builder/private_actions/
description: Exécutez des actions sur des services de votre réseau privé à partir
  des produits Datadog, en utilisant un exécuteur d'actions privé comme couche d'exécution
  et d'autorisation pour les actions sur site.
disable_toc: false
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: Documentation
  text: Configurez un exécuteur d'actions privé
- link: actions/private_actions/enroll_runner
  tag: Documentation
  text: Inscription et propriété
- link: /actions/private_actions/authorize_private_actions/
  tag: Documentation
  text: Autoriser les Private Actions
title: Private Actions
---
## Présentation {#overview}

Les Private Actions vous permettent d'exécuter des actions sur des services de votre réseau privé, tels que des clusters Kubernetes, des hosts internes, des bases de données et des API internes, sans exposer ces services à l'internet public. Vous les exécutez via un exécuteur d'actions privé que vous déployez dans votre environnement, soit à l'intérieur du Datadog Agent (recommandé), soit en tant qu'exécuteur autonome. Les produits Datadog qui utilisent des Private Actions incluent Workflow Automation, App Builder, Datadog MCP et Bits AI investigations

Les Private Actions reposent sur deux couches :

- [**L'exécuteur d'actions privé**](#private-action-runner) exécute les actions. Il s'exécute dans votre réseau, reçoit les tâches d'action de Datadog, exécute chaque tâche sur le service cible et renvoie le résultat à Datadog.
- [**La couche d'autorisation**](#authorization-models) est gérée dans Datadog. Elle définit quels utilisateurs et quels produits peuvent exécuter quelles actions sur quels exécuteurs, et autorise ou refuse chaque action avant qu'elle n'atteigne un exécuteur. Les actions qu'un exécuteur est autorisé à effectuer sont également restreintes côté Agent, par la liste d'autorisation des actions dans la configuration de l'Agent (`datadog.yaml`).

## Exécuteur d'actions privé {#private-action-runner}

L'exécuteur d'actions privé est le composant que vous déployez dans votre environnement pour exécuter des Private Actions. Il ouvre une connexion sortante vers Datadog, interroge les tâches d'action, exécute chaque tâche sur le service cible et renvoie le résultat.

L'exécuteur d'actions privé est disponible sous deux formes : un exécuteur autonome que vous déployez et gérez vous-même, ou un exécuteur intégré au Datadog Agent.

| | Exécuteur dans le Datadog Agent | Exécuteur autonome |
|---|---|---|
| **Ce que c'est** | Un composant du Datadog Agent, activé avec un seul flag de configuration. | Un conteneur dédié que vous pouvez installer et gérer indépendamment du Datadog Agent. |
| **Idéal si** | Vous exécutez déjà le Datadog Agent et souhaitez gérer l'exécuteur via le cycle de vie de l'Agent. | Vous avez besoin d'une intégration qui n'est pas encore disponible dans l'Agent. |
| **Statut** | Recommandé pour les nouveaux déploiements. | Pris en charge (mode maintenance). |

<div class="alert alert-tip">Datadog recommande d'exécuter l'exécuteur d'actions privé dans le Datadog Agent</div>

Pour les étapes d'installation, consultez [Configurer un exécuteur d'actions privé dans le Datadog Agent][1] ou [Configurer un exécuteur autonome][2].

## Modèles d'autorisation {#authorization-models}

Datadog propose deux modèles d'autorisation. Le modèle utilisé par un exécuteur est défini lors de son inscription et découle de la propriété de l'exécuteur. Pour plus d'informations, consultez [Inscription et propriété][3].

- **Les politiques d'exécution** s'appliquent aux exécuteurs dans le Datadog Agent et sont conçues pour gérer les accès à grande échelle. Au lieu de créer une connexion distincte pour chaque intégration sur chaque exécuteur, vous utilisez des tags d'Agent pour cibler un ou plusieurs ensembles d'exécuteurs. Les politiques d'exécution vous offrent également un contrôle précis : vous pouvez autoriser ou refuser des actions spécifiques ou des ensembles d'actions, et appliquer des périmètres spécifiques à l'intégration, tels que les espaces de noms Kubernetes cibles pour une action Kubernetes.
- **Les connexions** sont disponibles à la fois pour l'exécuteur dans l'Agent et pour l'exécuteur autonome. Elles peuvent être associées à un seul exécuteur au maximum. Une connexion peut stocker des identifiants pour un service.

Pour comparer les deux modèles et décider lequel s'applique à votre exécuteur, consultez [Autoriser les Private Actions][4].

## Étapes suivantes {#next-steps}

- **Vous débutez avec les Private Actions** : suivez [Premiers pas avec les Private Actions][7] pour déployer un exécuteur et exécuter votre première action.
- **Vous disposez d'un exécuteur dans le Datadog Agent et souhaitez un contrôle d'accès à l'échelle du parc** : autorisez-le avec les [Politiques d'exécution][5].
- **Vous disposez d'un exécuteur dans l'Agent ou d'un exécuteur autonome et souhaitez autoriser un seul exécuteur** : autorisez-le avec les [Connexions][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/set_up_agent_based/
[2]: /fr/actions/private_actions/set_up_standalone/
[3]: /fr/actions/private_actions/enroll_runner/
[4]: /fr/actions/private_actions/authorize_private_actions/
[5]: /fr/actions/private_actions/execution_policies/
[6]: /fr/actions/connections/
[7]: /fr/actions/private_actions/getting_started/