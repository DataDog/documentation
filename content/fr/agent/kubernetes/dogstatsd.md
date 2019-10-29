---
title: Envoyer des métriques custom à DogStatsD pour Kubernetes
kind: documentation
further_reading:
  - link: agent/kubernetes/metrics
    tag: documentation
    text: Métriques Kubernetes
  - link: developers/dogstatsd
    tag: documentation
    text: DogStatsD
---
Pour générer des métriques custom à partir de votre application Kubernetes, utilisez [DogStatsD][1], un service d'agrégation de métriques fourni avec l'Agent Datadog. DogStatsD ajoute de nouvelles fonctionnalités au protocole [StatsD][2]. Consultez la [documentation sur DogStatsD][1] pour en savoir plus.

## Utiliser DogStatsD sur un socket de domaine Unix

Vous pouvez utiliser [DogStatsD sur un socket de domaine Unix][3].

### Créer un socket d'écoute

Modifiez votre fichier `datadog.yaml` afin de définir l'option `dogstatsd_socket` sur le chemin où DogStatsD doit créer son socket d'écoute :

```
dogstatsd_socket: /var/run/datadog/dsd.socket
```

[Redémarrez ensuite votre Agent][4]. Vous pouvez également définir le chemin du socket via la variable d'environnement `DD_DOGSTATSD_SOCKET`.

### Partager le chemin du socket avec votre application

Les conteneurs du client doivent pouvoir accéder au fichier du socket. Montez un répertoire host des deux côtés : en lecture seule dans les conteneurs du client, et en lecture/écriture dans le conteneur de l'Agent.

Dans votre conteneur d'Agent :

```yaml
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

Dans les conteneurs de vos clients :

```yaml
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
    readOnly: true
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

Pour en savoir plus, consultez [la documentation relative à l'utilisation de DogStatsD sur un socket de domaine Unix][3].

## Ou utiliser hostPort

### Associer le port DogStatsD à un port de host

1. Ajoutez un `hostPort` à votre manifeste `datadog-agent.yaml` :

      ```yaml
      ports:
        - containerPort: 8125
          hostPort: 8125
          name: dogstatsdport
          protocol: UDP
      ```

    Vos applications peuvent ainsi envoyer des métriques via DogStatsD sur le port `8125` sur les nœuds sur lesquels elles s'exécutent.

    **Remarque** : la fonction `hostPort` requiert un fournisseur de solution réseau qui respecte la [spécification CNI][5], tel que Calico, Canal ou Flannel. Pour obtenir davantage d'informations, et notamment pour trouver une solution pour les fournisseurs de solution réseau ne respectant pas la spécification CNI, consultez la [documentation Kubernetes][6].

2. Activez le trafic DogStatsD non local pour permettre la collecte de données StatsD en définissant `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` dans votre manifeste `datadog-agent.yaml` :

        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"

    Cela permet la collecte de données StatsD depuis des conteneurs autres que celui qui exécute l'Agent.

3. Appliquez la modification :

      ```
      kubectl apply -f datadog-agent.yaml
      ```

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu autorise uniquement un accès pour vos applications et autres sources de confiance. En outre, certains plug-ins réseau ne prennent pas encore en charge `hostPorts`, ce qui rend cette configuration inutile.
Pour y remédier, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent, afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur un host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant le pod de démarrer. Cela n'est pas systématiquement possible avec toutes les installations Kubernetes.

### Transmettre l'adresse IP du nœud à votre application

Votre application doit pouvoir déterminer de façon fiable l'adresse IP de son host. La version 1.7 de Kubernetes vous permet d'y parvenir facilement, en élargissant l'ensemble d'attributs que vous pouvez [transmettre à vos pods sous la forme de variables d'environnement][7]. Dans cette version, et les versions supérieures, vous pouvez transmettre l'IP du host à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Voici un exemple de manifeste d'application :

```yaml
env:
  - name: DOGSTATSD_HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
```

Grâce à ce manifeste, un pod exécutant votre application peut transmettre des métriques DogStatsD via le port `8125` sur `$DOGSTATSD_HOST_IP`.

## Détection de l'origine via UDP

La détection de l'origine permet à DogStatsD de détecter la provenance des métriques de conteneur et de taguer automatiquement les métriques. Lorsque ce mode est activé, toutes les métriques transmises via UDP reçoivent les mêmes tags de conteneur que les métriques Autodiscovery.

**Remarque** : une alternative à UDP est l'utilisation de [sockets de domaine Unix][8].

Pour activer la détection de l'origine via UDP, ajoutez les lignes suivantes au manifeste de votre application :

```yaml
env:
  - name: DD_ENTITY_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.uid
```

La détection de l'origine est prise en charge dans l'Agent 6.10.0+ et dans les bibliothèques client suivantes :

| Bibliothèque      | Version |
| ------------ | ------- |
| [Go][9]      | 2.2     |
| [PHP][10]     | 1.4.0   |
| [Python][11] | 0.28.0  |
| [Ruby][12]   | 4.2.0   |
| [C#][13]     | 3.3.0   |
| [Java][14]   | 2.8     |

Pour définir la [cardinalité des tags][15] pour les métriques recueillies avec la détection d'origine, utilisez la variable d'environnement `DD_DOGSTATSD_TAG_CARDINALITY`.

Il existe deux variables d'environnement qui définissent la cardinalité des tags : `DD_CHECKS_TAG_CARDINALITY` et `DD_DOGSTATSD_TAG_CARDINALITY`. Les règles de tarification pour DogStatsD étant différentes, un paramètre de cardinalité distinct est utilisé afin d'offrir des options de configuration plus poussées. Pour le reste, ces variables fonctionnent de la même façon : elles acceptent la valeur `low`, `orchestrator` ou `high`. Par défaut, la valeur `low` est utilisée.

## Instrumenter votre code afin d'envoyer des métriques à DogStatsD

Dès lors que votre application peut envoyer des métriques via DogStatsD sur chaque nœud, vous pouvez instrumenter son code de façon à envoyer des métriques custom.

**[Consulter la liste complète des bibliothèques client DogStatsD de Datadog][16]**

Par exemple, si votre application est écrite en Go, importez la [bibliothèque Go][17] de Datadog afin de bénéficier d'une bibliothèque client DogStatsD :

```
import "github.com/DataDog/datadog-go/statsd"
```

Avant de pouvoir ajouter des counters, gauges et autres métriques custom, [initialisez le client StatsD][18] avec l'emplacement du service DogStatsD, en fonction de la méthode choisie :

- Socket de domaine Unix : `$DD_DOGSTATSD_SOCKET`
- hostPort : `$DOGSTATSD_HOST_IP`

```go
func main(){

  // Restant du code main() omis par souci de concision

  // utiliser le port et l'IP du host pour définir l'endpoint
  dogstatsd, err := statsd.New(os.Getenv("DOGSTATSD_HOST_IP") + ":8125")
  // ou utiliser le chemin du socket Unix
  // dogstatsd, err = statsd.New(os.Getenv("DD_DOGSTATSD_SOCKET"))
  if err != nil{
    log.Printf("Impossible d'obtenir un client DogStatsD.")
  } else {
    // ajouter le nom de l'app devant chaque métrique et événement
    dogstatsd.Namespace = "Mon application"

    // publier un événement sur Datadog au lancement de l'app
    dogstatsd.Event(&statsd.Event{
      Title: "Mon application s'est lancée.",
      Text: "Mon application s'est lancée.",
      })
  }
}
```

Vous pouvez également incrémenter une métrique custom pour chacune des fonctions de votre gestionnaire. Par exemple, pour chaque appel de la fonction `InfoHandler`, la valeur de la métrique `request_count` augmente de 1 lorsque le tag `endpoint:info` est appliqué à ce point de donnée :

```go
func InfoHandler(rw http.ResponseWriter, req *http.Request) {
    dogstatsd.Incr("request_count", []string{"endpoint:info"}, 1)
    info := HandleError(masterPool.Get(0).Do("INFO")).([]byte)
    rw.Write(info)
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/developers/metrics/dogstatsd_metrics_submission
[2]: https://github.com/etsy/statsd
[3]: /fr/developers/dogstatsd/unix_socket
[4]: /fr/agent/guide/agent-commands
[5]: https://github.com/containernetworking/cni
[6]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[7]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information
[8]: /fr/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[9]: https://github.com/DataDog/datadog-go
[10]: https://github.com/DataDog/php-datadogstatsd
[11]: https://github.com/DataDog/datadogpy
[12]: https://github.com/DataDog/dogstatsd-ruby
[13]: https://github.com/DataDog/dogstatsd-csharp-client
[14]: https://github.com/DataDog/java-dogstatsd-client
[15]: /fr/tagging/assigning_tags/#environment-variables
[16]: /fr/developers/libraries/#api-and-dogstatsd-client-libraries
[17]: https://github.com/DataDog/datadog-go
[18]: https://gist.github.com/johnaxel/fe50c6c73442219c48bf2bebb1154f91