---
title: Ajouter des comptes AWS via l'API Cloudcraft
---

Cloudcraft n'offre actuellement pas de moyen d'ajouter plusieurs comptes AWS à la fois via l'interface Web, mais vous pouvez le faire via [l'API][1].

<div class="alert alert-info">La possibilité d'ajouter et d'analyser des comptes AWS, ainsi que d'utiliser l'API de développement de Cloudcraft, n'est disponible que pour les abonnés Pro. Consultez <a href="https://www.cloudcraft.co/pricing">la page de tarification de Cloudcraft</a> pour plus d'informations.</div>

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

- Un utilisateur Cloudcraft avec le [rôle Owner ou Administrator][2].
- Un [abonnement Cloudcraft Pro][3] actif.
- Un compte AWS avec l'autorisation de créer des rôles IAM.
- Un environnement de type Unix, tel que Linux, macOS ou WSL sur Windows avec cURL et [l'AWS CLI][4] installés.
- Une compréhension de base de l'interface de ligne de commande.
- Une compréhension de base de l'utilisation des API.

## Obtenir les paramètres du rôle AWS IAM

Commencez par utiliser le endpoint [Get my AWS IAM Role parameters][5] de l'API Cloudcraft et enregistrez la réponse.

Pour ce faire, ouvrez la ligne de commande et saisissez la commande cURL suivante :

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account/iamParameters' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer ${API_KEY}"
{{< /code-block >}}

Remplacez `API_KEY` par votre clé d'API Cloudcraft. La réponse devrait ressembler à ceci :

{{< code-block lang="json" filename="cloudcraft-response.json" >}}
{
  "accountId": "1234567890",
  "externalId": "ex53e827-a724-4a2a-9fec-b13761540785",
  "awsConsoleUrl": "https://console.aws.amazon.com/iam/home?#/roles..."
}
{{< /code-block >}}

Enregistrez une copie des champs `accountId` et `externalId`, car vous en aurez besoin lors de la création du rôle IAM à l'étape suivante.

## Créer le rôle IAM

Ensuite, utilisez la commande _create-role_ dans l'AWS CLI pour créer le rôle IAM.

{{< code-block lang="shell" >}}
aws iam create-role \
  --role-name 'cloudcraft' \
  --description 'Programmatically created IAM role for use with Cloudcraft.' \
  --max-session-duration '3600' \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"arn:aws:iam::ACCOUNT_ID:root"},"Action":"sts:AssumeRole","Condition":{"StringEquals":{"sts:ExternalId":"EXTERNAL_ID"}}}]}' \
  --query 'Role.Arn' \
  --output 'text'
{{< /code-block >}}

Remplacez `ACCOUNT_ID` et `EXTERNAL_ID` par les valeurs que vous avez obtenues à l'étape précédente.

En cas de succès, une réponse avec l'ARN du compte du rôle s'affiche. Enregistrez cette valeur pour plus tard.

Cependant, le rôle n'a encore aucune autorisation attachée. Pour connecter le rôle `ReadOnlyAccess`, utilisez la commande `attach-role-policy` dans l'AWS CLI.

{{< code-block lang="shell" >}}
aws iam attach-role-policy \
  --role-name 'cloudcraft' \
  --policy-arn 'arn:aws:iam::aws:policy/ReadOnlyAccess'
{{< /code-block >}}

**Remarque** : si vous avez donné un nom différent au rôle à l'étape précédente, assurez-vous de remplacer _cloudcraft_ par le nom que vous avez utilisé. 

## Ajouter le compte AWS à Cloudcraft

Enfin, une fois que vous avez créé le rôle IAM, vous pouvez ajouter le compte AWS à Cloudcraft. Vous pouvez le faire en utilisant l'ARN du rôle que vous avez créé et en appelant [l'API de développement de Cloudcraft][7].

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AWS_ACCOUNT_NAME","roleArn":"ROLE_ARN","region":"us-east-1"}' \
{{< /code-block >}}

Remplacez `AWS_ACCOUNT_NAME` par le nom que vous souhaitez donner au compte dans Cloudcraft et `ROLE_ARN` par l'ARN du rôle que vous avez créé à l'étape précédente. Vous devez également remplacer `us-east-1` par la région à partir de laquelle vous souhaitez que le compte soit vérifié, et `API_KEY` par votre clé d'API.

Après avoir ajouté le compte avec succès, vous pouvez utiliser la même commande pour ajouter des comptes supplémentaires à Cloudcraft.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/85-roles-and-permissions
[3]: https://www.cloudcraft.co/pricing
[4]: https://aws.amazon.com/cli/
[5]: https://developers.cloudcraft.co/#aa18999e-f6da-4628-96bd-49d5a286b928
[6]: https://app.cloudcraft.co/support
[7]: https://developers.cloudcraft.co