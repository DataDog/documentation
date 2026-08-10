---
categories:
- collaboration
- issue tracking
- notification
dependencies: []
description: Cette intégration vous permet de créer des tickets lorsque des alertes
  se déclenchent dans Datadog et de mettre à jour les tickets existants en ajoutant
  les dernières informations disponibles. De plus, les tickets créés avec Jira sont
  ajoutés en tant qu'événements dans Datadog, ce qui vous permet de les superposer
  à toutes vos métriques.
doc_link: https://docs.datadoghq.com/integrations/jira/
draft: false
git_integration_title: jira
has_logo: true
integration_id: ''
integration_title: Jira
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: jira
public_title: Intégration Datadog/Jira
short_description: Faites en sorte que vos alertes Datadog génèrent et modifient automatiquement
  des tickets Jira.
version: '1.0'
---

## Présentation

Jira est un système de suivi de tickets et de projets pour les équipes logicielles. L'intégration Datadog/Jira vous permet de créer des tickets lorsque des alertes se déclenchent dans Datadog et de consulter les tickets créés dans Jira sous la forme d'événements Datadog.

## Configuration

### Créer un lien d'application dans Jira

1. Accédez à Jira.
2. Cliquez sur l'icône en forme d'engrenage dans le coin supérieur droit et sélectionnez **Products**.
3. Dans le menu de gauche, sous **Integrations**, cliquez sur **Application links**.
4. Saisissez l'URL {{<region-param key="dd_full_site" code="true">}} et cliquez sur **Create new link**.
5. Ignorez l'avertissement « No response was received from the URL you entered » et cliquez sur **Continue**.
6. Remplissez le formulaire comme indiqué ci-dessous, puis cliquez sur **Continue**.

    | Champ                 | Entrée                          |
    |-----------------------|--------------------------------|
    | Application Name      | `{Saisissez un nom (p. ex., Datadog)}`|
    | Application Type      | Generic Application            |
    | Service Provider Name | `{laisser vide}`                |
    | Consumer key          | `{laisser vide}`                |
    | Shared secret         | `{laisser vide}`                |
    | Request Token URL     | `{laisser vide}`                |
    | Access token URL      | `{laisser vide}`                |
    | Authorize URL         | `{laisser vide}`                |
    | Create incoming link  | Cocher la case                  |

7. Remplissez le prochain formulaire comme indiqué ci-dessous, puis cliquez sur **Continue**. Pour accéder à la clé publique dans le [carré de l'intégration Datadog/Jira][1], cliquez sur **Add Account**.

    | Champ         | Entrée                                                      |
    |---------------|------------------------------------------------------------|
    | Consumer Key  | `{Saisir un nom de clé (p. ex., datadog)}`                        |
    | Consumer Name | Datadog                                                    |
    | Public Key    | `{Saisir la clé publique du carré d'intégration Datadog/Jira}`|

### Associer Datadog à votre instance Jira

1. Accédez au [carré de l'intégration Datadog/Jira][1] et cliquez sur **Add Account**.
2. Saisissez l'URL de votre instance Jira et la clé consommateur du lien d'application que vous avez précédemment créé.
3. Cliquez sur **Connect** et suivez les instructions sur la page d'autorisation de Jira.

### Filtrage d'IP

Si votre instance Jira filtre le trafic par adresse IP, vous devez autoriser les connexions depuis les préfixes d'IP des **webhooks** appartenant à Datadog afin de garantir le bon fonctionnement de l'intégration. Pour obtenir la liste des préfixes d'IP des **webhooks** pour votre région, consultez la section [Plages d'IP][2].


## Configurer un modèle de ticket


Grâce aux modèles de ticket, vous pouvez définir la façon dont les tickets sont créés dans Jira à partir des événements d'alerte Datadog.

 Pour créer un modèle de ticket, procédez comme suit :

1. Cliquez sur **New Issue Template**.
2. Saisissez un nom pour votre modèle de ticket. Ce nom, précédé du préfixe `jira-`, devient le handle à utiliser dans votre monitor pour envoyer les notifications à Jira (par exemple, `jira-my-issue-template-name`).
3. Sélectionnez un compte Jira.
4. Sélectionnez le projet et le type de ticket (par exemple, **Story**, **Epic**, **Task** ou **Bug**).
5. La liste des champs configurables s'affiche alors. Saisissez des valeurs dans les champs de votre choix, puis cliquez sur **Save**.

### Configurer les champs de tickets

Les champs des modèles de ticket définissent les données incluses dans les tickets créés dans Jira. Par exemple, vous pouvez configurer votre modèle de façon à créer des tickets avec une priorité spécifique ou un destinataire par défaut.

Vous pouvez vous servir des données de l'événement d'alerte pour remplir les valeurs des champs du ticket, grâce à des template variables comme `${EVENT_TITLE}`. Pour obtenir la liste des variables disponibles, consultez la documentation relative à l'[intégration Webhooks Datadog][3].

## Utilisation

#### Créer automatiquement des tickets à partir d'alertes Datadog

Pour créer des tickets Jira à partir d'événements d'alerte Datadog, saisissez le handle de notification d'un ou de plusieurs modèles de ticket, par exemple `@jira-my-issue-template`, dans la section **Notify your team** ou **Say what's happening** de l'interface de création de monitor.

Les tickets sont créés lorsque le monitor se déclenche. Aucun nouveau ticket n'est créé par le monitor tant qu'il n'est pas rétabli.

## Données collectées

### Métriques

L'intégration Jira n'inclut aucune métrique.

### Événements

Tous les tickets Jira créés apparaissent en tant qu'événements dans Datadog.

### Checks de service

L'intégration Jira n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.datadoghq.com/account/settings#integrations/jira
[2]: https://docs.datadoghq.com/fr/api/latest/ip-ranges/
[3]: https://docs.datadoghq.com/fr/integrations/webhooks/
[4]: https://docs.datadoghq.com/fr/help/