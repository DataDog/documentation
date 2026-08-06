---
description: Utilisez le suivi des prompts pour suivre vos modèles de prompts et leurs
  versions.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos prompts LLM avec Datadog LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Examinez avec LLM Observability.
title: Suivi des prompts
---
## Vue d'ensemble {#overview}

Le suivi des prompts lie les modèles de prompts et leurs versions aux appels LLM. Le suivi des prompts fonctionne parallèlement aux traces, spans et Playground d'Agent Observability, ainsi qu'à [Prompt Management][8], qui fournit un registre centralisé pour la création et le versionnage des prompts.

Le suivi des prompts vous permet de :
- Voir tous les prompts utilisés par votre application ou agent LLM, avec le volume d'appels et la latence au fil du temps
- Comparez les prompts ou les versions par appels, latence, jetons utilisés et coût
- Consultez des informations détaillées sur un prompt : examinez son historique de version, affichez une comparaison de texte et accédez aux traces utilisant une version spécifique
- Filtrez [Trace Explorer][1] par nom, ID ou version de prompt pour isoler les requêtes impactées
- Reproduisez une exécution en remplissant [Agent Observability Playground][2] avec le modèle et les variables exacts de n'importe quel span

{{< img src="llm_observability/monitoring/llm-prompt-tracking-hero.png" alt="Vue des prompts pour une application dans Agent Observability." style="width:100%;" >}}

## Configurer le suivi des prompts {#set-up-prompt-tracking}

Lorsque Agent Observability est activé, les prompts récupérés depuis le registre [Prompt Management][8] avec `LLMObs.get_prompt()` sont suivis automatiquement si la valeur renvoyée par `prompt.format()` est transmise directement à un appel LLM pris en charge et instrumenté automatiquement. Si la valeur formatée est copiée ou transformée, utilisez `LLMObs.annotation_context()` comme décrit dans la documentation de Prompt Management. Les options de configuration suivantes s'appliquent aux prompts définis en dehors du registre.

### Avec des métadonnées de prompt structurées {#with-structured-prompt-metadata}
Pour utiliser le suivi des prompts, vous pouvez soumettre des métadonnées de prompt structurées (ID, version facultative, modèle, variables).

#### Agent Observability Python SDK {#agent-observability-python-sdk}
Si vous utilisez l'Agent Observability Python SDK (`dd-trace` v3.16.0+), joignez les métadonnées du prompt au span LLM en utilisant l'argument ou l'assistant `prompt`. Consultez la [documentation de l'Agent Observability Python SDK][3].

