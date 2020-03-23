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

| Nom de service des logs Datadog                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0a2aef8496ee043bf` |

{{% /tab %}}
{{% tab "API" %}}

| Nom de service de l'API Datadog                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-02a4a57bc703929a0` |

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

Pour transmettre vos métriques à Datadog à l'aide du nouvel endpoint de votre VPC, définissez `pvtlink.agent.datadoghq.com` comme votre nouvelle destination pour vos métriques :

1. Mettez à jour le paramètre `dd_url` dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

    ```yaml
    dd_url: pvtlink.agent.datadoghq.com
    ```

2. [Redémarrez votre Agent][2] pour envoyer des métriques à Datadog via AWS PrivateLink.

**Remarque** : si vous utilisez l'Agent de conteneur, définissez plutôt la variable d'environnement `DD_DD_URL="pvtlink.agent.datadoghq.com"`.


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Logs" %}}

_Disponible à partir des versions 6.14 ou ultérieures de l'Agent_

Pour transmettre vos logs à Datadog à l'aide du nouvel endpoint de votre VPC, définissez `pvtlink.logs.datadoghq.com` comme votre nouvelle destination pour vos logs :

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

**Avec le Forwarder Lambda** :

Ajoutez `DD_URL: pvtlink.logs.datadoghq.com` à la variable d'environnement de votre [fonction Lambda Datadog][4] pour utiliser le PrivateLink lors de la transmission des logs des services AWS à Datadog.


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
[4]: /fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
{{% /tab %}}
{{% tab "API" %}}

Pour envoyer des données à l'API Datadog ou exploiter les données de l'API via ce nouvel endpoint, remplacez la signature host de l'appel d'API `api.datadoghq.com/api/` par `pvtlink.api.datadoghq.com/api/`.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /fr/help