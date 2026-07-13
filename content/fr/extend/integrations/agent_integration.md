---
aliases:
- /fr/developers/integrations/integration_sdk/
- /fr/developers/integrations/testing/
- /fr/integrations/datadog_checks_dev/
- /fr/guides/new_integration/
- /fr/developers/integrations/new_check_howto/
- /fr/developers/integrations/agent_integration/
description: Apprenez à développer et publier une intégration de l'Agent Datadog.
further_reading:
- link: /extend/integrations/
  tag: Documentation
  text: Créez une intégration
- link: /extend/integrations/python/
  tag: Documentation
  text: Python pour le développement d'intégrations basées sur l'Agent
- link: /extend/
  tag: Documentation
  text: Découvrir comment développer sur la plateforme Datadog
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: Centre d'apprentissage
  text: Créer une intégration pour l'Agent
title: Créer une intégration basée sur l'Agent
---
## Aperçu {#overview}

Cette page guide les Partenaires Technologiques à travers le processus de création d'une intégration officielle de l'Agent Datadog. 

Les intégrations basées sur l'Agent sont conçues pour collecter de la télémétrie à partir de logiciels ou de systèmes fonctionnant sur une infrastructure gérée par le client, où l'Agent Datadog est installé ou a accès au réseau. Ces intégrations utilisent l'[Agent Datadog][1] pour collecter et soumettre des données via des vérifications d'agent personnalisées développées par des Partenaires Technologiques approuvés. 

Les vérifications d'agent peuvent émettre des [métriques][2], des [événements][3] et des [journaux][5] dans le compte Datadog d'un client. Chaque intégration basée sur l'Agent est un package Python construit sur l'Agent Datadog, permettant aux clients de l'[installer][6] facilement via l'Agent Datadog. Les traces, cependant, sont collectées en dehors de la vérification de l'agent en utilisant l'un des SDK de Datadog. Pour plus d'informations, consultez la [documentation sur l'instrumentation des applications][25].

## Création d'une intégration basée sur l'agent {#building-an-agent-based-integration}
Avant de commencer, assurez-vous d'avoir [rejoint le Réseau de Partenaires Datadog][7], d'avoir accès à une organisation de développeurs partenaires, et d'avoir [créé une fiche sur la Developer Platform][8].

Suivez ces étapes pour créer votre intégration basée sur l'agent :

1. [Installez les outils de développement requis](#prerequisites).
2. [Configurez l'outil de développement d'intégration de l'Agent Datadog](#configure-the-datadog-agent-integration-developer-tool).
3. [Générez votre échafaudage](#generate-your-scaffolding)
4. [Développez votre vérification d'agent](#develop-your-agent-check).
5. [Testez votre intégration](#test-your-agent-check).
6. [Soumettez votre code pour révision](#submit-your-code-for-review).

### Conditions préalables {#prerequisites}

Assurez-vous que les outils suivants sont installés :

- [pipx][9] pour installer les outils de développement et les dépendances
- [Datadog Agent Integration Developer Tool][10] (`ddev`) pour générer l'échafaudage et gérer le développement d'intégration
- [Docker][11] pour exécuter l'ensemble des tests
- Git ([ligne de commande][12] ou [client GitHub Desktop][13])

### Configurez l'outil de développement d'intégration de l'Agent Datadog {#configure-the-datadog-agent-integration-developer-tool}
Utilisez l'outil de développement de l'Agent Datadog pour construire et tester votre intégration. Les étapes de configuration diffèrent selon que vous développez une [intégration prête à l'emploi (OOTB) ou une Intégration Marketplace][23]. Sélectionnez l'onglet approprié ci-dessous.

{{< tabs >}}

{{% tab "Intégration OOTB" %}}

1. Créez un répertoire de travail. L'outil de développement s'attend à ce que votre travail soit situé dans `$HOME/dd/` :

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Créez un fork du dépôt [Datadog/integrations-extras][101] dans votre compte GitHub.

3. Clonez votre fork dans le répertoire `dd` :

   ```shell
   git clone git@github.com:<YOUR_USERNAME>/integrations-extras.git
   ```

4. Créez et passez à une nouvelle branche pour votre intégration :

   ```shell
   cd integrations-extras
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

5. Définissez `extras` comme le dépôt de travail par défaut : 

   ```shell
   ddev config set repo extras
   ```

   Si votre dépôt est stocké en dehors de `$HOME/dd/`, spécifiez le chemin avant de le définir comme par défaut :

   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ddev config set repo extras 
   ```

[101]: https://github.com/Datadog/integrations-extras

{{% /tab %}}

{{% tab "Intégration Marketplace" %}}

1. Créez un répertoire de travail. L'outil de développement s'attend à ce que votre travail soit situé dans `$HOME/dd/` :

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Clonez le dépôt [Datadog/marketplace][101]. Si vous n'avez pas accès, demandez-le à votre contact Datadog.

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

3. Créez et passez à une nouvelle branche pour votre intégration :

   ```shell
   cd marketplace
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

4. Définissez `marketplace` comme le dépôt de travail par défaut :

   ```shell
   ddev config set repo marketplace
   ```

   Si votre dépôt est stocké en dehors de `$HOME/dd/`, spécifiez le chemin avant de le définir comme par défaut :

   ```shell
   ddev config set repos.marketplace "/path/to/marketplace"
   ddev config set repo marketplace
   ```

[101]: https://github.com/DataDog/marketplace

{{% /tab %}}

{{< /tabs >}}

### Générez votre échafaudage {#generate-your-scaffolding}

Utilisez la commande `ddev create` pour générer la structure de fichiers et de répertoires initiale pour votre intégration basée sur un agent.

<div class="alert alert-info">Consultez l'onglet Méthode de Configuration dans la Plateforme Développeur pour la commande correcte pour votre intégration.</div>

1. **Effectuez une exécution à blanc (recommandé)**

    Utilisez l'option `-n` ou `--dry-run` pour prévisualiser les fichiers générés, sans rien écrire sur le disque. Confirmez que le chemin de sortie correspond à l'emplacement du dépôt attendu.

    ```shell
    ddev create -nt check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

2. **Générez les fichiers** 

    Après avoir vérifié l'emplacement du répertoire, exécutez la même commande sans le `-n` pour créer l'échafaudage. Suivez les instructions pour fournir les détails de l'intégration.

    ```shell
    ddev create -t check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

### Développez votre vérification d'agent {#develop-your-agent-check}

Chaque intégration basée sur un agent tourne autour d'une vérification d'agent, une classe Python qui collecte périodiquement de la télémétrie et la soumet à Datadog.

Les vérifications d'agent [héritent][16] de la classe de base `AgentCheck` et doivent répondre aux exigences suivantes :

- **Compatibilité Python** :
    - Les intégrations pour Datadog Agent v7+ doivent prendre en charge Python 3. Toutes les nouvelles intégrations doivent cibler v7+.
    - Les intégrations pour Datadog Agent v5-v6 utilisent Python 2.7.
- **Héritage de classe** : Chaque vérification doit sous-classer `AgentCheck`.
- **Point d'entrée** : Chaque vérification doit implémenter une méthode `check(self, instance)`.
- **Structure de paquet** : Les vérifications sont organisées sous l'espace de noms `datadog_checks`. Par exemple, une intégration nommée `<INTEGRATION_NAME>` se trouve dans : `<integration_name>/datadog_checks/<integration_name>/`.
- **Nommage** :
    - Le nom du paquet doit correspondre au nom de la vérification.
    - Les noms de module et de classe Python au sein du paquet peuvent être choisis librement.

#### Implémentez la logique de vérification {#implement-check-logic}

L'exemple suivant montre la logique pour une intégration nommée `Awesome`.

Cette vérification définit un [service de vérification][4] appelé `awesome.search`, qui recherche une chaîne spécifique sur une page web :
- Renvoie `OK` si la chaîne est trouvée.
- Renvoie `WARNING` si la page se charge mais que la chaîne est manquante.
- Renvoie `CRITICAL` si la page ne peut pas être atteinte.

Pour apprendre à soumettre des données supplémentaires de votre vérification, voir :

- [Vérification d'Agent Personnalisée][17] pour soumettre des métriques.
- [Collecte de Logs d'Intégration d'Agent][5] pour collecter des logs de votre AgentCheck en utilisant `send_log`. Meilleur pour l'émission de logs à source unique.
- [Tutoriel de Crawler HTTP][24] pour collecter des logs de plusieurs sources de logs, comme lors de l'interrogation de plusieurs points de terminaison ou d'APIs HTTP externes.

Le fichier `awesome/datadog_checks/awesome/check.py` pourrait ressembler à ceci :

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests
import time

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck):
    """AwesomeCheck derives from AgentCheck, and provides the required check method."""

    def check(self, instance):
        url = instance.get('url')
        search_string = instance.get('search_string')

        # It's a very good idea to do some basic sanity checking.
        # Try to be as specific as possible with the exceptions.
        if not url or not search_string:
            raise ConfigurationError('Configuration error, please fix awesome.yaml')

        try:
            response = requests.get(url)
            response.raise_for_status()
        # Something went horribly wrong
        except Exception as e:
            # Ideally we'd use a more specific message...
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
            # Submit an error log
            self.send_log({
                'message': f'Failed to access {url}: {str(e)}',
                'timestamp': time.time(),
                'status': 'error',
                'service': 'awesome',
                'url': url
            })
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
                # Submit an info log
                self.send_log({
                    'message': f'Successfully found "{search_string}" at {url}',
                    'timestamp': time.time(),
                    'status': 'info',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
                # Submit a warning log
                self.send_log({
                    'message': f'String "{search_string}" not found at {url}',
                    'timestamp': time.time(),
                    'status': 'warning',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
{{< /code-block >}}

Pour en savoir plus sur la classe de base Python, voir [Anatomie d'une Vérification Python][18].

### Écrivez des tests de validation {#write-validation-tests}

Il existe deux types de tests :

- [Tests unitaires pour des fonctionnalités spécifiques](#write-a-unit-test)
- [Tests d'intégration qui exécutent la méthode `check` et vérifient la collecte correcte des métriques](#write-an-integration-test)

[pytest][19] et [hatch][20] sont utilisés pour exécuter les tests. Des tests sont nécessaires pour publier votre intégration.

#### Écrivez un test unitaire {#write-a-unit-test}

La première partie de la méthode `check` pour Awesome récupère et vérifie deux éléments du fichier de configuration. C'est un bon candidat pour un test unitaire.

Ouvrez le fichier à `awesome/tests/test_awesome.py` et remplacez le contenu par ce qui suit :

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
import pytest

    # Don't forget to import your integration

from datadog_checks.awesome import AwesomeCheck
from datadog_checks.base import ConfigurationError


@pytest.mark.unit
def test_config():
    instance = {}
    c = AwesomeCheck('awesome', {}, [instance])

    # empty instance
    with pytest.raises(ConfigurationError):
        c.check(instance)

    # only the url
    with pytest.raises(ConfigurationError):
        c.check({'url': 'http://foobar'})

    # only the search string
    with pytest.raises(ConfigurationError):
        c.check({'search_string': 'foo'})

    # this should not fail
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
{{< /code-block >}}

`pytest` a le concept de marqueurs qui peuvent être utilisés pour regrouper les tests en catégories. Remarquez que `test_config` est marqué comme un test `unit`.

L'échafaudage est configuré pour exécuter tous les tests situés dans `awesome/tests`. Pour exécuter les tests, exécutez la commande suivante :

```
ddev test awesome
```

#### Écrivez un test d'intégration {#write-an-integration-test}

Le test unitaire [ ci-dessus](#write-a-unit-test) ne vérifie pas la logique de collection. Pour tester la logique, vous devez [créer un environnement pour un test d'intégration](#create-an-environment-for-the-integration-test) et [écrire un test d'intégration](#add-an-integration-test).

##### Créez un environnement pour le test d'intégration {#create-an-environment-for-the-integration-test}

L'outil utilise `docker` pour démarrer un conteneur NGINX et permet à la vérification de récupérer la page d'accueil.

Pour créer un environnement pour le test d'intégration, créez un fichier docker-compose à `awesome/tests/docker-compose.yml` avec le contenu suivant :

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

Ensuite, ouvrez le fichier à `awesome/tests/conftest.py` et remplacez le contenu par ce qui suit :

{{< code-block lang="python" filename="conftest.py" collapsible="true" >}}
import os

import pytest

from datadog_checks.dev import docker_run, get_docker_hostname, get_here

URL = 'http://{}:8000'.format(get_docker_hostname())
SEARCH_STRING = 'Thank you for using nginx.'
INSTANCE = {'url': URL, 'search_string': SEARCH_STRING}


@pytest.fixture(scope='session')
def dd_environment():
    compose_file = os.path.join(get_here(), 'docker-compose.yml')

    # This does 3 things:
    #
    # 1. Spins up the services defined in the compose file
    # 2. Waits for the url to be available before running the tests
    # 3. Tears down the services when the tests are finished
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### Ajoutez un test d'intégration {#add-an-integration-test}

Après avoir configuré un environnement pour le test d'intégration, ajoutez un test d'intégration au fichier `awesome/tests/test_awesome.py` :

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
@pytest.mark.integration
@pytest.mark.usefixtures('dd_environment')
def test_service_check(aggregator, instance):
    c = AwesomeCheck('awesome', {}, [instance])

    # the check should send OK
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.OK)

    # the check should send WARNING
    instance['search_string'] = 'Apache'
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.WARNING)
{{< /code-block >}}

Pour accélérer le développement, utilisez l'option `-m/--marker` pour exécuter uniquement les tests d'intégration :
   ```
   ddev test -m integration awesome
   ```

## Testez votre vérification d'agent {#test-your-agent-check}

Les intégrations basées sur l'Agent sont distribuées sous forme de fichiers Python wheel (.whl) que les clients installent via l'Agent Datadog. Avant de publier votre intégration, vous pouvez la tester localement en construisant et en installant manuellement le package wheel.

### Construisez le wheel {#build-the-wheel}

Le fichier `pyproject.toml` fournit les métadonnées utilisées pour empaqueter et construire le wheel. Le wheel contient les fichiers nécessaires au fonctionnement de l'intégration elle-même, y compris la vérification de l'agent, le fichier d'exemple de configuration et les artefacts générés lors de la construction du wheel.

Pour en savoir plus sur l'empaquetage Python, consultez [Emballage de projets Python][21].

Une fois que votre `pyproject.toml` est prêt, créez un wheel en utilisant l'une des options suivantes :

- (Recommandé) Avec l'outil `ddev` : `ddev release build <INTEGRATION_NAME>`.
- Sans l'outil `ddev` : `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

### Installez le wheel {#install-the-wheel}

Le wheel est installé en utilisant la commande Agent `integration`, disponible dans [Agent v6.10.0 ou ultérieur][1]. Selon votre environnement, vous devrez peut-être exécuter cette commande en tant qu'utilisateur spécifique ou avec des privilèges spécifiques :

**Linux** (en tant que `dd-agent`) :

```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (en tant qu'administrateur) :

```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell** (Assurez-vous que votre session shell dispose des privilèges _administrateur_) :

{{% collapse-content title="Agent v6.11 ou antérieur" level="h4" expanded=false %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

{{% collapse-content title="Agent v6.12 ou ultérieur" level="h4" expanded=true %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

Pour installer votre wheel pour tester dans des environnements Kubernetes :
1. Montez le fichier `.whl` dans un initContainer.
2. Exécutez l'installation du wheel dans l'initContainer.
3. Montez le conteneur d'initialisation dans le conteneur Agent pendant qu'il fonctionne.

Pour les commandes d'installation des clients pour les environnements hôte et conteneur, consultez la [documentation sur les intégrations de la communauté et du marché][22].

## Soumettez votre code pour révision {#submit-your-code-for-review}

Ouvrez une pull request avec votre répertoire d'intégration dans le dépôt approprié, soit [Datadog/integrations-extras][14] soit [Datadog/marketplace][15]. La pull request est examinée en parallèle avec votre soumission à la Developer Platform.

## Mise à jour de votre intégration {#updating-your-integration}

Après la publication de votre intégration, vous pouvez publier des mises à jour via la plateforme développeur.

### Mise à jour de la version d'une intégration {#bumping-an-integration-version}
Une mise à jour de la version est nécessaire chaque fois que vous ajoutez, supprimez ou modifiez des fonctionnalités (par exemple, lors de l'introduction de nouvelles métriques, de la mise à jour de tableaux de bord ou de la modification du code d'intégration). Ce n'est pas nécessaire pour les mises à jour non fonctionnelles, telles que les modifications de contenu écrit, de branding, de logos ou d'images.

Dans la Developer Platform, incluez une nouvelle entrée dans l'onglet **Release Notes** en suivant ce format :
    

```
## Version Number / Date (YYYY-MM-DD)

***Added***:

* Description of new feature
* Description of new feature

***Fixed***:

* Description of fix
* Description of fix

***Changed***:

* Description of update or improvement
* Description of update or improvement

***Removed***:

* Description of removed feature
* Description of removed feature
```

Assurez-vous de mettre à jour toutes les références au numéro de version dans la documentation et les instructions d'installation de l'intégration.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/
[2]: https://docs.datadoghq.com/fr/metrics/
[3]: https://docs.datadoghq.com/fr/service_management/events/
[4]: /fr/extend/service_checks/
[5]: https://docs.datadoghq.com/fr/logs/log_collection/agent_checks/
[6]: https://docs.datadoghq.com/fr/agent/guide/integration-management/?tab=linux#install
[7]: /fr/extend/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /fr/extend/integrations/build_integration/#create-a-listing
[9]: https://github.com/pypa/pipx
[10]: /fr/extend/integrations/python/
[11]: https://docs.docker.com/get-docker/
[12]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[13]: https://desktop.github.com/
[14]: https://github.com/Datadog/integrations-extras
[15]: https://github.com/DataDog/marketplace
[16]: https://docs.datadoghq.com/fr/glossary/#check
[17]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count
[18]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[19]: https://docs.pytest.org/en/latest
[20]: https://github.com/pypa/hatch
[21]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[22]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[23]: /fr/extend/integrations/?tab=integrations#out-of-the-box-integrations-vs-marketplace-offerings
[24]: https://datadoghq.dev/integrations-core/tutorials/logs/http-crawler/
[25]: /fr/tracing/trace_collection/