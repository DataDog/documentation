---
aliases:
- /fr/developers/integrations/legacy
description: Découvrez comment créer un check de lʼAgent pour lʼAgent Datadog 5.
kind: documentation
title: Créer un check de lʼAgent pour lʼAgent Datadog 5
---
Cette documentation explique comment créer un check d'Agent pour l'Agent Datadog v5, qui a été remplacé par l'Agent v6. Il est encore possible d'écrire vos propres checks locaux pour la v5, mais aucune nouvelle intégration n'est envisagée en amont. Pour en savoir plus sur la création d'intégrations pour l'Agent v6, consultez la section [Créer une intégration][1].

## Prérequis

Vous devez disposer d'un environnement [Ruby][2] fonctionnel. Pour en savoir plus sur l'installation de Ruby, consultez la [section dédiée][3].

Vous devez également disposer de [Wget][4]. Wget est déjà installé sur la plupart des systèmes Linux. Utilisez [Homebrew][5] sur Mac ou [Chocolatey][6] sur Windows.

## Configuration

[Un gem][7] et un ensemble de scripts sont mis à votre disposition pour faciliter l'implémentation, le développement et le contrôle de votre check. Pour commencer :

1. Dupliquez le [référentiel integrations-extras][8] sur Github et clonez le référentiel dans votre environnement de développement.
2. Exécutez `gem install bundler`
3. Exécutez `bundle install`

Une fois les gems Ruby requis installés par Bundler, créez un environnement Python.

1. Exécutez `rake setup_env`. Cela installe un environnement Python virtuel ainsi que tous les composants nécessaires pour le développement d'intégrations (y compris les composants principaux de l'Agent utilisés par les intégrations). Il est possible que certains logiciels de base soient requis pour installer les dépendances Python, comme `gcc` et `libssl-dev`.

2. Exécutez  `source venv/bin/activate` pour activer l'environnement Python virtuel. Pour quitter l'environnement virtuel, exécutez `deactivate`. Pour en savoir plus sur l'environnement Python virtuel, consultez la [documentation Virtualenv][9].

## Créer une intégration

Utilisez rake pour générer le squelette d'une nouvelle intégration en exécutant `rake generate:skeleton[my_integration]`, où _my_integration_ désigne le nom de votre nouvelle intégration (remarque : mettez ce nom entre crochets).

Un nouveau répertoire appelé `my_integration` est alors créé : celui-ci contient tous les fichiers requis pour votre nouvelle intégration. Une entrée pour votre nouvelle intégration est également créée dans les fichiers d'intégration continue `.travis.yml` et `circle.yml` pour veiller à ce que vos tests soient exécutés chaque fois qu'un nouveau build est créé.

### Fichiers d'intégration

Les nouvelles intégrations doivent inclure les fichiers suivants :

#### `README.md`

Le fichier README doit contenir les sections suivantes :

- **Overview** (obligatoire) : informez les utilisateurs de ce qu'ils peuvent attendre de votre intégration.
- **Installation** (obligatoire) : donnez des informations sur l'installation de votre intégration.
- **Configuration** (obligatoire) : détaillez les étapes nécessaires pour configurer votre intégration ou le service que vous intégrez.
- **Validation** (obligatoire) : expliquez comment les utilisateurs peuvent vérifier que l'intégration fonctionne comme prévu.
- **Troubleshooting** : aidez les autres utilisateurs en partageant les solutions aux problèmes courants qu'ils peuvent rencontrer.
- **Compatibility** (obligatoire) : liste des versions de l'application ou du service pour lesquelles votre intégration a été testée et validée.
- **Metrics** (obligatoire) : indiquez la liste des métriques fournies avec votre intégration.
- **Events** : indiquez la liste des événements fournis avec votre intégration, le cas échéant.
- **Service checks** : indiquez la liste des checks de service fournis avec votre intégration, le cas échéant.

Pour en savoir plus, consultez la section [Créer une intégration basée sur lʼAgent][1].

#### `check.py`

Le fichier où réside la logique de fonctionnement de votre check. La fonction skeleton crée une classe integration réutilisable pour votre intégration, y compris une méthode `check` où doit figurer la logique de votre check.

Par exemple :

