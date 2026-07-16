---
title: Intégrer des diagrammes Cloudcraft dans l'application Confluence
---

Cet article décrit la marche à suivre pour intégrer naturellement vos diagrammes Cloudcraft existants à une page Confluence grâce à l'app Confluence de Cloudcraft.

Ce processus vous permet d'accorder aux utilisateurs autorisés un accès aux diagrammes, sans nécessiter d'abonnements Cloudcraft individuels, et de bénéficier d'une documentation centralisée et à jour de votre infrastructure.

## Installer l'application

Pour installer l'application Confluence de Cloudcraft, connectez-vous à Confluence en tant qu'administrateur, accédez à [l'offre Cloudcraft du marketplace][1], puis cliquez sur **Get it now**.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/marketplace-listing.png" alt="App de Cloudcraft dans le marketplace Atlassian." responsive="true" style="width:100%;">}}

## Utiliser l'application

Ouvrez une page Confluence, saisissez **/cloudcraft**, puis cliquez sur la commande d'application qui s'affiche.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/embed-command.png" alt="L'outil Cloudcraft permettant d'intégrer des diagrammes dans un document Confluence." responsive="true" style="width:100%;">}}

Cliquez ensuite sur **Sign in** pour vous connecter à votre compte Cloudcraft.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/signin-or-signup.png" alt="La page de connexion de Cloudcraft pour l'intégration Confluence, avec des options pour se connecter avec Datadog, Google ou une adresse e-mail." responsive="true" style="width:100%;">}}

Une fois la connexion établie, l'outil de sélection de diagramme s'affiche. Sélectionnez le diagramme que vous souhaitez intégrer depuis la liste.

<div class="alert alert-info">Vous pouvez également rechercher, filtrer et trier les diagrammes dans l'outil de sélection de diagramme.</div>

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/blueprint-picker.png" alt="L'app Confluence de Cloudcraft affichant des options permettant d'insérer des blueprints d'architecture cloud dans une page Confluence, avec des diagrammes étiquetés pour des environnements intermédiaires ou en production." responsive="true" style="width:100%;">}}

Après avoir sélectionné un diagramme, un aperçu du diagramme intégré s'affiche sur votre page Confluence. Vous avez la possibilité de sélectionner le menu de taille de fenêtre pour modifier la largeur du diagramme, ou encore de cliquer sur l'icône de crayon pour rouvrir l'outil de sélection de diagramme.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/window-size-menu.png" alt="Une vue isométrique d'une disposition d'infrastructure cloud dans Cloudcraft, avec des instances EC2, des répartiteurs de charge et des bases de données RDS intégrées à une page Confluence." responsive="true" style="width:100%;">}}

Lorsque vous publiez ou prévisualisez la page Confluence, l'ensemble de votre diagramme Cloudcraft est intégré à la page.

Seuls les utilisateurs Confluence peuvent consulter les diagrammes intégrés. Les diagrammes ne s'affichent pas si vous accédez à une page Confluence depuis l'URL publique.

[1]: https://marketplace.atlassian.com/apps/1233281/cloudcraft-aws-and-azure-cloud-diagrams-for-confluence?hosting=cloud&tab=overview