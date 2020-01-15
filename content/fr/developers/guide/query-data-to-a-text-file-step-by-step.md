---
title: Guide pour interroger vos données et les enregistrer dans un fichier texte
kind: guide
aliases:
  - /fr/developers/faq/query-data-to-a-text-file-step-by-step
---
Cet article explique comment configurer un environnement afin de tirer le meilleur parti de l'API Datadog. Après avoir lu ce guide, vous pourrez récupérer des événements, des métriques et des monitors depuis l'[API publique de Datadog][1] ou les enregistrer dans un fichier local.

Prérequis : Python et `pip` doivent être installés sur votre localhost. Si vous utilisez Windows, consultez la [documentation relative à Python][2].

1. Ouvrez un terminal.
2. Vérifiez le répertoire suivant : `pwd` sur macOS, ou `dir` sur Windows.
3. Créez un dossier : `mkdir <NOM_DU_DOSSIER>`.
4. Accédez au dossier : `cd <NOM_DU_DOSSIER>`.
5. Téléchargez le script [api_query_data.py][3] vers le dossier créé à l'étape 3 et modifiez-le :

    a. Remplacez `<YOUR_DD_API_KEY>` et `<YOUR_DD_APP_KEY>` par vos [clés d'API et d'application Datadog][4].

    b. Remplacez `system.cpu.idle` par la métrique que vous souhaitez récupérer. Vous pouvez consulter la liste de vos métriques sur la [page Metric Summary de Datadog][5].

    c. Vous pouvez également remplacer `*` par un host de façon à filtrer les données. Vous pouvez consulter la liste de vos hosts sur la [page Infrastructure list de Datadog][6].

    d. Vous pouvez également modifier la période afin de recueillir les données correspondantes. La valeur par défaut est 3 600 secondes (une heure). **Remarque** : si vous choisissez une valeur trop extrême, vous risquez d'atteindre les [limites de l'API Datadog][7].

    e. Enregistrez votre fichier et confirmez son emplacement.

Une fois ces étapes réalisées :

1. Il est recommandé de créer un environnement virtuel afin d'y installer les paquets Python. Pour ce faire, vous pouvez installer [Virtualenv][8], un gestionnaire d'environnement virtuel.
2. Créez un environnement virtuel dans le répertoire que vous avez précédemment créé en exécutant `virtualenv venv`.
3. Activez l'environnement en exécutant `source venv/bin/activate` (Mac/Linux) ou `> \path\to\env\Scripts\activate` (Windows).
4. Exécutez `pip install datadog` pour installer le [paquet de l'API Datadog][9]. Cela permet au fichier Python d'interagir avec l'API Datadog.
5. Dans le terminal, exécutez le script `python api_query_data.py`.

Si tout fonctionne, des données apparaissent dans le terminal et le `out.txt` est créé dans votre dossier.

Pour voir d'autres exemples, consultez notre [documentation relative à l'API][1].

[1]: /fr/api
[2]: http://docs.python-guide.org/en/latest/starting/install/win
[3]: /resources/python/api_query_data.py
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.com/metric/summary
[6]: https://app.datadoghq.com/infrastructure
[7]: https://docs.datadoghq.com/fr/api/?lang=python#rate-limiting
[8]: https://virtualenv.pypa.io/en/stable
[9]: https://pypi.org/project/datadog