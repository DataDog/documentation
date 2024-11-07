---
dependencies:
- "https://github.com/DataDog/chef-datadog/blob/master/README.md"
title: Chef
---
Les recettes Chef pour Datadog servent à déployer automatiquement les composants et la configuration de Datadog. Le cookbook prend en charge les versions suivantes de l'Agent :

* Agent Datadog v7.x (par défaut)
* Agent Datadog v6.x
* Agent Datadog v5.x

**Remarque** : cette page peut faire référence à des fonctionnalités qui ne sont pas disponibles pour votre version. Consultez le fichier README du
tag git ou de la version gem pour accéder à la documentation de votre version.

## Configuration

### Prérequis

Le cookbook Chef pour Datadog est compatible avec `chef-client` 12.7 ou une version ultérieure. Pour une version antérieure de Chef, utilisez une [version 2.x du cookbook][2]. Consultez le [CHANGELOG][3] pour en savoir plus.

#### Plateformes

Les plateformes suivantes sont prises en charge :

* Amazon Linux
* CentOS
* Debian
* RedHat (RHEL 8 nécessite Chef 15 ou une version ultérieure)
* Scientific Linux
* Ubuntu
* Windows
* SUSE (nécessite Chef 13.3 ou une version ultérieure)

#### Cookbooks

Les cookbooks Opscode suivants sont des dépendances :

* `apt`
* `chef_handler`
* `yum`

**Remarque** : un cookbook `apt` 7.1 ou ultérieur est nécessaire pour installer l'Agent sur Debian 9+.

#### Chef

**Utilisateurs de Chef 12** : en fonction de votre version de Chef 12, des contraintes de dépendance supplémentaires peuvent s'appliquer :

```ruby
# Chef < 12.14
depends 'yum', '< 5.0'
```

```ruby
# Chef < 12.9
depends 'apt', '< 6.0.0'
depends 'yum', '< 5.0'
```

**Utilisateurs de Chef 13** : avec Chef 13 et `chef_handler` 1.x, il se peut que vous rencontriez des problèmes avec la recette `dd-handler`. Pour y remédier, mettez à jour dépendance `chef_handler` en installant la version 2.1 ou une version ultérieure.

**Utilisateurs de Chef 14 et 15** : pour prendre en charge les versions 12 et 13 de Chef, le cookbook `datadog` dispose d'une dépendance avec le cookbook `chef_handler`, qui est fourni en tant que ressource dans Chef 14. Malheureusement, la dépendance génère un message indiquant son obsolescence pour les utilisateurs de Chef 14 et 15.

### Installation

1. Ajoutez le cookbook à votre serveur Chef avec [Berkshelf][5] ou [Knife][6] :
    ```text
    # Berksfile
    cookbook 'datadog', '~> 4.0.0'
    ```

    ```shell
    # Knife
    knife cookbook site install datadog
    ```

