---
aliases:
- /fr/workflows/connections
- /fr/workflows/setup
- /fr/service_management/workflows/connections
- /fr/service_management/app_builder/connections
description: Connexions pour actions
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /actions/app_builder/
  tag: Documentation
  text: Documentation App Builder
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: Centre d'apprentissage
  text: Automatisation d'actions significatives avec Datadog Workflow Automation
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centre d'apprentissage
  text: Créez des applications en libre-service avec App Builder pour les intégrations
    tierces.
title: Connexions
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Les actions, workflows et applications peuvent utiliser des connexions qui envoient des données clients à des services tiers en dehors de la région Datadog for Government. Consultez le <a href="https://trust.datadoghq.com">Trust Center</a> pour obtenir des instructions sur l'obtention de la matrice de responsabilité client et des informations supplémentaires sur la région Datadog for Government.</div>
{{< /site-region >}}

Comme les actions se connectent à des systèmes logiciels externes, vous devrez peut-être authentifier votre compte Datadog auprès de l'intégration correspondante. Une application ou un workflow ne peut s'exécuter correctement que si chaque action nécessitant une authentification peut vérifier l'identité de votre compte Datadog. Lors de l'octroi d'autorisations à Datadog, assurez-vous de suivre les meilleures pratiques de sécurité et de n'accorder que les autorisations nécessaires à l'exécution d'une application ou d'un workflow.

Les actions peuvent être authentifiées à l'aide de deux types d'identifiants :
- Identifiants et autorisations configurés dans la tuile d'intégration
- Identifiants de connexion

## Identifiants de la tuile d'intégration {#integration-tile-credentials}

Les identifiants et l'authentification de compte que vous configurez dans les tuiles d'intégration Datadog suivantes sont automatiquement propagés aux actions correspondantes dans les workflows ou les applications :

- GitHub
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- Slack
- Statuspage

Configurez les tuiles d'intégration en suivant les instructions dans [Datadog Integrations][6].

Si l'intégration que vous devez configurer n'est pas listée ci-dessus, configurez des identifiants de connexion.

## Identifiants de connexion {#connection-credentials}

Les connexions étendent vos intégrations installées pour vous donner le contrôle sur l'authentification des étapes de workflow. Utilisez des identifiants de connexion pour authentifier une [action générique][8] ou toute action pour laquelle la tuile d'intégration ne propose pas d'authentification. Pour obtenir une liste des intégrations qui utilisent la tuile d'intégration pour l'authentification, consultez la section [Identifiants de la tuile d'intégration](#integration-tile-credentials). Les identifiants de connexion ne sont disponibles que pour une utilisation au sein des produits Workflow Automation et App Builder.

Les connexions prennent en charge les exemples de cas d'utilisation suivants :
- L'intégration dont vous avez besoin n'est pas disponible en tant que connexion intégrée.
- Vous souhaitez authentifier une action personnalisée. Par exemple, vous devez utiliser l'action HTTP avec votre propre service.
- Les autorisations nécessaires ne sont pas prises en charge par l'intégration, comme les autorisations d'écriture sur AWS.
- Vous souhaitez un contrôle d'accès granulaire, par exemple en restreignant l'accès des utilisateurs à certains workflows.

### Considérations sur la sécurité des connexions {#connection-security-considerations}

Avant de créer une connexion, réfléchissez aux autorisations nécessaires pour accomplir la tâche requise et n'accordez à la connexion que les autorisations nécessaires pour accomplir cette tâche. De plus, la connexion doit être limitée aux seules personnes qui ont besoin de l'utiliser.

Dans la mesure du possible, utilisez des connexions granulaires pour différents workflows ou applications. Par exemple, si vous avez un workflow qui écrit dans un compartiment Amazon S3 et une application qui termine des instances Amazon EC2, n'utilisez pas la même connexion pour les deux. Créez plutôt deux connexions respectives, chacune correspondant à un rôle IAM avec un périmètre limité.

## Travailler avec des connexions {#work-with-connections}

### Afficher les connexions {#view-connections}

1. Depuis la [page Workflow Automation][2] ou la [page App Builder][14], cliquez sur l'onglet {{< ui >}}Connections{{< /ui >}}. La liste des connexions s'ouvre.
1. Cliquez sur une ligne pour afficher les détails de la connexion.

### Créer une connexion {#create-a-connection}

L'établissement d'une connexion nécessite les informations suivantes :
- À quoi se connecter (par exemple, nom du produit, URL)
- Comment s'authentifier (par exemple, clé d'API, nom d'utilisateur/mot de passe, oauth)

Pour créer une connexion :
1. Depuis la [page Workflow Automation][2] ou la [page App Builder][14], cliquez sur l'onglet {{< ui >}}Connections{{< /ui >}}. La liste des connexions s'ouvre.
1. Cliquez sur le bouton {{< ui >}}New Connection{{< /ui >}} en haut à droite. La boîte de dialogue {{< ui >}}New Connection{{< /ui >}} s'affiche.
1. Cliquez sur une icône pour choisir un schéma d'intégration.
1. Remplissez les champs appropriés. <div class="alert alert-info">Si vous souhaitez ajouter la connexion à un groupe de connexions ultérieurement, ajoutez un ou plusieurs [tags d'identifiant](#connection-identifier-tags).</div>
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

Sinon, ajoutez une connexion depuis une page de workflow ou d'application :


{{< tabs >}}
{{% tab "Workflow Automation" %}}
1. Accédez à la [liste Workflow Automation][1].
1. Sélectionnez le workflow contenant l'action à laquelle vous devez ajouter des identifiants. Le générateur de workflow s'affiche.
1. Dans la visualisation du workflow, cliquez sur l'action à laquelle vous devez ajouter des identifiants. Le volet latéral se remplit avec les détails de l'action.
1. Sous l'onglet {{< ui >}}Configure{{< /ui >}}, recherchez le menu déroulant {{< ui >}}Connection{{< /ui >}} et cliquez sur l'icône {{< ui >}}\+{{< /ui >}}.
1. Dans la boîte de dialogue {{< ui >}}New Connection{{< /ui >}}, nommez la connexion et saisissez les détails d'authentification requis.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/workflow
{{% /tab %}}

{{% tab "App Builder" %}}
1. Accédez à la [liste des applications App Builder][1].
1. Sélectionnez l'application contenant l'action à laquelle vous devez ajouter des identifiants. Le canevas de l'application s'affiche.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}} dans le coin supérieur droit.
1. Sous {{< ui >}}Data{{< /ui >}} sur le côté gauche, cliquez sur l'action à laquelle vous devez ajouter des identifiants. Le panneau latéral gauche se remplit avec les détails de l'action.
1. Recherchez la liste déroulante {{< ui >}}Connection{{< /ui >}} et cliquez sur l'icône {{< ui >}}\+{{< /ui >}}.
1. Dans la boîte de dialogue {{< ui >}}New Connection{{< /ui >}}, nommez la connexion et saisissez les détails d'authentification requis.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/app-builder
{{% /tab %}}
{{< /tabs >}}

