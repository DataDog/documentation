---
description: Allouez des coûts liés au cloud en fonction de règles d'allocation personnalisées.
further_reading:
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentation
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons mis en place une pratique FinOps efficace chez Datadog
    (en anglais)
title: Règles d'allocation personnalisées
---

## Présentation

Les règles d'allocation personnalisées vous permettent de diviser des coûts partagés et de les allouer à différents tags disponibles, telles que les équipes, les projets ou les environnements, afin de garantir la précision des rétroanalyses et rétrofacturations.

Les méthodes d'allocation suivantes sont disponibles :

 | Méthode d'allocation | Description | Scénario d'utilisation | Exemple |
 | ----------------  | ----------- | -------- | --------|
 | Allocation égale  | Les coûts sont répartis également entre toutes les destinations. | Situations dans lesquelles un montant identique doit être facturé à chaque équipe, projet ou environnement pour un coût partagé. | Les coûts d'assistance sans tag sont alloués de manière égale entre les équipes `teamA`, `teamB` et `teamC`. |
 | Allocation personnalisée  | Les coûts sont répartis entre chaque destination en fonction des pourcentages que vous définissez. | Situations dans lesquelles des règles ou contrats commerciaux stipulent le montant que chaque équipe doit payer. | Les coûts d'assistance sans tag sont alloués à 60 % à l'équipe `teamA`, à 30 % à l'équipe `teamB` et à 10 % à l'équipe `teamC`. |
 | Allocation proportionnelle aux dépenses | Les coûts sont répartis proportionnellement en fonction des dépenses de chaque destination. | Situations dans lesquelles le montant que les équipes doivent payer est proportionnel à leurs dépenses réelles. | Les coûts d'assistance sans tag sont alloués aux équipes `teamA`, `teamB` et `teamC` en fonction de la proportion de leurs dépenses par rapport aux dépenses totales Amazon EC2.|
 | Allocation dynamique par métrique  | Les coûts sont répartis proportionnellement en fonction de l'utilisation de chaque destination. | Situations dans lesquelles les équipes doivent payer proportionnellement à leur utilisation réelle. | Les coûts partagés liés à PostgreSQL sont alloués en fonction du temps total d'exécution des requêtes par équipe. |

Les règles d'allocation personnalisées sont exécutées après les [pipelines de tags][1], ce qui permet d'allouer les coûts en fonction des derniers tags définis par l'utilisateur. Les coûts sont alloués quotidiennement. Les allocations de coûts peuvent être appliquées aux coûts AWS, Google Cloud et Azure.

## Créer une règle d'allocation personnalisée

### Étape 1 : Définir la source

1. Accédez à [Cloud Cost > Settings > Custom Allocation Rules][2], puis cliquez sur **Add New Rule** pour commencer.
2. Dans la liste déroulante, sélectionnez les coûts partagés que vous souhaitez allouer.

   _Exemple : Coûts d'assistance sans tag ou coûts de bases de données partagées

### Étape 2 : Choisir une méthode d'allocation

Vous trouverez ci-dessous une description du fonctionnement de chaque méthode d'allocation, ainsi que des exemples.

{{< tabs >}}

