---
aliases:
- /fr/monitors/manage_monitor/
description: Envoyer des notifications à vos équipes lorsque des monitors déclenchent
  des alertes
further_reading:
- link: /monitors/
  tag: Documentation
  text: Créer des monitors
- link: /monitors/notify/
  tag: Documentation
  text: Notifications de monitor
- link: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
  tag: Blog
  text: Meilleures pratiques concernant le tagging des monitors
title: Gérer les monitors
---

La page [Manage Monitors][1] vous permet de rechercher, de supprimer, de désactiver ou de résoudre des monitors, mais aussi de modifier plusieurs tags de monitor à la fois. Vous pouvez également dupliquer ou modifier des monitors spécifiques à partir des résultats de recherche.

{{< img src="monitors/manage_monitor/monitor_page.jpg" alt="Page Manage Monitors" >}}

## Rechercher

Pour [rechercher des monitors][2], rédigez une requête à l'aide du volet des facettes sur la gauche ou de la barre de recherche en haut de l'écran.

## Gérer les downtimes

Une fois votre recherche terminée, sélectionnez le ou les monitors à modifier en cochant les cases à côté de chaque résultat. Vous pouvez sélectionner tous les résultats en cochant la case située tout en haut, à côté du titre de la colonne *STATUS*. Pour modifier plusieurs monitors à la fois, utilisez les boutons en haut à droite des résultats de recherche :

| Option     | Description                                                                      |
|------------|----------------------------------------------------------------------------------|
| Mute       | [Désactive][3] les monitors sélectionnés pendant l'une des durées suivantes : `1h`, `4h`, `12h`, `1d`, `1w`, ou `Forever`. |
| Unmute     | Réactive les monitors sélectionnés s'ils sont désactivés.                                 |
| Resolve    | [Résout][4] l'alerte pour les monitors sélectionnés.                                |
| Supprimer     | Supprime les monitors sélectionnés.                                                    |
| Edit Tags  | Modifier les tags de monitor pour les monitors sélectionnés.                                 |
| Edit Teams | Modifier les [équipes][5] pour les monitors sélectionnés.                                  |

Pour modifier un monitor, passez le curseur dessus et utilisez les options tout à droite : Edit, Clone, Mute et Delete. Pour afficher plus de détails sur un monitor, cliquez sur son nom afin d'accéder à sa page de statut.

**Remarque** : vous pouvez consulter vos vues enregistrées de monitors, ou encore consulter et désactiver des monitors, avec l'[application mobile Datadog][6], disponible sur l'[App Store d'Apple][7] et le [Google Play Store][8].

### Monitors déclenchés

Vous pouvez [désactiver][3] ou [résoudre][4] plusieurs monitors à la fois depuis la page [Triggered Monitors][9]. Cette page affiche uniquement les monitors actuellement déclenchés (avec un statut Alert, Warn ou No Data).

#### Résultats groupés

La page Triggered Monitors affiche une ligne distincte pour chaque groupe (source de transmission) de chaque monitor. Par exemple, si un monitor est regroupé par host et que 14 hosts transmettent un statut déclenché, la page affiche 14 lignes différentes. Ainsi, vous avez la possibilité de désactiver ou de [résoudre][3] un monitor pour une source de transmission spécifique.

Lorsque vous saisissez une requête de recherche, vous pouvez utiliser les mêmes attributs que ceux qui figurent sur la page Manage Monitors, même s'ils ne peuvent pas être cochés sur la page Triggered Monitors.

Les attributs sur la page Triggered Monitors présentent les différences suivantes :

* L'attribut `group_status` est utilisé au lieu de `status`.
* L'attribut `triggered` vous permet de filtrer les monitors en fonction du temps écoulé depuis leur déclenchement.
* L'attribut `group` vous permet d'affiner les résultats de recherche pour les monitors regroupés selon plusieurs tags. Imaginons par exemple qu'un monitor est regroupé en fonction des tags `host` et `env`. Votre recherche renvoie quatre lignes correspondant aux groupes `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod` et `host:web02,env:prod`. Vous pouvez utiliser l'attribut `group` pour afficher uniquement les hosts de prod (`group:"env:prod"`) ou les hosts web02 (`group:"host:web02"`).

### Tags de monitor

Les tags de monitor fonctionnent différemment des tags envoyés par l'Agent ou les intégrations. Ajoutez jusqu'à 80 tags directement à vos monitors depuis les pages [Manage Monitors][1], [Triggered Monitors][9] et [Manage Downtime][10] afin de les filtrer ultérieurement. Pour en savoir plus sur les tags de monitor, consultez la [rubrique IU de la section Assigner des tags][11].

**Remarque** : les tags de monitor sont ajoutés à l'événement d'alerte généré par le monitor.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /fr/monitors/manage/search/
[3]: /fr/monitors/manage/status/#mute
[4]: /fr/monitors/manage/status/#resolve
[5]: /fr/account_management/teams/
[6]: /fr/service_management/mobile/#monitors
[7]: https://apps.apple.com/app/datadog/id1391380318
[8]: https://play.google.com/store/apps/details?id=com.datadog.app
[9]: https://app.datadoghq.com/monitors/triggered
[10]: https://app.datadoghq.com/monitors#downtime
[11]: /fr/getting_started/tagging/assigning_tags/?tab=monitors#ui