---
title: Rsyslog
name: rsyslog
kind: integration
description: 'Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
short_description: 'Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
categories:
  - Collecte de logs
doc_link: /integrations/rsyslog/
aliases:
  - /fr/logs/log_collection/rsyslog
has_logo: true
integration_title: rsyslog
is_public: true
public_title: Intégration Datadog/Rsyslog
supported_os:
  - linux
---
## Présentation

Configurez Rsyslog pour rassembler les logs de votre host, de vos conteneurs et de vos services.

## Implémentation
### Collecte de logs

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. (Facultatif) Activez le module de surveillance de fichiers Rsyslog.
    Si vous souhaitez surveiller des fichiers de log spécifiques, vous devez activer le module imfile en ajoutant le bloc de code suivant à votre fichier `rsyslog.conf` :

    * **Rsyslog version < 8**
        ```
        $ModLoad imfile
        $InputFilePollInterval 10
        $PrivDropToGroup adm
        $WorkDirectory /var/spool/rsyslog
        ```

    * **Rsyslog version >= 8**
        ```
        module(load="imfile" PollingInterval="10") #needs to be done just once
        ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.
3. (Facultatif)  Définissez les fichiers à surveiller.
    Ajoutez le bloc de code suivant au fichier `/etc/rsyslog.d/datadog.conf`.
    * **Rsyslog version < 8**.

        ```
        # Input for FILE1
        $InputFileName /<PATH_TO_FILE1>
        $InputFileTag <APP_NAME_OF_FILE1>
        $InputFileStateFile <UNIQUE_FILE_ID>
        $InputFileSeverity info
        $InputRunFileMonitor
        ```
    * **Rsyslog version >= 8**

        ```
        # For each file to send
        input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>" StateFile="<UNIQUE_FILE_ID>")
        ```
4. Envoyez les logs à votre plateforme Datadog.
    Pour envoyer des logs à votre compte Datadog directement de Rsyslog par TCP, vous devez d'abord définir le format dans le fichier `/etc/rsyslog.d/datadog.conf` :

    ```
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

    Définissez ensuite l'endpoint :
    * **Rsyslog version < 8**

    ```
    *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
    ```
    * **Rsyslog version >= 8**

    ```
    ruleset(name="infiles") {
        action(type="omfwd" target="intake.logs.datadoghq.com" protocol="tcp" port="10516" template="DatadogFormat")
    }
    ```
    On suppose ici que le TLS est activé pour votre Rsyslog. Si ce n'est pas le cas, utilisez le port 10514 au lieu du port 10516.

    Pour envoyer des logs de Rsyslog à votre Agent de logs Datadog, vous pouvez également configurer votre dd-agent pour qu'il s'attende à recevoir des logs par UDP/TCP sur le port de votre choix en ajoutant le contenu suivant à la fin de votre fichier `/etc/rsyslog.d/datadog.conf` :
    ```
    $template DatadogFormat,"%msg%\n"
    *.* @@localhost:<PORT>;DatadogFormat  # @@ for TCP, @ for UDP
    ```

5. (Facultatif) Chiffrement TLS :
    Si vous souhaitez ajouter le chiffrement TLS lors de l'envoi de logs directement de Rsyslog à votre compte Datadog, suivez les étapes ci-dessous.

    * Installez rsyslog-gnutls :

        ```
        sudo apt-get install rsyslog-gnutls
        ```

    * Téléchargez la [clé publique pour le chiffrement TLS][1] pour les logs et enregistrez-la dans `/etc/ssl/certs/intake.logs.datadoghq.com.crt`. Sur certains systèmes, la chaîne de certificat complète peut être requise. Si c'est le cas, utilisez [cette clé publique][2] à la place.

    * Modifiez votre ficher `/etc/rsyslog.d/datadog.conf` pour qu'il se termine par le contenu suivant :

        ```
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/intake.logs.datadoghq.com.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```

6. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.

7. Associez ces logs aux tags et aux métriques de l'host.
    Pour vous assurer que ces logs sont associés aux métriques et aux tags du même host dans votre compte Datadog, il est important de définir le même HOSTNAME dans votre fichier `rsyslog.conf` pour que sa valeur corresponde au hostname de vos métriques Datadog.
    Notez que si vous n'avez défini aucun hostname dans votre fichier de configuration pour les métriques via `datadog.conf` ou datadog.yaml, vous n'avez rien à modifier.
    Si vous avez spécifié un hostname personnalisé pour votre métrique, veillez à remplacer la valeur **%HOSTNAME%** dans le format afin que celle-ci corresponde au nom personnalisé.

8. Utilisez les intégrations Datadog.
    Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source de vos logs. La source peut être définie directement dans l'Agent si vous transférez vos logs à l'Agent Datadog.

    Sinon, vous aurez besoin de spécifier un format spécifique pour chaque source de log, ce qui signifie que chaque source devra avoir son propre fichier de configuration dans `/etc/rsyslog.d/`.

    Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

    ```
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```
    Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

    ```
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:test,<KEY:VALUE>\"] %msg%\n"
    ```

9. (Facultatif) Datadog met fin aux connexions inactives après une certaine période d'inactivité.
    Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais. Ajoutez les deux lignes de code suivantes dans votre configuration Rsyslog :
    ```
    $ModLoad immark
    $MarkMessagePeriod 20
    ```
    Et n'oubliez pas de redémarrer :
    ```
    sudo service rsyslog restart
    ```


