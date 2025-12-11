---
description: Configurez des endpoints et des zones DNS Google Cloud Private Service
  Connect pour envoyer des données de télémétrie à Datadog de manière privée sans
  utiliser l'Internet public.
further_reading:
- link: /integrations/google_cloud_platform/
  tag: Documentation
  text: Intégration Datadog/Google Cloud Platform
- link: /agent/guide/private-link
  tag: Documentation
  text: Connexion à Datadog via AWS PrivateLink
title: Se connecter à Datadog via Google Cloud Private Service Connect
---

{{% site-region region="us5" %}}
[Google Cloud Private Service Connect][1] (PSC) vous permet d'envoyer des données de télémétrie à Datadog sans utiliser l'Internet public.

Datadog expose certains de ses services d'ingestion de données dans Google Cloud en tant que [_services publiés_][2] Private Service Connect, comme indiqué dans le [tableau des services publiés](#services-publies).

Vous pouvez configurer un endpoint PSC pour exposer une adresse IP privée pour chaque service d'ingestion Datadog. Cette adresse IP achemine le trafic vers le backend Datadog. Vous pouvez ensuite configurer une [_zone DNS privée_][3] Google Cloud pour remplacer les noms DNS correspondant aux produits pour chaque endpoint consommé.

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="Schéma Google Cloud Private Service Connect. À gauche, un cadre 'VPC client' contient des Agents Datadog envoyant des données à un endpoint PSC. À droite, un cadre 'VPC Datadog' contient une pièce jointe de service en communication avec les services Datadog. L'endpoint dans le cadre 'VPC client' se connecte à la pièce jointe de service dans le cadre 'VPC Datadog' via le réseau principal Google Cloud." >}}

## Configuration

### Connecter un endpoint

1. Dans votre console Google Cloud, accédez à **Network services** > **Private Service Connect**.
2. Accédez à la section **Endpoints**. Cliquez sur **Connect endpoint**.
   {{< img src="agent/guide/psc/connect-endpoint1.png" alt="Capture d'écran d'une page 'Connect endpoint' dans la console Google Cloud" >}}

   - Sous **Target**, sélectionnez _Published service_.
   - Pour **Target service**, saisissez le _nom de cible PSC_ qui correspond au service d'ingestion Datadog que vous souhaitez utiliser. Vous pouvez trouver votre nom de cible PSC dans le [tableau des services publiés](#services-publies).
   - Pour **Endpoint name**, saisissez un identifiant unique à utiliser pour cet endpoint. Vous pouvez utiliser `datadog-<SERVICE>`. Par exemple : `datadog-api`.
   - Pour **Network** et **Subnetwork**, choisissez le réseau et le sous-réseau où vous souhaitez publier votre endpoint.
   - Pour **IP address**, cliquez sur le menu déroulant et sélectionnez _Create IP address_ pour créer une adresse IP interne à partir de votre sous-réseau dédiée à l'endpoint. Sélectionnez cette adresse IP.
   - Cochez **Enable global access** si vous prévoyez de connecter l'endpoint à des machines virtuelles en dehors de la région `us-central1`.

   **Remarque** : Datadog expose des endpoints de producteur PSC depuis la région `us-central1`. Ces endpoints prennent en charge l'accès global, permettant aux services de se connecter depuis n'importe quelle région. Cependant, la règle de transfert doit être créée dans la région `us-central1`. 

3. Cliquez sur **Add endpoint**. Vérifiez que votre statut est _Accepted_. Notez l'adresse IP, car elle est utilisée dans la section suivante.
   {{< img src="agent/guide/psc/connect-endpoint-success1.png" alt="Capture d'écran d'un message de réussite après l'ajout d'un endpoint dans la console Google Cloud. Inclut une adresse IP" >}}

