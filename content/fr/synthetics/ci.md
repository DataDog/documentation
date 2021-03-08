---
title: Tests CI/CD Synthetic
kind: documentation
description: Exécutez des tests Synthetic à la demande dans vos pipelines de CI/CD.
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/'
    tag: Blog
    text: Intégrer des tests Datadog Synthetic dans votre pipeline de CI/CD.
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/api_tests/
    tag: Documentation
    text: Configurer un test API
---
En plus d'exécuter des tests à des intervalles prédéfinis, vous avez la possibilité d'exécuter des tests Datadog Synthetic ponctuellement à l'aide d'endpoints d'API. Ces tests peuvent être exécutés au sein de vos pipelines d'intégration continue (CI), de façon à bloquer le déploiement des branches susceptibles de nuire au bon fonctionnement de votre produit.
Les tests CI/CD Synthetic peuvent également être utilisés pour **exécuter des tests dans le cadre de votre processus CD**, afin d'évaluer l'état de votre application de production dès la fin d'un déploiement. Cela vous permet de détecter les régressions éventuelles susceptibles d'avoir un impact sur vos utilisateurs et de déclencher automatiquement un rollback si un test critique échoue.

Cette fonction réduit les pertes de temps liées à la correction de problèmes en production et vous aide à identifier le plus tôt possible les bugs et régressions qui surviennent.

Les endpoints d'API Datadog sont accompagnés d'une interface de ligne de commande facilitant l'intégration des tests Datadog Synthetics avec vos outils CI. Cette fonctionnalité est open source, et son code source est disponible sur GitHub sur la page [DataDog/datadog-ci][1].

## Utilisation de l'API

L'endpoint de déclenchement fournit la liste des checks déclenchés ainsi que les identifiants de leurs résultats. L'endpoint de récupération vous permet d'obtenir tous les résultats des tests disponibles.

### Endpoint de déclenchement de tests

L'endpoint de déclenchement de tests peut lancer jusqu'à 50 tests par requête.

* **Endpoint** : `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci`.
* **Méthode** : `POST`.
* **Argument** : un objet JSON contenant la liste de tous les tests à déclencher et la configuration à appliquer.

#### Structure de données des requêtes

```json
{
    "tests": [TEST_À_DÉCLENCHER, TEST_À_DÉCLENCHER, ...]
}
```

Les objets `TEST_À_DÉCLENCHER` sont composés de l'identifiant `public_id` (requis) du test à déclencher et des configurations facultatifs à appliquer ([la rubrique ci-dessous](#configurer-des-tests) décrit chaque champ).

L'identifiant public d'un test correspond à l'identifiant du test fourni dans l'URL de la page des détails des tests (pour `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, l'identifiant est `abc-def-ghi`) ou à l'URL complète de cette page (c'est-à-dire `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

#### Exemple de requête

```bash
#!/bin/sh

api_key="<CLÉ_API_DATADOG>"
app_key="<CLÉ_APPLICATION_DATADOG>"

curl -X POST \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "tests": [
        {
            "public_id": "abc-def-ghi",
            "allowInsecureCertificates": true,
            "basicAuth": { "username": "test", "password": "test" },
            "body": "{\"fakeContent\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "NEW_HEADER": "NEW VALUE" },
            "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "startUrl": "http://new.url/",
            "variables": { "titleVariable": "new value" }
        }
    ]
}' "https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci"
```

#### Exemple de réponse

```json
{
  "batch_id": null,
  "results": [
    {
      "result_id": "0123456789012345678",
      "public_id": "abc-def-ghi",
      "location": 30019
    }
  ],
  "triggered_check_ids": [
    "abc-def-ghi"
  ],
  "locations": [
    {
      "display_name": "N. California (AWS)",
      "name": "aws:us-west-1",
      "region": "Americas",
      "is_active": true,
      "is_public": true,
      "id": 30019
    }
  ]
}
```

### Endpoint de récupération des résultats

* **Endpoint** : `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/poll_results`.
* **Méthode** : `GET`.
* **Paramètres** : un tableau JSON contenant la liste des identifiants des résultats permettant de récupérer ces résultats.

#### Exemple de requête

```bash
#!/bin/sh

api_key="<CLÉ_API_DATADOG>"
app_key="<CLÉ_APPLICATION_DATADOG>"

curl -G \
    "https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[220123456789012345678]"
```

#### Exemple de réponse

{{< tabs >}}

{{% tab "Test API" %}}

```json
{
  "results": [
    {
      "check": {
        "config": {
          "assertions": [
            {
              "operator": "lessThan",
              "target": 2000,
              "type": "responseTime"
            }
          ],
          "configVariables": [],
          "request": {
            "basicAuth": {
              "password": "test",
              "username": "test"
            },
            "body": "{\"fakeContent\":true}",
            "headers": {
              "Content-Type": "application/json",
              "Cookie": "name1=value1;name2=value2;",
              "NOUVEL_ENTÊTE": "NOUVELLE_VALEUR"
            },
            "method": "GET",
            "timeout": 30,
            "url": "http://new.url/"
          }
        },
        "locations": [
          30019
        ],
        "options": {
          "allow_insecure": true,
          "follow_redirects": true,
          "min_failure_duration": 0,
          "min_location_failed": 1,
          "monitor_options": {
            "include_tags": true,
            "locked": false,
            "new_host_delay": 300,
            "notify_audit": false,
            "notify_no_data": false,
            "renotify_interval": 0
          },
          "retry": {
            "count": 2,
            "interval": 300
          },
          "tick_every": 60
        },
        "subtype": "http",
        "type": "api"
      },
      "check_id": "7654321",
      "check_version": 2,
      "config_override": {
        "allowInsecureCertificates": true,
        "basicAuth": {
          "password": "test",
          "username": "test"
        },
        "body": "{\"fakeContent\":true}",
        "bodyType": "application/json",
        "cookies": "name1=value1;name2=value2;",
        "deviceIds": [
          "laptop_large"
        ],
        "followRedirects": true,
        "headers": {
          "Content-Type": "application/json",
          "Cookie": "name1=value1;name2=value2;",
          "NEW_HEADER": "NEW VALUE"
        },
        "locations": [
          "aws:us-west-1"
        ],
        "public_id": "abc-def-ghi",
        "retry": {
          "count": 2,
          "interval": 300
        },
        "startUrl": "http://example.org/",
        "variables": {
          "titleVariable": "new value"
        }
      },
      "dc_id": 30019,
      "orgID": 2,
      "result": {
        "assertionResults": [
          {
            "actual": 27.92,
            "valid": true
          }
        ],
        "dnsServer": "8.8.8.8",
        "eventType": "finished",
        "healthCheckRatio": 1,
        "httpStatusCode": 400,
        "mainDC": "us1.prod",
        "passed": true,
        "resolvedIp": "93.184.216.34",
        "responseSize": 349,
        "runType": 2,
        "subtype": "http",
        "timings": {
          "dns": 24.6,
          "download": 0.1,
          "firstByte": 1.4,
          "tcp": 1.8,
          "total": 27.9
        },
        "unhealthy": false
      },
      "resultID": "220123456789012345678",
      "timestamp": 1612404331304
    }
  ]
}
```

{{% /tab %}}

{{% tab "Test Browser" %}}

```json
{
  "results": [
    {
      "check_id": "123456",
      "timestamp": 1601639904704,
      "orgID": 2,
      "result": {
        "runType": 2,
        "artifactsBucketKey": "2/e2e-tests/abc-def-ghi/results/17221670732431167/chrome.laptop_large/artifacts__1601639913277.json",
        "browserType": "chrome",
        "eventType": "finished",
        "stepDetails": [
          {
            "browserErrors": [],
            "skipped": false,
            "description": "Navigate to start URL",
            "warnings": [],
            "url": "about:blank",
            "value": "https://example.com",
            "duration": 1002,
            "allowFailure": false,
            "screenshotBucketKey": "2/e2e-tests/abc-def-ghi/results/17221670732431167/chrome.laptop_large/step-0__1601639913294.jpeg",
            "type": "goToUrlAndMeasureTti",
            "stepId": -1
          },
          {
            "browserErrors": [],
            "stepElementUpdates": {
              "version": 1,
              "multiLocator": {
                "ab": "/*[local-name()=\"html\"][1]/*[local-name()=\"body\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"h1\"][1]",
                "co": "[{\"text\":\"example domain\",\"textType\":\"directText\"}]",
                "cl": "/*[local-name()=\"html\"]/*[local-name()=\"body\"]/*[local-name()=\"div\"][1]/*[local-name()=\"h1\"][1]",
                "at": "/*[local-name()=\"html\"]/*[local-name()=\"body\"]/*[local-name()=\"div\"][1]/*[local-name()=\"h1\"][1]",
                "clt": "/descendant::*[text()[normalize-space(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞŸŽŠŒ', 'abcdefghijklmnopqrstuvwxyzàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿžšœ')) = \"example domain\"]]",
                "ro": "//*[local-name()=\"h1\"]"
              }
            },
            "skipped": false,
            "description": "Test heading \"Example Domain\" content",
            "url": "https://www.example.com/",
            "checkType": "contains",
            "value": "Example Domain",
            "duration": 204,
            "allowFailure": false,
            "screenshotBucketKey": "2/e2e-tests/abc-def-ghi/results/17221670732431167/chrome.laptop_large/step-1__1601639913410.jpeg",
            "type": "assertElementContent",
            "stepId": 2275176
          }
        ],
        "browserVersion": "84.0.4147.135",
        "mainDC": "us1.prod",
        "timeToInteractive": 269,
        "device": {
          "name": "Laptop Large",
          "height": 1100,
          "width": 1440,
          "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
          "id": "chrome.laptop_large",
          "isMobile": false,
          "browser": "chrome"
        },
        "passed": true,
        "duration": 1206,
        "startUrl": "https://www.example.com",
        "metadata": {}
      },
      "dc_id": 30005,
      "resultID": "17221670732431167",
      "metadata": {}
    }
  ]
}
```

{{% /tab %}}

{{< /tabs >}}

## Utilisation de l'interface de ligne de commande

### Installation du package

Le package est publié sous [@datadog/datadog-ci][2] dans le registre NPM.

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

### Configurer le client

Pour configurer votre client, les clés d'API et d'application Datadog doivent être définies. Ces clés peuvent être définies de trois manières différentes :

1. En tant que variables d'environnement :

    ```bash
    export DATADOG_API_KEY="<API_KEY>"
    export DATADOG_APP_KEY="<APPLICATION_KEY>"
    ```

2. Via l'interface de ligne de commande lors de l'exécution de vos tests :

    ```bash
    datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
    ```

3. Dans un fichier de configuration globale :

     Vous pouvez également créer un fichier de configuration JSON pour spécifier des options plus avancées. Définissez le chemin vers ce fichier à l'aide du flag `--config` [lorsque vous lancez vos tests](#execution-de-tests). Nommez votre fichier de configuration globale `datadog-ci.json` pour ne pas avoir à modifier le chemin par défaut.

    * **apiKey** : la clé d'API utilisée pour interroger l'API Datadog.
    * **appKey** : la clé d'application utilisée pour interroger l'API Datadog.
    * **datadogSite** : l'instance Datadog à laquelle la requête est envoyée. Valeur par défaut : `datadoghq.com`. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.
    * **files** : l'expression globale utilisée pour les fichiers de configuration des tests Synthetic.
    * **global** : les configurations à appliquer à tous les tests Synthetic ([consultez ci-dessous la description de chaque champ](#configurer-des-tests)).
    * **proxy** : le proxy à utiliser pour les connexions sortantes vers Datadog. Les clés `host` et `port` sont des arguments obligatoires. Par défaut, la clé `protocol` a pour valeur `http`. Elle peut prendre pour valeur `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` ou `pac+https`. La bibliothèque [proxy-agent][3] est utilisée pour configurer le proxy.
    * **subdomain** : le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, la valeur de `subdomain` doit alors être définie sur `myorg`.

    **Exemple de fichier de configuration globale** :

    ```json
    {
        "apiKey": "<DATADOG_API_KEY>",
        "appKey": "<DATADOG_APPLICATION_KEY>",
        "datadogSite": "datadoghq.com",
        "files": "{,!(node_modules)/**/}*.synthetics.json",
        "global": {
            "allowInsecureCertificates": true,
            "basicAuth": { "username": "test", "password": "test" },
            "body": "{\"fakeContent\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "<NEW_HEADER>": "<NEW_VALUE>" },
                "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "executionRule": "skipped",
            "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
            "variables": { "titleVariable": "new value" },
            "pollingTimeout": 180000
        },
        "proxy": {
          "auth": {
            "username": "login",
            "password": "pwd"
          },
          "host": "127.0.0.1",
          "port": 3128,
          "protocol": "http"
        },
        "subdomain": "subdomainname"
    }
    ```

### Configurer des tests

Par défaut, le client découvre et exécute automatiquement tous les tests spécifiés dans les fichiers `**/*.synthetics.json` (le chemin peut être configuré dans le [fichier de configuration globale](#configurer-le-client). Ces fichiers incluent une clé `tests`, qui contient un tableau d'objets avec les identifiants des tests à exécuter et toutes les configurations potentielles à appliquer à ces tests.

**Exemple de fichier de configuration de test basique** :

```json
{
    "tests": [
        {
            "id": "<ID_TEST_PUBLIC>"
        },
        {
            "id": "<ID_TEST_PUBLIC>"
        }
    ]
}
```

#### Configuration supplémentaire

Par défaut, les tests utilisent leur configuration d'origine. Vous pouvez la consulter dans l'interface utilisateur ou lors de la [récupération des configurations de vos tests depuis l'API][4]).

Cependant, dans le cadre de votre déploiement CI, vous pouvez choisir de remplacer certains (ou l'ensemble) des paramètres de vos tests en utilisant les paramètres ci-dessous. Si vous souhaitez modifier la configuration de tous vos tests, ces mêmes paramètres peuvent être définis au niveau du [fichier de configuration globale](#configurer-le-client).

* **allowInsecureCertificates** (booléen) : désactiver les vérifications de certificat lors des tests HTTP.
* **basicAuth** (_objet_) : identifiants à utiliser lorsqu'une authentification basique est nécessaire lors d'un test HTTP ou Browser.
     * **username** (_chaîne_) : nom d'utilisateur à utiliser pour l'authentification basique.
     * **password** (_chaîne_) : mot de passe à utiliser lors de l'authentification basique.
* **body** (_chaîne_) : données à envoyer avec les tests HTTP.
* **bodyType** (_chaîne_) : type de données envoyées avec les tests HTTP.
* **cookies** (_chaîne_) : chaîne utilisée en tant qu'en-tête de cookie dans un test HTTP ou Browser.
* **deviceIds** (_tableau_) : liste des appareils sur lesquels le test Browser s'exécute.
* **followRedirects** (_booléen_) : indique s'il faut suivre ou non les redirections dans les tests HTTP.
* **headers** (_objet_) : en-têtes à remplacer dans le test HTTP ou Browser. La clé de cet objet est définie sur le nom de l'en-tête à remplacer, et sa valeur sur la nouvelle valeur de l'en-tête.
* **locations** (_tableau_) : liste des emplacements à partir desquels le test s'exécute.
* **retry** (_objet_) : stratégie définissant le comportement à adopter pour les nouvelles tentatives de test.
     * **count** (_nombre entier_) : nombre de tentatives à effectuer en cas d'échec d'un test.
     * **interval** (_nombre entier_) : intervalle entre chaque tentative (en millisecondes).
* **executionRule** (_chaîne_) : règle d'exécution du test définissant le comportement de l'interface de ligne de commande en cas d'échec du test.
     * **blocking** : l'interface de ligne de commande renvoie une erreur si le test échoue.
     * **non_blocking** : l'interface de ligne de commande affiche seulement un avertissement si le test échoue.
     * **skipped** : le test n'est pas du tout exécuté.
* **startUrl** (_chaîne_) : nouvelle URL de départ à fournir au test HTTP ou Browser.
* **variables** (_objet_) : variables à remplacer dans le test. La clé de cet objet est définie sur le nom de la variable à remplacer, et sa valeur sur la nouvelle valeur de la variable.
* **pollingTimeout** (_entier_) : la durée après laquelle un test Synthetic est considéré comme un échec (en millisecondes).

**Remarque** : les nouvelles configurations de test sont prioritaires sur les configurations globales.

**Exemple de fichier de configuration de test avancé** :

```json
{
    "tests": [
        {
            "id": "<ID_TEST_PUBLIC>",
            "config": {
                "allowInsecureCertificates": true,
                "basicAuth": { "username": "test", "password": "test" },
                "body": "{\"fakeContent\":true}",
                "bodyType": "application/json",
                "cookies": "name1=value1;name2=value2;",
                "deviceIds": ["laptop_large"],
                "followRedirects": true,
                "headers": { "<NOUVEL_ENTÊTE>": "<NOUVELLE_VALEUR>" },
            "locations": ["aws:us-west-1"],
                "retry": { "count": 2, "interval": 300 },
                "executionRule": "skipped",
                "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
                "variables": { "titleVariable": "new value" },
                "pollingTimeout": 180000
            }
        }
    ]
}
```

#### Règle d'exécution

La _règle d'exécution_ de chaque test peut également être définie dans l'application, au niveau du test. Utilisez le menu déroulant à proximité de l'option **CI Execution**.

{{< img src="synthetics/ci/execution_rule.mp4" alt="Règle d'exécution CI" video="true" width="100%">}}

La règle d'exécution associée au test est toujours la règle la plus restrictive ayant été définie dans le fichier de configuration. Les règles sont les suivantes (de la plus restrictive à la moins restrictive) : `skipped`, `non_blocking`, `blocking`. Ainsi, si votre test est configuré sur `skipped` dans l'interface, mais sur `blocking` dans le fichier de configuration, il sera ignoré (`skipped`) lors de l'exécution de vos tests.

#### URL de départ

Vous pouvez configurer l'URL de départ de votre test en indiquant la `startUrl` de l'objet de votre test. Pour créer votre propre URL de départ, utilisez l'une des parties de l'URL de départ d'origine de votre test et les variables d'environnement suivantes :

| Variable d'environnement | Description                  | Exemple                                                |
|----------------------|------------------------------|--------------------------------------------------------|
| `URL`                | URL de départ d'origine du test | `https://www.example.org:81/chemin/vers/element?abc=123` |
| `DOMAIN`             | Nom de domaine du test           | `example.org`                                          |
| `HOST`               | Host du test                  | `www.example.org:81`                                   |
| `HOSTNAME`           | Hostname du test              | `www.example.org`                                      |
| `ORIGIN`             | Origine du test                | `https://www.example.org:81`                           |
| `PARAMS`             | Paramètres de la requête du test      | `?abc=123`                                             |
| `PATHNAME`           | Chemin de l'URl du test              | `/chemin/vers/element`                                   |
| `PORT`               | Port du host du test             | `81`                                                   |
| `PROTOCOL`           | Protocole du test              | `https:`                                               |
| `SUBDOMAIN`          | Sous-domaine du test            | `www`                                                  |

Par exemple, si l'URL de départ de votre test est `https://www.example.org:81/chemin/vers/element?abc=123`, elle peut s'écrire sous la forme suivante :

* `{{PROTOCOL}}//{{SUBDOMAIN}}.{{DOMAIN}}:{{PORT}}{{PATHNAME}}{{PARAMS}}`
* `{{PROTOCOL}}//{{HOST}}{{PATHNAME}}{{PARAMS}}`
* `{{URL}}`

### Exécution des tests

Vous pouvez faire en sorte que votre interface de ligne de commande découvre automatiquement tous vos tests Synthetic `**/*.synthetics.json` (ou tous les tests associés au chemin spécifié dans votre [fichier de configuration globale](#configurer-le-client)) ou spécifier les tests que vous souhaitez exécuter à l'aide du flag `-p,--public-id`.

Exécutez des tests via l'interface de ligne de commande :

{{< tabs >}}
{{% tab "Yarn" %}}

```bash
yarn datadog-ci synthetics run-tests
```

**Remarque**: si vous lancez vos tests avec un fichier de configuration globale personnalisé, ajoutez`--config <CHEMIN_FICHIER_CONFIGURATION_GLOBALE>`  à votre commande.

{{% /tab %}}
{{% tab "NPM" %}}

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

**Remarque** : si vous lancez vos tests avec un fichier de configuration globale, ajoutez `datadog-ci-synthetics` `--config <CHEMIN_FICHIER_CONFIGURATION_GLOBALE>` à votre script `datadog-ci-synthetics`.

{{% /tab %}}
{{< /tabs >}}

## Afficher les résultats du test

### Dans vos pipelines CI

Vous pouvez consulter les résultats des tests directement dans vos pipelines CI au fur et à mesure qu'ils s'exécutent.

{{< img src="synthetics/ci/successful_test_result.png" alt="Résultat de test ayant réussi"  style="width:80%;">}}

Vous pouvez identifier la cause de l'échec d'un test en consultant les logs d'exécution et en recherchant les causes de l'assertion ayant échoué :

{{< img src="synthetics/ci/failed_test_result.png" alt="Résultat de test ayant échoué" style="width:80%;">}}

### Dans l'application Datadog

Vous pouvez également consulter les résultats de vos tests répertoriés sur la page des détails des tests Datadog :

{{< img src="synthetics/ci/test_results.png" alt="Résultat de test ayant réussi" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/TooTallNate/node-proxy-agent
[4]: /fr/api/v1/synthetics/#get-test