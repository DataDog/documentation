---
title: Métriques et étiquettes
---

Ce document présente les métriques Data Streams Monitoring suivantes et leurs tags :

- `data_streams.latency`
- `data_streams.kafka.lag_seconds`
- `data_streams.kafka.lag_messages`

### data_streams.latency

Cette métrique mesure la latence entre deux points du pipeline. La valeur peut représenter différents types de latence selon ses tags.

`pathway_type`
: Les informations que représente la valeur de la métrique. Types de pathway possibles :
  <br/>
  - `full` : latence de bout en bout entre l'origine des données (`start`) et un autre point (`end`) du pipeline
     - tag `start` : origine des données
     - tag `end` : point arbitraire où les données sont suivies pour la dernière fois
  - `edge` : latence entre deux services, connectés via une file d'attente ou directement via HTTP/gRPC. Mesure la durée entre le moment de production chez le producteur (`start`) et le moment de consommation chez le consommateur (`end`)
     - tag `start` : le service producteur en amont
     - tag `end` : le service consommateur en aval
  - `partial_edge` : latence entre un service et une file d'attente, si le producteur ou le consommateur n'est pas connu (c'est-à-dire non instrumenté avec Data Streams Monitoring)
     - tag `start` : le service/la file d'attente producteur en amont
     - tag `end` : le service/la file d'attente consommateur en aval
  - `internal` : latence au sein du service. Mesure le temps entre l'opération _consume_ et l'opération _produce_ suivante.

`start`
: Le nom du nœud où Data Streams Monitoring détecte la charge utile pour la première fois. Ce nœud peut être un service (le producteur d'origine) ou une file d'attente (le producteur d'origine n'est pas connu de Data Streams Monitoring).
  <br/><br/>
  Lorsque le tag `pathway_type` est défini sur `full` (latence de bout en bout), `start` fait toujours référence au début du pipeline. 
  <br/><br/>
  Par exemple :<br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="Diagramme d'un pipeline qui s'écoule de 'Service A' vers 'Queue A' vers 'Service B' vers 'Queue B' vers 'Service C'." >}}
  <br/>
  La requête `start:serviceA and end:serviceC and pathway_type:full` mesure la latence de bout en bout pour ce pipeline.
  <br/>
  La requête `start:serviceB and end:serviceC and pathway_type:full` **ne mesure pas** la latence pour ce pipeline, car aucune donnée ne provient du Service B.

`end`
: Le nom d'un nœud où le pipeline se termine. Vous pouvez utiliser `end` pour obtenir des données pour des pipelines partiels.
  <br/><br/>
  Par exemple :
  <br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="Diagramme d'un pipeline qui s'écoule de 'Service A' vers 'Queue A' vers 'Service B' vers 'Queue B' vers 'Service C'." >}}
  <br/>
  Vous pouvez utiliser `start:serviceA and end:serviceB and pathway_type:full` pour mesurer la première partie de ce pipeline.
  <br/>

`service`
: Le nom du service où les données sont collectées.

`type`
: Le nom de la technologie de file d'attente pour laquelle les données sont générées, par exemple : Kafka, RabbitMQ, SQS. Pour HTTP et gRPC, `type` est défini sur `http` ou `grpc`.

`topic`
: Le nom du topic vers lequel les données sont produites ou à partir duquel elles sont consommées, le cas échéant.

`direction`
: La direction du flux de données pour un `service` particulier. Valeurs possibles :
  <br/>
  - `in` : l'opération consume ou la diffusion de données via HTTP/gRPC
  - `out` : l'opération produce ou l'envoi de données via HTTP/gRPC

`env`
: Environnement dans lequel le service s'exécute

`pathway`
: Une liste ordonnée de services, séparés par `/`, par lesquels les données transitent. Si les données passent par le même service plusieurs fois consécutivement, le nom du service n'est ajouté qu'une seule fois.

`detailed_pathway`
: Une liste ordonnée de services et de files d'attente, séparés par `/`, par lesquels les données transitent. Identique à `pathway` mais avec les files d'attente en plus des services.

`visited_queues`
: Représente toutes les files d'attente par lesquelles les données transitent. (Les files d'attente directement au début ou à la fin du pipeline sont exclues.) Vous pouvez utiliser ce tag pour affiner votre requête si vos données transitent par plusieurs files d'attente.
  <br/><br/>
  Considérez le pipeline suivant :
  <br/>
  {{< img src="data_streams/visited-queues-disambiguation.png" alt="Diagramme d'un pipeline qui s'écoule de 'Service A', se divise en deux ('Queue A' et 'Queue B'), et converge vers 'Service B'." >}}
  <br/><br/>
  Pour mesurer le flux de données de Service A vers Queue A vers Service B, vous pouvez utiliser la requête `start:serviceA and end:serviceB and visited_queues:queueA`.
  <br/>
  Pour mesurer le flux de données de Service A vers Queue B vers Service B, vous pouvez utiliser la requête `start:serviceA and end:serviceB and visited_queues:queueB`.

`visited_services`
: Représente tous les services par lesquels les données transitent. (Les services directement au début ou à la fin du pipeline sont exclus.)

`upstream_service`
: Le nom du service en amont d'un `service` particulier.

`exchange`
: Pour RabbitMQ, le nom de l'exchange vers lequel les données sont acheminées.

`hash`
: Un identifiant unique, calculé à partir de diverses valeurs de tags (`type`, `service`, `direction`, `parent_hash`, et autres).

`parent_hash`
: Le `hash` du nœud en amont du nœud sur le pathway.

### data_streams.kafka.lag_seconds

Cette métrique représente le lag (en secondes) entre les dernières opérations produce et consume.

`partition`
: La partition Kafka.

`env`
: L'environnement dans lequel le service consommateur s'exécute.

`topic`
: Le topic Kafka.

`consumer_group`
: Le groupe de consommateurs Kafka.

### data_streams.kafka.lag_messages

Cette métrique représente le lag (en offsets) entre les dernières opérations produce et consume.

`partition`
: La partition Kafka.

`env`
: L'environnement dans lequel le service consommateur s'exécute.

`topic`
: Le topic Kafka.

`consumer_group`
: Le groupe de consommateurs Kafka.