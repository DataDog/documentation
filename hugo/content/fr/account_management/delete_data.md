---
description: Supprimez les données de logs de Datadog avec les autorisations appropriées,
  des requêtes basées sur le temps et la journalisation des pistes d'audit pour la
  conformité.
further_reading:
- link: /account_management/rbac/
  tag: Documentation
  text: En savoir plus sur les rôles et les autorisations
- link: /account_management/audit_trail/
  tag: Documentation
  text: Surveillez l'activité des utilisateurs avec Audit Trail.
title: Supprimer des données
---
Cette page explique comment supprimer des données sensibles qui n'auraient pas dû être ingérées dans Datadog.

## Supprimer des données autres que les logs {#delete-non-logs-data}

Pour supprimer des données d'un produit autre que Logs, contactez le [Support][1] avec votre demande.

## Supprimer des données de Logs {#delete-logs-data}

Vous pouvez supprimer des données du produit Logs en utilisant l'interface utilisateur.

### Activer la fonctionnalité de suppression {#enable-deletion-feature}

La suppression des données de Logs ne peut être activée que par les administrateurs de l'organisation. Pour activer la suppression des données de Logs :
1. Sous Organization Settings, accédez aux Préférences.
2. Activez {{< ui >}}Logs Data Deletion{{< /ui >}} et enregistrez.

Pour accorder à un utilisateur la possibilité de supprimer des Logs :
1. Sous Paramètres de l'organisation, accédez à [Roles][3].
2. Créez un rôle disposant de l'autorisation {{< ui >}}Logs Delete Data{{< /ui >}}.

### Démarrer les suppressions {#start-deletions}

<div class="alert alert-info">Une demande de suppression peut être annulée jusqu'à 10 jours après sa soumission.</div>

<div class="alert alert-danger"><strong>Pour les Logs</strong> : La suppression des données est permanente après 10 jours. Veuillez examiner attentivement vos demandes de suppression.</div>

Pour supprimer des données, effectuez les étapes suivantes :

1. Sous Organization Settings, accédez à [Data Deletion][4].
2. Sélectionnez un produit à partir duquel effectuer la suppression. 
3. Sélectionnez une période de recherche.
4. Recherchez les événements à supprimer au sein de la période définie.
5. Une fois que la recherche affiche les résultats que vous souhaitez supprimer, cliquez sur le bouton {{< ui >}}Delete{{< /ui >}} en bas à droite.
6. Confirmez la suppression en cochant la case et en saisissant le texte de confirmation demandé. 
7. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

La suppression commence instantanément après la confirmation de la demande ; les données cibles sont inaccessibles.

Depuis l'onglet [Deletion History][5], vous pouvez consulter le statut des suppressions. Vous pouvez également rechercher des suppressions dans [Audit Trail][6] en utilisant la chaîne de recherche `@asset.name:"Data Deletion"`.

**Remarques** :
- Les suppressions démarrent instantanément après confirmation. Dans certains cas, les enregistrements arrivant après le lancement de la tâche pourraient ne pas être supprimés car la suppression a déjà traité la fenêtre temporelle dans laquelle cet enregistrement est survenu.
- Lors de la suppression d'un enregistrement, les données dérivées de cet enregistrement ne sont pas supprimées (par exemple, les métriques générées à partir des Logs).
- Un maximum de 5 suppressions simultanées est pris en charge.

### Annuler les suppressions {#cancel-deletions}

**Remarque** : Lorsqu'une demande de suppression est créée, elle reste dans un état récupérable pendant 10 jours. Pendant cette période, les données supprimées sont inaccessibles dans Datadog mais récupérées si la demande de suppression est annulée.

Pour annuler une suppression, cliquez sur {{< ui >}}Cancel{{< /ui >}} sur une tâche {{< ui >}}Upcoming{{< /ui >}} ou {{< ui >}}Done (Recoverable){{< /ui >}}.

### Auditer les suppressions {#audit-deletions}

Les suppressions sont enregistrées dans [Deletion History][5] pendant 90 jours. Elles sont également enregistrées dans [Audit Trail][6] avec les détails de l'utilisateur demandeur.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/support/
[2]: /fr/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"