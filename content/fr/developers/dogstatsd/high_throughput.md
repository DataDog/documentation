---
description: Optimiser DogStatsD pour un débit élevé
further_reading:
- link: developers/dogstatsd
  tag: Documentation
  text: Présentation de DogStatsD
- link: developers/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
title: Envoyer des quantités importantes de métriques
---

DogStatsD transmet des métriques générées à partir de votre application à l'[Agent][1] via un protocole de transport, à savoir UDP (User Datagram Protocol) ou UDS (Unix Domain Socket).

Lorsque DogStatsD est utilisé pour transmettre un volume important de métriques à un seul Agent, si vous ne prenez pas les mesures appropriées, il est courant de rencontrer les problèmes suivants :

- Utilisation intensive du processeur par l'Agent
- Datagrammes/métriques perdus
- Erreurs (UDS) renvoyées par la bibliothèque client DogStatsD 

Dans la plupart des cas, ces inconvénients peuvent être atténués en ajustant certaines options de configuration décrites ci-dessous.

## Conseils généraux 

### Utiliser des clients officiels Datadog

Datadog recommande d'utiliser la dernière version des [clients DogStatsD officiels][3] pour chaque langage de programmation important.

### Activer la mise en mémoire tampon sur votre client

Certaines clients StatsD et DogStatsD envoient par défaut une métrique par datagramme. Cela ajoute une charge importante au niveau du client, du système d'exploitation et de l'Agent. Si votre client prend en charge la mise en mémoire tampon de plusieurs métriques dans un datagramme, activez cette option pour réduire considérablement les volumes d'échange.

<div class="alert alert-info">
  Si vous utilisez un client DogStatsD créé par la communauté et prenant en charge la mise en mémoire tampon, veillez à configurer pour les datagrammes une taille limite inférieure à la taille du buffer pour chaque datagramme de l'Agent (8 Ko par défaut, modifiable avec le paramètre <code>dogstatsd_buffer_size</code> de l'Agent) et à la taille limite de datagramme du réseau ou du système d'exploitation.
</div>

Voici quelques exemples de [clients DogStatsD officiels pris en charge][3] :

{{< programming-lang-wrapper langs="go,python,ruby,java,.NET,PHP" >}}
{{< programming-lang lang="go" >}}

Par défaut, la bibliothèque Golang officielle de Datadog, [DataDog/datadog-go][1], utilise la mise en mémoire tampon. Les valeurs par défaut pour la taille de chaque paquet et le nombre de messages varient entre `UDS` et `UDP`. Consultez [DataDog/datadog-go][1] pour en savoir plus sur la configuration du client.

```go
package main

import (
        "log"
        "github.com/DataDog/datadog-go/v5/statsd"
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
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

L'exemple ci-dessous repose sur la bibliothèque Python officielle de Datadog [datadogpy][1], ainsi que sur un client DogStatsD en mémoire tampon qui envoie les métriques par l'intermédiaire d'un nombre restreint de paquets. Pour la mise en mémoire tampon, un vidage automatique est effectué dès que la limite de taille des paquets est atteinte, ainsi que toutes les 300 ms (valeur configurable).

```python
from datadog import DogStatsd


# Pour un client v0.43.0+
dsd = DogStatsd(host="127.0.0.1", port=8125, disable_buffering=False)
dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
dsd.flush()  # Vidage manuel facultatif

# Pour une version du client antérieure à la 0.43.0, un gestionnaire de contexte est requis pour la mise en mémoire tampon
dsd = DogStatsd(host="127.0.0.1", port=8125)
with dsd:
    dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
    dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
