---
aliases:
- /fr/llm_observability/instrumentation/agentic/
title: Instrumentation agentique
---
## Directives {#guidelines}

**Important** : Suivez **toutes** les directives listées ici lorsque vous suivez des hyperliens vers d'autres étapes.

1. Ajoutez uniquement le code lié à Datadog Agent Observability et au traceur Datadog. Sauf à des fins d'instrumentation manuelle, ne modifiez pas le code non lié.
2. En cas d'exécution dans un monorepo ou un projet avec plusieurs services ou cibles d'instrumentation, confirmez avec l'utilisateur quel service ou sous-projet doit être instrumenté avec Agent Observability.
3. Vérifiez si le SDK Datadog installé prend en charge l'instrumentation requise pour l'application. Si c'est le cas, utilisez cette version. Si l'instrumentation nécessite une mise à jour du SDK, expliquez pourquoi et demandez avant de mettre à jour la dépendance. Différez les mises à jour requises uniquement pour la gestion de prompts optionnelle jusqu'à ce que l'utilisateur choisisse cette intégration.
4. Préservez le fournisseur, le modèle, le contenu du prompt, le comportement, le gestionnaire de paquets et le workflow de gestion des secrets existants de l'application.

D'abord, complétez l'instrumentation, y compris le suivi de prompt et tout partage de contexte demandé. Ensuite, proposez la gestion de prompts hébergée optionnelle. La gestion de prompts n'est pas requise pour l'instrumentation, le partage de contexte ou les recommandations de check.

## Prérequis {#pre-requisites}

1. Une clé d'API Datadog est requise pour envoyer des données d'Agent Observability à Datadog. Sans clé d'API, l'utilisateur ne recevra pas de données d'Agent Observability, il s'agit donc d'une **exigence impérative**. Si l'utilisateur n'en a pas déjà fournie et ne souhaite pas le faire, continuez à instrumenter son application, en veillant à préciser explicitement à la fin qu'il doit la définir, et indiquez-lui où elle peut être configurée.
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
| Python | [Instrumentation d'agent d'application Python][1] |
| Node.js | [Instrumentation d'agent d'application Node.js][2] |
| Java | [Instrumentation d'agent d'application Java][3] |
| OpenTelemetry | [Instrumentation OpenTelemetry][4] |

## Instrumentez les prompts {#instrument-prompts}

Le suivi des prompts fait partie de l'instrumentation par défaut d'Agent Observability. Pour chaque appel LLM sélectionné, identifiez où l'application construit le prompt. Gardez le modèle de prompt séparé des valeurs de variable utilisées pour le remplir.

Pour les prompts locaux, suivez les [instructions de suivi de prompt][5] pour enregistrer le modèle de prompt et les valeurs de variable avec le span LLM. Conservez le code existant qui construit le prompt. Ne le remplacez pas par du code qui récupère les prompts depuis Datadog Prompt Management.

