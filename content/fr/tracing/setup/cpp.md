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
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
**Remarque** : le C++ ne fournit pas d'intégrations pour une instrumentation par défaut, mais il est utilisé pour le tracing en passant par un proxy comme [Envoy][1] et [Nginx][2].

## Débuter

Pour commencer le tracing d'applications écrites dans n'importe quel langage, vous devez d'abord [installer et configurer l'Agent Datadog][3].

Compiler avec [OpenTracing-cpp][4].

## Compatibilité

`dd-opentracing-cpp` requiert C++14 pour être compilé, mais si vous utilisez le [chargement dynamique](#chargement-dynamique), vous n'êtes alors limité que par la version minimale exigée par OpenTracing, c'est-à-dire [C++11 ou supérieur][5].

Les plateformes prises en charge comprennent Linux et Mac. Pour une compatibilité avec Windows, [contactez l'assistance Datadog][6].

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

Incluez `<datadog/opentracing.h>` et créez le traceur :

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

Incluez `<opentracing/dynamic_load.h>` et chargez le traceur depuis `libdd_opentracing_plugin.so` :

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

### Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/envoy
[2]: /fr/tracing/setup/nginx
[3]: /fr/tracing/send_traces
[4]: https://github.com/opentracing/opentracing-cpp
[5]: https://github.com/opentracing/opentracing-cpp/#cc98
[6]: /fr/help