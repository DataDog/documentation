---
description: Configurez les points de terminaison AWS PrivateLink pour envoyer des
  données de télémétrie à Datadog de manière sécurisée via des connexions VPC internes,
  y compris pour les configurations inter-régions.
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Architecture Center
  text: Utilisation d'un AWS PrivateLink interrégional pour envoyer des données de
    télémétrie à Datadog
- link: /agent/logs
  tag: Documentation
  text: Activer la collecte de logs avec l'Agent
- link: /integrations/amazon_web_services/#log-collection
  tag: Documentation
  text: Collecter les logs de vos services AWS
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: Architecture Center
  text: Connexion à Datadog via AWS PrivateLink
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: Centre d'architecture
  text: Connexion à Datadog via AWS PrivateLink en utilisant AWS Transit Gateway
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Architecture Center
  text: Connexion à Datadog via AWS PrivateLink en utilisant l'appairage VPC AWS
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: Blog
  text: Réduisez les coûts et renforcez la sécurité grâce à une connectivité Datadog
    interrégionale via AWS PrivateLink
title: Connexion à Datadog via AWS PrivateLink
---
{{% site-region region="us3,us5,eu,gov,gov2" %}}
<div class="alert alert-danger">Datadog PrivateLink ne prend pas en charge le site Datadog sélectionné.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2,uk1" %}}

## Présentation {#overview}

Ce guide vous explique comment configurer [AWS PrivateLink][11] pour une utilisation avec Datadog. Le processus global consiste à configurer un point de terminaison interne dans votre VPC vers lequel les agents Datadog locaux peuvent envoyer des données. Votre point de terminaison VPC est ensuite appairé avec le point de terminaison au sein du VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Schéma du diagramme VPC" >}}

