---
algolia:
  tags:
  - browser logs
aliases:
- /fr/logs/log_collection/web_browser
title: Collecte des journaux du navigateur
---
Envoyez des journaux vers Datadog depuis des pages Web à l'aide du SDK pour les journaux de navigateur.

Grâce au SDK de journaux de navigateur, vous pouvez envoyer des journaux directement à Datadog depuis des pages Web et bénéficier des fonctionnalités suivantes :

 Utilisez le SDK comme outil de journalisation. Toutes les données sont transmises à Datadog sous forme de fichiers JSON.
 Ajoutez « context » et des attributs personnalisés supplémentaires à chaque message envoyé.
 Envelopper et transférer automatiquement toutes les erreurs du frontend.
 Transmettre les erreurs du front-end.
 Enregistrer les adresses IP réelles des clients et les agents utilisateurs.
 Utilisation optimisée du réseau grâce à la publication automatique en masse.
 À utiliser dans les environnements Worker et Service Worker.

**Remarques** :

 **Indépendamment du SDK RUM** : le SDK Browser Logs peut être utilisé sans le SDK RUM.
 **Environnements Worker** : le SDK Browser Logs fonctionne dans les environnements Worker et Service Worker en utilisant les mêmes méthodes de configuration. Cependant, les journaux envoyés depuis les environnements Worker ne contiennent pas automatiquement d'informations sur la session.

## Configuration 

### Étape 1  Créer un jeton client