2. Définissez les [attributs spécifiques à Datadog](#attributs-datadog) dans un rôle, un environnement ou une autre recette :
    ```text
    node.default['datadog']['api_key'] = "<YOUR_DD_API_KEY>"

    node.default['datadog']['application_key'] = "<YOUR_DD_APP_KEY>"
    ```

3. Importez le cookbook mis à jour sur votre serveur Chef :
    ```shell
    berks upload
    # or
    knife cookbook upload datadog
    ```

4. Une fois l'importation terminée, ajoutez le cookbook au paramètre `run_list` ou `role` de votre nœud :
    ```text
    "run_list": [
      "recipe[datadog::dd-agent]"
    ]
    ```

5. Patientez jusqu'à la prochaine exécution programmée de `chef-client` ou déclenchez-le manuellement.

### Environnement Dockerisé

Pour créer un environnement Docker, utilisez les fichiers sous `docker_test_env` :

```
cd docker_test_env
docker build -t chef-datadog-container .
```

Pour exécuter le conteneur, utilisez :

```
docker run -d -v /dev/vboxdrv:/dev/vboxdrv --privileged=true chef-datadog-container
```

Ensuite, associez une console au conteneur ou utilisez la fonctionnalité de conteneur distant de VS Code pour développer au sein du conteneur.

#### Attributs Datadog

Vous pouvez utiliser les méthodes suivantes pour ajouter vos [clés d'API et d'application Datadog][4] :

* En tant qu'attributs de nœud, avec un paramètre `environment` ou `role`
* En tant qu'attributs de nœud, en déclarant les clés dans un autre cookbook à un niveau de priorité plus élevé
* Dans le nœud `run_state`, en définissant `node.run_state['datadog']['api_key']` dans un autre cookbook précédant les recettes de Datadog dans la `run_list` ; cette approche ne stocke pas les identifiants en texte en clair sur le serveur Chef

**Remarque** : lorsque vous utilisez l'état d'exécution pour stocker vos clés d'API et d'application, définissez-les en fonction de la durée de compilation avant `datadog::dd-handler` dans la run list.

#### Configuration supplémentaire

Pour ajouter des éléments supplémentaires qui ne sont pas directement disponibles en tant qu'attributs du cookbook au fichier de configuration de l'Agent (généralement `datadog.yaml`), utilisez l'attribut `node['datadog']['extra_config']`. Il s'agit d'un attribut de hachage, qui est marshalé dans le fichier de configuration en conséquence.

##### Exemples

Le code suivant définit le champ `secret_backend_command` dans le fichier de configuration `datadog.yaml` :

```ruby
 default_attributes(
   'datadog' => {
     'extra_config' => {
       'secret_backend_command' => '/sbin/local-secrets'
     }
   }
 )
```

Le paramètre `secret_backend_command` peut également être définie en utilisant :

```text
default['datadog']['extra_config']['secret_backend_command'] = '/sbin/local-secrets'
```

Pour les attributs imbriqués, utilisez une syntaxe d'objet. Le code suivant définit le champ `logs_config` dans le fichier de configuration `datadog.yaml` :

```ruby
default['datadog']['extra_config']['logs_config'] = { 'use_port_443' => true }
```

#### Déploiement Chef sur AWS OpsWorks

Suivez les étapes ci-dessous pour déployer l'Agent Datadog avec Chef sur AWS OpsWorks :

1. Ajoutez le JSON personnalisé suivant pour Chef :
  ```json
  {"datadog":{"agent_major_version": 7, "api_key": "<API_KEY>", "application_key": "<APP_KEY>"}}
  ```

2. Incluez la recette dans la recette `install-lifecycle` :
  ```ruby
  include_recipe 'datadog::dd-agent'
  ```

### Intégrations

Activez les intégrations de l'Agent en ajoutant la [recette](#recettes) et les détails de configuration dans la run list et les attributs de votre rôle.
**Remarque** : vous pouvez créer des recettes d'intégration supplémentaires en utilisant la ressource [datadog_monitor](#monitor-datadog).

Associez vos recettes aux `roles` souhaités. Par exemple, `role:chef-client` doit contenir `datadog::dd-handler`, et `role:base` doit démarrer l'Agent avec `datadog::dd-agent`. Voici un exemple de rôle avec les recettes `dd-handler`, `dd-agent` et `mongo` :

```ruby
name 'example'
description 'Exemple de rôle avec Datadog'

default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'api_key' => '<VOTRE_CLÉ_API_DD>',
    'application_key' => '<VOTRE_CLÉ_API_DD>',
    'mongo' => {
      'instances' => [
        {'host' => 'localhost', 'port' => '27017'}
      ]
    }
  }
)

run_list %w(
  recipe[datadog::dd-agent]
  recipe[datadog::dd-handler]
  recipe[datadog::mongo]
)
```

**Remarque** : cette recette n'utilise pas de `data_bags`, car il est peu probable d'avoir plusieurs clés d'API avec une seule clé d'application.

## Versions

Par défaut, la version majeure actuelle de ce cookbook installe l'Agent v7. Les attributs suivants sont disponibles pour contrôler la version de l'Agent installée :

| Paramètre              | Description                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`  | Impose la version majeure 5, 6 ou 7 (par défaut) de l'Agent.                                                                                                                         |
| `agent_version`        | Impose une version spécifique de l'Agent (conseillé).                                                                                                                                         |
| `agent_package_action` | (Linux uniquement) Valeur par défaut : `'install'`. Définissez ce paramètre sur `'upgrade'` pour obtenir automatiquement des mises à jour de l'Agent. Ce comportement n'est pas conseillé : nous vous recommandons plutôt de conserver la valeur par défaut et de modifier la `agent_version` imposée pour les mises à niveau. |
| `agent_flavor` | (Linux uniquement) La valeur par défaut `'datadog-agent'` installer datadog-agent. Vous pouvez également définir ce paramètre sur `'datadog-iot-agent'` pour installer l'Agent IOT |

Consultez le fichier d'exemple [attributes/default.rb][1] correspondant à la version de votre cookbook pour découvrir tous les attributs disponibles.

### Passer à une version supérieure

Certains noms d'attributs ont changé entre les versions 3.x et 4.x du cookbook. Référez-vous à ce tableau de référence pour mettre à jour votre configuration :

| Action                | Cookbook 3.x                                          | Cookbook 4.x                              |
|-----------------------|-------------------------------------------------------|-------------------------------------------|
| Installer l'Agent 7.x     | Non prise en charge                                         | `'agent_major_version' => 7`              |
| Installer l'Agent 6.x     | `'agent6' => true`                                    | `'agent_major_version' => 6`              |
| Installer l'Agent 5.x     | `'agent6' => false`                                   | `'agent_major_version' => 5`              |
| Imposer une version de l'Agent     | `'agent_version'` ou `'agent6_version'`               | `'agent_version'` pour toutes les versions        |
| Modifier package_action | `'agent_package_action'` ou `'agent6_package_action'` | `'agent_package_action'` pour toutes les versions |
| Modifier l'URL du référentiel APT   | `'aptrepo'` ou `'agent6_aptrepo'`                     | `'aptrepo'` pour toutes les versions              |
| Modifier la distribution du référentiel APT  | `'aptrepo_dist'` ou `'agent6_aptrepo_dist'`           | `'aptrepo_dist'` pour toutes les versions         |
| Modifier le référentiel YUM       | `'yumrepo'` ou `'agent6_yumrepo'`                     | `'yumrepo'` pour toutes les versions              |
| Modifier le référentiel SUSE      | `'yumrepo_suse'` ou `'agent6_yumrepo_suse'`           | `'yumrepo_suse'` pour toutes les versions         |

Utilisez l'une des méthodes suivantes pour passer de la version 6 à la version 7 de l'Agent :

* Définissez `agent_major_version` sur `7` et `agent_package_action` sur `install`, puis imposez une version 7 spécifique pour `agent_version` (conseillé).
* Définissez `agent_major_version` sur `7` et `agent_package_action` sur `upgrade`.

L'exemple suivant permet de passer de la version 6 à la version 7 de l'Agent. La même logique s'applique pour les versions 5 et 6.

```ruby
default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'agent_version' => '7.15.0',
    'agent_package_action' => 'install',
  }
)
```

### Passer à une version antérieure

Pour passer à une version antérieure de l'Agent, définissez les paramètres `'agent_major_version'`, `'agent_version'` et `'agent_allow_downgrade'`.

L'exemple suivant permet de passer de la version 7 à la version 6 de l'Agent. La même logique s'applique pour les versions 6 et 5.

```ruby
  default_attributes(
    'datadog' => {
      'agent_major_version' => 6,
      'agent_version' => '6.10.0',
      'agent_allow_downgrade' => true
    }
  )
```

## Recettes

Accédez aux [recettes Chef pour Datadog sur GitHub][7].

### Valeur par défaut

La [recette par défaut][8] est donnée à titre d'exemple.

### Agent

La [recette dd-agent][9] permet d'installer l'Agent Datadog sur le système cible, de définir votre [clé d'API Datadog][4] et de démarrer le service afin de transmettre des métriques système locales.

**Remarque** : pour les utilisateurs Windows qui effectuent une mise à niveau de l'Agent à partir d'une version <= 5.10.1 vers une version >= 5.12.0, définissez l'attribut `windows_agent_use_exe` sur `true`. Pour en savoir plus, consultez la [page Wiki dd-agent][10].

### Gestionnaire

La [recette dd-handler][11] permet d'installer le gem [chef-handler-datadog][12] et d'appeler le gestionnaire à la fin d'une exécution Chef pour transmettre les détails au flux d'actualités.

### DogStatsD

Pour installer une bibliothèque spécifique à un langage qui interagit avec DogStatsD :

- Ruby : [recette dogstatsd-ruby][13]
- Python : ajoutez une dépendance sur le cookbook `poise-python` à votre cookbook wrapper/personnalisé et utilisez la ressource ci-dessous. Pour en savoir plus, consultez le [référentiel poise-python][14].
    ```ruby
    python_package 'dogstatsd-python' # assumes python and pip are installed
    ```

### Tracing

Pour installer une bibliothèque spécifique à un langage pour le tracing d'applications (APM) :

- Ruby : [recette ddtrace-ruby][15]
- Python : ajoutez une dépendance sur le cookbook `poise-python` à votre cookbook wrapper/personnalisé et utilisez la ressource ci-dessous. Pour en savoir plus, consultez le [référentiel poise-python][14].
    ```ruby
    python_package 'ddtrace' # assumes python and pip are installed
    ```

### Intégrations

De nombreuses [recettes][7] peuvent vous aider à déployer des dépendances et des fichiers de configuration pour les intégrations de l'Agent.

## Ressources

### datadog_monitor

Utilisez la ressource `datadog_monitor` pour activer des intégrations de l'Agent sans passer par une recette.

#### Actions

- `:add` (par défaut) : active une intégration en configurant le fichier de configuration, en ajoutant les autorisations appropriées au fichier et en redémarrant l'Agent.
- `:remove` : désactive une intégration.

#### Syntaxe

```ruby
datadog_monitor 'name' do
  init_config                       Hash # valeur par défaut : {}
  instances                         Array # valeur par défaut : []
  logs                              Array # valeur par défaut : []
  use_integration_template          true, false # valeur par défaut : false
  action                            Symbol # valeur par défaut : add
