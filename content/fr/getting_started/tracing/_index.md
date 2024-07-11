---
aliases:
- /fr/getting_started/tracing/distributed-tracing
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

## Présentation

La solution Application Performance Monitoring (APM) de Datadog vous permet dʼanalyser vos applications en détail, et ainsi d'identifier les goulets d'étranglement, de résoudre les problèmes et d'optimiser vos services.

Ce guide explique comment bien débuter avec lʼAPM et envoyer votre première trace à Datadog :

1. Configurez la solution APM de Datadog pour envoyer des traces à Datadog.
1. Exécutez votre application pour générer des données.
1. Explorez les données collectées dans Datadog.

## Prérequis

Pour compléter ce guide, vous avez besoin des éléments suivants :

1. [Créez un compte Datadog][1] si vous ne l'avez pas encore fait.
1. Recherchez ou créez une [clé dʼAPI Datadog][2].
1. Démarrez un host ou une VM Linux.

## Créer une application

Pour créer une application à observer dans Datadog :

1. Sur votre host ou VM Linux, créez une nouvelle application Python nommée `hello.py`. Par exemple, `nano hello.py`.
1. Ajoutez le code suivant à `hello.py` :

    {{< code-block lang="python" filename="hello.py" collapsible="true" disable_copy="false" >}}
  from flask import Flask
  import random

  app = Flask(__name__)

  quotes = [
      « Ne vous efforcez pas de réussir, mais plutôt d'être utile. - Albert Einstein »,
      « Avoir confiance en nos capacités est la moitié du travail. - Theodore Roosevelt »,
      « L'avenir appartient à ceux qui croient en la beauté de leurs rêves. - Eleanor Roosevelt »
  ]

  @app.route('/')
  def index():
      quote = random.choice(quotes)+"\n"
      return quote

  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5050)
  {{< /code-block >}}

## Configurer l'APM Datadog

Pour configurer la solution APM de Datadog sans avoir à modifier le code de votre application ni le processus de déploiement, utilisez lʼinstrumentation APM en une étape :

<div class="alert alert-info"><strong>Note</strong> : <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/">lʼinstrumentation APM en une étape</a> est en version bêta. Vous pouvez également configurer lʼAPM en utilisant <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/">les bibliothèques de tracing de Datadog</a>.</div>

1. Exécutez la commande d'installation :

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```

    Remplacez `<YOUR_DD_API_KEY>` par votre [clé dʼAPI Datadog][2], `<YOUR_DD_SITE>` par votre [site Datadog][7] et `<AGENT_ENV>` par lʼenvironnement sur lequel votre Agent est installé (par exemple, `development`).

1. Démarrez une nouvelle session shell.
1. Redémarrez les services sur votre host ou VM.
1. Vérifiez que lʼAgent est exécuté :

    ```shell
   sudo datadog-agent status
   ```

Cette approche permet dʼinstaller automatiquement lʼAgent Datadog, dʼactiver lʼAPM Datadog et [dʼinstrumenter][5] votre application au moment de l'exécution.

## Exécuter l'application

Lorsque vous configurez lʼAPM Datadog avec lʼinstrumentation en une étape, Datadog instrumente automatiquement votre application au moment de l'exécution.

Pour exécuter `hello.py` :

1. Créez un environnement Python virtuel dans le répertoire actuel  :

   ```shell
   python3 -m venv ./venv
   ```

1. Activez lʼenvironnement virtuel `venv` :

   ```shell
   source ./venv/bin/activate
   ```

1. Installez `pip` et `flask` :

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. Nommez le service et exécutez `hello.py` :

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Tester l'application

Testez l'application pour envoyer des traces à Datadog :

1. Dans une nouvelle invite de commande, exécutez ce qui suit :

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Confirmer qu'une citation aléatoire est renvoyée.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Chaque fois que vous exécutez la commande `curl`, une nouvelle trace est envoyée à Datadog.

## Explorez les traces dans Datadog

1. Dans Datadog, accédez à [**APM** > **Services**][3]. Vous devriez voir un service Python nommé `hello` :

   {{< img src="/getting_started/apm/service-catalog.png" alt="Le catalogue des services affiche le nouveau service Python." style="width:100%;" >}}

1. Sélectionnez le service pour afficher ses métriques de performances, telles que la latence, le débit et les taux d'erreur.
1. Accédez à [**APM** > **Traces**][4]. Vous devriez voir une trace pour le service `hello` :

   {{< img src="/getting_started/apm/trace-explorer.png" alt="Le Trace explorer affiche la trace correspondant au service hello." style="width:100%;" >}}

1. Sélectionnez une trace pour en voir les détails, y compris le flame graph, qui permet d'identifier les goulets d'étranglement en matière de performances.

## Configuration avancée de l'APM

Jusqu'à ce stade, vous avez laissé Datadog instrumenter automatiquement l'application `hello.py` à l'aide de l'instrumentation en une seule étape. Cette approche est conseillée si vous souhaitez capturer les traces essentielles dans les bibliothèques et langages courants sans toucher au code ni installer des bibliothèques manuellement.

Toutefois, si vous avez besoin de recueillir des traces à partir d'un code personnalisé ou si vous souhaitez un contrôle plus précis, vous pouvez ajouter [l'instrumentation personnalisée][6].

Pour illustrer ceci, vous allez importer la bibliothèque de tracing Python de Datadog dans `hello.py` et créer une span et un tag de span personnalisés.

Pour ajouter des instrumentations personnalisées :

1. Installez la bibliothèque de tracing Datadog :

   ```shell
   pip install ddtrace
   ```

1. Ajoutez les lignes surlignées au code dans `hello.py` pour créer un tag de span personnalisé `get_quote` et un tag de span personnalisé `quote` :

   {{< highlight python "hl_lines=3 15 17" >}}
    from flask import Flask
    import random
    from ddtrace import tracer

    app = Flask(__name__)

    quotes = [
        « Ne vous efforcez pas de réussir, mais plutôt d'être utile. - Albert Einstein »,
        « Avoir confiance en nos capacités est la moitié du travail. - Theodore Roosevelt »,
        « L'avenir appartient à ceux qui croient en la beauté de leurs rêves. - Eleanor Roosevelt »
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

1. Exécutez `hello.py` dans lʼenvironnement virtuel mentionné plus haut :
   ```shell
   ddtrace-run python hello.py
   ```
1. Exécutez quelques commandes `curl` dans une invite de commande distincte :
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Dans Datadog, accédez à [**APM** > **Traces**][4].
1. Sélectionnez la trace **hello**.
1. Recherchez la nouvelle span personnalisée `get_quote` dans le flame graph et survolez-la :

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="La span personnalisée get_quote sʼaffiche dans le flame graph. Lorsquʼon la survole, le tag de span de la citation sʼaffiche. " style="width:100%;" >}}

1. Remarquez que le tag de span personnalisé `quote` s'affiche dans lʼonglet **Info**.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /fr/tracing/glossary/#instrumentation
[6]: /fr/tracing/trace_collection/custom_instrumentation/
[7]: /fr/getting_started/site/