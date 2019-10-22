---
title: Collecte de logs avec Ruby
kind: documentation
aliases:
  - /fr/logs/languages/ruby
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: /logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: Dépannage pour la collecte de logs
---
Ici, nous vous conseillons d'utiliser `lograge` ici afin d'apporter un peu de bon sens aux logs fluctuants et difficilement analysables. Lorsque vous configurez les logs avec Ruby, assurez-vous de penser aux [attributs réservés][1].

Au lieu d'obtenir un log Rail comme ceci :

```
Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
```

Après formatage avec Lograge, on obtient une seule ligne de log comportant toutes les informations importantes :

```
method=GET path=/jobs/833552.json format=json controller=jobs action=show status=200 duration=58.33 view=40.43 db=15.26
```

Résultat final au format JSON :

```
{
  "timestamp":"2016-01-12T19:15:19.118829+01:00",
  "level":"INFO",
  "logger":"Rails",
  "method":"GET",
  "path":"/jobs/833552.json",
  "format":"json",
  "controller":"jobs",
  "action":"show",
  "status":200,
  "duration":58.33,
  "view":40.43,
  "db":15.26
}
```

**Pour envoyer vos logs à Datadog, nous vous conseillons d'activer la journalisation au sein d'un fichier et de suivre ce fichier avec l'Agent Datadog.**

## Ajouter les GEM
Ajoutez les deux GEM suivants à votre projet :

```ruby
gem 'logging-rails', :require => 'logging/rails'
gem 'lograge'
```

## Configurer Lograge
Dans votre fichier de configuration, choisissez ces paramètres :

```ruby
# Configuration de Lograge
config.lograge.enabled = true

# On demande à ce que les logs soient enregistrés au format brut (ce qui correspond à des hashes Ruby). Ruby va s'occuper du formatage JSON.
config.lograge.formatter = Lograge::Formatters::Raw.new

# Ceci est utile si vous souhaitez loguer des paramètres de requête
config.lograge.custom_options = lambda do |event|
    { :ddsource => ["ruby"],
      :params => event.payload[:params].reject { |k| %w(controller action).include? k }
    }
end
```

**Remarque** : vous pouvez également demander à Lograge d'ajouter des informations contextuelles à vos logs. Consultez la documentation officielle si cela vous intéresse : [documentation Lograge][2]

## Désactiver la coloration des logs
Désactivez la coloration de vos logs afin d'éviter tout problème d'affichage dans l'application Datadog :

```ruby
config.colorize_logging = false
```

Passons maintenant à la configuration de `logging-rails`, qui se chargera de tout convertir au format JSON.

## Configurer le GEM logging-rail
Si ce n'est pas déjà fait, exécutez la commande suivante :

```shell
rails generate logging:install
```

Cette action génère le `logging.rb` avec la configuration par défaut que nous allons adapter.

Pour commencer, nous allons tout loguer au format JSON. Pour cela, remplacez `:inspect` par `:json` dans les premières lignes du fichier `logging.rb` :

```ruby
# Les objets sont convertis en chaînes grâce à la méthode :inspect.
  Logging.format_as :json
```

Enfin, définissez la structure JSON et associez-la à l'appender que vous utiliserez pour transférer les données vers Datadog :

```ruby
# La structure JSON
json_layout = Logging.layouts.json

# Par exemple, un file appender qui sera transféré par un Agent syslog vers Datadog
Logging.appenders.file(
    'datadog',
    :filename => config.paths['log'].first,
    :layout => json_layout
)
```

Si vous souhaitez modifier la structure du log, tous les éléments disponibles peuvent être trouvés directement dans le [référentiel source][3]

## Configurer votre Agent Datadog

Créez un fichier `ruby.d/conf.yaml` dans votre dossier `conf.d/` avec le contenu suivant :

