---
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/python.md
title: Environnement Python pour le développement d'intégrations avec l'Agent
---
Ce document aborde la configuration d'un environnement Python permettant de travailler sur des intégrations basées sur l'Agent, y compris l'installation de l'interpréteur et la vérification de la présence de toutes les dépendances requises.

## Python 2 ou 3

Les intégrations s'exécutent soit dans l'environnement Python intégré de l'Agent, soit dans l'environnement de test. La version actuelle de l'environnement intégré est enregistrée dans le [code Omnibus][1]. Les environnements de l'Agent et de test sont en Python 2 pour l'Agent v6, et en Python 3 pour l'Agent v7. Assurez-vous que vos intégrations sont compatibles avec les deux versions.

## Installation de Python

De nombreux systèmes d'exploitation sont livrés avec Python pré-installé. Si votre système Python est trop vieux, ou s'il n'est pas pré-installé, vous devez installer une version appropriée. L'installation et la maintenance de Python dans chaque système d'exploitation ne font pas abordées dans ce document. Des pointeurs sont néanmoins fournis pour vous aider.

### macOS

Toutes les versions récentes de macOS sont livrées avec Python pré-installé. Sa version peut toutefois être plus ancienne que celle utilisée par l'Agent. Il se peut également que vous ne disposiez pas de tous les outils et de toutes les dépendances nécessaires. Vous devez installer un nouvel interpréteur Python qui peut être géré _sans_ passer par l'App Store.

Options disponibles :

- [Homebrew][2] : suivez les instructions de la section [Doing it Right][3].
- [Miniconda][4] : suivez les instructions de la section [Conda installation][5].

Nous vous conseillons d'installer un [gestionnaire d'environnement](#gestionnaire-d-environnement-virtuel) pour ne pas altérer l'installation système de Python.

### Linux

Python est pré-installé sur toutes les distributions populaires de Linux, avec probablement une version suffisamment récente. Il est conseillé d'installer un [gestionnaire d'environnement](#gestionnaire-d-environnement-virtuel) pour ne pas altérer l'installation système de Python. Consultez la documentation relative à la gestion de package de votre distribution pour en savoir plus.

### Windows

Windows ne dispose généralement pas d'un environnement Python. Consultez la section [Utiliser Python sur Windows][6] pour obtenir des instructions d'installation détaillées ainsi que des liens vers des outils et des articles supplémentaires.

## Gestionnaire d'environnement virtuel

Chaque intégration possède son propre ensemble de dépendances qui doit être ajouté à Python pour exécuter les tests ou tout simplement pour tester le code de collecte. Pour éviter d’encombrer votre installation Python avec des bibliothèques et des paquets qui utilisés par une seule intégration, utilisez un « environnement virtuel ». Un environnement virtuel est une arborescence de répertoire autonome qui contient une installation Python isolée. Lorsqu'un environnement virtuel est actif, chaque paquet que vous installez est stocké dans ce répertoire sans affecter la globalité de l'installation Python.

### Virtualenv et virtualenvwrapper

Datadog recommande l'utilisation de [Virtualenv][7] pour gérer les environnements virtuels Python et de [virtualenvwrapper][8] pour faciliter le processus. Vous trouverez un [guide complet][9] dans le Hitchhiker's Guide to Python (en anglais), qui explique comment configurer ces deux outils.

### Miniconda

Miniconda intègre un outil de gestion des environnements virtuels. Consultez la section [Gestion des environnements][10] (en anglais) pour en savoir plus.

[1]: https://github.com/DataDog/omnibus-software/blob/master/config/software/python.rb#L21
[2]: https://brew.sh/#install
[3]: https://docs.python-guide.org/en/latest/starting/install/osx/#doing-it-right
[4]: https://repo.continuum.io/miniconda/Miniconda2-latest-MacOSX-x86_64.sh
[5]: https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/install/macos.html
[6]: https://docs.python.org/2.7/using/windows.html
[7]: https://pypi.python.org/pypi/virtualenv
[8]: https://virtualenvwrapper.readthedocs.io/en/latest/index.html
[9]: https://docs.python-guide.org/en/latest/dev/virtualenvs/#lower-level-virtualenv
[10]: https://conda.io/docs/user-guide/tasks/manage-environments.html