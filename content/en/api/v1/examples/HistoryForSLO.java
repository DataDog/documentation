import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        String sloId = sloId_example; // String | The ID of the service level objective object.
        String fromTs = fromTs_example; // String | The `from` timestamp for the query window in epoch seconds.
        String toTs = toTs_example; // String | The `to` timestamp for the query window in epoch seconds.
        try {
            HistoryServiceLevelObjectiveResponse result = apiInstance.historyForSLO(sloId, fromTs, toTs);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#historyForSLO");
            e.printStackTrace();
        }
    }
}