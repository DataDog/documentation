---
title: Dépannage des erreurs relatives aux couches sans serveur non autorisées
---
Ce guide vous aide à corriger l'erreur de déploiement `not authorized to perform: lambda:GetLayerVersion on resource`. Cette erreur concerne généralement les couches de la bibliothèque Lambda Datadog ou la couche de l'extension Datadog.

## Paramètre de région
Les fonctions Lamda peuvent uniquement inclure des [couches Lambda][1] situées dans la même région que la fonction. Cette erreur se manifeste habituellement lorsque des utilisateurs copient les paramètres d'instrumentation d'autres applications déployées dans différentes régions.

Vérifiez que la région de la couche lambda et que la version de la fonction Lambda correspondent. Assurez-vous également que le numéro de version est correct.

Pour vérifier qu'une version de couche Lambda existe, exécutez `aws lambda get-layer-version` en spécifiant des identifiants AWS valides.

Par exemple, pour vérifier la couche d'extension Datadog et la couche de la bibliothèque Node.js Datadog, exécutez ce qui suit :
```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

## Autorisations
Il arrive que les utilisateurs `DENY` explicitement et malencontreusement l'autorisation permettant à leurs fonctions d'exécuter `lambda:GetLayerVersion`. Certaines configurations de stratégies [basées sur des ressources][2] peuvent donner lieu à un `DENY` explicite. Les [
limites d'autorisations][3] IAM peuvent également engendrer un `DENY` explicite pour `lambda:GetLayerVersion`.

Pour vérifier si l'autorisation est bien accordée, utilisez un utilisateur IAM lié à la stratégie IAM utilisée par votre fonction Lambda, puis testez la commande `get-layer-version` indiquée ci-dessus. La commande ne doit renvoyer aucune erreur.

## Contacter l'assistance Datadog

Si vous souhaitez faire appel à l'équipe d'assistance Datadog pour poursuivre votre dépannage, fournissez les éléments suivants dans votre ticket :

1. Les couches Lambda configurées de votre fonction (nom et version, ou ARN)
2. Les fichiers de configuration du projet, en prenant soin de **censurer les secrets codés en durs** : `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` et `webpack.config.json`.
3. Les stratégies IAM du projet et les informations relatives aux rôles.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html