---
algolia:
  tags:
  - browser logs
aliases:
- /fr/logs/log_collection/web_browser
title: Collecte de logs à partir des navigateurs
---
Envoyez des logs à Datadog depuis des pages Web grâce au SDK de collecte de logs à partir des navigateurs.

Utilisez le SDK de collecte de logs à partir des navigateurs afin d'envoyer des logs directement à Datadog depuis des pages Web. Vous pourrez notamment :

- Utilisez le SDK comme un journal de logs. Tout est transféré à Datadog sous forme de documents JSON.
- Ajoutez `context` et des attributs personnalisés supplémentaires à chaque journal de logs envoyé.
- Encapsulez et transférez automatiquement chaque erreur frontend.
- Transférez les erreurs frontend.
- Enregistrez les adresses IP réelles des clients et les agents utilisateurs.
- Utilisation optimisée du réseau avec des envois en masse automatiques.
- Utilisez dans les environnements Worker et Service Worker.

**Notes**:

- **Indépendant du SDK RUM** : Le SDK des journaux du navigateur peut être utilisé sans le SDK RUM.
- **Environnements Worker** : Le SDK des journaux du navigateur fonctionne dans les environnements Worker et Service Worker en utilisant les mêmes méthodes de configuration. Cependant, les journaux envoyés depuis les environnements Worker n'incluent pas automatiquement les informations de session.

## Configuration {#setup}

### Étape 1 - Créez un jeton client {#step-1-create-a-client-token}

Dans Datadog, accédez à [**Paramètres de l'organisation > Nouveaux jetons clients**][1]

**Environnements pris en charge** : Le SDK des journaux du navigateur prend en charge tous les navigateurs modernes de bureau et mobiles, ainsi que les environnements Worker et Service Worker. Consultez le tableau [Support des navigateurs][4].

<div class="alert alert-info">Pour des raisons de sécurité, <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">les clés API</a> ne peuvent pas être utilisées pour configurer le SDK des journaux du navigateur, car elles seraient exposées côté client dans le code JavaScript. Pour collecter des journaux à partir des navigateurs web, un <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">jeton client</a> doit être utilisé.</div>  

### Étape 2 - Installez le SDK des journaux du navigateur {#step-2-install-the-logs-browser-sdk}

Choisissez la méthode d'installation pour le SDK des journaux du navigateur.

{{< tabs >}}
{{% tab "NPM" %}}

Pour les applications web modernes, Datadog recommande d'installer via le gestionnaire de paquets Node (npm). Le SDK du navigateur est emballé avec le reste de votre code JavaScript frontend. Il n'a aucun impact sur les performances de chargement de la page. Cependant, le SDK peut ne pas capturer les erreurs ou les journaux de la console qui se produisent avant que le SDK ne soit initialisé. Datadog recommande d'utiliser une version correspondante avec le SDK des journaux du navigateur.  

Ajoutez [`@datadog/browser-logs`][13] à votre fichier `package.json`. Par exemple, si vous utilisez npm cli.  

[13]: https://www.npmjs.com/package/@datadog/browser-logs

{{% /tab %}}
{{% tab "CDN async" %}}

Les applications web avec des objectifs de performance devraient être installées via CDN de manière asynchrone. Le SDK des journaux du navigateur se charge depuis le CDN de Datadog de manière asynchrone, garantissant qu'il n'impacte pas les performances de chargement de la page. Cependant, le SDK peut ne pas capturer les erreurs ou les journaux de la console qui se produisent avant que le SDK ne soit initialisé.  

Ajoutez l'extrait de code généré dans le tag head de toutes les pages HTML que vous souhaitez surveiller dans votre application.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="gov,gov2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v7.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Pour collecter tous les événements, installez-le via CDN de manière synchrone. Le SDK des journaux du navigateur se charge depuis le CDN de Datadog de manière synchrone, garantissant que le SDK se charge en premier et collecte toutes les erreurs, ressources et actions des utilisateurs. Cette méthode peut impacter les performances de chargement de la page.  

Ajoutez le code généré dans la balise head (devant toutes les autres balises script) de chaque page HTML que vous souhaitez surveiller dans votre application. Placer la balise script plus haut et la charger de manière synchrone garantit que Datadog RUM peut collecter toutes les données de performance et les erreurs.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="gov,gov2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v7.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Étape 3 - Initialiser le SDK des journaux du navigateur {#step-3-initialize-the-logs-browser-sdk}

Le SDK doit être initialisé le plus tôt possible dans le cycle de vie de l'application. Cela garantit que tous les journaux sont capturés correctement.

Dans le code d'initialisation, définissez le jeton client et le site. Voir la liste complète des [paramètres d'initialisation][4].

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
});

```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
<script>
  window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
  })
</script>
```

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
<script>
    window.DD_LOGS && window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
</script>
```

{{% /tab %}}
{{< /tabs >}}

#### Configurer le consentement au suivi (conformité RGPD) {#configure-tracking-consent-gdpr-compliance}

Pour être conforme au RGPD, au CCPA et à des réglementations similaires, le SDK RUM Browser vous permet de fournir la [valeur de consentement au suivi lors de l'initialisation][5].

#### Configurer la politique de sécurité du contenu (CSP) {#configure-content-security-policy-csp}

Si vous utilisez l'intégration de la politique de sécurité du contenu (CSP) de Datadog sur votre site, consultez [la documentation CSP][6] pour des étapes de configuration supplémentaires.

### Étape 4 - Visualiser vos données {#step-4-visualize-your-data}

Maintenant que vous avez terminé la configuration de base pour les journaux, votre application collecte les journaux du navigateur et vous pouvez commencer à surveiller et à déboguer les problèmes en temps réel.

Visualisez les journaux dans le [Log Explorer][7].

## Utilisation {#usage}

### Journaux personnalisés {#custom-logs}

Une fois le SDK de collecte de logs à partir des navigateurs lancé, envoyez une entrée de log personnalisée directement à Datadog avec l'API :

```typescript
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

#### Résultats {#results}

Les résultats sont les mêmes que vous utilisiez NPM, CDN asynchrone ou CDN synchrone :

```json
{
  "status": "info",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "date": 1234567890000,
  "origin": "logger",
  "http": {
    "useragent": "Mozilla/5.0 ...",
  },
  "view": {
    "url": "https://...",
    "referrer": "https://...",
  },
  "network": {
    "client": {
      "geoip": {...}
      "ip": "xxx.xxx.xxx.xxx"
    }
  }
}
```

Le SDK des journaux ajoute par défaut les informations suivantes (d'autres champs peuvent être ajoutés si le SDK RUM est
présent) :

- `date`
- `view.url`
- `view.referrer`
- `session_id` (uniquement si une session est utilisée)

Le backend Datadog ajoute d'autres champs, notamment :

- `http.useragent`
- `network.client.ip`

### Suivi des erreurs {#error-tracking}

Le SDK des journaux du navigateur Datadog permet un suivi manuel des erreurs en utilisant le paramètre optionnel `error` (disponible dans le SDK v4.36.0+). Lorsqu'une instance d'une [erreur JavaScript][8] est fournie, le SDK extrait les informations pertinentes (type, message, trace de la pile) de l'erreur.

```typescript
logger.{debug|info|warn|error}(message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  datadogLogs.logger.error('Error occurred', {}, ex)
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  window.DD_LOGS.onReady(function () {
    window.DD_LOGS.logger.error('Error occurred', {}, ex)
  })
}
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

#### Résultats {#results-1}

Les résultats sont les mêmes que vous utilisiez NPM, CDN asynchrone ou CDN synchrone :

```json
{
  "status": "error",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "message": "Error occurred",
  "date": 1234567890000,
  "origin": "logger",
  "error" : {
    "message": "Wrong behavior",
    "kind" : "Error",
    "stack" : "Error: Wrong behavior at <anonymous> @ <anonymous>:1:1"
  },
  ...
}
```

### Fonction de journalisation générique {#generic-logger-function}

Le SDK des journaux de navigateur Datadog ajoute des fonctions abrégées (`.debug`, `.info`, `.warn`, `.error`) aux enregistreurs pour plus de commodité. Une fonction d'enregistreur générique est également disponible, exposant le paramètre `status` :

```typescript
log(message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

#### Espaces réservés {#placeholders}

Les placeholders dans les exemples ci-dessus sont décrits ci-dessous :

| Espace réservé         | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Le message de votre journal qui est entièrement indexé par Datadog.                               |
| `<JSON_ATTRIBUTES>` | Un objet JSON valide, qui inclut tous les attributs attachés au `<MESSAGE>`.         |
| `<STATUS>`          | Le statut de votre journal ; les valeurs de statut acceptées sont `debug`, `info`, `warn` ou `error`. |
| `<ERROR>`           | Une instance d'un objet [JavaScript Error][8].                                         |

## Utilisation avancée {#advanced-usage}

### Éliminer les données sensibles de vos journaux de navigateur {#scrub-sensitive-data-from-your-browser-logs}

Si vos journaux de navigateur contiennent des informations sensibles qui doivent être supprimées, configurez le SDK des journaux du navigateur pour éliminer les séquences sensibles en utilisant le `beforeSend` callback lors de l'initialisation du collecteur de journaux de navigateur.

La fonction de callback `beforeSend` peut être invoquée avec deux arguments : l'événement `log` et `context`. Cette fonction vous donne accès à chaque journal collecté par le SDK des journaux du navigateur avant qu'il ne soit envoyé à Datadog, et vous permet d'utiliser le contexte pour ajuster les propriétés de tout journal. Le contexte contient des informations supplémentaires liées à l'événement, mais pas nécessairement incluses dans l'événement. Vous pouvez généralement utiliser ces informations pour [enrichir][11] votre événement ou [le rejeter][12].

```javascript
function beforeSend(log, context)
```

Les valeurs potentielles `context` sont :

| Valeur | Type de données | Cas d'utilisation |
|-------|---------|------------|
| `isAborted` | Booléen | Pour les événements de journal réseau, cette propriété vous indique si la requête échouée a été annulée par l'application, auquel cas vous pourriez ne pas vouloir envoyer cet événement car il peut avoir été intentionnellement annulé. |
| `handlingStack` | Chaîne | Une trace de pile de l'endroit où l'événement de journal a été traité. Cela peut être utilisé pour identifier de quel [micro-frontend][9] le journal a été envoyé. |

Pour censurer des adresses e-mail dans les URL de votre application Web :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // remove email from view url
        log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

Les propriétés suivantes sont automatiquement recueillies par le SDK et peuvent contenir des informations sensibles :

| Attribut       | Type   | Description                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Chaîne | L'URL de la page web active.                                                                  |
| `view.referrer` | Chaîne | L'URL de la page web précédente à partir de laquelle un lien vers la page actuellement demandée a été suivi. |
| `message`       | Chaîne | Le contenu du journal.                                                                          |
| `error.stack`   | Chaîne | La trace de la pile ou des informations complémentaires sur l'erreur.                                    |
| `http.url`      | Chaîne | L'URL HTTP.                                                                                    |

### Ignorer des journaux spécifiques {#discard-specific-logs}

La `beforeSend` callback vous permet également d'ignorer un journal avant qu'il ne soit envoyé à Datadog.

Pour supprimer des erreurs réseau avec le code 404 :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // discard 404 network errors
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    })
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

### Définir plusieurs enregistreurs {#define-multiple-loggers}

Le SDK Datadog de collecte de logs à partir des navigateurs contient un logger par défaut, mais vous pouvez également définir d'autres loggers.

#### Créer un nouvel enregistreur {#create-a-new-logger}

