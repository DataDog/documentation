---
further_reading:
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Contrôle de l'indexation de trace pour la rétention

title: Comprendre la stratégie de rétention de Datadog pour conserver efficacement
  les données de trace
---

## Ingérer et conserver les traces qui vous intéressent

La plupart des traces générées par vos applications sont répétitives, et il n'est pas nécessairement pertinent de toutes les ingérer ou les conserver. Pour les requêtes réussies, il suffit de conserver un **échantillon représentatif** du trafic de vos applications, car vous ne pouvez pas analyser chaque seconde des dizaines de requêtes individuelles tracées.

Le plus important, ce sont les traces qui contiennent des symptômes de problèmes potentiels dans votre infrastructure, c'est-à-dire **les traces avec des erreurs ou une latence inhabituelle**. En outre, pour certains **endpoints essentiels à votre activité**, il est judicieux de conserver 100 % du trafic, afin de vous assurer que vous êtes en mesure d'étudier en profondeur et de résoudre tout problème rencontré par les utilisateurs. 

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt="Les traces pertinentes sont conservées en stockant une combinaison de traces de haute latence, de traces dʼerreurs et de traces critiques dʼentreprise." style="width:80%;" >}}


## Comment la stratégie de rétention de Datadog vous aide à conserver ce qui est important

Datadog propose principalement deux moyens de conserver les données au-delà de 15 minutes : 
- Le [filtre de rétention intelligent](#filtre-de-retention-intelligent-algorithme-d-echantillonnage-de-diversite) qui est toujours activé.
- [Filtres de rétention personnalisés basés sur des tags](#filtres-de-retention-base-sur-les-tags) que vous pouvez configurer manuellement.

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="Datadog capture les traces dʼerreur et de latence pertinentes via le filtre de rétention intelligent, et les traces critiques dʼentreprise via les filtres de rétention personnalisés." style="width:80%;" >}}


### Algorithme d'échantillonnage de diversité : filtre de rétention intelligent 

Par défaut, le filtre de rétention intelligent conserve une sélection représentative de traces sans qu'il soit nécessaire de créer des dizaines de filtres de rétention personnalisés.

Il conserve au moins un span (et le tracer distribué associé) pour chaque combinaison de `environment`, `service`, `operation` et `resource` toutes les 15 minutes au maximum pour les percentiles de latence `p75`, `p90` et `p95`, ainsi qu'une sélection représentative d'erreurs, pour chaque code d'état de réponse distinct.

Pour en savoir plus, lisez la [documentation sur le filtre de rétention intelligent][1].

### Filtres de rétention basés sur les tags

Les [filtres de rétention basés sur les tags][2] offrent la possibilité de conserver de façon flexible les traces qui sont les plus critiques pour votre entreprise. Lors de l'indexation de spans avec des filtres de rétention, la trace associée est également stockée, ce qui vous permet de garder une visibilité sur l'ensemble de la requête et son contexte distribué.

## Recherche et analyse efficaces des données indexées du span

L'ensemble des données capturées par l'échantillonnage de diversité n'est **pas uniformément échantillonné** (c'est-à-dire qu'il n'est pas proportionnellement représentatif de l'ensemble du trafic). Il est biaisé en faveur des traces dʼerreurs et de latence élevée. Si vous souhaitez créer des analyses uniquement à partir d'un ensemble de données uniformément échantillonné, excluez ces spans qui sont échantillonnés pour des raisons de diversité en ajoutant le paramètre de requête `-retained_by:diversity_sampling` dans le Trace Explorer.

Par exemple, pour mesurer le nombre d'opérations d'encaissement groupées par niveau de marchand sur votre application, **exclure l'ensemble de données d'échantillonnage de diversité** garantit que vous effectuez cette analyse à partir d'un ensemble de données représentatif, et que les proportions d'encaissements `basic`, `enterprise`, et `premium` sont réalistes :

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="Nombre dʼopérations dʼencaissement par niveau, analyses qui excluent les données basées sur un échantillonnage de diversité" style="width:80%;" >}}

D'autre part, si vous souhaitez mesurer le nombre de marchands uniques par niveau de marchand, **incluez l'ensemble de données d'échantillonnage de diversité** qui peut capturer des ID de marchands supplémentaires qui n'ont pas été pris en compte par les filtres de rétention personnalisés :

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="Nombre de marchands uniques par niveau. Analyses qui incluent les données basées sur un échantillonnage de diversité" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /fr/tracing/trace_pipeline/trace_retention