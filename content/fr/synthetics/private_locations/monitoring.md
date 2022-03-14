---
title: Surveillance des emplacements privés
kind: documentation
description: Surveiller vos emplacements privés
further_reading:
  - link: getting_started/synthetics/private_location
    tag: Documentation
    text: Débuter avec les emplacements privés
  - link: synthetics/private_locations/dimensioning
    tag: Documentation
    text: Dimensionner vos emplacements privés
  - link: agent/
    tag: Documentation
    text: Installer l'Agent Datadog
---
## Présentation

Les emplacements privés fournissent un ensemble de [métriques][1] prêtes à l'emploi vous permettant de surveiller la santé globale de vos emplacements privés. Vous pouvez visualiser ces métriques dans le volet latéral de chaque emplacement privé sur la page [Settings][2], et même représenter ces métriques dans un [dashboard][3].

{{<img src="synthetics/private_locations/pl_monitoring_table.png" alt="Tableau de surveillance des emplacements privés" style="width:100%;">}}

L'onglet **Private Locations** de la page [**Synthetics Settings**][2] présente vos emplacements privés, leur statut de transmission ainsi que le statut de leurs monitors.

Lorsque vous cliquez sur un emplacement privé, un volet s'affiche. Il contient des informations sur la **santé** et les **métadonnées** de l'emplacement. Le tableau de l'onglet **Health** affiche tous les workers transmettant des données, ainsi que la version de l'image qu'ils exécutent. Vous pouvez ainsi visualiser le nombre de conteneurs à récupérer pour la nouvelle version de l'image.

Depuis la section **Monitors**, vous pouvez consulter les statuts d'avertissement, comme `ALERT`, en cas de problème avec votre emplacement privé. Des avertissements sont par exemple envoyés si l'emplacement privé ne transmet plus de données, s'il est sous-provisionné ou si son worker exécute une ancienne version de l'image.

{{<img src="synthetics/private_locations/pl_monitoring_side_panel.png" alt="Volet latéral de surveillance des emplacements privés" style="width:100%;">}}

### Monitors par défaut

Lorsque vous créez un emplacement privé, trois monitors sont ajoutés à votre compte :

| Nom du monitor                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[Synthetic Private Locations] {{location_id.name}} stopped reporting**              | Ce monitor déclenche une alerte `NO DATA` lorsque la métrique [`synthetics.pl.worker.running`][1] arrête de transmettre des données pour l'un de vos emplacements privés. Cela indique qu'il est possible que les conteneurs de vos emplacements privés aient été supprimés, ou qu'ils ne soient plus exécutés.                                                                                                                                                                                                                                                                                  |
| **[Synthetic Private Locations] {{location_id.name}} is underprovisioned**            | Ce monitor déclenche une `ALERT` lorsque la valeur moyenne de la métrique [`synthetics.pl.worker.remaining_slots`][1] est inférieure à 1,5 pendant 30 minutes. Cela indique que votre emplacement privé est sous-provisionné. [Procédez à un scaling horizontal ou vertical de votre emplacement privé][4] pour veiller à ce qu'il dispose de suffisamment de ressources pour exécuter tous les tests qui lui sont attribués.                                                                                                                                                      |
| **[Synthetic Private Locations] {{location_id.name}} uses an outdated image version** | Ce monitor déclenche une `ALERT` lorsque la métrique [`synthetics.pl.worker.outdated`][1] commence à transmettre la valeur `1` pour l'un de vos emplacements privés. Cela indique qu'au moins l'un des conteneurs de vos emplacements privés exécute une ancienne version de l'image de l'emplacement privé. Consultez le [Google Container Registry][5] pour accéder à la dernière version de l'image et configurez cette version pour vos workers en récupérant l'image `datadog/synthetics-private-location-worker` avec le tag `latest`. |

Par défaut, aucun handle n'est défini dans ces monitors. Pour recevoir des alertes lorsqu'un de vos monitors commence à ne plus fonctionner correctement, ajoutez un handle dans la [section Notification][6] de vos monitors.

Les monitors de l'onglet **Monitors** possèdent un groupe basé sur l'ID de leur emplacement privé ou sont tagués avec `location_id:<ID_EMPLACEMENT_PRIVÉ>`.

### Surveiller vos emplacements privés avec l'Agent Datadog

Pour compléter les métriques prêtes à l'emploi sur les emplacements privés, Datadog recommande d'installer l'[Agent Datadog][7] aux côtés de vos emplacements privés.

L'[Agent Datadog][7] vous permet de bénéficier d'une visibilité accrue sur vos emplacements privés, grâce à des métriques de santé sur les conteneurs sous-jacents (sur l'utilisation de la mémoire, les limites, le CPU et le disque). Vous pouvez créer un graphique pour représenter ces métriques et définir une alerte en cas de ressources insuffisantes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/synthetics/metrics/
[2]: https://app.datadoghq.com/synthetics/settings/private-locations
[3]: /fr/dashboards/
[4]: /fr/synthetics/private_locations/dimensioning
[5]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
[6]: /fr/monitors/notify/
[7]: /fr/agent/