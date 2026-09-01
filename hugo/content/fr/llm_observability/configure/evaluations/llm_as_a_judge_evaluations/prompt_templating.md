---
aliases:
- /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating/
description: Référence pour le templating utilisé dans les prompts d'évaluation personnalisés
  LLM-as-a-judge — variables, opérateurs de tableau, filtres de span et de trace,
  chemins de session et règles de résolution.
further_reading:
- link: /llm_observability/configure/evaluations/llm_as_a_judge_evaluations
  tag: Documentation
  text: Évaluations personnalisées LLM-as-a-judge
- link: /llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
  tag: Documentation
  text: Évaluations au niveau de la session
- link: /llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: Documentation
  text: Évaluations au niveau de la trace
title: Templating de prompt
---
Les prompts personnalisés LLM-as-a-judge injectent des données de session, de trace ou de span dans le message {{< ui >}}User{{< /ui >}} en enveloppant un chemin de champ dans `{{ ... }}`. Le System Prompt contient les instructions statiques pour le juge LLM et ne résout pas les espaces réservés. La même syntaxe fonctionne à la fois dans le volet de test et au moment de l'évaluation. Les chemins disponibles dépendent du périmètre de l'évaluation : session, trace ou span.

## En un coup d'œil {#at-a-glance}

| Modèle | Description |
|---|---|
| `{{traces}}` | Every trace in the session as JSON |
| `{{traces[0].spans[0].meta.input.value}}` | First span of the first trace |
| `{{traces[*].spans[*].name}}` | Fan-out across traces and spans |
| `{{traces[*].spans[meta.span.kind:llm].meta.output.value}}` | Filter spans by attribute across a session |
| `{{spans}}` | Every span in the trace as JSON (trace scope) |
| `{{spans[0].name}}` | Pick one span from a trace (trace scope) |
| `{{spans[name:my-span].meta.input.value}}` | Filter spans by attribute (trace scope) |
| `{{name}}` | Direct field (span scope) |
| `{{meta.input.value}}` | Dot notation for nested fields (span scope) |
| `{{meta.input.messages[0].content}}` | Array index (0-based) (span scope) |
| `{{meta.input.messages[1,3].content}}` | Inclusive array range (span scope) |
| `{{meta.input.messages[*].content}}` | Array wildcard (fan-out) (span scope) |
| `{{meta.input.messages.content}}` | Implicit fan-out (same as `[*]`) (span scope) |
| `{{span_input}}`, `{{span_output}}` | Aliases for span input and output fields (span scope) |
| `{{*}}` | Charge utile entière au format JSON (périmètre de session, de trace ou de span) |

La liste déroulante de saisie semi-automatique s'ouvre après que vous avez tapé `{{` et répertorie les champs disponibles sur l'échantillon sélectionné.

## Syntaxe à périmètre de session {#session-scope-syntax}

Les évaluations à périmètre de session exposent chaque trace dans la [session utilisateur][1] sous le tableau `traces`. Chaque trace inclut son propre tableau `spans`, vous pouvez donc lire à travers les traces et les spans dans une seule invite. Utilisez `{{traces[...]}}` paths (and nested `{{traces[...].spans[...]}}` paths) to build session-level judges. The `{{span_input}}` and `Les alias {{span_output}}` ne sont pas disponibles dans le périmètre de session.

Les évaluations au niveau de la session nécessitent que les spans soient marqués avec un `session_id`. Consultez [Suivi des sessions utilisateur][1] pour instrumenter votre application, et [Évaluations au niveau de la session][2] pour la configuration, des exemples d'invites et des conseils sur le moment de choisir le périmètre de session.

### Référencez la session entière {#reference-the-whole-session}

```
{{traces}}    # JSON of every trace in the session (each trace includes its spans)
{{*}}         # Entire session payload as JSON, including top-level metadata
```

### Choisir une trace ou un span par index {#pick-a-trace-or-span-by-index}

```
{{traces[0].spans[0].meta.input.value}}    # First span of the first trace
{{traces[*].spans[*].name}}                # Newline-joined names of every span in the session
{{traces[1].spans}}                        # JSON of every span in the second trace
```

### Filtrer les spans par attribut {#filter-spans-by-attribute}

`[field.path:value]` sur `spans` conserve uniquement les spans dont le champ à `field.path` est égal à `value`. Combinez avec des chemins plus profonds pour extraire des entrées ou des sorties sur toute la session. Les filtres reviennent à une chaîne vide lorsque rien ne correspond.

```
{{traces[0].spans[name:my-span].meta.input.value}}
{{traces[*].spans[meta.span.kind:llm].meta.output.value}}
{{traces[*].spans[meta.span.kind:tool].meta.input.parameters}}
```

### Déploiement sur les traces {#fan-out-across-traces}

Utilisez `[*]` sur `traces` ou `spans` pour déployer : les valeurs de chaque élément correspondant sont jointes avec des sauts de ligne (`\n`), ou sérialisées au format JSON lorsque les valeurs résolues sont des objets.

