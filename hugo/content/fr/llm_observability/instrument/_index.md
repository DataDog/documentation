---
aliases:
- /fr/llm_observability/instrumentation/
- /fr/llm_observability/instrument/agentic/
- /fr/llm_observability/instrumentation/agentic/
description: Instrumentez une application LLM avec les SDK Datadog, OpenTelemetry
  ou l'API HTTP, et suivez les prompts et les traces dans Agent Observability.
further_reading:
- link: /llm_observability/instrument/auto_instrumentation/
  tag: Documentation
  text: Instrumentation automatique d'Agent Observability
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability prend nativement en charge les conventions sémantiques
    GenAI d'OpenTelemetry.
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: Centre d'apprentissage
  text: Prise en main de Agent Observability
title: Instrumentation d'Agent Observability
---
## Présentation {#overview}

Instrumentez votre application ou agent LLM pour collecter les traces, les prompts, l'utilisation des jetons, la latence et les erreurs dans Agent Observability. Utilisez l'instrumentation automatique pour les fournisseurs et frameworks pris en charge, et ajoutez des spans personnalisés pour les autres opérations. Vous pouvez suivre ces étapes vous-même ou confier cette page à un agent de codage.

{{< skill-callout
    title="Configurez Agent Observability avec un agent de programmation"
    text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided setup of Python and Node.js applications."
    action_name="copy_dd_orchestrator_agent_observability_setup_prompt"
    lang="text" >}}
À l'aide du skill disponible sur https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md, instrumentez mon projet avec Datadog Agent Observability.
{{< /skill-callout >}}

{{< agent-only >}}
Suivez ces directives tout au long de cette page et de ses guides de configuration liés :

1. Ajoutez uniquement le code lié à Agent Observability et au traceur Datadog. Ne modifiez pas le code de l'application non lié, sauf là où l'instrumentation manuelle l'exige.
2. Pour un monorepo ou un projet avec plusieurs services, confirmez quel service ou sous-projet instrumenter avant de modifier.
3. Inspectez le SDK Datadog installé. Réutilisez-le s'il prend en charge l'instrumentation requise. Si une mise à jour est nécessaire, expliquez pourquoi et demandez avant de modifier la dépendance. Différez les mises à jour requises uniquement pour la gestion de prompts optionnelle jusqu'à ce que l'utilisateur choisisse cette intégration.
4. Préservez le fournisseur, le modèle, le contenu du prompt, le comportement, le gestionnaire de paquets et le workflow de gestion des secrets existants de l'application.
5. Terminez l'instrumentation, y compris Prompt Tracking et tout partage de contexte demandé, avant de proposer Prompt Management hébergé en option. La gestion de prompts n'est pas requise pour l'instrumentation, le partage de contexte ou les recommandations de check.
{{< /agent-only >}}

## Prérequis {#prerequisites}

- Obtenez une [Datadog API key][8] pour envoyer des données directement à Datadog.
- Sélectionnez le [site Datadog][9] associé à votre compte.

{{< agent-only >}}
Inspectez l'application pour identifier son langage, son framework, son fournisseur LLM et sa commande de démarrage avant de choisir un guide de configuration. Pour une configuration sans agent, utilisez la clé d'API fournie par l'utilisateur via le workflow de gestion des secrets existant. Si l'utilisateur n'a pas fourni de clé et ne souhaite pas en fournir une, poursuivez les modifications de code. Dans la réponse finale, expliquez que la soumission des données nécessite la clé et indiquez où la configurer. Ne prétendez pas que la soumission des données a réussi sans elle.
{{< /agent-only >}}

## Configurez les variables d'environnement {#configure-environment-variables}

Définissez les variables d'environnement avant le démarrage de l'application ou chargez-les avant l'initialisation du SDK.

{{< agent-only >}}
Utilisez le workflow de configuration ou de gestion des secrets existant de l'application. Pour le développement local, il peut s'agir d'un fichier `.env` existant. Ne conservez pas les identifiants dans le code source.
{{< /agent-only >}}

L'exemple suivant envoie des données directement à Datadog sans Datadog Agent. Remplacez les espaces réservés et chargez ces valeurs dans le processus de l'application :

```text
DD_API_KEY=<DATADOG_API_KEY>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
DD_SITE=<DATADOG_SITE>
```

Si l'application envoie des données via Datadog Agent, utilisez plutôt les variables d'environnement suivantes. Définissez `DD_TRACE_AGENT_URL` sur l'URL de votre Datadog Agent :

```text
DD_TRACE_AGENT_URL=<DATADOG_AGENT_URL>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=false
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
```

### Nom de l'application Agent Observability {#agent-observability-application-name}

Définissez `DD_LLMOBS_ML_APP` sur le nom utilisé pour regrouper les traces et les spans de l'application. Conservez un nom d'application existant ou choisissez un nom basé sur le service, le dépôt ou le projet. Consultez les [directives de nommage des applications][10].

{{< agent-only >}}
Si l'utilisateur a fourni un nom d'application ou `DD_LLMOBS_ML_APP`, utilisez-le. Sinon, conservez le nom existant ou déduisez un nom logique à partir du dossier, du dépôt ou du projet. Signalez le nom utilisé.
{{< /agent-only >}}

### Site Datadog {#datadog-site}

Définissez `DD_SITE` sur le site associé à votre clé d'API. La valeur par défaut est `datadoghq.com`. Consultez les [sites Datadog][9] pour d'autres valeurs.

{{< agent-only >}}
Utilisez la valeur `DD_SITE` fournie. Si aucune valeur n'est fournie ou configurée, indiquez à l'utilisateur que `datadoghq.com` est utilisé. Pour les déploiements en dehors du développement local, listez les variables d'environnement que l'utilisateur doit configurer avant le démarrage.
{{< /agent-only >}}

## Instrumentez l'application {#instrument-the-application}

Choisissez l'approche qui correspond à votre application :

| Approche | À utiliser pour |
|----------|------------|
| [Instrumentation automatique][1] | Fournisseurs de LLM et frameworks pris en charge en Python, Node.js et Java. |
| [Instrumentation du SDK][2] | Spans personnalisés, workflows, évaluations et suivi de session. Le support de Go est expérimental et ne fournit qu'une instrumentation manuelle. |
| [Instrumentation OpenTelemetry][4] | Applications et frameworks qui émettent des spans OpenTelemetry pris en charge. |
| [Instrumentation de l'API HTTP][3] | Intégrations personnalisées qui soumettent des spans et des évaluations directement via HTTP. |

L'instrumentation automatique capture les prompts d'entrée, les complétions de sortie, l'utilisation des jetons et les coûts, lorsque ces données sont disponibles, ainsi que la latence, les erreurs, les paramètres du modèle et les métadonnées du framework. Les appels LLM pris en charge ne nécessitent pas de création manuelle de spans.

Suivez le [guide d'instrumentation automatique][11] pour installer et initialiser le SDK pour votre langage. Pour les opérations personnalisées, ajoutez des spans avec la [référence du SDK][2].

Pour les soumissions HTTP directes, utilisez la [Spans API][12] et l'[Evaluations API][13].

{{< agent-only >}}
Pour Python, Node.js ou Java, suivez la configuration spécifique au langage dans le [guide d'instrumentation automatique](/llm_observability/instrument/auto_instrumentation.md#set-up-automatic-instrumentation). Pour une application Next.js, suivez le [guide Next.js](/llm_observability/guide/nextjs_guide.md) au lieu de la configuration Node.js générale. Pour une application OpenTelemetry, suivez le [guide OpenTelemetry](/llm_observability/instrument/otel_instrumentation.md). Revenez ici après la configuration pour instrumenter les prompts et terminer les étapes restantes.
{{< /agent-only >}}

## Instrumentez les prompts {#instrument-prompts}

Consultez [Configure Prompt Management][7] pour obtenir des instructions sur l'instrumentation des prompts. Vous pouvez utiliser un prompt géré existant ou promouvoir un prompt local. Conservez le prompt local comme solution de secours.

Suivez [Track prompt usage][6] pour choisir entre le suivi automatique et les annotations explicites.

{{< agent-only >}}
Après avoir signalé les résultats de l'instrumentation :

- Si l'utilisateur a fourni un ID de prompt géré par Datadog, suivez le [guide de Prompt Management](/llm_observability/configure/prompt_management.md). Ne demandez pas s'il faut l'activer à nouveau.
- Sinon, identifiez les prompts locaux de l'application Python ou Node.js et demandez si l'utilisateur souhaite les gérer dans Datadog. Si l'utilisateur accepte, suivez le guide pour promouvoir les prompts sélectionnés et intégrer la récupération au moment de l'exécution.
- Si l'utilisateur refuse ou ne répond pas, laissez les prompts locaux instrumentés inchangés.
- Si Prompt Management nécessite une mise à jour du SDK, expliquez pourquoi et demandez l'autorisation avant de modifier la dépendance. Cette mise à jour facultative ne doit pas retarder l'instrumentation principale ou le partage de contexte.
{{< /agent-only >}}

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

## Voir les traces {#view-traces}

Exécutez l'application et effectuez un appel LLM instrumenté. Ouvrez [Agent Observability][14] et sélectionnez l'application pour inspecter ses traces.

Pour créer un lien direct vers les données de l'application, utilisez l'URL de votre [site Datadog][9] sélectionné et filtrez par nom d'application :

```text
https://{{< region-param key="dd_full_site" >}}/llm/applications?query=@ml_app:<APPLICATION_NAME>
```

{{< agent-only >}}
Signalez les modifications d'instrumentation, les exigences de configuration restantes et la manière d'exécuter l'application. Si le partage de contexte a été demandé, indiquez si le téléversement a réussi. Ne prétendez pas que des traces ou des recommandations sont disponibles sans vérification.

Fournissez un lien direct vers l'application en utilisant le nom d'application fourni ou déduit. Déterminez le host de l'application à partir de `DD_SITE` : utilisez `app.datadoghq.com` pour `datadoghq.com`, `app.datadoghq.eu` pour `datadoghq.eu`, `app.ddog-gov.com` pour `ddog-gov.com`, et la valeur `DD_SITE` elle-même pour les autres sites pris en charge. Appliquez un encodage URL à la valeur de la requête.
{{< /agent-only >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/instrument/auto_instrumentation/
[2]: /fr/llm_observability/instrument/sdk/
[3]: /fr/llm_observability/instrument/api/
[4]: /fr/llm_observability/instrument/otel_instrumentation/
[6]: /fr/llm_observability/configure/prompt_management/#track-prompt-usage
[7]: /fr/llm_observability/configure/prompt_management/
[8]: /fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[9]: /fr/getting_started/site/
[10]: /fr/llm_observability/instrument/sdk/#application-naming-guidelines
[11]: /fr/llm_observability/instrument/auto_instrumentation/#set-up-automatic-instrumentation
[12]: /fr/llm_observability/instrument/api/?tab=model#spans-api
[13]: /fr/llm_observability/instrument/api/?tab=model#evaluations-api
[14]: https://app.datadoghq.com/llm/applications