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

* Un fichier `README.md` au bon format
* Une batterie de tests vérifiant la bonne collecte de métriques
* Un ensemble d'images destinées au carré de l'intégration dans l'interface
* Un fichier `metadata.csv` énumérant toutes les métriques recueillies
* Un fichier `manifest.json` complet
* Si l'intégration recueille des checks de service, le fichier `service_checks.json` doit également être présent.

Ces exigences forment une checklist de vérification qui est passée en revue durant le processus d'examen du code. Cette documentation vous expliquera comment satisfaire ces exigences et implémenter correctement votre nouvelle intégration.

## Prérequis

* Python 3.7+ doit être disponible sur votre système. Python 2.7 est facultatif, mais conseillé.
* Docker pour exécuter l'ensemble des tests.

Si la création et l'activation d'[environnements virtuels Python][1] est généralement conseillé pour isoler l'environnement de développement, ce n'est toutefois pas obligatoire. Pour en savoir plus, consultez la [documentation sur l'environnement Python][2].

## Implémentation

Clonez le [référentiel integrations-extras][3]. Par défaut, ces outils s'attendent à ce que vous travailliez dans le répertoire `$HOME/dd/`. Ce n'est toutefois pas obligatoire, et vous aurez la possibilité de modifier ce paramètre ultérieurement.

```shell
mkdir $HOME/dd && cd $HOME/dd       # facultatif
git clone https://github.com/DataDog/integrations-extras.git
```

### Kit de développement

Le [kit de développement][4] est complet et intègre de nombreuses fonctionnalités. Pour démarrer, exécutez cette commande :

```
pip install "datadog-checks-dev[cli]"
```

Si vous avez choisi de cloner ce référentiel à un emplacement autre que `$HOME/dd/`, vous devrez modifier le fichier de configuration :

```
ddev config set extras "/chemin/vers/integrations-extras"
```

Si vous prévoyez de travailler principalement sur `integrations-extras`, définissez-le comme référentiel de travail par défaut :

```
ddev config set repo extras
```

**Remarque** : si vous sautez cette étape, vous devrez utiliser l'option `-e` à chaque appel pour vérifier que le contexte est `integrations-extras` :

```
ddev -e COMMANDE [OPTIONS]
```

## Architecture

L'une des fonctionnalités du kit de développement est la commande `create`, qui crée la structure de fichiers et de chemins générale (c'est-à-dire l'« architecture ») nécessaire pour toute nouvelle intégration.

### Test d'exécution

Faisons un essai avec le flag `-n/--dry-run`, qui n'effectue aucune écriture sur le disque.

```
ddev create -n awesome
```

Cette commande affiche le chemin où les fichiers auraient été écrits, ainsi que la structure. Pour le moment, contentez-vous de vérifier que le chemin dans la *première ligne* de la sortie correspond à l'emplacement de votre référentiel Extras.

### Mode interactif

Le mode interactif est un assistant conçu pour vous aider à créer des intégrations. Il suffit de répondre à quelques questions pour que l'architecture soit automatiquement définie et préconfigurée.

```
ddev create awesome
```

Après avoir répondu aux questions, la sortie correspondra à celle du test d'exécution ci-dessus, à la différence près que l'architecture de votre nouvelle intégration existera vraiment.

## Écrire le check

### Introduction

Un Check est une classe Python qui doit :

* Être dérivée de `AgentCheck`
* Fournir une méthode avec la signature `check(self, instance)`

Les checks se présentent sous la forme de paquets Python classiques stockés dans l'espace de nommage `datadog_checks` ; votre code résidera donc dans `awesome/datadog_checks/awesome`. La seule exigence est que le nom du paquet soit le même que le nom du check. Aucune restriction particulière n'est appliquée quant au nom des modules Python dans ce paquet, ni quant au nom de la classe qui implémente le check.

### Implémenter la logique du check

Supposons que vous souhaitez créer un check de service appelé `awesome.search` qui recherche une chaîne sur une page Web. Il renverra `OK` si la chaîne est présente, `WARNING` si la page est accessible mais que la chaîne est absente, et `CRITICAL` si la page est inaccessible.

Le code contenu dans `awesome/datadog_checks/awesome/awesome.py` ressemblerait à ceci :

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

Pour en savoir plus sur la classe Python de base, consultez la [documentation sur l'API Python][5].

### Écrire des tests

Il existe deux grands types de tests : les tests d'unité, qui permettent de tester une fonctionnalité spécifique, et les tests d'intégration, qui exécutent la méthode `check` et vérifient la bonne collecte des métriques. Les tests sont _obligatoires_ si vous souhaitez que votre intégration soit ajoutée à `integrations-extras`. Notez que [pytest][6] et [tox][7] sont utilisés pour exécuter les tests.

Pour en savoir plus, consultez la [documentation sur le développement de checks Datadog][8].

#### Test d'unité

La première partie de la méthode `check` récupère et vérifie deux informations dont nous avons besoin dans le fichier de configuration : un test d'unité serait donc particulièrement utile. Ouvrez le fichier `awesome/tests/test_awesome.py` et remplacez son contenu pour qu'il ressemble à ceci :

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

`pytest` permet d'utiliser ce que l'on appelle des _marqueurs_, qui servent à regrouper les tests par catégories. Notez que nous avons appliqué le marqueur `unit` à `test_config`.

L'architecture a déjà été configurée de façon à ce que tous les tests situés dans `awesome/tests` soient exécutés. Pour exécuter ces tests :

```
ddev test awesome
```

#### Créer un test d'intégration

Ce test ne vérifie toutefois pas notre _logique_ de collecte ; nous allons donc ajouter un test d'intégration. Nous utilisons `docker` pour lancer un conteneur Nginx et laisser le check récupérer la page d'accueil. Créez un fichier compose `awesome/tests/docker-compose.yml` avec le contenu suivant :

```yaml
version: '3'

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"
```

Maintenant, ouvrez le fichier `awesome/tests/conftest.py` et remplacez le contenu de cette manière :

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

```
ddev test -m integration awesome
```

Le check est quasiment fini. Apportons la touche finale en ajoutant les configurations d'intégration.

## Configuration

### Remplir le fichier README

Le fichier `awesome/README.md` fourni par notre architecture est déjà dans le bon format. Il ne vous reste plus qu'à remplir le document en ajoutant les informations pertinentes.

### Fichier de configuration

Lorsque vous préparez une nouvelle intégration, vous devez inclure un exemple de configuration contenant les options requises et des valeurs par défaut appropriées. L'exemple de fichier de configuration, ici situé dans `awesome/datadog_checks/awesome/data/conf.yaml.example`, comprend deux éléments de premier niveau : `init_config` et `instances`. La configuration sous `init_config` est appliquée à l'ensemble de l'intégration et utilisée à chaque instanciation de l'intégration, tandis que ce qui trouve sous `instances` est spécifique à une instanciation donnée.

Les blocs de configuration sous chaque section prennent le format suivant :

```yaml
## @<COMMANDE> [- <ARGUMENTS>]
## <LIGNE DESCRIPTION 1>
## <LIGNE DESCRIPTION 2>
#
<KEY>: <VALUE>
```

Les blocs de configuration doivent respecter quelques principes :

* La description ne doit pas être vide
* Les placeholders doivent toujours respecter ce format :
`<CECI_EST_UN_PLACEHOLDER>`, conformément aux [règles de contribution][9] à la documentation.
* Par défaut, tous les paramètres requis ne sont **pas** mis en commentaires.
* Tous les paramètres facultatifs sont mis en commentaires par défaut.
* Si un placeholder présente une valeur par défaut pour une intégration (comme l'endpoint de statut d'une intégration), celle-ci peut être utilisée à la place d'un placeholder générique.

#### Spécification @param

En pratique, la seule commande est `@param`, qui est utilisée pour décrire les blocs de configuration, principalement à des fins de documentation. `@param` doit être implémentée en respectant l'un des formats suivants :

```
@param <name> - <type> - required
@param <name> - <type> - optional
@param <name> - <type> - optional - default: <defval>
```

Arguments :

* `name` : le nom du paramètre, p. ex. `search_string` (obligatoire).
* `type` : le type de données pour la valeur du paramètre (obligatoire). Valeurs possibles :
  * *boolean*
  * *string*
  * *integer*
  * *double*
  * *float*
  * *dictionary*
  * *list&#42;*
  * *object*
* `defval` : valeur par défaut pour le paramètre ; peut être laissé vide (facultatif).

Les variables `list` et `object` couvrent plusieurs lignes et font l'objet de règles spéciales.

* Dans une `list`, les éléments individuels ne sont pas documentés via la spécification `@param`
* Dans un `object`, vous avez la possibilité de documenter les éléments individuellement avec la spécification `@param` ou de spécifier une description commune au niveau supérieur juste après la spécification de l'objet.

#### Paramètres facultatifs

Un paramètre facultatif doit être mis en commentaire par défaut. Au début de chaque ligne couverte par le paramètre, ajoutez `# ` (notez l'espace) en appliquant la même indentation que pour la spécification `@param`.

#### Commentaires de bloc

Vous pouvez ajouter un commentaire de bloc n'importe où dans le fichier de configuration. Les règles suivantes doivent être appliquées :

* Les commentaires doivent débuter avec `## ` (notez l'espace)
* Les commentaires doivent être indentés comme les variables (le trait d'union ne compte pas)


#### Exemple de configuration

Voici le fichier `awesome/datadog_checks/awesome/data/conf.yaml.example` pour le check de service Awesome :

```yaml
init_config:
  ## Commentaire de bloc dans la partie
  ## init_config.

## Commentaire de bloc en dehors de
## la partie init_config.

instances:

    ## @param url - string - optional
    ## L'URL que vous souhaitez vérifier
    ## (Notez l'indentation avec le trait d'union)
    #
  - url: http://example.org

    ## @param search_string - string - optional
    ## La chaîne que vous recherchez
    #
    search_string: "Example Domain"

    ## @param user - object - optional
    ## L'utilisateur doit respecter la structure
    ## {'name': ['<FIRST_NAME>', '<LAST_NAME>'], 'username': <USERNAME>, 'password': <PASSWORD>}
    #
    # user:
    #   name:
    #     - <FIRST_NAME>
    #     - <LAST_NAME>
    #   username: <USERNAME>
    #   password: <PASSWORD>

    ## @param options - object - required
    ## Les flags que vous souhaitez définir (facultatif)
    #
    options:

      ## @param follow_redirects - boolean - optional - default: false
      ## Définir sur true pour suivre la redirection 301
      #
      # follow_redirects: false

```

Pour en savoir plus sur la syntaxe YAML, consultez [Wikipedia][17]. Et n'hésitez pas à faire bon usage du parser en ligne [Online YAML Parser][18] !

### Fichier manifest

Chaque intégration contient un fichier `manifest.json` qui décrit les paramètres de fonctionnement de l'intégration, sa place dans l'écosystème d'intégrations global de Datadog, et d'autres informations semblables.

Voici la liste complète des attributs obligatoires et facultatifs pour le fichier `manifest.json` :

| Attribut            | Type            | Obligatoire/Facultatif | Description                                                                                                                                                                                                              |
| -------------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `integration_id`     | Chaîne          | Obligatoire          | Le nom d'identification unique de cette intégration. Généralement, il s'agit de la version kebab case du nom d'affichage                                                                                                                                  |
| `categories`         | Tableau de chaînes | Obligatoire          | Les catégories d'intégration utilisées sur la [page Intégrations de la documentation publique][10].                                                                                                                                         |
| `creates_events`     | Booléen         | Obligatoire          | Définit si l'intégration est en mesure de créer des événements. Si cet attribut est défini sur `false`, une erreur se produit lorsque l'intégration tente de créer un événement.                                                                   |
| `display_name`       | Chaîne          | Obligatoire          | Le titre affiché sur le carré d'intégration correspondant dans l'application Datadog et sur la [page Intégrations de la documentation publique][10]                                                                                 |
| `guid`               | Chaîne          | Obligatoire          | ID unique de l'intégration. [Générer un UUID][11]                                                                                                                                                                     |
| `is_public`          | Booléen         | Obligatoire          | Si cet attribut est défini sur `false`, le contenu du fichier `README.md` de l'intégration n'est pas indexé par les robots dans la documentation publique de Datadog.                                                                                                        |
| `maintainer`         | Chaîne          | Obligatoire          | Adresse e-mail du propriétaire de l'intégration.                                                                                                                                                                                   |
| `manifest_version`   | Chaîne          | Obligatoire          | Version du manifest actuel.                                                                                                                                                                                         |
| `name`               | Chaîne          | Obligatoire          | Nom unique de l'intégration. Utilisez le nom du répertoire pour ce paramètre.                                                                                                                                                 |
| `public_title`       | Chaîne          | Obligatoire          | Titre de l'intégration affiché dans la documentation. Doit respecter le format : `Datadog-<NOM_INTÉGRATION> integration`.                                                                                   |
| `short_description`  | Chaîne          | Obligatoire          | Ce texte s'affiche en haut du carré d'intégration ainsi qu'au passage de la souris sur la page Intégrations. 80 caractères maximum.                                                                         |
| `support`            | Chaîne          | Obligatoire          | Propriétaire de l'intégration.                                                                                                                                                                                                |
| `supported_os`       | Tableau de chaînes | Obligatoire          | Liste des systèmes d'exploitation pris en charge. Choisissez parmi `linux`, `mac_os` et `windows`.                                                                                                                                                     |
| `type`               | Chaîne          | Obligatoire          | Type d'intégration, doit être défini sur `check`.                                                                                                                                                                       |
| `aliases`            | Tableau de chaînes | Facultatif           | Une liste d'alias d'URL pour la documentation Datadog.                                                                                                                                                                     |
| `description`        | Chaîne          | Facultatif           | Ce texte s'affiche lorsque quelqu'un partage un lien vers la documentation de l'intégration.                                                                                                                                                        |
| `is_beta`            | Booléen         | Facultatif           | `false` par défaut. Lorsque cet attribut est défini sur `true`, le contenu du fichier `README.md` de l'intégration ne s'affiche pas dans la documentation publique de Datadog.                                                                                              |
| `metric_to_check`    | Chaîne          | Facultatif           | La présence de cette métrique indique que l'intégration fonctionne correctement. Si cette métrique n'est pas reçue une fois l'intégration installée, l'intégration est signalée comme non fonctionnelle dans l'application Datadog. |
| `metric_prefix`      | Chaîne          | Facultatif           | L'espace de nommage des métriques de cette intégration. Cette valeur sera ajoutée en préfixe pour chaque métrique envoyée par cette intégration.                                                                                               |
| `process_signatures` | Tableau de chaînes | Facultatif           | Une liste de signatures qui correspond à la ligne de commande de cette intégration.                                                                                                                                                  |
| `assets`       | Dictionnaire | Obligatoire          | L'emplacement relatif où se trouvent certains fichiers ressources et leurs noms respectifs.                                                                                                                                             |
| `assets`-> `dashboards`       | Dictionnaire | Obligatoire          | Dictionnaire dont la clé est le nom du dashboard (doit être unique dans l'ensemble des intégrations) et la valeur est le chemin relatif du fichier où se trouve la définition du dashboard.                                                                                                      |
| `assets`-> `monitors`       | Dictionnaire | Obligatoire          | Dictionnaire dont la clé est le nom du monitor (doit être unique dans l'ensemble des intégrations) et la valeur est le chemin relatif du fichier où se trouve la définition du dashboard.                                                                                                                                              |
| `assets`-> `service_checks`       | Chaîne | Obligatoire          | L'emplacement relatif où se trouve le fichier `service_checks.json`.                                                                       |

##### Exemple de configuration du fichier manifest

Notre exemple d'intégration utilise un fichier `awesome/manifest.json` très simple, dont la majeure partie est générée automatiquement. Notez que le `guid` doit être unique (et valide). N'utilisez donc *pas* celui de cet exemple. Cet identifiant sera de toute façon automatiquement généré.

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
  "supported_os": [
    "linux",
    "mac_os",
    "windows"
  ],
  "public_title": "Datadog-awesome Integration",
  "categories": [
    "web"
  ],
  "type": "check",
  "is_public": false,
  "integration_id": "awesome",
  "assets": {
    "dashboards": {},
    "monitors": {},
    "service_checks": "assets/service_checks.json"
  }
}
```

#### Fichier metadata des métriques

Le fichier `metadata.csv` décrit toutes les métriques pouvant être recueillies par l'intégration.

Description de chaque colonne du fichier `metadata.csv` :

| Nom de la colonne     | Obligatoire/Facultatif | Description                                                                                                                                                                     |
| ---             | ----               | ----                                                                                                                                                                            |
| `metric_name`   | Obligatoire          | Nom de la métrique.                                                                                                                                                             |
| `metric_type`   | Obligatoire          | [Type de métrique][12].                                                                                                                                                       |
| `interval`      | Facultatif           | Intervalle de collecte de la métrique en secondes.                                                                                                                                    |
| `unit_name`     | Facultatif           | Unité de la métrique. [Liste complète des unités prises en charge][13].                                                                                                                     |
| `per_unit_name` | Facultatif           | En cas de sous-division de l'unité, p. ex. `requêtes par seconde`                                                                                                                       |
| `description`   | Facultatif           | Description de la métrique.                                                                                                                                                      |
| `orientation`   | Obligatoire          | Définir sur `1` si la métrique doit augmenter, p. ex. `myapp.turnover`. Définir sur `0` si les variations ne la métrique n'importent pas. Définir sur `-1` si la métrique doit diminuer, p. ex. `myapp.latency`. |
| `integration`   | Obligatoire          | Le nom de l'intégration qui envoie la métrique. Doit correspondre à la version normalisée du `display_name` dans le fichier `manifest.json`. Les caractères autres que les lettres, underscores, tirets et nombres sont convertis en underscores. Par exemple, `Openstack Controller` -> `openstack_controller`, `ASP.NET` -> `asp_net` et `CRI-o` -> `cri-o`.                                                                                                                                |
| `short_name`    | Obligatoire          | Identifiant unique et explicite de la métrique.                                                                                                                                              |

##### Exemple de configuration du fichier metadata

Notre exemple d'intégration n'envoie aucune métrique. Le fichier `awesome/metadata.csv` généré contient uniquement la ligne contenant les noms de colonne CSV.

#### Fichier service_check

Le fichier `service_check.json` décrit les checks de service effectués par l'intégration.

Le fichier `service_checks.json` contient les attributs obligatoires suivants :

| Attribut       | Description                                                                                                              |
| ----            | ----                                                                                                                     |
| `agent_version` | Version minimum prise en charge de l'Agent.                                                                                         |
| `integration`   | Le nom de l'intégration qui envoie le check de service. Doit correspondre au `display_name` non normalisé de `manifest.json`.                                                                                                      |
| `check`         | Nom du check de service. Doit être unique.                                                                            |
| `statuses`      | Liste des différents statuts du check. Valeurs possibles : òk`, `warning`, `critical` ou `unknown`. |
| `groups`        | [Tags][14] envoyés avec le check de service.                                                                                  |
| `name`          | Le nom d'affichage du check de service. Le nom d'affichage doit être clair et unique dans l'ensemble des intégrations.                             |
| `description`   | Description du check de service                                                                                         |

##### Exemple de configuration du fichier service_check

Notre exemple d'intégration contient un check de service. Nous devons donc l'ajouter au fichier `awesome/assets/service_checks.json` :

```json
[
    {
        "agent_version": "6.0.0",
        "integration": "awesome",
        "check": "awesome.search",
        "statuses": ["ok", "warning", "critical"],
        "groups": [],
        "name": "Awesome search!",
        "description": "Returns `CRITICAL` if the check can't access the page, `WARNING` if the search string was not found, or `OK` otherwise."
    }
]
```

### Ajouter des images et des logos

L'arborescence pour les images et les logos est la suivante :

```
    awesome/
    ├── images
    │   └── an_awesome_image.png
    ├── assets
    │   └── logos/
            ├── avatars-bot.png
            ├── saas_logos-bot.png
            └── saas_logos-small.png
```

Le répertoire `images` contient toutes les images utilisées dans le carré d'intégration. Elles doivent être ajoutées aux sections `## Overview` et/ou `## Setup` du fichier `README.md` en tant qu'images au format markdown via leurs URL publiques. Les référentiels `integrations-core` et `integrations-extras` étant publics, une URL publique peut être obtenue pour chacun de ces fichiers via `https://raw.githubusercontent.com` :

```markdown
![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/awesome/images/snapshot.png)
```

Le répertoire `assets/logos/` doit contenir **trois** images dont les noms de fichier et les tailles correspondent _exactement_ aux spécifications suivantes. Sous chaque spécification, vous trouverez une liste des emplacements où les images doivent s'afficher dans l'application Web.

#### saas_logos-bot.png (200 × 128)

* Images du carré d'intégration dans `/account/settings`
* En-tête de description dans `/account/settings#integrations/{nom_intégration}`
* Images pour les carrés du monitor d'intégration et les résultats de la barre de recherche dans `/monitors#create/integration`

#### saas_logos-small.png (120 × 60)

* Images de la liste des dashboards d'intégration dans `/dash/list`
* Certains dashboards/screenboards d'intégration dans `/dash/integration/{nom_dash_intégration}`

#### avatars-bot.png (128 × 128)

* Flux d'événements dans `/event/stream`
* Icônes de notification dans `/report/monitor`

### Compilation

`setup.py` contient le script de configuration setuptools, qui va nous aider à compiler un paquet au format wheel. Pour en savoir plus sur les paquets Python, consultez la [documentation Python officielle][15].

Une fois votre fichier `setup.py` prêt, créez un wheel :

- Avec l'outil `ddev` (conseillé) : `ddev release build <NOM_INTÉGRATION>`
- Sans l'outil `ddev` : `cd <RÉPERTOIRE_INTÉGRATION> && python setup.py bdist_wheel`

#### Que contient le wheel ?

Le wheel contient tous les fichiers nécessaires au bon fonctionnement de l'intégration. Il s'agit notamment du check, de l'exemple de fichier de configuration, et des artefacts générés durant la compilation du wheel. Tous les autres éléments, y compris les images, les fichiers de métadonnées, etc. ne sont *pas* supposés se trouver dans le wheel. Ces éléments sont utilisés ailleurs par l'écosystème et la plateforme Datadog.

### Installation

Le wheel est installé via la commande `integration` de l'Agent, disponible dans les [versions 6.10.0 et ultérieures de l'Agent][16]. En fonction de votre environnement, il est possible que vous deviez exécuter cette commande en tant qu'utilisateur spécifique ou ayant des privilèges particuliers :

**Linux** (en tant que `dd-agent`) :
```
sudo -u dd-agent datadog-agent integration install -w /chemin/vers/wheel.whl
```

**OSX** (en tant qu'admin) :
```
sudo datadog-agent integration install -w /chemin/vers/wheel.whl
```

**Windows** (Veillez à ce que votre session shell dispose des privilèges _administrateur_) :

Pour les versions <= 6.11 de l'Agent :
```
"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /chemin/vers/wheel.whl
```

Pour les versions >= 6.12 de l'Agent: :
```
"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /chemin/vers/wheel.whl
```


[1]: https://virtualenv.pypa.io/en/stable
[2]: /fr/developers/integrations/python
[3]: https://github.com/DataDog/integrations-extras
[4]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[5]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[6]: https://docs.pytest.org/en/latest
[7]: https://tox.readthedocs.io/en/latest
[8]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev#development
[9]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
[10]: https://docs.datadoghq.com/fr/integrations
[11]: https://www.uuidgenerator.net
[12]: https://docs.datadoghq.com/fr/developers/metrics/#metric-types
[13]: https://docs.datadoghq.com/fr/developers/metrics/#units
[14]: https://docs.datadoghq.com/fr/getting_started/tagging
[15]: https://packaging.python.org/tutorials/distributing-packages
[16]: https://docs.datadoghq.com/fr/agent/?tab=agentv6
[17]: https://en.wikipedia.org/wiki/YAML
[18]: http://yaml-online-parser.appspot.com/