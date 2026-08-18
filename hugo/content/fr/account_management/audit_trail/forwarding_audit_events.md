---
description: Redirigez les événements d'audit de Datadog vers des destinations personnalisées
  comme Splunk, Elasticsearch et des endpoints HTTP pour la conformité et la surveillance
  de la sécurité.
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: Documentation
  text: En savoir plus sur le journal d'audit
title: Rediriger des événements d'audit vers des destinations personnalisées
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
La redirection des événements d'audit n'est pas disponible sur le site US1-FED.
</div>
{{% /site-region %}}

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
<div class="alert alert-danger">
La redirection des événements d'audit est en préversion.
</div>
{{% /site-region %}}

## Présentation

La redirection des événements d'audit permet d'envoyer les événements d'audit de Datadog vers des destinations personnalisées comme Splunk, Elasticsearch et des endpoints HTTP. Les événements d'audit sont transmis au format JSON. Vous pouvez ajouter jusqu'à trois destinations pour chaque organisation Datadog.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="La section Custom Destinations montrant une destination Login-Event-to-SIEM active avec un volume estimé de 10,4 Mo d'événements d'audit au cours des dernières 24 heures et @action:login comme requête de filtrage." >}}

**Remarque** : seuls les utilisateurs Datadog disposant de l'autorisation `audit_trail_write` peuvent créer, modifier ou supprimer des destinations personnalisées pour la redirection des événements d'audit.

## Configurer la redirection des événements d'audit vers des destinations personnalisées

1. Ajoutez les adresses IP des webhooks de la [liste des plages IP][1] à la liste d'autorisation si nécessaire.
2. Accédez à [Audit Trail Settings][2].
3. Cliquer sur **Add Destination** dans la section **Audit Event Forwarding**.
4. Saisissez la requête permettant de filtrer les événements d'audit à rediriger. Par exemple, ajouter `@action:login` comme requête pour ne rediriger que les événements de connexion vers votre SIEM ou une destination personnalisée. Consultez la section relative à la [syntaxe de recherche][3] pour plus d'informations. 
5. Sélectionnez le **Destination Type**.

{{< tabs >}}
{{% tab "HTTP" %}}

6. Saisissez un nom pour la destination.
7. Dans le champ **Define endpoint**, indiquez l'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`. 
    - Par exemple, pour envoyer des logs à Sumo Logic, suivez leur documentation [Configurer une source HTTP pour les logs et les métriques][1] afin d'obtenir l'URL de la source HTTP de leur collector. Indiquez ensuite cette URL dans le champ **Define endpoint**.
8. Dans la section **Configure Authentication**, sélectionnez l'un des types d'authentification suivants et fournir les informations correspondantes :
    - Basic Authentication : indiquez le nom d'utilisateur et le mot de passe du compte destinataire des logs.
    - Request Header : indiquez le nom et la valeur de l'en-tête. Par exemple, si vous utilisez l'en-tête Authorization et que le nom d'utilisateur est `myaccount` et le mot de passe `mypassword` :
        - Saisissez `Authorization` pour le **Header Name**.
        - La valeur de l'en-tête suit le format `Basic username:password`, où `username:password` est encodé en base64. Dans cet exemple, la valeur de l'en-tête est `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`. 
  9. Cliquez sur **Save**.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. Saisissez un nom pour la destination.
7. Dans la section **Configure Destination**, indiquez l'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`. Par exemple : `https://<your_account>.splunkcloud.com:8088`. **Remarque** : `/services/collector/event` est automatiquement ajouté à l'endpoint.
8. Dans la section **Configure Authentication**, indiquer le token HEC Splunk. Consultez [Configurez et utilisez HTTP Event Collector][1] pour plus d'informations sur le token HEC.
9. Cliquez sur **Save**.

**Remarque** : la [confirmation de l'indexeur (indexer acknowledgment)][2] doit être désactivée.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. Saisissez un nom pour la destination.
7. Dans la section **Configure Destination**, indiquez les informations suivantes :

   a. L'endpoint vers lequel envoyer les logs, commençant par `https://`. Exemple pour Elasticsearch : `https://<your_account>.us-central1.gcp.cloud.es.io`.

   b. Le nom de l'index de destination dans lequel vous souhaitez envoyer les logs.

   c. Facultativement, sélectionnez la rotation de l'index, selon la fréquence de création d'un nouvel index : `No Rotation`, `Every Hour`, `Every Day`, `Every Week` ou `Every Month`. La valeur par défaut est `No Rotation`.

8. Dans la section **Configure Authentication**, indiquez le nom d'utilisateur et le mot de passe de votre compte Elasticsearch.
9. Cliquez sur **Save**.

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

<div class="alert alert-info">La redirection des logs vers Microsoft Sentinel est en préversion.</div>

6. Saisissez un nom pour la destination.
7. L'authentification pour le Microsoft Sentinel Forwarder nécessite la configuration d'un enregistrement d'application via l'intégration Azure de Datadog.
8. Dans la section **Configure Destination**, saisissez les informations suivantes :
  | Paramètre                   | Description                                                                                                          | Exemple                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Logs Ingestion Endpoint** | Indiquez l'endpoint sur le Data Collection Endpoint (DCE) où les logs sont envoyés. Cet élément est indiqué comme « Logs Ingestion » sur la page d'aperçu du DCE. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com` |
| **Immutable ID** | Indiquez l'ID immuable de la Data Collection Rule (DCR) où sont définies les routes de journalisation, tel qu'il apparaît sur la page d'aperçu de la DCR sous « Immutable Id ». **Remarque** : assurez-vous que le rôle Monitoring Metrics Publisher est attribué dans les paramètres IAM de la DCR. | `dcr-000a00a000a00000a000000aa000a0aa` |
| **Stream Declaration Name** | Indiquez le nom de la Stream Declaration cible figurant dans le JSON de la ressource de la DCR sous `streamDeclarations`. | `Custom-MyTable` |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /fr/logs/explorer/search_syntax/