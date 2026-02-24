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

- Utiliser le SDK en tant que logger ; tous les logs sont transmis à Datadog sous forme de documents JSON
- Ajouter du contexte et des attributs personnalisés supplémentaires pour chaque log envoyé
- Incorporer et transmettre automatiquement chaque erreur frontend
- Transmettre les erreurs frontend
- Enregistrer l'adresse IP et le user agent réels du client
- Optimiser l'utilisation du réseau grâce aux envois groupés automatiques
- Utilisation dans les environnements Worker et Service Worker.

**Remarques** :

- **Indépendant du SDK du RUM** : Le Browser Logs SDK peut être utilisé sans le RUM SDK.
- **Environnements Worker** : le le SDK de collecte de logs à partir des navigateurs fonctionne dans les environnements Worker et Service Worker en utilisant les mêmes méthodes de configuration. Toutefois, les logs envoyés depuis les environnements Worker n'incluent pas automatiquement les informations de session.

## Configuration

### Étape 1 - Créer un token client

Dans Datadog, accédez à [**Organization Settings > New Client Tokens**][1]

**Environnements pris en charge** : le SDK de collecte de logs à partir des navigateurs prend en charge tous les navigateurs de bureau et mobiles modernes, ainsi que les environnements Worker et Service Worker. Consultez le tableau des [navigateurs pris en charge][4].

<div class="alert alert-info">Pour des raisons de sécurité, les <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">clés d'API</a> ne peuvent pas être utilisées pour configurer le SDK de collecte de logs à partir des navigateurs, car elles seraient exposées côté client dans le code JavaScript. Pour recueillir des logs à partir de navigateurs Web, un <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">token client</a> doit être utilisé.</div> 

### Étape 2 - Installer le SDK de collecte de logs à partir des navigateurs

Choisissez la méthode d'installation pour le SDK Browser. 

{{< tabs >}}
{{% tab "NPM" %}}

Pour les applications Web modernes, Datadog recommande d'effectuer l'installation via Node Package Manager (npm). Le SDK Browser est regroupé avec le reste de votre code JavaScript frontend. Il n'a aucun impact sur les performances de chargement de page. Toutefois, le SDK peut ne pas capturer les erreurs ou logs de console qui surviennent son initialisation. Datadog recommande d'utiliser une version correspondante avec le SDK de collecte de logs à partir des navigateurs.

Ajoutez [`@datadog/browser-logs`][13] à votre fichier `package.json`. Par exemple, si vous utilisez npm cli.  

[13]: https://www.npmjs.com/package/@datadog/browser-logs

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

Les applications Web avec des objectifs de performance doivent effectuer l'installation via CDN async. Le SDK Browser se charge de manière asynchrone depuis le CDN de Datadog, ce qui garantit qu'il n'a pas d'impact sur les performances de chargement de page. Toutefois, le SDK peut ne pas capturer les erreurs ou logs de console qui surviennent avant son initialisation.  

Ajoutez l'extrait de code généré dans le tag head de toutes les pages HTML que vous souhaitez surveiller dans votre application.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Pour recueillir tous les événements, vous devez effectuer l'installation via CDN sync. Le SDK Browser se charge de manière synchrone depuis le CDN de Datadog, ce qui garantit que le SDK se charge en premier et recueille toutes les erreurs, ressources et actions utilisateur. Cette méthode peut avoir un impact sur les performances de chargement de page.  

Ajoutez le snippet de code généré dans la balise head (devant toute autre balise de script) de chaque page HTML que vous souhaitez surveiller dans votre application. Le fait de placer la balise de script plus haut et de la charger de manière synchrone garantit que Datadog RUM peut recueillir toutes les données de performance et erreurs.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Étape 3 - Initialiser le SDK de collecte de logs à partir des navigateurs

Le SDK doit être initialisé dès que possible dans le cycle de vie de l'application. Cela garantit que tous les logs sont capturés correctement.

Dans le snippet d'initialisation, définissez le jeton client et le site. Consultez la liste complète des [paramètres d'initialisation][4].

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
{{% tab "CDN asynchrone" %}}

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

#### Configurer le consentement au suivi (conformité RGPD)

