---
aliases:
- /fr/real_user_monitoring/faq/proxy_rum_data/
content_filters:
- label: SDK source
  option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_proxying_options
  trait_id: rum_browser_sdk_version
description: Configurez le proxy de données RUM du navigateur avec des options de
  source SDK et des paramètres spécifiques à la version pour un routage réseau personnalisé.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: En savoir plus sur le Real User Monitoring
title: Utilisez un proxy pour vos données RUM du navigateur
---
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
{% alert level="danger" %}
Mettez à niveau vers le SDK du navigateur `4.34.0` ou une version ultérieure pour éviter les vulnérabilités de sécurité dans votre configuration de proxy.
{% /alert %}
{% /if %}

## Aperçu {% #overview %}

Le SDK RUM du navigateur peut être configuré pour envoyer des requêtes via un proxy. Lorsque vous définissez le `proxy` [paramètre d'initialisation][1] du SDK sur une URL telle que `https://www.example-proxy.com/any-endpoint`, toutes les données RUM sont envoyées à cette URL en utilisant la méthode POST. Les données RUM doivent encore être transférées à Datadog depuis le proxy.

## Configuration préalable du proxy {% #prerequisite-proxy-setup %}

Pour transférer avec succès une requête à Datadog, votre proxy doit

1. [Construisez l'URL d'entrée de Datadog](#build-the-datadog-intake-url).
2. Ajoutez un en-tête `X-Forwarded-For` contenant l'adresse IP du client de la requête pour un geoIP précis.
3. Transférez la requête à l'URL d'entrée de Datadog en utilisant la méthode POST.
4. Laissez le corps de la requête inchangé.

{% alert level="warning" %}
- Pour des raisons de sécurité, supprimez tous les en-têtes HTTP qui pourraient contenir des informations sensibles, comme l'en-tête `cookie`.
- Le corps de la requête peut contenir des données binaires et ne doit pas être converti en chaîne. Assurez-vous que votre implémentation de proxy transfère le corps brut sans conversion.
- Assurez-vous que votre implémentation de proxy ne permet pas à un acteur malveillant d'envoyer des requêtes à un autre serveur. Par exemple : `https://browser-intake-datadoghq.com.malicious.com`.
{% /alert %}

### Construisez l'URL d'entrée de Datadog {% #build-the-datadog-intake-url %}

Votre URL d'entrée Datadog doit avoir le format `<INTAKE_ORIGIN>/<PATH><PARAMETERS>` (par exemple, `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`).

{% table %}
---
* origine d'entrée
* 
    L'origine d'entrée de Datadog correspond à votre `site` [paramètre d'initialisation][1]. L'origine d'entrée de Datadog correspondant à votre paramètre de site doit être définie dans votre implémentation de proxy.

    {% site-region region="us" %}
    L'origine d'entrée pour votre site Datadog est `https://browser-intake-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us3" %}
    L'origine d'entrée pour votre site Datadog est `https://browser-intake-us3-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us5" %}
    L'origine d'entrée pour votre site Datadog est `https://browser-intake-us5-datadoghq.com`.
    {% /site-region %}

    {% site-region region="eu" %}
    L'origine d'entrée pour votre site Datadog est `https://browser-intake-datadoghq.eu`.
    {% /site-region %}

    {% site-region region="ap1" %}
    L'origine d'entrée pour votre site Datadog est `https://browser-intake-ap1-datadoghq.com`.
    {% /site-region %}

    {% site-region region="ap2" %}
    L'origine d'entrée pour votre site Datadog est `https://browser-intake-ap2-datadoghq.com`.
    {% /site-region %}

    {% site-region region="gov" %}
    L'origine d'entrée pour votre site Datadog est `https://browser-intake-ddog-gov.com`.
    {% /site-region %}
---
* chemin
* 
    Le chemin contient la version de l'API et le produit (par exemple, `/api/v2/rum` pour les données RUM ou `/api/v2/replay` pour les données Session Replay). 
    
    Le chemin pour chaque requête peut être accédé dans le paramètre `ddforward` de la requête (par exemple, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).
---
* paramètres
* 
    Les paramètres de la requête (par exemple, `ddsource=browser&...`) peuvent être accédés dans le paramètre `ddforward` de la requête (par exemple, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).

{% /table %}

## Configuration du SDK {% #sdk-setup %}

<!-- SDK version >4.34.0 et supérieur -->
{% if includes($rum_browser_sdk_version, ["gte_5_4_0", "gte_4_34_0"]) %}

Configurez l'URL du proxy dans le paramètre d'initialisation `proxy` :

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: '<YOUR_PROXY_URL>',
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    });
});
```

{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>'
    });
```
{% /if %}
<!-- end CDN sync -->

Le SDK RUM du navigateur ajoute un paramètre de requête `ddforward` à toutes les requêtes vers votre proxy. Ce paramètre de requête contient le chemin d'URL et les paramètres auxquels toutes les données doivent être transmises.

Par exemple, avec un `site` défini sur `datadoghq.eu` et un `proxy` défini sur `https://example.org/datadog-intake-proxy`, le SDK RUM du navigateur envoie des requêtes à une URL comme celle-ci : `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`. Le proxy transmet la requête à `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

<!-- SDK version >=5.4.0 -->
{% if equals($rum_browser_sdk_version, "gte_5_4_0") %}
### Passage d'une fonction au paramètre d'initialisation `proxy` {% #passing-a-function-to-the-proxy-initialization-parameter %}

Le paramètre d'initialisation `proxy` prend également en charge une entrée de fonction. Cette fonction vous permet d'avoir plus de contrôle sur la manière dont le chemin et les paramètres sont ajoutés à l'URL du proxy.

Cette fonction reçoit un objet avec les propriétés suivantes :

- `path` : le chemin pour les requêtes Datadog (exemple : `/api/v2/rum`)
- `parameters` : les paramètres des requêtes Datadog (exemple : `ddsource=browser&...`)

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
    })
})
```
{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`
    });
```
{% /if %}
<!-- end CDN sync -->

**Remarque :**
- Certains bloqueurs de confidentialité ciblent déjà les modèles d'URL d'entrée [URL patterns][2], donc vous voudrez peut-être en tenir compte lors de la construction de votre URL de proxy.
- La fonction `proxy` est appelée pour chaque requête, donc elle doit éviter tout calcul lourd.
- **Les applications web JSP** doivent utiliser le caractère d'échappement `\` pour propager correctement ces paramètres au navigateur. Exemple :
    ```javascript
    proxy: (options) => 'http://proxyURL:proxyPort\${options.path}?\${options.parameters}',
    ```
{% /if %}
<!-- end SDK version >=5.4.0 -->

{% /if %}
<!-- end SDK version >4.34.0 et supérieur -->

<!-- SDK version <4.34.0 -->
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
Avant la version 4.34.0 du SDK du navigateur, le paramètre d'initialisation `proxyUrl` était utilisé, et l'origine d'entrée Datadog était incluse dans l'attribut `ddforward`. L'implémentation du proxy était chargée de valider cet hôte, et le non-respect de cette validation entraînait diverses vulnérabilités.

L'origine d'entrée Datadog doit être définie dans votre implémentation de proxy pour garantir la sécurité.

**Pour éviter les vulnérabilités de sécurité, vous devez mettre à niveau vers le SDK du navigateur `4.34.0` ou une version ultérieure.**
{% /if %}
<!-- end SDK version <4.34.0 -->

[1]: /fr/real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840