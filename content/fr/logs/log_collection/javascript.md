---
title: Collecte de logs à partir des navigateurs
kind: documentation
aliases:
  - /fr/logs/log_collection/web_browser
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-logs'
    tag: NPM
    text: Paquet NPM @datadog/browser-logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
---
Envoyez des logs à Datadog à partir de navigateurs Web ou d'autres clients Javascript grâce à la bibliothèque de journalisation JavaScript côté client `datadog-logs` de Datadog.

Utilisez la bibliothèque `datadog-logs` pour envoyer des logs directement à Datadog depuis les clients JS. Vous pourrez notamment :

* Utiliser la bibliothèque en tant que logger et transmettre tous les logs à Datadog sous forme de documents JSON
* Ajouter du contexte et des attributs personnalisés supplémentaires pour chaque log envoyé
* Incorporer et transmettre automatiquement chaque erreur frontend
* Transmettre les erreurs frontend
* Enregistrer l'adresse IP et le user agent réels du client
* Optimiser l'utilisation du réseau grâce aux envois automatiques en masse

## Configuration

1. **Obtenir un token client Datadog** : pour des raisons de sécurité, les [clés d'API][1] ne peuvent pas être utilisées pour configurer la bibliothèque `datadog-logs`, car elles seraient exposées côté client dans le code JavaScript. Pour recueillir des logs depuis un navigateur Web, vous devez utiliser un [token client][2]. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation relative aux tokens client][2].
2. **Configurez la bibliothèque de collecte de logs à partir des navigateurs de Datadog** [via NPM](#configuration-via-npm) ou collez le [bundle](#configuration-via-bundle) directement dans la balise head.

### Configuration via NPM

Après avoir ajouté [`@datadog/browser-logs`][3] à votre fichier `package.json`, lancez la bibliothèque avec :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  datacenter: 'us',
  isCollectingError: true,
  sampleRate: 100
});
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  datacenter: 'eu',
  isCollectingError: true,
  sampleRate: 100
});
```

{{% /tab %}}
{{< /tabs >}}

### Configuration via bundle

Afin de ne manquer aucun log ni aucune erreur, assurez-vous de charger et de configurer la bibliothèque au début de la section <head> de vos pages.

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"></script>
    <script>
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<TOKEN_CLIENT>',
        isCollectingError: true,
        sampleRate: 100
      });
    </script>
  </head>
</html>
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```html
<html>
  <head>
    <title>Exemple pour envoyer les logs à Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-eu.js"></script>
    <script>
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<TOKEN_CLIENT>',
        isCollectingError: true,
        sampleRate: 100
      });
    </script>
  </head>
</html>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

### Paramètres de lancement

Les paramètres suivants peuvent être utilisés pour configurer l'envoi des logs à Datadog avec la bibliothèque :

| Paramètre             | Type    | Obligatoire | Valeur par défaut | Description                                                                                              |
|-----------------------|---------|----------|---------|----------------------------------------------------------------------------------------------------------|
| `clientToken`         | Chaîne  | Oui      | `-`     | Un [token client Datadog][4].                                                                             |
| `datacenter`          | Chaîne  | Oui      | `us`    | Le site Datadog associé à votre organisation. Choisissez `us` pour le site américain ou `eu` pour le site européen.               |
| `forwardErrorsToLogs` | Booléen | non       | `true`  | Définissez ce paramètre sur `false` pour désactiver l'envoi des logs console.error, des exceptions non interceptées et des erreurs réseau à Datadog. |
| `sampleRate`          | Numéro  | non       | `100`   | Le pourcentage de sessions à surveiller. Les logs sont uniquement envoyés pour les sessions surveillées. Choisissez une valeur entre `100` (toutes les sessions) et `0` (aucune session).   |

## Envoyer une entrée de log personnalisée

Une fois la bibliothèque de collecte de logs à partir des navigateurs lancée, envoyez une entrée de log personnalisée avec l'API :

`logger.debug | info | warn | error (message: string, messageContext = Context)`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 });
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 });
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

{{% /tab %}}
{{< /tabs >}}

On obtient le résultat suivant :

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
  "network": {"client": {"ip": "109.30.xx.xxx"}}
}
```

Le logger ajoute les informations suivantes par défaut :

* `view.url`
* `session_id`
* `http.useragent`
* `network.client.ip`

### Utiliser le statut comme paramètre

Une fois la bibliothèque de collecte de logs à partir des navigateurs lancée, utilisez l'API pour envoyer une entrée de log personnalisée directement à Datadog avec son statut comme paramètre :

`log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>);
```

{{% /tab %}}
{{< /tabs >}}

| Paramètre fictif         | Description                                                                             |
|---------------------|-----------------------------------------------------------------------------------------|
| `<MESSAGE>`         | Le message de votre log entièrement indexé par Datadog.                                |
| `<ATTRIBUTS_JSON>` | Un objet JSON valide qui comprend tous les attributs joints au `<MESSAGE>`.            |
| `<STATUT>`          | Statut de votre log. Les valeurs de statut acceptées sont `debug`, `info`, `warn` ou `error`. |

## Utilisation avancée

### Définir plusieurs loggers

La bibliothèque de collecte de logs à partir des navigateurs contient un logger par défaut, mais vous pouvez également définir d'autres loggers. Cette option est très utile lorsque plusieurs équipes travaillent sur un même projet.

#### Créer un logger

Une fois la bibliothèque de collecte de logs à partir des navigateurs lancée, utilisez l'API `createLogger` pour définir un nouveau logger :

```text
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error'
    handler?: 'http' | 'console' | 'silent'
    context?: Context
})
```

**Remarque** : ces paramètres peuvent également être définis avec les API [setLevel](#filtrer-par-statut), [setHandler](#modifier-la-destination) et [setContext](#remplacer-le-contexte).

#### Accéder à un logger personnalisé

Une fois votre logger créé, vous pouvez y accéder dans n'importe quelle partie de votre code JavaScript avec l'API :

`getLogger (name: chaîne)`

#### Exemple

Imaginons que vous disposez d'un logger `signupLogger`, défini avec tous les autres loggers :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.createLogger('signupLogger', 'info', 'http', {'env', 'staging'})
```

Vous pouvez à présent l'utiliser dans une autre partie du code avec :

```javascript
import { datadogLogs } from '@datadog/browser-logs';

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', {'env', 'staging'})
}
```

Vous pouvez à présent l'utiliser dans une autre partie du code avec :

```javascript
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.getLogger('signupLogger')
    signupLogger.info('Test sign up completed')
}
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

{{% /tab %}}
{{< /tabs >}}

### Remplacer le contexte

#### Contexte global

Une fois la bibliothèque de collecte de logs à partir des navigateurs lancée, vous pouvez :

* Définir l'intégralité du contexte pour tous vos loggers avec l'API `setLoggerGlobalContext (context: Context)`.
* Ajouter un contexte à l'ensemble de vos loggers avec l'API `addLoggerGlobalContext (key: string, value: any)`.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setLoggerGlobalContext("{'env', 'staging'}");

datadogLogs.addLoggerGlobalContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setLoggerGlobalContext("{'env', 'staging'}");

window.DD_LOGS && DD_LOGS.addLoggerGlobalContext('referrer', document.referrer);
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

{{% /tab %}}
{{< /tabs >}}

#### Contexte d'un logger

Une fois votre logger créé, vous pouvez :

* Définir l'intégralité du contexte pour votre logger avec l'API `setContext (context: Context)`.
* Ajouter un contexte à votre logger avec l'API `addContext (key: string, value: any)` :

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setContext("{'env', 'staging'}");

datadogLogs.addContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env', 'staging'}");

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer);
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

{{% /tab %}}
{{< /tabs >}}

### Filtrer par statut

Une fois la bibliothèque de collecte de logs à partir des navigateurs lancée, vous pouvez définir le niveau de log minimum pour votre logger avec l'API :

`setLevel (level?: 'debug' | 'info' | 'warn' | 'error')`

Seuls les logs avec un statut égal ou supérieur au niveau indiqué sont envoyés.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setLevel('<NIVEAU>');
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.setLevel('<NIVEAU>');
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

{{% /tab %}}
{{< /tabs >}}

### Modifier la destination

Par défaut, les loggers créés par la bibliothèque de collecte de logs à partir des navigateurs envoient les logs à Datadog.
Une fois la bibliothèque lancée, il est possible de configurer le logger de façon à ce que les logs soient envoyés à la `console` ou qu'ils ne soient pas envoyés du tout (`silent`) avec l'API :

`setHandler (handler?: 'http' | 'console' | 'silent')`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setHandler('<GESTIONNAIRE>');
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setHandler('<GESTIONNAIRE>');
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

{{% /tab %}}
{{< /tabs >}}

## Navigateurs pris en charge

La bibliothèque `datadog-logs` prend en charge tous les navigateurs modernes pour ordinateurs et appareils mobiles. IE10 et IE11 sont également pris en charge.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: /fr/account_management/api-app-keys/#client-tokens