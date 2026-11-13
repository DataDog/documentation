---
disable_toc: false
products:
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Destination des métriques OpenTelemetry
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination OpenTelemetry d'Observability Pipelines pour envoyer des métriques via HTTP/S à un OpenTelemetry (OTel) Collector ou à un autre endpoint compatible avec OpenTelemetry Protocol (OTLP).

## Configurer la destination {#set-up-destination}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'URI du client HTTP/S et, le cas échéant, la phrase secrète TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination OpenTelemetry lorsque vous [configurez un pipeline][3]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][4] ou avec [Terraform][5]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination OpenTelemetry dans l'interface utilisateur du pipeline, saisissez l'identifiant de votre URI de client HTTP/S. Un exemple d'endpoint d'URI HTTP/S auquel l'identifiant fait référence : `http://localhost:4319/v1/metrics`. Si vous laissez le champ de l'identifiant vide, la [valeur par défaut](#secret-defaults) est utilisée.

**Remarques** :
- Le Worker ne peut envoyer que des métriques de type compteur, jauge et histogramme à OpenTelemetry. OpenTelemetry ne prend pas en charge d'autres types de métriques, le Worker les ignore donc. Consultez [Filtrer les métriques non prises en charge](#filter-out-unsupported-metrics) pour plus d'informations.
- Datadog recommande de configurer votre récepteur OTLP pour autoriser les échantillons hors séquence, car le Worker ne réordonne pas les métriques et certains récepteurs OTLP rejettent les échantillons hors séquence. Consultez [Autoriser les échantillons hors séquence](#allow-out-of-order-samples) pour plus d'informations.
- Si vous saisissez des identifiants de secret puis choisissez d'utiliser des variables d'environnement, la variable d'environnement est l'identifiant saisi précédé de `DD_OP_`. Par exemple, si vous avez saisi `PASSWORD_1` pour un identifiant de mot de passe, la variable d'environnement pour ce mot de passe est `DD_OP_PASSWORD_1`.

### Paramètres facultatifs {#optional-settings}

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Mise en mémoire tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Filtrer les métriques non prises en charge {#filter-out-unsupported-metrics}

Le Worker ne peut envoyer que des métriques de type compteur, jauge et histogramme à OpenTelemetry. Les métriques Datadog suivantes ne sont pas prises en charge car elles ne peuvent pas être converties au format OTLP :

- Métriques de type StatsD
- Métriques de distribution
- Métriques de type Sketch

Si l'une de ces métriques se trouve dans un lot à encoder et à envoyer à OpenTelemetry, le Worker ignore la métrique non prise en charge, enregistre une erreur et met à jour la métrique `component_error_total`. Datadog recommande d'utiliser un [processeur de filtrage][9] pour filtrer les types de métriques non pris en charge.

## Autoriser les échantillons hors séquence {#allow-out-of-order-samples}

Le Worker n'envoie pas toujours les métriques dans le bon ordre pour une série donnée car il ne réordonne pas les métriques. Par exemple, si le premier lot de métriques contient des métriques avec les horodatages : `10:03`, `10:04`, `10:05` et que le second lot contient des métriques avec les horodatages : `10:01`, `10:02`, `10:06`, le Worker ne réordonne pas ces métriques avant de les envoyer.

Comme certains récepteurs OTLP, tels que le récepteur OTLP Prometheus, rejettent les échantillons hors séquence, le second lot de métriques est rejeté par le récepteur. En conséquence, le Worker enregistre une erreur Bad Request (`400`) et le lot entier qui a été rejeté est abandonné, même si le récepteur OTLP a accepté certaines des métriques valides du lot.

Datadog recommande de configurer votre récepteur OTLP pour autoriser les échantillons hors séquence afin d'éviter que ceux-ci ne soient abandonnés.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant d'endpoint d'URI client HTTP/S
  - Référence l'endpoint d'URI HTTP/S vers lequel le Worker envoie les données OpenTelemetry. Un exemple d'endpoint d'URI HTTP/S auquel l'identifiant fait référence : `http://localhost:4319/v1/metrics`.
  - L'identifiant par défaut est `DESTINATION_OTEL_HTTP_CLIENT_URI`.
- Identifiant de la phrase secrète TLS du client HTTP/S (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_OTEL_HTTP_CLIENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Consultez [Métriques des composants][6] et [Métriques des tampons de destination][7] pour plus d'informations sur les métriques émises par toutes les destinations. Pour filtrer ou regrouper par métriques de destination OpenTelemetry, utilisez le tag `component_type:opentelemetry`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'une de ces conditions se produit. Voir [le traitement par lots d'événements][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| N/A            | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/configuration/set_up_pipelines/
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/?tab=destinations#buffer-metrics
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /fr/observability_pipelines/processors/filter/