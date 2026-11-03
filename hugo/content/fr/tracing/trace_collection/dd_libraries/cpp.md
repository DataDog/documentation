---
aliases:
- /fr/tracing/cpp/
- /fr/tracing/languages/cpp/
- /fr/agent/apm/cpp/
- /fr/tracing/setup/cpp
- /fr/tracing/setup_overview/cpp
- /fr/tracing/setup_overview/setup/cpp
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-cpp
  tag: Code source
  text: Code source
- link: /tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /tracing/
  tag: Documentation
  text: Utilisation avancée
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: Centre d'apprentissage
  text: Configurez et gérez le SDK APM pour vos applications
title: Tracer des applications C++
type: multi-code-lang
---
<div class="alert alert-danger">
  <strong>Remarque :</strong> C++ ne fournit pas d'intégrations pour l'instrumentation automatique, mais il est utilisé par le proxy tracing tel que <a href="/tracing/setup/envoy/">Envoy</a> et <a href="/tracing/setup/nginx/">Nginx</a>.
</div>

##  Exigences de compatibilité {#compatibility-requirements}
Le SDK C++ nécessite une chaîne d'outils C++17 pour la compilation. Pour obtenir une liste complète des exigences de compatibilité du SDK Datadog et de la prise en charge de l'architecture des processeurs, consultez la page [Compatibility Requirements][3].

## Mise en route {#getting-started}
Avant de commencer, assurez-vous d'avoir déjà [installé et configuré l'Agent][6].

## Instrumentez votre application {#instrument-your-application}

Voici un exemple d'application pouvant être utilisée pour les tests `dd-trace-cpp`.
Cette application crée une instance de traceur avec les paramètres par défaut et génère une trace avec deux spans, qui est reportée sous le nom de service `my-service`.

```cpp
// tracer_example.cpp
#include <datadog/span_config.h>
#include <datadog/tracer.h>
#include <datadog/tracer_config.h>

#include <iostream>
#include <string>

namespace dd = datadog::tracing;

int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  const auto validated_config = dd::finalize_config(config);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};
  // Create some spans.
  {
    auto span_a = tracer.create_span();
    span_a.set_name("A");
    span_a.set_tag("tag", "123");
    auto span_b = span_a.create_child();
    span_b.set_name("B");
    span_b.set_tag("tag", "value");
  }

  return 0;
}
```

{{< tabs >}}

{{% tab "CPM" %}}

[CPM.cmake][1] est un script CMake multiplateforme qui ajoute des fonctionnalités de gestion des dépendances à CMake.

````CMake
# In a CMakeLists.txt 

CPMAddPackage("gh:DataDog/dd-trace-cpp#1.0.0")

# Add `tracer_example` target 
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp` 
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace::shared` target 
target_link_libraries(tracer_example dd_trace::static)
````

Compilez l'exemple en utilisant les commandes suivantes :

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

[1]: https://github.com/cpm-cmake/CPM.cmake
{{% /tab %}}

{{% tab "CMake" %}}
Pour intégrer la bibliothèque `dd-trace-cpp` à votre projet C++ en utilisant CMake, suivez ces étapes :
````CMake
include(FetchContent)

FetchContent_Declare(
  dd-trace-cpp
  GIT_REPOSITORY https://github.com/DataDog/dd-trace-cpp
  GIT_TAG        v1.0.0
  GIT_SHALLOW    ON
  GIT_PROGRESS   ON
)

FetchContent_MakeAvailable(dd-trace-cpp)

# Add `tracer_example` target 
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp` 
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace_cpp_shared` target 
target_link_libraries(tracer_example dd_trace::static)
````

Compilez l'exemple en utilisant les commandes suivantes :

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

Pour télécharger et installer manuellement la bibliothèque `dd-trace-cpp`, exécutez le script bash suivant :

```bash
# Requires the "jq" command, which can be installed via
# the package manager:
#   - APT: `apt install jq`
#   - APK: `apk add jq`
#   - YUM: `yum install jq`
if ! command -v jq >/dev/null 2>&1; then
  >&2 echo "jq command not found. Install using the local package manager."
  exit 1
fi

# Gets the latest release version number from GitHub.
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

DD_TRACE_CPP_VERSION="$(get_latest_release DataDog/dd-trace-cpp)"

# Download and install dd-trace-cpp library.
wget https://github.com/DataDog/dd-trace-cpp/archive/${DD_TRACE_CPP_VERSION}.tar.gz -O dd-trace-cpp.tar.gz
mkdir dd-trace-cpp && tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
cd dd-trace-cpp

# Download and install the correct version of dd-trace-cpp.
# Configure the project, build it, and install it.
cmake -B build .
cmake --build build -j
cmake --install build
```

Par défaut, `cmake --install` place la bibliothèque partagée et les en-têtes publics dans les répertoires système appropriés (par exemple, `/usr/local/[...]`).
Pour les installer dans un emplacement spécifique, utilisez `cmake --install build --prefix <INSTALL_DIR>` à la place.

### Liaison dynamique{#dynamic-linking}
Établissez la liaison avec `libdd-trace-cpp.so` et assurez-vous que la bibliothèque partagée se trouve dans `LD_LIBRARY_PATH`.

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd-trace-cpp
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer les données de télémétrie de performance de l'application selon vos besoins, y compris la mise en place du marquage de service unifié (Unified Service Tagging) : Consultez [Library Configuration][5] pour plus de détails.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /fr/tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /fr/tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /fr/tracing/trace_collection/library_config/cpp/
[6]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent