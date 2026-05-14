---
aliases:
- /fr/developers/integrations/integration_sdk/
- /fr/developers/integrations/testing/
- /fr/integrations/datadog_checks_dev/
- /fr/guides/new_integration/
- /fr/developers/integrations/new_check_howto/
description: Découvrez comment développer et publier une intégration basée sur l'Agent
  Datadog.
further_reading:
- link: /developers/integrations/
  tag: Documentation
  text: Créer une intégration
- link: /developers/integrations/python/
  tag: Documentation
  text: Python pour le développement d'intégrations basées sur l'Agent
- link: /developers/
  tag: Documentation
  text: Découvrir comment développer sur la plateforme Datadog
title: Créer une intégration basée sur lʼAgent
---
## Présentation

Cette page guide les partenaires technologiques tout au long du processus de création d'une intégration officielle avec l'Agent Datadog.

Les intégrations basées sur l'Agent sont conçues pour collecter des données de télémétrie à partir de logiciels ou de systèmes s'exécutant sur une infrastructure gérée par le client, où l'Agent Datadog est installé ou dispose d'un accès réseau. Ces intégrations utilisent l'[Agent Datadog][1] pour collecter et soumettre des données via des checks d'Agent custom développés par des partenaires technologiques agréés.

Les checks d'Agent peuvent envoyer des [métriques][2], des [événements][3] et des [logs][5] dans le compte Datadog d'un client. Chaque intégration basée sur l'Agent est un package Python s'appuyant sur l'Agent Datadog, ce qui permet aux clients de l'[installer][6] facilement via l'Agent Datadog. Les traces, en revanche, sont collectées en dehors du check d'Agent à l'aide de l'une des bibliothèques de tracing de Datadog. Pour en savoir plus, consultez la [documentation sur l'instrumentation d'application][25].

## Créer une intégration basée sur l'Agent
Avant de commencer, assurez-vous d'avoir [rejoint le réseau de partenaires Datadog][7], d'avoir accès à une organisation partenaire de développement, et d'avoir [créé une annonce dans la plateforme de développement][8].

Suivez ces étapes pour créer votre intégration basée sur l'Agent :