Après l'initialisation du SDK des enregistreurs du navigateur Datadog, utilisez l'API `createLogger` pour définir un nouvel enregistreur :

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Remarque** : Ces paramètres peuvent être définis avec les API [setLevel](#filter-by-status), [setHandler](#change-the-destination) et [setContext](#overwrite-context).

#### Obtenir un enregistreur personnalisé {#get-a-custom-logger}

Une fois votre logger créé, accédez-y dans n'importe quelle partie de votre code JavaScript avec l'API :

```typescript
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

Par exemple, supposons qu'il y ait un `signupLogger`, défini avec tous les autres enregistreurs :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

Vous pouvez ensuite l'utiliser dans une autre partie du code avec :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN async" %}}

Par exemple, supposons qu'il y ait un `signupLogger`, défini avec tous les autres enregistreurs :

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

Vous pouvez ensuite l'utiliser dans une autre partie du code avec :

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Par exemple, supposons qu'il y ait un `signupLogger`, défini avec tous les autres enregistreurs :

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

Vous pouvez ensuite l'utiliser dans une autre partie du code avec :

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

### Écraser le contexte {#overwrite-context}

#### Contexte global {#global-context}

Une fois le SDK Datadog de collecte de logs à partir des navigateurs lancé, vous pouvez :

- Définissez l'ensemble du contexte pour tous vos enregistreurs avec l'API `setGlobalContext (context: object)`.
- Ajoutez un contexte à tous vos enregistreurs avec l'API `setGlobalContextProperty (key: string, value: any)`.
- Obtenez l'ensemble du contexte global avec l'API `getGlobalContext ()`.
- Supprimer la propriété de contexte avec l'API `removeGlobalContextProperty (key: string)`.
- Effacez toutes les propriétés de contexte existantes avec l'API `clearGlobalContext ()`.

> Le SDK Log Browser v4.17.0 a mis à jour les noms de plusieurs API :
>
> - `getGlobalContext` au lieu de `getLoggerGlobalContext`
> - `setGlobalContext` au lieu de `setLoggerGlobalContext`
> - `setGlobalContextProperty` au lieu de `addLoggerGlobalContext`
> - `removeGlobalContextProperty` au lieu de `removeLoggerGlobalContext`

{{< tabs >}}
{{% tab "NPM" %}}

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setGlobalContext({ env: 'staging' })

datadogLogs.setGlobalContextProperty('referrer', document.referrer)

datadogLogs.getGlobalContext() // => {env: 'staging', referrer: ...}

datadogLogs.removeGlobalContextProperty('referrer')

datadogLogs.getGlobalContext() // => {env: 'staging'}

datadogLogs.clearGlobalContext()

datadogLogs.getGlobalContext() // => {}
```

{{% /tab %}}
{{% tab "CDN async" %}}

Pour CDN asynchrone, utilisez :

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContext({ env: 'staging' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeGlobalContextProperty('referrer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearGlobalContext()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {}
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexte utilisateur {#user-context}

Le SDK des journaux Datadog fournit des fonctions pratiques pour associer un `User` avec les journaux générés.

- Définissez l'utilisateur pour tous vos enregistreurs avec l'API `setUser (newUser: User)`.
- Ajoutez ou modifiez une propriété utilisateur pour tous vos enregistreurs avec l'API `setUserProperty (key: string, value: any)`.
- Obtenez l'utilisateur actuellement stocké avec l'API `getUser ()`.
- Supprimez une propriété utilisateur avec l'API `removeUserProperty (key: string)`.
- Effacez toutes les propriétés utilisateur existantes avec l'API `clearUser ()`.

**Remarque** : Le contexte utilisateur est appliqué avant le contexte global. Ainsi, chaque propriété utilisateur incluse dans le contexte global remplacera le contexte utilisateur lors de la génération des journaux.

{{< tabs >}}
{{% tab "NPM" %}}

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
datadogLogs.setUserProperty('type', 'customer')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

datadogLogs.removeUserProperty('type')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

datadogLogs.clearUser()
datadogLogs.getUser() // => {}
```

{{% /tab %}}
{{% tab "CDN async" %}}

Pour CDN asynchrone, utilisez :

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUserProperty('type', 'customer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeUserProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearUser()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {}
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexte de compte {#account-context}

Le SDK des journaux Datadog fournit des fonctions pratiques pour associer un `Account` avec les journaux générés.

- Définissez le compte pour tous vos enregistreurs avec l'API `setAccount (newAccount: Account)`.
- Ajoutez ou modifiez une propriété de compte pour tous vos enregistreurs avec l'API `setAccountProperty (key: string, value: any)`.
- Obtenez le compte actuellement stocké avec l'API `getAccount ()`.
- Supprimez une propriété de compte avec l'API `removeAccountProperty (key: string)`.
- Effacez toutes les propriétés de compte existantes avec l'API `clearAccount ()`.

**Remarque** : Le contexte de compte est appliqué avant le contexte global. Ainsi, chaque propriété de compte incluse dans le contexte global remplacera le contexte de compte lors de la génération des journaux.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setAccount({ id: '1234', name: 'My Company Name' })
datadogLogs.setAccountProperty('type', 'premium')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

datadogLogs.removeAccountProperty('type')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name'}

datadogLogs.clearAccount()
datadogLogs.getAccount() // => {}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccountProperty('type', 'premium')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeAccountProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearAccount()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {}
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

#### Cycle de vie des contextes {#contexts-life-cycle}

Par défaut, les contextes sont stockés dans la mémoire de la page actuelle, ce qui signifie qu'ils ne sont pas :

- conservés après un rechargement complet de la page
- partagés entre différents onglets ou fenêtres de la même session

Pour les ajouter à tous les événements de la session, ils doivent être joints à chaque page.

Avec l'introduction de l'option de configuration `storeContextsAcrossPages` dans la version 4.49.0 du SDK du navigateur, ces contextes peuvent être stockés dans [`localStorage`][9], permettant les comportements suivants :

- Les contextes sont préservés après un rechargement complet
- Les contextes sont synchronisés entre les onglets ouverts sur la même origine

Cependant, cette fonctionnalité présente certaines **limitations** :

- Il n'est pas recommandé de définir des informations personnellement identifiables (PII) dans ces contextes, car les données stockées dans `localStorage` survivent à la session utilisateur
- La fonctionnalité est incompatible avec les options `trackSessionAcrossSubdomains` car les données `localStorage` ne sont partagées qu'entre la même origine (login.site.com ≠ app.site.com)
- `localStorage` est limité à 5 MiB par origine, donc les données spécifiques à l'application, les contextes Datadog et d'autres données tierces stockées dans `localStorage` doivent être dans cette limite pour éviter tout problème

#### Contexte de l'enregistreur {#logger-context}

Une fois votre logger créé, vous pouvez :

- Définissez l'ensemble du contexte pour votre enregistreur avec l'API `setContext (context: object)`.
- Définissez une propriété de contexte sur votre enregistreur avec l'API `setContextProperty (key: string, value: any)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

### Filtrer par statut {#filter-by-status}

Une fois le SDK Datadog de collecte de logs à partir des navigateurs lancé, définissez le niveau de log minimum pour votre logger avec l'API :

```typescript
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Seuls les logs avec un statut égal ou supérieur au niveau indiqué sont envoyés.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

### Changer la destination {#change-the-destination}

Par défaut, les enregistreurs créés par le SDK des journaux du navigateur Datadog envoient des journaux à Datadog. Après l'initialisation du SDK des journaux du navigateur Datadog, il est possible de configurer l'enregistreur pour :

- envoyer des journaux au `console` et à Datadog (`http`)
- envoyer des journaux uniquement au `console`
- ne pas envoyer de journaux du tout (`silent`)

```typescript
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**Remarque** : Les appels API précoces doivent être enveloppés dans le `window.DD_LOGS.onReady()` rappel. Cela garantit que le code n'est exécuté qu'une fois que le SDK est correctement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Remarque** : La vérification `window.DD_LOGS` empêche les problèmes lorsqu'un échec de chargement se produit avec le SDK.

{{% /tab %}}
{{< /tabs >}}

### Consentement au suivi des utilisateurs {#user-tracking-consent}

Pour répondre aux exigences du RGPD, le CCPA et dʼautres régulations similaires, le SDK de collecte de logs vous permet de fournir la valeur de consentement au suivi à son initialisation.

Le paramètre d'initialisation `trackingConsent` peut être l'une des valeurs suivantes :

1. `"granted"` : Le SDK des journaux du navigateur commence à collecter des données et les envoie à Datadog.
2. `"not-granted"` : Le SDK des journaux du navigateur ne collecte aucune donnée.

Pour changer la valeur du consentement au suivi après l'initialisation du SDK des journaux du navigateur, utilisez l'appel API `setTrackingConsent()`. Le SDK des journaux du navigateur change son comportement en fonction de la nouvelle valeur :

- lorsqu'il est changé de `"granted"` à `"not-granted"`, la session de journaux est arrêtée et les données ne sont plus envoyées à Datadog.
- lorsqu'il est changé de `"not-granted"` à `"granted"`, une nouvelle session de journaux est créée si aucune session précédente n'est active, et la collecte de données reprend.

Cet état n'est pas synchronisé entre les onglets ni conservé entre les navigations. Il est de votre responsabilité de fournir la décision de l'utilisateur lors de l'initialisation du SDK des journaux du navigateur ou en utilisant `setTrackingConsent()`.

Lorsque `setTrackingConsent()` est utilisé avant `init()`, la valeur fournie prend le pas sur le paramètre d'initialisation.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogLogs.setTrackingConsent('granted');
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS.onReady(function() {
        window.DD_LOGS.setTrackingConsent('granted');
    });
});
```

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

{{% /tab %}}
{{< /tabs >}}

### Accéder au contexte interne {#access-internal-context}

Après l'initialisation du SDK des journaux du navigateur Datadog, vous pouvez accéder au contexte interne du SDK. Cela vous permet d'accéder au `session_id`.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

Vous pouvez optionnellement utiliser le paramètre `startTime` pour obtenir le contexte d'un moment spécifique. Si le paramètre est omis, le contexte actuel est renvoyé.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}
{{< /tabs >}}

<!-- Note: all URLs should be absolute -->

[1]: https://app.datadoghq.com/organization-settings/client-tokens
[4]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-logs.LogsInitConfiguration.html
[5]: /fr/logs/log_collection/javascript/#user-tracking-consent
[6]: /fr/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[7]: /fr/logs/explorer/
[8]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[11]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[12]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#discard-a-rum-event