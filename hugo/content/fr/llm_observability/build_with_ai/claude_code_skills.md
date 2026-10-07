---
aliases:
- /fr/llm_observability/guide/claude_code_skills/
description: Utilisez les compétences Claude Code de Datadog pour classer les sessions,
  diagnostiquer les échecs, comparer les expériences, générer du code d'expérience
  Python et initialiser des évaluateurs à partir de vos données de production réelles.
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: Documentation
  text: Évaluations d'Agent Observability
- link: /llm_observability/improve/experiments/
  tag: Documentation
  text: Expériences LLM
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: Guide
  text: 'Guide du développeur pour l''évaluation : Créer des évaluateurs personnalisés'
- link: https://www.datadoghq.com/blog/bits-evals/
  tag: Blog
  text: Améliorez la qualité de l'agent d'IA avec Bits Evals
- link: https://github.com/datadog-labs/agent-skills
  tag: GitHub
  text: datadog-labs/agent-skills
title: Analyser les applications LLM avec les compétences Claude Code
---
## Présentation {#overview}

Datadog fournit un ensemble de compétences [Claude Code][1] qui intègrent l'analyse Agent Observability directement dans votre workflow de développement. Plutôt que de naviguer manuellement dans les dashboards, vous pouvez invoquer ces compétences depuis une session Claude Code pour classer les sessions, diagnostiquer les échecs, comparer les expériences, générer du code d'expérience Python et initialiser des évaluateurs — le tout à partir de vos données de production réelles.

| Compétence | Ce qu'elle fait |
|-------|-------------|
| `/agent-observability-session-classify` | Classer si l'intention de l'utilisateur a été satisfaite dans une session, une trace ou un lot de sessions provenant d'une ml_app |
| `/agent-observability-trace-rca` | Analyse de la cause profonde des traces LLM de production défaillantes |
| `/agent-observability-experiment-analyzer` | Analyser et comparer les résultats des expériences LLM |
| `/agent-observability-experiment-py-bootstrap` | Générer du code d'expérience Python en utilisant le SDK `ddtrace.llmobs`. Effectue une introspection de votre application pour connecter un `task_fn` réel (sans espace réservé), découvre automatiquement les identifiants depuis `.env`, et accepte un `--purpose` libre qui dirige la sélection de l'évaluateur |
| `/agent-observability-eval-bootstrap` | Générer du code d'évaluateur à partir de traces, publier des évaluateurs LLM-judge en ligne, ou échantillonner des traces dans un jeu de données pour une utilisation dans une expérience |
| `/agent-observability-eval-pipeline` | Pipeline guidé en six phases, des traces de production aux évaluateurs, jeux de données, expériences et analyses. Arrêtez-vous tôt avec `--stop-after`, reprenez en cours de flux avec `--start-at`. |

Les compétences produisent des résultats structurés et exploitables — rapports RCA avec des propositions de correctifs avant/après, code d'évaluateur généré, comparaisons d'expériences — que vous pouvez transmettre directement à un agent de codage pour appliquer des correctifs à votre application. Lorsque Claude Code a accès à votre base de code, il peut rechercher le prompt système pertinent, les définitions d'outils ou la logique de routage et proposer des diffs spécifiques sans quitter la session.

## Configuration {#setup}

### Prérequis {#prerequisites}

- [Claude Code][1] installé et authentifié
- Au moins une application LLM [instrumentée avec Agent Observability][2] et produisant des traces
- Un backend de données : soit le Datadog MCP Server **soit** la `pup` CLI

### Installer les compétences {#install-the-skills}

Les compétences sont publiées dans le dépôt [agent-skills][6]. Installez-les avec la commande suivante :

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

Les compétences sont disponibles dans toute session Claude Code après l'installation.

### Datadog MCP Server {#datadog-mcp-server}

Pour utiliser l'option Datadog MCP server, connectez l'Agent Observability MCP server à votre session Claude Code :

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Toutes les compétences détectent automatiquement le MCP server au démarrage et l'utilisent en continu.

### Option B : pup CLI {#option-b-pup-cli}

