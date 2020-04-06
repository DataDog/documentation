import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        String ids = ids_example; // String | A comma separated list of the IDs of the service level objectives objects.
For example, "id1,id2,id3".
        try {
            ServiceLevelObjectiveListResponse result = apiInstance.getSLOs(ids);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#getSLOs");
            e.printStackTrace();
        }
    }
}