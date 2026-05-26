---
aliases:
- /fr/getting_started/tracing/distributed-tracing
description: Configurez la surveillance des performances des applications (APM) pour
  identifier les goulets d'étranglement, résoudre les problèmes et envoyer des traces
  à Datadog.
further_reading:
- link: /tracing/
  tag: Documentation
  text: En savoir plus sur les fonctionnalités de lʼAPM
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques runtime
- link: /tracing/guide/#enabling-tracing-tutorials
  tag: Guides
  text: Tutoriels sur les différentes façons d'activer le tracing
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centre d'apprentissage
  text: Présentation d'Application Performance Monitoring
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour maîtriser la solution APM
title: Débuter avec le tracing APM
---
## Aperçu {#overview}

La solution Application Performance Monitoring (APM) de Datadog vous permet dʼanalyser vos applications en détail, et ainsi d'identifier les goulets d'étranglement, de résoudre les problèmes et d'optimiser vos services.

Ce guide explique comment bien débuter avec lʼAPM et envoyer votre première trace à Datadog :

1. Configurez Datadog APM pour envoyer des traces à Datadog.
1. Exécutez votre application pour générer des données.
1. Explorez les données collectées dans Datadog.

## Conditions préalables {#prerequisites}

Pour compléter ce guide, vous avez besoin des éléments suivants :

1. [Créez un compte Datadog][1] si vous ne l'avez pas déjà fait.
1. Trouvez ou créez une [clé API Datadog][2].
1. Démarrez un hôte ou une VM Linux.

## Créez une application {#create-an-application}

Pour créer une application à observer dans Datadog :

1. Sur votre hôte ou VM Linux, créez une nouvelle application Python nommée `hello.py`. Par exemple, `nano hello.py`.
1. Ajoutez le code suivant à `hello.py` :

    {{< code-block lang="python" filename="hello.py" collapsible="true" disable_copy="false" >}}
  from flask import Flask
  import random

  app = Flask(__name__)
  
  quotes = [
      "Strive not to be a success, but rather to be of value. - Albert Einstein",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ]
  
  @app.route('/')
  def index():
      quote = random.choice(quotes)+"\n"
      return quote
  
  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5050)
  {{< /code-block >}}

## Configurez Datadog APM {#set-up-datadog-apm}

Pour configurer la solution APM de Datadog sans avoir à modifier le code de votre application ni le processus de déploiement, utilisez lʼinstrumentation APM en une étape. Vous pouvez aussi configurer la solution APM à l'aide des bibliothèques de [traçage de Datadog][8].


