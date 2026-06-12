---
title: Configurer l'APM en C++

further_reading:
  - link: /tracing/setup/cpp/
    tag: Documentation
    text: En savoir plus sur le tracing des applications en C++
---
## Présentation

Ce guide vient compléter la [documentation sur la configuration de l'APM en C++][1]. Les instructions qui y sont détaillées vous permettent de configurer une application simple en C++ avec l'APM sur votre VM, afin de diagnostiquer vos éventuels problèmes.

## Configuration de votre solution

### Environnement de base

Commencez par lancer une nouvelle box Vagrant `ubuntu/xenial64` et y exécuter la commande `ssh` :

```bash
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

Installez ensuite l'Agent avec les [instructions de l'IU][2].

### Préparation pour C++

Installez `g++` et `cmake` :

```shell
sudo apt-get update
sudo apt-get -y install g++ cmake
```

Exécutez ces deux lignes de code conjointement afin d'obtenir la dernière version de C++ :

```cpp
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
```

Si vous obtenez un message de GitHub indiquant que votre taux est limité, patientez quelques minutes avant de relancer la commande. Une fois le processus terminé, vérifiez votre version C++ pour vous assurer que la mise à jour a bien été installée.

```shell
echo $DD_OPENTRACING_CPP_VERSION
```

Téléchargez et installez ensuite la bibliothèque `dd-opentracing-cpp` :

```shell
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
```

Après avoir téléchargé le fichier `tar`, créez un nouveau répertoire et un fichier `.build` pour la bibliothèque :

```shell
mkdir -p dd-opentracing-cpp/.build
```

Dézippez-le :

```bash
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
```

La liste du contenu de votre bibliothèque s'affiche alors dans votre console :

```shell
dd-opentracing-cpp-1.0.1/test/integration/nginx/nginx.conf
dd-opentracing-cpp-1.0.1/test/integration/nginx/nginx_integration_test.sh
```

Accédez ensuite à votre répertoire `.build` :

```shell
cd dd-opentracing-cpp/.build
```

Enfin, installez les dépendances :

```bash
sudo ../scripts/install_dependencies.sh
cmake ..
make
sudo make install
```

## Créer une application simple

Créez un fichier `tracer_example.cpp` et ajoutez-y ce qui suit :

```cpp
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

Ce code crée un traceur qui génère deux spans (une span parent `span_a` et une span enfant `span_b`) et leur applique des tags.

Liez ensuite `libdd_opentracing` et `libopentracing` :

```shell
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
```

Enfin, lancez l'application :

```shell
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

## Envoyer des traces

Maintenant que votre application a été créée, vous pouvez commencer à envoyer des traces pour tester l'Agent de trace.

Commencez par suivre le log de l'Agent de traces :

```shell
tail -f /var/log/datadog/trace-agent.log
```

Ouvrez ensuite un nouvel onglet et lancez l'exemple quelques fois :

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

[1]: /fr/tracing/setup/cpp/#compile-against-dd-opentracing-cpp
[2]: https://app.datadoghq.com/account/settings#agent/ubuntu