L'exemple ci-dessous montre la boîte de dialogue {{< ui >}}New Connection{{< /ui >}} pour la connexion OpenAI. Chaque connexion nécessite des informations d'authentification différentes. La connexion OpenAI nécessite un nom de connexion et un jeton API valides.

{{< img src="actions/connections/new-connection-2.png" alt="La boîte de dialogue Nouvelle connexion pour la connexion OpenAI" >}}

### Modifier une connexion {#edit-a-connection}

1. Depuis la [page Workflow Automation][2] ou la [page App Builder][14], cliquez sur l'onglet {{< ui >}}Connections{{< /ui >}}. La liste des connexions s'ouvre.
1. Survolez la connexion que vous souhaitez modifier. Les icônes {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}} et {{< ui >}}Delete{{< /ui >}} apparaissent sur la droite.
1. Cliquez sur l'icône crayon ({{< ui >}}Edit{{< /ui >}}). Une boîte de dialogue s'affiche.
1. Mettez à jour les champs que vous souhaitez modifier.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Supprimer une connexion {#delete-a-connection}

1. Accédez à la [liste des connexions][3].
1. Survolez la connexion que vous souhaitez supprimer. Les icônes {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}} et {{< ui >}}Delete{{< /ui >}} apparaissent sur la droite.
1. Cliquez sur l'icône corbeille ({{< ui >}}Delete{{< /ui >}}). « Êtes-vous sûr ? » Le texte s'affiche.
1. Sélectionnez {{< ui >}}Delete{{< /ui >}}.

### Restreindre l'utilisation de la connexion {#restrict-connection-use}

Pour savoir comment restreindre l'utilisation d'une connexion, consultez Accès et authentification pour [Workflow Automation][12] ou [App Builder][15].

## Connexion HTTP {#http-connection}

Pour vous connecter à un service arbitraire, utilisez le type de connexion HTTP. Pour les options d'authentification et les instructions de configuration, consultez l'[action HTTP][10].

## Tags d'identifiant de connexion {#connection-identifier-tags}

Vous pouvez ajouter des tags d'identifiant aux connexions. Les règles de tagging pour les connexions sont basées sur les [tags Datadog][13], avec les exigences supplémentaires suivantes :
- Les tags d'identifiant doivent respecter le format `tag:value`, et les deux-points supplémentaires ne sont pas autorisés. Par exemple, les tags d'identifiant `env:staging:east` et `env` sont des formats non valides pour les tags de connexion.
- Les tags d'identifiant doivent commencer par une lettre, après quoi elles peuvent contenir :
    - Alphanumériques
    - Traits de soulignement
    - Tirets
    - Barres obliques
    - Exactement un deux-points
- `default` est une valeur réservée pour les tags d'identifiant de connexion. Elle ne peut pas être utilisée comme clé de tag autonome ou comme valeur de tag. Par exemple, `default:yes` et `aws:default` sont non valides pour les tags de connexion.

## Groupes de connexions {#connection-groups}

Vous pouvez créer des groupes de connexions afin que vos workflows et applications puissent s'authentifier auprès du ou des comptes corrects en fonction des entrées fournies. Les connexions ne peuvent être regroupées que si elles partagent la même intégration (par exemple, vous ne pouvez pas regrouper des connexions GCP et AWS au sein du même groupe).

Vous définissez les membres d'un groupe de connexions à l'aide des _tags d'identifiant_ d'une connexion. Par exemple, vous pouvez créer un groupe de connexions composé de comptes AWS possédant le tag `account_id`.

Chaque connexion du groupe doit disposer d'un ensemble de tags d'identifiant uniques afin qu'un workflow puisse sélectionner dynamiquement la connexion correcte lors de l'exécution. Exemple :
- `connectionA {account_id:123456789}` et `connectionB {account_id:987654321}` peuvent être regroupés.
- `connectionA {account_id:123456789}` et `connectionC {account_id:123456789}` ne peuvent pas être regroupés, car le groupe contiendrait des valeurs de tag en double.

### Créer un groupe de connexions {#create-a-connection-group}

<div class="alert alert-info">Vous ne pouvez ajouter des connexions à un groupe que si vous disposez de l'autorisation <a href="/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection">Resolver</a> pour celles-ci.</div>

Pour créer un groupe de connexions :

1. Accédez à la [liste des connexions][3].
1. Sur la gauche, cliquez sur {{< ui >}}Groups{{< /ui >}}.
1. Cliquez sur {{< ui >}}+ New Group{{< /ui >}}, puis sélectionnez une intégration.
1. Saisissez un nom de groupe, puis saisissez un ensemble de trois {{< ui >}}Identifier Tags{{< /ui >}} au maximum que possèdent toutes les connexions que vous souhaitez inclure dans votre groupe.
1. Sous {{< ui >}}Confirm Group{{< /ui >}}, utilisez les cases à cocher pour sélectionner les membres spécifiques de votre groupe.
1. Cliquez sur {{< ui >}}Next, Confirm Access{{< /ui >}}, puis choisissez le niveau d'accès souhaité pour le groupe.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Utiliser un groupe de connexions {#use-a-connection-group}

Pour utiliser un groupe de connexions :

1. Dans votre workflow ou application, sélectionnez une action qui nécessite une connexion.
1. Dans le champ {{< ui >}}Connection{{< /ui >}}, dans la liste déroulante, sélectionnez le groupe de connexions souhaité sous {{< ui >}}Groups{{< /ui >}}.
1. Remplissez les valeurs souhaitées pour le groupe de connexions {{< ui >}}Identifiers{{< /ui >}}. Par exemple, si votre groupe de connexions est défini à l'aide du tag d'identifiant `env`, et que vous avez deux environnements, `prod` et `staging`, vous pouvez utiliser l'une ou l'autre de ces valeurs (ou une expression qui s'évalue à l'une de ces valeurs).
1. Remplissez toutes les autres valeurs d'étape requises, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque** : vous ne pouvez utiliser des connexions au sein d'un groupe que si vous disposez de l'[autorisation Resolver][12] pour ces connexions. Si un workflow ou une application tente d'utiliser une connexion pour laquelle vous ne disposez pas de l'[autorisation Resolver], cela échoue avec une erreur `403 Forbidden`. Pour résoudre ce problème, vous pouvez :
- Configurez le workflow ou l'application de manière à ce qu'il ne puisse pas pointer vers une connexion qui ne dispose pas de l'[autorisation Resolver].
- Supprimez du groupe de connexions la connexion qui ne dispose pas de l'[autorisation Resolver]. <div class="alert alert-warning">Si vous utilisez un groupe de connexions pour plusieurs workflows ou plusieurs applications, la suppression d'une connexion dont dépend un autre workflow entraînera l'échec de ce workflow.</div>

### Mettre à jour un groupe de connexions {#update-a-connection-group}

Si vous disposez d'un accès en modification à un groupe de connexions, vous pouvez mettre à jour les attributs suivants :
- Nom du groupe
- Tags d'identifiant (ceux-ci ne peuvent jamais être vides, mais ils peuvent être entièrement remplacés)
- Connexions (un groupe peut être vide)

### Supprimer un groupe de connexions {#delete-a-connection-group}

Pour supprimer un groupe de connexions :

1. Passez la souris sur le groupe que vous souhaitez supprimer et cliquez sur l'icône {{< ui >}}delete (trash can){{< /ui >}}.
1. Cliquez sur {{< ui >}}Delete{{< /ui >}}.

<div class="alert alert-danger">La suppression d'un groupe de connexions a un impact sur tous les workflows et applications qui utilisent ce groupe.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** ou **#app-builder** sur le [Slack de la communauté Datadog][11].

[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[6]: /fr/integrations/
[8]: /fr/actions/workflows/actions/
[9]: https://app.datadoghq.com/workflow
[10]: /fr/actions/connections/http/
[11]: https://chat.datadoghq.com/
[12]: /fr/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[13]: /fr/getting_started/tagging/
[14]: https://app.datadoghq.com/app-builder/
[15]: /fr/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection