---
title: Envoyer des quantités importantes de métriques
kind: documentation
description: Optimiser DogStatsD pour un débit élevé
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
DogStatsD transmet des métriques générées à partir de votre application à l'[Agent][1] via un protocole de transport, à savoir UDP (User Datagram Protocol) ou UDS (Unix Domain Socket).

Lorsque DogStatsD est utilisé pour transmettre un volume important de métriques à un seul Agent, si vous ne prenez pas les mesures appropriées, il est courant de rencontrer les problèmes suivants :

- Utilisation intensive du processeur par l'Agent
- Datagrammes/métriques perdus
- Erreurs (UDS) renvoyées par la bibliothèque client DogStatsD 

Dans la plupart des cas, ces inconvénients peuvent être atténués en ajustant certaines options de configuration décrites ci-dessous.

## Conseils généraux 

### Utiliser des clients officiels Datadog

Nous vous conseillons d'utiliser la dernière version des [clients DogStatsD officiels][3] fournis par Datadog pour chaque langage de programmation important.

### Activer la mise en mémoire tampon sur votre client

Certaines clients StatsD et DogStatsD envoient par défaut une métrique par datagramme. Cela ajoute une charge importante au niveau du client, du système d'exploitation et de l'Agent. Si votre client prend en charge la mise en mémoire tampon de plusieurs métriques dans un datagramme, activez cette option pour réduire considérablement les volumes d'échange.

Voici quelques exemples de [clients DogStatsD officiels pris en charge][3] :

{{< tabs >}}
{{% tab "Go" %}}

Par défaut, la bibliothèque Golang officielle de Datadog, [DataDog/datadog-go][1], utilise la mise en mémoire tampon. Les valeurs par défaut pour la taille de chaque paquet et le nombre de messages varient entre `UDS` et `UDP`. Consultez [DataDog/datadog-go][1] pour en savoir plus sur la configuration du client.

```go
package main

import (
        "log"
        "github.com/DataDog/datadog-go/statsd"
)

func main() {
  // Dans cet exemple, les métriques sont mises en mémoire tampon par défaut, avec la configuration par défaut appropriée pour UDP.
  statsd, err := statsd.New("127.0.0.1:8125")
  if err != nil {
    log.Fatal(err)
  }

  statsd.Gauge("example_metric.gauge", 1, []string{"env:dev"}, 1)
}
```

[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}

{{% tab "Python" %}}

À l'aide de la bibliothèque Python officielle de Datadog, [datadogpy][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon qui envoie jusqu'à 25 métriques au sein d'un paquet à la fin du bloc :

```python
from datadog import DogStatsd

with DogStatsd(host="127.0.0.1", port=8125, max_buffer_size=25) as batch:
    batch.gauge('exemple_métrique.gauge_1', 123, tags=["environment:dev"])
    batch.gauge('exemple_métrique.gauge_2', 1001, tags=["environment:dev"])
```


[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}

{{% tab "Ruby" %}}

À l'aide de la bibliothèque Ruby officielle de Datadog, [dogstatsd-ruby][1], l'exemple ci-dessous crée une instance du client DogStatsD et les métriques sont envoyées en une fois lors du flush :

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.increment('exemple_metric.increment', tags: ['environment:dev'])
statsd.gauge('exemple_metric.gauge', 123, tags: ['environment:dev'])

# flush synchrone
statsd.flush(sync: true)
```


[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}

{{% tab "Java" %}}

À l'aide de la bibliothèque Java officielle de Datadog, [java-dogstatsd-client][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon avec une taille de paquet maximale de 1 500 octets. Ainsi, toutes les métriques envoyées depuis cette instance du client sont mises en mémoire tampon et envoyées en paquets d'une taille maximale de `1500` octets :

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("namespace").
            .hostname("127.0.0.1")
            .port(8125)
            .maxPacketSizeBytes(1500)
            .build();

        Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("example_metric.gauge", 100, ["environment:dev"]);
    }
}
```


[1]: https://github.com/DataDog/java-dogstatsd-client
{{% /tab %}}
{{% tab ".NET" %}}
À l'aide de la bibliothèque C# officielle de Datadog, [dogstatsd-csharp-client][1], l'exemple ci-dessous crée un client DogStatsD avec le transport UDP :

```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };

        using (var dogStatsdService = new DogStatsdService())
        {
            dogStatsdService.Configure(dogstatsdConfig);

            // Les métriques Counter et Gauge sont envoyées dans le même datagramme
            dogStatsdService.Counter("example_metric.count", 2, tags: new[] { "environment:dev" });
            dogStatsdService.Gauge("example_metric.gauge", 100, tags: new[] { "environment:dev" });
        }
    }
}
```


[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{% /tab %}}
{{% tab "PHP" %}}

À l'aide de la bibliothèque PHP officielle de Datadog, [php-datadogstatsd][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon qui envoie des métriques au sein d'un paquet à la fin du bloc :

```php
<?php

require __DIR__ . '/vendor/autoload.php';

  use DataDog\BatchedDogStatsd;

$client = new BatchedDogStatsd(
  array('host' => '127.0.0.1',
          'port' => 8125,
     )
);

$client->increment('exemple_métrique.increment', array('environment'=>'dev'));
$client->increment('exemple_métrique.increment', $sampleRate->0.5 , array('environment'=>'dev'));
```


[1]: https://github.com/DataDog/php-datadogstatsd
{{% /tab %}}
{{< /tabs >}}

### Échantillonner vos métriques

Vous pouvez réduire le trafic depuis votre client DogStatsD vers l'Agent en définissant une valeur de taux d'échantillonnage pour votre client. Par exemple, un taux d'échantillonnage de `0.5` réduit de moitié le nombre de paquets UDP transmis. Cette solution constitue un compromis acceptable : vous réduisez le trafic, mais perdez légèrement en précision et en granularité.

Pour en savoir plus et obtenir des exemples de code, consultez le paragraphe [Sample Rate de la page DogStatsD][4].

### Utiliser DogStatsD via UDS (Unix Domain Socket)

UDS est un protocole de communication inter-processus utilisé pour [transporter les charges utiles DogStatsD][2]. Comparé au protocole UDP, il sollicite peu de ressources et réduit l'empreinte globale de DogStatsD sur votre système.

## Buffers kernel des systèmes d'opération

La plupart des systèmes d'exploitation ajoutent des datagrammes UDP et UDS entrants, qui contiennent vos métriques, dans une mémoire tampon avec une taille limitée. Une fois cette limite atteinte, les datagrammes comprenant vos métriques sont perdues. Vous pouvez ajuster certaines valeurs afin d'accorder davantage de temps à l'Agent pour le traitement des métriques entrantes :

### Via UDP (User Datagram Protocol)

#### Linux

Sur la plupart des distributions Linux, la taille maximale de la mémoire tampon du kernel est par défaut définie sur `212992` (208 KiB). Pour vous en assurer, utilisez la commande suivante :

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

Pour définir la taille maximale de la mémoire tampon du socket DogStatsD sur 25 MiB, exécutez :

```bash
sysctl -w net.core.rmem_max=26214400
```

Ajoutez la configuration suivante à `/etc/sysctl.conf` pour appliquer de façon permanente ce changement :

```conf
net.core.rmem_max = 26214400
```

Définissez ensuite l'option de configuration `dogstatsd_so_rcvbuf` de l'Agent sur le même nombre dans `datadog.yaml` :

```yaml
dogstatsd_so_rcvbuf: 26214400
```

Consultez la section [Remarque sur sysctl dans Kubernetes][5] si vous déployez l'Agent ou DogStatsD dans Kubernetes.

### Via UDS (Unix Domain Socket)

#### Linux

Pour les sockets UDS, Linux met en interne les datagrammes dans une file d'attente en mémoire tampon si le lecteur est plus lent que l'enregistreur. La taille de cette file d'attente représente le nombre maximal de datagrammes que Linux met en mémoire tampon par socket. Cette valeur peut être obtenue avec la commande suivante :

```bash
sysctl net.unix.max_dgram_qlen
```

