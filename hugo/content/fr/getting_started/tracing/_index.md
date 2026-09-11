---
aliases:
- /fr/getting_started/tracing/distributed-tracing
description: Configurez l'Application Performance Monitoring (APM) pour identifier
  les goulots d'étranglement, résoudre les problèmes et envoyer des traces à Datadog.
further_reading:
- link: /tracing/
  tag: Documentation
  text: En savoir plus sur les fonctionnalités d'APM
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
## Présentation {#overview}

Datadog Application Performance Monitoring (APM) vous permet d'analyser vos applications en détail, et ainsi d'identifier les goulets d'étranglement, de résoudre les problèmes et d'optimiser vos services.

Ce guide explique comment bien débuter avec APM et envoyer votre première trace à Datadog :

1. Configurez Datadog APM pour envoyer des traces à Datadog.
1. Exécutez votre application pour générer des données.
1. Explorez les données collectées dans Datadog.

{{< skill-callout
    title="Configurez APM avec un agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Prérequis {#prerequisites}

Pour compléter ce guide, vous avez besoin des éléments suivants :

1. [Créez un compte Datadog][1] si ce n'est pas déjà fait.
1. Recherchez ou créez une [clé d'API Datadog][2].
1. Démarrez un host Linux ou une VM.

## Créez une application {#create-an-application}

Pour créer une application à observer dans Datadog :

1. Sur votre host Linux ou votre VM, créez une nouvelle application Python nommée `hello.py`. Par exemple, `nano hello.py`.
1. Ajoutez le code suivant à `hello.py` :

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

Pour configurer Datadog APM sans avoir à modifier le code de votre application ni le processus de déploiement, utilisez l'instrumentation APM en une étape. Vous pouvez aussi configurer la solution APM à l'aide des bibliothèques de [traçage de Datadog][8].


1. Exécutez la commande d'installation :

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:4 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```
 
    Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2], `<YOUR_DD_SITE>` with your [Datadog site][7], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `development`).

1. Redémarrez les services sur votre host ou votre VM.
1. Vérifiez que l'Agent est en cours d'exécution :

    ```shell
   sudo datadog-agent status
   ```

Cette approche permet d'installer automatiquement le Datadog Agent, d'activer Datadog APM et [d'instrumenter][5] votre application au moment de l'exécution.

## Exécutez l'application {#run-the-application}

Lorsque vous configurez Datadog APM avec l'instrumentation en une étape, Datadog instrumente automatiquement votre application au moment de l'exécution.

Pour exécuter `hello.py` :

1. Créez un environnement virtuel Python dans le répertoire actuel :

   ```shell
   python3 -m venv ./venv
   ```

1. Activez l'`venv` environnement virtuel :

   ```shell
   source ./venv/bin/activate
   ```

1. Installez `pip` et `flask` :

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. Définissez le nom du service et exécutez `hello.py` :

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Testez l'application {#test-the-application}

Testez l'application pour envoyer des traces à Datadog :

1. Dans une nouvelle invite de commande, exécutez ce qui suit :

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Confirmez qu'une citation aléatoire est renvoyée.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Chaque fois que vous exécutez la commande `curl`, une nouvelle trace est envoyée à Datadog.

## Explorez les traces dans Datadog {#explore-traces-in-datadog}

1. Dans Datadog, accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][3]. Vous devriez voir un service Python nommé `hello` :

   {{< img src="/getting_started/apm/service-catalog.png" alt="Le Catalog affiche le nouveau service Python." style="width:100%;" >}}

1. Sélectionnez le service pour afficher ses métriques de performance, telles que la latence, le débit et les taux d'erreur.
1. Accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][4]. Vous devriez voir une trace pour le service `hello` :

   {{< img src="/getting_started/apm/trace-explorer.png" alt="Trace Explorer affiche la trace pour le service hello." style="width:100%;" >}}

1. Sélectionnez une trace pour voir ses détails, y compris le graphique en flamme, qui aide à identifier les goulots d'étranglement de performance.

## Configuration APM avancée {#advanced-apm-setup}

Jusqu'à présent, vous avez laissé Datadog instrumenter automatiquement l'application `hello.py` à l'aide de l'instrumentation en une seule étape. Cette approche est recommandée si vous souhaitez capturer des traces essentielles à travers les bibliothèques et langages courants sans toucher au code ni installer manuellement des bibliothèques.

Toutefois, si vous avez besoin de recueillir des traces à partir d'un code personnalisé ou si vous souhaitez un contrôle plus précis, vous pouvez ajouter [l'instrumentation personnalisée][6].

Pour illustrer cela, vous allez importer le SDK Python de Datadog dans `hello.py` et créer un span personnalisé ainsi qu'un tag de span.

Pour ajouter des instrumentations personnalisées :

1. Installez le SDK Datadog :

   ```shell
   pip install ddtrace
   ```

1. Ajoutez les lignes en surbrillance au code dans `hello.py` pour créer un tag de span personnalisé `get_quote` et un tag de span personnalisé `quote` :

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

1. Exécutez `hello.py` dans l'environnement virtuel créé précédemment :
   ```shell
   ddtrace-run python hello.py
   ```
1. Exécutez quelques commandes `curl` dans une invite de commande séparée :
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Dans Datadog, accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][4].
1. Sélectionnez la trace `hello`.
1. Trouvez le nouveau span personnalisé `get_quote` dans le graphique en flamme et survolez-le :

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="Le span personnalisé get_quote s'affiche dans le graphique en flamme. Au survol, le tag de span de citation est affiché. " style="width:100%;" >}}

1. Remarquez que le tag de span personnalisé `quote` s'affiche sur l'onglet {{< ui >}}Info{{< /ui >}}.

## Quelle est la prochaine étape ? {#whats-next}

Une fois le tracing configuré et votre application envoyant des données à Datadog, explorez les fonctionnalités APM supplémentaires :

### Catalog {#catalog}

[Catalog][9] fournit une vue consolidée de vos services, combinant métadonnées de propriété, aperçus de performance, analyse de sécurité et répartition des coûts en un seul endroit. Configurez les [métadonnées de service][10] à l'aide de tags, d'annotations ou d'un fichier `service.datadog.yaml` pour enrichir vos services avec des informations de propriété, des runbooks et des liens de documentation.

### Ingestion et rétention des traces {#trace-ingestion-and-retention}

Contrôlez les coûts et gérez le volume de données en configurant des [contrôles d'ingestion][11] et des [filtres de rétention][12]. Les contrôles d'ingestion vous permettent de personnaliser les taux d'échantillonnage au niveau du Datadog Agent ou du SDK, tandis que les filtres de rétention déterminent quels spans sont indexés pour la recherche et l'analyse.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /fr/tracing/glossary/#instrumentation
[6]: /fr/tracing/trace_collection/custom_instrumentation/
[7]: /fr/getting_started/site/
[8]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /fr/internal_developer_portal/catalog/
[10]: /fr/internal_developer_portal/catalog/entity_model/
[11]: /fr/tracing/trace_pipeline/ingestion_controls/
[12]: /fr/tracing/trace_pipeline/trace_retention/