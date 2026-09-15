---
description: Créez et déployez des agents IA personnalisés qui automatisent les tâches
  opérationnelles à l'aide des outils et intégrations de Datadog.
further_reading:
- link: /actions/actions_catalog/
  tag: Documentation
  text: Action Catalog
- link: /actions/workflows/
  tag: Documentation
  text: Workflow Automation
- link: /account_management/billing/ai_credits/
  tag: Documentation
  text: Crédits IA
- link: /incident_response/case_management/ai/custom_agents/
  tag: Documentation
  text: Intégration de Work Management avec Bits Agent Builder
- link: https://www.datadoghq.com/knowledge-center/aiops/ai-agents/
  tag: Centre de connaissances
  text: Qu'est-ce que les agents IA et comment fonctionnent-ils ?
- link: https://www.datadoghq.com/blog/bits-agent-builder/
  tag: Blog
  text: 'Présentation de Bits Agent Builder : créez des flux de travail agentiques
    pour la réponse aux alertes et la remédiation'
title: Bits Agent Builder
---
## Présentation {#overview}

Bits Agent Builder vous permet de créer des agents IA personnalisés qui utilisent les outils et intégrations de Datadog pour automatiser les tâches opérationnelles. Les agents peuvent rechercher dans les logs, interroger des métriques, créer des éléments de travail, envoyer des messages ou effectuer toute action depuis le [Action Catalog][7].

Utilisez des agents pour gérer le travail trop complexe pour une automatisation statique mais trop répétitif pour les humains. Par exemple, le tri des erreurs, la réponse aux incidents, l'analyse des tendances et l'escalade des problèmes.

<div class="alert alert-info">Bits Agent Builder consomme des <a href="/account_management/billing/ai_credits/">crédits IA</a>.</div>

{{< img src="/actions/agents/agent-builder-interface.png" alt="L'éditeur Bits Agent Builder affichant les instructions, le modèle, les outils et la configuration de l'automatisation" style="width:100%;" >}}

## Créer un agent {#create-an-agent}

Depuis la [page Bits Agent Builder][1], cliquez sur **Nouvel agent**. À partir de là, vous pouvez créer un agent de trois manières :

- **Créer avec l'IA** : décrivez ce que vous souhaitez que l'agent fasse en langage naturel. Bits Agent Builder génère les instructions, sélectionne les outils pertinents et configure l'agent pour vous.
- **Start from a blueprint** : choisissez un template préétabli pour des cas d'utilisation courants tels que le tri des erreurs, la réponse aux incidents, l'analyse de sécurité ou l'assistance DevOps. Les blueprints sont préconfigurés avec des instructions, des outils et des automatisations, et sont personnalisables.
- **Partir de zéro** : Configurez l'agent manuellement — rédigez des instructions, choisissez un modèle et ajoutez des outils.

{{< img src="/actions/agents/empty-state.png" alt="La nouvelle interface de création d'agent de Bits Agent Builder affichant un champ de texte et des options de blueprint." style="width:100%;" >}}

## Configurez votre agent{#configure-your-agent}

### Instructions{#instructions}

Les instructions indiquent à l'agent ce qu'il doit faire lorsqu'il s'exécute. Rédigez-les en langage naturel — décrivez l'objectif, le processus et les éventuelles contraintes. Modifiez les instructions directement ou affinez-les via l'interface de chat.

Rédigez des instructions spécifiques et axées sur les résultats. Exemple :

```
You are an Incident Responder AI assistant specialized in managing
and coordinating incident response activities.

Your role involves:
- Guiding incident response procedures and best practices
- Helping assess incident severity and impact
- Coordinating communication between teams and stakeholders
- Managing incident lifecycle from detection to resolution
- Facilitating post-incident reviews and improvements

During incident response:
1. Use search_datadog_logs to pull recent error logs for the affected service
2. Help classify incident severity (P0/P1/P2/etc.)
3. Guide through incident response runbooks and procedures
4. Assist with stakeholder communication and updates
5. Track action items and follow-up tasks
6. Support post-mortem analysis and lessons learned

Focus on clear communication, structured processes, and continuous
improvement of incident response capabilities.
```

### Model {#model}

