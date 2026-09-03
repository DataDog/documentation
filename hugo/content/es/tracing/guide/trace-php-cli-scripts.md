---
further_reading:
- link: /tracing/trace_collection/dd_libraries/php/
  tag: Documentación
  text: Configurar la recopilación de trazas en PHP
- link: /tracing/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
title: Rastreo de scripts de CLI en PHP
---

## Scripts de CLI de ejecución rápida

Un script de ejecución rápida suele ejecutarse durante unos segundos o minutos. El comportamiento esperado es recibir una traza (trace) cada vez que se ejecuta el script.

Por defecto, el rastreo está desactivado para los scripts de PHP que se ejecutan desde la línea de comandos. Opta por esta opción estableciendo `DD_TRACE_CLI_ENABLED` en `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# Opcionalmente, establece el host de agent y el puerto si es diferente del host local y 8126, respectivamente
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

Por ejemplo, supongamos que el siguiente `script.php` ejecuta una solicitud cURL:

```php
<?php
sleep(1);
$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);
sleep(1);
```

Ejecuta el script:

```
$ php script.php
```

Una vez ejecutado el script, se genera la traza y se envía al backend de Datadog cuando finaliza el script.

{{< img src="tracing/guide/trace_php_cli_scripts/short-running-cli.jpg" alt="Traza de un script de CLI en PHP de corta ejecución" >}}

## Scripts de CLI de larga ejecución

Un script de larga ejecución se ejecuta durante horas o días. Típicamente, tales scripts ejecutan repetitivamente una tarea específica, por ejemplo procesar nuevos mensajes entrantes o nuevas líneas añadidas a una tabla en una base de datos. El comportamiento esperado es que se genere una traza por cada "unidad de trabajo", por ejemplo procesar un mensaje.

Por defecto, el rastreo está desactivado para los scripts de PHP que se ejecutan desde la línea de comandos. Opta por esta opción estableciendo `DD_TRACE_CLI_ENABLED` en `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# Con este par de ajustes, las trazas de cada unidad de trabajo se envían tan pronto como termina la ejecución del método.
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1
# Opcionalmente, establece nombre de servicio, env, etc...
$ export DD_SERVICE=my_service
# Opcionalmente, configura el host de agent y el puerto si difieron del host local y 8126, respectivamente
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

Por ejemplo, supongamos el siguiente script `long_running.php`:

```php
<?php
/* Datadog specific code. It can be in a separate files and required in this script */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;
trace_function('processMessage', function(SpanData $span, $args) {
    // Accede a argumentos de método y cambia el nombre de recurso
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});
trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // Nombre de recurso predeterminado para el nombre nombre de método completamente calificado.
});
trace_method('ProcessingStage2', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    $span->resource = 'message:' . $args[0]->id;
});
/* Enf of Datadog code */
/** Represents a message to be received and processed */
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
/** One of possibly many processing stages, each of which should have a Span */
class ProcessingStage1
{
    public function process(Message $message)
    {
        sleep(1);
        $ch = curl_init('https://httpbin.org/delay/1');
        curl_exec($ch);
    }
}
/** One of possibly many processing stages, each of which should have a Span */
class ProcessingStage2
{
    public function process(Message $message)
    {
        sleep(1);
    }
}
/** In a real world application, this will read new messages from a source, for example a queue */
function waitForNewMessages()
{
    return [
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
    ];
}
/** This function is the "unit of work", each execution of it will generate one single trace */
function processMessage(Message $m, array $processors)
{
    foreach ($processors as $processor) {
        $processor->process($m);
        usleep(100000);
    }
}
$processors = [new ProcessingStage1(), new ProcessingStage2()];
/** A loop that runs forever waiting for new messages */
while (true) {
    $messages = waitForNewMessages();
    foreach ($messages as $message) {
        processMessage($message, $processors);
    }
}
```

Ejecuta el script:

```
$ php long_running.php
```

Una vez ejecutado el script, se genera una traza que se envía al backend de Datadog cada vez que se procesa un nuevo mensaje.

{{< img src="tracing/guide/trace_php_cli_scripts/long-running-cli.jpg" alt="Traza para un script de CLI en PHP de larga ejecución" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}