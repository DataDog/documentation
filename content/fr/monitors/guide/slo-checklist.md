---
title: Liste de contrôle pour les SLO
kind: guide
further_reading:
  - link: 'https://www.datadoghq.com/blog/slo-monitoring-tracking/'
    tag: Blog
    text: Surveiller le statut et le budget d'indisponibilité de vos SLO avec Datadog
  - link: 'https://learn.datadoghq.com/course/view.php?id=34'
    tag: Centre d'apprentissage
    text: Présentation des Service Level Objectives (SLO)
---
<div class="alert alert-info">
Cliquez <a href="https://www.datadoghq.com/pdf/SLOChecklist_200619.pdf">ici</a> pour télécharger une version PDF de cette page.
</div>

## Prise en main

1. Accédez à la page SLO depuis [Monitors › Service Level Objectives][1].

2. Mettez-vous à la place de vos utilisateurs :

    * Comment interagissent-ils avec votre application ?
    * En quoi consiste leur parcours ?
    * Avec quels éléments de votre infrastructure interagissent-ils durant leur parcours ?
    * Qu'attendent-ils de vos systèmes, et que cherchent-ils à accomplir ?

## Sélectionner les SLI pertinents

### ÉTAPE 1

#### Requête/réponse

|              |                                                                |
| ------------ | -------------------------------------------------------------- |
| Disponibilité | Le serveur est-il parvenu à répondre correctement à la requête ?          |
| Latence      | Quel a été le délai de réponse du serveur ? |
| Débit   | Combien de requêtes est-il possible de gérer ?                              |

#### Stockage

|              |                                              |
| ------------ | -------------------------------------------- |
| Disponibilité | Les utilisateurs peuvent-ils accéder aux données quand ils le souhaitent ?          |
| Latence      | Quelle est la durée de lecture ou d'écriture des données ? |
| Durabilité   | Les données sont-elles disponibles en cas de besoin ?   |

#### Pipeline

|             |                                                                    |
| ----------- | ------------------------------------------------------------------ |
| Fiabilité | Les données renvoyées sont-elles les bonnes ?                                       |
| Pertinence   | Quelle est la durée nécessaire pour afficher de nouvelles données ou des résultats traités ? |

### ÉTAPE 2

**Avez-vous besoin d'un SLI basé sur des durées, ou sur des totaux ?**

**Les SLI basés sur des durées ont recours aux monitors Datadog** :

_Exemple : la latence de toutes les requêtes utilisateur doit être inférieure à 250 ms, et ce 99 % du temps sur une période de 30 jours._

1. Sélectionnez un seul monitor ; ou
2. Sélectionnez plusieurs monitors (jusqu'à 20) ; ou
3. Sélectionnez un seul monitor à alertes multiples et choisissez des groupes de monitors spécifiques (jusqu'à 20) à inclure
   dans le calcul du SLO.

Si vous devez créer un nouveau monitor, accédez à la [page dédiée][2].

**Les SLI basés sur des totaux ont recours à des métriques de votre compte Datadog et ne nécessitent pas de monitor** :

_Exemple : 99 % des requêtes doivent se terminer en moins de 250 ms sur une période de 30 jours._

## Mettre en œuvre les SLI

1. [Métriques custom][3] (p. ex., compteurs)
2. [Métriques d'intégration][4] (p. ex., équilibreur de charge, requêtes HTTP)
3. [APM Datadog][5] (p. ex., erreurs, latence au niveau des services et ressources)
4. [Logs Datadog][6] (p. ex., métriques générées à partir de logs pour un total d'occurrences spécifiques)

## Définir l'objectif ciblé et l'intervalle

1. Sélectionnez votre cible : `99%`, `99.5%`, `99.9%`, `99.95%` ou toute autre valeur adaptée à vos exigences.
2. Sélectionnez votre intervalle : `7`, `30` ou `90` derniers jours.

## Nommer le SLO, le décrire et y ajouter des tags

1. Nommez votre SLO.
2. Ajoutez une description : décrivez ce que votre SLO surveille et son importance pour l'expérience des utilisateurs finaux. Vous pouvez également ajouter des liens vers des dashboards afin de pouvoir vous y référer.
3. Ajoutez des tags : il est conseillé d'ajouter les tags `team` et `service`.

## Rechercher et consulter le SLO

[Utilisez des tags pour rechercher votre SLO parmi la liste des SLO][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: https://app.datadoghq.com/monitors#create/metric
[3]: /fr/developers/metrics
[4]: /fr/integrations
[5]: /fr/tracing/generate_metrics/
[6]: /fr/logs/logs_to_metrics/
[7]: /fr/monitors/service_level_objectives/#searching-and-viewing-slos