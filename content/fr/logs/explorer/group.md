---
aliases:
- /fr/logs/explorer/group
- /fr/logs/group
description: Regroupez des logs interrogés au sein d'entités de plus haut niveau afin
  de déduire ou de consolider des informations.
further_reading:
- link: logs/explorer/search
  tag: Documentation
  text: Filtrer les logs
- link: logs/explorer/visualize
  tag: Documentation
  text: Créer des visualisations à partir de logs
- link: /logs/explorer/export
  tag: Documentation
  text: Parcourir les vues du Log Explorer
kind: documentation
title: Regrouper des logs
---

## Présentation

Si certains logs peuvent s'avérer intéressants lorsqu'ils sont étudiés individuellement, il est parfois nécessaire de consulter un groupe entier d'événements pour faire émerger des informations utiles. Afin d'exposer ces informations, vous pouvez regrouper vos logs par [champ](#champs), identifier des [patterns](#patterns) ou agréger vos logs au sein de [transactions](#transactions).

L'éditeur de requête de logs vous permet de modifier rapidement l'agrégation appliquée à vos logs interrogés. Lorsque vous basculez vers une autre visualisation et un autre type d'agrégation, les champs que vous avez sélectionnés pour regrouper, agréger et mesurer vos logs sont conservés.

{{< img src="logs/explorer/aggregations.jpg" alt="Un graphique à barres représentant des logs et l'option permettant de regrouper des logs dans des champs, patterns et transactions" style="width:100%;" >}}

Ajoutez [plusieurs requêtes](#plusieurs-requetes) afin d'analyser simultanément différents ensembles de logs, et appliquez des [formules](#formules) et des [fonctions](#fonctions) à vos requêtes pour approfondir vos analyses.

**Remarque** : les agrégations sont uniquement prises en charge pour les **logs indexés**. Si vous souhaitez agréger des logs qui n'ont pas été indexés, vous pouvez [désactiver temporairement vos filtres d'exclusion][1], [générer des métriques à partir de vos logs][2] ou procéder à une [réintégration][3] de logs à partir de vos archives.

## Champs

Avec l'agrégation en fonction des champs, tous les logs correspondant à votre filtre sont agrégés sous forme de groupes en fonction de la valeur d'une ou plusieurs facettes de log. Ces agrégations vous permettent d'extraire les mesures suivantes :

- Le **nombre de logs** par groupe
- Le **nombre de valeurs uniques** pour une facette par groupe
- Les **opérations statistiques** (`min`, `max`, `avg` et `percentiles`) effectuées sur les valeurs numériques d'une facette par groupe

**Remarque** : si un log individuel présente plusieurs valeurs différentes pour une facette unique, il appartient à autant de groupes qu'il existe de valeurs. Par exemple, si un log possède à la fois les tags `team:sre` et `team:marketplace`, il est comptabilisé une fois dans le groupe `team:sre` et une fois dans le groupe `team:marketplace`.

L'agrégation en fonction des champs vous permet de définir une dimension pour les [top lists][4] et jusqu'à trois dimensions pour les [séries temporelles][5] et les [tableaux][6]. Lorsque plusieurs dimensions sont définies, les valeurs les plus élevées sont déterminées en fonction de la première dimension, puis de la seconde dans la fourchette des valeurs les plus élevées de la première dimension, puis de la troisième dans la fourchette des valeurs les plus élevées de la seconde dimension.

### Plusieurs requêtes

Vous pouvez utiliser plusieurs requêtes à la fois avec les [séries temporelles][5] et les [Top Lists][4]. Pour ajouter plusieurs requêtes, cliquez sur le bouton `+ Add` en regard de l'éditeur de requêtes. Lorsque vous ajoutez une nouvelle requête, elle copie la valeur et les options de regroupement de la dernière requête définie :

{{< img src="logs/explorer/group/add_multiple_queries.mp4" alt="Un utilisateur ajoutant plusieurs requêtes dans l'éditeur de requête" video=true style="width:100%;" >}}

Pour afficher ou masquer des requêtes dans la visualisation actuelle, cliquez sur leur lettre dans l'éditeur de requête :

{{< img src="logs/explorer/group/select_multiple_queries.jpg" alt="L'éditeur de requête avec deux requêtes, A et B" style="width:100%;" >}}

Par défaut, lorsque vous créez une requête, elle est automatiquement affichée dans la visualisation sélectionnée.

Pour afficher la chronologie de l'une de vos requêtes, sélectionnez la requête en question dans la liste déroulante `Timeline for`. Pour appliquer un filtre basé sur l'une de vos requêtes de recherche, sélectionnez la requête en question dans la liste déroulante `Use facets with`, puis cliquez sur les valeurs dans le [volet des facettes][7]. Les facettes que vous choisissez sont uniquement appliquées à la requête sélectionnée.

{{< img src="logs/explorer/group/query_selector.jpg" alt="L'éditeur de requête affichant la chronologie pour les données sélectionnées, avec des options pour la requête A et la requête B" style="width:100%;" >}}

### Fonctions

**Remarque** : seules les [séries temporelles][5] et les [Top Lists][4] prennent en charge les fonctions.

Pour appliquer des fonctions à vos logs, cliquez sur l'agrégation `Fields` dans l'éditeur de requête. Vous pouvez également sélectionner un champ à facette auquel vous souhaitez appliquer une fonction, puis cliquer sur l'icône `Σ` en regard de la mesure. Sélectionnez ou recherchez ensuite la fonction que vous souhaitez appliquer au champ de log.

{{< img src="logs/explorer/group/add_function.mp4" alt="Un utilisateur personnalisant une fonction à l'aide de l'éditeur de requête" video=true style="width:100%;" >}}

Toutes les fonctions proposées pour les logs dans l'éditeur graphique des dashboards sont également disponibles dans le Log Explorer :

- [Opérations arithmétiques][8]
- [Interpolation][9]
- [Décalage temporel][10]
- [Taux][11]
- [Lissage][12]
- [Cumul][13]
- [Exclusion][14]

Dans l'exemple ci-dessous, une [fonction d'exclusion][14] est appliquée afin d'exclure certaines valeurs de vos logs :

{{< img src="logs/explorer/group/exclusion_function_logs.jpg" alt="Une requête pour laquelle le paramètre cutoff_min du filtre d'exclusion a été défini sur 100" style="width:100%;" >}}

### Formules

Cliquez sur le bouton `+ Add` dans l'éditeur de requête pour appliquer une formule à une ou plusieurs requêtes. La formule de l'exemple suivant permet de calculer le taux de valeurs uniques de `Cart Id` dans les logs pour les clients dont le niveau est `Merchant Tier: Enterprise` / `Merchant Tier: Premium` :

{{< img src="logs/explorer/group/multiple_query_formula.jpg" alt="L'éditeur de requête avec une formule divisant la requête A par la requête B" style="width:100%;" >}}

**Remarque** : pour appliquer des formules à plusieurs requêtes, toutes les requêtes doivent être regroupées en fonction de la même facette. Dans l'exemple ci-dessus, les deux requêtes sont regroupées en fonction de `Webstore Store Name`.

Pour appliquer une fonction à une formule, cliquez sur l'icône `Σ`. Dans l'exemple suivant, une [fonction de décalage temporel][10] est appliquée à la proportion de logs d'erreur parmi l'ensemble des logs, afin de comparer les dernières données avec celles de la semaine précédente :

{{< img src="logs/explorer/group/timeshift_function_logs.jpg" alt="L'éditeur de requête avec une formule utilisant un décalage temporel sur la semaine précédente" style="width:100%;" >}}

## Patterns

L'agrégation en fonction des patterns vous permet de regrouper les logs dont le `message` possède une structure similaire. Vous avez la possibilité de sélectionner un à trois champs à facette pour effectuer une première agrégation de vos logs dans des groupes, avant que les patterns ne soient détectés dans ces groupes.

Grâce à la vue Patterns, vous pouvez identifier et filtrer facilement les patterns d'erreur inutiles qui vous empêchent de repérer les problèmes plus importants :

{{< img src="logs/explorer/aggregations_patterns.png" alt="Le Log Explorer avec des logs regroupés en fonction de patterns" style="width:80%;" >}}

**Remarque** : les patterns présentés sont ceux détectés au sein d'un volume de 10 000 logs. Affinez la recherche pour afficher les modèles correspondants à un sous-ensemble de logs spécifiques.

Les patterns prennent en charge les visualisations sous forme de [liste de groupes][15]. Cliquez sur un pattern dans la liste pour ouvrir le volet latéral dédié et effectuer les actions suivantes :

- Accéder à un échantillon de logs associés à ce pattern
- Renseigner le filtre de recherche pour affiner le contexte et afficher uniquement les logs associés à ce pattern
- Créer facilement une [règle de parsing grok][3] pour extraire des informations structurées à partir des logs associés à ce pattern

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="Le volet latéral avec le bouton View All et la règle de parsing mis en avant" style="width:80%;" >}}

## Transactions

Les transactions agrègent les logs indexés en fonction d'instances d'une **séquence** d'événements, telle qu'une session utilisateur ou une requête traitée par plusieurs micro-services. Par exemple, un site d'e-commerce peut regrouper des logs en fonction de différentes actions utilisateur (recherche dans le catalogue, ajout d'un article au panier ou paiement) afin de générer une vue de transaction basée sur un attribut commun, tel que `requestId` ou `orderId`.

{{< img src="logs/explorer/aggregations_transactions.jpg" alt="Le Log Explorer avec des logs regroupés en fonction de transactions" style="width:80%;" >}}

**Remarque** : les agrégations sous forme de transactions diffèrent des agrégations sous forme de groupes classiques, dans la mesure où les groupes obtenus comprennent non seulement les logs correspondant à la requête, mais aussi les logs appartenant aux transactions associées.

- **Durée :** l'écart entre le timestamp du premier log et celui du dernier log dans la transaction. _Cette mesure est automatiquement ajoutée_.
- **Gravité maximale** identifiée dans les logs de la transaction. _Cette mesure est automatiquement ajoutée_.
- **Recherche d'éléments clés :** pour chaque `facet` ayant comme valeurs des chaînes, vous pouvez calculer des informations sur des logs spécifiques à l'aide des opérations `count unique`, `latest`, `earliest` et `most frequent`.
- **Consultation de statistiques :** pour chaque `measure`, vous pouvez calculer des statistiques à l'aide des opérations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95` et `pc99`.

Les transactions prennent en charge les visualisations sous forme de [liste de groupes][15]. Cliquez sur une transaction dans la liste pour ouvrir le volet latéral dédié et effectuer les actions suivantes :

- Accéder à tous les logs associés à cette transaction
- Rechercher des logs spécifiques associés à cette transaction

{{< img src="logs/explorer/transactions_side_panel.png" alt="Le volet des logs de transaction avec des logs pour la transaction sélectionnée" style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/custom_time_frames
[2]: /fr/logs/logs_to_metrics
[3]: /fr/logs/log_configuration/processors/#grok-parser
[4]: /fr/logs/explorer/visualize/#top-list
[5]: /fr/logs/explorer/visualize/#timeseries
[6]: /fr/logs/explorer/visualize/#nested-tables
[7]: /fr/logs/explorer/facets/#facet-panel
[8]: /fr/dashboards/functions/arithmetic
[9]: /fr/dashboards/functions/interpolation
[10]: /fr/dashboards/functions/timeshift
[11]: /fr/dashboards/functions/rate
[12]: /fr/dashboards/functions/smoothing
[13]: /fr/dashboards/functions/rollup
[14]: /fr/dashboards/functions/exclusion
[15]: /fr/logs/explorer/visualize/#list-aggregates-of-logs