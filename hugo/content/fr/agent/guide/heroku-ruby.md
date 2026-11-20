---
description: Guide étape par étape pour déployer et instrumenter une application Ruby
  on Rails sur Heroku avec Datadog afin de collecter des métriques, des logs, des
  traces et des données d'intégration.
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: Documentation
  text: Heroku Buildpack
- link: /logs/guide/collect-heroku-logs
  tag: Documentation
  text: Collecter les logs Heroku
title: Instrumenter une application Ruby on Rails sur Heroku avec Datadog
---
Heroku est une plateforme populaire auprès des développeurs Ruby et, plus spécifiquement, des développeurs Ruby on Rails. Datadog prend en charge Heroku et Ruby, vous pouvez donc envoyer les métriques, les logs et les traces de votre application Ruby sur Heroku vers Datadog.

Ce guide vous accompagne dans les étapes nécessaires pour envoyer à Datadog les métriques, les données d'intégration, les logs et les traces d'une application Rails déployée sur Heroku.

## Prérequis {#prerequisites}

Ce guide suppose ce qui suit :

* Vous disposez déjà d'un compte Datadog. Si vous n'en avez pas, vous pouvez [vous inscrire pour un essai gratuit][1].
* Vous disposez déjà d'un compte Heroku. Si vous n'en avez pas, vous pouvez [vous inscrire à son offre gratuite][2].
* Vous avez [Git][3] installé sur votre système local.
* Vous avez l'[outil CLI Heroku][4] installé sur votre système local.

## Création de votre application Heroku et déploiement de l'exemple d'application Ruby {#creating-your-heroku-application-and-deploying-the-sample-ruby-application}

Ce guide utilise [l'exemple d'application Rails de Heroku][5]. Il s'agit d'une application Rails minimale qui accompagne leur [article Starting With Ruby][6], lequel fournit des informations plus détaillées sur la façon de déployer une application Ruby sur Heroku. Ce guide se concentre sur l'instrumentation d'une application Rails avec Datadog.

L'exemple d'application a une dépendance pg qui ne se résout que si vous avez [Postgres installé localement][7]. Installez Postgres avant de continuer.
Vous pouvez vérifier que Postgres est installé correctement en exécutant la commande `psql`. Il renvoie une sortie similaire à ce qui suit :

```shell
which psql
/usr/local/bin/psql
```

Récupérez le code de l'exemple d'application et déployez-le, tel quel, sur une nouvelle application Heroku.

```shell
# Decide a name for your application and export it as an environment variable
# (In this case, the name is ruby-heroku-datadog)
export APPNAME=ruby-heroku-datadog

# Get the sample application code
git clone https://github.com/heroku/ruby-getting-started.git
cd ruby-getting-started

# Login into Heroku
heroku login

# Create a new application
heroku create -a $APPNAME

# Deploy to Heroku
git push heroku main

# Open the application to check that it works
heroku open -a $APPNAME
```

Votre navigateur par défaut s'ouvre avec l'exemple d'application. Vous devriez voir une interface utilisateur semblable à celle-ci :

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Exemple d'application Ruby Heroku" >}}

## Connexion de votre compte Datadog à votre application et déploiement du Datadog Agent {#connecting-your-datadog-account-to-your-application-and-deploying-the-datadog-agent}

La première étape pour obtenir une observabilité complète de votre application Heroku avec Datadog consiste à déployer le Datadog Agent et à le connecter à votre compte Datadog.

Datadog identifie votre compte à l'aide d'une clé d'API. [Connectez-vous à votre compte Datadog][8] et accédez à la [section des clés d'API][9]. Copiez votre clé d'API :

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Section des clés d'API Datadog" >}}

Ensuite, déployez le Datadog Agent dans votre application. Ce guide utilise le [Datadog Heroku Buildpack][10]. Vous pouvez en savoir plus sur les [Heroku Buildpacks][11] et leur fonctionnement dans leur documentation officielle.

```shell
# Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
heroku config:add DD_DYNO_HOST=true

# Set your Datadog site (for example, us5.datadoghq.com) 
heroku config:add DD_SITE=$DD_SITE

# Add this buildpack and set your Datadog API key
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# Deploy to Heroku forcing a rebuild
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

Une fois la compilation terminée, le Datadog Agent s'exécute dans votre application. Exécutez la commande de statut du Datadog Agent comme expliqué dans la [section annexe](#appendix-getting-the-datadog-agent-status) pour vous assurer que tout fonctionne correctement. Vous devriez rechercher la section suivante :

```bash
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