#### Agent Observability Node.js SDK {#agent-observability-nodejs-sdk}
Si vous utilisez l'Agent Observability Node.js SDK (`dd-trace` v5.83.0+), joignez les métadonnées du prompt au span LLM en utilisant l'option `prompt`. Consultez la [documentation de l'Agent Observability Node.js SDK][6].

#### Agent Observability API {#agent-observability-api}
Si vous utilisez l'Agent Observability API intake, soumettez les métadonnées du prompt au point de terminaison de l'API Spans. Consultez la [documentation de référence de l'Agent Observability HTTP API][4].

#### Instrumentation OpenTelemetry {#opentelemetry-instrumentation}
Si vous utilisez l'[instrumentation OpenTelemetry][7], vous pouvez joindre des métadonnées de prompt à vos spans LLM en définissant l'attribut `_dd.ml_obs.prompt_tracking` avec une chaîne JSON contenant les informations de votre prompt.

Définissez l'attribut sur n'importe quel span LLM :

{{< tabs >}}
{{% tab "Python" %}}

```python
import json

span.set_attribute("_dd.ml_obs.prompt_tracking", json.dumps({
    "name": "greeting-prompt",
    "version": "v1",
    "template": "Hello {{name}}, tell me about {{topic}}",
    "variables": {"name": "Alice", "topic": "weather"}
}))
```
{{% /tab %}}
{{% tab "JavaScript" %}}

```javascript
span.setAttribute("_dd.ml_obs.prompt_tracking", JSON.stringify({
    name: "greeting-prompt",
    version: "v1",
    template: "Hello {{name}}, tell me about {{topic}}",
    variables: { name: "Alice", topic: "weather" }
}));
```
{{% /tab %}}
{{% tab "Go" %}}

```go
span.SetAttributes(attribute.String("_dd.ml_obs.prompt_tracking",
    `{"name":"greeting-prompt","version":"v1","template":"Hello {{name}}, tell me about {{topic}}","variables":{"name":"Alice","topic":"weather"}}`,
))
```
{{% /tab %}}
{{< /tabs >}}

Les champs suivants sont pris en charge dans le JSON de suivi des prompts :

| Champ | Type | Requis | Description |
|-------|------|----------|-------------|
| `template` | chaîne | Oui (ou `chat_template`) | Chaîne de modèle pour les prompts à message unique |
| `chat_template` | tableau | Oui (ou `template`) | Liste de modèles de messages `{"role": "...", "content": "..."}` |
| `id` | chaîne | Non | Identifiant unique pour le prompt. Par défaut à `{ml_app}_unnamed-prompt` si omis |
| `name` | chaîne | Non | Nom du prompt. Utilisé comme solution de secours pour `id` si `id` est omis |
| `version` | chaîne | Non | Balise de version fournie par l'utilisateur |
| `variables` | objet | Non | Substitutions de variables de modèle |
| `rag_context_variables` | tableau de chaînes | Non | Noms des variables dans `variables` qui contiennent le contexte RAG (vérité terrain). Utilisé par les évaluateurs RAG |
| `rag_query_variables` | tableau de chaînes | Non | Noms des variables dans `variables` qui contiennent la requête de l'utilisateur. Utilisé par les évaluateurs RAG |

<div class="alert alert-info">Si vous utilisez des modèles de prompt, Agent Observability peut automatiquement joindre des informations de version basées sur le contenu du prompt.</div>

### Avec les modèles LangChain {#with-langchain-templates}
Si vous utilisez des modèles de prompt LangChain, Datadog capture automatiquement les métadonnées des prompts sans modification de code. Les identifiants sont dérivés des noms de modules ou de modèles. Pour remplacer ces identifiants, consultez [Agent Observability Auto-instrumentation: LangChain][5].

## Utilisez le suivi des prompts dans Agent Observability {#use-prompt-tracking-in-agent-observability}

Affichez votre application dans Agent Observability et sélectionnez {{< ui >}}Prompts{{< /ui >}} sur la gauche. La vue _Prompts_ présente les informations suivantes :

- {{< ui >}}Prompt Call Count{{< /ui >}} : Un graphique chronologique affichant les appels par prompt (ou par version) au fil du temps
- {{< ui >}}Recent Prompt Updates{{< /ui >}} : Informations sur les mises à jour récentes des prompts, incluant l'heure de la dernière mise à jour, le nombre d'appels, la latence moyenne et le nombre moyen de jetons par appel
- {{< ui >}}Most Tokens Used{{< /ui >}} : Prompts classés par nombre total de jetons (en entrée ou en sortie)
- {{< ui >}}Highest Latency Prompts{{< /ui >}} : Prompts classés par durée moyenne

{{< img src="llm_observability/monitoring/prompt_details.png" alt="Vue détaillée pour un seul prompt." style="width:100%;" >}}

Cliquez sur un prompt pour ouvrir un panneau latéral détaillé présentant des informations sur l'activité de la version et diverses métriques. Vous pouvez également afficher une vue diff de deux versions, ouvrir le Trace Explorer pré-filtré sur les spans qui utilisent une version sélectionnée, ou démarrer une session Playground pré-remplie avec le modèle et les variables de la version sélectionnée.

{{< img src="llm_observability/monitoring/prompt_tracking_trace_explorer3.png" alt="Vue des prompts pour une application dans Agent Observability." style="width:100%;" >}}

Vous pouvez utiliser l'Agent Observability Trace Explorer pour localiser les requêtes par utilisation de prompt. Vous pouvez utiliser le nom, l'ID et la version d'un prompt comme facettes pour la recherche au niveau des traces et des spans. Cliquez sur n'importe quel span LLM pour voir le prompt qui l'a généré.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/playground
[3]: /fr/llm_observability/instrumentation/sdk/?tab=python#prompt-tracking
[4]: /fr/llm_observability/instrumentation/api/?tab=model#prompt
[5]: /fr/llm_observability/instrumentation/auto_instrumentation?tab=python#langchain
[6]: /fr/llm_observability/instrumentation/sdk/?tab=nodejs#prompt-tracking
[7]: /fr/llm_observability/instrumentation/otel_instrumentation
[8]: /fr/llm_observability/monitoring/prompt_management