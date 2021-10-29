---
title: Prise en main de la solution Metrics without Limits™
kind: guide
is_beta: true
---
<div class="alert alert-warning">Cette fonctionnalité est en bêta privée.</div>

## Présentation

Ce guide vous explique comment prendre en main Metrics without Limits™ et comment tirer rapidement et pleinement profit de cette fonctionnalité.

1. Consultez la [FAQ sur Metrics without Limits™][1].

2. Si vous souhaitez vous servir de l'API de création de configuration de tags, utilisez d'abord l'[API d'estimation de la cardinalité des configurations de tags][2] pour vérifier l'incidence potentielle de vos configurations de tags avant de les créer.

   Si l'interface ou l'API d'estimation renvoie un nombre de métriques indexées [supérieur au nombre de métriques ingérées](pourquoi-le-volume-indexé-est-il-supérieur-au-volume-ingéré), n'enregistrez pas votre configuration de tags.

3. Configurez vos 20 principales métriques sur la page Usage ou avec l'[API][3].

   Vous pouvez utiliser des configurations groupées de métriques (avec la syntaxe `*`) pour configurer rapidement des tags sur plusieurs métriques.

   {{< img src="metrics/guide/bulk-tag-configuration.gif" alt="Application d'une configuration groupée de tags"  style="width:80%;" >}}

   Datadog vous prévient lorsque la tâche de configuration groupée est terminée.

### Autres conseils

Vous pouvez configurer des alertes sur votre métrique d'[utilisation estimée des métriques custom][4] afin de pouvoir corréler les pics d'utilisation avec des configurations.


Vous pouvez également utiliser des [autorisations RBAC][5] pour Metrics without Limits™ afin de contrôler les utilisateurs pouvant accéder à cette fonctionnalité (et ainsi réduire vos coûts).


Les événements d'audit vous permettent de surveiller n'importe quelle configuration de tags ou agrégation par centile appliquée pouvant potentiellement être corrélée avec les pics de métriques custom. Recherchez les termes « configuration de tags interrogeables » ou « agrégations par centile ».

### Pourquoi le volume indexé est-il supérieur au volume ingéré ?

Il ne s'agit pas d'une erreur : votre suggestion actuelle de configuration de tags ne réduit pas suffisamment la cardinalité de la métrique, et ne compense pas suffisamment les caractéristiques intrinsèques de Metrics without Limits™.

* Lorsque une métrique count, gauge ou rate n'est **pas configurée** avec Metrics without Limits™, Datadog peut filtrer et agréger les données brutes pertinentes au moment de la requête, afin de vous renvoyer des résultats mathématiquement corrects.


* Lorsqu'une métrique count, gauge ou rate **est configurée** avec Metrics without Limits™ à l'aide d'une configuration de tags spécifique, les données brutes d'origine doivent être recombinées et agrégées avant la requête, afin de préserver l'exactitude des résultats et des valeurs de la requête.

Pour cette raison, Datadog stocke six différentes agrégations temporelles/spatiales (indiquées ci-dessous par des coches) pour chaque combinaison de valeurs de tag restante définie par votre configuration de tags. Consultez la section sur l'[anatomie d'une métrique][6] pour découvrir le fonctionnement des agrégations temporelles et spatiales.
  |           | MOY temporelle  | SOMME temporelle  | MIN temporel  | MAX temporel  |
  |-----------|-----------|-----------|-----------|-----------|
  | MOY spatiale | {{< X >}} | {{< X >}} |           |           |
  | SOMME spatiale | {{< X >}} | {{< X >}} |           |           |
  | MIN spatial | {{< X >}} |           |           |           |
  | MAX spatial | {{< X >}} |           |           |           |

  Si aucune coche n'est indiquée pour la combinaison que vous devez utiliser pour votre requête, il est recommandé de ne pas configurer votre métrique avec Metrics without Limits™.

Vous pouvez donc avoir un volume de métriques custom indexées supérieur au volume de métriques custom ingérées si la combinaison de tags fournie ne réduit pas suffisamment le nombre de combinaisons de valeurs de tag restantes et ne compense pas le facteur multiplicateur de 6.

Voici un exemple simplifié décrivant comment il est possible d'obtenir un volume de métriques indexées supérieur au volume de métriques ingérées, avec quatre combinaisons de valeurs de tag sur une métrique gauge (ou, en d'autres termes, **quatre métriques custom**) :

{{< img src="metrics/guide/before-mwl.jpg" alt="Organigramme avec quatre métriques custom provenant de deux hosts"  style="width:80%;" >}}

Si vous utilisez Metrics without Limits™ avec une configuration sur  `{endpoint, status}` :

{{< img src="metrics/guide/after-mwl.jpg" alt="Organigramme avec les hosts couverts d'une croix"  style="width:80%;" >}}

Sans les hosts, il reste trois combinaisons de tags :

1. `{endpoint:x, status:200}`
2. `{endpoint:x, status:400}`
3. `{endpoint:y, status:200}`

Toutefois, pour chacune de ces combinaisons, Metrics without Limits™ stocke six valeurs préagrégées. Vous obtenez donc un **total de 18 métriques custom**. Ainsi, le nombre de métriques est inférieur à celui obtenu sans cette configuration.


[1]: /fr/metrics/faq/metrics-without-limits/
[2]: /fr/metrics/guide/tag-configuration-cardinality-estimation-tool/
[3]: /fr/api/latest/metrics/#create-a-tag-configuration
[4]: /fr/account_management/billing/usage_metrics/
[5]: /fr/account_management/rbac/permissions/?tab=ui#metrics
[6]: /fr/metrics/#time-and-space-aggregation