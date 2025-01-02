<div class="alert alert-warning">Reference Tables containing over 1,000,000 rows cannot be used to filter events. See <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Add Custom Metadata with Reference Tables</a> for more information on how to create and manage Reference Tables. </div>

Reference Tables allow you to combine metadata with logs, providing more information to resolve application issues. Add a query filter based on a Reference Table to perform lookup queries. For more information on creating and managing this feature, see the [Reference Tables][101] guide.

To apply a query filter with Reference Tables:

1. Click the **Add** button next to the query editor, and then select **Join with Reference Table**.
1. Select your reference table in the dropdown menu.
1. Select the log field you want to look for in the reference table.
1. Select the **IN** or **NOT IN** operator depending on whether you want to find the field value in the specific column.

In the following example, the Reference Table query filter is used to search all recent logs that include a malicious IP address from a threat intel reference table:

[101]: /integrations/guide/reference-tables/