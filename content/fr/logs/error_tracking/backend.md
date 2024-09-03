---
description: Découvrez comment suivre les erreurs du backend à partir de vos logs.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: GitHub
  text: Analyser les problèmes affectant vos applications avec le suivi des erreurs
    Datadog
- link: /logs/error_tracking/explorer/
  tag: Documentation
  text: En savoir plus sur l'Explorateur de suivi des erreurs
is_beta: true
title: Suivre des erreurs de backend
---

## Section Overview

Si vous ne collectez pas déjà des logs avec Datadog, consultez la [documentation relative aux logs][10] pour configurer des logs. Assurez-vous que le tag `source` (spécifiant le langage) est correctement configuré. Datadog recommande de mettre en place une collecte de logs basée sur l'Agent.

## Configuration

Pour les langages tels que **Python**, **Java** et **Ruby**, aucune configuration supplémentaire n'est nécessaire si le tag `source` est configuré correctement dans vos logs. Tous les attributs requis sont automatiquement taggés et envoyés à Datadog.

Pour les langages de backend tels que **C#**, **.NET**, **Go** et **Node.js**, les exemples de code de chaque section montrent comment configurer correctement un log d'erreur et joindre la pile la stack trace requise dans `error.stack` du log.

Si vous envoyez déjà des stack traces à Datadog mais qu'elles ne figurent pas dans `error.stack`, vous pouvez configurer un [remappeur de logs générique][6] pour remapper la stack trace vers l'attribut adéquat dans Datadog.

Pour configurer les extraits de code en ligne dans les problèmes, configurez [l'intégration de code source][9]. L'ajout d'extraits de code dans Error Tracking pour les logs ne nécessite pas l'utilisation de l'APM. Les tags d'enrichissement et le référentiel lié sont les mêmes pour les deux.

#### Attributs pour Error Tracking

Pour activer Error Tracking, les logs doivent inclure les deux éléments suivants :

- Un champ `error.kind` ou `error.stack`. **Remarque** : si vous utilisez `error.stack`, il doit s'agir d'une stack trace valide.
- Un niveau de statut de `ERROR`, `CRITICAL`, `ALERT` ou `EMERGENCY`.

Les autres attributs énumérés ci-dessous sont facultatif, mais leur présence améliore le regroupement des erreurs.

Des attributs spécifiques sont affichés dans un interface dédiée dans Datadog. Pour activer ces fonctionnalités pour Error Tracking, utilisez les noms d'attributs suivants :

| Attribut            | Rôle                                                             |
|----------------------|-------------------------------------------------------------------------|
| `error.stack`        | La stack trace réelle                                                      |
| `error.message`      | Le message d'erreur contenu dans la stack trace                              |
| `error.kind`         | Le type d'erreur (par exemple, « Exception » ou « OSError ») |

**Remarque** : par défaut, les pipelines des intégrations tentent de remapper les paramètres par défaut de la bibliothèque de création de logs sur ces attributs spécifiques et parsent les stack traces ou tracebacks afin d'extraire automatiquement `error.message` et `error.kind`.

Pour en savoir plus, consultez la [documentation relative aux attributs de code source][11].

### C# et .NET

{{< tabs >}}
{{% tab "Serilog" %}}

Si vous n'avez pas configuré la collecte de logs pour C#, consultez la [documentation dédiée à la collecte de logs avec C#][1].

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```csharp
var log = new LoggerConfiguration()
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")
    .Enrich.WithExceptionDetails()
    .CreateLogger();
try {
  // ...
} catch (Exception ex) {
  // transmettre l'exception en tant que premier argument de l'appel de log
  log.Error(ex, "an exception occurred");
}
```

[1]: /fr/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "NLog" %}}

Si vous n'avez pas configuré la collecte de logs pour C#, consultez la [documentation dédiée à la collecte de logs avec C#][1].

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```csharp
private static Logger log = LogManager.GetCurrentClassLogger();

static void Main(string[] args)
{
  try {
    // ...
  } catch (Exception ex) {
    // transmettre l'exception en tant que premier argument de l'appel de log
    log.ErrorException("an exception occurred", ex);
  }
}
```

[1]: /fr/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "Log4Net" %}}

Si vous n'avez pas configuré la collecte de logs pour C#, consultez la [documentation dédiée à la collecte de logs avec C#][1].

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```csharp
class Program
{
  private static ILog logger = LogManager.GetLogger(typeof(Program));

  static void Main(string[] args)
  {
    try {
      // ...
    } catch (Exception ex) {
      // transmettre l'exception en tant que premier argument de l'appel de log
      log.Error("an exception occurred", ex);
    }
  }
}
```

[1]: /fr/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{< /tabs >}}

### Go

#### Logrus

Si vous n'avez pas configuré la collecte de logs pour Go, consultez la [documentation dédiée à la collecte de logs avec Go][3].

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```go
// for https://github.com/pkg/errors
type stackTracer interface {
    StackTrace() errors.StackTrace
}

type errorField struct {
  Kind    string `json:"kind"`
  Stack   string `json:"stack"`
  Message string `json:"message"`
}

func ErrorField(err error) errorField {
    var stack string
    if serr, ok := err.(stackTracer); ok {
        st := serr.StackTrace()
        stack = fmt.Sprintf("%+v", st)
        if len(stack) > 0 && stack[0] == '\n' {
            stack = stack[1:]
        }
    }
    return errorField{
        Kind: reflect.TypeOf(err).String(),
        Stack: stack,
        Message: err.Error(),
    }
}


log.WithFields(log.Fields{
    "error": ErrorField(err)
}).Error("an exception occurred")
```

