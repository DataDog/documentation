---
algolia:
  tags:
  - browser logs
aliases:
- /fr/logs/log_collection/web_browser
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

## Implémentation

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

Chargez et configurez le SDK dans la section head de vos pages. Pour le site **{{<region-param key="dd_site_name">}}** :

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v5/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ap1.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.eu',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us3.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v5/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us5.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v5.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ddog-gov.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}


**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

### CDN synchrone

Pour recevoir tous les logs et toutes les erreurs, chargez et configurez le SDK au début de la section head de vos pages. Pour le site **{{<region-param key="dd_site_name">}}** :

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ap1.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.eu',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us3.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us5.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v5.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ddog-gov.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

### TypeScript

Les types sont compatibles avec TypeScript >= 3.8.2. Pour les versions antérieures, importez les sources JS et utilisez des variables globales pour éviter tout problème de compilation :

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

### Intégration de CSP

Si vous utilisez l'intégration CSP (stratégie de sécurité de contenu) de Datadog sur votre site, consultez [la section RUM de la documentation relative à CSP][14] pour connaître les étapes de configuration.

### Paramètres d'initialisation

Les paramètres suivants peuvent être utilisés pour configurer l'envoi des logs à Datadog avec le SDK Datadog de collecte de logs à partir des navigateurs :

