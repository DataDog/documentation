---
aliases:
- /fr/logs/languages/ruby
further_reading:
- link: https://github.com/roidrage/lograge
  tag: Code source
  text: Documentation Lograge
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guide de dépannage pour la collecte de logs
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: Blog
  text: Comment recueillir, personnaliser et gérer les logs d'applications Rails
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Comment gérer des fichiers de log avec Logrotate
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »
title: Collecte de logs avec Ruby on Rails
---

## Présentation

Pour envoyer vos logs à Datadog, configurez la journalisation au sein d'un fichier avec [`Lograge`][1] et effectuez un [suivi][11] de ce fichier avec votre Agent Datadog. Tenez compte des [attributs réservés][2] lors de la configuration de la journalisation avec Ruby.

Lograge vous permet de transformer le format de log standard basé sur du texte. Exemple :

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

Ce format peut être remplacé par le format JSON suivant, qui est doté une meilleure structure :

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

## Installer et configurer votre logger

{{< tabs >}}
{{% tab "Lograge" %}}

1. Ajoutez le gem `lograge` à votre projet :
    ```ruby
    gem 'lograge'
    ```
2. Dans votre fichier de configuration, définissez ce qui suit pour configurer Lograge :
    ```ruby
    # Lograge config
    config.lograge.enabled = true

    # This specifies to log in JSON format
    config.lograge.formatter = Lograge::Formatters::Json.new

    ## Disables log coloration
    config.colorize_logging = false

    # Log to a dedicated file
    config.lograge.logger = ActiveSupport::Logger.new(Rails.root.join('log', "#{Rails.env}.log"))

    # This is useful if you want to log query parameters
    config.lograge.custom_options = lambda do |event|
        { :ddsource => 'ruby',
          :params => event.payload[:params].reject { |k| %w(controller action).include? k }
        }
    end
    ```
    **Remarque** : Lograge peut également ajouter des informations contextuelles à vos logs. Consultez la [documentation Lograge][1] (en anglais) pour en savoir plus.

Pour obtenir un exemple plus détaillé de cette configuration, consultez l'article [Comment recueillir, personnaliser et gérer des logs d'application Rails][2] (en anglais).

### RocketPants

Pour configurer Lograge pour des contrôleurs `rocket_pants`, procédez comme suit dans le fichier `config/initializers/lograge_rocketpants.rb` (l'emplacement varie selon votre projet) :

```ruby
# Tiré de :
#   https://github.com/Sutto/rocket_pants/issues/111
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

[1]: https://github.com/roidrage/lograge#installation
[2]: https://www.datadoghq.com/blog/managing-rails-application-logs
{{% /tab %}}
{{% tab "Grape" %}}

1. Ajoutez le gem `grape_logging` à votre projet :

    ```ruby
    gem 'grape_logging'
    ```
2. Ajoutez la configuration supplémentaire à Grape :

    ```ruby
    use GrapeLogging::Middleware::RequestLogger,
          instrumentation_key: 'grape',
          include: [ GrapeLogging::Loggers::Response.new,
                    GrapeLogging::Loggers::FilterParameters.new ]
    ```
3. Créez le fichier `config/initializers/instrumentation.rb` et ajoutez la configuration suivante :

    ```ruby
    # Subscribe to grape request and log with a logger dedicated to Grape
    grape_logger = Logging.logger['Grape']
    ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
        grape_logger.info payload
    end
    ```

{{% /tab %}}
{{< /tabs >}}
## Configurer l'Agent Datadog

Une fois la [collecte de logs activée][3], procédez comme suit pour configurer [la collecte de logs personnalisée][4] afin de suivre vos fichiers de log et les envoyer à Datadog.

1. Créez un dossier `ruby.d/` dans le [répertoire de configuration][5] `conf.d/` de l'Agent. 
2. Créez un fichier `conf.yaml` dans votre dossier `ruby.d/` avec le contenu suivant :
    ```yaml
      logs:
        - type: file
          path: "<RUBY_LOG_FILE_PATH>.log"
          service: <SERVICE_NAME>
          source: ruby
          sourcecategory: sourcecode
          ## Uncomment the following processing rule for multiline logs if they
          ## start by the date with the format yyyy-mm-dd
          #log_processing_rules:
          #  - type: multi_line
          #    name: new_log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
4. [Redémarrez l'Agent][6].
5. Lancez la [sous-commande status de l'Agent][8] et cherchez `ruby` dans la section `Checks` pour vérifier que les logs sont bien transmis à Datadog.

Si les logs sont au format JSON, Datadog [parse automatiquement les messages de log][9] pour extraire les attributs. Utilisez le [Log Explorer][10] pour visualiser et dépanner vos logs.

## Associer vos logs à vos traces

Si la solution APM est activée pour cette application, vous pouvez améliorer la corrélation entre les traces et les logs d'application en [suivant les instructions de journalisation Ruby pour APM][7] afin d'ajouter automatiquement des identifiants de trace et de span à vos logs.

## Meilleures pratiques

Dès que possible, ajoutez du contexte supplémentaire (utilisateur, session, action et métriques) à vos logs.

Au lieu d'enregistrer de simples messages dans des chaînes, utilisez les hashs de log comme dans l'exemple suivant :

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

Le hash est converti en JSON, et vous pouvez effectuer des analyses pour `user` et `button_name` :

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
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/roidrage/lograge
[2]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[3]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /fr/agent/configuration/agent-commands/#restart-the-agent
[7]: /fr/tracing/other_telemetry/connect_logs_and_traces/ruby/
[8]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[9]: /fr/logs/log_configuration/parsing
[10]: /fr/logs/explorer/
[11]: /fr/glossary/#tail