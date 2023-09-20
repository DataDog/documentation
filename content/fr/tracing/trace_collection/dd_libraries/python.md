---
aliases:
- /fr/tracing/python/
- /fr/tracing/languages/python/
- /fr/agent/apm/python/
- /fr/tracing/setup/python
- /fr/tracing/setup_overview/python
- /fr/tracing/setup_overview/setup/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: GitHub
  text: Code source
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Pypi
  text: Documentation relative à l'API
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: tracing/
  tag: Utilisation avancée
  text: Utilisation avancée
kind: documentation
title: Tracer des applications Python
type: multi-code-lang
---
## Exigences de compatibilité
Le dernier traceur Python prend en charge les versions 2.7 et 3.5-3.10 de CPython.

Pour obtenir la liste complète des frameworks et versions Python pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la page relative aux [exigences de compatibilité][1].

## Installation et démarrage

### Configurer l'Agent Datadog pour APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application nouvellement instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true`, et écoute les données de tracing sur `http://localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Une fois l'application instrumentée, le client de tracing tente d'envoyer les traces au socket de domaine Unix `/var/run/datadog/apm.socket` par défaut. Si le socket n'existe pas, les traces sont envoyées à `http://localhost:8126`.

   Si vous souhaitez spécifier un autre socket, host ou port, utilisez la variable d'environnement `DD_TRACE_AGENT_URL`. Voici quelques exemples :

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket
   ```

   Pour les traces, la connexion peut également être configurée dans le code :

   ```python
   from ddtrace import tracer

   # Network sockets
   tracer.configure(
       https=False,
       hostname="custom-hostname",
       port="1234",
   )

   # Unix domain socket configuration
   tracer.configure(
       uds_path="/var/run/datadog/apm.socket",
   )
   ```

   Là encore, le client de tracing tente d'envoyer les statistiques au socket de domaine Unix `/var/run/datadog/dsd.socket`. Si le socket n'existe pas, les statistiques sont envoyées à `http://localhost:8125`.

   Si vous souhaitez spécifier une autre configuration, vous pouvez utiliser la variable d'environnement `DD_DOGSTATSD_URL`. Voici quelques exemples :
   ```
   DD_DOGSTATSD_URL=udp://custom-hostname:1234
   DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket
   ```
   La connexion pour les statistiques peut également être configurée dans le code :

   ```python
   from ddtrace import tracer

   # Network socket
   tracer.configure(
     dogstatsd_url="udp://localhost:8125",
   )

   # Unix domain socket configuration
   tracer.configure(
     dogstatsd_url="unix:///var/run/datadog/dsd.socket",
   )
   ```
{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer la solution APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2] et [AWS Elastic Beanstalk][3].

Pour les autres environnements, consultez la documentation relative aux [intégrations][5] pour l'environnement qui vous intéresse. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}

### Choisir votre méthode d'instrumentation

Une fois votre Agent Datadog déployé ou installé et configuré, la prochaine étape consiste à instrumenter votre application. Il existe différentes méthodes en fonction de l'infrastructure sur laquelle votre application s'exécute, du langage dans lequel elle est écrite et du niveau de configuration requis.

Consultez les pages suivantes pour découvrir les scénarios de déploiement et les langages pris en charge :

- [Injecter la bibliothèque d'instrumentation localement][11] (au niveau de l'Agent) ;
- [Injecter la bibliothèque d'instrumentation depuis l'interface Datadog][12] (version bêta) ; ou
- Ajouter la bibliothèque de tracing directement dans l'application, tel que décrit dans la section [Installer le traceur](#installer-le-traceur). Pour en savoir plus, consultez les [informations de compatibilité][1].

### Instrumenter votre application

<div class="alert alert-info">Si vous recueillez des traces à partir d'une application Kubernetes, plutôt que de suivre les instructions ci-dessous, vous pouvez injecter la bibliothèque de tracing dans votre application en utilisant le contrôleur d'admission de l'Agent de cluster. Consultez la section <a href="/tracing/trace_collection/library_injection_local">Injection de bibliothèques à l'aide du contrôleur d'admission</a> pour connaître la marche à suivre.</div>

Une fois l'Agent installé, pour commencer le tracing d'applications écrites en Python, installez la bibliothèque de tracing Datadog, `ddtrace`, avec pip :

```python
pip install ddtrace
```

**Remarque :** cette commande nécessite la version `18.0.0` (ou une version ultérieure) de pip. Pour Ubuntu, Debian ou tout autre gestionnaire de packages, mettez à jour votre version de pip à l'aide de la commande suivante :

```python
pip install --upgrade pip
```

Pour instrumenter votre application Python, utilisez alors la commande `ddtrace-run` incluse. Pour l'utiliser, ajoutez `ddtrace-run` en préfixe à la commande de votre point d'entrée Python.

Par exemple, si votre application est lancée avec `python app.py`, exécutez la commande suivante :

```shell
ddtrace-run python app.py
```

Une fois le traceur configuré et exécuté avec votre application, utilisez la commande `ddtrace-run --info` pour vérifier que les configurations fonctionnent comme prévu. Notez que la sortie de cette commande ne reflète pas les changements de configuration effectués dans le code pendant l'exécution.

## Configuration

Au besoin, configurez la bibliothèque de tracing pour envoyer des données de télémétrie relatives aux performances de l'application, notamment en configurant le tagging de service unifié. Consultez la section [Configuration de la bibliothèque][3] pour en savoir plus.

### Passage à la v1

Si vous souhaitez passer à la v1 de ddtrace, consultez le [guide de mise à niveau][4] et les [notes de version][5] dans la documentation de la bibliothèque pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /fr/tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0
[11]: /fr/tracing/trace_collection/library_injection_local/
[12]: /fr/tracing/trace_collection/library_injection_remote/