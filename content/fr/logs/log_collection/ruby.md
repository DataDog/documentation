---
title: Collecte de logs avec Ruby
kind: documentation
aliases:
  - /fr/logs/languages/ruby
further_reading:
  - link: 'https://github.com/roidrage/lograge'
    tag: Github
    text: Documentation Lograge
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: /logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: Dépannage pour la collecte de logs
---
Pour envoyer vos logs à Datadog, nous vous conseillons d'activer la journalisation au sein d'un fichier avec [`lograge`][1], puis de suivre ce fichier avec l'Agent Datadog. Lorsque vous configurez la journalisation avec Ruby, assurez-vous de penser aux [attributs réservés][2].

Au lieu d'obtenir un log Rail comme ceci :

```text
Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
```

Après formatage avec lograge, on obtient une seule ligne de log comportant toutes les informations importantes au format JSON, comme ceci :

```json
{
  "timestamp": "2016-01-12T19:15:19.118829+01:00",
  "level": "INFO",
  "logger": "Rails",
  "method": "GET",
  "path": "/jobs/833552.json",
  "format": "json",
  "controller": "jobs",
  "action": "show",
  "status": 200,
  "duration": 58.33,
  "view": 40.43,
  "db": 15.26
}
```

## Configuration

Cette section décrit les étapes de configuration minimales requises pour transmettre les logs de votre application Rails à Datadog. Une version plus approfondie de cette configuration est disponible dans notre article de blog [How to collect, customize, and manage Rails application logs][3] (en anglais).

1. **Ajoutez le GEM lograge à votre projet** :

    ```ruby
    gem 'lograge'
    ```

2. **Configurez Lograge**. Dans votre fichier de configuration, choisissez ces paramètres :

    ```ruby
    # Lograge config
    config.lograge.enabled = true

    # This specifies to log in JSON format
    config.lograge.formatter = Lograge::Formatters::Json.new

    ## Disables log coloration
    config.colorize_logging = false

    # Log to a dedicated file
    config.lograge.logger = ActiveSupport::Logger.new(File.join(Rails.root, 'log', "#{Rails.env}.log"))

    # This is useful if you want to log query parameters
    config.lograge.custom_options = lambda do |event|
        { :ddsource => 'ruby',
          :params => event.payload[:params].reject { |k| %w(controller action).include? k }
        }
    end
    ```

    **Remarque** : vous pouvez également demander à Lograge d'ajouter des informations contextuelles à vos logs. Consultez la documentation officielle si cela vous intéresse : [documentation Lograge][4]

3. **Configurez votre Agent Datadog**. Créez un fichier `ruby.d/conf.yaml` dans votre dossier `conf.d/` avec le contenu suivant :

    ```yaml
      logs:
        - type: file
          path: "<RUBY_LOG_FILE_PATH>.log"
          service: ruby
          source: ruby
          sourcecategory: sourcecode
          ## Uncomment the following processing rule for multiline logs if they
          ## start by the date with the format yyyy-mm-dd
          #log_processing_rules:
          #  - type: multi_line
          #    name: new_log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

    En savoir plus sur la [collecte de logs avec l'Agent][5].

4. [Redémarrez l'Agent][6].

## Concepts avancés

### Ajouter des identifiants de trace à vos logs

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][7] afin d'ajouter automatiquement des identifiants de trace et de span à vos logs.

[Configurez ensuite l'Agent Datadog](#configurez-votre-agent-datadog) de façon à collecter les logs Ruby à partir du fichier.

### Conseils pour la journalisation dans votre application

Maintenant que votre configuration de journalisation envoie du contenu JSON valide, vous pouvez l'exploiter autant que bon vous semble.

Nous vous conseillons d'ajouter un maximum de contexte (utilisateur, session, action, métriques, etc.) à chaque ligne de log que vous envoyez.
Pour ce faire, au lieu de loguer de simples messages textuels, vous pouvez loguer des hashes, comme dans l'exemple suivant :

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

Le hash sera converti au format JSON et vous pourrez alors analyser l'utilisateur `user` et le nom du bouton `button_name` :

```json
{
  "timestamp": "2016-01-12T19:15:18.683575+01:00",
  "level": "INFO",
  "logger": "WelcomeController",
  "message": {
    "user": "1234",
    "button_name": "save",
    "message": "User 1234 clicked on button saved"
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

Envoyez des informations de configuration supplémentaires à Grape :

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/roidrage/lograge
[2]: /fr/logs/?tab=ussite#reserved-attributes
[3]: https://www.datadoghq.com/blog/managing-rails-application-logs
[4]: https://github.com/roidrage/lograge#installation
[5]: /fr/agent/logs
[6]: /fr/agent/guide/agent-commands/#restart-the-agent
[7]: /fr/tracing/connect_logs_and_traces/ruby