```
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## Syntaxe de périmètre de trace {#trace-scope-syntax}

Les évaluations de périmètre de trace exposent chaque span dans la trace sous le tableau `spans`. Utilisez `{{spans...}}` paths to read across spans. The `{{span_input}}` and `Les alias {{span_output}}` ne sont pas disponibles dans le périmètre de trace. Consultez [Trace-Level Evaluations][3] pour la configuration, des exemples d'invites et des conseils sur le moment où choisir le périmètre de trace.

### Référencez la trace entière {#reference-the-whole-trace}

```
{{spans}}    # JSON of every span in the trace
{{*}}        # Entire trace payload as JSON, including top-level metadata
```

### Choisir un span par index {#pick-a-span-by-index}

```
{{spans[0].meta.input.value}}    # First span
{{spans[*].name}}                # Newline-joined names of every span
```

### Filtrer les spans par attribut {#filter-spans-by-attribute-1}

`[field.path:value]` conserve uniquement les spans dont le champ à `field.path` est égal à `value`. Combinez avec des chemins plus profonds pour extraire les entrées ou les sorties des spans correspondants. Le filtre revient à une chaîne vide si aucun span ne correspond.

```
{{spans[name:my-span].meta.input.value}}
{{spans[meta.span.kind:llm].meta.output.value}}
{{spans[meta.span.kind:tool].meta.input.parameters}}
```

## Syntaxe de périmètre de span {#span-scope-syntax}

Les évaluations de périmètre de span exposent un seul span par évaluation. Référencez les champs par leur chemin JSON sur le span.

### Alias intégrés {#built-in-aliases}

| Alias | Résout en |
|---|---|
| `{{span_input}}` | `meta.input.messages[*].content` for LLM spans, `meta.input.value` otherwise |
| `{{span_output}}` | `meta.output.messages[*].content` for LLM spans, `meta.output.value` sinon |

Les alias s'adaptent au type de span évalué, vous n'avez donc pas à faire de distinction quant à savoir si le span correspond à un appel LLM ou à une étape d'agent.

### Chemins de champs directs {#direct-field-paths}

Référencez n'importe quel champ de span par son chemin JSON.

```
{{name}}
{{meta.input.value}}
{{meta.output.value}}
{{metrics.input_tokens}}
```

### Accès au tableau {#array-access}

Utilisez la notation entre crochets pour indexer, découper ou ventiler les champs de tableau.

```
{{meta.input.messages[0].content}}     # First message only
{{meta.input.messages[*].content}}     # All messages, joined with newlines
{{meta.input.messages[0,2].content}}   # Inclusive range; out-of-bounds ends are clamped
{{meta.input.messages.content}}        # Implicit fan-out, equivalent to [*]
```

## Règles de résolution {#resolution-rules}

| Résultat | Comportement |
|---|---|
| Chemin manquant | Résout en une chaîne vide |
| Index hors limites | Résout en une chaîne vide |
| Chaîne unique | Insérée telle quelle |
| Tableau de chaînes | Jointes avec des retours à la ligne (`\n`) |
| Objet ou tableau de valeurs non-chaînes | Sérialisé en JSON compact |
| Tableau mixte (chaînes + objets) | Sérialisé en JSON compact |
| Tableau vide unique | Résout en une chaîne vide |

Par exemple, étant donné un span où `meta.input.messages` est :

```json
[
  { "role": "user", "content": "hello" },
  { "role": "user", "content": "help please" }
]
```

| Modèle | Valeur résolue |
|---|---|
| `{{meta.input.messages[0].content}}` | `bonjour` |
| `{{meta.input.messages[*].content}}` | `bonjour`<br>`aidez-moi s'il vous plaît` |
| `{{meta.input.messages}}` | `[{\"role\":\"user\",\"content\":\"hello\"},{\"role\":\"user\",\"content\":\"help please\"}]` |

## Conseils {#tips}

- Tapez `{{` dans l'éditeur d'invites pour ouvrir le menu déroulant de saisie semi-automatique. La liste s'adapte au périmètre (session, trace ou span) et à l'échantillon sélectionné.
- Choisissez un échantillon dans le panneau de droite ({{< ui >}}Sample Session{{< /ui >}} pour le périmètre de session, {{< ui >}}Spans in Selected Trace{{< /ui >}} pour le périmètre de trace ou {{< ui >}}Filtered Spans{{< /ui >}} pour le périmètre de span), puis cliquez sur {{< ui >}}Test Evaluation{{< /ui >}} pour prévisualiser la façon dont chaque espace réservé se résout sur des données réelles avant d'enregistrer.
- Utilisez le menu à trois points dans la vue JSON d'un échantillon et sélectionnez {{< ui >}}Add variable to message{{< /ui >}} pour insérer un chemin de champ dans l'invite sans avoir à le taper.
- Passez `{{*}}` lorsque vous souhaitez que le juge LLM voie la charge utile complète — utile pour les invites en texte libre qui décident elles-mêmes quels champs sont importants.
- Utilisez `{{traces}}` or targeted `{{traces[...].spans[...]}}` paths for session judges when you need cross-turn context; use `{{spans}}` lorsqu'une seule trace suffit. Consultez [Évaluations au niveau de la session][2] pour obtenir des conseils sur le périmètre et des exemples d'invites.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/instrument/sdk/#tracking-user-sessions
[2]: /fr/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
[3]: /fr/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations