---
description: Utilisez des agents IA pour créer, gérer, exécuter et déboguer des workflows
  avec la suite d'outils de workflows de Datadog MCP Server.
further_reading:
- link: mcp_server/setup
  tag: Documentation
  text: Configurer Datadog MCP Server
- link: mcp_server
  tag: Documentation
  text: Présentation de Datadog MCP Server
- link: mcp_server/tools
  tag: Documentation
  text: Outils de Datadog MCP Server
- link: actions/workflows/
  tag: Documentation
  text: Workflow Automation
title: Outils MCP de Workflow Automation
---
## Présentation {#overview}

Le [Datadog MCP Server][1] permet aux agents IA de créer et de gérer des workflows via le [Model Context Protocol (MCP)][2].

La suite d'outils `workflows` donne aux clients IA tels que Claude Code, Cursor et OpenAI Codex accès à vos workflows, à Action Catalog, au workflow schema et aux données d'exécution. En utilisant le langage naturel, vous pouvez créer et mettre à jour des workflows, valider leurs spécifications, exécuter des workflows publiés et étudier les résultats d'exécution.

## Cas d'utilisation {#use-cases}

Utilisez la suite d'outils `workflows` pour créer des automatisations qui :

- **Étudier les alertes de monitor** : lorsqu'un monitor de taux d'erreur de service émet une alerte, exécutez Bits Investigation pour corréler la latence, les déploiements récents et l'état de santé des services en aval, puis envoyez les résultats à l'équipe responsable sur Slack.
- **Utiliser des agents personnalisés** : créez un agent Bits Agent Builder personnalisé pour un système spécialisé, tel que les paiements, les pipelines de données ou Kubernetes, et invoquez-le depuis un workflow chaque fois qu'une alerte nécessite cette expertise de domaine.
- **Automatiser l'escalade d'incidents** : lorsqu'un incident critique est déclaré, rassemblez le contexte de service pertinent, contactez l'équipe d'astreinte appropriée, créez un cas et informez les parties prenantes.
- **Étudier les régressions de déploiement** : après un déploiement, comparez le comportement actuel du service avec les changements récents et, lorsqu'une régression probable est détectée, démarrez une session Bits Code pour étudier le code pertinent et proposer une correction.
- **Déclencher une remédiation à partir d'une alerte** : lorsqu'un monitor détecte une condition de défaillance connue, exécutez une action de remédiation telle que le redémarrage d'un service, l'invocation d'une fonction AWS Lambda ou l'appel d'un endpoint de remédiation interne.
- **Créer des correctifs de code** : étudiez un problème, demandez à Bits Code de proposer une modification de code, exigez une révision humaine et implémentez la modification une fois le correctif proposé approuvé.
- **Escalader les résultats de sécurité de haute gravité** : lorsqu'une découverte critique est détectée, créez un cas ou un ticket, informez l'équipe responsable et contactez le répondant approprié.

## Démarrage rapide {#quickstart}

<div class="alert alert-info">Le <code>workflows</code> La suite d'outils n'est pas activée par défaut pour les clients MCP externes.</div>

1. [Configurer Datadog MCP Server][1].
1. Lors de la connexion de votre client IA à Datadog MCP Server, ajoutez `workflows` au paramètre `toolsets`. Par exemple, pour le site Datadog US1 :

    {{< code-block lang="none" >}}