| Paramètre                  | Type                                                                      | Obligatoire | Valeur par défaut         | Description                                                                                                                                                                           |
|----------------------------|---------------------------------------------------------------------------|----------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `clientToken`              | Chaîne                                                                    | Oui      |                 | Un [token client Datadog][2].                                                                                                                                                          |
| `site`                     | Chaîne                                                                    | Oui      | `datadoghq.com` | Le [paramètre du site Datadog de votre organisation][9].                                                                                                                                 |
| `service`                  | Chaîne                                                                    | Non       |                 | Le nom de service de votre application. Il doit respecter les [exigences de la syntaxe des tags][7].                                                                                             |
| `env`                      | Chaîne                                                                    | Non       |                 | L'environnement de l'application, par exemple prod, pre-prod, staging, etc. Il doit respecter les [exigences de la syntaxe des tags][7].                                                    |
| `version`                  | Chaîne                                                                    | Non       |                 | La version de l'application, par exemple 1.2.3, 6c44da20, 2020.02.13, etc. Il doit respecter les [exigences de la syntaxe des tags][7].                                                    |
| `forwardErrorsToLogs`      | Booléen                                                                   | Non       | `true`          | Définissez ce paramètre sur `false` pour désactiver l'envoi des logs console.error, des exceptions non interceptées et des erreurs réseau à Datadog.                                                                              |
| `forwardConsoleLogs`       | `"all"` ou un tableau composé des valeurs `"log"` `"debug"` `"info"` `"warn"` `"error"`      | Non       | `[]`            | Permet de transmettre les logs `console.*` à Datadog. Utilisez `"all"` pour transmettre tous les logs ou définissez un tableau composé des noms de l'API console pour n'en transmettre qu'une partie.                                                |
| `forwardReports`           | `"all"` ou un tableau composé des valeurs `"intervention"` `"deprecation"` `"csp_violation"` | Non       | `[]`            | Permet de transmettre les rapports de l'[API Reporting][8] à Datadog. Utilisez `"all"` pour transmettre tous les rapports ou définissez un tableau composé des types de rapports pour n'en transmettre qu'une partie.                                       |
| `sampleRate`               | Nombre                                                                    | Non       | `100`           | **Obsolète** - voir `sessionSampleRate`.                                                                                                                                             |
| `sessionSampleRate`        | Nombre                                                                    | Non       | `100`           | Le pourcentage de sessions à surveiller : `100` (toutes les sessions) et `0` (aucune session). Seules les sessions surveillées envoient des logs.                                                                                    |
| `trackingConsent`          | `"granted"` ou `"not-granted"`                                            | Non       | `"granted"`     | Définir l'état initial du consentement au suivi de l'utilisateur. Voir [Consentement au suivi de l'utilisateur][15].                                                                                                         |
| `silentMultipleInit`       | Booléen                                                                   | Non       |                 | Permet d'empêcher le logging des erreurs lorsqu'il y a plusieurs init.                                                                                                                                    |
| `proxy`                    | Chaîne                                                                    | Non       |                 | URL de proxy facultative (exemple : www.proxy.com/chemin). Consultez le [guide complet de configuration d'un proxy][6] pour en savoir plus.                                                                        |
| `telemetrySampleRate`      | Nombre                                                                    | Non       | `20`            | Les données de télémétrie (comme les erreurs et logs de debugging) à propos de l'exécution du SDK sont envoyées à Datadog afin de détecter et de résoudre les problèmes potentiels. Définissez ce paramètre sur `0` pour désactiver la collecte de télémétrie. |
| `storeContextsAcrossPages` | Booléen                                                                   | Non       |                 | Stocker le contexte global et le contexte utilisateur dans `localStorage` pour les préserver tout au long de la navigation utilisateur. Consultez la section [Cycle de vie des contexts][11] pour en savoir plus et connaître les limitations spécifiques.          |
| `allowUntrustedEvents`     | Booléen                                                                   | Non       |                 | Autoriser l'enregistrement des [événements non fiables][13], par exemple lors des tests automatisés de l'interface utilisateur.                                                                                                           |


Options qui doivent avoir une configuration correspondante lors de l'utilisation du SDK `RUM` :

| Paramètre                              | Type    | Obligatoire | Valeur par défaut | Description                                                                                                                                                              |
|----------------------------------------| ------- | -------- | ------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trackSessionAcrossSubdomains`         | Booléen | Non       | `false` | Préserver la session pour tous les sous-domaines d'un même site.                                                                                                                |
| `useSecureSessionCookie`               | Booléen | Non       | `false` | Utiliser un cookie de session sécurisé. Ce paramètre désactive les logs envoyés sur des connexions non sécurisées (connexions non HTTPS).                                                                                |
| `usePartitionedCrossSiteSessionCookie` | Booléen | Non       | `false` | Utiliser un cookie de session intersite sécurisé partitionné. Cela permet l'exécution du SDK logs lorsque le site est chargé à partir d'un autre site (iframe). Implique l'utilisation de `useSecureSessionCookie`. |
| `useCrossSiteSessionCookie`            | Booléen | Non       | `false` | **Obsolète**, voir `usePartitionedCrossSiteSessionCookie`.                                                                                                              |

## Utilisation

### Logs personnalisés

Une fois le SDK Datadog de collecte de logs à partir des navigateurs lancé, envoyez une entrée de log personnalisée directement à Datadog avec l'API :

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

#### CDN asynchrone

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

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

Le SDK Datadog de collecte des logs à partir des navigateurs permet d'effectuer un suivi manuel des erreurs à l'aide du paramètre facultatif `error` (Disponible à partir de la v4.36.0 du SDK). Lorsqu'une instance d'une [erreur JavaScript][10] est spécifiée, le SDK extrait les informations pertinentes (type, message, stack trace) de l'erreur.

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

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

#### CDN asynchrone

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

#### CDN synchrone

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

```
log (message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

#### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>,<ERREUR>);
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>,<ERREUR>);
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>,<ERREUR>);
```

#### Placeholders

Les placeholders dans les exemples ci-dessus sont décrits plus bas :

| Placeholder         | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | Le message de votre log qui est complètement indexé par Datadog.                               |
| `<ATTRIBUTS_JSON>` | Un objet JSON valide qui comprend tous les attributs joints au `<MESSAGE>`.         |
| `<STATUT>`          | Le statut de votre log. Les valeurs de statut acceptées sont `debug`, `info`, `warn` ou `error`. |
| `<ERREUR>`           | Une instance d'un objet [error JavaScript][10].                                         |

## Utilisation avancée

### Nettoyer les données sensibles de vos logs recueillis à partir des navigateurs

Si vos logs recueillis à partir des navigateurs contiennent des informations confidentielles que vous souhaitez censurer, configurez le SDK Browser pour nettoyer les séquences sensibles en utilisant le rappel `beforeSend` à l'initialisation du collecteur de logs.

La fonction de rappel `beforeSend` vous permet d'accéder à chaque log recueilli par le SDK Browser avant qu'il ne soit envoyé à Datadog. De plus, vous pouvez modifier les propriétés de votre choix.

Pour censurer des adresses e-mail dans les URL de votre application Web :

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

Les propriétés suivantes sont automatiquement recueillies par le SDK et peuvent contenir des informations sensibles :

| Attribut       | Type   | Description                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Chaîne | L'URL de la page Web active.                                                                  |
| `view.referrer` | Chaîne | L'URL de la page Web précédente à partir de laquelle l'utilisateur a accédé à la page actuelle. |
| `message`       | Chaîne | Le contenu du log.                                                                          |
| `error.stack`   | Chaîne | La stack trace ou toutes informations complémentaires relatives à l'erreur.                                    |
| `http.url`      | Chaîne | L'URL HTTP.                                                                                    |

### Supprimer des logs spécifiques

La fonction de rappel `beforeSend` vous permet également de supprimer un log avant son envoi à Datadog.

Pour supprimer des erreurs réseau avec le code 404 :

#### NPM

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

#### CDN asynchrone

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

#### CDN synchrone

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

##### CDN asynchrone

Par exemple, imaginons que vous disposez d'un `signupLogger`, défini avec tous les autres loggers :

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  )
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

##### CDN synchrone

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
  const signupLogger = window.window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

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

##### NPM

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

##### CDN asynchrone

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

##### CDN synchrone

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

#### Contexte utilisateur

Le SDK Datadog de collecte de logs fournit des fonctions pratiques pour associer un `User` aux logs générés.

- Définissez l'utilisateur pour tous vos loggers avec l'API `setUser (newUser: User)`.
- Ajoutez ou modifiez une propriété utilisateur pour tous vos loggers avec l'API `setUserProperty (key: string, value: any)`.
- Récupérez l'utilisateur actuellement stocké avec l'API `getUser ()`.
- Supprimez une propriété utilisateur avec l'API `removeUserProperty (key: string)`.
- Effacez toutes les propriétés utilisateur existantes avec l'API `clearUser ()`.

**Remarque** : le contexte utilisateur est appliqué avant le contexte global. Par conséquent, chaque propriété utilisateur incluse dans le contexte global remplacera le contexte utilisateur lors de la génération des logs.

##### NPM

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

##### CDN asynchrone

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

##### CDN synchrone

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

#### Cycle de vie des contextes

Par défaut, le contexte global et le contexte utilisateur sont stockés dans la mémoire de la page actuelle. Ainsi, les contextes ne sont pas :

- conservés après une actualisation complète de la page ;
- partagés avec plusieurs onglets ou fenêtres d'une même session.

Pour ajouter les contextes à tous les événements d'une session, ils doivent être joints à chaque page.

Depuis le lancement de l'option de configuration `storeContextsAcrossPages`, avec la version 4.49.0 du SDK Browser, ces contextes peuvent être stockés dans [`localStorage`][12]. Ainsi :

- Les contextes sont conservés après une actualisation complète.
- Les contextes sont synchronisés entre les onglets ouverts avec la même origine.

Toutefois, cette fonctionnalité possède certaines **limites** :

- Il n'est pas recommandé de définir des informations personnelles avec ces contextes, car les données stockées dans `localStorage` sont conservées après la fin de la session utilisateur.
- Cette fonctionnalité n'est pas compatible avec les options `trackSessionAcrossSubdomains`, car les données de `localStorage` sont uniquement partagées avec les ressources ayant la même origine (login.site.com ≠ app.site.com).
- `localStorage` est limité à 5 MiB par origine. Ainsi, les données spécifiques à une application, les contextes Datadog et les autres données tierces stockées en `localStorage` doivent respecter cette limite pour éviter tout problème.

#### Contexte du logger

Une fois votre logger créé, vous pouvez :

- Définir l'intégralité du contexte pour votre logger avec l'API `setContext (context: object)`.
- Ajouter un contexte à votre logger avec l'API `setContextProperty (key: string, value: any)` :

##### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

##### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

##### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

### Filtrer par statut

Une fois le SDK Browser Datadog lancé, définissez le niveau de log minimum pour votre logger avec l'API :

```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Seuls les logs avec un statut égal ou supérieur au niveau indiqué sont envoyés.

#### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<NIVEAU>')
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<NIVEAU>')
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<NIVEAU>')
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

### Modifier la destination

Par défaut, les loggers créés par le SDK Browser Datadog envoient les logs à Datadog. Une fois le SDK lancé, vous pouvez configurer le logger en choisissant l'un des scénarios suivants :

- Envoyer les logs à la `console` et à Datadog (`http`)
- Envoyer les logs uniquement à la `console`
- Ne pas envoyer les logs (`silent`)

```
setHandler (handler?: 'http' | 'console' | 'silent' | Array<gestionnaire>)
```

#### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<GESTIONNAIRE>')
datadogLogs.logger.setHandler(['<GESTIONNAIRE_1>', '<GESTIONNAIRE_2>'])
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<GESTIONNAIRE>')
  window.DD_LOGS.logger.setHandler(['<GESTIONNAIRE_1>', '<GESTIONNAIRE_2>'])
})
```

**Remarque** : les premiers appels d'API doivent être wrappés dans le callback `window.DD_LOGS.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

#### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<GESTIONNAIRE>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<GESTIONNAIRE_1>', '<GESTIONNAIRE_2>'])
```

**Remarque** : le check `window.DD_LOGS` permet d'éviter tout problème si le chargement du SDK échoue.

### Consentement au suivi de lʼutilisateur

Pour répondre aux exigences du RGPD, le CCPA et dʼautres régulations similaires, le SDK de collecte de logs vous permet de fournir la valeur de consentement au suivi à son initialisation.

Le paramètre dʼinitialisation `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `.granted` : le SDK de collecte de logs commence à recueillir les données et les envoie à Datadog.
2. `"not-granted"` : le SDK de collecte de logs ne recueille aucune donnée.

Pour modifier la valeur de consentement au suivi après l'initialisation du SDK de collecte de logs, utilisez l'appel d'API `setTrackingConsent()`. Le SDK de collecte de logs modifie son comportement en tenant compte de la nouvelle valeur.

* lorsque la valeur passe de `"granted"` à `"not-granted"`, la session de logs sʼarrête et les données ne sont plus envoyées à Datadog.
* lorsque la valeur passe de `"not-granted"` à `"granted"`, une nouvelle session de logs est créée si aucune autre session préalable nʼest active. La collecte de données reprend alors.

Cet état n'est pas synchronisé entre les onglets ni conservé entre les navigations. Il est de votre responsabilité de fournir la décision de l'utilisateur lors de l'initialisation du SDK de collecte de logs ou en utilisant `setTrackingConsent()`.

