---
aliases: []
categories:
  - cloud
  - oracle
  - log collection
dependencies: []
description: Permet d'envoyer des logs personnalisés et des logs de services depuis Oracle Cloud Infrastructure vers Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/oracle_cloud_infrastructure/'
draft: false
further_reading: []
git_integration_title: oracle_cloud_infrastructure
has_logo: true
integration_title: Oracle Cloud Infrastructure
is_public: true
kind: integration
manifest_version: '1.0'
name: oracle_cloud_infrastructure
public_title: Intégration Oracle Cloud Infrastructure/Datadog
short_description: Collectez et surveillez des logs depuis Oracle Cloud.
type: ''
version: '1.0'
---
## Présentation

Oracle Cloud Infrastructure (OCI) est une infrastructure en tant que service (IaaS) et une plateforme en tant que service (PaaS) utilisée par les plus grandes entreprises. Celle-ci inclut un ensemble complet de services gérés pour l'hébergement, le stockage, la mise en réseau, les bases de données, et bien plus encore.

Grâce à notre nouvelle intégration, les utilisateurs d'OCI peuvent transmettre directement l'ensemble de leurs logs vers Datadog, où ils peuvent alors être stockés indéfiniment, analysés à des fins de dépannage, et surveillés à des fins de sécurité et de conformité.

## Configuration

### Collecte de logs

Pour envoyer des logs depuis Oracle Cloud Infrastructure vers Datadog, suivez l'une des méthodes ci-dessous :

{{< tabs >}}


{{% tab "Service Connector Hub" %}}

1. Configurez un log OCI.
3. Créez une fonction OCI.
4. Configurez un Service Connector OCI.

Les instructions ci-dessous utilisent le portail OCI pour configurer l'intégration.

#### Journalisation OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Logging -> Log Groups*.
2. Cliquez sur **Create Log Group** pour être redirigé vers la page **Create Custom log**.
3. Sélectionnez votre **Compartment name**. Cette sélection restera inchangée tout au long de l'installation.
4. Saisissez "data_log_group" dans le champ **Name**, puis entrez la **Description** de votre choix.
5. Cliquez sur **Create** pour configurer votre nouveau groupe de logs.
6. Accédez à *Solutions and Platform -> Logging -> Logs*.
7. Cliquez sur **Enable Service Log**.
8. Sous **Select Resource**, sélectionnez votre **Compartment**, le **Service** depuis lequel vous souhaitez collecter des logs, et une **Resource** appartenant à ce service.
9. Sous **Configure Log**, sélectionnez "Write Access Events" comme **Log Category**, puis saisissez le nom de votre choix dans le champ **Name**.
10. Cliquez sur **Enable Log** pour créer un nouveau log OCI.

Pour en savoir plus sur les logs OCI, consultez la [documentation Oracle sur les logs][1].

#### Fonction OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Developer Services -> Functions.*
2. Sélectionnez une application existante ou cliquez sur **Create Application**.
3. Créez une nouvelle fonction OCI au sein de votre application. Consultez la [documentation Oracle sur les fonctions][2] pour en savoir plus.
4. Il est conseillé de commencer par créer une fonction Python réutilisable et de remplacer les fichiers générés automatiquement par le code source de Datadog :
   - Remplacez `func.py` par le code se trouvant dans le [référentiel OCI de Datadog][3].
   - Remplacez `func.yaml` par le code se trouvant dans le [référentiel OCI de Datadog][4]. Remplacez `DATADOG_TOKEN` et `DATADOG_HOST` par votre clé d'API Datadog et le lien d'admission des logs pour votre région.
   - Remplacez `requirements.txt` par le code se trouvant dans le [référentiel OCI de Datadog][5].


#### Service Connector Hub OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Logging -> Service Connectors*.
2. Cliquez sur **Create Connector** pour être redirigé vers la page **Edit Service Connector**.
3. Sélectionnez Logging dans le champ **Source** et Functions dans le champ **Target**.
4. Sous **Configure Source Connection**, sélectionnez un **Compartment name**, un **Log Group**, et un **Log**. Le **Log Group** et le **Log** sont ceux créés au cours de la première étape.
5. Si vous souhaitez également envoyer des **Audit Logs**, cliquez sur **+Another Log** et sélectionnez le même **Compartment**, mais choisissez "_Audit" comme **Log Group**.
6. Sous **Configure Target Condition**, sélectionnez un **Compartment name**, une **Function Application**, et une **Function**. La **Function Application** et la **Function** sont celles créées lors de l'étape précédente.
7. Si vous êtes invité à créer une stratégie, cliquez sur **Create**.
8. Cliquez sur **Save Changes** pour terminer la création de votre Service Connector.

Pour en savoir plus sur le stockage d'objets OCI, consultez la [documentation Oracle sur les Service Connectors][6].


[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
[3]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt
[6]: https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available
{{% /tab %}}


{{% tab "Object Store" %}}

1. Configurez un log OCI.
2. Créez un stockage d'objets OCI et autorisez l'accès en lecture/écriture pour les logs OCI.
3. Créez une fonction OCI.
4. Configurez un événement OCI.

Les instructions ci-dessous utilisent le portail OCI pour configurer l'intégration.

#### Journalisation OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Logging -> Logs*.
2. Cliquez sur **Create Custom Log** pour être redirigé vers la page **Create Custom Log**.
3. Nommez votre nouveau log OCI.
4. Sélectionnez un **Compartment** et un **Log Group**. Ces sélections resteront inchangées tout au long de l'installation.
5. Cliquez sur **Create Custom Log** pour être redirigé vers la page **Create Agent Config**.
6. Cliquez sur **Create new configuration**.
7. Nommez votre nouvelle configuration. Votre compartiment est déjà sélectionné.
8. Définissez le type de groupe sur **Dynamic Group** et définissez le groupe sur l'un de vos groupes existants.
9. Définissez le type d'entrée sur **Log Path**, indiquez le nom d'entrée de votre choix et utilisez "/" pour les chemins d'accès des fichiers.
10. Après avoir cliqué sur **Create Custom Log**, votre log OCI est créé et devient disponible sur la page des logs.

Pour en savoir plus sur les logs OCI, consultez la [documentation Oracle sur les logs][1].

#### Stockage d'objets OCI

1. Depuis le portail OCI, accédez à *Core Infrastructure -> Object Storage -> Object Storage*.
2. Cliquez sur **Create Bucket** pour être redirigé vers le formulaire **Create Bucket**.
3. Définissez le niveau de stockage sur **Standard**, puis cochez **Emit Object Events**.
4. Complétez le reste du formulaire selon vos préférences.
5. Après avoir cliqué sur **Create Bucket**, votre compartiment est créé et devient disponible dans la liste des compartiments.
6. Sélectionnez votre nouveau compartiment dans la liste des compartiments actifs et cliquez sur **Logs** dans la section Resources.
7. Activez l'option **Read** pour accéder au menu latéral **Enable Log**.
8. Sélectionnez le même **Compartment** et le même **Log Group** que pour votre log OCI.
9. Saisissez un nom via le champ **Log Name**, puis sélectionnez la rétention des logs de votre choix.

Pour en savoir plus sur le stockage d'objets OCI, consultez la [documentation Oracle sur le Stockage d'objets][2].

#### Fonction OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Developer Services -> Functions.*
2. Sélectionnez une application existante ou cliquez sur **Create Application**.
3. Créez une nouvelle fonction OCI au sein de votre application. Consultez la [documentation Oracle sur les fonctions][3] pour en savoir plus.
4. Il est conseillé de commencer par créer une fonction Python réutilisable et de remplacer les fichiers générés automatiquement par le code source de Datadog :
   - Remplacez `func.py` par le code se trouvant dans le [référentiel OCI de Datadog][4].
   - Remplacez `func.yaml` par le code se trouvant dans le [référentiel OCI de Datadog][5]. Remplacez `DATADOG_TOKEN` et `DATADOG_HOST` par votre clé d'API Datadog et le lien d'admission des logs pour votre région.
   - Remplacez `requirements.txt` par le code se trouvant dans le [référentiel OCI de Datadog][6].


#### Événement OCI

1. Depuis le portail OCI, accédez à *Solutions and Platform -> Application Integration -> Event Service*.
2. Cliquez sur **Create Rule** pour être redirigé vers la page **Create Rule**.
3. Saisissez un nom et une description pour la règle de votre événement.
4. Définissez la condition sur **Event Type**, le nom de service sur **Object Storage**, et le type d'événement sur **Object - Create**.
5. Définissez votre type d'action sur **Functions**.
6. Assurez-vous que le compartiment de votre fonction correspond à celui que vous avez sélectionné pour le log OCI, le compartiment OCI et la fonction OCI.
7. Sélectionnez l'application et la fonction selon l'étape d'installation précédente.
8. Après avoir cliqué sur **Create Rule**, votre règle est créée et devient disponible dans la liste des règles.

Pour en savoir plus sur les événements OCI, consultez la [documentation Oracle sur les événements][7].


[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/en-us/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab %}}

{{< /tabs >}}