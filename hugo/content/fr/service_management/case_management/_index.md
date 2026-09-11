---
aliases:
- /fr/monitors/case_management/
further_reading:
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: blog
  text: Suivez, triez et attribuez les problèmes de manière proactive avec la solution
    Case Management de Datadog
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: blog
  text: Automatiser les tâches de sécurité courantes et anticiper les menaces avec
    les workflows Datadog et Cloud SIEM
title: Case Management
---

## Présentation

La solution Case Management de Datadog permet de suivre, trier et résoudre les problèmes depuis un endroit centralisé. Créez des cas à partir des alertes, des signaux de sécurité ou des problèmes Error Tracking que vous souhaitez examiner.

Vous pouvez attribuer des cas à des utilisateurs ou à des équipes en établissant clairement qui seront les personnes responsables tout au long de leur cycle de vie. Ajoutez des graphiques, des logs et d'autres données de télémétrie issues de Datadog, et intégrez les informations d'outils externes tels que vos applications de messagerie ou de suivi des tickets.

## Consulter, filtrer et gérer les cas

Accédez à [Case Management][1] depuis le menu Service Management.

### Filtrer les cas

Utilisez la section **Inboxes** pour filtrer la liste des cas et voir uniquement ceux qui vous intéressent. Datadog propose automatiquement des filtres pour visualiser les cas qui vous ont été attribués, les cas que vous avez créés ou les cas associés à vos [équipes][2].

Pour filtrer les cas en fonction d'une requête de recherche, créez une inbox personnalisée :
1. Sur la [page Case Management][1], repérez la section **Other Inboxes** et cliquez sur **Add**. La [page de création d'une nouvelle inbox][3] apparaît.
1. Attribuez un nom à votre inbox dans le champ **Name**.
1. Saisissez une requête dans le champ de recherche. L'aperçu **Inbox Preview** se met à jour pour afficher uniquement les cas qui correspondent à votre recherche.
1. Cliquez sur **Save Inbox**.

### Actions groupées

La [page Case Management][1] vous permet de mettre à jour plusieurs cas à la fois :
1. Utilisez les cases à cocher pour sélectionner un ou plusieurs cas. Les options de modification groupée s'affichent au-dessus de la liste.
1. Utilisez les menus déroulants **Set status**, **Assign** et **Set priority** pour définir le statut des cas, attribuer les cas à des utilisateurs ou définir leur priorité. Vous pouvez également afficher d'autres options via **More actions** ou archiver les cas via **Archive**.

## Créer ou mettre à jour un cas
Vous avez la possibilité de créer ou mettre à jour des cas depuis plusieurs endroits dans Datadog :
### Monitors
Depuis la page de statut d'un monitor, cliquez sur le menu déroulant **Escalate** et sélectionnez l'option **+ Create a case**.

### Signaux de sécurité
Cliquez sur un signal de sécurité pour ouvrir le volet latéral. De là, cliquez sur **Create Case**.

### Error Tracking pour les logs
Cliquez sur un problème Error Tracking pour ouvrir le volet latéral correspondant. De là, cliquez sur **Create Case** ou **Add to an existing case**.

### Workflows
Depuis un workflow existant ou lors de la création d'un workflow, ajoutez une étape dans le [créateur de workflow][4], recherchez « case management », puis sélectionnez **Create Case** ou **Update the status from a Case**.

### Case Management
Sur la page [Case Management][1], cliquez sur le bouton **New Case** pour ajouter un nouveau cas. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /fr/account_management/teams/
[3]: https://app.datadoghq.com/cases/contexts/new
[4]: /fr/workflows/build/#build-a-workflow-with-the-workflow-builder