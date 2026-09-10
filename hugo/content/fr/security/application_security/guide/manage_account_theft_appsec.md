---
disable_toc: false
title: Gérer le vol de compte avec AAP
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

Les utilisateurs sont des entités de confiance dans vos systèmes ayant accès à des informations sensibles et la capacité d'effectuer des actions sensibles. Des acteurs malveillants ont identifié les utilisateurs comme une opportunité de cibler des sites web et de voler des données et des ressources précieuses.

Datadog App and API Protection (AAP) fournit des capacités de détection et de protection [intégrées][1] pour vous aider à gérer cette menace. 

Ce guide décrit comment utiliser AAP pour se préparer et répondre aux campagnes de prise de contrôle de compte (ATO). Ce guide est divisé en trois phases :

1. [Collecte des informations de connexion](#phase-1-collecting-login-information) :
   - Activez et vérifiez la collecte de l'activité de connexion dans Datadog AAP en utilisant des méthodes d'instrumentation automatiques ou manuelles.
   - Utilisez les options de configuration à distance si vous ne pouvez pas modifier le code de votre service.
   - Dépanner les données manquantes ou incorrectes.
2. [Préparation aux campagnes de prise de contrôle de compte](#phase-2-preparing-for-ato-campaigns) :
   - Préparez-vous aux campagnes de prise de contrôle de compte (ATO) détectées par AAP. 
   - Configurez les notifications pour les alertes d'attaque.
   - Validez la bonne propagation des données pour une identification précise de l'attaquant.
   - Configurez le blocage automatique des IP pour une atténuation immédiate.
   - Découvrez l'importance du blocage temporaire en raison des IP dynamiques des attaquants.
3. [Réagir aux campagnes de prise de contrôle de compte](#phase-3-reacting-to-ato-campaigns) :
   - Apprenez à réagir aux campagnes de prise de contrôle de compte (ATO), notamment en ce qui concerne les stratégies des attaquants, le triage, la réponse, l'investigation, la surveillance et le nettoyage.

## Phase 1 : Collecte des informations de connexion {#phase-1-collecting-login-information}

Pour détecter les modèles malveillants, AAP nécessite une visibilité sur l'activité de connexion de vos utilisateurs. Cette phase décrit comment activer et valider cette visibilité. 

### Étape 1.1 : Assurez-vous qu'AAP est activé sur votre service d'identité {#step-11-ensure-aap-is-enabled-on-your-identity-service}

Cette étape décrit comment configurer votre service pour utiliser AAP.

<div class="alert alert-info">Si votre service utilise déjà AAP, vous pouvez passer à <a href="#step-1.3:-validating-login-information-is-automatically-collected">Étape 1.3 : Validation de la collecte automatique des informations de connexion</a>.</div>

1. Accédez à [{{< ui >}}Catalog{{< /ui >}}][2], cliquez sur la loupe {{< ui >}}Security{{< /ui >}} et recherchez le nom de votre service de connexion. 

   {{<img src="security/ato/guide_service_catalog.png" alt="Catalogue avec un service gérant l'authentification" style="width:100%;" >}}

2. Cliquez sur le service pour ouvrir ses détails. Si la pastille {{< ui >}}Threat management{{< /ui >}} est verte, AAP est activé et vous pouvez passer à [Étape 1.3 : Validation de la collecte automatique des informations de connexion](#step-1.3:-validating-login-information-is-automatically-collected).
   
   {{<img src="security/ato/guide_service_catalog_enabled.png" alt="Catalogue avec un panneau latéral de service déployé, montrant la gestion des menaces activée" style="width:100%;" >}}

   Si AAP n'est pas activé, le panneau affiche le bouton {{< ui >}}Discover AAP{{< /ui >}}.

   {{<img src="security/ato/guide_service_catalog_disabled.png" alt="Catalogue avec un panneau latéral de service déployé, montrant que la Gestion des menaces n'est pas activée et affichant un lien pour en savoir plus." style="width:100%;" >}}

   Pour configurer AAP, passez à [Étape 1.2 : Activation d'AAP sur le service de connexion](#step-12-enabling-aap-on-your-login-service).

### Étape 1.2 : Activation d'AAP sur votre service de connexion {#step-12-enabling-aap-on-your-login-service}

Pour activer AAP sur votre service de connexion, assurez-vous de remplir les conditions suivantes :

* Tout comme Datadog APM, AAP nécessite une intégration de bibliothèque dans vos services et un Datadog Agent en cours d'exécution.  
* AAP bénéficie généralement de l'utilisation de la bibliothèque la plus récente possible ; cependant, les versions minimales prises en charge sont documentées dans [Exigences de compatibilité][3].   
* Au minimum, {{< ui >}}Threat Detection{{< /ui >}} doit être activé. Idéalement, {{< ui >}}Automatic user activity event tracking{{< /ui >}} devrait également être activé.

Pour activer AAP à l'aide d'un nouveau déploiement, utilisez la variable d'environnement/configuration de bibliothèque `APPSEC_ENABLED` ou la [Remote Configuration][11]. Vous pouvez utiliser l'une ou l'autre méthode, mais la Remote Configuration peut être configurée à l'aide de l'interface utilisateur Datadog.

**Pour activer AAP à l'aide de la Remote Configuration**, et sans avoir à redémarrer vos services, procédez comme suit :

1. Accédez à [Intégration AAP][5].  
2. Cliquez sur {{< ui >}}Enable App & API Protection{{< /ui >}}.   
3. Dans {{< ui >}}Activate on your APM services{{< /ui >}}, cliquez sur {{< ui >}}Select Services{{< /ui >}}.
4. Sélectionnez votre ou vos services, puis cliquez sur {{< ui >}}Next{{< /ui >}} et suivez les instructions de configuration.

Lorsque vous voyez des traces provenant de votre service dans [AAP Traces][6], passez à [Étape 1.3 : Validation de la collecte automatique des informations de connexion](#step-1.3:-validating-login-information-is-automatically-collected).

Pour des instructions plus détaillées sur l'utilisation d'un nouveau déploiement, consultez [Activation de la détection des menaces AAP à l'aide des SDK Datadog][7].

### Étape 1.3 : Validation de la collecte automatique des informations de connexion {#step-13-validating-login-information-is-automatically-collected}

Une fois AAP activé, vous pouvez valider que les informations de connexion sont collectées par Datadog.

**Remarque :** Une fois AAP activé sur un service, attendez quelques minutes que les utilisateurs se connectent au service ou connectez-vous vous-même au service.

Pour valider que les informations de connexion sont collectées, procédez comme suit :

1. Accédez à [Traces][8] dans AAP.   
2. Recherchez les traces marquées avec l'activité de connexion provenant de votre service de connexion. Par exemple, dans {{< ui >}}Search for{{< /ui >}}, vous pourriez avoir `@appsec.security_activity:business_logic.users.login.*`.  
3. Vérifiez si tous vos services de connexion signalent une activité de connexion. Vous pouvez voir cela dans la facette {{< ui >}}Service{{< /ui >}}.

{{<img src="security/ato/guide_trace_explorer.png" alt="Explorateur de traces AAP montrant un état stable des échecs et des réussites de connexion, avec quelques pics" style="width:100%;" >}}

**Si vous ne voyez pas d'activité de connexion provenant d'un service**, accédez à [Étape 1.5 : Instrumentation manuelle de vos services](#step-15-manually-instrumenting-your-services).

### Étape 1.4 : Validation de la collecte automatique des métadonnées de connexion {#step-14-validating-login-metadata-is-automatically-collected}

Pour valider que les métadonnées de connexion sont collectées, procédez comme suit :

1. Accédez à [Traces][8] dans AAP.   
2. Recherchez les traces marquées avec une activité de connexion réussie et échouée provenant de votre service de connexion. Vous pouvez mettre à jour la requête de recherche dans {{< ui >}}Search for{{< /ui >}} pour filtrer `business_logic.users.login.success` ou `business_logic.users.login.failure`. 
3. Ouvrez une trace.  
4. Dans l'onglet {{< ui >}}Security{{< /ui >}}, examinez {{< ui >}}Business Logic Event{{< /ui >}}.
5. Vérifiez si l'événement concerne un faux utilisateur.

{{<img src="security/ato/guide_trace_login_fail.png" alt="Trace de connexion AAP montrant un événement d'échec de connexion et des métadonnées complètes" style="width:100%;" >}}

Examinez quelques traces, à la fois les succès et les échecs de connexion. Pour les échecs de connexion, recherchez les traces avec `usr.exists` comme `true` (tentative de connexion échouée par un utilisateur existant) et `false`.

Les vérifications doivent être effectuées, que l'utilisateur existe ou non.

En cas d'utilisateur **faux** (`usr.exists:false`), recherchez les problèmes suivants :

- Un événement unique : si la trace contient plusieurs événements de connexion, tels que des succès et des échecs, cela peut être dû à une instrumentation automatique incorrecte. Pour modifier l'instrumentation automatique, accédez à [Étape 1.5 : Instrumentation manuelle de vos services](#step-15-manually-instrumenting-your-services).  
- L'événement contient-il les métadonnées obligatoires ? Il peut apparaître sous forme de section d'attribution d'utilisateur en cas de connexion réussie. Les métadonnées obligatoires sont `usr.login` et `usr.exists` en cas d'échec de connexion, et `usr.login` et `usr.id` en cas de succès de connexion. Si certaines métadonnées sont manquantes, accédez à [Étape 1.5 : Instrumentation manuelle de vos services](#step-15-manually-instrumenting-your-services).

**Si l'instrumentation est correcte, passez à [Phase 2 : Préparation aux campagnes de prise de contrôle de compte](#phase-2-preparing-for-ato-campaigns).**

### Étape 1.5 : Instrumentation manuelle de vos services {#step-15-manually-instrumenting-your-services}

AAP collecte les informations de connexion et les métadonnées à l'aide d'un SDK intégré aux bibliothèques Datadog. L'instrumentation est effectuée en appelant le SDK lorsqu'une connexion utilisateur réussit ou échoue et en fournissant au SDK les métadonnées de la connexion. Le SDK associe la connexion et les métadonnées à la trace et les envoie à Datadog où elles sont conservées.

<div class="alert alert-info">Pour une alternative à la modification du code du service, accédez à <a href="#step-16-remote-instrumentation-of-your-services">Étape 1.6 : Instrumentation à distance de vos services</a>.</div>

Pour instrumenter manuellement vos services, procédez comme suit :

1. Si l'auto-instrumentation fournit des données incorrectes (plusieurs événements dans une seule trace), consultez [Désactiver l'auto-instrumentation][9].
2. Pour des instructions d'instrumentation détaillées pour chaque langage, accédez à [Ajout d'informations de logique métier (succès de connexion, échec de connexion, toute logique métier) aux traces][10]. Assurez-vous d'ajouter les métadonnées suivantes :
   * `usr.login` : **Obligatoire pour la réussite et l'échec de la connexion**. Ce champ contient le *nom* utilisé pour se connecter au compte. Le nom peut être une adresse e-mail, un numéro de téléphone, un nom d'utilisateur ou autre. L'objectif de ce champ est d'identifier les comptes ciblés même s'ils n'existent pas dans vos systèmes, car un utilisateur pourrait être en mesure de modifier ces comptes. De plus, ce champ fournit des informations sur l'emplacement de la base de données utilisée par l'attaquant. Cette valeur ne doit pas être confondue avec `usr.id`.
   * `usr.exists` : **Obligatoire pour les échecs de connexion**. Ce champ est requis pour certaines détections par défaut. Le champ aide à réduire la priorité des tentatives ciblant des comptes qui n'existent pas dans vos systèmes.  

**Après avoir déployé le code, validez que l'instrumentation est correcte en suivant les étapes de** [Étape 1.4 : Validation de la collecte automatique des métadonnées de connexion](#step-1.4:-validating-login-metadata-is-automatically-collected).

### Étape 1.6 : Instrumentation à distance de vos services {#step-16-remote-instrumentation-of-your-services}

AAP peut utiliser des règles WAF personnalisées intégrées à l'application pour signaler les tentatives de connexion et extraire les métadonnées de la requête nécessaires aux règles de détection.

Cette approche nécessite que la [Remote Configuration][11] soit activée et fonctionnelle. Vérifiez que la configuration à distance est en cours d'exécution pour ce service dans [Remote Configuration][12].

Pour utiliser des règles WAF personnalisées intégrées à l'application, procédez comme suit :

1. Ouvrez le [formulaire de création de règle WAF personnalisée intégrée à l'application][24].   
2. Nommez votre règle et sélectionnez la catégorie {{< ui >}}Business Logic{{< /ui >}}.   
3. Définissez le type de règle sur `users.login.failure` pour les échecs de connexion et `users.login.success` pour les succès de connexion.
   {{<img src="security/ato/guide_waf_instrumentation.png" alt="Formulaire de création de règle WAF personnalisée prérempli avec une nouvelle règle d'instrumentation de connexion." style="width:100%;" >}}
4. Sélectionnez votre service et rédigez la règle pour faire correspondre les tentatives de connexion. En général, vous faites correspondre la méthode (`POST`), l'URI avec une expression régulière (`^/login`) et le code d'état (403 pour les échecs, 302 ou 200 pour les succès).  
5. Collectez les balises requises par les règles de détection. Le tag le plus important est `usr.login`. En supposant que la connexion ait été fournie dans la requête, vous pouvez ajouter une condition et définir `store value as tag` comme opérateur.
   {{<img src="security/ato/guide_waf_instrumentation_operator.png" alt="Menu déroulant Opérateur dans le formulaire de création de règle WAF personnalisée, avec store value as tag mis en surbrillance." style="width:30%;" >}}

6. Sélectionnez un paramètre utilisateur spécifique comme entrée, soit dans le corps, soit dans la requête.   
7. Définissez le champ `Tag` sur le nom du tag où vous souhaitez enregistrer la valeur capturée à l'aide de `usr.login`.
   {{<img src="security/ato/guide_waf_instrumentation_tagged.png" alt="Formulaire de création de règle WAF personnalisée, avec une condition complète sélectionnant un paramètre nommé login et l'enregistrant dans un tag appelée usr.login" style="width:100%;" >}}

8. Cliquez sur {{< ui >}}Save{{< /ui >}}. La règle est automatiquement envoyée à chaque instance du service et commence ensuite à capturer les échecs de connexion. 

**Pour valider que l'instrumentation est correcte**, consultez [Étape 1.4 : Validation de la collecte automatique des métadonnées de connexion](#step-1.4:-validating-login-metadata-is-automatically-collected).

Pour plus de détails, consultez [Suivi des informations de logique métier sans modifier le code][13].

## Phase 2 : Préparation aux campagnes ATO {#phase-2-preparing-for-ato-campaigns}

Après avoir configuré l'instrumentation pour vos services, AAP surveille les campagnes d'attaque. Vous pouvez examiner le trafic dans la section [Attacks overview][14] {{< ui >}}Business logic{{< /ui >}}. 

{{<img src="security/ato/guide_overview_card.png" alt="Vue d'ensemble de l'activité de connexion et des signaux liés à l'ATO" style="width:100%;" >}}

AAP détecte [plusieurs stratégies d'attaque][15]. Lorsqu'une attaque est détectée avec un niveau de confiance élevé, les [règles de détection intégrées][16] génèrent un signal. 

La gravité du signal est définie en fonction de l'urgence de la menace : de {{< ui >}}Low{{< /ui >}} en cas d'attaques infructueuses à {{< ui >}}Critical{{< /ui >}} en cas de compromissions de compte réussies.

Les actions couvertes dans les sections suivantes vous aident à identifier et à exploiter les détections plus rapidement.

### Étape 2.1 : Configuration des notifications {#step-21-configuring-notifications}

[Notifications][17] fournissent un avertissement sur votre canal préféré lorsqu'un signal est déclenché. Pour créer une règle de notification, procédez comme suit :

1. Ouvrez [Create a new rule][18].  
2. Saisissez un nom pour la règle.
3. Sélectionnez {{< ui >}}Signal{{< /ui >}} et supprimez toutes les entrées sauf {{< ui >}}App & API Protection{{< /ui >}}.
4. Restreindre la règle à `category:account_takeover` et étendre les niveaux de gravité pour inclure `Medium`.
5. Ajoutez des destinataires de notification (Slack, Teams, PagerDuty).
   Pour en savoir plus, consultez [Notification channels][19].  
6. Testez, puis enregistrez la règle.
   {{<img src="security/ato/guide_notification_config.png" alt="Formulaire de création de notification prérempli afin de notifier les signaux ATO les plus pertinents" style="width:80%;" >}}
   La notification est envoyée la prochaine fois qu'un signal est généré.

### Étape 2.2 : Valider la propagation correcte des données {#step-22-validate-proper-data-propagation}

Dans les environnements de microservices, les services sont généralement atteints par des hosts internes exécutant d'autres services. Cet environnement interne rend difficile l'identification des caractéristiques uniques de la requête de l'attaquant initial, telles que l'adresse IP, l'agent utilisateur, l'empreinte numérique, etc.

[AAP Traces][20] peut vous aider à valider que l'événement de connexion est correctement marqué avec les adresses IP sources, l'agent utilisateur, etc. Pour valider, examinez les traces de connexion dans [Traces][21] et vérifiez les points suivants :
 
* Les adresses IP sources (`@http.client_ip`) sont variées et publiques.  
  * **Problème :** Si les tentatives de connexion proviennent uniquement de quelques adresses IP, il peut s'agir d'un proxy que vous ne pouvez pas bloquer sans risquer de compromettre la disponibilité.  
  * **Solution :** Transmettez l'adresse IP du client de la requête initiale via un en-tête HTTP, tel que `X-Forwarded-For`. Vous pouvez utiliser un en-tête personnalisé pour une [meilleure sécurité][22] et configurer le SDK pour le lire à l'aide de la variable d'environnement `DD_TRACE_CLIENT_IP_HEADER`.  
* L'agent utilisateur (`@http.user_agent`) est cohérent avec le trafic attendu (navigateur web, application mobile, etc.)  
  * **Problème :** L'agent utilisateur pourrait être remplacé par l'agent utilisateur de la bibliothèque réseau du microservice appelant.  
  * **Solution :** Utilisez l'agent utilisateur du client lors de l'appel des services suivants.
* Plusieurs en-têtes sont renseignés. Vous pouvez le constater dans le {{< ui >}}See more details{{< /ui >}} d'une trace, dans le bloc {{< ui >}}Request{{< /ui >}}.
  * **Problème :** Les en-têtes de requête normaux (par exemple, `accept-encoding`) ne sont pas transmis au service instrumenté. Cela nuit à la génération d'empreintes numériques (`@appsec.fingerprint.*`) et dégrade la capacité du signal à isoler l'activité d'un attaquant.
  * **Solution :** Transmettez ces en-têtes lors de l'appel d'un microservice ultérieur.

### Étape 2.3 : Configurer le blocage automatique {#step-23-configure-automatic-blocking}

<div class="alert alert-info">Avant de commencer : Vérifiez que les adresses IP sont correctement configurées, comme décrit dans <a href="#step-22-validate-proper-data-propagation">Étape 2.2 : Valider la propagation correcte des données</a>.</div>

Le blocage automatique AAP peut être utilisé pour bloquer les attaques à tout moment de la journée. Le blocage automatique peut aider à bloquer les attaques avant que les membres de votre équipe ne soient en ligne, assurant ainsi la sécurité en dehors des heures de bureau. Dans le cadre d'une ATO, le blocage automatique peut aider à atténuer les problèmes de charge causés par l'augmentation des tentatives de connexion infructueuses ou empêcher l'attaquant d'utiliser des comptes compromis.

Vous pouvez configurer le blocage automatique pour bloquer les adresses IP identifiées comme faisant partie d'une attaque. Il ne s'agit que d'une remédiation partielle car les attaquants peuvent changer d'IP ; cependant, cela peut vous donner plus de temps pour mettre en œuvre une remédiation complète.

Pour configurer le blocage automatique, procédez comme suit :

1. Accédez à {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [Règles de détection][23].  
2. Dans {{< ui >}}Search{{< /ui >}}, saisissez `tag:"category:account_takeover"`.   
3. Ouvrez les règles pour lesquelles vous souhaitez activer le blocage. Datadog recommande d'activer le blocage IP pour une gravité {{< ui >}}High{{< /ui >}} ou {{< ui >}}Critical{{< /ui >}}.  
4. Dans la règle, dans {{< ui >}}Define Conditions{{< /ui >}}, dans {{< ui >}}Security Responses{{< /ui >}}, activez {{< ui >}}IP automated blocking{{< /ui >}}. Vous pouvez également activer {{< ui >}}User automated blocking{{< /ui >}}.  
   Vous pouvez contrôler le comportement de blocage par condition. Chaque règle peut comporter plusieurs conditions basées sur votre niveau de confiance et le succès de l'attaque. 

**Datadog ne recommande pas le blocage permanent des adresses IP**. Il est peu probable que les attaquants réutilisent les mêmes IP et un blocage permanent pourrait entraîner le blocage d'utilisateurs légitimes. De plus, AAP a une limite quant au nombre d'IP qu'il peut bloquer (`~10000`), et cela pourrait remplir cette liste avec des IP inutiles.

{{<img src="security/ato/guide_blocking_config.png" alt="Section Condition de la page des règles de détection où le blocage peut être configuré" style="width:100%;" >}}

## Phase 3 : Réaction aux campagnes d'ATO {#phase-3-reacting-to-ato-campaigns}

Cette section décrit le comportement courant des pirates lors d'une prise de contrôle de compte et comment trier, enquêter et surveiller les détections.

### Comment les attaquants mènent leurs campagnes {#how-attackers-run-their-campaigns}

Finalement, vos systèmes subissent une attaque. La vague de tentatives de connexion malveillantes peut souvent éclipser le volume d'activité de connexion normale attendu par le service. La charge peut augmenter, provoquant des problèmes de disponibilité, et l'attaquant pourrait à tout moment réussir à se connecter à un compte. 

Les actions que les attaquants entreprennent dépendent de leur stratégie et de la configuration de vos systèmes. Certains attaquants pourraient décider d'exploiter immédiatement leur accès afin d'en tirer profit avant que vous n'ayez le temps de geler leurs comptes compromis. D'autres pourraient garder les comptes en sommeil jusqu'à une date ultérieure. 

De nombreuses stratégies sont disponibles, mais il est important de comprendre que la chaîne de valeur des attaques est souvent soigneusement divisée :

1. L'acteur qui initie l'attaque achète souvent une base de données d'identifiants auprès d'un fournisseur (probablement acquise par la compromission d'un autre service).
2. L'acteur se procure un script conçu pour automatiser les tentatives de connexion tout en évitant la détection (en randomisant les en-têtes, en essayant de ressembler le plus possible au trafic normal).
3. L'acteur achète l'accès à un botnet, ce qui lui permet de tirer parti de nombreuses adresses IP différentes pour mener son attaque. Il existe des cas extrêmes où de grandes campagnes avec plus de 500 000 tentatives étaient si distribuées que Datadog a constaté une moyenne de 1,01 requête par IP et une seule tentative par compte.
4. Lorsque des identifiants valides sont découverts, ils peuvent être vendus en aval à un autre acteur pour les exploiter à des fins telles que le vol financier, le spam, les abus, etc.

Lorsqu'une attaque commence contre vos systèmes, le système génère des signaux étiquetés {{< ui >}}Credential Stuffing{{< /ui >}}, {{< ui >}}Distributed Credential Stuffing{{< /ui >}} ou {{< ui >}}Bruteforce{{< /ui >}}, selon la stratégie de l'attaquant.

### Étape 3.1 : Triage {#step-31-triage}

La première étape consiste à confirmer que la détection est correcte. Certains comportements, tels qu'une analyse de sécurité sur un endpoint de connexion ou une rotation fréquente de jetons, peuvent être interprétés par le système de détection comme une attaque. L'analyse dépend du signal, et les exemples suivants fournissent des conseils généraux qui doivent être adaptés à votre situation.

{{< tabs >}}
{{% tab "Bruteforce" %}}

Le signal recherche une tentative de vol de compte utilisateur en essayant de nombreux mots de passe différents pour ce compte. Généralement, un petit nombre de comptes sont ciblés par ces campagnes.

{{<img src="security/ato/guide_signal_bruteforce.png" alt="Panneau latéral du signal affichant un signal de bruteforce avec un utilisateur compromis" style="width:100%;" >}}

Examinez les comptes signalés comme compromis. Cliquez sur un utilisateur pour ouvrir un résumé de l'activité récente.

{{<img src="security/ato/guide_user_menu.png" alt="Menu affiché lors du survol d'une pastille utilisateur. Un bouton permettant d'ouvrir le panneau latéral utilisateur est mis en surbrillance en haut à droite" style="width:50%;" >}}

Questions pour le triage:

* Y a-t-il eu une forte augmentation de l'activité ?   
* Est-ce la première fois que ces adresses IP tentent des connexions ?   
* Sont-elles signalées par le renseignement sur les menaces ?

Si la réponse à ces questions est oui, le signal est probablement légitime.

Vous pouvez adapter votre réponse en fonction de la sensibilité du compte. Par exemple, un compte gratuit avec un accès limité par rapport à un compte administrateur.

{{% /tab %}}

{{% tab "Credential Stuffing" %}}

Ce signal recherche un grand nombre de comptes avec des échecs de connexion provenant d'un petit nombre d'adresses IP. Cela est souvent causé par des attaquants peu sophistiqués.

{{<img src="security/ato/guide_signal_credential_stuffing.png" alt="Panneau latéral de signalement affichant un signal de credential stuffing avec un utilisateur compromis" style="width:100%;" >}}

Examinez les comptes signalés comme ciblés pour trouver des similitudes et établir la sensibilité de ces utilisateurs.

{{<img src="security/ato/guide_user_table.png" alt="Tableau montrant les utilisateurs ciblés par l'attaque. Un utilisateur est affiché dans une pastille car nous disposons d'un panneau latéral avec plus d'activité le concernant" style="width:100%;" >}}

S'ils partagent des attributs, comme le fait de provenir tous d'une même institution, vérifiez si l'adresse IP pourrait être un proxy pour cette institution en examinant son activité passée en la survolant et en ouvrant le panneau latéral.

{{<img src="security/ato/guide_ip_menu.png" alt="Menu affiché lors du survol d'une pastille utilisateur. Un bouton permettant d'ouvrir le panneau latéral utilisateur est mis en surbrillance en haut à droite" style="width:100%;" >}}

Questions pour le triage:

* Y a-t-il eu une forte augmentation de l'activité ?   
* Les comptes sont-ils non corrélés ?   
* Les adresses IP sont-elles signalées par le renseignement sur les menaces ?   
* Y a-t-il beaucoup plus d'échecs de connexion que de réussites ?

Si la réponse à ces questions est oui, le signal est probablement légitime.  
Vous pouvez adapter votre réponse en fonction de l'ampleur de l'attaque et du fait que des comptes soient compromis ou non.

{{% /tab %}}

{{% tab "Credential Stuffing distribué" %}}

Ce signal recherche une augmentation importante du nombre total d'échecs de connexion sur un service. Ceci est causé par des attaquants sophistiqués tirant parti d'un botnet.

{{<img src="security/ato/guide_signal_distributed_credential_stuffing.png" alt="Panneau latéral de signal montrant un signal de stuffing distribué" style="width:100%;" >}}

Datadog tente d'identifier les attributs communs entre les échecs de connexion dans votre service. Cela peut faire apparaître des défauts dans le script de l'attaquant qui peuvent être utilisés pour isoler l'activité malveillante. Lorsqu'il est trouvé, une section appelée {{< ui >}}Attacker Attributes{{< /ui >}} est affichée. S'il est présent, vérifiez s'il s'agit d'une activité légitime en sélectionnant le cluster et en cliquant sur {{< ui >}}Explore clusters{{< /ui >}}.

{{<img src="security/ato/guide_cluster_table.png" alt="Tableau montrant les clusters d'attributs utilisateur détectés pendant l'attaque. Les lignes peuvent être sélectionnées pour restreindre l'investigation à l'activité correspondant à ces attributs." style="width:100%;" >}}

Si elle est exacte, l'activité du cluster devrait correspondre étroitement à l'augmentation des échecs de connexion tout en étant faible ou inexistante auparavant.  
Si aucun cluster n'est disponible, cliquez sur {{< ui >}}Investigate in full screen{{< /ui >}} et examinez les utilisateurs/IP ciblés pour détecter les valeurs aberrantes. 

Si la liste est tronquée, cliquez sur {{< ui >}}View in AAP Traces Explorer{{< /ui >}} et lancez l'investigation avec l'explorateur de traces. Pour des outils supplémentaires, consultez [Étape 3.3 : Investigation](#step-33-investigation).

{{% /tab %}}
{{< /tabs >}}


Si la conclusion du triage est que le signal est un faux positif, vous pouvez le marquer comme faux positif et le fermer. 

Si le faux positif a été causé par un paramètre unique de votre service, vous pouvez ajouter des filtres de suppression pour masquer les faux positifs.

**Si le signal est légitime**, passez à l'étape [Étape 3.2 : Réponse préliminaire](#step-32-disrupting-the-attacker-as-a-preliminary-response).

### Étape 3.2 : Perturber l'attaquant en guise de réponse préliminaire {#step-32-disrupting-the-attacker-as-a-preliminary-response}

Si l'attaque est en cours, vous pourriez vouloir perturber l'attaquant pendant que vous poursuivez votre investigation. Perturber l'attaquant ralentit l'attaque et réduit le nombre de comptes compromis. 

<div class="alert alert-info">Il s'agit d'une étape courante, bien que vous puissiez souhaiter ignorer cette étape dans les circonstances suivantes :

* Les comptes ont peu de valeur immédiate. Vous pouvez les bloquer après la compromission sans causer de dommages.  
* Vous souhaitez conserver une visibilité maximale sur l'attaque en évitant toute action qui alerterait l'attaquant de l'enquête et l'amènerait à changer de tactique.
</div>

L'application de cette réponse préliminaire nécessite que [Remote Configuration][11] soit activée pour vos services.

Si vous souhaitez initier une réponse partielle, procédez comme suit :

{{< tabs >}}
{{% tab "Bruteforce ou Credential Stuffing" %}}

Les attaquants utilisent probablement un petit nombre d'adresses IP. Pour les bloquer, ouvrez le signal et utilisez Next Steps. Vous pouvez définir la durée du blocage. 

{{<img src="security/ato/guide_next_steps.png" alt="Le menu affiche des réponses rapides au signal, du tri du signal à la réponse au signal par le blocage d'adresses IP ou d'utilisateurs compromis, jusqu'à l'activation du blocage automatique." style="width:50%;" >}}

Datadog recommande **12h**, ce qui est suffisant pour que l'attaque s'arrête et pour éviter de bloquer des utilisateurs légitimes lorsque, après l'attaque, ces adresses IP sont réattribuées à des utilisateurs légitimes. Datadog ne recommande pas le blocage permanent.  
Vous pouvez également bloquer les utilisateurs compromis, bien qu'une meilleure approche consiste à les extraire et à réinitialiser leurs identifiants en utilisant vos propres systèmes.

Enfin, vous pouvez activer le blocage automatique des adresses IP depuis la section Next Step afin que les nouvelles adresses IP soient automatiquement bloquées pendant que vous menez votre enquête.

{{% /tab %}}

{{% tab "Credential Stuffing distribué" %}}

Ces attaques utilisent souvent un grand nombre d'adresses IP jetables. En raison de la latence de Datadog, il n'est pas pratique de bloquer les tentatives de connexion en bloquant l'adresse IP avant que l'attaquant ne la retire de son pool.

Bloquez plutôt les caractéristiques de la requête qui sont uniques à la tentative malveillante (un agent utilisateur, un en-tête spécifique, une empreinte numérique, etc.).

{{<img src="security/ato/guide_cluster_table.png" alt="Tableau montrant les clusters d'attributs utilisateur détectés pendant l'attaque. Les lignes peuvent être sélectionnées pour restreindre l'investigation à l'activité correspondant à ces attributs." style="width:100%;" >}}

Dans un signal {{< ui >}}Distributed Credential Stuffing campaign{{< /ui >}}, Datadog identifie automatiquement les caractéristiques claires et les présente sous forme de {{< ui >}}Attacker Attributes{{< /ui >}}. 

Avant de bloquer, Datadog vous recommande d'examiner l'activité du cluster pour confirmer qu'elle est bien malveillante.

Les questions auxquelles vous essayez de répondre sont les suivantes :

- Le trafic est-il malveillant ? Ce trafic existait-il avant le début de l'attaque ?  
- Un volume significatif de trafic légitime peut-il être capturé ?  
- Le blocage basé sur ce cluster peut-il être efficace ?

Pour ce faire, sélectionnez votre cluster et cliquez sur {{< ui >}}Explore clusters{{< /ui >}}.

{{<img src="security/ato/guide_cluster_table_select.png" alt="Tableau montrant les clusters d'attributs utilisateur détectés pendant l'attaque. Une ligne est sélectionnée et le bouton Explore clusters est en focus." style="width:100%;" >}}

L'explorateur {{< ui >}}Investigate{{< /ui >}} apparaît et fournit des indicateurs de trafic du cluster : une grande part du trafic provenant de l'attaque et une proportion élevée d'IP signalées par Threat Intelligence. 

Voici deux indicateurs importants : 

- % de Threat Intel  
- Répartition du trafic

{{<img src="security/ato/guide_cluster_explorer.png" alt="Explorateur de clusters affichant le cluster que nous avons sélectionné précédemment" style="width:100%;" >}}

Cliquez sur un indicateur pour obtenir plus d'informations sur le trafic du cluster. 

Dans {{< ui >}}Cluster Activity{{< /ui >}}, une visualisation du volume du trafic APM global correspondant à ce cluster est disponible. Lors de la comparaison avec les données AAP, faites attention à l'échelle, car les données APM peuvent être échantillonnées alors que celles de l'AAP ne le sont pas.

Dans l'exemple suivant, une grande partie du trafic provient d'avant l'attaque. Cela signifie qu'une activité légitime correspond à ce cluster dans le trafic normal et qu'elle serait bloquée si vous preniez des mesures. Vous n'avez pas besoin d'escalader ou de cliquer sur {{< ui >}}Block All Attacking IPs{{< /ui >}} dans le signal.

{{<img src="security/ato/guide_cluster_explorer_fp.png" alt="Activité du cluster montrant un taux constant de trafic correspondant à ces attributs, un indice fort que la majeure partie de ce trafic est légitime et que le cluster ne peut pas être utilisé pour le blocage" style="width:100%;" >}}

Dans un autre exemple, l'activité du cluster a commencé avec l'attaque. Cela signifie qu'il ne devrait pas y avoir de dommages collatéraux et que vous pouvez procéder au blocage.

{{<img src="security/ato/guide_cluster_explorer_tp.png" alt="Graphique montrant sur une échelle logarithmique très peu de trafic en dehors des attaques" style="width:70%;" >}}

Après avoir confirmé que les caractéristiques correspondent aux attaquants, vous pouvez pousser une règle WAF intégrée à l'application pour bloquer les requêtes correspondant à ces caractéristiques. Ceci est pris en charge uniquement pour les caractéristiques basées sur l'agent utilisateur.

Pour créer la règle, procédez comme suit :

1. Allez dans {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [Custom Rules][33].
2. Cliquez sur {{< ui >}}Create New Rule{{< /ui >}} et terminez la configuration. 
3. Suivez les étapes dans {{< ui >}}Define your custom rule{{< /ui >}}.   
4. Dans {{< ui >}}Select the services you want this rule to apply to{{< /ui >}}, sélectionnez votre service de connexion ou les services pour lesquels vous souhaitez bloquer les requêtes. Vous pouvez également cibler le blocage sur la route de connexion.
   {{<img src="security/ato/guide_waf_blocking.png" alt="Capture d'écran de la fenêtre modale de création de règle WAF sélectionnant une route spécifique sur un service spécifique" style="width:100%;" >}}
5. Dans {{< ui >}}If incoming requests match these conditions{{< /ui >}}, configurez les conditions de la règle. <!-- The following example uses the user agent. -->   
   1. Si vous souhaitez bloquer un user agent spécifique, collez-le dans {{< ui >}}Values{{< /ui >}}. Dans {{< ui >}}Operator{{< /ui >}}, vous pouvez utiliser {{< ui >}}matches value in list{{< /ui >}} ou, si vous souhaitez plus de flexibilité, vous pouvez également utiliser {{< ui >}}Matches RegEx{{< /ui >}}.
   {{<img src="security/ato/guide_waf_blocking_ua.png" alt="Une capture d'écran d'un user agent en cours de blocage" style="width:100%;" >}}
6. Utilisez la section {{< ui >}}Preview matching traces{{< /ui >}} comme examen final de l'impact de la règle. Si aucune trace inattendue n'est affichée, sélectionnez un mode de blocage et enregistrez la règle. 
   {{<img src="security/ato/guide_waf_blocking_traces.png" alt="Tableau montrant les traces correspondant à vos règles" style="width:100%;" >}}

Plusieurs actions de blocage sont disponibles. Selon la sophistication des attaquants, vous pourriez souhaiter une réponse plus furtive afin qu'ils ne se rendent pas immédiatement compte qu'ils ont été bloqués.


{{% /tab %}}
{{< /tabs >}}

### Étape 3.3 : Enquête {#step-33-investigation}

Lorsque vous avez [perturbé l'attaquant en guise de réponse préliminaire](#step-32-disrupting-the-attacker-as-a-preliminary-response), vous pouvez identifier les éléments suivants :

- Comptes compromis par les attaquants afin que vous puissiez réinitialiser leurs identifiants.  
- Indices sur la source des comptes ciblés, que vous pouvez utiliser pour des réinitialisations de mot de passe proactives ou une surveillance accrue.
- Données sur l'infrastructure de l'attaquant, que vous pouvez utiliser pour détecter de futures tentatives ou d'autres activités malveillantes (bourrage de cartes de crédit, abus, etc.).

La première étape consiste à isoler l'activité de l'attaquant du trafic global de l'application. 

#### Isoler l'activité de l'attaquant {#isolate-attacker-activity}

Tout en isolant l'activité de l'attaquant, assurez-vous que vos filtres actuels sont exhaustifs grâce à deux tests :  
 

1. Accédez à [Traces][25], puis *excluez* les traces en fonction des filtres que vous identifiez. L'objectif est d'obtenir un volume de trafic restant similaire à votre volume de trafic habituel. Si vous constatez toujours un pic de connexions pendant l'attaque, cela signifie que des filtres supplémentaires sont nécessaires pour isoler complètement l'attaque.
2. Examinez le trafic correspondant à vos filtres sur une période étendue (par exemple, si l'attaque a duré une heure, utilisez une journée). Tout trafic correspondant avant ou après l'attaque est probablement un faux positif.

Ensuite, commencez par isoler l'activité de l'attaque.

{{< tabs >}}
{{% tab "Bruteforce" %}}

Extrayez la liste des utilisateurs ciblés en accédant à [Signals][1].

Vous pouvez interroger les traces pour les utilisateurs ciblés en cliquant sur le lien {{< ui >}}login attempts{{< /ui >}} dans {{< ui >}}Security Traces{{< /ui >}}.

Si vous souhaitez un accès direct aux utilisateurs ciblés, vous pouvez extraire la liste depuis le panneau latéral des signaux.

{{<img src="security/ato/guide_bruteforce_users.png" alt="Tableau montrant les utilisateurs attaqués" style="width:100%;" >}}

À partir de cette liste d'utilisateurs, vous pouvez créer une requête [Traces][2] pour examiner toute l'activité des utilisateurs ciblés. Suivez ce modèle : 

`@appsec.security_activity:business_logic.users.login.* @appsec.events_data.usr.login:(<users>)` 

Les connexions réussies doivent être considérées comme suspectes.

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A"Application%20Security"%20category%3Aaccount_takeover&product=appsec
[2]: https://app.datadoghq.com/security/appsec/traces
{{% /tab %}}

{{% tab "Credential Stuffing" %}}

Ce signal a signalé une grande quantité d'activité provenant de quelques adresses IP et est étroitement lié à sa variante distribuée. Vous pourriez avoir besoin d'utiliser la méthode de credential stuffing distribué si certaines parties de l'attaque ont été manquées par le signal.

Vous pouvez interroger les traces correspondant aux adresses IP attaquantes en cliquant sur le lien {{< ui >}}login attempts{{< /ui >}} dans {{< ui >}}Security Traces{{< /ui >}}.

Si vous souhaitez un accès direct aux adresses IP attaquantes, vous pouvez extraire la liste depuis le panneau latéral du signal.

{{<img src="security/ato/guide_credential_stuffing_ip.png" alt="Tableau montrant les adresses IP attaquantes" style="width:100%;" >}}

À partir de la liste des adresses IP, vous pouvez créer une requête [Traces][2] pour examiner toute l'activité provenant des adresses IP suspectées. Suivez ce modèle :

`@appsec.security_activity:business_logic.users.login.* @http.client_ip:(<IPs>)`

Les connexions réussies doivent être considérées comme suspectes.

[2]: https://app.datadoghq.com/security/appsec/traces

{{% /tab %}}

{{% tab "Credential Stuffing distribué" %}}

Ce signal a signalé une augmentation importante des échecs de connexion dans un service. Si l'attaque est suffisamment importante, ce signal peut également déclencher les signaux Bruteforce ou Credential Stuffing. Le signal est également capable de détecter les attaques diffuses de manière plus complète.

Dans le cas des attaques diffuses, les attributs de l'attaquant sont disponibles dans le signal.

{{<img src="security/ato/guide_signal_distributed_credential_stuffing.png" alt="Capture d'écran d'un signal de credential stuffing distribué" style="width:100%;" >}}

1. Après avoir ouvert le signal dans le panneau latéral, cliquez sur {{< ui >}}Investigate in full screen{{< /ui >}}.   
2. Dans {{< ui >}}Attacker Attributes{{< /ui >}}, sélectionnez le cluster et cliquez sur {{< ui >}}Filter this signal by selection{{< /ui >}}. Ensuite, dans {{< ui >}}Traces{{< /ui >}}, cliquez sur {{< ui >}}View in AAP Traces Explorer{{< /ui >}}.

Cela vous amène à l'explorateur de traces avec des filtres définis sur les attributs signalés. Vous pouvez commencer l'investigation avec la requête actuelle, mais vous devriez l'étendre pour inclure également les succès de connexion en plus des échecs. Vous pouvez le faire en remplaçant `@appsec.security_activity:business_logic.users.login.failure` par `@appsec.security_activity:business_logic.users.login.*`. Vérifiez l'exhaustivité et la précision du filtre en utilisant [la technique décrite ci-dessus](#isolate-attacker-activity).

{{<img src="security/ato/guide_distributed_credential_stuffing_traces.png" alt="Explorateur de traces filtré par les attributs de cluster" style="width:100%;" >}}

Si ces attributs sont inexacts ou incomplets, vous pouvez essayer d'identifier d'autres caractéristiques pour isoler l'activité de l'attaquant. En revenant au signal de la page complète et en faisant défiler vers le bas jusqu'à la section {{< ui >}}Traces{{< /ui >}}, vous trouverez un bouton {{< ui >}}Analysis{{< /ui >}}. Cela ouvre une vue où le trafic provenant de l'attaque est segmenté par une grande variété d'attributs.

{{<img src="security/ato/guide_investigate_overview.png" alt="Panneau latéral d'analyse ouvert avec une attaque et quelques attributs suggérés dans un tableau" style="width:100%;" >}}

Les attributs les plus courants sont présentés en haut d'un tableau, mais vous pouvez visualiser leur impact en faisant défiler vers le bas. Chaque ligne montre la part du trafic qui correspond à cet attribut et à quel point ce trafic correspond à la « forme » de l'augmentation du trafic. Votre objectif est d'identifier les attributs qui isolent ensemble cette augmentation d'activité tout en excluant le trafic en régime permanent. Soyez attentif à l'échelle des graphiques, car toutes les traces ne sont pas nécessairement marquées avec chaque attribut (par exemple, Threat Intelligence). De plus, notez que certains champs ne peuvent pas être utilisés pour le blocage (Threat Intelligence, ASNs et géolocalisation IP).

{{<img src="security/ato/guide_investigate_correlation.png" alt="Certaines séries temporelles de l'onglet Analyse démontrent parfois une faible corrélation et parfois une forte corrélation" style="width:100%;" >}}

Une fois les attributs identifiés, sélectionnez-les dans la liste et vérifiez leur exhaustivité en activant et désactivant le bouton {{< ui >}}Filtering enabled{{< /ui >}}. Une fois satisfait, cliquez sur {{< ui >}}View Traces{{< /ui >}} pour approfondir l'examen des utilisateurs impactés.

{{% /tab %}}
{{< /tabs >}}

#### Examiner les succès et les échecs de connexion {#review-login-successes-and-failures}

L'examen des succès et des échecs de connexion aide à identifier les éléments suivants :

* Ce que recherchent les attaquants afin que vous puissiez les bloquer.  
* Ce que font les attaquants afin que vous puissiez les intercepter, même s'ils modifient leurs scripts.   
* L'efficacité des attaquants conditionne votre capacité à reprendre le contrôle des comptes qu'ils ont compromis et détermine le temps dont vous disposez pour réagir.

Lorsque l'activité de l'attaquant est isolée, examinez les succès de connexion et posez-vous les questions suivantes : 

* Des comptes ont-ils été compromis ?   
* Les attaquants font-ils quelque chose de leurs comptes compromis ou les laissent-ils inactifs ?   
* Les comptes sont-ils ensuite accédés par une infrastructure différente ?   
* Y a-t-il une activité passée provenant de cette infrastructure ?

Pour les échecs de connexion, posez-vous les questions suivantes :

* Les attaquants ciblent-ils un sous-ensemble spécifique d'utilisateurs ?  
* Quel est leur taux de réussite ? La précision des attaques devrait se situer dans la plage de 1/100 à 1/1000.   
* Contournent-ils les captchas ou l'authentification multifacteur ?

Au fur et à mesure que votre enquête progresse, vous pouvez alterner entre cette étape et la suivante lorsque vous êtes prêt à mettre en œuvre une réponse fondée sur vos conclusions.

### Étape 3.4 : Réponse {#step-34-response}

Les capacités d'investigation de Datadog sont enrichies par les données de son backend, qui ne sont pas accessibles à la bibliothèque exécutant la réponse. Pour cette raison, tous les champs ne sont pas compatibles avec l'application d'une réponse.

Les attaquants motivés essaient de contourner votre réponse dès qu'ils en prennent connaissance. En prévision de cette approche, procédez comme suit :

1. Assurez-vous de ne pas perdre visibilité sur l'attaque.  
2. Rendez le blocage aussi difficile à *identifier* pour l'attaquant. Par exemple, faites en sorte que la réponse de blocage soit identique à celle de votre échec de connexion. Cela peut dérouter les attaquants et les amener à croire que leur attaque est toujours réussie.  
3. Rendez le blocage aussi difficile à *contourner* pour l'attaquant. Utilisez des caractéristiques subtiles, telles que des valeurs d'en-tête spécifiques, plutôt que des adresses IP.

Vous pouvez soit utiliser les fonctionnalités de blocage intégrées de Datadog pour refuser toute requête correspondant à certains critères, soit exporter automatiquement les données vers l'un de vos systèmes pour effectuer une réponse (réinitialisation des identifiants, simulation d'échecs de connexion lors du blocage, etc.).

### Blocage Datadog {#datadog-blocking}

Les utilisateurs faisant partie du trafic bloqué par Datadog voient une {{< ui >}}You're blocked{{< /ui >}} page, ou reçoivent un code d'état personnalisé, tel qu'une redirection. Le blocage peut être appliqué via deux mécanismes, chacun ayant des caractéristiques de performance différentes : la liste de refus et les règles WAF personnalisées. 

{{<img src="security/ato/guide_blocked.png" alt="Page affichée lorsqu'un utilisateur est bloqué. Page indiquant « Désolé, vous ne pouvez pas accéder à cette page. » « Veuillez contacter l'équipe du service client »" style="width:100%;" >}}

#### Liste de refus {#denylist}

La [liste de refus][27] est un moyen efficace de bloquer un grand nombre d'entrées, mais elle est limitée aux adresses IP et aux utilisateurs. Si votre enquête a révélé un petit ensemble d'adresses IP responsables de l'attaque (`<1000`), le blocage de ces adresses IP est la meilleure solution. 

La liste de refus peut être gérée et automatisée à l'aide de la plateforme Datadog en cliquant sur {{< ui >}}Automate Attacker Blocking{{< /ui >}} dans le signal. 

Utilisez les options de signal {{< ui >}}Automate Attacker Blocking{{< /ui >}} ou {{< ui >}}Block All Attacking IPs{{< /ui >}} pour bloquer toutes les adresses IP attaquantes pendant quelques heures, une semaine ou de manière permanente. De même, vous pouvez bloquer les utilisateurs compromis. Pour rappel, Datadog ne recommande pas de bloquer les adresses IP de manière permanente en raison des risques de blocage du trafic légitime après que les adresses IP soient recyclées dans des pools publics.  

{{<img src="security/ato/guide_next_steps.png" alt="Le menu affiche des réponses rapides au signal, du tri du signal à la réponse au signal par le blocage d'adresses IP ou d'utilisateurs compromis, jusqu'à l'activation du blocage automatique." style="width:50%;" >}}

Le blocage peut être annulé ou prolongé depuis la [liste de refus][27].

{{<img src="security/ato/guide_denylist_menu.png" alt="Menu permettant d'accéder à la liste de refus, suivi des politiques." style="width:100%;" >}}

Si le signal n'était pas précis, vous pouvez extraire la liste des utilisateurs ou des adresses IP et l'ajouter manuellement à la liste de refus.

{{<img src="security/ato/guide_denylist_new.png" alt="Invite vous permettant d'ajouter une nouvelle adresse IP, un utilisateur ou un agent utilisateur à la liste de refus" style="width:80%;" >}}

#### Règles WAF intégrées {#in-app-waf-rules}

Si la liste de refus n'est pas suffisante, vous pouvez créer une règle WAF. Une règle WAF est évaluée plus lentement que la liste de refus, mais elle est plus flexible.

Pour créer une nouvelle règle, procédez comme suit :

1. Allez dans {{< ui >}}AAP{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [Custom Rules][33].
2. Cliquez sur {{< ui >}}Create New Rule{{< /ui >}} et terminez la configuration. 
3. Suivez les étapes dans {{< ui >}}Define your custom rule{{< /ui >}}.   
4. Dans {{< ui >}}Select the services you want this rule to apply to{{< /ui >}}, sélectionnez votre service de connexion, ou tout autre service pour lequel vous souhaitez bloquer les requêtes. Vous pouvez également cibler le blocage sur la route de connexion.
{{<img src="security/ato/guide_waf_blocking.png" alt="Capture d'écran de la fenêtre modale de création de règle WAF sélectionnant une route spécifique sur un service spécifique" style="width:100%;" >}}
5. Dans {{< ui >}}If incoming requests match these conditions{{< /ui >}}, configurez les conditions de la règle. <!-- The following example uses the user agent. -->   
   1. Si vous souhaitez bloquer un agent utilisateur spécifique, vous pouvez le coller dans {{< ui >}}Values{{< /ui >}}. Dans {{< ui >}}Operator{{< /ui >}}, vous pouvez utiliser {{< ui >}}matches value in list{{< /ui >}}, ou si vous souhaitez plus de flexibilité, vous pouvez également utiliser un {{< ui >}}Matches RegEx{{< /ui >}}.
{{<img src="security/ato/guide_waf_blocking_ua.png" alt="Une capture d'écran d'un user agent en cours de blocage" style="width:100%;" >}}
6. Utilisez la section {{< ui >}}Preview matching traces{{< /ui >}} comme examen final de l'impact de la règle. Si aucune trace inattendue n'est affichée, sélectionnez un mode de blocage et enregistrez la règle. 

La réponse est automatiquement transmise aux traceurs et les traces bloquées apparaissent dans l'[Explorateur de traces][25].

{{<img src="security/ato/guide_waf_blocking_traces.png" alt="Tableau montrant les traces correspondant à vos règles" style="width:100%;" >}}

Plusieurs actions de blocage sont disponibles. Selon la sophistication des attaquants, vous pourriez souhaiter une réponse plus furtive afin qu'ils ne réalisent pas immédiatement qu'ils ont été bloqués.

Pour plus d'informations, consultez [Règles WAF intégrées][34].

#### Exportation automatisée des données {#automated-data-export}

Vous pouvez configurer un signal pour envoyer n'importe quel identifiant utilisateur via un webhook. Cette méthode peut être utilisée pour envoyer les utilisateurs compromis vers vos systèmes et réinitialiser leurs identifiants ou les restreindre. L'objectif est de rendre ces comptes inutilisables pour l'attaquant.

<div class="alert alert-info">Toutes les règles ne sont pas compatibles avec cette fonctionnalité. Parmi les règles prêtes à l'emploi, les règles compatibles sont :
<ul>
 <li>Campagne de credential stuffing distribuée (empreinte de l'attaquant)</li>
 <li>Attaque par force brute</li>
 <li>Attaque par credential stuffing</li>
</ul>
</div>

Pour configurer un signal afin de transmettre un identifiant utilisateur via un webhook, procédez comme suit : 
1. Configuration d'une [cible de webhook standard][28]. Pour voir comment cela fonctionne dans Cloud SIEM, accédez à [Automatiser la remédiation des menaces détectées avec des webhooks][29].
2. Dans [Règles de détection][30], ouvrez les règles que vous souhaitez configurer. 
{{<img src="security/ato/guide_detection_rules.png" alt="Tableaux des règles de détection liées à l'ATO" style="width:100%;" >}}
3. Accédez aux paramètres de notification dans une condition de règle de détection. 
4. Ajoutez un destinataire et activez {{< ui >}}Notify{{< /ui >}} pour chaque nouveau `@usr.id` détecté. Cela vous permet d'exporter la liste lorsque des mises à jour se produisent.

{{<img src="security/application_security/threats/notify-on-update.png" alt="Bascule de notification lors d'une mise à jour dans l'éditeur de règles de détection" style="width:100%;">}}

Les cibles de notification définies dans la condition de la règle de détection reçoivent un message lorsque de nouveaux identifiants utilisateur sont détectés. Les profils de notification surveillant ces signaux ne reçoivent pas d'alertes pour les nouveaux identifiants utilisateur.

Pour recevoir les identifiants utilisateur ciblés et compromis avec un webhook, configurez un webhook en utilisant l'intégration de webhook Datadog. Incluez la variable `$SECURITY_SIGNAL_ATTRIBUTES` dans la charge utile du webhook. Les identifiants utilisateur sont stockés sous le chemin `@usr.id` dans la charge utile JSON.

{{<img src="security/application_security/threats/notify-on-update-payload.png" alt="Exemple de charge utile pour la notification lors d'une mise à jour" style="width:100%;">}}

En analysant la charge utile, vous pouvez agir sur les identifiants dans vos propres systèmes. 

**Important :** La liste contient uniquement les identifiants détectés depuis la dernière notification. Les identifiants ne sont pas dédoublonnés s'ils se connectent à nouveau.

### Étape 3.5 : Surveiller {#step-35-monitor}

Une fois que l'attaquant a introduit la réponse, il peut suspendre ou adapter son attaque. Continuez à surveiller le taux de tentatives de connexion après l'introduction de la réponse, en particulier les échecs. Les attaques peuvent s'interrompre pour ne reprendre qu'après quelques minutes, heures ou jours. 

Si une attaque à grande échelle reprend, le signal de credential stuffing distribué doit se réexécuter. Dans ce cas, examinez les considérations suivantes :

* Les attaquants persistants nécessitent souvent plusieurs itérations de mesures défensives avant d'abandonner.
* La défense idéale est une stratégie de blocage robuste que l'attaquant ne peut pas contourner.
* Les attaquants tentent fréquemment d'échapper à la détection en modifiant les adresses IP et les agents utilisateurs. Ils sont moins susceptibles de modifier en profondeur le script qu'ils ont obtenu pour envoyer leurs tentatives de connexion, les en-têtes sont donc une cible plus résiliente.
* Les stratégies efficaces incluent des méthodes basées sur le fingerprinting ou la corrélation qui identifient les combinaisons d’en-têtes rares.
* Surveillez le trafic bloqué résultant des réponses défensives précédentes.
* Le blocage du trafic de l'attaquant peut bloquer par inadvertance le trafic légitime. Mettez en œuvre des mécanismes pour débloquer le trafic légitime, soit en adaptant la réponse Datadog, soit en vous assurant qu'il est débloqué après l'attaque.

### Étape 3.6 : Nettoyage {#step-36-cleanup}

Après quelques jours sans activité significative de l'attaquant, vous pouvez considérer que l'attaque est terminée et passer à une phase de nettoyage. 

Les objectifs de la phase de nettoyage sont les suivants :

- Désactivez toutes les mesures d'atténuation qui ont été ajoutées.  
- Assurez-vous qu'aucun trafic légitime n'est bloqué.  
- Identifiez les opportunités de renforcer les services contre les futures attaques.  
- Identifiez la source des données que l'attaquant a utilisées contre les utilisateurs.

#### Désactivation des mesures d'atténuation {#disabling-mitigations}

Le blocage des utilisateurs doit être basé sur la minuterie que vous avez définie lorsque vous avez sélectionné {{< ui >}}Block All Attacking IPs{{< /ui >}} dans le signal. Cette configuration de blocage des utilisateurs ne nécessite aucune action supplémentaire.

Si vous avez configuré un blocage permanent, débloquez les utilisateurs et les adresses IP de la liste de refus en procédant comme suit : 

1. Ouvrez le [Denylist][27].  
2. Cliquez sur {{< ui >}}Blocked IPs{{< /ui >}} ou {{< ui >}}Blocked users{{< /ui >}}.  
3. Dans la liste des entités, localisez l'IP ou l'utilisateur, puis cliquez sur {{< ui >}}Unblock{{< /ui >}}.

<!-- <insert up to date screenshot\> -->

#### Désactivez ou supprimez toute(s) règle(s) In-App WAF personnalisée(s) {#disable-or-delete-any-custom-in-app-waf-rules}

Pour désactiver ou supprimer une ou plusieurs règles In-App WAF personnalisées, accédez à la [page des règles WAF personnalisées][33] et désactivez les règles en cliquant sur {{< ui >}}Monitoring{{< /ui >}} ou {{< ui >}}Blocking{{< /ui >}}, puis en sélectionnant {{< ui >}}Disable Rule{{< /ui >}}. 

Si la règle n'est plus pertinente, vous pouvez la supprimer en cliquant sur plus d'options ({{< ui >}}...{{< /ui >}}) et en sélectionnant {{< ui >}}Delete{{< /ui >}}.

#### Vérifiez qu'aucun trafic légitime n'est bloqué {#validate-no-legitimate-traffic-is-blocked}

Pour vérifier qu'aucun trafic légitime n'est bloqué, le volume de trafic doit correspondre étroitement à celui de l'attaque, avec pratiquement aucune trace bloquée en dehors des vagues principales.

Pour vérifier qu'aucun trafic légitime n'est bloqué, procédez comme suit :

1. Accédez à [Traces][25] et recherchez les traces bloquées avec la recherche `@appsec.blocked:true`.   
2. Si vous constatez un trafic important bloqué de manière continue, il est probable que ce trafic provienne d'utilisateurs légitimes.
   1. Désactivez la règle de blocage incorrecte pour éviter de bloquer d'autres utilisateurs. 
   2. Donnez la priorité au déblocage de ce trafic depuis la [Denylist][27].

#### Renforcement de vos services {#hardening-your-services}

Les campagnes ATO de grande envergure sont rarement un événement isolé. Vous pouvez tirer parti du temps entre les attaques pour renforcer vos services et établir des configurations que vous pourrez utiliser lors d'attaques ultérieures.

Voici quelques exemples courants de renforcement :

* **Limitation du débit des tentatives de connexion par IP/utilisateur/plage réseau/user agent :** Cette fonctionnalité de blocage léger vous permet de réduire considérablement l'ampleur de l'attaque dans certaines circonstances, avec un impact minimal sur les utilisateurs normaux, même s'ils partagent des caractéristiques avec l'attaquant.  
* **Ajout de friction lors de la connexion :** Pour briser l'automatisation des attaquants sans affecter de manière significative les utilisateurs, utilisez des captchas ou modifiez le flux de connexion pendant une attaque (par exemple, exigez qu'un jeton soit récupéré à partir d'un nouvel endpoint).
* **Appliquez l'authentification multifacteur (MFA) :** Datadog a constaté que la MFA est extrêmement efficace pour empêcher la compromission de comptes. Vous pourriez exiger de vos utilisateurs les plus privilégiés qu'ils utilisent la MFA, surtout pendant les attaques. 
* **Limiter les actions sensibles pour les utilisateurs :** Si vos services permettent aux utilisateurs d'effectuer des actions sensibles (dépenser de l'argent, accéder à des informations sensibles, modifier des coordonnées, etc.), vous pourriez vouloir interdire les utilisateurs à haut risque ayant des connexions suspectes jusqu'à ce qu'ils soient examinés manuellement ou via une authentification multifacteur. Les connexions suspectes peuvent être transmises par programmation à vos systèmes par Datadog via un webhook.  
* **Capacité à consommer les résultats des signaux par programmation :** Créer un endpoint pour consommer les webhooks Datadog et prendre automatiquement des mesures contre les utilisateurs/IP/traits suspects.

#### Identification de la source de données de l'attaquant {#identifying-the-attacker-data-source}

Les attaquants acquièrent des listes de comptes compromis en masse. En identifiant la source de leur base de données, vous pouvez identifier de manière proactive les utilisateurs à risque. 

Pour identifier la source de leur base de données, exportez les utilisateurs impactés par l'attaque en utilisant l'une de ces options :

* Dans les détails du signal, dans {{< ui >}}Targeted users{{< /ui >}}, cliquez sur {{< ui >}}Export to CSV{{< /ui >}}. Cette option permet d'exporter jusqu'à 10 k utilisateurs.   
* Si vous devez exporter plus de 10 k utilisateurs, paginez manuellement votre requête en effectuant des [appels API][31] manuels. L'explorateur de traces effectue des appels similaires, vous pouvez donc baser vos requêtes sur l'appel qu'il effectue en regroupant par `@appsec.events_data.usr.login`. Définissez la limite sur 10 000 et utilisez des plages temporelles plus courtes pour éviter la limite du backend.

{{<img src="security/ato/guide_user_table.png" alt="Tableau montrant les utilisateurs ciblés par l'attaque. Un utilisateur est affiché dans une pastille car nous disposons d'un panneau latéral avec plus d'activité le concernant" style="width:100%;" >}}

Lorsque vous disposez d'une liste, examinez-la pour trouver des attributs communs : 
- Si tous les utilisateurs proviennent d'une seule région ou d'un seul client. 
- Une grande majorité d'utilisateurs partagent une compromission connue (utilisez l'API [Have I Been Pwned][32]).

Lorsque la source de la base de données est identifiée, forcez de manière proactive une réinitialisation du mot de passe de ces clients ou marquez-les comme présentant un risque plus élevé. Cela renforce la certitude que les futures connexions suspectes ont effectivement été compromises.

#### Examiner l'activité supplémentaire de l'attaquant {#review-additional-attacker-activity}

En tirant parti de la signature de l'attaquant, étendez les filtres pour examiner les activités autres que la connexion qu'il a effectuées. 

Ce filtre peut être moins précis. Par exemple, un filtre qui correspond à la signature d'une application mobile avec un trafic légitime, mais qui a été clonée par l'attaquant pour son attaque. Le filtre pourrait montrer les recherches effectuées par l'attaquant à l'avance et donner des indices sur ce que l'attaquant pourrait chercher à faire ensuite.

Vous pouvez également pivoter sur l'infrastructure utilisée par l'attaquant. Ces adresses IP malveillantes ont-elles fait autre chose que des connexions ? Accèdent-elles à d'autres API sensibles ?

## Conclusion {#conclusion}

Le vol de compte est une menace courante, mais aussi beaucoup plus complexe que les exploits par injection traditionnels. Les détecter nécessite une intégration étroite avec vos systèmes et implique suffisamment d'incertitude pour que des réponses automatisées ne soient pas possibles pour les attaques les plus avancées.  

Dans ce guide, vous avez effectué les opérations suivantes : 
- Appris à quoi peuvent ressembler les campagnes de prise de contrôle de compte, comment les trier et comment les contrer.
- Instrumenté vos services de connexion pour fournir à Datadog AAP tout le contexte dont il a besoin.
- Configuré vos services de connexion pour fournir toutes les capacités au moment de l'attaque. 

Ceci est une orientation générale. Selon vos applications et vos environnements, il pourrait être nécessaire de prévoir des stratégies de réponse supplémentaires.

[1]: /fr/security/application_security/account_takeover_protection/
[2]: https://app.datadoghq.com/services?query=service%3Auser-auth&env=%2A&fromUser=false&hostGroup=%2A&lens=Security&sort=-fave%2C-team&start=1735636008863&end=1735639608863
[3]: /fr/security/application_security/setup/compatibility/
[4]: /fr/remote_configuration
[5]: https://app.datadoghq.com/security/appsec/onboarding
[6]: https://app.datadoghq.com/security/appsec/traces?query=&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036043639&end=1735640843639&paused=false
[7]: /fr/security/application_security/setup/threat_detection/
[8]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735036164646&end=1735640964646&paused=false
[9]: /fr/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-user-activity-event-tracking
[10]: /fr/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[11]: /fr/tracing/guide/remote_config/
[12]: https://app.datadoghq.com/organization-settings/remote-config?resource_type=agents
[13]: /fr/security/application_security/how-it-works/add-user-info/?tab=set_user#tracking-business-logic-information-without-modifying-the-code
[14]: https://app.datadoghq.com/security/appsec/threat
[15]: /fr/security/application_security/account_takeover_protection/#attacker-strategies
[16]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[17]: /fr/security/notifications/
[18]: https://app.datadoghq.com/security/configuration/notification-rules/new?notificationData=
[19]: /fr/security/notifications/#notification-channels
[20]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[21]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.security_activity%3Abusiness_logic.users.login.%2A&agg_m=count&agg_m_source=base&agg_t=count&fromUser=false&track=appsecspan&start=1735222832468&end=1735827632468&paused=false
[22]: https://securitylabs.datadoghq.com/articles/challenges-with-ip-spoofing-in-cloud-environments/#what-should-you-do
[23]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&sort=date&viz=rules
[24]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules&ruleId=newRule
[25]: https://app.datadoghq.com/security/appsec/traces
[26]: https://app.datadoghq.com/security
[27]: https://app.datadoghq.com/security/appsec/denylist
[28]: /fr/api/latest/webhooks-integration/
[29]: /fr/security/cloud_siem/guide/automate-the-remediation-of-detected-threats/
[30]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20tag%3A%22category%3Aaccount_takeover%22&deprecated=hide&groupBy=none&mitreFilters=%7B%22visualize%22%3A%7B%22value%22%3A%5B%22all%22%5D%2C%22excluded%22%3Afalse%7D%2C%22ruleDensity%22%3A%7B%22value%22%3A%5B%5D%2C%22excluded%22%3Afalse%7D%7D&sort=date&viz=rules
[31]: /fr/api/latest/spans/#aggregate-spans
[32]: https://haveibeenpwned.com/
[33]: https://app.datadoghq.com/security/appsec/in-app-waf?column=services-count&config_by=custom-rules
[34]: /fr/security/application_security/policies/inapp_waf_rules/