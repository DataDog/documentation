---
aliases:
- /fr/security_platform/application_security/getting_started/ruby
code_lang: ruby
code_lang_weight: 30
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Ajouter des informations utilisateur à des traces
- link: https://github.com/DataDog/dd-trace-rb
  tag: GitHub
  text: Code source de la bibliothèque Datadog Ruby
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: Règles Application Security prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage d'Application Security Management
kind: documentation
title: 'Ruby : Débuter avec ASM'
type: multi-code-lang
---

Vous pouvez surveiller la sécurité de vos applications Ruby exécutées dans Docker, Kubernetes, AWS ECS et AWS Fargate. 

{{% appsec-getstarted %}}

## Prise en main

1. **Modifiez votre Gemfile de façon à inclure la bibliothèque Datadog :**

   ```ruby
   gem 'ddtrace', '~> 1.1'
   ```

   Pour en savoir plus sur les langages et les versions du framework prises en charge par la bibliothèque, consultez la section [Compatibilité][1].

   Pour obtenir plus d'informations sur le processus de mise à niveau à partir de la version 0.x de `dd-trace`, consultez le [guide dédié][2].

2. **Activez ASM** en activant le traceur APM. Les options des configurations suivantes permettent de couvrir la plupart des scénarios communs. Lisez la [documentation relative au traceur Ruby][3] pour en savoir plus.

   Vous pouvez activer ASM dans votre code :

   {{< tabs >}}

{{% tab "Rails" %}}
   Ajoutez un initialiseur dans le code de votre application pour activer le traceur APM :

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # activer le traceur APM
     c.tracing.instrument :rails

     # activer ASM
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   Il est également possible d'activer le traceur APM via l'instrumentation automatique. Pour ce faire, implémentez l'instrumentation automatique dans votre Gemfile :

   ```ruby
   gem 'ddtrace', '~> 1.1', require: 'ddtrace/auto_instrument'
   ```

   Activez également `appsec` :

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # le traceur APM est activé via l'instrumentation automatique

     # activer ASM
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}

   ```ruby
   require 'sinatra'
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # activer le traceur APM
     c.tracing.instrument :sinatra

     # activer ASM pour Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

   Sinon, activez le traceur APM via l'instrumentation automatique :

   ```ruby
   require 'sinatra'
   require 'ddtrace/auto_instrument'

   Datadog.configure do |c|
     # le traceur APM est activé via l'instrumentation automatique

     # activer ASM pour Sinatra
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   Ajoutez ce qui suit à votre fichier `config.ru` pour activer le traceur APM :

{{% /tab %}}

{{< /tabs >}}

   Il est également possible d'utiliser l'une des méthodes suivantes, selon l'environnement dans lequel votre application s'exécute, pour activer le traceur APM :

   {{< tabs >}}
{{% tab "Docker CLI" %}}

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Ajoutez la valeur de variable d'environnement suivante dans le Dockerfile de votre conteneur :

```shell
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Modifiez le conteneur du fichier YAML de configuration pour APM et ajoutez la variable d'environnement AppSec :

```yaml
spec:
  template:
    spec:
      containers:
        - name: <NOM_CONTENEUR>
          image: <IMAGE_CONTENEUR>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Mettez à jour le fichier JSON de votre définition de tâche ECS en ajoutant la section environment suivante :

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Initialisez ASM dans votre code ou définissez la variable d'environnement `DD_APPSEC_ENABLED` sur true durant l'appel de votre service :
```shell
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/application-security-signal.png" alt="Page des détails d'un signal de sécurité avec des tags, des métriques, des recommandations de mesures et les adresses IP de la personne malveillante associée à la menace" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/setup_and_configure/?code-lang=ruby#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[3]: /fr/tracing/trace_collection/dd_libraries/ruby/