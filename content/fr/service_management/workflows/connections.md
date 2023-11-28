---
aliases:
- /fr/workflows/connections
- /fr/workflows/setup
description: Connexions des workflows
disable_toc: false
kind: documentation
title: Connexions
---

## Présentation

Étant donné que les actions des workflows se connectent à des systèmes logiciels externes, il se peut que vous deviez authentifier votre compte Datadog auprès des intégrations correspondantes. Un workflow ne peut être exécuté correctement qu'à condition que chaque action du workflow nécessitant une authentification puisse vérifier l'identité de votre compte Datadog. Lorsque vous accordez des autorisations à Datadog, assurez-vous de suivre les meilleures pratiques en matière de sécurité et d'accorder uniquement les autorisations nécessaires à l'exécution d'un workflow.

Les actions de workflow peuvent être authentifiées de deux manières :
- Identifiants et autorisations configurés dans le carré d'intégration
- Identifiants de connexion

## Identifiants dans le carré d'intégration

Les identifiants et l'authentification de compte que vous configurez dans les carrés d'intégration de Datadog sont automatiquement appliqués aux actions correspondantes dans Workflow Automation :
- Jira
- PagerDuty
- Slack
- GitHub

Configurez les carrés d'intégration en suivant les instructions fournies dans les [intégrations Datadog][6].

Si l'intégration que vous devez configurer n'est pas dans la liste ci-dessus, configurez les identifiants de connexion.

## Identifiants de connexion

Les connexions de workflow viennent enrichir les intégrations que vous avez installées en vous permettant de contrôler l'authentification des étapes du workflow. Utilisez les identifiants de connexion pour authentifier une [action générique][8] ou toute action pour laquelle le carré d'intégration ne propose pas de système d'authentification. Pour obtenir la liste des intégrations qui utilisent le carré d'intégration pour l'authentification, consultez la section [Identifiants dans le carré d'intégration](#identifiants-dans-le-carre-d-integration). Les identifiants de connexion ne peuvent être utilisés que dans la solution Workflow Automation.

Les connexions prennent en charge les cas d'utilisation suivants :
- L'intégration dont vous avez besoin n'est pas disponible en tant que connexion intégrée.
- Vous souhaitez authentifier une action personnalisée, comme utiliser l'action HTTP avec votre propre service.
- L'intégration ne prend pas en charge les autorisations requises, comme les accès en écriture sur AWS.
- Vous souhaitez un contrôle d'accès granulaire, par exemple en limitant l'accès des utilisateurs à certains workflows.

### Considérations relatives à la sécurisation de la connexion

Avant d'établir une connexion, prenez en compte les autorisations nécessaires pour accomplir la tâche requise, puis n'accordez que ces autorisations à la connexion. Notez également que seules personnes devant utiliser cette connexion y auront accès.

Lorsque c'est possible, utilisez des connexions granulaires lorsque les workflows sont différents. Par exemple, si vous avez un workflow qui écrit dans un compartiment AWS S3 et un autre qui clôt les instances AWS EC2, n'utilisez pas la même connexion pour les deux workflows. Établissez plutôt deux connexions différentes, chacune correspondant à un rôle IAM avec un contexte limité.

## Utiliser les connexions

### Afficher les connexions

1. Depuis la [page Workflow Automation][2], cliquez sur **Connections** en haut à droite. La [liste des connexions][3] s'ouvre.
1. Cliquez sur une ligne pour afficher les détails de la connexion.

### Établir une connexion

 Les informations suivantes sont nécessaires pour établir une connexion :
- L'élément à connecter (par exemple, nom du produit, URL)
- Le mode d'authentification (par exemple, clé d'API, nom d'utilisateur/mot de passe, oauth)

Pour établir une connexion :
1. Accédez à la [liste des connexions][3].
1. Cliquez sur **New Connection** en haut à droite. La boîte de dialogue **New Connection** apparaît.
1. Cliquez sur une icône pour choisir un schéma d'intégration.
1. Remplissez les champs appropriés. Cliquez sur **Create**.

Vous pouvez également ajouter une connexion à partir de la page du workflow :
1. Accédez à la [liste Workflow Automation][9].
1. Sélectionnez le workflow contenant l'action à laquelle vous souhaitez ajouter un identifiant. Le générateur de workflow apparaît.
1. Dans la vue du workflow, cliquez sur l'action à laquelle vous devez ajouter un identifiant. Le volet de droite contient les détails de l'action.
1. Sous l'onglet **Configure**, recherchez le menu déroulant **Connection** et cliquez sur l'icône **+**.
1. Dans la boîte de dialogue **New Connection**, nommez la connexion et saisissez les informations d'authentification requises.
1. Cliquez sur **Save**.

Dans l'exemple ci-dessous, nous avons la boîte de dialogue **New Connection** pour la connexion AWS. Les informations d'authentification varient selon la connexion. La connexion AWS nécessite l'ID d'un compte et le nom d'un rôle IAM AWS valides.

{{< img src="service_management/workflows/new-connection.png" alt="La boîte de dialogue New Connection pour la connexion AWS" >}}

### Modifier une connexion

1. Accédez à la [liste des connexions][3].
1. Passez le curseur sur la connexion que vous souhaitez modifier. Les icônes **Edit**, **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône en forme de crayon (**Edit**). Une boîte de dialogue apparaît.
1. Mettez à jour les champs que vous voulez modifier.
1. Cliquez sur **Save**.

### Supprimer une connexion

1. Accédez à la [liste des connexions][3].
1. Passez le curseur sur la connexion que vous souhaitez supprimer. Les icônes **Edit**, **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône en forme de corbeille (**Delete**). Le texte "Are you sure?" (Veuillez confirmer) apparaît.
1. Sélectionnez **Delete**.

### Restreindre l'utilisation des connexions

Pour savoir comment limiter l'utilisation de la connexion, consultez la section [Accès et authentification][4].

## Connexion HTTP

Pour vous connecter à un service arbitraire, utilisez le type de connexion HTTP et choisissez parmi les deux options d'authentification suivantes :
- Une authentification basée sur un token
- Un nom d'utilisateur et un mot de passe

### Établir une connexion HTTP

1. Accédez à la [liste des connexions][3].
1. Sélectionnez **New Connection**. Une boîte de dialogue apparaît.
1. Sélectionnez **HTTP Connection**. La boîte de dialogue va afficher les paramètres de connexion HTTP.
1. Saisissez l'**URL de base**.
1. Le cas échéant, cliquez sur **Add +** pour ajouter des en-têtes ou des paramètres d'URL.
1. Choisissez un type de connexion : **Token Auth** ou **Basic Auth**. Saisissez les paramètres appropriés.
1. Cliquez sur **Create** pour enregistrer votre connexion HTTP.

[1]: /fr/service_management/workflows/actions_catalog/generic_actions/
[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[4]: /fr/service_management/workflows/access/#restrict-connection-use
[6]: /fr/integrations/
[8]: /fr/service_management/workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow