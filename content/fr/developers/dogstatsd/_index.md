---
title: DogStatsD
kind: documentation
description: 'Présentation des fonctionnalités de DogStatsD, y compris des types de données et du tagging.'
aliases:
  - /fr/guides/dogstatsd/
  - /fr/guides/DogStatsD/
  - /fr/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
  - /fr/integrations/faq/dogstatsd-and-docker
  - /fr/agent/kubernetes/dogstatsd
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

- Type de métrique histogram
- Checks de service
- Événements
- Tagging

Vous pouvez utiliser n'importe quel client StatsD conforme avec DogStatsD et l'Agent. Cependant, vous ne pourrez pas tirer profit des [extensions Datadog](#decouvrir-dogstatsd).

**Remarque** : DogStatsD n'implémente PAS les minuteurs de StatsD en tant que type de métrique native (bien qu'il [les prend en charge par l'intermédiaire des histogrammes][2]).

DogStatsD est disponible sur Docker Hub et GCR :

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/dogstatsd][3]          | [gcr.io/datadoghq/dogstatsd][4]                           |

## Fonctionnement

DogStatsD accepte les [métriques custom][5], les [événements][6] et les [checks de service][7] par le biais du protocole UDP. Il les agrège et les transmet régulièrement à Datadog.

Grâce au protocole UDP, votre application peut envoyer des métriques à DogStatsD et reprendre sa tâche sans attendre de réponse. Si jamais DogStatsD devient indisponible, votre application continue à fonctionner sans interruption.

{{< img src="developers/metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd">}}

Lorsque DogStatsD reçoit des données, il agrège de nombreux points de données pour chaque métrique en un point de données unique sur une période désignée par le terme _intervalle de transmission_ (par défaut, dix secondes).

## Configuration

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


[1]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[2]: /fr/developers/dogstatsd/unix_socket/
[3]: /fr/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Agent de conteneur" %}}

Par défaut, DogStatsD effectue une écoute sur le port UDP **8125**. Vous devez donc associer ce port au port de votre host lorsque l'Agent est exécuté dans un conteneur. Si vos métriques StatsD proviennent d'une source en dehors de `localhost`, vous devez définir `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` pour autoriser la collecte de métriques. Pour exécuter l'Agent avec le serveur DogStatsd activé, exécutez la commande suivante :

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<CLÉ_API_DATADOG>" \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              gcr.io/datadoghq/agent:latest
```

Si vous devez modifier le port utilisé pour recueillir des métriques StatsD, utilisez la variable d'environnement `DD_DOGSTATSD_PORT="<NOUVEAU_PORT_DOGSTATSD>`. Vous pouvez également configurer DogStatsD de façon à utiliser un [socket de domaine Unix][1] :

[1]: /fr/developers/dogstatsd/unix_socket/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour commencer à recueillir vos métriques StatsD, vous devez associer le port DogStatsD à un port du host. Vous pouvez également configurer DogStatsD de façon à utiliser un [socket de domaine Unix][1].

1. Ajoutez un `hostPort` à votre manifeste `datadog-agent.yaml` :

    ```yaml
    ports:
        - containerPort: 8125
          hostPort: 8125
          name: dogstatsdport
          protocol: UDP
    ```

     Vos applications peuvent ainsi envoyer des métriques via DogStatsD sur le port `8125` sur les nœuds sur lesquels elles s'exécutent.

     **Remarque** : la fonction `hostPort` requiert un fournisseur de solution réseau qui respecte la [spécification CNI][2], tel que Calico, Canal ou Flannel. Pour obtenir davantage d'informations, et notamment pour trouver une solution pour les fournisseurs de solution réseau ne respectant pas la spécification CNI, consultez la [documentation Kubernetes][3].

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

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu autorise uniquement les accès en provenance de vos applications et des autres sources de confiance. En outre, certains plug-ins réseau ne prennent pas encore en charge `hostPorts`, ce qui rend ce paramètre inutile.
Pour y remédier, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent, afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur un host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant le pod de démarrer. Cela n'est pas systématiquement possible avec toutes les installations Kubernetes.

### Envoyer des métriques StatsD à l'Agent

Votre application doit désormais pouvoir déterminer de façon fiable l'adresse IP de son host. La version 1.7 de Kubernetes vous permet d'y parvenir facilement, en élargissant l'ensemble d'attributs que vous pouvez transmettre à vos pods sous la forme de variables d'environnement. Dans cette version, et les versions ultérieures, vous pouvez transmettre l'IP du host à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Voici un exemple de manifeste d'application :

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

Grâce à ce manifeste, un pod exécutant votre application peut transmettre des métriques DogStatsD via le port `8125` sur `$DD_AGENT_HOST`.

**Remarque **: Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des attributs. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment unifier votre environnement, consultez la documentation dédiée au [tagging de service unifié][8].

#### Détection de l'origine via UDP

La détection de l'origine est prise en charge par l'Agent 6.10.0 et les versions ultérieures. Elle permet à DogStatsD de détecter la provenance des métriques de conteneur et de taguer automatiquement les métriques. Lorsque ce mode est activé, toutes les métriques transmises via UDP reçoivent les mêmes tags de conteneur que les métriques Autodiscovery.

**Remarque** : comme alternative à UDP, vous pouvez utiliser des [sockets de domaine Unix][4].

Pour activer la détection de l'origine via UDP, ajoutez les lignes suivantes au manifeste de votre application :

```yaml
env:
    - name: DD_ENTITY_ID
      valueFrom:
          fieldRef:
              fieldPath: metadata.uid
```

Pour définir la [cardinalité des tags][5] pour les métriques recueillies avec la détection de l'origine, définissez la variable d'environnement `DD_DOGSTATSD_TAG_CARDINALITY` sur `low` (default) ou `orchestrator`.

**Remarque :** pour UDP, les tags `pod_name` ne sont pas ajoutés par défaut afin d'éviter la création d'un nombre excessif de [métriques custom][6].

[1]: /fr/developers/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /fr/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[5]: /fr/getting_started/tagging/assigning_tags/#environment-variables
[6]: /fr/developers/metrics/custom_metrics/
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

     **Remarque** : la fonction `hostPort` requiert un fournisseur de solution réseau qui respecte la [spécification CNI][3], tel que Calico, Canal ou Flannel. Pour obtenir davantage d'informations, et notamment pour trouver une solution pour les fournisseurs de solution réseau ne respectant pas la spécification CNI, consultez la [documentation Kubernetes][4]. Le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu autorise uniquement les accès à partir de vos applications et des autres sources de confiance. En outre, certains plug-ins réseau ne prennent pas encore en charge `hostPorts`, ce qui rend cette configuration inutile.
   Pour y remédier, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent, afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur un host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant le pod de démarrer. Cela n'est pas systématiquement possible avec toutes les installations Kubernetes.

2. Mettez à jour la configuration de votre Agent :

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. Modifiez les pods de votre application : votre application doit désormais pouvoir déterminer de façon fiable l'adresse IP de son host. La version 1.7 de Kubernetes vous permet d'y parvenir facilement, en élargissant l'ensemble d'attributs que vous pouvez transmettre à vos pods sous la forme de variables d'environnement. Dans cette version, et les versions ultérieures, vous pouvez transmettre l'IP du host à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Voici un exemple de manifeste d'application :

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     Grâce à ce manifeste, un pod exécutant votre application peut transmettre des métriques DogStatsD via le port `8125` sur `$DD_AGENT_HOST`.

[1]: /fr/developers/metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### Code

#### Installer le client DogStatsD

Il existe des bibliothèques client DogStatsD officielles pour les langages suivants. Vous _pouvez_ utiliser n'importe quel [client StatsD générique][8] pour envoyer des métriques à DogStatsD, mais vous ne pourrez pas utiliser toutes les fonctionnalités de Datadog mentionnées ci-dessus :

{{< tabs >}}
{{% tab "Python" %}}

```shell
pip install datadog
```

{{% /tab %}}
{{% tab "Ruby" %}}

```shell
gem install dogstatsd-ruby
```

{{% /tab %}}
{{% tab "Go" %}}

```shell
go get github.com/DataDog/datadog-go/statsd
```

{{% /tab %}}
{{% tab "Java" %}}

Le client Java StatsD Datadog est distribué avec Maven Central et peut être [téléchargé depuis Maven][1]. Commencez par ajouter la configuration suivante à votre fichier `pom.xml` :

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>2.10.1</version>
</dependency>
```


[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{% /tab %}}
{{% tab "PHP" %}}

Ajoutez ce qui suit à votre fichier `composer.json` :

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**Remarque** : la première version distribuée dans Composer est la version _0.0.3_.

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
from datadog import initialize, statsd

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
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();

    }
}
```

{{% /tab %}}
{{% tab "PHP" %}}

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

using (var dogStatsdService = new DogStatsdService())
{
    dogStatsdService.Configure(dogstatsdConfig);
    // ...
} // Transmettre les métriques pas encore envoyées
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous utilisez DogStatsD avec l'Agent de conteneur ou dans Kubernetes, vous devez instancier le host vers lequel les métriques StatsD sont transmises avec la variable d'environnement `$DD_DOGSTATSD_SOCKET` si vous utilisez un socket de domaine Unix, ou avec la variable d'environnement `$DD_AGENT_HOST` si vous avez associé le port DogStatsD à un port du host.

### Paramètres d'instanciation du client

**Remarque **: Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment unifier votre environnement, consultez la documentation dédiée au [tagging de service unifié][9].

En plus de la configuration DogStatsD obligatoire (`url` et `port`), vous pouvez configurer les paramètres facultatifs suivants pour votre client DogStatsD :

{{< tabs >}}
{{% tab "Python" %}}

| Paramètre              | Type            | Valeur par défaut     | Description                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | Chaîne          | `localhost` | Le host de votre serveur DogStatsD.                                                                             |
| `statsd_port`          | Nombre entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `statsd_socket_path`   | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`, uniquement pris en charge avec les versions 6 et ultérieures de l'Agent). |
| `statsd_constant_tags` | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                                                      |
| `statsd_namespace`     | Chaîne          | `null`      | L'espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.                                                   |

Pour en savoir plus, consultez la documentation relative au [module DogStatsD][1].


[1]: https://datadogpy.readthedocs.io/en/latest
{{% /tab %}}
{{% tab "Ruby" %}}

| Paramètre     | Type            | Valeur par défaut     | Description                                                                                                    |
| ------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`        | Chaîne          | `localhost` | Le host de votre serveur DogStatsD.                                                                             |
| `port`        | Nombre entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `socket_path` | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`, uniquement pris en charge avec les versions 6 et ultérieures de l'Agent). |
| `tags`        | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service.                                                      |
| `namespace`   | Chaîne          | `null`      | L'espace de nommage à ajouter devant le nom de chaque métrique, événement et check de service.                                                |

{{% /tab %}}
{{% tab "Go" %}}

| Paramètre               | Type            | Description                                                                                                                                                                                                         |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
| -------------- | --------------- | -------------------------------------------------------------------- |
| `prefix`       | Chaîne          | Le préfixe à appliquer à chaque métrique, événement et check de service.      |
| `hostname`     | Chaîne          | Hostname du serveur StatsD ciblé.                         |
| `port`         | Nombre entier         | Port du serveur StatsD ciblé.                              |
| `constantTags` | Liste de chaînes | Les tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. |

Pour en savoir plus, consultez la documentation relative à la [classe NonBlockingStatsDClient][1].


[1]: https://jar-download.com/artifacts/com.datadoghq/java-dogstatsd-client/2.1.1/documentation
{{% /tab %}}
{{% tab "PHP" %}}

| Paramètre     | Type            | Valeur par défaut     | Description                                                                                                                                                         |
| ------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`        | Chaîne          | `localhost` | Host de votre serveur DogStatsD. S'il n'est pas défini, l'Agent utilise la variable d'environnement `DD_AGENT_HOST`.                                                  |
| `port`        | Nombre entier         | `8125`      | Port de votre serveur DogStatsD. S'il n'est pas défini, l'Agent utilise la variable d'environnement `DD_DOGSTATSD_PORT`.                                             |
| `socket_path` | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`). Il est uniquement pris en charge avec les versions 6 et ultérieures de l'Agent.                                                  |
| `global_tags` | Liste de chaînes | `null`      | Les tags à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. Le tag `@dd.internal.entity_id` est ajouté à global_tags depuis la variable d'environnement `DD_ENTITY_ID`. |

{{% /tab %}}
{{% tab ".NET" %}}

| Paramètre          | Type            | Valeur par défaut     | Description                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | Chaîne          | `localhost` | Hostname du serveur StatsD ciblé.                         |
| `StatsdPort`       | Nombre entier         | `8125`      | Port du serveur StatsD ciblé.                              |
| `Prefix`           | Chaîne          | `null`      | Le préfixe à appliquer à chaque métrique, événement et check de service.           |
| `ConstantTags`     | Liste de chaînes | `null`      | Les tags globaux à appliquer à toutes les métriques, à tous les événements et à tous les checks de service. |

{{% /tab %}}
{{< /tabs >}}

## Découvrir DogStatsD

DogStatsD et StatsD sont assez semblables. Toutefois, DogStatsD comprend des fonctionnalités avancées propres à Datadog, notamment en ce qui concerne les types de données, les événements, les checks de service et les tags disponibles :

{{< whatsnext desc="">}}
{{< nextlink href="/developers/metrics/dogstatsd_metrics_submission/" >}}Envoyer des métriques à Datadog avec DogStatsD{{< /nextlink >}}
{{< nextlink href="/developers/events/dogstatsd/" >}}Envoyer des événements à Datadog avec DogStatsD{{< /nextlink >}}
{{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Envoyer des checks de service à Datadog avec DogStatsD{{< /nextlink >}}
{{< /whatsnext >}}

Si vous souhaitez approfondir vos connaissances sur le format des datagrammes utilisé par DogStatsD, ou concevoir votre propre bibliothèque Datadog, consultez la section [Datagramme et interface système][10], qui décrit également comment envoyer des métriques et des événements directement depuis la ligne de commande.

[1]: https://github.com/etsy/statsd
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /fr/developers/metrics/custom_metrics/
[6]: /fr/developers/events/dogstatsd/
[7]: /fr/developers/service_checks/dogstatsd_service_checks_submission/
[8]: /fr/developers/libraries/#api-and-dogstatsd-client-libraries
[9]: /fr/getting_started/tagging/unified_service_tagging
[10]: /fr/developers/metrics/