Si la valeur est inférieure à 512, vous pouvez l'augmenter en la définissant sur 512 ou sur un nombre supérieur à l'aide de cette commande :

```bash
sysctl -w net.unix.max_dgram_qlen=512
```

Ajoutez la configuration suivante à `/etc/sysctl.conf` pour appliquer de façon permanente ce changement :

```conf
net.unix.max_dgram_qlen = 512
```

De la même manière, le paramètre `net.core.wmem_max` peut atteindre jusqu'à 4 MiB afin d'améliorer les performances d'écriture du client :

```conf
net.core.wmem_max = 4194304
```

Définissez ensuite l'option de configuration `dogstatsd_so_rcvbuf` de l'Agent sur le même nombre dans `datadog.yaml` :

```yaml
dogstatsd_so_rcvbuf: 4194304
```

#### Remarque sur sysctl dans Kubernetes

Si vous utilisez Kubernetes pour déployer l'Agent et/ou DogStatsD et que vous souhaitez configurer les sysctls comme mentionné ci-dessus, vous devez configurer leur valeur au niveau de chaque conteneur. Étant donné que les sysctl `net.*` sont dotés d'un espace de nommage, vous pouvez les configurer au niveau des pods. Consultez [la documentation Kubernetes officielle][6] (en anglais) pour découvrir comment autoriser l'accès aux sysctrls dans les conteneurs et comment définir leur valeur.

### Vérifier la conformité des tailles des paquets

Réduisez l'utilisation du processeur en envoyant des paquets de la bonne taille au serveur DogStatsD dans l'Agent Datadog. Les dernières versions des clients DogStatsD officiels optimisent la taille des paquets envoyés afin d'améliorer les performances.

Vous pouvez ignorer cette section si vous utilisez l'un des derniers clients Datadog DogStatsD.

Si les paquets envoyés sont trop petits, l'Agent Datadog en regroupe plusieurs afin de les traiter par lots par la suite dans le pipeline. Les clients DogStatsD officiels sont capables de regrouper des métriques afin d'optimiser le nombre de métriques par paquet.

Pour optimiser les performances de l'Agent, les clients DogStatsD doivent envoyer des paquets d'une taille correspondant à `dogstatsd_buffer_size`. La taille des paquets ne doit pas dépasser celle du buffer. Le cas contraire, l'Agent ne peut pas les charger entièrement dans le buffer, ce qui entraîne des anomalies pour certaines métriques. Utilisez le champ de configuration correspondant dans vos clients DogStatsD.

Remarque pour le protocole UDP : étant donné que les paquets UDP passent généralement par la couche Ethernet et IP, évitez de fragmenter les paquets IP en limitant la taille des paquets à une valeur inférieure à une seule trame Ethernet sur votre réseau. La plupart du temps, les réseaux IPv4 sont configurés avec une MTU de 1 500 octets. Dans ce cas, la taille des paquets envoyés ne doit pas dépasser 1 472 octets.

Remarque pour le protocole UDS : pour maximiser les performances, les paquets UDS doivent avoir une taille de 8 192 octets.

### Limiter l'utilisation maximale de la mémoire de l'Agent

Pour pouvoir traiter l'avalanche de métriques envoyées par les clients DogStatsD, l'Agent a recours à la mémoire. Bien que cette opération ne dure qu'une courte période et que la mémoire soit rapidement rendue au système d'exploitation, ce processus entraîne un pic. Ce phénomène peut s'avérer problématique pour les environnements conteneurisés qui expulsent les pods ou conteneurs en cas de manque de mémoire.

Pour éviter que l'Agent Datadog atteigne son seuil d'utilisation de la mémoire, répartissez les envois de métriques pour votre application.

