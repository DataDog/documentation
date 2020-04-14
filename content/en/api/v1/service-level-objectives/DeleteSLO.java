import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        String sloId = sloId_example; // String | The id of the service level objective.
        try {
            SLODeleteResponse result = apiInstance.deleteSLO(sloId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#deleteSLO");
            e.printStackTrace();
        }
    }
}