Si vous préférez ne pas utiliser le MCP server, les compétences fonctionnent également via [`pup`][5], l'interface de ligne de commande interne de Datadog. Installez `pup` et authentifiez-vous :

```shell
pup auth login
```

Chaque compétence détecte au démarrage si le MCP server est disponible ; sinon, elle vérifie la présence de `pup` et bascule automatiquement en pup mode. Vous pouvez également forcer explicitement le pup mode en passant `--backend pup` à n'importe quelle invocation de compétence.

En pup mode, tous les appels à Datadog API sont effectués via des sous-commandes `pup llm-obs` au lieu d'outils MCP. La sortie et le workflow sont identiques.

## Compétences {#skills}

### Classer les sessions et les traces {#classify-sessions-and-traces}

`/agent-observability-session-classify` évalue si l'intention d'un utilisateur a été satisfaite lors d'une interaction donnée. Il fonctionne selon trois modes en fonction de ce que vous fournissez :

| Mode | Invoquer avec | Utiliser lorsque |
|------|-------------|----------|
| Session | `session_id` | Évaluer une session spécifique |
| Trace | `trace_id` | Évaluer une trace unique d'Agent Observability |
| App | `ml_app` | Échantillonner et classer un lot de sessions ou de traces récentes |

La compétence s'appuie sur jusqu'à trois sources de signaux, et la précision s'améliore à mesure qu'elle a accès à davantage de données :

- **Traces d'Agent Observability** — l'arborescence complète des spans, le contenu de la conversation, les résultats des appels d'outils, et les verdicts d'évaluation judge. Toujours disponible.
- **Signaux comportementaux RUM** — pages vues, actions personnalisées, temps de séjour et événements de feedback explicites qui confirment ou contredisent ce que montre la trace. Disponible lorsque RUM est instrumenté pour votre application.
- **Audit Trail** — événements d'écriture confirmés par le serveur (dashboards créés, monitors modifiés, carnets supprimés) qui prouvent si les actions de l'assistant ont réellement abouti. Signal le plus fiable lorsque la session impliquait la création ou la modification d'actifs.

La compétence renvoie par défaut un verdict `yes / partial / no` compact avec une raison en une phrase. Ajoutez `verbose: true` pour un rapport complet au format markdown.

**Exemples :**

```
/agent-observability-session-classify session_id=abc-123
/agent-observability-session-classify trace_id=def-456
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

### Diagnostiquer les échecs avec une analyse des causes profondes {#diagnose-failures-with-root-cause-analysis}

`/agent-observability-trace-rca` parcourt l'arborescence des spans des traces en échec pour identifier pourquoi votre application LLM produit de mauvais résultats. Il sélectionne le meilleur mode d'analyse en fonction des signaux disponibles : verdicts d'évaluation LLM-judge (signal le plus fort), erreurs d'exécution ou anomalies structurelles telles que les valeurs aberrantes de latence et les décisions dans une boucle d'agent.

La compétence échantillonne les spans en échec, les regroupe dans une taxonomie d'échecs et compile un rapport RCA structuré avec des catégories de causes profondes, des preuves à l'appui et des propositions de correction concrètes. Chaque correction inclut le texte ou le code réel de la trace — extraits de prompt système, formes d'arguments d'outils, logique de routage — avec un `BEFORE` / `AFTER` montrant exactement ce qu'il faut changer.

Lorsque Claude Code a accès à votre base de code, la compétence recherche les fichiers sources pertinents et propose des diffs que vous pouvez appliquer immédiatement. Pour les lacunes du prompt système, le mauvais usage des outils ou les erreurs de routage, cela signifie passer du diagnostic à une pull request sans quitter la session.

**Exemples :**

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

### Analyser et comparer des expériences {#analyze-and-compare-experiments}

`/agent-observability-experiment-analyzer` récupère les résultats d'expériences et met en évidence ce qui a changé entre un candidat et une baseline. Cela fonctionne pour une seule expérience (analyse exploratoire) ou une paire (analyse comparative).

La compétence met en évidence les métriques qui se sont améliorées ou ont régressé, les catégories d'événements qui ont changé et les points où le candidat a sous-performé — afin que vous puissiez prendre une décision de promotion en toute confiance.

**Exemples**

```
/agent-observability-experiment-analyzer experiment_id=exp-123
/agent-observability-experiment-analyzer experiment_id=exp-456 baseline_id=exp-123
```

### Générer du code d'expérience avec le SDK Python {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap` émet un script `.py` autonome ou un notebook Jupyter `.ipynb` qui utilise le SDK `ddtrace.llmobs` et correspond aux [notebooks de référence][7].

