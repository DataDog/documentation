---
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: Documentation
  text: Upgrade vers l'Agent v7
- link: /agent/guide/agent-v6-python-3/
  tag: Documentation
  text: Utiliser Python 3 avec l'Agent v6 de Datadog
title: Migration de checks custom vers Python 3
---

<div class="alert alert-info">
Seul l'Agent v7+ prend en charge l'exécution de checks custom en Python 3 par défaut. <a href="/agent/versions/upgrade_to_agent_v7">Passez à la dernière version de l'Agent</a> pour exécuter vos checks custom en Python 3 nativement. Si vous utilisez l'Agent v6.14+ et que vous souhaitez vérifier si vos checks custom sont compatibles sans mettre à jour l'Agent, vous pouvez également <a href="/agent/guide/agent-v6-python-3">activer le runtime Python 3</a>.
</div>

## Présentation

Ce guide fournit des informations sur la migration des checks entre Python 2 et 3, ainsi que les meilleures pratiques à adopter. Utilisez l'outil [de compatibilité de check custom][1] de Datadog pour découvrir si vos checks custom sont compatibles avec Python 3, ou s'ils doivent être migrés.

Ce guide tente de maintenir la rétrocompatibilité de vos checks custom en permettant au code de s'exécuter sur plusieurs versions de l'Agent pour plus de flexibilité.

## Éditeurs et outils

### Pylint

Pylint est doté de fonctions qui vous permettent de [vérifier si vos checks custom sont compatibles avec Python 3][2].

#### Installation

Commencez par l'installer sur Python 2 avec [pip][3] :

```bash
$ python2 -m pip install pylint
```

Remplacez `python2` dans la commande ci-dessus si le chemin vers votre interpréteur Python 2 est différent.

#### Utilisation

Exécutez la commande `pylint` pour vérifier que votre check custom ou votre intégration personnalisée fonctionne sur Python 3. Remplacez `CHECK` par un chemin valide menant vers un module Python ou un dossier de paquet :

```bash
$ python2 -m pylint -sn --py3k CHECK
```

Par exemple :

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
************* Module my-check
E:  4, 4: print statement used (print-statement)
W:  7,22: Calling a dict.iter*() method (dict-iter-method)
W:  9, 8: division w/o __future__ statement (old-division)
```

Après avoir résolu les problèmes de compatibilité, la même commande ne renvoie plus rien :

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
$ 
```

Bien que `pylint` détecte tout problème susceptible d'empêcher l'interpréteur Python 3 d'exécuter du code, il ne peut pas vérifier la validité logique. Une fois les modifications de code effectuées, veillez à exécuter le check et à valider la sortie.

### 2to3

[2to3][4] convertit le code Python 2 en code Python 3. Si vous possédez un check custom intitulé `foo.py`, exécutez 2to3 :

```bash
$ 2to3 foo.py
```

L'exécution de 2to3 permet de visualiser les différences par rapport au fichier source d'origine. Pour en savoir plus sur 2to3, consultez la [documentation 2to3 officielle][4] (en anglais).

### Éditeurs

La plupart des EDI et des éditeurs modernes fournissent automatiquement des fonctionnalités avancées de linting. Assurez-vous qu'ils se basent sur un exécutable Python 3 afin que, lorsque vous ouvrez un ancien fichier uniquement compatible avec Python 2, les erreurs ou avertissements de linting apparaissent sur le côté sous la forme d'une coche colorée dans [PyCharm][5] ou d'une case cliquable en bas de [Visual Studio Code][6].

## Migration de Python

### Importations de packages

Pour normaliser l'espace de nommage des paquets Datadog avec Python 3, toutes les ressources résident dans le sous-paquet de base. Par exemple :

```python
from datadog_checks.checks import AgentCheck
```

devient

```python
from datadog_checks.base.checks import AgentCheck
```

### Six

[Six][7] est une bibliothèque de compatibilité pour Python 2 et 3 qui permet aux développeurs de produire du code Python compatible avec Python 2 et 3. Certains des exemples ci-dessous utilisent Six pour rendre de l'ancien code Python 2 compatible avec Python 3.

### Méthodes de dictionnaire

Les méthodes `dict.iterkeys()`, `dict.iteritems()` et `dict.itervalues()` ne sont pas disponibles en Python 3.

| Python 2                                                         | Python 2 et 3                                                                                         |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `for key in mydict.iterkeys():` <br/> &nbsp;&nbsp;`  ...`        | `for key in mydict:`<br/> &nbsp;&nbsp;`  ...`                                                          |
| `for key, value in mydict.iteritems():`<br/> &nbsp;&nbsp;`  ...` | `from six import iteritems` <br/><br/> `for key, value in iteritems(mydict):`<br/> &nbsp;&nbsp;`  ...` |
| `for value in mydict.itervalues():`<br/> &nbsp;&nbsp;`  ...`     | `from six import itervalues` <br/><br/> `for value in itervalues(mydict):`<br/> &nbsp;&nbsp;`  ...`    |

De plus, en Python 3, les méthodes `dict.keys()`, `dict.items()` et `dict.values()` renvoient des itérateurs. Par conséquent, si le dictionnaire doit être modifié lors de l'itération, effectuez d'abord une copie de celui-ci. Pour récupérer les clés, éléments et valeurs sous forme de liste :

| Python 2                        | Python 2 et 3                       |
|---------------------------------|--------------------------------------|
| `mykeylist = mydict.keys()`     | `mykeylist = list(mydict)`           |
| `myitemlist = mydict.items()`   | `myitemlist = list(mydict.items())`  |
| `myvaluelist = mydict.values()` | `myvaluelist = list(mydict.values()` |

La méthode `dict.has_key()` est obsolète en Python 2 et n'existe plus en Python 3. Utilisez plutôt l'opérateur `in`.

| Python 2                             | Python 2 et 3  |
|--------------------------------------|-----------------|
| `mydict.has_key('foo') //obsolète` | `foo in mydict` |

### Modifications de la bibliothèque standard

Python 3 propose une bibliothèque standard réorganisée dans laquelle plusieurs modules et fonctions ont été renommés ou déplacés. L'importation de modules déplacés avec la commande `six.moves` fonctionne sur les deux versions de Python.

| Python 2            | Python 3             | Python 2 et 3                      |
|---------------------|----------------------|-------------------------------------|
| `import HTMLParser` | `import html.parser` | `from six.moves import html_parser` |

Consultez la [documentation Six][7] (en anglais) pour obtenir la liste des modules renommés. **Remarque** : les modules `urllib`, `urllib2` et `urlparse` ont été fortement réorganisés.

### Unicode

Python 2 traite le texte Unicode et les données codées en binaire de la même manière. Il tente d'effectuer les conversions entre octets et chaînes de façon automatique. Ce processus fonctionne tant que tous les caractères sont en ASCII, mais engendre un comportement inattendu lorsqu'il rencontre des caractères non ASCII.

| type    | Valeur littérale | Python 2 | Python 3 |
|---------|---------|----------|----------|
| octets   | b'...'  | binaire   | binaire   |
| chaîne     | '...'   | binaire   | texte     |
| unicode | u'...'  | texte     | texte     |

Les données de texte représentent des points de code Unicode. Pour leur stockage ou leur transmission, vous devez encoder avec la fonction `.encode(encoding)`. Les données binaires représentent des points de code encodés présentés sous forme de séquence d'octets. Elles doivent être décodées avec `.decode(encoding)` afin d'obtenir du texte. Lors de la lecture de texte dans un fichier, la fonction `open` du paquet `io` s'avère très utile, car les données lues sont déjà décodées en Unicode :

```python
from io import open

f = open('textfile.txt', encoding='utf-8')
contents = f.read()  # le contenu sera décodé en unicode en utilisant ‘utf-8’ ; ce ne sont pas des octets !
```

Consultez l'article [Pragmatic Unicode][8] de Ned Batchelder (en anglais) pour en savoir plus.

### Print

En Python 3, print est explicitement traité comme une fonction. Pour que print soit considéré comme une fonction quelle que soit la version de Python, ajoutez `from __future__ import print_function` en haut de vos fichiers utilisant l’ancienne instruction de print, et ajoutez des parenthèses pour effectuer l’appel de la fonction.

| Python 2      | Python 2 et 3                                                    |
|---------------|-------------------------------------------------------------------|
| `print "foo"` | `from __future__ import print_function` <br/><br/> `print("foo")` |

### Division de nombres entiers

