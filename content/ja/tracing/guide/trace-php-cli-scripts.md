---
title: Tracing PHP CLI Scripts
kind: guide
further_reading:
- link: /tracing/trace_collection/dd_libraries/php/
  tag: ドキュメント
  text: Set up PHP trace collection
- link: /tracing/troubleshooting/
  tag: ドキュメント
  text: Troubleshooting
---

## Short-running CLI scripts

A short-running script typically runs for a few seconds or minutes. The expected behavior is to receive one trace each time the script is executed.

By default, tracing is disabled for PHP scripts that run from the command line. Opt in by setting `DD_TRACE_CLI_ENABLED` to `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# Optionally, set the agent host and port if different from localhost and 8126, respectively
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

For example, assume the following `script.php` runs a cURL request:

```php
<?php
sleep(1);
$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);
sleep(1);
```

Run the script:

```
$ php script.php
```

Once the script is run, the trace is generated and sent to the Datadog backend when the script terminates.

{{< img src="tracing/guide/trace_php_cli_scripts/short-running-cli.jpg" alt="Trace for a short running PHP CLI script" >}}

## Long-running CLI scripts

A long-running script runs for hours or days. Typically, such scripts repetitively execute a specific task, for example processing new incoming messages or new lines added to a table in a database. The expected behavior is that one trace is generated for each "unit of work", for example the processing of a message.

By default, tracing is disabled for PHP scripts that run from the command line. Opt in by setting `DD_TRACE_CLI_ENABLED` to `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# With this pair of settings, traces for each "unit of work" is sent as soon as the method execution terminates.
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1
# Optionally, set service name, env, etc...
$ export DD_SERVICE=my_service
# Optionally, set the agent host and port if different from localhost and 8126, respectively
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

For example, assume the following `long_running.php` script:

```php
<?php
/* Datadog specific code. It can be in a separate files and required in this script */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;
trace_function('processMessage', function(SpanData $span, $args) {
    // Access method arguments and change resource name
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});
trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // Resource name defaults to the fully qualified method name.
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

Run the script:

```
$ php long_running.php
```

Once the script is run, one trace is generated and sent to the Datadog backend every time a new message is processed.

{{< img src="tracing/guide/trace_php_cli_scripts/long-running-cli.jpg" alt="Trace for a long running PHP CLI script" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

