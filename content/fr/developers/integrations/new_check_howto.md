---
title: Créer une intégration
kind: documentation
aliases:
  - /fr/developers/integrations/integration_sdk/
  - /fr/developers/integrations/testing/
  - /fr/integrations/datadog_checks_dev/
  - /fr/guides/new_integration/
---
Pour qu'une intégration basée sur l'Agent soit considérée comme complète, et donc prête à être incluse dans le référentiel principal et intégrée au paquet de l'Agent, un certain nombre d'exigences doivent être satisfaites :

- Le fichier `README.md` doit être au bon format et inclure le contenu adéquat.
- Une batterie de tests doit être effectuée afin de vérifier la bonne collecte de métriques.
- Le fichier `metadata.csv` doit énumérer toutes les métriques recueillies.
- Le fichier `manifest.json` doit être complet.
- Si l'intégration recueille des checks de service, le fichier `service_checks.json` doit également être présent.

Ces exigences forment une checklist de vérification qui est passée en revue durant le processus d'examen du code. Cette documentation vous expliquera comment satisfaire ces exigences et implémenter correctement votre nouvelle intégration.

## Prérequis

- Python 3.8+ doit être disponible sur votre système. Python 2.7 est facultatif, mais conseillé.
- Docker pour exécuter l'ensemble des tests.

