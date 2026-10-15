---
description: Connectez les actions Datadog à votre propre application GitHub au lieu
  d'utiliser l'intégration GitHub de Datadog.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentation
  text: Connexions
title: Connexion de l'application GitHub
---
## Présentation {#overview}

Utilisez une connexion d'application GitHub lorsque vous souhaitez intégrer votre propre application GitHub plutôt que d'authentifier les actions avec la tuile d'intégration GitHub de Datadog.

Avec cette connexion, Datadog s'authentifie en tant qu'installation de votre application GitHub. Vous fournissez l'ID de l'application GitHub, l'ID d'installation et la clé privée, et Datadog utilise ces informations d'identification pour demander automatiquement des jetons d'accès à courte durée de vie. Cette approche vous permet de contrôler les dépôts et les autorisations disponibles pour vos workflows et vos applications.

## Créez et installez une application GitHub {#create-and-install-a-github-app}

Si vous disposez déjà d'une application GitHub installée avec les autorisations requises par vos actions, passez à [Collecter les informations d'identification de connexion](#gather-the-connection-credentials). Pour plus de détails sur les options de création d'une application GitHub, consultez le guide [Enregistrement d'une application GitHub][5] de GitHub.

1. Dans GitHub, accédez aux **Paramètres** de votre organisation > **Paramètres développeur** > **Applications GitHub**.
1. Cliquez sur **Nouvelle application GitHub**.
1. Saisissez un nom d'application et une URL de page d'accueil.
1. Sous **Webhook**, décochez la case **Actif** sauf si vous utilisez le webhook de l'application à une autre fin. Une connexion d'application GitHub ne nécessite pas de webhook.
1. Sous **Autorisations**, accordez l'accès uniquement aux ressources requises par vos actions, telles que le contenu des dépôts, les pull requests ou les issues.
1. Cliquez sur **Créer une application GitHub**.
1. Sur la page des paramètres de l'application, cliquez sur **Installer l'application**.
1. Sélectionnez l'organisation où vous souhaitez installer l'application, puis choisissez si l'application peut accéder à tous les dépôts ou uniquement à certains dépôts sélectionnés.
1. Cliquez sur **Installer**.

Selon la politique de votre organisation concernant les applications GitHub, l'installation de l'application peut nécessiter l'approbation d'un propriétaire d'organisation.

## Rassemblez les identifiants de connexion {#gather-the-connection-credentials}

Rassemblez les valeurs suivantes depuis GitHub :

- **ID de l'application** : Sur la page des paramètres de l'application GitHub, copiez l'ID numérique de l'application affiché près du haut de la page.
- **ID d'installation** : Ouvrez les paramètres d'installation de l'application. L'ID d'installation est la valeur numérique à la fin de l'URL, telle que `github.com/organizations/<org>/settings/installations/12345678`.
- **Clé privée** : Sur la page des paramètres de l'application GitHub, sous **Clés privées**, cliquez sur **Générer une clé privée**. GitHub télécharge un fichier `.pem`. Stockez le fichier en toute sécurité ; vous ne pouvez pas télécharger à nouveau la même clé privée depuis GitHub.

## Créez la connexion dans Datadog {#create-the-connection-in-datadog}

Une fois l'application GitHub configurée, créez la connexion dans Datadog :

1. Depuis la [page Action Catalog][1], cliquez sur l'onglet {{< ui >}}Connections{{< /ui >}}.
1. Cliquez sur {{< ui >}}New Connection{{< /ui >}}.
1. Sélectionnez le type de connexion {{< ui >}}GitHub{{< /ui >}}.
1. Sélectionnez le type d'identifiants {{< ui >}}GitHub App{{< /ui >}}.
1. Saisissez un nom de connexion.
1. Saisissez l'ID de l'application et l'ID d'installation que vous avez copiés depuis GitHub.
1. Dans le champ {{< ui >}}Private Key{{< /ui >}}, collez le contenu complet du fichier `.pem`.
1. Si vous utilisez GitHub Enterprise Server, saisissez son nom de host dans le champ {{< ui >}}GitHub Hostname{{< /ui >}}. Laissez ce champ vide pour `github.com`.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

La connexion est privée par défaut. Pour permettre à d'autres utilisateurs de l'utiliser dans des workflows ou des applications, configurez l'accès à partir des paramètres d'autorisations de la connexion. Pour plus d'informations, consultez Accès et authentification pour [Workflow Automation][2] ou [App Builder][3].

## Mettre à jour les autorisations de l'application GitHub {#update-github-app-permissions}

Si vous ajoutez des autorisations à une application GitHub après l'avoir installée, les installations existantes ne reçoivent pas les autorisations automatiquement. Ouvrez les paramètres d'installation de l'application pour chaque organisation ou compte et acceptez les nouvelles autorisations avant de les utiliser dans une action.

## Dépannage {#troubleshooting}

### Les actions utilisent la mauvaise organisation ou les mauvais dépôts {#actions-use-the-wrong-organization-or-repositories}

Vérifiez que l'ID d'installation dans la connexion correspond à l'installation pour l'organisation et les dépôts attendus. Vous pouvez trouver l'ID d'installation dans l'URL des paramètres d'installation de l'application.

### Une action renvoie une erreur d'autorisation {#an-action-returns-a-permission-error}

Vérifiez les autorisations configurées pour l'application GitHub et les dépôts disponibles pour son installation. Si vous avez ajouté des autorisations après avoir installé l'application, ouvrez les paramètres d'installation et acceptez la nouvelle demande d'autorisation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** ou **#app-builder** sur le [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/actions/action-catalog
[2]: /fr/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[3]: /fr/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection
[4]: https://chat.datadoghq.com/
[5]: https://docs.github.com/apps/creating-github-apps/registering-a-github-app/registering-a-github-app