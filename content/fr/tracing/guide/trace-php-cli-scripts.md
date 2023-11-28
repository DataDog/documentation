---
further_reading:
- link: /tracing/trace_collection/dd_libraries/php/
  tags: Documentation
  text: Configurer la collecte de traces PHP
- link: /tracing/troubleshooting/
  tags: Documentation
  text: Dépannage
kind: guide
title: Tracer des scripts CLI PHP
---

## Scripts CLI à exécution courte

Un script à exécution courte s'exécute généralement en quelques secondes ou minutes. Si le script fonctionne correctement, une trace est reçue à chaque exécution.

Par défaut, le tracing est désactivé pour les scripts PHP qui s'exécutent depuis la ligne de commande. Activez-le en définissant `DD_TRACE_CLI_ENABLED` sur `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# (Facultatif) Définir le host et le port de l'Agent s'ils sont différents de localhost et 8126, respectivement
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

Par exemple, imaginons que le `script.php` suivant exécute une requête cURL :

```php
<?php
sleep(1);
$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);
sleep(1);
```

Exécutez le script :

```
$ php script.php
```

Une fois le script exécuté, la trace est générée et envoyée au backend Datadog à la fin du script.

{{< img src="tracing/guide/trace_php_cli_scripts/short-running-cli.jpg" alt="Trace d'un script CLI PHP à exécution courte" >}}

## Scripts CLI à exécution longue

Un script à exécution longue s'exécute pendant des heures ou des jours. Ces scripts exécutent généralement une tâche spécifique de façon répétitive, par exemple le traitement de messages entrants ou de nouvelles lignes ajoutées à une table dans une base de données. Une trace est générée pour chaque unité de travail, par exemple pour chaque message traité, ce qui correspond au comportement attendu.

Par défaut, le tracing est désactivé pour les scripts PHP qui s'exécutent depuis la ligne de commande. Activez-le en définissant `DD_TRACE_CLI_ENABLED` sur `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# Ces deux paramètres permettent d'envoyer des traces pour chaque unité de travail quand la méthode d'exécution se termine.
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1
# (Facultatif) Définir les paramètres de nom de service, d'environnement, etc
$ export DD_SERVICE=my_service
# (Facultatif) Définir le host et le port de l'Agent s'ils sont différents de localhost et 8126, respectivement
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

Par exemple, prenons le script `long_running.php` suivant :

```php
<?php
/* Code spécifique à Datadog. Peut être placé dans un fichier séparé. Obligatoire dans ce script */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;
trace_function('processMessage', function(SpanData $span, $args) {
    // Accéder aux arguments de la méthode et modifier le nom de la ressource
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});
trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // Par défaut, le nom de la ressource correspond au nom complet de la méthode.
});
trace_method('ProcessingStage2', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    $span->resource = 'message:' . $args[0]->id;
});
/* Fin du code Datadog */
/** Représente un message qui sera reçu et traité */
class Message
{
    public $id;
    public $content;
    public function __construct($id, $content)
    {
        $this->id   = $id;
        $this->content = $content;
    }
}
/** Une étape de traitement parmi d'autres, chacune devant avoir une span */
class ProcessingStage1
{
    public function process(Message $message)
    {
        sleep(1);
        $ch = curl_init('https://httpbin.org/delay/1');
        curl_exec($ch);
    }
}
/** Une étape de traitement parmi d'autres, chacune devant avoir une span */
class ProcessingStage2
{
    public function process(Message $message)
    {
        sleep(1);
    }
}
/** Dans une application réelle, permet de lire les nouveaux messages à partir d'une source, telle qu'une file d'attente */
function waitForNewMessages()
{
    return [
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
    ];
}
/** Cette fonction correspond à l'unité de travail. Une trace est générée à chaque fois qu'elle est exécutée */
function processMessage(Message $m, array $processors)
{
    foreach ($processors as $processor) {
        $processor->process($m);
        usleep(100000);
    }
}

$processors = [new ProcessingStage1(), new ProcessingStage2()];

/** Une boucle infinie qui attend les nouveaux messages */
while (true) {
    $messages = waitForNewMessages();
    foreach ($messages as $message) {
        processMessage($message, $processors);
    }
}
```

Exécutez le script :

```
$ php long_running.php
```

Une fois le script exécuté, une trace est générée et envoyée au backend Datadog chaque fois qu'un nouveau message est traité.

{{< img src="tracing/guide/trace_php_cli_scripts/long-running-cli.jpg" alt="Trace d'un script CLI PHP à exécution longue" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}