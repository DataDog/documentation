---
aliases:
- /fr/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /fr/agent/faq/agent-5-custom-agent-check/
- /fr/developers/write_agent_check/
- /fr/developers/custom_checks/write_agent_check/
further_reading:
- link: /extend/
  tag: Documentation
  text: Étendre Datadog
title: Écrire un check custom d'Agent
---
## Présentation {#overview}

Cette page vous guide dans la création d'un exemple « Hello world ! » simple, sous forme de check personnalisé de l'Agent. Elle vous montre également comment modifier l'intervalle de collecte minimal pour le check.

## Configuration {#setup}

### Installation {#installation}

Avant de créer un check personnalisé de l'Agent, installez le [Datadog Agent][1].

<div class="alert alert-danger">Pour fonctionner avec la dernière version de l'Agent, votre check personnalisé de l'Agent doit être compatible avec Python 3.</div>

### Configuration {#configuration}

1. Accédez au répertoire `conf.d` sur votre système. Pour plus d'informations sur l'emplacement du répertoire `conf.d`, consultez [Fichiers de configuration de l'Agent][2].
2. Dans le répertoire `conf.d`, créez un fichier de configuration pour votre nouveau check de l'Agent. Nommez le fichier `custom_checkvalue.yaml`.
3. Modifiez le fichier pour inclure ce qui suit :
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. Créez un fichier de check dans le répertoire `checks.d`. Nommez le fichier `custom_checkvalue.py`.
   
   <div class="alert alert-info">
     <strong>Nommage de vos checks :</strong>
     <ul>
       <li>Il est conseillé de faire précéder votre check de <code>custom_</code> pour éviter les conflits avec le nom d'une intégration Datadog Agent préexistante. Par exemple, si vous avez un check personnalisé Postfix, nommez vos fichiers de check <code>custom_postfix.py</code> et <code>custom_postfix.yaml</code> au lieu de <code>postfix.py</code> et <code>postfix.yaml</code>.</li>
       <li>Les noms des fichiers de configuration et de check doivent correspondre. Si votre check s'appelle <code>custom_checkvalue.py</code>, votre fichier de configuration <i>doit</i> être nommé <code>custom_checkvalue.yaml</code>.</li>
     </ul>
   </div>
5. Modifiez le fichier pour inclure ce qui suit :
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Redémarrez l'Agent][3] et attendez qu'une nouvelle métrique nommée `hello.world` apparaisse dans le [Metrics Catalog][4].

Si vous rencontrez des problèmes pour faire fonctionner votre check personnalisé, vérifiez les autorisations du fichier. Le fichier de check doit être lisible et exécutable par l'utilisateur de l'Agent. Pour plus d'étapes de dépannage, consultez [Dépanner un check de l'Agent][7].

### Mise à jour de l'intervalle de collecte {#updating-the-collection-interval}

Pour modifier l'intervalle de collecte de votre check, utilisez le paramètre `min_collection_interval` dans votre fichier `custom_checkvalue.yaml` et spécifiez une valeur en secondes. La valeur par défaut est de 15 secondes. Vous devez ajouter le paramètre `min_collection_interval` au niveau de chaque instance. Si votre check personnalisé est configuré pour surveiller plusieurs instances, vous devez configurer l'intervalle individuellement pour chaque instance.

Définir le `min_collection_interval` sur `30` ne garantit pas que la métrique est collectée toutes les 30 secondes. Le collecteur de l'Agent tente d'exécuter le check toutes les 30 secondes, mais celui-ci peut se retrouver en file d'attente derrière d'autres intégrations et checks, selon le nombre d'intégrations et de checks activés sur le même Agent. Si une méthode `check` met plus de 30 secondes à s'exécuter, l'Agent constate que le check est toujours en cours et saute son exécution jusqu'à l'intervalle suivant.

#### Définir un intervalle de collecte {#set-a-collection-interval}

Pour une instance unique, utilisez cette configuration pour définir l'intervalle de collecte sur 30 secondes :

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

L'exemple ci-dessous montre comment modifier l'intervalle pour un check personnalisé hypothétique qui surveille un service nommé `my_service` sur deux serveurs distincts :

{{< code-block lang="yaml" >}}
init_config:

instances:
  - host: "http://localhost/"
    service: my_service
    min_collection_interval: 30

  - host: "http://my_server/"
    service: my_service
    min_collection_interval: 30
{{< /code-block >}}

