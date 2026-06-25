---
aliases:
- /fr/tracing/llm_observability/
further_reading:
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-dashboards
  tag: Blog
  text: Créer des agents de tableau de bord fiables avec Datadog Agent Observability
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Maximiser le retour sur investissement de l''IA : Comment Datadog relie coût,
    performance et infrastructure pour vous permettre de passer à l''échelle de manière
    responsable'
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog Agent Observability prend en charge nativement les conventions sémantiques
    OpenTelemetry GenAI
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenez de la visibilité sur les flux de travail des agents Strands avec Datadog
    Agent Observability
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: Blog
  text: Surveillez vos applications Anthropic avec Datadog Agent Observability
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: Blog
  text: Meilleures pratiques pour surveiller les attaques par injection de prompt
    LLM afin de protéger les données sensibles
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: Blog
  text: Optimisez la performance des applications LLM avec l'intégration vLLM de Datadog
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimisez et dépannez l'infrastructure IA avec la surveillance GPU de Datadog
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: Blog
  text: Surveillez les agents construits sur Amazon Bedrock avec Datadog Agent Observability
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifiez les risques de sécurité courants dans les serveurs MCP
- link: https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/
  tag: Blog
  text: 'Abus de l''infrastructure IA : Comment des identifiants et des ressources
    mal gérés exposent les applications LLM'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: Blog
  text: Comment nous avons réduit notre temps de débogage de l'agent NLQ de plusieurs
    heures à quelques minutes avec Agent Observability
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centre d'apprentissage
  text: Traçage des applications LLM
title: Agent Observability
---
{{< learning-center-callout header="Essayez de commencer avec Agent Observability dans le Centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/llm-obs-getting-started">}}
  Apprenez à surveiller la performance, les coûts, les traces, l'utilisation des jetons et les erreurs de votre application LLM pour identifier et résoudre les problèmes.
{{< /learning-center-callout >}}

## Aperçu {#overview}

Avec Agent Observability, vous pouvez surveiller, dépanner et évaluer vos applications alimentées par LLM, telles que les chatbots. Vous pouvez enquêter sur la cause profonde des problèmes, surveiller la performance opérationnelle et évaluer la qualité, la confidentialité et la sécurité de vos applications LLM.

Chaque requête effectuée par votre application est représentée comme une trace sur la page [**Agent Observability**][1] dans Datadog.

{{< img src="llm_observability/traces.png" alt="Une liste de traces de paires de requêtes-réponses sur la page d'observabilité LLM" style="width:100%;" >}}

Une trace peut représenter :

- Une inférence LLM individuelle, y compris les jetons, les informations d'erreur et la latence
- Un flux de travail LLM prédéterminé, qui est un regroupement d'appels LLM et de leurs opérations contextuelles, telles que les appels d'outils ou les étapes de prétraitement
- Un flux de travail LLM dynamique exécuté par un agent LLM

Chaque trace contient des spans représentant chaque choix effectué par un agent ou chaque étape d'un flux de travail donné. Une trace donnée peut également inclure des entrées et des sorties, la latence, des problèmes de confidentialité, des erreurs, et plus encore. Pour plus d'informations, voir [Termes et Concepts][2].

## Déboguer avec un traçage de bout en bout {#troubleshoot-with-end-to-end-tracing}

Visualisez chaque étape des chaînes et des appels de vos applications LLM afin d'identifier les requêtes problématiques et de déterminer la cause profonde des erreurs.

{{< img src="llm_observability/errors.png" alt="Erreurs survenues dans une trace dans l'onglet Erreurs dans un panneau latéral de trace" style="width:100%;" >}}

## Surveillez les indicateurs opérationnels et optimisez les coûts {#monitor-operational-metrics-and-optimize-cost}

Surveillez le coût, la latence, la performance et les tendances d'utilisation de toutes vos applications LLM avec [tableaux de bord prêts à l'emploi][7].

{{< img src="llm_observability/dashboard_1.png" alt="Le tableau de bord prêt à l'emploi Agent Observability Operational Insights dans Datadog." style="width:100%;" >}}

## Évaluez la qualité et l'efficacité de vos applications LLM {#evaluate-the-quality-and-effectiveness-of-your-llm-applications}

Comprenez ce que les utilisateurs demandent à votre application LLM, identifiez les lacunes de couverture et surveillez la qualité des réponses au fil du temps avec [Patterns][10] — regroupement thématique hiérarchique automatisé de votre trafic de production.

{{< img src="llm_observability/topic-detail.png" alt="Vue détaillée du sujet montrant un nuage de points des embeddings d'interaction aux côtés d'un tableau d'interactions avec des étiquettes de sujet et un score de confiance" style="width:100%;" >}}

## Protégez les données sensibles et identifiez les utilisateurs malveillants {#safeguard-sensitive-data-and-identify-malicious-users}

Scannez automatiquement et masquez toute donnée sensible dans vos applications d'IA et identifiez les injections de prompt, parmi d'autres évaluations.

{{< img src="llm_observability/prompt_injection.png" alt="Un exemple d'une tentative d'injection de prompt détectée par l'observabilité LLM" style="width:100%;" >}}

## Consultez les anomalies mises en évidence sous forme d'insights {#see-anomalies-highlighted-as-insights}

Agent Observability Insights offre une expérience de surveillance qui aide les utilisateurs à identifier les anomalies dans leurs métriques opérationnelles, telles que la durée et le taux d'erreur, ainsi que leurs [évaluations prêtes à l'emploi (OOTB)][9].

La détection des valeurs aberrantes est effectuée sur des dimensions clés :
- Nom du span
- Type de flux de travail
- [Sujets d'entrée/sortie Patterns][10]

Ces valeurs aberrantes sont analysées au cours de la semaine passée et mises en évidence automatiquement dans la fenêtre temporelle correspondante sélectionnée par l'utilisateur. Cela permet aux équipes de détecter de manière proactive les régressions, les dérives de performance ou les comportements inattendus dans leurs applications LLM.

{{< img src="llm_observability/Overview_LLMO.png" alt="Une bannière 'Insights' en haut de la page de surveillance Agent Observability. La bannière affiche 8 insights et dispose d'un bouton Voir les insights qui mène à un panneau latéral avec plus de détails." style="width:100%;" >}}

## Utilisez les intégrations avec Agent Observability {#use-integrations-with-llm-observability}

Le [SDK Agent Observability pour Python][3] s'intègre avec des frameworks tels qu'OpenAI, LangChain, AWS Bedrock et Anthropic. Il trace et annote automatiquement les appels LLM, capturant la latence, les erreurs et les métriques d'utilisation des tokens, sans modifications de code.

<div class="alert alert-info">Datadog propose une variété de capacités d'intelligence artificielle (IA) et d'apprentissage automatique (ML). Les <a href="/integrations/#cat-aiml">intégrations IA/ML sur la page des intégrations et le marché Datadog</a> sont des fonctionnalités Datadog à l'échelle de la plateforme. <br><br> Par exemple, APM propose une intégration native avec OpenAI pour surveiller votre utilisation d'OpenAI, tandis que la surveillance de l'infrastructure propose une intégration avec NVIDIA DCGM Exporter pour surveiller les charges de travail IA intensives en calcul. Ces intégrations sont différentes de l'offre d'observabilité LLM.</div>

Pour plus d'informations, consultez la [documentation sur l'auto-instrumentation][8].

## Prêt à commencer ? {#ready-to-start}

Consultez la [documentation de configuration][5] pour des instructions sur l'instrumentation de votre application LLM ou suivez le [guide de traçage d'une application LLM][6] pour générer une trace à l'aide du [SDK Agent Observability pour Python][3].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /fr/llm_observability/terms
[3]: /fr/llm_observability/setup/sdk
[4]: /fr/llm_observability/setup/api
[5]: /fr/llm_observability/setup
[6]: /fr/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /fr/llm_observability/setup/auto_instrumentation
[9]: /fr/llm_observability/evaluations/managed_evaluations
[10]: /fr/llm_observability/monitoring/patterns