Datadog expose des points de terminaison AWS PrivateLink dans **{{< region-param key="aws_region" >}}**.
- Si vous devez acheminer le trafic Datadog dans la même région, suivez les étapes de [Connexion depuis la même région](#connect-from-the-same-region) pour configurer votre point de terminaison.
- Pour acheminer le trafic vers l'offre PrivateLink de Datadog dans {{< region-param key="aws_region" >}} depuis d'autres régions, Datadog recommande les [points de terminaison PrivateLink inter-régions](?tab=crossregionprivatelinkendpoints#connect-from-other-regions). [Cross-region PrivateLink][11] vous permet d'établir des connexions entre des VPC dans différentes régions AWS. Cela permet aux ressources VPC situées dans différentes régions de communiquer entre elles à l'aide d'adresses IP privées. Alternativement, utilisez [l'appairage VPC](?tab=vpcpeering#connect-from-other-regions).

## Connexion depuis la même région {#connect-from-the-same-region}

1. Connectez la console de gestion AWS à la région de votre choix.
1. Depuis le tableau de bord VPC, sous {{< ui >}}PrivateLink and Lattice{{< /ui >}}, sélectionnez {{< ui >}}Endpoints{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create Endpoint{{< /ui >}} :
   {{< img src="agent/guide/private-link-vpc.png" alt="La page des points de terminaison sur le tableau de bord VPC" style="width:90%;" >}}
1. Sélectionnez {{< ui >}}Find service by name{{< /ui >}}.
1. Remplissez la zone de texte _Service Name_ en fonction du service pour lequel vous souhaitez établir AWS PrivateLink :

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom du service VPC" style="width:70%;" >}}

{{% site-region region="ap1" %}}
| Datadog | Nom du service PrivateLink | Nom DNS privé |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (User HTTP intake) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métriques | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Conteneurs | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Processus | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profilage | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Surveillance de base de données | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuration à distance | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
Pour la liste complète des enregistrements DNS et des points de terminaison de service VPC US1, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
Pour la liste complète des enregistrements DNS et des points de terminaison de service VPC AP2, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
Pour la liste complète des enregistrements DNS et des points de terminaison de service VPC UK1, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

4. Cliquez sur {{< ui >}}Verify{{< /ui >}}. Si cela ne renvoie pas _Nom de service trouvé_, contactez le [support Datadog][14].
5. Choisissez le VPC et les sous-réseaux qui doivent être appairés avec le point de terminaison de service VPC Datadog.
6. Assurez-vous que pour {{< ui >}}Enable DNS name{{< /ui >}}, _Activer pour ce point de terminaison_ est coché :

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Activer DNS privé" style="width:80%;" >}}

7. Choisissez le groupe de sécurité de votre choix pour contrôler ce qui peut envoyer du trafic vers ce point de terminaison VPC.

    **Remarque** : **Le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

8. Cliquez sur {{< ui >}}Create endpoint{{< /ui >}} en bas de l'écran. Si l'opération réussit, ce qui suit s'affiche :

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Point de terminaison VPC créé" style="width:60%;" >}}

9. Cliquez sur l'ID du point de terminaison VPC pour vérifier son état.
10. Attendez que l'état passe de _En attente_ à _Disponible_. Cela peut prendre jusqu'à 10 minutes. Une fois qu'il indique _Disponible_, vous pouvez utiliser AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="État du VPC" style="width:60%;" >}}

11. Si vous exécutez une version de l'Agent Datadog antérieure à la v6.19 ou v7.19, pour collecter des données de logs, assurez-vous que votre Agent est configuré pour envoyer les logs via HTTPS. Si les données ne s'y trouvent pas déjà, ajoutez ce qui suit au [fichier de configuration de l'Agent `datadog.yaml`][15] :

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][16].

12. Si votre extension Lambda charge la clé d'API Datadog depuis AWS Secrets Manager en utilisant l'ARN spécifié par la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un point de terminaison VPC pour Secrets Manager][17].

13. [Redémarrez votre Agent][13] pour envoyer des données à Datadog via AWS PrivateLink.

## Connexion depuis d'autres régions {#connect-from-other-regions}

{{< tabs >}}
{{% tab "Points de terminaison PrivateLink inter-régions" %}}
1. Connectez-vous à la console de gestion AWS dans la région de votre choix.
1. Depuis le tableau de bord VPC, sous {{< ui >}}PrivateLink and Lattice{{< /ui >}}, sélectionnez {{< ui >}}Endpoints{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create Endpoint{{< /ui >}} :
   {{< img src="agent/guide/private-link-vpc.png" alt="La page des points de terminaison sur le tableau de bord VPC" style="width:90%;" >}}
1. Configurez les paramètres du point de terminaison d'interface VPC
   1. Optionnellement, remplissez le {{< ui >}}Name tag{{< /ui >}}.
   1. Sous {{< ui >}}Type{{< /ui >}}, sélectionnez {{< ui >}}PrivateLink Ready partner services{{< /ui >}}.
1. Découvrez et configurez le point de terminaison d'interface avec la prise en charge inter-régions :
   1. Sous {{< ui >}}Service name{{< /ui >}}, remplissez le nom du service avec un nom de service PrivateLink valide provenant du [tableau](#privatelink-service-names) ci-dessous.
   1. Sous {{< ui >}}Service region{{< /ui >}}, cliquez sur {{< ui >}}Enable Cross Region endpoint{{< /ui >}} et sélectionnez **{{< region-param key="aws_private_link_cross_region" >}}**.
   1. Cliquez sur {{< ui >}}Verify service{{< /ui >}} et attendez une notification _Nom de service vérifié_.
      **Remarque :** Si vous ne parvenez pas à vérifier le service après avoir suivi les étapes ci-dessus, contactez le [support Datadog][1].
1. Sous {{< ui >}}Network Settings{{< /ui >}}, sélectionnez un VPC pour déployer le point de terminaison d'interface VPC.
1. Assurez-vous que l'option {{< ui >}}Enable DNS name{{< /ui >}} est cochée.
1. Sous {{< ui >}}Subnets{{< /ui >}}, sélectionnez un ou plusieurs sous-réseaux dans votre VPC pour le point de terminaison d'interface.
1. Sous {{< ui >}}Security Groups{{< /ui >}}, sélectionnez un groupe de sécurité pour contrôler ce qui peut envoyer du trafic vers le point de terminaison VPC.

   **Remarque** : Le groupe de sécurité doit accepter le trafic entrant sur le port TCP 443.
1. Optionnellement, fournissez un {{< ui >}}Name tag{{< /ui >}} et cliquez sur {{< ui >}}Create endpoint{{< /ui >}}.
1. Attendez quelques minutes que le statut du point de terminaison passe de {{< ui >}}Pending{{< /ui >}} à {{< ui >}}Available{{< /ui >}}. Cela peut prendre jusqu'à 10 minutes. Si cela prend plus de temps que prévu, contactez le [support Datadog][1].

Une fois le statut du point de terminaison mis à jour sur {{< ui >}}Available{{< /ui >}}, vous pouvez utiliser ce point de terminaison pour envoyer des données de télémétrie à Datadog en utilisant le point de terminaison AWS PrivateLink inter-région.

## Noms de service PrivateLink {#privatelink-service-names}

{{% site-region region="ap1" %}}
| Datadog | Nom du service PrivateLink | Nom DNS privé |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (User HTTP intake) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métriques | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Conteneurs | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Processus | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profilage | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Surveillance de base de données | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuration à distance | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="ap2" %}}
Pour la liste complète des enregistrements DNS et des points de terminaison de service VPC AP2, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="us" %}}
Pour la liste complète des enregistrements DNS et des points de terminaison de service VPC US1, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="uk1" %}}
Pour la liste complète des enregistrements DNS et des points de terminaison de service VPC UK1, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

