import com.datadog.api.v1.client.api.SnapshotsApi;

public class SnapshotsApiExample {

    public static void main(String[] args) {
        SnapshotsApi apiInstance = new SnapshotsApi();
        Long start = 789; // Long | The POSIX timestamp of the start of the query.
        Long end = 789; // Long | The POSIX timestamp of the end of the query.
        String metricQuery = metricQuery_example; // String | The metric query.
        String eventQuery = eventQuery_example; // String | A query that adds event bands to the graph.
        String graphDef = graphDef_example; // String | A JSON document defining the graph. graph_def can be used instead of metric_query. The JSON document uses the [grammar defined here](https://docs.datadoghq.com/graphing/graphing_json/#grammar) and should be formatted to a single line then URLEncoded.
        String title = title_example; // String | A title for the graph. If no title is specified, the graph doesn’t have a title.
        try {
            GraphSnapshot result = apiInstance.getGraphSnapshot(start, end, metricQuery, eventQuery, graphDef, title);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SnapshotsApi#getGraphSnapshot");
            e.printStackTrace();
        }
    }
}