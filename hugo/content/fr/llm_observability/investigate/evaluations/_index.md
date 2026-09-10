---
aliases:
- /fr/tracing/llm_observability/evaluations/
- /fr/llm_observability/configuration/
- /fr/llm_observability/evaluations/
- /fr/llm_observability/configure/evaluations/
description: Apprenez à configurer les évaluations pour votre application LLM.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos prompts LLM avec Datadog LLM Observability.
title: Évaluations
---
## Présentation {#overview}

Agent Observability propose plusieurs moyens de prendre en charge les évaluations. Elles peuvent être configurées en accédant à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][8].

### Évaluations personnalisées LLM-as-a-judge {#custom-llm-as-a-judge-evaluations}

[Les évaluations personnalisées LLM-as-a-judge][1] vous permettent de définir votre propre logique d'évaluation à l'aide de prompts en langage naturel. Vous pouvez créer des évaluations personnalisées pour évaluer des critères subjectifs ou objectifs (comme le ton, l'utilité ou la véracité) et les exécuter à grande échelle sur vos traces et spans.

### Évaluations gérées {#managed-evaluations}

Datadog crée et prend en charge des [évaluations gérées][2] pour répondre aux cas d'utilisation courants. Vous pouvez les activer et les configurer au sein de l'application Agent Observability.

### Soumettre les commentaires des utilisateurs finaux {#submit-end-user-feedback}

[Les commentaires des utilisateurs finaux][13] vous permettent de soumettre des évaluations par pouce levé ou baissé, des modifications acceptées, des commentaires en texte libre et d'autres retours d'utilisateurs ou d'agents à Datadog. Les commentaires peuvent être associés à des spans, des traces, des sessions ou des entités définies par le client à l'aide d'une clé de jointure de commentaires.

### Soumettre des évaluations externes {#submit-external-evaluations}

Vous pouvez également soumettre des [évaluations externes][3] en utilisant l'API de Datadog. Utilisez cette approche lorsque vous disposez de votre propre système d'évaluation mais que vous souhaitez centraliser les résultats d'évaluation au sein de Datadog.

### Création d'évaluateurs personnalisés {#building-custom-evaluators}

Pour les développeurs créant des évaluateurs personnalisés, consultez le [Guide du développeur d'évaluations][10].

### Intégrations d'évaluations {#evaluation-integrations}

Datadog prend également en charge des intégrations avec certains frameworks d'évaluation tiers, tels que [NeMo][5].

### Files d'attente d'annotation {#annotation-queues}

Les [files d'attente d'annotation][11] fournissent un workflow structuré pour l'examen humain systématique des traces de LLM.

### Intégration de Sensitive Data Scanner {#sensitive-data-scanner-integration}

En plus d'évaluer les entrées et les sorties des requêtes LLM, des agents, des workflows ou de l'application, Agent Observability s'intègre au [Sensitive Data Scanner][6], qui aide à prévenir les fuites de données en identifiant et en masquant toute information sensible. Pour obtenir une liste des règles prêtes à l'emploi incluses avec Sensitive Data Scanner, consultez les [Règles de la bibliothèque][12].

### Sécurité {#security}

{{< learning-center-callout header="Obtenez des garde-fous de sécurité en temps réel pour vos applications et agents d'IA" btn_title="Rejoignez la préversion" hide_image="true" btn_url="https://www.datadoghq.com/product-preview/ai-security/">}}
  AI Guard aide à sécuriser vos applications et agents d'IA en temps réel contre les attaques par injection de prompt, jailbreaking, utilisation abusive d'outils et exfiltration de données sensibles. Essayez-le dès aujourd'hui !
{{< /learning-center-callout >}}

### Autorisations {#permissions}

Les [`Agent Observability Write` autorisations][7] sont nécessaires pour configurer les évaluations.

### Récupération des spans {#retrieving-spans}

Agent Observability propose une [API d'exportation][9] que vous pouvez utiliser pour récupérer des spans afin d'exécuter des évaluations externes. Cela permet d'éviter d'avoir à suivre les données pertinentes pour l'évaluation au moment de l'exécution.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[2]: /fr/llm_observability/investigate/evaluations/managed_evaluations
[3]: /fr/llm_observability/investigate/evaluations/external_evaluations
[5]: /fr/llm_observability/investigate/evaluations/external_evaluations/nemo
[6]: /fr/security/sensitive_data_scanner/
[7]: /fr/account_management/rbac/permissions/#llm-observability
[8]: https://app.datadoghq.com/llm/evaluations
[9]: /fr/llm_observability/investigate/export_api
[10]: /fr/llm_observability/investigate/evaluations/evaluation_developer_guide
[11]: /fr/llm_observability/investigate/annotation_queues
[12]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /fr/llm_observability/investigate/evaluations/end_user_feedback