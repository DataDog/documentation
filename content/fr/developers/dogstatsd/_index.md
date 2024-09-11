---
aliases:
- /fr/guides/dogstatsd/
- /fr/guides/DogStatsD/
- /fr/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /fr/integrations/faq/dogstatsd-and-docker
- /fr/agent/kubernetes/dogstatsd
description: Présentation des fonctionnalités de DogStatsD, y compris des types de
  données et du tagging.
further_reading:
- link: developers/dogstatsd
  tag: Documentation
  text: Présentation de DogStatsD
- link: developers/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Surveiller vos applications Web Linux sur Azure App Service avec Datadog
title: DogStatsD
---

La meilleure façon d'intégrer vos métriques custom d'application à Datadog consiste à les envoyer à DogStatsD, un service d'agrégation de métriques fourni avec l'Agent Datadog. DogStatsD exécute le protocole [StatsD][1] en apportant quelques extensions spécifiques à Datadog :

- Type de métrique histogram
- Checks de service
- Événements
- Tags

Vous pouvez utiliser n'importe quel client StatsD conforme avec DogStatsD et l'Agent. Cependant, les [extensions Datadog](#decouvrir-dogstatsd) ne sont pas incluses.

**Remarque** : DogStatsD n'implémente PAS les timers de StatsD en tant que type de métrique native (bien qu'il les prend en charge par l'intermédiaire des [histogrammes][2]).

DogStatsD est disponible sur Docker Hub et GCR :

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/dogstatsd][3]          | [gcr.io/datadoghq/dogstatsd][4]                           |

<div class="alert alert-warning">Docker Hub est soumis à des limites de pull d'images. Si vous n'êtes pas client Docker Hub, Datadog vous recommande de mettre à jour la configuration de votre Agent Datadog et de votre Agent de cluster afin de récupérer les images à partir de GCR ou ECR. Pour connaître la marche à suivre, consultez la section <a href="/agent/guide/changing_container_registry">Modifier votre registre de conteneurs</a>.</div>

## Fonctionnement

DogStatsD accepte les [métriques custom][5], les [événements][6] et les [checks de service][7] par le biais du protocole UDP. Il les agrège et les transmet régulièrement à Datadog.

Grâce au protocole UDP, votre application peut envoyer des métriques à DogStatsD et reprendre sa tâche sans attendre de réponse. Si jamais DogStatsD devient indisponible, votre application continue à fonctionner sans interruption.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="Dogstatsd" >}}

Lorsque DogStatsD reçoit des données, il agrège de nombreux points de données pour chaque métrique au sein d'un seul point de données, sur une période correspondant à l'_intervalle de transmission_. Par défaut, l'intervalle de transmission de DogStatsD dure 10 secondes.

## Implémentation

DogStatsD est activé par défaut sur le port UDP `8125` à partir de la version 6 de l'Agent. Si vous ne devez pas changer ce port, passez directement à la [configuration de DogStatsD dans votre code](#code).

### Agent

{{< tabs >}}
{{% tab "Agent de host" %}}

Par défaut, DogStatsD effectue une écoute sur le port UDP **8125**. Pour modifier ce réglage, configurez l'option `dogstatsd_port` dans le [fichier de configuration principal de l'Agent][1] et redémarrez l'Agent. Vous pouvez également configurer DogStatsD afin d'utiliser [un socket de domaine Unix][2]. Pour activer un port UDP personnalisé pour le serveur DogStatsD de l'Agent :

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

2. [Redémarrez votre Agent][3].


[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /fr/developers/dogstatsd/unix_socket/
[3]: /fr/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Agent de conteneur" %}}

Par défaut, DogStatsD effectue une écoute sur le port UDP **8125**. Vous devez donc associer ce port au port de votre host lorsque l'Agent est exécuté dans un conteneur. Si vos métriques StatsD proviennent d'une source en dehors de `localhost`, vous devez définir `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` pour autoriser la collecte de métriques. Pour exécuter l'Agent avec le serveur DogStatsd activé, exécutez la commande suivante :

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              gcr.io/datadoghq/agent:latest
```

Si vous devez modifier le port utilisé pour recueillir des métriques StatsD, utilisez la variable d'environnement `DD_DOGSTATSD_PORT="<NOUVEAU_PORT_DOGSTATSD>`. Vous pouvez également configurer DogStatsD de façon à utiliser un [socket de domaine Unix][1] :

#### Détection de l'origine via UDP

La détection de l'origine est prise en charge à partir de l'Agent 6.10.0. Elle permet à DogStatsD de détecter la provenance des métriques de conteneur et de taguer automatiquement les métriques. Lorsque ce mode est activé, toutes les métriques transmises via UDP reçoivent les mêmes tags de pod que les métriques Autodiscovery.

La détection de l'origine dans les environnements non basés sur Kubernetes fait appel à une extension du protocole DogStatsD dans le [Datagramme et interface système][2]. Pour activer cette fonctionnalité dans l'Agent, définissez la variable d'environnement `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` sur `true`.

**Remarque** : la détection de l'origine n'est pas prise en charge pour les environnements Fargate.

[1]: /fr/developers/dogstatsd/unix_socket/
[2]: /fr/developers/dogstatsd/datagram_shell/?tab=metrics#dogstatsd-protocol-v12
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour commencer à recueillir vos métriques StatsD, vous devez lier le port DogStatsD au port d'un host. Vous pouvez également configurer DogStatsD de façon à utiliser un [socket de domaine Unix][1].

1. Ajoutez un `hostPort` à votre manifeste `datadog-agent.yaml` :

    ```yaml
    ports:
        - containerPort: 8125
          hostPort: 8125
          name: dogstatsdport
          protocol: UDP
    ```

     Vos applications peuvent ainsi envoyer des métriques par l'intermédiaire de DogStatsD sur le port `8125` sur les nœuds sur lesquels elles s'exécutent.

     **Remarque** : la fonction `hostPort` requiert un fournisseur réseau qui respecte la [spécification CNI][2], tel que Calico, Canal ou Flannel. Pour obtenir davantage d'informations, et notamment pour trouver une solution pour les fournisseurs réseau ne respectant pas la spécification CNI, consultez la section [Services HostPort non fonctionnels][3] de la documentation Kubernetes (en anglais).

     **Remarque** : pour un déploiement d'Operator, configurez le port du host à l'aide de `agent.config.hostPort`.

2. Activez le trafic DogStatsD non local pour permettre la collecte de données StatsD en définissant `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` dans votre manifeste `datadog-agent.yaml` :

    ```yaml
    - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
      value: 'true'
    ```

     Cela permet de recueillir les données StatsD depuis des conteneurs autres que celui qui exécute l'Agent.

3. Appliquez la modification :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu accorder uniquement un accès à vos applications ou à d'autres sources de confiance. Si votre plug-in réseau ne prend pas en charge `hostPorts`, vous devez ajouter `hostNetwork: true` aux spécifications de pod de votre Agent afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur le host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant ainsi le pod de démarrer. Cela n'est pas possible avec certaines installations Kubernetes.

### Envoyer des métriques StatsD à l'Agent

Votre application doit pouvoir déterminer de façon fiable l'adresse IP de son host. La version 1.7 de Kubernetes vous permet d'y parvenir facilement, en élargissant l'ensemble d'attributs que vous pouvez transmettre à vos pods sous la forme de variables d'environnement. Dans cette version, et les versions ultérieures, vous pouvez transmettre l'IP du host à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Voici un exemple de manifeste d'application :

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

Grâce à ce manifeste, un pod exécutant votre application peut transmettre des métriques DogStatsD avec le port `8125` sur `$DD_AGENT_HOST`.

**Remarque** : Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des attributs. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment unifier votre environnement, consultez la section [Tagging de service unifié][4].

#### Détection de l'origine via UDP

La détection de l'origine est prise en charge par l'Agent 6.10.0 et les versions ultérieures. Elle permet à DogStatsD de détecter la provenance des métriques de conteneur et de taguer automatiquement les métriques. Lorsque ce mode est activé, toutes les métriques transmises via UDP reçoivent les mêmes tags de pod que les métriques Autodiscovery.

**Remarques** : 

* La détection de l'origine via UDP utilise l'ID de pod en tant qu'ID d'entité. Les tags au niveau des conteneurs ne sont donc pas émis.
* Comme alternative à UDP, vous pouvez utiliser des [sockets de domaine Unix][5].

Pour activer la détection de l'origine via UDP, ajoutez les lignes suivantes au manifeste de votre application :

```yaml
env:
    - name: DD_ENTITY_ID
      valueFrom:
          fieldRef:
              fieldPath: metadata.uid
```

Pour définir la [cardinalité des tags][6] pour les métriques recueillies avec la détection de l'origine, définissez la variable d'environnement `DD_DOGSTATSD_TAG_CARDINALITY` sur `low` (valeur par défaut) ou `orchestrator`.

**Remarque** :; pour UDP, les tags `pod_name` ne sont pas ajoutés par défaut afin d'éviter la création d'un nombre excessif de [métriques custom][7].

[1]: /fr/developers/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: /fr/developers/dogstatsd/unix_socket/?tab=host#using-origin-detection-for-container-tagging
[6]: /fr/getting_started/tagging/assigning_tags/#environment-variables
[7]: /fr/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Helm" %}}

Pour recueillir des métriques custom via [DogStatsD][1] avec Helm :

1. Modifiez votre fichier [datadog-values.yaml][2] pour activer DogStatsD :

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

     **Remarque** : la fonction `hostPort` requiert un fournisseur réseau qui respecte la [spécification CNI][3], tel que Calico, Canal ou Flannel. Pour obtenir davantage d'informations, et notamment pour trouver une solution pour les fournisseurs réseau ne respectant pas la spécification CNI, consultez la section [Services HostPort non fonctionnels][4] de la documentation Kubernetes (en anglais).

     **Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu accorder uniquement un accès à vos applications ou à d'autres sources de confiance. Si votre plug-in réseau ne prend pas en charge `hostPorts`, vous devez ajouter `hostNetwork: true` aux spécifications de pod de votre Agent afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur le host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant ainsi le pod de démarrer. Cela n'est pas possible avec certaines installations Kubernetes.

2. Mettez à jour la configuration de votre Agent :

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. Modifiez les pods de votre application : votre application doit pouvoir déterminer de façon fiable l'adresse IP de son host. La version 1.7 de Kubernetes vous permet d'y parvenir facilement, en élargissant l'ensemble d'attributs que vous pouvez transmettre à vos pods sous la forme de variables d'environnement. Dans cette version, et les versions ultérieures, vous pouvez transmettre l'IP du host à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Voici un exemple de manifeste d'application :

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     Grâce à ce manifeste, un pod exécutant votre application peut transmettre des métriques DogStatsD avec le port `8125` sur `$DD_AGENT_HOST`.

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### Code

#### Installer le client DogStatsD

Il existe des bibliothèques client Datadog/DogStatsD officielles pour les langages suivants. Vous pouvez utiliser n'importe quel client StatsD conforme avec DogStatsD et l'Agent. Sachez cependant que les fonctionnalités mentionnées ci-dessus ne seront pas incluses :
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```shell
pip install datadog
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```shell
gem install dogstatsd-ruby
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```shell
go get github.com/DataDog/datadog-go/v5/statsd
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Le client Java StatsD Datadog est distribué avec Maven Central et peut être [téléchargé depuis Maven][1]. Commencez par ajouter la configuration suivante à votre fichier `pom.xml` :

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>4.2.1</version>
</dependency>
```



[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

Ajoutez ce qui suit à votre fichier `composer.json` :

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**Remarque** : la première version distribuée dans Composer est la version _0.0.3_.

Vous pouvez également dupliquer manuellement le référentiel disponible sur [github.com/DataDog/php-datadogstatsd][1] et le configurer avec `require './src/DogStatsd.php'`.



[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Installez le package directement via l'interface de ligne de commande Nuget ou récupérez [le PackageReference depuis NuGet][1] :

```shell
dotnet add package DogStatsD-CSharp-Client
```

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


#### Instancier le client DogStatsD

Une fois votre client DogStatsD installé, instanciez-le dans votre code :
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

<div class="alert alert-warning">
  Par défaut, les instances de client DogStatsD Python (y compris l'instance globale <code>statsd</code>) ne peuvent pas être partagées entre des processus, mais sont thread-safe. De ce fait, le processus parent et chaque processus enfant doivent créer leurs propres instances du client, ou la mise en mémoire tampon doit être explicitement désactivée en définissant <code>disable_buffering</code> sur <code>True</code>. Consultez la documentation sur <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> pour en savoir plus.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Importer la bibliothèque
require 'datadog/statsd'

# Créer une instance client DogStatsD
statsd = Datadog::Statsd.new('localhost', 8125)
```

<div class="alert alert-info">
  Si vous utilisez DogStatsD avec l'Agent de conteneur ou dans Kubernetes, vous devez instancier le host auquel les métriques StatsD sont transmises avec la variable d'environnement <code>$DD_DOGSTATSD_SOCKET</code> si vous utilisez un socket de domaine Unix, ou avec la variable d'environnement <code>$DD_AGENT_HOST</code> si vous avez lié le port DogStatsD à un port du host.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

Pour découvrir plus d'options, consultez la [documentation Datadog pour Go][1] (en anglais).



[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();


        // ou utiliser
        StatsDClient statsdAlt = new NonBlockingStatsDClient(
            new NonBlockingStatsDClientBuilder(
                .prefix("statsd")
                .hostname("localhost")
                .port(8125)
                .resolve()));

    }
}
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

Instanciez un nouvel objet DogStatsD avec Composer :

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

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Configurez la classe DogStatsD :

```csharp
// Le code se trouve sous l'espace de nommage StatsdClient

// ...

var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

using (var dogStatsdService = new DogStatsdService())
{
    if (!dogStatsdService.Configure(dogstatsdConfig))
        throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    // ...
} // Transmettre les métriques pas encore envoyées
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Paramètres d'instanciation du client

**Remarque** : Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment unifier votre environnement, consultez la section [Tagging de service unifié][8].

En plus de la configuration DogStatsD obligatoire (`url` et `port`), vous pouvez configurer les paramètres facultatifs suivants pour votre client DogStatsD :

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| Paramètre              | Type            | Valeur par défaut     | Description                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | Chaîne          | `localhost` | Le host de votre serveur DogStatsD.                                                                             |
| `statsd_port`          | Nombre entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `statsd_socket_path`   | Chaîne          | `null`      | Le chemin vers le socket de domaine Unix de DogStatsD (remplace `host` et `port`, uniquement pris en charge par l'Agent v6+). |
| `statsd_constant_tags` | Liste de chaînes | `null`      | Les tags à appliquer à l'ensemble des métriques, événements et checks de service.                                                      |
| `statsd_namespace`     | Chaîne          | `null`      | L'espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.                                                   |

Pour obtenir la liste complète des paramètres facultatifs disponibles pour `datadog.initialize()`, ainsi que les paramètres qui sont uniquement disponibles lorsque vous instanciez explicitement des instances `datadog.dogstatsd.DogStatsd`, consultez la [bibliothèque Python de Datadog][1].


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| Paramètre       | Type            | Valeur par défaut     | Rôle                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | Chaîne          | `localhost` | Le host de votre serveur DogStatsD.                                                                             |
| `port`          | Nombre entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `socket_path`   | Chaîne          | `null`      | Le chemin vers le socket de domaine Unix de DogStatsD (remplace `host` et `port`, uniquement pris en charge par l'Agent v6+). |
| `tags`          | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                                                      |
| `namespace`     | Chaîne          | `null`      | L'espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.                                                |
| `single_thread` | Booléen         | `false`     | Lorsque ce paramètre est activé, il permet au client d'envoyer les métriques sur le thread principal plutôt que dans un thread complémentaire.           |

Pour obtenir la liste complète des paramètres facultatifs, consultez le [référentiel dogstatsd-ruby][1] sur GitHub.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Le client Go dispose de plusieurs options pour la configuration du comportement de votre client.

| Paramètre                     | Type            | Rôle                                                                  |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `WithNamespace()`             | Chaîne          | Permet de configurer un espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.  |
| `WithTags()`                  | Liste de chaînes | Les tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.               |

Pour découvrir toutes les options disponibles, consultez la [documentation Datadog pour Go][1] (en anglais).


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Depuis la version 2.10.0, il est conseillé d'instancier le client avec NonBlockingStatsDClientBuilder. Vous pouvez utiliser les méthodes de builder suivantes pour définir les paramètres du client.

| Méthode de builder                               | Type           | Valeur par défaut   | Rôle                                                                         |
| -------------------------------------------- | -------------- | --------- | ----------------------------------------------------------------------------------- |
| `prefix(String val)`                         | Chaîne         | null      | Préfixe à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                     |
| `hostname(String val)`                       | Chaîne         | localhost | Hostname du serveur StatsD ciblé.                                        |
| `port(int val)`                              | Nombre entier        | 8125      | Port du serveur StatsD ciblé.                                             |
| `constantTags(String... val)`                | Varargs sous forme de chaîne | null      | Tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                |
| `blocking(boolean val)`                      | Booléen        | false     | Le type de client à instancier : bloquant ou non bloquant.                        |
| `socketBufferSize(int val)`                  | Nombre entier        | -1        | La taille du buffer du socket sous-jacent.                                           |
| `enableTelemetry(boolean val)`               | Booléen        | false     | Transmission de données de télémétrie sur le client.                                                         |
| `entityID(String val)`                       | Chaîne         | null      | ID d'entité pour la détection de l'origine.                                                   |
| `errorHandler(StatsDClientErrorHandler val)` | Nombre entier        | null      | Gestionnaire d'erreurs en cas d'erreur client interne.                                  |
| `maxPacketSizeBytes(int val)`                | Nombre entier        | 8192/1432 | Taille maximale des paquets ; 8192 via UDS, 1432 via UDP.                               |
| `processorWorkers(int val)`                  | Nombre entier        | 1         | Nombre de threads worker de processeur qui assemblent les buffers à envoyer.           |
| `senderWorkers(int val)`                     | Nombre entier        | 1         | Nombre de threads worker d'expéditeur qui envoient les buffers au socket.               |
| `poolSize(int val)`                          | Nombre entier        | 512       | Taille du pool de buffers de paquets réseau.                                                    |
| `queueSize(int val)`                         | Nombre entier        | 4096      | Nombre maximal de messages non traités dans la file d'attente.                                |
| `timeout(int val)`                           | Nombre entier        | 100       | Délai en millisecondes pour les opérations de blocage. S'applique uniquement aux sockets Unix.  |

Pour en savoir plus, recherchez le [package][1] DogStatsD Java pour les classes NonBlockingStatsDClient et NonBlockingStatsDClientBuilder. Veillez à utiliser la version correspondant à votre client.


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| Paramètre     | Type            | Valeur par défaut     | Rôle                                                                                                                                                         |
| ------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`        | Chaîne          | `localhost` | Host de votre serveur DogStatsD. S'il n'est pas défini, l'Agent utilise la variable d'environnement `DD_AGENT_HOST`.                                                  |
| `port`        | Nombre entier         | `8125`      | Port de votre serveur DogStatsD. S'il n'est pas défini, l'Agent utilise la variable d'environnement `DD_DOGSTATSD_PORT`.                                             |
| `socket_path` | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`). Il est uniquement pris en charge avec les versions 6 et ultérieures de l'Agent.                                                  |
| `global_tags` | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. Le tag `@dd.internal.entity_id` est ajouté à global_tags depuis la variable d'environnement `DD_ENTITY_ID`. |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| Paramètre          | Type            | Valeur par défaut     | Rôle                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | Chaîne          | `localhost` | Hostname du serveur StatsD ciblé.                         |
| `StatsdPort`       | Nombre entier         | `8125`      | Port du serveur StatsD ciblé.                              |
| `Prefix`           | Chaîne          | `null`      | Le préfixe à appliquer à chaque métrique, événement et check de service.           |
| `ConstantTags`     | Liste de chaînes | `null`      | Tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Découvrir DogStatsD

DogStatsD et StatsD sont assez semblables. Toutefois, DogStatsD comprend des fonctionnalités avancées propres à Datadog, notamment en ce qui concerne les types de données, les événements, les checks de service et les tags disponibles :

{{< whatsnext desc="">}}
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}Envoyer des métriques à Datadog avec DogStatsD{{< /nextlink >}}
{{< nextlink href="/service_management/events/guides/dogstatsd/" >}}Envoyer des événements à Datadog avec DogStatsD{{< /nextlink >}}
{{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Envoyer des checks de service à Datadog avec DogStatsD{{< /nextlink >}}
{{< /whatsnext >}}

Si vous souhaitez approfondir vos connaissances sur le format des datagrammes utilisé par DogStatsD, ou concevoir votre propre bibliothèque Datadog, consultez la section relative au [datagramme et à l'interface système][9], qui décrit également comment envoyer des métriques et des événements directement depuis la ligne de commande.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd
[2]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /fr/metrics/custom_metrics/
[6]: /fr/service_management/events/guides/dogstatsd/
[7]: /fr/developers/service_checks/dogstatsd_service_checks_submission/
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/developers/dogstatsd/datagram_shell/