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
## Aperçu {#overview}

Cette page vous guide à travers le processus de création d'un "Hello world!" vérification d'Agent personnalisée. Elle vous montre également comment modifier l'intervalle de collecte minimum pour la vérification.

## Configuration {#setup}

### Installation {#installation}

Avant de créer une vérification d'Agent personnalisée, installez le [Datadog Agent][1].

<div class="alert alert-danger">Pour travailler avec la dernière version de l'Agent, votre vérification d'Agent personnalisée doit être compatible avec Python 3.</div>

### Configuration {#configuration}

1. Accédez au répertoire `conf.d` sur votre système. Pour plus d'informations sur l'emplacement du répertoire `conf.d`, consultez [Fichiers de configuration de l'Agent][2].
2. Dans le répertoire `conf.d`, créez un nouveau fichier de configuration pour votre nouvelle vérification d'Agent. Nommez le fichier `custom_checkvalue.yaml`.
3. Modifiez le fichier pour inclure ce qui suit :
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. Créez un fichier de vérification dans le répertoire `checks.d`. Nommez le fichier `custom_checkvalue.py`.
   
   <div class="alert alert-info">
     <strong>Nommer vos vérifications : </strong>
     <ul>
       <li>Il est judicieux de préfixer votre vérification avec <code>custom_</code> pour éviter les conflits avec le nom d'une intégration Datadog Agent préexistante. Par exemple, si vous avez une vérification Postfix personnalisée, nommez vos fichiers de vérification <code>custom_postfix.py</code> et <code>custom_postfix.yaml</code> au lieu de <code>postfix.py</code> et <code>postfix.yaml</code>.</li>
       <li>Les noms des fichiers de configuration et de vérification doivent correspondre. Si votre vérification s'appelle <code>custom_checkvalue.py</code>, votre fichier de configuration <i>doit</i> être nommé <code>custom_checkvalue.yaml</code>.</li>
     </ul>
   </div>
5. Modifiez le fichier pour inclure ce qui suit :
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Redémarrez l'Agent][3] et attendez qu'une nouvelle métrique nommée `hello.world` apparaisse dans le [Résumé des Métriques][4].

Si vous rencontrez des problèmes pour faire fonctionner votre vérification personnalisée, vérifiez les permissions des fichiers. Le fichier de vérification doit être lisible et exécutable par l'utilisateur de l'Agent. Pour plus d'étapes de dépannage, consultez [Dépanner une vérification d'Agent][7].

### Mise à jour de l'intervalle de collecte {#updating-the-collection-interval}

Pour changer l'intervalle de collecte de votre vérification, utilisez le paramètre `min_collection_interval` dans votre fichier `custom_checkvalue.yaml` et spécifiez une valeur en secondes. La valeur par défaut est de 15 secondes. Vous devez ajouter le `min_collection_interval` au niveau d'une instance. Si votre vérification personnalisée est configurée pour surveiller plusieurs instances, vous devez configurer l'intervalle individuellement par instance.

Définir le `min_collection_interval` à `30` ne garantit pas que la métrique est collectée toutes les 30 secondes. Le collecteur de l'Agent essaie d'exécuter la vérification toutes les 30 secondes, mais la vérification peut se retrouver en attente derrière d'autres intégrations et vérifications, en fonction du nombre d'intégrations et de vérifications activées sur le même Agent. Si une méthode `check` prend plus de 30 secondes pour se terminer, l'Agent remarque que la vérification est toujours en cours d'exécution et saute son exécution jusqu'à l'intervalle suivant.

#### Définissez un intervalle de collecte {#set-a-collection-interval}

Pour une seule instance, utilisez cette configuration pour définir l'intervalle de collecte à 30 secondes :

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

L'exemple ci-dessous démontre le changement de l'intervalle pour une vérification d'Agent personnalisée hypothétique qui surveille un service nommé `my_service` sur deux serveurs distincts :

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

### Vérification de votre vérification {#verifying-your-check}

Pour vérifier que votre check s'exécute, utilisez la commande suivante :

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

Après avoir vérifié que votre vérification fonctionne, [redémarrez l'Agent][3] pour l'inclure et commencer à rapporter des données.

## Écriture de vérifications qui exécutent des programmes en ligne de commande {#writing-checks-that-run-command-line-programs}

Il est possible de créer une vérification d'Agent personnalisée qui exécute un programme en ligne de commande et capture sa sortie en tant que métrique personnalisée. Par exemple, une vérification peut exécuter la commande `vgs` pour rapporter des informations sur les groupes de volumes.

Parce que l'interpréteur Python qui exécute les vérifications est intégré dans l'environnement d'exécution Go multi-threadé, l'utilisation des modules `subprocess` ou `multithreading` de la bibliothèque standard Python n'est pas supportée. Pour exécuter un sous-processus dans une vérification, utilisez la fonction [`get_subprocess_output()`][5] du module `datadog_checks.base.utils.subprocess_output`. La commande et ses arguments sont passés à `get_subprocess_output()` sous la forme d'une liste, avec la commande et ses arguments comme une chaîne dans la liste.

Si la commande suivante est saisie dans l'invite de commandes :

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

doit être passé à `get_subprocess_output()` comme ceci :

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

Lorsque vous exécutez le programme en ligne de commande, la vérification capture la même sortie que celle obtenue en exécutant la commande dans le terminal. Effectuez un traitement de chaîne sur la sortie et appelez `int()` ou `float()` sur le résultat pour retourner un type numérique.

Si vous ne traitez pas la sortie du sous-processus, ou si celle-ci ne retourne ni un entier ni un flottant, la vérification semble s'exécuter sans erreurs mais ne rapporte aucune métrique ni aucun événement. La vérification échoue également à retourner des métriques ou des événements si l'utilisateur de l'Agent n'a pas les permissions correctes sur les fichiers ou répertoires référencés dans la commande, ou les permissions requises pour exécuter la commande passée en argument à `get_subprocess_output()`.

Voici un exemple de check qui renvoie les résultats d'un programme en ligne de commande :

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

Un cas d'utilisation courant pour écrire une vérification d'Agent personnalisée est d'envoyer des métriques Datadog depuis un équilibreur de charge. Avant de commencer, suivez les étapes dans [Configuration](#configuration).

Pour étendre les fichiers afin d'envoyer des données depuis votre équilibreur de charge :

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

1. [Redémarrez votre Agent][3]. Dans une minute, vous devriez voir une nouvelle métrique apparaître dans le [Résumé des métriques][4] appelée `coreapp.update.value` qui envoie les métriques de votre équilibreur de charge.
1. [Créez un tableau de bord][6] pour cette métrique.

## Versionnage de l'Agent {#agent-versioning}

Utilisez le bloc try/except suivant pour vous assurer que le check custom fonctionne avec n'importe quelle version de l'Agent :

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

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /fr/dashboards/
[7]: /fr/agent/troubleshooting/agent_check_status/