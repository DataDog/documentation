---
description: Configurer Azure Private Link pour envoyer des données de télémétrie
  à Datadog de manière sécurisée sans passer par l'Internet public, y compris la configuration
  des endpoints et du DNS.
title: Connexion à Datadog via Azure Private Link
---

[Azure Private Link][1] vous permet d'envoyer des données de télémétrie à Datadog sans passer par l'Internet public.

Datadog expose certains de ses services d'ingestion de données en tant que [services Azure Private Link][2].

Vous pouvez configurer Azure Private Link pour exposer une adresse IP privée pour chaque service d'ingestion Datadog. Cette adresse IP achemine le trafic vers le backend Datadog. Vous pouvez ensuite configurer une [zone DNS privée][3] Azure pour remplacer les noms DNS correspondant aux produits pour chaque endpoint consommé.

## Configuration

### Connecter un endpoint

1. Dans le portail Azure, accédez à **Private Link**.
2. Dans le menu de navigation de gauche, sélectionnez **Private endpoints**.
3. Sélectionnez **Create**.
4. Sur la page **Create a private endpoint** > **Basics**, configurez les éléments suivants :
   - Sous **Project details**, sélectionnez la **Subscription** et le **Resource group** à partir desquels les ressources de production doivent accéder à Private Link.
   - Sous **Instance details**, saisissez un **Name** (par exemple, `datadog-api-private-link`) et sélectionnez votre **Region**.

   Sélectionnez **Next: Resource** pour continuer.
5. Sur la page **Create a private endpoint** > **Resource**, configurez les éléments suivants :
   - Pour **Connection method**, sélectionnez **Connect to an Azure resource by resource ID or alias**.
   - Pour **Resource ID or alias**, saisissez le nom du service Private Link correspondant au service d'ingestion Datadog que vous souhaitez utiliser. Vous trouverez ce nom de service dans le [tableau des services publiés](#services-publies).
   - Facultatif : pour **Request message**, vous pouvez saisir votre adresse e-mail (associée à un compte Datadog). Cela permet à Datadog d'identifier votre demande et de vous contacter si nécessaire.

   Sélectionnez **Next: Virtual Network** pour continuer.
6. Sur la page **Create a private endpoint** > **Virtual Network**, configurez les éléments suivants :
   - Sous **Networking**, sélectionnez le **Virtual network** et le **Subnet** où le endpoint doit résider. Généralement, il se trouve dans le même réseau que les ressources de calcul qui doivent accéder au endpoint privé.
   - Sous **Private DNS integration**, sélectionnez **No**.

   Sélectionnez **Next: Tags** pour continuer.
7. Sur la page **Create a private endpoint** > **Tags**, vous pouvez éventuellement définir des tags. Sélectionnez **Next**.
8. Sur la page **Review + create**, vérifiez vos paramètres de configuration. Ensuite, sélectionnez **Create**.
9. Une fois votre endpoint privé créé, retrouvez-le dans la liste. Notez l'**IP privée** de ce endpoint, car elle sera utilisée dans la section suivante. Le champ Connection Status doit indiquer Pending.
10. Ensuite, l'approbation de Datadog est nécessaire et manuelle. Contactez l'assistance Datadog et demandez l'approbation de votre endpoint Private Link en incluant le nom de votre endpoint.
11. Une fois que l'assistance Datadog a confirmé la création du endpoint, vérifiez qu'il fonctionne correctement. Dans le portail Azure, accédez à **Home > Private Endpoints**. Cliquez sur le nom du endpoint et confirmez que le champ Connection Status affiche **Approved**.
12. Accédez à **Monitoring > Metrics**. Confirmez que les métriques `Bytes In` et `Bytes Out` sont non nulles. Ces métriques doivent également être capturées par l'intégration Azure Datadog sous la forme `azure.network_privateendpoints.pe_bytes_[in/out]`.

### Créer une zone DNS privée
1. Dans le portail Azure, accédez à **Private DNS zones**.
2. Sélectionnez **Create**.
3. Sur la page **Create Private DNS zone** > **Basics**, configurez les éléments suivants :
   - Sous **Project details**, sélectionnez la **Subscription** et le **Resource group** à partir desquels les ressources de production doivent accéder au endpoint privé.
   - Sous **Instance details**, pour **Name**, saisissez le _nom DNS privé_ correspondant au service d'ingestion Datadog que vous souhaitez utiliser. Vous trouverez ce nom de service dans le [tableau des services publiés](#services-publies).

   Sélectionnez **Review create**.
4. Vérifiez vos paramètres de configuration. Ensuite, sélectionnez **Create**.
5. Une fois la zone DNS privée créée, sélectionnez-la dans la liste.
6. Dans le panneau qui s'ouvre, sélectionnez **+ Record set**.
7. Dans le panneau **Add record set**, configurez les éléments suivants :
   - Pour **Name**, saisissez `*`.
   - Pour **Type**, sélectionnez **A - Address record**.
   - Pour **IP address**, saisissez l'adresse IP que vous avez notée à la fin de la section précédente.

   Sélectionnez **OK** pour terminer.
### Étapes supplémentaires requises pour les métriques et les traces
Deux services d'ingestion Datadog sont des sous-domaines du domaine `agent.`{{< region-param key="dd_site" code="true" >}}. Pour cette raison, la zone DNS privée est légèrement différente des autres services d'ingestion.

Créez une zone DNS privée pour `agent.`{{< region-param key="dd_site" code="true" >}}, comme indiqué dans la section ci-dessus. Ajoutez ensuite les trois enregistrements ci-dessous.

| Nom DNS | Type d'enregistrement de ressource | Adresse IPv4 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | Adresse IP de votre endpoint de métriques |
| `*`      | A                    | Adresse IP de votre endpoint de métriques |
| `trace`  | A                    | Adresse IP de votre endpoint de traces |

**Remarque** : cette zone nécessite un enregistrement générique (`*`) pointant vers l'adresse IP de votre endpoint de métriques. Cela est dû au fait que les Agents Datadog envoient des données de télémétrie en utilisant un endpoint versionné sous la forme (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}).


## Services publiés

| Service d'ingestion Datadog | Nom du service Private Link | Nom du DNS privé |
| --- | --- | --- |
| Logs (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| Logs (collecteur OTel avec exportateur Datadog) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| Logs (ingestion HTTP utilisateur) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| Métriques | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Conteneurs  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| Processus | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| Profiling | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| Traces | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Configuration à distance | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone