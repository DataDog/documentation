---
title: Collecte illimitée de logs
kind: documentation
description: Contrôler le volume de logs indexés par Datadog
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
    text: Collecte illimitée de logs
---
## Présentation

Le nombre d'événements de log générés par votre infrastructure est parfois trop élevé ou trop fluctuant, ce qui est source de problèmes. Quels logs devez-vous envoyer à votre solution Log Management ? Quels logs devez-vous envoyer à une archive ? Malheureusement, le filtrage de vos logs avant leur envoi empêche inévitablement un traitement exhaustif des logs, et certaines données précieuses sont souvent ignorées.

La solution Log Management de Datadog met fin à ces problèmes en séparant le processus d'ingestion des logs du processus d'indexation, vous permettant ainsi de recueillir, de traiter et d'archiver tous vos logs de façon rentable.
Les filtres d'index de Datadog simplifient grandement la configuration de l'Agent et vous permettent de contrôler de façon dynamique le contenu indexé.
Vous pouvez dorénavant :

* Ingérer tous vos événements de log sans filtrage côté serveur
* [Traiter l'ensemble de vos logs tout en les étoffant][1]
* [Procéder à un Live Tailing sur l'ensemble de l'infrastructure][2]
* Déterminer de façon dynamique les éléments à inclure et à exclure de vos index afin de maîtriser vos coûts
* [Recevoir des alertes en cas d'augmentation imprévue des volumes dans un index][3]
* [Archiver tous vos logs enrichis][4]

Cette flexibilité est essentielle dans certaines situations exceptionnelles. Par exemple, en cas de panne, vous pouvez désactiver des filtres spécifiques pour envoyer davantage de données. Certaines situations inverses s'appliquent également. Si vous enregistrez une consommation excessive pour des raisons saisonnières (1er jour des soldes, Noël, etc.), vous pouvez choisir de réduire de manière sélective certains volumes pour éviter les surplus.

## Détails des index

Les index se trouvent sur la [page des pipelines][5], dans la section Indexes. Cliquez deux fois sur les index ou sur le bouton *edit* pour obtenir plus d'informations concernant le nombre de logs indexés au cours des trois derniers jours, ainsi que la période de rétention de ces logs :

{{< img src="logs/logging_without_limits/index_details.png" alt="" responsive="true" style="width:70%;">}}

Les logs indexés peuvent être utilisés pour la [recherche à facettes][6], l’[analyse de logs][7], la [création de dashboards][8] et la [surveillance][9].

Il est également possible de configurer plusieurs index avec différentes périodes de rétention (**fonctionnalité disponible dans la version bêta privée**).
Les logs entrent dans le premier index qui correspond à leur filtre. Il est donc important d'organiser minutieusement vos index.

Par exemple, si vous créez un premier index filtré sur l'attribut `status:notice`, un deuxième index filtré sur l'attribut `status:error` et un dernier index sans filtre (l'équivalent de `*`), tous vos logs de notifications seront envoyés vers le premier index, tous vos logs d'erreur iront dans le deuxième index et tout le reste ira dans le dernier.

{{< img src="logs/logging_without_limits/multi_indexes.png" alt="" responsive="true" style="width:70%;">}}

Plusieurs index permettent également de définir des règles d'accès pour les données contenues dans chaque index. [Vous trouverez plus d'informations dans la documentation relative au contrôle d'accès à base de rôle][10].

## Configurez des log monitors sur les volumes

Recevez une notification dès que les volumes de votre infrastructure grandissent de manière imprévue, peu importe leur contexte(`service`, `availibility-zone`, etc…) :

1. Accédez à la vue [Log Explorer de Datadog][11].
2. Créez une [requête de recherche][12] qui correspond au volume à surveiller.
3. Cliquez sur **Export to monitor**.
4. Déterminez le taux de votre choix pour un *warning* ou une *error*.
5. Indiquez une notification explicite : `Le volume de ce service vient d'atteindre un niveau trop élevé. Définissez un filtre d'exclusion supplémentaire ou augmentez le taux d'échantillonnage pour revenir à des valeurs normales.`

{{< img src="logs/logging_without_limits/example_notification.png" alt="" responsive="true" style="width:70%;">}}

## Filtres d'exclusion

Les filtres d'index vous permettent de contrôler de façon dynamique le contenu ajouté à vos index.

Par exemple, si certains logs ont été enregistrés aux seules fins de dépannage, vous souhaitez peut-être indexer uniquement les logs générant des erreurs et des avertissements. Pour ce faire, il vous suffit d'utiliser les filtres d'exclusion.

Pour définir un nouveau filtre d'index, cliquez sur le bouton d'ajout :**

{{< img src="logs/logging_without_limits/index_filters.png" alt="" responsive="true" style="width:70%;">}}

Pour configurer un filtre d'exclusion :

1. Définissez le nom de votre filtre.
2. Définissez la requête correspondant aux logs à exclure de votre index.
    **Remarque** : il est possible d'utiliser tous les attributs ou tags dans la requête de filtre d'index, même ceux qui ne sont pas des facettes. Si vous appliquez un filtre à partir de tags ou d'attributs sans facette, n'oubliez pas d'appuyer sur la touche Entrée depuis la barre de requête.
3. Définissez le taux d'échantillonnage.
4. Enregistrez le filtre.

    {{< img src="logs/logging_without_limits/index_filter_details.png" alt="" responsive="true" style="width:80%;">}}

**Remarque** : si un log correspond à plusieurs filtres d'exclusion, seule la règle du premier filtre d'exclusion est appliquée. Un log ne peut pas être échantillonné ou exclu plusieurs fois par différents filtres d'exclusion. 

### Exemple

Le filtre suivant élimine tous les logs ayant un temps de réponse rapide.
Nous utilisons l'attribut `duration` et filtrons tous les logs qui présentent une valeur inférieure à *100 ms*.

```json
{
    "http": {
        "url": "https://app.datadoghq.com/logs",
        "status_code": "200"
    },
    "duration":12,
    "metadata": {
        "version": 12,
        "release": "sept18"
    }
}
```

**Filtre** : `@duration:<100`

### Exemple de conteneur

Les logs de conteneur comportent de nombreuses métadonnées recueillies sous forme de tags. Pour exclure tous les logs provenant d'images qui contiennent `httpd` dans le tag `image_name`, utilisez le filtre suivant :

**Filtre** : `image_name:*httpd*`

## Réorganiser les filtres

L'ordre des filtres d'exclusion rentre en considération. Contrairement au fait que plusieurs pipelines peuvent traiter un log, si un log correspond à plusieurs filtres d'exclusion, seule la règle du premier filtre d'exclusion est appliquée.

Réorganisez votre pipeline pour vous assurer que les filtres d'exclusion appropriés s'appliquent à votre log. Par exemple, il est recommandé de configurer les filtres avec les requêtes les plus inclusives après les autres filtres.

Pour réorganiser votre filtre d'exclusion, faites-le glisser et déposez-le dans l'ordre de votre choix.


{{< img src="logs/logging_without_limits/reorder_index_filters.png" alt="" responsive="true" style="width:80%;">}}


## Activer/désactiver des filtres

Même si les logs ne nécessitent pas tous une indexation journalière, ils peuvent parfois s'avérer pertinents dans certaines situations.
Les logs de débogage, par exemple, ne sont pas toujours utiles, mais ils peuvent devenir indispensables durant un processus de dépannage complexe ou lors du lancement d'une nouvelle version de production pour mieux comprendre ce qui se passe.

Au lieu de modifier le niveau de journalisation de votre application ou d'utiliser un outil de filtrage interne complexe, il est désormais possible de spécifier les éléments indexés directement avec les filtres d'index de Datadog.

Vous pouvez les activer ou les désactiver en un seul clic depuis la page Pipelines :

{{< img src="logs/logging_without_limits/enable_index_filters.png" alt="" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing
[2]: /fr/logs/live_tail
[3]: /fr/monitors/monitor_types/log
[4]: /fr/logs/archives
[5]: https://app.datadoghq.com/logs/pipelines/indexes
[6]: /fr/logs/explorer/?tab=facets#setup
[7]: /fr/logs/explorer/analytics
[8]: /fr/logs/explorer/analytics/#dashboard
[9]: /fr/monitors/monitor_types/log
[10]: /fr/account_management/rbac
[11]: https://app.datadoghq.com/logs
[12]: /fr/logs/explorer/search