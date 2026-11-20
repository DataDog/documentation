---
categories:
- web
ddtype: crawler
dependencies: []
description: Surveillez vos métriques Cloudfare relatives au DNS et au trafic Web.
doc_link: https://docs.datadoghq.com/integrations/cloudflare/
draft: false
git_integration_title: cloudflare
has_logo: true
integration_id: cloudflare
integration_title: Cloudflare
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  '[Cloudflare] Abnormal bandwidth being sent for zone: {{zone_name.name}}': assets/monitors/bandwidth.json
  '[Cloudflare] Error Rate is higher than normal in zone: {{zone_name.name}}': assets/monitors/error_rate.json
  '[Cloudflare] Error count is unusually high for worker script: {{worker_script.name}}': assets/monitors/worker_error.json
  '[Cloudflare] High number of detected threats for zone: {{zone_name.name}}': assets/monitors/threats.json
  '[Cloudflare] Hit Ratio is abnormally low for zone: {{zone_name.name}}': assets/monitors/hit_ratio.json
name: cloudflare
public_title: Intégration Datadog/Cloudflare
short_description: Surveillez vos métriques Cloudfare relatives au DNS et au trafic
  Web.
team: web-integrations
version: '1.0'
---

## Présentation

Associez Datadog à votre compte Cloudflare pour consulter vos métriques relatives au DNS et au trafic Web.

## Configuration

Avant de commencer, vous avez besoin d'un [compte Datadog][1] doté d'une [clé API][2]. Vous devez également avoir accès à [Cloudflare Logpush][3], ce qui nécessite un compte Enterprise. 

Lorsque vous utilisez un token d'API Cloudflare, assurez-vous qu'il dispose des autorisations **Zone** > **Zone** > **Read** et **Zone** > **Analytics** > **Read**.

### Installation

Installez l'intégration avec le [carré d'intégration Cloudflare][4] de Datadog.

### Configuration

1. Accédez à l'onglet **Configuration** dans le [carré d'intégration Cloudflare][4] de Datadog.
2. Saisissez les adresses e-mail et les clés ou tokens d'API des comptes que vous souhaitez surveiller. Pour obtenir vos clés et tokens d'API, accédez à votre compte Cloudflare, puis à **My profile** > **Api Tokens**.
3. Nommez le compte. Ce nom est arbitraire. Il est utilisé dans le tag `account` de vos métriques.

### Collecte de logs

Grâce à son service Logpush, Cloudflare vous permet de transmettre des logs directement à Datadog. Vous pouvez gérer la tâche Logpush avec l'[API Cloudflare](#api-cloudflare) ou le [dashboard Cloudflare](#dashboard-cloudflare).

#### API Cloudflare

1. Créez une tâche Logpush en envoyant une requête POST à l'endpoint des tâches Logpush. Renseignez les champs suivants :
    * `name` (facultatif) : indiquez votre nom de domaine.
    * `destination_conf` : une destination pour les logs caractérisée par les paramètres suivants :
        * `<DATADOG_ENDPOINT_URL>` : l'endpoint d'admission des logs HTTP Datadog. Votre endpoint est `http-intake.logs.{{< region-param key="dd_site" >}}/v1/input`.
        * `<DATADOG_API_KEY>` : votre clé d'API Datadog.
        * `ddsource` : définissez ce paramètre sur `cloudflare`.
        * `service` (facultatif) : indiquez le nom du service.
        * `host` (facultatif) : indiquez le nom du host.
        * `ddtags` (facultatif) : indiquez des tags.
    * `dataset` : la catégorie des logs que vous souhaitez recevoir. Consultez la section [Champs de log de la documentation Cloudflare][5] (en anglais) pour découvrir la liste des ensembles de données pris en charge.
    * `logpull_options` (facultatif) : pour configurer les champs, le taux d'échantillonnage et le format des timestamps, consultez la section [Options de la documentation sur l'API Logpush][6] (en anglais).

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
       "destination_conf": "datadog://http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?header_DD-API-KEY=<DD-API-KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
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
        "destination_conf": "datadog://{{< region-param key="dd_site" >}}?header_DD-API-KEY=<DATADOG-API-KEY>",
        "last_complete": null,
        "last_error": null,
        "error_message": null
      },
      "success": true
    }
    ```

#### Dashboard Cloudflare

1. Une fois que vous avez connecté un service à la section Logpush du dashboard Cloudflare, sélectionnez l'ensemble de données, les champs de données, puis la destination Datadog.
2. Sous **Enter destination information**, saisissez l'endpoint d'URL Datadog : 

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?ddsource=cloudflare
    ```

    **Remarque** : `ddsource=cloudflare` est requis. Pour différencier les logs, vous pouvez également ajouter les paramètres facultatifs `service`, `host` et `ddtags`.

    **Exemple** :

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
    ```

3. Saisissez la clé d'API Datadog que vous avez utilisée pour configurer votre intégration Datadog/Cloudflare dans le carré dédié.
4. Une fois l'accès validé, le message « Ready to push! » s'affiche sous **Prove ownership**. Cliquez sur `Push` pour terminer l'opération.

## Données collectées

### Métriques
{{< get-metrics-from-git "cloudflare" >}}


#### Autorisations
Vérifiez que votre token d'API Cloudflare dispose des autorisations suivantes :

| Scope       | Autorisation         |   Statut    |
| ----------- | ------------------ | ----------- |
| Compte     | Account Analytics  |    Read     |
| Compte     | Account Setting    |    Read     |
| Compte     | Worker Scripts     |    Read     |
| Zone        | Zone               |    Read     |
| Zone        | Analytics          |    Read     |
| Zone        | Itinéraires de workers      |    Read     |
| Zone        | Load Balancers     |    Read     |

### Événements

L'intégration Cloudflare n'inclut aucun événement.

### Checks de service

L'intégration Cloudflare n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /fr/account_management/api-app-keys/#api-keys
[3]: https://developers.cloudflare.com/logs/about
[4]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[5]: https://developers.cloudflare.com/logs/log-fields
[6]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/