[1]: /resources/crt/intake.logs.datadoghq.com.crt
[2]: /resources/crt/FULL_intake.logs.datadoghq.com.crt
{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

1. (Facultatif) Activez le module de surveillance de fichiers Rsyslog.
    Si vous souhaitez surveiller des fichiers de log spécifiques, vous devez activer le module imfile en ajoutant le bloc de code suivant à votre fichier `rsyslog.conf` :

    * **Rsyslog version < 8**
        ```
        $ModLoad imfile
        $InputFilePollInterval 10
        $PrivDropToGroup adm
        $WorkDirectory /var/spool/rsyslog
        ```

    * **Rsyslog version >= 8**
        ```
        module(load="imfile" PollingInterval="10") #needs to be done just once
        ```

2. Créez un fichier `/etc/rsyslog.d/datadog.conf`.
3. (Facultatif)  Définissez les fichiers à surveiller.
   Ajoutez le bloc de code suivant au fichier `/etc/rsyslog.d/datadog.conf`.
    * **Rsyslog version < 8**.

        ```
        # Input for FILE1
        $InputFileName /<PATH_TO_FILE1>
        $InputFileTag <APP_NAME_OF_FILE1>
        $InputFileStateFile <UNIQUE_FILE_ID>
        $InputFileSeverity info
        $InputRunFileMonitor
        ```
    * **Rsyslog version >= 8**

        ```
        # For each file to send
        input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>" StateFile="<UNIQUE_FILE_ID>")
        ```
4. Envoyez les logs à votre plateforme Datadog.
    Pour envoyer les logs à votre compte Datadog directement de Rsyslog par TCP, définissez d'abord le format dans le fichier `/etc/rsyslog.d/datadog.conf` :

    ```
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

   Définissez ensuite l'endpoint :
    * **Rsyslog version < 8**

    ```
    *.* @@tcp-intake.logs.datadoghq.eu:1883;DatadogFormat
    ```
    * **Rsyslog version >= 8**

    ```
    ruleset(name="infiles") {
        action(type="omfwd" target="tcp-intake.logs.datadoghq.eu" protocol="tcp" port="1883" template="DatadogFormat")
    }
    ```
    On suppose ici que le TLS est activé pour votre Rsyslog. Si ce n'est pas le cas, utilisez le port 10514 au lieu du port 10516.

    Pour envoyer des logs de Rsyslog à votre Agent de logs Datadog, vous pouvez également configurer votre `dd-agent` pour qu'il s'attende à recevoir des logs par UDP/TCP sur le port de votre choix en ajoutant le contenu suivant à la fin de votre fichier `/etc/rsyslog.d/datadog.conf` :
    ```
    $template DatadogFormat,"%msg%\n"
    *.* @@localhost:<PORT>;DatadogFormat  # @@ for TCP, @ for UDP
    ```

5. (Facultatif) Chiffrement TLS :
    Si vous souhaitez ajouter le chiffrement TLS lors de l'envoi de logs directement de Rsyslog à votre compte Datadog, suivez les étapes ci-dessous.

    * Installez rsyslog-gnutls :

        ```
        sudo apt-get install rsyslog-gnutls
        ```

    * Téléchargez la [clé publique pour le chiffrement TLS][1] pour les logs et enregistrez-la dans `/etc/ssl/certs/intake.logs.datadoghq.eu.crt`. Sur certains systèmes, la chaîne de certificat complète peut être requise. Si c'est le cas, utilisez [cette clé publique][2] à la place.

    * Modifiez votre ficher `/etc/rsyslog.d/datadog.conf` pour qu'il se termine par le contenu suivant :

        ```
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/intake.logs.datadoghq.eu.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```

6. Redémarrez Rsyslog. Vos nouveaux logs sont maintenant transférés directement vers votre compte Datadog.

7. Associez ces logs avec les tags et les métriques de l'host.
    Pour vous assurer que ces logs sont associés aux métriques et aux tags du même host dans votre compte Datadog, il est important de définir le même HOSTNAME dans votre fichier `rsyslog.conf` pour que sa valeur corresponde au hostname de vos métriques Datadog.
    **Remarque** : si vous n'avez défini aucun hostname dans votre fichier de configuration pour les métriques via `datadog.conf` ou `datadog.yaml`, vous n'avez rien à modifier. Si vous avez spécifié un hostname personnalisé pour votre métrique, veillez à remplacer la valeur **%HOSTNAME%** dans le format afin que celle-ci corresponde au nom personnalisé.

8. Utilisez les intégrations Datadog.
    Pour tirer le meilleur parti de vos logs dans Datadog, définissez la source de vos logs. La source peut être définie directement dans l'Agent si vous transférez vos logs à l'Agent Datadog.

    Sinon, vous aurez besoin de spécifier un format spécifique pour chaque source de log, ce qui signifie que chaque source devra avoir son propre fichier de configuration dans `/etc/rsyslog.d/`.

   Pour définir la source, utilisez le format suivant (si vous avez plusieurs sources, changez le nom du format dans chaque fichier) :

    ```
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```
    Vous pouvez également ajouter des tags personnalisés avec l'attribut `ddtags` :

    ```
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:test,<KEY:VALUE>\"] %msg%\n"
    ```

9. (Facultatif) Datadog met fin aux connexions inactives après une certaine période d'inactivité.
    Certaines versions de Rsyslog ne parviennent pas à se reconnecter correctement lorsque cela est nécessaire. Pour résoudre ce problème, utilisez des marqueurs temporels pour que la connexion ne se termine jamais. Ajoutez les deux lignes de code suivantes dans votre configuration Rsyslog :
    ```
    $ModLoad immark
    $MarkMessagePeriod 20
    ```
   Et n'oubliez pas de redémarrer :
    ```
    sudo service rsyslog restart
    ```


[1]: /resources/crt/intake.logs.datadoghq.eu.crt
[2]: /resources/crt/FULL_intake.logs.datadoghq.eu.crt
{{% /tab %}}
{{< /tabs >}}

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help