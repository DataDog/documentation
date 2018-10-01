---
title: Collecter des logs sans limites
kind: documentation
description: Contrôler le volume de logs indexés par Datadog
aliases:
  - /fr/logs/dynamic_volume_control
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Construire des analyses de log
  - link: logs/processing
    tag: Documentation
    text: Apprenez à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: 'https://www.datadoghq.com/blog/logging-without-limits/'
    tag: Blog
    text: Collecter des logs sans limites
---
## Présentation

Le nombre de log générés par votre infrastructure est parfois trop élevé ou trop fluctuant, ce qui soulève un problème : quels logs faut-il envoyer vers votre solution de Log Management et quels logs faut-il envoyer vers une archive ? Le filtrage de vos logs avant leur envoi empêche toutefois inévitablement d'assurer une couverture complète, et certaines données utiles sont souvent ignorées.

La solution de Log Management de Datadog supprime ces limitations en séparant le processus d'ingestion des logs du processus d'indexation, vous permettant ainsi de collecter, de traiter et d'archiver tous vos logs de façon rentable.
Grâce aux filtres d'index de Datadog, la configuration de l'Agent devient beaucoup plus simple et vous avez la possibilité de contrôler de façon dynamique les éléments indexés.
Vous pouvez dorénavant :

* Ingérer tous vos événements de logs sans filtrage côté serveur
* Traiter l'ensemble de vos logs tout en les étoffant
* Procéder à un Live Tailing sur l'ensemble de l'infrastructure
* Déterminer de façon dynamique les éléments à inclure et à exclure de vos index afin de maîtriser vos coûts
* Recevoir des alertes en cas d'augmentation imprévue des volumes dans un index
* Archiver tous vos logs enrichis

Cette flexibilité est essentielle dans certaines situations exceptionnelles, telles que les pannes, où vous pouvez désactiver des filtres spécifiques pour envoyer plus de données. L'inverse s'applique également : par exemple, si vous êtes en situation de surconsommation en raison de la période (Black Friday, Noël, etc.), vous pouvez choisir de réduire certains volumes spécifiques pour éviter les surplus.

## Détails des index

Les index se trouvent en bas de la [page des pipelines][5]. Double-cliquez dessus ou cliquez sur le bouton *edit* pour afficher plus d'informations sur le nombre de logs qui ont été indexés au cours des 3 derniers jours, ainsi que la période de conservation de ces logs :

{{< img src="logs/logging_without_limits/index_details.png" alt="" responsive="true" style="width:70%;">}}

Les logs indexés peuvent être utilisés aux fins suivantes : [recherche à facettes][1], [analyses de logs][2], [dashboarding][3] et [surveillance][4].

## Configurez des monitors de logs sur les volumes

Recevez des alertes à tout moment en cas d'augmentation inattendue des volumes de votre infrastructure dans n'importe quel contexte (`service`, `availibility-zone`, etc.) :

1. Accédez à la vue [Explorateur de logs de Datadog][6]
2. Créez une [requête de recherche][7] qui correspond au volume à surveiller. 
3. Cliquez sur **Export to monitor**.
4. Déterminez le taux que vous souhaitez définir en tant que *warning* ou *error*.
5. Rédigez une notification explicite : `Le volume sur ce service est actuellement trop élevé. Pour le réduire, veuillez définir un filtre d'exclusion supplémentaire ou augmenter le taux d'échantillonnage.`

{{< img src="logs/logging_without_limits/example_notification.png" alt="" responsive="true" style="width:70%;">}}

## Filtres d'exclusion

Les filtres d'index vous permettent de contrôler de façon dynamique les éléments ajoutés à vos index.

Par exemple, si certains logs ont été capturés à des seules fins de dépannage (Troubleshooting), vous aurez peut-être uniquement besoin d'indexer les logs qui contiennent des erreurs et des avertissements. Pour ce faire, il vous suffit d'utiliser des filtres d'exclusion.

Pour définir un nouveau filtre d'index, cliquez sur le bouton « add » :

{{< img src="logs/logging_without_limits/index_filters.png" alt="" responsive="true" style="width:70%;">}}

Pour configurer un filtre d'exclusion, procédez comme suit :

1. Définissez le nom de votre filtre
2. Définissez la requête correspondant aux logs à exclure de votre index
    **Remarque** : Il est possible d'utiliser n'importe quel attribut ou tag dans la requête de filtre d'index, même ceux qui ne correspondent pas à des facettes. Si vous effectuez un filtrage en fonction d'attributs ou de tags qui ne correspondent pas à des facettes, assurez-vous d'appuyer sur « enter/return » dans la barre de requête.
3. Enregistrez le filtre

    {{< img src="logs/logging_without_limits/index_filter_details.png" alt="" responsive="true" style="width:80%;">}}

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

## Activer/désactiver des filtres

Même si les logs ne nécessitent pas tous une indexation journalière, ils peuvent toujours être importants dans certaines situations.
Les logs de débogage, par exemple, ne sont pas toujours utiles, mais ils peuvent devenir très intéressants pendant une opération de troubleshooting complexe ou lors du lancement d'une nouvelle version pour mieux comprendre ce qui se passe.

Au lieu de modifier le niveau des logs de votre application ou d'utiliser un outil de filtrage interne complexe, il est désormais possible de modifier les éléments indexés directement avec les filtres d'index de Datadog.

Vous pouvez les activer ou les désactiver en un clic depuis la page des Pipelines :

{{< img src="logs/logging_without_limits/enable_index_filters.png" alt="" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/?tab=facets#setup
[2]: /logs/explorer/analytics/
[3]: /logs/explorer/analytics/#dashboard
[4]: /monitors/monitor_types/log/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: https://app.datadoghq.com/logs
[7]: /logs/explorer/search