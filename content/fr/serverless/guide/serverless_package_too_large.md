---
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentation
  text: Instrumenter des applications Node.js
title: Correction des erreurs de package sans serveur trop volumineux
---

Ce guide vous explique comment corriger l'erreur « Code uncompressed size is greater than max allowed size of 272629760 ». Cette erreur survient généralement lorsque des applications sans serveur Node.js sont instrumentées avec le plug-in Serverless Datadog. La procédure décrite sur cette page peut également corriger cette erreur pour d'autres langages ou méthodes de déploiement.

Cette erreur signale que la taille du code _décompressé_ de votre fonction dépasse la limite de 250 Mo. Cette limite tient compte du [package de votre fonction][1] (l'artefact `.zip` contenant le code et les dépendances de votre fonction) ainsi que des [couches Lambda][2] configurées pour votre fonction. Examinez donc votre package et vos couches afin d'identifier d'où provient l'erreur.

## Couches

Datadog ajoute généralement deux couches Lambda pour l'instrumentation :

- Une bibliothèque propre au langage qui instrumente le code de la fonction
- L'extension qui agrège, met en mémoire tampon et transmet les données d'observabilité au backend Datadog

Vérifiez le contenu et la taille des couches Lambda Datadog à l'aide de la commande AWS CLI [`aws lambda get-layer-version`][3]. Par exemple, les commandes ci-dessous fournissent des liens afin de télécharger les couches Lambda pour _la {{< latest-lambda-layer-version layer="node" >}} de Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} et _la version 19 de Datadog-Extension et de vérifier leur taille non compressée (environ 30 Mo pour les couches). La taille non compressée varie selon les couches et les versions. Remplacez le nom de la couche et le numéro de version de l'exemple suivant par les valeurs pertinentes pour vos applications :

```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

Outre les couches Lambda Datadog, examinez également les autres couches Lambda qui ont été ajoutées (ou le seront) à vos fonctions. Si vous utilisez le [Serverless Framework][4], vous pouvez accéder au modèle CloudFormation depuis le dossier masqué `.serverless` après avoir exécuté la commande `deploy` ou `package`, ainsi qu'à la liste des couches Lambda depuis la section `Layers`.

## Package

Le package de déploiement de la fonction peut contenir des fichiers ou du code volumineux qui ne vous ont aucune utilité. Si vous utilisez le Serverless Framework, vous pouvez accéder au package de déploiement généré (fichier `.zip`) depuis le dossier masqué `.serverless` après avoir exécuté la commande `deploy` ou `package`.

Si la somme de la taille du package de déploiement et des couches ne dépasse pas la limite, contactez l'assistance AWS afin de poursuivre le processus de dépannage. Si la taille totale dépasse la limite, examinez le package de déploiement et excluez les fichiers volumineux qui ne sont pas utilisés pour l'exécution à l'aide de l'option [package][5].

## Dépendances

La couche Lambda Datadog empaquette les bibliothèques d'instrumentation afin que vous puissiez les exploiter dans l'environnement d'exécution Lambda. Vous n'avez donc _pas_ besoin de spécifier `datadog-lambda-js` et `dd-trace` en tant que dépendances dans votre fichier `package.json`. Si vous avez besoin des bibliothèques Datadog pour des tests ou des builds locaux, utilisez l'option `devDependencies` pour les spécifier, afin de les exclure du package de déploiement. De même, `serverless-plugin-datadog` sert uniquement au développement, et doit également être spécifié avec l'option `devDependencies`.

Examinez également les autres dépendances (dans le dossier `node_modules`) incluses dans votre package de déploiement. Conservez uniquement celles dont vous avez besoin dans `dependencies`.

## Webpack

Vous pouvez utiliser un bundler comme [Webpack][6] pour réduire de façon significative la taille de votre package de déploiement, en incluant uniquement le code utilisé. Consultez la section [Tracing Lambda Node.js et compatibilité de Webpack][7] pour découvrir les configurations Webpack requises.

## Obtenir de l'aide

Si vous souhaitez faire appel à l'équipe d'assistance Datadog pour poursuivre votre dépannage, fournissez les éléments suivants dans votre ticket :

1. Les couches Lambda configurées de votre fonction (nom et version, ou ARN)
2. Le package de déploiement de votre fonction (ou une capture d'écran du contenu et de la taille du package non compressé) à importer dans AWS
3. Les fichiers de configuration du projet, avec les **secrets codés en dur censurés** : `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` et `webpack.config.json`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-zip
[2]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-layer-version.html
[4]: https://www.serverless.com/
[5]: https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/#package
[6]: https://webpack.js.org
[7]: /fr/serverless/guide/serverless_tracing_and_webpack/