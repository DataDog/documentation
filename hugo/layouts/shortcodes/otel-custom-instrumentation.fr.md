## Présentation

Les bibliothèques de tracing Datadog permettent d'implémenter l'[API OpenTelemetry][101] afin d'instrumenter votre code. Cela signifie que vous pouvez continuer à instrumenter vos services sans dépendre d'un fournisseur, tout en tirant parti des fonctionnalités, des solutions et des capacités d'implémentation natives de Datadog. Configurez l'instrumentation pour générer des spans et traces utilisables par Datadog, les traiter pour votre langage via la bibliothèque de tracing Datadog, et les envoyer à Datadog.

Lorsque vous instrumentez votre code avec l'API OpenTelemetry :

- Votre code ne contient aucun appel d'API propre à un fournisseur.
- Votre code ne dépend pas des bibliothèques de tracing Datadog pendant la compilation (uniquement pendant l'exécution).
- Votre code n'utilise pas l'API OpenTracing obsolète.

Remplacez le SDK OpenTelemetry par la bibliothèque de tracing Datadog dans l'application instrumentée, de manière à ce que les traces générées par votre code exécuté puissent être traitées, analysées et surveillées en même temps que les traces Datadog, y compris dans les solutions propriétaires de Datadog.

Pour en savoir plus, consultez la section [Interopérabilité des traces instrumentées par l'API OpenTelemetry et par Datadog][103].

Lorsque vous appliquez la configuration décrite sur cette page, la bibliothèque de tracing Datadog accepte les spans et traces générées par le code instrumenté par OpenTelemetry, traite les données de télémétrie et les envoient à Datadog. Vous pouvez par exemple utiliser cette approche si votre code a déjà été instrumenté avec l'API OpenTelemetry, ou si vous souhaitez effectuer une instrumentation à l'aide de l'API OpenTelemetry et exploiter les bibliothèques de tracing Datadog sans avoir à modifier votre code.

Si vous cherchez à instrumenter votre code avec OpenTelemetry, puis à envoyer les données de vos spans à Datadog _sans passer par la bibliothèque de tracing Datadog_, consultez la section [OpenTelemetry dans Datadog][102].


[101]: https://opentelemetry.io/docs/reference/specification/trace/api
[102]: /opentelemetry/
[103]: /opentelemetry/guide/otel_api_tracing_interoperability/