---
title: Syslog-ng
name: syslog_ng
kind: integration
description: 'Configurez Syslog-ng pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
short_description: 'Configurez Syslog-ng pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
categories:
  - log collection
doc_link: /integrations/syslog_ng/
aliases:
  - /fr/logs/log_collection/syslog_ng
has_logo: true
integration_title: syslog_ng
is_public: true
public_title: Intégration Datadog/Syslog-ng
supported_os:
  - linux
  - windows
---
## Présentation

Configurez Syslog-ng pour rassembler les logs de votre host, de vos conteneurs et de vos services.

## Implémentation
### Collecte de logs

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. Pour recueillir des logs système et des fichiers de log dans `/etc/syslog-ng/syslog-ng.conf`, assurez-vous que la source est correctement définie :
    ```
    source s_src {
    system();
    internal();

    };
    ```
    Si vous souhaitez surveiller des fichiers, ajoutez la source suivante :
    ```
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
    ```
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform:
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("intake.logs.datadoghq.com" port(10514) template(DatadogFormat)); };
    ```

3. Définissez la sortie dans la section Log Path :
    ```
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. Chiffrement TLS (facultatif) :

    * Téléchargez le certificat d'autorité de certification :

     ```
    sudo apt-get install ca-certificates
     ```

    * Modifiez la destination comme suit :

        ```
        destination d_datadog { tcp("intake.logs.datadoghq.com" port(10516)     tls(peer-verify(required-untrusted)) template(DatadogFormat)); };
        ```

    Pour en savoir plus sur les paramètres et les fonctionnalités de TLS pour Syslog-ng, consultez la [documentation officielle][2] (en anglais).

5. Redémarrez Syslog-ng.


[1]: /resources/crt/FULL_intake.logs.datadoghq.com.crt
[2]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

1. Pour recueillir des logs système et des fichiers de log dans `/etc/syslog-ng/syslog-ng.conf`, assurez-vous que la source est correctement définie :
    ```
    source s_src {
    system();
    internal();

    };
    ```
    Si vous souhaitez surveiller des fichiers, ajoutez la source suivante :
    ```
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
    ```
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(1883) template(DatadogFormat)); };
    ```

3. Définissez la sortie dans la section Log Path :
    ```
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. Chiffrement TLS (facultatif) :

    * Téléchargez le certificat d'autorité de certification :

     ```
    sudo apt-get install ca-certificates
      ```

    * Modifiez la destination comme suit :

        ```
        destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(443)     tls(peer-verify(required-untrusted)) template(DatadogFormat)); };
        ```

    Pour en savoir plus sur les paramètres et les fonctionnalités de TLS pour Syslog-ng, consultez la [documentation officielle][2] (en anglais).

5. Redémarrez Syslog-ng.


[2]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{< /tabs >}}

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][1].


[1]: /fr/help