```python

# Exemple de check.py
import time
from checks import AgentCheck

class MyIntegrationCheck(AgentCheck):
  def __init__(self, name, init_config, agentConfig, instances=None):
    AgentCheck.__init__(self, name, init_config, agentConfig, instances)

  def check(self, instance):
    # Envoyer un événement personnalisé.
    self.event({
      'timestamp': int(time.time()),
      'source_type_name': 'my_integration',
      'msg_title': 'Custom event',
      'msg_text': 'My custom integration event occurred.',
      'host': self.hostname,
      'tags': [
          'action:my_integration_custom_event',
      ]
    })
```

Pour en savoir plus sur la création d'intégrations et l'envoi de métriques avec l'Agent Datadog, consultez la section [Présentation des intégrations basées sur l'Agent][11].

Si vous devez importer des bibliothèques tierces, ajoutez-les au fichier `requirements.txt`.

##### `ci/my_integration.rake`

Si vos tests requièrent un environnement d'essai, utilisez les tâches `install` et `cleanup` pour installer et supprimer un environnement d'essai, respectivement.

Par exemple :

```ruby
# Exemple de my_integration.rake
namespace :ci do
  namespace :my_integration do |flavor|
    task install: ['ci:common:install'] do

      # Utiliser l'environnement virtuel Python et installer les paquets.
      use_venv = in_venv
      install_requirements('my_integration/requirements.txt',
                           "--cache-dir #{ENV['PIP_CACHE']}",
                           "#{ENV['VOLATILE_DIR']}/ci.log",
                           use_venv)

      # Configurer un conteneur de test Docker.
      $(docker run -p 80:80 --name my_int_container -d my_docker)
```

Pour en savoir plus sur la création de tests d'intégration, consultez la documentation dans le [référentiel de l'Agent Datadog][12]. Reportez-vous également à la [bibliothèque ci common][13] pour découvrir les fonctions d'aide, comme `install_requirements` et `sleep_for`.

**Remarque** : vous avez peut-être remarqué la variable `flavor` dans ce fichier et d'autres sections de test. Le terme _flavor_ est utilisé pour dénoter les variations du logiciel intégré, généralement ses versions. Cela vous permet d'écrire un ensemble de tests unique pour cibler différentes _flavors_, variantes ou versions du logiciel que vous intégrez.

#### `conf.yaml.example`

Pour installer votre intégration, vous devez la configurer pour vos instances spécifiques. Pour ce faire, copiez le fichier `conf.yaml.example` dans le répertoire `conf.d` de votre Agent, puis modifiez ce fichier en indiquant les informations spécifiques à votre instance.

Votre fichier `conf.yaml.example` doit contenir deux sections :

- `init_config` pour les paramètres configurés globalement
- `instances` pour les instances spécifiques à intégrer. Il s'agit souvent d'une adresse de serveur ou de host accompagnée de paramètres supplémentaires comme des informations d'authentification, des tags supplémentaires et des paramètres de configuration.

##### `manifest.json`

Ce fichier JSON fournit des métadonnées sur votre intégration et doit inclure :

- **`maintainer`** : permet de spécifier une adresse e-mail valide à laquelle vous pouvez être contacté à propos de cette intégration.
- **`manifest_version`** : la version de ce fichier de manifeste.
- **`max_agent_version`** : la version maximale de l'Agent Datadog compatible avec votre intégration. Datadog s'efforce de maintenir la compatibilité des intégrations à chaque nouvelle version majeure. Il est donc conseillé de laisser la valeur générée automatiquement. Si votre intégration ne fonctionne plus avec une nouvelle version de l'Agent Datadog, modifiez cette valeur et [créez un ticket sur le projet de l'Agent Datadog][14].
- **`min_agent_version`** : la version minimum de l'Agent Datadog compatible avec votre intégration.
- **`name`** : le nom de votre intégration.
- **`short_description`** : permet d'indiquer une brève description de votre intégration.
- **`support`** : étant donné qu'il s'agit d'une intégration maintenue par la communauté, doit être défini sur « contrib ». Spécifiez une autre valeur uniquement si l'équipe Datadog vous demande de le faire.
- **`version`** : la version actuelle de votre intégration.
- **`is_public`** : un booléen défini sur true si votre intégration est publique
- **`has_logo`** : un booléen défini sur true si un logo pour cette intégration est présent dans `/src/images/integrations_logo`
- **`type`** : **check**
- **`categories`** : les catégories permettant de classifier votre [intégration][15] dans la documentation Datadog.

Consultez l'une des intégrations existantes [pour découvrir un exemple de fichier manifeste][16].

#### `metadata.csv`

Le fichier de métadonnées CSV contient une liste des métriques fournies par votre intégration ainsi que des informations générales indiquant à l'application Web Datadog les graphiques et les alertes pouvant être fournis pour la métrique.