Cette sortie signifie que le Datadog Agent s'exécute dans votre application Heroku et est correctement lié à votre compte Datadog.

Si vous ouvrez la [Hostmap dans Datadog][12], vous pouvez voir que votre dyno communique correctement avec Datadog :

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Hostmap Datadog" >}}

## Configuration des Integrations {#setting-up-integrations}

Datadog propose plus de 400 Integrations clés en main qui collectent des métriques à partir de différentes piles technologiques. Le buildpack Datadog vous permet d'activer ces Integrations pour votre application Heroku.

Quatre exemples courants de configuration des Integrations Heroku sont présentés ci-dessous.

### Postgres {#postgres}

Heroku ajoute une base de données Postgres via un module complémentaire pour chaque application Rails déployée sur Heroku. Vérifiez que l'application a le module complémentaire Postgres activé :

 ```shell
heroku addons -a $APPNAME

```
You should get the following output:


```bash
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

The table above shows add-ons and the attachments to the current app (ruby-heroku-datadog) or other apps.
```

Your example application already uses that database in its code, but you haven't created the tables yet, run:

```shell
heroku run rake db:migrate -a $APPNAME
```

```bash
Running `rake db:migrate` attached to terminal... up, run.3559
Migrating to CreateWidgets (20140707111715)
== 20140707111715 CreateWidgets: migrating ====================================
-- create_table(:widgets)
   -> 0.0244s
== 20140707111715 CreateWidgets: migrated (0.0247s) ===========================
```

After, you can successfully see the `/widgets` endpoint of your application, which uses that database.

To enable the Postgres Datadog integration, retrieve the database credentials from Heroku. Run the following command from the `psql` terminal

```shell
heroku pg:credentials:url DATABASE -a $APPNAME
```
Integrations are enabled in a particular way when using the Datadog buildpack. You can learn how to enable any of the integrations in the [buildpack documentation][13].

Create a `datadog/conf.d` folder at the root of your application:

```shell
cd ruby-getting-started
# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

Create a configuration file called `postgres.yaml` replacing with your host, dbname, username, and password with the information you got in the previous command:

```yaml
init_config:

instances:
  - host: <YOUR HOSTNAME>
    port: <YOUR PORT>
    username: <YOUR USERNAME>
    password: <YOUR PASSWORD>
    dbname: <YOUR DBNAME>
    ssl: True
```

Instead of manually updating the configuration, you can set up your Postgres integration based on Heroku environment variables using the [prerun script][14] to replace those values before starting the Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Postgres configuration from above using the Heroku application environment variable
if [ -n "$DATABASE_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $DATABASE_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<YOUR HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR DBNAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Deploy to Heroku:

```shell
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Postgres check. Run the Datadog Agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure the Postgres check is running correctly. You should look out for the following section:

```bash

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

  postgres (5.4.0)
  ----------------
    Instance ID: postgres:e07ef94b907fe733 [OK]
    Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/postgres.d/conf.yaml
    Total Runs: 9
    Metric Samples: Last Run: 15, Total: 135
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 9
    Average Execution Time : 102ms
    Last Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
    Last Successful Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
    metadata:
      version.major: 13
      version.minor: 2
      version.patch: 0
      version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
      version.scheme: semver

[...]
```

After you have checked that the Postgres check is running correctly, you can start looking at the Postgres metrics available on the [Metrics Catalog][15] page:

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Datadog Metrics Explorer" >}}

### Redis {#redis}

Pour Redis, ajoutez le [module complémentaire Heroku Redis][16] à votre application Heroku :

```shell
heroku addons:create heroku-redis:hobby-dev
```

Pour vérifier que Redis a bien été ajouté à votre application, exécutez la commande suivante :

 ```shell
heroku addons:info REDIS

```

You should get an output similar to the following:

```bash
=== redis-cylindrical-59589
Attachments:  ruby-heroku-datadog::REDIS
Installed at: Wed Nov 17 2021 14:14:13 GMT+0100 (Central European Standard Time)
Owning app:   ruby-heroku-datadog
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

Retrieve the credentials from Heroku by running the following command:

```shell
heroku config -a $APPNAME | grep REDIS_URL
```

Create a configuration file named `/datadog/conf.d/redisdb.yaml` at the root of your application to replace your host, port, and password with information from the previous command:

```yaml
init_config:

instances:
  - host: <YOUR_REDIS_HOST>
    password: <YOUR_REDIS_PASSWORD>
    port: <YOUR_REDIS_PORT>
