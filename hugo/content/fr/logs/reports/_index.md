---
title: Rapports CSV planifiés
---
## Présentation {#overview}

Les rapports CSV planifiés vous permettent de recevoir automatiquement des exportations de données structurées et récurrentes par e-mail, Slack ou Microsoft Teams. Cette fonctionnalité soutient les parties prenantes opérationnelles, de conformité et de direction en fournissant des instantanés périodiques des métriques clés sans avoir à se connecter à Datadog.

## Définissez une requête {#define-a-query}

Pour planifier un rapport CSV, la requête doit remplir les conditions suivantes :

* La requête doit être créée à partir de [Log Explorer][1]  
* Le résultat de la requête s'affiche sous forme de {{< ui >}}List{{< /ui >}} ou {{< ui >}}Table{{< /ui >}} (aucun autre type de visualisation n'est pris en charge)  
* La requête n'est pas une requête composite (pas de [sous-requêtes][2])
* La requête n'utilise pas de [calculated fields][3] ou de [Reference Tables][4]
* Le fichier CSV est limité à 50 000 lignes

## Planifiez un rapport CSV {#schedule-a-csv-report}

1. Dans [Log Explorer][1], exécutez la requête que vous souhaitez exporter.
2. Au-dessus des résultats de la requête, cliquez sur la flèche vers le bas à côté de {{< ui >}}Download as CSV{{< /ui >}}, puis sélectionnez {{< ui >}}Schedule CSV Report{{< /ui >}}.

   <!-- TODO: recapture screenshot once the NEW badge is removed from Schedule CSV Report -->
   {{< img src="logs/reports/schedule_csv_report_menu.png" alt="La barre d'outils des résultats du Log Explorer avec le menu déroulant à côté de Télécharger au format CSV développé, affichant les options Copier, Copier en tant que cURL, Partager l'événement et Planifier un rapport CSV" style="width:80%;" >}}

3. Dans la fenêtre de configuration qui s'ouvre, définissez le planning du rapport afin de déterminer quand et à quelle fréquence le rapport est envoyé.  
4. Configurez le rapport : définissez le titre du rapport et configurez une période pour déterminer l'intervalle de temps affiché dans le rapport résultant. La période du rapport peut être différente de la période affichée dans [Log Explorer].  
5. Ajoutez des destinataires :
   1. {{< ui >}}Email recipients{{< /ui >}} : Pour ajouter des destinataires par e-mail à votre rapport, saisissez leurs adresses e-mail. L'e-mail associé à votre compte Datadog est automatiquement ajouté en tant que destinataire. Vous pouvez vous retirer en tant que destinataire en survolant votre e-mail et en cliquant sur l'icône de corbeille qui apparaît à côté.  
   2. {{< ui >}}Slack recipients{{< /ui >}} : Pour ajouter des destinataires Slack, sélectionnez l'espace de travail et le canal Slack dans les menus déroulants disponibles. Si vous ne voyez aucun espace de travail Slack disponible, assurez-vous que l'intégration [Slack Integration][5] de Datadog est installée. Tous les canaux publics au sein de l'espace de travail Slack devraient être listés automatiquement. Pour sélectionner un canal Slack privé, assurez-vous d'inviter le Datadog Slack bot dans le canal sur Slack. Pour envoyer un message de test sur Slack, ajoutez un destinataire de canal et cliquez sur {{< ui >}}Send Test Message{{< /ui >}}.
   3. {{< ui >}}Microsoft Teams recipients{{< /ui >}} : Sélectionnez l'onglet {{< ui >}}Microsoft Teams{{< /ui >}}, puis choisissez un {{< ui >}}Tenant{{< /ui >}}, un {{< ui >}}Team{{< /ui >}} et un {{< ui >}}Channel{{< /ui >}} dans les menus déroulants disponibles. Assurez-vous que l'intégration [Microsoft Teams][7] est installée dans votre organisation Datadog et que l'application Datadog est ajoutée à l'équipe cible dans Microsoft Teams. Pour envoyer un message de test, ajoutez un destinataire de canal et cliquez sur {{< ui >}}Send Test Message{{< /ui >}}.

## Gestion des rapports {#managing-reports}

Pour afficher les rapports CSV, accédez à [Log Explorer][1] et cliquez sur l'onglet {{< ui >}}Reports{{< /ui >}}. 

**Remarque** : Les rapports ne sont pas liés aux [Saved Views][6] et ne sont accessibles que via l'onglet Reports. 

* Vous devez disposer de l'autorisation `CSV Report Schedules Write` pour créer vos propres planifications de rapport.
* Vous devez disposer de l'autorisation `CSV Report Schedules Manage` pour modifier les planifications de rapport d'autres utilisateurs.

Une fois un rapport créé, vous pouvez vous abonner, vous désabonner, modifier un planning et supprimer un rapport si vous disposez des autorisations appropriées. Si vous ne disposez pas des autorisations `CSV Report Schedules Write` ou `CSV Report Schedules Manage`, vous pouvez vous désabonner du rapport directement depuis un e-mail.

## Vues des rapports {#reports-views}

| Vue des rapports                         | Description                                                                     | Permission requise           |
| ----------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| {{< ui >}}Created by you{{< /ui >}} | Affiche tous les Scheduled CSV Reports que vous avez créés depuis [Log Explorer] | `CSV Report Schedules Write`  |
| {{< ui >}}All Reports{{< /ui >}}    | Affiche tous les Scheduled CSV Reports dans [Log Explorer] pour l'organisation dans laquelle vous vous trouvez | `CSV Report Schedules Manage` |
| {{< ui >}}Subscribed{{< /ui >}}     | Affiche tous les Scheduled CSV Reports auxquels vous êtes abonnés                      | `CSV Report Schedules Write`  |

[1]: https://app.datadoghq.com/logs
[2]: /fr/logs/explorer/advanced_search/#filter-logs-with-subqueries
[3]: /fr/logs/explorer/calculated_fields/
[4]: /fr/reference_tables/?tab=manualupload
[5]: /fr/integrations/slack/?tab=datadogforslack
[6]: /fr/logs/explorer/saved_views/#saved-views
[7]: /fr/integrations/microsoft_teams/