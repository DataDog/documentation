import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        String sloId = sloId_example; // String | The ID of the service level objective object.
        ServiceLevelObjective body = ; // ServiceLevelObjective | 
        try {
            SLOListResponse result = apiInstance.updateSLO(sloId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#updateSLO");
            e.printStackTrace();
        }
    }
}