```

Instead of manually updating the configuration, you can set up your Redis integration based on Heroku environment variables using the [prerun script][14] to replace those values before starting the Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Redis configuration from above using the Heroku application environment variable
if [ -n "$REDIS_URL" ]; then
  REDISREGEX='rediss?://([^:]*):([^@]+)@([^:]+):([^/]+)$'
  if [[ $REDIS_URL =~ $REDISREGEX ]]; then
    sed -i "s/<YOUR_REDIS_HOST>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
  fi
fi
```

Deploy to Heroku:

```shell
# Deploy to Heroku
git add .
git commit -m "Enable redis integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Redis check. [Run the Datadog Agent status](#appendix-getting-the-datadog-agent-status) to make sure the Redis check is running correctly.

The following output displays:

```bash

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

  redisdb (4.1.0)
  ---------------
    Instance ID: redisdb:eb3a3807075f89f0 [OK]
    Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/redisdb.d/conf.yaml
    Total Runs: 3
    Metric Samples: Last Run: 45, Total: 135
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 3
    Average Execution Time : 6ms
    Last Execution Date : 2021-11-17 13:56:17 UTC (1637157377000)
    Last Successful Execution Date : 2021-11-17 13:56:17 UTC (1637157377000)
    metadata:
      version.major: 6
      version.minor: 2
      version.patch: 3
      version.raw: 6.2.3
      version.scheme: semver

[...]

```

### Sidekiq 

Sidekiq is a background processing framework for Ruby. If you are using Sidekiq Pro or Enterprise, you can install the Datadog integration for Sidekiq.

Install the `dogstatsd-ruby` package:

```shell
gem install dogstatsd-ruby
```

Enable Sidekiq Pro metric collection in your initializer:

```ruby
    require 'datadog/statsd' # gem 'dogstatsd-ruby'

    Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('localhost', 8125, namespace:'sidekiq') }

    Sidekiq.configure_server do |config|
      config.server_middleware do |chain|
        require 'sidekiq/middleware/server/statsd'
        chain.add Sidekiq::Middleware::Server::Statsd
      end
    end
```

If you are using Sidekiq Enterprise and want to collect historical metrics, include the following:

```ruby
      Sidekiq.configure_server do |config|
        # history is captured every 30 seconds by default
        config.retain_history(30)
      end
```

Add the following to your [`datadog/prerun.sh`][14] script:

```bash
cat << 'EOF' >> "$DATADOG_CONF"

dogstatsd_mapper_profiles:
  - name: sidekiq
    prefix: "sidekiq."
    mappings:
      - match: 'sidekiq\.sidekiq\.(.*)'
        match_type: "regex"
        name: "sidekiq.$1"
      - match: 'sidekiq\.jobs\.(.*)\.perform'
        name: "sidekiq.jobs.perform"
        match_type: "regex"
        tags:
          worker: "$1"
      - match: 'sidekiq\.jobs\.(.*)\.(count|success|failure)'
        name: "sidekiq.jobs.worker.$2"
        match_type: "regex"
        tags:
          worker: "$1"
EOF
```

Deploy to Heroku:

```shell
git add .
git commit -m "Enable sidekiq integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Sidekiq check. [Run the Datadog Agent status](#appendix-getting-the-datadog-agent-status) to make sure the Sidekiq check is running correctly.

### Memcached 

Memcached is a distributed memory object caching system that is popular in Rails applications. In this example, you can attach the [Heroku Memcached Cloud add on][17] to your Heroku application:

```shell
heroku addons:create memcachedcloud:30
```

To check that Memcached has been successfully attached to your application, run the following command:

```shell
heroku addons | grep -A2 memcachedcloud
```

The following output displays:

```bash
memcachedcloud (memcachedcloud-fluffy-34783)   30         free   created
 └─ as MEMCACHEDCLOUD
```

Retrieve the credentials from Heroku by running the following:

```shell
heroku config | grep MEMCACHEDCLOUD
```

Create a configuration file named `/datadog/conf.d/mcache.yaml` at the root of your application to replace your host, port, username, and password with information from the previous command:

```yaml
instances:
  - url: <YOUR_MCACHE_HOST>
    port: <YOUR_MCACHE_PORT>
    username: <YOUR_MCACHE_USERNAME>
    password: <YOUR_MCACHE_PASSWORD>
```

