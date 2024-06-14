---
aliases:
- /fr/guides/chef/
categories:
- configuration & deployment
- provisioning
- log collection
ddtype: crawler
dependencies: []
description: 'Surveillez les exécutions du client Chef : soyez informé en cas d''échec,
  de réussite ou de changement majeur.'
doc_link: https://docs.datadoghq.com/integrations/chef/
draft: false
git_integration_title: chef
has_logo: true
integration_id: chef
integration_title: Chef
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: chef
public_title: Intégration Datadog/Chef
short_description: 'Surveillez les exécutions du client Chef : soyez informé en cas
  d''échec, de réussite ou de changement majeur.'
version: '1.0'
---

{{< img src="integrations/chef/chefdashboard.png" alt="Événement Chef" popup="true">}}

## Présentation

Chef est un outil de gestion de configurations plébiscité écrit en Ruby et en Erlang.

Il est extrêmement simple de déployer Datadog avec Chef. Cela vous permet d'exploiter facilement la surveillance de l'ensemble de votre infrastructure.

Datadog propose également un [gestionnaire de rapports et d'exécution][1] Chef capable d'enregistrer les échecs `chef-client` ainsi que des métriques relatives à l'exécution de Chef, portant notamment sur des délais et des mises à jour de ressources.

## Configuration

### Déployer l'Agent

Le [cookbook Chef pour Datadog][2] vous permet d'automatiser l'installation et la configuration de votre Agent Datadog.

Installez la dernière version du cookbook Chef pour Datadog depuis le [Supermarket][2] avec knife, et importez-la sur votre serveur Chef :

```text
knife cookbook site install datadog
knife cookbook upload datadog
```

Suivez ensuite les instructions de votre outil pour importer le cookbook sur votre serveur Chef.

Avant d'ajouter la recette du cookbook sur le `run_list` de votre nœud, vous devez spécifier les identifiants de votre compte Datadog, tels que les clés d'API, par l'intermédiaire des attributs Chef.

Pour ce faire, il est recommandé de modifier les fichiers `role` ou `environment`, ou tout autre cookbook déclarant les attributs.

Voici un exemple de fichier de rôle `base.rb` qui est généralement appliqué à chaque host d'une organisation.

```ruby
name 'base'
description 'rôle de base, s'exécute sur chaque nœud'
run_list(
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "INSÉRER_VOTRE_CLÉ_API_ICI",
    'application_key' => "INSÉRER_VOTRE_CLÉ_APPLICATION_ICI"
  }
)
```

**Remarque** : vous devez spécifier deux clés distinctes, à savoir votre [clé d'API][3] Datadog et votre [clé d'application][4].

Indiquez ces deux clés dans les attributs, comme illustré ci-dessus.

Importez ensuite votre fichier de rôle sur le serveur Chef, avec la commande ci-dessous :

```text
knife role from file roles/base.rb
```

Lors de sa prochaine exécution, Chef installera l'Agent et définira le fichier de configuration à partir des clés d'API et d'application.

**REMARQUE :** si vous utilisez un autre cookbook pour définir ces attributs, utilisez un niveau de précédence d'attribut supérieur à `default`.

### Gestionnaire de rapports

Datadog propose un gestionnaire de rapports Chef qui transmet à Datadog les métriques et événements découlant de vos exécutions de Chef. Une fois installé, le gestionnaire de rapports envoie des métriques sur les délais d'exécution et les modifications de ressources Chef. Des événements sont également créés dans le but de surveiller les taux de réussite et d'échec des exécutions de Chef.

Cela vous permet de bénéficier des résultats d'une exécution de Chef directement dans votre flux d'événements Datadog. Vous pouvez ainsi identifier plus facilement les échecs, en discuter avec votre équipe et les résoudre.

Les réussites sont associées à la priorité « Low », tandis que les échecs correspondent aux événements de priorité « Normal ». Lorsque l'exécution de Chef fonctionne pour un nœud alors qu'elle avait auparavant échoué, sa priorité redevient « Low ».

Comme l'illustre ce snippet de rôle, il est très simple d'ajouter le gestionnaire :

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'datadog::dd-handler',
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "<CLÉ_API_DATADOG>",
    'application_key' => "<CLÉ_APPLICATION_DATADOG>"
  }
)
```

 Dans cet exemple, la recette `datadog::dd-handler` a été ajoutée au début de la run list du nœud. Cela permet au gestionnaire d'enregistrer tout ce qu'il y observe après avoir été invoqué. Si vous l'ajoutez à la fin de la `run_list` et qu'un élément échoue avant son exécution, il se peut que vous ne receviez pas l'intégralité du résultat.

Une fois défini, importez le rôle sur votre serveur Chef, puis patientez. Après l'exécution de Chef sur plusieurs hosts, un nouveau dashboard automatique est créé à partir des métriques Chef pertinentes. Il se trouve dans votre [Dashboards List][5], sur la droite de votre écran.

### Envoyer des métriques Chef à Datadog

1. Si vous utilisez Berkshelf, ajoutez le cookbook à votre Berksfile :

    ```text
    cookbook 'datadog'
    ```

   Si ce n'est pas le cas, installez le cookbook dans votre référentiel à l'aide de knife :

    ```text
    knife cookbook site install datadog
    ```

2. Définissez les attributs spécifiques à Datadog dans une recette de rôle, d'environnement ou d'une autre nature :

    ```conf
    # Make sure you replace the API and application key below
    # with the ones for your account

    node.default['datadog']['<API_KEY>'] = "<DATADOG_API_KEY>"

    # Use an existing application key or create a new one for Chef
    node.default['datadog']['<APPLICATION_KEY>] ="<DATADOG_APP_KEY>"
    ```

3. Importez le cookbook mis à jour sur votre serveur Chef.

    ```bash
    berks upload
    # or
    knife cookbook upload datadog

    knife cookbook list | grep datadog && \
    echo -e "\033[0;32mdatadog cookbook - OK\033[0m" || \
    echo -e "\033[0;31mmissing datadog cookbook - OK\033[0m"
    ```

    Le cookbook peut être appliqué à vos nœuds.

4. Une fois téléchargé, ajoutez-le au rôle ou à la run_list de votre nœud :

    ```conf
    "run_list": [
      "recipe[datadog::dd-handler]"
    ]
    ```

5. Patientez jusqu'à la prochaine exécution programmée de chef-client.

### Collecte de logs

La collecte de logs est disponible à partir de la version 6.0 de l'Agent. Consultez le fichier [attributes/default.rb][6] pour l'activer. Pour en savoir plus, consultez l'[exemple de configuration](#personnalisations) ci-dessous.

### Validation

Depuis votre [flux d'événements][7], saisissez `sources:chef` dans la barre de recherche. Cela affiche vos exécutions de Chef.

## Données collectées

### Métriques

{{< get-metrics-from-git >}}

## Pour aller plus loin

### Personnalisations

Le cookbook Chef pour Datadog fournit des recettes supplémentaires pour certaines intégrations.

Ajoutez l'une de ces recettes à votre run list pour installer les dépendances de surveillance, comme les modules Python requis pour surveiller un service, et pour générer le bon fichier de configuration.

Voici un exemple de modification du fichier de rôle `webserver.rb` permettant de surveiller automatiquement Apache avec Datadog :

```ruby
name 'webserver'
description 'Rôle Webserver, exécute apache'
run_list(
  'apache2',
  'datadog::apache',
)
default_attributes(
  'apache' => {
    'ext_status' => true,
  }
  'datadog' => {
    'apache' => {
      'instances' => [
        { 'status_url' => 'http://localhost:8080/server-status/',
          'tags' => ['extra_tag', 'env:example'] }
      ],
      'logs' => [
        { 'type' => 'file',
          'path' => '/var/log/apache2/access.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] },
        { 'type' => 'file',
          'path' => '/var/log/apache2/error.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] }
      ]
    }
  }
)
```

Dans cet exemple, la recette `datadog::apache` a été ajoutée à la run list, ainsi que des attributs permettant de contrôler la liste des instances Apache surveillées par Datadog.

Lisez chaque fichier de recette pour déterminer précisément les valeurs d'intégration à transmettre à la partie `instances` des attributs.

[1]: https://docs.chef.io/handlers.html
[2]: https://supermarket.chef.io/cookbooks/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://github.com/DataDog/chef-datadog/blob/v2.15.0/attributes/default.rb#L383-L388
[7]: https://app.datadoghq.com/event/stream