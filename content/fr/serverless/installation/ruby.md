---
title: Instrumenter des applications Ruby
kind: documentation
further_reading:
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: Tagging d'applications sans serveur
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: Tracing d'applications sans serveur
  - link: serverless/custom_metrics/
    tag: Documentation
    text: Envoyer des métriques custom depuis des applications sans serveur
---
## Configuration requise

Si vous ne l'avez pas encore fait :

- Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS.
- Installez la [fonction Lambda du Forwarder Datadog][2], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez les étapes suivantes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

### Installer la bibliothèque Lambda Datadog

La bibliothèque Lambda Datadog peut être installée en tant que couche ou en tant que gem. Pour la plupart des fonctions, nous vous recommandons d'installer la bibliothèque en tant que couche. Si votre fonction lambda est déployée sous la forme d'une image de conteneur, vous devez installer la bibliothèque en tant que gem.

La version mineure du gem `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda-js v0.5.0 correspond au contenu de la version 5 de la couche.

#### Utiliser la couche

[Configurez les couches][3] pour votre fonction Lambda à l'aide de l'ARN en respectant le format suivant.

```
# Pour les régions standard
arn:aws:lambda:<RÉGION_VERSION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# Pour les régions us-gov
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

Les options `RUNTIME` disponibles sont `Ruby2-5` et `Ruby2-7`. Pour `VERSION`, consultez la [dernière version][4]. Exemple :

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby2-7:5
```

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][3] de votre fonction avant de pouvoir ajouter la bibliothèque Lambda Datadog en tant que couche.

#### Utiliser le gem

Ajoutez ce qui suit à votre Gemfile :

```Gemfile
gem 'datadog-lambda'
```

Afin d'utiliser l'APM Datadog, vous devez également ajouter `ddtrace` en tant que dépendance secondaire dans votre Gemfile.

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` contient des extensions natives qui doivent être compilées pour Amazon Linux afin de fonctionner avec AWS Lambda. Nous vous recommandons donc de créer et déployer votre Lambda en tant qu'image de conteneur. Si votre fonction ne peut pas être déployée en tant qu'image de conteneur et que vous souhaitez utiliser l'APM Datadog, il est conseillé d'installer la bibliothèque Lambda en tant que couche, et non en tant que gem.

Installez `gcc`, `gmp-devel` et `make` avant d'exécuter `bundle install` dans le Dockerfile de votre fonction, afin de vous assurer que les extensions natives peuvent être compilées. 

```dockerfile
FROM <image de base>

# assembler votre image de conteneur

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```

### Configurer la fonction

Activez l'APM Datadog et incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda de Datadog.

```ruby
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Activer l'instrumentation
end

def handler(event:, context:)
    Datadog::Lambda.wrap(event, context) do
        return { statusCode: 200, body: 'Hello World' }
    end
end
```

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][6].

### Tagging de service unifié

Bien que cette opération soit facultative, nous vous recommandons fortement d'ajouter les tags env`, `service` et `version` à vos applications sans serveur. Pour ce faire, suivez la [documentation relative au tagging de service unifié][7].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous devriez pouvoir visualiser vos métriques, logs et traces sur la [page Serverless principale][8].

## Surveiller une logique opérationnelle personnalisée

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
        # Ajouter des tags personnalisés à la span de la fonction lambda,
        # ne fonctionne PAS lorsque le tracing X-Ray est activé
        current_span = Datadog.tracer.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog.tracer.trace('hello.world') do |span|
          puts "Hello, World!"
        end

        # Envoyer une métrique custom
        Datadog::Lambda.metric(
          'coffee_house.order_value', # nom de la métrique
          12.45, # valeur de la métrique
          time: Time.now.utc, # facultatif, doit être dans les 20 dernières minutes
          "product":"latte", # tag
          "order":"online" # un autre tag
        )
    end
end

# Instrumenter la fonction
def some_operation()
    Datadog.tracer.trace('some_operation') do |span|
        # À vous de jouer
    end
end
```

Pour en savoir plus sur l'envoi de métriques custom, consultez [cette page][9]. Pour obtenir plus d'informations sur l'instrumentation personnalisée, consultez la [documentation de l'APM Datadog à ce sujet][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[4]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[6]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[8]: https://app.datadoghq.com/functions
[9]: /fr/serverless/custom_metrics?tab=ruby
[10]: /fr/tracing/custom_instrumentation/ruby/