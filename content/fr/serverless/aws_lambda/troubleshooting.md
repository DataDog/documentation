---
aliases:
- /fr/serverless/guide/troubleshoot_serverless_monitoring
- /fr/serverless/guide/troubleshooting
- /fr/serverless/troubleshooting
further_reading:
- link: /serverless/installation/
  tag: Documentation
  text: Installation de la surveillance sans serveur
- link: /serverless/guide/#troubleshoot-your-installation
  tag: Documentation
  text: Résoudre les problèmes courants
title: Dépannage de la surveillance AWS Lambda
---

<div class="alert alert-info">Consultez les <a href="/serverless/guide/#troubleshoot-your-installation">guides de dépannage</a> supplémentaires pour corriger certaines erreurs de base, comme les problèmes de code de fonction trop volumineux ou de webpack non compatible. Ce guide vise à diagnostiquer les problèmes globaux de collecte de données de télémétrie.</div>

## Comprendre les notions de base

Pour mieux comprendre les instructions présentées dans ce guide, familiarisez-vous d'abord avec les [concepts clés][1]. Lorsque vous comprendrez mieux le fonctionnement global de la plateforme, vous serez plus à même d'identifier les éléments manquants et de restreindre les causes probables à l'origine des problèmes.

## Utiliser l'extension Lambda Datadog au lieu du Forwarder

Si vous utilisez encore la [fonction Lambda du Forwarder Datadog][2] pour la collecte de données, envisagez plutôt d'utiliser l'[extension Lambda Datadog][3]. En effet, les limites techniques de la fonction Lambda du Forwarder sont à l'origine de nombreux problèmes connus, qui peuvent être résolu automatiquement en migrant vers l'extension Lambda.

* Si vous ne savez pas si votre Lambda utilise l'extension, consultez les [configurations de couche][4] de votre fonction Lambda et vérifiez si elles comportent une couche Lambda `Datadog-Extension`.

