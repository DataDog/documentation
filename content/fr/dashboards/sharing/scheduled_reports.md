---
aliases:
- /fr/dashboards/reporting/
- /fr/dashboards/scheduled_reports/
description: Envoyez des PDF récurrents de dashboards à des adresses e-mail et des
  canaux Slack avec des programmes et des délais personnalisables.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Partager des dashboards Datadog en toute sécurité avec n'importe qui
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utiliser les template variables associées pour affiner vos dashboards
title: Rapports programmés
---

## Présentation

Les rapports programmés permettent aux utilisateurs Datadog de partager des dashboards sous forme de PDF haute densité de manière récurrente.

{{< img src="dashboards/scheduled_reports/report_pdf.png" alt="Exemple de pièce jointe PDF d'un rapport" style="width:90%;" >}}

Le PDF du rapport peut être envoyé vers des canaux Slack ou des adresses e-mail.

{{< img src="dashboards/scheduled_reports/report_slack.png" alt="Exemple de message Slack avec lien vers le rapport PDF" style="width:90%;" >}}

Pour les e-mails, le PDF du rapport est inclus en pièce jointe ou sous forme de lien, selon sa taille.

{{< img src="dashboards/scheduled_reports/report_email.png" alt="Exemple d'e-mail de rapport avec pièce jointe PDF" style="width:90%;" >}}

## Programmer un rapport

Créez un rapport à partir de n'importe quel [dashboard ou timeboard][1] comportant au moins un [widget pris en charge](#unsupported-widget-types).

Cliquez sur le bouton **Share** en haut de votre dashboard et sélectionnez **Schedule report**.

### 1. Définir un programme

Dans la fenêtre de configuration qui s'ouvre, définissez un programme pour le rapport afin de déterminer quand et à quelle fréquence il est envoyé.

**{{< img src="dashboards/scheduled_reports/set_schedule.png" alt="Section de définition du programme d'un rapport. Comprend un tableau de prévisualisation du programme affichant les 5 prochaines dates d'envoi." style="width:90%;" >}}**

### 2. Configurer le rapport

Définissez le titre du rapport et configurez un intervalle de temps pour déterminer la plage temporelle affichée dans le rapport généré. L'intervalle de temps du rapport peut être différent de celui affiché sur le dashboard.

**Remarque :** La modification de l'intervalle de temps du rapport met à jour le tableau déroulant **Schedule Preview** ci-dessus.

**{{< img src="dashboards/scheduled_reports/configure_report.png" alt="Section de définition du programme d'un rapport" style="width:90%;" >}}**

Cliquez sur **Edit Variables** pour modifier les filtres appliqués lors de l'envoi du rapport. Ces valeurs n'affectent pas les valeurs par défaut des template variables du dashboard.

**{{< img src="dashboards/scheduled_reports/edit_variables.png" alt="Section de la fenêtre de configuration pour personnaliser le titre, l'intervalle de temps et les variables du rapport." style="width:90%;" >}}**

### 3. Ajouter des destinataires

#### Destinataires par e-mail

Pour ajouter des destinataires par e-mail à votre rapport, saisissez leurs adresses e-mail. L'adresse e-mail associée à votre compte Datadog est automatiquement ajoutée en tant que destinataire. Vous pouvez vous retirer de la liste des destinataires en passant la souris sur votre adresse e-mail et en cliquant sur l'icône de corbeille qui apparaît.

**Remarque :** les comptes Enterprise et Pro peuvent envoyer des rapports à des destinataires extérieurs à leur organisation. 

**{{< img src="dashboards/scheduled_reports/add_email_recipients.png" alt="La fenêtre de configuration pour modifier les variables des rapports programmés." style="width:90%;" >}}**

Pour visualiser le rapport avant d'enregistrer le programme, cliquez sur **Send Test Email**. Vous pouvez mettre en pause un programme de rapport à tout moment.

#### Destinataires Slack

