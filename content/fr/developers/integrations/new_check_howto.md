---
aliases:
- /fr/developers/integrations/integration_sdk/
- /fr/developers/integrations/testing/
- /fr/integrations/datadog_checks_dev/
- /fr/guides/new_integration/
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/new_check_howto.md
kind: documentation
title: Créer une intégration pour l'Agent
---
## Présentation

Ce guide explique comment créer une intégration pour l'Agent Datadog via le référentiel `integrations-extras`. Pour comprendre l'intérêt de créer une intégration basée sur l'Agent, consultez la section [Créer votre propre solution][1].

## Configuration
### Prérequis

Pour développer une intégration basée sur l'Agent Datadog, vous aurez besoin des outils suivantes :

- Python v3.8 ou version ultérieure
- [Docker][2] pour exécuter la collection de tests

De nombreux systèmes d'exploitation intègrent une version préinstallée de Python. Toutefois, la version installée par défaut de Python peut être plus ancienne que celle utilisée dans l'Agent, auquel cas une partie des outils ou dépendances requis risquent de ne pas être présents. Pour vous assurer que vous disposez de tout ce dont vous avez besoin pour faire fonctionner une intégration, installez un interpréteur Python dédié.

Voici quelques options pour installer Python :

- Se référer à la [documentation officielle de Python][3] (en anglais) pour télécharger et installer l'interpréteur Python.
- Utiliser un gestionnaire de version Python comme [pyenv][4].

À partir de la version 3.3, Python intègre un gestionnaire de version appelé `venv`, que nous utiliserons dans ces instructions. Les installations Debian ou Ubuntu n'incluent pas le gestionnaire `venv`. Pour installer le package `venv`, exécutez `sudo apt-get install python3-venv`.

## Préparer votre environnement de développement

Suivez ces instructions pour configurer votre environnement de développement :

1. Créez le répertoire `dd` et clonez le [référentiel `integrations-extras`][5].

   Le kit de développement Datadog s'attend à ce que vous travailliez dans le répertoire `$HOME/dd/`. Ce n'est pas obligatoire, mais travailler dans un répertoire différent nécessite de suivre d'autres étapes de configuration.

   Pour créer le répertoire `dd` et cloner le référentiel `integrations-extras` :
   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   git clone https://github.com/DataDog/integrations-extras.git
   ```

1. Si vous le souhaitez, configurez un [environnement virtuel Python][6] pour isoler votre environnement de développement :

   ```shell
   cd $HOME/dd/integrations-extras
   python3 -m venv venv
   . venv/bin/activate
   ```

   **Conseil** : pour quitter l'environnement virtuel, exécutez `deactivate`.

1. Vérifiez que le package `wheel` Python est installé et à jour :

   ```shell
   pip3 install wheel
   ```

1. Installez le [kit de développement][7] :

   ```bash
   pip3 install "datadog-checks-dev[cli]"
   ```

1. Si vous avez choisi de cloner `integrations-extras` à un emplacement autre que `$HOME/dd/`, vous devez modifier le fichier de configuration :

   ```shell
   ddev config set extras "/path/to/integrations-extras"
   ```

1. Définissez `integrations-extras` comme référentiel de travail par défaut :

   ```shell
   ddev config set repo extras
   ```

## Créer votre intégration

Après avoir téléchargé Docker, installé une version appropriée de Python et préparé votre environnement de développement, vous pouvez commencer à créer une intégration basée sur l'Agent. Dans les instructions ci-dessous, nous utilisons une intégration appelée `Awesome`. Suivez les étapes en utilisant le code de l'exemple ou remplacez Awesome par votre propre code.

### Créer une architecture pour votre intégration

La commande `ddev create` exécute un outil interactif qui crée la structure de fichiers et de chemins générale (ou « architecture ») nécessaire pour toute nouvelle intégration basée sur l'Agent.

1. Avant de créer le premier répertoire de votre intégration, effectuez un test d'exécution en appliquant le flag `-n/--dry-run` afin de ne rien écrire sur le disque :

   ```bash
   ddev create -n Awesome
   ```

   Cette commande affiche le chemin où les fichiers auraient été écrits, ainsi que la structure. Vérifiez que le chemin dans la première ligne de la sortie correspond à l'emplacement de votre référentiel `integrations-extras`

1. Exécutez la commande sans le flag `-n`. L'outil vous demande de fournir un e-mail et un nom, avant de créer les fichiers dont vous avez besoin pour commencer à développer une intégration.

   ```shell
   ddev create Awesome
   ```

## Écrire un check de l'Agent

Chaque intégration basée sur l'Agent repose sur un *check*. Celui-ci recueille périodiquement des informations et les transmet à Datadog. Les checks suivent la logique de la classe de base `AgentCheck` et doivent répondre aux exigences suivantes :

- Les intégrations exécutées sur l'Agent Datadog v7 et les versions ultérieures doivent être compatibles avec Python 3. Toutefois, les versions 5 et 6 de l’Agent utilisent toujours Python 2.7.
- Les checks doivent être dérivés de `AgentCheck`.
- Les checks doivent fournir une méthode avec la signature `check(self, instance)`.
- Les checks se présentent sous la forme de packages Python classiques stockés dans l'espace de nommage `datadog_checks`. Par exemple, le code pour Awesome se trouve dans le répertoire `awesome/datadog_checks/awesome/`.
- Le nom du package doit être le même que celui du check.
- Aucune restriction n'est appliquée quant au nom des modules Python dans ce package, ni quant au nom de la classe qui implémente le check.

### Implémenter la logique du check

Pour Awesome, le check de l'Agent comprend un check de service nommé `awesome.search`. Ce dernier permet de rechercher une chaîne sur une page Web. Si la chaîne est présente, le check renvoie `OK`. Si la page est accessible mais qu'aucune chaîne n'a été trouvée, le check renvoie `WARNING`. Enfin, si la page est inaccessible, le check renvoie `CRITICAL`. Pour découvrir comment envoyer des métriques avec votre check d'Agent, consultez la rubrique [Check custom d'Agent][8].

Le code contenu dans `awesome/datadog_checks/awesome/check.py` ressemble à ceci :

{{< code-block lang="python" filename="check.py" collapsible="true" >}}
import requests

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck) :
    """AwesomeCheck est dérivé d'AgentCheck et fournit la méthode de check requise."""

    def check(self, instance):
        url = instance.get('url')
        search_string = instance.get('search_string')

        # Il convient de réaliser quelques contrôles d'intégrité basiques.
        # Soyez aussi précis que possible avec les exceptions.
        if not url or not search_string:
            raise ConfigurationError('Configuration error, please fix awesome.yaml')

        try:
            response = requests.get(url)
            response.raise_for_status()
        # En cas de problème sérieux
        except Exception as e:
            # Un message plus spécifique serait préférable.
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
        # La page est accessible
        else:
            # La chaîne recherchée est présente
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
            # La chaîne recherchée est introuvable
            else:
                self.service_check('awesome.search', self.WARNING)
{{< /code-block >}}

Pour en savoir plus sur la classe Python de base, consultez la section [Anatomie d’un check Python][9] (en anglais).

## Écrire des tests de validation

Il existe deux grandes types de tests :

- [Les tests d'unités, qui permettent de tester une fonctionnalité spécifique.](#ecrire-un-test-d-unite)
- [Les tests d'intégration, qui exécutent la méthode `check` et vérifient la bonne collecte des métriques.](#ecrire-un-test-d-integration)

[pytest][10] et [hatch][11] sont utilisés pour exécuter les tests. Les tests sont obligatoires si vous souhaitez que votre intégration soit ajoutée au référentiel `integrations-extras`.

### Écrire un test d'unité

La première partie de la méthode `check` pour Awesome récupère et vérifie deux éléments du fichier de configuration. Un test d'unité serait donc particulièrement utile. Ouvrez le fichier `awesome/tests/test_awesome.py` et remplacez son contenu par celui-ci :

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

L'architecture est configurée de façon à ce que tous les tests situés dans `awesome/tests` soient exécutés.

Pour lancer les tests, exécutez :

```bash
ddev test awesome
```

### Écrire un test d'intégration

Le [test d'unité ci-dessus](#ecrire-un-test-d-unite) ne vérifie pas la logique de collecte. Pour tester la logique, vous devez créer un environnement pour un test d'intégration et écrire un test d'intégration.

#### Créer un environnement pour le test d'intégration

Le kit utilise `docker` pour lancer un conteneur Nginx et permet au check de récupérer la page d'accueil.

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

```bash
ddev test -m integration awesome
```

Votre intégration est presque terminée. Ajoutez ensuite les ressources du check requises.

## Créer les ressources du check

Pour qu'un check puisse être inclus dans `integrations-extras`, les différentes ressources créées par l'architecture `ddev` doivent être complètes :

Agent`README.md`
: Ce fichier contient la documentation de votre check d'Agent. Il explique sa configuration, les données qu'il recueille et les informations de support.

`spec.yaml`
: Ce fichier permet de générer le `conf.yaml.example` à l'aide de l'outil `ddev` (consultez l'onglet  **Modèle de configuration** ci-dessous). Pour en savoir plus, consultez la section [Spécification de la configuration][12] (en anglais).

`conf.yaml.example`
: Ce fichier contient les options de configuration par défaut (ou des exemples) pour votre check d'Agent. **Ne modifiez surtout pas ce fichier manuellement !** Il est généré à partir du contenu du fichier `spec.yaml`. Pour en savoir plus, consultez les [références relatives au fichier de configuration][13].

`manifest.json`
: Ce fichier contient les métadonnées de votre check d'Agent, telles que le titre et les catégories. Pour en savoir plus, consultez les [références relatives au fichier de manifeste][14].

`metadata.csv`
: Ce fichier contient la liste de toutes les métriques recueillies par votre check d'Agent. Pour en savoir plus, consultez les [références relatives au fichier metadata des métriques][15].

`service_check.json`
: Ce fichier contient la liste de tous les checks de service recueillis par votre check d'Agent. Pour en savoir plus, consultez les [références relatives au fichier service_check][16] .

{{< tabs >}}
{{% tab "Modèle de configuration " %}}

Dans cet exemple, le fichier `awesome/assets/configuration/spec.yaml` utilisé pour générer `awesome/datadog_checks/awesome/data/conf.yaml.example` ressemble à ce qui suit :

```yaml
name: Awesome
files:
- name: awesome.yaml
  options:
  - template: init_config
    options:
    - template: init_config/default
  - template: instances
    options:
    - name: url
      required: true
      description: The URL to check.
      value:
        type: string
        example: http://example.org
    - name: search_string
      required: true
      description: The string to search for.
      value:
        type: string
        example: Example Domain
    - name: flag_follow_redirects
      # required: false est implicite, mettez-le en commentaire pour voir ce qui se passe !
      required: false
      description: Follow 301 redirects.
      value:
        type: boolean
        example: false
    # Essayez d'intervertir ces modèles pour voir ce qui se passe !
    #- template: instances/http
    - template: instances/default