```yaml
##Section Log
logs:

    ## - type (obligatoire) : type de fichier de la source d'entrée de log (tcp/udp/file).
    ##   port / path (obligatoire) : définit le type tcp ou udp du port. Choisit le chemin si le type est défini sur file.
    ##   service (obligatoire) : nom du service propriétaire du log.
    ##   source (obligatoire) : attribut qui définit l'intégration qui envoie les logs.
    ##   sourcecategory (facultatif) : attribut à valeur multiple. Il peut être utilisé pour préciser l'attribut source.
    ##   tags (facultatif) : ajoute des tags à chaque log recueilli.

  - type: fichier
    path: /chemin/vers/votre/log/ruby.log
    service: ruby
    source: ruby
    sourcecategory: sourcecode
    # Pour les logs multiligne, s'ils commencent par la date au format aaaa-mm-jj, supprimez la mise en commentaire de la règle de traitement suivante.
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

Et voilà ! Désormais, tous vos appels Rails seront automatiquement effectués au format JSON et compatibles avec votre application Datadog.

## Pour aller plus loin

### Ajouter des identifiants de trace à vos logs

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][4] afin d'ajouter automatiquement des identifiants de trace et de span à vos logs.

Une fois cette opération terminée, le log doit avoir le format suivant (pour JSON) :

```json
{
  "timestamp":"2016-01-12T19:15:19.118829+01:00",
  "level":"INFO",
  "logger":"Rails",
  "message": {
    "method":"GET",
    "path":"/jobs/833552.json",
    "format":"json",
    "controller":"jobs",
    "action":"show",
    "status":200,
    "duration":58.33,
    "view":40.43,
    "db":15.26,
    "dd":{
      "trace_id":7290723543738956761,
      "span_id":8140992452225855633
    },
    "ddsource": ["ruby"],
    "params":{}
  }
}
```

[Configurez ensuite l'Agent Datadog](#configurez-votre-agent-datadog) de façon à collecter les logs Ruby à partir du fichier.

### Conseils pour la journalisation dans votre application

Maintenant que votre configuration de journalisation envoie le bon format JSON, vous pouvez l'exploiter autant que bon vous semble.

Nous vous conseillons d'apporter un maximum de contexte (utilisateur, session, action, métriques, etc.) à chaque ligne de log que vous envoyez.
Pour ce faire, au lieu de loguer de simples messages textuels, vous pouvez logger des hashes, comme dans l'exemple suivant :

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

Le hash sera converti au format JSON et vous pourrez alors analyser l'utilisateur `user` et le nom du bouton `button_name` :

```json
{
    "timestamp":"2016-01-12T19:15:18.683575+01:00",
    "level":"INFO",
    "logger":"WelcomeController",
    "message": {
        "user":"1234",
        "button_name":"save",
        "message":"User 1234 clicked on button saved"
            }
}
```

### Configuration de journalisation suggérée de RocketPant

Dans le fichier `config/initializers/lograge_rocketpants.rb` (variable selon votre projet) :

```ruby
# Configuration de Lograge pour le faire fonctionner avec les contrôleurs de rocket_pants
#
# Tiré de :
#   https://github.com/Sutto/rocket_pants/issues/111
#
app = Rails.application
if app.config.lograge.enabled
  ActiveSupport::LogSubscriber.log_subscribers.each do |subscriber|
    case subscriber
      when ActionController::LogSubscriber
        Lograge.unsubscribe(:rocket_pants, subscriber)
    end
  end
  Lograge::RequestLogSubscriber.attach_to :rocket_pants
end
```

### Configuration de journalisation suggérée de Grape

Ajoutez le GEM grape_logging :

```ruby
gem 'grape_logging'
```

Envoi d'autres informations de configuration à Grape :

```ruby
use GrapeLogging::Middleware::RequestLogger,
      instrumentation_key: 'grape', 
      include: [ GrapeLogging::Loggers::Response.new,
                 GrapeLogging::Loggers::FilterParameters.new ]
```

Créez le fichier `config/initializers/instrumentation.rb` et ajoutez la configuration suivante :

```ruby
# S'abonner à la requête Grape et enregistrer les logs avec un logger dédié à Grape
grape_logger = Logging.logger['Grape']
ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
    grape_logger.info payload
end
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/logs/?tab=ussite#reserved-attributes)
[2]: https://github.com/roidrage/lograge#installation
[3]: https://github.com/TwP/logging/blob/master/lib/logging/layouts/parseable.rb#L100
[4]: /fr/tracing/advanced/connect_logs_and_traces/?tab=ruby