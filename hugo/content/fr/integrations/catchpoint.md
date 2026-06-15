---
categories:
- monitoring
ddtype: crawler
dependencies: []
description: Envoyez vos alertes Catchpoint à votre flux d'événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/catchpoint/
draft: false
git_integration_title: catchpoint
has_logo: true
integration_id: catchpoint
integration_title: Catchpoint
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: catchpoint
public_title: Intégration Datadog/Catchpoint
short_description: Envoyez vos alertes Catchpoint à votre flux d'événements Datadog.
team: web-integrations
version: '1.0'
---

{{< img src="integrations/catchpoint/catchpoint_event.png" alt="événement catchpoint" popup="true">}}

## Présentation

Catchpoint est une plateforme d'analyse des performances numériques vous permettant d'optimiser les expériences client que vous offrez.

Associez Catchpoint à Datadog pour :

- Configurer des alertes exhaustives dans votre flux d'événements
- Créer des liens directs vers des tableaux d'analyse du portail Catchpoint
- Ajouter des tags relatifs au type d'alerte afin de filtrer facilement les données

## Configuration

### Installation

Aucune installation n'est requise.

### Procédure à suivre

Pour afficher des alertes Catchpoint dans votre flux, connectez-vous au portail Catchpoint et accédez à _Settings -> API_.

