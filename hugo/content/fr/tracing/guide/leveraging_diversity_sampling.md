---
further_reading:
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Contrôle de l'indexation de trace pour la rétention
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: 'Maîtriser le traçage distribué : défis liés au volume de données et approche
    de Datadog pour un échantillonnage efficace'
title: Comprendre la politique de rétention de Datadog pour conserver efficacement
  les données de trace
---
## Ingestion et conservation des traces qui vous intéressent {#ingesting-and-retaining-the-traces-you-care-about}

La plupart des traces générées par vos applications sont répétitives, et il n'est pas nécessairement pertinent de toutes les ingérer et les conserver. Pour les requêtes réussies, conserver un **échantillon représentatif** du trafic de vos applications suffit, car vous ne pouvez pas examiner des dizaines de requêtes tracées individuelles chaque seconde.

Le plus important, ce sont les traces qui contiennent des symptômes de problèmes potentiels dans votre infrastructure, c'est-à-dire les **traces avec des erreurs ou une latence inhabituelle**. De plus, pour des **endpoints spécifiques et critiques pour votre activité**, vous pourriez vouloir conserver 100 % du trafic, afin de vous assurer d'être en mesure d'enquêter et de résoudre tout problème client en détail. 

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt="Les traces pertinentes sont conservées en stockant une combinaison de traces à latence élevée, de traces d'erreurs et de traces critiques pour l'entreprise." style="width:80%;" >}}


## Comment la politique de rétention de Datadog vous aide à conserver ce qui compte {#how-datadogs-retention-policy-helps-you-retain-what-matters}

Datadog propose principalement deux moyens de conserver les données au-delà de 15 minutes : 
- Le [filtre de rétention intelligent](#diversity-sampling-algorithm-intelligent-retention-filter) qui est toujours activé.
- [Filtres de rétention personnalisés basés sur des tags](#tag-based-retention-filters) que vous pouvez configurer manuellement.

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="Datadog capture les traces d'erreurs et de latence pertinentes via le filtre de rétention intelligent, et les traces critiques pour l'entreprise via des filtres de rétention personnalisés." style="width:80%;" >}}


### Algorithme d'échantillonnage par diversité : filtre de rétention intelligent {#diversity-sampling-algorithm-intelligent-retention-filter}

Par défaut, le filtre de rétention intelligent conserve une sélection représentative de traces sans qu'il soit nécessaire de créer des dizaines de filtres de rétention personnalisés.

Il conserve au moins un span (et la trace distribuée associée) pour chaque combinaison de `environment`, `service`, `operation` et `resource` toutes les 15 minutes au maximum pour les percentiles de latence `p75`, `p90` et `p95`, ainsi qu'une sélection représentative d'erreurs, pour chaque code de statut de réponse distinct.

Pour en savoir plus, lisez la [documentation sur le filtre de rétention intelligent][1].

### Filtres de rétention basés sur des tags {#tag-based-retention-filters}

[Les filtres de rétention basés sur des tags][2] offrent la flexibilité nécessaire pour conserver les traces les plus critiques pour votre entreprise. Lors de l'indexation des spans avec des filtres de rétention, la trace associée est également stockée, ce qui garantit que vous conservez une visibilité sur l'ensemble de la requête et son contexte distribué.

## Recherche et analyse efficaces des données de span indexées {#searching-and-analyzing-indexed-span-data-effectively}

L'ensemble de données capturé par l'échantillonnage par diversité **n'est pas échantillonné uniformément** (c'est-à-dire qu'il n'est pas proportionnellement représentatif du trafic complet). Il est biaisé en faveur des erreurs et des traces à latence élevée. Si vous souhaitez créer des analyses uniquement à partir d'un jeu de données échantillonné uniformément, excluez ces spans échantillonnés pour des raisons de diversité en ajoutant le paramètre de requête `-retained_by:diversity_sampling` dans le Trace Explorer.

Par exemple, pour mesurer le nombre d'opérations de paiement regroupées par niveau de marchand sur votre application, **exclure le jeu de données d'échantillonnage par diversité** garantit que vous effectuez cette analyse sur un ensemble de données représentatif, et ainsi les proportions d'opérations de paiement `basic`, `enterprise` et `premium` sont réalistes :

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="Nombre d'opérations de paiement par niveau, analyses excluant les données échantillonnées par diversité" style="width:80%;" >}}

D'un autre côté, si vous souhaitez mesurer le nombre de marchands uniques par niveau de marchand, **incluez le jeu de données d'échantillonnage par diversité** qui pourrait capturer des identifiants de marchand supplémentaires non détectés par les filtres de rétention personnalisés :

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="Nombre de marchands uniques par niveau. analyses incluant des données échantillonnées par diversité" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /fr/tracing/trace_pipeline/trace_retention