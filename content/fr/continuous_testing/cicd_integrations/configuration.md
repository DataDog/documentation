---
aliases:
- /fr/synthetics/cicd_integrations/configuration
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/src/commands/synthetics/README.md
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
  text: En savoir plus sur l'Explorateur de surveillance Synthetic et de tests en
    continu
- link: /continuous_testing/testing_tunnel
  tag: Documentation
  text: En savoir plus sur le Tunnel de test en continu
title: Configuration des tests continus et du CI/CD
---
<div class="alert alert-info">Cette page explique comment configurer des tests continus dans vos pipelines d'intégration continue (CI) et de livraison continue (CD). Si vous souhaitez intégrer vos métriques et données de CI/CD dans des dashboards Datadog, consultez plutôt la section <a href="https://docs.datadoghq.com/continuous_integration/" target="_blank">CI Visibility</a>.</div>

## Présentation

Utilisez le [package NPM `@datadog-ci`][1] pour exécuter des tests continus directement dans votre pipeline de CI/CD. Vous pouvez automatiquement interrompre un build, bloquer un déploiement ou restaurer un déploiement lorsqu'un test Browser Synthetic détecte une régression. 

Pour configurer l'URL de départ de votre test, définissez une `startUrl` dans l'objet de votre test. Créez votre propre URL de départ en utilisant une partie de l'URL de départ d'origine de votre test et incluez des variables d'environnement.

## Implémentation

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

### Configurer le client

Pour configurer le client, vos clés d'API et d'application Datadog doivent être définies. Ces clés peuvent être définies de trois manières différentes :

1. En tant que variables d'environnement :

   ```bash
   export DATADOG_API_KEY="<API_KEY>"
   export DATADOG_APP_KEY="<APPLICATION_KEY>"
   ```

2. Via l'interface de ligne de commande lors de l'exécution de vos tests :

   ```bash
   yarn datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
   ```

3. Dans un [fichier de configuration JSON globale](#options-du-fichier-de-configuration-globale) :

   Créez un fichier de configuration JSON sur votre système. Spécifiez le chemin d'accès au fichier en utilisant le flag `--config` [lorsque vous lancez vos tests](#executer-des-tests). Si aucun chemin de fichier n'est spécifié, Datadog utilise le nom de fichier par défaut `datadog-ci.json`.

### Options du fichier de configuration globale

Lorsque vous exécutez vos tests, utilisez le flag `--config` sur la ligne de commande pour spécifier le chemin vers le fichier de configuration globale.

Vous trouverez ci-dessous la liste des options avancées dans le fichier de configuration globale. Pour obtenir un exemple de fichier de configuration, consultez [ce fichier `global.config.json`][9].

`apiKey`
: La clé d'API utilisée pour interroger l'API Datadog.

`appKey`
: La clé d'application utilisée pour interroger l'API Datadog.

`datadogSite`
: L'instance Datadog à laquelle la requête est envoyée. Valeur par défaut : `datadoghq.com`. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.

`failOnCriticalErrors`
: Un flag booléen qui entraîne l'échec de la tâche CI si aucun test n'a été déclenché, ou si les résultats n'ont pas pu être récupérés à partir de Datadog. Valeur par défaut : `false`.

`failOnMissingTests`
: Un flag booléen qui entraîne l'échec de la tâche CI si au moins un test avec un ID public (spécifié sous forme d'argument CLI `--public-id` ou dans un [fichier de test](#fichiers-de-test)) est manquant dans une série (s'il a été supprimé par programmation ou depuis le site Datadog, par exemple). Valeur par défaut : `false`.

`failOnTimeout`
: Un flag booléen qui entraîne l'échec de la tâche CI si la durée d'exécution d'au moins un test dépasse le délai d'expiration par défaut. Valeur par défaut : `true`.

`files`
: Expressions globales utilisées pour détecter les [fichiers de configuration](#fichiers-de-test) des tests Synthetic.

`global`
: Les configurations à appliquer en priorité à tous les tests Synthetic.

`mobileApplicationVersionFilePath`
: Permet de remplacer la version de l'application pour tous les tests d'application mobile Synthetic.

`pollingTimeout`
: **Type** : nombre entier<br>
Durée (en millisecondes) après laquelle `datadog-ci` arrête de récupérer les résultats des tests. Valeur par défaut : 30 minutes. Pour votre CI, tout résultat de test terminé après ce délai est considéré comme un échec.

`proxy`
: Le proxy à utiliser pour les connexions sortantes vers Datadog. Les clés `host` et `port` sont des arguments obligatoires. Par défaut, la clé `protocol` a pour valeur `http`. Elle peut prendre pour valeur `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` ou `pac+https`. La bibliothèque [proxy-agent][2] est utilisée pour configurer le proxy.

`subdomain`
: Le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, la valeur de `subdomain` doit être définie sur `myorg`.

`testSearchQuery`
: Envoyer une requête pour sélectionner les tests Synthetic à exécuter. Si vous exécutez des tests dans l'interface de ligne de commande, utilisez le flag `-s`.

`tunnel`
: Utiliser le [tunnel de test en continu](#utiliser-le-tunnel-de-test) pour exécuter votre lot de tests.

#### Utiliser un proxy

Il est possible de configurer un proxy pour les connexions sortantes vers Datadog à l'aide de la clé `proxy` du fichier de configuration globale.

Étant donné que la [bibliothèque `proxy-agent`][2] est utilisée pour configurer le proxy, les protocoles suivants sont pris en charge : `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` et `pac+https`. La clé `proxy` du fichier de configuration globale est transmise à une nouvelle instance de `proxy-agent`, ce qui signifie que la même configuration est prise en charge pour cette bibliothèque.

**Remarque** : les clés `host` and `port` sont des arguments obligatoires. Par défaut, la clé `protocol` a pour valeur `http` si elle n'est pas définie.

Exemple :

```json
{
  "apiKey": "<CLÉ_API_DATADOG>",
  "appKey": "<CLÉ_APPLICATION_DATADOG>",
  "datadogSite": "datadoghq.com", // Vous pouvez utiliser un autre site Datadog parmi ceux indiqués sur https://docs.datadoghq.com/getting_started/site/. Par défaut, les requêtes sont envoyées à Datadog US1.
  "failOnCriticalErrors": false,
  "failOnMissingTests": false,
  "failOnTimeout": true,
  "files": ["{,!(node_modules)/**/}*.synthetics.json"],
  "global": {
    "allowInsecureCertificates": true,
    "basicAuth": {"username": "test", "password": "test"},
    "body": "{\"fakeContent\":true}",
    "bodyType": "application/json",
    "cookies": "name1=value1;name2=value2;",
    "deviceIds": ["laptop_large"],
    "followRedirects": true,
    "headers": {"<NEW_HEADER>": "<NEW_VALUE>"},
    "locations": ["aws:us-west-1"],
    "retry": {"count": 2, "interval": 300},
    "executionRule": "blocking",
    "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
    "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
    "variables": {"titleVariable": "new value"},
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
  "subdomain": "subdomainname",
  "tunnel": true
}
```

### Options de ligne de commande

Si l'organisation utilise un sous-domaine personnalisé pour accéder à Datadog, celui-ci doit être défini dans la variable d'environnement `DATADOG_SUBDOMAIN` ou dans le fichier de configuration globale sous la clé `subdomain` afin d'afficher correctement l'URL des résultats des tests. 

Par exemple, si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, définissez la variable d'environnement sur `myorg` :

```bash
export DATADOG_SUBDOMAIN="myorg"
```

Vous pouvez utiliser `DATADOG_SYNTHETICS_LOCATIONS` pour remplacer les emplacements sur lesquels vos tests s'exécutent. Les emplacements doivent être séparés par un `;`. La configuration dans les [fichiers de test](#fichiers-de-test) est prioritaire sur les remplacements.

```bash
export DATADOG_SYNTHETICS_LOCATIONS="aws:us-east-1;aws:us-east-2"
```

### API

Par défaut, `datadog-ci` s'exécute à la racine du répertoire de travail et trouve les fichiers `{,!(node_modules)/**/}*.synthetics.json` (tous les fichiers se terminant par `.synthetics.json`, sauf ceux contenus dans le dossier `node_modules`). L'outil charge le fichier `datadog-ci.json`, qui peut être remplacé via l'argument `--config`.

Par exemple :

```json
{
  "apiKey": "<CLÉ_API_DATADOG>",
  "appKey": "<CLÉ_APPLICATION_DATADOG>",
  "datadogSite": "datadoghq.com", // Vous pouvez utiliser un autre site Datadog parmi ceux indiqués sur https://docs.datadoghq.com/getting_started/site/. Par défaut, les requêtes sont envoyées à Datadog US1. 
  "failOnCriticalErrors": true,
  "failOnMissingTests": true,
  "failOnTimeout": true,
  "files": ["{,!(node_modules)/**/}*.synthetics.json"],
  "global": {
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
    "mobileApplicationVersionFilePath": "path/to/application.apk",
    "pollingTimeout": 120000,
    "retry": {"count": 2, "interval": 300},
    "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
    "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
    "testTimeout": 300,
    "variables": {"NEW_VARIABLE": "NEW VARIABLE"}
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
  "tunnel": true
}
```

## Exécuter des tests

Vous pouvez faire en sorte que votre interface de ligne de commande découvre automatiquement tous vos tests Synthetic `**/*.synthetics.json` (ou tous les tests associés au chemin spécifié dans votre [fichier de configuration globale](#options-du-fichier-de-configuration-globale)) ou spécifier les tests que vous souhaitez exécuter à l'aide du flag `-p,--public-id`.

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

**Remarque** : si vous lancez vos tests avec un fichier de configuration globale personnalisé, ajoutez `--config <CHEMIN_VERS_FICHIER_CONFIGURATION_GLOBALE>` à la commande associée à votre script `datadog-ci-synthetics`.

{{% /tab %}}
{{% tab "Yarn" %}}

Lancer des tests en exécutant l'interface de ligne de commande via **Yarn** :

La sous-commande `run-tests` exécute les tests découverts dans les fichiers conformément à la clé de configuration `files`. Elle accepte l'argument `--public-id` (ou `-p`) afin de ne déclencher que le test spécifié. Elle peut être définie plusieurs fois pour exécuter plusieurs tests :

```bash
yarn datadog-ci synthetics run-tests --public-id pub-lic-id1 --public-id pub-lic-id2
```

Il est également possible de déclencher des tests correspondant à une requête de recherche à l'aide du flag `--search` (ou `-s`). Avec cette option, les remplacements de la configuration globale s'appliquent à tous les tests découverts au moyen de la requête de recherche.

```bash
yarn datadog-ci synthetics run-tests -s 'tag:e2e-tests' --config global.config.json
```

Vous pouvez utiliser `--files` (ou `-f`) afin de remplacer le sélecteur de fichiers global lorsque vous voulez exécuter plusieurs collections de tests en parallèle avec un fichier de configuration globale unique.

```bash
yarn datadog-ci synthetics run-tests -f ./component-1/**/*.synthetics.json -f ./component-2/**/*.synthetics.json
```

Vous pouvez également transmettre des variables en tant qu'arguments à l'aide de `--variable KEY=VALUE`.

```bash
yarn datadog-ci synthetics run-tests -f ./component-1/**/*.synthetics.json -v PASSWORD=$PASSWORD
```

**Remarque** : si vous lancez vos tests avec un fichier de configuration globale personnalisé, ajoutez `--config <CHEMIN_VERS_FICHIER_CONFIGURATION_GLOBALE>` à votre commande.

{{% /tab %}}
{{< /tabs >}}

### Flags de modes d'échec

- `--failOnTimeout` (ou `--no-failOnTimeout`) provoque l'échec (ou la réussite) de l'intégration continue si un des résultats dépasse le délai d'expiration du test associé.
- `--failOnCriticalErrors` provoque l'échec de l'intégration continue si les tests n'ont pas été déclenchés ou si leurs résultats n'ont pas pu être récupérés.
- `--failOnMissingTests` entraîne l'échec de la tâche CI si au moins un test avec un ID public (spécifié sous forme d'argument CLI `--public-id` ou dans un fichier de test) est manquant dans une série (s'il a été supprimé par programmation ou depuis le site Datadog, par exemple).

### Fichiers de test

Vos fichiers de test doivent être nommés avec le suffixe `.synthetics.json`.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "<ID_PUBLIC_TEST>",
      "config": {
        "allowInsecureCertificates": true,
        "basicAuth": {"username": "test", "password": "test"},
        "body": "{\"fakeContent\":true}",
        "bodyType": "application/json",
        "cookies": "name1=value1;name2=value2;",
        "defaultStepTimeout": 15,
        "deviceIds": ["chrome.laptop_large"],
        "executionRule": "skipped",
        "followRedirects": true,
        "headers": {"NOUVEL_ENTÊTE": "NOUVELLE VALEUR"},
        "locations": ["aws:us-east-1"],
        "mobileApplicationVersionFilePath": "path/to/application.apk",
        "pollingTimeout": 30000,
        "retry": {"count": 2, "interval": 300},
        "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
        "startUrlSubstitutionRegex": "s/(https://www.)(.*)/$1extra-$2/",
        "testTimeout": 300,
        "variables": {"MA_VARIABLE": "new title"}
      }
    }
  ]
}
```

`<ID_PUBLIC_TEST>` correspond à l'identifiant du test fourni dans l'URL de la page des détails du test (par exemple, pour `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, l'identifiant est `abc-def-ghi`) ou à l'URL complète de cette page (c'est-à-dire directement `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

L'ensemble des options sous la clé `config` sont facultatives et permettent de remplacer la configuration du test stockée dans Datadog.

| Options                            | Type             | Définition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowInsecureCertificates`        | Booléen          | Désactiver les vérifications de certificat lors des tests API Synthetic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `basicAuth`                        | Objet           | Identifiants à utiliser lorsqu'une authentification basique est requise.<br><br>- `username` (chaîne) : le nom d'utilisateur à utiliser pour une authentification basique.<br>- `password` (chaîne) : le mot de passe à utiliser pour une authentification basique.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `body`                             | Chaîne           | Données à envoyer lors d'un test API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `bodyType`                         | Chaîne           | Type de contenu des données à envoyer lors d'un test API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `cookies`                          | Chaîne ou objet | Utilisez la chaîne fournie en tant qu'en-tête de cookie dans un test API ou un test Browser (en supplément ou en remplacement).<br><br>- S'il s'agit d'une chaîne, celle-ci est utilisée pour remplacer les cookies d'origine.<br>- S'il s'agit d'un objet, le format doit être `{append?: boolean, value: string}` et, selon la valeur de `append`, celui-ci s'ajoute aux cookies d'origine ou bien les remplace.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `defaultStepTimeout`               | Nombre           | La durée maximale des étapes en secondes pour les tests Browser, mais qui ne prime pas sur les délais d'expiration d'étapes définis individuellement.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `deviceIds`                        | Tableau            | La liste des appareils sur lesquels exécuter le test Browser.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `executionRule`                    | Chaîne           | La règle d'exécution du test définit le comportement de l'interface de ligne de commande en cas d'échec du test.<br><br>- `blocking` : l'interface de ligne de commande renvoie une erreur si le test échoue.<br>- `non_blocking` : l'interface de ligne de commande affiche seulement un avertissement si le test échoue.<br>- `skipped` : le test n'est pas du tout exécuté.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `followRedirects`                  | Booléen          | Indique s'il faut suivre ou non les redirections HTTP dans les tests API Synthetic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `headers`                          | Objet           | Les en-têtes à remplacer dans le test. La clé de cet objet est définie sur le nom de l'en-tête à remplacer, et sa valeur sur la nouvelle valeur de l'en-tête à remplacer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `locations`                        | Tableau            | La liste des emplacements à partir desquels le test doit être exécuté.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `mobileApplicationVersionFilePath` | Chaîne           | Permet de remplacer la version de l'application pour tous les tests d'application mobile Synthetic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `pollingTimeout`                   | Nombre entier          | La durée maximale d'un test en millisecondes. Si l'exécution du test dépasse cette valeur, celui-ci est considéré comme ayant échoué.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `retry`                            | Objet           | La stratégie définissant le comportement à adopter pour les nouvelles tentatives de test.<br><br>- `count` (nombre entier) : le nombre de tentatives à effectuer en cas d'échec d'un test.<br>- `interval` (nombre entier) : l'intervalle entre chaque tentative (en millisecondes).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `startUrl`                         | Chaîne           | La nouvelle URL de départ à fournir au test. Les variables indiquées entre accolades (par exemple, `{{ EXEMPLE }}`) dans les variables d'environnement sont remplacées.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `startUrlSubstitutionRegex`        | Chaîne           | L'expression régulière permettant de modifier l'URL de départ du test (tests Browser et HTP uniquement), qu'elle ait été octroyée par le test initial ou par le nouveau paramètre de configuration `startURL`. <br><br>Si l'URL contient des variables, cette expression régulière est appliquée après l'interpolation des variables. Deux formats sont acceptés : <br>- `votre_expression_regulière\|votre_substitution` : syntaxe basée sur des slashs inversés, pour éviter tout conflit avec les caractères `/` dans les URL. Par exemple, `https://example.com(.*)\|http://subdomain.example.com$1` pour transformer `https://example.com/test` en `http://subdomain.example.com/test`. <br>- `s/votre_expression_regulière/votre_substitution/modificateurs` : syntaxe basée sur des slashs, qui prend en charge les modificateurs. Par exemple, `s/(https://www.)(.*)/$1extra-$2/` pour transformer `https://www.example.com` en `https://www.extra-example.com`. |
| `testTimeout`                      | Nombre           | La durée maximale d'un test Browser en secondes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `variables`                        | Objet           | Les variables à remplacer dans le test. La clé de cet objet est définie sur le nom de la variable à remplacer, et sa valeur sur la nouvelle valeur de la variable à remplacer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Utiliser le tunnel de test

Vous pouvez combiner des remplacements de variables avec le [Tunnel de test en continu][3] afin d'exécuter des tests au sein de votre environnement de développement. Le tunnel de test crée un proxy HTTP chiffré de bout en bout entre votre infrastructure et Datadog. Ainsi, toutes les requêtes de test envoyées via l'interface de ligne de commande sont automatiquement acheminées par l'intermédiaire du client `datadog-ci`.

Cela vous permet d'exécuter des tests avec un chiffrement de bout en bout à chaque étape du cycle de développement logiciel, depuis les environnements de pré-production jusqu'à votre système de production.

## Processus de test de bout en bout

Pour vérifier que la commande Synthetics fonctionne correctement, lancez l'exécution d'un test et vérifiez qu'il renvoie 0 :

```bash
export DATADOG_API_KEY='<CLÉ_API>'
export DATADOG_APP_KEY='<CLÉ_APPLICATION>'

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

Pour activer le rapport JUnit, passez l'argument `--jUnitReport` (ou `-j`) dans votre commande, en indiquant un nom de fichier pour votre rapport XML JUnit.

```bash
yarn datadog-ci synthetics run-tests -s 'tag:e2e-tests' --config global.config.json --jUnitReport e2e-test-junit
```

Les générateurs de rapports peuvent se rattacher à l'élément `MainReporter` de la commande.

### Hooks disponibles

| Nom du hook        | Paramètres                                                                               | Rôle                                                     |
| :--------------- | :--------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `log`            | `(log: string)`                                                                          | Appelé pour le logging.                                             |
| `error`          | `(error: string)`                                                                        | Appelé lorsqu'une erreur se produit.                                |
| `initErrors`     | `(errors: string[])`                                                                     | Appelé lorsqu'une erreur se produit durant la phase de parsing des tests. |
| `reportStart`    | `(timings: {startTime: number})`                                                         | Appelé au début du rapport.                              |
| `resultEnd`      | `(result: Result, baseUrl: string)`                                                      | Appelé pour chaque résultat à la fin de tous les résultats.               |
| `resultReceived` | `(result: Result)`                                                                       | Appelé lorsqu'un résultat est reçu.                               |
| `testTrigger`    | `(test: Test, testId: string, executionRule: ExecutionRule, config: UserConfigOverride)` | Appelé lorsqu'un test est déclenché.                                |
| `testWait`       | `(test: Test)`                                                                           | Appelé lorsqu'un test attend de recevoir ses résultats.           |
| `testsWait`      | `(tests: Test[])`                                                                        | Appelé lorsque tous les tests attendent de recevoir leurs résultats.     |
| `runEnd`         | `(summary: Summary, baseUrl: string, orgSettings?: SyntheticsOrgSettings)`               | Appelé au terme de l'exécution.                                   |

## Consulter les résultats des tests

Vous pouvez consulter les résultats des lots de tests CI en cliquant sur un lot dans l'[explorateur Synthetic Monitoring & Continuous Testing][4] ou en cliquant sur un test sur la [page **Synthetic Tests**][5].

Vous pouvez également consulter les résultats des tests directement dans vos pipelines CI à mesure qu'ils s'exécutent. Pour identifier la cause de l'échec d'un test, consultez les logs d'exécution et recherchez les causes de l'assertion ayant échoué.

```bash
  yarn datadog-ci synthetics run-tests --config synthetics.global.json
  yarn run v1.22.4
  $ /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/node_modules/.bin/datadog-ci synthetics run-tests --config synthetics.global.json
  Finding files in /Users/demo.user/go/src/github.com/Datadog/tmp/test/testDemo/{,!(node_modules)/**/}*.synthetics.json

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

## Commande de publication d'application

Pour publier une nouvelle version d'une **application existante**, vous pouvez vous servir de la commande `synthetics upload-application`. Pour l'utiliser :

`--mobileApplicationId` - chaîne - l'ID de l'application pour laquelle vous souhaitez publier une nouvelle version
`--mobileApplicationVersionFilePath` - chaîne - chemin vers l'application mobile (.apk/.ipa)
`--versionName` - chaîne - nom de la nouvelle version (doit être unique)
`--latest` - booléen - si spécifié, indique que la version de l'application est la plus récente. Les tests exécutés sur la dernière version utiliseront cette version lors de leur prochaine exécution.

Exemple :
```
datadog-ci synthetics upload-application              \
--mobileApplicationId '123-123-123'                   \
--mobileApplicationVersionFilePath example/test.apk \
--versionName 'example 1.0'                           \
--latest
```   

Vous pouvez également utiliser ces options dans un fichier de configuration :
```
{
  "apiKey": <CLÉ_API_DATADOG>,
  "appKey": <CLÉ_APPLICATION_DATADOG>,
  "mobileApplicationVersionFilePath": "example_path/example_app.apk",
  "mobileApplicationId": "example-abc",
  "versionName": "example",
  "latest": true
}
```

Et spécifier ce fichier dans la commande à l'aide du flag `--config`, comme dans cet exemple :
```
datadog-ci synthetics upload-application --config global.config.json
```

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Utiliser l'action GitHub de Datadog pour ajouter des tests continus à vos workflows][6]
- [En savoir plus sur les tests continus et le CI/CD][7]
- [En savoir plus sur l'Explorateur de tests en continu][8]
- [En savoir plus sur le Tunnel de test en continu][3]

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/TooTallNate/node-proxy-agent
[3]: https://docs.datadoghq.com/fr/continuous_testing/testing_tunnel/
[4]: https://app.datadoghq.com/synthetics/explorer/
[5]: https://app.datadoghq.com/synthetics/tests
[6]: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
[7]: https://docs.datadoghq.com/fr/continuous_testing/cicd_integrations/
[8]: https://docs.datadoghq.com/fr/continuous_testing/explorer/
[9]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json