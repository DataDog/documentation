---
title: Métriques
type: apicontent
order: 15
external_redirect: /api/#metrics
---
## Métriques
L'endpoint métrique vous permet de:

* Publiez vos données afin de les afficher sur les tableaux de bord de Datadog
* Interrogez les statistiques de n'importe quelle période

Comme dans l'interface utilisateur de Datadog, un graphique ne peut contenir qu'un nombre défini de points et lorsque la durée d'affichage d'une mesure augmente, l'agrégation entre les points se produit afin de rester en dessous de ce nombre défini.

Par conséquent, si vous interrogez des données par des périodes de temps plus importantes, les points renvoyés sont plus agrégés. La granularité maximale dans Datadog est d'un point par seconde, donc si vous aviez soumis des points à cet intervalle et a ensuite demandé un très petit intervalle à partir de l'API (dans ce cas, probablement moins de 100 secondes), vous pourriez obtenir ces mêmes points comme réponse. Sinon, notre algorithme essai de renvoyer environ 150 points par fenêtre temporelle donnée, de sorte que la granularité devient plus approximative à mesure que le temps demandé s'augmente. Nous faisons cette agrégation de temps par des moyennes.

Nous stockons des points de métrique à une résolution de 1 seconde, mais nous préférerions que vous ne soumettiez que des points toutes les 15 secondes. Toutes les métriques avec des horodatages des fractions d'un second sont arrondies à la seconde la plus proche et si des points ont le même horodatage, le dernier point reçu écrasera les précédents.

Nous avons une limite soft de 100 séries chronologiques par hôte, où une série temporelle est définie comme une combinaison unique de nom de métrique et d'étiquette.

