---
title: Resource Monitors de l'APM
kind: documentation
aliases:
  - /fr/tracing/faq/how-to-create-a-monitor-over-every-resource-apm
  - /fr/tracing/getting_further/resource_monitor
---
Le système de surveillance des performances des applications de Datadog fait appel à plusieurs composants clés. Les [services][1] et les [ressources][2] en sont les couches frontales.

Chaque graphique au sein des dashboards de [service][3] et de [ressource][4] de l'APM est constitué d'un certain nombre de métriques `trace.*`.
Utilisez [le bouton de téléchargement en haut du graphique][5] pour enregistrer ces métriques dans un timeboard existant. Cette action peut être effectuée aussi bien pour les métriques de service que pour les métriques de ressource :

{{< img src="tracing/faq/apm_save_1.png" alt="Enregistrement depuis l’APM"  >}}

**Remarque** : pour créer un monitor sur une ressource, utilisez le tag de ressource qui contient un hash du nom de la ressource. Pour ce faire, enregistrez la métrique dans un Timeboard et utilisez la même requête dans un monitor de métrique :

## Créer un monitor à partir de ces éléments

Si les monitors d'APM permettent actuellement de configurer des alertes par [service][6], la requête de métrique ci-dessus peut être utilisée pour configurer un monitor de métrique ou un monitor d'anomalie sur un service ou une ressource spécifique.

Puisqu'il s'agit de métriques et de tags Datadog standards, copiez cette requête dans un nouveau monitor.
L'inconvénient de cette option est que le champ affiche le hash de la ressource au lieu d'un nom plus lisible. Cependant, vous pouvez contourner ce problème en faisant en sorte que le message de monitor envoie un lien vers la page de la ressource qui a provoqué le déclenchement du monitor. La page APM d'une ressource présente toujours le format suivant :

```
/apm/resource/<Service>/<nom_premier_niveau>/<Nom_ressource>?env=<env>
```

Puisque chaque service contient un seul nom de premier niveau et qu'il est possible de configurer une alerte multiple par [environnement][7], ressource et service, il suffit d'obtenir le nom de premier niveau pour créer l'URL.
Pour récupérer ce nom, cliquez sur le service qui vous intéresse. Par exemple, pour le service Mcnulty-Web de Datadog, le nom de premier niveau est `pylons.request` :

{{< img src="tracing/faq/top_level_name.png" alt="Nom de premier niveau"  >}}

La configuration du monitor ressemble alors à ce qui suit :

{{< img src="tracing/faq/top_level_monitor.png" alt="Monitor de premier niveau"  >}}


[1]: /fr/tracing/visualization/service
[2]: /fr/tracing/visualization/resource
[3]: /fr/tracing/visualization/#services
[4]: /fr/tracing/visualization/#resources
[5]: /fr/tracing/visualization/service/#export-to-timeboard
[6]: /fr/monitors/monitor_types/apm
[7]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment