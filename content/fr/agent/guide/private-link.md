---
title: "Connexion à Datadog via AWS\_PrivateLink"
kind: guide
further_reading:
  - link: agent/logs
    tag: Documentation
    text: Activez la collecte de logs avec l'Agent.
  - link: '/integrations/amazon_web_services/#configurer-la-fonction-lambda-de-datadog'
    tag: Documentation
    text: Collecter les logs de vos services AWS
---
<div class="alert alert-info">
Datadog expose les endpoints AWS PrivateLink sur <b>us-east-1</b>.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog via PrivateLink ne prend pas en charge le site gouvernemental de Datadog.</div>
{{< /site-region >}}

Ce guide vous explique comment configurer [AWS PrivateLink][1] afin de l'utiliser avec Datadog.

## Présentation

Pour utiliser PrivateLink, vous devez configurer un endpoint interne dans votre VPC vers lequel les Agents Datadog locaux peuvent envoyer des données. L'endpoint de votre VPC est ensuite associé au endpoint du VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Schéma VPC" >}}

## Créer l'endpoint de votre VPC

1. Connectez-vous à la console AWS et créez un nouvel endpoint de VPC :
   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Créer un endpoint de VPC" style="width:60%;" >}}
2. Sélectionnez **Find service by name**.
3. Remplissez la zone de texte _Service Name_ en indiquant les informations du service pour lequel vous souhaitez configurer AWS PrivateLink :

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nom de service VPC" style="width:70%;" >}}
    {{< tabs >}}

{{% tab "Métriques" %}}

| Nom de service des métriques Datadog                                |
| ---------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-056576c12b36056ca`  |

{{% /tab %}}
{{% tab "Logs" %}}

| Forwarder | Nom du service des logs Datadog |
| --------- | ------------------------- |
| Agent Datadog | `com.amazonaws.vpce.us-east-1.vpce-svc-0a2aef8496ee043bf` |
| Forwarder Lambda ou forwarder personnalisé | `com.amazonaws.vpce.us-east-1.vpce-svc-06394d10ccaf6fb97` |

{{% /tab %}}
{{% tab "API" %}}

| Nom du service de l'API Datadog                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-02a4a57bc703929a0` |

{{% /tab %}}
{{% tab "Processus" %}}

| Nom du service de surveillance de processus Datadog                   |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-05316fe237f6d8ddd` |

{{% /tab %}}
{{% tab "Traces" %}}

| Nom du service des traces Datadog                                |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-07672d13af0033c24` |

{{% /tab %}}
{{% tab "Ressources Kubernetes" %}}

| Nom de service de l'explorateur Kubernetes Datadog                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0b03d6756bf6c2ec3` |

{{% /tab %}}
{{< /tabs >}}

4. Cliquer sur le bouton _verify_. Si le message _Service name found_ ne s'affiche pas, contactez l'[équipe d'assistance Datadog][2].
5. Choisissez le VPC et les sous-réseaux à associer avec l'endpoint du service VPC Datadog.
6. Pour l'option **Enable DNS name**, assurez-vous que la case _Enable for this endpoint_ est cochée : 
   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Activer le DNS privé" style="width:60%;" >}}
7. Choisissez le groupe de sécurité de votre choix afin de contrôler les éléments capables de générer du trafic vers l'endpoint de ce VPC.

    **Remarque** : **si vous souhaitez transmettre des logs à Datadog via l'endpoint de ce VPC, le groupe de sécurité doit accepter le trafic entrant et sortant sur le port `443`**.

8. Cliquez sur **Create endpoint** en bas de l'écran. En l'absence d'erreur, le message suivant s'affiche :
   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC créé" style="width:60%;" >}}
9. Cliquez sur l'ID du endpoint de VPC pour consulter son statut.
10. Patientez jusqu'à ce que le statut _Pending_ soit remplacé par _Available_. Cela peut prendre jusqu'à 10 minutes.
    {{< img src="agent/guide/private_link/vpc_status.png" alt="Statut VPC" style="width:60%;" >}}

Dès que le statut _Available_ apparaît, vous pouvez utiliser votre AWS PrivateLink. Il ne vous reste plus qu'à modifier les configurations de vos Agents en précisant le nouveau endpoint cible pour vos Agents Datadog, le Forwarder Lambda et/ou les autres clients transmettant des données à Datadog.

## Configuration du client

Sélectionnez un onglet ci-dessous pour découvrir comment envoyer vos métriques et vos logs à Datadog à l'aide de votre nouvel endpoint de VPC ou pour consulter la nouvelle URL host à utiliser pour l'API Datadog :

{{< tabs >}}
{{% tab "Métriques" %}}

_Disponible à partir des versions 6.0 ou ultérieures de l'Agent_

Pour transmettre vos métriques à Datadog à l'aide du nouvel endpoint de votre VPC, définissez `pvtlink.agent.datadoghq.com` comme nouvelle destination pour vos métriques :

1. Mettez à jour le paramètre `dd_url` dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

    ```yaml
    dd_url: https://pvtlink.agent.datadoghq.com
    ```

2. [Redémarrez votre Agent][2] pour envoyer des métriques à Datadog via AWS PrivateLink.

**Remarque** : si vous utilisez l'Agent de conteneur, définissez plutôt la variable d'environnement `DD_DD_URL="https://pvtlink.agent.datadoghq.com"`. Celle-ci doit être configurée sur l'Agent de cluster _et_ sur l'Agent de nœud si vous utilisez l'Agent de cluster pour surveiller un environnement Kubernetes.


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Logs" %}}

_Disponible à partir des versions 6.14 ou ultérieures de l'Agent_

Pour transmettre vos logs à Datadog à l'aide du nouvel endpoint de votre VPC, définissez `pvtlink.logs.datadoghq.com` comme nouvelle destination pour vos logs :

**Avec l'Agent Datadog** :

1. Ajoutez ce qui suit au [fichier de configuration `datadog.yaml` de l'Agent][1] :

    ```yaml
    logs_config:
        use_http: true
        logs_dd_url: pvtlink.logs.datadoghq.com:443
    ```

    - La variable `use_http` force l'Agent Datadog à envoyer les logs via HTTPS. Cette configuration est requise lors de l'envoi de logs à Datadog par l'intermédiaire d'AWS PrivateLink. Pour en savoir plus, consultez la [documentation relative à la collecte de logs de l'Agent][2].
    - La variable `logs_dd_url` est utilisée pour envoyer des logs au endpoint du VPC.

2. [Redémarrez votre Agent][3] pour envoyer des logs à Datadog via AWS PrivateLink.

**Remarque** : si vous utilisez l'Agent de conteneur, définissez plutôt les variables d'environnement ci-dessous.

- `DD_LOGS_CONFIG_USE_HTTP=true`
- `DD_LOGS_CONFIG_LOGS_DD_URL="pvtlink.logs.datadoghq.com:443"`

**Avec le Forwarder Lambda ou un forwarder personnalisé** :

Ajoutez `DD_URL: api-pvtlink.logs.datadoghq.com` à la variable d'environnement de votre [fonction Lambda Datadog][4] pour utiliser le PrivateLink lors de la transmission des logs des services AWS à Datadog.

Par défaut, la clé d'API du forwarder est stockée dans Secrets Manager. L'endpoint de Secrets Manager doit être ajouté au VPC. Suivez les instructions [fournies ici pour ajouter des services AWS à un VPC][5].

Si vous utilisez le modèle CloudFormation pour installer le Forwarder, activez 'DdUsePrivateLink' et définissez au moins un ID de sous-réseau et un groupe de sécurité.

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
[4]: /fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
{{% /tab %}}
{{% tab "API" %}}

Pour envoyer des données à l'API Datadog ou exploiter les données de l'API via ce nouvel endpoint, remplacez la signature host de l'appel d'API `api.datadoghq.com/api/` par `pvtlink.api.datadoghq.com/api/`.

{{% /tab %}}
{{% tab "Processus" %}}

Pour transmettre vos métriques de processus à Datadog à l'aide du nouvel endpoint de votre VPC, définissez `pvtlink.process.datadoghq.com` comme nouvelle destination pour vos données de processus :

1. Mettez à jour le paramètre `process_dd_url` dans la section `process_config:` du [fichier de configuration `datadog.yaml` de l'Agent][1] :

    ```yaml
    process_dd_url: https://pvtlink.process.datadoghq.com
    ```

2. [Redémarrez votre Agent][2] pour envoyer des données de processus à Datadog via AWS PrivateLink.

**Remarque** : si vous utilisez l'Agent de conteneur, définissez plutôt la variable d'environnement `DD_PROCESS_AGENT_URL="https://pvtlink.process.datadoghq.com"`. Celle-ci doit être configurée sur l'Agent de cluster _et_ sur l'Agent de nœud si vous utilisez l'Agent de cluster pour surveiller un environnement Kubernetes.


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Traces" %}}

Pour transmettre vos métriques de trace à Datadog à l'aide du nouvel endpoint de votre VPC, définissez `trace-pvtlink.agent.datadoghq.com` comme nouvelle destination pour vos traces :

1. Mettez à jour le paramètre `apm_dd_url` dans la section `apm_config` du [fichier de configuration `datadog.yaml` de l'Agent][1] :

    ```yaml
    apm_dd_url: https://trace-pvtlink.agent.datadoghq.com
    ```

2. [Redémarrez votre Agent][2] pour envoyer des traces à Datadog via AWS PrivateLink.

**Remarque** : si vous utilisez l'Agent de conteneur, définissez plutôt la variable d'environnement `DD_APM_DD_URL="https://trace-pvtlink.agent.datadoghq.com"`. Celle-ci doit être configurée sur l'Agent de cluster _et_ sur l'Agent de nœud si vous utilisez l'Agent de cluster pour surveiller un environnement Kubernetes.


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Ressources Kubernetes" %}}

Pour transmettre vos ressources Kubernetes à Datadog à l'aide du nouvel endpoint de votre VPC, définissez `orchestrator-pvtlink.datadoghq.com` comme nouvelle destination pour vos données d'orchestrateur :

1. Mettez à jour le paramètre `dd_url` dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

    ```yaml
    dd_url: orchestrator-pvtlink.datadoghq.com
    ```

   Si vous utilisez l'Agent de conteneur, définissez plutôt la variable d'environnement ci-dessous.

   ```
   DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_DD_URL="orchestrator-pvtlink.datadoghq.com"
   ```

   Définissez également cette variable d'environnement pour l'Agent de processus. Si vous utilisez l'Agent de cluster pour surveiller un environnement Kubernetes, vous devrez également la configurer pour l'Agent de cluster et l'Agent de nœud.

2. [Redémarrez votre Agent][2] pour envoyer des ressources Kubernetes à Datadog via AWS PrivateLink.


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## Utilisation avancée

### Peering inter-régions

Pour acheminer du trafic vers l'endpoint PrivateLink de Datadog sur `us-east-1` à partir d'autres régions, utilisez la fonctionnalité de [peering inter-régions d'Amazon VPC][3]. 

Le peering de VPC inter-régions vous permet de connecter plusieurs VPC répartis sur diverses régions AWS les uns aux autres. Vos ressources VPC issues de différentes régions peuvent ainsi communiquer entre elles via des adresses IP privées.

Pour en savoir plus, consultez la [documentation sur le peering d'Amazon VPC][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /fr/help/
[3]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html