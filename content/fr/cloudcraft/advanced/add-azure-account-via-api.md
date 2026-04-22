---
title: Ajouter des comptes Azure via l'API Cloudcraft
---

Cloudcraft n'offre actuellement pas de moyen d'ajouter plusieurs comptes Azure à la fois via l'interface Web, mais vous pouvez le faire via [l'API][1].

<div class="alert alert-info">La possibilité d'ajouter et d'analyser des comptes Azure, ainsi que d'utiliser l'API de développement de Cloudcraft, n'est disponible que pour les abonnés Pro. Consultez <a href="https://www.cloudcraft.co/pricing">la page de tarification de Cloudcraft</a> pour plus d'informations.</div>

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

- Un utilisateur Cloudcraft avec le [rôle Owner ou Administrator][2].
- Un [abonnement Cloudcraft Pro][3] actif.
- Un compte Azure avec les autorisations appropriées.
- Un environnement de type Unix, tel que Linux, macOS ou WSL sur Windows avec cURL installé.
- Une compréhension de base de l'interface de ligne de commande.
- Une compréhension de base de l'utilisation des API.

Vous devez également disposer de l'**Application ID**, du **Directory ID**, du **Subscription ID** et du **Client secret** pour votre compte Azure. Pour obtenir de l'aide pour localiser ces valeurs, consultez la section [Connecter votre compte Azure avec Cloudcraft][4].

## Ajouter un compte Azure

Pour ajouter votre compte Azure à Cloudcraft, ouvrez la ligne de commande et saisissez la commande cURL suivante :

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/azure/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AZURE_ACCOUNT_NAME","applicationId": "APPLICATION_ID","directoryId": "DIRECTORY_ID","subscriptionId": "SUBSCRIPTION_ID","clientSecret": "CLIENT_SECRET"}'
{{< /code-block >}}

Remplacez `_AZURE_ACCOUNT_NAME_` par le nom que vous souhaitez donner au compte dans Cloudcraft et les autres valeurs par les valeurs réelles. Remplacez `_API_KEY_` par votre clé API.

Après avoir ajouté le compte avec succès, vous pouvez utiliser la même commande pour ajouter des comptes supplémentaires à Cloudcraft.

[1]: https://developers.cloudcraft.co/
[2]: /fr/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: /fr/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/