Lorsque `setTrackingConsent()` est utilisé avant `init()`, la valeur fournie est prioritaire sur le paramètre d'initialisation.

#### NPM

Pour NPM, utilisez :

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

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

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

#### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

### Accéder au contexte interne

Une fois le SDK Datadog de collecte de logs à partir des navigateurs initialisé, vous pouvez accéder au contexte interne du SDK et ainsi récupérer le `session_id`.

```
getInternalContext (startTime?: 'number' | undefined)
```

Vous pouvez utiliser le paramètre `startTime` pour obtenir le contexte d'un moment précis. Si ce paramètre n'est pas fourni, le contexte actuel est renvoyé.

#### NPM

Pour NPM, utilisez :

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

#### CDN asynchrone

Pour CDN asynchrone, utilisez :

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

#### CDN synchrone

Pour CDN synchrone, utilisez :

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

<!-- Remarque : toutes les URL doivent être absolues -->

[1]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://docs.datadoghq.com/fr/real_user_monitoring/guide/enrich-and-control-rum-data/
[6]: https://docs.datadoghq.com/fr/real_user_monitoring/faq/proxy_rum_data/
[7]: https://docs.datadoghq.com/fr/getting_started/tagging/#define-tags
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API
[9]: https://docs.datadoghq.com/fr/getting_started/site/
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[11]: https://docs.datadoghq.com/fr/logs/log_collection/javascript/#contexts-life-cycle
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[14]: /fr/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[15]: #user-tracking-consent