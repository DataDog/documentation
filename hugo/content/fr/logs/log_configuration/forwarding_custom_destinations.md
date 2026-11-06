---
further_reading:
- link: https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/
  tag: Blog
  text: Transférez les logs vers des systèmes tiers avec Datadog Log Forwarding
- link: /logs/log_collection
  tag: Documentation
  text: Commencez à collecter vos logs
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Découvrez les pipelines de logs
- link: /observability_pipelines/
  tag: Documentation
  text: Transférez les logs directement depuis votre environnement avec Observability
    Pipelines
- link: https://www.datadoghq.com/blog/microsoft-sentinel-logs/
  tag: Blog
  text: Traitez et gérez vos logs de manière centralisée dans Datadog avant de les
    envoyer à Microsoft Sentinel
- link: /security/events_forwarding
  tag: Documentation
  text: Transférez les signaux de sécurité, les spans et d'autres types d'événements
    vers des destinations personnalisées
title: Transfert de logs vers des destinations personnalisées
---
## Présentation {#overview}

Le transfert de logs vous permet d'envoyer des logs depuis Datadog vers des destinations personnalisées telles que Splunk, Elasticsearch et des endpoints HTTP. Cela signifie que vous pouvez utiliser [Log Pipelines][1] pour collecter, traiter et normaliser vos logs de manière centralisée dans Datadog. Ensuite, envoyez les logs depuis Datadog vers d'autres outils pour soutenir les workflows des différentes équipes. Vous pouvez choisir de transférer n'importe quel log ingéré, qu'il soit indexé ou non, vers des destinations personnalisées. Les logs sont transférés au format JSON et compressés avec GZIP par défaut.

**Remarque** : seuls les utilisateurs Datadog disposant de l'autorisation [`logs_write_forwarding_rules`][2] peuvent [créer][6], [modifier][7] et [supprimer][8] des destinations personnalisées pour le transfert de logs.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="La page de transfert de logs, avec les destinations personnalisées mises en évidence. La liste des destinations inclut Splunk (filtré par service:logs-processing), HTTP Endpoint (filtré par source:okta OR source:paloalto) et Elasticsearch (filtré par team:acme env:prod)." >}}

Si une tentative de transfert échoue (par exemple, si votre destination devient temporairement indisponible), Datadog effectue des tentatives périodiques pendant 2 heures en utilisant une stratégie de délai d'attente (backoff) exponentiel. La première tentative est effectuée après un délai d'une minute. Pour les tentatives ultérieures, le délai augmente progressivement jusqu'à un maximum de 8 à 12 minutes (10 minutes avec une variance de 20 %).

Les métriques suivantes rendent compte des logs qui ont été transférés avec succès, y compris les logs envoyés avec succès après des tentatives, ainsi que les logs qui ont été abandonnés.

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## Configurez le transfert de logs vers des destinations personnalisées {#set-up-log-forwarding-to-custom-destinations}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'envoi de logs vers une destination personnalisée se fait en dehors de l'environnement Datadog GovCloud, qui échappe au contrôle de Datadog. Datadog ne saurait être tenu responsable des logs ayant quitté l'environnement Datadog GovCloud, y compris, sans limitation, toute obligation ou exigence que l'utilisateur pourrait avoir concernant FedRAMP, les niveaux d'impact DoD, l'ITAR, la conformité à l'exportation, la résidence des données ou des réglementations similaires applicables à ces logs.
<br><br>
En raison des protocoles de sécurité pour le {{< region-param key="dd_datacenter" >}} site, seuls les ports 443 et 8088 sont ouverts pour le transfert de logs. Pour utiliser un port différent, contactez <a href="https://www.datadoghq.com/support/">Datadog Support</a>.</div>
{{< /site-region >}}

1. Ajoutez les adresses IP du webhook depuis le {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} à la liste d'autorisation.
1. Accédez à [Log Archiving & Forwarding][4].
3. Sélectionnez {{< ui >}}Custom Destinations{{< /ui >}}.
4. Cliquez sur {{< ui >}}New Destination{{< /ui >}}.
5. Saisissez la requête pour filtrer vos logs à transférer. Consultez [Search Syntax][5] pour plus d'informations.
6. Sélectionnez {{< ui >}}Destination Type{{< /ui >}}.

