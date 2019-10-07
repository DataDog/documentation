---
title: Index
kind: documentation
description: Contrôler le volume de logs indexés par Datadog
disable_toc: true
aliases:
  - /fr/logs/dynamic_volume_control
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: 'https://www.datadoghq.com/blog/logging-without-limits/'
    tag: Blog
    text: Logging without Limits*
---
Les index se trouvent sur la [page Configuration][1], dans la section Indexes. Cliquez deux fois sur les index ou sur le bouton *edit* pour obtenir plus d'informations concernant le nombre de logs indexés au cours des trois derniers jours, ainsi que la période de rétention de ces logs :

{{< img src="logs/indexes/index_details.png" alt="détails des index" responsive="true" style="width:70%;">}}

Vous pouvez utiliser des logs indexés pour la [recherche à facettes][2], l'[analyse de logs][3], la [création de dashboards][4] et la [surveillance][5].


## Filtres d'exclusion

Les filtres d'index vous permettent de contrôler de façon dynamique les éléments ajoutés à vos index.

Par exemple, si certains logs ont été capturés à des seules fins de dépannage (Troubleshooting), vous aurez peut-être uniquement besoin d'indexer les logs qui contiennent des erreurs et des avertissements. Pour ce faire, il vous suffit d'utiliser des filtres d'exclusion.

Pour définir un nouveau filtre d'index, cliquez sur le bouton d'ajout :**

{{< img src="logs/indexes/index_filters.png" alt="filtres d'index" responsive="true" style="width:70%;">}}

Pour configurer un filtre d'exclusion :

1. Définissez le nom de votre filtre.
2. Définissez la requête correspondant aux logs à exclure de votre index.
    **Remarque** : il est possible d'utiliser tous les attributs ou tags dans la requête de filtre d'index, même ceux qui ne sont pas des facettes. Si vous appliquez un filtre à partir de tags ou d'attributs sans facette, n'oubliez pas d'appuyer sur la touche Entrée depuis la barre de requête.
3. Définissez le taux d'échantillonnage.
4. Enregistrez le filtre.

    {{< img src="logs/indexes/index_filter_details.png" alt="détails du filtre d'index" responsive="true" style="width:80%;">}}

**Remarque** : si un log correspond à plusieurs filtres d'exclusion, seule la règle du premier filtre d'exclusion est appliquée. Un log ne peut pas être échantillonné ou exclu plusieurs fois par différents filtres d'exclusion. 

### Réorganiser les filtres

L'ordre des filtres d'exclusion rentre en considération. Contrairement à la façon dont plusieurs pipelines peuvent traiter un log, si un log correspond à plusieurs filtres d'exclusion, seule la règle du premier filtre d'exclusion est appliquée.

Réorganisez votre pipeline pour vous assurer que les filtres d'exclusion appropriés s'appliquent à votre log. Par exemple, il est recommandé de configurer les filtres en organisant les requêtes de sorte qu'elles apparaissent des moins inclusives au plus inclusives.

Pour réorganiser votre filtre d'exclusion, faites-le glisser et déposez-le dans l'ordre de votre choix.

{{< img src="logs/indexes/reorder_index_filters.png" alt="réorganiser les filtres d'index" responsive="true" style="width:80%;">}}

### Activer/désactiver des filtres

Même si les logs ne nécessitent pas tous une indexation journalière, ils peuvent parfois s'avérer pertinents dans certaines situations.
Les logs de débogage, par exemple, ne sont pas toujours utiles, mais ils peuvent devenir indispensables durant un processus de dépannage complexe ou lors du lancement d'une nouvelle version de production.

Au lieu de modifier le niveau de journalisation de votre application ou d'utiliser un outil de filtrage interne complexe, vous pouvez modifier les éléments indexés directement avec les filtres d'index de Datadog.

Vous pouvez les activer ou les désactiver en un seul clic depuis la page Pipelines :

{{< img src="logs/indexes/enable_index_filters.png" alt="activer les filtres d'index" responsive="true" style="width:80%;">}}

## Plusieurs index

Il est également possible de configurer plusieurs index avec différentes périodes de rétention (**fonctionnalité disponible en version bêta privée**).
Les logs entrent dans le premier index qui correspond à leur filtre. Il est donc important d'organiser minutieusement vos index.

Par exemple, si vous créez un premier index filtré sur l'attribut `status:notice`, un deuxième index filtré sur l'attribut `status:error` et un dernier index sans filtre (l'équivalent de `*`), tous vos logs de notifications seront envoyés vers le premier index, tous vos logs d'erreur iront dans le deuxième index et tout le reste ira dans le dernier.

{{< img src="logs/indexes/multi_index.png" alt="Plusieurs index" responsive="true" style="width:70%;">}}

Plusieurs index permettent également de définir des règles d'accès pour les données contenues dans chaque index. [Vous trouverez plus d'informations dans la documentation relative au contrôle d'accès à base de rôle][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /fr/logs/explorer/?tab=facets#setup
[3]: /fr/logs/explorer/analytics
[4]: /fr/logs/explorer/analytics/#dashboard
[5]: /fr/monitors/monitor_types/log
[6]: /fr/account_management/rbac