```

Pour générer le fichier `conf.yaml.example` à l'aide de `ddev`, exécutez :

```bash
ddev validate config --sync awesome
```

{{% /tab %}}
{{% tab "Manifeste" %}}

Dans cet exemple, le fichier `awesome/manifest.json` pour le check de service Awesome ressemble à ce qui suit :

```json
{
  "manifest_version": "2.0.0",
  "app_uuid": "79eb6e54-2110-4d50-86c3-f7037d1a9daa", // Ne pas utiliser cet exemple d'UUID. Les UUID doivent être uniques et valides.
  "app_id": "awesome",
  "classifier_tags": [
    "Supported OS::Linux",
    "Supported OS::Mac OS",
    "Supported OS::Windows"
  ],
  "display_on_public_website": false,
  "tile": {
    "overview": "README.md#Overview",
    "configuration": "README.md#Setup",
    "support": "README.md#Support",
    "changelog": "CHANGELOG.md",
    "description": "",
    "title": "Awesome",
    "media": []
  },
  "author": {
    "support_email": "email@example.org"
  },
  "oauth": {},
  "assets": {
    "integration": {
      "source_type_name": "Awesome",
      "configuration": {
        "spec": "assets/configuration/spec.yaml"
      },
      "events": {
        "creates_events": false
      },
      "metrics": {
        "prefix": "awesome.",
        "check": "",
        "metadata_path": "metadata.csv"
      },
      "service_checks": {
        "metadata_path": "assets/service_checks.json"
      }
    }
  }
}
```

{{% /tab %}}
{{% tab "Métadonnées" %}}

Dans cet exemple, l'intégration Awesome ne fournit aucune métrique. Le fichier `awesome/metadata.csv` généré contient donc uniquement une ligne avec les noms de colonne.

{{% /tab %}}
{{% tab "Check de service" %}}

Dans cet exemple, l'intégration Awesome contient un check de service. Vous devez donc l'ajouter au fichier `awesome/assets/service_checks.json` :

```json
[
  {
    "agent_version": "6.0.0",
    "integration": "awesome",
    "check": "awesome.search",
    "statuses": ["ok", "warning", "critical"],
    "groups": [],
    "name": "Recherche Awesome",
    "description": "Renvoie `CRITICAL` si le check n'accède pas à la page, `WARNING` si la chaîne de recherche n'a pas été trouvée ou `OK` pour les autres cas."
  }
]
```

{{% /tab %}}
{{< /tabs >}}

## Créer le wheel

Le fichier `pyproject.toml` fournit les métadonnées servant à compiler le package et créer le wheel. Le wheel contient tous les fichiers nécessaires au bon fonctionnement de l'intégration. Il s'agit notamment du check, de l'exemple de fichier de configuration et de certains artefacts générés durant la compilation du wheel.

Tous les autres éléments, y compris les fichiers de métadonnées, ne sont pas supposés se trouver dans le wheel. Ils sont utilisés ailleurs par l'écosystème et la plateforme Datadog. Pour en savoir plus sur les packages Python, consultez la section [Compilation de projets Python][17].

Une fois votre fichier `pyproject.toml` prêt, créez un wheel :

- Avec l'outil `ddev` (conseillé) : `ddev release build <NOM_INTÉGRATION>`.
- Sans l'outil `ddev` : `cd <RÉPERTOIRE_INTÉGRATION> && pip wheel . --no-deps --wheel-dir dist`.

## Installer le wheel

Le wheel est installé à l'aide de la commande `integration` de l'Agent, disponible dans les [versions 6.10.0 et ultérieures de l'Agent][18]. En fonction de votre environnement, il est possible que vous deviez utiliser un utilisateur spécifique ou certaines autorisations précises pour exécuter cette commande :

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

## Passer en revue la liste de contrôle pour la publication d'une intégration

Après avoir créé votre intégration basée sur l'Agent, consultez cette liste pour vous assurer que votre intégration contient tous les fichiers et validations requis :

- Le fichier `README.md` doit être au bon format et inclure le contenu adéquat.
- Une batterie de tests doit être effectuée afin de vérifier la bonne collecte de métriques.
- Le fichier `metadata.csv` doit énumérer toutes les métriques recueillies.
- Le fichier `manifest.json` doit être complet.
- Si l'intégration recueille des checks de service, le fichier `service_checks.json` doit également être présent.

Après avoir fait une pull request dans le référentiel `integrations-extras`, les tests de validation CI s'exécutent. Ces tests doivent être verts pour que votre pull request soit mergée et que votre carré d'intégration soit publié.



Documentation, liens et articles supplémentaires utiles :

- [Gérer les intégrations via des appels d'API][19]

[1]: https://docs.datadoghq.com/fr/developers/#creating-your-own-solution
[2]: https://docs.docker.com/get-docker/
[3]: https://wiki.python.org/moin/BeginnersGuide/Download
[4]: https://github.com/pyenv/pyenv
[5]: https://github.com/DataDog/integrations-extras
[6]: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
[7]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[8]: https://docs.datadoghq.com/fr/developers/metrics/agent_metrics_submission/
[9]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[10]: https://docs.pytest.org/en/latest
[11]: https://github.com/pypa/hatch
[12]: https://datadoghq.dev/integrations-core/meta/config-specs/
[13]: https://docs.datadoghq.com/fr/developers/integrations/check_references/#configuration-file
[14]: https://docs.datadoghq.com/fr/developers/integrations/check_references/#manifest-file
[15]: https://docs.datadoghq.com/fr/developers/integrations/check_references/#metrics-metadata-file
[16]: https://docs.datadoghq.com/fr/developers/integrations/check_references/#service-check-file
[17]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[18]: https://docs.datadoghq.com/fr/agent/
[19]: https://www.datadoghq.com/blog/programmatically-manage-your-datadog-integrations/