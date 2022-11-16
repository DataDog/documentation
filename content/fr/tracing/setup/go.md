---
title: Tracer des applications Go
kind: documentation
aliases:
  - /fr/tracing/go/
  - /fr/tracing/languages/go
  - /fr/agent/apm/go/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-go/tree/v1'
    tag: GitHub
    text: Code source
  - link: 'https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace'
    tag: GoDoc
    text: Page sur les packages
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et trace'
  - link: /tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Exigences de compatibilité

Le traceur Go nécessite Go `1.12+` et l'Agent Datadog `>= 5.21.1`. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

Pour obtenir des instructions de configuration et des détails sur l'utilisation de l'API, consultez la [documentation sur l'API][2] de Datadog. Pour l'instrumentation manuelle, utilisez la [section Intégrations](#integrations) ci-dessous pour en savoir plus sur les bibliothèques Go et les frameworks qui prennent en charge l'instrumentation automatique.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [section Débuter avec l'APM][3]. Pour en savoir plus sur les contributions, consultez le fichier [README.md][4] du référentiel officiel.

Consultez le [document sur la migration][5] si vous devez migrer d'une ancienne version du traceur (p. ex. v<0.6.x) vers la dernière version.

### Installation

#### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][6] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, App Analytics et l'injection des ID de trace dans les logs durant la configuration.

Sinon, [installez et configurez l'Agent Datadog][7]. Consultez la documentation supplémentaire relative au [tracing d'applications Docker][8] ou au [tracing d'applications Kubernetes][9].

Installez ensuite le traceur Go depuis son chemin d'importation canonique :

```go
go get gopkg.in/DataDog/dd-trace-go.v1/...
```

Vous êtes alors prêt à importer le traceur et à commencer l'instrumentation de votre code.

## Instrumentation automatique

Datadog propose un ensemble de paquets prêts à l'emploi qui prennent en charge l'instrumentation d'un certain nombre de bibliothèques et de frameworks. La liste de ces paquets est disponible sur la page [Exigences de compatibilité][1]. Pour tracer ces intégrations, importez ces paquets dans votre application et suivez les instructions de configuration spécifiées pour chaque [intégration][1].



## Configuration

Le traceur Go permet de configurer des fonctions et des variables d'environnement supplémentaires.
Découvrez toutes les options disponibles dans la [documentation de configuration][10].

Nous vous conseillons fortement d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` pour définir les paramètres `env`, `service` et `version` pour vos services.
Consultez la documentation sur le [Tagging de service unifié][11] pour en savoir plus sur la configuration de ces variables d'environnement. Ces variables sont disponibles pour les versions 1.24.0+ du traceur Go.

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

### Modifier le hostname de l'Agent

Le module de tracing Go recherche automatiquement les variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` puis s'initialise avec celles-ci.

Vous pouvez également définir un hostname personnalisé et un port dans le code :

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

## Configurer le nom de l'environnement APM

Le [nom de l'environnement APM][12] peut être configuré [dans l'Agent][13] ou en utilisant l'option de démarrage [WithEnv][10] du traceur.

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge l'injection et l'[extraction d'en-têtes B3][74] pour le tracing distribué.

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
[6]: https://app.datadoghq.com/apm/service-setup
[7]: /fr/tracing/send_traces/
[8]: /fr/tracing/setup/docker/
[9]: /fr/agent/kubernetes/apm/
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[11]: /fr/getting_started/tagging/unified_service_tagging
[12]: /fr/tracing/advanced/setting_primary_tags_to_scope/#environment
[13]: /fr/getting_started/tracing/#environment-name
