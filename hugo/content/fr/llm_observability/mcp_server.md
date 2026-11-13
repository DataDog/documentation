---
description: Connectez les agents IA à vos traces et expériences Agent Observability
  à l'aide du Datadog MCP Server.
further_reading:
- link: mcp_server
  tag: Documentation
  text: Datadog MCP Server
- link: /llm_observability/experiments
  tag: Documentation
  text: Configurez et utilisez les expériences Agent Observability
- link: /llm_observability/monitoring
  tag: Documentation
  text: Surveillez votre application avec Agent Observability
- link: /llm_observability/guide/claude_code_skills
  tag: Guide
  text: Analyser les applications LLM avec les compétences Claude Code
title: MCP et compétences Agent Observability
---
## Vue d'ensemble {#overview}

Le [Datadog MCP Server][1] permet aux agents IA d'accéder à vos données [Agent Observability][2] via le protocole MCP (Model Context Protocol). L'ensemble d'outils `llmobs` fournit des outils pour rechercher et analyser les traces, inspecter les détails et le contenu des spans, et évaluer les résultats des expériences directement depuis des clients basés sur l'IA comme Cursor, Claude Code ou OpenAI Codex.

## Configuration {#setup}

Connectez un client compatible MCP au Datadog MCP Server avec l'ensemble d'outils `llmobs` activé.

<div class="alert alert-info">Pour obtenir des instructions de configuration complètes, y compris la configuration des extensions Cursor et VS Code, consultez <a href="/mcp_server/setup/">Configurer le Datadog MCP Server</a>.</div>

### Prérequis {#prerequisites}

- Un compte Datadog avec l'autorisation d'accéder aux données Agent Observability.
- Un client compatible MCP (par exemple, Claude Code, Codex CLI, Cursor, Gemini CLI ou Kiro CLI).

### Endpoint {#endpoint}

L'endpoint du serveur MCP dépend de votre [site Datadog][5]. Utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} pour afficher l'endpoint de votre site. Ajoutez `?toolsets=llmobs,core` pour activer Agent Observability et les ensembles d'outils principaux.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint pour votre site sélectionné ({{< region-param key="dd_site_name" >}}):
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Connectez-vous {#connect}

Choisissez l'authentification distante lorsque cela est possible. Utilisez l'authentification binaire locale si votre environnement bloque le flux OAuth distant.

{{< tabs >}}
{{% tab "Authentification distante" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
L'authentification distante utilise le transport [Streamable HTTP][1] de la spécification MCP.

**Claude Code** (ligne de commande) :

<pre><code>claude mcp add --transport http datadog-mcp "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"</code></pre>

**Codex CLI** (`~/.codex/config.toml`) :

<pre><code>[mcp_servers.datadog]
url = "{{< region-param key="mcp_server_endpoint" >}}"
http_headers = { "X-Datadog-MCP-Toolsets" = "llmobs,core" }
</code></pre>

Après avoir ajouté la configuration, exécutez `codex mcp login datadog` pour terminer le flux OAuth.

**Gemini CLI, Kiro CLI et autres clients compatibles MCP** :

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"
    }
  }
}
</code></pre>

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Authentification binaire locale" %}}

L'authentification binaire locale utilise le transport [stdio][2] de la spécification MCP. Utilisez cette méthode si l'authentification distante n'est pas disponible.

1. Installez le binaire du Datadog MCP Server :

    ```bash
    curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
    ```

    The binary installs to `~/.local/bin/datadog_mcp_cli`.

2. Terminez le flux de connexion OAuth :

    ```bash
    datadog_mcp_cli login
    ```

3. Configurez votre client IA. Pour Claude Code, ajoutez ce qui suit à `~/.claude.json`, en remplaçant `<USERNAME>` dans le chemin de la commande :

    ```json
    {
      "mcpServers": {
        "datadog": {
          "type": "stdio",
          "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
          "args": [],
          "env": {}
        }
      }
    }
    ```

    Alternatively, add the server with the Claude Code CLI:

    ```bash
    claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
    ```

[2]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
{{% /tab %}}
{{< /tabs >}}

### Authentifiez-vous avec des clés d'API {#authenticate-with-api-keys}

Le serveur MCP utilise OAuth 2.0 par défaut. Si OAuth n'est pas disponible, envoyez une [clé d'API et une clé d'application][6] Datadog en tant qu'en-têtes HTTP `DD_API_KEY` et `DD_APPLICATION_KEY` :

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Pour des raisons de sécurité, limitez la clé d'API et la clé d'application à un [compte de service][7] disposant uniquement des autorisations requises.

## Compétences de l'agent{#agent-skills}

Les compétences de l'agent sont des ensembles d'instructions prédéfinis pour les agents de codage IA qui automatisent les workflows courants Agent Observability. L'ensemble de compétences `agent-observability` est disponible dans le dépôt [Datadog agent-skills][8]. Il fournit six compétences pour classer les sessions, diagnostiquer les échecs, analyser les expérimentations, générer du code d'expérimentation avec le SDK `ddtrace.llmobs` et amorcer des évaluateurs par rapport à vos données de production réelles.

### Installation{#install}

Installez les compétences `agent-observability` avec la commande suivante :

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

Les compétences nécessitent que la boîte à outils MCP `llmobs` soit connectée. Si vous ne l'avez pas encore connectée, exécutez :

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http "datadog-llmo-mcp" \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Redémarrez Claude Code après avoir exécuté les deux commandes pour que les compétences apparaissent.

### Compétences disponibles{#available-skills}

| Compétence| Invoquer avec| Ce qu'elle fait|
|-------|-------------|-------------|
| Classification de session| `/agent-observability-session-classify` | Détermine si l'intention de l'utilisateur a été satisfaite dans une session, une trace ou un lot|
| Analyse de cause racine de trace| `/agent-observability-trace-rca` | Analyse de cause racine sur les traces de production défaillantes|
| Analyseur d'expérimentation| `/agent-observability-experiment-analyzer` | Analyser et comparer les résultats d'expérimentation LLM|
| Génération de code Python d'expérimentation| `/agent-observability-experiment-py-bootstrap` | Générer du code d'expérimentation Python en utilisant le SDK `ddtrace.llmobs`. Introspection de votre application pour connecter un `task_fn` réel, découverte automatique des identifiants `.env`, et acceptation d'un `--purpose` libre qui dirige la sélection de l'évaluateur |
| Amorçage d'évaluation| `/agent-observability-eval-bootstrap` | Générer du code d'évaluateur, publier des évaluateurs LLM-judge en ligne, ou échantillonner des traces dans un jeu de données pour une utilisation dans une expérimentation|
| Pipeline d'évaluation | `/agent-observability-eval-pipeline` | Pipeline guidé en six phases, depuis les traces de production jusqu'aux évaluateurs, jeux de données, expériences et analyses. Arrêtez prématurément avec `--stop-after`, reprenez en cours de flux avec `--start-at` |

#### Classification de session {#session-classification}

`/agent-observability-session-classify` classifie si l'intention de l'utilisateur a été satisfaite dans une interaction donnée. Il s'appuie sur jusqu'à trois sources de signaux :  : traces Agent Observability, données comportementales RUM et événements Audit Trail. La compétence renvoie un verdict `yes / partial / no` avec des preuves à l'appui. La confiance s'améliore avec chaque source de signal supplémentaire.

```
/agent-observability-session-classify session_id=<SESSION_ID>
/agent-observability-session-classify trace_id=<TRACE_ID>
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

#### Analyse des causes profondes des traces {#trace-root-cause-analysis}

`/agent-observability-trace-rca` diagnostique pourquoi une application LLM produit de mauvais résultats. Il sélectionne un mode d'analyse basé sur le signal le plus fort disponible (verdicts d'évaluation LLM-judge, erreurs d'exécution ou anomalies structurelles) et compile un rapport d'analyse des causes profondes (RCA) structuré. Le rapport inclut une taxonomie des échecs et des propositions de correction concrètes `BEFORE` / `AFTER` fondées sur les preuves issues des traces.

Lorsque Claude Code a accès à votre base de code, la compétence peut rechercher les fichiers sources pertinents et proposer des diffs en ligne.

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

#### Amorçage d'évaluateur {#evaluator-bootstrap}

`/agent-observability-eval-bootstrap` analyse les traces de production et propose une suite d'évaluateurs ciblant les modes de défaillance observés. Il génère l'un des quatre artefacts suivants : :  classes `BaseEvaluator` Python / `LLMJudge` pour les expériences hors ligne, une spécification JSON indépendante du framework, des évaluateurs LLM-judge en ligne publiés directement sur Datadog, ou — via `--emit-dataset <path>` — un `DatasetRecordRaw[]` JSON échantillonné à partir des traces de production et mis en forme pour `LLMObs.create_dataset(records=...)`. Le mode dataset-emit ignore entièrement le workflow de l'évaluateur ; il produit un jeu de données adapté à une utilisation comme entrée pour une expérience.

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json
```

#### Analyseur d'expérience {#experiment-analyzer}

`/agent-observability-experiment-analyzer` récupère les résultats de l'expérience et met en évidence ce qui a changé entre un candidat et une référence :  : quelles métriques se sont améliorées, lesquelles ont régressé et où le candidat a été moins performant.

```
/agent-observability-experiment-analyzer experiment_id=<EXPERIMENT_ID>
/agent-observability-experiment-analyzer experiment_id=<CANDIDATE_ID> baseline_id=<BASELINE_ID>
```

#### Générer du code d'expérience avec le SDK Python {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap` émet un script `.py` autonome ou un notebook `.ipynb` Jupyter qui utilise le SDK `ddtrace.llmobs` et correspond au style du notebook de référence canonique.

Le jeu de données peut être un fichier `DatasetRecordRaw[]` JSON local (intégré au fichier), un CSV (chargé à l'exécution via `LLMObs.create_dataset_from_csv`), un jeu de données Datadog existant par son nom (`LLMObs.pull_dataset`), ou — par défaut — un petit échantillon en ligne de 3 enregistrements. Chaque expérience générée est marquée avec `generated_by=claude-code` et le `--purpose` résolu dans `config` et `tags`.

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name <DATASET_NAME> --project-name <PROJECT_NAME>
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond
```

#### Pipeline d'évaluation de bout en bout {#end-to-end-eval-pipeline}

`/agent-observability-eval-pipeline` parcourt les traces de production via des évaluateurs, des jeux de données, des expériences et des analyses en six phases narrées, avec un point de contrôle utilisateur entre chacune :

1. **Classifier les traces ml_app** — échantillonner et classifier les traces récentes de votre `ml_app`
2. **Analyse de la cause racine** — diagnostiquer pourquoi les traces en échec échouent
3. **Amorcer les évaluateurs** — proposer une suite d'évaluateurs ciblant les modes de défaillance observés
4. **Créer + publier le jeu de données** — extraire les paires entrée / sortie attendue dans un `DatasetRecordRaw[]` JSON et publier sur Datadog sous votre projet (créé de manière paresseuse).
5. **Générer + exécuter l'expérience** — émettre un `.py` ou `.ipynb` exécutable qui récupère le jeu de données et connecte la fonction de tâche de votre application, puis l'exécuter de bout en bout et capturer `experiment.url`. Un rythme de revue en phase (`run` / `edit` / `stop`) se situe entre la génération de code et l'exécution afin que vous puissiez inspecter le fichier généré avant qu'il ne s'exécute
6. **Analyser l'expérience** — produire un rapport d'analyse avec des ventilations de métriques et des recommandations

Chaque phase possède un nom court canonique — la même valeur acceptée par `--start-at` et `--stop-after`. Le tableau ci-dessous liste, par phase, quels outils MCP le pipeline peut invoquer et une description en une ligne de la logique :

| # | Titre de la phase | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">Nom de l'étape</span> | Outils MCP appelés | Résumé |
|---|-------------|----------------------------------------------------------------------------------------|------------------|---------|
| 1 | Classifier les traces ml_app | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `search_llmobs_spans` | Échantillonne les spans racines récents pour `ml_app`, classe chacun comme succès / partiel / échec, met en évidence les schémas courants. |
| 2 | Analyse de la cause racine | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `search_llmobs_spans` | Récupère les traces complètes pour les spans en échec de la Phase 1 et parcourt l'arborescence des traces pour attribuer chaque échec à un span racine et à un mode de défaillance. |
| 3 | Amorcer les évaluateurs | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | Aucun (raisonnement local sur le rapport de la Phase 2) ; appel Datadog API optionnel pour publier des évaluateurs LLM-judge en ligne lorsque `--publish` est défini | Émet une suite d'évaluateurs Python (`sdk_code`), une spécification JSON agnostique au framework (`data_only`), ou publie des évaluateurs en ligne (`publish`). |
| 4 | Créer et publier le jeu de données | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `search_llmobs_spans` pour l'échantillonnage ;`LLMObs.create_dataset()` via le SDK ddtrace (pas MCP) pour la publication | Échantillonne les spans racines, extrait les paires entrée / expected_output, nettoie les PII, écrit un JSON local, puis publie sur Datadog. |
| 5 | Générer et exécuter l'expérience | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `list_llmobs_evals` (balise de démarrage one-shot — connectivité + télémétrie) ; l'exécution utilise le SDK ddtrace | Introspecte votre application pour les sites d'appel LLM, émet un câblage autonome (`.py` ou `.ipynb`) `task_fn` vers un point d'entrée réel, puis l'exécute. |
| 6 | Analyser l'expérience | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `get_llmobs_experiment_summary`, `get_llmobs_experiment_metric_values`, `list_llmobs_experiment_events`, `get_llmobs_experiment_event`, `get_llmobs_experiment_dimension_values` | Récupère les métriques de haut niveau, les scores par enregistrement, les dimensions de segment et les événements de drill-down, synthétise un rapport d'analyse structuré. |

Vous pouvez `stop` proprement à n'importe quel point de contrôle et reprendre plus tard avec `--start-at <stage-name>` — aucune réexécution n'est nécessaire. Passez `--stop-after eval-bootstrap` pour préserver le comportement classique à trois phases d'évaluation uniquement.

```
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap          # classic 3-phase
/agent-observability-eval-pipeline my-chatbot --start-at experiment                # resume mid-flow
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>
```

Pour un guide complet sur ces compétences et un workflow de bout en bout recommandé, consultez [Analyze LLM Applications with Claude Code Skills][9].

## Cas d'utilisation {#use-cases}

Les outils MCP Agent Observability permettent des workflows assistés par IA pour :

- **Débogage de l'exécution de l'agent**: Recherchez des traces par application ML, statut d'erreur ou balises personnalisées, puis examinez les hiérarchies de spans et le contenu pour identifier les échecs.
- **Analyse de la structure de trace**: Visualisez l'arborescence complète des spans d'une trace pour comprendre comment les agents, les LLM, les outils et les récupérations interagissent.
- **Enquête sur les boucles d'agent**: Examinez la boucle d'exécution étape par étape d'un agent pour comprendre la prise de décision et les modèles d'invocation d'outils.
- **Évaluation d'expériences**: Obtenez des statistiques récapitulatives pour les métriques d'expérience, comparez les résultats entre les segments de dimension et inspectez les événements individuels.
- **Création d'expériences**: Enregistrez un nouvel objet d'expérience avec `create_llmobs_experiment` pour consigner les métadonnées de l'expérience (projet, jeu de données, description, configuration) sans exécuter d'inférence de modèle. Attachez ensuite les métriques d'évaluation avec `submit_llmobs_experiment_events`.
- **Découverte de modèles d'expérience**: Filtrez et triez les événements d'expérience par performance de métrique pour trouver les cas les plus et les moins performants.
- **Gestion des évaluateurs**: Listez, inspectez, créez, mettez à jour et supprimez les configurations d'évaluateur pour une application ML ou pour l'ensemble de l'organisation.
- **Exploration de modèles**: Listez les configurations de modèles, vérifiez le statut d'exécution et parcourez la hiérarchie des sujets découverte pour comprendre ce que demandent les utilisateurs et comment le trafic est distribué.
- **Gestion des jeux de données**: Recherchez des projets et des jeux de données, parcourez et inspectez les enregistrements de jeux de données, et ajoutez de nouveaux enregistrements à un jeu de données pour les utiliser dans des expériences.

## Outils disponibles {#available-tools}

L'ensemble d'outils `llmobs` comprend les outils suivants :

### Trace and span tools → Outils de trace et de span{#trace-and-span-tools}

`search_llmobs_spans`
: Search for spans matching filters or a raw query. → Recherchez des spans correspondant à des filtres ou à une requête brute.

`get_llmobs_trace`
: Get the full structure of a trace as a span hierarchy tree, including span counts by kind, error indicators, and total duration. → Obtenez la structure complète d'une trace sous forme d'arborescence hiérarchique de spans, incluant le nombre de spans par type, les indicateurs d'erreur et la durée totale.

`get_llmobs_span_details`
: Obtenez des métadonnées détaillées pour un ou plusieurs spans, incluant le timing, les informations d'erreur, les détails LLM (modèle, nombre de jetons), les métriques et les évaluations.

`get_llmobs_span_content`
: Récupérez le contenu réel d'un champ de span (entrée, sortie, messages, documents ou métadonnées) avec extraction JSONPath optionnelle.

`find_llmobs_error_spans`
: Trouvez tous les spans d'erreur dans une trace avec contexte de propagation, regroupés par type de span avec messages d'erreur et traces de pile.

`expand_llmobs_spans`
: Chargez les enfants de spans spécifiques pour une exploration progressive de l'arborescence lorsque `get_llmobs_trace` renvoie des nœuds réduits.

`get_llmobs_agent_loop`
: Obtenez une vue chronologique de la boucle d'exécution d'un agent, montrant chaque étape (appels LLM, invocations d'outils, décisions) dans l'ordre.

### Outils d'expérimentation {#experiment-tools}

`create_llmobs_experiment`
: Créez un nouvel objet d'expérience LLM Observability dans un projet. Enregistre l'expérience (afin que les événements et les métriques puissent être rapportés par rapport à celle-ci) sans exécuter d'inférence de modèle. Nécessite `project_id` et `experiment_name`. Renvoie l'`experiment_id` créé et son nom résolu. Utilisez `submit_llmobs_experiment_events` pour joindre des métriques d'évaluation, ou `update_llmobs_experiment` pour modifier ses propriétés.

`get_llmobs_experiment_summary`
: Obtenez un résumé de haut niveau de l'expérience avec des statistiques précalculées pour toutes les métriques d'évaluation. Commencez ici avant d'utiliser d'autres outils d'expérimentation.

`list_llmobs_experiment_events`
: Listez les événements d'expérience avec filtrage par dimension ou métrique et tri par valeur de métrique.

`get_llmobs_experiment_event`
: Obtenez les détails complets d'un seul événement d'expérience, incluant l'entrée, la sortie, la sortie attendue, toutes les métriques et les dimensions.

`get_llmobs_experiment_metric_values`
: Obtenez une analyse statistique pour une métrique d'évaluation spécifique, éventuellement segmentée par une dimension pour comparaison.

`get_llmobs_experiment_dimension_values`
: Obtenez les valeurs uniques pour une dimension avec les dénombrements, utiles pour découvrir des valeurs de filtre et de segment valides.

### Outils d'évaluation {#evaluator-tools}

`list_llmobs_evals`
: Listez chaque évaluateur LLM-judge configuré dans toutes les applications ML. Renvoie le nom, l'application ml_app et le statut activé de chaque évaluateur.

`list_llmobs_evals_by_ml_app`
: List all LLM-judge evaluators configured for a specific ML application. → Listez tous les évaluateurs LLM-judge configurés pour une application ML spécifique.

`get_llmobs_evaluator`
: Retrieve an LLM-judge evaluator configuration by name, including its target (ml_app, sampling, filter), LLM provider, and judge prompt template. → Récupérez la configuration d'un évaluateur LLM-judge par son nom, incluant sa cible (ml_app, échantillonnage, filtre), le fournisseur LLM et le modèle de prompt de l'évaluateur.

`create_or_update_llmobs_evaluator`
: Create or update an LLM-judge evaluator configuration. → Créez ou mettez à jour la configuration d'un évaluateur LLM-judge. Targets a specific ML application and optionally a filter or sampling percentage; the judge's model and prompt template define how it scores each span. → Cible une application ML spécifique et, optionnellement, un filtre ou un pourcentage d'échantillonnage ; le modèle et le modèle de prompt de l'évaluateur définissent la manière dont il évalue chaque span.

`delete_llmobs_evaluator`
: Delete an LLM-judge evaluator configuration by name. → Supprimez la configuration d'un évaluateur LLM-judge par son nom.

### Outils de projet et de jeu de données {#project-and-dataset-tools}

`list_llmobs_projects`
: List all LLM Observability experiments projects for the org, sorted by creation date (newest first). → Listez tous les projets d'expérimentation LLM Observability pour l'organisation, triés par date de création (du plus récent au plus ancien). Renvoie le `id`, le `name` et les horodatages de chaque projet, ainsi que les champs de pagination (`next_cursor`, `truncated`). Utilisez ceci pour découvrir les noms et les ID de projet lorsque vous ne les connaissez pas déjà.

`get_llmobs_project`
: Look up an LLM Observability experiments project by ID or name. → : Recherchez un projet d'expérimentation LLM Observability par ID ou par nom. Utilisez ceci pour résoudre un UUID `project_id` avant d'appeler les outils de jeu de données.

`list_llmobs_datasets`
: List datasets within a project, with optional ID or name filter. → : Listez les jeux de données au sein d'un projet, avec un filtre optionnel par ID ou par nom. Renvoie les métadonnées du jeu de données et les champs de pagination. Utilisez ceci avant `get_llmobs_dataset_records` ou `add_llmobs_dataset_records` — ces outils nécessitent un UUID de jeu de données.

`get_llmobs_dataset_records`
: Read dataset records with structured previews and a schema summary. → : Lisez les enregistrements du jeu de données avec des aperçus structurés et un résumé du schéma. Met en forme des champs JSON arbitraires (`input`, `expected_output`, `metadata`) en aperçus lisibles. Utilisez `compute_schema=true` pour obtenir un aperçu typé de la structure des enregistrements avant de construire de nouveaux enregistrements.

`get_llmobs_full_dataset_records`
: Fetch up to 3 specific records with full, untrimmed content. → : Récupérez jusqu'à 3 enregistrements spécifiques avec un contenu complet et non tronqué. Utilisez ceci pour inspecter individuellement les enregistrements en détail après avoir trouvé les ID d'enregistrement avec `get_llmobs_dataset_records`.

`add_llmobs_dataset_records`
: Create records in a dataset using a two-step preview-then-confirm flow. → : Créez des enregistrements dans un jeu de données en utilisant un flux en deux étapes : aperçu puis confirmation. Appelez `confirmed=false` pour prévisualiser l'écriture prévue, puis `confirmed=true` pour valider après approbation de l'utilisateur.

### Outils Patterns {#patterns-tools}

`list_llmobs_pattern_configs`
: List all Patterns configurations for the org. → : Regroupes dans une liste toutes les configurations Patterns pour l'organisation. Renvoie le `id`, le `name`, le `evp_query`, les paramètres d'échantillonnage et les horodatages de chaque configuration. Commencez ici pour trouver un `config_id`.

`get_llmobs_pattern_config`
: Obtenir la configuration Patterns la plus récemment modifiée pour l'organisation.

`get_llmobs_pattern_run_status`
: Obtenir le statut et la progression par activité de la plus récente exécution de Patterns pour une configuration. Utilisez ceci pour vérifier si le clustering est en cours d'exécution, terminé ou a échoué avant de lire les sujets.

`list_llmobs_pattern_runs`
: Lister toutes les exécutions Patterns terminées pour une configuration, de la plus récente à la plus ancienne. Renvoie l'`id`, le `status`, les horodatages et le `config_snapshot` utilisé pour chaque exécution.

`get_llmobs_patterns`
: Obtenir la hiérarchie des sujets découverte par une exécution de Patterns. Les sujets sont organisés en niveaux, chacun avec un `name`, un `description` et un `point_count`. Omettez `run_id` pour lire l'exécution terminée la plus récente.

`get_llmobs_patterns_with_points`
: Obtenir la hiérarchie des sujets pour une exécution avec les ID de span intégrés sur chaque sujet feuille. Définissez `include_metrics=true` pour inclure également la durée, le coût, le nombre de jetons et les évaluations par span.

`get_llmobs_pattern_points`
: Obtenir une page paginée par curseur de points de clustering (spans individuels) assignés à un seul sujet. Chaque point inclut le `span_id`, le `session_id` et un aperçu de l'entrée du span. Transmettez `next_page_token` en tant que `page_token` pour continuer la pagination.

## Workflows recommandés {#recommended-workflows}

### Analyse de trace {#trace-analysis}

1. **Rechercher** : utilisez `search_llmobs_spans` pour trouver des traces par application ML, statut, type de span ou balises personnalisées.
2. **Visualiser** : utilisez `get_llmobs_trace` pour voir l'arborescence complète de la hiérarchie des spans.
3. **Inspecter** : utilisez `get_llmobs_span_details` pour obtenir des métadonnées, le timing et les évaluations pour des spans spécifiques.
4. **Lire le contenu** : utilisez `get_llmobs_span_content` pour récupérer les E/S réelles, les messages ou les documents.
5. **Déboguer les erreurs** : utilisez `find_llmobs_error_spans` pour localiser toutes les erreurs dans une trace avec le contexte de propagation.
6. **Développer** : utilisez `expand_llmobs_spans` pour charger les enfants des spans réduits pour une exploration plus approfondie.
7. **Examen de l'agent** : utilisez `get_llmobs_agent_loop` pour voir le flux d'exécution étape par étape d'un span d'agent.

### Analyse d'expérience {#experiment-analysis}

1. **Résumer** : utilisez `get_llmobs_experiment_summary` pour obtenir des statistiques globales et découvrir les métriques et dimensions disponibles.
2. **Parcourir les événements** : utilisez `list_llmobs_experiment_events` pour trouver des événements d'intérêt, en filtrant par dimension ou en triant par métrique.
3. **Inspecter les événements** : utilisez `get_llmobs_experiment_event` pour afficher les détails complets d'un événement spécifique.
4. **Analyser les métriques** : utilisez `get_llmobs_experiment_metric_values` pour obtenir des distributions de centiles, des taux vrai/faux, ou comparer entre des segments de dimension.
5. **Découvrir les dimensions** : utilisez `get_llmobs_experiment_dimension_values` pour trouver des valeurs de filtre et de segment valides.

### Gestion des jeux de données {#dataset-management}

1. **Trouver votre projet** : utilisez `list_llmobs_projects` pour parcourir les projets — chaque résultat inclut l'UUID `id` dont vous avez besoin pour les appels ultérieurs. Si vous connaissez déjà le nom du projet mais pas son UUID, utilisez `get_llmobs_project` pour le résoudre directement.
2. **Trouver votre jeu de données** : utilisez `list_llmobs_datasets` avec `project_id` pour lister les jeux de données et obtenir leurs UUID.
3. **Comprendre les données** : utilisez `get_llmobs_dataset_records` avec `compute_schema=true` pour parcourir les enregistrements et obtenir un aperçu du type des champs avant de lire ou d'écrire.
4. **Lire des enregistrements spécifiques** : utilisez `get_llmobs_full_dataset_records` pour récupérer le contenu complet de jusqu'à 3 enregistrements par ID.
5. **Ajouter des enregistrements** : utilisez `add_llmobs_dataset_records` avec `confirmed=false` pour prévisualiser une écriture, puis `confirmed=true` après approbation de l'utilisateur.

### Analyse Patterns {#patterns-analysis}

1. **Lister les configurations** : utilisez `list_llmobs_pattern_configs` pour trouver les configurations Patterns disponibles et leurs valeurs `config_id`.
2. **Vérifier le statut d'exécution** : utilisez `get_llmobs_pattern_run_status` pour vérifier que l'exécution la plus récente est terminée.
3. **Lire les sujets** : utilisez `get_llmobs_patterns` pour obtenir la hiérarchie complète des sujets avec les noms, les descriptions et les scores de cohérence.
4. **Inspect spans** : utilisez `get_llmobs_patterns_with_points` pour obtenir les sujets avec les span IDs intégrés, ou `get_llmobs_pattern_points` pour parcourir les spans d'un sujet spécifique.
5. **Analyser le contenu des spans** : utilisez `get_llmobs_span_details` ou `get_llmobs_span_content` avec les valeurs `span_id` de l'étape précédente pour inspecter les entrées, sorties et métadonnées réelles des spans individuels au sein d'un sujet.
6. **Parcourir les exécutions passées** : utilisez `list_llmobs_pattern_runs` pour voir les exécutions historiques et transmettez un `run_id` spécifique pour comparer les distributions de sujets au fil du temps.

## Exemples d'invites {#example-prompts}

Après la connexion, essayez des invites telles que :

- Examinez les traces d'erreurs de mon application `customer-support-bot` au cours de la semaine passée. Résumez les modèles de défaillance les plus courants, leur fréquence d'apparition, et recommandez ceux à corriger en priorité.
- Trouvez les traces où les réponses de mon agent ont été signalées par les évaluations comme étant de faible qualité. Examinez les entrées et les sorties, puis suggérez des modifications spécifiques à mon invite système pour améliorer la qualité des réponses.
- Examinez les traces récentes de l'agent pour mon application et trouvez les cas où l'agent a bouclé plus que nécessaire. Analysez la prise de décision à chaque étape et suggérez comment améliorer mes descriptions d'outils pour réduire les appels d'outils inutiles.
- Un utilisateur a signalé une mauvaise réponse. Voici l'ID de trace : `trace-123`. Expliquez-moi exactement ce qui s'est passé : ce que l'utilisateur a demandé, ce que l'agent a fait à chaque étape, et où les choses ont mal tourné. Proposez une correction de code.
- Analysez l'expérience `exp-456` et générez un tableau markdown des dimensions les moins performantes ventilées par scores d'évaluation. Incluez toute autre colonne pertinente qui m'aide à comprendre où et pourquoi les performances se dégradent.
- Comparez l'expérience `exp-123` (référence) avec l'expérience `exp-456`. Résumez ce qui s'est amélioré, ce qui a régressé et de combien. Recommandez-moi si les changements valent la peine d'être déployés.
- Résumez l'expérience `exp-456` et identifiez les 5 événements ayant obtenu les scores les plus bas. Pour chacun, montrez l'entrée, la sortie et les évaluations qui ont échoué.
- Créez une nouvelle expérience appelée « prompt-v2-test » dans mon projet `my-chatbot-project` et renvoyez son ID d'expérience afin que je puisse y joindre des métriques d'évaluation.
- Listez les jeux de données dans mon projet `my-project` et montrez-moi un échantillon d'enregistrements du jeu de données nommé `qa-golden-set`, y compris son schéma.
- J'ai un CSV de nouveaux cas de test. Ajoutez-les au jeu de données `qa-golden-set` dans `my-project` en tant que nouvelle version. Montrez-moi d'abord un aperçu.

## Combiner avec d'autres outils Datadog {#combine-with-other-datadog-tools}

L'ensemble d'outils `core` inclus dans l'URL de configuration donne à votre agent IA accès à des outils Datadog supplémentaires qui se marient naturellement avec l'analyse de Agent Observability.

### Exporter l'analyse vers les Datadog Notebooks {#export-analysis-to-datadog-notebooks}

L'ensemble d'outils `core` inclut `create_datadog_notebook` et `edit_datadog_notebook`, qui permettent à votre agent IA de créer [Datadog Notebooks][3] directement à partir des résultats d'analyse. Vous pouvez exporter les résultats des discussions avec l'agent dans un notebook collaboratif et partageable qui réside dans Datadog aux côtés de vos traces et expériences.

Essayez des invites comme :

- Analysez l'expérience `exp-456`, identifiez les dimensions les moins performantes et exportez un rapport récapitulatif vers un Notebook Datadog avec une ventilation par scores d'évaluation.
- Examinez les traces d'erreur pour mon `customer-support-bot` au cours de la semaine passée et créez un Notebook Datadog avec les résultats, y compris les modèles de défaillance courants et les correctifs recommandés.

Pour les visualisations personnalisées qui vont au-delà des widgets Datadog standard, comme les graphiques de comparaison ou les diagrammes de quadrant, les Notebooks affichent également nativement les [diagrammes Mermaid][4]. Essayez des invites comme :

- Analysez l'expérience `exp-456`, comparez les scores `accuracy` pour chaque version de prompt et exportez les résultats vers un Notebook Datadog incluant un graphique à barres Mermaid du score moyen pour chaque version.
- Analysez l'expérience `exp-456` et exportez un Notebook Datadog qui trace chaque version de prompt sur un graphique à quadrants Mermaid avec `relevance` sur un axe et `accuracy` sur l'autre. Identifiez les versions qui présentent des performances insuffisantes sur les deux dimensions.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mcp_server/setup/
[2]: /fr/llm_observability/
[3]: /fr/notebooks/
[4]: /fr/notebooks/guide/build_diagrams_with_mermaidjs/
[5]: /fr/getting_started/site/
[6]: /fr/account_management/api-app-keys/
[7]: /fr/account_management/org_settings/service_accounts/
[8]: https://github.com/datadog-labs/agent-skills
[9]: /fr/llm_observability/guide/claude_code_skills