```

<div class="alert alert-warning">
  Par défaut, les instances de client DogStatsD Python (y compris l'instance globale <code>statsd</code>) ne peuvent pas être partagées entre des processus, mais sont thread-safe. De ce fait, le processus parent et chaque processus enfant doivent créer leurs propres instances du client ou la mise en mémoire tampon doit être explicitement désactivée en définissant <code>disable_buffering</code> sur <code>True</code>. Consultez la documentation sur <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> pour en savoir plus.
</div>


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

À l'aide de la bibliothèque Ruby officielle de Datadog, [dogstatsd-ruby][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon qui envoie des métriques au sein d'un paquet au déclenchement de la transmission :

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.increment('example_metric.increment', tags: ['environment:dev'])
statsd.gauge('example_metric.gauge', 123, tags: ['environment:dev'])

# transmission synchrone
statsd.flush(sync: true)
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}


À l'aide de la bibliothèque Java officielle de Datadog, [java-dogstatsd-client][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon avec une taille de paquet maximale de 1 500 octets. Ainsi, toutes les métriques envoyées depuis cette instance du client sont mises en mémoire tampon et envoyées en paquets d'une taille maximale de `1500` octets :

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
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}
À l'aide de la bibliothèque C# officielle de Datadog, [dogstatsd-csharp-client][1], l'exemple ci-dessous crée un client DogStatsD avec le transport UDP :

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
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

À l'aide de la bibliothèque PHP officielle de Datadog, [php-datadogstatsd][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon qui envoie des métriques au sein d'un paquet à la fin du bloc :

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
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Échantillonner vos métriques

Vous pouvez réduire le trafic depuis votre client DogStatsD vers l'Agent en définissant une valeur de taux d'échantillonnage pour votre client. Par exemple, un taux d'échantillonnage de `0.5` réduit de moitié le nombre de paquets UDP transmis. Cette solution constitue un compromis acceptable : vous réduisez le trafic, mais perdez légèrement en précision et en granularité.

Pour en savoir plus et obtenir des exemples de code, consultez le paragraphe [Sample Rate de la page DogStatsD][4].

### Utiliser DogStatsD via UDS (Unix Domain Socket)

UDS est un protocole de communication inter-processus utilisé pour [transporter les charges utiles DogStatsD][2]. Comparé au protocole UDP, il sollicite peu de ressources et réduit l'empreinte globale de DogStatsD sur votre système.

### Agrégation côté client

Les bibliothèques client peuvent agréger des métriques côté client. Cela a pour effet de limiter le nombre de messages devant être transmis à l'Agent Datadog, d'améliorer les performances d'E/S et d'optimiser le débit.

{{< programming-lang-wrapper langs="go,java,.NET" >}}
{{< programming-lang lang="go" >}}

L'agrégation côté client est uniquement disponible pour les clients Go à partir de la v5.0.0.

Consultez la rubrique [Agrégation côté client][1] (en anglais) pour en savoir plus.

[1]: https://github.com/DataDog/datadog-go#client-side-aggregation
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

L'agrégation côté client est disponible pour la version 2.11.0 et les versions ultérieures de java-dogstatsd-client, et est activée par défaut depuis la version 3.0.0.

```java
StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
    // configuration habituelle
    .enableAggregation(true)
    .build();
```

L'agrégation côté client est disponible pour les métriques GAUGE, COUNT et SET.

Consultez la rubrique [Agrégation côté client][1] (en anglais) pour en savoir plus.

[1]: https://github.com/DataDog/java-dogstatsd-client#aggregation
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

L'agrégation côté client est disponible à partir de la version 7.0.0 du client C# DogStatsD et est activée par défaut. Elle est disponible pour les métriques GAUGE, COUNT et SET.

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
    ClientSideAggregation = new ClientSideAggregationConfig()
};
```


Pour en savoir plus, consultez le [référentiel C# de DogStatsD][1].

[1]: https://github.com/DataDog/dogstatsd-csharp-client#client-side-aggregation
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Exécuter plusieurs pipelines de traitement des métriques pour limiter les pertes de paquets

Si votre serveur DogStatsD utilise UDS et perd un nombre excessif de paquets, configurez le serveur de façon à utiliser plus de ressources CPU pour tenter d'augmenter la vitesse de traitement et de réduire les pertes de paquets.

Vous pouvez également configurer votre serveur DogStatsD si les données de télémétrie client indiquent des pertes de paquets et que le serveur n'utilise pas plus de 2 CPU ou 2 cœurs même lorsqu'ils sont disponibles.

Pour réduire les pertes de paquets :

1. Augmentez la taille de la file d'attente du client en la définissant sur `8192`. Pour en savoir plus, référez-vous à la configuration de la bibliothèque client. Le nombre de paquets perdus devrait alors diminuer, mais votre application risque d'utiliser plus de RAM.
2. Vous pouvez également activer la fonctionnalité `dogstatsd_pipeline_autoadjust: true` dans la configuration de votre Agent Datadog. L'Agent utilisera plusieurs cœurs pour traiter les métriques custom, ce qui pourrait réduire le nombre de paquets perdus mais augmenter la charge CPU.

## Buffers kernel des systèmes d'opération

La plupart des systèmes d'exploitation ajoutent des datagrammes UDP et UDS entrants, qui contiennent vos métriques, dans un buffer avec une taille limitée. Une fois cette limite atteinte, les datagrammes comprenant vos métriques sont perdues. Vous pouvez ajuster certaines valeurs afin d'accorder davantage de temps à l'Agent pour le traitement des métriques entrantes :

### Via UDP (User Datagram Protocol)

#### Linux

Sur la plupart des distributions Linux, la taille maximale du buffer kernel est par défaut définie sur `212992` (208 KiB). Pour vous en assurer, utilisez la commande suivante :

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

Pour définir la taille maximale du buffer du socket DogStatsD sur 25 MiB, exécutez :

```bash
sysctl -w net.core.rmem_max=26214400
```

Ajoutez la configuration suivante à `/etc/sysctl.conf` pour appliquer de façon permanente ce changement :

```conf
net.core.rmem_max = 26214400
```

Définissez ensuite l'option de configuration `dogstatsd_so_rcvbuf` de l'Agent sur le même nombre dans `datadog.yaml` :

```yaml
dogstatsd_so_rcvbuf: 26214400
```

Consultez la section [Remarque sur sysctl dans Kubernetes][5] si vous déployez l'Agent ou DogStatsD dans Kubernetes.

### Via UDS (Unix Domain Socket)

#### Linux

Pour les sockets UDS, si le lecteur est plus lent que l'enregistreur, Linux effectue en interne la mise en mémoire tampon des datagrammes avec une liste d'attente. La taille de cette file d'attente représente le nombre maximal de datagrammes que Linux met en mémoire tampon par socket. Cette valeur peut être obtenue avec la commande suivante :

```bash
sysctl net.unix.max_dgram_qlen
```

Si la valeur est inférieure à 512, vous pouvez l'augmenter en la définissant sur 512 ou sur un nombre supérieur à l'aide de cette commande :

```bash
sysctl -w net.unix.max_dgram_qlen=512
```

Ajoutez la configuration suivante à `/etc/sysctl.conf` pour appliquer de façon permanente ce changement :

```conf
net.unix.max_dgram_qlen = 512
```

De la même manière, le paramètre `net.core.wmem_max` peut atteindre jusqu'à 4 MiB afin d'améliorer les performances d'écriture du client :

```conf
net.core.wmem_max = 4194304
```

Définissez ensuite l'option de configuration `dogstatsd_so_rcvbuf` de l'Agent sur le même nombre dans `datadog.yaml` :

```yaml
dogstatsd_so_rcvbuf: 4194304
```

#### Remarque sur sysctl dans Kubernetes

Si vous utilisez Kubernetes pour déployer l'Agent et/ou DogStatsD et que vous souhaitez configurer les sysctls comme mentionné ci-dessus, configurez leur valeur au niveau de chaque conteneur. Si les sysctl `net.*` sont dotés d'un espace de nommage, vous pouvez les configurer au niveau des pods. Consultez la section [Utilisation de sysctls dans un cluster Kubernetes][6] de la documentation Kubernetes officielle (en anglais) pour en savoir plus.

## Vérifier la conformité des tailles des paquets

Réduisez l'utilisation du processeur en envoyant des paquets de la bonne taille au serveur DogStatsD dans l'Agent Datadog. Les dernières versions des clients DogStatsD officiels optimisent la taille des paquets envoyés afin d'améliorer les performances.

Vous pouvez ignorer cette section si vous utilisez l'un des derniers clients Datadog DogStatsD.

Si les paquets envoyés sont trop petits, l'Agent Datadog en regroupe plusieurs afin de les traiter par lots par la suite dans le pipeline. Les clients DogStatsD officiels sont capables de regrouper des métriques afin d'optimiser le nombre de métriques par paquet.

Pour optimiser les performances de l'Agent Datadog, les clients DogStatsD doivent envoyer des paquets d'une taille correspondant à `dogstatsd_buffer_size`. La taille des paquets ne doit pas dépasser celle du buffer. Le cas contraire, l'Agent ne peut pas les charger entièrement dans le buffer sans entraîner des anomalies pour certaines métriques. Utilisez le champ de configuration correspondant dans vos clients DogStatsD.

<div class="alert alert-info">
  <strong>Remarque pour le protocole UDP</strong> : étant donné que les paquets UDP passent généralement par la couche Ethernet et IP, vous pouvez éviter de fragmenter les paquets IP en limitant la taille des paquets à une valeur inférieure à une seule trame Ethernet sur votre réseau. La plupart du temps, les réseaux IPv4 sont configurés avec une MTU de 1 500 octets. Dans ce cas, la taille des paquets envoyés ne doit pas dépasser 1 472 octets.
</div>

<div class="alert alert-info">
  <strong>Remarque pour le protocole UDS</strong> : pour optimiser les performances, les paquets UDS doivent être composés de 8 192 octets.
</div>

## Limiter l'utilisation maximale de la mémoire de l'Agent

Pour pouvoir traiter l'avalanche de métriques envoyées par les clients DogStatsD, l'Agent a recours à la mémoire. Bien que cette opération ne dure qu'une courte période et que la mémoire soit rapidement rendue au système d'exploitation, ce processus entraîne un pic. Ce phénomène peut s'avérer problématique pour les environnements conteneurisés qui expulsent les pods ou conteneurs en cas de manque de mémoire.

Pour éviter que l'Agent Datadog atteigne son seuil d'utilisation de la mémoire, répartissez les envois de métriques pour votre application.

Pour limiter l'utilisation maximale de la mémoire, pensez également à réduire la mise en mémoire tampon. Le buffer principal du serveur DogStatsD dans l'Agent peut être configuré avec le champ `dogstatsd_queue_size` (depuis l'Agent Datadog 6.1.0). Sa valeur par défaut `1024` limite l'utilisation maximale de la mémoire à environ 768 Mo.

<div class="alert alert-warning">
  <strong>Remarque</strong> : la réduction de la taille du buffer peut entraîner une augmentation du nombre de paquets perdus.
</div>

Cet exemple réduit l'utilisation maximale de la mémoire de DogStatsD à environ 384 Mo :

```yaml
dogstatsd_queue_size: 512
```

Consultez la section suivante dédiée à la détection des salves pour découvrir comment détecter les salves de métriques de vos applications.

## Activer les statistiques de traitement des métriques et la détection des salves

DogStatsD possède un mode statistique vous permettant de visualiser les métriques les plus traitées.

<div class="alert alert-warning">
  <strong>Remarque</strong> : l'activation du mode statistique pour les métriques peut nuire aux performances de DogStatsD.
</div>

Pour activer le mode statistique, vous pouvez :

- Définir `dogstatsd_stats_enable` sur `true` dans votre fichier de configuration
- Définir la variable d'environnement `DD_DOGSTATSD_STATS_ENABLE` sur `true`
- Utilisez la commande `datadog-agent config set dogstatsd_stats true` pour activer le mode lors de l'exécution. Vous pouvez le désactiver lors de l'exécution avec la commande `datadog-agent config set dogstatsd_stats false`.

Lorsque ce mode est activé, exécutez la commande `datadog-agent dogstatsd-stats` pour obtenir la liste des métriques traitées. Les métriques les plus souvent reçues apparaissent en premier.

Lors de l'exécution de ce mode, le serveur DogStatsD utilise un mécanisme de détection de pics d'utilisation. Si un pic est détecté, un log d'avertissement est généré. Exemple :

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

**Remarque** : lorsque vous utilisez le protocole UDP, le client ne peut pas détecter les erreurs réseau, et les métriques correspondantes ne tiennent pas compte des octets ou paquets perdus.

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}

La télémétrie a été ajoutée avec la version `0.34.0` du client Python.

`datadog.dogstatsd.client.metrics`
: **Type de métrique** : count<br>
Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage).

`datadog.dogstatsd.client.events`
: **Type de métrique** : count<br>
Le nombre d'`events` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.service_checks`
: **Type de métrique** : count<br>
Le nombre de `service_checks` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.bytes_sent`
: **Type de métrique** : count<br>
Le nombre d'octets envoyés à l'Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Type de métrique** : count<br>
Le nombre d'octets perdus par le client DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Type de métrique** : count<br>
Le nombre de datagrammes envoyés à l'Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus par le client DogStatsD.

Pour désactiver la télémétrie, utilisez la méthode `disable_telemetry` :

```python
statsd.disable_telemetry()
```

Consultez le référentiel [DataDog/datadogpy][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

La télémétrie a été ajoutée avec la version `4.6.0` du client Ruby.

`datadog.dogstatsd.client.metrics`
: **Type de métrique** : count<br>
Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage).

`datadog.dogstatsd.client.events`
: **Type de métrique** : count<br>
Le nombre d'`events` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.service_checks`
: **Type de métrique** : count<br>
Le nombre de `service_checks` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.bytes_sent`
: **Type de métrique** : count<br>
Le nombre d'octets envoyés à l'Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Type de métrique** : count<br>
Le nombre d'octets perdus par le client DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Type de métrique** : count<br>
Le nombre de datagrammes envoyés à l'Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus par le client DogStatsD.

Pour désactiver la télémétrie, définissez le paramètre `disable_telemetry` sur `true` :

```ruby
Datadog::Statsd.new('localhost', 8125, disable_telemetry: true)
```

Consultez le référentiel [DataDog/dogstatsd-ruby][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

La télémétrie a été ajoutée avec la version `3.4.0` du client Go.

`datadog.dogstatsd.client.metrics`
: **Type de métrique** : count<br>
Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage et l'agrégation).

`datadog.dogstatsd.client.metrics_by_type`
: **Type de métrique** : count<br>
Le nombre de `metrics` envoyées par le client DogStatsD, avant l'échantillonnage et l'agrégation, et taguées par type de métrique (`gauge`,
`set`, `count`, `timing`, `histogram` ou `distribution`). Proposé depuis la version 5.0.0 de l'Agent Go.

`datadog.dogstatsd.client.events`
: **Type de métrique** : count<br>
Le nombre d'`events` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.service_checks`
: **Type de métrique** : count<br>
Le nombre de `service_checks` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.bytes_sent`
: **Type de métrique** : count<br>
Le nombre d'octets envoyés à l'Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Type de métrique** : count<br>
Le nombre d'octets perdus par le client DogStatsD (inclut `datadog.dogstatsd.client.bytes_dropped_queue` et
`datadog.dogstatsd.client.bytes_dropped_writer`).

`datadog.dogstatsd.client.bytes_dropped_queue`
: **Type de métrique** : count<br>
Le nombre d'octets perdus car la liste d'attente du client DogStatsD était pleine.

`datadog.dogstatsd.client.bytes_dropped_writer`
: **Type de métrique** : count<br>
Le nombre d'octets perdus en raison d'une erreur lors de l'écriture sur Datadog causée par une expiration ou un problème réseau.

`datadog.dogstatsd.client.packets_sent`
: **Type de métrique** : count<br>
Le nombre de datagrammes envoyés à l'Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus par le client DogStatsD (inclut `datadog.dogstatsd.client.packets_dropped_queue`
et `datadog.dogstatsd.client.packets_dropped_writer`).

`datadog.dogstatsd.client.packets_dropped_queue`
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus car la liste d'attente du client DogStatsD était pleine.

`datadog.dogstatsd.client.packets_dropped_writer`
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus en raison d'une erreur lors de l'écriture sur Datadog causée par une expiration ou un problème réseau.

`datadog.dogstatsd.client.metric_dropped_on_receive` 
: **Type de métrique** : count<br>
Le nombre de métriques perdues car le canal de réception interne était plein (lors de l'utilisation de `WithChannelMode()`). Proposé depuis la version 3.6.0 du client Go lorsque `WithChannelMode()` est activé.

`datadog.dogstatsd.client.aggregated_context`
: **Type de métrique** : count<br>
Le nombre de contextes vidés par le client lorsque l'agrégation côté client est activée. Proposé depuis la version 5.0.0 du client Go. Cette métrique est uniquement transmise lorsque l'agrégation est activée (comportement par défaut).

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Type de métrique** : count<br>
Le nombre total de contextes vidés par le client, lorsque l'agrégation côté client est activée, et tagués par type de métrique (`gauge`, `set`, `count`, `timing`, `histogram` ou `distribution`). Proposé depuis la version 5.0.0 du client Go. Cette métrique est uniquement transmise lorsque l'agrégation est activée (comportement par défaut).

Pour désactiver la télémétrie, utilisez le paramètre `WithoutTelemetry` :

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

Consultez le référentiel [DataDog/datadog-go][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

La télémétrie a été ajoutée avec la version `2.10.0` du client Java.

`datadog.dogstatsd.client.metrics`
: **Type de métrique** : count<br>
Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage).

`datadog.dogstatsd.client.events`
: **Type de métrique** : count<br>
Le nombre d'`events` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.service_checks`
: **Type de métrique** : count<br>
Le nombre de `service_checks` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.bytes_sent`
: **Type de métrique** : count<br>
Le nombre d'octets envoyés à l'Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Type de métrique** : count<br>
Le nombre d'octets perdus par le client DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Type de métrique** : count<br>
Le nombre de datagrammes envoyés à l'Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus par le client DogStatsD.

`datadog.dogstatsd.client.packets_dropped_queue` 
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus car la liste d'attente du client DogStatsD était pleine.

`datadog.dogstatsd.client.aggregated_context`
: **Type de métrique** : count<br>
Le nombre de contextes agrégés lorsque l'agrégation côté client est activée. Proposé depuis la version `2.11.0`.

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Type de métrique** : count<br>
Le nombre de contextes agrégés par type lorsque l'agrégation côté client est activée. Proposé depuis la version `2.13.0`. Cette métrique est activée par défaut depuis la version `3.0.0`, mais requiert `enableDevMode(true)` pour la version `2.13.0`. Elle est taguée par `metrics_type`.

`datadog.dogstatsd.client.metrics_by_type`
: **Type de métrique** : count<br>
Le nombre de métriques envoyées au client DogStatsD par votre application et taguées par type (avant l'échantillonnage). Proposé depuis la version `2.13.0` lorsque `enableDevMode(true)` est utilisé, et par défaut depuis la version `3.0.0`. La métrique est taguée par `metrics_type`.

Pour désactiver la télémétrie, utilisez l'option builder `enableTelemetry(false)` :

```java
StatsDClient client = new NonBlockingStatsDClientBuilder()
.hostname("localhost")
.port(8125)
.enableTelemetry(false)
.build();
```

Consultez le référentiel [DataDog/java-dogstatsd-client][1] pour en savoir plus sur la configuration du client.


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

Depuis la version `1.5.0` du client PHP, la télémétrie est activée par défaut pour le client `BatchedDogStatsd` et désactivée par défaut pour le client `DogStatsd`.

`datadog.dogstatsd.client.metrics`
: **Type de métrique** : count<br>
Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage).

`datadog.dogstatsd.client.events`
: **Type de métrique** : count<br>
Le nombre d'`events` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.service_checks`
: **Type de métrique** : count<br>
Le nombre de `service_checks` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.bytes_sent`
: **Type de métrique** : count<br>
Le nombre d'octets envoyés à l'Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Type de métrique** : count<br>
Le nombre d'octets perdus par le client DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Type de métrique** : count<br>
Le nombre de datagrammes envoyés à l'Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus par le client DogStatsD.

Pour activer ou désactiver la télémétrie, utilisez l'argument `disable_telemetry`. Cependant, sachez que l'utilisation de la télémétrie avec le client `DogStatsd` entraîne une augmentation considérable de l'utilisation du réseau. Il est recommandé d'utiliser `BatchedDogStatsd` pour la télémétrie.

Pour l'activer sur le client `DogStatsd` :

```php
use DataDog\DogStatsd;