{{< img src="logs/log_configuration/forwarding/log-forwarding-gzip-opt-out.png" alt="La page de configuration de la destination, montrant les étapes pour configurer une nouvelle destination." style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

7. Saisissez un nom pour la destination.
8. Dans le champ {{< ui >}}Define endpoint{{< /ui >}}, saisissez l'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`.
    - Par exemple, si vous souhaitez envoyer des logs à Sumo Logic, suivez la [documentation de l'entreprise relative à la configuration d'une source HTTP pour les logs et les métriques][1] pour obtenir l'URL de l'adresse source HTTP afin d'envoyer des données à leur collecteur. Saisissez l'URL de l'adresse source HTTP dans le champ {{< ui >}}Define endpoint{{< /ui >}}.
9. (Facultatif) Désactivez la compression GZIP si votre endpoint HTTP ne prend pas en charge les charges utiles compressées.
10. Dans la section {{< ui >}}Configure Authentication{{< /ui >}}, sélectionnez l'un des types d'authentification suivants et fournissez les détails pertinents :
  | Type d'authentification      | Description                                                                                                              | Exemple                                                             |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| {{< ui >}}Basic Authentication{{< /ui >}} | Fournissez le nom d'utilisateur et le mot de passe du compte vers lequel vous souhaitez envoyer les logs.                                        | Nom d'utilisateur : `myaccount`<br>Mot de passe : `mypassword`                       |
| {{< ui >}}Request Header{{< /ui >}}       | Fournissez le nom et la valeur de l'en-tête. Exemple pour Authorization : <br>- Saisissez `Authorization` pour {{< ui >}}Header Name{{< /ui >}}.<br>- Utilisez une valeur d'en-tête formatée comme `Basic username:password`, encodée en base64. | Nom de l'en-tête : `Authorization`<br>Valeur de l'en-tête : `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` |

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

7. Saisissez un nom pour la destination.
8. Dans la section {{< ui >}}Configure Destination{{< /ui >}}, saisissez l'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`. Par exemple, saisissez `https://<your_account>.splunkcloud.com:8088`.  
    **Remarque** : `/services/collector/event` est automatiquement ajouté à l'endpoint.
9. Dans la section {{< ui >}}Configure Authentication{{< /ui >}}, saisissez le jeton Splunk HEC. Consultez [Set up and use HTTP Event Collector][1] pour plus d'informations sur le jeton Splunk HEC.  
    **Remarque** : L'[accusé de réception de l'indexeur][2] doit être désactivé.
10. (Facultatif) Dans la section {{< ui >}}Configure Sourcetype{{< /ui >}}, spécifiez le type de source Splunk à attribuer aux événements transférés. Consultez [Why Sourcetype matters][3] pour plus d'informations sur le type de source Splunk. S'il n'est pas défini, le type de source par défaut `_json` est utilisé. Pour envoyer des événements sans aucun type de source, sélectionnez **Envoyer sans type de source**.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
[3]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/10.4/configure-source-types/why-source-types-matter
{{% /tab %}}

{{% tab "Elasticsearch" %}}

7. Saisissez un nom pour la destination.
8. Dans la section {{< ui >}}Configure Destination{{< /ui >}}, saisissez les détails suivants :
  | Paramètre                        | Description                                                                                                  | Exemple                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------|
| {{< ui >}}Endpoint{{< /ui >}}                   | Saisissez l'endpoint vers lequel vous souhaitez envoyer les logs. L'endpoint doit commencer par `https://`.               | `https://<your_account>.us-central1.gcp.cloud.es.io` (Elasticsearch) |
| {{< ui >}}Destination Index Name{{< /ui >}}     | Indiquez le nom de l'index de destination vers lequel vous souhaitez envoyer les logs.                                   | `your_index_name`                        |
| {{< ui >}}Index Rotation{{< /ui >}}             | Sélectionnez éventuellement la fréquence de création d'un nouvel index : `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, `Every Month`. La valeur par défaut est `No Rotation`. | `Every Day`                              |
9. Dans la section {{< ui >}}Configure Authentication{{< /ui >}}, saisissez le nom d'utilisateur et le mot de passe de votre compte Elasticsearch.

{{% /tab %}}

{{% tab "Microsoft Sentinel" %}}

7. Saisissez un nom pour la destination.
8. L'authentification pour le Microsoft Sentinel Forwarder nécessite une inscription d'application configurée via l'intégration Azure de Datadog. Si vous disposez déjà d'une inscription d'application pour l'intégration Azure, vous pouvez la réutiliser au lieu d'en créer une nouvelle.
9. Dans la section {{< ui >}}Configure Destination{{< /ui >}}, saisissez les détails suivants :
  | Paramètre                   | Description                                                                                                          | Exemple                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | Saisissez l'endpoint sur le Data Collection Endpoint (DCE) vers lequel les logs sont envoyés. Ceci est étiqueté « Logs Ingestion » sur la page de présentation du DCE. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | Spécifiez l'ID immuable de la règle de collecte de données (DCR) où les routes de journalisation sont définies, tel qu'indiqué sur la page de présentation de la DCR sous « Immutable Id ».  **Remarque** : Assurez-vous que le rôle Éditeur de métriques de surveillance est attribué dans les paramètres IAM de la DCR. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| Indiquez le nom de la déclaration de flux cible trouvée dans le JSON de ressource de la DCR sous `streamDeclarations`.  | `Custom-MyTable`                                          |

{{% /tab %}}

{{% tab "Google SecOps (Chronicle)" %}}

7. Saisissez un nom pour la destination.
8. L'authentification pour le Google Chronicle Forwarder nécessite l'utilisation d'un compte de service GCP avec un accès en écriture à Chronicle.
9. Dans la section {{< ui >}}Configure Destination{{< /ui >}}, saisissez les détails suivants :
  | Paramètre                   | Description                                                                                                          | Exemple                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Customer ID{{< /ui >}} | L'ID client Chronicle fourni par Google. | `abcd1234`   |
| {{< ui >}}Regional Endpoint{{< /ui >}}           | L'URL de l'endpoint de l'API d'ingestion Chronicle basée sur votre région.  **Remarque** : Assurez-vous que le rôle Éditeur de métriques de surveillance est attribué dans les paramètres IAM de la DCR. | `https://us.chronicle.googleapis.com`              |
| {{< ui >}}Namespace{{< /ui >}}| L'espace de noms dans lequel vos logs Chronicle doivent être ingérés.  | `default`                                          |

10. Dans la section {{< ui >}}Configure authentication settings{{< /ui >}}, saisissez les détails suivants :
  | Paramètre                   | Description                                                                                                          | Exemple                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Project ID{{< /ui >}}| L'ID du projet GCP associé à l'instance Chronicle.  | `my-gcp-chronicle-project`                                          |
| {{< ui >}}Private Key ID{{< /ui >}}| L'ID de la clé privée provenant des informations d'identification de votre compte de service.  | `0123456789abcdef`                                          |
| {{< ui >}}Private Key{{< /ui >}}| La clé privée provenant des informations d'identification de votre compte de service.  | `-----BEGIN PRIVATE KEY-----\nMIIE...`                                          |
| {{< ui >}}Client Email{{< /ui >}}| L'adresse e-mail du compte de service.  | `chronicle-writer@my-gcp-chronicle-project.iam.gserviceaccount.com`                                          |
| {{< ui >}}Client ID{{< /ui >}}| L'ID client des informations d'identification de votre compte de service. | `123456789012345678901`                                          |

{{% /tab %}}

{{< /tabs >}}

10. Dans la section {{< ui >}}Select Tags to Forward{{< /ui >}} :
    1. Sélectionnez si vous souhaitez inclure {{< ui >}}All tags{{< /ui >}}, {{< ui >}}No tags{{< /ui >}} ou {{< ui >}}Specific Tags{{< /ui >}}.
    1. Sélectionnez si vous souhaitez {{< ui >}}Include{{< /ui >}} ou {{< ui >}}Exclude specific tags{{< /ui >}}, et spécifiez les tags à inclure ou à exclure.
11. Cliquez sur {{< ui >}}Save{{< /ui >}}.


Sur la page [Log Forwarding][4], survolez le statut d'une destination pour voir le pourcentage de logs qui ont correspondu aux critères de filtrage et qui ont été transférés au cours de la dernière heure.

## Modifier une destination {#edit-a-destination}
1. Accédez à [Log Forwarding][4].
2. Sélectionnez {{< ui >}}Custom Destinations{{< /ui >}} pour afficher la liste de toutes les destinations existantes.
3. Cliquez sur le bouton {{< ui >}}Edit{{< /ui >}} pour la destination que vous souhaitez modifier.
4. Effectuez les modifications sur la page de configuration.
5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Supprimer une destination {#delete-a-destination}
1. Accédez à [Log Forwarding][4].
2. Sélectionnez {{< ui >}}Custom Destinations{{< /ui >}} pour afficher la liste de toutes les destinations existantes.
3. Cliquez sur le bouton {{< ui >}}Delete{{< /ui >}} pour la destination que vous souhaitez supprimer, et cliquez sur {{< ui >}}Confirm{{< /ui >}}. Cela supprime la destination de la liste des destinations configurées et les logs ne lui sont plus transférés.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/pipelines/
[2]: /fr/account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /fr/logs/explorer/search_syntax/
[6]: /fr/logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /fr/logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /fr/logs/log_configuration/forwarding_custom_destinations#delete-a-destination
[9]: /fr/security/events_forwarding/