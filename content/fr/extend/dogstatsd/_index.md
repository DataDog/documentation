---
aliases:
- /fr/guides/dogstatsd/
- /fr/guides/DogStatsD/
- /fr/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /fr/integrations/faq/dogstatsd-and-docker
- /fr/agent/kubernetes/dogstatsd
- /fr/developers/dogstatsd/
description: Aperçu des fonctionnalités de DogStatsD, y compris les types de données
  et le tagging.
further_reading:
- link: integrations/node
  tag: Documentation
  text: Activez DogStatsD pour Node.js via l'intégration Node.js
- link: extend/dogstatsd
  tag: Documentation
  text: Présentation de DogStatsD
- link: extend/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Surveillez vos applications web Linux sur Azure App Service avec Datadog
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Apportez une observabilité haute performance aux environnements Kubernetes
    sécurisés avec le pilote CSI de Datadog
- link: https://learn.datadoghq.com/courses/create-custom-metrics-dogstatsd
  tag: Centre d'apprentissage
  text: Créez des métriques personnalisées avec DogStatsD
title: DogStatsD
---
Le moyen le plus simple de faire parvenir vos métriques d'application personnalisées à Datadog consiste à les transmettre à DogStatsD, un service d'agrégation de métriques fourni avec l'Agent Datadog. DogStatsD implémente le protocole [StatsD][1] et ajoute quelques extensions spécifiques à Datadog :

- Type de métrique Histogramme
- Vérifications de service
- Événements
- Étiquetage

Tout client StatsD conforme fonctionne avec DogStatsD et l'Agent, mais n'inclut pas les [extensions spécifiques à Datadog](#dive-into-dogstatsd).

**Remarque** : DogStatsD ne met PAS en œuvre les temporisateurs de StatsD en tant que type de métrique natif (bien qu'il les prenne en charge via [histogrammes][2]).

DogStatsD est disponible sur le registre de conteneurs Datadog, GAR, ECR, Azure ACR et Docker Hub :

| Registre                   | Image                                   |
| -------------------------- | --------------------------------------- |
| Registre de conteneurs Datadog | [registry.datadoghq.com/dogstatsd][33]  |
| Registre d'artefacts Google   | [gcr.io/datadoghq/dogstatsd][4]         |
| Amazon ECR                 | [public.ecr.aws/datadog/dogstatsd][34]  |
| Azure ACR                  | datadoghq.azurecr.io/dogstatsd          |
| Docker Hub                 | [hub.docker.com/r/datadog/dogstatsd][3] |

<div class="alert alert-warning">Docker Hub est soumis à des limites de taux de téléchargement d'images. Si vous n'êtes pas un client de Docker Hub, Datadog recommande d'utiliser le registre de conteneurs Datadog ou un registre de fournisseur de cloud à la place. Pour les instructions, voir <a href="/agent/guide/changing_container_registry">Changer votre registre de conteneurs</a>.</div>

## Comment cela fonctionne {#how-it-works}

DogStatsD accepte les [métriques custom][5], les [événements][6] et les [checks de service][7] par le biais du protocole UDP. Il les agrège et les transmet régulièrement à Datadog.

Parce qu'il utilise UDP, votre application peut envoyer des métriques à DogStatsD et reprendre son travail sans attendre de réponse. Si DogStatsD devient un jour indisponible, votre application ne subit pas d'interruption.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd" >}}

Lorsqu'il reçoit des données, DogStatsD agrège plusieurs points de données pour chaque métrique unique en un seul point de données sur une période de temps appelée _l'intervalle de vidage_. DogStatsD utilise un intervalle de vidage de 10 secondes.

## Configuration {#setup}

DogStatsD se compose d'un serveur, qui est regroupé avec l'Agent Datadog, et d'une bibliothèque cliente, qui est disponible dans plusieurs langages. Le serveur DogStatsD est activé par défaut sur le port UDP `8125` pour l'Agent v6+. Vous pouvez définir un port personnalisé pour le serveur si nécessaire. Configurez votre client pour qu'il corresponde à l'adresse et au port du serveur DogStatsD de l'Agent Datadog.

### Serveur DogStatsD de l'Agent Datadog {#datadog-agent-dogstatsd-server}

{{< tabs >}}
{{% tab "Agent de host" %}}

Si vous devez changer le port, configurez l'option `dogstatsd_port` dans le fichier de configuration principal de l'[Agent][1], et redémarrez l'Agent. Vous pouvez également configurer DogStatsD pour utiliser un [socket de domaine UNIX][2].

Pour activer un port UDP personnalisé pour le serveur DogStatsD de l'Agent :

1. Définissez le paramètre `dogstatsd_port` :

    ```yaml
    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Redémarrez votre Agent][3].

[1]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /fr/extend/dogstatsd/unix_socket/
[3]: /fr/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Agent de conteneur" %}}

Par défaut, DogStatsD écoute sur le port UDP **8125**, donc vous devez lier ce port à votre port hôte lors de l'exécution de l'Agent dans un conteneur. Si vos métriques StatsD proviennent de l'extérieur de `localhost`, vous devez définir `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` pour permettre la collecte des métriques. Pour exécuter l'Agent avec le serveur DogStatsD actif, exécutez la commande suivante :

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              registry.datadoghq.com/agent:latest
```

Si vous devez changer le port utilisé pour collecter les métriques StatsD, utilisez la variable d'environnement `DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>`. Vous pouvez également configurer DogStatsD pour utiliser un [socket de domaine UNIX][1].

[1]: /fr/extend/dogstatsd/unix_socket/
{{% /tab %}}
{{% tab "Operator Datadog" %}}

La collecte des métriques StatsD est activée par défaut sur le [socket de domaine UNIX][1]. Pour commencer à collecter vos métriques StatsD via UDP, vous devez activer la fonctionnalité DogStatsD dans les paramètres de l'Opérateur.

1. Ajoutez `features.dogstatsd.hostPortConfig.enabled` à votre manifeste `datadog-agent.yaml` :

    ```yaml
    features:
        dogstatsd:
            hostPortConfig:
                enabled: true
    ```

    This is an example `datadog-agent.yaml` manifest:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        credentials:
          apiSecret:
            secretName: datadog-secret
            keyName: api-key
      features:
        dogstatsd:
          hostPortConfig:
            enabled: true
    ```

    This enables the Agent to collect StatsD metrics over UDP on port `8125`.

2. Appliquez le changement :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**Avertissement** : Le paramètre `features.dogstatsd.hostPortConfig.hostPort` ouvre un port sur votre hôte. Assurez-vous que votre pare-feu n'autorise l'accès qu'à vos applications ou sources de confiance. Si votre plugin réseau ne prend pas en charge `hostPorts`, ajoutez `hostNetwork: true` dans les spécifications de votre pod Agent. Cela partage l'espace de noms réseau de votre hôte avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont ouverts sur l'hôte. Si un port est utilisé à la fois sur l'hôte et dans votre conteneur, ils entrent en conflit (puisqu'ils partagent le même espace de noms réseau) et le pod ne démarre pas. Certaines installations Kubernetes ne permettent pas cela.

### Envoyez les métriques StatsD à l'Agent {#send-statsd-metrics-to-the-agent}

Votre application a besoin d'un moyen fiable de déterminer l'adresse IP de son hôte. C'est simple dans Kubernetes 1.7, qui élargit l'ensemble des attributs que vous pouvez passer à vos pods en tant que variables d'environnement. Dans les versions 1.7 et supérieures, vous pouvez passer l'IP de l'hôte à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Par exemple, votre manifeste d'application pourrait ressembler à ceci :

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

Avec cela, tout pod exécutant votre application est capable d'envoyer des métriques DogStatsD avec le port `8125` sur `$DD_AGENT_HOST`.

**Remarque** : En tant que meilleure pratique, Datadog recommande d'utiliser un étiquetage de service unifié lors de l'attribution d'attributs. Le marquage de service unifié relie la télémétrie de Datadog grâce à l'utilisation de trois balises standard : `env`, `service` et `version`. Pour apprendre à unifier votre environnement, consultez [le marquage de service unifié][4].

[1]: /fr/extend/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /fr/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{% tab "Helm" %}}

Pour recueillir des métriques custom avec [DogStatsD][1] avec Helm :

1. Mettez à jour votre fichier [datadog-values.yaml][2] pour activer DogStatsD :

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

     **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][3], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, see the Kubernetes documentation: [HostPort services do not work][4].

     **Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, so add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.

2. Mettez à niveau la configuration de votre Agent :

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. Mettez à jour vos pods d'application : Votre application a besoin d'un moyen fiable pour déterminer l'adresse IP de son hôte. C'est simple dans Kubernetes 1.7, qui élargit l'ensemble des attributs que vous pouvez passer à vos pods en tant que variables d'environnement. Dans les versions 1.7 et supérieures, vous pouvez passer l'IP de l'hôte à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Par exemple, votre manifeste d'application pourrait ressembler à ceci :

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     With this, any pod running your application is able to send DogStatsD metrics through port `8125` on `$DD_AGENT_HOST`.

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### Détection d'origine {#origin-detection}

L'Agent Datadog v6.10.0 prend en charge _la détection d'origine_, ce qui permet à DogStatsD de détecter d'où proviennent les métriques des conteneurs et de les étiqueter automatiquement. Lorsque la détection d'origine est activée, toutes les métriques reçues via UDP sont étiquetées par le même pod 
Les métriques sont étiquetées en tant que métriques d'autodiscovery.

#### Dans un client DogStatsD {#in-a-dogstatsd-client}

La détection d'origine est activée par défaut dans tous les clients DogStatsD.  

Pour **désactiver** la détection d'origine dans un client, effectuez l'une des actions suivantes :
- Définissez la variable d'environnement `DD_ORIGIN_DETECTION_ENABLED=false` 
- Configurez la bibliothèque DogStatsD pour désactiver la détection d'origine. Pour des instructions, consultez [la documentation de votre bibliothèque DogStatsD spécifique][10].

#### Dans l'Agent Datadog {#in-the-datadog-agent}
La détection d'origine n'est pas activée par défaut dans l'Agent Datadog. Pour **activer** la détection d'origine dans l'Agent Datadog, définissez la variable d'environnement `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` sur `true`.

Définissez [`shareProcessNamespace:true` dans la spécification du pod][12] pour aider l'Agent à la détection d'origine sur EKS Fargate.

#### Comment les origines sont détectées {#how-origins-are-detected}

La détection d'origine peut être réalisée de plusieurs manières. La détection d'origine via les cgroups est activée par défaut. La détection d'origine sur UDP ou `DD_EXTERNAL_ENV` nécessite une configuration.

{{< tabs >}}
{{% tab "Cgroups" %}}
Sur Linux, l'ID du conteneur peut être extrait des entrées `procfs` liées à `cgroups`. Le client lit à partir de `/proc/self/cgroup` ou `/proc/self/mountinfo` pour tenter d'analyser l'ID du conteneur. 

Dans cgroup v2, l'ID du conteneur peut être déduit en résolvant le chemin du cgroup à partir de `/proc/self/cgroup`, en le combinant avec le point de montage du cgroup à partir de `/proc/self/mountinfo`. L'inode du répertoire résultant est envoyé à l'Agent Datadog. Si l'Agent Datadog se trouve sur le même nœud que le client, cette information peut être utilisée pour identifier le UID du pod.
{{% /tab %}}

{{% tab "UDP" %}}
Pour activer la détection d'origine sur UDP, ajoutez les lignes suivantes au manifeste de votre application :

```yaml
env:
- name: DD_ENTITY_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.uid
```

Le client DogStatsD attache une étiquette interne, `entity_id`. La valeur de cette étiquette est le contenu de la variable d'environnement `DD_ENTITY_ID`, qui est le UID du pod. 

<div class="alert alert-info">Pour UDP, <code>pod_name</code> les étiquettes ne sont pas ajoutées par défaut pour éviter de créer trop de <a href="/metrics/custom_metrics/">métriques personnalisées</a>.</div>
{{% /tab %}}

{{% tab "DD_EXTERNAL_ENV" %}}
Ajoutez l'étiquette suivante à votre pod :

```
admission.datadoghq.com/enabled: "true"
```

Si votre pod a cette étiquette, le [Contrôleur d'Admissions][1] injecte une variable d'environnement, `DD_EXTERNAL_ENV`. La valeur de cette variable est envoyée dans un champ avec la métrique, qui peut être utilisée par l'Agent Datadog pour déterminer l'origine de la métrique.

[1]: /fr/containers/cluster_agent/admission_controller
{{% /tab %}}
{{< /tabs >}}

#### Cardinalité des étiquettes {#tag-cardinality}

Lisez [Attribution des Étiquettes : Cardinalité des Étiquettes][11] pour plus d'informations sur la cardinalité des étiquettes.

##### Globalement {#globally}

Vous pouvez spécifier la cardinalité des étiquettes globalement en définissant la variable d'environnement `DD_CARDINALITY`, ou en passant un champ `'cardinality'` au constructeur. 

##### Par métrique {#per-metric}

Vous pouvez spécifier la cardinalité des étiquettes par métrique en passant la valeur dans le paramètre `cardinality`. Les valeurs valides pour ce paramètre sont `"none"`, `"low"`, `"orchestrator"` ou `"high"`.

### Client DogStatsD {#dogstatsd-client}

Installez la bibliothèque cliente DogStatsD dans la langue de votre choix et configurez-la pour qu'elle corresponde à l'adresse et au port du serveur DogStatsD de l'Agent Datadog.

#### Installez le client DogStatsD {#install-the-dogstatsd-client}

Les bibliothèques clientes officielles Datadog-DogStatsD sont disponibles pour les langages suivants. Tout client StatsD conforme fonctionne avec DogStatsD et l'Agent, mais n'inclut pas les fonctionnalités spécifiques à Datadog mentionnées ci-dessus :
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

Le client Java DataDog StatsD est distribué avec Maven Central et peut être [téléchargé depuis Maven][1]. Commencez par ajouter la configuration suivante à votre `pom.xml` :

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

Ajoutez ce qui suit à votre `composer.json` :

```text
"datadog/php-datadogstatsd": "1.6.*"
```

**Remarque** : La première version livrée dans Composer est _0.0.3_

Ou clonez manuellement le dépôt sur [github.com/DataDog/php-datadogstatsd][1] et configurez-le avec `require './src/DogStatsd.php'`.



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


#### Instanciez le client DogStatsD {#instantiate-the-dogstatsd-client}

Une fois votre client DogStastD installé, instanciez-le dans votre code :
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

<div class="alert alert-danger">
  Par défaut, les instances du client Python DogStatsD (y compris le <code>statsd</code> instance globale) ne peuvent pas être partagées entre les processus mais sont sûres pour les threads. En raison de cela, le processus parent et chaque processus enfant doivent créer leurs propres instances du client ou le tamponnage doit être explicitement désactivé en définissant <code>disable_buffering</code> par <code>True</code>. Consultez la documentation sur <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> pour plus de détails.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)
```

<div class="alert alert-info">
  Si vous utilisez DogStatsD avec l'Agent de Conteneur ou dans Kubernetes, vous devez instancier l'hôte vers lequel les métriques StatsD sont transférées avec le <code>$DD_DOGSTATSD_SOCKET</code> variable d'environnement si vous utilisez un socket de domaine UNIX, ou avec le <code>$DD_AGENT_HOST</code> variable d'environnement si vous utilisez la méthode de liaison de port hôte.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

Pour toutes les options disponibles, consultez la documentation [GoDoc de Datadog][1].



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


        // alternatively
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

Instanciez un nouvel objet DogStatsD avec `composer` :

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
// The code is located under the StatsdClient namespace
using StatsdClient;

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
} // Flush metrics not yet sent
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Paramètres d'instanciation du client {#client-instantiation-parameters}

**Remarque** : En tant que meilleure pratique, Datadog recommande d'utiliser le marquage de service unifié lors de l'attribution des étiquettes. Le marquage de service unifié relie la télémétrie de Datadog grâce à l'utilisation de trois étiquettes standard : `env`, `service` et `version`. Pour savoir comment unifier votre environnement, consultez la page [Unified Service Tagging][8].

En plus de la configuration requise de DogStatsD (`url` et `port`), les paramètres optionnels suivants sont disponibles pour votre client DogStatsD :

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| Paramètre              | Type            | Par défaut     | Description                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | Chaîne          | `localhost` | L'hôte de votre serveur DogStatsD.                                                                             |
| `statsd_port`          | Entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `statsd_socket_path`   | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`, uniquement pris en charge avec l'Agent v6+). |
| `statsd_constant_tags` | Liste de chaînes | `null`      | Étiquettes à appliquer à toutes les métriques, événements et vérifications de service.                                                      |
| `statsd_namespace`     | Chaîne          | `null`      | Espace de noms pour préfixer toutes les métriques, événements et vérifications de service.                                                   |

Pour la liste complète des paramètres optionnels disponibles pour `datadog.initialize()` ainsi que des paramètres uniquement disponibles lors de l'instanciation explicite des instances `datadog.dogstatsd.DogStatsd`, consultez la [bibliothèque Python de Datadog][1].


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| Paramètre       | Type            | Par défaut     | Description                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | Chaîne          | `localhost` | L'hôte de votre serveur DogStatsD.                                                                             |
| `port`          | Entier         | `8125`      | Le port de votre serveur DogStatsD.                                                                             |
| `socket_path`   | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`, uniquement pris en charge avec l'Agent v6+). |
| `tags`          | Liste de chaînes | `null`      | Étiquettes à appliquer à toutes les métriques, événements et vérifications de service.                                                      |
| `namespace`     | Chaîne          | `null`      | Espace de noms à préfixer à toutes les métriques, événements et vérifications de service.                                                |
| `single_thread` | Booléen         | `false`     | Fait que le client envoie les métriques sur le fil principal lorsqu'il est activé plutôt que dans un fil compagnon.           |

Pour obtenir la liste complète des paramètres facultatifs, consultez le [référentiel dogstatsd-ruby][1] sur GitHub.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Le client Go dispose de plusieurs options pour la configuration du comportement de votre client.

| Paramètre         | Type            | Description                                                                 |
| ----------------- | --------------- | --------------------------------------------------------------------------- |
| `WithNamespace()` | Chaîne          | Configurer un espace de noms à préfixer à toutes les métriques, événements et vérifications de service. |
| `WithTags()`      | Liste de chaînes | Étiquettes globales appliquées à chaque métrique, événement et vérification de service.              |

Pour découvrir toutes les options disponibles, consultez la [documentation Datadog pour Go][1] (en anglais).


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

À partir de v2.10.0, la manière recommandée d'instancier le client est avec le NonBlockingStatsDClientBuilder. Vous
vous pouvez utiliser les méthodes de constructeur suivantes pour définir les paramètres du client.

| Méthode de constructeur                               | Type           | Par défaut   | Description                                                                        |
| -------------------------------------------- | -------------- | --------- | ---------------------------------------------------------------------------------- |
| `prefix(String val)`                         | Chaîne         | null      | Le préfixe à appliquer à toutes les métriques, événements et vérifications de service.                    |
| `hostname(String val)`                       | Chaîne         | localhost | Le nom d'hôte du serveur StatsD ciblé.                                       |
| `port(int val)`                              | Entier         | 8125      | Le port du serveur StatsD ciblé.                                            |
| `constantTags(String... val)`                | Chaîne varargs | null      | Tags globaux à appliquer à chaque métrique, événement et vérification de service.               |
| `blocking(boolean val)`                      | Booléen        | false     | Le type de client à instancier : bloquant ou non-bloquant.                       |
| `socketBufferSize(int val)`                  | Entier         | -1        | La taille du tampon de socket sous-jacent.                                          |
| `enableTelemetry(boolean val)`               | Booléen        | false     | Rapport de télémétrie du client.                                                        |
| `entityID(String val)`                       | Chaîne         | null      | ID d'entité pour la détection d'origine.                                                    |
| `errorHandler(StatsDClientErrorHandler val)` | Entier         | null      | Gestionnaire d'erreurs en cas d'erreur interne du client.                                 |
| `maxPacketSizeBytes(int val)`                | Entier         | 8192/1432 | La taille maximale du paquet ; 8192 sur UDS, 1432 pour UDP.                              |
| `processorWorkers(int val)`                  | Entier         | 1         | Le nombre de threads de travail du processeur assemblant des tampons pour soumission.          |
| `senderWorkers(int val)`                     | Entier         | 1         | Le nombre de threads de travail d'envoi soumettant des tampons au socket.              |
| `poolSize(int val)`                          | Entier         | 512       | Taille du pool de tampons de paquets réseau.                                                   |
| `queueSize(int val)`                         | Entier         | 4096      | Nombre maximum de messages non traités dans la file d'attente.                               |
| `timeout(int val)`                           | Entier         | 100       | le délai d'attente en millisecondes pour les opérations bloquantes. S'applique uniquement aux sockets UNIX. |

Pour plus d'informations, recherchez le [package][1] Java DogStatsD pour la classe NonBlockingStatsDClient et la classe NonBlockingStatsDClientBuilder. Assurez-vous de consulter la version qui correspond à votre version du client.


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| Paramètre          | Type            | Par défaut     | Description                                                                                                                                                                                            |
| ------------------ | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`             | Chaîne          | `localhost` | L'hôte de votre serveur DogStatsD. Si cela n'est pas défini, l'Agent consulte la variable d'environnement `DD_AGENT_HOST` ou `DD_DOGSTATSD_URL`.                                                               |
| `port`             | Entier         | `8125`      | Le port de votre serveur DogStatsD. Si cela n'est pas défini, l'Agent consulte la variable d'environnement `DD_DOGSTATSD_PORT` ou `DD_DOGSTATSD_URL`.                                                          |
| `socket_path`      | Chaîne          | `null`      | Le chemin vers le socket de domaine UNIX de DogStatsD (remplace `host` et `port`). Ceci n'est pris en charge qu'avec l'Agent v6+. Si cela n'est pas défini, l'Agent consulte la variable d'environnement `DD_DOGSTATSD_URL`. |
| `global_tags`      | Liste de chaînes | `null`      | Étiquettes à appliquer à toutes les métriques, événements et vérifications de service. L'étiquette `@dd.internal.entity_id` est ajoutée à global_tags de la variable d'environnement `DD_ENTITY_ID`.                                    |
| `origin_detection` | Booléen         | Vrai        | Les champs de détection d'origine doivent-ils être ajoutés à chaque métrique ?                                                                                                                                                |
| `container_id`     | Chaîne          | `null`      | Un identifiant de conteneur pour taguer toutes les métriques pour la détection d'origine.                                                                                                                                           |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| Paramètre          | Type            | Par défaut     | Description                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | Chaîne          | `localhost` | Le nom d'hôte du serveur StatsD ciblé.                         |
| `StatsdPort`       | Entier         | `8125`      | Le port du serveur StatsD ciblé.                              |
| `Prefix`           | Chaîne          | `null`      | Préfixe à appliquer à chaque métrique, événement et vérification de service.           |
| `ConstantTags`     | Liste de chaînes | `null`      | Tags globaux à appliquer à chaque métrique, événement et vérification de service. |
| `OriginDetection`  | Bool            | Vrai        | Les champs de détection d'origine doivent-ils être ajoutés à chaque métrique ?              |
| `ContainerID`      | Chaîne          | `null`      | Un identifiant de conteneur à associer à toutes les métriques pour la détection d'origine.         |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Plongez dans DogStatsD {#dive-into-dogstatsd}

DogStatsD et StatsD sont assez semblables. Toutefois, DogStatsD comprend des fonctionnalités avancées propres à Datadog, y compris les types de données, les événements, les checks de service et les tags disponibles :

{{< whatsnext desc="">}}
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}Envoyez des métriques à Datadog avec DogStatsD.{{< /nextlink >}}
{{< nextlink href="/events/guides/dogstatsd/" >}}Envoyez des événements à Datadog avec DogStatsD.{{< /nextlink >}}
{{< nextlink href="/extend/service_checks/dogstatsd_service_checks_submission/" >}}Envoyez des vérifications de service à Datadog avec DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

Si vous souhaitez approfondir vos connaissances sur le format des datagrammes utilisé par DogStatsD, ou concevoir votre propre bibliothèque Datadog, consultez la section relative au [datagramme et à l'interface système][9], qui décrit également comment envoyer des métriques et des événements directement depuis la ligne de commande.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/statsd/statsd
[2]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /fr/metrics/custom_metrics/
[6]: /fr/events/guides/dogstatsd/
[7]: /fr/extend/service_checks/dogstatsd_service_checks_submission/
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/extend/dogstatsd/datagram_shell/
[10]: /fr/extend/community/libraries/
[11]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[12]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[33]: https://registry.datadoghq.com/v2/dogstatsd/tags/list
[34]: https://gallery.ecr.aws/datadog/dogstatsd