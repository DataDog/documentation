Si le package de votre application est généré avec setuptools :

1. Installez le [package `dd-trace`](https://github.com/DataDog/dd-trace-py).
1. Ajoutez `import ddtrace.sourcecode.setuptools_auto` en tant que première importation dans le fichier `setup.py`.
1. Définissez la variable d'environnement `DD_MAIN_PACKAGE` sur le nom du principal package Python.

Si vous utilisez un fichier unifié contenant les paramètres du projet Python pour votre application :

1. Installez le plug-in `hatch-datadog-build-metadata` et configurez-le de façon à intégrer les métadonnées git. Si un projet contient déjà des URL, reconfigurez-les afin d'utiliser des URL dynamiques, puis déplacez-les vers une autre section de configuration. Pour en savoir plus, consultez le [code source du plug-in](https://github.com/DataDog/hatch-datadog-build-metadata#readme).
1. Définissez la variable d'environnement `DD_MAIN_PACKAGE` sur le nom du principal package Python.
