---
title: Générer des métriques personnalisées à partir de spans et de traces
description: 'Générez des métriques personnalisées à partir des intervalles ingérés et des traces complètes.'
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
      text: 'Utilisez des requêtes de trace avancées pour créer des métriques à partir de traces spécifiques.'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: 'Surveillez 100 % du trafic de vos applications grâce aux métriques de trace.'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Créer et gérer des métriques basées sur la portée avec Terraform'
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Métriques basées sur des spans" >}}

Générez des métriques personnalisées à partir des intervalles ingérés pour suivre les tendances, alimenter les tableaux de bord et déclencher des moniteurs, même pour les intervalles et les traces qui ne sont pas conservés pour une analyse complète des traces.

Les métriques personnalisées sont créées à partir des spans ingérées par Datadog APM, que ces spans soient indexées ou non par un [filtre de rétention][1]. Extrayez des valeurs numériques à partir de segments (tels que des comptes, des durées ou des balises personnalisées) ou de traces (durée de trace de bout en bout) et stockez-les sous forme de [métriques personnalisées][3] à longue durée de vie avec une conservation de 15 mois.

**Remarques :**
- Datadog génère automatiquement [des métriques de trace][13] qui capturent le nombre de requêtes, les taux d'erreur et les distributions de latence pour 100 % du trafic de votre application.
- Les intervalles disponibles pour la génération de mesures personnalisées dépendent des [paramètres de contrôle d'ingestion APM][12]. Les intervalles supprimés lors de l'échantillonnage ou du filtrage ne peuvent pas générer de métriques.


Utilisez les métriques personnalisées des spans pour :
- Visibilité détaillée sur la latence au niveau de la portée, les taux d'erreur ou les performances au niveau des balises
- Alimenter les moniteurs [d'anomalies][4] ou [de prévisions][7] avec des mesures à faible latence et haute résolution.
- Extraction des signaux clés pour les tendances ou les alertes sans conserver toute la portée.

#### Quand utiliser les métriques personnalisées issues des traces

Datadog vous permet de générer des métriques à partir de [requêtes de trace][15].

{{< callout url="https://help.datadoghq.com/hc/en-us/requests/new" header="Demander l'accès à la préversion !" >}} Les métriques personnalisées issues des traces sont disponibles en préversion. Pour demander l'accès, envoyez un ticket à l'équipe d'assistance APM et fournissez une brève description de votre cas d'utilisation. {{< /callout >}}

Utilisez les métriques personnalisées issues des traces pour :
- Mesures dérivées du contexte complet de trace, telles que la durée totale de trace ou les opérations par trace.
- Alerte sur les conditions nécessitant une connaissance complète des traces (par exemple, détection de requêtes N+1 ou modèles de fan-out).
- Extraction des signaux clés pour les tendances ou les alertes sans conserver la trace complète.

## Créer une métrique à partir de segments ou de traces

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="Comment créer une métrique" >}}

1. Accédez à [**APM** > **Générer des métriques**][14].
2. Cliquez sur **Nouvelle métrique**.
3. Nommez votre métrique en suivant la [convention de nommage des métriques][11]. Les noms métriques commençant par « `trace.*` » ne sont pas autorisés.
4. Sélectionnez le type de métrique : **Portées** ou **traces**. Les deux utilisent la même [syntaxe de requête][10] que APM Search et Analytics.
5. Définissez la requête métrique pour filtrer et inclure uniquement les intervalles ou les traces que vous souhaitez mesurer.
6. Choisissez la valeur à agréger :
     - Sélectionnez « `*` » (Compter les traces) pour compter toutes les traces ou tous les intervalles correspondants.
     - Entrez un attribut numérique (par exemple, `@cassandra_row_count`) pour agréger et suivre le nombre, le minimum, le maximum, la somme ou les centiles.
7. Définir les dimensions de regroupement. Par défaut, les métriques n'ont pas de balises, sauf si vous en ajoutez. Utilisez n'importe quel attribut ou balise span pour créer des balises métriques.
8. Prévisualisez le résultat pour voir l'impact en temps réel de votre requête grâce à la visualisation des données et à la correspondance des intervalles ou des traces dans l'aperçu en direct.
9. Cliquez sur \*\*Create Metric\*\*.

<div class="alert alert-danger"> Les métriques basées sur la durée sont considérées comme <a href="/metrics/custom_metrics/">des métriques personnalisées</a> et facturées en conséquence. Évitez de regrouper des attributs à cardinalité illimitée ou extrêmement élevée, tels que les horodatages, les identifiants utilisateur, les identifiants de requête ou les identifiants de session, afin de ne pas affecter votre facturation.</div>


## Mettre à jour les indicateurs existants

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Modifier une métrique existante" >}}

Lorsqu'une métrique est créée, seuls deux champs peuvent être mis à jour :

| Champ                                  | Caractéristique                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Stream filter query                    | Modifier le groupe de spans à agréger pour générer les métriques.                                                         |
| Aggregation groups                     | Modifier les tags pour gérer la cardinalité des métriques générées.                                                         |

note Pour modifier le type ou le nom d'une métrique, créez une nouvelle métrique et supprimez l'ancienne.


## Disponibilité des données

Les métriques générées à partir des traces sont émises une fois la trace terminée. Pour les traces de longue durée, le délai augmente en conséquence (par exemple, la métrique d'une trace de 45 minutes ne peut être émise avant la fin de la trace).

Lorsque vous utilisez des métriques personnalisées issues des traces dans les moniteurs, tenez compte de cette latence afin d'éviter les faux positifs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


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
