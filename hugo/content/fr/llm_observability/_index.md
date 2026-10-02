---
aliases:
- /fr/tracing/llm_observability/
description: Présentation d'Agent Observability, une plateforme pour surveiller, dépanner
  et améliorer les applications LLM et les agents IA.
further_reading:
- link: https://www.datadoghq.com/pricing/?product=llm-observability#products
  tag: Tarification
  text: Tarification d'Agent Observability
- link: /llm_observability/data_governance/
  tag: Documentation
  text: Découvrez combien de temps Agent Observability conserve vos données
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centre d'apprentissage
  text: Traçage des applications LLM
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Enquêter avec le LLM Observability
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Évaluez, optimisez et sécurisez votre pile d'IA Google Cloud avec Datadog.
- link: https://www.datadoghq.com/blog/offline-llm-evaluations/
  tag: Blog
  text: 'Évaluation hors ligne pour les agents IA : bonnes pratiques'
- link: https://www.datadoghq.com/blog/engineering/bits-ai-eval-platform/
  tag: Blog
  text: Comment nous avons construit une plateforme d'évaluation réelle pour les agents
    SRE autonomes à grande échelle
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-dashboards
  tag: Blog
  text: Création d'agents de dashboard fiables avec Datadog LLM Observability
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Stimuler le retour sur investissement de l''IA : comment Datadog connecte
    les coûts, les performances et l''infrastructure pour vous permettre d''évoluer
    de manière responsable'
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability prend nativement en charge les conventions sémantiques
    GenAI d'OpenTelemetry.
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenez une visibilité sur les workflows des Agents Strands avec Datadog LLM
    Observability.
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: Blog
  text: Surveillez vos applications Anthropic avec Datadog LLM Observability
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: Blog
  text: Bonnes pratiques pour surveiller les attaques par injection de prompt LLM
    afin de protéger les données sensibles
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: Blog
  text: Optimisez les performances des applications LLM avec l'intégration vLLM de
    Datadog
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimisez et dépannez votre infrastructure IA avec Datadog GPU Monitoring
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: Blog
  text: Surveillez les agents construits sur Amazon Bedrock avec Datadog LLM Observability.
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifier les risques de sécurité courants dans les serveurs MCP
- link: https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/
  tag: Blog
  text: 'Abus de l''infrastructure IA : comment la mauvaise gestion des identifiants
    et des ressources expose les applications LLM'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: Blog
  text: Comment nous avons réduit le temps de débogage de notre agent NLQ de plusieurs
    heures à quelques minutes grâce à LLM Observability
title: Agent Observability
---
{{< learning-center-callout header="Essayez de prendre en main Agent Observability dans le Learning Center" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/llm-obs-getting-started">}}
  Apprenez à surveiller les performances, les coûts, les traces, l'utilisation des jetons et les erreurs de votre application LLM pour identifier et résoudre les problèmes.
{{< /learning-center-callout >}}

## Présentation {#overview}

Avec Agent Observability, vous pouvez surveiller, dépanner et évaluer vos applications basées sur LLM, telles que les chatbots. Vous pouvez rechercher la cause profonde des problèmes, surveiller les performances opérationnelles et évaluer la qualité, la confidentialité et la sécurité de vos applications LLM.

Chaque requête traitée par votre application est représentée sous forme de trace sur la page [**Agent Observability**][1] dans Datadog.

{{< img src="llm_observability/traces.png" alt="Une liste de traces de paires prompt-réponse sur la page Agent Observability" style="width:100%;" >}}

Une trace peut représenter :

- Une inférence LLM individuelle, incluant les jetons, les informations d'erreur et la latence
- Un workflow LLM prédéfini, qui est un regroupement d'appels LLM et de leurs opérations contextuelles, telles que des appels d'outils ou des étapes de prétraitement
- Un workflow LLM dynamique exécuté par un agent LLM

Chaque trace contient des spans représentant chaque choix effectué par un agent ou chaque étape d'un workflow donné. Une trace donnée peut également inclure les entrées et sorties, la latence, les problèmes de confidentialité, les erreurs, et plus encore. Pour plus d'informations, consultez [Termes et concepts][2].

## Dépannage avec le traçage de bout en bout {#troubleshoot-with-end-to-end-tracing}

Visualisez chaque étape de vos chaînes et appels d'application LLM pour localiser les requêtes problématiques et identifier la cause profonde des erreurs.

{{< img src="llm_observability/errors.png" alt="Erreurs survenues dans une trace sur l'onglet Erreurs dans un panneau latéral de trace" style="width:100%;" >}}

## Surveillez les métriques opérationnelles et optimisez les coûts {#monitor-operational-metrics-and-optimize-cost}

Surveillez le coût, la latence, les performances et les tendances d'utilisation de toutes vos applications LLM avec des [dashboards prêts à l'emploi][7].

{{< img src="llm_observability/dashboard_1.png" alt="Le dashboard Operational Insights d'Agent Observability prêt à l'emploi dans Datadog" style="width:100%;" >}}

## Évaluez la qualité et l'efficacité de vos applications LLM {#evaluate-the-quality-and-effectiveness-of-your-llm-applications}

Comprenez ce que les utilisateurs demandent à votre application LLM, identifiez les lacunes de couverture et surveillez la qualité des réponses au fil du temps avec [Patterns][10] — un clustering hiérarchique automatisé des sujets de votre trafic de production.

{{< img src="llm_observability/patterns_topic_details.png" alt="La vue détaillée du sujet affiche un résumé du sujet, le nombre total d'interactions et un tableau des interactions avec l'étiquette du sujet enfant, le texte saisi et l'horodatage." style="width:100%;" >}}

## Protégez les données sensibles et identifiez les utilisateurs malveillants {#safeguard-sensitive-data-and-identify-malicious-users}

Analysez et masquez automatiquement toute donnée sensible dans vos applications d'IA et identifiez les injections de prompt, parmi d'autres évaluations.

{{< img src="llm_observability/prompt_injection.png" alt="Un exemple de tentative d'injection de prompt détectée par Agent Observability" style="width:100%;" >}}

## Visualisez les anomalies mises en évidence sous forme d'insights {#see-anomalies-highlighted-as-insights}

Agent Observability Insights offre une expérience de surveillance qui aide les utilisateurs à identifier les anomalies dans leurs métriques opérationnelles — telles que la durée et le taux d'erreur — et leurs [évaluations prêtes à l'emploi (OOTB)][9].

La détection des singularités est effectuée sur des dimensions clés :
- Nom du span
- Type de workflow
- [Patterns input/output topics][10]

Ces valeurs aberrantes sont analysées sur la semaine écoulée et automatiquement mises en évidence dans la fenêtre temporelle correspondante sélectionnée par l'utilisateur. Cela permet aux équipes de détecter de manière proactive les régressions, les dérives de performance ou les comportements inattendus dans leurs applications LLM.

{{< img src="llm_observability/Overview_LLMO.png" alt="Une bannière « Insights » en haut de la page Agent Observability Monitor. La bannière affiche 8 insights et dispose d'un bouton Voir les insights qui mène à un panneau latéral contenant plus de détails." style="width:100%;" >}}

## Utilisez les intégrations avec Agent Observability {#use-integrations-with-agent-observability}

Le [SDK Agent Observability pour Python][3] s'intègre à des frameworks tels qu'OpenAI, LangChain, AWS Bedrock et Anthropic. Il trace et annote automatiquement les appels LLM, capturant la latence, les erreurs et les métriques d'utilisation des jetons, sans modification de code.

<div class="alert alert-info">Datadog propose diverses fonctionnalités d'intelligence artificielle (IA) et d'apprentissage automatique (ML). Les <a href="/integrations/#cat-aiml">intégrations IA/ML sur la page Integrations et sur la Datadog Marketplace</a> sont des fonctionnalités Datadog à l'échelle de la plateforme. <br><br> Par exemple, APM propose une intégration native avec OpenAI pour surveiller votre utilisation d'OpenAI, tandis qu'Infrastructure Monitoring propose une intégration avec NVIDIA DCGM Exporter pour surveiller les charges de travail IA intensives en calcul. Ces intégrations sont différentes de l'offre Agent Observability.</div>

Pour plus d'informations, consultez la [documentation sur l'instrumentation automatique][8].

## Tarification {#pricing}

Agent Observability est mesuré et facturé en fonction du nombre de spans LLM ingérés : Un span LLM représente une requête unique adressée à un fournisseur LLM ; un workflow d'agent peut donc produire plusieurs spans LLM. Pour connaître les tarifs, consultez la [page de tarification d'Agent Observability][11].

## Prêt à commencer ? {#ready-to-start}

Consultez la [documentation de configuration][5] pour obtenir des instructions sur l'instrumentation de votre application LLM ou suivez le [guide de traçage d'une application LLM][6] pour générer une trace à l'aide du [SDK Agent Observability pour Python][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /fr/llm_observability/quickstart/terms
[3]: /fr/llm_observability/setup/sdk
[4]: /fr/llm_observability/setup/api
[5]: /fr/llm_observability/setup
[6]: /fr/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /fr/llm_observability/setup/auto_instrumentation
[9]: /fr/llm_observability/investigate/evaluations/managed_evaluations
[10]: /fr/llm_observability/investigate/patterns
[11]: https://www.datadoghq.com/pricing/?product=llm-observability#products