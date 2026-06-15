---
description: Supprimez des logs et d'autres données de Datadog avec les autorisations
  appropriées, des requêtes basées sur le temps et la journalisation d'audit pour
  la conformité.
private: true
title: Supprimer des données
---

{{< callout url="#" btn_hidden="true" header="false">}}
  La suppression de données via l'UI est en préversion.
{{< /callout >}}

Cette page explique comment supprimer des données de Datadog.

## Supprimer des données n'étant pas issues de Logs

Pour supprimer des données d'un produit autre que les logs, contactez [l'assistance][1] avec votre demande.

## Supprimer des données de Logs

Vous pouvez supprimer des données du produit Logs en utilisant l'UI.

### Suppression d'accès

Pour autoriser un compte à supprimer des données, procédez comme suit :

1. Sous Organizational Settingsn, allez à [Roles][3].
2. Demandez ou créez un rôle qui possède l'autorisation **Delete Data** pour le produit dont vous souhaitez supprimer les données. Par exemple, pour supprimer les données de Logs, demandez ou créez un rôle avec l'autorisation **Logs Delete Data**.

### Commencer les suppressions

<div class="alert alert-warning">Les données supprimées ne peuvent jamais être récupérées et les suppressions sont irréversibles.</div>

<div class="alert alert-info"><strong>Pour les logs</strong> : les suppressions ne peuvent pas être limitées à un index spécifique et s'appliquent aux Index, Flex Indexes et Online Archives.
</div>

Pour supprimer des données, procédez comme suit :

1. Sous Organization Settings, accédez à [Data Deletion][4].
2. Sélectionnez un produit à partir duquel supprimer des données.
3. Sélectionnez une période de temps pour la recherche.
4. Recherchez des événements à supprimer dans la période.
5. Lorsque la recherche affiche les résultats que vous souhaitez supprimer, cliquez sur le bouton **Delete** en bas à droite.
6. Il vous est demandé de confirmer la suppression en cochant une case et en saisissant un texte de confirmation. Cliquez sur **Confirm**.

La suppression commence 2 heures après la confirmation de la demande.

Pour valider une suppression, consultez l'onglet [Deletion History][5], où vous pouvez voir le statut des suppressions. Vous pouvez également rechercher les suppressions dans [Audit Trail][6] en utilisant la chaîne `@asset.name:"Data Deletion"`.

**Remarques** :
- Les suppressions commencent 2 heures après la confirmation, et les enregistrements correspondants arrivant durant cette période sont inclus dans la suppression. Dans certains cas, des enregistrements arrivant après le démarrage de la tâche peuvent ne pas être supprimés car la suppression a déjà traité la plage temporelle dans laquelle ces enregistrements sont apparus.
- Lors de la suppression d'un enregistrement, les données dérivées de cet enregistrement ne sont pas supprimées (par exemple, les métriques générées à partir de Logs).

### Arrêter les suppressions

**Remarque** : les suppressions en cours peuvent être annulées. Toutefois, cela empêche uniquement la suppression des données qui n'ont pas encore été traitées pour une tâche donnée.

Pour annuler une suppression, cliquez sur **Cancel** pour une tâche **Upcoming** ou **In Progress**.

### Auditer les suppressions

Les suppressions sont enregistrées dans [l'historique des suppressions][5] pendant 90 jours. Elles sont également consignées dans [Audit Trail][6] avec les informations de l'utilisateur ayant fait la demande.

[1]: https://www.datadoghq.com/support/
[2]: /fr/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"