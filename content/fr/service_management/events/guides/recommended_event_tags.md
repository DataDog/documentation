---
aliases:
- /fr/events/guides/recommended_event_tags
description: Découvrez les tags dʼévénements et comment les ajouter.
further_reading:
- link: /getting_started/tagging/assigning_tags
  tag: Documentation
  text: En savoir plus sur lʼattribution de tags
kind: guide
title: Meilleures pratiques concernant le tagging dʼévénements
---

## Présentation

Datadog recommande d'utiliser [le tagging de service unifié][1] et les tags indiqués ci-dessous sur tous vos événements afin de bénéficier des avantages suivants :

- Identifier plus rapidement les problèmes potentiels
- Localiser les événements associés
- Filtrer plus précisément dans l'[Events Explorer][2] pour, par exemple, rechercher un environnement spécifique

## Ajouter des tags

Vous disposez de plusieurs options pour améliorer votre stratégie de tagging pour les événements :

- API : Lorsque vous utilisez l'[API][3], vous pouvez ajouter des tags dans le champ `tags`.

- Monitor : Lors de la création ou de la modification d'un monitor, vous pouvez ajouter les tags recommandés dans la [section **Say what's happening**][4].

- Intégrations : Pour obtenir plus d'informations sur l'ajout de tags à des intégrations, consultez la section [assigner des tags][5] ou [lʼintégration][6] spécifique.

Vous pouvez ajouter les attributs de base suivants à vos événements :

| **Attribute** | **Description**                                                                                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| env           | Lʼenvironnement dans lequel se trouve lʼévénement, tel que production, edge ou staging. Cela vous permet de vous assurer que les événements d'un environnement inférieur ne sont pas considérés comme étant dʼune priorité élevée.                       |
| service       | Le nom du service. Permet de :<br>- Savoir quels services sont impactés si un événement est lié à une erreur<br>- Pivoter vers le service impacté <br>- Filtrer tous les événements avec ce service |
| version       | La version du build ou du service. Cela vous permet d'identifier, par exemple, si une panne ou un événement est lié à une version particulière.                                                                         |
| host          | Le nom du host. Permet : <br>- D'enrichir automatiquement des événements à l'entrée avec des tags de host supplémentaires <br> - De pivoter vers les onglets **Host Infrastructure** et **Metrics** dans l'[Events Explorer][7].                             |
| team          | L'équipe propriétaire de lʼévénement et qui est informée en cas de besoin.                                                                                                                       |                                                          |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/service_management/events/explorer
[3]: /fr/api/latest/events/#post-an-event
[4]: /fr/getting_started/monitors/#notify-your-team
[5]: /fr/getting_started/tagging/assigning_tags
[6]: /fr/integrations/
[7]: https://app.datadoghq.com/event/explorer