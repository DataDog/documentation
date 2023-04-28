---
aliases:
- /fr/logs/log_collection/web_browser
dependencies:
- https://github.com/DataDog/browser-sdk/blob/main/packages/logs/README.md
kind: documentation
title: Collecte de logs à partir des navigateurs
---
Envoyez des logs à Datadog depuis des pages Web grâce au SDK de collecte de logs à partir des navigateurs.

Utilisez le SDK de collecte de logs à partir des navigateurs afin d'envoyer des logs directement à Datadog depuis des pages Web. Vous pourrez notamment :

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
  sessionSampleRate: 100,
})
```

### CDN asynchrone

Chargez et configurez le SDK dans la section head de vos pages.

<!-- prettier-ignore -->
```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v4.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: 'XXX',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true, 
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel DD_LOGS.onReady(). De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

### CDN synchrone

Pour recevoir tous les logs et toutes les erreurs, chargez et configurez le SDK au début de la section head de vos pages.

```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<TOKEN_CLIENT>',
          site: '<SITE_DATADOG>',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### TypeScript

Les types sont compatibles avec TypeScript >= 3.8.2. Pour les versions antérieures, importez les sources JS et utilisez des variables globales pour éviter tout problème de compilation :

```typescript
import '@datadog/browser-logs/bundle/datadog-logs'

window.DD_LOGS.init({
  clientToken: '<TOKEN_CLIENT>',
  site: '<SITE_DATADOG>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

## Configuration

### Paramètres d'initialisation

Les paramètres suivants peuvent être utilisés pour configurer l’envoi des logs à Datadog avec le SDK Datadog de collecte de logs à partir des navigateurs :

| Paramètre             | Type                                                                      | Obligatoire | Valeur par défaut         | Description                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientToken`         | Chaîne                                                                    | Oui      |                 | Un [token client Datadog][2].                                                                                                                                                          |
| `site`                | Chaîne                                                                    | Oui      | `datadoghq.com` | Le [site Datadog associé à votre organisation][9].                                                                                                                                 |
| `service`             | Chaîne                                                                    | Non       |                 | Le nom de service pour votre application. Il doit respecter les [exigences de la syntaxe des tags][7].                                                                                             |
| `env`                 | Chaîne                                                                    | Non       |                 | L’environnement de l’application, par exemple prod, pre-prod, staging, etc. Il doit respecter les [exigences de la syntaxe des tags][7].                                                         |
| `version`             | Chaîne                                                                    | Non       |                 | La version de l’application, par exemple 1.2.3, 6c44da20, 2020.02.13, etc. Elle doit respecter les [exigences de la syntaxe des tags][7].                                                          |
| `forwardErrorsToLogs` | Booléen                                                                   | Non       | `true`          | Définissez ce paramètre sur `false` pour désactiver l’envoi des logs console.error, des exceptions non interceptées et des erreurs réseau à Datadog.                                                                              |
| `forwardConsoleLogs`  | `"all"` ou un tableau de `"log"` `"debug"` `"info"` `"warn"` `"error"`      | Non       | `[]`            | Envoie les logs provenant de `console.*` à Datadog. Utilisez la valeur `"all"` pour envoyer tous les logs ou spécifiez un tableau de noms d'API de console pour transmettre uniquement un sous-ensemble.                                                |
| `forwardReports`      | `"all"` ou un tableau de `"intervention"` `"deprecation"` `"csp_violation"` | Non       | `[]`            | Envoie les rapports de l'[API Reporting][8] à Datadog. Utilisez la valeur `"all"` pour envoyer tous les rapports ou spécifiez un tableau de types de rapports pour transmettre uniquement un sous-ensemble.                                       |
| `sampleRate`          | Nombre                                                                    | Non       | `100`           | **Obsolète**, voir `sessionSampleRate`.                                                                                                                                             |
| `sessionSampleRate`   | Nombre                                                                    | Non       | `100`           | Le pourcentage de sessions à surveiller, compris entre `100` (toutes les sessions) et `0` (aucune session). Seules les sessions surveillées envoient des logs.                                                                                    |
| `silentMultipleInit`  | Booléen                                                                   | Non       |                 | Permet d’empêcher la journalisation des erreurs en cas d'initialisation multiple.                                                                                                                                    |
| `proxyUrl`            | Chaîne                                                                    | Non       |                 | L'URL du proxy (facultatif). Exemple : https://www.proxy.com/chemin. Voir le [guide sur la configuration d'un proxy][6] pour en savoir plus.                                                                        |
| `telemetrySampleRate` | Nombre                                                                    | Non       | `20`            | Les données de télémétrie (erreurs, logs de debugging) à propos de l'exécution du SDK sont envoyées à Datadog afin de détecter et de résoudre les problèmes potentiels. Définissez ce paramètre sur `0` pour désactiver la collecte de données de télémétrie. |

Les options suivantes doivent avoir une configuration correspondante lors de l’utilisation du SDK `RUM` :

| Paramètre                      | Type    | Obligatoire | Valeur par défaut | Description                                                                                                                                                  |
| ------------------------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `trackSessionAcrossSubdomains` | Booléen | Non       | `false` | Permet de préserver la session pour tous les sous-domaines d’un même site.                                                                                                    |
| `useSecureSessionCookie`       | Booléen | Non       | `false` | Permet d'utiliser un cookie de session sécurisé. Ce paramètre désactive les logs envoyés via des connexions non sécurisées (autres que HTTPS).                                                                    |
| `useCrossSiteSessionCookie`    | Booléen | Non       | `false` | Permet d'utiliser un cookie de session intersite sécurisé. Cela permet l’exécution du SDK de logs lorsque le site est chargé à partir d’un autre site (iframe). Ce paramètre nécessite l’utilisation de `useSecureSessionCookie`. |

## Utilisation

### Logs personnalisés

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, envoyez une entrée de log personnalisée directement à Datadog avec l’API :

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

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

```javascript
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

#### Résultats

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

Le SDK de logs ajoute par défaut les informations suivantes (d'autres champs peuvent être ajoutés si le SDK RUM est actif) :

- `date`
- `view.url`
- `view.referrer`
- `session_id` (uniquement si une session est active)

Le backend Datadog ajoute des champs supplémentaires, notamment :

- `http.useragent`
- `network.client.ip`

### Paramètre status

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, envoyez une entrée de log personnalisée directement à Datadog avec l’API en utilisant le statut comme paramètre :

```
log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')
```

#### NPM

Pour NPM, utilisez ce qui suit :

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez ce qui suit :

```javascript
DD_LOGS.onReady(function() {
  DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
})
```

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

Pour CDN synchrone, utilisez ce qui suit :

```javascript
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
```

#### Placeholders

Voici la description des placeholders utilisés dans les exemples ci-dessus :

| Placeholder         | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Le message de votre log qui est complètement indexé par Datadog.                               |
| `<ATTRIBUTS_JSON>` | Un objet JSON valide qui comprend tous les attributs joints au `<MESSAGE>`.         |
| `<STATUT>`          | Le statut de votre log. Les valeurs de statut acceptées sont `debug`, `info`, `warn` et `error`. |

## Utilisation avancée

### Nettoyer les données sensibles de vos logs recueillis à partir des navigateurs

Si vos logs recueillis à partir des navigateurs contiennent des informations confidentielles que vous souhaitez censurer, configurez le SDK Browser pour nettoyer les séquences sensibles en utilisant le rappel `beforeSend` à l’initialisation du collecteur de logs à partir des navigateurs.

La fonction de rappel `beforeSend` vous permet d’accéder à chaque événement recueilli par le SDK Browser avant qu’il ne soit envoyé à Datadog. De plus, vous pouvez également modifier n'importe quelle propriété.

Par exemple, pour censurer les adresses e-mail de vos URL d’applications Web, utilisez ce qui suit :

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // supprimer l'adresse e-mail de l'URL de la vue
        log.view.url = log.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
    },
    ...
});
```

#### CDN asynchrone

```javascript
DD_LOGS.onReady(function() {
    DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // supprimer l'adresse e-mail de l'URL de la vue
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
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
        beforeSend: (log) => {
            // supprimer l'adresse e-mail de l'URL de la vue
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=CENSURÉ")
        },
        ...
    });
