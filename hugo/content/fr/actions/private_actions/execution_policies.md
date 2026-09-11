---
description: Contrôlez quels Datadog Agents votre équipe peut cibler avec des actions
  privées et quelles actions ils peuvent exécuter en utilisant des politiques d'exécution.
disable_toc: false
further_reading:
- link: /actions/private_actions/
  tag: Documentation
  text: Présentation des Private Actions
- link: /actions/private_actions/enroll_runner/
  tag: Documentation
  text: Inscription et propriété
- link: /actions/private_actions/authorize_private_actions/
  tag: Documentation
  text: Autoriser les actions privées
- link: /actions/connections/
  tag: Documentation
  text: Connexions
title: Politiques d'exécution
---
## Présentation {#overview}

Les politiques d'exécution vous permettent de contrôler qui, où et quelles actions votre équipe peut exécuter. Chaque politique d'exécution est une règle unique d'autorisation ou de refus pour un ensemble d'actions, ainsi que pour les Datadog Agents auxquels elle s'applique. Vous sélectionnez ces Datadog Agents à l'aide de tags d'Agent. Les politiques d'exécution vous offrent deux avantages principaux lorsque vous autorisez des actions privées :

- **Gérer l'accès à grande échelle** : Avec [Connections][1], vous créez une connexion par intégration sur chaque runner, ce qui devient difficile à gérer sur une large flotte. Les politiques d'exécution vous permettent de contrôler l'accès à de nombreux runners à la fois en sélectionnant des Datadog Agents à l'aide de tags. Une seule politique peut également lister plus d'un ensemble de Datadog Agents cibles, de sorte que la même règle peut couvrir plusieurs équipes ou environnements sans être dupliquée.
- **Contrôle précis** : Vous pouvez autoriser ou refuser des actions spécifiques ou des ensembles d'actions, et appliquer des scopes spécifiques à l'intégration, par exemple en limitant une politique Kubernetes à des espaces de noms cibles spécifiques.

Les politiques d'exécution s'appliquent aux private action runners fonctionnant **au sein du Datadog Agent** qui ont été inscrits comme *sans propriétaire*. Un private action runner sans propriétaire est inscrit avec une clé d'API qui possède la capacité Private Action Runner, plutôt qu'être associé à un utilisateur spécifique. Pour savoir comment un private action runner devient sans propriétaire, consultez [Inscription et propriété][2].

## Prérequis {#prerequisites}

