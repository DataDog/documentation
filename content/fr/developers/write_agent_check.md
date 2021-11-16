---
title: Check custom d'Agent
kind: documentation
aliases:
  - /fr/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
  - /fr/agent/faq/agent-5-custom-agent-check/
further_reading:
  - link: /developers/integrations/new_check_howto/
    tag: Documentation
    text: Créer une intégration
---
## Présentation

Cette section explique comment rédiger un check custom d'Agent simple et utiliser `min_collection_interval`. Comme pour les intégrations standard reposant sur l'Agent, les checks customs sont programmés afin de s'exécuter à intervalles réguliers (par défaut, toutes les 15 secondes).

### Faut-il que je rédige un check d'Agent ou une intégration ?

Les checks customs sont particulièrement utiles pour recueillir des métriques à partir d'applications personnalisées ou de systèmes uniques. Cependant, si vous souhaitez recueillir des métriques à partir d'une application commercialisée, d'un service public ou encore d'un projet open source, nous vous recommandons de [créer une intégration d'Agent complète][1].

La version 6.4 de l'Agent Datadog et les versions ultérieures prennent en charge la publication et les mises à jour d'intégrations indépendamment des mises à jour de l'Agent Datadog. Depuis cette version, vous pouvez facilement partager des intégrations, ce qui permet à l'ensemble de la communauté Datadog de les utiliser.

Pour découvrir comment rédiger une intégration, consultez la section [Créer une intégration][1]. Pour découvrir d'autres intégrations de la communauté, accédez au [référentiel GitHub integrations-extras][2].

## Implémentation

Commencez par vérifier que l'[Agent][3] est bien installé. Si vous avez le moindre problème pendant l'implémentation, [contactez l'assistance Datadog][4].

**Remarque** : si vous exécutez l'Agent v7+, votre check custom d'Agent doit être compatible avec Python 3. Si ce n'est pas le cas, il doit être compatible avec Python 2.7+.

## Check custom d'Agent

<div class="alert alert-warning">
  Vos fichiers de configuration et de check doivent avoir le même nom. Si votre check s'appelle <code>mycheck.py</code>, votre fichier de configuration <em>doit</em> s'appeler <code>mycheck.yaml</code>.
</div>

Dans cet exemple, le check custom renvoie la valeur `1` pour la métrique `hello.world`. Le fichier de configuration n'inclut aucune information précise, mais il doit comprendre une séquence `instances` comprenant au moins un mappage, qui peut être vide. Voici ce qui est indiqué dans le fichier `conf.d/hello.yaml` :

```yaml
instances: [{}]
```

Le check hérite des valeurs de `AgentCheck` et envoie un gauge de valeur `1` pour `hello.world` sur chaque appel. Voici ce qui est indiqué dans le fichier `checks.d/hello.py` :

{{< code-block lang="python" filename="hello.py" >}}
# le bloc try/except suivant rend le check custom compatible avec toutes les versions de l'Agent
try:
    # essayer d'abord d'importer la classe de base à partir des nouvelles versions de l'Agent…
    from datadog_checks.base import AgentCheck
except ImportError:
    # …si la commande ci-dessous échoue, le check est alors exécuté avec l'Agent version < 6.6.0
    from checks import AgentCheck

# Le contenu de la variable spéciale __version__ sera indiqué dans la page de statut de l'Agent
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

Pour en savoir plus sur l'interface fournie par la classe de base, consultez la [documentation relative à l'API][5].

**Remarque** : lors de la sélection d'un nom pour votre check custom, ajoutez `custom_` en préfixe afin d'éviter tout conflit avec un nom d'intégration de l'Agent Datadog existante. Par exemple, si vous rédigez un check custom Postfix, nommez votre fichiers de check `custom_postfix.py` et `custom_postfix.yaml`, et non `postfix.py` et `postfix.yaml`.

### Intervalle de collecte

Pour modifier l'intervalle de collecte de votre check, utilisez le paramètre `min_collection_interval` du fichier de configuration. Par défaut, sa valeur est définie sur `15`, ce qui signifie que la méthode `check` de votre classe est invoquée à la même intervalle que le reste des intégrations sur l'Agent.

**Remarque** : le paramètre `min_collection_interval` est disponible pour les intégrations personnalisées et standard.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
Pour la version 6 de l'Agent, `min_collection_interval` doit être ajouté au niveau des instances et configuré individuellement pour chaque instance.

```yaml
init_config:

instances:
  - min_collection_interval: 30
```

{{% /tab %}}
{{% tab "Agent v5" %}}
Pour la version 5 de l'Agent, `min_collection_interval` doit être ajouté dans la section `init_config` afin de définir la fréquence d'exécution globale du check.

```yaml
init_config:
  min_collection_interval: 30

instances: [{}]
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si le paramètre `min_collection_interval` est défini sur `30`, cela ne signifie pas que la métrique est recueillie toutes les 30 secondes, mais plutôt qu'il s'agit de la fréquence de collecte optimale. Le collecteur essaiera d'exécuter le check toutes les 30 secondes, mais il est possible que celui-ci soit mis en attente, en fonction du nombre d'intégrations activées sur le même Agent. De plus, si la méthode `check` dure plus de 30 secondes, l'Agent identifie que le check est toujours en cours d'exécution et annule son exécution jusqu'au prochain intervalle.

## Vérifier votre check

Pour vérifier que votre check s'exécute, utilisez la commande suivante :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

```shell
sudo -u dd-agent -- datadog-agent check <NOM_CHECK>
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent -- dd-agent check <NOM_CHECK>
```

{{% /tab %}}
{{< /tabs >}}

Après avoir vérifié que le check s'exécute, redémarrez l'Agent afin d'inclure le check et de commencer à transmettre des données à Datadog.

## Écrire un check qui exécute des programmes en ligne de commande

Vous pouvez créer un check custom qui exécute un programme en ligne de commande et enregistrer son résultat sous la forme d'une métrique custom. Par exemple, un check peut exécuter la commande `vgs` afin de renvoyer des informations sur des groupes de volumes. Une fonction wrapper est fournie par souci de commodité afin d'éviter que le code réutilisable exécute un autre processus et recueille sa sortie et son code de sortie.

Pour exécuter un sous-processus au sein d'un check, utilisez la [fonction `get_subprocess_output()`][6] du module `datadog_checks.base.utils.subprocess_output`. La commande et ses arguments sont transmis à `get_subprocess_output()` sous la forme d'une liste. La commande et chacun de ses arguments constituent des chaînes de caractères au sein de la liste. Par exemple, cette commande saisie dans l'invite de commande :

```text
$ vgs -o vg_free
```

doit être transmise à `get_subprocess_output()` comme suit :

```python
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
```

<div class="alert alert-warning">
    Étant donné que l'interpréteur Python qui exécute les checks est intégré à l'environnement d'exécution Go multithread, les modules <code>subprocess</code> ou <code>multithreading</code> de la bibliothèque Python standard <em>ne sont pas pris en charge</em> dans la version 6 et les versions ultérieures de l'Agent.
</div>

Lorsque le programme en ligne de commande s'exécute, le check enregistre la même sortie que s'il était exécuté sur la ligne de commande dans le terminal. Il est important d'effectuer un traitement des chaînes de caractères pour la sortie et d'utiliser `int()` ou `float()` sur le résultat, afin d'obtenir une valeur numérique.

Si vous n'effectuez pas de traitement des chaînes de caractères pour la sortie du sous-processus, ou si celle-ci ne correspond pas à un nombre entier ou à une valeur de type float, le check s'exécute sans erreur mais ne renvoie aucune donnée.

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/integrations/new_check_howto/
[2]: https://github.com/DataDog/integrations-extras
[3]: http://app.datadoghq.com/account/settings#agent
[4]: /fr/help/
[5]: https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck
[6]: https://datadog-checks-base.readthedocs.io/en/latest/datadog_checks.utils.html#module-datadog_checks.base.utils.subprocess_output