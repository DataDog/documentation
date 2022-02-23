---
title: Logs d'audit
kind: documentation
further_reading:
  - link: /account_management/org_settings/
    tag: Documentation
    text: En savoir plus sur les paramètres de votre organisation
---
<div class="alert alert-warning">Cette fonctionnalité est actuellement en version bêta publique. Contactez l'<a href="https://www.datadoghq.com/support/">assistance Datadog</a> pour en savoir plus.</div>

## Présentation

Les [logs d'audit][1] permettent aux administrateurs ou aux membres des équipes de sécurité de visualiser les utilisateurs de leur organisation qui utilisent Datadog, ainsi que le contexte associé à cette utilisation. Les utilisateurs ne disposant pas de tels rôles peuvent également consulter le flux de leurs propres actions.

Deux types d'événements sont enregistrés dans un log d'audit : les **événements de requête**, qui convertissent toutes les requêtes transmises à l'API Datadog en données client, et les **événements liés à un certain produit**.

Par exemple, vous pouvez surveiller les **événements de requête**, comme les événements de violation, afin de consulter les appels d'API qui ont entraîné les événements en question. Un administrateur d'entreprise ou de facturation peut également étudier les logs d'audit pour surveiller les événements utilisateur qui modifient le statut de l'infrastructure.

Dans ce contexte, les logs d'audit vous aident à consulter des événements spécifiques à un produit. Vous pouvez par exemple découvrir :

  -  À quel moment un utilisateur a changé la rétention d'un index, si jamais votre volume de logs a évolué (entraînant ainsi une modification de vos coûts mensuels)

  - Les utilisateurs qui ont modifié des processeurs ou des pipelines, ainsi que la date de ces modifications, si jamais un dashboard ou un monitor ne fonctionne plus et doit être réparé

  - Les utilisateurs qui ont modifié un filtre d'exclusion, si jamais votre volume d'indexation a augmenté ou diminué et que vous ne trouvez pas vos logs ou que vos coûts ont augmenté

Pour les administrateurs de sécurité ou les équipes InfoSec, les logs d'audit simplifient l'exécution des checks de conformité et permettent de conserver des journaux d'audit. Ces derniers détaillent les actions effectuées sur les ressources Datadog, la date de ces actions et la personne à leur origine. Par exemple, vous pouvez consigner un événement dans un journal d'audit :

- chaque fois qu'un utilisateur met à jour ou supprime des dashboards importants, des monitors essentiels ou d'autres ressources Datadog ;

- pour les connexions utilisateur, les modifications de compte ou de rôle dans votre organisation.

## Configuration

Pour activer les logs d'audit, accédez aux [paramètres de votre organisation][2] et sélectionnez *Audit Logs Settings* sous *Security*. Cliquez sur le bouton **Enable**.

{{< img src="account_management/audit_logs/setup.png" alt="Configuration des logs d'audit dans Datadog" style="width:100%;">}}

## Configuration

### Types d'événements

Les types d'événements regroupent un ensemble d'événements d'audit. Par exemple, le type Authentication contient tous les logs associés à l'authentification, tandis que le type Dashboards contient tous les logs associés aux interactions avec les dashboards. Pour activer un type d'événement, accédez à la section *Audit Logs Settings* des [paramètres de votre organisation][2] et choisissez les types d'événements de votre choix.

{{< img src="account_management/audit_logs/event-types.png" alt="Types d'événements des logs d'audit dans Datadog" style="width:70%;">}}

### Archivage

Vous n'êtes pas obligé de configurer l'archivage de vos logs d'audit. Cette fonctionnalité vous permet d'écrire vos logs sur Amazon S3, Google Cloud Storage ou Stockage Azure. Votre système SIEM peut également lire les événements à partir de ces solutions. Une fois vos paramètres d'archivage créés ou modifiés, il est parfois nécessaire d'attendre quelques minutes avant la prochaine tentative d'importation des archives. Les logs sont importés vers l'archive toutes les 15 minutes. Par conséquent, attendez 15 minutes avant de vérifier que les archives sont bien importées vers votre compartiment de stockage depuis votre compte Datadog.

Pour activer l'archivage des logs d'audit, accédez aux [paramètres de votre organisation][2] et sélectionnez *Audit Logs Settings* sous *Security*. Faites défiler vers le bas jusqu'à atteindre la section Archiving, puis cliquez sur le bouton Store Logs pour activer le stockage des logs.

### Rétention

Vous n'êtes pas obligé de configurer la rétention des logs d'audit. Pour activer cette fonctionnalité, accédez aux [paramètres de votre organisation][2] et sélectionnez *Audit Logs Settings* sous *Security*. Faites défiler vers le bas jusqu'à atteindre la section Retention, puis cliquez sur le bouton Retain Logs pour activer la rétention des logs.

Par défaut, la période de rétention des logs d'audit est définie sur 7 jours. Elle peut varier entre 3 et 90 jours.

{{< img src="account_management/audit_logs/retention.png" alt="Configuration de la rétention pour les logs d'audit dans Datadog" style="width:80%;">}}

Remarque ; les logs d'audit sont facturés comme des logs conservés. Leur ingestion ou leur archivage n'impliquent aucun coût supplémentaire. Consultez la [page de tarification de Log Management][3] pour en savoir plus.

## Explorer les logs d'audit

Pour explorer un log d'audit, accédez à la section [Audit Logs][1], qui est également disponible depuis vos [paramètres d'organisation][2] dans Datadog.

{{< img src="account_management/audit_logs/explore-audit-logs.png" alt="Section Audit Logs dans le menu Organization Settings" style="width:50%;">}}

Dans le [Log Explorer][4] Datadog, les logs d'audit fonctionnent de la même manière que des logs normaux :

- Vous pouvez filtrer vos logs d'audit en fonction de noms d'événement (Dashboards, Monitors, Authentication, etc.), d'attributs d'authentification (acteur, ID de clé d'API, e-mail d'utilisateur, etc.), de `Status` (`Error`, `Warn`, `Info`), de méthode (`POST`, `GET`, `DELETE`) et d'autres facettes.

- Pour étudier des logs d'audit connexes, sélectionnez un log et accédez à l'onglet des attributs d'événement. Choisissez un attribut spécifique, comme `http.method`, `usr.email` ou encore `client.ip`, afin d'appliquer un filtre basé sur cet attribut ou d'exclure ce filtre de votre recherche.

{{< img src="account_management/audit_logs/attributes.png" alt="Section Audit Logs dans le menu Organization Settings" style="width:50%;">}}

## Créer un monitor

Pour créer un monitor afin de surveiller un type de log d'audit ou des attributs de log spécifique, consultez la section [Monitor de logs d'audit][5]. Vous pouvez par exemple créer un monitor qui se déclenche lorsqu'un certain utilisateur se connecte, ou encore lorsqu'un dashboard est supprimé.

## Créer un dashboard

Créez des dashboards pour apporter de nouveaux éléments de contexte visuels à vos logs d'audit. Pour créer un dashboard pour vos logs d'audit, procédez comme suit :

1. Créez un [dashboard][6] dans Datadog.
2. Sélectionnez une visualisation. Vous pouvez interroger la source des logs d'audit pour des [top lists][7], des [séries temporelles][8] et des [flux de logs][9].
3. [Représentez vos données][10] : sous l'onglet Edit, sélectionnez la source de données *Audit Logs*, puis créez une requête. Les logs d'audit sont filtrés par nombre et peuvent être regroupés en fonction de plusieurs facettes. Sélectionnez une facette ainsi qu'une limite.
{{< img src="account_management/audit_logs/graph-your-data.png" alt="Définir la source de données Audit Logs pour représenter vos données" style="width:100%;">}}
4. Définissez vos préférences d'affichage et attribuez un titre à votre graphique. Cliquez sur le bouton *Save* pour créer le dashboard.

{{< img src="account_management/audit_logs/dashboard.png" alt="Un dashboard pour les logs d'audit" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit/logs
[2]: https://app.datadoghq.com/organization-settings/
[3]: https://www.datadoghq.com/pricing/
[4]: /fr/logs/explorer/
[5]: /fr/monitors/create/types/audit_logs/
[6]: /fr/dashboards/
[7]: /fr/dashboards/widgets/top_list/
[8]: /fr/dashboards/widgets/timeseries/
[9]: /fr/dashboards/widgets/log_stream/
[10]: /fr/dashboards/querying/#choose-the-metric-to-graph/