1. Sous Alerts API, sélectionnez Enable.
2. Saisissez l'URL de l'endpoint Datadog.

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
    ```

    Vous pouvez créer votre clé d'API Datadog depuis le site Datadog.

3. Définissez Status sur Active.
4. Sélectionnez le format Template.
5. Ajoutez un nouveau modèle.
6. Saisissez le nom du modèle, par exemple `DataDog`, puis définissez son format sur JSON.
7. Utilisez le modèle JSON suivant, puis enregistrez-le :

```json
{
    "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
    "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
    "priority": "normal",
    "tags": [
        "alertType:${Switch(${AlertTypeId},'0', 'Inconnu','2', 'Longueur d\'octet','3','Correspondance de contenu','4', 'Échec du host','7', 'Calcul du temps','9', 'Échec du test', '10','Information', '11','Échec JavaScript', '12', 'Ping',13, 'Requête')}"
    ],
    "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
    "source_type_name": "catchpoint"
}
```

Une fois la configuration terminée, Catchpoint envoie directement les alertes au flux d'événements dans Datadog.
{{< img src="integrations/catchpoint/catchpoint_configuration.png" alt="Configuration Catchpoint" popup="true">}}

### Configuration de métriques

1. Dans le webhook de données de test, ajoutez l'endpoint de l'API Datadog avec la clé d'API.
2. Sélectionnez « Template ».
3. Cliquez sur « Add New » dans le menu déroulant.
4. Saisissez un nom.
5. Sélectionnez « JSON » comme format.
6. Copiez le modèle JSON suivant et cliquez sur Save.

```json
{
  "series": [
    {
      "metric": "catchpoint.error.error",
      "points": [
        [
          "${timestampepoch}",
          "${if('${errorany}', 1, 0)}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}",
        "ErrorCode : ${errorcode}",
        "ErrorDescription : ${errorconnection}${errordns}${errorload}${errorloadobjects}${errorssl}${errorsystemlimit}${errortimeout}${errortransaction}"
      ],
      "type": "count"
    },
    {
      "metric": "catchpoint.frontend.client_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingclient}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.network.tcp_connect_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingconnect}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.content_load_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingcontentload}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.network.dns_resolution_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingdns}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.document_complete_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingdocumentcomplete}",
          "TestUrl: ${testurl}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.dom_content_load_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingdomcontentloadedevent}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.dom_interactive_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingdominteractive}",
          "TestName: ${TestName}",
          "TestUrl: ${testurl}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.dom_load_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingdomload}",
          "TestName: ${TestName}",
          "TestUrl: ${testurl}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.first_party_zone_impact",
      "points": [
        [
          "${timestampepoch}",
          "${timingimpactself}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.third_party_zone_impact",
      "points": [
        [
          "${timestampepoch}",
          "${timingimpactthirdparty}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.load_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingload}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.total_root_request_redirect_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingredirect}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.render_start_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingrenderstart}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.total_root_request_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingresponse}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.network.send_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingsend}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.network.ssl_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingssl}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.time_to_title",
      "points": [
        [
          "${timestampepoch}",
          "${timingtimetotitle}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.total_test_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingtotal}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.network.wait_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingwait}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.webpage_response_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingwebpageresponse}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.wire_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingwire}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ping.percentage.ping_packet_loss",
      "points": [
        [
          "${timestampepoch}",
          "${pingpacketlosspct}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ping.ping_round_trip_time",
      "points": [
        [
          "${timestampepoch}",
          "${pingroundtriptimeavg}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.imap.message_fetch_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingfetch}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.imap.message_list_time",
      "points": [
        [
          "${timestampepoch}",
          "${timinglist}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.imap.logout_time",
      "points": [
        [
          "${timestampepoch}",
          "${timinglogout}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.imap.message_search_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingsearch}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ftp.total_download_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${bytedownload}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ftp.total_get_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${byteget}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ftp.uploaded_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${byteupload}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ftp.delete_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingdelete}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ftp.download_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingdownload}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ftp.get_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingget}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ftp.upload_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingupload}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ntp.root_delay_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingrootdelay}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ntp.root_dispersion_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingrootdispersion}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ntp.round_trip_delay_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingroundtripdelay}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.ntp.ntp_time",
      "points": [
        [
          "${timestampepoch}",
          "${timinglocalclockoffset}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "millisecond"
    },
    {
      "metric": "catchpoint.frontend.total_self_zone_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${byteresponseselfzone}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "byte"
    },
    {
      "metric": "catchpoint.frontend.total_response_content_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${byteresponsetotalcontent}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "byte"
    },
    {
      "metric": "catchpoint.frontend.total_response_header_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${byteresponsetotalheaders}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "byte"
    },
    {
      "metric": "catchpoint.frontend.root_request_response_content_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${byteresponsecontent}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "byte"
    },
    {
      "metric": "catchpoint.frontend.root_request_response_header_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${byteresponseheaders}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "byte"
    },
    {
      "metric": "catchpoint.frontend.total_downloaded_bytes",
      "points": [
        [
          "${timestampepoch}",
          "${bytereceive}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge",
      "unit": "byte"
    },
    {
      "metric": "catchpoint.frontend.total_number_of_connections",
      "points": [
        [
          "${timestampepoch}",
          "${counterconnections}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.total_number_of_failed_requests",
      "points": [
        [
          "${timestampepoch}",
          "${counterfailedrequests}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.total_number_of_filmstrip_images",
      "points": [
        [
          "${timestampepoch}",
          "${counterfilmstripimages}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.total_number_of_hosts",
      "points": [
        [
          "${timestampepoch}",
          "${counterhosts}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.total_number_of_js_errors",
      "points": [
        [
          "${timestampepoch}",
          "${counterjsfailures}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.total_number_of_redirect",
      "points": [
        [
          "${timestampepoch}",
          "${counterredirections}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.total_number_of_requests",
      "points": [
        [
          "${timestampepoch}",
          "${counterrequests}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.page_speed_score",
      "points": [
        [
          "${timestampepoch}",
          "${scorepagespeed}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.speed_index_score",
      "points": [
        [
          "${timestampepoch}",
          "${scorespeedindex}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.above_the_fold_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingabovethefold}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    },
    {
      "metric": "catchpoint.frontend.authentication_time",
      "points": [
        [
          "${timestampepoch}",
          "${timingauth}"
        ]
      ],
      "tags": [
        "NodeName: ${nodename}",
        "TestId:${testid}",
        "TestName: ${TestName}",
        "TestUrl: ${testurl}"
      ],
      "type": "gauge"
    }
  ]
}
```

## Données collectées

### Métriques
{{< get-metrics-from-git "catchpoint" >}}


### Événements

L'intégration Catchpoint envoie les événements Catchpoint à votre flux d'événements Datadog.

### Checks de service

L'intégration Catchpoint n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://github.com/DataDog/dogweb/blob/prod/integration/catchpoint/catchpoint_metadata.csv
[2]: https://docs.datadoghq.com/fr/help/