Le jeu de données peut être un fichier `DatasetRecordRaw[]` JSON local (intégré au fichier), un CSV (chargé à l'exécution via `LLMObs.create_dataset_from_csv`), un jeu de données Datadog existant par son nom (`LLMObs.pull_dataset`), ou — par défaut — un petit échantillon en ligne de 3 enregistrements.

**Tous les flags ci-dessous sont facultatifs.** Appelez `/agent-observability-experiment-py-bootstrap` sans argument et la compétence vous demandera ce dont elle a besoin et émettra un fichier exécutable basé sur l'échantillon par défaut de 3 enregistrements.

| Option | Requis | Par défaut | Description |
|--------|----------|---------|-------------|
| <span class="text-nowrap">`--purpose`</span> | Non | demandé si non défini ou déductible | Chaîne libre décrivant ce que l'expérience valide. Biais du classement d'introspection, forme de retour du wrapper et sémantique de l'évaluateur |
| <span class="text-nowrap">`--format`</span> | Non | `py` | `py` ou `ipynb` |
| <span class="text-nowrap">`--dataset`</span> | Non | échantillon de 3 enregistrements en ligne | Local `DatasetRecordRaw[]` JSON ou CSV. S'exclut mutuellement avec `--dataset-name` |
| <span class="text-nowrap">`--dataset-name`</span> | Non | aucun |  Jeu de données Datadog existant à récupérer au moment de l'exécution via `LLMObs.pull_dataset`. S'exclut mutuellement avec `--dataset` |
| <span class="text-nowrap">`--dataset-version`</span> | Non | dernière | Fixez une version spécifique lors de l'utilisation de `--dataset-name` |
| <span class="text-nowrap">`--project-name`</span> | Non | `experiment-<service-name>`déduit à partir de la base de code | Nom de projet Datadog indiqué dans l'interface utilisateur Experiments |
| <span class="text-nowrap">`--evaluator-style`</span> | Non | `function` | `function` / `class` / `remote`. Sélectionne la surface ; `--purpose` sélectionne la sémantique |
| <span class="text-nowrap">`--task-source`</span> | Non | automatique par introspection | `<module.path>:<function>`explicité à incorporer comme `task_fn` |
| <span class="text-nowrap">`--placeholder-task`</span> | Non | désactivé | Ignore l'introspection et émet un espace réservé `# TODO(user)` générique |
| <span class="text-nowrap">`--app-root`</span> | Non | déduit | Limite l'analyse d'introspection à ce répertoire |
| <span class="text-nowrap">`--env-file`</span> | Non | aucun | Chemin `.env` explicite. Intégré dans le fichier généré en tant que `ENV_FILE_OVERRIDE` |
| <span class="text-nowrap">`--jobs`</span> | Non | `10` | Simultanéité transmise à `experiment.run(jobs=N)` |
| <span class="text-nowrap">`--output`</span> | Non | `./experiments/experiment.<ext>` | Chemin du fichier de sortie |

**Exemples**

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection on ambiguous queries" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name qa_v3 --project-name customer-qa
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond --evaluator-style remote
/agent-observability-experiment-py-bootstrap --placeholder-task --format ipynb
```

### Bootstrap des évaluateurs à partir des données de trace {#bootstrap-evaluators-from-trace-data}

`/agent-observability-eval-bootstrap` analyse les traces de production d'une ml_app (ou d'un rapport RCA déjà en contexte) et propose une suite d'évaluateurs qui détecteraient les modes de défaillance observés. Il génère l'un des quatre artefacts suivants :

| Mode | Flag | Output |
|------|------|--------|
| Code SDK (par défaut) | — | Classes `BaseEvaluator` / `LLMJudge` Python prêtes à être intégrées dans une [Expérience LLM][3] |
| Spécification JSON | `--data-only` | Spécification d'évaluateur agnostique au framework, adaptée à la révision ou à une implémentation manuelle |
| Juges en ligne | `--publish` | Évaluateurs de type LLM-judge publiés directement sur Datadog et activés sur votre ml_app |
| Émission de jeu de données | `--emit-dataset <path>` | Un `DatasetRecordRaw[]` fichier JSON échantillonné à partir des traces de production, mis en forme pour `LLMObs.create_dataset(records=...)`. Ignore entièrement le workflow de l'évaluateur — ce mode produit un jeu de données, pas des évaluateurs |

Les trois premiers modes partagent le même workflow de proposition d'évaluateur et ne diffèrent que par la manière dont la suite est matérialisée. Le quatrième mode (`--emit-dataset`) est indépendant — il échantillonne les spans racines pour le `ml_app` (filtré sur `@status:ok`), extrait `input_data` et `expected_output` par enregistrement, exécute un nettoyage des PII sur les valeurs de chaîne, et écrit un fichier JSON que vous pouvez publier sur Datadog en tant que jeu de données, puis utiliser pour exécuter une expérience. Les `tags` par enregistrement sont normalisés automatiquement (les chaînes brutes sont encapsulées sous forme de `tag:<value>`) afin que `Dataset.append()` ne rejette pas l'enregistrement. Le champ `expected_output` est documenté comme **la baseline du comportement en production**, et non comme une vérité absolue — utile pour les expériences de type régression (mon refactoring modifie-t-il les sorties observées ?) avant d'être promu vers un labelled gold set.

**Exemples**

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json --trace-limit 25
```

### Exécutez le pipeline de bout en bout {#run-the-end-to-end-pipeline}

`/agent-observability-eval-pipeline` enchaîne les sous-compétences d'observabilité des agents en un workflow supervisé et narré unique qui va des traces de production aux évaluateurs, jeux de données, expériences et analyses. Chaque phase possède la même enveloppe — une bannière qui nomme l'entité produite, un bloc pédagogique expliquant son objectif, l'action (un appel de sous-compétence ou une petite étape exécutable) et un point de contrôle qui attend votre confirmation. C'est le point de départ recommandé lorsque vous n'avez pas d'évaluateurs ou d'expériences existants et que vous souhaitez une procédure pas à pas déterministe.

```
Phase 1: Classify ml_app traces      → agent-observability-session-classify (ml_app mode)
Phase 2: Root cause analysis         → agent-observability-trace-rca
Phase 3: Bootstrap evaluators        → agent-observability-eval-bootstrap
Phase 4: Create + publish dataset    → agent-observability-eval-bootstrap --emit-dataset + LLMObs.create_dataset(records=...)
Phase 5: Generate + run experiment   → agent-observability-experiment-py-bootstrap + python <generated_file>
                                       (with an in-phase review beat between codegen and run)
Phase 6: Analyze experiment          → agent-observability-experiment-analyzer
```

Chaque phase possède un nom court canonique — la même valeur acceptée par `--start-at` et `--stop-after`. Utilisez ces noms chaque fois que vous devez faire référence à une seule phase sans ambiguïté (par exemple dans des scripts, dans une discussion avec des coéquipiers ou dans des tickets de support) :

| # | Titre de la phase | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">Nom de l'étape </span> | Sous-compétence invoquée | Résumé | Artefact de sortie |
|---|-------------|----------------------------------------------------------------------------------------|-------------------|---------|-----------------|
| 1 | Classifier les traces ml_app | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `/agent-observability-session-classify` (mode ml_app) | MCP `search_llmobs_spans` échantillonne les spans racines récents pour le `ml_app`. Chaque span est classé comme succès / partiel / échec et regroupé en modèles courants. | Résumé de la classification + blocs par unité |
| 2 | Analyse des causes profondes | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `/agent-observability-trace-rca` | MCP `search_llmobs_spans` extrait les traces complètes pour les spans en échec identifiés lors de la phase 1. L'arborescence des traces est parcourue pour attribuer chaque échec à un span racine et à un mode de défaillance. | Rapport RCA avec taxonomie des modes de défaillance et causes profondes |
| 3 | Bootstrap des évaluateurs | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | `/agent-observability-eval-bootstrap` | Raisonnement local sur la RCA de la phase 2 — aucun appel MCP. Émet du code d'évaluateur Python (`sdk_code`), une spécification JSON agnostique au framework (`data_only`), ou publie directement des évaluateurs de type LLM-judge en ligne sur Datadog via l'API publique (`publish`). | Suite d'évaluateurs (mode `sdk_code` / `data_only` / `publish`) |
| 4 | Créer et publier un jeu de données | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `/agent-observability-eval-bootstrap --emit-dataset` + `LLMObs.create_dataset(records=...)` | MCP `search_llmobs_spans` échantillonne les spans racines, extrait des paires `(input_data, expected_output)`, nettoie les PII et écrit un fichier JSON local. La sous-étape de publication appelle ensuite `LLMObs.create_dataset()` via le SDK ddtrace (pas MCP) pour envoyer le jeu de données vers Datadog. | JSON local `DatasetRecordRaw[]` + jeu de données Datadog publié (nom, version, URL) |
| 5 | Générer et exécuter l'expérience | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `/agent-observability-experiment-py-bootstrap` + `python <generated_file>` (avec un temps de révision `run` / `edit` / `stop` entre la génération de code et l'exécution) | Principalement local : la compétence effectue une introspection de votre application pour les sites d'appel LLM (décorateurs OpenAI / Anthropic / LangChain / LiteLLM / LlamaIndex / Bedrock / Gemini) et émet un fichier Python autonome reliant `task_fn` à un véritable point d'entrée. Un appel MCP `list_llmobs_evals` se déclenche au démarrage en tant que balise de connectivité + télémétrie. Le fichier généré utilise le SDK ddtrace au moment de l'exécution ; aucun appel MCP pendant l'exécution elle-même. | Généré `.py` ou `.ipynb` + exécution de l'expérience avec `experiment.url` |
| 6 | Analyser l'expérience | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `/agent-observability-experiment-analyzer` | Utilisateur MCP intensif : `get_llmobs_experiment_summary` pour les métriques de premier plan, `get_llmobs_experiment_metric_values` pour les scores par enregistrement, `list_llmobs_experiment_events` + `get_llmobs_experiment_event` pour explorer les lignes individuelles, et `get_llmobs_experiment_dimension_values` pour la ventilation par segment. Synthétise les résultats dans un rapport structuré. | Rapport d'analyse avec répartition des métriques, performances des segments et prochaines expériences recommandées |

