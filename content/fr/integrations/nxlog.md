---
aliases:
- /fr/logs/log_collection/nxlog
categories:
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/nxlog.md
description: Configurez NxLog pour rassembler les logs de votre host, de vos conteneurs
  et de vos services.
doc_link: /integrations/nxlog/
has_logo: true
integration_id: nxlog
integration_title: nxlog
is_public: true
custom_kind: integration
name: nxlog
public_title: Intégration Datadog/NxLog
short_description: Configurez NxLog pour rassembler les logs de votre host, de vos
  conteneurs et de vos services.
supported_os:
- windows
title: NxLog
---

## Présentation

Configurez NxLog pour rassembler les logs de votre host, de vos conteneurs et de vos services.

## Configuration

### Collecte de logs

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. Configurez NXLog afin d'envoyer vos logs à votre plate-forme Datadog. Remplacez l'ensemble du contenu du fichier dans `C:\Program Files\nxlog\conf` par ce qui suit :

    ```conf
    ## Set the ROOT to the folder your nxlog was installed into,
    ## otherwise it won't start.
    #To change for your own system if necessary
    define ROOT C:\Program Files\nxlog
    #define ROOT_STRING C:\Program Files\nxlog
    #define ROOT C:\Program Files (x86)\nxlog
    Moduledir %ROOT%\modules
    CacheDir %ROOT%\data
    Pidfile %ROOT%\data\nxlog.pid
    SpoolDir %ROOT%\data
    LogFile %ROOT%\data\nxlog.log
    ##Extension to format the message in JSON format
    <Extension json>
        Module xm_json
    </Extension>
    ##Extension to format the message in syslog format
    <Extension syslog>
    Module xm_syslog
    </Extension>
    ########## INPUTS ###########
    ##Input for windows event logs
    <Input syslogs>
        Module      im_msvistalog
    ##For windows 2003 and earlier use the following:
    #    Module      im_mseventlog
    </Input>
    ############ OUTPUTS ##############
    ##TCP output module
    <Output out>
        Module      om_tcp
        Host        intake.logs.datadoghq.com
        Port        10514
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```

     N'oubliez pas de remplacer `<DATADOG_API_KEY>` dans le texte.

2. Activez le module watchfile de NXLog pour chaque fichier à surveiller. Pour ce faire, ajoutez ce qui suit avant la section de sortie :

    ```conf
    ##Module to watch a file
    <Input FILE_WATCH_1>
      Module im_file
      File "PATH\\TO\\YOUR\\FILE1"
      Exec   $SourceName = '<MY_APPLICATION_NAME>';
      SavePos TRUE

      ##include the message and add meta data
      Exec $Message = $raw_event;
    </Input>
    ```

3. Vérifiez que ces fichiers sont connectés à la section de sortie.

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. Redémarrez NXLog. Ouvrez l'outil d'administration du service :

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. (Facultatif) Définissez des tags ou des paramètres supplémentaires. Ajoutez n'importe quel attribut spécifique à vos logs dans chaque section d'entrée de votre fichier de configuration NxLog. Par exemple, pour indiquer la source utilisée dans Datadog afin d'identifier de quelle intégration les logs proviennent, utilisez ce qui suit :

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### Chiffrement TLS avec NxLog

1. Téléchargez le [certificat d'autorité de certification][1].

2. Ajoutez le module `om_ssl` dans votre configuration NxLog pour activer les transferts sécurisés via le port 10516 :

    ```conf
    <Output out>
      Module  om_ssl
      Host    intake.logs.datadoghq.com
      Port    10516
      Exec    to_syslog_ietf();
      Exec    $raw_event="my_api_key " + $raw_event;
      CAFile  <CERT_DIR>/ca-certificates.crt
      AllowUntrusted FALSE
    </Output>
    ```


[1]: /resources/crt/ca-certificates.crt
{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

1. Configurez NXLog afin d'envoyer vos logs à votre plate-forme Datadog. Remplacez l'ensemble du contenu du fichier dans `C:\Program Files\nxlog\conf` par ce qui suit :

    ```conf
    ## Set the ROOT to the folder your nxlog was installed into,
    ## otherwise it won't start.
    #To change for your own system if necessary
    define ROOT C:\Program Files\nxlog
    #define ROOT_STRING C:\Program Files\nxlog
    #define ROOT C:\Program Files (x86)\nxlog
    Moduledir %ROOT%\modules
    CacheDir %ROOT%\data
    Pidfile %ROOT%\data\nxlog.pid
    SpoolDir %ROOT%\data
    LogFile %ROOT%\data\nxlog.log
    ##Extension to format the message in JSON format
    <Extension json>
        Module xm_json
    </Extension>
    ##Extension to format the message in syslog format
    <Extension syslog>
    Module xm_syslog
    </Extension>
    ########## INPUTS ###########
    ##Input for windows event logs
    <Input syslogs>
        Module      im_msvistalog
    ##For windows 2003 and earlier use the following:
    #    Module      im_mseventlog
    </Input>
    ############ OUTPUTS ##############
    ##TCP output module
    <Output out>
        Module      om_tcp
        Host        tcp-intake.logs.datadoghq.eu
        Port        1883
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```

     N'oubliez pas de remplacer `<DATADOG_API_KEY>` dans le texte.

2. Activez le module watchfile de NXLog pour chaque fichier à surveiller. Pour ce faire, ajoutez ce qui suit avant la section de sortie :

    ```conf
    ##Module to watch a file
    <Input FILE_WATCH_1>
      Module im_file
      File "PATH\\TO\\YOUR\\FILE1"
      Exec   $SourceName = '<MY_APPLICATION_NAME>';
      SavePos TRUE

      ##include the message and add meta data
      Exec $Message = $raw_event;
    </Input>
    ```

3. Vérifiez que ces fichiers sont ajoutés dans la section de sortie :

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. Redémarrez NXLog. Ouvrez l'outil d'administration du service :

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. (Facultatif) Définissez des tags ou des paramètres supplémentaires. Ajoutez n'importe quel attribut spécifique à vos logs dans chaque section d'entrée de votre fichier de configuration NxLog. Par exemple, pour indiquer la source utilisée dans Datadog afin d'identifier de quelle intégration les logs proviennent, utilisez ce qui suit :

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### Chiffrement TLS avec NxLog

1. Téléchargez le [certificat d'autorité de certification][1].

2. Ajoutez le module `om_ssl` dans votre configuration NxLog pour activer les transferts sécurisés via le port 443 :

    ```conf
    <Output out>
      Module  om_ssl
      Host    intake.logs.datadoghq.com
      Port    443
      Exec    to_syslog_ietf();
      Exec    $raw_event="my_api_key " + $raw_event;
      CAFile  <CERT_DIR>/ca-certificates.crt
      AllowUntrusted FALSE
    </Output>
    ```


[1]: /resources/crt/ca-certificates.crt
{{% /tab %}}
{{< /tabs >}}

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help/