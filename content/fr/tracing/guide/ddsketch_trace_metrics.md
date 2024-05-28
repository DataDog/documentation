---
aliases:
- /fr/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
  tag: Blog
  text: Calcul précis de centiles avec DDSketch
- link: https://docs.datadoghq.com/metrics/distributions/
  tag: Documentation
  text: En savoir plus sur les distributions
- link: https://docs.datadoghq.com/tracing/guide/metrics_namespace/
  tag: Documentation
  text: En savoir plus sur les métriques de trace
kind: guide
title: Métriques basées sur DDSketch dans APM
---

Datadog recueille automatiquement des métriques de trace pour vos services et ressources. Elles sont conservées pendant une durée de 15 mois. Les centiles de latence sont disponibles sous la forme de séries temporelles individuelles, mais peuvent également être représentées à l'aide d'une [métrique de distribution Datadog][1]. Au lieu de créer une métrique par centile, ainsi que des métriques distinctes pour les services, ressources ou deuxièmes tags primaires, Datadog propose une seule métrique simple à utiliser :

- `trace.<NOM_SPAN>` :
  - *Prérequis :* cette métrique est disponible pour tous les services APM.
  - *Description :* cette métrique représente les distributions de latence pour l'ensemble des services, ressources et versions ainsi que tous les environnements et deuxièmes tags primaires.
  - *Type de métrique :* [DISTRIBUTION][2]
  - *Tags :* `env`, `service`, `version`, `resource` et le [deuxième tag primaire][3].

Les pages APM Service et Resource exploitent automatiquement ce type de métrique pour générer des dashboards et monitors.

**Comment afficher l'historique complet de cette nouvelle métrique ?**
- Datadog intègre la requête existante associée à la nouvelle métrique à une requête équivalente basée sur des métriques de latence durables. Ainsi, vous n'avez pas besoin de créer plusieurs requêtes.

**Les valeurs liées à la latence ont changé. Pourquoi ?**
- Les métriques de distribution Datadog tirent profit de la technologie [DDSketch][4]. Au lieu de se baser sur des erreurs de rang, les garanties portent sur des erreurs relatives. Ainsi, toutes les valeurs estimées des centiles sont désormais plus proches de la valeur réelle.
- Ainsi, il est possible que vous constatiez une réduction des valeurs du 99e centile, qui est le plus concerné par ce changement. Les nouvelles valeurs sont désormais plus proches de la valeur réelle du 99e centile.
- Il convient de noter que les calculs de métriques d'APM ne sont pas identiques aux calculs effectués dans le code pour les métriques custom de distribution Datadog. En effet, le calcul s'effectue en backend, ce qui peut entraîner des écarts.

**J'utilise Terraform. Comment ce changement va-t-il m'affecter ?**
- Les métriques existantes sont toujours valides, et vos définitions Terraform restent en place et fonctionnelles.
- Pour profiter de la [précision améliorée][4] offerte par les nouvelles métriques basées sur DDSketch, modifiez vos définitions Terraform comme indiqué dans les examples suivants.

Centiles avant :
```
avg:trace.http.request.duration.by.resource_service.99p{service:foo, resource:abcdef1234}
avg:trace.sample_span.duration.by.datacenter_resource_service.75p{datacenter:production, service:bar, resource:ghijk5678}
```

Centiles après :
```
p99:trace.http.request{service:foo, resource:abcdef1234}
p75:trace.sample_span{datacenter:production, service:bar, resource:ghijk5678}
```

p100 (100e centile) avant :
```
avg:trace.http.request.duration.by.resource_service.100p{service:foo, resource:abcdef1234}
avg:trace.sample_span.duration.by.datacenter_resource_service.100p{datacenter:production, service:bar, resource:ghijk5678}
```
p100 (100e centile) après :
```
max:trace.http.request{service:foo, resource:abcdef1234}
max:trace.sample_span{datacenter:production, service:bar, resource:ghijk5678}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/distributions/
[2]: /fr/metrics/types/?tab=distribution#metric-types
[3]: /fr/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/