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

Lorsque DogStatsD est utilisé pour transmettre un volume important de métriques à un seul Agent, si vous ne prenez pas les mesures appropriées, il est courant de rencontrer les problèmes suivants :

- Utilisation intensive du processeur de l'Agent
- Datagrammes/métriques supprimés
- Erreurs (UDS) renvoyées par la bibliothèque client DogStatsD 

Dans la plupart des cas, ces inconvénients peuvent être atténués en ajustant certaines options de configuration décrites ci-dessous.

## Conseils généraux 

### Activer la mise en mémoire tampon sur votre client

Certaines clients StatsD et DogStatsD envoient par défaut une métrique par datagramme. Cela ajoute une charge importante au niveau du client, du système d'exploitation et de l'Agent. Si votre client prend en charge la mise en mémoire tampon de plusieurs métriques dans un datagramme, activez cette option pour réduire considérablement les volumes d'échange.

Voici quelques exemples de [clients DogStatsD officiels pris en charge][3] :

{{< tabs >}}
{{% tab "Go" %}}

À l'aide de la bibliothèque Goland officielle de Datadog, [datadog-go][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon avec un maximum de `256` métriques en mémoire. Ainsi, les métriques envoyées depuis cette instance au client sont mises en tampon et envoyées sous la forme de paquets contenant au maximum `256` métriques :

```go
package main

import (
    "log"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {

  statsd, err := statsd.New("127.0.0.1:8125",
                 statsd.Buffered(),
                 statsd.WithMaxMessagesPerPayload(256),
                )
    if err != nil {
            log.Fatal(err)
    }

  statsd.Gauge("exemple_métrique.gauge", 1, []string{"env:dev"}, 1)
}
```

[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}

{{% tab "Python" %}}

À l'aide de la bibliothèque Python officielle de Datadog, [datadogpy][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon qui envoie jusqu'à 25 métriques au sein d'un paquet à la fin du bloc :

```python
from datadog import DogStatsd

with DogStatsd(host="127.0.0.1", port=8125, max_buffer_size=25) as batch:
    batch.gauge('exemple_métrique.gauge_1', 123, tags=["environment:dev"])
    batch.gauge('exemple_métrique.gauge_2', 1001, tags=["environment:dev"])
```

[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}

{{% tab "Ruby" %}}

À l'aide de la bibliothèque Ruby officielle de Datadog, [dogstatsd-ruby][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon qui envoie des métriques au sein d'un paquet à la fin du bloc :

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.batch do |s|
  s.increment('exemple_métrique.increment', tags: ['environment:dev'])
  s.gauge('exemple_métrique.gauge', 123, tags: ['environment:dev'])
end
```

[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}

{{% tab "Java" %}}

À l'aide de la bibliothèque Java officielle de Datadog, [java-dostatsd-client][1], l'exemple ci-dessous crée une instance du client DogStatsD en mémoire tampon avec un maximum de `256` métriques en mémoire. Ainsi, les métriques envoyées depuis cette instance au client sont mises en tampon et envoyées sous la forme de paquets contenant au maximum `256` métriques :

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("namespace", "127.0.0.1", 8125, 256);

        Statsd.incrementCounter("exemple_métrique.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("exemple_métrique.gauge", 100, ["environment:dev"]);
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{% /tab %}}
{{% tab ".NET" %}}
À l'aide de la bibliothèque C# officielle de Datadog, [dogstatsd-csharp-client][1], l'exemple ci-dessous crée un client DogStatsD avec le transport UDP :

```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
      StatsdUDP udp = new StatsdUDP("127.0.0.1", 8125);

      // Créer une instance stats avec le transport « udp »
      Statsd s = new Statsd(udp);
      s.Add<Statsd.Counting,int>("exemple_métrique.count", 1, tags: new[] {"environment:dev"});
      s.Add("titre événement", "contenu", priority: "low");
      s.Add<Statsd.Counting,int>("exemple_métrique.count", 1, tags: new[] {"environment:dev"});

      // Toutes les métriques mises en tampon avant cet appel seront envoyées dans un paquet.
      s.Send();
    }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{% /tab %}}
{{% tab "PHP" %}}

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
{{% /tab %}}
{{< /tabs >}}

### Échantillonner vos métriques

Vous pouvez réduire le trafic depuis votre client DogStatsD vers l'Agent en définissant une valeur de taux d'échantillonnage pour votre client. Par exemple, un taux d'échantillonnage de `0.5` réduit de moitié le nombre de paquets UDP transmis. Cette solution constitue un compromis acceptable : vous réduisez le trafic, mais perdez légèrement en précision et en granularité.

Pour en savoir plus et obtenir des exemples de code, consultez le paragraphe [Sample Rate de la page DogStatsD][4].

### Utiliser DogStatsD sur UDS (Unix Domain Socket)

UDS est un protocole de communication inter-processus utilisé pour [transporter les charges utiles DogStatsD][2]. Comparé au protocole UDP, il présente une charge très limitée et réduit l'empreinte globale de DogStatsD sur votre système.

## Utiliser les mémoires tampon du noyau du système

La plupart des systèmes d'exploitation ajoutent des datagrammes UDP et UDS entrants, qui contiennent vos métriques, dans une mémoire tampon avec une taille limitée. Une fois cette limite atteinte, les datagrammes comprenant vos métriques commencent à être supprimés. Vous pouvez ajuster certaines valeurs afin d'accorder davantage de temps à l'Agent pour le traitement des métriques entrantes :

### Via UDP (User Datagram Protocol)

#### Linux

Sur la plupart des distributions Linux, la taille maximale de la mémoire tampon du noyau est par défaut définie sur `212992` (208 KiB). Pour vous en assurer, utilisez la commande suivante :

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

Pour définir la taille maximale de la mémoire tampon du socket DogStatsD sur 25 MiB, exécutez :

```bash
$ sysctl -w net.core.rmem_max=26214400
```

Ajoutez la configuration suivante à `/etc/sysctl.conf` pour rendre ce changement permanent :

```conf
net.core.rmem_max = 26214400
```

Définissez ensuite l'option de configuration `dogstatsd_so_rcvbuf` de l'Agent sur le même nombre dans `datadog.yaml` :

```yaml
dogstatsd_so_rcvbuf: 26214400
```

## Télémétrie côté client

Par défaut, les clients Dogstatsd envoient des métriques de télémétrie à l'Agent. Cela vous permet d'identifier plus facilement les goulots d'étranglement. Chaque métrique comporte un tag avec le langage du client ainsi qu'un tag avec la version du client. Ces métriques ne sont pas considérées comme des métriques custom et ne sont pas facturées.

Chaque client partage un ensemble de tags communs.

| Tag                | Description                                     | Exemple                |
|--------------------|-------------------------------------------------|------------------------|
| `client`           | Le langage du client.                      | `client:py`            |
| `client_version`   | La version du client.                       | `client_version:1.2.3` |
| `client_transport` | Le protocole de transport du client  (`udp` ou `uds`).  | `client_transport:uds` |

**Remarque** : lorsque vous utilisez le protocole UDP, le client ne peut pas détecter les erreurs réseau et les métriques correspondantes ne tiennent pas compte des octets/paquets non envoyés.

{{< tabs >}}
{{% tab "Python" %}}

La télémétrie a été ajoutée avec la version `0.34.0` du client Python.

| Nom de la métrique                               | Type de métrique | Description                                                                               |
|--------------------------------------------|-------------|-------------------------------------------------------------------------------------------|
| `datadog.dogstatsd.client.metrics`         | count       | Nombre de `metrics` envoyées au client par votre application (avant l'échantillonnage).             |
| `datadog.dogstatsd.client.events`          | count       | Nombre d'`events` envoyés au client par votre application.                                |
| `datadog.dogstatsd.client.service_checks`  | count       | Nombre de `service_checks` envoyés au client par votre application.                        |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Nombre d'octets envoyés à l'Agent.                                           |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | Nombre d'octets non envoyés par le client.                                                    |
| `datadog.dogstatsd.client.packets_sent`    | count       | Nombre de datagrammes envoyés à l'Agent.                                       |
| `datadog.dogstatsd.client.packets_dropped` | count       | Nombre de datagrammes non envoyés par le client.                                                |

Pour désactiver la télémétrie :

```python
statsd.disable_telemetry()
```

Consultez le référentiel [DataDog/datadogpy](https://github.com/DataDog/datadogpy) pour en savoir plus sur la configuration du client.

{{% /tab %}}
{{% tab "Ruby" %}}

Le client Ruby disposera prochainement de fonctionnalités de télémétrie.

{{% /tab %}}
{{% tab "Go" %}}

La télémétrie a été ajoutée avec la version `3.4.0` du client Go.

| Le nom de la métrique                                       | Type de métrique  | Description                                                                     |
|---------------------------------------------------|--------------|---------------------------------------------------------------------------------|
| `datadog.dogstatsd.client.metrics`                | count        | Nombre de `metrics` envoyées au client par votre application (avant l'échantillonnage).   |
| `datadog.dogstatsd.client.events`                 | count        | Nombre d'`events` envoyés au client par votre application.                      |
| `datadog.dogstatsd.client.service_checks`         | count        | Nombre de `service_checks` envoyés au client par votre application.              |
| `datadog.dogstatsd.client.bytes_sent`             | count        | Nombre d'octets envoyés à l'Agent.                                 |
| `datadog.dogstatsd.client.bytes_dropped`          | count        | Nombre d'octets non envoyés par le client.                                          |
| `datadog.dogstatsd.client.bytes_dropped_queue`    | count        | Nombre d'octets non envoyés car la liste d'attente du client était pleine.                      |
| `datadog.dogstatsd.client.bytes_dropped_writer`   | count        | Nombre d'octets non envoyés en raison d'une erreur lors de l'écriture du transport.     |
| `datadog.dogstatsd.client.packets_sent`           | count        | Nombre de datagrammes envoyés à l'Agent.                             |
| `datadog.dogstatsd.client.packets_dropped`        | count        | Nombre de datagrammes non envoyés par le client.                                      |
| `datadog.dogstatsd.client.packets_dropped_queue`  | count        | Nombre de datagrammes non envoyés car la liste d'attente du client était pleine.                  |
| `datadog.dogstatsd.client.packets_dropped_writer` | count        | Nombre de datagrammes non envoyés en raison d'une erreur lors de l'écriture du transport. |


Pour désactiver la télémétrie :

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

Consultez le référentiel [DataDog/datadog-go](https://github.com/DataDog/datadog-go) pour en savoir plus sur la configuration du client.

{{% /tab %}}
{{% tab "Java" %}}

Le client Java disposera prochainement de fonctionnalités de télémétrie.

{{% /tab %}}
{{% tab "PHP" %}}

Le client PHP disposera prochainement de fonctionnalités de télémétrie.

{{% /tab %}}
{{% tab ".NET" %}}

Le client .NET disposera prochainement de fonctionnalités de télémétrie.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent
[2]: /fr/developers/dogstatsd/unix_socket
[3]: /fr/developers/dogstatsd/#code
[4]: /fr/developers/metrics/dogstatsd_metrics_submission/#sample-rates