Si la création et l'activation d'[environnements virtuels Python][1] est généralement conseillé pour isoler l'environnement de développement, ce n'est toutefois pas obligatoire. Pour en savoir plus, consultez la [documentation sur l'environnement Python][2].

## Configuration

Clonez le [référentiel integrations-extras][3]. Par défaut, ces outils s'attendent à ce que vous travailliez dans le répertoire `$HOME/dd/`. Ce n'est toutefois pas obligatoire, et vous aurez la possibilité de modifier ce paramètre ultérieurement.

```shell
mkdir $HOME/dd && cd $HOME/dd       # facultatif
git clone https://github.com/DataDog/integrations-extras.git
```

### Kit de développement

Le [kit de développement][4] est complet et intègre de nombreuses fonctionnalités. Pour démarrer, exécutez cette commande :

```bash
pip3 install "datadog-checks-dev[cli]"
```

Si vous avez choisi de cloner ce référentiel à un emplacement autre que `$HOME/dd/`, vous devrez modifier le fichier de configuration :

```bash
ddev config set extras "/chemin/vers/integrations-extras"
```

Si vous prévoyez de travailler principalement sur `integrations-extras`, définissez-le comme référentiel de travail par défaut :

```bash
ddev config set repo extras
```

**Remarque** : si vous sautez cette étape, vous devrez utiliser l'option `-e` à chaque appel pour vérifier que le contexte est `integrations-extras` :

```bash
ddev -e COMMANDE [OPTIONS]
```

## Architecture

L'une des fonctionnalités du kit de développement est la commande `create`, qui crée la structure de fichiers et de chemins générale (c'est-à-dire l'« architecture ») nécessaire pour toute nouvelle intégration.

### Test d'exécution

Pour effectuer un test d'exécution, utilisez le flag `-n/--dry-run`, qui n'effectue aucune écriture sur le disque.

```bash
ddev create -n Awesome
```

Cette commande affiche le chemin où les fichiers auraient été écrits, ainsi que la structure. Pour le moment, contentez-vous de vérifier que le chemin dans la _première ligne_ de la sortie correspond à l'emplacement de votre référentiel Extras.

### Mode interactif

Le mode interactif est un assistant conçu pour vous aider à créer des intégrations. Il suffit de répondre à quelques questions pour que l'architecture soit automatiquement définie et préconfigurée.

```bash
ddev create Awesome
```

Après avoir répondu aux questions, la sortie correspond à celle du test d'exécution ci-dessus, à la différence près que l'architecture de votre nouvelle intégration existe vraiment.

## Écrire le check

### Introduction

Un Check est une classe Python qui doit :

- Les intégrations qui s'exécutent via l'Agent 7+ doivent être compatibles avec Python 3. À l'inverse, les versions 5 et 6 de l'Agent utilisent toujours Python 2.7.
- Être dérivée de `AgentCheck`
- Fournir une méthode avec la signature `check(self, instance)`

Les checks se présentent sous la forme de paquets Python classiques stockés dans l'espace de nommage `datadog_checks` ; votre code résidera donc dans `awesome/datadog_checks/awesome`. La seule exigence est que le nom du paquet soit le même que le nom du check. Aucune restriction particulière n'est appliquée quant au nom des modules Python dans ce paquet, ni quant au nom de la classe qui implémente le check.

### Implémenter la logique du check

Supposons que vous souhaitez créer un check d'Agent composé uniquement d'un check de service appelé `awesome.search` qui recherche une chaîne sur une page Web. Il renverra `OK` si la chaîne est présente, `WARNING` si la page est accessible mais que la chaîne est absente, et `CRITICAL` si la page est inaccessible. Consultez la section [Envoi de métriques : check custom d'Agent][5] pour découvrir comment envoyer des métriques à l'aide de votre check d'Agent.

Le code contenu dans `awesome/datadog_checks/awesome/check.py` ressemble à ceci :

```python
import requests

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck):
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
            # Un message plus spécifique serait préférable
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
        # La page est accessible
        else:
            # search_string est présent
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
            # search_string est introuvable
            else:
                self.service_check('awesome.search', self.WARNING)
```

Pour en savoir plus sur la classe Python de base, consultez la [documentation sur l'API Python][6] (en anglais).

### Écrire des tests

Il existe deux types de tests de base :

- Les tests d'unités, qui permettent de tester une fonctionnalité spécifique
- Les tests d'intégration, qui exécutent la méthode `check` et vérifient la bonne collecte des métriques 

Les tests sont _obligatoires_ si vous souhaitez que votre intégration soit ajoutée à `integrations-extras`. Notez que [pytest][7] et [tox][8] sont utilisés pour exécuter les tests.

Pour en savoir plus, consultez la [documentation sur le développement de checks Datadog][9].

#### Test d'unité

La première partie de la méthode `check` récupère et vérifie deux éléments du fichier de configuration. Un test d'unité serait donc particulièrement utile. Ouvrez le fichier `awesome/tests/test_awesome.py` et remplacez son contenu pour qu'il ressemble à ceci :

```python
import pytest

# N'oubliez pas d'importer votre intégration !
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
```

`pytest` permet d'utiliser ce que l'on appelle des _marqueurs_, qui servent à regrouper les tests par catégorie. Notez que  le marqueur `unit` a été appliqué à `test_config`.

L'architecture a déjà été configurée de façon à ce que tous les tests situés dans `awesome/tests` soient exécutés. Pour exécuter ces tests :

```bash
ddev test awesome
```

#### Créer un test d'intégration

Ce test d'unité ne vérifie pas la _logique_ de collecte ; nous allons donc ajouter un test d'intégration. `docker` est utilisé pour lancer un conteneur Nginx et laisser le check récupérer la page d'accueil. Créez un fichier compose `awesome/tests/docker-compose.yml` avec le contenu suivant :

```yaml
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"
```

Ouvrez ensuite le fichier `awesome/tests/conftest.py` et remplacez le contenu de cette manière :

```python
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
```

#### Test d'intégration

Enfin, ajoutez un test d'intégration au fichier `awesome/tests/test_awesome.py` :

```python
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
```

Pour un développement plus rapide, lancez les tests d'intégration uniquement avec l'option `-m/--marker` :

```bash
ddev test -m integration awesome
```

Le check est quasiment fini. Apportons la touche finale en ajoutant les configurations d'intégration.

### Créer les ressources du check

Pour qu'un check puisse être inclus, l'ensemble des ressources créées par l'architecture ddev doit être complet :

- **`README.md`** : ce fichier contient la documentation de votre check. Il explique sa configuration, les données qu'il recueille, etc.
- **`spec.yaml`** : ce fichier permet de générer un `conf.yaml.example` à l'aide de l'outil `ddev` (consultez l'onglet « Modèle de configuration » ci-dessous). [Pour en savoir plus, consultez la documentation sur les spécifications de configuration][16].
- **`conf.yaml.example`** : ce fichier contient les options de configuration par défaut (ou des exemples) pour votre check d'Agent. Ne modifiez pas ce fichier manuellement ! Il est généré à partir du contenu du fichier `spec.yaml`. [Consultez la documentation relative aux fichiers de configuration pour mieux comprendre sa logique.][10]
- **`manifest.json`** : ce fichier contient les métadonnées de votre check d'Agent, telles que le titre, les catégories, etc. [Consultez la documentation relative aux manifestes pour en savoir plus.][11]
- **`metadata.csv`** : ce fichier contient la liste de toutes les métriques recueillies par votre check d'Agent. [Consultez la documentation relative aux métadonnées des métriques pour en savoir plus.][12]
- **`service_check.json`** : ce fichier contient la liste de tous les checks de service recueillis par votre check d'Agent. [Consultez la documentation relative aux checks de service pour en savoir plus.][13]

Dans cet exemple, ces fichiers ressembleraient à ce qui suit :

{{< tabs >}}
{{% tab "Modèle de configuration " %}}

Le fichier `awesome/assets/configuration/spec.yaml` utilisé pour générer `awesome/datadog_checks/awesome/data/conf.yaml.example` :

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
      # required: false est implicite ; mettez-le en commentaire pour voir ce qui se passe !
      required: false
      description: Follow 301 redirects.
      value:
        type: boolean
        example: false
    # Essayez de supprimer la mise en commentaire de ce modèle pour voir ce qui se passe !
    #- template: instances/default
```

Générez le fichier `conf.yaml.example` à l'aide de `ddev` :

```bash
ddev validate config --sync awesome
```

{{% /tab %}}
{{% tab "Manifeste" %}}

Le fichier `awesome/manifest.json` pour le check de service Awesome. Notez que le `guid` doit être unique (et valide). N'utilisez donc _pas_ celui de cet exemple. Cet identifiant sera de toute façon automatiquement géré :

```json
{
  "display_name": "awesome",
  "maintainer": "email@example.org",
  "manifest_version": "1.0.0",
  "name": "awesome",
  "metric_prefix": "awesome.",
  "metric_to_check": "",
  "creates_events": false,
  "short_description": "",
  "guid": "x16b8750-df1e-46c0-839a-2056461b604x",
  "support": "contrib",
  "supported_os": ["linux", "mac_os", "windows"],
  "public_title": "Intégration Datadog/Awesome",
  "categories": ["web"],
  "type": "check",
  "is_public": false,
  "integration_id": "awesome",
  "assets": {
    "dashboards": {
      "Awesome Overview": "assets/dashboards/overview.json",
      "Awesome Investigation Dashboard": "assets/dashboards/investigation.json"
    },
    "monitors": {},
    "service_checks": "assets/service_checks.json"
  }
}
```

{{% /tab %}}
{{% tab "Métadonnées" %}}

L'exemple d'intégration n'envoie aucune métrique. Le fichier `awesome/metadata.csv` généré contient donc uniquement la ligne avec  les noms de colonne CSV.

{{% /tab %}}
{{% tab "Check de service" %}}

L'exemple d'intégration contient un check de service. Vous devez donc l'ajouter au fichier `awesome/assets/service_checks.json` :

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

## Compilation

`setup.py` contient le script de configuration setuptools, qui facilite la compilation d'un paquet au format wheel. Pour en savoir plus sur les paquets Python, consultez la [documentation Python officielle][14] (en anglais).

Une fois votre fichier `setup.py` prêt, créez un wheel :

- Avec l'outil `ddev` (conseillé) : `ddev release build <NOM_INTÉGRATION>`
- Sans l'outil `ddev` : `cd <RÉPERTOIRE_INTÉGRATION> && python setup.py bdist_wheel`

### Que contient le wheel ?

Le wheel contient tous les fichiers nécessaires au bon fonctionnement de l'intégration. Il s'agit notamment du check, de l'exemple de fichier de configuration et de certains artefacts générés durant la compilation du wheel. Tous les autres éléments, y compris les fichiers de métadonnées, ne sont _pas_ supposés se trouver dans le wheel. Ces éléments sont utilisés ailleurs par l'écosystème et la plateforme Datadog.

## Installation

Le wheel est installé via la commande `integration` de l'Agent, disponible dans les [versions 6.10.0 et ultérieures de l'Agent][15]. En fonction de votre environnement, il est possible que vous deviez utiliser un utilisateur spécifique ou certaines autorisations précises pour exécuter cette commande :

**Linux** (en tant que `dd-agent`) :

```bash
sudo -u dd-agent datadog-agent integration install -w /chemin/vers/wheel.whl
```

**OSX** (en tant qu'admin) :

```bash
sudo datadog-agent integration install -w /chemin/vers/wheel.whl
```

**Windows** (veillez à ce que votre session shell dispose des privilèges _administrateur_) :

Pour les versions <= 6.11 de l'Agent :

```ps
"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /chemin/vers/wheel.whl
```

Pour les versions >= 6.12 de l'Agent :

```ps
"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /chemin/vers/wheel.whl
```

[1]: https://virtualenv.pypa.io/en/stable
[2]: /fr/developers/integrations/python
[3]: https://github.com/DataDog/integrations-extras
[4]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[5]: https://docs.datadoghq.com/fr/metrics/agent_metrics_submission/
[6]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[7]: https://docs.pytest.org/en/latest
[8]: https://tox.readthedocs.io/en/latest
[9]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev#development
[10]: /fr/developers/integrations/check_references#configuration-file
[11]: /fr/developers/integrations/check_references#manifest-file
[12]: /fr/developers/integrations/check_references#metrics-metadata-file
[13]: /fr/developers/integrations/check_references#service-check-file
[14]: https://packaging.python.org/tutorials/distributing-packages
[15]: https://docs.datadoghq.com/fr/agent/
[16]: https://datadoghq.dev/integrations-core/meta/config-specs/