end
```

#### Propriétés

| Propriété                   | Description                                                                                                                                                                                                                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `'name'`                   | Le nom de l'intégration de l'Agent à configurer et à activer.                                                                                                                                                                                                                                     |
| `instances`                | Les champs utilisés pour renseigners les valeurs sous la section `instances` dans le fichier de configuration de l'intégration.                                                                                                                                                                                            |
| `init_config`              | Les champs utilisés pour renseigner les valeurs sous la section `init_config` dans le fichier de configuration de l'intégration.                                                                                                                                                                                      |
| `logs`                     | Les champs utilisés pour renseigner les valeurs sous la section `logs` dans le fichier de configuration de l'intégration.                                                                                                                                                                                             |
| `use_integration_template` | Définissez cette propriété sur `true` (conseillé) pour utiliser le modèle par défaut, qui inscrit les valeurs des propriétés `instances`, `init_config` et `logs` dans le fichier YAML sous leurs clés respectives. Cette propriété est par défaut définie sur `false` afin de rendre possible une rétrocompatibilité. La valeur `true` sera prochainement utilisée par défaut dans une prochaine version majeure du cookbook |

#### Exemple

Cet exemple permet d'activer l'intégration ElasticSearch en utilisant la ressource `datadog_monitor`. Il fournit la configuration d'instance (dans ce cas : l'URL pour se connecter à ElasticSearch) et définit le flag `use_integration_template` afin d'utiliser le modèle de configuration par défaut. En outre, il indique à la ressource `service[datadog-agent]` de redémarrer l'Agent.

**Remarque** : l'installation de l'Agent doit être au-dessus de cette recette dans la run list.

```ruby
include_recipe 'datadog::dd-agent'

datadog_monitor 'elastic' do
  instances  [{'url' => 'http://localhost:9200'}]
  use_integration_template true
  notifies :restart, 'service[datadog-agent]' if node['datadog']['agent_start']
end
```

Consultez les [recettes Chef pour les intégrations Datadog][7] afin de découvrir des exemples supplémentaires.

### datadog_integration

Pour installer une version spécifique d'une intégration Datadog, utilisez la ressource `datadog_integration`.

#### Actions

- `:install` (par défaut) : installe la version spécifiée d'une intégration.
- `:remove` : supprime une intégration.

#### Syntaxe

```ruby
datadog_integration 'name' do
  version                      String         # version à installer pour l'action :install
  action                       Symbol         # valeur par défaut : :install
  third_party                  [true, false]  # valeur par défaut : false
end
```

#### Propriétés

- `'name'` : le nom de l'intégration de l'Agent à installer, par exemple : `datadog-apache`.
- `version` : la version de l'intégration à installer (obligatoire uniquement pour l'action `:install`).
- `third_party` : définissez ce paramètre sur false si vous installez une intégration Datadog. Si ce n'est pas le cas, définissez-le sur true. Disponible à partir des versions 6.21/7.21 de l'Agent Datadog uniquement.

#### Exemple

Cet exemple permet d'installer la version `1.11.0` de l'intégration ElasticSearch en utilisant la ressource `datadog_integration`.

**Remarque** : l'installation de l'Agent doit être au-dessus de cette recette dans la run list.

```ruby
include_recipe 'datadog::dd-agent'

datadog_integration 'datadog-elastic' do
  version '1.11.0'
end
```

Pour obtenir la liste des versions disponibles d'une intégration, consultez son `CHANGELOG.md` dans le [référentiel integrations-core][16].

**Remarque** : pour les utilisateurs de Chef sous Windows, le `chef-client` doit avoir un accès en lecture au fichier `datadog.yaml` lorsque le binaire `datadog-agent` disponible sur le nœud est utilisé par cette ressource.


[1]: https://github.com/DataDog/chef-datadog/blob/master/attributes/default.rb
[2]: https://github.com/DataDog/chef-datadog/releases/tag/v2.18.0
[3]: https://github.com/DataDog/chef-datadog/blob/master/CHANGELOG.md
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://docs.chef.io/berkshelf/
[6]: https://docs.chef.io/knife/
[7]: https://github.com/DataDog/chef-datadog/tree/master/recipes
[8]: https://github.com/DataDog/chef-datadog/blob/master/recipes/default.rb
[9]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-agent.rb
[10]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[11]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-handler.rb
[12]: https://rubygems.org/gems/chef-handler-datadog
[13]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dogstatsd-ruby.rb
[14]: https://github.com/poise/poise-python
[15]: https://github.com/DataDog/chef-datadog/blob/master/recipes/ddtrace-ruby.rb
[16]: https://github.com/DataDog/integrations-core
