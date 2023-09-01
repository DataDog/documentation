---
aliases:
- /fr/serverless/datadog_lambda_library/ruby/
further_reading:
- link: serverless/datadog_lambda_library/ruby
  tag: Documentation
  text: Bibliothèque Lambda Datadog pour Ruby
- link: serverless/distributed_tracing/
  tag: Documentation
  text: Tracing d'applications sans serveur
- link: serverless/custom_metrics/
  tag: Documentation
  text: Envoyer des métriques custom depuis des applications sans serveur
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: Dépannage de la surveillance sans serveur
kind: documentation
title: Instrumenter des applications Ruby sans serveur
---

<div class="alert alert-warning">Si vous avez déjà configuré vos fonctions Lambda à l'aide du Forwarder Datadog, consultez la documentation relative à l'<a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_ruby">instrumentation avec le Forwarder Datadog</a>. Sinon, suivez les instructions fournies dans ce guide pour instrumenter vos applications avec l'extension Lambda Datadog.</div>

<div class="alert alert-warning">Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez transmettre des données avec <a href="/agent/guide/private-link/">AWS PrivateLink</a> pour le site <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog</a> ou avec <a href="/agent/proxy/">un proxy</a> pour tous les autres sites.</div>

## Installation

Datadog propose de nombreuses méthodes différentes pour instrumenter vos applications sans serveur. Choisissez celle qui répond le mieux à vos besoins ci-dessous. Nous vous conseillons d'utiliser l'interface de ligne de commande Datadog. Vous *devez* suivre les instructions fournies dans l'onglet « Image de conteneur » si votre application est déployée en tant qu'image de conteneur.

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

L'interface de ligne de commande Datadog permet de modifier les configurations des fonctions Lambda existantes pour instrumenter vos applications sans les redéployer. Il s'agit du moyen le plus rapide de tirer parti de la surveillance sans serveur de Datadog.

1. Configurer vos fonctions Lambda

    Activez la solution APM Datadog et incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Installer l'interface de ligne de commande Datadog

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, lancez l'interface de ligne de commande Datadog en mode interactif pour procéder rapidement à la première installation. Vous pouvez ignorer les autres étapes. Pour installer définitivement Datadog pour vos applications de production, ignorez cette étape et suivez les autres étapes afin d'exécuter la commande de l'interface de ligne de commande Datadog dans vos pipelines de CI/CD _après_ un déploiement normal.

    ```sh
    datadog-ci lambda instrument -i
    ```

4. Configurer les identifiants AWS

    L'interface de ligne de commande Datadog nécessite un accès au service AWS Lambda et dépend du SDK JavaScript AWS pour [résoudre les identifiants][1]. Assurez-vous de configurer vos identifiants AWS à l'aide de la même méthode que celle utilisée lors de l'appel de l'interface de ligne de commande AWS.

5. Configurer le site Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).

6. Configurer la clé d'API Datadog

    Datadog vous recommande d'enregistrer la clé d'API Datadog dans AWS Secrets Manager pour améliorer la sécurité et pour faciliter la rotation. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). Assurez-vous que vos fonctions Lambda disposent de l'autorisation IAM `secretsmanager:GetSecretValue` requise.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Pour effectuer un test rapide, vous pouvez également définir la clé d'API Datadog sous forme de texte brut :

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

