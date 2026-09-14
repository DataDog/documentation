---
aliases:
- /fr/agent/guide/datadog-disaster-recovery/
further_reading:
- link: agent/remote_config/?tab=configurationyamlfile
  tag: Documentation
  text: Remote Configuration
- link: /getting_started/site/
  tag: Documentation
  text: Débuter avec les sites Datadog
- link: https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/
  tag: Blog
  text: Datadog Disaster Recovery atténue les pannes des fournisseurs de cloud
site_support_id: datadog_disaster_recovery
title: Datadog Disaster Recovery
---
## Présentation {#overview}

Datadog Disaster Recovery (DDR) vous assure une continuité de l'observabilité lors d'événements susceptibles d'affecter une région de fournisseur de services cloud ou les services Datadog s'exécutant au sein d'une région de fournisseur cloud. Grâce à DDR, vous pouvez rétablir l'observabilité en direct sur un site Datadog alternatif et fonctionnel, ce qui vous permet d'atteindre vos objectifs critiques de disponibilité de l'observabilité.

DDR vous permet également de mener périodiquement des exercices de reprise après sinistre pour non seulement tester votre capacité à vous remettre d'événements de panne, mais aussi pour répondre à vos besoins métiers et de conformité réglementaire.

## Prérequis {#prerequisites}
La version minimale de l'Agent Datadog dont vous avez besoin dépend des types de télémétrie que vous devez utiliser :

|Télémétrie prise en charge |Produits pris en charge          |Version de l'Agent requise | 
|--------------------|----------------------------|-----------------------|
|Logs                |Logs                        | v7.54+                |
|Métriques             |Infrastructure Monitoring   | v7.54+                |
|Traces              |APM                         | v7.68+                |



<div class="alert alert-info">
Datadog évalue en permanence les demandes des clients pour prendre en charge DDR pour d'autres produits. Contactez l'équipe <a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery</a> pour en savoir plus sur les fonctionnalités à venir et sur vos besoins spécifiques s'ils ne sont pas couverts ci-dessus.
</div>
<br>

## Configuration {#setup}

Pour activer Datadog Disaster Recovery, suivez ces étapes. Si vous avez des questions sur l'une des étapes, contactez votre [Customer Success Manager][14] ou le [support Datadog][15].

### 1. Créez une organisation DDR et liez-la à votre organisation principale {#1-create-a-ddr-org-and-link-it-to-your-primary-org}

{{% collapse-content title="Créez et partagez votre organisation DDR" level="h4" %}}

<div class="alert alert-info">Si nécessaire, Datadog peut configurer cela pour vous.</div>

#### Créez votre organisation DDR {#create-your-ddr-org}

1. Accédez à [Get Started with Datadog][16]. Vous devrez peut-être vous déconnecter de votre session actuelle ou utiliser le mode navigation privée pour accéder à cette page.
2. Choisissez un site Datadog différent de votre site principal (par exemple, si vous êtes sur `US1`, choisissez `EU` ou `US5`).
3. Suivez les instructions pour créer un compte.

Tous les sites Datadog sont séparés géographiquement. Consultez la [liste des sites Datadog][17] pour connaître les options.

Si vous envoyez également de la télémétrie à Datadog en utilisant des intégrations de fournisseur cloud, vous devez ajouter vos comptes de fournisseur cloud dans l'organisation DDR. Datadog n'utilise pas les fournisseurs cloud pour recevoir des données de télémétrie lorsque le site DDR est passif (pas en basculement).

#### Partagez les informations de l'organisation DDR avec Datadog {#share-the-ddr-org-information-with-datadog}

Envoyez par e-mail le nom de votre nouvelle organisation à votre [Customer Success Manager][14]. Ensuite, votre Customer Success Manager définit cette nouvelle organisation comme votre organisation DDR.

{{% /collapse-content %}}

