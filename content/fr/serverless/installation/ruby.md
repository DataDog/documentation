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
Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], choisissez l'une des méthodes suivantes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

### Installer la bibliothèque Lambda Datadog

La bibliothèque Lambda Datadog peut être importée en tant que couche ou en tant que gem.

La version mineure du gem `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda-js v0.5.0 correspond au contenu de la version 5 de la couche.

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

#### Utiliser le gem

Ajoutez la ligne suivante à votre fichier Gemfile. Consultez la [dernière version][5].

```
gem 'datadog-lambda'
gem 'ddtrace'
```

N'oubliez pas que `ddtrace` a recours à des extensions natives, qui doivent être compilées pour Amazon Linux avant d'être packagées et importées sur Lambda. C'est pourquoi nous vous recommandons d'utiliser la couche.

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Vérifiez que l'option DdFetchLambdaTags est activée][6].
3. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][7].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous devriez pouvoir visualiser vos métriques, logs et traces sur la [page Serverless principale][8].

### Surveiller des métriques métier custom

Si vous souhaitez envoyer une métrique custom ou instrumenter manuellement une fonction, consultez l'exemple de code ci-dessous :

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Activer l'instrumentation
end

def handler(event:, context:)
    # Appliquer le wrapper Datadog
    Datadog::Lambda::wrap(event, context) do
        some_operation()
        # Envoyer une métrique custom
        Datadog::Lambda.metric(
            'coffee_house.order_value', # nom de la métrique
            12.45, # valeur de la métrique
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
[Activez l'envoi de métriques custom][3] pour commencer.

### Activer l'intégration AWS X-Ray

L'intégration de Datadog à AWS X-Ray vous permet de visualiser les transactions de bout en bout sans serveur, afin que vous puissiez cerner la source de toute erreur ou de tout ralentissement, et constater l'incidence des performances de vos fonctions sur l'expérience de vos utilisateurs. En fonction de votre langage et de votre configuration, [choisissez d'installer l'APM Datadog ou l'intégration AWS X-Ray][5] pour répondre à vos besoins en matière de tracing.

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Diagramme de l'architecture de tracing d'AWS Lambda avec Datadog" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[4]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[5]: https://rubygems.org/gems/datadog-lambda
[6]: https://docs.datadoghq.com/fr/serverless/forwarder/#experimental-optional
[7]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://app.datadoghq.com/functions