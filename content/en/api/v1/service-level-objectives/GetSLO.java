import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        String sloId = sloId_example; // String | The ID of the service level objective object.
        try {
            ServiceLevelObjectiveResponse result = apiInstance.getSLO(sloId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#getSLO");
            e.printStackTrace();
        }
    }
}