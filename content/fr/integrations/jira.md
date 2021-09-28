---
"categories":
- "collaboration"
- "issue tracking"
- "notification"
"ddtype": "crawler"
"dependencies": []
"description": "Cette intégration vous permet de créer des tickets à partir d'alertes déclenchées dans Datadog et de mettre à jour les tickets existants en tenant compte des dernières informations. Additionally, you can see JIRA ticket creations as events within Datadog to overlay with all of your metrics."
"doc_link": "https://docs.datadoghq.com/integrations/jira/"
"draft": false
"git_integration_title": "jira"
"has_logo": true
"integration_id": "jira"
"integration_title": "Jira"
"is_public": true
"kind": "integration"
"manifest_version": "1.0"
"name": "jira"
"public_title": "Intégration Datadog/Jira"
"short_description": "Faites en sorte que vos alertes Datadog génèrent et mettent à jour automatiquement les tickets JIRA."
"version": "1.0"
---

## Présentation

JIRA est un système de suivi de tickets et de projets pour les équipes logicielles. Cette intégration vous permet de créer des tickets lorsque des alertes se déclenchent dans Datadog et de mettre à jour les tickets existants en tenant compte des dernières informations. De plus, les tickets créés avec JIRA sont ajoutés en tant qu'événements dans Datadog, ce qui vous permet de les superposer à vos métriques.

## Configuration

### Installation

1. Accédez à votre compte Jira.
2. Cliquez sur l'icône en forme d'engrenage (en haut à droite) pour accéder aux paramètres, puis sur **Products**.
3. Sous INTEGRATIONS dans le menu de gauche, sélectionnez **Application links**.
4. Saisissez l'URL `https://app.datadoghq.com/` et cliquez sur **Create new link**. **Remarque** : si vous voyez l'avertissement _No response was received from the URL you entered_, ignorez-le et cliquez sur **Continue**.
5. Remplissez le formulaire comme suit, puis cliquez sur **Continue**.

    | Champ                 | Entrée                              |
    |-----------------------|------------------------------------|
    | Application Name      | Le nom de votre choix (utilisé pour l'identification) |
    | Application Type      | Une application générique                |
    | Service Provider Name | `[laisser vide]`                    |
    | Consumer key          | `[laisser vide]`                    |
    | Shared secret         | `[laisser vide]`                    |
    | Request Token URL     | `[laisser vide]`                    |
    | Access token URL      | `[laisser vide]`                    |
    | Authorize URL         | `[laisser vide]`                    |
    | Create incoming link  | Cocher la case                      |

6.  Remplissez le formulaire suivant avec les informations du [carré d'intégration Jira Datadog][1], puis cliquez sur **Continue**.

    | Champ         | Entrée                                       |
    |---------------|---------------------------------------------|
    | Consumer Key  | datadog                                     |
    | Consumer Name | Datadog                                     |
    | Public Key    | Consultez le [carré d'intégration Jira Datadog][1]. |

### Configuration

1. Dans le [carré d'intégration Jira Datadog][1], saisissez l'URL de votre compte Jira pour l'étape 2, par exemple :
    ```text
    https://your-jira.atlassian.net
    ```
2. Cliquez ensuite sur le bouton **Setup OAuth1**.

#### Ajouter des tickets

Après avoir installé l'intégration JIRA, créez un ticket personnalisé dans Datadog.

1. Pour commencer, cliquez sur le bouton **Add Issue**.
2. Saisissez la clé du projet et le type de ticket. **Remarque** : chaque ticket possède une combinaison unique composée de l'ID du projet et du type de ticket.
3. Si vous le souhaitez, ajoutez des tags Datadog au format `<KEY:VALUE>`.
4. Vous devez remplir tous les champs requis (**Required fields**) pour ce ticket.
5. Les autres champs proposés sont facultatifs.
6. Cliquez sur le bouton **Save**.

{{< img src="integrations/jira/jira-issue.png" alt="Ticket Jira" >}}

**Remarque** : si le champ obligatoire **Severity** est affiché (comme ci-dessus), Jira limite les valeurs autorisées à :

- 1. Critical
- 2. Major
- 3. Minor

Les valeurs et variables brutes de l'événement d'alerte peuvent être utilisées pour remplir les champs du ticket. Voici la liste complète des variables :

| Variable           | Description                                                                                                  |
|--------------------|--------------------------------------------------------------------------------------------------------------|
| \$ID               | ID de l'événement _(p. ex., 1234567)_                                                                              |
| \$EVENT_TITLE      | Titre de l'événement _(p. ex., \[Triggered] \[Memory Alert])_                                                      |
| \$EVENT_MSG        | Texte de l'événement _(p. ex., @webhook-url Envoi au webhook)_                                                |
| \$EVENT_TYPE       | Type de l'événement _(p. ex., metric_alert_monitor)_                                                               |
| \$LAST_UPDATED     | Date de la dernière mise à jour de l'événement                                                                         |
| \$DATE             | Date (epoch) à laquelle l'événement s'est produit _(p. ex., 1406662672000)_                                                  |
| \$AGGREG_KEY       | ID pour agréger des événements connexes _(p. ex., 9bd4ac313a4d1e8fae2482df7b77628)_                            |
| \$ORG_ID           | ID de votre organisation _(p. ex., 11023)_                                                                        |
| \$ORG_NAME         | Nom de votre organisation _(p. ex., Datadog)_                                                                    |
| \$USER             | Utilisateur publiant l'événement qui a déclenché le webhook _(p. ex., thomas)_                                               |
| \$SNAPSHOT         | URL de l'image si l'événement contient un snapshot _(p. ex., `https://url.vers.snapshot.com/`)_                     |
| \$LINK             | URL de l'événement _(p. ex., `https://app.datadoghq.com/event/jump_to?event_id=123456`)_                           |
| \$PRIORITY         | Priorité de l'événement _(p. ex., normal)_                                                                         |
| \$TAGS             | Liste des tags associés à l'événement, séparés par des virgules _(p. ex., monitor, name:myService, role:computing-node)_                  |
| \$TEXT_ONLY_MSG    | Texte de l'événement sans mise en forme markdown                                                                |
| \$ALERT_ID         | ID de l'alerte _(p. ex., 1234)_                                                                                     |
| \$ALERT_METRIC     | Nom de la métrique s'il s'agit d'une alerte _(p. ex., system.load.1)_                                                    |
| \$ALERT_QUERY      | Requête du monitor qui a déclenché le webhook                                                              |
| \$ALERT_STATUS     | Résumé du statut d'alerte _(p. ex., system.load.1 over host:my-host était > 0 au moins une fois lors de la dernière minute)_ |
| \$ALERT_TRANSITION | Type de notification d'alerte _(p. ex. : Triggered)_                                                                 |
| \$HOSTNAME         | Le hostname du serveur associé à l'événement (le cas échéant).                                      |
| \$ALERT_CYCLE_KEY  | ID permettant d'associer des événements depuis le déclenchement d'une alerte jusqu'à sa résolution.                                         |
| \$LOGS_SAMPLE      | Échantillon de logs provenant d'alertes de log monitor.                                                                         |

### Cas d'utilisation

#### Créer automatiquement des tickets à partir d'alertes Datadog

Pour créer automatiquement des tickets JIRA au sein des alertes Datadog, utilisez la commande `@jira-<NOM_PROJET>-<TYPE_TICKET>` dans la section « Say what's happening » du processus de création de monitor.

Lorsque cette alerte se déclenche, un ticket est créé.

La commande `@jira-update` peut être utilisée pour mettre à jour les tickets existants. Cette commande ajoute un commentaire au ticket JIRA avec le texte suivi de la commande `@jira-update`.

Conseil : vous pouvez aussi utiliser la commande `@jira` dans une variable #is_alert ou #is_warning.

{{< img src="integrations/jira/JiraInstallation8.png" alt="Paramètres monitor" >}}

## Données collectées

### Métriques

L'intégration JIRA n'inclut aucune métrique.

### Événements

Tous les tickets JIRA créés apparaissent en tant qu'événement dans Datadog.

### Checks de service

L'intégration JIRA n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://app.datadoghq.com/account/settings#integrations/jira
[2]: https://docs.datadoghq.com/help/

