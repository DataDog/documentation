---
title: Générer des métriques personnalisées à partir des spans et des traces
description: 'Générer des métriques personnalisées à partir des spans ingérés et des traces complètes.'
aliases:
- /tracing/span_to_metrics/
- /tracing/generate_metrics/
further_reading:
    - link: 'tracing/trace_pipeline'
      tag: "Documentation"
      text: 'Personnalisez l''ingestion de traces et conservez les traces importantes.'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: 'Utilisez des requêtes et des monitors Analytics basés sur les traces conservées.'
    - link: 'tracing/trace_explorer/trace_queries'
      tag: "Documentation"
      text: 'Utiliser des requêtes avancées sur les traces pour créer des métriques à partir de traces spécifiques'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: 'Surveiller 100 % du trafic de votre application avec des métriques de trace'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Créer et gérer des métriques basées sur les spans avec Terraform'
---

...

Générer des métriques personnalisées à partir des spans ingérés pour suivre les tendances, alimenter des tableaux de bord et déclencher des moniteurs, même pour des spans et des traces qui ne sont pas conservés pour une analyse complète des traces.

Les métriques personnalisées sont créées à partir des spans ingérés par Datadog APM, peu importe si un [filtre de rétention][1] indexe ces spans. Extraire des valeurs numériques des spans (comme des comptes, des durées ou des tags personnalisés) ou des traces (durée de la trace de bout en bout) et les stocker en tant que [métriques personnalisées][3] à long terme avec une rétention de 15 mois.

**Remarques :**
- Datadog génère automatiquement des [Métriques de Trace][13] qui capturent les comptes de requêtes, les taux d'erreur et les distributions de latence pour 100 % du trafic de votre application.
- Les spans disponibles pour la génération de métriques personnalisées dépendent de vos [paramètres de contrôle d'ingestion APM][12]. Les spans abandonnés en raison de l'échantillonnage ou du filtrage ne peuvent pas générer de métriques.


Utiliser des métriques personnalisées à partir des spans pour :
- Une visibilité fine sur la latence au niveau des spans, les taux d'erreur ou la performance au niveau des tags
- Alimenter des moniteurs [d'anomalie][4] ou [de prévision][7] avec des métriques à faible latence et haute résolution.
- Extraire des signaux clés pour le suivi ou l'alerte sans conserver le span complet.

#### Quand utiliser des métriques personnalisées à partir des traces

Datadog vous permet de générer des métriques à partir de [Trace Queries][15].

{{< callout url="https://help.datadoghq.com/hc/en-us/requests/new" header="Demandez l'accès à l'aperçu !" >}} Les métriques personnalisées à partir des traces sont en aperçu. Pour demander l'accès, soumettez un ticket à l'équipe de support APM et fournissez une brève description de votre cas d'utilisation. {{< /callout >}}

Utilisez des métriques personnalisées à partir des traces pour :
- Métriques dérivées du contexte complet de la trace, telles que la durée totale de la trace ou les opérations par trace.
- Alerte sur des conditions nécessitant une connaissance complète de la trace (par exemple, détection de requêtes N+1 ou motifs de fan-out).
- Extraction de signaux clés pour les tendances ou les alertes sans conserver la trace complète.

## Créez une métrique à partir de spans ou de traces

...

1. Naviguez vers [**APM** > **Générer des métriques**][14].
2. Cliquez sur **Nouvelle métrique**.
3. Nommez votre métrique en suivant la [convention de nommage des métriques][11]. Les noms de métriques commençant par `trace.*` ne sont pas autorisés.
4. Sélectionnez le type de métrique : **Spans** ou **Traces**. Les deux utilisent la même [syntaxe de requête][10] que la recherche et l'analyse APM.
5. Définissez la requête de métrique pour filtrer et inclure uniquement les spans ou traces que vous souhaitez mesurer.
6. Choisissez la valeur à agréger :
     - Sélectionnez `*` pour compter tous les spans ou traces correspondants.
     - Entrez un attribut numérique (par exemple, `@cassandra_row_count`) à agréger et à suivre le compte, min, max, somme ou percentiles.
7. Définissez les dimensions de regroupement. Par défaut, les métriques n'ont pas de balises à moins que vous ne les ajoutiez. Utilisez n'importe quel attribut ou balise de span pour créer des balises de métriques.
8. Aperçu du résultat pour voir l'impact en temps réel de votre requête à travers la visualisation des données et les spans ou traces correspondants dans l'aperçu en direct.
9. Cliquez sur \*\*Create Metric\*\*.

<div class="alert alert-danger"> Les métriques basées sur des spans sont considérées comme des <a href="/metrics/custom_metrics/">métriques personnalisées</a> et facturées en conséquence. Évitez de regrouper par des attributs à cardinalité illimitée ou extrêmement élevée comme les horodatages, les identifiants d'utilisateur, les identifiants de requête ou les identifiants de session pour éviter d'impacter votre facturation.</div>


## Mettre à jour les métriques existantes

...

Lorsqu'une métrique est créée, seuls deux champs peuvent être mis à jour :

| Champ                                  | Caractéristique                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Stream filter query                    | Modifier le groupe de spans à agréger pour générer les métriques.                                                         |
| Aggregation groups                     | Modifier les tags pour gérer la cardinalité des métriques générées.                                                         |

note Pour changer le type ou le nom de la métrique, créez une nouvelle métrique et supprimez l'ancienne.


## Disponibilité des données

Les métriques générées à partir des traces sont émises après qu'une trace soit terminée. Pour les traces de longue durée, le délai augmente en conséquence (par exemple, la métrique d'une trace de 45 minutes ne peut pas être émise avant la fin de la trace).

Lors de l'utilisation de métriques personnalisées à partir de traces dans des moniteurs, tenez compte de cette latence pour éviter les faux positifs.

## Pour aller plus loin

...


[1]: /tracing/trace_pipeline/trace_retention
[2]: /account_management/billing/custom_metrics/
[3]: https://docs.datadoghq.com/metrics/#overview
[4]: /monitors/types/anomaly/#overview
[5]: /tracing/trace_explorer/
[6]: /tracing/trace_explorer/query_syntax/#analytics-query
[7]: /monitors/types/forecasts/
[8]: https://app.datadoghq.com/apm/getting-started
[9]: https://app.datadoghq.com/apm/traces/generate-metrics
[10]: /tracing/trace_explorer/query_syntax/
[11]: /metrics/#naming-metrics
[12]: /tracing/trace_pipeline/ingestion_controls
[13]: /tracing/metrics/metrics_namespace/ 
[14]: https://app.datadoghq.com/apm/traces/generate-metrics
[15]: /tracing/trace_explorer/trace_queries
