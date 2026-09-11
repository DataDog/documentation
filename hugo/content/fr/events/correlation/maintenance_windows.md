---
aliases:
- /fr/service_management/events/correlation/maintenance_windows/
further_reading:
- link: events/correlation/
  tag: Documentation
  text: En savoir plus sur la corrélation d'événements
title: Fenêtres de maintenance
---
## Vue d'ensemble {#overview}
Datadog Event Management prend en charge les fenêtres de maintenance pour supprimer les notifications d'éléments de travail pendant la maintenance planifiée du système. Un élément de travail qui correspond à une condition de maintenance et qui survient pendant la fenêtre de maintenance sera automatiquement archivé.

## Créer une fenêtre de maintenance {#create-a-maintenance-window}
<div class="alert alert-danger">Vous devez disposer des autorisations d'écriture sur les paramètres partagés de gestion du travail (cases_shared_settings_write). Pour plus d'informations, consultez <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Datadog Role Permissions</a>.</div>

Pour créer une [Fenêtre de maintenance][2] :
1. Accédez à {{< ui >}}Event Management Settings{{< /ui >}}.
1. Sélectionnez {{< ui >}}Maintenance Windows{{< /ui >}} à côté de **Work Item Attributes** dans la barre de navigation de gauche.
1. Cliquez sur {{< ui >}}New Maintenance Window{{< /ui >}} en haut à droite.
1. Saisissez un nom de fenêtre de maintenance.
1. Définissez les conditions pour les éléments de travail qui doivent être impactés par cette fenêtre de maintenance en utilisant des tags ou des attributs. Par défaut, les éléments de travail Event Management héritent des tags des alertes auxquelles ils sont corrélés.
1. Sélectionnez les heures de début et de fin de la fenêtre de maintenance.
1. Vérifiez les détails de la fenêtre de maintenance et cliquez sur {{< ui >}}Save{{< /ui >}}.

Une fois enregistrée, votre fenêtre de maintenance sera ajoutée à la liste des fenêtres de maintenance où vous pourrez consulter ses détails, la mettre à jour en sélectionnant sa ligne, ou la supprimer en sélectionnant l'icône de corbeille à droite de la ligne.

## Synchroniser les fenêtres de maintenance avec les changements ServiceNow {#sync-maintenance-windows-with-servicenow-changes}

Pour synchroniser les fenêtres de maintenance avec les changements ServiceNow afin que vos changements ServiceNow créent, mettent à jour ou suppriment des fenêtres de maintenance d'éléments de travail :
1. Consultez [Transférer les demandes de changement vers Datadog][3] et suivez les étapes pour ingérer les changements ServiceNow.
1. Accédez à {{< ui >}}Event Management Settings{{< /ui >}}.
1. Sélectionnez {{< ui >}}Maintenance Windows{{< /ui >}} à côté de **Work Item Attributes** dans la barre de navigation de gauche.
1. Cliquez sur {{< ui >}}Sync from ServiceNow{{< /ui >}} en haut à droite
1. Optionnellement, définissez un filtre pour les changements ServiceNow qui doivent créer, mettre à jour ou supprimer des fenêtres de maintenance.
1. Définissez les conditions pour les éléments de travail qui doivent être impactés par cette fenêtre de maintenance en utilisant des tags ou des attributs. Vous pouvez référencer dynamiquement une valeur à partir de vos changements ServiceNow en faisant précéder l'attribut de `$`.
1. Définissez les champs de date et d'heure de changement ServiceNow qui doivent être utilisés pour les heures de début et de fin de la fenêtre de maintenance.


[1]: https://docs.datadoghq.com/fr/account_management/rbac/permissions/#case_management
[2]: https://app.datadoghq.com/event/settings/maintenance-windows
[3]: https://docs.datadoghq.com/fr/integrations/servicenow/?tab=changerequesteventforwarding#forward-change-request-events-to-datadog