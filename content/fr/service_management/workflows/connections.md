---
aliases:
- /fr/workflows/connections
- /fr/workflows/setup
description: Connexions des workflows
disable_toc: false
kind: documentation
title: Connexions
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Workflow Automation n'est pas prise en charge pour le <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}) que vous avez sélectionné.</div>
{{< /site-region >}}

Étant donné que les actions des workflows se connectent à des systèmes logiciels externes, il se peut que vous deviez authentifier votre compte Datadog auprès des intégrations correspondantes. Pour qu'un workflow soit exécuté correctement, chacune de ses actions nécessitant une authentification doit pouvoir vérifier l'identité de votre compte Datadog. Lorsque vous accordez des autorisations à Datadog, assurez-vous de suivre les meilleures pratiques en matière de sécurité et d'accorder uniquement les autorisations nécessaires à l'exécution d'un workflow.

Les actions de workflow peuvent être authentifiées de deux manières :
- Avec des Identifiants et autorisations configurés dans les carrés d'intégration
- Avec des identifiants de connexion

## Identifiants dans les carrés d'intégration

Les identifiants et l'authentification de compte que vous configurez dans les carrés d'intégration Datadog sont automatiquement appliqués aux actions correspondantes dans Workflow Automation :
- Jira
- PagerDuty
- Slack
- GitHub

Suivez les instructions indiquées dans la [documentation relative aux intégrations Datadog][6] pour configurer les carrés d'intégration.

Si l'intégration que vous devez configurer n'est pas répertoriée ci-dessus, configurez des identifiants de connexion.

## Identifiants de connexion

Les connexions de workflow viennent enrichir les intégrations que vous avez installées en vous permettant de contrôler l'authentification des étapes des workflows. Utilisez les identifiants de connexion pour authentifier une [action générique][8] ou toute action pour laquelle le carré d'intégration ne propose pas de système d'authentification. Pour obtenir la liste des intégrations qui utilisent le carré d'intégration pour l'authentification, consultez la rubrique [Identifiants dans les carrés d'intégration](#identifiants-dans-les-carres-d-integration). Les identifiants de connexion ne peuvent être utilisés que dans la solution Workflow Automation.

Les connexions sont utiles pour un grand nombre de cas d'utilisation : 
- L'intégration dont vous avez besoin n'est pas disponible en tant que connexion intégrée.
- Vous souhaitez authentifier une action personnalisée, par exemple pour utiliser une action HTTP avec votre propre service.
- Une intégration ne prend pas en charge les autorisations requises, notamment les accès en écriture sur AWS.
- Vous souhaitez bénéficier d'un contrôle d'accès granulaire, par exemple pour limiter l'accès des utilisateurs à certains workflows.

### Considérations relatives à la sécurisation de la connexion

Avant d'établir une connexion, prenez en compte les autorisations nécessaires pour accomplir la tâche requise, puis n'accordez que ces autorisations à la connexion. Prenez également soin d'attribuer ces autorisations uniquement aux personnes qui en ont besoin.

Si possible, utilisez des connexions granulaires lorsque vos workflows diffèrent. Par exemple, pour un workflow qui écrit des données dans un compartiment Amazon S3, et un autre qui met fin à des instances Amazon EC2, n'utilisez pas la même connexion pour les deux workflows. Établissez plutôt deux connexions différentes, chacune correspondant à un rôle IAM avec une portée limitée.

## Utiliser les connexions

### Visualiser les connexions

1. Depuis la [page Workflow Automation][2], cliquez sur **Connections** en haut à droite. La [liste des connexions][3] s'ouvre alors.
1. Cliquez sur une ligne pour afficher les détails de la connexion.

### Établir une connexion

Les informations suivantes sont nécessaires pour établir une connexion :
- L'élément à connecter (par exemple, nom du produit, URL)
- Le mode d'authentification (par exemple, clé d'API, nom d'utilisateur et mot de passe, oauth)

Pour établir une connexion, procédez comme suit :
1. Accédez à la [liste des connexions][3].
1. Cliquez sur **New Connection** en haut à droite. La boîte de dialogue **New Connection** s'affiche alors.
1. Cliquez sur une icône pour choisir un schéma d'intégration.
1. Remplissez les champs appropriés, puis cliquez sur **Create**.

Vous pouvez également ajouter une connexion à partir de la page du workflow :
1. Accédez à la [liste Workflow Automation][9].
1. Sélectionnez le workflow contenant l'action à laquelle vous souhaitez ajouter un identifiant. Le générateur de workflow s'affiche alors.
1. Dans la vue du workflow, cliquez sur l'action à laquelle vous devez ajouter un identifiant. Le volet de droite contient les détails de l'action.
1. Sous l'onglet **Configure**, recherchez le menu déroulant **Connection** et cliquez sur l'icône **+**.
1. Dans la boîte de dialogue **New Connection**, attribuez un nom à la connexion et saisissez les informations d'authentification requises.
1. Cliquez sur **Save**.

L'exemple ci-dessous représente la boîte de dialogue **New Connection** de la connexion AWS. Les informations d'authentification varient selon la connexion. La connexion AWS nécessite l'ID d'un compte AWS IAM et le nom du rôle.

{{< img src="service_management/workflows/new-connection.png" alt="La boîte de dialogue New Connection de la connexion AWS" >}}

### Modifier une connexion

1. Accédez à la [liste des connexions][3].
1. Passez le curseur sur la connexion que vous souhaitez modifier. Les icônes **Edit**, **Permissions** et **Delete** apparaissent alors à droite.
1. Cliquez sur l'icône en forme de crayon (**Edit**). Une boîte de dialogue s'affiche alors.
1. Modifiez les champs de votre choix.
1. Cliquez sur **Save**.

### Supprimer une connexion

1. Accédez à la [liste des connexions][3].
1. Passez le curseur sur la connexion que vous souhaitez supprimer. Les icônes **Edit**, **Permissions** et **Delete** apparaissent alors à droite.
1. Cliquez sur l'icône en forme de corbeille (**Delete**). Le message de demande de confirmation « Are you sure? » s'affiche alors.
1. Sélectionnez **Delete**.

### Restreindre l'utilisation des connexions

Pour savoir comment limiter l'utilisation des connexions, consultez la section [Accès et authentification][4].

## Connexion HTTP

Pour vous connecter à un service arbitraire, utilisez le type de connexion HTTP, puis choisissez parmi les deux options d'authentification suivantes :
- Authentification basée sur un token
- Nom d'utilisateur et mot de passe

### Établir une connexion HTTP

1. Accédez à la [liste des connexions][3].
1. Sélectionnez **New Connection**. Une boîte de dialogue apparaît alors.
1. Sélectionnez **HTTP Connection**. La boîte de dialogue affiche alors les paramètres de connexion HTTP.
1. Saisissez l'URL de base dans le champ **Base URL**.
1. Si besoin, cliquez sur le bouton **Add +** pertinent pour ajouter des en-têtes ou des paramètres d'URL.
1. Choisissez un type de connexion : **Token Auth** ou **Basic Auth**. Saisissez les paramètres appropriés.
1. Cliquez sur **Create** pour enregistrer votre connexion HTTP.

[1]: /fr/service_management/workflows/actions_catalog/generic_actions/
[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[4]: /fr/service_management/workflows/access/#restrict-connection-use
[6]: /fr/integrations/
[8]: /fr/service_management/workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow