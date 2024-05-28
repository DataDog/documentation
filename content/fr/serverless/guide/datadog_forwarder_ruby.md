---
kind: guide
title: Instrumenter des applications Ruby sans serveur avec le Forwarder Datadog
---

## Présentation

<div class="alert alert-warning">
Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, suivez plutôt les <a href="/serverless/installation/ruby">instructions d'instrumentation des fonctions Lambda avec l'extension Lambda Datadog</a>. Si vous avez configuré la surveillance sans serveur Datadog avec le Forwarder Datadog avant que les fonctionnalités Lambda clés en main ne soient proposées, consultez ce guide pour gérer votre instance.
</div>

## Prérequis

Pour ingérer des traces AWS Lambda, des métriques optimisées, des métriques custom et des logs, vous devez utiliser la [fonction Lambda du Forwarder Datadog][1].

## Configuration

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

L'interface de ligne de commande Datadog permet de modifier les configurations des fonctions Lambda existantes pour instrumenter vos applications sans les redéployer. Il s'agit du moyen le plus rapide de tirer parti de la surveillance sans serveur de Datadog.

Vous pouvez également ajouter la commande à vos pipelines de CI/CD pour instrumenter toutes vos applications sans serveur. Lancez la commande *après* le déploiement normal de votre application sans serveur, de sorte que les modifications apportées par l'interface de ligne de commande Datadog ne soient pas écrasées.

### Installation

Installez l'interface de ligne de commande Datadog avec NPM ou Yarn :

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrumentation

Pour instrumenter la fonction, exécutez la commande suivante avec vos [identifiants AWS][1] :

```sh
datadog-ci lambda instrument -f <nomfonction> -f <autre_nomfonction> -r <région_aws> -v <version_couche> --forwarder <arn_forwarder>
```

Renseignez les paramètres fictifs comme suit :
- Remplacez `<nomfonction>` et `<autre_nomfonction>` par les noms de vos fonctions Lambda.
- Remplacez `<aws_region>` par le nom de la région AWS.
- Remplacez `<version_couche>` par la version souhaitée de la bibliothèque Lambda Datadog. La dernière version est `{{< latest-lambda-layer-version layer="ruby" >}}`.
- Remplacez `<arn_forwarder>` par l'ARN du Forwarder (voir la [documentation sur le Forwarder][2]).

Par exemple :

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="ruby" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][4] de votre fonction avant de pouvoir l'instrumenter avec l'interface de ligne de commande Datadog.

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][3].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Le [plug-in Serverless Datadog][1] ajoute automatiquement la bibliothèque Lambda Datadog à vos fonctions à l'aide des couches. Il configure également vos fonctions de façon à envoyer des métriques, traces et logs à Datadog par l'intermédiaire du [Forwarder Datadog][2].

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][3] de votre fonction avant d'installer le plug-in Serverless Datadog.

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

1. Pour installer le plug-in Serverless Datadog :
    ```
    yarn add --dev serverless-plugin-datadog
    ```
2. Ajoutez ce qui suit dans votre fichier `serverless.yml` :
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. Ajoutez également la section suivante dans votre fichier `serverless.yml` :
    ```
    custom:
      datadog:
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
    Pour en savoir plus sur l'ARN du Forwarder Datadog ou sur l'installation, cliquez [ici][2]. Pour obtenir des paramètres supplémentaires, consultez la [documentation du plug-in][1].


[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Configuration personnalisée" %}}

### Installation

La bibliothèque Lambda Datadog peut être installée en tant que couche ou en tant que gem. Pour la plupart des fonctions, nous vous recommandons d'installer la bibliothèque en tant que couche. Si votre fonction lambda est déployée sous la forme d'une image de conteneur, vous devez installer la bibliothèque en tant que gem.

La version mineure du gem `datadog-lambda` correspond toujours à la version de la couche. Par exemple, datadog-lambda v0.5.0 correspond au contenu de la version 5 de la couche.

#### Utilisation de la couche

[Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en suivant le format suivant.

```
# Pour les régions us, us3, us5 et eu
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# Pour les régions us-gov
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

Les options `RUNTIME` disponibles sont `Ruby2-7` et `Ruby3-2`. La dernière `VERSION` est `{{< latest-lambda-layer-version layer="ruby" >}}`. Exemple :

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby3-2:{{< latest-lambda-layer-version layer="ruby" >}}
```

Si votre fonction Lambda est configurée de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][4] de votre fonction avant de pouvoir ajouter la bibliothèque Lambda Datadog en tant que couche.

#### Utiliser le gem

Si vous ne pouvez pas utiliser la couche Lambda Datadog prédéfinie, vous avez la possibilité d'ajouter ce qui suit à votre Gemfile :

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` contient des extensions natives qui doivent être compilées pour Amazon Linux afin de fonctionner avec AWS Lambda. Datadog vous recommande donc de créer et déployer votre Lambda en tant qu'image de conteneur. Si votre fonction ne peut pas être déployée en tant qu'image de conteneur et que vous souhaitez utiliser la solution APM Datadog, il est conseillé d'installer la bibliothèque Lambda en tant que couche, et non en tant que gem.

Installez `gcc`, `gmp-devel` et `make` avant d'exécuter `bundle install` dans le Dockerfile de votre fonction, afin de vous assurer que les extensions natives peuvent être compilées. 

```dockerfile
FROM <image de base>

# assembler votre image de conteneur

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```

### Configurer les logs

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

### Abonnement

Pour pouvoir envoyer des métriques, traces et logs à Datadog, abonnez la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][3].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### Tag

Bien que cette opération soit facultative, Datadog vous recommande d'ajouter les tags `env`, `service` et `version` à vos applications sans serveur. Pour ce faire, suivez la [documentation relative au tagging de service unifié][2].

## Explorer les logs

Après avoir configuré votre fonction en suivant la procédure ci-dessus, visualisez vos métriques, logs et traces sur la [page Serverless principale][3].

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

Pour en savoir plus sur l'envoi de métriques custom, consultez la section [Métriques custom à partir d'applications sans serveur][4]. Pour en savoir plus sur l'instrumentation personnalisée, consultez la documentation de l'APM Datadog relative à l'[instrumentation personnalisée][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/serverless/forwarder
[2]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /fr/serverless/custom_metrics?tab=ruby
[5]: /fr/tracing/custom_instrumentation/ruby/