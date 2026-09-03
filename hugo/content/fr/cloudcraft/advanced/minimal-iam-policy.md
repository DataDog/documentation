---
title: Créer une politique IAM personnalisée à utiliser avec Cloudcraft
---

Cloudcraft utilise un rôle IAM en _lecture seule_ pour analyser votre compte AWS et effectuer une rétro-ingénierie des relations de service entre les composants afin de générer automatiquement un diagramme de votre architecture.

Le moyen le plus simple de tout configurer est de suivre les instructions dans l'application, qui crée le rôle et configure les autorisations pour vous en quelques clics. Le rôle se voit attribuer la politique IAM `ReadOnlyAccess` gérée par AWS par défaut.

Si vous devez contrôler plus précisément les autorisations, par exemple pour exclure certains services ou API, une politique IAM Cloudcraft personnalisée vous permettra de le faire.

<div class="alert alert-info">Si vous utilisez une politique IAM personnalisée, vous devez la maintenir manuellement à jour au fur et à mesure que de nouveaux services et fonctionnalités sont ajoutés à Cloudcraft. Si vous voyez un avis dans l'application indiquant <strong>Accès AWS limité</strong>, essayez de mettre à jour votre politique IAM personnalisée avec la dernière version ci-dessous.</div>

## Créer une politique IAM personnalisée

Commencez par ouvrir la [console des politiques IAM][1] et cliquez sur le bouton **Create Policy**.

{{< img src="cloudcraft/advanced/minimal-iam-policy/create-policy.png" alt="Console de gestion AWS IAM mettant en évidence le bouton Create policy." responsive="true" style="width:100%;">}}

Passez à l'onglet JSON et copiez le contenu de l'une des politiques liées ci-dessous :

Vous pouvez également personnaliser la politique pour répondre à vos exigences uniques.

- **[Politique IAM personnalisée Cloudcraft][2] :** cette politique est plus stricte que la politique `ReadOnlyAccess` par défaut. La politique inclut uniquement les services individuels et les autorisations en lecture seule que Cloudcraft utilise. La politique devra généralement être mise à jour lorsque Cloudcraft ajoute la prise en charge de services entièrement nouveaux.
- **[Politique IAM minimale Cloudcraft][3] :** il s'agit de la forme de politique la plus stricte. La politique répertorie chaque autorisation individuelle en lecture seule pour une fonctionnalité Cloudcraft complète. Cette politique doit être mise à jour plus fréquemment, à la fois lorsque la prise en charge de nouveaux services est ajoutée et lorsque les services existants sont améliorés.
- Vous pouvez utiliser l'une ou l'autre des politiques ci-dessus comme base pour vos propres personnalisations. Par exemple, des services ou des autorisations individuels peuvent être supprimés. Si un service ne peut pas être accessible par Cloudcraft, le service sera exclu du diagramme résultant.

Cliquez sur le bouton **Review policy** en bas de l'écran, puis saisissez un nom et une description. Cloudcraft recommande d'utiliser les valeurs suivantes pour que les choses restent organisées et plus faciles à auditer.

- **Policy Name :** Cloudcraft
- **Policy Description :** Politique personnalisée pour Cloudcraft.

Ensuite, cliquez sur **Create policy** pour créer la politique. La console AWS vous redirige vers la page des politiques.

Enfin, attachez la politique nouvellement créée au [rôle IAM Cloudcraft][4]. Si vous n'avez pas encore créé le rôle, suivez les instructions dans l'application.

[1]: https://console.aws.amazon.com/iamv2/home#/policies
[2]: https://api.cloudcraft.co/aws/account/iamParameters/policy/custom
[3]: https://api.cloudcraft.co/aws/account/iamParameters/policy/minimal
[4]: https://console.aws.amazon.com/iam/home?#/roles/cloudcraft