---
aliases:
- /fr/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /fr/agent/faq/agent-5-custom-agent-check/
further_reading:
- link: /developers/
  tag: Documentation
  text: Développement pour Datadog
title: Écrire un check custom d'Agent
---

## Présentation

Ce guide vous explique comment concevoir un check custom d'Agent avec le paramètre `min_collection_interval`. Il contient également un exemple de cas d'utilisation permettant de tirer profit du check custom créé. Les checks custom s'exécutent à des intervalles réguliers. Il s'agit du même intervalle que les intégrations basées sur l'Agent. Par défaut, l'intervalle a pour valeur 15 secondes.

## Configuration

### Installation

Pour créer un check custom d'Agent, commencez par installer l'[Agent Datadog][1].

**Remarque** : si vous exécutez l'Agent v7+, votre check custom d'Agent doit être compatible avec Python 3. Si ce n'est pas le cas, il doit être compatible avec Python 2.7+.

### Configuration

1. Basculez sur le répertoire `conf.d` de votre système. Pour en savoir plus sur l'emplacement du répertoire `conf.d`, consultez les [paramètres de configuration de l'Agent][2] pour votre système d'exploitation.
2. Dans le répertoire `conf.d`, créez un fichier de configuration pour votre nouveau check d'Agent. Attribuez-lui le nom `custom_checkvalue.yaml`.
3. Modifiez le fichier de façon à inclure ce qui suit :
  ```yaml
    init_config:

    instances:
      [{}]
  ```
4. Créez un fichier de check dans le répertoire `checks.d`. Attribuez-lui le nom `custom_checkvalue.py`.
5. Modifiez le fichier de façon à inclure ce qui suit :
  ```python
    from checks import AgentCheck
    class HelloCheck(AgentCheck):
      def check(self, instance):
        self.gauge('hello.world', 1)
  ```
