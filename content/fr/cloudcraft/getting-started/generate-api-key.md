---
title: Générer une clé d'API
---

Cloudcraft met à disposition une [API développeur][1] permettant d'accéder à vos diagrammes d'architecture de façon programmatique et de générer leur rendu à distance. Elle offre aussi une visualisation entièrement automatisée des comptes AWS et Azure liés à votre compte Cloudcraft, disponible soit en images prêtes à l'emploi, soit en données JSON.

Une authentification est requise pour utiliser cette API. Ce guide explique comment créer une clé d'API via l'interface web.

<div class="alert alert-info">L'accès à l'API développeur de Cloudcraft est réservé aux abonnés Pro. Consultez la <a href="https://www.cloudcraft.co/pricing">page des tarifs Cloudcraft</a> pour plus d'informations sur les formules d'abonnement.</div>

## Prérequis

Ce guide suppose que vous avez :

- Un utilisateur de Cloudcraft avec le rôle [Propriétaire ou Administrateur][2].
- Un abonnement actif à [Cloudcraft Pro][3].

## Créer une clé d'API

Pour créer une clé d'API destinée à l'automatisation, allez dans **User** > **API keys** et cliquez sur **Create API key**.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-button.png" alt="Capture d'écran de l'interface Cloudcraft pour la gestion des clés d'API, mettant en évidence le bouton 'Create API key'." responsive="true" style="width:75%;">}}

Nommez la clé pour décrire son objectif, par exemple 'Automation Key', et attribuez les autorisations appropriées. Sélectionnez l'autorisation la plus adaptée à cette clé, en respectant le [principe du moindre privilège][4]. Ce même principe s'applique lorsque vous donnez à des équipes l'accès à cette clé.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-window.png" alt="Capture d'écran de l'interface de création de clé d'API Cloudcraft, avec des champs pour le nommage et la définition des autorisations." responsive="true" style="width:100%;">}}

Lorsque vous avez terminé, cliquez sur **Save key** pour créer une nouvelle clé d'API. Veillez à conserver cette clé dans un endroit sécurisé afin de pouvoir l'utiliser ultérieurement.

Si vous avez des questions ou des problèmes concernant la création d'une clé d'API, [contactez l'équipe d'assistance de Cloudcraft via la balise dans l'app][5].

[1]: /fr/cloudcraft/api/
[2]: /fr/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[5]: https://app.cloudcraft.co/support