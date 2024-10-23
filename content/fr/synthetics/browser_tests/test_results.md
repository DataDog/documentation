---
aliases:
- /fr/synthetics/apm/browser_tests
description: Résultats des tests Browser Synthetic
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Surveiller les signaux Web essentiels avec la surveillance Synthetic
title: Résultats de tests Browser
---

Les résultats des tests s'affichent après l'exécution d'un test Synthetic Datadog. Les résultats de tests Browser découlent de l'exécution de tests à un moment précis, avec un emplacement, un navigateur et un type d'appareil spécifiques.

La section **Sample Results** vous permet de comparer des exécutions récentes de test qui ont échoué et qui ont réussi. Faites défiler la page vers le bas jusqu'à atteindre la section **Test Results**, puis cliquez sur un résultat de test pour examiner ses détails.

Les [résultats des tests Browser](#resultats-des-tests) comprennent plusieurs éléments, notamment des [captures d'écran](#captures-d-ecran), des [données de performance des pages](#performances-des-pages), des [erreurs](#erreurs), des [ressources](#ressources) et des [traces backend](#traces-backend), afin que vous puissiez découvrir pourquoi [certains tests échouent](#resultat-d-un-test-ayant-echoue).

## Résultats des tests

Les informations suivantes s'affichent en haut de chaque résultat de test Browser :

Status
: Le statut du résultat de votre test (Alert ou OK).

Starting URL
: L'URL de votre scénario de test Browser.

Completed steps
: Le nombre d'étapes effectuées durant le test.

Duration
: La durée d'exécution du test.

Location
: L'emplacement géré ou privé à partir duquel votre test a été exécuté.

Device
: Le type d'appareil à partir duquel votre test a été exécuté.

Browser
: Le type de navigateur à partir duquel votre test a été exécuté.

Time ran
: L'heure à laquelle votre test a été effectué.

Run type
: Le type de votre exécution de test (CI, nouvelle tentative rapide, déclenchement manuel ou programmé).

### Captures d'écran

Les tests Browser contiennent des captures d'écran pour chaque étape de test exécutée. Ces captures vous permettent de visualiser le parcours de votre test Browser.

### Performances des pages

Chaque étape impliquant le chargement complet d'une URL contient des informations sur les performances de la page.

#### Expérience utilisateur

Les [signaux Web essentiels de Google][1] désignent trois métriques visant à surveiller l'expérience utilisateur d'un site. Ces métriques sont conçues pour vous offrir une vue globale des performances de chargement, de l'interactivité et de la stabilité visuelle. Une plage de valeurs correspondant à une expérience utilisateur acceptable est fournie pour chaque métrique.

La surveillance Synthetic inclut deux métriques expérimentales : [Largest Contentful Paint][2] et [Cumulative Layout Shift][3].

La métrique [First Input Delay][4] est disponible avec la solution RUM (Real User Monitoring), dès lors que les données sur les utilisateurs réels ou les champs sont disponibles.

En savoir plus sur la [solution RUM et sur les signaux Web essentiels][5].

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Visualisation de la synthèse des signaux Web essentiels"  >}}

### Erreurs

Le volet **Errors** affiche l'erreur, son type (`js` ou `network`) et son statut (code de statut réseau).

Le type d'erreur est enregistré lors de l'interaction avec la page. Il correspond aux erreurs recueillies entre l'ouverture de la page et l'interaction avec cette page.

Un maximum de 8 erreurs peuvent être affichées, par exemple 2 `network` + 6 `js`.

### Ressources

Une ressource correspond à une combinaison de requêtes et d'assets. 

{{< img src="synthetics/browser_tests/resources_panel.png" alt="Volet Resources"  >}}

Les éléments suivants se trouvent au-dessus de l'onglet Resources :
- La durée totale de l'étape
- Les fournisseurs CDN à l'origine des ressources, avec un résumé du statut du cache pour chacune d'elles

L'onglet **Resources** inclut les éléments suivants :

Resource
: L'URL de la ressource.

CDN
: Le fournisseur CDN à l'origine de la ressource. Lorsque vous passez le curseur sur cette valeur, le statut du cache brut s'affiche.  
Datadog détecte les fournisseurs Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva et Sucuri.

Type
: Le type de ressource (HTML, CSS, Image, Javascript, XHR ou Other).

Status
: Le code de statut de la réponse HTTP.

Duration
: Le temps nécessaire pour effectuer la requête.

% Total Time 
: La durée de la ressource par rapport à la durée totale de l'interaction.

Size
: La taille de la réponse de la requête.

Vous pouvez consulter jusqu'à 100 ressources. Les ressources sont triées en fonction de l'heure à laquelle elles commencent. Seules les 100 premières ressources sont affichées dans Datadog.

#### Filtre et recherche

Les ressources peuvent être filtrées par type. Il est également possible d'effectuer une recherche sur les URL affichées.

### Traces backend

Le volet de traces affiche les traces associées au test Browser Synthetic. L'interface est semblable à la [vue Trace][6] de l'APM, à quelques exceptions près.

Une étape Browser peut effectuer plusieurs requêtes sur des URL ou des endpoints distincts, ce qui génère plusieurs traces connexes (en fonction de la configuration du tracing et des URL autorisées dans vos [paramètres][7]). Utilisez le menu déroulant pour choisir la trace à afficher.

### Durée d'une l'étape

La durée d'une l'étape correspond au temps consacré à son exécution avec notre [algorithme de localisation][8]. Elle inclut non seulement l'action concernée (comme une interaction utilisateur), mais également le mécanisme d'attente et de nouvelle tentative. Les tests Browser peuvent donc vérifier qu'un élément peut faire l'objet d'une interaction.

## Résultat d'un test ayant échoué

Un résultat de test est considéré comme un échec (`FAILED`) s'il ne respecte pas ses assertions ou si une étape échoue pour une autre raison. Vous pouvez résoudre les échecs d'exécution en étudiant les captures d'écran correspondants, en vérifiant les éventuelles [erreurs](#erreurs) au niveau de l'étape et en examinant les [traces backend](#traces-backend) générées par les étapes.

Voici la liste des erreurs les plus courantes pour les tests Browser :

`Element located but it's invisible` 
: L'élément est présent sur la page, mais il n'est pas possible de cliquer dessus (parce qu'un autre élément est superposé par-dessus, par exemple).

`Cannot locate element`
: L'élément est introuvable sur la page HTML.

`Select did not have option`
: L'option spécifiée ne figure pas dans le menu déroulant.

`Forbidden URL`
: Le test a probablement rencontré un protocole non pris en charge. Contactez l'[assistance Datadog][9] pour en savoir plus.

`General test failure`
: Message d'erreur général. [Contactez l'assistance][9] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /fr/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[6]: /fr/tracing/visualization/trace/
[7]: /fr/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[8]: /fr/synthetics/guide/browser-test-self-maintenance/
[9]: /fr/help/