---
title: Agent Log collection
kind: documentation
---

The Datadog Agent v6 can collect logs from files or the network (TCP or UDP) and forward them to Datadog. To configure this, create a new repository and yaml file named after your log source  in the Agent's **conf.d** directory ( `conf.d/python.d/conf.yaml` for python logs, ...) and set these options:

* `type` : (mandatory) type of log input source (**tcp** / **udp** / **file**)
* `port` / `path` : (mandatory) Set `port` if `type` is **tcp** or **udp**. Set `path` if `type` is **file**.
* `service` : (mandatory) name of the service owning the log
* `source` : (mandatory) attribute that defines which integration is sending the logs. "If the logs do not come from an existing integration then this field may include a custom source name. But we recommend matching this value to the namespace of any related [custom metrics](/getting_started/custom_metrics/) you are collecting, e.g, `myapp` from `myapp.request.count`)"
* `sourcecategory` : (optional) Multiple value attribute. Can be used to refine the source attribtue. Example: source:mongodb, sourcecategory:db_slow_logs
* `tags`: (optional) add tags to each log collected.

## Tail existing files
Set `type` to **file** then specify the absolute `path` to the log file you want to tail.

Example: 
To gather python applications stored in **/var/log/myapp1.log** and **/var/log/python.log** create a `python.d/conf.yaml` file as follows:

Note that for the yaml file to be considered valid by the agent, they must include an "init_config" section and have at least one "instance" defined as shown below:

```yaml
init_config:
instances:

##Log section
logs:

  - type: file
    path: /var/log/myapp1.log
    service: myapp1
    source: python
    sourcecategory: sourcecode
    tags: env:prod

  - type: file
    path: /var/log/python.log
    service: myapplication
    source: python
    sourcecategory: sourcecode
```
* [Restart your agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent)

## Stream logs through TCP/UDP
Set `type` to **tcp** or **udp** depending of your protocol then specify the `port` of your incoming connection.

Example:
If your PHP application does not log to a file, but instead forwards its logs via TCP, create a configuration file that specifies the port to receive as in the example below:

```yaml
init_config:
instances:

##Log section
logs:
  - type: tcp
    port: 10518
    service: webapp
    source: php
    sourcecategory: front

```
* [Restart your agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent)

## Advanced log collection functions

### Filter logs

All logs are not equal and you may want to send only a specific subset of logs to Datadog.  
To achieve this use the `log_processing_rules` parameter in your configuration file with the **exclude_at_match** or **include_at_match** `type`.

* **exclude_at_match**: If the pattern is contained in the message the log is excluded, and not sent to Datadog.
  Example: Filtering out logs that contain a Datadog email

```yaml
init_config:
instances:

logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

* **include_at_match**: Only log with a message that includes the pattern are sent to Datadog.
  Example: Sending only logs that contain a Datadog email

```yaml
init_config:
instances:

logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```


### Scrub sensitive data in your logs

If your logs contain sensitive information that you wish to redact, configure the Datadog Agent to scrub sensitive sequences by using the `log_processing_rules` parameter in your configuration file with the **mask_sequences** `type`.

This replaces all matched groups with `replace_placeholder` parameter value.
Example: Redact credit card numbers

```yaml
init_config:
instances:

logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        ##One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

### Multi-line aggregation

If your logs are not sent in JSON and you want to aggregate several lines into one single entry, configure the Datadog Agent to detect a new log using a specific regex pattern instead of having one log per line.  

This is accomplished by using the `log_processing_rules` parameter in your configuration file with the **multi_line** `type`.

This aggregates all lines into one single entry until the given pattern is detected again. This is especially useful for database logs and stack traces.
Example: Every java log line starts with a timestamp with `YYYY-dd-mm` format. The below lines including a stack trace would be sent as two logs.

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz

```

To achieve this, you need to use the following `log_processing_rules`:

```yaml
init_config:
instances:

logs:
 - type: file
   path: /var/log/pg_log.log
   service: database
   source: postgresql
   log_processing_rules:
      - type: multi_line
        name: new_log_start_with_date
        pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

More examples:

{{% table responsive="true" %}}
|**Raw string** | **Pattern** |
|:---|:----|
|14:20:15| `\d{2}:\d{2}:\d{2}` |
|11/10/2014| `\d{2}\/\d{2}\/\d{4}`|
|Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}` |
{{% /table %}}


### Tail multiple directories or whole directories by using wildcards

If your log files are labeled by date or all stored in the same directory, configure your Datadog Agent to monitor them all and automatically detect new ones by using wildcards in the `path` attribute.

* Using `path: /var/log/myapp/*.log`:
  * Matches all `.log` file contained in the `/var/log/myapp/` directory. 
  * Doesn't match `/var/log/myapp/myapp.conf`.

* Using `path: /var/log/myapp/*/*.log`:
  * Matches `/var/log/myapp/log/myfile.log`.
  * Matches `/var/log/myapp/errorLog/myerrorfile.log` 
  * Doesn't match `/var/log/myapp/mylogfile.log`.

Configuration example:

```yaml
init_config:
instances:

logs:
 - type: file
   path: /var/log/myapp/*.log
   service: mywebapp
   source: go
```

**Note**: that the agent requires the read and execute permission (5) on the directory to be able to list all the available files in it.