Pour limiter l'utilisation maximale de la mémoire, pensez également à réduire la mise en mémoire tampon. Le buffer principal du serveur DogStatsD dans l'Agent peut être configuré avec le champ `dogstatsd_queue_size` (depuis l'Agent Datadog 6.1.0). Sa valeur par défaut `1024` limite l'utilisation maximale de la mémoire à environ 768 Mo.

**Remarque** : la réduction de ce buffer peut entraîner une augmentation du nombre de paquets perdus.

Cet exemple réduit l'utilisation maximale de la mémoire de DogStatsD à environ 384 Mo :

```yaml
dogstatsd_queue_size: 512
```

Consultez la section suivante dédiée à la détection des salves pour découvrir comment détecter les salves de métriques de vos applications.

### Activer les statistiques de traitement des métriques et la détection des salves

DogStatsD possède un mode statistique qui permet de savoir quelles métriques sont les plus traitées.

**Remarque** : l'activation de ce mode peut nuire aux performances de DogStatsD.

Pour activer le mode statistique, vous pouvez :

- Définir `dogstatsd_stats_enable` sur `true` dans votre fichier de configuration
- Définir la variable d'environnement `DD_DOGSTATSD_STATS_ENABLE` sur `true`
- Utilisez la commande `datadog-agent config set dogstatsd_stats true` pour activer le mode lors de l'exécution. Vous pouvez le désactiver lors de l'exécution avec la commande `datadog-agent config set dogstatsd_stats false`.

Lorsque ce mode est activé, exécutez la commande `datadog-agent dogstatsd-stats`. Cela envoie la liste des métriques traitées. Les métriques les plus reçues apparaissent en premier.

Lors de l'exécution de ce mode, le serveur DogStatsD utilise un mécanisme de détection de salves. Si une salve est détectée, un log d'avertissement est généré. Par exemple :

```text
A burst of metrics has been detected by DogStatSd: here is the last 5 seconds count of metrics: [250 230 93899 233 218]
```

## Télémétrie côté client

Par défaut, les clients DogStatsD envoient des métriques de télémétrie à l'Agent. Cela vous permet d'identifier plus facilement les goulots d'étranglement. Chaque métrique comporte un tag avec le langage du client ainsi que la version du client. Ces métriques ne sont pas considérées comme des métriques custom.

Chaque client partage un ensemble de tags communs.

| Tag                | Description                                       | Exemple                |
| ------------------ | ------------------------------------------------- | ---------------------- |
| `client`           | Le langage du client.                        | `client:py`            |
| `client_version`   | La version du client.                         | `client_version:1.2.3` |
| `client_transport` | Le protocole de transport utilisé par le client (`udp` ou `uds`). | `client_transport:uds` |

**Remarque** : lorsque vous utilisez le protocole UDP, le client ne peut pas détecter les erreurs réseau et les métriques correspondantes ne tiennent pas compte des octets/paquets perdus.

{{< tabs >}}
{{% tab "Python" %}}

La télémétrie a été ajoutée avec la version `0.34.0` du client Python.

| Nom de la métrique                               | Type de métrique | Description                                                                                 |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`         | count       | Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage). |
| `datadog.dogstatsd.client.events`          | count       | Le nombre d'`events` envoyés au client DogStatsD par votre application.                    |
| `datadog.dogstatsd.client.service_checks`  | count       | Le nombre de `service_checks` envoyés au client DogStatsD par votre application.            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Le nombre d'octets envoyés à l'Agent.                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | Le nombre d'octets perdus par le client DogStatsD.                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Le nombre de datagrammes envoyés à l'Agent.                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | Le nombre de datagrammes perdus par le client DogStatsD.                                    |

Pour désactiver la télémétrie, utilisez la méthode `disable_telemetry` :

```python
statsd.disable_telemetry()
```

Consultez le référentiel [DataDog/datadogpy][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}
{{% tab "Ruby" %}}

La télémétrie a été ajoutée avec la version `4.6.0` du client Ruby.

| Nom de la métrique                               | Type de métrique | Description                                                                                 |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`         | count       | Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage). |
| `datadog.dogstatsd.client.events`          | count       | Le nombre d'`events` envoyés au client DogStatsD par votre application.                    |
| `datadog.dogstatsd.client.service_checks`  | count       | Le nombre de `service_checks` envoyés au client DogStatsD par votre application.            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Le nombre d'octets envoyés à l'Agent.                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | Le nombre d'octets perdus par le client DogStatsD.                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Le nombre de datagrammes envoyés à l'Agent.                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | Le nombre de datagrammes perdus par le client DogStatsD.                                    |

