---
aliases:
- /fr/security_platform/application_security/custom_rules
- /fr/security/application_security/custom_rules
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Se protéger des menaces avec la solution Application Security Management de
    Datadog
- link: /security/application_security/event_rules/
  tag: Documentation
  text: Créer des règles dʼévénements
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Résoudre les problèmes courants rencontrés avec la solution Application Security
    Management de Datadog
- link: /security/notifications/variables/
  tag: Documentation
  text: En savoir plus sur les variables de notification de sécurité
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentation
  text: Syntaxe pour définir la requête ASM
title: Règles de détection personnalisées
---

## Présentation

La solution Application Security Management (ASM) inclut un ensemble de [règles de détection prêtes à l'emploi][1] qui permettent de détecter les tentatives d'attaque, les vulnérabilités identifiées par leurs auteurs et les abus de la logique opérationnelle qui ont une incidence sur vos systèmes de production.

Certaines situations justifient de personnaliser une règle en fonction de votre environnement ou workload. Par exemple, vous pouvez choisir de personnaliser une règle visant à détecter les utilisateurs qui effectuent des opérations sensibles dans une région où votre organisation n'est pas présente.

Les règles personnalisées vous permettant également d'exclure un scanneur de sécurité interne. La solution ASM continue à détecter l'activité du scanneur, mais vous ne recevrez plus de notifications régulières.

Pour ces scénarios, la personnalisation d'une règle de détection vous permet d'exclure certains événements. Ce guide explique comment créer une règle de détection personnalisée pour ASM.

## Règle de détection des abus de logique commerciale

ASM propose des règles prêtes à l'emploi pour détecter les abus de logique commerciale (par exemple, la réinitialisation d'un mot de passe par la force brute). Ces règles nécessitent [dʼajouter des informations sur la logique commerciale aux traces][7].

Les bibliothèques de tracing récentes de Datadog tentent de détecter et d'envoyer automatiquement les événements de connexion et d'inscription des utilisateurs sans quʼil ne soit nécessaire de modifier le code. Si nécessaire, vous pouvez [refuser le suivi automatique des événements de l'activité de l'utilisateur][8].

Vous pouvez filtrer les règles et identifier la logique commerciale à suivre. En outre, vous pouvez utiliser ces règles comme modèle pour créer des règles personnalisées basées sur votre propre logique commerciale. 

Consultez la section ci-dessous pour savoir comment configurer vos règles.

## Configuration

Pour personnaliser une règle de détection prête à l'emploi, vous devez commencer par dupliquer une règle existante. Accédez à vos [règles de détection][2] et sélectionnez-en une. Faites défiler jusqu'au bas de la règle, puis cliquez sur le bouton Clone Rule, afin de pouvoir y apporter des modifications.

### Définir une requête ASM

Créez une requête ASM en utilisant la [même syntaxe de requête que dans le Trace Explorer ASM][3]. Créez par exemple une requête pour surveiller les succès de connexion en dehors des États-Unis : `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

Si vous le souhaitez, vous pouvez détecter le nombre de valeurs uniques et regrouper les signaux. Comptez le nombre de valeurs uniques observées pour un attribut dans un intervalle de temps donné. Le critère de regroupement génère un signal pour chaque groupe en fonction de la valeur. Il correspond généralement à une entité (p. ex., un utilisateur, une adresse IP ou un service) et peut également être utilisé pour [rassembler des requêtes](#rassemblement-de-requetes).

Utilisez la section de prévisualisation pour voir quelless traces ASM correspondent à la requête de recherche. Vous pouvez également ajouter des requêtes supplémentaires en cliquant sur le bouton « Add Query ».

##### Rassemblement de requêtes

Lorsque vous rassemblez plusieurs requêtes au sein d'un intervalle donné, vous pouvez renforcer la fiabilité ou la gravité d'un signal de sécurité. Par exemple, pour détecter une attaque réussie, vous pouvez corréler les déclenchements qui ont réussi et échoué pour un service.

Les requêtes sont corrélées entre elles à l'aide d'une valeur de regroupement (`group by`). Cette dernière correspond généralement à une entité (par exemple, `IP` or `Service`), mais peut également être définie sur l'attribut de votre choix.

Prenons l'exemple de deux requêtes, l'une étant l'inverse de l'autre. Ces deux requêtes analysent la même activité `business_logic.users.login.success`, mais ajoutent des chemins HTTP contraires pour les tentatives fructueuses et infructueuses :

Requête 1 : `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`.

Requête 2 : `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

Dans cet exemple, les requêtes regroupées possèdent la même valeur d'attribut : en effet, la valeur doit être identique pour que le scénario se réalise. Si une valeur `group by` n'existe pas, le scénario ne peut pas se réaliser. Un signal de sécurité est généré pour chaque valeur `group by` unique lorsqu'un scénario se réalise.

### Exclure les activités bénignes à l'aide de requêtes de suppression

Dans le champ **Only generate a signal if there is a match**, vous pouvez saisir une requête de sorte qu'un déclencheur ne soit généré que lorsqu'une valeur est rencontrée.

Dans le champ **This rule will not generate a signal if there is a match**, vous pouvez saisir des requêtes de suppression afin quʼaucun déclencheur ne soit généré lorsque les valeurs sont rencontrées. Par exemple, si un service déclenche un signal, mais l'action est bénigne et vous ne souhaitez plus que des signaux soient déclenchés à partir de ce service, créez une requête qui exclut `service`.

### Définir un scénario de règle

#### Déclencheur

Les scénarios de règle, comme `successful login > 0`, sont évalués en tant qu'instructions de scénario. Ainsi, le premier scénario qui se réalise génère le signal. Créez un ou plusieurs scénarios de règle, puis cliquez sur la zone grise en regard des scénarios pour modifier leur ordre en les faisant glisser.

Un scénario de règle comporte des opérations logiques (`>, >=, &&, ||`) afin de déterminer si un signal doit ou ne doit pas être généré en fonction du nombre d'événements des requêtes définies au préalable.

**Remarque** : l'étiquette de requête doit être placée avant l'opérateur. Ainsi, `a > 3` est valide, mais pas `3 < a`.

Attribuez un nom à chaque scénario de règle sous le champ **name**. Ce nom est ajouté en préfixe du nom de la règle lorsqu'un signal est généré.

#### Gravité et notification

{{% security-rule-severity-notification %}}

### Intervalle de temps

{{% security-rule-time-windows %}}

Cliquez sur **Add Case** pour ajouter des scénarios supplémentaires.

**Remarque** : l'intervalle `evaluation window` doit être inférieur ou égal aux intervalles `keep alive` et `maximum signal duration`. 

### Section Say what's happening

{{% security-rule-say-whats-happening %}}

Le menu déroulant **Tag resulting signals** vous permet d'appliquer différents tags à vos signaux. Par exemple, `attack:sql-injection-attempt`.

**Remarque** : `security` est un tag particulier. Il sert à classifier les signaux de sécurité. Il est recommandé d'utiliser les valeurs suivantes : `attack`, `threat-intel`, `compliance`, `anomaly` et `data-leak`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /fr/tracing/trace_explorer/query_syntax/
[4]: /fr/monitors/notify/?tab=is_alert#integrations
[5]: /fr/security/notifications/variables/
[6]: /fr/security/notifications/variables/#template-variables
[7]: /fr/security/application_security/threats/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /fr/security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking