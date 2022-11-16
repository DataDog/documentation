---
aliases:
- /fr/tracing/go/
- /fr/tracing/languages/go
- /fr/agent/apm/go/
- /fr/tracing/setup/go
- /fr/tracing/setup_overview/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: GitHub
  text: Code source
- link: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
  tag: GoDoc
  text: Page sur les packages
- link: /tracing/visualization/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /tracing/
  tag: Utilisation avancée
  text: Utilisation avancée
kind: documentation
title: Tracer des applications Go
type: multi-code-lang
---

## Exigences de compatibilité

Le traceur Go nécessite Go `1.16+` et l'Agent Datadog `>= 5.21.1`. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

Pour obtenir des instructions de configuration ainsi que des informations sur l'utilisation de l'API, consultez la [documentation relative à l'API][2] de Datadog.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [section Débuter avec l'APM][3]. Pour en savoir plus sur les contributions, consultez le fichier [README.md][4] du référentiel officiel.

Référez-vous au [document sur la migration][5] si vous devez passer d'une ancienne version du traceur (par exemple, une version antérieure à 0.6.x) à la dernière version.

La configuration du tracing implique de configurer le profileur en continu. Il vous suffit ensuite d'[activer le profileur][6] pour commencer à recevoir les données de profiling depuis votre application.

### Installation

#### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][7] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activez le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.


Sinon, suivez les instructions ci-dessous pour ajouter la bibliothèque de tracing Datadog à votre code.

## Instrumentation automatique

Datadog propose un ensemble de packages connectables et prêts à l'emploi qui prennent en charge l'instrumentation d'un certain nombre de bibliothèques et de frameworks. La liste de ces packages est disponible sur la page [Exigences de compatibilité][1]. Pour tracer ces intégrations, importez ces packages dans votre application et suivez les instructions de configuration spécifiées pour chaque [intégration][1].

## Configuration


Datadog recommande d'utiliser `DD_ENV`, `DD_SERVICE`, et `DD_VERSION` pour définir les tags `env`, `service`, et `version` de vos services.

Consultez la documentation relative au [tagging de service unifié][8] pour découvrir les méthodes à suivre afin de configurer ces variables d'environnement. Ces dernières sont disponibles à compter de la version 1.24.0 du traceur Go.

Vous pouvez aussi choisir de spécifier les tags `env`, `service` et `version` via l'API du traceur :

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // Lorsque le traceur est arrêté, il envoie toutes ses données à l'Agent Datadog avant de se fermer.
    // Cette ligne doit rester dans votre fonction principale.
    defer tracer.Stop()
}
```

Le traceur Go permet de configurer des fonctions et des variables d'environnement supplémentaires. Découvrez toutes les options disponibles dans la [documentation de configuration][9].

`DD_VERSION`
: Définit la version de votre application, par exemple `1.2.3`, `6c44da20` ou `2020.02.13`.

`DD_SERVICE`
: Le nom de service à utiliser pour cette application.

`DD_ENV`
: Définit l'environnement de l'application, par exemple prod, pre-prod ou staging.

`DD_AGENT_HOST`
: **Valeur par défaut** : `localhost` <br>
Remplace l'adresse du host de l'Agent de trace utilisée par défaut pour l'envoi des traces.

`DD_DOGSTATSD_PORT`
: **Valeur par défaut** : `8125` <br>
Remplace le port de l'Agent de trace par défaut pour l'envoi des métriques DogStatsD.

`DD_TRACE_SAMPLE_RATE`
: Active le contrôle du taux d'ingestion.

`DD_TRACE_RATE_LIMIT`
: Le nombre maximal de spans à échantillonner par processus Go et par seconde. Par défaut, sa valeur correspond à 100 lorsque DD_TRACE_SAMPLE_RATE est défini. Si ce n'est pas le cas, c'est l'Agent Datadog qui doit définir les limites de taux.

`DD_TAGS`
: **Valeur par défaut** : [] <br>
La liste des tags par défaut à ajouter à chaque span et profil. Les tags peuvent être séparés par des virgules ou des espaces, par exemple `layer:api,team:intake` ou `layer:api team:intake`.

`DD_TRACE_STARTUP_LOGS`
: **Valeur par défaut** : `true` <br>
Active la configuration de démarrage ainsi que le log de diagnostic.

`DD_TRACE_DEBUG`
: **Valeur par défaut** : `false` <br>
Active les logs de debugging dans le traceur.

`DD_TRACE_ENABLED`
: **Valeur par défaut** : `true` <br>
Active l'instrumentation des frameworks Web et des bibliothèques. Si cette variable est définie sur false, le code de l'application ne génère aucune trace.

`DD_SERVICE_MAPPING`
: **Valeur par défaut** : `null` <br>
Permet de renommer de façon dynamique des services à l'aide d'une configuration. Les services peuvent être séparés par des virgules ou des espaces, par exemple `mysql:mysql-service-name,postgres:postgres-service-name` ou `mysql:mysql-service-name postgres:postgres-service-name`.

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Une fois l'application instrumentée, le client de tracing tente d'envoyer les traces au socket de domaine Unix `/var/run/datadog/apm.socket` par défaut. Si le socket n'existe pas, les traces sont envoyées à `http://localhost:8126`.

   Une règle similaire s'applique à toutes les métriques envoyées par le traceur Go (y compris les métriques runtime et les données de télémétrie internes). Le client tente d'envoyer les données DogStatsD sur le socket de domaine Unix `/var/run/datadog/dsd.socket` et utilise `http://localhost:8125` si le socket n'existe pas.

   Si vous devez utiliser d'autres hosts ou ports, définissez une ou plusieurs des variables d'environnement suivantes. Les exemples ci-dessous sont fournis avec des valeurs par défaut, mais vous pouvez définir d'autres valeurs.

   ```
   DD_AGENT_HOST=localhost   # The host to send traces and metrics to. Defaults to localhost.
   DD_TRACE_AGENT_PORT=8126  # The port to send traces to. Defaults to 8126.
   DD_DOGSTATSD_PORT=8125    # The port to send Dogstatsd metrics to. Defaults to 8125.
   ```

   Pour les traces, la connexion peut également être configurée dans le code :

    ```go
    package main

    import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

    func main() {
        tracer.Start(
            // Unix Domain Socket configuration:
            tracer.WithUDS("/var/run/datadog/apm.socket"),
            // or, for a non-default TCP connection:
            // tracer.WithAgentAddr("localhost:8126"),
            // or, for an alternative UDP connection for Dogstatsd:
            // tracer.WithDogstatsdAddress("localhost:8125"),
        )
        defer tracer.Stop()

        // ...
    }
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

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3] et [Azure App Services][4].

Pour les autres environnements, veuillez consulter la documentation relative aux [intégrations][5] pour l'environnement qui vous intéresse. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/infrastructure/serverless/azure_app_services/#overview
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}

## Configurer le nom de l'environnement APM

Le [nom de l'environnement APM][10] peut être configuré [dans l'Agent][11] ou à l'aide de l'option de démarrage [WithEnv][9] du traceur.

### Extraction et injection d'en-têtes B3

Le traceur de la solution APM Datadog prend en charge l'injection et [l'extraction d'en-têtes B3][12] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Deux styles sont actuellement pris en charge : `Datadog` et `B3`.

Configurez les styles d'injection via la variable d'environnement `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configurez les styles d'extraction via la variable d'environnement `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

Ces variables d'environnement prennent comme valeur une liste des styles d'en-tête autorisés pour l'injection ou l'extraction, séparés par des virgules. Par défaut, seul le style d'extraction `Datadog` est activé.

Si plusieurs styles d'extraction sont activés, les tentative d'extraction sont effectuées dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[3]: /fr/tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[5]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[6]: /fr/tracing/profiler/enabling/?code-lang=go
[7]: https://app.datadoghq.com/apm/service-setup
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[10]: /fr/tracing/advanced/setting_primary_tags_to_scope/#environment
[11]: /fr/getting_started/tracing/#environment-name
[12]: https://github.com/openzipkin/b3-propagation
