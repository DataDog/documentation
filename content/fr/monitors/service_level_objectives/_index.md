---
title: Service Level Objectives
kind: documentation
description: Faire un suivi du statut de vos SLO
aliases:
  - /fr/monitors/monitor_uptime_widget/
  - /fr/monitors/slos/
further_reading:
  - link: 'https://www.datadoghq.com/blog/slo-monitoring-widget/'
    tag: Blog
    text: Suivez le statut de vos SLO avec le nouveau widget Disponibilité des monitors
---
## Présentation

Les SLO (Service Level Objectives) constituent un outil essentiel pour optimiser le niveau de fiabilité d'un site. Les SLO fournissent un cadre permettant de définir des objectifs précis relatifs aux performances de l'application, aidant ainsi les équipes à proposer une expérience client homogène, à assurer les développements futurs sans compromettre la stabilité de la plateforme, et à améliorer la communication avec les utilisateurs internes et externes.

## Implémentation

Utilisez le widget dédié aux SLO et à la disponibilité pour surveiller vos SLO (Service Level Objectives) et la disponibilité à partir d'un screenboard ou timeboard. Pour utiliser les SLO, ajoutez un widget à un dashboard ou accédez à la [page Service Level Objectives[1] pour afficher les SLO existants et en créer d'autres. Sélectionnez un SLO actif dans le menu déroulant et affichez-le sur n'importe quel dashboard.

L'*uptime* ou la disponibilité correspond à la durée pendant laquelle un monitor affichait un statut *up* (OK) comparé à un statut *down* (non OK). Le statut est représenté par des barres de couleur verte (disponible) et rouge (non disponible). Exemple : `99 % du temps, la latence est inférieure à 200 ms`.

Vous pouvez également surveiller le taux de réussite et les SLI (Service Level Indicators) basés sur des événements. Par exemple : `99 % des requêtes sont effectuées avec succès`

{{< img src="monitors/service_level_objectives/create-slo.png" alt="créer un slo" >}}

### Configuration

1. Sur la [page des SLO][1], sélectionnez **New SLO +**.
2. Définissez la source de vos monitors. Les monitors peuvent être de type [Event Based][2] ou [Monitor Based][3].
3. Définissez votre objectif de disponibilité. Les fenêtres disponibles sont : 7 days, month-to-date, 30 days (rolling), Previous Month et 90 days (rolling). Pour 7 jours, le widget est limité à 2 décimales. Pour 30 jours et plus, il est limité à 2 ou 3 décimales.
4. Enfin, donnez un titre à votre SLO, spécifiez une description plus détaillée, ajoutez des tags et enregistrez-le.

Une fois les monitors configurés, la [page principale des Service Level Objectives][1] vous permet de consulter le pourcentage global de disponibilité uniquement ou le pourcentage global ainsi que la disponibilité pour chaque monitor.

{{< img src="monitors/service_level_objectives/slo-overview.png" alt="page slo principale" >}}

## Modifier un SLO

Pour modifier un SLO, passez votre curseur sur le SLO (à droite) et cliquez sur l'icône de modification en forme de crayon.

## Rechercher un SLO

Depuis la [liste des Service Level Objectives][4], vous avez la possibilité d'effectuer des recherches avancées parmi tous les SLO afin de consulter, supprimer ou modifier les tags de service de tous les SLO sélectionnés. Vous pouvez également dupliquer ou modifier entièrement n'importe quel SLO spécifique dans les résultats de recherche.

La recherche avancée vous permet d'interroger les SLO en combinant différents attributs :

* `name` et `description` : recherche de texte
* `time window` : *, 7 j, 30 j, 90 j
* `type` : métrique, monitor
* `creator`
* `tags` : datacenter, env, service, équipe, etc. 

Pour lancer une recherche, utilisez les cases à cocher sur la gauche et la barre de recherche. Lorsque vous cochez les cases, la barre de recherche est mise à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou écrivez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter les modifications. Les résultats de la requête sont mis à jour en temps réel lorsque vous modifiez la requête. Vous n'avez pas besoin de cliquer sur un bouton « Rechercher ».

Pour modifier un SLO, passez le curseur dessus et utilisez les boutons à l'extrême droite de sa rangée : **Edit**, **Clone**, **Delete**. Pour afficher plus de détails sur un SLO, cliquez sur sa rangée dans le tableau pour accéder à sa page de statut.

### Tags de SLO

Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags afin de filtrer la [liste des SLO][4].

### Calcul de la disponibilité globale

{{< img src="monitors/service_level_objectives/overall_uptime_calculation.png" alt="calcul de la disponibilité globale" >}}

La disponibilité globale peut être considérée comme le pourcentage de temps durant lequel **tous** les monitors affichaient un statut `OK`. Il ne s'agit pas de la moyenne pour les monitors agrégés.

Prenons l'exemple suivant pour 3 monitors :

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Uptime |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK    | OK  | 90 %    | 
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERT | OK  | 90 %    |
| Monitor 3          | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK    | OK  | 80 %    |
| **Disponibilité globale** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | ALERT | OK  | 70 %    |

On constate que la disponibilité globale peut être inférieure à la moyenne des disponibilités de chaque monitor.

## Afficher vos SLO

La [page de statut des SLO][4] vous permet d'afficher et de modifier votre SLO ainsi que ses propriétés, mais aussi d'afficher son statut dans le temps et son historique.

## Widgets SLO

Une fois votre SLO créé, ajoutez un widget SLO pour visualiser le statut de vos SLO en même temps que les métriques, les logs et les données APM de votre dashboard. Pour en savoir plus sur ce type de widget, consultez la page de [documentation sur le widget SLO][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/new
[2]: /fr/monitors/service_level_objectives/monitor/
[3]: /fr/dashboards/widgets/slo
[4]: https://app.datadoghq.com/slo