```

Les propriétés suivantes sont automatiquement recueillies par le SDK et peuvent contenir des données sensibles :

| Attribut       | Type   | Description                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Chaîne | L’URL de la page Web active.                                                                  |
| `view.referrer` | Chaîne | L’URL de la page Web précédente, à partir de laquelle un lien vers la page demandée a été sélectionné. |
| `message`       | Chaîne | Le contenu du log.                                                                          |
| `error.stack`   | Chaîne | La stack trace ou toutes les informations complémentaires relatives à l’erreur.                                    |
| `http.url`      | Chaîne | L'URL HTTP.                                                                                    |

### Ignorer certains logs

La fonction de rappel `beforeSend` vous permet également d'ignorer un log afin qu'il ne soit pas envoyé à Datadog.

Pour ignorer les erreurs réseau dont le statut est 404, utilisez ce qui suit :

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // Ignorer les erreurs réseau 404
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

#### CDN asynchrone

```javascript
DD_LOGS.onReady(function() {
    DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // Ignorer les erreurs réseau 404
          if (log.http && log.http.status_code === 404) {
            return false
          }
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
        beforeSend: (log) => {
          // Ignorer les erreurs réseau 404
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

### Définir plusieurs loggers

Le SDK Datadog de collecte de logs à partir des navigateurs contient un logger par défaut, mais vous pouvez également définir d’autres loggers.

#### Créer un logger

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, utilisez l'API `createLogger` pour définir un nouveau logger :

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Remarque** : ces paramètres peuvent également être définis avec les API [setLevel](#filtrer-par-statut), [setHandler](#modifier-la-destination) et [setContext](#remplacer-le-contexte).

#### Accéder à un logger personnalisé

Une fois votre logger créé, accédez-y dans n’importe quelle partie de votre code JavaScript avec l’API :

```typescript
getLogger(name: string)
```

##### NPM

Par exemple, imaginons que vous disposez d’un `signupLogger`, défini avec tous les autres loggers ::

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
```

Vous pouvez à présent l’utiliser dans une autre partie du code avec :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

#### CDN asynchrone

Par exemple, imaginons que vous disposez d’un `signupLogger`, défini avec tous les autres loggers :

```javascript
DD_LOGS.onReady(function () {
  const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
})
```

Vous pouvez à présent l’utiliser dans une autre partie du code avec :

```javascript
DD_LOGS.onReady(function () {
  const signupLogger = DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Par exemple, imaginons que vous disposez d’un `signupLogger`, défini avec tous les autres loggers :

```javascript
if (window.DD_LOGS) {
  const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', { env: 'staging' })
}
```

Vous pouvez à présent l’utiliser dans une autre partie du code avec :

```javascript
if (window.DD_LOGS) {
  const signupLogger = DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### Remplacer le contexte

#### Contexte global

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, vous pouvez :

- définir l’intégralité du contexte pour tous vos loggers avec l’API `setGlobalContext (context: object)` ;
- ajouter un contexte à l’ensemble de vos loggers avec l’API `setGlobalContextProperty (key: string, value: any)` ;
- récupérer tout le contexte global avec l’API `getGlobalContext ()` ;
- supprimer une propriété de contexte avec l'API `removeGlobalContextProperty (key: string)` ;
- effacer toutes les propriétés de contexte existantes avec l'API `clearGlobalContext ()`.

> Depuis la version 4.17.0 du SDK de collecte de logs à partir des navigateurs, le nom de certaines API a été modifié :
>
> - `getGlobalContext` remplace `getLoggerGlobalContext`
> - `setGlobalContext` remplace `setLoggerGlobalContext`
> - `setGlobalContextProperty` remplace `addLoggerGlobalContext`
> - `removeGlobalContextProperty` remplace `removeLoggerGlobalContext`

##### NPM

Pour NPM, utilisez ce qui suit :

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

#### CDN asynchrone

Pour CDN asynchrone, utilisez ce qui suit :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setGlobalContext({ env: 'staging' })
})

DD_LOGS.onReady(function () {
  DD_LOGS.setGlobalContextProperty('referrer', document.referrer)
})

DD_LOGS.onReady(function () {
  DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}
})

DD_LOGS.onReady(function () {
  DD_LOGS.removeGlobalContextProperty('referrer')
})

DD_LOGS.onReady(function () {
  DD_LOGS.getGlobalContext() // => {env: 'staging'}
})

DD_LOGS.onReady(function () {
  DD_LOGS.clearGlobalContext()
})

DD_LOGS.onReady(function () {
  DD_LOGS.getGlobalContext() // => {}
})
```

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel DD_LOGS.onReady(). De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez ce qui suit :

```javascript
window.DD_LOGS && DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && DD_LOGS.clearGlobalContext()

window.DD_LOGS && DD_LOGS.getGlobalContext() // => {}
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue

#### Contexte utilisateur

Le SDK Datadog de collecte de logs fournit des fonctions pratiques permettant d'associer un `User` aux logs générés.

- Définissez l'utilisateur pour tous vos loggers avec l'API `setUser (newUser: User)`.
- Ajoutez ou modifiez une propriété utilisateur pour tous vos loggers avec l'API `setUserProperty (key: string, value: any)`.
- Récupérez l'utilisateur actuellement en mémoire avec l'API `getUser ()`.
- Supprimez une propriété utilisateur avec l'API `removeUserProperty (key: string)`.
- Effacez toutes les propriétés utilisateur existantes avec l'API `clearUser ()`.

**Remarque** : le contexte utilisateur est appliqué avant le contexte global. Ainsi, chaque propriété utilisateur incluse dans le contexte global remplace le contexte utilisateur lors de la génération des logs.

##### NPM

Pour NPM, utilisez ce qui suit :

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

#### CDN asynchrone

Pour CDN asynchrone, utilisez ce qui suit :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
})

DD_LOGS.onReady(function () {
  DD_LOGS.setUserProperty('type', 'customer')
})

DD_LOGS.onReady(function () {
  DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}
})

DD_LOGS.onReady(function () {
  DD_LOGS.removeUserProperty('type')
})

DD_LOGS.onReady(function () {
  DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}
})

DD_LOGS.onReady(function () {
  DD_LOGS.clearUser()
})

DD_LOGS.onReady(function () {
  DD_LOGS.getUser() // => {}
})
```

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel DD_LOGS.onReady(). De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez ce qui suit :

```javascript
window.DD_LOGS && DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && DD_LOGS.removeUserProperty('type')

window.DD_LOGS && DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && DD_LOGS.clearUser()

window.DD_LOGS && DD_LOGS.getUser() // => {}
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

#### Contexte du logger

Une fois votre logger créé, vous pouvez :

- définir l’intégralité du contexte pour votre logger avec l’API `setContext (context: object)` ;
- ajouter un contexte à votre logger avec l’API `addContext (key: string, value: any)`.

##### NPM

Pour NPM, utilisez ce qui suit :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.addContext('referrer', document.referrer)
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez ce qui suit :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.setContext("{'env': 'staging'}")
})

DD_LOGS.onReady(function () {
  DD_LOGS.addContext('referrer', document.referrer)
})
```

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel DD_LOGS.onReady(). De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez ce qui suit :

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer)
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### Filtrer par statut

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, définissez le niveau de log minimum pour votre logger avec l’API :

```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Seuls les logs avec un statut égal ou supérieur au niveau indiqué sont envoyés.

##### NPM

Pour NPM, utilisez ce qui suit :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<NIVEAU>')
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez ce qui suit :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.setLevel('<NIVEAU>')
})
```

**Note:** les premiers appels d’API doivent être incorporés dans le rappel `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez ce qui suit :

```javascript
window.DD_LOGS && DD_LOGS.logger.setLevel('<NIVEAU>')
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### Modifier la destination

Par défaut, les loggers créés par le SDK Datadog de collecte de logs à partir des navigateurs envoient les logs à Datadog. Une fois le SDK lancé, il est possible de configurer le logger de façon à :

- envoyer les logs à la `console` et à Datadog (`http`) ;
- envoyer les logs à la `console` uniquement ;
- n'envoyer aucun log (`silent`).

```
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

##### NPM

Pour NPM, utilisez ce qui suit :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<GESTIONNAIRE>')
datadogLogs.logger.setHandler(['<GESTIONNAIRE1>', '<GESTIONNAIRE2>'])
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez ce qui suit :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.logger.setHandler('<GESTIONNAIRE>')
  DD_LOGS.logger.setHandler(['<GESTIONNAIRE1>', '<GESTIONNAIRE2>'])
})
```

**Remarque** : les premiers appels d’API doivent être incorporés dans le rappel `DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez ce qui suit :

```javascript
window.DD_LOGS && DD_LOGS.logger.setHandler('<GESTIONNAIRE>')
window.DD_LOGS && DD_LOGS.logger.setHandler(['<GESTIONNAIRE1>', '<GESTIONNAIRE2>'])
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement du SDK échoue.

### Accéder au contexte interne

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, vous pouvez accéder au contexte interne du SDK, et notamment à `session_id`.

```
getInternalContext (startTime?: 'number' | undefined)
```

Vous avez la possibilité d'utiliser le paramètre `startTime` pour obtenir le contexte à une heure spécifique. Si le paramètre n'est pas défini, le contexte actuel est renvoyé.

##### NPM

Pour NPM, utilisez ce qui suit :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez ce qui suit :

```javascript
DD_LOGS.onReady(function () {
  DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

##### CDN synchrone

Pour CDN synchrone, utilisez ce qui suit :

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

<!-- Remarque : toutes les URL doivent être au format absolu -->

[1]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://docs.datadoghq.com/fr/real_user_monitoring/guide/enrich-and-control-rum-data/
[6]: https://docs.datadoghq.com/fr/real_user_monitoring/faq/proxy_rum_data/
[7]: https://docs.datadoghq.com/fr/getting_started/tagging/#defining-tags
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API
[9]: https://docs.datadoghq.com/fr/getting_started/site/