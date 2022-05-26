---
aliases:
- /fr/tracing/cpp/
- /fr/tracing/languages/cpp/
- /fr/agent/apm/cpp/
- /fr/tracing/setup/cpp
- /fr/tracing/setup_overview/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-opentracing-cpp
  tag: Github
  text: Code source
- link: /tracing/visualization/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /tracing/
  tag: Utilisation avancée
  text: Utilisation avancée
kind: documentation
title: Tracer des applications C++
type: multi-code-lang
---
**Remarque** : le C++ ne fournit pas d'intégrations pour une instrumentation par défaut, mais il est utilisé pour le tracing en passant par un proxy comme [Envoy][1] et [Nginx][2]. Pour en savoir plus sur les exigences de compatibilité du traceur C++, consultez la [page dédiée][3]. 

## Prise en main

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][4] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Si ce n'est pas le cas, pour commencer le tracing d'applications écrites dans n'importe quel langage, vous devez d'abord [installer et configurer l'Agent Datadog][5].

Compilez avec [OpenTracing-cpp][6].

## Installation

Le tracing Datadog peut être activé de deux manières :

* En effectuant la compilation avec dd-opentracing-cpp, où la bibliothèque Datadog est compilée et configurée dans le code
* En utilisant le chargement dynamique, où la bibliothèque OpenTracing Datadog est chargée à l'exécution et configurée via JSON

### Compilation avec dd-opentracing-cpp

```bash
# Récupérer le numéro de la dernière version depuis GitHub.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Télécharger et installer la bibliothèque dd-opentracing-cpp.
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
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

## Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog pour recevoir des traces de votre application désormais instrumentalisée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true` et écoute le trafic de trace à `localhost:8126`. Pour les environnements coneteneurisés, suivez les liens ci-dessous pour activer la collecte de trace dans l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Positionnez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration `datadog.yaml`][1] principal.

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

`DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.

Pour vous connecter à l'Agent à l'aide de sockets de domaine Unix, vous pouvez utiliser `DD_TRACE_AGENT_URL` à la place. La valeur doit correspondre à celle de l'Agent pour `DD_APM_RECEIVER_SOCKET`.


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

### Variables d'environnement

`DD_AGENT_HOST` 
: **Version** : 0.3.6 <br>
**Valeur par défaut** : `localhost` <br>
Définit le host vers lequel les traces sont envoyées (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini.

`DD_TRACE_AGENT_PORT` 
: **Version** : 0.3.6 <br>
**Valeur par défaut** : `8126` <br>
Définit le port vers lequel les traces sont envoyées (le port où l'Agent écoute les connexions). Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini.

`DD_TRACE_AGENT_URL` 
: **Version** : 1.1.4 <br>
Définit l'URL d'endpoint où les traces sont envoyées. Lorsqu'il est défini, ce paramètre est utilisé à la place de `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Cette URL prend en charge les schémas d'adresse HTTP, HTTPS et Unix.

`DD_ENV` 
: **Version** : 1.0.0 <br>
Lorsqu'il est défini, ce paramètre ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées.

`DD_SERVICE` 
: **Version** : 1.1.4 <br>
Lorsqu'il est défini, ce paramètre définit le nom de service par défaut. Si ce n'est pas le cas, le nom de service doit être fourni via TracerOptions ou par la configuration JSON.

`DD_TRACE_ANALYTICS_ENABLED` 
: **Version** : 1.1.3 <br>
**Valeur par défault** : `false` <br>
Active App Analytics pour l'ensemble de l'application.

`DD_TRACE_ANALYTICS_SAMPLE_RATE` 
: **Version** : 1.1.3 <br>
Définit le taux d'échantillonnage App Analytics. Lorsqu'il est défini, ce paramètre est utilisé à la place de `DD_TRACE_ANALYTICS_ENABLED`. Doit être un nombre flottant compris entre `0.0` et `1.0`.

`DD_TRACE_SAMPLING_RULES` 
: **Version** : 1.1.4 <br>
**Valeur par défaut** : `[{"sample_rate": 1.0}]` <br>
Un tableau JSON d'objets. Chaque objet doit avoir un « sample_rate ». Les champs « name » et « service » sont facultatifs. La valeur de « sample_rate » doit être comprise entre 0.0 et 1.0 (inclus). Pour déterminer le taux d'échantillonnage de la trace, les règles sont appliquées dans l'ordre configuré.

`DD_VERSION` 
: **Version** : 1.1.4 <br>
Lorsqu'il est défini, ce paramètre ajoute le tag `version` avec la valeur spécifiée à toutes les spans générées.

`DD_TAGS` 
: **Version** : 1.1.4 <br>
Lorsqu'il est défini, ce paramètre ajoute des tags à l'ensemble des spans générées. Les tags doivent être inclus dans une liste de paires `key:value` séparées par des virgules.

`DD_PROPAGATION_STYLE_INJECT` 
: **Version** : 0.4.1 <br>
**Valeur par défaut** : `Datadog` <br>
Le ou les styles de propagation à utiliser lors de l'injection des en-têtes de tracing. `Datadog`, `B3` ou `Datadog B3`.

`DD_PROPAGATION_STYLE_EXTRACT` 
: **Version** : 0.4.1 <br>
**Valeur par défaut** : `Datadog` <br>
Le ou les styles de propagation à utiliser lors de l'extraction des en-têtes de tracing. `Datadog`, `B3` ou `Datadog B3`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/envoy/
[2]: /fr/tracing/setup/nginx/
[3]: /fr/tracing/compatibility_requirements/cpp
[4]: https://app.datadoghq.com/apm/docs
[5]: /fr/tracing/send_traces/
[6]: https://github.com/opentracing/opentracing-cpp