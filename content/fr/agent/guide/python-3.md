---
title: "Migration de check custom vers Python\_3"
kind: guide
---
## Présentation

Ce guide fournit des informations sur la migration des checks entre Python 2 et 3, ainsi que les meilleures pratiques à adopter. Utilisez l'outil [de compatibilité de check custom][11] de Datadog pour découvrir si vos checks custom sont compatibles avec Python 3, ou s'ils doivent être migrés.

Ce guide s'efforce de conserver une rétrocompatibilité, afin de gagner en flexibilité et de permettre au code de s'exécuter sur plusieurs versions de l'Agent.

## Configuration de l'Agent

Depuis la version 6.14.0, l'Agent intègre les runtimes Python 2 et Python 3. En d'autres termes, les checks de l'Agent peuvent être exécutés aussi bien avec Python 2 que Python 3, en fonction de la configuration de l'Agent.

La version 6 de l'Agent utilise par défaut le runtime Python 2. Pour passer au runtime Python 3 :

1. Définissez l'option de configuration `python_version` [dans votre fichier de configuration `datadog.yaml` ][1] :

```yaml
python_version: 3
```

2. [Redémarrez l'Agent][2].

Vous pouvez également définir la variable d'environnement `DD_PYTHON_VERSION` sur `2` ou sur `3` pour choisir le runtime Python à utiliser. Lorsque celle-ci est définie, l'option `python_version` du fichier `datadog.yaml` est ignorée.

Voici une option de configuration au niveau de l'Agent : **tous les checks Python lancés par un Agent utilisent le même runtime Python**.

### Agent conteneurisé

Les images officielles de l'Agent conteneurisé n'incluent que l'un des deux runtimes Python. Pour passer à l'autre runtime, choisissez l'image de l'Agent appropriée :

* **Runtime Python 2** : les images de la version 6 de l'Agent présentent le format suivant : `datadog/agent:<VERSION_AGENT>`, ou `datadog/agent:<VERSION_AGENT>-jmx` pour celles qui prennent en charge les checks JMX.
* **Runtime Python 3** : les images de la version 6 de l'Agent présentent le format suivant : `datadog/agent:<VERSION_AGENT>-py3`, ou `datadog/agent:<VERSION_AGENT>-py3-jmx` pour celles qui prennent en charge les checks JMX.

Par exemple, pour l'Agent conteneurisé 6.14.0, sélectionnez l'image `datadog/agent:6.14.0` ou `datadog/agent:6.14.0-jmx` afin d'utiliser le runtime Python par défaut (Python 2). Sélectionnez l'image `datadog/agent:6.14.0-py3` ou `datadog/agent:6.14.0-py3-jmx` pour utiliser le runtime Python 3.

## Éditeurs et outils

### ddev

Le package de développement de Datadog, `ddev`, est doté de fonctions vous permettant de [vérifier que vos checks custom sont compatibles avec Python 3][3].

#### Installation

Commencez par installer le kit de développement :
```bash
$ pip install "datadog-checks-dev[cli]"
```

#### Utilisation

Exécutez la commande `validate` pour vérifier que votre check custom ou votre intégration personnalisée fonctionne sur Python 3. Remplacez `CHECK` par un chemin valide menant vers un module Python ou un dossier de paquet :

```bash
$ ddev validate py3 [OPTIONS] CHECK
```

Par exemple :

```bash
$ ddev validate py3 ~/dev/my-check.py
Validating python3 compatibility of ~/dev/my-check.py...
Incompatibilities were found for ~/dev/my-check.py:
File ~/dev/my-check.py:
  Line 2, column 0: print statement used
  Line 834, column 21: division w/o __future__ statement
  Line 850, column 25: division w/o __future__ statement
```

Après avoir résolu les problèmes de compatibilité, la même commande renvoie :

```bash
$ ddev validate py3 ~/dev/my-check.py
Validating python3 compatibility of ~/dev/my-check.py…
~/dev/foo.py is compatible with python3
```

Bien que `ddev` détecte tout problème susceptible d'empêcher l'interpréteur Python 3 d'exécuter du code, il ne peut pas vérifier la validité logique. Une fois les modifications de code effectuées, veillez à exécuter le check et à valider la sortie.

Pour en savoir plus sur ddev, reportez-vous à la [documentation ddev][4].

### 2to3

[2to3][5] convertit le code Python 2 en code Python 3. Si vous possédez un check custom intitulé `foo.py`, exécutez 2to3 :


```bash
$ 2to3 foo.py
```

L'exécution de 2to3 affiche les différences par rapport au fichier source d'origine. Pour en savoir plus sur 2to3, reportez-vous à la [documentation 2to3 officielle][5].

### Éditeurs

La plupart des EDI et des éditeurs modernes fournissent automatiquement des fonctionnalités avancées de linting. Assurez-vous qu'ils sont dirigés vers un exécutable Python 3 afin que, lorsque vous ouvrez un ancien fichier uniquement compatible avec Python 2, les erreurs ou avertissements de linting apparaissent sur le côté sous la forme d'une coche colorée dans [PyCharm][6] ou sous forme de case cliquable en bas de [Visual Studio Code][7].

## Migration de Python

### Importations de paquets

Pour normaliser l'espace de nommage des paquets Datadog avec Python 3, toutes les ressources résident dans le sous-paquet de base. Par exemple :

```python
from datadog_checks.checks import AgentCheck
```

devient

```python
from datadog_checks.base.checks import AgentCheck
```

### Six

[Six][8] est une bibliothèque de compatibilité pour Python 2 et 3 permettant aux développeurs d'envoyer du code Python compatible avec Python 2 et 3. Certains des exemples ci-dessous utilisent Six pour rendre un ancien code Python 2 compatible avec Python 3.

### Méthodes de dictionnaire

Les méthodes `dict.iterkeys()`, `dict.iteritems()` et `dict.itervalues()` ne sont pas disponibles en Python 3.

| Python 2 | Python 2 et 3 |
| --- | --- |
| `for key in mydict.iterkeys():` <br/> &nbsp;&nbsp;`  ...` | `for key in mydict:`<br/> &nbsp;&nbsp;`  ...` |
| `for key, value in mydict.iteritems():`<br/> &nbsp;&nbsp;`  ...` | `from six import iteritems` <br/><br/> `for key, value in iteritems(mydict):`<br/> &nbsp;&nbsp;`  ...`|
| `for value in mydict.itervalues():`<br/> &nbsp;&nbsp;`  ...` | `from six import itervalues` <br/><br/> `for value in itervalues(mydict):`<br/> &nbsp;&nbsp;`  ...` |

De plus, en Python 3, les méthodes `dict.keys()`, `dict.items()` et `dict.values()` renvoient des itérateurs. Par conséquent, si le dictionnaire doit être modifié lors de l'itération, effectuez d'abord une copie de celui-ci. Pour récupérer les clés, éléments et valeurs sous forme de liste :

| Python 2 | Python 2 et 3 |
| --- | --- |
| `mykeylist = mydict.keys()` | `mykeylist = list(mydict)` |
| `myitemlist = mydict.items()` | `myitemlist = list(mydict.items())` |
| `myvaluelist = mydict.values()` | `myvaluelist = list(mydict.values()` |

La méthode `dict.has_key()` est obsolète en Python 2 et n'existe plus en Python 3. Utilisez plutôt l'opérateur `in`.

| Python 2 | Python 2 et 3 |
| --- | --- |
| `mydict.has_key('foo') //obsolète` | `foo in mydict` |

### Modifications de la bibliothèque standard

Python 3 propose une bibliothèque standard réorganisée dans laquelle un certain nombre de modules et de fonctions ont été renommés ou déplacés. L'importation de modules déplacés via la commande `six.moves` fonctionne sur les deux versions de Python.

| Python 2 | Python 3 | Python 2 et 3 |
| --- | --- | --- |
| `import HTMLParser` | `import html.parser` | `from six.moves import html_parser` |

Consultez la [documentation Six][9] pour obtenir la liste des modules renommés. Notez que les modules `urllib`, `urllib2` et `urlparse` ont été fortement réorganisés.

### Unicode

Python 2 traite le texte Unicode et les données codées en binaire de la même manière. Il tente d'effectuer les conversions entre octets et chaînes de façon automatique. Ce processus fonctionne tant que tous les caractères sont en ASCII, mais engendre un comportement inattendu lorsqu'il rencontre des caractères non ASCII.

| type | Valeur littérale | Python 2 | Python 3 |
| --- | --- | --- | --- |
| octets | b'...' | binaire | binaire |
| chaîne | '...' | binaire | texte |
| unicode | u'...' | texte | texte |

Les données de texte représentent des points de code Unicode. Pour leur stockage ou leur transmission, vous devez encoder avec la fonction `.encode(encoding)`. Les données binaires représentent des points de code encodés présentés sous forme de séquence d'octets. Elles doivent être décodées avec `.decode(encoding)` afin d'obtenir du texte. Lors de la lecture de texte dans un fichier, la fonction `open` du paquet `io` s'avère très utile, car les données lues sont déjà décodées en Unicode :

```python
from io import open

f = open('textfile.txt', encoding='utf-8')
contents = f.read()  # le contenu sera décodé en unicode en utilisant ‘utf-8’ ; ce ne sont pas des octets !
```

Consultez l'article [Pragmatic Unicode][10] (en anglais) de Ned Batchelder pour en savoir plus.

### Print

En Python 3, print est explicitement traité comme une fonction. Pour que print soit considéré comme une fonction quelle que soit la version de Python, ajoutez `from __future__ import print_function` en haut de vos fichiers utilisant l’ancienne instruction de print, et ajoutez des parenthèses pour effectuer l’appel de la fonction.

| Python 2 | Python 2 et 3 |
| --- | --- |
| `print "foo"` | `from __future__ import print_function` <br/><br/> `print("foo")` |


### Division des nombres entiers

En Python 2, l'opérateur `/` effectue une division euclidienne de nombres entiers.

#### Python 2 :

```
>> 5/2
2
```

En Python 3, l'opérateur `/` effectue une division réelle (sans reste), tandis que l'opérateur `//` effectue une division euclidienne.

#### Python 3 :

```
>> 5/2
2.5
>> 5//2
2
```

Pour reproduire le même comportement que pour Python 3, quelle que soit la version de Python, ajoutez `from __future__ import division` en haut de vos fichiers utilisant la fonction de division, et utilisez `//` pour effectuer une division euclidienne.

### Arrondi

En Python 2, la bibliothèque standard arrondit les nombres de façon arithmétique (arrondi supérieur si le chiffre vaut au moins 5). À l'inverse, Python 3 arrondit les nombres au chiffre pair le plus proche.

#### Python 2 :

```
>> round(2.5)
3
>> round(3.5)
4
```

#### Python 3 :

```
>> round(2.5)
2
>> round(3.5)
4
```

Datadog fournit une fonction pratique, `round_value`, dans `datadog_checks_base`. Celle-ci permet la réplication du comportement de Python 2 à la fois en Python 2 et 3.

### Exceptions

Python 3 propose une syntaxe différente pour les except et les raise.

| Python 2 | Python 2 et 3 |
| --- | --- |
| `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception, variable:` <br/> &nbsp;&nbsp; `...` | `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception as variable:` <br/> &nbsp;&nbsp; `...` |
| `raise Exception, args` | `raise Exception(args)` |


### Importations relatives

En Python 3, les importations relatives doivent être effectuées de façon explicite, en utilisant un point (`.`).

Imaginons un paquet structuré comme suit :

```
monpaquet/
    __init__.py
    math.py
    foo.py
```

Supposons également que `math.py` contient une fonction `gcd` (qui contient des subtilités distinctes provenant de la fonction `gcd` du module `math` de la bibliothèque standard) et que vous souhaitez utiliser la fonction `gcd` de votre paquet local, et non celle de la bibliothèque standard.

En Python 2, si vous vous situez au sein d'un paquet, ses propres modules ont priorité sur les modules globaux. `from math import gcd` permet d'importer le `gcd` de `monpaquet/math.py`.

En Python 3, les formulaires d'importation ne commençant pas par `.` sont interprétés comme des importations absolues. `from math import gcd` permet d'importer le `gcd` de la bibliothèque standard.

| Python 2 | Python 2 et 3 |
| --- | --- |
| `from math import gcd` | `from .math import gcd` |

Ou, pour plus de lisibilité :

| Python 2 | Python 2 et 3 |
| --- | --- |
| `from math import gcd` | `from mypackage.math import gcd` |


### Itérateurs

Plusieurs fonctions renvoyant des listes en Python 2 renvoient des itérateurs en Python 3. Il s'agit notamment des fonctions `map`, `filter` et `zip`.

Pour conserver facilement le comportement de Python 2, la solution la plus simple consiste à envelopper ces fonctions à l'aide d'un appel à `list` :

| Python 2 | Python 2 et 3 |
| --- | --- |
| `map(myfunction, myiterable)`| `list(map(myfunction, myiterable))` |
| `filter(myfunction, myiterable)` | `list(filter(myfunction, myiterable))` |
| `zip(myiterable1, myiterable2)` | `list(zip(myiterable1, myiterable2))` |

La fonction `xrange` a été supprimée en Python 3. À la place, la fonction `range` renvoie un objet `range` itératif. Importez `range` avec `from six.moves import range`.

Utilisez la fonction `next` intégrée au lieu d'appeler la méthode `next`. Par exemple, remplacez `iterator.next()` par `next(iterator)`.


[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[3]: /fr/developers/integrations/new_check_howto/#building
[4]: https://datadog-checks-base.readthedocs.io/en/latest/datadog_checks_dev.cli.html
[5]: https://docs.python.org/3.1/library/2to3.html
[6]: https://www.jetbrains.com/help/pycharm/install-and-set-up-pycharm.html
[7]: https://code.visualstudio.com/docs/setup/setup-overview
[8]: https://pythonhosted.org/six/#
[9]: https://pythonhosted.org/six/#module-six.moves
[10]: https://nedbatchelder.com/text/unipain.html
[11]: https://app.datadoghq.com/compatibility_check