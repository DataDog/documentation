---
aliases:
- /fr/observability_pipelines/sources/prometheus
description: Découvrez les sources disponibles pour l'Observability Pipelines Worker.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentation
  text: Configurez des pipelines
- link: /observability_pipelines/processors/
  tag: Documentation
  text: Processeurs pour vos pipelines
- link: /observability_pipelines/destinations/
  tag: Documentation
  text: Destinations pour Observability Pipelines
title: Sources
---
## Présentation {#overview}

Utilisez les sources d'Observability Pipelines pour recevoir des journaux ou des métriques provenant de différentes sources de données. Les sources ont des prérequis et des paramètres différents. Certaines sources doivent également être configurées pour envoyer des données à l'Observability Pipelines Worker.

Sélectionnez une source dans le menu de navigation de gauche pour en savoir plus.

## Sources {#sources}

Voici les sources disponibles :

{{< tabs >}}
{{% tab "Logs" %}}

- [Akamai DataStream][1]
- [Amazon Data Firehose][2]
- [Amazon S3][3]
- [Azure Event Hubs][4]
- [Cloudflare Logpush][5]
- [Datadog Agent][6]
- [Filebeat][7]
- [Fluentd and Fluent Bit][8]
- [Google Pub/Sub][9]
- [HTTP Client][10]
- [HTTP Server][11]
- [Kafka][12]
- [Lambda Extension][13]
- [Lambda Forwarder][14]
- [Logstash][15]
- [MySQL][16]
- [Okta][17]
- [OpenTelemetry][18]
- [Socket][19]
- [Splunk HTTP Event Collector (HEC)][20]
- [Splunk Heavy or Universal Forwarders (TCP)][21]
- [Sumo Logic Hosted Collector][22]
- [Syslog][23]
- [WebSocket][24]

[1]: /fr/observability_pipelines/sources/akamai_datastream/
[2]: /fr/observability_pipelines/sources/amazon_data_firehose/
[3]: /fr/observability_pipelines/sources/amazon_s3/
[4]: /fr/observability_pipelines/sources/azure_event_hubs/
[5]: /fr/observability_pipelines/sources/cloudflare_logpush/
[6]: /fr/observability_pipelines/sources/datadog_agent/
[7]: /fr/observability_pipelines/sources/filebeat/
[8]: /fr/observability_pipelines/sources/fluent/
[9]: /fr/observability_pipelines/sources/google_pubsub/
[10]: /fr/observability_pipelines/sources/http_client/
[11]: /fr/observability_pipelines/sources/http_server/
[12]: /fr/observability_pipelines/sources/kafka/
[13]: /fr/observability_pipelines/sources/lambda_extension/
[14]: /fr/observability_pipelines/sources/lambda_forwarder/
[15]: /fr/observability_pipelines/sources/logstash/
[16]: /fr/observability_pipelines/sources/mysql/
[17]: /fr/observability_pipelines/sources/okta/
[18]: /fr/observability_pipelines/sources/opentelemetry/
[19]: /fr/observability_pipelines/sources/socket/
[20]: /fr/observability_pipelines/sources/splunk_hec/
[21]: /fr/observability_pipelines/sources/splunk_tcp/
[22]: /fr/observability_pipelines/sources/sumo_logic/
[23]: /fr/observability_pipelines/sources/syslog/
[24]: /fr/observability_pipelines/sources/websocket/

{{% /tab %}}
{{% tab "Métriques" %}}

- [Datadog Agent][1]
- [OpenTelemetry][2]

[1]: /fr/observability_pipelines/sources/datadog_agent/
[2]: /fr/observability_pipelines/sources/opentelemetry/

{{% /tab %}}
{{< /tabs >}}

## Champs de métadonnées standard {#standard-metadata-fields}

Toutes les sources ajoutent les champs de métadonnées standard suivants aux événements ingérés :

| Nom du champ     | Type de valeur     | Exemple                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | String         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | String         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | String         | `"splunk_tcp"`               |

Par exemple, si ceci est l'événement brut :

```
{
  "foo": "bar"
}
```

Alors l'événement enrichi avec les champs de métadonnées standard est :

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

Vous pouvez voir ces champs de métadonnées standard lorsque vous utilisez la commande [`tap`][2] pour voir les événements envoyés via la source.

Une fois les événements ingérés par la source, ils sont envoyés à différents processeurs et destinations qui pourraient mettre à jour ces champs. Par exemple, si l'événement est envoyé à la destination Datadog Logs, le champ d'horodatage est converti au format UNIX.

**Remarque** : La métrique `bytes in per second` dans l'UI concerne les événements bruts ingérés, et non les événements enrichis.

## Certificats TLS {#tls-certificates}

Activez TLS pour Observability Pipelines afin de garantir que les données sont chiffrées pendant le transit. Cela empêche les attaquants d'altérer vos données.

Observability Pipelines n'accepte pas les certificats auto-signés par défaut car ils ne fournissent pas de vérification de confiance sécurisée et peuvent potentiellement exposer votre environnement à des attaques man-in-the-middle.

Pour vérifier si votre certificat est auto-signé, exécutez cette commande:

```
openssl verify -CAfile certificate.pem certificate.pem
```

Si le certificat est auto-signé et se vérifie lui-même, le résultat est :

```
certificate.pem: OK
```

Sinon, vous voyez l'erreur `unable to get local issuer certificate`.

Au lieu d'utiliser un certificat auto-signé, Datadog recommande ce qui suit :

1. Utilisez un certificat signé par une autorité de certification (CA).
2. Si vous ne pouvez pas utiliser un certificat signé par une CA, utilisez un certificat de [Let's Encrypt][3].

Si vous devez utiliser un certificat auto-signé parce que les approches ci-dessus ne sont pas possibles, vous pouvez configurer votre environnement pour faire confiance au certificat auto-signé sur l'hôte Observability Pipelines Worker.

<div class="alert alert-warning">Datadog ne recommande pas les certificats auto-signés. Ils sont moins sécurisés et ne conviennent pas à une utilisation en production ni à une exposition sur Internet. Si vous devez utiliser des certificats auto-signés, limitez leur utilisation aux tests internes uniquement.</a></div>

Pour que le host Worker fasse confiance au certificat auto-signé :

- Sur les hôtes Linux, installez le certificat dans le magasin de certificats de confiance du système d'exploitation.
- Dans Kubernetes, vous pouvez soit :
    - Créer une image de conteneur personnalisée qui inclut le certificat.
    - Monter le certificat et mettre à jour manuellement le magasin de certificats de confiance du conteneur.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#use-tap-to-see-your-data
[3]: https://letsencrypt.org/