---
title: Tracer des applications Python
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /fr/tracing/python/
  - /fr/tracing/languages/python/
  - /fr/agent/apm/python/
  - /fr/tracing/setup/python
  - /fr/tracing/setup_overview/python
further_reading:
  - link: https://github.com/DataDog/dd-trace-py
    tag: GitHub
    text: Code source
  - link: https://ddtrace.readthedocs.io/en/stable/
    tag: Pypi
    text: Documentation relative à l'API
  - link: tracing/visualization/
    tag: Documentation
    text: Explorer vos services, ressources et traces
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Exigences de compatibilité

Les versions `2.7+` et `3.5+` de Python sont prises en charge. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

La configuration du tracing implique de configurer le Profileur en continu. Il vous suffit ensuite d'[activer le Profileur][2] pour commencer à recevoir les données de profiling depuis votre application.

## Installation et démarrage

### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][3] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.

Sinon, pour commencer le tracing d'applications écrites en Python, installez la bibliothèque de tracing Datadog, `ddtrace`, avec pip :

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

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog pour recevoir des traces de votre application désormais instrumentalisée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true` et écoute le trafic de trace à `localhost:8126`. Pour les environnements coneteneurisés, suivez les liens ci-dessous pour activer la collecte de trace dans l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Positionnez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration `datadog.yaml`][1] principal.

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

    `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`

    Vous pouvez également définir le hostname et le port dans le code :

    ```python
    import os
    from ddtrace import tracer

    tracer.configure(
        hostname="custom-hostname",
        port="1234",
    )
    ```
{{< site-region region="us3,us5,eu,gov" >}} 

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

La trace est disponible pour un certain nombre d'autres environnements, comme [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], et [Azure App Service][4].

Pour les autres environnements, veuillez consulter la documentation relative aux [intégrations][5] pour l'environnement qui vous intéresse. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/infrastructure/serverless/azure_app_services/#overview
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}

Une fois le traceur configuré et exécuté avec votre application, utilisez la commande `ddtrace-run --status` pour vérifier que les configurations fonctionnent comme prévu. Notez que la sortie de cette commande ne reflète pas les changements de configuration effectués dans le code pendant l'exécution.

Pour découvrir des options d'utilisation, de configuration et de contrôle plus avancées, consultez la [documentation relative à l'API][3] de Datadog.

## Configuration

Lorsque vous utilisez **ddtrace-run**, les [variables d'environnement][4] suivantes sont disponibles :

`DD_TRACE_DEBUG`
: **Valeur par défaut** : `false`<br>
Active les logs de debugging dans le traceur.

`DATADOG_PATCH_MODULES`
: Remplace les modules patchés pour l'exécution de cette application. Format à utiliser : `DATADOG_PATCH_MODULES=module:patch,module:patch...`

Nous vous conseillons d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` pour définir les paramètres `env`, `service` et `version` pour vos services. Consultez la documentation sur le [tagging de service unifié][5] pour en savoir plus sur la configuration de ces variables d'environnement.

`DD_ENV`
: Définit l'environnement d'une application, p. ex. `prod`, `pre-prod` ou `staging`. Découvrez [comment configurer votre environnement][6]. Disponible à partir de la version 0.38.

`DD_SERVICE`
: Le nom de service à utiliser pour cette application. La valeur est transmise lorsque vous configurez un middleware pour les intégrations de framework Web comme Pylons, Flask ou Django. Si vous n'utilisez pas d'intégration Web pour le tracing, nous vous conseillons de définir le nom de service dans le code ([par exemple, se référer à la documentation Django][7]). Disponible à partir de la version 0.38.

`DD_SERVICE_MAPPING`
: Permet de définir des mappages de nom de service afin de renommer des services dans les traces, par exemple : `postgres:postgresql,defaultdb:postgresql`. Disponible à partir de la version 0.47.

`DD_VERSION`
: Définit la version de votre application, p. ex. `1.2.3`, `6c44da20` ou `2020.02.13`. Disponible à partir de la version 0.38.

`DD_TAGS`
: La liste des tags par défaut à ajouter à chaque span et profil, p. ex. `layer:api,team:intake`. Disponible à partir de la version 0.38.

`DD_TRACE_ENABLED`
: **Valeur par défaut** : `true`<br>
Active l'instrumentation des frameworks web et des bibliothèques. Lorsqu'elle est définie sur `false`, le code de l'application ne génère aucune trace.

`DD_AGENT_HOST`
: **Valeur par défaut** : `localhost`<br>
Remplace l'adresse du host de l'Agent de trace utilisée par le traceur par défaut pour l'envoi des traces.

`DD_AGENT_PORT`
: **Valeur par défaut** : `8126`<br>
Remplace le port utilisé par le traceur par défaut pour l'envoi des traces.

`DD_TRACE_AGENT_URL`
: L'URL de l'Agent de trace auquel le traceur transmet des données. Lorsque ce paramètre est défini, il est utilisé à la place du hostname et du port. Prend en charge les sockets de domaine Unix (UDS) grâce au paramètre `apm_config.receiver_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_APM_RECEIVER_SOCKET`, définie sur l'Agent Datadog. Par exemple, `DD_TRACE_AGENT_URL=http://localhost:8126` pour une URL HTTP et `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket` pour UDS.

`DD_DOGSTATSD_URL`
: L'URL de connexion à l'Agent Datadog pour les métriques DogStatsD. Lorsque ce paramètre est défini, il est utilisé à la place du hostname et du port. Prend en charge les sockets de domaine Unix (UDS) grâce au paramètre `dogstatsd_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_DOGSTATSD_SOCKET`, définie sur l'Agent Datadog. Par exemple, `DD_DOGSTATSD_URL=udp://localhost:8126` pour une URL UDP et `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket` pour UDS.

`DD_DOGSTATSD_HOST`
: **Valeur par défaut** : `localhost`<br>
Remplace l'adresse du host de l'Agent de trace utilisée par le traceur par défaut pour l'envoi des métriques DogStatsD. Utiliser `DD_AGENT_HOST` pour remplacer `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PORT`
: **Valeur par défaut** : `8126`<br>
Remplace le port utilisé par le traceur par défaut pour l'envoi des métriques DogStatsD.

`DD_LOGS_INJECTION`
: **Valeur par défaut** : `false`<br>
Active la [mise en relation des logs et des traces injectées][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/python
[2]: /fr/tracing/profiler/enabling/?tab=python
[3]: https://app.datadoghq.com/apm/docs
[4]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: /fr/tracing/guide/setting_primary_tags_to_scope/
[7]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[8]: /fr/tracing/connect_logs_and_traces/python/