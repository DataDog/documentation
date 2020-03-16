import com.datadog.api.v2.client.api.SLOApi;

public class SLOApiExample {

    public static void main(String[] args) {
        SLOApi apiInstance = new SLOApi();
        String sloId = sloId_example; // String | The ID of the service level objective object
        ServiceLevelObjective body = ; // ServiceLevelObjective | 
        try {
            ServiceLevelObjectiveListResponse result = apiInstance.editSLO(sloId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SLOApi#editSLO");
            e.printStackTrace();
        }
    }
}