Pour ajouter des destinataires Slack, sélectionnez l'espace de travail et le canal Slack dans les listes déroulantes disponibles. Si aucun espace de travail Slack n'est disponible, vérifiez que l'[intégration Slack][8] Datadog est installée. Tous les canaux publics de l'espace de travail Slack devraient être répertoriés automatiquement. Pour sélectionner un canal Slack privé, invitez le bot Slack Datadog dans le canal depuis Slack. Pour envoyer un message de test sur Slack, ajoutez un canal destinataire et cliquez sur **Send Test Message**.

**{{< img src="dashboards/scheduled_reports/add_slack_recipients.png" alt="La fenêtre de configuration pour modifier les destinataires e-mail des rapports programmés." style="width:90%;" >}}**

## Gérer les rapports

Un même dashboard peut avoir plusieurs rapports programmés avec des paramètres différents, ce qui vous permet d'informer différents groupes de parties prenantes intéressés par le même dashboard. Pour consulter les rapports d'un dashboard existant, cliquez sur le bouton **Share** et sélectionnez **Configure Reports**.

Depuis la fenêtre de configuration qui s'ouvre, vous pouvez mettre en pause un rapport existant ou en créer un nouveau. Pour consulter et modifier les détails d'un rapport existant, ou le supprimer, cliquez sur **Edit**.

{{< img src="dashboards/scheduled_reports/manage_reports-2.png" alt="La fenêtre de configuration des rapports programmés, affichant deux rapports avec leur titre, leurs tags, leurs destinataires, leur fréquence, une option pour activer ou désactiver le rapport et un bouton de modification. En bas figurent un bouton pour ajouter un nouveau rapport et un bouton d'annulation." style="width:90%;" >}}

## Autorisations

Les utilisateurs doivent disposer de l'[autorisation][2] **Dashboards Report Write** pour créer et modifier des programmes de rapports.
Cette autorisation peut être accordée par un autre utilisateur disposant de l'autorisation **User Access Manage**.

{{< img src="dashboards/scheduled_reports/dashboard_permissions-2.png" alt="Capture d'écran des autorisations d'un utilisateur individuel depuis la page des paramètres de l'organisation. L'autorisation d'écriture des rapports de dashboards est mise en évidence dans la section dashboards." style="width:90%;" >}}

Les utilisateurs disposant de l'autorisation **Org Management** peuvent activer ou désactiver la fonctionnalité de rapports programmés pour leur organisation depuis l'onglet **Settings** sous [Public Sharing][3] dans **Organization Settings**.

{{< img src="dashboards/scheduled_reports/report_management_org_preference.png" alt="Le paramètre Report Management dans l'onglet Settings sous Public Sharing dans Organization Settings de Datadog, avec le paramètre activé." style="width:90%;" >}}

De plus, les utilisateurs disposant de l'autorisation **Org Management** peuvent activer ou désactiver les destinataires Slack pour leur organisation depuis l'onglet **Settings** sous [Public Sharing][3] dans **Organization Settings**.

{{< img src="dashboards/scheduled_reports/report_send_to_slack_org_preference.png" alt="Le paramètre Send to Slack sous Report Management dans l'onglet Settings sous Public Sharing dans Organization Settings de Datadog, avec le paramètre activé." style="width:90%;" >}}

## Types de widgets non pris en charge

Les types de widgets suivants ne sont **pas** pris en charge et s'affichent vides dans le rapport :

-   [Iframe][4]
-   [Image][5]
-   [Hostmap][6]
-   [Run Workflow][7]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/#get-started
[2]: /fr/account_management/rbac/permissions/
[3]: /fr/account_management/org_settings/#public-sharing
[4]: /fr/dashboards/widgets/iframe/
[5]: /fr/dashboards/widgets/image/
[6]: /fr/dashboards/widgets/hostmap/
[7]: /fr/dashboards/widgets/run_workflow/
[8]: /fr/integrations/slack/?tab=datadogforslack