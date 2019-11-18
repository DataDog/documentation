---
categories:
  - Collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: 'Cette intégration vous permet de créer des tickets à partir d''alertes déclenchées dans Datadog et de mettre à jour les tickets existants en tenant compte des dernières informations. Datadog, and update existing tickets with new information as it arises. Additionally, you can see JIRA ticket creations as events within Datadog to overlay with all of your metrics.'
doc_link: 'https://docs.datadoghq.com/integrations/jira/'
git_integration_title: jira
has_logo: true
integration_title: Jira
is_public: true
kind: integration
manifest_version: '1.0'
name: jira
public_title: Intégration Datadog/Jira
short_description: Faites en sorte que vos alertes Datadog génèrent automatiquement des tickets JIRA et les mettent à jour par la suite.
version: '1.0'
---
{{< img src="integrations/jira/JiraInstallation9.png" alt="Événements Jira" responsive="true">}}

## Présentation

JIRA est un système de suivi de tickets et de projets pour les équipes logicielles. Cette intégration vous permet de créer des tickets lorsque des alertes se déclenchent dans Datadog et de mettre à jour les tickets existants en tenant compte des dernières informations. De plus, les tickets créés avec JIRA sont ajoutés en tant qu'événements dans Datadog, ce qui vous permet de les superposer à vos métriques.

## Implémentation
### Installation

1. Accédez à votre compte Jira.

2. Accédez aux paramètres (icône en forme d'engrenage) –> **Produits** :

    {{< img src="integrations/jira/JiraInstallation2.png" alt="Accès à Jira" responsive="true" style="width:25%">}}

3. Sous **INTEGRATIONS** dans le menu de gauche, sélectionnez **Application links** :

    {{< img src="integrations/jira/JiraInstallation3.png" alt="Accès à Jira" responsive="true" style="width:25%">}}

4. Saisissez `https://app.datadoghq.com/` comme URL et cliquez sur **Create new link**. **Remarque** : il est possible que le message d'avertissement suivant s'affiche : « *No response was received from the URL you entered* ». Vous pouvez l'ignorer et appuyer sur Continuer.

    {{< img src="integrations/jira/JiraInstallation4.png" alt="Configurer des liens d'application" responsive="true" style="width:75%">}}

5. Dans le champ **Application Name**, ajoutez le nom de votre choix (utilisé pour l'identification).

6. Conservez l'option **Generic Application**.

7. Cochez la case **Create incoming link**.

8. Cliquez sur **Continue**.

    {{< img src="integrations/jira/JiraInstallation5.png" alt="Associer des applications" responsive="true" style="width:50%">}}

9. Pour la fenêtre suivante, vous trouverez la clé de consommateur, le nom du consommateur et la clé publique dans le [carré d'intégration Jira de Datadog][1].

10. Cliquez sur **Continue**.

    {{< img src="integrations/jira/JiraInstallation6.png" alt="Associer les applications" responsive="true" style="width:50%">}}

### Configuration

1. Dans le [carré d'intégration Jira Datadog][1], saisissez l'URL de votre compte Jira pour l'étape 2.

2. Cliquez sur le bouton **Setup OAuth1** :

    {{< img src="integrations/jira/JiraInstallation7.png" alt="Configurer le compte Jira" responsive="true" style="width:50%">}}

#### Ajouter des tickets

Après avoir installé l'intégration JIRA, créez un ticket personnalisé dans Datadog.

1. Pour commencer, cliquez sur le bouton **Add Issue**.
2. Saisissez la clé du projet et le type de ticket. **Remarque** : chaque ticket possède une combinaison unique composée de l'ID du projet et du type de ticket.
3. Si vous le souhaitez, ajoutez des tags Datadog sous la forme `<KEY:VALUE>`.
4. Vous devez remplir tous les champs requis (**Required fields**) pour ce ticket.
6. Les autres champs proposés sont facultatifs.
7. Cliquez sur le bouton **Save**.

{{< img src="integrations/jira/jira-issue.png" alt="Ticket Jira" responsive="true">}}

**Remarque** : si le champ obligatoire **Severity** est affiché (comme ci-dessus), Jira limite les valeurs autorisées à :
```
1 - Critical
2 - Major
3 - Minor
```

Les valeurs et variables brutes de l'événement d'alerte peuvent être utilisées pour remplir les champs du ticket. Voici la liste complète des variables :

| Variable          | Description                                                                                                  |
|-------------------|--------------------------------------------------------------------------------------------------------------|
| $ID               | ID de l'événement *(p. ex., 1234567)*                                                                              |
| $EVENT_TITLE      | Titre de l'événement *(p. ex., \[Triggered] \[Memory Alert])*                                                      |
| $EVENT_MSG        | Texte de l'événement *(p. ex., @webhook-url Envoi au webhook)*                                                |
| $EVENT_TYPE       | Type de l'événement *(p. ex., metric_alert_monitor)*                                                               |
| $LAST_UPDATED     | Date de la dernière mise à jour de l'événement                                                                         |
| $DATE             | Date (epoch) à laquelle l'événement s'est produit *(p. ex., 1406662672000)*                                                  |
| $AGGREG_KEY       | ID pour agréger des événements connexes *(p. ex., 9bd4ac313a4d1e8fae2482df7b77628)*                            |
| $ORG_ID           | ID de votre organisation *(p. ex., 11023)*                                                                        |
| $ORG_NAME         | Nom de votre organisation *(p. ex., Datadog)*                                                                    |
| $USER             | Utilisateur publiant l'événement qui a déclenché le webhook *(p. ex., thomas)*                                               |
| $SNAPSHOT         | URL de l'image si l'événement contient un snapshot *(p. ex., https://url.to.snpashot.com/)*                       |
| $LINK             | URL de l'événement *(p. ex., https://app.datadoghq.com/event/jump_to?event_id=123456)*                             |
| $PRIORITY         | Priorité de l'événement *(p. ex., normal)*                                                                         |
| $TAGS             | Liste des tags associés à l'événement séparés par des virgules *(p. ex., monitor, name:myService, role:computing-node)*                  |
| $TEXT_ONLY_MSG    | Texte de l'événement sans mise en forme markdown                                                                |
| $ALERT_ID         | ID de l'alerte *(p. ex., 1234)*                                                                                     |
| $ALERT_METRIC     | Nom de la métrique s'il s'agit d'une alerte *(p. ex., system.load.1)*                                                    |
| $ALERT_QUERY      | Requête du monitor qui a déclenché le webhook                                                              |
| $ALERT_STATUS     | Résumé du statut d'alerte *(p. ex., system.load.1 over host:my-host était > 0 au moins une fois lors de la dernière minute)* |
| $ALERT_TRANSITION | Type de notification d'alerte *(p. ex. : Triggered)*                                                                 |
| $HOSTNAME         | Le hostname du serveur associé à l'événement (le cas échéant).                                      |
| $ALERT_CYCLE_KEY  | ID permettant d'associer les événements depuis le déclenchement d'une alerte jusqu'à sa résolution.                                         |
| $LOGS_SAMPLE      | Échantillon des logs à partir des alertes de Log Monitor.                                                                         |

### Cas d'utilisation
#### Créer automatiquement des tickets à partir d'alertes Datadog

Pour créer automatiquement des tickets JIRA au sein des alertes Datadog, utilisez la commande `@jira-<NOM_PROJET>-<TYPE_TICKET>` dans la section « Say what's happening » du processus de création de monitor.

Lorsque cette alerte se déclenche, un ticket est créé.

La commande `@jira-update` peut être utilisée pour mettre à jour les tickets existants. Cette commande ajoute un commentaire au ticket JIRA avec le texte suivi de la commande `@jira-update`.

Conseil : vous pouvez aussi utiliser la commande `@jira` dans une variable #is_alert ou #is_warning.

{{< img src="integrations/jira/JiraInstallation8.png" alt="Paramètres monitor" responsive="true">}}

## Données collectées
### Métriques

L'intégration JIRA n'inclut aucune métrique.

### Événements

Toutes les créations de ticket JIRA apparaissent en tant qu'événement dans Datadog.

### Checks de service
L'intégration JIRA n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].


[1]: https://app.datadoghq.com/account/settings#integrations/jira
[2]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}