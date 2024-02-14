---
disable_toc: false
kind: documentation
title: Surveillance
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Les pipelines d'observabilité ne sont pas disponibles sur le site US1-FED de Datadog.</div>
{{< /site-region >}}

## Présentation

Vos [pipelines d'observabilité][1] comprennent des composants qui recueillent, traitent et acheminent vos données d'observabilité. L'intégrité de vos pipelines et composants est illustrée par des statuts et des graphiques de santé, ainsi que des graphiques sur l'utilisation des ressources et la transmission des données.

Les statuts de santé sont déterminés par des métriques spécifiques basées sur des seuils et des intervalles de temps par défaut. Voici la liste des statuts disponibles :

- `Healthy` : ce statut indique que le worker n'a pas pris de retard.
- `Warning` : ce statut indique que le worker ne fonctionne pas de manière optimale et risque de prendre du retard. Le worker peut prendre du retard lorsqu'une destination ou un service en aval génère une certaine contre-pression alors que la quantité de ressources provisionnées pour les workers est insuffisante.
- `Critical` : ce statut indique que le worker est en train de prendre du retard. Si le worker prend du retard, il risque éventuellement d'ignorer des données. Sachez cependant que tant que vos pipelines sont [architecturés][2] et configurés correctement, le worker ne perd involontairement aucune donnée.

Les métriques internes, qui sont regroupées selon leur type (santé, transmission de données et utilisation de ressources), gouvernent le statut de santé global de votre pipeline et de ses composants.

Les graphiques de santé sont disponibles pour les métriques suivantes :
- Événements ignorés involontairement
- Erreurs
- Temps de latence (uniquement disponible pour les sources)
- Taux de variation des temps de latence (uniquement disponible pour les sources)
- Utilisation

Les graphiques sur la transmission des données sont disponibles pour les métriques suivantes :
- Entrée/sortie d'événements par seconde
- Entrée/sortie d'octets par seconde

Les graphiques sur l'utilisation des ressources sont disponibles pour les métriques suivantes :
- Utilisation du CPU
- Utilisation de la mémoire
- Utilisation du disque (uniquement disponible pour les destinations)

## Consulter le statut de vos pipelines et composants

1. Accédez à [Observability Pipelines][3].
1. Cliquez sur un pipeline.
1. Passez le curseur sur un graphique pour afficher des points de données spécifiques.

## Métriques de santé relatives à l'utilisation des ressources d'un pipeline

| Métrique        | OK       | Warning    | Critical  | Description                       |
| ------------  | :------: | :--------: | :-------: | --------------------------------- |
| Utilisation du CPU     | <= 0.85  | > 0.85     | S. O.       | Surveille la quantité de CPU utilisé par un processus de worker. <br><br> La valeur `1` signifie que le processus du worker n'a plus aucune marge en ce qui concerne le host ou les unités de calcul qui l'exécutent. Cela peut mener à d'éventuels problèmes : dépassement des limites de latence de traitement, surcharges de données en amont ou en aval, etc.|
| Utilisation de la mémoire  | >= 0.15  | < 0.15     | S. O.       | Surveille la quantité de mémoire utilisée et disponible sur le host. Le worker n'est pas limité en termes de mémoire, mais une utilisation élevée de la mémoire peut indiquer des fuites.

## Métriques de santé des composants

| Métrique                    | Sources   | Transformations| Destinations | OK      | Warning  | Critical  | Description                       |
| ------------------------  | :-------: | :-------: | :----------: | :-----: | :------: | :--------:| --------------------------------- |
| Événements ignorés            | {{< X >}} | {{< X >}} |{{< X >}}     | ==0     | S. O.      | > 0       |La valeur attendue est toujours `0`. Si vous avez configuré le worker de façon à ignorer volontairement des données, par exemple à l'aide de la transformation `filter`, ces données ne sont pas comptabilisées par cette métrique. Par conséquent, il suffit d'une erreur pour indiquer que le worker n'est pas sain.|
| Erreurs totales              |{{< X >}}  |{{< X >}}  |{{< X >}}     | ==0     | >0       | S. O.       | Le nombre total d'erreurs rencontrées par le composant. Ces erreurs sont également émises sous forme de [logs de diagnostic][4], qui fournissent plus d'informations sur les logs d'erreurs internes spécifiques. |
| Utilisation               |           |{{< X >}}  |{{< X >}}     | <= 0.95 | > 0.95   | S. O.       | Surveille l'activité d'un composant.<br><br> La valeur `0` indique que le composant est inactif et en attente de données. La valeur `1` indique que le composant n'est jamais inactif. Une valeur supérieure à `0.95` indique que le composant est occupé et qu'il y a probablement un goulot d'étranglement au niveau de la topologie de traitement. |
| Temps de latence                  |{{< X >}}  |           |              | S. O.    | S. O.     | S. O.      | Il s'agit de l'écart de temps brut (en millisecondes) entre le timestamp de l'événement et celui de l'ingestion de l'événement par le worker. Un temps de latence élevé ou une variation de celui-ci (voir ci-dessous) indique si le worker prend ou non du retard en raison d'une contre-pression provenant d'un service en aval, d'un sous-provisionnement de ressources pour le worker ou d'un goulot d'étranglement dans le pipeline. |
| Taux de variation du temps de latence   | {{< X >}} |           |              | <= 0    | > 0      | > 1       | Indique s'il y a un délai important entre la génération de l'événement et la réception des données par le worker. Un délai signifie que le worker prend du retard dans la réception des données de la source.<br><br> La valeur `0` indique qu'il n'y a aucun délai supplémentaire entre le moment où les données d'observabilité sont générées et celui où le worker reçoit les données. Une valeur supérieure ou égale à `1` indique la présence d'une contre-pression et d'un goulot d'étranglement. |
| Utilisation du disque                |           |           |{{< X >}}     | >= 0.20 | > 0.20  | S. O.     | Mesure le niveau de remplissage d'un disque donné. <br><br> La valeur `1` indique qu'aucune donnée supplémentaire ne peut être stockée sur le disque. La valeur `0` indique que le disque est vide. |

[1]: /fr/observability_pipelines/
[2]: /fr/observability_pipelines/architecture/
[3]: https://app.datadoghq.com/observability-pipelines/
[4]: /fr/observability_pipelines/troubleshooting/#investigate-diagnostic-logs