{{% collapse-content title="Récupérez les identifiants publics et liez votre organisation DDR à votre organisation principale." level="h4" %}}

Pour des raisons de sécurité, Datadog n'est pas en mesure de lier les organisations pour vous.

Une fois que l'équipe Datadog a configuré votre organisation DDR, utilisez le [endpoint d'API public][1] Datadog pour récupérer les identifiants publics de l'organisation principale et de l'organisation DDR.

Pour lier votre organisation DDR à votre organisation principale :

- Ajoutez la portée `disaster_recovery_status_write` à votre clé d'application dans l'organisation principale.
- Exécutez les commandes suivantes en remplaçant les espaces réservés par les valeurs appropriées.

```shell
export PRIMARY_DD_API_KEY=<PRIMARY_ORG_API_KEY>
export PRIMARY_DD_APP_KEY=<PRIMARY_ORG_APP_KEY>
export PRIMARY_DD_API_URL=<PRIMARY_ORG_API_SITE>

export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
export USER_EMAIL=<USER_EMAIL>
export CONNECTION='{"data":{"id":"'${PRIMARY_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${DDR_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'", "IsPrimary":true}}}'

curl -v -H "Content-Type: application/json" -H \
"dd-api-key:${PRIMARY_DD_API_KEY}" -H \
"dd-application-key:${PRIMARY_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${PRIMARY_DD_API_URL}/api/v2/hamr
```

Après avoir lié vos organisations, seule l'organisation de basculement affiche cette bannière:

{{< img src="agent/guide/ddr/ddr-banner.png" alt="La bannière DDR dans l'organisation DDR" >}}

{{% /collapse-content %}}

### 2. Configurez l'accès, les intégrations, la synchronisation et les agents {#2-set-up-access-integrations-syncing-and-agents}

{{% collapse-content title="Configurez l'authentification unique (SSO) pour l'organisation DDR" level="h4" %}}

**Datadog recommande d'utiliser l'authentification unique (SSO)** pour permettre à tous vos utilisateurs de se connecter à votre organisation de reprise après sinistre en cas de panne.

Accédez aux [Organization Settings][2] de votre organisation DDR pour configurer [SAML][3] ou {{< ui >}}Google Login{{< /ui >}} pour vos utilisateurs.

La synchronisation gérée réplique les comptes utilisateur de votre organisation principale vers votre organisation DDR. Datadog recommande de configurer [Just-in-Time provisioning with SAML][4] afin que les utilisateurs puissent accéder à l'organisation DDR pendant un basculement sans avoir besoin de réinitialiser leur mot de passe.

{{% /collapse-content %}}

{{% collapse-content title="Configurez vos intégrations cloud (AWS, Azure, Google Cloud)" level="h4" %}}

Consultez les intégrations [AWS][5], [Azure][6] et [Google Cloud][7] pour connaître les étapes de configuration:

Vos intégrations cloud doivent être configurées à la fois dans l'organisation principale et dans l'organisation DDR, mais elles ne s'exécutent que dans une seule organisation à la fois : par défaut dans l'organisation principale, et dans l'organisation DDR pendant le basculement.

Pour plus d'informations, consultez la section [Cloud integrations failover](#id-for-cloud).

{{% /collapse-content %}}

{{% collapse-content title="Configurez les identifiants pour la synchronisation des ressources gérées" level="h4" id="syncing-data" %}}

Datadog gère la synchronisation des ressources pour vous en utilisant l'outil open source [datadog-sync-cli][8]. Vous n'avez pas besoin d'exécuter ou d'utiliser cet outil vous-même.

La synchronisation gérée réplique les ressources de votre organisation principale vers votre organisation DDR selon un planning régulier. Les ressources répliquées incluent les dashboards, les monitors, les utilisateurs, les notebooks et [34+ other resource types][9]. La réplication s'exécute selon ce calendrier afin que votre organisation DDR reste à jour avant une panne.

**Les utilisateurs sont assignés à chaque site Datadog.** La synchronisation gérée réplique les comptes utilisateur vers votre organisation DDR. Cependant, les utilisateurs peuvent avoir besoin de réinitialiser leur mot de passe lors de leur première connexion à l'organisation DDR. Datadog recommande de configurer [Just-in-Time provisioning with SAML][4] afin que les utilisateurs puissent accéder à l'organisation DDR sans réinitialisation manuelle du mot de passe.

**La synchronisation gérée utilise un [compte de service][10] Datadog.** Lors de l'intégration, créez un compte de service dans votre organisation DDR pour lire et répliquer les ressources depuis votre organisation principale. Les ressources synchronisées par la synchronisation gérée sont provisionnées par un utilisateur associé à leur propriétaire d'origine lorsque cela est possible.

{{% /collapse-content %}}

{{% collapse-content title="Activer Remote Configuration [**RECOMMANDÉ]" level="h4" %}}

[Remote Configuration (RC)][11] vous permet de configurer et de modifier à distance le comportement des Agents Datadog déployés dans votre infrastructure.

Remote Configuration est activée par défaut pour les nouvelles organisations, y compris votre organisation DDR. Toutes les nouvelles clés d'API que vous créez sont compatibles avec la RC pour une utilisation avec votre Agent. Pour plus de détails, consultez la [documentation sur Remote Configuration][11].

Datadog recommande vivement d'utiliser Remote Configuration pour un meilleur contrôle du basculement. Comme alternative au RC, vous pouvez configurer manuellement vos Agents ou utiliser des outils de gestion de configuration tels que Puppet, Ansible ou Chef.

{{% /collapse-content %}}

{{% collapse-content title="Dupliquez l'envoi de la télémétrie vers votre organisation DDR lors d'un basculement ou d'exercices." level="h4" %}}


Pour activer l'envoi en double, Datadog recommande d'utiliser [Fleet Automation][12] pour une gestion à grande échelle. Alternativement, vous pouvez la configurer manuellement en modifiant votre fichier `datadog.yaml`.

Contactez votre [Customer Success Manager] de Datadog pour planifier des créneaux dédiés aux tests de basculement afin de mesurer les performances et l'objectif de temps de récupération (RTO).

{{< tabs >}}
{{% tab "Utilisation de Fleet Automation (recommandée)" %}}

Depuis la page [Fleet Automation][100] de votre organisation de basculement, sous l'onglet {{< ui >}}Configure Agents{{< /ui >}}, vous pouvez créer une politique de basculement ou en réutiliser une existante, et l'appliquer à votre parc d'Agents. Peu après l'activation de la politique, les Agents commencent à envoyer la télémétrie en double vers les sites d'observabilité de l'organisation principale et de l'organisation DDR (basculement).

Pour créer une politique de basculement, cliquez sur {{< ui >}}Create Failover Policy{{< /ui >}}.

{{< img src="/agent/guide/ddr/ddr-fa-policy.png" alt="Gérer les politiques DDR" style="width:80%;" >}}

Ensuite, suivez les instructions pour définir le périmètre des hôtes et de la télémétrie (métriques, logs, traces) que vous devez faire basculer.

{{< img src="/agent/guide/ddr/ddr-fa-policy-scope.png" alt="Définir le périmètre des hôtes et de la télémétrie à faire basculer" style="width:80%;" >}}

<div class="alert alert-danger">Les intégrations Cloud ne peuvent s'exécuter que dans votre site Datadog principal ou DDR, mais pas les deux en même temps ; par conséquent, leur basculement interrompt les données d'intégration Cloud dans votre site principal. <strong>Pendant un basculement d'intégration, les intégrations s'exécutent uniquement dans le centre de données DDR.</strong> Lorsque le basculement n'est plus actif, désactivez la politique de basculement pour rétablir la collecte des données d'intégration vers l'organisation principale.</div>

[100]: https://app.datadoghq.com/fleet

{{% /tab %}}

{{% tab "Installation manuelle" %}}

Pendant un basculement ou des exercices de basculement, mettez à jour le fichier de configuration `datadog.yaml` de votre Agent Datadog comme indiqué dans l'exemple ci-dessous et redémarrez l'Agent.

- `enabled: true` permet à l'Agent d'envoyer {{< tooltip text="metadata" tooltip="Données sur l'Agent et le host d'infrastructure. Par exemple, `host name`, `host tags`, `Agent version`." >}} vers le site Datadog DDR afin que vous puissiez voir les Agents et vos hôtes d'infrastructure dans l'organisation DDR. Cela vous permet de voir vos Agents et vos hôtes d'infrastructure dans l'organisation de basculement.

- `failover_metrics`, `failover_logs` et `failover_apm` sont `false` par défaut. Définir ces paramètres sur `true` fait démarrer l'envoi par l'Agent {{< tooltip text="telemetry" tooltip="Données envoyées à la plateforme Datadog. Par exemple, `logs`, `metrics`, `traces`." >}} vers l'organisation DDR.

```shell
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_apm: false
  site: <DDR_SITE>  # For example "site: us5.datadoghq.com" for a US5 site
  api_key: <DDR_SITE_API_KEY>
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configurer le basculement basé sur le DNS" level="h4" %}}

Le basculement basé sur le DNS est une approche complémentaire au basculement basé sur l'Agent. Au lieu de configurer les Agents avec un endpoint de site secondaire, vous configurez toutes vos sources de données pour envoyer la télémétrie vers une URL d'ingestion personnalisée unique fournie par Datadog. Lors d'un événement de basculement, Datadog met à jour l'enregistrement DNS de cette URL pour rediriger le trafic de votre site principal vers votre site DDR.

<div class="alert alert-info">Le basculement basé sur le DNS est tout ou rien. Toutes les sources de télémétrie utilisant votre endpoint personnalisé basculent simultanément.</div>

#### Recevez votre endpoint DNS personnalisé {#receive-your-custom-dns-endpoint}

Si vous choisissez d'utiliser le basculement basé sur le DNS, Datadog provisionne une URL d'ingestion personnalisée pour votre organisation (par exemple, `<your-org>.intake.datadoghq.com`). Configurez toutes vos sources de données (Agents, expéditeurs de logs et instrumentation personnalisée) pour envoyer la télémétrie vers ce endpoint au lieu de l'URL d'ingestion Datadog par défaut. Il s'agit d'une modification de configuration ponctuelle.

#### Déclenchez le basculement basé sur le DNS {#trigger-a-dns-failover}

Pour initier un basculement basé sur le DNS, contactez Datadog via votre [Customer Success Manager][14] ou [Datadog Support][15]. Datadog met à jour l'enregistrement DNS pour rediriger le trafic de votre site principal vers votre site DDR. L'objectif de temps de récupération (RTO) visé, mesuré à partir du déclenchement du basculement, est de 2 heures.

<div class="alert alert-info">Un moyen contrôlé par le client pour déclencher le basculement DNS directement depuis l'organisation DDR est en préversion. Contactez votre <a href="mailto:success@datadoghq.com">Customer Success Manager</a> pour en savoir plus.</div>

{{% /collapse-content %}}

### 3. Exécutez des tests de basculement dans divers environnements {#3-run-failover-tests-in-various-environments}

{{% collapse-content title="Activez et testez le basculement DDR dans les environnements basés sur l'Agent" level="h4" %}}

Pour déclencher un basculement de vos Agents, vous pouvez cliquer sur l'une des politiques dans [Fleet Automation][13] au sein de votre organisation DDR, puis cliquer sur {{< ui >}}Enable{{< /ui >}}. Le statut de chaque host se met à jour au fur et à mesure que le basculement se produit.

{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="Activez la politique de basculement dans l'organisation DDR" style="width:80%;" >}}

Utilisez les étapes appropriées à votre environnement pour activer/tester le basculement DDR.

{{< tabs >}}
{{% tab "Agent dans des environnements non conteneurisés" %}}

Pour les déploiements d'Agent dans des environnements non conteneurisés, utilisez les commandes CLI de l'Agent ci-dessous :

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_apm true
```

