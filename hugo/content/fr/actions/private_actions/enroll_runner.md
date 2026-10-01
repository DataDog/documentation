---
description: Comment un exécuteur d'actions privé s'inscrit auprès de Datadog, comment
  l'inscription définit la propriété de l'exécuteur, et comment la propriété détermine
  le modèle d'autorisation utilisé par l'exécuteur.
further_reading:
- link: /actions/private_actions/set_up_agent_based
  tag: Documentation
  text: Configurez un exécuteur d'actions privé
- link: /actions/private_actions/authorize_private_actions
  tag: Documentation
  text: Autoriser les actions privées
- link: /actions/private_actions/execution_policies
  tag: Documentation
  text: Politiques d'exécution
title: Inscription et propriété
---
## Présentation {#overview}

Lorsqu'un exécuteur d'actions privé démarre, il s'inscrit auprès de votre organisation Datadog. Il s'enregistre et reçoit une identité qu'il utilise pour s'authentifier à chaque requête. L'inscription définit également la **propriété** de l'exécuteur, et la propriété détermine le modèle d'autorisation qu'utilise l'exécuteur durant toute sa durée de vie. Comme vous ne pouvez pas modifier la propriété d'un exécuteur sans le réinscrire, choisissez délibérément votre méthode d'inscription avant de déployer.

L'inscription s'applique aux deux formes d'exécuteur. L'inscription sans propriétaire, et la politique d'autorisation d'exécution qui en découle, s'appliquent uniquement à un exécuteur dans le Datadog Agent. Un exécuteur autonome est toujours propriétaire.

## Le processus d'inscription {#the-enrollment-process}

1. Vous démarrez l'exécuteur avec un ensemble d'identifiants et une configuration qui l'active.
2. L'exécuteur s'enregistre auprès de Datadog. Par défaut (`self_enroll: true`), il le fait automatiquement au démarrage, sans étape manuelle.
3. Datadog attribue à l'exécuteur une identité: un identifiant d'exécuteur unique et une paire de clés. L'exécuteur conserve cette identité et la réutilise lors des redémarrages ultérieurs.
4. L'exécuteur utilise son identité pour s'authentifier auprès de Datadog et pour vérifier les tâches qu'il reçoit.

Pour pré-provisionner vous-même l'identité d'un exécuteur au lieu d'utiliser l'auto-inscription, consultez [Options de configuration](#configuration-options).

## Types d'inscription et propriété {#enrollment-types-and-ownership}

Vous inscrivez un exécuteur de deux manières. Le justificatif avec lequel vous inscrivez l'exécuteur définit la propriété de celui-ci, et la propriété détermine le modèle d'autorisation. Un seul exécuteur est autorisé par un modèle, et non par les deux. La propriété est définie une fois, lors de l'inscription, et demeure fixe pendant toute la durée de vie de l'exécuteur. Pour la modifier, réinscrivez l'exécuteur avec l'autre type de justificatif. Décidez du modèle que vous souhaitez avant de déployer, puis inscrivez l'exécuteur avec le justificatif correspondant. Pour comparer les deux modèles en détail, consultez [Autoriser des actions privées][5].

| Inscrire avec | Propriété de l'exécuteur | Modèle d'autorisation |
|---|---|---|
| Une **clé d'API** dotée de la fonctionnalité Private Action Runner | Sans propriétaire | [Politiques d'exécution][1] |
| Une **clé d'API** et une **clé d'application** | propriétaire | [Connexions][2] |

### Exécuteurs sans propriétaire {#ownerless-runners}

Un exécuteur inscrit avec une **clé d'API dotée de la fonctionnalité Private Action Runner** est **sans propriétaire**: il n'a aucun propriétaire individuel. Les exécuteurs sans propriétaire sont autorisés via des [politiques d'exécution][1], qui contrôlent l'accès par tags d'Agent dans l'ensemble de votre parc. L'inscription sans propriétaire s'applique aux exécuteurs dans le Datadog Agent.

La fonctionnalité **Private Action Runner** est indiquée par un badge, similaire à Remote Configuration. Sa gestion nécessite les autorisations de clé d'API **Lecture des clés d'API** (`api_keys_read`) et **Écriture des clés d'API** (`api_keys_write`). Pour plus d'informations, consultez [Autorisations des clés d'API et d'application][9].

Pour inscrire un exécuteur sans propriétaire :

1. Dans Datadog, accédez à [**Paramètres de l'organisation > Clés d'API**][3].
2. Créez ou sélectionnez une clé d'API et activez la fonctionnalité **Private Action Runner**.
3. Configurez l'exécuteur avec cette clé d'API et activez l'inscription par clé d'API uniquement. Pour les étapes de déploiement et la version requise de l'Agent, consultez [Configurer un exécuteur d'actions privées dans le Datadog Agent][4].

Sur Kubernetes, stockez la clé d'API dans un secret que l'exécuteur lit :

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

### Exécuteurs propriétaires {#owned-runners}

Un exécuteur inscrit avec une clé d'application est **propriétaire** : l'utilisateur qui effectue l'inscription devient le propriétaire de l'exécuteur. Les exécuteurs propriétaires sont autorisés avec [Connexions][2]. Lors de l'inscription, Datadog crée des connexions pour les intégrations figurant dans la liste d'autorisation de l'exécuteur, afin que celui-ci soit prêt à être utilisé avec ces intégrations.