### Java (parsé)

Si vous n'avez pas configuré la collecte de logs pour Java, consultez la [documentation dédiée à la collecte de logs avec Java][4]. Assurez-vous que vos logs portent le tag `source:java`.

{{< tabs >}}
{{% tab "Log4j" %}}

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```java
Logger logger = LogManager.getLogger("HelloWorld");
try {
  // ...
} catch (Exception e) {
  // transmettre l'exception en tant que dernier argument de l'appel de log
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{% tab "SLF4J" %}}

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```java
Logger logger = LoggerFactory.getLogger(NameOfTheClass.class);
try {
  // ...
} catch (Exception e) {
  // transmettre l'exception en tant que dernier argument de l'appel de log
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{< /tabs >}}

### Node.js

#### Winston (JSON)

Si vous n'avez pas configuré la collecte de logs pour Node.js, consultez la [documentation dédiée à la collecte de logs avec Node.js][5].

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```json
try {
  // ...
} catch (e) {
  logger.error("an exception occurred", {
    error: {
      message: e.message,
      stack: e.stack
    }
  });
}
```

### PHP

#### Monolog (JSON)

Si vous n'avez pas configuré la collecte de logs pour PHP, consultez la [documentation dédiée à la collecte de logs avec PHP][12].

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```php
try {
    // ...
} catch (\Exception $e) {
    $logger->error('An error occurred', [
        'error.message' => $e->getMessage(),
        'error.kind' => get_class($e),
        'error.stack' => $e->getTraceAsString(),
    ]);
}
```

### Python

#### Journalisation

Si vous n'avez pas configuré la collecte de logs pour Python, consultez la [documentation dédiée à la collecte de logs avec Python][6]. Assurez-vous que vos logs portent le tag `source:python`.

Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

```python
try:
  // ...
except:
  logging.exception('an exception occurred')
```

### Ruby on Rails

#### Formateur de logger personnalisé

Si vous n'avez pas configuré la collecte de logs pour Ruby on Rails, consultez la [documentation dédiée à la collecte de logs avec Ruby on Rails][7].

Pour logger une erreur manuellement, créez un formateur à l'aide de JSON et associez les valeurs de l'exception aux champs appropriés :

```ruby
require 'json'
require 'logger'

class JsonWithErrorFieldFormatter < ::Logger::Formatter
    def call(severity, datetime, progname, message)
        log = {
            timestamp: "#{datetime.to_s}",
            level: severity,
        }

        if message.is_a?(Hash)
            log = log.merge(message)
        elsif message.is_a?(Exception)
            log['message'] = message.inspect
            log['error'] = {
                kind: message.class,
                message: message.message,
                stack: message.backtrace.join("\n"),
            }
        else
            log['message'] = message.is_a?(String) ? message : message.inspect
        end

        JSON.dump(log) + "\n"
    end
end
```

Et utilisez-le dans votre logger :
```ruby
logger = Logger.new(STDOUT)
logger.formatter = JsonWithErrorFieldFormatter.new
```

Si vous utilisez **Lograge**, vous pouvez également le configurer pour qu'il envoie des logs d'erreurs formatés :
``` ruby
Rails.application.configure do
    jsonLogger = Logger.new(STDOUT) # STDOUT ou fichier en fonction de la configuration de votre Agent
    jsonLogger.formatter = JsonWithErrorFieldFormatter.new

    # Le remplacement de Rails entraîne celui du logger TaggedLogging par un nouveau avec le formateur json par défaut.
    # TaggedLogging n'est pas compatible avec des messages complexes au format json
    config.logger = jsonLogger

    # Config Lograge
    config.lograge.enabled = true
    config.lograge.formatter = Lograge::Formatters::Raw.new

    # Désactive la coloration du log
    config.colorize_logging = false

    # Configurer le logging d'exceptions dans les champs appropriés
    config.lograge.custom_options = lambda do |event|
        if event.payload[:exception_object]
            return {
                level: 'ERROR',
                message: event.payload[:exception_object].inspect,
                error: {
                    kind: event.payload[:exception_object].class,
                    message: event.payload[:exception_object].message,
                    stack: event.payload[:exception_object].backtrace.join("\n")
                }
            }
        end
    end
end
```
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: https://app.datadoghq.com/logs/onboarding/client
[3]: /fr/logs/log_collection/go/
[4]: /fr/logs/log_collection/java/?tab=log4j
[5]: /fr/logs/log_collection/nodejs/?tab=winston30
[6]: /fr/logs/log_collection/python/?tab=jsonlogformatter
[7]: /fr/logs/log_collection/ruby/
[8]: /fr/logs/log_configuration/processors/?tab=ui#remapper
[9]: https://app.datadoghq.com/source-code/setup/apm
[10]: /fr/logs/log_collection/
[11]: /fr/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /fr/logs/log_collection/php/