- Un private action runner fonctionnant **au sein du Datadog Agent** et inscrit comme étant sans propriétaire (à l'aide d'une clé d'API possédant la capacité Private Action Runner).
- La permission `ExecutionGroupWrite`, qui vous permet de créer, mettre à jour et supprimer des politiques d'exécution. Voir [Permissions](#permissions).

## Autorisations {#permissions}

La création, la mise à jour et la suppression de politiques d'exécution nécessitent la permission `ExecutionGroupWrite`.

- Le rôle par défaut **Datadog Admin** inclut cette permission.
- Pour l'accorder à d'autres utilisateurs, ajoutez-la à un [rôle personnalisé][3] et attribuez ce rôle aux utilisateurs ou aux équipes qui gèrent les politiques d'exécution.

Cette permission contrôle qui peut **gérer** les politiques d'exécution. Pour contrôler qui peut **utiliser** une politique d'exécution spécifique pour exécuter des actions privées, consultez les paramètres [Access](#access) de cette politique d'exécution.

## Structure de la politique{#policy-structure}

Une politique d'exécution est une règle unique d'autorisation ou de refus pour un ensemble d'actions privées. Elle est composée de composants, notamment les actions qu'elle couvre et des Agents cibles auxquels elle s'applique.

Les sections [Targets](#targets) et [Access](#access) décrivent ces composants en détail. Pour créer une politique d'exécution avec tous ses composants, consultez la section [Créer une politique d'exécution](#create-an-execution-policy).

{{% collapse-content title="Targets" level="h3" id="targets" %}}

Targets sont les sélecteurs de tags qui choisissent les Datadog Agents (exécutant un private action runner) auxquels une politique d'exécution s'applique. Une politique peut définir plus d'une Target, de sorte que la même règle peut couvrir plus d'un ensemble de Datadog Agents sans dupliquer la politique. Par exemple, vous pouvez définir une Target par équipe ou par environnement.

Chaque Target est un ensemble de tags :

- Tags sont mis en correspondance avec la sémantique **AND**. Un Datadog Agent doit porter **tous** les tags d'une Target pour y correspondre.
- Pour faire correspondre chaque Datadog Agent disposant d'un private action runner activé, utilisez un caractère générique `*` seul comme Target.
- Les caractères génériques partiels ou patternés, tels que `env:*` ou `*:prod`, ainsi que la combinaison de `*` avec d'autres tags, ne sont **pas pris en charge**.
- Optionnellement, nommez une Target pour aider à distinguer plusieurs Targets sur la même politique.

Lors de la modification des tags d'une Target, Datadog affiche un décompte en temps réel du nombre de Datadog Agents qui y correspondent.

Une politique d'exécution sans Targets est valide, mais n'a aucun effet. Elle ne correspond jamais à un Datadog Agent, donc elle n'autorise jamais rien. Datadog étiquette ces politiques comme « targets nothing » afin que vous sachiez qu'il faut les compléter ou les supprimer.

{{% /collapse-content %}}

{{% collapse-content title="Accès" level="h3" id="access" %}}

Les politiques d'exécution possèdent des paramètres **Access** qui contrôlent qui peut les consulter et les gérer, et à qui une politique d'exécution s'applique. L'accès fonctionne conjointement avec la [`ExecutionGroupWrite`permission](#permissions). La permission décide qui peut gérer les politiques d'exécution, tandis que Access détermine quelles politiques d'exécution chaque utilisateur peut consulter, modifier ou auxquelles il est soumis.

Les politiques d'exécution ne stockent pas d'identifiants. Access contrôle uniquement le ciblage et l'autorisation.

| Niveau d'accès | Peut consulter | Peut modifier | Concerné par la politique |
|---|:---:|:---:|:---:|
| **Viewer** | Oui | Non | Non |
| **Resolver** | Oui | Non | Oui |
| **Editor** | Oui | Oui | Oui |

La question de savoir si une politique « applies to » un utilisateur est ce qui relie Access à l'autorisation. Une politique **Allow** n'accorde ses actions qu'aux utilisateurs auxquels elle s'applique, et une politique **Deny** ne restreint que les utilisateurs auxquels elle s'applique. Un **Viewer** peut voir la politique mais n'est jamais autorisé ni restreint par celle-ci.

Lorsque vous créez une politique d'exécution, vous en devenez l'Editor. Si une politique n'a aucun paramètre Access, elle s'applique à tous les membres de votre organisation.

{{% /collapse-content %}}

## Créer une politique d'exécution {#create-an-execution-policy}

1. Allez dans [**Actions > Execution Policies**][4] et cliquez sur **Create Execution Policy**.
2. Saisissez un nom dans **Name** (par exemple, `Read-only Kubernetes`) ou utilisez celui qui est automatiquement généré.
3. Définissez **Effect** sur **Allow** ou **Deny**.
4. Sous **Actions**, choisissez une intégration et les actions à inclure. Vous pouvez sélectionner des actions spécifiques, sélectionner des ensembles entiers ou utiliser les sélecteurs spéciaux **Toutes les actions** / **Toutes en lecture seule**.
5. Définissez éventuellement un périmètre. Par exemple, pour Kubernetes, définissez **Target Namespaces** pour limiter la politique à des espaces de noms spécifiques.
6. Sous **Targets**, ajoutez une ou plusieurs tags pour sélectionner les Datadog Agents auxquels s'applique cette politique. Un Datadog Agent doit porter tous les tags d'une Target pour y correspondre. Pour cibler chaque Datadog Agent sur lequel un private action runner sans propriétaire est activé, utilisez un caractère générique `*` seul. Ajoutez plusieurs Targets pour appliquer la même politique à plusieurs ensembles de Datadog Agents. Pour plus d'informations, consultez la section [Targets](#targets).
7. Under **Access**, définissez qui peut visualiser, modifier et à qui la politique s'applique. Pour plus d'informations, consultez la section [Access](#access).
8. Click on **Create**.

## Utiliser une politique d'exécution dans un workflow {#use-an-execution-policy-in-a-workflow}

Lorsque vous configurez une étape private action dans un workflow, vous pouvez cibler un Datadog Agent directement au lieu de sélectionner une connexion :

1. Dans le sélecteur de connexion de l'étape, choisissez **Target** au lieu de **Connection**.
2. Sélectionnez comment identifier le Datadog Agent:
    - **Hostname** : pour un private action runner sur un host Datadog Agent spécifique.
    - **Orch Cluster ID** : pour un private action runner dans un Kubernetes Cluster Agent.
3. Saisissez le hostname ou l'Orch Cluster ID du target Datadog Agent.

Cela crée une connexion virtuelle pour l'étape, identifiée uniquement par le target Datadog Agent ; elle ne contient aucune information d'identification. Lorsque le workflow s'exécute, l'action s'exécute uniquement si une politique d'exécution l'autorise pour ce Target et pour l'utilisateur demandeur.

## Intégrations prises en charge {#supported-integrations}

Les politiques d'exécution autorisent des actions pour les intégrations suivantes :

- **Kubernetes** (`com.datadoghq.kubernetes.*`)
- **Remote Action** (`com.datadoghq.remoteaction.*`), qui inclut le bundle rshell (action `runCommand`) et les actions Network Path.
- **Script** (`com.datadoghq.script.*`).

La [Private Action Runner Reference][5] indique les actions prises en charge par chaque type de runner. Si votre intégration ne peut pas être autorisée via des politiques d'exécution, utilisez plutôt [Connections][1].

## Politiques d'exécution par défaut {#default-execution-policies}

Datadog provisionne les politiques d'exécution par défaut dans votre organisation afin que les actions en lecture seule fonctionnent dès qu'un runner s'inscrit. Aucune configuration de votre part n'est requise. Elles :

- Ciblent chaque Agent qui exécute un private action runner (sélecteur de cible `*`).
- Accordent des actions **Kubernetes en lecture seule** et **Remote Action en lecture seule**.
- Permettez à **tout le monde de votre organisation** d'exécuter ces actions en lecture seule. Les utilisateurs disposant de l'autorisation `ExecutionGroupWrite`, incluse par défaut dans le rôle Datadog Admin, peuvent également les modifier.

Les politiques d'exécution par défaut ne couvrent que les actions en lecture seule. Pour exécuter des actions en écriture, ou pour limiter l'accès à des Agents, espaces de noms, équipes ou utilisateurs spécifiques, consultez [Créer une politique d'exécution](#create-an-execution-policy).

## Workflow d'autorisation {#authorization-workflow}

Comme l'autorisation s'effectue dans Datadog avant l'envoi d'une tâche, le runner n'exécute que les actions qui ont déjà été autorisées. Lorsqu'une action privée est demandée sur un runner dans le Datadog Agent :

1. Datadog identifie le **target Agent** (par nom de host ou orchestration cluster ID) et ses tags.
2. Datadog trouve les politiques d'exécution dont les **Targets** correspondent à ces tags.
3. Datadog évalue les **politiques** correspondantes pour l'action demandée et l'utilisateur demandeur.
4. Si une politique autorise l'action et qu'aucune politique ne l'interdit, la tâche est envoyée à l'Agent, qui l'exécute. Sinon, l'action est refusée et n'atteint jamais l'Agent.

L'évaluation suit deux règles :

- **Default deny** : si aucune politique n'autorise explicitement l'action, celle-ci est refusée.
- **Deny overrides allow** : si une politique correspondante refuse l'action, celle-ci est refusée, même si une autre politique l'autorise.

Les politiques d'exécution ne stockent pas d'identifiants. Elles répondent à la question de savoir *où* les actions peuvent s'exécuter, *quelles* actions peuvent s'exécuter et *qui* peut les exécuter.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/connections/
[2]: /fr/actions/private_actions/enroll_runner/
[3]: /fr/account_management/rbac/
[4]: https://app.datadoghq.com/actions/execution-policies
[5]: /fr/actions/private_actions/reference/