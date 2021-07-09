---
title: Security Signals Explorer
kind: documentation
description: Effectuer des recherches sur l'ensemble de vos signaux de sécurité et exécuter une analyse de la sécurité
aliases:
  - /fr/security_monitoring/explorer/
further_reading:
  - link: 'https://www.datadoghq.com/blog/announcing-security-monitoring/'
    tag: Blog
    text: En savoir plus sur le Security Monitoring
  - link: /security_monitoring/detection_rules/
    tag: Documentation
    text: En savoir plus sur la logique conditionnelle des règles de sécurité
---
## Présentation

L'outil [Security Signals Explorer][1] vous permet de mettre en corrélation et de filtrer vos signaux. Vous pouvez également accéder aux dashboards Security Monitoring à partir de cette page.

Grâce à cette vue, vous pouvez :

* [Explorer vos signaux de sécurité](#explorer-vos-signaux-de-securite)
* [Consulter en détail un signal de sécurité](#consulter-en-detail-un-signal-de-securite)
* [Analyser visuellement vos signaux de sécurité](#analyser-visuellement-vos-signaux-de-securite)

## Explorer vos signaux de sécurité

Les signaux de sécurité renvoyés par votre recherche s'affichent dans un tableau dédié.

{{< img src="security_platform/security_monitoring/explorer/ss_table.png" alt="Tableau des signaux de sécurité"  >}}

Filtrez son contenu en choisissant parmi la liste des facettes disponibles. Vous pouvez personnaliser le contenu de ce tableau en fonction de vos besoins et de vos préférences. Pour ce faire, cliquez sur le bouton **Options** en haut à droite de la page.

## Consulter en détail un signal de sécurité

Cliquez sur un signal de sécurité pour afficher plus de détails dans un volet dédié.

{{< img src="security_platform/security_monitoring/explorer/signal_1.png" alt="Signal de sécurité"  >}}

Les détails les plus importants de votre problème figurent en haut du volet. Ils vous permettent de déterminer la gravité du signal et sa date de création, mais également d'accéder aux réglages de la règle et de partager en quelques secondes ce signal à un collègue.

Les dates du premier et du dernier déclenchement sont mises à jour lorsque de nouvelles données historiques sont transmises, ou lorsque l'attaque n'a pas pris fin. Cette section présente également tous les critères de regroupement configurés pour la règle. Dans cet exemple de règle, le critère de regroupement `usr.name` est appliqué. Enfin, tous les tags définis pour la règle s'affichent sous les critères de regroupement.

{{< img src="security_platform/security_monitoring/explorer/signal_2.png" alt="Signal de sécurité"  >}}

Pour faciliter l'analyse d'une alerte, ce volet récapitule les tags et les attributs de l'ensemble des logs qui ont déclenché un signal, ce qui vous permet d'effectuer un dépannage sans accéder au Log Explorer. Par exemple, un seul coup d'œil suffit pour identifier les adresses IP qui tentent de se connecter à un compte utilisateur, ou les comptes AWS et zones de disponibilités qui exécutent le service d'authentification.

Sous l'aperçu du signal figurent des onglets contenant des informations plus détaillées :

- L'onglet `Message` affiche le texte configuré dans la règle pour aider la personne chargée d'examiner le signal à bien comprendre son objectif ainsi que les mesures à prendre.

- L'onglet `Event Attributes` affiche des informations utiles au triage et au filtrage des signaux de sécurité. Ces informations peuvent par exemple vous aider à déterminer si un utilisateur ou une entité a déclenché une règle de sécurité dans le cadre d'un comportement attendu, ou si un contrôle de conformité ne doit pas s'appliquer à l'ensemble de vos environnements. Cliquez sur un attribut dans l'onglet Event Attributes pour afficher le menu déroulant et sélectionnez **Never trigger signals for **`<valeur>`**** pour affiner les résultats affichés dans l'Explorer. Vous pouvez également appliquer un critère de regroupement ou afficher les logs associés à un attribut à partir de ce menu.

  {{< img src="security_platform/security_monitoring/explorer/never_trigger_signal_option.png" alt="Option pour ne jamais déclencher un signal pour une valeur définie" >}}

- L'onglet `Samples` répertorie des échantillons de logs afin de mieux comprendre le contexte dans lequel le signal s'est déclenché. Cliquez sur l'un de ces logs pour le consulter dans son intégralité.

- L'onglet `Related Issues` affiche une liste de signaux connexes qui présentent les mêmes valeurs de regroupement pour faciliter le triage du signal.

## Analyser visuellement vos signaux de sécurité

Pour passer du mode Tableau au mode Analyse des signaux de sécurité, cliquez sur le bouton _Signal Mode_ dans le coin supérieur gauche de la page :

{{< img src="security_platform/security_monitoring/explorer/visualize_analytics1.png" alt="Analyses visuelles"  >}}

Une fois vos signaux de sécurité générés par le moteur des règles de sécurité, vous pouvez les représenter graphiquement et afficher les valeurs maximales ou minimales, les centiles, le nombre de valeurs uniques, et plus encore.

Suivez le [guide sur la représentation graphique de logs][2] pour découvrir les différentes options des graphiques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security
[2]: /fr/logs/explorer/analytics/?tab=timeseries