L'inscription propriétaire est la méthode généralement disponible et fonctionne à la fois pour l'exécuteur autonome et pour l'exécuteur dans le Datadog Agent.

Sur Kubernetes, stockez la clé d'API et la clé d'application dans un secret que l'exécuteur lit :

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY> \
  --from-literal app-key=<DD_APP_KEY>
```

## Gérer l'accès aux exécuteurs propriétaires {#manage-access-to-owned-runners}

Cette section s'applique uniquement aux exécuteurs **propriétaires**. Un exécuteur sans propriétaire n'a pas de propriétaire individuel ; les personnes autorisées à exécuter des actions sur celui-ci sont contrôlées par des [politiques d'exécution][1].

Utilisez le [contrôle d'accès basé sur les rôles (RBAC)][6] pour contrôler l'accès à un exécuteur propriétaire. Vous pouvez définir des autorisations sur l'exécuteur pour restreindre les modifications ou empêcher l'ajout de nouvelles connexions. Par défaut, seul le créateur de l'exécuteur dispose d'un accès Editor ; le créateur peut accorder l'accès à d'autres utilisateurs, comptes de service, rôles ou équipes. Pour consulter la liste des autorisations applicables aux exécuteurs d'actions privés, consultez les [autorisations de rôle Datadog][7].

### Niveaux d'autorisation {#permission-levels}

**Viewer**
: Peut afficher l'exécuteur et les connexions qui y sont associées.

**Contributor**
: Peut afficher l'exécuteur et y contribuer en y associant de nouvelles connexions.

**Editor**
: Peut voir, contribuer (joindre de nouvelles connexions) et modifier l'exécuteur.

### Définir les autorisations sur un exécuteur {#set-permissions-on-a-runner}

1. Accédez à la page Edit de l'exécuteur.
2. Dans la section **Who Has Access?** , cliquez sur **Edit access**.
3. Sélectionnez un utilisateur, un compte de service, un rôle ou une équipe dans le menu déroulant, puis cliquez sur **Add**. Le principal sélectionné apparaît en bas de la boîte de dialogue.
4. À côté du nom du principal, sélectionnez l'autorisation souhaitée dans le menu déroulant.
5. Pour supprimer l'accès d'un principal, sélectionnez **Remove access** dans le menu déroulant des autorisations.
6. Cliquez sur **Done** pour finaliser la configuration des autorisations.
7. Cliquez sur **Save** pour appliquer les nouvelles autorisations à l'exécuteur.

## Options de configuration {#configuration-options}

Les paramètres ci-dessous contrôlent l'inscription. Pour obtenir la liste complète des paramètres de l'exécuteur et leurs valeurs par défaut, consultez la [référence de l'exécuteur d'actions privées][8].

| Paramètre | Objectif |
|---|---|
| `self_enroll` | S'inscrire automatiquement au démarrage. Activé par défaut. |
| `api_key_only_enrollment` | Inscrivez-vous en tant qu'exécuteur sans propriétaire à l'aide d'une clé d'API dotée de la fonctionnalité Private Action Runner. |
| `actions_allowlist` | Les actions que l'exécuteur est autorisé à exécuter. Pour les exécuteurs propriétaires, Datadog crée des connexions pour ces intégrations lors de l'inscription. |

### Stockage d'identité sur Kubernetes {#identity-storage-on-kubernetes}

Un exécuteur dans le Datadog Agent conserve son identité afin qu'elle survive aux redémarrages. L'endroit où l'identité est stockée dépend de l'exécuteur :

- **Exécuteur de l'Agent de cluster :** stocke son identité dans un secret Kubernetes, afin que l'identité soit partagée entre les répliques de l'Agent de cluster. Lorsqu'il est installé avec Helm ou le Datadog Operator, le nom du secret par défaut est `datadog-private-action-runner-identity`.
- **Exécuteur de l'Agent de nœud :** stocke son identité dans un fichier. Sur Kubernetes, sauvegardez ce chemin avec un volume persistant afin que l'identité survive aux redémarrages des pods.

## Identité de l'exécuteur et authentification des tâches {#runner-identity-and-task-authentication}

L'inscription donne à chaque exécuteur une clé privée à laquelle Datadog n'a jamais accès. Datadog authentifie l'exécuteur en utilisant la clé publique correspondante, afin que seuls vos exécuteurs puissent récupérer les tâches de votre organisation.

Datadog signe chaque tâche qu'il distribue, et l'exécuteur vérifie la signature avant d'exécuter la tâche.

## Rotation des identifiants privés de l'exécuteur {#rotating-private-runner-credentials}

Pour faire pivoter les identifiants d'un exécuteur privé sans redéployer, exécutez `/opt/datadog-agent/embedded/bin/privateactionrunner rotate-identity` sur un host ou un Agent de nœud, ou `/opt/datadog-agent/bin/datadog-cluster-agent rotate-par-identity` pour l'Agent de cluster.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/execution_policies/
[2]: /fr/actions/connections/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/actions/private_actions/set_up_agent_based/
[5]: /fr/actions/private_actions/authorize_private_actions/
[6]: /fr/account_management/rbac/
[7]: /fr/account_management/rbac/permissions/#app-builder--workflow-automation
[8]: /fr/actions/private_actions/reference/
[9]: /fr/account_management/rbac/permissions/#api-and-application-keys