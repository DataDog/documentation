---
further_reading:
- link: /dashboards/widgets
  tag: Documentation
  text: Liste des widgets pour les dashboards
title: Liens de contexte
---

## Présentation

Les dashboards recueillent des données à partir d'une multitude de sources et les affichent sous forme de visualisations.

Vous pouvez joindre des dashboards à des [notifications de monitor][1], les convertir en screenboards pour observer des mesures métiers ou techniques importantes ou encore y faire référence dans des [runbooks][2] afin de fournir davantage de contexte. Les dashboards offrent non seulement un aperçu de l'état actuel de votre plateforme, mais également des fonctions interactives vous permettant de consulter sans attendre vos problèmes et de les analyser en détail sur les pages dédiées.

Dans la vidéo ci-dessous, un utilisateur consulte un dashboard récapitulatif pour une application Web. Cet utilisateur identifie un pic pour une métrique technique, agrandit l'intervalle pertinent pour obtenir plus de détails et accède au dashboard du host sous-jacent pour découvrir les causes potentielles à l'origine de ce problème.

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Démonstration des liens de contexte" video="true" style="width:80%;" >}}

Ce guide présente les **liens de contexte** disponibles dans les dashboards :
1. Fonctionnement des liens et personnalisation en fonction de vos besoins (#fonctionnement-des-liens-de-contexte)
2. Exemples de configuration des liens de contexte pour un scénario précis (#exemples-de-cas-d-utilisation)


## Présentation des liens de contexte

Les liens de contexte permettent de passer des widgets d'un dashboard à d'autres pages Datadog ou à des applications tierces intégrées à vos workflows.

Les utilisateurs disposant d'[autorisations de modification][3] pour les dashboards peuvent configurer les liens disponibles dans la liste de liens.

### Liens de contexte par défaut

 {{< img src="dashboards/guide/context_links/default-links.png" alt="Liens par défaut" style="width:75%;" >}}

Par défaut, le menu d'un widget affiche des liens vers votre host, vos [traces][4] et vos [logs][5], ainsi que vers les sources de données du widget. Par exemple, si votre widget utilise des [données RUM][7], son menu comporte un lien vers le [**RUM Explorer**][6]. Cliquez sur **More Related Data Actions** pour afficher des liens supplémentaires dans le menu déroulant.

Le widget inclut des liens vers les pages suivantes :

| Lien           | Description                                                                           |
|----------------|---------------------------------------------------------------------------------------|
| Hosts          | Liens vers la [hostmap][8] si la série contient plusieurs hosts, ou vers le [dashboard du host][9] si elle ne contient qu'un host|
| Conteneurs     | Liens vers la page [Live Container][10]                                                |
| Processus    | Liens vers la page [Live Process][11]                                                 |
| Traces APM     | Ouvre un volet latéral affichant les traces sous-jacentes redirigeant vers le [Trace Explorer][12]|
| Événements RUM     | Liens vers le [RUM Explorer][13]                                                      |
| Profils       | Liens vers le [Profile Explorer][14] de l'APM                                              |
| Logs           | Ouvre un volet latéral affichant les logs sous-jacents redirigeant vers le [Log Explorer][15]    |

Les liens de contexte incluent, le cas échéant, les éléments suivants :

* Un **filtre** qui combine les filtres du widget avec les éventuelles template variables et, pour les requêtes groupées, avec la série avec laquelle l'utilisateur interagit.
* Un **intervalle**. Pour les widgets Série temporelle et Carte thermique, l'intervalle correspond au compartiment de temps du point de donnée. Pour les autres widgets, il s'agit de l'intervalle global du widget.


### Personnaliser des liens de contexte

Pour tous les [widgets génériques][16], ouvrez l'éditeur pour accéder à la section **Context Links**. Cette dernière vous permet de créer vos propres liens de contexte, de remplacer les liens par défaut et de mettre en avant ou de masquer des liens.

{{< img src="dashboards/guide/context_links/edit-links.png" alt="Modifier des liens" style="width:75%;" >}}

Pour créer des liens personnalisés ou remplacer les liens par défaut, indiquez le nom du lien dans le champ **Label** et son chemin dans le champ **URL**. Vous pouvez vous servir de l'outil d'assistance pour définir la paire key/value du paramètre d'URL.


#### Variables des liens de contexte

{{< img src="dashboards/guide/context_links/custom-link.png" alt="Personnaliser un lien" style="width:75%;" >}}

Vous pouvez utiliser les types de variables suivants pour les liens de contexte :

* Les **variables d'intervalle** `{{timestamp_start}}` et `{{timestamp_end}}`. Ces variables correspondent à l'intervalle du widget. Pour les widgets Série temporelle et Carte thermique, elles correspondent à l'intervalle du compartiment de temps avec lequel l'utilisateur a interagi.
* Les **variables de requête** (`{{@MerchantTier}}` et `{{@MerchantTier.value}}` dans l'exemple ci-dessus). Ces variables peuvent être utilisées pour les widgets comportant des requêtes groupées. Elles identifient le groupe avec lequel l'utilisateur a interagi.
* Les **template variables de dashboard** (`{{$env}}` et `{{$env.value}}` dans l'exemple ci-dessus). Ces variables identifient la valeur actuelle d'une template variable avec laquelle l'utilisateur a interagi.
* **`{{tags}}`**, la combinaison par défaut de toutes les variables ci-dessus.

Pour choisir entre la variable `{{exemple}}` et `{{exemple.value}}`, tenez compte de ce qui suit :

* `{{exemple}}` renvoie la clé suivie de la valeur, par exemple `env:prod`.
* `{{exemple.value}}` renvoie la valeur brute, par exemple `prod`.


Pour cet exemple, lorsque vous cliquez sur **View in Acme**, vous êtes redirigé vers `https://prod.acme.io/search?what=basic&when=1643021787564`.

{{< img src="dashboards/guide/context_links/view-in-acme.png" alt="Personnaliser un lien" style="width:60%;" >}}

Le lien de contexte :

* remplace `{{env.value}}` par `prod` ;
* remplace `{{@MerchantTier.value}}` par `basic` ; et
* remplace `{{timestamp_end}}` par `1643021787564`.


#### Copier/coller des liens de contexte pour amorcer une configuration

{{< img src="dashboards/guide/context_links/override-link.mp4" alt="Copier/coller des liens pour amorcer une configuration" video="true" style="width:75%;" >}}

Pour utiliser des liens de contexte avancés qui encodent un grand nombre de paramètres, il peut s'avérer plus pratique de copier/coller toute l'URL dans le champ **URL**, afin d'amorcer la configuration, puis de modifier les variables à partir du résultat obtenu.


#### Encodage des URL

{{< img src="dashboards/guide/context_links/url-encoding.png" alt="Personnaliser le lien" style="width:75%;" >}}

Datadog prend en charge l'encodage des URL dans les liens de contexte.

Le lien de l'exemple ci-dessus comporte un paramètre de requête, à savoir `status:error source:nginx {{@shopist.webstore.merchant.tier}}`. Pour ce paramètre, `{{@shopist.webstore.merchant.tier}}` est interprété comme `@shopist.webstore.merchant.tier:basic`. Le paramètre de requête complet est ensuite remplacé par `&query=status%3Aerror%20source%3Anginx%20%40shopist.webstore.merchant.tier%3Abasic`.


## Exemples de cas d'utilisation

Les exemples de cette section vous permettent de comprendre comment intégrer vos dashboards à vos workflows grâce aux liens de contexte.

### Ajouter à des dashboards des liens vers la solution d'assistance d'un client

L'exemple suivant décrit la procédure à suivre pour créer un lien depuis un utilisateur dans un dashboard vers la page Zendesk de cet utilisateur.

#### Contexte

Imaginons que vous utilisez Datadog pour surveiller votre site d'e-commerce. Votre équipe d'assistance clientèle se sert d'un dashboard configuré par vos équipes [Frontend][17] et [Sécurité][18] afin d'identifier de façon proactive vos clients les plus engagés, ou vos clients qui rencontrent des problèmes, et d'interagir potentiellement avec eux.

Pour accélérer ce workflow de dépannage, votre équipe d'assistance clientèle souhaiterait bénéficier d'un lien direct entre les dashboards et la solution d'assistance, par exemple Zendesk.

#### Approche

L'adresse e-mail des utilisateurs constitue le principal identifiant permettant de surveiller dans Datadog les utilisateurs connectés à votre plateforme. Il s'agit d'une facette qui est disponible dans certains widgets de dashboard.

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Requête Zendesk" style="width:90%;">}}

Voici un exemple de lien Zendesk permettant de rechercher un utilisateur : `https://acme.zendesk.com/agent/search/1?type=user&q=email%3Ashane%40doe.com`. L'adresse e-mail de l'utilisateur représente le paramètre de recherche.

Ajoutez une variable à l'URL, pour que le lien du modèle soit remplacé par `https://acme.zendesk.com/agent/search/1?type=user&q=email:{{@usr.email.value}}`.

{{< img src="dashboards/guide/context_links/zendesk_link.png" alt="Lien de contexte vers la page d'un utilisateur Zendesk" style="width:80%;">}}

#### Résultat

Le widget de dashboard de votre équipe d'assistance clientèle contient un lien de contexte permettant d'accéder à la plateforme d'assistance sans perdre le contexte pertinent.

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Lien de contexte vers la page d'un utilisateur Zendesk" style="width:80%;">}}

Si vous cliquez sur le lien **Zendesk User Page**, vous êtes redirigé vers la page Zendesk de l'utilisateur en question.

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Résultat Zendesk" style="width:80%;">}}

### Ajouter à un dashboard des liens vers la console AWS

L'exemple suivant décrit la procédure à suivre pour créer un lien dans un widget de dashboard entre un host et la page de l'instance AWS EC2 correspondante dans la console AWS.

#### Contexte

Imaginons que votre plateforme est hébergée sur des instances [AWS EC2][19] et que vous utilisez principalement des procédures manuelles pour redimensionner votre plateforme.

Vous disposez d'un dashboard Datadog présentant des métriques de santé clés sur votre infrastructure.

Pour accélérer ce workflow opérationnel, vous souhaitez bénéficier d'un lien direct entre ce dashboard et votre [console AWS][20], par exemple pour passer d'une instance `t2.micro` à `t2.large`.

#### Approche

Voici un exemple de lien de synthèse vers une instance AWS EC2 : `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`. Ce lien contient les éléments suivants :

* `eu-west-3` : la région du centre de données, affichée sous la forme d'un sous-domaine et d'un paramètre d'URL.
* `i-04b737b9f8bf94a94` : l'ID du host, affiché sous la forme d'un paramètre de hachage.

Si votre plateforme s'exécute uniquement dans une région, injectez l'ID de host dans le lien de contexte, afin d'obtenir le lien suivant : `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId={{host.value}}`.

Si votre plateforme s'exécute dans plusieurs régions, la configuration de votre widget varie en fonction de ce qui suit :

* Si la région est intégrée dans l'agrégation de la requête (comme dans la capture d'écran ci-dessous), le lien du modèle correspond à `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`. `{{region.value}}` est alors une variable de **requête**.

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="Requête AWS EC2" style="width:90%;" >}}

* Si la région n'est pas intégrée à l'agrégation de la requête (comme dans la capture d'écran ci-dessous), le lien du modèle correspond à `https://{{$region.value}}.console.aws.amazon.com/ec2/v2/home?region={{$region.value}}#InstanceDetails:instanceId={{host.value}}`, `{{region.value}}` est alors une **template variable**.

{{< img src="dashboards/guide/context_links/ec2_query2.png" alt="Requête AWS EC2" style="width:90%;" >}}

#### Résultat

Le widget de votre dashboard contient un lien redirigeant vers le host pertinent dans la console AWS.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="Interaction avec la requête AWS EC2" style="width:90%;" >}}

Lorsque vous cliquez sur le lien **AWS EC2 Instance Summary**, vous êtes redirigé vers la page de l'instance AWS EC2 dans la console AWS.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="Résultat de la requête AWS EC2" style="width:70%;" >}}

### Ajouter à un dashboard des liens vers des vues enregistrées et des attributs remappés dans Datadog

L'exemple suivant décrit la procédure à suivre pour créer un lien depuis un événement RUM d'un widget de dashboard vers les logs correspondants.

#### Contexte

Imaginons que vous surveillez le site de votre entreprise avec Datadog. Vous pouvez utiliser la solution [RUM][17] pour mieux comprendre le comportement de vos utilisateurs et les [logs][21] pour [superviser la dimension technique de vos API Gateways][22].

Vos ingénieurs frontend utilisent régulièrement des dashboards comportant des données RUM globales. Votre équipe responsable des API Gateways gère une [vue enregistrée][23] dans le Log Explorer. Cette ressource a été personnalisée afin de permettre à l'équipe de surveillance du frontend d'accéder aux informations dont elle a réellement besoin.

{{< img src="dashboards/guide/context_links/logs-saved-view_result.jpg" alt="Résultat de la vue enregistrée des logs" style="width:90%;" >}}

Pour accélérer ce workflow de dépannage, l'équipe de surveillance du frontend souhaiterait pouvoir accéder à la vue enregistrée tout en conservant le contexte actuel du dashboard.

#### Approche à suivre pour les vues enregistrées

Les [vues enregistrées][23] vous permettent de définir la requête par défaut, la visualisation et les options de configuration du Log Explorer. Voici un exemple de lien vers une vue enregistrée : `https://app.datadoghq.com/logs?saved_view=305130`. Ce lien encode l'URL du Log Explorer.

Vous pouvez ajouter des informations à la fin du lien court de la vue enregistrée afin de remplacer des paramètres de l'URL du Log Explorer obtenue.

Par exemple, le lien `https://app.datadoghq.com/logs?saved_view=305130&query=@source:nginx @network.client.ip:123.123.12.1` renvoie vers la vue [Log Explorer][15] obtenue si vous aviez ouvert la vue enregistrée, à l'exception près que le filtre de requête par défaut a été remplacé par `@source:nginx @network.client.ip:123.123.12.1`.

#### Approche à suivre pour le remappage d'attributs

Si la navigation sur votre site Web est anonyme, vous pouvez utiliser une adresse IP comme proxy pour identifier vos utilisateurs.

Imaginons que vous cherchiez à identifier l'attribut `@session.ip` de vos événements RUM avec l'attribut `@network.client.ip` de vos logs. Ces attributs ne possèdent pas le même nom, car ils n'ont pas la même signification. Toutefois, pour les logs d'authentification, vous pouvez les identifier tous les deux.

Pour ce faire, injectez l'attribut `@session.ip` dans un filtré basé sur `@network.client.ip`, puis créez le filtre `@network.client.ip:{{@session.ip.value}}` approprié.

{{< img src="dashboards/guide/context_links/logs-saved-view_query.png" alt="Résultat de la vue enregistrée des logs" style="width:70%;">}}

Si vous utilisez un widget de dashboard RUM qui présente des informations sur l'IP des sessions pour certains pays, utilisez la configuration suivante pour vos liens.

{{< img src="dashboards/guide/context_links/logs-saved-view_link.png" alt="Résultat de la vue enregistrée des logs" style="width:70%;">}}

#### Résultat

Si l'équipe responsable des API Gateways modifie la vue enregistrée afin de tenir compte des derniers changements apportés aux logs entrants, le lien de contexte continue à fonctionner.

Le remappage de l'adresse IP crée un lien de contexte qui permet d'associer vos événements RUM aux logs correspondants.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/monitors/notify/
[2]: /fr/notebooks/
[3]: /fr/dashboards/#permissions
[4]: https://app.datadoghq.com/apm/traces/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/rum/explorer/
[7]: /fr/real_user_monitoring/data_collected/
[8]: /fr/infrastructure/hostmap/#overview
[9]: /fr/getting_started/dashboards/#explore-out-of-the-box-dashboards
[10]: /fr/infrastructure/livecontainers/
[11]: /fr/infrastructure/process/?tab=linuxwindows
[12]: /fr/tracing/trace_explorer/?tab=listview
[13]: /fr/real_user_monitoring/explorer/
[14]: /fr/tracing/profiler/search_profiles/
[15]: /fr/logs/explorer/
[16]: /fr/dashboards/widgets/
[17]: /fr/real_user_monitoring/
[18]: /fr/security_platform/cloud_siem/
[19]: /fr/integrations/amazon_ec2/
[20]: https://aws.amazon.com/console/
[21]: /fr/logs/
[22]: /fr/integrations/#cat-log-collection
[23]: /fr/logs/explorer/saved_views/