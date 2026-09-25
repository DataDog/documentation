---
description: Créez, testez et affinez les alertes de monitor en toute sécurité sans
  déclencher de notifications grâce aux monitors brouillons.
further_reading:
- link: monitors/
  tag: Documentation
  text: Présentation des monitors et des alertes
- link: monitors/configuration/?tab=thresholdalert
  tag: Documentation
  text: Configurez des monitors
- link: monitors/manage/
  tag: Documentation
  text: Gérer les monitors
title: Monitors brouillons
---
## Présentation {#overview}

Les monitors brouillons vous permettent de créer, d'affiner et de tester des alertes en toute sécurité sans déclencher de notifications. 

Que vous expérimentiez des seuils, que vous itériez sur des requêtes complexes ou que vous collaboriez avec des collègues, les monitors brouillons vous offrent un espace de travail isolé et net, sans le bruit des monitors non finalisés ou en phase de test. De plus, les monitors brouillons aident à réduire la fatigue liée aux alertes pendant le développement et garantissent que seuls les monitors entièrement validés sont mis en ligne. 

Idéaux pour les ingénieurs et les SRE qui gèrent des flux d'alerte, les monitors brouillons offrent une visibilité claire entre plusieurs équipes et garantissent un passage sûr de l'idée à une alerte fiable.

## Créez un monitor brouillon {#create-a-draft-monitor}

Pour créer et enregistrer des monitors à l'état de brouillon :

1. Accédez à [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][1].  
2. [Configurez le monitor][2] (ajoutez votre requête, spécifiez les conditions et définissez éventuellement des notifications). Les canaux de notification définis dans un monitor brouillon ne sont utilisés qu'une fois le monitor publié. 
3. Cliquez sur {{< ui >}}Save as Draft{{< /ui >}}. Aucune alerte n'est envoyée depuis ce monitor brouillon.

{{< img src="/monitors/draft/save_as_draft.png" alt="Bouton Save as Draft dans l'interface de création de monitor" style="width:100%;" >}}

## Publiez un monitor brouillon {#publish-a-draft-monitor}

Lorsque votre monitor est prêt :

1. Ouvrez le brouillon depuis [{{< ui >}}Monitors List{{< /ui >}}][3] en utilisant la facette d'état de brouillon ou filtrez par `status:draft`.  
2. Examinez la configuration.  
3. Cliquez sur {{< ui >}}Publish Monitor{{< /ui >}}.  
4. Ceci publie votre monitor et commence à envoyer des alertes en fonction de vos conditions.

## Gérez les monitors brouillons {#manage-draft-monitors}

<!-- TODO Add image of Monitors List filtered to view drafts, and final QA of instructions with UI-->

Trouvez les monitors brouillons depuis [{{< ui >}}Monitors List{{< /ui >}}][3] en utilisant la facette de statut de brouillon ou filtrez par `draft_status:draft`. Les monitors brouillons apparaissent avec une étiquette {{< ui >}}Draft{{< /ui >}} sur la page de statut du monitor et dans la liste des monitors. Les monitors brouillons expirent après 6 mois sans mise à jour, mais vous pouvez supprimer les monitors brouillons à tout moment.

## Autorisations {#permissions}

Toute personne disposant des [autorisations de modification][4] peut mettre à jour un monitor brouillon. Vous pouvez utiliser des événements pour prévisualiser la fréquence à laquelle le monitor se serait déclenché sans envoyer de notifications réelles.

L'autorisation **Draft Monitors Write** permet aux utilisateurs de gérer les monitors brouillons sans l'autorisation plus large **Monitors Write**. Accordez cette autorisation aux utilisateurs qui ont besoin de travailler sur des monitors brouillons sans modifier les monitors publiés.

Un utilisateur disposant uniquement de l'autorisation **Draft Monitors Write** peut :

- Créer un monitor, tant qu'il est enregistré avec `draft_status` défini sur `draft`.
- Modifier un monitor brouillon existant, tant que la modification ne change pas `draft_status` de `draft`.
- Supprimer un monitor brouillon qu'il a créé, ou un monitor brouillon appartenant à une équipe dont il fait partie.

Un utilisateur disposant uniquement de l'autorisation **Draft Monitors Write** ne peut pas :

- Publier des monitors brouillons.
- Modifier ou supprimer des monitors publiés.

Ces autorisations s'appliquent à la fois dans l'interface utilisateur et l'API Datadog.

## Bonnes pratiques {#best-practices}

* **Utilisez les monitors brouillons pour les revues par les pairs :** Collaborez avant de mettre les modifications en ligne.  
* **Évitez le bruit en production :** Testez d'abord les conditions d'alerte en toute sécurité dans un monitor brouillon.  
* **Suivez votre travail :** Utilisez des noms et des tags clairs pour les monitors brouillons pendant le développement.  
* **Limitez les monitors brouillons obsolètes :** Examinez et nettoyez les anciens monitors brouillons pour réduire l'encombrement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://docs.datadoghq.com/fr/monitors/configuration/?tab=thresholdalert
[3]: https://app.datadoghq.com/monitors/manage
[4]: /fr/monitors/configuration/?tab=thresholdalert#permissions