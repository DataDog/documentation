---
title: Intégration continue Synthetics
kind: documentation
description: Exécutez un test Synthetics à la demande dans vos pipelines d'intégration continue (CI).
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: /synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/api_tests/
    tag: Documentation
    text: Configurer un test API
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta privée.
</div>

Vous pouvez non seulement exécuter des tests à des intervalles prédéfinis, mais également des tests Datadog Synthetics à la demande à l'aide des endpoints des API dédiées. Les tests Datadog Synthetics peuvent être exécutés au sein de vos pipelines d'intégration continue (CI), afin de bloquer le déploiement des branches susceptibles de perturber le fonctionnement de vos fonctionnalités et de vos endpoints clés.

Cette fonction réduit les pertes de temps liées à la correction de problèmes en production et vous aide à identifier le plus tôt possible les bugs et régressions qui surviennent.

Les endpoints d'API Datadog sont accompagnés d'une interface de ligne de commande facilitant l'intégration de Datadog Synthetics avec vos outils CI.

## Utilisation de l'API

L'endpoint de déclenchement fournit la liste des checks déclenchés ainsi que les identifiants de leurs résultats. L'endpoint de récupération vous permet d'obtenir tous les résultats des tests disponibles.

### Endpoint de déclenchement de tests

L'endpoint de déclenchement de tests peut lancer jusqu'à 50 tests par requête.

{{< site-region region="us" >}}

* **Endpoint** : `https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci`
* **Méthode** : `POST`
* **Argument** : un objet JSON contenant la liste de tous les tests à déclencher et la configuration à appliquer.

{{< /site-region >}}
{{< site-region region="eu" >}}

* **Endpoint** : `https://api.datadoghq.eu/api/v1/synthetics/tests/trigger/ci`
* **Méthode** : `POST`
* **Argument** : un objet JSON contenant la liste de tous les tests à déclencher et la configuration à appliquer.

{{< /site-region >}}

#### Structure de données des requêtes

```json
{
    "tests": [TEST_À_DÉCLENCHER, TEST_À_DÉCLENCHER, ...]
}
```

Les objets `TEST_À_DÉCLENCHER` sont composés de l'identifiant `public_id` (requis) du test à déclencher et des configurations facultatifs à appliquer ([la rubrique ci-dessous](#configurer-des-tests) décrit chaque champ).

L'identifiant public d'un test correspond à l'identifiant du test fourni dans l'URL de la page des détails des tests (pour `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, l'identifiant est `abc-def-ghi`) ou à l'URL complète de cette page (c'est-à-dire `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

#### Exemple de requête

{{< site-region region="us" >}}

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
            "body": "{\"contenuFictif\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "NOUVEL_ENTÊTE": "NOUVELLE_VALEUR" },
            "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "startUrl": "http://nouvelle.url/",
            "variables": { "titleVariable": "nouvelle valeur" }
        }
    ]
}' "https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci"
```

{{< /site-region >}}
{{< site-region region="eu" >}}


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
            "body": "{\"contenuFictif\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "NOUVEL_ENTÊTE": "NOUVELLE_VALEUR" },
            "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "startUrl": "http://nouvelle.url/",
            "variables": { "titleVariable": "nouvelle valeur" }
        }
    ]
}' "https://api.datadoghq.eu/api/v1/synthetics/tests/trigger/ci"
```

{{< /site-region >}}


#### Exemple de réponse

```json
{
  "results": [
    {
      "result_id": "0123456789012345678",
      "public_id": "abc-def-ghi",
      "location": 1
    },
  ],
  "triggered_check_ids": [
    "abc-def-ghi"
  ]
}
```

### Endpoint de récupération des résultats

{{< site-region region="us" >}}

* **Endpoint** : `https://api.datadoghq.com/api/v1/synthetics/tests/poll_results`
* **Méthode** : `GET`
* **Paramètres** : un tableau JSON contenant la liste des identifiants des résultats permettant de récupérer ces résultats.

{{< /site-region >}}
{{< site-region region="eu" >}}

* **Endpoint** : `https://api.datadoghq.eu/api/v1/synthetics/tests/poll_results`
* **Méthode** : `GET`
* **Paramètres** : un tableau JSON contenant la liste des identifiants des résultats permettant de récupérer ces résultats.

{{< /site-region >}}

#### Exemple de requête

{{< site-region region="us" >}}

```bash
#!/bin/sh

api_key="<CLÉ_API_DATADOG>"
app_key="<CLÉ_APPLICATION_DATADOG>"

curl -G \
    "https://api.datadoghq.com/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[%220123456789012345678%22]"
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```bash
#!/bin/sh

api_key="<CLÉ_API_DATADOG>"
app_key="<CLÉ_APPLICATION_DATADOG>"

curl -G \
    "https://api.datadoghq.eu/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[%220123456789012345678%22]"
```

{{< /site-region >}}

#### Exemple de réponse

```json
{
  "results": [
    {
      "check_id": "123456",
      "timestamp": 1585841351642,
      "orgID": 2,
      "result": {
        "unhealthy": false,
        "eventType": "finished",
        "timings": {
          "firstByte": 14.7,
          "tcp": 11.6,
          "ssl": 45.7,
          "dns": 12.484235048294067,
          "download": 0.2,
          "total": 84.7
        },
        "mainDC": "us1.prod",
        "runType": 2,
        "httpStatusCode": 200,
        "responseSize": 9201,
        "healthCheckRatio": 1
      },
      "dc_id": 1,
      "resultID": "0123456789012345678"
    }
  ]
}
```

## Utilisation de l'interface de ligne de commande

### Installation de package

Le package est publié en mode privé sous [@datadog/datadog-ci][1] dans le registre NPM.

Tant qu'il n'est pas rendu public, vous devez utiliser un token NPM pour y accéder. Si vous ne disposez pas d'un tel token NPM, contactez l'[assistance Datadog][2].

{{< tabs >}}
{{% tab "NPM" %}}

Saisissez les lignes suivantes dans votre fichier `~/.npmrc` :

```conf
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=<TOKEN>
```

Installez ensuite le package via NPM :

```bash
npm install --save-dev @datadog/datadog-ci
```

{{% /tab %}}
{{% tab "Yarn" %}}

Avec la version 2 de Yarn, vous pouvez définir le contexte `@datadog` pour le token dans le fichier `.yarnrc` :

```yaml
npmScopes:
  datadog:
    npmRegistryServer: "https://registry.npmjs.org"
    npmAuthToken: "<TOKEN>"
```

Installez ensuite le package via Yarn :

```bash
yarn add --dev @datadog/datadog-ci
```

{{% /tab %}}
{{< /tabs >}}

### Configurer le client

Pour configurer votre client, les clés de l'API et de l'application Datadog doivent être configurées. Ces clés peuvent être définies de trois manières différentes :

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
    * **datadogSite** : l'instance Datadog vers laquelle la requête est envoyée (valeurs autorisées : `datadoghq.com` ou `datadoghq.eu`). Valeur par défaut : `datadoghq.com`.
    * **files** : l'expression globale utilisée pour les fichiers de configuration des tests Synthetics.
    * **global** : les configurations à appliquer à tous les tests Synthetics ([consultez ci-dessous la description de chaque champ](#configurer-des-tests)).
    * **proxy** : le proxy à utiliser pour les connexions sortantes vers Datadog. Les clés `host` et `port` sont des arguments obligatoires. Par défaut, la clé `protocol` a pour valeur `http`. Elle peut prendre pour valeur `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` ou `pac+https`. La bibliothèque [proxy-agent][3] est utilisée pour configurer le proxy.
    * **subdomain** : le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, la valeur de `subdomain` doit alors être définie sur `myorg`.
    * **timeout** : la durée après laquelle les tests Synthetics sont considérés comme des échecs (en millisecondes).

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
            "variables": { "titleVariable": "new value" }
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
        "subdomain": "subdomainname",
        "timeout": 120000
    }
    ```

### Configurer des tests