Pour être conforme au RGPD, au CCPA et aux réglementations similaires, le SDK RUM Browser vous permet de fournir la [valeur de consentement au suivi lors de l'initialisation][5].

#### Configurer la stratégie de sécurité du contenu (CSP)

Si vous utilisez l'intégration Datadog Content Security Policy (CSP) sur votre site, consultez [la documentation CSP][6] pour les étapes de configuration supplémentaires.

### Étape 4 - Visualiser vos données

Maintenant que vous avez terminé la configuration de base pour Logs, votre application recueille des logs de navigateurs et vous pouvez commencer à surveiller et déboguer les problèmes en temps réel.

Visualisez les logs dans le [Log Explorer][7].

## Utilisation

### Logs personnalisés

Une fois le SDK Datadog de collecte de logs à partir des navigateurs lancé, envoyez une entrée de log personnalisée directement à Datadog avec l'API :

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
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

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

Le SDK Logs ajoute les informations suivantes par défaut (d'autres champs peuvent être ajoutés si le SDK RUM est présent) :

- `date`
- `view.url`
- `view.referrer`
- `session_id` (uniquement lorsqu'une session est utilisée)

Le backend Datadog ajoute d'autres champs, notamment :

- `http.useragent`
- `network.client.ip`

### Suivi des erreurs

Le SDK de collecte de logs à partir des navigateurs de Datadog permet un suivi manuel des erreurs en utilisant le paramètre `error` facultatif (disponible dans le SDK v4.36.0+). Lorsqu'une instance d'une [erreur JavaScript][8] est fournie, le SDK extrait les informations pertinentes (type, message, trace de pile) de l'erreur.

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
{{% tab "CDN asynchrone" %}}

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

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

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

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

#### Résultats

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

### Fonction de logger générique

Le SDK Datadog de collecte de logs à partir des navigateurs ajoute des raccourcis de fonctions (`.debug`, `.info`, `.warn`, `.error`) aux loggers pour plus de simplicité. Une fonction de logger générique est également disponible pour exposer le paramètre `status` :

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
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

#### Placeholders

Les placeholders dans les exemples ci-dessus sont décrits plus bas :

| Placeholder         | Rôle                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Le message de votre log qui est complètement indexé par Datadog.                               |
| `<JSON_ATTRIBUTES>` | Un objet JSON valide qui comprend tous les attributs joints au `<MESSAGE>`.         |
| `<STATUS>`          | Le statut de votre log. Les valeurs de statut acceptées sont `debug`, `info`, `warn` ou `error`. |
| `<ERROR>`           | Une instance d'un objet [erreur JavaScript][8].                                         |

## Utilisation avancée

### Nettoyer les données sensibles de vos logs recueillis à partir des navigateurs

Si vos logs recueillis à partir des navigateurs contiennent des informations confidentielles que vous souhaitez censurer, configurez le SDK Browser pour nettoyer les séquences sensibles en utilisant le rappel `beforeSend` à l'initialisation du collecteur de logs.

La fonction de rappel `beforeSend` peut être invoquée avec deux arguments : l'événement `log` et `context`. Cette fonction vous donne accès à chaque log recueilli par le SDK Browser avant son envoi à Datadog, et vous permet d'utiliser le contexte pour ajuster les propriétés de log. Le contexte contient des informations supplémentaires liées à l'événement, mais pas nécessairement incluses dans l'événement. Vous pouvez généralement utiliser ces informations pour [enrichir][11] votre événement ou le [rejeter][12].

```javascript
function beforeSend(log, context)
```

Voici les valeurs possibles pour `context` :

| Valeur | Type de données | Cas d'utilisation |
|-------|---------|------------|
| `isAborted` | Booléen | Pour les événements de type log réseau, cette propriété indique si la requête ayant échoué a été annulée par l'application. Dans ce cas, vous pouvez choisir de ne pas envoyer l'événement s'il a été volontairement interrompu. |
| `handlingStack` | Chaîne | Une trace de pile indiquant où l'événement de log a été traité. Cela peut être utilisé pour identifier depuis quel [micro-frontend][9] le log a été envoyé. |

Pour censurer des adresses e-mail dans les URL de votre application Web :

{{< tabs >}}
{{% tab "NPM" %}}

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

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // supprimer l'adresse e-mail de l'URL de la vue
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

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

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

Les propriétés suivantes sont automatiquement recueillies par le SDK et peuvent contenir des informations sensibles :

| Attribut       | Type   | Rôle                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Chaîne | L'URL de la page Web active.                                                                  |
| `view.referrer` | Chaîne | L'URL de la page Web précédente à partir de laquelle l'utilisateur a accédé à la page actuelle. |
| `message`       | Chaîne | Le contenu du log.                                                                          |
| `error.stack`   | Chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.                                    |
| `http.url`      | Chaîne | L'URL HTTP.                                                                                    |

### Supprimer des logs spécifiques

La fonction de rappel `beforeSend` vous permet également de supprimer un log avant son envoi à Datadog.

Pour supprimer des erreurs réseau avec le code 404 :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // supprimer les erreurs réseau 404
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // supprimer les erreurs réseau 404
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    })
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // supprimer les erreurs réseau 404
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

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

{{< tabs >}}
{{% tab "NPM" %}}

Par exemple, imaginons que vous disposez d'un `signupLogger`, défini avec tous les autres loggers :

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
{{% tab "CDN asynchrone" %}}

Par exemple, imaginons que vous disposez d'un `signupLogger`, défini avec tous les autres loggers :

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

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Par exemple, imaginons que vous disposez d'un `signupLogger`, défini avec tous les autres loggers :

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

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

### Remplacer le contexte

#### Contexte global

Une fois le SDK Browser Datadog lancé, vous pouvez :

- Définir l'intégralité du contexte pour tous vos loggers avec l'API `setGlobalContext (context: object)`.
- Ajouter un contexte à l'ensemble de vos loggers avec l'API `setGlobalContextProperty (key: string, value: any)`.
- Récupérer tout le contexte global avec l'API `getGlobalContext ()`.
- Supprimer une propriété de contexte avec l'API `removeGlobalContextProperty (key: string)`.
- Effacer toutes les propriétés de contexte existantes avec l'API `clearGlobalContext ()`.

> Plusieurs noms d'API ont été mis à jour dans la version 4.17.0 du SDK Datadog de collecte de logs à partir des navigateurs :
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
{{% tab "CDN asynchrone" %}}

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

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

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

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

#### Contexte utilisateur

Le SDK Datadog de collecte de logs fournit des fonctions pratiques pour associer un `User` aux logs générés.

- Définissez l'utilisateur pour tous vos loggers avec l'API `setUser (newUser: User)`.
- Ajoutez ou modifiez une propriété utilisateur pour tous vos loggers avec l'API `setUserProperty (key: string, value: any)`.
- Récupérez l'utilisateur actuellement stocké avec l'API `getUser ()`.
- Supprimez une propriété utilisateur avec l'API `removeUserProperty (key: string)`.
- Effacez toutes les propriétés utilisateur existantes avec l'API `clearUser ()`.

**Remarque** : le contexte utilisateur est appliqué avant le contexte global. Par conséquent, chaque propriété utilisateur incluse dans le contexte global remplacera le contexte utilisateur lors de la génération des logs.

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
{{% tab "CDN asynchrone" %}}

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

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

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

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

#### Contexte de compte

Le SDK de collecte de logs de Datadog fournit des fonctions pratiques pour associer un `Account` aux logs générés.

- Définissez le compte pour tous vos loggers avec l'API `setAccount (newAccount: Account)`.
- Ajoutez ou modifiez une propriété de compte pour tous vos loggers avec l'API `setAccountProperty (key: string, value: any)`.
- Obtenez le compte actuellement stocké avec l'API `getAccount ()`.
- Supprimez une propriété de compte avec l'API `removeAccountProperty (key: string)`.
- Effacez toutes les propriétés de compte existantes avec l'API `clearAccount ()`.

**Remarque** : le contexte du compte est appliqué avant le contexte global. Par conséquent, chaque propriété de compte incluse dans le contexte global remplacera le contexte du compte lors de la génération des logs.

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
{{% tab "CDN asynchrone" %}}

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

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

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

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

#### Cycle de vie du contexte

Par défaut, les contextes sont stockés dans la mémoire de la page actuelle, ce qui signifie qu'ils ne sont pas :

- conservés après une actualisation complète de la page
- partagés sur divers onglets ou diverses fenêtres de la même session

Pour les ajouter à tous les événements de la session, ils doivent être joints à chaque page.

Avec l'introduction de l'option de configuration `storeContextsAcrossPages` dans la version v4.49.0 du SDK Browser, ces contextes peuvent être stockés dans [`localStorage`][9], ce qui permet les comportements suivants :

- Les contextes sont préservés après une actualisation complète
- Les contextes sont synchronisés entre les onglets ouverts depuis la même origine

Toutefois, cette fonctionnalité possède certaines **limites** :

- Il n'est pas conseillé de définir des informations personnelles identifiables (ou Personable Identifiable Information - PII) dans ces contextes, car les données stockées dans `localStorage` sont conservées après la fin de la session de l'utilisateur.
- Cette fonctionnalité n'est pas compatible avec les options de `trackSessionAcrossSubdomains` car les données de `localStorage` ne sont partagées qu'avec la même origine (login.site.com ≠ app.site.com).
- `localStorage` est limité à 5 MiB par origine. Ainsi, les données spécifiques à une application, les contextes Datadog et les autres données tierces stockées en `localStorage` doivent respecter cette limite pour éviter tout problème.

#### Contexte du logger

Une fois votre logger créé, vous pouvez :

- Définir l'intégralité du contexte pour votre logger avec l'API `setContext (context: object)`.
- Ajouter un contexte à votre logger avec l'API `setContextProperty (key: string, value: any)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

### Filtrer par statut

Une fois le SDK Browser Datadog lancé, définissez le niveau de log minimum pour votre logger avec l'API :

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
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

### Modifier la destination

Par défaut, les loggers créés par le SDK Browser Datadog envoient les logs à Datadog. Une fois le SDK lancé, vous pouvez configurer le logger en choisissant l'un des scénarios suivants :

- Envoyer les logs à la `console` et à Datadog (`http`)
- Envoyer les logs uniquement à la `console`
- Ne pas envoyer les logs (`silent`)

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

{{% tab "CDN asynchrone" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

{{% /tab %}}
{{< /tabs >}}

### Consentement au suivi de lʼutilisateur

Pour répondre aux exigences du RGPD, le CCPA et dʼautres régulations similaires, le SDK de collecte de logs vous permet de fournir la valeur de consentement au suivi à son initialisation.

Le paramètre dʼinitialisation `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `.granted` : le SDK de collecte de logs commence à recueillir les données et les envoie à Datadog.
2. `"not-granted"` : le SDK de collecte de logs ne recueille aucune donnée.

Pour modifier la valeur de consentement au suivi après l'initialisation du SDK de collecte de logs, utilisez l'appel d'API `setTrackingConsent()`. Le SDK de collecte de logs modifie son comportement en tenant compte de la nouvelle valeur.

- lorsque la valeur passe de `"granted"` à `"not-granted"`, la session de logs sʼarrête et les données ne sont plus envoyées à Datadog.
- lorsque la valeur passe de `"not-granted"` à `"granted"`, une nouvelle session de logs est créée si aucune autre session préalable nʼest active. La collecte de données reprend alors.

Cet état n'est pas synchronisé entre les onglets ni conservé entre les navigations. Il est de votre responsabilité de fournir la décision de l'utilisateur lors de l'initialisation du SDK de collecte de logs ou en utilisant `setTrackingConsent()`.

Lorsque `setTrackingConsent()` est utilisé avant `init()`, la valeur fournie est prioritaire sur le paramètre d'initialisation.

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
{{% tab "CDN asynchrone" %}}

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

### Accéder au contexte interne

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, vous pouvez accéder au contexte interne du SDK et ainsi récupérer le `session_id`.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

Vous pouvez utiliser le paramètre `startTime` pour obtenir le contexte d'un moment précis. Si ce paramètre n'est pas fourni, le contexte actuel est renvoyé.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}

{{% tab "CDN asynchrone" %}}

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

<!-- Remarque : toutes les URL doivent être absolues -->

[1]: https://app.datadoghq.com/organization-settings/client-tokens
[4]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-logs.LogsInitConfiguration.html
[5]: /fr/logs/log_collection/javascript/#user-tracking-consent
[6]: /fr/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[7]: /fr/logs/explorer/
[8]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[11]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[12]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#discard-a-rum-event