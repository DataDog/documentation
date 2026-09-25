---
aliases:
- /fr/security/application_security/policies/custom_rules/
- /fr/security_platform/application_security/custom_rules
- /fr/security/application_security/custom_rules
- /fr/security/application_security/threats/attacker_fingerprint
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protégez contre les menaces avec Datadog App and API Protection
- link: /security/application_security/threat_protection/policies/inapp_waf_rules/
  tag: Documentation
  text: Création de règles WAF dans l'application
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépanner les problèmes courants de Datadog App and API Protection
- link: /security/notifications/variables/
  tag: Documentation
  text: En savoir plus sur les variables de notification de Security
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentation
  text: Syntaxe pour définir la requête AAP
title: Règles de détection personnalisées
---
## Présentation {#overview}

App and API Protection (AAP) est fourni avec un ensemble de [règles de détection prêtes à l'emploi][1] qui visent à détecter les tentatives d'attaque, les vulnérabilités découvertes par les attaquants et les abus de logique métier qui impactent vos systèmes de production.

Cependant, il existe des situations où vous pourriez vouloir personnaliser une règle en fonction de votre environnement ou de votre charge de travail. Par exemple, vous pourriez vouloir personnaliser une règle de détection qui identifie les utilisateurs effectuant des actions sensibles depuis une géolocalisation où votre entreprise n'opère pas.

Un autre exemple est la personnalisation d'une règle pour exclure un scanner de sécurité interne. AAP détecte son activité comme prévu. Cependant, vous ne souhaitez peut-être pas être notifié de son scan régulier.

Dans ces situations, une règle de détection personnalisée peut être créée pour exclure de tels événements. Ce guide vous montre comment créer une règle de détection personnalisée pour AAP.

## Règle de détection d'abus de logique métier {#business-logic-abuse-detection-rule}

AAP propose des règles prêtes à l'emploi pour détecter les abus de logique métier (par exemple, la réinitialisation d'un mot de passe par force brute). Ces règles nécessitent [d'ajouter des informations de logique métier aux traces][7].

Les SDK Datadog récents tentent de détecter et d'envoyer automatiquement les événements de connexion et d'inscription des utilisateurs sans avoir besoin de modifier le code. Si nécessaire, vous pouvez [désactiver le suivi automatique des événements d'activité utilisateur][8].

Vous pouvez filtrer les règles et identifier la logique métier dont vous souhaitez commencer le suivi. De plus, vous pouvez utiliser ces règles comme modèle pour créer des règles personnalisées basées sur votre propre logique métier. 

Consultez la section ci-dessous pour savoir comment configurer vos règles.

## Configuration {#configuration}

Pour personnaliser une règle de détection prête à l'emploi, vous devez d'abord cloner une règle existante. Accédez à vos [Règles de détection][2] et sélectionnez une règle. Faites défiler jusqu'en bas de la règle et cliquez sur le bouton {{< ui >}}Clone Rule{{< /ui >}}. Cela vous permet désormais de modifier la règle existante.

### Définir une requête AAP {#define-an-aap-query}

Construisez une requête AAP en utilisant la [même syntaxe de requête que dans l'AAP Trace Explorer][3]. Par exemple, créez une requête pour surveiller les connexions réussies depuis l'extérieur des États-Unis : `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

Optionnellement, définissez un compte unique et un regroupement de signaux. Comptez le nombre de valeurs uniques observées pour un attribut dans un laps de temps donné. Le regroupement défini génère un signal pour chaque valeur de regroupement. Généralement, le regroupement est une entité (comme un utilisateur, une adresse IP ou un service). Le regroupement est également utilisé pour [joindre les requêtes entre elles](#joining-queries).

Utilisez la section de prévisualisation pour voir quelles traces AAP correspondent à la requête de recherche. Vous pouvez également ajouter des requêtes supplémentaires avec le bouton {{< ui >}}Add Query{{< /ui >}}.

##### Joindre des requêtes {#joining-queries}

Joindre des requêtes pour couvrir une période peut augmenter la confiance ou la gravité du signal de sécurité. Par exemple, pour détecter une attaque réussie, les déclencheurs réussis et infructueux peuvent être corrélés pour un service.

Les requêtes sont corrélées entre elles en utilisant une valeur `group by`. La valeur `group by` est généralement une entité (par exemple, `IP` ou `Service`), mais peut être n'importe quel attribut.

Par exemple, créez des requêtes opposées qui recherchent la même activité `business_logic.users.login.success`, mais ajoutez des requêtes de chemin HTTP opposées pour les tentatives réussies et infructueuses :

Requête 1 : `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`.

Requête 2 : `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

Dans ce cas, les requêtes jointes détiennent techniquement la même valeur d'attribut : la valeur doit être la même pour que le cas soit satisfait. Si une valeur `group by` n'existe pas, le cas ne sera jamais satisfait. Un signal de sécurité est généré pour chaque valeur `group by` unique lorsqu'un cas correspond.

### Exclure l'activité bénigne avec des requêtes de suppression {#exclude-benign-activity-with-suppression-queries}

Dans le champ {{< ui >}}Only generate a signal if there is a match{{< /ui >}}, vous avez la possibilité de saisir une requête afin qu'un déclencheur ne soit généré que lorsqu'une valeur est atteinte.

Dans le champ {{< ui >}}This rule will not generate a signal if there is a match{{< /ui >}}, vous avez la possibilité de saisir des requêtes de suppression afin qu'un déclencheur ne soit pas généré lorsque les valeurs sont atteintes. Par exemple, si un service déclenche un signal, mais que l'action est bénigne et que vous ne souhaitez plus que des signaux soient déclenchés par ce service, créez une requête qui exclut `service`.

### Définir un cas de règle {#set-a-rule-case}

#### Déclencheur {#trigger}

Les cas de règle, tels que `successful login > 0`, sont évalués comme des instructions de cas. Ainsi, le premier cas correspondant génère le signal. Créez un ou plusieurs cas de règle, puis cliquez sur la zone grise à côté d'eux pour les faire glisser et réorganiser leur ordre.

Un cas de règle contient des opérations logiques (`>, >=, &&, ||`) pour déterminer si un signal doit être généré en fonction des nombres d'événements dans les requêtes précédemment définies.

**Remarque** : L'étiquette de la requête doit précéder l'opérateur. Par exemple, `a > 3` est autorisé ; `3 < a` n'est pas autorisé.

Donnez un nom à chaque cas de règle. Ce nom est ajouté au nom de la règle lorsqu'un signal est généré.

#### Gravité et notification {#severity-and-notification}

{{% security-rule-severity-notification %}}

### Fenêtres temporelles {#time-windows}

{{% security-rule-time-windows %}}

Cliquez sur {{< ui >}}Add Case{{< /ui >}} pour ajouter des cas supplémentaires.

**Remarque** : Le `evaluation window` doit être inférieur ou égal au `keep alive` et au `maximum signal duration`.

### Indiquez ce qui se passe {#say-whats-happening}

{{% security-rule-say-whats-happening %}}

Utilisez le menu déroulant {{< ui >}}Tag resulting signals{{< /ui >}} pour ajouter des tags à vos signaux. Par exemple, `attack:sql-injection-attempt`.

**Remarque** : Le tag `security` est spécial. Ce tag est utilisé pour classer le signal de sécurité. Les options recommandées sont : `attack`, `threat-intel`, `compliance`, `anomaly` et `data-leak`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /fr/tracing/trace_explorer/query_syntax/
[4]: /fr/monitors/notify/?tab=is_alert#integrations
[5]: /fr/security/notifications/variables/
[6]: /fr/security/notifications/variables/#template-variables
[7]: /fr/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /fr/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking