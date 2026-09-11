---
aliases:
- /fr/llm_observability/instrumentation/agentic/
title: Instrumentation agentique
---
## Directives {#guidelines}

**Important** : Suivez **toutes** les directives listées ici lorsque vous suivez des hyperliens vers d'autres étapes.

1. Ajoutez uniquement le code lié à Datadog Agent Observability et au traceur Datadog. Sauf à des fins d'instrumentation manuelle, ne modifiez pas le code non lié.
2. En cas d'exécution dans un monorepo ou un projet avec plusieurs services ou cibles d'instrumentation, confirmez avec l'utilisateur quel service ou sous-projet doit être instrumenté avec Agent Observability.
3. Installez les derniers SDK Datadog. S'il est déjà installé, vérifiez auprès de l'utilisateur s'il est possible de mettre à jour la dépendance.

## Prérequis {#pre-requisites}

1. Une clé Datadog API est requise pour envoyer des données de Datadog Agent Observability à Datadog. Sans clé d'API, l'utilisateur ne recevra pas de données d'Agent Observability, il s'agit donc d'une **exigence impérative**. Si l'utilisateur n'en a pas déjà fournie et ne souhaite pas le faire, continuez à instrumenter son application, en veillant à préciser explicitement à la fin qu'il doit la définir, et indiquez-lui où elle peut être configurée.
2. Déterminez le langage de programmation et le framework utilisés dans l'application à instrumenter. Ceci est important pour instrumenter correctement l'application.

## Variables d'environnement {#environment-variables}

Toutes les variables d'environnement doivent être définies _soit_ avant le démarrage du processus principal de l'application, soit dès les premières lignes du point d'entrée de l'application.

Ces variables d'environnement ne doivent pas être intégrées en ligne. Elles doivent plutôt être lues directement à partir du processus.

- Pour le développement local, définissez-les dans un fichier `.env` approprié, ou similaire, pour l'application et le langage dans lequel elle est écrite, en vous assurant qu'ils sont renseignés lors de l'initialisation du SDK Agent Observability (voir les guides spécifiques au langage pour chacun)
- Pour le développement non local, informez également l'utilisateur des variables d'environnement qu'il devra définir

### Clé d'API {#api-key}

Ceci est **critique**. Définissez la clé d'API avec la variable d'environnement suivante.

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Activez Agent Observability {#enable-agent-observability}

Ceci est **critique**. Définissez les variables d'environnement suivantes pour activer correctement Agent Observability.

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### Nom de l'application Agent Observability {#agent-observability-application-name}

Ceci est **fortement suggéré**. Si l'utilisateur a fourni un nom d'application (ou `DD_LLMOBS_ML_APP`) dans le cadre de l'invite initiale, utilisez cette valeur. Sinon, utilisez un nom logique basé sur le nom du dossier, du dépôt ou du projet.

```bash
DD_LLMOBS_ML_APP=<provided-or-inferred-application-name>
```

### Site Datadog {#datadog-site}

Ceci est **optionnel**. Définissez le site Datadog, correspondant au centre de données associé à la clé d'API de l'utilisateur. S'il n'est pas fourni (éventuellement via `DD_SITE`), informez l'utilisateur que le site de `datadoghq.com` sera utilisé. _Si_ une valeur est fournie, définissez-la comme variable d'environnement.

```bash
DD_SITE=<provided-dd-site>
```

## Instrumentez l'application {#instrument-the-application}

Suivez les instructions pour le langage détecté :

| Langage | Instructions |
|----------|-------------|
| Python | [Instrumentation agentique d'application Python](/llm_observability/instrument/agentic/python.md) |
| Node.js | [Instrumentation agentique d'application Node.js](/llm_observability/instrument/agentic/nodejs.md) |
| Java | [Instrumentation agentique d'application Java](/llm_observability/instrument/agentic/java.md) |
| OpenTelemetry | [Instrumentation OpenTelemetry](/llm_observability/instrument/otel_instrumentation.md) |

## Instrumentez les prompts et proposez Prompt Management {#instrument-prompts-and-offer-prompt-management}

Le suivi des prompts fait partie de l'instrumentation par défaut d'Agent Observability. Identifiez la limite de construction du prompt pour chaque appel LLM sélectionné et conservez le modèle de prompt séparément de ses variables dynamiques.

1. Si la requête de l'utilisateur spécifie déjà un ID de prompt géré par Datadog, suivez le [guide d'intégration agentique de la gestion des prompts](/llm_observability/instrument/agentic/prompt_management.md). Ne demandez pas s'il faut utiliser Prompt Management.
2. Sinon, identifiez les prompts de l'application et les variables dynamiques utilisées pour les formater. Préservez le fournisseur, le modèle, le contenu du prompt et le comportement de l'application existants.
3. Pour une application Python prise en charge, indiquez à l'utilisateur quels prompts vous avez identifiés et demandez-lui s'il souhaite gérer ces prompts avec Datadog. S'il est d'accord, suivez le [guide d'intégration agentique de la gestion des prompts](/llm_observability/instrument/agentic/prompt_management.md) pour promouvoir les prompts locaux sélectionnés et remplacer leur construction locale par une récupération de prompt géré.
4. Si l'utilisateur refuse la gestion des prompts, ou si le langage de l'application n'est pas pris en charge, instrumentez les prompts sélectionnés avec des métadonnées de prompt structurées en suivant les [instructions de suivi des prompts](/llm_observability/instrument/prompt_tracking). N'ajoutez pas de récupération de prompt au moment de l'exécution.

Lorsque la gestion des prompts remplace un prompt local, utilisez le suivi automatique du prompt géré plutôt que d'ajouter des métadonnées de prompt structurées en double.

## Affichage des traces {#viewing-traces}

Informez l'utilisateur qu'il peut interroger son application et consulter les données dans Datadog.

**Obligatoire** : fournissez un lien permanent où l'utilisateur peut consulter les données associées à cette application. Cela prendra la forme de

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Remplissez les valeurs fournies :
1. `dd_site` - si la valeur a été fournie pour [le site Datadog](#datadog-site), utilisez cette valeur. Sinon, utilisez `datadoghq.com`.
2. `application_name` - utilisez soit la valeur fournie, soit la valeur déduite de la section [Nom de l'application Agent Observability](#llm-observability-application-name).

## Instructions spécifiques au langage {#language-specific-instructions}

{{< whatsnext desc="Instrumentez une application avec un agent de codage :" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Instrumentation agentique d'application Python :{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Instrumentation par l'agent pour l'application Node.js{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Instrumentation agentique d'application Java :{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Intégration agentique de gestion des prompts :{{< /nextlink >}}
{{< /whatsnext >}}