---
aliases:
- /fr/logs/log_collection/rsyslog
categories:
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md
description: Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs
  et de vos services.
doc_link: /integrations/rsyslog/
has_logo: true
integration_id: rsyslog
integration_title: rsyslog
is_public: true
custom_kind: integration
name: rsyslog
public_title: Intégration Datadog/Rsyslog
short_description: Configurez Rsyslog pour rassembler les logs de votre host, de vos
  conteneurs et de vos services.
supported_os:
- linux
title: Rsyslog
---

## Présentation

Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs et de vos services.

## Configuration

### Collecte de logs

#### Rsyslog version >= 8

{{< tabs >}}

{{% tab "Ubuntu et Debian" %}}
1. Activez le module `imfile` pour surveiller des fichiers de log spécifiques. Pour ajouter le module `imfile` module, ajoutez la ligne suivante dans votre fichier `rsyslog.conf` :

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.


3. Dans `/etc/rsyslog.d/datadog.conf`, ajoutez la configuration suivante. Chaque fichier de log à surveiller doit être spécifié sur une ligne `input` séparée :

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. Associez vos logs aux tags et aux métriques du host.

   Pour vous assurer que vos logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce qu'il corresponde au hostname de vos métriques Datadog.
   - Si vous avez spécifié un hostname dans `datadog.conf` ou `datadog.yaml`, remplacez la valeur `%HOSTNAME%` dans `rsyslog.conf` de façon à ce qu'elle corresponde à votre hostname.
   - Si vous n'avez défini aucun hostname dans `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier.

6. Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source des logs.
   - Si vous [transférez vos logs à l'Agent Datadog][1], vous pouvez définir la source dans le fichier de configuration de l'Agent.
   - Si vous ne transférez pas vos logs à l'Agent Datadog, créez un fichier de configuration séparé pour chaque source dans `/etc/rsyslog.d/`.

     Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     Vous pouvez ajouter des tags personnalisés avec l'attribut `ddtags` :

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité. Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais :

   1. Ajoutez les lignes suivantes dans votre fichier de configuration de Rsyslog :

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```

{{< site-region region="us">}}
8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :
   1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```
   2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}
{{< site-region region="eu" >}}

8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :
   1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```

   2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

[1]: /fr/agent/logs/
{{< /tabs >}}

{{% tab "Amazon Linux, CentOS et Red Hat" %}}
1. Activez le module `imfile` pour surveiller des fichiers de log spécifiques. Pour ajouter le module `imfile` module, ajoutez la ligne suivante dans votre fichier `rsyslog.conf` :

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.

3. Dans `/etc/rsyslog.d/datadog.conf`, ajoutez la configuration suivante. Chaque fichier de log à surveiller doit être spécifié sur une ligne `input` séparée :

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. Associez vos logs aux tags et aux métriques du host :

   Pour vous assurer que vos logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce qu'il corresponde au hostname de vos métriques Datadog.
   - Si vous avez spécifié un hostname dans `datadog.conf` ou `datadog.yaml`, remplacez la valeur `%HOSTNAME%` dans `rsyslog.conf` de façon à ce qu'elle corresponde à votre hostname.
   - Si vous n'avez défini aucun hostname dans `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier.

6. Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source des logs. 
   - Si vous [transférez vos logs à l'Agent Datadog][1], vous pouvez définir la source dans le fichier de configuration de l'Agent.
   - Si vous ne transférez pas vos logs à l'Agent Datadog, créez un fichier de configuration séparé pour chaque source dans `/etc/rsyslog.d/` :

     Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     Vous pouvez ajouter des tags personnalisés avec l'attribut `ddtags` :

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité. Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais :

   1. Ajoutez les deux lignes suivantes dans votre fichier de configuration de Rsyslog :

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```

{{< site-region region="us">}}
8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :
   1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```
   2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

{{< site-region region="eu" >}}

8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog.
   1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```

   2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

[1]: /fr/agent/logs/
{{< /tabs >}}

{{% tab "Fedora" %}}
1. Activez le module `imfile` pour surveiller des fichiers de log spécifiques. Pour ajouter le module `imfile` module, ajoutez la ligne suivante dans votre fichier `rsyslog.conf` :

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.


3. Dans `/etc/rsyslog.d/datadog.conf`, ajoutez la configuration suivante. Chaque fichier de log à surveiller doit être spécifié sur une ligne `input` séparée :

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. Associez vos logs aux tags et aux métriques du host :

   Pour vous assurer que vos logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce qu'il corresponde au hostname de vos métriques Datadog.
   - Si vous avez spécifié un hostname dans `datadog.conf` ou `datadog.yaml`, remplacez la valeur `%HOSTNAME%` dans `rsyslog.conf` de façon à ce qu'elle corresponde à votre hostname.
   - Si vous n'avez défini aucun hostname dans `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier.

6. Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source des logs. 
   - Si vous [transférez vos logs à l'Agent Datadog][1], vous pouvez définir la source dans le fichier de configuration de l'Agent.
   - Si vous ne transférez pas vos logs à l'Agent Datadog, créez un fichier de configuration séparé pour chaque source dans `/etc/rsyslog.d/` :

     Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     Vous pouvez ajouter des tags personnalisés avec l'attribut `ddtags` :

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité. Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais :

   1. Ajoutez les deux lignes suivantes dans votre fichier de configuration de Rsyslog :

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```

{{< site-region region="us">}}
8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :
   1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```
   2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

{{< site-region region="eu" >}}

8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :
   1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```

   2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

[1]: /fr/agent/logs/
{{< /tabs >}}

{{< /tabs >}}
#### Rsyslog version < 8

{{< tabs >}}

{{% tab "Ubuntu et Debian" %}}
1. Activez le module `imfile` pour surveiller des fichiers de log spécifiques. Pour ajouter le module `imfile` module, ajoutez la ligne suivante dans votre fichier `rsyslog.conf` :

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.

3. Dans `/etc/rsyslog.d/datadog.conf`, ajoutez la configuration suivante. Chaque fichier de log à surveiller doit être spécifié sur un paragraphe `Input` séparé :

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.

    ```shell
    sudo systemctl restart rsyslog
    ```

5. Associez vos logs aux tags et aux métriques du host :

   Pour vous assurer que vos logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce qu'il corresponde au hostname de vos métriques Datadog.

   - Si vous avez spécifié un hostname dans `datadog.conf` ou `datadog.yaml`, remplacez la valeur `%HOSTNAME%` dans `rsyslog.conf` de façon à ce qu'elle corresponde à votre hostname.
   - Si vous n'avez défini aucun hostname dans `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier.

6. Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source des logs.
   - Si vous [transférez vos logs à l'Agent Datadog][1], vous pouvez définir la source dans le fichier de configuration de l'Agent.
   - Si vous ne transférez pas vos logs à l'Agent Datadog, créez un fichier de configuration séparé pour chaque source dans `/etc/rsyslog.d/` :

   Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
   ```

   Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
   ```

7. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité. Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais :

   1. Ajoutez les lignes suivantes dans votre configuration de Rsyslog :

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```

{{< site-region region="us">}}
8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog.

    1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :

        ```conf
        #Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

{{< site-region region="eu" >}}

8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :

    1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

[1]: /fr/agent/logs/
{{< /tabs >}}

{{% tab "Amazon Linux, CentOS et Red Hat" %}}
1. Activez le module `imfile` pour surveiller des fichiers de log spécifiques. Pour ajouter le module `imfile` module, ajoutez la ligne suivante dans votre fichier `rsyslog.conf` :

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.

3. Dans `/etc/rsyslog.d/datadog.conf`, ajoutez la configuration suivante. Chaque fichier de log à surveiller doit être spécifié sur un paragraphe `Input` séparé :

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.

    ```shell
    sudo systemctl restart rsyslog
    ```

5. Associez vos logs aux tags et aux métriques du host/

   Pour vous assurer que vos logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce qu'il corresponde au hostname de vos métriques Datadog.

   - Si vous avez spécifié un hostname dans `datadog.conf` ou `datadog.yaml`, remplacez la valeur `%HOSTNAME%` dans `rsyslog.conf` de façon à ce qu'elle corresponde à votre hostname.
   - Si vous n'avez défini aucun hostname dans `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier.

6. Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source des logs.
   - Si vous [transférez vos logs à l'Agent Datadog][1], vous pouvez définir la source dans le fichier de configuration de l'Agent.
   - Si vous ne transférez pas vos logs à l'Agent Datadog, créez un fichier de configuration séparé pour chaque source dans `/etc/rsyslog.d/` :

   Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
   ```

   Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
   ```

7. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité. Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais :

   1. Ajoutez les deux lignes suivantes dans votre configuration de Rsyslog :

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```

{{< site-region region="us">}}
8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :

    1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :

        ```shell
        sudo yum install rsyslog-gnutls ca-certificates
        ```

    2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :

        ```conf
        #Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

{{< site-region region="eu" >}}
8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :

    1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :

        ```shell
        sudo yum install rsyslog-gnutls ca-certificates
        ```

    2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

[1]: /fr/agent/logs/
{{< /tabs >}}

{{% tab "Fedora" %}}
1. Activez le module `imfile` pour surveiller des fichiers de log spécifiques. Pour ajouter le module `imfile` module, ajoutez la ligne suivante dans votre fichier `rsyslog.conf` :

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.

3. Dans `/etc/rsyslog.d/datadog.conf`, ajoutez la configuration suivante. Chaque fichier de log à surveiller doit être spécifié sur un paragraphe `Input` séparé :

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.

    ```shell
    sudo systemctl restart rsyslog
    ```

5. Associez vos logs aux tags et aux métriques du host/

   Pour vous assurer que vos logs sont associés aux métriques et aux tags de ce host dans votre compte Datadog, définissez le `HOSTNAME` dans votre fichier `rsyslog.conf` de façon à ce qu'il corresponde au hostname de vos métriques Datadog.

   - Si vous avez spécifié un hostname dans `datadog.conf` ou `datadog.yaml`, remplacez la valeur `%HOSTNAME%` dans `rsyslog.conf` de façon à ce qu'elle corresponde à votre hostname.
   - Si vous n'avez défini aucun hostname dans `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier.

6. Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source des logs.
   - Si vous [transférez vos logs à l'Agent Datadog][1], vous pouvez définir la source dans le fichier de configuration de l'Agent.
   - Si vous ne transférez pas vos logs à l'Agent Datadog, créez un fichier de configuration séparé pour chaque source dans `/etc/rsyslog.d/` :

   Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
   ```

   Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
   ```

7. (Facultatif) Datadog met fin aux connexions après une certaine période d'inactivité. Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais :

   1. Ajoutez les deux lignes suivantes dans votre configuration de Rsyslog :

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```

{{< site-region region="us">}}
8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :

    1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :

        ```shell
        sudo dnf install rsyslog-gnutls ca-certificates
        ```

    2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :

        ```conf
        #Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

{{< site-region region="eu" >}}

8. (Facultatif) Ajoutez le chiffrement TLS aux logs envoyés de Rsyslog vers votre compte Datadog :

    1. Installez les packages `rsyslog-gnutls` et `ca-certificates` :

        ```shell
        sudo dnf install rsyslog-gnutls ca-certificates
        ```

    2. Ajoutez la ligne suivante tout en bas de votre fichier `/etc/rsyslog.d/datadog.conf` :

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```
   3. Redémarrez le service Rsyslog :

      ```shell
      sudo systemctl restart rsyslog
      ```
{{< /site-region >}}

[1]: /fr/agent/logs/
{{< /tabs >}}

{{< /tabs >}}

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].


[1]: /fr/help/