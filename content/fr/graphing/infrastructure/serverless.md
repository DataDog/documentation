---
title: Informatique sans serveur
kind: documentation
aliases:
  - /fr/graphing/infrastructure/cloudfunctions
  - /fr/graphing/infrastructure/serverless_functions
further_reading:
  - link: integrations/amazon_xray
    tag: Intégration X-Ray
    text: Intégration AWS X-Ray
  - link: integrations/amazon_lambda
    tag: Intégration AWS Lambda
    text: Intégration AWS Lambda
---
## Présentation

L'informatique sans serveur consiste à écrire du code orienté événement et à l'importer dans un fournisseur de cloud afin qu'il gère toutes les ressources de calcul sous-jacentes. [L'informatique sans serveur Datadog][1] regroupe en une unique vue les métriques, traces et logs de vos fonctions AWS Lambda qui exécutent des applications sans serveur.

Activez l'intégration [AWS Lambda][2] pour commencer à recueillir des métriques custom et Cloudwatch depuis vos fonctions Lambda.

## Installation

Le dashboard dédié ne nécessite aucune installation. Il repose cependant sur trois sources de données qui doivent chacune être installées :

1. [Intégration Amazon Web Services][3] (obligatoire)

    Cette intégration remplit les graphiques de synthèse et le principal tableau de fonctions. Installez cette intégration et vérifiez sur votre compte que les métriques Lambda sont transmises.

    **Remarque** : les métriques de l'IU des fonctions Cloud sont retardées ~10 minutes. Il s'agit de la vitesse par défaut à laquelle Datadog interroge les API AWS. Pour savoir si ce délai peut être réduit, contactez l'[assistance Datadog][4].

2. [Intégration AWS X-Ray][5] (facultative)
    Cette intégration fournit des traces pour les fonctions Lambda dans la page détaillée des fonctions et permet la détection du démarrage à froid des fonctions Lambda.

    Installez l'intégration X-Ray et ajoutez les autorisations suivantes au document de stratégie dans votre rôle AWS/Datadog :
    ```
    xray:BatchGetTraces,
    xray:GetTraceSummaries
    ```
    Si vous utilisez une clé principale client pour chiffrer les traces, ajoutez la méthode `kms:Decrypt` à la stratégie au sein de laquelle la ressource correspond à la clé principale client utilisée pour X-Ray.

    Configuration X-Ray conseillée :

    - Accédez à la fonction Lambda dans la console AWS que vous souhaitez instrumenter. Dans la section « Debugging and error handling », cochez la case « Enable active tracing ». Cela permet d'activer X-Ray pour cette fonction.

    - Importez le SDK X-Ray dans votre fonction et ajustez toutes les bibliothèques prises en charge. X-Ray trace alors automatiquement tous les appels AWS et toutes les autres intégrations X-Ray prises en charge. Consultez un [exemple de ce processus dans Python][6].

    - L'intégration X-Ray de Datadog prend en charge les annotations et les sous-segments personnalisés.

    **Remarque** : les traces sont retardées d'environ 5 minutes. Il s'agit de la vitesse à laquelle Datadog interroge les API AWS X-Ray.

3. Logs AWS CloudWatch (facultatifs)

    Installez cette intégration si vous souhaitez visualiser les logs de vos fonctions Lambda dans la page détaillée des fonctions. Elle permet également de remplir votre tableau de fonctions avec les métriques supplémentaires, comme Memory Used (avg) et Last Start.

    Pour l'activer, consultez la [documentation relative à l'envoi de logs Lambda à Datadog][2].

## Recherche, filtrage et tri

### Tagging

Datadog ajoute à vos métriques et vos fonctions Lambda des tags personnalisés et des métadonnées AWS pertinentes.

Métadonnées AWS :

- account_id
- executedversion
- functionname
- memorysize
- region
- ressource
- runtime

Ajoutez les autorisations suivantes dans votre stratégie IAM Datadog :

* `lambda:List*` : pour recueillir les tags ci-dessus.
* `tag:GetResources` : pour recueillir des tags personnalisés.