Sélectionnez le LLM qui alimente le raisonnement de l'agent. Les modèles varient en termes de capacité, de vitesse et de coût — choisissez en fonction de la charge de travail de votre agent. Vous pouvez comparer les modèles à l'aide de [l'outil de comparaison d'OpenAI][6] et du [comparatif des modèles d'Anthropic][5].

### Tools {#tools}

Les outils définissent les actions que l'agent peut effectuer. Ajoutez des outils depuis le [Action Catalog][7] . L'agent ne peut utiliser que les outils qui ont été ajoutés à sa configuration.

Cliquez sur n'importe quel outil ajouté pour coder en dur ses paramètres. Par exemple, verrouillez un outil Slack sur un canal spécifique ou une requête de journaux sur un service spécifique.

Le [Datadog MCP Server][8] est activé par défaut. Vous pouvez vous connecter à n'importe quelle API en utilisant des [custom HTTP actions][12].

### Automations {#automations}

Configurez votre agent pour qu'il s'exécute automatiquement avec un [schedule][13], ou déclenchez-le à partir d'un [monitor][14], d'un [incident][15] ou d'un [security signal][16] Datadog. Ces automatisations utilisent [Workflow Automation][9].

## Testez votre agent {#test-your-agent}

Utilisez l'interface de chat intégrée pour tester votre agent. Envoyez des messages, examinez le raisonnement de l'agent et vérifiez qu'il prend les bonnes mesures. L'historique du chat est conservé entre les sessions.

## Orchestration d'agent {#agent-orchestration}

Utilisez des agents dans [Workflow Automation][9] et [App Builder][10] via l'action **Run Agent**. Cela vous permet d'intégrer le raisonnement IA dans n'importe quel workflow :

{{< img src="/actions/agents/run-agent-step.png" alt="Configuration de l'étape Run Agent dans un workflow, montrant la sélection de l'agent, les instructions d'exécution, l'ID de conversation et les champs de schéma de sortie." style="width:100%;" >}}

1. Ouvrez ou créez un workflow dans [Workflow Automation][9], ou ouvrez ou créez une application dans [App Builder][10].
1. Ajoutez l'étape **Run Agent** depuis le [Action Catalog].
1. Sélectionnez l'agent à exécuter.
1. Rédigez les **Run Instructions**—l'invite que l'agent reçoit à chaque exécution. Utilisez des variables telles que `{{Source.form}}` pour transmettre les données de déclenchement.

L'étape **Run Agent** prend également en charge les champs optionnels suivants :

- **Output Schema** : définissez un schéma JSON pour la réponse de l'agent. Lorsqu'il est défini, l'agent structure sa sortie pour correspondre au schéma afin de l'utiliser dans les étapes suivantes. Par exemple, vous pouvez définir un schéma avec un champ `requestType`, puis effectuer une branche sur `Run Agent.finalResponse.requestType` dans une étape de condition Si.

  {{< img src="/actions/agents/output-schema-example.png" alt="Un workflow utilisant l’Output Schema pour effectuer une branche sur les champs de réponse de l'agent." style="width:100%;" >}}

- **Conversation ID** : Par défaut, chaque invocation de Run Agent est une exécution autonome à tour unique. Transmettre un ID de conversation permet à l'agent de conserver le contexte sur plusieurs exécutions de workflow. Les sessions à plusieurs tours sont soumises aux mêmes limites de fenêtre de contexte que l'interface utilisateur de chat.

L'agent s'exécute avec ses outils et instructions configurés, puis renvoie sa sortie au workflow. Vous pouvez combiner l'automatisation basée sur des règles avec le raisonnement IA dans un seul workflow.

### Automatically Assign Agents to Work Items {#automatically-assign-agents-to-work-items}

[Work Management][17] est l'outil de billetterie intégré de Datadog pour le suivi du travail humain et agentique. Vous pouvez créer des agents personnalisés pour aider à trier et résoudre votre travail, et affecter automatiquement ces agents aux éléments de travail.

## Dépannage {#troubleshooting}

**L'agent n'utilise pas d'outil** : Vérifiez que l'outil a été ajouté à la configuration de l'agent. Les agents ne peuvent utiliser que les outils qui sont explicitement ajoutés.

**L'automatisation ne s'exécute pas** : Vérifiez que l'automatisation est publiée et que l'étape Exécuter l'agent est entièrement configurée.

**Conversation length limit** : Les conversations longues peuvent atteindre la limite de longueur de contexte. Si cela se produit, démarrez une nouvelle conversation. 

**Unexpected configuration changes** : Utilisez [Audit Trail][11] filtré par l'ID de votre agent pour examiner l'historique des modifications.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison
[6]: https://developers.openai.com/api/docs/models
[7]: /fr/actions/actions_catalog/
[8]: /fr/mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[11]: /fr/account_management/audit_trail/
[12]: /fr/actions/actions_catalog/http-action/
[13]: /fr/actions/workflows/trigger/#scheduled-triggers
[14]: /fr/actions/workflows/trigger/#monitor-triggers
[15]: /fr/actions/workflows/trigger/#incident-triggers
[16]: /fr/actions/workflows/trigger/#security-triggers
[17]: /fr/incident_response/work_management/ai/custom_agents/