6. [Redémarrez l'Agent][3]. Une nouvelle métrique devrait s'afficher après environ 60 secondes dans le [Metric Summary][4]. Elle s'intitule `hello.world`.

**Remarque** : vos fichiers de configuration et de check doivent porter le même nom. Si votre check s'appelle `custom_checkvalue.py`, votre fichier de configuration *doit* s'appeler `custom_checkvalue.yaml`.

### Résultats

Une nouvelle métrique `hello.world` s'affiche après 60 secondes dans le [Metric Summary][4]. Elle possède la valeur `1`.

**Remarque** : lors de la sélection d'un nom pour votre check custom, ajoutez `custom_` en préfixe afin d'éviter tout conflit avec le nom d'une intégration existante de l'Agent Datadog. Par exemple, si vous rédigez un check custom Postfix, nommez vos fichiers de check `custom_postfix.py` et `custom_postfix.yaml`, et non `postfix.py` et `postfix.yaml`.

### Modification de l'intervalle de collecte

Pour modifier l'intervalle de collecte de votre check, utilisez le paramètre `min_collection_interval` dans votre fichier `custom_checkvalue.yaml`. Par défaut, l'intervalle est défini sur `15`. Pour l'Agent v6, le paramètre `min_collection_interval` doit être ajouté au niveau des instances et configuré pour chaque instance. Exemple :

```yaml
init_config:

instances:
  - min_collection_interval: 30
```

**Remarque** : si le paramètre `min_collection_interval` est défini sur `30`, cela ne signifie pas que la métrique est recueillie toutes les 30 secondes, mais plutôt qu'il s'agit de la fréquence de collecte optimale. Le collecteur essaie d'exécuter le check toutes les 30 secondes, mais il est possible que celui-ci soit mis en attente, en fonction du nombre d'intégrations et de checks activés sur le même Agent. De plus, si la méthode `check` dure plus de 30 secondes, l'Agent identifie que le check est toujours en cours d'exécution et annule son exécution jusqu'au prochain intervalle.

### Vérifier votre check

Pour vérifier que votre check s'exécute, utilisez la commande suivante :

```shell
sudo -u dd-agent -- datadog-agent check <NOM_CHECK>
```

Après avoir vérifié que le check fonctionne, [redémarrez votre Agent][3] afin d'inclure votre check et de commencer à transmettre des données à Datadog.

## Écrire un check qui exécute des programmes en ligne de commande

Vous pouvez créer un check custom qui exécute un programme en ligne de commande et enregistre son résultat sous la forme d'une métrique custom. Par exemple, un check peut exécuter la commande `vgs` afin de renvoyer des informations sur des groupes de volumes.

Pour exécuter un sous-processus au sein d'un check, utilisez la [fonction `get_subprocess_output()`][5] du module `datadog_checks.base.utils.subprocess_output`. La commande et ses arguments sont transmis à `get_subprocess_output()` sous la forme d'une liste. La commande et ses arguments constituent une chaîne au sein de la liste.

### Exemple

Si la commande suivante est saisie dans l'invite de commandes :

  ```text
  $ vgs -o vg_free
  ```
  Elle doit être transmise à `get_subprocess_output()` comme suit :
  ```python
  out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
  ```
  **Remarque** : étant donné que l'interpréteur Python qui exécute les checks est intégré au runtime Go multithread, les modules `subprocess` et `multithreading` de la bibliothèque Python standard ne sont pas pris en charge par la version 6 et les versions ultérieures de l'Agent.

### Résultats

Lorsque vous exécutez le programme en ligne de commande, le check enregistre la même sortie que s'il était exécuté sur la ligne de commande dans le terminal. Effectuez un traitement des chaînes pour la sortie et utilisez `int()` ou `float()` sur le résultat pour renvoyer une valeur numérique.

Si vous n'effectuez pas de traitement des chaînes pour la sortie du sous-processus, ou si celle-ci ne correspond pas à un nombre entier ou à une valeur de type float, le check s'exécute sans erreur, mais ne renvoie aucune donnée.

Voici un exemple de check qui renvoie les résultats d'un programme en ligne de commande :

```python
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
```
## Cas d'utilisation - envoi de données depuis votre répartiteur de charge

Votre nouveau check custom d'Agent peut notamment servir à envoyer des métriques Datadog depuis votre répartiteur de charge. Commencez par suivre la procédure décrite dans la section [Configuration](#configuration), puis suivez les étapes ci-dessous pour compléter les fichiers afin d'envoyer des données depuis votre répartiteur de charge :

1. Remplacez le code du fichier `custom_checkvalue.py` par ce qui suit (remplacez la valeur de `lburl` par l'adresse de votre répartiteur de charge) :
  ```python
    import urllib2
    import simplejson
    from checks import AgentCheck

    class CheckValue(AgentCheck):
      def check(self, instance):

        lburl = instance['ipaddress']

        response = urllib2.urlopen("http://" + lburl + "/rest")
        data = simplejson.load(response)

        self.gauge('coreapp.update.value', data["value"])
  ```
2. Modifiez le fichier `custom_checkvalue.yaml` (remplacez `ipaddress` par l'adresse IP de votre répartiteur de charge) :
  ```yaml
    init_config:

    instances:
      - ipaddress: 1.2.3.4
  ```
3. [Redémarrez l'Agent][3]. Une nouvelle métrique devrait s'afficher après environ 60 secondes dans le [Metric Summary][4]. Elle s'intitule `coreapp.update.value` et envoie les métriques depuis votre répartiteur de charge.
4. [Créez un dashboard][6] pour cette métrique.

## Adaptation aux versions de l'Agent

Utilisez le bloc try/except suivant pour vous assurer que le check custom fonctionne avec n'importe quelle version de l'Agent :

```python
try:
    # Essayer d'abord d'importer la classe de base à partir des nouvelles versions de l'Agent
    from datadog_checks.base import AgentCheck
except ImportError:
    # Si l'étape ci-dessus échoue, le check s'exécute dans une version < 6.6.0 de l'Agent
    from checks import AgentCheck

# Le contenu de la variable spéciale __version__ est indiqué dans la page de statut de l'Agent
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/basic_agent_usage/source/?tab=agentv6v7#configuration
[3]: /fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://datadog-checks-base.readthedocs.io/en/latest/datadog_checks.utils.html#module-datadog_checks.base.utils.subprocess_output
[6]: /fr/dashboards/