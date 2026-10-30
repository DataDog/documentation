---
description: Transférez les événements d'audit de Datadog vers des destinations personnalisées
  telles que Splunk, Elasticsearch et des endpoints HTTP pour la conformité et la
  surveillance de la sécurité.
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: Documentation
  text: En savoir plus sur Audit Trail
title: Transfert d'événements d'audit vers des destinations personnalisées
---
## Présentation {#overview}

Audit Event Forwarding vous permet d'envoyer des événements d'audit depuis Datadog vers des destinations personnalisées telles que Splunk, Elasticsearch et des endpoints HTTP. Les événements d'audit sont transférés au format JSON. Vous pouvez ajouter jusqu'à trois destinations pour chaque organisation Datadog.

Audit Trail inclut le transfert de 500 millions d'événements d'audit par mois au maximum pour chaque organisation. L'utilisation au-delà de cette limite peut être soumise à une facturation supplémentaire.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="La section Custom Destinations affichant une destination active Login-Event-to-SIEM avec un volume estimé d'événements d'audit de 10.4 MB au cours des dernières 24 heures et @action:login comme requête de filtrage." >}}

**Remarque** : seuls les utilisateurs Datadog disposant de l'autorisation `audit_trail_write` peuvent créer, modifier ou supprimer des destinations personnalisées pour le transfert d'événements d'audit.

## Configurer le transfert d'événements d'audit vers des destinations personnalisées {#set-up-audit-event-forwarding-to-custom-destinations}

1. Ajoutez les adresses IP du webhook de la [liste des plages IP][1] à la liste d'autorisation si nécessaire.
2. Accédez à [Audit Trail Settings][2].
3. Cliquez sur {{< ui >}}Add Destination{{< /ui >}} dans la section {{< ui >}}Audit Event Forwarding{{< /ui >}}.
4. Saisissez la requête pour filtrer vos événements d'audit à transférer. Par exemple, ajoutez `@action:login` comme requête de filtrage si vous souhaitez uniquement transférer les événements de connexion vers votre SIEM ou votre destination personnalisée. Consultez [Search Syntax][3] pour plus d'informations.
5. Sélectionnez le {{< ui >}}Destination Type{{< /ui >}}.

{{< tabs >}}
{{% tab "HTTP" %}}

6. Saisissez un nom pour la destination.
7. Dans le champ {{< ui >}}Define endpoint{{< /ui >}}, saisissez l'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`.
    - Par exemple, si vous souhaitez envoyer des logs à Sumo Logic, suivez la [documentation de l'entreprise relative à la configuration d'une source HTTP pour les logs et les métriques][1] pour obtenir l'URL de l'adresse source HTTP afin d'envoyer des données à leur collecteur. Saisissez l'URL de l'adresse source HTTP dans le champ {{< ui >}}Define endpoint{{< /ui >}}.
8. Dans la section {{< ui >}}Configure Authentication{{< /ui >}}, sélectionnez l'un des types d'authentification suivants et fournissez les détails pertinents :
    - Basic Authentication : fournissez le nom d'utilisateur et le mot de passe du compte vers lequel vous souhaitez envoyer les logs.
    - Request Header : fournissez le nom et la valeur de l'en-tête. Par exemple, si vous utilisez l'en-tête Authorization et que le nom d'utilisateur du compte vers lequel vous souhaitez envoyer les logs est `myaccount` et que le mot de passe est `mypassword` :
        - Saisissez `Authorization` pour {{< ui >}}Header Name{{< /ui >}}.
        - La valeur de l'en-tête est au format `Basic username:password`, où `username:password` est encodé en base64. Pour cet exemple, la valeur de l'en-tête est `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`. 
  9. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. Saisissez un nom pour la destination.
7. Dans la section {{< ui >}}Configure Destination{{< /ui >}}, saisissez l'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`. Par exemple, saisissez `https://<your_account>.splunkcloud.com:8088`. **Remarque** : `/services/collector/event` est automatiquement ajouté à l'endpoint.
8. Dans la section {{< ui >}}Configure Authentication{{< /ui >}}, saisissez le jeton Splunk HEC. Consultez [Set up and use HTTP Event Collector][1] pour plus d'informations sur le jeton Splunk HEC.
9. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque** : L'[accusé de réception de l'indexeur][2] doit être désactivé.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. Saisissez un nom pour la destination.
7. Dans la section {{< ui >}}Configure Destination{{< /ui >}}, saisissez les détails suivants :
   1. L'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`. Un exemple d'endpoint pour Elasticsearch : `https://<your_account>.us-central1.gcp.cloud.es.io`.
   1. Le nom de l'index de destination vers lequel vous souhaitez envoyer les logs.   
   1. Si vous le souhaitez, sélectionnez la rotation des index pour définir la fréquence à laquelle vous souhaitez créer un nouvel index : `No Rotation`, `Every Hour`, `Every Day`, `Every Week` ou `Every Month`. La valeur par défaut est `No Rotation`.
8. Dans la section {{< ui >}}Configure Authentication{{< /ui >}}, saisissez le nom d'utilisateur et le mot de passe de votre compte Elasticsearch.
9. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

<div class="alert alert-info">Le transfert de logs vers Microsoft Sentinel est en Preview.</div>

6. Saisissez un nom pour la destination.
7. L'authentification de Microsoft Sentinel Forwarder nécessite de configurer une App Registration via Datadog Azure Integration.
8. Dans la section {{< ui >}}Configure Destination{{< /ui >}}, saisissez les détails suivants :
  | Paramètre                   | Description                                                                                                          | Exemple                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | Saisissez l'endpoint sur le Data Collection Endpoint (DCE) vers lequel les logs sont envoyés. Ceci est étiqueté « Logs Ingestion » sur la page de présentation du DCE. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | Spécifiez l'ID immuable de la règle de collecte de données (DCR) où les routes de journalisation sont définies, tel qu'indiqué sur la page de présentation de la DCR sous « Immutable Id ».  **Remarque** : Assurez-vous que le rôle Éditeur de métriques de surveillance est attribué dans les paramètres IAM de la DCR. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| Indiquez le nom de la déclaration de flux cible trouvée dans le JSON de ressource de la DCR sous `streamDeclarations`.  | `Custom-MyTable`                                          |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /fr/logs/explorer/search_syntax/