### Créer une zone DNS
1. Dans votre console Google Cloud, accédez à **Network services** > **Cloud DNS**.
2. Cliquez sur **Create zone**.
   {{< img src="agent/guide/psc/create-a-dns-zone1.png" alt="Capture d'écran d'une page 'Create a DNS zone' dans la console Google Cloud" >}}

   - Sous **Zone type**, sélectionnez _Private_.
   - Pour **Zone name**, saisissez un nom descriptif pour votre zone.
   - Pour **DNS name**, saisissez le _nom DNS privé_ qui correspond au service d'ingestion Datadog que vous souhaitez utiliser. Vous pouvez trouver votre nom DNS dans le [tableau des services publiés](#services-publies).
3. Ensuite, créez un enregistrement `A` qui pointe vers l'IP de l'endpoint. Sur la page _Zone details_ de la zone que vous avez créée, cliquez sur **Add record set**.
   {{< img src="agent/guide/psc/create-record1.png" alt="Capture d'écran de la page 'Create record set' dans la console Google Cloud." >}}

   - Pour **DNS name**, laissez le champ non modifié.
   - Pour **Resource record type**, sélectionnez `A`.
   - Sous **IPv4 Address**, saisissez l'adresse IP qui a été affichée à la fin de la section précédente.

### Étapes supplémentaires requises pour les métriques et les traces
Il existe deux services d'ingestion Datadog qui sont des sous-domaines du domaine (`agent.`{{< region-param key="dd_site" code="true" >}}). Pour cette raison, la zone hébergée privée est légèrement différente des autres ingestions.

Créez une zone privée pour (`agent.`{{< region-param key="dd_site" code="true" >}}), comme indiqué dans la section [Créer une zone DNS](#creer-une-zone-dns-1). Ajoutez ensuite les trois enregistrements ci-dessous.

| Nom DNS | Type d'enregistrement de la ressource | Adresse IPv4 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | Adresse IP pour votre endpoint de métriques |
| `*`      | A                    | Adresse IP pour votre endpoint de métriques |
| `trace`  | A                    | Adresse IP pour votre endpoint de traces |

**Remarque** : cette zone nécessite un enregistrement générique (`*`) qui pointe vers l'adresse IP de votre endpoint de métriques. Cela est dû au fait que les Agents Datadog soumettent des données de télémétrie en utilisant un endpoint versionné sous la forme (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}).

### Validation

Pour vérifier votre configuration, connectez-vous en SSH à l'un de vos nœuds locaux et exécutez une commande `dig` similaire à la suivante :

_Vérifier que le générique est acheminé vers l'endpoint de métriques_
```shell
> dig +noall +answer 7-49-0-app.agent.us5.datadoghq.com
```

La réponse ressemble à :
```
7-49-0-app.agent.us5.datadoghq.com. 300 IN A        10.1.0.4
```


_Vérifier que le sous-domaine trace est acheminé vers l'endpoint de traces_
```shell
> dig +noall +answer trace.agent.us5.datadoghq.com
```
La réponse ressemble à :
```
trace.agent.us5.datadoghq.com. 300 IN  A       10.1.0.9
```

Assurez-vous que l'adresse IP dans la réponse correspond à celle associée à votre cible PSC.

## Services publiés
| Service d'ingestion Datadog | Nom de cible PSC | Nom du DNS privé |
| ---------------------- | --------------- | ---------------- |
| Logs (Agent)           | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.us5.datadoghq.com` |
| Logs (ingestion HTTP utilisateur) | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-intake-psc` | `http-intake.logs.us5.datadoghq.com` |
| API | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-api-psc` | `api.us5.datadoghq.com` |
| Métriques | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-metrics-agent-psc` | `agent.us5.datadoghq.com` |
| Conteneurs | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-orchestrator-psc` | `orchestrator.us5.datadoghq.com` |
| Processus | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-process-psc` | `process.us5.datadoghq.com` |
| Profiling | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-http-profile-psc` | `intake.profile.us5.datadoghq.com` |
| Traces | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-trace-edge-psc` | `agent.us5.datadoghq.com` |
| Database Monitoring | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-dbm-metrics-psc` | `dbm-metrics-intake.us5.datadoghq.com` |
| Configuration à distance | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-fleet-psc` | `config.us5.datadoghq.com` |



[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services
[3]: https://cloud.google.com/dns/docs/zones/zones-overview

{{% /site-region %}}
{{% site-region region="eu" %}}
[Private Service Connect][1] (PSC) vous permet d'envoyer des données de télémétrie à Datadog sans utiliser l'Internet public.

Datadog expose certains de ses services d'ingestion de données dans Google Cloud Platform en tant que [_services publiés_][2] PSC, comme indiqué dans le [tableau des services publiés](#services-publies-1).

Vous pouvez configurer un endpoint PSC pour exposer une adresse IP privée pour chaque service d'ingestion Datadog. Cette adresse IP achemine le trafic vers le backend Datadog. Vous pouvez ensuite configurer une [_zone DNS privée_][3] Google Cloud pour remplacer les noms DNS correspondant aux produits pour chaque endpoint consommé.

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="Schéma Google Cloud Private Service Connect. À gauche, un cadre 'VPC client' contient des Agents Datadog envoyant des données à un endpoint PSC. À droite, un cadre 'VPC Datadog' contient une pièce jointe de service en communication avec les services Datadog. L'endpoint PSC dans le cadre 'VPC client' se connecte à la pièce jointe de service dans le cadre 'VPC Datadog' via le réseau principal Google Cloud." >}}

