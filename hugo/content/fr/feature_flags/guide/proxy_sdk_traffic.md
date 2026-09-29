---
description: Acheminez les requêtes réseau du SDK Datadog Feature Flag via un proxy
  sur votre propre domaine.
further_reading:
- link: /feature_flags/guide/proxy_server_setup/
  tag: Guide
  text: Configurer un serveur proxy pour le trafic du SDK Feature Flag
- link: /feature_flags/client/
  tag: Documentation
  text: Feature Flags côté client
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: Guide
  text: Proxy pour les données RUM de navigateur
title: Proxy du trafic du SDK Feature Flag
---
## Présentation {#overview}

Le SDK Datadog Feature Flag effectue deux types de requêtes réseau sortantes depuis votre application :

1. **Téléchargement de la configuration des flags** : le SDK récupère les attributions de flags précalculées depuis le CDN Datadog au démarrage et lorsque le contexte d'évaluation change. Cette requête détermine quelles variantes de flag sont renvoyées à votre application.
2. **Téléversements d'événements** : le SDK envoie les données d'événement d'exposition et d'évaluation aux endpoints d'ingestion Datadog.

Vous pouvez acheminer l'un ou l'autre de ces types de requêtes, ou les deux, via un proxy sur votre propre domaine. Les raisons courantes d'utiliser un proxy incluent :

- Les politiques réseau qui restreignent l'accès direct aux domaines tiers depuis les appareils clients
- Les exigences de résidence des données ou de conformité
- Le contournement des bloqueurs de publicités pour les applications de navigateur

<div class="alert alert-info">Les exemples de code sur cette page utilisent le site US1 (<code>datadoghq.com</code>) comme exemple. Remplacez les domaines Datadog par les valeurs correspondantes pour votre <a href="/getting_started/site/">site Datadog</a>.</div>

## Configurez le proxy {#configure-the-proxy}

{{< tabs >}}

{{% tab "Android" %}}

Passez des URL d'endpoint personnalisées à `FlagsConfiguration.Builder` avant d'appeler `Flags.enable()`.

### Proxy de configuration des flags {#flag-configuration-proxy}

Pour acheminer le téléchargement de la configuration des flags via votre proxy, appelez `useCustomFlagEndpoint` avec l'URL complète exposée par votre proxy. Le SDK envoie une requête POST à cette URL avec le contexte d'évaluation dans le corps.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

Votre proxy doit transférer cette requête vers le CDN Datadog : `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (remplacez le sous-domaine selon les besoins pour votre [site Datadog][1]). Transmettez le corps de la requête et tous les en-têtes sans modification.

### Proxy de téléversement d'événements {#event-upload-proxy}

Pour acheminer les téléversements d'événements d'exposition et d'évaluation via votre proxy, appelez les méthodes de constructeur correspondantes avec l'URL complète de votre endpoint de proxy.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .useCustomExposureEndpoint("https://proxy.example.com/api/v2/exposures")
    .useCustomEvaluationEndpoint("https://proxy.example.com/api/v2/flagevaluation")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

Votre proxy doit transférer chaque requête vers l'endpoint d'ingestion Datadog correspondant pour votre [site Datadog][1] (le tableau suivant utilise le site US1 comme exemple) :

| Chemin du proxy | Transférer vers |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /fr/getting_started/site/

{{% /tab %}}

{{% tab "iOS" %}}

Définissez des URL d'endpoint personnalisées sur `Flags.Configuration` avant d'appeler `Flags.enable(with:)`.

### Proxy de configuration des flags {#flag-configuration-proxy-1}

Pour acheminer le téléchargement de la configuration des flags via votre proxy, définissez `customFlagsEndpoint` sur l'URL complète exposée par votre proxy. Le SDK envoie une requête POST à cette URL avec le contexte d'évaluation dans le corps.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
import DatadogFlags

let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

Votre proxy doit transférer cette requête vers le CDN Datadog : `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (remplacez le sous-domaine selon les besoins pour votre [site Datadog][1]). Transmettez le corps de la requête et tous les en-têtes sans modification.

Pour ajouter des en-têtes HTTP supplémentaires aux requêtes de configuration des flags (par exemple, pour l'authentification sur votre proxy), définissez `customFlagsHeaders`.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customFlagsHeaders: ["X-Proxy-Token": "<YOUR_PROXY_TOKEN>"]
)
{{< /code-block >}}

### Proxy de téléversement d'événements {#event-upload-proxy-1}

Pour acheminer les téléversements d'événements d'exposition et d'évaluation via votre proxy, définissez `customExposureEndpoint` et `customEvaluationEndpoint`.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customExposureEndpoint: URL(string: "https://proxy.example.com/api/v2/exposures"),
    customEvaluationEndpoint: URL(string: "https://proxy.example.com/api/v2/flagevaluation")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

Votre proxy doit transférer chaque requête vers l'endpoint d'ingestion Datadog correspondant pour votre [site Datadog][1] (le tableau suivant utilise le site US1 comme exemple) :

