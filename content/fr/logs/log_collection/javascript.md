---
title: Collecte de logs des navigateurs
kind: documentation
aliases:
  - /fr/logs/log_collection/web_browser
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: Dépannage pour la collecte de logs
---
Envoyez des logs à Datadog à partir de navigateurs Web ou d'autres clients Javascript grâce à la bibliothèque de journalisation JavaScript côté client `datadog-logs` de Datadog.

Grâce à la bibliothèque `datadog-logs`, vous pouvez envoyer des logs directement à Datadog depuis les clients JS et ainsi :

* Utiliser la bibliothèque en tant que logger. Tous les logs sont transmis à Datadog sous forme de documents JSON.
* Ajouter du contexte et des attributs personnalisés supplémentaires pour chaque log envoyé.
* Incorporer et transmettre automatiquement chaque erreur frontend.
* Transmettre les erreurs frontend.
* Enregistrer l'adresse IP et le user agent réels du client.
* Optimiser l'utilisation du réseau grâce aux envois automatiques en masse.

## Obtenir un token client

Pour des raisons de sécurité, les [clés d'API][1] ne peuvent pas être utilisées pour configurer la bibliothèque `datadog-logs`, car elles seraient exposées côté client dans le code JavaScript. Pour recueillir des logs depuis un navigateur Web, vous devez utiliser un [token client][2]. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation relative aux tokens client][2].

## Configurer le logger JavaScript

Les paramètres suivants peuvent être utilisés pour configurer la bibliothèque afin d'envoyer des logs à Datadog :

* Définissez `forwardErrorsToLogs` sur `false` pour désactiver la collecte automatique des erreurs frontend.
* Utilisez `addLoggerGlobalContext` pour ajouter des attributs JSON à tous les logs générés.
* Définissez `clientToken` sur la valeur du token client (**vous ne pouvez utiliser que des tokens client dans cette bibliothèque**).

Afin de ne manquer aucun log ni aucune erreur, assurez-vous de charger et de configurer la bibliothèque au début de la section <head> de vos pages.

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```html
<html>
  <head>
    <title>Exemple pour envoyer des logs à Datadog.</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"></script>
    <script>
      // Définir votre token client.
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<TOKEN_CLIENT>',
        forwardErrorsToLogs: true,
      });

      // FACULTATIF
      // Ajouter un attribut de métadonnées global. Un seul attribut peut être ajouté à la fois.
      window.DD_LOGS && DD_LOGS.addLoggerGlobalContext('<CLÉ_MÉTA>', <VALEUR_MÉTA>);
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```html
<head>
  <title>Exemple pour envoyer des logs à Datadog.</title>
  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-eu.js"></script>
  <script>
    // Définir votre token client
    window.DD_LOGS && DD_LOGS.init({
      clientToken: '<TOKEN_CLIENT>',
      forwardErrorsToLogs: true,
    });
    // FACULTATIF
    // Ajouter un attribut de métadonnées global. Un seul attribut peut être ajouté à la fois.
    window.DD_LOGS && DD_LOGS.addLoggerGlobalContext('<CLÉ_MÉTA>', <VALEUR_MÉTA>);
  </script>
</head>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

## Envoyer une entrée de log personnalisée

Envoyez une entrée de log personnalisé directement à Datadog avec la fonction `log` :

```text
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<ATTRIBUTS_JSON>,<STATUT>)
```

| Paramètre fictif         | Description                                                                             |
|---------------------|-----------------------------------------------------------------------------------------|
| `<MESSAGE>`         | Le message de votre log entièrement indexé par Datadog.                                |
| `<ATTRIBUTS_JSON>` | Un objet JSON valide qui comprend tous les attributs joints au `<MESSAGE>`.            |
| `<STATUT>`          | Statut de votre log. Les valeurs de statut acceptées sont `debug`, `info`, `warn` ou `error`. |

Vous pouvez également utiliser le statut comme paramètre fictif pour la fonction `log` `DD_LOGS.logger.debug(<MESSAGE>,<ATTRIBUTS_JSON>)`.

**Exemple :**

```js
...
<script>
...
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 });
...
</script>
...
```

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

* `http.url`
* `session_id`
* `http.useragent`
* `network.client.ip`

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

## Utilisation avancée

### Filtrer par statut

Pour certaines situations, il est possible que vous souhaitiez désactiver le mode debugging ou simplement recueillir les erreurs et avertissements. Pour ce faire, modifiez le niveau de journalisation : définissez le paramètre `level` sur `debug` (valeur par défaut), `info`, `warn` ou `error` :

```js
window.DD_LOGS && DD_LOGS.logger.setLevel('<NIVEAU>')
```

Seuls les logs avec un statut égal ou supérieur au niveau indiqué sont envoyés.

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

### Modifier la destination

Par défaut, les loggers envoient des logs à Datadog. Il est également possible de configurer le logger de façon à ce qu'il envoie des logs à la console ou qu'il n'envoie aucun log. Cette fonction, appliquée à un environnement de développement, vous permet de conserver une copie locale des logs.

Utilisez la fonction `setHandler` avec les valeurs `http` (par défaut), `console` ou `silent` :

```js
window.DD_LOGS && DD_LOGS.logger.setHandler('<GESTIONNAIRE>')
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

### Définir plusieurs loggers

La bibliothèque contient un logger par défaut, mais vous pouvez également définir d'autres loggers. Cette option est très utile lorsque plusieurs équipes travaillent sur un même projet.

Chaque logger peut être configuré avec son propre contexte, gestionnaire et niveau de log. Remarque : le `Global Context` est ajouté en haut du contexte de chaque logger.

Utilisez le bloc de configuration suivant pour définir un logger personnalisé :

```js
window.DD_LOGS && DD_LOGS.createLogger (<NOM_LOGGER>, {
    level?: 'debug' | 'info' | 'warn' | 'error'
    handler?: 'http' | 'console' | 'silent'
    context?: <ATTRIBUTS_JSON>
})
```

Ces paramètres peuvent également être définis avec les fonctions `setContext`, `setLevel` et `setHandler`.
Une fois le logger créé, vous pouvez y accéder depuis n'importe quelle partie de votre code JavaScript avec la fonction `getLogger` :

```js
if (window.DD_LOGS) {
    const my_logger = DD_LOGS.getLogger('<NOM_LOGGER>')
}
```

**Exemple :**

Imaginons que vous disposez d'un logger d'inscription, défini avec tous les autres loggers :

```js
# Créer un logger
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.createLogger('signupLogger')
    signupLogger.addContext('env', 'staging')
}
```

Vous pouvez à présent l'utiliser dans une autre partie du code avec :

```html
// ...
<script>
// ...
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.getLogger('signupLogger')
    signupLogger.info('Test sign up completed')
}
//...
</script>
//...
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

### Remplacer le contexte

Il est possible de définir le contexte entier en un appel. Cela permet également de remplacer les attributs précédemment définis (le cas échéant) :

```js
# For one logger
if (window.DD_LOGS) {
    my_logger.setContext(<ATTRIBUTS_JSON>)
}

# For the global context
window.DD_LOGS && DD_LOGS.setLoggerGlobalContext(<ATTRIBUTS_JSON>)
```

**Exemple :**

```js
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.getLogger('signupLogger')
    signupLogger.setContext({
      env: 'staging',
      team: 'user-account'
    })
}
```

**Remarque** : le check `window.DD_LOGS` est utilisé pour éviter tout problème si le chargement de la bibliothèque échoue.

## Navigateurs pris en charge

La bibliothèque `datadog-logs` prend en charge tous les navigateurs modernes pour ordinateurs et appareils mobiles. IE10 et IE11 sont également pris en charge.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens