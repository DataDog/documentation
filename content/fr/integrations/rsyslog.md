---
title: Rsyslog
name: rsyslog
kind: integration
description: 'Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
short_description: 'Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
categories:
  - log collection
doc_link: /integrations/rsyslog/
aliases:
  - /fr/logs/log_collection/rsyslog
has_logo: true
integration_title: rsyslog
is_public: true
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md'
public_title: Intégration Datadog/Rsyslog
supported_os:
  - linux
---
## Présentation

Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs et de vos services.

## Configuration

### Collecte de logs

#### Rsyslog version >= 8

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. (Facultatif) Activez le module de surveillance de fichiers Rsyslog. Si vous souhaitez surveiller des fichiers de log spécifiques, vous devez activer le module imfile en ajoutant ce qui suit à votre fichier `rsyslog.conf` :

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.
3. Définissez les fichiers de log à surveiller et configurez l'endpoint de destination. Ajoutez ce qui suit au fichier `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    ruleset(name="infiles") {
        action(type="omfwd" target="intake.logs.datadoghq.com" protocol="tcp" port="10514" template="DatadogFormat")
    }
    ```

4. (Facultatif) Chiffrement TLS :
    Si vous souhaitez ajouter le chiffrement TLS lors de l'envoi de logs directement de Rsyslog à votre compte Datadog, suivez les étapes ci-dessous.

    * Installez rsyslog-gnutls :

        ```
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    * Modifiez votre fichier `/etc/rsyslog.d/datadog.conf` de façon à ce qu'il se termine par le contenu suivant :

        ```conf
        ## Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
        }
        ```

5. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.

    ```
    sudo service rsyslog restart
    ```

6. Associez ces logs aux tags et aux métriques du host.
    Pour vous assurer que ces logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce qu'il corresponde au hostname de vos métriques Datadog.
    Si vous n'avez défini aucun hostname dans votre fichier de configuration pour les métriques, via `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier.
    Si vous avez spécifié un hostname personnalisé pour votre métrique, remplacez la valeur **%HOSTNAME%** dans le format afin que celle-ci corresponde au nom personnalisé.

7. Utilisez des intégrations Datadog.
    Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source de vos logs. La source peut être définie directement dans l'Agent si vous transférez vos logs à l'Agent Datadog.

    Le cas contraire, vous aurez besoin de spécifier un format spécifique pour chaque source de log, ce qui signifie que chaque source devra disposer de son propre fichier de configuration dans `/etc/rsyslog.d/`.

    Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité.
    Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais. Ajoutez les deux lignes de code suivantes dans votre configuration Rsyslog :

    ```
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    N'oubliez pas d'effectuer un redémarrage :

    ```
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

1. (Facultatif) Activez le module de surveillance de fichiers Rsyslog. Si vous souhaitez consulter ou surveiller des fichiers de log spécifiques, activez le module `imfile` en ajoutant ce qui suit à votre fichier `rsyslog.conf` :

    ```
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.
3. Définissez les fichiers de log à surveiller et configurez l'endpoint de destination. Ajoutez ce qui suit au fichier `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>" StateFile="<UNIQUE_FILE_ID>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    ruleset(name="infiles") {
         action(type="omfwd" target="tcp-intake.logs.datadoghq.eu" protocol="tcp" port="1883" template="DatadogFormat")
    }
    ```

4. (Facultatif) Chiffrement TLS :
    Si vous souhaitez ajouter le chiffrement TLS lors de l'envoi de logs directement de Rsyslog à votre compte Datadog, suivez les étapes ci-dessous.

    * Installez rsyslog-gnutls :

        ```
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    * Modifiez votre fichier `/etc/rsyslog.d/datadog.conf` de façon à ce qu'il se termine par le contenu suivant :

        ```conf
        ## Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat"           StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
        }
        ```

5. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement à votre compte Datadog.

    ```
    sudo service rsyslog restart
    ```

6. Associez ces logs aux tags et aux métriques du host.
    Pour vous assurer que ces logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le même `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce que sa valeur corresponde au hostname de vos métriques Datadog.
    **Remarque** : si vous n'avez défini aucun hostname dans votre fichier de configuration pour les métriques via `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier. Si vous avez spécifié un hostname personnalisé pour votre métrique, veillez à remplacer la valeur **%HOSTNAME%** dans le format afin que celle-ci corresponde au nom personnalisé.

7. Utilisez des intégrations Datadog.
    Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source de vos logs. La source peut être définie directement dans l'Agent si vous transférez vos logs à l'Agent Datadog.

    Sinon, vous aurez besoin de spécifier un format spécifique pour chaque source de log, ce qui signifie que chaque source devra avoir son propre fichier de configuration dans `/etc/rsyslog.d/`.

    Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité.
    Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais. Ajoutez les deux lignes de code suivantes dans votre configuration Rsyslog :

    ```
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    N'oubliez pas d'effectuer un redémarrage :

    ```
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{< /tabs >}}

#### Rsyslog version < 8

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. (Facultatif) Activez le module de surveillance de fichiers Rsyslog. Si vous souhaitez consulter ou surveiller des fichiers de log spécifiques, activez le module `imfile` en ajoutant ce qui suit à votre fichier `rsyslog.conf` :

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.
3. Définissez les fichiers de log à surveiller et configurez l'endpoint de destination. Ajoutez ce qui suit au fichier `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    *.* @@intake.logs.datadoghq.com:10514;DatadogFormat
    ```

4. (Facultatif) Chiffrement TLS :
    Si vous souhaitez ajouter le chiffrement TLS lors de l'envoi de logs directement de Rsyslog à votre compte Datadog, suivez les étapes ci-dessous.

    * Installez rsyslog-gnutls :

        ```
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    * Modifiez votre fichier `/etc/rsyslog.d/datadog.conf` de façon à ce qu'il se termine par le contenu suivant :

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```

5. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.
    ```
    sudo service rsyslog restart
    ```

6. Associez ces logs aux tags et aux métriques du host.
    Pour vous assurer que ces logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le même `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce que sa valeur corresponde au hostname de vos métriques Datadog.
    **Remarque** : si vous n'avez défini aucun hostname dans votre fichier de configuration pour les métriques via `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier. Si vous avez spécifié un hostname personnalisé pour votre métrique, veillez à remplacer la valeur **%HOSTNAME%** dans le format afin que celle-ci corresponde au nom personnalisé.

7. Utilisez des intégrations Datadog.
    Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source de vos logs. La source peut être définie directement dans l'Agent si vous transférez vos logs à l'Agent Datadog.

    Sinon, vous aurez besoin de spécifier un format spécifique pour chaque source de log, ce qui signifie que chaque source devra avoir son propre fichier de configuration dans `/etc/rsyslog.d/`.

    Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```
    Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité.
    Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais. Ajoutez les deux lignes de code suivantes dans votre configuration Rsyslog :

    ```
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    N'oubliez pas d'effectuer un redémarrage :

    ```
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

1. (Facultatif) Activez le module de surveillance de fichiers Rsyslog. Si vous souhaitez consulter ou surveiller des fichiers de log spécifiques, activez le module `imfile` en ajoutant ce qui suit à votre fichier `rsyslog.conf` :

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.
3. Définissez les fichiers de log à surveiller et configurez l'endpoint de destination. Ajoutez ce qui suit au fichier `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    *.* @@tcp-intake.logs.datadoghq.eu:1883;DatadogFormat
    ```

4. (Facultatif) Chiffrement TLS :
    Si vous souhaitez ajouter le chiffrement TLS lors de l'envoi de logs directement de Rsyslog à votre compte Datadog, suivez les étapes ci-dessous.

    * Installez rsyslog-gnutls :

        ```
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    * Modifiez votre fichier `/etc/rsyslog.d/datadog.conf` de façon à ce qu'il se termine par le contenu suivant :

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```

5. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.
    ```
    sudo service rsyslog restart
    ```

6. Associez ces logs aux tags et aux métriques du host.
    Pour vous assurer que ces logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le même `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce que sa valeur corresponde au hostname de vos métriques Datadog.
    **Remarque** : si vous n'avez défini aucun hostname dans votre fichier de configuration pour les métriques via `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier. Si vous avez spécifié un hostname personnalisé pour votre métrique, veillez à remplacer la valeur **%HOSTNAME%** dans le format afin que celle-ci corresponde au nom personnalisé.

7. Utilisez des intégrations Datadog.
    Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source de vos logs. La source peut être définie directement dans l'Agent si vous transférez vos logs à l'Agent Datadog.

    Sinon, vous aurez besoin de spécifier un format spécifique pour chaque source de log, ce qui signifie que chaque source devra avoir son propre fichier de configuration dans `/etc/rsyslog.d/`.

    Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité.
    Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais. Ajoutez les deux lignes de code suivantes dans votre configuration Rsyslog :

    ```
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    N'oubliez pas d'effectuer un redémarrage :

    ```
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{< /tabs >}}

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help
