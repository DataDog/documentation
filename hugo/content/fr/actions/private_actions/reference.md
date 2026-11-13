---
description: Reference Tables pour les paramètres de configuration des exécuteurs
  d'actions privées, les actions et intégrations prises en charge, et les formats
  de fichiers d'identifiants.
further_reading:
- link: actions/private_actions/
  tag: Documentation
  text: Présentation des Private Actions
- link: actions/private_actions/set_up_agent_based/
  tag: Documentation
  text: Configurez un exécuteur d'actions privé
- link: actions/private_actions/execution_policies/
  tag: Documentation
  text: Politiques d'exécution
- link: actions/connections/private_action_credentials/
  tag: Documentation
  text: Gestion des identifiants d'actions privées
title: Référence de l'exécuteur d'actions privées
---
## Présentation {#overview}

Cette page constitue la référence pour les exécuteurs d'actions privées et couvre les paramètres de configuration, les actions et intégrations prises en charge par chaque exécuteur, ainsi que les formats de fichiers d'identifiants. Pour en savoir plus sur les concepts et la configuration des Private Actions, consultez [Présentation des Private Actions][1].

## Configuration de l'exécuteur {#runner-configuration}

L'exécuteur lit ses paramètres depuis la section `private_action_runner` de sa [configuration][2].

Pour savoir comment les paramètres d'inscription (`self_enroll` et `api_key_only_enrollment`) s'intègrent dans l'inscription de l'exécuteur, consultez [Inscription et propriété][3].

Le même paramètre est nommé différemment selon la manière dont vous installez l'exécuteur. Les installations sur host utilisent des variables d'environnement, Helm utilise des clés en camelCase sous `privateActionRunner`, et le Datadog Operator utilise des clés en snake_case sous `private_action_runner`. Utilisez ce tableau pour traduire les paramètres communs entre les méthodes d'installation.

| Paramètre | Host (variable d'environnement) | Helm (`privateActionRunner.*`) | Opérateur (`private_action_runner.*`) |
|---|---|---|---|
| Activer | `DD_PRIVATE_ACTION_RUNNER_ENABLED` | `enabled` | `enabled` |
| Auto-inscription | `DD_PRIVATE_ACTION_RUNNER_SELF_ENROLL` | `selfEnroll` | `self_enroll` |
| Liste blanche d'actions | `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` (séparées par des virgules) | `actionsAllowlist` (liste) | `actions_allowlist` (liste) |

## Actions et intégrations prises en charge {#supported-actions-and-integrations}

Cette matrice indique, pour chaque intégration, sa disponibilité dans chaque type d'exécuteur et si elle peut être autorisée via les [Politiques d'exécution][4].

<div class="alert alert-info">La disponibilité dans l'Agent et l'autorisation via les politiques d'exécution sont indépendantes. Une intégration peut s'exécuter dans l'Agent sans être autorisable via une politique d'exécution.</div>

| Intégration | Exécuteur dans l'Agent | Autorisable via<br>Politiques d'exécution | Exécuteur autonome |
|---|:---:|:---:|:---:|
| Kubernetes | {{< X >}} | {{< X >}} | {{< X >}} |
| Action distante (par exemple, rshell) | {{< X >}} | {{< X >}} | {{< X >}} |
| Script | {{< X >}} | {{< X >}} | {{< X >}} |
| HTTP | {{< X >}} |  | {{< X >}} |
| GitLab | {{< X >}} |  | {{< X >}} |
| Jenkins | {{< X >}} |  | {{< X >}} |
| MongoDB | {{< X >}} |  | {{< X >}} |
| PostgreSQL |  |  | {{< X >}} |
| Temporal | {{< X >}} |  | {{< X >}} |

- **Action distante** est la famille d'intégration sous le préfixe `com.datadoghq.remoteaction`. Elle inclut le bundle rshell, dont l'action `runCommand` exécute des commandes shell via un shell restreint. Voir [Agent Restricted Shell (rshell)][8]
Les actions - **Script** sont limitées aux scripts *prédéfinis* déclarés dans le `script-config.yaml` de l'exécuteur. Pour configurer les actions de script (`runPredefinedScript` pour Linux ou `runPredefinedPowershellScript` pour Windows), consultez [Exécuter un script avec un exécuteur d'actions privées][5].

{{% collapse-content title="Actions disponibles par type d'exécuteur" level="h3" %}}

{{< partial name="actions/private_actions_allowlist.html" >}}

{{% /collapse-content %}}

## Formats de fichiers d'identifiants {#credential-file-formats}

Certaines intégrations, telles que HTTP, Jenkins, PostgreSQL, MongoDB et Temporal, nécessitent des identifiants pour fonctionner. Les identifiants sont fournis à l'exécuteur sous forme de fichiers JSON auxquels vous faites référence depuis une [connexion][6]. Chaque intégration possède sa propre structure de fichier d'identifiants et ses propres méthodes d'authentification prises en charge.

Pour obtenir l'ensemble complet des formats de fichiers d'identifiants et des exemples, consultez [Gestion des identifiants d'actions privées][7].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[3]: /fr/actions/private_actions/enroll_runner/
[4]: /fr/actions/private_actions/execution_policies/
[5]: /fr/actions/private_actions/run_script/
[6]: /fr/actions/connections/
[7]: /fr/actions/connections/private_action_credentials/
[8]: /fr/agent/guide/rshell/