Instead of manually updating the configuration, you can set up your Memcached integration based on Heroku environment variables using the [prerun script][14] to replace those values before starting the Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Memcached configuration from above using the Heroku application environment variable
if [ -n "$MEMCACHEDCLOUD_SERVERS" ]; then
  MCACHEREGEX='([^:]+):([^/]+)$'
  if [[ $MEMCACHEDCLOUD_SERVERS =~ $MCACHEREGEX ]]; then
    sed -i "s/<YOUR_MCACHE_HOST>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
    sed -i "s/<YOUR_MCACHE_PORT>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  fi
  sed -i "s/<YOUR_MCACHE_USERNAME>/${MEMCACHEDCLOUD_USERNAME}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  sed -i "s/<YOUR_MCACHE_PASSWORD>/${MEMCACHEDCLOUD_PASSWORD}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
fi
```

Deploy to Heroku:

```shell
git add .
git commit -m "Enable memcached integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Memcached check. [Run the Datadog Agent status](#appendix-getting-the-datadog-agent-status) to make sure the Memcached check is running correctly.

The following output displays:

```bash

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

  mcache (2.0.0)
  --------------
    Instance ID: mcache:ca47ee7a0c236107 [OK]
    Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/mcache.d/conf.yaml
    Total Runs: 2
    Metric Samples: Last Run: 27, Total: 54
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 2
    Average Execution Time : 9ms
    Last Execution Date : 2021-11-18 12:28:45 UTC (1637238525000)
    Last Successful Execution Date : 2021-11-18 12:28:45 UTC (1637238525000)
    metadata:
      version.major: 1
      version.minor: 4
      version.patch: 17
      version.raw: 1.4.17
      version.scheme: semver

[...]

```
## Traces 

To get distributed tracing from your Heroku Ruby application, enable instrumentation.

Ensure that you are in the folder with the application code:

```shell
cd ruby-getting-started
```

Edit your `Gemfile` and add the `ddtrace`:

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

Install the gem with `bundle install`:

```shell
bundle install
```

Before committing the changes and pushing to Heroku, set [Unified Tagging][18] for the application:

```shell
# Set the environment of your application
heroku config:add DD_ENV=production -a $APPNAME

# Set the version of your application
heroku config:add DD_VERSION=0.1 -a $APPNAME

# Set the service of your application
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

Commit your changes and push to Heroku:

```shell
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

During the build, error messages are displayed about the tracer not being able to reach the Datadog APM Agent endpoint. This is normal, as during the build process, the Datadog Agent hasn't started yet. You can ignore these messages:

```bash
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

Once the build finishes, your application sends traces to Datadog. You can start generating traffic to your application (for example, by visiting the /widgets page of your application) to get a good flow of traces.

Run the Datadog Agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure the APM agent is running correctly and sending traces to Datadog. You should look out for the following section:

```bash
[...]

=========
APM Agent
=========
  Status: Running
  Pid: 54
  Uptime: 85 seconds
  Mem alloc: 13,971,888 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 43 (55,431 bytes)
      Spans received: 129

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:production': 100.0%

  Writer (previous minute)
  ========================
    Traces: 0 payloads, 0 traces, 0 events, 0 bytes
    Stats: 0 payloads, 0 stats buckets, 0 bytes

[...]
```

That output shows that the APM Agent is running correctly and sending traces to Datadog.

Navigate to the [APM traces section][19] to see your traces:

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Traces d'application Ruby dans Datadog" >}}

Accédez au [Catalog][20] pour voir tous vos services d'application et votre vue des services d'application :

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Catalog dans Datadog" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Page de détails du service d'application Ruby dans Datadog" >}}

## Logs {#logs}

Ensuite, activez les logs en configurant le log drain Heroku.

Lorsque vous utilisez le log drain, tous les logs arrivent dans Datadog depuis la même `ddsource` (généralement `heroku`), si bien qu'aucun parsing automatique des logs n'est effectué à l'aide d'Integrations autres que Heroku.

### Génération de vos logs Rails {#generating-your-rails-logs}

Pour configurer vos logs Rails, Datadog recommande d'utiliser Lograge. Pour cet exemple d'application, configurez les logs et les traces de manière à les corréler.

Assurez-vous d'être dans le dossier contenant le code de l'application :

```shell
cd ruby-getting-started
```

Modifiez votre `Gemfile` et ajoutez `lograge` :

```ruby
gem 'lograge'
```

Installez la gem avec `bundle install` :

```shell
bundle install
```

Pour configurer Lograge, créez un fichier nommé `config/initializers/lograge.rb` et ajoutez ce qui suit :

```ruby
Rails.application.configure do
  # Lograge config
  config.lograge.enabled = true

  # This specifies to log in JSON format
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## Disables log coloration
  config.colorize_logging = false

  # Log to STDOUT
  config.lograge.logger = ActiveSupport::Logger.new(STDOUT)

  config.lograge.custom_options = lambda do |event|
    # Retrieves trace information for current thread
    correlation = Datadog::Tracing.correlation

    {
      # Adds IDs as tags to log output
      :dd => {
        # To preserve precision during JSON serialization, use strings for large numbers
        :trace_id => correlation.trace_id.to_s,
        :span_id => correlation.span_id.to_s,
        :env => correlation.env.to_s,
        :service => correlation.service.to_s,
        :version => correlation.version.to_s
      },
      :ddsource => ["ruby"],
      :params => event.payload[:params].reject { |k| %w(controller action).include? k }
    }
  end
end
```

Déployez sur Heroku :

```shell
git add .
git commit -m "Add lograge"
git push heroku main
```

### Configuration du log drain Heroku {#setting-up-heroku-log-drain}

Heroku dispose d'un routeur de logs natif appelé log drain, qui collecte les logs de tous les dynos en cours d'exécution dans votre application et les envoie à Heroku. Les logs incluent les logs de votre application, les logs du routeur Heroku et les logs système des dynos Heroku. Vous pouvez configurer le log drain pour acheminer ces logs vers Datadog. Le log drain envoie les logs système Heroku vers Datadog depuis `ddsource=heroku`.

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Vue des logs Heroku" >}}

La configuration du log drain Heroku permet également d'obtenir les métriques système des dynos (CPU, mémoire) dans Datadog.

Pour configurer le log drain Heroku depuis un terminal, exécutez la commande suivante :

```shell
export APPNAME=<YOUR_APPLICATION_NAME>
export DD_ENV=<YOUR_APPLICATION_ENVIRONMENT> # example: production, staging
export DD_SERVICE=<YOUR_SERVICE_NAME>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

Pour obtenir les métriques système de vos dynos, en plus d'activer le log drain, activez également [log-runtime-metrics][21] :

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Restart your application
heroku restart -a $APPNAME
```

Une fois le log drain configuré, vos logs Heroku apparaissent dans la [section des logs de Datadog][22].

#### Génération de métriques à partir des logs du routeur Heroku {#generating-metrics-from-heroku-router-logs}

Tout trafic acheminé vers votre application génère un log du routeur Heroku :

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Logs du routeur Heroku dans Datadog" >}}

Comme vous pouvez le constater, les logs du routeur Heroku font automatiquement l'objet d'un parsing. Avec le pipeline de logs de l'Integration Heroku, `appname`, `dyno` et `dynotype` sont extraits en tant que tags :

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Pipeline de logs Heroku" >}}

Vous pouvez générer une métrique de latence basée sur ces paramètres analysés.

Accédez à {{< ui >}}Logs{{< /ui >}} > {{< ui >}}Generate Metrics{{< /ui >}} et cliquez sur le bouton {{< ui >}}\+ New Metric{{< /ui >}} :

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="Nouvelle métrique basée sur les logs" >}}

Définissez la requête comme `Source:heroku` pour filtrer tous les logs Heroku. Sélectionnez la mesure `Duration`. De plus, vous souhaitez pouvoir regrouper cette métrique par `appname`, `dyno`, `dynotype` et `@http.status_code`. N'oubliez pas que les métriques générées par le parsing des logs sont considérées comme des Custom Metrics. Datadog recommande de générer du trafic vers votre application pour obtenir un bon flux de nouvelles entrées de log.

Enfin, ajoutez un nom pour votre métrique et cliquez sur {{< ui >}}Create Metric{{< /ui >}} :

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="Création d'une nouvelle métrique basée sur les logs" >}}

Une fois la règle créée, attendez quelques minutes pour collecter les nouvelles métriques. Ensuite, cliquez sur {{< ui >}}See in Metric Explorer{{< /ui >}} pour consulter votre nouvelle métrique :

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="Métriques basées sur les logs disponibles" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="Vue Metrics Explorer" >}}

#### Génération de métriques Datadog à partir des journaux de métriques Heroku {#generating-datadog-metrics-from-heroku-metric-logs}

Si [log-runtime-metrics][21] est configuré pour votre application, Heroku génère, pour chaque dyno, des entrées dans les journaux contenant des métriques système :

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Entrée de journal relative à l'utilisation de la mémoire du dyno" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Entrée de journal relative à l'utilisation du CPU du dyno" >}}

Ces journaux sont également analysés automatiquement par le pipeline d'intégration des journaux Heroku, qui en extrait les `measures` suivants :

```
@heroku.cpu.1m
@heroku.cpu.5m
@heroku.cpu.15m
@heroku.memory.cache
@heroku.memory.quota
@heroku.memory.rss
@heroku.memory.swap
@heroku.memory.total
```

Vous pouvez en apprendre davantage sur la signification de chacune de ces valeurs dans la [documentation officielle Heroku][23].

Suivez les mêmes étapes expliquées dans la section précédente pour générer des métriques avec une rétention de 15 mois pour chacune de ces mesures.

#### Corrélation des journaux et des traces {#correlating-logs-and-traces}

Si vous suivez les instructions de configuration ci-dessus, les journaux envoyés depuis le log drain Heroku sont corrélés aux traces.

<div class="alert alert-info">
<strong>Remarque</strong> : les journaux du Heroku router et du système sont générés par Heroku, et il n'est pas possible de les corréler aux traces.
</div>

Vous pouvez vérifier que la configuration a réussi en accédant à la [Logs view][24] pour constater que les journaux de l'application Rails sont associés à leur trace :

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="Corrélation des journaux et des traces" >}}

## Résumé {#summary}

Dans ce guide, vous avez pris un exemple d'application Rails, l'avez déployée sur Heroku et l'avez instrumentée avec Datadog pour configurer les métriques, les métriques système des dynos, les journaux, les traces et les Integrations.

Pour continuer à instrumenter votre application avec d'autres Integrations Datadog, suivez les mêmes étapes que pour l'intégration Postgres, avec les fichiers de configuration documentés dans la [documentation officielle des Integrations][25].

## Annexe : obtenir le statut du Datadog Agent {#appendix-getting-the-datadog-agent-status}

Obtenir le statut du Datadog Agent est un bon moyen de confirmer que le Datadog Agent fonctionne correctement et de déboguer des problèmes potentiels. Tout d'abord, connectez-vous en SSH à votre dyno en utilisant `heroku ps:exec` :

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

Vous pouvez ignorer les avertissements concernant le `DD_API_KEY` non défini. C'est normal. La raison est que [Heroku ne définit pas de variables de configuration pour la session SSH elle-même][26], mais le processus Datadog Agent a pu y accéder.

Une fois dans la session SSH, exécutez la commande de statut Datadog :

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

  Status date: 2021-04-30 10:49:50.692 UTC (1619779790692)
  Agent start: 2021-04-30 10:32:54.713 UTC (1619778774713)
  Pid: 52
  Go Version: go1.14.12
  Python Version: 3.8.5
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 4
  Log File: /app/.apt/var/log/datadog/datadog.log
  Log Level: info

[...]
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://signup.heroku.com/
[3]: https://git-scm.com/downloads/
[4]: https://devcenter.heroku.com/articles/heroku-cli/
[5]: https://github.com/heroku/ruby-getting-started/
[6]: https://devcenter.heroku.com/articles/getting-started-with-ruby/
[7]: https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
[8]: https://app.datadoghq.com
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/heroku/
[11]: https://devcenter.heroku.com/articles/buildpacks/
[12]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Adatadog.heroku_agent.running&filter=dyno%3Aweb.1
[13]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/heroku/#enabling-integrations
[14]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/heroku/#prerun-script
[15]: https://app.datadoghq.com/metric/catalog?filter=postgresql
[16]: https://elements.heroku.com/addons/heroku-redis
[17]: https://elements.heroku.com/addons/memcachedcloud
[18]: https://docs.datadoghq.com/fr/getting_started/tagging/unified_service_tagging/
[19]: https://app.datadoghq.com/apm/traces
[20]: https://app.datadoghq.com/services
[21]: https://devcenter.heroku.com/articles/log-runtime-metrics/
[22]: https://app.datadoghq.com/logs/livetail
[23]: https://devcenter.heroku.com/articles/log-runtime-metrics#cpu-load-averages
[24]: https://app.datadoghq.com/logs/livetail?cols=core_host%2Ccore_service&from_ts=0&index=%2A&live=true&messageDisplay=inline&query=source%3Aruby&stream_sort=desc&to_ts=-1
[25]: https://docs.datadoghq.com/fr/integrations/
[26]: https://devcenter.heroku.com/articles/exec#environment-variables