| Chemin du proxy | Transférer vers |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /fr/getting_started/site/

{{% /tab %}}

{{% tab "React Native" %}}

Transmettez un objet `FlagsConfiguration` à `DdFlags.enable()`.

### Proxy de configuration des flags {#flag-configuration-proxy-2}

Pour acheminer le téléchargement de la configuration des flags via votre proxy, définissez `customFlagsEndpoint` sur l'URL de base de votre proxy. Le SDK ajoute automatiquement `/precompute-assignments` à cette valeur et envoie une requête POST avec le contexte d'évaluation dans le corps.

{{< code-block lang="typescript" filename="App.tsx" >}}
import { DdFlags } from '@datadog/mobile-react-native';

await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/precompute-assignments
});
{{< /code-block >}}

Votre proxy doit transférer cette requête vers le CDN Datadog : `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (remplacez le sous-domaine selon les besoins pour votre [site Datadog][1]). Transmettez le corps de la requête et tous les en-têtes sans modification.

### Proxy de téléversement d'événements {#event-upload-proxy-2}

Pour acheminer les téléversements d'événements d'exposition via votre proxy, définissez `customExposureEndpoint` sur l'URL de base de votre proxy. Le SDK ajoute automatiquement `/api/v2/exposures` à cette valeur.

{{< code-block lang="typescript" filename="App.tsx" >}}
await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    customExposureEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/api/v2/exposures
});
{{< /code-block >}}

Votre proxy doit transférer les requêtes d'exposition vers l'endpoint d'ingestion Datadog correspondant pour votre [site Datadog][1] ; par exemple, pour le site US1, utilisez `https://api.datadoghq.com/api/v2/exposures`.

<div class="alert alert-info">Le SDK React Native n'expose pas de <code>customEvaluationEndpoint</code> option. Les événements d'évaluation sont envoyés via le SDK natif Android ou iOS sous-jacent et ne peuvent pas être acheminés via un endpoint de proxy personnalisé.</div>

[1]: /fr/getting_started/site/

{{% /tab %}}

{{% tab "Browser" %}}

Transmettez les options de configuration à `DatadogBrowserFlagging.init()`.

### Proxy de configuration des flags {#flag-configuration-proxy-3}

Pour acheminer le téléchargement de la configuration des flags via votre proxy, définissez `flaggingProxy` sur l'URL de votre endpoint de proxy. Le SDK envoie une requête POST avec le contexte d'évaluation dans le corps directement à cette URL, en remplaçant l'endpoint CDN Datadog par défaut.

{{< code-block lang="javascript" filename="index.js" >}}
import { DatadogBrowserFlagging } from '@datadog/browser-flagging';

DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
});
{{< /code-block >}}

Votre proxy doit transférer cette requête vers le CDN Datadog : `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (remplacez le sous-domaine selon les besoins pour votre [site Datadog][1]). Transmettez le corps de la requête et les en-têtes sans modification. Le SDK inclut automatiquement les en-têtes `dd-client-token` et `dd-application-id`.

Pour ajouter des en-têtes personnalisés à la requête de configuration des flags (par exemple, pour l'authentification à votre proxy), utilisez `customHeaders` :

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    customHeaders: { 'X-Proxy-Token': '<YOUR_PROXY_TOKEN>' },
});
{{< /code-block >}}

### Proxy de téléversement d'événements {#event-upload-proxy-3}

Les données d'événement des flags du navigateur (expositions et évaluations) sont envoyées via le pipeline d'ingestion standard du SDK Browser. Pour acheminer ce trafic via un proxy, définissez l'option `proxy` sur une URL de votre domaine.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

Le SDK ajoute un paramètre de requête `ddforward` à chaque requête envoyée à votre proxy. Ce paramètre contient le chemin et la chaîne de requête encodés en URL vers lesquels votre proxy doit effectuer le transfert. Exemple :

```
POST https://proxy.example.com/intake?ddforward=%2Fapi%2Fv2%2Fexposures%3Fddsource%3Dbrowser...
```

Votre proxy décode la valeur `ddforward` et construit l'URL d'ingestion Datadog :

```
https://browser-intake-datadoghq.com/api/v2/exposures?ddsource=browser...
```

L'origine de l'ingestion varie selon le [site Datadog][1]. Par exemple, pour `datadoghq.eu`, il s'agit de `https://browser-intake-datadoghq.eu`. Transférez le corps de la requête POST sans modification et ajoutez un en-tête `X-Forwarded-For` avec l'adresse IP du client pour une géolocalisation précise. Supprimez tout en-tête sensible tel que `cookie` avant le transfert.

L'option `proxy` accepte également une fonction qui reçoit les `path` et `parameters` décodés et renvoie l'URL complète du proxy. Consultez [Proxy Browser RUM Data][2] pour la signature complète de la fonction.

[1]: /fr/getting_started/site/
[2]: /fr/real_user_monitoring/guide/proxy-rum-data/

{{% /tab %}}

{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}