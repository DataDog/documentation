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

Cette page guide les partenaires technologiques dans la création d'une intégration basée sur l'Agent Datadog, que vous pouvez publier comme intégration prête à l'emploi sur la [page des intégrations][23] ou, moyennant paiement, sur la [page du Marketplace][24].

Une intégration basée sur l'Agent utilise l'[Agent Datadog][17] pour transmettre des données via des checks personnalisés écrits par les développeurs. Ces checks peuvent émettre des [métriques][34], des [événements][18] et des [service checks][25] dans le compte Datadog d'un client. Bien que l'Agent puisse également transmettre des [logs][26], cette configuration se fait en dehors du check.

## Quand utiliser une intégration basée sur l'Agent

Les intégrations basées sur l'Agent sont idéales pour collecter des données à partir de systèmes ou d'applications exécutés dans un :
- réseau local (LAN)
- Virtual Private Cloud (VPC)
Les intégrations basées sur l'Agent doivent être publiées et déployées sous forme de package Python au format wheel (.whl).


## Processus de développement

Le processus de création d'une intégration basée sur l'Agent est le suivant :

1. Rejoindre le réseau de partenaires Datadog
   - Faites une demande pour rejoindre le [réseau de partenaires Datadog][32]. Une fois la demande acceptée, un appel de présentation sera planifié avec l'équipe Technology Partner de Datadog.
2. Configurer votre environnement de développement
   - Demandez un compte sandbox Datadog via le portail du réseau de partenaires Datadog.
   - Installez les outils de développement nécessaires.
3. Créer votre intégration
   - Dans votre sandbox Datadog, accédez à **Developer Platform** > **add a new listing**.
   - Renseignez les informations décrivant votre intégration.
4. Créer votre check de l'Agent et tester votre intégration
   - Créez votre check de l'Agent en suivant [ces étapes](#ecrire-un-check-de-l-agent). 
4. Soumettre pour examen
   - Soumettez le contenu de votre intégration via la plateforme de développement.
   - Ouvrez une pull request GitHub contenant le code de votre check de l'Agent.
   - L'équipe Datadog planifiera une démonstration finale pour valider votre intégration.

## Prérequis

Les outils requis pour développer une intégration avec l'Agent Datadog incluent les éléments suivants :

- Python v3.12, [pipx][2], et l'outil de développement d'intégrations avec l'Agent (`ddev`). Pour obtenir des instructions d'installation, consultez la section [Installer l'outil de développement d'intégrations avec l'Agent][3].
- [Docker][4] pour exécuter l'ensemble de la suite de tests.
- La [ligne de commande git][5] ou le [client GitHub Desktop][19].

<div class="alert alert-info">Sélectionnez un onglet pour afficher les instructions de création d'une intégration basée sur l'Agent, à publier sur la page des intégrations ou sur la page du Marketplace.</div>

{{< tabs >}}
{{% tab "Build an out-of-the-box integration" %}}

Pour créer une intégration prête à l'emploi :

Créez un répertoire `dd` :

```shell
mkdir $HOME/dd && cd $HOME/dd
```

   Le kit de développement Datadog suppose que vous travaillez dans le répertoire `$HOME/dd/`. Ce n'est pas obligatoire, mais utiliser un autre répertoire nécessite des étapes de configuration supplémentaires.

1. Forkez le référentiel [`integrations-extras`][101].

1. Clonez votre fork dans le répertoire `dd`.
   ```shell
   git clone git@github.com:<YOUR USERNAME>/integrations-extras.git
   ```

1. Créez une branche de fonctionnalité pour y travailler :
   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## Configurer l'outil de développement

L'outil de développement d'intégrations avec l'Agent permet de créer l'ossature de votre intégration en générant les ressources et les métadonnées de la tuile. Pour consulter des instructions d'installation, consultez la section [Installer l'outil de développement d'intégrations avec l'Agent][102].

Pour configurer l'outil pour le référentiel `integrations-extras` :

1. Si votre référentiel `integrations-extras` se trouve ailleurs que dans `$HOME/dd/`, vous pouvez modifier le fichier de configuration de `ddev` en conséquence :
   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ```

1. Définissez `integrations-extras` comme référentiel de travail par défaut :
   ```shell
   ddev config set repo extras
   ```

[101]: https://github.com/Datadog/integrations-extras
[102]: https://docs.datadoghq.com/fr/developers/integrations/python

{{% /tab %}}

{{% tab "Build a Marketplace integration" %}}

Pour créer une intégration :

1. Consultez la section [Créer une offre pour le Marketplace][102] pour demander l'accès au [référentiel Marketplace][101].
1. Créez un répertoire `dd` :

   ```shell
   mkdir $HOME/dd```

   La commande du kit de développement Datadog s'attend à ce que vous travailliez dans le répertoire `$HOME/dd/`. Ce n'est pas obligatoire, mais travailler dans un répertoire différent nécessite de suivre d'autres étapes de configuration.

1. Une fois l'accès accordé au référentiel Marketplace, créez le répertoire `dd` et clonez le référentiel `marketplace` :

   ```shell
   git clone git@github.com:DataDog/marketplace.git```

1. Créez une branche de fonctionnalité pour y travailler :

   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master```

## Installer et configurer le kit de développement Datadog

L'outil de développement d'intégrations avec l'Agent permet de créer l'ossature de votre intégration en générant les ressources et les métadonnées de la tuile. Pour consulter des instructions d'installation, consultez la section [Installer l'outil de développement d'intégrations avec l'Agent][103].

Une fois l'outil installé, configurez-le pour le référentiel Marketplace.

1. Définissez `marketplace` comme référentiel de travail par défaut :

   ```shell

   ddev config set repos.marketplace $HOME/dd/marketplace
   ddev config set repo marketplace
   ```

1. Si vous avez utilisé un répertoire autre que `$HOME/dd` pour dupliquer le répertoire `marketplace`, utilisez la commande suivante pour définir votre référentiel de travail :

   ```shell

   ddev config set repos.marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/fr/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/fr/developers/integrations/python

{{% /tab %}}

{{< /tabs >}}

## Créer votre intégration

Après avoir téléchargé Docker, installé une version appropriée de Python et préparé votre environnement de développement, vous pouvez commencer à créer une intégration basée sur l'Agent.

Les instructions suivantes utilisent un exemple d'intégration appelé `Awesome`. Vous pouvez suivre l'exemple en vous appuyant sur le code de Awesome, ou remplacer Awesome par votre propre nom d'intégration dans les commandes. Par exemple, utilisez `ddev create <your-integration-name>` à la place de `ddev create Awesome` 

### Créer une architecture pour votre intégration

La commande `ddev create` exécute un outil interactif qui crée la structure de fichiers et de chemins générale (ou architecture) nécessaire pour toute intégration basée sur l'Agent.

1. Avant de créer le premier répertoire de votre intégration, effectuez un test d'exécution en appliquant le flag `-n/--dry-run` afin de ne rien écrire sur le disque :
   ```shell
   ddev create -n Awesome
   ```

   Cette commande affiche le chemin où les fichiers auraient été écrits, ainsi que la structure. Vérifiez que le chemin dans la première ligne de la sortie correspond à l'emplacement de votre référentiel.

1. Exécutez la commande sans le flag `-n`. L'outil vous demande de fournir un e-mail et un nom, avant de créer les fichiers dont vous avez besoin pour commencer à développer une intégration.

    <div class="alert alert-info">Si vous créez une intégration pour le Marketplace, assurez-vous que votre répertoire suit le format {nom du partenaire}_{nom de l integration}.</div>

   ```shell
   ddev create Awesome
   ```

## Écrire un check de l'Agent

Au cœur de chaque intégration basée sur l'Agent se trouve un *check de l'Agent* qui collecte régulièrement des informations et les envoie à Datadog.

Les [checks][30] héritent de la classe de base `AgentCheck` et doivent respecter les conditions suivantes :

- Les intégrations exécutées sur l'Agent Datadog v7 ou version ultérieure doivent être compatibles avec Python 3. Celles exécutées sur les Agents v5 et v6 utilisent toujours Python 2.7 
- Les checks doivent être dérivés de `AgentCheck`.
- Les checks doivent fournir une méthode avec la signature `check(self, instance)`.
- Les checks se présentent sous la forme de packages Python classiques stockés dans l'espace de nommage `datadog_checks`. Par exemple, le code pour Awesome se trouve dans le répertoire `awesome/datadog_checks/awesome/`.
- Le nom du package doit être le même que celui du check.
- Aucune restriction n'est appliquée quant au nom des modules Python dans ce package, ni quant au nom de la classe qui implémente le check.

### Implémenter la logique du check

Dans l'exemple Awesome, le check de l'Agent comprend un [check de service][25] appelé `awesome.search` qui recherche une chaîne de caractères sur une page web. Le résultat est `OK` si la chaîne est trouvée, `WARNING` si la page est accessible mais la chaîne absente, et `CRITICAL` si la page est inaccessible.

Pour apprendre à envoyer des métriques avec votre check de l'Agent, consultez la section [check custom d'Agent][7].

Le code contenu dans `awesome/datadog_checks/awesome/check.py` ressemble à ceci :

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

demandes d'importation

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

Pour en savoir plus sur la classe Python de base, consultez la section [Anatomie d’un check Python][8] (en anglais).

## Écrire des tests de validation

Il existe deux types de tests :

- [Les tests d'unités, qui permettent de tester une fonctionnalité spécifique.](#ecrire-un-test-d-unite)
- [Les tests d'intégration, qui exécutent la méthode `check` et vérifient la bonne collecte des métriques](#ecrire-un-test-d-integration)

[pytest][9] et [hatch][10] sont utilisés pour exécuter les tests. Des tests sont requis pour pouvoir publier votre intégration.

### Écrire un test d'unité

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

### Écrire un test d'intégration

Le [test d'unité ci-dessus](#ecrire-un-test-d-unite) ne teste pas la logique de collecte. Pour cela, vous devez [créer un environnement pour un test d'intégration](#creer-un-environnement-pour-le-test-d-integration) et [écrire un test d'intégration](#ajouter-un-test-d-integration).

#### Créer un environnement pour le test d'intégration

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
Votre intégration est presque terminée. Retournez dans la plateforme de développement de votre sandbox pour finaliser votre soumission. 

## Créer le wheel

Le fichier `pyproject.toml` fournit les métadonnées servant à compiler le package et créer le wheel. Le wheel contient tous les fichiers nécessaires au bon fonctionnement de l'intégration. Il s'agit notamment du check de l'Agent, de l'exemple de fichier de configuration et de certains artefacts générés durant la compilation du wheel.

Tous les éléments supplémentaires, comme les fichiers de métadonnées, ne sont pas destinés à être inclus dans la wheel. Ils sont utilisés ailleurs dans la plateforme Datadog et son écosystème.

Pour en savoir plus sur l'empaquetage Python, consultez la section [Compilation de projets Python][16].

Une fois votre fichier `pyproject.toml` prêt, créez une wheel en utilisant l'une des options suivantes :

- Avec l'outil `ddev` (conseillé) : `ddev release build <NOM_INTÉGRATION>`.
- Sans l'outil `ddev` : `cd <RÉPERTOIRE_INTÉGRATION> && pip wheel . --no-deps --wheel-dir dist`.

## Installer le wheel

La wheel s'installe à l'aide de la commande `integration` de l'Agent, disponible à partir de la [version 6.10.0 de l'Agent][17]. Selon votre environnement, vous devrez peut-être exécuter cette commande avec un utilisateur spécifique ou des privilèges particuliers :

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

Pour obtenir les commandes d'installation côté client, que ce soit dans un environnement host ou conteneur, consultez la documentation [sur les intégrations de la communauté et pour le Marketplace][35].

## Soumettre votre code pour relecture

Suivez les étapes décrites dans la plateforme de développement pour soumettre le code de votre check de l'Agent à une relecture sur GitHub. La pull request sera publiée avec votre intégration une fois approuvée.

## Mettre à jour votre intégration
* Si vous modifiez ou ajoutez du code d'intégration, une mise à jour de version est requise.

* Si vous modifiez ou ajoutez du contenu dans le fichier README, des informations dans le manifeste ou des ressources comme des dashboards ou des modèles de monitor, aucune mise à jour de version n'est nécessaire.

### Mettre à jour la version d'une intégration
En plus des modifications de code, les éléments suivants sont requis lors d'une mise à jour de version :
1. Mettre à jour le fichier `__about__.py` pour refléter le nouveau numéro de version. Ce fichier se trouve dans le répertoire de votre intégration sous `/datadog_checks/<your_check_name>/__about__.py`.
2. - Ajouter une entrée aux **notes de version** dans la plateforme de développement, en suivant le format requis :
   ```
   ## Version Number / Date in YYYY-MM-DD

   ***Added***:

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix

   ***Changed***:

   * Feature update
   * Feature update

   ***Removed***:

   * Feature removal
   * Feature removal
   ```
3. Mettre à jour toutes les occurrences du numéro de version mentionnées dans les instructions d'installation et ailleurs. Les instructions d'installation incluent souvent le numéro de version, qui doit donc être actualisé.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/#creating-your-own-solution
[2]: https://github.com/pypa/pipx
[3]: https://docs.datadoghq.com/fr/developers/integrations/python/
[4]: https://docs.docker.com/get-docker/
[5]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[6]: https://github.com/datadog/integrations-extras
[7]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count
[8]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[9]: https://docs.pytest.org/en/latest
[10]: https://github.com/pypa/hatch
[11]: https://datadoghq.dev/integrations-core/meta/config-specs/
[12]: /fr/developers/integrations/check_references/#configuration-file
[13]: /fr/developers/integrations/check_references/#manifest-file
[14]: /fr/developers/integrations/check_references/#metrics-metadata-file
[15]: /fr/developers/integrations/check_references/#service-check-file
[16]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[17]: https://docs.datadoghq.com/fr/agent/
[18]: https://docs.datadoghq.com/fr/service_management/events/
[19]: https://desktop.github.com/
[20]: https://docs.datadoghq.com/fr/developers/integrations/
[21]: https://github.com/Datadog/integrations-extras
[22]: https://github.com/Datadog/marketplace
[23]: https://app.datadoghq.com/integrations
[24]: https://app.datadoghq.com/marketplace
[25]: https://docs.datadoghq.com/fr/developers/service_checks/
[26]: https://docs.datadoghq.com/fr/logs/
[27]: https://docs.datadoghq.com/fr/monitors/
[28]: https://docs.datadoghq.com/fr/dashboards/
[29]: https://docs.datadoghq.com/fr/logs/log_configuration/pipelines/
[30]: https://docs.datadoghq.com/fr/glossary/#check
[31]: https://docs.datadoghq.com/fr/developers/integrations/
[32]: https://partners.datadoghq.com/
[33]: https://docs.datadoghq.com/fr/developers/integrations/check_references/
[34]: https://docs.datadoghq.com/fr/metrics/
[35]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/