Pour désactiver la télémétrie, définissez le paramètre `disable_telemetry` sur `true` :

```ruby
Datadog::Statsd.new('localhost', 8125, disable_telemetry: true)
```

Consultez le référentiel [DataDog/dogstatsd-ruby][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}
{{% tab "Go" %}}

La télémétrie a été ajoutée avec la version `3.4.0` du client Go.

| Nom de la métrique                                          | Type de métrique | Description                                                                                                                                                         |
| ---------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`                   | count       | Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage).                                                                         |
| `datadog.dogstatsd.client.events`                    | count       | Le nombre d'`events` envoyés au client DogStatsD par votre application.                                                                                            |
| `datadog.dogstatsd.client.service_checks`            | count       | Le nombre de `service_checks` envoyés au client DogStatsD par votre application.                                                                                    |
| `datadog.dogstatsd.client.bytes_sent`                | count       | Le nombre d'octets envoyés à l'Agent.                                                                                                                 |
| `datadog.dogstatsd.client.bytes_dropped`             | count       | Le nombre d'octets perdus par le client DogStatsD.                                                                                                                |
| `datadog.dogstatsd.client.bytes_dropped_queue`       | count       | Le nombre d'octets perdus, car la liste d'attente du client DogStatsD était pleine.                                                                                            |
| `datadog.dogstatsd.client.bytes_dropped_writer`      | count       | Le nombre d'octets perdus en raison d'une erreur lors de l'écriture sur Datadog.                                                                                           |
| `datadog.dogstatsd.client.packets_sent`              | count       | Le nombre de datagrammes envoyés à l'Agent.                                                                                                             |
| `datadog.dogstatsd.client.packets_dropped`           | count       | Le nombre de datagrammes perdus par le client DogStatsD.                                                                                                            |
| `datadog.dogstatsd.client.packets_dropped_queue`     | count       | Le nombre de datagrammes perdus, car la liste d'attente du client DogStatsD était pleine.                                                                                        |
| `datadog.dogstatsd.client.packets_dropped_writer`    | count       | Le nombre de datagrammes perdus en raison d'une erreur lors de l'écriture sur Datadog.                                                                                       |
| `datadog.dogstatsd.client.metric_dropped_on_receive` | count       | Le nombre de métriques perdues, car le canal de réception interne était plein (uniquement lors de l'utilisation de `WithChannelMode()`). Métrique disponible à partir de la version `3.6.0` du client Go. |

Pour désactiver la télémétrie, utilisez le paramètre `WithoutTelemetry` :

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

Consultez le référentiel [DataDog/datadog-go][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}
{{% tab "Java" %}}

La télémétrie a été ajoutée avec la version `2.10.0` du client Java.

| Nom de la métrique                                      | Type de métrique | Description                                                                                 |
| ------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`               | count       | Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage). |
| `datadog.dogstatsd.client.events`                | count       | Le nombre d'`events` envoyés au client DogStatsD par votre application.                    |
| `datadog.dogstatsd.client.service_checks`        | count       | Le nombre de `service_checks` envoyés au client DogStatsD par votre application.            |
| `datadog.dogstatsd.client.bytes_sent`            | count       | Le nombre d'octets envoyés à l'Agent.                                         |
| `datadog.dogstatsd.client.bytes_dropped`         | count       | Le nombre d'octets perdus par le client DogStatsD.                                        |
| `datadog.dogstatsd.client.packets_sent`          | count       | Le nombre de datagrammes envoyés à l'Agent.                                     |
| `datadog.dogstatsd.client.packets_dropped`       | count       | Le nombre de datagrammes perdus par le client DogStatsD.                                    |
| `datadog.dogstatsd.client.packets_dropped_queue` | count       | Le nombre de datagrammes perdus, car la liste d'attente du client DogStatsD était pleine.                |

Pour désactiver la télémétrie, utilisez l'option builder `enableTelemetry(false)` :

