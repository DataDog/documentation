---
aliases:
  - /fr/logs/log_collection/web_browser
dependencies:
  - 'https://github.com/DataDog/browser-sdk/blob/main/packages/logs/README.md'
kind: documentation
title: Collecte de logs à partir des navigateurs
---
Envoyez des logs à Datadog à partir de navigateurs Web ou d'autres clients Javascript avec le SDK de collecte de logs à partir des navigateurs.

Utilisez le SDK de collecte de logs à partir des navigateurs afin d'envoyer des logs directement à Datadog depuis les clients JS. Vous pourrez notamment :

- Utiliser le SDK en tant que logger ; tous les logs sont transmis à Datadog sous forme de documents JSON
- Ajouter du contexte et des attributs personnalisés supplémentaires pour chaque log envoyé
- Incorporer et transmettre automatiquement chaque erreur frontend
- Transmettre les erreurs frontend
- Enregistrer l'adresse IP et le user agent réels du client
- Optimiser l'utilisation du réseau grâce aux envois groupés automatiques

## Configuration

**Token client Datadog** : pour des raisons de sécurité, les [clés d'API][1] ne peuvent pas être utilisées pour configurer la le SDK de collecte de logs à partir des navigateurs, car elles seraient exposées côté client dans le code JavaScript. Pour recueillir des logs depuis un navigateur Web, vous devez utiliser un [token client][2]. Consultez la [documentation relative aux tokens client][2] pour en savoir plus.

**SDK Datadog de collecte de logs à partir des navigateurs** : configurez le SDK via [NPM](#npm) ou utilisez les extraits de code [CDN asynchrone](#cdn-asynchrone) ou [CDN synchrone](#cdn-synchrone) dans le tag head.

**Navigateurs pris en charge** : le SDK Browser prend en charge tous les navigateurs modernes pour ordinateurs et appareils mobiles, y compris IE11. Consultez le tableau des [navigateurs pris en charge][4].

### Choisir la bonne méthode d'installation

| Méthode d'installation        | Cas d'utilisation                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm (node package manager) | Cette méthode est recommandée pour les applications Web modernes. Le SDK de collecte de logs à partir des navigateurs est inclus dans le package avec le reste de votre code JavaScript frontend. Les performances de chargement des pages ne sont pas affectées. Le SDK peut toutefois omettre les erreurs, les ressources et les actions utilisateur déclenchées avant l'initialisation du SDK. **Remarque :** si vous avez recours au SDK RUM, il est recommandé d'utiliser une version correspondante. |
| CDN asynchrone                  | Cette méthode est recommandée pour les applications Web devant satisfaire des objectifs de performance. Le SDK de collecte de logs à partir des navigateurs est chargé à partir de notre CDN de façon asynchrone : ainsi, le téléchargement du SDK n'affecte pas les performances de chargement des pages. Le SDK peut toutefois omettre les erreurs, les ressources et les actions utilisateur déclenchées avant l'initialisation du SDK.                                                  |
| CDN synchrone                   | Cette méthode est recommandée pour recueillir tous les événements RUM. Le SDK de collecte de logs à partir des navigateurs est chargé à partir de notre CDN de façon synchrone : ainsi, le SDK est chargé en premier et recueille toutes les erreurs, ressources et actions utilisateur. Cette méthode peut avoir un impact sur les performances de chargement des pages.                                                                                                      |

### NPM

Après avoir ajouté [`@datadog/browser-logs`][3] à votre fichier `package.json`, lancez la bibliothèque avec :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  site: '<SITE_DATADOG>',
  forwardErrorsToLogs: true,
  sampleRate: 100,
})
```

### CDN asynchrone

Chargez et configurez le SDK dans la section head de vos pages.

<!-- prettier-ignore -->
```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: 'XXX',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

### CDN synchrone

Pour recevoir tous les logs et toutes les erreurs, chargez et configurez le SDK au début de la section head de vos pages.

```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<TOKEN_CLIENT>',
          site: '<SITE_DATADOG>',
          forwardErrorsToLogs: true,
          sampleRate: 100,
        })
    </script>
  </head>
</html>
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### TypeScript

Les types sont compatibles avec TypeScript >= 3.0. Pour les versions antérieures, importez les sources JS et utilisez des variables globales pour éviter tout problème de compilation :

```typescript
import '@datadog/browser-logs/bundle/datadog-logs'

