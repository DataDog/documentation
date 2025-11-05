---
app_id: microsoft-teams
app_uuid: b37c5433-6bdd-4f37-9f7e-a60d61032c33
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 203
    source_type_name: Microsoft Teams
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- network
- notifications
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_teams
integration_id: microsoft-teams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_teams
public_title: Microsoft Teams
short_description: Microsoft Teams est l'espace de travail collaboratif basé sur la
  messagerie dans Office 365, qui intègre les personnes, le contenu et les outils.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Network
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: Microsoft Teams est l'espace de travail collaboratif basé sur la messagerie
    dans Office 365, qui intègre les personnes, le contenu et les outils.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Teams
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Intégrez Microsoft Teams pour :


{{< site-region region="us,us3,us5,eu,ap1" >}}

- Être informé des événements et des alertes Datadog dans Microsoft Teams
- Gérer les incidents depuis Microsoft Teams
- Masquez les monitors déclenchés directement depuis Microsoft Teams.
{{< /site-region >}}


{{< site-region region="gov" >}}
- Être informé des événements et des alertes Datadog dans Microsoft Teams
- Masquez les monitors déclenchés directement depuis Microsoft Teams.
{{< /site-region >}}



{{< site-region region="gov" >}}
**Remarque** : bien que votre compte Datadog soit hébergé dans l'environnement sécurisé US1-FED, vous êtes responsable de la gestion de la sécurité de votre environnement Microsoft Teams, y compris les accès, les autorisations et la protection des données.
{{< /site-region >}}


## Configuration

{{< tabs >}}

{{% tab "Datadog App (Recommended)" %}}

### Publier les notifications de monitor dans un canal Microsoft Teams

Connectez votre tenant (environnement) Microsoft à Datadog.

1. Dans Datadog, accédez à [**Integrations > Microsoft Teams**][1].
2. Cliquez sur **Add Tenant**, ce qui vous redirige vers Microsoft.
3. Suivez les instructions, puis cliquez sur **OK**.


{{< site-region region="us,us3,us5,eu,ap1" >}}
Assurez-vous d'avoir ajouté l'application Datadog à toutes les équipes dans lesquelles vous souhaitez recevoir des notifications Datadog.
{{< /site-region >}}


{{< site-region region="gov" >}}
Assurez-vous d'avoir ajouté l'application Datadog for Government à toutes les équipes dans lesquelles vous souhaitez recevoir des notifications Datadog.
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Ouvrez Microsoft Teams.
2. Dans la barre d'outils verticale, cliquez sur **Apps**.
3. Recherchez "Datadog" et cliquez sur **Open**.
4. Dans la fenêtre modale qui s'affiche, sélectionnez le canal principal de l'équipe où l'application doit être ajoutée. Cliquez sur **Go** pour finaliser l'installation.
   {{< /site-region >}}



{{< site-region region="gov" >}}