Le fichier CSV doit inclure une ligne d'en-tête et les colonnes suivantes :

**`metric_name`** (obligatoire) : le nom de la métrique tel qu'il doit apparaître sur le site Datadog lors de la création de dashboards ou de monitors. Généralement, le nom est une combinaison du fournisseur, du service et de la métrique (comme `aws.ec2.disk_write_ops`) ou de l'application, de la fonction de l'application et de la métrique (comme `apache.net.request_per_s`). Les différents éléments doivent être séparés par des points.

**`metric_type`** (obligatoire) : le type de métrique envoyé. Cela affecte la manière dont l'application Web Datadog traite et affiche vos données. Valeurs possibles : `count`, `gauge` ou `rate`.

  - `count` : une métrique count signale le nombre d'événements spécifiques s'étant produits. Lors du signalement d'un count, envoyez uniquement le nombre de nouveaux événements (delta) enregistrés depuis le dernier envoi. Par exemple, la métrique `aws.apigateway.5xxerror` est un `count` du nombre d'erreurs côté serveur.
  - `gauge` : une métrique gauge signale une valeur enregistrée à un moment donné. Par exemple, `docker.io.read_bytes` est une `gauge` du nombre d'octets lus par seconde.
  - `rate` : une métrique rate signale la variation d'une valeur sur un intervalle de temps (par conséquent, elle comprend généralement une valeur `per_unit_name`). Par exemple, `lighttpd.response.status_2xx` est une métrique `rate` qui capture le nombre de codes de statut 2xx générés par seconde.

**`interval`** : l'intervalle utilisé pour la conversion entre les rates et les counts. Obligatoire lorsque `metric_type` est défini sur `rate`.

**`unit_name`** : l'étiquette de l'unité de mesure que vous recueillez. Les unités suivantes (regroupées par type) sont disponibles :

  - **Bytes** : `bit`, `byte`, `kibibyte`, `mebibyte`, `gibibyte`, `tebibyte`, `pebibyte`, `exbibyte`
  - **Cache** : `eviction`, `get`,  `hit`,  `miss`,  `set`
  - **Database** : `assertion`, `column`, `command`, `commit`, `cursor`, `document`, `fetch`, `flush`, `index`, `key`, `lock`, `merge`, `object`, `offset`, `query`, `question`, `record`, `refresh`, `row`, `scan`, `shard`, `table`, `ticket`, `transaction`, `wait`
  - **Disk** : `block`, `file`, `inode`, `sector`
  - **Frequency** : `hertz`, `kilohertz`, `megahertz`, `gigahertz`
  - **General** : `buffer`, `check`, `email`, `error`, `event`, `garbage`,  `collection`, `item`, `location`, `monitor`, `occurrence`, `operation`, `read`, `resource`, `sample`, `stage`, `task`, `time`, `unit`, `worker`, `write`
  - **Memory** : `page`, `split`
  - **Money** : `cent`, `dollar`
  - **Network** : `connection`, `datagram`, `message`, `packet`, `payload`, `request`, `response`, `segment`, `timeout`
  - **Percentage** : `apdex`, `fraction`, `percent`, `percent_nano`
  - **System** : `core`, `fault`, `host`, `instance`, `node`, `process`, `service`, `thread`
  - **Time** : `microsecond`, `millisecond`, `second`, `minute`, `hour`, `day`, `week`

Si le nom de l'unité n'est pas énuméré ci-dessus, laissez cette valeur vide. Pour ajouter une unité à cette liste, créez un [ticket][17]

**`per_unit_name`** : si vous recueillez une métrique en fonction d'une unité, vous pouvez spécifier un nom d'unité supplémentaire ici pour le combiner avec `unit_name`. Par exemple, définissez le `unit_name` sur « request » et le `per_unit_name` sur « second » pour générer une métrique « requêtes par seconde ». Si vous la spécifiez, cette valeur doit correspondre à l'une des unités énumérées ci-dessus.

**`description`** : une description générale (limitée à 400 caractères) des informations fournies par cette métrique.

**`orientation`** (obligatoire) : un entier au choix parmi `-1`, `0` ou `1`.

  - `-1` indique que des valeurs plus faibles sont meilleures. Exemples : `mysql.performance.slow_queries` et `varnish.fetch_failed`, pour lesquelles des counts faibles sont préférables.
  - `0` indique qu'aucune valeur n'est privilégiée. Exemples : `rabbitmq.queue.messages` et `postgresql.rows_inserted`, pour lesquelles aucune valeur ne fait l'objet d'une préférence particulière (ou la préférence dépend des objectifs opérationnels du système).
  - `1` indique que des valeurs plus grandes sont meilleures. Exemples : `mesos.stats.uptime_secs` et `mysql.performance.key_cache_utilization`, pour lesquelles une disponibilité supérieure ou un plus grand nombre de hits de cache sont à privilégier.

**`integration`** (obligatoire) : doit correspondre au nom de votre intégration, par exemple « my_integration ».

**`short_name`** : une version plus naturelle et abréviée du nom de la métrique. Par exemple, `postgresql.index_blocks_read` peut être défini sur `idx blks read`. La clarté et la facilité d'interprétation prévalent sur la brièveté. Ne copiez pas  le nom de l'intégration. Si vous ne trouvez pas de `short_name` plus court et plus simple à comprendre que le `metric_name`, laissez ce champ vide.

**`curated_metric`** : indique les métriques d'une intégration pertinentes pour un type donné. Types acceptés : `cpu` et `memory`. Ces métriques sont placées plus haut que les autres métriques dans l'interface.

#### `requirements.txt`

Si votre intégration nécessite des bibliothèques Python supplémentaires, énumérez-les dans le fichier `requirements.txt`.  Elles sont automatiquement installées via pip lorsque des utilisateurs se servent de votre intégration.

#### `test_my_integration.py`

Les tests d'intégration permettent de s'assurer que l'Agent Datadog reçoit et enregistre correctement les métriques provenant du logiciel que vous intégrez.

Bien qu'il ne soit pas nécessaire de prévoir un test pour chaque métrique recueillie par votre intégration, Datadog vous conseille fortement d'en couvrir autant que possible. Exécutez la méthode `self.coverage_report()` dans votre test pour obtenir la liste des métriques couvertes.

Exemple de fichier `test_my_integration.py` :

```
# Exemple de fichier test_my_integration.py
from nose.plugins.attrib import attr
from checks import AgentCheck
from tests.checks.common import AgentCheckTest

@attr(requires='my_integration')
Class TestMyIntegration(AgentCheckTest):

  def testMyIntegration(self):
    self.assertServiceCheck('my_integration.can_connect', count=1, status=AgentCheck.OK, tags=[host:localhost', 'port:80'])
    self.coverage_report()
```

Pour en savoir plus sur les tests et les méthodes de test disponibles, reportez-vous à [la classe AgentCheckTest dans le référentiel de l'Agent Datadog][18]

## Bibliothèques

L'[Agent Datadog][19] fournit plusieurs bibliothèques utiles dans le [répertoire `utils`][20]. Ces bibliothèques peuvent vous aider à développer votre intégration. Sachez néanmoins que leur emplacement a été modifié avec la v6 de l'Agent Datadog.

## Tester votre intégration

Utilisez les commandes suivantes pour tester votre code durant le développement de votre check :

- `rake lint` : faire un Lint de votre code pour détecter les erreurs potentielles.
- `rake ci:run[my_integration]` : exécuter les tests que vous avez écrits dans votre fichier `test_my_integration.py` et qui ont l'annotation `@attr(requires='my_integration')`.
- `rake ci:run[default]` : exécuter les tests que vous avez écrits dans votre fichier `test_my_integration.py` (sans l'annotation `@attr(requires='my_integration')`), en plus de quelques tests génériques.

Travis CI exécute automatiquement des tests lorsque vous créez une pull request. Avant de créer une pull request, assurez-vous que vos tests couvrent le maximum de code possible et qu'ils ont tous réussi.

Ajoutez l'annotation `@attr(requires='my_integration')` aux méthodes ou aux classes de test qui nécessitent un environnement de test Docker complet (voir la section suivante).
N'ajoutez pas cette annotation à vos tests d'unité et de simulation ; ces derniers doivent être exécutés avec la commande `rake ci:run[default]` sur Travis CI.

Pour exécuter rapidement vos tests d'unité et de simulation, plutôt que de lancer tous les tests avec `rake ci:run[default]`, utilisez :

```
# exécuter les tests d'unité et de simulation dans l'environnement virtuel
$ bundle exec rake exec["nosetests my_integration/test/test_*.py -A 'not requires'"]
```

### Environnements de test Docker

Datadog utilise des conteneurs Docker pour les environnements de test. Il s'agit de l'approche recommandée. Les conteneurs sont légers, faciles à gérer et fournissent des environnements uniformes et normalisés pour chaque exécution de test.

Par exemple, dans l'intégration Datadog/MySQL, le [fichier `ci/mysql.rake`][21] utilise le [conteneur MySQL officiel][22] et implique quatre tâches principales :

1. `before_install` : avant de démarrer le nouvel environnement de test Docker, un contrôle est effectué pour vérifier que les environnements de test Docker précédents sont arrêtés et supprimés.
2. `install` : la tâche install lance le `run` Docker, qui démarre le serveur de test MySQL.
3. `before_script` : cette tâche vérifie d'abord que le serveur MySQL fonctionne, puis se connecte au serveur pour effectuer des tâches de configuration. Placez les tâches de configuration dans votre fichier `test_integration.py`, tant que cela est possible. En effet, dans certains cas, l'implémentation et la configuration doivent être réalisées avant l'exécution du script de test Python.
4. `cleanup` : une fois les tests terminés, l'environnement de test Docker est arrêté et supprimé.

### Installation de votre intégration en local

Une fois votre intégration ajoutée au référentiel `integrations-extras`, Datadog génère des packages permettant aux utilisateurs d'installer facilement votre intégration. Toutefois, il peut être préférable d'installer l'intégration en local avant de merger son code.

Pour exécuter votre intégration en local, copiez d'abord votre fichier `check.py` dans le répertoire `checks.d` de l'Agent Datadog et renommez-le `my_integration.py` (utilisez le nom réel de votre intégration).

Copiez ensuite votre fichier `conf.yaml.example` dans le répertoire `conf.d` de l'Agent Datadog et renommez-le `my_integration.yaml` (utilisez de nouveau le nom réel de votre intégration).

Consultez la section [Créer une intégration][1] pour en savoir plus sur l'arborescence de dossiers de l'Agent Datadog.

### Nettoyage final

Une fois votre intégration créée, exécutez `rake clean_env` pour supprimer l'environnement virtuel Python.

## Envoyer votre intégration

Une fois le développement de votre intégration terminé, créez une [pull request][23] pour que Datadog examine votre intégration. Après avoir passé en revue votre intégration, Datadog approuve votre pull request et intègre son code, ou vous communique les changements à effectuer pour qu'elle soit approuvée.

### Considérations supplémentaires

Tenez compte des éléments suivants lors de l'écriture de tests :

* Testez des clusters entiers. Il est souvent plus facile de tester des instances uniques de votre programme, mais les tests sont plus utiles lorsqu'ils reflètent des situations courantes. Par exemple, les utilisateurs de MongoDB font souvent appel au sharding et aux replica sets : les [tests][24] ont donc été écrits en conséquence.
* Pensez à générer des métriques calculées en plus des métriques brutes. À titre d'exemple, les requêtes de base de données les plus lentes sont souvent les moins fréquemment exécutées : il peut donc être utile de calculer les centiles. Ainsi, l'intégration Datadog/MySQL propose une métrique calculée qui évalue le [95e centile du temps d'exécution des requêtes][2].

[1]: https://docs.datadoghq.com/fr/developers/integrations/agent_integration
[2]: https://www.ruby-lang.org
[3]: https://www.ruby-lang.org/en/documentation/installation
[4]: https://www.gnu.org/software/wget
[5]: https://brew.sh
[6]: https://chocolatey.org
[7]: https://rubygems.org/gems/datadog-sdk-testing
[8]: https://github.com/DataDog/integrations-extras
[9]: https://virtualenv.pypa.io/en/stable
[11]: https://docs.datadoghq.com/fr/developers/integrations/
[12]: https://github.com/DataDog/dd-agent/blob/master/tests/README.md#integration-tests
[13]: https://github.com/DataDog/dd-agent/blob/master/ci/common.rb
[14]: https://github.com/DataDog/dd-agent/blob/master/CONTRIBUTING.md#submitting-issues
[15]: /fr/integrations
[16]: https://github.com/DataDog/integrations-core/blob/master/activemq/manifest.json
[17]: https://github.com/DataDog/integrations-extras/issues
[18]: https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py
[19]: https://github.com/DataDog/dd-agent
[20]: https://github.com/DataDog/dd-agent/tree/master/utils
[21]: https://github.com/DataDog/integrations-core/blob/5.19.x/mysql/ci/mysql.rake
[22]: https://hub.docker.com/_/mysql
[23]: https://github.com/DataDog/integrations-extras/compare
[24]: https://github.com/DataDog/integrations-core/tree/5.22.x/mongo/test/ci