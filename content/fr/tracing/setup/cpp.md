---
title: Tracer des applications C++
kind: documentation
aliases:
  - /fr/tracing/cpp/
  - /fr/tracing/languages/cpp/
  - /fr/agent/apm/cpp/
further_reading:
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: Github
    text: Code source
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: /tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
**Remarque** : le C++ ne fournit pas d'intégrations pour une instrumentation par défaut, mais il est utilisé pour le tracing en passant par un proxy comme [Envoy][1] et [Nginx][2]. Pour en savoir plus sur les exigences de compatibilité du traceur C++, consultez la [page dédiée][3].

## Débuter

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][4] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Si ce n'est pas le cas, pour commencer le tracing d'applications écrites dans n'importe quel langage, vous devez d'abord [installer et configurer l'Agent Datadog][5].

Compilez avec [OpenTracing-cpp][6].

## Installation

Le tracing Datadog peut être activé de deux manières :

* En effectuant la compilation avec dd-opentracing-cpp, où la bibliothèque Datadog est compilée et configurée dans le code
* En utilisant le chargement dynamique, où la bibliothèque OpenTracing Datadog est chargée à l'exécution et configurée via JSON

### Compilation avec dd-opentracing-cpp

```bash
# Récupérer le numéro de la dernière version depuis Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
VERSION_CPP_OPENTRACING_DD="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Télécharger et installer la bibliothèque dd-opentracing-cpp.
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${VERSION_CPP_OPENTRACING_DD}.tar.gz -O dd-opentracing-cpp.tar.gz
mkdir -p dd-opentracing-cpp/.build
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
cd dd-opentracing-cpp/.build
# Télécharger et installer la bonne version d'opentracing-cpp et des autres dépendances.
../scripts/install_dependencies.sh
cmake ..
make
make install
```

Ajoutez `<datadog/opentracing.h>` et créez le traceur :

```cpp
// tracer_example.cpp
#include <datadog/opentracing.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::opentracing::TracerOptions tracer_options{"localhost", 8126, "compiled-in example"};
  auto tracer = datadog::opentracing::makeTracer(tracer_options);

  // Créer quelques spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Liez les bibliothèques `libdd_opentracing` et `libopentracing` en vous assurant qu'elles se trouvent dans votre `LD_LIBRARY_PATH` :

```bash
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
./tracer_example
```

### Chargement dynamique

```bash
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
VERSION_CPP_OPENTRACING_DD="$(get_latest_release DataDog/dd-opentracing-cpp)"
VERSION_OPENTRACING="$(get_latest_release opentracing/opentracing-cpp)"
# Télécharger et installer OpenTracing-cpp
wget https://github.com/opentracing/opentracing-cpp/archive/${VERSION_OPENTRACING}.tar.gz -O opentracing-cpp.tar.gz
mkdir -p opentracing-cpp/.build
tar zxvf opentracing-cpp.tar.gz -C ./opentracing-cpp/ --strip-components=1
cd opentracing-cpp/.build
cmake ..
make
make install
# Installer le plug-in partagé dd-opentracing-cpp.
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${VERSION_CPP_OPENTRACING_DD}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

Ajoutez `<opentracing/dynamic_load.h>` et chargez le traceur depuis `libdd_opentracing_plugin.so` :

```cpp
// tracer_example.cpp
#include <opentracing/dynamic_load.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  // Charger la bibliothèque du traceur.
  std::string error_message;
  auto handle_maybe = opentracing::DynamicallyLoadTracingLibrary(
      "/usr/local/lib/libdd_opentracing_plugin.so", error_message);
  if (!handle_maybe) {
    std::cerr << "Failed to load tracer library " << error_message << "\n";
    return 1;
  }

  // Lire la configuration du traceur.
  std::string tracer_config = R"({
      "service": "dynamic-load example",
      "agent_host": "localhost",
      "agent_port": 8126
    })";

  // Construire un traceur.
  auto& tracer_factory = handle_maybe->tracer_factory();
  auto tracer_maybe = tracer_factory.MakeTracer(tracer_config.c_str(), error_message);
  if (!tracer_maybe) {
    std::cerr << "Failed to create tracer " << error_message << "\n";
    return 1;
  }
  auto& tracer = *tracer_maybe;

  // Créer quelques spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Liez simplement la bibliothèque `libopentracing` en vous assurant que `libopentracing.so` se trouve dans votre `LD_LIBRARY_PATH` :

```bash
g++ -std=c++11 -o tracer_example tracer_example.cpp -lopentracing
./tracer_example
```

**Remarque** : OpenTracing nécessite C++ 11 ou une version ultérieure.

### Variables d'environnement

| Variable | Version | Valeur par défaut | Remarque |
|----------|---------|---------|------|
| `DD_AGENT_HOST` | v0.3.6 | `localhost` | Définit le host vers lequel les traces sont envoyées (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. |
| `DD_TRACE_AGENT_PORT` | v0.3.6 | `8126` | Définit le port sur lequel les traces sont envoyées (le port où l'Agent écoute les connexions). Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini. |
| `DD_TRACE_AGENT_URL` | v1.1.4 | | Définit l'URL d'endpoint où les traces sont envoyées. Utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. Cette URL prend en charge les schémas d'adresse HTTP, HTTPS et Unix. |
| `DD_ENV` | v1.0.0 | | Lorsqu'il est défini, ce paramètre ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées. |
| `DD_SERVICE` | v1.1.4 | | Lorsqu'il est défini, ce paramètre définit le nom de service par défaut. Si ce n'est pas le cas, le nom de service doit être fourni via TracerOptions ou par la configuration JSON. |
| `DD_TRACE_ANALYTICS_ENABLED` | v1.1.3 | `false` | Active App Analytics pour l'ensemble de l'application. |
| `DD_TRACE_ANALYTICS_SAMPLE_RATE` | v1.1.3 | | Définit le taux d'échantillonnage App Analytics. Utilisé à la place de `DD_TRACE_ANALYTICS_ENABLED` si défini. Doit être un nombre flottant compris entre `0.0` et `1.0`. |
| `DD_TRACE_SAMPLING_RULES` | v1.1.4 | `[{"sample_rate": 1.0}]` | Un tableau JSON d'objets. Chaque objet doit avoir un « sample_rate ». Les champs « name » et « service » sont facultatifs. La valeur de « sample_rate » doit être comprise entre 0.0 et 1.0 (inclus). Pour déterminer le taux d'échantillonnage de la trace, les règles sont appliquées dans l'ordre configuré. |
| `DD_VERSION` | v1.1.4 | | Lorsqu'il est défini, ce paramètre ajoute le tag `version` avec la valeur spécifiée à toutes les spans générées. |
| `DD_TAGS` | v1.1.4 | | Lorsqu'il est défini, ce paramètre ajoute des tags à l'ensemble des spans générées. Les tags doivent être inclus dans une liste de paires `key:value` séparées par des virgules. |
| `DD_PROPAGATION_STYLE_INJECT` | v0.4.1 | `Datadog` | Le ou les styles de propagation à utiliser lors de l'injection des en-têtes de tracing. `Datadog`, `B3` ou `Datadog B3`. |
| `DD_PROPAGATION_STYLE_EXTRACT` | v0.4.1 | `Datadog` | Le ou les styles de propagation à utiliser lors de l'extraction des en-têtes de tracing. `Datadog`, `B3` ou `Datadog B3`. |

### Modifier le hostname de l'Agent

Configurez vos traceurs d'application de façon à ce qu'ils envoient les traces vers un hostname d'Agent personnalisé. Le module de tracing C++ recherche automatiquement les variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

Pour vous connecter à l'Agent à l'aide de sockets de domaine Unix, vous pouvez utiliser `DD_TRACE_AGENT_URL` à la place. La valeur doit correspondre à celle de l'Agent pour `DD_APM_RECEIVER_SOCKET`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/envoy/
[2]: /fr/tracing/setup/nginx/
[3]: /fr/tracing/compatibility_requirements/cpp
[4]: https://app.datadoghq.com/apm/docs
[5]: /fr/tracing/send_traces/
[6]: https://github.com/opentracing/opentracing-cpp
