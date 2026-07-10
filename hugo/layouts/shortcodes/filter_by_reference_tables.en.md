<div class="alert alert-danger">Reference Tables containing over 1,000,000 rows cannot be used to filter events. See <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Add Custom Metadata with Reference Tables</a> for more information on how to create and manage Reference Tables. </div>

Reference Tables allow you to combine metadata with logs, providing more information to resolve application issues. Add a query filter based on a Reference Table to perform lookup queries. For more information on creating and managing this feature, see [Reference Tables][101].

To apply a query filter with Reference Tables, click the **Add** button next to the query editor and select **Join with Reference Table**.

1. Select your reference table in the dropdown menu.
2. Select the log field to join on.
3. Select the **IN** or **NOT IN** operator to filter in or out matching logs.
4. Select the Reference Table column to join on.
5. (Optional) Select Reference Table columns used to enrich logs.
6. (Optional) Filter logs by directly querying data in Reference Table columns.

In the following example, a Reference Table containing product information is used to filter and enrich logs:

[101]: /reference_tables/