{{% /tab %}}

{{% tab "Agent dans des environnements conteneurisés" %}}

Si vous exécutez l'Agent dans un environnement conteneurisé comme Kubernetes, vous pouvez toujours utiliser l'outil de ligne de commande de l'Agent, mais vous devez l'invoquer sur le conteneur exécutant l'Agent. Vous pouvez effectuer des modifications en utilisant l'une des options suivantes, selon vos besoins :

- [kubectl](#using-kubectl)
- [Fichier de configuration de l'Agent (`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm chart ou Datadog Operator](#using-the-helm-chart-or-datadog-operator)

##### Utilisation de kubectl {#using-kubectl}

Vous trouverez ci-dessous un exemple d'utilisation de `kubectl` pour effectuer un basculement des métriques et des logs pour un pod Datadog Agent déployé avec le Helm chart officiel ou Datadog Operator. Le `<POD_NAME>` doit être remplacé par le nom du pod de l'Agent :

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```

##### Utilisation du fichier de configuration de l'Agent {#using-the-agent-configuration-file}

Alternativement, vous pouvez spécifier les paramètres ci-dessous dans le fichier de configuration principal de l'Agent (`datadog.yaml`) et redémarrer l'Agent Datadog pour que les modifications soient appliquées :

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_apm: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```

##### Utilisation du Helm chart ou de Datadog Operator {#using-the-helm-chart-or-datadog-operator}

Vous pouvez effectuer des modifications similaires avec le Helm chart officiel ou Datadog Operator si vous devez spécifier une configuration personnalisée. Sinon, vous pouvez transmettre les paramètres sous forme de variables d'environnement :

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_APM=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Activer et tester le basculement DDR dans les intégrations cloud" level="h4" id="id-for-cloud" %}}

Vous pouvez tester le basculement de vos intégrations cloud depuis la page d'accueil de votre organisation DDR.

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="Activez la politique de basculement dans l'organisation DDR" style="width:80%;" >}}

Sur la page d'accueil du basculement, vous pouvez vérifier le statut de votre organisation DDR ou cliquer sur {{< ui >}}Fail over your integrations{{< /ui >}} pour tester le basculement de votre intégration cloud.

Lorsque le basculement n'est plus actif, **désactivez la politique de basculement** dans l'organisation DDR pour que la collecte des données d'intégration revienne à l'organisation principale.

Pendant les tests, la télémétrie d'intégration est répartie sur les deux organisations. Si vous annulez un test de basculement, les intégrations reviennent à fonctionner dans le centre de données principal.

{{% /collapse-content %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/organizations/#list-your-managed-organizations
[2]: https://app.datadoghq.com/organization-settings/users
[3]: /fr/account_management/saml/#overview
[4]: /fr/account_management/saml/#just-in-time-jit-provisioning
[5]: /fr/integrations/amazon-web-services/
[6]: /fr/integrations/azure/
[7]: /fr/integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#overview
[8]: https://github.com/DataDog/datadog-sync-cli
[9]: https://github.com/DataDog/datadog-sync-cli#supported-resources
[10]: /fr/account_management/org_settings/service_accounts/
[11]: /fr/agent/remote_config/?tab=configurationyamlfile
[12]: /fr/agent/fleet_automation/#overview
[13]: https://app.datadoghq.com/fleet
[14]: mailto:success@datadoghq.com
[15]: https://www.datadoghq.com/support/
[16]: https://app.datadoghq.com/signup
[17]: /fr/getting_started/site#access-the-datadog-site