{{% tab "Allocation égale" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagramme illustrant la stratégie de répartition égale" style="width:70%;" >}}

Avec la stratégie égale, les coûts sont répartis de manière égale entre vos tags de destination. [Appliquez un filtre](#etape-4-appliquer-des-filtres-facultatif) pour spécifier les éléments de facturation qui détermine les proportions.

{{< img src="cloud_cost/custom_allocation_rules/ui-even.png" alt="La stratégie de répartition égale dans Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Allocation avec un pourcentage personnalisé" %}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagramme illustrant la stratégie de répartition égale" style="width:70%;" >}}

Avec cette stratégie, vous pouvez définir des pourcentages fixes personnalisés pour les tags de destination que vous sélectionnez. Par exemple, si vous avez 3 destinations (`teamA`, `teamB`, `teamC`), vous pouvez allouer 60 % à `teamA`, 30 % à `teamB` et 10 % à `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/ui-custom.png" alt="La stratégie de répartition égale dans Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Allocation proportionnelle" %}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram-2.png" alt="Diagramme illustrant la stratégie de répartition proportionnelle" style="width:70%;" >}}

Les coûts sont alloués en fonction des dépenses proportionnelles des destinations. Comme pour l'allocation égale, vous pouvez personnaliser votre répartition en définissant des filtres et des partitions.

Dans le diagramme ci-dessus, la barre rose représente un filtre appliqué à l'allocation des coûts. Grâce à ce filtre, les frais d'assistance EC2 sont répartis entre les équipes _en fonction de leur part respective dans les dépenses EC2 globales_.

Pour créer une règle pour cette allocation, vous pouvez procéder comme suit :

- Définissez les coûts à allouer (source) : les **frais d'assistance EC2** (`aws_product:support`).
- Choisissez la méthode d'allocation : **Proportional by spend**.
- Choisissez le [tag de destination](#etape-3-definir-la-destination) à partir duquel les coûts seront répartis : **User** (`User A`, `User B`, `User C`).
- Ajustez l'allocation en appliquant des [filtres](#etape-4-appliquer-des-filtres-facultatif) : **EC2** (`aws_product:ec2`).
- Créer des sous-allocations en [partitionnant](#etape-5-appliquer-une-partition-facultatif) la règle d'allocation : **environment** (`env`).

Vous pouvez également spécifier comment partitionner les parts de coût, afin de mettre en place des allocations propres aux segments. Par exemple, si vous partitionnez vos coûts par environnement à l'aide de tags comme `staging` et `production`, les parts sont calculées séparément pour chaque environnement. Cela permet de s'assurer que les allocations reposent sur les parts spécifiques de chaque partition.

{{< img src="cloud_cost/custom_allocation_rules/ui-proportional-by-spend.png" alt="La stratégie de répartition proportionnelle dans Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Allocation dynamique par métrique" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagramme illustrant la stratégie dynamique par métrique" style="width:70%;" >}}

L'allocation basée sur les métriques permet de répartir les coûts en fonction de [requêtes de métrique][1] Datadog. Lorsque vous utilisez des métriques de performance pour allouer vos dépenses, vos coûts sont alloués de façon plus précise en fonction des tendances d'utilisation de votre application.

Par exemple, la requête de métrique PostgreSQL `sum:postgresql.queries.time{*} by {user}.as_count()` mesure le temps total d'exécution des requêtes par utilisateur. Les valeurs relatives servent ensuite à déterminer la part des coûts PostgreSQL totaux à allouer à chaque utilisateur.

Pour créer une règle pour cette allocation, vous pouvez procéder comme suit :

- Définissez les coûts à allouer (source) : **coûts PostgreSQL** (`azure_product_family:dbforpostgresql`).
- Choisissez la méthode d'allocation : **Dynamic by metric**.
- Choisissez le [tag de destination](#etape-3-definir-la-destination) à partir duquel les coûts seront répartis : **User** (`User A`, `User B`, `User C`).
- Définissez la requête de métrique à utiliser pour répartir les coûts des sources : **temps d'exécution des requêtes par utilisateur** (`sum:postgresql.queries.time{*}` by `{user}.as_count`).
- Créez des sous-allocations en [partitionnant](#etape-5-appliquer-une-partition-facultatif) la règle d'allocation : **environment** (`env`).

{{< img src="cloud_cost/custom_allocation_rules/ui-dynamic-by-metric.png" alt="La stratégie de répartition dynamique par métrique dans Datadog" style="width:90%;" >}}

[1]: /fr/metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

### Étape 3 : Définir la destination

Choisissez les dimensions (comme `team`, `department` ou `service`) auxquelles les coûts doivent être alloués. Exemple :

Vous pouvez sélectionner plusieurs valeurs pour votre tag de destination. Par exemple, si vous sélectionnez le tag `team`, vous pouvez choisir des équipes spécifiques, comme `teamA`, `teamB` et `teamC`, auxquelles les coûts seront alloués.

### Étape 4 : Appliquer des filtres (facultatif)

Appliquez un filtre à l'ensemble de la règle d'allocation. Les filtres permettent à la règle d'allocation de cibler le sous-ensemble pertinent de vos dépenses liées au cloud.

_Exemple : Appliquer uniquement l'allocation des coûts aux environnements en production_

- **Allocation proportionnelle aux dépenses** : supposons que vous allouiez des coûts partagés au tag team, proportionnellement aux dépenses de chaque équipe. Vous pouvez ajouter un filtre afin de créer une allocation de coûts qui est proportionnelle aux dépenses de chaque équipe sur `aws_product` avec `ec2`.
- **Allocation dynamique par métrique** : imaginons que vous allouiez des coûts PostgreSQL partagés au tag service, proportionnellement au temps d'exécution des requêtes de chaque service. Vous pouvez ajouter un filtre afin de créer une allocation de coûts qui s'applique seulement lorsque `environment` est défini sur `production`.

### Étape 5 : Appliquer une partition (facultatif)

Le partitionnement vous permet de diviser une règle d'allocation unique en plusieurs sous-allocations. Par exemple, au lieu de créer des règles distinctes pour chaque environnement (production et staging, par exemple), vous pouvez créer une règle partitionnée par `environment`. Chaque sous-allocation partitionnée utilise la même structure d'allocation, mais ne s'applique qu'aux coûts correspondant à cette valeur de tag.

**Remarque** : pour l'allocation dynamique par métrique, le tag servant au partitionnement doit exister à la fois dans les données des coûts liés au cloud et dans les données des métriques.

{{< tabs >}}

{{% onglet "Allocation égale" %}}

Avec cette partition, la même règle d'allocation égale est appliquée à chaque environnement.

{{< img src="cloud_cost/custom_allocation_rules/even_partition_diagram.png" alt="Diagramme illustrant la stratégie de répartition égale avec un partitionnement" style="width:100%;" >}}

{{% /tab %}}

{{% onglet "Allocation proportionnelle" %}}

Avec cette partition, la même règle d'allocation proportionnelle est appliquée à chaque environnement.

{{< img src="cloud_cost/custom_allocation_rules/proportional_partition_diagram-2.png" alt="Diagramme illustrant la stratégie de répartition proportionnelle avec un partitionnement" style="width:100%;" >}}

{{% /tab %}}

{{% onglet "Allocation dynamique par métrique" %}}

Avec cette partition, la même règle d'allocation dynamique par métrique est appliquée à chaque environnement.

{{< img src="cloud_cost/custom_allocation_rules/dynamic_partition_diagram.png" alt="Diagramme illustrant la stratégie de répartition dynamique avec un partitionnement" style="width:100%;" >}}

{{% /tab %}}

{{< /tabs >}}

## Gestion des règles
Vous pouvez modifier et supprimer des règles depuis la [section Custom Allocation Rules][2] de la page des paramètres de Cloud Cost. Tous les champs, à l'exception du nom de la règle, peuvent être modifiés.

Lorsque vous supprimez une règle d'allocation personnalisée, l'allocation associée est automatiquement supprimée des données du mois en cours et du mois précédent, dans les 24 heures suivant l'opération. Pour supprimer des allocations pour des données plus anciennes, contactez l'[assistance Datadog][3] afin de demander un backfill.

Vous pouvez également désactiver une règle d'allocation personnalisée sans la supprimer.

Les règles sont appliquées dans l'ordre de la liste.

## Visualiser vos allocations
L'application des modifications apportées aux règles d'allocation personnalisées peut prendre jusqu'à 24 heures. Une fois les changements appliqués, vous pouvez consulter les nouvelles allocations dans la solution Cloud Cost Management. Les coûts alloués personnalisés comprennent également un tag `allocated_by_rule` qui spécifie le nom de la règle à l'origine de l'allocation.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations-1.png" alt="Visualiser vos allocations dans Datadog" style="width:90%;" >}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/tags/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
[3]: https://www.datadoghq.com/support/