$statsd = new DogStatsd(
array('host' => '127.0.0.1',
'port' => 8125,
'disable_telemetry' => false,
)
);
```

Pour désactiver la télémétrie sur le client `BatchedDogStatsd` :

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
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

La télémétrie a été ajoutée avec la version `5.0.0` du client .NET.

`datadog.dogstatsd.client.metrics`
: **Type de métrique** : count<br>
Le nombre de `metrics` envoyées au client DogStatsD par votre application (avant l'échantillonnage).

`datadog.dogstatsd.client.events`
: **Type de métrique** : count<br>
Le nombre d'`events` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.service_checks`
: **Type de métrique** : count<br>
Le nombre de `service_checks` envoyés au client DogStatsD par votre application.

`datadog.dogstatsd.client.bytes_sent`
: **Type de métrique** : count<br>
Le nombre d'octets envoyés à l'Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Type de métrique** : count<br>
Le nombre d'octets perdus par le client DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Type de métrique** : count<br>
Le nombre de datagrammes envoyés à l'Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus par le client DogStatsD.

`datadog.dogstatsd.client.packets_dropped_queue`
: **Type de métrique** : count<br>
Le nombre de datagrammes perdus car la liste d'attente du client DogStatsD était pleine.

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Metric type**: count<br>
Le nombre de contextes agrégés par type lorsque l'agrégation côté client est activée. Proposé depuis la version `7.0.0`.

Pour désactiver la télémétrie, définissez `TelemetryFlushInterval` sur `null` :

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
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/developers/dogstatsd/unix_socket/
[3]: /fr/developers/dogstatsd/#code
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#sample-rates
[5]: /fr/developers/dogstatsd/high_throughput/#note-on-sysctl-in-kubernetes
[6]: https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/