1. [Installer les outils de développement requis](#prerequis).
2. [Configurer l'outil de développement d'intégrations avec l'Agent Datadog](#configurer-l-outil-de-developpement-d-integrations-avec-l-agent-datadog).
3. [Générer le scaffolding de votre intégration](#generer-votre-scaffolding).
4. [Développer votre check d'Agent](#developper-votre-check-d-agent).
5. [Tester votre intégration](#tester-votre-check-d-agent).
6. [Soumettre votre code pour révision](#soumettre-votre-code-pour-revision).

### Prérequis

Assurez-vous que les outils suivants sont installés :

- [pipx][9] pour installer les outils de développement et les dépendances
- [Outil de développement d'intégrations avec l'Agent Datadog][10] (`ddev`) pour générer le scaffolding et gérer le développement des intégrations
- [Docker][11] pour exécuter la suite de tests complète
- Git ([ligne de commande][12] ou [client GitHub Desktop][13])

### Configurer l'outil de développement d'intégrations avec l'Agent Datadog
Utilisez l'outil de développement d'intégrations avec l'Agent Datadog pour créer et tester votre intégration. Les étapes de configuration diffèrent selon que vous développez une [intégration prête à l'emploi (OOTB) ou une intégration Marketplace][23]. Sélectionnez l'onglet approprié ci-dessous.

{{< tabs >}}

{{% tab "OOTB integration" %}}

1. Créez un répertoire de travail. L'outil de développement s'attend à ce que votre travail se trouve dans `$HOME/dd/` :

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Forkez le référentiel [Datadog/integrations-extras][101] vers votre compte GitHub.

3. Clonez votre fork dans le répertoire `dd`.

   ```shell
   git clone git@github.com:<YOUR_USERNAME>/integrations-extras.git
   ```

4. Créez une nouvelle branche pour votre intégration et basculez dessus :

   ```shell
   cd integrations-extras
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

5. Définissez `extras` comme référentiel de travail par défaut :

   ```shell
   ddev config set repo extras
   ```

   Si votre référentiel est stocké en dehors de `$HOME/dd/`, spécifiez le chemin avant de le définir comme chemin par défaut :

   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ddev config set repo extras 
   ```

[101]: https://github.com/Datadog/integrations-extras

{{% /tab %}}

{{% tab "Marketplace integration" %}}

1. Créez un répertoire de travail. L'outil de développement s'attend à ce que votre travail se trouve dans `$HOME/dd/` :

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Clonez le référentiel [Datadog/marketplace][101]. Si vous n'y avez pas accès, faites-en la demande auprès de votre contact Datadog.

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

3. Créez une nouvelle branche pour votre intégration et basculez dessus :

   ```shell
   cd marketplace
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

4. Définissez `marketplace` comme référentiel de travail par défaut :

   ```shell
   ddev config set repo marketplace
   ```

   Si votre référentiel est stocké en dehors de `$HOME/dd/`, spécifiez le chemin avant de le définir comme chemin par défaut :

   ```shell
   ddev config set repos.marketplace "/path/to/marketplace"
   ddev config set repo marketplace
   ```

[101]: https://github.com/DataDog/marketplace

{{% /tab %}}

{{< /tabs >}}

### Générer votre scaffolding

Utilisez la commande `ddev create` pour générer la structure initiale de fichiers et de répertoires de votre intégration basée sur l'Agent.

<div class="alert alert-info">Consultez l'onglet Configuration Method dans la plateforme de développement pour obtenir la commande appropriée à votre intégration.</div>

1. **Effectuer un dry run (recommandé)**

    Utilisez l'option `-n` ou `--dry-run` pour prévisualiser les fichiers qui seront générés, sans rien écrire sur le disque. Vérifiez que le chemin de sortie correspond à l'emplacement du référentiel attendu. 

    ```shell
    ddev create -nt check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

2. **Générer les fichiers**

    Après avoir vérifié l'emplacement du répertoire, exécutez la même commande sans `-n` pour créer l'échafaudage. Suivez les invites pour fournir les détails de l'intégration.

    ```shell
    ddev create -t check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

### Développer votre check d'Agent

Chaque intégration basée sur l'Agent repose sur un check d'Agent, une classe Python qui collecte périodiquement des données de télémétrie et les soumet à Datadog.

Les [checks][16] d'Agent héritent de la classe de base `AgentCheck` et doivent répondre aux exigences suivantes :

- **Compatibilité Python** :
    - Les intégrations pour l'Agent Datadog v7+ doivent prendre en charge Python 3. Toutes les nouvelles intégrations doivent cibler la v7+.
    - Les intégrations pour l'Agent Datadog v5-v6 utilisent Python 2.7.
- **Héritage de classe** : chaque check doit être une sous-classe d'`AgentCheck`.
- **Point d'entrée** : chaque check doit implémenter une méthode `check(self, instance)`.
- **Structure du package** : les checks sont organisés sous l'espace de noms `datadog_checks`. Par exemple, une intégration nommée `<INTEGRATION_NAME>` se trouve dans : `<integration_name>/datadog_checks/<integration_name>/`.
- **Nommage** :
    - Le nom du package doit correspondre au nom du check.
    - Les noms des modules et des classes Python au sein du package peuvent être librement choisis.

#### Implémenter la logique du check

L'exemple suivant illustre la logique d'une intégration nommée `Awesome`.

Ce check définit un [check de service][4] appelé `awesome.search`, qui recherche une chaîne spécifique dans une page web :
- Renvoie `OK` si la chaîne est trouvée.
- Renvoie `WARNING` si la page se charge mais que la chaîne est absente.
- Renvoie `CRITICAL` si la page est inaccessible.

Pour savoir comment soumettre des données supplémentaires depuis votre check, consultez :

- [Check d'Agent custom][17] pour soumettre des métriques.
- [Collecte de logs pour l'intégration avec l'Agent][5] pour collecter des logs depuis votre AgentCheck à l'aide de `send_log`. Recommandé pour les émissions de logs depuis une source unique.
- [Tutoriel HTTP Crawler][24] pour collecter des logs depuis plusieurs sources de logs, par exemple lors de l'interrogation de plusieurs endpoints ou API HTTP externes.

Le fichier `awesome/datadog_checks/awesome/check.py` pourrait ressembler à ceci :

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests
import time

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck) :
    """AwesomeCheck est dérivé d'AgentCheck et fournit la méthode de check requise."""

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

Pour en savoir plus sur la classe Python de base, consultez la section [Anatomie d'un check Python][18].

### Écrire des tests de validation

Il existe deux types de tests :

- [Les tests d'unités, qui permettent de tester une fonctionnalité spécifique.](#ecrire-un-test-d-unite)
- [Les tests d'intégration, qui exécutent la méthode `check` et vérifient la bonne collecte des métriques](#ecrire-un-test-d-integration)

[pytest][19] et [hatch][20] sont utilisés pour exécuter les tests. Les tests sont obligatoires pour publier votre intégration.

#### Écrire un test d'unité

La première partie de la méthode `check` de l'intégration Awesome récupère et vérifie deux éléments dans le fichier de configuration. C'est un bon candidat pour un test d'unité.

Ouvrez le fichier `awesome/tests/test_awesome.py` et remplacez son contenu par ce qui suit :

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
import pytest

    # N'oubliez pas d'importer votre intégration

from datadog_checks.awesome import AwesomeCheck
from datadog_checks.base import ConfigurationError


@pytest.mark.unit
def test_config():
    instance = {}
    c = AwesomeCheck('awesome', {}, [instance])

    # instance vide
    with pytest.raises(ConfigurationError):
        c.check(instance)

    # url uniquement
    with pytest.raises(ConfigurationError):
        c.check({'url': 'http://foobar'})

    # chaîne de recherche uniquement
    with pytest.raises(ConfigurationError):
        c.check({'search_string': 'foo'})

    # aucune erreur ne devrait survenir
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
{{< /code-block >}}

`pytest` permet d'utiliser ce que l'on appelle des marqueurs, qui servent à regrouper les tests par catégorie. Notez que le marqueur `unit` a été appliqué à `test_config`.

L'architecture du projet est conçue pour exécuter tous les tests situés dans `awesome/tests`. Pour lancer les tests, exécutez la commande suivante :
```
ddev test awesome
```

#### Écrire un test d'intégration

Le [test d'unité ci-dessus](#ecrire-un-test-d-unite) ne teste pas la logique de collecte. Pour cela, vous devez [créer un environnement pour un test d'intégration](#creer-un-environnement-pour-le-test-d-integration) et [écrire un test d'intégration](#ajouter-un-test-d-integration).

##### Créer un environnement pour le test d'intégration

Le kit utilise `docker` pour lancer un conteneur NGINX et permet au check de récupérer la page d'accueil.

Pour créer un environnement pour le test d'intégration, créez un fichier docker-compose à l'emplacement `awesome/tests/docker-compose.yml` avec le contenu suivant :

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

Ouvrez ensuite le fichier `awesome/tests/conftest.py` et remplacez le contenu par ce qui suit :

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

    # On accomplit ici 3 choses :
    #
    # 1. Lancer les services définis dans le fichier compose
    # 2. Attendre que l'URL soit disponible avant de lancer les tests
    # 3. Démonter les services lorsque les tests sont terminés
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### Ajouter un test d'intégration

Après avoir configuré un environnement pour le test d'intégration, ajoutez un test d'intégration au fichier `awesome/tests/test_awesome.py` :

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
@pytest.mark.integration
@pytest.mark.usefixtures('dd_environment')
def test_service_check(aggregator, instance):
    c = AwesomeCheck('awesome', {}, [instance])

    # le check doit renvoyer OK
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.OK)

    # le check doit renvoyer WARNING
    instance['search_string'] = 'Apache'
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.WARNING)
{{< /code-block >}}

Pour un développement plus rapide, lancez les tests d’intégration uniquement avec l’option `-m/--marker` :
   ```
   ddev test -m integration awesome
   ```

## Tester votre check d'Agent

Les intégrations basées sur l'Agent sont distribuées sous forme de fichiers wheel Python (.whl) que les clients installent via l'Agent Datadog. Avant de publier votre intégration, vous pouvez la tester localement en créant et en installant manuellement le package wheel.

### Créer le wheel

Le fichier `pyproject.toml` fournit les métadonnées utilisées pour packager et créer le wheel. Le wheel contient les fichiers nécessaires au fonctionnement de l'intégration, notamment le check d'Agent, l'exemple de fichier de configuration et les artefacts générés lors de la création du wheel.

Pour en savoir plus sur le packaging Python, consultez la section [Packaging Python Projects][21].

Une fois votre `pyproject.toml` prêt, créez un wheel à l'aide de l'une des options suivantes :

- Avec l'outil `ddev` (conseillé) : `ddev release build <INTEGRATION_NAME>`.
- Sans l'outil `ddev` : `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

### Installer le wheel

Le wheel est installé à l'aide de la commande `integration` de l'Agent, disponible dans l'[Agent v6.10.0 ou ultérieur][1]. Selon votre environnement, vous devrez peut-être exécuter cette commande en tant qu'utilisateur spécifique ou avec des privilèges particuliers :

**Linux** (en tant que `dd-agent`) :
```bash
sudo -u dd-agent datadog-agent integration install -w /chemin/vers/wheel.whl
```

**OSX** (en tant qu'admin) :
```bash
sudo datadog-agent integration install -w /chemin/vers/wheel.whl
```

**Windows PowerShell** (veillez à ce que votre session shell dispose des privilèges _administrateur_) :

<details>
  <summary>Agent <code>6.11</code> ou une version antérieure</summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /chemin/vers/wheel.whl
  ```

</details>

<details open>
  <summary>Agent <code>6.12</code> ou une version ultérieure</summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /chemin/vers/wheel.whl
  ```
</details>

Pour installer votre wheel dans un environnement Kubernetes :
1. Montez le fichier `.whl` dans un initContainer.
2. Exécutez l'installation de la wheel dans l'initContainer.
3. Montez l'initContainer dans le conteneur de l'Agent pendant son exécution.

Pour les commandes d'installation client pour les environnements host et conteneur, consultez la [documentation sur les intégrations de la communauté et du Marketplace][22].

## Soumettre votre code pour relecture

Ouvrez une pull request avec votre répertoire d'intégration dans le référentiel approprié, [Datadog/integrations-extras][14] ou [Datadog/marketplace][15]. La pull request est examinée en parallèle de votre soumission sur la plateforme de développement.

## Mettre à jour votre intégration

Une fois votre intégration publiée, vous pouvez publier des mises à jour via la plateforme de développement.

### Mettre à jour la version d'une intégration
Une montée de version est nécessaire chaque fois que vous ajoutez, supprimez ou modifiez des fonctionnalités (par exemple, lors de l'introduction de nouvelles métriques, de la mise à jour de dashboards ou de la modification du code d'intégration). Elle n'est pas requise pour les mises à jour non fonctionnelles, telles que les modifications du contenu écrit, de l'image de marque, des logos ou des images.

Dans la plateforme de développement, ajoutez une nouvelle entrée dans l'onglet **notes de version** en respectant le format suivant :

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

Veillez à mettre à jour toutes les références au numéro de version dans la documentation et les instructions d'installation de l'intégration

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/
[2]: https://docs.datadoghq.com/fr/metrics/
[3]: https://docs.datadoghq.com/fr/service_management/events/
[4]: /fr/developers/service_checks/
[5]: https://docs.datadoghq.com/fr/logs/log_collection/agent_checks/
[6]: https://docs.datadoghq.com/fr/agent/guide/integration-management/?tab=linux#install
[7]: /fr/developers/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /fr/developers/integrations/build_integration/#create-a-listing
[9]: https://github.com/pypa/pipx
[10]: /fr/developers/integrations/python/
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
[23]: /fr/developers/integrations/?tab=integrations#out-of-the-box-integrations-vs-marketplace-offerings
[24]: https://datadoghq.dev/integrations-core/tutorials/logs/http-crawler/
[25]: /fr/tracing/trace_collection/