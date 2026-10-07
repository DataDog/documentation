---
description: Extrayez des valeurs de vos logs au moment de la requête en utilisant
  des modèles Grok dans le Log Explorer.
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: Documentation
  text: 'En savoir plus sur les champs calculés :'
title: Extractions
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSffBg9ph2zl-jTGzvgBUcXSifOjvPdRh8vJjzTMIclSB2ZLIw/viewform" btn_hidden="false" header="Calculated Fields Extractions est en préversion">}}
Utilisez Calculated Fields Extractions pour extraire des valeurs de vos logs dans le Log Explorer au moment de la requête en utilisant des modèles Grok
{{< /callout >}}

## Présentation {#overview}

Calculated Fields Extractions vous permet d'appliquer des règles de parsing Grok au moment de la requête dans le Log Explorer, vous permettant d'extraire des valeurs de messages de log bruts ou d'attributs sans modifier les pipelines ni ré-ingérer les données Vous pouvez générer des règles d'extraction automatiquement avec le parsing basé sur l'IA, ou définir manuellement vos propres modèles Grok pour répondre à vos besoins spécifiques.

Pour créer un champ calculé d'extraction, consultez [Créer un champ calculé][1]

## Parsing automatique {#automatic-parsing}

Utilisez le parsing automatique basé sur l'IA pour générer des règles Grok à partir de vos données de log. Datadog analyse le contenu de votre message de log et génère automatiquement une règle d'extraction, éliminant ainsi le besoin d'écrire manuellement des modèles Grok.

{{< img src="/logs/explorer/calculated_fields/extractions/calculated_fields_parse_ai.png" alt="Exemple de parsing Grok basé sur l'IA dans Datadog Calculated Fields" style="width:100%;" >}}

Il existe deux façons d'accéder au parsing automatique depuis le panneau latéral des logs :

1. Cliquez sur le bouton {{< ui >}}AI{{< /ui >}} <i class="icon-bits-ai"></i> à côté du bouton de copie.
2. Surlignez une partie spécifique du message de log et cliquez sur le bouton {{< ui >}}AI{{< /ui >}} <i class="icon-bits-ai"></i> dans le menu contextuel.

Lorsque vous cliquez sur le bouton {{< ui >}}AI{{< /ui >}}, Datadog remplit automatiquement le formulaire Calculated Field :

1. {{< ui >}}Extract from{{< /ui >}} : Par défaut, le message de log complet. Vous pouvez modifier la liste déroulante pour analyser des attributs individuels à la place.
2. {{< ui >}}Log sample{{< /ui >}} : Rempli automatiquement avec le log sélectionné.
3. {{< ui >}}Parsing rule{{< /ui >}} : Généré automatiquement à partir de l'échantillon de log.

Examinez et modifiez la règle générée si nécessaire. Vous pouvez la modifier manuellement ou cliquer sur {{< ui >}}Generate a new rule{{< /ui >}} pour que Datadog réessaie. Vous pouvez également modifier, insérer ou remplacer l'exemple de log pour tester votre règle avec différents formats de log

<div class="alert alert-tip">Utilisez les boutons pouce levé ou pouce baissé pour fournir des commentaires en ligne et aider à améliorer la fonctionnalité.</div>

## Syntaxe {#syntax}

Les champs d'extraction utilisent des modèles Grok pour identifier et capturer des valeurs à partir d'un attribut de log Un modèle Grok est composé d'un ou plusieurs jetons sous la forme :

```
%{PATTERN_NAME:field_name}
```
- `PATTERN_NAME` : Une correspondance Grok.
- `field_name` : Le nom du champ calculé extrait.

Vous pouvez enchaîner plusieurs modèles pour analyser des messages de log complexes

## Correspondances et filtres pris en charge au moment de la requête {#supported-matchers-and-filters-at-query-time}

<div class="alert alert-warning">Les fonctionnalités de parsing Grok disponibles au moment de la <em>requête</em> (dans le <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) prennent en charge un sous-ensemble limité de correspondances (<strong>data</strong>, <strong>integer</strong>, <strong>notSpace</strong>, <strong>number</strong> et <strong>word</strong>) et de filtres (<strong>number</strong> et <strong>integer</strong>) Pour des besoins de parsing à long terme, définissez un pipeline de logs.</div>

Le parsing Grok au moment de la requête dans le Log Explorer prend en charge un sous-ensemble limité de correspondances et de filtres Chaque correspondance ou filtre est utilisé dans un modèle Grok avec le format :

```
%{MATCHER:field_name}
```

### Correspondances {#matchers}

| Correspondance | Exemple de modèle Grok |
| ------- | -------------------- |
| `data`<br>_Toute séquence de caractères (non gourmande)_ | `status=%{data:status}` |
| `word`<br>_Caractères alphanumériques_ | `country=%{word:country}` |
| `number`<br>_Nombres à virgule flottante_ | `value=%{number:float_val}` |
| `integer`<br>_Valeurs entières_ | `count=%{integer:count}` |
| `notSpace`<br>_Caractères non-espaces_ | `path=%{notSpace:request_path}` |

### Filtres {#filters}
Appliquez des filtres pour convertir les valeurs extraites en types numériques. Les filtres utilisent la même syntaxe de motif que les correspondances.

| Filtre | Exemple de motif Grok |
| ------ | -------------------- |
| `number`<br>_Analyse les chaînes numériques en tant que nombres_ | `latency=%{number:lat}` |
| `integer`<br>_Analyse les chaînes numériques en tant qu'entiers_ | `users=%{integer:user_count}` |

### Exemple {#example}
Utilisez cette fonctionnalité pour analyser les champs de log à la demande sans modifier votre pipeline d'ingestion
**Ligne de log** :

```
country=Brazil duration=123ms path=/index.html status=200 OK
```

**Règle Grok d'extraction** :

```
country=%{word:country} duration=%{integer:duration} path=%{notSpace:request_path} status=%{data:status}
```
**Camps calculés résultants** :
- `#country = Brazil`
- `#duration = 123`
- `#request_path = /index.html`
- `#status = 200 OK`

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/calculated_fields/#create-a-calculated-field