window.DD_LOGS.init({
  clientToken: '<TOKEN_CLIENT>',
  site: '<SITE_DATADOG>',
  forwardErrorsToLogs: true,
  sampleRate: 100,
})
```

## Configuration

### Paramètres de lancement

Les paramètres suivants peuvent être utilisés pour configurer l'envoi des logs à Datadog avec le SDK Datadog de collecte de logs à partir des navigateurs :

| Paramètre             | Type    | Obligatoire | Valeur par défaut         | Description                                                                                              |
| --------------------- | ------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| `clientToken`         | Chaîne  | Oui      |                 | Un [token client Datadog][2].                                                                             |
| `site`                | Chaîne  | Oui      | `datadoghq.com` | Le site Datadog associé à votre organisation. Site américain : `datadoghq.com`. Site européen : `datadoghq.eu`.                           |
| `service`             | Chaîne  | Non       |                 | Le nom de service pour votre application.                                                                   |
| `env`                 | Chaîne  | Non       |                 | L'environnement de l'application, par exemple : prod, pre-prod, staging, etc.                                |
| `version`             | Chaîne  | Non       |                 | La version de l'application, par exemple : 1.2.3, 6c44da20, 2020.02.13, etc.                                |
| `forwardErrorsToLogs` | Booléen | Non       | `true`          | Définissez ce paramètre sur `false` pour désactiver l'envoi des logs console.error, des exceptions non interceptées et des erreurs réseau à Datadog. |
| `sampleRate`          | Nombre  | Non       | `100`           | Le pourcentage de sessions à surveiller : `100` (toutes les sessions) et `0` (aucune session). Seules les sessions surveillées envoient des logs.       |
| `silentMultipleInit`  | Booléen | Non       |                 | Permet d'empêcher le logging des erreurs lorsqu'il y a plusieurs init.                                                       |

Options qui doivent avoir une configuration correspondante lors de l'utilisation du SDK `RUM` :

| Paramètre                      | Type    | Obligatoire | Valeur par défaut | Description                                                                                                                                                  |
| ------------------------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `trackSessionAcrossSubdomains` | Booléen | Non       | `false` | Préserver la session pour tous les sous-domaines d'un même site.                                                                                                    |
| `useSecureSessionCookie`       | Booléen | Non       | `false` | Utiliser un cookie de session sécurisé. Ce paramètre désactive les logs envoyés sur des connexions non sécurisées (connexions non HTTPS).                                                                    |
| `useCrossSiteSessionCookie`    | Booléen | Non       | `false` | Utilise un cookie de session intersite sécurisé. Cela permet l'exécution du SDK logs lorsque le site est chargé à partir d'un autre site (iframe). Implique l'utilisation de `useSecureSessionCookie`. |

## Utilisation

### Logs personnalisés

Une fois le SDK Datadog de collecte de logs à partir des navigateurs lancé, envoyez une entrée de log personnalisée directement à Datadog avec l'API :

```
logger.debug | info | warn | error (message: string, messageContext = Context)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

#### CDN asynchrone

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

```javascript
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

#### Résultats

Les résultats sont les mêmes que vous utilisez NPM, CDN asynchrone ou CDN synchrone :

```json
{
  "status": "info",
  "session_id": "1234",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "http": {
    "url": "...",
    "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36"
  },
  "network": { "client": { "ip": "109.30.xx.xxx" } }
}
```

Le logger ajoute les informations suivantes par défaut :

- `view.url`
- `session_id`
- `http.useragent`
- `network.client.ip`

### Paramètre status

Une fois le SDK Datadog de collecte de logs à partir des navigateurs lancé, envoyez une entrée de log personnalisée directement à Datadog avec l'API en utilisant le statut comme paramètre :

```
log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')
```

#### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
DD_LOGS.onReady(function() {
  DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
```

#### Placeholders

Les placeholders dans les exemples ci-dessus sont décrits plus bas :

| Placeholder         | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Le message de votre log qui est complètement indexé par Datadog.                               |
| `<ATTRIBUTS_JSON>` | Un objet JSON valide qui comprend tous les attributs joints au `<MESSAGE>`.         |
| `<STATUT>`          | Le statut de votre log. Les valeurs de statut acceptées sont `debug`, `info`, `warn` ou `error`. |

## Utilisation avancée

### Nettoyer les données sensibles de vos logs recueillis à partir des navigateurs

Si vos logs recueillis à partir des navigateurs contiennent des informations confidentielles que vous souhaitez censurer, configurez le SDK Browser pour nettoyer les séquences sensibles en utilisant le rappel `beforeSend` à l'initialisation du collecteur de logs.

La fonction de rappel `beforeSend` vous permet d'accéder à chaque événement recueilli par le SDK Browser avant qu'il ne soit envoyé à Datadog. De plus, elle vous aide à mettre à jour les propriétés généralement censurées.

Par exemple, pour censurer les adresses e-mail de vos URL d'applications Web :

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (event) => {
        // supprimer l'adresse e-mail de l'URL de la vue
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
    },
    ...
});
```

#### CDN asynchrone

```javascript
DD_LOGS.onReady(function() {
    DD_LOGS.init({
        ...,
        beforeSend: (event) => {
            // supprimer l'adresse e-mail de l'URL de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
        },
        ...
    })
})
```

#### CDN synchrone

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (event) => {
            // supprimer l'adresse e-mail de l'URL de la vue
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
        },
        ...
    });
```

Vous pouvez modifier les propriétés d'événement suivantes :

| Attribut       | Type   | Description                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Chaîne | L'URL de la page Web active.                                                                  |
| `view.referrer` | Chaîne | L'URL de la page web précédente, à partir de laquelle un lien vers la page demandée à été sélectionné. |
| `message`       | Chaîne | Le contenu du log.                                                                          |
| `error.stack`   | Chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.                                    |
| `http.url`      | Chaîne | L'URL HTTP.                                                                                    |

**Remarque** : le SDK Browser ne tient pas compte des modifications apportées aux propriétés d'événement non répertoriées ci-dessus. Pour en savoir plus les propriétés d'événement, consultez le [référentiel du SDK Browser][5].

### Définir plusieurs loggers

Le SDK Browser Datadog contient un logger par défaut, mais vous pouvez également définir d'autres loggers.

#### Créer un logger

Une fois le SDK Browser Datadog lancé, utilisez l'API `createLogger` pour définir un nouveau logger :

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Remarque** : ces paramètres peuvent également être définis avec les API [setLevel](#filtrer-par-statut), [setHandler](#modifier-la-destination) et [setContext](#remplacer-le-contexte).

#### Accéder à un logger personnalisé

Une fois votre logger créé, accédez-y dans n'importe quelle partie de votre code JavaScript avec l'API :

```typescript
getLogger(name: string)
```

##### NPM

Par exemple, imaginons que vous disposez d'un `signupLogger`, défini avec tous les autres loggers :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
```

Vous pouvez à présent l'utiliser dans une autre partie du code avec :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

#### CDN asynchrone

Par exemple, imaginons que vous disposez d'un `signupLogger`, défini avec tous les autres loggers :

```javascript
DD_LOGS.onReady(function () {
  const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
})
```

Vous pouvez à présent l'utiliser dans une autre partie du code avec :

```javascript
DD_LOGS.onReady(function () {
  const signupLogger = DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Par exemple, imaginons que vous disposez d'un `signupLogger`, défini avec tous les autres loggers :

```javascript
if (window.DD_LOGS) {
  const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
}
```

Vous pouvez à présent l'utiliser dans une autre partie du code avec :

```javascript
if (window.DD_LOGS) {
  const signupLogger = DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### Remplacer le contexte

#### Contexte global

Une fois le SDK Browser Datadog lancé, vous pouvez :

- Définir l'intégralité du contexte pour tous vos loggers avec l'API `setLoggerGlobalContext (context: Context)`
- Ajouter un contexte à l'ensemble de vos loggers avec l'API `addLoggerGlobalContext (key: string, value: any)`
- Récupérer tout le contexte global, avec l'API `getLoggerGlobalContext ()`

##### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setLoggerGlobalContext({ env: 'staging' })

datadogLogs.addLoggerGlobalContext('referrer', document.referrer)

const context = datadogLogs.getLoggerGlobalContext() // => {env: 'staging', referrer: ...}
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setLoggerGlobalContext({ env: 'staging' })
})

DD_LOGS.onReady(function () {
  DD_LOGS.addLoggerGlobalContext('referrer', document.referrer)
})

DD_LOGS.onReady(function () {
  var context = DD_LOGS.getLoggerGlobalContext() // => {env: 'staging', referrer: ...}
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && DD_LOGS.setLoggerGlobalContext({ env: 'staging' })

window.DD_LOGS && DD_LOGS.addLoggerGlobalContext('referrer', document.referrer)

var context = window.DD_LOGS && DD_LOGS.getLoggerGlobalContext() // => {env: 'staging', referrer: ...}
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

#### Contexte du logger

Une fois votre logger créé, vous pouvez :

- Définir l'intégralité du contexte pour votre logger avec l'API `setContext (context: Context)`.
- Ajouter un contexte à votre logger avec l'API `addContext (key: chaîne, value: quelconque)` :

##### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.addContext('referrer', document.referrer)
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setContext("{'env': 'staging'}")
})

DD_LOGS.onReady(function () {
  DD_LOGS.addContext('referrer', document.referrer)
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer)
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### Filtrer par statut

Une fois le SDK Browser Datadog lancé, définissez le niveau de log minimum pour votre logger avec l'API :

```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Seuls les logs avec un statut égal ou supérieur au niveau indiqué sont envoyés.

##### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<NIVEAU>')
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.setLevel('<NIVEAU>')
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && DD_LOGS.logger.setLevel('<NIVEAU>')
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### Modifier la destination

Par défaut, les loggers créés par le SDK Browser Datadog envoient les logs à Datadog. Une fois le SDK lancé, il est possible de configurer le logger de façon à ce que les logs soient envoyés à la `console` ou qu'ils ne soient pas envoyés du tout (`silent`) avec l'API :

```
setHandler (handler?: 'http' | 'console' | 'silent')
```

##### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.setHandler('<GESTIONNAIRE>')
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && DD_LOGS.logger.setHandler('<HANDLER>')
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

[1]: /fr/account_management/api-app-keys/#api-keys
[2]: /fr/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/src/logsEvent.types.ts