Par défaut, le client découvre et exécute automatiquement tous les tests spécifiés dans les fichiers `**/*.synthetics.json` (le chemin peut être configuré dans le [fichier de configuration globale](#configurer-le-client). Ces fichiers incluent une clé `tests`, qui contient un tableau d'objets avec les identifiants des tests à exécuter et toutes les configurations potentielles à appliquer à ces tests.

**Exemple de fichier de configuration de test basique** :

```json
{
    "tests": [
        {
            "id": "<ID_PUBLIC_TEST>"
        },
        {
            "id": "<ID_PUBLIC_TEST>"
        }
    ]
}
```

#### Configuration supplémentaire

Par défaut, les tests utilisent leur configuration d'origine. Vous pouvez la consulter dans l'interface utilisateur ou lors de la [récupération des configurations de vos tests depuis l'API][4]).

Cependant, dans le cadre de votre déploiement CI, vous pouvez choisir de remplacer certains (ou l'ensemble) des paramètres de vos tests en utilisant les paramètres ci-dessous. Si vous souhaitez modifier la configuration de tous vos tests, ces mêmes paramètres peuvent être définis au niveau du [fichier de configuration globale](#configurer-le-client).

* **allowInsecureCertificates** (_booléen_) : désactive les checks de certificat dans les tests API.
* **basicAuth** (_objet_) : identifiants à utiliser pour une authentification basique.
     * **username** (_chaîne_) : nom d'utilisateur à utiliser pour l'authentification basique.
     * **password** (_chaîne_) : mot de passe à utiliser lors de l'authentification basique.
* **body** (_chaîne_) : données à envoyer avec le test API Synthetics.
* **bodyType** (_chaîne_) : type de données envoyées avec le test API Synthetics.
* **cookies** (_chaîne_) : chaîne utilisée en tant qu'en-tête de cookie dans un test Browser ou API.
* **deviceIds** (_tableau_) : liste des appareils sur lesquels le test Browser s'exécute.
* **followRedirects** (_booléen_) : indique s'il faut suivre ou non les redirections HTTP dans les tests API.
* **headers** (_objet_) : en-têtes à remplacer dans le test. La clé de cet objet est définie sur le nom de l'en-tête à remplacer, et sa valeur sur la nouvelle valeur de l'en-tête.
* **locations** (_tableau_) : liste des emplacements à partir desquels le test s'exécute.
* **retry** (_objet_) : stratégie définissant le comportement à adopter pour les nouvelles tentatives de test.
     * **count** (_nombre entier_) : nombre de tentatives à effectuer en cas d'échec d'un test.
     * **interval** (_nombre entier_) : intervalle entre chaque tentative (en millisecondes).
* **executionRule** (_chaîne_) : règle d'exécution du test définissant le comportement de l'interface de ligne de commande en cas d'échec du test.
     * **blocking** : l'interface de ligne de commande renvoie une erreur si le test échoue.
     * **non_blocking** : l'interface de ligne de commande affiche seulement un avertissement si le test échoue.
     * **skipped** : le test n'est pas du tout exécuté.
* **startUrl** (_chaîne_) : nouvelle URL de départ à fournir au test.
* **variables** (_objet_) : variables à remplacer dans le test. La clé de cet objet est définie sur le nom de la variable à remplacer, et sa valeur sur la nouvelle valeur de la variable.

**Remarque** : les nouvelles configurations de test sont prioritaires aux configurations globales.

**Exemple de fichier de configuration de test avancé** :

```json
{
    "tests": [
        {
            "id": "<ID_PUBLIC_TEST>",
            "config": {
                "allowInsecureCertificates": true,
                "basicAuth": { "username": "test", "password": "test" },
                "body": "{\"contenuFictif\":true}",
                "bodyType": "application/json",
                "cookies": "name1=value1;name2=value2;",
                "deviceIds": ["laptop_large"],
                "followRedirects": true,
                "headers": { "<NOUVEL_ENTÊTE>": "<NOUVELLE_VALEUR>" },
            "locations": ["aws:us-west-1"],
                "retry": { "count": 2, "interval": 300 },
                "executionRule": "skipped",
                "startUrl": "{{URL}}?static_hash={{HASH_STATIQUE}}",
                "variables": { "titleVariable": "nouvelle valeur" }
            }
        }
    ]
}
```

#### Règle d'exécution

La _règle d'exécution_ de chaque test peut également être définie dans l'application, au niveau du test. Utilisez le menu déroulant en regard de l'option **CI Execution**.

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

Vous pouvez faire en sorte que votre interface de ligne de commande découvre automatiquement tous vos tests Synthetics `**/*.synthetics.json` (ou tous les tests associés au chemin spécifié dans votre [fichier de configuration globale](#configurer-le-client)) ou spécifier les tests que vous souhaitez exécuter à l'aide du flag `-p,--public-id`.

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

Vous pouvez identifier la cause de l'échec d'un test en observant les logs d'exécution et en recherchant les causes de l'assertion ayant échoué :

{{< img src="synthetics/ci/failed_test_result.png" alt="Résultat de test ayant échoué" style="width:80%;">}}

### Dans l'application Datadog

Vous pouvez également consulter les résultats de vos tests répertoriés sur la page des détails des tests Datadog :

{{< img src="synthetics/ci/test_results.png" alt="Résultat de test ayant réussi" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/login?next=/package/@datadog/datadog-ci
[2]: /fr/help/
[3]: https://github.com/TooTallNate/node-proxy-agent
[4]: /fr/api/v1/synthetics/#get-test