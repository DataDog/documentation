---
categories:
  - web
ddtype: crawler
dependencies: []
description: Surveillez vos métriques Cloudfare relatives au DNS et au trafic Web.
doc_link: 'https://docs.datadoghq.com/integrations/cloudflare/'
draft: false
git_integration_title: cloudflare
has_logo: true
integration_id: ''
integration_title: Cloudflare
is_public: true
kind: integration
manifest_version: '1.0'
name: cloudflare
public_title: Intégration Datadog/Cloudflare
short_description: Surveillez vos métriques Cloudfare relatives au DNS et au trafic Web.
version: '1.0'
---
## Présentation

Associez Datadog à votre compte Cloudflare pour consulter vos métriques relatives au DNS et au trafic Web.

## Implémentation

### Installation

Installez l'intégration avec le [carré d'intégration Cloudflare][1] de Datadog.

### Configuration

1. Accédez à l'onglet Configuration dans le [carré d'intégration Cloudflare][1] de Datadog.
2. Saisissez les adresses e-mail et les clés ou tokens d'API des comptes que vous souhaitez surveiller. Vos clés et tokens d'API Cloudflare sont disponibles sur votre compte Cloudflare sous _Mon profil > Tokens API_.
3. Nommez le compte. Ce nom est arbitraire. Il est utilisé dans le tag `account` de vos métriques.

Lorsque vous utilisez un token d'API, assurez-vous qu'il dispose des autorisations suivantes :

- _Zone_ > _Zone_ > _Read_
- _Zone_ > _Analytics_ > _Read_

### Collecte de logs

Cloudflare permet aux clients de transmettre directement des logs à Datadog à l'aide de son service Logpush.

1. Créez une tâche Logpush en envoyant une requête POST à l'endpoint des tâches Logpush. Renseignez les champs suivants :
    * `name` (facultatif) : indiquez votre nom de domaine.
    * `destination_conf` : une destination pour les logs caractérisée par les paramètres suivants :
        * `<URL_ENDPOINT_DATADOG>` : l'endpoint d'admission des logs HTTP Datadog. Votre endpoint est `http-intake.logs.`{{< region-param key="dd_site" code="true" >}}`/v1/input`.
        * `<CLÉ_API_DATADOG>` : votre clé d'API Datadog.
        * `ddsource` : définissez ce paramètre sur `cloudflare`.
        * `service` (facultatif) : indiquez le nom du service.
        * `host` (facultatif) : indiquez le nom du host.
        * `ddtags` (facultatif) : indiquez des tags.
    * `dataset` : la catégorie des logs que vous souhaitez recevoir. Consultez la [documentation Cloudflare][2] (en anglais) pour découvrir la liste de tous les ensembles de données pris en charge.
    * `logpull_options` (facultatif) : pour configurer les champs, le taux d'échantillonnage et le format des timestamps, consultez la section [Options de la documentation sur l'API Logpush][3] (en anglais).

    **Exemple de requête** :

    ```bash
    curl -s -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs' \
    --header 'X-Auth-Key: <CLOUDFLARE_AUTH_KEY>' \
    --header 'X-Auth-Email: <CLOUDFLARE_AUTH_EMAIL>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
       "name": "<NAME>",
       "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "dataset": "http_requests"
    }'
    ```

    **Exemple de réponse** :

    ```bash
    {
     "errors": [],
     "messages": [],
     "result": {
       "id": 100,
       "dataset": "http_requests",
       "enabled": false,
       "name": "<DOMAIN_NAME>",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "destination_conf": "datadog://http-intake.logs.datadoghq.com/v1/input?header_DD-API-KEY=<DD-API-KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "last_complete": null,
       "last_error": null,
       "error_message": null
     },
     "success": true
    }
    ```

    Notez la valeur d'`id`. Dans l'exemple précédent, elle est de `100`.

2. Activez la tâche. Utilisez l'ID de tâche renvoyé dans la réponse et envoyez `{"enabled": true}` dans le corps de la requête. 

   **Exemple de requête** :

    ```bash
    curl -s -X PUT \
    https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID> -d'{"enabled":true}' | jq .
    ```

   **Exemple de réponse** :

    ```bash
    {
      "errors": [],
      "messages": [],
      "result": {
        "id": 100,
        "dataset": "http_requests",
        "enabled": true,
        "name": "<DOMAIN_NAME>",
        "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
        "destination_conf": "datadog://<DATADOG-ENDPOINT-URL>?header_DD-API-KEY=<DATADOG-API-KEY>",
        "last_complete": null,
        "last_error": null,
        "error_message": null
      },
      "success": true
    }
    ```

## Données collectées

### Métriques
{{< get-metrics-from-git "cloudflare" >}}


### Événements

L'intégration Cloudflare n'inclut aucun événement.

### Checks de service

L'intégration Cloudflare n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[2]: https://developers.cloudflare.com/logs/log-fields
[3]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/