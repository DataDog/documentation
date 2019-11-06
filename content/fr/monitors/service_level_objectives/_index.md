---
title: Service Level Objectives
kind: documentation
description: Faire un suivi du statut de vos SLO
disable_toc: true
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

Vous pouvez également surveiller le taux de réussite et les SLI (indicateurs de niveau de service) basés sur des événements. Par exemple : `99 % des requêtes sont effectuées avec succès`

{{< img src="monitors/service_level_objectives/create-slo.png" alt="créer un slo" responsive="true" >}}

### Configuration

1. Sur la [page des SLO][1], sélectionnez **New SLO +**.
2. Définissez la source de vos monitors. Les monitors peuvent être de type [Event Based][5] ou [Monitor Based][4].
3. Définissez votre objectif de disponibilité. Les fenêtres disponibles sont : 7 days, month-to-date, 30 days (rolling), Previous Month et 90 days (rolling). Pour 7 jours, le widget est limité à 2 décimales. Pour 30 jours et plus, il est limité à 2 ou 3 décimales.
4. Enfin, donnez un titre à votre SLO, spécifiez une description plus détaillée, ajoutez des tags et enregistrez-le.

Une fois les monitors configurés, la [page principale des Service Level Objectives][1] vous permet de consulter le pourcentage global de disponibilité uniquement ou le pourcentage global ainsi que la disponibilité pour chaque monitor.

{{< img src="monitors/service_level_objectives/slo-overview.png" alt="page slo principale" responsive="true" >}}

## Modifier un SLO

Pour modifier un SLO, passez votre curseur sur le SLO (à droite) et cliquez sur l'icône de modification en forme de crayon.

## Rechercher un SLO

Depuis la [liste des Service Level Objectives][1], vous avez la possibilité d'effectuer des recherches avancées parmi tous les SLO afin de consulter, supprimer ou modifier les tags de service de tous les SLO sélectionnés. Vous pouvez également dupliquer ou modifier entièrement n'importe quel SLO spécifique dans les résultats de recherche.

La recherche avancée vous permet d'interroger les SLO en combinant différents attributs :

* `name` et `description` : recherche de texte
* `time window` : *, 7 j, 30 j, 90 j
* `type` : métrique, monitor
* `creator`
* `id`
* `service` : tags
* `team` : tags
* `env` : tags

Pour lancer une recherche, utilisez les cases à cocher sur la gauche et la barre de recherche. Lorsque vous cochez les cases, la barre de recherche est mise à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou rédigez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter les modifications. Les résultats de la requête sont mis à jour en temps réel lorsque vous modifiez la requête. Vous n'avez pas besoin de cliquer sur un bouton « Rechercher ».

Pour modifier un SLO, passez le curseur dessus et utilisez les boutons à l'extrême droite de sa rangée : **Edit**, **Clone**, **Delete**. Pour afficher plus de détails sur un SLO, cliquez sur sa rangée dans le tableau pour accéder à sa page de statut.

### Tags de SLO

Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags afin de filtrer les [listes de SLO][2].

### Calcul de la disponibilité globale

{{< img src="monitors/service_level_objectives/overall_uptime_calculation.png" alt="calcul de la disponibilité globale" responsive="true" >}}

Le résultat de disponibilité globale calculé pour un temps `T_x` s'exprime en logique booléenne et correspond à la conjonction logique (la conjonction `AND`) de tous les statuts de monitor au temps `T_x`.

Si le statut de tous les monitors `[m0, ..., m_n]` est `OK` au temps `T_x`, la disponibilité globale pour le temps `T_x` est `OK`. En revanche, si au moins un monitor présente un statut `ALERT` au temps `T_x`, la disponibilité globale au temps `T_x` est `ALERT`.

Prenons l'exemple suivant :

| Monitor            | t0 | t1 | t2    | t3 | t4    | t5 | t6 | t7 | t8 | t9 | t10   |
|--------------------|----|----|-------|----|-------|----|----|----|----|----|-------|
| m0                 | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK | OK | ALERT |
| m1                 | OK | OK | OK    | OK | OK    | OK | OK | OK | OK | OK | ALERT |
| m2                 | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK | OK | ALERT |
| **Disponibilité globale** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK | OK | ALERT |

## Afficher vos SLO

La [page de statut des SLO][2] vous permet d'afficher et de modifier votre SLO ainsi que ses propriétés, mais aussi d'afficher son statut dans le temps et son historique.

## Widgets SLO

Une fois votre SLO créé, ajoutez un widget SLO pour visualiser le statut de vos SLO en même temps que les métriques, les logs et les données APM de votre dashboard. Pour en savoir plus sur ce type de widget, consultez la page de [documentation sur le widget SLO][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/new
[2]: https://app.datadoghq.com/slo
[3]: /fr/graphing/widgets/slo
[5]: /fr/monitors/service_level_objectives/monitor/
[6]: /fr/monitors/service_level_objectives/event/