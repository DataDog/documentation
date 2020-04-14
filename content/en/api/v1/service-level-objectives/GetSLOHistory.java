import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        String sloId = sloId_example; // String | The ID of the service level objective object.
        Long fromTs = 789; // Long | The `from` timestamp for the query window in epoch seconds.
        Long toTs = 789; // Long | The `to` timestamp for the query window in epoch seconds.
        try {
            SLOHistoryResponse result = apiInstance.getSLOHistory(sloId, fromTs, toTs);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#getSLOHistory");
            e.printStackTrace();
        }
    }
}