1. Exécutez la commande d'installation :

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:4 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```
 
    Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2], `<YOUR_DD_SITE>` with your [Datadog site][7], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `development`).

1. Redémarrez les services sur votre hôte ou VM.
1. Vérifiez que l'Agent fonctionne :

    ```shell
   sudo datadog-agent status
   ```

Cette approche permet dʼinstaller automatiquement lʼAgent Datadog, dʼactiver lʼAPM Datadog et [dʼinstrumenter][5] votre application au moment de l'exécution.

## Exécutez l'application {#run-the-application}

Lorsque vous configurez lʼAPM Datadog avec lʼinstrumentation en une étape, Datadog instrumente automatiquement votre application au moment de l'exécution.

Pour exécuter `hello.py` :

1. Créez un environnement virtuel Python dans le répertoire courant :

   ```shell
   python3 -m venv ./venv
   ```

1. Activez l'environnement virtuel `venv` :

   ```shell
   source ./venv/bin/activate
   ```

1. Installez `pip` et `flask` :

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. Définissez le nom du service et exécutez `hello.py` :

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Testez l'application {#test-the-application}

Testez l'application pour envoyer des traces à Datadog :

1. Dans une nouvelle invite de commande, exécutez ce qui suit :

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Confirmez qu'une citation aléatoire est renvoyée.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Chaque fois que vous exécutez la commande `curl`, une nouvelle trace est envoyée à Datadog.

## Explorez les traces dans Datadog {#explore-traces-in-datadog}

1. Dans Datadog, allez à [**APM** > **Services**][3]. Vous devriez voir un service Python nommé `hello` :

   {{< img src="/getting_started/apm/service-catalog.png" alt="Le catalogue de logiciels montre le nouveau service Python." style="width:100%;" >}}

1. Sélectionnez le service pour voir ses métriques de performance, telles que la latence, le débit et les taux d'erreur.
1. Allez à [**APM** > **Traces**][4]. Vous devriez voir une trace pour le service `hello` :

   {{< img src="/getting_started/apm/trace-explorer.png" alt="L'explorateur de traces montre la trace pour le service hello." style="width:100%;" >}}

1. Sélectionnez une trace pour voir ses détails, y compris le graphique de flamme, qui aide à identifier les goulets d'étranglement de performance.

## Configuration avancée de l'APM {#advanced-apm-setup}

Jusqu'à présent, vous avez laissé Datadog instrumenter automatiquement l'application `hello.py` en utilisant Single Step Instrumentation. Cette approche est recommandée si vous souhaitez capturer des traces essentielles à travers des bibliothèques et des langages courants sans toucher au code ou installer manuellement des bibliothèques.

Toutefois, si vous avez besoin de recueillir des traces à partir d'un code personnalisé ou si vous souhaitez un contrôle plus précis, vous pouvez ajouter [l'instrumentation personnalisée][6].

Pour illustrer cela, vous allez importer le SDK Python de Datadog dans `hello.py` et créer un span personnalisé ainsi qu'une balise de span personnalisée.

Pour ajouter des instrumentations personnalisées :

1. Installez le SDK Datadog :

   ```shell
   pip install ddtrace
   ```

1. Ajoutez les lignes surlignées au code dans `hello.py` pour créer une balise de span personnalisée `get_quote` et une balise de span personnalisée `quote` :

   {{< highlight python "hl_lines=3 15 17" >}}
    from flask import Flask
    import random
    from ddtrace import tracer

    app = Flask(__name__)

    quotes = [
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ]

    @app.route('/')
    def index():
        with tracer.trace("get_quote") as span:
            quote = random.choice(quotes)+"\n"
            span.set_tag("quote", quote)
            return quote

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5050)
   {{< /highlight >}}

1. Exécutez `hello.py` dans l'environnement virtuel mentionné précédemment :
   ```shell
   ddtrace-run python hello.py
   ```
1. Exécutez quelques commandes `curl` dans une invite de commande séparée :
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Dans Datadog, allez à [**APM** > **Traces**][4].
1. Sélectionnez la trace **hello**.
1. Trouvez le nouveau span personnalisé `get_quote` dans le graphique de flamme et survolez-le :

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="Le span personnalisé get_quote s'affiche dans le graphique de flamme. Au survol, la balise de span quote est affichée. " style="width:100%;" >}}

1. Remarquez que la balise de span personnalisée `quote` s'affiche dans l'onglet **Info**.

## Quelle est la prochaine étape ? {#whats-next}

Après avoir configuré le traçage et que votre application envoie des données à Datadog, explorez des fonctionnalités APM supplémentaires :

### Catalogue de logiciels {#software-catalog}

[Catalogue de logiciels][9] fournit une vue consolidée de vos services, combinant des métadonnées de propriété, des informations de performance, une analyse de sécurité et une allocation des coûts en un seul endroit. Configurez [les métadonnées de service][10] à l'aide de balises, d'annotations ou d'un fichier `service.datadog.yaml` pour enrichir vos services avec des informations de propriété, des runbooks et des liens de documentation.

### Ingestion et conservation des traces {#trace-ingestion-and-retention}

Contrôlez les coûts et gérez le volume de données en configurant [les contrôles d'ingestion][11] et [les filtres de conservation][12]. Les contrôles d'ingestion vous permettent de personnaliser les taux d'échantillonnage au niveau de l'Agent Datadog ou du SDK, tandis que les filtres de conservation déterminent quels spans sont indexés pour la recherche et l'analyse.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /fr/tracing/glossary/#instrumentation
[6]: /fr/tracing/trace_collection/custom_instrumentation/
[7]: /fr/getting_started/site/
[8]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /fr/internal_developer_portal/software_catalog/
[10]: /fr/internal_developer_portal/software_catalog/entity_model/
[11]: /fr/tracing/trace_pipeline/ingestion_controls/
[12]: /fr/tracing/trace_pipeline/trace_retention/