---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: Documentation
  text: En savoir plus sur le journal d'audit
title: Transmettre des événements d'audit à des destinations personnalisées
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
La fonctionnalité de transmission des événements d'audit n'est pas disponible pour le site US1-FED.
</div>
{{% /site-region %}}

{{% site-region region="US,US3,US5,EU,AP1" %}}
<div class="alert alert-warning">La fonctionnalité de transmission des événements d'audit est disponible en version bêta. </div>
{{% /site-region %}}

## Présentation

La fonctionnalité de transmission d'événements d'audit vous permet d'envoyer les événements d'audit de Datadog à des destinations personnalisées, telles que des endpoints Splunk, Elasticsearch et HTTP. Ces événements d'audit sont envoyés au format JSON, et vous pouvez ajouter jusqu'à trois destinations pour chaque organisation Datadog.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="La section « Custom Destinations » affichant une destination Login-Event-to-SIEM active, avec un volume d'événements d'audit estimé à 10,4 Mo au cours des dernières 24 heures et le filtre de requête @action:login." >}}

**Remarque** : seuls les utilisateurs Datadog disposant de l'autorisation `audit_trail_write` peuvent créer, modifier ou supprimer des destinations personnalisées pour la transmission d'événements d'audit.

## Configurer la transmission d'événements d'audit à des destinations personnalisées

1. Ajoutez à la liste d'autorisation des IP de webhook figurant dans la [liste des plages d'IP][1], au besoin.
2. Accédez à [Audit Trail Settings][2].
3. Cliquez sur **Add Destination** dans la section **Audit Event Forwarding**.
4. Saisissez la requête qui servira à filtrer vos événements d'audit à transmettre. Ajoutez par exemple `@action:login` comme requête à filtrer si vous souhaitez uniquement transmettre des événements de connexion à votre SIEM ou à votre destination personnalisée. Consultez la section [Syntaxe de recherche][3] pour en savoir plus.
5. Sélectionnez l'option **Destination Type**.

{{< tabs >}}
{{% tab "HTTP" %}}

6. Attribuez un nom à la destination.
7. Dans le champ **Define endpoint**, saisissez l'endpoint vers lequel vous souhaitez envoyer les logs. Cet endpoint doit commencer par `https://`.
    - À titre d'exemple, si vous souhaitez envoyer des logs à Sumo Logic, suivez la [documentation de l'entreprise relative à la configuration d'une source HTTP pour les logs et les métriques][1] pour récupérer l'URL de l'adresse source HTTP et ainsi envoyer les données à son collector. Saisissez l'URL de l'adresse source HTTP dans le champ **Define endpoint**.
8. Dans la section **Configure Authentication**, sélectionnez l'un des types d'authentification suivants et fournissez les informations pertinentes suivantes :
    - Authentification basique : spécifiez le nom d'utilisateur et le mot de passe du compte vers lequel vous souhaitez envoyer les logs.
    - En-tête de la requête : spécifiez le nom de l'en-tête et la valeur associée. À titre d'exemple, si vous utilisez l'en-tête Authorization et que le nom d'utilisateur ainsi que le mot de passe du compte vers lequel vous souhaitez envoyer les logs sont respectivement `myaccount` et `mypassword`, procédez comme suit :
        - Saisissez  `Authorization` pour **Header Name**.
        - La valeur de l'en-tête est au format `Basic username:password`, avec `username:password` encodé en base64. Pour cet exemple, nous prenons comme valeur d'en-tête Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`. 
  9. Cliquez sur **Save**.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. Attribuez un nom à la destination.
7. Dans la section **Configure Destination**, saisissez l'endpoint vers lequel vous souhaitez envoyer les logs. Cet endpoint doit commencer par `https://`. Saisissez par exemple `https://<votre_compte>.splunkcloud.com:8088`. **Remarque** : `/services/collector/event` est automatiquement ajouté à l'endpoint.
8. Dans la section **Configure Authentication**, saisissez le token du HEC Splunk. Consultez la section [Configurer et utiliser le HTTP Event Collector][1] pour en savoir plus sur le token du HEC Splunk.
9. Cliquez sur **Save**.

**Remarque** : la [confirmation de l'indexeur (indexer acknowledgment)][2] doit être désactivée.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. Attribuez un nom à la destination.
7. Dans la section **Configure Destination**, saisissez les informations suivantes :

   a. L'endpoint vers lequel vous souhaitez envoyer les logs. Cet endpoint doit commencer par `https://`. Voici un exemple d'endpoint pour Elasticsearch : `https://<votre_compte>.us-central1.gcp.cloud.es.io`.

   b. Le nom de l'index de destination des logs.

   c. Si vous le souhaitez, vous pouvez également définir la rotation de l'index pour choisir la fréquence de création d'un nouvel index. Vous avez le choix entre `No Rotation`, `Every Hour`, `Every Day`, `Every Week` ou `Every Month`. La valeur par défaut est `No Rotation`.

8. Dans la section **Configure Authentication**, saisissez le nom d'utilisateur et le mot de passe de votre compte Elasticsearch.
9. Cliquez sur **Save**.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /fr/logs/explorer/search_syntax/