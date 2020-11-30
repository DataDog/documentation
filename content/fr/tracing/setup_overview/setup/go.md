---
title: Tracer des applications Go
kind: documentation
aliases:
  - /fr/tracing/go/
  - /fr/tracing/languages/go
  - /fr/agent/apm/go/
  - /fr/tracing/setup/go
  - /fr/tracing/setup_overview/go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-go/tree/v1'
    tag: GitHub
    text: Code source
  - link: 'https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace'
    tag: GoDoc
    text: Page sur les packages
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: /tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Exigences de compatibilité

Le traceur Go nécessite Go `1.12+` et l'Agent Datadog `>= 5.21.1`. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

Pour obtenir des instructions de configuration et des détails sur l'utilisation de l'API, consultez la [documentation sur l'API][2] de Datadog. Pour l'instrumentation manuelle, utilisez la [section Intégrations](#integrations) ci-dessous pour en savoir plus sur les bibliothèques Go et les frameworks qui prennent en charge l'instrumentation automatique.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [section Débuter avec l'APM][3]. Pour en savoir plus sur les contributions, consultez le fichier [README.md][4] du référentiel officiel.

Consultez le [document sur la migration][5] si vous devez migrer d'une ancienne version du traceur (p. ex. une version antérieure à 0.6.x) à la dernière version.

### Installation

#### Suivre la documentation intégrée à l'application (conseillé)

Suivez les [instructions de démarrage rapide][6] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activez le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.


Sinon, suivez les instructions ci-dessous pour ajouter la bibliothèque de tracing Datadog à votre code.

## Instrumentation automatique

Datadog propose un ensemble de paquets prêts à l'emploi qui prennent en charge l'instrumentation d'un certain nombre de bibliothèques et de frameworks. La liste de ces paquets est disponible sur la page [Exigences de compatibilité][1]. Pour tracer ces intégrations, importez ces paquets dans votre application et suivez les instructions de configuration spécifiées pour chaque [intégration][1].

## Configuration

Le traceur Go permet de configurer des fonctions et des variables d'environnement supplémentaires.
Découvrez toutes les options disponibles dans la [documentation de configuration][7].

Nous vous conseillons fortement d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` afin de définir les paramètres `env`, `service` et `version` pour vos services.
Consultez la documentation sur le [tagging de service unifié][8] pour en savoir plus sur la configuration de ces variables d'environnement. Ces variables sont disponibles pour les versions 1.24.0+ du traceur Go.

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

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

`DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.

Vous pouvez également définir un hostname et un port personnalisés dans le code :

```go
package main

import (
    "net"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        "custom-hostname",
        "1234",
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3] et l'[extension Azure App Services][4].

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

Le [nom de l'environnement APM][9] peut être configuré [dans l'Agent][10] ou en utilisant l'option de démarrage [WithEnv][7] du traceur.

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][11] pour le tracing distribué.

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
[6]: https://app.datadoghq.com/apm/docs
[7]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/tracing/advanced/setting_primary_tags_to_scope/#environment
[10]: /fr/getting_started/tracing/#environment-name
[11]: https://github.com/openzipkin/b3-propagation