### Filtrage

Utilisez la fonctionnalité de recherche à facettes qui figure à gauche de la page pour limiter le nombre de fonctions affichées. Tous les tags personnalisés et AWS peuvent être utilisés en tant que filtres.

### Sélectionner des métriques dans le tableau

L'icône en forme d'engrenage des paramètres vous permet de cocher ou de décocher des colonnes de métriques dans le tableau de fonctions. Vous trouverez ci-dessous la liste des métriques, le type d'intégration associé ainsi qu'une mention indiquant si la colonne s'affiche ou non par défaut :

| Métrique                | Type   | Valeur par défaut |
|-----------------------|--------|---------|
| Invocations           | Métrique | Oui     |
| Duration (Avg)        | Métrique | Oui     |
| Errors                | Métrique | Oui     |
| Throttles             | Métrique | Non      |
| Dead Letter Errors    | Métrique | Non      |
| Concurrent Executions | Métrique | Non      |
| Iterator Age          | Métrique | Non      |
| Est Cost              | Logs   | Oui     |
| Memory Used           | Logs   | Oui     |
| Last Start            | Logs   | Oui     |
| % Memory Used         | Logs   | Non      |

## Vue détaillée des fonctions

Cliquez sur une fonction spécifique dans le tableau de synthèse des fonctions pour accéder à la page détaillée des fonctions. Cette page fournit des informations détaillées sur les logs et traces de cette fonction.

{{< img src="graphing/infrastructure/serverless/functiondetailview.png" alt="Informatique sans serveur - Vue détaillée des fonctions" responsive="true">}}

### Sélecteur de durée et graphiques de synthèse

Utilisez les graphiques de synthèse en haut de l'écran et le sélecteur de durée pour afficher l'intervalle qui vous intéresse. Tout changement d'intervalle entraîne la mise à jour de la page entière, y compris des traces et logs affichés.

### Traces

Grâce à l'intégration AWS X-Ray, les traces de la fonction visualisée apparaissent dans la section `Traces`. Vous pouvez les trier selon leurs attributs, comme leur date, durée ou statut.

{{< img src="graphing/infrastructure/serverless/traces.png" alt="Traces" responsive="true">}}

### Logs

La section `Logs` agrège les logs de tous les appels récents de la fonction actuelle. Elle se met à jour en temps réel afin d'afficher les nouveaux logs envoyés à Datadog par vos fonctions.

{{< img src="graphing/infrastructure/serverless/logs2.png" alt="Traces" responsive="true">}}

## Vue détaillée des traces

Cliquez sur une trace spécifique pour ouvrir la vue détaillée de cette trace. Les sous-segments X-Ray sont convertis en spans Datadog, tout en conservant les modèles de nommage, les tags de span et la structure de l'ensemble de la trace.

{{< img src="graphing/infrastructure/serverless/traces2.png" alt="Traces" responsive="true">}}

Datadog fournit des traces sans serveur spécialement formatées pour améliorer leur lisibilité et facilité d'utilisation. Cliquez sur la span d'une autre fonction Lambda pour créer un lien vers la page détaillée de la fonction. Vous pourrez ainsi facilement accéder à une autre fonction qui fait partie de la trace.

### Logs

Tous les logs de cette fonction et toutes les fonctions appelées sont également indiqués dans la page détaillée. Affinez l'intervalle de la page en sélectionnant un moment précis pour afficher les logs d'un instant donné pertinent. Cliquez sur les logs du tableau pour afficher tous leurs détails.

{{< img src="graphing/infrastructure/serverless/logs.png" alt="logs" responsive="true">}}

### Erreurs

L'onglet des erreurs remonte les exceptions qui se sont produites pendant la durée de la trace. Cette fonctionnalité permet de comprendre rapidement les problèmes survenus pendant l'exécution.

{{< img src="graphing/infrastructure/serverless/errors.png" alt="logs" responsive="true">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /fr/integrations/amazon_lambda/#log-collection
[3]: /fr/integrations/amazon_web_services
[4]: /fr/help
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[6]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-patching.html