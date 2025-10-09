---
description: Configurez les endpoints AWS PrivateLink pour envoyer les données de
  télémétrie à Datadog de manière sécurisée via des connexions VPC internes, y compris
  pour des configurations inter-régions.
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Centre d'architecture
  text: Utiliser AWS PrivateLink inter-régions pour envoyer des données de télémétrie
    à Datadog
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
  text: Se connecter à Datadog via AWS PrivateLink en utilisant AWS Transit Gateway
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Centre d'architecture
  text: Se connecter à Datadog via AWS PrivateLink en utilisant un peering VPC AWS
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: Blog
  text: Réduire les coûts et renforcer la sécurité grâce à la connectivité Datadog
    inter-régions via AWS PrivateLink
title: Connexion à Datadog via AWS PrivateLink
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-danger">Datadog PrivateLink ne prend pas en charge le site Datadog sélectionné.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2" %}}

## Présentation

Ce guide explique comment configurer [AWS PrivateLink][11] pour l’utiliser avec Datadog. Le processus global consiste à configurer un endpoint interne dans votre VPC vers lequel les Agents Datadog locaux peuvent envoyer des données. Votre endpoint VPC est ensuite appairé avec l’endpoint situé dans le VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Schéma du diagramme VPC" >}}

Datadog expose des endpoints AWS PrivateLink dans {{< region-param key=“aws_region” >}}.
- Si vous devez acheminer le trafic Datadog dans la même région, consultez la section Se connecter depuis la même région pour configurer votre endpoint.
- Pour acheminer le trafic vers l’offre PrivateLink de Datadog dans {{< region-param key=“aws_region” >}} à partir d’autres régions, Datadog recommande d’utiliser les endpoints PrivateLink interrégions. Le [PrivateLink interrégions][11] permet d’établir des connexions entre des VPC situés dans différentes régions AWS. Cela permet aux ressources VPC de régions différentes de communiquer entre elles en utilisant des adresses IP privées. Vous pouvez également utiliser le VPC Peering.

## Se connecter depuis la même région

1. Connectez l’AWS Management Console à la région de votre choix.
1. Depuis le tableau de bord VPC, sous PrivateLink and Lattice, sélectionnez Endpoints.
1. Cliquez sur **Create Endpoint** :
   {{< img src="agent/guide/private-link-vpc.png" alt="La page des endpoints dans le tableau de bord VPC" style="width:90%;" >}}
1. Sélectionnez **Find service by name**.
1. Remplissez la zone de texte _Service Name_ en fonction du service pour lequel établir AWS PrivateLink. :

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom de service VPC" style="width:70%;" >}}

