---
title: DogStatsD
kind: documentation
description: 'Présentation des fonctionnalités de DogStatsD, y compris des types de données et du tagging.'
aliases:
  - /fr/guides/dogstatsd/
  - /fr/guides/DogStatsD/
  - /fr/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Présentation de DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
La meilleure façon d'intégrer vos métriques custom d'application à Datadog consiste à les envoyer à DogStatsD, un service d'agrégation de métriques fourni avec l'Agent Datadog. DogStatsD exécute le protocole [StatsD][1] en apportant quelques extensions spécifiques à Datadog :

* Type de métrique histogram
* Checks de service
* Événements
* Tagging

Vous pouvez utiliser n'importe quel client StatsD conforme avec DogStatsD et l'Agent. Cependant, vous ne pourrez pas tirer profit des [extensions Datadog](#decouvrir-dogstatsd).

**Remarque** : DogStatsD n'implémente PAS les minuteurs de StatsD en tant que type de métrique native (bien qu'il [les prend en charge par l'intermédiaire des histogrammes][2]).

## Fonctionnement

DogStatsD accepte les [métriques custom][3], les [événements][4] et les [checks de service][5] par le biais du protocole UDP. Il les agrège et les transmet régulièrement à Datadog.

Grâce au protocole UDP, votre application peut envoyer des métriques à DogStatsD et reprendre sa tâche sans attendre de réponse. Si jamais DogStatsD devient indisponible, votre application continue à fonctionner sans interruption.

{{< img src="developers/metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd"  responsive="true" >}}

Lorsque DogStatsD reçoit des données, il agrège de nombreux points de données pour chaque métrique en un point de données unique sur une période désignée par le terme *intervalle de transmission* (par défaut, dix secondes).

## Implémentation

DogStatsD est activé par défaut sur le port UDP `8125` à partir de la version 6 de l'Agent. Si vous ne devez pas changer ce port, passez directement à la [configuration de DogStatsD dans votre code](#code). Vous pouvez également consulter la documentation relative à la configuration de DogStatsD pour [Docker][6] et [Kubernetes][7]

### Agent

Par défaut, DogStatsD effectue une écoute sur le port UDP **8125**. Pour modifier ce réglage, configurez l'option `dogstatsd_port` dans le [fichier de configuration principal de l'Agent][6] et redémarrez l'Agent. Vous pouvez également configurer DogStatsD afin d'utiliser [un socket de domaine Unix][7]. Pour activer un port UDP personnalisé pour un serveur DogStatsD de l'Agent :

1. Modifiez votre fichier `datadog.yaml` en supprimant la mise en commentaire des paramètres `use_dogstatsd` et `dogstatsd_port` :

    ```yaml
    ## @param use_dogstatsd - boolean - optional - default: true
    ## Set this option to false to disable the Agent DogStatsD server.
    #
    use_dogstatsd: true

    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Redémarrez votre Agent][8].

### Code
#### Installer le client DogStatsD

Il existe des bibliothèques client DogStatsD officielles pour les langages suivants. Vous _pouvez_ utiliser n'importe quel [client StatsD générique][9] pour envoyer des métriques à DogStatsD, mais vous ne pourrez pas utiliser toutes les fonctionnalités de Datadog mentionnées ci-dessus :

{{< tabs >}}
{{% tab "Python" %}}

```shell
$ pip install datadog
```

{{% /tab %}}
{{% tab "Ruby" %}}

```shell
$ gem install dogstatsd-ruby
```

{{% /tab %}}
{{% tab "Go" %}}

```shell
$ go get github.com/DataDog/datadog-go/statsd
```

{{% /tab %}}
{{% tab "Java" %}}

Le client Java StatsD Datadog est distribué avec Maven Central et peut être [téléchargé depuis Maven][1]. Commencez par ajouter la configuration suivante à votre fichier `pom.xml` :

```
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>2.8</version>
</dependency>
```

[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{% /tab %}}
{{% tab "PHP" %}}

Ajoutez ce qui suit à votre fichier `composer.json` :

```
"datadog/php-datadogstatsd": "1.4.*"
```

**Remarque** : la première version distribuée dans Composer est la version *0.0.3*.

Vous pouvez également dupliquer manuellement le référentiel disponible sur [github.com/DataDog/php-datadogstatsd][1] et le configurer avec `require './src/DogStatsd.php'`.

[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{% /tab %}}
{{% tab ".NET" %}}

[Récupérez le package depuis NuGet][1] et installez-le.

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{% /tab %}}
{{< /tabs >}}

#### Instancier le client DogStatsD

Une fois votre client DogStatsD installé, instanciez-le dans votre code :

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
# Importer la bibliothèque
require 'datadog/statsd'

# Créer une instance client DogStatsD
statsd = Datadog::Statsd.new('localhost', 8125)
```

{{% /tab %}}
{{% tab "Go" %}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

Pour découvrir toutes les options disponibles, consultez la documentation [GoDoc de Datadog][1].

[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd
{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);

    }
}
```

{{% /tab %}}
{{% tab "PHP" %}}

Instanciez un nouvel objet DogStatsD avec composer :

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );
```

{{% /tab %}}
{{% tab ".NET" %}}

Configurez la classe DogStatsD :

```csharp
// Le code se trouve sous l'espace de nommage StatsdClient
using StatsdClient;

// ...

var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

StatsdClient.DogStatsd.Configure(dogstatsdConfig);
```

{{% /tab %}}
{{< /tabs >}}

### Paramètres d'instanciation du client

En plus de la configuration DogStatsD obligatoire (`url` et `port`), vous pouvez configurer les paramètres facultatifs suivants pour votre client DogStatsD :

{{< tabs >}}
{{% tab "Python" %}}

| Paramètre              | Type            | Valeur par défaut     | Description                                                                                                    |
|------------------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------|
| `statsd_host`          | Chaîne          | `localhost` | Le host de votre serveur DogStatsD.                                                                             |
| `statsd_port`          | Nombre entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `statsd_socket_path`   | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`, uniquement pris en charge avec les versions 6 et ultérieures de l'Agent). |
| `statsd_constant_tags` | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                                                      |
| `statsd_namespace`     | Chaîne          | `null`      | L'espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.                                                   |

Pour en savoir plus, consultez la documentation relative au [module DogStatsD][1].
[1]: https://datadogpy.readthedocs.io/en/latest
{{% /tab %}}
{{% tab "Ruby" %}}

| Paramètre     | Type            | Valeur par défaut     | Description                                                                                                    |
|---------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------|
| `host`        | Chaîne          | `localhost` | Le host de votre serveur DogStatsD.                                                                             |
| `port`        | Nombre entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `socket_path` | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`, uniquement pris en charge avec les versions 6 et ultérieures de l'Agent). |
| `tags`        | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                                                      |
| `namespace`   | Chaîne          | `null`      | L'espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.                                                |

{{% /tab %}}
{{% tab "Go" %}}

| Paramètre               | Type            | Description                                                                                                                                                                                                         |
|-------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Namespace`             | Chaîne          | L'espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.                                                                                                                                                     |
| `Tags`                  | Liste de chaînes | Les tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                                                                                                                                                      |
| `Buffered`              | Booléen         | Utilisé pour regrouper plusieurs messages DogStatsD dans une seule charge utile. Lorsque ce paramètre est défini sur `true`, les messages sont mis en mémoire tampon jusqu'à ce que la taille totale de la charge utile dépasse `MaxMessagesPerPayload`  ou 100 ms après le démarrage de la création de la charge utile. |
| `MaxMessagesPerPayload` | Nombre entier         | Le nombre maximum de métriques, d'événements et/ou de checks de service qu'une charge utile peut contenir. Cette option est active uniquement lorsque le client est mis en mémoire tampon.                                                               |
| `AsyncUDS`              | Booléen         | Utilisé pour basculer entre les modes async et blocking pour UDS. Le mode blocking permet la vérification d'erreurs peut entraîner le blocage de l'exécution par certains appels.                                                        |
| `WriteTimeoutUDS`       | Nombre entier         | Le délai avant l'abandon d'un paquet UDS.                                                                                                                                                                    |

Pour découvrir toutes les options disponibles, consultez la documentation [GoDoc de Datadog][1].

[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd#Option
{{% /tab %}}
{{% tab "Java" %}}

| Paramètre      | Type            | Description                                                          |
|----------------|-----------------|----------------------------------------------------------------------|
| `prefix`       | Chaîne          | Le préfixe à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.      |
| `hostname`     | Chaîne          | Le nom de host du serveur StatsD ciblé.                         |
| `port`         | Nombre entier         | Le port du serveur StatsD ciblé.                              |
| `constantTags` | Liste de chaînes | Les tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. |

Pour en savoir plus, consultez la documentation relative à la [classe NonBlockingStatsDClient][1].

[1]: https://jar-download.com/artifacts/com.datadoghq/java-dogstatsd-client/2.1.1/documentation
{{% /tab %}}
{{% tab "PHP" %}}

| Paramètre     | Type            | Valeur par défaut     | Description                                                                                                                                                         |
|---------------|-----------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`        | Chaîne          | `localhost` | Le host de votre serveur DogStatsD. S'il n'est pas défini, l'Agent utilise la variable d'environnement `DD_AGENT_HOST`.                                                  |
| `port`        | Nombre entier         | `8125`      | Le port de votre serveur DogStatsD. S'il n'est pas défini, l'Agent utilise la variable d'environnement `DD_DOGSTATSD_PORT`.                                             |
| `socket_path` | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`). Il est uniquement pris en charge avec les versions 6 et ultérieures de l'Agent.                                                  |
| `global_tags` | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. Le tag `@dd.internal.entity_id` est ajouté à global_tags depuis la variable d'environnement `DD_ENTITY_ID`. |

{{% /tab %}}
{{% tab ".NET" %}}

| Paramètre          | Type            | Valeur par défaut     | Description                                                          |
|--------------------|-----------------|-------------|----------------------------------------------------------------------|
| `StatsdServerName` | Chaîne          | `localhost` | Le nom de host du serveur StatsD ciblé.                         |
| `StatsdPort`       | Nombre entier         | `8125`      | Le port du serveur StatsD ciblé.                              |
| `Prefix`           | Chaîne          | `null`      | Le préfixe à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.           |
| `ConstantTags`     | Liste de chaînes | `null`      | Les tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. |

{{% /tab %}}
{{< /tabs >}}

## Découvrir DogStatsD

DogStatsD et StatsD sont assez semblables. Toutefois, DogStatsD comprend des fonctionnalités avancées propres à Datadog, y compris les types de données, les événements, les checks de service et les tags disponibles :

{{< whatsnext desc="">}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission/" >}}Envoyer des métriques à Datadog avec DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/events/dogstatsd/" >}}Envoyer des événements à Datadog avec DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Envoyer des checks de service à Datadog avec DogStatsD{{< /nextlink >}}
{{< /whatsnext >}}

Si vous souhaitez approfondir vos connaissances sur le format des datagrammes utilisé par DogStatsD, ou concevoir votre propre bibliothèque Datadog, consultez la section [Datagramme et interface système][10], qui décrit également comment envoyer des métriques et des événements directement depuis la ligne de commande.

[1]: https://github.com/etsy/statsd
[2]: /fr/developers/metrics/dogstatsd_metrics_submission
[3]: /fr/developers/metrics/custom_metrics
[4]: /fr/developers/events/dogstatsd
[5]: /fr/developers/service_checks/dogstatsd_service_checks_submission
[6]: /fr/agent/docker/?tab=standard#dogstatsd-custom-metrics
[7]: /fr/agent/kubernetes/dogstatsd
[8]: /fr/agent/guide/agent-commands
[9]: /fr/developers/libraries/#api-and-dogstatsd-client-libraries
[10]: /fr/developers/metrics
