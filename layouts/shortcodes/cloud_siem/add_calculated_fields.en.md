1. (Optional) To create calculated fields that transform your logs during query time:
    1. Click **Add** and select **Calculated fields**.
    1. In **Name your field**, enter a descriptive name that indicates the purpose of the calculated field.
        - For example, if you want to combine users' first and last name into one field, you might name the calculated field `fullName`.
    1. In the **Define your formula** field, enter a formula or expression, which determines the result to be computed and stored as the value of the calculated field for each log event.
        - See [Calculated Fields Expressions Language][701] for information on syntax and language constructs.

    [701]: /logs/explorer/calculated_fields/expression_language/