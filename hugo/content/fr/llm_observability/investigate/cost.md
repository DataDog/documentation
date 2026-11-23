---
aliases:
- /fr/llm_observability/monitoring/cost/
description: Surveillez vos tokens et vos coûts LLM.
title: Coût
---
{{< img src="llm_observability/ao_cost_overview.png" alt="Vue d'ensemble des coûts dans Agent Observability." style="width:100%;" >}}

Agent Observability calcule automatiquement un coût estimé pour chaque requête LLM à partir des tarifs publics des fournisseurs et du nombre de tokens indiqués sur les spans LLM/embedding.

En agrégeant ces informations à travers les traces et les applications, vous pouvez obtenir des informations sur les modèles d'utilisation de vos modèles LLM et leur impact sur les dépenses globales.

Cas d'utilisation :
- Voir et comprendre d'où proviennent les dépenses LLM, au niveau du modèle, de la requête et de l'application
- Suivre l'évolution de l'utilisation des tokens et des coûts au fil du temps pour éviter de futures hausses de facturation
- Corréler le coût LLM avec la performance globale de l'application, les versions de modèle, les fournisseurs de modèle et les détails des prompts dans une vue unique

## Configuration de la surveillance des coûts {#setting-up-cost-monitoring}

Datadog propose deux méthodes pour surveiller vos coûts LLM :
- [Automatique](#automatic) : utilisez les tarifs publics des [fournisseurs LLM pris en charge](#supported-providers)
- [Manuel](#manual) : pour des tarifs personnalisés, des modèles auto-hébergés ou des fournisseurs non pris en charge, fournissez manuellement vos propres valeurs de coût.

### Automatique {#automatic}
Si vos requêtes LLM impliquent l'un des [fournisseurs pris en charge listés](#supported-providers), Datadog calcule automatiquement le coût de chaque requête en fonction des éléments suivants :

- Nombre de tokens associés au span LLM/embedding, fourni soit par [auto-instrumentation][1], soit par annotation manuelle de l'utilisateur
- Les tarifs publics du fournisseur de modèle

### Manuel {#manual}
Pour fournir manuellement des informations sur les coûts, suivez les étapes d'instrumentation décrites dans [SDK Reference][2] ou [API][3]. Lorsque vous configurez manuellement vos coûts (par exemple, en définissant `total_cost`), exprimez les valeurs en dollars ; elles seront toutefois stockées en nanodollars.

<div class="alert alert-info">Si vous fournissez des informations de coût partielles, Datadog tente d'estimer les informations manquantes. Par exemple, si vous fournissez un coût total mais pas les valeurs de coût d'entrée/sortie, Datadog utilise les tarifs du fournisseur et les nombres de tokens indiqués sur votre span pour calculer les valeurs de coût d'entrée/sortie. Cela peut provoquer une inadéquation entre le coût total que vous avez fourni manuellement et la somme des coûts d'entrée/sortie calculés par Datadog. Datadog affiche toujours le coût total que vous avez fourni tel quel, même si ces valeurs diffèrent.</div>

#### Comment le nombre de tokens est calculé {#how-token-counts-are-calculated}
Les relations suivantes s'appliquent aux champs d'utilisation des tokens :
{{< img src="llm_observability/llm_token_relationships.png" alt="Diagramme montrant comment Agent Observability calcule le nombre de tokens : total_tokens est la somme de input_tokens et output_tokens ; input_tokens est la somme de non_cached_input_tokens, cache_read_input_tokens et cache_write_input_tokens ; reasoning_output_tokens est un sous-ensemble de output_tokens." style="width:100%;" >}}

Lorsque tous les sous-composants d'un champ de tokens sont fournis, Datadog calcule automatiquement le champ de tokens parent ; il n'est donc pas nécessaire de l'envoyer séparément.

Par exemple :
- `input_tokens` peut être déduit de `non_cached_input_tokens`, `cache_read_input_tokens` et `cache_write_input_tokens`
- `total_tokens` peut être déduit de input_tokens et output_tokens

Datadog recommande de fournir la répartition complète des tokens du cache dès que des informations sur l'utilisation du cache sont disponibles. Datadog applique automatiquement les tarifs de lecture et d'écriture du cache propres à chaque fournisseur lors du calcul des coûts des tokens d'entrée mis en cache.

Si seul `input_tokens` est fourni, Datadog traite tous les tokens d'entrée comme des tokens d'entrée non mis en cache. Fournir uniquement une répartition partielle du cache peut entraîner un décompte inexact des tokens ou des écarts de coût.

## Fournisseurs pris en charge {#supported-providers}
Datadog calcule automatiquement le coût des requêtes LLM effectuées auprès des fournisseurs pris en charge suivants en utilisant les informations tarifaires accessibles au public dans leur documentation officielle.

Datadog prend en charge l'estimation des coûts pour [plus de 800 modèles][4], notamment ceux d'OpenAI, de Hugging Face, de Gemini et d'Anthropic, ainsi que les modèles proposés sur OpenRouter.

## Métriques {#metrics}

Trouvez les métriques de coût et de jetons disponibles dans [Agent Observability Metrics][5]. Les métriques de coût estimé sont mesurées en **nanodollars**, et les métriques de jetons sont mesurées en **jetons**.

Les métriques de coût incluent un tag `source` pour indiquer l'origine de la valeur :
- `source:auto` — calculé automatiquement
- `source:user` — fourni manuellement

### Répartitions des coûts et des jetons {#cost-and-token-breakdowns}

`ml_obs.span.llm.cost` et `ml_obs.span.llm.tokens` sont des métriques Count qui répartissent les coûts et l'utilisation des jetons selon les tags suivants. Le coût inclut les spans LLM et d'embedding, ainsi que les coûts des spans d'outils fournis par l'utilisateur. L'utilisation des jetons inclut uniquement les spans LLM. Pour l'utilisation des jetons d'embedding, utilisez `ml_obs.span.embedding.input.tokens`.

Les répartitions automatiques des jetons OpenAI Realtime nécessitent `ddtrace` 4.17.0 ou une version ultérieure pour Python. Pour Node.js, utilisez `dd-trace` 6.25.0 ou une version ultérieure (v6), ou 5.136.0 ou une version ultérieure (v5). Consultez [l'instrumentation multimodale][11] pour les intégrations prises en charge.

Les frais facturés par le fournisseur pour les outils intégrés, tels que la recherche sur le Web, figurent sur les spans LLM. Les coûts des spans d'outils fournis par l'utilisateur sont des coûts que vous indiquez manuellement sur les spans d'outils.

| Tag | Valeurs | Description |
|-----|--------|-------------|
| `io_type` | `input`, `output`, `unknown` | Contribution d'entrée ou de sortie. |
| `input_type` | `non_cached`, `cache_read`, `cache_write`, `unknown` | Catégorie de cache pour les valeurs d'entrée. Omis pour les autres directions. |
| `output_type` | `reasoning`, `non_reasoning`, `unknown` | Catégorie de raisonnement pour les valeurs de sortie lorsque les données établissent la catégorie. Les frais d'outils sans jetons omettent ce tag. |
| `token_modality` | `text`, `audio`, `image`, `unknown`, `other` | Modalité de jeton. `other` s'applique uniquement aux contributions aux coûts hors jetons, telles que les frais d'outils du fournisseur et les coûts des spans d'outils fournis par l'utilisateur. |
| `ttl` | `5m`, `1h` | Durée de vie de l'écriture en cache lorsque cette répartition est disponible. Omis pour les autres contributions. |

Pour les tags de répartition applicables, les détails indisponibles utilisent `unknown`. Une valeur `unknown` ne signifie pas une utilisation nulle. Par exemple, si un fournisseur ne signale pas l'utilisation du cache, les jetons d'entrée sont tagués `input_type:unknown`. Lorsque l'utilisation du cache ou du raisonnement ne peut pas être attribuée à des modalités individuelles, les valeurs conservent leur catégorie connue et utilisent `token_modality:unknown`.

### Choisissez entre les métriques totales et les métriques de répartition {#choose-between-total-and-breakdown-metrics}

Utilisez les métriques totales pour les statistiques par span, et les métriques de répartition pour comparer l'utilisation entre les catégories.

#### Analysez les totaux par span {#analyze-totals-per-span}

Utilisez les distributions `ml_obs.span.llm.total.cost` et `ml_obs.span.llm.total.tokens` pour les moyennes et les centiles par span. Chaque distribution enregistre une observation totale par span applicable. Le coût total inclut les spans LLM et d'embedding, ainsi que les coûts des spans d'outils fournis par l'utilisateur. Les jetons totaux incluent uniquement les spans LLM.

Par exemple, tracez le coût moyen et l'utilisation moyenne des jetons par span :

```text
avg:ml_obs.span.llm.total.cost{ml_app:my-app}
avg:ml_obs.span.llm.total.tokens{ml_app:my-app}
```

#### Analysez l'utilisation par catégorie {#analyze-usage-by-category}

Utilisez `ml_obs.span.llm.cost` et `ml_obs.span.llm.tokens` pour comparer le coût et l'utilisation des jetons entre les catégories. Utilisez `sum` avec `.as_count()` pour agréger les contributions. Ces métriques ne fournissent pas de moyennes ou de centiles par span.

Par exemple, les requêtes suivantes tracent le coût par entrée ou sortie et modalité, et les jetons d'entrée par catégorie de cache et modalité :

```text
sum:ml_obs.span.llm.cost{ml_app:my-app} by {io_type,token_modality}.as_count()
sum:ml_obs.span.llm.tokens{ml_app:my-app,io_type:input} by {input_type,token_modality}.as_count()
```

Pour un span dont le coût total ou le nombre de jetons est valide, les valeurs de répartition s'additionnent pour former ce total. Lorsqu'un total n'est pas disponible pour le coût ou les jetons, les métriques de répartition conservent les valeurs d'entrée ou de sortie disponibles. La distribution totale correspondante ne reçoit aucune observation.

N'ajoutez pas les métriques de répartition aux métriques `.total.*` correspondantes lors du calcul des totaux, car cela compterait deux fois la même utilisation.

## Tags personnalisés sur les métriques de coût et de tokens {#custom-tags-on-cost-and-tokens-metrics}

Les métriques de coût et de tokens LLM de Datadog sont fournies avec des tags prêts à l'emploi tels que `model_name`, `model_provider` et `ml_app`. Pour ventiler les dépenses liées aux LLM selon des attributs propres à votre application, comme l'équipe, le niveau de clientèle ou la fonctionnalité, vous pouvez utiliser certains de vos tags de span comme tags personnalisés sur les métriques de coût et de tokens générées.

<div class="alert alert-info">Les tags personnalisés s'appliquent uniquement aux métriques de <strong>coût</strong> (<code>ml_obs.span.* cost</code>) et de <strong>tokens</strong> (<code>ml_obs.span.* tokens</code>) des LLM. D'autres métriques de span (telles que <code>ml_obs.span.duration</code>) ne sont pas affectées.</div>

### Fonctionnement {#how-it-works}

1. Taguez vos spans LLM avec les attributs selon lesquels vous souhaitez ventiler les dépenses, en utilisant le paramètre `tags` du SDK (ou l'auto-instrumentation)
2. Dans la même annotation, indiquez lesquelles de ces clés de tag doivent être propagées aux métriques de coût en transmettant les clés au paramètre `cost_tags` (Python) ou `costTags` (Node.js). Consultez [SDK Reference][7] pour connaître la syntaxe d'instrumentation complète et les règles concernant le moment où effectuer l'instrumentation
3. Une fois propagées, ces clés de tag apparaissent en tant que tags sur les métriques de coût et de tokens LLM. Vous pouvez les utiliser partout dans Datadog où ces métriques sont exploitées : les dashboards, les monitors, les notebooks et la recherche de traces

<div class="alert alert-warning">Configurez uniquement des tags avec des valeurs bornées (telles que <code>team</code>, <code>customer_tier</code>, ou <code>feature</code>). Les tags avec des valeurs non bornées ou à haute cardinalité (telles que les ID utilisateur ou les ID de requête) ne sont pas entièrement pris en charge et peuvent être tronqués ou omis des métriques résultantes.</div>

### Cas d'utilisation : filtrer et regrouper les dépenses par attribut d'application {#use-case-filter-and-group-spend-by-an-application-attribute}

Utilisez des tags personnalisés pour ventiler les dépenses par des attributs qui ne font pas partie des tags de métriques prêts à l'emploi. Créez un widget de dashboard de `ml_obs.span.llm.total.cost` regroupé par `team` pour voir quelles équipes contribuent le plus à la consommation des LLM au fil du temps, et configurez un monitor de métrique sur la même requête pour alerter indépendamment chaque équipe (ou niveau de client, fonctionnalité, environnement) lorsque l'utilisation dépasse un seuil.

### Cas d'utilisation : suivre l'efficacité de la mise en cache des prompts {#use-case-track-prompt-caching-effectiveness}

De nombreux fournisseurs de LLM mettent en cache les préfixes de prompts réutilisés afin de réduire les traitements répétés. Marquer les spans avec des identifiants de prompt tels que « prompt_version » ou « prompt_template_id », puis ventiler les métriques selon ces tags vous permet de :

- Comparer les variantes de prompts selon l'efficacité avec laquelle elles tirent parti du cache du fournisseur. Par exemple, suivre le taux de succès du cache en utilisant la formule `ml_obs.span.llm.input.cache_read.tokens / ml_obs.span.llm.input.cache_write.tokens` 
- Identifier les prompts qui alimentent le cache mais réutilisent rarement son contenu, ce qui est généralement le signe de préfixes instables ou d'une invalidation agressive
- Repérer les prompts qui ne bénéficient pas du tout de la mise en cache parce que le préfixe est trop court pour être éligible ou change à chaque appel.
- Recevoir des alertes sur les régressions de mise en cache dans les métriques de tokens avant qu'elles n'entraînent une augmentation des coûts

{{< img src="llm_observability/cost_tags_cache.png" alt="Dashboard comparant les tokens d'entrée lus dans le cache, les tokens d'entrée écrits dans le cache et les tokens d'entrée non mis en cache, regroupés selon un tag personnalisé prompt_version." style="width:100%;" >}}

## Voir les coûts dans Agent Observability {#view-costs-in-agent-observability}
Dans Agent Observability, sélectionnez {{< ui >}}Cost{{< /ui >}} dans la navigation de gauche pour ouvrir _Cost Overview_. Cette page affiche vos dépenses estimées en IA pour l'ensemble de vos applications LLM, fournisseurs et modèles sur la période sélectionnée.

Cost Overview comprend :
- {{< ui >}}Spend breakdown{{< /ui >}} : un diagramme de Sankey de vos {{< ui >}}Total Estimated Spend{{< /ui >}}, comparé à la période précédente. Sélectionnez {{< ui >}}By app{{< /ui >}}, {{< ui >}}By provider{{< /ui >}} ou {{< ui >}}Custom Tags{{< /ui >}} pour déterminer quelles applications, quels fournisseurs ou quels [tags personnalisés](#custom-tags-on-cost-and-tokens-metrics) sont à l'origine de vos dépenses. Chaque entrée indique le montant dépensé, sa part dans les dépenses totales et l'évolution par rapport à la période précédente.
- {{< ui >}}Cost Savings Opportunity{{< /ui >}} : des [Insights][8] qui identifient des moyens concrets de réduire les dépenses, comme les prompts qui n'utilisent pas le cache de prompts du fournisseur. Chaque insight indique l'application concernée et les économies estimées. [Le dimensionnement des modèles Frontier][9] met en évidence les dépenses liées aux modèles premium afin de privilégier les essais avec des modèles moins coûteux.
- {{< ui >}}Cost Trend{{< /ui >}} : une série temporelle des dépenses pour une application ou pour toutes les applications. Regroupez-la par application, service, nom de modèle, fournisseur de modèle ou tag personnalisé, et ajoutez des filtres pour affiner les résultats.
- {{< ui >}}Wasted Spend{{< /ui >}} : les dépenses liées aux appels ayant échoué, aux réponses de faible qualité et aux problèmes détectés par [Insights][8], ventilées par application. Pour le gaspillage identifié par Insights, ouvrez le constat pour examiner la cause première, les traces affectées et la correction recommandée. Consultez [comment Insights mesure les dépenses inutiles][10].
- {{< ui >}}Cache Efficiency{{< /ui >}} : les économies nettes réalisées grâce à la mise en cache des prompts, ainsi que le taux de succès du cache, le taux de réutilisation du cache et le coût des entrées non mises en cache. Pour obtenir des métriques de cache précises, fournissez la [ventilation complète des jetons de cache](#how-token-counts-are-calculated).

Pour afficher les coûts d'une seule application, cliquez sur l'application dans le diagramme de Sankey de Cost Overview. Vous pouvez également la sélectionner dans {{< ui >}}Applications{{< /ui >}} et ouvrir l'onglet {{< ui >}}Cost{{< /ui >}}. La _vue Cost_ de l'application propose :
- {{< ui >}}Filter{{< /ui >}} : des options permettant de limiter la vue Cost à des attributs précis
- {{< ui >}}Total Cost (Estimated){{< /ui >}} et {{< ui >}}Total Tokens{{< /ui >}} : des récapitulatifs ventilés par type de jeton, notamment les jetons de sortie, les jetons d'entrée non mis en cache, les jetons d'entrée lus dans le cache, les jetons d'entrée écrits dans le cache et les jetons d'embedding
- {{< ui >}}Cost Trend{{< /ui >}} : dépenses au fil du temps, regroupées par modèle, fournisseur, type de jeton ou tags personnalisés
- {{< ui >}}Most Expensive LLM Calls{{< /ui >}} : une liste de vos requêtes les plus coûteuses

{{< img src="llm_observability/cost_tracking_trace_v2.png" alt="Données de coût dans les détails de la trace." style="width:100%;" >}}

Les données de coût sont également disponibles dans les traces et les spans de votre application, ce qui vous permet de comprendre les coûts au niveau de la requête (trace) et de l'opération (span).
Cliquez sur n'importe quelle trace ou span pour ouvrir un panneau latéral détaillé incluant les métriques de coût pour la trace complète et pour chaque appel LLM individuel.
En haut de la vue de la trace, la bannière affiche des informations de coût agrégées pour la trace complète, y compris le coût estimé et le nombre total de jetons. Le survol de ces valeurs révèle une répartition des jetons et des coûts en entrée et en sortie.

La sélection d'un span LLM individuel affiche des métriques de coût similaires spécifiques à cette requête LLM.

Pour interroger les données liées aux coûts sur la page Traces, utilisez les {{< ui >}}Cost{{< /ui >}}facettes situées sur le côté gauche. 

Vous pouvez également interroger directement les attributs de span suivants :
- `@metrics.input_tokens` / `@metrics.estimated_input_cost`
- `@metrics.output_tokens` / `@metrics.estimated_output_cost`
- `@metrics.total_tokens` / `@metrics.estimated_total_cost`
- `@metrics.non_cached_input_tokens` / `@metrics.estimated_non_cached_input_cost`
- `@metrics.cache_read_input_tokens` / `@metrics.estimated_cache_read_input_cost`
- `@metrics.cache_write_input_tokens` / `@metrics.estimated_cache_write_input_cost`
- `@metrics.reasoning_output_tokens` / `@metrics.estimated_reasoning_output_cost`

## Résolvez les problèmes de surveillance des coûts des LLM {#troubleshoot-llm-cost-monitoring}

Si les valeurs de coût LLM sont manquantes dans une trace ou semblent inexactes, consultez les sections suivantes pour connaître les causes courantes et les correctifs.

### La trace affiche « PARTIAL COST » ou « COST UNAVAILABLE » {#trace-shows-partial-cost-or-cost-unavailable}

Chaque span LLM dans une trace est tarifé indépendamment. Cet avertissement s'affiche lorsqu'un ou plusieurs spans LLM dans la trace ne disposent pas d'une estimation de coût :

- {{< ui >}}PARTIAL COST{{< /ui >}} : Datadog a calculé les coûts pour certains spans LLM dans la trace, mais pas pour les autres. La valeur {{< ui >}}Estimated Cost{{< /ui >}} reflète la somme des seuls spans pour lesquels le coût a été calculé.
- {{< ui >}}COST UNAVAILABLE{{< /ui >}} : Datadog n'a pu calculer le coût d'aucun span LLM dans la trace.

Survolez l'avertissement pour voir le nombre de spans affectés, la raison pour laquelle le coût est manquant et les noms des spans affectés. Les raisons entrent dans l'une des catégories suivantes.

#### Fournisseur de modèle non pris en charge {#unsupported-model-provider}

Le fournisseur de modèle LLM indiqué sur le span ne figure pas dans la [liste des fournisseurs pris en charge](#supported-providers), donc Datadog ne dispose d'aucun tarif public à appliquer.

Comment corriger :
- Vérifiez que le `model_provider` du span correspond à un identifiant de fournisseur pris en charge. Consultez la [liste des fournisseurs pris en charge](#supported-providers).
- Fournissez manuellement les valeurs de coût sur le span. Consultez la [SDK Reference][2] ou l'[API][3].

#### Nom de modèle non pris en charge {#unsupported-model-name}

Le fournisseur LLM est pris en charge, mais le `model_name` sur le span ne correspond à aucune entrée dans le [catalogue tarifaire][4] du fournisseur. Cela se produit généralement lorsque le nom du modèle est mal orthographié, abrégé ou correspond à un alias interne.

Comment corriger :
- Mettez à jour le `model_name` du span pour qu'il corresponde au nom officiel dans le [catalogue tarifaire][4] du fournisseur.
- Pour les variantes d'un modèle pris en charge déployées dans un environnement privé ou personnalisées, fournissez manuellement les valeurs de coût sur le span. Consultez la [SDK Reference][2] ou l'[API][3].

#### Décomptes de jetons manquants {#missing-token-counts}

Le span n'a aucune annotation `input_tokens` ou `output_tokens`, donc Datadog n'a aucune valeur de jeton pour le calcul des coûts. (Pour les spans d'embedding, seul `input_tokens` est requis.)

Comment corriger :
- Pour l'[auto-instrumentation][1], vérifiez que votre fournisseur et la version de votre SDK sont pris en charge.
- Pour l'instrumentation manuelle, indiquez le nombre de jetons d'entrée et de sortie sur le span. Consultez la [SDK Reference][2] ou l'[API][3].

### Coût inexact lorsque la mise en cache des prompts est activée {#inaccurate-cost-when-prompt-caching-is-enabled}

Si un span inclut uniquement `input_tokens` et `output_tokens` agrégés, mais qu'il manque `cache_read_input_tokens`, `cache_write_input_tokens` ou `non_cached_input_tokens`, Datadog applique le tarif d'entrée standard à l'ensemble du `input_tokens`.

Pour les fournisseurs qui prennent en charge la mise en cache des prompts, les lectures de cache, les écritures de cache et les entrées non mises en cache sont facturées à des tarifs différents. Sans cette ventilation, le calcul du coût d'entrée peut être inexact.

Comment corriger :
- Pour l'[auto-instrumentation][1], vérifiez que votre fournisseur et votre version du SDK émettent des nombres de jetons spécifiques au cache.
- Pour l'instrumentation manuelle, annotez `cache_read_input_tokens`, `cache_write_input_tokens` et `non_cached_input_tokens` en plus de `input_tokens`. Consultez la [SDK Reference][2] ou l'[API][3].

[1]: /fr/llm_observability/instrument/auto_instrumentation
[2]: /fr/llm_observability/instrument/sdk/?tab=python#monitoring-costs
[3]: /fr/llm_observability/instrument/api/#metrics
[4]: https://github.com/pydantic/genai-prices/tree/main?tab=readme-ov-file#providers
[5]: /fr/llm_observability/investigate/metrics/#llm-cost-metrics
[7]: /fr/llm_observability/instrument/sdk/#adding-custom-tags-to-cost-and-tokens-metrics
[8]: /fr/llm_observability/investigate/insights/
[9]: /fr/llm_observability/investigate/insights/#frontier-model-sizing
[10]: /fr/llm_observability/investigate/insights/#wasted-spend
[11]: /fr/llm_observability/instrument/multimodal/#automatic-instrumentation