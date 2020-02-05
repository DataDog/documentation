---
title: Règles sécuritaires de détection
kind: documentation
further_reading:
  - link: /security_monitoring/explorer
    tag: Documentation
    text: Faire des recherches sur l'ensemble de vos signaux de sécurité et effectuer une analyse de la sécurité
---
<div class="alert alert-warning">
Les règles de détection des menaces pour le contrôle de la sécurité sont en version bêta privée.
</div>

## Présentation

Les règles de détection définissent la logique conditionnelle appliquée à l'ensemble des logs ingérés. Lorsqu'un scénario d'une règle se réalise lors d'une période donnée, Datadog génère un signal de sécurité.

## Créer des règles de détection

Pour créer une règle de détection dans Datadog, utilisez la navigation principale : **Security** → **Detection Rules** --> **New Rule**.

### Définir la requête de recherche

{{< img src="security_monitoring/detection_rules/define_search_query.png" alt="Définir la requête de recherche" responsive="true">}}

Rédigez une requête de recherche en suivant la même logique que pour les [recherches dans le Log Explorer][1]. Chaque requête possède une étiquette, qui correspond à une lettre minuscule ASCII. Vous pouvez modifier le nom d'une requête en cliquant sur l'icône en forme de crayon.

Si vous le souhaitez, vous pouvez mettre en place un regroupement des signaux. Le critère de regroupement génère un signal pour chaque groupe en fonction de sa valeur. Le critère de regroupement correspond généralement à une entité (p. ex., un utilisateur, une adresse IP, etc.). Il peut également être utilisé pour [rassembler des requêtes](#rassemblement-de-requetes).

Ajoutez des requêtes supplémentaires à l'aide du bouton Add Query.

**Remarque** : la requête s'applique à l'ensemble des événements Datadog et des logs ingérés ne nécessitant pas d'indexation.



### Définir les scénarios de la règle

#### Nom et déclencheur des scénarios de la règle

Les scénarios d'une règle, tels que `a > 3`, sont évalués en tant qu'instruction de scénario. Ainsi, le premier scénario qui se réalise génère le signal. Cliquez sur vos scénarios de règle et faites-les glisser pour modifier leur priorité.

Un scénario de règle contient des opérations logiques (`>, >=, &&, ||`) afin de déterminer si un signal doit ou ne doit pas être généré en fonction du total d'événements des requêtes définies au préalable. Les [étiquettes de requête](#definir-la-requete-de-recherche) en minuscules ASCII sont abordées dans cette section.

**Remarque** : l'étiquette de requête doit être placée avant l'opérateur. Ainsi, `a < 3` est valide, mais pas `3 > a`.

Renommez chaque scénario de règle sous le champ **name**, par exemple « Scénario 1 ». Ce nom est ajouté en préfixe du nom de la règle lorsqu'un signal est généré.

#### Sévérité et notification

Choisissez la sévérité du signal de sécurité en sélectionnant le niveau approprié dans la liste déroulante, parmi les valeurs suivantes : `INFO`, `LOW`, `MEDIUM`, `HIGH` et `CRITICAL`.

Dans la section « Notify », vous pouvez définir une ou plusieurs personnes à prévenir pour chaque scénario de règle.

#### Intervalle de temps

Vous devez spécifier un intervalle de temps à appliquer en cas de réalisation d'un scénario. Il s'agit d'une période glissante évaluée en temps réel.

Une fois le signal généré, il demeure ouvert tant que le scénario se réalise au moins une fois dans cet intervalle de conservation. Chaque fois qu'un nouvel événement correspond à l'un des scénarios, le timestamp *last updated* (dernière mise à jour) du signal s'actualise.

Un signal se ferme dès lors que sa durée dépasse la valeur maximale, peu importe si la requête entraîne ou non des résultats. Cette durée est calculée à partir du timestamp de la première réalisation du scénario.

Vous pouvez ajouter des scénarios supplémentaires en cliquant sur le bouton **Add Case**.

### Message du signal de sécurité

Tout comme les [notifications de monitor][2], la zone de notification prend en charge le format Markdown et vous permet de visualiser un aperçu du message.

Définissez dans la section **Rule name** le nom de la règle qui apparaît dans la liste des règles, ainsi que le titre du signal de sécurité.

Vous pouvez appliquer différents tags à vos signaux, comme `security:attack` ou `technique:T1110-brute-force`.

**Remarque** : `security` est un tag particulier. Il sert à classifier les signaux de sécurité. Nous vous recommandons d'utiliser les valeurs suivantes : `attack`, `threat-intel`, `compliance`, `anomaly` et `data-leak`.

### Rassemblement de requêtes

Lorsque vous rassemblez plusieurs logs au sein d'un intervalle donné, vous pouvez renforcer la fiabilité ou la sévérité d'un signal de sécurité. Par exemple, pour détecter une attaque par force brute réussie, vous devez corréler les logs des échecs et des réussites d'authentification d'un utilisateur.

{{< img src="security_monitoring/detection_rules/joining_queries_define.png" alt="Définir des requêtes de recherche" responsive="true" >}}

Les règles de détection se basent sur une valeur de regroupement pour rassembler des logs. Cette valeur correspond généralement à une entité (p. ex., une adresse IP, un utilisateur, etc.), mais peut également être définie sur l'attribut de votre choix.

{{< img src="security_monitoring/detection_rules/group_by.png" alt="Regroupement" responsive="true" >}}

Les scénarios de règle de détection rassemblent ces requêtes en se basant sur leur valeur de regroupement. L'attribut de regroupement est généralement commun, car la réalisation du scénario se base sur une valeur unique. Si la valeur de regroupement n'existe pas, le scénario ne peut pas se réaliser. Lorsqu'un scénario se réalise, un signal de sécurité est généré pour chaque valeur de regroupement unique.

{{< img src="security_monitoring/detection_rules/set_rule_cases2.png" alt="Définir des scénarios de règle" responsive="true" >}}

Dans l'exemple ci-dessus, dès que l'utilisateur `@usr.name` enregistre cinq tentatives échouées de connexion, puis parvient à se connecter, le premier scénario se réalise et un signal de sécurité est généré.

{{< img src="security_monitoring/detection_rules/gbv2.png" alt="Définir des scénarios de règle" responsive="true">}}

## Gérer les règles de détection

Depuis la page [Security Configuration Detection Rules][3], vous pouvez effectuer des recherches sur l'ensemble de vos règles de détection. Vous pouvez ainsi activer, désactiver, modifier, supprimer, dupliquer ou consulter en quelques secondes les signaux générés par l'une de vos règles. Cette vue vous permet également de [créer une règle][4] de A à Z.

### Isoler des règles

La recherche en texte libre filtre les règles de détection en fonction du texte figurant dans leur nom ou leur requête. Les résultats des requêtes se mettent à jour en temps réel lorsque vous modifiez une requête. Vous n'avez donc pas besoin de cliquer sur le moindre bouton pour lancer la recherche.

### Tableau des règles de détection

{{< img src="security_monitoring/detection_rules/rules_table2.png" alt="Tableau des règles de détection" responsive="true" >}}

Les règles de détection s'affichent dans ce tableau.

Configurez son contenu et les préférences associées à l'aide du bouton Options. Vous pouvez afficher la date de création ainsi que l'ID de la règle dans des colonnes supplémentaires.

Par défaut, les règles de détection sont triées par ordre alphabétique. Vous pouvez inverser leur tri en fonction de leur nom, du nom de leur requête, de leur date de création ou de leur ID.

#### Activation et désactivation d'une règle

Activez ou désactivez une règle à l'aide du bouton d'activation sur la droite.

#### Modification d'une règle

Passez le curseur sur une règle et appuyez sur le bouton **Edit** pour la modifier.

#### Recherche de signaux générés par une règle

Passez le curseur sur une règle et cliquez sur le bouton **View Generated Signals** pour rechercher les signaux qu'elle a générés.

#### Duplication d'une règle

Passez le curseur sur une règle et appuyez sur le bouton **Clone** pour la dupliquer.

#### Suppression d'une règle

Passez le curseur sur une règle et appuyez sur le bouton **Delete** pour la supprimer.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}



[1]: /fr/logs/explorer/search
[2]: /fr/monitors/notifications
[3]: https://app.datadoghq.com/security/configuration/rules
[4]: https://app.datadoghq.com/security/configuration/rules/new