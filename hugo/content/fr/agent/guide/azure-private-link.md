---
description: Configurez Azure Private Link pour envoyer des données de télémétrie
  à Datadog de manière sécurisée sans utiliser l'Internet public, y compris la configuration
  des endpoints et du DNS.
title: Connectez-vous à Datadog via Azure Private Link
---
[Azure Private Link][1] vous permet d'envoyer des données de télémétrie à Datadog sans utiliser l'Internet public.

Datadog expose certains de ses services d'ingestion en tant que [services Azure Private Link][2].

Vous pouvez configurer Azure Private Link pour exposer une adresse IP privée pour chaque service d'ingestion Datadog ; cette adresse IP achemine le trafic vers le backend Datadog. Vous pouvez ensuite configurer une [zone DNS privée][3] Azure pour remplacer les noms DNS correspondant aux produits pour chaque endpoint utilisé.

## Configuration {#setup}

### Connectez un endpoint {#connect-an-endpoint}

1. Dans le portail Azure, accédez à {{< ui >}}Private Link{{< /ui >}}.
2. Dans le menu de navigation de gauche, sélectionnez {{< ui >}}Private endpoints{{< /ui >}}.
3. Sélectionnez {{< ui >}}Create{{< /ui >}}.
4. Sur la page {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Basics{{< /ui >}}, configurez les éléments suivants :
   - Sous {{< ui >}}Project details{{< /ui >}}, sélectionnez le {{< ui >}}Subscription{{< /ui >}} et le {{< ui >}}Resource group{{< /ui >}} à partir desquels les ressources de production doivent accéder à Private Link.
   - Sous {{< ui >}}Instance details{{< /ui >}}, saisissez un {{< ui >}}Name{{< /ui >}} (par exemple, `datadog-api-private-link`) et sélectionnez votre {{< ui >}}Region{{< /ui >}}.

   Sélectionnez {{< ui >}}Next: Resource{{< /ui >}} pour continuer.
5. Sur la page {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Resource{{< /ui >}}, configurez les éléments suivants :
   - Pour {{< ui >}}Connection method{{< /ui >}}, sélectionnez {{< ui >}}Connect to an Azure resource by resource ID or alias{{< /ui >}}.
   - Pour {{< ui >}}Resource ID or alias{{< /ui >}}, saisissez le nom du service Private Link qui correspond au service d'ingestion Datadog que vous souhaitez utiliser. Vous pouvez trouver ce nom de service dans le [tableau des services publiés](#published-services).
   - Facultativement, pour {{< ui >}}Request message{{< /ui >}}, vous pouvez saisir votre adresse e-mail (associée à un compte Datadog). Cela aide Datadog à identifier votre demande et à vous contacter si nécessaire.

   Sélectionnez {{< ui >}}Next: Virtual Network{{< /ui >}} pour continuer.
6. Sur la page {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Virtual Network{{< /ui >}}, configurez les éléments suivants :
   - Sous {{< ui >}}Networking{{< /ui >}}, sélectionnez le {{< ui >}}Virtual network{{< /ui >}} et le {{< ui >}}Subnet{{< /ui >}} où l'endpoint doit résider. En général, il est situé dans le même réseau que les ressources de calcul qui doivent accéder à l'endpoint privé.
   - Sous {{< ui >}}Private DNS integration{{< /ui >}}, sélectionnez {{< ui >}}No{{< /ui >}}.

   Sélectionnez {{< ui >}}Next: Tags{{< /ui >}} pour continuer.
7. Sur la page {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Tags{{< /ui >}}, vous pouvez éventuellement définir des tags. Sélectionnez {{< ui >}}Next{{< /ui >}}.
8. Sur la page {{< ui >}}Review + create{{< /ui >}}, passez en revue vos paramètres de configuration. Ensuite, sélectionnez {{< ui >}}Create{{< /ui >}}.
9. Une fois votre endpoint privé créé, recherchez-le dans la liste. Prenez note de la {{< ui >}}Private IP{{< /ui >}} de cet endpoint, car elle est utilisée dans la section suivante. Le champ Connection Status doit indiquer Pending.
10. Ensuite, l'approbation de Datadog est nécessaire et manuelle. Contactez le support Datadog et demandez l'approbation de votre endpoint de liaison privée, en incluant le nom de votre endpoint.
11. Une fois que le support Datadog a confirmé que l'endpoint est créé, vérifiez qu'il fonctionne parfaitement. Dans le portail Azure, accédez à {{< ui >}}Home{{< /ui >}} > {{< ui >}}Private Endpoints{{< /ui >}}. Cliquez sur le nom de l'endpoint et vérifiez que Connection Status indique {{< ui >}}Approved{{< /ui >}}. 
12. Accédez à {{< ui >}}Monitoring{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}. Vérifiez que les métriques `Bytes In` et `Bytes Out` ne valent pas zéro. Ces métriques doivent également être capturées par l'intégration Datadog Azure en tant que `azure.network_privateendpoints.pe_bytes_[in/out]`.

### Créer une zone DNS privée {#create-a-private-dns-zone}
1. Dans le portail Azure, accédez à {{< ui >}}Private DNS zones{{< /ui >}}.
2. Sélectionnez {{< ui >}}Create{{< /ui >}}.
3. Sur la page {{< ui >}}Create Private DNS zone{{< /ui >}} > {{< ui >}}Basics{{< /ui >}}, configurez les éléments suivants :
   - Sous {{< ui >}}Project details{{< /ui >}}, sélectionnez le {{< ui >}}Subscription{{< /ui >}} et le {{< ui >}}Resource group{{< /ui >}} à partir desquels les ressources de production doivent accéder à l'endpoint privé.
   - Sous {{< ui >}}Instance details{{< /ui >}}, pour {{< ui >}}Name{{< /ui >}}, saisissez le _nom DNS privé_ qui correspond au service d'ingestion Datadog que vous souhaitez utiliser. Vous pouvez trouver ce nom de service dans le [tableau des services publiés](#published-services).

   Sélectionnez {{< ui >}}Review create{{< /ui >}}.
4. Vérifiez vos paramètres de configuration. Ensuite, sélectionnez {{< ui >}}Create{{< /ui >}}.
5. Une fois la zone DNS privée créée, sélectionnez-la dans la liste.
6. Dans le panneau qui s'ouvre, sélectionnez {{< ui >}}\+ Record set{{< /ui >}}.
7. Dans le panneau {{< ui >}}Add record set{{< /ui >}}, configurez les éléments suivants :
   - Pour {{< ui >}}Name{{< /ui >}}, saisissez `@`.
   - Pour {{< ui >}}Type{{< /ui >}}, sélectionnez {{< ui >}}A - Address record{{< /ui >}}.
   - Pour {{< ui >}}IP address{{< /ui >}}, saisissez l'adresse IP que vous avez notée à la fin de la section précédente.

   Sélectionnez {{< ui >}}OK{{< /ui >}} pour terminer.
### Étapes supplémentaires requises pour les métriques et les traces {#additional-required-steps-for-metrics-and-traces}
Deux services d'ingestion Datadog sont des sous-domaines du `agent.`{{< region-param key="dd_site" code="true" >}} domaine. Pour cette raison, la zone DNS privée est légèrement différente des autres services d'ingestion.

Créez une zone DNS privée pour `agent.`{{< region-param key="dd_site" code="true" >}}, comme indiqué dans la section ci-dessus. Ajoutez ensuite les trois enregistrements ci-dessous.

| Nom DNS | Type d'enregistrement de ressource | Adresse IPv4 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | Adresse IP pour votre endpoint de métriques |
| `*`      | A                    | Adresse IP pour votre endpoint de métriques |
| `trace`  | A                    | Adresse IP pour votre endpoint de traces |

**Remarque** : Cette zone nécessite un enregistrement générique (`*`) qui pointe vers l'adresse IP de votre endpoint de métriques. C'est parce que les agents Datadog envoient la télémétrie en utilisant un endpoint versionné sous la forme (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}).


## Services publiés {#published-services}

| Service d'ingestion Datadog | Nom du service Private Link | Nom DNS privé |
| --- | --- | --- |
| Logs (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| Logs (Collecteur OTel avec exportateur Datadog) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| Logs (Ingestion HTTP utilisateur) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| Métriques | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Containers  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| Processus | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| Profilage | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| Traces | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Remote Configuration | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone