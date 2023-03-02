---
further_reading:
- link: agent/logs
  tag: Documentation
  text: Activez la collecte de logs avec l'Agent.
- link: /integrations/amazon_web_services/#configurer-la-fonction-lambda-de-datadog
  tag: Documentation
  text: Collecter les logs de vos services AWS
kind: guide
title: Connexion à Datadog via AWS PrivateLink
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog via PrivateLink ne prend pas en charge le site gouvernemental de Datadog.</div>
{{< /site-region >}}

{{< site-region region="us3" >}}
<div class="alert alert-warning">Datadog via PrivateLink ne prend pas en charge le site US3 de Datadog.</div>
{{< /site-region >}}

{{< site-region region="us5" >}}
<div class="alert alert-warning">Datadog via PrivateLink ne prend pas en charge le site US5 de Datadog.</div>
{{< /site-region >}}

{{< site-region region="eu" >}}
<div class="alert alert-warning">Datadog via PrivateLink ne prend pas en charge le site EU de Datadog.</div>
{{< /site-region >}}

Ce guide vous explique comment configurer [AWS PrivateLink][1] afin de l'utiliser avec Datadog.

## Présentation

Pour utiliser PrivateLink, vous devez configurer un endpoint interne dans votre VPC vers lequel les Agents Datadog locaux peuvent envoyer des données. L'endpoint de votre VPC est ensuite associé au endpoint du VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Schéma VPC" >}}

## Implémentation

Datadog expose les endpoints AWS PrivateLink dans la région **us-east-1**.

Toutefois, pour acheminer le trafic vers l'endpoint PrivateLink de Datadog sur `us-east-1` dans d'autres régions, utilisez la fonctionnalité d'[appairage inter-région d'Amazon VPC][2]. L'appairage inter-région de VPC vous permet de connecter plusieurs VPC répartis sur diverses régions AWS les uns aux autres. Vos ressources de VPC issues de différentes régions peuvent ainsi communiquer entre elles par l'intermédiaire d'adresses PI privées. Pour en savoir plus, consultez la [documentation AWS sur l'appairage de VPC][2].

{{< tabs >}}
{{% tab "us-east-1" %}}

1. Connectez la console AWS à la région **us-east-1** et créez un endpoint de VCP.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Créer un endpoint de VPC" style="width:60%;" >}}

2. Sélectionnez **Find service by name**.
3. Remplissez la zone de texte _Service Name_ en indiquant les informations du service pour lequel vous souhaitez configurer AWS PrivateLink :

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom de service VPC" style="width:70%;" >}}

| Datadog                   | Nom du service PrivateLink                                  | Nom du DNS privé                                   |
|---------------------------| --------------------------------------------------------- | -------------------------------------------------- |
| Logs (admission HTTP de l'Agent)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
| Logs (admission HTTP des utilisateurs)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` | `http-intake.logs.datadoghq.com`                  |
| API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
| Métriques                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
| Conteneurs                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |
| Processus                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
| Profiling                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` | `intake.profile.datadoghq.com`                    |
| Traces                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |

4. Cliquez sur **Verify**. Si le message _Service name found_ ne s'affiche pas, contactez l'[assistance Datadog][1].
5. Choisissez le VPC et les sous-réseaux à associer avec l'endpoint du service VPC Datadog.
6. Pour l'option **Enable DNS name**, assurez-vous que la case _Enable for this endpoint_ est cochée : 

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Activer le DNS privé" style="width:80%;" >}}

7. Choisissez le groupe de sécurité de votre choix afin de contrôler les éléments capables de générer du trafic vers cet endpoint de VPC.

    **Remarque** : **le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

8. Cliquez sur **Create endpoint** en bas de l'écran. En l'absence d'erreur, le message suivant s'affiche :

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC créé" style="width:60%;" >}}

9. Cliquez sur l'ID de l'endpoint de VPC pour consulter son statut.
10. Patientez jusqu'à ce que le statut _Pending_ soit remplacé par _Available_. Cela peut prendre jusqu'à 10 minutes. Dès lors que le statut _Available_ s'affiche, vous pouvez commencer à utiliser AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Statut VPC" style="width:60%;" >}}

11. Si vous recueillez les données de vos logs, vérifiez que votre Agent est configuré de façon à envoyer les logs via HTTPS. Si les données ne sont pas déjà disponibles, ajoutez ce qui suit au [fichier de configuration `datadog.yaml` de l'Agent][2] :

    ```yaml
    logs_config:
        use_http: true
    ```

    Si vous utilisez l'Agent de conteneur, définissez plutôt les variables d'environnement ci-dessous :

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    Cette configuration est requise pour envoyer des logs à Datadog avec AWS PrivateLink et l'Agent Datadog. Elle est toutefois facultative si vous utilisez l'extension Lambda. Pour en savoir plus, consultez la section relative à la [collecte de logs de l'Agent][3].

12. Si votre extension Lambda charge la clé d'API Datadog depuis AWS Secrets Manager en utilisant l'ARN spécifié via la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un endpoint de VPC pour Secrets Manager][4].

13. [Redémarrez votre Agent][5] pour envoyer des données à Datadog via AWS PrivateLink.



[1]: /fr/help/
[2]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Appairage de VPC" %}}

### Appairage Amazon VPC

1. Connectez la console AWS à la région **us-east-1** et créez un endpoint de VCP.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Créer un endpoint de VPC" style="width:80%;" >}}

2. Sélectionnez **Find service by name**.
3. Remplissez la zone de texte _Service Name_ en indiquant les informations du service pour lequel vous souhaitez configurer AWS PrivateLink :

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom de service VPC" style="width:90%;" >}}

| Datadog                   | Nom du service PrivateLink                                  |
|---------------------------| --------------------------------------------------------- |
| Métriques                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| Logs (admission HTTP de l'Agent)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| Logs (admission HTTP des utilisateurs)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` |
| API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` |
| Processus                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| Profiling                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` |
| Traces                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` |
| Conteneurs                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |

4. Cliquez sur **Verify**. Si le message _Service name found_ ne s'affiche pas, contactez l'[assistance Datadog][1].

5. Choisissez ensuite le VPC et les sous-réseaux à appairer avec l'endpoint du service VPC Datadog. Ne sélectionnez pas l'option **Enable DNS name**, car l'appairage de VPC nécessite une configuration manuelle du DNS.

6. Choisissez le groupe de sécurité de votre choix afin de contrôler les éléments capables de générer du trafic vers cet endpoint de VPC.

    **Remarque** : **le groupe de sécurité doit accepter le trafic entrant sur le port TCP `443`**.

7. Cliquez sur **Create endpoint** en bas de l'écran. En l'absence d'erreur, le message suivant s'affiche :

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC créé" style="width:80%;" >}}

8. Cliquez sur l'ID de l'endpoint de VPC pour consulter son statut.
9. Patientez jusqu'à ce que le statut _Pending_ soit remplacé par _Available_. Cela peut prendre jusqu'à 10 minutes.
10. Une fois l'endpoint créé, utilisez l'appairage de VPC pour que l'endpont PrivateLink soit disponible dans une autre région, afin d'envoyer des données de télémétrie à Datadog via PrivateLink. Pour en savoir plus, consultez la page [Utilisation de connexions d'appairage de VPC][10] de la documentation AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Statut VPC" style="width:80%;" >}}

### Amazon Route 53

1. Créez une [zone hébergée privée Route 53][3] pour chaque service pour lequel vous avez créé un endpoint AWS PrivateLink. Associez la zone hébergée privée au VPC dans la région `us-east-1`.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Créer une zone hébergée privée Route 53" style="width:80%;" >}}

La liste ci-dessous vous permet de mapper les noms de services et de DNS à différents composants de Datadog :

  | Datadog                   | Nom du service PrivateLink                                  | Nom du DNS privé                                   |
  |---------------------------| --------------------------------------------------------- | -------------------------------------------------- |
  | Métriques                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
  | Logs (admission HTTP de l'Agent)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
  | Logs (admission HTTP des utilisateurs)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` | `http-intake.logs.datadoghq.com`                  |
  | API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
  | Processus                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
  | Profiling                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` | `intake.profile.datadoghq.com`                    |
  | Traces                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |
  | Conteneurs                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |

  Vous pouvez également obtenir ces informations en interrogeant l'API AWS `DescribeVpcEndpointServices`, ou en utilisant la commande CLI suivante : `aws ec2 describe-vpc-endpoint-services --service-names <nom_service>`.

  Par exemple, pour l'endpoint de métriques Datadog :

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8 | jq '.ServiceDetails[0].PrivateDnsName'
  ```

Cette commande renvoie `metrics.agent.datadoghq.com`, à savoir le nom de la zone hébergée privée requis pour associer le VPC à l'origine du trafic de l'Agent. Si vous remplacez cette entrée, tous les hostnames d'admission liés aux métriques sont récupérés.

2. Pour chaque nouvelle zone hébergée privée Route 53, créez un enregistrement A du même nom. Activez l'option **Alias**, puis, dans la section **Route traffic to**, sélectionnez **Alias to VPC endpoint** et **us-east-1**. Saisissez ensuite le nom DNS de l'endpoint de VPC associé au nom DNS.

   **Remarques** :
      - Pour récupérer votre nom DNS, consultez la [documentation relative à l'affichage de la configuration du nom DNS privé du service d'endpoint][2] (en anglais).
      - L'Agent envoie les données de télémétrie aux endpoints versionnés, par exemple `<version>-app.agent.datadoghq.com`, qui renvoie vers `metrics.agent.datadoghq.com` via un alias CNAME. Ainsi, vous devez uniquement configurer une zone hébergée privée pour `metrics.agent.datadoghq.com`.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Créer un enregistrement A" style="width:90%;" >}}

3. Configurez l'appairage et le routage de VPC entre le VPC dans la région `us-east-1` qui comprend les endpoints PrivateLink Datadog et le VPC dans la région où les Agents Datadog s'exécutent.

4. Si les VPC se trouvent dans plusieurs comptes AWS, le VPC contenant l'Agent Datadog doit être autorisé à s'associer avec les zones hébergées privées Route 53 avant de poursuivre. Créez une [autorisation d'association de VPC][4] pour chaque zone hébergée privée Route 53 à l'aide de la région et de l'ID du VPC sur lequel l'Agent Datadog s'exécute. Il n'est pas possible d'utiliser la console AWS pour réaliser cette opération : servez-vous plutôt de la CLI, du SDK ou de l'API AWS.

5. Modifiez la zone hébergée privée Route 53 afin d'ajouter le VPC en dehors de la région non-us-east-1.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Modifier une zone hébergée privée Route 53" style="width:80%;" >}}

6. Certains paramètres, notamment `enableDnsHostnames` et `enableDnsSupport`, doivent être activés pour les VPC qui sont associés à la zone hébergée privée. Consultez la section [Remarque sur l'utilisation des zones hébergées privées][5] pour en savoir plus.

7. [Redémarrez l'Agent][6] pour envoyer des données à Datadog via AWS PrivateLink.

#### Dépannage des problèmes de connectivité et de résolution DNS

Les noms DNS doivent correspondre à des adresses IP contenues dans le bloc CIDR du VPC dans la région `us-east-1`. De plus, les connexions sur le `port 443` ne doivent pas échouer.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La connexion au port 443 ne doit pas échouer" style="width:80%;" >}}

Si le DNS correspond à des adresses IP publiques, la zone Route 53 n'est **pas** associée au VPC dans l'autre région, ou l'enregistrement A n'existe pas.

Si le DNS est résolu correctement, mais que les connexions au `port 443` échouent, il est possible que l'appairage ou le routage de VPC soient mal configurés, ou que le port 443 n'autorise pas de connexion sortante vers le bloc CIDR du VPC dans la région `us-east-1`.

Certains paramètres, notamment `enableDnsHostnames` et `enableDnsSupport`, doivent être activés pour les VPC qui sont associés à la zone hébergée privée. Consultez les [paramètres VPC Amazon pour en savoir plus][5]. 

### Agent Datadog

1. Si vous recueillez les données de vos logs, vérifiez que votre Agent est configuré de façon à envoyer les logs via HTTPS. Si les données ne sont pas déjà disponibles, ajoutez ce qui suit au [fichier de configuration `datadog.yaml` de l'Agent][7] :

    ```yaml
    logs_config:
        force_use_http: true
    ```

    Si vous utilisez l'Agent de conteneur, définissez plutôt les variables d'environnement ci-dessous :

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    Cette configuration est requise pour envoyer des logs à Datadog avec AWS PrivateLink et l'Agent Datadog. Elle est toutefois facultative si vous utilisez l'extension Lambda. Pour en savoir plus, consultez la section relative à la [collecte de logs de l'Agent][8].

2. Si votre extension Lambda charge la clé d'API Datadog depuis AWS Secrets Manager en utilisant l'ARN spécifié via la variable d'environnement `DD_API_KEY_SECRET_ARN`, vous devez [créer un endpoint de VPC pour Secrets Manager][9].

3. [Redémarrez l'Agent][6].


[1]: /fr/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[5]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[6]: /fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[8]: https://docs.datadoghq.com/fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[9]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[10]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html