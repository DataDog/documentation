---
disable_toc: false
title: Anomalie de contenu
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

La détection d'anomalie de contenu analyse les logs entrants pour identifier et signaler tout contenu de log anormal. Vous pouvez définir des [paramètres de détection d'anomalie](#anomaly-detection-parameters) pour déclencher des signaux si les valeurs des champs d'un log s'écartent considérablement des logs historiques au sein d'un groupe. Un écart significatif se produit lorsque la similarité entre les valeurs entrantes et historiques est faible ou inexistante. Consultez [Comment les logs sont déterminés comme anormaux](#how-logs-are-determined-to-be-anomalous) pour plus d'informations.

Consultez [Créer une règle][1] pour obtenir des instructions sur la configuration d'une règle d'anomalie de contenu.

## Comment fonctionne la détection d'anomalie de contenu {#how-content-anomaly-detection-works}

### Paramètres de détection d'anomalie {#anomaly-detection-parameters}

Lorsque vous créez une règle avec la méthode de détection d'anomalie de contenu, vous pouvez définir les paramètres suivants.

#### Durée d'apprentissage {#learning-duration}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/query_learning_duration.png" alt="Requête d'une règle d'anomalie de contenu avec le paramètre de durée d'apprentissage mis en surbrillance" style="width:100%;" >}}

- **Description** : Fenêtre temporelle pendant laquelle les valeurs sont apprises. Aucun signal n'est généré pendant cette phase. La période d'apprentissage redémarre si la règle est modifiée.
- **Par défaut** : `7` jours
- **Plage** : `1`-`10` jours
- **Comment configurer** : Lorsque vous modifiez une règle d'anomalie de contenu, vous pouvez définir la durée d'apprentissage dans le menu déroulant {{< ui >}}Learning for{{< /ui >}} de la requête.

#### Oublier après {#forget-after}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/forget_duration.png" alt="Options de détection d'anomalie de contenu avec le menu déroulant des derniers jours mis en surbrillance" style="width:100%;" >}}

- **Description** : Durée pendant laquelle les valeurs apprises sont conservées avant d'être supprimées.
- **Par défaut** : `7` jours
- **Plage** : `1`-`10` jours
- **Comment configurer** : Dans la section {{< ui >}}Content anomaly detection options{{< /ui >}} de la page de paramètres d'une règle, vous pouvez définir la durée de conservation des valeurs apprises dans le menu déroulant {{< ui >}}within in the last{{< /ui >}}.

#### Seuil de pourcentage de similarité {#similarity-percentage-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similarity_percentage_threshold.png" alt="Options de détection d'anomalie de contenu avec le menu déroulant du pourcentage de similarité mis en surbrillance" style="width:100%;" >}}

- **Description** : Similarité minimale requise pour considérer un log comme normal.
- **Par défaut** : `70%`
- **Plage** : `35`-`100%`
- **Comment configurer** : Dans la section {{< ui >}}Content anomaly detection options{{< /ui >}} de la page de paramètres d'une règle, vous pouvez définir le seuil de pourcentage de similarité dans le menu déroulant {{< ui >}}within in the last{{< /ui >}}.

#### Seuil d'éléments similaires {#similar-items-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similar_items_threshold.png" alt="Options de détection d'anomalie de contenu avec le menu déroulant d'éléments similaires mis en surbrillance" style="width:100%;" >}}

- **Description** : Nombre de logs historiques correspondants requis pour qu'une valeur entrante soit considérée comme normale.
- **Par défaut** : `1`
- **Plage** : `1`-`20`
- **Comment configurer** : Dans la section {{< ui >}}Content anomaly detection options{{< /ui >}} de la page de paramètres d'une règle, vous pouvez saisir le seuil d'éléments similaires dans le champ {{< ui >}}with more than{{< /ui >}}.

#### Fenêtre d'évaluation {#evaluation-window}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/evaluation_window.png" alt="Options de détection d'anomalie de contenu avec le menu déroulant d'éléments similaires mis en surbrillance" style="width:100%;" >}}

- **Description** : Définit la période pour le comptage des logs anormaux. Des signaux sont déclenchés si les anomalies dépassent la condition de cas (par exemple, `a >= 2`).
- **Plage** : `0`-`24` heures
- **Comment configurer** : Dans la section {{< ui >}}Set conditions{{< /ui >}} de la page de paramètres d'une règle, vous pouvez définir la fenêtre d'évaluation d'une condition dans le menu déroulant {{< ui >}}within a window of{{< /ui >}}.

## Comment les logs sont déterminés comme anormaux {#how-logs-are-determined-to-be-anomalous}

1. Les logs sont tokenisés en utilisant [Unicode Text Segmentation (UTS #29)][2].
1. Les jetons sont comparés en utilisant la [similarité de Jaccard][3].
1. Des comparaisons efficaces sont obtenues avec [MinHash][4] et [Locality Sensitive Hashing (LSH)][5].
1. Un log est anormal s'il ne respecte ni le seuil de pourcentage de similarité ni le seuil d'éléments similaires.

### Exemples de calcul de similarité de Jaccard {#jaccard-similarity-computation-examples}

Cloud SIEM utilise la [similarité de Jaccard][3] pour comparer les logs.

$$\\text\"J(A,B)\" = {∣\\text\"A\" ∩ \\text\"B\"∣} / {∣\\text\"A\" ∪ \\text\"B\"∣}$$

Voici des exemples de la façon dont la similarité de Jaccard est calculée pour des logs avec des champs à un seul mot et des logs avec des champs à plusieurs mots.

#### Champs à un seul mot {#single-word-fields}

Voici deux exemples de logs avec des champs à un seul mot :

```
log1={actionType:auth, resourceType:k8s, networkType:public, userType:swe}
```

```
log2={actionType:auth, resourceType:k8s, networkType:public, userType:pm}
```

Pour calculer la similarité de Jaccard entre les deux logs :

- L'intersection de `log1` et `log2` donne cet ensemble de mots : `{auth, k8s, public}`.
- L'union de `log1` et `log2` donne cet ensemble de mots : `{auth, k8s, public, swe, pm}`.
- La similarité de Jaccard est calculée en utilisant le nombre de mots dans les résultats :

$$\\text\"J(log1,log2)\" = 3 / 5 = 0.6$$

#### Champs à plusieurs mots {#multi-word-fields}

Voici deux exemples de logs avec des champs à plusieurs mots :

```
log1={actionDescription: "User connected to abc network"}
```

```
log2={actionDescription: "User got unauthorized network access"}
```

Pour calculer la similarité de Jaccard entre les deux logs :

- L'intersection de `log1` et `log2` donne cet ensemble de mots : `{User, network}`.
- L'union de `log1` et `log2` donne cet ensemble de mots : `{User, connected, to, abc, network, got, unauthorized, access}`.
- La similarité de Jaccard est calculée en utilisant le nombre d'éléments dans les résultats :

$$\\text\"J(log1,log2)\" = 2 / 8 = 0.25$$

## Comparaison de la méthode d'anomalie de contenu avec d'autres méthodes de détection {#comparing-content-anomaly-method-with-other-detection-methods}

| Fonctionnalité | Détection d'anomalie | Détection de nouvelles valeurs | Détection d'anomalie de contenu |
|---------|-------------------|---------------------|---------------------------|
| Détecte de nouvelles valeurs de champ | Non | Oui | Oui (configurable) |
| Détecte des valeurs de champ rares | Non | Non | Oui |
| Détecte les valeurs dissemblables | Non | Non | Oui |
| Détecte les pics de logs | Oui | Non | Non |
| Requêtes multiples prises en charge | Non | Non | Oui |
| Cas multiples pris en charge | Non | Non | Oui |
| Définition du seuil pour le déclenchement des signaux | Appris à partir de la distribution du nombre de logs par intervalle de temps (~99<sup>e</sup> percentile).| Déclenche toujours un signal à la première occurrence d'une nouvelle valeur. | Spécifié par l'utilisateur (`1`-`100`) |
| Fenêtre d'évaluation | Oui | Non | Oui |
| Rétention | 14 jours | 30 jours | 10 jours |

[1]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=content_anomaly
[2]: https://www.unicode.org/reports/tr29/tr29-22.html
[3]: https://en.wikipedia.org/wiki/Jaccard_index
[4]: https://en.wikipedia.org/wiki/MinHash
[5]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing