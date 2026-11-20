---
aliases:
- /fr/developers/metrics/metrics_units
- /fr/developers/metrics/units/
description: Définissez des unités pour vos métriques afin que les valeurs s'affichent
  avec le bon ordre de grandeur sur les graphiques et les widgets.
further_reading:
- link: /dashboards/
  tag: Documentation
  text: Visualiser vos données pour mieux les comprendre
- link: /dashboards/guide/unit-override/
  tag: Documentation
  text: Personnalisez vos visualisations avec la surcharge d'unité
title: Unités des métriques
---
## Présentation {#overview}

Les unités de métriques sont affichées sur les graphiques de séries temporelles, les widgets de valeur de requête et les toplists.

{{< img src="metrics/units/redis_dash_metrics_units.png" alt="Unités des métriques pour Redis Dash" style="width:100%;">}}

Sur les graphiques de séries temporelles, vous pouvez survoler n'importe quel graphique avec votre curseur pour voir les unités pertinentes. Les unités doivent être spécifiées manuellement, mais si aucune unité n'est définie, une notation par ordre de grandeur (par exemple : k, M et G pour des milliers, des millions et des milliards, respectivement) est utilisée. Si une unité est définie, les données brutes sont automatiquement converties en unités d'affichage lisibles en utilisant leurs ordres de grandeur pertinents.

Par exemple, si vous avez un point de données qui est de 3 000 000 000 :

* Si vous n'avez pas spécifié d'unité pour ce point de données, « 3G » est affiché.
* Si vous avez spécifié que ce point de données est en octets, « 3 Go » est affiché.

Pour les métriques envoyées par une intégration prête à l'emploi, vous pouvez vérifier si une
unité est déjà définie en consultant le tableau Données collectées de cette intégration
: noms de métriques, suivis de * affichés sous la forme \<unit\>*, ont déjà une unité définie par
l'intégration. Les métriques sans cette notation n'ont pas d'unité configurée
par défaut, vous devez donc en définir une manuellement en suivant les étapes ci-dessous.

Cliquez sur le bouton plein écran dans le coin supérieur droit du graphique pour voir les unités affichées en bas :

{{< img src="metrics/units/metrics_units.png" alt="Les unités d'un graphique de métriques en mode plein écran" style="width:100%;">}}

Sur un graphique de métriques, cliquez sur le menu contextuel (trois points verticaux) pour trouver l'option {{< ui >}}Metrics Info{{< /ui >}}. Cela ouvre un panneau avec une description de la métrique. Cliquer sur le nom de la métrique dans ce panneau ouvre la métrique dans la page de résumé des métriques pour une analyse ou des modifications ultérieures.

{{< img src="metrics/units/metrics_info.png" alt="L'option Informations sur les métriques du menu contextuel étendu (trois points verticaux)" style="width:100%;">}}

Pour modifier une unité, accédez à la page [résumé des métriques][1] et sélectionnez une métrique. Cliquez sur {{< ui >}}Edit{{< /ui >}} sous {{< ui >}}Metadata{{< /ui >}} et sélectionnez une unité, telle que `bit` ou `byte` dans le menu déroulant.

## Liste des unités {#unit-list}

Les unités suivantes peuvent être associées aux métriques soumises à Datadog :

| type        | unité(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OCTETS       | bit / octet (b) / kibioctet (KiB) / mébioctet (MiB) / gibioctet (GB) / tébioctet (TiB) / pébioctet (PiB) / exbioctet (EiB)                                                                                                                                                                                                         |
| TEMPS        | nanoseconde (ns) / microseconde (μs) / milliseconde (ms) / seconde (s) / minute (min) / heure (hr) / jour / semaine (wk)                                                                                                                                                                                                            |
| POURCENTAGE  | percent_nano (n%) / percent (%) / apdex / fraction                                                                                                                                                                                                                                                                         |
| RÉSEAU     | connexion (conn) / requête (req) / paquet (pkt) / segment (seg) / réponse (rsp) / message (msg) / charge utile / délai d'attente / datagramme / route / session / saut                                                                                                                                                                   |
| SYSTÈME      | processus (proc) / thread / hôte / nœud / défaillance / service (svc) / instance / cpu         |
| DISQUE        | fichier / inode / secteur / bloc (blk)                                                                                                                                                                                                                                                                                        |
| GÉNÉRAL     | tampon / erreur (err) / lecture (rd) / écriture (wr) / occurrence / événement / temps / unité / opération (op) / élément / tâche / travailleur / ressource (res) / ramasse-miettes (gc) / e-mail / échantillon (smpl) / phase / moniteur / emplacement / vérification / tentative / appareil (dev) / mise à jour (up) / méthode (mthd) / travail / conteneur / exécution / limitation / invocation / utilisateur / succès / build / prédiction / exception |
| DB          | tableau / index (idx) / verrou / transaction (tx) / requête / ligne / clé / commande (cmd) / décalage / enregistrement / objet / curseur / assertion (assert) / scan / document / shard / flush / fusion / rafraîchissement / récupération / colonne (col) / commit / attente / ticket / question         |
| CACHE       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| MONNAIE       | dollar ($) / cent (¢) / microdollar (μ$) / euro (€) / livre (£) / pence (p) / yen (¥)                                                                                                                                                                                                                                      |
| MÉMOIRE      | page (pg) / split                                                                                                                                                                                                                                                                                                          |
| FRÉQUENCE   | hertz (Hz) / kilohertz (kHz) / mégahertz (MHz) / gigahertz (GHz)                                                                                                                                                                                                                                                           |
| JOURNALISATION     | entrée                                                                                                                                                                                                                                                                                                                      |
| TEMPÉRATURE  | décidegré Celsius (d°C) / degré Celsius (°C) / degré Fahrenheit (°F)         |
| CPU         | nanocore (ncores) / microcore (μcores) / millicore (mcores) / core / kilocore (Kcores) / megacore (Mcores) / gigacore (Gcores) / teracore (Tcores) / petacore (Pcores) / exacore (Ecores)         |
| PUISSANCE       | nanowatt (nW) / microwatt (μW) / milliwatt (mW) / déciwatt (dW) / watt / kilowatt / mégawatt / gigawatt / térawatt                                                                                                                                                                                                        |
| COURANT     | milliampère (mA) / ampère (A)                                                                                                                                                                                                                                                                                              |
| TENSION   | millivolt (mV) / volt (V)                                                                                                                                                                                                                                                                                                  |
| APM         | span                                                                                                                                                                                                                                                                                                                       |
| SYNTHÉTIQUES   | exécution / étape                                                                                                                                                                                                                                                                                                                 |

## Formatage des nombres {#number-formatting}

### Formatage sans unité {#unitless-formatting}

Pour les métriques sans unité, Datadog utilise les [préfixes SI][2] `k`, `M`, `G` et `T`. Après `T`, les nombres sont convertis en notation exponentielle, qui est également utilisée pour les nombres très petits. Par défaut, Datadog arrondit à deux décimales. Pour la notation exponentielle, la valeur par défaut est de zéro décimale.

#### Exemples {#examples}

| Valeur brute              | Formaté |
|------------------------|-----------|
| 1                      | 1         |
| 2,7182818284           | 2,72      |
| 1337                   | 1,34k     |
| 31536000               | 31,54M    |
| 4294967296             | 4,29G     |
| 18446744073709552000   | 2e19      |
| 0,001                  | 1e-3      |
| 2,3283064365386963e-10 | 2e-10     |
| invalide                | N/A       |

### Gestion des unités {#unit-handling}

Les unités sont automatiquement mise en forme sur vos graphiques pour améliorer leur lisibilité. Pour personnaliser la façon dont vos unités sont étiquetées, consultez [Personnalisez vos visualisations avec le remplacement d'unité][3].

#### Exemples {#examples-1}

| Unité       | Famille    | Valeur brute            | Formaté    |
|------------|-----------|----------------------|--------------|
| octet       | octets     | 1                    | 1 B          |
| kibioctet   | octets     | 1234235              | 1,18 GiB     |
| kibioctet   | octets     | 45457878236741230000 | 40374,71 EiB |
| hertz      | fréquence | 6345223              | 6,35 MHz     |
| cent       | monnaie     | 1337                 | 13,37 $      |
| nanoseconde | temps      | 0                    | 0s           |
| seconde     | temps      | 0,03212              | 32,12ms      |

### Formatage du temps {#time-formatting}

Les unités de temps situées entre une minute et une année sont divisées en plusieurs unités afin d'améliorer leur lisibilité. Les conventions suivantes s'appliquent :

- Les temps courts sont formatés sous forme décimale.
- La plus petite unité de temps est la nanoseconde.
- Les temps longs sont formatés en jours sous forme décimale.


#### Exemples {#examples-2}

| Secondes brutes | Formaté               |
|-------------|-------------------------|
| 0,00123     | 1,23ms                  |
| 0,00012345  | 123,45μs (microsecondes) |
| 1,2345e-9   | 1,23ns                  |
| 95          | 1m 35s                  |
| 3671        | 1h 1m                   |
| 86390       | 1j                      |
| 96400       | 1j 3h                   |
| 52596400    | 608,75 jours             |


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
[3]: /fr/dashboards/guide/unit-override/