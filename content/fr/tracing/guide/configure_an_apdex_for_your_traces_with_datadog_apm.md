---
aliases:
- /fr/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
- /fr/tracing/getting_further/configure_an_apdex_for_your_traces_with_datadog_apm
kind: documentation
title: Configurer un score Apdex par service
---
{{< jqmath-vanilla >}}

Le score [Apdex][1] (Application Performance Index) est un standard ouvert développé par un ensemble d'entreprises. Il définit une méthode standard pour transmettre, comparer et surveiller les performances des applications. Il mesure le niveau de satisfaction de l'expérience utilisateur à partir du délai de réponse des services et des applications Web. L'Apdex vise à nuancer les centiles et les délais de réponse moyens. En effet, les valeurs extrêmes de certains points de données peuvent nuire à la précision des centiles et des délais.

## Définition

Apdex est une mesure numérique de la satisfaction utilisateur par rapport aux performances des applications d'entreprise Web. Pour calculer cette note, de nombreuses mesures sont converties en un chiffre sur l'intervalle [0;1], avec une échelle uniforme :

* 0 = aucun utilisateur n'est satisfait
* 1 = tous les utilisateurs sont satisfaits

Pour définir votre score Apdex, vous devez être l'administrateur de votre compte Datadog. Commencez par définir un seuil de temps (**T**) afin de déterminer les réponses satisfaisantes et les réponses non satisfaisantes pour votre application ou service Web. Un seuil vous permet de définir trois catégories :

* Les requêtes dont l'expérience utilisateur est jugée satisfaisante, avec un délai de réponse inférieur à **T**
* Les requêtes dont l'expérience utilisateur est jugée tolérable, avec un délai supérieur ou égal à **T** et inférieur ou égal à **4T**
* Les requêtes dont l'expérience utilisateur est jugée frustrante, avec un délai de réponse supérieur à **4T** ou qui renvoient une erreur

Une fois le seuil défini et vos requêtes classées, le score Apdex est défini comme suit :

$$\bo\text"Apdex"=({\bo\text"Satisfied"\text" requests" + {{\bo\text"Tolerated"\text" requests"}
 / 2}})/{\bo\text"Total"\text" requests"} $$

Il est essentiel de choisir le seuil adéquat, car les requêtes dont l'expérience utilisateur est jugée frustrante sont quatre fois plus lentes que les requêtes « normales ». Pour T = 3, l'utilisateur patiente pendant 3 secondes lors du chargement d'une page, mais ne souhaite probablement pas attendre jusqu'à 12 secondes.

Les seuils Apdex doivent être définis par des administrateurs, pour chaque service, avant que les scores Apdex puissent être calculés.

## Configurer votre Apdex pour vos traces

Pour visualiser le score Apdex de votre application ou service Web, procédez comme suit :

1. Depuis la [page Services][3], cliquez sur un service Web. Sélectionnez ensuite Apdex au lieu de Latency dans le graphique situé en haut à droite. Si cette option n'est pas disponible, vérifiez que vous avez bien sélectionné un service Web :

   {{< img src="tracing/faq/apdex_selection.png" alt="Sélection Apdex" >}}

2. Cliquez sur l'icône en forme de crayon en haut à gauche de votre widget pour configurer votre Apdex. Cette icône s'affiche uniquement si vous êtes administrateur :

   {{< img src="tracing/faq/apdex_edit.png" alt="Modification Apdex" >}}

3. Saisissez directement votre seuil pour afficher la distribution de vos requêtes :

   {{< img src="tracing/faq/apdex_update.png" alt="Mise à jour Apdex" >}}

4. Enregistrez votre widget pour suivre l'évolution de votre score Apdex :

   {{< img src="tracing/faq/apm_save.png" alt="Enregistrement Apdex" >}}

## Afficher votre Apdex sur votre page Service

Pour afficher l'Apdex sur votre [page Service][2], sélectionnez-le dans le menu de configuration, dans le coin supérieur droit de la page :

{{< img src="tracing/faq/apdex_service_list.png" alt="Liste des services Apdex" >}}

[1]: https://www.apdex.org/
[2]: https://app.datadoghq.com/apm/services
[3]: https://app.datadoghq.com/apm/services?query=type%3Aweb