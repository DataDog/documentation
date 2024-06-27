---
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog/
  tag: Blog
  text: Surveillance des performances des bases de données avec Datadog
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Prenez part à une session interactive pour améliorer la surveillance de vos
    bases de données avec Database Monitoring
kind: documentation
title: Prise en main de la solution Database Monitoring
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas disponible pour le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

## Présentation

La solution Database Monitoring de Datadog vous aide à mieux comprendre la santé et les performances de vos bases de données et à déterminer la cause première de vos problèmes.

Vous pouvez visualiser depuis une interface unique :

* Des métriques au niveau des hosts
* Plans d'exécution
* Des métriques sur les performances des requêtes historiques

Poursuivez votre lecture pour configurer la solution Database Monitoring Datadog à partir d'un exemple de base de données PostgreSQL. Vous pourrez ensuite identifier une requête coûteuse, diagnostiquer une requête lente et créer un dashboard pour visualiser l'évolution du volume de requêtes.

## Implémentation

### Prérequis

Vous devez au préalable disposer d'un [compte Datadog][1].

Pour exécuter l'exemple d'application, vous avez besoin d'une machine dotée de [GNU Make][2] et de [Docker][3]. Notez également votre [clé d'API][4] Datadog. 

### Installer l'exemple d'application

L'exemple d'application lance l'Agent Datadog ainsi qu'une base de données PostgreSQL dans un conteneur Docker. Durant l'exécution de l'application, l'Agent envoie des métriques de base de données à Datadog. Vous pouvez visualiser les données transmises par l'application dans l'interface Database Monitoring Datadog.

Suivez les instructions ci-dessous pour installer l'exemple d'application sous macOS ou Linux.

1. Dupliquez le [référentiel][5] contenant l'exemple d'application :
    ```
    git clone https://github.com/DataDog/dd-database-monitoring-example
    ```

2. Accédez au référentiel `dd-database-monitoring-example` :
    ```
    cd dd-database-monitoring-example
    ```

3. Définissez la variable d'environnement `DD_API_KEY` sur votre clé d'API Datadog :
    ```
    export DD_API_KEY=<API_KEY>
    ```

4. Lancez l'application :
    ```
    make postgres
    ```

La commande continue à s'exécuter jusqu'à ce que vous l'arrêtiez à l'aide du raccourci Ctrl + C.

## Identifier une requête coûteuse

Quelle est la requête qui utilise le plus longtemps la base de données ? Pour répondre à cette question, utilisez la vue Query Metrics.

1. Sur la page [Database Monitoring][6], cliquez sur lʼonglet **Query metrics** dans l'interface utilisateur.

2. Triez le tableau Normalized Query par **Person time** pour afficher la requête dont l'exécution est la plus longue.

   La requête qui utilise le plus longtemps la base de données figure sur la première ligne :

   {{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Requêtes normalisées triées par pourcentage de temps" style="width:100%;">}}

## Diagnostiquer une requête lente

La solution Database Monitoring Datadog vous permet non seulement d'identifier les requêtes lentes, mais également de les diagnostiquer. Le plan d'exécution d'une requête décrit les étapes réalisées par la base de données pour résoudre la requête. Pour afficher un plan d'exécution, il vous suffit de cliquer sur un échantillon dans la vue Query Samples.

1. Accédez à la vue Query Samples depuis [Database Monitoring][6] en sélectionnant l'onglet **Samples**.

2. Dans le menu déroulant **In**, sélectionnez **Explain Plans**. 

3. Triez le tableau Normalized Query par **Duration**.

   {{< img src="database_monitoring/dbm_qs_explain_plan_duration.png" alt="Échantillons de requêtes normalisées triés par durée">}}

4. Recherchez une requête dans la colonne **Explain Plan** du tableau comportant des données et cliquez dessus pour ouvrir la page des détails de l'échantillon. 

5. Dans la section **Explain Plan**, cliquez sur **List View**. Le plan d'explication qui se trouve en bas de la page dʼexemple explique que la requête nécessite un _scan dʼindex_.

   {{< img src="database_monitoring/dbm_qs_explain_plan_list_view.png" alt="Plan d'exécution d'une requête indiquant un scan d'index">}}

## Visualiser la santé et les performances de bases de données

Pour surveiller rapidement la santé et les performances de vos bases de données, ajoutez des métriques Database Monitoring Datadog à un dashboard.

### Afficher l'évolution du volume de requêtes

Pour visualiser, par exemple, la variation absolue du volume de requêtes au cours de la dernière heure, ajoutez un widget **Évolution** afin de surveiller une métrique représentant le nombre de requêtes.

1. Accédez à **Dashboards > New Dashboard** dans l'interface.

2. Attribuez un nom à votre dashboard. Cliquez sur le bouton **New Dashboard** pour accéder à votre nouveau dashboard.

2. Pour ajouter du contenu à votre dashboard, cliquez sur **Add Widgets**.

3. Dans le carrousel des widgets, sélectionnez le widget **Change**.

4. Sélectionnez `postgresql.queries.count` dans la liste déroulante **Metric**. Cette métrique compte le nombre de requêtes transmises à une base de données PostgreSQL.

5. Sélectionnez `host` dans la liste déroulante **Break it down by** pour agréger les requêtes par host.

   {{< img src="database_monitoring/dashboard_change_postgres.png" alt="Configurer un widget Évolution pour une métrique de requêtes postgres" style="width:100%;">}}

7. Cliquez sur le bouton **Save**. Le dashboard affiche alors votre nouveau widget.

   {{< img src="database_monitoring/dashboard_change_widget.png" alt="Widget Évolution affichant le nombre de requêtes" style="width:100%;">}}

### Consulter des dashboards prêts à l'emploi

Observez les activités, l'utilisation des ressources et d'autres valeurs de la base de données active grâce aux dashboards prêts à l'emploi proposés par la solution Database Monitoring Datadog.

Pour accéder aux dashboards, à partir de la page [Database Monitoring][6], sélectionnez lʼonglet **Dashboards** et choisissez le dashboard que vous souhaitez consulter.

Vous pouvez dupliquer et modifier des dashboards prêts à l'emploi pour les personnaliser en fonction de vos besoins.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://www.gnu.org/software/make/
[3]: https://www.docker.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/dd-database-monitoring-example
[6]: https://app.datadoghq.com/databases