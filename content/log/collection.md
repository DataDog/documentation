---
title: Collection
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---
### Integrations

If you enable an integration there is nothing more to do to start collecting logs for that integration. 

Your Datadog agent will automatically look for the default log location of the corresponding technology and start collecting them.

However if you changed the log location or if you want to override some of our default parameters, you can uncomment all the Log section in your configuration yaml file (i.e cannot override only one parameter). 

#### Nginx log collection configuration example

```
init_config:
instances:

#Log section
logs:
  - type: file:
    path: /var/log/access.log
    appname: nginx
    sourcetype: http_access, nginx
    tags:
      - env:prod
      - version:12.1


  - type: file
    file: /var/log/error.log
    appname: nginx
    sourcetype: http_error, nginx
    logset: devteam
    log_processing_rules:
      - type: include_at_match
        name: include_only_datadoghq_users
        pattern: 'User=\w+@datadoghq.com'
```


#### Java Log collection configuration example

```
init_config:
instances:
….
#Log section
logs:
    - type: tcp
      port: 10514
      appname: java
      sourcetype: java
```

### Custom Log file

You might also need to send custom logs that would not be part of an existing integration.

You need to edit a yaml file and to specify the file path, sourcetype tag, appname and optionally other parameters as described in the previous section.

Rename `custom-logs.yaml.example` in `custom-logs.yaml` and edit the desired parameters.
