---
further_reading:
- link: /continuous_integration/explore_pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Configurer le tracing sur un pipeline GitLab
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Compatibilité

Versions de GitLab prises en charge :
* GitLab.com (SaaS)
* GitLab 14.1+ (auto-hébergé)

Autres versions prises en charge avec une configuration supplémentaire :
* GitLab 13.7.0+ (auto-hébergé), en activant le flag de fonctionnalité `datadog_ci_integration`.

## Configurer l'intégration Datadog

{{< tabs >}}
{{% tab "GitLab.com" %}}

Configurez l'intégration sur un [projet][1] ou un [groupe][2] en accédant à **Settings > Integrations > Datadog** pour chaque projet ou groupe que vous souhaitez instrumenter.

[1] : https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2] : https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab >= 14.1+" %}}

Configurez l'intégration sur un [projet][1] ou un [groupe][2] en accédant à **Settings > Integrations > Datadog** pour chaque projet ou groupe que vous souhaitez instrumenter.

Vous pouvez également activer l'intégration au niveau des [instances][3] GitLab en accédant à **Admin > Settings > Integrations > Datadog**.

[1] : https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2] : https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
[3] : https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab < 14.1" %}}

Activez le [flag de fonctionnalité][1] `datadog_ci_integration` pour activer l'intégration. Lancez l'une des commandes suivantes, basées sur l'[exécuteur Rails][2] de GitLab, en fonction de votre type d'installation :

**Installations omnibus**

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Installations depuis les sources**

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Installations Kubernetes**

{{< code-block lang="shell" >}}
kubectl exec -it <nom-pod-exécuteur-tâche> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

Configurez ensuite l'intégration sur un [projet][3] en accédant à **Settings > Integrations > Datadog** pour chaque projet que vous souhaitez instrumenter.

<div class="alert alert-warning"><strong>Remarque</strong> : en raison d'un <a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">bug</a> dans les versions précédentes de GitLab, l'intégration Datadog ne peut pas être activée au niveau <strong>des groupes ou des instances</strong> pour <strong>les versions de GitLab antérieures à la 14.1</strong>, même si l'option est disponible dans l'interface de GitLab</div>

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
[2]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
{{% /tab %}}
{{< /tabs >}}

Remplissez les paramètres de configuration de l'intégration :

**Active**
: permet d'activer l'intégration.

**Datadog site**
: Permet d'indiquer le [site Datadog][1] auquel envoyer les données.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (facultatif)
: permet de remplacer l'URL d'API utilisée pour l'envoi direct des données, utilisé uniquement dans des scénarios avancés.<br/>
**Valeur par défaut** : (vide, sans remplacement)

**API key**
: Permet d'indiquer la clé d'API à utiliser lors de l'envoi des données. Vous pouvez en générer une depuis l'[onglet des API][2] de la section Integrations sur Datadog.

**Service** (facultatif)
: Permet d'indiquer le nom de service à associer à chaque span générée par l'intégration. Utilisez ce paramètre pour différencier les instances GitLab.<br/>
**Valeur par défaut** : `gitlab-ci`

**Env** (facultatif)
: Permet d'indiquer l'environnement (tag `env`) à associer à chaque span générée par l'intégration. Utilisez ce paramètre pour différencier les groupes d'instances GitLab (par exemple : staging ou production).<br/>
**Valeur par défaut** : `none`

**Tags** (facultatif)
:  Permet d'indiquer les tags personnalisés à ajouter à chaque span générée par l'intégration. Fournissez un tag par ligne en respectant le format suivant : `key:value`.<br/>
**Valeur par défaut**: (vide, aucun tag supplémentaire)<br/>
**Remarque** : disponible uniquement sur le site GitLab.com et avec les versions 14.8+ de GitLab auto-hébergées.

Vous pouvez tester l'intégration avec le bouton **Test settings** (disponible uniquement lors de la configuration de l'intégration sur un projet). Une fois le test réussi, cliquez sur **Save changes** pour terminer la configuration de l'intégration.

## Intégration via des webhooks

En guise d'alternative à l'utilisation de l'intégration Datadog native, vous pouvez utiliser des [webhooks][3] pour envoyer des données de pipeline à Datadog.

<div class="alert alert-info"><strong>Remarque</strong> : il est conseillé d'utiliser l'intégration Datadog native, et l'option est en cours de développement actif.</div>

Accédez à **Settings > Webhooks** dans votre référentiel (ou paramètres d'instance GitLab), puis ajoutez un nouveau webhook :

- **URL** : <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code>, où `<API_KEY>` correspond à votre [clé d'API Datadog][2].
- **Secret Token** : laisser vide
- **Trigger** : sélectionnez `Job events` et `Pipeline events`.

Pour définir des paramètres `env` ou `service` personnalisés, ajoutez d'autres paramètres de requête dans l'URL de webhook : `&env=<VOTRE_ENV>&service=<NOM_DU_SERVICE>`

### Définir des tags personnalisés

Pour appliquer des tags personnalisés à l'ensemble des spans de pipeline et de tâche générées par l'intégration, ajoutez à l'**URL** un paramètre de requête `tags` encodé dans l'URL, avec des paires `key:value` séparées par des virgules. Si une paire key:value contient une virgule, placez la paire entre guillemets. Par exemple, pour ajouter `key1:value1,"key2: value with , comma",key3:value3`, vous devez ajouter la chaîne suivante à la fin de l'**URL de webhook** :

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

## Visualiser des données de pipeline dans Datadog

Une fois l'intégration correctement configurée, les pages [Pipelines][4] et [Pipeline Executions][5] commencent à afficher des données après l'exécution des pipelines.

**Remarque** : la page Pipelines affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions