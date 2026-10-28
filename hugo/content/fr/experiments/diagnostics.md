---
description: Comprenez les avertissements de diagnostic dans Datadog Experiments et
  apprenez à résoudre les problèmes courants de données et de randomisation.
further_reading:
- link: /experiments/reading_results/
  tag: Documentation
  text: Lecture des résultats d'expérience
- link: /experiments/troubleshooting/
  tag: Documentation
  text: Dépannage d'Experiments
- link: /experiments/concepts/exposure_sql/
  tag: Documentation
  text: Modèles SQL d'exposition
- link: /feature_flags/
  tag: Documentation
  text: Feature Flags
title: Diagnostics d'expérience
---
## Présentation {#overview}

Datadog exécute des checks de diagnostic avec l'analyse d'expérience pour vous aider à identifier les problèmes de qualité des données, de randomisation et de configuration avant de prendre une décision de déploiement. Lorsqu'un check détecte un problème, Datadog l'affiche sur la page des résultats de l'expérience sous forme d'avertissement, de message de métrique ou de check de diagnostic ayant échoué.

Commencez par tout check de diagnostic ayant échoué ou toute bannière d'avertissement avant d'interpréter l'augmentation, les intervalles de confiance ou l'augmentation globale.

## Déséquilibre du trafic {#traffic-imbalance}

Un déséquilibre du trafic, également appelé inadéquation du rapport d'échantillon (SRM), signifie que les attributions observées entre les variantes diffèrent considérablement des poids d'attribution configurés.

Datadog détecte le SRM avec le test d'adéquation du chi carré de Pearson. Le test compare les nombres de variantes observés aux nombres attendus à partir des poids configurés. Le diagnostic échoue lorsque la p-valeur est inférieure à `0.001`, ce qui correspond à un seuil de signification (alpha) de `0.001`. Datadog n'applique pas de taille d'échantillon totale minimale ou d'exigence de nombre attendu à ce check global.

Nous effectuons le test au niveau α = 0,001, plus conservateur, car ce test n'est pas séquentiellement valide ; ce niveau de signification plus conservateur nous aide à éviter les faux positifs.

Considérez le SRM comme un obstacle à l'interprétation des résultats. Cela indique que la randomisation effective, la journalisation de l'exposition ou la population d'analyse de l'expérience est biaisée. Tant que vous n'avez pas trouvé et corrigé la cause profonde, l'augmentation, les intervalles de confiance et l'augmentation globale ne peuvent pas étayer une inférence causale valide.

### Causes courantes {#common-causes}

Pour les expériences basées sur Datadog Feature Flags, les causes courantes incluent :

- La répartition du trafic (les pourcentages relatifs attribués aux variantes) a changé après le lancement, par exemple de `90/10` à `50/50`, alors que les attributions effectuées sous la répartition précédente restent dans la fenêtre d'analyse.
- Les événements d'exposition sont perdus à des taux différents selon la variante après l'attribution. Par exemple, une redirection ou un plantage spécifique à une variante peut empêcher les événements d'exposition mis en mémoire tampon d'atteindre Datadog.

Maintenez la répartition du trafic entre les variantes constante pendant toute la durée de l'expérience. Pour augmenter une expérience à répartition égale, augmentez l'[exposition au trafic][1] proportionnellement pour les deux variantes. Par exemple, augmentez l'exposition au trafic d'une répartition `10/10` à une répartition `50/50`. Cela augmente les deux pourcentages de variante proportionnellement tout en préservant leur répartition relative.

La modification des règles de ciblage, de la clé de ciblage ou de l'exposition au trafic ne provoque pas en soi de SRM. Un tel changement ne provoque de SRM que s'il modifie la population d'affectation incluse différemment selon la variante. Sinon, cela modifie le volume de trafic ou peut provoquer un diagnostic différent. Par exemple, un SDK incohérent `targetingKey` peut provoquer des **Données de métrique manquantes** lorsque les affectations et les événements de métrique ne correspondent plus au même sujet. Cela provoque des **Affectations mixtes** uniquement si le même sujet enregistré reçoit plus d'une variante.

Pour les expériences natives de l'entrepôt, les causes courantes incluent :

- La fraction d'exposition attendue pour chaque variante configurée dans Datadog ne correspond pas à la probabilité d'affectation utilisée par le système de randomisation en amont.
- Le [Modèle SQL d'exposition][2] filtre, joint, agrège ou applique des contraintes d'horodatage de manière à exclure les sujets d'affectation d'une variante plus souvent que d'une autre.
- La journalisation des affectations en amont perd ou enregistre incorrectement les affectations à des taux différents selon la variante, comme une perte de télémétrie dépendante du traitement ou le mappage d'une variante vers la mauvaise clé de variante.
- L'analyse inclut des sujets basés sur un comportement qui se produit après l'affectation et qui peut être affecté par la variante. Par exemple, un événement d'éligibilité dépendant du traitement ou un filtre de bot peut exclure une variante à un taux plus élevé.

### Comment résoudre {#how-to-resolve}

1.  Suspendez la prise de décision pour l'expérience jusqu'à ce que vous identifiiez la source du SRM.
2. Pour les expériences basées sur Datadog Feature Flags, examinez le [{{< ui >}}Version history{{< /ui >}}][3] du flag pour détecter les changements de répartition du trafic ou de variante, vérifiez les affectations mixtes et confirmez que les événements d'exposition atteignent Datadog au même taux pour chaque variante.
3. Pour les expériences natives en entrepôt de données, comparez la fraction d'exposition attendue pour chaque variante dans Datadog avec les probabilités d'affectation en amont. Comparez les nombres d'assignations bruts par variante avant et après que le modèle SQL d'exposition applique les jointures, les filtres, l'agrégation et les contraintes temporelles.
4. Vérifiez si le déséquilibre est localisé sur des segments ou des fenêtres temporelles spécifiques. Un SRM spécifique au segment ou au moment du lancement peut aider à cerner la cause profonde.
5. Corrigez la source du déséquilibre, puis relancez l'analyse de l'expérience.

## Assignations manquantes {#missing-assignments}

Si Datadog ne dispose d'aucune donnée d'assignation pour une expérience, les résultats ne peuvent pas être calculés. Cela peut se produire lorsqu'un flag n'est pas évalué, que le trafic n'atteint pas la règle de ciblage de l'expérience ou qu'un modèle SQL d'exposition d'entrepôt ne renvoie aucune ligne dans la fenêtre d'analyse pour les valeurs **ID d'expérience** et **ID de variante** spécifiées.

Pour les expériences basées sur Datadog Feature Flags qui utilisent des métriques d'entrepôt, Datadog peut enregistrer les assignations avant d'avoir synchronisé ces expositions avec la table `g_exposures` de votre entrepôt. Les résultats des métriques d'entrepôt restent indisponibles tant que la synchronisation n'est pas terminée.

### Comment résoudre {#how-to-resolve-1}

- Pour les expériences basées sur Datadog Feature Flags, confirmez que le flag est activé dans le bon environnement et que l'application évalue le flag pour les sujets attendus. Vérifiez les {{< ui >}}Real-time metric overview{{< /ui >}} du flag pour les événements d'exposition.
- Pour les expériences natives en entrepôt, vérifiez que le modèle SQL d'exposition renvoie des lignes avec les valeurs **Clé de sujet**, **Horodatage**, **ID d'expérience** et **ID de variante** attendues.
- Si l'expérience vient d'être lancée, attendez la prochaine exécution de l'analyse ou cliquez sur {{< ui >}}Run an update now{{< /ui >}}.

## Assignations mixtes {#mixed-assignments}

Si le même sujet est assigné à plus d'une variante dans la même expérience, Datadog exclut ce sujet de l'analyse. Datadog calcule le pourcentage séparément pour chaque source d'assignation, en utilisant les sujets uniques de cette source comme dénominateur. Le diagnostic réussit à 5 % ou moins, avertit au-dessus de 5 % et en dessous de 20 %, et échoue à 20 % ou plus. À mesure que la part exclue augmente, les résultats deviennent moins représentatifs et moins fiables.

### Comment résoudre {#how-to-resolve-2}

- Pour les expériences basées sur Datadog Feature Flags, examinez le [{{< ui >}}Version history{{< /ui >}}][3] du flag pour détecter tout changement inattendu après le lancement, en particulier les modifications apportées à la règle de ciblage de l'expérience, à la répartition du trafic ou aux variantes.
- Pour les expériences natives d'entrepôt de données, assurez-vous que la colonne mappée à **ID d'expérience** dans le [Modèle SQL d'exposition][2] identifie uniquement l'exposition à l'expérience, telle qu'une expérience spécifique ou une clé d'allocation du flag, et non la clé du flag plus large.
- Si le [Modèle SQL d'exposition][2] natif de l'entrepôt de données lit intentionnellement les logs d'évaluation des flags, filtrez les évaluations qui ne sont pas des expositions à l'expérience. Par exemple, si le modèle capture toutes les évaluations pour un flag, une rampe d'exposition peut enregistrer l'expérience de contrôle pré-expérience d'un sujet avant qu'il ne soit éligible à l'expérience, puis enregistrer ultérieurement une exposition au traitement randomisée après qu'il soit devenu éligible. L'évaluation du flag pré-expérience ne fait pas partie de l'expérience et ne doit pas être capturée comme une exposition.
- Pour les expériences natives d'entrepôt de données, vérifiez la présence d'enregistrements de variantes contradictoires dans les données d'affectation.
- Corrigez la source des affectations contradictoires, puis relancez l'analyse.

## Déséquilibre d'affectation dimensionnelle {#dimensional-assignment-imbalance}

Datadog peut signaler une expérience lorsque la probabilité d'être affecté à une variante diffère de manière significative selon les valeurs de dimension. Par exemple, un type d'appareil, un pays, un forfait ou un niveau de client peut recevoir des variantes selon une répartition différente du reste de l'expérience.

Pour chaque dimension d'affectation, Datadog exécute le test d'indépendance du chi carré de Pearson entre la variante et la valeur de la dimension. Pour tenir compte des tests sur plusieurs dimensions, Datadog applique une correction de Bonferroni : une dimension échoue lorsque sa valeur p est inférieure à `0.001 / n`, où `n` représente le nombre de dimensions éligibles testées. Datadog exclut une valeur de dimension lorsque tout nombre de variantes attendu pour cette valeur est inférieur à 5, ignore les dimensions comportant plus de 100 valeurs et nécessite au moins deux valeurs de dimension restantes et deux variantes avec des comptes marginaux positifs. Les dimensions ignorées ne contribuent pas à `n`. Si aucune dimension n'est éligible, le diagnostic réussit sans exécuter de test dimensionnel.

Tout comme le check SRM global, le test dimensionnel n'est pas séquentiellement valide sur des exécutions d'analyse répétées. La correction de Bonferroni contrôle les dimensions testées lors d'une exécution, et non les checks répétés à mesure que les données d'expérience s'accumulent.

Ce diagnostic est distinct du déséquilibre global du trafic, ou inadéquation du ratio d'échantillonnage (SRM) : le déséquilibre global seul ne le déclenche pas. Lorsque les deux diagnostics échouent, les valeurs de dimension affectées peuvent aider à localiser la cause du SRM global. Par exemple, un déséquilibre dimensionnel pour le type d'appareil peut indiquer un bug spécifique à l'appareil dans la livraison des variantes, l'évaluation du SDK, les redirections, les performances de la page, les plantages ou la télémétrie d'exposition.

Datadog utilise la valeur de dimension du premier enregistrement d'affectation du sujet. Les modifications ultérieures de la valeur de dimension du sujet ne devraient pas provoquer ce diagnostic.

### Comment résoudre {#how-to-resolve-3}

- Examinez les valeurs de dimension affectées et comparez-les avec le diagnostic global de déséquilibre du trafic.
- Examinez les différences spécifiques aux segments dans l'évaluation des feature flags, la livraison des variantes, le comportement de l'application et la télémétrie d'exposition.
- Pour les expériences natives d'entrepôt, confirmez que le modèle SQL d'exposition mappe les colonnes de propriété au moment de l'affectation prévues et ne filtre pas les expositions différemment par segment.
- Corrigez la source du déséquilibre localisé, puis relancez l'analyse.

## Données de métrique manquantes {#missing-metric-data}

Datadog signale **Données de métrique manquantes** lorsque des affectations existent mais que l'analyse de l'expérience ne trouve aucune valeur de métrique utilisable. Pour les métriques simples et de rapport, au moins une valeur contributive avant le traitement des singularités doit être non nulle. Si toutes les valeurs contributives sont nulles ou égales à zéro, le diagnostic échoue pour une métrique principale et émet un avertissement pour une métrique secondaire ou de garde-fou. Pour les métriques de centile, zéro est un résultat valide ; seuls les résultats nuls sont considérés comme manquants. Si Datadog ne peut pas déterminer si une métrique est principale, il traite les données manquantes comme un échec.

Ce diagnostic ne signifie pas nécessairement que l'événement source n'a jamais été déclenché. Des événements peuvent exister, mais ils ne respectent pas les filtres de la métrique, ne parviennent pas à se joindre aux affectations d'expérience, ou ne produisent que des valeurs de métrique nulles ou égales à zéro.

### Causes courantes {#common-causes-1}

- Le nom de l'événement, l'agrégation, les filtres ou la source de données de la définition de la métrique ne correspondent pas aux données émises.
- L'événement source ne se déclenche pas, ou il se déclenche uniquement avant la première affectation du sujet et est donc exclu de l'attribution post-affectation.
- Les événements de métrique et les affectations d'expérience identifient le même sujet différemment. Cette inadéquation de l'identifiant du sujet est une cause courante de données de métrique manquantes :
  - Pour les métriques Product Analytics ou RUM dans les expériences soutenues par Datadog Feature Flags, l'attribut de type de sujet configuré [subject type attribute][4] doit correspondre au SDK `targetingKey`.
  - Pour les métriques d'entrepôt, la colonne de sujet mappée dans le [Metric SQL Model][5] doit contenir les mêmes valeurs que la colonne de sujet d'affectation. Pour les expériences soutenues par Datadog Feature Flags, ces valeurs doivent correspondre au SDK `targetingKey`. Pour les expériences natives d'entrepôt, elles doivent correspondre à la colonne de sujet d'affectation configurée dans le [Exposure SQL Model][2].
- Un modèle SQL de métrique d'entrepôt ne renvoie aucune ligne correspondante dans la fenêtre d'analyse ou filtre les événements attendus.

### Comment résoudre {#how-to-resolve-4}

1. Ouvrez la métrique et confirmez que le nom de l'événement, l'agrégation, les filtres et la source de données sont corrects. Vérifiez le graphique du volume d'événements de métrique pour les données correspondantes récentes.
2. Comparez l'identifiant d'un sujet affecté avec l'identifiant sur ses événements de métrique. Confirmez que l'attribut de type de sujet configuré ou la colonne d'entrepôt mappée contient la même valeur que le SDK `targetingKey` ou la colonne de sujet d'affectation configurée dans le modèle SQL d'exposition.
3. Confirmez que les événements de métrique se produisent après la première affectation du sujet et dans la fenêtre d'analyse de l'expérience.
4. Pour une expérience soutenue par Datadog Feature Flags, si l'[intégration du code source][6] est configurée, cliquez sur [{{< ui >}}Ask Bits{{< /ui >}}][7] pour une erreur **Données de métrique manquantes** sur la métrique principale. Bits peut inspecter les emplacements source où le flag de fonctionnalité est évalué et vous aider à vérifier l'instrumentation des métriques à proximité. Une recherche de code vide n'est pas concluante et ne prouve pas que le SDK ou le flag de fonctionnalité est absent de l'application.
5. Pour les métriques d'entrepôt, exécutez le modèle SQL de métrique ou interrogez directement sa table source.
6. Corrigez la définition de la métrique, le mappage d'identité, le timing de l'événement ou le problème d'instrumentation, puis relancez l'analyse de l'expérience.

## Métrique winsorisée à zéro {#metric-winsorized-to-zero}

Le traitement des singularités plafonne les valeurs de métrique extrêmes pour réduire la variance. Datadog avertit lorsque le traitement des singularités laisse le résultat global de chaque variante à zéro ou nul, même si au moins une valeur brute était non nulle avant le traitement des singularités. Pour les métriques de ratio, Datadog vérifie séparément le numérateur et le dénominateur. Ce diagnostic ne comporte aucun pourcentage ni seuil d'échantillon minimal et ne provoque pas l'échec d'une expérience.

Cela peut se produire lorsqu'un petit nombre seulement de sujets effectuent l'événement de métrique et que le traitement des singularités plafonne toutes les valeurs observées à zéro. Par exemple, si une métrique a une borne supérieure de winsorisation au 99e centile et que moins de 1 % des sujets ont une valeur non nulle, la borne supérieure est zéro. Chaque valeur non nulle est alors traitée comme une singularité et plafonnée à zéro.

Pour la winsorisation par centile, Datadog peut calculer les bornes en utilisant tous les sujets assignés ou uniquement les valeurs non nulles. Exclure les zéros du calcul peut empêcher les zéros structurels de fixer une borne à zéro pour une métrique creuse. Cette stratégie ne supprime pas les sujets à valeur nulle de l'analyse ; elle exclut les zéros uniquement lors du calcul des bornes de centile, que Datadog applique ensuite à chaque sujet.

### Comment résoudre {#how-to-resolve-5}

1. Ouvrez la métrique.
2. Examinez {{< ui >}}Outlier handling{{< /ui >}} sous {{< ui >}}Experiment settings{{< /ui >}}. Pour une métrique creuse avec winsorisation par centile, calculez les bornes uniquement à partir des valeurs non nulles.
3. Il peut être tentant de résoudre l'avertissement en modifiant le centile de winsorisation ou en désactivant le traitement des singularités. Cependant, les métriques qui déclenchent ce diagnostic ont tendance à avoir une faible puissance statistique. Utilisez le [calculateur de taille d'échantillon][8] pour estimer la durée de l'expérience et l'effet minimal détectable avant de vous fier à la métrique pour prendre une décision.
4. Relancez l'analyse de l'expérience après avoir mis à jour la métrique.

## Déséquilibre de la métrique pré-expérience {#pre-experiment-metric-imbalance}

Lorsque CUPED est activé, Datadog utilise les valeurs des métriques pré-expérimentales pour réduire la variance. Avant l'exposition, l'expérience doit se comporter comme un test A/A : le traitement ne peut pas affecter le comportement survenu avant l'assignation. Un déséquilibre détecté peut se produire par hasard, ou sa cause profonde peut indiquer une sélection corrélée au traitement, une fuite de données ou un problème de randomisation. Ces problèmes sous-jacents peuvent violer les hypothèses de CUPED ou invalider bien plus que le simple ajustement CUPED.

Datadog calcule des séquences de confiance à mélange normal séquentiel bilatéral pour la différence traitement-moins-témoin des moyennes des composantes pré-expérimentales. Les métriques simples testent la moyenne de la métrique ; les métriques de ratio testent indépendamment les moyennes du numérateur et du dénominateur ; et les métriques de centile testent leurs composantes internes S et N. Datadog commence avec un niveau de signification de famille (alpha) de `0.05` et applique une correction de comparaisons multiples sur les checks éligibles de métriques, de variantes de traitement et de composantes. Le diagnostic échoue lorsqu'une séquence de confiance ajustée exclut strictement zéro ; un intervalle qui touche zéro est validé. Les séquences de confiance restent valides à mesure que l'analyse se répète sur les données accumulées. Le test nécessite des observations avec une variance positive mais n'a pas de taille d'échantillon minimale explicite.

### Causes courantes {#common-causes-2}

- Lien d'identité dépendant du traitement. Par exemple, une expérience randomise des identifiants anonymes mais analyse les achats au niveau du compte, et une correspondance anonyme-vers-compte n'est créée qu'après la connexion. Si la connexion post-exposition inclut ou redéfinit rétrospectivement l'historique des achats antérieurs, un traitement qui augmente le nombre de connexions peut faire apparaître davantage d'historique pré-expérimental dans le groupe de traitement.
- Troncature d'horodatage ou granularité temporelle non concordante. Par exemple, l'exposition possède un horodatage d'événement mais les données de métrique sont cumulées par jour et représentées à minuit, ce qui fait apparaître les événements post-exposition de ce jour comme précédant l'exposition.
- Gestion incohérente du fuseau horaire ou de l'heure d'été qui stocke ou compare un événement ultérieur avec un horodatage antérieur.
- Une règle d'affectation corrélée aux résultats pré-traitement ou aux traitements antérieurs. Par exemple, l'affectation directe de variantes à partir de plages d'identifiants ou la réutilisation du même mapping de bucket entre les expériences peut préserver une relation entre l'affectation et l'exposition à une expérience antérieure.
- Un problème de randomisation, de ciblage, d'identité du sujet ou de traitement des données qui fait varier la disponibilité des données pré-expérimentales selon les variantes.

### Comment résoudre {#how-to-resolve-6}

1. Confirmez que les données pré-expérimentales sont disponibles et représentatives pour chaque variante, et vérifiez si la définition de la métrique a changé pendant la fenêtre pré-expérimentale.
2. Comparez les horodatages bruts d'affectation et de métrique à leur granularité d'origine et dans un fuseau horaire cohérent. Vérifiez si un cumul quotidien, une conversion d'horodatage ou un passage à l'heure d'été peut déplacer des événements post-exposition dans la fenêtre pré-expérimentale.
3. Auditer les mappages d'identité des sujets. Assurez-vous que le comportement post-exposition, tel que la connexion, ne peut pas déterminer quels sujets disposent d'un historique pré-expérimental disponible pour l'analyse.
4. Vérifiez que l'attribution est indépendante des résultats pré-traitement, des attributs des sujets et des traitements antérieurs. Pour les expériences soutenues par Datadog Feature Flags, gardez le SDK `targetingKey` stable ; Datadog utilise la clé du flag et `targetingKey` pour maintenir un sujet dans le même bucket de déploiement. Pour les expériences natives en entrepôt de données, utilisez une méthode d'attribution déterministe qui combine l'identifiant du sujet avec un sel ou une clé spécifique à l'expérience. Cela maintient un sujet dans la même variante au sein d'une expérience sans réutiliser le même modèle d'attribution entre les expériences.
5. Corrigez le problème d'identité, d'horodatage, de randomisation ou de traitement des données, puis relancez l'analyse. La désactivation de CUPED ne rend pas l'expérience valide lorsque le déséquilibre provient d'un biais de sélection, d'une fuite de données post-exposition ou d'une randomisation défectueuse.

## Loi a priori invraisemblable {#implausible-prior}

Pour l'analyse bayésienne, Datadog effectue un check prédictif a priori bilatéral sur l'augmentation relative. Le check prend en compte à la fois la dispersion de la loi a priori et l'incertitude d'échantillonnage de l'estimation. Datadog émet un avertissement lorsque, selon la distribution prédictive a priori, il y a moins de 1 % de chances d'observer une augmentation au moins aussi extrême dans l'une ou l'autre direction que l'augmentation estimée dans l'expérience. Datadog teste chaque comparaison métrique-traitement éligible sans correction pour tests multiples. Le check nécessite une erreur type positive et finie, mais n'a pas de taille d'échantillon minimale explicite. Un avertissement indique que l'effet observé est surprenant compte tenu de la loi a priori sélectionnée.

Par exemple, de nombreuses expériences sur le taux de conversion présentent des augmentations réelles inférieures à 5 %, ainsi la loi normale a priori par défaut avec une moyenne de 0 et un écart-type de 0,05 peut être un choix raisonnable. Si une expérience corrige une page de paiement défectueuse qui empêche la plupart des utilisateurs de convertir, une augmentation beaucoup plus importante peut être plausible. Dans ce cas, la loi a priori par défaut peut être trop prudente et réduire excessivement l'effet estimé.

### Comment résoudre {#how-to-resolve-7}

- Comparez l'augmentation estimée avec les effets historiques pour la métrique et avec l'effet que l'intervention pourrait plausiblement produire.
- Examinez le plan d'analyse statistique et la configuration a priori de l'expérience.
- Si l'augmentation estimée est plausible mais que l'a priori attribue très peu de probabilité à des effets de cette taille, mettez à jour l'a priori pour refléter les connaissances pertinentes du domaine et relancez l'analyse.

## Dégradation au niveau du segment {#segment-level-degradation}

Datadog avertit lorsque l'estimation ponctuelle d'un segment est opposée au changement souhaité de la métrique et que le segment affiche des performances nettement inférieures à celles de segments comparables. Pour une métrique où une augmentation est souhaitable, l'effet du segment doit être inférieur à zéro. Pour une métrique où une diminution est souhaitable, l'effet du segment doit être supérieur à zéro.

Pour chaque métrique, variante de traitement et dimension, Datadog compare chaque effet du segment avec la moyenne pondérée par l'inverse de la variance des effets du segment valides dans cette même combinaison. Un segment n'émet un avertissement que lorsqu'une séquence de confiance séquentielle pour sa différence par rapport à la moyenne pondérée se situe entièrement dans la direction la plus défavorable et que son estimation ponctuelle est opposée au changement souhaité.

Datadog applique une correction de Bonferroni en divisant le niveau de signification de la famille (alpha) de `0.05` par le nombre de comparaisons de segments qui réussissent la validation initiale des statistiques récapitulatives. Les comparaisons ignorées lors des checks ultérieurs restent dans le dénominateur, ce qui rend le seuil plus conservateur. Le check nécessite au moins deux segments avec une variance positive pour la même métrique, la même variante de traitement et la même dimension. La dégradation au niveau du segment produit un avertissement, et non un diagnostic d'échec.

### Comment résoudre {#how-to-resolve-8}

- Examinez les graphiques au niveau du segment pour les dimensions concernées telles que le pays, le plan, l'appareil ou le niveau de client.
- Vérifiez si le segment concerné correspond à un problème réel de produit ou d'instrumentation.
- Envisagez de détourner le trafic du segment concerné de l'expérience pendant que vous enquêtez sur les segments à fort impact.

## Échec du pipeline d'analyse {#analysis-pipeline-failure}

L'analyse d'expérience peut utiliser les données de Product Analytics et de RUM dans Datadog ou en mode natif d'entrepôt. **L'échec du pipeline d'analyse** s'applique uniquement aux expériences qui utilisent des métriques d'entrepôt. Datadog signale ce diagnostic lorsqu'une requête d'entrepôt client échoue, de sorte que les résultats actuels de l'entrepôt ne peuvent pas être calculés. Datadog ne signale pas les échecs d'analyse interne de Product Analytics ou de RUM avec ce diagnostic.

Le SQL que vous définissez dépend de la manière dont l'expérience est randomisée. Pour les expériences soutenues par Datadog Feature Flags, Datadog synchronise les attributions vers la table `g_exposures`, et vous définissez des Metric SQL Models. Pour les expériences natives de l'entrepôt, vous définissez à la fois l'Exposure SQL Model et les Metric SQL Models. Datadog génère le SQL de pipeline restant.

### Comment résoudre {#how-to-resolve-9}

1. Cliquez sur [{{< ui >}}Ask Bits{{< /ui >}}][7] sur le diagnostic ayant échoué. Bits examine l'erreur de pipeline, les requêtes d'entrepôt ayant échoué et tous les modèles SQL configurés pour l'expérience. Il identifie la cause la plus probable et suggère une correction spécifique.
2. Pour une expérience soutenue par Datadog Feature Flags, confirmez que les expositions ont été synchronisées vers `g_exposures`, puis examinez la requête ayant échoué, les Metric SQL Models, la connexion et les autorisations de l'entrepôt, ainsi que la disponibilité de la table source.
3. Pour une expérience native à l'entrepôt, examinez la requête ayant échoué, l'Exposure SQL Model, les Metric SQL Models, la connexion et les autorisations de l'entrepôt, ainsi que la disponibilité de la table source.
4. Appliquez la correction, puis relancez l'analyse de l'expérience.
5. Si le même échec persiste, contactez [Datadog support][9] avec l'URL de l'expérience et les détails de l'échec.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/experiments/plan_and_launch_experiments/#schedule-a-staged-rollout
[2]: /fr/experiments/concepts/exposure_sql/
[3]: /fr/feature_flags/concepts/flag_history/#individual-flag-history
[4]: /fr/experiments/concepts/subject_types/#product-analytics-and-rum-metrics
[5]: /fr/experiments/concepts/subject_types/#warehouse-metrics
[6]: /fr/source_code/
[7]: /fr/bits_ai/bits_chat/usage/#web-application
[8]: /fr/experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /fr/help/