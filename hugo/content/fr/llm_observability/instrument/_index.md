---
aliases:
- /fr/llm_observability/instrumentation/
description: Vue d'ensemble des options d'instrumentation pour Agent Observability,
  incluant les approches basées sur le SDK et sur l'API pour Python, Node.js et Java.
further_reading:
- link: /llm_observability/auto_instrumentation
  tag: Instrumentation automatique
  text: Démarrez rapidement avec l'instrumentation automatique
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability prend nativement en charge les conventions sémantiques
    GenAI d'OpenTelemetry.
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: Centre d'apprentissage
  text: Prise en main de Agent Observability
title: Instrumentation d'Agent Observability
---
Pour commencer avec Agent Observability, instrumentez votre application LLM ou vos agents en choisissant parmi plusieurs approches, en fonction de votre langage de programmation et de votre configuration. Datadog propose des options d'instrumentation complètes conçues pour capturer des traces, des métriques et des évaluations détaillées à partir de vos applications LLM et de vos agents avec un minimum de modifications de code.

## Options d'instrumentation {#instrumentation-options}
Vous pouvez instrumenter votre application avec les SDK Python, Node.js ou Java, ou en utilisant l'Agent Observability API.

### Instrumentation basée sur le SDK (recommandé) {#sdk-based-instrumentation-recommended}
Datadog fournit des SDK natifs qui offrent les fonctionnalités les plus complètes d'Agent Observability:
| Langage | SDK disponible | Instrumentation automatique | Instrumentation personnalisée |
| -------- | ------------- | -------------------- | ---------------------- |
| Python | Python 3.7+ | {{< X >}} | {{< X >}} |
| Node.js | Node.js 16+ | {{< X >}} | {{< X >}} |
| Java | Java 8+ | {{< X >}} | {{< X >}} |


Pour instrumenter une application LLM avec le SDK :
1. Installez le SDK Agent Observability
2. Configurez le SDK en fournissant [les variables d'environnement requises][6] dans la commande de démarrage de votre application, ou par programmation [dans le code][7]. Assurez-vous d'avoir configuré votre clé d'API Datadog, votre site Datadog et le nom de votre application d'apprentissage automatique (ML).

#### Instrumentation automatique {#auto-instrumentation}
L'instrumentation automatique capture les appels LLM pour les applications Python, Node.js et Java sans nécessiter de modifications de code. Elle vous permet d'obtenir des traces et une observabilité prêtes à l'emploi pour les frameworks et fournisseurs populaires. Pour plus de détails et une liste complète des frameworks et fournisseurs pris en charge, consultez la [Documentation sur l'instrumentation automatique][1].

L'instrumentation automatique capture automatiquement :
- Prompts d'entrée et complétions de sortie
- Utilisation des jetons et coûts
- Informations sur la latence et les erreurs
- Paramètres du modèle (température, max_tokens, etc.)
- Métadonnées spécifiques au framework

<div class="alert alert-info">Lors de l'utilisation de frameworks pris en charge, aucune création manuelle de span n'est requise pour les appels LLM. Le SDK crée automatiquement des spans appropriés avec des métadonnées enrichies.</div>

#### Instrumentation personnalisée {#custom-instrumentation}
Tous les SDK pris en charge offrent des fonctionnalités avancées pour l'instrumentation personnalisée de vos applications LLM en plus de l'instrumentation automatique, notamment :
- Création manuelle de spans à l'aide de décorateurs de fonction ou de gestionnaires de contexte
- Traçage de workflows complexes pour les applications LLM en plusieurs étapes
- Surveillance d'Agents pour les agents LLM autonomes
- Évaluations personnalisées et mesures de qualité
- Suivi de session pour les interactions utilisateur

Pour en savoir plus, consultez la [Documentation de référence du SDK][2].

### Instrumentation de l'API HTTP {#http-api-instrumentation}
Si votre langage n'est pas pris en charge par les SDK ou si vous utilisez des intégrations personnalisées, vous pouvez instrumenter votre application à l'aide de l'API HTTP de Datadog.

L'API vous permet de :
- Soumettre des spans directement via des endpoints HTTP
- Envoyer des évaluations personnalisées associées aux spans
- Inclure des hiérarchies de traces complètes pour les applications complexes
- Annoter les spans avec des entrées, des sorties, des métadonnées et des métriques

Points de terminaison de l'API :
- [Spans API][4] : `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`
- [Evaluations API][5] : `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

Pour en savoir plus, consultez la [Documentation de l'API HTTP][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/llm_observability/auto_instrumentation
[2]: /fr/llm_observability/instrument/sdk
[3]: /fr/llm_observability/setup/api
[4]: /fr/llm_observability/instrument/api/?tab=model#spans-api
[5]: /fr/llm_observability/instrument/api/?tab=model#evaluations-api
[6]: /fr/llm_observability/instrument/sdk#command-line-setup
[7]: /fr/llm_observability/instrument/sdk#in-code-setup