---
title: Dogstream
kind: guide
private: true
aliases:
  - /fr/agent/faq/dogstream
---
<div class="alert alert-danger">
Dogstream est une fonctionnalité de l'Agent 5 dorénavant obsolète. Elle ne fera l'objet d'aucune mise à jour.
<br>
L'Agent v6 est maintenant disponible ! <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">Passez à la nouvelle version</a> pour bénéficier des nouvelles fonctionnalités.
</div>

Les fichiers de log contiennent une multitude de données précieuses sur vos applications et vos opérations.
Malheureusement, ces fichiers de log étant bien souvent laissés à l'abandon, l'utilité des données qu'ils contiennent n'est que rarement reconnue. Grâce à sa fonctionnalité de parsing des métriques et des événements en provenance des logs, l'Agent Datadog peut vous aider à remédier à ce problème en représentant graphiquement les données en temps réel et en continu.

## Parsing de métriques

L'Agent Datadog peut analyser les métriques issues de vos fichiers de log :

- à partir du format de log canonique de Datadog, sans programmation supplémentaire
- à partir de n'importe quel autre format de log, avec une fonction de parsing de log personnalisée

### Format de log canonique de Datadog

Les logs Datadog sont formatés comme suit :

    metric unix_timestamp value [attribute1=v1 attributes2=v2 ...]

Par exemple, imaginons que le contenu de `/var/log/web.log` est :

    me.web.requests 1320786966 157 metric_type=counter unit=request
    me.web.latency 1320786966 250 metric_type=gauge unit=ms

Pour que Datadog soit en mesure de lire les métriques, il vous suffit d'ajouter cette ligne au fichier de configuration de votre Agent (généralement `/etc/dd-agent/datadog.conf`) :

    dogstreams: /var/log/web.log

Vous pouvez également spécifier plusieurs fichiers de log de cette manière :

    dogstreams: /var/log/web.log, /var/log/db.log, /var/log/cache.log

### Parsing de formats de log personnalisés

Si vous souhaitez parser un format de log différent, par exemple pour un logiciel tiers ou obsolète, vous pouvez utiliser une fonction Python personnalisée pour extraire les champs appropriés du log. Pour ce faire, spécifiez votre fichier de log dans le fichier de configuration de votre Agent au format suivant :

    dogstreams: /var/log/web.log:parsers:parse_web

`parsers:parse_web` indique que la fonction Python personnalisée se trouve dans un paquet appelé `parsers` dans le `PYTHONPATH` de l'Agent, et que le paquet `parsers` a une fonction appelée `parse_web`. Le `PYTHONPATH` de l'Agent est défini dans le script de démarrage de l'Agent, `/etc/init.d/datadog-agent`, dans la configuration du superviseur pour la version de l'Agent.

Si le parser ne se trouve **pas** dans le `PYTHONPATH` de l'Agent, vous pouvez utiliser une autre syntaxe pour configurer votre parser de ligne :

    dogstreams: /chemin/vers/log1:/chemin/vers/mon/module_parsing.py:custom_parser

Dans ce format, l'Agent tente d'importer une fonction appelée `custom_parser` à partir de `/chemin/vers/mon/parsers_module.py`.

Si votre parser de log personnalisé ne fonctionne pas, vérifiez tout d'abord les logs du Collector de l'Agent :

* Si l'Agent n'est pas en mesure d'importer votre fonction, recherchez `Could not load Dogstream line parser`.

* Si tout fonctionne comme prévu, vous devriez voir `dogstream: parsing {nom du fichier} with {nom de la fonction} (requested {texte option de configuration})`.

<div class="alert alert-warning">
Pour vérifier que les dogstreams fonctionnent, ajoutez une ligne (ne modifiez pas une ligne existante) à n'importe quel fichier de log surveillé par l'Agent. L'Agent surveille uniquement la fin de chaque fichier de log et ne remarquera donc pas les modifications effectuées ailleurs dans le fichier.
</div>

### Rédaction de fonctions de parsing

Les fonctions de parsing personnalisées doivent :

- accepter deux paramètres : un objet logger Python (pour le debugging) et un paramètre de chaîne spécifiant la ligne à parser.
- renvoyer un tuple ou une liste de tuples sous la forme :

     `(metric (str), timestamp (unix timestamp), value (float), attributes (dict))`

    Les attributs doivent au minimum comprendre la clé metric_type, qui spécifie si la métrique donnée est de type counter ou gauge.

    Si la ligne ne correspond pas, la valeur renvoyée doit être `None`.

### Collecte de métriques

Imaginons que vous recueillez des métriques à partir de logs qui ne sont pas formatés canoniquement, mais intelligemment délimités par un caractère unique. Les logs se présentent de la manière suivante :

```text
user.crashes|2016-05-28 20:24:43.463930|24|LotusNotes,Outlook,Explorer
```

Vous pouvez définir un parser de log comme suit afin de recueillir une métrique à partir des données loguées dans votre compte Datadog :

```python

import time
from datetime import datetime
...
def my_log_parser(logger, test):
    metric_name, date, metric_value, extras = line.split('|')
    # Convertir la date ISO 8601 en timestamp Unix, en supposant que la chaîne du timestamp
    # est dans le même fuseau horaire que la machine qui effectue le parsing.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    tags = extras.split(',')
    date = time.mktime(date.timetuple())
    metric_attributes = {
        'tags': tags,
        'metric_type': 'gauge',
    }
    return (metric_name, date, metric_value, metric_attributes)
```

Ensuite, modifiez votre fichier `datadog.conf` en ajoutant l'option dogstream comme suit :

```text
dogstreams: /chemin/vers/monfichier.log:/chemin/vers/mylogparser.py:my_log_parser
# (Remarque : si vous utilisez Windows, remplacez chaque / par la séquence d'échappement \\)
```

Cet exemple permettrait de recueillir une métrique de type gauge appelée user.crashes avec une valeur égale à 24, les noms des trois applications étant ajoutés sous forme de tag à la fin.

Avertissement : le nombre de fois qu'une même métrique peut être recueillie à chaque analyse du fichier de log est limité. En effet, l'Agent écrase une métrique loguée dès que la même métrique est à nouveau recueillie, même si ses attributs (comme ses tags) sont différents. Ce problème ne se présente pas lorsque les métriques recueillies à partir des logs ont des timestamps suffisamment différents, mais il est généralement conseillé de recueillir chaque métrique toutes les 10 secondes environ. Les métriques recueillies sous des noms différents ne sont pas écrasées.

## Parsing d'événements

Le parsing d'événement se fait via les mêmes fonctions de parsing personnalisées que celles décrites ci-dessus, à une exception près : si votre fonction de parsing personnalisée renvoie un `dict` (ou une `list` de `dict`), Datadog la traite comme un événement, et non comme une métrique.

Les champs d'événement sont les suivants (en gras si obligatoires) :

| Champ           | Type        | Valeur                                                                                                                                                                                                                             |
|-----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **msg_title**   | Chaîne      | Titre de l'événement, indexé par notre recherche de texte intégral.                                                                                                                                                                         |
| **timestamp**   | Nombre entier     | Timestamp selon l'epoch Unix. En cas d'omission, la valeur par défaut est l'heure à laquelle l'Agent a parsé l'événement.                                                                                                                                        |
| **msg_text**    | Chaîne      | Corps de l'événement, indexé par notre recherche de texte intégral.                                                                                                                                                                           |
| alert_type      | Énumération de chaînes | Indique la gravité de l'événement. Valeurs possibles : `error`, `warning`, `success` ou `info`. En cas d'omission, la valeur par défaut est `info`. Peut être recherché avec `alert_type:valeur`                                                                  |
| event_type      | Chaîne      | Décrit le type d'événement dont il s'agit. Utilisé pour générer la clé d'agrégation                                                                                                                                                         |
| aggregation_key | Chaîne      | Décrit les éléments affectés par cet événement, le cas échéant. Utilisé pour générer la clé d'agrégation                                                                                                                                              |
| host            | Chaîne      | Nom du host à l'origine de l'événement. L'événement reçoit automatiquement les tags que vous avez donnés au host en utilisant la [page de tagging][1]ou l'[API de tagging][2]. La valeur du host est utilisée pour générer la clé d'agrégation. |
| **priority**    | Chaîne      | Détermine si l'événement est visible ou masqué par défaut dans le flux. Valeurs possibles : `low` ou `normal`                                                                                                                      |

Les événements ayant la même clé d'agrégation sur une période de 24 heures sont regroupés sur le flux.
La clé d'agrégation est une combinaison des champs suivants :

- event_type
- aggregation_key
- host

Pour obtenir un exemple de parser d'événements, découvrez notre [parser d'événements de compactage Cassandra][3] livré avec l'Agent.

### Collecte d'événements

Imaginons que vous souhaitez recueillir des événements à partir de logs auxquels vous pouvez ajouter toutes sortes d'informations pertinentes. Ces logs sont intelligemment délimités par un caractère unique et se présentent de la façon suivante :

```text
2016-05-28 18:35:31.164705|Crash_Report|Windows95|A terrible crash happened!|A crash was reported on Joe M's computer|LotusNotes,Outlook,InternetExplorer
```

Vous pouvez définir un parser de log comme suit afin de créer un événement à partir des données loguées dans votre [flux d'événements][4] Datadog :

```python

import time
from datetime import datetime
...
def my_log_parser(logger, line):

    # Décomposer la ligne en champs
    date, report_type, system, title, message, extras = line.split('|')
    # Décomposer les extras en tags
    tags = extras.split(',')
    # Convertir la date ISO 8601 en timestamp Unix, en supposant que la chaîne timestamp
    # est dans le même fuseau horaire que la machine qui effectue son parsing.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    date = time.mktime(date.timetuple())
    logged_event = {
        'msg_title': title,
        'timestamp': date,
        'msg_text': message,
        'priority': 'normal',
        'event_type': report_type,
        'aggregation_key': system,
        'tags': tags,
        'alert_type': 'error'
    }
    return logged_event
```

Ensuite, modifiez votre fichier `datadog.conf` en ajoutant l'option dogstream comme suit :

```text
dogstreams: /chemin/vers/monfichier.log:/chemin/vers/mylogparser.py:my_log_parser
# (Remarque : si vous utilisez Windows, remplacez chaque / par la séquence d'échappement \\)
```

Cette ligne de log spécifique parsée avec ce parser génère l'événement suivant dans Datadog :

{{< img src="agent/faq/log_event_in_dd.jpg" alt="Événement de log dans Datadog" style="width:70%;">}}

## Envoyer des paramètres supplémentaires à votre fonction de parsing personnalisée

Une fois votre parser personnalisé configuré pour envoyer une métrique ou des événements à votre plateforme, votre `datadog.conf` doit contenir une ligne comme celle-ci :

```text
 dogstreams: /chemin/vers/log1:/chemin/vers/mon/parsers_module.py:custom_parser
```

Votre parser_module.py doit contenir une fonction définie comme :

```python
def custom_parser(logger, line)
```

Vous pouvez alors changer la parité de votre fonction de façon à ce qu'elle accepte des paramètres supplémentaires, comme illustré [dans cet exemple de l'Agent][5]

Ainsi, si vous modifiez votre fichier de configuration comme suit :

```text
dogstreams: /chemin/vers/log1:/chemin/vers/mon/parsers_module.py:custom_parser:customvar1:customvar2
```

Et votre fonction de parsing comme suit :

```python
def custom_parser(logger, line, parser_state, *parser_args):
```

Vous obtenez un paramètre tuple dans **parser_args** sous la forme de (customvar1, customvar2), prêt à être utilisé dans votre code à l'aide de parser_args[0] et parser_args[1].

**Remarque** : le paramètre **parser_state** est facultatif, mais il doit figurer dans la signature de la fonction. Si vous avez un seul paramètre, vous devez utiliser **parser_args[1]** pour le récupérer.

Par exemple, si vous utilisez le même parser que dans la documentation mais qu'au lieu d'extraire le nom de la métrique à partir du log, vous souhaitez le définir à l'aide de ce paramètre :

Votre fichier de configuration contiendrait alors ceci :

```text
dogstreams: /Users/Documents/Parser/test.log:/Users/Documents/Parser/myparser.py:parse_web:logmetric
```

## Dépannage

Personne n'étant à l'abri d'un bug, il est très important de pouvoir voir le traceback de vos parsers de log. Cela est possible si le niveau des [logs de votre Agent][6] est défini sur « DEBUG ». Le niveau de log de l'Agent peut être défini dans `datadog.conf` en supprimant la mise en commentaire de [cette ligne][7] et en la modifiant, puis en [redémarrant l'Agent][8]. Une fois ces modifications effectuées, le traceback associé aux erreurs dans votre parser de log personnalisé se trouvera dans le fichier *collector.log* ([lisez cet article pour savoir où se trouvent les logs de votre Agent][6]). Ce traceback comprend généralement la chaîne checks.collector(datadog.py:278) | Error while parsing line in them ([le code de l'Agent où l'erreur sera probablement générée se trouve ici][9]).

Notez que lorsque vous modifiez votre parser de log personnalisé, vous devez [redémarrer l'Agent][8] pour appliquer vos modifications.

Si vous pensez que l'erreur n'est pas liée à la fonction de votre parser de log personnalisé, n'hésitez pas à [contacter l'assistance][10]. Toutefois, commencez par définir le niveau de log sur « DEBUG » avant de lancer l'Agent quelques minutes en vous assurant que de nouveaux logs sont ajoutés à vos fichiers. Ensuite, [exécutez la commande flare][11] à partir de votre Agent. L'équipe d'assistance aura ainsi accès aux informations nécessaires pour dépanner efficacement le problème.

[1]: https://app.datadoghq.com/infrastructure#tags
[2]: /fr/api/v1/tags/
[3]: https://github.com/DataDog/dd-agent/blob/master/dogstream/cassandra.py
[4]: /fr/events/
[5]: https://github.com/DataDog/dd-agent/blob/5.13.x/checks/datadog.py#L210
[6]: /fr/agent/guide/agent-log-files/
[7]: https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L211
[8]: /fr/agent/guide/agent-commands/
[9]: https://github.com/DataDog/dd-agent/blob/5.7.x/checks/datadog.py#L278
[10]: /fr/help/
[11]: /fr/agent/troubleshooting/send_a_flare/