| Datadog                   | Nom de service PrivateLink                                                               | Nom DNS privé                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (intake HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (Intake HTTP de l'utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Surveillance de base de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuration à distancee      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

4. Cliquez sur **Verify**. Si cela ne renvoie pas _Service name found_, contactez [l'assistance Datadog][14].
5. Choisissez le VPC et les sous-réseaux devant être appairés avec l'endpoint de service VPC de Datadog.
6. Vérifiez que pour **Enable DNS name**, l'option _Enable for this endpoint_ est cochée :

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Activer le DNS privé" style="width:80%;" >}}

7. Choisissez le groupe de sécurité de votre choix pour contrôler ce qui peut envoyer du trafic vers cet endpoint VPC.

    **Remarque** : **le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

8. Cliquez sur **Create endpoint** en bas de l'écran. En cas de réussite, l'élément suivant s'affiche :

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint VPC créé" style="width:60%;" >}}

9. Cliquez sur l'ID de l'endpoint VPC pour vérifier son statut.
10. Attendez que le statut passe de _Pending_ à _Available_. Cela peut prendre jusqu'à 10 minutes. Une fois que le statut affiche _Available_, vous pouvez utiliser AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Statut VPC" style="width:60%;" >}}

11. Si vous exécutez une version de l'Agent Datadog antérieure à v6.19 ou v7.19, pour collecter des données de logs, assurez-vous que votre Agent est configuré pour envoyer les logs via HTTPS. Si les données ne s'y trouvent pas déjà, ajoutez ce qui suit dans le [fichier de configuration `datadog.yaml` de l'Agent][15] :

    ```yaml
    logs_config:
        force_use_http: true
    ```

    Si vous utilisez l'Agent de conteneur, définissez plutôt la variable d'environnement suivante :

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    Cette configuration est requise lors de l'envoi de logs à Datadog avec AWS PrivateLink et l'Agent Datadog, et n'est pas requise pour l'extension Lambda. Pour plus de détails, consultez la section [Collecte de logs de l'Agent][16].

12. Si votre extension Lambda charge la clé d'API Datadog depuis AWS Secrets Manager en utilisant l'ARN spécifié par la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un endpoint VPC pour Secrets Manager][17].

13. [Redémarrez votre Agent][13] pour envoyer des données à Datadog via AWS PrivateLink.

## Se connecter depuis d'autres régions

{{< tabs >}}
{{% tab "Cross-region PrivateLink endpoints" %}}
1. Connectez l'AWS Management Console à la région de votre choix.
1. Depuis le tableau de bord VPC, sous **PrivateLink and Lattice**, sélectionnez **Endpoints**.
1. Cliquez sur **Create Endpoint**:
   {{< img src="agent/guide/private-link-vpc.png" alt="La page des endpoints dans le tableau de bord VPC" style="width:90%;" >}}
1. Configurez les paramètres de l'endpoint d'interface VPC
   1. Facultativement, remplissez le **Name tag**.
   1. Sous **Type**, sélectionnez **PrivateLink Ready partner services**.
1. Découvrir et configurer l'endpoint d'interface avec la prise en charge interrégions :
   1. Sous **Service name**, renseignez le nom du service avec un nom de service PrivateLink valide issu du [tableau](#noms-de-service-privatelink) ci-dessous.
   1. Sous **Service region**, cliquez sur **Enable Cross Region endpoint** et sélectionnez **{{< region-param key="aws_private_link_cross_region" >}}**.
   1. Cliquez sur **Verify service** et attendez la notification _Service name verified_.
      **Remarque :** si vous ne parvenez pas à vérifier le service après avoir suivi les étapes ci-dessus, contactez [l'assistance Datadog][1].
1. Sous **Network Settings**, sélectionnez un VPC avec lequel déployer l'endpoint d'interface VPC.
1. Vérifiez que l'option **Enable DNS name** est cochée.
1. Sous **Subnets**, sélectionnez un ou plusieurs sous-réseaux dans votre VPC pour l'endpoint d'interface.
1. Sous **Security Groups**, sélectionnez un groupe de sécurité pour contrôler ce qui peut envoyer du trafic vers l'endpoint VPC.

   **Remarque** : le groupe de sécurité doit accepter le trafic entrant sur le port TCP 443.
1. Facultativement, indiquez un **Name tag** et cliquez sur **Create endpoint**.
1. Attendez quelques minutes que le statut de l'endpoint passe de **Pending** à **Available**. Cela peut prendre jusqu'à 10 minutes. Si cela prend plus de temps que prévu, contactez [l'assistance Datadog][1].

Une fois que le statut de l'endpoint est mis à jour sur **Available**, vous pouvez utiliser cet endpoint pour envoyer des données de télémétrie à Datadog via l'endpoint AWS PrivateLink interrégions.

## Noms de service PrivateLink

| Datadog                   | Nom de service PrivateLink                                                               | Nom DNS privé                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (intake HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (intake HTTP utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Surveillance de bases de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

**Remarque** : le PrivateLink interrégions n'émet pas de métriques CloudWatch. Consultez la section [Métriques CloudWatch pour AWS PrivateLink][2] pour plus d'informations.

[1]: /fr/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "VPC Peering" %}}
1. Connectez l'AWS Console à la région **{{< region-param key="aws_region" >}}** et créez un endpoint VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:80%;" >}}

2. Sélectionnez **Find service by name**.
3. Remplissez la zone de texte _Service Name_ en fonction du service pour lequel vous souhaitez établir AWS PrivateLink :

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:90%;" >}}

| Datadog                   | Nom de service PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (intake HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (intake HTTP utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Surveillance de bases de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Cliquez sur **Verify**. Si cela ne renvoie pas _Service name found_, contactez [l'assistance Datadog][1].

5. Ensuite, choisissez le VPC et les sous-réseaux devant être appairés avec l'endpoint de service VPC de Datadog. Ne sélectionnez pas **Enable DNS name**, car le VPC peering nécessite une configuration manuelle du DNS.

6. Choisissez le groupe de sécurité de votre choix pour contrôler ce qui peut envoyer du trafic vers cet endpoint VPC.

    **Remarque** : **le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

7. Cliquez sur **Create endpoint** en bas de l'écran. En cas de réussite, l'élément suivant s'affiche :

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint VPC créé" style="width:80%;" >}}

8. Cliquez sur l'ID de l'endpoint VPC pour vérifier son statut.
9. Attendez que le statut passe de _Pending_ à _Available_. Cela peut prendre jusqu'à 10 minutes.
10. Après avoir créé l'endpoint, utilisez le VPC peering pour rendre l'endpoint PrivateLink disponible dans une autre région afin d'envoyer des données de télémétrie à Datadog via PrivateLink. Pour plus d'informations, consultez la page [Travailler avec les connexions VPC Peering][2] dans AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Statut du VPC" style="width:80%;" >}}

### Amazon Route53

1. Créez une [zone hébergée privée Route53][3] pour chaque service pour lequel vous avez créé un endpoint AWS PrivateLink. Attachez la zone hébergée privée au VPC dans {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Créer une zone hébergée privée Route53" style="width:80%;" >}}

Utilisez la liste ci-dessous pour faire correspondre le service et le nom DNS aux différentes parties de Datadog :

  | Datadog                   | Nom de service PrivateLink                                                               | Nom DNS privé                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (intake HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Logs (intake HTTP utilisateur)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Surveillance de bases de données       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

  Vous pouvez également obtenir ces informations en interrogeant l'API AWS, `DescribeVpcEndpointServices`, ou en utilisant la commande suivante :

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Par exemple, dans le cas de l'endpoint de métriques Datadog pour {{< region-param key="aws_region" code="true" >}} :

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

Cette commande renvoie <code>metrics.agent.{{< region-param key="dd_site" >}}</code>, à savoir le nom de la zone hébergée privée requis pour associer le VPC à l'origine du trafic de l'Agent. Si vous remplacez cette entrée, tous les hostnames d'admission liés aux métriques sont récupérés.

2. Pour chaque nouvelle zone hébergée privée Route 53, créez un enregistrement A du même nom. Activez l'option **Alias**, puis, dans la section **Route traffic to**, sélectionnez **Alias to VPC endpoint**, **{{< region-param key="aws_region" >}}**. Saisissez ensuite le nom DNS de l'endpoint de VPC associé au nom DNS.

   **Remarques** :
      - Pour récupérer votre nom DNS, consultez la [documentation relative à l'affichage de la configuration du nom DNS privé du service d'endpoint][4] (en anglais).
      - L'Agent envoie les données de télémétrie aux endpoints versionnés, par exemple <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code>  qui renvoie vers <code>metrics.agent.{{< region-param key="dd_site" >}}</code> via un alias CNAME. Ainsi, vous devez uniquement configurer une zone hébergée privée pour <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Créer un enregistrement A" style="width:90%;" >}}

3. Configurez l'appairage et le routage de VPC entre le VPC dans la région {{< region-param key="aws_region" code="true" >}} qui comprend les endpoints PrivateLink Datadog et le VPC dans la région où les Agents Datadog s'exécutent.

4. Si les VPC se trouvent dans plusieurs comptes AWS, le VPC contenant l'Agent Datadog doit être autorisé à s'associer avec les zones hébergées privées Route 53 avant de poursuivre. Créez une [autorisation d'association de VPC][5] pour chaque zone hébergée privée Route 53 à l'aide de la région et de l'ID du VPC sur lequel l'Agent Datadog s'exécute. Il n'est pas possible d'utiliser la console AWS pour réaliser cette opération : servez-vous plutôt de la CLI, du SDK ou de l'API AWS.

5. Modifiez la zone hébergée privée Route 53 afin d'ajouter des VPC pour les autres régions.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Modifier une zone hébergée privée Route 53" style="width:80%;" >}}

6. Certains paramètres, notamment `enableDnsHostnames` et `enableDnsSupport`, doivent être activés pour les VPC qui sont associés à la zone hébergée privée. Consultez la section [Remarque sur l'utilisation des zones hébergées privées][6] pour en savoir plus.

7. [Redémarrez l'Agent][7] pour envoyer des données à Datadog via AWS PrivateLink.

#### Dépannage des problèmes de connectivité et de résolution DNS

Les noms DNS doivent correspondre à des adresses IP contenues dans le bloc CIDR du VPC dans la région {{< region-param key="aws_region" code="true" >}}. De plus, les connexions sur le `port 443` ne doivent pas échouer.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La connexion au port 443 ne doit pas échouer" style="width:80%;" >}}

Si le DNS correspond à des adresses IP publiques, la zone Route 53 n'est **pas** associée au VPC dans l'autre région, ou l'enregistrement A n'existe pas.

Si le DNS est résolu correctement, mais que les connexions au `port 443` échouent, il est possible que l'appairage ou le routage de VPC soient mal configurés, ou que le port 443 n'autorise pas de connexion sortante vers le bloc CIDR du VPC dans la région {{< region-param key="aws_region" code="true" >}}.

Certains paramètres, notamment `enableDnsHostnames` et `enableDnsSupport`, doivent être activés pour les VPC qui sont associés à la zone hébergée privée. Consultez les [paramètres VPC Amazon pour en savoir plus][6].

### Agent Datadog

1. Si vous recueillez les données de vos logs, vérifiez que votre Agent est configuré de façon à envoyer les logs via HTTPS. Si les données ne sont pas déjà disponibles, ajoutez ce qui suit au [fichier de configuration `datadog.yaml` de l'Agent][8] :

    ```yaml
    logs_config:
        force_use_http: true
    ```

    Si vous utilisez l'Agent de conteneur, définissez plutôt les variables d'environnement ci-dessous :

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    Cette configuration est requise pour envoyer des logs à Datadog avec AWS PrivateLink et l'Agent Datadog. Elle est toutefois facultative si vous utilisez l'extension Lambda. Pour en savoir plus, consultez la section relative à la [collecte de logs de l'Agent][9].

2. Si votre extension Lambda charge la clé d'API Datadog depuis AWS Secrets Manager en utilisant l'ARN spécifié via la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un endpoint de VPC pour Secrets Manager][10].

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

{{< /site-region >}}

## Vérifier que les données sont envoyées via PrivateLink

Après avoir configuré PrivateLink, pour vérifier que les données sont envoyées via PrivateLink, exécutez la commande `dig` sur une machine située dans ce VPC. Par exemple, exécutez cette commande si vous avez configuré un PrivateLink pour l'endpoint `http-intake.logs.datadoghq.com` :

```
dig http-intake.logs.datadoghq.com
```

Si les logs sont envoyés via PrivateLink, la section `ANSWER Section` de la sortie affiche `http-intake.logs.datadoghq.com` comme dans l'exemple suivant. **Remarque** : les adresses IP renvoyées doivent se trouver dans l'[espace d'adresses IP privées][1].

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com. 60 IN   A   172.31.57.3
http-intake.logs.datadoghq.com. 60 IN   A   172.31.3.10
http-intake.logs.datadoghq.com. 60 IN   A   172.31.20.174
http-intake.logs.datadoghq.com. 60 IN   A   172.31.34.135
```

Si les logs ne sont pas envoyés via PrivateLink, la section `ANSWER SECTION` de la sortie affiche le load balancer (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) vers lequel les logs sont envoyés.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com. 177 IN  CNAME   http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses