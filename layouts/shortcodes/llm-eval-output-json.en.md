Edit a JSON schema that defines your evaluations output type.

#### Boolean
- Edit the `description` field to further explain what true and false mean in your use case.

#### Score
- Set a `min` and `max` score for your evaluation.
- Edit the `description` field to further explain the scale of your evaluation.

#### Categorical
- Add or remove categories by editing the JSON schema
- Edit category names
- Edit the `description` field of categories to further explain what they mean in the context of your evaluation.

An example schema for a categorical evaluation:

```
{
    "name": "categorical_eval",
    "schema": {
        "type": "object",
        "required": [
            "categorical_eval"
        ],
        "properties": {
            "categorical_eval": {
                "type": "string",
                "anyOf": [
                    {
                        "const": "budgeting_question",
                        "description": "The user is asking a question about their budget. The answer can be directly determined by looking at their budget and spending."
                    },
                    {
                        "const": "budgeting_request",
                        "description": "The user is asking to change something about their budget. This should involve an action that changes their budget."
                    },
                    {
                        "const": "budgeting_advice",
                        "description": "The user is asking for advice on their budget. This should not require a change to their budget, but it should require an analysis of their budget and spending."
                    },
                    {
                        "const": "general_financial_advice",
                        "description": "The user is asking for general financial advice which is not directly related to their specific budget. However, this can include advice about budgeting in general."
                    },
                    {
                        "const": "unrelated",
                        "description": "This is a catch-all category for things not related to budgeting or financial advice."
                    }
                ]
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```