**Remarque** : PrivateLink interrégional n'émet pas de métriques CloudWatch. Consultez [Métriques CloudWatch pour AWS PrivateLink][2] pour plus d’informations.

[1]: /fr/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "Appairage VPC" %}}
1. Connectez-vous à la console AWS dans la région **{{< region-param key="aws_region" >}}** et créez un point de terminaison VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Créer un point de terminaison VPC" style="width:80%;" >}}

2. Sélectionnez {{< ui >}}Find service by name{{< /ui >}}.
3. Remplissez la zone de texte _Nom du service_ en fonction du service pour lequel vous souhaitez établir AWS PrivateLink :

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom du service VPC" style="width:90%;" >}}

{{% site-region region="ap1" %}}
| Datadog                   | Nom du service PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (User HTTP intake) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métriques | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Conteneurs | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Processus | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profilage | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Surveillance de base de données | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Configuration à distance | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
Pour la liste complète des enregistrements DNS US1 et des points de terminaison de service VPC, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
Pour la liste complète des enregistrements DNS AP2 et des points de terminaison de service VPC, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
Pour la liste complète des enregistrements DNS UK1 et des points de terminaison de service VPC, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

4. Cliquez sur {{< ui >}}Verify{{< /ui >}}. Si cela ne renvoie pas _Nom du service trouvé_, contactez le [support Datadog][1].

5. Ensuite, choisissez le VPC et les sous-réseaux qui doivent être appairés avec le point de terminaison de service VPC Datadog. Ne sélectionnez pas {{< ui >}}Enable DNS name{{< /ui >}} car l'appairage VPC nécessite une configuration manuelle du DNS.

6. Choisissez le groupe de sécurité de votre choix pour contrôler ce qui peut envoyer du trafic vers ce point de terminaison VPC.

    **Remarque** : **Le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

7. Cliquez sur {{< ui >}}Create endpoint{{< /ui >}} en bas de l'écran. Si l’opération réussit, ce qui suit s’affiche :

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Point de terminaison VPC créé" style="width:80%;" >}}

8. Cliquez sur l'ID du point de terminaison VPC pour vérifier son état.
9. Attendez que l'état passe de _En attente_ à _Disponible_. Cela peut prendre jusqu'à 10 minutes.
10. Après avoir créé le point de terminaison, utilisez l'appairage VPC pour rendre le point de terminaison PrivateLink disponible dans une autre région afin d'envoyer des données de télémétrie à Datadog via PrivateLink. Pour plus d'informations, lisez la page [Travailler avec les connexions d'appairage VPC][2] dans AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="État du VPC" style="width:80%;" >}}

### Amazon Route53 {#amazon-route53}

1. Créez une [zone hébergée privée Route53][3] pour chaque service pour lequel vous avez créé un point de terminaison AWS PrivateLink. Attachez la zone hébergée privée au VPC dans {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Créez une zone hébergée privée Route53" style="width:80%;" >}}

La liste ci-dessous vous permet de mapper les noms de services et de DNS à différents composants de Datadog :

{{% site-region region="ap1" %}}
  | Datadog | Nom du service PrivateLink | Nom DNS privé |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (Agent HTTP intake) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Logs (User HTTP intake) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Métriques | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Conteneurs | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Processus | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | Profilage | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Traces | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Surveillance de base de données | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Configuration à distance | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
Pour la liste complète des enregistrements DNS US1 et des points de terminaison de service VPC, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
Pour la liste complète des enregistrements DNS AP2 et des points de terminaison de service VPC, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
Pour la liste complète des enregistrements DNS UK1 et des points de terminaison de service VPC, consultez [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

  Vous pouvez également trouver ces informations en interrogeant l'API AWS, `DescribeVpcEndpointServices`, ou en utilisant la commande suivante :

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Par exemple, dans le cas du point de terminaison des métriques Datadog pour {{< region-param key="aws_region" code="true" >}}:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

Ceci renvoie <code>metrics.agent.{{< region-param key="dd_site" >}}</code>, le nom de la zone hébergée privée dont vous avez besoin pour l'associer au VPC d'où provient le trafic de l'Agent. Le remplacement de cet enregistrement capture tous les noms d'hôte d'ingestion liés aux métriques.

2. Au sein de chaque nouvelle zone hébergée privée Route53, créez un enregistrement A avec le même nom. Activez l'option {{< ui >}}Alias{{< /ui >}}, puis sous {{< ui >}}Route traffic to{{< /ui >}}, choisissez {{< ui >}}Alias to VPC endpoint{{< /ui >}}, **{{< region-param key="aws_region" >}}**, et saisissez le nom DNS du point de terminaison VPC associé au nom DNS.**Remarques** :
      - Pour récupérer votre nom DNS, consultez la [documentation sur la configuration du nom DNS privé du service de point de terminaison.][4]
      - L'Agent envoie la télémétrie vers des points de terminaison versionnés, par exemple, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> qui se résout en <code>metrics.agent.{{< region-param key="dd_site" >}}</code> via un alias CNAME. Par conséquent, vous n'avez besoin de configurer une zone hébergée privée que pour <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Créez un enregistrement A" style="width:90%;" >}}

3. Configurez l'appairage VPC et le routage entre le VPC dans {{< region-param key="aws_region" code="true" >}} qui contient les points de terminaison Datadog PrivateLink et le VPC dans la région où les agents Datadog s'exécutent.

4. Si les VPC se trouvent dans des comptes AWS différents, le VPC contenant l'Agent Datadog doit être autorisé à s'associer aux zones hébergées privées Route53 avant de continuer. Créez une [autorisation d'association de VPC][5] pour chaque zone hébergée privée Route53 en utilisant la région et l'ID de VPC du VPC où l'Agent Datadog s'exécute. Cette option n'est pas disponible dans la console AWS. Elle doit être configurée à l'aide de l'AWS CLI, du SDK ou de l'API.

5. Modifiez la zone hébergée Route53 pour ajouter des VPC pour d'autres régions.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Modifier une zone hébergée privée Route53" style="width:80%;" >}}

6. Les VPC auxquels la zone hébergée privée (PHZ) est attachée doivent avoir certains paramètres activés, spécifiquement `enableDnsHostnames` et `enableDnsSupport` dans les VPC auxquels la PHZ est associée. Consultez [Considérations lors de l'utilisation d'une zone hébergée privée][6].

7. [Redémarrez l'Agent][7] pour envoyer des données à Datadog via AWS PrivateLink.

#### Dépannage de la résolution DNS et de la connectivité {#troubleshooting-dns-resolution-and-connectivity}

Les noms DNS doivent se résoudre en adresses IP contenues dans le bloc CIDR du VPC dans {{< region-param key="aws_region" code="true" >}}, et les connexions à `port 443` devraient aboutir.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La connexion au port 443 devrait aboutir" style="width:80%;" >}}

Si le DNS se résout en adresses IP publiques, alors la zone Route53 **n'a pas** été associée au VPC dans la région alternative, ou l'enregistrement A n'existe pas.

Si le DNS se résout correctement, mais que les connexions à `port 443` échouent, alors le peering VPC ou le routage est peut-être mal configuré, ou le port 443 n'est peut-être pas autorisé en sortie vers le bloc CIDR du VPC dans {{< region-param key="aws_region" code="true" >}}.

Les VPC auxquels la zone hébergée privée (PHZ) est attachée doivent avoir quelques paramètres activés. Plus précisément, `enableDnsHostnames` et `enableDnsSupport` doivent être activés dans les VPC auxquels la PHZ est associée. Consultez [Paramètres Amazon VPC][6].

### Datadog Agent {#datadog-agent}

1. Si vous collectez des données de logs, assurez-vous que votre Agent est configuré pour envoyer les logs via HTTPS. Si les données n'y figurent pas déjà, ajoutez ce qui suit au [fichier de configuration de l'Agent `datadog.yaml`][8] :

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][9].

2. Si votre extension Lambda charge la clé d'API Datadog depuis AWS Secrets Manager en utilisant l'ARN spécifié par la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un point de terminaison VPC pour Secrets Manager][10].

3. [Redémarrez l'Agent][7].

[1]: /fr/help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}

[11]: https://aws.amazon.com/privatelink/
[12]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[13]: /fr/agent/configuration/agent-commands/#restart-the-agent
[14]: /fr/help/
[15]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[16]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[17]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html

{{% site-region region="us" %}}
## IDs de points de terminaison de service VPC {#vpc-endpoint-service-ids}

US1 utilise une architecture DNS à deux niveaux pour PrivateLink. Chaque enregistrement DNS orienté client est mappé à une adresse de point de terminaison VPC `color.intake.datadoghq.com` dédiée. La configuration d'un point de terminaison VPC pour une adresse d'ancrage donnée couvre tous les enregistrements orientés client qui y sont mappés.

Utilisez le tableau suivant pour identifier les points de terminaison VPC à configurer pour les fonctionnalités Datadog que vous utilisez. Les entrées génériques correspondent à tout sous-domaine non listé par ailleurs.

**Remarque** : dans le tableau ci-dessous, `---` indique un point de terminaison de service VPC direct sans adresse d'ancrage intermédiaire.
| Nom | Ancre | ID de point de terminaison de service VPC |
|---|---|---|
| `webhook-intake.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `webhooks-http-intake.logs.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `*.integrations.otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `opamp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `mcp.datadoghq.com` | `cornsilk.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-058a75ceea85a9175` |
| `agenthealth-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ci-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cicodescan-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcov-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cloudplatform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contimage-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contlcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cws-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `debugger-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `error-tracking-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-management-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-platform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `feed-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `instrumentation-telemetry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `kubeops-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `llmobs-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndm-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndmflow-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `netpath-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ocimetrics-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `resources-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sbom-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sds-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sentry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `snmp-traps-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `softinv-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `iam-rum-intake.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum-http-intake.logs.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum.browser-intake-datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `data-obs-intake.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `trace.agent.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `network-devices.datadoghq.com` | `olive.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-05e3bfec4501e714d` |
| `*.datadoghq.com` | `orange.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b67fd56f90bd3c41` |
| `*.api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `*.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `intake.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `agent-http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| `http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` |
| `metrics.agent.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| `orchestrator.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |
| `process.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| `intake.profile.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` |
| `dbm-metrics-intake.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ce70d55ec4af8501` |
| `config.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-01f21309e507e3b1d` |

{{% /site-region %}}

{{% site-region region="ap2" %}}
## IDs de points de terminaison de service VPC {#vpc-endpoint-service-ids-1}

AP2 utilise une architecture DNS à deux niveaux pour PrivateLink. Chaque enregistrement DNS orienté client est mappé à une adresse de point de terminaison VPC `color.intake.ap2.datadoghq.com` dédiée. La configuration d'un point de terminaison VPC pour une adresse d'ancrage donnée couvre tous les enregistrements orientés client qui y sont mappés.

Utilisez le tableau suivant pour identifier les points de terminaison VPC à configurer pour les fonctionnalités Datadog que vous utilisez. Les enregistrements DNS plus spécifiques prévalent sur les entrées génériques ; par exemple, `trace.agent.ap2.datadoghq.com` se résout en `lime.intake.ap2.datadoghq.com` même si `*.agent.ap2.datadoghq.com` pointe vers `beige.intake.ap2.datadoghq.com`.

| Nom | Ancre | ID de point de terminaison de service VPC |
|---|---|---|
| `gcp-intake.logs.ap2.datadoghq.com` | `aqua.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01b61a61d21fc7273` |
| `*.agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `process.ap2.datadoghq.com` | `bisque.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0c26ca335d93a68b5` |
| `*.integrations.otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `opamp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `agenthealth-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `awsmetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ci-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cicodescan-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cireport-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcov-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cloudplatform-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contimage-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contlcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cspm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cws-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `debugger-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `error-tracking-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `event-management-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `instrumentation-telemetry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `intake.profile.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `kubeops-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `llmobs-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndmflow-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `netpath-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ocimetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `resources-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sbom-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sds-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sentry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `snmp-traps-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `softinv-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `webhook-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `agent-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `aws-kinesis-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `eventbridge-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `lambda-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `obpipeline-intake.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `runtime-security-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `live.logs.ap2.datadoghq.com` | `indigo.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0545109555aa68e7e` |
| `data-obs-intake.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `trace.agent.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `orchestrator.ap2.datadoghq.com` | `linen.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-031da3ffac78ef902` |
| `*.ap2.datadoghq.com` | `orange.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01911394f8bac8056` |
| `*.synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `api.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `quota.browser-intake-ap2-datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `sourcemap-intake.ap2.datadoghq.com` | `plum.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-028e4348e80fa73f5` |
| `config.ap2.datadoghq.com` | `violet.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01f8f80f4cb97bd10` |
| `dbm-metrics-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
| `dbquery-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
{{% /site-region %}}

{{% /site-region %}}

{{% site-region region="uk1" %}}
## IDs de points de terminaison de service VPC {#vpc-endpoint-service-ids-2}

UK1 utilise une architecture DNS à deux niveaux pour PrivateLink. Chaque enregistrement DNS orienté client est mappé à une adresse de point de terminaison VPC `color.intake.uk1.datadoghq.com` dédiée. La configuration d'un point de terminaison VPC pour une adresse d'ancrage donnée couvre tous les enregistrements orientés client qui y sont mappés.

Utilisez le tableau suivant pour identifier les points de terminaison VPC à configurer pour les fonctionnalités Datadog que vous utilisez. Les enregistrements DNS plus spécifiques priment sur les wildcards — par exemple, `trace.agent.uk1.datadoghq.com` se résout en `lime.intake.uk1.datadoghq.com` même si `*.agent.uk1.datadoghq.com` pointe vers `beige.intake.uk1.datadoghq.com`.

| Nom | Ancre | ID de point de terminaison de service VPC |
|---|---|---|
| `gcp-intake.logs.uk1.datadoghq.com` | `aqua.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-099b74a86151e7f91` |
| `*.agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `process.uk1.datadoghq.com` | `bisque.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0fe52c96bfb6c5d0e` |
| `*.integrations.otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `opamp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `mcp.uk1.datadoghq.com` | `cornsilk.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d345b92b8a5e8743` |
| `agenthealth-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `awsmetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ci-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cicodescan-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cireport-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcov-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cloudplatform-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contimage-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contlcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cspm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cws-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `debugger-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `error-tracking-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `event-management-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `instrumentation-telemetry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `intake.profile.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `kubeops-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `llmobs-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndmflow-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `netpath-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ocimetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `resources-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sbom-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sds-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sentry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `snmp-traps-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `softinv-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `webhook-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `agent-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `aws-kinesis-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `eventbridge-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `lambda-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `obpipeline-intake.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `runtime-security-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `data-obs-intake.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `trace.agent.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `orchestrator.uk1.datadoghq.com` | `linen.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-07f22a32140efaae5` |
| `*.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `custom-domains.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `*.synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `api.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `quota.browser-intake-uk1-datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `sourcemap-intake.uk1.datadoghq.com` | `plum.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-04fbf10021b0308cd` |
| `config.uk1.datadoghq.com` | `violet.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0755097b02a34f9e7` |
| `dbm-metrics-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
| `dbquery-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
{{% /site-region %}}

## Vérifiez que les données sont envoyées via PrivateLink {#verify-that-data-is-being-sent-using-privatelink}

Après avoir configuré PrivateLink, pour vérifier que les données sont bien envoyées via PrivateLink, exécutez la commande `dig` sur une machine située sur ce VPC. Par exemple, exécutez cette commande si vous avez configuré un PrivateLink pour le point de terminaison `http-intake.logs.datadoghq.com` :

```
dig http-intake.logs.datadoghq.com
```

Si les journaux sont envoyés via PrivateLink, la section `ANSWER Section` de la sortie affiche `http-intake.logs.datadoghq.com` comme dans l'exemple suivant. **Remarque** : Les adresses IP que vous obtenez doivent se trouver dans [l'espace IP privé][1].

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	60 IN	A	172.31.57.3
http-intake.logs.datadoghq.com.	60 IN	A	172.31.3.10
http-intake.logs.datadoghq.com.	60 IN	A	172.31.20.174
http-intake.logs.datadoghq.com.	60 IN	A	172.31.34.135
```

Si les journaux ne sont pas envoyés via PrivateLink, le `ANSWER SECTION` de la sortie indique l'équilibreur de charge (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) vers lequel les journaux sont envoyés.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	177 IN	CNAME	http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME	l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses