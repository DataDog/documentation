---
aliases:
- /fr/security/cloud_siem/entities_and_risk_scoring
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentation
  text: Synchronisez les identités des utilisateurs dans Cloud SIEM avec Entity Packs
- link: https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/
  tag: Blog
  text: Accélérez les enquêtes avec Datadog Cloud SIEM Risk-based Insights et AWS
    Entity Analytics
- link: https://www.datadoghq.com/blog/ai-powered-threat-analysis
  tag: Blog
  text: 'L''IA dans les enquêtes de sécurité cloud : le rôle de l''UEBA et d''une
    meilleure télémétrie'
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Nouveautés dans Cloud SIEM : enquêtes assistées par IA, renseignement sur
    les menaces amélioré et opérations de sécurité évolutives'
title: Entity Risks
---
## Présentation {#overview}

[Cloud SIEM's Entity Risks][4] consolide plusieurs sources de données, telles que les menaces SIEM et les informations de Cloud Security, dans un profil représentant une entité de sécurité unique, telle qu'un utilisateur IAM.

<div class="alert alert-info">Entity Risks était précédemment connu sous le nom de Risk Insights.</div>

Avec Entity Risks, vous pouvez :

- Explorer les entités, en les filtrant par des attributs tels que le fournisseur d'entité, le type d'entité, le nom de l'entité, [la gravité du score de risque](#risk-scoring), le score de risque et les risques de configuration.
- Afficher toutes les données pertinentes pour une entité, telles que les signaux, les mauvaises configurations et les risques liés à l'identité.
- Regrouper les risques par identité utilisateur pour voir une ligne par personne, avec leur risque total sur chaque compte via lequel ils agissent.
- Configurer des notifications afin de pouvoir traiter les entités à risque, ou les personnes à risque, dès leur apparition.
- Trier les éléments pertinents en masse.
- Prendre des mesures d'atténuation telles que la création d'une suppression globale ou la création d'un cas pour une entité.

## Prérequis {#prerequisites}

- Pour utiliser Entity Risks, configurez au moins l'une des sources de logs prises en charge suivantes pour envoyer des logs à Cloud SIEM, avec un pipeline Open Cybersecurity Schema Framework (OCSF) actif :
  - **Sources fournissant des entités d'identité et de ressource** (telles que les utilisateurs, les identités de service, les rôles assumés, les instances de calcul et les conteneurs de stockage) : AWS, Azure, GCP, GitHub, Microsoft 365 et Okta.
  - **Sources fournissant des entités utilisateur identifiées par adresse e-mail** : 1Password, Cisco Duo, Cloudflare, CrowdStrike, Google Workspace, JumpCloud, LastPass, Salesforce, Slack et Zscaler Internet Access (ZIA).
- De nombreuses sources prises en charge utilisent un [pipeline OCSF prêt à l'emploi][8] qui ne nécessite aucune configuration supplémentaire. Si une source prise en charge ne produit pas d'entités, confirmez que son pipeline OCSF prêt à l'emploi est actif. Les pipelines antérieurs à la prise en charge d'OCSF, ainsi que les pipelines personnalisés, peuvent ne pas inclure le traitement OCSF requis.
- Datadog recommande de configurer un [Entity Pack][9] pour votre fournisseur d'identité (Okta, Google Workspace ou Microsoft Entra ID) sur la page [Content Packs][10]. Lorsque les identités des utilisateurs sont synchronisées, Entity Risks résout les comptes de chaque personne en une identité utilisateur unique et cumule leurs risques. Les notifications d'identité utilisateur deviennent également disponibles. Sans Entity Pack, les entités ne sont évaluées et ne font l'objet d'alertes qu'individuellement. Voir [Risque regroupé par identité utilisateur](#risk-grouped-by-user-identity).
- (Facultatif) Pour afficher les insights Cloud Security associés dans le panneau des entités, [Cloud Security doit être configuré][2].


## Explorer les risques liés aux entités {#explore-entity-risks}

### Interroger et filtrer les entités {#query-and-filter-entities}

Sur la page [Entity Risks][4], vous pouvez afficher toutes les entités auxquelles est associé un score de risque non nul.

{{< img src="security/entities/entities-explorer4.png" alt="La page Entity Risks répertoriant les risques et leurs scores, avec une ligne d'identité utilisateur développée pour afficher les entités situées en dessous" style="width:100%;" >}}

### Risque regroupé par identité utilisateur {#risk-grouped-by-user-identity}

Dans un environnement fédéré, une personne agit généralement via de nombreuses entités distinctes, telles que plusieurs alias d'e-mail, un utilisateur IAM, des rôles assumés et un compte de référentiel de code. Vues individuellement, aucune de ces entités ne montre le risque total de cette personne.

Lorsque vous configurez un [Entity Pack][9] pour votre fournisseur d'identité, Cloud SIEM synchronise les identités utilisateur de ce fournisseur. Il résout ensuite les entités qui appartiennent à chacune d'elles. Les entités qui correspondent à une seule personne sont regroupées sous une seule ligne d'identité utilisateur, nommée d'après cette personne. Le score de risque de cette ligne est la somme des scores de risque des entités situées en dessous. Le regroupement est appliqué automatiquement dès qu'un fournisseur d'identité est connecté.

Pour enquêter sur une identité utilisateur :

1. Dans [Entity Risks][4], recherchez une ligne avec une flèche de développement et un nombre d'entités associées.
1. Cliquez sur la flèche pour développer la ligne et voir chaque entité résolue pour cette identité utilisateur, ainsi que son propre score de risque, son type, sa source et son nombre de signaux.
1. Cliquez sur une entité pour ouvrir son panneau latéral et poursuivre l'enquête, comme décrit dans [Obtenir rapidement du contexte sur une entité](#quickly-build-context-on-an-entity).

<div class="alert alert-info">Entity Risks regroupe uniquement les entités qui correspondent sans ambiguïté à une identité utilisateur. Les entités qui ne peuvent pas être résolues en une identité unique continuent d'apparaître sous forme de lignes individuelles, de sorte qu'une même personne peut encore apparaître plus d'une fois.</div>

### Établissez rapidement un contexte sur une entité {#quickly-build-context-on-an-entity}

Cliquez sur une entité dans [Entity Risks][4] pour ouvrir le panneau latéral de l'entité.

{{< img src="security/entities/entity-side-panel4.png" alt="Le panneau latéral d'une entité, affichant le résumé « What Happened » et la liste « Risk Contributors »" style="width:90%;" >}}

La section {{< ui >}}What Happened{{< /ui >}} du panneau résume le nombre de signaux, de mauvaises configurations et de risques liés à l'identité et la manière dont ils ont contribué au score de risque, ainsi que tout risque de configuration potentiel.

La section {{< ui >}}Risk Contributors{{< /ui >}} affiche la liste des signaux déclenchés, des mauvaises configurations pertinentes et des risques liés à l'identité.

Les sections {{< ui >}}What Happened{{< /ui >}} et {{< ui >}}Risk Contributors{{< /ui >}} incluent uniquement les signaux, les mauvaises configurations et les risques liés à l'identité qui contribuent au score de risque de l'entité. Pour voir tous les signaux associés à l'entité, y compris ceux qui n'affectent pas le score, cliquez sur {{< ui >}}View All Related Signals{{< /ui >}} ; pour les mauvaises configurations et les risques liés à l'identité, cliquez sur {{< ui >}}View in Vulnerability Explorer{{< /ui >}}.

### Triez et atténuez les menaces en masse {#triage-and-mitigate-threats-in-bulk}

La section {{< ui >}}Risk Contributors{{< /ui >}} du panneau latéral de l'entité inclut les étapes d'atténuation disponibles. Sélectionnez les éléments sur lesquels vous souhaitez agir, puis utilisez les actions en ligne pour définir un état de triage, attribuer un élément, créer un cas de sécurité, déclarer un incident ou créer une suppression.

## Configurer les notifications pour les risques liés aux entités {#configure-notifications-for-entity-risks}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Les règles de notification ne sont pas prises en charge pour le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Vous pouvez configurer Datadog pour qu'il vous envoie des notifications dès qu'il détecte de nouvelles menaces correspondant à vos critères.

1. Accédez à la page {{< ui >}}Create a new Entity Risk notification{{< /ui >}}. Il existe deux façons de procéder :
   - Dans Datadog, accédez à la page [Entity Risks][4], puis cliquez sur {{< ui >}}Create Notification Rule{{< /ui >}}.
   - Dans Datadog, accédez à {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}. Sous {{< ui >}}Products{{< /ui >}}, dans la section {{< ui >}}Cloud SIEM{{< /ui >}}, cliquez sur [{{< ui >}}Entity Risks{{< /ui >}}][7] ; puis, sous {{< ui >}}Notification rules{{< /ui >}}, cliquez sur {{< ui >}}New notification rule{{< /ui >}}.
1. Sous {{< ui >}}Group risk by{{< /ui >}}, choisissez ce que la règle mesure :
   - {{< ui >}}Individual entity{{< /ui >}} : La règle évalue le score de risque propre à chaque entité.
   - {{< ui >}}User identity{{< /ui >}} : La règle évalue le score de risque cumulé d'une identité utilisateur, qui additionne les scores de chaque entité résolue pour cette personne. Cette option est disponible après avoir configuré un pack d'entités et que les identités utilisateur sont en cours de synchronisation. Voir [Notifier sur le risque d'identité utilisateur cumulé](#notify-on-rolled-up-user-identity-risk).
   <div class="alert alert-warning">Vous ne pouvez pas modifier le regroupement d'une règle après l'avoir créée. Pour utiliser un regroupement différent, créez une autre règle.</div>
1. Sous {{< ui >}}Define entity attributes{{< /ui >}}, spécifiez les attributs qui doivent déclencher des notifications lorsque Datadog les détecte sur une entité. À côté de {{< ui >}}Entities matching{{< /ui >}}, commencez à saisir les attributs et les valeurs de l'entité. Au fur et à mesure que vous tapez, le tableau de prévisualisation affiche dynamiquement les entités qui correspondent à vos critères.
   <div class="alert alert-info">Cette étape est facultative, mais si vous n'entrez aucun attribut, la notification envoie par défaut des alertes pour toutes les entités.</div>
1. Sous {{< ui >}}Set notification conditions{{< /ui >}}, définissez la condition de déclenchement en fonction de la gravité de l'entité ou de la valeur du score de risque :
   - {{< ui >}}Entity severity{{< /ui >}} : Déclenche une notification lorsqu'une entité atteint un certain niveau de gravité. Sélectionnez un opérateur, puis sélectionnez un niveau de gravité. Pour le score de risque correspondant à chaque niveau de gravité, consultez [Seuils de gravité des entités](#entity-severity-thresholds).
   - {{< ui >}}Risk score value{{< /ui >}} : Déclenche une notification lorsque le score de risque de l'entité dépasse un seuil spécifié. Spécifiez le seuil pour les notifications.
1. Sous {{< ui >}}Configure notification{{< /ui >}}, saisissez un nom pour la notification, ajoutez un corps de message personnalisé et spécifiez les destinataires auxquels l'envoyer.
   - En option, vous pouvez également activer les re-notifications et spécifier la période de temps qui doit s'écouler avant que Datadog ne notifie à nouveau les destinataires que l'entité répond toujours aux critères que vous avez spécifiés.
1. Pour vérifier votre configuration, cliquez sur {{< ui >}}Test Notification{{< /ui >}} pour envoyer une notification de test aux destinataires configurés.
1. Cliquez sur {{< ui >}}Save Notification{{< /ui >}}.

### Notifier en cas de risque lié à l'identité utilisateur regroupée {#notify-on-rolled-up-user-identity-risk}

Une règle regroupée par {{< ui >}}User identity{{< /ui >}} vous notifie lorsque le risque total d'une personne sur l'ensemble de ses entités dépasse un seuil. Cela vous aide à identifier les risques répartis sur plusieurs entités, lorsqu'aucune entité unique ne dépasse votre seuil d'entité individuelle.

Les règles regroupées par identité utilisateur diffèrent des règles d'entité individuelle de la manière suivante :

- **Les attributs de correspondance sont des attributs utilisateur.** Au lieu des attributs d'entité, vous interrogez les attributs de l'identité utilisateur résolue, conformément à ce que vous voyez dans l'inventaire des utilisateurs. Par exemple, vous pouvez effectuer une recherche par fournisseur d'identité, type d'utilisateur, département, intitulé de poste ou emplacement de bureau. Le tableau de prévisualisation affiche les identités utilisateur correspondantes et leurs scores de risque regroupés.
- **Les conditions évaluent le score regroupé.** Comme pour les règles d'entité individuelle, vous pouvez déclencher une alerte sur un niveau de gravité d'entité ou une valeur de score de risque, et les mêmes [seuils de gravité d'entité](#entity-severity-thresholds) s'appliquent. Dans les deux cas, la condition est évaluée par rapport au score de risque regroupé de l'identité utilisateur plutôt que par rapport au score d'une entité unique.
- **Les notifications sont envoyées lors du dépassement de seuil.** Datadog vous notifie lorsqu'une identité utilisateur atteint l'état au-dessus du seuil, et non à chaque évaluation tant qu'elle reste au-dessus. Si une identité utilisateur est déjà au-dessus du seuil lorsque vous créez la règle, Datadog envoie une notification. Utilisez les re-notifications pour être rappelé tant que l'identité utilisateur reste au-dessus du seuil.
- **Le contenu du message est centré sur la personne.** Les variables de modèle incluent le nom d'affichage de l'identité utilisateur, le fournisseur d'identité, le score de risque regroupé, le nombre d'entités contributrices et les principales entités contributrices avec leurs scores.
- **La notification renvoie vers l'inventaire des utilisateurs.** Le lien principal de la notification ouvre le panneau latéral de l'identité utilisateur dans l'inventaire des utilisateurs.

Les règles regroupées par identité utilisateur et les règles regroupées par entité individuelle coexistent, et la liste des règles étiquette chaque règle avec son regroupement. Les deux types de règles comptent pour la même limite de 100 règles de notification par organisation.

## Score de risque {#risk-scoring}

Le score de risque d'une entité approxime le niveau de risque de l'entité sur les 14 derniers jours d'activité. Datadog calcule le score de risque à partir des caractéristiques des signaux associés à l'entité, telles que le niveau de gravité du signal et le nombre de fois où le signal a été déclenché.

### Afficher et personnaliser les impacts du score de signal {#view-and-customize-signal-score-impacts}

Chaque signal a un impact sur le score basé sur sa gravité. Datadog attribue un nombre de points par défaut à chaque gravité de signal. Pour afficher ou remplacer les impacts de score par défaut pour votre organisation, ainsi que les impacts pour les erreurs de configuration et les risques liés à l'identité, accédez à la [page des paramètres des risques d'entité][7].

Si vous modifiez les impacts du score, Datadog les applique immédiatement et rétroactivement à tous les scores de risque d'entité existants. Vous pouvez utiliser les scores mis à jour pour évaluer l'impact de vos modifications sur vos notifications de risques d'entité à l'avenir, afin de réduire le bruit et d'augmenter la pertinence des signaux qu'elles fournissent.

<div class="alert alert-info">L'impact du score d'un signal dure 14 jours, après quoi le score chute à <code>0</code>.</div>

| Gravité du signal | Nombre de points |
|-----------------|------------------|
| `Critical`      | `100`            |
| `High`          | `50`             |
| `Medium`        | `5`              |
| `Low` et `Info`| `0`              |

### Seuils de gravité de l'entité {#entity-severity-thresholds}

Le seuil de gravité d'une entité est calculé en additionnant l'impact du score de tous les signaux associés à l'entité. Les mêmes seuils s'appliquent à une identité d'utilisateur : sa gravité est dérivée de son score de risque cumulé, qui est la somme des scores de risque de chaque entité qui lui est associée.

| Seuil de gravité          | Score de risque                                         |
|-----------------------------|----------------------------------------------------|
| `Critical`                  | Supérieur ou égal à `100`.                    |
| `High`                      | Supérieur ou égal à `50` et inférieur à `100`. |
| `Medium`                    | Supérieur ou égal à `25` et inférieur à `50`.  |
| `Low`                       | Supérieur ou égal à `10` et inférieur à `25`.  |
| `Info`                      | Inférieur à `10`.                                    |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://docs.datadoghq.com/fr/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/siem/entity-risks
[7]: https://app.datadoghq.com/security/configuration/siem/entity-risks
[8]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/#supported-out-of-the-box-ocsf-pipelines
[9]: /fr/security/cloud_siem/ingest_and_enrich/entity_packs
[10]: /fr/security/cloud_siem/ingest_and_enrich/content_packs