## Configuration

### Connecter un endpoint

1. Dans votre console GCP, accédez à **Network services** > **Private Service Connect**.
2. Accédez à la section **Endpoints**. Cliquez sur **Connect endpoint**.
   {{< img src="agent/guide/psc/connect-endpoint-eu1.png" alt="Capture d'écran d'une page 'Connect endpoint' dans la console Google Cloud" >}}

   - Sous **Target**, sélectionnez _Published service_.
   - Pour **Target service**, saisissez le _nom de cible PSC_ qui correspond au service d'ingestion Datadog que vous souhaitez utiliser. Vous pouvez trouver votre nom de cible PSC dans le [tableau des services publiés](#services-publies-1).
   - Pour **Endpoint name**, saisissez un identifiant unique à utiliser pour cet endpoint. Vous pouvez utiliser `datadog-<SERVICE>`. Par exemple : `datadog-metrics`.
   - Pour **Network** et **Subnetwork**, choisissez le réseau et le sous-réseau où vous souhaitez publier votre endpoint.
   - Pour **IP address**, cliquez sur le menu déroulant et sélectionnez _Create IP address_ pour créer une adresse IP interne à partir de votre sous-réseau dédiée à l'endpoint. Sélectionnez cette adresse IP.
   - Cochez **Enable global access** si vous prévoyez de connecter l'endpoint à des machines virtuelles en dehors de la région `europe-west3`.

   **Remarque** : Datadog expose des endpoints de producteur PSC depuis la région `europe-west3`. Ces endpoints prennent en charge l'accès global, permettant aux services de se connecter depuis n'importe quelle région. Cependant, la règle de transfert doit être créée dans la région `europe-west3`.

3. Cliquez sur **Add endpoint**. Vérifiez que votre statut est _Accepted_. Notez l'adresse IP, car elle est utilisée dans la section suivante.
   {{< img src="agent/guide/psc/connect-endpoint-success-eu1.png" alt="Capture d'écran d'un message de réussite après l'ajout d'un endpoint dans la console Google Cloud. Inclut une adresse IP" >}}

### Créer une zone DNS
1. Dans votre console Google Cloud, accédez à **Network services** > **Cloud DNS**.
2. Cliquez sur **Create zone**.
   {{< img src="agent/guide/psc/create-a-dns-zone-eu1.png" alt="Capture d'écran d'une page 'Create a DNS zone' dans la console Google Cloud" >}}

   - Sous **Zone type**, sélectionnez _Private_.
   - Pour **Zone name**, saisissez un nom descriptif pour votre zone.
   - Pour **DNS name**, saisissez le _nom DNS privé_ qui correspond au service d'ingestion Datadog que vous souhaitez utiliser. Vous pouvez trouver votre nom DNS dans le [tableau des services publiés](#services-publies-1).
3. Ensuite, créez un enregistrement `A` qui pointe vers l'IP de l'endpoint. Sur la page _Zone details_ de la zone que vous avez créée, cliquez sur **Add record set**.
   {{< img src="agent/guide/psc/create-record-eu1.png" alt="Capture d'écran de la page 'Create record set' dans la console Google Cloud." >}}

   - Pour **DNS name**, laissez le champ non modifié.
   - Pour **Resource record type**, sélectionnez `A`.
   - Sous **IPv4 Address**, saisissez l'adresse IP qui a été affichée à la fin de la section précédente.

### Étapes supplémentaires requises pour les métriques et les traces

Il existe deux services d'ingestion Datadog qui sont des sous-domaines du domaine (`agent.`{{< region-param key="dd_site" code="true" >}}). Pour cette raison, la zone hébergée privée est légèrement différente des autres ingestions.

Créez une zone privée pour (`agent.`{{< region-param key="dd_site" code="true" >}}), comme indiqué dans la section [Créer une zone DNS](#creer-une-zone-dns-1). Ajoutez ensuite les trois enregistrements ci-dessous.

| Nom DNS | Type d'enregistrement de ressource | Adresse IPv4 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | Adresse IP pour votre endpoint de métriques |
| `*`      | A                    | Adresse IP pour votre endpoint de métriques |
| `trace`  | A                    | Adresse IP pour votre endpoint de traces |

**Remarque** : cette zone nécessite un enregistrement générique (`*`) qui pointe vers l'adresse IP de votre endpoint de métriques. Cela est dû au fait que les Agents Datadog soumettent des données de télémétrie en utilisant un endpoint versionné sous la forme (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}).

### Validation

Pour vérifier votre configuration, connectez-vous en SSH à l'un de vos nœuds locaux et exécutez une commande `dig` similaire à la suivante :

_Vérifier que le générique est acheminé vers l'endpoint de métriques_
```shell
> dig +noall +answer 7-49-0-app.agent.datadoghq.eu
```

La réponse ressemble à :
```
7-49-0-app.agent.datadoghq.eu. 300 IN A        10.1.0.4
```


_Vérifier que le sous-domaine trace est acheminé vers l'endpoint de traces_
```shell
> dig +noall +answer trace.agent.datadoghq.eu
```
La réponse ressemble à :
```
trace.agent.datadoghq.eu. 300 IN  A       10.1.0.9
```

Assurez-vous que l'adresse IP dans la réponse correspond à celle associée à votre cible PSC.

## Services publiés
| Service d'ingestion Datadog | Nom de cible PSC | Nom du DNS privé |
| ---------------------- | --------------- | ---------------- |
| Logs (Agent)           | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.datadoghq.eu` |
| Logs (ingestion HTTP utilisateur) | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-intake-psc` | `http-intake.logs.datadoghq.eu` |
| API | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-api-psc` | `api.datadoghq.eu` |
| Métriques | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-metrics-agent-psc` | `agent.datadoghq.eu` |
| Conteneurs | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-orchestrator-psc` | `orchestrator.datadoghq.eu` |
| Processus | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-process-psc` | `process.datadoghq.eu` |
| Profiling | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-http-profile-psc` | `intake.profile.datadoghq.eu` |
| Traces | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-trace-edge-psc` | `agent.datadoghq.eu` |
| Database Monitoring | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-dbm-metrics-psc` | `dbm-metrics-intake.datadoghq.eu` |
| Configuration à distance | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-fleet-psc` | `config.datadoghq.eu` |



[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services
[3]: https://cloud.google.com/dns/docs/zones/zones-overview

{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}