* Si vous ne savez pas si votre fonction Lambda fait appel au Forwarder, accédez aux [filtres d'abonnement][5] du groupe de logs de votre fonction Lambda et vérifiez si une fonction Lambda `Datadog Forwarder` (ou avec un nom similaire) est abonné au groupe de logs.

Consultez ce [guide comparatif][6] pour découvrir les avantages de l'extension et ce [guide sur la migration][8] pour accéder aux étapes de migration. Testez d'abord vos modifications dans un environnement de type dev ou staging.

Si vous souhaitez continuer à utiliser le Forwarder, consultez ce [guide de dépannage du Forwarder][8] pour obtenir plus d'aide.

## Vérifier que les configurations sont à jour et appropriées

Consultez les [guides d'installation][9] comportant les instructions à jour relatives aux applications que vous avez configurées auparavant pour la surveillance Datadog.

Pour vérifier que les modifications réellement apportées à vos fonctions Lambda sont appropriées, configurez une autre fonction de test en suivant les instructions pour l'_interface de ligne de commande Datadog_ ou _Custom_. Comparez les modifications (par exemple, les gestionnaires, les couches, les variables d'environnement et les tags) apportées à vos fonctions Lambda réelles par rapport à la fonction de test.

## Recueillir les logs de debugging

Pour activer les logs de debugging détaillés, définissez la variable d'environnement `DD_LOG_LEVEL` sur `debug` sur vos fonctions Lambda. Si vous utilisez la [fonction Lambda du Forwarder Datadog][2] pour transférer des données à partir de logs, définissez également `DD_LOG_LEVEL` sur `debug` sur la fonction Lambda du Forwarder.

Si vous avez des problèmes liés au tracing, définissez la variable d'environnement `DD_TRACE_DEBUG` sur `true` pour obtenir des logs de debugging supplémentaires du traceur Datadog.

Pour éviter des coûts inutiles, désactivez les logs de debugging après que vous avez recueilli suffisamment de données.

## Vérifier l'intégration AWS

Datadog peut recueillir des métriques et des tags de ressource à partir d'AWS par l'intermédiaire d'une [intégration AWS][10] (facultatif). S'il vous manque des métriques CloudWatch ou encore des tags de ressource Lambda, vérifiez que l'intégration AWS est correctement configurée.

## Vérifier que les tags sont configurés

Si vous ne parvenez pas à appliquer aux données recueillies les tags Datadog standard `service`, `env` et `version`, vérifiez que les variables d'environnement `DD_SERVICE`, `DD_ENV` et `DD_VERSION` sont configurées sur vos fonctions Lambda. Pour les tags personnalisés, vérifiez que la variable `DD_TAGS` est configurée.

Si vous souhaitez ajouter les tags de vos ressources AWS Lambda aux données recueillies afin de les enrichir, vérifiez que l'[intégration Datadog pour AWS][10] est correctement configurée.

## Obtenir de l'aide

Si vous souhaitez obtenir des réponses à vos questions, rendez-vous sur le canal _#serverless_ de la [communauté Slack Datadog][11].

Si vous avez suivi toutes les étapes de dépannage ci-dessus et que vous souhaitez faire appel à l'[assistance Datadog][12], utilisez l'une des méthodes suivantes pour envoyer informations de configuration pertinentes à l'équipe d'assistance.

{{< tabs >}}
{{% tab "Flare sans serveur" %}}
1. Créez un [ticket Zendesk](https://help.datadoghq.com/hc/en-us/requests/new).
2. Téléchargez la version la plus récente de l'[interface de ligne de commande Datadog](https://github.com/DataDog/datadog-ci/#how-to-install-the-cli).

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. Utilisez la commande Flare sans serveur à la racine du répertoire de votre projet pour recueillir et envoyer automatiquement à l'assistance Datadog des données relatives à votre fonction Lambda.

    ```sh
    datadog-ci lambda flare -f <function_arn> -e <email> -c <case_id> --with-logs
    ```

<div class="alert alert-info">Pour en savoir plus sur le flare sans serveur, consultez la documentation relative à la commande associée <a href="https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md#troubleshooting-serverless-instrumentation">command documentation</a>.</div>
{{% /tab %}}
{{% tab "Manuellement" %}}

Créez un [ticket Zendesk](https://help.datadoghq.com/hc/en-us/requests/new) et fournissez les informations suivantes :

1. Informations de base concernant votre fonction Lambda : ARN, runtime, gestionnaire, couches, variables d'environnement et tags. Si vous avez le même problème avec plusieurs fonctions, concentrez-vous d'abord sur une fonction.
2. Si la fonction Lambda est configurée pour envoyer des données par l'intermédiaire de logs à l'aide du Forwarder Datadog, ajoutez les informations de base concernant la fonction Lambda du Forwarder. Fournissez également les filtres d'abonnement configurés sur le groupe de logs de votre fonction Lambda.
3. La méthode d'installation que vous avez utilisée, par exemple : _Serverless Framework_ ou _AWS CDK_.
4. La méthode d'installation que vous avez essayé d'appliquer, par exemple : _Interface de ligne de commande Datadog_ ou _Custom_.
5. Les logs de debugging provenant de votre propre fonction Lambda.
6. Les logs de debugging provenant de la fonction Lambda du Forwarder Datadog (le cas échéant).
7. Les fichiers de configuration de projet, avec les **secrets codés en dur censurés**, tels que `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` et `webpack.config.json`.
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/glossary/#datadog-serverless-for-aws-lambda-concepts
[2]: /fr/logs/guide/forwarder/
[3]: /fr/serverless/libraries_integrations/extension/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[6]: /fr/serverless/guide/extension_motivation/
[7]: /fr/serverless/configuration/#migrate-to-the-datadog-lambda-extension
[8]: /fr/logs/guide/lambda-logs-collection-troubleshooting-guide/
[9]: /fr/serverless/installation/
[10]: /fr/integrations/amazon_web_services/
[11]: https://chat.datadoghq.com/
[12]: https://www.datadoghq.com/support/