Les phases 4 et 5 sont les deux seules qui exécutent du code sur votre machine ; les autres sont en lecture seule ou écrivent des fichiers générés dans `--output-dir`. Le comportement classique du pipeline d'évaluation en trois phases (classification → RCA → bootstrap des évaluateurs uniquement) est préservé en transmettant `--stop-after eval-bootstrap`. La phase 5 marque une pause entre la génération de code et l'exécution afin que vous puissiez examiner le fichier d'expérience généré avant que des jetons de fournisseur ne soient consommés — tapez `run` pour exécuter, `edit` pour mettre en pause et ajuster, ou `stop` pour quitter proprement.

**Entrez et sortez à n'importe quelle phase.** Le pipeline enregistre la sortie principale de chaque phase (résumé de classification, rapport RCA, suite d'évaluateurs, jeu de données, nom du jeu de données publié, fichier d'expérience, exécution d'expérience, rapport d'analyse) dans `<output-dir>/state/0N-<name>.{md, json}` avant que chaque point de contrôle ne soit rendu. Cela signifie :

- **`stop`** à n'importe quel point de contrôle (ou `--stop-after <phase>` depuis le début) termine l'exécution proprement, laissant un artefact qui permet de reprendre l'exécution ultérieurement.
- **`--start-at <phase>`** charge le fichier d'état de chaque phase précédente (ou accepte un indicateur de remplacement si vous en avez fourni un) et passe directement à la phase nommée. Vous pouvez reprendre des heures ou des jours plus tard, ou passer directement à « réanalyser simplement cette expérience » sans réexécuter quoi que ce soit auparavant.

