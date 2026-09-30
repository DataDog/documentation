---
aliases:
- /fr/logs/log_collection/syslog_ng
categories:
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/syslog_ng.md
description: Configurez Syslog-ng pour rassembler les logs de votre host, de vos conteneurs
  et de vos services.
doc_link: /integrations/syslog_ng/
has_logo: true
integration_id: syslog_ng
integration_title: syslog_ng
is_public: true
custom_kind: integration
name: syslog_ng
public_title: Intégration Datadog/Syslog-ng
short_description: Configurez Syslog-ng pour rassembler les logs de votre host, de
  vos conteneurs et de vos services.
supported_os:
- linux
- windows
title: Syslog-ng
---

## Présentation

Configurez Syslog-ng pour rassembler les logs de votre host, de vos conteneurs et de vos services.

## Configuration

### Collecte de logs

1. Pour recueillir des logs système et des fichiers de log dans `/etc/syslog-ng/syslog-ng.conf`, assurez-vous que la source est correctement définie :

    ```conf
    source s_src {
    system();
    internal();

    };
    ```

    Si vous souhaitez surveiller des fichiers, ajoutez la source suivante :

    ```conf
    #########################
    # Sources
    #########################

    ...

    source s_files {
    file("path/to/your/file1.log",flags(no-parse),follow_freq(1),program_override("<program_name_file1>"));
    file("path/to/your/file2.log",flags(no-parse),follow_freq(1),program_override("<program_name_file2>"));

    };
    ```

2. Définissez le bon format de log :

    ```conf
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform:
    destination d_datadog {
      http(
          url("https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?ddsource=<SOURCE>&ddtags=<TAG_1:VALUE_1,TAG_2:VALUE_2>")
          method("POST")
          headers("Content-Type: application/json", "Accept: application/json", "DD-API-KEY: <DATADOG_API_KEY>")
          body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
      );
    };
    ```

3. Définissez la sortie dans la section Log Path :

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. Redémarrez Syslog-ng.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
[2]: /fr/help/