### Vérification de votre check {#verifying-your-check}

Pour vérifier que votre check est en cours d'exécution, utilisez la commande suivante :

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

Après avoir vérifié que votre check est en cours d'exécution, [redémarrez l'Agent][3] pour inclure le check et commencer à rapporter des données.

## Écriture de checks qui exécutent des programmes en ligne de commande {#writing-checks-that-run-command-line-programs}

Il est possible de créer un check personnalisé qui exécute un programme en ligne de commande et capture sa sortie en tant que métrique personnalisée. Par exemple, un check peut exécuter la commande `vgs` pour rapporter des informations sur les groupes de volumes.

Étant donné que l'interpréteur Python qui exécute les checks est intégré au runtime Go multithreadé, l'utilisation des modules `subprocess` ou `multithreading` de la bibliothèque standard Python n'est pas prise en charge. Pour exécuter un sous-processus au sein d'un check, utilisez la [fonction `get_subprocess_output()`][5] du module `datadog_checks.base.utils.subprocess_output`. La commande et ses arguments sont transmis à `get_subprocess_output()` sous la forme d'une liste, avec la commande et ses arguments sous forme de chaîne au sein de la liste.

Par exemple, une commande saisie à l'invite de commande comme ceci :

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

doit être transmise à `get_subprocess_output()` comme ceci :

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

Lorsque vous exécutez le programme en ligne de commande, le check capture la même sortie que celle obtenue en ligne de commande dans le terminal. Effectuez un traitement de chaîne sur la sortie et appelez `int()` ou `float()` sur le résultat pour renvoyer un type numérique.

Si vous n'effectuez pas de traitement de chaîne sur la sortie du sous-processus, ou si elle ne renvoie pas un entier ou un nombre à virgule flottante, le check semble s'exécuter sans erreur mais ne rapporte aucune métrique ni aucun événement. Le check ne renvoie également aucune métrique ni aucun événement si l'utilisateur de l'Agent ne dispose pas des autorisations correctes sur les fichiers ou répertoires référencés dans la commande, ou des autorisations correctes pour exécuter la commande transmise en tant qu'argument à `get_subprocess_output()`.

Voici un exemple de check qui renvoie les résultats d'un programme en ligne de commande :

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Envoi de données depuis un équilibreur de charge {#sending-data-from-a-load-balancer}

Un cas d'utilisation courant pour l'écriture d'un check personnalisé de l'Agent consiste à envoyer des métriques Datadog depuis un équilibreur de charge. Avant de commencer, suivez les étapes de [Configuration](#configuration).

Pour compléter les fichiers afin d'envoyer des données depuis votre équilibreur de charge :

1. Remplacez le code dans `custom_checkvalue.py` par ce qui suit (en remplaçant la valeur de `lburl` par l'adresse de votre équilibreur de charge) :
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
import urllib2
import simplejson
from checks import AgentCheck

class CheckValue(AgentCheck):
  def check(self, instance):
    lburl = instance['ipaddress']
    response = urllib2.urlopen("http://" + lburl + "/rest")
    data = simplejson.load(response)

    self.gauge('coreapp.update.value', data["value"])
{{< /code-block >}}

1. Mettez à jour le fichier `custom_checkvalue.yaml` (en remplaçant `ipaddress` par l'adresse IP de votre équilibreur de charge) :
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - ipaddress: 1.2.3.4
{{< /code-block >}}

1. [Redémarrez votre Agent][3]. Dans la minute qui suit, vous devriez voir apparaître une nouvelle métrique dans le [Metrics Catalog][4] appelée `coreapp.update.value`, qui envoie les métriques de votre équilibreur de charge.
1. [Créez un dashboard][6] pour cette métrique.

## Gestion des versions de l'Agent {#agent-versioning}

Utilisez le bloc try/except suivant pour rendre le check personnalisé compatible avec n'importe quelle version de l'Agent :

{{< code-block lang="python" >}}
try:
    # first, try to import the base class from new versions of the Agent
    from datadog_checks.base import AgentCheck
except ImportError:
    # if the above failed, the check is running in Agent version < 6.6.0
    from checks import AgentCheck

# content of the special variable __version__ will be shown in the Agent status page
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/catalog
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /fr/dashboards/
[7]: /fr/agent/troubleshooting/agent_check_status/