```java
StatsDClient client = new NonBlockingStatsDClientBuilder()
    .hostname("localhost")
    .port(8125)
    .enableTelemetry(false)
    .build();
```

Consultez le référentiel [DataDog/java-dogstatsd-client][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/java-dogstatsd-client
{{% /tab %}}
{{% tab "PHP" %}}

Depuis la version `1.5.0` du client PHP, la télémétrie est activée par défaut pour le client `BatchedDogStatsd` et désactivée par défaut pour le client `DogStatsd`.


| Nom de la métrique                               | Type de métrique | Description                                                                                 |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`         | count       | Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage). |
| `datadog.dogstatsd.client.events`          | count       | Le nombre d'`events` envoyés au client DogStatsD par votre application.                    |
| `datadog.dogstatsd.client.service_checks`  | count       | Le nombre de `service_checks` envoyés au client DogStatsD par votre application.            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Le nombre d'octets envoyés à l'Agent.                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | Le nombre d'octets perdus par le client DogStatsD.                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Le nombre de datagrammes envoyés à l'Agent.                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | Le nombre de datagrammes perdus par le client DogStatsD.                                    |

Pour activer ou désactiver la télémétrie, utilisez l'argument `disable_telemetry`. Cependant, sachez que l'utilisation de la télémétrie avec le client `DogStatsd` entraîne une augmentation considérable de l'utilisation du réseau. Il est recommandé d'utiliser `BatchedDogStatsd` lors de l'utilisation de la télémétrie.

Pour l'activer sur le client `DogStatsd` :

```php
use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
          'disable_telemetry' => false,
      )
  );
```

Pour désactiver la télémétrie sur le client `BatchedDogStatsd` :

```php
use DataDog\BatchedDogStatsd;

$statsd = new BatchedDogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
          'disable_telemetry' => true,
      )
  );
```

Consultez le référentiel [DataDog/php-datadogstatsd][1] pour en savoir plus sur la configuration du client.

[1]: https://github.com/DataDog/php-datadogstatsd
{{% /tab %}}
{{% tab ".NET" %}}

La télémétrie a été ajoutée avec la version `5.0.0` du client .NET.

| Nom de la métrique                                          | Type de métrique | Description                                                                                                                                                     |
| ---------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`                   | count       | Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage).                                                                         |
| `datadog.dogstatsd.client.events`                    | count       | Le nombre d'`events` envoyés au client DogStatsD par votre application.                                                                                            |
| `datadog.dogstatsd.client.service_checks`            | count       | Le nombre de `service_checks` envoyés au client DogStatsD par votre application.                                                                                    |
| `datadog.dogstatsd.client.bytes_sent`                | count       | Le nombre d'octets envoyés à l'Agent.                                                                                                                 |
| `datadog.dogstatsd.client.bytes_dropped`             | count       | Le nombre d'octets perdus par le client DogStatsD.                                                                                                                |
| `datadog.dogstatsd.client.packets_sent`              | count       | Le nombre de datagrammes envoyés à l'Agent.                                                                                                             |
| `datadog.dogstatsd.client.packets_dropped`           | count       | Le nombre de datagrammes perdus par le client DogStatsD.                                                                                                            |
| `datadog.dogstatsd.client.packets_dropped_queue`     | count       | Le nombre de datagrammes perdus, car la liste d'attente du client DogStatsD était pleine.                                                                                        |

Pour désactiver la télémétrie, définissez `TelemetryFlushInterval` sur `null` :

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

// Désactiver la télémétrie
dogstatsdConfig.Advanced.TelemetryFlushInterval = null;
```

Consultez le référentiel [DataDog/dogstatsd-csharp-client][1] pour en savoir plus sur la configuration du client.



[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/developers/dogstatsd/unix_socket/
[3]: /fr/developers/dogstatsd/#code
[4]: /fr/developers/metrics/dogstatsd_metrics_submission/#sample-rates
[5]: /fr/developers/dogstatsd/high_throughput/#note-on-sysctl-in-kubernetes
[6]: https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/