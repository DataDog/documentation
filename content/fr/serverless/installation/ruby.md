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

## Prérequis

Pour ingérer des traces AWS Lambda, des métriques optimisées, des métriques custom et des logs, vous devez utiliser la [fonction Lambda du Forwarder Datadog][1].

## Installation

1. Installer la bibliothèque Lambda Datadog

    La bibliothèque Lambda Datadog peut être installée en tant que couche ou en tant que gem. Pour la plupart des fonctions, Datadog vous conseille d'installer la bibliothèque en tant que couche. Si votre fonction Lambda est déployée sous la forme d'une image de conteneur, vous devez installer la bibliothèque en tant que gem.

    La version mineure du gem `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda v0.5.0 correspond au contenu de la version 5 de la couche.

    - Option A : [configurez les couches][2] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format ci-dessous.

      ```
      # For regular regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}

      # For us-gov regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      Remplacez `<AWS_REGION>` par une région AWS valide, telle que `us-east-1`.

    - Option B : si vous ne pouvez pas utiliser la couche Lambda Datadog prédéfinie, vous avez la possibilité d'ajouter ce qui suit à votre Gemfile.

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

2. Configurer vos fonctions Lambda

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

3. Abonner le Forwarder Datadog aux groupes de logs

    Pour pouvoir envoyer des métriques, traces et logs à Datadog, abonnez la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

    1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][1].
    2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][3].


## Et ensuite ?

- Vous pouvez désormais visualiser des métriques, logs et traces sur la [page d'accueil Serverless][4].
- Consultez l'exemple de code pour [surveiller une logique opérationnelle personnalisée](#surveiller-une-logique operationnelle-personnalisee).
- Consultez le [guide de dépannage][5] si vous ne parvenez pas à recueillir les données de télémétrie.
- Examinez les [configurations avancées][6] pour :
    - Associer des données de télémétrie à l'aide de tags
    - Recueillir des données de télémétrie pour AWS API Gateway, SQS, etc.
    - Capturer les charges utiles des requêtes et des réponses Lambda
    - Associer les erreurs de vos fonctions Lambda à votre code source
    - Filtrer ou nettoyer des informations sensibles des logs ou des traces

### Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une métrique custom ou une span personnalisée, consultez l'exemple de code ci-dessous :

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