Vocabulaire des points de contrôle à chaque phase : `continue` avance, `stop` quitte proprement, `redo` réexécute la phase actuelle (avec des notes d'ajustement facultatives ajoutées), `back` recule d'une phase. Toute autre entrée est traitée comme un ajustement.

**Seul `<ml_app>` est requis.** Chaque flag ci-dessous est facultatif — la compétence choisit des valeurs par défaut raisonnables pour chacun d'eux. L'invocation minimale est `/agent-observability-eval-pipeline <ml_app>` ; le reste du tableau sert lorsque vous souhaitez remplacer une valeur par défaut, reprendre en cours de route ou épingler un emplacement de sortie spécifique.

| Option | Requis | Par défaut | Description |
|--------|----------|---------|-------------|
| `<ml_app>` | **Oui** | — (requis) | L'application LLM instrumentée à intégrer / évaluer |
| `--project-name` | Non | dérivé de `pyproject.toml` / `setup.cfg` / `setup.py` / `package.json` / cwd | Le projet Datadog dans lequel le pipeline écrit les jeux de données et les expériences. Apparaît dans Precheck et créé de manière différée par `LLMObs.enable(project_name=...)` dans la phase 4 |
| `--timeframe` | Non | `now-7d` | Fenêtre de rétrospection pour la classification de la phase 1 et l'échantillonnage des jeux de données de la phase 4 |
| `--trace-limit` | Non | `20` | Plafond d'échantillonnage pour la phase 4. La phase 1 utilise en interne `min(20, --trace-limit)` pour l'échantillon de classification |
| `--format` | Non | `py` | Transmis à `agent-observability-experiment-py-bootstrap` dans la phase 5 : `py` (script) ou `ipynb` (Jupyter notebook) |
| `--evaluator-style` | Non | `function` | Transmis à Phase 3 et Phase 5 : `function`, `class` ou `remote` |
| `--data-only` | Non | désactivé | Pass-through de Phase 3 : émettre une spécification d'évaluateur JSON agnostique au framework au lieu du code Python SDK |
| `--publish` | Non | désactivé | Pass-through de Phase 3 : publier des évaluateurs LLM-judge en ligne sur Datadog |
| `--stop-after` | Non | `analyze` (tout exécuter) | S'arrêter une fois la phase nommée terminée. Accepte : `classify`, `rca`, `eval-bootstrap` *(correspond au comportement classique en 3 phases)*, `dataset`, `experiment`, `analyze` |
| `--start-at` | Non | `classify` (commencer au début) | Ignorer les phases précédentes et commencer à la phase nommée. Même vocabulaire que `--stop-after`. Charge automatiquement les artefacts de la phase précédente depuis `<output-dir>/state/` |.
| `--classification-summary` | Non | chargé automatiquement depuis `state/01-classification.md` | Remplacer la sortie de Phase 1 que Phase 2 consomme (utilisé avec `--start-at rca` ou ultérieur) |
| `--rca-report` | Non | chargé automatiquement depuis `state/02-rca-report.md` | Remplacer la sortie de Phase 2 que Phase 3 consomme |
| `--dataset-file` | Non | chargé automatiquement depuis le champ `state/04-published-dataset.json` de `dataset_file` |  le JSON local `DatasetRecordRaw[]` Utilisé par la sous-étape de publication de la Phase 4 lors d'une nouvelle publication sans rééchantillonnage |.
| `--dataset-name` | Non | chargé automatiquement depuis `state/04-published-dataset.json` | Nom du jeu de données Datadog publié vers lequel la Phase 5 connecte l'expérience |.
| `--experiment-file` | Non | chargé automatiquement depuis `state/05-experiment-run.json` | Le fichier d'expérience généré. Lorsqu'il est présent, Phase 5 ignore la génération de code et passe directement à l'étape de révision → exécution |.
| `--experiment-id` / `--experiment-url` | Non | chargé automatiquement depuis `state/05-experiment-run.json` | L'expérience Datadog que Phase 6 analyse (mutuellement exclusif) |
| `--app-root` | Non | résolu depuis cwd / `pyproject.toml` etc. | Restreint l'introspection de la fonction de tâche de Phase 5 à cette arborescence de répertoires |
| `--env-file` | Non | aucun (la découverte automatique parcourt les emplacements standard) | Chemin `.env` explicite pour le chargement des informations d'identification ; affiché dans la pré-vérification |.
| `--output-dir` | Non | `./experiments` | Où le JSON du jeu de données, le script de publication, le fichier d'expérience généré et le répertoire `state/` sont écrits |.

**Exemples**

```
# Full six-phase walkthrough for a brand new ml_app
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot

# Organize the dataset and experiment under a specific Datadog project
# (the project is created lazily — no need to pre-create it in the UI)
/agent-observability-eval-pipeline my-chatbot --project-name customer-qa-eval

# Classic three-phase eval-pipeline behavior — preserves backward compatibility
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap

# Resume from where a previous run stopped
/agent-observability-eval-pipeline my-chatbot --start-at experiment

# Re-analyze a previous experiment run without re-running it
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>

# Run a single phase in isolation
/agent-observability-eval-pipeline my-chatbot --start-at dataset --stop-after dataset
```

> **Nom du projet** — si `--project-name` est omis, la compétence le déduit automatiquement de votre base de code (dans l'ordre : `pyproject.toml` → `setup.cfg` → `setup.py` → `package.json` → nom de base du répertoire de travail), avec `experiment-sdk-default` comme solution de repli. Le nom résolu est affiché dans la sortie de la pré-vérification avant l'exécution de toute phase, afin que vous puissiez le confirmer ou le remplacer sans avoir à relancer. Le projet Datadog lui-même est créé de manière différée par `LLMObs.enable(project_name=...)` lorsque la Phase 4 publie le jeu de données — vous n'avez jamais besoin de le créer au préalable dans l'interface utilisateur.

## Workflow typique {#typical-workflow}

Si vous débutez dans l'évaluation d'une application LLM, le flux recommandé est le suivant :

1. **Exécutez le pipeline** pour passer des traces de production aux évaluateurs, à un jeu de données initial, à une expérience et à l'analyse :
   ```
   /agent-observability-eval-pipeline <ml_app> --project-name <project>
   ```
   Pour vous arrêter à la sortie classique de l'évaluateur uniquement (sans jeu de données ni expérience), passez `--stop-after eval-bootstrap`. Pour reprendre une exécution précédente, passez `--start-at <phase>` — le pipeline recharge l'état antérieur depuis `<output-dir>/state/` et continue à partir de là.

2. **Appliquez les correctifs.** Le rapport RCA produit lors de la Phase 2 inclut des propositions de correctifs avant/après spécifiques fondées sur des preuves de traces. Transmettez le rapport à un agent de codage (ou agissez directement dessus) pour corriger les invites système, les définitions d'outils ou la logique de routage dans votre base de code.

3. **Exécutez une expérience hors ligne** en utilisant les évaluateurs générés sur un jeu de données étiqueté pour valider leur qualité avant de les activer en production. Consultez le [Guide du développeur d'évaluation][4].

4. **Publiez les évaluateurs en ligne** une fois que les évaluateurs sont validés. L'exécution de `/agent-observability-eval-bootstrap` avec `--publish` crée des évaluateurs LLM-judge en ligne dans Datadog qui s'exécutent automatiquement sur vos traces de production en temps réel — aucune modification de code n'est requise :
   ```
   /agent-observability-eval-bootstrap <ml_app> --publish
   ```

5. **Surveillez et itérez.** À mesure que votre application évolue, réexécutez `/agent-observability-trace-rca` et `/agent-observability-eval-bootstrap` pour détecter les nouveaux modes de défaillance et maintenir votre suite d'évaluateurs à jour.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://claude.ai/code
[2]: /fr/llm_observability/setup/
[3]: /fr/llm_observability/improve/experiments/
[4]: /fr/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: https://datadoghq.atlassian.net/wiki/spaces/BITSAI/pages/5226692942/pup+CLI
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks