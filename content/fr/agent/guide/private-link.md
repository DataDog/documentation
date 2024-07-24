---
further_reading:
- link: /agent/logs
  tag: Documentation
  text: Activer la collecte de logs avec l'Agent
- link: /integrations/amazon_web_services/#log-collection
  tag: Documentation
  text: Collecter les logs de vos services AWS
title: Connexion à Datadog via AWS PrivateLink
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-warning">Datadog via PrivateLink ne prend pas en charge le site Datadog sélectionné.</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

Ce guide vous explique comment configurer [AWS PrivateLink][1] afin de l'utiliser avec Datadog.

## Présentation

Pour utiliser PrivateLink, vous devez configurer un endpoint interne dans votre VPC vers lequel les Agents Datadog locaux peuvent envoyer des données. L’endpoint de votre VPC est ensuite associé au endpoint du VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Schéma VPC" >}}

## Implémentation

Datadog expose les endpoints AWS PrivateLink sur **{{< region-param key="aws_region" >}}**.

Toutefois, pour acheminer le trafic vers l'endpoint PrivateLink de Datadog sur {{< region-param key="aws_region" code="true" >}} dans d'autres régions, utilisez la fonctionnalité d'[appairage inter-région d'Amazon VPC][2]. L'appairage inter-région de VPC vous permet de connecter plusieurs VPC répartis sur diverses régions AWS les uns aux autres. Vos ressources de VPC issues des différentes régions peuvent ainsi communiquer entre elles par l'intermédiaire d'adresses IP privées. Pour en savoir plus, consultez la [documentation AWS sur l'appairage de VPC][2].

{{< tabs >}}
{{% tab "Connexion depuis la même région" %}}

1. Connectez la console AWS à la région **{{< region-param key="aws_region" >}}** et créez un endpoint de VPC.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Créer un endpoint de VPC" style="width:60%;" >}}

2. Sélectionnez **Find service by name**.
3. Remplissez la zone de texte _Service Name_ en indiquant les informations du service pour lequel vous souhaitez configurer AWS PrivateLink :

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom du service VPC" style="width:70%;" >}}

| Datadog                   | Nom du service PrivateLink                                                               | Nom du DNS privé                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (admission HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint" code="true">}}              |
| Logs (admission HTTP des utilisateurs)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint" code="true">}}                    |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
| Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

4. Cliquez sur **Verify**. Si le message _Service name found_, ne s'affiche pas, contactez l'[assistance Datadog][1].
5. Choisissez le VPC et les sous-réseaux à associer avec l’endpoint du service VPC Datadog.
6. Pour l'option **Enable DNS name**, assurez-vous que la case _Enable for this endpoint_ est cochée :

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Activer le DNS privé" style="width:80%;" >}}

7. Choisissez le groupe de sécurité de votre choix afin de contrôler les éléments capables de générer du trafic vers cet endpoint de VPC.

    **Remarque** : **Le groupe de sécurité doit accepter le trafic entrant sur le port `443`**.

8. Cliquez sur **Create endpoint** en bas de l’écran. En l’absence d’erreur, le message suivant s’affiche :

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC créé" style="width:60%;" >}}

9. Cliquez sur l’ID de l’endpoint de VPC pour consulter son statut.
10. Patientez jusqu’à ce que le statut _Pending_ soit remplacé par _Available_. Cela peut prendre jusqu'à 10 minutes. Dès lors que le statut _Available_, s’affiche, vous pouvez commencer à utiliser AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Statut du VPC" style="width:60%;" >}}

11. Si vous recueillez les données de vos logs, vérifiez que votre Agent est configuré de façon à envoyer les logs via HTTPS. Si les données ne sont pas déjà disponibles, ajoutez ce qui suit au [fichier de configuration `datadog.yaml` de l'Agent][2] :

    ```yaml
    logs_config:
        use_http: true
    ```

    Si vous utilisez l’Agent de conteneur, définissez plutôt les variables d’environnement ci-dessous :

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    Cette configuration est requise pour envoyer des logs à Datadog avec AWS PrivateLink et l’Agent Datadog. Elle est toutefois facultative si vous utilisez l’extension Lambda. Pour en savoir plus, consultez la section relative à la [collecte de logs de l'Agent][3].

12. Si votre extension Lambda charge la clé d'API Datadog depuis AWS Secrets Manager en utilisant l'ARN spécifié via la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un endpoint de VPC pour Secrets Manager][4].

13. [Redémarrez votre Agent][5] pour envoyer des données à Datadog via AWS PrivateLink.



[1]: /fr/help/
[2]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Connexion depuis une autre région via l'appairage de VPC Peering" %}}

### Appairage de VPC Amazon

1. Connectez la console AWS à la région **{{< region-param key="aws_region" >}}** et créez un endpoint de VCP.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Créer un endpoint de VPC" style="width:80%;" >}}

2. Sélectionnez **Find service by name**.
3. Remplissez la zone de texte _Service Name_ en indiquant les informations du service pour lequel vous souhaitez configurer AWS PrivateLink :

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom du service de VPC" style="width:90%;" >}}

| Datadog                   | Nom du service PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (admission HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (admission HTTP des utilisateurs)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Cliquez sur **Verify**. Si le message _Service name found_ ne s'affiche pas, contactez l'[assistance Datadog][1].

5. Choisissez ensuite le VPC et les sous-réseaux à appairer avec l'endpoint du service VPC Datadog. Ne sélectionnez pas l'option **Enable DNS name**, car l'appairage de VPC nécessite une configuration manuelle du DNS.

6. Choisissez le groupe de sécurité de votre choix afin de contrôler les éléments capables de générer du trafic vers cet endpoint de VPC.

    **Remarque** : **le groupe de sécurité doit accepter le trafic entrant sur le port `443`**.

7. Cliquez sur **Create endpoint** en bas de l'écran. En l'absence d'erreur, le message suivant s'affiche :

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC créé" style="width:80%;" >}}

8. Cliquez sur l'ID de l'endpoint de VPC pour consulter son statut.
9. Patientez jusqu'à ce que le statut _Pending_ soit remplacé par _Available_. Cela peut prendre jusqu'à 10 minutes.
10. Une fois l'endpoint créé, utilisez l'appairage de VPC pour que l'endpoint PrivateLink soit disponible dans une autre région, afin d'envoyer des données de télémétrie à Datadog via PrivateLink. Pour en savoir plus, consultez la page [Utilisation de connexions d'appairage de VPC][2] de la documentation AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Statut du VPC" style="width:80%;" >}}

### Amazon Route53

1. Créez une [zone hébergée privée Route 53][3] pour chaque service pour lequel vous avez créé un endpoint AWS PrivateLink. Associez la zone hébergée privée au VPC dans la région {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Créer une zone hébergée privée Route 53" style="width:80%;" >}}

La liste ci-dessous vous permet de mapper les noms de services et de DNS à différents composants de Datadog :

  | Datadog                   | Nom du service PrivateLink                                                               | Nom du DNS privé                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (admission HTTP de l'Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | Logs (admission HTTP des utilisateurs)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code>       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
  | Métriques                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
  | Conteneurs                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
  | Processus                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
  | Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
  | Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
  | Configuration à distance      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

  Vous pouvez également obtenir ces informations en interrogeant l'API AWS `DescribeVpcEndpointServices`, ou en utilisant la commande CLI suivante : 

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Par exemple, pour l'endpoint de métriques Datadog dans la région {{< region-param key="aws_region" code="true" >}} :

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
[8]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://docs.datadoghq.com/fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}


[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}