---
title: Rôles et autorisations Datadog par défaut
kind: documentation
description: Description des rôles et autorisations par défaut dans Datadog.
further_reading:
  - link: account_management/users
    tag: Documentation
    text: Gérer vos utilisateurs Datadog
  - link: account_management/saml
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: account_management/multi_organization
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
  - link: account_management/users/custom_roles
    tag: Documentation
    text: Créer des rôles Datadog personnalisés
---
Datadog propose trois rôles utilisateur par défaut :

| Rôle                       | Description                                                                                                                                                                                                                                  |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Rôle Admin Datadog**     | Les utilisateurs ont accès aux informations de facturation, sont autorisés à révoquer des clés API, sont en mesure de gérer les utilisateurs et peuvent configurer [des dashboards en lecture seule][1]. Ils peuvent également accorder le rôle d'administrateur à un utilisateur standard.                                          |
| **Rôle Standard Datadog**  | Les utilisateurs sont autorisés à consulter et à modifier toutes les fonctionnalités de surveillance offertes par Datadog, telles que les [dashboards][1], les [monitors][2], les [événements][3], et les [notebooks][4]. Ils peuvent également inviter d'autres utilisateurs à rejoindre une organisation.                      |
| **Rôle Read-Only Datadog** | Les utilisateurs n'ont aucun droit de modification dans Datadog. Ce rôle est particulièrement utile lorsque vous souhaitez partager des vues spécifiques en lecture seule avec un client ou lorsqu'un membre d'un service souhaite partager un [dashboard][1] avec une personne qui n'en fait pas partie. |

<div class="alert alert-warning">
La liste des autorisations et des rôles évolue régulièrement. À chaque fois qu'une autorisation est ajoutée, cette page est mise à jour avec son nom et sa définition.
</div>

## Description des autorisations disponibles

Les autorisations générales définissent les niveaux d'accès minimum pour votre rôle. Les [autorisations avancées](#autorisations-avancees) permettent ensuite d'accorder des droits supplémentaires.

### Autorisations générales

| Nom de l'autorisation    | Description                                                                                                                                                                                                                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Priviledged Access | Cette autorisation donne au rôle la possibilité de consulter et de modifier tous les éléments liés à votre organisation Datadog, sauf si une autorisation spécifique a été définie. Il s'agit notamment des informations de facturation et d'utilisation ainsi que des outils de gestion des utilisateurs, des clés et de l'organisation. Cette autorisation inclut toutes les autorisations accordées par l'Accès standard. |
| Standard Access    | Cette autorisation donne au rôle la possibilité de consulter et modifier les composants de votre organisation Datadog, sauf si une autorisation spécifique a été définie. Il s'agit notamment de l'APM, des Événements ainsi que d'autres fonctionnalités qui ne concernent pas la gestion des comptes.                                                                    |
| Read-Only Access   | Cette autorisation accorde un accès en lecture seule aux sections de l'application pour lesquelles aucune autorisation spécifique n'est définie, ou qui ne font l'objet d'aucune restriction liée aux rôles de l'utilisateur et aux autorisations qui lui sont accordées.                                                                                         |

### Autorisations avancées

Jusqu'à trois options peuvent être sélectionnées pour chaque autorisation : Read, Write et Other. Certaines autorisations ne proposent pas toutes ces options. Vous trouverez ci-dessous la liste des options disponibles et l'effet de chaque autorisation.

#### Logs

| Nom de l'autorisation        | Read                                | Write                                      | Other                                   |
|------------------------|-------------------------------------|--------------------------------------------|-----------------------------------------|
| Log Indexes            | Lecture d'un sous-ensemble de tous les index de logs    | Mise à jour de la définition des index de logs       | *non défini*                             |
| Live Tail              | Accès à la fonctionnalité Live Tail        | *non défini*                                | *non défini*                             |
| Exclusion Filters      | *non défini*                         | Mise à jour d'un sous-ensemble de filtres d'exclusion   | *non défini*                             |
| Log Pipelines          | *non défini*                         | Mise à jour d'un sous-ensemble de pipelines de logs       | *non défini*                             |
| Log Processors         | *non défini*                         | Mise à jour des processeurs de logs d'un index      | *non défini*                             |
| Log External Archives  | *non défini*                         | Mise à jour de la configuration des archives externes | *non défini*                             |
| Logs Public Config API | *non défini*                         | *non défini*                                | Accès à l'API de configuration des logs publique (lecture/écriture) |
| Log Generate Metrics   | Accès à la fonctionnalité Generate Metrics | *non défini*                                | *non défini*                             |

#### Dashboards

| Nom de l'autorisation  | Read                         | Write             | Other                     |
|------------------|------------------------------|-------------------|---------------------------|
| Dashboards       | Accès aux dashboards (obligatoire) | Mise à jour des dashboards | *non défini*               |
| Dashboards Share | *non défini*                  | *non défini*       | Partage de dashboards en dehors de Datadog |

#### Monitors

| Nom de l'autorisation   | Read                       | Write                   | Other       |
|-------------------|----------------------------|-------------------------|-------------|
| Monitors          | Accès aux monitors (obligatoire) | Mise à jour des monitors          | *non défini* |
| Monitors Downtime | *non défini*                | Gestion des downtimes de monitor | *non défini* |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards
[2]: /fr/monitors
[3]: /fr/events
[4]: /fr/notebooks