https://mcp.datadoghq.com/v1/mcp?toolsets=core,workflows
{{< /code-block >}}

    **Remarque** : Si vous vous authentifiez à l'aide d'une clé d'application, activez l'[accès à l'API Actions][3] pour cette clé depuis [**Paramètres de l'organisation > Clés d'application**][4]. L'accès à l'API Actions est désactivé par défaut pour les clés d'application et est requis pour accéder aux Workflow Automation APIs.

1. Après la connexion, vous pouvez effectuer des demandes, et votre client IA appelle les outils appropriés en votre nom.
    - « Trouver les workflows appartenant à mon équipe qui sont déclenchés par des alertes de monitor. »
    - « Créer un workflow qui exécute Bits Investigation lorsque ce monitor émet une alerte, puis publie les résultats sur Slack. »
    - « Déboguer ma dernière exécution de workflow ayant échoué. »

## Autorisations {#permissions}

Les outils MCP de Workflow Automation utilisent les autorisations Datadog existantes de l'utilisateur. Les opérations sont effectuées dans l'organisation Datadog utilisée pour authentifier le MCP.

| Autorisation       | Capacités                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| Workflows Read   | Rechercher et récupérer des workflows, des schémas et des actions, valider des spécifications et inspecter des exécutions |
| Workflows Write  | Créer, mettre à jour, publier, dépublier et supprimer définitivement des workflows |
| Workflows Run    | Démarrer des workflows et annuler des exécutions en cours |

## Outils disponibles {#available-tools}

L'ensemble d'outils `workflows` expose les outils suivants, regroupés par la partie du cycle de vie du workflow qu'ils prennent en charge. Cela inclut la recherche et l'inspection de workflows, la découverte de spécifications et d'actions, la création et la gestion de workflows, la validation de spécifications, l'exécution et l'inspection d'exécutions, ainsi que le débogage d'étapes. Lorsque vous effectuez une demande d'automatisation en langage naturel, votre client IA appelle ces outils en votre nom. Il enchaîne leurs résultats pour produire le résultat souhaité. Consultez la [Datadog MCP Server tools reference][5] pour obtenir tous les détails sur chaque outil, y compris les autorisations et des exemples de demandes.

### Découverte de workflows {#workflow-discovery}

- [`list_datadog_workflows`][6]
- [`get_datadog_workflow`][7]

### Spécification et découverte d'actions {#specification-and-action-discovery}

- [`get_datadog_workflow_spec_schema`][8]
- [`search_datadog_workflow_actions`][9]
- [`get_datadog_workflow_action`][10]

### Création et gestion de workflows {#workflow-creation-and-management}

- [`create_datadog_workflow`][11]
- [`update_datadog_workflow`][12]
- [`publish_datadog_workflow`][13]
- [`unpublish_datadog_workflow`][14]
- [`delete_datadog_workflow`][15]
- [`validate_datadog_workflow`][16]

### Exécution de workflows {#workflow-execution}

- [`execute_datadog_workflow`][17]
- [`get_datadog_workflow_instance`][18]
- [`list_datadog_workflow_instances`][19]
- [`cancel_datadog_workflow_instance`][20]
- [`get_datadog_workflow_step_data`][21]

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /fr/account_management/api-app-keys/#actions-api-access
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /fr/mcp_server/tools/#workflows
[6]: /fr/mcp_server/tools/#list_datadog_workflows
[7]: /fr/mcp_server/tools/#get_datadog_workflow
[8]: /fr/mcp_server/tools/#get_datadog_workflow_spec_schema
[9]: /fr/mcp_server/tools/#search_datadog_workflow_actions
[10]: /fr/mcp_server/tools/#get_datadog_workflow_action
[11]: /fr/mcp_server/tools/#create_datadog_workflow
[12]: /fr/mcp_server/tools/#update_datadog_workflow
[13]: /fr/mcp_server/tools/#publish_datadog_workflow
[14]: /fr/mcp_server/tools/#unpublish_datadog_workflow
[15]: /fr/mcp_server/tools/#delete_datadog_workflow
[16]: /fr/mcp_server/tools/#validate_datadog_workflow
[17]: /fr/mcp_server/tools/#execute_datadog_workflow
[18]: /fr/mcp_server/tools/#get_datadog_workflow_instance
[19]: /fr/mcp_server/tools/#list_datadog_workflow_instances
[20]: /fr/mcp_server/tools/#cancel_datadog_workflow_instance
[21]: /fr/mcp_server/tools/#get_datadog_workflow_step_data
[22]: /fr/actions/actions_catalog/