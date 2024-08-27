---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: Documentation
  text: Buildpack Heroku
- link: /logs/guide/collect-heroku-logs
  tag: Documentation
  text: Recueillir des logs Heroku
title: Instrumenter une application Ruby on Rails sur Heroku avec Datadog
---

Heroku est une plate-forme populaire utilisée par des développeurs Ruby, et notamment des développeurs Ruby on Rails. Datadog prend en charge Heroku et Ruby. Ainsi, vous pouvez envoyer les métriques, logs et traces de vos applications Ruby Heroku à Datadog.

Ce guide vous présente les étapes à suivre pour envoyer des métriques, données d'intégration, logs et traces à Datadog à partir d'une application Rails déployée sur Heroku.

## Prérequis

Ce guide part des hypothèses suivantes :

* Vous possédez déjà un compte Datadog. Si ce n'est pas le cas, vous pouvez [vous inscrire pour bénéficier d'un essai gratuit][1].
* Vous possédez déjà un compte Heroku. Si ce n'est pas le cas, vous pouvez [vous inscrire pour bénéficier d'un compte gratuit limité][2].
* Vous avez installé [Git][3] sur votre système local.
* Vous avez installé [l'outil CLI Heroku][4] sur votre système local.

## Création de votre application Heroku et déploiement de l'exemple d'application Ruby

Ce guide se base sur l'[exemple d'application Rails de Heroku][5]. Il s'agit d'une application Rails barebone utilisée dans l'[article de présentation de Ruby][6] (en anglais) permettant de prendre en main le déploiement d'une application Ruby sur Heroku. Nous nous focaliserons ici sur l'instrumentation d'une application Rails avec Datadog.

L'exemple d'application possède une dépendance pg, qui se résout uniquement si vous avez [installé Postgres en local][7]. Veillez donc à effectuer cette installation avant de poursuivre.
Vous pouvez vérifier si l'installation de Postgres a bien fonctionné en exécutant la commande `psql`. Celle-ci devrait afficher une sortie similaire à ce qui suit :

```shell
which psql
/usr/local/bin/psql
```

Récupérez le code de l'exemple d'application, puis déployez-le tel quel dans une nouvelle application Heroku.

```shell
# Choisir un nom pour votre application et exportez-le en tant que variable d'environnement.
# Ici, l'application s'appelle ruby-heroku-datadog.
export APPNAME=ruby-heroku-datadog

# Récupérer le code de l'exemple d'application
git clone https://github.com/heroku/ruby-getting-started.git
cd ruby-getting-started

# Se connecter à Heroku
heroku login

# Créer une application
heroku create -a $APPNAME

# La déployer sur Heroku
git push heroku main

# Ouvrir l'application pour vérifier qu'elle fonctionne
heroku open -a $APPNAME
```

Votre navigateur par défaut s'ouvre alors avec l'exemple d'application. Une interface similaire à la suivante devrait s'afficher :

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Exemple d'application Ruby Heroku" >}}

## Connexion de votre compte Datadog à votre application et déploiement de l'Agent Datadog

Pour obtenir une visibilité intégrale sur votre application Heroku avec Datadog, il convient tout d'abord de déployer l'Agent Datadog et de le connecter à votre compte Datadog.

Pour identifier votre compte, Datadog utilise une clé d'API. [Connectez-vous à votre compte Datadog][8] et accédez à la [section réservée aux clés d'API][9]. Copiez votre clé d'API :

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Section réservée aux clés d'API Datadog" >}}

Déployez ensuite l'Agent Datadog sur votre application. Ce guide tire profit du [buildpack Heroku Datadog][10]. Pour en savoir plus sur les [buildpacks Heroku][11] et sur leur utilité, référez-vous à la documentation Heroku officielle.

```shell
# Activer les métadonnées Heroku Labs Dyno pour définir automatiquement la variable d'environnement HEROKU_APP_NAME
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# Définir le hostname dans Datadog sur appname.dynotype.dynonumber pour garantir la continuité des métriques
heroku config:add DD_DYNO_HOST=true

# Définir le site Datadog (par exemple, us5.datadoghq.com) 
heroku config:add DD_SITE=$DD_SITE

# Ajouter ce buildpack et définir la clé d'API Datadog
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# Déployer sur Heroky pour forcer un rebuild
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

Une fois l'opération de build terminée, l'Agent Datadog s'exécute dans votre application. Exécutez la commande de statut de l'Agent Datadog, tel qu'expliqué dans l'[annexe](#annexe-obtenir-le-statut-de-l-agent-datadog), pour vérifier que tout fonctionne correctement. Passez en revue la section suivante :

```bash
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