En Python 2, l'opérateur `/` effectue une division euclidienne de nombres entiers.

#### Python 2

```python
>> 5/2
2
```

En Python 3, l'opérateur `/` effectue une division réelle (sans reste), tandis que l'opérateur `//` effectue une division euclidienne.

#### Python 3

```python
>> 5/2
2.5
>> 5//2
2
```

Pour reproduire le même comportement que pour Python 3, quelle que soit la version de Python, ajoutez `from __future__ import division` en haut de vos fichiers utilisant la fonction de division, et utilisez `//` pour effectuer une division euclidienne.

### Arrondi

En Python 2, la bibliothèque standard arrondit les nombres de façon arithmétique (arrondi supérieur si le chiffre vaut au moins 5). À l'inverse, Python 3 arrondit les nombres au chiffre pair le plus proche.

#### Python 2

```python
>> round(2.5)
3
>> round(3.5)
4
```

#### Python 3

```python
>> round(2.5)
2
>> round(3.5)
4
```

Datadog fournit une fonction pratique, `round_value`, dans `datadog_checks_base`. Celle-ci permet la réplication du comportement de Python 2 à la fois en Python 2 et 3.

### Exceptions

Python 3 propose une syntaxe différente pour les except et les raise.

| Python 2                                                                                     | Python 2 et 3                                                                                 |
|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception, variable:` <br/> &nbsp;&nbsp; `...` | `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception as variable:` <br/> &nbsp;&nbsp; `...` |
| `raise Exception, args`                                                                      | `raise Exception(args)`                                                                        |

### Importations relatives

En Python 3, les importations relatives doivent être effectuées de façon explicite, en utilisant un point (`.`).

Imaginons un paquet structuré comme suit :

```text
mypackage/
    __init__.py
    math.py
    foo.py
```

Supposons également que `math.py` contient une fonction `gcd` (qui contient des subtilités distinctes provenant de la fonction `gcd` du module `math` de la bibliothèque standard) et que vous souhaitez utiliser la fonction `gcd` de votre paquet local, et non celle de la bibliothèque standard.

En Python 2, si vous vous situez au sein d'un paquet, ses propres modules ont priorité sur les modules globaux. `from math import gcd` permet d'importer le `gcd` de `monpaquet/math.py`.

En Python 3, les formulaires d'importation ne commençant pas par `.` sont interprétés comme des importations absolues. `from math import gcd` permet d'importer le `gcd` de la bibliothèque standard.

| Python 2               | Python 2 et 3          |
|------------------------|-------------------------|
| `from math import gcd` | `from .math import gcd` |

Ou, pour plus de lisibilité :

| Python 2               | Python 2 et 3                   |
|------------------------|----------------------------------|
| `from math import gcd` | `from mypackage.math import gcd` |

### Itérateurs

Plusieurs fonctions renvoyant des listes en Python 2 renvoient des itérateurs en Python 3. Il s'agit notamment des fonctions `map`, `filter` et `zip`.

Pour conserver facilement le comportement de Python 2, la solution la plus simple consiste à envelopper ces fonctions à l'aide d'un appel à `list` :

| Python 2                         | Python 2 et 3                         |
|----------------------------------|----------------------------------------|
| `map(myfunction, myiterable)`    | `list(map(myfunction, myiterable))`    |
| `filter(myfunction, myiterable)` | `list(filter(myfunction, myiterable))` |
| `zip(myiterable1, myiterable2)`  | `list(zip(myiterable1, myiterable2))`  |

La fonction `xrange` a été supprimée dans Python 3. À la place, la fonction `range` renvoie un objet `range` itératif. Importez `range` avec `from six.moves import range`.

Utilisez la fonction `next` intégrée au lieu d'appeler la méthode `next`. Par exemple, remplacez `iterator.next()` par `next(iterator)`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/compatibility_check
[2]: https://portingguide.readthedocs.io/en/latest/tools.html#automated-checker-pylint-py3k
[3]: https://pip.pypa.io/en/stable/installing
[4]: https://docs.python.org/3.1/library/2to3.html
[5]: https://www.jetbrains.com/help/pycharm/install-and-set-up-pycharm.html
[6]: https://code.visualstudio.com/docs/setup/setup-overview
[7]: https://six.readthedocs.io
[8]: https://nedbatchelder.com/text/unipain.html