import com.datadog.api.v2.client.api.SLOApi;

public class SLOApiExample {

    public static void main(String[] args) {
        SLOApi apiInstance = new SLOApi();
        ServiceLevelObjective body = ; // ServiceLevelObjective | 
        try {
            ServiceLevelObjectiveListResponse result = apiInstance.createSLO(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SLOApi#createSLO");
            e.printStackTrace();
        }
    }
}