Cette sortie indique que l'Agent Datadog s'exécute dans votre application Heroku, et qu'il est bien associé à votre compte Datadog.

Si vous ouvrez la [hostmap dans Datadog][12], vous pouvez voir que votre dyno envoie correctement des données à Datadog :

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Hostmap Datadog" >}}

## Configuration des intégrations

Datadog est fourni avec plus de 400 intégrations prêtes à l'emploi qui recueillent des métriques à partir de différentes piles techniques. Le buildpack Datadog vous permet d'activer ces intégrations pour votre application Heroku.

Vous trouverez ci-dessous quatre configurations de l'intégration Heroku couramment utilisées.

### Postgres

Heroku ajoute une base de données Postgres via une extension pour chaque application Rails déployée sur Heroku. Vérifiez que l'extension Postgres de l'application est activée :

 ```shell
heroku addons -a $APPNAME
```
Vous devriez obtenir la sortie suivante :


```bash
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

Le tableau ci-dessus indique les extensions et pièces jointes associées à l'application active (ruby-heroku-datadog) ou à d'autres apps.
```

L'exemple d'application utilise déjà cette base de données dans son code. Toutefois, vous n'avez pas encore créé de table. Exécutez ce qui suit :

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

Vous pouvez alors visualiser l'endpoint `/widgets` de votre application qui utilise cette base de données.

Pour activer l'intégration Datadog/Postgres, récupérez les identifiants de connexion à la base de données depuis Heroku. Exécutez la commande suivante à partir du terminal `psql` : 

```shell
heroku pg:credentials:url DATABASE -a $APPNAME
```
Lorsque vous utilisez le buildpack Datadog, les intégrations doivent être activées via une approche particulière. Pour découvrir comment activer toutes les intégrations, consultez la [documentation relative au buildpack][13].

Créez un dossier `datadog/conf.d` à la racine de votre application :

```shell
cd ruby-getting-started
# Créer le dossier pour la configuration des intégrations dans le code de votre application
mkdir -p datadog/conf.d/
```

Créez un fichier de configuration `postgres.yaml` en remplaçant votre host, nom de base de données, nom d'utilisateur et mot de passe par les informations obtenues avec la commande précédente :

```yaml
init_config:

instances:
  - host: <VOTRE HOSTNAME>
    port: <VOTRE PORT>
    username: <VOTRE NOM D'UTILISATEUR>
    password: <VOTRE MOT DE PASSE>
    dbname: <NOM DE VOTRE BDD>
    ssl: True
```

Au lieu de mettre à jour manuellement votre configuration, vous pouvez faire appel aux variables d'environnement Heroku pour configurer votre intégration Postgres et utiliser le [script de pré-exécution][14] pour remplacer ces valeurs avant le lancement de l'Agent Datadog :

```bash
#!/usr/bin/env bash

# Mettre à jour la configuration Postgres ci-dessus à l'aide des variables d'environnement de l'application Heroku
if [ -n "$DATABASE_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $DATABASE_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<VOTRE HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE NOM D'UTILISATEUR>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE MOT DE PASSE>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<NOM DE VOTRE BDD>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Effectuez le déploiement sur Heroku :

```shell
git add .
git commit -m "Activer l'intégration postgres"
git push heroku main
```

Une fois l'opération de build terminée, l'Agent Datadog lance le check Postgres. Exécutez la commande de statut de l'Agent Datadog, tel qu'expliqué dans l'[annexe](#annexe-obtenir-le-statut-de-l-agent-datadog), pour vérifier que le check Postgres fonctionne correctement. Passez en revue la section suivante :

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

Après avoir vérifié que le check Postgres fonctionne correctement, vous pouvez commencer à visualiser les métriques Postgres disponibles sur la page [Metrics Summary][15] :

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Metrics Explorer Datadog" >}}

### Redis

Si vous utilisez Redis, ajoutez l'[extension Redis d'Heroku][16] à votre application Heroku :

```shell
heroku addons:create heroku-redis:hobby-dev
```

Pour vérifier que Redis a bien été associé à votre application, exécutez la commande suivante :

 ```shell
heroku addons:info REDIS
```

Le texte renvoyé devrait ressembler à ceci :

```bash
=== redis-cylindrical-59589
Attachments:  ruby-heroku-datadog::REDIS
Installed at: Wed Nov 17 2021 14:14:13 GMT+0100 (Central European Standard Time)
Owning app:   ruby-heroku-datadog
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

Récupérez les identifiants depuis Heroku en exécutant la commande suivante :

```shell
heroku config -a $APPNAME | grep REDIS_URL
```

Créez un fichier de configuration intitulé `/datadog/conf.d/redisdb.yaml` à la racine de votre application pour remplacer votre host, votre port et votre mot de passe par ceux récupérés avec la commande précédente :

```yaml
init_config:

instances:
  - host: <VOTRE_HOST_REDIS>
    password: <VOTRE_MOTDEPASSE_REDIS>
    port: <VOTRE_PORT_REDIS>
```

Au lieu de mettre à jour manuellement votre configuration, vous pouvez faire appel aux variables d'environnement Heroku pour configurer votre intégration Redis et utiliser le [script de pré-exécution][14] pour remplacer ces valeurs avant le lancement de l'Agent Datadog :

```shell
#!/usr/bin/env bash

# Mettre à jour la configuration Redis ci-dessus à l'aide des variables d'environnement de l'application Heroku
if [ -n "$REDIS_URL" ]; then
  REDISREGEX='rediss?://([^:]*):([^@]+)@([^:]+):([^/]+)$'
  if [[ $REDIS_URL =~ $REDISREGEX ]]; then
    sed -i "s/<VOTRE_HOST_REDIS>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<VOTRE_MOT_DE_PASSE_REDIS>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<VOTRE_PORT_REDIS>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
  fi
fi
```

Effectuez le déploiement sur Heroku :

```shell
# Déploiement sur Heroku
git add .
git commit -m "Enable redis integration"
git push heroku main
```

Une fois l'opération de build terminée, l'Agent Datadog lance le check Redis. [Exécutez la commande de statut de l'Agent Datadog](#annexe-obtenir-le-statut-de-l-agent-datadog) pour vérifier que le check Redis fonctionne correctement.

Le texte suivant s'affiche :

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

Sidekiq est un framework de traitement en arrière-plan pour Ruby. Si vous utilisez Sidekiq Pro ou Enterprise, vous pouvez installer l'intégration Datadog pour Sidekiq.

Installez le package `dogstatsd-ruby` :

```shell
gem install dogstatsd-ruby
```

Activez la collecte de métriques Sidekiq Pro dans votre initialiseur :

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

Si vous utilisez Sidekiq Enterprise et que vous souhaitez recueillir des métriques historiques, ajoutez le bloc suivant :

```ruby
      Sidekiq.configure_server do |config|
        # Les métriques historiques sont recueillies toutes les 30 secondes par défaut
        config.retain_history(30)
      end
```

Ajoutez le bloc suivant à votre script [`datadog/prerun.sh`][14] :

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

Effectuez le déploiement sur Heroku :

```shell
git add .
git commit -m "Activer l'intégration sidekiq"
git push heroku main
```

Une fois l'opération de build terminée, l'Agent Datadog lance le check Sidekiq. [Exécutez la commande de statut de l'Agent Datadog](#annexe-obtenir-le-statut-de-l-agent-datadog) pour vérifier que le check Sidekiq fonctionne correctement.

### Memcached

Memcached est un système de gestion de la mémoire cache distribuée qui est couramment utilisé dans les applications Rails. L'exemple qui suit montre comment ajouter l'[extension Memcached Cloud d'Heroku][17] à votre application Heroku :

```shell
heroku addons:create memcachedcloud:30
```

Pour vérifier que Memcached a bien été associé à votre application, exécutez la commande suivante :

```shell
heroku addons | grep -A2 memcachedcloud
```

Le texte suivant s'affiche :

```bash
memcachedcloud (memcachedcloud-fluffy-34783)   30         free   created
 └─ as MEMCACHEDCLOUD
```

Récupérez les identifiants depuis Heroku en exécutant la commande suivante :

```shell
heroku config | grep MEMCACHEDCLOUD
```

Créez un fichier de configuration intitulé `/datadog/conf.d/mcache.yaml` à la racine de votre application pour remplacer votre host, votre port, votre nom d'utilisateur et votre mot de passe par ceux récupérés avec la commande précédente :

```yaml
instances:
  - url: <VOTRE_HOST_MCACHE>
    port: <VOTRE_PORT_MCACHE>
    username: <VOTRE_NOM_UTILISATEUR_MCACHE>
    password: <VOTRE_MOT_DE_PASSE_MCACHE>
```

Au lieu de mettre à jour manuellement votre configuration, vous pouvez faire appel aux variables d'environnement Heroku pour configurer votre intégration Memcached et utiliser le [script de pré-exécution][14] pour remplacer ces valeurs avant le lancement de l'Agent Datadog :

```bash
#!/usr/bin/env bash

# Mettre à jour la configuration Memcached ci-dessus à l'aide des variables d'environnement de l'application Heroku
if [ -n "$MEMCACHEDCLOUD_SERVERS" ]; then
  MCACHEREGEX='([^:]+):([^/]+)$'
  if [[ $MEMCACHEDCLOUD_SERVERS =~ $MCACHEREGEX ]]; then
    sed -i "s/<VOTRE_HOST_MCACHE>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
    sed -i "s/<VOTRE_PORT_MCACHE>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  fi
  sed -i "s/<VOTRE_NOM_UTILISATEUR_MCACHE>/${MEMCACHEDCLOUD_USERNAME}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  sed -i "s/<VOTRE_MOT_DE_PASSE_MCACHE>/${MEMCACHEDCLOUD_PASSWORD}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
fi
```

Effectuez le déploiement sur Heroku :

```shell
git add .
git commit -m "Activer l'intégration memcached "
git push heroku main
```

Une fois l'opération de build terminée, l'Agent Datadog lance le check Memcached. [Exécutez la commande de statut de l'Agent Datadog](#annexe-obtenir-le-statut-de-l-agent-datadog) pour vérifier que le check Memcached fonctionne correctement.

Le texte suivant s'affiche :

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

Pour bénéficier d'un tracing distribué depuis votre application Ruby Heroku, activez l'instrumentation.

Vérifiez que vous êtes dans le dossier avec le code de l'application :

```shell
cd ruby-getting-started
```

Modifiez votre `Gemfile` et ajoutez la `ddtrace` :

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

Installez le gem avec `bundle install` :

```shell
bundle install
```

Avant de valider les modifications et de les envoyer à Heroku, configurez le [tagging unifié][18] pour l'application :

```shell
# Définir l'environment de votre application
heroku config:add DD_ENV=production -a $APPNAME

# Définir la version de votre application
heroku config:add DD_VERSION=0.1 -a $APPNAME

# Définir le service de votre application
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

Validez vos modifications et envoyez-les à Heroku :

```shell
git add .
git commit -m "Activer le tracing distribué"
git push heroku main
```

Lors du build, des messages d'erreur s'affichent à propos du traceur, car celui-ci ne parvient pas à atteindre l'endpoint de l'Agent APM Datadog. Il s'agit du comportement attendu. En effet, l'Agent Datadog ne se lance qu'après le processus de build. Vous pouvez ignorer ces messages :

```bash
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

Une fois l'opération de build terminée, votre application envoie des traces à Datadog. Vous pouvez commencer à générer du trafic vers votre application (par exemple, en visitant la page /widgets de votre application) pour obtenir un certain volume de traces.

Exécutez la commande de statut de l'Agent Datadog, tel qu'expliqué dans l'[annexe](#annexe-obtenir-le-statut-de-l-agent-datadog), pour vérifier que l'Agent APM s'exécute correctement et qu'il envoie des traces à Datadog. Passez en revue la section suivante :

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

Cette sortie indique que l'Agent APM s'exécute correctement et qu'il envoie des traces à Datadog.

Accédez à la [section des traces de l'APM][19] pour visualiser vos traces :

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Traces de l'application Ruby dans Datadog" >}}

Accédez à la [liste des services][20] pour afficher tous les services de votre application ainsi que la vue associée :

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Vue de la liste des services dans Datadog" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Vue des services de l'application Ruby dans Datadog" >}}

## Logs

Ensuite, activez les logs en configurant un drain de logs Heroku.

Lorsque vous utilisez un drain de logs, tous les logs sont transmis à Datadog à partir de la même `ddsource` (généralement `heroku`), pour qu'il n'y ait pas de parsing automatique des logs avec des intégrations autres que Heroku.

### Génération de vos logs Rails

Pour configurer vos logs Rails, Datadog recommande l'utilisation de Lograge. Pour cet exemple d'application, appliquez une configuration permettant de mettre en corrélation les logs et les traces.

Vérifiez que vous êtes dans le dossier avec le code de l'application :
```shell
cd ruby-getting-started
```

Modifiez votre `Gemfile` et ajoutez `lograge` :

```ruby
gem 'lograge'
```

Installez le gem avec `bundle install` :

```shell
bundle install
```

Pour configurer Lograge, créez un fichier `config/initializers/lograge.rb` et ajoutez-y ce qui suit :

```ruby
Rails.application.configure do
  # Configuration de Lograge
  config.lograge.enabled = true

  # Indique de se connecter au format JSON
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## Désactive la coloration des logs
  config.colorize_logging = false

  # Journalisation dans STDOUT
  config.lograge.logger = ActiveSupport::Logger.new(STDOUT)

  config.lograge.custom_options = lambda do |event|
    # Récupère les informations des traces pour le thread actuel
    correlation = Datadog::Tracing.correlation

    {
      # Ajoute des ID sous forme de tags dans la sortie des logs
      :dd => {
        # Pour garantir un certain niveau de précision pendant la sérialisation JSON, utilisez des chaînes pour les grands nombres
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

Effectuez le déploiement sur Heroku :

```shell
git add .
git commit -m "Ajout de lograge"
git push heroku main
```

### Configuration d'un drain de logs Heroku

Heroku possède un routeur de logs natif désigné par le terme « drain de logs ». Il recueille les logs à partir de l'ensemble des dynos exécutés dans votre application et les envoie à Heroku. Parmi ces logs figurent les logs d'application, les logs du routeur Heroku et les logs des dynos système Heroku. Vous pouvez configurer le drain de logs pour acheminer ces logs vers Datadog. Le drain de logs envoie les logs système Heroku à Datadog à partir de `ddsource=heroku`.

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Vue des logs Heroku" >}}

La configuration du drain de logs Heroku permet également d'envoyer à Datadog des métriques système sur les dynos (CPU, mémoire).

Pour configurer le drain de logs Heroku depuis un terminal, exécutez ce qui suit :

```shell
export APPNAME=<NOM_DE_VOTRE_APPLICATION>
export DD_ENV=<ENVIRONNEMENT_DE_VOTRE_APPLICATION> # example: production, staging
export DD_SERVICE=<NOM_DE_VOTRE_SERVICE>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

Pour récupérer les métriques système depuis vos dynos, activez non seulement le drain de logs, mais également [log-runtime-metrics][21] :

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Redémarrer votre application
heroku restart -a $APPNAME
```

Une fois le drain configuré, vos logs Heroku s'affichent dans la [section des logs de Datadog][22].

#### Génération des métriques depuis les logs de routeur Heroku

Tout le trafic passant par votre application génère un log de routeur Heroku :

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Logs de routeur Heroku dans Datadog" >}}

Comme vous pouvez le voir, les logs de routeur Heroku sont automatiquement parsés. Avec le pipeline de logs d'intégration Heroku, `appname`, `dyno` et`dynotype` sont extraits en tant que tags :

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Pipeline de logs Heroku" >}}

Vous pouvez générer une métrique de latence reposant sur ces paramètres parsés.

Accédez à Logs -> Generate Metrics, puis cliquez sur le bouton + New Metric :

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="Nouvelle métrique basée sur des logs" >}}

Définissez la requête `Source:heroku` pour filtrer tous les logs Heroku. Sélectionnez la mesure `Duration`. En outre, il paraît intéressant de pouvoir regrouper cette métrique en fonction de `appname`, `dyno`, `dynotype` et `@http.status_code`. Gardez à l'esprit que les métriques générées par le parsing des logs sont considérées comme des métriques custom. Nous vous recommandons de générer du trafic vers votre application pour obtenir un certain volume d'entrées de log.

Pour finir, attribuez un nom à votre métrique et cliquez sur **Create Metric** :

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="Création d'une nouvelle métrique basée sur des logs" >}}

Une fois la règle créée, patientez quelques minutes le temps de rassembler les nouvelles métriques. Cliquez ensuite sur See in Metric Explorer pour visualiser votre nouvelle métrique :

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="Log based available metrics" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="Vue de Metrics Explorer" >}}

#### Génération de métriques Datadog depuis les logs de métrique Heroku

Si [log-runtime-metrics][21] est configuré pour votre application, Heroku génère des entrées de log avec des métriques système pour chacun des dynos :

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Entrée de log sur l'utilisation de la mémoire d'un dyno" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Entrée de log sur l'utilisation du CPU d'un dyno" >}}

Ces logs sont automatiquement parsés par le pipeline de logs d'intégration de Heroku, qui extrait les `measures` suivantes :

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

Consultez la [documentation Heroku officielle][23] (en anglais) pour en savoir plus sur chacune de ces valeurs.

Suivez les étapes détaillées dans la section précédente pour générer des métriques avec une rétention de 15 mois pour chaque mesure.

#### Corrélation des logs et des traces

Si vous suivez les instructions de configuration ci-dessus, les logs envoyés à partir du drain de logs Heroku sont mis en corrélation avec les traces.

<div class="alert alert-info">
<strong>Remarque</strong> : les logs système et sur le routeur Heroku sont générés par Heroku. La mise en corrélation des traces est impossible.
</div>

Vous pouvez vérifier que la configuration ne comporte aucune erreur en accédant à la [vue des logs][24]. Les logs de l'application Rails devraient afficher la trace pertinente corrélée :

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="Corrélation des logs et des traces" >}}

## Résumé

Durant ce guide, nous sommes partis d'un exemple d'application Rails, nous l'avons déployé sur Heroku, puis nous l'avons instrumenté avec Datadog pour configurer les métriques, métriques système des dynos, logs, traces et intégrations.

Pour continuer l'instrumentation de votre application avec d'autres intégrations Datadog, suivez les mêmes étapes que pour l'intégration Postgres. Les fichiers de configuration sont indiqués dans notre [documentation sur les intégrations][25].

## Annexe : obtenir le statut de l'Agent Datadog

En récupérant le statut de l'Agent Datadog, vous pouvez vérifier qu'il s'exécute correctement, et corriger d'éventuels problèmes. Commencez par SSH votre dyno avec la commande `heroku ps:exec` :

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<votre clé API>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

Vous pouvez ignorer les avertissements concernant la configuration manquante de `DD_API_KEY`. Il s'agit du comportement attendu. En effet, [Heroku ne définit pas de variables de configuration pour la session SSH][26]. Toutefois, le processus de l'Agent Datadog parvient à y accéder.

Une fois la session SSH ouverte, exécutez la commande de statut Datadog :

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

## Pour aller plus loin

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
[15]: https://app.datadoghq.com/metric/summary?filter=postgresql
[16]: https://elements.heroku.com/addons/heroku-redis
[17]: https://elements.heroku.com/addons/memcachedcloud
[18]: https://docs.datadoghq.com/fr/getting_started/tagging/unified_service_tagging/
[19]: https://app.datadoghq.com/apm/traces
[20]: https://app.datadoghq.com/apm/services
[21]: https://devcenter.heroku.com/articles/log-runtime-metrics/
[22]: https://app.datadoghq.com/logs/livetail
[23]: https://devcenter.heroku.com/articles/log-runtime-metrics#cpu-load-averages
[24]: https://app.datadoghq.com/logs/livetail?cols=core_host%2Ccore_service&from_ts=0&index=%2A&live=true&messageDisplay=inline&query=source%3Aruby&stream_sort=desc&to_ts=-1
[25]: https://docs.datadoghq.com/fr/integrations/
[26]: https://devcenter.heroku.com/articles/exec#environment-variables