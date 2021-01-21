---
title: Security Signals Explorer
kind: documentation
description: Faire des recherches sur l'ensemble de vos signaux de sécurité et effectuer une analyse de la sécurité
further_reading:
  - link: 'https://www.datadoghq.com/blog/announcing-security-monitoring/'
    tag: Blog
    text: Security Monitoring
  - link: /security_monitoring/detection_rules/
    tag: Documentation
    text: Règles de détection
---
{{< img src="security_monitoring/explorer/sse_diagram2.png" alt="Security Signals Explorer"  >}}

L'outil [Security Signals Explorer][1] vous permet de corréler et d'effectuer un triage de vos signaux de sécurité.

Grâce à cette vue, vous pouvez :

* [Explorer vos signaux de sécurité](#explore-your-security-signals)
* [Consulter en détail un signal de sécurité](#inspect-a-security-signal)
* [Analyser visuellement vos signaux de sécurité](#visualize-your-security-signals-analytics)

## Explorer vos signaux de sécurité

Les résultats de vos recherches sur vos signaux de sécurité s'affichent dans un tableau dédié.

{{< img src="security_monitoring/explorer/ss_table.png" alt="Tableau des signaux de sécurité"  >}}

Filtrez son contenu en choisissant parmi la liste des facettes disponibles. Vous pouvez personnaliser le contenu de ce tableau en fonction de vos besoins et de vos préférences. Pour ce faire, cliquez sur le bouton _Options_ en haut à droite de la page.

## Consulter en détail un signal de sécurité

Cliquez sur un signal de sécurité pour afficher plus de détails dans un volet dédié.

{{< img src="security_monitoring/explorer/signal_1.png" alt="Signal de sécurité"  >}}

Les détails les plus importants de votre problème figurent en haut du volet. Ils vous permettent de déterminer la gravité du signal et sa date de création, mais également d'accéder aux réglages de la règle et de partager en quelques secondes ce signal à un collègue.

Les dates de première et de dernière réalisation sont mises à jour lorsque de nouvelles données historiques sont transmises, ou lorsque l'attaque n'a pas pris fin. Cette section présente également tous les critères de regroupement configurés pour la règle. Dans cet exemple de règle, le critère de regroupement `usr.name` est appliqué. Enfin, tous les tags définis pour la règle s'affichent sous les critères de regroupement.

{{< img src="security_monitoring/explorer/signal_2.png" alt="Signal de sécurité"  >}}

Sous la présentation du signal figurent 3 onglets avec des informations plus détaillées. Le premier onglet, `Message`, affiche le texte d'explication du signal permettant à la personne le consultant de bien comprendre son objectif ainsi que les mesures à prendre. Le deuxième onglet répertorie des échantillons de logs servant à fournir du contexte sur le déclenchement du signal. Cliquez sur l'un des échantillons pour consulter l'intégralité du log. Le troisième onglet, `Related Signals`, affiche une liste de signaux connexes qui contiennent le même groupe de valeurs pour faciliter le triage du signal.

## Analyser visuellement vos signaux de sécurité

Pour passer du mode Tableau au mode Analyse des signaux de sécurité, cliquez sur le bouton _Signal Mode_ dans le coin supérieur gauche de la page :

{{< img src="security_monitoring/explorer/visualize_analytics1.png" alt="Analyses visuelles"  >}}

Une fois vos signaux de sécurité générés par le moteur des règles de sécurité, vous pouvez les représenter graphiquement et afficher les valeurs maximales ou minimales, les centiles, le nombre de valeurs uniques, et plus encore.

Suivez le [guide sur la représentation graphique de logs][2] pour découvrir les différentes options des graphiques.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security
[2]: /fr/logs/explorer/analytics/?tab=timeseries