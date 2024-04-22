---
aliases:
- /fr/graphing/faq/how-do-i-delete-a-host-or-metric-from-the-ui/
- /fr/graphing/faq/is-it-possible-to-query-historical-data-after-a-host-has-been-destroyed/
- /fr/agent/faq/i-stopped-my-agent-but-i-m-still-seeing-the-host/
- /fr/graphing/faq/historical-data
kind: faq
title: Données historiques
---

## Graphiques

Si vous cessez dʼenvoyer des données à Datadog, les métriques, tags et hosts disparaissent après un certain moment de lʼIU de Datadog.

| Élément                                 | Délai dʼutilisation  |
|--------------------------------------|----------|
| Hosts                                | 2 heures  |
| Métriques                              | 24 heures |
| Tags dans les volets déroulants de variables de modèles | 48 heures |
| Tags dans les autres volets déroulants             | 12 heures |
| Tags `env` APM                       | 60 jours  |

Vous pouvez toujours requérir les données avec [lʼéditeur JSON][1], même si elles ne sont pas répertoriées. Unz solution simple consiste à effectuer une requête pour le hostname ou des tags.

Si vous prévoyez de souvent changer de host, ajoutez un tag à lʼ[Agent][2] dans `datadog.yaml` ou utilisez la [liste d'infrastructure][3] (tags dʼutilisateurs).

## Supprimer

### Métriques et tags

Vous ne pouvez pas immédiatement supprimer de métrique ni de tag. La liste ci-dessus montre la durée pendant laquelle une métrique ou un tag reste affiché dans lʼIU sʼil nʼest plus actif.

Pour les monitors, le flux de métriques nʼest plus pris en compte après la fin du délai dʼutilisation.

Pour les dashboards, la métrique ou le tag sʼaffiche dans la visualisation après le délai, mais nʼest plus disponible dans les volets déroulants relatif aux graphiques dans lʼéditeur dʼIU. Afin de conserver la métrique ou le tag correspondant pour les graphiques, utilisez la méthode [JSON][1].

### Hosts

Si vous nʼexécutez pas lʼAgent, et si vous avez intentionnellement [arrêté][4] ou [supprimé][5] votre host, lʼensemble des hosts qui nʼont vu aucune nouvelle donnée au cours des 2 dernières heures disparaissent de lʼIU. Vous pouvez toujours effectuer une requête à leur sujet. Toutefois, ils ne sʼafficheront plus dans les menus déroulants, ni dans la hostmap.

[1]: /fr/dashboards/graphing_json/
[2]: /fr/agent/
[3]: /fr/infrastructure/
[4]: /fr/agent/configuration/agent-commands/#start-stop-restart-the-agent
[5]: /fr/agent/guide/how-do-i-uninstall-the-agent/