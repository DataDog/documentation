---
aliases:
- /fr/service_management/case_management/automation_rules/
- /fr/incident_response/case_management/automation_rules/
further_reading:
- link: /incident_response/work_management
  tag: Documentation
  text: En savoir plus sur Work Management
title: Règles d'automatisation des éléments de travail
---
## Vue d'ensemble {#overview}

Les règles d'automatisation des éléments de travail rationalisent votre workflow de gestion des incidents en déclenchant automatiquement des actions lorsque des conditions spécifiques sont remplies, permettant aux équipes de standardiser leurs processus de réponse.

Vous pouvez définir des actions automatisées basées sur quatre déclencheurs clés :
- **Création d'élément de travail** - Attribuez automatiquement les nouveaux éléments de travail aux membres de l'équipe d'astreinte
- **Changements de statut** - Déclenchez des actions de suivi lorsque les éléments de travail changent d'état
- **Changements d'attributs** - Réagissez instantanément lorsque les propriétés des éléments de travail, telles que la priorité, sont modifiées
- **Approbations d'éléments de travail** - Déclenchez des workflows lorsque les éléments de travail reçoivent des approbations ou des refus

Ces fonctionnalités permettent d'accélérer les temps de réponse tout en réduisant les efforts manuels. Les équipes peuvent se concentrer sur la résolution de problèmes plutôt que sur la gestion des éléments de travail, garantissant un traitement cohérent des éléments de travail avec une transparence totale des audits pour la conformité et la visibilité.

## Configuration des règles d'automatisation {#configuring-automation-rules}

Pour configurer des règles d'automatisation :
1. Accédez à **[Work Management > Settings][1]**.
1. Sélectionnez le projet pour lequel vous souhaitez créer des règles d'automatisation.
1. Sélectionnez **Automation**.
1. Cliquez sur **New Rule**.

Ajoutez les éléments suivants à votre configuration :

1. **Définissez un déclencheur** - Choisissez quand une règle d'automatisation doit s'exécuter :
    1. Lors de la création d'un élément de travail
    1. Lorsque le statut d'un élément de travail change
    1. Lorsqu'un attribut d'élément de travail est ajouté ou supprimé
    1. Lorsqu'un élément de travail reçoit une approbation ou un refus
1. **Sélectionnez un workflow** - Utilisez [Workflow Automation][2] pour automatiser des actions telles que :
    1. Affecter l'élément de travail à un membre de l'équipe
    1. Ajouter des commentaires
    1. Fermer un élément de travail résolu
1. **Activez et nommez votre règle** - Définissez un nom descriptif pour la règle et choisissez de l'activer ou de la désactiver.


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /fr/actions/workflows/