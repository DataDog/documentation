---
code_lang: python
code_lang_weight: 20
description: Capacités et limites des expressions Python dans App Builder
title: Expressions Python
type: multi-code-lang
---
L'action de fonction Python vous permet d'écrire des scripts Python personnalisés pour les transformations de données, le parsing et l'enrichissement de charge utile au sein de vos workflows.

## Environnement Python {#python-environment}

L'action de fonction Python s'exécute dans un environnement d'exécution restreint présentant les caractéristiques suivantes :

{{< workflow-python-action-characteristics >}}

## Structure du script {#script-structure}

Tous les scripts Python doivent définir une fonction `main` qui accepte un paramètre `ctx` de type `Context`. Exemple :

```python
from execution_context import Context

def main(*, ctx: Context):
  # Use ctx to access Trigger or Steps data
  workflow_name = ctx["WorkflowName"]
  return f"Running workflow {workflow_name!r}"
```

L'objet `ctx` permet d'accéder à toutes les variables de contexte du workflow, de manière similaire à la variable `$` dans les expressions JavaScript. Utilisez un accès de type dictionnaire (par exemple, `ctx["Steps"]["Step_name"]["variable"]`) pour référencer les valeurs des étapes précédentes.

## Ajouter une action de fonction Python {#add-a-python-function-action}

Dans le canevas de workflow : 
1. Cliquez sur {{< ui >}}\+{{< /ui >}} pour ajouter une étape de workflow. 
1. Recherchez `Python`. 
1. Sélectionnez l'action Python pour l'ajouter à votre workflow.

## Écrire des scripts Python avec l'IA {#write-python-scripts-with-ai}

Vous pouvez utiliser Bits AI pour vous aider à écrire des scripts Python dans une étape de workflow.

Pour écrire un script avec Bits AI :

1. Ajoutez une étape Python à votre workflow.
1. Dans la section {{< ui >}}Inputs{{< /ui >}}, cliquez sur {{< ui >}}Write Code with AI{{< /ui >}}.
1. Saisissez une invite personnalisée ou sélectionnez l'une des invites exemples. 
1. Au besoin, cliquez sur {{< ui >}}Test script{{< /ui >}} pour générer un aperçu de l'étape du workflow. 
1. Pour enregistrer le script, cliquez sur {{< ui >}}Accept changes{{< /ui >}}. Pour continuer à modifier le script, cliquez sur {{< ui >}}Reject changes{{< /ui >}}.
1. Cliquez sur {{< ui >}}X{{< /ui >}} pour fermer la boîte de dialogue IA. 
1. Saisissez un {{< ui >}}Description{{< /ui >}}. 
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Exemples de scripts {#script-examples}

### Analyser et transformer des données JSON {#parse-and-transform-json-data}

Cet exemple analyse une chaîne JSON provenant d'une étape précédente et extrait des champs spécifiques.

```python
from execution_context import Context
import json

def main(*, ctx: Context):
    # Get JSON string from previous step
    json_string = ctx["Steps"]["Get_data"]["output"]

    # Parse and transform
    data = json.loads(json_string)
    return {
        "user_ids": [user["id"] for user in data["users"]],
        "total_count": len(data["users"])
    }
```

### Travailler avec des dates et des horodatages {#work-with-dates-and-timestamps}

Cet exemple utilise la bibliothèque python-dateutil pour effectuer des calculs de date.

```python
from execution_context import Context
from dateutil import parser, relativedelta
from datetime import datetime

def main(*, ctx: Context):
    # Parse a date string
    start_date = parser.parse(ctx["Trigger"]["date_string"])

    # Calculate date 30 days in the future
    future_date = start_date + relativedelta.relativedelta(days=30)

    return {
        "start": start_date.isoformat(),
        "end": future_date.isoformat(),
        "days_difference": 30
    }
```

### Opérations cryptographiques {#cryptographic-operations}

Cet exemple utilise la bibliothèque rsa pour chiffrer un message.

```python
from execution_context import Context
import rsa
import base64

def main(*, ctx: Context):
    # Get message from workflow context
    message = ctx["Steps"]["Compose_message"]["text"]

    # Generate RSA key pair
    (public_key, private_key) = rsa.newkeys(512)

    # Encrypt message
    encrypted = rsa.encrypt(message.encode(), public_key)

    return {
        "encrypted_message": base64.b64encode(encrypted).decode(),
        "public_key": public_key.save_pkcs1().decode()
    }
```