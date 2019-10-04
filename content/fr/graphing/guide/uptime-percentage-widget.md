---
title: Personnaliser le widget du pourcentage de la disponibilité
kind: guide
author: Boyan Syarov
further_reading:
  - link: /monitors/monitor_uptime_widget/
    tag: Documentation
    text: Widget Disponibilité des monitors
  - link: /synthetics/
    tag: Documentation
    text: Synthetics
---
Pour respecter les accords de service avec les clients externes ou internes, vous devez régulièrement mesurer le pourcentage de disponibilité. Ce guide vous explique comment y parvenir avec le [check HTTP][1] de Datadog et le [widget Valeur de requête][2].

## Implémentation

Commencez par vérifier que l'[Agent Datadog][3] est installé. Le [check HTTP][1] est inclus lors de l'installation de l'Agent.

Le check HTTP de Datadog se connecte aux pages Web ou aux endpoints internes ou externes. Il fait partie des intégrations supplémentaires de l'Agent, ce qui signifie que les checks sont liés à un Agent installé sur un host dans votre environnement. Il vous permet de sonder des endpoints, que vous n'avez pas forcément besoin d'exposer publiquement (comme pour un répartiteur de charge à 7 niveaux).

### Configuration

Le check HTTP est configuré avec un fichier YAML. Mettez à jour le fichier `http_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Ensuite, [relancez l'Agent][5]. Consultez le [fichier d'exemple http_check.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

**Exemple** :

```yaml
init_config:

instances:
  - name: Amazon
    url: https://www.amazon.com/
    ca_certs: /opt/datadog-agent/embedded/ssl/certs/cacert.pem
    timeout: 3
    tags:
     - customer:Amazon
     - category:ecommerce
```

Ajoutez la configuration ci-dessus pour que l'Agent recueille les métriques de la page Web publique d'Amazon. L'une des métriques recueillies est `network.http.can_connect`, qui renvoie soit la valeur 1 (réponse valide), soit la valeur 0 (réponse non valide).

L'exemple utilise des paramètres facultatifs, à savoir un délai de 3 secondes (renvoie 0 si la réponse met plus de 3 secondes à arriver) et des tags pour le nom du client et la catégorie.

### Validation

Utilisez le [Metrics Explorer][7] pour vérifier que la métrique transmet des données à Datadog. Ici, `amazon.com` renvoie des réponses HTTP de 200 s ou 300 s, alors que le délai imposé est de 3 secondes :

{{< img src="graphing/guide/upw_metrics_explorer.png" alt="Metrics Explorer" responsive="true">}}

## Graphiques

Affichez ensuite `network.http.can_connect` pour votre URL dans un [widget Valeur de requête][2]. Exemple :

{{< img src="graphing/guide/upw_qvw01.png" alt="Widget Valeur de requête" responsive="true">}}

Pour afficher le pourcentage de disponibilité, modifiez les paramètres dans le widget Valeur de requête.

1. Cliquez sur **Advanced...**.
2. Ajoutez `a * 100` à la zone de texte **Formula**. Ceci permet d'afficher la métrique sous la forme d'un pourcentage, au lieu d'un ratio.
3. Masquez la valeur d'origine en cliquant sur ✔**a**.
4. Désélectionnez l'option de mise à l'échelle automatique qui force le widget à afficher une valeur flottante avec deux décimales.
5. Sélectionnez **Use Custom units**. Ajoutez `%` à la zone de texte qui apparaît.

{{< img src="graphing/guide/upw_qvw02.png" alt="Widget Valeur de requête" responsive="true">}}

### Mise en forme conditionnelle

Si vous le souhaitez, vous pouvez ajouter une mise en forme conditionnelle grâce à la section **Conditional Format**. L'exemple ci-dessous affiche en rouge les valeurs inférieures à 99,99 % :

{{< img src="graphing/guide/upw_qvw03.png" alt="Widget Valeur de requête" responsive="true">}}

### Exemple de JSON

Il s'agit du JSON pour l'exemple du widget de valeur de requête :

```json
{
  "viz": "query_value",
  "requests": [
    {
      "q": "avg:network.http.can_connect{url:https://www.amazon.com/}*100",
      "type": null,
      "style": {
        "palette": "dog_classic",
        "type": "solid",
        "width": "normal"
      },
      "aggregator": "avg",
      "conditional_formats": [
        {
          "comparator": "<",
          "value": "99.99",
          "palette": "white_on_red"
        }
      ]
    }
  ],
  "custom_unit": "%",
  "autoscale": false
}
```

## Cas d'utilisation supplémentaires

Cet exemple peut couvrir des cas d'utilisation supplémentaires 

* Transmettez les données de plusieurs Agents géographiquement dispersés à un seul endpoint.
* Plutôt que de transmettre des données sur une URL spécifique, regroupez plusieurs URL au sein d'une catégorie grâce aux tags pour transmettre des données sur plusieurs sites. Dans l'exemple d'origine, `amazon.com` possède le tag `category:ecommerce`. Si plusieurs URL possèdent ce même tag, vous pouvez vérifier tous les endpoints associés.
* Vous pouvez combiner des tags pour tirer pleinement profit de cette fonctionnalité. Par exemple :
    `avg:network.http.can_connect{bu:processing,env:prod,customer:acme}*100`
* Vous pouvez appliquer cette même logique lors de la configuration de monitors permettant de déclencher des alertes lorsque les objectifs de niveau de services visés ne sont pas atteints. Utilisez un [monitor de métrique][8] Datadog pour bénéficier de cette fonctionnalité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/http_check
[2]: /fr/graphing/widgets/query_value
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /fr/agent/guide/agent-configuration-files
[5]: /fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[7]: https://app.datadoghq.com/metric/explorer
[8]: /fr/monitors/monitor_types/metric