7. Instrumenter vos fonctions Lambda

    **Remarque** : instrumentez d'abord vos fonctions Lambda dans un environnement de type dev ou staging. Si les résultats de l'instrumentation ne vous conviennent pas, exécutez `uninstrument` avec les mêmes arguments pour annuler les modifications.

    Pour instrumenter vos fonctions Lambda, exécutez la commande suivante.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="ruby" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<functionname>` et `<another_functionname>` par les noms de vos fonctions Lambda. Vous pouvez également utiliser `--functions-regex` pour instrumenter automatiquement plusieurs fonctions dont les noms correspondent à l'expression régulière fournie.
    - Remplacez `<aws_region>` par le nom de la région AWS.

    Pour obtenir des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Le [plug-in Serverless Datadog][1] configure vos fonctions afin qu'elles envoient des métriques, traces et logs à Datadog via l'[extension Lambda Datadog][2].

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

1. Configurer vos fonctions Lambda

    Activez la solution APM Datadog et incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Pour installer le plug-in Serverless Datadog :

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

3. Modifiez votre fichier `serverless.yml` :

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative au plug-in][1].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Image de conteneur" %}}

1. Installer la bibliothèque Lambda Datadog

    Si vous déployez votre fonction Lambda en tant qu'image de conteneur, vous ne pourrez pas utiliser la bibliothèque Lambda Datadog en tant que couche Lambda. À la place, vous devrez intégrer la bibliothèque Lambda Datadog et les bibliothèques de tracing dans l'image.

    Ajoutez ce qui suit à votre Gemfile :

    ```Gemfile
    gem 'datadog-lambda'
    gem 'ddtrace'
    ```

    `ddtrace` contient les extensions natives qui doivent être compilées pour que Amazon Linux fonctionne avec AWS Lambda.

    Installez `gcc`, `gmp-devel` et `make` avant d'exécuter `bundle install` dans le Dockerfile de votre fonction, afin de vous assurer que les extensions natives peuvent être compilées. 

    ```dockerfile
    FROM <base image>

    # assemble your container image

    RUN yum -y install gcc gmp-devel make
    RUN bundle config set path 'vendor/bundle'
    RUN bundle install
    ```

2. Installer l'extension Lambda Datadog

    Ajoutez l'extension Lambda Datadog à votre image de conteneur en ajoutant ce qui suit à votre Dockerfile :

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

    Remplacez `<TAG>` par un numéro de version spécifique (par exemple, `{{< latest-lambda-layer-version layer="extension" >}}`) ou par `latest`. Accédez au [référentiel Amazon ECR][1] pour consulter la liste complète des tags disponibles.

3. Configurer vos fonctions Lambda

    Activez la solution APM Datadog et incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Configurer la clé d'API et le site Datadog

    - Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Configuration personnalisée" %}}

<div class="alert alert-info">Si vous n'utilisez pas l'un des outils de développement sans serveur pris en charge par Datadog, tels que Serverless Framework, Datadog vous recommande vivement d'instrumenter vos applications sans serveur avec l'<a href="./?tab=datadogcli">interface de ligne de commande Datadog</a>.</div>

1. Installer la bibliothèque Lambda Datadog

    La bibliothèque Lambda Datadog peut être installée en tant que couche ou en tant que gem. Pour la plupart des fonctions, Datadog vous conseille d'installer la bibliothèque en tant que couche. Si votre fonction Lambda est déployée sous la forme d'une image de conteneur, vous devez installer la bibliothèque en tant que gem.

    La version mineure du gem `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda v0.5.0 correspond au contenu de la version 5 de la couche.

    - Option A : [configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format ci-dessous :

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Les options disponibles pour `RUNTIME` disponibles sont `Ruby2-7` et `Ruby3-2`.

    - Option B : si vous ne pouvez pas utiliser la couche Lambda Datadog prédéfinie, vous avez également la possibilité d'installer les gems `datadog-lambda` et `ddtrace` en les ajoutant à votre Gemfile :

      ```Gemfile
      gem 'datadog-lambda'
      gem 'ddtrace'
      ```

      `ddtrace` contient des extensions natives qui doivent être compilées pour Amazon Linux afin de fonctionner avec AWS Lambda. Datadog vous recommande donc de créer et déployer votre Lambda en tant qu'image de conteneur. Si votre fonction ne peut pas être déployée en tant qu'image de conteneur et que vous souhaitez utiliser la solution APM Datadog, il est conseillé d'installer la bibliothèque Lambda en tant que couche, et non en tant que gem.

      Installez `gcc`, `gmp-devel` et `make` avant d'exécuter `bundle install` dans le Dockerfile de votre fonction, afin de vous assurer que les extensions natives peuvent être compilées. 

      ```dockerfile
      FROM <base image>

      # assemble your container image

      RUN yum -y install gcc gmp-devel make
      RUN bundle config set path 'vendor/bundle'
      RUN bundle install
      ```

2. Installer l'extension Lambda Datadog

    - Option A : [configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format ci-dessous :

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
      ```

      Remplacez `<AWS_REGION>` par une région AWS valide, telle que `us-east-1`.

    - Option B : ajoutez l'extension Lambda Datadog à votre image de conteneur en ajoutant ce qui suit à votre Dockerfile :

      ```dockerfile
      COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
      ```

      Remplacez `<TAG>` par un numéro de version spécifique (par exemple, `{{< latest-lambda-layer-version layer="extension" >}}`) ou par `latest`. Accédez au [référentiel Amazon ECR][2] pour consulter la liste complète des tags disponibles.

3. Configurer vos fonctions Lambda

    Activez la solution APM Datadog et incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Configurer la clé d'API et le site Datadog

    - Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Et ensuite ?

- Vous pouvez désormais visualiser des métriques, logs et traces sur la [page d'accueil Serverless][4].
- Activez la [surveillance des menaces][9] pour recevoir des alertes en cas d'attaques ciblant votre service.
- Consultez l'exemple de code pour [surveiller une logique opérationnelle personnalisée](#surveiller-une-logique operationnelle-personnalisee).
- Consultez le [guide de dépannage][5] si vous ne parvenez pas à recueillir les données de télémétrie.
- Examinez les [configurations avancées][6] pour :
    - Associer des données de télémétrie à l'aide de tags
    - Recueillir des données de télémétrie pour AWS API Gateway, SQS, etc.
    - Capturer les charges utiles des requêtes et des réponses Lambda
    - Associer les erreurs de vos fonctions Lambda à votre code source
    - Filtrer ou nettoyer des informations sensibles des logs ou des traces

### Surveiller une logique opérationnelle personnalisée

Pour surveiller votre logique opérationnelle personnalisée, envoyez une métrique custom ou une span via l'exemple de code ci-dessous. Pour découvrir plus d'options, consultez la documentation relative à l'[envoi de métriques custom pour des applications sans serveur][7] ainsi que le [guide APM pour l'instrumentation personnalisée][8].

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Activer l'instrumentation
end

def handler(event:, context:)
    # Appliquer le wrapper Datadog
    Datadog::Lambda::wrap(event, context) do
        # Ajouter des tags personnalisés à la span de la fonction Lambda,
        # cela ne fonctionne PAS lorsque le tracing X-Ray est activé
        current_span = Datadog::Tracing.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog::Tracing.trace('hello.world') do |span|
          puts "Hello, World!"
        end

        # Envoyer une métrique custom
        Datadog::Lambda.metric(
          'coffee_house.order_value', # nom de la métrique
          12.45, # valeur de la métrique
          time: Time.now.utc, # facultatif, doit être dans les 20 dernières minutes
          "product":"latte", # tag
          "order":"online" # autre tag
        )
    end
end

# Instrumenter la function
def some_operation()
    Datadog::Tracing.trace('some_operation') do |span|
        # À vous de jouer
    end
end
```

Pour en savoir plus sur l'envoi de métriques custom, consultez la section [Métriques custom à partir d'applications sans serveur][7]. Pour en savoir plus sur l'instrumentation personnalisée, consultez la documentation sur la solution APM Datadog relative à l'[instrumentation personnalisée][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/serverless/forwarder/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://app.datadoghq.com/functions
[5]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[6]: /fr/serverless/configuration
[7]: /fr/serverless/custom_metrics?tab=ruby
[8]: /fr/tracing/custom_instrumentation/ruby/
[9]: /fr/security/application_security/enabling/serverless/?tab=serverlessframework