1. Ouvrez Microsoft Teams.
2. Dans la barre d'outils verticale, cliquez sur **Apps**.
3. Recherchez "Datadog for Government" et cliquez sur **Open**.
4. Dans la fenêtre modale qui s'affiche, sélectionnez le canal principal de l'équipe où l'application doit être ajoutée. Cliquez sur **Go** pour finaliser l'installation.
   {{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams Ajouter l'application à une équipe" >}}
{{< /site-region >}}


{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_gov_app_to_team.png" alt="Microsoft Teams Ajouter l'application à une équipe" >}}
{{< /site-region >}}


Une fois le bot ajouté à l'équipe, configurez le handle de notification dans Datadog.

1. Sous un tenant configuré, cliquez sur **Add Handle**. Donnez un nom au handle, sélectionnez l'équipe et le canal souhaités dans les menus déroulants, puis cliquez sur **Save**.

### Migrer les anciens connecteurs vers l'intégration basée sur les tenants

Microsoft a annoncé que les connecteurs Office 365 pour Microsoft Teams sont obsolètes. Cela a les effets suivants :

- Tous les connecteurs Datadog cesseront de fonctionner le 31 janvier 2025.
- Les connecteurs webhook entrants sans [URL mise à jour][2] cesseront de fonctionner le 31 janvier 2025.
- Tous les connecteurs cesseront de fonctionner le 31 décembre 2025 (au lieu du 1er octobre 2024 précédemment).

Consultez l'[article de blog de Microsoft][3] pour plus d'informations.

Pour migrer tous les handles de notification actuellement basés sur les anciens connecteurs Office 365 vers l'intégration Datadog basée sur les tenants :


{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Suivez les [étapes de configuration](#setup) pour connecter votre tenant Microsoft à Datadog.
2. Ajoutez l'application Datadog à toutes les équipes où un ancien connecteur Office 365 est configuré.
3. Pour chaque ancien handle de connecteur de notification hérité dans le [carré d'intégration Microsoft Teams][861] :
   1. Sous le tenant configuré, cliquez sur **Add Handle**.
   2. Donnez au nouveau handle le même nom que le handle du connecteur. Par exemple, si votre ancien handle de connecteur est nommé `channel-123`, créez un nouveau handle dans la configuration du tenant avec le nom `channel-123`.
   3. Sélectionnez l'équipe et le canal cibles dans les menus déroulants, ceux auxquels l'ancien handle envoyait les messages, puis cliquez sur **Save**. Ce nouveau handle remplace l'ancien handle.

[861]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}



{{< site-region region="gov" >}}

1. Suivez les [étapes de configuration](#setup) pour connecter votre tenant Microsoft à Datadog.
2. Ajoutez l'application Datadog for Government à toutes les équipes où un ancien connecteur Office 365 est configuré.
3. Pour chaque handle d'ancien connecteur de notification dans le [carré d'intégration Microsoft Teams][871] :
   1. Sous le tenant configuré, cliquez sur **Add Handle**.
   2. Donnez au nouveau handle le même nom que le handle du connecteur. Par exemple, si votre ancien handle de connecteur est nommé `channel-123`, créez un nouveau handle dans la configuration du tenant avec le nom `channel-123`.
   3. Sélectionnez l'équipe et le canal cibles dans les menus déroulants, ceux auxquels l'ancien handle envoyait les messages, puis cliquez sur **Save**. Ce nouveau handle remplace l'ancien handle.

[871]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}


### Utilisation

Depuis un monitor Datadog, envoyez une notification vers Microsoft Teams en utilisant la [fonctionnalité `@-notification`][4]. Envoyez la notification à l'adresse `@teams-<HANDLE>`, en remplaçant `<HANDLE>` par le nom de votre handle Microsoft Teams. Pour masquer un monitor déclenché depuis Microsoft Teams, cliquez sur **Mute Monitor**, sélectionnez une **durée de masquage** puis cliquez sur **Mute**.

#### Mentions d'utilisateur

Les mentions d'utilisateur permettent de notifier des utilisateurs spécifiques dans vos canaux Microsoft Teams lorsque des alertes de monitor sont déclenchées. Cela garantit que les bonnes personnes sont informées des événements importants. Pour mentionner un utilisateur spécifique, suivez les étapes ci-dessous pour trouver son User Principal Name (UPN).

**Syntaxe** : `<at>{User Principal Name}</at>`

**Exemple** : `<at>user@microsoft.com</at>`

**Exemple de notification complète** : `@teams-NOM_DU_HANDLE <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**Pour trouver le User Principal Name (UPN) d'un utilisateur :**

1. **Méthode 1 (fonctionne uniquement si l'UPN correspond à l'e-mail) :**
   - Dans Microsoft Teams, cliquez sur la photo de profil ou le nom de l'utilisateur pour ouvrir sa fiche de contact.
   - L'e-mail affiché dans le champ `Chat` est souvent l'UPN. S'il est différent, utilisez la méthode 2 ci-dessous.

2. **Méthode 2 (fonctionne toujours, mais nécessite des droits dans Azure Portal) :**
   - Connectez-vous au [portail Microsoft Azure][5].
   - Accédez à `Microsoft Entra ID` > `Gérer` > `Utilisateurs`
   - Trouvez l'utilisateur dans la liste et copiez son UPN dans la colonne `User principal name`.

Datadog recommande de tester vos notifications de monitor pour garantir leur bonne livraison. Consultez la section [Notifications de test][6] pour obtenir des instructions.

#### Dashboards

Vous pouvez publier des captures de widgets de dashboard dans n'importe quel canal ou discussion Teams. Pour la liste des widgets pris en charge, voir [Rapports programmés][7].

Pour partager un widget de dashboard dans Teams :

1. Dans Datadog, survolez un widget de dashboard et appuyez sur `CMD + C` ou `CTRL + C`, ou cliquez sur le bouton **Copy** dans le menu de partage.
2. Collez le lien dans Teams.


{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/dashboard_share.png" alt="Partage d'un widget de dashboard dans Microsoft Teams">}}
{{< /site-region >}}



{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/dashboard_share_gov.png" alt="Partage d'un widget de dashboard dans Microsoft Teams">}}
{{< /site-region >}}


### Restreindre les modifications

Par défaut, tous les utilisateurs ont un accès complet aux tenants Microsoft Teams connectés.

Utilisez le [contrôle d'accès granulaire][8] pour limiter quels rôles peuvent modifier un tenant spécifique :

1. Lors de la consultation d'un tenant, cliquez sur l'icône d'engrenage en haut à droite pour ouvrir le menu des paramètres.
2. Sélectionnez **Permissions**.
3. Cliquez sur **Restrict Access**. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
4. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs autorisés à modifier le tenant Microsoft Teams.
5. Cliquez sur **Add**. La boîte de dialogue se met à jour pour indiquer que le rôle sélectionné dispose de l'autorisation **Editor**.
6. Cliquez sur **Save**.

**Remarque :** pour conserver votre propre accès en modification au tenant, vous devez inclure au moins un rôle auquel vous appartenez avant de sauvegarder.

Si vous avez un accès en modification, vous pouvez restaurer l'accès général à un tenant restreint en suivant les étapes suivantes :

1. Lors de la consultation du tenant, cliquez sur l'icône d'engrenage en haut à droite pour ouvrir le menu des paramètres.
2. Sélectionnez **Permissions**.
3. Cliquez sur **Restore Full Access**.
4. Cliquez sur **Save**.

Pour modifier les autorisations du tenant via l'API :

1. Accédez au [carré d'intégration Microsoft Teams][4].
2. Cliquez sur l'onglet **Tenants**.
3. Copiez l'ID du tenant affiché pour le tenant sélectionné.
4. Utilisez l'[API Restriction Policies][9], en précisant le type de ressource `integration-account` et l'ID `microsoft-teams:<tenant_id>`.


[1]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[2]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[3]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[4]: https://app.datadoghq.com/integrations/microsoft-teams
[5]: https://portal.azure.com
[6]: https://docs.datadoghq.com/fr/monitors/notify/#test-notifications
[7]: https://docs.datadoghq.com/fr/dashboards/scheduled_reports/
[8]: https://docs.datadoghq.com/fr/account_management/rbac/granular_access/
[9]: https://docs.datadoghq.com/fr/api/latest/restriction-policies/
{{% /tab %}}

{{% tab "Microsoft Workflows Webhooks" %}}

### Que sont les webhooks Microsoft Workflows ?

Workflows / Power Automate est un produit Microsoft permettant de créer des workflows automatisés. Microsoft Workflows peut être utilisé pour envoyer des notifications via des webhooks entrants. Si vous ne pouvez pas installer l'application Datadog dans votre tenant Microsoft Teams (recommandé), ou si vous souhaitez envoyer des notifications vers des canaux privés, vous pouvez configurer des handles Datadog pour envoyer des notifications dans Microsoft Teams via Microsoft Workflows. Cette intégration est conçue pour être utilisée avec le modèle suivant de Microsoft Workflows : [Publier sur un canal lorsqu’une demande de webhook est reçue][1]

{{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template.png" alt="Publier sur un canal lorsqu’une demande de webhook est reçue]" style="width:30%;" >}}

### Vous migrez les anciens connecteurs vers l'intégration Microsoft Workflows Webhooks ?

Microsoft a [annoncé][2] que les connecteurs Office 365 pour Microsoft Teams vont devenir obsolètes, et que les URL de connecteurs existants cesseront de fonctionner le 31 janvier 2025. Microsoft recommande d'utiliser les webhooks entrants Microsoft Workflows comme remplacement. Suivez les étapes ci-dessous pour migrer tous les handles de notification actuellement basés sur les anciens connecteurs vers l'intégration webhooks Microsoft Workflows de Datadog.

Pour chaque ancien handle connecteur de notification dans le carré d'intégration Microsoft Teams :

1. - Suivez les [étapes de configuration](#creer-un-webhook-microsoft-workflows) pour créer un handle webhook de workflow pour le canal Microsoft Teams cible.
2. Dans la section Microsoft Workflows Webhooks, donnez au nouveau handle le même nom que celui du connecteur qu'il remplace. Par exemple, si votre ancien handle s'appelle `channel-123`, nommez le nouveau handle dans la section Microsoft Workflows Webhooks `channel-123`. Ce nouveau handle remplace l'ancien.

### Créer un webhook Microsoft Workflows

#### Prérequis

- Pour créer un nouveau workflow, un compte Microsoft est nécessaire à la fois pour posséder le workflow et pour envoyer les notifications aux canaux (ces deux comptes peuvent être différents).
- Le compte propriétaire du workflow (configuré à l'étape 2 ci-dessous) est celui qui peut modifier et renouveler le workflow. Pour un accès partagé plus facile, utilisez un compte de service.
- Le compte qui envoie les notifications aux canaux (configuré à l'étape 8 ci-dessous) publie les messages en tant qu'utilisateur de ce compte. Ce compte doit être membre de l'équipe cible. Pour envoyer vers un canal privé, ce compte doit aussi être ajouté à ce canal. Si vous souhaitez lui donner un nom comme Notifications Datadog, utilisez un compte de service.

#### Instructions

**Remarque :** la plupart des étapes suivantes se déroulent dans Microsoft Workflows. Microsoft peut modifier son interface, et les étapes ci-dessous peuvent ne pas toujours correspondre exactement.

1. Dans Microsoft Teams, ajoutez l'application [Workflows][3] à toutes les équipes que vous souhaitez notifier. Si vous ne pouvez pas l'ajouter, suivez les instructions de la section « Canaux privés » ci-dessous.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_1.png" alt="Instructions (étape 1)" style="width:90%;" >}}
2. Créez un nouveau workflow dans Power Automate en utilisant le modèle [Publier sur un canal lorsqu’une demande de webhook est reçue][1].
3. Choisissez le compte Microsoft que vous souhaitez utiliser comme propriétaire du workflow (un compte de service est recommandé pour un accès partagé), puis cliquez sur **Continue**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_3.png" alt="Instructions (étape 3)" style="width:90%;" >}}
4. Cliquez sur **Editer en mode avancé**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_4.png" alt="Instructions (étape 4)" style="width:90%;" >}}
5. Déroulez **Envoyer chaque carte adaptative**, puis cliquez sur **Publier une carte sur un chat ou un canal**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template_dropdown_step_5.png" alt="Instructions (étape 5)" style="width:90%;" >}}
6. Utilisez le menu déroulant **Publier en tant que** pour définir **Publier en tant que** sur **Bot Flow**. Les notifications apparaîtront comme envoyées par « `<NAME>` via Workflows ». Pour recevoir ces notifications, l'application Workflows doit être ajoutée à l'équipe cible. Pour les canaux privés, **Publier en tant que** doit être défini sur un utilisateur membre du canal. Consultez la section « Canaux privés » ci-dessous pour en savoir plus. **Remarque :** changer la valeur de **Publier en tant que** réinitialise le champ **Publier dans**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_6.png" alt="Instructions (étape 6)" style="width:90%;" >}}
7. Pour accéder aux menus déroulants équipe et canal, retirez les symboles @ en les supprimant ou en cliquant sur les icônes **X**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_7.png" alt="Instructions (étape 7)" style="width:90%;" >}}
8. Utilisez les menus déroulants pour sélectionner l'équipe et le canal souhaités.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_8.png" alt="Instructions (étape 8)" style="width:90%;" >}}
9. Assurez-vous que le workflow est connecté au compte Microsoft utilisé pour envoyer les notifications (par exemple un compte de service nommé « Notifications Datadog »). Les notifications apparaîtront comme envoyées par « `<NAME>` via Workflows ». Ce compte doit avoir accès au canal Microsoft Teams configuré. Pour changer de compte, cliquez sur **Modifier la connexion** et suivez les instructions pour configurer un autre compte Microsoft.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_9.png" alt="Instructions (étape 9)" style="width:90%;" >}}
10. Cliquez sur le bouton **Save**.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_10.png" alt="Instructions (étape 10)" style="width:90%;" >}}
11. Pour récupérer le lien webhook, cliquez sur le premier bloc du workflow.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_11.png" alt="Instructions (étape 11)" style="width:50%;" >}}
12. Assurez-vous que **N'importe qui** peut déclencher le processus, puis copiez le lien.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_12.png" alt="Instructions (étape 12)" style="width:90%;" >}}
13. Cliquez sur le bouton **Retour** pour revenir au tableau de bord du workflow.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_13.png" alt="Instructions (étape 13)" style="width:90%;" >}}
14. Assurez-vous que le workflow est activé. Si ce n'est pas le cas, cliquez sur **Activer**.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_14.png" alt="Instructions (étape 14)" style="width:90%;" >}}
15. Dans Datadog, accédez à [**Integrations > Microsoft Teams**][4].
16. Dans l'onglet Configuration, accédez à la section Microsoft Workflows Webhooks et cliquez sur **Add Handle**. Donnez un nom au handle (si vous migrez un ancien handle, utilisez le même nom), puis collez l'URL du webhook.
17. Cliquez sur **Save**.

### Canaux privés

Pour envoyer des notifications vers des canaux privés, le compte configuré dans le bloc **Publier une carte sur un chat ou un canal** doit avoir accès au canal. Cela permet au workflow d'envoyer des notifications au nom de ce compte.

1. Dans le bloc **Publier une carte sur un chat ou un canal**, remplacez **Publier en tant que** par **Utilisateur**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_1.png" alt="Instructions relatives aux canaux privés (étape 1)" style="width:30%;" >}}
2. Ensuite, pour choisir le compte, cliquez sur **Modifier la connexion** et suivez les instructions pour sélectionner un autre compte.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_2.png" alt="Instructions relatives aux canaux privés (étape 2)" style="width:90%;" >}}

### Limites

- Si vous êtes client Microsoft 365, les workflows sont automatiquement désactivés après 90 jours sans déclenchement réussi. Lorsqu’un workflow approche de l’expiration, Microsoft envoie un e-mail au propriétaire du workflow. Vous pouvez réinitialiser ce délai de 90 jours en exécutant un test dans Microsoft Workflows.
- Lorsque vous utilisez le modèle, tous les messages sont accompagnés d'une ligne indiquant qui a créé le workflow, ainsi qu’un lien vers le modèle utilisé.
  {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_used_a_template.png" alt="L'utilisateur a utilisé un modèle" style="width:90%;" >}}

  Pour supprimer cette mention, allez dans votre workflow et cliquez sur **Enregistrer sous** pour en créer une copie, puis ouvrez cette copie depuis la section **Mes flux**. Utilisez ensuite l’URL du webhook de cette copie à la place de l’original.

- Microsoft Workflows ne prend pas en charge les fonctionnalités interactives dans les messages (comme le masquage de monitor directement depuis Microsoft Teams).
- Microsoft Workflows ne prend pas en charge les canaux partagés.
- Microsoft Workflows ne prend pas en charge les mentions d'utilisateur quand le webhook Workflows est publié en tant qu’utilisateur.

### Utilisation

Depuis un monitor Datadog, envoyez une notification vers MicrosoftMTeams en utilisant la [fonctionnalité `@-notification`][1]. Envoyez la notification à l'adresse `@teams-<HANDLE>`, en remplaçant `<HANDLE>` par le nom de votre handle Microsoft Teams.

#### Mentions d'utilisateur avec les handles Microsoft Workflows Webhooks

Les mentions d'utilisateur permettent de notifier des utilisateurs spécifiques dans vos canaux Microsoft Teams lorsque des alertes de monitor sont déclenchées. Cela garantit que les bonnes personnes sont averties des événements importants. Pour mentionner un utilisateur spécifique, suivez les étapes ci-dessous pour trouver son User Principal Name (UPN).

**Syntaxe** : `<at>{User Principal Name}</at>`

**Exemple** : `<at>user@microsoft.com</at>`

**Exemple de notification complète** : `@Teams-CHANNEL_NAME <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**Pour trouver le User Principal Name (UPN) d'un utilisateur :**

1. **Méthode 1 (fonctionne uniquement si l'UPN correspond à l'adresse e-mail) :** 
   - Dans Microsoft Teams, cliquez sur la photo de profil ou le nom de l'utilisateur pour ouvrir sa fiche de contact. 
   - L'adresse e-mail affichée dans le champ `Chat` est souvent l'UPN. Si elle est différente, utilisez la méthode 2 ci-dessous.

2. **Méthode 2 (fonctionne toujours, mais nécessite un accès au portail Azure) :**
   - Connectez-vous au [portail Microsoft Azure][5].
   - Accédez à `Microsoft Entra ID` > `Gérer` > `Utilisateurs`
   - Trouvez l'utilisateur dans la liste et copiez son UPN dans la colonne `User principal name`.

<div class="alert alert-danger">Les mentions d'utilisateur ne sont PAS prises en charge pour les handles de type Webhook Workflows publiés en tant qu'utilisateur (pour les canaux privés). Inclure une mention d'utilisateur dans ce cas entraînera un échec. Pour inclure des mentions d'utilisateur avec Workflows Webhooks, vous devez utiliser le bot Flow.</div>

Datadog recommande de tester vos notifications de monitor pour garantir leur bonne livraison. Consultez la section [Notifications de test][6] pour obtenir des instructions.

### Restreindre les modifications

Par défaut, tous les utilisateurs ont un accès complet à chaque handle de webhook Microsoft Workflows.

Utilisez le [contrôle d'accès granulaire][7] pour limiter les rôles pouvant modifier un handle de webhook Workflows spécifique :

1. Lors de l'affichage des **Webhooks Workflows**, survolez un handle pour afficher les actions à droite de la ligne.
2. Cliquez sur l'icône de cadenas intitulée **Permissions**.
3. Cliquez sur **Restrict Access**. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
4. Utilisez la liste déroulante pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs pouvant modifier le handle de webhook Workflows.
5. Cliquez sur **Add**. La boîte de dialogue se met à jour pour indiquer que le rôle sélectionné dispose de l'autorisation **Editor**.
6. Cliquez sur **Save**.

**Remarque :** pour conserver votre accès en modification au handle de webhook Workflows, vous devez inclure au moins un rôle auquel vous appartenez avant de sauvegarder. 

Si vous disposez d'un accès en modification, vous pouvez rétablir l'accès général à un handle de webhook Workflows restreint en suivant les étapes suivantes :

1. Lors de l'affichage des **Webhooks Workflows**, survolez le handle restreint pour afficher les actions à droite de la ligne.
2. Cliquez sur l'icône du cadenas intitulé **Permissions**.
3. Cliquez sur **Restore Full Access**.
4. Cliquez sur **Save**.

Pour modifier les autorisations relatives aux workflows Webhooks par le biais de l'API :

1. Récupérez les identifiants des Webhooks Workflows en utilisant l'[API d'intégration Microsoft Teams][8].
2. Utilisez l'[API Restriction Policies][9], où le type de ressource est `integration-webhook` et l'ID est `microsoft-teams:<workflows_webhook_id>`.


[1]: https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://teams.microsoft.com/l/app/c3a1996d-db0f-4857-a6ea-7aabf0266b00?source=app-details-dialog
[4]: https://app.datadoghq.com/integrations/microsoft-teams
[5]: https://portal.azure.com
[6]: https://docs.datadoghq.com/fr/monitors/notify/#test-notifications
[7]: https://docs.datadoghq.com/fr/account_management/rbac/granular_access/
[8]: https://docs.datadoghq.com/fr/api/latest/microsoft-teams-integration/#get-all-workflows-webhook-handles
[9]: https://docs.datadoghq.com/fr/api/latest/restriction-policies/
{{% /tab %}}

{{% tab "Connectors (Deprecated)" %}}

### Migrer les anciens connecteurs vers l'intégration basée sur les tenants

Microsoft a annoncé que les connecteurs Office 365 pour Microsoft Teams sont obsolètes. Cela a les effets suivants :

- Tous les connecteurs Datadog cesseront de fonctionner le 31 janvier 2025.
- Les connecteurs webhook entrants sans [URL mise à jour][2] cesseront de fonctionner le 31 janvier 2025.
- Tous les connecteurs cesseront de fonctionner le 31 décembre 2025 (au lieu du 1er octobre 2024 précédemment).

Consultez l'[article de blog de Microsoft][2] pour plus d'informations.

Pour migrer tous les handles de notification utilisant actuellement les anciens connecteurs Office 365 vers l'application Datadog basée sur les tenants :


{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Suivez les [étapes de configuration][992] pour connecter votre tenant Microsoft à Datadog.
2. Ajoutez l'application Datadog à toutes les équipes où un ancien connecteur Office 365 est configuré.
3. Pour chaque ancien handle de connecteur de notification dans le [carré d'intégration Microsoft Teams][991] :
   1. Sous le tenant configuré, cliquez sur **Add Handle**.
   2. Donnez au nouveau handle le même nom que le handle du connecteur. Par exemple, si votre ancien handle de connecteur est nommé `channel-123`, créez un nouveau handle dans la configuration du tenant avec le nom `channel-123`.
   3. Sélectionnez l'équipe et le canal cibles dans les menus déroulants, ceux auxquels l'ancien handle envoyait les messages, puis cliquez sur **Save**. Ce nouveau handle remplace l'ancien handle.

[991]: https://app.datadoghq.com/integrations/microsoft-teams
[992]: https://docs.datadoghq.com/fr/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}



{{< site-region region="gov" >}}

1. Suivez les [étapes de configuration][982] pour connecter votre tenant Microsoft à Datadog.
2. Ajoutez l'application Datadog for Government à toutes les équipes où un ancien connecteur Office 365 est configuré.
3. Pour chaque ancien handle de connecteur de notification dans le [carré d'intégration Microsoft Teams][981] :
   1. Sous le tenant configuré, cliquez sur **Add Handle**.
   2. Donnez au nouveau handle le même nom que le handle du connecteur. Par exemple, si votre ancien handle de connecteur est nommé `channel-123`, créez un nouveau handle dans la configuration du tenant avec le nom `channel-123`.
   3. Sélectionnez l'équipe et le canal cibles dans les menus déroulants, ceux auxquels l'ancien handle envoyait les messages, puis cliquez sur **Save**. Ce nouveau handle remplace l'ancien handle.

[981]: https://app.datadoghq.com/integrations/microsoft-teams
[982]: https://docs.datadoghq.com/fr/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}


### Migration des anciens connecteurs vers l'intégration Microsoft Workflows Webhooks

Microsoft a annoncé que les connecteurs Office 365 pour Microsoft Teams sont obsolètes. Cela a les effets suivants :

- Tous les connecteurs Datadog cesseront de fonctionner le 31 janvier 2025.
- Les connecteurs webhook entrants sans [URL mise à jour][2] cesseront de fonctionner le 31 janvier 2025.
- Tous les connecteurs cesseront de fonctionner le 31 décembre 2025 (au lieu du 1er octobre 2024 précédemment).

Consultez l'[article de blog de Microsoft][2] pour plus d'informations.

Pour migrer tous les handles de notification utilisant actuellement les anciens connecteurs Office 365 vers l'intégration Microsoft Workflows Webhooks de Datadog, consultez la page dédiée aux [Webhooks de Microsoft Workflows][3].

### Configuration du connecteur (obsolète)

<div class="alert alert-info">
Les anciens handles de notification ne sont pas affectés par la nouvelle configuration <em>sauf si</em> vous utilisez le même <code>@teams-NOM_DU_HANDLE</code>, auquel cas la nouvelle configuration remplace l'ancienne.
</div>

1. Cliquez sur le bouton `...` à proximité du nom du canal dans la liste des canaux, puis choisissez **Connectors**.

   {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams (étape 1)" >}}

2. Recherchez Datadog et cliquez sur **Configure**.

   {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams (étape 2)" >}}

3. Dans la fenêtre de configuration du connecteur, copiez l'URL du webhook.
4. Dans Datadog, accédez à [**Integrations > Microsoft Teams**][4].
5. Dans l'onglet Configuration, cliquez sur **Add Handle**, donnez un nom au handle et collez l'URL du webhook.
6. Dans la fenêtre de configuration du connecteur, cliquez sur **Save**.


[1]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://docs.datadoghq.com/fr/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[4]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}
{{< /tabs >}}


{{< site-region region="us,us3,us5,eu,ap1" >}}

## Utiliser la solution Incident Management Datadog depuis Microsoft Teams

### Configuration du compte

Commencez par installer l'application Datadog dans Microsoft Teams :

1. Ouvrez Microsoft Teams.
2. Dans la barre d'outils verticale, cliquez sur **Apps**.
3. Recherchez « Datadog » et cliquez sur **Ouvrir**.
4. Dans la fenêtre modale qui s'affiche, sélectionnez le canal principal de l'équipe où l'application doit être ajoutée. Cliquez sur **Go** pour finaliser l'installation.
   {{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams Ajouter l'application à une équipe" >}}

Ensuite, connectez votre tenant Microsoft à Datadog :

1. Dans Datadog, accédez au [carré d'intégration Microsoft Teams][121].
2. Cliquez sur **Add Tenant**, ce qui vous redirige vers Microsoft. 
3. Suivez les instructions, puis cliquez sur **OK**.


### Octroi d'autorisations supplémentaires
Certaines fonctionnalités d'Incident Management dans Datadog nécessitent une autorisation pour exécuter des actions sur votre tenant, par exemple la création d'un nouveau
canal pour un incident. Vous devez disposer d'une personne autorisée à donner son consentement au nom de l'organisation Microsoft,
comme un utilisateur ayant le rôle *Administrateur général*. Consultez la [documentation Microsoft Entra ID][122] pour plus d'informations
sur les personnes pouvant accorder un consentement d'administration à l'échelle du tenant à l'application Datadog.

Vous pouvez choisir d'accorder à Datadog à la fois des autorisations d'application et des autorisations déléguées, ou uniquement des autorisations déléguées. L'utilisation des deux types d'autorisations est facile à configurer, tandis que l'utilisation exclusive des autorisations déléguées vous donne un contrôle plus granulaire sur l'application Datadog dans votre tenant. Pour plus d'informations, consultez la [documentation de Microsoft sur les autorisations et le consentement][123].

[121]: https://app.datadoghq.com/integrations/microsoft-teams
[122]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[123]: https://docs.datadoghq.com/fr/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< tabs >}}

{{% tab "Using Application Permissions" %}}

1. Accédez au [carré d'intégration Microsoft Teams][1] dans Datadog.
2. Pour le tenant dans lequel vous souhaitez utiliser Incident Management, cliquez sur l'icône en forme de roue dentée à droite.
3. Cliquez sur **Grant application permissions**, ce qui vous redirige vers Microsoft. Un utilisateur pouvant accorder un consentement d'administration à l'échelle du tenant doit effectuer cette étape. Cet utilisateur doit posséder un compte Datadog, mais l'adresse email utilisée pour son compte Datadog n'a pas besoin de correspondre à celle de son compte Microsoft. 
4. Suivez les instructions, puis cliquez sur **OK**.


[1]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}

{{% tab "Using Delegated Permissions" %}}
Les autorisations déléguées permettent à Datadog d'opérer dans votre tenant Microsoft Teams comme un utilisateur. Datadog peut exécuter toutes les actions accessibles à cet utilisateur et accéder aux ressources qu'il peut consulter.

Commencez par accorder à l'application Datadog des autorisations déléguées :
1. Accédez au [carré d'intégration Microsoft Teams][1] dans Datadog.
2. Pour le tenant dans lequel vous souhaitez utiliser Incident Management, cliquez sur l'icône en forme de roue dentée à droite.
3. Cliquez sur **Grant delegated permissions**, ce qui vous redirige vers Microsoft. Un utilisateur pouvant accorder un consentement d'administration à l'échelle du tenant doit effectuer cette étape. Cet utilisateur doit posséder un compte Datadog, mais l'adresse email utilisée pour son compte Datadog n'a pas besoin de correspondre à celle de son compte Microsoft. 
4. Suivez les instructions, puis cliquez sur **OK**.

Ensuite, créez le compte de service que Datadog utilisera :
1. Créez un utilisateur de compte de service Office365. Datadog recommande de nommer ce compte de service « Datadog » pour le distinguer des véritables utilisateurs de Microsoft Teams et éviter toute confusion.
2. Attribuez une licence Microsoft Teams à ce compte de service.
3. Ajoutez l'utilisateur du compte de service à chaque équipe dans laquelle vous souhaitez gérer la réponse aux incidents. Cela inclut les équipes où de nouveaux canaux d'incident seront créés et celles à partir desquelles les utilisateurs déclareront un incident.
4. Assurez-vous que les autorisations suivantes sont activées pour ces équipes :
   - `Autoriser les membres à créer et mettre à jour des canaux`
   - `Autoriser les membres à supprimer et restaurer des canaux`
   - `Autoriser les membres à créer, mettre à jour et supprimer des onglets`

   Pour activer ces autorisations, cliquez sur **…** à côté du nom de l'équipe > **Gérer l'équipe** > **Paramètres** > **Autorisations des membres**.

Enfin, connectez l'utilisateur du compte de service que vous avez créé à la première étape.
1. Assurez-vous d'être connecté en tant qu'utilisateur du compte de service que vous venez de créer. **Remarque** : il n'est pas nécessaire de créer un utilisateur Datadog pour ce compte de service, et cet utilisateur n'est pas lié à l'utilisateur Datadog qui effectue cette opération.
2. Accédez au [carré d'intégration Microsoft Teams][1] dans Datadog.
3. Pour le tenant dans lequel vous souhaitez utiliser Incident Management, cliquez sur l'icône en forme de roue dentée à droite.
4. Cliquez sur **Connect delegated user**, ce qui vous redirige vers Microsoft. **Remarque** : il n'est pas nécessaire d'être administrateur à l'échelle du tenant pour effectuer cette étape.
5. Suivez les instructions, puis cliquez sur **OK**.

#### Remarque importante sur les jetons d'actualisation

Lorsque vous connectez Microsoft Teams via un compte de service délégué, Datadog utilise un jeton d'actualisation pour maintenir l'accès sans avoir besoin de se reconnecter. Ce jeton peut devenir invalide si le mot de passe du compte change, si le compte est désactivé ou si Microsoft révoque le jeton.

Ces jetons expirent également au bout de 90 jours. Chaque fois que Datadog effectue une action au nom de l'utilisateur délégué, un nouveau jeton est émis. Toutefois, si l'utilisateur délégué n'est pas utilisé pendant 90 jours, le jeton expire et l'intégration cesse de fonctionner. 

Si le jeton devient invalide ou expire, vous devrez reconnecter le compte de service pour rétablir les fonctionnalités.

Pour plus d'informations, consultez la documentation Microsoft sur les [jetons d'actualisation dans Microsoft Identity Platform][2].


[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens
{{% /tab %}}

{{< /tabs >}}

### Configuration de l'utilisateur

Pour effectuer des actions dans Datadog depuis Microsoft Teams, vous devez connecter vos comptes Datadog et Microsoft Teams.

Pour associer vos comptes depuis Microsoft Teams :

1. Ouvrez Microsoft Teams.
2. Démarrez une conversation avec le bot Datadog en cliquant sur le bouton `...` dans la barre d'outils verticale puis en sélectionnant Datadog.
3. Saisissez « accounts » et appuyez sur Entrée.
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Associer vos comptes depuis Microsoft Teams" >}}

4. Le bot Datadog vous donnera alors les instructions à suivre pour associer vos comptes. Cliquez sur **Connect Datadog Account**.
5. Le bot Datadog vous enverra ensuite un message avec un lien pour associer vos comptes. Cliquez sur le lien et suivez les instructions.
6. Vous serez redirigé vers le [carré d'intégration Microsoft Teams][303].
7. Créez une clé d'application en cliquant sur le bouton **Create** du message affiché sur le [carré d'intégration Microsoft Teams][303].

Vous pouvez également associer vos comptes depuis Datadog :

1. Dans Datadog, accédez au [carré d'intégration Microsoft Teams][303].
2. Cliquez sur **Connect** dans le tenant affiché.
3. Suivez les instructions, puis cliquez sur **OK**.
4. Depuis le [carré d'intégration Microsoft Teams][303], créez une clé d'application en cliquant sur **Create** dans l'invite ci-dessus.

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Associer vos comptes depuis le carré d'intégration Microsoft Teams dans Datadog" >}}

### Utilisation pour les incidents

#### Incidents

Pour déclarer un nouvel incident depuis Microsoft Teams :

1. Démarrez une conversation dans un canal d'une équipe quelconque, ou dans un chat avec l'application Datadog.
2. Saisissez `@Datadog incident`
3. Une carte adaptative s'affiche. Cliquez sur le bouton **Declare Incident** pour ouvrir l'onglet Datadog et déclarer un incident.

Un utilisateur doit connecter son compte Microsoft Teams à son compte Datadog pour déclarer un incident.

La mise à jour d'un incident se fait de façon similaire :

1. Démarrez une conversation avec l'équipe associée à un incident.
2. Saisissez `@Datadog` ou utilisez le bouton `...` pour ouvrir le menu **Messaging extensions**, puis sélectionnez l'application **Datadog**.
3. Sélectionnez **Update Incident**.
4. Remplissez le formulaire avec les informations souhaitées.
5. Cliquez sur **Update**.

Répertoriez tous les incidents ouverts (actifs et stables) avec :

```
@Datadog list incidents
```

Utilisez le menu des actions supplémentaires à droite de n'importe quel message dans une conversation pour ajouter ce message à la chronologie de l'incident.

#### Canal de mise à jour des incidents

Le canal de mise à jour des incidents permet à vos parties prenantes de bénéficier d'une visibilité totale sur l'ensemble des incidents de l'organisation, le tout directement depuis Microsoft Teams. Sélectionnez l'équipe et le canal qui recevront ces mises à jour. Des messages seront envoyés pour :

- Les nouveaux signalements d'incident
- Les changements de gravité et de statut, accompagnés du nom de la personne responsable de l'incident
- Les liens vers la page de présentation de l'incident dans l'application.
- Les liens pour rejoindre l'équipe en charge de l'incident

Une fois l'application Microsoft Teams installée, accédez à la page **Incident Settings**. Descendez jusqu'à atteindre la section **Incident Updates Channel**, puis effectuez la configuration du canal.

#### Comment configurer un canal dédié aux incidents :

1. Accédez à [Paramètres des incidents][304].
2. Dans la section Microsoft Teams, sélectionnez votre tenant Microsoft Teams connecté.
3. Activez l’option **Automatically create a Microsoft Teams channel for every incident**.
4. Sélectionnez l’équipe dans laquelle vous souhaitez créer automatiquement de nouveaux canaux.
5. Enregistrez vos réglages.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Paramètres du canal de mise à jour des incidents Microsoft Teams." >}}

[301]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[302]: https://docs.datadoghq.com/fr/help/
[303]: https://app.datadoghq.com/integrations/microsoft-teams
[304]: https://app.datadoghq.com/incidents/settings#Integrations
[305]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[306]: https://learn.microsoft.com/en-us/graph/permissions-reference
[307]: https://docs.datadoghq.com/fr/dashboards/scheduled_reports/
[308]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[309]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[3010]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3011]: https://learn.microsoft.com/en-us/graph/permissions-overview
{{< /site-region >}}


## Données collectées

### Métriques

L'intégration Microsoft Teams ne fournit aucune métrique.

### Événements

L'intégration Microsoft Teams ne fournit aucun événement.

### Checks de service

L'intégration Microsoft Teams ne fournit aucun check de service.

## Autorisations

L’intégration Microsoft Teams reçoit les autorisations suivantes pour les équipes auxquelles elle a été ajoutée. Pour plus d’informations, consultez la [référence des autorisations de Microsoft App][978].

| Description des autorisations                                                                                                                                                                    | Motif de la requête                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Recevoir les messages et les données que je lui fournis.                                                                                                                                           | Les utilisateurs peuvent interagir avec l’application Datadog dans un chat personnel.                                    |
| M'envoyer des messages et des notifications.                                                                                                                                                       | Les utilisateurs peuvent interagir avec l'application Datadog dans le cadre d'un chat personnel.                                    |
| Accéder aux informations de mon profil telles que mon nom, mon adresse électronique, le nom de mon entreprise et ma langue préférée.                                                                                       | Permettre aux utilisateurs de configurer les notifications et les flux de travail de Microsoft Teams dans l'interface utilisateur Datadog. |
| Recevoir des messages et des données que les membres d'une équipe ou d'un chat lui fournissent dans un canal ou un chat.                                                                                                   | Les utilisateurs peuvent interagir avec Datadog par le biais des commandes @Datadog.                                   |
| Envoyer des messages et des notifications dans un canal ou un chat.                                                                                                                                     | Envoyer des notifications de Datadog aux cibles configurées.                                            |
| Accéder aux informations de cette équipe ou de ce chat, telles que le nom de l'équipe ou du chat, la liste des canaux et la liste des membres (y compris les noms et les adresses électroniques des membres de l'équipe ou du chat), et les utiliser pour les contacter. | Permettre aux utilisateurs de configurer les notifications et workflows Microsoft Teams dans Datadog.        |


{{< site-region region="us,us3,us5,eu,ap1" >}}

Des autorisations supplémentaires sont nécessaires pour utiliser les fonctionnalités d'Incident Management dans l’intégration Microsoft Teams. Ces autorisations doivent être accordées par un utilisateur ayant les droits d’administrateur au niveau du tenant (voir la section [Datadog Incident Management dans Microsoft Teams : configuration du compte](#configuration-du-compte) pour obtenir des instructions détaillées).
Pour en savoir plus sur ces autorisations, consultez la [Référence des autorisations de Microsoft Graph][976].
{{< tabs >}}
{{% tab "Using Application Permissions" %}}
<table>
  <tr>
    <td style="width:40%;"><strong>Nom de l’API/Autorisation</strong></td>
    <td style="width:15%;"><strong>Type</strong></td>
    <td><strong>Raison de la requête</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">Application et Déléguée</td>
    <td>Créer des canaux pour gérer et résoudre les incidents via Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">Application et Déléguée</td>
    <td>Archiver automatiquement les canaux d’incident après une période définie.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">Application et Déléguée</td>
    <td>Synchroniser automatiquement les messages d’un canal d’incident avec la chronologie.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">Application et Déléguée</td>
    <td>Créer et modifier des canaux pour résoudre les incidents dans Incident Management de Datadog.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Directory.Read.All</code>,<code>GroupMember.Read.All</code></td>
    <td style="width:15%;">Application</td>
    <td>Proposer une saisie semi-automatique des noms d’équipe et de canal dans la configuration Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">Application et Déléguée</td>
    <td>Créer un onglet dans une équipe pour l’application Datadog (autorisation requise pour une prochaine fonctionnalité de déclaration d’incident).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Créer automatiquement une réunion dans une équipe pour l’application Datadog (autorisation requise pour une prochaine fonctionnalité de déclaration d’incident).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Permet à l’application Datadog de vérifier si elle est membre d’une équipe.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Vérifier si un onglet Datadog a été créé dans un canal (autorisation requise pour une prochaine fonctionnalité de déclaration d’incident).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Fournir les informations de l’utilisateur connecté pour associer son compte Microsoft Teams à Datadog.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Afficher le nom de l’utilisateur Microsoft Teams ayant mis à jour ou créé un incident.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Afficher les équipes dont le compte de service est membre dans la page de configuration des incidents.</td>
  </tr>
</table>
{{% /tab %}}

{{% tab "Using Delegated Permissions" %}}

<table>
  <tr>
    <td style="width:40%;"><strong>Nom de l’API/Autorisation</strong></td>
    <td style="width:15%;"><strong>Type</strong></td>
    <td><strong>Raison de la requête</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Créer des canaux pour gérer et résoudre les incidents via Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Archiver automatiquement les canaux d’incident après une période définie.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Synchroniser automatiquement les messages d’un canal d’incident avec la chronologie.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Créer et modifier des canaux pour résoudre les incidents à l'aide de Incident Management de Datadog.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Créer un onglet dans une équipe pour l’application Datadog (autorisation requise pour une prochaine fonctionnalité de déclaration d’incident).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Créer automatiquement une réunion dans une équipe pour l’application Datadog (autorisation requise pour une prochaine fonctionnalité de déclaration d’incident de Teams).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Permet à l’application Datadog de vérifier si elle est membre d’une équipe.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Vérifier si un onglet Datadog a été créé dans un canal (autorisation requise pour une prochaine fonctionnalité de déclaration d’incident de Teams).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Fournir les informations de l’utilisateur connecté pour associer son compte Microsoft Teams à Datadog.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Afficher le nom de l’utilisateur Microsoft Teams ayant mis à jour ou créé un incident.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">Déléguée</td>
    <td>Afficher les équipes dont le compte de service est membre dans la page de configuration des incidents.</td>
  </tr>
</table>

{{% /tab %}}
{{< /tabs >}}

[971]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[972]: https://docs.datadoghq.com/fr/help/
[973]: https://app.datadoghq.com/integrations/microsoft-teams
[974]: https://app.datadoghq.com/incidents/settings#Integrations
[975]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[976]: https://learn.microsoft.com/en-us/graph/permissions-reference
[977]: https://docs.datadoghq.com/fr/dashboards/scheduled_reports/
[978]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[979]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[9710]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/

{{< /site-region >}}


## Dépannage

### Utilisation de l'authentification unique

Suivez les étapes suivantes pour définir de nouveaux connecteurs pour vos canaux :

1. Connectez-vous à Datadog, puis suivez les étapes 1 et 2 de configuration.

2. Pour l'étape 3, vous devez accéder à Datadog depuis la page Microsoft Teams. Ouvrez un nouvel onglet et connectez-vous à Datadog à l'aide du processus d'authentification unique. Effectuez ensuite l'étape 4 sur une autre page.

### Pourquoi mon équipe n'apparaît-elle pas dans le carré d'intégration ?


{{< site-region region="us,us3,us5,eu,ap1" >}}
Si vous avez ajouté le bot à l’équipe avant d’ajouter le tenant dans Datadog, Datadog n’a pas pu détecter l’événement d’ajout à l’équipe et ne sait donc pas que l’équipe existe. 
Vous pouvez essayer l’une des solutions suivantes :

- Synchroniser les canaux standard de votre équipe avec Datadog en postant `@Datadog sync` dans un canal standard de cette équipe :

1. Accédez à un canal standard de l’équipe que vous souhaitez synchroniser.
2. Lancez une publication dans ce canal.
3. Postez `@Datadog sync` et attendez le message de confirmation dans le fil indiquant que l’opération a réussi.

- Supprimer l’application Datadog de l’équipe, puis l’ajouter de nouveau. **Remarque :** cette opération supprime les connecteurs configurés pour cette équipe. Effectuez-la uniquement lorsque vous êtes prêt à migrer tous les connecteurs de cette équipe vers l’intégration basée sur tenant de Datadog : 

1. Cliquez sur les trois points à côté du nom de l’équipe dans la barre latérale gauche.
2. Cliquez sur **Gérer l'équipe**.
3. Allez dans l'onglet **Apps**.
4. Cliquez sur les trois points à côté de l'application Datadog.
5. Cliquez sur **Remove**.
6. Ajoutez à nouveau l'application Datadog en suivant les [étapes de configuration][951].

[951]: https://docs.datadoghq.com/fr/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}



{{< site-region region="gov" >}}
Si vous avez ajouté le bot à l’équipe avant d’ajouter le tenant dans Datadog, Datadog n’a pas pu détecter l’événement d’ajout à l’équipe et ne sait donc pas que l’équipe existe. 
Vous pouvez :

- Synchroniser les canaux standard de votre équipe avec Datadog en postant `@Datadog for Government sync` dans un canal standard de cette équipe :

1. Accédez à un canal standard de l’équipe que vous souhaitez synchroniser.
2. Lancez une publication dans ce canal.
3. Postez `@Datadog for Government sync` et attendez le message de confirmation dans le fil indiquant que l’opération a réussi.

- Supprimer l’application Datadog for Government de l’équipe, puis l’ajouter de nouveau. **Remarque :** cette opération supprime les connecteurs configurés pour cette équipe. Effectuez-la uniquement lorsque vous êtes prêt à migrer tous les connecteurs de cette équipe vers l’intégration basée sur tenant de Datadog.

1. Cliquez sur les trois points à côté du nom de l’équipe dans la barre latérale gauche.
2. Cliquez sur **Gérer l’équipe**.
3. Allez dans l'onglet **Apps**.
4. Cliquez sur les trois points à côté de l’application Datadog for Government.
5. Cliquez sur **Remove**.
6. Ajoutez de nouveau l'application Datadog for Government en suivant les [étapes de configuration][941].

[941]: https://docs.datadoghq.com/fr/integrations/microsoft_teams/?tab=datadogapprecommended#setup&site=gov

{{< /site-region >}}


### Les canaux privés sont-ils pris en charge par le bot ?

En raison des limitations liées aux canaux privés dans [Microsoft Teams][1], les canaux privés ne sont pas pris en charge par le bot. Pour envoyer des notifications vers des canaux privés, consultez [Microsoft Workflows Webhooks][2].


{{< site-region region="us,us3,us5,eu,ap1" >}}

### Les notifications de monitor peuvent-elles mentionner plusieurs utilisateurs ?

Oui, vous pouvez inclure plusieurs mentions d'utilisateur dans une même notification pour alerter tous les membres concernés.

**Exemple** : `@Teams-handle <at>user1@microsoft.com</at> <at>user2@microsoft.com</at> <at>user3@microsoft.com</at>`

<div class="alert alert-danger">Lorsqu'une notification contient plusieurs mentions et qu'une d’elles est invalide, les utilisateurs valides recevront bien la notification, mais l’ordre des mentions pourra être affecté.</div>

{{< /site-region >}}



{{< site-region region="gov" >}}

### L'application Datadog for Government est-elle compatible avec GCC ou GCC High ?

Actuellement, l'application Datadog for Government prend uniquement en charge les clients Datadog US1-FED qui se connectent à un tenant Microsoft Teams *commercial*. Les tenants GCC et GCC High ne sont pas pris en charge.
{{< /site-region >}}


### Pourquoi une fonctionnalité d'incident ne fonctionne-t-elle pas avec les autorisations déléguées ?
Vérifiez d'abord que l'utilisateur du compte de service est bien membre de l'équipe concernée.
- Si l'onglet d'incident ne se crée pas, vérifiez que les membres ont le droit de créer, modifier et supprimer des onglets dans les canaux de cette équipe.
- Si les canaux d'incident ne se créent pas ou ne sont pas renommés, assurez-vous que les membres sont autorisés à créer et modifier des canaux.
- Si les canaux d'incident ne sont pas archivés, vérifiez que les membres peuvent supprimer et restaurer les canaux.

Enfin, il est possible que le jeton de l'utilisateur délégué ait expiré ou ait été révoqué. Dans ce cas, reconnectez l'utilisateur délégué.

### Pourquoi m'est-il demandé de vérifier la configuration de l'application lorsque je tente de déclarer un incident ?
Pour utiliser la nouvelle expérience de déclaration d'incident, vérifiez les points suivants :
- La version de votre application est 3.1.23 ou ultérieure. Consultez les instructions pour [mettre à jour votre application][3].
- Si vous utilisez des autorisations d'application, vous devez avoir accordé l'autorisation `TeamsTab.Create`.
- Si vous utilisez des autorisations déléguées, vous devez avoir accordé les autorisations déléguées `TeamsTab.Create` et `TeamsTab.Read.All`.
- Si vous utilisez des autorisations déléguées, le compte de service doit être membre de l'équipe dans laquelle vous exécutez la commande `@Datadog incident`.

Vous pouvez aussi utiliser la nouvelle expérience en cliquant sur le bouton `+` en haut d'un canal, puis en recherchant l'application Datadog.

Besoin d'aide ? Contactez [l'assistance Datadog][4].


[1]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[2]: https://docs.datadoghq.com/fr/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[3]: https://support.microsoft.com/en-us/office/update-an-app-in-microsoft-teams-3d53d136-5c5d-4dfa-9602-01e6fdd8015b
[4]: https://docs.datadoghq.com/fr/help/