Dans Datadog, accédez à [**Paramètres de l'organisation > Nouveaux jetons client**][1]

**Environnements pris en charge** : Le SDK de journaux de navigateur prend en charge tous les navigateurs modernes, tant sur ordinateur que sur mobile, ainsi que les environnements Worker et Service Worker. Consultez le tableau [Prise en charge des navigateurs][4].

<div class="alert alert-info">For security reasons, <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">API keys</a> cannot be used to configure the browser logs SDK, because they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">client token</a> must be used.</div>  

### Étape 2  Installer le SDK Logs Browser

Choisissez la méthode d'installation du SDK pour navigateur.

{{< tabs >}}
{{% tab "NPM" %}}

Pour les applications web modernes, Datadog recommande d'effectuer l'installation via Node Package Manager (npm). Le SDK du navigateur est intégré au reste de votre code JavaScript côté client. Cela n'a aucune incidence sur la vitesse de chargement de la page. Cependant, il se peut que le SDK ne détecte pas les erreurs ou les journaux de console survenant avant son initialisation. Datadog recommande d'utiliser une version compatible avec le SDK Browser Logs.  

Ajoutez [`@datadog/browserlogs`][13] à votre fichier `package.json`. Par exemple, si vous utilisez l'interface de ligne de commande npm.  

[13] : https://www.npmjs.com/package/@datadog/browserlogs

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

Les applications web soumises à des objectifs de performance doivent être déployées via un CDN asynchrone. Le SDK pour navigateur se charge de manière asynchrone à partir du CDN de Datadog, ce qui garantit qu'il n'affecte pas les performances de chargement des pages. Cependant, il se peut que le SDK ne détecte pas les erreurs ou les journaux de console survenant avant son initialisation.  

Ajoutez l'extrait de code généré dans la balise &lt;head> de chaque page HTML que vous souhaitez surveiller dans votre application.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
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
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
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
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
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
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
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
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
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
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
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
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

Pour enregistrer tous les événements, vous devez effectuer l'installation via la synchronisation CDN. Le SDK pour navigateur se charge de manière synchrone à partir du CDN de Datadog, ce qui garantit qu'il se charge en premier et recueille toutes les erreurs, les ressources et les actions des utilisateurs. Cette méthode peut avoir un impact sur la vitesse de chargement de la page.  

Ajoutez l'extrait de code généré dans la balise &lt;head> (avant toute autre balise &lt;script>) de chaque page HTML que vous souhaitez surveiller dans votre application. En plaçant la balise script plus haut dans le code et en la chargeant de manière synchrone, vous vous assurez que Datadog RUM puisse collecter toutes les données de performance et toutes les erreurs.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Étape 3  Initialisation du SDK Logs Browser

Le SDK doit être initialisé dès que possible au cours du cycle de vie de l'application. Cela garantit que tous les journaux sont correctement enregistrés.

Dans l'extrait de code d'initialisation, définissez le jeton client et le site. Consultez la liste complète des [paramètres d'initialisation][4].

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
{{% tab "Synchronisation du CDN" %}}

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

#### Configurer le consentement au suivi (conformité au RGPD)

Afin de respecter le RGPD, le CCPA et les réglementations similaires, le SDK RUM pour navigateur vous permet de fournir la [valeur de consentement au suivi lors de l'initialisation][5].

#### Configurer la politique de sécurité du contenu (CSP)

Si vous utilisez l'intégration de la politique de sécurité du contenu (CSP) de Datadog sur votre site, consultez [la documentation CSP][6] pour connaître les étapes de configuration supplémentaires.

### Étape 4  Visualisez vos données

Maintenant que vous avez terminé la configuration de base de Logs, votre application collecte les journaux du navigateur et vous pouvez commencer à surveiller et à résoudre les problèmes en temps réel.

Affichez les journaux dans l'[Explorateur de journaux][7].

## Utilisation

### Journaux personnalisés

Une fois le SDK des journaux de navigateur Datadog initialisé, envoyez une entrée de journal personnalisée directement à Datadog via l'API :

```typescript```
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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

#### Résultats

Les résultats sont identiques, que l'on utilise NPM, CDN async ou CDN sync :

```json```
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

Le SDK Logs ajoute par défaut les informations suivantes (d'autres champs peuvent être ajoutés si le SDK RUM est
(actuellement) :

 `date`
 `view.url`
 `view.referrer`
 `session_id` (uniquement si une session est utilisée)

Le backend Datadog ajoute d'autres champs, tels que :

 `http.useragent`
 `network.client.ip`

### Suivi des erreurs

Le SDK Datadog pour les journaux de navigateur permet le suivi manuel des erreurs à l'aide du paramètre facultatif `error` (disponible dans le SDK v4.36.0 et versions ultérieures). Lorsqu'une instance d'une [erreur JavaScript][8] est fournie, le SDK extrait les informations pertinentes (type, message, trace de pile) de cette erreur.

```typescript```
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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

#### Résultats

Les résultats sont identiques, que l'on utilise NPM, CDN async ou CDN sync :

```json```
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

### Fonction de journalisation générique

Le SDK de journalisation du navigateur Datadog ajoute des fonctions abrégées (`.debug`, `.info`, `.warn`, `.error`) aux enregistreurs de journaux pour plus de commodité. Une fonction de journalisation générique est également disponible, qui expose le paramètre `status` :

```typescript```
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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

#### Espaces réservés

Les espaces réservés dans les exemples ci-dessus sont décrits ci-dessous :

| Espace réservé         | Description                                                                             |
|  |  |
| `<MESSAGE>| Le message de votre journal qui est entièrement indexé par Datadog.                               |
| `<JSON_ATTRIBUTES>| Un objet JSON valide, qui comprend tous les attributs associés au `<MESSAGE>`.         |
| `<STATUS>`          | Le niveau de votre journal ; les valeurs acceptées sont `debug`, `info`, `warn` ou `error`. |
| `<ERROR>`           | Une instance d'un objet [JavaScript Error][8].                                         |

## Utilisation avancée

### Supprimez les données sensibles de vos journaux de navigateur

Si vos journaux de navigateur contiennent des informations sensibles qui doivent être masquées, configurez le SDK du navigateur pour qu'il supprime ces séquences sensibles à l'aide de la fonction de rappel `beforeSend` lors de l'initialisation du collecteur de journaux du navigateur.

La fonction de rappel `beforeSend` peut être appelée avec deux arguments : l'événement `log` et `context`. Cette fonction vous permet d'accéder à chaque journal collecté par le SDK du navigateur avant son envoi vers Datadog, et vous permet d'utiliser le contexte pour modifier les propriétés de ces journaux. Le contexte contient des informations supplémentaires relatives à l'événement, mais qui ne figurent pas nécessairement dans l'événement lui-même. En général, vous pouvez utiliser ces informations pour [enrichir][11] votre événement ou les [ignorer][12].

```javascript
function beforeSend(log, context)
```

Les valeurs possibles pour `context` sont les suivantes :

| Valeur | Type de données | Cas d'utilisation |
||||
| `isAborted` | Booléen | Pour les événements du journal réseau, cette propriété indique si la requête ayant échoué a été interrompue par l'application ; dans ce cas, vous ne souhaiterez peut-être pas envoyer cet événement, car il pourrait s'agir d'une interruption intentionnelle. |
| `handlingStack` | Chaîne de caractères | Une trace de pile indiquant où l'événement de journalisation a été traité. Cela permet de déterminer depuis quel [microfrontend][9] le journal a été envoyé. |

Pour masquer les adresses e-mail dans les URL de votre application web :

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
{{% tab "CDN asynchrone" %}}

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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

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

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

Les propriétés suivantes sont automatiquement collectées par le SDK et peuvent contenir des données sensibles :

| Attribut       | Type   | Description                                                                                      |
|  |  |  |
| `view.url`      | Chaîne de caractères | L'URL de la page Web active.                                                                  |
| `view.referrer` | Chaîne de caractères | L'URL de la page Web précédente à partir de laquelle un lien vers la page actuellement demandée a été suivi. |
| `message`       | Chaîne de caractères | Le contenu du journal.                                                                          |
| `error.stack`   | Chaîne de caractères | La trace de la pile ou des informations complémentaires concernant l'erreur.                                    |
| `http.url`      | Chaîne | L'URL HTTP.                                                                                    |

### Supprimer certains journaux

La fonction de rappel `beforeSend` vous permet également de supprimer un message de journal avant qu'il ne soit envoyé à Datadog.

Pour ignorer les erreurs réseau dont le statut est 404 :

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
{{% tab "CDN asynchrone" %}}

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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

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

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

### Définir plusieurs enregistreurs

Le SDK de journalisation du navigateur Datadog contient un enregistreur de journaux par défaut, mais il est possible de définir d'autres enregistreurs.

#### Créer un nouvel enregistreur

Une fois le SDK des journaux de navigateur Datadog initialisé, utilisez l'API `createLogger` pour définir un nouvel enregistreur de journaux :

```typescript```
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Remarque** : ces paramètres peuvent être définis à l'aide des API [setLevel](#filterbystatus), [setHandler](#changethedestination) et [setContext](#overwritecontext).

#### Obtenir un enregistreur personnalisé

Une fois l'enregistreur créé, vous pouvez y accéder depuis n'importe quelle partie de votre code JavaScript à l'aide de l'API :

```typescript```
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

Par exemple, supposons qu'il existe un `signupLogger`, défini avec tous les autres loggers :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

Il peut ensuite être utilisé dans une autre partie du code avec :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

Par exemple, supposons qu'il existe un `signupLogger`, défini avec tous les autres loggers :

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

Il peut ensuite être utilisé dans une autre partie du code avec :

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

Par exemple, supposons qu'il existe un `signupLogger`, défini avec tous les autres loggers :

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

Il peut ensuite être utilisé dans une autre partie du code avec :

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

### Remplacer le contexte

#### Contexte mondial

Une fois le SDK des journaux de navigateur Datadog initialisé, il est possible de :

 Définissez le contexte global pour tous vos enregistreurs à l'aide de l'API `setGlobalContext (context: object)`.
 Ajoutez un contexte à tous vos enregistreurs à l'aide de l'API `setGlobalContextProperty (key: string, value: any)`.
 Accédez à l'intégralité du contexte global grâce à l'API `getGlobalContext()`.
 Supprimez une propriété de contexte à l'aide de l'API `removeGlobalContextProperty (key: string)`.
 Effacez toutes les propriétés de contexte existantes à l'aide de l'API `clearGlobalContext ()`.

> Le SDK Log Browser v4.17.0 a mis à jour les noms de plusieurs API :
>
>  `getGlobalContext` au lieu de `getLoggerGlobalContext`
>  `setGlobalContext` au lieu de `setLoggerGlobalContext`
>  `setGlobalContextProperty` au lieu de `addLoggerGlobalContext`
>  `removeGlobalContextProperty` au lieu de `removeLoggerGlobalContext`

{{< tabs >}}
{{% tab "NPM" %}}

Pour NPM, utilisez :

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

Pour CDN async, utilisez :

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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

Pour la synchronisation du CDN, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexte utilisateur

Le SDK Datadog pour les journaux offre des fonctions pratiques permettant d'associer un `User` aux journaux générés.

 Définissez l'utilisateur pour tous vos enregistreurs à l'aide de l'API `setUser (newUser: User)`.
 Ajoutez ou modifiez une propriété utilisateur pour tous vos enregistreurs à l'aide de l'API `setUserProperty (key: string, value: any)`.
 Récupérez l'utilisateur actuellement enregistré à l'aide de l'API `getUser ()`.
 Supprimez une propriété utilisateur à l'aide de l'API `removeUserProperty (key: string)`.
 Effacez toutes les propriétés utilisateur existantes à l'aide de l'API `clearUser ()`.

**Remarque** : le contexte utilisateur est appliqué avant le contexte global. Par conséquent, toute propriété utilisateur incluse dans le contexte global prévaudra sur le contexte utilisateur lors de la génération des journaux.

{{< tabs >}}
{{% tab "NPM" %}}

Pour NPM, utilisez :

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

Pour CDN async, utilisez :

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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

Pour la synchronisation du CDN, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexte du compte

Le SDK Datadog pour les journaux offre des fonctions pratiques permettant d'associer un `Compte` aux journaux générés.

 Configurez le compte pour tous vos enregistreurs à l'aide de l'API `setAccount (newAccount: Account)`.
 Ajoutez ou modifiez une propriété de compte pour tous vos enregistreurs à l'aide de l'API `setAccountProperty (key: string, value: any)`.
 Récupérez le compte actuellement enregistré à l'aide de l'API `getAccount ()`.
 Supprimez une propriété de compte à l'aide de l'API `removeAccountProperty (key: string)`.
 Effacez toutes les propriétés de compte existantes à l'aide de l'API `clearAccount ()`.

**Remarque** : le contexte du compte s'applique avant le contexte global. Par conséquent, toute propriété de compte incluse dans le contexte global prévaudra sur le contexte de compte lors de la génération des journaux.

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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

#### Cycle de vie des contextes

Par défaut, les contextes sont stockés dans la mémoire de la page actuelle, ce qui signifie qu'ils ne sont pas :

 conservé après un rechargement complet de la page
 partagés entre différents onglets ou fenêtres d'une même session

Pour les ajouter à tous les événements de la session, ils doivent être intégrés à chaque page.

Avec l'introduction de l'option de configuration `storeContextsAcrossPages` dans la version 4.49.0 du SDK du navigateur, ces contextes peuvent être stockés dans [`localStorage`][9], ce qui permet les comportements suivants :

 Les contextes sont conservés après un rechargement complet
 Les contextes sont synchronisés entre les onglets ouverts sur la même origine

Cette fonctionnalité présente toutefois certaines **limitations** :

 Il n'est pas recommandé de stocker des informations personnelles identifiables (PII) dans ces contextes, car les données enregistrées dans `localStorage` sont conservées au-delà de la session de l'utilisateur
 Cette fonctionnalité est incompatible avec l'option `trackSessionAcrossSubdomains`, car les données `localStorage` ne sont partagées qu'au sein d'une même origine (login.site.com ≠ app.site.com)
 La capacité de `localStorage` est limitée à 5 Mio par origine ; par conséquent, les données spécifiques à l'application, les contextes Datadog et les autres données tierces stockées dans `localStorage` doivent respecter cette limite afin d'éviter tout problème

#### Contexte du journal

Une fois qu'un enregistreur a été créé, il est possible de :

 Définissez le contexte complet de votre enregistreur à l'aide de l'API `setContext (context: object)`.
 Définissez une propriété de contexte sur votre enregistreur à l'aide de l'API `setContextProperty (key: string, value: any)` :

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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

### Filtrer par statut

Une fois le SDK des journaux de navigateur Datadog initialisé, le niveau de journalisation minimal de votre enregistreur de journaux est défini via l'API :

```typescript```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Seuls les journaux dont le statut est égal ou supérieur au niveau spécifié sont envoyés.

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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

### Modifier la destination

Par défaut, les enregistreurs créés par le SDK Datadog pour les journaux de navigateur envoient les journaux à Datadog. Une fois le SDK des journaux de navigateur Datadog initialisé, il est possible de configurer l'enregistreur pour :

 envoyer les journaux vers la `console` et Datadog (`http`)
 envoyer les journaux uniquement vers la `console`
 ne pas envoyer de journaux du tout (`silent`)

```typescript```
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

**Remarque** : les premiers appels à l'API doivent être encapsulés dans la fonction de rappel `window.DD_LOGS.onReady()`. Cela garantit que le code ne s'exécute qu'une fois que le SDK a été correctement chargé.

{{% /tab %}}
{{% tab "Synchronisation du CDN" %}}

Pour la synchronisation du CDN, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Remarque** : la vérification `window.DD_LOGS` permet d'éviter les problèmes en cas d'échec du chargement du SDK.

{{% /tab %}}
{{< /tabs >}}

### Consentement au suivi des utilisateurs

Afin de respecter le RGPD, le CCPA et les réglementations similaires, le SDK Logs Browser vous permet de fournir la valeur du consentement au suivi lors de l'initialisation.

Le paramètre d'initialisation `trackingConsent` peut prendre l'une des valeurs suivantes :

1. « granted » : le SDK Logs Browser commence à collecter des données et les envoie à Datadog.
2. « notgranted » : le SDK Logs Browser ne collecte aucune donnée.

Pour modifier la valeur du consentement au suivi après l'initialisation du SDK Logs Browser, utilisez l'appel API `setTrackingConsent()`. Le SDK Logs Browser adapte son comportement en fonction de la nouvelle valeur :

 Lorsque la valeur passe de « granted » à « notgranted », la session Logs est interrompue et les données ne sont plus envoyées à Datadog.
 Lorsqu'il passe de « notgranted » à « granted », une nouvelle session Logs est créée s'il n'y a pas de session précédente active, et la collecte des données reprend.

Cet état n'est pas synchronisé entre les onglets et n'est pas conservé d'une page à l'autre. Il vous incombe de fournir le consentement de l'utilisateur lors de l'initialisation du SDK Logs Browser ou en utilisant la méthode `setTrackingConsent()`.

Lorsque la méthode `setTrackingConsent()` est appelée avant `init()`, la valeur fournie prévaut sur le paramètre d'initialisation.

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
{{% tab "Synchronisation du CDN" %}}

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

Une fois le SDK Datadog pour les journaux du navigateur initialisé, vous pouvez accéder au contexte interne du SDK. Cela vous permet d'accéder à l'identifiant de session (`session_id`).

```typescript```
getInternalContext (startTime?: 'number' | undefined)
```

Vous pouvez, si vous le souhaitez, utiliser le paramètre `startTime` pour obtenir le contexte d'un moment précis. Si le paramètre est omis, le contexte actuel est renvoyé.

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
{{% tab "Synchronisation du CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}
{{< /tabs >}}

<!-- Note: all URLs should be absolute -->

[1] : https://app.datadoghq.com/organizationsettings/clienttokens [4] : https://datadoghq.dev/browsersdk/interfaces/_datadog_browserlogs.LogsInitConfiguration.html [5]: /logs/log_collection/javascript/#usertrackingconsent [6]: /integrations/content_security_policy_logs/#usecspwithrealusermonitoringandsessionreplay [7]: /logs/explorer/ [8]: <https: mem-invalid-attributes-holder=developer.mozilla.org mem-invalid-attributes-holder=en-us mem-invalid-attributes-holder=docs mem-invalid-attributes-holder=web mem-invalid-attributes-holder=javascript mem-invalid-attributes-holder=reference mem-invalid-attributes-holder=global_objects mem-invalid-attributes-holder=error>
[9] : https://developer.mozilla.org/enUS/docs/Web/API/Window/localStorage [11] : /real_user_monitoring/browser/advanced_configuration/?tab=npm#enrichandcontrolrumdata [12] : /real_user_monitoring/browser/advanced_configuration/?tab=npm#discardarumevent