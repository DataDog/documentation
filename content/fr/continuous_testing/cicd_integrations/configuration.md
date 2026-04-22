---
aliases:
- /fr/synthetics/cicd_integrations/configuration
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/packages/plugin-synthetics/README.md
description: Configurez les tests continus afin d'exécuter des tests dans vos pipelines
  de CI/CD.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
  tag: Blog
  text: Utiliser l'action GitHub de Datadog pour ajouter des tests continus à vos
    workflows
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: En savoir plus sur les tests continus et CI/CD
- link: /continuous_testing/explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de surveillance Synthetic et de tests en
    continu
- link: /continuous_testing/testing_tunnel
  tag: Documentation
  text: En savoir plus sur le Tunnel de test en continu
title: Configuration des tests continus et du CI/CD
---
<div class="alert alert-info">Cette page concerne la configuration des tests Continuous Testing pour vos pipelines d'intégration continue (CI) et de livraison continue (CD). Si vous souhaitez intégrer vos métriques et données CI/CD dans les dashboards Datadog, consultez la section <a href="https://docs.datadoghq.com/continuous_integration/" target="_blank">CI Visibility</a>.</div>

## Présentation

Utilisez le package NPM [`@datadog/datadog-ci`][1] pour exécuter des tests Continuous Testing directement dans votre pipeline CI/CD. Vous pouvez automatiquement interrompre un build, bloquer un déploiement et annuler un déploiement lorsqu'un test Synthetic détecte une régression.

## Configuration

### Installer le package

{{< tabs >}}
{{% tab "NPM" %}}

Installez le package via NPM :

```bash
npm install --save-dev @datadog/datadog-ci
```

{{% /tab %}}
{{% tab "Yarn" %}}

Installez le package via Yarn :

```bash
yarn add --dev @datadog/datadog-ci
```

{{% /tab %}}
{{< /tabs >}}

Ensuite, exécutez la commande suivante pour installer le plug-in Synthetics :

```bash
datadog-ci plugin install synthetics
```

### Configurer le client

Pour configurer le client, vos clés d'API et d'application Datadog doivent être définies. Ces clés peuvent être définies de trois manières différentes :

1. Défini dans un [fichier de configuration globale](#global-configuration-file) :

    ```json
    {
      "apiKey": "<API_KEY>",
      "appKey": "<APPLICATION_KEY>",
    }
    ```

2. En tant que variables d'environnement :

    ```bash
    export DD_API_KEY="<API_KEY>"
    export DD_APP_KEY="<APPLICATION_KEY>"
    ```

3. Via l'interface de ligne de commande lors de l'exécution de vos tests :

    ```bash
    yarn datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
    ```

### Fichier de configuration globale

L'utilisation d'un fichier de configuration globale (Global Config) est l'un des moyens de configurer datadog-ci. Pour ce faire, créez un fichier de configuration JSON sur votre système. Spécifiez le chemin vers le fichier à l'aide du flag `--config` ou configurez-le via la variable d'environnement `DATADOG_SYNTHETICS_CONFIG_PATH` [lors du lancement de vos tests](#run-tests-command) ou du [chargement d'une nouvelle application](#upload-application-command). Si vous ne spécifiez pas de chemin de fichier, Datadog recherche un fichier avec le nom de fichier par défaut `datadog-ci.json`.

Consultez la liste de configurations de chaque commande ci-dessous pour la liste des options avancées dans le fichier de configuration globale pertinentes pour chaque [commande run-tests](#run-tests-command) et [commande upload-application](#upload-application-command). Pour un exemple de fichier de configuration, consultez ce [fichier `global-config-complete-example.json`][9].

Exemple :

```jsonc
{
  "apiKey": "<API_KEY>",
  "appKey": "<APPLICATION_KEY>",
  "batchTimeout": 1800000,
  "datadogSite": "datadoghq.com",
  "defaultTestOverrides": {
    "allowInsecureCertificates": true,
    "basicAuth": {"username": "test", "password": "test"},
    "body": "{\"fakeContent\":true}",
    "bodyType": "application/json",
    "cookies": "name1=value1;name2=value2;",
    "setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly",
    "defaultStepTimeout": 15,
    "deviceIds": ["chrome.laptop_large"],
    "executionRule": "skipped",
    "followRedirects": true,
    "headers": {"NEW_HEADER": "NEW VALUE"},
    "locations": ["aws:us-east-1"],
    "mobileApplicationVersion": "01234567-8888-9999-abcd-efffffffffff",
    "mobileApplicationVersionFilePath": "path/to/application.apk",
    "resourceUrlSubstitutionRegexes": ["(https://www.)(.*)|$1staging-$2"],
    "retry": {"count": 2, "interval": 300},
    "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
    "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
    "testTimeout": 300,
    "variables": {"NEW_VARIABLE": "NEW VARIABLE"}
  },
  "failOnCriticalErrors": true,
  "failOnMissingTests": true,
  "failOnTimeout": true,
  "files": ["{,!(node_modules)/**/}*.synthetics.json"],
  "proxy": {
    "auth": {
      "username": "login",
      "password": "pwd"
    },
    "host": "127.0.0.1",
    "port": 3128,
    "protocol": "http"
  },
  "subdomain": "subdomainname",
  "tunnel": true
}
```

### Variables d'environnement

En plus du fichier de configuration globale, vous pouvez configurer toutes les propriétés à l'aide de variables d'environnement. Si une propriété est définie à la fois dans le fichier de configuration globale et comme variable d'environnement, la variable d'environnement est prioritaire.

Exemple :

```bash
export DATADOG_SITE=datadoghq.com
```

### Options de ligne de commande

L'interface de ligne de commande offre un autre moyen de définir des options et de configurer le comportement de datadog-ci. Ces options remplacent le fichier de configuration globale et les variables d'environnement.

Exemple :

```bash
yarn datadog-ci synthetics run-tests --public-id pub-lic-id1
```

La priorité des 3 formes de configuration est la suivante :

```yml
Global Config < Environment variables < CLI parameters
```

### Utiliser datadog-ci comme bibliothèque

Vous pouvez également utiliser le package `datadog-ci` comme bibliothèque dans votre application Node.js pour déclencher des tests. Pour ce faire, importez le package depuis la commande Synthetics `run-tests` et appelez la fonction `executeWithDetails()`.

``` javascript
import * as synthetics from '@datadog/datadog-ci-plugin-synthetics'

const { results, summary } = await synthetics.executeTests(...)
```

### Utiliser un proxy

Vous pouvez configurer un proxy à utiliser pour les connexions sortantes vers Datadog. Pour ce faire, utilisez la clé `proxy` du fichier de configuration globale ou la variable d'environnement `HTTPS_PROXY`.

**Remarque** : il s'agit de la seule exception où le fichier de configuration globale est prioritaire sur la variable d'environnement. Il n'y a pas d'option pour définir cela via l'interface de ligne de commande.

Étant donné que la [bibliothèque `proxy-agent`][2] est utilisée pour configurer le proxy, les protocoles suivants sont pris en charge : `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` et `pac+https`. La clé `proxy` du fichier de configuration globale est transmise à une nouvelle instance de `proxy-agent`, ce qui signifie que la même configuration est prise en charge pour cette bibliothèque.

Pour utiliser un proxy, vous devez d'abord définir le certificat CA afin que datadog-ci fasse confiance à votre proxy. Vous pouvez le faire en définissant la variable d'environnement `NODE_EXTRA_CA_CERTS` sur le chemin de votre certificat CA. Sinon, vous pourriez obtenir une erreur `unable to verify the first certificate`.

```bash
export NODE_EXTRA_CA_CERTS=/path/to/your-ca-cert.pem
```

Lors de l'utilisation de la configuration globale, les clés `host` et `port` sont des arguments obligatoires et la clé `protocol` est par défaut `http` si elle n'est pas définie.

Exemple :

```jsonc
{
  // ...
  "proxy": {
    "auth": {
      "username": "login",
      "password": "pwd"
    },
    "host": "127.0.0.1",
    "port": 3128,
    "protocol": "http"
  },
  // ...
}
```

Le format utilisé pour la variable d'environnement `HTTPS_PROXY` est `<protocol>://<username>:<password>@<host>:<port>`, comme décrit par la bibliothèque [proxy-from-env][13] qu'utilise la [bibliothèque `proxy-agent`][2] pour analyser les variables d'environnement.
La variable `HTTPS_PROXY` est utilisée au lieu de la variable `HTTP_PROXY`, car l'API Datadog utilise le protocole HTTPS.

Exemple :

```bash
export HTTPS_PROXY=http://login:pwd@127.0.0.1:3128
```

Si vous souhaitez confirmer qu'un proxy est utilisé, vous pouvez définir la variable d'environnement `DEBUG` sur `proxy-agent` comme ceci :

```bash
DEBUG=proxy-agent yarn datadog-ci synthetics run-tests
```

## Commande Run Tests

Vous pouvez décider de faire en sorte que l'interface de ligne de commande découvre automatiquement tous vos tests Synthetics `**/*.synthetics.json` (consultez la section [fichiers de test](#test-files)) ou spécifier les tests que vous souhaitez exécuter à l'aide du flag `-p,--public-id`.

{{< tabs >}}
{{% tab "NPM" %}}

Lancer des tests en exécutant l'interface de ligne de commande via **NPM** :

Ajoutez les lignes suivantes à votre `package.json` :

```json
{
  "scripts": {
    "datadog-ci-synthetics": "datadog-ci synthetics run-tests"
  }
}
```

Exécutez ensuite :

```bash
npm run datadog-ci-synthetics
```

**Remarque** : si vous lancez vos tests avec un nom de fichier personnalisé pour le [fichier de configuration globale](#global-configuration-file), ajoutez à la commande associée à votre script `datadog-ci-synthetics` `--config <CUSTOM_PATH_TO_GLOBAL_CONFIG_FILE>`.

{{% /tab %}}
{{% tab "Yarn" %}}

Lancer des tests en exécutant l'interface de ligne de commande via **Yarn** :

La sous-commande `run-tests` accepte l'argument `--public-id` (ou raccourci `-p`) pour déclencher uniquement le test spécifié. Il peut être défini plusieurs fois pour exécuter plusieurs tests :

```bash
yarn datadog-ci synthetics run-tests --public-id aaa-aaa-aaa --public-id bbb-bbb-bbb
```

Vous pouvez également spécifier une version spécifique d'un test en utilisant le format `<public-id>@<version>` :

```bash
yarn datadog-ci synthetics run-tests --public-id aaa-aaa-aaa@2 --public-id bbb-bbb-bbb@4
```

Il est également possible de déclencher des tests correspondant à une requête de recherche en utilisant l'argument `--search` (ou raccourci `-s`). Avec cette option, les remplacements définis dans votre [fichier de configuration globale](#global-configuration-file) s'appliquent à tous les tests découverts avec la requête de recherche.

```bash
yarn datadog-ci synthetics run-tests -s 'tag:e2e-tests'
```

Vous pouvez utiliser `--files` (raccourci `-f`) pour remplacer le motif glob par défaut (qui correspondrait à tous les fichiers `**/*.synthetics.json`).

```bash
yarn datadog-ci synthetics run-tests -f ./component-1/**/*.synthetics.json -f ./component-2/**/*.synthetics.json
```

**Remarque** : si vous lancez vos tests avec un nom de fichier personnalisé pour le [fichier de configuration globale](#global-configuration-file), ajoutez à la commande associée à votre script `datadog-ci-synthetics` `--config <CUSTOM_PATH_TO_GLOBAL_CONFIG_FILE>`.

{{% /tab %}}
{{< /tabs >}}

### Liste de configurations

<!--
  Lors de la mise à jour de l'un de ces éléments, n'oubliez pas de mettre à jour le document Google Sheets et les intégrations CI pertinentes :
    https://docs.google.com/spreadsheets/d/1VB8ntED7hz2McIwp7NaHADVt16nFUuNnKERBl78tldQ/edit?usp=sharing

  Pour plus d'informations, consultez https://datadoghq.atlassian.net/wiki/x/LwBfyQ
-->

#### `apiKey` (requis)

Votre clé d'API Datadog. Cette clé est [créée dans votre organisation Datadog][15] et doit être stockée en tant que secret.

**Options de configuration**

* Global Config : `"apiKey": "<API_KEY>"`
* Variable ENV : `DD_API_KEY="<API_KEY>"`
* Paramètre CLI : `--apiKey "<API_KEY>"`

#### `appKey` (requis)

Votre clé d'application Datadog. Cette clé est [créée dans votre organisation Datadog][15] et doit être stockée en tant que secret.

**Options de configuration**

* Global Config : `"appKey": "<APPLICATION_KEY>"`
* Variable ENV : `DD_APP_KEY="<APPLICATION_KEY>"`
* Paramètre CLI : `--appKey "<APPLICATION_KEY>"`

#### `batchTimeout`

La durée en millisecondes après laquelle le batch CI échoue en raison d'un délai d'expiration. Cela n'affecte pas le résultat d'une exécution de test qui a déjà commencé.

**Options de configuration**

* Par défaut : `1800000` (30 minutes)
* Global Config : `"batchTimeout": 1800000`
* Variable ENV : `DATADOG_SYNTHETICS_BATCH_TIMEOUT=1800000`
* Paramètre CLI : `--batchTimeout 1800000`

#### `configPath`

Le chemin vers le [fichier de configuration globale](#global-configuration-file) qui configure datadog-ci.

**Options de configuration**

* Par défaut : `datadog-ci.json`
* Global Config : N/A
* Variable ENV : `DATADOG_SYNTHETICS_CONFIG_PATH=global-config.json` 
* Paramètre CLI : `--config global-config.json` 

#### `datadogSite`

Votre site Datadog. Les valeurs possibles sont répertoriées [dans ce tableau][16].

 Définissez-le sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE correct est sélectionné à droite).

**Options de configuration**

* Par défaut : `datadoghq.com`
* Global Config : `"datadogSite": "datadoghq.com"`
* Variable ENV : `DATADOG_SITE=datadoghq.com`
* Paramètre CLI : `--datadogSite datadoghq.com`

#### `defaultTestOverrides`

Remplacements pour les tests Synthetic appliqués à tous les tests.

**Options de configuration**

* Global Config : consultez la section [remplacements de test](#test-overrides)
* Variable ENV : toutes les variables suivent le modèle `DATADOG_SYNTHETICS_OVERRIDE_...`
* Paramètre CLI : tous les paramètres CLI utilisent le modèle `--override option=value`

#### `failOnCriticalErrors`

Faire échouer la tâche CI si une erreur critique généralement transitoire se produit, telle que des limitations de débit, des échecs d'authentification ou des problèmes d'infrastructure Datadog.

**Options de configuration**

* Par défaut : `false`
* Global Config : `"failOnCriticalErrors": true`
* Variable ENV : `DATADOG_SYNTHETICS_FAIL_ON_CRITICAL_ERRORS=true`
* Paramètre CLI : `--failOnCriticalErrors` / `--no-failOnCriticalErrors`

#### `failOnMissingTests`

Faire échouer la tâche CI si la liste des tests à exécuter est vide ou si certains tests explicitement répertoriés sont manquants.

**Options de configuration**

* Par défaut : `false`
* Global Config : `"failOnMissingTests": true`
* Variable ENV : `DATADOG_SYNTHETICS_FAIL_ON_MISSING_TESTS=true`
* Paramètre CLI : `--failOnMissingTests` / `--no-failOnMissingTests`

#### `failOnTimeout`

Faire échouer la tâche CI si le batch CI échoue en raison d'un délai d'expiration.

**Options de configuration**

* Par défaut : `true`
* Global Config : `"failOnTimeout": true`
* Variable ENV : `DATADOG_SYNTHETICS_FAIL_ON_TIMEOUT=true`
* Paramètre CLI : `--failOnTimeout` / `--no-failOnTimeout`

#### `files`

Motifs glob pour détecter les [fichiers de configuration de test](#test-files) Synthetic.

**Options de configuration**

* Par défaut : `["{,!(node_modules)/**/}*.synthetics.json"]`
* Global Config : `"files": ["{,!(node_modules)/**/}*.synthetics.json"]`
* Variable ENV : `DATADOG_SYNTHETICS_FILES="{,!(node_modules)/**/}*.synthetics.json"`
* Paramètre CLI : `-f "{,!(node_modules)/**/}*.synthetics.json"` / `--files "{,!(node_modules)/**/}*.synthetics.json"`

#### `jUnitReport`

Le nom de fichier d'un rapport JUnit si vous souhaitez en générer un.

**Options de configuration**

* Par défaut : aucun
* Global Config : `"jUnitReport": "e2e-test-junit.xml"`
* Variable ENV : `DATADOG_SYNTHETICS_JUNIT_REPORT="e2e-test-junit.xml"`
* Paramètre CLI :`-j "e2e-test-junit.xml"` / `--jUnitReport "e2e-test-junit.xml"`

#### `mobileApplicationVersionFilePath`

Remplacer la version de l'application mobile pour les [tests d'applications mobiles Synthetic][18] par une application locale ou récemment créée.

**Options de configuration**

* Global Config : `"mobileApplicationVersionFilePath": "path/to/application.apk"`
* Variable ENV : non disponible
* Paramètre CLI : `--mobileApp "path/to/application.apk"` / `--mobileApplicationVersionFilePath "path/to/application.apk"`

#### `proxy`

Le proxy à utiliser pour les connexions sortantes vers Datadog. Les clés `host` et `port` sont des arguments obligatoires, la clé `protocol` est par défaut `http`. Les valeurs prises en charge pour la clé `protocol` sont `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` et `pac+https`. La bibliothèque utilisée pour configurer le proxy est la bibliothèque [proxy-agent][2].

**Options de configuration**

* Global Config : consultez la section [Utiliser un proxy](#use-a-proxy) pour un exemple.
* Variable ENV : `HTTPS_PROXY=http://login:pwd@127.0.0.1:3128`
* Paramètre CLI : N/A

#### `publicIds`

ID publics des tests Synthetic à exécuter. Si aucune valeur n'est fournie, les tests sont découverts dans les [fichiers de configuration de test](#test-files) Synthetic.

Vous pouvez spécifier une version spécifique d'un test en utilisant le format `<public-id>@<version>`. Par exemple, `abc-def-ghi@123` exécute la version 123 du test avec l'ID public `abc-def-ghi`. Si aucune version n'est spécifiée, la dernière version du test est utilisée.

**Options de configuration**

* Par défaut : aucun
* Global Config : `"publicIds": ["abc-def-ghi", "123-456-789"]`
* Variable ENV : `DATADOG_SYNTHETICS_PUBLIC_IDS="abc-def-ghi;123-456-789"`
* Paramètre CLI : `-p "abc-def-ghi" --public-id "123-456-789"`

#### `selectiveRerun`

Indique s'il faut uniquement réexécuter les tests ayant échoué. Si un test a déjà réussi pour un commit donné, il ne sera pas réexécuté dans les batchs CI suivants. Par défaut, le [paramètre par défaut de votre organisation][17] est utilisé. Définissez-le sur `false` pour forcer des exécutions complètes lorsque votre configuration l'active par défaut.

**Options de configuration**

* Par défaut : `false`
* Global Config : `"selectiveRerun": true`
* Variable ENV : `DATADOG_SYNTHETICS_SELECTIVE_RERUN=true`
* Paramètre CLI : `--selectiveRerun` / `--no-selectiveRerun`

#### `subdomain`

Le sous-domaine personnalisé pour accéder à votre organisation Datadog. Si votre URL est `myorg.datadoghq.com`, le sous-domaine personnalisé est `myorg`.

**Options de configuration**

* Par défaut : `app`
* Global Config : `"subdomain": "myorg"`
* Variable ENV : `DATADOG_SUBDOMAIN="myorg"`
* Paramètre CLI : `--subdomain "myorg"`

#### `testSearchQuery`

Utilisez une [requête de recherche][14] pour sélectionner les tests Synthetic à exécuter. Utilisez la [barre de recherche de la page de liste des tests Synthetic][5] pour élaborer votre requête, puis copiez-la et collez-la.

Dans la ligne de commande, la requête doit être entre guillemets simples. Voici un exemple avec une facette, un tag `value` et un tag `<KEY>:<VALUE>` :

```
datadog-ci synthetics run-tests --search 'team:unicorn tag:e2e-tests tag:"managedBy:terraform"'
```

**Options de configuration**

* Par défaut : aucun
* Global Config : `"testSearchQuery": "tag:e2e-tests"`
* Variable ENV : `DATADOG_SYNTHETICS_TEST_SEARCH_QUERY="tag:e2e-tests"`
* Paramètre CLI : `-s "tag:e2e-tests"` / `--search "tag:e2e-tests"`

#### `tunnel`

Utilisez le [tunnel Continuous Testing](https://docs.datadoghq.com/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel) pour lancer des tests contre des environnements internes.

Pour plus d'informations, consultez la section [Utiliser des environnements locaux et de staging](#using-local-and-staging-environments).

Pour résoudre les problèmes de tests échouant en raison du tunnel, vous pouvez activer les logs de débogage avec `DEBUG=synthetics:tunnel`.

**Options de configuration**

* Par défaut : `false`
* Global Config : `"tunnel": true`
* Variable ENV : `DATADOG_SYNTHETICS_TUNNEL=true`
* Paramètre CLI : `-t` / `--tunnel` / `--no-tunnel`

### Remplacements de test

<!--
  Lors de la mise à jour de l'un de ces éléments, n'oubliez pas de mettre à jour le document Google Sheets et les intégrations CI pertinentes :
    https://docs.google.com/spreadsheets/d/1VB8ntED7hz2McIwp7NaHADVt16nFUuNnKERBl78tldQ/edit?usp=sharing

  Pour plus d'informations, consultez https://datadoghq.atlassian.net/wiki/x/LwBfyQ
-->

Tous les remplacements de test sont facultatifs et permettent de remplacer la configuration de test stockée dans Datadog.

Ces remplacements peuvent être appliqués à tous les tests avec `defaultTestOverrides` dans le [fichier de configuration globale](#global-configuration-file), ou à certains tests spécifiques avec `testOverrides` dans un [fichier de configuration de test](#test-files).

Ces options peuvent également être définies avec des variables d'environnement commençant par `DATADOG_SYNTHETICS_OVERRIDE_...` ou avec le paramètre CLI `--override` suivant ce modèle : `--override option=value`.

#### `allowInsecureCertificates` (booléen)

Remplacer les vérifications de certificat dans les tests API et Browser Synthetic.

**Options de configuration**

* Global/Test Config : `"allowInsecureCertificates": true`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_ALLOW_INSECURE_CERTIFICATES=true`
* Paramètre CLI : `--override allowInsecureCertificates=true`

#### `basicAuth` (objet)

Remplacer les identifiants pour l'authentification de base.

* `username` (chaîne) : le nom d'utilisateur pour l'authentification de base.
* `password` (chaîne) : le mot de passe pour l'authentification de base.

**Options de configuration**

* Global/Test Config : `"basicAuth": {"username": "test_username", "password": "test_password"}`
* Variable ENV :
  * `DATADOG_SYNTHETICS_OVERRIDE_BASIC_AUTH_USERNAME=test_username`
  * `DATADOG_SYNTHETICS_OVERRIDE_BASIC_AUTH_PASSWORD=test_password`
* Paramètre CLI :
  * `--override basicAuth.username=test_username`
  * `--override basicAuth.password=test_password`

#### `body` (chaîne)

Remplacer les données à envoyer dans les tests API.

**Options de configuration**

* Global/Test Config : `"body": "{\"fakeContent\":true}"`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_BODY={"fakeContent":true}`
* Paramètre CLI : `--override body={"fakeContent":true}`

#### `bodyType` (chaîne)

Remplacer le type de contenu pour les données à envoyer dans les tests API.

**Options de configuration**

* Global/Test Config : `"bodyType": "application/json"`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_BODY_TYPE=application/json`
* Paramètre CLI : `--override bodyType=application/json`

#### `cookies` (chaîne ou objet)

Remplacer les cookies pour les tests API et Browser.

* Si c'est une chaîne, elle est utilisée pour remplacer les cookies d'origine.
* Si c'est un objet, le format doit être `{append?: boolean, value: string}`, et selon la valeur de `append`, il est ajouté ou remplace les cookies d'origine.

**Options de configuration**

* Global/Test Config : `"cookies": "name1=value1;name2=value2"` (équivalent à `"append": false`) ou `"cookies": {"append": true, "value": "name1=value1;name2=value2"}` 
* Variable ENV :
  * `DATADOG_SYNTHETICS_OVERRIDE_COOKIES="name1=value1;name2=value2"`
  * `DATADOG_SYNTHETICS_OVERRIDE_COOKIES_APPEND=true`
* Paramètre CLI :
  * `--override cookies="name1=value1;name2=value2"`
  * `--override cookies.append=true`

#### `setCookies` (chaîne ou objet)

Remplacer les en-têtes `Set-Cookie` dans les tests Browser uniquement.

* Si c'est une chaîne, elle est utilisée pour remplacer les en-têtes `Set-Cookie` d'origine.
* Si c'est un objet, le format doit être `{append?: boolean, value: string}`, et selon la valeur de `append`, il est ajouté ou remplace les en-têtes `Set-Cookie` d'origine.

**Options de configuration**

* Global/Test Config : `"setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly"` (équivalent à `"append": false`) ou `"setCookies": {"append": true, "value": "setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly"}` 
* Variable ENV :
  * `DATADOG_SYNTHETICS_OVERRIDE_SET_COOKIES="name1=value1;name2=value2"`
  * `DATADOG_SYNTHETICS_OVERRIDE_SET_COOKIES_APPEND=true`
* Paramètre CLI :
  * `--override setCookies="setCookies": "name1=value1 \n name2=value2; Domain=example.com \n name3=value3; Secure; HttpOnly"`
  * `--override setCookies.append=true`

#### `defaultStepTimeout` (nombre)

Remplacer la durée maximale des steps en secondes pour les tests Browser. Cela ne remplace pas les délais d'expiration de steps définis individuellement.

**Options de configuration**

* Global/Test Config : `"defaultStepTimeout": 15`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_DEFAULT_STEP_TIMEOUT=15`
* Paramètre CLI : `--override defaultStepTimeout=15`

#### `deviceIds` (tableau)

Remplacer la liste des appareils sur lesquels exécuter les tests Synthetic.

**Options de configuration**

* Global/Test Config : `"deviceIds": ["chrome.laptop_large", "firefox.tablet"]`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_DEVICE_IDS="chrome.laptop_large;firefox.tablet"`
* Paramètre CLI : `--override deviceIds="chrome.laptop_large;firefox.tablet"`

#### `executionRule` (chaîne)

Remplacer la règle d'exécution pour les tests Synthetic.

La règle d'exécution pour le test définit le comportement du batch CI en cas de test échouant. Elle accepte l'une des valeurs suivantes :

* `blocking` : un test ayant échoué entraîne l'échec du batch CI.
* `non_blocking` : un test ayant échoué n'entraîne pas l'échec du batch CI.
* `skipped` : le test n'est pas du tout exécuté.

**Options de configuration**

* Global/Test Config : `"executionRule": "skipped"`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_EXECUTION_RULE=skipped`
* Paramètre CLI : `--override executionRule=skipped`

#### `followRedirects` (booléen)

Remplacer si les redirections HTTP doivent être suivies ou non dans les tests API.

**Options de configuration**

* Global/Test Config : `"followRedirects": true` 
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_FOLLOW_REDIRECTS=true`
* Paramètre CLI : `--override followRedirects=true`

#### `headers` (objet)

Remplacer les en-têtes dans les tests API et Browser.

Cet objet spécifie les en-têtes à remplacer dans le test. Il doit avoir des clés représentant les noms des en-têtes à remplacer, et des valeurs indiquant les nouvelles valeurs d'en-têtes.

**Options de configuration**

* Global/Test Config : `"headers": {"NEW_HEADER_1": "NEW VALUE 1", "NEW_HEADER_2": "NEW VALUE 2"}`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_HEADERS='{"NEW_HEADER_1":"NEW VALUE 1", "NEW_HEADER_2":"NEW VALUE 2"}'` (**Remarque** : cela doit être du JSON valide)
* Paramètre CLI :
  * `--override headers.NEW_HEADER_1="NEW VALUE 1"`
  * `--override headers.NEW_HEADER_2="NEW VALUE 2"`

#### `locations` (tableau)

Remplacer la liste des emplacements à partir desquels exécuter le test. Les valeurs possibles sont répertoriées [dans cette réponse d'API][12].

**Options de configuration**

* Global/Test Config : `"locations": ["aws:us-east-1", "gcp:europe-west3"]`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_LOCATIONS="aws:us-east-1;gcp:europe-west3"`
* Paramètre CLI : `--override locations="aws:us-east-1;gcp:europe-west3"`

#### `mobileApplicationVersion` (chaîne)

Remplacer la version de l'application mobile pour les tests d'applications mobiles Synthetic. La version doit être chargée et disponible dans Datadog.

**Options de configuration**

* Global/Test Config : `"mobileApplicationVersion": "01234567-8888-9999-abcd-efffffffffff"`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_MOBILE_APPLICATION_VERSION=01234567-8888-9999-abcd-efffffffffff`
* Paramètre CLI : `--mobileApplicationVersion=01234567-8888-9999-abcd-efffffffffff`

#### `mobileApplicationVersionFilePath` (chaîne)

Remplacer la version de l'application pour les tests d'applications mobiles Synthetic.

**Options de configuration**

* Global/Test Config : `"mobileApplicationVersionFilePath": "path/to/application.apk"`
* Variable ENV : non disponible
* Paramètre CLI : `--mobileApplicationVersionFilePath=path/to/application.apk`

#### `resourceUrlSubstitutionRegexes` (tableau)

Un tableau de motifs regex pour modifier les URL de ressources dans le test. Cela peut être utile pour modifier dynamiquement les URL de ressources pendant l'exécution du test.

Chaque motif regex doit être au format :

- **`your_regex|your_substitution`** : la syntaxe basée sur le pipe, pour éviter tout conflit avec les caractères / dans les URL.
  - Par exemple, `https://example.com(.*)|http://subdomain.example.com$1` pour transformer `https://example.com/resource` en `http://subdomain.example.com/resource`.
- **`s/your_regex/your_substitution/modifiers`** : la syntaxe slash, qui prend en charge les modificateurs.
  - Par exemple, `s/(https://www.)(.*)/$1staging-$2/` pour transformer `https://www.example.com/resource` en `https://www.staging-example.com/resource`.

**Options de configuration**

* Global/Test Config : `"resourceUrlSubstitutionRegexes": ["(https://www.)(.*)|$1staging-$2"]` 
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_RESOURCE_URL_SUBSTITUTION_REGEXES='(https://www.)(.*)|$1staging-$2'`
* Paramètre CLI : `--override resourceUrlSubstitutionRegexes='(https://www.)(.*)|$1staging-$2'`

#### `retry` (objet)

Remplacer la stratégie de nouvelle tentative pour le test.

Cet objet a les deux attributs indépendants suivants :
* `count` (entier) : le nombre de tentatives à effectuer en cas d'échec du test.
* `interval` (entier) : l'intervalle entre les tentatives en millisecondes.

**Options de configuration**

* Global/Test Config : `"retry": {"count": 2, "interval": 300}`
* Variable ENV :
  * `DATADOG_SYNTHETICS_OVERRIDE_RETRY_COUNT=2`
  * `DATADOG_SYNTHETICS_OVERRIDE_RETRY_INTERVAL=300`
* Paramètre CLI :
  * `--override retry.count=2`
  * `--override retry.interval=300`

#### `startUrl` (chaîne)

Remplacer l'URL de départ pour les tests API et Browser.

Les variables locales et [globales][11] spécifiées dans l'URL (par exemple, `{{ URL }}`) sont remplacées lorsque le test est exécuté.

Vous pouvez combiner cela avec le remplacement `variables` pour remplacer à la fois l'URL de départ et les valeurs de variables. Par exemple :

```bash
--override startUrl="{{ URL }}?static_hash={{ STATIC_HASH }}" --override variables.STATIC_HASH=abcdef
```

**Options de configuration**

* Global/Test Config : `"startUrl": "{{ URL }}?static_hash={{ STATIC_HASH }}"`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_START_URL="{{ URL }}?static_hash={{ STATIC_HASH }}"`
* Paramètre CLI : `--override startUrl="{{ URL }}?static_hash={{ STATIC_HASH }}"`

#### `startUrlSubstitutionRegex` (chaîne)

Un regex pour modifier l'URL de départ des tests Browser et HTTP, qu'elle provienne du test d'origine ou du remplacement `startUrl`.

Si l'URL contient des variables, ce regex s'applique après l'interpolation des variables.

Deux formats sont possibles :

- **`your_regex|your_substitution`** : la syntaxe basée sur le pipe, pour éviter tout conflit avec les caractères `/` dans les URL.
  - Par exemple, `https://example.com(.*)|http://subdomain.example.com$1` pour transformer `https://example.com/test` en `http://subdomain.example.com/test`.
- **`s/your_regex/your_substitution/modifiers`** : la syntaxe slash, qui prend en charge les modificateurs.
  - Par exemple, `s/(https://www.)(.*)/$1extra-$2/` pour transformer `https://www.example.com` en `https://www.extra-example.com`.

**Options de configuration**

* Global/Test Config : `"startUrlSubstitutionRegex": "(https://www.)(.*)|$1extra-$2"` 
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_START_URL_SUBSTITUTION_REGEX='(https://www.)(.*)|$1extra-$2'`
* Paramètre CLI : `--override startUrlSubstitutionRegex='(https://www.)(.*)|$1extra-$2'` 

#### `testTimeout` (nombre)

Remplacer la durée maximale en secondes pour les tests Browser.

**Options de configuration**

* Global/Test Config : `"testTimeout": 300`
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_TEST_TIMEOUT=300`
* Paramètre CLI : `--override testTimeout=300`

#### `variables` (objet)

Remplacer les variables locales et [globales][11] existantes ou injecter de nouvelles variables dans les tests Synthetic.

Cet objet doit inclure des clés correspondant aux noms des variables à remplacer, et des valeurs représentant les nouvelles valeurs pour ces variables.

**Options de configuration**

* Global/Test Config : `"variables": {"NEW_VARIABLE_1": "NEW VARIABLE 1", "NEW_VARIABLE_2": "NEW VARIABLE 2"}` 
* Variable ENV : `DATADOG_SYNTHETICS_OVERRIDE_VARIABLES='{"NEW_VARIABLE_1":"NEW VARIABLE 1", "NEW_VARIABLE_2":"NEW VARIABLE 2"}'` (**Remarque** : cela doit être du JSON valide)
* Paramètre CLI :
  * `--override variables.NEW_VARIABLE_1="NEW VARIABLE 1"`
  * `--override variables.NEW_VARIABLE_2="NEW VARIABLE 2"`

### Configurer une URL de départ

Pour configurer l'URL sur laquelle votre test démarre, fournissez un `startUrl` à votre objet de test. Construisez votre propre URL de départ avec n'importe quelle partie de l'URL de départ d'origine de votre test et incluez des variables locales et [globales][11].

### Configurer un sous-domaine personnalisé

Si l'organisation utilise un sous-domaine personnalisé pour accéder à Datadog, cela doit être défini dans la variable d'environnement `DATADOG_SUBDOMAIN` ou dans le fichier de configuration globale sous la clé `subdomain` afin d'afficher correctement l'URL des résultats de test.

Par exemple, si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, définissez la variable d'environnement sur `myorg` :

```bash
export DATADOG_SUBDOMAIN="myorg"
```

### Configurer des emplacements personnalisés

Vous pouvez utiliser `DATADOG_SYNTHETICS_OVERRIDE_LOCATIONS` pour remplacer les emplacements où vos tests s'exécutent. Les emplacements doivent être séparés par un point-virgule (`;`). La configuration dans les [fichiers de test](#test-files) est prioritaire sur les autres remplacements.

```bash
export DATADOG_SYNTHETICS_OVERRIDE_LOCATIONS="aws:us-east-1;aws:us-east-2"
```

### Fichiers de test

Les fichiers de configuration de test (Test Config) vous permettent de personnaliser des tests individuels ou de configurer plusieurs exécutions du même test avec des paramètres différents, au-delà de ce que vous pouvez faire avec d'autres méthodes de configuration.

Vous pouvez trouver une liste de toutes ces options dans la section [remplacements de test](#test-overrides).

Ces fichiers sont prioritaires sur les fichiers de configuration globale, les variables d'environnement et les paramètres CLI. L'ordre de priorité incluant les configurations de test est le suivant :

``` yml
Global Config < Environment variables < CLI parameters < Test Config
```

Pour déterminer quels tests exécuter, une ou plusieurs de ces options peuvent être passées à `datadog-ci` :
- L'[option `files`](#files)
- L'[option `publicIds`](#publicids)
- L'[option `testSearchQuery`](#testsearchquery)

Si aucune de ces options n'est passée, `datadog-ci` découvre automatiquement les fichiers de configuration de test avec le motif glob `{,!(node_modules)/**/}*.synthetics.json` (chaque fichier se terminant par `.synthetics.json`, à l'exception de ceux dans le dossier `node_modules`).

**Remarque** : la recherche de fichiers commence à partir du répertoire de travail actuel, elle peut donc être lente si la commande est exécutée à partir d'un répertoire volumineux, comme un dossier personnel. Si la commande de recherche de fichiers est trop lente, envisagez :
- D'utiliser les options ci-dessus pour spécifier les tests (cela désactivera la recherche de fichiers),
- Ou d'affiner le motif glob avec l'[option `files`](#files).
  - Par exemple, en utilisant `*` au lieu de `**` ou en ajoutant un dossier spécifique au motif.

`<TEST_PUBLIC_ID>` correspond à l'identifiant du test fourni dans l'URL de la page des détails du test (par exemple, pour `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, l'identifiant est `abc-def-ghi`) ou à l'URL complète de cette page (c'est-à-dire directement `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

Exemple :

```jsonc
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "<TEST_PUBLIC_ID_1>",
      "testOverrides": {
        "allowInsecureCertificates": true,
        "basicAuth": {"username": "test", "password": "test"},
        "body": "{\"fakeContent\":true}",
        "bodyType": "application/json",
        "cookies": "name1=value1;name2=value2;",
        "defaultStepTimeout": 15,
        "deviceIds": ["chrome.laptop_large"],
        "executionRule": "skipped",
        "followRedirects": true,
        "headers": {"NEW_HEADER": "NEW VALUE"},
        "locations": ["aws:us-east-1"],
        "mobileApplicationVersion": "01234567-8888-9999-abcd-efffffffffff",
        "mobileApplicationVersionFilePath": "path/to/application.apk",
        "resourceUrlSubstitutionRegexes": ["(https://www.)(.*)|$1staging-$2"],
        "retry": {"count": 2, "interval": 300},
        "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
        "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
        "testTimeout": 300,
        "variables": {"MY_VARIABLE": "new title"}
      }
    },
    {
      "id": "<TEST_PUBLIC_ID_2>",
      "testOverrides": {
        "allowInsecureCertificates": true,
        // ...
        "variables": {"MY_VARIABLE": "new title"}
      }
    }
  ]
}
```

## Commande de publication d'application

Cette commande charge une nouvelle version vers une application mobile **existante**.

### Liste de configurations

<!--
  Lors de la mise à jour de l'un de ces éléments, n'oubliez pas de mettre à jour le document Google Sheets et les intégrations CI pertinentes :
    https://docs.google.com/spreadsheets/d/1VB8ntED7hz2McIwp7NaHADVt16nFUuNnKERBl78tldQ/edit?usp=sharing

  Pour plus d'informations, consultez https://datadoghq.atlassian.net/wiki/x/LwBfyQ
-->

#### `apiKey` (requis)

Votre clé d'API Datadog. Cette clé est [créée dans votre organisation Datadog][15] et doit être stockée en tant que secret.

**Options de configuration**

* Global Config : `"apiKey": "<API_KEY>"`
* Variable ENV : `DD_API_KEY="<API_KEY>"`
* Paramètre CLI : `--apiKey "<API_KEY>"`

#### `appKey` (requis)

Votre clé d'application Datadog. Cette clé est [créée dans votre organisation Datadog][15] et doit être stockée en tant que secret.

**Options de configuration**

* Global Config : `"appKey": "<APPLICATION_KEY>"`
* Variable ENV : `DD_APP_KEY="<APPLICATION_KEY>"`
* Paramètre CLI : `--appKey "<APPLICATION_KEY>"`

#### `configPath`

Le chemin vers le [fichier de configuration globale](#global-configuration-file) qui configure datadog-ci.

**Options de configuration**

* Par défaut : `datadog-ci.json`
* Global Config : N/A
* Variable ENV : `DATADOG_SYNTHETICS_CONFIG_PATH=global-config.json` 
* Paramètre CLI : `--config global-config.json` 

#### `datadogSite`

Votre site Datadog. Les valeurs possibles sont répertoriées [dans ce tableau][16].

 Définissez-le sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE correct est sélectionné à droite).

**Options de configuration**

* Par défaut : `datadoghq.com`
* Global Config : `"datadogSite": "datadoghq.com"`
* Variable ENV : `DATADOG_SITE=datadoghq.com`
* Paramètre CLI : `--datadogSite datadoghq.com`

#### `latest`

Marquer la nouvelle version comme `latest`. Tous les tests qui s'exécutent sur la dernière version utiliseront cette version lors de leur prochaine exécution.

**Options de configuration**

* Par défaut : `false`
* Global Config : `"latest": true`
* Variable ENV : `DATADOG_SYNTHETICS_LATEST=true`
* Paramètre CLI : `--latest` / `--no-latest`

#### `mobileApplicationId` (requis)

L'ID de l'application vers laquelle vous souhaitez charger la nouvelle version.

**Options de configuration**

* Global Config : `"mobileApplicationId": "123-123-123"`
* Variable ENV : `DATADOG_SYNTHETICS_MOBILE_APPLICATION_ID=123-123-123`
* Paramètre CLI : `--mobileApplicationId 123-123-123`

#### `mobileApplicationVersionFilePath` (requis)

Le chemin vers la nouvelle version de votre application mobile (`.apk` ou `.ipa`).

**Options de configuration**

* Global Config : `"mobileApplicationVersionFilePath": example/test.apk` 
* Variable ENV : non disponible 
* Paramètre CLI : `--mobileApplicationVersionFilePath example/test.apk`

#### `proxy`

Le proxy à utiliser pour les connexions sortantes vers Datadog. Les clés `host` et `port` sont des arguments obligatoires, la clé `protocol` est par défaut `http`. Les valeurs prises en charge pour la clé `protocol` sont `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` et `pac+https`. La bibliothèque utilisée pour configurer le proxy est la bibliothèque [proxy-agent][2].

**Options de configuration**

* Global Config : consultez la section [Utiliser un proxy](#use-a-proxy) pour un exemple.
* Variable ENV : N/A
* Paramètre CLI : N/A

#### `versionName` (requis)

Le nom de la nouvelle version. Il doit être unique.

**Options de configuration**

* Global Config : `"versionName": "example"`
* Variable ENV : `DATADOG_SYNTHETICS_VERSION_NAME=example`
* Paramètre CLI : `--versionName example`

Exemple :

```bash
datadog-ci synthetics upload-application                \
  --mobileApplicationId '123-123-123'                   \
  --mobileApplicationVersionFilePath example/test.apk   \
  --versionName 'example 1.0'                           \
  --latest
```

### Utiliser le fichier de configuration globale

Vous pouvez également passer ces options dans un fichier de configuration :

```json
{
  "apiKey": "<API_KEY>",
  "appKey": "<APPLICATION_KEY>",
  "mobileApplicationVersionFilePath": "example_path/example_app.apk",
  "mobileApplicationId": "example-abc",
  "versionName": "example",
  "latest": true
}
```

Ces options peuvent également être ajoutées au même fichier de configuration globale utilisé pour la commande run-tests.

Passez ce fichier de configuration à la commande avec le flag `--config` :

```bash
datadog-ci synthetics upload-application --config global-config.json
```

Le nom de fichier par défaut pour le [fichier de configuration globale](#global-configuration-file) est `datadog-ci.json`. Si vous utilisez ce nom pour votre fichier de configuration globale, vous pouvez omettre le flag `--config`.

## Utiliser des environnements locaux et de staging

Vous pouvez combiner les remplacements de variables avec les [environnements locaux et de staging][3] pour exécuter des tests dans votre environnement de développement. Cette connexion garantit que toutes les requêtes de test envoyées via l'interface de ligne de commande sont automatiquement acheminées via le client `datadog-ci`.

Cela vous permet d'exécuter des tests avec un chiffrement de bout en bout à chaque étape du cycle de développement logiciel, depuis les environnements de pré-production jusqu'à votre système de production.

## Processus de test de bout en bout

Pour vérifier que la commande Synthetics fonctionne correctement, lancez l'exécution d'un test et vérifiez qu'il renvoie 0 :

```bash
export DD_API_KEY='<API_KEY>'
export DD_APP_KEY='<APPLICATION_KEY>'

yarn datadog-ci synthetics run-tests --public-id abc-def-ghi
```

En cas de réussite, la sortie doit ressembler à ce qui suit :

```bash
[abc-def-ghi] Trigger test "Check on testing.website"
[abc-def-ghi] Waiting results for "Check on testing.website"


=== REPORT ===
Took 11546ms

✓ [abc-def-ghi] | Check on testing.website
  ✓ location: Frankfurt (AWS)
    ⎋  total duration: 28.9 ms - result url: https://app.datadoghq.com/synthetics/details/abc-def-ghi?resultId=123456789123456789
    ✓ GET - https://testing.website
```

### Générateurs de rapports

Deux générateurs de rapports sont pris en charge par défaut :

1. `stdout`
2. JUnit

Pour activer le rapport JUnit, spécifiez un nom de fichier pour votre rapport JUnit avec `-j/--jUnitReport`.

```bash
yarn datadog-ci synthetics run-tests -s 'tag:e2e-tests' --config global-config.json --jUnitReport junit-report.xml
```

Les générateurs de rapports peuvent se rattacher à l'élément `MainReporter` de la commande.

### Hooks disponibles

| Nom du hook        | Paramètres                                                                                      | Rôle                                                     |
| :--------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `log`            | `(log: string)`                                                                                 | Appelé pour le logging.                                             |
| `error`          | `(error: string)`                                                                               | Appelé lorsqu'une erreur se produit.                                |
| `initErrors`     | `(errors: string[])`                                                                            | Appelé lorsqu'une erreur se produit durant la phase de parsing des tests. |
| `testTrigger`    | `(test: Test, testId: string, executionRule: ExecutionRule, testOverrides: UserConfigOverride)` | Appelé lorsqu'un test est déclenché.                                |
| `testWait`       | `(test: Test)`                                                                                  | Appelé lorsqu'un test attend de recevoir ses résultats.           |
| `testsWait`      | `(tests: Test[], baseUrl: string, batchId: string, skippedCount?: number)`                      | Appelé lorsque tous les tests attendent de recevoir leurs résultats.     |
| `resultReceived` | `(result: ResultInBatch)`                                                                       | Appelé lorsqu'un résultat est reçu.                               |
| `resultEnd`      | `(result: Result, baseUrl: string)`                                                             | Appelé pour chaque résultat à la fin de tous les résultats.               |
| `reportStart`    | `(timings: {startTime: number})`                                                                | Appelé au début du rapport.                              |
| `runEnd`         | `(summary: Summary, baseUrl: string, orgSettings?: SyntheticsOrgSettings)`                      | Appelé au terme de l'exécution.                                   |

## Consulter les résultats des tests

Vous pouvez voir les résultats des batchs CI en cliquant sur un batch dans le [Results Explorer de Synthetic Monitoring & Testing][4] ou en cliquant sur un test sur la [page de liste des tests Synthetic][5].

Vous pouvez également consulter les résultats des tests directement dans vos pipelines CI à mesure qu'ils s'exécutent. Pour identifier la cause de l'échec d'un test, consultez les logs d'exécution et recherchez les causes de l'assertion ayant échoué.

```bash
  yarn datadog-ci synthetics run-tests --config global-config.json
  yarn run v1.22.4
  $ /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/node_modules/.bin/datadog-ci synthetics run-tests --config global-config.json
  Finding files matching /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/{,!(node_modules)/**/}*.synthetics.json

  Got test files:
    - user.synthetics.json

  [2cj-h3c-39x] Trigger test "Test CI connection"
  [2cj-h3c-39x] Waiting results for "Test CI connection"

  === REPORT ===
  Took 2242ms

  x  [2cj-h3c-39x] | Test CI connection
    * location: 30019
      ⎋ total duration: 32.6 ms - result url: https://app.datadoghq.com/synthetics/details/2cj-h3c-39x?resultId=122140688175981634
      x GET - https://www.datadoghq.com
        [INCORRECT_ASSUMPTION] - [{"index":1,"operator":"is","property":"content-type","type":"header","target":"text/html","valid":false,"actual":"text/html"; charset=utf-8"}] 
  error Command failed with exit code 1.
  info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Utiliser l'action GitHub de Datadog pour ajouter des tests continus à vos workflows][6]
* [En savoir plus sur les tests continus et le CI/CD][7]
* [Découvrir le testing d'applications mobiles][10]
* [En savoir plus sur l'explorateur de surveillance Synthetic et de tests en continu][8]
* [Découvrir le testing des environnements locaux et de staging][3]

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/TooTallNate/proxy-agents/tree/main/packages/proxy-agent
[3]: https://docs.datadoghq.com/fr/continuous_testing/environments/
[4]: https://app.datadoghq.com/synthetics/explorer/
[5]: https://app.datadoghq.com/synthetics/tests
[6]: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
[7]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/
[8]: https://docs.datadoghq.com/fr/continuous_testing/explorer/
[9]: https://github.com/DataDog/datadog-ci/blob/master/packages/plugin-synthetics/src/examples/global-config-complete-example.json
[10]: https://docs.datadoghq.com/fr/mobile_app_testing/
[11]: https://docs.datadoghq.com/fr/synthetics/platform/settings/?tab=specifyvalue#global-variables
[12]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[13]: https://www.npmjs.com/package/proxy-from-env#external-resources
[14]: https://docs.datadoghq.com/fr/synthetics/explore/#search
[15]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[16]: https://docs.datadoghq.com/fr/getting_started/site/#access-the-datadog-site
[17]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[18]: https://docs.datadoghq.com/fr/synthetics/mobile_app_testing/

<!--
  Cette page provient d'une source unique :
  https://github.com/DataDog/documentation/blob/7007931530baf7da59310e7224a26dc9a71c53c5/local/bin/py/build/configurations/pull_config_preview.yaml#L315
-->