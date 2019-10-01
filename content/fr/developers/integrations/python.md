---
title: Environnement Python pour le développement d'intégrations avec l'Agent
kind: documentation
---

Ce document aborde la configuration d'un environnement Python permettant de travailler sur des intégrations basées sur l'Agent, y compris l'installation de l'interpréteur et la vérification de la présence de toutes les dépendances requises.

## Python 2 ou 3

Les intégrations s'exécutent soit dans l'environnement Python intégré de l'Agent, soit dans l'environnement de test. La version actuelle de l'environnement intégré est enregistrée dans le [code Omnibus][1]. Les environnements de l'Agent et de test sont en Python 2, mais une mise à niveau éventuelle vers Python 3 est inévitable. Les nouvelles intégrations doivent donc être compatibles avec les deux versions.

## Installation de Python

De nombreux systèmes d'exploitation sont livrés avec Python pré-installé. Si votre système Python est trop vieux, ou s'il n'est pas pré-installé, vous devez installer une version appropriée. L'installation et la maintenance de Python dans chaque système d'exploitation ne font pas abordées dans ce document. Des pointeurs sont néanmoins fournis pour vous aider.

### macOS

Toutes les versions récentes de macOS sont livrées avec Python pré-installé. Sa version peut toutefois être plus ancienne que celle utilisée par l'Agent. Il se peut également que vous ne disposiez pas de tous les outils et de toutes les dépendances nécessaires. Vous devez installer un nouvel interpréteur Python. Vous n'avez *pas* besoin de passer par l'App Store pour y parvenir.

Options disponibles :

* [[Homebrew][2]]: Follow the "[Doing it Right][3]" instructions.
* [[Miniconda][4]]: Follow the "[Conda installation][5]" instructions.

Il est conseillé d'installer un [gestionnaire d'environnement][6] pour préserver un système Python sain.

### Linux

Toutes les distributions populaires de Linux sont livrées avec Python pré-installé, et probablement avec une version acceptable. Il est recommandé d'installer un [gestionnaire d'environnement][6] pour préserver un système Python sain. Consultez la documentation relative à la gestion de paquet de votre distribution pour en savoir plus.

### Windows

Windows ne dispose généralement pas d'un environnement Python. La [documentation Python officielle][7] contient des instructions d'installation détaillées et des liens vers des outils et des articles supplémentaires.

## Gestionnaire d'environnement virtuel

Chaque intégration possède son propre ensemble de dépendances qui doit être ajouté à Python pour exécuter les tests ou tout simplement pour tester le code de collecte. Pour éviter d’encombrer votre installation Python avec des bibliothèques et des paquets qui utilisés par une seule intégration, utilisez un « environnement virtuel ». Un environnement virtuel est une arborescence de répertoire autonome qui contient une installation Python isolée. Lorsqu'un environnement virtuel est actif, chaque paquet que vous installez est stocké dans ce répertoire sans affecter la globalité de l'installation Python.

### Virtualenv et Virtualenvwrapper

Datadog recommande l'utilisation de [Virtualenv][8] pour gérer les environnements virtuels Python et de [virtualenvwrapper][9] pour faciliter le processus. Vous trouverez un [guide complet][10] dans le Hitchhiker's Guide to Python (en anglais), qui explique comment configurer ces deux outils.

### Miniconda

Miniconda dispose d'outil de gestion des environnements virtuels. Consultez le [guide officiel][11] pour en savoir plus.

[1]: https://github.com/DataDog/omnibus-software/blob/master/config/software/python.rb#L21
[2]: https://brew.sh/#install
[3]: https://docs.python-guide.org/en/latest/starting/install/osx/#doing-it-right
[4]: https://repo.continuum.io/miniconda/Miniconda2-latest-MacOSX-x86_64.sh
[5]: https://conda.io/docs/user-guide/install/macos.html
[6]: #virtual-environment-manager
[7]: https://docs.python.org/2.7/using/windows.html
[8]: https://pypi.python.org/pypi/virtualenv
[9]: https://virtualenvwrapper.readthedocs.io/en/latest/index.html
[10]: https://docs.python-guide.org/en/latest/dev/virtualenvs/#lower-level-virtualenv
[11]: https://conda.io/docs/user-guide/tasks/manage-environments.html
