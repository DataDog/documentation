---
aliases:
- /fr/logs/log_collection/nxlog
categories:
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/sinatra.md
description: Recueillez des logs d'application Sinatra.
has_logo: true
integration_id: sinatra
integration_title: Sinatra
is_public: true
custom_kind: integration
name: Sinatra
public_title: Intégration Datadog/Sinatra
short_description: Recueillez des logs d'application Sinatra.
supported_os:
- linux
- mac_os
- windows
title: Sinatra
---

## Présentation

Cette intégration vous permet de recueillir les logs d'accès Web pour vos applications [Sinatra][1] afin de surveiller les éléments suivants :

- Les logs d'erreurs (codes 4xx, codes 5xx)
- Le délai de réponse de pages Web
- Le nombre de requêtes
- Le nombre d'octets échangés

## Configuration

### Installation

[Installez l'Agent][2] sur l'instance qui exécute votre application Sinatra.

### Configuration

Par défaut, les [logs Sinatra][3] sont envoyés à stdout. Datadog recommande d'utiliser le [Common Logger][5] [Rack][4] afin de générer les logs dans un fichier et dans la console.

Voici un exemple de configuration permettant de générer les logs dans un fichier et dans la console. Ces lignes peuvent être ajoutées au fichier de configuration de Rack (`config.ru`) ou au bloc de configuration de votre application Sinatra.

```ruby
require 'sinatra'

configure do
  # l'enregistrement des logs est activé par défaut dans les applications classiques,
  # `enable :logging` n'est donc pas nécessaire
  file = File.new("/var/log/sinatra/access.log", 'a+')
  file.sync = true
  use Rack::CommonLogger, file
end

get '/' do
  'Hello World'
end
```

Ce logger utilise le format Apache Access commun et génère des logs au format suivant :

```text
127.0.0.1 - - [15/Jul/2018:17:41:40 +0000] "GET /uptime_status HTTP/1.1" 200 34 0.0004
127.0.0.1 - - [15/Jul/2018 23:40:31] "GET /uptime_status HTTP/1.1" 200 6997 1.8096
```

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `sinatra.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos logs d'application Sinatra :

    ```yaml
    logs:
      - type: file
        path: /var/log/sinatra/access.log
        source: sinatra
        service: webapp
    ```

      Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][7].

[1]: http://sinatrarb.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: http://sinatrarb.com/intro.html#Logging
[4]: http://rack.github.io
[5]: https://www.rubydoc.info/github/rack/rack/Rack/CommonLogger
[6]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: /fr/agent/guide/agent-commands/#restart-the-agent