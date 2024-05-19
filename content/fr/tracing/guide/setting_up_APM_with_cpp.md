---
title: Configurer APM en C++
kind: guide
further_reading:
  - link: /tracing/setup/cpp/
    tag: Documentation
    text: En savoir plus sur le tracing des applications en C++
---
## Présentation

Ce guide vient compléter la [documentation sur la configuration du traceur APM en C++][1]. Les instructions qui y sont détaillées vous permettent de configurer une application simple en C++ avec APM sur votre VM, afin de diagnostiquer vos éventuels problèmes.

## Configuration de votre solution

### Environnement de base

Commencez par lancer une nouvelle box Vagrant `ubuntu/jammy64` et connectez vous a la VM :

```bash
vagrant init ubuntu/jammy64
vagrant up
vagrant ssh
```

Installez ensuite l'Agent en suivant les [instructions depuis l'interface Datadog][2].

### Préparation pour C++

Installez `g++` et `cmake` :

```shell
sudo apt-get update
sudo apt-get -y install g++ cmake
```

Téléchargez et installez ensuite `dd-tracer-cpp` :

```shell
wget https://github.com/DataDog/dd-trace-cpp/archive/${DD_TRACE_CPP_VERSION}.tar.gz -O dd-trace-cpp.tar.gz
```
Si vous obtenez un message de GitHub indiquant que votre taux est limité, patientez quelques minutes avant de relancer la commande.

Enfin, compilez et installez la bibliothèque :

```bash
cd dd-trace-cpp
cmake -B build .
cmake --build build -j
cmake --install build
```

## Créer une application simple

Créez un fichier `tracer_example.cpp` et ajoutez-y ce qui suit :

```cpp
#include <datadog/tracer.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::tracing::TracerConfig tracer_config;
  tracer_config.service = "compiled-in example";

  const auto validated_config = dd::finalize_config(tracer_options);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};

  // Create some spans.
  {
    datadog::tracing::SpanConfig options;
    options.name = "A";
    options.tags.emplace("tag", "123");
    auto span_a = tracer.create_span(options);

    auto span_b = span_a.create_child();
    span_b.set_name("B");
    span_b.set_tag("tag", "value");
  }

  return 0;
}
```

Ce code crée un traceur qui génère deux spans (une span parent `span_a` et une span enfant `span_b`) et leur applique des tags.

Compilez le programme :

```shell
g++ -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp
```

Enfin, lancez l'application :

```shell
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

## Envoyer des traces

Maintenant que votre application a été créée, vous pouvez commencer à envoyer des traces pour tester le Trace Agent.

Commencez par suivre le log du Trace Agent :

```shell
tail -f /var/log/datadog/trace-agent.log
```

Lancez l'application de test :

```shell
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

Les données suivantes apparaissent alors sur l'onglet Trace Agent :

```text
2019-08-09 20:02:26 UTC | TRACE | INFO | (pkg/trace/info/stats.go:108 in LogStats) | [lang:cpp lang_version:201402 tracer_version:v1.0.1] -> traces received: 1, traces filtered: 0, traces amount: 363 bytes, events extracted: 0, events sampled: 0
```

Le service s'affiche ensuite sur la page de vos services APM dans Datadog.

{{< img src="tracing/guide/setting_up_APM_with_cpp/apm_services_page.png" alt="Page des services APM"  >}}

Cliquez sur le service pour afficher vos traces.

{{< img src="tracing/guide/setting_up_APM_with_cpp/traces_ui.png" alt="Interface des traces APM"  >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/cpp/
[2]: https://app.datadoghq.com/account/settings#agent/ubuntu
