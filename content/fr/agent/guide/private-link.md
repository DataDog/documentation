---
description: Configurez les points de terminaison AWS PrivateLink pour envoyer des
  données de télémétrie à Datadog de manière sécurisée via des connexions VPC internes,
  y compris les configurations interrégionales.
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Centre d'architecture
  text: Utilisation d'AWS PrivateLink interrégional pour envoyer des données de télémétrie
    à Datadog
- link: /agent/logs
  tag: Documentation
  text: Activer la collecte de logs avec l'Agent
- link: /integrations/amazon_web_services/#log-collection
  tag: Documentation
  text: Collecter les logs de vos services AWS
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: Centre d'architecture
  text: Connexion à Datadog via AWS PrivateLink
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: Centre d'architecture
  text: Connectez-vous à Datadog via AWS PrivateLink en utilisant AWS Transit Gateway
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Centre d'architecture
  text: Connectez-vous à Datadog via AWS PrivateLink en utilisant le peering VPC
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: Blog
  text: Réduisez les coûts et améliorez la sécurité avec la connectivité Datadog interrégionale
    en utilisant AWS PrivateLink
title: Connexion à Datadog via AWS PrivateLink
---
{{% site-region region="us3,us5,eu,gov,gov2" %}}
<div class="alert alert-danger">Datadog PrivateLink ne prend pas en charge le site Datadog sélectionné.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2" %}}

## Aperçu {#overview}

Ce guide vous accompagne dans la configuration de [AWS PrivateLink][11] pour une utilisation avec Datadog. Le processus global consiste à configurer un point de terminaison interne dans votre VPC auquel les agents Datadog locaux peuvent envoyer des données. Votre point de terminaison VPC est ensuite mis en peering avec le point de terminaison situé dans le VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Schéma du diagramme VPC" >}}

Datadog expose des points de terminaison AWS PrivateLink dans **{{< region-param key="aws_region" >}}**.
- Si vous devez acheminer le trafic Datadog dans la même région, suivez les étapes dans [Connectez-vous depuis la même région](#connect-from-the-same-region) pour configurer votre point de terminaison.
- Pour acheminer le trafic vers l'offre PrivateLink de Datadog dans {{< region-param key="aws_region" >}} d'autres régions, Datadog recommande [des points de terminaison PrivateLink inter-régionaux](?tab=crossregionprivatelinkendpoints#connect-from-other-regions). [PrivateLink inter-régional][11] vous permet d'établir des connexions entre des VPC dans différentes régions AWS. Cela permet aux ressources VPC dans différentes régions de communiquer entre elles en utilisant des adresses IP privées. Alternativement, utilisez [le peering VPC](?tab=vpcpeering#connect-from-other-regions).

## Connexion depuis la même région {#connect-from-the-same-region}

1. Connectez la console de gestion AWS à la région de votre choix.
1. Depuis le tableau de bord VPC, sous {{< ui >}}PrivateLink and Lattice{{< /ui >}}, sélectionnez {{< ui >}}Endpoints{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create Endpoint{{< /ui >}} :
   {{< img src="agent/guide/private-link-vpc.png" alt="La page des points de terminaison sur le tableau de bord VPC" style="width:90%;" >}}
1. Sélectionnez {{< ui >}}Find service by name{{< /ui >}}.
1. Remplissez la zone de texte _Nom du service_ en fonction du service pour lequel vous souhaitez établir AWS PrivateLink :

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom du service VPC" style="width:70%;" >}}

| Datadog                   | Nom du service PrivateLink                                                               | Nom DNS privé                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Journaux (intégration HTTP de l'agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Journaux (intégration HTTP utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profilage                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Surveillance de base de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

4. Cliquez {{< ui >}}Verify{{< /ui >}}. Si cela ne renvoie pas _Nom du service trouvé_, contactez [le support Datadog][14].
5. Choisissez le VPC et les sous-réseaux qui doivent être mis en peering avec le point de terminaison du service VPC Datadog.
6. Assurez-vous que pour {{< ui >}}Enable DNS name{{< /ui >}}, _Activer pour ce point de terminaison_ est coché :

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Activer DNS privé" style="width:80%;" >}}

7. Choisissez le groupe de sécurité de votre choix pour contrôler ce qui peut envoyer du trafic à ce point de terminaison VPC.

    **Remarque** : **Le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

8. Cliquez {{< ui >}}Create endpoint{{< /ui >}} en bas de l'écran. Si cela réussit, ce qui suit s'affiche :

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Point de terminaison VPC créé" style="width:60%;" >}}

9. Cliquez sur l'ID du point de terminaison VPC pour vérifier son statut.
10. Attendez que le statut passe de _En attente_ à _Disponible_. Cela peut prendre jusqu'à 10 minutes. Une fois qu'il indique _Disponible_, vous pouvez utiliser AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Statut VPC" style="width:60%;" >}}

11. Si vous exécutez une version de l'Agent Datadog antérieure à v6.19 ou v7.19, pour collecter les données de journaux, assurez-vous que votre Agent est configuré pour envoyer des journaux via HTTPS. Si les données ne sont pas déjà présentes, ajoutez ce qui suit au [fichier de configuration de l'Agent `datadog.yaml`][15] :

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][16].

12. Si votre extension Lambda charge la clé API Datadog à partir d'AWS Secrets Manager en utilisant l'ARN spécifié par la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un point de terminaison VPC pour Secrets Manager][17].

13. [Redémarrez votre Agent][13] pour envoyer des données à Datadog via AWS PrivateLink.

## Connectez-vous depuis d'autres régions {#connect-from-other-regions}

{{< tabs >}}
{{% tab "Points de terminaison PrivateLink inter-régions" %}}
1. Connectez la console de gestion AWS à la région de votre choix.
1. Depuis le tableau de bord VPC, sous {{< ui >}}PrivateLink and Lattice{{< /ui >}}, sélectionnez {{< ui >}}Endpoints{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create Endpoint{{< /ui >}} :
   {{< img src="agent/guide/private-link-vpc.png" alt="La page des points de terminaison sur le tableau de bord VPC" style="width:90%;" >}}
1. Configurez les paramètres de point de terminaison d'interface VPC
   1. Optionnellement, remplissez le {{< ui >}}Name tag{{< /ui >}}.
   1. Sous {{< ui >}}Type{{< /ui >}}, sélectionnez {{< ui >}}PrivateLink Ready partner services{{< /ui >}}.
1. Découvrez et configurez le point de terminaison d'interface avec support inter-régions :
   1. Sous {{< ui >}}Service name{{< /ui >}}, remplissez le nom du service avec un nom de service PrivateLink valide du tableau [ ci-dessous.](#privatelink-service-names)
   1. Sous {{< ui >}}Service region{{< /ui >}}, cliquez sur {{< ui >}}Enable Cross Region endpoint{{< /ui >}} et sélectionnez **{{< region-param key="aws_private_link_cross_region" >}}**.
   1. Cliquez sur {{< ui >}}Verify service{{< /ui >}} et attendez une notification _Nom du service vérifié_.
      **Remarque :** Si vous ne parvenez pas à vérifier le service après avoir complété les étapes ci-dessus, contactez [Datadog Support][1].
1. Sous {{< ui >}}Network Settings{{< /ui >}}, sélectionnez un VPC pour déployer le point de terminaison d'interface VPC.
1. Assurez-vous que l'option {{< ui >}}Enable DNS name{{< /ui >}} est cochée.
1. Sous {{< ui >}}Subnets{{< /ui >}}, sélectionnez un ou plusieurs sous-réseaux dans votre VPC pour le point de terminaison d'interface.
1. Sous {{< ui >}}Security Groups{{< /ui >}}, sélectionnez un groupe de sécurité pour contrôler ce qui peut envoyer du trafic au point de terminaison VPC.

   **Remarque** : Le groupe de sécurité doit accepter le trafic entrant sur le port TCP .
1. Optionnellement, fournissez un {{< ui >}}Name tag{{< /ui >}} et cliquez sur {{< ui >}}Create endpoint{{< /ui >}}.
1. Laissez quelques minutes pour que l'état du point de terminaison se mette à jour de {{< ui >}}Pending{{< /ui >}} à {{< ui >}}Available{{< /ui >}}. Cela peut prendre jusqu'à 10 minutes. Si cela prend plus de temps que prévu, contactez [le support Datadog][1].

Après que l'état de l'endpoint a été mis à jour vers {{< ui >}}Available{{< /ui >}}, vous pouvez utiliser cet endpoint pour envoyer des données de télémétrie à Datadog via l'endpoint AWS PrivateLink interrégional.

## Noms de service PrivateLink {#privatelink-service-names}

| Datadog                   | Nom de service PrivateLink                                                               | Nom DNS privé                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (intégration HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Journaux (intégration HTTP utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profilage                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Surveillance de base de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

**Remarque** : Le PrivateLink interrégional n'émet pas de métriques CloudWatch. Consultez [les métriques CloudWatch pour AWS PrivateLink][2] pour plus d'informations.

[1]: /fr/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "Peering VPC" %}}
1. Connectez la console AWS à la région **{{< region-param key="aws_region" >}}** et créez un endpoint VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Créer un endpoint VPC" style="width:80%;" >}}

2. Sélectionnez {{< ui >}}Find service by name{{< /ui >}}.
3. Remplissez la zone de texte _Nom du service_ selon le service pour lequel vous souhaitez établir un PrivateLink AWS :

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom du service VPC" style="width:90%;" >}}

| Datadog                   | Nom de service PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (intégration HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Journaux (intégration HTTP utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profilage                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Surveillance de base de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Cliquez {{< ui >}}Verify{{< /ui >}}. Si cela ne renvoie pas _Nom de service trouvé_, contactez [le support Datadog][1].

5. Ensuite, choisissez le VPC et les sous-réseaux qui doivent être mis en peering avec l'endpoint de service VPC Datadog. Ne sélectionnez pas {{< ui >}}Enable DNS name{{< /ui >}} car le peering VPC nécessite que le DNS soit configuré manuellement.

6. Choisissez le groupe de sécurité de votre choix pour contrôler ce qui peut envoyer du trafic à cet endpoint VPC.

    **Remarque** : **Le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

7. Cliquez sur {{< ui >}}Create endpoint{{< /ui >}} en bas de l'écran. Si cela re9ussit, ce qui suit s'affiche :

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Point de terminaison VPC créé" style="width:80%;" >}}

8. Cliquez sur l'ID du point de terminaison VPC pour vérifier son statut.
9. Attendez que le statut passe de _En attente_ à _Disponible_. Cela peut prendre jusqu'à 10 minutes.
10. Après avoir créé le point de terminaison, utilisez le peering VPC pour rendre le point de terminaison PrivateLink disponible dans une autre région afin d'envoyer de la télémétrie à Datadog par PrivateLink. Pour plus d'informations, consultez la page [Travailler avec les connexions de peering VPC][2] dans AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Statut VPC" style="width:80%;" >}}

### Amazon Route53 {#amazon-route53}

1. Créez une [zone hébergée privée Route53][3] pour chaque service pour lequel vous avez créé un point de terminaison AWS PrivateLink. Attachez la zone hébergée privée au VPC dans {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Créez une zone hébergée privée Route53" style="width:80%;" >}}

La liste ci-dessous vous permet de mapper les noms de services et de DNS à différents composants de Datadog :

  | Datadog                   | Nom du service PrivateLink                                                               | Nom DNS privé                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Journaux (intégration HTTP de l'agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Journaux (intégration HTTP utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | Profilage                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Surveillance de base de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

  Vous pouvez également trouver cette information en interrogeant l'API AWS, `DescribeVpcEndpointServices`, ou en utilisant la commande suivante :

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Par exemple, dans le cas du point de terminaison des métriques Datadog pour {{< region-param key="aws_region" code="true" >}}:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

Cela renvoie <code>metrics.agent.{{< region-param key="dd_site" >}}</code>, le nom de la zone hébergée privée dont vous avez besoin pour l'associer au VPC d'où provient le trafic de l'Agent. La substitution de cet enregistrement récupère tous les noms d'hôtes liés aux métriques.

2. Dans chaque nouvelle zone hébergée privée Route53, créez un enregistrement A avec le même nom. Activez l'option {{< ui >}}Alias{{< /ui >}}, puis sous {{< ui >}}Route traffic to{{< /ui >}}, choisissez {{< ui >}}Alias to VPC endpoint{{< /ui >}}, **{{< region-param key="aws_region" >}}**, et entrez le nom DNS du point de terminaison VPC associé au nom DNS.**Notes** :
      - Pour récupérer votre nom DNS, consultez la [documentation sur la configuration du nom DNS privé du service de point de terminaison.][4]
      - L'Agent envoie de la télémétrie à des points de terminaison versionnés, par exemple, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> qui se résout en <code>metrics.agent.{{< region-param key="dd_site" >}}</code> via un alias CNAME. Par conséquent, vous n'avez besoin de configurer qu'une zone hébergée privée pour <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Créez un enregistrement A" style="width:90%;" >}}

3. Configurez le peering VPC et le routage entre le VPC dans {{< region-param key="aws_region" code="true" >}} qui contient les points de terminaison Datadog PrivateLink et le VPC dans la région où les agents Datadog s'exécutent.

4. Si les VPC sont dans différents comptes AWS, le VPC contenant l'agent Datadog doit être autorisé à s'associer aux zones hébergées privées Route53 avant de continuer. Créez une [autorisation d'association VPC][5] pour chaque zone hébergée privée Route53 en utilisant la région et l'ID VPC du VPC où l'agent Datadog s'exécute. Cette option n'est pas disponible dans la console AWS. Elle doit être configurée à l'aide de l'AWS CLI, SDK ou API.

5. Modifiez la zone hébergée Route53 pour ajouter des VPC pour d'autres régions.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Modifiez une zone hébergée privée Route53" style="width:80%;" >}}

6. Les VPC qui ont la zone hébergée privée (PHZ) attachée doivent avoir certains paramètres activés, spécifiquement `enableDnsHostnames` et `enableDnsSupport` dans les VPC auxquels la PHZ est associée. Voir [Considérations lors de l'utilisation d'une zone hébergée privée][6] .

7. [Redémarrez l'Agent][7] pour envoyer des données à Datadog via AWS PrivateLink.

#### Dépannage de la résolution DNS et de la connectivité {#troubleshooting-dns-resolution-and-connectivity}

Les noms DNS doivent se résoudre en adresses IP contenues dans le bloc CIDR du VPC dans {{< region-param key="aws_region" code="true" >}}, et les connexions à `port 443` doivent réussir.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La connexion au port 443 doit être réussie" style="width:80%;" >}}

Si le DNS se résout en adresses IP publiques, alors la zone Route53 n'a **pas** été associée au VPC dans la région alternative, ou l'enregistrement A n'existe pas.

Si le DNS se résout correctement, mais que les connexions à `port 443` échouent, alors le peering VPC ou le routage peuvent être mal configurés, ou le port 443 peut ne pas être autorisé à sortir vers le bloc CIDR du VPC dans {{< region-param key="aws_region" code="true" >}}.

Les VPC avec la zone hébergée privée (PHZ) attachée doivent avoir quelques paramètres activés. Spécifiquement, `enableDnsHostnames` et `enableDnsSupport` doivent être activés dans les VPC auxquels la PHZ est associée. Voir les [paramètres VPC d'Amazon][6].

### Agent Datadog {#datadog-agent}

1. Si vous collectez des données de journaux, assurez-vous que votre Agent est configuré pour envoyer les journaux via HTTPS. Si les données ne sont pas déjà présentes, ajoutez ce qui suit au [fichier de configuration de l'Agent `datadog.yaml`][8] :

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][9].

2. Si votre extension Lambda charge la clé API Datadog à partir d'AWS Secrets Manager en utilisant l'ARN spécifié par la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un point de terminaison VPC pour Secrets Manager][10].

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

{{% /site-region %}}

## Vérifiez que les données sont envoyées en utilisant PrivateLink {#verify-that-data-is-being-sent-using-privatelink}

Après avoir configuré PrivateLink, pour vérifier que les données sont envoyées en utilisant PrivateLink, exécutez la commande `dig` sur une machine qui se trouve dans ce VPC. Par exemple, exécutez cette commande si vous avez configuré un PrivateLink pour le point de terminaison `http-intake.logs.datadoghq.com` :

```
dig http-intake.logs.datadoghq.com
```

Si les journaux sont envoyés via PrivateLink, la section `ANSWER Section` de la sortie montre `http-intake.logs.datadoghq.com` comme dans l'exemple suivant. **Remarque** : Les adresses IP que vous recevez doivent être dans [l'espace d'adresses IP privées][1].

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	60 IN	A	172.31.57.3
http-intake.logs.datadoghq.com.	60 IN	A	172.31.3.10
http-intake.logs.datadoghq.com.	60 IN	A	172.31.20.174
http-intake.logs.datadoghq.com.	60 IN	A	172.31.34.135
```

Si les journaux ne sont pas envoyés via PrivateLink, la `ANSWER SECTION` de la sortie montre le répartiteur de charge (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) vers lequel les journaux sont envoyés.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	177 IN	CNAME	http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME	l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses