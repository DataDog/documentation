---
description: Configurer Synthetics afin d'exécuter des tests dans vos pipelines de
  CI/CD
further_reading:
- link: /synthetics/cicd_integrations
  tag: Documentation
  text: En savoir plus sur Synthetics et CI/CD
- link: /synthetics/ci_results_explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de résultats CI
- link: /synthetics/testing_tunnel
  tag: Documentation
  text: En savoir plus sur le tunnel de test
- link: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
  tag: Blog
  text: Utiliser l'action GitHub de Datadog pour ajouter des tests Synthetic aux workflows
kind: documentation
title: Configuration d'intégrations CI/CD
---

<div class="alert alert-info">Cette page explique comment configurer des tests Synthetic dans vos pipelines d'intégration continue (CI). Si vous souhaitez intégrer vos métriques et données de CI dans des dashboards Datadog, consultez plutôt la section <a href="/continuous_integration/" target="_blank">Continuous Integration Visibility</a>.</div>

## Présentation

Utilisez le package NPM `@datadog-ci` pour exécuter des tests Synthetic directement dans votre pipeline de CI/CD. Vous pouvez automatiquement interrompre un build, bloquer un déploiement ou le rétablir lorsqu'un test Synthetic détecte une régression. 

Pour configurer l'URL de départ de votre test, définissez une `startUrl` dans l'objet de votre test. Pour créer votre propre URL de départ, utilisez une partie de l'URL de départ d'origine de votre test et les variables d'environnement indiquées plus loin dans ce guide.

### Installer un package

Le package est publié sous [@datadog/datadog-ci][1] dans le registre NPM.

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

### Configurer un client

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

     Le fichier de configuration JSON globale peut spécifier des options avancées supplémentaires. Définissez le chemin vers ce fichier à l'aide du flag `--config` [lors du lancement de vos tests](#executer-des-tests). Si vous définissez le nom de votre fichier de configuration globale sur `datadog-ci.json`, ce nom est utilisé par défaut.

Vous pouvez définir les options suivantes dans le fichier de configuration globale :

`apiKey`
: La clé d'API utilisée pour interroger l'API Datadog.

`appKey`
: La clé d'application utilisée pour interroger l'API Datadog.

`datadogSite`
: L'instance Datadog à laquelle la requête est envoyée. Valeur par défaut : `datadoghq.com`. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.

`files`
: L'expression globale utilisée pour les fichiers de configuration des tests Synthetic.

`global`
: Les configurations à appliquer à tous les tests Synthetic ([voir ci-dessous les descriptions de chaque champ](#configurer-des-tests)).

`proxy`
: Le proxy à utiliser pour les connexions sortantes vers Datadog. Les clés `host` et `port` sont des arguments obligatoires. Par défaut, la clé `protocol` a pour valeur `http`. Elle peut prendre pour valeur `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` ou `pac+https`. La bibliothèque [proxy-agent][2] est utilisée pour configurer le proxy.

`subdomain`
: Le nom du sous-domaine personnalisé permettant d'accéder à votre application Datadog. Si l'URL utilisée pour accéder à Datadog est `myorg.datadoghq.com`, la valeur de `subdomain` doit alors être définie sur `myorg`.

`tunnel`
: Utilisez le [tunnel sécurisé][3] pour exécuter votre lot de tests.

`testSearchQuery`
: Envoyez une requête pour sélectionner les tests Synthetic à exécuter. Si vous exécutez des tests dans l'interface de ligne de commande, utilisez le flag `-s`.

Exemple :

{{< code-block lang="json" filename="Global Configuration File" disable_copy="false" collapsible="true" >}}
{
    "apiKey": "<CLÉ_API_DATADOG>",
    "appKey": "<CLÉ_APPLICATION_DATADOG>",
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
        "headers": { "<NOUVEL_EN-TÊTE>": "<NOUVELLE_VALEUR>" },
            "locations": ["aws:us-west-1"],
        "retry": { "count": 2, "interval": 300 },
        "executionRule": "blocking",
        "startUrl": "{{URL}}?static_hash={{HASH_STATIQUE}}",
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
    "subdomain": "subdomainname",
    "tunnel": true
}
{{< /code-block >}}

### Configurer des tests

Par défaut, le client découvre et exécute automatiquement tous les tests spécifiés dans les fichiers `**/*.synthetics.json`. Ce chemin peut être configuré dans le [fichier de configuration globale](#configurer-un-client). 

Ces fichiers incluent une clé `tests`, qui contient un tableau d'objets avec les ID des tests à exécuter et toutes les configurations potentielles à appliquer à ces tests.

Exemple :

{{< code-block lang="json" filename="Basic Test Configuration File" disable_copy="false" collapsible="true" >}}
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
{{< /code-block >}}

#### Configuration supplémentaire

Par défaut, les tests utilisent leur configuration d'origine. Vous pouvez la consulter dans l'interface utilisateur ou [la récupérer depuis l'API][4].

Cependant, dans le cadre de votre déploiement CI, vous pouvez choisir de remplacer certains (ou l'ensemble) des paramètres de votre test par les paramètres ci-dessous. Pour modifier la configuration de tous vos tests, définissez les mêmes paramètres au niveau du [fichier de configuration globale](#configurer-un-client).

`allowInsecureCertificates`
: **Type** : booléen<br>
Désactive les vérifications de certificat lors des tests HTTP.

`basicAuth`
: **Type** : objet <br>
Identifiants à utiliser lorsqu'une authentification basique est nécessaire lors d'un test HTTP ou Browser.
  - `username`: chaîne. Nom d'utilisateur à utiliser pour l'authentification basique.
  - `password`: chaîne. Mot de passe à utiliser lors de l'authentification basique.

`body`
: **Type** : chaîne<br>
Données à envoyer avec les tests HTTP.

`bodyType`
: **Type** : chaîne<br>
Type des données envoyées avec les tests HTTP.

`cookies`
: **Type** : chaîne<br>
Chaîne utilisée en tant qu'en-tête de cookie dans un test HTTP ou Browser.

`deviceIds`
: **Type** : tableau<br>
Liste des appareils sur lesquels le test Browser s'exécute.

`followRedirects`
: **Type** : booléen<br>
Indique s'il faut suivre ou non les redirections dans les tests HTTP.

`headers`
: **Type** : objet<br>
En-têtes à remplacer dans le test HTTP ou Browser. Les clés de cet objet sont définies sur le nom des en-têtes à remplacer, et ses valeurs sur la nouvelle valeur des en-têtes.

`locations`
: **Type** : tableau<br>
Liste des emplacements à partir desquels le test s'exécute.

`retry`
: **Type** : objet<br>
Stratégie définissant le comportement à adopter pour les nouvelles tentatives du test.
  - `count` : nombre entier. Nombre de tentatives à effectuer en cas d'échec d'un test.
  - `interval` : nombre entier. Intervalle entre chaque tentative (en millisecondes).

`executionRule`
: **Type** : chaîne<br>
Règle d'exécution du test définissant le comportement de l'interface de ligne de commande en cas d'échec du test :
  - `blocking` : l'interface de ligne de commande renvoie une erreur si le test échoue.
  - `non_blocking` : l'interface de ligne de commande affiche seulement un avertissement si le test échoue.
  - `skipped` : le test n'est pas du tout exécuté.

`startUrl`
: **Type** : chaîne<br>
Nouvelle URL de départ à fournir au test HTTP ou Browser.

`variables`
: **Type** : objet<br>
Variables à remplacer dans le test. Les clés de cet objet sont définies sur le nom des variables à remplacer, et ses valeurs sur la nouvelle valeur des variables.

`pollingTimeout`
: **Type** : nombre entier<br>
Durée en millisecondes après laquelle `datadog-ci` arrête de récupérer les résultats des tests. Valeur par défaut : 120 000 ms. Pour votre CI, tout résultat de test terminé après ce délai est considéré comme un échec.

**Remarque** : les nouvelles configurations de test sont prioritaires sur les configurations globales.

{{< code-block lang="json" filename="Advanced Test Configuration File" disable_copy="false" collapsible="true" >}}
{
    "tests": [
        {
            "id": "<<ID_TEST_PUBLIC>",
            "config": {
                "allowInsecureCertificates": true,
                "basicAuth": { "username": "test", "password": "test" },
                "body": "{\"fakeContent\":true}",
                "bodyType": "application/json",
                "cookies": "name1=value1;name2=value2;",
                "deviceIds": ["laptop_large"],
                "followRedirects": true,
                "headers": { "<NOUVEL_EN-TÊTE>": "<NOUVELLE_VALEUR>" },
            "locations": ["aws:us-west-1"],
                "retry": { "count": 2, "interval": 300 },
                "executionRule": "skipped",
                "startUrl": "{{URL}}?static_hash={{HASH_STATIQUE}}",
                "variables": { "titleVariable": "new value" },
                "pollingTimeout": 180000
            }
        }
    ]
}

{{< /code-block >}}

#### Règle d'exécution

Utilisez le menu déroulant en regard de **CI Execution** pour définir la règle d'exécution de chaque test.

{{< img src="synthetics/cicd_integrations/execution_rule.mp4" alt="Règle d'exécution CI" video="true" width="100%">}}

La règle d'exécution la plus restrictive du fichier de configuration est associée au test. Il existe trois règles, à savoir, de la plus restrictive à la moins restrictive, `skipped`, `non_blocking` et `blocking`. Ainsi, si votre test est configuré sur `skipped` dans l'interface, mais sur `blocking` dans le fichier de configuration, il sera ignoré (`skipped`) lors de l'exécution de vos tests.

#### URL de départ

`URL`
: URL de départ d'origine du test. <br>
**Exemple** : `https://www.example.org:81/chemin/vers/element?abc=123#target`.

`DOMAIN`
: Nom de domaine du test.<br>
**Exemple** : `example.org`.

`HASH`
: Hash du test.<br>
**Exemple** : `#target`.

`HOST`
: Host du test.<br>
**Exemple** : `www.example.org:81`.

`HOSTNAME`
: Hostname du test.<br>
**Exemple** : `www.example.org`.

`ORIGIN`
: Origine du test.<br>
**Exemple** : `https://www.example.org:81`.

`PARAMS`
: Paramètres de la requête du test.<br>
**Exemple** : `?abc=123`.

`PATHNAME`
: Chemin de l'URI du test.<br>
**Exemple** : `/chemin/vers/element`.

`PORT`
: Port du host du test.<br>
**Exemple** : `81`.

`PROTOCOL`
: Protocole du test.<br>
**Exemple** : `https:`.

`SUBDOMAIN`
: Sous-domaine du test.<br>
**Exemple** : `www`.

Que vous utilisiez des tests Synthetic dans un environnement de type production ou staging pour contrôler vos déploiements CI/CD, vous pouvez exécuter ces tests sur l'URL générée pour un environnement staging et non pour un environnement de production. Pour ce faire, définissez les variables d'environnement locales dans l'URL de départ de votre test.

Pour déclencher un test Synthetic existant sur un endpoint de type staging (et non de type production), définissez la variable d'environnement `$SUBDOMAIN` sur `staging-example` et la variable d'environnement `$PORT` sur un port utilisé pour votre environnement staging. Vos tests Synthetic s'exécutent alors sur l'URL générée pour un environnement staging, et non pour un environnement de production.

Par exemple, vous pouvez écrire `https://app.datadoghq.com/synthetics/details/abc-123-zyx?live=1h#test-results` comme suit :

* `{{PROTOCOL}}//{{SUBDOMAIN}}.{{DOMAIN}}:{{PORT}}{{PATHNAME}}{{PARAMS}}{{HASH}}`
* `{{PROTOCOL}}//{{HOST}}{{PATHNAME}}{{PARAMS}}{{HASH}}`
* `{{URL}}`

**Remarque :** si les noms de certaines de vos variables d'environnement correspondent à l'une des variables réservées ci-dessus, vos variables d'environnement seront ignorées et remplacées par le composant correspondant parsé à partir de la `startUrl` de votre test. 

### Exécuter des tests

Vous pouvez faire en sorte que votre interface de ligne de commande découvre automatiquement tous vos tests Synthetic `**/*.synthetics.json` (ou tous les tests associés au chemin spécifié dans votre [fichier de configuration globale](#configurer-un-client)) ou spécifier les tests que vous souhaitez exécuter à l'aide du flag `-p,--public-id`.

Exécutez des tests via l'interface de ligne de commande :

{{< tabs >}}
{{% tab "Yarn" %}}

```bash
yarn datadog-ci synthetics run-tests
```

**Remarque** : si vous lancez vos tests avec un fichier de configuration globale personnalisé, ajoutez`--config <CHEMIN_FICHIER_CONFIGURATION_GLOBALE>` à votre commande.

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

**Remarque** : si vous lancez vos tests avec un fichier de configuration globale personnalisé, ajoutez `--config <CHEMIN_FICHIER_CONFIGURATION_GLOBALE>` à la commande associée à votre script `datadog-ci-synthetics`.

{{% /tab %}}
{{< /tabs >}}

### Utiliser le tunnel de test

Un tunnel sécurisé est également inclus dans le package NPM [@datadog/datadog-ci][1]. Il vous permet de déclencher des tests Synthetic sur vos applications internes. 

Le tunnel de test crée un proxy HTTP chiffré de bout en bout entre votre infrastructure et Datadog. Ainsi, toutes les requêtes de test envoyées via l'interface de ligne de commande sont automatiquement acheminées par l'intermédiaire du client `datadog-ci`. 

Pour en savoir plus, consultez la section relative au [tunnel de test][3].

### Afficher les résultats du test

#### Dans vos pipelines CI

Vous pouvez consulter les résultats des tests directement dans vos pipelines CI au fur et à mesure qu'ils s'exécutent.

{{< img src="synthetics/cicd_integrations/successful_test_result.png" alt="Résultat d'un test ayant réussi"  style="width:100%;">}}

Vous pouvez identifier la cause de l'échec d'un test en consultant les logs d'exécution et en recherchant les causes de l'assertion ayant échoué :

{{< img src="synthetics/cicd_integrations/failed_test_result.png" alt="Résultat d'un test ayant échoué" style="width:100%;">}}

#### Dans l'application Datadog

Vos résultats de tests CI sont également indiqués dans l'[explorateur de résultats CI][5] et sur les pages des détails des tests :

{{< img src="synthetics/ci_results_explorer/ci_results_explorer.png" alt="Explorateur de résultats CI" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/TooTallNate/node-proxy-agent
[3]: /fr/synthetics/testing_tunnel/
[4]: /fr/api/latest/synthetics/#get-a-test-configuration
[5]: /fr/synthetics/ci_results_explorer