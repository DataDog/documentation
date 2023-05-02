---
kind: faq
private: true
title: Guide de création d'une intégration de logs pour les partenaires Datadog
---

## Présentation

Ce guide vise à expliquer aux partenaires Datadog comment créer une intégration de logs. Le processus comprend les étapes suivantes :

1. [Envoyer des logs à Datadog](#envoyer-des-logs-a-datadog)
2. [Configurer les ressources de l'intégration de logs dans votre compte partenaire Datadog](#configurer-les-ressources-de-l-intégration-de-logs-dans-votre-compte-partenaire-datadog)
3. [Contrôler et déployer l'intégration](#controler-et-deployer-l-integration)

## Envoyer des logs à Datadog

Envoyez des logs à Datadog via l'endpoint d'ingestion de logs HTTP. Consultez la [documentation relative à l'API d'envoi de logs][1] pour en savoir plus sur cet endpoint. 

Assurez-vous de suivre les recommandations suivantes lors de la création de votre intégration :

1. Les tags `source` et `service` doivent être en minuscules. 

2. Définissez le tag `source` sur le nom de l'intégration.

    Datadog vous conseille de définir le tag `source` sur `<nom_intégration>` et le tag `service` sur le nom du service qui génère les données de télémétrie. Par exemple, le tag `service` peut être utilisé pour faire la distinction entre les logs des différentes lignes de produits. 

    Dans les cas où il n'y a qu'un seul service, définissez le tag `service` sur la même valeur que le tag `source`. Les tags `source` et `service` ne doivent pas pouvoir être modifiés par les utilisateurs car ils sont utilisés dans les pipelines et les dashboards de l'intégration. Les tags peuvent être définis dans la charge utile ou via le paramètre de requête. Par exemple : `?ddsource=example&service=example`.

3. L'intégration doit prendre en charge tous les sites Datadog.

    L'utilisateur doit pouvoir choisir l'un des différents sites Datadog lorsque cela est pertinent. Consultez [Débuter avec les sites Datadog][2] pour en savoir plus sur les différences entre les sites. Les endpoints des sites sont les suivants :
    | Site    | Endpoint HTTP                           |
    | ------- | --------------------------------------- |
    | US1     | http-intake.logs.datadoghq.com          |
    | US3     | http-intake.logs.us3.datadoghq.com      |
    | US5     | http-intake.logs.us5.datadoghq.com      |
    | US1-FED | http-intake.logs.ddog-gov.datadoghq.com |
    | EU1     | http-intake.logs.datadoghq.eu           |

4. Autorisez l'utilisateur à appliquer des tags personnalisés lors de la configuration de l'intégration.

    Datadog recommande que les tags ajoutés manuellement par les utilisateurs soient envoyés sous forme d'attributs key/value dans le corps JSON. S'il n'est pas possible d'ajouter des tags manuellement aux logs, vous pouvez les envoyer via le paramètre de requête `ddtags=<TAGS>`. Consultez la [documentation relative à l'API d'envoi de logs][1] pour obtenir des exemples.

5. Envoyez les données sans utiliser de tableaux dans le corps JSON lorsque cela est possible. 

    Même si certaines données peuvent être envoyées sous forme de tags, Datadog vous conseille d'envoyer les données dans le corps JSON en évitant les tableaux. Les utilisateurs pourront ainsi effectuer un plus grand nombre d'opérations sur les données dans la plateforme Datadog. 

6. Excluez les clés d'API Datadog des logs.

    Les clés d'API Datadog peuvent être transmises dans l'en-tête ou au sein du chemin HTTP. Consultez la [documentation relative à l'API d'envoi de logs][1] pour obtenir des exemples. Datadog vous conseille d'utiliser des méthodes qui empêchent la clé d'API d'apparaître dans les logs.

7. N'utilisez pas de clés d'application Datadog.

    La clé d'application Datadog est différente de la clé d'API et n'est pas nécessaire pour envoyer des logs via l'endpoint HTTP.

## Configurer les ressources de l'intégration de logs dans votre compte partenaire Datadog

### Configurer le pipeline de logs

Les logs envoyés à Datadog sont traités dans des pipelines de logs afin de les normaliser et ainsi faciliter les recherches et les analyses. Pour configurer le pipeline :

1. Accédez à [Logs Pipelines][3].
2. Cliquez sur **Add a new pipeline**.
3. Dans le champ **Filter**, saisissez la `source` unique correspondant à la source des logs du partenaire. Par exemple, pour l'intégration Okta, cette valeur peut être définie sur `source:okta`. **Remarque** : assurez-vous d'appliquer les tags source appropriés aux logs envoyés via l'intégration avant de les transmettre à Datadog.
4. Ajoutez des tags et une description si vous le souhaitez.
5. Cliquez sur **Create**.

Vous pouvez ajouter des processeurs au sein de vos pipelines afin de restructurer vos données et de générer des attributs. Par exemple :

- Utilisez le [remappeur de dates][4] pour définir le timestamp officiel des logs.
- Utilisez le [remappeur d'attributs][5] pour remapper des clés d'attribut vers des [attributs standard Datadog][6]. Par exemple, vous pouvez remapper une clé d'attribut qui contient l'IP du client vers l'attribut `network.client.ip` afin que Datadog puisse afficher les logs du partenaire dans les dashboards prêts à l'emploi.
- Utilisez le [remappeur de services][7] pour remapper l'attribut `service` ou le définir sur la même valeur que l'attribut `source`.
- Utilisez le [processeur grok][8] pour extraire des valeurs présentes dans les logs afin d'optimiser la recherche et l'analyse. 
- Utilisez le [remappeur de messages][9] pour définir le message officiel du log et rendre certains attributs compatibles avec les recherches de texte.

Consultez la section [Processeurs][10] pour en savoir plus et découvrir la liste complète des processeurs de logs.

### Configurer des facettes dans le Log Explorer

Tous les champs que les clients sont susceptibles d'utiliser pour rechercher et analyser des logs doivent être ajoutés en tant que facettes. Les facettes sont également utilisées dans les dashboards. 

Il existe deux types de facettes :

- Les facettes sont utilisées pour obtenir des informations relatives et compter des valeurs uniques.
- Les mesures sont un type de facette servant à effectuer des recherches sur une plage. Par exemple, l'ajout d'une mesure pour le temps de latence permet aux utilisateurs de rechercher tous les logs au-dessus d'une certaine latence. **Remarque** : définissez l'[unité][11] de la mesure en fonction de ce que l'attribut représente.

Pour ajouter une nouvelle facette ou mesure :
1. Cliquez sur un log contenant l'attribut pour lequel vous souhaitez ajouter une facette ou une mesure.
2. Dans le volet des détails du log, cliquez sur l'icône en forme d'engrenage à proximité de l'attribut.
3. Sélectionnez **Create facet/measure for @attribute**.
4. S'il s'agit d'une mesure, cliquez sur **Advanced options** pour définir l'unité. Sélectionnez l'unité en fonction de ce que représente l'attribut.
4. Cliquez sur **Add**.

Regroupez les facettes similaires afin de rendre la liste des facettes plus lisible. Pour les champs spécifiques aux logs de l'intégration, créez un groupe portant le même nom que le tag `source`. 

1. Dans le volet des détails du log, cliquez sur l'icône en forme d'engrenage à proximité de l'attribut que vous souhaitez inclure dans le nouveau groupe.
2. Sélectionnez **Edit facet/measure for @attribute**. S'il n'y a pas encore de facette pour l'attribut, sélectionnez **Create facet/measure for @attribute**.
3. Cliquez sur **Advanced options**.
4. Dans le champ **Group** saisissez le nom du nouveau groupe et sélectionnez **New group**.
5. Cliquez sur **Update**.

Consultez la [documentation relative aux facettes de logs][12] pour en savoir plus.

Consultez la [liste des attributs standard par défaut][6] pour connaître les attributs standard Datadog qui doivent être inclus dans des groupes spécifiques. 

## Contrôler et déployer l'intégration

Datadog contrôle l'intégration et transmet ses observations au partenaire. Ensuite, le partenaire passe en revue les observations effectuées et effectue les modifications nécessaires. Le processus de contrôle se fait par e-mail.

Une fois l'intégration validée, Datadog crée et déploie les nouvelles ressources de l'intégration de logs.

[1]: /fr/api/latest/logs/?code-lang=go#send-logs
[2]: /fr/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /fr/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: /fr/logs/log_configuration/processors/?tab=ui#remapper
[6]: /fr/logs/log_configuration/attributes_naming_convention/#default-standard-attribute-list
[7]: /fr/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: /fr/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: /fr/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: /fr/logs/log_configuration/processors/
[11]: /fr/logs/explorer/facets/#units
[12]: /fr/logs/explorer/facets/