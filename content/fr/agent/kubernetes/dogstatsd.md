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
Pour générer des métriques custom à partir de votre application Kubernetes, utilisez [DogStatsD][1], un service d'agrégation de métriques fourni avec l'Agent Datadog. DogStatsD ajoute de nouvelles fonctionnalités au protocole [StatsD]. Consultez la [documentation sur DogStatsD][1] pour en savoir plus.

## Utiliser DogStatsD sur un socket de domaine Unix

Vous pouvez utiliser [DogStatsD sur un socket de domaine Unix][2]. 

### Créer un socket d'écoute

Modifiez votre fichier `datadog.yaml` afin de définir l'option `dogstatsd_socket` sur le chemin où DogStatsD doit créer son socket d'écoute :

```
dogstatsd_socket: /var/run/datadog/dsd.socket
```

[Redémarrez ensuite votre Agent][3]. Vous pouvez également définir le chemin du socket via la variable d'environnement `DD_DOGSTATSD_SOCKET`.

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

Pour en savoir plus, consultez [la documentation relative à l'utilisation de DogStatsD sur un socket de domaine Unix][2].

## Ou utiliser hostPort

### Associer le port DogStatsD à un port de host

Ajoutez un `hostPort` à votre fichier `datadog-agent.yaml` :

```yaml
ports:
  - containerPort: 8125
    hostPort: 8125
    name: dogstatsdport
    protocol: UDP
```

Vos applications peuvent ainsi envoyer des métriques via DogStatsD sur le port `8125` sur les nœuds sur lesquelles elles s'exécutent.

**Remarque** : la fonction `hostPort` requiert un fournisseur de solution réseau qui respecte la [spécification CNI][4], tel que Calico, Canal ou Flannel. Pour obtenir davantage d'informations, et notamment pour trouver une solution pour les fournisseurs de solution réseau ne respectant pas la spécification CNI, consultez la [documentation Kubernetes][5].

Pour appliquer ce changement :

```bash
kubectl apply -f datadog-agent.yaml
```

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu autorise uniquement un accès pour vos applications et autres sources de confiance. En outre, certains plug-ins réseau ne prennent pas encore en charge `hostPorts`, ce qui rend cette configuration inutile. SI vous utilisez EKS pour héberger votre Agent et vos applications, il est possible que le paramètre `hostPorts` ne fonctionne pas.
Pour y remédier, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent, afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur un host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau) et le pod ne démarre pas. Cela n'est pas systématiquement possible avec toutes les installations Kubernetes.

### Transmettre l'adresse IP du nœud à votre application

Votre application doit pouvoir déterminer de façon fiable l'adresse IP de son host. La version 1.7 de Kubernetes vous permet d'y parvenir facilement, en élargissant l'ensemble d'attributs que vous pouvez [transmettre à vos pods sous la forme de variables d'environnement][6]. Dans cette version, et les versions supérieures, vous pouvez transmettre l'IP du host à n'importe quel pod en ajoutant une variable d'environnement au PodSpec. Voici un exemple de manifeste d'application :

```yaml
env:
  - name: DOGSTATSD_HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
```

Grâce à ce manifeste, un pod exécutant votre application peut transmettre des métriques DogStatsD via le port `8125` sur `$DOGSTATSD_HOST_IP`.

## Instrumenter votre code afin d'envoyer des métriques à DogStatsD

Dès lors que votre application peut envoyer des métriques via DogStatsD sur chaque nœud, vous pouvez instrumenter son code de façon à envoyer des métriques custom.

**[Consulter la liste complète des bibliothèques client DogStatsD de Datadog][7]**

Par exemple, si votre application est rédigée en Go, importez la [bibliothèque Go][8] de Datadog afin de bénéficier d'une bibliothèque client DogStatsD :

```
import "github.com/DataDog/datadog-go/statsd"
```

Avant de pouvoir ajouter des counters, gauges et autres métriques custom, [initialisez le client StatsD][9] avec l'emplacement du service DogStatsD, en fonction de la méthode choisie :

- Socket de domaine Unix : `$DD_DOGSTATSD_SOCKET`
- hostPort : `$DOGSTATSD_HOST_IP`

```go
func main(){

  // autres codes main() omis par souci de concision

  var err error
  // utiliser le port et l'IP du host pour définir l'endpoint
  dogstatsd, err = statsd.New(os.Getenv("DOGSGTATSD_HOST_IP") + ":8125")
  // ou utiliser le chemin du socket Unix
  // dogstatsd, err = statsd.New(os.Getenv("DD_DOGSTATSD_SOCKET"))
  if err != nil{
    log.Printf("Impossible d'obtenir un client DogStatsD.")
  } else {
    // ajouter le nom de l'app devant chaque métrique et événement
    dogstatsd.Namespace = "Mon application"

    // publier un événement sur Datadog au lancement de l'app
    dogstatsd.Event(*statsd.Event{
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

[1]: /fr/developers/dogstatsd
[2]: /fr/developers/dogstatsd/unix_socket
[3]: /fr/agent/faq/agent-commands
[4]: https://github.com/containernetworking/cni
[5]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[6]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information
[7]: /fr/developers/libraries/#api-and-dogstatsd-client-libraries
[8]: https://github.com/DataDog/datadog-go
[9]: https://gist.github.com/johnaxel/fe50c6c73442219c48bf2bebb1154f91