Si l'application récupère déjà des prompts depuis Datadog Prompt Management, conservez cette intégration. Le suivi automatique s'applique lorsque le prompt formaté est transmis sans modification à un fournisseur pris en charge et instrumenté automatiquement. Si l'application copie ou modifie le prompt formaté avant de l'envoyer au fournisseur, ajoutez des annotations explicites comme décrit dans [Suivre l'utilisation des prompts][6]. N'ajoutez pas d'annotations manuelles lorsque le suivi automatique capture déjà les métadonnées du prompt.

{{< agent-only >}}
## Partagez le contexte de l'agent pour les recommandations de check {#share-agent-context-for-check-recommendations}

Effectuez cette étape uniquement lorsque l'invite d'intégration initiale de Datadog inclut une URL de téléchargement du contexte de l'agent, un jeton de téléchargement et une version de schéma.

Après l'instrumentation :

1. Inspectez uniquement les fichiers du dépôt nécessaires pour comprendre l'objectif, les outils, les règles comportementales explicites et les conditions de transfert de l'agent.
2. Incluez uniquement les attentes directement prises en charge par une invite, une instruction, une politique ou un test cité. Enregistrez un comportement atomique par attente, exprimez-le en termes observables dans l'entrée ou la sortie de l'agent, le contexte de trace, les appels d'outils, les résultats d'outils ou leur ordre, et omettez les règles ambiguës ou contradictoires plutôt que de deviner.
3. Construisez un résumé JSON délimité en utilisant la version de schéma de l'invite d'intégration et cette forme exacte :

   ```json
   {
     "schema_version": "<schema-version-from-the-onboarding-prompt>",
     "context": {
       "agent_summary": "A short description of the agent",
       "capabilities": [
         {
           "name": "...",
           "description": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "tools": [
         {
           "name": "...",
           "purpose": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "behavioral_expectations": [
         {
           "id": "expectation-1",
           "behavior": "...",
           "applicability": "...",
           "failure": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "handoff_conditions": [
         {
           "id": "handoff-1",
           "condition": "...",
           "destination": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "source_references": [
         {
           "id": "source-1",
           "source_kind": "prompt",
           "path": "relative/path",
           "line_start": 1,
           "line_end": 10,
           "description": "Why this source supports the summary"
         }
       ]
     }
   }
   ```

   Maintenez l'objet `context` encodé à 64 Kio ou moins et utilisez ces limites de collecte :

   - Jusqu'à 20 capacités et 30 outils.
   - Entre 1 et 30 attentes comportementales.
   - Jusqu'à 20 conditions de transfert.
   - Entre 1 et 60 références sources.

   Utilisez entre 1 et 10 identifiants de référence source uniques pour chaque capacité, outil, attente comportementale et condition de transfert. Chaque attente comportementale et condition de transfert doit citer au moins une source `prompt`, `instruction`, `policy` ou `test` et inclure entre 1 et 6 signaux observables uniques.

   Maintenez `agent_summary` entre 1 et 1 000 caractères. Maintenez les noms et les destinations de transfert entre 1 et 120 caractères. Maintenez les descriptions, objectifs, comportements, déclarations d'applicabilité, échecs, conditions de transfert et chemins sources entre 1 et 500 caractères. Maintenez les descriptions des références sources entre 1 et 300 caractères.

   Donnez à chaque référence source, attente comportementale et condition de transfert un identifiant compris entre 1 et 64 caractères qui ne contient que des lettres, des chiffres, des traits d'union ou des traits de soulignement. Les identifiants de référence source doivent être uniques au sein de `source_references`. Les identifiants d'attente comportementale et de condition de transfert doivent être uniques dans les deux collections. Les identifiants sont locaux à ce téléversement et permettent à chaque check recommandé de citer sa preuve.

   Utilisez `source_kind` uniquement à partir de `prompt`, `instruction`, `policy`, `test`, `tool_definition` ou `implementation`. Utilisez `observable_signals` uniquement à partir de `agent_input`, `agent_output`, `trace_context`, `tool_call`, `tool_result` ou `tool_order`. Si vous incluez `line_end`, incluez également un `line_start` positif, et rendez `line_end` supérieur ou égal à `line_start`.

4. Envoyez le JSON une fois à l'URL de téléversement depuis l'invite d'intégration. Utilisez `POST`, définissez `Content-Type: application/json` et transmettez le jeton de téléversement uniquement dans l'en-tête `Authorization: Bearer <upload-token>`.

Respectez ces exigences de sécurité :

- Traitez le jeton de téléversement comme un secret à usage unique. Ne l'écrivez pas dans les fichiers sources, la configuration, l'historique du shell, la sortie ou les logs.
- Téléversez uniquement le résumé structuré. Ne téléversez pas de code source brut, de prompts complets, de secrets, d'identifiants, de variables d'environnement, de données client, de contenu de trace ou de métadonnées arbitraires.
- Utilisez des chemins sources POSIX normalisés relatifs au dépôt et les plus petites plages de lignes utiles. N'utilisez pas de chemins absolus, de barres obliques inverses, de deux-points, de séparateurs non normalisés ou de segments de chemin `.` ou `..`. Les références sources identifient la preuve ; elles ne doivent pas en copier le contenu.
- Si le téléversement échoue, poursuivez l'instrumentation et indiquez à l'utilisateur que Datadog n'a pas reçu le contexte optionnel. Ne réessayez pas avec des données plus larges.

{{< /agent-only >}}
## Affichage des traces {#viewing-traces}

Signalez les modifications d'instrumentation, toutes les exigences de configuration restantes et si le téléchargement du contexte a réussi lorsque cette étape a été demandée. Indiquez à l'utilisateur comment exécuter son application et afficher ses données dans Datadog. Ne prétendez pas que des traces ou des recommandations sont disponibles sans vérification.

**Obligatoire** : fournissez un lien permanent où l'utilisateur peut consulter les données associées à cette application. Cela prendra la forme de

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Remplissez les valeurs fournies :
1. `dd_site` : Si la valeur a été fournie pour [le site Datadog](#datadog-site), utilisez cette valeur. Sinon, utilisez `datadoghq.com`.
2. `application_name` : Utilisez la valeur fournie ou déduite de la section [Nom de l'application Agent Observability](#agent-observability-application-name).

## Gestion de prompts optionnelle {#optional-prompt-management}

Une fois l'instrumentation et tout partage de contexte demandé terminés, signalez les résultats. Ensuite, traitez la gestion des prompts hébergée facultative pour les applications Python :

- Si l'utilisateur a déjà fourni un ID de prompt géré par Datadog, suivez le [guide d'intégration agentique de la gestion des prompts][7]. Ne demandez pas à nouveau s'il faut activer la gestion des prompts.
- Sinon, identifiez les prompts locaux de l'application et demandez si l'utilisateur souhaite les gérer dans Datadog. S'il est d'accord, suivez le guide pour créer des versions gérées des prompts sélectionnés et mettez à jour l'application pour les récupérer.
- Si l'utilisateur refuse ou ne répond pas, conservez les prompts locaux instrumentés inchangés.

Suivez la section [Suivre l'utilisation des prompts][6] du guide pour déterminer si un suivi automatique ou des annotations explicites sont requis. Évitez les métadonnées de prompt en double.

Si la gestion des prompts nécessite une mise à jour du SDK, expliquez pourquoi et demandez avant de mettre à jour la dépendance. Cette mise à jour facultative ne doit pas retarder l'instrumentation principale ou le partage de contexte.

## Instructions spécifiques au langage {#language-specific-instructions}

{{< whatsnext desc="Instrumentez une application avec un agent de codage :" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Instrumentation agentique d'application Python :{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Instrumentation par l'agent pour l'application Node.js{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Instrumentation agentique d'application Java :{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Intégration agentique de gestion des prompts :{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/llm_observability/instrument/agentic/python.md
[2]: /fr/llm_observability/instrument/agentic/nodejs.md
[3]: /fr/llm_observability/instrument/agentic/java.md
[4]: /fr/llm_observability/instrument/otel_instrumentation.md
[5]: /fr/llm_observability/instrument/prompt_tracking.md
[6]: /fr/llm_observability/instrument/agentic/prompt_management.md#track-prompt-usage
[7]: /fr/llm_observability/instrument/agentic/prompt_management.md