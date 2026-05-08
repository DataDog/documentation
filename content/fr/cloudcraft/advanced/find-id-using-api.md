---
title: Trouver un ID de compte Cloud ou d'équipe à l'aide de notre API
---

## Présentation

Actuellement, l'interface utilisateur Cloudcraft n'expose pas l'ID de vos comptes AWS ou Azure ou de vos équipes. Cependant, vous pouvez toujours trouver ces ID en utilisant notre API et un peu de travail manuel.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

- Un utilisateur Cloudcraft avec le rôle [Propriétaire ou Administrateur][1].
- Un [abonnement Cloudcraft Pro][2].
- Un environnement de type Unix, tel que Linux, macOS ou WSL sur Windows avec cURL et [jq][3] installés.
- Une compréhension de base de l'interface de ligne de commande.
- Une compréhension de base de l'utilisation des API.

Vous devez également avoir au moins un compte AWS ou Azure ajouté à Cloudcraft.

## Trouver l'ID du compte cloud

Trouver l'ID de votre compte AWS ou Azure est facile ; vous pouvez le faire en effectuant un seul appel d'API.

Pour trouver l'ID de votre compte cloud, exécutez la commande suivante :

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq .
{{< /code-block >}}

Remplacez `PROVIDER` par `aws` ou `azure` et `API_KEY` par votre clé d'API Cloudcraft.

La réponse devrait ressembler à ceci pour AWS :

{{< code-block lang="json" filename="cloudcraft-aws-response.json" >}}
{
  "accounts": [
    {
      "id": "8bfc6773-7fa2-49b3-8016-5e0e9a2e2aff",
      "name": "Development",
      "roleArn": "arn:aws:iam::600111810075:role/cloudcraft",
      "externalId": "93cf2e38-742a-4321-bcee-1d8b8fe35b8b",
      "readAccess": null,
      "writeAccess": null,
      "createdAt": "2024-02-21T15:19:26.232Z",
      "updatedAt": "2024-02-21T15:19:26.701Z",
      "CreatorId": "f179a0f9-ebf6-4a6a-afd8-74d608498a1f",
      "source": "aws"
    }
  ]
}
{{< /code-block >}}

Et à ceci pour Azure :

{{< code-block lang="json" filename="cloudcraft-azure-response.json" >}}
{
  "accounts": [
    {
      "id": "e18da22b-330d-4091-bb57-c46654df5351",
      "name": "Development",
      "applicationId": "598c6f24-c2e2-4870-88bd-d42fe6f5c998",
      "directoryId": "c6444a86-1cfe-4312-add5-61e2c140648b",
      "subscriptionId": "74efa8fe-0997-49b0-963d-ea88bf80fe11",
      "readAccess": null,
      "writeAccess": null,
      "createdAt": "2023-11-20T22:11:43.688Z",
      "updatedAt": "2023-11-20T22:11:43.688Z",
      "CreatorId": "2d95eeb8-7161-48f8-88e4-8f0d6bb7b47f",
      "hint": "9NP",
      "source": "azure"
    }
  ]
}
{{< /code-block >}}

Le champ `id` contient l'ID de votre compte cloud.

## Trouver l'ID de l'équipe

Cloudcraft n'expose pas l'ID de l'équipe dans l'interface utilisateur ou via un simple appel d'API. Cependant, vous pouvez toujours trouver l'ID de l'équipe en utilisant l'interface utilisateur Cloudcraft en combinaison avec l'API.

Pour trouver l'ID de votre équipe, suivez ces étapes :

1. Ouvrez l'interface utilisateur Cloudcraft et créez un nouveau blueprint vide.
2. Cliquez sur le bouton **Share & Export** dans le coin supérieur droit.
3. Sous **Share with a team...**, cliquez sur le champ et sélectionnez l'équipe ou les équipes pour lesquelles vous souhaitez obtenir l'ID.

{{< img src="cloudcraft/advanced/find-id-using-api/share-with-team.mp4" alt="Une courte vidéo montrant un utilisateur Cloudcraft sélectionnant les équipes Datadog et Cloudcraft dans le menu Share & Export." video="true">}}

4. Copiez l'ID du plan à partir de l'URL. L'ID est la partie de l'URL qui vient après `blueprint/`.

5. Passez au terminal et exécutez la commande suivante :

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/blueprint/ID' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq '.readAccess'
{{< /code-block >}}

Remplacez `ID` par l'ID du plan que vous avez créé et `API_KEY` par votre clé d'API Cloudcraft.

La réponse devrait ressembler à ceci :

{{< code-block lang="json" filename="cloudcraft-blueprint-response.json" >}}
[
  "team/9e7e8b46-cfb7-486e-ade5-bd8c1ec1971a",
  "team/af6b55f1-f604-4b88-8b4f-c4779cb7a799"
]
{{< /code-block >}}

L'UUID après `team/` est l'ID de votre équipe.

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://jqlang.github.io/jq/