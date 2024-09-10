---
aliases:
- /fr/serverless/serverless_integrations/plugin
dependencies:
- https://github.com/DataDog/serverless-plugin-datadog/blob/master/README.md
title: Plug-in Serverless Framework Datadog
---
![build](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![Couverture du code](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![Licence](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog recommande aux développeurs d'utiliser le plug-in Serverless Framework s'ils se servent de ce framework pour déployer des applications sans serveur. Le plug-in active automatiquement l'instrumentation de vos applications afin de recueillir des métriques, des traces et des logs. Pour y parvenir, il effectue les opérations suivantes :

- Il installe la bibliothèque Lambda Datadog pour vos fonctions Lambda en tant que couche Lambda.
- Il installe l'extension Lambda Datadog pour vos fonctions Lambda en tant que couche Lambda (`addExtension`) ou abonne le Forwarder Datadog aux groupes de logs de votre fonction Lambda (`forwarderArn`).
- Il apporte les modifications nécessaires à la configuration de vos fonctions Lambda, en ajoutant par exemple des variables d'environnement ou des couches de tracing supplémentaires à vos fonctions Lambda.

## Prise en main

Pour vous lancer rapidement, suivez les instructions d'installation pour [Python][1], [Node.js][2], [Ruby][3], [Java][4], [Go][5] ou [.NET][6] et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog.

Une fois l'installation terminée, configurez les [options avancées](https://docs.datadoghq.com/serverless/configuration) en fonction de vos besoins en matière de surveillance.

## Mise à niveau

Chaque version du plug-in est publiée avec un [ensemble précis de versions des couches Lambda Datadog][15]. Pour bénéficier des nouvelles fonctionnalités et corrections de bugs proposées par les versions les plus récentes des couches Lambda Datadog, mettez à niveau le plug-in Serverless Framework. Testez la nouvelle version avant de la déployer sur vos applications en production.

## Paramètres de configuration

Pour configurer plus d'options pour votre plug-in, utilisez les paramètres personnalisés suivants dans votre fichier `serverless.yml` :

| Paramètre                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site`                        | Définit le site Datadog auquel envoyer les données, tel que `datadoghq.com` (par défaut), `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com` ou `ddog-gov.com`. Ce paramètre est obligatoire lorsque vous recueillez des données de télémétrie avec l'extension Lambda Datadog. |
| `apiKey`                      | [Clé d'API Datadog][7]. Ce paramètre est obligatoire lorsque vous recueillez des données de télémétrie avec l'extension Lambda Datadog. Vous pouvez également définir la variable d'environnement `DATADOG_API_KEY` dans votre environnement de déploiement. |
| `appKey`                      | Clé d'application Datadog. Uniquement obligatoire lorsque le champ `monitors` est défini. Vous pouvez également définir la variable d'environnement `DATADOG_APP_KEY` dans votre environnement de déploiement. |
| `apiKeySecretArn`             | Alternative au champ `apiKey`. Correspond à l'ARN du secret utilisé pour stocker la clé d'API Datadog dans AWS Secrets Manager. Pensez à ajouter l'autorisation `secretsmanager:GetSecretValue` au rôle d'exécution de la fonction Lambda. |
| `apiKMSKey`                   | Alternative au champ `apiKey` field. Correspond à la clé d'API Datadog chiffrée avec KMS. Pensez à ajouter l'autorisation `kms:Decrypt` au rôle d'exécution de la fonction Lambda. |
| `env`                         | Lorsque ce paramètre et `addExtension` sont définis, une variable d'environnement `DD_ENV` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Sinon, un tag `env` est ajouté à toutes les fonctions Lambda avec la valeur fournie. Par défaut, ce paramètre est défini sur la valeur `stage` du déploiement sans serveur. |
| `service`                     | Lorsque ce paramètre et `addExtension` sont définis, une variable d'environnement `DD_SERVICE` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Sinon, un tag `service` est ajouté à toutes les fonctions Lambda avec la valeur fournie. Par défaut, ce paramètre est défini sur la valeur `service` du projet sans serveur.
| `version`                     | Lorsque ce paramètre et `addExtension` sont définis, une variable d'environnement `DD_VERSION` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Lorsque ce paramètre et `forwarderArn` sont définis, un tag `version` est ajouté à toutes les fonctions Lambda avec la valeur fournie. |
| `tags`                        | Chaîne unique composée de paires `key`:`value` séparées par des virgules. Lorsque ce paramètre et `extensionLayerVersion` sont définis, une variable d'environnement `DD_TAGS` est ajoutée à toutes les fonctions Lambda avec la valeur fournie. Lorsque ce paramètre et `forwarderArn` sont définis, le plug-in parse la chaîne et définit chaque paire `key`:`value` sous la forme d'un tag pour toutes les fonctions Lambda. |
| `enableXrayTracing`           | Définir sur `true` pour activer le tracing X-Ray sur les fonctions Lambda et les intégrations API Gateway. Valeur par défaut : `false`. |
| `enableDDTracing`             | Permet d'activer le tracing Datadog sur la fonction Lambda. Valeur par défaut : `true`. |
| `enableDDLogs`                | Active la collecte de logs Datadog via l'extension Lambda Datadog. Valeur par défaut : `true`. Remarque : ce paramètre n'a aucune incidence sur les logs envoyés via le Forwarder Datadog. |
| `monitors`                    | Lorsque ce paramètre est défini, le plug-in Datadog configure des monitors pour la fonction déployée. Les paramètres `DATADOG_API_KEY` et `DATADOG_APP_KEY` doivent obligatoirement être définis dans votre environnement. Pour découvrir comment définir des monitors, consultez la rubrique [Activer et configurer un monitor sans serveur recommandé](#activer-et-configurer-un-monitor-sans-serveur-recommande). |
| `captureLambdaPayload`        | [Permet de capturer les charges utiles AWS Lambda entrantes et sortantes][17] dans les spans APM Datadog pour les appels Lambda. Valeur par défaut : `false`. |
| `enableSourceCodeIntegration` | Permet d'activer l'[intégration du code source Datadog][18] pour la fonction. Valeur par défaut : `true`. |
| `uploadGitMetadata`           | Permet d'activer l'importation des métadonnées Git pour la fonction dans le cadre de l'intégration du code source. Définissez ce paramètre sur false si vous avez installé l'intégration Datadog/Github, car l'importation des métadonnées n'est alors pas nécessaire. Valeur par défaut : `true`. |
| `subscribeToAccessLogs`       | Permet d'activer l'abonnement automatique du Forwarder Datadog aux groupes de logs d'accès API Gateway. Nécessite de définir le paramètre `forwarderArn`. Valeur par défaut : `true`. |
| `subscribeToExecutionLogs`    | Permet d'activer l'abonnement automatique du Forwarder Datadog aux groupes de logs API HTTP et Websocket. Nécessite de définir le paramètre `forwarderArn`. Valeur par défaut : `true`. |
| `subscribeToStepFunctionLogs`    | Permet d'activer l'abonnement automatique du Forwarder Datadog aux groupes de logs Step Function. Si aucun groupe de logs Step Function n'est configuré, les groupes seront automatiquement créés. Nécessite de définir le paramètre `forwarderArn`. Valeur par défaut : `false`. |
| `forwarderArn`                | L'ARN du Forwarder Datadog à abonner aux groupes de logs Lambda ou API Gateway. |
| `addLayers`                   | Détermine s'il faut ou non installer la bibliothèque Lambda Datadog en tant que couche. Valeur par défaut : `true`. Définissez ce paramètre sur `false` si vous souhaitez associer vous-même la bibliothèque Lambda Datadog au package de déploiement de votre fonction afin de pouvoir installer une version spécifique de la bibliothèque Lambda Datadog ([Python][8] ou [Node.js][9]). |
| `addExtension`                | Détermine s'il faut ou non installer l'extension Lambda Datadog en tant que couche. Valeur par défaut : `true`. Nécessite de définir les paramètres `apiKey` et `site`. |
| `exclude`                     | Lorsque ce paramètre est défini, le plug-in ignore toutes les fonctions spécifiées. Utilisez ce paramètre pour exclure des fonctions de votre déploiement Datadog. Valeur par défaut : `[]`. |
| `enabled`                     | Lorsque ce paramètre est défini sur `false`, le plug-in Datadog reste inactif. Valeur par défaut : `true`. Vous pouvez contrôler cette option à l'aide d'une variable d'environnement. Par exemple, utilisez `enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}` pour activer ou désactiver le plug-in lors du déploiement. Il est également possible d'utiliser la valeur transmise avec `--stage` pour contrôler cette option. Pour en savoir plus, consultez [cet exemple](#desactiver-le-plug-in-pour-un-environnement-specifique). |
| `customHandler`               | Utilisez ce paramètre pour définir le gestionnaire spécifié comme gestionnaire de toutes les fonctions. |
| `failOnError`                 | Si ce paramètre est défini, le plug-in renverra une erreur en cas d'échec lors de la création ou de la mise à jour d'un monitor Datadog personnalisé. L'erreur est générée après le déploiement mais entraîne le renvoi d'un code de sortie différent de zéro après l'opération `serverless deploy` (pour faire échouer le CI utilisateur). Valeur par défaut : `false`. |
| `logLevel`                    | Le niveau de log. Définir sur `DEBUG` pour une journalisation étendue. |
| `skipCloudformationOutputs`   | Définissez ce paramètre sur `true` si vous ne souhaitez pas que les sorties CloudFormation Datadog soient ajoutées pour votre stack. Ce paramètre s'avère utile si vous dépassez la limite de 200 sorties, ce qui peut empêcher la création de votre stack. |
| `enableColdStartTracing`      | Définissez ce paramètre sur `false` pour désactiver le tracing des démarrages à froid. Pris en charge avec NodeJS et Python. Valeur par défaut : `true`. |
| `coldStartTraceMinDuration`   | Permet de définir la durée minimale (en millisecondes) pendant laquelle un événement de chargement de module doit être tracé via le tracing des démarrages à froid. Nombre. Valeur par défaut : `3`. |
| `coldStartTraceSkipLibs`      | (Facultatif) Permet d'empêcher la création de spans de démarrage à froid pour une liste de bibliothèques séparées par des virgules. Utile pour limiter la profondeur ou ignorer les bibliothèques connues. La valeur par défaut dépend du runtime. |
| `subdomain`                   | Permet de définir un sous-domaine à utiliser pour les URL d'application écrites dans le fichier de sortie. Valeur par défaut : `app`. |
| `enableProfiling`             | Définir sur `true` pour activer le profileur en continu Datadog. En version bêta pour NodeJS et Python. Valeur par défaut : `false`. |
| `encodeAuthorizerContext`     | Si ce paramètre est défini sur `true` pour des mécanismes d'autorisation Lambda, le contexte de tracing sera encodé dans la réponse en vue de sa propagation. Pris en charge avec NodeJS et Python. Valeur par défaut : `true`. |
| `decodeAuthorizerContext`     | Si ce paramètre est défini sur `true` pour les Lambdas autorisées via des mécanismes d'autorisation Lambda, le contexte de tracing sera parsé et utilisé (s'il est détecté). Pris en charge avec NodeJS et Python. Valeur par défaut : `true`. |
| `apmFlushDeadline`            | Permet de déterminer à quel moment les spans doivent être envoyées avant qu'un timeout ne se produise, en millisecondes. Lorsque le temps restant dans un appel AWS Lambda est inférieur à la valeur définie, le traceur tente d'envoyer les spans actives actuelles et toutes les spans terminées. Pris en charge avec NodeJS et Python. Valeur par défaut : `100` millisecondes. |

Pour utiliser l'un de ces paramètres, ajoutez une section `custom` > `datadog` dans votre fichier `serverless.yml` semblable à l'exemple ci-dessous :

```yaml
custom:
  datadog:
    apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}"
    enableXrayTracing: false
    enableDDTracing: true
    enableDDLogs: true
    subscribeToAccessLogs: true
    forwarderArn: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
    exclude:
      - dd-excluded-function
```

### Webpack

Si vous utilisez un bundler tel que webpack, consultez [Tracing sans serveur et webpack](https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_webpack/).

### TypeScript

Il se peut que vous rencontriez une erreur en raison de définitions de type manquantes. Pour résoudre cette erreur, ajoutez `datadog-lambda-js` et `dd-trace` à la liste `devDependencies` du fichier package.json de votre projet.

Si vous utilisez serverless-typescript, assurez-vous que `serverless-datadog` est bien placé au-dessus de l'entrée `serverless-typescript` dans votre fichier `serverless.yml`. Le plug-in détecte automatiquement les fichiers `.ts`.

```yaml
plugins:
  - serverless-plugin-datadog
  - serverless-typescript
```

### Désactiver le plug-in pour un environnement spécifique

SI vous souhaitez désactiver le plug-in en fonction de l'environnement (transmis via `--stage`), vous pouvez vous baser sur l'exemple ci-dessous :

```yaml
provider:
  stage: ${self:opt.stage, 'dev'}

custom:
  staged: ${self:custom.stageVars.${self:provider.stage}, {}}

  stageVars:
    dev:
      dd_enabled: false

  datadog:
    enabled: ${self:custom.staged.dd_enabled, true}
```

### Monitors sans serveur

Il existe sept monitors recommandés avec des valeurs par défaut prédéfinies.

|       Monitor        |                                         Métriques                                          | Seuil  | ID du monitor sans serveur  |
| :------------------: | :--------------------------------------------------------------------------------------: | :--------: | :--------------------: |
|   Taux d'erreur élevé    |                       `aws.lambda.errors`/`aws.lambda.invocations`                       |   >= 10 %   |   `high_error_rate`    |
|       Délai d'expiration        |                      `aws.lambda.duration.max`/`aws.lambda.timeout`                      |    >= 1    |       `timeout`        |
|    Mémoire insuffisante     |                           `aws.lambda.enhanced.out_of_memory`                            |    > 0     |    `out_of_memory`     |
|  Âge élevé de l'itérateur   |                            `aws.lambda.iterator_age.maximum`                             | >= 24 h  |  `high_iterator_age`   |
| Taux de démarrage à froid élevé | `aws.lambda.enhanced.invocations(cold_start:true)`/<br>`aws.lambda.enhanced.invocations` |   >= 20 %   | `high_cold_start_rate` |
|    Limitations élevées    |                     `aws.lambda.throttles`/`aws.lambda.invocations`                      |   >= 20 %   |    `high_throttles`    |
|    Augmentation de coût    |                           `aws.lambda.enhanced.estimated_cost`                           | &#8593;20 % |    `increased_cost`    |

#### Activer et configurer un monitor sans serveur recommandé

Pour créer un monitor sans serveur recommandé, vous devez utiliser son ID. Attention : vous devez également définir les paramètres `DATADOG_API_KEY` et `DATADOG_APP_KEY` dans votre environnement. 

Si vous souhaitez configurer davantage de paramètres pour un monitor recommandé, définissez leur valeur sous l'ID du monitor sans serveur. Les paramètres qui ne sont pas spécifiés à cet endroit seront définis sur la valeur recommandée par défaut. Le paramètre `query` pour les monitors recommandés ne peut pas être modifié directement. Il prend donc la valeur par défaut, comme les autres paramètres non spécifiés. Toutefois, vous pouvez modifier la valeur seuil de `query` en la redéfinissant dans le paramètre `options`. Pour supprimer un monitor, retirez-le du modèle `serverless.yml`. Pour en savoir plus sur la définition des paramètres de monitor, consultez la documentation relative aux [API Monitors de Datadog](https://docs.datadoghq.com/api/latest/monitors/#creer-un-monitor).

La création du monitor a lieu après le déploiement de la fonction. Si jamais elle échoue, le déploiement de la fonction n'est donc pas perturbé.

##### Créer un monitor recommandé avec les valeurs par défaut

Définissez l'ID du monitor sans serveur de votre choix, sans spécifier de valeur pour les paramètres.

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
```

##### Configurer un monitor recommandé

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
          name: "Taux d'erreur élevé avec seuil d'avertissement modifié"
          message: "Plus de 10 % des appels de la fonction ont entraîné des erreurs lors de l'intervalle sélectionné. Prévenir @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["modified_error_rate", "serverless", "error_rate"]
          require_full_window: true
          priority: 2
          options:
            include_tags: true
            notify_audit: true
            thresholds:
              ok: 0.025
              warning: 0.05
              critical: 0.1
```

##### Supprimer un monitor

Pour supprimer un monitor, supprimez l'ID du monitor sans serveur et ses paramètres.

#### Activer et configurer un monitor personnalisé

Pour créer un monitor personnalisé, vous devez définir une chaîne d'ID de monitor sans serveur unique et transmettre la clé d'API et la clé d'application (`DATADOG_API_KEY` et `DATADOG_APP_KEY`) dans votre environnement. Le paramètre `query` est requis, mais tous les autres sont facultatifs. Définissez une chaîne d'ID de moniteur sans serveur unique et spécifiez les paramètres de votre choix ci-dessous. Pour en savoir plus sur les paramètres de monitor, consultez la documentation relative aux [API Monitors de Datadog](https://docs.datadoghq.com/api/latest/monitors/#creer-un-monitor).

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - custom_monitor_id:
          name: "Monitor personnalisé"
          query: "max(next_1w):forecast(avg:system.load.1{*}, 'linear', 1, interval='60m', history='1w', model='default') >= 3"
          message: "Message personnalisé pour le monitor personnalisé. Prévenir @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["custom_monitor", "serverless"]
          priority: 3
          options:
            enable_logs_sample: true
            require_full_window: true
            include_tags: false
            notify_audit: true
            notify_no_data: false
            thresholds:
              ok: 1
              warning: 2
              critical: 3
```

## Changements majeurs

### [v5.0.0](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v5.0.0)

- Lorsqu'il est utilisé avec l'extension Datadog, ce plug-in permet de définir les tags `service` et `env` par l'intermédiaire des variables d'environnement et non via tags de ressource Lambda.
- Le paramètre `enableTags` a été remplacé par les nouveaux paramètres `service` et `env`.

### [v4.0.0](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v4.0.0)

- Par défaut, les données de télémétrie sont désormais transmises à Datadog à l'aide de l'extension Lambda Datadog.

## Créer un ticket

Si vous rencontrez un bug avec ce package, faites-le-nous savoir en créant un ticket. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de Serverless Framework, la version de Python/Node.js et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, faites une pull request en suivant la [procédure][14].

## Communauté

Si vous avez des commentaires ou des questions concernant les fonctionnalités, rejoignez le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé par Datadog (<https://www.datadoghq.com/>). Copyright 2021 Datadog, Inc.

[1]: https://docs.datadoghq.com/fr/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/fr/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/fr/serverless/installation/ruby/?tab=serverlessframework
[4]: https://docs.datadoghq.com/fr/serverless/installation/java/?tab=serverlessframework
[5]: https://docs.datadoghq.com/fr/serverless/installation/go/?tab=serverlessframework
[6]: https://docs.datadoghq.com/fr/serverless/installation/dotnet/?tab=serverlessframework
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[8]: https://pypi.org/project/datadog-lambda/
[9]: https://www.npmjs.com/package/datadog-lambda-js
[10]: https://webpack.js.org/configuration/externals/
[11]: https://docs.datadoghq.com/fr/serverless/forwarder/
[12]: https://docs.datadoghq.com/fr/serverless/datadog_lambda_library/extension/
[13]: https://docs.aws.amazon.com/lambda/latest/dg/using-extensions.html
[14]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/CONTRIBUTING.md
[15]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/src/layers.json
[16]: https://docs.datadoghq.com/fr/tracing/setup_overview/configure_data_security/?tab=mongodb#replace-rules-for-tag-filtering
[17]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[18]: https://docs.datadoghq.com/fr/integrations/guide/source-code-integration