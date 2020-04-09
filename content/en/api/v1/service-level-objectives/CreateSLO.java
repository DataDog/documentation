import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        ServiceLevelObjective body = ; // ServiceLevelObjective | 
        try {
            ServiceLevelObjectiveListResponse result = apiInstance.createSLO(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#createSLO");
            e.printStackTrace();
        }
    }
}