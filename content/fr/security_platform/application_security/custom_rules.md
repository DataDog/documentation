---
further_reading:
- link: /security_platform/application_security/
  tag: Documentation
  text: Surveiller les menaces avec la solution Application Security Monitoring de
    Datadog
- link: /security_platform/application_security/troubleshooting
  tag: Documentation
  text: Résoudre les problèmes courants rencontrés avec la solution Application Security
    Monitoring de Datadog
kind: documentation
title: Règles de détection personnalisées
---

## Présentation

La solution Application Security Monitoring (ASM) inclut un ensemble de [règles de détection prêtes à l'emploi][1] qui permettent de détecter les tentatives d'attaque et les exploitations de vulnérabilité qui ont une incidence sur vos systèmes de production.

Toutefois, il est parfois utile de personnaliser une règle afin de l'adapter à votre environnement. Par exemple, vous pouvez modifier une règle de détection afin d'identifier les tentatives d'attaque sur une route de développement en préproduction prenant en charge le SQL et de renvoyer les résultats. L'identification des tentatives SQL peut générer des alertes inutiles, car la route est uniquement utilisée par les développeurs internes. Vous pouvez donc choisir de personnaliser cette règle afin d'exclure certains patterns.

Les règles personnalisées vous permettant également d'exclure un scanneur de sécurité interne. La solution ASM continue à détecter l'activité du scanneur, mais vous ne recevrez plus de notifications régulières.

Pour ces scénarios, la personnalisation d'une règle de détection vous permet d'exclure certains événements. Ce guide explique comment créer une règle de détection personnalisée pour ASM.

## Configuration

Pour personnaliser une règle de détection prête à l'emploi, vous devez commencer par dupliquer une règle existante. Accédez à vos [règles de détection][2] et sélectionnez-en-une. Faites défiler jusqu'au bas de la règle, puis cliquez sur le bouton Clone Rule, afin de pouvoir y apporter des modifications.

### Définir une requête ASM

Rédigez une requête ASM. Vous pouvez par exemple créer une requête visant à surveiller les tentatives d'injection SQL sur un endpoint : `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

Si vous le souhaitez, vous pouvez détecter le nombre de valeurs uniques et regrouper les signaux. Comptez le nombre de valeurs uniques observées pour un attribut dans un intervalle de temps donné. Le critère de regroupement génère un signal pour chaque groupe en fonction de la valeur. Il correspond généralement à une entité (par exemple, un utilisateur, une adresse IP, etc.) et peut également être utilisé pour [rassembler des requêtes](#rassemblement-de-requetes).

Vous pouvez ajouter des requêtes supplémentaires à l'aide du bouton Add Query.

##### Options avancées

Cliquez sur l'option **Advanced** pour ajouter des requêtes qui déclenchent uniquement un signal pour une certaine valeur (avec **Only trigger a signal when:**) ou ne déclenche jamais de signal (avec **Never trigger a signal when:**). Par exemple, si un service déclenche un signal, mais que l'action associée n'a aucune incidence et que vous ne souhaitez plus recevoir de signaux de la part de ce service, vous pouvez créer une requête de log qui exclut le `Service` avec l'option **Never trigger a signal when:**.

##### Rassemblement de requêtes

Lorsque vous rassemblez plusieurs requêtes au sein d'un intervalle donné, vous pouvez renforcer la fiabilité ou la gravité d'un signal de sécurité. Par exemple, pour détecter une attaque réussie, vous pouvez corréler les déclenchements qui ont réussi et échoué pour un service.

Les requêtes sont corrélées entre elles à l'aide d'une valeur de regroupement (`group by`). Cette dernière correspond généralement à une entité (par exemple, `IP address` or `Service`), mais peut également être définie sur l'attribut de votre choix.

Prenons l'exemple de deux requêtes, l'une étant l'inverse de l'autre. Ces deux requêtes analysent la même activité `sql_injection`, mais ajoutent des chemins HTTP contraires pour les tentatives fructueuses et infructueuses :

Requête 1 : `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

Requête 2 : `@appsec.type:sql_injection @http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

Dans cet exemple, les requêtes regroupées possèdent la même valeur d'attribut : en effet, la valeur doit être identique pour que le scénario se réalise. Si une valeur `group by` n'existe pas, le scénario ne peut pas se réaliser. Un signal de sécurité est généré pour chaque valeur `group by` unique lorsqu'un scénario se réalise.

### Définir un scénario de règle

#### Déclencheur

Les scénarios de règle, comme `successful trigger > 0`, sont évalués en tant qu'instructions de scénario. Ainsi, le premier scénario qui se réalise génère le signal. Créez un ou plusieurs scénarios de règle, puis cliquez sur la zone grise en regard des scénarios pour modifier leur ordre en les faisant glisser.

Un scénario de règle comporte des opérations logiques (`>, >=, &&, ||`) afin de déterminer si un signal doit ou ne doit pas être généré en fonction du nombre d'événements des requêtes définies au préalable.

**Remarque** : l'étiquette de requête doit être placée avant l'opérateur. Ainsi, `a > 3` est valide, mais pas `3 < a`.

Attribuez un nom à chaque scénario de règle sous le champ **name**. Ce nom est ajouté en préfixe du nom de la règle lorsqu'un signal est généré.

#### Gravité et notification

Choisissez la gravité du signal en sélectionnant le niveau approprié dans la liste déroulante, parmi les valeurs suivantes : `INFO`, `LOW`, `MEDIUM`, `HIGH` et `CRITICAL`.

Dans la section Notify, vous pouvez définir une ou plusieurs [cibles de notification][3] pour chaque scénario de règle.

Il est également possible de créer des [règles de notification][4], afin de simplifier la modification des préférences de notification pour chaque règle de détection.

### Intervalle de temps

Vous devez spécifier un intervalle de temps (`evaluation window`) à appliquer en cas de réalisation d'un scénario. Il s'agit d'une période glissante évaluée en temps réel.

Lorsqu'un signal est généré, il demeure ouvert tant que le scénario se réalise au moins une fois dans cet intervalle `keep alive`. Chaque fois qu'un nouvel événement correspond à l'un des scénarios, le timestamp *last updated* (dernière mise à jour) du signal s'actualise.

Un signal se ferme dès lors que sa durée dépasse la valeur spécifiée pour `maximum signal duration`, peu importe si la requête entraîne ou non des résultats. Cette durée est calculée à partir du timestamp de la première réalisation du scénario.

Vous pouvez ajouter des scénarios supplémentaires en cliquant sur le bouton **Add Case**.

**Remarque** : l'intervalle `evaluation window` doit être inférieur ou égal aux intervalles `keep alive` et `maximum signal duration`. 

### Say what's happening

Définissez dans la section **Rule name** le nom de la règle qui apparaît dans la liste des règles, ainsi que le titre du signal.

La zone de notification prend en charge le format Markdown et vous permet de visualiser un aperçu du message.

#### Template variables

La zone de notification des règles de détection prend non seulement en charge le Markdown, mais également les template variables. Ces dernières permettent d'injecter directement dans un signal de sécurité, et les notifications associées, des éléments de contexte dynamiques depuis des traces.

Grâce aux template variables, vous pouvez également créer des liens profonds vers Datadog ou le portail d'un partenaire, afin de pouvoir accéder facilement aux vues dont vous avez besoin pour résoudre des problèmes. Exemple :

```text
* [Étudier le service dans le dashboard dédié](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

Les templates variables au format epoch créent au sein d'une notification une chaîne lisible ou un nombre réutilisable. Utilisez par exemple des valeurs comme `first_seen`, `last_seen` ou `timestamp` (en millisecondes) dans une fonction pour recevoir une notification avec une chaîne lisible. Exemple :

```text
{{eval "first_seen_epoch-15*60*1000"}}
```

Les attributs sont consultables depuis la liste déroulante JSON d'un signal. Ils peuvent également être réutilisés avec la syntaxe suivante : `{{@attribute}}`. Vous pouvez accéder aux clés internes des attributs d'un événement à l'aide de la syntaxe JSON suivante : `{{@attribut.clé_interne}}`).

**Remarque** : vous pouvez copier du JSON brut directement depuis un signal de sécurité. Sélectionnez un signal de sécurité dans le Signals Explorer pour afficher ses détails. Cliquez sur le bouton d'exportation en haut à gauche, puis sélectionnez **Copy raw JSON to clipboard**.

L'objet JSON suivant comporte un attribut d'événement pouvant être associés à un signal de sécurité :

```json
{
  "attributes":{
    "title":"Scanneur de sécurité détecté",
    "http":{
      "url":"http://www.example.com"
    },
    "rule":{
      "detectionMethod":"threshold",
      "name":"Le nom de votre règle"
    },
    "events_matched":2,
    "first_seen":"2022-01-26T13:23:33.000Z",
    "last_seen":"2022-01-27T04:01:57.000Z"
  },
  "groupByPaths":[
    "service"
  ]
}
```

Pour cet attribut, indiquez ce qui suit dans la section « Say what's happening » :

```
Routes réelles ciblées pour {{@service}}.
```

Cela vous permet d'indiquer le nom de votre service dans n'importe quelle notification que vous recevez.

```
Routes réelles ciblées pour `your_service_name`.
```

Vous pouvez également utiliser une logique if/else pour vérifier si un attribut existe. Exemple :

```
{{#if @network.client.ip}}L'attribut IP existe.{{/if}}
```

Cette même logique if/else vous permet également de vérifier si un attribut correspond à une valeur 

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}L'IP correspond.{{/is_exact_match}}
```

Vous pouvez appliquer différents tags à vos signaux, comme `attack:sql-injection-attempt`.

**Remarque** : `security` est un tag particulier. Il sert à classifier les signaux de sécurité. Il est recommandé d'utiliser les valeurs suivantes : `attack`, `threat-intel`, `compliance`, `anomaly` et `data-leak`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security_platform/default_rules/#cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /fr/monitors/notify/?tab=is_alert#integrations
[4]: /fr/security_platform/notification_rules/